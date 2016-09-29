(function () {
  'use strict';

  // En la siguiente linea, puede incluir prefijos de implementacion que quiera probar.
  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  // No use "var indexedDB = ..." Si no está en una función.
  // Por otra parte, puedes necesitar referencias a algun objeto window.IDB*:
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  // (Mozilla nunca ha prefijado estos objetos, por lo tanto no necesitamos window.mozIDB*)
  
  if (!window.indexedDB) {
    window.alert("Su navegador no soporta una versión estable de indexedDB.Tal y como las características no serán validas");
    return;
  }

  // Funcion para determinar si es un callback válido o no
  var isCallback = function (cb, throwError) {

    if (typeof cb == 'function' || cb == null || cb == undefined)
      return true;

    return false;

  };

  // Si el callback no es válido lanza un errpor
  var mustBeCallback = function (cb) {
    if (isCallback(cb)) return;

    var err = new Error('Invalid callback');
    err.name = 'InvalidCallback'

    throw err;

  };

  // Genera un error si el valor no es del tipo indicado por parametro
  var mustBe = function (value, types) {
    if (typeof types == 'string') types = [types];
    for(var i in types)
      if (typeof value == types[i]) return;

    var err = new Error('Invalid value: '+value+' must be '+type);
    err.name = 'InvalidValue'
    throw err;

  };

  // Valida un array de argumentos con un arra de tipos
  var validate = function (args, types) {
    args = Array.prototype.slice.call(args);
    if (typeof types == 'string') types = [types];
    for (var i in args)
      if (types[i]){
        if (typeof types[i] == 'string'){
          mustBe(args[i], types[i]);
          continue;
        }
        if (typeof types[i] == 'funcion'){
          types[i](args[i], types[i]);
          continue;
        }

        var err = new Error('Invalid validator to: '+values[i]+' must be '+types[i]);
        err.name = 'InvalidValidator'
        throw err;

      }
  };

  // Nombre de los eventos
  var EVENTS = {
    DB: {
      OPEN: {
        ERROR: 'db.open.error'
      },
      OPENED: 'db.opened',
      ERROR: 'cb.error',
      UPGRATENEEDED: 'cb.upgradeneeded'
    }
  };

  // Clase para las Base de datos.
  var DB = function (name, version) { var self = this;
    validate(arguments, ['string', 'number']);

    // Instancia de la base de datos;
    var dbInstance = null;
    this.models = {};

    // Manejadores de eventos.
    var eventsCallbacks = {};

    // Agregar un manejador de evento
    self.bind = function (eventName, cb) {
      validate(arguments, ['string', mustBeCallback]);

      if (!eventsCallbacks[eventName]) eventsCallbacks[eventName] = [];
      eventsCallbacks[eventName].push(cb);

    };

    //Remueve un manejador de evento
    self.unbind = function (eventName, cb) {
      validate(arguments, ['string', mustBeCallback]);

      if (!eventsCallbacks[eventName]) return;

      // Buscar el cb
      var idx = eventsCallbacks[eventName].indexOf(cb);
      // Si se encontro el cb removerlo
      if (idx != -1)
        eventsCallbacks[eventName].splice(idx, 1);

    };

    // Dispara un evento
    self.trigger = function (eventName, args) {
      validate(arguments, ['string', 'object']);

      for(var i in eventsCallbacks[eventName]){
        eventsCallbacks[eventName].apply(self, args);
      }

    };

    // Abrir una Base de datos.
    self.open = function (cb) {
      validate(arguments, [mustBeCallback, mustBeCallback]);

      // dejamos abierta nuestra base de datos
      var request = window.indexedDB.open(name, version);

      // Asignar el manejador de errores
      request.onerror = function(event) {
        // Do something with request.errorCode!
        self.trigger(EVENTS.DB.OPEN.ERROR, [event]);
        cb(request.errorCode);
      };

      // Asignar el manejador del resultado
      request.onsuccess = function(event) {
        // Do something with request.result!
        dbInstance = request.result;

        self.trigger(EVENTS.DB.OPENED, [event, dbInstance]);

        // Asingar el manejador de errores a la BD
        dbInstance.onerror = function (event) {
          console.error('Database error: '+ event.target.errorCode);
          self.trigger(EVENTS.DB.ERROR, [event]);
        }

        cb(null, dbInstance);

      };

      // Asignar el callback para la actualizacion de los modelos entre versiones de la BD
      request.onupgradeneeded = function (event) {
        self.trigger(EVENTS.DB.UPGRATENEEDED, [event]);
      };

    };

    // Crea un modelo nuevo
    self.model = function (name, options) {
      validate(arguments, ['string', 'object']);

      self.models[name] = new Model(name, options, self);

    };

  };

  // Clase base para los modelos
  var Model = function (name, options, db) { var self = this;

    // Cuando la Base de datos se abierta
    db.bind(EVENTS.DB.OPENED, function (event, dbInstance) {

      dbInstance.createObjectStore(name, options);

    });

  };

})();