'use strict';

// Funcion para el servicio de la BD
export default function idbService ($log, qs, idbUtils, idbEvents, idbModel) { 'ngInject';

  // En la siguiente linea, puede incluir prefijos de implementacion que quiera probar.
  const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  // No use "const indexedDB = ..." Si no está en una función.
  // Por otra parte, puedes necesitar referencias a algun objeto window.IDB*:
  const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  const IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  // (Mozilla nunca ha prefijado estos objetos, por lo tanto no necesitamos window.mozIDB*)
  
  if (!indexedDB) {
    alert("Su navegador no soporta una versión estable de indexedDB. Tal y como las características no serán validas");
    return;
  }

  // Clase para la creación de instancias de la BD
  function idb($dbName, $dbVersion, $socket) { const thiz = this;
    idbUtils.validate(arguments, ['string', 'number', ['object', 'undefined'], ['object', 'undefined']]);

    // Manejadores de eventos.
    const $eventsCallbacks = {};
    const $upgradeNeededDefered = qs.defer();
    const $openDefered = qs.defer();
    const $socketConnectedDefered = qs.defer();
    let $opened = false;

    // Instancia de la base de datos;
    let $request = null;
    thiz.models = {};

    // Agregar un manejador de evento
    thiz.bind = function (eventName, cb) {
      idbUtils.validate(arguments, ['string', 'function']);

      if (!$eventsCallbacks[eventName]){
        $eventsCallbacks[eventName] = [];
      }

      $eventsCallbacks[eventName].push(cb);

    };

    //Remueve un manejador de evento
    thiz.unbind = function (eventName, cb) {
      idbUtils.validate(arguments, ['string', 'function']);

      if (!$eventsCallbacks[eventName]) return;

      // Buscar el cb
      const idx = $eventsCallbacks[eventName].indexOf(cb);

      // Si se encontro el cb removerlo
      if (idx != -1){
        $eventsCallbacks[eventName].splice(idx, 1);
      }

    };

    // Dispara un evento
    thiz.trigger = function (eventName, args) {
      idbUtils.validate(arguments, ['string', 'object']);

      $log.log($dbName+'.v'+($dbVersion||1)+': '+eventName);

      for(let i in $eventsCallbacks[eventName]){
        $eventsCallbacks[eventName][i].apply(thiz, args);
      }

    };

    // Callbacks para los errores
    thiz.error = function (cb) {
      thiz.bind(idbEvents.DB_ERROR, cb);
      return thiz;
    };

    // Abrir una Base de datos.
    thiz.open = function () {
      if ($opened) return $openDefered;

      // Crear un nuevo defer
      $opened = true;

      // dejamos abierta nuestra base de datos
      function ready() {

        const rq = indexedDB.open($dbName, $dbVersion);

        rq.onupgradeneeded = function (event) {
          // Do something with rq.result!
          $upgradeNeededDefered.resolve(event, rq);

        };

        // Asignar el manejador del resultado
        rq.onsuccess = function (event) {
          // Do something with rq.result!
          $request = rq;
          
          // Asingar el manejador de errores a la BD
          rq.onerror = function (event) {
            $log.error('Database error: '+ event.target.errorCode);
            thiz.trigger(idbEvents.DB_ERROR, [event]);
          }

          $openDefered.resolve(event, rq);

        };

        // Asignar el manejador de errores
          // Do something with rq.errorCode!
        rq.onerror = function (event) {
          $openDefered.reject(rq.errorCode, event);
        }

      };

      indexedDB.deleteDatabase($dbName).onsuccess = ready;
      // ready();

      return $openDefered;

    };

    // Agrega un nuevo modelo
    thiz.model = function (name, socket) {
      idbUtils.validate(arguments, ['string', ['undefined', 'object']]);

      // Instanciar el modelo
      let model = thiz.models[name];

      // Si no existe el modelo crear
      if(!model){
        model = idbModel(thiz, name, socket || $socket);
      }

      // Guardar el modelo en los modelos
      thiz.models[name] = model;

      // Retornar el modelo
      return model;

    };

    // Crea el objectStore para un model
    thiz.createStore = function (modelName, modelId) {
      idbUtils.validate(arguments, ['string', ['object', 'undefined']]);

      $upgradeNeededDefered.promise.then(function (event, rq) {
        rq.result.createObjectStore(modelName, modelId);
      });

    };

    // Crea el objectStore para un model
    thiz.createIndex = function (modelName, indexName, fieldName, opts) {
      idbUtils.validate(arguments, ['string', 'string', 'string', ['object', 'undefined']]);

      $upgradeNeededDefered.promise.then(function (event, rq) {
        rq.transaction.objectStore(modelName).createIndex(indexName, fieldName, opts);
      });

    };

    // Crea una transacción
    thiz.transaction = function(modelName, perms, action) {
      idbUtils.validate(arguments, ['string', 'string', 'function']);

      const defered = qs.defer();

      // Cuando se abra la BD
      $openDefered.promise.then(function (event, rq) {
        const tx = rq.result.transaction(modelName, perms);
        const result = action(tx);

        // Transaccion completada satisfatoriamente
        tx.oncomplete = function (event) {
          defered.resolve(event, result);
        };

        // Se generó un error en la transacción
        tx.onabort = function () {
          defered.reject(tx.error);
        };

      });

      return defered;

    };

    // Obtiene un elemento por su key
    thiz.get = function (modelName, key) {
      idbUtils.validate(arguments, ['string', ['string', 'number']]);

      const defered = qs.defer();

      // Se crea una transaccion
      thiz.transaction(modelName, 'readonly', function (tx) {
        const rq = tx.objectStore(modelName).get(key);

        // Transaccion completada satisfatoriamente
        rq.onsuccess = function (event) {
          defered.resolve(rq.result, event);
        };

        // Se generó un error en la transacción
        rq.onerror  = function (event) {
          // Could call rq.preventDefault() to prevent the transaction from aborting.
          defered.reject(event);
        };

      });

      return defered;

    };

    // Inserta un registro en el modelo
    thiz.put = function (modelName, values) {
      idbUtils.validate(arguments, ['string', 'object']);

      const defered = qs.defer();

      // Se crea una transaccion
      thiz.transaction(modelName, 'readwrite', function (tx) {
        const rq = tx.objectStore(modelName).put(values);

        // Transaccion completada satisfatoriamente
        rq.onsuccess = function (event) {
          defered.resolve(event);
        };

        // Se generó un error en la transacción
        rq.onerror  = function (event) {
          // Could call rq.preventDefault() to prevent the transaction from aborting.
          defered.reject(event);
        };

      });

      return defered;

    };

    // Elimina un objeto por su key
    thiz.delete = function (modelName, key) {
      idbUtils.validate(arguments, ['string', ['string', 'number']]);

      const defered = qs.defer();

      // Se crea una transaccion
      thiz.transaction(modelName, 'readwrite', function (tx) {
        const rq = tx.objectStore(modelName).delete(key);

        // Transaccion completada satisfatoriamente
        rq.onsuccess = function (event) {
          defered.resolve(event);
        };

        // Se generó un error en la transacción
        rq.onerror  = function (event) {
          // Could call rq.preventDefault() to prevent the transaction from aborting.
          defered.reject(event);
        };

      });

      return defered;

    };
    // Buscar en el modelo
    thiz.openCursor = function (modelName, filters, eachCb) {
      idbUtils.validate(arguments, ['string', ['object', 'undefined'], 'function']);
      const defered = qs.defer();

      // Se crea una transaccion
      thiz.transaction(modelName, 'readonly', function (tx) {
        const rq = tx.objectStore(modelName).openCursor();

        rq.onsuccess = function() {
          const cursor = rq.result;
          
          // No more matching records.
          if (cursor){
            eachCb(cursor.value, function () {
              // Buscar siguiente
              cursor.continue();
            });
          } else {
            return defered.resolve();
          }


        };

        rq.onerror = function (event) {
          defered.reject(event);
        };

      });

      return defered;

    };

    // Crear alias para los eventos enlazar callbacks a los eventos
    let defereds;
    Object.keys(defereds = {
      onOpen: $openDefered,
      onUpgradeNeeded: $upgradeNeededDefered,
      onSocketConnected: $socketConnectedDefered
    }).map(function (key) {
      defereds[key].promise.done(function (err) {
        const text = $dbName+'.v'+($dbVersion||1)+': '+key;
        if (err){
          $log.error(text, err);
        } else {
          $log.log(text);
        }
      });
      thiz[key] = function (cb) {
        idbUtils.validate(arguments, ['function']);
        defereds[key].promise.done(cb);
        return thiz;
      };
    });

  };

  return idb;

}
