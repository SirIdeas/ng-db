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
	
	var _idbSocket = __webpack_require__(7);
	
	var _idbSocket2 = _interopRequireDefault(_idbSocket);
	
	var _idb = __webpack_require__(4);
	
	var _idb2 = _interopRequireDefault(_idb);
	
	var _idbModel = __webpack_require__(5);
	
	var _idbModel2 = _interopRequireDefault(_idbModel);
	
	var _idbQuery = __webpack_require__(6);
	
	var _idbQuery2 = _interopRequireDefault(_idbQuery);
	
	var _lb = __webpack_require__(8);
	
	var _lb2 = _interopRequireDefault(_lb);
	
	__webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _lb2.default)(angular.module('ng.idb', ['ng.v1.idb'])).service('idbEvents', _idbEvents2.default).service('idbUtils', _idbUtils2.default).service('qs', _qs2.default)
	
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
	    MODEL_REPLACE: 'model.replace',
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
	
	                  var $results = [];
	
	                  thiz
	
	                  // Cuando sea consultado agregar la consulta
	                  .$bind(idbEvents.MODEL_QUERIED, function (result) {
	                        $results.push(result);
	                  })
	
	                  // Cuando sea liberado de la consultar quitar de las consultas
	                  .$bind(idbEvents.MODEL_UNQUERIED, function (result) {
	                        var idx = $results.indexOf(result);
	                        if (idx != -1) {
	                              $results.splice(idx, 1);
	                        }
	                  })
	
	                  // Evento de que modelo está instanciado
	                  .$emit(idbEvents.MODEL_INSTANCED);
	            };
	
	            // Devuelv el nombre del modelo
	            Model.getModelName = function () {
	
	                  return $modelName;
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
	
	                  var instance = Model.getInstance(key);
	
	                  if (instance.$localLoaded) return instance;
	
	                  var defered = qs.defer();
	
	                  instance.$resolved = false;
	                  instance.$promise = defered.promise;
	
	                  $db.get($modelName, key).promise.then(function (data) {
	                        instance.$resolved = true;
	
	                        Model.getVersionOf(key).promise.then(function (version) {
	                              instance.$setLocalValues(data, data && version ? version.hash : undefined);
	                              defered.resolve(instance);
	                        }).catch(function (err) {
	                              defered.resolve(instance);
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
	
	                  if (data) {
	                        thiz.$localLoaded = true;
	                        if (!thiz.$loaded) {
	                              thiz.$setValues(data, version);
	                        }
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
	
	                  if (data) {
	                        thiz.$remoteLoaded = true;
	                        if (!thiz.$loaded) {
	                              thiz.$setValues(data, version);
	                        }
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
	                        modelId: thiz.$get($id.keyPath)
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
	
	            if (instance.$localLoaded) return next();
	
	            $Model.getVersionOf(key).promise.then(function (version) {
	
	              instance.$setLocalValues(data, data && version ? version.hash : undefined);
	              instance.$resolved = true;
	              instance.$emit(idbEvents.MODEL_QUERIED, [$result]);
	
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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Globales
	
	var _Clazzer = __webpack_require__(17);
	
	var _Clazzer2 = _interopRequireDefault(_Clazzer);
	
	var _idbRequest = __webpack_require__(11);
	
	var _idbRequest2 = _interopRequireDefault(_idbRequest);
	
	var _idbOpenDBRequest = __webpack_require__(12);
	
	var _idbOpenDBRequest2 = _interopRequireDefault(_idbOpenDBRequest);
	
	var _idb = __webpack_require__(13);
	
	var _idb2 = _interopRequireDefault(_idb);
	
	var _idbStore = __webpack_require__(14);
	
	var _idbStore2 = _interopRequireDefault(_idbStore);
	
	var _idbModel = __webpack_require__(15);
	
	var _idbModel2 = _interopRequireDefault(_idbModel);
	
	var _idbSocket = __webpack_require__(18);
	
	var _idbSocket2 = _interopRequireDefault(_idbSocket);
	
	var _idbTransaction = __webpack_require__(20);
	
	var _idbTransaction2 = _interopRequireDefault(_idbTransaction);
	
	var _lb = __webpack_require__(19);
	
	var _lb2 = _interopRequireDefault(_lb);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Principales
	
	
	// Request
	(0, _lb2.default)(angular.module('ng.v1.idb', [])).constant('io', io).service('Clazzer', _Clazzer2.default).constant('idbVersion', '0.0.1').service('idbRequest', _idbRequest2.default).service('idbOpenDBRequest', _idbOpenDBRequest2.default).service('idb2', _idb2.default).service('idbStore', _idbStore2.default).service('idbModel2', _idbModel2.default).service('idbSocket2', _idbSocket2.default).service('idbTransaction', _idbTransaction2.default).service('db2', ["idb2", function (idb2) {
	  'ngInject';
	
	  var db = new idb2('aaa', 4);
	
	  db.upgradeneeded(function (db, event) {
	    console.log(['upgradeneeded', event]);
	  }).automigration({
	    1: function _(db) {
	      var model = db.model('Trabajador').setKeyPath('id').setAutoIncrement(false).createStore();
	
	      console.log(['model', model.$id]);
	
	      return;
	      // .keyPath('id')
	      // .autoIncrement(false)
	      // .create()
	      // .versioning(function (versioning) {
	      //   versioning.createStore();
	      // });
	    }
	  });
	
	  db.drop().then(function () {
	    console.log(['drop', event]);
	    db.open().then(function () {
	      console.log(['open', event]);
	    });
	  });
	
	  return db;
	}]).run(function (db2) {});

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * idbRequest
	 * -----------------------------------------------------------------------------
	 * [Exposed=(Window,Worker)]
	 * interface IDBRequest : EventTarget {
	 *   readonly attribute any                                        result;
	 *   readonly attribute DOMException?                              error;
	 *   readonly attribute (IDBObjectStore or IDBIndex or IDBCursor)? source;
	 *   readonly attribute IDBTransaction?                            transaction;
	 *   readonly attribute IDBRequestReadyState                       readyState;
	 * 
	 *   // Event handlers:
	 *   attribute EventHandler onsuccess;
	 *   attribute EventHandler onerror;
	 * };
	 *
	 * enum IDBRequestReadyState {
	 *   "pending",
	 *   "done"
	 * };
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = ["Clazzer", function (Clazzer) {
	  'ngInject';
	
	  // ---------------------------------------------------------------------------
	  // Atributos falntantes por definir
	  // $_promise
	
	  var ReadyState = new Clazzer({}).static('pending', 'pending').static('done', 'done');
	
	  return new
	  // ---------------------------------------------------------------------------
	  // Constructor
	  Clazzer(function idbRequest(me) {
	
	    new Clazzer(this).static('$me', me);
	  })
	
	  // ---------------------------------------------------------------------------
	  // Herencia
	  .inherit(EventTarget)
	
	  // ---------------------------------------------------------------------------
	  // Statics
	  .static('ReadyState', ReadyState.clazz)
	
	  // ---------------------------------------------------------------------------
	  // Getters
	  .getter('$result', 'result').getter('$error', 'error').getter('$source', 'source').getter('$readyState', 'readyState').getter('$transaction', 'transaction')
	
	  // ---------------------------------------------------------------------------
	  // Event handlers
	  .handlerEvent('success', 'onsuccess').handlerEvent('error', 'onerror')
	
	  // ---------------------------------------------------------------------------
	  // Property
	  .property('$promise', {
	
	    get: function get() {
	      var thiz = this;
	      if (thiz.$_promise) return thiz.$_promise;
	
	      // Crear promise para el request
	      thiz.$_promise = new Promise(function (resolve, reject) {
	        thiz.success(function (event) {
	          resolve(event);
	        }).error(function (event) {
	          reject(event);
	        });
	      });
	
	      new Clazzer(thiz.$_promise).static('$request', thiz);
	
	      return thiz.$_promise;
	    }
	
	  })
	
	  // ---------------------------------------------------------------------------
	  .clazz;
	}];

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * idbOpenDBRequest
	 * -----------------------------------------------------------------------------
	 * [Exposed=(Window,Worker)]
	 * interface IDBOpenDBRequest : IDBRequest {
	 *   // Event handlers:
	 *   attribute EventHandler onblocked;
	 *   attribute EventHandler onupgradeneeded;
	 * };
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = ["Clazzer", "idbRequest", function (Clazzer, idbRequest) {
	  'ngInject';
	
	  return new
	  // ---------------------------------------------------------------------------
	  // Constructor
	  Clazzer(function idbOpenDBRequest(me) {
	    idbRequest.apply(this, arguments); // Llamar al constructos del padre
	  })
	
	  // ---------------------------------------------------------------------------
	  // Herencia
	  .inherit(idbRequest)
	
	  // ---------------------------------------------------------------------------
	  // Event handlers
	  .handlerEvent('blocked', 'onblocked').handlerEvent('upgradeneeded', 'onupgradeneeded')
	
	  // ---------------------------------------------------------------------------
	  .clazz;
	}];

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * idb
	 * -----------------------------------------------------------------------------
	 * [Exposed=(Window,Worker)]
	 * interface IDBFactory {
	 *   IDBOpenDBRequest open(DOMString name, [EnforceRange] optional unsigned long long version);
	 *   IDBOpenDBRequest deleteDatabase(DOMString name);
	 *   short cmp(any first, any second);
	 * };
	 * -----------------------------------------------------------------------------
	 * [Exposed=(Window,Worker)]
	 * interface IDBDatabase : EventTarget {
	 *   readonly attribute DOMString          name;
	 *   readonly attribute unsigned long long version;
	 *   readonly attribute DOMStringList      objectStoreNames;
	 * 
	 *   IDBTransaction transaction((DOMString or sequence<DOMString>) storeNames, optional IDBTransactionMode mode = "readonly");
	 *   void           close();
	 *   IDBObjectStore createObjectStore(DOMString name, optional IDBObjectStoreParameters options);
	 *   void           deleteObjectStore(DOMString name);
	 * 
	 *   // Event handlers:
	 *   attribute EventHandler onabort;
	 *   attribute EventHandler onclose;
	 *   attribute EventHandler onerror;
	 *   attribute EventHandler onversionchange;
	 * };
	 * 
	 * dictionary IDBObjectStoreParameters {
	 *   (DOMString or sequence<DOMString>)? keyPath = null;
	 *   boolean                             autoIncrement = false;
	 * };me
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = ["Clazzer", "idbStore", "idbModel2", "idbOpenDBRequest", "idbTransaction", "$log", function (Clazzer, idbStore, idbModel2, idbOpenDBRequest, idbTransaction, $log) {
	  'ngInject';
	
	  // En la siguiente linea, puede incluir prefijos de implementacion que quiera probar.
	
	  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	  // No use "const indexedDB = ..." Si no está en una función.
	  // Por otra parte, puedes necesitar referencias a algun objeto window.IDB*:
	  var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	  var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	  // (Mozilla nunca ha prefijado estos objetos, por lo tanto no necesitamos window.mozIDB*)
	
	  if (!indexedDB) {
	    alert('Su navegador no soporta una versión estable de indexedDB. Tal y como las características no serán validas');
	    return;
	  }
	
	  // ---------------------------------------------------------------------------
	  // Atributos falntantes por definir
	  // $me
	  // $opened
	
	  // ---------------------------------------------------------------------------
	  // Constructor  
	  var idb = function idb(name, version) {
	
	    new Clazzer(this).static('$name', name).static('$version', version).static('$upgradeneededs', []).static('$models', []);
	  };
	
	  return new
	  // ---------------------------------------------------------------------------
	  // Constructor
	  Clazzer(idb)
	
	  // ---------------------------------------------------------------------------
	  // Herencia
	  .inherit(EventTarget)
	
	  // ---------------------------------------------------------------------------
	  // Getters
	  .getter('$objectStoreNames', 'objectStoreNames')
	
	  // ---------------------------------------------------------------------------
	  // Event handlers
	  .handlerEvent('aborted', 'onabort').handlerEvent('closed', 'onclose').handlerEvent('error', 'onerror').handlerEvent('versionChanged', 'onversionchange')
	
	  // ---------------------------------------------------------------------------
	  .static('open', function (name, version) {
	
	    return new idbOpenDBRequest(indexedDB.open(name, version));
	  })
	
	  // ---------------------------------------------------------------------------
	  .static('drop', function (name) {
	
	    return new idbOpenDBRequest(indexedDB.deleteDatabase(name));
	  })
	
	  // ---------------------------------------------------------------------------
	  .static('cmp', function (first, second) {
	
	    return indexedDB.cmp(first, second);
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('transaction', function (storeNames, mode) {
	
	    throw 'idb.transaction';
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('upgradeneeded', function (cb) {
	
	    this.$upgradeneededs.push(cb);
	    return this;
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('automigration', function (allMigrations) {
	
	    return this.upgradeneeded(function (thiz, openRequest, event) {
	      Object.keys(allMigrations).map(function (version) {
	
	        if (event.oldVersion < version && version <= event.newVersion) {
	
	          var migrations = Array.isArray(allMigrations[version]) ? allMigrations[version] : [allMigrations[version]];
	
	          $log.log('migration v' + version + ' starts');
	          migrations.map(function (migration) {
	            migration(thiz, openRequest, event);
	          });
	          $log.log('migration v' + version + ' ends');
	        }
	      });
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('open', function (cb, cbErr) {
	    var thiz = this;
	
	    var lastRq = null;
	    var lastEvent = null;
	
	    if (!thiz.$opened) {
	
	      thiz.$opened = (lastRq = idb.open(thiz.$name, thiz.$version).upgradeneeded(function (event) {
	        thiz.$me = event.target.result;
	        thiz.$upgradeneededs.map(function (cb) {
	          cb.apply(thiz, [thiz, lastRq, event]);
	        });
	      })).$promise.then(function (event) {
	        thiz.$me = event.target.result;
	        lastEvent = event;
	        if (cb) cb(thiz, lastRq, event);
	        return thiz;
	      }).catch(function (event) {
	        lastRq = null;
	        thiz.$opened = null;
	        if (cbErr) cbErr(thiz, lastRq, event);
	        reject.apply(null, [event]);
	      });
	    } else if (cb) {
	
	      cb(thiz, lastRq, lastEvent);
	    }
	
	    return thiz.$opened;
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('drop', function (cb) {
	    var thiz = this;
	    thiz.$opened = null;
	
	    return new Promise(function (resolve, reject) {
	
	      var rq = idb.drop(thiz.$name).success(resolve).error(reject);
	      if (cb) cb(rq);
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('close', function () {
	
	    this.$me.close();
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('createStore', function (name, options) {
	
	    return new idbStore(this.$me.createObjectStore(name, options));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('dropStore', function (name) {
	
	    this.$me.deleteObjectStore(name);
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('model', function (name) {
	
	    // Si existe el modelo retornarlo
	    if (this.$models[name]) return this.$models[name];
	
	    // Instanciar el modelo y guardarlo
	    return this.$models[name] = idbModel2(this, name);
	  })
	
	  // ---------------------------------------------------------------------------
	  .clazz;
	}];

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * idbStore
	 * -----------------------------------------------------------------------------
	 * [Exposed=(Window,Worker)]
	 * interface IDBObjectStore {
	 *            attribute DOMString      name;
	 *   readonly attribute any            keyPath;
	 *   readonly attribute DOMStringList  indexNames;
	 *   readonly attribute IDBTransaction transaction;
	 *   readonly attribute boolean        autoIncrement;
	 * 
	 *   IDBRequest put(any value, optional any key);
	 *   IDBRequest add(any value, optional any key);
	 *   IDBRequest delete(any query);
	 *   IDBRequest clear();
	 *   IDBRequest get(any query);
	 *   IDBRequest getKey(any query);
	 *   IDBRequest getAll(optional any query, [EnforceRange] optional unsigned long count);
	 *   IDBRequest getAllKeys(optional any query, [EnforceRange] optional unsigned long count);
	 *   IDBRequest count(optional any query);
	 *   IDBRequest openCursor(optional any query, optional IDBCursorDirection direction = "next");
	 *   IDBRequest openKeyCursor(optional any query, optional IDBCursorDirection direction = "next");
	 *   IDBIndex   index(DOMString name);
	 *   IDBIndex   createIndex(DOMString name, (DOMString or sequence<DOMString>) keyPath, optional IDBIndexParameters options);
	 *   void       deleteIndex(DOMString indexName);
	 * };
	 * 
	 * dictionary IDBIndexParameters {
	 *   boolean unique = false;
	 *   boolean multiEntry = false;
	 * };
	 * 
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = ["Clazzer", "idbRequest", function (Clazzer, idbRequest) {
	  'ngInject';
	
	  return new
	  // ---------------------------------------------------------------------------
	  // Constructor
	  Clazzer(function idbStore(me) {
	
	    new Clazzer(this).static('$me', me);
	  })
	
	  // ---------------------------------------------------------------------------
	  // Getters
	  .getter('$name', 'name').getter('$keyPath', 'keyPath').getter('$indexNames', 'indexNames').getter('$transaction', 'transaction').getter('$autoIncrement', 'autoIncrement')
	
	  // ---------------------------------------------------------------------------
	  .method('put', function (value, key) {
	
	    return new idbRequest(this.$me.put(value, key));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('add', function (value, key) {
	
	    return new idbRequest(this.$me.add(value, key));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('delete', function (query) {
	
	    return new idbRequest(this.$me.delete(query));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('clear', function () {
	
	    return new idbRequest(this.$me.clear());
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('get', function (query) {
	
	    return new idbRequest(this.$me.get(query));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('getKey', function (query) {
	
	    return new idbRequest(this.$me.getKey(query));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('getAll', function (query, count) {
	
	    return new idbRequest(this.$me.getAll(query, count));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('getAllKeys', function (query, count) {
	
	    return new idbRequest(this.$me.getAllKeys(query, count));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('count', function (query) {
	
	    return new idbRequest(this.$me.count(query));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('openCursor', function (query, direction) {
	
	    return new idbRequest(this.$me.openCursor(query, direction));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('openKeyCursor', function (query, direction) {
	
	    return new idbRequest(this.$me.openKeyCursor(query, direction));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('index', function (name) {
	
	    throw 'idbStore.prototype.index';
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('createIndex', function (name, keyPath, options) {
	
	    throw 'idbStore.prototype.createIndex';
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('deleteIndex', function (indexName) {
	
	    this.$me.deleteIndex(indexName);
	  })
	
	  // ---------------------------------------------------------------------------
	  .clazz;
	}];

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * idbModel
	 * -----------------------------------------------------------------------------
	 * 
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = ["Clazzer", function (Clazzer) {
	  'ngInject';
	
	  return function idbModelFactory(db, name) {
	
	    return new
	    // ---------------------------------------------------------------------------
	    // Constructor
	    Clazzer(function idbModel() {})
	
	    // ---------------------------------------------------------------------------
	    // Propiedades staticas
	    .static('$db', db).static('$name', name).static('$id', { keyPath: 'id', autoIncrement: true })
	
	    // ---------------------------------------------------------------------------
	    .static('setKeyPath', function (keyPath) {
	
	      this.$id.keyPath = keyPath;
	      return this;
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('setAutoIncrement', function (autoIncrement) {
	
	      this.$id.autoIncrement = autoIncrement;
	      return this;
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('createStore', function (cb) {
	
	      var store = this.$db.createStore(this.$name, this.$id);
	
	      if (cb) cb(this, store);
	
	      return this;
	    })
	
	    // ---------------------------------------------------------------------------
	    .clazz;
	  };
	}];

/***/ },
/* 16 */,
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Clazzer
	 * -----------------------------------------------------------------------------
	 * 
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  'ngInject';
	
	  // ---------------------------------------------------------------------------
	  // Constructor
	
	  function Clazzer(constructor) {
	    Object.defineProperty(this, 'clazz', { value: constructor || function () {} });
	  }
	
	  // ---------------------------------------------------------------------------
	  Object.defineProperty(Clazzer.prototype, 'inherit', {
	    value: function value(parent) {
	      var tmp = function tmp() {};
	      tmp.prototype = parent.prototype;
	      this.clazz.prototype = new tmp();
	      this.clazz.prototype.constructor = this.clazz;
	      return this;
	    }
	  });
	
	  // ---------------------------------------------------------------------------
	  Object.defineProperty(Clazzer.prototype, 'static', {
	    value: function value(name, _value) {
	      Object.defineProperty(this.clazz, name, {
	        value: _value
	      });
	      return this;
	    }
	  });
	
	  // ---------------------------------------------------------------------------
	  Object.defineProperty(Clazzer.prototype, 'property', {
	    value: function value(name, opts) {
	      Object.defineProperty(this.clazz.prototype, name, opts);
	      return this;
	    }
	  });
	
	  // ---------------------------------------------------------------------------
	  Object.defineProperty(Clazzer.prototype, 'method', {
	    value: function value(name, func) {
	      this.property(name, {
	        value: func
	      });
	      return this;
	    }
	  });
	
	  // ---------------------------------------------------------------------------
	  Object.defineProperty(Clazzer.prototype, 'getter', {
	    value: function value(from, to) {
	      if (!to) to = from;
	      this.property(from, {
	        get: function get() {
	          return this.$me[to];
	        }
	      });
	      return this;
	    }
	  });
	
	  // ---------------------------------------------------------------------------
	  Object.defineProperty(Clazzer.prototype, 'setter', {
	    value: function value(from, to) {
	      if (!to) to = from;
	      this.property(from, {
	        set: function set(value) {
	          this.$me[to] = value;
	        }
	      });
	      return this;
	    }
	  });
	
	  // ---------------------------------------------------------------------------
	  Object.defineProperty(Clazzer.prototype, 'handlerEvent', {
	    value: function value(from, to) {
	      if (!to) to = from;
	      this.property(from, {
	        value: function value(cb) {
	          this.$me[to] = cb;
	          return this;
	        }
	      });
	      return this;
	    }
	  });
	
	  // ---------------------------------------------------------------------------
	  return Clazzer;
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = ["Clazzer", "io", "$log", function (Clazzer, io, $log) {
	  'ngInject';
	
	  // ---------------------------------------------------------------------------
	  // Atributos falntantes por definir
	  // $socket
	
	  // ---------------------------------------------------------------------------
	  // Constructor
	
	  var idbSocket = function idbSocket(url, $accessTokenId, $currentUserId) {
	
	    new Clazzer(this).static('$url', url || idbSocket.$defUrlServer).static('$accessTokenId', accessTokenId || idbSocket.$defAccessTokenId).static('$currentUserId', currentUserId || idbSocket.$defCurrentUserId).static('$listeners', []);
	
	    thiz.connect();
	  };
	
	  return new
	  // ---------------------------------------------------------------------------
	  // Constructor
	  Clazzer(idbSocket)
	
	  // ---------------------------------------------------------------------------
	  // Conectarse al servidor
	  .method('connect', function () {
	
	    // Creating connection with server
	    var socket = this.$socket = io.connect($url);
	
	    // This part is only for login users for authenticated $socket connection between client and server.
	    // If you are not using login page in you website then you should remove rest piece of code..
	    socket.on('connect', function () {
	      $log.log('connected');
	
	      socket.emit('authentication', {
	        id: $accessTokenId,
	        userId: $currentUserId
	      });
	
	      socket.on('authenticated', function () {
	        // use the $socket as usual
	        $log.log('User is authenticated');
	      });
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('subscribe', function (options, cb) {
	
	    var name = options.modelName + '.' + options.eventName;
	
	    if (typeof options.modelId === 'number') {
	      name = name + '.' + options.modelId;
	    }
	
	    this.$socket.on(name, cb);
	
	    //Push the container..
	    this.$listeners.push(name, cb);
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('pushListener', function (subscriptionName, cb) {
	
	    this.$listeners.push(subscriptionName);
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('unsubscribe', function (subscriptionName) {
	
	    this.$socket.removeAllListeners(subscriptionName);
	    var idx = this.$listeners.indexOf(subscriptionName);
	    if (idx != -1) {
	      this.$listeners.splice(idx, 1);
	    }
	  })
	
	  // ---------------------------------------------------------------------------
	  // Asigna la URL de servidor por defecto
	  .static('setUrlServer', function (url) {
	
	    this.$defUrlServer = url;
	    return this;
	  })
	
	  // ---------------------------------------------------------------------------
	  // ASigna las credenciales por defecto
	  .static('setCredentials', function (accessTokenId, currentUserId) {
	
	    this.$defAccessTokenId = accessTokenId;
	    this.$defCurrentUserId = currentUserId;
	    return this;
	  })
	
	  // ---------------------------------------------------------------------------
	  .clazz
	
	  // ---------------------------------------------------------------------------
	  .setUrlServer(null).setCredentials(null, null);
	}];

/***/ },
/* 19 */
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
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * idbTransaction
	 * -----------------------------------------------------------------------------
	 * [Exposed=(Window,Worker)]
	 * interface IDBTransaction : EventTarget {
	 *   readonly attribute DOMStringList      objectStoreNames;
	 *   readonly attribute IDBTransactionMode mode;
	 *   readonly attribute IDBDatabase        db;
	 *   readonly attribute DOMException       error;
	 * 
	 *   IDBObjectStore objectStore(DOMString name);
	 *   void           abort();
	 * 
	 *   // Event handlers:
	 *   attribute EventHandler onabort;
	 *   attribute EventHandler oncomplete;
	 *   attribute EventHandler onerror;
	 * };
	 * 
	 * enum IDBTransactionMode {
	 *   "readonly",
	 *   "readwrite",
	 *   "versionchange"
	 * };
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = ["Clazzer", "idbStore", function (Clazzer, idbStore) {
	  'ngInject';
	
	  // ---------------------------------------------------------------------------
	  // Atributos falntantes por definir
	  // $_promise
	
	  var TransactionMode = new Clazzer({}).static('readonly', 'readonly').static('readwrite', 'readwrite').static('versionchange', 'versionchange');
	
	  return new
	  // ---------------------------------------------------------------------------
	  // Constructor
	  Clazzer(function idbTransaction(me) {
	
	    new Clazzer(this).static('$me', me);
	  })
	
	  // ---------------------------------------------------------------------------
	  // Herencia
	  .inherit(EventTarget)
	
	  // ---------------------------------------------------------------------------
	  // Statics
	  .static('TransactionMode', TransactionMode.clazz)
	
	  // ---------------------------------------------------------------------------
	  // Getters
	  .getter('$db', 'db').getter('$mode', 'mode').getter('$error', 'error').getter('$objectStoreNames', 'objectStoreNames')
	
	  // ---------------------------------------------------------------------------
	  // Event handlers
	  .handlerEvent('aborted', 'onabort').handlerEvent('completed', 'oncomplete').handlerEvent('error', 'onerror')
	
	  // ---------------------------------------------------------------------------
	  .method('store', function (name) {
	
	    return new idbStore(this.$me.objectStore(name));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('abort', function () {
	
	    this.$me.abort();
	  })
	
	  // ---------------------------------------------------------------------------
	  // Property
	  .property('$promise', {
	
	    get: function get() {
	      var thiz = this;
	      if (thiz.$_promise) return thiz.$_promise;
	
	      // Crear promise para el request
	      thiz.$_promise = new Promise(function (resolve, reject) {
	        thiz.completed(function (event) {
	          resolve(event);
	        }).error(function (event) {
	          reject(event);
	        });
	      });
	
	      new Clazzer(thiz.$_promise).static('$transaction', thiz);
	
	      return thiz.$_promise;
	    }
	
	  })
	
	  // ---------------------------------------------------------------------------
	  .clazz;
	}];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzA1MTNjMjExZDBkMzM4NzgwNjciLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiVXRpbHMuanM/MWJiNCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJFdmVudHMuanM/NDg2YSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3FzLmpzPzY0MzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiLmpzPzYzNTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qcz9mOWY5Iiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanM/Zjc3YSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJTb2NrZXQuanM/ZDFhMSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvbGIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2xiLmpzPzMwMDYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pbmRleC5qcz8wZjYyIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJSZXF1ZXN0LmpzPzJjYmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYk9wZW5EQlJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYk9wZW5EQlJlcXVlc3QuanM/YThkZCIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiLmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGIuanM/MWMxYiIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiU3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlN0b3JlLmpzP2VhNTciLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYk1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJNb2RlbC5qcz83YzFkIiwid2VicGFjazovLy8uL3NyYy92MS9DbGF6emVyLmpzIiwid2VicGFjazovLy8uL3NyYy92MS9DbGF6emVyLmpzPzFmY2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiU29ja2V0LmpzPzE0ZjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2xiLmpzIiwid2VicGFjazovLy8uL3NyYy92MS9sYi5qcz9jZjVlIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJUcmFuc2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiVHJhbnNhY3Rpb24uanM/MzBjMyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwic2VydmljZSIsImlkYlV0aWxzIiwiJHEiLCJ2YWxpZGF0b3JzIiwiY2FsbGJhY2siLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImFycmF5IiwiQXJyYXkiLCJpc0FycmF5IiwidmFsaWQiLCJ0eXBlcyIsImkiLCJ0eXBlIiwiYXJncyIsInZhbGlkYXRlIiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiZXJyIiwiRXJyb3IiLCJuYW1lIiwiaWRiRXZlbnRzIiwiREJfRVJST1IiLCJNT0RFTF9JTlNUQU5DRUQiLCJNT0RFTF9SRVBMQUNFIiwiTU9ERUxfUVVFUklFRCIsIk1PREVMX1VOUVVFUklFRCIsInFzIiwicXNDbGFzcyIsImNiIiwidGhpeiIsInRoZW5zIiwidGhlbnNSZWFkeSIsImNhdGNocyIsImNhdGNoc1JlYWR5IiwicmVzdWx0QXJncyIsImVycm9yIiwicHJvbWlzZSIsIiRyZXNvbHZlZCIsInRoZW5zUmVzb2x2ZWQiLCJsZW5ndGgiLCJzaGlmdCIsImFwcGx5IiwicHVzaCIsImNhdGNoc1Jlc29sdmVkIiwicmVzb2x2ZSIsImFyZ3VtZW50cyIsInJlamVjdCIsInRoZW4iLCJjYXRjaCIsImRvbmUiLCJjb25jYXQiLCJkZWZlciIsImFsbCIsImFyciIsImRlZmVyZWQiLCJwcm9taXNlcyIsImtleXMiLCJPYmplY3QiLCJyZXN1bHRzIiwibWFwIiwiaWR4IiwicmVzdWx0IiwiaWRiU2VydmljZSIsIiRsb2ciLCJpZGJNb2RlbCIsImluZGV4ZWREQiIsIndpbmRvdyIsIm1vekluZGV4ZWREQiIsIndlYmtpdEluZGV4ZWREQiIsIm1zSW5kZXhlZERCIiwiSURCVHJhbnNhY3Rpb24iLCJ3ZWJraXRJREJUcmFuc2FjdGlvbiIsIm1zSURCVHJhbnNhY3Rpb24iLCJJREJLZXlSYW5nZSIsIndlYmtpdElEQktleVJhbmdlIiwibXNJREJLZXlSYW5nZSIsImFsZXJ0IiwiaWRiIiwiJGRiTmFtZSIsIiRkYlZlcnNpb24iLCIkc29ja2V0IiwiJGV2ZW50c0NhbGxiYWNrcyIsIiR1cGdyYWRlTmVlZGVkRGVmZXJlZCIsIiRvcGVuRGVmZXJlZCIsIiRzb2NrZXRDb25uZWN0ZWREZWZlcmVkIiwiJG9wZW5lZCIsIiRyZXF1ZXN0IiwibW9kZWxzIiwiYmluZCIsImV2ZW50TmFtZSIsInVuYmluZCIsImluZGV4T2YiLCJzcGxpY2UiLCJ0cmlnZ2VyIiwibG9nIiwib3BlbiIsInJlYWR5IiwicnEiLCJvbnVwZ3JhZGVuZWVkZWQiLCJldmVudCIsIm9uc3VjY2VzcyIsIm9uZXJyb3IiLCJ0YXJnZXQiLCJlcnJvckNvZGUiLCJkZWxldGVEYXRhYmFzZSIsIm1vZGVsIiwic29ja2V0IiwiY3JlYXRlU3RvcmUiLCJtb2RlbE5hbWUiLCJtb2RlbElkIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJjcmVhdGVJbmRleCIsImluZGV4TmFtZSIsImZpZWxkTmFtZSIsIm9wdHMiLCJ0cmFuc2FjdGlvbiIsIm9iamVjdFN0b3JlIiwicGVybXMiLCJhY3Rpb24iLCJ0eCIsIm9uY29tcGxldGUiLCJvbmFib3J0IiwiZ2V0Iiwia2V5IiwicHV0IiwidmFsdWVzIiwiZGVsZXRlIiwib3BlbkN1cnNvciIsImZpbHRlcnMiLCJlYWNoQ2IiLCJjdXJzb3IiLCJjb250aW51ZSIsImRlZmVyZWRzIiwib25PcGVuIiwib25VcGdyYWRlTmVlZGVkIiwib25Tb2NrZXRDb25uZWN0ZWQiLCJ0ZXh0IiwiaWRiTW9kZWxTZXJ2aWNlIiwiaWRiUXVlcnkiLCJsYlJlc291cmNlIiwiJHRpbWVvdXQiLCJzZWFyY2hEZWVwRmllbGQiLCJvYmoiLCJmaWVsZCIsImZpZWxkcyIsInNwbGl0IiwibGFzdEZpZWxkIiwicG9wIiwiX3NldCIsImdldEZpZWxkVmFsdWUiLCJzZXRGaWVsZFZhbHVlIiwiJGRiIiwiJG1vZGVsTmFtZSIsIiRpZCIsImtleVBhdGgiLCJhdXRvSW5jcmVtZW50IiwiJGV2ZW50c0hhbmRsZXJzIiwiJGluc3RhbmNlcyIsIiRmaWVsZHMiLCIkcmVtb3RlIiwiJHZlcnNpb25pbmciLCJNb2RlbCIsImRhdGEiLCIkbG9hZGVkIiwiJGxvY2FsTG9hZGVkIiwiJHJlbW90ZUxvYWRlZCIsIiRsb2NhbFZhbHVlcyIsIiRyZW1vdGVWYWx1ZXMiLCIkdmVyc2lvbiIsIiRsb2NhbFZlcnNpb24iLCIkcmVtb3RlVmVyc2lvbiIsIiRzZXRWYWx1ZXMiLCIkY29uc3RydWN0b3IiLCIkbGlzdGVuIiwiJHJlc3VsdHMiLCIkYmluZCIsIiRlbWl0IiwiZ2V0TW9kZWxOYW1lIiwiaW5kZXgiLCJidWlsZCIsImJ1aWxkQ2FsbGJhY2siLCJyZW1vdGUiLCJ1cmwiLCJhY3Rpb25zIiwiZ2V0UmVtb3RlIiwiZ2V0S2V5RnJvbSIsImdldEluc3RhbmNlIiwiaW5zdGFuY2UiLCIkcHJvbWlzZSIsImdldFZlcnNpb25PZiIsInZlcnNpb24iLCIkc2V0TG9jYWxWYWx1ZXMiLCJoYXNoIiwiZmluZCIsImNyZWF0ZSIsInJlY29yZCIsIiRwdWxsIiwiaXRlcmF0aW9uIiwidmVyc2lvbmluZyIsImhhbmRsZXIiLCJlbWl0IiwiJGdldCIsIiRzZXQiLCIkZ2V0VmFsdWVzIiwiJGdldExvY2FsVmFsdWVzIiwiJGdldFJlbW90ZVZhbHVlcyIsIiRzZXRSZW1vdGVWYWx1ZXMiLCIkc2V0S2V5IiwibmV3S2V5Iiwib2xkS2V5IiwibmV3VmFsdWVzIiwib2xkVmFsdWVzIiwiY29uc29sZSIsInN1YnNjcmliZSIsIiRNb2RlbCIsIiRmaWx0ZXJzIiwiJHJlc3VsdCIsImdldFJlc3VsdCIsIm5leHQiLCJnZXRSZW1vdGVSZXN1bHQiLCIkcmVtb3RlUmVzdWx0IiwiJHJlY29yZCIsImlkYlNvY2tldFNlcnZpY2UiLCJpbyIsIiRkZWZVcmxTZXJ2ZXIiLCJpZGJTb2NrZXQiLCIkdXJsU2VydmVyIiwiJGFjY2Vzc1Rva2VuSWQiLCIkY3VycmVudFVzZXJJZCIsIiRsaXN0ZW5lcnMiLCJjb25uZWN0Iiwib24iLCJpZCIsInVzZXJJZCIsIm9wdGlvbnMiLCJwdXNoTGlzdGVuZXIiLCJzdWJzY3JpcHRpb25OYW1lIiwidW5zdWJzY3JpYmUiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJzZXRVcmxTZXJ2ZXIiLCJ1cmxTZXJ2ZXIiLCJzZXRDcmVkZW50aWFscyIsImFjY2Vzc1Rva2VuSWQiLCJjdXJyZW50VXNlcklkIiwibGIiLCJnZXRIb3N0IiwibSIsIm1hdGNoIiwidXJsQmFzZUhvc3QiLCJsb2NhdGlvbiIsImhvc3QiLCJsYkF1dGgiLCJwcm9wcyIsInByb3BzUHJlZml4Iiwic2F2ZSIsInN0b3JhZ2UiLCJsb2FkIiwibG9jYWxTdG9yYWdlIiwic2Vzc2lvblN0b3JhZ2UiLCJmb3JFYWNoIiwiY3VycmVudFVzZXJEYXRhIiwicmVtZW1iZXJNZSIsInNldFVzZXIiLCJ1c2VyRGF0YSIsImNsZWFyVXNlciIsImNsZWFyU3RvcmFnZSIsImxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciIsInJlcXVlc3QiLCJjb25maWciLCJoZWFkZXJzIiwiYXV0aEhlYWRlciIsIl9faXNHZXRDdXJyZW50VXNlcl9fIiwicmVzIiwiYm9keSIsInN0YXR1cyIsIndoZW4iLCJ1cmxCYXNlIiwic2V0QXV0aEhlYWRlciIsImhlYWRlciIsImdldEF1dGhIZWFkZXIiLCJzZXRVcmxCYXNlIiwiZ2V0VXJsQmFzZSIsIiRyZXNvdXJjZSIsInBhcmFtcyIsIm9yaWdpbmFsVXJsIiwicmVzb3VyY2UiLCIkc2F2ZSIsInN1Y2Nlc3MiLCJ1cHNlcnQiLCJmYWN0b3J5IiwicHJvdmlkZXIiLCIkaHR0cFByb3ZpZGVyIiwiaW50ZXJjZXB0b3JzIiwiY29uc3RhbnQiLCJpZGIyIiwiZGIiLCJ1cGdyYWRlbmVlZGVkIiwiYXV0b21pZ3JhdGlvbiIsInNldEtleVBhdGgiLCJzZXRBdXRvSW5jcmVtZW50IiwiZHJvcCIsInJ1biIsImRiMiIsIkNsYXp6ZXIiLCJSZWFkeVN0YXRlIiwic3RhdGljIiwiaWRiUmVxdWVzdCIsIm1lIiwiaW5oZXJpdCIsIkV2ZW50VGFyZ2V0IiwiY2xhenoiLCJnZXR0ZXIiLCJoYW5kbGVyRXZlbnQiLCJwcm9wZXJ0eSIsIiRfcHJvbWlzZSIsIlByb21pc2UiLCJpZGJPcGVuREJSZXF1ZXN0IiwiaWRiU3RvcmUiLCJpZGJNb2RlbDIiLCJpZGJUcmFuc2FjdGlvbiIsImZpcnN0Iiwic2Vjb25kIiwiY21wIiwibWV0aG9kIiwic3RvcmVOYW1lcyIsIm1vZGUiLCIkdXBncmFkZW5lZWRlZHMiLCJhbGxNaWdyYXRpb25zIiwib3BlblJlcXVlc3QiLCJvbGRWZXJzaW9uIiwibmV3VmVyc2lvbiIsIm1pZ3JhdGlvbnMiLCJtaWdyYXRpb24iLCJjYkVyciIsImxhc3RScSIsImxhc3RFdmVudCIsIiRuYW1lIiwiJG1lIiwiY2xvc2UiLCJkZWxldGVPYmplY3RTdG9yZSIsIiRtb2RlbHMiLCJhZGQiLCJxdWVyeSIsImNsZWFyIiwiZ2V0S2V5IiwiY291bnQiLCJnZXRBbGwiLCJnZXRBbGxLZXlzIiwiZGlyZWN0aW9uIiwib3BlbktleUN1cnNvciIsImRlbGV0ZUluZGV4IiwiaWRiTW9kZWxGYWN0b3J5Iiwic3RvcmUiLCJjb25zdHJ1Y3RvciIsImRlZmluZVByb3BlcnR5IiwicGFyZW50IiwidG1wIiwiZnVuYyIsImZyb20iLCJ0byIsInNldCIsIiRkZWZBY2Nlc3NUb2tlbklkIiwiJGRlZkN1cnJlbnRVc2VySWQiLCIkdXJsIiwiVHJhbnNhY3Rpb25Nb2RlIiwiYWJvcnQiLCJjb21wbGV0ZWQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBOztBQ0VBLEtBQUksYUFBYSx1QkFBdUI7O0FERHhDOztBQ0tBLEtBQUksY0FBYyx1QkFBdUI7O0FESnpDOztBQ1FBLEtBQUksT0FBTyx1QkFBdUI7O0FETmxDOztBQ1VBLEtBQUksY0FBYyx1QkFBdUI7O0FEVHpDOztBQ2FBLEtBQUksUUFBUSx1QkFBdUI7O0FEWm5DOztBQ2dCQSxLQUFJLGFBQWEsdUJBQXVCOztBRGZ4Qzs7QUNtQkEsS0FBSSxhQUFhLHVCQUF1Qjs7QURqQnhDOztBQ3FCQSxLQUFJLE9BQU8sdUJBQXVCOztBRG5CbEM7O0FDdUJBLFVBQVMsdUJBQXVCLEtBQUssRUFBRSxPQUFPLE9BQU8sSUFBSSxhQUFhLE1BQU0sRUFBRSxTQUFTOztBRHJCdkYsbUJBQUdBLFFBQVFDLE9BQU8sVUFBVSxDQUFDLGVBRTFCQyxRQUFRLGFBRlgscUJBR0dBLFFBQVEsWUFIWCxvQkFJR0EsUUFBUSxNQUpYOzs7RUFPR0EsUUFBUSxPQVBYLGVBUUdBLFFBQVEsWUFSWCxvQkFT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b3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDMwNTEzYzIxMWQwZDMzODc4MDY3XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IGlkYlV0aWxzIGZyb20gJy4vdXRpbHMvaWRiVXRpbHMnO1xyXG5pbXBvcnQgaWRiRXZlbnRzIGZyb20gJy4vdXRpbHMvaWRiRXZlbnRzJztcclxuaW1wb3J0IHFzIGZyb20gJy4vdXRpbHMvcXMnO1xyXG5cclxuaW1wb3J0IGlkYlNvY2tldCBmcm9tICcuL3NlcnZpY2VzL2lkYlNvY2tldCc7XHJcbmltcG9ydCBpZGIgZnJvbSAnLi9zZXJ2aWNlcy9pZGInO1xyXG5pbXBvcnQgaWRiTW9kZWwgZnJvbSAnLi9zZXJ2aWNlcy9pZGJNb2RlbCc7XHJcbmltcG9ydCBpZGJRdWVyeSBmcm9tICcuL3NlcnZpY2VzL2lkYlF1ZXJ5JztcclxuXHJcbmltcG9ydCBsYiBmcm9tICcuL3NlcnZpY2VzL2xiJztcclxuXHJcbmltcG9ydCAnLi92MS9pbmRleCc7XHJcblxyXG5sYihhbmd1bGFyLm1vZHVsZSgnbmcuaWRiJywgWyduZy52MS5pZGInXSkpXHJcbiAgXHJcbiAgLnNlcnZpY2UoJ2lkYkV2ZW50cycsIGlkYkV2ZW50cylcclxuICAuc2VydmljZSgnaWRiVXRpbHMnLCBpZGJVdGlscylcclxuICAuc2VydmljZSgncXMnLCBxcylcclxuXHJcbiAgLy8gVGFrZSBvZiBsYi1zZXJ2aWNlcy5qc1xyXG4gIC5zZXJ2aWNlKCdpZGInLCBpZGIpXHJcbiAgLnNlcnZpY2UoJ2lkYk1vZGVsJywgaWRiTW9kZWwpXHJcbiAgLnNlcnZpY2UoJ2lkYlF1ZXJ5JywgaWRiUXVlcnkpXHJcbiAgLnNlcnZpY2UoJ2lkYlNvY2tldCcsIGlkYlNvY2tldClcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfaWRiVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzL2lkYlV0aWxzJyk7XG5cbnZhciBfaWRiVXRpbHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiVXRpbHMpO1xuXG52YXIgX2lkYkV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvaWRiRXZlbnRzJyk7XG5cbnZhciBfaWRiRXZlbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYkV2ZW50cyk7XG5cbnZhciBfcXMgPSByZXF1aXJlKCcuL3V0aWxzL3FzJyk7XG5cbnZhciBfcXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcXMpO1xuXG52YXIgX2lkYlNvY2tldCA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiU29ja2V0Jyk7XG5cbnZhciBfaWRiU29ja2V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlNvY2tldCk7XG5cbnZhciBfaWRiID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGInKTtcblxudmFyIF9pZGIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiKTtcblxudmFyIF9pZGJNb2RlbCA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiTW9kZWwnKTtcblxudmFyIF9pZGJNb2RlbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJNb2RlbCk7XG5cbnZhciBfaWRiUXVlcnkgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYlF1ZXJ5Jyk7XG5cbnZhciBfaWRiUXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiUXVlcnkpO1xuXG52YXIgX2xiID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9sYicpO1xuXG52YXIgX2xiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xiKTtcblxucmVxdWlyZSgnLi92MS9pbmRleCcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4oMCwgX2xiMi5kZWZhdWx0KShhbmd1bGFyLm1vZHVsZSgnbmcuaWRiJywgWyduZy52MS5pZGInXSkpLnNlcnZpY2UoJ2lkYkV2ZW50cycsIF9pZGJFdmVudHMyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlV0aWxzJywgX2lkYlV0aWxzMi5kZWZhdWx0KS5zZXJ2aWNlKCdxcycsIF9xczIuZGVmYXVsdClcblxuLy8gVGFrZSBvZiBsYi1zZXJ2aWNlcy5qc1xuLnNlcnZpY2UoJ2lkYicsIF9pZGIyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYk1vZGVsJywgX2lkYk1vZGVsMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJRdWVyeScsIF9pZGJRdWVyeTIuZGVmYXVsdCkuc2VydmljZSgnaWRiU29ja2V0JywgX2lkYlNvY2tldDIuZGVmYXVsdCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJVdGlscyAoJHEpIHsgJ25nSW5qZWN0J1xyXG4gIFxyXG4gIGNvbnN0IHZhbGlkYXRvcnMgPSB7XHJcbiAgICAvLyBGdW5jaW9uIHBhcmEgZGV0ZXJtaW5hciBzaSBlcyB1biBjYWxsYmFjayB2w6FsaWRvIG8gbm9cclxuICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nIHx8IHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gdW5kZWZpbmVkO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBWZXJpZmljYSBzaSB1biB2YWxvciBlcyB1biBhcnJheVxyXG4gICAgYXJyYXk6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICB9ICBcclxuXHJcbiAgLy8gR2VuZXJhIHVuIGVycm9yIHNpIGVsIHZhbG9yIG5vIGVzIGRlbCB0aXBvIGluZGljYWRvIHBvciBwYXJhbWV0cm9cclxuICBmdW5jdGlvbiB2YWxpZCAodmFsdWUsIHR5cGVzKSB7XHJcbiAgICBpZiAoIXZhbGlkYXRvcnMuYXJyYXkodHlwZXMpKSB0eXBlcyA9IFt0eXBlc107XHJcblxyXG4gICAgZm9yKGxldCBpIGluIHR5cGVzKXtcclxuICAgICAgY29uc3QgdHlwZSA9IHR5cGVzW2ldO1xyXG4gICAgICBpZiAodHlwZW9mIHR5cGUgPT0gJ3N0cmluZycpe1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsaWRhdG9yc1t0eXBlXSA9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICBpZiAodmFsaWRhdG9yc1t0eXBlXSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT0gdHlwZSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0eXBlID09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgIGlmKHR5cGUoYXJnc1tpXSkpe1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIFZhbGlkYSB1biBhcnJheSBkZSBhcmd1bWVudG9zIGNvbiB1biBhcnJhIGRlIHRpcG9zXHJcbiAgZnVuY3Rpb24gdmFsaWRhdGUgKGFyZ3MsIHR5cGVzKSB7XHJcblxyXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xyXG4gICAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xyXG4gICAgZm9yIChsZXQgaSBpbiBhcmdzKXtcclxuICAgICAgY29uc3QgdmFsdWUgPSBhcmdzW2ldO1xyXG4gICAgICBjb25zdCB0eXBlID0gdHlwZXNbaV07XHJcbiAgICAgIGlmICh0eXBlICYmICF2YWxpZCh2YWx1ZSwgdHlwZSkpe1xyXG4gICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsaWRhdG9yIHRvOiAnK2FyZ3NbaV0rJyBtdXN0IGJlICcrdHlwZSk7XHJcbiAgICAgICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbGlkYXRvcidcclxuICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdmFsaWRhdGU6IHZhbGlkYXRlLFxyXG4gIH07XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiVXRpbHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gaWRiVXRpbHM7XG5mdW5jdGlvbiBpZGJVdGlscygkcSkge1xuICAnbmdJbmplY3QnO1xuXG4gIHZhciB2YWxpZGF0b3JzID0ge1xuICAgIC8vIEZ1bmNpb24gcGFyYSBkZXRlcm1pbmFyIHNpIGVzIHVuIGNhbGxiYWNrIHbDoWxpZG8gbyBub1xuICAgIGNhbGxiYWNrOiBmdW5jdGlvbiBjYWxsYmFjayh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nIHx8IHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gdW5kZWZpbmVkO1xuICAgIH0sXG5cbiAgICAvLyBWZXJpZmljYSBzaSB1biB2YWxvciBlcyB1biBhcnJheVxuICAgIGFycmF5OiBmdW5jdGlvbiBhcnJheSh2YWx1ZSkge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpO1xuICAgIH1cblxuICB9O1xuXG4gIC8vIEdlbmVyYSB1biBlcnJvciBzaSBlbCB2YWxvciBubyBlcyBkZWwgdGlwbyBpbmRpY2FkbyBwb3IgcGFyYW1ldHJvXG4gIGZ1bmN0aW9uIHZhbGlkKHZhbHVlLCB0eXBlcykge1xuICAgIGlmICghdmFsaWRhdG9ycy5hcnJheSh0eXBlcykpIHR5cGVzID0gW3R5cGVzXTtcblxuICAgIGZvciAodmFyIGkgaW4gdHlwZXMpIHtcbiAgICAgIHZhciB0eXBlID0gdHlwZXNbaV07XG4gICAgICBpZiAodHlwZW9mIHR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWxpZGF0b3JzW3R5cGVdID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpZiAodmFsaWRhdG9yc1t0eXBlXSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSkpID09IHR5cGUpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdHlwZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmICh0eXBlKGFyZ3NbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBWYWxpZGEgdW4gYXJyYXkgZGUgYXJndW1lbnRvcyBjb24gdW4gYXJyYSBkZSB0aXBvc1xuICBmdW5jdGlvbiB2YWxpZGF0ZShhcmdzLCB0eXBlcykge1xuXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcbiAgICBmb3IgKHZhciBpIGluIGFyZ3MpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGFyZ3NbaV07XG4gICAgICB2YXIgdHlwZSA9IHR5cGVzW2ldO1xuICAgICAgaWYgKHR5cGUgJiYgIXZhbGlkKHZhbHVlLCB0eXBlKSkge1xuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbGlkYXRvciB0bzogJyArIGFyZ3NbaV0gKyAnIG11c3QgYmUgJyArIHR5cGUpO1xuICAgICAgICBlcnIubmFtZSA9ICdJbnZhbGlkVmFsaWRhdG9yJztcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdmFsaWRhdGU6IHZhbGlkYXRlXG4gIH07XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiVXRpbHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBOb21icmUgZGUgbG9zIGV2ZW50b3NcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiRXZlbnRzKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBEQl9FUlJPUjogJ2NiLmVycm9yJyxcclxuICAgIE1PREVMX0lOU1RBTkNFRCA6ICdtb2RlbC5pbnN0YW5jZWQnLFxyXG4gICAgTU9ERUxfUkVQTEFDRSA6ICdtb2RlbC5yZXBsYWNlJyxcclxuICAgIE1PREVMX1FVRVJJRUQgOiAnbW9kZWwucXVlcmllZCcsXHJcbiAgICBNT0RFTF9VTlFVRVJJRUQgOiAnbW9kZWwudW5xdWVyaWVkJyxcclxuICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBOb21icmUgZGUgbG9zIGV2ZW50b3NcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYkV2ZW50cztcbmZ1bmN0aW9uIGlkYkV2ZW50cygpIHtcbiAgcmV0dXJuIHtcbiAgICBEQl9FUlJPUjogJ2NiLmVycm9yJyxcbiAgICBNT0RFTF9JTlNUQU5DRUQ6ICdtb2RlbC5pbnN0YW5jZWQnLFxuICAgIE1PREVMX1JFUExBQ0U6ICdtb2RlbC5yZXBsYWNlJyxcbiAgICBNT0RFTF9RVUVSSUVEOiAnbW9kZWwucXVlcmllZCcsXG4gICAgTU9ERUxfVU5RVUVSSUVEOiAnbW9kZWwudW5xdWVyaWVkJ1xuICB9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9pZGJFdmVudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBxcyAoKSB7ICduZ0luamVjdCdcclxuICBcclxuICBmdW5jdGlvbiBxc0NsYXNzIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIFxyXG4gICAgbGV0IHRoZW5zID0gW107XHJcbiAgICBsZXQgdGhlbnNSZWFkeSA9IFtdO1xyXG4gICAgbGV0IGNhdGNocyA9IFtdO1xyXG4gICAgbGV0IGNhdGNoc1JlYWR5ID0gW107XHJcbiAgICBsZXQgcmVzdWx0QXJncyA9IG51bGw7XHJcbiAgICBsZXQgZXJyb3IgPSBudWxsO1xyXG5cclxuICAgIHRoaXoucHJvbWlzZSA9IHt9O1xyXG4gICAgdGhpei4kcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiB0aGVuc1Jlc29sdmVkICgpIHtcclxuICAgICAgaWYgKCF0aGVucy5sZW5ndGgpIHJldHVybjtcclxuICAgICAgbGV0IGNiID0gdGhlbnMuc2hpZnQoKTtcclxuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5yZXN1bHRBcmdzKTtcclxuICAgICAgdGhlbnNSZWFkeS5wdXNoKGNiKTtcclxuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNhdGNoc1Jlc29sdmVkICgpIHtcclxuICAgICAgaWYgKCFjYXRjaHMubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgIGxldCBjYiA9IGNhdGNocy5zaGlmdCgpO1xyXG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcclxuICAgICAgY2F0Y2hzUmVhZHkucHVzaChjYik7XHJcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpei5yZXNvbHZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcclxuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICB0aGl6LnJlc3VsdEFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucmVqZWN0ID0gZnVuY3Rpb24gKGVycikge1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcclxuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICB0aGl6LmVycm9yID0gZXJyIHx8IHt9O1xyXG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnByb21pc2UudGhlbiA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICB0aGVucy5wdXNoKGNiKTtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmICF0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGl6LnByb21pc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucHJvbWlzZS5jYXRjaCA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICBjYXRjaHMucHVzaChjYik7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiB0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpei5wcm9taXNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnByb21pc2UuZG9uZSA9IGZ1bmN0aW9uIChjYikge1xyXG5cclxuICAgICAgdGhlbnMucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgW251bGxdLmNvbmNhdCh0aGl6LnJlc3VsdEFyZ3MpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjYXRjaHMucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSB7XHJcbiAgICAgICAgaWYgKCF0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgaWYoY2IpIHRoaXoucHJvbWlzZS5kb25lKGNiKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgLy8gQ3JlYSB1bmEgaW5zdGFuY2lhIGRlbCBkZWZlcmVkXHJcbiAgcXNDbGFzcy5kZWZlciA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgcmV0dXJuIG5ldyBxc0NsYXNzKGNiKTtcclxuICB9O1xyXG5cclxuICBxc0NsYXNzLmFsbCA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIGNvbnN0IGRlZmVyZWQgPSBxc0NsYXNzLmRlZmVyKCk7XHJcblxyXG4gICAgbGV0IHByb21pc2VzID0ga2V5cy5sZW5ndGg7XHJcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYXJyKTtcclxuICAgIGNvbnN0IHJlc3VsdHMgPSBhcnIubGVuZ3RoPyBbXSA6IHt9O1xyXG5cclxuICAgIGtleXMubWFwKGZ1bmN0aW9uIChpZHgpIHtcclxuXHJcbiAgICAgIGFycltpZHhdLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIHByb21pc2VzLS07XHJcbiAgICAgICAgcmVzdWx0c1tpZHhdID0gcmVzdWx0O1xyXG4gICAgICAgIGlmICghcHJvbWlzZXMpe1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKHJlc3VsdHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhcnJbaWR4XS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gIH07XHJcblxyXG4gIHJldHVybiBxc0NsYXNzO1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL3FzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gcXM7XG5mdW5jdGlvbiBxcygpIHtcbiAgJ25nSW5qZWN0JztcblxuICBmdW5jdGlvbiBxc0NsYXNzKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIHRoZW5zID0gW107XG4gICAgdmFyIHRoZW5zUmVhZHkgPSBbXTtcbiAgICB2YXIgY2F0Y2hzID0gW107XG4gICAgdmFyIGNhdGNoc1JlYWR5ID0gW107XG4gICAgdmFyIHJlc3VsdEFyZ3MgPSBudWxsO1xuICAgIHZhciBlcnJvciA9IG51bGw7XG5cbiAgICB0aGl6LnByb21pc2UgPSB7fTtcbiAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gdGhlbnNSZXNvbHZlZCgpIHtcbiAgICAgIGlmICghdGhlbnMubGVuZ3RoKSByZXR1cm47XG4gICAgICB2YXIgY2IgPSB0aGVucy5zaGlmdCgpO1xuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5yZXN1bHRBcmdzKTtcbiAgICAgIHRoZW5zUmVhZHkucHVzaChjYik7XG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2F0Y2hzUmVzb2x2ZWQoKSB7XG4gICAgICBpZiAoIWNhdGNocy5sZW5ndGgpIHJldHVybjtcbiAgICAgIHZhciBjYiA9IGNhdGNocy5zaGlmdCgpO1xuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XG4gICAgICBjYXRjaHNSZWFkeS5wdXNoKGNiKTtcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgfVxuXG4gICAgdGhpei5yZXNvbHZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICB0aGl6LnJlc3VsdEFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgIH07XG5cbiAgICB0aGl6LnJlamVjdCA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgdGhpei5lcnJvciA9IGVyciB8fCB7fTtcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgfTtcblxuICAgIHRoaXoucHJvbWlzZS50aGVuID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB0aGVucy5wdXNoKGNiKTtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiAhdGhpei5lcnJvcikge1xuICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpei5wcm9taXNlO1xuICAgIH07XG5cbiAgICB0aGl6LnByb21pc2UuY2F0Y2ggPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIGNhdGNocy5wdXNoKGNiKTtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiB0aGl6LmVycm9yKSB7XG4gICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpei5wcm9taXNlO1xuICAgIH07XG5cbiAgICB0aGl6LnByb21pc2UuZG9uZSA9IGZ1bmN0aW9uIChjYikge1xuXG4gICAgICB0aGVucy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgW251bGxdLmNvbmNhdCh0aGl6LnJlc3VsdEFyZ3MpKTtcbiAgICAgIH0pO1xuXG4gICAgICBjYXRjaHMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkge1xuICAgICAgICBpZiAoIXRoaXouZXJyb3IpIHtcbiAgICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgaWYgKGNiKSB0aGl6LnByb21pc2UuZG9uZShjYik7XG4gIH07XG5cbiAgLy8gQ3JlYSB1bmEgaW5zdGFuY2lhIGRlbCBkZWZlcmVkXG4gIHFzQ2xhc3MuZGVmZXIgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICByZXR1cm4gbmV3IHFzQ2xhc3MoY2IpO1xuICB9O1xuXG4gIHFzQ2xhc3MuYWxsID0gZnVuY3Rpb24gKGFycikge1xuICAgIHZhciBkZWZlcmVkID0gcXNDbGFzcy5kZWZlcigpO1xuXG4gICAgdmFyIHByb21pc2VzID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICAgIHZhciByZXN1bHRzID0gYXJyLmxlbmd0aCA/IFtdIDoge307XG5cbiAgICBrZXlzLm1hcChmdW5jdGlvbiAoaWR4KSB7XG5cbiAgICAgIGFycltpZHhdLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICBwcm9taXNlcy0tO1xuICAgICAgICByZXN1bHRzW2lkeF0gPSByZXN1bHQ7XG4gICAgICAgIGlmICghcHJvbWlzZXMpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBhcnJbaWR4XS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkZWZlcmVkO1xuICB9O1xuXG4gIHJldHVybiBxc0NsYXNzO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL3FzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYlNlcnZpY2UgKCRsb2csIHFzLCBpZGJVdGlscywgaWRiRXZlbnRzLCBpZGJNb2RlbCkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAvLyBFbiBsYSBzaWd1aWVudGUgbGluZWEsIHB1ZWRlIGluY2x1aXIgcHJlZmlqb3MgZGUgaW1wbGVtZW50YWNpb24gcXVlIHF1aWVyYSBwcm9iYXIuXHJcbiAgY29uc3QgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xyXG4gIC8vIE5vIHVzZSBcImNvbnN0IGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cclxuICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcclxuICBjb25zdCBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XHJcbiAgY29uc3QgSURCS2V5UmFuZ2UgPSB3aW5kb3cuSURCS2V5UmFuZ2UgfHwgd2luZG93LndlYmtpdElEQktleVJhbmdlIHx8IHdpbmRvdy5tc0lEQktleVJhbmdlO1xyXG4gIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXHJcbiAgXHJcbiAgaWYgKCFpbmRleGVkREIpIHtcclxuICAgIGFsZXJ0KFwiU3UgbmF2ZWdhZG9yIG5vIHNvcG9ydGEgdW5hIHZlcnNpw7NuIGVzdGFibGUgZGUgaW5kZXhlZERCLiBUYWwgeSBjb21vIGxhcyBjYXJhY3RlcsOtc3RpY2FzIG5vIHNlcsOhbiB2YWxpZGFzXCIpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2xhc2UgcGFyYSBsYSBjcmVhY2nDs24gZGUgaW5zdGFuY2lhcyBkZSBsYSBCRFxyXG4gIGZ1bmN0aW9uIGlkYigkZGJOYW1lLCAkZGJWZXJzaW9uLCAkc29ja2V0KSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdudW1iZXInLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAvLyBNYW5lamFkb3JlcyBkZSBldmVudG9zLlxyXG4gICAgY29uc3QgJGV2ZW50c0NhbGxiYWNrcyA9IHt9O1xyXG4gICAgY29uc3QgJHVwZ3JhZGVOZWVkZWREZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgIGNvbnN0ICRvcGVuRGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcbiAgICBjb25zdCAkc29ja2V0Q29ubmVjdGVkRGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcbiAgICBsZXQgJG9wZW5lZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIEluc3RhbmNpYSBkZSBsYSBiYXNlIGRlIGRhdG9zO1xyXG4gICAgbGV0ICRyZXF1ZXN0ID0gbnVsbDtcclxuICAgIHRoaXoubW9kZWxzID0ge307XHJcblxyXG4gICAgLy8gQWdyZWdhciB1biBtYW5lamFkb3IgZGUgZXZlbnRvXHJcbiAgICB0aGl6LmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pe1xyXG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0ucHVzaChjYik7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvL1JlbXVldmUgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xyXG4gICAgdGhpei51bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHJldHVybjtcclxuXHJcbiAgICAgIC8vIEJ1c2NhciBlbCBjYlxyXG4gICAgICBjb25zdCBpZHggPSAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uaW5kZXhPZihjYik7XHJcblxyXG4gICAgICAvLyBTaSBzZSBlbmNvbnRybyBlbCBjYiByZW1vdmVybG9cclxuICAgICAgaWYgKGlkeCAhPSAtMSl7XHJcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEaXNwYXJhIHVuIGV2ZW50b1xyXG4gICAgdGhpei50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcclxuXHJcbiAgICAgICRsb2cubG9nKCRkYk5hbWUrJy52JysoJGRiVmVyc2lvbnx8MSkrJzogJytldmVudE5hbWUpO1xyXG5cclxuICAgICAgZm9yKGxldCBpIGluICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSl7XHJcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdW2ldLmFwcGx5KHRoaXosIGFyZ3MpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDYWxsYmFja3MgcGFyYSBsb3MgZXJyb3Jlc1xyXG4gICAgdGhpei5lcnJvciA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICB0aGl6LmJpbmQoaWRiRXZlbnRzLkRCX0VSUk9SLCBjYik7XHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBYnJpciB1bmEgQmFzZSBkZSBkYXRvcy5cclxuICAgIHRoaXoub3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCRvcGVuZWQpIHJldHVybiAkb3BlbkRlZmVyZWQ7XHJcblxyXG4gICAgICAvLyBDcmVhciB1biBudWV2byBkZWZlclxyXG4gICAgICAkb3BlbmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIC8vIGRlamFtb3MgYWJpZXJ0YSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcclxuICAgICAgZnVuY3Rpb24gcmVhZHkoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHJxID0gaW5kZXhlZERCLm9wZW4oJGRiTmFtZSwgJGRiVmVyc2lvbik7XHJcblxyXG4gICAgICAgIHJxLm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxyXG4gICAgICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGVsIHJlc3VsdGFkb1xyXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxyXG4gICAgICAgICAgJHJlcXVlc3QgPSBycTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gQXNpbmdhciBlbCBtYW5lamFkb3IgZGUgZXJyb3JlcyBhIGxhIEJEXHJcbiAgICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICRsb2cuZXJyb3IoJ0RhdGFiYXNlIGVycm9yOiAnKyBldmVudC50YXJnZXQuZXJyb3JDb2RlKTtcclxuICAgICAgICAgICAgdGhpei50cmlnZ2VyKGlkYkV2ZW50cy5EQl9FUlJPUiwgW2V2ZW50XSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgJG9wZW5EZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGUgZXJyb3Jlc1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEuZXJyb3JDb2RlIVxyXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZWplY3QocnEuZXJyb3JDb2RlLCBldmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZSgkZGJOYW1lKS5vbnN1Y2Nlc3MgPSByZWFkeTtcclxuICAgICAgLy8gcmVhZHkoKTtcclxuXHJcbiAgICAgIHJldHVybiAkb3BlbkRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZ3JlZ2EgdW4gbnVldm8gbW9kZWxvXHJcbiAgICB0aGl6Lm1vZGVsID0gZnVuY3Rpb24gKG5hbWUsIHNvY2tldCkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnb2JqZWN0J11dKTtcclxuXHJcbiAgICAgIC8vIEluc3RhbmNpYXIgZWwgbW9kZWxvXHJcbiAgICAgIGxldCBtb2RlbCA9IHRoaXoubW9kZWxzW25hbWVdO1xyXG5cclxuICAgICAgLy8gU2kgbm8gZXhpc3RlIGVsIG1vZGVsbyBjcmVhclxyXG4gICAgICBpZighbW9kZWwpe1xyXG4gICAgICAgIG1vZGVsID0gaWRiTW9kZWwodGhpeiwgbmFtZSwgc29ja2V0IHx8ICRzb2NrZXQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBHdWFyZGFyIGVsIG1vZGVsbyBlbiBsb3MgbW9kZWxvc1xyXG4gICAgICB0aGl6Lm1vZGVsc1tuYW1lXSA9IG1vZGVsO1xyXG5cclxuICAgICAgLy8gUmV0b3JuYXIgZWwgbW9kZWxvXHJcbiAgICAgIHJldHVybiBtb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxyXG4gICAgdGhpei5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIG1vZGVsSWQpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcclxuICAgICAgICBycS5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUobW9kZWxOYW1lLCBtb2RlbElkKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcclxuICAgIHRoaXouY3JlYXRlSW5kZXggPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XHJcbiAgICAgICAgcnEudHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5jcmVhdGVJbmRleChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSB1bmEgdHJhbnNhY2Npw7NuXHJcbiAgICB0aGl6LnRyYW5zYWN0aW9uID0gZnVuY3Rpb24obW9kZWxOYW1lLCBwZXJtcywgYWN0aW9uKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICAvLyBDdWFuZG8gc2UgYWJyYSBsYSBCRFxyXG4gICAgICAkb3BlbkRlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcclxuICAgICAgICBjb25zdCB0eCA9IHJxLnJlc3VsdC50cmFuc2FjdGlvbihtb2RlbE5hbWUsIHBlcm1zKTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhY3Rpb24odHgpO1xyXG5cclxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXHJcbiAgICAgICAgdHgub25jb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCByZXN1bHQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXHJcbiAgICAgICAgdHgub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KHR4LmVycm9yKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE9idGllbmUgdW4gZWxlbWVudG8gcG9yIHN1IGtleVxyXG4gICAgdGhpei5nZXQgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBrZXkpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnc3RyaW5nJywgJ251bWJlciddXSk7XHJcblxyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuXHJcbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXHJcbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBjb25zdCBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShycS5yZXN1bHQsIGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxyXG4gICAgICAgIHJxLm9uZXJyb3IgID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAvLyBDb3VsZCBjYWxsIHJxLnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEluc2VydGEgdW4gcmVnaXN0cm8gZW4gZWwgbW9kZWxvXHJcbiAgICB0aGl6LnB1dCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIHZhbHVlcykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cclxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBjb25zdCBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkucHV0KHZhbHVlcyk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICBycS5vbmVycm9yICA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBFbGltaW5hIHVuIG9iamV0byBwb3Igc3Uga2V5XHJcbiAgICB0aGl6LmRlbGV0ZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGtleSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cclxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBjb25zdCBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkuZGVsZXRlKGtleSk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICBycS5vbmVycm9yICA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cclxuICAgIHRoaXoub3BlbkN1cnNvciA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGZpbHRlcnMsIGVhY2hDYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ10sICdmdW5jdGlvbiddKTtcclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxyXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWRvbmx5JywgZnVuY3Rpb24gKHR4KSB7XHJcbiAgICAgICAgY29uc3QgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLm9wZW5DdXJzb3IoKTtcclxuXHJcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBycS5yZXN1bHQ7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIE5vIG1vcmUgbWF0Y2hpbmcgcmVjb3Jkcy5cclxuICAgICAgICAgIGlmIChjdXJzb3Ipe1xyXG4gICAgICAgICAgICBlYWNoQ2IoY3Vyc29yLnZhbHVlLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgLy8gQnVzY2FyIHNpZ3VpZW50ZVxyXG4gICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcmVkLnJlc29sdmUoKTtcclxuICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWFyIGFsaWFzIHBhcmEgbG9zIGV2ZW50b3MgZW5sYXphciBjYWxsYmFja3MgYSBsb3MgZXZlbnRvc1xyXG4gICAgbGV0IGRlZmVyZWRzO1xyXG4gICAgT2JqZWN0LmtleXMoZGVmZXJlZHMgPSB7XHJcbiAgICAgIG9uT3BlbjogJG9wZW5EZWZlcmVkLFxyXG4gICAgICBvblVwZ3JhZGVOZWVkZWQ6ICR1cGdyYWRlTmVlZGVkRGVmZXJlZCxcclxuICAgICAgb25Tb2NrZXRDb25uZWN0ZWQ6ICRzb2NrZXRDb25uZWN0ZWREZWZlcmVkXHJcbiAgICB9KS5tYXAoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9ICRkYk5hbWUrJy52JysoJGRiVmVyc2lvbnx8MSkrJzogJytrZXk7XHJcbiAgICAgICAgaWYgKGVycil7XHJcbiAgICAgICAgICAkbG9nLmVycm9yKHRleHQsIGVycik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICRsb2cubG9nKHRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXpba2V5XSA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcclxuICAgICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShjYik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGlkYjtcclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYlNlcnZpY2U7XG5mdW5jdGlvbiBpZGJTZXJ2aWNlKCRsb2csIHFzLCBpZGJVdGlscywgaWRiRXZlbnRzLCBpZGJNb2RlbCkge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cblxuICB2YXIgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xuICAvLyBObyB1c2UgXCJjb25zdCBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXG4gIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxuICB2YXIgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xuICB2YXIgSURCS2V5UmFuZ2UgPSB3aW5kb3cuSURCS2V5UmFuZ2UgfHwgd2luZG93LndlYmtpdElEQktleVJhbmdlIHx8IHdpbmRvdy5tc0lEQktleVJhbmdlO1xuICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxuXG4gIGlmICghaW5kZXhlZERCKSB7XG4gICAgYWxlcnQoXCJTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXNcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gQ2xhc2UgcGFyYSBsYSBjcmVhY2nDs24gZGUgaW5zdGFuY2lhcyBkZSBsYSBCRFxuICBmdW5jdGlvbiBpZGIoJGRiTmFtZSwgJGRiVmVyc2lvbiwgJHNvY2tldCkge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ251bWJlcicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgLy8gTWFuZWphZG9yZXMgZGUgZXZlbnRvcy5cbiAgICB2YXIgJGV2ZW50c0NhbGxiYWNrcyA9IHt9O1xuICAgIHZhciAkdXBncmFkZU5lZWRlZERlZmVyZWQgPSBxcy5kZWZlcigpO1xuICAgIHZhciAkb3BlbkRlZmVyZWQgPSBxcy5kZWZlcigpO1xuICAgIHZhciAkc29ja2V0Q29ubmVjdGVkRGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgdmFyICRvcGVuZWQgPSBmYWxzZTtcblxuICAgIC8vIEluc3RhbmNpYSBkZSBsYSBiYXNlIGRlIGRhdG9zO1xuICAgIHZhciAkcmVxdWVzdCA9IG51bGw7XG4gICAgdGhpei5tb2RlbHMgPSB7fTtcblxuICAgIC8vIEFncmVnYXIgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xuICAgIHRoaXouYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkge1xuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnB1c2goY2IpO1xuICAgIH07XG5cbiAgICAvL1JlbXVldmUgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xuICAgIHRoaXoudW5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSByZXR1cm47XG5cbiAgICAgIC8vIEJ1c2NhciBlbCBjYlxuICAgICAgdmFyIGlkeCA9ICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5pbmRleE9mKGNiKTtcblxuICAgICAgLy8gU2kgc2UgZW5jb250cm8gZWwgY2IgcmVtb3ZlcmxvXG4gICAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gRGlzcGFyYSB1biBldmVudG9cbiAgICB0aGl6LnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcblxuICAgICAgJGxvZy5sb2coJGRiTmFtZSArICcudicgKyAoJGRiVmVyc2lvbiB8fCAxKSArICc6ICcgKyBldmVudE5hbWUpO1xuXG4gICAgICBmb3IgKHZhciBpIGluICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkge1xuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpeiwgYXJncyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIENhbGxiYWNrcyBwYXJhIGxvcyBlcnJvcmVzXG4gICAgdGhpei5lcnJvciA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgdGhpei5iaW5kKGlkYkV2ZW50cy5EQl9FUlJPUiwgY2IpO1xuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIC8vIEFicmlyIHVuYSBCYXNlIGRlIGRhdG9zLlxuICAgIHRoaXoub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgkb3BlbmVkKSByZXR1cm4gJG9wZW5EZWZlcmVkO1xuXG4gICAgICAvLyBDcmVhciB1biBudWV2byBkZWZlclxuICAgICAgJG9wZW5lZCA9IHRydWU7XG5cbiAgICAgIC8vIGRlamFtb3MgYWJpZXJ0YSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcbiAgICAgIGZ1bmN0aW9uIHJlYWR5KCkge1xuXG4gICAgICAgIHZhciBycSA9IGluZGV4ZWREQi5vcGVuKCRkYk5hbWUsICRkYlZlcnNpb24pO1xuXG4gICAgICAgIHJxLm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLnJlc3VsdCFcbiAgICAgICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucmVzb2x2ZShldmVudCwgcnEpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlbCByZXN1bHRhZG9cbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxuICAgICAgICAgICRyZXF1ZXN0ID0gcnE7XG5cbiAgICAgICAgICAvLyBBc2luZ2FyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzIGEgbGEgQkRcbiAgICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAkbG9nLmVycm9yKCdEYXRhYmFzZSBlcnJvcjogJyArIGV2ZW50LnRhcmdldC5lcnJvckNvZGUpO1xuICAgICAgICAgICAgdGhpei50cmlnZ2VyKGlkYkV2ZW50cy5EQl9FUlJPUiwgW2V2ZW50XSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBycSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGUgZXJyb3Jlc1xuICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5lcnJvckNvZGUhXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAkb3BlbkRlZmVyZWQucmVqZWN0KHJxLmVycm9yQ29kZSwgZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKCRkYk5hbWUpLm9uc3VjY2VzcyA9IHJlYWR5O1xuICAgICAgLy8gcmVhZHkoKTtcblxuICAgICAgcmV0dXJuICRvcGVuRGVmZXJlZDtcbiAgICB9O1xuXG4gICAgLy8gQWdyZWdhIHVuIG51ZXZvIG1vZGVsb1xuICAgIHRoaXoubW9kZWwgPSBmdW5jdGlvbiAobmFtZSwgc29ja2V0KSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnb2JqZWN0J11dKTtcblxuICAgICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG9cbiAgICAgIHZhciBtb2RlbCA9IHRoaXoubW9kZWxzW25hbWVdO1xuXG4gICAgICAvLyBTaSBubyBleGlzdGUgZWwgbW9kZWxvIGNyZWFyXG4gICAgICBpZiAoIW1vZGVsKSB7XG4gICAgICAgIG1vZGVsID0gaWRiTW9kZWwodGhpeiwgbmFtZSwgc29ja2V0IHx8ICRzb2NrZXQpO1xuICAgICAgfVxuXG4gICAgICAvLyBHdWFyZGFyIGVsIG1vZGVsbyBlbiBsb3MgbW9kZWxvc1xuICAgICAgdGhpei5tb2RlbHNbbmFtZV0gPSBtb2RlbDtcblxuICAgICAgLy8gUmV0b3JuYXIgZWwgbW9kZWxvXG4gICAgICByZXR1cm4gbW9kZWw7XG4gICAgfTtcblxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxuICAgIHRoaXouY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBtb2RlbElkKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XG4gICAgICAgIHJxLnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShtb2RlbE5hbWUsIG1vZGVsSWQpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxuICAgIHRoaXouY3JlYXRlSW5kZXggPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XG4gICAgICAgIHJxLnRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG1vZGVsTmFtZSkuY3JlYXRlSW5kZXgoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIENyZWEgdW5hIHRyYW5zYWNjacOzblxuICAgIHRoaXoudHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBwZXJtcywgYWN0aW9uKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAvLyBDdWFuZG8gc2UgYWJyYSBsYSBCRFxuICAgICAgJG9wZW5EZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XG4gICAgICAgIHZhciB0eCA9IHJxLnJlc3VsdC50cmFuc2FjdGlvbihtb2RlbE5hbWUsIHBlcm1zKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGFjdGlvbih0eCk7XG5cbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxuICAgICAgICB0eC5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCByZXN1bHQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXG4gICAgICAgIHR4Lm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QodHguZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBPYnRpZW5lIHVuIGVsZW1lbnRvIHBvciBzdSBrZXlcbiAgICB0aGl6LmdldCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGtleSkge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnc3RyaW5nJywgJ251bWJlciddXSk7XG5cbiAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcblxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcbiAgICAgICAgdmFyIHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5nZXQoa2V5KTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShycS5yZXN1bHQsIGV2ZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBJbnNlcnRhIHVuIHJlZ2lzdHJvIGVuIGVsIG1vZGVsb1xuICAgIHRoaXoucHV0ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgdmFsdWVzKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHgpIHtcbiAgICAgICAgdmFyIHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5wdXQodmFsdWVzKTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vIENvdWxkIGNhbGwgcnEucHJldmVudERlZmF1bHQoKSB0byBwcmV2ZW50IHRoZSB0cmFuc2FjdGlvbiBmcm9tIGFib3J0aW5nLlxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICB9O1xuXG4gICAgLy8gRWxpbWluYSB1biBvYmpldG8gcG9yIHN1IGtleVxuICAgIHRoaXouZGVsZXRlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwga2V5KSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHgpIHtcbiAgICAgICAgdmFyIHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5kZWxldGUoa2V5KTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vIENvdWxkIGNhbGwgcnEucHJldmVudERlZmF1bHQoKSB0byBwcmV2ZW50IHRoZSB0cmFuc2FjdGlvbiBmcm9tIGFib3J0aW5nLlxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICB9O1xuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cbiAgICB0aGl6Lm9wZW5DdXJzb3IgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBmaWx0ZXJzLCBlYWNoQ2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgJ2Z1bmN0aW9uJ10pO1xuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLm9wZW5DdXJzb3IoKTtcblxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGN1cnNvciA9IHJxLnJlc3VsdDtcblxuICAgICAgICAgIC8vIE5vIG1vcmUgbWF0Y2hpbmcgcmVjb3Jkcy5cbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBlYWNoQ2IoY3Vyc29yLnZhbHVlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIC8vIEJ1c2NhciBzaWd1aWVudGVcbiAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBDcmVhciBhbGlhcyBwYXJhIGxvcyBldmVudG9zIGVubGF6YXIgY2FsbGJhY2tzIGEgbG9zIGV2ZW50b3NcbiAgICB2YXIgZGVmZXJlZHMgPSB2b2lkIDA7XG4gICAgT2JqZWN0LmtleXMoZGVmZXJlZHMgPSB7XG4gICAgICBvbk9wZW46ICRvcGVuRGVmZXJlZCxcbiAgICAgIG9uVXBncmFkZU5lZWRlZDogJHVwZ3JhZGVOZWVkZWREZWZlcmVkLFxuICAgICAgb25Tb2NrZXRDb25uZWN0ZWQ6ICRzb2NrZXRDb25uZWN0ZWREZWZlcmVkXG4gICAgfSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdmFyIHRleHQgPSAkZGJOYW1lICsgJy52JyArICgkZGJWZXJzaW9uIHx8IDEpICsgJzogJyArIGtleTtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICRsb2cuZXJyb3IodGV4dCwgZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkbG9nLmxvZyh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGl6W2tleV0gPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xuICAgICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShjYik7XG4gICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gaWRiO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJNb2RlbFNlcnZpY2UgKCRsb2csIHFzLCBpZGJVdGlscywgaWRiUXVlcnksIGlkYkV2ZW50cywgbGJSZXNvdXJjZSwgJHRpbWVvdXQpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gQnVzY2FyIHVuIGNhbXBvXHJcbiAgY29uc3Qgc2VhcmNoRGVlcEZpZWxkID0gZnVuY3Rpb24gKG9iaiwgZmllbGQsIGNiKSB7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgJ3N0cmluZycsICdmdW5jdGlvbiddKTtcclxuXHJcbiAgICBjb25zdCBmaWVsZHMgPSBmaWVsZC5zcGxpdCgnLicpO1xyXG4gICAgY29uc3QgbGFzdEZpZWxkID0gZmllbGRzLnBvcCgpO1xyXG5cclxuICAgIHJldHVybiAoZnVuY3Rpb24gX3NldChvYmopIHtcclxuICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMClcclxuICAgICAgICByZXR1cm4gY2Iob2JqLCBsYXN0RmllbGQpO1xyXG4gICAgICBjb25zdCBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xyXG4gICAgICBpZiAodHlwZW9mIG9ialtmaWVsZF0gPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICAgIG9ialtmaWVsZF0gPSB7fTtcclxuICAgICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XHJcbiAgICB9KShvYmopO1xyXG5cclxuICB9O1xyXG5cclxuICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cclxuICBjb25zdCBnZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gKG9iaiwgZmllbGQpIHtcclxuICAgIHJldHVybiBzZWFyY2hEZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xyXG4gIGNvbnN0IHNldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgdmFsdWUpIHtcclxuICAgIHNlYXJjaERlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgb2JqW2xhc3RGaWVsZF0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG9iajtcclxuICB9O1xyXG5cclxuICByZXR1cm4gZnVuY3Rpb24gaWRiTW9kZWwgKCRkYiwgJG1vZGVsTmFtZSwgJHNvY2tldCkge1xyXG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbbnVsbCAsJ3N0cmluZyddKTtcclxuXHJcbiAgICAvLyBDbGF2ZSBkZWwgbW9kZWxvXHJcbiAgICBjb25zdCAkaWQgPSB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfTtcclxuICAgIGNvbnN0ICRldmVudHNIYW5kbGVycyA9IHt9O1xyXG4gICAgY29uc3QgJGluc3RhbmNlcyA9IHt9O1xyXG4gICAgbGV0ICRmaWVsZHMgPSB7fTtcclxuICAgIGxldCAkcmVtb3RlID0gbnVsbDtcclxuICAgIGxldCAkdmVyc2lvbmluZyA9IG51bGw7XHJcblxyXG4gICAgLy8gQ29uc3R1Y3RvciBkZWwgbW9kZWxvXHJcbiAgICBmdW5jdGlvbiBNb2RlbChkYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgdGhpei4kcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIHRoaXouJGxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGl6LiRsb2NhbExvYWRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGl6LiRyZW1vdGVMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgXHJcbiAgICAgIHRoaXouJGxvY2FsVmFsdWVzID0ge307XHJcbiAgICAgIHRoaXouJHJlbW90ZVZhbHVlcyA9IHt9O1xyXG5cclxuICAgICAgdGhpei4kdmVyc2lvbiA9IG51bGw7XHJcbiAgICAgIHRoaXouJGxvY2FsVmVyc2lvbiA9IG51bGw7XHJcbiAgICAgIHRoaXouJHJlbW90ZVZlcnNpb24gPSBudWxsO1xyXG5cclxuICAgICAgdGhpei4kZXZlbnRzSGFuZGxlcnMgPSB7fTtcclxuICAgICAgXHJcbiAgICAgIGlmIChkYXRhKXtcclxuICAgICAgICB0aGl6LiRzZXRWYWx1ZXMoZGF0YSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXouJGNvbnN0cnVjdG9yKGRhdGEpO1xyXG5cclxuICAgICAgaWYgKCRzb2NrZXQpIHtcclxuICAgICAgICB0aGl6LiRsaXN0ZW4oKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgJHJlc3VsdHMgPSBbXTtcclxuXHJcbiAgICAgIHRoaXpcclxuICAgICAgICBcclxuICAgICAgICAvLyBDdWFuZG8gc2VhIGNvbnN1bHRhZG8gYWdyZWdhciBsYSBjb25zdWx0YVxyXG4gICAgICAgIC4kYmluZChpZGJFdmVudHMuTU9ERUxfUVVFUklFRCwgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgJHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIEN1YW5kbyBzZWEgbGliZXJhZG8gZGUgbGEgY29uc3VsdGFyIHF1aXRhciBkZSBsYXMgY29uc3VsdGFzXHJcbiAgICAgICAgLiRiaW5kKGlkYkV2ZW50cy5NT0RFTF9VTlFVRVJJRUQsIGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgIGNvbnN0IGlkeCA9ICRyZXN1bHRzLmluZGV4T2YocmVzdWx0KTtcclxuICAgICAgICAgIGlmIChpZHggIT0gLTEpe1xyXG4gICAgICAgICAgICAkcmVzdWx0cy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBFdmVudG8gZGUgcXVlIG1vZGVsbyBlc3TDoSBpbnN0YW5jaWFkb1xyXG4gICAgICAgIC4kZW1pdChpZGJFdmVudHMuTU9ERUxfSU5TVEFOQ0VEKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHYgZWwgbm9tYnJlIGRlbCBtb2RlbG9cclxuICAgIE1vZGVsLmdldE1vZGVsTmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHJldHVybiAkbW9kZWxOYW1lO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xyXG4gICAgTW9kZWwuYXV0b0luY3JlbWVudCA9IGZ1bmN0aW9uIChhdXRvSW5jcmVtZW50KSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydib29sZWFuJ10pO1xyXG5cclxuICAgICAgJGlkLmF1dG9JbmNyZW1lbnQgPSBhdXRvSW5jcmVtZW50O1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgZWwgSUQgYWwgbW9kZWxvXHJcbiAgICBNb2RlbC5rZXlQYXRoID0gZnVuY3Rpb24gKGtleVBhdGgpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZyddKTtcclxuXHJcbiAgICAgICRpZC5rZXlQYXRoID0ga2V5UGF0aDtcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RvIHN0b3JhZ2UgcGFyYSBlbCBtb2RlbG8uXHJcbiAgICBNb2RlbC5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICRkYi5jcmVhdGVTdG9yZSgkbW9kZWxOYW1lLCAkaWQpO1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZ3JlZ2EgdW4gaW5kZXhcclxuICAgIE1vZGVsLmluZGV4ID0gZnVuY3Rpb24gKGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XHJcblxyXG4gICAgICAkZGIuY3JlYXRlSW5kZXgoJG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBNw6l0b2RvIHF1ZSBwZXJtaXRlIG1vZGlmaWNhciBtb2RlbC5cclxuICAgIE1vZGVsLmJ1aWxkID0gZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgYnVpbGRDYWxsYmFjayhNb2RlbCk7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBsYSBlc3BlY2lmaWNhY2nDs24gZGUgbG9zIGNhbXBvc1xyXG4gICAgTW9kZWwuZmllbGRzID0gZnVuY3Rpb24gKGZpZWxkcykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xyXG5cclxuICAgICAgJGZpZWxkcyA9IHt9O1xyXG4gICAgICAkZmllbGRzWyRpZC5rZXlQYXRoXSA9IHtcclxuICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIixcclxuICAgICAgICBcInJlcXVpcmVkXCI6IHRydWVcclxuICAgICAgfTtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZE5hbWUpIHtcclxuICAgICAgICBsZXQgZmllbGQgPSBmaWVsZHNbZmllbGROYW1lXTtcclxuICAgICAgICBpZiAodHlwZW9mIGZpZWxkc1tmaWVsZE5hbWVdID09ICdzdHJpbmcnKXtcclxuICAgICAgICAgIGZpZWxkID0geyBcInR5cGVcIjogZmllbGQgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJGZpZWxkc1tmaWVsZE5hbWVdID0gZmllbGQ7XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGk7XHJcbiAgICBNb2RlbC5yZW1vdGUgPSBmdW5jdGlvbiAodXJsLCBhcmdzLCBhY3Rpb25zKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0JywgJ29iamVjdCddKTtcclxuXHJcbiAgICAgICRyZW1vdGUgPSBsYlJlc291cmNlKHVybCwgYXJncywgYWN0aW9ucyk7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgJHJlbW90ZSBkZWwgbW9kZWxvXHJcbiAgICBNb2RlbC5nZXRSZW1vdGUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICByZXR1cm4gJHJlbW90ZTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGNvcnJlc3BvbmRpZW50ZSBhbCBrZXkgZGUgdW4gb2JqZXRvXHJcbiAgICBNb2RlbC5nZXRLZXlGcm9tID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUoZGF0YSwgJGlkLmtleVBhdGgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGVsIG1vZGVsIGRlIGxhcyBndWFyZGFkYXMuIFNpIG5vIGV4aXN0ZSBlbnRvbmNlXHJcbiAgICAvLyBzZSBjcmVhXHJcbiAgICBNb2RlbC5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydzdHJpbmcnLCAnbnVtYmVyJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcclxuICAgICAgaWYgKCFrZXkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1vZGVsKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE5vIGV4aXN0ZSBsYSBpbnN0YW5jaWEgZW50b25jZSBzZSBjcmVhXHJcbiAgICAgIGlmICghJGluc3RhbmNlc1trZXldKXtcclxuICAgICAgICAkaW5zdGFuY2VzW2tleV0gPSBuZXcgTW9kZWwoKTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgcmV0dXJuICRpbnN0YW5jZXNba2V5XTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEJ1c2NhIHVuIHJlZ2lzdHJvIGVuIGxhIG9iamVjdFN0b3JlIGRlbCBtb2RlbG8uXHJcbiAgICBNb2RlbC5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcblxyXG4gICAgICBjb25zdCBpbnN0YW5jZSA9IE1vZGVsLmdldEluc3RhbmNlKGtleSk7XHJcblxyXG4gICAgICBpZiAoaW5zdGFuY2UuJGxvY2FsTG9hZGVkKSByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgICAgXHJcbiAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IGZhbHNlO1xyXG4gICAgICBpbnN0YW5jZS4kcHJvbWlzZSA9IGRlZmVyZWQucHJvbWlzZTtcclxuXHJcbiAgICAgICRkYi5nZXQoJG1vZGVsTmFtZSwga2V5KS5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBNb2RlbC5nZXRWZXJzaW9uT2Yoa2V5KS5wcm9taXNlXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAodmVyc2lvbikge1xyXG4gICAgICAgICAgICBpbnN0YW5jZS4kc2V0TG9jYWxWYWx1ZXMoZGF0YSwgZGF0YSAmJiB2ZXJzaW9uPyB2ZXJzaW9uLmhhc2ggOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICRsb2cuZXJyb3IoWydNb2RlbC5nZXRWZXJzaW9uT2YgYW55IGVycm9yJywgZXJyXSlcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cclxuICAgIE1vZGVsLmZpbmQgPSBmdW5jdGlvbiAoZmlsdGVycykge1xyXG5cclxuICAgICAgcmV0dXJuIG5ldyBpZGJRdWVyeSgkZGIsIE1vZGVsLCBmaWx0ZXJzKTs7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIG51ZXZhcyBpbnN0YW5jaWFzIGRlIGxvcyBtb2RlbG9zXHJcbiAgICBNb2RlbC5jcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgLy8gU2kgZXMgdW4gYXJyYXlcclxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCByZWNvcmQgPSBNb2RlbC5nZXRJbnN0YW5jZShNb2RlbC5nZXRLZXlGcm9tKGRhdGEpKTtcclxuXHJcbiAgICAgICAgaWYgKHJlY29yZC4kbG9hZGVkKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkNhbnRDcmVhdGVkTG9hZGVkSW5zdGFuY2UnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZWNvcmQuJHB1bGwoKTtcclxuXHJcbiAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgLy8gT2J0ZW5lciB1bmEgY29waWEgZGVsIGFycmF5XHJcbiAgICAgIGNvbnN0IGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRhdGEpO1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKGNiKTtcclxuXHJcbiAgICAgIChmdW5jdGlvbiBpdGVyYXRpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyBObyBxdWVkYW4gZWxlbWVudG9zIGVuIGVsIGFycmF5XHJcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT0gMCkgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZShyZXN1bHQpO1xyXG5cclxuICAgICAgICAvLyBDcmVhciBlbCBzaWd1aWVudGUgZWxlbWVudG9cclxuICAgICAgICBNb2RlbC5jcmVhdGUoYXJyLnNoaWZ0KCkpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBpdGVyYXRpb24oKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KSgpO1xyXG5cclxuICAgICAgLy8gRGV2b2x2ZXIgZWwgcHJvbWlzZVxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgdW4gbW9kZWxvIHBhcmEgZ3VhcmRhciBsYXMgdmVyc2lvbmVzIGRlbCBtb2RlbG8gYWN0dWFsXHJcbiAgICBNb2RlbC52ZXJzaW9uaW5nID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgY2IpIHtcclxuICAgICAgaWYgKHR5cGVvZiBtb2RlbE5hbWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjYiA9IG1vZGVsTmFtZTtcclxuICAgICAgICBtb2RlbE5hbWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoW21vZGVsTmFtZSwgY2JdLCBbWydzdHJpbmcnLCAndW5kZWZpbmVkJ10sIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGlmICghJHZlcnNpb25pbmcpIHtcclxuXHJcbiAgICAgICAgLy8gU2kgZWwgbW9kZWwgbm8gdGllbmUgbm9tYnJlIHNlIGFncmVnYVxyXG4gICAgICAgIGlmICghbW9kZWxOYW1lKXtcclxuICAgICAgICAgIG1vZGVsTmFtZSA9ICRtb2RlbE5hbWUrJ192ZXJzaW9uaW5nJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENyZWFyIG1vZGVsbyBwYXJhIGVsIG1hbmVqbyBkZSBkYXRvc1xyXG4gICAgICAgICR2ZXJzaW9uaW5nID0gJGRiLm1vZGVsKG1vZGVsTmFtZSlcclxuICAgICAgICAgIC5hdXRvSW5jcmVtZW50KGZhbHNlKVxyXG4gICAgICAgICAgLmtleVBhdGgoJGlkLmtleVBhdGgpXHJcbiAgICAgICAgICAuZmllbGRzKHtcclxuICAgICAgICAgICAgXCJoYXNoXCI6IHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9LFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2IpIGNiKCR2ZXJzaW9uaW5nKTtcclxuXHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZSBsYSB2ZXJzaW9uIGxvY2FsIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwuZ2V0VmVyc2lvbk9mID0gZnVuY3Rpb24gKGtleSkgeyBcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgaWYgKCR2ZXJzaW9uaW5nKSB7XHJcbiAgICAgICAgJHZlcnNpb25pbmcuZ2V0KGtleSkuJHByb21pc2VcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZSh2ZXJzaW9uKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkZWZlcmVkLnJlamVjdChudWxsKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRlZmVyZWQucmVzb2x2ZShudWxsKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZ3JlZ2EgdW4gbWFuZGVqYWRvciBkZSBldmVudG9zIGFsIG1vZGVsb1xyXG4gICAgTW9kZWwuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGlmICghJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xyXG5cclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGlzcGFyYSB1biBldmVudG8gZGVsIG1vZGVsXHJcbiAgICBNb2RlbC5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnYXJyYXknXV0pO1xyXG5cclxuICAgICAgaWYgKCRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ubWFwKGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgY2IuYXBwbHkoTW9kZWwsIGFyZ3MgfHwgW10pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGdldCA9IGZ1bmN0aW9uIChmaWVsZCkge1xyXG5cclxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0ID0gZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkge1xyXG5cclxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQsIHZhbHVlKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIHVuIG9iamV0byBjb24gbGFzIHByb3BpZWRhZGVzIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRnZXRWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgY29uc3QgdmFsdWVzID0ge307XHJcbiAgICAgIGRhdGEgPSBkYXRhIHx8IHRoaXM7XHJcblxyXG4gICAgICBPYmplY3Qua2V5cygkZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh2YWx1ZXMsIGZpZWxkLCBnZXRGaWVsZFZhbHVlKGRhdGEsIGZpZWxkKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHZhbHVlcztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIHVuIG9iamV0byBjb24gbGFzIHByb3BpZWRhZGVzIGxvY2FsZXMgZGVsIHJlZ2lzdHJvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGdldExvY2FsVmFsdWVzID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuJGdldFZhbHVlcyh0aGlzLiRsb2NhbFZhbHVlcyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSB1biBtb2RlbG8gY29uIGxhcyBwcm9waWVkYWRlcyByZW1vdGFzIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRnZXRSZW1vdGVWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy4kZ2V0VmFsdWVzKHRoaXMuJHJlbW90ZVZhbHVlcyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRzZXRWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSwgdmVyc2lvbikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XHJcbiAgICAgIFxyXG4gICAgICB0aGl6LiR2ZXJzaW9uID0gdmVyc2lvbjtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXosIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpei4kbG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGxhcyBwcm9waWVkYWRlcyBsb2NhbGVzIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRzZXRMb2NhbFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhLCB2ZXJzaW9uKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcclxuICAgICAgXHJcbiAgICAgIHRoaXouJGxvY2FsVmVyc2lvbiA9IHZlcnNpb247XHJcblxyXG4gICAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRsb2NhbFZhbHVlcywgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgIHRoaXouJGxvY2FsTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICBpZiAoIXRoaXouJGxvYWRlZCkge1xyXG4gICAgICAgICAgdGhpei4kc2V0VmFsdWVzKGRhdGEsIHZlcnNpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGxhcyBwcm9waWVkYWRlcyByZW1vdGFzIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRzZXRSZW1vdGVWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSwgdmVyc2lvbikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XHJcbiAgICAgIFxyXG4gICAgICB0aGl6LiRyZW1vdGVWZXJzaW9uID0gdmVyc2lvbjtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJHJlbW90ZVZhbHVlcywgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgIHRoaXouJHJlbW90ZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKCF0aGl6LiRsb2FkZWQpIHtcclxuICAgICAgICAgIHRoaXouJHNldFZhbHVlcyhkYXRhLCB2ZXJzaW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGVsIElEIGRlbCBvYmpldG9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0S2V5ID0gZnVuY3Rpb24gKG5ld0tleSkge1xyXG4gICAgICBcclxuICAgICAgY29uc3Qgb2xkS2V5ID0gTW9kZWwuZ2V0S2V5RnJvbSh0aGlzKTtcclxuXHJcbiAgICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGlzLCAkaWQua2V5UGF0aCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICAgICAgb2JqW2xhc3RGaWVsZF0gPSBuZXdLZXk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKG9sZEtleSAhPT0gbmV3S2V5KSB7XHJcblxyXG4gICAgICAgIGlmIChvbGRLZXkgJiYgJGluc3RhbmNlc1tvbGRLZXldICYmICRpbnN0YW5jZXNbb2xkS2V5XSAhPSB0aGlzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkluc3RhbmNlT2ZPbGRLZXlJc05vdFNhbWUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5ld0tleSAmJiAkaW5zdGFuY2VzW25ld0tleV0gJiYgJGluc3RhbmNlc1tuZXdLZXldICE9IHRoaXMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk5ld0tleUlzTm90U2FtZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRWxpbWluYXIgYW50ZXJpb3JcclxuICAgICAgICBpZiAob2xkS2V5ICYmICRpbnN0YW5jZXNbb2xkS2V5XSkge1xyXG4gICAgICAgICAgZGVsZXRlICRpbnN0YW5jZXNbb2xkS2V5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFncmVnYXIgbnVldmFcclxuICAgICAgICBpZiAobmV3S2V5ICYmICEkaW5zdGFuY2VzW25ld0tleV0pIHtcclxuICAgICAgICAgICRpbnN0YW5jZXNbbmV3S2V5XSA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbnN0dXJjdG9yIHF1ZSBzZSBwdWVkZSBzb2JyZSBlc2NyaWJpclxyXG4gICAgTW9kZWwucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEd1YXJkYSBsb3MgZGF0b3MgZGVsIG9iamV0b1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRwdWxsID0gZnVuY3Rpb24gKG5ld1ZhbHVlcywgdmVyc2lvbil7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgaWYgKG5ld1ZhbHVlcykge1xyXG4gICAgICAgIG5ld1ZhbHVlcyA9IHRoaXouJGdldFZhbHVlcyhuZXdWYWx1ZXMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld1ZhbHVlcyA9IHRoaXouJGdldFJlbW90ZVZhbHVlcygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBuZXdLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKG5ld1ZhbHVlcyk7XHJcbiAgICAgIGNvbnN0IG9sZFZhbHVlcyA9IHRoaXouJGdldExvY2FsVmFsdWVzKCk7XHJcbiAgICAgIGNvbnN0IG9sZEtleSA9IE1vZGVsLmdldEtleUZyb20ob2xkVmFsdWVzKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKG5ld0tleSwgb2xkS2V5KTtcclxuICAgICAgY29uc29sZS5sb2cobmV3VmFsdWVzLCBvbGRWYWx1ZXMpO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBGdW5jaW9uIHF1ZSBoYWNlIGVzY3VjaGFycyBsb3MgbWVuc2FqZXMgZGVsIHNvY2tldCBwYXJhIGVsIG1vZGVsXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGxpc3RlbiA9IGZ1bmN0aW9uICgpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlmICghJHNvY2tldCkgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5Eb2VzTm90SGF2ZVNvY2tldEluc3RhbmNlJyk7XHJcblxyXG4gICAgICAvLyBDcmVhciB1bmEgc3Vic2NyaXBjaW9uIGFsIHNvY2tldCBwYXJhIGN1YW5kbyBzZSByZWNpYmFuIGRhdG9zXHJcbiAgICAgIC8vIHBhcmEgbGEgaW5zdGFuY2lhIGFjdHVhbFxyXG4gICAgICAkc29ja2V0LnN1YnNjcmliZSh7XHJcbiAgICAgICAgbW9kZWxOYW1lOiAkbW9kZWxOYW1lLFxyXG4gICAgICAgIGV2ZW50TmFtZTogJ3VwZGF0ZScsXHJcbiAgICAgICAgbW9kZWxJZDogdGhpei4kZ2V0KCRpZC5rZXlQYXRoKSxcclxuICAgICAgfSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgLy8gQSByZWNpYmlyIGRhdG9zIGRlbCBzb2NrZXQgYXNpZ25hciBsb3MgdmFsb3Jlc1xyXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIC8vIEVtaXRpciBldmVudG8gZGUgZGF0b3MgcmVjaWJpZG9yIHBhcmEgZWwgbW9kZWxvXHJcbiAgICAgICAgICB0aGl6LiRzZXRSZW1vdGVWYWx1ZXMoZGF0YS52YWx1ZXMsIGRhdGEudmVyc2lvbik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBtYW5kZWphZG9yIGRlIGV2ZW50b3NcclxuICAgIE1vZGVsLnByb3RvdHlwZS4kYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGlmICghdGhpcy4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSkge1xyXG4gICAgICAgIHRoaXMuJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEaXNwYXJhIHVuIGV2ZW50b1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRlbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsndW5kZWZpbmVkJywgJ2FycmF5J11dKTtcclxuXHJcbiAgICAgIC8vIExsYW1hciBlbCBldmVudG8gcGFyYSBlbCBtb2RlbG9cclxuICAgICAgTW9kZWwuZW1pdChldmVudE5hbWUsIFt0aGl6LCBbXS5jb25jYXQoW3RoaXpdKS5jb25jYXQoYXJncyldKTtcclxuXHJcbiAgICAgIGlmICh0aGl6LiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgdGhpei4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5tYXAoZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgICBjYi5hcHBseSh0aGl6LCBhcmdzIHx8IFtdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBNb2RlbC4kaW5zdGFuY2VzID0gJGluc3RhbmNlcztcclxuXHJcbiAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gIH07XHJcblxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJNb2RlbFNlcnZpY2U7XG5mdW5jdGlvbiBpZGJNb2RlbFNlcnZpY2UoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJRdWVyeSwgaWRiRXZlbnRzLCBsYlJlc291cmNlLCAkdGltZW91dCkge1xuICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgLy8gQnVzY2FyIHVuIGNhbXBvXG5cbiAgICAgIHZhciBzZWFyY2hEZWVwRmllbGQgPSBmdW5jdGlvbiBzZWFyY2hEZWVwRmllbGQob2JqLCBmaWVsZCwgY2IpIHtcbiAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICAgICAgICB2YXIgZmllbGRzID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIHZhciBsYXN0RmllbGQgPSBmaWVsZHMucG9wKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBfc2V0KG9iaikge1xuICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMCkgcmV0dXJuIGNiKG9iaiwgbGFzdEZpZWxkKTtcbiAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAndW5kZWZpbmVkJykgb2JqW2ZpZWxkXSA9IHt9O1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XG4gICAgICAgICAgICB9KG9iaik7XG4gICAgICB9O1xuXG4gICAgICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cbiAgICAgIHZhciBnZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gZ2V0RmllbGRWYWx1ZShvYmosIGZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VhcmNoRGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xuICAgICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cbiAgICAgIHZhciBzZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gc2V0RmllbGRWYWx1ZShvYmosIGZpZWxkLCB2YWx1ZSkge1xuICAgICAgICAgICAgc2VhcmNoRGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICAgICAgICAgICAgb2JqW2xhc3RGaWVsZF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpZGJNb2RlbCgkZGIsICRtb2RlbE5hbWUsICRzb2NrZXQpIHtcbiAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW251bGwsICdzdHJpbmcnXSk7XG5cbiAgICAgICAgICAgIC8vIENsYXZlIGRlbCBtb2RlbG9cbiAgICAgICAgICAgIHZhciAkaWQgPSB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfTtcbiAgICAgICAgICAgIHZhciAkZXZlbnRzSGFuZGxlcnMgPSB7fTtcbiAgICAgICAgICAgIHZhciAkaW5zdGFuY2VzID0ge307XG4gICAgICAgICAgICB2YXIgJGZpZWxkcyA9IHt9O1xuICAgICAgICAgICAgdmFyICRyZW1vdGUgPSBudWxsO1xuICAgICAgICAgICAgdmFyICR2ZXJzaW9uaW5nID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gQ29uc3R1Y3RvciBkZWwgbW9kZWxvXG4gICAgICAgICAgICBmdW5jdGlvbiBNb2RlbChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRsb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHRoaXouJGxvY2FsTG9hZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB0aGl6LiRyZW1vdGVMb2FkZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgdGhpei4kbG9jYWxWYWx1ZXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgIHRoaXouJHJlbW90ZVZhbHVlcyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiR2ZXJzaW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgIHRoaXouJGxvY2FsVmVyc2lvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICB0aGl6LiRyZW1vdGVWZXJzaW9uID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgdGhpei4kZXZlbnRzSGFuZGxlcnMgPSB7fTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXouJHNldFZhbHVlcyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgdGhpei4kY29uc3RydWN0b3IoZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICgkc29ja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGl6LiRsaXN0ZW4oKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgdmFyICRyZXN1bHRzID0gW107XG5cbiAgICAgICAgICAgICAgICAgIHRoaXpcblxuICAgICAgICAgICAgICAgICAgLy8gQ3VhbmRvIHNlYSBjb25zdWx0YWRvIGFncmVnYXIgbGEgY29uc3VsdGFcbiAgICAgICAgICAgICAgICAgIC4kYmluZChpZGJFdmVudHMuTU9ERUxfUVVFUklFRCwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgLy8gQ3VhbmRvIHNlYSBsaWJlcmFkbyBkZSBsYSBjb25zdWx0YXIgcXVpdGFyIGRlIGxhcyBjb25zdWx0YXNcbiAgICAgICAgICAgICAgICAgIC4kYmluZChpZGJFdmVudHMuTU9ERUxfVU5RVUVSSUVELCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWR4ID0gJHJlc3VsdHMuaW5kZXhPZihyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAvLyBFdmVudG8gZGUgcXVlIG1vZGVsbyBlc3TDoSBpbnN0YW5jaWFkb1xuICAgICAgICAgICAgICAgICAgLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9JTlNUQU5DRUQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdiBlbCBub21icmUgZGVsIG1vZGVsb1xuICAgICAgICAgICAgTW9kZWwuZ2V0TW9kZWxOYW1lID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gJG1vZGVsTmFtZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cbiAgICAgICAgICAgIE1vZGVsLmF1dG9JbmNyZW1lbnQgPSBmdW5jdGlvbiAoYXV0b0luY3JlbWVudCkge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Jvb2xlYW4nXSk7XG5cbiAgICAgICAgICAgICAgICAgICRpZC5hdXRvSW5jcmVtZW50ID0gYXV0b0luY3JlbWVudDtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBNb2RlbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cbiAgICAgICAgICAgIE1vZGVsLmtleVBhdGggPSBmdW5jdGlvbiAoa2V5UGF0aCkge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZyddKTtcblxuICAgICAgICAgICAgICAgICAgJGlkLmtleVBhdGggPSBrZXlQYXRoO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQ3JlYSBlbCBvYmplY3RvIHN0b3JhZ2UgcGFyYSBlbCBtb2RlbG8uXG4gICAgICAgICAgICBNb2RlbC5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgJGRiLmNyZWF0ZVN0b3JlKCRtb2RlbE5hbWUsICRpZCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBZ3JlZ2EgdW4gaW5kZXhcbiAgICAgICAgICAgIE1vZGVsLmluZGV4ID0gZnVuY3Rpb24gKGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XG5cbiAgICAgICAgICAgICAgICAgICRkYi5jcmVhdGVJbmRleCgkbW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBNw6l0b2RvIHF1ZSBwZXJtaXRlIG1vZGlmaWNhciBtb2RlbC5cbiAgICAgICAgICAgIE1vZGVsLmJ1aWxkID0gZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcblxuICAgICAgICAgICAgICAgICAgYnVpbGRDYWxsYmFjayhNb2RlbCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBc2lnbmEgbGEgZXNwZWNpZmljYWNpw7NuIGRlIGxvcyBjYW1wb3NcbiAgICAgICAgICAgIE1vZGVsLmZpZWxkcyA9IGZ1bmN0aW9uIChmaWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnXSk7XG5cbiAgICAgICAgICAgICAgICAgICRmaWVsZHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICRmaWVsZHNbJGlkLmtleVBhdGhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCI6IHRydWVcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IGZpZWxkc1tmaWVsZE5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZHNbZmllbGROYW1lXSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQgPSB7IFwidHlwZVwiOiBmaWVsZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgJGZpZWxkc1tmaWVsZE5hbWVdID0gZmllbGQ7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGk7XG4gICAgICAgICAgICBNb2RlbC5yZW1vdGUgPSBmdW5jdGlvbiAodXJsLCBhcmdzLCBhY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCcsICdvYmplY3QnXSk7XG5cbiAgICAgICAgICAgICAgICAgICRyZW1vdGUgPSBsYlJlc291cmNlKHVybCwgYXJncywgYWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGVsICRyZW1vdGUgZGVsIG1vZGVsb1xuICAgICAgICAgICAgTW9kZWwuZ2V0UmVtb3RlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gJHJlbW90ZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGNvcnJlc3BvbmRpZW50ZSBhbCBrZXkgZGUgdW4gb2JqZXRvXG4gICAgICAgICAgICBNb2RlbC5nZXRLZXlGcm9tID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsICRpZC5rZXlQYXRoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgbW9kZWwgZGUgbGFzIGd1YXJkYWRhcy4gU2kgbm8gZXhpc3RlIGVudG9uY2VcbiAgICAgICAgICAgIC8vIHNlIGNyZWFcbiAgICAgICAgICAgIE1vZGVsLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydzdHJpbmcnLCAnbnVtYmVyJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIC8vIEVsIG9iamV0byBubyB0aWVuZSBJRFxuICAgICAgICAgICAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTW9kZWwoKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgLy8gTm8gZXhpc3RlIGxhIGluc3RhbmNpYSBlbnRvbmNlIHNlIGNyZWFcbiAgICAgICAgICAgICAgICAgIGlmICghJGluc3RhbmNlc1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5zdGFuY2VzW2tleV0gPSBuZXcgTW9kZWwoKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgcmV0dXJuICRpbnN0YW5jZXNba2V5XTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEJ1c2NhIHVuIHJlZ2lzdHJvIGVuIGxhIG9iamVjdFN0b3JlIGRlbCBtb2RlbG8uXG4gICAgICAgICAgICBNb2RlbC5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG5cbiAgICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IE1vZGVsLmdldEluc3RhbmNlKGtleSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS4kbG9jYWxMb2FkZWQpIHJldHVybiBpbnN0YW5jZTtcblxuICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAgICAgICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIGluc3RhbmNlLiRwcm9taXNlID0gZGVmZXJlZC5wcm9taXNlO1xuXG4gICAgICAgICAgICAgICAgICAkZGIuZ2V0KCRtb2RlbE5hbWUsIGtleSkucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RlbC5nZXRWZXJzaW9uT2Yoa2V5KS5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLiRzZXRMb2NhbFZhbHVlcyhkYXRhLCBkYXRhICYmIHZlcnNpb24gPyB2ZXJzaW9uLmhhc2ggOiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbG9nLmVycm9yKFsnTW9kZWwuZ2V0VmVyc2lvbk9mIGFueSBlcnJvcicsIGVycl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cbiAgICAgICAgICAgIE1vZGVsLmZpbmQgPSBmdW5jdGlvbiAoZmlsdGVycykge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGlkYlF1ZXJ5KCRkYiwgTW9kZWwsIGZpbHRlcnMpOztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIENyZWEgbnVldmFzIGluc3RhbmNpYXMgZGUgbG9zIG1vZGVsb3NcbiAgICAgICAgICAgIE1vZGVsLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICAvLyBTaSBlcyB1biBhcnJheVxuICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWNvcmQgPSBNb2RlbC5nZXRJbnN0YW5jZShNb2RlbC5nZXRLZXlGcm9tKGRhdGEpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29yZC4kbG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkNhbnRDcmVhdGVkTG9hZGVkSW5zdGFuY2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlY29yZC4kcHVsbCgpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAvLyBPYnRlbmVyIHVuYSBjb3BpYSBkZWwgYXJyYXlcbiAgICAgICAgICAgICAgICAgIHZhciBhcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhKTtcbiAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoY2IpO1xuXG4gICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gaXRlcmF0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBObyBxdWVkYW4gZWxlbWVudG9zIGVuIGVsIGFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PSAwKSByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWFyIGVsIHNpZ3VpZW50ZSBlbGVtZW50b1xuICAgICAgICAgICAgICAgICAgICAgICAgTW9kZWwuY3JlYXRlKGFyci5zaGlmdCgpKS50aGVuKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgICAgICAgICAvLyBEZXZvbHZlciBlbCBwcm9taXNlXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIENyZWEgdW4gbW9kZWxvIHBhcmEgZ3VhcmRhciBsYXMgdmVyc2lvbmVzIGRlbCBtb2RlbG8gYWN0dWFsXG4gICAgICAgICAgICBNb2RlbC52ZXJzaW9uaW5nID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgY2IpIHtcbiAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbW9kZWxOYW1lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYiA9IG1vZGVsTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKFttb2RlbE5hbWUsIGNiXSwgW1snc3RyaW5nJywgJ3VuZGVmaW5lZCddLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICghJHZlcnNpb25pbmcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2kgZWwgbW9kZWwgbm8gdGllbmUgbm9tYnJlIHNlIGFncmVnYVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtb2RlbE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsTmFtZSA9ICRtb2RlbE5hbWUgKyAnX3ZlcnNpb25pbmcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhciBtb2RlbG8gcGFyYSBlbCBtYW5lam8gZGUgZGF0b3NcbiAgICAgICAgICAgICAgICAgICAgICAgICR2ZXJzaW9uaW5nID0gJGRiLm1vZGVsKG1vZGVsTmFtZSkuYXV0b0luY3JlbWVudChmYWxzZSkua2V5UGF0aCgkaWQua2V5UGF0aCkuZmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGFzaFwiOiB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmIChjYikgY2IoJHZlcnNpb25pbmcpO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGUgbGEgdmVyc2lvbiBsb2NhbCBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLmdldFZlcnNpb25PZiA9IGZ1bmN0aW9uIChrZXkpIHtcblxuICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoJHZlcnNpb25pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICR2ZXJzaW9uaW5nLmdldChrZXkpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZSh2ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFncmVnYSB1biBtYW5kZWphZG9yIGRlIGV2ZW50b3MgYWwgbW9kZWxvXG4gICAgICAgICAgICBNb2RlbC5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCEkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGlzcGFyYSB1biBldmVudG8gZGVsIG1vZGVsXG4gICAgICAgICAgICBNb2RlbC5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsndW5kZWZpbmVkJywgJ2FycmF5J11dKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5tYXAoZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYi5hcHBseShNb2RlbCwgYXJncyB8fCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRnZXQgPSBmdW5jdGlvbiAoZmllbGQpIHtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0ID0gZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCwgdmFsdWUpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgdW4gb2JqZXRvIGNvbiBsYXMgcHJvcGllZGFkZXMgZGVsIHJlZ2lzdHJvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJGdldFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0ge307XG4gICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YSB8fCB0aGlzO1xuXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cygkZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGaWVsZFZhbHVlKHZhbHVlcywgZmllbGQsIGdldEZpZWxkVmFsdWUoZGF0YSwgZmllbGQpKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgdW4gb2JqZXRvIGNvbiBsYXMgcHJvcGllZGFkZXMgbG9jYWxlcyBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0TG9jYWxWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kbG9jYWxWYWx1ZXMpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgdW4gbW9kZWxvIGNvbiBsYXMgcHJvcGllZGFkZXMgcmVtb3RhcyBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0UmVtb3RlVmFsdWVzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kZ2V0VmFsdWVzKHRoaXMuJHJlbW90ZVZhbHVlcyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIGRlbCByZWdpc3Ryb1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRzZXRWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSwgdmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXouJHZlcnNpb24gPSB2ZXJzaW9uO1xuXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXosIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgdGhpei4kbG9hZGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIGxvY2FsZXMgZGVsIHJlZ2lzdHJvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJHNldExvY2FsVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRsb2NhbFZlcnNpb24gPSB2ZXJzaW9uO1xuXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJGxvY2FsVmFsdWVzLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGl6LiRsb2NhbExvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXouJGxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpei4kc2V0VmFsdWVzKGRhdGEsIHZlcnNpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBsYXMgcHJvcGllZGFkZXMgcmVtb3RhcyBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0UmVtb3RlVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRyZW1vdGVWZXJzaW9uID0gdmVyc2lvbjtcblxuICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRyZW1vdGVWYWx1ZXMsIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXouJHJlbW90ZUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXouJGxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpei4kc2V0VmFsdWVzKGRhdGEsIHZlcnNpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBlbCBJRCBkZWwgb2JqZXRvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJHNldEtleSA9IGZ1bmN0aW9uIChuZXdLZXkpIHtcblxuICAgICAgICAgICAgICAgICAgdmFyIG9sZEtleSA9IE1vZGVsLmdldEtleUZyb20odGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGlzLCAkaWQua2V5UGF0aCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IG5ld0tleTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAob2xkS2V5ICE9PSBuZXdLZXkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZEtleSAmJiAkaW5zdGFuY2VzW29sZEtleV0gJiYgJGluc3RhbmNlc1tvbGRLZXldICE9IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk9sZEtleUlzTm90U2FtZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0tleSAmJiAkaW5zdGFuY2VzW25ld0tleV0gJiYgJGluc3RhbmNlc1tuZXdLZXldICE9IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk5ld0tleUlzTm90U2FtZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFbGltaW5hciBhbnRlcmlvclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZEtleSAmJiAkaW5zdGFuY2VzW29sZEtleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSAkaW5zdGFuY2VzW29sZEtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFncmVnYXIgbnVldmFcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdLZXkgJiYgISRpbnN0YW5jZXNbbmV3S2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGluc3RhbmNlc1tuZXdLZXldID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDb25zdHVyY3RvciBxdWUgc2UgcHVlZGUgc29icmUgZXNjcmliaXJcbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZGF0YSkge307XG5cbiAgICAgICAgICAgIC8vIEd1YXJkYSBsb3MgZGF0b3MgZGVsIG9iamV0b1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRwdWxsID0gZnVuY3Rpb24gKG5ld1ZhbHVlcywgdmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVzID0gdGhpei4kZ2V0VmFsdWVzKG5ld1ZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVzID0gdGhpei4kZ2V0UmVtb3RlVmFsdWVzKCk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHZhciBuZXdLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKG5ld1ZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICB2YXIgb2xkVmFsdWVzID0gdGhpei4kZ2V0TG9jYWxWYWx1ZXMoKTtcbiAgICAgICAgICAgICAgICAgIHZhciBvbGRLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKG9sZFZhbHVlcyk7XG5cbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0tleSwgb2xkS2V5KTtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1ZhbHVlcywgb2xkVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBGdW5jaW9uIHF1ZSBoYWNlIGVzY3VjaGFycyBsb3MgbWVuc2FqZXMgZGVsIHNvY2tldCBwYXJhIGVsIG1vZGVsXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJGxpc3RlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlmICghJHNvY2tldCkgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5Eb2VzTm90SGF2ZVNvY2tldEluc3RhbmNlJyk7XG5cbiAgICAgICAgICAgICAgICAgIC8vIENyZWFyIHVuYSBzdWJzY3JpcGNpb24gYWwgc29ja2V0IHBhcmEgY3VhbmRvIHNlIHJlY2liYW4gZGF0b3NcbiAgICAgICAgICAgICAgICAgIC8vIHBhcmEgbGEgaW5zdGFuY2lhIGFjdHVhbFxuICAgICAgICAgICAgICAgICAgJHNvY2tldC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxOYW1lOiAkbW9kZWxOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiAndXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsSWQ6IHRoaXouJGdldCgkaWQua2V5UGF0aClcbiAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgcmVjaWJpciBkYXRvcyBkZWwgc29ja2V0IGFzaWduYXIgbG9zIHZhbG9yZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVtaXRpciBldmVudG8gZGUgZGF0b3MgcmVjaWJpZG9yIHBhcmEgZWwgbW9kZWxvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGl6LiRzZXRSZW1vdGVWYWx1ZXMoZGF0YS52YWx1ZXMsIGRhdGEudmVyc2lvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQWdyZWdhIHVuIG1hbmRlamFkb3IgZGUgZXZlbnRvc1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRiaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdID0gW107XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHRoaXMuJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEaXNwYXJhIHVuIGV2ZW50b1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRlbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsndW5kZWZpbmVkJywgJ2FycmF5J11dKTtcblxuICAgICAgICAgICAgICAgICAgLy8gTGxhbWFyIGVsIGV2ZW50byBwYXJhIGVsIG1vZGVsb1xuICAgICAgICAgICAgICAgICAgTW9kZWwuZW1pdChldmVudE5hbWUsIFt0aGl6LCBbXS5jb25jYXQoW3RoaXpdKS5jb25jYXQoYXJncyldKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKHRoaXouJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXouJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ubWFwKGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IuYXBwbHkodGhpeiwgYXJncyB8fCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBNb2RlbC4kaW5zdGFuY2VzID0gJGluc3RhbmNlcztcblxuICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJRdWVyeSAoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJFdmVudHMpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gZnVuY3Rpb24gaWRiUXVlcnkoJGRiLCAkTW9kZWwsICRmaWx0ZXJzKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdmdW5jdGlvbicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgbGV0ICRyZXN1bHQgPSBudWxsO1xyXG5cclxuICAgIC8vIEZ1bmNpb24gcXVlIGRldnVlbHZlIGVqZWN1dGEgZWwgcXVlcnkgeSBkZXZ1ZWx2ZSBlbCByZXN1bHRhZG8uXHJcbiAgICB0aGl6LmdldFJlc3VsdCA9IGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgLy8gRWplY3V0YXIgc2kgbm8gc2UgaGEgZWplY3V0YWRvXHJcbiAgICAgIGlmICghJHJlc3VsdCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG4gICAgICAgICRyZXN1bHQgPSBbXTtcclxuICAgICAgICAkcmVzdWx0LiRyZXNvbHZlZCA9IGZhbHNlO1xyXG4gICAgICAgICRyZXN1bHQuJHByb21pc2UgPSBkZWZlcmVkLnByb21pc2U7XHJcblxyXG4gICAgICAgICRkYi5vcGVuQ3Vyc29yKCRNb2RlbC5nZXRNb2RlbE5hbWUoKSwgJGZpbHRlcnMsIGZ1bmN0aW9uIChkYXRhLCBuZXh0KSB7XHJcblxyXG4gICAgICAgICAgY29uc3Qga2V5ID0gJE1vZGVsLmdldEtleUZyb20oZGF0YSk7XHJcblxyXG4gICAgICAgICAgLy8gT2J0ZW5lciBsYSBpbnN0YW5jaWFcclxuICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gJE1vZGVsLmdldEluc3RhbmNlKGtleSk7XHJcblxyXG4gICAgICAgICAgaWYgKGluc3RhbmNlLiRsb2NhbExvYWRlZCkgcmV0dXJuIG5leHQoKTtcclxuXHJcbiAgICAgICAgICAkTW9kZWwuZ2V0VmVyc2lvbk9mKGtleSkucHJvbWlzZVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodmVyc2lvbikge1xyXG5cclxuICAgICAgICAgICAgICBpbnN0YW5jZS4kc2V0TG9jYWxWYWx1ZXMoZGF0YSwgZGF0YSAmJiB2ZXJzaW9uPyB2ZXJzaW9uLmhhc2ggOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgaW5zdGFuY2UuJGVtaXQoaWRiRXZlbnRzLk1PREVMX1FVRVJJRUQsIFskcmVzdWx0XSk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIEFncmVnYXIgYWwgcmVzdWx0YWRvXHJcbiAgICAgICAgICAgICAgJHJlc3VsdC5wdXNoKGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gQnVzY2FyIHNpZ3VpZW50ZVxyXG4gICAgICAgICAgICAgIG5leHQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcblxyXG4gICAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgJGxvZy5lcnJvcihbJ01vZGVsLmdldFZlcnNpb25PZiBhbnkgZXJyb3InLCBlcnJdKVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pLnByb21pc2VcclxuXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICRyZXN1bHQuJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZSgkcmVzdWx0KTtcclxuICAgICAgICAgIHRoaXouZ2V0UmVtb3RlUmVzdWx0KCk7XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcblxyXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gJHJlc3VsdDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE9idGllbmUgZWwgcmVzdWx0YWRvIGRlIHZhbG9yZXMgcmVtb3Rvc1xyXG4gICAgdGhpei5nZXRSZW1vdGVSZXN1bHQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICBsZXQgJHJlbW90ZSA9ICRNb2RlbC5nZXRSZW1vdGUoKTtcclxuICAgICAgbGV0ICRyZW1vdGVSZXN1bHQgPSBudWxsO1xyXG5cclxuICAgICAgaWYgKCRyZW1vdGUgJiYgdHlwZW9mICRyZW1vdGUuZmluZCA9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgKCRyZW1vdGVSZXN1bHQgPSAkcmVtb3RlLmZpbmQoJGZpbHRlcnMpLiRwcm9taXNlKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXN1bHQubWFwKGZ1bmN0aW9uIChyZWNvcmQsIGkpIHtcclxuICAgICAgICAgICAgICAkTW9kZWwuZ2V0KCRNb2RlbC5nZXRLZXlGcm9tKHJlY29yZC52YWx1ZXMpKS4kcHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCRyZWNvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgJHJlY29yZC4kc2V0UmVtb3RlVmFsdWVzKHJlY29yZC52YWx1ZXMsIHJlY29yZC52ZXJzaW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmICgkcmVzdWx0W2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRyZXN1bHRbaV0gIT09ICRyZWNvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRbaV0uJGVtaXQoaWRiRXZlbnRzLk1PREVMX1VOUVVFUklFRCwgWyRyZXN1bHRdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgJHJlc3VsdFtpXSA9ICRyZWNvcmQ7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHJlc3VsdC5wdXNoKCRyZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAkcmVjb3JkLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9RVUVSSUVELCBbJHJlc3VsdF0pO1xyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gJHJlbW90ZVJlc3VsdDtcclxuXHJcbiAgICB9O1xyXG5cclxuICB9XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaWRiUXVlcnk7XG5mdW5jdGlvbiBpZGJRdWVyeSgkbG9nLCBxcywgaWRiVXRpbHMsIGlkYkV2ZW50cykge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBmdW5jdGlvbiBpZGJRdWVyeSgkZGIsICRNb2RlbCwgJGZpbHRlcnMpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdmdW5jdGlvbicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICB2YXIgJHJlc3VsdCA9IG51bGw7XG5cbiAgICAvLyBGdW5jaW9uIHF1ZSBkZXZ1ZWx2ZSBlamVjdXRhIGVsIHF1ZXJ5IHkgZGV2dWVsdmUgZWwgcmVzdWx0YWRvLlxuICAgIHRoaXouZ2V0UmVzdWx0ID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIC8vIEVqZWN1dGFyIHNpIG5vIHNlIGhhIGVqZWN1dGFkb1xuICAgICAgaWYgKCEkcmVzdWx0KSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgICAgICAgJHJlc3VsdCA9IFtdO1xuICAgICAgICAgICRyZXN1bHQuJHJlc29sdmVkID0gZmFsc2U7XG4gICAgICAgICAgJHJlc3VsdC4kcHJvbWlzZSA9IGRlZmVyZWQucHJvbWlzZTtcblxuICAgICAgICAgICRkYi5vcGVuQ3Vyc29yKCRNb2RlbC5nZXRNb2RlbE5hbWUoKSwgJGZpbHRlcnMsIGZ1bmN0aW9uIChkYXRhLCBuZXh0KSB7XG5cbiAgICAgICAgICAgIHZhciBrZXkgPSAkTW9kZWwuZ2V0S2V5RnJvbShkYXRhKTtcblxuICAgICAgICAgICAgLy8gT2J0ZW5lciBsYSBpbnN0YW5jaWFcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9ICRNb2RlbC5nZXRJbnN0YW5jZShrZXkpO1xuXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UuJGxvY2FsTG9hZGVkKSByZXR1cm4gbmV4dCgpO1xuXG4gICAgICAgICAgICAkTW9kZWwuZ2V0VmVyc2lvbk9mKGtleSkucHJvbWlzZS50aGVuKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG5cbiAgICAgICAgICAgICAgaW5zdGFuY2UuJHNldExvY2FsVmFsdWVzKGRhdGEsIGRhdGEgJiYgdmVyc2lvbiA/IHZlcnNpb24uaGFzaCA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGluc3RhbmNlLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9RVUVSSUVELCBbJHJlc3VsdF0pO1xuXG4gICAgICAgICAgICAgIC8vIEFncmVnYXIgYWwgcmVzdWx0YWRvXG4gICAgICAgICAgICAgICRyZXN1bHQucHVzaChpbnN0YW5jZSk7XG5cbiAgICAgICAgICAgICAgLy8gQnVzY2FyIHNpZ3VpZW50ZVxuICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgJGxvZy5lcnJvcihbJ01vZGVsLmdldFZlcnNpb25PZiBhbnkgZXJyb3InLCBlcnJdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pLnByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICRyZXN1bHQuJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZSgkcmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXouZ2V0UmVtb3RlUmVzdWx0KCk7XG4gICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXG4gICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJHJlc3VsdDtcbiAgICB9O1xuXG4gICAgLy8gT2J0aWVuZSBlbCByZXN1bHRhZG8gZGUgdmFsb3JlcyByZW1vdG9zXG4gICAgdGhpei5nZXRSZW1vdGVSZXN1bHQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdmFyICRyZW1vdGUgPSAkTW9kZWwuZ2V0UmVtb3RlKCk7XG4gICAgICB2YXIgJHJlbW90ZVJlc3VsdCA9IG51bGw7XG5cbiAgICAgIGlmICgkcmVtb3RlICYmIHR5cGVvZiAkcmVtb3RlLmZpbmQgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAoJHJlbW90ZVJlc3VsdCA9ICRyZW1vdGUuZmluZCgkZmlsdGVycykuJHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdC5tYXAoZnVuY3Rpb24gKHJlY29yZCwgaSkge1xuICAgICAgICAgICAgJE1vZGVsLmdldCgkTW9kZWwuZ2V0S2V5RnJvbShyZWNvcmQudmFsdWVzKSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoJHJlY29yZCkge1xuICAgICAgICAgICAgICAkcmVjb3JkLiRzZXRSZW1vdGVWYWx1ZXMocmVjb3JkLnZhbHVlcywgcmVjb3JkLnZlcnNpb24pO1xuXG4gICAgICAgICAgICAgIGlmICgkcmVzdWx0W2ldKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRyZXN1bHRbaV0gIT09ICRyZWNvcmQpIHtcbiAgICAgICAgICAgICAgICAgICRyZXN1bHRbaV0uJGVtaXQoaWRiRXZlbnRzLk1PREVMX1VOUVVFUklFRCwgWyRyZXN1bHRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHJlc3VsdFtpXSA9ICRyZWNvcmQ7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHJlc3VsdC5wdXNoKCRyZWNvcmQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgJHJlY29yZC4kZW1pdChpZGJFdmVudHMuTU9ERUxfUVVFUklFRCwgWyRyZXN1bHRdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICRyZW1vdGVSZXN1bHQ7XG4gICAgfTtcbiAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYlNvY2tldFNlcnZpY2UoJGxvZywgaW8sIGlkYlV0aWxzKSB7ICduZ0luamVjdCc7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gIFxyXG4gIGxldCAkZGVmVXJsU2VydmVyID0gbnVsbDtcclxuXHJcbiAgZnVuY3Rpb24gaWRiU29ja2V0ICgkdXJsU2VydmVyLCAkYWNjZXNzVG9rZW5JZCwgJGN1cnJlbnRVc2VySWQpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ10sIFsnc3RyaW5nJywgJ251bWJlciddXSk7XHJcblxyXG4gICAgY29uc3QgJGxpc3RlbmVycyA9ICBbXTtcclxuICAgIGxldCAkc29ja2V0ID0gbnVsbDtcclxuICAgICR1cmxTZXJ2ZXIgPSAkdXJsU2VydmVyIHx8ICRkZWZVcmxTZXJ2ZXI7XHJcblxyXG4gICAgLy8gQ29uZWN0YXJzZSBhbCBzZXJ2aWRvclxyXG4gICAgdGhpei5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBcclxuICAgICAgLy8gQ3JlYXRpbmcgY29ubmVjdGlvbiB3aXRoIHNlcnZlclxyXG4gICAgICAkc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsU2VydmVyKTtcclxuXHJcbiAgICAgIC8vIFRoaXMgcGFydCBpcyBvbmx5IGZvciBsb2dpbiB1c2VycyBmb3IgYXV0aGVudGljYXRlZCAkc29ja2V0IGNvbm5lY3Rpb24gYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlci5cclxuICAgICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXHJcblxyXG4gICAgICAkc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkbG9nLmxvZygnY29ubmVjdGVkJyk7XHJcblxyXG4gICAgICAgICRzb2NrZXQuZW1pdCgnYXV0aGVudGljYXRpb24nLCB7XHJcbiAgICAgICAgICBpZDogJGFjY2Vzc1Rva2VuSWQsXHJcbiAgICAgICAgICB1c2VySWQ6ICRjdXJyZW50VXNlcklkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRzb2NrZXQub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIC8vIHVzZSB0aGUgJHNvY2tldCBhcyB1c3VhbFxyXG4gICAgICAgICAgJGxvZy5sb2coJ1VzZXIgaXMgYXV0aGVudGljYXRlZCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgdmFyIG5hbWUgPSBvcHRpb25zLm1vZGVsTmFtZSArICcuJyArIG9wdGlvbnMuZXZlbnROYW1lO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgbmFtZSA9IG5hbWUgKyAnLicgKyBvcHRpb25zLm1vZGVsSWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRzb2NrZXQub24obmFtZSwgY2IpO1xyXG4gICAgICBcclxuICAgICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxyXG4gICAgICAkbGlzdGVuZXJzLnB1c2gobmFtZSwgY2IpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wdXNoTGlzdGVuZXIgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSwgY2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICRsaXN0ZW5lcnMucHVzaChzdWJzY3JpcHRpb25OYW1lKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSkge1xyXG4gICAgICAkc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTsgIFxyXG4gICAgICB2YXIgaWR4ID0gJGxpc3RlbmVycy5pbmRleE9mKHN1YnNjcmlwdGlvbk5hbWUpO1xyXG4gICAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgICAkbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouY29ubmVjdCgpO1xyXG5cclxuICB9O1xyXG5cclxuICAvLyBBc2lnbmEgbGEgVVJMIGRlIHNlcnZpZG9yIHBvciBkZWZlY3RvXHJcbiAgaWRiU29ja2V0LnNldFVybFNlcnZlciA9IGZ1bmN0aW9uICh1cmxTZXJ2ZXIpIHtcclxuICAgICRkZWZVcmxTZXJ2ZXIgPSB1cmxTZXJ2ZXI7XHJcbiAgfTtcclxuXHJcbiAgLy8gQVNpZ25hIGxhcyBjcmVkZW5jaWFsZXMgcG9yIGRlZmVjdG9cclxuICBpZGJTb2NrZXQuc2V0Q3JlZGVudGlhbHMgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCkge1xyXG4gICAgYWNjZXNzVG9rZW5JZCA9ICRhY2Nlc3NUb2tlbklkXHJcbiAgICBjdXJyZW50VXNlcklkID0gJGN1cnJlbnRVc2VySWQ7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGlkYlNvY2tldDtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJTb2NrZXQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJTb2NrZXRTZXJ2aWNlO1xuZnVuY3Rpb24gaWRiU29ja2V0U2VydmljZSgkbG9nLCBpbywgaWRiVXRpbHMpIHtcbiAgJ25nSW5qZWN0JztcbiAgdmFyIHRoaXogPSB0aGlzO1xuXG4gIHZhciAkZGVmVXJsU2VydmVyID0gbnVsbDtcblxuICBmdW5jdGlvbiBpZGJTb2NrZXQoJHVybFNlcnZlciwgJGFjY2Vzc1Rva2VuSWQsICRjdXJyZW50VXNlcklkKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3N0cmluZycsICdudW1iZXInXSwgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcblxuICAgIHZhciAkbGlzdGVuZXJzID0gW107XG4gICAgdmFyICRzb2NrZXQgPSBudWxsO1xuICAgICR1cmxTZXJ2ZXIgPSAkdXJsU2VydmVyIHx8ICRkZWZVcmxTZXJ2ZXI7XG5cbiAgICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXG4gICAgdGhpei5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyBDcmVhdGluZyBjb25uZWN0aW9uIHdpdGggc2VydmVyXG4gICAgICAkc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsU2VydmVyKTtcblxuICAgICAgLy8gVGhpcyBwYXJ0IGlzIG9ubHkgZm9yIGxvZ2luIHVzZXJzIGZvciBhdXRoZW50aWNhdGVkICRzb2NrZXQgY29ubmVjdGlvbiBiZXR3ZWVuIGNsaWVudCBhbmQgc2VydmVyLlxuICAgICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXG5cbiAgICAgICRzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRsb2cubG9nKCdjb25uZWN0ZWQnKTtcblxuICAgICAgICAkc29ja2V0LmVtaXQoJ2F1dGhlbnRpY2F0aW9uJywge1xuICAgICAgICAgIGlkOiAkYWNjZXNzVG9rZW5JZCxcbiAgICAgICAgICB1c2VySWQ6ICRjdXJyZW50VXNlcklkXG4gICAgICAgIH0pO1xuICAgICAgICAkc29ja2V0Lm9uKCdhdXRoZW50aWNhdGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIHVzZSB0aGUgJHNvY2tldCBhcyB1c3VhbFxuICAgICAgICAgICRsb2cubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpei5zdWJzY3JpYmUgPSBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIHZhciBuYW1lID0gb3B0aW9ucy5tb2RlbE5hbWUgKyAnLicgKyBvcHRpb25zLmV2ZW50TmFtZTtcblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lICsgJy4nICsgb3B0aW9ucy5tb2RlbElkO1xuICAgICAgfVxuXG4gICAgICAkc29ja2V0Lm9uKG5hbWUsIGNiKTtcblxuICAgICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxuICAgICAgJGxpc3RlbmVycy5wdXNoKG5hbWUsIGNiKTtcbiAgICB9O1xuXG4gICAgdGhpei5wdXNoTGlzdGVuZXIgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICRsaXN0ZW5lcnMucHVzaChzdWJzY3JpcHRpb25OYW1lKTtcbiAgICB9O1xuXG4gICAgdGhpei51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lKSB7XG4gICAgICAkc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTtcbiAgICAgIHZhciBpZHggPSAkbGlzdGVuZXJzLmluZGV4T2Yoc3Vic2NyaXB0aW9uTmFtZSk7XG4gICAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICAgICRsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXouY29ubmVjdCgpO1xuICB9O1xuXG4gIC8vIEFzaWduYSBsYSBVUkwgZGUgc2Vydmlkb3IgcG9yIGRlZmVjdG9cbiAgaWRiU29ja2V0LnNldFVybFNlcnZlciA9IGZ1bmN0aW9uICh1cmxTZXJ2ZXIpIHtcbiAgICAkZGVmVXJsU2VydmVyID0gdXJsU2VydmVyO1xuICB9O1xuXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXG4gIGlkYlNvY2tldC5zZXRDcmVkZW50aWFscyA9IGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XG4gICAgYWNjZXNzVG9rZW5JZCA9ICRhY2Nlc3NUb2tlbklkO1xuICAgIGN1cnJlbnRVc2VySWQgPSAkY3VycmVudFVzZXJJZDtcbiAgfTtcblxuICByZXR1cm4gaWRiU29ja2V0O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYlNvY2tldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxiIChtb2R1bGUpIHtcclxuXHJcbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcclxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xyXG4gICAgY29uc3QgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xyXG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGxldCB1cmxCYXNlSG9zdCA9IGxvY2F0aW9uLmhvc3Q7XHJcblxyXG4gIGNvbnN0IGxiQXV0aCA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnXHJcbiAgICBjb25zdCBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcclxuICAgIGNvbnN0IHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcclxuICAgIFxyXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcclxuICAgIC8vIFdlIGFyZSB1c2luZyBlbXB0eSBzdHJpbmcgYXMgYSBtYXJrZXIgZm9yIG51bGwvdW5kZWZpbmVkIHZhbHVlcy5cclxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XHJcbiAgICAgICAgc3RvcmFnZVtrZXldID0gdmFsdWU7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZChuYW1lKSB7XHJcbiAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVtrZXldIHx8IHNlc3Npb25TdG9yYWdlW2tleV0gfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsYkF1dGgoKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpeltuYW1lXSA9IGxvYWQobmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBjb25zdCBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbihhY2Nlc3NUb2tlbklkLCB1c2VySWQsIHVzZXJEYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc2Vzc2lvblN0b3JhZ2UsIG5hbWUsIG51bGwpO1xyXG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XHJcblxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uKCRxLCBsYkF1dGgpIHsgJ25nSW5qZWN0JztcclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVxdWVzdDogZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xyXG4gICAgICAgIGNvbnN0IGhvc3QgPSBnZXRIb3N0KGNvbmZpZy51cmwpO1xyXG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XHJcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XHJcbiAgICAgICAgICBjb25maWcuaGVhZGVyc1thdXRoSGVhZGVyXSA9IGxiQXV0aC5hY2Nlc3NUb2tlbklkO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XHJcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxyXG4gICAgICAgICAgLy8gdGhlcmUgaXMgbm8gdXNlciBsb2dnZWQgaW5cclxuICAgICAgICAgIGNvbnN0IHJlcyA9IHtcclxuICAgICAgICAgICAgYm9keTogeyBlcnJvcjogeyBzdGF0dXM6IDQwMSB9fSxcclxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXHJcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbigpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnOyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcclxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nLFxyXG4gICAgfTtcclxuXHJcbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyIFRoZSBoZWFkZXIgbmFtZSB0byB1c2UsIGUuZy4gYFgtQWNjZXNzLVRva2VuYFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25maWd1cmUgdGhlIFJFU1QgdHJhbnNwb3J0IHRvIHVzZSBhIGRpZmZlcmVudCBoZWFkZXIgZm9yIHNlbmRpbmdcclxuICAgICAqIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi4gSXQgaXMgc2VudCBpbiB0aGUgYEF1dGhvcml6YXRpb25gIGhlYWRlclxyXG4gICAgICogYnkgZGVmYXVsdC5cclxuICAgICAqL1xyXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oaGVhZGVyKSB7XHJcbiAgICAgIG9wdGlvbnMuYXV0aEhlYWRlciA9IGhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBoZWFkZXIgbmFtZSB0aGF0IGlzIHVzZWQgZm9yIHNlbmRpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB1c2UsIGUuZy4gYC9hcGlgIG9yIGAvL2V4YW1wbGUuY29tL2FwaWAuXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENoYW5nZSB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIEJ5IGRlZmF1bHQsIHRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgb3B0aW9ucy51cmxCYXNlID0gdXJsO1xyXG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xyXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uKCRyZXNvdXJjZSkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xyXG4gICAgICAgICAgYWN0aW9uc1trZXldLnVybCA9IG9wdGlvbnMudXJsQmFzZSArIGFjdGlvbnNba2V5XS51cmw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcclxuXHJcbiAgICAgICAgLy8gQW5ndWxhciBhbHdheXMgY2FsbHMgUE9TVCBvbiAkc2F2ZSgpXHJcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXHJcbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xyXG4gICAgICAgIHJlc291cmNlLnByb3RvdHlwZS4kc2F2ZSA9IGZ1bmN0aW9uKHN1Y2Nlc3MsIGVycm9yKSB7XHJcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxyXG4gICAgICAgICAgLy8gdGhhdCBleGFjdGx5IGZpdHMgb3VyIG5lZWRzLlxyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcclxuICAgICAgICAgIHJldHVybiByZXN1bHQuJHByb21pc2UgfHwgcmVzdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XHJcbiAgICAgIH07XHJcbiAgICBcclxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kdWxlXHJcbiAgICAuZmFjdG9yeSgnbGJBdXRoJywgbGJBdXRoKVxyXG4gICAgLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSlcclxuICAgIC5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpXHJcbiAgICAuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uKCRodHRwUHJvdmlkZXIpIHsgJ25nSW5qZWN0JztcclxuICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XHJcbiAgICB9XSk7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvbGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBsYjtcbmZ1bmN0aW9uIGxiKG1vZHVsZSkge1xuXG4gIC8vIER2dWVsdmUgZWwgaG9zdCBkZSB1bmEgVVJMXG4gIGZ1bmN0aW9uIGdldEhvc3QodXJsKSB7XG4gICAgdmFyIG0gPSB1cmwubWF0Y2goL14oPzpodHRwcz86KT9cXC9cXC8oW15cXC9dKykvKTtcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBudWxsO1xuICB9XG5cbiAgdmFyIHVybEJhc2VIb3N0ID0gbG9jYXRpb24uaG9zdDtcblxuICB2YXIgbGJBdXRoID0gZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB2YXIgcHJvcHMgPSBbJ2FjY2Vzc1Rva2VuSWQnLCAnY3VycmVudFVzZXJJZCcsICdyZW1lbWJlck1lJ107XG4gICAgdmFyIHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcblxuICAgIC8vIE5vdGU6IExvY2FsU3RvcmFnZSBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gc3RyaW5nXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9ICcnO1xuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2Fubm90IGFjY2VzcyBsb2NhbC9zZXNzaW9uIHN0b3JhZ2U6JywgZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGl6W25hbWVdID0gbG9hZChuYW1lKTtcbiAgICAgIH0pO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zZXRVc2VyID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IHVzZXJEYXRhO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyVXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzZXNzaW9uU3RvcmFnZSwgbmFtZSwgbnVsbCk7XG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IGxiQXV0aCgpO1xuICB9O1xuXG4gIHZhciBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbiBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IoJHEsIGxiQXV0aCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVxdWVzdDogZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xuICAgICAgICB2YXIgaG9zdCA9IGdldEhvc3QoY29uZmlnLnVybCk7XG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYkF1dGguYWNjZXNzVG9rZW5JZCkge1xuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzW2F1dGhIZWFkZXJdID0gbGJBdXRoLmFjY2Vzc1Rva2VuSWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XG4gICAgICAgICAgLy8gUmV0dXJuIGEgc3R1YiA0MDEgZXJyb3IgZm9yIFVzZXIuZ2V0Q3VycmVudCgpIHdoZW5cbiAgICAgICAgICAvLyB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpblxuICAgICAgICAgIHZhciByZXMgPSB7XG4gICAgICAgICAgICBib2R5OiB7IGVycm9yOiB7IHN0YXR1czogNDAxIH0gfSxcbiAgICAgICAgICAgIHN0YXR1czogNDAxLFxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbiBoZWFkZXJzKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKCkge1xuICAgICduZ0luamVjdCc7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcbiAgICAgIGF1dGhIZWFkZXI6ICdhdXRob3JpemF0aW9uJ1xuICAgIH07XG5cbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXIgVGhlIGhlYWRlciBuYW1lIHRvIHVzZSwgZS5nLiBgWC1BY2Nlc3MtVG9rZW5gXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENvbmZpZ3VyZSB0aGUgUkVTVCB0cmFuc3BvcnQgdG8gdXNlIGEgZGlmZmVyZW50IGhlYWRlciBmb3Igc2VuZGluZ1xyXG4gICAgICogdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLiBJdCBpcyBzZW50IGluIHRoZSBgQXV0aG9yaXphdGlvbmAgaGVhZGVyXHJcbiAgICAgKiBieSBkZWZhdWx0LlxyXG4gICAgICovXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKGhlYWRlcikge1xuICAgICAgb3B0aW9ucy5hdXRoSGVhZGVyID0gaGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIGhlYWRlciBuYW1lIHRoYXQgaXMgdXNlZCBmb3Igc2VuZGluZyB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uXHJcbiAgICAgKi9cbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHVzZSwgZS5nLiBgL2FwaWAgb3IgYC8vZXhhbXBsZS5jb20vYXBpYC5cclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ2hhbmdlIHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gQnkgZGVmYXVsdCwgdGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICBvcHRpb25zLnVybEJhc2UgPSB1cmw7XG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XG4gICAgfTtcblxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcbiAgICAgICduZ0luamVjdCc7XG5cbiAgICAgIHZhciBsYlJlc291cmNlID0gZnVuY3Rpb24gbGJSZXNvdXJjZSh1cmwsIHBhcmFtcywgYWN0aW9ucykge1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgYWN0aW9uc1trZXldLm9yaWdpbmFsVXJsID0gYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgICBhY3Rpb25zW2tleV0udXJsID0gb3B0aW9ucy51cmxCYXNlICsgYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcblxuICAgICAgICAvLyBBbmd1bGFyIGFsd2F5cyBjYWxscyBQT1NUIG9uICRzYXZlKClcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXG4gICAgICAgIC8vIGh0dHA6Ly9raXJrYnVzaGVsbC5tZS9hbmd1bGFyLWpzLXVzaW5nLW5nLXJlc291cmNlLWluLWEtbW9yZS1yZXN0ZnVsLW1hbm5lci9cbiAgICAgICAgcmVzb3VyY2UucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgLy8gRm9ydHVuYXRlbHksIExvb3BCYWNrIHByb3ZpZGVzIGEgY29udmVuaWVudCBgdXBzZXJ0YCBtZXRob2RcbiAgICAgICAgICAvLyB0aGF0IGV4YWN0bHkgZml0cyBvdXIgbmVlZHMuXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc291cmNlLnVwc2VydC5jYWxsKHRoaXMsIHt9LCB0aGlzLCBzdWNjZXNzLCBlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC4kcHJvbWlzZSB8fCByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXNvdXJjZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBsYlJlc291cmNlO1xuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIG1vZHVsZS5mYWN0b3J5KCdsYkF1dGgnLCBsYkF1dGgpLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSkuZmFjdG9yeSgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJywgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yKS5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XG4gIH1dKTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9sYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEdsb2JhbGVzXHJcbmltcG9ydCBDbGF6emVyICBmcm9tICcuL0NsYXp6ZXInO1xyXG5cclxuLy8gUmVxdWVzdFxyXG5pbXBvcnQgaWRiUmVxdWVzdCAgICAgICAgIGZyb20gJy4vaWRiUmVxdWVzdCc7XHJcbmltcG9ydCBpZGJPcGVuREJSZXF1ZXN0ICAgZnJvbSAnLi9pZGJPcGVuREJSZXF1ZXN0JztcclxuXHJcbi8vIFByaW5jaXBhbGVzXHJcbmltcG9ydCBpZGIgICAgICAgICAgICAgIGZyb20gJy4vaWRiJztcclxuaW1wb3J0IGlkYlN0b3JlICAgICAgICAgZnJvbSAnLi9pZGJTdG9yZSc7XHJcbmltcG9ydCBpZGJNb2RlbCAgICAgICAgIGZyb20gJy4vaWRiTW9kZWwnO1xyXG5pbXBvcnQgaWRiU29ja2V0ICAgICAgICBmcm9tICcuL2lkYlNvY2tldCc7XHJcbmltcG9ydCBpZGJUcmFuc2FjdGlvbiAgIGZyb20gJy4vaWRiVHJhbnNhY3Rpb24nO1xyXG5cclxuaW1wb3J0IGxiIGZyb20gJy4vbGInO1xyXG5cclxubGIoYW5ndWxhci5tb2R1bGUoJ25nLnYxLmlkYicsIFtdKSlcclxuICBcclxuICAuY29uc3RhbnQoJ2lvJywgaW8pXHJcbiAgLnNlcnZpY2UoJ0NsYXp6ZXInLCBDbGF6emVyKVxyXG5cclxuICAuY29uc3RhbnQoJ2lkYlZlcnNpb24nLCAnMC4wLjEnKVxyXG4gIFxyXG4gIC5zZXJ2aWNlKCdpZGJSZXF1ZXN0JywgaWRiUmVxdWVzdClcclxuICAuc2VydmljZSgnaWRiT3BlbkRCUmVxdWVzdCcsIGlkYk9wZW5EQlJlcXVlc3QpXHJcbiAgLnNlcnZpY2UoJ2lkYjInLCBpZGIpXHJcbiAgLnNlcnZpY2UoJ2lkYlN0b3JlJywgaWRiU3RvcmUpXHJcbiAgLnNlcnZpY2UoJ2lkYk1vZGVsMicsIGlkYk1vZGVsKVxyXG4gIC5zZXJ2aWNlKCdpZGJTb2NrZXQyJywgaWRiU29ja2V0KVxyXG4gIC5zZXJ2aWNlKCdpZGJUcmFuc2FjdGlvbicsIGlkYlRyYW5zYWN0aW9uKVxyXG5cclxuICAuc2VydmljZSgnZGIyJywgZnVuY3Rpb24gKGlkYjIpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgICBjb25zdCBkYiA9IG5ldyBpZGIyKCdhYWEnLCA0KTtcclxuXHJcbiAgICBkYi51cGdyYWRlbmVlZGVkKGZ1bmN0aW9uIChkYiwgZXZlbnQpIHtcclxuICAgICAgY29uc29sZS5sb2coWyd1cGdyYWRlbmVlZGVkJywgZXZlbnRdKVxyXG4gICAgfSlcclxuXHJcbiAgICAuYXV0b21pZ3JhdGlvbih7XHJcbiAgICAgIDE6IGZ1bmN0aW9uIChkYikge1xyXG4gICAgICAgIHZhciBtb2RlbCA9IGRiXHJcbiAgICAgICAgICAubW9kZWwoJ1RyYWJhamFkb3InKVxyXG4gICAgICAgICAgLnNldEtleVBhdGgoJ2lkJylcclxuICAgICAgICAgIC5zZXRBdXRvSW5jcmVtZW50KGZhbHNlKVxyXG4gICAgICAgICAgLmNyZWF0ZVN0b3JlKCk7XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coWydtb2RlbCcsIG1vZGVsLiRpZF0pO1xyXG5cclxuICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgICAvLyAua2V5UGF0aCgnaWQnKVxyXG4gICAgICAgICAgLy8gLmF1dG9JbmNyZW1lbnQoZmFsc2UpXHJcbiAgICAgICAgICAvLyAuY3JlYXRlKClcclxuICAgICAgICAgIC8vIC52ZXJzaW9uaW5nKGZ1bmN0aW9uICh2ZXJzaW9uaW5nKSB7XHJcbiAgICAgICAgICAvLyAgIHZlcnNpb25pbmcuY3JlYXRlU3RvcmUoKTtcclxuICAgICAgICAgIC8vIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBkYi5kcm9wKCkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFsnZHJvcCcsIGV2ZW50XSk7XHJcbiAgICAgIGRiLm9wZW4oKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhbJ29wZW4nLCBldmVudF0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkYjtcclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIC5ydW4oZnVuY3Rpb24gKGRiMikgeyAnbmdJbmplY3QnO1xyXG5cclxuICB9KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEdsb2JhbGVzXG5cbnZhciBfQ2xhenplciA9IHJlcXVpcmUoJy4vQ2xhenplcicpO1xuXG52YXIgX0NsYXp6ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ2xhenplcik7XG5cbnZhciBfaWRiUmVxdWVzdCA9IHJlcXVpcmUoJy4vaWRiUmVxdWVzdCcpO1xuXG52YXIgX2lkYlJlcXVlc3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiUmVxdWVzdCk7XG5cbnZhciBfaWRiT3BlbkRCUmVxdWVzdCA9IHJlcXVpcmUoJy4vaWRiT3BlbkRCUmVxdWVzdCcpO1xuXG52YXIgX2lkYk9wZW5EQlJlcXVlc3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiT3BlbkRCUmVxdWVzdCk7XG5cbnZhciBfaWRiID0gcmVxdWlyZSgnLi9pZGInKTtcblxudmFyIF9pZGIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiKTtcblxudmFyIF9pZGJTdG9yZSA9IHJlcXVpcmUoJy4vaWRiU3RvcmUnKTtcblxudmFyIF9pZGJTdG9yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJTdG9yZSk7XG5cbnZhciBfaWRiTW9kZWwgPSByZXF1aXJlKCcuL2lkYk1vZGVsJyk7XG5cbnZhciBfaWRiTW9kZWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiTW9kZWwpO1xuXG52YXIgX2lkYlNvY2tldCA9IHJlcXVpcmUoJy4vaWRiU29ja2V0Jyk7XG5cbnZhciBfaWRiU29ja2V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlNvY2tldCk7XG5cbnZhciBfaWRiVHJhbnNhY3Rpb24gPSByZXF1aXJlKCcuL2lkYlRyYW5zYWN0aW9uJyk7XG5cbnZhciBfaWRiVHJhbnNhY3Rpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiVHJhbnNhY3Rpb24pO1xuXG52YXIgX2xiID0gcmVxdWlyZSgnLi9sYicpO1xuXG52YXIgX2xiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gUHJpbmNpcGFsZXNcblxuXG4vLyBSZXF1ZXN0XG4oMCwgX2xiMi5kZWZhdWx0KShhbmd1bGFyLm1vZHVsZSgnbmcudjEuaWRiJywgW10pKS5jb25zdGFudCgnaW8nLCBpbykuc2VydmljZSgnQ2xhenplcicsIF9DbGF6emVyMi5kZWZhdWx0KS5jb25zdGFudCgnaWRiVmVyc2lvbicsICcwLjAuMScpLnNlcnZpY2UoJ2lkYlJlcXVlc3QnLCBfaWRiUmVxdWVzdDIuZGVmYXVsdCkuc2VydmljZSgnaWRiT3BlbkRCUmVxdWVzdCcsIF9pZGJPcGVuREJSZXF1ZXN0Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGIyJywgX2lkYjIuZGVmYXVsdCkuc2VydmljZSgnaWRiU3RvcmUnLCBfaWRiU3RvcmUyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYk1vZGVsMicsIF9pZGJNb2RlbDIuZGVmYXVsdCkuc2VydmljZSgnaWRiU29ja2V0MicsIF9pZGJTb2NrZXQyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlRyYW5zYWN0aW9uJywgX2lkYlRyYW5zYWN0aW9uMi5kZWZhdWx0KS5zZXJ2aWNlKCdkYjInLCBmdW5jdGlvbiAoaWRiMikge1xuICAnbmdJbmplY3QnO1xuXG4gIHZhciBkYiA9IG5ldyBpZGIyKCdhYWEnLCA0KTtcblxuICBkYi51cGdyYWRlbmVlZGVkKGZ1bmN0aW9uIChkYiwgZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhbJ3VwZ3JhZGVuZWVkZWQnLCBldmVudF0pO1xuICB9KS5hdXRvbWlncmF0aW9uKHtcbiAgICAxOiBmdW5jdGlvbiBfKGRiKSB7XG4gICAgICB2YXIgbW9kZWwgPSBkYi5tb2RlbCgnVHJhYmFqYWRvcicpLnNldEtleVBhdGgoJ2lkJykuc2V0QXV0b0luY3JlbWVudChmYWxzZSkuY3JlYXRlU3RvcmUoKTtcblxuICAgICAgY29uc29sZS5sb2coWydtb2RlbCcsIG1vZGVsLiRpZF0pO1xuXG4gICAgICByZXR1cm47XG4gICAgICAvLyAua2V5UGF0aCgnaWQnKVxuICAgICAgLy8gLmF1dG9JbmNyZW1lbnQoZmFsc2UpXG4gICAgICAvLyAuY3JlYXRlKClcbiAgICAgIC8vIC52ZXJzaW9uaW5nKGZ1bmN0aW9uICh2ZXJzaW9uaW5nKSB7XG4gICAgICAvLyAgIHZlcnNpb25pbmcuY3JlYXRlU3RvcmUoKTtcbiAgICAgIC8vIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgZGIuZHJvcCgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFsnZHJvcCcsIGV2ZW50XSk7XG4gICAgZGIub3BlbigpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgY29uc29sZS5sb2coWydvcGVuJywgZXZlbnRdKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRiO1xufSkucnVuKGZ1bmN0aW9uIChkYjIpIHt9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJSZXF1ZXN0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQlJlcXVlc3QgOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGFueSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTUV4Y2VwdGlvbj8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgKElEQk9iamVjdFN0b3JlIG9yIElEQkluZGV4IG9yIElEQkN1cnNvcik/IHNvdXJjZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb24/ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJSZXF1ZXN0UmVhZHlTdGF0ZSAgICAgICAgICAgICAgICAgICAgICAgcmVhZHlTdGF0ZTtcclxuICogXHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnN1Y2Nlc3M7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiB9O1xyXG4gKlxyXG4gKiBlbnVtIElEQlJlcXVlc3RSZWFkeVN0YXRlIHtcclxuICogICBcInBlbmRpbmdcIixcclxuICogICBcImRvbmVcIlxyXG4gKiB9O1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRfcHJvbWlzZVxyXG5cclxuICBjb25zdCBSZWFkeVN0YXRlID0gbmV3IENsYXp6ZXIoe30pXHJcbiAgICAgICAgLnN0YXRpYygncGVuZGluZycsICdwZW5kaW5nJylcclxuICAgICAgICAuc3RhdGljKCdkb25lJywgICdkb25lJyk7XHJcbiAgXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJSZXF1ZXN0IChtZSkge1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBTdGF0aWNzXHJcbiAgLnN0YXRpYygnUmVhZHlTdGF0ZScsIFJlYWR5U3RhdGUuY2xhenopXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEdldHRlcnNcclxuICAuZ2V0dGVyKCckcmVzdWx0JywgJ3Jlc3VsdCcpXHJcbiAgLmdldHRlcignJGVycm9yJywgJ2Vycm9yJylcclxuICAuZ2V0dGVyKCckc291cmNlJywgJ3NvdXJjZScpXHJcbiAgLmdldHRlcignJHJlYWR5U3RhdGUnLCAncmVhZHlTdGF0ZScpXHJcbiAgLmdldHRlcignJHRyYW5zYWN0aW9uJywgJ3RyYW5zYWN0aW9uJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRXZlbnQgaGFuZGxlcnNcclxuICAuaGFuZGxlckV2ZW50KCdzdWNjZXNzJywgJ29uc3VjY2VzcycpXHJcbiAgLmhhbmRsZXJFdmVudCgnZXJyb3InLCAnb25lcnJvcicpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByb3BlcnR5XHJcbiAgLnByb3BlcnR5KCckcHJvbWlzZScsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWYgKHRoaXouJF9wcm9taXNlKSByZXR1cm4gdGhpei4kX3Byb21pc2U7XHJcblxyXG4gICAgICAvLyBDcmVhciBwcm9taXNlIHBhcmEgZWwgcmVxdWVzdFxyXG4gICAgICB0aGl6LiRfcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0aGl6LnN1Y2Nlc3MoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZXNvbHZlKGV2ZW50KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5lcnJvcihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlamVjdChldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbmV3IENsYXp6ZXIodGhpei4kX3Byb21pc2UpLnN0YXRpYygnJHJlcXVlc3QnLCB0aGl6ICk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpei4kX3Byb21pc2U7XHJcblxyXG4gICAgfVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiUmVxdWVzdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYlJlcXVlc3RcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCUmVxdWVzdCA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NRXhjZXB0aW9uPyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSAoSURCT2JqZWN0U3RvcmUgb3IgSURCSW5kZXggb3IgSURCQ3Vyc29yKT8gc291cmNlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbj8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlJlcXVlc3RSZWFkeVN0YXRlICAgICAgICAgICAgICAgICAgICAgICByZWFkeVN0YXRlO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uc3VjY2VzcztcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uZXJyb3I7XHJcbiAqIH07XHJcbiAqXHJcbiAqIGVudW0gSURCUmVxdWVzdFJlYWR5U3RhdGUge1xyXG4gKiAgIFwicGVuZGluZ1wiLFxyXG4gKiAgIFwiZG9uZVwiXHJcbiAqIH07XHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplcikge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxuICAvLyAkX3Byb21pc2VcblxuICB2YXIgUmVhZHlTdGF0ZSA9IG5ldyBDbGF6emVyKHt9KS5zdGF0aWMoJ3BlbmRpbmcnLCAncGVuZGluZycpLnN0YXRpYygnZG9uZScsICdkb25lJyk7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJSZXF1ZXN0KG1lKSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFN0YXRpY3NcbiAgLnN0YXRpYygnUmVhZHlTdGF0ZScsIFJlYWR5U3RhdGUuY2xhenopXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdldHRlcnNcbiAgLmdldHRlcignJHJlc3VsdCcsICdyZXN1bHQnKS5nZXR0ZXIoJyRlcnJvcicsICdlcnJvcicpLmdldHRlcignJHNvdXJjZScsICdzb3VyY2UnKS5nZXR0ZXIoJyRyZWFkeVN0YXRlJywgJ3JlYWR5U3RhdGUnKS5nZXR0ZXIoJyR0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGhhbmRsZXJzXG4gIC5oYW5kbGVyRXZlbnQoJ3N1Y2Nlc3MnLCAnb25zdWNjZXNzJykuaGFuZGxlckV2ZW50KCdlcnJvcicsICdvbmVycm9yJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUHJvcGVydHlcbiAgLnByb3BlcnR5KCckcHJvbWlzZScsIHtcblxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgaWYgKHRoaXouJF9wcm9taXNlKSByZXR1cm4gdGhpei4kX3Byb21pc2U7XG5cbiAgICAgIC8vIENyZWFyIHByb21pc2UgcGFyYSBlbCByZXF1ZXN0XG4gICAgICB0aGl6LiRfcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdGhpei5zdWNjZXNzKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xuICAgICAgICB9KS5lcnJvcihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBuZXcgQ2xhenplcih0aGl6LiRfcHJvbWlzZSkuc3RhdGljKCckcmVxdWVzdCcsIHRoaXopO1xuXG4gICAgICByZXR1cm4gdGhpei4kX3Byb21pc2U7XG4gICAgfVxuXG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiUmVxdWVzdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJPcGVuREJSZXF1ZXN0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQk9wZW5EQlJlcXVlc3QgOiBJREJSZXF1ZXN0IHtcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYmxvY2tlZDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9udXBncmFkZW5lZWRlZDtcclxuICogfTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJSZXF1ZXN0KSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJPcGVuREJSZXF1ZXN0IChtZSkge1xyXG4gICAgaWRiUmVxdWVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyAvLyBMbGFtYXIgYWwgY29uc3RydWN0b3MgZGVsIHBhZHJlXHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoaWRiUmVxdWVzdClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRXZlbnQgaGFuZGxlcnNcclxuICAuaGFuZGxlckV2ZW50KCdibG9ja2VkJywgJ29uYmxvY2tlZCcpXHJcbiAgLmhhbmRsZXJFdmVudCgndXBncmFkZW5lZWRlZCcsICdvbnVwZ3JhZGVuZWVkZWQnKVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJPcGVuREJSZXF1ZXN0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiT3BlbkRCUmVxdWVzdFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJPcGVuREJSZXF1ZXN0IDogSURCUmVxdWVzdCB7XHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmJsb2NrZWQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnVwZ3JhZGVuZWVkZWQ7XHJcbiAqIH07XHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiUmVxdWVzdCkge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiT3BlbkRCUmVxdWVzdChtZSkge1xuICAgIGlkYlJlcXVlc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgLy8gTGxhbWFyIGFsIGNvbnN0cnVjdG9zIGRlbCBwYWRyZVxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBIZXJlbmNpYVxuICAuaW5oZXJpdChpZGJSZXF1ZXN0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBFdmVudCBoYW5kbGVyc1xuICAuaGFuZGxlckV2ZW50KCdibG9ja2VkJywgJ29uYmxvY2tlZCcpLmhhbmRsZXJFdmVudCgndXBncmFkZW5lZWRlZCcsICdvbnVwZ3JhZGVuZWVkZWQnKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYk9wZW5EQlJlcXVlc3QuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkZhY3Rvcnkge1xyXG4gKiAgIElEQk9wZW5EQlJlcXVlc3Qgb3BlbihET01TdHJpbmcgbmFtZSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBsb25nIHZlcnNpb24pO1xyXG4gKiAgIElEQk9wZW5EQlJlcXVlc3QgZGVsZXRlRGF0YWJhc2UoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIHNob3J0IGNtcChhbnkgZmlyc3QsIGFueSBzZWNvbmQpO1xyXG4gKiB9O1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJEYXRhYmFzZSA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIHVuc2lnbmVkIGxvbmcgbG9uZyB2ZXJzaW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmdMaXN0ICAgICAgb2JqZWN0U3RvcmVOYW1lcztcclxuICogXHJcbiAqICAgSURCVHJhbnNhY3Rpb24gdHJhbnNhY3Rpb24oKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KSBzdG9yZU5hbWVzLCBvcHRpb25hbCBJREJUcmFuc2FjdGlvbk1vZGUgbW9kZSA9IFwicmVhZG9ubHlcIik7XHJcbiAqICAgdm9pZCAgICAgICAgICAgY2xvc2UoKTtcclxuICogICBJREJPYmplY3RTdG9yZSBjcmVhdGVPYmplY3RTdG9yZShET01TdHJpbmcgbmFtZSwgb3B0aW9uYWwgSURCT2JqZWN0U3RvcmVQYXJhbWV0ZXJzIG9wdGlvbnMpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGRlbGV0ZU9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lKTtcclxuICogXHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmFib3J0O1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25jbG9zZTtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uZXJyb3I7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnZlcnNpb25jaGFuZ2U7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBkaWN0aW9uYXJ5IElEQk9iamVjdFN0b3JlUGFyYW1ldGVycyB7XHJcbiAqICAgKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KT8ga2V5UGF0aCA9IG51bGw7XHJcbiAqICAgYm9vbGVhbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0luY3JlbWVudCA9IGZhbHNlO1xyXG4gKiB9O21lXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiU3RvcmUsIGlkYk1vZGVsMiwgaWRiT3BlbkRCUmVxdWVzdCwgaWRiVHJhbnNhY3Rpb24sICRsb2cpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICAvLyBFbiBsYSBzaWd1aWVudGUgbGluZWEsIHB1ZWRlIGluY2x1aXIgcHJlZmlqb3MgZGUgaW1wbGVtZW50YWNpb24gcXVlIHF1aWVyYSBwcm9iYXIuXHJcbiAgY29uc3QgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xyXG4gIC8vIE5vIHVzZSBcImNvbnN0IGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cclxuICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcclxuICBjb25zdCBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XHJcbiAgY29uc3QgSURCS2V5UmFuZ2UgPSB3aW5kb3cuSURCS2V5UmFuZ2UgfHwgd2luZG93LndlYmtpdElEQktleVJhbmdlIHx8IHdpbmRvdy5tc0lEQktleVJhbmdlO1xyXG4gIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXHJcbiAgXHJcbiAgaWYgKCFpbmRleGVkREIpIHtcclxuICAgIGFsZXJ0KCdTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXMnKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcclxuICAvLyAkbWVcclxuICAvLyAkb3BlbmVkXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3IgIFxyXG4gIGNvbnN0IGlkYiA9IGZ1bmN0aW9uIGlkYihuYW1lLCB2ZXJzaW9uKSB7XHJcblxyXG4gICAgbmV3IENsYXp6ZXIodGhpcylcclxuXHJcbiAgICAgIC5zdGF0aWMoJyRuYW1lJywgbmFtZSlcclxuICAgICAgLnN0YXRpYygnJHZlcnNpb24nLCB2ZXJzaW9uKVxyXG4gICAgICBcclxuICAgICAgLnN0YXRpYygnJHVwZ3JhZGVuZWVkZWRzJywgW10pXHJcbiAgICAgIC5zdGF0aWMoJyRtb2RlbHMnLCBbXSk7XHJcblxyXG4gIH07XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoaWRiKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJG9iamVjdFN0b3JlTmFtZXMnLCAnb2JqZWN0U3RvcmVOYW1lcycpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEV2ZW50IGhhbmRsZXJzXHJcbiAgLmhhbmRsZXJFdmVudCgnYWJvcnRlZCcsICdvbmFib3J0JylcclxuICAuaGFuZGxlckV2ZW50KCdjbG9zZWQnLCAnb25jbG9zZScpXHJcbiAgLmhhbmRsZXJFdmVudCgnZXJyb3InLCAnb25lcnJvcicpXHJcbiAgLmhhbmRsZXJFdmVudCgndmVyc2lvbkNoYW5nZWQnLCAnb252ZXJzaW9uY2hhbmdlJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnb3BlbicsIGZ1bmN0aW9uIChuYW1lLCB2ZXJzaW9uKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJPcGVuREJSZXF1ZXN0KGluZGV4ZWREQi5vcGVuKG5hbWUsIHZlcnNpb24pKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnZHJvcCcsIGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICBcclxuICAgIHJldHVybiBuZXcgaWRiT3BlbkRCUmVxdWVzdChpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UobmFtZSkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCdjbXAnLCBmdW5jdGlvbiAoZmlyc3QsIHNlY29uZCkge1xyXG4gICAgXHJcbiAgICByZXR1cm4gaW5kZXhlZERCLmNtcChmaXJzdCwgc2Vjb25kKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgndHJhbnNhY3Rpb24nLCBmdW5jdGlvbiAoc3RvcmVOYW1lcywgbW9kZSkge1xyXG4gICAgXHJcbiAgICB0aHJvdyAnaWRiLnRyYW5zYWN0aW9uJ1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCd1cGdyYWRlbmVlZGVkJywgZnVuY3Rpb24gKGNiKSB7XHJcbiAgICBcclxuICAgIHRoaXMuJHVwZ3JhZGVuZWVkZWRzLnB1c2goY2IpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ2F1dG9taWdyYXRpb24nLCBmdW5jdGlvbiAoYWxsTWlncmF0aW9ucykge1xyXG5cclxuICAgIHJldHVybiB0aGlzLnVwZ3JhZGVuZWVkZWQoZnVuY3Rpb24gKHRoaXosIG9wZW5SZXF1ZXN0LCBldmVudCkge1xyXG4gICAgICBPYmplY3Qua2V5cyhhbGxNaWdyYXRpb25zKS5tYXAoZnVuY3Rpb24gKHZlcnNpb24pIHtcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50Lm9sZFZlcnNpb24gPCB2ZXJzaW9uICYmIHZlcnNpb24gPD0gZXZlbnQubmV3VmVyc2lvbikge1xyXG5cclxuICAgICAgICAgIGNvbnN0IG1pZ3JhdGlvbnMgPSBBcnJheS5pc0FycmF5KGFsbE1pZ3JhdGlvbnNbdmVyc2lvbl0pP1xyXG4gICAgICAgICAgICBhbGxNaWdyYXRpb25zW3ZlcnNpb25dOlthbGxNaWdyYXRpb25zW3ZlcnNpb25dXTtcclxuXHJcbiAgICAgICAgICAkbG9nLmxvZygnbWlncmF0aW9uIHYnK3ZlcnNpb24rJyBzdGFydHMnKTtcclxuICAgICAgICAgIG1pZ3JhdGlvbnMubWFwKGZ1bmN0aW9uIChtaWdyYXRpb24pIHtcclxuICAgICAgICAgICAgbWlncmF0aW9uKHRoaXosIG9wZW5SZXF1ZXN0LCBldmVudCk7XHJcblxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICAkbG9nLmxvZygnbWlncmF0aW9uIHYnK3ZlcnNpb24rJyBlbmRzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnb3BlbicsIGZ1bmN0aW9uIChjYiwgY2JFcnIpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgbGV0IGxhc3RScSA9IG51bGw7XHJcbiAgICBsZXQgbGFzdEV2ZW50ID0gbnVsbDtcclxuXHJcbiAgICBpZiAoIXRoaXouJG9wZW5lZCkge1xyXG5cclxuICAgICAgdGhpei4kb3BlbmVkID0gKGxhc3RScSA9IGlkYi5vcGVuKHRoaXouJG5hbWUsIHRoaXouJHZlcnNpb24pXHJcbiAgICAgICAgLnVwZ3JhZGVuZWVkZWQoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgICB0aGl6LiR1cGdyYWRlbmVlZGVkcy5tYXAoZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgICAgIGNiLmFwcGx5KHRoaXosIFt0aGl6LCBsYXN0UnEsIGV2ZW50XSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KSlcclxuXHJcbiAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgdGhpei4kbWUgPSBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICAgICAgbGFzdEV2ZW50ID0gZXZlbnQ7XHJcbiAgICAgICAgICBpZiAoY2IpIGNiKHRoaXosIGxhc3RScSwgZXZlbnQpO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICBsYXN0UnEgPSBudWxsO1xyXG4gICAgICAgICAgdGhpei4kb3BlbmVkID0gbnVsbDtcclxuICAgICAgICAgIGlmIChjYkVycikgY2JFcnIodGhpeiwgbGFzdFJxLCBldmVudCk7XHJcbiAgICAgICAgICByZWplY3QuYXBwbHkobnVsbCwgW2V2ZW50XSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSBlbHNlIGlmIChjYikge1xyXG5cclxuICAgICAgY2IodGhpeiwgbGFzdFJxLCBsYXN0RXZlbnQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpei4kb3BlbmVkO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCdkcm9wJywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgdGhpei4kb3BlbmVkID0gbnVsbDtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgY29uc3QgcnEgPSBpZGIuZHJvcCh0aGl6LiRuYW1lKVxyXG4gICAgICAgIC5zdWNjZXNzKHJlc29sdmUpXHJcbiAgICAgICAgLmVycm9yKHJlamVjdCk7XHJcbiAgICAgIGlmIChjYikgY2IocnEpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB0aGlzLiRtZS5jbG9zZSgpO1xyXG4gICAgXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnY3JlYXRlU3RvcmUnLCBmdW5jdGlvbiAobmFtZSwgb3B0aW9ucykge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiU3RvcmUodGhpcy4kbWUuY3JlYXRlT2JqZWN0U3RvcmUobmFtZSwgb3B0aW9ucykpO1xyXG4gICAgXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnZHJvcFN0b3JlJywgZnVuY3Rpb24gKG5hbWUpIHtcclxuXHJcbiAgICB0aGlzLiRtZS5kZWxldGVPYmplY3RTdG9yZShuYW1lKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnbW9kZWwnLCBmdW5jdGlvbiAobmFtZSkge1xyXG5cclxuICAgIC8vIFNpIGV4aXN0ZSBlbCBtb2RlbG8gcmV0b3JuYXJsb1xyXG4gICAgaWYodGhpcy4kbW9kZWxzW25hbWVdKSByZXR1cm4gdGhpcy4kbW9kZWxzW25hbWVdO1xyXG5cclxuICAgIC8vIEluc3RhbmNpYXIgZWwgbW9kZWxvIHkgZ3VhcmRhcmxvXHJcbiAgICByZXR1cm4gdGhpcy4kbW9kZWxzW25hbWVdID0gaWRiTW9kZWwyKHRoaXMsIG5hbWUpO1xyXG5cclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCRmFjdG9yeSB7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBvcGVuKERPTVN0cmluZyBuYW1lLCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGxvbmcgdmVyc2lvbik7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBkZWxldGVEYXRhYmFzZShET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgc2hvcnQgY21wKGFueSBmaXJzdCwgYW55IHNlY29uZCk7XHJcbiAqIH07XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkRhdGFiYXNlIDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgdW5zaWduZWQgbG9uZyBsb25nIHZlcnNpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgICAgICBvYmplY3RTdG9yZU5hbWVzO1xyXG4gKiBcclxuICogICBJREJUcmFuc2FjdGlvbiB0cmFuc2FjdGlvbigoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pIHN0b3JlTmFtZXMsIG9wdGlvbmFsIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlID0gXCJyZWFkb25seVwiKTtcclxuICogICB2b2lkICAgICAgICAgICBjbG9zZSgpO1xyXG4gKiAgIElEQk9iamVjdFN0b3JlIGNyZWF0ZU9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lLCBvcHRpb25hbCBJREJPYmplY3RTdG9yZVBhcmFtZXRlcnMgb3B0aW9ucyk7XHJcbiAqICAgdm9pZCAgICAgICAgICAgZGVsZXRlT2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYWJvcnQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmNsb3NlO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9udmVyc2lvbmNoYW5nZTtcclxuICogfTtcclxuICogXHJcbiAqIGRpY3Rpb25hcnkgSURCT2JqZWN0U3RvcmVQYXJhbWV0ZXJzIHtcclxuICogICAoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pPyBrZXlQYXRoID0gbnVsbDtcclxuICogICBib29sZWFuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvSW5jcmVtZW50ID0gZmFsc2U7XHJcbiAqIH07bWVcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJTdG9yZSwgaWRiTW9kZWwyLCBpZGJPcGVuREJSZXF1ZXN0LCBpZGJUcmFuc2FjdGlvbiwgJGxvZykge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cblxuICB2YXIgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xuICAvLyBObyB1c2UgXCJjb25zdCBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXG4gIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxuICB2YXIgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xuICB2YXIgSURCS2V5UmFuZ2UgPSB3aW5kb3cuSURCS2V5UmFuZ2UgfHwgd2luZG93LndlYmtpdElEQktleVJhbmdlIHx8IHdpbmRvdy5tc0lEQktleVJhbmdlO1xuICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxuXG4gIGlmICghaW5kZXhlZERCKSB7XG4gICAgYWxlcnQoJ1N1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhcycpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxuICAvLyAkbWVcbiAgLy8gJG9wZW5lZFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvciAgXG4gIHZhciBpZGIgPSBmdW5jdGlvbiBpZGIobmFtZSwgdmVyc2lvbikge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbmFtZScsIG5hbWUpLnN0YXRpYygnJHZlcnNpb24nLCB2ZXJzaW9uKS5zdGF0aWMoJyR1cGdyYWRlbmVlZGVkcycsIFtdKS5zdGF0aWMoJyRtb2RlbHMnLCBbXSk7XG4gIH07XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihpZGIpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRvYmplY3RTdG9yZU5hbWVzJywgJ29iamVjdFN0b3JlTmFtZXMnKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBFdmVudCBoYW5kbGVyc1xuICAuaGFuZGxlckV2ZW50KCdhYm9ydGVkJywgJ29uYWJvcnQnKS5oYW5kbGVyRXZlbnQoJ2Nsb3NlZCcsICdvbmNsb3NlJykuaGFuZGxlckV2ZW50KCdlcnJvcicsICdvbmVycm9yJykuaGFuZGxlckV2ZW50KCd2ZXJzaW9uQ2hhbmdlZCcsICdvbnZlcnNpb25jaGFuZ2UnKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuc3RhdGljKCdvcGVuJywgZnVuY3Rpb24gKG5hbWUsIHZlcnNpb24pIHtcblxuICAgIHJldHVybiBuZXcgaWRiT3BlbkRCUmVxdWVzdChpbmRleGVkREIub3BlbihuYW1lLCB2ZXJzaW9uKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5zdGF0aWMoJ2Ryb3AnLCBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJPcGVuREJSZXF1ZXN0KGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShuYW1lKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5zdGF0aWMoJ2NtcCcsIGZ1bmN0aW9uIChmaXJzdCwgc2Vjb25kKSB7XG5cbiAgICByZXR1cm4gaW5kZXhlZERCLmNtcChmaXJzdCwgc2Vjb25kKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgndHJhbnNhY3Rpb24nLCBmdW5jdGlvbiAoc3RvcmVOYW1lcywgbW9kZSkge1xuXG4gICAgdGhyb3cgJ2lkYi50cmFuc2FjdGlvbic7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ3VwZ3JhZGVuZWVkZWQnLCBmdW5jdGlvbiAoY2IpIHtcblxuICAgIHRoaXMuJHVwZ3JhZGVuZWVkZWRzLnB1c2goY2IpO1xuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdhdXRvbWlncmF0aW9uJywgZnVuY3Rpb24gKGFsbE1pZ3JhdGlvbnMpIHtcblxuICAgIHJldHVybiB0aGlzLnVwZ3JhZGVuZWVkZWQoZnVuY3Rpb24gKHRoaXosIG9wZW5SZXF1ZXN0LCBldmVudCkge1xuICAgICAgT2JqZWN0LmtleXMoYWxsTWlncmF0aW9ucykubWFwKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG5cbiAgICAgICAgaWYgKGV2ZW50Lm9sZFZlcnNpb24gPCB2ZXJzaW9uICYmIHZlcnNpb24gPD0gZXZlbnQubmV3VmVyc2lvbikge1xuXG4gICAgICAgICAgdmFyIG1pZ3JhdGlvbnMgPSBBcnJheS5pc0FycmF5KGFsbE1pZ3JhdGlvbnNbdmVyc2lvbl0pID8gYWxsTWlncmF0aW9uc1t2ZXJzaW9uXSA6IFthbGxNaWdyYXRpb25zW3ZlcnNpb25dXTtcblxuICAgICAgICAgICRsb2cubG9nKCdtaWdyYXRpb24gdicgKyB2ZXJzaW9uICsgJyBzdGFydHMnKTtcbiAgICAgICAgICBtaWdyYXRpb25zLm1hcChmdW5jdGlvbiAobWlncmF0aW9uKSB7XG4gICAgICAgICAgICBtaWdyYXRpb24odGhpeiwgb3BlblJlcXVlc3QsIGV2ZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkbG9nLmxvZygnbWlncmF0aW9uIHYnICsgdmVyc2lvbiArICcgZW5kcycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnb3BlbicsIGZ1bmN0aW9uIChjYiwgY2JFcnIpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICB2YXIgbGFzdFJxID0gbnVsbDtcbiAgICB2YXIgbGFzdEV2ZW50ID0gbnVsbDtcblxuICAgIGlmICghdGhpei4kb3BlbmVkKSB7XG5cbiAgICAgIHRoaXouJG9wZW5lZCA9IChsYXN0UnEgPSBpZGIub3Blbih0aGl6LiRuYW1lLCB0aGl6LiR2ZXJzaW9uKS51cGdyYWRlbmVlZGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgIHRoaXouJHVwZ3JhZGVuZWVkZWRzLm1hcChmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICBjYi5hcHBseSh0aGl6LCBbdGhpeiwgbGFzdFJxLCBldmVudF0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgIGxhc3RFdmVudCA9IGV2ZW50O1xuICAgICAgICBpZiAoY2IpIGNiKHRoaXosIGxhc3RScSwgZXZlbnQpO1xuICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBsYXN0UnEgPSBudWxsO1xuICAgICAgICB0aGl6LiRvcGVuZWQgPSBudWxsO1xuICAgICAgICBpZiAoY2JFcnIpIGNiRXJyKHRoaXosIGxhc3RScSwgZXZlbnQpO1xuICAgICAgICByZWplY3QuYXBwbHkobnVsbCwgW2V2ZW50XSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGNiKSB7XG5cbiAgICAgIGNiKHRoaXosIGxhc3RScSwgbGFzdEV2ZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpei4kb3BlbmVkO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdkcm9wJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICB2YXIgcnEgPSBpZGIuZHJvcCh0aGl6LiRuYW1lKS5zdWNjZXNzKHJlc29sdmUpLmVycm9yKHJlamVjdCk7XG4gICAgICBpZiAoY2IpIGNiKHJxKTtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLiRtZS5jbG9zZSgpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdjcmVhdGVTdG9yZScsIGZ1bmN0aW9uIChuYW1lLCBvcHRpb25zKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLmNyZWF0ZU9iamVjdFN0b3JlKG5hbWUsIG9wdGlvbnMpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnZHJvcFN0b3JlJywgZnVuY3Rpb24gKG5hbWUpIHtcblxuICAgIHRoaXMuJG1lLmRlbGV0ZU9iamVjdFN0b3JlKG5hbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdtb2RlbCcsIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICAvLyBTaSBleGlzdGUgZWwgbW9kZWxvIHJldG9ybmFybG9cbiAgICBpZiAodGhpcy4kbW9kZWxzW25hbWVdKSByZXR1cm4gdGhpcy4kbW9kZWxzW25hbWVdO1xuXG4gICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG8geSBndWFyZGFybG9cbiAgICByZXR1cm4gdGhpcy4kbW9kZWxzW25hbWVdID0gaWRiTW9kZWwyKHRoaXMsIG5hbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJTdG9yZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJPYmplY3RTdG9yZSB7XHJcbiAqICAgICAgICAgICAgYXR0cmlidXRlIERPTVN0cmluZyAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGFueSAgICAgICAgICAgIGtleVBhdGg7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgIGluZGV4TmFtZXM7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uIHRyYW5zYWN0aW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICBhdXRvSW5jcmVtZW50O1xyXG4gKiBcclxuICogICBJREJSZXF1ZXN0IHB1dChhbnkgdmFsdWUsIG9wdGlvbmFsIGFueSBrZXkpO1xyXG4gKiAgIElEQlJlcXVlc3QgYWRkKGFueSB2YWx1ZSwgb3B0aW9uYWwgYW55IGtleSk7XHJcbiAqICAgSURCUmVxdWVzdCBkZWxldGUoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGNsZWFyKCk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXQoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGdldEtleShhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0QWxsKG9wdGlvbmFsIGFueSBxdWVyeSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBjb3VudCk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGxLZXlzKG9wdGlvbmFsIGFueSBxdWVyeSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBjb3VudCk7XHJcbiAqICAgSURCUmVxdWVzdCBjb3VudChvcHRpb25hbCBhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3Qgb3BlbkN1cnNvcihvcHRpb25hbCBhbnkgcXVlcnksIG9wdGlvbmFsIElEQkN1cnNvckRpcmVjdGlvbiBkaXJlY3Rpb24gPSBcIm5leHRcIik7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuS2V5Q3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogICBJREJJbmRleCAgIGluZGV4KERPTVN0cmluZyBuYW1lKTtcclxuICogICBJREJJbmRleCAgIGNyZWF0ZUluZGV4KERPTVN0cmluZyBuYW1lLCAoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pIGtleVBhdGgsIG9wdGlvbmFsIElEQkluZGV4UGFyYW1ldGVycyBvcHRpb25zKTtcclxuICogICB2b2lkICAgICAgIGRlbGV0ZUluZGV4KERPTVN0cmluZyBpbmRleE5hbWUpO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZGljdGlvbmFyeSBJREJJbmRleFBhcmFtZXRlcnMge1xyXG4gKiAgIGJvb2xlYW4gdW5pcXVlID0gZmFsc2U7XHJcbiAqICAgYm9vbGVhbiBtdWx0aUVudHJ5ID0gZmFsc2U7XHJcbiAqIH07XHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJTdG9yZSAobWUpIHtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gR2V0dGVyc1xyXG4gIC5nZXR0ZXIoJyRuYW1lJywgJ25hbWUnKVxyXG4gIC5nZXR0ZXIoJyRrZXlQYXRoJywgJ2tleVBhdGgnKVxyXG4gIC5nZXR0ZXIoJyRpbmRleE5hbWVzJywgJ2luZGV4TmFtZXMnKVxyXG4gIC5nZXR0ZXIoJyR0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpXHJcbiAgLmdldHRlcignJGF1dG9JbmNyZW1lbnQnLCAnYXV0b0luY3JlbWVudCcpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ3B1dCcsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLnB1dCh2YWx1ZSwga2V5KSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ2FkZCcsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmFkZCh2YWx1ZSwga2V5KSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ2RlbGV0ZScsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5kZWxldGUocXVlcnkpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnY2xlYXInLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNsZWFyKCkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCdnZXQnLCBmdW5jdGlvbiAocXVlcnkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0KHF1ZXJ5KSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ2dldEtleScsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRLZXkocXVlcnkpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnZ2V0QWxsJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRBbGwocXVlcnksIGNvdW50KSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ2dldEFsbEtleXMnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldEFsbEtleXMocXVlcnksIGNvdW50KSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ2NvdW50JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNvdW50KHF1ZXJ5KSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ29wZW5DdXJzb3InLCBmdW5jdGlvbiAocXVlcnksIGRpcmVjdGlvbikge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5vcGVuQ3Vyc29yKHF1ZXJ5LCBkaXJlY3Rpb24pKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnb3BlbktleUN1cnNvcicsIGZ1bmN0aW9uIChxdWVyeSwgZGlyZWN0aW9uKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLm9wZW5LZXlDdXJzb3IocXVlcnksIGRpcmVjdGlvbikpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCdpbmRleCcsIGZ1bmN0aW9uIChuYW1lKSB7XHJcblxyXG4gICAgdGhyb3cgJ2lkYlN0b3JlLnByb3RvdHlwZS5pbmRleCc7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ2NyZWF0ZUluZGV4JywgZnVuY3Rpb24gKG5hbWUsIGtleVBhdGgsIG9wdGlvbnMpIHtcclxuXHJcbiAgICB0aHJvdyAnaWRiU3RvcmUucHJvdG90eXBlLmNyZWF0ZUluZGV4JztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnZGVsZXRlSW5kZXgnLCBmdW5jdGlvbiAoaW5kZXhOYW1lKSB7XHJcblxyXG4gICAgdGhpcy4kbWUuZGVsZXRlSW5kZXgoaW5kZXhOYW1lKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlN0b3JlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiU3RvcmVcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCT2JqZWN0U3RvcmUge1xyXG4gKiAgICAgICAgICAgIGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICBuYW1lO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBhbnkgICAgICAgICAgICBrZXlQYXRoO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmdMaXN0ICBpbmRleE5hbWVzO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbiB0cmFuc2FjdGlvbjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYm9vbGVhbiAgICAgICAgYXV0b0luY3JlbWVudDtcclxuICogXHJcbiAqICAgSURCUmVxdWVzdCBwdXQoYW55IHZhbHVlLCBvcHRpb25hbCBhbnkga2V5KTtcclxuICogICBJREJSZXF1ZXN0IGFkZChhbnkgdmFsdWUsIG9wdGlvbmFsIGFueSBrZXkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZGVsZXRlKGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBjbGVhcigpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRLZXkoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbChvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0QWxsS2V5cyhvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgY291bnQob3B0aW9uYWwgYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5DdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiAgIElEQlJlcXVlc3Qgb3BlbktleUN1cnNvcihvcHRpb25hbCBhbnkgcXVlcnksIG9wdGlvbmFsIElEQkN1cnNvckRpcmVjdGlvbiBkaXJlY3Rpb24gPSBcIm5leHRcIik7XHJcbiAqICAgSURCSW5kZXggICBpbmRleChET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgSURCSW5kZXggICBjcmVhdGVJbmRleChET01TdHJpbmcgbmFtZSwgKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KSBrZXlQYXRoLCBvcHRpb25hbCBJREJJbmRleFBhcmFtZXRlcnMgb3B0aW9ucyk7XHJcbiAqICAgdm9pZCAgICAgICBkZWxldGVJbmRleChET01TdHJpbmcgaW5kZXhOYW1lKTtcclxuICogfTtcclxuICogXHJcbiAqIGRpY3Rpb25hcnkgSURCSW5kZXhQYXJhbWV0ZXJzIHtcclxuICogICBib29sZWFuIHVuaXF1ZSA9IGZhbHNlO1xyXG4gKiAgIGJvb2xlYW4gbXVsdGlFbnRyeSA9IGZhbHNlO1xyXG4gKiB9O1xyXG4gKiBcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJSZXF1ZXN0KSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJTdG9yZShtZSkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdldHRlcnNcbiAgLmdldHRlcignJG5hbWUnLCAnbmFtZScpLmdldHRlcignJGtleVBhdGgnLCAna2V5UGF0aCcpLmdldHRlcignJGluZGV4TmFtZXMnLCAnaW5kZXhOYW1lcycpLmdldHRlcignJHRyYW5zYWN0aW9uJywgJ3RyYW5zYWN0aW9uJykuZ2V0dGVyKCckYXV0b0luY3JlbWVudCcsICdhdXRvSW5jcmVtZW50JylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgncHV0JywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5wdXQodmFsdWUsIGtleSkpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdhZGQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmFkZCh2YWx1ZSwga2V5KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ2RlbGV0ZScsIGZ1bmN0aW9uIChxdWVyeSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmRlbGV0ZShxdWVyeSkpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdjbGVhcicsIGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5jbGVhcigpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnZ2V0JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0KHF1ZXJ5KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ2dldEtleScsIGZ1bmN0aW9uIChxdWVyeSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldEtleShxdWVyeSkpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdnZXRBbGwnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0QWxsKHF1ZXJ5LCBjb3VudCkpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdnZXRBbGxLZXlzJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldEFsbEtleXMocXVlcnksIGNvdW50KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ2NvdW50JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuY291bnQocXVlcnkpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnb3BlbkN1cnNvcicsIGZ1bmN0aW9uIChxdWVyeSwgZGlyZWN0aW9uKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUub3BlbkN1cnNvcihxdWVyeSwgZGlyZWN0aW9uKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ29wZW5LZXlDdXJzb3InLCBmdW5jdGlvbiAocXVlcnksIGRpcmVjdGlvbikge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLm9wZW5LZXlDdXJzb3IocXVlcnksIGRpcmVjdGlvbikpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdpbmRleCcsIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICB0aHJvdyAnaWRiU3RvcmUucHJvdG90eXBlLmluZGV4JztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnY3JlYXRlSW5kZXgnLCBmdW5jdGlvbiAobmFtZSwga2V5UGF0aCwgb3B0aW9ucykge1xuXG4gICAgdGhyb3cgJ2lkYlN0b3JlLnByb3RvdHlwZS5jcmVhdGVJbmRleCc7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ2RlbGV0ZUluZGV4JywgZnVuY3Rpb24gKGluZGV4TmFtZSkge1xuXG4gICAgdGhpcy4kbWUuZGVsZXRlSW5kZXgoaW5kZXhOYW1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJTdG9yZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJNb2RlbFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyKSB7ICduZ0luamVjdCc7XHJcbnJldHVybiBmdW5jdGlvbiBpZGJNb2RlbEZhY3RvcnkgKGRiLCBuYW1lKSB7XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiTW9kZWwoKSB7XHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJvcGllZGFkZXMgc3RhdGljYXNcclxuICAuc3RhdGljKCckZGInLCBkYilcclxuICAuc3RhdGljKCckbmFtZScsIG5hbWUpXHJcbiAgLnN0YXRpYygnJGlkJywgeyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OiB0cnVlIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJ3NldEtleVBhdGgnLCBmdW5jdGlvbiAoa2V5UGF0aCkge1xyXG5cclxuICAgIHRoaXMuJGlkLmtleVBhdGggPSBrZXlQYXRoO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJ3NldEF1dG9JbmNyZW1lbnQnLCBmdW5jdGlvbiAoYXV0b0luY3JlbWVudCkge1xyXG5cclxuICAgIHRoaXMuJGlkLmF1dG9JbmNyZW1lbnQgPSBhdXRvSW5jcmVtZW50O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJ2NyZWF0ZVN0b3JlJywgZnVuY3Rpb24gKGNiKSB7XHJcblxyXG4gICAgY29uc3Qgc3RvcmUgPSB0aGlzLiRkYi5jcmVhdGVTdG9yZSh0aGlzLiRuYW1lLCB0aGlzLiRpZCk7XHJcblxyXG4gICAgaWYgKGNiKSBjYih0aGlzLCBzdG9yZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn07fVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYk1vZGVsLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiTW9kZWxcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplcikge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBmdW5jdGlvbiBpZGJNb2RlbEZhY3RvcnkoZGIsIG5hbWUpIHtcblxuICAgIHJldHVybiBuZXdcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBDb25zdHJ1Y3RvclxuICAgIENsYXp6ZXIoZnVuY3Rpb24gaWRiTW9kZWwoKSB7fSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFByb3BpZWRhZGVzIHN0YXRpY2FzXG4gICAgLnN0YXRpYygnJGRiJywgZGIpLnN0YXRpYygnJG5hbWUnLCBuYW1lKS5zdGF0aWMoJyRpZCcsIHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnc2V0S2V5UGF0aCcsIGZ1bmN0aW9uIChrZXlQYXRoKSB7XG5cbiAgICAgIHRoaXMuJGlkLmtleVBhdGggPSBrZXlQYXRoO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJ3NldEF1dG9JbmNyZW1lbnQnLCBmdW5jdGlvbiAoYXV0b0luY3JlbWVudCkge1xuXG4gICAgICB0aGlzLiRpZC5hdXRvSW5jcmVtZW50ID0gYXV0b0luY3JlbWVudDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCdjcmVhdGVTdG9yZScsIGZ1bmN0aW9uIChjYikge1xuXG4gICAgICB2YXIgc3RvcmUgPSB0aGlzLiRkYi5jcmVhdGVTdG9yZSh0aGlzLiRuYW1lLCB0aGlzLiRpZCk7XG5cbiAgICAgIGlmIChjYikgY2IodGhpcywgc3RvcmUpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLmNsYXp6O1xuICB9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJNb2RlbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBDbGF6emVyXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIGZ1bmN0aW9uIENsYXp6ZXIgKGNvbnN0cnVjdG9yKSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NsYXp6JywgeyB2YWx1ZTogY29uc3RydWN0b3IgfHwgZnVuY3Rpb24gKCkge30gfSk7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdpbmhlcml0Jywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChwYXJlbnQpIHtcclxuICAgICAgbGV0IHRtcCA9IGZ1bmN0aW9uKCkge307XHJcbiAgICAgIHRtcC5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xyXG4gICAgICB0aGlzLmNsYXp6LnByb3RvdHlwZSA9IG5ldyB0bXAoKTtcclxuICAgICAgdGhpcy5jbGF6ei5wcm90b3R5cGUuY29uc3RydWN0b3IgPSB0aGlzLmNsYXp6O1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnc3RhdGljJywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jbGF6eiwgbmFtZSwge1xyXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3Byb3BlcnR5Jywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChuYW1lLCBvcHRzKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmNsYXp6LnByb3RvdHlwZSwgbmFtZSwgb3B0cyk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdtZXRob2QnLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKG5hbWUsIGZ1bmMpIHtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShuYW1lLCB7XHJcbiAgICAgICAgdmFsdWU6IGZ1bmNcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdnZXR0ZXInLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKGZyb20sIHRvKSB7XHJcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy4kbWVbdG9dO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdzZXR0ZXInLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKGZyb20sIHRvKSB7XHJcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgIHRoaXMuJG1lW3RvXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdoYW5kbGVyRXZlbnQnLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKGZyb20sIHRvKSB7XHJcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XHJcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgdGhpcy4kbWVbdG9dID0gY2I7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgcmV0dXJuIENsYXp6ZXI7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvQ2xhenplci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIENsYXp6ZXJcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG5cbiAgZnVuY3Rpb24gQ2xhenplcihjb25zdHJ1Y3Rvcikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY2xhenonLCB7IHZhbHVlOiBjb25zdHJ1Y3RvciB8fCBmdW5jdGlvbiAoKSB7fSB9KTtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdpbmhlcml0Jywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShwYXJlbnQpIHtcbiAgICAgIHZhciB0bXAgPSBmdW5jdGlvbiB0bXAoKSB7fTtcbiAgICAgIHRtcC5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xuICAgICAgdGhpcy5jbGF6ei5wcm90b3R5cGUgPSBuZXcgdG1wKCk7XG4gICAgICB0aGlzLmNsYXp6LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHRoaXMuY2xheno7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdzdGF0aWMnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKG5hbWUsIF92YWx1ZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuY2xhenosIG5hbWUsIHtcbiAgICAgICAgdmFsdWU6IF92YWx1ZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdwcm9wZXJ0eScsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobmFtZSwgb3B0cykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuY2xhenoucHJvdG90eXBlLCBuYW1lLCBvcHRzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ21ldGhvZCcsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobmFtZSwgZnVuYykge1xuICAgICAgdGhpcy5wcm9wZXJ0eShuYW1lLCB7XG4gICAgICAgIHZhbHVlOiBmdW5jXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ2dldHRlcicsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZnJvbSwgdG8pIHtcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy4kbWVbdG9dO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3NldHRlcicsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZnJvbSwgdG8pIHtcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuJG1lW3RvXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ2hhbmRsZXJFdmVudCcsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZnJvbSwgdG8pIHtcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoY2IpIHtcbiAgICAgICAgICB0aGlzLiRtZVt0b10gPSBjYjtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICByZXR1cm4gQ2xhenplcjtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvQ2xhenplci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpbywgJGxvZykgeyAnbmdJbmplY3QnO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRzb2NrZXRcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBjb25zdCBpZGJTb2NrZXQgPSBmdW5jdGlvbiBpZGJTb2NrZXQodXJsLCAkYWNjZXNzVG9rZW5JZCwgJGN1cnJlbnRVc2VySWQpe1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpXHJcbiAgICAgIC5zdGF0aWMoJyR1cmwnLCB1cmwgfHwgaWRiU29ja2V0LiRkZWZVcmxTZXJ2ZXIpXHJcbiAgICAgIC5zdGF0aWMoJyRhY2Nlc3NUb2tlbklkJywgYWNjZXNzVG9rZW5JZCB8fCBpZGJTb2NrZXQuJGRlZkFjY2Vzc1Rva2VuSWQpXHJcbiAgICAgIC5zdGF0aWMoJyRjdXJyZW50VXNlcklkJywgY3VycmVudFVzZXJJZCB8fCBpZGJTb2NrZXQuJGRlZkN1cnJlbnRVc2VySWQpXHJcbiAgICAgIFxyXG4gICAgICAuc3RhdGljKCckbGlzdGVuZXJzJywgW10pO1xyXG5cclxuICAgIHRoaXouY29ubmVjdCgpO1xyXG5cclxuICB9O1xyXG5cclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGlkYlNvY2tldClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uZWN0YXJzZSBhbCBzZXJ2aWRvclxyXG4gIC5tZXRob2QoJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8gQ3JlYXRpbmcgY29ubmVjdGlvbiB3aXRoIHNlcnZlclxyXG4gICAgY29uc3Qgc29ja2V0ID0gdGhpcy4kc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsKTtcclxuXHJcbiAgICAvLyBUaGlzIHBhcnQgaXMgb25seSBmb3IgbG9naW4gdXNlcnMgZm9yIGF1dGhlbnRpY2F0ZWQgJHNvY2tldCBjb25uZWN0aW9uIGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIuXHJcbiAgICAvLyBJZiB5b3UgYXJlIG5vdCB1c2luZyBsb2dpbiBwYWdlIGluIHlvdSB3ZWJzaXRlIHRoZW4geW91IHNob3VsZCByZW1vdmUgcmVzdCBwaWVjZSBvZiBjb2RlLi5cclxuICAgIHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICRsb2cubG9nKCdjb25uZWN0ZWQnKTtcclxuXHJcbiAgICAgIHNvY2tldC5lbWl0KCdhdXRoZW50aWNhdGlvbicsIHtcclxuICAgICAgICBpZDogJGFjY2Vzc1Rva2VuSWQsXHJcbiAgICAgICAgdXNlcklkOiAkY3VycmVudFVzZXJJZCxcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICBzb2NrZXQub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyB1c2UgdGhlICRzb2NrZXQgYXMgdXN1YWxcclxuICAgICAgICAkbG9nLmxvZygnVXNlciBpcyBhdXRoZW50aWNhdGVkJyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCdzdWJzY3JpYmUnLCBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcclxuXHJcbiAgICBsZXQgbmFtZSA9IG9wdGlvbnMubW9kZWxOYW1lICsgJy4nICsgb3B0aW9ucy5ldmVudE5hbWU7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIG5hbWUgPSBuYW1lICsgJy4nICsgb3B0aW9ucy5tb2RlbElkO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuJHNvY2tldC5vbihuYW1lLCBjYik7XHJcbiAgICBcclxuICAgIC8vUHVzaCB0aGUgY29udGFpbmVyLi5cclxuICAgIHRoaXMuJGxpc3RlbmVycy5wdXNoKG5hbWUsIGNiKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgncHVzaExpc3RlbmVyJywgZnVuY3Rpb24gKHN1YnNjcmlwdGlvbk5hbWUsIGNiKSB7XHJcblxyXG4gICAgdGhpcy4kbGlzdGVuZXJzLnB1c2goc3Vic2NyaXB0aW9uTmFtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ3Vuc3Vic2NyaWJlJyxmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSkge1xyXG5cclxuICAgIHRoaXMuJHNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMoc3Vic2NyaXB0aW9uTmFtZSk7ICBcclxuICAgIHZhciBpZHggPSB0aGlzLiRsaXN0ZW5lcnMuaW5kZXhPZihzdWJzY3JpcHRpb25OYW1lKTtcclxuICAgIGlmIChpZHggIT0gLTEpe1xyXG4gICAgICB0aGlzLiRsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICB9XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFzaWduYSBsYSBVUkwgZGUgc2Vydmlkb3IgcG9yIGRlZmVjdG9cclxuICAuc3RhdGljKCdzZXRVcmxTZXJ2ZXInLCBmdW5jdGlvbiAodXJsKSB7XHJcblxyXG4gICAgdGhpcy4kZGVmVXJsU2VydmVyID0gdXJsO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXHJcbiAgLnN0YXRpYygnc2V0Q3JlZGVudGlhbHMnLCBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCkge1xyXG5cclxuICAgIHRoaXMuJGRlZkFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xyXG4gICAgdGhpcy4kZGVmQ3VycmVudFVzZXJJZCA9IGN1cnJlbnRVc2VySWQ7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zZXRVcmxTZXJ2ZXIobnVsbClcclxuICAuc2V0Q3JlZGVudGlhbHMobnVsbCwgbnVsbCk7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiU29ja2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaW8sICRsb2cpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJHNvY2tldFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuXG4gIHZhciBpZGJTb2NrZXQgPSBmdW5jdGlvbiBpZGJTb2NrZXQodXJsLCAkYWNjZXNzVG9rZW5JZCwgJGN1cnJlbnRVc2VySWQpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJHVybCcsIHVybCB8fCBpZGJTb2NrZXQuJGRlZlVybFNlcnZlcikuc3RhdGljKCckYWNjZXNzVG9rZW5JZCcsIGFjY2Vzc1Rva2VuSWQgfHwgaWRiU29ja2V0LiRkZWZBY2Nlc3NUb2tlbklkKS5zdGF0aWMoJyRjdXJyZW50VXNlcklkJywgY3VycmVudFVzZXJJZCB8fCBpZGJTb2NrZXQuJGRlZkN1cnJlbnRVc2VySWQpLnN0YXRpYygnJGxpc3RlbmVycycsIFtdKTtcblxuICAgIHRoaXouY29ubmVjdCgpO1xuICB9O1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoaWRiU29ja2V0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXG4gIC5tZXRob2QoJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyBDcmVhdGluZyBjb25uZWN0aW9uIHdpdGggc2VydmVyXG4gICAgdmFyIHNvY2tldCA9IHRoaXMuJHNvY2tldCA9IGlvLmNvbm5lY3QoJHVybCk7XG5cbiAgICAvLyBUaGlzIHBhcnQgaXMgb25seSBmb3IgbG9naW4gdXNlcnMgZm9yIGF1dGhlbnRpY2F0ZWQgJHNvY2tldCBjb25uZWN0aW9uIGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIuXG4gICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXG4gICAgc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgJGxvZy5sb2coJ2Nvbm5lY3RlZCcpO1xuXG4gICAgICBzb2NrZXQuZW1pdCgnYXV0aGVudGljYXRpb24nLCB7XG4gICAgICAgIGlkOiAkYWNjZXNzVG9rZW5JZCxcbiAgICAgICAgdXNlcklkOiAkY3VycmVudFVzZXJJZFxuICAgICAgfSk7XG5cbiAgICAgIHNvY2tldC5vbignYXV0aGVudGljYXRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdXNlIHRoZSAkc29ja2V0IGFzIHVzdWFsXG4gICAgICAgICRsb2cubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdzdWJzY3JpYmUnLCBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcblxuICAgIHZhciBuYW1lID0gb3B0aW9ucy5tb2RlbE5hbWUgKyAnLicgKyBvcHRpb25zLmV2ZW50TmFtZTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tb2RlbElkID09PSAnbnVtYmVyJykge1xuICAgICAgbmFtZSA9IG5hbWUgKyAnLicgKyBvcHRpb25zLm1vZGVsSWQ7XG4gICAgfVxuXG4gICAgdGhpcy4kc29ja2V0Lm9uKG5hbWUsIGNiKTtcblxuICAgIC8vUHVzaCB0aGUgY29udGFpbmVyLi5cbiAgICB0aGlzLiRsaXN0ZW5lcnMucHVzaChuYW1lLCBjYik7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ3B1c2hMaXN0ZW5lcicsIGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lLCBjYikge1xuXG4gICAgdGhpcy4kbGlzdGVuZXJzLnB1c2goc3Vic2NyaXB0aW9uTmFtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ3Vuc3Vic2NyaWJlJywgZnVuY3Rpb24gKHN1YnNjcmlwdGlvbk5hbWUpIHtcblxuICAgIHRoaXMuJHNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMoc3Vic2NyaXB0aW9uTmFtZSk7XG4gICAgdmFyIGlkeCA9IHRoaXMuJGxpc3RlbmVycy5pbmRleE9mKHN1YnNjcmlwdGlvbk5hbWUpO1xuICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgIHRoaXMuJGxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEFzaWduYSBsYSBVUkwgZGUgc2Vydmlkb3IgcG9yIGRlZmVjdG9cbiAgLnN0YXRpYygnc2V0VXJsU2VydmVyJywgZnVuY3Rpb24gKHVybCkge1xuXG4gICAgdGhpcy4kZGVmVXJsU2VydmVyID0gdXJsO1xuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBU2lnbmEgbGFzIGNyZWRlbmNpYWxlcyBwb3IgZGVmZWN0b1xuICAuc3RhdGljKCdzZXRDcmVkZW50aWFscycsIGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XG5cbiAgICB0aGlzLiRkZWZBY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICB0aGlzLiRkZWZDdXJyZW50VXNlcklkID0gY3VycmVudFVzZXJJZDtcbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5zZXRVcmxTZXJ2ZXIobnVsbCkuc2V0Q3JlZGVudGlhbHMobnVsbCwgbnVsbCk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlNvY2tldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxiIChtb2R1bGUpIHtcclxuXHJcbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcclxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xyXG4gICAgY29uc3QgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xyXG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGxldCB1cmxCYXNlSG9zdCA9IGxvY2F0aW9uLmhvc3Q7XHJcblxyXG4gIGNvbnN0IGxiQXV0aCA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnXHJcbiAgICBjb25zdCBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcclxuICAgIGNvbnN0IHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcclxuICAgIFxyXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcclxuICAgIC8vIFdlIGFyZSB1c2luZyBlbXB0eSBzdHJpbmcgYXMgYSBtYXJrZXIgZm9yIG51bGwvdW5kZWZpbmVkIHZhbHVlcy5cclxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XHJcbiAgICAgICAgc3RvcmFnZVtrZXldID0gdmFsdWU7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZChuYW1lKSB7XHJcbiAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVtrZXldIHx8IHNlc3Npb25TdG9yYWdlW2tleV0gfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsYkF1dGgoKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpeltuYW1lXSA9IGxvYWQobmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBjb25zdCBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbihhY2Nlc3NUb2tlbklkLCB1c2VySWQsIHVzZXJEYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc2Vzc2lvblN0b3JhZ2UsIG5hbWUsIG51bGwpO1xyXG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XHJcblxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uKCRxLCBsYkF1dGgpIHsgJ25nSW5qZWN0JztcclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVxdWVzdDogZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xyXG4gICAgICAgIGNvbnN0IGhvc3QgPSBnZXRIb3N0KGNvbmZpZy51cmwpO1xyXG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XHJcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XHJcbiAgICAgICAgICBjb25maWcuaGVhZGVyc1thdXRoSGVhZGVyXSA9IGxiQXV0aC5hY2Nlc3NUb2tlbklkO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XHJcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxyXG4gICAgICAgICAgLy8gdGhlcmUgaXMgbm8gdXNlciBsb2dnZWQgaW5cclxuICAgICAgICAgIGNvbnN0IHJlcyA9IHtcclxuICAgICAgICAgICAgYm9keTogeyBlcnJvcjogeyBzdGF0dXM6IDQwMSB9fSxcclxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXHJcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbigpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnOyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcclxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nLFxyXG4gICAgfTtcclxuXHJcbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyIFRoZSBoZWFkZXIgbmFtZSB0byB1c2UsIGUuZy4gYFgtQWNjZXNzLVRva2VuYFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25maWd1cmUgdGhlIFJFU1QgdHJhbnNwb3J0IHRvIHVzZSBhIGRpZmZlcmVudCBoZWFkZXIgZm9yIHNlbmRpbmdcclxuICAgICAqIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi4gSXQgaXMgc2VudCBpbiB0aGUgYEF1dGhvcml6YXRpb25gIGhlYWRlclxyXG4gICAgICogYnkgZGVmYXVsdC5cclxuICAgICAqL1xyXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oaGVhZGVyKSB7XHJcbiAgICAgIG9wdGlvbnMuYXV0aEhlYWRlciA9IGhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBoZWFkZXIgbmFtZSB0aGF0IGlzIHVzZWQgZm9yIHNlbmRpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB1c2UsIGUuZy4gYC9hcGlgIG9yIGAvL2V4YW1wbGUuY29tL2FwaWAuXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENoYW5nZSB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIEJ5IGRlZmF1bHQsIHRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgb3B0aW9ucy51cmxCYXNlID0gdXJsO1xyXG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xyXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uKCRyZXNvdXJjZSkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xyXG4gICAgICAgICAgYWN0aW9uc1trZXldLnVybCA9IG9wdGlvbnMudXJsQmFzZSArIGFjdGlvbnNba2V5XS51cmw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcclxuXHJcbiAgICAgICAgLy8gQW5ndWxhciBhbHdheXMgY2FsbHMgUE9TVCBvbiAkc2F2ZSgpXHJcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXHJcbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xyXG4gICAgICAgIHJlc291cmNlLnByb3RvdHlwZS4kc2F2ZSA9IGZ1bmN0aW9uKHN1Y2Nlc3MsIGVycm9yKSB7XHJcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxyXG4gICAgICAgICAgLy8gdGhhdCBleGFjdGx5IGZpdHMgb3VyIG5lZWRzLlxyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcclxuICAgICAgICAgIHJldHVybiByZXN1bHQuJHByb21pc2UgfHwgcmVzdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XHJcbiAgICAgIH07XHJcbiAgICBcclxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kdWxlXHJcbiAgICAuZmFjdG9yeSgnbGJBdXRoJywgbGJBdXRoKVxyXG4gICAgLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSlcclxuICAgIC5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpXHJcbiAgICAuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uKCRodHRwUHJvdmlkZXIpIHsgJ25nSW5qZWN0JztcclxuICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XHJcbiAgICB9XSk7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvbGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBsYjtcbmZ1bmN0aW9uIGxiKG1vZHVsZSkge1xuXG4gIC8vIER2dWVsdmUgZWwgaG9zdCBkZSB1bmEgVVJMXG4gIGZ1bmN0aW9uIGdldEhvc3QodXJsKSB7XG4gICAgdmFyIG0gPSB1cmwubWF0Y2goL14oPzpodHRwcz86KT9cXC9cXC8oW15cXC9dKykvKTtcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBudWxsO1xuICB9XG5cbiAgdmFyIHVybEJhc2VIb3N0ID0gbG9jYXRpb24uaG9zdDtcblxuICB2YXIgbGJBdXRoID0gZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB2YXIgcHJvcHMgPSBbJ2FjY2Vzc1Rva2VuSWQnLCAnY3VycmVudFVzZXJJZCcsICdyZW1lbWJlck1lJ107XG4gICAgdmFyIHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcblxuICAgIC8vIE5vdGU6IExvY2FsU3RvcmFnZSBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gc3RyaW5nXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9ICcnO1xuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2Fubm90IGFjY2VzcyBsb2NhbC9zZXNzaW9uIHN0b3JhZ2U6JywgZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGl6W25hbWVdID0gbG9hZChuYW1lKTtcbiAgICAgIH0pO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zZXRVc2VyID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IHVzZXJEYXRhO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyVXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzZXNzaW9uU3RvcmFnZSwgbmFtZSwgbnVsbCk7XG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IGxiQXV0aCgpO1xuICB9O1xuXG4gIHZhciBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbiBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IoJHEsIGxiQXV0aCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVxdWVzdDogZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xuICAgICAgICB2YXIgaG9zdCA9IGdldEhvc3QoY29uZmlnLnVybCk7XG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYkF1dGguYWNjZXNzVG9rZW5JZCkge1xuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzW2F1dGhIZWFkZXJdID0gbGJBdXRoLmFjY2Vzc1Rva2VuSWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XG4gICAgICAgICAgLy8gUmV0dXJuIGEgc3R1YiA0MDEgZXJyb3IgZm9yIFVzZXIuZ2V0Q3VycmVudCgpIHdoZW5cbiAgICAgICAgICAvLyB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpblxuICAgICAgICAgIHZhciByZXMgPSB7XG4gICAgICAgICAgICBib2R5OiB7IGVycm9yOiB7IHN0YXR1czogNDAxIH0gfSxcbiAgICAgICAgICAgIHN0YXR1czogNDAxLFxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbiBoZWFkZXJzKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKCkge1xuICAgICduZ0luamVjdCc7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcbiAgICAgIGF1dGhIZWFkZXI6ICdhdXRob3JpemF0aW9uJ1xuICAgIH07XG5cbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXIgVGhlIGhlYWRlciBuYW1lIHRvIHVzZSwgZS5nLiBgWC1BY2Nlc3MtVG9rZW5gXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENvbmZpZ3VyZSB0aGUgUkVTVCB0cmFuc3BvcnQgdG8gdXNlIGEgZGlmZmVyZW50IGhlYWRlciBmb3Igc2VuZGluZ1xyXG4gICAgICogdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLiBJdCBpcyBzZW50IGluIHRoZSBgQXV0aG9yaXphdGlvbmAgaGVhZGVyXHJcbiAgICAgKiBieSBkZWZhdWx0LlxyXG4gICAgICovXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKGhlYWRlcikge1xuICAgICAgb3B0aW9ucy5hdXRoSGVhZGVyID0gaGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIGhlYWRlciBuYW1lIHRoYXQgaXMgdXNlZCBmb3Igc2VuZGluZyB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uXHJcbiAgICAgKi9cbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHVzZSwgZS5nLiBgL2FwaWAgb3IgYC8vZXhhbXBsZS5jb20vYXBpYC5cclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ2hhbmdlIHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gQnkgZGVmYXVsdCwgdGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICBvcHRpb25zLnVybEJhc2UgPSB1cmw7XG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XG4gICAgfTtcblxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcbiAgICAgICduZ0luamVjdCc7XG5cbiAgICAgIHZhciBsYlJlc291cmNlID0gZnVuY3Rpb24gbGJSZXNvdXJjZSh1cmwsIHBhcmFtcywgYWN0aW9ucykge1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgYWN0aW9uc1trZXldLm9yaWdpbmFsVXJsID0gYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgICBhY3Rpb25zW2tleV0udXJsID0gb3B0aW9ucy51cmxCYXNlICsgYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcblxuICAgICAgICAvLyBBbmd1bGFyIGFsd2F5cyBjYWxscyBQT1NUIG9uICRzYXZlKClcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXG4gICAgICAgIC8vIGh0dHA6Ly9raXJrYnVzaGVsbC5tZS9hbmd1bGFyLWpzLXVzaW5nLW5nLXJlc291cmNlLWluLWEtbW9yZS1yZXN0ZnVsLW1hbm5lci9cbiAgICAgICAgcmVzb3VyY2UucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgLy8gRm9ydHVuYXRlbHksIExvb3BCYWNrIHByb3ZpZGVzIGEgY29udmVuaWVudCBgdXBzZXJ0YCBtZXRob2RcbiAgICAgICAgICAvLyB0aGF0IGV4YWN0bHkgZml0cyBvdXIgbmVlZHMuXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc291cmNlLnVwc2VydC5jYWxsKHRoaXMsIHt9LCB0aGlzLCBzdWNjZXNzLCBlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC4kcHJvbWlzZSB8fCByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXNvdXJjZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBsYlJlc291cmNlO1xuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIG1vZHVsZS5mYWN0b3J5KCdsYkF1dGgnLCBsYkF1dGgpLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSkuZmFjdG9yeSgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJywgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yKS5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XG4gIH1dKTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9sYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJUcmFuc2FjdGlvblxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJUcmFuc2FjdGlvbiA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgICAgIG9iamVjdFN0b3JlTmFtZXM7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJEYXRhYmFzZSAgICAgICAgZGI7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTUV4Y2VwdGlvbiAgICAgICBlcnJvcjtcclxuICogXHJcbiAqICAgSURCT2JqZWN0U3RvcmUgb2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGFib3J0KCk7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25hYm9ydDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uY29tcGxldGU7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZW51bSBJREJUcmFuc2FjdGlvbk1vZGUge1xyXG4gKiAgIFwicmVhZG9ubHlcIixcclxuICogICBcInJlYWR3cml0ZVwiLFxyXG4gKiAgIFwidmVyc2lvbmNoYW5nZVwiXHJcbiAqIH07XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiU3RvcmUpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRfcHJvbWlzZVxyXG4gIFxyXG4gIGNvbnN0IFRyYW5zYWN0aW9uTW9kZSA9IG5ldyBDbGF6emVyKHt9KVxyXG4gICAgICAgIC5zdGF0aWMoJ3JlYWRvbmx5JywgJ3JlYWRvbmx5JylcclxuICAgICAgICAuc3RhdGljKCdyZWFkd3JpdGUnLCAncmVhZHdyaXRlJylcclxuICAgICAgICAuc3RhdGljKCd2ZXJzaW9uY2hhbmdlJywgICd2ZXJzaW9uY2hhbmdlJyk7XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiVHJhbnNhY3Rpb24gKG1lKSB7XHJcbiAgICBcclxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBTdGF0aWNzXHJcbiAgLnN0YXRpYygnVHJhbnNhY3Rpb25Nb2RlJywgVHJhbnNhY3Rpb25Nb2RlLmNsYXp6KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJGRiJywgICAgICAgICAgICAgICAgJ2RiJylcclxuICAuZ2V0dGVyKCckbW9kZScsICAgICAgICAgICAgICAnbW9kZScpXHJcbiAgLmdldHRlcignJGVycm9yJywgICAgICAgICAgICAgJ2Vycm9yJylcclxuICAuZ2V0dGVyKCckb2JqZWN0U3RvcmVOYW1lcycsICAnb2JqZWN0U3RvcmVOYW1lcycpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEV2ZW50IGhhbmRsZXJzXHJcbiAgLmhhbmRsZXJFdmVudCgnYWJvcnRlZCcsICdvbmFib3J0JylcclxuICAuaGFuZGxlckV2ZW50KCdjb21wbGV0ZWQnLCAnb25jb21wbGV0ZScpXHJcbiAgLmhhbmRsZXJFdmVudCgnZXJyb3InLCAnb25lcnJvcicpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ3N0b3JlJywgZnVuY3Rpb24obmFtZSl7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJTdG9yZSh0aGlzLiRtZS5vYmplY3RTdG9yZShuYW1lKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ2Fib3J0JywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICB0aGlzLiRtZS5hYm9ydCgpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9wZXJ0eVxyXG4gIC5wcm9wZXJ0eSgnJHByb21pc2UnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlmICh0aGl6LiRfcHJvbWlzZSkgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgICAgLy8gQ3JlYXIgcHJvbWlzZSBwYXJhIGVsIHJlcXVlc3RcclxuICAgICAgdGhpei4kX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdGhpei5jb21wbGV0ZWQoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZXNvbHZlKGV2ZW50KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5lcnJvcihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlamVjdChldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbmV3IENsYXp6ZXIodGhpei4kX3Byb21pc2UpLnN0YXRpYygnJHRyYW5zYWN0aW9uJywgdGhpeik7XHJcblxyXG4gICAgICByZXR1cm4gdGhpei4kX3Byb21pc2U7XHJcblxyXG4gICAgfVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiVHJhbnNhY3Rpb24uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJUcmFuc2FjdGlvblxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJUcmFuc2FjdGlvbiA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgICAgIG9iamVjdFN0b3JlTmFtZXM7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJEYXRhYmFzZSAgICAgICAgZGI7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTUV4Y2VwdGlvbiAgICAgICBlcnJvcjtcclxuICogXHJcbiAqICAgSURCT2JqZWN0U3RvcmUgb2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGFib3J0KCk7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25hYm9ydDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uY29tcGxldGU7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZW51bSBJREJUcmFuc2FjdGlvbk1vZGUge1xyXG4gKiAgIFwicmVhZG9ubHlcIixcclxuICogICBcInJlYWR3cml0ZVwiLFxyXG4gKiAgIFwidmVyc2lvbmNoYW5nZVwiXHJcbiAqIH07XHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiU3RvcmUpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJF9wcm9taXNlXG5cbiAgdmFyIFRyYW5zYWN0aW9uTW9kZSA9IG5ldyBDbGF6emVyKHt9KS5zdGF0aWMoJ3JlYWRvbmx5JywgJ3JlYWRvbmx5Jykuc3RhdGljKCdyZWFkd3JpdGUnLCAncmVhZHdyaXRlJykuc3RhdGljKCd2ZXJzaW9uY2hhbmdlJywgJ3ZlcnNpb25jaGFuZ2UnKTtcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlRyYW5zYWN0aW9uKG1lKSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFN0YXRpY3NcbiAgLnN0YXRpYygnVHJhbnNhY3Rpb25Nb2RlJywgVHJhbnNhY3Rpb25Nb2RlLmNsYXp6KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRkYicsICdkYicpLmdldHRlcignJG1vZGUnLCAnbW9kZScpLmdldHRlcignJGVycm9yJywgJ2Vycm9yJykuZ2V0dGVyKCckb2JqZWN0U3RvcmVOYW1lcycsICdvYmplY3RTdG9yZU5hbWVzJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRXZlbnQgaGFuZGxlcnNcbiAgLmhhbmRsZXJFdmVudCgnYWJvcnRlZCcsICdvbmFib3J0JykuaGFuZGxlckV2ZW50KCdjb21wbGV0ZWQnLCAnb25jb21wbGV0ZScpLmhhbmRsZXJFdmVudCgnZXJyb3InLCAnb25lcnJvcicpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ3N0b3JlJywgZnVuY3Rpb24gKG5hbWUpIHtcblxuICAgIHJldHVybiBuZXcgaWRiU3RvcmUodGhpcy4kbWUub2JqZWN0U3RvcmUobmFtZSkpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdhYm9ydCcsIGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuJG1lLmFib3J0KCk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFByb3BlcnR5XG4gIC5wcm9wZXJ0eSgnJHByb21pc2UnLCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlmICh0aGl6LiRfcHJvbWlzZSkgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xuXG4gICAgICAvLyBDcmVhciBwcm9taXNlIHBhcmEgZWwgcmVxdWVzdFxuICAgICAgdGhpei4kX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRoaXouY29tcGxldGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xuICAgICAgICB9KS5lcnJvcihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBuZXcgQ2xhenplcih0aGl6LiRfcHJvbWlzZSkuc3RhdGljKCckdHJhbnNhY3Rpb24nLCB0aGl6KTtcblxuICAgICAgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xuICAgIH1cblxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlRyYW5zYWN0aW9uLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==