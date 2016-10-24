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
	
	  var validators = {
	    // Funcion para determinar si es un callback válido o no
	    callback: function callback(value) {
	      return typeof value == 'function' || value == null || value == undefined;
	    },
	
	    // Verifica si un valor es un array
	    array: function array(value) {
	      return Array.isArray(value);
	    }
	
	  };
	
	  // Genera un error si el valor no es del tipo indicado por parametro
	  function valid(value, types) {
	    if (!validators.array(types)) types = [types];
	
	    for (var i in types) {
	      var type = types[i];
	      if (typeof type == 'string') {
	        if (typeof validators[type] == 'function') {
	          if (validators[type](value)) {
	            return true;
	          }
	        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == type) {
	          return true;
	        }
	      } else if (typeof type == 'function') {
	        if (type(args[i])) {
	          return true;
	        }
	      }
	    }
	
	    return false;
	  }
	
	  // Valida un array de argumentos con un arra de tipos
	  function validate(args, types) {
	
	    args = Array.prototype.slice.call(args);
	    if (typeof types == 'string') types = [types];
	    for (var i in args) {
	      var value = args[i];
	      var type = types[i];
	      if (type && !valid(value, type)) {
	        var err = new Error('Invalid validator to: ' + args[i] + ' must be ' + type);
	        err.name = 'InvalidValidator';
	        throw err;
	      }
	    }
	  }
	
	  return {
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
	    DB_ERROR: 'cb.error',
	    MODEL_INSTANCED: 'model.instanced',
	    MODEL_QUERIED: 'model.queried',
	    MODEL_UNQUERIED: 'model.unqueried'
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
	      return thiz.promise;
	    };
	
	    thiz.promise.catch = function (cb) {
	      catchs.push(cb);
	      if (thiz.$resolved && thiz.error) {
	        catchsResolved();
	      }
	      return thiz.promise;
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
	
	idbService.$inject = ["$log", "qs", "idbUtils", "idbEvents", "idbModel", "idbQuery", "idbSocket", "lbAuth", "$timeout"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = idbService;
	function idbService($log, qs, idbUtils, idbEvents, idbModel, idbQuery, idbSocket, lbAuth, $timeout) {
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
	          $openDefered.reject(rq.errorCode, event);
	        };
	      };
	
	      indexedDB.deleteDatabase($dbName).onsuccess = ready;
	      // ready();
	
	      return $openDefered;
	    };
	
	    // Agrega un nuevo modelo
	    thiz.model = function (name, socket) {
	      idbUtils.validate(arguments, ['string', ['undefined', 'object']]);
	
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
	    thiz.transaction = function (modelName, perms, action) {
	      idbUtils.validate(arguments, ['string', 'string', 'function']);
	
	      var defered = qs.defer();
	
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
	    thiz.put = function (modelName, instance) {
	      idbUtils.validate(arguments, ['string', ['object', 'function']]);
	
	      var defered = qs.defer();
	
	      // Se crea una transaccion
	      thiz.transaction(modelName, 'readwrite', function (tx) {
	        var rq = tx.objectStore(modelName).put(instance.$getValues());
	
	        // Transaccion completada satisfatoriamente
	        rq.onsuccess = function (event) {
	          // Asignar el generado al modelo
	          instance.$setKey(event.target.result);
	          defered.resolve(instance, event);
	        };
	
	        // Se generó un error en la transacción
	        rq.onerror = function (event) {
	          // Could call rq.preventDefault() to prevent the transaction from aborting.
	          defered.reject(event);
	        };
	      });
	
	      return defered;
	    };
	
	    // Obtiene un elemento por si key
	    thiz.get = function (Model, key) {
	      idbUtils.validate(arguments, ['function', ['string', 'number']]);
	
	      var defered = qs.defer();
	      var instance = Model.getInstance(key);
	      var modelName = Model.getModelName();
	
	      instance.$promise = defered.promise;
	      instance.$resolved = false;
	
	      thiz.transaction(modelName, 'readonly', function (tx) {
	        var store = tx.objectStore(modelName);
	        var rq = store.get(key);
	
	        rq.onsuccess = function (event) {
	          Model.getVersionOf(key).promise.then(function (version) {
	            if (rq.result != undefined) {
	              instance.$setLocalValues(rq.result, version ? version.hash : null);
	            }
	            instance.$resolved = true;
	            defered.resolve(instance);
	          }).catch(function (err) {
	            $log.error(['any error', err]);
	          });
	        };
	
	        rq.onerror = function (event) {
	          defered.reject(instance);
	        };
	      });
	
	      return instance;
	    };
	
	    // Buscar en el modelo
	    thiz.find = function (Model, filters) {
	      idbUtils.validate(arguments, ['function', ['object', 'undefined']]);
	      var modelName = Model.getModelName();
	      var defered = qs.defer();
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
	
	          var key = Model.getKeyFrom(cursor.value);
	
	          Model.getVersionOf(key).promise.then(function (version) {
	
	            // Obtener la instancia
	            var instance = Model.getInstance(key);
	
	            instance.$setLocalValues(cursor.value, version ? version.hash : null);
	            instance.$resolved = true;
	            instance.$emit(idbEvents.MODEL_QUERIED, result);
	
	            // Agregar al resultado
	            result.push(instance);
	
	            // Buscar siguiente
	            cursor.continue();
	          }).catch(function (err) {
	            $log.error(['any error', err]);
	          });
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
	
	idbModelService.$inject = ["$log", "qs", "idbUtils", "lbResource", "$timeout", "idbEvents"];
	Object.defineProperty(exports, "__esModule", {
	      value: true
	});
	exports.default = idbModelService;
	function idbModelService($log, qs, idbUtils, lbResource, $timeout, idbEvents) {
	      'ngInject';
	
	      // Buscar un campo
	
	      var searchDeepField = function searchDeepField(obj, field, cb) {
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
	
	      return function idbModel($db, $modelName, $socket) {
	            idbUtils.validate(arguments, [null, 'string']);
	
	            // Clave del modelo
	            var $id = { keyPath: 'id', autoIncrement: true };
	            var $eventsHandlers = {};
	            var $instances = {};
	            var $fields = {};
	            var $remote = null;
	            var $versioning = null;
	
	            // Constuctor del modelo
	            function Model(data) {
	                  var thiz = this;
	                  idbUtils.validate(arguments, [['object', 'undefined']]);
	
	                  thiz.$loaded = false;
	                  thiz.$resolved = false;
	
	                  thiz.$localValues = {};
	                  thiz.$remoteValues = {};
	
	                  thiz.$version = null;
	                  thiz.$localVersion = null;
	                  thiz.$remoteVersion = null;
	
	                  thiz.$eventsHandlers = {};
	
	                  if (data) {
	                        thiz.$setValues(data);
	                  }
	
	                  thiz.$constructor(data);
	
	                  if ($socket) {
	                        thiz.$listen();
	                  }
	
	                  var $queries = [];
	
	                  thiz
	                  // Cuando sea consultado agregar la consulta
	                  .$bind(idbEvents.MODEL_QUERIED, function (query) {
	                        $queries.push(query);
	                  })
	
	                  // Cuando sea liberado de la consultar quitar de las consultas
	                  .$bind(idbEvents.MODEL_UNQUERIED, function (query) {
	                        var idx = $queries.indexOf(query);
	                        if (idx != -1) {
	                              $queries.splice(idx, 1);
	                        }
	                  })
	
	                  // Evento de que modelo está instanciado
	                  .$emit(idbEvents.MODEL_INSTANCED);
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
	
	            // Devuelve la instancia del $remote del modelo
	            Model.getRemote = function () {
	
	                  return $remote;
	            };
	
	            // Devuelve la instancia del $remote del modelo
	            Model.getVersioning = function () {
	
	                  return $versioning;
	            };
	
	            // Obtiene el valor pa una propieda de un objeto
	            Model.getFieldValue = function (obj, field) {
	                  return searchDeepField(obj, field, function (obj, lastField) {
	                        return obj[lastField];
	                  });
	            };
	
	            // Obtiene el valor pa una propieda de un objeto
	            Model.setFieldValue = function (obj, field, value) {
	                  searchDeepField(obj, field, function (obj, lastField) {
	                        obj[lastField] = value;
	                  });
	                  return obj;
	            };
	
	            // Devuelve el valor correspondiente al key de un objeto
	            Model.getKeyFrom = function (data) {
	                  return Model.getFieldValue(data, $id.keyPath);
	            };
	
	            // Devuelve la instancia del model de las guardadas. Si no existe entonce
	            // se crea
	            Model.getInstance = function (key) {
	                  idbUtils.validate(arguments, [['string', 'number', 'undefined']]);
	
	                  // El objeto no tiene ID
	                  if (!key) {
	                        return new Model();
	                  }
	
	                  // No existe la instancia entonce se crea
	                  if (!$instances[key]) {
	                        $instances[key] = new Model();
	                  }
	
	                  return $instances[key];
	            };
	
	            // Busca un registro en la objectStore del modelo.
	            Model.get = function (key) {
	
	                  return $db.get(Model, key);
	            };
	
	            // Buscar en el modelo
	            Model.find = function (filters) {
	
	                  return $db.query(Model, filters);
	            };
	
	            // Crea nuevas instancias de los modelos
	            Model.create = function (data) {
	                  idbUtils.validate(arguments, ['object', ['function', 'undefined']]);
	
	                  // Si es un array
	                  if (data.length === undefined) {
	                        var record = Model.getInstance(Model.getKeyFrom(data));
	
	                        if (record.$loaded) {
	                              throw new Error('Model.CantCreatedLoadedInstance');
	                        }
	
	                        return record.$save();
	                  }
	
	                  // Obtener una copia del array
	                  var arr = Array.prototype.slice.call(data);
	                  var result = [];
	                  var defered = qs.defer(cb);
	
	                  (function iteration() {
	
	                        // No quedan elementos en el array
	                        if (arr.length == 0) return defered.resolve(result);
	
	                        // Crear el siguiente elemento
	                        Model.create(arr.shift()).then(function (instance) {
	                              result.push(instance);
	                              iteration();
	                        }).catch(function (err) {
	                              defered.reject(err);
	                        });
	                  })();
	
	                  // Devolver el promise
	                  return defered;
	            };
	
	            // Crea un modelo para guardar las versiones del modelo actual
	            Model.versioning = function (modelName, cb) {
	                  if (typeof modelName === 'function') {
	                        cb = modelName;
	                        modelName = undefined;
	                  }
	                  idbUtils.validate([modelName, cb], [['string', 'undefined'], ['function', 'undefined']]);
	
	                  if (!$versioning) {
	
	                        // Si el model no tiene nombre se agrega
	                        if (!modelName) {
	                              modelName = $modelName + '_versioning';
	                        }
	
	                        // Crear modelo para el manejo de datos
	                        $versioning = $db.model(modelName).autoIncrement(false).keyPath('key').fields({
	                              "hash": { "type": "string", "required": true }
	                        });
	                  }
	
	                  if (cb) cb($versioning);
	
	                  return Model;
	            };
	
	            // Agrega un mandejador de eventos al modelo
	            Model.bind = function (eventName, handler) {
	                  idbUtils.validate(arguments, ['string', ['function', 'undefined']]);
	
	                  if (!$eventsHandlers[eventName]) {
	                        $eventsHandlers[eventName] = [];
	                  }
	
	                  $eventsHandlers[eventName].push(handler);
	
	                  return Model;
	            };
	
	            // Dispara un evento del model
	            Model.emit = function (eventName, args) {
	                  idbUtils.validate(arguments, ['string', ['undefined', 'array']]);
	
	                  if ($eventsHandlers[eventName]) {
	                        $eventsHandlers[eventName].map(function (cb) {
	                              cb.apply(Model, args || []);
	                        });
	                  }
	
	                  return Model;
	            };
	
	            // Devuelve el valor de una propiedad
	            Model.prototype.$get = function (field) {
	
	                  return Model.getFieldValue(this, field);
	            };
	
	            // Asigna in valor a un campo
	            Model.prototype.$set = function (field, value) {
	
	                  return Model.getFieldValue(this, field, value);
	            };
	
	            // Devuelve un objeto con las propiedades del registro
	            Model.prototype.$getValues = function () {
	                  var thiz = this;
	                  var values = {};
	
	                  Object.keys($fields).map(function (field) {
	                        Model.setFieldValue(values, field, Model.getFieldValue(thiz, field));
	                  });
	
	                  return values;
	            };
	
	            // Devuelve un objeto con las propiedades locales del registro
	            Model.prototype.$getLocalValues = function () {
	                  var thiz = this;
	                  var values = {};
	
	                  Object.keys($fields).map(function (field) {
	                        Model.setFieldValue(values, field, Model.getFieldValue(thiz.$localValues, field));
	                  });
	
	                  return values;
	            };
	
	            // Devuelve un modelo con las propiedades remotas del registro
	            Model.prototype.$getRemoteValues = function () {
	                  var thiz = this;
	                  var values = {};
	
	                  Object.keys($fields).map(function (field) {
	                        Model.setFieldValue(values, field, Model.getFieldValue(thiz.$remoteValues, field));
	                  });
	
	                  return values;
	            };
	
	            // Asigna las propiedades del registro
	            Model.prototype.$setValues = function (data, version) {
	                  var thiz = this;
	                  idbUtils.validate(arguments, ['object', ['string', 'undefined']]);
	
	                  thiz.$version = version;
	
	                  Object.keys(data).map(function (field) {
	                        Model.setFieldValue(thiz, field, data[field]);
	                  });
	
	                  thiz.$loaded = true;
	
	                  return thiz;
	            };
	
	            // Asigna las propiedades locales del registro
	            Model.prototype.$setLocalValues = function (data, version) {
	                  var thiz = this;
	                  idbUtils.validate(arguments, ['object', ['string', 'undefined']]);
	
	                  thiz.$localVersion = version;
	
	                  Object.keys(data).map(function (field) {
	                        Model.setFieldValue(thiz.$localValues, field, data[field]);
	                  });
	
	                  if (!thiz.$loaded) {
	                        thiz.$setValues(data, version);
	                  }
	
	                  return thiz;
	            };
	
	            // Asigna las propiedades remotas del registro
	            Model.prototype.$setRemoteValues = function (data, version) {
	                  var thiz = this;
	                  idbUtils.validate(arguments, ['object', ['string', 'undefined']]);
	
	                  thiz.$remoteVersion = version;
	
	                  Object.keys(data).map(function (field) {
	                        Model.setFieldValue(thiz.$remoteValues, field, data[field]);
	                  });
	
	                  if (!thiz.$loaded) {
	                        thiz.$setValues(data, version);
	                  }
	
	                  return thiz;
	            };
	
	            // Asigna el ID del objeto
	            Model.prototype.$setKey = function (newKey) {
	
	                  var oldKey = Model.getKeyFrom(this);
	
	                  Model.searchDeepField(this, $id.keyPath, function (obj, lastField) {
	                        obj[lastField] = newKey;
	                  });
	
	                  if (oldKey !== newKey) {
	
	                        if (oldKey && $instances[oldKey] && $instances[oldKey] != this) {
	                              throw new Error('Model.InstanceOfOldKeyIsNotSame');
	                        }
	                        if (newKey && $instances[newKey] && $instances[newKey] != this) {
	                              throw new Error('Model.InstanceOfNewKeyIsNotSame');
	                        }
	
	                        // Eliminar anterior
	                        if (oldKey && $instances[oldKey]) {
	                              delete $instances[oldKey];
	                        }
	
	                        // Agregar nueva
	                        if (newKey && !$instances[newKey]) {
	                              $instances[newKey] = this;
	                        }
	                  }
	
	                  return this;
	            };
	
	            // Consturctor que se puede sobre escribir
	            Model.prototype.$constructor = function (data) {};
	
	            // Devuelve si el objeto está almacenado
	            Model.prototype.$isStored = function () {
	
	                  return $instances[this.$get($id.keyPath)] === this;
	            };
	
	            // Devuelve la instancia de la version local del registro
	            Model.getVersionOf = function (key) {
	
	                  var defered = qs.defer();
	
	                  if ($versioning) {
	                        $versioning.get(key).$promise.then(function (instance) {
	                              defered.resolve(instance);
	                        }).catch(function () {
	                              defered.reject(null);
	                        });
	                  } else {
	                        $timeout(function () {
	                              defered.resolve(null);
	                        });
	                  }
	
	                  return defered;
	            };
	
	            // Guarda los datos del objeto
	            Model.prototype.$save = function () {
	                  var thiz = this;
	                  idbUtils.validate(arguments, ['function', 'undefined']);
	
	                  return $db.put($modelName, this);
	            };
	
	            // Funcion que hace escuchars los mensajes del socket para el model
	            Model.prototype.$listen = function () {
	                  var thiz = this;
	                  if (!$socket) throw new Error('Model.DoesNotHaveSocketInstance');
	
	                  // Crear una subscripcion al socket para cuando se reciban datos
	                  // para la instancia actual
	                  $socket.subscribe({
	                        modelName: $modelName,
	                        eventName: 'update',
	                        modelId: thiz.$get(Model.getKeyPath())
	                  }, function (data) {
	
	                        // A recibir datos del socket asignar los valores
	                        $timeout(function () {
	                              // Emitir evento de datos recibidor para el modelo
	                              thiz.$setRemoteValues(data.values, data.version);
	                        });
	                  });
	            };
	
	            // Agrega un mandejador de eventos
	            Model.prototype.$bind = function (eventName, handler) {
	                  idbUtils.validate(arguments, ['string', ['function', 'undefined']]);
	
	                  if (!this.$eventsHandlers[eventName]) {
	                        this.$eventsHandlers[eventName] = [];
	                  }
	
	                  this.$eventsHandlers[eventName].push(handler);
	
	                  return this;
	            };
	
	            // Dispara un evento
	            Model.prototype.$emit = function (eventName, args) {
	                  var thiz = this;
	                  idbUtils.validate(arguments, ['string', ['undefined', 'array']]);
	
	                  // Llamar el evento para el modelo
	                  Model.emit(eventName, [thiz, [].concat([thiz]).concat(args)]);
	
	                  if (thiz.$eventsHandlers[eventName]) {
	                        thiz.$eventsHandlers[eventName].map(function (cb) {
	                              cb.apply(thiz, args || []);
	                        });
	                  }
	
	                  return thiz;
	            };
	
	            Model.$instances = $instances;
	
	            return Model;
	      };
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	// Funcion para el servicio de la BD
	
	idbQuery.$inject = ["$log", "idbUtils", "idbEvents"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = idbQuery;
	function idbQuery($log, idbUtils, idbEvents) {
	  'ngInject';
	
	  return function idbQuery($db, $Model, $filters) {
	    var thiz = this;
	    idbUtils.validate(arguments, ['object', 'function', ['object', 'undefined']]);
	
	    var $result = null;
	
	    // Funcion que devuelve ejecuta el query y devuelve el resultado.
	    thiz.getResult = function (cb) {
	      var thiz = this;
	      idbUtils.validate(arguments, [['function', 'undefined']]);
	
	      // Ejecutar si no se ha ejecutado
	      if (!$result) {
	        $result = $db.find($Model, $filters);
	
	        $result.$promise.then(function () {
	          thiz.getRemoteResult();
	        });
	      }
	
	      return $result;
	    };
	
	    // Obtiene el resultado de valores remotos
	    thiz.getRemoteResult = function (cb) {
	      idbUtils.validate(arguments, [['function', 'undefined']]);
	
	      var $remote = $Model.getRemote();
	      var $remoteResult = null;
	
	      if ($remote && typeof $remote.find == 'function') {
	        ($remoteResult = $remote.find($filters, cb).$promise).then(function (result) {
	          result.map(function (record, i) {
	            $Model.get($Model.getKeyFrom(record.values)).$promise.then(function ($record) {
	
	              $record.$setRemoteValues(record.values, record.version);
	
	              if ($result[i]) {
	                if ($result[i] !== $record) {
	                  $result[i].$emit(idbEvents.MODEL_UNQUERIED, [$result]);
	                }
	                $result[i] = $record;
	              } else {
	                $result.push($record);
	              }
	
	              $record.$emit(idbEvents.MODEL_QUERIED, [$result]);
	            });
	          });
	        });
	      }
	
	      return $remoteResult;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDU5YmJlZjJjNDU1YTE1MDM1MmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiVXRpbHMuanM/MWJiNCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJFdmVudHMuanM/NDg2YSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3FzLmpzPzY0MzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiLmpzPzYzNTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qcz9mOWY5Iiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanM/Zjc3YSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJTb2NrZXQuanM/ZDFhMSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvbGIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2xiLmpzPzMwMDYiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnN0YW50IiwiaW8iLCJzZXJ2aWNlIiwiaWRiVXRpbHMiLCIkcSIsInZhbGlkYXRvcnMiLCJjYWxsYmFjayIsInZhbHVlIiwidW5kZWZpbmVkIiwiYXJyYXkiLCJBcnJheSIsImlzQXJyYXkiLCJ2YWxpZCIsInR5cGVzIiwiaSIsInR5cGUiLCJhcmdzIiwidmFsaWRhdGUiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJlcnIiLCJFcnJvciIsIm5hbWUiLCJpZGJFdmVudHMiLCJEQl9FUlJPUiIsIk1PREVMX0lOU1RBTkNFRCIsIk1PREVMX1FVRVJJRUQiLCJNT0RFTF9VTlFVRVJJRUQiLCJxcyIsInFzQ2xhc3MiLCJjYiIsInRoaXoiLCJ0aGVucyIsInRoZW5zUmVhZHkiLCJjYXRjaHMiLCJjYXRjaHNSZWFkeSIsInJlc3VsdEFyZ3MiLCJlcnJvciIsInByb21pc2UiLCIkcmVzb2x2ZWQiLCJ0aGVuc1Jlc29sdmVkIiwibGVuZ3RoIiwic2hpZnQiLCJhcHBseSIsInB1c2giLCJjYXRjaHNSZXNvbHZlZCIsInJlc29sdmUiLCJhcmd1bWVudHMiLCJyZWplY3QiLCJ0aGVuIiwiY2F0Y2giLCJkb25lIiwiY29uY2F0IiwiZGVmZXIiLCJpZGJTZXJ2aWNlIiwiJGxvZyIsImlkYk1vZGVsIiwiaWRiUXVlcnkiLCJpZGJTb2NrZXQiLCJsYkF1dGgiLCIkdGltZW91dCIsImluZGV4ZWREQiIsIndpbmRvdyIsIm1vekluZGV4ZWREQiIsIndlYmtpdEluZGV4ZWREQiIsIm1zSW5kZXhlZERCIiwiSURCVHJhbnNhY3Rpb24iLCJ3ZWJraXRJREJUcmFuc2FjdGlvbiIsIm1zSURCVHJhbnNhY3Rpb24iLCJJREJLZXlSYW5nZSIsIndlYmtpdElEQktleVJhbmdlIiwibXNJREJLZXlSYW5nZSIsImFsZXJ0IiwiaWRiIiwiJGRiTmFtZSIsIiRkYlZlcnNpb24iLCIkc29ja2V0IiwiJGV2ZW50c0NhbGxiYWNrcyIsIiR1cGdyYWRlTmVlZGVkRGVmZXJlZCIsIiRvcGVuRGVmZXJlZCIsIiRzb2NrZXRDb25uZWN0ZWREZWZlcmVkIiwiJG9wZW5lZCIsIiRyZXF1ZXN0IiwibW9kZWxzIiwiYmluZCIsImV2ZW50TmFtZSIsInVuYmluZCIsImlkeCIsImluZGV4T2YiLCJzcGxpY2UiLCJ0cmlnZ2VyIiwibG9nIiwib3BlbiIsInJlYWR5IiwicnEiLCJvbnVwZ3JhZGVuZWVkZWQiLCJldmVudCIsIm9uc3VjY2VzcyIsIm9uZXJyb3IiLCJ0YXJnZXQiLCJlcnJvckNvZGUiLCJkZWxldGVEYXRhYmFzZSIsIm1vZGVsIiwic29ja2V0IiwicXVlcnkiLCJNb2RlbCIsImZpbHRlcnMiLCJjcmVhdGVTdG9yZSIsIm1vZGVsTmFtZSIsIm1vZGVsSWQiLCJyZXN1bHQiLCJjcmVhdGVPYmplY3RTdG9yZSIsImNyZWF0ZUluZGV4IiwiaW5kZXhOYW1lIiwiZmllbGROYW1lIiwib3B0cyIsInN0b3JlIiwidHJhbnNhY3Rpb24iLCJvYmplY3RTdG9yZSIsInBlcm1zIiwiYWN0aW9uIiwiZGVmZXJlZCIsInR4Iiwib25jb21wbGV0ZSIsIm9uYWJvcnQiLCJwdXQiLCJpbnN0YW5jZSIsIiRnZXRWYWx1ZXMiLCIkc2V0S2V5IiwiZ2V0Iiwia2V5IiwiZ2V0SW5zdGFuY2UiLCJnZXRNb2RlbE5hbWUiLCIkcHJvbWlzZSIsImdldFZlcnNpb25PZiIsInZlcnNpb24iLCIkc2V0TG9jYWxWYWx1ZXMiLCJoYXNoIiwiZmluZCIsIm9wZW5DdXJzb3IiLCJjdXJzb3IiLCJnZXRLZXlGcm9tIiwiJGVtaXQiLCJjb250aW51ZSIsImRlZmVyZWRzIiwiT2JqZWN0Iiwia2V5cyIsIm9uT3BlbiIsIm9uVXBncmFkZU5lZWRlZCIsIm9uU29ja2V0Q29ubmVjdGVkIiwibWFwIiwidGV4dCIsImlkYk1vZGVsU2VydmljZSIsImxiUmVzb3VyY2UiLCJzZWFyY2hEZWVwRmllbGQiLCJvYmoiLCJmaWVsZCIsImZpZWxkcyIsInNwbGl0IiwibGFzdEZpZWxkIiwicG9wIiwiX3NldCIsIiRkYiIsIiRtb2RlbE5hbWUiLCIkaWQiLCJrZXlQYXRoIiwiYXV0b0luY3JlbWVudCIsIiRldmVudHNIYW5kbGVycyIsIiRpbnN0YW5jZXMiLCIkZmllbGRzIiwiJHJlbW90ZSIsIiR2ZXJzaW9uaW5nIiwiZGF0YSIsIiRsb2FkZWQiLCIkbG9jYWxWYWx1ZXMiLCIkcmVtb3RlVmFsdWVzIiwiJHZlcnNpb24iLCIkbG9jYWxWZXJzaW9uIiwiJHJlbW90ZVZlcnNpb24iLCIkc2V0VmFsdWVzIiwiJGNvbnN0cnVjdG9yIiwiJGxpc3RlbiIsIiRxdWVyaWVzIiwiJGJpbmQiLCJnZXRLZXlQYXRoIiwiaW5kZXgiLCJidWlsZCIsImJ1aWxkQ2FsbGJhY2siLCJyZW1vdGUiLCJ1cmwiLCJhY3Rpb25zIiwiZ2V0UmVtb3RlIiwiZ2V0VmVyc2lvbmluZyIsImdldEZpZWxkVmFsdWUiLCJzZXRGaWVsZFZhbHVlIiwiY3JlYXRlIiwicmVjb3JkIiwiJHNhdmUiLCJhcnIiLCJpdGVyYXRpb24iLCJ2ZXJzaW9uaW5nIiwiaGFuZGxlciIsImVtaXQiLCIkZ2V0IiwiJHNldCIsInZhbHVlcyIsIiRnZXRMb2NhbFZhbHVlcyIsIiRnZXRSZW1vdGVWYWx1ZXMiLCIkc2V0UmVtb3RlVmFsdWVzIiwibmV3S2V5Iiwib2xkS2V5IiwiJGlzU3RvcmVkIiwic3Vic2NyaWJlIiwiJE1vZGVsIiwiJGZpbHRlcnMiLCIkcmVzdWx0IiwiZ2V0UmVzdWx0IiwiZ2V0UmVtb3RlUmVzdWx0IiwiJHJlbW90ZVJlc3VsdCIsIiRyZWNvcmQiLCJpZGJTb2NrZXRTZXJ2aWNlIiwiJGRlZlVybFNlcnZlciIsIiR1cmxTZXJ2ZXIiLCIkYWNjZXNzVG9rZW5JZCIsIiRjdXJyZW50VXNlcklkIiwiJGxpc3RlbmVycyIsImNvbm5lY3QiLCJvbiIsImlkIiwidXNlcklkIiwib3B0aW9ucyIsInB1c2hMaXN0ZW5lciIsInN1YnNjcmlwdGlvbk5hbWUiLCJ1bnN1YnNjcmliZSIsInJlbW92ZUFsbExpc3RlbmVycyIsInNldFVybFNlcnZlciIsInVybFNlcnZlciIsInNldENyZWRlbnRpYWxzIiwiYWNjZXNzVG9rZW5JZCIsImN1cnJlbnRVc2VySWQiLCJsYiIsImdldEhvc3QiLCJtIiwibWF0Y2giLCJ1cmxCYXNlSG9zdCIsImxvY2F0aW9uIiwiaG9zdCIsInByb3BzIiwicHJvcHNQcmVmaXgiLCJzYXZlIiwic3RvcmFnZSIsImNvbnNvbGUiLCJsb2FkIiwibG9jYWxTdG9yYWdlIiwic2Vzc2lvblN0b3JhZ2UiLCJmb3JFYWNoIiwiY3VycmVudFVzZXJEYXRhIiwicmVtZW1iZXJNZSIsInNldFVzZXIiLCJ1c2VyRGF0YSIsImNsZWFyVXNlciIsImNsZWFyU3RvcmFnZSIsImxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciIsInJlcXVlc3QiLCJjb25maWciLCJoZWFkZXJzIiwiYXV0aEhlYWRlciIsIl9faXNHZXRDdXJyZW50VXNlcl9fIiwicmVzIiwiYm9keSIsInN0YXR1cyIsIndoZW4iLCJ1cmxCYXNlIiwic2V0QXV0aEhlYWRlciIsImhlYWRlciIsImdldEF1dGhIZWFkZXIiLCJzZXRVcmxCYXNlIiwiZ2V0VXJsQmFzZSIsIiRyZXNvdXJjZSIsInBhcmFtcyIsIm9yaWdpbmFsVXJsIiwicmVzb3VyY2UiLCJzdWNjZXNzIiwidXBzZXJ0IiwiZmFjdG9yeSIsInByb3ZpZGVyIiwiJGh0dHBQcm92aWRlciIsImludGVyY2VwdG9ycyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FBRUE7O0FDRUEsS0FBSSxhQUFhLHVCQUF1Qjs7QUREeEM7O0FDS0EsS0FBSSxjQUFjLHVCQUF1Qjs7QURKekM7O0FDUUEsS0FBSSxPQUFPLHVCQUF1Qjs7QURObEM7O0FDVUEsS0FBSSxRQUFRLHVCQUF1Qjs7QURUbkM7O0FDYUEsS0FBSSxhQUFhLHVCQUF1Qjs7QURaeEM7O0FDZ0JBLEtBQUksYUFBYSx1QkFBdUI7O0FEZnhDOztBQ21CQSxLQUFJLGNBQWMsdUJBQXVCOztBRGpCekM7O0FDcUJBLEtBQUksT0FBTyx1QkFBdUI7O0FBRWxDLFVBQVMsdUJBQXVCLEtBQUssRUFBRSxPQUFPLE9BQU8sSUFBSSxhQUFhLE1BQU0sRUFBRSxTQUFTOztBRHJCdkYsbUJBQUdBLFFBQVFDLE9BQU8sVUFBVSxLQUN6QkMsU0FBUyxNQUFNQyxJQUVmRCxTQUFTLGNBQWMsU0FDdkJFLFFBQVEsYUFKWCxxQkFLR0EsUUFBUSxZQUxYLG9CQU1HQSxRQUFRLE1BTlg7OztFQVNHQSxRQUFRLE9BVFgsZUFVR0EsUUFBUSxZQVZYLG9CQVdHQSxRQUFRLFlBWFgsb0JBWUdBLFFBQVEsYUFaWCxxQjs7Ozs7O0FFYkE7OztBQ0VBLFFBQU8sZUFBZSxTQUFTLGNBQWM7R0FDM0MsT0FBTzs7O0FBR1QsS0FBSSxVQUFVLE9BQU8sV0FBVyxjQUFjLE9BQU8sT0FBTyxhQUFhLFdBQVcsVUFBVSxLQUFLLEVBQUUsT0FBTyxPQUFPLFNBQVMsVUFBVSxLQUFLLEVBQUUsT0FBTyxPQUFPLE9BQU8sV0FBVyxjQUFjLElBQUksZ0JBQWdCLFVBQVUsUUFBUSxPQUFPLFlBQVksV0FBVyxPQUFPOztBQUV0USxTQUFRLFVETmdCQztBQUFULFVBQVNBLFNBQVVDLElBQUk7R0FBRTs7R0FFdEMsSUFBTUMsYUFBYTs7S0FFakJDLFVBQVUsa0JBQVVDLE9BQU87T0FDekIsT0FBTyxPQUFPQSxTQUFTLGNBQWNBLFNBQVMsUUFBUUEsU0FBU0M7Ozs7S0FJakVDLE9BQU8sZUFBVUYsT0FBTztPQUN0QixPQUFPRyxNQUFNQyxRQUFRSjs7Ozs7O0dBTXpCLFNBQVNLLE1BQU9MLE9BQU9NLE9BQU87S0FDNUIsSUFBSSxDQUFDUixXQUFXSSxNQUFNSSxRQUFRQSxRQUFRLENBQUNBOztLQUV2QyxLQUFJLElBQUlDLEtBQUtELE9BQU07T0FDakIsSUFBTUUsT0FBT0YsTUFBTUM7T0FDbkIsSUFBSSxPQUFPQyxRQUFRLFVBQVM7U0FDMUIsSUFBSSxPQUFPVixXQUFXVSxTQUFTLFlBQVk7V0FDekMsSUFBSVYsV0FBV1UsTUFBTVIsUUFBUTthQUMzQixPQUFPOztnQkFFSixJQUFJLFFBQU9BLFVBQVAsb0NBQU9BLFdBQVNRLE1BQU07V0FDL0IsT0FBTzs7Y0FFSixJQUFJLE9BQU9BLFFBQVEsWUFBVztTQUNuQyxJQUFHQSxLQUFLQyxLQUFLRixLQUFJO1dBQ2YsT0FBTzs7Ozs7S0FLYixPQUFPOzs7O0dBS1QsU0FBU0csU0FBVUQsTUFBTUgsT0FBTzs7S0FFOUJHLE9BQU9OLE1BQU1RLFVBQVVDLE1BQU1DLEtBQUtKO0tBQ2xDLElBQUksT0FBT0gsU0FBUyxVQUFVQSxRQUFRLENBQUNBO0tBQ3ZDLEtBQUssSUFBSUMsS0FBS0UsTUFBSztPQUNqQixJQUFNVCxRQUFRUyxLQUFLRjtPQUNuQixJQUFNQyxPQUFPRixNQUFNQztPQUNuQixJQUFJQyxRQUFRLENBQUNILE1BQU1MLE9BQU9RLE9BQU07U0FDOUIsSUFBSU0sTUFBTSxJQUFJQyxNQUFNLDJCQUF5Qk4sS0FBS0YsS0FBRyxjQUFZQztTQUNqRU0sSUFBSUUsT0FBTztTQUNYLE1BQU1GOzs7OztHQU1aLE9BQU87S0FDTEosVUFBVUE7Ozs7Ozs7O0FFNURkOzs7O0FDSUEsUUFBTyxlQUFlLFNBQVMsY0FBYztHQUMzQyxPQUFPOztBQUVULFNBQVEsVURKZ0JPO0FBQVQsVUFBU0EsWUFBWTtHQUNsQyxPQUFPO0tBQ0xDLFVBQVU7S0FDVkMsaUJBQWtCO0tBQ2xCQyxlQUFnQjtLQUNoQkMsaUJBQWtCOztFQUVyQixDOzs7Ozs7QUVWRDs7QUNFQSxRQUFPLGVBQWUsU0FBUyxjQUFjO0dBQzNDLE9BQU87O0FBRVQsU0FBUSxVREhnQkM7QUFBVCxVQUFTQSxLQUFNO0dBQUU7O0dBRTlCLFNBQVNDLFFBQVNDLElBQUk7S0FBRSxJQUFNQyxPQUFPOztLQUVuQyxJQUFJQyxRQUFRO0tBQ1osSUFBSUMsYUFBYTtLQUNqQixJQUFJQyxTQUFTO0tBQ2IsSUFBSUMsY0FBYztLQUNsQixJQUFJQyxhQUFhO0tBQ2pCLElBQUlDLFFBQVE7O0tBRVpOLEtBQUtPLFVBQVU7S0FDZlAsS0FBS1EsWUFBWTs7S0FFakIsU0FBU0MsZ0JBQWlCO09BQ3hCLElBQUksQ0FBQ1IsTUFBTVMsUUFBUTtPQUNuQixJQUFJWCxLQUFLRSxNQUFNVTtPQUNmWixHQUFHYSxNQUFNLE1BQU1aLEtBQUtLO09BQ3BCSCxXQUFXVyxLQUFLZDtPQUNoQlU7OztLQUdGLFNBQVNLLGlCQUFrQjtPQUN6QixJQUFJLENBQUNYLE9BQU9PLFFBQVE7T0FDcEIsSUFBSVgsS0FBS0ksT0FBT1E7T0FDaEJaLEdBQUdhLE1BQU0sTUFBTVosS0FBS007T0FDcEJGLFlBQVlTLEtBQUtkO09BQ2pCZTs7O0tBR0ZkLEtBQUtlLFVBQVUsWUFBWTtPQUN6QixJQUFJZixLQUFLUSxXQUFXO09BQ3BCUixLQUFLUSxZQUFZO09BQ2pCUixLQUFLSyxhQUFhM0IsTUFBTVEsVUFBVUMsTUFBTUMsS0FBSzRCO09BQzdDUDs7O0tBR0ZULEtBQUtpQixTQUFTLFVBQVU1QixLQUFLO09BQzNCLElBQUlXLEtBQUtRLFdBQVc7T0FDcEJSLEtBQUtRLFlBQVk7T0FDakJSLEtBQUtNLFFBQVFqQixPQUFPO09BQ3BCeUI7OztLQUdGZCxLQUFLTyxRQUFRVyxPQUFPLFVBQVVuQixJQUFJO09BQ2hDRSxNQUFNWSxLQUFLZDtPQUNYLElBQUlDLEtBQUtRLGFBQWEsQ0FBQ1IsS0FBS00sT0FBTztTQUNqQ0c7O09BRUYsT0FBT1QsS0FBS087OztLQUdkUCxLQUFLTyxRQUFRWSxRQUFRLFVBQVVwQixJQUFJO09BQ2pDSSxPQUFPVSxLQUFLZDtPQUNaLElBQUlDLEtBQUtRLGFBQWFSLEtBQUtNLE9BQU87U0FDaENROztPQUVGLE9BQU9kLEtBQUtPOzs7S0FHZFAsS0FBS08sUUFBUWEsT0FBTyxVQUFVckIsSUFBSTs7T0FFaENFLE1BQU1ZLEtBQUssWUFBWTtTQUNyQmQsR0FBR2EsTUFBTSxNQUFNLENBQUMsTUFBTVMsT0FBT3JCLEtBQUtLOzs7T0FHcENGLE9BQU9VLEtBQUssWUFBWTtTQUN0QmQsR0FBR2EsTUFBTSxNQUFNWixLQUFLTTs7O09BR3RCLElBQUlOLEtBQUtRLFdBQVc7U0FDbEIsSUFBSSxDQUFDUixLQUFLTSxPQUFPO1dBQ2ZHO2dCQUNJO1dBQ0pLOzs7O09BSUosT0FBT2Q7OztLQUlULElBQUdELElBQUlDLEtBQUtPLFFBQVFhLEtBQUtyQjtJQUUxQjs7O0dBR0RELFFBQVF3QixRQUFRLFVBQVV2QixJQUFJO0tBQzVCLE9BQU8sSUFBSUQsUUFBUUM7OztHQUdyQixPQUFPRDs7Ozs7OztBRTdGVDs7Ozs7QUNJQSxRQUFPLGVBQWUsU0FBUyxjQUFjO0dBQzNDLE9BQU87O0FBRVQsU0FBUSxVREpnQnlCO0FBQVQsVUFBU0EsV0FBWUMsTUFBTTNCLElBQUkxQixVQUFVcUIsV0FBV2lDLFVBQVVDLFVBQVVDLFdBQVdDLFFBQVFDLFVBQVU7R0FBRTs7OztHQUdwSCxJQUFNQyxZQUFZQyxPQUFPRCxhQUFhQyxPQUFPQyxnQkFBZ0JELE9BQU9FLG1CQUFtQkYsT0FBT0c7OztHQUc5RixJQUFNQyxpQkFBaUJKLE9BQU9JLGtCQUFrQkosT0FBT0ssd0JBQXdCTCxPQUFPTTtHQUN0RixJQUFNQyxjQUFjUCxPQUFPTyxlQUFlUCxPQUFPUSxxQkFBcUJSLE9BQU9TOzs7R0FHN0UsSUFBSSxDQUFDVixXQUFXO0tBQ2RXLE1BQU07S0FDTjs7OztHQUlGLFNBQVNDLElBQUlDLFNBQVNDLFlBQVlDLFNBQVM7S0FBRSxJQUFNN0MsT0FBTztLQUN4RDdCLFNBQVNjLFNBQVMrQixXQUFXLENBQUMsVUFBVSxVQUFVLENBQUMsVUFBVSxjQUFjLENBQUMsVUFBVTs7O0tBR3RGLElBQU04QixtQkFBbUI7S0FDekIsSUFBTUMsd0JBQXdCbEQsR0FBR3lCO0tBQ2pDLElBQU0wQixlQUFlbkQsR0FBR3lCO0tBQ3hCLElBQU0yQiwwQkFBMEJwRCxHQUFHeUI7S0FDbkMsSUFBSTRCLFVBQVU7OztLQUdkLElBQUlDLFdBQVc7S0FDZm5ELEtBQUtvRCxTQUFTOzs7S0FHZHBELEtBQUtxRCxPQUFPLFVBQVVDLFdBQVd2RCxJQUFJO09BQ25DNUIsU0FBU2MsU0FBUytCLFdBQVcsQ0FBQyxVQUFVOztPQUV4QyxJQUFJLENBQUM4QixpQkFBaUJRLFlBQVc7U0FDL0JSLGlCQUFpQlEsYUFBYTs7O09BR2hDUixpQkFBaUJRLFdBQVd6QyxLQUFLZDs7OztLQUtuQ0MsS0FBS3VELFNBQVMsVUFBVUQsV0FBV3ZELElBQUk7T0FDckM1QixTQUFTYyxTQUFTK0IsV0FBVyxDQUFDLFVBQVU7O09BRXhDLElBQUksQ0FBQzhCLGlCQUFpQlEsWUFBWTs7O09BR2xDLElBQU1FLE1BQU1WLGlCQUFpQlEsV0FBV0csUUFBUTFEOzs7T0FHaEQsSUFBSXlELE9BQU8sQ0FBQyxHQUFFO1NBQ1pWLGlCQUFpQlEsV0FBV0ksT0FBT0YsS0FBSzs7Ozs7S0FNNUN4RCxLQUFLMkQsVUFBVSxVQUFVTCxXQUFXdEUsTUFBTTtPQUN4Q2IsU0FBU2MsU0FBUytCLFdBQVcsQ0FBQyxVQUFVOztPQUV4Q1EsS0FBS29DLElBQUlqQixVQUFRLFFBQU1DLGNBQVksS0FBRyxPQUFLVTs7T0FFM0MsS0FBSSxJQUFJeEUsS0FBS2dFLGlCQUFpQlEsWUFBVztTQUN2Q1IsaUJBQWlCUSxXQUFXeEUsR0FBRzhCLE1BQU1aLE1BQU1oQjs7Ozs7S0FNL0NnQixLQUFLTSxRQUFRLFVBQVVQLElBQUk7T0FDekJDLEtBQUtxRCxLQUFLN0QsVUFBVUMsVUFBVU07T0FDOUIsT0FBT0M7Ozs7S0FJVEEsS0FBSzZELE9BQU8sWUFBWTtPQUN0QixJQUFJWCxTQUFTLE9BQU9GOzs7T0FHcEJFLFVBQVU7OztPQUdWLFNBQVNZLFFBQVE7O1NBRWYsSUFBTUMsS0FBS2pDLFVBQVUrQixLQUFLbEIsU0FBU0M7O1NBRW5DbUIsR0FBR0Msa0JBQWtCLFVBQVVDLE9BQU87O1dBRXBDbEIsc0JBQXNCaEMsUUFBUWtELE9BQU9GOzs7O1NBS3ZDQSxHQUFHRyxZQUFZLFVBQVVELE9BQU87O1dBRTlCZCxXQUFXWTs7O1dBR1hBLEdBQUdJLFVBQVUsVUFBVUYsT0FBTzthQUM1QnpDLEtBQUtsQixNQUFNLHFCQUFvQjJELE1BQU1HLE9BQU9DO2FBQzVDckUsS0FBSzJELFFBQVFuRSxVQUFVQyxVQUFVLENBQUN3RTs7O1dBR3BDakIsYUFBYWpDLFFBQVFrRCxPQUFPRjs7Ozs7U0FNOUJBLEdBQUdJLFVBQVUsVUFBVUYsT0FBTztXQUM1QmpCLGFBQWEvQixPQUFPOEMsR0FBR00sV0FBV0o7O1FBR3JDOztPQUVEbkMsVUFBVXdDLGVBQWUzQixTQUFTdUIsWUFBWUo7OztPQUc5QyxPQUFPZDs7OztLQUtUaEQsS0FBS3VFLFFBQVEsVUFBVWhGLE1BQU1pRixRQUFRO09BQ25DckcsU0FBU2MsU0FBUytCLFdBQVcsQ0FBQyxVQUFVLENBQUMsYUFBYTs7O09BR3RELElBQUl1RCxRQUFRdkUsS0FBS29ELE9BQU83RDs7O09BR3hCLElBQUcsQ0FBQ2dGLE9BQU07U0FDUkEsUUFBUTlDLFNBQVN6QixNQUFNVCxNQUFNaUYsVUFBVTNCOzs7O09BSXpDN0MsS0FBS29ELE9BQU83RCxRQUFRZ0Y7OztPQUdwQixPQUFPQTs7OztLQUtUdkUsS0FBS3lFLFFBQVEsVUFBVUMsT0FBT0MsU0FBUzs7T0FFckMsT0FBTyxJQUFJakQsU0FBUzFCLE1BQU0wRSxPQUFPQzs7OztLQUtuQzNFLEtBQUs0RSxjQUFjLFVBQVVDLFdBQVdDLFNBQVM7T0FDL0MzRyxTQUFTYyxTQUFTK0IsV0FBVyxDQUFDLFVBQVUsQ0FBQyxVQUFVOztPQUVuRCtCLHNCQUFzQnhDLFFBQVFXLEtBQUssVUFBVStDLE9BQU9GLElBQUk7U0FDdERBLEdBQUdnQixPQUFPQyxrQkFBa0JILFdBQVdDOzs7OztLQU0zQzlFLEtBQUtpRixjQUFjLFVBQVVKLFdBQVdLLFdBQVdDLFdBQVdDLE1BQU07T0FDbEVqSCxTQUFTYyxTQUFTK0IsV0FBVyxDQUFDLFVBQVUsVUFBVSxVQUFVLENBQUMsVUFBVTs7T0FFdkUrQixzQkFBc0J4QyxRQUFRVyxLQUFLLFVBQVUrQyxPQUFPRixJQUFJO1NBQ3RELElBQU1zQixRQUFRdEIsR0FBR3VCLFlBQVlDLFlBQVlWO1NBQ3pDUSxNQUFNSixZQUFZQyxXQUFXQyxXQUFXQzs7Ozs7S0FNNUNwRixLQUFLc0YsY0FBYyxVQUFTVCxXQUFXVyxPQUFPQyxRQUFRO09BQ3BEdEgsU0FBU2MsU0FBUytCLFdBQVcsQ0FBQyxVQUFVLFVBQVU7O09BRWxELElBQU0wRSxVQUFVN0YsR0FBR3lCOzs7T0FHbkIwQixhQUFhekMsUUFBUVcsS0FBSyxVQUFVK0MsT0FBT0YsSUFBSTtTQUM3QyxJQUFNNEIsS0FBSzVCLEdBQUdnQixPQUFPTyxZQUFZVCxXQUFXVztTQUM1QyxJQUFNVCxTQUFTVSxPQUFPRTs7O1NBR3RCQSxHQUFHQyxhQUFhLFVBQVUzQixPQUFPO1dBQy9CeUIsUUFBUTNFLFFBQVFrRCxPQUFPYzs7OztTQUl6QlksR0FBR0UsVUFBVSxZQUFZO1dBQ3ZCSCxRQUFRekUsT0FBTzBFLEdBQUdyRjs7OztPQUt0QixPQUFPb0Y7Ozs7S0FLVDFGLEtBQUs4RixNQUFNLFVBQVVqQixXQUFXa0IsVUFBVTtPQUN4QzVILFNBQVNjLFNBQVMrQixXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVU7O09BRW5ELElBQU0wRSxVQUFVN0YsR0FBR3lCOzs7T0FHbkJ0QixLQUFLc0YsWUFBWVQsV0FBVyxhQUFhLFVBQVVjLElBQUk7U0FDckQsSUFBTTVCLEtBQUs0QixHQUFHSixZQUFZVixXQUFXaUIsSUFBSUMsU0FBU0M7OztTQUdsRGpDLEdBQUdHLFlBQWEsVUFBVUQsT0FBTzs7V0FFL0I4QixTQUFTRSxRQUFRaEMsTUFBTUcsT0FBT1c7V0FDOUJXLFFBQVEzRSxRQUFRZ0YsVUFBVTlCOzs7O1NBSTVCRixHQUFHSSxVQUFXLFVBQVVGLE9BQU87O1dBRTdCeUIsUUFBUXpFLE9BQU9nRDs7OztPQUtuQixPQUFPeUI7Ozs7S0FLVDFGLEtBQUtrRyxNQUFNLFVBQVV4QixPQUFPeUIsS0FBSztPQUMvQmhJLFNBQVNjLFNBQVMrQixXQUFXLENBQUMsWUFBWSxDQUFDLFVBQVU7O09BRXJELElBQU0wRSxVQUFVN0YsR0FBR3lCO09BQ25CLElBQU15RSxXQUFXckIsTUFBTTBCLFlBQVlEO09BQ25DLElBQU10QixZQUFZSCxNQUFNMkI7O09BRXhCTixTQUFTTyxXQUFXWixRQUFRbkY7T0FDNUJ3RixTQUFTdkYsWUFBWTs7T0FFckJSLEtBQUtzRixZQUFZVCxXQUFXLFlBQVksVUFBVWMsSUFBSTtTQUNwRCxJQUFNTixRQUFRTSxHQUFHSixZQUFZVjtTQUM3QixJQUFNZCxLQUFLc0IsTUFBTWEsSUFBSUM7O1NBRXJCcEMsR0FBR0csWUFBWSxVQUFTRCxPQUFPO1dBQzdCUyxNQUFNNkIsYUFBYUosS0FBSzVGLFFBQ3JCVyxLQUFLLFVBQVVzRixTQUFTO2FBQ3ZCLElBQUl6QyxHQUFHZ0IsVUFBVXZHLFdBQVU7ZUFDekJ1SCxTQUFTVSxnQkFBZ0IxQyxHQUFHZ0IsUUFBUXlCLFVBQVNBLFFBQVFFLE9BQU87O2FBRTlEWCxTQUFTdkYsWUFBWTthQUNyQmtGLFFBQVEzRSxRQUFRZ0Y7Y0FFakI1RSxNQUFNLFVBQVU5QixLQUFLO2FBQ3BCbUMsS0FBS2xCLE1BQU0sQ0FBQyxhQUFhakI7Ozs7U0FJL0IwRSxHQUFHSSxVQUFVLFVBQVVGLE9BQU87V0FDNUJ5QixRQUFRekUsT0FBTzhFOzs7O09BS25CLE9BQU9BOzs7O0tBS1QvRixLQUFLMkcsT0FBTyxVQUFVakMsT0FBT0MsU0FBUztPQUNwQ3hHLFNBQVNjLFNBQVMrQixXQUFXLENBQUMsWUFBWSxDQUFDLFVBQVU7T0FDckQsSUFBTTZELFlBQVlILE1BQU0yQjtPQUN4QixJQUFNWCxVQUFVN0YsR0FBR3lCO09BQ25CLElBQU15RCxTQUFTOztPQUVmQSxPQUFPdUIsV0FBV1osUUFBUW5GO09BQzFCd0UsT0FBT3ZFLFlBQVk7OztPQUduQlIsS0FBS3NGLFlBQVlULFdBQVcsWUFBWSxVQUFVYyxJQUFJO1NBQ3BELElBQU1OLFFBQVFNLEdBQUdKLFlBQVlWO1NBQzdCLElBQU1kLEtBQUtzQixNQUFNdUI7O1NBRWpCN0MsR0FBR0csWUFBWSxZQUFXO1dBQ3hCLElBQU0yQyxTQUFTOUMsR0FBR2dCOzs7V0FHbEIsSUFBSSxDQUFDOEIsUUFBTzthQUNWOUIsT0FBT3ZFLFlBQVk7YUFDbkIsT0FBT2tGLFFBQVEzRSxRQUFRZ0U7OztXQUd6QixJQUFNb0IsTUFBTXpCLE1BQU1vQyxXQUFXRCxPQUFPdEk7O1dBRXBDbUcsTUFBTTZCLGFBQWFKLEtBQUs1RixRQUVyQlcsS0FBSyxVQUFVc0YsU0FBUzs7O2FBR3ZCLElBQU1ULFdBQVdyQixNQUFNMEIsWUFBWUQ7O2FBRW5DSixTQUFTVSxnQkFBZ0JJLE9BQU90SSxPQUFPaUksVUFBU0EsUUFBUUUsT0FBTzthQUMvRFgsU0FBU3ZGLFlBQVk7YUFDckJ1RixTQUFTZ0IsTUFBTXZILFVBQVVHLGVBQWVvRjs7O2FBR3hDQSxPQUFPbEUsS0FBS2tGOzs7YUFHWmMsT0FBT0c7Y0FJUjdGLE1BQU0sVUFBVTlCLEtBQUs7YUFDcEJtQyxLQUFLbEIsTUFBTSxDQUFDLGFBQWFqQjs7Ozs7T0FTakMsT0FBTzBGOzs7O0tBS1QsSUFBSWtDO0tBQ0pDLE9BQU9DLEtBQUtGLFdBQVc7T0FDckJHLFFBQVFwRTtPQUNScUUsaUJBQWlCdEU7T0FDakJ1RSxtQkFBbUJyRTtRQUNsQnNFLElBQUksVUFBVXBCLEtBQUs7T0FDcEJjLFNBQVNkLEtBQUs1RixRQUFRYSxLQUFLLFVBQVUvQixLQUFLO1NBQ3hDLElBQU1tSSxPQUFPN0UsVUFBUSxRQUFNQyxjQUFZLEtBQUcsT0FBS3VEO1NBQy9DLElBQUk5RyxLQUFJO1dBQ05tQyxLQUFLbEIsTUFBTWtILE1BQU1uSTtnQkFDWjtXQUNMbUMsS0FBS29DLElBQUk0RDs7O09BR2J4SCxLQUFLbUcsT0FBTyxVQUFVcEcsSUFBSTtTQUN4QjVCLFNBQVNjLFNBQVMrQixXQUFXLENBQUM7U0FDOUJpRyxTQUFTZCxLQUFLNUYsUUFBUWEsS0FBS3JCO1NBQzNCLE9BQU9DOzs7SUFJWjs7R0FFRCxPQUFPMEM7Ozs7Ozs7QUVqV1Q7Ozs7O0FDSUEsUUFBTyxlQUFlLFNBQVMsY0FBYztPQUN2QyxPQUFPOztBQUViLFNBQVEsVURKZ0IrRTtBQUFULFVBQVNBLGdCQUFpQmpHLE1BQU0zQixJQUFJMUIsVUFBVXVKLFlBQVk3RixVQUFVckMsV0FBVztPQUFFOzs7O09BRzlGLElBQU1tSSxrQkFBa0IsU0FBbEJBLGdCQUE0QkMsS0FBS0MsT0FBTzlILElBQUk7YUFDaEQ1QixTQUFTYyxTQUFTK0IsV0FBVyxDQUFDLFVBQVUsVUFBVTs7YUFFbEQsSUFBTThHLFNBQVNELE1BQU1FLE1BQU07YUFDM0IsSUFBTUMsWUFBWUYsT0FBT0c7O2FBRXpCLE9BQVEsU0FBU0MsS0FBS04sS0FBSzttQkFDekIsSUFBSUUsT0FBT3BILFVBQVUsR0FDbkIsT0FBT1gsR0FBRzZILEtBQUtJO21CQUNqQixJQUFNSCxRQUFRQyxPQUFPbkg7bUJBQ3JCLElBQUksT0FBT2lILElBQUlDLFdBQVcsYUFDeEJELElBQUlDLFNBQVM7bUJBQ2YsT0FBT0ssS0FBS04sSUFBSUM7ZUFDZkQ7OztPQUlMLE9BQU8sU0FBU25HLFNBQVUwRyxLQUFLQyxZQUFZdkYsU0FBUzthQUNsRDFFLFNBQVNjLFNBQVMrQixXQUFXLENBQUMsTUFBTTs7O2FBR3BDLElBQU1xSCxNQUFNLEVBQUVDLFNBQVMsTUFBTUMsZUFBZTthQUM1QyxJQUFNQyxrQkFBa0I7YUFDeEIsSUFBTUMsYUFBYTthQUNuQixJQUFJQyxVQUFVO2FBQ2QsSUFBSUMsVUFBVTthQUNkLElBQUlDLGNBQWM7OzthQUdsQixTQUFTbEUsTUFBTW1FLE1BQU07bUJBQUUsSUFBTTdJLE9BQU87bUJBQ2xDN0IsU0FBU2MsU0FBUytCLFdBQVcsQ0FBQyxDQUFDLFVBQVU7O21CQUV6Q2hCLEtBQUs4SSxVQUFVO21CQUNmOUksS0FBS1EsWUFBWTs7bUJBRWpCUixLQUFLK0ksZUFBZTttQkFDcEIvSSxLQUFLZ0osZ0JBQWdCOzttQkFFckJoSixLQUFLaUosV0FBVzttQkFDaEJqSixLQUFLa0osZ0JBQWdCO21CQUNyQmxKLEtBQUttSixpQkFBaUI7O21CQUV0Qm5KLEtBQUt3SSxrQkFBa0I7O21CQUV2QixJQUFJSyxNQUFLO3lCQUNQN0ksS0FBS29KLFdBQVdQOzs7bUJBR2xCN0ksS0FBS3FKLGFBQWFSOzttQkFFbEIsSUFBSWhHLFNBQVM7eUJBQ1g3QyxLQUFLc0o7OzttQkFHUCxJQUFNQyxXQUFXOzttQkFFakJ2Sjs7b0JBRUd3SixNQUFNaEssVUFBVUcsZUFBZSxVQUFVOEUsT0FBTzt5QkFDL0M4RSxTQUFTMUksS0FBSzREOzs7O29CQUlmK0UsTUFBTWhLLFVBQVVJLGlCQUFpQixVQUFVNkUsT0FBTzt5QkFDakQsSUFBTWpCLE1BQU0rRixTQUFTOUYsUUFBUWdCO3lCQUM3QixJQUFJakIsT0FBTyxDQUFDLEdBQUU7K0JBQ1orRixTQUFTN0YsT0FBT0YsS0FBSzs7Ozs7b0JBS3hCdUQsTUFBTXZILFVBQVVFO2NBRXBCOzs7YUFHRGdGLE1BQU0yQixlQUFlLFlBQVk7O21CQUUvQixPQUFPK0I7Ozs7YUFLVDFELE1BQU0rRSxhQUFhLFlBQVk7O21CQUU3QixPQUFPcEIsSUFBSUM7Ozs7YUFLYjVELE1BQU02RCxnQkFBZ0IsVUFBVUEsZUFBZTttQkFDN0NwSyxTQUFTYyxTQUFTK0IsV0FBVyxDQUFDOzttQkFFOUJxSCxJQUFJRSxnQkFBZ0JBO21CQUNwQixPQUFPN0Q7Ozs7YUFLVEEsTUFBTTRELFVBQVUsVUFBVUEsU0FBUzttQkFDakNuSyxTQUFTYyxTQUFTK0IsV0FBVyxDQUFDOzttQkFFOUJxSCxJQUFJQyxVQUFVQTttQkFDZCxPQUFPNUQ7Ozs7YUFLVEEsTUFBTUUsY0FBYyxZQUFZOzttQkFFOUJ1RCxJQUFJdkQsWUFBWXdELFlBQVlDO21CQUM1QixPQUFPM0Q7Ozs7YUFLVEEsTUFBTWdGLFFBQVEsVUFBVXhFLFdBQVdDLFdBQVdDLE1BQU07O21CQUVsRCtDLElBQUlsRCxZQUFZbUQsWUFBWWxELFdBQVdDLFdBQVdDO21CQUNsRCxPQUFPVjs7OzthQUtUQSxNQUFNaUYsUUFBUSxVQUFVQyxlQUFlO21CQUNyQ3pMLFNBQVNjLFNBQVMrQixXQUFXLENBQUM7O21CQUU5QjRJLGNBQWNsRjttQkFDZCxPQUFPQTs7OzthQUtUQSxNQUFNb0QsU0FBUyxVQUFVQSxRQUFRO21CQUMvQjNKLFNBQVNjLFNBQVMrQixXQUFXLENBQUM7O21CQUU5QjBILFVBQVU7bUJBQ1ZBLFFBQVFMLElBQUlDLFdBQVc7eUJBQ3JCLFFBQVE7eUJBQ1IsWUFBWTs7O21CQUdkcEIsT0FBT0MsS0FBS1csUUFBUVAsSUFBSSxVQUFVcEMsV0FBVzt5QkFDM0MsSUFBSTBDLFFBQVFDLE9BQU8zQzt5QkFDbkIsSUFBSSxPQUFPMkMsT0FBTzNDLGNBQWMsVUFBUzsrQkFDdkMwQyxRQUFRLEVBQUUsUUFBUUE7O3lCQUVwQmEsUUFBUXZELGFBQWEwQzs7O21CQUd2QixPQUFPbkQ7Ozs7YUFLVEEsTUFBTW1GLFNBQVMsVUFBVUMsS0FBSzlLLE1BQU0rSyxTQUFTO21CQUMzQzVMLFNBQVNjLFNBQVMrQixXQUFXLENBQUMsVUFBVSxVQUFVOzttQkFFbEQySCxVQUFVakIsV0FBV29DLEtBQUs5SyxNQUFNK0s7bUJBQ2hDLE9BQU9yRjs7OzthQUtUQSxNQUFNc0YsWUFBWSxZQUFZOzttQkFFNUIsT0FBT3JCOzs7O2FBS1RqRSxNQUFNdUYsZ0JBQWdCLFlBQVk7O21CQUVoQyxPQUFPckI7Ozs7YUFLVGxFLE1BQU13RixnQkFBZ0IsVUFBVXRDLEtBQUtDLE9BQU87bUJBQzFDLE9BQU9GLGdCQUFnQkMsS0FBS0MsT0FBTyxVQUFVRCxLQUFLSSxXQUFXO3lCQUMzRCxPQUFPSixJQUFJSTs7Ozs7YUFLZnRELE1BQU15RixnQkFBZ0IsVUFBVXZDLEtBQUtDLE9BQU90SixPQUFPO21CQUNqRG9KLGdCQUFnQkMsS0FBS0MsT0FBTyxVQUFVRCxLQUFLSSxXQUFXO3lCQUNwREosSUFBSUksYUFBYXpKOzttQkFFbkIsT0FBT3FKOzs7O2FBSVRsRCxNQUFNb0MsYUFBYSxVQUFVK0IsTUFBTTttQkFDakMsT0FBT25FLE1BQU13RixjQUFjckIsTUFBTVIsSUFBSUM7Ozs7O2FBS3ZDNUQsTUFBTTBCLGNBQWMsVUFBVUQsS0FBSzttQkFDakNoSSxTQUFTYyxTQUFTK0IsV0FBVyxDQUFDLENBQUMsVUFBVSxVQUFVOzs7bUJBR25ELElBQUksQ0FBQ21GLEtBQUs7eUJBQ1IsT0FBTyxJQUFJekI7Ozs7bUJBSWIsSUFBSSxDQUFDK0QsV0FBV3RDLE1BQUs7eUJBQ25Cc0MsV0FBV3RDLE9BQU8sSUFBSXpCOzs7bUJBR3hCLE9BQU8rRCxXQUFXdEM7Ozs7YUFLcEJ6QixNQUFNd0IsTUFBTSxVQUFVQyxLQUFLOzttQkFFekIsT0FBT2dDLElBQUlqQyxJQUFJeEIsT0FBT3lCOzs7O2FBS3hCekIsTUFBTWlDLE9BQU8sVUFBVWhDLFNBQVM7O21CQUU5QixPQUFPd0QsSUFBSTFELE1BQU1DLE9BQU9DOzs7O2FBSzFCRCxNQUFNMEYsU0FBUyxVQUFVdkIsTUFBTTttQkFDN0IxSyxTQUFTYyxTQUFTK0IsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZOzs7bUJBR3JELElBQUk2SCxLQUFLbkksV0FBV2xDLFdBQVc7eUJBQzdCLElBQU02TCxTQUFTM0YsTUFBTTBCLFlBQVkxQixNQUFNb0MsV0FBVytCOzt5QkFFbEQsSUFBSXdCLE9BQU92QixTQUFTOytCQUNsQixNQUFNLElBQUl4SixNQUFNOzs7eUJBR2xCLE9BQU8rSyxPQUFPQzs7OzttQkFLaEIsSUFBTUMsTUFBTTdMLE1BQU1RLFVBQVVDLE1BQU1DLEtBQUt5SjttQkFDdkMsSUFBTTlELFNBQVM7bUJBQ2YsSUFBTVcsVUFBVTdGLEdBQUd5QixNQUFNdkI7O21CQUV6QixDQUFDLFNBQVN5SyxZQUFZOzs7eUJBR3BCLElBQUlELElBQUk3SixVQUFVLEdBQUcsT0FBT2dGLFFBQVEzRSxRQUFRZ0U7Ozt5QkFHNUNMLE1BQU0wRixPQUFPRyxJQUFJNUosU0FDZE8sS0FBSyxVQUFVNkUsVUFBVTsrQkFDeEJoQixPQUFPbEUsS0FBS2tGOytCQUNaeUU7NEJBRURySixNQUFNLFVBQVU5QixLQUFLOytCQUNwQnFHLFFBQVF6RSxPQUFPNUI7Ozs7O21CQU1yQixPQUFPcUc7Ozs7YUFLVGhCLE1BQU0rRixhQUFhLFVBQVU1RixXQUFXOUUsSUFBSTttQkFDMUMsSUFBSSxPQUFPOEUsY0FBYyxZQUFZO3lCQUNuQzlFLEtBQUs4RTt5QkFDTEEsWUFBWXJHOzttQkFFZEwsU0FBU2MsU0FBUyxDQUFDNEYsV0FBVzlFLEtBQUssQ0FBQyxDQUFDLFVBQVUsY0FBYyxDQUFDLFlBQVk7O21CQUUxRSxJQUFJLENBQUM2SSxhQUFhOzs7eUJBR2hCLElBQUksQ0FBQy9ELFdBQVU7K0JBQ2JBLFlBQVl1RCxhQUFXOzs7O3lCQUl6QlEsY0FBY1QsSUFBSTVELE1BQU1NLFdBQ3JCMEQsY0FBYyxPQUNkRCxRQUFRLE9BQ1JSLE9BQU87K0JBQ04sUUFBUSxFQUFFLFFBQVEsVUFBVSxZQUFZOzs7O21CQUs5QyxJQUFJL0gsSUFBSUEsR0FBRzZJOzttQkFFWCxPQUFPbEU7Ozs7YUFLVEEsTUFBTXJCLE9BQU8sVUFBVUMsV0FBV29ILFNBQVM7bUJBQ3pDdk0sU0FBU2MsU0FBUytCLFdBQVcsQ0FBQyxVQUFVLENBQUMsWUFBWTs7bUJBRXJELElBQUksQ0FBQ3dILGdCQUFnQmxGLFlBQVk7eUJBQy9Ca0YsZ0JBQWdCbEYsYUFBYTs7O21CQUcvQmtGLGdCQUFnQmxGLFdBQVd6QyxLQUFLNko7O21CQUVoQyxPQUFPaEc7Ozs7YUFLVEEsTUFBTWlHLE9BQU8sVUFBVXJILFdBQVd0RSxNQUFNO21CQUN0Q2IsU0FBU2MsU0FBUytCLFdBQVcsQ0FBQyxVQUFVLENBQUMsYUFBYTs7bUJBRXRELElBQUl3SCxnQkFBZ0JsRixZQUFZO3lCQUM5QmtGLGdCQUFnQmxGLFdBQVdpRSxJQUFJLFVBQVV4SCxJQUFJOytCQUMzQ0EsR0FBR2EsTUFBTThELE9BQU8xRixRQUFROzs7O21CQUk1QixPQUFPMEY7Ozs7YUFLVEEsTUFBTXhGLFVBQVUwTCxPQUFPLFVBQVUvQyxPQUFPOzttQkFFdEMsT0FBT25ELE1BQU13RixjQUFjLE1BQU1yQzs7OzthQUtuQ25ELE1BQU14RixVQUFVMkwsT0FBTyxVQUFVaEQsT0FBT3RKLE9BQU87O21CQUU3QyxPQUFPbUcsTUFBTXdGLGNBQWMsTUFBTXJDLE9BQU90Sjs7OzthQUsxQ21HLE1BQU14RixVQUFVOEcsYUFBYSxZQUFZO21CQUFFLElBQU1oRyxPQUFPO21CQUN0RCxJQUFNOEssU0FBUzs7bUJBRWY1RCxPQUFPQyxLQUFLdUIsU0FBU25CLElBQUksVUFBVU0sT0FBTzt5QkFDeENuRCxNQUFNeUYsY0FBY1csUUFBUWpELE9BQU9uRCxNQUFNd0YsY0FBY2xLLE1BQU02SDs7O21CQUcvRCxPQUFPaUQ7Ozs7YUFLVHBHLE1BQU14RixVQUFVNkwsa0JBQWtCLFlBQVk7bUJBQUUsSUFBTS9LLE9BQU87bUJBQzNELElBQU04SyxTQUFTOzttQkFFZjVELE9BQU9DLEtBQUt1QixTQUFTbkIsSUFBSSxVQUFVTSxPQUFPO3lCQUN4Q25ELE1BQU15RixjQUFjVyxRQUFRakQsT0FBT25ELE1BQU13RixjQUFjbEssS0FBSytJLGNBQWNsQjs7O21CQUc1RSxPQUFPaUQ7Ozs7YUFLVHBHLE1BQU14RixVQUFVOEwsbUJBQW1CLFlBQVk7bUJBQUUsSUFBTWhMLE9BQU87bUJBQzVELElBQU04SyxTQUFTOzttQkFFZjVELE9BQU9DLEtBQUt1QixTQUFTbkIsSUFBSSxVQUFVTSxPQUFPO3lCQUN4Q25ELE1BQU15RixjQUFjVyxRQUFRakQsT0FBT25ELE1BQU13RixjQUFjbEssS0FBS2dKLGVBQWVuQjs7O21CQUc3RSxPQUFPaUQ7Ozs7YUFLVHBHLE1BQU14RixVQUFVa0ssYUFBYSxVQUFVUCxNQUFNckMsU0FBUzttQkFBRSxJQUFNeEcsT0FBTzttQkFDbkU3QixTQUFTYyxTQUFTK0IsV0FBVyxDQUFDLFVBQVUsQ0FBQyxVQUFVOzttQkFFbkRoQixLQUFLaUosV0FBV3pDOzttQkFFaEJVLE9BQU9DLEtBQUswQixNQUFNdEIsSUFBSSxVQUFVTSxPQUFPO3lCQUNyQ25ELE1BQU15RixjQUFjbkssTUFBTTZILE9BQU9nQixLQUFLaEI7OzttQkFHeEM3SCxLQUFLOEksVUFBVTs7bUJBRWYsT0FBTzlJOzs7O2FBS1QwRSxNQUFNeEYsVUFBVXVILGtCQUFrQixVQUFVb0MsTUFBTXJDLFNBQVM7bUJBQUUsSUFBTXhHLE9BQU87bUJBQ3hFN0IsU0FBU2MsU0FBUytCLFdBQVcsQ0FBQyxVQUFVLENBQUMsVUFBVTs7bUJBRW5EaEIsS0FBS2tKLGdCQUFnQjFDOzttQkFFckJVLE9BQU9DLEtBQUswQixNQUFNdEIsSUFBSSxVQUFVTSxPQUFPO3lCQUNyQ25ELE1BQU15RixjQUFjbkssS0FBSytJLGNBQWNsQixPQUFPZ0IsS0FBS2hCOzs7bUJBR3JELElBQUksQ0FBQzdILEtBQUs4SSxTQUFTO3lCQUNqQjlJLEtBQUtvSixXQUFXUCxNQUFNckM7OzttQkFHeEIsT0FBT3hHOzs7O2FBS1QwRSxNQUFNeEYsVUFBVStMLG1CQUFtQixVQUFVcEMsTUFBTXJDLFNBQVM7bUJBQUUsSUFBTXhHLE9BQU87bUJBQ3pFN0IsU0FBU2MsU0FBUytCLFdBQVcsQ0FBQyxVQUFVLENBQUMsVUFBVTs7bUJBRW5EaEIsS0FBS21KLGlCQUFpQjNDOzttQkFFdEJVLE9BQU9DLEtBQUswQixNQUFNdEIsSUFBSSxVQUFVTSxPQUFPO3lCQUNyQ25ELE1BQU15RixjQUFjbkssS0FBS2dKLGVBQWVuQixPQUFPZ0IsS0FBS2hCOzs7bUJBR3RELElBQUksQ0FBQzdILEtBQUs4SSxTQUFTO3lCQUNqQjlJLEtBQUtvSixXQUFXUCxNQUFNckM7OzttQkFHeEIsT0FBT3hHOzs7O2FBS1QwRSxNQUFNeEYsVUFBVStHLFVBQVUsVUFBVWlGLFFBQVE7O21CQUUxQyxJQUFNQyxTQUFTekcsTUFBTW9DLFdBQVc7O21CQUVoQ3BDLE1BQU1pRCxnQkFBZ0IsTUFBTVUsSUFBSUMsU0FBUyxVQUFVVixLQUFLSSxXQUFXO3lCQUNqRUosSUFBSUksYUFBYWtEOzs7bUJBR25CLElBQUlDLFdBQVdELFFBQVE7O3lCQUVyQixJQUFJQyxVQUFVMUMsV0FBVzBDLFdBQVcxQyxXQUFXMEMsV0FBVyxNQUFNOytCQUM5RCxNQUFNLElBQUk3TCxNQUFNOzt5QkFFbEIsSUFBSTRMLFVBQVV6QyxXQUFXeUMsV0FBV3pDLFdBQVd5QyxXQUFXLE1BQU07K0JBQzlELE1BQU0sSUFBSTVMLE1BQU07Ozs7eUJBSWxCLElBQUk2TCxVQUFVMUMsV0FBVzBDLFNBQVM7K0JBQ2hDLE9BQU8xQyxXQUFXMEM7Ozs7eUJBSXBCLElBQUlELFVBQVUsQ0FBQ3pDLFdBQVd5QyxTQUFTOytCQUNqQ3pDLFdBQVd5QyxVQUFVOzs7O21CQUt6QixPQUFPOzs7O2FBS1R4RyxNQUFNeEYsVUFBVW1LLGVBQWUsVUFBVVIsTUFBTTs7O2FBSS9DbkUsTUFBTXhGLFVBQVVrTSxZQUFZLFlBQVk7O21CQUV0QyxPQUFPM0MsV0FBVyxLQUFLbUMsS0FBS3ZDLElBQUlDLGNBQWM7Ozs7YUFLaEQ1RCxNQUFNNkIsZUFBZSxVQUFVSixLQUFLOzttQkFFbEMsSUFBTVQsVUFBVTdGLEdBQUd5Qjs7bUJBRW5CLElBQUlzSCxhQUFhO3lCQUNmQSxZQUFZMUMsSUFBSUMsS0FBS0csU0FDbEJwRixLQUFLLFVBQVU2RSxVQUFVOytCQUN4QkwsUUFBUTNFLFFBQVFnRjs0QkFFakI1RSxNQUFNLFlBQVk7K0JBQ2pCdUUsUUFBUXpFLE9BQU87OzBCQUVkO3lCQUNMWSxTQUFTLFlBQVk7K0JBQ25CNkQsUUFBUTNFLFFBQVE7Ozs7bUJBSXBCLE9BQU8yRTs7OzthQUtUaEIsTUFBTXhGLFVBQVVvTCxRQUFRLFlBQVc7bUJBQUUsSUFBTXRLLE9BQU87bUJBQ2hEN0IsU0FBU2MsU0FBUytCLFdBQVcsQ0FBQyxZQUFZOzttQkFFMUMsT0FBT21ILElBQUlyQyxJQUFJc0MsWUFBWTs7OzthQUs3QjFELE1BQU14RixVQUFVb0ssVUFBVSxZQUFZO21CQUFFLElBQU10SixPQUFPO21CQUNuRCxJQUFJLENBQUM2QyxTQUFTLE1BQU0sSUFBSXZELE1BQU07Ozs7bUJBSTlCdUQsUUFBUXdJLFVBQVU7eUJBQ2hCeEcsV0FBV3VEO3lCQUNYOUUsV0FBVzt5QkFDWHdCLFNBQVM5RSxLQUFLNEssS0FBS2xHLE1BQU0rRTtzQkFDeEIsVUFBVVosTUFBTTs7O3lCQUdqQmhILFNBQVMsWUFBWTs7K0JBRW5CN0IsS0FBS2lMLGlCQUFpQnBDLEtBQUtpQyxRQUFRakMsS0FBS3JDOzs7Ozs7YUFROUM5QixNQUFNeEYsVUFBVXNLLFFBQVEsVUFBVWxHLFdBQVdvSCxTQUFTO21CQUNwRHZNLFNBQVNjLFNBQVMrQixXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVk7O21CQUVyRCxJQUFJLENBQUMsS0FBS3dILGdCQUFnQmxGLFlBQVk7eUJBQ3BDLEtBQUtrRixnQkFBZ0JsRixhQUFhOzs7bUJBR3BDLEtBQUtrRixnQkFBZ0JsRixXQUFXekMsS0FBSzZKOzttQkFFckMsT0FBTzs7OzthQUtUaEcsTUFBTXhGLFVBQVU2SCxRQUFRLFVBQVV6RCxXQUFXdEUsTUFBTTttQkFBRSxJQUFNZ0IsT0FBTzttQkFDaEU3QixTQUFTYyxTQUFTK0IsV0FBVyxDQUFDLFVBQVUsQ0FBQyxhQUFhOzs7bUJBR3REMEQsTUFBTWlHLEtBQUtySCxXQUFXLENBQUN0RCxNQUFNLEdBQUdxQixPQUFPLENBQUNyQixPQUFPcUIsT0FBT3JDOzttQkFFdEQsSUFBSWdCLEtBQUt3SSxnQkFBZ0JsRixZQUFZO3lCQUNuQ3RELEtBQUt3SSxnQkFBZ0JsRixXQUFXaUUsSUFBSSxVQUFVeEgsSUFBSTsrQkFDaERBLEdBQUdhLE1BQU1aLE1BQU1oQixRQUFROzs7O21CQUkzQixPQUFPZ0I7OzthQUlUMEUsTUFBTStELGFBQWFBOzthQUVuQixPQUFPL0Q7Ozs7Ozs7O0FFM2pCWDs7Ozs7QUNJQSxRQUFPLGVBQWUsU0FBUyxjQUFjO0dBQzNDLE9BQU87O0FBRVQsU0FBUSxVREpnQmhEO0FBQVQsVUFBU0EsU0FBVUYsTUFBTXJELFVBQVVxQixXQUFXO0dBQUU7O0dBRTdELE9BQU8sU0FBU2tDLFNBQVN5RyxLQUFLbUQsUUFBUUMsVUFBVTtLQUFFLElBQU12TCxPQUFPO0tBQzdEN0IsU0FBU2MsU0FBUytCLFdBQVcsQ0FBQyxVQUFVLFlBQVksQ0FBQyxVQUFVOztLQUUvRCxJQUFJd0ssVUFBVTs7O0tBR2R4TCxLQUFLeUwsWUFBWSxVQUFVMUwsSUFBSTtPQUFFLElBQU1DLE9BQU87T0FDNUM3QixTQUFTYyxTQUFTK0IsV0FBVyxDQUFDLENBQUMsWUFBWTs7O09BRzNDLElBQUksQ0FBQ3dLLFNBQVM7U0FDWkEsVUFBVXJELElBQUl4QixLQUFLMkUsUUFBUUM7O1NBRTNCQyxRQUFRbEYsU0FDTHBGLEtBQUssWUFBWTtXQUNoQmxCLEtBQUswTDs7OztPQUtYLE9BQU9GOzs7O0tBS1R4TCxLQUFLMEwsa0JBQWtCLFVBQVUzTCxJQUFJO09BQ25DNUIsU0FBU2MsU0FBUytCLFdBQVcsQ0FBQyxDQUFDLFlBQVk7O09BRTNDLElBQUkySCxVQUFVMkMsT0FBT3RCO09BQ3JCLElBQUkyQixnQkFBZ0I7O09BRXBCLElBQUloRCxXQUFXLE9BQU9BLFFBQVFoQyxRQUFRLFlBQVk7U0FDaEQsQ0FBQ2dGLGdCQUFnQmhELFFBQVFoQyxLQUFLNEUsVUFBVXhMLElBQUl1RyxVQUN6Q3BGLEtBQUssVUFBVTZELFFBQVE7V0FDdEJBLE9BQU93QyxJQUFJLFVBQVU4QyxRQUFRdkwsR0FBRzthQUM5QndNLE9BQU9wRixJQUFJb0YsT0FBT3hFLFdBQVd1RCxPQUFPUyxTQUFTeEUsU0FDMUNwRixLQUFLLFVBQVUwSyxTQUFTOztlQUV2QkEsUUFBUVgsaUJBQWlCWixPQUFPUyxRQUFRVCxPQUFPN0Q7O2VBRS9DLElBQUlnRixRQUFRMU0sSUFBSTtpQkFDZCxJQUFJME0sUUFBUTFNLE9BQU84TSxTQUFTO21CQUMxQkosUUFBUTFNLEdBQUdpSSxNQUFNdkgsVUFBVUksaUJBQWlCLENBQUM0TDs7aUJBRS9DQSxRQUFRMU0sS0FBSzhNO3NCQUNSO2lCQUNMSixRQUFRM0ssS0FBSytLOzs7ZUFHZkEsUUFBUTdFLE1BQU12SCxVQUFVRyxlQUFlLENBQUM2TDs7Ozs7O09BUXBELE9BQU9HOzs7Ozs7Ozs7QUU5RGI7OztBQ0VBLFFBQU8sZUFBZSxTQUFTLGNBQWM7R0FDM0MsT0FBTzs7QUFFVCxTQUFRLFVESGdCRTtBQUFULFVBQVNBLGlCQUFpQnJLLE1BQU12RCxJQUFJRSxVQUFVO0dBQUU7R0FBWSxJQUFNNkIsT0FBTzs7R0FFdEYsSUFBSThMLGdCQUFnQjs7R0FFcEIsU0FBU25LLFVBQVdvSyxZQUFZQyxnQkFBZ0JDLGdCQUFnQjtLQUFFLElBQU1qTSxPQUFPO0tBQzdFN0IsU0FBU2MsU0FBUytCLFdBQVcsQ0FBQyxVQUFVLENBQUMsVUFBVSxXQUFXLENBQUMsVUFBVTs7S0FFekUsSUFBTWtMLGFBQWM7S0FDcEIsSUFBSXJKLFVBQVU7S0FDZGtKLGFBQWFBLGNBQWNEOzs7S0FHM0I5TCxLQUFLbU0sVUFBVSxZQUFZOzs7T0FHekJ0SixVQUFVNUUsR0FBR2tPLFFBQVFKOzs7OztPQUtyQmxKLFFBQVF1SixHQUFHLFdBQVcsWUFBVTtTQUM5QjVLLEtBQUtvQyxJQUFJOztTQUVUZixRQUFROEgsS0FBSyxrQkFBa0I7V0FDN0IwQixJQUFJTDtXQUNKTSxRQUFRTDs7U0FFVnBKLFFBQVF1SixHQUFHLGlCQUFpQixZQUFXOztXQUVyQzVLLEtBQUtvQyxJQUFJOzs7OztLQU9mNUQsS0FBS3FMLFlBQVksVUFBVWtCLFNBQVN4TSxJQUFJO09BQ3RDNUIsU0FBU2MsU0FBUytCLFdBQVcsQ0FBQyxVQUFVLENBQUMsWUFBWTs7T0FFckQsSUFBSXpCLE9BQU9nTixRQUFRMUgsWUFBWSxNQUFNMEgsUUFBUWpKOztPQUU3QyxJQUFJLE9BQU9pSixRQUFRekgsWUFBWSxVQUFVO1NBQ3ZDdkYsT0FBT0EsT0FBTyxNQUFNZ04sUUFBUXpIOzs7T0FHOUJqQyxRQUFRdUosR0FBRzdNLE1BQU1ROzs7T0FHakJtTSxXQUFXckwsS0FBS3RCLE1BQU1ROzs7S0FJeEJDLEtBQUt3TSxlQUFlLFVBQVVDLGtCQUFrQjFNLElBQUk7T0FDbEQ1QixTQUFTYyxTQUFTK0IsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZOztPQUVyRGtMLFdBQVdyTCxLQUFLNEw7OztLQUlsQnpNLEtBQUswTSxjQUFjLFVBQVVELGtCQUFrQjtPQUM3QzVKLFFBQVE4SixtQkFBbUJGO09BQzNCLElBQUlqSixNQUFNMEksV0FBV3pJLFFBQVFnSjtPQUM3QixJQUFJakosT0FBTyxDQUFDLEdBQUU7U0FDWjBJLFdBQVd4SSxPQUFPRixLQUFLOzs7O0tBSTNCeEQsS0FBS21NO0lBRU47OztHQUdEeEssVUFBVWlMLGVBQWUsVUFBVUMsV0FBVztLQUM1Q2YsZ0JBQWdCZTs7OztHQUlsQmxMLFVBQVVtTCxpQkFBaUIsVUFBVUMsZUFBZUMsZUFBZTtLQUNqRUQsZ0JBQWdCZjtLQUNoQmdCLGdCQUFnQmY7OztHQUdsQixPQUFPdEs7Ozs7Ozs7QUVwRlQ7O0FDRUEsUUFBTyxlQUFlLFNBQVMsY0FBYztHQUMzQyxPQUFPOztBQUVULFNBQVEsVURIZ0JzTDtBQUFULFVBQVNBLEdBQUlsUCxRQUFROzs7R0FHbEMsU0FBU21QLFFBQVFwRCxLQUFLO0tBQ3BCLElBQU1xRCxJQUFJckQsSUFBSXNELE1BQU07S0FDcEIsT0FBT0QsSUFBSUEsRUFBRSxLQUFLOzs7R0FHcEIsSUFBSUUsY0FBY0MsU0FBU0M7O0dBRTNCLElBQU0zTCxTQUFTLGtCQUFXO0tBQUU7O0tBQzFCLElBQU00TCxRQUFRLENBQUMsaUJBQWlCLGlCQUFpQjtLQUNqRCxJQUFNQyxjQUFjOzs7O0tBSXBCLFNBQVNDLEtBQUtDLFNBQVNwTyxNQUFNaEIsT0FBTztPQUNsQyxJQUFJO1NBQ0YsSUFBTTRILE1BQU1zSCxjQUFjbE87U0FDMUIsSUFBSWhCLFNBQVMsTUFBTUEsUUFBUTtTQUMzQm9QLFFBQVF4SCxPQUFPNUg7U0FDZixPQUFPYyxLQUFLO1NBQ1p1TyxRQUFRaEssSUFBSSx3Q0FBd0N2RTs7OztLQUl4RCxTQUFTd08sS0FBS3RPLE1BQU07T0FDbEIsSUFBTTRHLE1BQU1zSCxjQUFjbE87T0FDMUIsT0FBT3VPLGFBQWEzSCxRQUFRNEgsZUFBZTVILFFBQVE7OztLQUdyRCxTQUFTdkUsU0FBUztPQUFFLElBQU01QixPQUFPOztPQUUvQndOLE1BQU1RLFFBQVEsVUFBU3pPLE1BQU07U0FDM0JTLEtBQUtULFFBQVFzTyxLQUFLdE87O09BRXBCUyxLQUFLaU8sa0JBQWtCOzs7S0FHekJyTSxPQUFPMUMsVUFBVXdPLE9BQU8sWUFBVztPQUFFLElBQU0xTixPQUFPO09BQ2hELElBQU0yTixVQUFVM04sS0FBS2tPLGFBQWFKLGVBQWVDO09BQ2pEUCxNQUFNUSxRQUFRLFVBQVN6TyxNQUFNO1NBQzNCbU8sS0FBS0MsU0FBU3BPLE1BQU1TLEtBQUtUOzs7O0tBSTdCcUMsT0FBTzFDLFVBQVVpUCxVQUFVLFVBQVNwQixlQUFlVCxRQUFROEIsVUFBVTtPQUFFLElBQU1wTyxPQUFPO09BQ2xGQSxLQUFLK00sZ0JBQWdCQTtPQUNyQi9NLEtBQUtnTixnQkFBZ0JWO09BQ3JCdE0sS0FBS2lPLGtCQUFrQkc7OztLQUd6QnhNLE9BQU8xQyxVQUFVbVAsWUFBWSxZQUFXO09BQUUsSUFBTXJPLE9BQU87T0FDckRBLEtBQUsrTSxnQkFBZ0I7T0FDckIvTSxLQUFLZ04sZ0JBQWdCO09BQ3JCaE4sS0FBS2lPLGtCQUFrQjs7O0tBR3pCck0sT0FBTzFDLFVBQVVvUCxlQUFlLFlBQVc7T0FDekNkLE1BQU1RLFFBQVEsVUFBU3pPLE1BQU07U0FDM0JtTyxLQUFLSyxnQkFBZ0J4TyxNQUFNO1NBQzNCbU8sS0FBS0ksY0FBY3ZPLE1BQU07Ozs7S0FJN0IsT0FBTyxJQUFJcUM7OztHQUliLElBQU0yTSwyQkFBMkIsU0FBM0JBLHlCQUFvQ25RLElBQUl3RCxRQUFRO0tBQUU7O0tBRXRELE9BQU87T0FDTDRNLFNBQVMsaUJBQVNDLFFBQVE7O1NBRXhCLElBQU1sQixPQUFPTCxRQUFRdUIsT0FBTzNFO1NBQzVCLElBQUl5RCxRQUFRQSxTQUFTRixhQUFhO1dBQ2hDLE9BQU9vQjs7O1NBR1QsSUFBSTdNLE9BQU9tTCxlQUFlO1dBQ3hCMEIsT0FBT0MsUUFBUUMsY0FBYy9NLE9BQU9tTDtnQkFDL0IsSUFBSTBCLE9BQU9HLHNCQUFzQjs7O1dBR3RDLElBQU1DLE1BQU07YUFDVkMsTUFBTSxFQUFFeE8sT0FBTyxFQUFFeU8sUUFBUTthQUN6QkEsUUFBUTthQUNSTixRQUFRQTthQUNSQyxTQUFTLG1CQUFXO2VBQUUsT0FBT2xROzs7V0FFL0IsT0FBT0osR0FBRzZDLE9BQU80Tjs7U0FFbkIsT0FBT0osVUFBVXJRLEdBQUc0USxLQUFLUDs7Ozs7O0dBTS9CLElBQU0vRyxhQUFhLFNBQWJBLGFBQXdCO0tBQUU7S0FBWSxJQUFNMUgsT0FBTzs7S0FFdkQsSUFBTXVNLFVBQVU7T0FDZDBDLFNBQVM7T0FDVE4sWUFBWTs7O0tBR2R0QixjQUFjSCxRQUFRWCxRQUFRMEMsWUFBWTNCLFNBQVNDOzs7Ozs7Ozs7Ozs7S0FZbkR2TixLQUFLa1AsZ0JBQWdCLFVBQVNDLFFBQVE7T0FDcEM1QyxRQUFRb0MsYUFBYVE7Ozs7Ozs7Ozs7S0FVdkJuUCxLQUFLb1AsZ0JBQWdCLFlBQVc7T0FDOUIsT0FBTzdDLFFBQVFvQzs7Ozs7Ozs7Ozs7O0tBWWpCM08sS0FBS3FQLGFBQWEsVUFBU3ZGLEtBQUs7T0FDOUJ5QyxRQUFRMEMsVUFBVW5GO09BQ2xCdUQsY0FBY0gsUUFBUVgsUUFBUTBDLFlBQVkzQixTQUFTQzs7Ozs7Ozs7Ozs7S0FXckR2TixLQUFLc1AsYUFBYSxZQUFXO09BQzNCLE9BQU8vQyxRQUFRMEM7OztLQUdqQmpQLEtBQUs0SyxxQkFBTyxVQUFTMkUsV0FBVztPQUFFOztPQUVoQyxJQUFNN0gsYUFBYSxTQUFiQSxXQUFzQm9DLEtBQUswRixRQUFRekYsU0FBUzs7U0FFaEQ3QyxPQUFPQyxLQUFLNEMsU0FBU3hDLElBQUksVUFBVXBCLEtBQUs7V0FDdEM0RCxRQUFRNUQsS0FBS3NKLGNBQWMxRixRQUFRNUQsS0FBSzJEO1dBQ3hDQyxRQUFRNUQsS0FBSzJELE1BQU15QyxRQUFRMEMsVUFBVWxGLFFBQVE1RCxLQUFLMkQ7OztTQUdwRCxJQUFNNEYsV0FBV0gsVUFBVWhELFFBQVEwQyxVQUFVbkYsS0FBSzBGLFFBQVF6Rjs7Ozs7U0FLMUQyRixTQUFTeFEsVUFBVW9MLFFBQVEsVUFBU3FGLFNBQVNyUCxPQUFPOzs7V0FHbEQsSUFBTXlFLFNBQVMySyxTQUFTRSxPQUFPeFEsS0FBSyxNQUFNLElBQUksTUFBTXVRLFNBQVNyUDtXQUM3RCxPQUFPeUUsT0FBT3VCLFlBQVl2Qjs7U0FFNUIsT0FBTzJLOzs7T0FHVGhJLFdBQVc0SCxhQUFhLFlBQVc7U0FDakMsT0FBTy9DLFFBQVEwQzs7O09BR2pCdkgsV0FBVzBILGdCQUFnQixZQUFXO1NBQ3BDLE9BQU83QyxRQUFRb0M7OztPQUdqQixPQUFPakg7Ozs7R0FNWCxPQUFPM0osT0FDSjhSLFFBQVEsVUFBVWpPLFFBQ2xCa08sU0FBUyxjQUFjcEksWUFDdkJtSSxRQUFRLDRCQUE0QnRCLDBCQUNwQ0UsT0FBTyxDQUFDLGlCQUFpQixVQUFTc0IsZUFBZTtLQUFFOztLQUNsREEsY0FBY0MsYUFBYW5QLEtBQUsiLCJmaWxlIjoibmctaWRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0NTliYmVmMmM0NTVhMTUwMzUyZVxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBpZGJVdGlscyBmcm9tICcuL3V0aWxzL2lkYlV0aWxzJztcclxuaW1wb3J0IGlkYkV2ZW50cyBmcm9tICcuL3V0aWxzL2lkYkV2ZW50cyc7XHJcbmltcG9ydCBxcyBmcm9tICcuL3V0aWxzL3FzJztcclxuXHJcbmltcG9ydCBpZGIgZnJvbSAnLi9zZXJ2aWNlcy9pZGInO1xyXG5pbXBvcnQgaWRiTW9kZWwgZnJvbSAnLi9zZXJ2aWNlcy9pZGJNb2RlbCc7XHJcbmltcG9ydCBpZGJRdWVyeSBmcm9tICcuL3NlcnZpY2VzL2lkYlF1ZXJ5JztcclxuaW1wb3J0IGlkYlNvY2tldCBmcm9tICcuL3NlcnZpY2VzL2lkYlNvY2tldCc7XHJcblxyXG5pbXBvcnQgbGIgZnJvbSAnLi9zZXJ2aWNlcy9sYic7XHJcblxyXG5sYihhbmd1bGFyLm1vZHVsZSgnbmcuaWRiJywgW10pKVxyXG4gIC5jb25zdGFudCgnaW8nLCBpbylcclxuICBcclxuICAuY29uc3RhbnQoJ2lkYlZlcnNpb24nLCAnMC4wLjEnKVxyXG4gIC5zZXJ2aWNlKCdpZGJFdmVudHMnLCBpZGJFdmVudHMpXHJcbiAgLnNlcnZpY2UoJ2lkYlV0aWxzJywgaWRiVXRpbHMpXHJcbiAgLnNlcnZpY2UoJ3FzJywgcXMpXHJcblxyXG4gIC8vIFRha2Ugb2YgbGItc2VydmljZXMuanNcclxuICAuc2VydmljZSgnaWRiJywgaWRiKVxyXG4gIC5zZXJ2aWNlKCdpZGJNb2RlbCcsIGlkYk1vZGVsKVxyXG4gIC5zZXJ2aWNlKCdpZGJRdWVyeScsIGlkYlF1ZXJ5KVxyXG4gIC5zZXJ2aWNlKCdpZGJTb2NrZXQnLCBpZGJTb2NrZXQpXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2lkYlV0aWxzID0gcmVxdWlyZSgnLi91dGlscy9pZGJVdGlscycpO1xuXG52YXIgX2lkYlV0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlV0aWxzKTtcblxudmFyIF9pZGJFdmVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2lkYkV2ZW50cycpO1xuXG52YXIgX2lkYkV2ZW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJFdmVudHMpO1xuXG52YXIgX3FzID0gcmVxdWlyZSgnLi91dGlscy9xcycpO1xuXG52YXIgX3FzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3FzKTtcblxudmFyIF9pZGIgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYicpO1xuXG52YXIgX2lkYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGIpO1xuXG52YXIgX2lkYk1vZGVsID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJNb2RlbCcpO1xuXG52YXIgX2lkYk1vZGVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYk1vZGVsKTtcblxudmFyIF9pZGJRdWVyeSA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiUXVlcnknKTtcblxudmFyIF9pZGJRdWVyeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJRdWVyeSk7XG5cbnZhciBfaWRiU29ja2V0ID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJTb2NrZXQnKTtcblxudmFyIF9pZGJTb2NrZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiU29ja2V0KTtcblxudmFyIF9sYiA9IHJlcXVpcmUoJy4vc2VydmljZXMvbGInKTtcblxudmFyIF9sYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbigwLCBfbGIyLmRlZmF1bHQpKGFuZ3VsYXIubW9kdWxlKCduZy5pZGInLCBbXSkpLmNvbnN0YW50KCdpbycsIGlvKS5jb25zdGFudCgnaWRiVmVyc2lvbicsICcwLjAuMScpLnNlcnZpY2UoJ2lkYkV2ZW50cycsIF9pZGJFdmVudHMyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlV0aWxzJywgX2lkYlV0aWxzMi5kZWZhdWx0KS5zZXJ2aWNlKCdxcycsIF9xczIuZGVmYXVsdClcblxuLy8gVGFrZSBvZiBsYi1zZXJ2aWNlcy5qc1xuLnNlcnZpY2UoJ2lkYicsIF9pZGIyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYk1vZGVsJywgX2lkYk1vZGVsMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJRdWVyeScsIF9pZGJRdWVyeTIuZGVmYXVsdCkuc2VydmljZSgnaWRiU29ja2V0JywgX2lkYlNvY2tldDIuZGVmYXVsdCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJVdGlscyAoJHEpIHsgJ25nSW5qZWN0J1xyXG4gIFxyXG4gIGNvbnN0IHZhbGlkYXRvcnMgPSB7XHJcbiAgICAvLyBGdW5jaW9uIHBhcmEgZGV0ZXJtaW5hciBzaSBlcyB1biBjYWxsYmFjayB2w6FsaWRvIG8gbm9cclxuICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nIHx8IHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gdW5kZWZpbmVkO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBWZXJpZmljYSBzaSB1biB2YWxvciBlcyB1biBhcnJheVxyXG4gICAgYXJyYXk6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICB9ICBcclxuXHJcbiAgLy8gR2VuZXJhIHVuIGVycm9yIHNpIGVsIHZhbG9yIG5vIGVzIGRlbCB0aXBvIGluZGljYWRvIHBvciBwYXJhbWV0cm9cclxuICBmdW5jdGlvbiB2YWxpZCAodmFsdWUsIHR5cGVzKSB7XHJcbiAgICBpZiAoIXZhbGlkYXRvcnMuYXJyYXkodHlwZXMpKSB0eXBlcyA9IFt0eXBlc107XHJcblxyXG4gICAgZm9yKGxldCBpIGluIHR5cGVzKXtcclxuICAgICAgY29uc3QgdHlwZSA9IHR5cGVzW2ldO1xyXG4gICAgICBpZiAodHlwZW9mIHR5cGUgPT0gJ3N0cmluZycpe1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsaWRhdG9yc1t0eXBlXSA9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICBpZiAodmFsaWRhdG9yc1t0eXBlXSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT0gdHlwZSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0eXBlID09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgIGlmKHR5cGUoYXJnc1tpXSkpe1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIFZhbGlkYSB1biBhcnJheSBkZSBhcmd1bWVudG9zIGNvbiB1biBhcnJhIGRlIHRpcG9zXHJcbiAgZnVuY3Rpb24gdmFsaWRhdGUgKGFyZ3MsIHR5cGVzKSB7XHJcblxyXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xyXG4gICAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xyXG4gICAgZm9yIChsZXQgaSBpbiBhcmdzKXtcclxuICAgICAgY29uc3QgdmFsdWUgPSBhcmdzW2ldO1xyXG4gICAgICBjb25zdCB0eXBlID0gdHlwZXNbaV07XHJcbiAgICAgIGlmICh0eXBlICYmICF2YWxpZCh2YWx1ZSwgdHlwZSkpe1xyXG4gICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsaWRhdG9yIHRvOiAnK2FyZ3NbaV0rJyBtdXN0IGJlICcrdHlwZSk7XHJcbiAgICAgICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbGlkYXRvcidcclxuICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdmFsaWRhdGU6IHZhbGlkYXRlLFxyXG4gIH07XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiVXRpbHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gaWRiVXRpbHM7XG5mdW5jdGlvbiBpZGJVdGlscygkcSkge1xuICAnbmdJbmplY3QnO1xuXG4gIHZhciB2YWxpZGF0b3JzID0ge1xuICAgIC8vIEZ1bmNpb24gcGFyYSBkZXRlcm1pbmFyIHNpIGVzIHVuIGNhbGxiYWNrIHbDoWxpZG8gbyBub1xuICAgIGNhbGxiYWNrOiBmdW5jdGlvbiBjYWxsYmFjayh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nIHx8IHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gdW5kZWZpbmVkO1xuICAgIH0sXG5cbiAgICAvLyBWZXJpZmljYSBzaSB1biB2YWxvciBlcyB1biBhcnJheVxuICAgIGFycmF5OiBmdW5jdGlvbiBhcnJheSh2YWx1ZSkge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpO1xuICAgIH1cblxuICB9O1xuXG4gIC8vIEdlbmVyYSB1biBlcnJvciBzaSBlbCB2YWxvciBubyBlcyBkZWwgdGlwbyBpbmRpY2FkbyBwb3IgcGFyYW1ldHJvXG4gIGZ1bmN0aW9uIHZhbGlkKHZhbHVlLCB0eXBlcykge1xuICAgIGlmICghdmFsaWRhdG9ycy5hcnJheSh0eXBlcykpIHR5cGVzID0gW3R5cGVzXTtcblxuICAgIGZvciAodmFyIGkgaW4gdHlwZXMpIHtcbiAgICAgIHZhciB0eXBlID0gdHlwZXNbaV07XG4gICAgICBpZiAodHlwZW9mIHR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWxpZGF0b3JzW3R5cGVdID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpZiAodmFsaWRhdG9yc1t0eXBlXSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSkpID09IHR5cGUpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdHlwZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmICh0eXBlKGFyZ3NbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBWYWxpZGEgdW4gYXJyYXkgZGUgYXJndW1lbnRvcyBjb24gdW4gYXJyYSBkZSB0aXBvc1xuICBmdW5jdGlvbiB2YWxpZGF0ZShhcmdzLCB0eXBlcykge1xuXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcbiAgICBmb3IgKHZhciBpIGluIGFyZ3MpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGFyZ3NbaV07XG4gICAgICB2YXIgdHlwZSA9IHR5cGVzW2ldO1xuICAgICAgaWYgKHR5cGUgJiYgIXZhbGlkKHZhbHVlLCB0eXBlKSkge1xuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbGlkYXRvciB0bzogJyArIGFyZ3NbaV0gKyAnIG11c3QgYmUgJyArIHR5cGUpO1xuICAgICAgICBlcnIubmFtZSA9ICdJbnZhbGlkVmFsaWRhdG9yJztcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdmFsaWRhdGU6IHZhbGlkYXRlXG4gIH07XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiVXRpbHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBOb21icmUgZGUgbG9zIGV2ZW50b3NcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiRXZlbnRzKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBEQl9FUlJPUjogJ2NiLmVycm9yJyxcclxuICAgIE1PREVMX0lOU1RBTkNFRCA6ICdtb2RlbC5pbnN0YW5jZWQnLFxyXG4gICAgTU9ERUxfUVVFUklFRCA6ICdtb2RlbC5xdWVyaWVkJyxcclxuICAgIE1PREVMX1VOUVVFUklFRCA6ICdtb2RlbC51bnF1ZXJpZWQnLFxyXG4gIH1cclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9pZGJFdmVudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIE5vbWJyZSBkZSBsb3MgZXZlbnRvc1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaWRiRXZlbnRzO1xuZnVuY3Rpb24gaWRiRXZlbnRzKCkge1xuICByZXR1cm4ge1xuICAgIERCX0VSUk9SOiAnY2IuZXJyb3InLFxuICAgIE1PREVMX0lOU1RBTkNFRDogJ21vZGVsLmluc3RhbmNlZCcsXG4gICAgTU9ERUxfUVVFUklFRDogJ21vZGVsLnF1ZXJpZWQnLFxuICAgIE1PREVMX1VOUVVFUklFRDogJ21vZGVsLnVucXVlcmllZCdcbiAgfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcXMgKCkgeyAnbmdJbmplY3QnXHJcbiAgXHJcbiAgZnVuY3Rpb24gcXNDbGFzcyAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBcclxuICAgIGxldCB0aGVucyA9IFtdO1xyXG4gICAgbGV0IHRoZW5zUmVhZHkgPSBbXTtcclxuICAgIGxldCBjYXRjaHMgPSBbXTtcclxuICAgIGxldCBjYXRjaHNSZWFkeSA9IFtdO1xyXG4gICAgbGV0IHJlc3VsdEFyZ3MgPSBudWxsO1xyXG4gICAgbGV0IGVycm9yID0gbnVsbDtcclxuXHJcbiAgICB0aGl6LnByb21pc2UgPSB7fTtcclxuICAgIHRoaXouJHJlc29sdmVkID0gZmFsc2U7XHJcblxyXG4gICAgZnVuY3Rpb24gdGhlbnNSZXNvbHZlZCAoKSB7XHJcbiAgICAgIGlmICghdGhlbnMubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgIGxldCBjYiA9IHRoZW5zLnNoaWZ0KCk7XHJcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXoucmVzdWx0QXJncyk7XHJcbiAgICAgIHRoZW5zUmVhZHkucHVzaChjYik7XHJcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYXRjaHNSZXNvbHZlZCAoKSB7XHJcbiAgICAgIGlmICghY2F0Y2hzLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICBsZXQgY2IgPSBjYXRjaHMuc2hpZnQoKTtcclxuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XHJcbiAgICAgIGNhdGNoc1JlYWR5LnB1c2goY2IpO1xyXG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXoucmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XHJcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgdGhpei5yZXN1bHRBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnJlamVjdCA9IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XHJcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgdGhpei5lcnJvciA9IGVyciB8fCB7fTtcclxuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgdGhlbnMucHVzaChjYik7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiAhdGhpei5lcnJvcikge1xyXG4gICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpei5wcm9taXNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnByb21pc2UuY2F0Y2ggPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgY2F0Y2hzLnB1c2goY2IpO1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQgJiYgdGhpei5lcnJvcikge1xyXG4gICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXoucHJvbWlzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLmRvbmUgPSBmdW5jdGlvbiAoY2IpIHtcclxuXHJcbiAgICAgIHRoZW5zLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQodGhpei5yZXN1bHRBcmdzKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY2F0Y2hzLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkge1xyXG4gICAgICAgIGlmICghdGhpei5lcnJvcikge1xyXG4gICAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGlmKGNiKSB0aGl6LnByb21pc2UuZG9uZShjYik7XHJcblxyXG4gIH07XHJcblxyXG4gIC8vIENyZWEgdW5hIGluc3RhbmNpYSBkZWwgZGVmZXJlZFxyXG4gIHFzQ2xhc3MuZGVmZXIgPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgIHJldHVybiBuZXcgcXNDbGFzcyhjYik7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHFzQ2xhc3M7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvcXMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBxcztcbmZ1bmN0aW9uIHFzKCkge1xuICAnbmdJbmplY3QnO1xuXG4gIGZ1bmN0aW9uIHFzQ2xhc3MoY2IpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICB2YXIgdGhlbnMgPSBbXTtcbiAgICB2YXIgdGhlbnNSZWFkeSA9IFtdO1xuICAgIHZhciBjYXRjaHMgPSBbXTtcbiAgICB2YXIgY2F0Y2hzUmVhZHkgPSBbXTtcbiAgICB2YXIgcmVzdWx0QXJncyA9IG51bGw7XG4gICAgdmFyIGVycm9yID0gbnVsbDtcblxuICAgIHRoaXoucHJvbWlzZSA9IHt9O1xuICAgIHRoaXouJHJlc29sdmVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiB0aGVuc1Jlc29sdmVkKCkge1xuICAgICAgaWYgKCF0aGVucy5sZW5ndGgpIHJldHVybjtcbiAgICAgIHZhciBjYiA9IHRoZW5zLnNoaWZ0KCk7XG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LnJlc3VsdEFyZ3MpO1xuICAgICAgdGhlbnNSZWFkeS5wdXNoKGNiKTtcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYXRjaHNSZXNvbHZlZCgpIHtcbiAgICAgIGlmICghY2F0Y2hzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgdmFyIGNiID0gY2F0Y2hzLnNoaWZ0KCk7XG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcbiAgICAgIGNhdGNoc1JlYWR5LnB1c2goY2IpO1xuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICB9XG5cbiAgICB0aGl6LnJlc29sdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgIHRoaXoucmVzdWx0QXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgfTtcblxuICAgIHRoaXoucmVqZWN0ID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICB0aGl6LmVycm9yID0gZXJyIHx8IHt9O1xuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICB9O1xuXG4gICAgdGhpei5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHRoZW5zLnB1c2goY2IpO1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmICF0aGl6LmVycm9yKSB7XG4gICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGl6LnByb21pc2U7XG4gICAgfTtcblxuICAgIHRoaXoucHJvbWlzZS5jYXRjaCA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgY2F0Y2hzLnB1c2goY2IpO1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmIHRoaXouZXJyb3IpIHtcbiAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGl6LnByb21pc2U7XG4gICAgfTtcblxuICAgIHRoaXoucHJvbWlzZS5kb25lID0gZnVuY3Rpb24gKGNiKSB7XG5cbiAgICAgIHRoZW5zLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjYi5hcHBseShudWxsLCBbbnVsbF0uY29uY2F0KHRoaXoucmVzdWx0QXJncykpO1xuICAgICAgfSk7XG5cbiAgICAgIGNhdGNocy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSB7XG4gICAgICAgIGlmICghdGhpei5lcnJvcikge1xuICAgICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH07XG5cbiAgICBpZiAoY2IpIHRoaXoucHJvbWlzZS5kb25lKGNiKTtcbiAgfTtcblxuICAvLyBDcmVhIHVuYSBpbnN0YW5jaWEgZGVsIGRlZmVyZWRcbiAgcXNDbGFzcy5kZWZlciA9IGZ1bmN0aW9uIChjYikge1xuICAgIHJldHVybiBuZXcgcXNDbGFzcyhjYik7XG4gIH07XG5cbiAgcmV0dXJuIHFzQ2xhc3M7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvcXMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiU2VydmljZSAoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJFdmVudHMsIGlkYk1vZGVsLCBpZGJRdWVyeSwgaWRiU29ja2V0LCBsYkF1dGgsICR0aW1lb3V0KSB7ICduZ0luamVjdCc7XHJcblxyXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cclxuICBjb25zdCBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XHJcbiAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxyXG4gIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxyXG4gIGNvbnN0IElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcclxuICBjb25zdCBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XHJcbiAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcclxuICBcclxuICBpZiAoIWluZGV4ZWREQikge1xyXG4gICAgYWxlcnQoXCJTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXNcIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICAvLyBDbGFzZSBwYXJhIGxhIGNyZWFjacOzbiBkZSBpbnN0YW5jaWFzIGRlIGxhIEJEXHJcbiAgZnVuY3Rpb24gaWRiKCRkYk5hbWUsICRkYlZlcnNpb24sICRzb2NrZXQpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ251bWJlcicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgIC8vIE1hbmVqYWRvcmVzIGRlIGV2ZW50b3MuXHJcbiAgICBjb25zdCAkZXZlbnRzQ2FsbGJhY2tzID0ge307XHJcbiAgICBjb25zdCAkdXBncmFkZU5lZWRlZERlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG4gICAgY29uc3QgJG9wZW5EZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgIGNvbnN0ICRzb2NrZXRDb25uZWN0ZWREZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgIGxldCAkb3BlbmVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gSW5zdGFuY2lhIGRlIGxhIGJhc2UgZGUgZGF0b3M7XHJcbiAgICBsZXQgJHJlcXVlc3QgPSBudWxsO1xyXG4gICAgdGhpei5tb2RlbHMgPSB7fTtcclxuXHJcbiAgICAvLyBBZ3JlZ2FyIHVuIG1hbmVqYWRvciBkZSBldmVudG9cclxuICAgIHRoaXouYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSl7XHJcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdID0gW107XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5wdXNoKGNiKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vUmVtdWV2ZSB1biBtYW5lamFkb3IgZGUgZXZlbnRvXHJcbiAgICB0aGl6LnVuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkgcmV0dXJuO1xyXG5cclxuICAgICAgLy8gQnVzY2FyIGVsIGNiXHJcbiAgICAgIGNvbnN0IGlkeCA9ICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5pbmRleE9mKGNiKTtcclxuXHJcbiAgICAgIC8vIFNpIHNlIGVuY29udHJvIGVsIGNiIHJlbW92ZXJsb1xyXG4gICAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXHJcbiAgICB0aGl6LnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0J10pO1xyXG5cclxuICAgICAgJGxvZy5sb2coJGRiTmFtZSsnLnYnKygkZGJWZXJzaW9ufHwxKSsnOiAnK2V2ZW50TmFtZSk7XHJcblxyXG4gICAgICBmb3IobGV0IGkgaW4gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKXtcclxuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpeiwgYXJncyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENhbGxiYWNrcyBwYXJhIGxvcyBlcnJvcmVzXHJcbiAgICB0aGl6LmVycm9yID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIHRoaXouYmluZChpZGJFdmVudHMuREJfRVJST1IsIGNiKTtcclxuICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFicmlyIHVuYSBCYXNlIGRlIGRhdG9zLlxyXG4gICAgdGhpei5vcGVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAoJG9wZW5lZCkgcmV0dXJuICRvcGVuRGVmZXJlZDtcclxuXHJcbiAgICAgIC8vIENyZWFyIHVuIG51ZXZvIGRlZmVyXHJcbiAgICAgICRvcGVuZWQgPSB0cnVlO1xyXG5cclxuICAgICAgLy8gZGVqYW1vcyBhYmllcnRhIG51ZXN0cmEgYmFzZSBkZSBkYXRvc1xyXG4gICAgICBmdW5jdGlvbiByZWFkeSgpIHtcclxuXHJcbiAgICAgICAgY29uc3QgcnEgPSBpbmRleGVkREIub3BlbigkZGJOYW1lLCAkZGJWZXJzaW9uKTtcclxuXHJcbiAgICAgICAgcnEub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5yZXN1bHQhXHJcbiAgICAgICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucmVzb2x2ZShldmVudCwgcnEpO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZWwgcmVzdWx0YWRvXHJcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5yZXN1bHQhXHJcbiAgICAgICAgICAkcmVxdWVzdCA9IHJxO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBBc2luZ2FyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzIGEgbGEgQkRcclxuICAgICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgJGxvZy5lcnJvcignRGF0YWJhc2UgZXJyb3I6ICcrIGV2ZW50LnRhcmdldC5lcnJvckNvZGUpO1xyXG4gICAgICAgICAgICB0aGl6LnRyaWdnZXIoaWRiRXZlbnRzLkRCX0VSUk9SLCBbZXZlbnRdKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAkb3BlbkRlZmVyZWQucmVzb2x2ZShldmVudCwgcnEpO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzXHJcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5lcnJvckNvZGUhXHJcbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgJG9wZW5EZWZlcmVkLnJlamVjdChycS5lcnJvckNvZGUsIGV2ZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKCRkYk5hbWUpLm9uc3VjY2VzcyA9IHJlYWR5O1xyXG4gICAgICAvLyByZWFkeSgpO1xyXG5cclxuICAgICAgcmV0dXJuICRvcGVuRGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBudWV2byBtb2RlbG9cclxuICAgIHRoaXoubW9kZWwgPSBmdW5jdGlvbiAobmFtZSwgc29ja2V0KSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3VuZGVmaW5lZCcsICdvYmplY3QnXV0pO1xyXG5cclxuICAgICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG9cclxuICAgICAgbGV0IG1vZGVsID0gdGhpei5tb2RlbHNbbmFtZV07XHJcblxyXG4gICAgICAvLyBTaSBubyBleGlzdGUgZWwgbW9kZWxvIGNyZWFyXHJcbiAgICAgIGlmKCFtb2RlbCl7XHJcbiAgICAgICAgbW9kZWwgPSBpZGJNb2RlbCh0aGl6LCBuYW1lLCBzb2NrZXQgfHwgJHNvY2tldCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEd1YXJkYXIgZWwgbW9kZWxvIGVuIGxvcyBtb2RlbG9zXHJcbiAgICAgIHRoaXoubW9kZWxzW25hbWVdID0gbW9kZWw7XHJcblxyXG4gICAgICAvLyBSZXRvcm5hciBlbCBtb2RlbG9cclxuICAgICAgcmV0dXJuIG1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JhIHVuYSBpbnN0YW5jaWEgZGUgdW4gcXVlcnlcclxuICAgIHRoaXoucXVlcnkgPSBmdW5jdGlvbiAoTW9kZWwsIGZpbHRlcnMpIHtcclxuXHJcbiAgICAgIHJldHVybiBuZXcgaWRiUXVlcnkodGhpeiwgTW9kZWwsIGZpbHRlcnMpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXHJcbiAgICB0aGl6LmNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgbW9kZWxJZCkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xyXG4gICAgICAgIHJxLnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShtb2RlbE5hbWUsIG1vZGVsSWQpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxyXG4gICAgdGhpei5jcmVhdGVJbmRleCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcclxuICAgICAgICBjb25zdCBzdG9yZSA9IHJxLnRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XHJcbiAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgdW5hIHRyYW5zYWNjacOzblxyXG4gICAgdGhpei50cmFuc2FjdGlvbiA9IGZ1bmN0aW9uKG1vZGVsTmFtZSwgcGVybXMsIGFjdGlvbikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdmdW5jdGlvbiddKTtcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgLy8gQ3VhbmRvIHNlIGFicmEgbGEgQkRcclxuICAgICAgJG9wZW5EZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XHJcbiAgICAgICAgY29uc3QgdHggPSBycS5yZXN1bHQudHJhbnNhY3Rpb24obW9kZWxOYW1lLCBwZXJtcyk7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYWN0aW9uKHR4KTtcclxuXHJcbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxyXG4gICAgICAgIHR4Lm9uY29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCwgcmVzdWx0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxyXG4gICAgICAgIHR4Lm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdCh0eC5lcnJvcik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBJbnNlcnRhIHVuIHJlZ2lzdHJvIGVuIGVsIG1vZGVsb1xyXG4gICAgdGhpei5wdXQgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbnN0YW5jZSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAnZnVuY3Rpb24nXV0pO1xyXG5cclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxyXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0eCkge1xyXG4gICAgICAgIGNvbnN0IHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5wdXQoaW5zdGFuY2UuJGdldFZhbHVlcygpKTtcclxuXHJcbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxyXG4gICAgICAgIHJxLm9uc3VjY2VzcyAgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIC8vIEFzaWduYXIgZWwgZ2VuZXJhZG8gYWwgbW9kZWxvXHJcbiAgICAgICAgICBpbnN0YW5jZS4kc2V0S2V5KGV2ZW50LnRhcmdldC5yZXN1bHQpO1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGluc3RhbmNlLCBldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICBycS5vbmVycm9yICA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBPYnRpZW5lIHVuIGVsZW1lbnRvIHBvciBzaSBrZXlcclxuICAgIHRoaXouZ2V0ID0gZnVuY3Rpb24gKE1vZGVsLCBrZXkpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJywgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG4gICAgICBjb25zdCBpbnN0YW5jZSA9IE1vZGVsLmdldEluc3RhbmNlKGtleSk7XHJcbiAgICAgIGNvbnN0IG1vZGVsTmFtZSA9IE1vZGVsLmdldE1vZGVsTmFtZSgpO1xyXG4gICAgICBcclxuICAgICAgaW5zdGFuY2UuJHByb21pc2UgPSBkZWZlcmVkLnByb21pc2U7XHJcbiAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xyXG4gICAgICAgIGNvbnN0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKTtcclxuICAgICAgICBjb25zdCBycSA9IHN0b3JlLmdldChrZXkpO1xyXG5cclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgTW9kZWwuZ2V0VmVyc2lvbk9mKGtleSkucHJvbWlzZVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodmVyc2lvbikge1xyXG4gICAgICAgICAgICAgIGlmIChycS5yZXN1bHQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLiRzZXRMb2NhbFZhbHVlcyhycS5yZXN1bHQsIHZlcnNpb24/IHZlcnNpb24uaGFzaCA6IG51bGwpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgJGxvZy5lcnJvcihbJ2FueSBlcnJvcicsIGVycl0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGluc3RhbmNlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gaW5zdGFuY2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBCdXNjYXIgZW4gZWwgbW9kZWxvXHJcbiAgICB0aGl6LmZpbmQgPSBmdW5jdGlvbiAoTW9kZWwsIGZpbHRlcnMpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuICAgICAgY29uc3QgbW9kZWxOYW1lID0gTW9kZWwuZ2V0TW9kZWxOYW1lKCk7XHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuXHJcbiAgICAgIHJlc3VsdC4kcHJvbWlzZSA9IGRlZmVyZWQucHJvbWlzZTtcclxuICAgICAgcmVzdWx0LiRyZXNvbHZlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cclxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xyXG4gICAgICAgIGNvbnN0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKTtcclxuICAgICAgICBjb25zdCBycSA9IHN0b3JlLm9wZW5DdXJzb3IoKTtcclxuXHJcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBycS5yZXN1bHQ7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIE5vIG1vcmUgbWF0Y2hpbmcgcmVjb3Jkcy5cclxuICAgICAgICAgIGlmICghY3Vyc29yKXtcclxuICAgICAgICAgICAgcmVzdWx0LiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcmVkLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBrZXkgPSBNb2RlbC5nZXRLZXlGcm9tKGN1cnNvci52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgTW9kZWwuZ2V0VmVyc2lvbk9mKGtleSkucHJvbWlzZVxyXG5cclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHZlcnNpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gT2J0ZW5lciBsYSBpbnN0YW5jaWFcclxuICAgICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IE1vZGVsLmdldEluc3RhbmNlKGtleSk7XHJcblxyXG4gICAgICAgICAgICAgIGluc3RhbmNlLiRzZXRMb2NhbFZhbHVlcyhjdXJzb3IudmFsdWUsIHZlcnNpb24/IHZlcnNpb24uaGFzaCA6IG51bGwpO1xyXG4gICAgICAgICAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgaW5zdGFuY2UuJGVtaXQoaWRiRXZlbnRzLk1PREVMX1FVRVJJRUQsIHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIEFncmVnYXIgYWwgcmVzdWx0YWRvXHJcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAvLyBCdXNjYXIgc2lndWllbnRlXHJcbiAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAkbG9nLmVycm9yKFsnYW55IGVycm9yJywgZXJyXSlcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgXHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhciBhbGlhcyBwYXJhIGxvcyBldmVudG9zIGVubGF6YXIgY2FsbGJhY2tzIGEgbG9zIGV2ZW50b3NcclxuICAgIGxldCBkZWZlcmVkcztcclxuICAgIE9iamVjdC5rZXlzKGRlZmVyZWRzID0ge1xyXG4gICAgICBvbk9wZW46ICRvcGVuRGVmZXJlZCxcclxuICAgICAgb25VcGdyYWRlTmVlZGVkOiAkdXBncmFkZU5lZWRlZERlZmVyZWQsXHJcbiAgICAgIG9uU29ja2V0Q29ubmVjdGVkOiAkc29ja2V0Q29ubmVjdGVkRGVmZXJlZFxyXG4gICAgfSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgIGNvbnN0IHRleHQgPSAkZGJOYW1lKycudicrKCRkYlZlcnNpb258fDEpKyc6ICcra2V5O1xyXG4gICAgICAgIGlmIChlcnIpe1xyXG4gICAgICAgICAgJGxvZy5lcnJvcih0ZXh0LCBlcnIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkbG9nLmxvZyh0ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGl6W2tleV0gPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XHJcbiAgICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoY2IpO1xyXG4gICAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gIH07XHJcblxyXG4gIHJldHVybiBpZGI7XHJcblxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJTZXJ2aWNlO1xuZnVuY3Rpb24gaWRiU2VydmljZSgkbG9nLCBxcywgaWRiVXRpbHMsIGlkYkV2ZW50cywgaWRiTW9kZWwsIGlkYlF1ZXJ5LCBpZGJTb2NrZXQsIGxiQXV0aCwgJHRpbWVvdXQpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyBFbiBsYSBzaWd1aWVudGUgbGluZWEsIHB1ZWRlIGluY2x1aXIgcHJlZmlqb3MgZGUgaW1wbGVtZW50YWNpb24gcXVlIHF1aWVyYSBwcm9iYXIuXG5cbiAgdmFyIGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQjtcbiAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxuICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcbiAgdmFyIElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcbiAgdmFyIElEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcbiAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcblxuICBpZiAoIWluZGV4ZWREQikge1xuICAgIGFsZXJ0KFwiU3UgbmF2ZWdhZG9yIG5vIHNvcG9ydGEgdW5hIHZlcnNpw7NuIGVzdGFibGUgZGUgaW5kZXhlZERCLiBUYWwgeSBjb21vIGxhcyBjYXJhY3RlcsOtc3RpY2FzIG5vIHNlcsOhbiB2YWxpZGFzXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIENsYXNlIHBhcmEgbGEgY3JlYWNpw7NuIGRlIGluc3RhbmNpYXMgZGUgbGEgQkRcbiAgZnVuY3Rpb24gaWRiKCRkYk5hbWUsICRkYlZlcnNpb24sICRzb2NrZXQpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdudW1iZXInLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgIC8vIE1hbmVqYWRvcmVzIGRlIGV2ZW50b3MuXG4gICAgdmFyICRldmVudHNDYWxsYmFja3MgPSB7fTtcbiAgICB2YXIgJHVwZ3JhZGVOZWVkZWREZWZlcmVkID0gcXMuZGVmZXIoKTtcbiAgICB2YXIgJG9wZW5EZWZlcmVkID0gcXMuZGVmZXIoKTtcbiAgICB2YXIgJHNvY2tldENvbm5lY3RlZERlZmVyZWQgPSBxcy5kZWZlcigpO1xuICAgIHZhciAkb3BlbmVkID0gZmFsc2U7XG5cbiAgICAvLyBJbnN0YW5jaWEgZGUgbGEgYmFzZSBkZSBkYXRvcztcbiAgICB2YXIgJHJlcXVlc3QgPSBudWxsO1xuICAgIHRoaXoubW9kZWxzID0ge307XG5cbiAgICAvLyBBZ3JlZ2FyIHVuIG1hbmVqYWRvciBkZSBldmVudG9cbiAgICB0aGl6LmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdID0gW107XG4gICAgICB9XG5cbiAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5wdXNoKGNiKTtcbiAgICB9O1xuXG4gICAgLy9SZW11ZXZlIHVuIG1hbmVqYWRvciBkZSBldmVudG9cbiAgICB0aGl6LnVuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkgcmV0dXJuO1xuXG4gICAgICAvLyBCdXNjYXIgZWwgY2JcbiAgICAgIHZhciBpZHggPSAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uaW5kZXhPZihjYik7XG5cbiAgICAgIC8vIFNpIHNlIGVuY29udHJvIGVsIGNiIHJlbW92ZXJsb1xuICAgICAgaWYgKGlkeCAhPSAtMSkge1xuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXG4gICAgdGhpei50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnXSk7XG5cbiAgICAgICRsb2cubG9nKCRkYk5hbWUgKyAnLnYnICsgKCRkYlZlcnNpb24gfHwgMSkgKyAnOiAnICsgZXZlbnROYW1lKTtcblxuICAgICAgZm9yICh2YXIgaSBpbiAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdW2ldLmFwcGx5KHRoaXosIGFyZ3MpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBDYWxsYmFja3MgcGFyYSBsb3MgZXJyb3Jlc1xuICAgIHRoaXouZXJyb3IgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHRoaXouYmluZChpZGJFdmVudHMuREJfRVJST1IsIGNiKTtcbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH07XG5cbiAgICAvLyBBYnJpciB1bmEgQmFzZSBkZSBkYXRvcy5cbiAgICB0aGl6Lm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoJG9wZW5lZCkgcmV0dXJuICRvcGVuRGVmZXJlZDtcblxuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gZGVmZXJcbiAgICAgICRvcGVuZWQgPSB0cnVlO1xuXG4gICAgICAvLyBkZWphbW9zIGFiaWVydGEgbnVlc3RyYSBiYXNlIGRlIGRhdG9zXG4gICAgICBmdW5jdGlvbiByZWFkeSgpIHtcblxuICAgICAgICB2YXIgcnEgPSBpbmRleGVkREIub3BlbigkZGJOYW1lLCAkZGJWZXJzaW9uKTtcblxuICAgICAgICBycS5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5yZXN1bHQhXG4gICAgICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZWwgcmVzdWx0YWRvXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLnJlc3VsdCFcbiAgICAgICAgICAkcmVxdWVzdCA9IHJxO1xuXG4gICAgICAgICAgLy8gQXNpbmdhciBlbCBtYW5lamFkb3IgZGUgZXJyb3JlcyBhIGxhIEJEXG4gICAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgJGxvZy5lcnJvcignRGF0YWJhc2UgZXJyb3I6ICcgKyBldmVudC50YXJnZXQuZXJyb3JDb2RlKTtcbiAgICAgICAgICAgIHRoaXoudHJpZ2dlcihpZGJFdmVudHMuREJfRVJST1IsIFtldmVudF0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAkb3BlbkRlZmVyZWQucmVzb2x2ZShldmVudCwgcnEpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlIGVycm9yZXNcbiAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEuZXJyb3JDb2RlIVxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgJG9wZW5EZWZlcmVkLnJlamVjdChycS5lcnJvckNvZGUsIGV2ZW50KTtcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZSgkZGJOYW1lKS5vbnN1Y2Nlc3MgPSByZWFkeTtcbiAgICAgIC8vIHJlYWR5KCk7XG5cbiAgICAgIHJldHVybiAkb3BlbkRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIEFncmVnYSB1biBudWV2byBtb2RlbG9cbiAgICB0aGl6Lm1vZGVsID0gZnVuY3Rpb24gKG5hbWUsIHNvY2tldCkge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsndW5kZWZpbmVkJywgJ29iamVjdCddXSk7XG5cbiAgICAgIC8vIEluc3RhbmNpYXIgZWwgbW9kZWxvXG4gICAgICB2YXIgbW9kZWwgPSB0aGl6Lm1vZGVsc1tuYW1lXTtcblxuICAgICAgLy8gU2kgbm8gZXhpc3RlIGVsIG1vZGVsbyBjcmVhclxuICAgICAgaWYgKCFtb2RlbCkge1xuICAgICAgICBtb2RlbCA9IGlkYk1vZGVsKHRoaXosIG5hbWUsIHNvY2tldCB8fCAkc29ja2V0KTtcbiAgICAgIH1cblxuICAgICAgLy8gR3VhcmRhciBlbCBtb2RlbG8gZW4gbG9zIG1vZGVsb3NcbiAgICAgIHRoaXoubW9kZWxzW25hbWVdID0gbW9kZWw7XG5cbiAgICAgIC8vIFJldG9ybmFyIGVsIG1vZGVsb1xuICAgICAgcmV0dXJuIG1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBDcmEgdW5hIGluc3RhbmNpYSBkZSB1biBxdWVyeVxuICAgIHRoaXoucXVlcnkgPSBmdW5jdGlvbiAoTW9kZWwsIGZpbHRlcnMpIHtcblxuICAgICAgcmV0dXJuIG5ldyBpZGJRdWVyeSh0aGl6LCBNb2RlbCwgZmlsdGVycyk7XG4gICAgfTtcblxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxuICAgIHRoaXouY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBtb2RlbElkKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XG4gICAgICAgIHJxLnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShtb2RlbE5hbWUsIG1vZGVsSWQpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxuICAgIHRoaXouY3JlYXRlSW5kZXggPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XG4gICAgICAgIHZhciBzdG9yZSA9IHJxLnRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XG4gICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIHVuYSB0cmFuc2FjY2nDs25cbiAgICB0aGl6LnRyYW5zYWN0aW9uID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgcGVybXMsIGFjdGlvbikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcblxuICAgICAgLy8gQ3VhbmRvIHNlIGFicmEgbGEgQkRcbiAgICAgICRvcGVuRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xuICAgICAgICB2YXIgdHggPSBycS5yZXN1bHQudHJhbnNhY3Rpb24obW9kZWxOYW1lLCBwZXJtcyk7XG4gICAgICAgIHZhciByZXN1bHQgPSBhY3Rpb24odHgpO1xuXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgdHgub25jb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCwgcmVzdWx0KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxuICAgICAgICB0eC5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KHR4LmVycm9yKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICB9O1xuXG4gICAgLy8gSW5zZXJ0YSB1biByZWdpc3RybyBlbiBlbCBtb2RlbG9cbiAgICB0aGl6LnB1dCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluc3RhbmNlKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAnZnVuY3Rpb24nXV0pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLnB1dChpbnN0YW5jZS4kZ2V0VmFsdWVzKCkpO1xuXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gQXNpZ25hciBlbCBnZW5lcmFkbyBhbCBtb2RlbG9cbiAgICAgICAgICBpbnN0YW5jZS4kc2V0S2V5KGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShpbnN0YW5jZSwgZXZlbnQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAvLyBDb3VsZCBjYWxsIHJxLnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIE9idGllbmUgdW4gZWxlbWVudG8gcG9yIHNpIGtleVxuICAgIHRoaXouZ2V0ID0gZnVuY3Rpb24gKE1vZGVsLCBrZXkpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbicsIFsnc3RyaW5nJywgJ251bWJlciddXSk7XG5cbiAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcbiAgICAgIHZhciBpbnN0YW5jZSA9IE1vZGVsLmdldEluc3RhbmNlKGtleSk7XG4gICAgICB2YXIgbW9kZWxOYW1lID0gTW9kZWwuZ2V0TW9kZWxOYW1lKCk7XG5cbiAgICAgIGluc3RhbmNlLiRwcm9taXNlID0gZGVmZXJlZC5wcm9taXNlO1xuICAgICAgaW5zdGFuY2UuJHJlc29sdmVkID0gZmFsc2U7XG5cbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcbiAgICAgICAgdmFyIHN0b3JlID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKTtcbiAgICAgICAgdmFyIHJxID0gc3RvcmUuZ2V0KGtleSk7XG5cbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgTW9kZWwuZ2V0VmVyc2lvbk9mKGtleSkucHJvbWlzZS50aGVuKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG4gICAgICAgICAgICBpZiAocnEucmVzdWx0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBpbnN0YW5jZS4kc2V0TG9jYWxWYWx1ZXMocnEucmVzdWx0LCB2ZXJzaW9uID8gdmVyc2lvbi5oYXNoIDogbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGluc3RhbmNlKTtcbiAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAkbG9nLmVycm9yKFsnYW55IGVycm9yJywgZXJyXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGluc3RhbmNlKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfTtcblxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cbiAgICB0aGl6LmZpbmQgPSBmdW5jdGlvbiAoTW9kZWwsIGZpbHRlcnMpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG4gICAgICB2YXIgbW9kZWxOYW1lID0gTW9kZWwuZ2V0TW9kZWxOYW1lKCk7XG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgIHJlc3VsdC4kcHJvbWlzZSA9IGRlZmVyZWQucHJvbWlzZTtcbiAgICAgIHJlc3VsdC4kcmVzb2x2ZWQgPSBmYWxzZTtcblxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcbiAgICAgICAgdmFyIHN0b3JlID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKTtcbiAgICAgICAgdmFyIHJxID0gc3RvcmUub3BlbkN1cnNvcigpO1xuXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgY3Vyc29yID0gcnEucmVzdWx0O1xuXG4gICAgICAgICAgLy8gTm8gbW9yZSBtYXRjaGluZyByZWNvcmRzLlxuICAgICAgICAgIGlmICghY3Vyc29yKSB7XG4gICAgICAgICAgICByZXN1bHQuJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcmVkLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIga2V5ID0gTW9kZWwuZ2V0S2V5RnJvbShjdXJzb3IudmFsdWUpO1xuXG4gICAgICAgICAgTW9kZWwuZ2V0VmVyc2lvbk9mKGtleSkucHJvbWlzZS50aGVuKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG5cbiAgICAgICAgICAgIC8vIE9idGVuZXIgbGEgaW5zdGFuY2lhXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBNb2RlbC5nZXRJbnN0YW5jZShrZXkpO1xuXG4gICAgICAgICAgICBpbnN0YW5jZS4kc2V0TG9jYWxWYWx1ZXMoY3Vyc29yLnZhbHVlLCB2ZXJzaW9uID8gdmVyc2lvbi5oYXNoIDogbnVsbCk7XG4gICAgICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgaW5zdGFuY2UuJGVtaXQoaWRiRXZlbnRzLk1PREVMX1FVRVJJRUQsIHJlc3VsdCk7XG5cbiAgICAgICAgICAgIC8vIEFncmVnYXIgYWwgcmVzdWx0YWRvXG4gICAgICAgICAgICByZXN1bHQucHVzaChpbnN0YW5jZSk7XG5cbiAgICAgICAgICAgIC8vIEJ1c2NhciBzaWd1aWVudGVcbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICRsb2cuZXJyb3IoWydhbnkgZXJyb3InLCBlcnJdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICAvLyBDcmVhciBhbGlhcyBwYXJhIGxvcyBldmVudG9zIGVubGF6YXIgY2FsbGJhY2tzIGEgbG9zIGV2ZW50b3NcbiAgICB2YXIgZGVmZXJlZHMgPSB2b2lkIDA7XG4gICAgT2JqZWN0LmtleXMoZGVmZXJlZHMgPSB7XG4gICAgICBvbk9wZW46ICRvcGVuRGVmZXJlZCxcbiAgICAgIG9uVXBncmFkZU5lZWRlZDogJHVwZ3JhZGVOZWVkZWREZWZlcmVkLFxuICAgICAgb25Tb2NrZXRDb25uZWN0ZWQ6ICRzb2NrZXRDb25uZWN0ZWREZWZlcmVkXG4gICAgfSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdmFyIHRleHQgPSAkZGJOYW1lICsgJy52JyArICgkZGJWZXJzaW9uIHx8IDEpICsgJzogJyArIGtleTtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICRsb2cuZXJyb3IodGV4dCwgZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkbG9nLmxvZyh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGl6W2tleV0gPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xuICAgICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShjYik7XG4gICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gaWRiO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJNb2RlbFNlcnZpY2UgKCRsb2csIHFzLCBpZGJVdGlscywgbGJSZXNvdXJjZSwgJHRpbWVvdXQsIGlkYkV2ZW50cykgeyAnbmdJbmplY3QnO1xyXG5cclxuICAvLyBCdXNjYXIgdW4gY2FtcG9cclxuICBjb25zdCBzZWFyY2hEZWVwRmllbGQgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgY2IpIHtcclxuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgIGNvbnN0IGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XHJcbiAgICBjb25zdCBsYXN0RmllbGQgPSBmaWVsZHMucG9wKCk7XHJcblxyXG4gICAgcmV0dXJuIChmdW5jdGlvbiBfc2V0KG9iaikge1xyXG4gICAgICBpZiAoZmllbGRzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHJldHVybiBjYihvYmosIGxhc3RGaWVsZCk7XHJcbiAgICAgIGNvbnN0IGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XHJcbiAgICAgIGlmICh0eXBlb2Ygb2JqW2ZpZWxkXSA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAgb2JqW2ZpZWxkXSA9IHt9O1xyXG4gICAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcclxuICAgIH0pKG9iaik7XHJcblxyXG4gIH07XHJcblxyXG4gIHJldHVybiBmdW5jdGlvbiBpZGJNb2RlbCAoJGRiLCAkbW9kZWxOYW1lLCAkc29ja2V0KSB7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtudWxsICwnc3RyaW5nJ10pO1xyXG5cclxuICAgIC8vIENsYXZlIGRlbCBtb2RlbG9cclxuICAgIGNvbnN0ICRpZCA9IHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9O1xyXG4gICAgY29uc3QgJGV2ZW50c0hhbmRsZXJzID0ge307XHJcbiAgICBjb25zdCAkaW5zdGFuY2VzID0ge307XHJcbiAgICBsZXQgJGZpZWxkcyA9IHt9O1xyXG4gICAgbGV0ICRyZW1vdGUgPSBudWxsO1xyXG4gICAgbGV0ICR2ZXJzaW9uaW5nID0gbnVsbDtcclxuXHJcbiAgICAvLyBDb25zdHVjdG9yIGRlbCBtb2RlbG9cclxuICAgIGZ1bmN0aW9uIE1vZGVsKGRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICB0aGl6LiRsb2FkZWQgPSBmYWxzZTtcclxuICAgICAgdGhpei4kcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIHRoaXouJGxvY2FsVmFsdWVzID0ge307XHJcbiAgICAgIHRoaXouJHJlbW90ZVZhbHVlcyA9IHt9O1xyXG5cclxuICAgICAgdGhpei4kdmVyc2lvbiA9IG51bGw7XHJcbiAgICAgIHRoaXouJGxvY2FsVmVyc2lvbiA9IG51bGw7XHJcbiAgICAgIHRoaXouJHJlbW90ZVZlcnNpb24gPSBudWxsO1xyXG5cclxuICAgICAgdGhpei4kZXZlbnRzSGFuZGxlcnMgPSB7fTtcclxuICAgICAgXHJcbiAgICAgIGlmIChkYXRhKXtcclxuICAgICAgICB0aGl6LiRzZXRWYWx1ZXMoZGF0YSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXouJGNvbnN0cnVjdG9yKGRhdGEpO1xyXG5cclxuICAgICAgaWYgKCRzb2NrZXQpIHtcclxuICAgICAgICB0aGl6LiRsaXN0ZW4oKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgJHF1ZXJpZXMgPSBbXTtcclxuXHJcbiAgICAgIHRoaXpcclxuICAgICAgICAvLyBDdWFuZG8gc2VhIGNvbnN1bHRhZG8gYWdyZWdhciBsYSBjb25zdWx0YVxyXG4gICAgICAgIC4kYmluZChpZGJFdmVudHMuTU9ERUxfUVVFUklFRCwgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcbiAgICAgICAgICAkcXVlcmllcy5wdXNoKHF1ZXJ5KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBDdWFuZG8gc2VhIGxpYmVyYWRvIGRlIGxhIGNvbnN1bHRhciBxdWl0YXIgZGUgbGFzIGNvbnN1bHRhc1xyXG4gICAgICAgIC4kYmluZChpZGJFdmVudHMuTU9ERUxfVU5RVUVSSUVELCBmdW5jdGlvbiAocXVlcnkpIHtcclxuICAgICAgICAgIGNvbnN0IGlkeCA9ICRxdWVyaWVzLmluZGV4T2YocXVlcnkpO1xyXG4gICAgICAgICAgaWYgKGlkeCAhPSAtMSl7XHJcbiAgICAgICAgICAgICRxdWVyaWVzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIEV2ZW50byBkZSBxdWUgbW9kZWxvIGVzdMOhIGluc3RhbmNpYWRvXHJcbiAgICAgICAgLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9JTlNUQU5DRUQpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdiBlbCBub21icmUgZGVsIG1vZGVsb1xyXG4gICAgTW9kZWwuZ2V0TW9kZWxOYW1lID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgcmV0dXJuICRtb2RlbE5hbWU7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2IGVsIG5vbWJyZSBkZWwgbW9kZWxvXHJcbiAgICBNb2RlbC5nZXRLZXlQYXRoID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgcmV0dXJuICRpZC5rZXlQYXRoO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xyXG4gICAgTW9kZWwuYXV0b0luY3JlbWVudCA9IGZ1bmN0aW9uIChhdXRvSW5jcmVtZW50KSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydib29sZWFuJ10pO1xyXG5cclxuICAgICAgJGlkLmF1dG9JbmNyZW1lbnQgPSBhdXRvSW5jcmVtZW50O1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgZWwgSUQgYWwgbW9kZWxvXHJcbiAgICBNb2RlbC5rZXlQYXRoID0gZnVuY3Rpb24gKGtleVBhdGgpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZyddKTtcclxuXHJcbiAgICAgICRpZC5rZXlQYXRoID0ga2V5UGF0aDtcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RvIHN0b3JhZ2UgcGFyYSBlbCBtb2RlbG8uXHJcbiAgICBNb2RlbC5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICRkYi5jcmVhdGVTdG9yZSgkbW9kZWxOYW1lLCAkaWQpO1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZ3JlZ2EgdW4gaW5kZXhcclxuICAgIE1vZGVsLmluZGV4ID0gZnVuY3Rpb24gKGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XHJcblxyXG4gICAgICAkZGIuY3JlYXRlSW5kZXgoJG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBNw6l0b2RvIHF1ZSBwZXJtaXRlIG1vZGlmaWNhciBtb2RlbC5cclxuICAgIE1vZGVsLmJ1aWxkID0gZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgYnVpbGRDYWxsYmFjayhNb2RlbCk7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBsYSBlc3BlY2lmaWNhY2nDs24gZGUgbG9zIGNhbXBvc1xyXG4gICAgTW9kZWwuZmllbGRzID0gZnVuY3Rpb24gKGZpZWxkcykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xyXG5cclxuICAgICAgJGZpZWxkcyA9IHt9O1xyXG4gICAgICAkZmllbGRzWyRpZC5rZXlQYXRoXSA9IHtcclxuICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIixcclxuICAgICAgICBcInJlcXVpcmVkXCI6IHRydWVcclxuICAgICAgfTtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZE5hbWUpIHtcclxuICAgICAgICBsZXQgZmllbGQgPSBmaWVsZHNbZmllbGROYW1lXTtcclxuICAgICAgICBpZiAodHlwZW9mIGZpZWxkc1tmaWVsZE5hbWVdID09ICdzdHJpbmcnKXtcclxuICAgICAgICAgIGZpZWxkID0geyBcInR5cGVcIjogZmllbGQgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJGZpZWxkc1tmaWVsZE5hbWVdID0gZmllbGQ7XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGk7XHJcbiAgICBNb2RlbC5yZW1vdGUgPSBmdW5jdGlvbiAodXJsLCBhcmdzLCBhY3Rpb25zKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0JywgJ29iamVjdCddKTtcclxuXHJcbiAgICAgICRyZW1vdGUgPSBsYlJlc291cmNlKHVybCwgYXJncywgYWN0aW9ucyk7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgJHJlbW90ZSBkZWwgbW9kZWxvXHJcbiAgICBNb2RlbC5nZXRSZW1vdGUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICByZXR1cm4gJHJlbW90ZTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgJHJlbW90ZSBkZWwgbW9kZWxvXHJcbiAgICBNb2RlbC5nZXRWZXJzaW9uaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgcmV0dXJuICR2ZXJzaW9uaW5nO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXHJcbiAgICBNb2RlbC5nZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gKG9iaiwgZmllbGQpIHtcclxuICAgICAgcmV0dXJuIHNlYXJjaERlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cclxuICAgIE1vZGVsLnNldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgdmFsdWUpIHtcclxuICAgICAgc2VhcmNoRGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgICAgIG9ialtsYXN0RmllbGRdID0gdmFsdWU7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gb2JqO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBjb3JyZXNwb25kaWVudGUgYWwga2V5IGRlIHVuIG9iamV0b1xyXG4gICAgTW9kZWwuZ2V0S2V5RnJvbSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgIHJldHVybiBNb2RlbC5nZXRGaWVsZFZhbHVlKGRhdGEsICRpZC5rZXlQYXRoKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgbGEgaW5zdGFuY2lhIGRlbCBtb2RlbCBkZSBsYXMgZ3VhcmRhZGFzLiBTaSBubyBleGlzdGUgZW50b25jZVxyXG4gICAgLy8gc2UgY3JlYVxyXG4gICAgTW9kZWwuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snc3RyaW5nJywgJ251bWJlcicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgLy8gRWwgb2JqZXRvIG5vIHRpZW5lIElEXHJcbiAgICAgIGlmICgha2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNb2RlbCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBObyBleGlzdGUgbGEgaW5zdGFuY2lhIGVudG9uY2Ugc2UgY3JlYVxyXG4gICAgICBpZiAoISRpbnN0YW5jZXNba2V5XSl7XHJcbiAgICAgICAgJGluc3RhbmNlc1trZXldID0gbmV3IE1vZGVsKCk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHJldHVybiAkaW5zdGFuY2VzW2tleV07XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBCdXNjYSB1biByZWdpc3RybyBlbiBsYSBvYmplY3RTdG9yZSBkZWwgbW9kZWxvLlxyXG4gICAgTW9kZWwuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xyXG5cclxuICAgICAgcmV0dXJuICRkYi5nZXQoTW9kZWwsIGtleSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBCdXNjYXIgZW4gZWwgbW9kZWxvXHJcbiAgICBNb2RlbC5maW5kID0gZnVuY3Rpb24gKGZpbHRlcnMpIHtcclxuXHJcbiAgICAgIHJldHVybiAkZGIucXVlcnkoTW9kZWwsIGZpbHRlcnMpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBudWV2YXMgaW5zdGFuY2lhcyBkZSBsb3MgbW9kZWxvc1xyXG4gICAgTW9kZWwuY3JlYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIC8vIFNpIGVzIHVuIGFycmF5XHJcbiAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc3QgcmVjb3JkID0gTW9kZWwuZ2V0SW5zdGFuY2UoTW9kZWwuZ2V0S2V5RnJvbShkYXRhKSk7XHJcblxyXG4gICAgICAgIGlmIChyZWNvcmQuJGxvYWRlZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5DYW50Q3JlYXRlZExvYWRlZEluc3RhbmNlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVjb3JkLiRzYXZlKCk7XHJcblxyXG4gICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgIC8vIE9idGVuZXIgdW5hIGNvcGlhIGRlbCBhcnJheVxyXG4gICAgICBjb25zdCBhcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhKTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gW107XHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XHJcblxyXG4gICAgICAoZnVuY3Rpb24gaXRlcmF0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gTm8gcXVlZGFuIGVsZW1lbnRvcyBlbiBlbCBhcnJheVxyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09IDApIHJldHVybiBkZWZlcmVkLnJlc29sdmUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXIgZWwgc2lndWllbnRlIGVsZW1lbnRvXHJcbiAgICAgICAgTW9kZWwuY3JlYXRlKGFyci5zaGlmdCgpKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgaXRlcmF0aW9uKCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgfSkoKTtcclxuXHJcbiAgICAgIC8vIERldm9sdmVyIGVsIHByb21pc2VcclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIHVuIG1vZGVsbyBwYXJhIGd1YXJkYXIgbGFzIHZlcnNpb25lcyBkZWwgbW9kZWxvIGFjdHVhbFxyXG4gICAgTW9kZWwudmVyc2lvbmluZyA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGNiKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgbW9kZWxOYW1lID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY2IgPSBtb2RlbE5hbWU7XHJcbiAgICAgICAgbW9kZWxOYW1lID0gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKFttb2RlbE5hbWUsIGNiXSwgW1snc3RyaW5nJywgJ3VuZGVmaW5lZCddLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICBpZiAoISR2ZXJzaW9uaW5nKSB7XHJcblxyXG4gICAgICAgIC8vIFNpIGVsIG1vZGVsIG5vIHRpZW5lIG5vbWJyZSBzZSBhZ3JlZ2FcclxuICAgICAgICBpZiAoIW1vZGVsTmFtZSl7XHJcbiAgICAgICAgICBtb2RlbE5hbWUgPSAkbW9kZWxOYW1lKydfdmVyc2lvbmluZyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDcmVhciBtb2RlbG8gcGFyYSBlbCBtYW5lam8gZGUgZGF0b3NcclxuICAgICAgICAkdmVyc2lvbmluZyA9ICRkYi5tb2RlbChtb2RlbE5hbWUpXHJcbiAgICAgICAgICAuYXV0b0luY3JlbWVudChmYWxzZSlcclxuICAgICAgICAgIC5rZXlQYXRoKCdrZXknKVxyXG4gICAgICAgICAgLmZpZWxkcyh7XHJcbiAgICAgICAgICAgIFwiaGFzaFwiOiB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSxcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNiKSBjYigkdmVyc2lvbmluZyk7XHJcblxyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZ3JlZ2EgdW4gbWFuZGVqYWRvciBkZSBldmVudG9zIGFsIG1vZGVsb1xyXG4gICAgTW9kZWwuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGlmICghJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xyXG5cclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGlzcGFyYSB1biBldmVudG8gZGVsIG1vZGVsXHJcbiAgICBNb2RlbC5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnYXJyYXknXV0pO1xyXG5cclxuICAgICAgaWYgKCRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ubWFwKGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgY2IuYXBwbHkoTW9kZWwsIGFyZ3MgfHwgW10pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGdldCA9IGZ1bmN0aW9uIChmaWVsZCkge1xyXG5cclxuICAgICAgcmV0dXJuIE1vZGVsLmdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0ID0gZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkge1xyXG5cclxuICAgICAgcmV0dXJuIE1vZGVsLmdldEZpZWxkVmFsdWUodGhpcywgZmllbGQsIHZhbHVlKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIHVuIG9iamV0byBjb24gbGFzIHByb3BpZWRhZGVzIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRnZXRWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBjb25zdCB2YWx1ZXMgPSB7fTtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKCRmaWVsZHMpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICBNb2RlbC5zZXRGaWVsZFZhbHVlKHZhbHVlcywgZmllbGQsIE1vZGVsLmdldEZpZWxkVmFsdWUodGhpeiwgZmllbGQpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gdmFsdWVzO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgdW4gb2JqZXRvIGNvbiBsYXMgcHJvcGllZGFkZXMgbG9jYWxlcyBkZWwgcmVnaXN0cm9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0TG9jYWxWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBjb25zdCB2YWx1ZXMgPSB7fTtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKCRmaWVsZHMpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICBNb2RlbC5zZXRGaWVsZFZhbHVlKHZhbHVlcywgZmllbGQsIE1vZGVsLmdldEZpZWxkVmFsdWUodGhpei4kbG9jYWxWYWx1ZXMsIGZpZWxkKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHZhbHVlcztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIHVuIG1vZGVsbyBjb24gbGFzIHByb3BpZWRhZGVzIHJlbW90YXMgZGVsIHJlZ2lzdHJvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGdldFJlbW90ZVZhbHVlcyA9IGZ1bmN0aW9uICgpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGNvbnN0IHZhbHVlcyA9IHt9O1xyXG5cclxuICAgICAgT2JqZWN0LmtleXMoJGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICAgIE1vZGVsLnNldEZpZWxkVmFsdWUodmFsdWVzLCBmaWVsZCwgTW9kZWwuZ2V0RmllbGRWYWx1ZSh0aGl6LiRyZW1vdGVWYWx1ZXMsIGZpZWxkKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHZhbHVlcztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBsYXMgcHJvcGllZGFkZXMgZGVsIHJlZ2lzdHJvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJHNldFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhLCB2ZXJzaW9uKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcclxuICAgICAgXHJcbiAgICAgIHRoaXouJHZlcnNpb24gPSB2ZXJzaW9uO1xyXG5cclxuICAgICAgT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICAgIE1vZGVsLnNldEZpZWxkVmFsdWUodGhpeiwgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGl6LiRsb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIGxvY2FsZXMgZGVsIHJlZ2lzdHJvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJHNldExvY2FsVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xyXG4gICAgICBcclxuICAgICAgdGhpei4kbG9jYWxWZXJzaW9uID0gdmVyc2lvbjtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICBNb2RlbC5zZXRGaWVsZFZhbHVlKHRoaXouJGxvY2FsVmFsdWVzLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICghdGhpei4kbG9hZGVkKSB7XHJcbiAgICAgICAgdGhpei4kc2V0VmFsdWVzKGRhdGEsIHZlcnNpb24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBsYXMgcHJvcGllZGFkZXMgcmVtb3RhcyBkZWwgcmVnaXN0cm9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0UmVtb3RlVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xyXG4gICAgICBcclxuICAgICAgdGhpei4kcmVtb3RlVmVyc2lvbiA9IHZlcnNpb247XHJcblxyXG4gICAgICBPYmplY3Qua2V5cyhkYXRhKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgICAgTW9kZWwuc2V0RmllbGRWYWx1ZSh0aGl6LiRyZW1vdGVWYWx1ZXMsIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCF0aGl6LiRsb2FkZWQpIHtcclxuICAgICAgICB0aGl6LiRzZXRWYWx1ZXMoZGF0YSwgdmVyc2lvbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGVsIElEIGRlbCBvYmpldG9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0S2V5ID0gZnVuY3Rpb24gKG5ld0tleSkge1xyXG4gICAgICBcclxuICAgICAgY29uc3Qgb2xkS2V5ID0gTW9kZWwuZ2V0S2V5RnJvbSh0aGlzKTtcclxuXHJcbiAgICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGlzLCAkaWQua2V5UGF0aCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICAgICAgb2JqW2xhc3RGaWVsZF0gPSBuZXdLZXk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKG9sZEtleSAhPT0gbmV3S2V5KSB7XHJcblxyXG4gICAgICAgIGlmIChvbGRLZXkgJiYgJGluc3RhbmNlc1tvbGRLZXldICYmICRpbnN0YW5jZXNbb2xkS2V5XSAhPSB0aGlzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkluc3RhbmNlT2ZPbGRLZXlJc05vdFNhbWUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5ld0tleSAmJiAkaW5zdGFuY2VzW25ld0tleV0gJiYgJGluc3RhbmNlc1tuZXdLZXldICE9IHRoaXMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk5ld0tleUlzTm90U2FtZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRWxpbWluYXIgYW50ZXJpb3JcclxuICAgICAgICBpZiAob2xkS2V5ICYmICRpbnN0YW5jZXNbb2xkS2V5XSkge1xyXG4gICAgICAgICAgZGVsZXRlICRpbnN0YW5jZXNbb2xkS2V5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFncmVnYXIgbnVldmFcclxuICAgICAgICBpZiAobmV3S2V5ICYmICEkaW5zdGFuY2VzW25ld0tleV0pIHtcclxuICAgICAgICAgICRpbnN0YW5jZXNbbmV3S2V5XSA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbnN0dXJjdG9yIHF1ZSBzZSBwdWVkZSBzb2JyZSBlc2NyaWJpclxyXG4gICAgTW9kZWwucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIHNpIGVsIG9iamV0byBlc3TDoSBhbG1hY2VuYWRvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGlzU3RvcmVkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgcmV0dXJuICRpbnN0YW5jZXNbdGhpcy4kZ2V0KCRpZC5rZXlQYXRoKV0gPT09IHRoaXM7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGUgbGEgdmVyc2lvbiBsb2NhbCBkZWwgcmVnaXN0cm9cclxuICAgIE1vZGVsLmdldFZlcnNpb25PZiA9IGZ1bmN0aW9uIChrZXkpIHsgXHJcblxyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuXHJcbiAgICAgIGlmICgkdmVyc2lvbmluZykge1xyXG4gICAgICAgICR2ZXJzaW9uaW5nLmdldChrZXkpLiRwcm9taXNlXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGluc3RhbmNlKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkZWZlcmVkLnJlamVjdChudWxsKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShudWxsKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBHdWFyZGEgbG9zIGRhdG9zIGRlbCBvYmpldG9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kc2F2ZSA9IGZ1bmN0aW9uICgpeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddKTtcclxuXHJcbiAgICAgIHJldHVybiAkZGIucHV0KCRtb2RlbE5hbWUsIHRoaXMpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRnVuY2lvbiBxdWUgaGFjZSBlc2N1Y2hhcnMgbG9zIG1lbnNhamVzIGRlbCBzb2NrZXQgcGFyYSBlbCBtb2RlbFxyXG4gICAgTW9kZWwucHJvdG90eXBlLiRsaXN0ZW4gPSBmdW5jdGlvbiAoKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZiAoISRzb2NrZXQpIHRocm93IG5ldyBFcnJvcignTW9kZWwuRG9lc05vdEhhdmVTb2NrZXRJbnN0YW5jZScpO1xyXG5cclxuICAgICAgLy8gQ3JlYXIgdW5hIHN1YnNjcmlwY2lvbiBhbCBzb2NrZXQgcGFyYSBjdWFuZG8gc2UgcmVjaWJhbiBkYXRvc1xyXG4gICAgICAvLyBwYXJhIGxhIGluc3RhbmNpYSBhY3R1YWxcclxuICAgICAgJHNvY2tldC5zdWJzY3JpYmUoe1xyXG4gICAgICAgIG1vZGVsTmFtZTogJG1vZGVsTmFtZSxcclxuICAgICAgICBldmVudE5hbWU6ICd1cGRhdGUnLFxyXG4gICAgICAgIG1vZGVsSWQ6IHRoaXouJGdldChNb2RlbC5nZXRLZXlQYXRoKCkpLFxyXG4gICAgICB9LCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAvLyBBIHJlY2liaXIgZGF0b3MgZGVsIHNvY2tldCBhc2lnbmFyIGxvcyB2YWxvcmVzXHJcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgLy8gRW1pdGlyIGV2ZW50byBkZSBkYXRvcyByZWNpYmlkb3IgcGFyYSBlbCBtb2RlbG9cclxuICAgICAgICAgIHRoaXouJHNldFJlbW90ZVZhbHVlcyhkYXRhLnZhbHVlcywgZGF0YS52ZXJzaW9uKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQWdyZWdhIHVuIG1hbmRlamFkb3IgZGUgZXZlbnRvc1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRiaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgdGhpcy4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGVtaXQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnYXJyYXknXV0pO1xyXG5cclxuICAgICAgLy8gTGxhbWFyIGVsIGV2ZW50byBwYXJhIGVsIG1vZGVsb1xyXG4gICAgICBNb2RlbC5lbWl0KGV2ZW50TmFtZSwgW3RoaXosIFtdLmNvbmNhdChbdGhpel0pLmNvbmNhdChhcmdzKV0pO1xyXG5cclxuICAgICAgaWYgKHRoaXouJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICB0aGl6LiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLm1hcChmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAgIGNiLmFwcGx5KHRoaXosIGFyZ3MgfHwgW10pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIE1vZGVsLiRpbnN0YW5jZXMgPSAkaW5zdGFuY2VzO1xyXG5cclxuICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgfTtcclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiTW9kZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYk1vZGVsU2VydmljZTtcbmZ1bmN0aW9uIGlkYk1vZGVsU2VydmljZSgkbG9nLCBxcywgaWRiVXRpbHMsIGxiUmVzb3VyY2UsICR0aW1lb3V0LCBpZGJFdmVudHMpIHtcbiAgICAgICduZ0luamVjdCc7XG5cbiAgICAgIC8vIEJ1c2NhciB1biBjYW1wb1xuXG4gICAgICB2YXIgc2VhcmNoRGVlcEZpZWxkID0gZnVuY3Rpb24gc2VhcmNoRGVlcEZpZWxkKG9iaiwgZmllbGQsIGNiKSB7XG4gICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgICAgICAgICAgdmFyIGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICB2YXIgbGFzdEZpZWxkID0gZmllbGRzLnBvcCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gX3NldChvYmopIHtcbiAgICAgICAgICAgICAgICAgIGlmIChmaWVsZHMubGVuZ3RoID09IDApIHJldHVybiBjYihvYmosIGxhc3RGaWVsZCk7XG4gICAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSBmaWVsZHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2ZpZWxkXSA9PT0gJ3VuZGVmaW5lZCcpIG9ialtmaWVsZF0gPSB7fTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfc2V0KG9ialtmaWVsZF0pO1xuICAgICAgICAgICAgfShvYmopO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlkYk1vZGVsKCRkYiwgJG1vZGVsTmFtZSwgJHNvY2tldCkge1xuICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbbnVsbCwgJ3N0cmluZyddKTtcblxuICAgICAgICAgICAgLy8gQ2xhdmUgZGVsIG1vZGVsb1xuICAgICAgICAgICAgdmFyICRpZCA9IHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9O1xuICAgICAgICAgICAgdmFyICRldmVudHNIYW5kbGVycyA9IHt9O1xuICAgICAgICAgICAgdmFyICRpbnN0YW5jZXMgPSB7fTtcbiAgICAgICAgICAgIHZhciAkZmllbGRzID0ge307XG4gICAgICAgICAgICB2YXIgJHJlbW90ZSA9IG51bGw7XG4gICAgICAgICAgICB2YXIgJHZlcnNpb25pbmcgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBDb25zdHVjdG9yIGRlbCBtb2RlbG9cbiAgICAgICAgICAgIGZ1bmN0aW9uIE1vZGVsKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXouJGxvYWRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhpei4kcmVzb2x2ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgdGhpei4kbG9jYWxWYWx1ZXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgIHRoaXouJHJlbW90ZVZhbHVlcyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiR2ZXJzaW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgIHRoaXouJGxvY2FsVmVyc2lvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICB0aGl6LiRyZW1vdGVWZXJzaW9uID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgdGhpei4kZXZlbnRzSGFuZGxlcnMgPSB7fTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXouJHNldFZhbHVlcyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgdGhpei4kY29uc3RydWN0b3IoZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICgkc29ja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGl6LiRsaXN0ZW4oKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgdmFyICRxdWVyaWVzID0gW107XG5cbiAgICAgICAgICAgICAgICAgIHRoaXpcbiAgICAgICAgICAgICAgICAgIC8vIEN1YW5kbyBzZWEgY29uc3VsdGFkbyBhZ3JlZ2FyIGxhIGNvbnN1bHRhXG4gICAgICAgICAgICAgICAgICAuJGJpbmQoaWRiRXZlbnRzLk1PREVMX1FVRVJJRUQsIGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHF1ZXJpZXMucHVzaChxdWVyeSk7XG4gICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAvLyBDdWFuZG8gc2VhIGxpYmVyYWRvIGRlIGxhIGNvbnN1bHRhciBxdWl0YXIgZGUgbGFzIGNvbnN1bHRhc1xuICAgICAgICAgICAgICAgICAgLiRiaW5kKGlkYkV2ZW50cy5NT0RFTF9VTlFVRVJJRUQsIGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkeCA9ICRxdWVyaWVzLmluZGV4T2YocXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHF1ZXJpZXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAvLyBFdmVudG8gZGUgcXVlIG1vZGVsbyBlc3TDoSBpbnN0YW5jaWFkb1xuICAgICAgICAgICAgICAgICAgLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9JTlNUQU5DRUQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdiBlbCBub21icmUgZGVsIG1vZGVsb1xuICAgICAgICAgICAgTW9kZWwuZ2V0TW9kZWxOYW1lID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gJG1vZGVsTmFtZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERldnVlbHYgZWwgbm9tYnJlIGRlbCBtb2RlbG9cbiAgICAgICAgICAgIE1vZGVsLmdldEtleVBhdGggPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiAkaWQua2V5UGF0aDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cbiAgICAgICAgICAgIE1vZGVsLmF1dG9JbmNyZW1lbnQgPSBmdW5jdGlvbiAoYXV0b0luY3JlbWVudCkge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Jvb2xlYW4nXSk7XG5cbiAgICAgICAgICAgICAgICAgICRpZC5hdXRvSW5jcmVtZW50ID0gYXV0b0luY3JlbWVudDtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBNb2RlbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cbiAgICAgICAgICAgIE1vZGVsLmtleVBhdGggPSBmdW5jdGlvbiAoa2V5UGF0aCkge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZyddKTtcblxuICAgICAgICAgICAgICAgICAgJGlkLmtleVBhdGggPSBrZXlQYXRoO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQ3JlYSBlbCBvYmplY3RvIHN0b3JhZ2UgcGFyYSBlbCBtb2RlbG8uXG4gICAgICAgICAgICBNb2RlbC5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgJGRiLmNyZWF0ZVN0b3JlKCRtb2RlbE5hbWUsICRpZCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBZ3JlZ2EgdW4gaW5kZXhcbiAgICAgICAgICAgIE1vZGVsLmluZGV4ID0gZnVuY3Rpb24gKGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XG5cbiAgICAgICAgICAgICAgICAgICRkYi5jcmVhdGVJbmRleCgkbW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBNw6l0b2RvIHF1ZSBwZXJtaXRlIG1vZGlmaWNhciBtb2RlbC5cbiAgICAgICAgICAgIE1vZGVsLmJ1aWxkID0gZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcblxuICAgICAgICAgICAgICAgICAgYnVpbGRDYWxsYmFjayhNb2RlbCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBc2lnbmEgbGEgZXNwZWNpZmljYWNpw7NuIGRlIGxvcyBjYW1wb3NcbiAgICAgICAgICAgIE1vZGVsLmZpZWxkcyA9IGZ1bmN0aW9uIChmaWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnXSk7XG5cbiAgICAgICAgICAgICAgICAgICRmaWVsZHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICRmaWVsZHNbJGlkLmtleVBhdGhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCI6IHRydWVcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IGZpZWxkc1tmaWVsZE5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZHNbZmllbGROYW1lXSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQgPSB7IFwidHlwZVwiOiBmaWVsZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgJGZpZWxkc1tmaWVsZE5hbWVdID0gZmllbGQ7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGk7XG4gICAgICAgICAgICBNb2RlbC5yZW1vdGUgPSBmdW5jdGlvbiAodXJsLCBhcmdzLCBhY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCcsICdvYmplY3QnXSk7XG5cbiAgICAgICAgICAgICAgICAgICRyZW1vdGUgPSBsYlJlc291cmNlKHVybCwgYXJncywgYWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGVsICRyZW1vdGUgZGVsIG1vZGVsb1xuICAgICAgICAgICAgTW9kZWwuZ2V0UmVtb3RlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gJHJlbW90ZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgJHJlbW90ZSBkZWwgbW9kZWxvXG4gICAgICAgICAgICBNb2RlbC5nZXRWZXJzaW9uaW5nID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gJHZlcnNpb25pbmc7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cbiAgICAgICAgICAgIE1vZGVsLmdldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXJjaERlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXG4gICAgICAgICAgICBNb2RlbC5zZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gKG9iaiwgZmllbGQsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICBzZWFyY2hEZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgY29ycmVzcG9uZGllbnRlIGFsIGtleSBkZSB1biBvYmpldG9cbiAgICAgICAgICAgIE1vZGVsLmdldEtleUZyb20gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsLmdldEZpZWxkVmFsdWUoZGF0YSwgJGlkLmtleVBhdGgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgbGEgaW5zdGFuY2lhIGRlbCBtb2RlbCBkZSBsYXMgZ3VhcmRhZGFzLiBTaSBubyBleGlzdGUgZW50b25jZVxuICAgICAgICAgICAgLy8gc2UgY3JlYVxuICAgICAgICAgICAgTW9kZWwuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ3N0cmluZycsICdudW1iZXInLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgLy8gRWwgb2JqZXRvIG5vIHRpZW5lIElEXG4gICAgICAgICAgICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNb2RlbCgpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAvLyBObyBleGlzdGUgbGEgaW5zdGFuY2lhIGVudG9uY2Ugc2UgY3JlYVxuICAgICAgICAgICAgICAgICAgaWYgKCEkaW5zdGFuY2VzW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnN0YW5jZXNba2V5XSA9IG5ldyBNb2RlbCgpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gJGluc3RhbmNlc1trZXldO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQnVzY2EgdW4gcmVnaXN0cm8gZW4gbGEgb2JqZWN0U3RvcmUgZGVsIG1vZGVsby5cbiAgICAgICAgICAgIE1vZGVsLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuICRkYi5nZXQoTW9kZWwsIGtleSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBCdXNjYXIgZW4gZWwgbW9kZWxvXG4gICAgICAgICAgICBNb2RlbC5maW5kID0gZnVuY3Rpb24gKGZpbHRlcnMpIHtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuICRkYi5xdWVyeShNb2RlbCwgZmlsdGVycyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDcmVhIG51ZXZhcyBpbnN0YW5jaWFzIGRlIGxvcyBtb2RlbG9zXG4gICAgICAgICAgICBNb2RlbC5jcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgLy8gU2kgZXMgdW4gYXJyYXlcbiAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gTW9kZWwuZ2V0SW5zdGFuY2UoTW9kZWwuZ2V0S2V5RnJvbShkYXRhKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWNvcmQuJGxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5DYW50Q3JlYXRlZExvYWRlZEluc3RhbmNlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWNvcmQuJHNhdmUoKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgLy8gT2J0ZW5lciB1bmEgY29waWEgZGVsIGFycmF5XG4gICAgICAgICAgICAgICAgICB2YXIgYXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZGF0YSk7XG4gICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKGNiKTtcblxuICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIGl0ZXJhdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm8gcXVlZGFuIGVsZW1lbnRvcyBlbiBlbCBhcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyci5sZW5ndGggPT0gMCkgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZShyZXN1bHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhciBlbCBzaWd1aWVudGUgZWxlbWVudG9cbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZGVsLmNyZWF0ZShhcnIuc2hpZnQoKSkudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSkoKTtcblxuICAgICAgICAgICAgICAgICAgLy8gRGV2b2x2ZXIgZWwgcHJvbWlzZVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDcmVhIHVuIG1vZGVsbyBwYXJhIGd1YXJkYXIgbGFzIHZlcnNpb25lcyBkZWwgbW9kZWxvIGFjdHVhbFxuICAgICAgICAgICAgTW9kZWwudmVyc2lvbmluZyA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGNiKSB7XG4gICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1vZGVsTmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IgPSBtb2RlbE5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbE5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShbbW9kZWxOYW1lLCBjYl0sIFtbJ3N0cmluZycsICd1bmRlZmluZWQnXSwgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoISR2ZXJzaW9uaW5nKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpIGVsIG1vZGVsIG5vIHRpZW5lIG5vbWJyZSBzZSBhZ3JlZ2FcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbW9kZWxOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbE5hbWUgPSAkbW9kZWxOYW1lICsgJ192ZXJzaW9uaW5nJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXIgbW9kZWxvIHBhcmEgZWwgbWFuZWpvIGRlIGRhdG9zXG4gICAgICAgICAgICAgICAgICAgICAgICAkdmVyc2lvbmluZyA9ICRkYi5tb2RlbChtb2RlbE5hbWUpLmF1dG9JbmNyZW1lbnQoZmFsc2UpLmtleVBhdGgoJ2tleScpLmZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhhc2hcIjogeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZiAoY2IpIGNiKCR2ZXJzaW9uaW5nKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQWdyZWdhIHVuIG1hbmRlamFkb3IgZGUgZXZlbnRvcyBhbCBtb2RlbG9cbiAgICAgICAgICAgIE1vZGVsLmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoISRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEaXNwYXJhIHVuIGV2ZW50byBkZWwgbW9kZWxcbiAgICAgICAgICAgIE1vZGVsLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnYXJyYXknXV0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLm1hcChmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiLmFwcGx5KE1vZGVsLCBhcmdzIHx8IFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJGdldCA9IGZ1bmN0aW9uIChmaWVsZCkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWwuZ2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBc2lnbmEgaW4gdmFsb3IgYSB1biBjYW1wb1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRzZXQgPSBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBNb2RlbC5nZXRGaWVsZFZhbHVlKHRoaXMsIGZpZWxkLCB2YWx1ZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEZXZ1ZWx2ZSB1biBvYmpldG8gY29uIGxhcyBwcm9waWVkYWRlcyBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0VmFsdWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cygkZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RlbC5zZXRGaWVsZFZhbHVlKHZhbHVlcywgZmllbGQsIE1vZGVsLmdldEZpZWxkVmFsdWUodGhpeiwgZmllbGQpKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgdW4gb2JqZXRvIGNvbiBsYXMgcHJvcGllZGFkZXMgbG9jYWxlcyBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0TG9jYWxWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0ge307XG5cbiAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKCRmaWVsZHMpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZGVsLnNldEZpZWxkVmFsdWUodmFsdWVzLCBmaWVsZCwgTW9kZWwuZ2V0RmllbGRWYWx1ZSh0aGl6LiRsb2NhbFZhbHVlcywgZmllbGQpKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgdW4gbW9kZWxvIGNvbiBsYXMgcHJvcGllZGFkZXMgcmVtb3RhcyBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0UmVtb3RlVmFsdWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cygkZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RlbC5zZXRGaWVsZFZhbHVlKHZhbHVlcywgZmllbGQsIE1vZGVsLmdldEZpZWxkVmFsdWUodGhpei4kcmVtb3RlVmFsdWVzLCBmaWVsZCkpO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIGRlbCByZWdpc3Ryb1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRzZXRWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSwgdmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXouJHZlcnNpb24gPSB2ZXJzaW9uO1xuXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RlbC5zZXRGaWVsZFZhbHVlKHRoaXosIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgdGhpei4kbG9hZGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIGxvY2FsZXMgZGVsIHJlZ2lzdHJvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJHNldExvY2FsVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRsb2NhbFZlcnNpb24gPSB2ZXJzaW9uO1xuXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RlbC5zZXRGaWVsZFZhbHVlKHRoaXouJGxvY2FsVmFsdWVzLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICghdGhpei4kbG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGl6LiRzZXRWYWx1ZXMoZGF0YSwgdmVyc2lvbik7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQXNpZ25hIGxhcyBwcm9waWVkYWRlcyByZW1vdGFzIGRlbCByZWdpc3Ryb1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRzZXRSZW1vdGVWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSwgdmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXouJHJlbW90ZVZlcnNpb24gPSB2ZXJzaW9uO1xuXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RlbC5zZXRGaWVsZFZhbHVlKHRoaXouJHJlbW90ZVZhbHVlcywgZmllbGQsIGRhdGFbZmllbGRdKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoIXRoaXouJGxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpei4kc2V0VmFsdWVzKGRhdGEsIHZlcnNpb24pO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBlbCBJRCBkZWwgb2JqZXRvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJHNldEtleSA9IGZ1bmN0aW9uIChuZXdLZXkpIHtcblxuICAgICAgICAgICAgICAgICAgdmFyIG9sZEtleSA9IE1vZGVsLmdldEtleUZyb20odGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGlzLCAkaWQua2V5UGF0aCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IG5ld0tleTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAob2xkS2V5ICE9PSBuZXdLZXkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZEtleSAmJiAkaW5zdGFuY2VzW29sZEtleV0gJiYgJGluc3RhbmNlc1tvbGRLZXldICE9IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk9sZEtleUlzTm90U2FtZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0tleSAmJiAkaW5zdGFuY2VzW25ld0tleV0gJiYgJGluc3RhbmNlc1tuZXdLZXldICE9IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk5ld0tleUlzTm90U2FtZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFbGltaW5hciBhbnRlcmlvclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZEtleSAmJiAkaW5zdGFuY2VzW29sZEtleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSAkaW5zdGFuY2VzW29sZEtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFncmVnYXIgbnVldmFcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdLZXkgJiYgISRpbnN0YW5jZXNbbmV3S2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGluc3RhbmNlc1tuZXdLZXldID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDb25zdHVyY3RvciBxdWUgc2UgcHVlZGUgc29icmUgZXNjcmliaXJcbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZGF0YSkge307XG5cbiAgICAgICAgICAgIC8vIERldnVlbHZlIHNpIGVsIG9iamV0byBlc3TDoSBhbG1hY2VuYWRvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJGlzU3RvcmVkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gJGluc3RhbmNlc1t0aGlzLiRnZXQoJGlkLmtleVBhdGgpXSA9PT0gdGhpcztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZSBsYSB2ZXJzaW9uIGxvY2FsIGRlbCByZWdpc3Ryb1xuICAgICAgICAgICAgTW9kZWwuZ2V0VmVyc2lvbk9mID0gZnVuY3Rpb24gKGtleSkge1xuXG4gICAgICAgICAgICAgICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICgkdmVyc2lvbmluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHZlcnNpb25pbmcuZ2V0KGtleSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcmVkLnJlamVjdChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEd1YXJkYSBsb3MgZGF0b3MgZGVsIG9iamV0b1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuICRkYi5wdXQoJG1vZGVsTmFtZSwgdGhpcyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBGdW5jaW9uIHF1ZSBoYWNlIGVzY3VjaGFycyBsb3MgbWVuc2FqZXMgZGVsIHNvY2tldCBwYXJhIGVsIG1vZGVsXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJGxpc3RlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlmICghJHNvY2tldCkgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5Eb2VzTm90SGF2ZVNvY2tldEluc3RhbmNlJyk7XG5cbiAgICAgICAgICAgICAgICAgIC8vIENyZWFyIHVuYSBzdWJzY3JpcGNpb24gYWwgc29ja2V0IHBhcmEgY3VhbmRvIHNlIHJlY2liYW4gZGF0b3NcbiAgICAgICAgICAgICAgICAgIC8vIHBhcmEgbGEgaW5zdGFuY2lhIGFjdHVhbFxuICAgICAgICAgICAgICAgICAgJHNvY2tldC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxOYW1lOiAkbW9kZWxOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiAndXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsSWQ6IHRoaXouJGdldChNb2RlbC5nZXRLZXlQYXRoKCkpXG4gICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBIHJlY2liaXIgZGF0b3MgZGVsIHNvY2tldCBhc2lnbmFyIGxvcyB2YWxvcmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFbWl0aXIgZXZlbnRvIGRlIGRhdG9zIHJlY2liaWRvciBwYXJhIGVsIG1vZGVsb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpei4kc2V0UmVtb3RlVmFsdWVzKGRhdGEudmFsdWVzLCBkYXRhLnZlcnNpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFncmVnYSB1biBtYW5kZWphZG9yIGRlIGV2ZW50b3NcbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICghdGhpcy4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICB0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGlzcGFyYSB1biBldmVudG9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3VuZGVmaW5lZCcsICdhcnJheSddXSk7XG5cbiAgICAgICAgICAgICAgICAgIC8vIExsYW1hciBlbCBldmVudG8gcGFyYSBlbCBtb2RlbG9cbiAgICAgICAgICAgICAgICAgIE1vZGVsLmVtaXQoZXZlbnROYW1lLCBbdGhpeiwgW10uY29uY2F0KFt0aGl6XSkuY29uY2F0KGFyZ3MpXSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICh0aGl6LiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGl6LiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLm1hcChmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiLmFwcGx5KHRoaXosIGFyZ3MgfHwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgTW9kZWwuJGluc3RhbmNlcyA9ICRpbnN0YW5jZXM7XG5cbiAgICAgICAgICAgIHJldHVybiBNb2RlbDtcbiAgICAgIH07XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiTW9kZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiUXVlcnkgKCRsb2csIGlkYlV0aWxzLCBpZGJFdmVudHMpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gZnVuY3Rpb24gaWRiUXVlcnkoJGRiLCAkTW9kZWwsICRmaWx0ZXJzKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdmdW5jdGlvbicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgbGV0ICRyZXN1bHQgPSBudWxsO1xyXG5cclxuICAgIC8vIEZ1bmNpb24gcXVlIGRldnVlbHZlIGVqZWN1dGEgZWwgcXVlcnkgeSBkZXZ1ZWx2ZSBlbCByZXN1bHRhZG8uXHJcbiAgICB0aGl6LmdldFJlc3VsdCA9IGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgLy8gRWplY3V0YXIgc2kgbm8gc2UgaGEgZWplY3V0YWRvXHJcbiAgICAgIGlmICghJHJlc3VsdCkge1xyXG4gICAgICAgICRyZXN1bHQgPSAkZGIuZmluZCgkTW9kZWwsICRmaWx0ZXJzKTtcclxuXHJcbiAgICAgICAgJHJlc3VsdC4kcHJvbWlzZVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGl6LmdldFJlbW90ZVJlc3VsdCgpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gJHJlc3VsdDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE9idGllbmUgZWwgcmVzdWx0YWRvIGRlIHZhbG9yZXMgcmVtb3Rvc1xyXG4gICAgdGhpei5nZXRSZW1vdGVSZXN1bHQgPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgbGV0ICRyZW1vdGUgPSAkTW9kZWwuZ2V0UmVtb3RlKCk7XHJcbiAgICAgIGxldCAkcmVtb3RlUmVzdWx0ID0gbnVsbDtcclxuXHJcbiAgICAgIGlmICgkcmVtb3RlICYmIHR5cGVvZiAkcmVtb3RlLmZpbmQgPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICgkcmVtb3RlUmVzdWx0ID0gJHJlbW90ZS5maW5kKCRmaWx0ZXJzLCBjYikuJHByb21pc2UpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5tYXAoZnVuY3Rpb24gKHJlY29yZCwgaSkge1xyXG4gICAgICAgICAgICAgICRNb2RlbC5nZXQoJE1vZGVsLmdldEtleUZyb20ocmVjb3JkLnZhbHVlcykpLiRwcm9taXNlXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoJHJlY29yZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgJHJlY29yZC4kc2V0UmVtb3RlVmFsdWVzKHJlY29yZC52YWx1ZXMsIHJlY29yZC52ZXJzaW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmICgkcmVzdWx0W2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRyZXN1bHRbaV0gIT09ICRyZWNvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRbaV0uJGVtaXQoaWRiRXZlbnRzLk1PREVMX1VOUVVFUklFRCwgWyRyZXN1bHRdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgJHJlc3VsdFtpXSA9ICRyZWNvcmQ7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHJlc3VsdC5wdXNoKCRyZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAkcmVjb3JkLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9RVUVSSUVELCBbJHJlc3VsdF0pO1xyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gJHJlbW90ZVJlc3VsdDtcclxuXHJcbiAgICB9O1xyXG5cclxuICB9XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaWRiUXVlcnk7XG5mdW5jdGlvbiBpZGJRdWVyeSgkbG9nLCBpZGJVdGlscywgaWRiRXZlbnRzKSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGlkYlF1ZXJ5KCRkYiwgJE1vZGVsLCAkZmlsdGVycykge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgJ2Z1bmN0aW9uJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgIHZhciAkcmVzdWx0ID0gbnVsbDtcblxuICAgIC8vIEZ1bmNpb24gcXVlIGRldnVlbHZlIGVqZWN1dGEgZWwgcXVlcnkgeSBkZXZ1ZWx2ZSBlbCByZXN1bHRhZG8uXG4gICAgdGhpei5nZXRSZXN1bHQgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgLy8gRWplY3V0YXIgc2kgbm8gc2UgaGEgZWplY3V0YWRvXG4gICAgICBpZiAoISRyZXN1bHQpIHtcbiAgICAgICAgJHJlc3VsdCA9ICRkYi5maW5kKCRNb2RlbCwgJGZpbHRlcnMpO1xuXG4gICAgICAgICRyZXN1bHQuJHByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpei5nZXRSZW1vdGVSZXN1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkcmVzdWx0O1xuICAgIH07XG5cbiAgICAvLyBPYnRpZW5lIGVsIHJlc3VsdGFkbyBkZSB2YWxvcmVzIHJlbW90b3NcbiAgICB0aGl6LmdldFJlbW90ZVJlc3VsdCA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB2YXIgJHJlbW90ZSA9ICRNb2RlbC5nZXRSZW1vdGUoKTtcbiAgICAgIHZhciAkcmVtb3RlUmVzdWx0ID0gbnVsbDtcblxuICAgICAgaWYgKCRyZW1vdGUgJiYgdHlwZW9mICRyZW1vdGUuZmluZCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICgkcmVtb3RlUmVzdWx0ID0gJHJlbW90ZS5maW5kKCRmaWx0ZXJzLCBjYikuJHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdC5tYXAoZnVuY3Rpb24gKHJlY29yZCwgaSkge1xuICAgICAgICAgICAgJE1vZGVsLmdldCgkTW9kZWwuZ2V0S2V5RnJvbShyZWNvcmQudmFsdWVzKSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoJHJlY29yZCkge1xuXG4gICAgICAgICAgICAgICRyZWNvcmQuJHNldFJlbW90ZVZhbHVlcyhyZWNvcmQudmFsdWVzLCByZWNvcmQudmVyc2lvbik7XG5cbiAgICAgICAgICAgICAgaWYgKCRyZXN1bHRbaV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoJHJlc3VsdFtpXSAhPT0gJHJlY29yZCkge1xuICAgICAgICAgICAgICAgICAgJHJlc3VsdFtpXS4kZW1pdChpZGJFdmVudHMuTU9ERUxfVU5RVUVSSUVELCBbJHJlc3VsdF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkcmVzdWx0W2ldID0gJHJlY29yZDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkcmVzdWx0LnB1c2goJHJlY29yZCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAkcmVjb3JkLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9RVUVSSUVELCBbJHJlc3VsdF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJHJlbW90ZVJlc3VsdDtcbiAgICB9O1xuICB9O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYlF1ZXJ5LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiU29ja2V0U2VydmljZSgkbG9nLCBpbywgaWRiVXRpbHMpIHsgJ25nSW5qZWN0JzsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgXHJcbiAgbGV0ICRkZWZVcmxTZXJ2ZXIgPSBudWxsO1xyXG5cclxuICBmdW5jdGlvbiBpZGJTb2NrZXQgKCR1cmxTZXJ2ZXIsICRhY2Nlc3NUb2tlbklkLCAkY3VycmVudFVzZXJJZCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3N0cmluZycsICdudW1iZXInXSwgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcclxuXHJcbiAgICBjb25zdCAkbGlzdGVuZXJzID0gIFtdO1xyXG4gICAgbGV0ICRzb2NrZXQgPSBudWxsO1xyXG4gICAgJHVybFNlcnZlciA9ICR1cmxTZXJ2ZXIgfHwgJGRlZlVybFNlcnZlcjtcclxuXHJcbiAgICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXHJcbiAgICB0aGl6LmNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIFxyXG4gICAgICAvLyBDcmVhdGluZyBjb25uZWN0aW9uIHdpdGggc2VydmVyXHJcbiAgICAgICRzb2NrZXQgPSBpby5jb25uZWN0KCR1cmxTZXJ2ZXIpO1xyXG5cclxuICAgICAgLy8gVGhpcyBwYXJ0IGlzIG9ubHkgZm9yIGxvZ2luIHVzZXJzIGZvciBhdXRoZW50aWNhdGVkICRzb2NrZXQgY29ubmVjdGlvbiBiZXR3ZWVuIGNsaWVudCBhbmQgc2VydmVyLlxyXG4gICAgICAvLyBJZiB5b3UgYXJlIG5vdCB1c2luZyBsb2dpbiBwYWdlIGluIHlvdSB3ZWJzaXRlIHRoZW4geW91IHNob3VsZCByZW1vdmUgcmVzdCBwaWVjZSBvZiBjb2RlLi5cclxuXHJcbiAgICAgICRzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICRsb2cubG9nKCdjb25uZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgJHNvY2tldC5lbWl0KCdhdXRoZW50aWNhdGlvbicsIHtcclxuICAgICAgICAgIGlkOiAkYWNjZXNzVG9rZW5JZCxcclxuICAgICAgICAgIHVzZXJJZDogJGN1cnJlbnRVc2VySWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHNvY2tldC5vbignYXV0aGVudGljYXRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgLy8gdXNlIHRoZSAkc29ja2V0IGFzIHVzdWFsXHJcbiAgICAgICAgICAkbG9nLmxvZygnVXNlciBpcyBhdXRoZW50aWNhdGVkJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouc3Vic2NyaWJlID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICB2YXIgbmFtZSA9IG9wdGlvbnMubW9kZWxOYW1lICsgJy4nICsgb3B0aW9ucy5ldmVudE5hbWU7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMubW9kZWxJZCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBuYW1lID0gbmFtZSArICcuJyArIG9wdGlvbnMubW9kZWxJZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgJHNvY2tldC5vbihuYW1lLCBjYik7XHJcbiAgICAgIFxyXG4gICAgICAvL1B1c2ggdGhlIGNvbnRhaW5lci4uXHJcbiAgICAgICRsaXN0ZW5lcnMucHVzaChuYW1lLCBjYik7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnB1c2hMaXN0ZW5lciA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgJGxpc3RlbmVycy5wdXNoKHN1YnNjcmlwdGlvbk5hbWUpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhpei51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lKSB7XHJcbiAgICAgICRzb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzKHN1YnNjcmlwdGlvbk5hbWUpOyAgXHJcbiAgICAgIHZhciBpZHggPSAkbGlzdGVuZXJzLmluZGV4T2Yoc3Vic2NyaXB0aW9uTmFtZSk7XHJcbiAgICAgIGlmIChpZHggIT0gLTEpe1xyXG4gICAgICAgICRsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpei5jb25uZWN0KCk7XHJcblxyXG4gIH07XHJcblxyXG4gIC8vIEFzaWduYSBsYSBVUkwgZGUgc2Vydmlkb3IgcG9yIGRlZmVjdG9cclxuICBpZGJTb2NrZXQuc2V0VXJsU2VydmVyID0gZnVuY3Rpb24gKHVybFNlcnZlcikge1xyXG4gICAgJGRlZlVybFNlcnZlciA9IHVybFNlcnZlcjtcclxuICB9O1xyXG5cclxuICAvLyBBU2lnbmEgbGFzIGNyZWRlbmNpYWxlcyBwb3IgZGVmZWN0b1xyXG4gIGlkYlNvY2tldC5zZXRDcmVkZW50aWFscyA9IGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XHJcbiAgICBhY2Nlc3NUb2tlbklkID0gJGFjY2Vzc1Rva2VuSWRcclxuICAgIGN1cnJlbnRVc2VySWQgPSAkY3VycmVudFVzZXJJZDtcclxuICB9O1xyXG5cclxuICByZXR1cm4gaWRiU29ja2V0O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYlNvY2tldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYlNvY2tldFNlcnZpY2U7XG5mdW5jdGlvbiBpZGJTb2NrZXRTZXJ2aWNlKCRsb2csIGlvLCBpZGJVdGlscykge1xuICAnbmdJbmplY3QnO1xuICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgdmFyICRkZWZVcmxTZXJ2ZXIgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIGlkYlNvY2tldCgkdXJsU2VydmVyLCAkYWNjZXNzVG9rZW5JZCwgJGN1cnJlbnRVc2VySWQpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnc3RyaW5nJywgJ251bWJlciddLCBbJ3N0cmluZycsICdudW1iZXInXV0pO1xuXG4gICAgdmFyICRsaXN0ZW5lcnMgPSBbXTtcbiAgICB2YXIgJHNvY2tldCA9IG51bGw7XG4gICAgJHVybFNlcnZlciA9ICR1cmxTZXJ2ZXIgfHwgJGRlZlVybFNlcnZlcjtcblxuICAgIC8vIENvbmVjdGFyc2UgYWwgc2Vydmlkb3JcbiAgICB0aGl6LmNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIC8vIENyZWF0aW5nIGNvbm5lY3Rpb24gd2l0aCBzZXJ2ZXJcbiAgICAgICRzb2NrZXQgPSBpby5jb25uZWN0KCR1cmxTZXJ2ZXIpO1xuXG4gICAgICAvLyBUaGlzIHBhcnQgaXMgb25seSBmb3IgbG9naW4gdXNlcnMgZm9yIGF1dGhlbnRpY2F0ZWQgJHNvY2tldCBjb25uZWN0aW9uIGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIuXG4gICAgICAvLyBJZiB5b3UgYXJlIG5vdCB1c2luZyBsb2dpbiBwYWdlIGluIHlvdSB3ZWJzaXRlIHRoZW4geW91IHNob3VsZCByZW1vdmUgcmVzdCBwaWVjZSBvZiBjb2RlLi5cblxuICAgICAgJHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJGxvZy5sb2coJ2Nvbm5lY3RlZCcpO1xuXG4gICAgICAgICRzb2NrZXQuZW1pdCgnYXV0aGVudGljYXRpb24nLCB7XG4gICAgICAgICAgaWQ6ICRhY2Nlc3NUb2tlbklkLFxuICAgICAgICAgIHVzZXJJZDogJGN1cnJlbnRVc2VySWRcbiAgICAgICAgfSk7XG4gICAgICAgICRzb2NrZXQub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gdXNlIHRoZSAkc29ja2V0IGFzIHVzdWFsXG4gICAgICAgICAgJGxvZy5sb2coJ1VzZXIgaXMgYXV0aGVudGljYXRlZCcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGl6LnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdmFyIG5hbWUgPSBvcHRpb25zLm1vZGVsTmFtZSArICcuJyArIG9wdGlvbnMuZXZlbnROYW1lO1xuXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMubW9kZWxJZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUgKyAnLicgKyBvcHRpb25zLm1vZGVsSWQ7XG4gICAgICB9XG5cbiAgICAgICRzb2NrZXQub24obmFtZSwgY2IpO1xuXG4gICAgICAvL1B1c2ggdGhlIGNvbnRhaW5lci4uXG4gICAgICAkbGlzdGVuZXJzLnB1c2gobmFtZSwgY2IpO1xuICAgIH07XG5cbiAgICB0aGl6LnB1c2hMaXN0ZW5lciA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lLCBjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgJGxpc3RlbmVycy5wdXNoKHN1YnNjcmlwdGlvbk5hbWUpO1xuICAgIH07XG5cbiAgICB0aGl6LnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmlwdGlvbk5hbWUpIHtcbiAgICAgICRzb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzKHN1YnNjcmlwdGlvbk5hbWUpO1xuICAgICAgdmFyIGlkeCA9ICRsaXN0ZW5lcnMuaW5kZXhPZihzdWJzY3JpcHRpb25OYW1lKTtcbiAgICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgICAgJGxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpei5jb25uZWN0KCk7XG4gIH07XG5cbiAgLy8gQXNpZ25hIGxhIFVSTCBkZSBzZXJ2aWRvciBwb3IgZGVmZWN0b1xuICBpZGJTb2NrZXQuc2V0VXJsU2VydmVyID0gZnVuY3Rpb24gKHVybFNlcnZlcikge1xuICAgICRkZWZVcmxTZXJ2ZXIgPSB1cmxTZXJ2ZXI7XG4gIH07XG5cbiAgLy8gQVNpZ25hIGxhcyBjcmVkZW5jaWFsZXMgcG9yIGRlZmVjdG9cbiAgaWRiU29ja2V0LnNldENyZWRlbnRpYWxzID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIGN1cnJlbnRVc2VySWQpIHtcbiAgICBhY2Nlc3NUb2tlbklkID0gJGFjY2Vzc1Rva2VuSWQ7XG4gICAgY3VycmVudFVzZXJJZCA9ICRjdXJyZW50VXNlcklkO1xuICB9O1xuXG4gIHJldHVybiBpZGJTb2NrZXQ7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGIgKG1vZHVsZSkge1xyXG5cclxuICAvLyBEdnVlbHZlIGVsIGhvc3QgZGUgdW5hIFVSTFxyXG4gIGZ1bmN0aW9uIGdldEhvc3QodXJsKSB7XHJcbiAgICBjb25zdCBtID0gdXJsLm1hdGNoKC9eKD86aHR0cHM/Oik/XFwvXFwvKFteXFwvXSspLyk7XHJcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgbGV0IHVybEJhc2VIb3N0ID0gbG9jYXRpb24uaG9zdDtcclxuXHJcbiAgY29uc3QgbGJBdXRoID0gZnVuY3Rpb24oKSB7ICduZ0luamVjdCdcclxuICAgIGNvbnN0IHByb3BzID0gWydhY2Nlc3NUb2tlbklkJywgJ2N1cnJlbnRVc2VySWQnLCAncmVtZW1iZXJNZSddO1xyXG4gICAgY29uc3QgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xyXG4gICAgXHJcbiAgICAvLyBOb3RlOiBMb2NhbFN0b3JhZ2UgY29udmVydHMgdGhlIHZhbHVlIHRvIHN0cmluZ1xyXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxyXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAnJztcclxuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcclxuICAgICAgY29uc3Qga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xyXG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICB0aGl6W25hbWVdID0gbG9hZChuYW1lKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGl6LnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgc2F2ZShzdG9yYWdlLCBuYW1lLCB0aGl6W25hbWVdKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2V0VXNlciA9IGZ1bmN0aW9uKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IHVzZXJJZDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSB1c2VyRGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclVzZXIgPSBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IG51bGw7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IG51bGw7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclN0b3JhZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgc2F2ZShzZXNzaW9uU3RvcmFnZSwgbmFtZSwgbnVsbCk7XHJcbiAgICAgICAgc2F2ZShsb2NhbFN0b3JhZ2UsIG5hbWUsIG51bGwpO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBsYkF1dGgoKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24oJHEsIGxiQXV0aCkgeyAnbmdJbmplY3QnO1xyXG4gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbihjb25maWcpIHtcclxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV4dGVybmFsIHJlcXVlc3RzXHJcbiAgICAgICAgY29uc3QgaG9zdCA9IGdldEhvc3QoY29uZmlnLnVybCk7XHJcbiAgICAgICAgaWYgKGhvc3QgJiYgaG9zdCAhPT0gdXJsQmFzZUhvc3QpIHtcclxuICAgICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGJBdXRoLmFjY2Vzc1Rva2VuSWQpIHtcclxuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzW2F1dGhIZWFkZXJdID0gbGJBdXRoLmFjY2Vzc1Rva2VuSWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuX19pc0dldEN1cnJlbnRVc2VyX18pIHtcclxuICAgICAgICAgIC8vIFJldHVybiBhIHN0dWIgNDAxIGVycm9yIGZvciBVc2VyLmdldEN1cnJlbnQoKSB3aGVuXHJcbiAgICAgICAgICAvLyB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpblxyXG4gICAgICAgICAgY29uc3QgcmVzID0ge1xyXG4gICAgICAgICAgICBib2R5OiB7IGVycm9yOiB7IHN0YXR1czogNDAxIH19LFxyXG4gICAgICAgICAgICBzdGF0dXM6IDQwMSxcclxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICB9O1xyXG5cclxuICBjb25zdCBsYlJlc291cmNlID0gZnVuY3Rpb24oKSB7ICduZ0luamVjdCc7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHVybEJhc2U6IFwiL2FwaVwiLFxyXG4gICAgICBhdXRoSGVhZGVyOiAnYXV0aG9yaXphdGlvbicsXHJcbiAgICB9O1xyXG5cclxuICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXIgVGhlIGhlYWRlciBuYW1lIHRvIHVzZSwgZS5nLiBgWC1BY2Nlc3MtVG9rZW5gXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENvbmZpZ3VyZSB0aGUgUkVTVCB0cmFuc3BvcnQgdG8gdXNlIGEgZGlmZmVyZW50IGhlYWRlciBmb3Igc2VuZGluZ1xyXG4gICAgICogdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLiBJdCBpcyBzZW50IGluIHRoZSBgQXV0aG9yaXphdGlvbmAgaGVhZGVyXHJcbiAgICAgKiBieSBkZWZhdWx0LlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldEF1dGhIZWFkZXIgPSBmdW5jdGlvbihoZWFkZXIpIHtcclxuICAgICAgb3B0aW9ucy5hdXRoSGVhZGVyID0gaGVhZGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIGhlYWRlciBuYW1lIHRoYXQgaXMgdXNlZCBmb3Igc2VuZGluZyB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uXHJcbiAgICAgKi9cclxuICAgIHRoaXouZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHVzZSwgZS5nLiBgL2FwaWAgb3IgYC8vZXhhbXBsZS5jb20vYXBpYC5cclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ2hhbmdlIHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gQnkgZGVmYXVsdCwgdGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cclxuICAgIHRoaXouc2V0VXJsQmFzZSA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICBvcHRpb25zLnVybEJhc2UgPSB1cmw7XHJcbiAgICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIFRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldFVybEJhc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei4kZ2V0ID0gZnVuY3Rpb24oJHJlc291cmNlKSB7ICduZ0luamVjdCc7XHJcblxyXG4gICAgICBjb25zdCBsYlJlc291cmNlID0gZnVuY3Rpb24odXJsLCBwYXJhbXMsIGFjdGlvbnMpIHtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMoYWN0aW9ucykubWFwKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgIGFjdGlvbnNba2V5XS5vcmlnaW5hbFVybCA9IGFjdGlvbnNba2V5XS51cmw7XHJcbiAgICAgICAgICBhY3Rpb25zW2tleV0udXJsID0gb3B0aW9ucy51cmxCYXNlICsgYWN0aW9uc1trZXldLnVybDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzb3VyY2UgPSAkcmVzb3VyY2Uob3B0aW9ucy51cmxCYXNlICsgdXJsLCBwYXJhbXMsIGFjdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBBbmd1bGFyIGFsd2F5cyBjYWxscyBQT1NUIG9uICRzYXZlKClcclxuICAgICAgICAvLyBUaGlzIGhhY2sgaXMgYmFzZWQgb25cclxuICAgICAgICAvLyBodHRwOi8va2lya2J1c2hlbGwubWUvYW5ndWxhci1qcy11c2luZy1uZy1yZXNvdXJjZS1pbi1hLW1vcmUtcmVzdGZ1bC1tYW5uZXIvXHJcbiAgICAgICAgcmVzb3VyY2UucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24oc3VjY2VzcywgZXJyb3IpIHtcclxuICAgICAgICAgIC8vIEZvcnR1bmF0ZWx5LCBMb29wQmFjayBwcm92aWRlcyBhIGNvbnZlbmllbnQgYHVwc2VydGAgbWV0aG9kXHJcbiAgICAgICAgICAvLyB0aGF0IGV4YWN0bHkgZml0cyBvdXIgbmVlZHMuXHJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSByZXNvdXJjZS51cHNlcnQuY2FsbCh0aGlzLCB7fSwgdGhpcywgc3VjY2VzcywgZXJyb3IpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC4kcHJvbWlzZSB8fCByZXN1bHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2U7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsYlJlc291cmNlLmdldFVybEJhc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgICAgfTtcclxuICAgIFxyXG4gICAgICByZXR1cm4gbGJSZXNvdXJjZTtcclxuXHJcbiAgICB9O1xyXG5cclxuICB9XHJcblxyXG4gIHJldHVybiBtb2R1bGVcclxuICAgIC5mYWN0b3J5KCdsYkF1dGgnLCBsYkF1dGgpXHJcbiAgICAucHJvdmlkZXIoJ2xiUmVzb3VyY2UnLCBsYlJlc291cmNlKVxyXG4gICAgLmZhY3RvcnkoJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicsIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcilcclxuICAgIC5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24oJGh0dHBQcm92aWRlcikgeyAnbmdJbmplY3QnO1xyXG4gICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InKTtcclxuICAgIH1dKTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9sYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGxiO1xuZnVuY3Rpb24gbGIobW9kdWxlKSB7XG5cbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcbiAgZnVuY3Rpb24gZ2V0SG9zdCh1cmwpIHtcbiAgICB2YXIgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xuICAgIHJldHVybiBtID8gbVsxXSA6IG51bGw7XG4gIH1cblxuICB2YXIgdXJsQmFzZUhvc3QgPSBsb2NhdGlvbi5ob3N0O1xuXG4gIHZhciBsYkF1dGggPSBmdW5jdGlvbiBsYkF1dGgoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcbiAgICB2YXIgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xuXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcbiAgICAvLyBXZSBhcmUgdXNpbmcgZW1wdHkgc3RyaW5nIGFzIGEgbWFya2VyIGZvciBudWxsL3VuZGVmaW5lZCB2YWx1ZXMuXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XG4gICAgICAgIHN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWQobmFtZSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Vba2V5XSB8fCBzZXNzaW9uU3RvcmFnZVtrZXldIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXpbbmFtZV0gPSBsb2FkKG5hbWUpO1xuICAgICAgfSk7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdmFyIHN0b3JhZ2UgPSB0aGl6LnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzdG9yYWdlLCBuYW1lLCB0aGl6W25hbWVdKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgdXNlcklkLCB1c2VyRGF0YSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IHVzZXJJZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gbnVsbDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBzYXZlKHNlc3Npb25TdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgICAgc2F2ZShsb2NhbFN0b3JhZ2UsIG5hbWUsIG51bGwpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XG4gIH07XG5cbiAgdmFyIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcigkcSwgbGJBdXRoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHJldHVybiB7XG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV4dGVybmFsIHJlcXVlc3RzXG4gICAgICAgIHZhciBob3N0ID0gZ2V0SG9zdChjb25maWcudXJsKTtcbiAgICAgICAgaWYgKGhvc3QgJiYgaG9zdCAhPT0gdXJsQmFzZUhvc3QpIHtcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XG4gICAgICAgICAgY29uZmlnLmhlYWRlcnNbYXV0aEhlYWRlcl0gPSBsYkF1dGguYWNjZXNzVG9rZW5JZDtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuX19pc0dldEN1cnJlbnRVc2VyX18pIHtcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxuICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIHVzZXIgbG9nZ2VkIGluXG4gICAgICAgICAgdmFyIHJlcyA9IHtcbiAgICAgICAgICAgIGJvZHk6IHsgZXJyb3I6IHsgc3RhdHVzOiA0MDEgfSB9LFxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXG4gICAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGZ1bmN0aW9uIGhlYWRlcnMoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICB2YXIgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uIGxiUmVzb3VyY2UoKSB7XG4gICAgJ25nSW5qZWN0JztcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHVybEJhc2U6IFwiL2FwaVwiLFxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nXG4gICAgfTtcblxuICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlciBUaGUgaGVhZGVyIG5hbWUgdG8gdXNlLCBlLmcuIGBYLUFjY2Vzcy1Ub2tlbmBcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ29uZmlndXJlIHRoZSBSRVNUIHRyYW5zcG9ydCB0byB1c2UgYSBkaWZmZXJlbnQgaGVhZGVyIGZvciBzZW5kaW5nXHJcbiAgICAgKiB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uIEl0IGlzIHNlbnQgaW4gdGhlIGBBdXRob3JpemF0aW9uYCBoZWFkZXJcclxuICAgICAqIGJ5IGRlZmF1bHQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoaGVhZGVyKSB7XG4gICAgICBvcHRpb25zLmF1dGhIZWFkZXIgPSBoZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgaGVhZGVyIG5hbWUgdGhhdCBpcyB1c2VkIGZvciBzZW5kaW5nIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdXNlLCBlLmcuIGAvYXBpYCBvciBgLy9leGFtcGxlLmNvbS9hcGlgLlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDaGFuZ2UgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBCeSBkZWZhdWx0LCB0aGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouc2V0VXJsQmFzZSA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgIG9wdGlvbnMudXJsQmFzZSA9IHVybDtcbiAgICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIFRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICB9O1xuXG4gICAgdGhpei4kZ2V0ID0gZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xuICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoYWN0aW9ucykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICAgIGFjdGlvbnNba2V5XS51cmwgPSBvcHRpb25zLnVybEJhc2UgKyBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSAkcmVzb3VyY2Uob3B0aW9ucy51cmxCYXNlICsgdXJsLCBwYXJhbXMsIGFjdGlvbnMpO1xuXG4gICAgICAgIC8vIEFuZ3VsYXIgYWx3YXlzIGNhbGxzIFBPU1Qgb24gJHNhdmUoKVxuICAgICAgICAvLyBUaGlzIGhhY2sgaXMgYmFzZWQgb25cbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xuICAgICAgICByZXNvdXJjZS5wcm90b3R5cGUuJHNhdmUgPSBmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxuICAgICAgICAgIC8vIHRoYXQgZXhhY3RseSBmaXRzIG91ciBuZWVkcy5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LiRwcm9taXNlIHx8IHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gbW9kdWxlLmZhY3RvcnkoJ2xiQXV0aCcsIGxiQXV0aCkucHJvdmlkZXIoJ2xiUmVzb3VyY2UnLCBsYlJlc291cmNlKS5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpLmNvbmZpZyhbJyRodHRwUHJvdmlkZXInLCBmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InKTtcbiAgfV0pO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2xiLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==