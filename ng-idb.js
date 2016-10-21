/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _idbUtils = __webpack_require__(1);
	
	var _idbUtils2 = _interopRequireDefault(_idbUtils);
	
	var _idbEvents = __webpack_require__(2);
	
	var _idbEvents2 = _interopRequireDefault(_idbEvents);
	
	var _qs = __webpack_require__(3);
	
	var _qs2 = _interopRequireDefault(_qs);
	
	var _idb = __webpack_require__(4);
	
	var _idb2 = _interopRequireDefault(_idb);
	
	var _idbModel = __webpack_require__(5);
	
	var _idbModel2 = _interopRequireDefault(_idbModel);
	
	var _idbQuery = __webpack_require__(7);
	
	var _idbQuery2 = _interopRequireDefault(_idbQuery);
	
	var _idbSocket = __webpack_require__(9);
	
	var _idbSocket2 = _interopRequireDefault(_idbSocket);
	
	var _lb = __webpack_require__(6);
	
	var _lb2 = _interopRequireDefault(_lb);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _lb2.default)(angular.module('ng.idb', [])).constant('io', io).constant('idbVersion', '0.0.1').service('idbEvents', _idbEvents2.default).service('idbUtils', _idbUtils2.default).service('qs', _qs2.default)
	
	// Take of lb-services.js
	.service('idb', _idb2.default).service('idbModel', _idbModel2.default).service('idbQuery', _idbQuery2.default).service('idbSocket', _idbSocket2.default);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	idbUtils.$inject = ["$q"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = idbUtils;
	function idbUtils($q) {
	  'ngInject';
	
	  // Funcion para determinar si es un callback válido o no
	
	  function isCallback(cb) {
	
	    return typeof cb == 'function' || cb == null || cb == undefined;
	  }
	
	  // Si el callback no es válido lanza un errpor
	  function mustBeCallback(cb) {
	    if (isCallback(cb)) return;
	
	    var err = new Error('Invalid callback');
	    err.name = 'InvalidCallback';
	
	    throw err;
	  }
	
	  // Genera un error si el valor no es del tipo indicado por parametro
	  function mustBe(value, types) {
	    if (typeof types == 'string') types = [types];
	    for (var i in types) {
	      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == types[i]) return;
	    }
	    var err = new Error('Invalid value: ' + value + ' must be ' + types.join(' or '));
	    err.name = 'InvalidValue';
	    throw err;
	  }
	
	  // Valida un array de argumentos con un arra de tipos
	  function validate(args, types) {
	
	    args = Array.prototype.slice.call(args);
	    if (typeof types == 'string') types = [types];
	    for (var i in args) {
	      if (types[i]) {
	        if (types[i] == null) {
	          continue;
	        }
	        if (typeof types[i] == 'string' || _typeof(types[i]) == 'object') {
	          mustBe(args[i], types[i]);
	          continue;
	        }
	        if (typeof types[i] == 'function') {
	          if (types[i](args[i])) continue;
	        }
	
	        var err = new Error('Invalid validator to: ' + args[i] + ' must be ' + types[i]);
	        err.name = 'InvalidValidator';
	        throw err;
	      }
	    }
	  }
	
	  return {
	    isCallback: isCallback,
	    mustBeCallback: mustBeCallback,
	    mustBe: mustBe,
	    validate: validate
	  };
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	// Nombre de los eventos
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = idbEvents;
	function idbEvents() {
	  return {
	    DB_ERROR: 'cb.error'
	  };
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = qs;
	function qs() {
	  'ngInject';
	
	  function qsClass(cb) {
	    var thiz = this;
	
	    var thens = [];
	    var thensReady = [];
	    var catchs = [];
	    var catchsReady = [];
	    var resultArgs = null;
	    var error = null;
	
	    thiz.promise = {};
	    thiz.$resolved = false;
	
	    function thensResolved() {
	      if (!thens.length) return;
	      var cb = thens.shift();
	      cb.apply(null, thiz.resultArgs);
	      thensReady.push(cb);
	      thensResolved();
	    }
	
	    function catchsResolved() {
	      if (!catchs.length) return;
	      var cb = catchs.shift();
	      cb.apply(null, thiz.error);
	      catchsReady.push(cb);
	      catchsResolved();
	    }
	
	    thiz.resolve = function () {
	      if (thiz.$resolved) return;
	      thiz.$resolved = true;
	      thiz.resultArgs = Array.prototype.slice.call(arguments);
	      thensResolved();
	    };
	
	    thiz.reject = function (err) {
	      if (thiz.$resolved) return;
	      thiz.$resolved = true;
	      thiz.error = err || {};
	      catchsResolved();
	    };
	
	    thiz.promise.then = function (cb) {
	      thens.push(cb);
	      if (thiz.$resolved && !thiz.error) {
	        thensResolved();
	      }
	      return thiz;
	    };
	
	    thiz.promise.catch = function (cb) {
	      catchs.push(cb);
	      if (thiz.$resolved && thiz.error) {
	        catchsResolved();
	      }
	      return thiz;
	    };
	
	    thiz.promise.done = function (cb) {
	
	      thens.push(function () {
	        cb.apply(null, [null].concat(thiz.resultArgs));
	      });
	
	      catchs.push(function () {
	        cb.apply(null, thiz.error);
	      });
	
	      if (thiz.$resolved) {
	        if (!thiz.error) {
	          thensResolved();
	        } else {
	          catchsResolved();
	        }
	      }
	
	      return thiz;
	    };
	
	    if (cb) thiz.promise.done(cb);
	  };
	
	  // Crea una instancia del defered
	  qsClass.defer = function (cb) {
	    return new qsClass(cb);
	  };
	
	  return qsClass;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	// Funcion para el servicio de la BD
	
	idbService.$inject = ["$log", "qs", "idbUtils", "idbEvents", "idbModel", "idbQuery", "idbSocket", "lbAuth"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = idbService;
	function idbService($log, qs, idbUtils, idbEvents, idbModel, idbQuery, idbSocket, lbAuth) {
	  'ngInject';
	
	  // En la siguiente linea, puede incluir prefijos de implementacion que quiera probar.
	
	  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	  // No use "const indexedDB = ..." Si no está en una función.
	  // Por otra parte, puedes necesitar referencias a algun objeto window.IDB*:
	  var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	  var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	  // (Mozilla nunca ha prefijado estos objetos, por lo tanto no necesitamos window.mozIDB*)
	
	  if (!indexedDB) {
	    alert("Su navegador no soporta una versión estable de indexedDB. Tal y como las características no serán validas");
	    return;
	  }
	
	  // Clase para la creación de instancias de la BD
	  function idb($dbName, $dbVersion, $socket) {
	    var thiz = this;
	    idbUtils.validate(arguments, ['string', 'number', ['object', 'undefined'], ['object', 'undefined']]);
	
	    // Manejadores de eventos.
	    var $eventsCallbacks = {};
	    var $upgradeNeededDefered = qs.defer();
	    var $openDefered = qs.defer();
	    var $socketConnectedDefered = qs.defer();
	    var $opened = false;
	
	    // Instancia de la base de datos;
	    var $request = null;
	    thiz.models = {};
	
	    // Agregar un manejador de evento
	    thiz.bind = function (eventName, cb) {
	      idbUtils.validate(arguments, ['string', 'function']);
	
	      if (!$eventsCallbacks[eventName]) {
	        $eventsCallbacks[eventName] = [];
	      }
	
	      $eventsCallbacks[eventName].push(cb);
	    };
	
	    //Remueve un manejador de evento
	    thiz.unbind = function (eventName, cb) {
	      idbUtils.validate(arguments, ['string', 'function']);
	
	      if (!$eventsCallbacks[eventName]) return;
	
	      // Buscar el cb
	      var idx = $eventsCallbacks[eventName].indexOf(cb);
	
	      // Si se encontro el cb removerlo
	      if (idx != -1) {
	        $eventsCallbacks[eventName].splice(idx, 1);
	      }
	    };
	
	    // Dispara un evento
	    thiz.trigger = function (eventName, args) {
	      idbUtils.validate(arguments, ['string', 'object']);
	
	      $log.log($dbName + '.v' + ($dbVersion || 1) + ': ' + eventName);
	
	      for (var i in $eventsCallbacks[eventName]) {
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
	      // indexedDB.deleteDatabase($dbName).onsuccess =
	      function ready() {
	
	        var rq = indexedDB.open($dbName, $dbVersion);
	
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
	            $log.error('Database error: ' + event.target.errorCode);
	            thiz.trigger(idbEvents.DB_ERROR, [event]);
	          };
	
	          $openDefered.resolve(event, rq);
	        };
	
	        // Asignar el manejador de errores
	        // Do something with rq.errorCode!
	        rq.onerror = function (event) {
	          $openDefered.reject(rq.errorCode);
	        };
	      };
	
	      ready();
	
	      return $openDefered;
	    };
	
	    // Agrega un nuevo modelo
	    thiz.model = function (name, socket) {
	      idbUtils.validate(arguments, ['string']);
	
	      // Instanciar el modelo
	      var model = thiz.models[name];
	
	      // Si no existe el modelo crear
	      if (!model) {
	        model = idbModel(thiz, name, socket || $socket);
	      }
	
	      // Guardar el modelo en los modelos
	      thiz.models[name] = model;
	
	      // Retornar el modelo
	      return model;
	    };
	
	    // Cra una instancia de un query
	    thiz.query = function (Model, filters) {
	
	      return new idbQuery(thiz, Model, filters);
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
	        var store = rq.transaction.objectStore(modelName);
	        store.createIndex(indexName, fieldName, opts);
	      });
	    };
	
	    // Crea una transacción
	    thiz.transaction = function (modelName, perms, action, cb) {
	      idbUtils.validate(arguments, ['string', 'string', 'function', ['function', 'undefined']]);
	
	      var defered = qs.defer(cb);
	
	      // Cuando se abra la BD
	      $openDefered.promise.then(function (event, rq) {
	        var tx = rq.result.transaction(modelName, perms);
	        var result = action(tx);
	
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
	
	      var defered = qs.defer(cb);
	
	      // Se crea una transaccion
	      thiz.transaction(modelName, 'readwrite', function (tx) {
	        var rq = tx.objectStore(modelName).put(instance.values());
	
	        // Transaccion completada satisfatoriamente
	        rq.onsuccess = function (event) {
	          defered.resolve(event, instance);
	        };
	
	        // Se generó un error en la transacción
	        rq.onerror = function () {
	          // Could call rq.preventDefault() to prevent the transaction from aborting.
	          defered.reject(rq);
	        };
	      });
	
	      return defered.$promise;
	    };
	
	    // Obtiene un elemento por si key
	    thiz.get = function (Model, key, cb) {
	      idbUtils.validate(arguments, ['function', 'string', null, ['function', 'undefined']]);
	
	      var data = {};
	      Model.searchDeepField({}, Model.getKeyPath(), function (obj, lastField) {
	        obj[lastField] = key;
	      });
	
	      var modelName = Model.getModelName();
	      var defered = qs.defer(cb);
	      var instance = Model.getInstance(key, data);
	
	      instance.$promise = defered.promise;
	      instance.$resolved = false;
	
	      thiz.transaction(modelName, 'readonly', function (tx) {
	        var store = tx.objectStore(modelName);
	        var rq = store.get(key);
	
	        rq.onsuccess = function () {
	          if (rq.result != undefined) {
	            instance.setAttributes(rq.result, true);
	            instance.$isNew = false;
	          }
	          instance.$resolved = true;
	          defered.resolve(instance);
	        };
	
	        rq.onerror = function () {
	          defered.reject(instance);
	        };
	      });
	
	      return instance;
	    };
	
	    // Buscar en el modelo
	    thiz.find = function (Model, filters, cb) {
	      idbUtils.validate(arguments, ['function', ['object', 'undefined'], ['function', 'undefined']]);
	      var modelName = Model.getModelName();
	      var defered = qs.defer(cb);
	      var result = [];
	
	      result.$promise = defered.promise;
	      result.$resolved = false;
	
	      // Se crea una transaccion
	      thiz.transaction(modelName, 'readonly', function (tx) {
	        var store = tx.objectStore(modelName);
	        var rq = store.openCursor();
	
	        rq.onsuccess = function () {
	          var cursor = rq.result;
	
	          // No more matching records.
	          if (!cursor) {
	            result.$resolved = true;
	            return defered.resolve(result);
	          }
	
	          // Obtener la instancia
	          var record = Model.getInstanceFromObject(cursor.value);
	          record.$isNew = false; // Inicar que no es un registro nuevo
	
	          // Agregar al resultado
	          result.push(record);
	
	          // Buscar siguiente
	          cursor.continue();
	        };
	      });
	
	      return result;
	    };
	
	    // Crear alias para los eventos enlazar callbacks a los eventos
	    var defereds = void 0;
	    Object.keys(defereds = {
	      onOpen: $openDefered,
	      onUpgradeNeeded: $upgradeNeededDefered,
	      onSocketConnected: $socketConnectedDefered
	    }).map(function (key) {
	      defereds[key].promise.done(function (err) {
	        var text = $dbName + '.v' + ($dbVersion || 1) + ': ' + key;
	        if (err) {
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	// Funcion para el servicio de la BD
	
	idbModelService.$inject = ["$log", "qs", "idbUtils", "lbResource", "$timeout"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = idbModelService;
	function idbModelService($log, qs, idbUtils, lbResource, $timeout) {
	  'ngInject';
	
	  return function idbModel($db, $modelName, $socket) {
	    idbUtils.validate(arguments, [null, 'string']);
	
	    // Clave del modelo
	    var $id = { keyPath: 'id', autoIncrement: true };
	    var $fields = {};
	    var $instances = {};
	    var $remote = null;
	
	    // Constuctor del modelo
	    function Model(data, stored) {
	      idbUtils.validate(arguments, [['object', 'undefined'], 'boolean']);
	
	      this.$isNew = true;
	      this.$record = null;
	      this.$originalValues = {};
	      this.$stored = stored;
	
	      this.setAttributes(data || {}, true);
	      this.constructor(data);
	
	      if ($socket) {
	        this.listen();
	      }
	    };
	
	    // Devuelv el nombre del modelo
	    Model.getModelName = function () {
	
	      return $modelName;
	    };
	
	    // Devuelv el nombre del modelo
	    Model.getKeyPath = function () {
	
	      return $id.keyPath;
	    };
	
	    // Asigna el ID al modelo
	    Model.autoIncrement = function (autoIncrement) {
	      idbUtils.validate(arguments, ['boolean']);
	
	      $id.autoIncrement = autoIncrement;
	      return Model;
	    };
	
	    // Asigna el ID al modelo
	    Model.keyPath = function (keyPath) {
	      idbUtils.validate(arguments, ['string']);
	
	      $id.keyPath = keyPath;
	      return Model;
	    };
	
	    // Crea el objecto storage para el modelo.
	    Model.createStore = function () {
	
	      $db.createStore($modelName, $id);
	      return Model;
	    };
	
	    // Agrega un index
	    Model.index = function (indexName, fieldName, opts) {
	      $db.createIndex($modelName, indexName, fieldName, opts);
	      return Model;
	    };
	
	    // Método que permite modificar model.
	    Model.build = function (buildCallback) {
	      idbUtils.validate(arguments, ['function']);
	      buildCallback(Model);
	      return Model;
	    };
	
	    // Asigna la especificación de los campos
	    Model.fields = function (fields) {
	      idbUtils.validate(arguments, ['object']);
	
	      $fields = {};
	      $fields[$id.keyPath] = {
	        "type": "number",
	        "required": true
	      };
	
	      Object.keys(fields).map(function (fieldName) {
	        var field = fields[fieldName];
	        if (typeof fields[fieldName] == 'string') {
	          field = { "type": field };
	        }
	        $fields[fieldName] = field;
	      });
	
	      return Model;
	    };
	
	    // Configura el remote api;
	    Model.remote = function (url, args, actions) {
	      idbUtils.validate(arguments, ['string', 'object', 'object']);
	      $remote = lbResource(url, args, actions);
	      return Model;
	    };
	
	    // Crea nuevas instancias de los modelos
	    Model.create = function (data, cb) {
	      idbUtils.validate(arguments, ['object', ['function', 'undefined']]);
	
	      // Si es un array
	      if (data.length === undefined) {
	        return Model.getInstanceFromObject(record).create(cb);
	      }
	
	      // Obtener una copia del array
	      var arr = Array.prototype.slice.call(data);
	      var result = [];
	      var defered = qs.defer(cb);
	
	      (function iteration() {
	
	        // No quedan elementos en el array
	        if (arr.length == 0) return defered.resolve(result);
	
	        // Crear el siguiente elemento
	        Model.create(arr.shift(), function (err, instance) {
	          if (err) return defered.reject(err);
	          result.push(instance);
	          iteration();
	        });
	      })();
	
	      // Devolver el promise
	      return defered;
	    };
	
	    // Buscar un campo
	    Model.searchDeepField = function (obj, field, cb) {
	      idbUtils.validate(arguments, ['object', 'string', 'function']);
	
	      var fields = field.split('.');
	      var lastField = fields.pop();
	
	      return function _set(obj) {
	        if (fields.length == 0) return cb(obj, lastField);
	        var field = fields.shift();
	        if (typeof obj[field] === 'undefined') obj[field] = {};
	        return _set(obj[field]);
	      }(obj);
	    };
	
	    // Devuelve el valor correspondiente al key de un objeto
	    Model.getKeyFrom = function (data) {
	      return Model.searchDeepField(data, $id.keyPath, function (obj, lastField) {
	        return obj[lastField];
	      });
	    };
	
	    // Devuelve la instancia del model de las guardadas. Si no existe entonce
	    // se crea
	    Model.getInstance = function (key, data) {
	
	      // El objeto no tiene ID
	      if (!key) {
	        return new Model(data);
	      }
	
	      // No existe la instancia entonce se crea
	      if (!$instances[key]) {
	        $instances[key] = new Model(data, true);
	      }
	
	      return $instances[key];
	    };
	
	    // Crea una instancia del modelo a partir de un object
	    Model.getInstanceFromObject = function (data) {
	      idbUtils.validate(arguments, ['object']);
	
	      var record = Model.getInstance(Model.getKeyFrom(data), data);
	      return record;
	    };
	
	    // Busca un registro en la objectStore del modelo.
	    Model.get = function (key, cb) {
	
	      return $db.get(Model, key, cb);
	    };
	
	    // Buscar en el modelo
	    Model.find = function (filters) {
	      // let args = Array.prototype.slice.call(arguments);
	      // cb = args.pop(); filters = args.pop();
	      // if ($remote) {
	      //   // Buscar los registros en la API
	      //   $remote.find(filters, cb).$promise
	      //     .then(function (result) {
	      //       result.map(function (record, idx) {
	
	      //         Model.get(Model.getKeyFrom(record)).$promise
	      //           .then(function (instance) {
	      //             instance
	      //               .setAttributes(record)
	      //               .resource(record);
	      //             if (instance.$isNew){
	      //               instance.create();
	      //             }
	      //           });
	
	      //       });
	      //     })
	      //     .catch(function (err) {
	      //       console.log(['err', err])
	      //     });
	      // }
	      return $db.query(Model, filters);
	    };
	
	    // Asigna los atributos
	    Model.prototype.setAttributes = function (data, original) {
	      var thiz = this;
	      idbUtils.validate(arguments, ['object']);
	
	      Object.keys(data).map(function (property) {
	        thiz.set(property, data[property], original);
	      });
	
	      return thiz;
	    };
	
	    // Devuelve el valor de una propiedad
	    Model.prototype.get = function (field) {
	      var thiz = this;
	      return Model.searchDeepField(thiz, field, function (obj, lastField) {
	        return obj[lastField];
	      });
	    };
	
	    // Asigna in valor a un campo
	    Model.prototype.set = function (field, value, original) {
	      var thiz = this;
	
	      Model.searchDeepField(thiz.$originalValues, field, function (obj, lastField) {
	        obj[lastField] = value;
	      });
	      Model.searchDeepField(thiz, field, function (obj, lastField) {
	        obj[lastField] = value;
	      });
	      return thiz;
	    };
	
	    // Obtiene los valores reales actuales para guardar en el store
	    Model.prototype.values = function () {
	      var thiz = this;
	      var values = {};
	
	      Object.keys($fields).map(function (field) {
	        Model.searchDeepField(values, field, function (obj, lastField) {
	          obj[lastField] = thiz.get(field);
	        });
	      });
	
	      return values;
	    };
	
	    // Consturctor que se puede sobre escribir
	    Model.prototype.constructor = function (data) {};
	
	    // Guarda los datos del objeto
	    Model.prototype.create = function (cb) {
	      var thiz = this;
	      return $db.create($modelName, this, function (err, event) {
	        if (err) {
	          if (cb) cb(err);return;
	        };
	
	        // Asignar el generado al modelo
	        thiz.set($id.keyPath, event.target.result);
	        thiz.$isNew = false;
	
	        // Si la instancia creada no concuerda con la guardada
	        if ($instances[thiz.get($id.keyPath)]) {
	          if ($instances[thiz.get($id.keyPath)] !== thiz) {
	            throw new Error('idbModel.TwoInstancesWithSameKey');
	          }
	        } else {
	          // Guardar la instancia en la colecion de instancias
	          $instances[thiz.get($id.keyPath)] = thiz;
	        }
	
	        if (cb) cb.apply(null, [null].concat(Array.prototype.slice.call(arguments)));
	      });
	    };
	
	    // Funcion que hace escuchars los mensajes del socket para el model
	    Model.prototype.listen = function () {
	      var thiz = this;
	      if (!$socket) throw new Error('Model.DoesNotHaveSocketInstance');
	
	      $socket.subscribe({
	        modelName: $modelName,
	        eventName: 'update',
	        modelId: thiz.get(Model.getKeyPath())
	      }, function (data) {
	        $timeout(function () {
	          thiz.setAttributes(data || {}, true);
	        });
	      });
	    };
	
	    // Asigna la instancia del registro
	    Model.prototype.resource = function (record) {
	      this.$record = record;
	      return this;
	    };
	
	    return Model;
	  };
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = lb;
	function lb(module) {
	
	  // Dvuelve el host de una URL
	  function getHost(url) {
	    var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
	    return m ? m[1] : null;
	  }
	
	  var urlBaseHost = location.host;
	
	  var lbAuth = function lbAuth() {
	    'ngInject';
	
	    var props = ['accessTokenId', 'currentUserId', 'rememberMe'];
	    var propsPrefix = '$idb-lb$';
	
	    // Note: LocalStorage converts the value to string
	    // We are using empty string as a marker for null/undefined values.
	    function save(storage, name, value) {
	      try {
	        var key = propsPrefix + name;
	        if (value == null) value = '';
	        storage[key] = value;
	      } catch (err) {
	        console.log('Cannot access local/session storage:', err);
	      }
	    }
	
	    function load(name) {
	      var key = propsPrefix + name;
	      return localStorage[key] || sessionStorage[key] || null;
	    }
	
	    function lbAuth() {
	      var thiz = this;
	
	      props.forEach(function (name) {
	        thiz[name] = load(name);
	      });
	      thiz.currentUserData = null;
	    }
	
	    lbAuth.prototype.save = function () {
	      var thiz = this;
	      var storage = thiz.rememberMe ? localStorage : sessionStorage;
	      props.forEach(function (name) {
	        save(storage, name, thiz[name]);
	      });
	    };
	
	    lbAuth.prototype.setUser = function (accessTokenId, userId, userData) {
	      var thiz = this;
	      thiz.accessTokenId = accessTokenId;
	      thiz.currentUserId = userId;
	      thiz.currentUserData = userData;
	    };
	
	    lbAuth.prototype.clearUser = function () {
	      var thiz = this;
	      thiz.accessTokenId = null;
	      thiz.currentUserId = null;
	      thiz.currentUserData = null;
	    };
	
	    lbAuth.prototype.clearStorage = function () {
	      props.forEach(function (name) {
	        save(sessionStorage, name, null);
	        save(localStorage, name, null);
	      });
	    };
	
	    return new lbAuth();
	  };
	
	  var lbAuthRequestInterceptor = function lbAuthRequestInterceptor($q, lbAuth) {
	    'ngInject';
	
	    return {
	      request: function request(config) {
	        // filter out external requests
	        var host = getHost(config.url);
	        if (host && host !== urlBaseHost) {
	          return config;
	        }
	
	        if (lbAuth.accessTokenId) {
	          config.headers[authHeader] = lbAuth.accessTokenId;
	        } else if (config.__isGetCurrentUser__) {
	          // Return a stub 401 error for User.getCurrent() when
	          // there is no user logged in
	          var res = {
	            body: { error: { status: 401 } },
	            status: 401,
	            config: config,
	            headers: function headers() {
	              return undefined;
	            }
	          };
	          return $q.reject(res);
	        }
	        return config || $q.when(config);
	      }
	    };
	  };
	  lbAuthRequestInterceptor.$inject = ["$q", "lbAuth"];
	
	  var lbResource = function lbResource() {
	    'ngInject';
	    var thiz = this;
	
	    var options = {
	      urlBase: "/api",
	      authHeader: 'authorization'
	    };
	
	    urlBaseHost = getHost(options.urlBase) || location.host;
	
	    /**
	     * @ngdoc method
	     * @name lbServices.lbResourceProvider#setAuthHeader
	     * @methodOf lbServices.lbResourceProvider
	     * @param {string} header The header name to use, e.g. `X-Access-Token`
	     * @description
	     * Configure the REST transport to use a different header for sending
	     * the authentication token. It is sent in the `Authorization` header
	     * by default.
	     */
	    thiz.setAuthHeader = function (header) {
	      options.authHeader = header;
	    },
	
	    /**
	     * @ngdoc method
	     * @name lbServices.lbResourceProvider#getAuthHeader
	     * @methodOf lbServices.lbResourceProvider
	     * @description
	     * Get the header name that is used for sending the authentication token.
	     */
	    thiz.getAuthHeader = function () {
	      return options.authHeader;
	    },
	
	    /**
	     * @ngdoc method
	     * @name lbServices.lbResourceProvider#setUrlBase
	     * @methodOf lbServices.lbResourceProvider
	     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
	     * @description
	     * Change the URL of the REST API server. By default, the URL provided
	     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
	     */
	    thiz.setUrlBase = function (url) {
	      options.urlBase = url;
	      urlBaseHost = getHost(options.urlBase) || location.host;
	    },
	
	    /**
	     * @ngdoc method
	     * @name lbServices.lbResourceProvider#getUrlBase
	     * @methodOf lbServices.lbResourceProvider
	     * @description
	     * Get the URL of the REST API server. The URL provided
	     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
	     */
	    thiz.getUrlBase = function () {
	      return options.urlBase;
	    };
	
	    thiz.$get = ["$resource", function ($resource) {
	      'ngInject';
	
	      var lbResource = function lbResource(url, params, actions) {
	
	        Object.keys(actions).map(function (key) {
	          actions[key].originalUrl = actions[key].url;
	          actions[key].url = options.urlBase + actions[key].url;
	        });
	
	        var resource = $resource(options.urlBase + url, params, actions);
	
	        // Angular always calls POST on $save()
	        // This hack is based on
	        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
	        resource.prototype.$save = function (success, error) {
	          // Fortunately, LoopBack provides a convenient `upsert` method
	          // that exactly fits our needs.
	          var result = resource.upsert.call(this, {}, this, success, error);
	          return result.$promise || result;
	        };
	        return resource;
	      };
	
	      lbResource.getUrlBase = function () {
	        return options.urlBase;
	      };
	
	      lbResource.getAuthHeader = function () {
	        return options.authHeader;
	      };
	
	      return lbResource;
	    }];
	  };
	
	  return module.factory('lbAuth', lbAuth).provider('lbResource', lbResource).factory('lbAuthRequestInterceptor', lbAuthRequestInterceptor).config(['$httpProvider', function ($httpProvider) {
	    'ngInject';
	
	    $httpProvider.interceptors.push('lbAuthRequestInterceptor');
	  }]);
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	// Funcion para el servicio de la BD
	
	idbQuery.$inject = ["$log", "idbUtils"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = idbQuery;
	function idbQuery($log, idbUtils) {
	  'ngInject';
	
	  return function idbQuery($db, $Model, $filters) {
	    var thiz = this;
	    idbUtils.validate(arguments, ['object', 'function', ['object', 'undefined']]);
	
	    var $result = null;
	    var $remoteResult = [];
	
	    // Funcion que devuelve ejecuta el query y devuelve el resultado.
	    thiz.getResult = function (cb) {
	      idbUtils.validate(arguments, [['function', 'undefined']]);
	
	      // Ejecutar si no se ha ejecutado
	      if (!$result) $result = $db.find($Model, $filters, cb);
	      return $result;
	    };
	  };
	}

/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	idbSocketService.$inject = ["$log", "io", "idbUtils"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = idbSocketService;
	function idbSocketService($log, io, idbUtils) {
	  'ngInject';
	  var thiz = this;
	
	  var $defUrlServer = null;
	
	  function idbSocket($urlServer, $accessTokenId, $currentUserId) {
	    var thiz = this;
	    idbUtils.validate(arguments, ['string', ['string', 'number'], ['string', 'number']]);
	
	    var $listeners = [];
	    var $socket = null;
	    $urlServer = $urlServer || $defUrlServer;
	
	    // Conectarse al servidor
	    thiz.connect = function () {
	
	      // Creating connection with server
	      $socket = io.connect($urlServer);
	
	      // This part is only for login users for authenticated $socket connection between client and server.
	      // If you are not using login page in you website then you should remove rest piece of code..
	
	      $socket.on('connect', function () {
	        $log.log('connected');
	
	        $socket.emit('authentication', {
	          id: $accessTokenId,
	          userId: $currentUserId
	        });
	        $socket.on('authenticated', function () {
	          // use the $socket as usual
	          $log.log('User is authenticated');
	        });
	      });
	    };
	
	    thiz.subscribe = function (options, cb) {
	      idbUtils.validate(arguments, ['object', ['function', 'undefined']]);
	
	      var name = options.modelName + '.' + options.eventName;
	
	      if (typeof options.modelId === 'number') {
	        name = name + '.' + options.modelId;
	      }
	
	      $socket.on(name, cb);
	
	      //Push the container..
	      $listeners.push(name, cb);
	    };
	
	    thiz.pushListener = function (subscriptionName, cb) {
	      idbUtils.validate(arguments, ['string', ['function', 'undefined']]);
	
	      $listeners.push(subscriptionName);
	    };
	
	    thiz.unsubscribe = function (subscriptionName) {
	      $socket.removeAllListeners(subscriptionName);
	      var idx = $listeners.indexOf(subscriptionName);
	      if (idx != -1) {
	        $listeners.splice(idx, 1);
	      }
	    };
	
	    thiz.connect();
	  };
	
	  // Asigna la URL de servidor por defecto
	  idbSocket.setUrlServer = function (urlServer) {
	    $defUrlServer = urlServer;
	  };
	
	  // ASigna las credenciales por defecto
	  idbSocket.setCredentials = function (accessTokenId, currentUserId) {
	    accessTokenId = $accessTokenId;
	    currentUserId = $currentUserId;
	  };
	
	  return idbSocket;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTNkMTkzNjU4YmM4M2RhZTU3ODIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiVXRpbHMuanM/MWJiNCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJFdmVudHMuanM/NDg2YSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3FzLmpzPzY0MzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiLmpzPzYzNTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qcz9mOWY5Iiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9sYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvbGIuanM/MzAwNiIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlF1ZXJ5LmpzP2Y3N2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzP2QxYTEiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnN0YW50IiwiaW8iLCJzZXJ2aWNlIiwiaWRiVXRpbHMiLCIkcSIsImlzQ2FsbGJhY2siLCJjYiIsInVuZGVmaW5lZCIsIm11c3RCZUNhbGxiYWNrIiwiZXJyIiwiRXJyb3IiLCJuYW1lIiwibXVzdEJlIiwidmFsdWUiLCJ0eXBlcyIsImkiLCJqb2luIiwidmFsaWRhdGUiLCJhcmdzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJpZGJFdmVudHMiLCJEQl9FUlJPUiIsInFzIiwicXNDbGFzcyIsInRoaXoiLCJ0aGVucyIsInRoZW5zUmVhZHkiLCJjYXRjaHMiLCJjYXRjaHNSZWFkeSIsInJlc3VsdEFyZ3MiLCJlcnJvciIsInByb21pc2UiLCIkcmVzb2x2ZWQiLCJ0aGVuc1Jlc29sdmVkIiwibGVuZ3RoIiwic2hpZnQiLCJhcHBseSIsInB1c2giLCJjYXRjaHNSZXNvbHZlZCIsInJlc29sdmUiLCJhcmd1bWVudHMiLCJyZWplY3QiLCJ0aGVuIiwiY2F0Y2giLCJkb25lIiwiY29uY2F0IiwiZGVmZXIiLCJpZGJTZXJ2aWNlIiwiJGxvZyIsImlkYk1vZGVsIiwiaWRiUXVlcnkiLCJpZGJTb2NrZXQiLCJsYkF1dGgiLCJpbmRleGVkREIiLCJ3aW5kb3ciLCJtb3pJbmRleGVkREIiLCJ3ZWJraXRJbmRleGVkREIiLCJtc0luZGV4ZWREQiIsIklEQlRyYW5zYWN0aW9uIiwid2Via2l0SURCVHJhbnNhY3Rpb24iLCJtc0lEQlRyYW5zYWN0aW9uIiwiSURCS2V5UmFuZ2UiLCJ3ZWJraXRJREJLZXlSYW5nZSIsIm1zSURCS2V5UmFuZ2UiLCJhbGVydCIsImlkYiIsIiRkYk5hbWUiLCIkZGJWZXJzaW9uIiwiJHNvY2tldCIsIiRldmVudHNDYWxsYmFja3MiLCIkdXBncmFkZU5lZWRlZERlZmVyZWQiLCIkb3BlbkRlZmVyZWQiLCIkc29ja2V0Q29ubmVjdGVkRGVmZXJlZCIsIiRvcGVuZWQiLCIkcmVxdWVzdCIsIm1vZGVscyIsImJpbmQiLCJldmVudE5hbWUiLCJ1bmJpbmQiLCJpZHgiLCJpbmRleE9mIiwic3BsaWNlIiwidHJpZ2dlciIsImxvZyIsIm9wZW4iLCJyZWFkeSIsInJxIiwib251cGdyYWRlbmVlZGVkIiwiZXZlbnQiLCJvbnN1Y2Nlc3MiLCJvbmVycm9yIiwidGFyZ2V0IiwiZXJyb3JDb2RlIiwibW9kZWwiLCJzb2NrZXQiLCJxdWVyeSIsIk1vZGVsIiwiZmlsdGVycyIsImNyZWF0ZVN0b3JlIiwibW9kZWxOYW1lIiwibW9kZWxJZCIsInJlc3VsdCIsImNyZWF0ZU9iamVjdFN0b3JlIiwiY3JlYXRlSW5kZXgiLCJpbmRleE5hbWUiLCJmaWVsZE5hbWUiLCJvcHRzIiwic3RvcmUiLCJ0cmFuc2FjdGlvbiIsIm9iamVjdFN0b3JlIiwicGVybXMiLCJhY3Rpb24iLCJkZWZlcmVkIiwidHgiLCJvbmNvbXBsZXRlIiwib25hYm9ydCIsImNyZWF0ZSIsImluc3RhbmNlIiwicHV0IiwidmFsdWVzIiwiJHByb21pc2UiLCJnZXQiLCJrZXkiLCJkYXRhIiwic2VhcmNoRGVlcEZpZWxkIiwiZ2V0S2V5UGF0aCIsIm9iaiIsImxhc3RGaWVsZCIsImdldE1vZGVsTmFtZSIsImdldEluc3RhbmNlIiwic2V0QXR0cmlidXRlcyIsIiRpc05ldyIsImZpbmQiLCJvcGVuQ3Vyc29yIiwiY3Vyc29yIiwicmVjb3JkIiwiZ2V0SW5zdGFuY2VGcm9tT2JqZWN0IiwiY29udGludWUiLCJkZWZlcmVkcyIsIk9iamVjdCIsImtleXMiLCJvbk9wZW4iLCJvblVwZ3JhZGVOZWVkZWQiLCJvblNvY2tldENvbm5lY3RlZCIsIm1hcCIsInRleHQiLCJpZGJNb2RlbFNlcnZpY2UiLCJsYlJlc291cmNlIiwiJHRpbWVvdXQiLCIkZGIiLCIkbW9kZWxOYW1lIiwiJGlkIiwia2V5UGF0aCIsImF1dG9JbmNyZW1lbnQiLCIkZmllbGRzIiwiJGluc3RhbmNlcyIsIiRyZW1vdGUiLCJzdG9yZWQiLCIkcmVjb3JkIiwiJG9yaWdpbmFsVmFsdWVzIiwiJHN0b3JlZCIsImNvbnN0cnVjdG9yIiwibGlzdGVuIiwiaW5kZXgiLCJidWlsZCIsImJ1aWxkQ2FsbGJhY2siLCJmaWVsZHMiLCJmaWVsZCIsInJlbW90ZSIsInVybCIsImFjdGlvbnMiLCJhcnIiLCJpdGVyYXRpb24iLCJzcGxpdCIsInBvcCIsIl9zZXQiLCJnZXRLZXlGcm9tIiwib3JpZ2luYWwiLCJwcm9wZXJ0eSIsInNldCIsInN1YnNjcmliZSIsInJlc291cmNlIiwibGIiLCJnZXRIb3N0IiwibSIsIm1hdGNoIiwidXJsQmFzZUhvc3QiLCJsb2NhdGlvbiIsImhvc3QiLCJwcm9wcyIsInByb3BzUHJlZml4Iiwic2F2ZSIsInN0b3JhZ2UiLCJjb25zb2xlIiwibG9hZCIsImxvY2FsU3RvcmFnZSIsInNlc3Npb25TdG9yYWdlIiwiZm9yRWFjaCIsImN1cnJlbnRVc2VyRGF0YSIsInJlbWVtYmVyTWUiLCJzZXRVc2VyIiwiYWNjZXNzVG9rZW5JZCIsInVzZXJJZCIsInVzZXJEYXRhIiwiY3VycmVudFVzZXJJZCIsImNsZWFyVXNlciIsImNsZWFyU3RvcmFnZSIsImxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciIsInJlcXVlc3QiLCJjb25maWciLCJoZWFkZXJzIiwiYXV0aEhlYWRlciIsIl9faXNHZXRDdXJyZW50VXNlcl9fIiwicmVzIiwiYm9keSIsInN0YXR1cyIsIndoZW4iLCJvcHRpb25zIiwidXJsQmFzZSIsInNldEF1dGhIZWFkZXIiLCJoZWFkZXIiLCJnZXRBdXRoSGVhZGVyIiwic2V0VXJsQmFzZSIsImdldFVybEJhc2UiLCIkZ2V0IiwiJHJlc291cmNlIiwicGFyYW1zIiwib3JpZ2luYWxVcmwiLCIkc2F2ZSIsInN1Y2Nlc3MiLCJ1cHNlcnQiLCJmYWN0b3J5IiwicHJvdmlkZXIiLCIkaHR0cFByb3ZpZGVyIiwiaW50ZXJjZXB0b3JzIiwiJE1vZGVsIiwiJGZpbHRlcnMiLCIkcmVzdWx0IiwiJHJlbW90ZVJlc3VsdCIsImdldFJlc3VsdCIsImlkYlNvY2tldFNlcnZpY2UiLCIkZGVmVXJsU2VydmVyIiwiJHVybFNlcnZlciIsIiRhY2Nlc3NUb2tlbklkIiwiJGN1cnJlbnRVc2VySWQiLCIkbGlzdGVuZXJzIiwiY29ubmVjdCIsIm9uIiwiZW1pdCIsImlkIiwicHVzaExpc3RlbmVyIiwic3Vic2NyaXB0aW9uTmFtZSIsInVuc3Vic2NyaWJlIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwic2V0VXJsU2VydmVyIiwidXJsU2VydmVyIiwic2V0Q3JlZGVudGlhbHMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBOztBQ0VBLEtBQUksYUFBYSx1QkFBdUI7O0FERHhDOztBQ0tBLEtBQUksY0FBYyx1QkFBdUI7O0FESnpDOztBQ1FBLEtBQUksT0FBTyx1QkFBdUI7O0FETmxDOztBQ1VBLEtBQUksUUFBUSx1QkFBdUI7O0FEVG5DOztBQ2FBLEtBQUksYUFBYSx1QkFBdUI7O0FEWnhDOztBQ2dCQSxLQUFJLGFBQWEsdUJBQXVCOztBRGZ4Qzs7QUNtQkEsS0FBSSxjQUFjLHVCQUF1Qjs7QURqQnpDOztBQ3FCQSxLQUFJLE9BQU8sdUJBQXVCOztBQUVsQyxVQUFTLHVCQUF1QixLQUFLLEVBQUUsT0FBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsU0FBUzs7QURyQnZGLG1CQUFHQSxRQUFRQyxPQUFPLFVBQVUsS0FDekJDLFNBQVMsTUFBTUMsSUFFZkQsU0FBUyxjQUFjLFNBQ3ZCRSxRQUFRLGFBSlgscUJBS0dBLFFBQVEsWUFMWCxvQkFNR0EsUUFBUSxNQU5YOzs7RUFTR0EsUUFBUSxPQVRYLGVBVUdBLFFBQVEsWUFWWCxvQkFXR0EsUUFBUSxZQVhYLG9CQVlHQSxRQUFRLGFBWlgscUI7Ozs7OztBRWJBOzs7QUNFQSxRQUFPLGVBQWUsU0FBUyxjQUFjO0dBQzNDLE9BQU87OztBQUdULEtBQUksVUFBVSxPQUFPLFdBQVcsY0FBYyxPQUFPLE9BQU8sYUFBYSxXQUFXLFVBQVUsS0FBSyxFQUFFLE9BQU8sT0FBTyxTQUFTLFVBQVUsS0FBSyxFQUFFLE9BQU8sT0FBTyxP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VXZELGVBQWVHLGVBQWU7S0FDakVILGdCQUFnQjBDO0tBQ2hCdkMsZ0JBQWdCd0M7OztHQUdsQixPQUFPak0iLCJmaWxlIjoibmctaWRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5M2QxOTM2NThiYzgzZGFlNTc4MlxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBpZGJVdGlscyBmcm9tICcuL3V0aWxzL2lkYlV0aWxzJztcclxuaW1wb3J0IGlkYkV2ZW50cyBmcm9tICcuL3V0aWxzL2lkYkV2ZW50cyc7XHJcbmltcG9ydCBxcyBmcm9tICcuL3V0aWxzL3FzJztcclxuXHJcbmltcG9ydCBpZGIgZnJvbSAnLi9zZXJ2aWNlcy9pZGInO1xyXG5pbXBvcnQgaWRiTW9kZWwgZnJvbSAnLi9zZXJ2aWNlcy9pZGJNb2RlbCc7XHJcbmltcG9ydCBpZGJRdWVyeSBmcm9tICcuL3NlcnZpY2VzL2lkYlF1ZXJ5JztcclxuaW1wb3J0IGlkYlNvY2tldCBmcm9tICcuL3NlcnZpY2VzL2lkYlNvY2tldCc7XHJcblxyXG5pbXBvcnQgbGIgZnJvbSAnLi9zZXJ2aWNlcy9sYic7XHJcblxyXG5sYihhbmd1bGFyLm1vZHVsZSgnbmcuaWRiJywgW10pKVxyXG4gIC5jb25zdGFudCgnaW8nLCBpbylcclxuICBcclxuICAuY29uc3RhbnQoJ2lkYlZlcnNpb24nLCAnMC4wLjEnKVxyXG4gIC5zZXJ2aWNlKCdpZGJFdmVudHMnLCBpZGJFdmVudHMpXHJcbiAgLnNlcnZpY2UoJ2lkYlV0aWxzJywgaWRiVXRpbHMpXHJcbiAgLnNlcnZpY2UoJ3FzJywgcXMpXHJcblxyXG4gIC8vIFRha2Ugb2YgbGItc2VydmljZXMuanNcclxuICAuc2VydmljZSgnaWRiJywgaWRiKVxyXG4gIC5zZXJ2aWNlKCdpZGJNb2RlbCcsIGlkYk1vZGVsKVxyXG4gIC5zZXJ2aWNlKCdpZGJRdWVyeScsIGlkYlF1ZXJ5KVxyXG4gIC5zZXJ2aWNlKCdpZGJTb2NrZXQnLCBpZGJTb2NrZXQpXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2lkYlV0aWxzID0gcmVxdWlyZSgnLi91dGlscy9pZGJVdGlscycpO1xuXG52YXIgX2lkYlV0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlV0aWxzKTtcblxudmFyIF9pZGJFdmVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2lkYkV2ZW50cycpO1xuXG52YXIgX2lkYkV2ZW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJFdmVudHMpO1xuXG52YXIgX3FzID0gcmVxdWlyZSgnLi91dGlscy9xcycpO1xuXG52YXIgX3FzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3FzKTtcblxudmFyIF9pZGIgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYicpO1xuXG52YXIgX2lkYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGIpO1xuXG52YXIgX2lkYk1vZGVsID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJNb2RlbCcpO1xuXG52YXIgX2lkYk1vZGVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYk1vZGVsKTtcblxudmFyIF9pZGJRdWVyeSA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiUXVlcnknKTtcblxudmFyIF9pZGJRdWVyeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJRdWVyeSk7XG5cbnZhciBfaWRiU29ja2V0ID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJTb2NrZXQnKTtcblxudmFyIF9pZGJTb2NrZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiU29ja2V0KTtcblxudmFyIF9sYiA9IHJlcXVpcmUoJy4vc2VydmljZXMvbGInKTtcblxudmFyIF9sYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbigwLCBfbGIyLmRlZmF1bHQpKGFuZ3VsYXIubW9kdWxlKCduZy5pZGInLCBbXSkpLmNvbnN0YW50KCdpbycsIGlvKS5jb25zdGFudCgnaWRiVmVyc2lvbicsICcwLjAuMScpLnNlcnZpY2UoJ2lkYkV2ZW50cycsIF9pZGJFdmVudHMyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlV0aWxzJywgX2lkYlV0aWxzMi5kZWZhdWx0KS5zZXJ2aWNlKCdxcycsIF9xczIuZGVmYXVsdClcblxuLy8gVGFrZSBvZiBsYi1zZXJ2aWNlcy5qc1xuLnNlcnZpY2UoJ2lkYicsIF9pZGIyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYk1vZGVsJywgX2lkYk1vZGVsMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJRdWVyeScsIF9pZGJRdWVyeTIuZGVmYXVsdCkuc2VydmljZSgnaWRiU29ja2V0JywgX2lkYlNvY2tldDIuZGVmYXVsdCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJVdGlscyAoJHEpIHsgJ25nSW5qZWN0J1xyXG4gIFxyXG4gIC8vIEZ1bmNpb24gcGFyYSBkZXRlcm1pbmFyIHNpIGVzIHVuIGNhbGxiYWNrIHbDoWxpZG8gbyBub1xyXG4gIGZ1bmN0aW9uIGlzQ2FsbGJhY2sgKGNiKSB7XHJcblxyXG4gICAgcmV0dXJuIHR5cGVvZiBjYiA9PSAnZnVuY3Rpb24nIHx8IGNiID09IG51bGwgfHwgY2IgPT0gdW5kZWZpbmVkO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIFNpIGVsIGNhbGxiYWNrIG5vIGVzIHbDoWxpZG8gbGFuemEgdW4gZXJycG9yXHJcbiAgZnVuY3Rpb24gbXVzdEJlQ2FsbGJhY2sgKGNiKSB7XHJcbiAgICBpZiAoaXNDYWxsYmFjayhjYikpIHJldHVybjtcclxuXHJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIGNhbGxiYWNrJyk7XHJcbiAgICBlcnIubmFtZSA9ICdJbnZhbGlkQ2FsbGJhY2snXHJcblxyXG4gICAgdGhyb3cgZXJyO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIEdlbmVyYSB1biBlcnJvciBzaSBlbCB2YWxvciBubyBlcyBkZWwgdGlwbyBpbmRpY2FkbyBwb3IgcGFyYW1ldHJvXHJcbiAgZnVuY3Rpb24gbXVzdEJlICh2YWx1ZSwgdHlwZXMpIHtcclxuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcclxuICAgIGZvcih2YXIgaSBpbiB0eXBlcyl7XHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gdHlwZXNbaV0pIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWU6ICcrdmFsdWUrJyBtdXN0IGJlICcrdHlwZXMuam9pbignIG9yICcpKTtcclxuICAgIGVyci5uYW1lID0gJ0ludmFsaWRWYWx1ZSdcclxuICAgIHRocm93IGVycjtcclxuXHJcbiAgfVxyXG5cclxuICAvLyBWYWxpZGEgdW4gYXJyYXkgZGUgYXJndW1lbnRvcyBjb24gdW4gYXJyYSBkZSB0aXBvc1xyXG4gIGZ1bmN0aW9uIHZhbGlkYXRlIChhcmdzLCB0eXBlcykge1xyXG5cclxuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcclxuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcclxuICAgIGZvciAodmFyIGkgaW4gYXJncyl7XHJcbiAgICAgIGlmICh0eXBlc1tpXSl7XHJcbiAgICAgICAgaWYgKHR5cGVzW2ldID09IG51bGwpe1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdHlwZXNbaV0gPT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGVzW2ldID09ICdvYmplY3QnKXtcclxuICAgICAgICAgIG11c3RCZShhcmdzW2ldLCB0eXBlc1tpXSk7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0eXBlc1tpXSA9PSAnZnVuY3Rpb24nKXtcclxuICAgICAgICAgIGlmKHR5cGVzW2ldKGFyZ3NbaV0pKVxyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsaWRhdG9yIHRvOiAnK2FyZ3NbaV0rJyBtdXN0IGJlICcrdHlwZXNbaV0pO1xyXG4gICAgICAgIGVyci5uYW1lID0gJ0ludmFsaWRWYWxpZGF0b3InXHJcbiAgICAgICAgdGhyb3cgZXJyO1xyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpc0NhbGxiYWNrOiBpc0NhbGxiYWNrLFxyXG4gICAgbXVzdEJlQ2FsbGJhY2s6IG11c3RCZUNhbGxiYWNrLFxyXG4gICAgbXVzdEJlOiBtdXN0QmUsXHJcbiAgICB2YWxpZGF0ZTogdmFsaWRhdGUsXHJcbiAgfTtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9pZGJVdGlscy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBpZGJVdGlscztcbmZ1bmN0aW9uIGlkYlV0aWxzKCRxKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gRnVuY2lvbiBwYXJhIGRldGVybWluYXIgc2kgZXMgdW4gY2FsbGJhY2sgdsOhbGlkbyBvIG5vXG5cbiAgZnVuY3Rpb24gaXNDYWxsYmFjayhjYikge1xuXG4gICAgcmV0dXJuIHR5cGVvZiBjYiA9PSAnZnVuY3Rpb24nIHx8IGNiID09IG51bGwgfHwgY2IgPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLy8gU2kgZWwgY2FsbGJhY2sgbm8gZXMgdsOhbGlkbyBsYW56YSB1biBlcnJwb3JcbiAgZnVuY3Rpb24gbXVzdEJlQ2FsbGJhY2soY2IpIHtcbiAgICBpZiAoaXNDYWxsYmFjayhjYikpIHJldHVybjtcblxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgY2FsbGJhY2snKTtcbiAgICBlcnIubmFtZSA9ICdJbnZhbGlkQ2FsbGJhY2snO1xuXG4gICAgdGhyb3cgZXJyO1xuICB9XG5cbiAgLy8gR2VuZXJhIHVuIGVycm9yIHNpIGVsIHZhbG9yIG5vIGVzIGRlbCB0aXBvIGluZGljYWRvIHBvciBwYXJhbWV0cm9cbiAgZnVuY3Rpb24gbXVzdEJlKHZhbHVlLCB0eXBlcykge1xuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcbiAgICBmb3IgKHZhciBpIGluIHR5cGVzKSB7XG4gICAgICBpZiAoKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PSB0eXBlc1tpXSkgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlOiAnICsgdmFsdWUgKyAnIG11c3QgYmUgJyArIHR5cGVzLmpvaW4oJyBvciAnKSk7XG4gICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbHVlJztcbiAgICB0aHJvdyBlcnI7XG4gIH1cblxuICAvLyBWYWxpZGEgdW4gYXJyYXkgZGUgYXJndW1lbnRvcyBjb24gdW4gYXJyYSBkZSB0aXBvc1xuICBmdW5jdGlvbiB2YWxpZGF0ZShhcmdzLCB0eXBlcykge1xuXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcbiAgICBmb3IgKHZhciBpIGluIGFyZ3MpIHtcbiAgICAgIGlmICh0eXBlc1tpXSkge1xuICAgICAgICBpZiAodHlwZXNbaV0gPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZXNbaV0gPT0gJ3N0cmluZycgfHwgX3R5cGVvZih0eXBlc1tpXSkgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBtdXN0QmUoYXJnc1tpXSwgdHlwZXNbaV0pO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZXNbaV0gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGlmICh0eXBlc1tpXShhcmdzW2ldKSkgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbGlkYXRvciB0bzogJyArIGFyZ3NbaV0gKyAnIG11c3QgYmUgJyArIHR5cGVzW2ldKTtcbiAgICAgICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbGlkYXRvcic7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGlzQ2FsbGJhY2s6IGlzQ2FsbGJhY2ssXG4gICAgbXVzdEJlQ2FsbGJhY2s6IG11c3RCZUNhbGxiYWNrLFxuICAgIG11c3RCZTogbXVzdEJlLFxuICAgIHZhbGlkYXRlOiB2YWxpZGF0ZVxuICB9O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL2lkYlV0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gTm9tYnJlIGRlIGxvcyBldmVudG9zXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYkV2ZW50cygpIHtcclxuICByZXR1cm4ge1xyXG4gICAgREJfRVJST1I6ICdjYi5lcnJvcidcclxuICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBOb21icmUgZGUgbG9zIGV2ZW50b3NcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYkV2ZW50cztcbmZ1bmN0aW9uIGlkYkV2ZW50cygpIHtcbiAgcmV0dXJuIHtcbiAgICBEQl9FUlJPUjogJ2NiLmVycm9yJ1xuICB9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9pZGJFdmVudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBxcyAoKSB7ICduZ0luamVjdCdcclxuICBcclxuICBmdW5jdGlvbiBxc0NsYXNzIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIFxyXG4gICAgbGV0IHRoZW5zID0gW107XHJcbiAgICBsZXQgdGhlbnNSZWFkeSA9IFtdO1xyXG4gICAgbGV0IGNhdGNocyA9IFtdO1xyXG4gICAgbGV0IGNhdGNoc1JlYWR5ID0gW107XHJcbiAgICBsZXQgcmVzdWx0QXJncyA9IG51bGw7XHJcbiAgICBsZXQgZXJyb3IgPSBudWxsO1xyXG5cclxuICAgIHRoaXoucHJvbWlzZSA9IHt9O1xyXG4gICAgdGhpei4kcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiB0aGVuc1Jlc29sdmVkICgpIHtcclxuICAgICAgaWYgKCF0aGVucy5sZW5ndGgpIHJldHVybjtcclxuICAgICAgbGV0IGNiID0gdGhlbnMuc2hpZnQoKTtcclxuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5yZXN1bHRBcmdzKTtcclxuICAgICAgdGhlbnNSZWFkeS5wdXNoKGNiKTtcclxuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNhdGNoc1Jlc29sdmVkICgpIHtcclxuICAgICAgaWYgKCFjYXRjaHMubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgIGxldCBjYiA9IGNhdGNocy5zaGlmdCgpO1xyXG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcclxuICAgICAgY2F0Y2hzUmVhZHkucHVzaChjYik7XHJcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpei5yZXNvbHZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcclxuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICB0aGl6LnJlc3VsdEFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucmVqZWN0ID0gZnVuY3Rpb24gKGVycikge1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcclxuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICB0aGl6LmVycm9yID0gZXJyIHx8IHt9O1xyXG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnByb21pc2UudGhlbiA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICB0aGVucy5wdXNoKGNiKTtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmICF0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnByb21pc2UuY2F0Y2ggPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgY2F0Y2hzLnB1c2goY2IpO1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQgJiYgdGhpei5lcnJvcikge1xyXG4gICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucHJvbWlzZS5kb25lID0gZnVuY3Rpb24gKGNiKSB7XHJcblxyXG4gICAgICB0aGVucy5wdXNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYi5hcHBseShudWxsLCBbbnVsbF0uY29uY2F0KHRoaXoucmVzdWx0QXJncykpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNhdGNocy5wdXNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHtcclxuICAgICAgICBpZiAoIXRoaXouZXJyb3IpIHtcclxuICAgICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBpZihjYikgdGhpei5wcm9taXNlLmRvbmUoY2IpO1xyXG5cclxuICB9O1xyXG5cclxuICAvLyBDcmVhIHVuYSBpbnN0YW5jaWEgZGVsIGRlZmVyZWRcclxuICBxc0NsYXNzLmRlZmVyID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICByZXR1cm4gbmV3IHFzQ2xhc3MoY2IpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiBxc0NsYXNzO1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL3FzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gcXM7XG5mdW5jdGlvbiBxcygpIHtcbiAgJ25nSW5qZWN0JztcblxuICBmdW5jdGlvbiBxc0NsYXNzKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIHRoZW5zID0gW107XG4gICAgdmFyIHRoZW5zUmVhZHkgPSBbXTtcbiAgICB2YXIgY2F0Y2hzID0gW107XG4gICAgdmFyIGNhdGNoc1JlYWR5ID0gW107XG4gICAgdmFyIHJlc3VsdEFyZ3MgPSBudWxsO1xuICAgIHZhciBlcnJvciA9IG51bGw7XG5cbiAgICB0aGl6LnByb21pc2UgPSB7fTtcbiAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gdGhlbnNSZXNvbHZlZCgpIHtcbiAgICAgIGlmICghdGhlbnMubGVuZ3RoKSByZXR1cm47XG4gICAgICB2YXIgY2IgPSB0aGVucy5zaGlmdCgpO1xuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5yZXN1bHRBcmdzKTtcbiAgICAgIHRoZW5zUmVhZHkucHVzaChjYik7XG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2F0Y2hzUmVzb2x2ZWQoKSB7XG4gICAgICBpZiAoIWNhdGNocy5sZW5ndGgpIHJldHVybjtcbiAgICAgIHZhciBjYiA9IGNhdGNocy5zaGlmdCgpO1xuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XG4gICAgICBjYXRjaHNSZWFkeS5wdXNoKGNiKTtcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgfVxuXG4gICAgdGhpei5yZXNvbHZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICB0aGl6LnJlc3VsdEFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgIH07XG5cbiAgICB0aGl6LnJlamVjdCA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgdGhpei5lcnJvciA9IGVyciB8fCB7fTtcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgfTtcblxuICAgIHRoaXoucHJvbWlzZS50aGVuID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB0aGVucy5wdXNoKGNiKTtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiAhdGhpei5lcnJvcikge1xuICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgdGhpei5wcm9taXNlLmNhdGNoID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICBjYXRjaHMucHVzaChjYik7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQgJiYgdGhpei5lcnJvcikge1xuICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIHRoaXoucHJvbWlzZS5kb25lID0gZnVuY3Rpb24gKGNiKSB7XG5cbiAgICAgIHRoZW5zLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjYi5hcHBseShudWxsLCBbbnVsbF0uY29uY2F0KHRoaXoucmVzdWx0QXJncykpO1xuICAgICAgfSk7XG5cbiAgICAgIGNhdGNocy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSB7XG4gICAgICAgIGlmICghdGhpei5lcnJvcikge1xuICAgICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH07XG5cbiAgICBpZiAoY2IpIHRoaXoucHJvbWlzZS5kb25lKGNiKTtcbiAgfTtcblxuICAvLyBDcmVhIHVuYSBpbnN0YW5jaWEgZGVsIGRlZmVyZWRcbiAgcXNDbGFzcy5kZWZlciA9IGZ1bmN0aW9uIChjYikge1xuICAgIHJldHVybiBuZXcgcXNDbGFzcyhjYik7XG4gIH07XG5cbiAgcmV0dXJuIHFzQ2xhc3M7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvcXMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiU2VydmljZSAoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJFdmVudHMsIGlkYk1vZGVsLCBpZGJRdWVyeSwgaWRiU29ja2V0LCBsYkF1dGgpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxyXG4gIGNvbnN0IGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQjtcclxuICAvLyBObyB1c2UgXCJjb25zdCBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXHJcbiAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XHJcbiAgY29uc3QgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xyXG4gIGNvbnN0IElEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcclxuICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxyXG4gIFxyXG4gIGlmICghaW5kZXhlZERCKSB7XHJcbiAgICBhbGVydChcIlN1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhc1wiKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8vIENsYXNlIHBhcmEgbGEgY3JlYWNpw7NuIGRlIGluc3RhbmNpYXMgZGUgbGEgQkRcclxuICBmdW5jdGlvbiBpZGIoJGRiTmFtZSwgJGRiVmVyc2lvbiwgJHNvY2tldCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnbnVtYmVyJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgLy8gTWFuZWphZG9yZXMgZGUgZXZlbnRvcy5cclxuICAgIGxldCAkZXZlbnRzQ2FsbGJhY2tzID0ge307XHJcbiAgICBsZXQgJHVwZ3JhZGVOZWVkZWREZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgIGxldCAkb3BlbkRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG4gICAgbGV0ICRzb2NrZXRDb25uZWN0ZWREZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgIGxldCAkb3BlbmVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gSW5zdGFuY2lhIGRlIGxhIGJhc2UgZGUgZGF0b3M7XHJcbiAgICBsZXQgJHJlcXVlc3QgPSBudWxsO1xyXG4gICAgdGhpei5tb2RlbHMgPSB7fTtcclxuXHJcbiAgICAvLyBBZ3JlZ2FyIHVuIG1hbmVqYWRvciBkZSBldmVudG9cclxuICAgIHRoaXouYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSl7XHJcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdID0gW107XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5wdXNoKGNiKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vUmVtdWV2ZSB1biBtYW5lamFkb3IgZGUgZXZlbnRvXHJcbiAgICB0aGl6LnVuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkgcmV0dXJuO1xyXG5cclxuICAgICAgLy8gQnVzY2FyIGVsIGNiXHJcbiAgICAgIGNvbnN0IGlkeCA9ICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5pbmRleE9mKGNiKTtcclxuXHJcbiAgICAgIC8vIFNpIHNlIGVuY29udHJvIGVsIGNiIHJlbW92ZXJsb1xyXG4gICAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXHJcbiAgICB0aGl6LnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0J10pO1xyXG5cclxuICAgICAgJGxvZy5sb2coJGRiTmFtZSsnLnYnKygkZGJWZXJzaW9ufHwxKSsnOiAnK2V2ZW50TmFtZSk7XHJcblxyXG4gICAgICBmb3IobGV0IGkgaW4gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKXtcclxuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpeiwgYXJncyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENhbGxiYWNrcyBwYXJhIGxvcyBlcnJvcmVzXHJcbiAgICB0aGl6LmVycm9yID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIHRoaXouYmluZChpZGJFdmVudHMuREJfRVJST1IsIGNiKTtcclxuICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFicmlyIHVuYSBCYXNlIGRlIGRhdG9zLlxyXG4gICAgdGhpei5vcGVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAoJG9wZW5lZCkgcmV0dXJuICRvcGVuRGVmZXJlZDtcclxuXHJcbiAgICAgIC8vIENyZWFyIHVuIG51ZXZvIGRlZmVyXHJcbiAgICAgICRvcGVuZWQgPSB0cnVlO1xyXG5cclxuICAgICAgLy8gZGVqYW1vcyBhYmllcnRhIG51ZXN0cmEgYmFzZSBkZSBkYXRvc1xyXG4gICAgICAvLyBpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UoJGRiTmFtZSkub25zdWNjZXNzID1cclxuICAgICAgZnVuY3Rpb24gcmVhZHkoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHJxID0gaW5kZXhlZERCLm9wZW4oJGRiTmFtZSwgJGRiVmVyc2lvbik7XHJcblxyXG4gICAgICAgIHJxLm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxyXG4gICAgICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGVsIHJlc3VsdGFkb1xyXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxyXG4gICAgICAgICAgJHJlcXVlc3QgPSBycTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gQXNpbmdhciBlbCBtYW5lamFkb3IgZGUgZXJyb3JlcyBhIGxhIEJEXHJcbiAgICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICRsb2cuZXJyb3IoJ0RhdGFiYXNlIGVycm9yOiAnKyBldmVudC50YXJnZXQuZXJyb3JDb2RlKTtcclxuICAgICAgICAgICAgdGhpei50cmlnZ2VyKGlkYkV2ZW50cy5EQl9FUlJPUiwgW2V2ZW50XSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgJG9wZW5EZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGUgZXJyb3Jlc1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEuZXJyb3JDb2RlIVxyXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZWplY3QocnEuZXJyb3JDb2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmVhZHkoKTtcclxuXHJcbiAgICAgIHJldHVybiAkb3BlbkRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZ3JlZ2EgdW4gbnVldm8gbW9kZWxvXHJcbiAgICB0aGl6Lm1vZGVsID0gZnVuY3Rpb24gKG5hbWUsIHNvY2tldCkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJ10pO1xyXG5cclxuICAgICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG9cclxuICAgICAgbGV0IG1vZGVsID0gdGhpei5tb2RlbHNbbmFtZV07XHJcblxyXG4gICAgICAvLyBTaSBubyBleGlzdGUgZWwgbW9kZWxvIGNyZWFyXHJcbiAgICAgIGlmKCFtb2RlbCl7XHJcbiAgICAgICAgbW9kZWwgPSBpZGJNb2RlbCh0aGl6LCBuYW1lLCBzb2NrZXQgfHwgJHNvY2tldCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEd1YXJkYXIgZWwgbW9kZWxvIGVuIGxvcyBtb2RlbG9zXHJcbiAgICAgIHRoaXoubW9kZWxzW25hbWVdID0gbW9kZWw7XHJcblxyXG4gICAgICAvLyBSZXRvcm5hciBlbCBtb2RlbG9cclxuICAgICAgcmV0dXJuIG1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JhIHVuYSBpbnN0YW5jaWEgZGUgdW4gcXVlcnlcclxuICAgIHRoaXoucXVlcnkgPSBmdW5jdGlvbiAoTW9kZWwsIGZpbHRlcnMpIHtcclxuXHJcbiAgICAgIHJldHVybiBuZXcgaWRiUXVlcnkodGhpeiwgTW9kZWwsIGZpbHRlcnMpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXHJcbiAgICB0aGl6LmNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgbW9kZWxJZCkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xyXG4gICAgICAgIHJxLnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShtb2RlbE5hbWUsIG1vZGVsSWQpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxyXG4gICAgdGhpei5jcmVhdGVJbmRleCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcclxuICAgICAgICBsZXQgc3RvcmUgPSBycS50cmFuc2FjdGlvbi5vYmplY3RTdG9yZShtb2RlbE5hbWUpO1xyXG4gICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIHVuYSB0cmFuc2FjY2nDs25cclxuICAgIHRoaXoudHJhbnNhY3Rpb24gPSBmdW5jdGlvbihtb2RlbE5hbWUsIHBlcm1zLCBhY3Rpb24sIGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgbGV0IGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XHJcblxyXG4gICAgICAvLyBDdWFuZG8gc2UgYWJyYSBsYSBCRFxyXG4gICAgICAkb3BlbkRlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcclxuICAgICAgICBsZXQgdHggPSBycS5yZXN1bHQudHJhbnNhY3Rpb24obW9kZWxOYW1lLCBwZXJtcyk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGFjdGlvbih0eCk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICB0eC5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJlc3VsdCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICB0eC5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QodHguZXJyb3IpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gSW5zZXJ0YSB1biByZWdpc3RybyBlbiBlbCBtb2RlbG9cclxuICAgIHRoaXouY3JlYXRlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgaW5zdGFuY2UsIGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICdmdW5jdGlvbiddLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICBsZXQgZGVmZXJlZCA9IHFzLmRlZmVyKGNiKTtcclxuXHJcbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXHJcbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZHdyaXRlJywgZnVuY3Rpb24gKHR4KSB7XHJcbiAgICAgICAgbGV0IHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5wdXQoaW5zdGFuY2UudmFsdWVzKCkpO1xyXG5cclxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXHJcbiAgICAgICAgcnEub25zdWNjZXNzICA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBpbnN0YW5jZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICBycS5vbmVycm9yICA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIC8vIENvdWxkIGNhbGwgcnEucHJldmVudERlZmF1bHQoKSB0byBwcmV2ZW50IHRoZSB0cmFuc2FjdGlvbiBmcm9tIGFib3J0aW5nLlxyXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QocnEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBkZWZlcmVkLiRwcm9taXNlO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gT2J0aWVuZSB1biBlbGVtZW50byBwb3Igc2kga2V5XHJcbiAgICB0aGl6LmdldCA9IGZ1bmN0aW9uIChNb2RlbCwga2V5LCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nLCAnc3RyaW5nJywgbnVsbCwgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG4gICAgICBcclxuICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgTW9kZWwuc2VhcmNoRGVlcEZpZWxkKHt9LCBNb2RlbC5nZXRLZXlQYXRoKCksIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgICAgIG9ialtsYXN0RmllbGRdID0ga2V5O1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IG1vZGVsTmFtZSA9IE1vZGVsLmdldE1vZGVsTmFtZSgpO1xyXG4gICAgICBsZXQgZGVmZXJlZCA9IHFzLmRlZmVyKGNiKTtcclxuICAgICAgbGV0IGluc3RhbmNlID0gTW9kZWwuZ2V0SW5zdGFuY2Uoa2V5LCBkYXRhKTtcclxuXHJcbiAgICAgIGluc3RhbmNlLiRwcm9taXNlID0gZGVmZXJlZC5wcm9taXNlO1xyXG4gICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBsZXQgc3RvcmUgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpO1xyXG4gICAgICAgIGxldCBycSA9IHN0b3JlLmdldChrZXkpO1xyXG5cclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmIChycS5yZXN1bHQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaW5zdGFuY2Uuc2V0QXR0cmlidXRlcyhycS5yZXN1bHQsIHRydWUpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS4kaXNOZXcgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoaW5zdGFuY2UpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChpbnN0YW5jZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xyXG4gICAgdGhpei5maW5kID0gZnVuY3Rpb24gKE1vZGVsLCBmaWx0ZXJzLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG4gICAgICBjb25zdCBtb2RlbE5hbWUgPSBNb2RlbC5nZXRNb2RlbE5hbWUoKTtcclxuICAgICAgbGV0IGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XHJcbiAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuXHJcbiAgICAgIHJlc3VsdC4kcHJvbWlzZSA9IGRlZmVyZWQucHJvbWlzZTtcclxuICAgICAgcmVzdWx0LiRyZXNvbHZlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cclxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xyXG4gICAgICAgIGxldCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XHJcbiAgICAgICAgbGV0IHJxID0gc3RvcmUub3BlbkN1cnNvcigpO1xyXG5cclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGxldCBjdXJzb3IgPSBycS5yZXN1bHQ7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIE5vIG1vcmUgbWF0Y2hpbmcgcmVjb3Jkcy5cclxuICAgICAgICAgIGlmICghY3Vyc29yKXtcclxuICAgICAgICAgICAgcmVzdWx0LiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcmVkLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gT2J0ZW5lciBsYSBpbnN0YW5jaWFcclxuICAgICAgICAgIGxldCByZWNvcmQgPSBNb2RlbC5nZXRJbnN0YW5jZUZyb21PYmplY3QoY3Vyc29yLnZhbHVlKTtcclxuICAgICAgICAgIHJlY29yZC4kaXNOZXcgPSBmYWxzZTsgLy8gSW5pY2FyIHF1ZSBubyBlcyB1biByZWdpc3RybyBudWV2b1xyXG5cclxuICAgICAgICAgIC8vIEFncmVnYXIgYWwgcmVzdWx0YWRvXHJcbiAgICAgICAgICByZXN1bHQucHVzaChyZWNvcmQpO1xyXG5cclxuICAgICAgICAgIC8vIEJ1c2NhciBzaWd1aWVudGVcclxuICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYXIgYWxpYXMgcGFyYSBsb3MgZXZlbnRvcyBlbmxhemFyIGNhbGxiYWNrcyBhIGxvcyBldmVudG9zXHJcbiAgICBsZXQgZGVmZXJlZHM7XHJcbiAgICBPYmplY3Qua2V5cyhkZWZlcmVkcyA9IHtcclxuICAgICAgb25PcGVuOiAkb3BlbkRlZmVyZWQsXHJcbiAgICAgIG9uVXBncmFkZU5lZWRlZDogJHVwZ3JhZGVOZWVkZWREZWZlcmVkLFxyXG4gICAgICBvblNvY2tldENvbm5lY3RlZDogJHNvY2tldENvbm5lY3RlZERlZmVyZWRcclxuICAgIH0pLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICBsZXQgdGV4dCA9ICRkYk5hbWUrJy52JysoJGRiVmVyc2lvbnx8MSkrJzogJytrZXk7XHJcbiAgICAgICAgaWYgKGVycil7XHJcbiAgICAgICAgICAkbG9nLmVycm9yKHRleHQsIGVycik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICRsb2cubG9nKHRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXpba2V5XSA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcclxuICAgICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShjYik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGlkYjtcclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYlNlcnZpY2U7XG5mdW5jdGlvbiBpZGJTZXJ2aWNlKCRsb2csIHFzLCBpZGJVdGlscywgaWRiRXZlbnRzLCBpZGJNb2RlbCwgaWRiUXVlcnksIGlkYlNvY2tldCwgbGJBdXRoKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxuXG4gIHZhciBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XG4gIC8vIE5vIHVzZSBcImNvbnN0IGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cbiAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XG4gIHZhciBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XG4gIHZhciBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XG4gIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXG5cbiAgaWYgKCFpbmRleGVkREIpIHtcbiAgICBhbGVydChcIlN1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhc1wiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBDbGFzZSBwYXJhIGxhIGNyZWFjacOzbiBkZSBpbnN0YW5jaWFzIGRlIGxhIEJEXG4gIGZ1bmN0aW9uIGlkYigkZGJOYW1lLCAkZGJWZXJzaW9uLCAkc29ja2V0KSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnbnVtYmVyJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAvLyBNYW5lamFkb3JlcyBkZSBldmVudG9zLlxuICAgIHZhciAkZXZlbnRzQ2FsbGJhY2tzID0ge307XG4gICAgdmFyICR1cGdyYWRlTmVlZGVkRGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgdmFyICRvcGVuRGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgdmFyICRzb2NrZXRDb25uZWN0ZWREZWZlcmVkID0gcXMuZGVmZXIoKTtcbiAgICB2YXIgJG9wZW5lZCA9IGZhbHNlO1xuXG4gICAgLy8gSW5zdGFuY2lhIGRlIGxhIGJhc2UgZGUgZGF0b3M7XG4gICAgdmFyICRyZXF1ZXN0ID0gbnVsbDtcbiAgICB0aGl6Lm1vZGVscyA9IHt9O1xuXG4gICAgLy8gQWdyZWdhciB1biBtYW5lamFkb3IgZGUgZXZlbnRvXG4gICAgdGhpei5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSB7XG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0ucHVzaChjYik7XG4gICAgfTtcblxuICAgIC8vUmVtdWV2ZSB1biBtYW5lamFkb3IgZGUgZXZlbnRvXG4gICAgdGhpei51bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHJldHVybjtcblxuICAgICAgLy8gQnVzY2FyIGVsIGNiXG4gICAgICB2YXIgaWR4ID0gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLmluZGV4T2YoY2IpO1xuXG4gICAgICAvLyBTaSBzZSBlbmNvbnRybyBlbCBjYiByZW1vdmVybG9cbiAgICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnNwbGljZShpZHgsIDEpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBEaXNwYXJhIHVuIGV2ZW50b1xuICAgIHRoaXoudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0J10pO1xuXG4gICAgICAkbG9nLmxvZygkZGJOYW1lICsgJy52JyArICgkZGJWZXJzaW9uIHx8IDEpICsgJzogJyArIGV2ZW50TmFtZSk7XG5cbiAgICAgIGZvciAodmFyIGkgaW4gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSB7XG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXVtpXS5hcHBseSh0aGl6LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gQ2FsbGJhY2tzIHBhcmEgbG9zIGVycm9yZXNcbiAgICB0aGl6LmVycm9yID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB0aGl6LmJpbmQoaWRiRXZlbnRzLkRCX0VSUk9SLCBjYik7XG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgLy8gQWJyaXIgdW5hIEJhc2UgZGUgZGF0b3MuXG4gICAgdGhpei5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCRvcGVuZWQpIHJldHVybiAkb3BlbkRlZmVyZWQ7XG5cbiAgICAgIC8vIENyZWFyIHVuIG51ZXZvIGRlZmVyXG4gICAgICAkb3BlbmVkID0gdHJ1ZTtcblxuICAgICAgLy8gZGVqYW1vcyBhYmllcnRhIG51ZXN0cmEgYmFzZSBkZSBkYXRvc1xuICAgICAgLy8gaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKCRkYk5hbWUpLm9uc3VjY2VzcyA9XG4gICAgICBmdW5jdGlvbiByZWFkeSgpIHtcblxuICAgICAgICB2YXIgcnEgPSBpbmRleGVkREIub3BlbigkZGJOYW1lLCAkZGJWZXJzaW9uKTtcblxuICAgICAgICBycS5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5yZXN1bHQhXG4gICAgICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZWwgcmVzdWx0YWRvXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLnJlc3VsdCFcbiAgICAgICAgICAkcmVxdWVzdCA9IHJxO1xuXG4gICAgICAgICAgLy8gQXNpbmdhciBlbCBtYW5lamFkb3IgZGUgZXJyb3JlcyBhIGxhIEJEXG4gICAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgJGxvZy5lcnJvcignRGF0YWJhc2UgZXJyb3I6ICcgKyBldmVudC50YXJnZXQuZXJyb3JDb2RlKTtcbiAgICAgICAgICAgIHRoaXoudHJpZ2dlcihpZGJFdmVudHMuREJfRVJST1IsIFtldmVudF0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAkb3BlbkRlZmVyZWQucmVzb2x2ZShldmVudCwgcnEpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlIGVycm9yZXNcbiAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEuZXJyb3JDb2RlIVxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgJG9wZW5EZWZlcmVkLnJlamVjdChycS5lcnJvckNvZGUpO1xuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgcmVhZHkoKTtcblxuICAgICAgcmV0dXJuICRvcGVuRGVmZXJlZDtcbiAgICB9O1xuXG4gICAgLy8gQWdyZWdhIHVuIG51ZXZvIG1vZGVsb1xuICAgIHRoaXoubW9kZWwgPSBmdW5jdGlvbiAobmFtZSwgc29ja2V0KSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJ10pO1xuXG4gICAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsb1xuICAgICAgdmFyIG1vZGVsID0gdGhpei5tb2RlbHNbbmFtZV07XG5cbiAgICAgIC8vIFNpIG5vIGV4aXN0ZSBlbCBtb2RlbG8gY3JlYXJcbiAgICAgIGlmICghbW9kZWwpIHtcbiAgICAgICAgbW9kZWwgPSBpZGJNb2RlbCh0aGl6LCBuYW1lLCBzb2NrZXQgfHwgJHNvY2tldCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEd1YXJkYXIgZWwgbW9kZWxvIGVuIGxvcyBtb2RlbG9zXG4gICAgICB0aGl6Lm1vZGVsc1tuYW1lXSA9IG1vZGVsO1xuXG4gICAgICAvLyBSZXRvcm5hciBlbCBtb2RlbG9cbiAgICAgIHJldHVybiBtb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQ3JhIHVuYSBpbnN0YW5jaWEgZGUgdW4gcXVlcnlcbiAgICB0aGl6LnF1ZXJ5ID0gZnVuY3Rpb24gKE1vZGVsLCBmaWx0ZXJzKSB7XG5cbiAgICAgIHJldHVybiBuZXcgaWRiUXVlcnkodGhpeiwgTW9kZWwsIGZpbHRlcnMpO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcbiAgICB0aGl6LmNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgbW9kZWxJZCkge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xuICAgICAgICBycS5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUobW9kZWxOYW1lLCBtb2RlbElkKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcbiAgICB0aGl6LmNyZWF0ZUluZGV4ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xuICAgICAgICB2YXIgc3RvcmUgPSBycS50cmFuc2FjdGlvbi5vYmplY3RTdG9yZShtb2RlbE5hbWUpO1xuICAgICAgICBzdG9yZS5jcmVhdGVJbmRleChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSB1bmEgdHJhbnNhY2Npw7NuXG4gICAgdGhpei50cmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIHBlcm1zLCBhY3Rpb24sIGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdmdW5jdGlvbicsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XG5cbiAgICAgIC8vIEN1YW5kbyBzZSBhYnJhIGxhIEJEXG4gICAgICAkb3BlbkRlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcbiAgICAgICAgdmFyIHR4ID0gcnEucmVzdWx0LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgcGVybXMpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gYWN0aW9uKHR4KTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHR4Lm9uY29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJlc3VsdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgdHgub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdCh0eC5lcnJvcik7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIEluc2VydGEgdW4gcmVnaXN0cm8gZW4gZWwgbW9kZWxvXG4gICAgdGhpei5jcmVhdGUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbnN0YW5jZSwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICdmdW5jdGlvbiddLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoY2IpO1xuXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHgpIHtcbiAgICAgICAgdmFyIHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5wdXQoaW5zdGFuY2UudmFsdWVzKCkpO1xuXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBpbnN0YW5jZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBDb3VsZCBjYWxsIHJxLnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChycSk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVyZWQuJHByb21pc2U7XG4gICAgfTtcblxuICAgIC8vIE9idGllbmUgdW4gZWxlbWVudG8gcG9yIHNpIGtleVxuICAgIHRoaXouZ2V0ID0gZnVuY3Rpb24gKE1vZGVsLCBrZXksIGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nLCAnc3RyaW5nJywgbnVsbCwgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgTW9kZWwuc2VhcmNoRGVlcEZpZWxkKHt9LCBNb2RlbC5nZXRLZXlQYXRoKCksIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IGtleTtcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgbW9kZWxOYW1lID0gTW9kZWwuZ2V0TW9kZWxOYW1lKCk7XG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKGNiKTtcbiAgICAgIHZhciBpbnN0YW5jZSA9IE1vZGVsLmdldEluc3RhbmNlKGtleSwgZGF0YSk7XG5cbiAgICAgIGluc3RhbmNlLiRwcm9taXNlID0gZGVmZXJlZC5wcm9taXNlO1xuICAgICAgaW5zdGFuY2UuJHJlc29sdmVkID0gZmFsc2U7XG5cbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcbiAgICAgICAgdmFyIHN0b3JlID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKTtcbiAgICAgICAgdmFyIHJxID0gc3RvcmUuZ2V0KGtleSk7XG5cbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChycS5yZXN1bHQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5zZXRBdHRyaWJ1dGVzKHJxLnJlc3VsdCwgdHJ1ZSk7XG4gICAgICAgICAgICBpbnN0YW5jZS4kaXNOZXcgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaW5zdGFuY2UuJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoaW5zdGFuY2UpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoaW5zdGFuY2UpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9O1xuXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xuICAgIHRoaXouZmluZCA9IGZ1bmN0aW9uIChNb2RlbCwgZmlsdGVycywgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG4gICAgICB2YXIgbW9kZWxOYW1lID0gTW9kZWwuZ2V0TW9kZWxOYW1lKCk7XG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKGNiKTtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgICAgcmVzdWx0LiRwcm9taXNlID0gZGVmZXJlZC5wcm9taXNlO1xuICAgICAgcmVzdWx0LiRyZXNvbHZlZCA9IGZhbHNlO1xuXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgc3RvcmUgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpO1xuICAgICAgICB2YXIgcnEgPSBzdG9yZS5vcGVuQ3Vyc29yKCk7XG5cbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBjdXJzb3IgPSBycS5yZXN1bHQ7XG5cbiAgICAgICAgICAvLyBObyBtb3JlIG1hdGNoaW5nIHJlY29yZHMuXG4gICAgICAgICAgaWYgKCFjdXJzb3IpIHtcbiAgICAgICAgICAgIHJlc3VsdC4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIE9idGVuZXIgbGEgaW5zdGFuY2lhXG4gICAgICAgICAgdmFyIHJlY29yZCA9IE1vZGVsLmdldEluc3RhbmNlRnJvbU9iamVjdChjdXJzb3IudmFsdWUpO1xuICAgICAgICAgIHJlY29yZC4kaXNOZXcgPSBmYWxzZTsgLy8gSW5pY2FyIHF1ZSBubyBlcyB1biByZWdpc3RybyBudWV2b1xuXG4gICAgICAgICAgLy8gQWdyZWdhciBhbCByZXN1bHRhZG9cbiAgICAgICAgICByZXN1bHQucHVzaChyZWNvcmQpO1xuXG4gICAgICAgICAgLy8gQnVzY2FyIHNpZ3VpZW50ZVxuICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIC8vIENyZWFyIGFsaWFzIHBhcmEgbG9zIGV2ZW50b3MgZW5sYXphciBjYWxsYmFja3MgYSBsb3MgZXZlbnRvc1xuICAgIHZhciBkZWZlcmVkcyA9IHZvaWQgMDtcbiAgICBPYmplY3Qua2V5cyhkZWZlcmVkcyA9IHtcbiAgICAgIG9uT3BlbjogJG9wZW5EZWZlcmVkLFxuICAgICAgb25VcGdyYWRlTmVlZGVkOiAkdXBncmFkZU5lZWRlZERlZmVyZWQsXG4gICAgICBvblNvY2tldENvbm5lY3RlZDogJHNvY2tldENvbm5lY3RlZERlZmVyZWRcbiAgICB9KS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoZnVuY3Rpb24gKGVycikge1xuICAgICAgICB2YXIgdGV4dCA9ICRkYk5hbWUgKyAnLnYnICsgKCRkYlZlcnNpb24gfHwgMSkgKyAnOiAnICsga2V5O1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgJGxvZy5lcnJvcih0ZXh0LCBlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRsb2cubG9nKHRleHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXpba2V5XSA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XG4gICAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGNiKTtcbiAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBpZGI7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYk1vZGVsU2VydmljZSAoJGxvZywgcXMsIGlkYlV0aWxzLCBsYlJlc291cmNlLCAkdGltZW91dCkgeyAnbmdJbmplY3QnO1xyXG5cclxuICByZXR1cm4gZnVuY3Rpb24gaWRiTW9kZWwgKCRkYiwgJG1vZGVsTmFtZSwgJHNvY2tldCkge1xyXG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbbnVsbCAsJ3N0cmluZyddKTtcclxuXHJcbiAgICAvLyBDbGF2ZSBkZWwgbW9kZWxvXHJcbiAgICBsZXQgJGlkID0geyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OiB0cnVlIH07XHJcbiAgICBsZXQgJGZpZWxkcyA9IHt9O1xyXG4gICAgbGV0ICRpbnN0YW5jZXMgPSB7fTtcclxuICAgIGxldCAkcmVtb3RlID0gbnVsbDtcclxuXHJcbiAgICAvLyBDb25zdHVjdG9yIGRlbCBtb2RlbG9cclxuICAgIGZ1bmN0aW9uIE1vZGVsKGRhdGEsIHN0b3JlZCkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXSAsJ2Jvb2xlYW4nXSk7XHJcblxyXG4gICAgICB0aGlzLiRpc05ldyA9IHRydWU7XHJcbiAgICAgIHRoaXMuJHJlY29yZCA9IG51bGw7XHJcbiAgICAgIHRoaXMuJG9yaWdpbmFsVmFsdWVzID0ge307XHJcbiAgICAgIHRoaXMuJHN0b3JlZCA9IHN0b3JlZDtcclxuICAgICAgXHJcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlcyhkYXRhIHx8IHt9LCB0cnVlKTtcclxuICAgICAgdGhpcy5jb25zdHJ1Y3RvcihkYXRhKTtcclxuXHJcbiAgICAgIGlmICgkc29ja2V0KSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW4oKTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdiBlbCBub21icmUgZGVsIG1vZGVsb1xyXG4gICAgTW9kZWwuZ2V0TW9kZWxOYW1lID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgcmV0dXJuICRtb2RlbE5hbWU7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2IGVsIG5vbWJyZSBkZWwgbW9kZWxvXHJcbiAgICBNb2RlbC5nZXRLZXlQYXRoID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgcmV0dXJuICRpZC5rZXlQYXRoO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xyXG4gICAgTW9kZWwuYXV0b0luY3JlbWVudCA9IGZ1bmN0aW9uIChhdXRvSW5jcmVtZW50KSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydib29sZWFuJ10pO1xyXG5cclxuICAgICAgJGlkLmF1dG9JbmNyZW1lbnQgPSBhdXRvSW5jcmVtZW50O1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgZWwgSUQgYWwgbW9kZWxvXHJcbiAgICBNb2RlbC5rZXlQYXRoID0gZnVuY3Rpb24gKGtleVBhdGgpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZyddKTtcclxuXHJcbiAgICAgICRpZC5rZXlQYXRoID0ga2V5UGF0aDtcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RvIHN0b3JhZ2UgcGFyYSBlbCBtb2RlbG8uXHJcbiAgICBNb2RlbC5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICRkYi5jcmVhdGVTdG9yZSgkbW9kZWxOYW1lLCAkaWQpO1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZ3JlZ2EgdW4gaW5kZXhcclxuICAgIE1vZGVsLmluZGV4ID0gZnVuY3Rpb24gKGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XHJcbiAgICAgICRkYi5jcmVhdGVJbmRleCgkbW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gTcOpdG9kbyBxdWUgcGVybWl0ZSBtb2RpZmljYXIgbW9kZWwuXHJcbiAgICBNb2RlbC5idWlsZCA9IGZ1bmN0aW9uIChidWlsZENhbGxiYWNrKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcclxuICAgICAgYnVpbGRDYWxsYmFjayhNb2RlbCk7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGxhIGVzcGVjaWZpY2FjacOzbiBkZSBsb3MgY2FtcG9zXHJcbiAgICBNb2RlbC5maWVsZHMgPSBmdW5jdGlvbiAoZmllbGRzKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnXSk7XHJcblxyXG4gICAgICAkZmllbGRzID0ge307XHJcbiAgICAgICRmaWVsZHNbJGlkLmtleVBhdGhdID0ge1xyXG4gICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiLFxyXG4gICAgICAgIFwicmVxdWlyZWRcIjogdHJ1ZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgT2JqZWN0LmtleXMoZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkTmFtZSkge1xyXG4gICAgICAgIGxldCBmaWVsZCA9IGZpZWxkc1tmaWVsZE5hbWVdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZmllbGRzW2ZpZWxkTmFtZV0gPT0gJ3N0cmluZycpe1xyXG4gICAgICAgICAgZmllbGQgPSB7IFwidHlwZVwiOiBmaWVsZCB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICAkZmllbGRzW2ZpZWxkTmFtZV0gPSBmaWVsZDtcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDb25maWd1cmEgZWwgcmVtb3RlIGFwaTtcclxuICAgIE1vZGVsLnJlbW90ZSA9IGZ1bmN0aW9uICh1cmwsIGFyZ3MsIGFjdGlvbnMpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnLCAnb2JqZWN0J10pO1xyXG4gICAgICAkcmVtb3RlID0gbGJSZXNvdXJjZSh1cmwsIGFyZ3MsIGFjdGlvbnMpO1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgbnVldmFzIGluc3RhbmNpYXMgZGUgbG9zIG1vZGVsb3NcclxuICAgIE1vZGVsLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgLy8gU2kgZXMgdW4gYXJyYXlcclxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gTW9kZWwuZ2V0SW5zdGFuY2VGcm9tT2JqZWN0KHJlY29yZClcclxuICAgICAgICAgIC5jcmVhdGUoY2IpO1xyXG4gICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgIC8vIE9idGVuZXIgdW5hIGNvcGlhIGRlbCBhcnJheVxyXG4gICAgICBsZXQgYXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZGF0YSk7XHJcbiAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgbGV0IGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XHJcblxyXG4gICAgICAoZnVuY3Rpb24gaXRlcmF0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gTm8gcXVlZGFuIGVsZW1lbnRvcyBlbiBlbCBhcnJheVxyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09IDApIHJldHVybiBkZWZlcmVkLnJlc29sdmUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXIgZWwgc2lndWllbnRlIGVsZW1lbnRvXHJcbiAgICAgICAgTW9kZWwuY3JlYXRlKGFyci5zaGlmdCgpLCBmdW5jdGlvbiAoZXJyLCBpbnN0YW5jZSkge1xyXG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRlZmVyZWQucmVqZWN0KGVycik7XHJcbiAgICAgICAgICByZXN1bHQucHVzaChpbnN0YW5jZSk7XHJcbiAgICAgICAgICBpdGVyYXRpb24oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0pKCk7XHJcblxyXG4gICAgICAvLyBEZXZvbHZlciBlbCBwcm9taXNlXHJcbiAgICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQnVzY2FyIHVuIGNhbXBvXHJcbiAgICBNb2RlbC5zZWFyY2hEZWVwRmllbGQgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgY2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICBsZXQgZmllbGRzID0gZmllbGQuc3BsaXQoJy4nKTtcclxuICAgICAgbGV0IGxhc3RGaWVsZCA9IGZpZWxkcy5wb3AoKTtcclxuXHJcbiAgICAgIHJldHVybiAoZnVuY3Rpb24gX3NldChvYmopIHtcclxuICAgICAgICBpZiAoZmllbGRzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgcmV0dXJuIGNiKG9iaiwgbGFzdEZpZWxkKTtcclxuICAgICAgICBsZXQgZmllbGQgPSBmaWVsZHMuc2hpZnQoKTtcclxuICAgICAgICBpZiAodHlwZW9mIG9ialtmaWVsZF0gPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICAgICAgb2JqW2ZpZWxkXSA9IHt9O1xyXG4gICAgICAgIHJldHVybiBfc2V0KG9ialtmaWVsZF0pO1xyXG4gICAgICB9KShvYmopO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgY29ycmVzcG9uZGllbnRlIGFsIGtleSBkZSB1biBvYmpldG9cclxuICAgIE1vZGVsLmdldEtleUZyb20gPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICByZXR1cm4gTW9kZWwuc2VhcmNoRGVlcEZpZWxkKGRhdGEsICRpZC5rZXlQYXRoLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGVsIG1vZGVsIGRlIGxhcyBndWFyZGFkYXMuIFNpIG5vIGV4aXN0ZSBlbnRvbmNlXHJcbiAgICAvLyBzZSBjcmVhXHJcbiAgICBNb2RlbC5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uIChrZXksIGRhdGEpIHtcclxuXHJcbiAgICAgIC8vIEVsIG9iamV0byBubyB0aWVuZSBJRFxyXG4gICAgICBpZiAoIWtleSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTW9kZWwoZGF0YSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE5vIGV4aXN0ZSBsYSBpbnN0YW5jaWEgZW50b25jZSBzZSBjcmVhXHJcbiAgICAgIGlmICghJGluc3RhbmNlc1trZXldKXtcclxuICAgICAgICAkaW5zdGFuY2VzW2tleV0gPSBuZXcgTW9kZWwoZGF0YSwgdHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHJldHVybiAkaW5zdGFuY2VzW2tleV07XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgdW5hIGluc3RhbmNpYSBkZWwgbW9kZWxvIGEgcGFydGlyIGRlIHVuIG9iamVjdFxyXG4gICAgTW9kZWwuZ2V0SW5zdGFuY2VGcm9tT2JqZWN0ID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcclxuXHJcbiAgICAgIGxldCByZWNvcmQgPSBNb2RlbC5nZXRJbnN0YW5jZShNb2RlbC5nZXRLZXlGcm9tKGRhdGEpLCBkYXRhKTtcclxuICAgICAgcmV0dXJuIHJlY29yZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEJ1c2NhIHVuIHJlZ2lzdHJvIGVuIGxhIG9iamVjdFN0b3JlIGRlbCBtb2RlbG8uXHJcbiAgICBNb2RlbC5nZXQgPSBmdW5jdGlvbiAoa2V5LCBjYikge1xyXG5cclxuICAgICAgcmV0dXJuICRkYi5nZXQoTW9kZWwsIGtleSwgY2IpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xyXG4gICAgTW9kZWwuZmluZCA9IGZ1bmN0aW9uIChmaWx0ZXJzKSB7XHJcbiAgICAgIC8vIGxldCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgLy8gY2IgPSBhcmdzLnBvcCgpOyBmaWx0ZXJzID0gYXJncy5wb3AoKTtcclxuICAgICAgLy8gaWYgKCRyZW1vdGUpIHtcclxuICAgICAgLy8gICAvLyBCdXNjYXIgbG9zIHJlZ2lzdHJvcyBlbiBsYSBBUElcclxuICAgICAgLy8gICAkcmVtb3RlLmZpbmQoZmlsdGVycywgY2IpLiRwcm9taXNlXHJcbiAgICAgIC8vICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgIC8vICAgICAgIHJlc3VsdC5tYXAoZnVuY3Rpb24gKHJlY29yZCwgaWR4KSB7XHJcblxyXG4gICAgICAvLyAgICAgICAgIE1vZGVsLmdldChNb2RlbC5nZXRLZXlGcm9tKHJlY29yZCkpLiRwcm9taXNlXHJcbiAgICAgIC8vICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcclxuICAgICAgLy8gICAgICAgICAgICAgaW5zdGFuY2VcclxuICAgICAgLy8gICAgICAgICAgICAgICAuc2V0QXR0cmlidXRlcyhyZWNvcmQpXHJcbiAgICAgIC8vICAgICAgICAgICAgICAgLnJlc291cmNlKHJlY29yZCk7XHJcbiAgICAgIC8vICAgICAgICAgICAgIGlmIChpbnN0YW5jZS4kaXNOZXcpe1xyXG4gICAgICAvLyAgICAgICAgICAgICAgIGluc3RhbmNlLmNyZWF0ZSgpO1xyXG4gICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgIC8vICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgIC8vICAgICAgIH0pO1xyXG4gICAgICAvLyAgICAgfSlcclxuICAgICAgLy8gICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKFsnZXJyJywgZXJyXSlcclxuICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAvLyB9XHJcbiAgICAgIHJldHVybiAkZGIucXVlcnkoTW9kZWwsIGZpbHRlcnMpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGxvcyBhdHJpYnV0b3NcclxuICAgIE1vZGVsLnByb3RvdHlwZS5zZXRBdHRyaWJ1dGVzID0gZnVuY3Rpb24gKGRhdGEsIG9yaWdpbmFsKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xyXG4gICAgICBcclxuICAgICAgT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xyXG4gICAgICAgIHRoaXouc2V0KHByb3BlcnR5LCBkYXRhW3Byb3BlcnR5XSwgb3JpZ2luYWwpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxyXG4gICAgTW9kZWwucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChmaWVsZCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgcmV0dXJuIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGl6LCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICAgICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cclxuICAgIE1vZGVsLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoZmllbGQsIHZhbHVlLCBvcmlnaW5hbCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGl6LiRvcmlnaW5hbFZhbHVlcywgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgICAgIG9ialtsYXN0RmllbGRdID0gdmFsdWU7XHJcbiAgICAgIH0pO1xyXG4gICAgICBNb2RlbC5zZWFyY2hEZWVwRmllbGQodGhpeiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgICAgIG9ialtsYXN0RmllbGRdID0gdmFsdWU7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpejtcclxuICAgIH07XHJcblxyXG4gICAgLy8gT2J0aWVuZSBsb3MgdmFsb3JlcyByZWFsZXMgYWN0dWFsZXMgcGFyYSBndWFyZGFyIGVuIGVsIHN0b3JlXHJcbiAgICBNb2RlbC5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24gKCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgbGV0IHZhbHVlcyA9IHt9O1xyXG5cclxuICAgICAgT2JqZWN0LmtleXMoJGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh2YWx1ZXMsIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgICAgIG9ialtsYXN0RmllbGRdID0gdGhpei5nZXQoZmllbGQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiB2YWx1ZXM7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDb25zdHVyY3RvciBxdWUgc2UgcHVlZGUgc29icmUgZXNjcmliaXJcclxuICAgIE1vZGVsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEd1YXJkYSBsb3MgZGF0b3MgZGVsIG9iamV0b1xyXG4gICAgTW9kZWwucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChjYil7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICByZXR1cm4gJGRiLmNyZWF0ZSgkbW9kZWxOYW1lLCB0aGlzLCBmdW5jdGlvbiAoZXJyLCBldmVudCkge1xyXG4gICAgICAgIGlmIChlcnIpIHsgaWYgKGNiKSBjYihlcnIpOyByZXR1cm47IH07XHJcblxyXG4gICAgICAgIC8vIEFzaWduYXIgZWwgZ2VuZXJhZG8gYWwgbW9kZWxvXHJcbiAgICAgICAgdGhpei5zZXQoJGlkLmtleVBhdGgsIGV2ZW50LnRhcmdldC5yZXN1bHQpO1xyXG4gICAgICAgIHRoaXouJGlzTmV3ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIFNpIGxhIGluc3RhbmNpYSBjcmVhZGEgbm8gY29uY3VlcmRhIGNvbiBsYSBndWFyZGFkYVxyXG4gICAgICAgIGlmICgkaW5zdGFuY2VzW3RoaXouZ2V0KCRpZC5rZXlQYXRoKV0pIHtcclxuICAgICAgICAgIGlmICgkaW5zdGFuY2VzW3RoaXouZ2V0KCRpZC5rZXlQYXRoKV0gIT09IHRoaXope1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lkYk1vZGVsLlR3b0luc3RhbmNlc1dpdGhTYW1lS2V5Jyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgLy8gR3VhcmRhciBsYSBpbnN0YW5jaWEgZW4gbGEgY29sZWNpb24gZGUgaW5zdGFuY2lhc1xyXG4gICAgICAgICAgJGluc3RhbmNlc1t0aGl6LmdldCgkaWQua2V5UGF0aCldID0gdGhpejtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYikgY2IuYXBwbHkobnVsbCwgW251bGxdLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XHJcblxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gRnVuY2lvbiBxdWUgaGFjZSBlc2N1Y2hhcnMgbG9zIG1lbnNhamVzIGRlbCBzb2NrZXQgcGFyYSBlbCBtb2RlbFxyXG4gICAgTW9kZWwucHJvdG90eXBlLmxpc3RlbiA9IGZ1bmN0aW9uICgpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlmICghJHNvY2tldCkgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5Eb2VzTm90SGF2ZVNvY2tldEluc3RhbmNlJyk7XHJcblxyXG4gICAgICAkc29ja2V0LnN1YnNjcmliZSh7XHJcbiAgICAgICAgbW9kZWxOYW1lOiAkbW9kZWxOYW1lLFxyXG4gICAgICAgIGV2ZW50TmFtZTogJ3VwZGF0ZScsXHJcbiAgICAgICAgbW9kZWxJZDogdGhpei5nZXQoTW9kZWwuZ2V0S2V5UGF0aCgpKSxcclxuICAgICAgfSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB0aGl6LnNldEF0dHJpYnV0ZXMoZGF0YSB8fCB7fSwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGxhIGluc3RhbmNpYSBkZWwgcmVnaXN0cm9cclxuICAgIE1vZGVsLnByb3RvdHlwZS5yZXNvdXJjZSA9IGZ1bmN0aW9uIChyZWNvcmQpIHtcclxuICAgICAgdGhpcy4kcmVjb3JkID0gcmVjb3JkO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICB9O1xyXG5cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJNb2RlbFNlcnZpY2U7XG5mdW5jdGlvbiBpZGJNb2RlbFNlcnZpY2UoJGxvZywgcXMsIGlkYlV0aWxzLCBsYlJlc291cmNlLCAkdGltZW91dCkge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBmdW5jdGlvbiBpZGJNb2RlbCgkZGIsICRtb2RlbE5hbWUsICRzb2NrZXQpIHtcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtudWxsLCAnc3RyaW5nJ10pO1xuXG4gICAgLy8gQ2xhdmUgZGVsIG1vZGVsb1xuICAgIHZhciAkaWQgPSB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfTtcbiAgICB2YXIgJGZpZWxkcyA9IHt9O1xuICAgIHZhciAkaW5zdGFuY2VzID0ge307XG4gICAgdmFyICRyZW1vdGUgPSBudWxsO1xuXG4gICAgLy8gQ29uc3R1Y3RvciBkZWwgbW9kZWxvXG4gICAgZnVuY3Rpb24gTW9kZWwoZGF0YSwgc3RvcmVkKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgJ2Jvb2xlYW4nXSk7XG5cbiAgICAgIHRoaXMuJGlzTmV3ID0gdHJ1ZTtcbiAgICAgIHRoaXMuJHJlY29yZCA9IG51bGw7XG4gICAgICB0aGlzLiRvcmlnaW5hbFZhbHVlcyA9IHt9O1xuICAgICAgdGhpcy4kc3RvcmVkID0gc3RvcmVkO1xuXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZXMoZGF0YSB8fCB7fSwgdHJ1ZSk7XG4gICAgICB0aGlzLmNvbnN0cnVjdG9yKGRhdGEpO1xuXG4gICAgICBpZiAoJHNvY2tldCkge1xuICAgICAgICB0aGlzLmxpc3RlbigpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBEZXZ1ZWx2IGVsIG5vbWJyZSBkZWwgbW9kZWxvXG4gICAgTW9kZWwuZ2V0TW9kZWxOYW1lID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICByZXR1cm4gJG1vZGVsTmFtZTtcbiAgICB9O1xuXG4gICAgLy8gRGV2dWVsdiBlbCBub21icmUgZGVsIG1vZGVsb1xuICAgIE1vZGVsLmdldEtleVBhdGggPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHJldHVybiAkaWQua2V5UGF0aDtcbiAgICB9O1xuXG4gICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xuICAgIE1vZGVsLmF1dG9JbmNyZW1lbnQgPSBmdW5jdGlvbiAoYXV0b0luY3JlbWVudCkge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Jvb2xlYW4nXSk7XG5cbiAgICAgICRpZC5hdXRvSW5jcmVtZW50ID0gYXV0b0luY3JlbWVudDtcbiAgICAgIHJldHVybiBNb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xuICAgIE1vZGVsLmtleVBhdGggPSBmdW5jdGlvbiAoa2V5UGF0aCkge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZyddKTtcblxuICAgICAgJGlkLmtleVBhdGggPSBrZXlQYXRoO1xuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIGVsIG9iamVjdG8gc3RvcmFnZSBwYXJhIGVsIG1vZGVsby5cbiAgICBNb2RlbC5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgJGRiLmNyZWF0ZVN0b3JlKCRtb2RlbE5hbWUsICRpZCk7XG4gICAgICByZXR1cm4gTW9kZWw7XG4gICAgfTtcblxuICAgIC8vIEFncmVnYSB1biBpbmRleFxuICAgIE1vZGVsLmluZGV4ID0gZnVuY3Rpb24gKGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XG4gICAgICAkZGIuY3JlYXRlSW5kZXgoJG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBNw6l0b2RvIHF1ZSBwZXJtaXRlIG1vZGlmaWNhciBtb2RlbC5cbiAgICBNb2RlbC5idWlsZCA9IGZ1bmN0aW9uIChidWlsZENhbGxiYWNrKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XG4gICAgICBidWlsZENhbGxiYWNrKE1vZGVsKTtcbiAgICAgIHJldHVybiBNb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQXNpZ25hIGxhIGVzcGVjaWZpY2FjacOzbiBkZSBsb3MgY2FtcG9zXG4gICAgTW9kZWwuZmllbGRzID0gZnVuY3Rpb24gKGZpZWxkcykge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcblxuICAgICAgJGZpZWxkcyA9IHt9O1xuICAgICAgJGZpZWxkc1skaWQua2V5UGF0aF0gPSB7XG4gICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiLFxuICAgICAgICBcInJlcXVpcmVkXCI6IHRydWVcbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5rZXlzKGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZE5hbWUpIHtcbiAgICAgICAgdmFyIGZpZWxkID0gZmllbGRzW2ZpZWxkTmFtZV07XG4gICAgICAgIGlmICh0eXBlb2YgZmllbGRzW2ZpZWxkTmFtZV0gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBmaWVsZCA9IHsgXCJ0eXBlXCI6IGZpZWxkIH07XG4gICAgICAgIH1cbiAgICAgICAgJGZpZWxkc1tmaWVsZE5hbWVdID0gZmllbGQ7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBDb25maWd1cmEgZWwgcmVtb3RlIGFwaTtcbiAgICBNb2RlbC5yZW1vdGUgPSBmdW5jdGlvbiAodXJsLCBhcmdzLCBhY3Rpb25zKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCcsICdvYmplY3QnXSk7XG4gICAgICAkcmVtb3RlID0gbGJSZXNvdXJjZSh1cmwsIGFyZ3MsIGFjdGlvbnMpO1xuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIG51ZXZhcyBpbnN0YW5jaWFzIGRlIGxvcyBtb2RlbG9zXG4gICAgTW9kZWwuY3JlYXRlID0gZnVuY3Rpb24gKGRhdGEsIGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAvLyBTaSBlcyB1biBhcnJheVxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIE1vZGVsLmdldEluc3RhbmNlRnJvbU9iamVjdChyZWNvcmQpLmNyZWF0ZShjYik7XG4gICAgICB9XG5cbiAgICAgIC8vIE9idGVuZXIgdW5hIGNvcGlhIGRlbCBhcnJheVxuICAgICAgdmFyIGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRhdGEpO1xuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XG5cbiAgICAgIChmdW5jdGlvbiBpdGVyYXRpb24oKSB7XG5cbiAgICAgICAgLy8gTm8gcXVlZGFuIGVsZW1lbnRvcyBlbiBlbCBhcnJheVxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PSAwKSByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKHJlc3VsdCk7XG5cbiAgICAgICAgLy8gQ3JlYXIgZWwgc2lndWllbnRlIGVsZW1lbnRvXG4gICAgICAgIE1vZGVsLmNyZWF0ZShhcnIuc2hpZnQoKSwgZnVuY3Rpb24gKGVyciwgaW5zdGFuY2UpIHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZGVmZXJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICByZXN1bHQucHVzaChpbnN0YW5jZSk7XG4gICAgICAgICAgaXRlcmF0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSkoKTtcblxuICAgICAgLy8gRGV2b2x2ZXIgZWwgcHJvbWlzZVxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIEJ1c2NhciB1biBjYW1wb1xuICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCA9IGZ1bmN0aW9uIChvYmosIGZpZWxkLCBjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgIHZhciBmaWVsZHMgPSBmaWVsZC5zcGxpdCgnLicpO1xuICAgICAgdmFyIGxhc3RGaWVsZCA9IGZpZWxkcy5wb3AoKTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIF9zZXQob2JqKSB7XG4gICAgICAgIGlmIChmaWVsZHMubGVuZ3RoID09IDApIHJldHVybiBjYihvYmosIGxhc3RGaWVsZCk7XG4gICAgICAgIHZhciBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xuICAgICAgICBpZiAodHlwZW9mIG9ialtmaWVsZF0gPT09ICd1bmRlZmluZWQnKSBvYmpbZmllbGRdID0ge307XG4gICAgICAgIHJldHVybiBfc2V0KG9ialtmaWVsZF0pO1xuICAgICAgfShvYmopO1xuICAgIH07XG5cbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBjb3JyZXNwb25kaWVudGUgYWwga2V5IGRlIHVuIG9iamV0b1xuICAgIE1vZGVsLmdldEtleUZyb20gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgcmV0dXJuIE1vZGVsLnNlYXJjaERlZXBGaWVsZChkYXRhLCAkaWQua2V5UGF0aCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGVsIG1vZGVsIGRlIGxhcyBndWFyZGFkYXMuIFNpIG5vIGV4aXN0ZSBlbnRvbmNlXG4gICAgLy8gc2UgY3JlYVxuICAgIE1vZGVsLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKGtleSwgZGF0YSkge1xuXG4gICAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcbiAgICAgIGlmICgha2V5KSB7XG4gICAgICAgIHJldHVybiBuZXcgTW9kZWwoZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIC8vIE5vIGV4aXN0ZSBsYSBpbnN0YW5jaWEgZW50b25jZSBzZSBjcmVhXG4gICAgICBpZiAoISRpbnN0YW5jZXNba2V5XSkge1xuICAgICAgICAkaW5zdGFuY2VzW2tleV0gPSBuZXcgTW9kZWwoZGF0YSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkaW5zdGFuY2VzW2tleV07XG4gICAgfTtcblxuICAgIC8vIENyZWEgdW5hIGluc3RhbmNpYSBkZWwgbW9kZWxvIGEgcGFydGlyIGRlIHVuIG9iamVjdFxuICAgIE1vZGVsLmdldEluc3RhbmNlRnJvbU9iamVjdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xuXG4gICAgICB2YXIgcmVjb3JkID0gTW9kZWwuZ2V0SW5zdGFuY2UoTW9kZWwuZ2V0S2V5RnJvbShkYXRhKSwgZGF0YSk7XG4gICAgICByZXR1cm4gcmVjb3JkO1xuICAgIH07XG5cbiAgICAvLyBCdXNjYSB1biByZWdpc3RybyBlbiBsYSBvYmplY3RTdG9yZSBkZWwgbW9kZWxvLlxuICAgIE1vZGVsLmdldCA9IGZ1bmN0aW9uIChrZXksIGNiKSB7XG5cbiAgICAgIHJldHVybiAkZGIuZ2V0KE1vZGVsLCBrZXksIGNiKTtcbiAgICB9O1xuXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xuICAgIE1vZGVsLmZpbmQgPSBmdW5jdGlvbiAoZmlsdGVycykge1xuICAgICAgLy8gbGV0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgLy8gY2IgPSBhcmdzLnBvcCgpOyBmaWx0ZXJzID0gYXJncy5wb3AoKTtcbiAgICAgIC8vIGlmICgkcmVtb3RlKSB7XG4gICAgICAvLyAgIC8vIEJ1c2NhciBsb3MgcmVnaXN0cm9zIGVuIGxhIEFQSVxuICAgICAgLy8gICAkcmVtb3RlLmZpbmQoZmlsdGVycywgY2IpLiRwcm9taXNlXG4gICAgICAvLyAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgLy8gICAgICAgcmVzdWx0Lm1hcChmdW5jdGlvbiAocmVjb3JkLCBpZHgpIHtcblxuICAgICAgLy8gICAgICAgICBNb2RlbC5nZXQoTW9kZWwuZ2V0S2V5RnJvbShyZWNvcmQpKS4kcHJvbWlzZVxuICAgICAgLy8gICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgLy8gICAgICAgICAgICAgaW5zdGFuY2VcbiAgICAgIC8vICAgICAgICAgICAgICAgLnNldEF0dHJpYnV0ZXMocmVjb3JkKVxuICAgICAgLy8gICAgICAgICAgICAgICAucmVzb3VyY2UocmVjb3JkKTtcbiAgICAgIC8vICAgICAgICAgICAgIGlmIChpbnN0YW5jZS4kaXNOZXcpe1xuICAgICAgLy8gICAgICAgICAgICAgICBpbnN0YW5jZS5jcmVhdGUoKTtcbiAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgIC8vICAgICAgICAgICB9KTtcblxuICAgICAgLy8gICAgICAgfSk7XG4gICAgICAvLyAgICAgfSlcbiAgICAgIC8vICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgLy8gICAgICAgY29uc29sZS5sb2coWydlcnInLCBlcnJdKVxuICAgICAgLy8gICAgIH0pO1xuICAgICAgLy8gfVxuICAgICAgcmV0dXJuICRkYi5xdWVyeShNb2RlbCwgZmlsdGVycyk7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBsb3MgYXRyaWJ1dG9zXG4gICAgTW9kZWwucHJvdG90eXBlLnNldEF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoZGF0YSwgb3JpZ2luYWwpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnXSk7XG5cbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgdGhpei5zZXQocHJvcGVydHksIGRhdGFbcHJvcGVydHldLCBvcmlnaW5hbCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcbiAgICBNb2RlbC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICByZXR1cm4gTW9kZWwuc2VhcmNoRGVlcEZpZWxkKHRoaXosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBpbiB2YWxvciBhIHVuIGNhbXBvXG4gICAgTW9kZWwucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChmaWVsZCwgdmFsdWUsIG9yaWdpbmFsKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGl6LiRvcmlnaW5hbFZhbHVlcywgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xuICAgICAgfSk7XG4gICAgICBNb2RlbC5zZWFyY2hEZWVwRmllbGQodGhpeiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgLy8gT2J0aWVuZSBsb3MgdmFsb3JlcyByZWFsZXMgYWN0dWFsZXMgcGFyYSBndWFyZGFyIGVuIGVsIHN0b3JlXG4gICAgTW9kZWwucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciB2YWx1ZXMgPSB7fTtcblxuICAgICAgT2JqZWN0LmtleXMoJGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBNb2RlbC5zZWFyY2hEZWVwRmllbGQodmFsdWVzLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgICAgb2JqW2xhc3RGaWVsZF0gPSB0aGl6LmdldChmaWVsZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfTtcblxuICAgIC8vIENvbnN0dXJjdG9yIHF1ZSBzZSBwdWVkZSBzb2JyZSBlc2NyaWJpclxuICAgIE1vZGVsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7fTtcblxuICAgIC8vIEd1YXJkYSBsb3MgZGF0b3MgZGVsIG9iamV0b1xuICAgIE1vZGVsLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHJldHVybiAkZGIuY3JlYXRlKCRtb2RlbE5hbWUsIHRoaXMsIGZ1bmN0aW9uIChlcnIsIGV2ZW50KSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBpZiAoY2IpIGNiKGVycik7cmV0dXJuO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFzaWduYXIgZWwgZ2VuZXJhZG8gYWwgbW9kZWxvXG4gICAgICAgIHRoaXouc2V0KCRpZC5rZXlQYXRoLCBldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgdGhpei4kaXNOZXcgPSBmYWxzZTtcblxuICAgICAgICAvLyBTaSBsYSBpbnN0YW5jaWEgY3JlYWRhIG5vIGNvbmN1ZXJkYSBjb24gbGEgZ3VhcmRhZGFcbiAgICAgICAgaWYgKCRpbnN0YW5jZXNbdGhpei5nZXQoJGlkLmtleVBhdGgpXSkge1xuICAgICAgICAgIGlmICgkaW5zdGFuY2VzW3RoaXouZ2V0KCRpZC5rZXlQYXRoKV0gIT09IHRoaXopIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaWRiTW9kZWwuVHdvSW5zdGFuY2VzV2l0aFNhbWVLZXknKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gR3VhcmRhciBsYSBpbnN0YW5jaWEgZW4gbGEgY29sZWNpb24gZGUgaW5zdGFuY2lhc1xuICAgICAgICAgICRpbnN0YW5jZXNbdGhpei5nZXQoJGlkLmtleVBhdGgpXSA9IHRoaXo7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2IpIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIEZ1bmNpb24gcXVlIGhhY2UgZXNjdWNoYXJzIGxvcyBtZW5zYWplcyBkZWwgc29ja2V0IHBhcmEgZWwgbW9kZWxcbiAgICBNb2RlbC5wcm90b3R5cGUubGlzdGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgaWYgKCEkc29ja2V0KSB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkRvZXNOb3RIYXZlU29ja2V0SW5zdGFuY2UnKTtcblxuICAgICAgJHNvY2tldC5zdWJzY3JpYmUoe1xuICAgICAgICBtb2RlbE5hbWU6ICRtb2RlbE5hbWUsXG4gICAgICAgIGV2ZW50TmFtZTogJ3VwZGF0ZScsXG4gICAgICAgIG1vZGVsSWQ6IHRoaXouZ2V0KE1vZGVsLmdldEtleVBhdGgoKSlcbiAgICAgIH0sIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGl6LnNldEF0dHJpYnV0ZXMoZGF0YSB8fCB7fSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBsYSBpbnN0YW5jaWEgZGVsIHJlZ2lzdHJvXG4gICAgTW9kZWwucHJvdG90eXBlLnJlc291cmNlID0gZnVuY3Rpb24gKHJlY29yZCkge1xuICAgICAgdGhpcy4kcmVjb3JkID0gcmVjb3JkO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIHJldHVybiBNb2RlbDtcbiAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxiIChtb2R1bGUpIHtcclxuXHJcbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcclxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xyXG4gICAgbGV0IG0gPSB1cmwubWF0Y2goL14oPzpodHRwcz86KT9cXC9cXC8oW15cXC9dKykvKTtcclxuICAgIHJldHVybiBtID8gbVsxXSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBsZXQgdXJsQmFzZUhvc3QgPSBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICBsZXQgbGJBdXRoID0gZnVuY3Rpb24oKSB7ICduZ0luamVjdCdcclxuICAgIGNvbnN0IHByb3BzID0gWydhY2Nlc3NUb2tlbklkJywgJ2N1cnJlbnRVc2VySWQnLCAncmVtZW1iZXJNZSddO1xyXG4gICAgY29uc3QgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xyXG4gICAgXHJcbiAgICAvLyBOb3RlOiBMb2NhbFN0b3JhZ2UgY29udmVydHMgdGhlIHZhbHVlIHRvIHN0cmluZ1xyXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxyXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAnJztcclxuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcclxuICAgICAgY29uc3Qga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xyXG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICB0aGl6W25hbWVdID0gbG9hZChuYW1lKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGxldCBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbihhY2Nlc3NUb2tlbklkLCB1c2VySWQsIHVzZXJEYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc2Vzc2lvblN0b3JhZ2UsIG5hbWUsIG51bGwpO1xyXG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XHJcblxyXG4gIH07XHJcblxyXG4gIGxldCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbigkcSwgbGJBdXRoKSB7ICduZ0luamVjdCc7XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlcXVlc3Q6IGZ1bmN0aW9uKGNvbmZpZykge1xyXG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXh0ZXJuYWwgcmVxdWVzdHNcclxuICAgICAgICBjb25zdCBob3N0ID0gZ2V0SG9zdChjb25maWcudXJsKTtcclxuICAgICAgICBpZiAoaG9zdCAmJiBob3N0ICE9PSB1cmxCYXNlSG9zdCkge1xyXG4gICAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsYkF1dGguYWNjZXNzVG9rZW5JZCkge1xyXG4gICAgICAgICAgY29uZmlnLmhlYWRlcnNbYXV0aEhlYWRlcl0gPSBsYkF1dGguYWNjZXNzVG9rZW5JZDtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5fX2lzR2V0Q3VycmVudFVzZXJfXykge1xyXG4gICAgICAgICAgLy8gUmV0dXJuIGEgc3R1YiA0MDEgZXJyb3IgZm9yIFVzZXIuZ2V0Q3VycmVudCgpIHdoZW5cclxuICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIHVzZXIgbG9nZ2VkIGluXHJcbiAgICAgICAgICBsZXQgcmVzID0ge1xyXG4gICAgICAgICAgICBib2R5OiB7IGVycm9yOiB7IHN0YXR1czogNDAxIH19LFxyXG4gICAgICAgICAgICBzdGF0dXM6IDQwMSxcclxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICB9O1xyXG5cclxuICBsZXQgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnOyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgdXJsQmFzZTogXCIvYXBpXCIsXHJcbiAgICAgIGF1dGhIZWFkZXI6ICdhdXRob3JpemF0aW9uJyxcclxuICAgIH07XHJcblxyXG4gICAgdXJsQmFzZUhvc3QgPSBnZXRIb3N0KG9wdGlvbnMudXJsQmFzZSkgfHwgbG9jYXRpb24uaG9zdDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlciBUaGUgaGVhZGVyIG5hbWUgdG8gdXNlLCBlLmcuIGBYLUFjY2Vzcy1Ub2tlbmBcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ29uZmlndXJlIHRoZSBSRVNUIHRyYW5zcG9ydCB0byB1c2UgYSBkaWZmZXJlbnQgaGVhZGVyIGZvciBzZW5kaW5nXHJcbiAgICAgKiB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uIEl0IGlzIHNlbnQgaW4gdGhlIGBBdXRob3JpemF0aW9uYCBoZWFkZXJcclxuICAgICAqIGJ5IGRlZmF1bHQuXHJcbiAgICAgKi9cclxuICAgIHRoaXouc2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKGhlYWRlcikge1xyXG4gICAgICBvcHRpb25zLmF1dGhIZWFkZXIgPSBoZWFkZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgaGVhZGVyIG5hbWUgdGhhdCBpcyB1c2VkIGZvciBzZW5kaW5nIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cclxuICAgICAqL1xyXG4gICAgdGhpei5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdXNlLCBlLmcuIGAvYXBpYCBvciBgLy9leGFtcGxlLmNvbS9hcGlgLlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDaGFuZ2UgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBCeSBkZWZhdWx0LCB0aGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xyXG4gICAgdGhpei5zZXRVcmxCYXNlID0gZnVuY3Rpb24odXJsKSB7XHJcbiAgICAgIG9wdGlvbnMudXJsQmFzZSA9IHVybDtcclxuICAgICAgdXJsQmFzZUhvc3QgPSBnZXRIb3N0KG9wdGlvbnMudXJsQmFzZSkgfHwgbG9jYXRpb24uaG9zdDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gVGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cclxuICAgIHRoaXouZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LiRnZXQgPSBmdW5jdGlvbigkcmVzb3VyY2UpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgICAgIGxldCBsYlJlc291cmNlID0gZnVuY3Rpb24odXJsLCBwYXJhbXMsIGFjdGlvbnMpIHtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMoYWN0aW9ucykubWFwKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgIGFjdGlvbnNba2V5XS5vcmlnaW5hbFVybCA9IGFjdGlvbnNba2V5XS51cmw7XHJcbiAgICAgICAgICBhY3Rpb25zW2tleV0udXJsID0gb3B0aW9ucy51cmxCYXNlICsgYWN0aW9uc1trZXldLnVybDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcclxuXHJcbiAgICAgICAgLy8gQW5ndWxhciBhbHdheXMgY2FsbHMgUE9TVCBvbiAkc2F2ZSgpXHJcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXHJcbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xyXG4gICAgICAgIHJlc291cmNlLnByb3RvdHlwZS4kc2F2ZSA9IGZ1bmN0aW9uKHN1Y2Nlc3MsIGVycm9yKSB7XHJcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxyXG4gICAgICAgICAgLy8gdGhhdCBleGFjdGx5IGZpdHMgb3VyIG5lZWRzLlxyXG4gICAgICAgICAgbGV0IHJlc3VsdCA9IHJlc291cmNlLnVwc2VydC5jYWxsKHRoaXMsIHt9LCB0aGlzLCBzdWNjZXNzLCBlcnJvcik7XHJcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LiRwcm9taXNlIHx8IHJlc3VsdDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxiUmVzb3VyY2UuZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsYlJlc291cmNlLmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xyXG4gICAgICB9O1xyXG4gICAgXHJcbiAgICAgIHJldHVybiBsYlJlc291cmNlO1xyXG5cclxuICAgIH07XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1vZHVsZVxyXG4gICAgLmZhY3RvcnkoJ2xiQXV0aCcsIGxiQXV0aClcclxuICAgIC5wcm92aWRlcignbGJSZXNvdXJjZScsIGxiUmVzb3VyY2UpXHJcbiAgICAuZmFjdG9yeSgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJywgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yKVxyXG4gICAgLmNvbmZpZyhbJyRodHRwUHJvdmlkZXInLCBmdW5jdGlvbigkaHR0cFByb3ZpZGVyKSB7ICduZ0luamVjdCc7XHJcbiAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicpO1xyXG4gICAgfV0pO1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2xiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gbGI7XG5mdW5jdGlvbiBsYihtb2R1bGUpIHtcblxuICAvLyBEdnVlbHZlIGVsIGhvc3QgZGUgdW5hIFVSTFxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xuICAgIHZhciBtID0gdXJsLm1hdGNoKC9eKD86aHR0cHM/Oik/XFwvXFwvKFteXFwvXSspLyk7XG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcbiAgfVxuXG4gIHZhciB1cmxCYXNlSG9zdCA9IGxvY2F0aW9uLmhvc3Q7XG5cbiAgdmFyIGxiQXV0aCA9IGZ1bmN0aW9uIGxiQXV0aCgpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdmFyIHByb3BzID0gWydhY2Nlc3NUb2tlbklkJywgJ2N1cnJlbnRVc2VySWQnLCAncmVtZW1iZXJNZSddO1xuICAgIHZhciBwcm9wc1ByZWZpeCA9ICckaWRiLWxiJCc7XG5cbiAgICAvLyBOb3RlOiBMb2NhbFN0b3JhZ2UgY29udmVydHMgdGhlIHZhbHVlIHRvIHN0cmluZ1xuICAgIC8vIFdlIGFyZSB1c2luZyBlbXB0eSBzdHJpbmcgYXMgYSBtYXJrZXIgZm9yIG51bGwvdW5kZWZpbmVkIHZhbHVlcy5cbiAgICBmdW5jdGlvbiBzYXZlKHN0b3JhZ2UsIG5hbWUsIHZhbHVlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAnJztcbiAgICAgICAgc3RvcmFnZVtrZXldID0gdmFsdWU7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZChuYW1lKSB7XG4gICAgICB2YXIga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVtrZXldIHx8IHNlc3Npb25TdG9yYWdlW2tleV0gfHwgbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsYkF1dGgoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdGhpeltuYW1lXSA9IGxvYWQobmFtZSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB2YXIgc3RvcmFnZSA9IHRoaXoucmVtZW1iZXJNZSA/IGxvY2FsU3RvcmFnZSA6IHNlc3Npb25TdG9yYWdlO1xuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBzYXZlKHN0b3JhZ2UsIG5hbWUsIHRoaXpbbmFtZV0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2V0VXNlciA9IGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCB1c2VySWQsIHVzZXJEYXRhKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xuICAgICAgdGhpei5jdXJyZW50VXNlcklkID0gdXNlcklkO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSB1c2VyRGF0YTtcbiAgICB9O1xuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclVzZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xuICAgICAgdGhpei5jdXJyZW50VXNlcklkID0gbnVsbDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcbiAgICB9O1xuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclN0b3JhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHNhdmUoc2Vzc2lvblN0b3JhZ2UsIG5hbWUsIG51bGwpO1xuICAgICAgICBzYXZlKGxvY2FsU3RvcmFnZSwgbmFtZSwgbnVsbCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBsYkF1dGgoKTtcbiAgfTtcblxuICB2YXIgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24gbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yKCRxLCBsYkF1dGgpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXh0ZXJuYWwgcmVxdWVzdHNcbiAgICAgICAgdmFyIGhvc3QgPSBnZXRIb3N0KGNvbmZpZy51cmwpO1xuICAgICAgICBpZiAoaG9zdCAmJiBob3N0ICE9PSB1cmxCYXNlSG9zdCkge1xuICAgICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGJBdXRoLmFjY2Vzc1Rva2VuSWQpIHtcbiAgICAgICAgICBjb25maWcuaGVhZGVyc1thdXRoSGVhZGVyXSA9IGxiQXV0aC5hY2Nlc3NUb2tlbklkO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5fX2lzR2V0Q3VycmVudFVzZXJfXykge1xuICAgICAgICAgIC8vIFJldHVybiBhIHN0dWIgNDAxIGVycm9yIGZvciBVc2VyLmdldEN1cnJlbnQoKSB3aGVuXG4gICAgICAgICAgLy8gdGhlcmUgaXMgbm8gdXNlciBsb2dnZWQgaW5cbiAgICAgICAgICB2YXIgcmVzID0ge1xuICAgICAgICAgICAgYm9keTogeyBlcnJvcjogeyBzdGF0dXM6IDQwMSB9IH0sXG4gICAgICAgICAgICBzdGF0dXM6IDQwMSxcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICAgICAgaGVhZGVyczogZnVuY3Rpb24gaGVhZGVycygpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29uZmlnIHx8ICRxLndoZW4oY29uZmlnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIHZhciBsYlJlc291cmNlID0gZnVuY3Rpb24gbGJSZXNvdXJjZSgpIHtcbiAgICAnbmdJbmplY3QnO1xuICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgdXJsQmFzZTogXCIvYXBpXCIsXG4gICAgICBhdXRoSGVhZGVyOiAnYXV0aG9yaXphdGlvbidcbiAgICB9O1xuXG4gICAgdXJsQmFzZUhvc3QgPSBnZXRIb3N0KG9wdGlvbnMudXJsQmFzZSkgfHwgbG9jYXRpb24uaG9zdDtcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyIFRoZSBoZWFkZXIgbmFtZSB0byB1c2UsIGUuZy4gYFgtQWNjZXNzLVRva2VuYFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25maWd1cmUgdGhlIFJFU1QgdHJhbnNwb3J0IHRvIHVzZSBhIGRpZmZlcmVudCBoZWFkZXIgZm9yIHNlbmRpbmdcclxuICAgICAqIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi4gSXQgaXMgc2VudCBpbiB0aGUgYEF1dGhvcml6YXRpb25gIGhlYWRlclxyXG4gICAgICogYnkgZGVmYXVsdC5cclxuICAgICAqL1xuICAgIHRoaXouc2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uIChoZWFkZXIpIHtcbiAgICAgIG9wdGlvbnMuYXV0aEhlYWRlciA9IGhlYWRlcjtcbiAgICB9LFxuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBoZWFkZXIgbmFtZSB0aGF0IGlzIHVzZWQgZm9yIHNlbmRpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLlxyXG4gICAgICovXG4gICAgdGhpei5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcbiAgICB9LFxuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB1c2UsIGUuZy4gYC9hcGlgIG9yIGAvL2V4YW1wbGUuY29tL2FwaWAuXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENoYW5nZSB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIEJ5IGRlZmF1bHQsIHRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXG4gICAgdGhpei5zZXRVcmxCYXNlID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgb3B0aW9ucy51cmxCYXNlID0gdXJsO1xuICAgICAgdXJsQmFzZUhvc3QgPSBnZXRIb3N0KG9wdGlvbnMudXJsQmFzZSkgfHwgbG9jYXRpb24uaG9zdDtcbiAgICB9LFxuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gVGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cbiAgICB0aGl6LmdldFVybEJhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xuICAgIH07XG5cbiAgICB0aGl6LiRnZXQgPSBmdW5jdGlvbiAoJHJlc291cmNlKSB7XG4gICAgICAnbmdJbmplY3QnO1xuXG4gICAgICB2YXIgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uIGxiUmVzb3VyY2UodXJsLCBwYXJhbXMsIGFjdGlvbnMpIHtcblxuICAgICAgICBPYmplY3Qua2V5cyhhY3Rpb25zKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIGFjdGlvbnNba2V5XS5vcmlnaW5hbFVybCA9IGFjdGlvbnNba2V5XS51cmw7XG4gICAgICAgICAgYWN0aW9uc1trZXldLnVybCA9IG9wdGlvbnMudXJsQmFzZSArIGFjdGlvbnNba2V5XS51cmw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciByZXNvdXJjZSA9ICRyZXNvdXJjZShvcHRpb25zLnVybEJhc2UgKyB1cmwsIHBhcmFtcywgYWN0aW9ucyk7XG5cbiAgICAgICAgLy8gQW5ndWxhciBhbHdheXMgY2FsbHMgUE9TVCBvbiAkc2F2ZSgpXG4gICAgICAgIC8vIFRoaXMgaGFjayBpcyBiYXNlZCBvblxuICAgICAgICAvLyBodHRwOi8va2lya2J1c2hlbGwubWUvYW5ndWxhci1qcy11c2luZy1uZy1yZXNvdXJjZS1pbi1hLW1vcmUtcmVzdGZ1bC1tYW5uZXIvXG4gICAgICAgIHJlc291cmNlLnByb3RvdHlwZS4kc2F2ZSA9IGZ1bmN0aW9uIChzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgIC8vIEZvcnR1bmF0ZWx5LCBMb29wQmFjayBwcm92aWRlcyBhIGNvbnZlbmllbnQgYHVwc2VydGAgbWV0aG9kXG4gICAgICAgICAgLy8gdGhhdCBleGFjdGx5IGZpdHMgb3VyIG5lZWRzLlxuICAgICAgICAgIHZhciByZXN1bHQgPSByZXNvdXJjZS51cHNlcnQuY2FsbCh0aGlzLCB7fSwgdGhpcywgc3VjY2VzcywgZXJyb3IpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQuJHByb21pc2UgfHwgcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzb3VyY2U7XG4gICAgICB9O1xuXG4gICAgICBsYlJlc291cmNlLmdldFVybEJhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XG4gICAgICB9O1xuXG4gICAgICBsYlJlc291cmNlLmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gbGJSZXNvdXJjZTtcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBtb2R1bGUuZmFjdG9yeSgnbGJBdXRoJywgbGJBdXRoKS5wcm92aWRlcignbGJSZXNvdXJjZScsIGxiUmVzb3VyY2UpLmZhY3RvcnkoJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicsIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcikuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicpO1xuICB9XSk7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvbGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiUXVlcnkgKCRsb2csIGlkYlV0aWxzKSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIGlkYlF1ZXJ5KCRkYiwgJE1vZGVsLCAkZmlsdGVycykgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnZnVuY3Rpb24nLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgIGxldCAkcmVzdWx0ID0gbnVsbDtcclxuICAgIGxldCAkcmVtb3RlUmVzdWx0ID0gW107XHJcblxyXG4gICAgLy8gRnVuY2lvbiBxdWUgZGV2dWVsdmUgZWplY3V0YSBlbCBxdWVyeSB5IGRldnVlbHZlIGVsIHJlc3VsdGFkby5cclxuICAgIHRoaXouZ2V0UmVzdWx0ID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIC8vIEVqZWN1dGFyIHNpIG5vIHNlIGhhIGVqZWN1dGFkb1xyXG4gICAgICBpZiAoISRyZXN1bHQpXHJcbiAgICAgICAgJHJlc3VsdCA9ICRkYi5maW5kKCRNb2RlbCwgJGZpbHRlcnMsIGNiKTtcclxuICAgICAgcmV0dXJuICRyZXN1bHQ7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaWRiUXVlcnk7XG5mdW5jdGlvbiBpZGJRdWVyeSgkbG9nLCBpZGJVdGlscykge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBmdW5jdGlvbiBpZGJRdWVyeSgkZGIsICRNb2RlbCwgJGZpbHRlcnMpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdmdW5jdGlvbicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICB2YXIgJHJlc3VsdCA9IG51bGw7XG4gICAgdmFyICRyZW1vdGVSZXN1bHQgPSBbXTtcblxuICAgIC8vIEZ1bmNpb24gcXVlIGRldnVlbHZlIGVqZWN1dGEgZWwgcXVlcnkgeSBkZXZ1ZWx2ZSBlbCByZXN1bHRhZG8uXG4gICAgdGhpei5nZXRSZXN1bHQgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgLy8gRWplY3V0YXIgc2kgbm8gc2UgaGEgZWplY3V0YWRvXG4gICAgICBpZiAoISRyZXN1bHQpICRyZXN1bHQgPSAkZGIuZmluZCgkTW9kZWwsICRmaWx0ZXJzLCBjYik7XG4gICAgICByZXR1cm4gJHJlc3VsdDtcbiAgICB9O1xuICB9O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYlF1ZXJ5LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiU29ja2V0U2VydmljZSgkbG9nLCBpbywgaWRiVXRpbHMpIHsgJ25nSW5qZWN0JzsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgXHJcbiAgbGV0ICRkZWZVcmxTZXJ2ZXIgPSBudWxsO1xyXG5cclxuICBmdW5jdGlvbiBpZGJTb2NrZXQgKCR1cmxTZXJ2ZXIsICRhY2Nlc3NUb2tlbklkLCAkY3VycmVudFVzZXJJZCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3N0cmluZycsICdudW1iZXInXSwgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcclxuXHJcbiAgICBsZXQgJGxpc3RlbmVycyA9ICBbXTtcclxuICAgIGxldCAkc29ja2V0ID0gbnVsbDtcclxuICAgICR1cmxTZXJ2ZXIgPSAkdXJsU2VydmVyIHx8ICRkZWZVcmxTZXJ2ZXI7XHJcblxyXG4gICAgLy8gQ29uZWN0YXJzZSBhbCBzZXJ2aWRvclxyXG4gICAgdGhpei5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBcclxuICAgICAgLy8gQ3JlYXRpbmcgY29ubmVjdGlvbiB3aXRoIHNlcnZlclxyXG4gICAgICAkc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsU2VydmVyKTtcclxuXHJcbiAgICAgIC8vIFRoaXMgcGFydCBpcyBvbmx5IGZvciBsb2dpbiB1c2VycyBmb3IgYXV0aGVudGljYXRlZCAkc29ja2V0IGNvbm5lY3Rpb24gYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlci5cclxuICAgICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXHJcblxyXG4gICAgICAkc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkbG9nLmxvZygnY29ubmVjdGVkJyk7XHJcblxyXG4gICAgICAgICRzb2NrZXQuZW1pdCgnYXV0aGVudGljYXRpb24nLCB7XHJcbiAgICAgICAgICBpZDogJGFjY2Vzc1Rva2VuSWQsXHJcbiAgICAgICAgICB1c2VySWQ6ICRjdXJyZW50VXNlcklkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRzb2NrZXQub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIC8vIHVzZSB0aGUgJHNvY2tldCBhcyB1c3VhbFxyXG4gICAgICAgICAgJGxvZy5sb2coJ1VzZXIgaXMgYXV0aGVudGljYXRlZCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgdmFyIG5hbWUgPSBvcHRpb25zLm1vZGVsTmFtZSArICcuJyArIG9wdGlvbnMuZXZlbnROYW1lO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgbmFtZSA9IG5hbWUgKyAnLicgKyBvcHRpb25zLm1vZGVsSWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRzb2NrZXQub24obmFtZSwgY2IpO1xyXG4gICAgICBcclxuICAgICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxyXG4gICAgICAkbGlzdGVuZXJzLnB1c2gobmFtZSwgY2IpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wdXNoTGlzdGVuZXIgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSwgY2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICRsaXN0ZW5lcnMucHVzaChzdWJzY3JpcHRpb25OYW1lKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSkge1xyXG4gICAgICAkc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTsgIFxyXG4gICAgICB2YXIgaWR4ID0gJGxpc3RlbmVycy5pbmRleE9mKHN1YnNjcmlwdGlvbk5hbWUpO1xyXG4gICAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgICAkbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouY29ubmVjdCgpO1xyXG5cclxuICB9O1xyXG5cclxuICAvLyBBc2lnbmEgbGEgVVJMIGRlIHNlcnZpZG9yIHBvciBkZWZlY3RvXHJcbiAgaWRiU29ja2V0LnNldFVybFNlcnZlciA9IGZ1bmN0aW9uICh1cmxTZXJ2ZXIpIHtcclxuICAgICRkZWZVcmxTZXJ2ZXIgPSB1cmxTZXJ2ZXI7XHJcbiAgfTtcclxuXHJcbiAgLy8gQVNpZ25hIGxhcyBjcmVkZW5jaWFsZXMgcG9yIGRlZmVjdG9cclxuICBpZGJTb2NrZXQuc2V0Q3JlZGVudGlhbHMgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCkge1xyXG4gICAgYWNjZXNzVG9rZW5JZCA9ICRhY2Nlc3NUb2tlbklkXHJcbiAgICBjdXJyZW50VXNlcklkID0gJGN1cnJlbnRVc2VySWQ7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGlkYlNvY2tldDtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJTb2NrZXQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJTb2NrZXRTZXJ2aWNlO1xuZnVuY3Rpb24gaWRiU29ja2V0U2VydmljZSgkbG9nLCBpbywgaWRiVXRpbHMpIHtcbiAgJ25nSW5qZWN0JztcbiAgdmFyIHRoaXogPSB0aGlzO1xuXG4gIHZhciAkZGVmVXJsU2VydmVyID0gbnVsbDtcblxuICBmdW5jdGlvbiBpZGJTb2NrZXQoJHVybFNlcnZlciwgJGFjY2Vzc1Rva2VuSWQsICRjdXJyZW50VXNlcklkKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3N0cmluZycsICdudW1iZXInXSwgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcblxuICAgIHZhciAkbGlzdGVuZXJzID0gW107XG4gICAgdmFyICRzb2NrZXQgPSBudWxsO1xuICAgICR1cmxTZXJ2ZXIgPSAkdXJsU2VydmVyIHx8ICRkZWZVcmxTZXJ2ZXI7XG5cbiAgICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXG4gICAgdGhpei5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyBDcmVhdGluZyBjb25uZWN0aW9uIHdpdGggc2VydmVyXG4gICAgICAkc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsU2VydmVyKTtcblxuICAgICAgLy8gVGhpcyBwYXJ0IGlzIG9ubHkgZm9yIGxvZ2luIHVzZXJzIGZvciBhdXRoZW50aWNhdGVkICRzb2NrZXQgY29ubmVjdGlvbiBiZXR3ZWVuIGNsaWVudCBhbmQgc2VydmVyLlxuICAgICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXG5cbiAgICAgICRzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRsb2cubG9nKCdjb25uZWN0ZWQnKTtcblxuICAgICAgICAkc29ja2V0LmVtaXQoJ2F1dGhlbnRpY2F0aW9uJywge1xuICAgICAgICAgIGlkOiAkYWNjZXNzVG9rZW5JZCxcbiAgICAgICAgICB1c2VySWQ6ICRjdXJyZW50VXNlcklkXG4gICAgICAgIH0pO1xuICAgICAgICAkc29ja2V0Lm9uKCdhdXRoZW50aWNhdGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIHVzZSB0aGUgJHNvY2tldCBhcyB1c3VhbFxuICAgICAgICAgICRsb2cubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpei5zdWJzY3JpYmUgPSBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIHZhciBuYW1lID0gb3B0aW9ucy5tb2RlbE5hbWUgKyAnLicgKyBvcHRpb25zLmV2ZW50TmFtZTtcblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lICsgJy4nICsgb3B0aW9ucy5tb2RlbElkO1xuICAgICAgfVxuXG4gICAgICAkc29ja2V0Lm9uKG5hbWUsIGNiKTtcblxuICAgICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxuICAgICAgJGxpc3RlbmVycy5wdXNoKG5hbWUsIGNiKTtcbiAgICB9O1xuXG4gICAgdGhpei5wdXNoTGlzdGVuZXIgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICRsaXN0ZW5lcnMucHVzaChzdWJzY3JpcHRpb25OYW1lKTtcbiAgICB9O1xuXG4gICAgdGhpei51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lKSB7XG4gICAgICAkc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTtcbiAgICAgIHZhciBpZHggPSAkbGlzdGVuZXJzLmluZGV4T2Yoc3Vic2NyaXB0aW9uTmFtZSk7XG4gICAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICAgICRsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXouY29ubmVjdCgpO1xuICB9O1xuXG4gIC8vIEFzaWduYSBsYSBVUkwgZGUgc2Vydmlkb3IgcG9yIGRlZmVjdG9cbiAgaWRiU29ja2V0LnNldFVybFNlcnZlciA9IGZ1bmN0aW9uICh1cmxTZXJ2ZXIpIHtcbiAgICAkZGVmVXJsU2VydmVyID0gdXJsU2VydmVyO1xuICB9O1xuXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXG4gIGlkYlNvY2tldC5zZXRDcmVkZW50aWFscyA9IGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XG4gICAgYWNjZXNzVG9rZW5JZCA9ICRhY2Nlc3NUb2tlbklkO1xuICAgIGN1cnJlbnRVc2VySWQgPSAkY3VycmVudFVzZXJJZDtcbiAgfTtcblxuICByZXR1cm4gaWRiU29ja2V0O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYlNvY2tldC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=