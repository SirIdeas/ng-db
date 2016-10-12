'use strict';

// Funcion para el servicio de la BD
export default function idb (qs, idbModel, idbUtils, idbEvents, $log) { 'ngInject';

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
  return function idb(dbName, dbVersion) { const thiz = this;
    idbUtils.validate(arguments, ['string', 'number']);

    // Manejadores de eventos.
    let eventsCallbacks = {};
    let upgradeNeededDefered = qs.defer();
    let openDefered = qs.defer();
    let opened = false;

    // Instancia de la base de datos;
    let request = null;
    thiz.models = {};
    
    // Agregar un manejador de evento
    thiz.bind = function (eventName, cb) {
      idbUtils.validate(arguments, ['string', 'function']);

      if (!eventsCallbacks[eventName]){
        eventsCallbacks[eventName] = [];
      }

      eventsCallbacks[eventName].push(cb);

    };

    //Remueve un manejador de evento
    thiz.unbind = function (eventName, cb) {
      idbUtils.validate(arguments, ['string', 'function']);

      if (!eventsCallbacks[eventName]) return;

      // Buscar el cb
      const idx = eventsCallbacks[eventName].indexOf(cb);

      // Si se encontro el cb removerlo
      if (idx != -1){
        eventsCallbacks[eventName].splice(idx, 1);
      }

    };

    // Dispara un evento
    thiz.trigger = function (eventName, args) {
      idbUtils.validate(arguments, ['string', 'object']);

      $log.log(dbName+'.v'+(dbVersion||1)+': '+eventName);

      for(let i in eventsCallbacks[eventName]){
        eventsCallbacks[eventName][i].apply(thiz, args);
      }

    };

    // Callbacks para los errores
    thiz.error = function (cb) {
      thiz.bind(idbEvents.DB_ERROR, cb);
      return thiz;
    };

    // Abrir una Base de datos.
    thiz.open = function () {
      if (opened) return openDefered;

      // Crear un nuevo defer
      opened = true;

      // dejamos abierta nuestra base de datos
      indexedDB.deleteDatabase(dbName).onsuccess = function () {

        const rq = indexedDB.open(dbName, dbVersion);

        rq.onupgradeneeded = function (event) {
          // Do something with rq.result!
          upgradeNeededDefered.resolve(event, rq);

        };

        // Asignar el manejador del resultado
        rq.onsuccess = function (event) {
          // Do something with rq.result!
          request = rq;
          
          // Asingar el manejador de errores a la BD
          rq.onerror = function (event) {
            $log.error('Database error: '+ event.target.errorCode);
            thiz.trigger(idbEvents.DB_ERROR, [event]);
          }

          openDefered.resolve(event, rq);

        };

        // Asignar el manejador de errores
          // Do something with rq.errorCode!
        rq.onerror = function (event) {
          openDefered.reject(rq.errorCode);
        }

      };

      return openDefered;

    };

    // Agrega un nuevo modelo
    thiz.model = function (name) {
      idbUtils.validate(arguments, ['string']);

      // Instanciar el modelo
      let model = thiz.models[name];

      // Si no existe el modelo crear
      if(!model)
        model = idbModel(thiz, name);

      // Guardar el modelo en los modelos
      thiz.models[name] = model;

      // Retornar el modelo
      return model;

    };

    // Crea el objectStore para un model
    thiz.createStore = function (modelName, modelId) {
      idbUtils.validate(arguments, ['string', ['object', 'undefined']]);

      upgradeNeededDefered.promise.then(function (event, rq) {
        rq.result.createObjectStore(modelName, modelId);
      });

    };

    // Crea el objectStore para un model
    thiz.createIndex = function (modelName, indexName, fieldName, opts) {
      idbUtils.validate(arguments, ['string', 'string', 'string', ['object', 'undefined']]);

      upgradeNeededDefered.promise.then(function (event, rq) {
        let store = rq.transaction.objectStore(modelName);
        store.createIndex(indexName, fieldName, opts);
      });

    };

    // Crea una transacción
    thiz.transaction = function(modelName, perms, action, cb) {
      idbUtils.validate(arguments, ['string', 'string', 'function', ['function', 'undefined']]);

      let defered = qs.defer(cb);

      // Cuando se abra la BD
      openDefered.promise.then(function (event, rq) {
        let tx = rq.result.transaction(modelName, perms);
        let result = action(tx);

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

    // Inserta un registro en el modelo
    thiz.create = function (modelName, instance, cb) {
      idbUtils.validate(arguments, ['string', ['object', 'function'], ['function', 'undefined']]);

      let defered = qs.defer(cb);

      // Se crea una transaccion
      thiz.transaction(modelName, 'readwrite', function (tx) {
        let rq = tx.objectStore(modelName).put(instance);

        // Transaccion completada satisfatoriamente
        rq.onsuccess  = function (event) {
          defered.resolve(event, instance);
        };

        // Se generó un error en la transacción
        rq.onerror  = function () {
          // Could call rq.preventDefault() to prevent the transaction from aborting.
          defered.reject(rq);
        };

      });

    };

    // Buscar en el modelo
    thiz.find = function (Model, modelName, scope, cb) {
      idbUtils.validate(arguments, ['function', 'string', ['object', 'undefined'], 'function']);

      let defered = qs.defer(cb);
      let result = [];

      // Se crea una transaccion
      thiz.transaction(modelName, 'readonly', function (tx) {
        let store = tx.objectStore(modelName);
        let request = store.openCursor();

        request.onsuccess = function() {
          let cursor = request.result;

          // No more matching records.
          if (!cursor) return defered.resolve(result);
          
          // Called for each matching record.
          result.push(Model.get(cursor.value));
          cursor.continue();

        };

      });

    };

    // Crear alias para los eventos enlazar callbacks a los eventos
    let defereds;
    Object.keys(defereds = {
      onOpen: openDefered,
      onUpgradeNeeded: upgradeNeededDefered,
    }).map(function (key) {
      defereds[key].promise.done(function (err) {
        let text = dbName+'.v'+(dbVersion||1)+': '+key;
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

}
