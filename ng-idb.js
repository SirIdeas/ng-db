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
	
	  qsClass.all = function (arr) {
	    var defered = qsClass.defer();
	
	    var promises = keys.length;
	    var keys = Object.keys(arr);
	    var results = arr.length ? [] : {};
	
	    keys.map(function (idx) {
	
	      arr[idx].then(function (result) {
	        promises--;
	        results[idx] = result;
	        if (!promises) {
	          defered.resolve(results);
	        }
	      });
	
	      arr[idx].catch(function (err) {
	        defered.reject(err);
	      });
	    });
	
	    return defered;
	  };
	
	  return qsClass;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	// Funcion para el servicio de la BD
	
	idbService.$inject = ["$log", "qs", "idbUtils", "idbEvents", "idbModel"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = idbService;
	function idbService($log, qs, idbUtils, idbEvents, idbModel) {
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
	
	    // Obtiene un elemento por su key
	    thiz.get = function (modelName, key) {
	      idbUtils.validate(arguments, ['string', ['string', 'number']]);
	
	      var defered = qs.defer();
	
	      // Se crea una transaccion
	      thiz.transaction(modelName, 'readonly', function (tx) {
	        var rq = tx.objectStore(modelName).get(key);
	
	        // Transaccion completada satisfatoriamente
	        rq.onsuccess = function (event) {
	          defered.resolve(rq.result, event);
	        };
	
	        // Se generó un error en la transacción
	        rq.onerror = function (event) {
	          // Could call rq.preventDefault() to prevent the transaction from aborting.
	          defered.reject(event);
	        };
	      });
	
	      return defered;
	    };
	
	    // Inserta un registro en el modelo
	    thiz.put = function (modelName, values) {
	      idbUtils.validate(arguments, ['string', 'object']);
	
	      var defered = qs.defer();
	
	      // Se crea una transaccion
	      thiz.transaction(modelName, 'readwrite', function (tx) {
	        var rq = tx.objectStore(modelName).put(values);
	
	        // Transaccion completada satisfatoriamente
	        rq.onsuccess = function (event) {
	          defered.resolve(event);
	        };
	
	        // Se generó un error en la transacción
	        rq.onerror = function (event) {
	          // Could call rq.preventDefault() to prevent the transaction from aborting.
	          defered.reject(event);
	        };
	      });
	
	      return defered;
	    };
	
	    // Elimina un objeto por su key
	    thiz.delete = function (modelName, key) {
	      idbUtils.validate(arguments, ['string', ['string', 'number']]);
	
	      var defered = qs.defer();
	
	      // Se crea una transaccion
	      thiz.transaction(modelName, 'readwrite', function (tx) {
	        var rq = tx.objectStore(modelName).delete(key);
	
	        // Transaccion completada satisfatoriamente
	        rq.onsuccess = function (event) {
	          defered.resolve(event);
	        };
	
	        // Se generó un error en la transacción
	        rq.onerror = function (event) {
	          // Could call rq.preventDefault() to prevent the transaction from aborting.
	          defered.reject(event);
	        };
	      });
	
	      return defered;
	    };
	    // Buscar en el modelo
	    thiz.openCursor = function (modelName, filters, eachCb) {
	      idbUtils.validate(arguments, ['string', ['object', 'undefined'], 'function']);
	      var defered = qs.defer();
	
	      // Se crea una transaccion
	      thiz.transaction(modelName, 'readonly', function (tx) {
	        var rq = tx.objectStore(modelName).openCursor();
	
	        rq.onsuccess = function () {
	          var cursor = rq.result;
	
	          // No more matching records.
	          if (cursor) {
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
	
	idbModelService.$inject = ["$log", "qs", "idbUtils", "idbQuery", "idbEvents", "lbResource", "$timeout"];
	Object.defineProperty(exports, "__esModule", {
	      value: true
	});
	exports.default = idbModelService;
	function idbModelService($log, qs, idbUtils, idbQuery, idbEvents, lbResource, $timeout) {
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
	
	      // Obtiene el valor pa una propieda de un objeto
	      var getFieldValue = function getFieldValue(obj, field) {
	            return searchDeepField(obj, field, function (obj, lastField) {
	                  return obj[lastField];
	            });
	      };
	
	      // Obtiene el valor pa una propieda de un objeto
	      var setFieldValue = function setFieldValue(obj, field, value) {
	            searchDeepField(obj, field, function (obj, lastField) {
	                  obj[lastField] = value;
	            });
	            return obj;
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
	
	                  thiz.$resolved = false;
	
	                  thiz.$loaded = false;
	                  thiz.$localLoaded = false;
	                  thiz.$remoteLoaded = false;
	
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
	
	            // Devuelve el valor correspondiente al key de un objeto
	            Model.getKeyFrom = function (data) {
	                  return getFieldValue(data, $id.keyPath);
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
	
	                  var defered = qs.defer();
	                  var instance = Model.getInstance(key);
	
	                  if (instance.$localLoaded) return instance;
	
	                  instance.$resolved = false;
	                  instance.$promise = defered.promise;
	
	                  $db.get($modelName, key).promise.then(function (data) {
	
	                        Model.getVersionOf(key).promise.then(function (version) {
	                              instance.$setLocalValues(data, version ? version.hash : undefined);
	                              instance.$resolved = true;
	                              defered.resolve(instance);
	                        }).catch(function (err) {
	                              defered.reject(err);
	                              $log.error(['Model.getVersionOf any error', err]);
	                        });
	                  }).catch(function (err) {
	                        defered.reject(err);
	                  });
	
	                  return instance;
	            };
	
	            // Buscar en el modelo
	            Model.find = function (filters) {
	
	                  return new idbQuery($db, Model, filters);;
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
	
	                        return record.$pull();
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
	                        $versioning = $db.model(modelName).autoIncrement(false).keyPath($id.keyPath).fields({
	                              "hash": { "type": "string", "required": true }
	                        });
	                  }
	
	                  if (cb) cb($versioning);
	
	                  return Model;
	            };
	
	            // Devuelve la instancia de la version local del registro
	            Model.getVersionOf = function (key) {
	
	                  var defered = qs.defer();
	
	                  if ($versioning) {
	                        $versioning.get(key).$promise.then(function (version) {
	                              defered.resolve(version);
	                        }).catch(function () {
	                              defered.reject(null);
	                        });
	                  } else {
	                        defered.resolve(null);
	                  }
	
	                  return defered;
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
	
	                  return getFieldValue(this, field);
	            };
	
	            // Asigna in valor a un campo
	            Model.prototype.$set = function (field, value) {
	
	                  return getFieldValue(this, field, value);
	            };
	
	            // Devuelve un objeto con las propiedades del registro
	            Model.prototype.$getValues = function (data) {
	                  idbUtils.validate(arguments, [['object', 'undefined']]);
	
	                  var values = {};
	                  data = data || this;
	
	                  Object.keys($fields).map(function (field) {
	                        setFieldValue(values, field, getFieldValue(data, field));
	                  });
	
	                  return values;
	            };
	
	            // Devuelve un objeto con las propiedades locales del registro
	            Model.prototype.$getLocalValues = function () {
	
	                  return this.$getValues(this.$localValues);
	            };
	
	            // Devuelve un modelo con las propiedades remotas del registro
	            Model.prototype.$getRemoteValues = function () {
	
	                  return this.$getValues(this.$remoteValues);
	            };
	
	            // Asigna las propiedades del registro
	            Model.prototype.$setValues = function (data, version) {
	                  var thiz = this;
	                  idbUtils.validate(arguments, ['object', ['string', 'undefined']]);
	
	                  thiz.$version = version;
	
	                  Object.keys(data).map(function (field) {
	                        setFieldValue(thiz, field, data[field]);
	                  });
	
	                  thiz.$loaded = true;
	
	                  return thiz;
	            };
	
	            // Asigna las propiedades locales del registro
	            Model.prototype.$setLocalValues = function (data, version) {
	                  var thiz = this;
	                  idbUtils.validate(arguments, [['object', 'undefined'], ['string', 'undefined']]);
	
	                  thiz.$localVersion = version;
	
	                  Object.keys(data || {}).map(function (field) {
	                        setFieldValue(thiz.$localValues, field, data[field]);
	                  });
	
	                  if (!thiz.$loaded && data) {
	                        thiz.$setValues(data, version);
	                  }
	
	                  return thiz;
	            };
	
	            // Asigna las propiedades remotas del registro
	            Model.prototype.$setRemoteValues = function (data, version) {
	                  var thiz = this;
	                  idbUtils.validate(arguments, [['object', 'undefined'], ['string', 'undefined']]);
	
	                  thiz.$remoteVersion = version;
	
	                  Object.keys(data || {}).map(function (field) {
	                        setFieldValue(thiz.$remoteValues, field, data[field]);
	                  });
	
	                  if (!thiz.$loaded && data) {
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
	
	            // Guarda los datos del objeto
	            Model.prototype.$pull = function (newValues, version) {
	                  var thiz = this;
	                  idbUtils.validate(arguments, [['object', 'undefined'], ['string', 'undefined']]);
	
	                  var defered = qs.defer();
	
	                  if (newValues) {
	                        newValues = thiz.$getValues(newValues);
	                  } else {
	                        newValues = thiz.$getRemoteValues();
	                  }
	
	                  var newKey = Model.getKeyFrom(newValues);
	                  var oldValues = thiz.$getLocalValues();
	                  var oldKey = Model.getKeyFrom(oldValues);
	
	                  console.log(newKey, oldKey);
	                  console.log(newValues, oldValues);
	
	                  // if (oldKey !== newKey) {
	
	                  //   if (oldKey && newKey){
	                  //     Model.get(oldKey).$promise.then(function (oldInstance) {
	                  //       Model.get(newKey).$promise.then(function (newInstance) {
	
	                  //       });
	                  //     });
	                  //   }
	
	                  // }
	
	                  return defered;
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
	
	idbQuery.$inject = ["$log", "qs", "idbUtils", "idbEvents"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = idbQuery;
	function idbQuery($log, qs, idbUtils, idbEvents) {
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
	        (function () {
	
	          var defered = qs.defer();
	          $result = [];
	          $result.$resolved = false;
	          $result.$promise = defered.promise;
	
	          $db.openCursor($Model.getModelName(), $filters, function (data, next) {
	
	            var key = $Model.getKeyFrom(data);
	
	            // Obtener la instancia
	            var instance = $Model.getInstance(key);
	
	            $Model.getVersionOf(key).promise.then(function (version) {
	
	              instance.$setLocalValues(data, version ? version.hash : undefined);
	              instance.$resolved = true;
	              instance.$emit(idbEvents.MODEL_QUERIED, thiz);
	
	              // Agregar al resultado
	              $result.push(instance);
	
	              // Buscar siguiente
	              next();
	            }).catch(function (err) {
	
	              defered.reject(err);
	              $log.error(['Model.getVersionOf any error', err]);
	            });
	          }).promise.then(function () {
	
	            $result.$resolved = true;
	            defered.resolve($result);
	            thiz.getRemoteResult();
	          }).catch(function (err) {
	
	            defered.reject(err);
	          });
	        })();
	      }
	
	      return $result;
	    };
	
	    // Obtiene el resultado de valores remotos
	    thiz.getRemoteResult = function () {
	      idbUtils.validate(arguments, [['function', 'undefined']]);
	
	      var $remote = $Model.getRemote();
	      var $remoteResult = null;
	
	      if ($remote && typeof $remote.find == 'function') {
	        ($remoteResult = $remote.find($filters).$promise).then(function (result) {
	          result.map(function (record, i) {
	
	            $Model.get($Model.getKeyFrom(record.values)).$promise.then(function ($record) {
	
	              $record.$setRemoteValues(record.values, record.version);
	
	              if ($result[i]) {
	                if ($result[i] !== $record) {
	                  $result[i].$emit(idbEvents.MODEL_UNQUERIED, [thiz]);
	                }
	                $result[i] = $record;
	              } else {
	                $result.push($record);
	              }
	
	              $record.$emit(idbEvents.MODEL_QUERIED, [thiz]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGFhOTk0OGU4OTVmYzUyM2VlMWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiVXRpbHMuanM/MWJiNCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJFdmVudHMuanM/NDg2YSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3FzLmpzPzY0MzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiLmpzPzYzNTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qcz9mOWY5Iiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanM/Zjc3YSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJTb2NrZXQuanM/ZDFhMSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvbGIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2xiLmpzPzMwMDYiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnN0YW50IiwiaW8iLCJzZXJ2aWNlIiwiaWRiVXRpbHMiLCIkcSIsInZhbGlkYXRvcnMiLCJjYWxsYmFjayIsInZhbHVlIiwidW5kZWZpbmVkIiwiYXJyYXkiLCJBcnJheSIsImlzQXJyYXkiLCJ2YWxpZCIsInR5cGVzIiwiaSIsInR5cGUiLCJhcmdzIiwidmFsaWRhdGUiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJlcnIiLCJFcnJvciIsIm5hbWUiLCJpZGJFdmVudHMiLCJEQl9FUlJPUiIsIk1PREVMX0lOU1RBTkNFRCIsIk1PREVMX1FVRVJJRUQiLCJNT0RFTF9VTlFVRVJJRUQiLCJxcyIsInFzQ2xhc3MiLCJjYiIsInRoaXoiLCJ0aGVucyIsInRoZW5zUmVhZHkiLCJjYXRjaHMiLCJjYXRjaHNSZWFkeSIsInJlc3VsdEFyZ3MiLCJlcnJvciIsInByb21pc2UiLCIkcmVzb2x2ZWQiLCJ0aGVuc1Jlc29sdmVkIiwibGVuZ3RoIiwic2hpZnQiLCJhcHBseSIsInB1c2giLCJjYXRjaHNSZXNvbHZlZCIsInJlc29sdmUiLCJhcmd1bWVudHMiLCJyZWplY3QiLCJ0aGVuIiwiY2F0Y2giLCJkb25lIiwiY29uY2F0IiwiZGVmZXIiLCJhbGwiLCJhcnIiLCJkZWZlcmVkIiwicHJvbWlzZXMiLCJrZXlzIiwiT2JqZWN0IiwicmVzdWx0cyIsIm1hcCIsImlkeCIsInJlc3VsdCIsImlkYlNlcnZpY2UiLCIkbG9nIiwiaWRiTW9kZWwiLCJpbmRleGVkREIiLCJ3aW5kb3ciLCJtb3pJbmRleGVkREIiLCJ3ZWJraXRJbmRleGVkREIiLCJtc0luZGV4ZWREQiIsIklEQlRyYW5zYWN0aW9uIiwid2Via2l0SURCVHJhbnNhY3Rpb24iLCJtc0lEQlRyYW5zYWN0aW9uIiwiSURCS2V5UmFuZ2UiLCJ3ZWJraXRJREJLZXlSYW5nZSIsIm1zSURCS2V5UmFuZ2UiLCJhbGVydCIsImlkYiIsIiRkYk5hbWUiLCIkZGJWZXJzaW9uIiwiJHNvY2tldCIsIiRldmVudHNDYWxsYmFja3MiLCIkdXBncmFkZU5lZWRlZERlZmVyZWQiLCIkb3BlbkRlZmVyZWQiLCIkc29ja2V0Q29ubmVjdGVkRGVmZXJlZCIsIiRvcGVuZWQiLCIkcmVxdWVzdCIsIm1vZGVscyIsImJpbmQiLCJldmVudE5hbWUiLCJ1bmJpbmQiLCJpbmRleE9mIiwic3BsaWNlIiwidHJpZ2dlciIsImxvZyIsIm9wZW4iLCJyZWFkeSIsInJxIiwib251cGdyYWRlbmVlZGVkIiwiZXZlbnQiLCJvbnN1Y2Nlc3MiLCJvbmVycm9yIiwidGFyZ2V0IiwiZXJyb3JDb2RlIiwiZGVsZXRlRGF0YWJhc2UiLCJtb2RlbCIsInNvY2tldCIsImNyZWF0ZVN0b3JlIiwibW9kZWxOYW1lIiwibW9kZWxJZCIsImNyZWF0ZU9iamVjdFN0b3JlIiwiY3JlYXRlSW5kZXgiLCJpbmRleE5hbWUiLCJmaWVsZE5hbWUiLCJvcHRzIiwidHJhbnNhY3Rpb24iLCJvYmplY3RTdG9yZSIsInBlcm1zIiwiYWN0aW9uIiwidHgiLCJvbmNvbXBsZXRlIiwib25hYm9ydCIsImdldCIsImtleSIsInB1dCIsInZhbHVlcyIsImRlbGV0ZSIsIm9wZW5DdXJzb3IiLCJmaWx0ZXJzIiwiZWFjaENiIiwiY3Vyc29yIiwiY29udGludWUiLCJkZWZlcmVkcyIsIm9uT3BlbiIsIm9uVXBncmFkZU5lZWRlZCIsIm9uU29ja2V0Q29ubmVjdGVkIiwidGV4dCIsImlkYk1vZGVsU2VydmljZSIsImlkYlF1ZXJ5IiwibGJSZXNvdXJjZSIsIiR0aW1lb3V0Iiwic2VhcmNoRGVlcEZpZWxkIiwib2JqIiwiZmllbGQiLCJmaWVsZHMiLCJzcGxpdCIsImxhc3RGaWVsZCIsInBvcCIsIl9zZXQiLCJnZXRGaWVsZFZhbHVlIiwic2V0RmllbGRWYWx1ZSIsIiRkYiIsIiRtb2RlbE5hbWUiLCIkaWQiLCJrZXlQYXRoIiwiYXV0b0luY3JlbWVudCIsIiRldmVudHNIYW5kbGVycyIsIiRpbnN0YW5jZXMiLCIkZmllbGRzIiwiJHJlbW90ZSIsIiR2ZXJzaW9uaW5nIiwiTW9kZWwiLCJkYXRhIiwiJGxvYWRlZCIsIiRsb2NhbExvYWRlZCIsIiRyZW1vdGVMb2FkZWQiLCIkbG9jYWxWYWx1ZXMiLCIkcmVtb3RlVmFsdWVzIiwiJHZlcnNpb24iLCIkbG9jYWxWZXJzaW9uIiwiJHJlbW90ZVZlcnNpb24iLCIkc2V0VmFsdWVzIiwiJGNvbnN0cnVjdG9yIiwiJGxpc3RlbiIsIiRxdWVyaWVzIiwiJGJpbmQiLCJxdWVyeSIsIiRlbWl0IiwiZ2V0TW9kZWxOYW1lIiwiZ2V0S2V5UGF0aCIsImluZGV4IiwiYnVpbGQiLCJidWlsZENhbGxiYWNrIiwicmVtb3RlIiwidXJsIiwiYWN0aW9ucyIsImdldFJlbW90ZSIsImdldEtleUZyb20iLCJnZXRJbnN0YW5jZSIsImluc3RhbmNlIiwiJHByb21pc2UiLCJnZXRWZXJzaW9uT2YiLCJ2ZXJzaW9uIiwiJHNldExvY2FsVmFsdWVzIiwiaGFzaCIsImZpbmQiLCJjcmVhdGUiLCJyZWNvcmQiLCIkcHVsbCIsIml0ZXJhdGlvbiIsInZlcnNpb25pbmciLCJoYW5kbGVyIiwiZW1pdCIsIiRnZXQiLCIkc2V0IiwiJGdldFZhbHVlcyIsIiRnZXRMb2NhbFZhbHVlcyIsIiRnZXRSZW1vdGVWYWx1ZXMiLCIkc2V0UmVtb3RlVmFsdWVzIiwiJHNldEtleSIsIm5ld0tleSIsIm9sZEtleSIsIiRpc1N0b3JlZCIsIm5ld1ZhbHVlcyIsIm9sZFZhbHVlcyIsImNvbnNvbGUiLCJzdWJzY3JpYmUiLCIkTW9kZWwiLCIkZmlsdGVycyIsIiRyZXN1bHQiLCJnZXRSZXN1bHQiLCJuZXh0IiwiZ2V0UmVtb3RlUmVzdWx0IiwiJHJlbW90ZVJlc3VsdCIsIiRyZWNvcmQiLCJpZGJTb2NrZXRTZXJ2aWNlIiwiJGRlZlVybFNlcnZlciIsImlkYlNvY2tldCIsIiR1cmxTZXJ2ZXIiLCIkYWNjZXNzVG9rZW5JZCIsIiRjdXJyZW50VXNlcklkIiwiJGxpc3RlbmVycyIsImNvbm5lY3QiLCJvbiIsImlkIiwidXNlcklkIiwib3B0aW9ucyIsInB1c2hMaXN0ZW5lciIsInN1YnNjcmlwdGlvbk5hbWUiLCJ1bnN1YnNjcmliZSIsInJlbW92ZUFsbExpc3RlbmVycyIsInNldFVybFNlcnZlciIsInVybFNlcnZlciIsInNldENyZWRlbnRpYWxzIiwiYWNjZXNzVG9rZW5JZCIsImN1cnJlbnRVc2VySWQiLCJsYiIsImdldEhvc3QiLCJtIiwibWF0Y2giLCJ1cmxCYXNlSG9zdCIsImxvY2F0aW9uIiwiaG9zdCIsImxiQXV0aCIsInByb3BzIiwicHJvcHNQcmVmaXgiLCJzYXZlIiwic3RvcmFnZSIsImxvYWQiLCJsb2NhbFN0b3JhZ2UiLCJzZXNzaW9uU3RvcmFnZSIsImZvckVhY2giLCJjdXJyZW50VXNlckRhdGEiLCJyZW1lbWJlck1lIiwic2V0VXNlciIsInVzZXJEYXRhIiwiY2xlYXJVc2VyIiwiY2xlYXJTdG9yYWdlIiwibGJBdXRoUmVxdWVzdEludGVyY2VwdG9yIiwicmVxdWVzdCIsImNvbmZpZyIsImhlYWRlcnMiLCJhdXRoSGVhZGVyIiwiX19pc0dldEN1cnJlbnRVc2VyX18iLCJyZXMiLCJib2R5Iiwic3RhdHVzIiwid2hlbiIsInVybEJhc2UiLCJzZXRBdXRoSGVhZGVyIiwiaGVhZGVyIiwiZ2V0QXV0aEhlYWRlciIsInNldFVybEJhc2UiLCJnZXRVcmxCYXNlIiwiJHJlc291cmNlIiwicGFyYW1zIiwib3JpZ2luYWxVcmwiLCJyZXNvdXJjZSIsIiRzYXZlIiwic3VjY2VzcyIsInVwc2VydCIsImZhY3RvcnkiLCJwcm92aWRlciIsIiRodHRwUHJvdmlkZXIiLCJpbnRlcmNlcHRvcnMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBOztBQ0VBLEtBQUksYUFBYSx1QkFBdUI7O0FERHhDOztBQ0tBLEtBQUksY0FBYyx1QkFBdUI7O0FESnpDOztBQ1FBLEtBQUksT0FBTyx1QkFBdUI7O0FETmxDOztBQ1VBLEtBQUksUUFBUSx1QkFBdUI7O0FEVG5DOztBQ2FBLEtBQUksYUFBYSx1QkFBdUI7O0FEWnhDOztBQ2dCQSxLQUFJ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Ty9JLE9BQ0p1UyxRQUFRLFVBQVV0QyxRQUNsQnVDLFNBQVMsY0FBY3pKLFlBQ3ZCd0osUUFBUSw0QkFBNEJ2QiwwQkFDcENFLE9BQU8sQ0FBQyxpQkFBaUIsVUFBU3VCLGVBQWU7S0FBRTs7S0FDbERBLGNBQWNDLGFBQWE1UCxLQUFLIiwiZmlsZSI6Im5nLWlkYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZGFhOTk0OGU4OTVmYzUyM2VlMWFcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgaWRiVXRpbHMgZnJvbSAnLi91dGlscy9pZGJVdGlscyc7XHJcbmltcG9ydCBpZGJFdmVudHMgZnJvbSAnLi91dGlscy9pZGJFdmVudHMnO1xyXG5pbXBvcnQgcXMgZnJvbSAnLi91dGlscy9xcyc7XHJcblxyXG5pbXBvcnQgaWRiIGZyb20gJy4vc2VydmljZXMvaWRiJztcclxuaW1wb3J0IGlkYk1vZGVsIGZyb20gJy4vc2VydmljZXMvaWRiTW9kZWwnO1xyXG5pbXBvcnQgaWRiUXVlcnkgZnJvbSAnLi9zZXJ2aWNlcy9pZGJRdWVyeSc7XHJcbmltcG9ydCBpZGJTb2NrZXQgZnJvbSAnLi9zZXJ2aWNlcy9pZGJTb2NrZXQnO1xyXG5cclxuaW1wb3J0IGxiIGZyb20gJy4vc2VydmljZXMvbGInO1xyXG5cclxubGIoYW5ndWxhci5tb2R1bGUoJ25nLmlkYicsIFtdKSlcclxuICAuY29uc3RhbnQoJ2lvJywgaW8pXHJcbiAgXHJcbiAgLmNvbnN0YW50KCdpZGJWZXJzaW9uJywgJzAuMC4xJylcclxuICAuc2VydmljZSgnaWRiRXZlbnRzJywgaWRiRXZlbnRzKVxyXG4gIC5zZXJ2aWNlKCdpZGJVdGlscycsIGlkYlV0aWxzKVxyXG4gIC5zZXJ2aWNlKCdxcycsIHFzKVxyXG5cclxuICAvLyBUYWtlIG9mIGxiLXNlcnZpY2VzLmpzXHJcbiAgLnNlcnZpY2UoJ2lkYicsIGlkYilcclxuICAuc2VydmljZSgnaWRiTW9kZWwnLCBpZGJNb2RlbClcclxuICAuc2VydmljZSgnaWRiUXVlcnknLCBpZGJRdWVyeSlcclxuICAuc2VydmljZSgnaWRiU29ja2V0JywgaWRiU29ja2V0KVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9pZGJVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMvaWRiVXRpbHMnKTtcblxudmFyIF9pZGJVdGlsczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJVdGlscyk7XG5cbnZhciBfaWRiRXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9pZGJFdmVudHMnKTtcblxudmFyIF9pZGJFdmVudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiRXZlbnRzKTtcblxudmFyIF9xcyA9IHJlcXVpcmUoJy4vdXRpbHMvcXMnKTtcblxudmFyIF9xczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9xcyk7XG5cbnZhciBfaWRiID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGInKTtcblxudmFyIF9pZGIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiKTtcblxudmFyIF9pZGJNb2RlbCA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiTW9kZWwnKTtcblxudmFyIF9pZGJNb2RlbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJNb2RlbCk7XG5cbnZhciBfaWRiUXVlcnkgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYlF1ZXJ5Jyk7XG5cbnZhciBfaWRiUXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiUXVlcnkpO1xuXG52YXIgX2lkYlNvY2tldCA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiU29ja2V0Jyk7XG5cbnZhciBfaWRiU29ja2V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlNvY2tldCk7XG5cbnZhciBfbGIgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2xiJyk7XG5cbnZhciBfbGIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4oMCwgX2xiMi5kZWZhdWx0KShhbmd1bGFyLm1vZHVsZSgnbmcuaWRiJywgW10pKS5jb25zdGFudCgnaW8nLCBpbykuY29uc3RhbnQoJ2lkYlZlcnNpb24nLCAnMC4wLjEnKS5zZXJ2aWNlKCdpZGJFdmVudHMnLCBfaWRiRXZlbnRzMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJVdGlscycsIF9pZGJVdGlsczIuZGVmYXVsdCkuc2VydmljZSgncXMnLCBfcXMyLmRlZmF1bHQpXG5cbi8vIFRha2Ugb2YgbGItc2VydmljZXMuanNcbi5zZXJ2aWNlKCdpZGInLCBfaWRiMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJNb2RlbCcsIF9pZGJNb2RlbDIuZGVmYXVsdCkuc2VydmljZSgnaWRiUXVlcnknLCBfaWRiUXVlcnkyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlNvY2tldCcsIF9pZGJTb2NrZXQyLmRlZmF1bHQpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiVXRpbHMgKCRxKSB7ICduZ0luamVjdCdcclxuICBcclxuICBjb25zdCB2YWxpZGF0b3JzID0ge1xyXG4gICAgLy8gRnVuY2lvbiBwYXJhIGRldGVybWluYXIgc2kgZXMgdW4gY2FsbGJhY2sgdsOhbGlkbyBvIG5vXHJcbiAgICBjYWxsYmFjazogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJyB8fCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09IHVuZGVmaW5lZDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gVmVyaWZpY2Egc2kgdW4gdmFsb3IgZXMgdW4gYXJyYXlcclxuICAgIGFycmF5OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgfSAgXHJcblxyXG4gIC8vIEdlbmVyYSB1biBlcnJvciBzaSBlbCB2YWxvciBubyBlcyBkZWwgdGlwbyBpbmRpY2FkbyBwb3IgcGFyYW1ldHJvXHJcbiAgZnVuY3Rpb24gdmFsaWQgKHZhbHVlLCB0eXBlcykge1xyXG4gICAgaWYgKCF2YWxpZGF0b3JzLmFycmF5KHR5cGVzKSkgdHlwZXMgPSBbdHlwZXNdO1xyXG5cclxuICAgIGZvcihsZXQgaSBpbiB0eXBlcyl7XHJcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlc1tpXTtcclxuICAgICAgaWYgKHR5cGVvZiB0eXBlID09ICdzdHJpbmcnKXtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbGlkYXRvcnNbdHlwZV0gPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgaWYgKHZhbGlkYXRvcnNbdHlwZV0odmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09IHR5cGUpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdHlwZSA9PSAnZnVuY3Rpb24nKXtcclxuICAgICAgICBpZih0eXBlKGFyZ3NbaV0pKXtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgfVxyXG5cclxuICAvLyBWYWxpZGEgdW4gYXJyYXkgZGUgYXJndW1lbnRvcyBjb24gdW4gYXJyYSBkZSB0aXBvc1xyXG4gIGZ1bmN0aW9uIHZhbGlkYXRlIChhcmdzLCB0eXBlcykge1xyXG5cclxuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcclxuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcclxuICAgIGZvciAobGV0IGkgaW4gYXJncyl7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gYXJnc1tpXTtcclxuICAgICAgY29uc3QgdHlwZSA9IHR5cGVzW2ldO1xyXG4gICAgICBpZiAodHlwZSAmJiAhdmFsaWQodmFsdWUsIHR5cGUpKXtcclxuICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbGlkYXRvciB0bzogJythcmdzW2ldKycgbXVzdCBiZSAnK3R5cGUpO1xyXG4gICAgICAgIGVyci5uYW1lID0gJ0ludmFsaWRWYWxpZGF0b3InXHJcbiAgICAgICAgdGhyb3cgZXJyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHZhbGlkYXRlOiB2YWxpZGF0ZSxcclxuICB9O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL2lkYlV0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGlkYlV0aWxzO1xuZnVuY3Rpb24gaWRiVXRpbHMoJHEpIHtcbiAgJ25nSW5qZWN0JztcblxuICB2YXIgdmFsaWRhdG9ycyA9IHtcbiAgICAvLyBGdW5jaW9uIHBhcmEgZGV0ZXJtaW5hciBzaSBlcyB1biBjYWxsYmFjayB2w6FsaWRvIG8gbm9cbiAgICBjYWxsYmFjazogZnVuY3Rpb24gY2FsbGJhY2sodmFsdWUpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJyB8fCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09IHVuZGVmaW5lZDtcbiAgICB9LFxuXG4gICAgLy8gVmVyaWZpY2Egc2kgdW4gdmFsb3IgZXMgdW4gYXJyYXlcbiAgICBhcnJheTogZnVuY3Rpb24gYXJyYXkodmFsdWUpIHtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKTtcbiAgICB9XG5cbiAgfTtcblxuICAvLyBHZW5lcmEgdW4gZXJyb3Igc2kgZWwgdmFsb3Igbm8gZXMgZGVsIHRpcG8gaW5kaWNhZG8gcG9yIHBhcmFtZXRyb1xuICBmdW5jdGlvbiB2YWxpZCh2YWx1ZSwgdHlwZXMpIHtcbiAgICBpZiAoIXZhbGlkYXRvcnMuYXJyYXkodHlwZXMpKSB0eXBlcyA9IFt0eXBlc107XG5cbiAgICBmb3IgKHZhciBpIGluIHR5cGVzKSB7XG4gICAgICB2YXIgdHlwZSA9IHR5cGVzW2ldO1xuICAgICAgaWYgKHR5cGVvZiB0eXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsaWRhdG9yc1t0eXBlXSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaWYgKHZhbGlkYXRvcnNbdHlwZV0odmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PSB0eXBlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHR5cGUgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAodHlwZShhcmdzW2ldKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gVmFsaWRhIHVuIGFycmF5IGRlIGFyZ3VtZW50b3MgY29uIHVuIGFycmEgZGUgdGlwb3NcbiAgZnVuY3Rpb24gdmFsaWRhdGUoYXJncywgdHlwZXMpIHtcblxuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcbiAgICBpZiAodHlwZW9mIHR5cGVzID09ICdzdHJpbmcnKSB0eXBlcyA9IFt0eXBlc107XG4gICAgZm9yICh2YXIgaSBpbiBhcmdzKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhcmdzW2ldO1xuICAgICAgdmFyIHR5cGUgPSB0eXBlc1tpXTtcbiAgICAgIGlmICh0eXBlICYmICF2YWxpZCh2YWx1ZSwgdHlwZSkpIHtcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWxpZGF0b3IgdG86ICcgKyBhcmdzW2ldICsgJyBtdXN0IGJlICcgKyB0eXBlKTtcbiAgICAgICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbGlkYXRvcic7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHZhbGlkYXRlOiB2YWxpZGF0ZVxuICB9O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL2lkYlV0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gTm9tYnJlIGRlIGxvcyBldmVudG9zXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYkV2ZW50cygpIHtcclxuICByZXR1cm4ge1xyXG4gICAgREJfRVJST1I6ICdjYi5lcnJvcicsXHJcbiAgICBNT0RFTF9JTlNUQU5DRUQgOiAnbW9kZWwuaW5zdGFuY2VkJyxcclxuICAgIE1PREVMX1FVRVJJRUQgOiAnbW9kZWwucXVlcmllZCcsXHJcbiAgICBNT0RFTF9VTlFVRVJJRUQgOiAnbW9kZWwudW5xdWVyaWVkJyxcclxuICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBOb21icmUgZGUgbG9zIGV2ZW50b3NcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYkV2ZW50cztcbmZ1bmN0aW9uIGlkYkV2ZW50cygpIHtcbiAgcmV0dXJuIHtcbiAgICBEQl9FUlJPUjogJ2NiLmVycm9yJyxcbiAgICBNT0RFTF9JTlNUQU5DRUQ6ICdtb2RlbC5pbnN0YW5jZWQnLFxuICAgIE1PREVMX1FVRVJJRUQ6ICdtb2RlbC5xdWVyaWVkJyxcbiAgICBNT0RFTF9VTlFVRVJJRUQ6ICdtb2RlbC51bnF1ZXJpZWQnXG4gIH07XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL2lkYkV2ZW50cy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHFzICgpIHsgJ25nSW5qZWN0J1xyXG4gIFxyXG4gIGZ1bmN0aW9uIHFzQ2xhc3MgKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgXHJcbiAgICBsZXQgdGhlbnMgPSBbXTtcclxuICAgIGxldCB0aGVuc1JlYWR5ID0gW107XHJcbiAgICBsZXQgY2F0Y2hzID0gW107XHJcbiAgICBsZXQgY2F0Y2hzUmVhZHkgPSBbXTtcclxuICAgIGxldCByZXN1bHRBcmdzID0gbnVsbDtcclxuICAgIGxldCBlcnJvciA9IG51bGw7XHJcblxyXG4gICAgdGhpei5wcm9taXNlID0ge307XHJcbiAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRoZW5zUmVzb2x2ZWQgKCkge1xyXG4gICAgICBpZiAoIXRoZW5zLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICBsZXQgY2IgPSB0aGVucy5zaGlmdCgpO1xyXG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LnJlc3VsdEFyZ3MpO1xyXG4gICAgICB0aGVuc1JlYWR5LnB1c2goY2IpO1xyXG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2F0Y2hzUmVzb2x2ZWQgKCkge1xyXG4gICAgICBpZiAoIWNhdGNocy5sZW5ndGgpIHJldHVybjtcclxuICAgICAgbGV0IGNiID0gY2F0Y2hzLnNoaWZ0KCk7XHJcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xyXG4gICAgICBjYXRjaHNSZWFkeS5wdXNoKGNiKTtcclxuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGl6LnJlc29sdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xyXG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgIHRoaXoucmVzdWx0QXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5yZWplY3QgPSBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xyXG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgIHRoaXouZXJyb3IgPSBlcnIgfHwge307XHJcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucHJvbWlzZS50aGVuID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIHRoZW5zLnB1c2goY2IpO1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQgJiYgIXRoaXouZXJyb3IpIHtcclxuICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXoucHJvbWlzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLmNhdGNoID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIGNhdGNocy5wdXNoKGNiKTtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmIHRoaXouZXJyb3IpIHtcclxuICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGl6LnByb21pc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucHJvbWlzZS5kb25lID0gZnVuY3Rpb24gKGNiKSB7XHJcblxyXG4gICAgICB0aGVucy5wdXNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYi5hcHBseShudWxsLCBbbnVsbF0uY29uY2F0KHRoaXoucmVzdWx0QXJncykpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNhdGNocy5wdXNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHtcclxuICAgICAgICBpZiAoIXRoaXouZXJyb3IpIHtcclxuICAgICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBpZihjYikgdGhpei5wcm9taXNlLmRvbmUoY2IpO1xyXG5cclxuICB9O1xyXG5cclxuICAvLyBDcmVhIHVuYSBpbnN0YW5jaWEgZGVsIGRlZmVyZWRcclxuICBxc0NsYXNzLmRlZmVyID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICByZXR1cm4gbmV3IHFzQ2xhc3MoY2IpO1xyXG4gIH07XHJcblxyXG4gIHFzQ2xhc3MuYWxsID0gZnVuY3Rpb24gKGFycikge1xyXG4gICAgY29uc3QgZGVmZXJlZCA9IHFzQ2xhc3MuZGVmZXIoKTtcclxuXHJcbiAgICBsZXQgcHJvbWlzZXMgPSBrZXlzLmxlbmd0aDtcclxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xyXG4gICAgY29uc3QgcmVzdWx0cyA9IGFyci5sZW5ndGg/IFtdIDoge307XHJcblxyXG4gICAga2V5cy5tYXAoZnVuY3Rpb24gKGlkeCkge1xyXG5cclxuICAgICAgYXJyW2lkeF0udGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgcHJvbWlzZXMtLTtcclxuICAgICAgICByZXN1bHRzW2lkeF0gPSByZXN1bHQ7XHJcbiAgICAgICAgaWYgKCFwcm9taXNlcyl7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUocmVzdWx0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGFycltpZHhdLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHFzQ2xhc3M7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvcXMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBxcztcbmZ1bmN0aW9uIHFzKCkge1xuICAnbmdJbmplY3QnO1xuXG4gIGZ1bmN0aW9uIHFzQ2xhc3MoY2IpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICB2YXIgdGhlbnMgPSBbXTtcbiAgICB2YXIgdGhlbnNSZWFkeSA9IFtdO1xuICAgIHZhciBjYXRjaHMgPSBbXTtcbiAgICB2YXIgY2F0Y2hzUmVhZHkgPSBbXTtcbiAgICB2YXIgcmVzdWx0QXJncyA9IG51bGw7XG4gICAgdmFyIGVycm9yID0gbnVsbDtcblxuICAgIHRoaXoucHJvbWlzZSA9IHt9O1xuICAgIHRoaXouJHJlc29sdmVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiB0aGVuc1Jlc29sdmVkKCkge1xuICAgICAgaWYgKCF0aGVucy5sZW5ndGgpIHJldHVybjtcbiAgICAgIHZhciBjYiA9IHRoZW5zLnNoaWZ0KCk7XG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LnJlc3VsdEFyZ3MpO1xuICAgICAgdGhlbnNSZWFkeS5wdXNoKGNiKTtcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYXRjaHNSZXNvbHZlZCgpIHtcbiAgICAgIGlmICghY2F0Y2hzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgdmFyIGNiID0gY2F0Y2hzLnNoaWZ0KCk7XG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcbiAgICAgIGNhdGNoc1JlYWR5LnB1c2goY2IpO1xuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICB9XG5cbiAgICB0aGl6LnJlc29sdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgIHRoaXoucmVzdWx0QXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgfTtcblxuICAgIHRoaXoucmVqZWN0ID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICB0aGl6LmVycm9yID0gZXJyIHx8IHt9O1xuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICB9O1xuXG4gICAgdGhpei5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHRoZW5zLnB1c2goY2IpO1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmICF0aGl6LmVycm9yKSB7XG4gICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGl6LnByb21pc2U7XG4gICAgfTtcblxuICAgIHRoaXoucHJvbWlzZS5jYXRjaCA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgY2F0Y2hzLnB1c2goY2IpO1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmIHRoaXouZXJyb3IpIHtcbiAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGl6LnByb21pc2U7XG4gICAgfTtcblxuICAgIHRoaXoucHJvbWlzZS5kb25lID0gZnVuY3Rpb24gKGNiKSB7XG5cbiAgICAgIHRoZW5zLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjYi5hcHBseShudWxsLCBbbnVsbF0uY29uY2F0KHRoaXoucmVzdWx0QXJncykpO1xuICAgICAgfSk7XG5cbiAgICAgIGNhdGNocy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSB7XG4gICAgICAgIGlmICghdGhpei5lcnJvcikge1xuICAgICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH07XG5cbiAgICBpZiAoY2IpIHRoaXoucHJvbWlzZS5kb25lKGNiKTtcbiAgfTtcblxuICAvLyBDcmVhIHVuYSBpbnN0YW5jaWEgZGVsIGRlZmVyZWRcbiAgcXNDbGFzcy5kZWZlciA9IGZ1bmN0aW9uIChjYikge1xuICAgIHJldHVybiBuZXcgcXNDbGFzcyhjYik7XG4gIH07XG5cbiAgcXNDbGFzcy5hbGwgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgdmFyIGRlZmVyZWQgPSBxc0NsYXNzLmRlZmVyKCk7XG5cbiAgICB2YXIgcHJvbWlzZXMgPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFycik7XG4gICAgdmFyIHJlc3VsdHMgPSBhcnIubGVuZ3RoID8gW10gOiB7fTtcblxuICAgIGtleXMubWFwKGZ1bmN0aW9uIChpZHgpIHtcblxuICAgICAgYXJyW2lkeF0udGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIHByb21pc2VzLS07XG4gICAgICAgIHJlc3VsdHNbaWR4XSA9IHJlc3VsdDtcbiAgICAgICAgaWYgKCFwcm9taXNlcykge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGFycltpZHhdLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRlZmVyZWQ7XG4gIH07XG5cbiAgcmV0dXJuIHFzQ2xhc3M7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvcXMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiU2VydmljZSAoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJFdmVudHMsIGlkYk1vZGVsKSB7ICduZ0luamVjdCc7XHJcblxyXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cclxuICBjb25zdCBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XHJcbiAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxyXG4gIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxyXG4gIGNvbnN0IElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcclxuICBjb25zdCBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XHJcbiAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcclxuICBcclxuICBpZiAoIWluZGV4ZWREQikge1xyXG4gICAgYWxlcnQoXCJTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXNcIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICAvLyBDbGFzZSBwYXJhIGxhIGNyZWFjacOzbiBkZSBpbnN0YW5jaWFzIGRlIGxhIEJEXHJcbiAgZnVuY3Rpb24gaWRiKCRkYk5hbWUsICRkYlZlcnNpb24sICRzb2NrZXQpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ251bWJlcicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgIC8vIE1hbmVqYWRvcmVzIGRlIGV2ZW50b3MuXHJcbiAgICBjb25zdCAkZXZlbnRzQ2FsbGJhY2tzID0ge307XHJcbiAgICBjb25zdCAkdXBncmFkZU5lZWRlZERlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG4gICAgY29uc3QgJG9wZW5EZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgIGNvbnN0ICRzb2NrZXRDb25uZWN0ZWREZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgIGxldCAkb3BlbmVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gSW5zdGFuY2lhIGRlIGxhIGJhc2UgZGUgZGF0b3M7XHJcbiAgICBsZXQgJHJlcXVlc3QgPSBudWxsO1xyXG4gICAgdGhpei5tb2RlbHMgPSB7fTtcclxuXHJcbiAgICAvLyBBZ3JlZ2FyIHVuIG1hbmVqYWRvciBkZSBldmVudG9cclxuICAgIHRoaXouYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSl7XHJcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdID0gW107XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5wdXNoKGNiKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vUmVtdWV2ZSB1biBtYW5lamFkb3IgZGUgZXZlbnRvXHJcbiAgICB0aGl6LnVuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkgcmV0dXJuO1xyXG5cclxuICAgICAgLy8gQnVzY2FyIGVsIGNiXHJcbiAgICAgIGNvbnN0IGlkeCA9ICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5pbmRleE9mKGNiKTtcclxuXHJcbiAgICAgIC8vIFNpIHNlIGVuY29udHJvIGVsIGNiIHJlbW92ZXJsb1xyXG4gICAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXHJcbiAgICB0aGl6LnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0J10pO1xyXG5cclxuICAgICAgJGxvZy5sb2coJGRiTmFtZSsnLnYnKygkZGJWZXJzaW9ufHwxKSsnOiAnK2V2ZW50TmFtZSk7XHJcblxyXG4gICAgICBmb3IobGV0IGkgaW4gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKXtcclxuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpeiwgYXJncyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENhbGxiYWNrcyBwYXJhIGxvcyBlcnJvcmVzXHJcbiAgICB0aGl6LmVycm9yID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIHRoaXouYmluZChpZGJFdmVudHMuREJfRVJST1IsIGNiKTtcclxuICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFicmlyIHVuYSBCYXNlIGRlIGRhdG9zLlxyXG4gICAgdGhpei5vcGVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAoJG9wZW5lZCkgcmV0dXJuICRvcGVuRGVmZXJlZDtcclxuXHJcbiAgICAgIC8vIENyZWFyIHVuIG51ZXZvIGRlZmVyXHJcbiAgICAgICRvcGVuZWQgPSB0cnVlO1xyXG5cclxuICAgICAgLy8gZGVqYW1vcyBhYmllcnRhIG51ZXN0cmEgYmFzZSBkZSBkYXRvc1xyXG4gICAgICBmdW5jdGlvbiByZWFkeSgpIHtcclxuXHJcbiAgICAgICAgY29uc3QgcnEgPSBpbmRleGVkREIub3BlbigkZGJOYW1lLCAkZGJWZXJzaW9uKTtcclxuXHJcbiAgICAgICAgcnEub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5yZXN1bHQhXHJcbiAgICAgICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucmVzb2x2ZShldmVudCwgcnEpO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZWwgcmVzdWx0YWRvXHJcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5yZXN1bHQhXHJcbiAgICAgICAgICAkcmVxdWVzdCA9IHJxO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBBc2luZ2FyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzIGEgbGEgQkRcclxuICAgICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgJGxvZy5lcnJvcignRGF0YWJhc2UgZXJyb3I6ICcrIGV2ZW50LnRhcmdldC5lcnJvckNvZGUpO1xyXG4gICAgICAgICAgICB0aGl6LnRyaWdnZXIoaWRiRXZlbnRzLkRCX0VSUk9SLCBbZXZlbnRdKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAkb3BlbkRlZmVyZWQucmVzb2x2ZShldmVudCwgcnEpO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzXHJcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5lcnJvckNvZGUhXHJcbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgJG9wZW5EZWZlcmVkLnJlamVjdChycS5lcnJvckNvZGUsIGV2ZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKCRkYk5hbWUpLm9uc3VjY2VzcyA9IHJlYWR5O1xyXG4gICAgICAvLyByZWFkeSgpO1xyXG5cclxuICAgICAgcmV0dXJuICRvcGVuRGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBudWV2byBtb2RlbG9cclxuICAgIHRoaXoubW9kZWwgPSBmdW5jdGlvbiAobmFtZSwgc29ja2V0KSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3VuZGVmaW5lZCcsICdvYmplY3QnXV0pO1xyXG5cclxuICAgICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG9cclxuICAgICAgbGV0IG1vZGVsID0gdGhpei5tb2RlbHNbbmFtZV07XHJcblxyXG4gICAgICAvLyBTaSBubyBleGlzdGUgZWwgbW9kZWxvIGNyZWFyXHJcbiAgICAgIGlmKCFtb2RlbCl7XHJcbiAgICAgICAgbW9kZWwgPSBpZGJNb2RlbCh0aGl6LCBuYW1lLCBzb2NrZXQgfHwgJHNvY2tldCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEd1YXJkYXIgZWwgbW9kZWxvIGVuIGxvcyBtb2RlbG9zXHJcbiAgICAgIHRoaXoubW9kZWxzW25hbWVdID0gbW9kZWw7XHJcblxyXG4gICAgICAvLyBSZXRvcm5hciBlbCBtb2RlbG9cclxuICAgICAgcmV0dXJuIG1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXHJcbiAgICB0aGl6LmNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgbW9kZWxJZCkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xyXG4gICAgICAgIHJxLnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShtb2RlbE5hbWUsIG1vZGVsSWQpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxyXG4gICAgdGhpei5jcmVhdGVJbmRleCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcclxuICAgICAgICBycS50cmFuc2FjdGlvbi5vYmplY3RTdG9yZShtb2RlbE5hbWUpLmNyZWF0ZUluZGV4KGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIHVuYSB0cmFuc2FjY2nDs25cclxuICAgIHRoaXoudHJhbnNhY3Rpb24gPSBmdW5jdGlvbihtb2RlbE5hbWUsIHBlcm1zLCBhY3Rpb24pIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuXHJcbiAgICAgIC8vIEN1YW5kbyBzZSBhYnJhIGxhIEJEXHJcbiAgICAgICRvcGVuRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xyXG4gICAgICAgIGNvbnN0IHR4ID0gcnEucmVzdWx0LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgcGVybXMpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGFjdGlvbih0eCk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICB0eC5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJlc3VsdCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICB0eC5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QodHguZXJyb3IpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gT2J0aWVuZSB1biBlbGVtZW50byBwb3Igc3Uga2V5XHJcbiAgICB0aGl6LmdldCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGtleSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cclxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xyXG4gICAgICAgIGNvbnN0IHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5nZXQoa2V5KTtcclxuXHJcbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxyXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKHJxLnJlc3VsdCwgZXZlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXHJcbiAgICAgICAgcnEub25lcnJvciAgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIC8vIENvdWxkIGNhbGwgcnEucHJldmVudERlZmF1bHQoKSB0byBwcmV2ZW50IHRoZSB0cmFuc2FjdGlvbiBmcm9tIGFib3J0aW5nLlxyXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gSW5zZXJ0YSB1biByZWdpc3RybyBlbiBlbCBtb2RlbG9cclxuICAgIHRoaXoucHV0ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgdmFsdWVzKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0J10pO1xyXG5cclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxyXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0eCkge1xyXG4gICAgICAgIGNvbnN0IHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5wdXQodmFsdWVzKTtcclxuXHJcbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxyXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxyXG4gICAgICAgIHJxLm9uZXJyb3IgID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAvLyBDb3VsZCBjYWxsIHJxLnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEVsaW1pbmEgdW4gb2JqZXRvIHBvciBzdSBrZXlcclxuICAgIHRoaXouZGVsZXRlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwga2V5KSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3N0cmluZycsICdudW1iZXInXV0pO1xyXG5cclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxyXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0eCkge1xyXG4gICAgICAgIGNvbnN0IHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5kZWxldGUoa2V5KTtcclxuXHJcbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxyXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxyXG4gICAgICAgIHJxLm9uZXJyb3IgID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAvLyBDb3VsZCBjYWxsIHJxLnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xyXG4gICAgdGhpei5vcGVuQ3Vyc29yID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgZmlsdGVycywgZWFjaENiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgJ2Z1bmN0aW9uJ10pO1xyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuXHJcbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXHJcbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBjb25zdCBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkub3BlbkN1cnNvcigpO1xyXG5cclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IHJxLnJlc3VsdDtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gTm8gbW9yZSBtYXRjaGluZyByZWNvcmRzLlxyXG4gICAgICAgICAgaWYgKGN1cnNvcil7XHJcbiAgICAgICAgICAgIGVhY2hDYihjdXJzb3IudmFsdWUsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAvLyBCdXNjYXIgc2lndWllbnRlXHJcbiAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYXIgYWxpYXMgcGFyYSBsb3MgZXZlbnRvcyBlbmxhemFyIGNhbGxiYWNrcyBhIGxvcyBldmVudG9zXHJcbiAgICBsZXQgZGVmZXJlZHM7XHJcbiAgICBPYmplY3Qua2V5cyhkZWZlcmVkcyA9IHtcclxuICAgICAgb25PcGVuOiAkb3BlbkRlZmVyZWQsXHJcbiAgICAgIG9uVXBncmFkZU5lZWRlZDogJHVwZ3JhZGVOZWVkZWREZWZlcmVkLFxyXG4gICAgICBvblNvY2tldENvbm5lY3RlZDogJHNvY2tldENvbm5lY3RlZERlZmVyZWRcclxuICAgIH0pLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICBjb25zdCB0ZXh0ID0gJGRiTmFtZSsnLnYnKygkZGJWZXJzaW9ufHwxKSsnOiAnK2tleTtcclxuICAgICAgICBpZiAoZXJyKXtcclxuICAgICAgICAgICRsb2cuZXJyb3IodGV4dCwgZXJyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJGxvZy5sb2codGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpeltrZXldID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xyXG4gICAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGNiKTtcclxuICAgICAgICByZXR1cm4gdGhpejtcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICB9O1xyXG5cclxuICByZXR1cm4gaWRiO1xyXG5cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaWRiU2VydmljZTtcbmZ1bmN0aW9uIGlkYlNlcnZpY2UoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJFdmVudHMsIGlkYk1vZGVsKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxuXG4gIHZhciBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XG4gIC8vIE5vIHVzZSBcImNvbnN0IGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cbiAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XG4gIHZhciBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XG4gIHZhciBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XG4gIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXG5cbiAgaWYgKCFpbmRleGVkREIpIHtcbiAgICBhbGVydChcIlN1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhc1wiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBDbGFzZSBwYXJhIGxhIGNyZWFjacOzbiBkZSBpbnN0YW5jaWFzIGRlIGxhIEJEXG4gIGZ1bmN0aW9uIGlkYigkZGJOYW1lLCAkZGJWZXJzaW9uLCAkc29ja2V0KSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnbnVtYmVyJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAvLyBNYW5lamFkb3JlcyBkZSBldmVudG9zLlxuICAgIHZhciAkZXZlbnRzQ2FsbGJhY2tzID0ge307XG4gICAgdmFyICR1cGdyYWRlTmVlZGVkRGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgdmFyICRvcGVuRGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgdmFyICRzb2NrZXRDb25uZWN0ZWREZWZlcmVkID0gcXMuZGVmZXIoKTtcbiAgICB2YXIgJG9wZW5lZCA9IGZhbHNlO1xuXG4gICAgLy8gSW5zdGFuY2lhIGRlIGxhIGJhc2UgZGUgZGF0b3M7XG4gICAgdmFyICRyZXF1ZXN0ID0gbnVsbDtcbiAgICB0aGl6Lm1vZGVscyA9IHt9O1xuXG4gICAgLy8gQWdyZWdhciB1biBtYW5lamFkb3IgZGUgZXZlbnRvXG4gICAgdGhpei5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSB7XG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0ucHVzaChjYik7XG4gICAgfTtcblxuICAgIC8vUmVtdWV2ZSB1biBtYW5lamFkb3IgZGUgZXZlbnRvXG4gICAgdGhpei51bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHJldHVybjtcblxuICAgICAgLy8gQnVzY2FyIGVsIGNiXG4gICAgICB2YXIgaWR4ID0gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLmluZGV4T2YoY2IpO1xuXG4gICAgICAvLyBTaSBzZSBlbmNvbnRybyBlbCBjYiByZW1vdmVybG9cbiAgICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnNwbGljZShpZHgsIDEpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBEaXNwYXJhIHVuIGV2ZW50b1xuICAgIHRoaXoudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0J10pO1xuXG4gICAgICAkbG9nLmxvZygkZGJOYW1lICsgJy52JyArICgkZGJWZXJzaW9uIHx8IDEpICsgJzogJyArIGV2ZW50TmFtZSk7XG5cbiAgICAgIGZvciAodmFyIGkgaW4gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSB7XG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXVtpXS5hcHBseSh0aGl6LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gQ2FsbGJhY2tzIHBhcmEgbG9zIGVycm9yZXNcbiAgICB0aGl6LmVycm9yID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB0aGl6LmJpbmQoaWRiRXZlbnRzLkRCX0VSUk9SLCBjYik7XG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgLy8gQWJyaXIgdW5hIEJhc2UgZGUgZGF0b3MuXG4gICAgdGhpei5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCRvcGVuZWQpIHJldHVybiAkb3BlbkRlZmVyZWQ7XG5cbiAgICAgIC8vIENyZWFyIHVuIG51ZXZvIGRlZmVyXG4gICAgICAkb3BlbmVkID0gdHJ1ZTtcblxuICAgICAgLy8gZGVqYW1vcyBhYmllcnRhIG51ZXN0cmEgYmFzZSBkZSBkYXRvc1xuICAgICAgZnVuY3Rpb24gcmVhZHkoKSB7XG5cbiAgICAgICAgdmFyIHJxID0gaW5kZXhlZERCLm9wZW4oJGRiTmFtZSwgJGRiVmVyc2lvbik7XG5cbiAgICAgICAgcnEub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxuICAgICAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBycSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGVsIHJlc3VsdGFkb1xuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5yZXN1bHQhXG4gICAgICAgICAgJHJlcXVlc3QgPSBycTtcblxuICAgICAgICAgIC8vIEFzaW5nYXIgZWwgbWFuZWphZG9yIGRlIGVycm9yZXMgYSBsYSBCRFxuICAgICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICRsb2cuZXJyb3IoJ0RhdGFiYXNlIGVycm9yOiAnICsgZXZlbnQudGFyZ2V0LmVycm9yQ29kZSk7XG4gICAgICAgICAgICB0aGl6LnRyaWdnZXIoaWRiRXZlbnRzLkRCX0VSUk9SLCBbZXZlbnRdKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgJG9wZW5EZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzXG4gICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLmVycm9yQ29kZSFcbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZWplY3QocnEuZXJyb3JDb2RlLCBldmVudCk7XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICBpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UoJGRiTmFtZSkub25zdWNjZXNzID0gcmVhZHk7XG4gICAgICAvLyByZWFkeSgpO1xuXG4gICAgICByZXR1cm4gJG9wZW5EZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBBZ3JlZ2EgdW4gbnVldm8gbW9kZWxvXG4gICAgdGhpei5tb2RlbCA9IGZ1bmN0aW9uIChuYW1lLCBzb2NrZXQpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3VuZGVmaW5lZCcsICdvYmplY3QnXV0pO1xuXG4gICAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsb1xuICAgICAgdmFyIG1vZGVsID0gdGhpei5tb2RlbHNbbmFtZV07XG5cbiAgICAgIC8vIFNpIG5vIGV4aXN0ZSBlbCBtb2RlbG8gY3JlYXJcbiAgICAgIGlmICghbW9kZWwpIHtcbiAgICAgICAgbW9kZWwgPSBpZGJNb2RlbCh0aGl6LCBuYW1lLCBzb2NrZXQgfHwgJHNvY2tldCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEd1YXJkYXIgZWwgbW9kZWxvIGVuIGxvcyBtb2RlbG9zXG4gICAgICB0aGl6Lm1vZGVsc1tuYW1lXSA9IG1vZGVsO1xuXG4gICAgICAvLyBSZXRvcm5hciBlbCBtb2RlbG9cbiAgICAgIHJldHVybiBtb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXG4gICAgdGhpei5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIG1vZGVsSWQpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcbiAgICAgICAgcnEucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKG1vZGVsTmFtZSwgbW9kZWxJZCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXG4gICAgdGhpei5jcmVhdGVJbmRleCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcbiAgICAgICAgcnEudHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5jcmVhdGVJbmRleChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSB1bmEgdHJhbnNhY2Npw7NuXG4gICAgdGhpei50cmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIHBlcm1zLCBhY3Rpb24pIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgIC8vIEN1YW5kbyBzZSBhYnJhIGxhIEJEXG4gICAgICAkb3BlbkRlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcbiAgICAgICAgdmFyIHR4ID0gcnEucmVzdWx0LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgcGVybXMpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gYWN0aW9uKHR4KTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHR4Lm9uY29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJlc3VsdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgdHgub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdCh0eC5lcnJvcik7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIE9idGllbmUgdW4gZWxlbWVudG8gcG9yIHN1IGtleVxuICAgIHRoaXouZ2V0ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwga2V5KSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLmdldChrZXkpO1xuXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKHJxLnJlc3VsdCwgZXZlbnQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAvLyBDb3VsZCBjYWxsIHJxLnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIEluc2VydGEgdW4gcmVnaXN0cm8gZW4gZWwgbW9kZWxvXG4gICAgdGhpei5wdXQgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCB2YWx1ZXMpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0J10pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLnB1dCh2YWx1ZXMpO1xuXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBFbGltaW5hIHVuIG9iamV0byBwb3Igc3Uga2V5XG4gICAgdGhpei5kZWxldGUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBrZXkpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3N0cmluZycsICdudW1iZXInXV0pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLmRlbGV0ZShrZXkpO1xuXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xuICAgIHRoaXoub3BlbkN1cnNvciA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGZpbHRlcnMsIGVhY2hDYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddLCAnZnVuY3Rpb24nXSk7XG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWRvbmx5JywgZnVuY3Rpb24gKHR4KSB7XG4gICAgICAgIHZhciBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkub3BlbkN1cnNvcigpO1xuXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgY3Vyc29yID0gcnEucmVzdWx0O1xuXG4gICAgICAgICAgLy8gTm8gbW9yZSBtYXRjaGluZyByZWNvcmRzLlxuICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGVhY2hDYihjdXJzb3IudmFsdWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgLy8gQnVzY2FyIHNpZ3VpZW50ZVxuICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIENyZWFyIGFsaWFzIHBhcmEgbG9zIGV2ZW50b3MgZW5sYXphciBjYWxsYmFja3MgYSBsb3MgZXZlbnRvc1xuICAgIHZhciBkZWZlcmVkcyA9IHZvaWQgMDtcbiAgICBPYmplY3Qua2V5cyhkZWZlcmVkcyA9IHtcbiAgICAgIG9uT3BlbjogJG9wZW5EZWZlcmVkLFxuICAgICAgb25VcGdyYWRlTmVlZGVkOiAkdXBncmFkZU5lZWRlZERlZmVyZWQsXG4gICAgICBvblNvY2tldENvbm5lY3RlZDogJHNvY2tldENvbm5lY3RlZERlZmVyZWRcbiAgICB9KS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoZnVuY3Rpb24gKGVycikge1xuICAgICAgICB2YXIgdGV4dCA9ICRkYk5hbWUgKyAnLnYnICsgKCRkYlZlcnNpb24gfHwgMSkgKyAnOiAnICsga2V5O1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgJGxvZy5lcnJvcih0ZXh0LCBlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRsb2cubG9nKHRleHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXpba2V5XSA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XG4gICAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGNiKTtcbiAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBpZGI7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYk1vZGVsU2VydmljZSAoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJRdWVyeSwgaWRiRXZlbnRzLCBsYlJlc291cmNlLCAkdGltZW91dCkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAvLyBCdXNjYXIgdW4gY2FtcG9cclxuICBjb25zdCBzZWFyY2hEZWVwRmllbGQgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgY2IpIHtcclxuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgIGNvbnN0IGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XHJcbiAgICBjb25zdCBsYXN0RmllbGQgPSBmaWVsZHMucG9wKCk7XHJcblxyXG4gICAgcmV0dXJuIChmdW5jdGlvbiBfc2V0KG9iaikge1xyXG4gICAgICBpZiAoZmllbGRzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHJldHVybiBjYihvYmosIGxhc3RGaWVsZCk7XHJcbiAgICAgIGNvbnN0IGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XHJcbiAgICAgIGlmICh0eXBlb2Ygb2JqW2ZpZWxkXSA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAgb2JqW2ZpZWxkXSA9IHt9O1xyXG4gICAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcclxuICAgIH0pKG9iaik7XHJcblxyXG4gIH07XHJcblxyXG4gIC8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xyXG4gIGNvbnN0IGdldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCkge1xyXG4gICAgcmV0dXJuIHNlYXJjaERlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXHJcbiAgY29uc3Qgc2V0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIChvYmosIGZpZWxkLCB2YWx1ZSkge1xyXG4gICAgc2VhcmNoRGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiBmdW5jdGlvbiBpZGJNb2RlbCAoJGRiLCAkbW9kZWxOYW1lLCAkc29ja2V0KSB7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtudWxsICwnc3RyaW5nJ10pO1xyXG5cclxuICAgIC8vIENsYXZlIGRlbCBtb2RlbG9cclxuICAgIGNvbnN0ICRpZCA9IHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9O1xyXG4gICAgY29uc3QgJGV2ZW50c0hhbmRsZXJzID0ge307XHJcbiAgICBjb25zdCAkaW5zdGFuY2VzID0ge307XHJcbiAgICBsZXQgJGZpZWxkcyA9IHt9O1xyXG4gICAgbGV0ICRyZW1vdGUgPSBudWxsO1xyXG4gICAgbGV0ICR2ZXJzaW9uaW5nID0gbnVsbDtcclxuXHJcbiAgICAvLyBDb25zdHVjdG9yIGRlbCBtb2RlbG9cclxuICAgIGZ1bmN0aW9uIE1vZGVsKGRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgdGhpei4kbG9hZGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXouJGxvY2FsTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXouJHJlbW90ZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICBcclxuICAgICAgdGhpei4kbG9jYWxWYWx1ZXMgPSB7fTtcclxuICAgICAgdGhpei4kcmVtb3RlVmFsdWVzID0ge307XHJcblxyXG4gICAgICB0aGl6LiR2ZXJzaW9uID0gbnVsbDtcclxuICAgICAgdGhpei4kbG9jYWxWZXJzaW9uID0gbnVsbDtcclxuICAgICAgdGhpei4kcmVtb3RlVmVyc2lvbiA9IG51bGw7XHJcblxyXG4gICAgICB0aGl6LiRldmVudHNIYW5kbGVycyA9IHt9O1xyXG4gICAgICBcclxuICAgICAgaWYgKGRhdGEpe1xyXG4gICAgICAgIHRoaXouJHNldFZhbHVlcyhkYXRhKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpei4kY29uc3RydWN0b3IoZGF0YSk7XHJcblxyXG4gICAgICBpZiAoJHNvY2tldCkge1xyXG4gICAgICAgIHRoaXouJGxpc3RlbigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCAkcXVlcmllcyA9IFtdO1xyXG5cclxuICAgICAgdGhpelxyXG4gICAgICAgIC8vIEN1YW5kbyBzZWEgY29uc3VsdGFkbyBhZ3JlZ2FyIGxhIGNvbnN1bHRhXHJcbiAgICAgICAgLiRiaW5kKGlkYkV2ZW50cy5NT0RFTF9RVUVSSUVELCBmdW5jdGlvbiAocXVlcnkpIHtcclxuICAgICAgICAgICRxdWVyaWVzLnB1c2gocXVlcnkpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIEN1YW5kbyBzZWEgbGliZXJhZG8gZGUgbGEgY29uc3VsdGFyIHF1aXRhciBkZSBsYXMgY29uc3VsdGFzXHJcbiAgICAgICAgLiRiaW5kKGlkYkV2ZW50cy5NT0RFTF9VTlFVRVJJRUQsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG4gICAgICAgICAgY29uc3QgaWR4ID0gJHF1ZXJpZXMuaW5kZXhPZihxdWVyeSk7XHJcbiAgICAgICAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgICAgICAgJHF1ZXJpZXMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gRXZlbnRvIGRlIHF1ZSBtb2RlbG8gZXN0w6EgaW5zdGFuY2lhZG9cclxuICAgICAgICAuJGVtaXQoaWRiRXZlbnRzLk1PREVMX0lOU1RBTkNFRCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2IGVsIG5vbWJyZSBkZWwgbW9kZWxvXHJcbiAgICBNb2RlbC5nZXRNb2RlbE5hbWUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICByZXR1cm4gJG1vZGVsTmFtZTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHYgZWwgbm9tYnJlIGRlbCBtb2RlbG9cclxuICAgIE1vZGVsLmdldEtleVBhdGggPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICByZXR1cm4gJGlkLmtleVBhdGg7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgZWwgSUQgYWwgbW9kZWxvXHJcbiAgICBNb2RlbC5hdXRvSW5jcmVtZW50ID0gZnVuY3Rpb24gKGF1dG9JbmNyZW1lbnQpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Jvb2xlYW4nXSk7XHJcblxyXG4gICAgICAkaWQuYXV0b0luY3JlbWVudCA9IGF1dG9JbmNyZW1lbnQ7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cclxuICAgIE1vZGVsLmtleVBhdGggPSBmdW5jdGlvbiAoa2V5UGF0aCkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJ10pO1xyXG5cclxuICAgICAgJGlkLmtleVBhdGggPSBrZXlQYXRoO1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIGVsIG9iamVjdG8gc3RvcmFnZSBwYXJhIGVsIG1vZGVsby5cclxuICAgIE1vZGVsLmNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgJGRiLmNyZWF0ZVN0b3JlKCRtb2RlbE5hbWUsICRpZCk7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBpbmRleFxyXG4gICAgTW9kZWwuaW5kZXggPSBmdW5jdGlvbiAoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcclxuXHJcbiAgICAgICRkYi5jcmVhdGVJbmRleCgkbW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE3DqXRvZG8gcXVlIHBlcm1pdGUgbW9kaWZpY2FyIG1vZGVsLlxyXG4gICAgTW9kZWwuYnVpbGQgPSBmdW5jdGlvbiAoYnVpbGRDYWxsYmFjaykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICBidWlsZENhbGxiYWNrKE1vZGVsKTtcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGxhIGVzcGVjaWZpY2FjacOzbiBkZSBsb3MgY2FtcG9zXHJcbiAgICBNb2RlbC5maWVsZHMgPSBmdW5jdGlvbiAoZmllbGRzKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnXSk7XHJcblxyXG4gICAgICAkZmllbGRzID0ge307XHJcbiAgICAgICRmaWVsZHNbJGlkLmtleVBhdGhdID0ge1xyXG4gICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiLFxyXG4gICAgICAgIFwicmVxdWlyZWRcIjogdHJ1ZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgT2JqZWN0LmtleXMoZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkTmFtZSkge1xyXG4gICAgICAgIGxldCBmaWVsZCA9IGZpZWxkc1tmaWVsZE5hbWVdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZmllbGRzW2ZpZWxkTmFtZV0gPT0gJ3N0cmluZycpe1xyXG4gICAgICAgICAgZmllbGQgPSB7IFwidHlwZVwiOiBmaWVsZCB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICAkZmllbGRzW2ZpZWxkTmFtZV0gPSBmaWVsZDtcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDb25maWd1cmEgZWwgcmVtb3RlIGFwaTtcclxuICAgIE1vZGVsLnJlbW90ZSA9IGZ1bmN0aW9uICh1cmwsIGFyZ3MsIGFjdGlvbnMpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnLCAnb2JqZWN0J10pO1xyXG5cclxuICAgICAgJHJlbW90ZSA9IGxiUmVzb3VyY2UodXJsLCBhcmdzLCBhY3Rpb25zKTtcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgbGEgaW5zdGFuY2lhIGRlbCAkcmVtb3RlIGRlbCBtb2RlbG9cclxuICAgIE1vZGVsLmdldFJlbW90ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHJldHVybiAkcmVtb3RlO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgY29ycmVzcG9uZGllbnRlIGFsIGtleSBkZSB1biBvYmpldG9cclxuICAgIE1vZGVsLmdldEtleUZyb20gPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZShkYXRhLCAkaWQua2V5UGF0aCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgbW9kZWwgZGUgbGFzIGd1YXJkYWRhcy4gU2kgbm8gZXhpc3RlIGVudG9uY2VcclxuICAgIC8vIHNlIGNyZWFcclxuICAgIE1vZGVsLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ3N0cmluZycsICdudW1iZXInLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIC8vIEVsIG9iamV0byBubyB0aWVuZSBJRFxyXG4gICAgICBpZiAoIWtleSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTW9kZWwoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTm8gZXhpc3RlIGxhIGluc3RhbmNpYSBlbnRvbmNlIHNlIGNyZWFcclxuICAgICAgaWYgKCEkaW5zdGFuY2VzW2tleV0pe1xyXG4gICAgICAgICRpbnN0YW5jZXNba2V5XSA9IG5ldyBNb2RlbCgpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gJGluc3RhbmNlc1trZXldO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQnVzY2EgdW4gcmVnaXN0cm8gZW4gbGEgb2JqZWN0U3RvcmUgZGVsIG1vZGVsby5cclxuICAgIE1vZGVsLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG4gICAgICBjb25zdCBpbnN0YW5jZSA9IE1vZGVsLmdldEluc3RhbmNlKGtleSk7XHJcbiAgICAgIFxyXG4gICAgICBpZiAoaW5zdGFuY2UuJGxvY2FsTG9hZGVkKSByZXR1cm4gaW5zdGFuY2U7XHJcblxyXG4gICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSBmYWxzZTtcclxuICAgICAgaW5zdGFuY2UuJHByb21pc2UgPSBkZWZlcmVkLnByb21pc2U7XHJcblxyXG4gICAgICAkZGIuZ2V0KCRtb2RlbE5hbWUsIGtleSkucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgIE1vZGVsLmdldFZlcnNpb25PZihrZXkpLnByb21pc2VcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLiRzZXRMb2NhbFZhbHVlcyhkYXRhLCB2ZXJzaW9uPyB2ZXJzaW9uLmhhc2ggOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICRsb2cuZXJyb3IoWydNb2RlbC5nZXRWZXJzaW9uT2YgYW55IGVycm9yJywgZXJyXSlcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cclxuICAgIE1vZGVsLmZpbmQgPSBmdW5jdGlvbiAoZmlsdGVycykge1xyXG5cclxuICAgICAgcmV0dXJuIG5ldyBpZGJRdWVyeSgkZGIsIE1vZGVsLCBmaWx0ZXJzKTs7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIG51ZXZhcyBpbnN0YW5jaWFzIGRlIGxvcyBtb2RlbG9zXHJcbiAgICBNb2RlbC5jcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgLy8gU2kgZXMgdW4gYXJyYXlcclxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCByZWNvcmQgPSBNb2RlbC5nZXRJbnN0YW5jZShNb2RlbC5nZXRLZXlGcm9tKGRhdGEpKTtcclxuXHJcbiAgICAgICAgaWYgKHJlY29yZC4kbG9hZGVkKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkNhbnRDcmVhdGVkTG9hZGVkSW5zdGFuY2UnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZWNvcmQuJHB1bGwoKTtcclxuXHJcbiAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgLy8gT2J0ZW5lciB1bmEgY29waWEgZGVsIGFycmF5XHJcbiAgICAgIGNvbnN0IGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRhdGEpO1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKGNiKTtcclxuXHJcbiAgICAgIChmdW5jdGlvbiBpdGVyYXRpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyBObyBxdWVkYW4gZWxlbWVudG9zIGVuIGVsIGFycmF5XHJcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT0gMCkgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZShyZXN1bHQpO1xyXG5cclxuICAgICAgICAvLyBDcmVhciBlbCBzaWd1aWVudGUgZWxlbWVudG9cclxuICAgICAgICBNb2RlbC5jcmVhdGUoYXJyLnNoaWZ0KCkpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBpdGVyYXRpb24oKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KSgpO1xyXG5cclxuICAgICAgLy8gRGV2b2x2ZXIgZWwgcHJvbWlzZVxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgdW4gbW9kZWxvIHBhcmEgZ3VhcmRhciBsYXMgdmVyc2lvbmVzIGRlbCBtb2RlbG8gYWN0dWFsXHJcbiAgICBNb2RlbC52ZXJzaW9uaW5nID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgY2IpIHtcclxuICAgICAgaWYgKHR5cGVvZiBtb2RlbE5hbWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjYiA9IG1vZGVsTmFtZTtcclxuICAgICAgICBtb2RlbE5hbWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoW21vZGVsTmFtZSwgY2JdLCBbWydzdHJpbmcnLCAndW5kZWZpbmVkJ10sIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGlmICghJHZlcnNpb25pbmcpIHtcclxuXHJcbiAgICAgICAgLy8gU2kgZWwgbW9kZWwgbm8gdGllbmUgbm9tYnJlIHNlIGFncmVnYVxyXG4gICAgICAgIGlmICghbW9kZWxOYW1lKXtcclxuICAgICAgICAgIG1vZGVsTmFtZSA9ICRtb2RlbE5hbWUrJ192ZXJzaW9uaW5nJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENyZWFyIG1vZGVsbyBwYXJhIGVsIG1hbmVqbyBkZSBkYXRvc1xyXG4gICAgICAgICR2ZXJzaW9uaW5nID0gJGRiLm1vZGVsKG1vZGVsTmFtZSlcclxuICAgICAgICAgIC5hdXRvSW5jcmVtZW50KGZhbHNlKVxyXG4gICAgICAgICAgLmtleVBhdGgoJGlkLmtleVBhdGgpXHJcbiAgICAgICAgICAuZmllbGRzKHtcclxuICAgICAgICAgICAgXCJoYXNoXCI6IHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9LFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2IpIGNiKCR2ZXJzaW9uaW5nKTtcclxuXHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZSBsYSB2ZXJzaW9uIGxvY2FsIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwuZ2V0VmVyc2lvbk9mID0gZnVuY3Rpb24gKGtleSkgeyBcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgaWYgKCR2ZXJzaW9uaW5nKSB7XHJcbiAgICAgICAgJHZlcnNpb25pbmcuZ2V0KGtleSkuJHByb21pc2VcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZSh2ZXJzaW9uKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkZWZlcmVkLnJlamVjdChudWxsKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRlZmVyZWQucmVzb2x2ZShudWxsKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZ3JlZ2EgdW4gbWFuZGVqYWRvciBkZSBldmVudG9zIGFsIG1vZGVsb1xyXG4gICAgTW9kZWwuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGlmICghJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xyXG5cclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGlzcGFyYSB1biBldmVudG8gZGVsIG1vZGVsXHJcbiAgICBNb2RlbC5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnYXJyYXknXV0pO1xyXG5cclxuICAgICAgaWYgKCRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ubWFwKGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgY2IuYXBwbHkoTW9kZWwsIGFyZ3MgfHwgW10pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGdldCA9IGZ1bmN0aW9uIChmaWVsZCkge1xyXG5cclxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0ID0gZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkge1xyXG5cclxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQsIHZhbHVlKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIHVuIG9iamV0byBjb24gbGFzIHByb3BpZWRhZGVzIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRnZXRWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgY29uc3QgdmFsdWVzID0ge307XHJcbiAgICAgIGRhdGEgPSBkYXRhIHx8IHRoaXM7XHJcblxyXG4gICAgICBPYmplY3Qua2V5cygkZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh2YWx1ZXMsIGZpZWxkLCBnZXRGaWVsZFZhbHVlKGRhdGEsIGZpZWxkKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHZhbHVlcztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIHVuIG9iamV0byBjb24gbGFzIHByb3BpZWRhZGVzIGxvY2FsZXMgZGVsIHJlZ2lzdHJvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGdldExvY2FsVmFsdWVzID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuJGdldFZhbHVlcyh0aGlzLiRsb2NhbFZhbHVlcyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSB1biBtb2RlbG8gY29uIGxhcyBwcm9waWVkYWRlcyByZW1vdGFzIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRnZXRSZW1vdGVWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy4kZ2V0VmFsdWVzKHRoaXMuJHJlbW90ZVZhbHVlcyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRzZXRWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSwgdmVyc2lvbikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XHJcbiAgICAgIFxyXG4gICAgICB0aGl6LiR2ZXJzaW9uID0gdmVyc2lvbjtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXosIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpei4kbG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGxhcyBwcm9waWVkYWRlcyBsb2NhbGVzIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRzZXRMb2NhbFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhLCB2ZXJzaW9uKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcclxuICAgICAgXHJcbiAgICAgIHRoaXouJGxvY2FsVmVyc2lvbiA9IHZlcnNpb247XHJcblxyXG4gICAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRsb2NhbFZhbHVlcywgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoIXRoaXouJGxvYWRlZCAmJiBkYXRhKSB7XHJcbiAgICAgICAgdGhpei4kc2V0VmFsdWVzKGRhdGEsIHZlcnNpb24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBsYXMgcHJvcGllZGFkZXMgcmVtb3RhcyBkZWwgcmVnaXN0cm9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0UmVtb3RlVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xyXG4gICAgICBcclxuICAgICAgdGhpei4kcmVtb3RlVmVyc2lvbiA9IHZlcnNpb247XHJcblxyXG4gICAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRyZW1vdGVWYWx1ZXMsIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCF0aGl6LiRsb2FkZWQgJiYgZGF0YSkge1xyXG4gICAgICAgIHRoaXouJHNldFZhbHVlcyhkYXRhLCB2ZXJzaW9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgZWwgSUQgZGVsIG9iamV0b1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRzZXRLZXkgPSBmdW5jdGlvbiAobmV3S2V5KSB7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCBvbGRLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKHRoaXMpO1xyXG5cclxuICAgICAgTW9kZWwuc2VhcmNoRGVlcEZpZWxkKHRoaXMsICRpZC5rZXlQYXRoLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IG5ld0tleTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAob2xkS2V5ICE9PSBuZXdLZXkpIHtcclxuXHJcbiAgICAgICAgaWYgKG9sZEtleSAmJiAkaW5zdGFuY2VzW29sZEtleV0gJiYgJGluc3RhbmNlc1tvbGRLZXldICE9IHRoaXMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk9sZEtleUlzTm90U2FtZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV3S2V5ICYmICRpbnN0YW5jZXNbbmV3S2V5XSAmJiAkaW5zdGFuY2VzW25ld0tleV0gIT0gdGhpcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5JbnN0YW5jZU9mTmV3S2V5SXNOb3RTYW1lJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFbGltaW5hciBhbnRlcmlvclxyXG4gICAgICAgIGlmIChvbGRLZXkgJiYgJGluc3RhbmNlc1tvbGRLZXldKSB7XHJcbiAgICAgICAgICBkZWxldGUgJGluc3RhbmNlc1tvbGRLZXldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWdyZWdhciBudWV2YVxyXG4gICAgICAgIGlmIChuZXdLZXkgJiYgISRpbnN0YW5jZXNbbmV3S2V5XSkge1xyXG4gICAgICAgICAgJGluc3RhbmNlc1tuZXdLZXldID0gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29uc3R1cmN0b3IgcXVlIHNlIHB1ZWRlIHNvYnJlIGVzY3JpYmlyXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgc2kgZWwgb2JqZXRvIGVzdMOhIGFsbWFjZW5hZG9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kaXNTdG9yZWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICByZXR1cm4gJGluc3RhbmNlc1t0aGlzLiRnZXQoJGlkLmtleVBhdGgpXSA9PT0gdGhpcztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEd1YXJkYSBsb3MgZGF0b3MgZGVsIG9iamV0b1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRwdWxsID0gZnVuY3Rpb24gKG5ld1ZhbHVlcywgdmVyc2lvbil7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgaWYgKG5ld1ZhbHVlcykge1xyXG4gICAgICAgIG5ld1ZhbHVlcyA9IHRoaXouJGdldFZhbHVlcyhuZXdWYWx1ZXMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld1ZhbHVlcyA9IHRoaXouJGdldFJlbW90ZVZhbHVlcygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBuZXdLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKG5ld1ZhbHVlcyk7XHJcbiAgICAgIGNvbnN0IG9sZFZhbHVlcyA9IHRoaXouJGdldExvY2FsVmFsdWVzKCk7XHJcbiAgICAgIGNvbnN0IG9sZEtleSA9IE1vZGVsLmdldEtleUZyb20ob2xkVmFsdWVzKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKG5ld0tleSwgb2xkS2V5KTtcclxuICAgICAgY29uc29sZS5sb2cobmV3VmFsdWVzLCBvbGRWYWx1ZXMpO1xyXG5cclxuICAgICAgLy8gaWYgKG9sZEtleSAhPT0gbmV3S2V5KSB7XHJcblxyXG4gICAgICAvLyAgIGlmIChvbGRLZXkgJiYgbmV3S2V5KXtcclxuICAgICAgLy8gICAgIE1vZGVsLmdldChvbGRLZXkpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKG9sZEluc3RhbmNlKSB7XHJcbiAgICAgIC8vICAgICAgIE1vZGVsLmdldChuZXdLZXkpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKG5ld0luc3RhbmNlKSB7XHJcblxyXG4gICAgICAvLyAgICAgICB9KTtcclxuICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAvLyAgIH1cclxuXHJcbiAgICAgIC8vIH1cclxuICAgICAgXHJcbiAgICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRnVuY2lvbiBxdWUgaGFjZSBlc2N1Y2hhcnMgbG9zIG1lbnNhamVzIGRlbCBzb2NrZXQgcGFyYSBlbCBtb2RlbFxyXG4gICAgTW9kZWwucHJvdG90eXBlLiRsaXN0ZW4gPSBmdW5jdGlvbiAoKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZiAoISRzb2NrZXQpIHRocm93IG5ldyBFcnJvcignTW9kZWwuRG9lc05vdEhhdmVTb2NrZXRJbnN0YW5jZScpO1xyXG5cclxuICAgICAgLy8gQ3JlYXIgdW5hIHN1YnNjcmlwY2lvbiBhbCBzb2NrZXQgcGFyYSBjdWFuZG8gc2UgcmVjaWJhbiBkYXRvc1xyXG4gICAgICAvLyBwYXJhIGxhIGluc3RhbmNpYSBhY3R1YWxcclxuICAgICAgJHNvY2tldC5zdWJzY3JpYmUoe1xyXG4gICAgICAgIG1vZGVsTmFtZTogJG1vZGVsTmFtZSxcclxuICAgICAgICBldmVudE5hbWU6ICd1cGRhdGUnLFxyXG4gICAgICAgIG1vZGVsSWQ6IHRoaXouJGdldChNb2RlbC5nZXRLZXlQYXRoKCkpLFxyXG4gICAgICB9LCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAvLyBBIHJlY2liaXIgZGF0b3MgZGVsIHNvY2tldCBhc2lnbmFyIGxvcyB2YWxvcmVzXHJcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgLy8gRW1pdGlyIGV2ZW50byBkZSBkYXRvcyByZWNpYmlkb3IgcGFyYSBlbCBtb2RlbG9cclxuICAgICAgICAgIHRoaXouJHNldFJlbW90ZVZhbHVlcyhkYXRhLnZhbHVlcywgZGF0YS52ZXJzaW9uKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQWdyZWdhIHVuIG1hbmRlamFkb3IgZGUgZXZlbnRvc1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRiaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgdGhpcy4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGVtaXQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnYXJyYXknXV0pO1xyXG5cclxuICAgICAgLy8gTGxhbWFyIGVsIGV2ZW50byBwYXJhIGVsIG1vZGVsb1xyXG4gICAgICBNb2RlbC5lbWl0KGV2ZW50TmFtZSwgW3RoaXosIFtdLmNvbmNhdChbdGhpel0pLmNvbmNhdChhcmdzKV0pO1xyXG5cclxuICAgICAgaWYgKHRoaXouJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICB0aGl6LiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLm1hcChmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAgIGNiLmFwcGx5KHRoaXosIGFyZ3MgfHwgW10pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIE1vZGVsLiRpbnN0YW5jZXMgPSAkaW5zdGFuY2VzO1xyXG5cclxuICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgfTtcclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiTW9kZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYk1vZGVsU2VydmljZTtcbmZ1bmN0aW9uIGlkYk1vZGVsU2VydmljZSgkbG9nLCBxcywgaWRiVXRpbHMsIGlkYlF1ZXJ5LCBpZGJFdmVudHMsIGxiUmVzb3VyY2UsICR0aW1lb3V0KSB7XG4gICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAvLyBCdXNjYXIgdW4gY2FtcG9cblxuICAgICAgdmFyIHNlYXJjaERlZXBGaWVsZCA9IGZ1bmN0aW9uIHNlYXJjaERlZXBGaWVsZChvYmosIGZpZWxkLCBjYikge1xuICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgICAgICAgIHZhciBmaWVsZHMgPSBmaWVsZC5zcGxpdCgnLicpO1xuICAgICAgICAgICAgdmFyIGxhc3RGaWVsZCA9IGZpZWxkcy5wb3AoKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIF9zZXQob2JqKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoZmllbGRzLmxlbmd0aCA9PSAwKSByZXR1cm4gY2Iob2JqLCBsYXN0RmllbGQpO1xuICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtmaWVsZF0gPT09ICd1bmRlZmluZWQnKSBvYmpbZmllbGRdID0ge307XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcbiAgICAgICAgICAgIH0ob2JqKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xuICAgICAgdmFyIGdldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiBnZXRGaWVsZFZhbHVlKG9iaiwgZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWFyY2hEZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XG4gICAgICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIC8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xuICAgICAgdmFyIHNldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiBzZXRGaWVsZFZhbHVlKG9iaiwgZmllbGQsIHZhbHVlKSB7XG4gICAgICAgICAgICBzZWFyY2hEZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlkYk1vZGVsKCRkYiwgJG1vZGVsTmFtZSwgJHNvY2tldCkge1xuICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbbnVsbCwgJ3N0cmluZyddKTtcblxuICAgICAgICAgICAgLy8gQ2xhdmUgZGVsIG1vZGVsb1xuICAgICAgICAgICAgdmFyICRpZCA9IHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9O1xuICAgICAgICAgICAgdmFyICRldmVudHNIYW5kbGVycyA9IHt9O1xuICAgICAgICAgICAgdmFyICRpbnN0YW5jZXMgPSB7fTtcbiAgICAgICAgICAgIHZhciAkZmllbGRzID0ge307XG4gICAgICAgICAgICB2YXIgJHJlbW90ZSA9IG51bGw7XG4gICAgICAgICAgICB2YXIgJHZlcnNpb25pbmcgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBDb25zdHVjdG9yIGRlbCBtb2RlbG9cbiAgICAgICAgICAgIGZ1bmN0aW9uIE1vZGVsKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXouJHJlc29sdmVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXouJGxvYWRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhpei4kbG9jYWxMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHRoaXouJHJlbW90ZUxvYWRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRsb2NhbFZhbHVlcyA9IHt9O1xuICAgICAgICAgICAgICAgICAgdGhpei4kcmVtb3RlVmFsdWVzID0ge307XG5cbiAgICAgICAgICAgICAgICAgIHRoaXouJHZlcnNpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgdGhpei4kbG9jYWxWZXJzaW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgIHRoaXouJHJlbW90ZVZlcnNpb24gPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRldmVudHNIYW5kbGVycyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpei4kc2V0VmFsdWVzKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRjb25zdHJ1Y3RvcihkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCRzb2NrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXouJGxpc3RlbigpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICB2YXIgJHF1ZXJpZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgdGhpelxuICAgICAgICAgICAgICAgICAgLy8gQ3VhbmRvIHNlYSBjb25zdWx0YWRvIGFncmVnYXIgbGEgY29uc3VsdGFcbiAgICAgICAgICAgICAgICAgIC4kYmluZChpZGJFdmVudHMuTU9ERUxfUVVFUklFRCwgZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcXVlcmllcy5wdXNoKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgIC8vIEN1YW5kbyBzZWEgbGliZXJhZG8gZGUgbGEgY29uc3VsdGFyIHF1aXRhciBkZSBsYXMgY29uc3VsdGFzXG4gICAgICAgICAgICAgICAgICAuJGJpbmQoaWRiRXZlbnRzLk1PREVMX1VOUVVFUklFRCwgZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWR4ID0gJHF1ZXJpZXMuaW5kZXhPZihxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcXVlcmllcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgIC8vIEV2ZW50byBkZSBxdWUgbW9kZWxvIGVzdMOhIGluc3RhbmNpYWRvXG4gICAgICAgICAgICAgICAgICAuJGVtaXQoaWRiRXZlbnRzLk1PREVMX0lOU1RBTkNFRCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEZXZ1ZWx2IGVsIG5vbWJyZSBkZWwgbW9kZWxvXG4gICAgICAgICAgICBNb2RlbC5nZXRNb2RlbE5hbWUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiAkbW9kZWxOYW1lO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdiBlbCBub21icmUgZGVsIG1vZGVsb1xuICAgICAgICAgICAgTW9kZWwuZ2V0S2V5UGF0aCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuICRpZC5rZXlQYXRoO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xuICAgICAgICAgICAgTW9kZWwuYXV0b0luY3JlbWVudCA9IGZ1bmN0aW9uIChhdXRvSW5jcmVtZW50KSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnYm9vbGVhbiddKTtcblxuICAgICAgICAgICAgICAgICAgJGlkLmF1dG9JbmNyZW1lbnQgPSBhdXRvSW5jcmVtZW50O1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xuICAgICAgICAgICAgTW9kZWwua2V5UGF0aCA9IGZ1bmN0aW9uIChrZXlQYXRoKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJ10pO1xuXG4gICAgICAgICAgICAgICAgICAkaWQua2V5UGF0aCA9IGtleVBhdGg7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDcmVhIGVsIG9iamVjdG8gc3RvcmFnZSBwYXJhIGVsIG1vZGVsby5cbiAgICAgICAgICAgIE1vZGVsLmNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAkZGIuY3JlYXRlU3RvcmUoJG1vZGVsTmFtZSwgJGlkKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBNb2RlbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFncmVnYSB1biBpbmRleFxuICAgICAgICAgICAgTW9kZWwuaW5kZXggPSBmdW5jdGlvbiAoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcblxuICAgICAgICAgICAgICAgICAgJGRiLmNyZWF0ZUluZGV4KCRtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBNb2RlbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIE3DqXRvZG8gcXVlIHBlcm1pdGUgbW9kaWZpY2FyIG1vZGVsLlxuICAgICAgICAgICAgTW9kZWwuYnVpbGQgPSBmdW5jdGlvbiAoYnVpbGRDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICAgICAgICAgICAgICBidWlsZENhbGxiYWNrKE1vZGVsKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBNb2RlbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBsYSBlc3BlY2lmaWNhY2nDs24gZGUgbG9zIGNhbXBvc1xuICAgICAgICAgICAgTW9kZWwuZmllbGRzID0gZnVuY3Rpb24gKGZpZWxkcykge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcblxuICAgICAgICAgICAgICAgICAgJGZpZWxkcyA9IHt9O1xuICAgICAgICAgICAgICAgICAgJGZpZWxkc1skaWQua2V5UGF0aF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gZmllbGRzW2ZpZWxkTmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkc1tmaWVsZE5hbWVdID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZCA9IHsgXCJ0eXBlXCI6IGZpZWxkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAkZmllbGRzW2ZpZWxkTmFtZV0gPSBmaWVsZDtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDb25maWd1cmEgZWwgcmVtb3RlIGFwaTtcbiAgICAgICAgICAgIE1vZGVsLnJlbW90ZSA9IGZ1bmN0aW9uICh1cmwsIGFyZ3MsIGFjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0JywgJ29iamVjdCddKTtcblxuICAgICAgICAgICAgICAgICAgJHJlbW90ZSA9IGxiUmVzb3VyY2UodXJsLCBhcmdzLCBhY3Rpb25zKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBNb2RlbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgJHJlbW90ZSBkZWwgbW9kZWxvXG4gICAgICAgICAgICBNb2RlbC5nZXRSZW1vdGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiAkcmVtb3RlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgY29ycmVzcG9uZGllbnRlIGFsIGtleSBkZSB1biBvYmpldG9cbiAgICAgICAgICAgIE1vZGVsLmdldEtleUZyb20gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUoZGF0YSwgJGlkLmtleVBhdGgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgbGEgaW5zdGFuY2lhIGRlbCBtb2RlbCBkZSBsYXMgZ3VhcmRhZGFzLiBTaSBubyBleGlzdGUgZW50b25jZVxuICAgICAgICAgICAgLy8gc2UgY3JlYVxuICAgICAgICAgICAgTW9kZWwuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ3N0cmluZycsICdudW1iZXInLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgLy8gRWwgb2JqZXRvIG5vIHRpZW5lIElEXG4gICAgICAgICAgICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNb2RlbCgpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAvLyBObyBleGlzdGUgbGEgaW5zdGFuY2lhIGVudG9uY2Ugc2UgY3JlYVxuICAgICAgICAgICAgICAgICAgaWYgKCEkaW5zdGFuY2VzW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnN0YW5jZXNba2V5XSA9IG5ldyBNb2RlbCgpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gJGluc3RhbmNlc1trZXldO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQnVzY2EgdW4gcmVnaXN0cm8gZW4gbGEgb2JqZWN0U3RvcmUgZGVsIG1vZGVsby5cbiAgICAgICAgICAgIE1vZGVsLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcblxuICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuICAgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gTW9kZWwuZ2V0SW5zdGFuY2Uoa2V5KTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLiRsb2NhbExvYWRlZCkgcmV0dXJuIGluc3RhbmNlO1xuXG4gICAgICAgICAgICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIGluc3RhbmNlLiRwcm9taXNlID0gZGVmZXJlZC5wcm9taXNlO1xuXG4gICAgICAgICAgICAgICAgICAkZGIuZ2V0KCRtb2RlbE5hbWUsIGtleSkucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZGVsLmdldFZlcnNpb25PZihrZXkpLnByb21pc2UudGhlbihmdW5jdGlvbiAodmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuJHNldExvY2FsVmFsdWVzKGRhdGEsIHZlcnNpb24gPyB2ZXJzaW9uLmhhc2ggOiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGxvZy5lcnJvcihbJ01vZGVsLmdldFZlcnNpb25PZiBhbnkgZXJyb3InLCBlcnJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBCdXNjYXIgZW4gZWwgbW9kZWxvXG4gICAgICAgICAgICBNb2RlbC5maW5kID0gZnVuY3Rpb24gKGZpbHRlcnMpIHtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBpZGJRdWVyeSgkZGIsIE1vZGVsLCBmaWx0ZXJzKTs7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDcmVhIG51ZXZhcyBpbnN0YW5jaWFzIGRlIGxvcyBtb2RlbG9zXG4gICAgICAgICAgICBNb2RlbC5jcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgLy8gU2kgZXMgdW4gYXJyYXlcbiAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gTW9kZWwuZ2V0SW5zdGFuY2UoTW9kZWwuZ2V0S2V5RnJvbShkYXRhKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWNvcmQuJGxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5DYW50Q3JlYXRlZExvYWRlZEluc3RhbmNlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWNvcmQuJHB1bGwoKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgLy8gT2J0ZW5lciB1bmEgY29waWEgZGVsIGFycmF5XG4gICAgICAgICAgICAgICAgICB2YXIgYXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZGF0YSk7XG4gICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKGNiKTtcblxuICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIGl0ZXJhdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm8gcXVlZGFuIGVsZW1lbnRvcyBlbiBlbCBhcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyci5sZW5ndGggPT0gMCkgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZShyZXN1bHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhciBlbCBzaWd1aWVudGUgZWxlbWVudG9cbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZGVsLmNyZWF0ZShhcnIuc2hpZnQoKSkudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSkoKTtcblxuICAgICAgICAgICAgICAgICAgLy8gRGV2b2x2ZXIgZWwgcHJvbWlzZVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDcmVhIHVuIG1vZGVsbyBwYXJhIGd1YXJkYXIgbGFzIHZlcnNpb25lcyBkZWwgbW9kZWxvIGFjdHVhbFxuICAgICAgICAgICAgTW9kZWwudmVyc2lvbmluZyA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGNiKSB7XG4gICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1vZGVsTmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IgPSBtb2RlbE5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbE5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShbbW9kZWxOYW1lLCBjYl0sIFtbJ3N0cmluZycsICd1bmRlZmluZWQnXSwgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoISR2ZXJzaW9uaW5nKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpIGVsIG1vZGVsIG5vIHRpZW5lIG5vbWJyZSBzZSBhZ3JlZ2FcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbW9kZWxOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbE5hbWUgPSAkbW9kZWxOYW1lICsgJ192ZXJzaW9uaW5nJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXIgbW9kZWxvIHBhcmEgZWwgbWFuZWpvIGRlIGRhdG9zXG4gICAgICAgICAgICAgICAgICAgICAgICAkdmVyc2lvbmluZyA9ICRkYi5tb2RlbChtb2RlbE5hbWUpLmF1dG9JbmNyZW1lbnQoZmFsc2UpLmtleVBhdGgoJGlkLmtleVBhdGgpLmZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhhc2hcIjogeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZiAoY2IpIGNiKCR2ZXJzaW9uaW5nKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgbGEgaW5zdGFuY2lhIGRlIGxhIHZlcnNpb24gbG9jYWwgZGVsIHJlZ2lzdHJvXG4gICAgICAgICAgICBNb2RlbC5nZXRWZXJzaW9uT2YgPSBmdW5jdGlvbiAoa2V5KSB7XG5cbiAgICAgICAgICAgICAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCR2ZXJzaW9uaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdmVyc2lvbmluZy5nZXQoa2V5KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcmVkLnJlc29sdmUodmVyc2lvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcmVkLnJlamVjdChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBZ3JlZ2EgdW4gbWFuZGVqYWRvciBkZSBldmVudG9zIGFsIG1vZGVsb1xuICAgICAgICAgICAgTW9kZWwuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICghJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdID0gW107XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBNb2RlbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvIGRlbCBtb2RlbFxuICAgICAgICAgICAgTW9kZWwuZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3VuZGVmaW5lZCcsICdhcnJheSddXSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ubWFwKGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IuYXBwbHkoTW9kZWwsIGFyZ3MgfHwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBNb2RlbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0ID0gZnVuY3Rpb24gKGZpZWxkKSB7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKHRoaXMsIGZpZWxkKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBpbiB2YWxvciBhIHVuIGNhbXBvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJHNldCA9IGZ1bmN0aW9uIChmaWVsZCwgdmFsdWUpIHtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQsIHZhbHVlKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERldnVlbHZlIHVuIG9iamV0byBjb24gbGFzIHByb3BpZWRhZGVzIGRlbCByZWdpc3Ryb1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRnZXRWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IHt9O1xuICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEgfHwgdGhpcztcblxuICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoJGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RmllbGRWYWx1ZSh2YWx1ZXMsIGZpZWxkLCBnZXRGaWVsZFZhbHVlKGRhdGEsIGZpZWxkKSk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERldnVlbHZlIHVuIG9iamV0byBjb24gbGFzIHByb3BpZWRhZGVzIGxvY2FsZXMgZGVsIHJlZ2lzdHJvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJGdldExvY2FsVmFsdWVzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kZ2V0VmFsdWVzKHRoaXMuJGxvY2FsVmFsdWVzKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERldnVlbHZlIHVuIG1vZGVsbyBjb24gbGFzIHByb3BpZWRhZGVzIHJlbW90YXMgZGVsIHJlZ2lzdHJvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJGdldFJlbW90ZVZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGdldFZhbHVlcyh0aGlzLiRyZW1vdGVWYWx1ZXMpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQXNpZ25hIGxhcyBwcm9waWVkYWRlcyBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0VmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiR2ZXJzaW9uID0gdmVyc2lvbjtcblxuICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXouJGxvYWRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQXNpZ25hIGxhcyBwcm9waWVkYWRlcyBsb2NhbGVzIGRlbCByZWdpc3Ryb1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRzZXRMb2NhbFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhLCB2ZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgdGhpei4kbG9jYWxWZXJzaW9uID0gdmVyc2lvbjtcblxuICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRsb2NhbFZhbHVlcywgZmllbGQsIGRhdGFbZmllbGRdKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoIXRoaXouJGxvYWRlZCAmJiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGl6LiRzZXRWYWx1ZXMoZGF0YSwgdmVyc2lvbik7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQXNpZ25hIGxhcyBwcm9waWVkYWRlcyByZW1vdGFzIGRlbCByZWdpc3Ryb1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRzZXRSZW1vdGVWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSwgdmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXouJHJlbW90ZVZlcnNpb24gPSB2ZXJzaW9uO1xuXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJHJlbW90ZVZhbHVlcywgZmllbGQsIGRhdGFbZmllbGRdKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoIXRoaXouJGxvYWRlZCAmJiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGl6LiRzZXRWYWx1ZXMoZGF0YSwgdmVyc2lvbik7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQXNpZ25hIGVsIElEIGRlbCBvYmpldG9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0S2V5ID0gZnVuY3Rpb24gKG5ld0tleSkge1xuXG4gICAgICAgICAgICAgICAgICB2YXIgb2xkS2V5ID0gTW9kZWwuZ2V0S2V5RnJvbSh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgTW9kZWwuc2VhcmNoRGVlcEZpZWxkKHRoaXMsICRpZC5rZXlQYXRoLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ialtsYXN0RmllbGRdID0gbmV3S2V5O1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChvbGRLZXkgIT09IG5ld0tleSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkS2V5ICYmICRpbnN0YW5jZXNbb2xkS2V5XSAmJiAkaW5zdGFuY2VzW29sZEtleV0gIT0gdGhpcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5JbnN0YW5jZU9mT2xkS2V5SXNOb3RTYW1lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3S2V5ICYmICRpbnN0YW5jZXNbbmV3S2V5XSAmJiAkaW5zdGFuY2VzW25ld0tleV0gIT0gdGhpcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5JbnN0YW5jZU9mTmV3S2V5SXNOb3RTYW1lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVsaW1pbmFyIGFudGVyaW9yXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkS2V5ICYmICRpbnN0YW5jZXNbb2xkS2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlICRpbnN0YW5jZXNbb2xkS2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWdyZWdhciBudWV2YVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0tleSAmJiAhJGluc3RhbmNlc1tuZXdLZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5zdGFuY2VzW25ld0tleV0gPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIENvbnN0dXJjdG9yIHF1ZSBzZSBwdWVkZSBzb2JyZSBlc2NyaWJpclxuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7fTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgc2kgZWwgb2JqZXRvIGVzdMOhIGFsbWFjZW5hZG9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kaXNTdG9yZWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiAkaW5zdGFuY2VzW3RoaXMuJGdldCgkaWQua2V5UGF0aCldID09PSB0aGlzO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gR3VhcmRhIGxvcyBkYXRvcyBkZWwgb2JqZXRvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJHB1bGwgPSBmdW5jdGlvbiAobmV3VmFsdWVzLCB2ZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZXMgPSB0aGl6LiRnZXRWYWx1ZXMobmV3VmFsdWVzKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZXMgPSB0aGl6LiRnZXRSZW1vdGVWYWx1ZXMoKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgdmFyIG5ld0tleSA9IE1vZGVsLmdldEtleUZyb20obmV3VmFsdWVzKTtcbiAgICAgICAgICAgICAgICAgIHZhciBvbGRWYWx1ZXMgPSB0aGl6LiRnZXRMb2NhbFZhbHVlcygpO1xuICAgICAgICAgICAgICAgICAgdmFyIG9sZEtleSA9IE1vZGVsLmdldEtleUZyb20ob2xkVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobmV3S2V5LCBvbGRLZXkpO1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobmV3VmFsdWVzLCBvbGRWYWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgICAvLyBpZiAob2xkS2V5ICE9PSBuZXdLZXkpIHtcblxuICAgICAgICAgICAgICAgICAgLy8gICBpZiAob2xkS2V5ICYmIG5ld0tleSl7XG4gICAgICAgICAgICAgICAgICAvLyAgICAgTW9kZWwuZ2V0KG9sZEtleSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAob2xkSW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgIC8vICAgICAgIE1vZGVsLmdldChuZXdLZXkpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKG5ld0luc3RhbmNlKSB7XG5cbiAgICAgICAgICAgICAgICAgIC8vICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgICAgICAgLy8gICB9XG5cbiAgICAgICAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBGdW5jaW9uIHF1ZSBoYWNlIGVzY3VjaGFycyBsb3MgbWVuc2FqZXMgZGVsIHNvY2tldCBwYXJhIGVsIG1vZGVsXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJGxpc3RlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlmICghJHNvY2tldCkgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5Eb2VzTm90SGF2ZVNvY2tldEluc3RhbmNlJyk7XG5cbiAgICAgICAgICAgICAgICAgIC8vIENyZWFyIHVuYSBzdWJzY3JpcGNpb24gYWwgc29ja2V0IHBhcmEgY3VhbmRvIHNlIHJlY2liYW4gZGF0b3NcbiAgICAgICAgICAgICAgICAgIC8vIHBhcmEgbGEgaW5zdGFuY2lhIGFjdHVhbFxuICAgICAgICAgICAgICAgICAgJHNvY2tldC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxOYW1lOiAkbW9kZWxOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiAndXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsSWQ6IHRoaXouJGdldChNb2RlbC5nZXRLZXlQYXRoKCkpXG4gICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBIHJlY2liaXIgZGF0b3MgZGVsIHNvY2tldCBhc2lnbmFyIGxvcyB2YWxvcmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFbWl0aXIgZXZlbnRvIGRlIGRhdG9zIHJlY2liaWRvciBwYXJhIGVsIG1vZGVsb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpei4kc2V0UmVtb3RlVmFsdWVzKGRhdGEudmFsdWVzLCBkYXRhLnZlcnNpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFncmVnYSB1biBtYW5kZWphZG9yIGRlIGV2ZW50b3NcbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICghdGhpcy4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICB0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGlzcGFyYSB1biBldmVudG9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3VuZGVmaW5lZCcsICdhcnJheSddXSk7XG5cbiAgICAgICAgICAgICAgICAgIC8vIExsYW1hciBlbCBldmVudG8gcGFyYSBlbCBtb2RlbG9cbiAgICAgICAgICAgICAgICAgIE1vZGVsLmVtaXQoZXZlbnROYW1lLCBbdGhpeiwgW10uY29uY2F0KFt0aGl6XSkuY29uY2F0KGFyZ3MpXSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICh0aGl6LiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGl6LiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLm1hcChmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiLmFwcGx5KHRoaXosIGFyZ3MgfHwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgTW9kZWwuJGluc3RhbmNlcyA9ICRpbnN0YW5jZXM7XG5cbiAgICAgICAgICAgIHJldHVybiBNb2RlbDtcbiAgICAgIH07XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiTW9kZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiUXVlcnkgKCRsb2csIHFzLCBpZGJVdGlscywgaWRiRXZlbnRzKSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIGlkYlF1ZXJ5KCRkYiwgJE1vZGVsLCAkZmlsdGVycykgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnZnVuY3Rpb24nLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgIGxldCAkcmVzdWx0ID0gbnVsbDtcclxuXHJcbiAgICAvLyBGdW5jaW9uIHF1ZSBkZXZ1ZWx2ZSBlamVjdXRhIGVsIHF1ZXJ5IHkgZGV2dWVsdmUgZWwgcmVzdWx0YWRvLlxyXG4gICAgdGhpei5nZXRSZXN1bHQgPSBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIC8vIEVqZWN1dGFyIHNpIG5vIHNlIGhhIGVqZWN1dGFkb1xyXG4gICAgICBpZiAoISRyZXN1bHQpIHtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgICAgICAkcmVzdWx0ID0gW107XHJcbiAgICAgICAgJHJlc3VsdC4kcmVzb2x2ZWQgPSBmYWxzZTtcclxuICAgICAgICAkcmVzdWx0LiRwcm9taXNlID0gZGVmZXJlZC5wcm9taXNlO1xyXG5cclxuICAgICAgICAkZGIub3BlbkN1cnNvcigkTW9kZWwuZ2V0TW9kZWxOYW1lKCksICRmaWx0ZXJzLCBmdW5jdGlvbiAoZGF0YSwgbmV4dCkge1xyXG5cclxuICAgICAgICAgIGNvbnN0IGtleSA9ICRNb2RlbC5nZXRLZXlGcm9tKGRhdGEpO1xyXG5cclxuICAgICAgICAgIC8vIE9idGVuZXIgbGEgaW5zdGFuY2lhXHJcbiAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9ICRNb2RlbC5nZXRJbnN0YW5jZShrZXkpO1xyXG5cclxuICAgICAgICAgICRNb2RlbC5nZXRWZXJzaW9uT2Yoa2V5KS5wcm9taXNlXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgIGluc3RhbmNlLiRzZXRMb2NhbFZhbHVlcyhkYXRhLCB2ZXJzaW9uPyB2ZXJzaW9uLmhhc2ggOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgaW5zdGFuY2UuJGVtaXQoaWRiRXZlbnRzLk1PREVMX1FVRVJJRUQsIHRoaXopO1xyXG5cclxuICAgICAgICAgICAgICAvLyBBZ3JlZ2FyIGFsIHJlc3VsdGFkb1xyXG4gICAgICAgICAgICAgICRyZXN1bHQucHVzaChpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIEJ1c2NhciBzaWd1aWVudGVcclxuICAgICAgICAgICAgICBuZXh0KCk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG5cclxuICAgICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICRsb2cuZXJyb3IoWydNb2RlbC5nZXRWZXJzaW9uT2YgYW55IGVycm9yJywgZXJyXSlcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KS5wcm9taXNlXHJcblxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAkcmVzdWx0LiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoJHJlc3VsdCk7XHJcbiAgICAgICAgICB0aGl6LmdldFJlbW90ZVJlc3VsdCgpO1xyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG5cclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuICRyZXN1bHQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBPYnRpZW5lIGVsIHJlc3VsdGFkbyBkZSB2YWxvcmVzIHJlbW90b3NcclxuICAgIHRoaXouZ2V0UmVtb3RlUmVzdWx0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICBsZXQgJHJlbW90ZSA9ICRNb2RlbC5nZXRSZW1vdGUoKTtcclxuICAgICAgbGV0ICRyZW1vdGVSZXN1bHQgPSBudWxsO1xyXG5cclxuICAgICAgaWYgKCRyZW1vdGUgJiYgdHlwZW9mICRyZW1vdGUuZmluZCA9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgKCRyZW1vdGVSZXN1bHQgPSAkcmVtb3RlLmZpbmQoJGZpbHRlcnMpLiRwcm9taXNlKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXN1bHQubWFwKGZ1bmN0aW9uIChyZWNvcmQsIGkpIHtcclxuXHJcbiAgICAgICAgICAgICAgJE1vZGVsLmdldCgkTW9kZWwuZ2V0S2V5RnJvbShyZWNvcmQudmFsdWVzKSkuJHByb21pc2VcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgkcmVjb3JkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAkcmVjb3JkLiRzZXRSZW1vdGVWYWx1ZXMocmVjb3JkLnZhbHVlcywgcmVjb3JkLnZlcnNpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKCRyZXN1bHRbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHJlc3VsdFtpXSAhPT0gJHJlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdFtpXS4kZW1pdChpZGJFdmVudHMuTU9ERUxfVU5RVUVSSUVELCBbdGhpel0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkcmVzdWx0W2ldID0gJHJlY29yZDtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkcmVzdWx0LnB1c2goJHJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICRyZWNvcmQuJGVtaXQoaWRiRXZlbnRzLk1PREVMX1FVRVJJRUQsIFt0aGl6XSk7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAkcmVtb3RlUmVzdWx0O1xyXG5cclxuICAgIH07XHJcblxyXG4gIH1cclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJRdWVyeTtcbmZ1bmN0aW9uIGlkYlF1ZXJ5KCRsb2csIHFzLCBpZGJVdGlscywgaWRiRXZlbnRzKSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGlkYlF1ZXJ5KCRkYiwgJE1vZGVsLCAkZmlsdGVycykge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgJ2Z1bmN0aW9uJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgIHZhciAkcmVzdWx0ID0gbnVsbDtcblxuICAgIC8vIEZ1bmNpb24gcXVlIGRldnVlbHZlIGVqZWN1dGEgZWwgcXVlcnkgeSBkZXZ1ZWx2ZSBlbCByZXN1bHRhZG8uXG4gICAgdGhpei5nZXRSZXN1bHQgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgLy8gRWplY3V0YXIgc2kgbm8gc2UgaGEgZWplY3V0YWRvXG4gICAgICBpZiAoISRyZXN1bHQpIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcbiAgICAgICAgICAkcmVzdWx0ID0gW107XG4gICAgICAgICAgJHJlc3VsdC4kcmVzb2x2ZWQgPSBmYWxzZTtcbiAgICAgICAgICAkcmVzdWx0LiRwcm9taXNlID0gZGVmZXJlZC5wcm9taXNlO1xuXG4gICAgICAgICAgJGRiLm9wZW5DdXJzb3IoJE1vZGVsLmdldE1vZGVsTmFtZSgpLCAkZmlsdGVycywgZnVuY3Rpb24gKGRhdGEsIG5leHQpIHtcblxuICAgICAgICAgICAgdmFyIGtleSA9ICRNb2RlbC5nZXRLZXlGcm9tKGRhdGEpO1xuXG4gICAgICAgICAgICAvLyBPYnRlbmVyIGxhIGluc3RhbmNpYVxuICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gJE1vZGVsLmdldEluc3RhbmNlKGtleSk7XG5cbiAgICAgICAgICAgICRNb2RlbC5nZXRWZXJzaW9uT2Yoa2V5KS5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKHZlcnNpb24pIHtcblxuICAgICAgICAgICAgICBpbnN0YW5jZS4kc2V0TG9jYWxWYWx1ZXMoZGF0YSwgdmVyc2lvbiA/IHZlcnNpb24uaGFzaCA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGluc3RhbmNlLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9RVUVSSUVELCB0aGl6KTtcblxuICAgICAgICAgICAgICAvLyBBZ3JlZ2FyIGFsIHJlc3VsdGFkb1xuICAgICAgICAgICAgICAkcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xuXG4gICAgICAgICAgICAgIC8vIEJ1c2NhciBzaWd1aWVudGVcbiAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXG4gICAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICRsb2cuZXJyb3IoWydNb2RlbC5nZXRWZXJzaW9uT2YgYW55IGVycm9yJywgZXJyXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KS5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAkcmVzdWx0LiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoJHJlc3VsdCk7XG4gICAgICAgICAgICB0aGl6LmdldFJlbW90ZVJlc3VsdCgpO1xuICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblxuICAgICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICRyZXN1bHQ7XG4gICAgfTtcblxuICAgIC8vIE9idGllbmUgZWwgcmVzdWx0YWRvIGRlIHZhbG9yZXMgcmVtb3Rvc1xuICAgIHRoaXouZ2V0UmVtb3RlUmVzdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB2YXIgJHJlbW90ZSA9ICRNb2RlbC5nZXRSZW1vdGUoKTtcbiAgICAgIHZhciAkcmVtb3RlUmVzdWx0ID0gbnVsbDtcblxuICAgICAgaWYgKCRyZW1vdGUgJiYgdHlwZW9mICRyZW1vdGUuZmluZCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICgkcmVtb3RlUmVzdWx0ID0gJHJlbW90ZS5maW5kKCRmaWx0ZXJzKS4kcHJvbWlzZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0Lm1hcChmdW5jdGlvbiAocmVjb3JkLCBpKSB7XG5cbiAgICAgICAgICAgICRNb2RlbC5nZXQoJE1vZGVsLmdldEtleUZyb20ocmVjb3JkLnZhbHVlcykpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKCRyZWNvcmQpIHtcblxuICAgICAgICAgICAgICAkcmVjb3JkLiRzZXRSZW1vdGVWYWx1ZXMocmVjb3JkLnZhbHVlcywgcmVjb3JkLnZlcnNpb24pO1xuXG4gICAgICAgICAgICAgIGlmICgkcmVzdWx0W2ldKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRyZXN1bHRbaV0gIT09ICRyZWNvcmQpIHtcbiAgICAgICAgICAgICAgICAgICRyZXN1bHRbaV0uJGVtaXQoaWRiRXZlbnRzLk1PREVMX1VOUVVFUklFRCwgW3RoaXpdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHJlc3VsdFtpXSA9ICRyZWNvcmQ7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHJlc3VsdC5wdXNoKCRyZWNvcmQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgJHJlY29yZC4kZW1pdChpZGJFdmVudHMuTU9ERUxfUVVFUklFRCwgW3RoaXpdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICRyZW1vdGVSZXN1bHQ7XG4gICAgfTtcbiAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYlNvY2tldFNlcnZpY2UoJGxvZywgaW8sIGlkYlV0aWxzKSB7ICduZ0luamVjdCc7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gIFxyXG4gIGxldCAkZGVmVXJsU2VydmVyID0gbnVsbDtcclxuXHJcbiAgZnVuY3Rpb24gaWRiU29ja2V0ICgkdXJsU2VydmVyLCAkYWNjZXNzVG9rZW5JZCwgJGN1cnJlbnRVc2VySWQpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ10sIFsnc3RyaW5nJywgJ251bWJlciddXSk7XHJcblxyXG4gICAgY29uc3QgJGxpc3RlbmVycyA9ICBbXTtcclxuICAgIGxldCAkc29ja2V0ID0gbnVsbDtcclxuICAgICR1cmxTZXJ2ZXIgPSAkdXJsU2VydmVyIHx8ICRkZWZVcmxTZXJ2ZXI7XHJcblxyXG4gICAgLy8gQ29uZWN0YXJzZSBhbCBzZXJ2aWRvclxyXG4gICAgdGhpei5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBcclxuICAgICAgLy8gQ3JlYXRpbmcgY29ubmVjdGlvbiB3aXRoIHNlcnZlclxyXG4gICAgICAkc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsU2VydmVyKTtcclxuXHJcbiAgICAgIC8vIFRoaXMgcGFydCBpcyBvbmx5IGZvciBsb2dpbiB1c2VycyBmb3IgYXV0aGVudGljYXRlZCAkc29ja2V0IGNvbm5lY3Rpb24gYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlci5cclxuICAgICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXHJcblxyXG4gICAgICAkc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkbG9nLmxvZygnY29ubmVjdGVkJyk7XHJcblxyXG4gICAgICAgICRzb2NrZXQuZW1pdCgnYXV0aGVudGljYXRpb24nLCB7XHJcbiAgICAgICAgICBpZDogJGFjY2Vzc1Rva2VuSWQsXHJcbiAgICAgICAgICB1c2VySWQ6ICRjdXJyZW50VXNlcklkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRzb2NrZXQub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIC8vIHVzZSB0aGUgJHNvY2tldCBhcyB1c3VhbFxyXG4gICAgICAgICAgJGxvZy5sb2coJ1VzZXIgaXMgYXV0aGVudGljYXRlZCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgdmFyIG5hbWUgPSBvcHRpb25zLm1vZGVsTmFtZSArICcuJyArIG9wdGlvbnMuZXZlbnROYW1lO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgbmFtZSA9IG5hbWUgKyAnLicgKyBvcHRpb25zLm1vZGVsSWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRzb2NrZXQub24obmFtZSwgY2IpO1xyXG4gICAgICBcclxuICAgICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxyXG4gICAgICAkbGlzdGVuZXJzLnB1c2gobmFtZSwgY2IpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wdXNoTGlzdGVuZXIgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSwgY2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICRsaXN0ZW5lcnMucHVzaChzdWJzY3JpcHRpb25OYW1lKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSkge1xyXG4gICAgICAkc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTsgIFxyXG4gICAgICB2YXIgaWR4ID0gJGxpc3RlbmVycy5pbmRleE9mKHN1YnNjcmlwdGlvbk5hbWUpO1xyXG4gICAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgICAkbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouY29ubmVjdCgpO1xyXG5cclxuICB9O1xyXG5cclxuICAvLyBBc2lnbmEgbGEgVVJMIGRlIHNlcnZpZG9yIHBvciBkZWZlY3RvXHJcbiAgaWRiU29ja2V0LnNldFVybFNlcnZlciA9IGZ1bmN0aW9uICh1cmxTZXJ2ZXIpIHtcclxuICAgICRkZWZVcmxTZXJ2ZXIgPSB1cmxTZXJ2ZXI7XHJcbiAgfTtcclxuXHJcbiAgLy8gQVNpZ25hIGxhcyBjcmVkZW5jaWFsZXMgcG9yIGRlZmVjdG9cclxuICBpZGJTb2NrZXQuc2V0Q3JlZGVudGlhbHMgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCkge1xyXG4gICAgYWNjZXNzVG9rZW5JZCA9ICRhY2Nlc3NUb2tlbklkXHJcbiAgICBjdXJyZW50VXNlcklkID0gJGN1cnJlbnRVc2VySWQ7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGlkYlNvY2tldDtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJTb2NrZXQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJTb2NrZXRTZXJ2aWNlO1xuZnVuY3Rpb24gaWRiU29ja2V0U2VydmljZSgkbG9nLCBpbywgaWRiVXRpbHMpIHtcbiAgJ25nSW5qZWN0JztcbiAgdmFyIHRoaXogPSB0aGlzO1xuXG4gIHZhciAkZGVmVXJsU2VydmVyID0gbnVsbDtcblxuICBmdW5jdGlvbiBpZGJTb2NrZXQoJHVybFNlcnZlciwgJGFjY2Vzc1Rva2VuSWQsICRjdXJyZW50VXNlcklkKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3N0cmluZycsICdudW1iZXInXSwgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcblxuICAgIHZhciAkbGlzdGVuZXJzID0gW107XG4gICAgdmFyICRzb2NrZXQgPSBudWxsO1xuICAgICR1cmxTZXJ2ZXIgPSAkdXJsU2VydmVyIHx8ICRkZWZVcmxTZXJ2ZXI7XG5cbiAgICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXG4gICAgdGhpei5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyBDcmVhdGluZyBjb25uZWN0aW9uIHdpdGggc2VydmVyXG4gICAgICAkc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsU2VydmVyKTtcblxuICAgICAgLy8gVGhpcyBwYXJ0IGlzIG9ubHkgZm9yIGxvZ2luIHVzZXJzIGZvciBhdXRoZW50aWNhdGVkICRzb2NrZXQgY29ubmVjdGlvbiBiZXR3ZWVuIGNsaWVudCBhbmQgc2VydmVyLlxuICAgICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXG5cbiAgICAgICRzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRsb2cubG9nKCdjb25uZWN0ZWQnKTtcblxuICAgICAgICAkc29ja2V0LmVtaXQoJ2F1dGhlbnRpY2F0aW9uJywge1xuICAgICAgICAgIGlkOiAkYWNjZXNzVG9rZW5JZCxcbiAgICAgICAgICB1c2VySWQ6ICRjdXJyZW50VXNlcklkXG4gICAgICAgIH0pO1xuICAgICAgICAkc29ja2V0Lm9uKCdhdXRoZW50aWNhdGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIHVzZSB0aGUgJHNvY2tldCBhcyB1c3VhbFxuICAgICAgICAgICRsb2cubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpei5zdWJzY3JpYmUgPSBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIHZhciBuYW1lID0gb3B0aW9ucy5tb2RlbE5hbWUgKyAnLicgKyBvcHRpb25zLmV2ZW50TmFtZTtcblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lICsgJy4nICsgb3B0aW9ucy5tb2RlbElkO1xuICAgICAgfVxuXG4gICAgICAkc29ja2V0Lm9uKG5hbWUsIGNiKTtcblxuICAgICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxuICAgICAgJGxpc3RlbmVycy5wdXNoKG5hbWUsIGNiKTtcbiAgICB9O1xuXG4gICAgdGhpei5wdXNoTGlzdGVuZXIgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICRsaXN0ZW5lcnMucHVzaChzdWJzY3JpcHRpb25OYW1lKTtcbiAgICB9O1xuXG4gICAgdGhpei51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lKSB7XG4gICAgICAkc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTtcbiAgICAgIHZhciBpZHggPSAkbGlzdGVuZXJzLmluZGV4T2Yoc3Vic2NyaXB0aW9uTmFtZSk7XG4gICAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICAgICRsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXouY29ubmVjdCgpO1xuICB9O1xuXG4gIC8vIEFzaWduYSBsYSBVUkwgZGUgc2Vydmlkb3IgcG9yIGRlZmVjdG9cbiAgaWRiU29ja2V0LnNldFVybFNlcnZlciA9IGZ1bmN0aW9uICh1cmxTZXJ2ZXIpIHtcbiAgICAkZGVmVXJsU2VydmVyID0gdXJsU2VydmVyO1xuICB9O1xuXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXG4gIGlkYlNvY2tldC5zZXRDcmVkZW50aWFscyA9IGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XG4gICAgYWNjZXNzVG9rZW5JZCA9ICRhY2Nlc3NUb2tlbklkO1xuICAgIGN1cnJlbnRVc2VySWQgPSAkY3VycmVudFVzZXJJZDtcbiAgfTtcblxuICByZXR1cm4gaWRiU29ja2V0O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYlNvY2tldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxiIChtb2R1bGUpIHtcclxuXHJcbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcclxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xyXG4gICAgY29uc3QgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xyXG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGxldCB1cmxCYXNlSG9zdCA9IGxvY2F0aW9uLmhvc3Q7XHJcblxyXG4gIGNvbnN0IGxiQXV0aCA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnXHJcbiAgICBjb25zdCBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcclxuICAgIGNvbnN0IHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcclxuICAgIFxyXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcclxuICAgIC8vIFdlIGFyZSB1c2luZyBlbXB0eSBzdHJpbmcgYXMgYSBtYXJrZXIgZm9yIG51bGwvdW5kZWZpbmVkIHZhbHVlcy5cclxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XHJcbiAgICAgICAgc3RvcmFnZVtrZXldID0gdmFsdWU7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZChuYW1lKSB7XHJcbiAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVtrZXldIHx8IHNlc3Npb25TdG9yYWdlW2tleV0gfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsYkF1dGgoKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpeltuYW1lXSA9IGxvYWQobmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBjb25zdCBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbihhY2Nlc3NUb2tlbklkLCB1c2VySWQsIHVzZXJEYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc2Vzc2lvblN0b3JhZ2UsIG5hbWUsIG51bGwpO1xyXG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XHJcblxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uKCRxLCBsYkF1dGgpIHsgJ25nSW5qZWN0JztcclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVxdWVzdDogZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xyXG4gICAgICAgIGNvbnN0IGhvc3QgPSBnZXRIb3N0KGNvbmZpZy51cmwpO1xyXG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XHJcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XHJcbiAgICAgICAgICBjb25maWcuaGVhZGVyc1thdXRoSGVhZGVyXSA9IGxiQXV0aC5hY2Nlc3NUb2tlbklkO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XHJcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxyXG4gICAgICAgICAgLy8gdGhlcmUgaXMgbm8gdXNlciBsb2dnZWQgaW5cclxuICAgICAgICAgIGNvbnN0IHJlcyA9IHtcclxuICAgICAgICAgICAgYm9keTogeyBlcnJvcjogeyBzdGF0dXM6IDQwMSB9fSxcclxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXHJcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbigpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnOyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcclxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nLFxyXG4gICAgfTtcclxuXHJcbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyIFRoZSBoZWFkZXIgbmFtZSB0byB1c2UsIGUuZy4gYFgtQWNjZXNzLVRva2VuYFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25maWd1cmUgdGhlIFJFU1QgdHJhbnNwb3J0IHRvIHVzZSBhIGRpZmZlcmVudCBoZWFkZXIgZm9yIHNlbmRpbmdcclxuICAgICAqIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi4gSXQgaXMgc2VudCBpbiB0aGUgYEF1dGhvcml6YXRpb25gIGhlYWRlclxyXG4gICAgICogYnkgZGVmYXVsdC5cclxuICAgICAqL1xyXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oaGVhZGVyKSB7XHJcbiAgICAgIG9wdGlvbnMuYXV0aEhlYWRlciA9IGhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBoZWFkZXIgbmFtZSB0aGF0IGlzIHVzZWQgZm9yIHNlbmRpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB1c2UsIGUuZy4gYC9hcGlgIG9yIGAvL2V4YW1wbGUuY29tL2FwaWAuXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENoYW5nZSB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIEJ5IGRlZmF1bHQsIHRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgb3B0aW9ucy51cmxCYXNlID0gdXJsO1xyXG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xyXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uKCRyZXNvdXJjZSkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xyXG4gICAgICAgICAgYWN0aW9uc1trZXldLnVybCA9IG9wdGlvbnMudXJsQmFzZSArIGFjdGlvbnNba2V5XS51cmw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcclxuXHJcbiAgICAgICAgLy8gQW5ndWxhciBhbHdheXMgY2FsbHMgUE9TVCBvbiAkc2F2ZSgpXHJcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXHJcbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xyXG4gICAgICAgIHJlc291cmNlLnByb3RvdHlwZS4kc2F2ZSA9IGZ1bmN0aW9uKHN1Y2Nlc3MsIGVycm9yKSB7XHJcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxyXG4gICAgICAgICAgLy8gdGhhdCBleGFjdGx5IGZpdHMgb3VyIG5lZWRzLlxyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcclxuICAgICAgICAgIHJldHVybiByZXN1bHQuJHByb21pc2UgfHwgcmVzdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XHJcbiAgICAgIH07XHJcbiAgICBcclxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kdWxlXHJcbiAgICAuZmFjdG9yeSgnbGJBdXRoJywgbGJBdXRoKVxyXG4gICAgLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSlcclxuICAgIC5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpXHJcbiAgICAuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uKCRodHRwUHJvdmlkZXIpIHsgJ25nSW5qZWN0JztcclxuICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XHJcbiAgICB9XSk7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvbGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBsYjtcbmZ1bmN0aW9uIGxiKG1vZHVsZSkge1xuXG4gIC8vIER2dWVsdmUgZWwgaG9zdCBkZSB1bmEgVVJMXG4gIGZ1bmN0aW9uIGdldEhvc3QodXJsKSB7XG4gICAgdmFyIG0gPSB1cmwubWF0Y2goL14oPzpodHRwcz86KT9cXC9cXC8oW15cXC9dKykvKTtcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBudWxsO1xuICB9XG5cbiAgdmFyIHVybEJhc2VIb3N0ID0gbG9jYXRpb24uaG9zdDtcblxuICB2YXIgbGJBdXRoID0gZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB2YXIgcHJvcHMgPSBbJ2FjY2Vzc1Rva2VuSWQnLCAnY3VycmVudFVzZXJJZCcsICdyZW1lbWJlck1lJ107XG4gICAgdmFyIHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcblxuICAgIC8vIE5vdGU6IExvY2FsU3RvcmFnZSBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gc3RyaW5nXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9ICcnO1xuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2Fubm90IGFjY2VzcyBsb2NhbC9zZXNzaW9uIHN0b3JhZ2U6JywgZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGl6W25hbWVdID0gbG9hZChuYW1lKTtcbiAgICAgIH0pO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zZXRVc2VyID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IHVzZXJEYXRhO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyVXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzZXNzaW9uU3RvcmFnZSwgbmFtZSwgbnVsbCk7XG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IGxiQXV0aCgpO1xuICB9O1xuXG4gIHZhciBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbiBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IoJHEsIGxiQXV0aCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVxdWVzdDogZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xuICAgICAgICB2YXIgaG9zdCA9IGdldEhvc3QoY29uZmlnLnVybCk7XG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYkF1dGguYWNjZXNzVG9rZW5JZCkge1xuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzW2F1dGhIZWFkZXJdID0gbGJBdXRoLmFjY2Vzc1Rva2VuSWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XG4gICAgICAgICAgLy8gUmV0dXJuIGEgc3R1YiA0MDEgZXJyb3IgZm9yIFVzZXIuZ2V0Q3VycmVudCgpIHdoZW5cbiAgICAgICAgICAvLyB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpblxuICAgICAgICAgIHZhciByZXMgPSB7XG4gICAgICAgICAgICBib2R5OiB7IGVycm9yOiB7IHN0YXR1czogNDAxIH0gfSxcbiAgICAgICAgICAgIHN0YXR1czogNDAxLFxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbiBoZWFkZXJzKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKCkge1xuICAgICduZ0luamVjdCc7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcbiAgICAgIGF1dGhIZWFkZXI6ICdhdXRob3JpemF0aW9uJ1xuICAgIH07XG5cbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXIgVGhlIGhlYWRlciBuYW1lIHRvIHVzZSwgZS5nLiBgWC1BY2Nlc3MtVG9rZW5gXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENvbmZpZ3VyZSB0aGUgUkVTVCB0cmFuc3BvcnQgdG8gdXNlIGEgZGlmZmVyZW50IGhlYWRlciBmb3Igc2VuZGluZ1xyXG4gICAgICogdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLiBJdCBpcyBzZW50IGluIHRoZSBgQXV0aG9yaXphdGlvbmAgaGVhZGVyXHJcbiAgICAgKiBieSBkZWZhdWx0LlxyXG4gICAgICovXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKGhlYWRlcikge1xuICAgICAgb3B0aW9ucy5hdXRoSGVhZGVyID0gaGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIGhlYWRlciBuYW1lIHRoYXQgaXMgdXNlZCBmb3Igc2VuZGluZyB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uXHJcbiAgICAgKi9cbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHVzZSwgZS5nLiBgL2FwaWAgb3IgYC8vZXhhbXBsZS5jb20vYXBpYC5cclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ2hhbmdlIHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gQnkgZGVmYXVsdCwgdGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICBvcHRpb25zLnVybEJhc2UgPSB1cmw7XG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XG4gICAgfTtcblxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcbiAgICAgICduZ0luamVjdCc7XG5cbiAgICAgIHZhciBsYlJlc291cmNlID0gZnVuY3Rpb24gbGJSZXNvdXJjZSh1cmwsIHBhcmFtcywgYWN0aW9ucykge1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgYWN0aW9uc1trZXldLm9yaWdpbmFsVXJsID0gYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgICBhY3Rpb25zW2tleV0udXJsID0gb3B0aW9ucy51cmxCYXNlICsgYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcblxuICAgICAgICAvLyBBbmd1bGFyIGFsd2F5cyBjYWxscyBQT1NUIG9uICRzYXZlKClcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXG4gICAgICAgIC8vIGh0dHA6Ly9raXJrYnVzaGVsbC5tZS9hbmd1bGFyLWpzLXVzaW5nLW5nLXJlc291cmNlLWluLWEtbW9yZS1yZXN0ZnVsLW1hbm5lci9cbiAgICAgICAgcmVzb3VyY2UucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgLy8gRm9ydHVuYXRlbHksIExvb3BCYWNrIHByb3ZpZGVzIGEgY29udmVuaWVudCBgdXBzZXJ0YCBtZXRob2RcbiAgICAgICAgICAvLyB0aGF0IGV4YWN0bHkgZml0cyBvdXIgbmVlZHMuXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc291cmNlLnVwc2VydC5jYWxsKHRoaXMsIHt9LCB0aGlzLCBzdWNjZXNzLCBlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC4kcHJvbWlzZSB8fCByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXNvdXJjZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBsYlJlc291cmNlO1xuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIG1vZHVsZS5mYWN0b3J5KCdsYkF1dGgnLCBsYkF1dGgpLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSkuZmFjdG9yeSgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJywgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yKS5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XG4gIH1dKTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9sYi5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=