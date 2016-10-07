'use strict';

export default function iDbServiceFactory(ng) {

  // Funcion para el servicio de la BD
  return function iDbService ($q, $iModel, $ngDbUtils, $ngDbEvents, $log) { 'ngInject';

    // En la siguiente linea, puede incluir prefijos de implementacion que quiera probar.
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    // No use "var indexedDB = ..." Si no está en una función.
    // Por otra parte, puedes necesitar referencias a algun objeto window.IDB*:
    const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    const IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    // (Mozilla nunca ha prefijado estos objetos, por lo tanto no necesitamos window.mozIDB*)
    
    if (!indexedDB) {
      window.alert("Su navegador no soporta una versión estable de indexedDB. Tal y como las características no serán validas");
      return;
    }

    // Clase para la creación de instancias de la BD
    return function $iDb($dbName, $dbVersion) { const self = this;
      $ngDbUtils.validate(arguments, ['string', 'number']);

      // Manejadores de eventos.
      let $eventsCallbacks = {};
      let $openDefered = null;

      // Instancia de la base de datos;
      let $request = null;
      self.$models = {};
      
      // Agregar un manejador de evento
      self.$bind = function (eventName, cb) {
        $ngDbUtils.validate(arguments, ['string', 'function']);

        if (!$eventsCallbacks[eventName]){
          $eventsCallbacks[eventName] = [];
        }

        $eventsCallbacks[eventName].push(cb);

      };

      //Remueve un manejador de evento
      self.$unbind = function (eventName, cb) {
        $ngDbUtils.validate(arguments, ['string', 'function']);

        if (!$eventsCallbacks[eventName]) return;

        // Buscar el cb
        const idx = $eventsCallbacks[eventName].indexOf(cb);

        // Si se encontro el cb removerlo
        if (idx != -1){
          $eventsCallbacks[eventName].splice(idx, 1);
        }

      };

      // Dispara un evento
      self.$trigger = function (eventName, args) {
        $ngDbUtils.validate(arguments, ['string', 'object']);

        $log.log($dbName+'.v'+($dbVersion||1)+': '+eventName);

        for(let i in $eventsCallbacks[eventName]){
          $eventsCallbacks[eventName][i].apply(self, args);
        }

      };

      // Abrir una Base de datos.
      self.$open = function () {
        
        if ($openDefered) return $openDefered.promise;

        // Crear un nuevo defer
        $openDefered = $q.defer();

        // dejamos abierta nuestra base de datos
        const request = window.indexedDB.open($dbName, $dbVersion);

        // Asignar el manejador de errores
          // Do something with request.errorCode!
        request.onerror = function (event) {
          self.$trigger($ngDbEvents.DB.OPEN_ERROR, [event, request.errorCode]);
          $openDefered.reject(request.errorCode);
        }

        // Asignar el manejador del resultado
        request.onsuccess = function (event) {
          // Do something with request.result!
          $request = request;

          // Asingar el manejador de errores a la BD
          $request.onerror = function (event) {
            $log.error('Database error: '+ event.target.errorCode);
            self.$trigger($ngDbEvents.DB.ERROR, [event]);
          }

          self.$trigger($ngDbEvents.DB.OPEN_SUCCESS, [event, request]);
          $openDefered.resolve(request);

        };

        // Asignar el callback para la actualizacion de los modelos entre versiones de la BD
        request.onupgradeneeded = function (event) {
          // Do something with request.result!
          
          self.$trigger($ngDbEvents.DB.UPGRATENEEDED, [event, request]);

        };

        return $openDefered.promise;

      };

      // Agrega un nuevo modelo
      self.$model = function (name, def) {

        // Instanciar el modelo
        let model = self.$models[name];

        // Si no existe el modelo crear
        if(!model)
          model = $iModel(self, name);

        // Guardar el modelo en los modelos
        self.$models[name] = model;

        // Retornar el modelo
        return model;

      };

      // Crea el objectStore para un model
      self.$createStore = function (modelName, modelId) {

        self.onUpgrateNeeded(function ($event, request) {

          var db = request.result;
          db.createObjectStore(modelName, modelId);

        });

      };

      // Crea el objectStore para un model
      self.$createIndex = function (modelName, indexName, fieldName, opts) {

        self.onUpgrateNeeded(function ($event, request) {

          var db = request.result;
          var store = request.transaction.objectStore(modelName);
          store.createIndex(indexName, fieldName, opts);

        });

      };

      // Crear alias para los eventos enlazar callbacks a los eventos
      ng.forEach({
        onOpenSuccess: $ngDbEvents.DB.OPEN_SUCCESS,
        onOpenError: $ngDbEvents.DB.OPEN_ERROR,
        onUpgrateNeeded: $ngDbEvents.DB.UPGRATENEEDED,
        onError: $ngDbEvents.DB.ERROR,
      }, function (event, i) {
        self[i] = function (cb) {
          self.$bind(event, cb)
          return self;
        };
      });

    };

  }

}