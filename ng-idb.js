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
	
	var _idbQuery = __webpack_require__(6);
	
	var _idbQuery2 = _interopRequireDefault(_idbQuery);
	
	var _idbSocket = __webpack_require__(7);
	
	var _idbSocket2 = _interopRequireDefault(_idbSocket);
	
	var _lb = __webpack_require__(8);
	
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
	
	      // indexedDB.deleteDatabase($dbName).onsuccess = ready;
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
	    thiz.put = function (modelName, instance, cb) {
	      idbUtils.validate(arguments, ['string', ['object', 'function'], ['function', 'undefined']]);
	
	      var defered = qs.defer(cb);
	
	      // Se crea una transaccion
	      thiz.transaction(modelName, 'readwrite', function (tx) {
	        var rq = tx.objectStore(modelName).put({
	          values: instance.values()
	        });
	
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
	          var record = Model.getInstanceFromObject(cursor.value.values);
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
	    var $instances = {};
	    var $fields = {};
	    var $remote = null;
	
	    // Constuctor del modelo
	    function Model(data) {
	      idbUtils.validate(arguments, [['object', 'undefined']]);
	
	      this.$record = null;
	      this.$originalValues = {};
	
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
	        return Model.getInstanceFromObject(data, null).save(cb);
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
	      idbUtils.validate(arguments, [['string', 'number', 'undefined'], ['object', 'undefined']]);
	
	      // El objeto no tiene ID
	      if (!key) {
	        return new Model(data);
	      }
	
	      // No existe la instancia entonce se crea
	      if (!$instances[key]) {
	        $instances[key] = new Model(data);
	      }
	
	      return $instances[key];
	    };
	
	    // Crea una instancia del modelo a partir de un object
	    Model.getInstanceFromObject = function (data) {
	      idbUtils.validate(arguments, ['object']);
	
	      return Model.getInstance(Model.getKeyFrom(data), data);
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
	      idbUtils.validate(arguments, ['object', 'boolean']);
	
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
	
	    // Asigna el ID del objeto
	    Model.prototype.setKey = function (newKey) {
	      var thiz = this;
	
	      var oldKey = Model.getKeyFrom(thiz);
	
	      Model.searchDeepField(thiz, $id.keyPath, function (obj, lastField) {
	        obj[lastField] = newKey;
	      });
	
	      if (oldKey !== newKey) {
	
	        if (oldKey && $instances[oldKey] && $instances[oldKey] != thiz) {
	          throw new Error('Model.InstanceOfOldKeyIsNotSame');
	        }
	        if (newKey && $instances[newKey] && $instances[newKey] != thiz) {
	          throw new Error('Model.InstanceOfNewKeyIsNotSame');
	        }
	
	        // Eliminar anterior
	        if (oldKey && $instances[oldKey]) {
	          delete $instances[oldKey];
	        }
	
	        // Agregar nueva
	        if (newKey && !$instances[newKey]) {
	          $instances[newKey] = thiz;
	        }
	      }
	
	      return thiz;
	    };
	
	    // Asigna in valor a un campo
	    Model.prototype.set = function (field, value, original) {
	      var thiz = this;
	      idbUtils.validate(arguments, ['string', null, 'boolean']);
	
	      if (field === $id.keyPath) {
	        thiz.setKey(value);
	      } else {
	        Model.searchDeepField(thiz, field, function (obj, lastField) {
	          obj[lastField] = value;
	        });
	      }
	
	      if (original) {
	        Model.searchDeepField(thiz.$originalValues, field, function (obj, lastField) {
	          obj[lastField] = value;
	        });
	      }
	
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
	
	    // Devuelve si el objeto está almacenado
	    Model.prototype.isStored = function () {
	
	      return $instances[this.get($id.keyPath)] === this;
	    };
	
	    // Guarda los datos del objeto
	    Model.prototype.save = function (cb) {
	      var thiz = this;
	      idbUtils.validate(arguments, ['function', 'undefined']);
	
	      return $db.put($modelName, this, function (err, event) {
	        if (err) {
	          if (cb) cb(err);return;
	        };
	
	        // Asignar el generado al modelo
	        var key = event.target.result;
	        thiz.setKey(key);
	        thiz.$isNew = false;
	
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
	        thiz.setAttributes(data || {}, true);
	        $timeout(function () {
	          thiz.save();
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
/* 7 */
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

/***/ },
/* 8 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTNhZjVhNmU1YzFmNDcxNzc5N2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiVXRpbHMuanM/MWJiNCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJFdmVudHMuanM/NDg2YSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3FzLmpzPzY0MzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiLmpzPzYzNTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qcz9mOWY5Iiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanM/Zjc3YSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJTb2NrZXQuanM/ZDFhMSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvbGIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2xiLmpzPzMwMDYiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnN0YW50IiwiaW8iLCJzZXJ2aWNlIiwiaWRiVXRpbHMiLCIkcSIsImlzQ2FsbGJhY2siLCJjYiIsInVuZGVmaW5lZCIsIm11c3RCZUNhbGxiYWNrIiwiZXJyIiwiRXJyb3IiLCJuYW1lIiwibXVzdEJlIiwidmFsdWUiLCJ0eXBlcyIsImkiLCJqb2luIiwidmFsaWRhdGUiLCJhcmdzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJpZGJFdmVudHMiLCJEQl9FUlJPUiIsInFzIiwicXNDbGFzcyIsInRoaXoiLCJ0aGVucyIsInRoZW5zUmVhZHkiLCJjYXRjaHMiLCJjYXRjaHNSZWFkeSIsInJlc3VsdEFyZ3MiLCJlcnJvciIsInByb21pc2UiLCIkcmVzb2x2ZWQiLCJ0aGVuc1Jlc29sdmVkIiwibGVuZ3RoIiwic2hpZnQiLCJhcHBseSIsInB1c2giLCJjYXRjaHNSZXNvbHZlZCIsInJlc29sdmUiLCJhcmd1bWVudHMiLCJyZWplY3QiLCJ0aGVuIiwiY2F0Y2giLCJkb25lIiwiY29uY2F0IiwiZGVmZXIiLCJpZGJTZXJ2aWNlIiwiJGxvZyIsImlkYk1vZGVsIiwiaWRiUXVlcnkiLCJpZGJTb2NrZXQiLCJsYkF1dGgiLCJpbmRleGVkREIiLCJ3aW5kb3ciLCJtb3pJbmRleGVkREIiLCJ3ZWJraXRJbmRleGVkREIiLCJtc0luZGV4ZWREQiIsIklEQlRyYW5zYWN0aW9uIiwid2Via2l0SURCVHJhbnNhY3Rpb24iLCJtc0lEQlRyYW5zYWN0aW9uIiwiSURCS2V5UmFuZ2UiLCJ3ZWJraXRJREJLZXlSYW5nZSIsIm1zSURCS2V5UmFuZ2UiLCJhbGVydCIsImlkYiIsIiRkYk5hbWUiLCIkZGJWZXJzaW9uIiwiJHNvY2tldCIsIiRldmVudHNDYWxsYmFja3MiLCIkdXBncmFkZU5lZWRlZERlZmVyZWQiLCIkb3BlbkRlZmVyZWQiLCIkc29ja2V0Q29ubmVjdGVkRGVmZXJlZCIsIiRvcGVuZWQiLCIkcmVxdWVzdCIsIm1vZGVscyIsImJpbmQiLCJldmVudE5hbWUiLCJ1bmJpbmQiLCJpZHgiLCJpbmRleE9mIiwic3BsaWNlIiwidHJpZ2dlciIsImxvZyIsIm9wZW4iLCJyZWFkeSIsInJxIiwib251cGdyYWRlbmVlZGVkIiwiZXZlbnQiLCJvbnN1Y2Nlc3MiLCJvbmVycm9yIiwidGFyZ2V0IiwiZXJyb3JDb2RlIiwibW9kZWwiLCJzb2NrZXQiLCJxdWVyeSIsIk1vZGVsIiwiZmlsdGVycyIsImNyZWF0ZVN0b3JlIiwibW9kZWxOYW1lIiwibW9kZWxJZCIsInJlc3VsdCIsImNyZWF0ZU9iamVjdFN0b3JlIiwiY3JlYXRlSW5kZXgiLCJpbmRleE5hbWUiLCJmaWVsZE5hbWUiLCJvcHRzIiwic3RvcmUiLCJ0cmFuc2FjdGlvbiIsIm9iamVjdFN0b3JlIiwicGVybXMiLCJhY3Rpb24iLCJkZWZlcmVkIiwidHgiLCJvbmNvbXBsZXRlIiwib25hYm9ydCIsInB1dCIsImluc3RhbmNlIiwidmFsdWVzIiwiJHByb21pc2UiLCJnZXQiLCJrZXkiLCJkYXRhIiwic2VhcmNoRGVlcEZpZWxkIiwiZ2V0S2V5UGF0aCIsIm9iaiIsImxhc3RGaWVsZCIsImdldE1vZGVsTmFtZSIsImdldEluc3RhbmNlIiwic2V0QXR0cmlidXRlcyIsIiRpc05ldyIsImZpbmQiLCJvcGVuQ3Vyc29yIiwiY3Vyc29yIiwicmVjb3JkIiwiZ2V0SW5zdGFuY2VGcm9tT2JqZWN0IiwiY29udGludWUiLCJkZWZlcmVkcyIsIk9iamVjdCIsImtleXMiLCJvbk9wZW4iLCJvblVwZ3JhZGVOZWVkZWQiLCJvblNvY2tldENvbm5lY3RlZCIsIm1hcCIsInRleHQiLCJpZGJNb2RlbFNlcnZpY2UiLCJsYlJlc291cmNlIiwiJHRpbWVvdXQiLCIkZGIiLCIkbW9kZWxOYW1lIiwiJGlkIiwia2V5UGF0aCIsImF1dG9JbmNyZW1lbnQiLCIkaW5zdGFuY2VzIiwiJGZpZWxkcyIsIiRyZW1vdGUiLCIkcmVjb3JkIiwiJG9yaWdpbmFsVmFsdWVzIiwiY29uc3RydWN0b3IiLCJsaXN0ZW4iLCJpbmRleCIsImJ1aWxkIiwiYnVpbGRDYWxsYmFjayIsImZpZWxkcyIsImZpZWxkIiwicmVtb3RlIiwidXJsIiwiYWN0aW9ucyIsImNyZWF0ZSIsInNhdmUiLCJhcnIiLCJpdGVyYXRpb24iLCJzcGxpdCIsInBvcCIsIl9zZXQiLCJnZXRLZXlGcm9tIiwib3JpZ2luYWwiLCJwcm9wZXJ0eSIsInNldCIsInNldEtleSIsIm5ld0tleSIsIm9sZEtleSIsImlzU3RvcmVkIiwic3Vic2NyaWJlIiwicmVzb3VyY2UiLCIkTW9kZWwiLCIkZmlsdGVycyIsIiRyZXN1bHQiLCJnZXRSZXN1bHQiLCJpZGJTb2NrZXRTZXJ2aWNlIiwiJGRlZlVybFNlcnZlciIsIiR1cmxTZXJ2ZXIiLCIkYWNjZXNzVG9rZW5JZCIsIiRjdXJyZW50VXNlcklkIiwiJGxpc3RlbmVycyIsImNvbm5lY3QiLCJvbiIsImVtaXQiLCJpZCIsInVzZXJJZCIsIm9wdGlvbnMiLCJwdXNoTGlzdGVuZXIiLCJzdWJzY3JpcHRpb25OYW1lIiwidW5zdWJzY3JpYmUiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJzZXRVcmxTZXJ2ZXIiLCJ1cmxTZXJ2ZXIiLCJzZXRDcmVkZW50aWFscyIsImFjY2Vzc1Rva2VuSWQiLCJjdXJyZW50VXNlcklkIiwibGIiLCJnZXRIb3N0IiwibSIsIm1hdGNoIiwidXJsQmFzZUhvc3QiLCJsb2NhdGlvbiIsImhvc3QiLCJwcm9wcyIsInByb3BzUHJlZml4Iiwic3RvcmFnZSIsImNvbnNvbGUiLCJsb2FkIiwibG9jYWxTdG9yYWdlIiwic2Vzc2lvblN0b3JhZ2UiLCJmb3JFYWNoIiwiY3VycmVudFVzZXJEYXRhIiwicmVtZW1iZXJNZSIsInNldFVzZXIiLCJ1c2VyRGF0YSIsImNsZWFyVXNlciIsImNsZWFyU3RvcmFnZSIsImxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciIsInJlcXVlc3QiLCJjb25maWciLCJoZWFkZXJzIiwiYXV0aEhlYWRlciIsIl9faXNHZXRDdXJyZW50VXNlcl9fIiwicmVzIiwiYm9keSIsInN0YXR1cyIsIndoZW4iLCJ1cmxCYXNlIiwic2V0QXV0aEhlYWRlciIsImhlYWRlciIsImdldEF1dGhIZWFkZXIiLCJzZXRVcmxCYXNlIiwiZ2V0VXJsQmFzZSIsIiRnZXQiLCIkcmVzb3VyY2UiLCJwYXJhbXMiLCJvcmlnaW5hbFVybCIsIiRzYXZlIiwic3VjY2VzcyIsInVwc2VydCIsImZhY3RvcnkiLCJwcm92aWRlciIsIiRodHRwUHJvdmlkZXIiLCJpbnRlcmNlcHRvcnMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBOztBQ0VBLEtBQUksYUFBYSx1QkFBdUI7O0FERHhDOztBQ0tBLEtBQUksY0FBYyx1QkFBdUI7O0FESnpDOztBQ1FBLEtBQUksT0FBTyx1QkFBdUI7O0FETmxDOztBQ1VBLEtBQUksUUFBUSx1QkFBdUI7O0FEVG5DOztBQ2FBLEtBQUksYUFBYSx1QkFBdUI7O0FEWnhDOztBQ2dCQSxLQUFJLGFBQWEsdUJBQXVCOztBRGZ4Qzs7QUNtQkEsS0FBSSxjQUFjLHVCQUF1Qjs7QURqQnpDOztBQ3FCQSxLQUFJLE9BQU8sdUJBQXVCOztBQUVsQyxVQUFTLHVCQUF1QixLQUFLLEVBQUUsT0FBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsU0FBUzs7QURyQnZGLG1CQUFHQSxRQUFRQyxPQUFPLFVBQVUsS0FDekJDLFNBQVMsTUFBTUMsSUFFZkQsU0FBUyxjQUFjLFNBQ3ZCRSxRQUFRLGFBSlgscUJBS0dBLFFBQVEsWUFMWCxvQkFNR0EsUUFBUSxNQU5YOzs7RUFTR0EsUUFBUSxPQVRYLGVBVUdBLFFBQVEsWUFWWCxvQkFXR0EsUUFBUSxZQVhYLG9CQVlHQSxRQUFRLGFBWlgscUI7Ozs7OztBRWJBOzs7QUNFQSxRQUFPLGVBQWUsU0FBUyxjQUFjO0dBQzNDLE9BQU87OztBQUdULEtBQUksVUFBVSxPQUFPLFdBQVcsY0FBYyxPQUFPLE9BQU8sYUFBYSxXQUFXLFVBQVUsS0FBSyxFQUFFLE9BQU8sT0FBTyxTQUFTLFVBQVUsS0FBSyxFQUFFLE9BQU8sT0FBTyxPQUFPLFdBQVcsY0FBYyxJQUFJLGdCQUFnQixVQUFVLFFBQVEsT0FBTyxZQUFZLFdBQVcsT0FBTzs7QUFFdFEsU0FBUSxVRE5nQkM7QUFBVCxVQUFTQSxTQUFVQyxJQUFJO0dBQUU7Ozs7R0FHdEMsU0FBU0MsV0FBWUMsSUFBSTs7S0FFdkIsT0FBTyxPQUFPQSxNQUFNLGNBQWNBLE1BQU0sUUFBUUEsTUFBTUM7Ozs7R0FLeEQsU0FBU0MsZUFBZ0JGLElBQUk7S0FDM0IsSUFBSUQsV0FBV0MsS0FBSzs7S0FFcEIsSUFBSUcsTUFBTSxJQUFJQyxNQUFNO0tBQ3BCRCxJQUFJRSxPQUFPOztLQUVYLE1BQU1GOzs7O0dBS1IsU0FBU0csT0FBUUMsT0FBT0MsT0FBTztLQUM3QixJQUFJLE9BQU9BLFNBQVMsVUFBVUEsUUFBUSxDQUFDQTtLQUN2QyxLQUFJLElBQUlDLEtBQUtELE9BQU07T0FDakIsSUFBSSxRQUFPRCxVQUFQLG9DQUFPQSxXQUFTQyxNQUFNQyxJQUFJOztLQUVoQyxJQUFJTixNQUFNLElBQUlDLE1BQU0sb0JBQWtCRyxRQUFNLGNBQVlDLE1BQU1FLEtBQUs7S0FDbkVQLElBQUlFLE9BQU87S0FDWCxNQUFNRjs7OztHQUtSLFNBQVNRLFNBQVVDLE1BQU1KLE9BQU87O0tBRTlCSSxPQUFPQyxNQUFNQyxVQUFVQyxNQUFNQyxLQUFLSjtLQUNsQyxJQUFJLE9BQU9KLFNBQVMsVUFBVUEsUUFBUSxDQUFDQTtLQUN2QyxLQUFLLElBQUlDLEtBQUtHLE1BQUs7T0FDakIsSUFBSUosTUFBTUMsSUFBRztTQUNYLElBQUlELE1BQU1DLE1BQU0sTUFBSztXQUNuQjs7U0FFRixJQUFJLE9BQU9ELE1BQU1DLE1BQU0sWUFBWSxRQUFPRCxNQUFNQyxPQUFNLFVBQVM7V0FDN0RILE9BQU9NLEtBQUtILElBQUlELE1BQU1DO1dBQ3RCOztTQUVGLElBQUksT0FBT0QsTUFBTUMsTUFBTSxZQUFXO1dBQ2hDLElBQUdELE1BQU1DLEdBQUdHLEtBQUtILEtBQ2Y7OztTQUdKLElBQUlOLE1BQU0sSUFBSUMsTUFBTSwyQkFBeUJRLEtBQUtILEtBQUcsY0FBWUQsTUFBTUM7U0FDdkVOLElBQUlFLE9BQU87U0FDWCxNQUFNRjs7Ozs7R0FPWixPQUFPO0tBQ0xKLFlBQVlBO0tBQ1pHLGdCQUFnQkE7S0FDaEJJLFFBQVFBO0tBQ1JLLFVBQVVBOzs7Ozs7OztBRWxFZDs7OztBQ0lBLFFBQU8sZUFBZSxTQUFTLGNBQWM7R0FDM0MsT0FBTzs7QUFFVCxTQUFRLFVESmdCTTtBQUFULFVBQVNBLFlBQVk7R0FDbEMsT0FBTztLQUNMQyxVQUFVOztFQUViLEM7Ozs7OztBRVBEOztBQ0VBLFFBQU8sZUFBZSxTQUFTLGNBQWM7R0FDM0MsT0FBTzs7QUFFVCxTQUFRLFVESGdCQztBQUFULFVBQVNBLEtBQU07R0FBRTs7R0FFOUIsU0FBU0MsUUFBU3BCLElBQUk7S0FBRSxJQUFNcUIsT0FBTzs7S0FFbkMsSUFBSUMsUUFBUTtLQUNaLElBQUlDLGFBQWE7S0FDakIsSUFBSUMsU0FBUztLQUNiLElBQUlDLGNBQWM7S0FDbEIsSUFBSUMsYUFBYTtLQUNqQixJQUFJQyxRQUFROztLQUVaTixLQUFLTyxVQUFVO0tBQ2ZQLEtBQUtRLFlBQVk7O0tBRWpCLFNBQVNDLGdCQUFpQjtPQUN4QixJQUFJLENBQUNSLE1BQU1TLFFBQVE7T0FDbkIsSUFBSS9CLEtBQUtzQixNQUFNVTtPQUNmaEMsR0FBR2lDLE1BQU0sTUFBTVosS0FBS0s7T0FDcEJILFdBQVdXLEtBQUtsQztPQUNoQjhCOzs7S0FHRixTQUFTSyxpQkFBa0I7T0FDekIsSUFBSSxDQUFDWCxPQUFPTyxRQUFRO09BQ3BCLElBQUkvQixLQUFLd0IsT0FBT1E7T0FDaEJoQyxHQUFHaUMsTUFBTSxNQUFNWixLQUFLTTtPQUNwQkYsWUFBWVMsS0FBS2xDO09BQ2pCbUM7OztLQUdGZCxLQUFLZSxVQUFVLFlBQVk7T0FDekIsSUFBSWYsS0FBS1EsV0FBVztPQUNwQlIsS0FBS1EsWUFBWTtPQUNqQlIsS0FBS0ssYUFBYWIsTUFBTUMsVUFBVUMsTUFBTUMsS0FBS3FCO09BQzdDUDs7O0tBR0ZULEtBQUtpQixTQUFTLFVBQVVuQyxLQUFLO09BQzNCLElBQUlrQixLQUFLUSxXQUFXO09BQ3BCUixLQUFLUSxZQUFZO09BQ2pCUixLQUFLTSxRQUFReEIsT0FBTztPQUNwQmdDOzs7S0FHRmQsS0FBS08sUUFBUVcsT0FBTyxVQUFVdkMsSUFBSTtPQUNoQ3NCLE1BQU1ZLEtBQUtsQztPQUNYLElBQUlxQixLQUFLUSxhQUFhLENBQUNSLEtBQUtNLE9BQU87U0FDakNHOztPQUVGLE9BQU9UOzs7S0FHVEEsS0FBS08sUUFBUVksUUFBUSxVQUFVeEMsSUFBSTtPQUNqQ3dCLE9BQU9VLEtBQUtsQztPQUNaLElBQUlxQixLQUFLUSxhQUFhUixLQUFLTSxPQUFPO1NBQ2hDUTs7T0FFRixPQUFPZDs7O0tBR1RBLEtBQUtPLFFBQVFhLE9BQU8sVUFBVXpDLElBQUk7O09BRWhDc0IsTUFBTVksS0FBSyxZQUFZO1NBQ3JCbEMsR0FBR2lDLE1BQU0sTUFBTSxDQUFDLE1BQU1TLE9BQU9yQixLQUFLSzs7O09BR3BDRixPQUFPVSxLQUFLLFlBQVk7U0FDdEJsQyxHQUFHaUMsTUFBTSxNQUFNWixLQUFLTTs7O09BR3RCLElBQUlOLEtBQUtRLFdBQVc7U0FDbEIsSUFBSSxDQUFDUixLQUFLTSxPQUFPO1dBQ2ZHO2dCQUNJO1dBQ0pLOzs7O09BSUosT0FBT2Q7OztLQUlULElBQUdyQixJQUFJcUIsS0FBS08sUUFBUWEsS0FBS3pDO0lBRTFCOzs7R0FHRG9CLFFBQVF1QixRQUFRLFVBQVUzQyxJQUFJO0tBQzVCLE9BQU8sSUFBSW9CLFFBQVFwQjs7O0dBR3JCLE9BQU9vQjs7Ozs7OztBRTdGVDs7Ozs7QUNJQSxRQUFPLGVBQWUsU0FBUyxjQUFjO0dBQzNDLE9BQU87O0FBRVQsU0FBUSxVREpnQndCO0FBQVQsVUFBU0EsV0FBWUMsTUFBTTFCLElBQUl0QixVQUFVb0IsV0FBVzZCLFVBQVVDLFVBQVVDLFdBQVdDLFFBQVE7R0FBRTs7OztHQUcxRyxJQUFNQyxZQUFZQyxPQUFPRCxhQUFhQyxPQUFPQyxnQkFBZ0JELE9BQU9FLG1CQUFtQkYsT0FBT0c7OztHQUc5RixJQUFNQyxpQkFBaUJKLE9BQU9JLGtCQUFrQkosT0FBT0ssd0JBQXdCTCxPQUFPTTtHQUN0RixJQUFNQyxjQUFjUCxPQUFPTyxlQUFlUCxPQUFPUSxxQkFBcUJSLE9BQU9TOzs7R0FHN0UsSUFBSSxDQUFDVixXQUFXO0tBQ2RXLE1BQU07S0FDTjs7OztHQUlGLFNBQVNDLElBQUlDLFNBQVNDLFlBQVlDLFNBQVM7S0FBRSxJQUFNNUMsT0FBTztLQUN4RHhCLFNBQVNjLFNBQVMwQixXQUFXLENBQUMsVUFBVSxVQUFVLENBQUMsVUFBVSxjQUFjLENBQUMsVUFBVTs7O0tBR3RGLElBQU02QixtQkFBbUI7S0FDekIsSUFBTUMsd0JBQXdCaEQsR0FBR3dCO0tBQ2pDLElBQU15QixlQUFlakQsR0FBR3dCO0tBQ3hCLElBQU0wQiwwQkFBMEJsRCxHQUFHd0I7S0FDbkMsSUFBSTJCLFVBQVU7OztLQUdkLElBQUlDLFdBQVc7S0FDZmxELEtBQUttRCxTQUFTOzs7S0FHZG5ELEtBQUtvRCxPQUFPLFVBQVVDLFdBQVcxRSxJQUFJO09BQ25DSCxTQUFTYyxTQUFTMEIsV0FBVyxDQUFDLFVBQVU7O09BRXhDLElBQUksQ0FBQzZCLGlCQUFpQlEsWUFBVztTQUMvQlIsaUJBQWlCUSxhQUFhOzs7T0FHaENSLGlCQUFpQlEsV0FBV3hDLEtBQUtsQzs7OztLQUtuQ3FCLEtBQUtzRCxTQUFTLFVBQVVELFdBQVcxRSxJQUFJO09BQ3JDSCxTQUFTYyxTQUFTMEIsV0FBVyxDQUFDLFVBQVU7O09BRXhDLElBQUksQ0FBQzZCLGlCQUFpQlEsWUFBWTs7O09BR2xDLElBQU1FLE1BQU1WLGlCQUFpQlEsV0FBV0csUUFBUTdFOzs7T0FHaEQsSUFBSTRFLE9BQU8sQ0FBQyxHQUFFO1NBQ1pWLGlCQUFpQlEsV0FBV0ksT0FBT0YsS0FBSzs7Ozs7S0FNNUN2RCxLQUFLMEQsVUFBVSxVQUFVTCxXQUFXOUQsTUFBTTtPQUN4Q2YsU0FBU2MsU0FBUzBCLFdBQVcsQ0FBQyxVQUFVOztPQUV4Q1EsS0FBS21DLElBQUlqQixVQUFRLFFBQU1DLGNBQVksS0FBRyxPQUFLVTs7T0FFM0MsS0FBSSxJQUFJakUsS0FBS3lELGlCQUFpQlEsWUFBVztTQUN2Q1IsaUJBQWlCUSxXQUFXakUsR0FBR3dCLE1BQU1aLE1BQU1UOzs7OztLQU0vQ1MsS0FBS00sUUFBUSxVQUFVM0IsSUFBSTtPQUN6QnFCLEtBQUtvRCxLQUFLeEQsVUFBVUMsVUFBVWxCO09BQzlCLE9BQU9xQjs7OztLQUlUQSxLQUFLNEQsT0FBTyxZQUFZO09BQ3RCLElBQUlYLFNBQVMsT0FBT0Y7OztPQUdwQkUsVUFBVTs7O09BR1YsU0FBU1ksUUFBUTs7U0FFZixJQUFNQyxLQUFLakMsVUFBVStCLEtBQUtsQixTQUFTQzs7U0FFbkNtQixHQUFHQyxrQkFBa0IsVUFBVUMsT0FBTzs7V0FFcENsQixzQkFBc0IvQixRQUFRaUQsT0FBT0Y7Ozs7U0FLdkNBLEdBQUdHLFlBQVksVUFBVUQsT0FBTzs7V0FFOUJkLFdBQVdZOzs7V0FHWEEsR0FBR0ksVUFBVSxVQUFVRixPQUFPO2FBQzVCeEMsS0FBS2xCLE1BQU0scUJBQW9CMEQsTUFBTUcsT0FBT0M7YUFDNUNwRSxLQUFLMEQsUUFBUTlELFVBQVVDLFVBQVUsQ0FBQ21FOzs7V0FHcENqQixhQUFhaEMsUUFBUWlELE9BQU9GOzs7OztTQU05QkEsR0FBR0ksVUFBVSxVQUFVRixPQUFPO1dBQzVCakIsYUFBYTlCLE9BQU82QyxHQUFHTTs7UUFHMUI7OztPQUdEUDs7T0FFQSxPQUFPZDs7OztLQUtUL0MsS0FBS3FFLFFBQVEsVUFBVXJGLE1BQU1zRixRQUFRO09BQ25DOUYsU0FBU2MsU0FBUzBCLFdBQVcsQ0FBQzs7O09BRzlCLElBQUlxRCxRQUFRckUsS0FBS21ELE9BQU9uRTs7O09BR3hCLElBQUcsQ0FBQ3FGLE9BQU07U0FDUkEsUUFBUTVDLFNBQVN6QixNQUFNaEIsTUFBTXNGLFVBQVUxQjs7OztPQUl6QzVDLEtBQUttRCxPQUFPbkUsUUFBUXFGOzs7T0FHcEIsT0FBT0E7Ozs7S0FLVHJFLEtBQUt1RSxRQUFRLFVBQVVDLE9BQU9DLFNBQVM7O09BRXJDLE9BQU8sSUFBSS9DLFNBQVMxQixNQUFNd0UsT0FBT0M7Ozs7S0FLbkN6RSxLQUFLMEUsY0FBYyxVQUFVQyxXQUFXQyxTQUFTO09BQy9DcEcsU0FBU2MsU0FBUzBCLFdBQVcsQ0FBQyxVQUFVLENBQUMsVUFBVTs7T0FFbkQ4QixzQkFBc0J2QyxRQUFRVyxLQUFLLFVBQVU4QyxPQUFPRixJQUFJO1NBQ3REQSxHQUFHZSxPQUFPQyxrQkFBa0JILFdBQVdDOzs7OztLQU0zQzVFLEtBQUsrRSxjQUFjLFVBQVVKLFdBQVdLLFdBQVdDLFdBQVdDLE1BQU07T0FDbEUxRyxTQUFTYyxTQUFTMEIsV0FBVyxDQUFDLFVBQVUsVUFBVSxVQUFVLENBQUMsVUFBVTs7T0FFdkU4QixzQkFBc0J2QyxRQUFRVyxLQUFLLFVBQVU4QyxPQUFPRixJQUFJO1NBQ3RELElBQU1xQixRQUFRckIsR0FBR3NCLFlBQVlDLFlBQVlWO1NBQ3pDUSxNQUFNSixZQUFZQyxXQUFXQyxXQUFXQzs7Ozs7S0FNNUNsRixLQUFLb0YsY0FBYyxVQUFTVCxXQUFXVyxPQUFPQyxRQUFRNUcsSUFBSTtPQUN4REgsU0FBU2MsU0FBUzBCLFdBQVcsQ0FBQyxVQUFVLFVBQVUsWUFBWSxDQUFDLFlBQVk7O09BRTNFLElBQU13RSxVQUFVMUYsR0FBR3dCLE1BQU0zQzs7O09BR3pCb0UsYUFBYXhDLFFBQVFXLEtBQUssVUFBVThDLE9BQU9GLElBQUk7U0FDN0MsSUFBTTJCLEtBQUszQixHQUFHZSxPQUFPTyxZQUFZVCxXQUFXVztTQUM1QyxJQUFNVCxTQUFTVSxPQUFPRTs7O1NBR3RCQSxHQUFHQyxhQUFhLFVBQVUxQixPQUFPO1dBQy9Cd0IsUUFBUXpFLFFBQVFpRCxPQUFPYTs7OztTQUl6QlksR0FBR0UsVUFBVSxZQUFZO1dBQ3ZCSCxRQUFRdkUsT0FBT3dFLEdBQUduRjs7OztPQUt0QixPQUFPa0Y7Ozs7S0FLVHhGLEtBQUs0RixNQUFNLFVBQVVqQixXQUFXa0IsVUFBVWxILElBQUk7T0FDNUNILFNBQVNjLFNBQVMwQixXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsYUFBYSxDQUFDLFlBQVk7O09BRTdFLElBQU13RSxVQUFVMUYsR0FBR3dCLE1BQU0zQzs7O09BR3pCcUIsS0FBS29GLFlBQVlULFdBQVcsYUFBYSxVQUFVYyxJQUFJO1NBQ3JELElBQU0zQixLQUFLMkIsR0FBR0osWUFBWVYsV0FBV2lCLElBQUk7V0FDdkNFLFFBQVFELFNBQVNDOzs7O1NBSW5CaEMsR0FBR0csWUFBYSxVQUFVRCxPQUFPO1dBQy9Cd0IsUUFBUXpFLFFBQVFpRCxPQUFPNkI7Ozs7U0FJekIvQixHQUFHSSxVQUFXLFlBQVk7O1dBRXhCc0IsUUFBUXZFLE9BQU82Qzs7OztPQUtuQixPQUFPMEIsUUFBUU87Ozs7S0FLakIvRixLQUFLZ0csTUFBTSxVQUFVeEIsT0FBT3lCLEtBQUt0SCxJQUFJO09BQ25DSCxTQUFTYyxTQUFTMEIsV0FBVyxDQUFDLFlBQVksVUFBVSxNQUFNLENBQUMsWUFBWTs7T0FFdkUsSUFBTWtGLE9BQU87T0FDYjFCLE1BQU0yQixnQkFBZ0IsSUFBSTNCLE1BQU00QixjQUFjLFVBQVVDLEtBQUtDLFdBQVc7U0FDdEVELElBQUlDLGFBQWFMOzs7T0FHbkIsSUFBTXRCLFlBQVlILE1BQU0rQjtPQUN4QixJQUFNZixVQUFVMUYsR0FBR3dCLE1BQU0zQztPQUN6QixJQUFNa0gsV0FBV3JCLE1BQU1nQyxZQUFZUCxLQUFLQzs7T0FFeENMLFNBQVNFLFdBQVdQLFFBQVFqRjtPQUM1QnNGLFNBQVNyRixZQUFZOztPQUVyQlIsS0FBS29GLFlBQVlULFdBQVcsWUFBWSxVQUFVYyxJQUFJO1NBQ3BELElBQU1OLFFBQVFNLEdBQUdKLFlBQVlWO1NBQzdCLElBQU1iLEtBQUtxQixNQUFNYSxJQUFJQzs7U0FFckJuQyxHQUFHRyxZQUFZLFlBQVc7V0FDeEIsSUFBSUgsR0FBR2UsVUFBVWpHLFdBQVU7YUFDekJpSCxTQUFTWSxjQUFjM0MsR0FBR2UsUUFBUTthQUNsQ2dCLFNBQVNhLFNBQVM7O1dBRXBCYixTQUFTckYsWUFBWTtXQUNyQmdGLFFBQVF6RSxRQUFROEU7OztTQUdsQi9CLEdBQUdJLFVBQVUsWUFBWTtXQUN2QnNCLFFBQVF2RSxPQUFPNEU7Ozs7T0FLbkIsT0FBT0E7Ozs7S0FLVDdGLEtBQUsyRyxPQUFPLFVBQVVuQyxPQUFPQyxTQUFTOUYsSUFBSTtPQUN4Q0gsU0FBU2MsU0FBUzBCLFdBQVcsQ0FBQyxZQUFZLENBQUMsVUFBVSxjQUFjLENBQUMsWUFBWTtPQUNoRixJQUFNMkQsWUFBWUgsTUFBTStCO09BQ3hCLElBQU1mLFVBQVUxRixHQUFHd0IsTUFBTTNDO09BQ3pCLElBQU1rRyxTQUFTOztPQUVmQSxPQUFPa0IsV0FBV1AsUUFBUWpGO09BQzFCc0UsT0FBT3JFLFlBQVk7OztPQUduQlIsS0FBS29GLFlBQVlULFdBQVcsWUFBWSxVQUFVYyxJQUFJO1NBQ3BELElBQU1OLFFBQVFNLEdBQUdKLFlBQVlWO1NBQzdCLElBQU1iLEtBQUtxQixNQUFNeUI7O1NBRWpCOUMsR0FBR0csWUFBWSxZQUFXO1dBQ3hCLElBQU00QyxTQUFTL0MsR0FBR2U7OztXQUdsQixJQUFJLENBQUNnQyxRQUFPO2FBQ1ZoQyxPQUFPckUsWUFBWTthQUNuQixPQUFPZ0YsUUFBUXpFLFFBQVE4RDs7OztXQUl6QixJQUFNaUMsU0FBU3RDLE1BQU11QyxzQkFBc0JGLE9BQU8zSCxNQUFNNEc7V0FDeERnQixPQUFPSixTQUFTOzs7V0FHaEI3QixPQUFPaEUsS0FBS2lHOzs7V0FHWkQsT0FBT0c7Ozs7T0FNWCxPQUFPbkM7Ozs7S0FLVCxJQUFJb0M7S0FDSkMsT0FBT0MsS0FBS0YsV0FBVztPQUNyQkcsUUFBUXJFO09BQ1JzRSxpQkFBaUJ2RTtPQUNqQndFLG1CQUFtQnRFO1FBQ2xCdUUsSUFBSSxVQUFVdEIsS0FBSztPQUNwQmdCLFNBQVNoQixLQUFLMUYsUUFBUWEsS0FBSyxVQUFVdEMsS0FBSztTQUN4QyxJQUFNMEksT0FBTzlFLFVBQVEsUUFBTUMsY0FBWSxLQUFHLE9BQUtzRDtTQUMvQyxJQUFJbkgsS0FBSTtXQUNOMEMsS0FBS2xCLE1BQU1rSCxNQUFNMUk7Z0JBQ1o7V0FDTDBDLEtBQUttQyxJQUFJNkQ7OztPQUdieEgsS0FBS2lHLE9BQU8sVUFBVXRILElBQUk7U0FDeEJILFNBQVNjLFNBQVMwQixXQUFXLENBQUM7U0FDOUJpRyxTQUFTaEIsS0FBSzFGLFFBQVFhLEtBQUt6QztTQUMzQixPQUFPcUI7OztJQUlaOztHQUVELE9BQU95Qzs7Ozs7OztBRWhWVDs7Ozs7QUNJQSxRQUFPLGVBQWUsU0FBUyxjQUFjO0dBQzNDLE9BQU87O0FBRVQsU0FBUSxVREpnQmdGO0FBQVQsVUFBU0EsZ0JBQWlCakcsTUFBTTFCLElBQUl0QixVQUFVa0osWUFBWUMsVUFBVTtHQUFFOztHQUVuRixPQUFPLFNBQVNsRyxTQUFVbUcsS0FBS0MsWUFBWWpGLFNBQVM7S0FDbERwRSxTQUFTYyxTQUFTMEIsV0FBVyxDQUFDLE1BQU07OztLQUdwQyxJQUFNOEcsTUFBTSxFQUFFQyxTQUFTLE1BQU1DLGVBQWU7S0FDNUMsSUFBTUMsYUFBYTtLQUNuQixJQUFJQyxVQUFVO0tBQ2QsSUFBSUMsVUFBVTs7O0tBR2QsU0FBUzNELE1BQU0wQixNQUFNO09BQ25CMUgsU0FBU2MsU0FBUzBCLFdBQVcsQ0FBQyxDQUFDLFVBQVU7O09BRXpDLEtBQUtvSCxVQUFVO09BQ2YsS0FBS0Msa0JBQWtCOztPQUV2QixLQUFLNUIsY0FBY1AsUUFBUSxJQUFJO09BQy9CLEtBQUtvQyxZQUFZcEM7O09BRWpCLElBQUl0RCxTQUFTO1NBQ1gsS0FBSzJGOztNQUdSOzs7S0FHRC9ELE1BQU0rQixlQUFlLFlBQVk7O09BRS9CLE9BQU9zQjs7OztLQUtUckQsTUFBTTRCLGFBQWEsWUFBWTs7T0FFN0IsT0FBTzBCLElBQUlDOzs7O0tBS2J2RCxNQUFNd0QsZ0JBQWdCLFVBQVVBLGVBQWU7T0FDN0N4SixTQUFTYyxTQUFTMEIsV0FBVyxDQUFDOztPQUU5QjhHLElBQUlFLGdCQUFnQkE7T0FDcEIsT0FBT3hEOzs7O0tBS1RBLE1BQU11RCxVQUFVLFVBQVVBLFNBQVM7T0FDakN2SixTQUFTYyxTQUFTMEIsV0FBVyxDQUFDOztPQUU5QjhHLElBQUlDLFVBQVVBO09BQ2QsT0FBT3ZEOzs7O0tBS1RBLE1BQU1FLGNBQWMsWUFBWTs7T0FFOUJrRCxJQUFJbEQsWUFBWW1ELFlBQVlDO09BQzVCLE9BQU90RDs7OztLQUtUQSxNQUFNZ0UsUUFBUSxVQUFVeEQsV0FBV0MsV0FBV0MsTUFBTTtPQUNsRDBDLElBQUk3QyxZQUFZOEMsWUFBWTdDLFdBQVdDLFdBQVdDO09BQ2xELE9BQU9WOzs7O0tBSVRBLE1BQU1pRSxRQUFRLFVBQVVDLGVBQWU7T0FDckNsSyxTQUFTYyxTQUFTMEIsV0FBVyxDQUFDOztPQUU5QjBILGNBQWNsRTtPQUNkLE9BQU9BOzs7O0tBSVRBLE1BQU1tRSxTQUFTLFVBQVVBLFFBQVE7T0FDL0JuSyxTQUFTYyxTQUFTMEIsV0FBVyxDQUFDOztPQUU5QmtILFVBQVU7T0FDVkEsUUFBUUosSUFBSUMsV0FBVztTQUNyQixRQUFRO1NBQ1IsWUFBWTs7O09BR2RiLE9BQU9DLEtBQUt3QixRQUFRcEIsSUFBSSxVQUFVdEMsV0FBVztTQUMzQyxJQUFJMkQsUUFBUUQsT0FBTzFEO1NBQ25CLElBQUksT0FBTzBELE9BQU8xRCxjQUFjLFVBQVM7V0FDdkMyRCxRQUFRLEVBQUUsUUFBUUE7O1NBRXBCVixRQUFRakQsYUFBYTJEOzs7T0FHdkIsT0FBT3BFOzs7O0tBS1RBLE1BQU1xRSxTQUFTLFVBQVVDLEtBQUt2SixNQUFNd0osU0FBUztPQUMzQ3ZLLFNBQVNjLFNBQVMwQixXQUFXLENBQUMsVUFBVSxVQUFVOztPQUVsRG1ILFVBQVVULFdBQVdvQixLQUFLdkosTUFBTXdKO09BQ2hDLE9BQU92RTs7OztLQUlUQSxNQUFNd0UsU0FBUyxVQUFVOUMsTUFBTXZILElBQUk7T0FDakNILFNBQVNjLFNBQVMwQixXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVk7OztPQUdyRCxJQUFJa0YsS0FBS3hGLFdBQVc5QixXQUFXO1NBQzdCLE9BQU80RixNQUFNdUMsc0JBQXNCYixNQUFNLE1BQ3RDK0MsS0FBS3RLOzs7O09BSVYsSUFBTXVLLE1BQU0xSixNQUFNQyxVQUFVQyxNQUFNQyxLQUFLdUc7T0FDdkMsSUFBTXJCLFNBQVM7T0FDZixJQUFNVyxVQUFVMUYsR0FBR3dCLE1BQU0zQzs7T0FFekIsQ0FBQyxTQUFTd0ssWUFBWTs7O1NBR3BCLElBQUlELElBQUl4SSxVQUFVLEdBQUcsT0FBTzhFLFFBQVF6RSxRQUFROEQ7OztTQUc1Q0wsTUFBTXdFLE9BQU9FLElBQUl2SSxTQUFTLFVBQVU3QixLQUFLK0csVUFBVTtXQUNqRCxJQUFJL0csS0FBSyxPQUFPMEcsUUFBUXZFLE9BQU9uQztXQUMvQitGLE9BQU9oRSxLQUFLZ0Y7V0FDWnNEOzs7OztPQU1KLE9BQU8zRDs7OztLQUtUaEIsTUFBTTJCLGtCQUFrQixVQUFVRSxLQUFLdUMsT0FBT2pLLElBQUk7T0FDaERILFNBQVNjLFNBQVMwQixXQUFXLENBQUMsVUFBVSxVQUFVOztPQUVsRCxJQUFNMkgsU0FBU0MsTUFBTVEsTUFBTTtPQUMzQixJQUFNOUMsWUFBWXFDLE9BQU9VOztPQUV6QixPQUFRLFNBQVNDLEtBQUtqRCxLQUFLO1NBQ3pCLElBQUlzQyxPQUFPakksVUFBVSxHQUNuQixPQUFPL0IsR0FBRzBILEtBQUtDO1NBQ2pCLElBQU1zQyxRQUFRRCxPQUFPaEk7U0FDckIsSUFBSSxPQUFPMEYsSUFBSXVDLFdBQVcsYUFDeEJ2QyxJQUFJdUMsU0FBUztTQUNmLE9BQU9VLEtBQUtqRCxJQUFJdUM7U0FDZnZDOzs7O0tBS0w3QixNQUFNK0UsYUFBYSxVQUFVckQsTUFBTTtPQUNqQyxPQUFPMUIsTUFBTTJCLGdCQUFnQkQsTUFBTTRCLElBQUlDLFNBQVMsVUFBVTFCLEtBQUtDLFdBQVc7U0FDeEUsT0FBT0QsSUFBSUM7Ozs7OztLQU1mOUIsTUFBTWdDLGNBQWMsVUFBVVAsS0FBS0MsTUFBTTtPQUN2QzFILFNBQVNjLFNBQVMwQixXQUFXLENBQUMsQ0FBQyxVQUFVLFVBQVUsY0FBYyxDQUFDLFVBQVU7OztPQUc1RSxJQUFJLENBQUNpRixLQUFLO1NBQ1IsT0FBTyxJQUFJekIsTUFBTTBCOzs7O09BSW5CLElBQUksQ0FBQytCLFdBQVdoQyxNQUFLO1NBQ25CZ0MsV0FBV2hDLE9BQU8sSUFBSXpCLE1BQU0wQjs7O09BRzlCLE9BQU8rQixXQUFXaEM7Ozs7S0FJcEJ6QixNQUFNdUMsd0JBQXdCLFVBQVViLE1BQU07T0FDNUMxSCxTQUFTYyxTQUFTMEIsV0FBVyxDQUFDOztPQUU5QixPQUFPd0QsTUFBTWdDLFlBQVloQyxNQUFNK0UsV0FBV3JELE9BQU9BOzs7O0tBS25EMUIsTUFBTXdCLE1BQU0sVUFBVUMsS0FBS3RILElBQUk7O09BRTdCLE9BQU9pSixJQUFJNUIsSUFBSXhCLE9BQU95QixLQUFLdEg7Ozs7S0FLN0I2RixNQUFNbUMsT0FBTyxVQUFVbEMsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCOUIsT0FBT21ELElBQUlyRCxNQUFNQyxPQUFPQzs7OztLQUsxQkQsTUFBTS9FLFVBQVVnSCxnQkFBZ0IsVUFBVVAsTUFBTXNELFVBQVU7T0FBRSxJQUFNeEosT0FBTztPQUN2RXhCLFNBQVNjLFNBQVMwQixXQUFXLENBQUMsVUFBVTs7T0FFeENrRyxPQUFPQyxLQUFLakIsTUFBTXFCLElBQUksVUFBVWtDLFVBQVU7U0FDeEN6SixLQUFLMEosSUFBSUQsVUFBVXZELEtBQUt1RCxXQUFXRDs7O09BR3JDLE9BQU94Sjs7OztLQUtUd0UsTUFBTS9FLFVBQVV1RyxNQUFNLFVBQVU0QyxPQUFPO09BQUUsSUFBTTVJLE9BQU87O09BRXBELE9BQU93RSxNQUFNMkIsZ0JBQWdCbkcsTUFBTTRJLE9BQU8sVUFBVXZDLEtBQUtDLFdBQVc7U0FDbEUsT0FBT0QsSUFBSUM7Ozs7O0tBTWY5QixNQUFNL0UsVUFBVWtLLFNBQVMsVUFBVUMsUUFBUTtPQUFFLElBQU01SixPQUFPOztPQUV4RCxJQUFNNkosU0FBU3JGLE1BQU0rRSxXQUFXdko7O09BRWhDd0UsTUFBTTJCLGdCQUFnQm5HLE1BQU04SCxJQUFJQyxTQUFTLFVBQVUxQixLQUFLQyxXQUFXO1NBQ2pFRCxJQUFJQyxhQUFhc0Q7OztPQUduQixJQUFJQyxXQUFXRCxRQUFROztTQUVyQixJQUFJQyxVQUFVNUIsV0FBVzRCLFdBQVc1QixXQUFXNEIsV0FBVzdKLE1BQU07V0FDOUQsTUFBTSxJQUFJakIsTUFBTTs7U0FFbEIsSUFBSTZLLFVBQVUzQixXQUFXMkIsV0FBVzNCLFdBQVcyQixXQUFXNUosTUFBTTtXQUM5RCxNQUFNLElBQUlqQixNQUFNOzs7O1NBSWxCLElBQUk4SyxVQUFVNUIsV0FBVzRCLFNBQVM7V0FDaEMsT0FBTzVCLFdBQVc0Qjs7OztTQUlwQixJQUFJRCxVQUFVLENBQUMzQixXQUFXMkIsU0FBUztXQUNqQzNCLFdBQVcyQixVQUFVNUo7Ozs7T0FLekIsT0FBT0E7Ozs7S0FLVHdFLE1BQU0vRSxVQUFVaUssTUFBTSxVQUFVZCxPQUFPMUosT0FBT3NLLFVBQVU7T0FBRSxJQUFNeEosT0FBTztPQUNyRXhCLFNBQVNjLFNBQVMwQixXQUFXLENBQUMsVUFBVSxNQUFNOztPQUU5QyxJQUFJNEgsVUFBVWQsSUFBSUMsU0FBUTtTQUN4Qi9ILEtBQUsySixPQUFPeks7Y0FDUDtTQUNMc0YsTUFBTTJCLGdCQUFnQm5HLE1BQU00SSxPQUFPLFVBQVV2QyxLQUFLQyxXQUFXO1dBQzNERCxJQUFJQyxhQUFhcEg7Ozs7T0FJckIsSUFBSXNLLFVBQVU7U0FDWmhGLE1BQU0yQixnQkFBZ0JuRyxLQUFLcUksaUJBQWlCTyxPQUFPLFVBQVV2QyxLQUFLQyxXQUFXO1dBQzNFRCxJQUFJQyxhQUFhcEg7Ozs7T0FJckIsT0FBT2M7Ozs7S0FJVHdFLE1BQU0vRSxVQUFVcUcsU0FBUyxZQUFZO09BQUUsSUFBTTlGLE9BQU87T0FDbEQsSUFBTThGLFNBQVM7O09BRWZvQixPQUFPQyxLQUFLZSxTQUFTWCxJQUFJLFVBQVVxQixPQUFPO1NBQ3hDcEUsTUFBTTJCLGdCQUFnQkwsUUFBUThDLE9BQU8sVUFBVXZDLEtBQUtDLFdBQVc7V0FDN0RELElBQUlDLGFBQWF0RyxLQUFLZ0csSUFBSTRDOzs7O09BSTlCLE9BQU85Qzs7OztLQUtUdEIsTUFBTS9FLFVBQVU2SSxjQUFjLFVBQVVwQyxNQUFNOzs7S0FJOUMxQixNQUFNL0UsVUFBVXFLLFdBQVcsWUFBWTs7T0FFckMsT0FBTzdCLFdBQVcsS0FBS2pDLElBQUk4QixJQUFJQyxjQUFjOzs7O0tBSy9DdkQsTUFBTS9FLFVBQVV3SixPQUFPLFVBQVV0SyxJQUFHO09BQUUsSUFBTXFCLE9BQU87T0FDakR4QixTQUFTYyxTQUFTMEIsV0FBVyxDQUFDLFlBQVk7O09BRTFDLE9BQU80RyxJQUFJaEMsSUFBSWlDLFlBQVksTUFBTSxVQUFVL0ksS0FBS2tGLE9BQU87U0FDckQsSUFBSWxGLEtBQUs7V0FBRSxJQUFJSCxJQUFJQSxHQUFHRyxLQUFNO1VBQVM7OztTQUdyQyxJQUFNbUgsTUFBTWpDLE1BQU1HLE9BQU9VO1NBQ3pCN0UsS0FBSzJKLE9BQU8xRDtTQUNaakcsS0FBSzBHLFNBQVM7O1NBRWQsSUFBSS9ILElBQUlBLEdBQUdpQyxNQUFNLE1BQU0sQ0FBQyxNQUFNUyxPQUFPN0IsTUFBTUMsVUFBVUMsTUFBTUMsS0FBS3FCOzs7OztLQU1wRXdELE1BQU0vRSxVQUFVOEksU0FBUyxZQUFZO09BQUUsSUFBTXZJLE9BQU87T0FDbEQsSUFBSSxDQUFDNEMsU0FBUyxNQUFNLElBQUk3RCxNQUFNOztPQUU5QjZELFFBQVFtSCxVQUFVO1NBQ2hCcEYsV0FBV2tEO1NBQ1h4RSxXQUFXO1NBQ1h1QixTQUFTNUUsS0FBS2dHLElBQUl4QixNQUFNNEI7VUFDdkIsVUFBVUYsTUFBTTtTQUNqQmxHLEtBQUt5RyxjQUFjUCxRQUFRLElBQUk7U0FDL0J5QixTQUFTLFlBQVk7V0FDbkIzSCxLQUFLaUo7Ozs7OztLQU9YekUsTUFBTS9FLFVBQVV1SyxXQUFXLFVBQVVsRCxRQUFRO09BQzNDLEtBQUtzQixVQUFVdEI7T0FDZixPQUFPOzs7S0FHVCxPQUFPdEM7Ozs7Ozs7O0FFelhYOzs7OztBQ0lBLFFBQU8sZUFBZSxTQUFTLGNBQWM7R0FDM0MsT0FBTzs7QUFFVCxTQUFRLFVESmdCOUM7QUFBVCxVQUFTQSxTQUFVRixNQUFNaEQsVUFBVTtHQUFFOztHQUVsRCxPQUFPLFNBQVNrRCxTQUFTa0csS0FBS3FDLFFBQVFDLFVBQVU7S0FBRSxJQUFNbEssT0FBTztLQUM3RHhCLFNBQVNjLFNBQVMwQixXQUFXLENBQUMsVUFBVSxZQUFZLENBQUMsVUFBVTs7S0FFL0QsSUFBSW1KLFVBQVU7OztLQUdkbkssS0FBS29LLFlBQVksVUFBVXpMLElBQUk7T0FDN0JILFNBQVNjLFNBQVMwQixXQUFXLENBQUMsQ0FBQyxZQUFZOzs7T0FHM0MsSUFBSSxDQUFDbUosU0FDSEEsVUFBVXZDLElBQUlqQixLQUFLc0QsUUFBUUMsVUFBVXZMO09BQ3ZDLE9BQU93TDs7Ozs7Ozs7O0FFakJiOzs7QUNFQSxRQUFPLGVBQWUsU0FBUyxjQUFjO0dBQzNDLE9BQU87O0FBRVQsU0FBUSxVREhnQkU7QUFBVCxVQUFTQSxpQkFBaUI3SSxNQUFNbEQsSUFBSUUsVUFBVTtHQUFFO0dBQVksSUFBTXdCLE9BQU87O0dBRXRGLElBQUlzSyxnQkFBZ0I7O0dBRXBCLFNBQVMzSSxVQUFXNEksWUFBWUMsZ0JBQWdCQyxnQkFBZ0I7S0FBRSxJQUFNekssT0FBTztLQUM3RXhCLFNBQVNjLFNBQVMwQixXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsV0FBVyxDQUFDLFVBQVU7O0tBRXpFLElBQU0wSixhQUFjO0tBQ3BCLElBQUk5SCxVQUFVO0tBQ2QySCxhQUFhQSxjQUFjRDs7O0tBRzNCdEssS0FBSzJLLFVBQVUsWUFBWTs7O09BR3pCL0gsVUFBVXRFLEdBQUdxTSxRQUFRSjs7Ozs7T0FLckIzSCxRQUFRZ0ksR0FBRyxXQUFXLFlBQVU7U0FDOUJwSixLQUFLbUMsSUFBSTs7U0FFVGYsUUFBUWlJLEtBQUssa0JBQWtCO1dBQzdCQyxJQUFJTjtXQUNKTyxRQUFRTjs7U0FFVjdILFFBQVFnSSxHQUFHLGlCQUFpQixZQUFXOztXQUVyQ3BKLEtBQUttQyxJQUFJOzs7OztLQU9mM0QsS0FBSytKLFlBQVksVUFBVWlCLFNBQVNyTSxJQUFJO09BQ3RDSCxTQUFTYyxTQUFTMEIsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZOztPQUVyRCxJQUFJaEMsT0FBT2dNLFFBQVFyRyxZQUFZLE1BQU1xRyxRQUFRM0g7O09BRTdDLElBQUksT0FBTzJILFFBQVFwRyxZQUFZLFVBQVU7U0FDdkM1RixPQUFPQSxPQUFPLE1BQU1nTSxRQUFRcEc7OztPQUc5QmhDLFFBQVFnSSxHQUFHNUwsTUFBTUw7OztPQUdqQitMLFdBQVc3SixLQUFLN0IsTUFBTUw7OztLQUl4QnFCLEtBQUtpTCxlQUFlLFVBQVVDLGtCQUFrQnZNLElBQUk7T0FDbERILFNBQVNjLFNBQVMwQixXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVk7O09BRXJEMEosV0FBVzdKLEtBQUtxSzs7O0tBSWxCbEwsS0FBS21MLGNBQWMsVUFBVUQsa0JBQWtCO09BQzdDdEksUUFBUXdJLG1CQUFtQkY7T0FDM0IsSUFBSTNILE1BQU1tSCxXQUFXbEgsUUFBUTBIO09BQzdCLElBQUkzSCxPQUFPLENBQUMsR0FBRTtTQUNabUgsV0FBV2pILE9BQU9GLEtBQUs7Ozs7S0FJM0J2RCxLQUFLMks7SUFFTjs7O0dBR0RoSixVQUFVMEosZUFBZSxVQUFVQyxXQUFXO0tBQzVDaEIsZ0JBQWdCZ0I7Ozs7R0FJbEIzSixVQUFVNEosaUJBQWlCLFVBQVVDLGVBQWVDLGVBQWU7S0FDakVELGdCQUFnQmhCO0tBQ2hCaUIsZ0JBQWdCaEI7OztHQUdsQixPQUFPOUk7Ozs7Ozs7QUVwRlQ7O0FDRUEsUUFBTyxlQUFlLFNBQVMsY0FBYztHQUMzQyxPQUFPOztBQUVULFNBQVEsVURIZ0IrSjtBQUFULFVBQVNBLEdBQUl0TixRQUFROzs7R0FHbEMsU0FBU3VOLFFBQVE3QyxLQUFLO0tBQ3BCLElBQU04QyxJQUFJOUMsSUFBSStDLE1BQU07S0FDcEIsT0FBT0QsSUFBSUEsRUFBRSxLQUFLOzs7R0FHcEIsSUFBSUUsY0FBY0MsU0FBU0M7O0dBRTNCLElBQU1wSyxTQUFTLGtCQUFXO0tBQUU7O0tBQzFCLElBQU1xSyxRQUFRLENBQUMsaUJBQWlCLGlCQUFpQjtLQUNqRCxJQUFNQyxjQUFjOzs7O0tBSXBCLFNBQVNqRCxLQUFLa0QsU0FBU25OLE1BQU1FLE9BQU87T0FDbEMsSUFBSTtTQUNGLElBQU0rRyxNQUFNaUcsY0FBY2xOO1NBQzFCLElBQUlFLFNBQVMsTUFBTUEsUUFBUTtTQUMzQmlOLFFBQVFsRyxPQUFPL0c7U0FDZixPQUFPSixLQUFLO1NBQ1pzTixRQUFRekksSUFBSSx3Q0FBd0M3RTs7OztLQUl4RCxTQUFTdU4sS0FBS3JOLE1BQU07T0FDbEIsSUFBTWlILE1BQU1pRyxjQUFjbE47T0FDMUIsT0FBT3NOLGFBQWFyRyxRQUFRc0csZUFBZXRHLFFBQVE7OztLQUdyRCxTQUFTckUsU0FBUztPQUFFLElBQU01QixPQUFPOztPQUUvQmlNLE1BQU1PLFFBQVEsVUFBU3hOLE1BQU07U0FDM0JnQixLQUFLaEIsUUFBUXFOLEtBQUtyTjs7T0FFcEJnQixLQUFLeU0sa0JBQWtCOzs7S0FHekI3SyxPQUFPbkMsVUFBVXdKLE9BQU8sWUFBVztPQUFFLElBQU1qSixPQUFPO09BQ2hELElBQU1tTSxVQUFVbk0sS0FBSzBNLGFBQWFKLGVBQWVDO09BQ2pETixNQUFNTyxRQUFRLFVBQVN4TixNQUFNO1NBQzNCaUssS0FBS2tELFNBQVNuTixNQUFNZ0IsS0FBS2hCOzs7O0tBSTdCNEMsT0FBT25DLFVBQVVrTixVQUFVLFVBQVNuQixlQUFlVCxRQUFRNkIsVUFBVTtPQUFFLElBQU01TSxPQUFPO09BQ2xGQSxLQUFLd0wsZ0JBQWdCQTtPQUNyQnhMLEtBQUt5TCxnQkFBZ0JWO09BQ3JCL0ssS0FBS3lNLGtCQUFrQkc7OztLQUd6QmhMLE9BQU9uQyxVQUFVb04sWUFBWSxZQUFXO09BQUUsSUFBTTdNLE9BQU87T0FDckRBLEtBQUt3TCxnQkFBZ0I7T0FDckJ4TCxLQUFLeUwsZ0JBQWdCO09BQ3JCekwsS0FBS3lNLGtCQUFrQjs7O0tBR3pCN0ssT0FBT25DLFVBQVVxTixlQUFlLFlBQVc7T0FDekNiLE1BQU1PLFFBQVEsVUFBU3hOLE1BQU07U0FDM0JpSyxLQUFLc0QsZ0JBQWdCdk4sTUFBTTtTQUMzQmlLLEtBQUtxRCxjQUFjdE4sTUFBTTs7OztLQUk3QixPQUFPLElBQUk0Qzs7O0dBSWIsSUFBTW1MLDJCQUEyQixTQUEzQkEseUJBQW9DdE8sSUFBSW1ELFFBQVE7S0FBRTs7S0FFdEQsT0FBTztPQUNMb0wsU0FBUyxpQkFBU0MsUUFBUTs7U0FFeEIsSUFBTWpCLE9BQU9MLFFBQVFzQixPQUFPbkU7U0FDNUIsSUFBSWtELFFBQVFBLFNBQVNGLGFBQWE7V0FDaEMsT0FBT21COzs7U0FHVCxJQUFJckwsT0FBTzRKLGVBQWU7V0FDeEJ5QixPQUFPQyxRQUFRQyxjQUFjdkwsT0FBTzRKO2dCQUMvQixJQUFJeUIsT0FBT0csc0JBQXNCOzs7V0FHdEMsSUFBTUMsTUFBTTthQUNWQyxNQUFNLEVBQUVoTixPQUFPLEVBQUVpTixRQUFRO2FBQ3pCQSxRQUFRO2FBQ1JOLFFBQVFBO2FBQ1JDLFNBQVMsbUJBQVc7ZUFBRSxPQUFPdE87OztXQUUvQixPQUFPSCxHQUFHd0MsT0FBT29NOztTQUVuQixPQUFPSixVQUFVeE8sR0FBRytPLEtBQUtQOzs7Ozs7R0FNL0IsSUFBTXZGLGFBQWEsU0FBYkEsYUFBd0I7S0FBRTtLQUFZLElBQU0xSCxPQUFPOztLQUV2RCxJQUFNZ0wsVUFBVTtPQUNkeUMsU0FBUztPQUNUTixZQUFZOzs7S0FHZHJCLGNBQWNILFFBQVFYLFFBQVF5QyxZQUFZMUIsU0FBU0M7Ozs7Ozs7Ozs7OztLQVluRGhNLEtBQUswTixnQkFBZ0IsVUFBU0MsUUFBUTtPQUNwQzNDLFFBQVFtQyxhQUFhUTs7Ozs7Ozs7OztLQVV2QjNOLEtBQUs0TixnQkFBZ0IsWUFBVztPQUM5QixPQUFPNUMsUUFBUW1DOzs7Ozs7Ozs7Ozs7S0FZakJuTixLQUFLNk4sYUFBYSxVQUFTL0UsS0FBSztPQUM5QmtDLFFBQVF5QyxVQUFVM0U7T0FDbEJnRCxjQUFjSCxRQUFRWCxRQUFReUMsWUFBWTFCLFNBQVNDOzs7Ozs7Ozs7OztLQVdyRGhNLEtBQUs4TixhQUFhLFlBQVc7T0FDM0IsT0FBTzlDLFFBQVF5Qzs7O0tBR2pCek4sS0FBSytOLHFCQUFPLFVBQVNDLFdBQVc7T0FBRTs7T0FFaEMsSUFBTXRHLGFBQWEsU0FBYkEsV0FBc0JvQixLQUFLbUYsUUFBUWxGLFNBQVM7O1NBRWhEN0IsT0FBT0MsS0FBSzRCLFNBQVN4QixJQUFJLFVBQVV0QixLQUFLO1dBQ3RDOEMsUUFBUTlDLEtBQUtpSSxjQUFjbkYsUUFBUTlDLEtBQUs2QztXQUN4Q0MsUUFBUTlDLEtBQUs2QyxNQUFNa0MsUUFBUXlDLFVBQVUxRSxRQUFROUMsS0FBSzZDOzs7U0FHcEQsSUFBTWtCLFdBQVdnRSxVQUFVaEQsUUFBUXlDLFVBQVUzRSxLQUFLbUYsUUFBUWxGOzs7OztTQUsxRGlCLFNBQVN2SyxVQUFVME8sUUFBUSxVQUFTQyxTQUFTOU4sT0FBTzs7O1dBR2xELElBQU11RSxTQUFTbUYsU0FBU3FFLE9BQU8xTyxLQUFLLE1BQU0sSUFBSSxNQUFNeU8sU0FBUzlOO1dBQzdELE9BQU91RSxPQUFPa0IsWUFBWWxCOztTQUU1QixPQUFPbUY7OztPQUdUdEMsV0FBV29HLGFBQWEsWUFBVztTQUNqQyxPQUFPOUMsUUFBUXlDOzs7T0FHakIvRixXQUFXa0csZ0JBQWdCLFlBQVc7U0FDcEMsT0FBTzVDLFFBQVFtQzs7O09BR2pCLE9BQU96Rjs7OztHQU1YLE9BQU90SixPQUNKa1EsUUFBUSxVQUFVMU0sUUFDbEIyTSxTQUFTLGNBQWM3RyxZQUN2QjRHLFFBQVEsNEJBQTRCdkIsMEJBQ3BDRSxPQUFPLENBQUMsaUJBQWlCLFVBQVN1QixlQUFlO0tBQUU7O0tBQ2xEQSxjQUFjQyxhQUFhNU4sS0FBSyIsImZpbGUiOiJuZy1pZGIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDEzYWY1YTZlNWMxZjQ3MTc3OTdhXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IGlkYlV0aWxzIGZyb20gJy4vdXRpbHMvaWRiVXRpbHMnO1xyXG5pbXBvcnQgaWRiRXZlbnRzIGZyb20gJy4vdXRpbHMvaWRiRXZlbnRzJztcclxuaW1wb3J0IHFzIGZyb20gJy4vdXRpbHMvcXMnO1xyXG5cclxuaW1wb3J0IGlkYiBmcm9tICcuL3NlcnZpY2VzL2lkYic7XHJcbmltcG9ydCBpZGJNb2RlbCBmcm9tICcuL3NlcnZpY2VzL2lkYk1vZGVsJztcclxuaW1wb3J0IGlkYlF1ZXJ5IGZyb20gJy4vc2VydmljZXMvaWRiUXVlcnknO1xyXG5pbXBvcnQgaWRiU29ja2V0IGZyb20gJy4vc2VydmljZXMvaWRiU29ja2V0JztcclxuXHJcbmltcG9ydCBsYiBmcm9tICcuL3NlcnZpY2VzL2xiJztcclxuXHJcbmxiKGFuZ3VsYXIubW9kdWxlKCduZy5pZGInLCBbXSkpXHJcbiAgLmNvbnN0YW50KCdpbycsIGlvKVxyXG4gIFxyXG4gIC5jb25zdGFudCgnaWRiVmVyc2lvbicsICcwLjAuMScpXHJcbiAgLnNlcnZpY2UoJ2lkYkV2ZW50cycsIGlkYkV2ZW50cylcclxuICAuc2VydmljZSgnaWRiVXRpbHMnLCBpZGJVdGlscylcclxuICAuc2VydmljZSgncXMnLCBxcylcclxuXHJcbiAgLy8gVGFrZSBvZiBsYi1zZXJ2aWNlcy5qc1xyXG4gIC5zZXJ2aWNlKCdpZGInLCBpZGIpXHJcbiAgLnNlcnZpY2UoJ2lkYk1vZGVsJywgaWRiTW9kZWwpXHJcbiAgLnNlcnZpY2UoJ2lkYlF1ZXJ5JywgaWRiUXVlcnkpXHJcbiAgLnNlcnZpY2UoJ2lkYlNvY2tldCcsIGlkYlNvY2tldClcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfaWRiVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzL2lkYlV0aWxzJyk7XG5cbnZhciBfaWRiVXRpbHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiVXRpbHMpO1xuXG52YXIgX2lkYkV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvaWRiRXZlbnRzJyk7XG5cbnZhciBfaWRiRXZlbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYkV2ZW50cyk7XG5cbnZhciBfcXMgPSByZXF1aXJlKCcuL3V0aWxzL3FzJyk7XG5cbnZhciBfcXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcXMpO1xuXG52YXIgX2lkYiA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiJyk7XG5cbnZhciBfaWRiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYik7XG5cbnZhciBfaWRiTW9kZWwgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYk1vZGVsJyk7XG5cbnZhciBfaWRiTW9kZWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiTW9kZWwpO1xuXG52YXIgX2lkYlF1ZXJ5ID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJRdWVyeScpO1xuXG52YXIgX2lkYlF1ZXJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlF1ZXJ5KTtcblxudmFyIF9pZGJTb2NrZXQgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYlNvY2tldCcpO1xuXG52YXIgX2lkYlNvY2tldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJTb2NrZXQpO1xuXG52YXIgX2xiID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9sYicpO1xuXG52YXIgX2xiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuKDAsIF9sYjIuZGVmYXVsdCkoYW5ndWxhci5tb2R1bGUoJ25nLmlkYicsIFtdKSkuY29uc3RhbnQoJ2lvJywgaW8pLmNvbnN0YW50KCdpZGJWZXJzaW9uJywgJzAuMC4xJykuc2VydmljZSgnaWRiRXZlbnRzJywgX2lkYkV2ZW50czIuZGVmYXVsdCkuc2VydmljZSgnaWRiVXRpbHMnLCBfaWRiVXRpbHMyLmRlZmF1bHQpLnNlcnZpY2UoJ3FzJywgX3FzMi5kZWZhdWx0KVxuXG4vLyBUYWtlIG9mIGxiLXNlcnZpY2VzLmpzXG4uc2VydmljZSgnaWRiJywgX2lkYjIuZGVmYXVsdCkuc2VydmljZSgnaWRiTW9kZWwnLCBfaWRiTW9kZWwyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlF1ZXJ5JywgX2lkYlF1ZXJ5Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJTb2NrZXQnLCBfaWRiU29ja2V0Mi5kZWZhdWx0KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYlV0aWxzICgkcSkgeyAnbmdJbmplY3QnXHJcbiAgXHJcbiAgLy8gRnVuY2lvbiBwYXJhIGRldGVybWluYXIgc2kgZXMgdW4gY2FsbGJhY2sgdsOhbGlkbyBvIG5vXHJcbiAgZnVuY3Rpb24gaXNDYWxsYmFjayAoY2IpIHtcclxuXHJcbiAgICByZXR1cm4gdHlwZW9mIGNiID09ICdmdW5jdGlvbicgfHwgY2IgPT0gbnVsbCB8fCBjYiA9PSB1bmRlZmluZWQ7XHJcblxyXG4gIH1cclxuXHJcbiAgLy8gU2kgZWwgY2FsbGJhY2sgbm8gZXMgdsOhbGlkbyBsYW56YSB1biBlcnJwb3JcclxuICBmdW5jdGlvbiBtdXN0QmVDYWxsYmFjayAoY2IpIHtcclxuICAgIGlmIChpc0NhbGxiYWNrKGNiKSkgcmV0dXJuO1xyXG5cclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgY2FsbGJhY2snKTtcclxuICAgIGVyci5uYW1lID0gJ0ludmFsaWRDYWxsYmFjaydcclxuXHJcbiAgICB0aHJvdyBlcnI7XHJcblxyXG4gIH1cclxuXHJcbiAgLy8gR2VuZXJhIHVuIGVycm9yIHNpIGVsIHZhbG9yIG5vIGVzIGRlbCB0aXBvIGluZGljYWRvIHBvciBwYXJhbWV0cm9cclxuICBmdW5jdGlvbiBtdXN0QmUgKHZhbHVlLCB0eXBlcykge1xyXG4gICAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xyXG4gICAgZm9yKHZhciBpIGluIHR5cGVzKXtcclxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSB0eXBlc1tpXSkgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZTogJyt2YWx1ZSsnIG11c3QgYmUgJyt0eXBlcy5qb2luKCcgb3IgJykpO1xyXG4gICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbHVlJ1xyXG4gICAgdGhyb3cgZXJyO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIFZhbGlkYSB1biBhcnJheSBkZSBhcmd1bWVudG9zIGNvbiB1biBhcnJhIGRlIHRpcG9zXHJcbiAgZnVuY3Rpb24gdmFsaWRhdGUgKGFyZ3MsIHR5cGVzKSB7XHJcblxyXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xyXG4gICAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xyXG4gICAgZm9yICh2YXIgaSBpbiBhcmdzKXtcclxuICAgICAgaWYgKHR5cGVzW2ldKXtcclxuICAgICAgICBpZiAodHlwZXNbaV0gPT0gbnVsbCl7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0eXBlc1tpXSA9PSAnc3RyaW5nJyB8fCB0eXBlb2YgdHlwZXNbaV0gPT0gJ29iamVjdCcpe1xyXG4gICAgICAgICAgbXVzdEJlKGFyZ3NbaV0sIHR5cGVzW2ldKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHR5cGVzW2ldID09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgICAgaWYodHlwZXNbaV0oYXJnc1tpXSkpXHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWxpZGF0b3IgdG86ICcrYXJnc1tpXSsnIG11c3QgYmUgJyt0eXBlc1tpXSk7XHJcbiAgICAgICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbGlkYXRvcidcclxuICAgICAgICB0aHJvdyBlcnI7XHJcblxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGlzQ2FsbGJhY2s6IGlzQ2FsbGJhY2ssXHJcbiAgICBtdXN0QmVDYWxsYmFjazogbXVzdEJlQ2FsbGJhY2ssXHJcbiAgICBtdXN0QmU6IG11c3RCZSxcclxuICAgIHZhbGlkYXRlOiB2YWxpZGF0ZSxcclxuICB9O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL2lkYlV0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGlkYlV0aWxzO1xuZnVuY3Rpb24gaWRiVXRpbHMoJHEpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyBGdW5jaW9uIHBhcmEgZGV0ZXJtaW5hciBzaSBlcyB1biBjYWxsYmFjayB2w6FsaWRvIG8gbm9cblxuICBmdW5jdGlvbiBpc0NhbGxiYWNrKGNiKSB7XG5cbiAgICByZXR1cm4gdHlwZW9mIGNiID09ICdmdW5jdGlvbicgfHwgY2IgPT0gbnVsbCB8fCBjYiA9PSB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBTaSBlbCBjYWxsYmFjayBubyBlcyB2w6FsaWRvIGxhbnphIHVuIGVycnBvclxuICBmdW5jdGlvbiBtdXN0QmVDYWxsYmFjayhjYikge1xuICAgIGlmIChpc0NhbGxiYWNrKGNiKSkgcmV0dXJuO1xuXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCBjYWxsYmFjaycpO1xuICAgIGVyci5uYW1lID0gJ0ludmFsaWRDYWxsYmFjayc7XG5cbiAgICB0aHJvdyBlcnI7XG4gIH1cblxuICAvLyBHZW5lcmEgdW4gZXJyb3Igc2kgZWwgdmFsb3Igbm8gZXMgZGVsIHRpcG8gaW5kaWNhZG8gcG9yIHBhcmFtZXRyb1xuICBmdW5jdGlvbiBtdXN0QmUodmFsdWUsIHR5cGVzKSB7XG4gICAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xuICAgIGZvciAodmFyIGkgaW4gdHlwZXMpIHtcbiAgICAgIGlmICgodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSkpID09IHR5cGVzW2ldKSByZXR1cm47XG4gICAgfVxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWU6ICcgKyB2YWx1ZSArICcgbXVzdCBiZSAnICsgdHlwZXMuam9pbignIG9yICcpKTtcbiAgICBlcnIubmFtZSA9ICdJbnZhbGlkVmFsdWUnO1xuICAgIHRocm93IGVycjtcbiAgfVxuXG4gIC8vIFZhbGlkYSB1biBhcnJheSBkZSBhcmd1bWVudG9zIGNvbiB1biBhcnJhIGRlIHRpcG9zXG4gIGZ1bmN0aW9uIHZhbGlkYXRlKGFyZ3MsIHR5cGVzKSB7XG5cbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyk7XG4gICAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xuICAgIGZvciAodmFyIGkgaW4gYXJncykge1xuICAgICAgaWYgKHR5cGVzW2ldKSB7XG4gICAgICAgIGlmICh0eXBlc1tpXSA9PSBudWxsKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0eXBlc1tpXSA9PSAnc3RyaW5nJyB8fCBfdHlwZW9mKHR5cGVzW2ldKSA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIG11c3RCZShhcmdzW2ldLCB0eXBlc1tpXSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0eXBlc1tpXSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaWYgKHR5cGVzW2ldKGFyZ3NbaV0pKSBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsaWRhdG9yIHRvOiAnICsgYXJnc1tpXSArICcgbXVzdCBiZSAnICsgdHlwZXNbaV0pO1xuICAgICAgICBlcnIubmFtZSA9ICdJbnZhbGlkVmFsaWRhdG9yJztcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaXNDYWxsYmFjazogaXNDYWxsYmFjayxcbiAgICBtdXN0QmVDYWxsYmFjazogbXVzdEJlQ2FsbGJhY2ssXG4gICAgbXVzdEJlOiBtdXN0QmUsXG4gICAgdmFsaWRhdGU6IHZhbGlkYXRlXG4gIH07XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiVXRpbHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBOb21icmUgZGUgbG9zIGV2ZW50b3NcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiRXZlbnRzKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBEQl9FUlJPUjogJ2NiLmVycm9yJ1xyXG4gIH1cclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9pZGJFdmVudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIE5vbWJyZSBkZSBsb3MgZXZlbnRvc1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaWRiRXZlbnRzO1xuZnVuY3Rpb24gaWRiRXZlbnRzKCkge1xuICByZXR1cm4ge1xuICAgIERCX0VSUk9SOiAnY2IuZXJyb3InXG4gIH07XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL2lkYkV2ZW50cy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHFzICgpIHsgJ25nSW5qZWN0J1xyXG4gIFxyXG4gIGZ1bmN0aW9uIHFzQ2xhc3MgKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgXHJcbiAgICBsZXQgdGhlbnMgPSBbXTtcclxuICAgIGxldCB0aGVuc1JlYWR5ID0gW107XHJcbiAgICBsZXQgY2F0Y2hzID0gW107XHJcbiAgICBsZXQgY2F0Y2hzUmVhZHkgPSBbXTtcclxuICAgIGxldCByZXN1bHRBcmdzID0gbnVsbDtcclxuICAgIGxldCBlcnJvciA9IG51bGw7XHJcblxyXG4gICAgdGhpei5wcm9taXNlID0ge307XHJcbiAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRoZW5zUmVzb2x2ZWQgKCkge1xyXG4gICAgICBpZiAoIXRoZW5zLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICBsZXQgY2IgPSB0aGVucy5zaGlmdCgpO1xyXG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LnJlc3VsdEFyZ3MpO1xyXG4gICAgICB0aGVuc1JlYWR5LnB1c2goY2IpO1xyXG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2F0Y2hzUmVzb2x2ZWQgKCkge1xyXG4gICAgICBpZiAoIWNhdGNocy5sZW5ndGgpIHJldHVybjtcclxuICAgICAgbGV0IGNiID0gY2F0Y2hzLnNoaWZ0KCk7XHJcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xyXG4gICAgICBjYXRjaHNSZWFkeS5wdXNoKGNiKTtcclxuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGl6LnJlc29sdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xyXG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgIHRoaXoucmVzdWx0QXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5yZWplY3QgPSBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xyXG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgIHRoaXouZXJyb3IgPSBlcnIgfHwge307XHJcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucHJvbWlzZS50aGVuID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIHRoZW5zLnB1c2goY2IpO1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQgJiYgIXRoaXouZXJyb3IpIHtcclxuICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucHJvbWlzZS5jYXRjaCA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICBjYXRjaHMucHVzaChjYik7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiB0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpejtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLmRvbmUgPSBmdW5jdGlvbiAoY2IpIHtcclxuXHJcbiAgICAgIHRoZW5zLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQodGhpei5yZXN1bHRBcmdzKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY2F0Y2hzLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkge1xyXG4gICAgICAgIGlmICghdGhpei5lcnJvcikge1xyXG4gICAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGlmKGNiKSB0aGl6LnByb21pc2UuZG9uZShjYik7XHJcblxyXG4gIH07XHJcblxyXG4gIC8vIENyZWEgdW5hIGluc3RhbmNpYSBkZWwgZGVmZXJlZFxyXG4gIHFzQ2xhc3MuZGVmZXIgPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgIHJldHVybiBuZXcgcXNDbGFzcyhjYik7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHFzQ2xhc3M7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvcXMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBxcztcbmZ1bmN0aW9uIHFzKCkge1xuICAnbmdJbmplY3QnO1xuXG4gIGZ1bmN0aW9uIHFzQ2xhc3MoY2IpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICB2YXIgdGhlbnMgPSBbXTtcbiAgICB2YXIgdGhlbnNSZWFkeSA9IFtdO1xuICAgIHZhciBjYXRjaHMgPSBbXTtcbiAgICB2YXIgY2F0Y2hzUmVhZHkgPSBbXTtcbiAgICB2YXIgcmVzdWx0QXJncyA9IG51bGw7XG4gICAgdmFyIGVycm9yID0gbnVsbDtcblxuICAgIHRoaXoucHJvbWlzZSA9IHt9O1xuICAgIHRoaXouJHJlc29sdmVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiB0aGVuc1Jlc29sdmVkKCkge1xuICAgICAgaWYgKCF0aGVucy5sZW5ndGgpIHJldHVybjtcbiAgICAgIHZhciBjYiA9IHRoZW5zLnNoaWZ0KCk7XG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LnJlc3VsdEFyZ3MpO1xuICAgICAgdGhlbnNSZWFkeS5wdXNoKGNiKTtcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYXRjaHNSZXNvbHZlZCgpIHtcbiAgICAgIGlmICghY2F0Y2hzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgdmFyIGNiID0gY2F0Y2hzLnNoaWZ0KCk7XG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcbiAgICAgIGNhdGNoc1JlYWR5LnB1c2goY2IpO1xuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICB9XG5cbiAgICB0aGl6LnJlc29sdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgIHRoaXoucmVzdWx0QXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgfTtcblxuICAgIHRoaXoucmVqZWN0ID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICB0aGl6LmVycm9yID0gZXJyIHx8IHt9O1xuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICB9O1xuXG4gICAgdGhpei5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHRoZW5zLnB1c2goY2IpO1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmICF0aGl6LmVycm9yKSB7XG4gICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH07XG5cbiAgICB0aGl6LnByb21pc2UuY2F0Y2ggPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIGNhdGNocy5wdXNoKGNiKTtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiB0aGl6LmVycm9yKSB7XG4gICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgdGhpei5wcm9taXNlLmRvbmUgPSBmdW5jdGlvbiAoY2IpIHtcblxuICAgICAgdGhlbnMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQodGhpei5yZXN1bHRBcmdzKSk7XG4gICAgICB9KTtcblxuICAgICAgY2F0Y2hzLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHtcbiAgICAgICAgaWYgKCF0aGl6LmVycm9yKSB7XG4gICAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIGlmIChjYikgdGhpei5wcm9taXNlLmRvbmUoY2IpO1xuICB9O1xuXG4gIC8vIENyZWEgdW5hIGluc3RhbmNpYSBkZWwgZGVmZXJlZFxuICBxc0NsYXNzLmRlZmVyID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgcmV0dXJuIG5ldyBxc0NsYXNzKGNiKTtcbiAgfTtcblxuICByZXR1cm4gcXNDbGFzcztcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9xcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJTZXJ2aWNlICgkbG9nLCBxcywgaWRiVXRpbHMsIGlkYkV2ZW50cywgaWRiTW9kZWwsIGlkYlF1ZXJ5LCBpZGJTb2NrZXQsIGxiQXV0aCkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAvLyBFbiBsYSBzaWd1aWVudGUgbGluZWEsIHB1ZWRlIGluY2x1aXIgcHJlZmlqb3MgZGUgaW1wbGVtZW50YWNpb24gcXVlIHF1aWVyYSBwcm9iYXIuXHJcbiAgY29uc3QgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xyXG4gIC8vIE5vIHVzZSBcImNvbnN0IGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cclxuICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcclxuICBjb25zdCBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XHJcbiAgY29uc3QgSURCS2V5UmFuZ2UgPSB3aW5kb3cuSURCS2V5UmFuZ2UgfHwgd2luZG93LndlYmtpdElEQktleVJhbmdlIHx8IHdpbmRvdy5tc0lEQktleVJhbmdlO1xyXG4gIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXHJcbiAgXHJcbiAgaWYgKCFpbmRleGVkREIpIHtcclxuICAgIGFsZXJ0KFwiU3UgbmF2ZWdhZG9yIG5vIHNvcG9ydGEgdW5hIHZlcnNpw7NuIGVzdGFibGUgZGUgaW5kZXhlZERCLiBUYWwgeSBjb21vIGxhcyBjYXJhY3RlcsOtc3RpY2FzIG5vIHNlcsOhbiB2YWxpZGFzXCIpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2xhc2UgcGFyYSBsYSBjcmVhY2nDs24gZGUgaW5zdGFuY2lhcyBkZSBsYSBCRFxyXG4gIGZ1bmN0aW9uIGlkYigkZGJOYW1lLCAkZGJWZXJzaW9uLCAkc29ja2V0KSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdudW1iZXInLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAvLyBNYW5lamFkb3JlcyBkZSBldmVudG9zLlxyXG4gICAgY29uc3QgJGV2ZW50c0NhbGxiYWNrcyA9IHt9O1xyXG4gICAgY29uc3QgJHVwZ3JhZGVOZWVkZWREZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgIGNvbnN0ICRvcGVuRGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcbiAgICBjb25zdCAkc29ja2V0Q29ubmVjdGVkRGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcbiAgICBsZXQgJG9wZW5lZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIEluc3RhbmNpYSBkZSBsYSBiYXNlIGRlIGRhdG9zO1xyXG4gICAgbGV0ICRyZXF1ZXN0ID0gbnVsbDtcclxuICAgIHRoaXoubW9kZWxzID0ge307XHJcblxyXG4gICAgLy8gQWdyZWdhciB1biBtYW5lamFkb3IgZGUgZXZlbnRvXHJcbiAgICB0aGl6LmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pe1xyXG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0ucHVzaChjYik7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvL1JlbXVldmUgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xyXG4gICAgdGhpei51bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHJldHVybjtcclxuXHJcbiAgICAgIC8vIEJ1c2NhciBlbCBjYlxyXG4gICAgICBjb25zdCBpZHggPSAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uaW5kZXhPZihjYik7XHJcblxyXG4gICAgICAvLyBTaSBzZSBlbmNvbnRybyBlbCBjYiByZW1vdmVybG9cclxuICAgICAgaWYgKGlkeCAhPSAtMSl7XHJcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEaXNwYXJhIHVuIGV2ZW50b1xyXG4gICAgdGhpei50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcclxuXHJcbiAgICAgICRsb2cubG9nKCRkYk5hbWUrJy52JysoJGRiVmVyc2lvbnx8MSkrJzogJytldmVudE5hbWUpO1xyXG5cclxuICAgICAgZm9yKGxldCBpIGluICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSl7XHJcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdW2ldLmFwcGx5KHRoaXosIGFyZ3MpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDYWxsYmFja3MgcGFyYSBsb3MgZXJyb3Jlc1xyXG4gICAgdGhpei5lcnJvciA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICB0aGl6LmJpbmQoaWRiRXZlbnRzLkRCX0VSUk9SLCBjYik7XHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBYnJpciB1bmEgQmFzZSBkZSBkYXRvcy5cclxuICAgIHRoaXoub3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCRvcGVuZWQpIHJldHVybiAkb3BlbkRlZmVyZWQ7XHJcblxyXG4gICAgICAvLyBDcmVhciB1biBudWV2byBkZWZlclxyXG4gICAgICAkb3BlbmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIC8vIGRlamFtb3MgYWJpZXJ0YSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcclxuICAgICAgZnVuY3Rpb24gcmVhZHkoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHJxID0gaW5kZXhlZERCLm9wZW4oJGRiTmFtZSwgJGRiVmVyc2lvbik7XHJcblxyXG4gICAgICAgIHJxLm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxyXG4gICAgICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGVsIHJlc3VsdGFkb1xyXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxyXG4gICAgICAgICAgJHJlcXVlc3QgPSBycTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gQXNpbmdhciBlbCBtYW5lamFkb3IgZGUgZXJyb3JlcyBhIGxhIEJEXHJcbiAgICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICRsb2cuZXJyb3IoJ0RhdGFiYXNlIGVycm9yOiAnKyBldmVudC50YXJnZXQuZXJyb3JDb2RlKTtcclxuICAgICAgICAgICAgdGhpei50cmlnZ2VyKGlkYkV2ZW50cy5EQl9FUlJPUiwgW2V2ZW50XSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgJG9wZW5EZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGUgZXJyb3Jlc1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEuZXJyb3JDb2RlIVxyXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZWplY3QocnEuZXJyb3JDb2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKCRkYk5hbWUpLm9uc3VjY2VzcyA9IHJlYWR5O1xyXG4gICAgICByZWFkeSgpO1xyXG5cclxuICAgICAgcmV0dXJuICRvcGVuRGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBudWV2byBtb2RlbG9cclxuICAgIHRoaXoubW9kZWwgPSBmdW5jdGlvbiAobmFtZSwgc29ja2V0KSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnXSk7XHJcblxyXG4gICAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsb1xyXG4gICAgICBsZXQgbW9kZWwgPSB0aGl6Lm1vZGVsc1tuYW1lXTtcclxuXHJcbiAgICAgIC8vIFNpIG5vIGV4aXN0ZSBlbCBtb2RlbG8gY3JlYXJcclxuICAgICAgaWYoIW1vZGVsKXtcclxuICAgICAgICBtb2RlbCA9IGlkYk1vZGVsKHRoaXosIG5hbWUsIHNvY2tldCB8fCAkc29ja2V0KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gR3VhcmRhciBlbCBtb2RlbG8gZW4gbG9zIG1vZGVsb3NcclxuICAgICAgdGhpei5tb2RlbHNbbmFtZV0gPSBtb2RlbDtcclxuXHJcbiAgICAgIC8vIFJldG9ybmFyIGVsIG1vZGVsb1xyXG4gICAgICByZXR1cm4gbW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmEgdW5hIGluc3RhbmNpYSBkZSB1biBxdWVyeVxyXG4gICAgdGhpei5xdWVyeSA9IGZ1bmN0aW9uIChNb2RlbCwgZmlsdGVycykge1xyXG5cclxuICAgICAgcmV0dXJuIG5ldyBpZGJRdWVyeSh0aGl6LCBNb2RlbCwgZmlsdGVycyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcclxuICAgIHRoaXouY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBtb2RlbElkKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XHJcbiAgICAgICAgcnEucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKG1vZGVsTmFtZSwgbW9kZWxJZCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXHJcbiAgICB0aGl6LmNyZWF0ZUluZGV4ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xyXG4gICAgICAgIGNvbnN0IHN0b3JlID0gcnEudHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUobW9kZWxOYW1lKTtcclxuICAgICAgICBzdG9yZS5jcmVhdGVJbmRleChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSB1bmEgdHJhbnNhY2Npw7NuXHJcbiAgICB0aGl6LnRyYW5zYWN0aW9uID0gZnVuY3Rpb24obW9kZWxOYW1lLCBwZXJtcywgYWN0aW9uLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdmdW5jdGlvbicsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XHJcblxyXG4gICAgICAvLyBDdWFuZG8gc2UgYWJyYSBsYSBCRFxyXG4gICAgICAkb3BlbkRlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcclxuICAgICAgICBjb25zdCB0eCA9IHJxLnJlc3VsdC50cmFuc2FjdGlvbihtb2RlbE5hbWUsIHBlcm1zKTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhY3Rpb24odHgpO1xyXG5cclxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXHJcbiAgICAgICAgdHgub25jb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCByZXN1bHQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXHJcbiAgICAgICAgdHgub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KHR4LmVycm9yKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEluc2VydGEgdW4gcmVnaXN0cm8gZW4gZWwgbW9kZWxvXHJcbiAgICB0aGl6LnB1dCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluc3RhbmNlLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAnZnVuY3Rpb24nXSwgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKGNiKTtcclxuXHJcbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXHJcbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZHdyaXRlJywgZnVuY3Rpb24gKHR4KSB7XHJcbiAgICAgICAgY29uc3QgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLnB1dCh7XHJcbiAgICAgICAgICB2YWx1ZXM6IGluc3RhbmNlLnZhbHVlcygpLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXHJcbiAgICAgICAgcnEub25zdWNjZXNzICA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBpbnN0YW5jZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICBycS5vbmVycm9yICA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIC8vIENvdWxkIGNhbGwgcnEucHJldmVudERlZmF1bHQoKSB0byBwcmV2ZW50IHRoZSB0cmFuc2FjdGlvbiBmcm9tIGFib3J0aW5nLlxyXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QocnEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBkZWZlcmVkLiRwcm9taXNlO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gT2J0aWVuZSB1biBlbGVtZW50byBwb3Igc2kga2V5XHJcbiAgICB0aGl6LmdldCA9IGZ1bmN0aW9uIChNb2RlbCwga2V5LCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nLCAnc3RyaW5nJywgbnVsbCwgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG4gICAgICBcclxuICAgICAgY29uc3QgZGF0YSA9IHt9O1xyXG4gICAgICBNb2RlbC5zZWFyY2hEZWVwRmllbGQoe30sIE1vZGVsLmdldEtleVBhdGgoKSwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICAgICAgb2JqW2xhc3RGaWVsZF0gPSBrZXk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgbW9kZWxOYW1lID0gTW9kZWwuZ2V0TW9kZWxOYW1lKCk7XHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XHJcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gTW9kZWwuZ2V0SW5zdGFuY2Uoa2V5LCBkYXRhKTtcclxuXHJcbiAgICAgIGluc3RhbmNlLiRwcm9taXNlID0gZGVmZXJlZC5wcm9taXNlO1xyXG4gICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBjb25zdCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XHJcbiAgICAgICAgY29uc3QgcnEgPSBzdG9yZS5nZXQoa2V5KTtcclxuXHJcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZiAocnEucmVzdWx0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLnNldEF0dHJpYnV0ZXMocnEucmVzdWx0LCB0cnVlKTtcclxuICAgICAgICAgICAgaW5zdGFuY2UuJGlzTmV3ID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGluc3RhbmNlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoaW5zdGFuY2UpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cclxuICAgIHRoaXouZmluZCA9IGZ1bmN0aW9uIChNb2RlbCwgZmlsdGVycywgY2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuICAgICAgY29uc3QgbW9kZWxOYW1lID0gTW9kZWwuZ2V0TW9kZWxOYW1lKCk7XHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cclxuICAgICAgcmVzdWx0LiRwcm9taXNlID0gZGVmZXJlZC5wcm9taXNlO1xyXG4gICAgICByZXN1bHQuJHJlc29sdmVkID0gZmFsc2U7XHJcblxyXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxyXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWRvbmx5JywgZnVuY3Rpb24gKHR4KSB7XHJcbiAgICAgICAgY29uc3Qgc3RvcmUgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpO1xyXG4gICAgICAgIGNvbnN0IHJxID0gc3RvcmUub3BlbkN1cnNvcigpO1xyXG5cclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IHJxLnJlc3VsdDtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gTm8gbW9yZSBtYXRjaGluZyByZWNvcmRzLlxyXG4gICAgICAgICAgaWYgKCFjdXJzb3Ipe1xyXG4gICAgICAgICAgICByZXN1bHQuJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBPYnRlbmVyIGxhIGluc3RhbmNpYVxyXG4gICAgICAgICAgY29uc3QgcmVjb3JkID0gTW9kZWwuZ2V0SW5zdGFuY2VGcm9tT2JqZWN0KGN1cnNvci52YWx1ZS52YWx1ZXMpO1xyXG4gICAgICAgICAgcmVjb3JkLiRpc05ldyA9IGZhbHNlOyAvLyBJbmljYXIgcXVlIG5vIGVzIHVuIHJlZ2lzdHJvIG51ZXZvXHJcblxyXG4gICAgICAgICAgLy8gQWdyZWdhciBhbCByZXN1bHRhZG9cclxuICAgICAgICAgIHJlc3VsdC5wdXNoKHJlY29yZCk7XHJcblxyXG4gICAgICAgICAgLy8gQnVzY2FyIHNpZ3VpZW50ZVxyXG4gICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhciBhbGlhcyBwYXJhIGxvcyBldmVudG9zIGVubGF6YXIgY2FsbGJhY2tzIGEgbG9zIGV2ZW50b3NcclxuICAgIGxldCBkZWZlcmVkcztcclxuICAgIE9iamVjdC5rZXlzKGRlZmVyZWRzID0ge1xyXG4gICAgICBvbk9wZW46ICRvcGVuRGVmZXJlZCxcclxuICAgICAgb25VcGdyYWRlTmVlZGVkOiAkdXBncmFkZU5lZWRlZERlZmVyZWQsXHJcbiAgICAgIG9uU29ja2V0Q29ubmVjdGVkOiAkc29ja2V0Q29ubmVjdGVkRGVmZXJlZFxyXG4gICAgfSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgIGNvbnN0IHRleHQgPSAkZGJOYW1lKycudicrKCRkYlZlcnNpb258fDEpKyc6ICcra2V5O1xyXG4gICAgICAgIGlmIChlcnIpe1xyXG4gICAgICAgICAgJGxvZy5lcnJvcih0ZXh0LCBlcnIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkbG9nLmxvZyh0ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGl6W2tleV0gPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XHJcbiAgICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoY2IpO1xyXG4gICAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gIH07XHJcblxyXG4gIHJldHVybiBpZGI7XHJcblxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJTZXJ2aWNlO1xuZnVuY3Rpb24gaWRiU2VydmljZSgkbG9nLCBxcywgaWRiVXRpbHMsIGlkYkV2ZW50cywgaWRiTW9kZWwsIGlkYlF1ZXJ5LCBpZGJTb2NrZXQsIGxiQXV0aCkge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cblxuICB2YXIgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xuICAvLyBObyB1c2UgXCJjb25zdCBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXG4gIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxuICB2YXIgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xuICB2YXIgSURCS2V5UmFuZ2UgPSB3aW5kb3cuSURCS2V5UmFuZ2UgfHwgd2luZG93LndlYmtpdElEQktleVJhbmdlIHx8IHdpbmRvdy5tc0lEQktleVJhbmdlO1xuICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxuXG4gIGlmICghaW5kZXhlZERCKSB7XG4gICAgYWxlcnQoXCJTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXNcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gQ2xhc2UgcGFyYSBsYSBjcmVhY2nDs24gZGUgaW5zdGFuY2lhcyBkZSBsYSBCRFxuICBmdW5jdGlvbiBpZGIoJGRiTmFtZSwgJGRiVmVyc2lvbiwgJHNvY2tldCkge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ251bWJlcicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgLy8gTWFuZWphZG9yZXMgZGUgZXZlbnRvcy5cbiAgICB2YXIgJGV2ZW50c0NhbGxiYWNrcyA9IHt9O1xuICAgIHZhciAkdXBncmFkZU5lZWRlZERlZmVyZWQgPSBxcy5kZWZlcigpO1xuICAgIHZhciAkb3BlbkRlZmVyZWQgPSBxcy5kZWZlcigpO1xuICAgIHZhciAkc29ja2V0Q29ubmVjdGVkRGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgdmFyICRvcGVuZWQgPSBmYWxzZTtcblxuICAgIC8vIEluc3RhbmNpYSBkZSBsYSBiYXNlIGRlIGRhdG9zO1xuICAgIHZhciAkcmVxdWVzdCA9IG51bGw7XG4gICAgdGhpei5tb2RlbHMgPSB7fTtcblxuICAgIC8vIEFncmVnYXIgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xuICAgIHRoaXouYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkge1xuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnB1c2goY2IpO1xuICAgIH07XG5cbiAgICAvL1JlbXVldmUgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xuICAgIHRoaXoudW5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSByZXR1cm47XG5cbiAgICAgIC8vIEJ1c2NhciBlbCBjYlxuICAgICAgdmFyIGlkeCA9ICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5pbmRleE9mKGNiKTtcblxuICAgICAgLy8gU2kgc2UgZW5jb250cm8gZWwgY2IgcmVtb3ZlcmxvXG4gICAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gRGlzcGFyYSB1biBldmVudG9cbiAgICB0aGl6LnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcblxuICAgICAgJGxvZy5sb2coJGRiTmFtZSArICcudicgKyAoJGRiVmVyc2lvbiB8fCAxKSArICc6ICcgKyBldmVudE5hbWUpO1xuXG4gICAgICBmb3IgKHZhciBpIGluICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkge1xuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpeiwgYXJncyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIENhbGxiYWNrcyBwYXJhIGxvcyBlcnJvcmVzXG4gICAgdGhpei5lcnJvciA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgdGhpei5iaW5kKGlkYkV2ZW50cy5EQl9FUlJPUiwgY2IpO1xuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIC8vIEFicmlyIHVuYSBCYXNlIGRlIGRhdG9zLlxuICAgIHRoaXoub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgkb3BlbmVkKSByZXR1cm4gJG9wZW5EZWZlcmVkO1xuXG4gICAgICAvLyBDcmVhciB1biBudWV2byBkZWZlclxuICAgICAgJG9wZW5lZCA9IHRydWU7XG5cbiAgICAgIC8vIGRlamFtb3MgYWJpZXJ0YSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcbiAgICAgIGZ1bmN0aW9uIHJlYWR5KCkge1xuXG4gICAgICAgIHZhciBycSA9IGluZGV4ZWREQi5vcGVuKCRkYk5hbWUsICRkYlZlcnNpb24pO1xuXG4gICAgICAgIHJxLm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLnJlc3VsdCFcbiAgICAgICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucmVzb2x2ZShldmVudCwgcnEpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlbCByZXN1bHRhZG9cbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxuICAgICAgICAgICRyZXF1ZXN0ID0gcnE7XG5cbiAgICAgICAgICAvLyBBc2luZ2FyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzIGEgbGEgQkRcbiAgICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAkbG9nLmVycm9yKCdEYXRhYmFzZSBlcnJvcjogJyArIGV2ZW50LnRhcmdldC5lcnJvckNvZGUpO1xuICAgICAgICAgICAgdGhpei50cmlnZ2VyKGlkYkV2ZW50cy5EQl9FUlJPUiwgW2V2ZW50XSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBycSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGUgZXJyb3Jlc1xuICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5lcnJvckNvZGUhXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAkb3BlbkRlZmVyZWQucmVqZWN0KHJxLmVycm9yQ29kZSk7XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICAvLyBpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UoJGRiTmFtZSkub25zdWNjZXNzID0gcmVhZHk7XG4gICAgICByZWFkeSgpO1xuXG4gICAgICByZXR1cm4gJG9wZW5EZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBBZ3JlZ2EgdW4gbnVldm8gbW9kZWxvXG4gICAgdGhpei5tb2RlbCA9IGZ1bmN0aW9uIChuYW1lLCBzb2NrZXQpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnXSk7XG5cbiAgICAgIC8vIEluc3RhbmNpYXIgZWwgbW9kZWxvXG4gICAgICB2YXIgbW9kZWwgPSB0aGl6Lm1vZGVsc1tuYW1lXTtcblxuICAgICAgLy8gU2kgbm8gZXhpc3RlIGVsIG1vZGVsbyBjcmVhclxuICAgICAgaWYgKCFtb2RlbCkge1xuICAgICAgICBtb2RlbCA9IGlkYk1vZGVsKHRoaXosIG5hbWUsIHNvY2tldCB8fCAkc29ja2V0KTtcbiAgICAgIH1cblxuICAgICAgLy8gR3VhcmRhciBlbCBtb2RlbG8gZW4gbG9zIG1vZGVsb3NcbiAgICAgIHRoaXoubW9kZWxzW25hbWVdID0gbW9kZWw7XG5cbiAgICAgIC8vIFJldG9ybmFyIGVsIG1vZGVsb1xuICAgICAgcmV0dXJuIG1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBDcmEgdW5hIGluc3RhbmNpYSBkZSB1biBxdWVyeVxuICAgIHRoaXoucXVlcnkgPSBmdW5jdGlvbiAoTW9kZWwsIGZpbHRlcnMpIHtcblxuICAgICAgcmV0dXJuIG5ldyBpZGJRdWVyeSh0aGl6LCBNb2RlbCwgZmlsdGVycyk7XG4gICAgfTtcblxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxuICAgIHRoaXouY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBtb2RlbElkKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XG4gICAgICAgIHJxLnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShtb2RlbE5hbWUsIG1vZGVsSWQpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxuICAgIHRoaXouY3JlYXRlSW5kZXggPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XG4gICAgICAgIHZhciBzdG9yZSA9IHJxLnRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XG4gICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIHVuYSB0cmFuc2FjY2nDs25cbiAgICB0aGl6LnRyYW5zYWN0aW9uID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgcGVybXMsIGFjdGlvbiwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKGNiKTtcblxuICAgICAgLy8gQ3VhbmRvIHNlIGFicmEgbGEgQkRcbiAgICAgICRvcGVuRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xuICAgICAgICB2YXIgdHggPSBycS5yZXN1bHQudHJhbnNhY3Rpb24obW9kZWxOYW1lLCBwZXJtcyk7XG4gICAgICAgIHZhciByZXN1bHQgPSBhY3Rpb24odHgpO1xuXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgdHgub25jb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCwgcmVzdWx0KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxuICAgICAgICB0eC5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KHR4LmVycm9yKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICB9O1xuXG4gICAgLy8gSW5zZXJ0YSB1biByZWdpc3RybyBlbiBlbCBtb2RlbG9cbiAgICB0aGl6LnB1dCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluc3RhbmNlLCBjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnb2JqZWN0JywgJ2Z1bmN0aW9uJ10sIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XG5cbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLnB1dCh7XG4gICAgICAgICAgdmFsdWVzOiBpbnN0YW5jZS52YWx1ZXMoKVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCwgaW5zdGFuY2UpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QocnEpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkLiRwcm9taXNlO1xuICAgIH07XG5cbiAgICAvLyBPYnRpZW5lIHVuIGVsZW1lbnRvIHBvciBzaSBrZXlcbiAgICB0aGl6LmdldCA9IGZ1bmN0aW9uIChNb2RlbCwga2V5LCBjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJywgJ3N0cmluZycsIG51bGwsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh7fSwgTW9kZWwuZ2V0S2V5UGF0aCgpLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgICAgb2JqW2xhc3RGaWVsZF0gPSBrZXk7XG4gICAgICB9KTtcblxuICAgICAgdmFyIG1vZGVsTmFtZSA9IE1vZGVsLmdldE1vZGVsTmFtZSgpO1xuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XG4gICAgICB2YXIgaW5zdGFuY2UgPSBNb2RlbC5nZXRJbnN0YW5jZShrZXksIGRhdGEpO1xuXG4gICAgICBpbnN0YW5jZS4kcHJvbWlzZSA9IGRlZmVyZWQucHJvbWlzZTtcbiAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IGZhbHNlO1xuXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWRvbmx5JywgZnVuY3Rpb24gKHR4KSB7XG4gICAgICAgIHZhciBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XG4gICAgICAgIHZhciBycSA9IHN0b3JlLmdldChrZXkpO1xuXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAocnEucmVzdWx0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaW5zdGFuY2Uuc2V0QXR0cmlidXRlcyhycS5yZXN1bHQsIHRydWUpO1xuICAgICAgICAgICAgaW5zdGFuY2UuJGlzTmV3ID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGluc3RhbmNlKTtcbiAgICAgICAgfTtcblxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGluc3RhbmNlKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfTtcblxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cbiAgICB0aGl6LmZpbmQgPSBmdW5jdGlvbiAoTW9kZWwsIGZpbHRlcnMsIGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuICAgICAgdmFyIG1vZGVsTmFtZSA9IE1vZGVsLmdldE1vZGVsTmFtZSgpO1xuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgIHJlc3VsdC4kcHJvbWlzZSA9IGRlZmVyZWQucHJvbWlzZTtcbiAgICAgIHJlc3VsdC4kcmVzb2x2ZWQgPSBmYWxzZTtcblxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcbiAgICAgICAgdmFyIHN0b3JlID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKTtcbiAgICAgICAgdmFyIHJxID0gc3RvcmUub3BlbkN1cnNvcigpO1xuXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgY3Vyc29yID0gcnEucmVzdWx0O1xuXG4gICAgICAgICAgLy8gTm8gbW9yZSBtYXRjaGluZyByZWNvcmRzLlxuICAgICAgICAgIGlmICghY3Vyc29yKSB7XG4gICAgICAgICAgICByZXN1bHQuJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcmVkLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBPYnRlbmVyIGxhIGluc3RhbmNpYVxuICAgICAgICAgIHZhciByZWNvcmQgPSBNb2RlbC5nZXRJbnN0YW5jZUZyb21PYmplY3QoY3Vyc29yLnZhbHVlLnZhbHVlcyk7XG4gICAgICAgICAgcmVjb3JkLiRpc05ldyA9IGZhbHNlOyAvLyBJbmljYXIgcXVlIG5vIGVzIHVuIHJlZ2lzdHJvIG51ZXZvXG5cbiAgICAgICAgICAvLyBBZ3JlZ2FyIGFsIHJlc3VsdGFkb1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHJlY29yZCk7XG5cbiAgICAgICAgICAvLyBCdXNjYXIgc2lndWllbnRlXG4gICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYXIgYWxpYXMgcGFyYSBsb3MgZXZlbnRvcyBlbmxhemFyIGNhbGxiYWNrcyBhIGxvcyBldmVudG9zXG4gICAgdmFyIGRlZmVyZWRzID0gdm9pZCAwO1xuICAgIE9iamVjdC5rZXlzKGRlZmVyZWRzID0ge1xuICAgICAgb25PcGVuOiAkb3BlbkRlZmVyZWQsXG4gICAgICBvblVwZ3JhZGVOZWVkZWQ6ICR1cGdyYWRlTmVlZGVkRGVmZXJlZCxcbiAgICAgIG9uU29ja2V0Q29ubmVjdGVkOiAkc29ja2V0Q29ubmVjdGVkRGVmZXJlZFxuICAgIH0pLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gJGRiTmFtZSArICcudicgKyAoJGRiVmVyc2lvbiB8fCAxKSArICc6ICcgKyBrZXk7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAkbG9nLmVycm9yKHRleHQsIGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGxvZy5sb2codGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpeltrZXldID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcbiAgICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoY2IpO1xuICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGlkYjtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiTW9kZWxTZXJ2aWNlICgkbG9nLCBxcywgaWRiVXRpbHMsIGxiUmVzb3VyY2UsICR0aW1lb3V0KSB7ICduZ0luamVjdCc7XHJcblxyXG4gIHJldHVybiBmdW5jdGlvbiBpZGJNb2RlbCAoJGRiLCAkbW9kZWxOYW1lLCAkc29ja2V0KSB7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtudWxsICwnc3RyaW5nJ10pO1xyXG5cclxuICAgIC8vIENsYXZlIGRlbCBtb2RlbG9cclxuICAgIGNvbnN0ICRpZCA9IHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9O1xyXG4gICAgY29uc3QgJGluc3RhbmNlcyA9IHt9O1xyXG4gICAgbGV0ICRmaWVsZHMgPSB7fTtcclxuICAgIGxldCAkcmVtb3RlID0gbnVsbDtcclxuXHJcbiAgICAvLyBDb25zdHVjdG9yIGRlbCBtb2RlbG9cclxuICAgIGZ1bmN0aW9uIE1vZGVsKGRhdGEpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIHRoaXMuJHJlY29yZCA9IG51bGw7XHJcbiAgICAgIHRoaXMuJG9yaWdpbmFsVmFsdWVzID0ge307XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZXMoZGF0YSB8fCB7fSwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuY29uc3RydWN0b3IoZGF0YSk7XHJcblxyXG4gICAgICBpZiAoJHNvY2tldCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuKCk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHYgZWwgbm9tYnJlIGRlbCBtb2RlbG9cclxuICAgIE1vZGVsLmdldE1vZGVsTmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHJldHVybiAkbW9kZWxOYW1lO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdiBlbCBub21icmUgZGVsIG1vZGVsb1xyXG4gICAgTW9kZWwuZ2V0S2V5UGF0aCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHJldHVybiAkaWQua2V5UGF0aDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cclxuICAgIE1vZGVsLmF1dG9JbmNyZW1lbnQgPSBmdW5jdGlvbiAoYXV0b0luY3JlbWVudCkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnYm9vbGVhbiddKTtcclxuXHJcbiAgICAgICRpZC5hdXRvSW5jcmVtZW50ID0gYXV0b0luY3JlbWVudDtcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xyXG4gICAgTW9kZWwua2V5UGF0aCA9IGZ1bmN0aW9uIChrZXlQYXRoKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnXSk7XHJcblxyXG4gICAgICAkaWQua2V5UGF0aCA9IGtleVBhdGg7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgZWwgb2JqZWN0byBzdG9yYWdlIHBhcmEgZWwgbW9kZWxvLlxyXG4gICAgTW9kZWwuY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAkZGIuY3JlYXRlU3RvcmUoJG1vZGVsTmFtZSwgJGlkKTtcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQWdyZWdhIHVuIGluZGV4XHJcbiAgICBNb2RlbC5pbmRleCA9IGZ1bmN0aW9uIChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xyXG4gICAgICAkZGIuY3JlYXRlSW5kZXgoJG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE3DqXRvZG8gcXVlIHBlcm1pdGUgbW9kaWZpY2FyIG1vZGVsLlxyXG4gICAgTW9kZWwuYnVpbGQgPSBmdW5jdGlvbiAoYnVpbGRDYWxsYmFjaykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICBidWlsZENhbGxiYWNrKE1vZGVsKTtcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgbGEgZXNwZWNpZmljYWNpw7NuIGRlIGxvcyBjYW1wb3NcclxuICAgIE1vZGVsLmZpZWxkcyA9IGZ1bmN0aW9uIChmaWVsZHMpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcclxuXHJcbiAgICAgICRmaWVsZHMgPSB7fTtcclxuICAgICAgJGZpZWxkc1skaWQua2V5UGF0aF0gPSB7XHJcbiAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCIsXHJcbiAgICAgICAgXCJyZXF1aXJlZFwiOiB0cnVlXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBPYmplY3Qua2V5cyhmaWVsZHMpLm1hcChmdW5jdGlvbiAoZmllbGROYW1lKSB7XHJcbiAgICAgICAgbGV0IGZpZWxkID0gZmllbGRzW2ZpZWxkTmFtZV07XHJcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZHNbZmllbGROYW1lXSA9PSAnc3RyaW5nJyl7XHJcbiAgICAgICAgICBmaWVsZCA9IHsgXCJ0eXBlXCI6IGZpZWxkIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRmaWVsZHNbZmllbGROYW1lXSA9IGZpZWxkO1xyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENvbmZpZ3VyYSBlbCByZW1vdGUgYXBpO1xyXG4gICAgTW9kZWwucmVtb3RlID0gZnVuY3Rpb24gKHVybCwgYXJncywgYWN0aW9ucykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCcsICdvYmplY3QnXSk7XHJcblxyXG4gICAgICAkcmVtb3RlID0gbGJSZXNvdXJjZSh1cmwsIGFyZ3MsIGFjdGlvbnMpO1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgbnVldmFzIGluc3RhbmNpYXMgZGUgbG9zIG1vZGVsb3NcclxuICAgIE1vZGVsLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgLy8gU2kgZXMgdW4gYXJyYXlcclxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gTW9kZWwuZ2V0SW5zdGFuY2VGcm9tT2JqZWN0KGRhdGEsIG51bGwpXHJcbiAgICAgICAgICAuc2F2ZShjYik7XHJcbiAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgLy8gT2J0ZW5lciB1bmEgY29waWEgZGVsIGFycmF5XHJcbiAgICAgIGNvbnN0IGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRhdGEpO1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKGNiKTtcclxuXHJcbiAgICAgIChmdW5jdGlvbiBpdGVyYXRpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyBObyBxdWVkYW4gZWxlbWVudG9zIGVuIGVsIGFycmF5XHJcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT0gMCkgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZShyZXN1bHQpO1xyXG5cclxuICAgICAgICAvLyBDcmVhciBlbCBzaWd1aWVudGUgZWxlbWVudG9cclxuICAgICAgICBNb2RlbC5jcmVhdGUoYXJyLnNoaWZ0KCksIGZ1bmN0aW9uIChlcnIsIGluc3RhbmNlKSB7XHJcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZGVmZXJlZC5yZWplY3QoZXJyKTtcclxuICAgICAgICAgIHJlc3VsdC5wdXNoKGluc3RhbmNlKTtcclxuICAgICAgICAgIGl0ZXJhdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSkoKTtcclxuXHJcbiAgICAgIC8vIERldm9sdmVyIGVsIHByb21pc2VcclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBCdXNjYXIgdW4gY2FtcG9cclxuICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCA9IGZ1bmN0aW9uIChvYmosIGZpZWxkLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgJ3N0cmluZycsICdmdW5jdGlvbiddKTtcclxuXHJcbiAgICAgIGNvbnN0IGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XHJcbiAgICAgIGNvbnN0IGxhc3RGaWVsZCA9IGZpZWxkcy5wb3AoKTtcclxuXHJcbiAgICAgIHJldHVybiAoZnVuY3Rpb24gX3NldChvYmopIHtcclxuICAgICAgICBpZiAoZmllbGRzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgcmV0dXJuIGNiKG9iaiwgbGFzdEZpZWxkKTtcclxuICAgICAgICBjb25zdCBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW2ZpZWxkXSA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAgICBvYmpbZmllbGRdID0ge307XHJcbiAgICAgICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XHJcbiAgICAgIH0pKG9iaik7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBjb3JyZXNwb25kaWVudGUgYWwga2V5IGRlIHVuIG9iamV0b1xyXG4gICAgTW9kZWwuZ2V0S2V5RnJvbSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgIHJldHVybiBNb2RlbC5zZWFyY2hEZWVwRmllbGQoZGF0YSwgJGlkLmtleVBhdGgsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgbW9kZWwgZGUgbGFzIGd1YXJkYWRhcy4gU2kgbm8gZXhpc3RlIGVudG9uY2VcclxuICAgIC8vIHNlIGNyZWFcclxuICAgIE1vZGVsLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKGtleSwgZGF0YSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ3N0cmluZycsICdudW1iZXInLCAndW5kZWZpbmVkJ10sIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcclxuICAgICAgaWYgKCFrZXkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1vZGVsKGRhdGEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBObyBleGlzdGUgbGEgaW5zdGFuY2lhIGVudG9uY2Ugc2UgY3JlYVxyXG4gICAgICBpZiAoISRpbnN0YW5jZXNba2V5XSl7XHJcbiAgICAgICAgJGluc3RhbmNlc1trZXldID0gbmV3IE1vZGVsKGRhdGEpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gJGluc3RhbmNlc1trZXldO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIHVuYSBpbnN0YW5jaWEgZGVsIG1vZGVsbyBhIHBhcnRpciBkZSB1biBvYmplY3RcclxuICAgIE1vZGVsLmdldEluc3RhbmNlRnJvbU9iamVjdCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnXSk7XHJcblxyXG4gICAgICByZXR1cm4gTW9kZWwuZ2V0SW5zdGFuY2UoTW9kZWwuZ2V0S2V5RnJvbShkYXRhKSwgZGF0YSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBCdXNjYSB1biByZWdpc3RybyBlbiBsYSBvYmplY3RTdG9yZSBkZWwgbW9kZWxvLlxyXG4gICAgTW9kZWwuZ2V0ID0gZnVuY3Rpb24gKGtleSwgY2IpIHtcclxuXHJcbiAgICAgIHJldHVybiAkZGIuZ2V0KE1vZGVsLCBrZXksIGNiKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cclxuICAgIE1vZGVsLmZpbmQgPSBmdW5jdGlvbiAoZmlsdGVycykge1xyXG4gICAgICAvLyBsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgIC8vIGNiID0gYXJncy5wb3AoKTsgZmlsdGVycyA9IGFyZ3MucG9wKCk7XHJcbiAgICAgIC8vIGlmICgkcmVtb3RlKSB7XHJcbiAgICAgIC8vICAgLy8gQnVzY2FyIGxvcyByZWdpc3Ryb3MgZW4gbGEgQVBJXHJcbiAgICAgIC8vICAgJHJlbW90ZS5maW5kKGZpbHRlcnMsIGNiKS4kcHJvbWlzZVxyXG4gICAgICAvLyAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAvLyAgICAgICByZXN1bHQubWFwKGZ1bmN0aW9uIChyZWNvcmQsIGlkeCkge1xyXG5cclxuICAgICAgLy8gICAgICAgICBNb2RlbC5nZXQoTW9kZWwuZ2V0S2V5RnJvbShyZWNvcmQpKS4kcHJvbWlzZVxyXG4gICAgICAvLyAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGluc3RhbmNlKSB7XHJcbiAgICAgIC8vICAgICAgICAgICAgIGluc3RhbmNlXHJcbiAgICAgIC8vICAgICAgICAgICAgICAgLnNldEF0dHJpYnV0ZXMocmVjb3JkKVxyXG4gICAgICAvLyAgICAgICAgICAgICAgIC5yZXNvdXJjZShyZWNvcmQpO1xyXG4gICAgICAvLyAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuJGlzTmV3KXtcclxuICAgICAgLy8gICAgICAgICAgICAgICBpbnN0YW5jZS5jcmVhdGUoKTtcclxuICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAvLyAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyAgICAgICB9KTtcclxuICAgICAgLy8gICAgIH0pXHJcbiAgICAgIC8vICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAvLyAgICAgICBjb25zb2xlLmxvZyhbJ2VycicsIGVycl0pXHJcbiAgICAgIC8vICAgICB9KTtcclxuICAgICAgLy8gfVxyXG4gICAgICByZXR1cm4gJGRiLnF1ZXJ5KE1vZGVsLCBmaWx0ZXJzKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBsb3MgYXRyaWJ1dG9zXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuc2V0QXR0cmlidXRlcyA9IGZ1bmN0aW9uIChkYXRhLCBvcmlnaW5hbCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdib29sZWFuJ10pO1xyXG4gICAgICBcclxuICAgICAgT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xyXG4gICAgICAgIHRoaXouc2V0KHByb3BlcnR5LCBkYXRhW3Byb3BlcnR5XSwgb3JpZ2luYWwpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxyXG4gICAgTW9kZWwucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChmaWVsZCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgIHJldHVybiBNb2RlbC5zZWFyY2hEZWVwRmllbGQodGhpeiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgZWwgSUQgZGVsIG9iamV0b1xyXG4gICAgTW9kZWwucHJvdG90eXBlLnNldEtleSA9IGZ1bmN0aW9uIChuZXdLZXkpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCBvbGRLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKHRoaXopO1xyXG5cclxuICAgICAgTW9kZWwuc2VhcmNoRGVlcEZpZWxkKHRoaXosICRpZC5rZXlQYXRoLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IG5ld0tleTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAob2xkS2V5ICE9PSBuZXdLZXkpIHtcclxuXHJcbiAgICAgICAgaWYgKG9sZEtleSAmJiAkaW5zdGFuY2VzW29sZEtleV0gJiYgJGluc3RhbmNlc1tvbGRLZXldICE9IHRoaXopIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk9sZEtleUlzTm90U2FtZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV3S2V5ICYmICRpbnN0YW5jZXNbbmV3S2V5XSAmJiAkaW5zdGFuY2VzW25ld0tleV0gIT0gdGhpeikge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5JbnN0YW5jZU9mTmV3S2V5SXNOb3RTYW1lJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFbGltaW5hciBhbnRlcmlvclxyXG4gICAgICAgIGlmIChvbGRLZXkgJiYgJGluc3RhbmNlc1tvbGRLZXldKSB7XHJcbiAgICAgICAgICBkZWxldGUgJGluc3RhbmNlc1tvbGRLZXldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWdyZWdhciBudWV2YVxyXG4gICAgICAgIGlmIChuZXdLZXkgJiYgISRpbnN0YW5jZXNbbmV3S2V5XSkge1xyXG4gICAgICAgICAgJGluc3RhbmNlc1tuZXdLZXldID0gdGhpejtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cclxuICAgIE1vZGVsLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoZmllbGQsIHZhbHVlLCBvcmlnaW5hbCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIG51bGwsICdib29sZWFuJ10pO1xyXG5cclxuICAgICAgaWYgKGZpZWxkID09PSAkaWQua2V5UGF0aCl7XHJcbiAgICAgICAgdGhpei5zZXRLZXkodmFsdWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGl6LCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAob3JpZ2luYWwpIHtcclxuICAgICAgICBNb2RlbC5zZWFyY2hEZWVwRmllbGQodGhpei4kb3JpZ2luYWxWYWx1ZXMsIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgICAgIG9ialtsYXN0RmllbGRdID0gdmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBPYnRpZW5lIGxvcyB2YWxvcmVzIHJlYWxlcyBhY3R1YWxlcyBwYXJhIGd1YXJkYXIgZW4gZWwgc3RvcmVcclxuICAgIE1vZGVsLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBjb25zdCB2YWx1ZXMgPSB7fTtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKCRmaWVsZHMpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICBNb2RlbC5zZWFyY2hEZWVwRmllbGQodmFsdWVzLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IHRoaXouZ2V0KGZpZWxkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gdmFsdWVzO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ29uc3R1cmN0b3IgcXVlIHNlIHB1ZWRlIHNvYnJlIGVzY3JpYmlyXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSBzaSBlbCBvYmpldG8gZXN0w6EgYWxtYWNlbmFkb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLmlzU3RvcmVkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgcmV0dXJuICRpbnN0YW5jZXNbdGhpcy5nZXQoJGlkLmtleVBhdGgpXSA9PT0gdGhpcztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEd1YXJkYSBsb3MgZGF0b3MgZGVsIG9iamV0b1xyXG4gICAgTW9kZWwucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbiAoY2IpeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddKTtcclxuXHJcbiAgICAgIHJldHVybiAkZGIucHV0KCRtb2RlbE5hbWUsIHRoaXMsIGZ1bmN0aW9uIChlcnIsIGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGVycikgeyBpZiAoY2IpIGNiKGVycik7IHJldHVybjsgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBnZW5lcmFkbyBhbCBtb2RlbG9cclxuICAgICAgICBjb25zdCBrZXkgPSBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICAgIHRoaXouc2V0S2V5KGtleSk7XHJcbiAgICAgICAgdGhpei4kaXNOZXcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKGNiKSBjYi5hcHBseShudWxsLCBbbnVsbF0uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBGdW5jaW9uIHF1ZSBoYWNlIGVzY3VjaGFycyBsb3MgbWVuc2FqZXMgZGVsIHNvY2tldCBwYXJhIGVsIG1vZGVsXHJcbiAgICBNb2RlbC5wcm90b3R5cGUubGlzdGVuID0gZnVuY3Rpb24gKCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWYgKCEkc29ja2V0KSB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkRvZXNOb3RIYXZlU29ja2V0SW5zdGFuY2UnKTtcclxuXHJcbiAgICAgICRzb2NrZXQuc3Vic2NyaWJlKHtcclxuICAgICAgICBtb2RlbE5hbWU6ICRtb2RlbE5hbWUsXHJcbiAgICAgICAgZXZlbnROYW1lOiAndXBkYXRlJyxcclxuICAgICAgICBtb2RlbElkOiB0aGl6LmdldChNb2RlbC5nZXRLZXlQYXRoKCkpLFxyXG4gICAgICB9LCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHRoaXouc2V0QXR0cmlidXRlcyhkYXRhIHx8IHt9LCB0cnVlKTtcclxuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB0aGl6LnNhdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgbGEgaW5zdGFuY2lhIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLnJlc291cmNlID0gZnVuY3Rpb24gKHJlY29yZCkge1xyXG4gICAgICB0aGlzLiRyZWNvcmQgPSByZWNvcmQ7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gIH07XHJcblxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYk1vZGVsU2VydmljZTtcbmZ1bmN0aW9uIGlkYk1vZGVsU2VydmljZSgkbG9nLCBxcywgaWRiVXRpbHMsIGxiUmVzb3VyY2UsICR0aW1lb3V0KSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGlkYk1vZGVsKCRkYiwgJG1vZGVsTmFtZSwgJHNvY2tldCkge1xuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW251bGwsICdzdHJpbmcnXSk7XG5cbiAgICAvLyBDbGF2ZSBkZWwgbW9kZWxvXG4gICAgdmFyICRpZCA9IHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9O1xuICAgIHZhciAkaW5zdGFuY2VzID0ge307XG4gICAgdmFyICRmaWVsZHMgPSB7fTtcbiAgICB2YXIgJHJlbW90ZSA9IG51bGw7XG5cbiAgICAvLyBDb25zdHVjdG9yIGRlbCBtb2RlbG9cbiAgICBmdW5jdGlvbiBNb2RlbChkYXRhKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB0aGlzLiRyZWNvcmQgPSBudWxsO1xuICAgICAgdGhpcy4kb3JpZ2luYWxWYWx1ZXMgPSB7fTtcblxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGVzKGRhdGEgfHwge30sIHRydWUpO1xuICAgICAgdGhpcy5jb25zdHJ1Y3RvcihkYXRhKTtcblxuICAgICAgaWYgKCRzb2NrZXQpIHtcbiAgICAgICAgdGhpcy5saXN0ZW4oKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gRGV2dWVsdiBlbCBub21icmUgZGVsIG1vZGVsb1xuICAgIE1vZGVsLmdldE1vZGVsTmFtZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgcmV0dXJuICRtb2RlbE5hbWU7XG4gICAgfTtcblxuICAgIC8vIERldnVlbHYgZWwgbm9tYnJlIGRlbCBtb2RlbG9cbiAgICBNb2RlbC5nZXRLZXlQYXRoID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICByZXR1cm4gJGlkLmtleVBhdGg7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cbiAgICBNb2RlbC5hdXRvSW5jcmVtZW50ID0gZnVuY3Rpb24gKGF1dG9JbmNyZW1lbnQpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydib29sZWFuJ10pO1xuXG4gICAgICAkaWQuYXV0b0luY3JlbWVudCA9IGF1dG9JbmNyZW1lbnQ7XG4gICAgICByZXR1cm4gTW9kZWw7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cbiAgICBNb2RlbC5rZXlQYXRoID0gZnVuY3Rpb24gKGtleVBhdGgpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnXSk7XG5cbiAgICAgICRpZC5rZXlQYXRoID0ga2V5UGF0aDtcbiAgICAgIHJldHVybiBNb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RvIHN0b3JhZ2UgcGFyYSBlbCBtb2RlbG8uXG4gICAgTW9kZWwuY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICRkYi5jcmVhdGVTdG9yZSgkbW9kZWxOYW1lLCAkaWQpO1xuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBBZ3JlZ2EgdW4gaW5kZXhcbiAgICBNb2RlbC5pbmRleCA9IGZ1bmN0aW9uIChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xuICAgICAgJGRiLmNyZWF0ZUluZGV4KCRtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcbiAgICAgIHJldHVybiBNb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gTcOpdG9kbyBxdWUgcGVybWl0ZSBtb2RpZmljYXIgbW9kZWwuXG4gICAgTW9kZWwuYnVpbGQgPSBmdW5jdGlvbiAoYnVpbGRDYWxsYmFjaykge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICBidWlsZENhbGxiYWNrKE1vZGVsKTtcbiAgICAgIHJldHVybiBNb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQXNpZ25hIGxhIGVzcGVjaWZpY2FjacOzbiBkZSBsb3MgY2FtcG9zXG4gICAgTW9kZWwuZmllbGRzID0gZnVuY3Rpb24gKGZpZWxkcykge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcblxuICAgICAgJGZpZWxkcyA9IHt9O1xuICAgICAgJGZpZWxkc1skaWQua2V5UGF0aF0gPSB7XG4gICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiLFxuICAgICAgICBcInJlcXVpcmVkXCI6IHRydWVcbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5rZXlzKGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZE5hbWUpIHtcbiAgICAgICAgdmFyIGZpZWxkID0gZmllbGRzW2ZpZWxkTmFtZV07XG4gICAgICAgIGlmICh0eXBlb2YgZmllbGRzW2ZpZWxkTmFtZV0gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBmaWVsZCA9IHsgXCJ0eXBlXCI6IGZpZWxkIH07XG4gICAgICAgIH1cbiAgICAgICAgJGZpZWxkc1tmaWVsZE5hbWVdID0gZmllbGQ7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBDb25maWd1cmEgZWwgcmVtb3RlIGFwaTtcbiAgICBNb2RlbC5yZW1vdGUgPSBmdW5jdGlvbiAodXJsLCBhcmdzLCBhY3Rpb25zKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCcsICdvYmplY3QnXSk7XG5cbiAgICAgICRyZW1vdGUgPSBsYlJlc291cmNlKHVybCwgYXJncywgYWN0aW9ucyk7XG4gICAgICByZXR1cm4gTW9kZWw7XG4gICAgfTtcblxuICAgIC8vIENyZWEgbnVldmFzIGluc3RhbmNpYXMgZGUgbG9zIG1vZGVsb3NcbiAgICBNb2RlbC5jcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIC8vIFNpIGVzIHVuIGFycmF5XG4gICAgICBpZiAoZGF0YS5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gTW9kZWwuZ2V0SW5zdGFuY2VGcm9tT2JqZWN0KGRhdGEsIG51bGwpLnNhdmUoY2IpO1xuICAgICAgfVxuXG4gICAgICAvLyBPYnRlbmVyIHVuYSBjb3BpYSBkZWwgYXJyYXlcbiAgICAgIHZhciBhcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhKTtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoY2IpO1xuXG4gICAgICAoZnVuY3Rpb24gaXRlcmF0aW9uKCkge1xuXG4gICAgICAgIC8vIE5vIHF1ZWRhbiBlbGVtZW50b3MgZW4gZWwgYXJyYXlcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT0gMCkgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZShyZXN1bHQpO1xuXG4gICAgICAgIC8vIENyZWFyIGVsIHNpZ3VpZW50ZSBlbGVtZW50b1xuICAgICAgICBNb2RlbC5jcmVhdGUoYXJyLnNoaWZ0KCksIGZ1bmN0aW9uIChlcnIsIGluc3RhbmNlKSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRlZmVyZWQucmVqZWN0KGVycik7XG4gICAgICAgICAgcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xuICAgICAgICAgIGl0ZXJhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICAgIH0pKCk7XG5cbiAgICAgIC8vIERldm9sdmVyIGVsIHByb21pc2VcbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBCdXNjYXIgdW4gY2FtcG9cbiAgICBNb2RlbC5zZWFyY2hEZWVwRmllbGQgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICB2YXIgZmllbGRzID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICAgIHZhciBsYXN0RmllbGQgPSBmaWVsZHMucG9wKCk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiBfc2V0KG9iaikge1xuICAgICAgICBpZiAoZmllbGRzLmxlbmd0aCA9PSAwKSByZXR1cm4gY2Iob2JqLCBsYXN0RmllbGQpO1xuICAgICAgICB2YXIgZmllbGQgPSBmaWVsZHMuc2hpZnQoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAndW5kZWZpbmVkJykgb2JqW2ZpZWxkXSA9IHt9O1xuICAgICAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcbiAgICAgIH0ob2JqKTtcbiAgICB9O1xuXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgY29ycmVzcG9uZGllbnRlIGFsIGtleSBkZSB1biBvYmpldG9cbiAgICBNb2RlbC5nZXRLZXlGcm9tID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHJldHVybiBNb2RlbC5zZWFyY2hEZWVwRmllbGQoZGF0YSwgJGlkLmtleVBhdGgsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gRGV2dWVsdmUgbGEgaW5zdGFuY2lhIGRlbCBtb2RlbCBkZSBsYXMgZ3VhcmRhZGFzLiBTaSBubyBleGlzdGUgZW50b25jZVxuICAgIC8vIHNlIGNyZWFcbiAgICBNb2RlbC5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uIChrZXksIGRhdGEpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snc3RyaW5nJywgJ251bWJlcicsICd1bmRlZmluZWQnXSwgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgLy8gRWwgb2JqZXRvIG5vIHRpZW5lIElEXG4gICAgICBpZiAoIWtleSkge1xuICAgICAgICByZXR1cm4gbmV3IE1vZGVsKGRhdGEpO1xuICAgICAgfVxuXG4gICAgICAvLyBObyBleGlzdGUgbGEgaW5zdGFuY2lhIGVudG9uY2Ugc2UgY3JlYVxuICAgICAgaWYgKCEkaW5zdGFuY2VzW2tleV0pIHtcbiAgICAgICAgJGluc3RhbmNlc1trZXldID0gbmV3IE1vZGVsKGRhdGEpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJGluc3RhbmNlc1trZXldO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIHVuYSBpbnN0YW5jaWEgZGVsIG1vZGVsbyBhIHBhcnRpciBkZSB1biBvYmplY3RcbiAgICBNb2RlbC5nZXRJbnN0YW5jZUZyb21PYmplY3QgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcblxuICAgICAgcmV0dXJuIE1vZGVsLmdldEluc3RhbmNlKE1vZGVsLmdldEtleUZyb20oZGF0YSksIGRhdGEpO1xuICAgIH07XG5cbiAgICAvLyBCdXNjYSB1biByZWdpc3RybyBlbiBsYSBvYmplY3RTdG9yZSBkZWwgbW9kZWxvLlxuICAgIE1vZGVsLmdldCA9IGZ1bmN0aW9uIChrZXksIGNiKSB7XG5cbiAgICAgIHJldHVybiAkZGIuZ2V0KE1vZGVsLCBrZXksIGNiKTtcbiAgICB9O1xuXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xuICAgIE1vZGVsLmZpbmQgPSBmdW5jdGlvbiAoZmlsdGVycykge1xuICAgICAgLy8gbGV0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgLy8gY2IgPSBhcmdzLnBvcCgpOyBmaWx0ZXJzID0gYXJncy5wb3AoKTtcbiAgICAgIC8vIGlmICgkcmVtb3RlKSB7XG4gICAgICAvLyAgIC8vIEJ1c2NhciBsb3MgcmVnaXN0cm9zIGVuIGxhIEFQSVxuICAgICAgLy8gICAkcmVtb3RlLmZpbmQoZmlsdGVycywgY2IpLiRwcm9taXNlXG4gICAgICAvLyAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgLy8gICAgICAgcmVzdWx0Lm1hcChmdW5jdGlvbiAocmVjb3JkLCBpZHgpIHtcblxuICAgICAgLy8gICAgICAgICBNb2RlbC5nZXQoTW9kZWwuZ2V0S2V5RnJvbShyZWNvcmQpKS4kcHJvbWlzZVxuICAgICAgLy8gICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgLy8gICAgICAgICAgICAgaW5zdGFuY2VcbiAgICAgIC8vICAgICAgICAgICAgICAgLnNldEF0dHJpYnV0ZXMocmVjb3JkKVxuICAgICAgLy8gICAgICAgICAgICAgICAucmVzb3VyY2UocmVjb3JkKTtcbiAgICAgIC8vICAgICAgICAgICAgIGlmIChpbnN0YW5jZS4kaXNOZXcpe1xuICAgICAgLy8gICAgICAgICAgICAgICBpbnN0YW5jZS5jcmVhdGUoKTtcbiAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgIC8vICAgICAgICAgICB9KTtcblxuICAgICAgLy8gICAgICAgfSk7XG4gICAgICAvLyAgICAgfSlcbiAgICAgIC8vICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgLy8gICAgICAgY29uc29sZS5sb2coWydlcnInLCBlcnJdKVxuICAgICAgLy8gICAgIH0pO1xuICAgICAgLy8gfVxuICAgICAgcmV0dXJuICRkYi5xdWVyeShNb2RlbCwgZmlsdGVycyk7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBsb3MgYXRyaWJ1dG9zXG4gICAgTW9kZWwucHJvdG90eXBlLnNldEF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoZGF0YSwgb3JpZ2luYWwpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnYm9vbGVhbiddKTtcblxuICAgICAgT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICB0aGl6LnNldChwcm9wZXJ0eSwgZGF0YVtwcm9wZXJ0eV0sIG9yaWdpbmFsKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxuICAgIE1vZGVsLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgcmV0dXJuIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGl6LCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBBc2lnbmEgZWwgSUQgZGVsIG9iamV0b1xuICAgIE1vZGVsLnByb3RvdHlwZS5zZXRLZXkgPSBmdW5jdGlvbiAobmV3S2V5KSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIHZhciBvbGRLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKHRoaXopO1xuXG4gICAgICBNb2RlbC5zZWFyY2hEZWVwRmllbGQodGhpeiwgJGlkLmtleVBhdGgsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IG5ld0tleTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAob2xkS2V5ICE9PSBuZXdLZXkpIHtcblxuICAgICAgICBpZiAob2xkS2V5ICYmICRpbnN0YW5jZXNbb2xkS2V5XSAmJiAkaW5zdGFuY2VzW29sZEtleV0gIT0gdGhpeikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk9sZEtleUlzTm90U2FtZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdLZXkgJiYgJGluc3RhbmNlc1tuZXdLZXldICYmICRpbnN0YW5jZXNbbmV3S2V5XSAhPSB0aGl6KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5JbnN0YW5jZU9mTmV3S2V5SXNOb3RTYW1lJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbGltaW5hciBhbnRlcmlvclxuICAgICAgICBpZiAob2xkS2V5ICYmICRpbnN0YW5jZXNbb2xkS2V5XSkge1xuICAgICAgICAgIGRlbGV0ZSAkaW5zdGFuY2VzW29sZEtleV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZ3JlZ2FyIG51ZXZhXG4gICAgICAgIGlmIChuZXdLZXkgJiYgISRpbnN0YW5jZXNbbmV3S2V5XSkge1xuICAgICAgICAgICRpbnN0YW5jZXNbbmV3S2V5XSA9IHRoaXo7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBpbiB2YWxvciBhIHVuIGNhbXBvXG4gICAgTW9kZWwucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChmaWVsZCwgdmFsdWUsIG9yaWdpbmFsKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgbnVsbCwgJ2Jvb2xlYW4nXSk7XG5cbiAgICAgIGlmIChmaWVsZCA9PT0gJGlkLmtleVBhdGgpIHtcbiAgICAgICAgdGhpei5zZXRLZXkodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgTW9kZWwuc2VhcmNoRGVlcEZpZWxkKHRoaXosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9yaWdpbmFsKSB7XG4gICAgICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGl6LiRvcmlnaW5hbFZhbHVlcywgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICAgIG9ialtsYXN0RmllbGRdID0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgLy8gT2J0aWVuZSBsb3MgdmFsb3JlcyByZWFsZXMgYWN0dWFsZXMgcGFyYSBndWFyZGFyIGVuIGVsIHN0b3JlXG4gICAgTW9kZWwucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciB2YWx1ZXMgPSB7fTtcblxuICAgICAgT2JqZWN0LmtleXMoJGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBNb2RlbC5zZWFyY2hEZWVwRmllbGQodmFsdWVzLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgICAgb2JqW2xhc3RGaWVsZF0gPSB0aGl6LmdldChmaWVsZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfTtcblxuICAgIC8vIENvbnN0dXJjdG9yIHF1ZSBzZSBwdWVkZSBzb2JyZSBlc2NyaWJpclxuICAgIE1vZGVsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7fTtcblxuICAgIC8vIERldnVlbHZlIHNpIGVsIG9iamV0byBlc3TDoSBhbG1hY2VuYWRvXG4gICAgTW9kZWwucHJvdG90eXBlLmlzU3RvcmVkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICByZXR1cm4gJGluc3RhbmNlc1t0aGlzLmdldCgkaWQua2V5UGF0aCldID09PSB0aGlzO1xuICAgIH07XG5cbiAgICAvLyBHdWFyZGEgbG9zIGRhdG9zIGRlbCBvYmpldG9cbiAgICBNb2RlbC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddKTtcblxuICAgICAgcmV0dXJuICRkYi5wdXQoJG1vZGVsTmFtZSwgdGhpcywgZnVuY3Rpb24gKGVyciwgZXZlbnQpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGlmIChjYikgY2IoZXJyKTtyZXR1cm47XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQXNpZ25hciBlbCBnZW5lcmFkbyBhbCBtb2RlbG9cbiAgICAgICAgdmFyIGtleSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgIHRoaXouc2V0S2V5KGtleSk7XG4gICAgICAgIHRoaXouJGlzTmV3ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGNiKSBjYi5hcHBseShudWxsLCBbbnVsbF0uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBGdW5jaW9uIHF1ZSBoYWNlIGVzY3VjaGFycyBsb3MgbWVuc2FqZXMgZGVsIHNvY2tldCBwYXJhIGVsIG1vZGVsXG4gICAgTW9kZWwucHJvdG90eXBlLmxpc3RlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlmICghJHNvY2tldCkgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5Eb2VzTm90SGF2ZVNvY2tldEluc3RhbmNlJyk7XG5cbiAgICAgICRzb2NrZXQuc3Vic2NyaWJlKHtcbiAgICAgICAgbW9kZWxOYW1lOiAkbW9kZWxOYW1lLFxuICAgICAgICBldmVudE5hbWU6ICd1cGRhdGUnLFxuICAgICAgICBtb2RlbElkOiB0aGl6LmdldChNb2RlbC5nZXRLZXlQYXRoKCkpXG4gICAgICB9LCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB0aGl6LnNldEF0dHJpYnV0ZXMoZGF0YSB8fCB7fSwgdHJ1ZSk7XG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGl6LnNhdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQXNpZ25hIGxhIGluc3RhbmNpYSBkZWwgcmVnaXN0cm9cbiAgICBNb2RlbC5wcm90b3R5cGUucmVzb3VyY2UgPSBmdW5jdGlvbiAocmVjb3JkKSB7XG4gICAgICB0aGlzLiRyZWNvcmQgPSByZWNvcmQ7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIE1vZGVsO1xuICB9O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYlF1ZXJ5ICgkbG9nLCBpZGJVdGlscykgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIHJldHVybiBmdW5jdGlvbiBpZGJRdWVyeSgkZGIsICRNb2RlbCwgJGZpbHRlcnMpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgJ2Z1bmN0aW9uJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICBsZXQgJHJlc3VsdCA9IG51bGw7XHJcblxyXG4gICAgLy8gRnVuY2lvbiBxdWUgZGV2dWVsdmUgZWplY3V0YSBlbCBxdWVyeSB5IGRldnVlbHZlIGVsIHJlc3VsdGFkby5cclxuICAgIHRoaXouZ2V0UmVzdWx0ID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIC8vIEVqZWN1dGFyIHNpIG5vIHNlIGhhIGVqZWN1dGFkb1xyXG4gICAgICBpZiAoISRyZXN1bHQpXHJcbiAgICAgICAgJHJlc3VsdCA9ICRkYi5maW5kKCRNb2RlbCwgJGZpbHRlcnMsIGNiKTtcclxuICAgICAgcmV0dXJuICRyZXN1bHQ7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaWRiUXVlcnk7XG5mdW5jdGlvbiBpZGJRdWVyeSgkbG9nLCBpZGJVdGlscykge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBmdW5jdGlvbiBpZGJRdWVyeSgkZGIsICRNb2RlbCwgJGZpbHRlcnMpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdmdW5jdGlvbicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICB2YXIgJHJlc3VsdCA9IG51bGw7XG5cbiAgICAvLyBGdW5jaW9uIHF1ZSBkZXZ1ZWx2ZSBlamVjdXRhIGVsIHF1ZXJ5IHkgZGV2dWVsdmUgZWwgcmVzdWx0YWRvLlxuICAgIHRoaXouZ2V0UmVzdWx0ID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIC8vIEVqZWN1dGFyIHNpIG5vIHNlIGhhIGVqZWN1dGFkb1xuICAgICAgaWYgKCEkcmVzdWx0KSAkcmVzdWx0ID0gJGRiLmZpbmQoJE1vZGVsLCAkZmlsdGVycywgY2IpO1xuICAgICAgcmV0dXJuICRyZXN1bHQ7XG4gICAgfTtcbiAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYlNvY2tldFNlcnZpY2UoJGxvZywgaW8sIGlkYlV0aWxzKSB7ICduZ0luamVjdCc7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gIFxyXG4gIGxldCAkZGVmVXJsU2VydmVyID0gbnVsbDtcclxuXHJcbiAgZnVuY3Rpb24gaWRiU29ja2V0ICgkdXJsU2VydmVyLCAkYWNjZXNzVG9rZW5JZCwgJGN1cnJlbnRVc2VySWQpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ10sIFsnc3RyaW5nJywgJ251bWJlciddXSk7XHJcblxyXG4gICAgY29uc3QgJGxpc3RlbmVycyA9ICBbXTtcclxuICAgIGxldCAkc29ja2V0ID0gbnVsbDtcclxuICAgICR1cmxTZXJ2ZXIgPSAkdXJsU2VydmVyIHx8ICRkZWZVcmxTZXJ2ZXI7XHJcblxyXG4gICAgLy8gQ29uZWN0YXJzZSBhbCBzZXJ2aWRvclxyXG4gICAgdGhpei5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBcclxuICAgICAgLy8gQ3JlYXRpbmcgY29ubmVjdGlvbiB3aXRoIHNlcnZlclxyXG4gICAgICAkc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsU2VydmVyKTtcclxuXHJcbiAgICAgIC8vIFRoaXMgcGFydCBpcyBvbmx5IGZvciBsb2dpbiB1c2VycyBmb3IgYXV0aGVudGljYXRlZCAkc29ja2V0IGNvbm5lY3Rpb24gYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlci5cclxuICAgICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXHJcblxyXG4gICAgICAkc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkbG9nLmxvZygnY29ubmVjdGVkJyk7XHJcblxyXG4gICAgICAgICRzb2NrZXQuZW1pdCgnYXV0aGVudGljYXRpb24nLCB7XHJcbiAgICAgICAgICBpZDogJGFjY2Vzc1Rva2VuSWQsXHJcbiAgICAgICAgICB1c2VySWQ6ICRjdXJyZW50VXNlcklkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRzb2NrZXQub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIC8vIHVzZSB0aGUgJHNvY2tldCBhcyB1c3VhbFxyXG4gICAgICAgICAgJGxvZy5sb2coJ1VzZXIgaXMgYXV0aGVudGljYXRlZCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgdmFyIG5hbWUgPSBvcHRpb25zLm1vZGVsTmFtZSArICcuJyArIG9wdGlvbnMuZXZlbnROYW1lO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgbmFtZSA9IG5hbWUgKyAnLicgKyBvcHRpb25zLm1vZGVsSWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRzb2NrZXQub24obmFtZSwgY2IpO1xyXG4gICAgICBcclxuICAgICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxyXG4gICAgICAkbGlzdGVuZXJzLnB1c2gobmFtZSwgY2IpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wdXNoTGlzdGVuZXIgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSwgY2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICRsaXN0ZW5lcnMucHVzaChzdWJzY3JpcHRpb25OYW1lKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSkge1xyXG4gICAgICAkc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTsgIFxyXG4gICAgICB2YXIgaWR4ID0gJGxpc3RlbmVycy5pbmRleE9mKHN1YnNjcmlwdGlvbk5hbWUpO1xyXG4gICAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgICAkbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouY29ubmVjdCgpO1xyXG5cclxuICB9O1xyXG5cclxuICAvLyBBc2lnbmEgbGEgVVJMIGRlIHNlcnZpZG9yIHBvciBkZWZlY3RvXHJcbiAgaWRiU29ja2V0LnNldFVybFNlcnZlciA9IGZ1bmN0aW9uICh1cmxTZXJ2ZXIpIHtcclxuICAgICRkZWZVcmxTZXJ2ZXIgPSB1cmxTZXJ2ZXI7XHJcbiAgfTtcclxuXHJcbiAgLy8gQVNpZ25hIGxhcyBjcmVkZW5jaWFsZXMgcG9yIGRlZmVjdG9cclxuICBpZGJTb2NrZXQuc2V0Q3JlZGVudGlhbHMgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCkge1xyXG4gICAgYWNjZXNzVG9rZW5JZCA9ICRhY2Nlc3NUb2tlbklkXHJcbiAgICBjdXJyZW50VXNlcklkID0gJGN1cnJlbnRVc2VySWQ7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGlkYlNvY2tldDtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJTb2NrZXQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJTb2NrZXRTZXJ2aWNlO1xuZnVuY3Rpb24gaWRiU29ja2V0U2VydmljZSgkbG9nLCBpbywgaWRiVXRpbHMpIHtcbiAgJ25nSW5qZWN0JztcbiAgdmFyIHRoaXogPSB0aGlzO1xuXG4gIHZhciAkZGVmVXJsU2VydmVyID0gbnVsbDtcblxuICBmdW5jdGlvbiBpZGJTb2NrZXQoJHVybFNlcnZlciwgJGFjY2Vzc1Rva2VuSWQsICRjdXJyZW50VXNlcklkKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3N0cmluZycsICdudW1iZXInXSwgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcblxuICAgIHZhciAkbGlzdGVuZXJzID0gW107XG4gICAgdmFyICRzb2NrZXQgPSBudWxsO1xuICAgICR1cmxTZXJ2ZXIgPSAkdXJsU2VydmVyIHx8ICRkZWZVcmxTZXJ2ZXI7XG5cbiAgICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXG4gICAgdGhpei5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyBDcmVhdGluZyBjb25uZWN0aW9uIHdpdGggc2VydmVyXG4gICAgICAkc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsU2VydmVyKTtcblxuICAgICAgLy8gVGhpcyBwYXJ0IGlzIG9ubHkgZm9yIGxvZ2luIHVzZXJzIGZvciBhdXRoZW50aWNhdGVkICRzb2NrZXQgY29ubmVjdGlvbiBiZXR3ZWVuIGNsaWVudCBhbmQgc2VydmVyLlxuICAgICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXG5cbiAgICAgICRzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRsb2cubG9nKCdjb25uZWN0ZWQnKTtcblxuICAgICAgICAkc29ja2V0LmVtaXQoJ2F1dGhlbnRpY2F0aW9uJywge1xuICAgICAgICAgIGlkOiAkYWNjZXNzVG9rZW5JZCxcbiAgICAgICAgICB1c2VySWQ6ICRjdXJyZW50VXNlcklkXG4gICAgICAgIH0pO1xuICAgICAgICAkc29ja2V0Lm9uKCdhdXRoZW50aWNhdGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIHVzZSB0aGUgJHNvY2tldCBhcyB1c3VhbFxuICAgICAgICAgICRsb2cubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpei5zdWJzY3JpYmUgPSBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIHZhciBuYW1lID0gb3B0aW9ucy5tb2RlbE5hbWUgKyAnLicgKyBvcHRpb25zLmV2ZW50TmFtZTtcblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lICsgJy4nICsgb3B0aW9ucy5tb2RlbElkO1xuICAgICAgfVxuXG4gICAgICAkc29ja2V0Lm9uKG5hbWUsIGNiKTtcblxuICAgICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxuICAgICAgJGxpc3RlbmVycy5wdXNoKG5hbWUsIGNiKTtcbiAgICB9O1xuXG4gICAgdGhpei5wdXNoTGlzdGVuZXIgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICRsaXN0ZW5lcnMucHVzaChzdWJzY3JpcHRpb25OYW1lKTtcbiAgICB9O1xuXG4gICAgdGhpei51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lKSB7XG4gICAgICAkc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTtcbiAgICAgIHZhciBpZHggPSAkbGlzdGVuZXJzLmluZGV4T2Yoc3Vic2NyaXB0aW9uTmFtZSk7XG4gICAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICAgICRsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXouY29ubmVjdCgpO1xuICB9O1xuXG4gIC8vIEFzaWduYSBsYSBVUkwgZGUgc2Vydmlkb3IgcG9yIGRlZmVjdG9cbiAgaWRiU29ja2V0LnNldFVybFNlcnZlciA9IGZ1bmN0aW9uICh1cmxTZXJ2ZXIpIHtcbiAgICAkZGVmVXJsU2VydmVyID0gdXJsU2VydmVyO1xuICB9O1xuXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXG4gIGlkYlNvY2tldC5zZXRDcmVkZW50aWFscyA9IGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XG4gICAgYWNjZXNzVG9rZW5JZCA9ICRhY2Nlc3NUb2tlbklkO1xuICAgIGN1cnJlbnRVc2VySWQgPSAkY3VycmVudFVzZXJJZDtcbiAgfTtcblxuICByZXR1cm4gaWRiU29ja2V0O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYlNvY2tldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxiIChtb2R1bGUpIHtcclxuXHJcbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcclxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xyXG4gICAgY29uc3QgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xyXG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGxldCB1cmxCYXNlSG9zdCA9IGxvY2F0aW9uLmhvc3Q7XHJcblxyXG4gIGNvbnN0IGxiQXV0aCA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnXHJcbiAgICBjb25zdCBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcclxuICAgIGNvbnN0IHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcclxuICAgIFxyXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcclxuICAgIC8vIFdlIGFyZSB1c2luZyBlbXB0eSBzdHJpbmcgYXMgYSBtYXJrZXIgZm9yIG51bGwvdW5kZWZpbmVkIHZhbHVlcy5cclxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XHJcbiAgICAgICAgc3RvcmFnZVtrZXldID0gdmFsdWU7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZChuYW1lKSB7XHJcbiAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVtrZXldIHx8IHNlc3Npb25TdG9yYWdlW2tleV0gfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsYkF1dGgoKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpeltuYW1lXSA9IGxvYWQobmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBjb25zdCBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbihhY2Nlc3NUb2tlbklkLCB1c2VySWQsIHVzZXJEYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc2Vzc2lvblN0b3JhZ2UsIG5hbWUsIG51bGwpO1xyXG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XHJcblxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uKCRxLCBsYkF1dGgpIHsgJ25nSW5qZWN0JztcclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVxdWVzdDogZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xyXG4gICAgICAgIGNvbnN0IGhvc3QgPSBnZXRIb3N0KGNvbmZpZy51cmwpO1xyXG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XHJcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XHJcbiAgICAgICAgICBjb25maWcuaGVhZGVyc1thdXRoSGVhZGVyXSA9IGxiQXV0aC5hY2Nlc3NUb2tlbklkO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XHJcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxyXG4gICAgICAgICAgLy8gdGhlcmUgaXMgbm8gdXNlciBsb2dnZWQgaW5cclxuICAgICAgICAgIGNvbnN0IHJlcyA9IHtcclxuICAgICAgICAgICAgYm9keTogeyBlcnJvcjogeyBzdGF0dXM6IDQwMSB9fSxcclxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXHJcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbigpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnOyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcclxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nLFxyXG4gICAgfTtcclxuXHJcbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyIFRoZSBoZWFkZXIgbmFtZSB0byB1c2UsIGUuZy4gYFgtQWNjZXNzLVRva2VuYFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25maWd1cmUgdGhlIFJFU1QgdHJhbnNwb3J0IHRvIHVzZSBhIGRpZmZlcmVudCBoZWFkZXIgZm9yIHNlbmRpbmdcclxuICAgICAqIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi4gSXQgaXMgc2VudCBpbiB0aGUgYEF1dGhvcml6YXRpb25gIGhlYWRlclxyXG4gICAgICogYnkgZGVmYXVsdC5cclxuICAgICAqL1xyXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oaGVhZGVyKSB7XHJcbiAgICAgIG9wdGlvbnMuYXV0aEhlYWRlciA9IGhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBoZWFkZXIgbmFtZSB0aGF0IGlzIHVzZWQgZm9yIHNlbmRpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB1c2UsIGUuZy4gYC9hcGlgIG9yIGAvL2V4YW1wbGUuY29tL2FwaWAuXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENoYW5nZSB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIEJ5IGRlZmF1bHQsIHRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgb3B0aW9ucy51cmxCYXNlID0gdXJsO1xyXG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xyXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uKCRyZXNvdXJjZSkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xyXG4gICAgICAgICAgYWN0aW9uc1trZXldLnVybCA9IG9wdGlvbnMudXJsQmFzZSArIGFjdGlvbnNba2V5XS51cmw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcclxuXHJcbiAgICAgICAgLy8gQW5ndWxhciBhbHdheXMgY2FsbHMgUE9TVCBvbiAkc2F2ZSgpXHJcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXHJcbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xyXG4gICAgICAgIHJlc291cmNlLnByb3RvdHlwZS4kc2F2ZSA9IGZ1bmN0aW9uKHN1Y2Nlc3MsIGVycm9yKSB7XHJcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxyXG4gICAgICAgICAgLy8gdGhhdCBleGFjdGx5IGZpdHMgb3VyIG5lZWRzLlxyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcclxuICAgICAgICAgIHJldHVybiByZXN1bHQuJHByb21pc2UgfHwgcmVzdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XHJcbiAgICAgIH07XHJcbiAgICBcclxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kdWxlXHJcbiAgICAuZmFjdG9yeSgnbGJBdXRoJywgbGJBdXRoKVxyXG4gICAgLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSlcclxuICAgIC5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpXHJcbiAgICAuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uKCRodHRwUHJvdmlkZXIpIHsgJ25nSW5qZWN0JztcclxuICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XHJcbiAgICB9XSk7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvbGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBsYjtcbmZ1bmN0aW9uIGxiKG1vZHVsZSkge1xuXG4gIC8vIER2dWVsdmUgZWwgaG9zdCBkZSB1bmEgVVJMXG4gIGZ1bmN0aW9uIGdldEhvc3QodXJsKSB7XG4gICAgdmFyIG0gPSB1cmwubWF0Y2goL14oPzpodHRwcz86KT9cXC9cXC8oW15cXC9dKykvKTtcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBudWxsO1xuICB9XG5cbiAgdmFyIHVybEJhc2VIb3N0ID0gbG9jYXRpb24uaG9zdDtcblxuICB2YXIgbGJBdXRoID0gZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB2YXIgcHJvcHMgPSBbJ2FjY2Vzc1Rva2VuSWQnLCAnY3VycmVudFVzZXJJZCcsICdyZW1lbWJlck1lJ107XG4gICAgdmFyIHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcblxuICAgIC8vIE5vdGU6IExvY2FsU3RvcmFnZSBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gc3RyaW5nXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9ICcnO1xuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2Fubm90IGFjY2VzcyBsb2NhbC9zZXNzaW9uIHN0b3JhZ2U6JywgZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGl6W25hbWVdID0gbG9hZChuYW1lKTtcbiAgICAgIH0pO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zZXRVc2VyID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IHVzZXJEYXRhO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyVXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzZXNzaW9uU3RvcmFnZSwgbmFtZSwgbnVsbCk7XG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IGxiQXV0aCgpO1xuICB9O1xuXG4gIHZhciBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbiBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IoJHEsIGxiQXV0aCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVxdWVzdDogZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xuICAgICAgICB2YXIgaG9zdCA9IGdldEhvc3QoY29uZmlnLnVybCk7XG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYkF1dGguYWNjZXNzVG9rZW5JZCkge1xuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzW2F1dGhIZWFkZXJdID0gbGJBdXRoLmFjY2Vzc1Rva2VuSWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XG4gICAgICAgICAgLy8gUmV0dXJuIGEgc3R1YiA0MDEgZXJyb3IgZm9yIFVzZXIuZ2V0Q3VycmVudCgpIHdoZW5cbiAgICAgICAgICAvLyB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpblxuICAgICAgICAgIHZhciByZXMgPSB7XG4gICAgICAgICAgICBib2R5OiB7IGVycm9yOiB7IHN0YXR1czogNDAxIH0gfSxcbiAgICAgICAgICAgIHN0YXR1czogNDAxLFxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbiBoZWFkZXJzKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKCkge1xuICAgICduZ0luamVjdCc7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcbiAgICAgIGF1dGhIZWFkZXI6ICdhdXRob3JpemF0aW9uJ1xuICAgIH07XG5cbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXIgVGhlIGhlYWRlciBuYW1lIHRvIHVzZSwgZS5nLiBgWC1BY2Nlc3MtVG9rZW5gXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENvbmZpZ3VyZSB0aGUgUkVTVCB0cmFuc3BvcnQgdG8gdXNlIGEgZGlmZmVyZW50IGhlYWRlciBmb3Igc2VuZGluZ1xyXG4gICAgICogdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLiBJdCBpcyBzZW50IGluIHRoZSBgQXV0aG9yaXphdGlvbmAgaGVhZGVyXHJcbiAgICAgKiBieSBkZWZhdWx0LlxyXG4gICAgICovXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKGhlYWRlcikge1xuICAgICAgb3B0aW9ucy5hdXRoSGVhZGVyID0gaGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIGhlYWRlciBuYW1lIHRoYXQgaXMgdXNlZCBmb3Igc2VuZGluZyB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uXHJcbiAgICAgKi9cbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHVzZSwgZS5nLiBgL2FwaWAgb3IgYC8vZXhhbXBsZS5jb20vYXBpYC5cclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ2hhbmdlIHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gQnkgZGVmYXVsdCwgdGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICBvcHRpb25zLnVybEJhc2UgPSB1cmw7XG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XG4gICAgfTtcblxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcbiAgICAgICduZ0luamVjdCc7XG5cbiAgICAgIHZhciBsYlJlc291cmNlID0gZnVuY3Rpb24gbGJSZXNvdXJjZSh1cmwsIHBhcmFtcywgYWN0aW9ucykge1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgYWN0aW9uc1trZXldLm9yaWdpbmFsVXJsID0gYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgICBhY3Rpb25zW2tleV0udXJsID0gb3B0aW9ucy51cmxCYXNlICsgYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcblxuICAgICAgICAvLyBBbmd1bGFyIGFsd2F5cyBjYWxscyBQT1NUIG9uICRzYXZlKClcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXG4gICAgICAgIC8vIGh0dHA6Ly9raXJrYnVzaGVsbC5tZS9hbmd1bGFyLWpzLXVzaW5nLW5nLXJlc291cmNlLWluLWEtbW9yZS1yZXN0ZnVsLW1hbm5lci9cbiAgICAgICAgcmVzb3VyY2UucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgLy8gRm9ydHVuYXRlbHksIExvb3BCYWNrIHByb3ZpZGVzIGEgY29udmVuaWVudCBgdXBzZXJ0YCBtZXRob2RcbiAgICAgICAgICAvLyB0aGF0IGV4YWN0bHkgZml0cyBvdXIgbmVlZHMuXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc291cmNlLnVwc2VydC5jYWxsKHRoaXMsIHt9LCB0aGlzLCBzdWNjZXNzLCBlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC4kcHJvbWlzZSB8fCByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXNvdXJjZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBsYlJlc291cmNlO1xuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIG1vZHVsZS5mYWN0b3J5KCdsYkF1dGgnLCBsYkF1dGgpLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSkuZmFjdG9yeSgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJywgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yKS5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XG4gIH1dKTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9sYi5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=