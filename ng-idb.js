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
	
	      model.put({
	        'id': 1,
	        'nombres': 'alex',
	        'apellidos': 'rondon'
	      }).then(function () {
	        console.log('put', arguments);
	      }).catch(function () {
	        console.log('put error', arguments);
	      });
	
	      model.put({
	        'id': 1,
	        'nombres': 'alex',
	        'apellidos': 'rondon'
	      }).then(function () {
	        console.log('put', arguments);
	      }).catch(function () {
	        console.log('put error', arguments);
	      });
	
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
	
	  var ReadyState = new Clazzer({}).static('PENDIGN', 'pending').static('DONE', 'done');
	
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
	  var idb = function idb(name, version, socket) {
	
	    new Clazzer(this).static('$name', name).static('$version', version).static('$socket', socket).static('$upgradeneededs', []).static('$models', []);
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
	        return thiz;
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
	  .method('transaction', function (storeNames, mode) {
	    var thiz = this;
	
	    return new Promise(function (resolve, reject) {
	      thiz.open().then(function (thiz) {
	        resolve(new idbTransaction(thiz.$me.transaction(storeNames, mode)));
	      }).catch(function (event) {
	        reject(event);
	      });
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('store', function (storeNames) {
	    var thiz = this;
	    if (!Array.isArray(storeNames)) storeNames = [storeNames];
	
	    function action(mode) {
	      return function (cb) {
	        return new Promise(function (resolve, reject) {
	
	          thiz.transaction(storeNames, mode).then(function (tx) {
	            var stores = storeNames.map(function (storeName) {
	              return tx.store(storeName);
	            });
	            if (cb) cb.apply(thiz, stores);
	            resolve(stores);
	          }).catch(function (event) {
	            reject(event);
	          });
	        });
	      };
	    }
	
	    return new Clazzer({}).static('readonly', action(idbTransaction.TransactionMode.READONLY)).static('readwrite', action(idbTransaction.TransactionMode.READWRITE)).clazz;
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
	
	  // -----------------------------------------------------------------------------
	  // Buscar un campo
	
	  var deepField = function deepField(obj, field, cb) {
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
	
	  // -----------------------------------------------------------------------------
	  // Obtiene el valor pa una propieda de un objeto
	  var getFieldValue = function getFieldValue(obj, field) {
	    return deepField(obj, field, function (obj, lastField) {
	      return obj[lastField];
	    });
	  };
	
	  // -----------------------------------------------------------------------------
	  // Obtiene el valor pa una propieda de un objeto
	  var setFieldValue = function setFieldValue(obj, field, value) {
	    deepField(obj, field, function (obj, lastField) {
	      obj[lastField] = value;
	    });
	    return obj;
	  };
	
	  // -----------------------------------------------------------------------------
	  return function idbModelFactory(db, name) {
	
	    return new
	    // ---------------------------------------------------------------------------
	    // Constructor
	    Clazzer(function idbModel() {})
	
	    // ---------------------------------------------------------------------------
	    // Propiedades staticas
	    .static('$db', db).static('$name', name).static('$id', { keyPath: 'id', autoIncrement: true }).static('$instances', [])
	
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
	    }).static('put', function (obj, key) {
	
	      return this.$db.store(this.$name).readwrite().then(function (stores) {
	        return stores[0].put(obj, key).$promise;
	      });
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
	
	  var TransactionMode = new Clazzer({}).static('READONLY', 'readonly').static('READWRITE', 'readwrite').static('VERSIONCHANGE', 'versionchange');
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGFmZmQ4YmQxZDI5MDk5OGY4ZmIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiVXRpbHMuanM/MWJiNCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJFdmVudHMuanM/NDg2YSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3FzLmpzPzY0MzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiLmpzPzYzNTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qcz9mOWY5Iiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanM/Zjc3YSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJTb2NrZXQuanM/ZDFhMSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvbGIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2xiLmpzPzMwMDYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pbmRleC5qcz8wZjYyIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJSZXF1ZXN0LmpzPzJjYmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYk9wZW5EQlJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYk9wZW5EQlJlcXVlc3QuanM/YThkZCIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiLmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGIuanM/MWMxYiIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiU3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlN0b3JlLmpzP2VhNTciLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYk1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJNb2RlbC5qcz83YzFkIiwid2VicGFjazovLy8uL3NyYy92MS9DbGF6emVyLmpzIiwid2VicGFjazovLy8uL3NyYy92MS9DbGF6emVyLmpzPzFmY2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiU29ja2V0LmpzPzE0ZjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2xiLmpzIiwid2VicGFjazovLy8uL3NyYy92MS9sYi5qcz9jZjVlIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJUcmFuc2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiVHJhbnNhY3Rpb24uanM/MzBjMyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwic2VydmljZSIsImlkYlV0aWxzIiwiJHEiLCJ2YWxpZGF0b3JzIiwiY2FsbGJhY2siLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImFycmF5IiwiQXJyYXkiLCJpc0FycmF5IiwidmFsaWQiLCJ0eXBlcyIsImkiLCJ0eXBlIiwiYXJncyIsInZhbGlkYXRlIiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiZXJyIiwiRXJyb3IiLCJuYW1lIiwiaWRiRXZlbnRzIiwiREJfRVJST1IiLCJNT0RFTF9JTlNUQU5DRUQiLCJNT0RFTF9SRVBMQUNFIiwiTU9ERUxfUVVFUklFRCIsIk1PREVMX1VOUVVFUklFRCIsInFzIiwicXNDbGFzcyIsImNiIiwidGhpeiIsInRoZW5zIiwidGhlbnNSZWFkeSIsImNhdGNocyIsImNhdGNoc1JlYWR5IiwicmVzdWx0QXJncyIsImVycm9yIiwicHJvbWlzZSIsIiRyZXNvbHZlZCIsInRoZW5zUmVzb2x2ZWQiLCJsZW5ndGgiLCJzaGlmdCIsImFwcGx5IiwicHVzaCIsImNhdGNoc1Jlc29sdmVkIiwicmVzb2x2ZSIsImFyZ3VtZW50cyIsInJlamVjdCIsInRoZW4iLCJjYXRjaCIsImRvbmUiLCJjb25jYXQiLCJkZWZlciIsImFsbCIsImFyciIsImRlZmVyZWQiLCJwcm9taXNlcyIsImtleXMiLCJPYmplY3QiLCJyZXN1bHRzIiwibWFwIiwiaWR4IiwicmVzdWx0IiwiaWRiU2VydmljZSIsIiRsb2ciLCJpZGJNb2RlbCIsImluZGV4ZWREQiIsIndpbmRvdyIsIm1vekluZGV4ZWREQiIsIndlYmtpdEluZGV4ZWREQiIsIm1zSW5kZXhlZERCIiwiSURCVHJhbnNhY3Rpb24iLCJ3ZWJraXRJREJUcmFuc2FjdGlvbiIsIm1zSURCVHJhbnNhY3Rpb24iLCJJREJLZXlSYW5nZSIsIndlYmtpdElEQktleVJhbmdlIiwibXNJREJLZXlSYW5nZSIsImFsZXJ0IiwiaWRiIiwiJGRiTmFtZSIsIiRkYlZlcnNpb24iLCIkc29ja2V0IiwiJGV2ZW50c0NhbGxiYWNrcyIsIiR1cGdyYWRlTmVlZGVkRGVmZXJlZCIsIiRvcGVuRGVmZXJlZCIsIiRzb2NrZXRDb25uZWN0ZWREZWZlcmVkIiwiJG9wZW5lZCIsIiRyZXF1ZXN0IiwibW9kZWxzIiwiYmluZCIsImV2ZW50TmFtZSIsInVuYmluZCIsImluZGV4T2YiLCJzcGxpY2UiLCJ0cmlnZ2VyIiwibG9nIiwib3BlbiIsInJlYWR5IiwicnEiLCJvbnVwZ3JhZGVuZWVkZWQiLCJldmVudCIsIm9uc3VjY2VzcyIsIm9uZXJyb3IiLCJ0YXJnZXQiLCJlcnJvckNvZGUiLCJkZWxldGVEYXRhYmFzZSIsIm1vZGVsIiwic29ja2V0IiwiY3JlYXRlU3RvcmUiLCJtb2RlbE5hbWUiLCJtb2RlbElkIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJjcmVhdGVJbmRleCIsImluZGV4TmFtZSIsImZpZWxkTmFtZSIsIm9wdHMiLCJ0cmFuc2FjdGlvbiIsIm9iamVjdFN0b3JlIiwicGVybXMiLCJhY3Rpb24iLCJ0eCIsIm9uY29tcGxldGUiLCJvbmFib3J0IiwiZ2V0Iiwia2V5IiwicHV0IiwidmFsdWVzIiwiZGVsZXRlIiwib3BlbkN1cnNvciIsImZpbHRlcnMiLCJlYWNoQ2IiLCJjdXJzb3IiLCJjb250aW51ZSIsImRlZmVyZWRzIiwib25PcGVuIiwib25VcGdyYWRlTmVlZGVkIiwib25Tb2NrZXRDb25uZWN0ZWQiLCJ0ZXh0IiwiaWRiTW9kZWxTZXJ2aWNlIiwiaWRiUXVlcnkiLCJsYlJlc291cmNlIiwiJHRpbWVvdXQiLCJzZWFyY2hEZWVwRmllbGQiLCJvYmoiLCJmaWVsZCIsImZpZWxkcyIsInNwbGl0IiwibGFzdEZpZWxkIiwicG9wIiwiX3NldCIsImdldEZpZWxkVmFsdWUiLCJzZXRGaWVsZFZhbHVlIiwiJGRiIiwiJG1vZGVsTmFtZSIsIiRpZCIsImtleVBhdGgiLCJhdXRvSW5jcmVtZW50IiwiJGV2ZW50c0hhbmRsZXJzIiwiJGluc3RhbmNlcyIsIiRmaWVsZHMiLCIkcmVtb3RlIiwiJHZlcnNpb25pbmciLCJNb2RlbCIsImRhdGEiLCIkbG9hZGVkIiwiJGxvY2FsTG9hZGVkIiwiJHJlbW90ZUxvYWRlZCIsIiRsb2NhbFZhbHVlcyIsIiRyZW1vdGVWYWx1ZXMiLCIkdmVyc2lvbiIsIiRsb2NhbFZlcnNpb24iLCIkcmVtb3RlVmVyc2lvbiIsIiRzZXRWYWx1ZXMiLCIkY29uc3RydWN0b3IiLCIkbGlzdGVuIiwiJHJlc3VsdHMiLCIkYmluZCIsIiRlbWl0IiwiZ2V0TW9kZWxOYW1lIiwiaW5kZXgiLCJidWlsZCIsImJ1aWxkQ2FsbGJhY2siLCJyZW1vdGUiLCJ1cmwiLCJhY3Rpb25zIiwiZ2V0UmVtb3RlIiwiZ2V0S2V5RnJvbSIsImdldEluc3RhbmNlIiwiaW5zdGFuY2UiLCIkcHJvbWlzZSIsImdldFZlcnNpb25PZiIsInZlcnNpb24iLCIkc2V0TG9jYWxWYWx1ZXMiLCJoYXNoIiwiZmluZCIsImNyZWF0ZSIsInJlY29yZCIsIiRwdWxsIiwiaXRlcmF0aW9uIiwidmVyc2lvbmluZyIsImhhbmRsZXIiLCJlbWl0IiwiJGdldCIsIiRzZXQiLCIkZ2V0VmFsdWVzIiwiJGdldExvY2FsVmFsdWVzIiwiJGdldFJlbW90ZVZhbHVlcyIsIiRzZXRSZW1vdGVWYWx1ZXMiLCIkc2V0S2V5IiwibmV3S2V5Iiwib2xkS2V5IiwibmV3VmFsdWVzIiwib2xkVmFsdWVzIiwiY29uc29sZSIsInN1YnNjcmliZSIsIiRNb2RlbCIsIiRmaWx0ZXJzIiwiJHJlc3VsdCIsImdldFJlc3VsdCIsIm5leHQiLCJnZXRSZW1vdGVSZXN1bHQiLCIkcmVtb3RlUmVzdWx0IiwiJHJlY29yZCIsImlkYlNvY2tldFNlcnZpY2UiLCJpbyIsIiRkZWZVcmxTZXJ2ZXIiLCJpZGJTb2NrZXQiLCIkdXJsU2VydmVyIiwiJGFjY2Vzc1Rva2VuSWQiLCIkY3VycmVudFVzZXJJZCIsIiRsaXN0ZW5lcnMiLCJjb25uZWN0Iiwib24iLCJpZCIsInVzZXJJZCIsIm9wdGlvbnMiLCJwdXNoTGlzdGVuZXIiLCJzdWJzY3JpcHRpb25OYW1lIiwidW5zdWJzY3JpYmUiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJzZXRVcmxTZXJ2ZXIiLCJ1cmxTZXJ2ZXIiLCJzZXRDcmVkZW50aWFscyIsImFjY2Vzc1Rva2VuSWQiLCJjdXJyZW50VXNlcklkIiwibGIiLCJnZXRIb3N0IiwibSIsIm1hdGNoIiwidXJsQmFzZUhvc3QiLCJsb2NhdGlvbiIsImhvc3QiLCJsYkF1dGgiLCJwcm9wcyIsInByb3BzUHJlZml4Iiwic2F2ZSIsInN0b3JhZ2UiLCJsb2FkIiwibG9jYWxTdG9yYWdlIiwic2Vzc2lvblN0b3JhZ2UiLCJmb3JFYWNoIiwiY3VycmVudFVzZXJEYXRhIiwicmVtZW1iZXJNZSIsInNldFVzZXIiLCJ1c2VyRGF0YSIsImNsZWFyVXNlciIsImNsZWFyU3RvcmFnZSIsImxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciIsInJlcXVlc3QiLCJjb25maWciLCJoZWFkZXJzIiwiYXV0aEhlYWRlciIsIl9faXNHZXRDdXJyZW50VXNlcl9fIiwicmVzIiwiYm9keSIsInN0YXR1cyIsIndoZW4iLCJ1cmxCYXNlIiwic2V0QXV0aEhlYWRlciIsImhlYWRlciIsImdldEF1dGhIZWFkZXIiLCJzZXRVcmxCYXNlIiwiZ2V0VXJsQmFzZSIsIiRyZXNvdXJjZSIsInBhcmFtcyIsIm9yaWdpbmFsVXJsIiwicmVzb3VyY2UiLCIkc2F2ZSIsInN1Y2Nlc3MiLCJ1cHNlcnQiLCJmYWN0b3J5IiwicHJvdmlkZXIiLCIkaHR0cFByb3ZpZGVyIiwiaW50ZXJjZXB0b3JzIiwiY29uc3RhbnQiLCJpZGIyIiwiZGIiLCJ1cGdyYWRlbmVlZGVkIiwiYXV0b21pZ3JhdGlvbiIsInNldEtleVBhdGgiLCJzZXRBdXRvSW5jcmVtZW50IiwiZHJvcCIsInJ1biIsImRiMiIsIkNsYXp6ZXIiLCJSZWFkeVN0YXRlIiwic3RhdGljIiwiaWRiUmVxdWVzdCIsIm1lIiwiaW5oZXJpdCIsIkV2ZW50VGFyZ2V0IiwiY2xhenoiLCJnZXR0ZXIiLCJoYW5kbGVyRXZlbnQiLCJwcm9wZXJ0eSIsIiRfcHJvbWlzZSIsIlByb21pc2UiLCJpZGJPcGVuREJSZXF1ZXN0IiwiaWRiU3RvcmUiLCJpZGJNb2RlbDIiLCJpZGJUcmFuc2FjdGlvbiIsImZpcnN0Iiwic2Vjb25kIiwiY21wIiwibWV0aG9kIiwiJHVwZ3JhZGVuZWVkZWRzIiwiYWxsTWlncmF0aW9ucyIsIm9wZW5SZXF1ZXN0Iiwib2xkVmVyc2lvbiIsIm5ld1ZlcnNpb24iLCJtaWdyYXRpb25zIiwibWlncmF0aW9uIiwiY2JFcnIiLCJsYXN0UnEiLCJsYXN0RXZlbnQiLCIkbmFtZSIsIiRtZSIsImNsb3NlIiwiZGVsZXRlT2JqZWN0U3RvcmUiLCIkbW9kZWxzIiwic3RvcmVOYW1lcyIsIm1vZGUiLCJzdG9yZXMiLCJzdG9yZU5hbWUiLCJzdG9yZSIsIlRyYW5zYWN0aW9uTW9kZSIsIlJFQURPTkxZIiwiUkVBRFdSSVRFIiwiYWRkIiwicXVlcnkiLCJjbGVhciIsImdldEtleSIsImNvdW50IiwiZ2V0QWxsIiwiZ2V0QWxsS2V5cyIsImRpcmVjdGlvbiIsIm9wZW5LZXlDdXJzb3IiLCJkZWxldGVJbmRleCIsImRlZXBGaWVsZCIsImlkYk1vZGVsRmFjdG9yeSIsInJlYWR3cml0ZSIsImNvbnN0cnVjdG9yIiwiZGVmaW5lUHJvcGVydHkiLCJwYXJlbnQiLCJ0bXAiLCJmdW5jIiwiZnJvbSIsInRvIiwic2V0IiwiJGRlZkFjY2Vzc1Rva2VuSWQiLCIkZGVmQ3VycmVudFVzZXJJZCIsIiR1cmwiLCJhYm9ydCIsImNvbXBsZXRlZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FBRUE7O0FDRUEsS0FBSSxhQUFhLHVCQUF1Qjs7QUREeEM7O0FDS0EsS0FBSSxjQUFjLHVCQUF1Qjs7QURKekM7O0FDUUEsS0FBSSxPQUFPLHVCQUF1Qjs7QURObEM7O0FDVUEsS0FBSSxjQUFjLHVCQUF1Qjs7QURUekM7O0FDYUEsS0FBSSxRQUFRLHVCQUF1Qjs7QURabkM7O0FDZ0JBLEtBQUksYUFBYSx1QkFBdUI7O0FEZnhDOztBQ21CQSxLQUFJLGFBQWEsdUJBQXVCOztBRGpCeEM7O0FDcUJBLEtBQUksT0FBTyx1QkFBdUI7O0FEbkJsQzs7QUN1QkEsVUFBUyx1QkFBdUIsS0FBSyxFQUFFLE9BQU8sT0FBTyxJQUFJLGFBQWEsTUFBTSxFQUFFLFNBQVM7O0FEckJ2RixtQkFBR0EsUUFBUUMsT0FBTyxVQUFVLENBQUMsZUFFMUJDLFFBQVEsYUFGWCxxQkFH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ZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0YWZmZDhiZDFkMjkwOTk4ZjhmYlxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBpZGJVdGlscyBmcm9tICcuL3V0aWxzL2lkYlV0aWxzJztcclxuaW1wb3J0IGlkYkV2ZW50cyBmcm9tICcuL3V0aWxzL2lkYkV2ZW50cyc7XHJcbmltcG9ydCBxcyBmcm9tICcuL3V0aWxzL3FzJztcclxuXHJcbmltcG9ydCBpZGJTb2NrZXQgZnJvbSAnLi9zZXJ2aWNlcy9pZGJTb2NrZXQnO1xyXG5pbXBvcnQgaWRiIGZyb20gJy4vc2VydmljZXMvaWRiJztcclxuaW1wb3J0IGlkYk1vZGVsIGZyb20gJy4vc2VydmljZXMvaWRiTW9kZWwnO1xyXG5pbXBvcnQgaWRiUXVlcnkgZnJvbSAnLi9zZXJ2aWNlcy9pZGJRdWVyeSc7XHJcblxyXG5pbXBvcnQgbGIgZnJvbSAnLi9zZXJ2aWNlcy9sYic7XHJcblxyXG5pbXBvcnQgJy4vdjEvaW5kZXgnO1xyXG5cclxubGIoYW5ndWxhci5tb2R1bGUoJ25nLmlkYicsIFsnbmcudjEuaWRiJ10pKVxyXG4gIFxyXG4gIC5zZXJ2aWNlKCdpZGJFdmVudHMnLCBpZGJFdmVudHMpXHJcbiAgLnNlcnZpY2UoJ2lkYlV0aWxzJywgaWRiVXRpbHMpXHJcbiAgLnNlcnZpY2UoJ3FzJywgcXMpXHJcblxyXG4gIC8vIFRha2Ugb2YgbGItc2VydmljZXMuanNcclxuICAuc2VydmljZSgnaWRiJywgaWRiKVxyXG4gIC5zZXJ2aWNlKCdpZGJNb2RlbCcsIGlkYk1vZGVsKVxyXG4gIC5zZXJ2aWNlKCdpZGJRdWVyeScsIGlkYlF1ZXJ5KVxyXG4gIC5zZXJ2aWNlKCdpZGJTb2NrZXQnLCBpZGJTb2NrZXQpXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2lkYlV0aWxzID0gcmVxdWlyZSgnLi91dGlscy9pZGJVdGlscycpO1xuXG52YXIgX2lkYlV0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlV0aWxzKTtcblxudmFyIF9pZGJFdmVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2lkYkV2ZW50cycpO1xuXG52YXIgX2lkYkV2ZW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJFdmVudHMpO1xuXG52YXIgX3FzID0gcmVxdWlyZSgnLi91dGlscy9xcycpO1xuXG52YXIgX3FzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3FzKTtcblxudmFyIF9pZGJTb2NrZXQgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYlNvY2tldCcpO1xuXG52YXIgX2lkYlNvY2tldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJTb2NrZXQpO1xuXG52YXIgX2lkYiA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiJyk7XG5cbnZhciBfaWRiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYik7XG5cbnZhciBfaWRiTW9kZWwgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYk1vZGVsJyk7XG5cbnZhciBfaWRiTW9kZWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiTW9kZWwpO1xuXG52YXIgX2lkYlF1ZXJ5ID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJRdWVyeScpO1xuXG52YXIgX2lkYlF1ZXJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlF1ZXJ5KTtcblxudmFyIF9sYiA9IHJlcXVpcmUoJy4vc2VydmljZXMvbGInKTtcblxudmFyIF9sYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYik7XG5cbnJlcXVpcmUoJy4vdjEvaW5kZXgnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuKDAsIF9sYjIuZGVmYXVsdCkoYW5ndWxhci5tb2R1bGUoJ25nLmlkYicsIFsnbmcudjEuaWRiJ10pKS5zZXJ2aWNlKCdpZGJFdmVudHMnLCBfaWRiRXZlbnRzMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJVdGlscycsIF9pZGJVdGlsczIuZGVmYXVsdCkuc2VydmljZSgncXMnLCBfcXMyLmRlZmF1bHQpXG5cbi8vIFRha2Ugb2YgbGItc2VydmljZXMuanNcbi5zZXJ2aWNlKCdpZGInLCBfaWRiMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJNb2RlbCcsIF9pZGJNb2RlbDIuZGVmYXVsdCkuc2VydmljZSgnaWRiUXVlcnknLCBfaWRiUXVlcnkyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlNvY2tldCcsIF9pZGJTb2NrZXQyLmRlZmF1bHQpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiVXRpbHMgKCRxKSB7ICduZ0luamVjdCdcclxuICBcclxuICBjb25zdCB2YWxpZGF0b3JzID0ge1xyXG4gICAgLy8gRnVuY2lvbiBwYXJhIGRldGVybWluYXIgc2kgZXMgdW4gY2FsbGJhY2sgdsOhbGlkbyBvIG5vXHJcbiAgICBjYWxsYmFjazogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJyB8fCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09IHVuZGVmaW5lZDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gVmVyaWZpY2Egc2kgdW4gdmFsb3IgZXMgdW4gYXJyYXlcclxuICAgIGFycmF5OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgfSAgXHJcblxyXG4gIC8vIEdlbmVyYSB1biBlcnJvciBzaSBlbCB2YWxvciBubyBlcyBkZWwgdGlwbyBpbmRpY2FkbyBwb3IgcGFyYW1ldHJvXHJcbiAgZnVuY3Rpb24gdmFsaWQgKHZhbHVlLCB0eXBlcykge1xyXG4gICAgaWYgKCF2YWxpZGF0b3JzLmFycmF5KHR5cGVzKSkgdHlwZXMgPSBbdHlwZXNdO1xyXG5cclxuICAgIGZvcihsZXQgaSBpbiB0eXBlcyl7XHJcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlc1tpXTtcclxuICAgICAgaWYgKHR5cGVvZiB0eXBlID09ICdzdHJpbmcnKXtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbGlkYXRvcnNbdHlwZV0gPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgaWYgKHZhbGlkYXRvcnNbdHlwZV0odmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09IHR5cGUpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdHlwZSA9PSAnZnVuY3Rpb24nKXtcclxuICAgICAgICBpZih0eXBlKGFyZ3NbaV0pKXtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgfVxyXG5cclxuICAvLyBWYWxpZGEgdW4gYXJyYXkgZGUgYXJndW1lbnRvcyBjb24gdW4gYXJyYSBkZSB0aXBvc1xyXG4gIGZ1bmN0aW9uIHZhbGlkYXRlIChhcmdzLCB0eXBlcykge1xyXG5cclxuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcclxuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcclxuICAgIGZvciAobGV0IGkgaW4gYXJncyl7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gYXJnc1tpXTtcclxuICAgICAgY29uc3QgdHlwZSA9IHR5cGVzW2ldO1xyXG4gICAgICBpZiAodHlwZSAmJiAhdmFsaWQodmFsdWUsIHR5cGUpKXtcclxuICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbGlkYXRvciB0bzogJythcmdzW2ldKycgbXVzdCBiZSAnK3R5cGUpO1xyXG4gICAgICAgIGVyci5uYW1lID0gJ0ludmFsaWRWYWxpZGF0b3InXHJcbiAgICAgICAgdGhyb3cgZXJyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHZhbGlkYXRlOiB2YWxpZGF0ZSxcclxuICB9O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL2lkYlV0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGlkYlV0aWxzO1xuZnVuY3Rpb24gaWRiVXRpbHMoJHEpIHtcbiAgJ25nSW5qZWN0JztcblxuICB2YXIgdmFsaWRhdG9ycyA9IHtcbiAgICAvLyBGdW5jaW9uIHBhcmEgZGV0ZXJtaW5hciBzaSBlcyB1biBjYWxsYmFjayB2w6FsaWRvIG8gbm9cbiAgICBjYWxsYmFjazogZnVuY3Rpb24gY2FsbGJhY2sodmFsdWUpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJyB8fCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09IHVuZGVmaW5lZDtcbiAgICB9LFxuXG4gICAgLy8gVmVyaWZpY2Egc2kgdW4gdmFsb3IgZXMgdW4gYXJyYXlcbiAgICBhcnJheTogZnVuY3Rpb24gYXJyYXkodmFsdWUpIHtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKTtcbiAgICB9XG5cbiAgfTtcblxuICAvLyBHZW5lcmEgdW4gZXJyb3Igc2kgZWwgdmFsb3Igbm8gZXMgZGVsIHRpcG8gaW5kaWNhZG8gcG9yIHBhcmFtZXRyb1xuICBmdW5jdGlvbiB2YWxpZCh2YWx1ZSwgdHlwZXMpIHtcbiAgICBpZiAoIXZhbGlkYXRvcnMuYXJyYXkodHlwZXMpKSB0eXBlcyA9IFt0eXBlc107XG5cbiAgICBmb3IgKHZhciBpIGluIHR5cGVzKSB7XG4gICAgICB2YXIgdHlwZSA9IHR5cGVzW2ldO1xuICAgICAgaWYgKHR5cGVvZiB0eXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsaWRhdG9yc1t0eXBlXSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaWYgKHZhbGlkYXRvcnNbdHlwZV0odmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PSB0eXBlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHR5cGUgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAodHlwZShhcmdzW2ldKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gVmFsaWRhIHVuIGFycmF5IGRlIGFyZ3VtZW50b3MgY29uIHVuIGFycmEgZGUgdGlwb3NcbiAgZnVuY3Rpb24gdmFsaWRhdGUoYXJncywgdHlwZXMpIHtcblxuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcbiAgICBpZiAodHlwZW9mIHR5cGVzID09ICdzdHJpbmcnKSB0eXBlcyA9IFt0eXBlc107XG4gICAgZm9yICh2YXIgaSBpbiBhcmdzKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhcmdzW2ldO1xuICAgICAgdmFyIHR5cGUgPSB0eXBlc1tpXTtcbiAgICAgIGlmICh0eXBlICYmICF2YWxpZCh2YWx1ZSwgdHlwZSkpIHtcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWxpZGF0b3IgdG86ICcgKyBhcmdzW2ldICsgJyBtdXN0IGJlICcgKyB0eXBlKTtcbiAgICAgICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbGlkYXRvcic7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHZhbGlkYXRlOiB2YWxpZGF0ZVxuICB9O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL2lkYlV0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gTm9tYnJlIGRlIGxvcyBldmVudG9zXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYkV2ZW50cygpIHtcclxuICByZXR1cm4ge1xyXG4gICAgREJfRVJST1I6ICdjYi5lcnJvcicsXHJcbiAgICBNT0RFTF9JTlNUQU5DRUQgOiAnbW9kZWwuaW5zdGFuY2VkJyxcclxuICAgIE1PREVMX1JFUExBQ0UgOiAnbW9kZWwucmVwbGFjZScsXHJcbiAgICBNT0RFTF9RVUVSSUVEIDogJ21vZGVsLnF1ZXJpZWQnLFxyXG4gICAgTU9ERUxfVU5RVUVSSUVEIDogJ21vZGVsLnVucXVlcmllZCcsXHJcbiAgfVxyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL2lkYkV2ZW50cy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gTm9tYnJlIGRlIGxvcyBldmVudG9zXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJFdmVudHM7XG5mdW5jdGlvbiBpZGJFdmVudHMoKSB7XG4gIHJldHVybiB7XG4gICAgREJfRVJST1I6ICdjYi5lcnJvcicsXG4gICAgTU9ERUxfSU5TVEFOQ0VEOiAnbW9kZWwuaW5zdGFuY2VkJyxcbiAgICBNT0RFTF9SRVBMQUNFOiAnbW9kZWwucmVwbGFjZScsXG4gICAgTU9ERUxfUVVFUklFRDogJ21vZGVsLnF1ZXJpZWQnLFxuICAgIE1PREVMX1VOUVVFUklFRDogJ21vZGVsLnVucXVlcmllZCdcbiAgfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcXMgKCkgeyAnbmdJbmplY3QnXHJcbiAgXHJcbiAgZnVuY3Rpb24gcXNDbGFzcyAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBcclxuICAgIGxldCB0aGVucyA9IFtdO1xyXG4gICAgbGV0IHRoZW5zUmVhZHkgPSBbXTtcclxuICAgIGxldCBjYXRjaHMgPSBbXTtcclxuICAgIGxldCBjYXRjaHNSZWFkeSA9IFtdO1xyXG4gICAgbGV0IHJlc3VsdEFyZ3MgPSBudWxsO1xyXG4gICAgbGV0IGVycm9yID0gbnVsbDtcclxuXHJcbiAgICB0aGl6LnByb21pc2UgPSB7fTtcclxuICAgIHRoaXouJHJlc29sdmVkID0gZmFsc2U7XHJcblxyXG4gICAgZnVuY3Rpb24gdGhlbnNSZXNvbHZlZCAoKSB7XHJcbiAgICAgIGlmICghdGhlbnMubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgIGxldCBjYiA9IHRoZW5zLnNoaWZ0KCk7XHJcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXoucmVzdWx0QXJncyk7XHJcbiAgICAgIHRoZW5zUmVhZHkucHVzaChjYik7XHJcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYXRjaHNSZXNvbHZlZCAoKSB7XHJcbiAgICAgIGlmICghY2F0Y2hzLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICBsZXQgY2IgPSBjYXRjaHMuc2hpZnQoKTtcclxuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XHJcbiAgICAgIGNhdGNoc1JlYWR5LnB1c2goY2IpO1xyXG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXoucmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XHJcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgdGhpei5yZXN1bHRBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnJlamVjdCA9IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XHJcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgdGhpei5lcnJvciA9IGVyciB8fCB7fTtcclxuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgdGhlbnMucHVzaChjYik7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiAhdGhpei5lcnJvcikge1xyXG4gICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpei5wcm9taXNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnByb21pc2UuY2F0Y2ggPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgY2F0Y2hzLnB1c2goY2IpO1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQgJiYgdGhpei5lcnJvcikge1xyXG4gICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXoucHJvbWlzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLmRvbmUgPSBmdW5jdGlvbiAoY2IpIHtcclxuXHJcbiAgICAgIHRoZW5zLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQodGhpei5yZXN1bHRBcmdzKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY2F0Y2hzLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkge1xyXG4gICAgICAgIGlmICghdGhpei5lcnJvcikge1xyXG4gICAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGlmKGNiKSB0aGl6LnByb21pc2UuZG9uZShjYik7XHJcblxyXG4gIH07XHJcblxyXG4gIC8vIENyZWEgdW5hIGluc3RhbmNpYSBkZWwgZGVmZXJlZFxyXG4gIHFzQ2xhc3MuZGVmZXIgPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgIHJldHVybiBuZXcgcXNDbGFzcyhjYik7XHJcbiAgfTtcclxuXHJcbiAgcXNDbGFzcy5hbGwgPSBmdW5jdGlvbiAoYXJyKSB7XHJcbiAgICBjb25zdCBkZWZlcmVkID0gcXNDbGFzcy5kZWZlcigpO1xyXG5cclxuICAgIGxldCBwcm9taXNlcyA9IGtleXMubGVuZ3RoO1xyXG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGFycik7XHJcbiAgICBjb25zdCByZXN1bHRzID0gYXJyLmxlbmd0aD8gW10gOiB7fTtcclxuXHJcbiAgICBrZXlzLm1hcChmdW5jdGlvbiAoaWR4KSB7XHJcblxyXG4gICAgICBhcnJbaWR4XS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICBwcm9taXNlcy0tO1xyXG4gICAgICAgIHJlc3VsdHNbaWR4XSA9IHJlc3VsdDtcclxuICAgICAgICBpZiAoIXByb21pc2VzKXtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShyZXN1bHRzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgYXJyW2lkeF0uY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICB9O1xyXG5cclxuICByZXR1cm4gcXNDbGFzcztcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9xcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHFzO1xuZnVuY3Rpb24gcXMoKSB7XG4gICduZ0luamVjdCc7XG5cbiAgZnVuY3Rpb24gcXNDbGFzcyhjYikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgIHZhciB0aGVucyA9IFtdO1xuICAgIHZhciB0aGVuc1JlYWR5ID0gW107XG4gICAgdmFyIGNhdGNocyA9IFtdO1xuICAgIHZhciBjYXRjaHNSZWFkeSA9IFtdO1xuICAgIHZhciByZXN1bHRBcmdzID0gbnVsbDtcbiAgICB2YXIgZXJyb3IgPSBudWxsO1xuXG4gICAgdGhpei5wcm9taXNlID0ge307XG4gICAgdGhpei4kcmVzb2x2ZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIHRoZW5zUmVzb2x2ZWQoKSB7XG4gICAgICBpZiAoIXRoZW5zLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgdmFyIGNiID0gdGhlbnMuc2hpZnQoKTtcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXoucmVzdWx0QXJncyk7XG4gICAgICB0aGVuc1JlYWR5LnB1c2goY2IpO1xuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhdGNoc1Jlc29sdmVkKCkge1xuICAgICAgaWYgKCFjYXRjaHMubGVuZ3RoKSByZXR1cm47XG4gICAgICB2YXIgY2IgPSBjYXRjaHMuc2hpZnQoKTtcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xuICAgICAgY2F0Y2hzUmVhZHkucHVzaChjYik7XG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgIH1cblxuICAgIHRoaXoucmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgdGhpei5yZXN1bHRBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICB9O1xuXG4gICAgdGhpei5yZWplY3QgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgIHRoaXouZXJyb3IgPSBlcnIgfHwge307XG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgIH07XG5cbiAgICB0aGl6LnByb21pc2UudGhlbiA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgdGhlbnMucHVzaChjYik7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQgJiYgIXRoaXouZXJyb3IpIHtcbiAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXoucHJvbWlzZTtcbiAgICB9O1xuXG4gICAgdGhpei5wcm9taXNlLmNhdGNoID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICBjYXRjaHMucHVzaChjYik7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQgJiYgdGhpei5lcnJvcikge1xuICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXoucHJvbWlzZTtcbiAgICB9O1xuXG4gICAgdGhpei5wcm9taXNlLmRvbmUgPSBmdW5jdGlvbiAoY2IpIHtcblxuICAgICAgdGhlbnMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQodGhpei5yZXN1bHRBcmdzKSk7XG4gICAgICB9KTtcblxuICAgICAgY2F0Y2hzLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHtcbiAgICAgICAgaWYgKCF0aGl6LmVycm9yKSB7XG4gICAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIGlmIChjYikgdGhpei5wcm9taXNlLmRvbmUoY2IpO1xuICB9O1xuXG4gIC8vIENyZWEgdW5hIGluc3RhbmNpYSBkZWwgZGVmZXJlZFxuICBxc0NsYXNzLmRlZmVyID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgcmV0dXJuIG5ldyBxc0NsYXNzKGNiKTtcbiAgfTtcblxuICBxc0NsYXNzLmFsbCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICB2YXIgZGVmZXJlZCA9IHFzQ2xhc3MuZGVmZXIoKTtcblxuICAgIHZhciBwcm9taXNlcyA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYXJyKTtcbiAgICB2YXIgcmVzdWx0cyA9IGFyci5sZW5ndGggPyBbXSA6IHt9O1xuXG4gICAga2V5cy5tYXAoZnVuY3Rpb24gKGlkeCkge1xuXG4gICAgICBhcnJbaWR4XS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgcHJvbWlzZXMtLTtcbiAgICAgICAgcmVzdWx0c1tpZHhdID0gcmVzdWx0O1xuICAgICAgICBpZiAoIXByb21pc2VzKSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgYXJyW2lkeF0uY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGVmZXJlZDtcbiAgfTtcblxuICByZXR1cm4gcXNDbGFzcztcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9xcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJTZXJ2aWNlICgkbG9nLCBxcywgaWRiVXRpbHMsIGlkYkV2ZW50cywgaWRiTW9kZWwpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxyXG4gICAgY29uc3QgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xyXG4gICAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxyXG4gICAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XHJcbiAgICBjb25zdCBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XHJcbiAgICBjb25zdCBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XHJcbiAgICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxyXG4gICAgXHJcbiAgICBpZiAoIWluZGV4ZWREQikge1xyXG4gICAgICBhbGVydChcIlN1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhc1wiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAvLyBDbGFzZSBwYXJhIGxhIGNyZWFjacOzbiBkZSBpbnN0YW5jaWFzIGRlIGxhIEJEXHJcbiAgZnVuY3Rpb24gaWRiKCRkYk5hbWUsICRkYlZlcnNpb24sICRzb2NrZXQpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ251bWJlcicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgIC8vIE1hbmVqYWRvcmVzIGRlIGV2ZW50b3MuXHJcbiAgICBjb25zdCAkZXZlbnRzQ2FsbGJhY2tzID0ge307XHJcbiAgICBjb25zdCAkdXBncmFkZU5lZWRlZERlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG4gICAgY29uc3QgJG9wZW5EZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgIGNvbnN0ICRzb2NrZXRDb25uZWN0ZWREZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgIGxldCAkb3BlbmVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gSW5zdGFuY2lhIGRlIGxhIGJhc2UgZGUgZGF0b3M7XHJcbiAgICBsZXQgJHJlcXVlc3QgPSBudWxsO1xyXG4gICAgdGhpei5tb2RlbHMgPSB7fTtcclxuXHJcbiAgICAvLyBBZ3JlZ2FyIHVuIG1hbmVqYWRvciBkZSBldmVudG9cclxuICAgICAgdGhpei5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSl7XHJcbiAgICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5wdXNoKGNiKTtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgLy9SZW11ZXZlIHVuIG1hbmVqYWRvciBkZSBldmVudG9cclxuICAgICAgdGhpei51bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIEJ1c2NhciBlbCBjYlxyXG4gICAgICAgIGNvbnN0IGlkeCA9ICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5pbmRleE9mKGNiKTtcclxuXHJcbiAgICAgICAgLy8gU2kgc2UgZW5jb250cm8gZWwgY2IgcmVtb3ZlcmxvXHJcbiAgICAgICAgaWYgKGlkeCAhPSAtMSl7XHJcbiAgICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAvLyBEaXNwYXJhIHVuIGV2ZW50b1xyXG4gICAgICB0aGl6LnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnXSk7XHJcblxyXG4gICAgICAgICRsb2cubG9nKCRkYk5hbWUrJy52JysoJGRiVmVyc2lvbnx8MSkrJzogJytldmVudE5hbWUpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgaW4gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKXtcclxuICAgICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXVtpXS5hcHBseSh0aGl6LCBhcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgIC8vIENhbGxiYWNrcyBwYXJhIGxvcyBlcnJvcmVzXHJcbiAgICAgIHRoaXouZXJyb3IgPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICB0aGl6LmJpbmQoaWRiRXZlbnRzLkRCX0VSUk9SLCBjYik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICAgIH07XHJcblxyXG4gICAgLy8gQWJyaXIgdW5hIEJhc2UgZGUgZGF0b3MuXHJcbiAgICB0aGl6Lm9wZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICgkb3BlbmVkKSByZXR1cm4gJG9wZW5EZWZlcmVkO1xyXG5cclxuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gZGVmZXJcclxuICAgICAgJG9wZW5lZCA9IHRydWU7XHJcblxyXG4gICAgICAvLyBkZWphbW9zIGFiaWVydGEgbnVlc3RyYSBiYXNlIGRlIGRhdG9zXHJcbiAgICAgIGZ1bmN0aW9uIHJlYWR5KCkge1xyXG5cclxuICAgICAgICBjb25zdCBycSA9IGluZGV4ZWREQi5vcGVuKCRkYk5hbWUsICRkYlZlcnNpb24pO1xyXG5cclxuICAgICAgICBycS5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLnJlc3VsdCFcclxuICAgICAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBycSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlbCByZXN1bHRhZG9cclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLnJlc3VsdCFcclxuICAgICAgICAgICRyZXF1ZXN0ID0gcnE7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIEFzaW5nYXIgZWwgbWFuZWphZG9yIGRlIGVycm9yZXMgYSBsYSBCRFxyXG4gICAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAkbG9nLmVycm9yKCdEYXRhYmFzZSBlcnJvcjogJysgZXZlbnQudGFyZ2V0LmVycm9yQ29kZSk7XHJcbiAgICAgICAgICAgIHRoaXoudHJpZ2dlcihpZGJFdmVudHMuREJfRVJST1IsIFtldmVudF0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBycSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlIGVycm9yZXNcclxuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLmVycm9yQ29kZSFcclxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAkb3BlbkRlZmVyZWQucmVqZWN0KHJxLmVycm9yQ29kZSwgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UoJGRiTmFtZSkub25zdWNjZXNzID0gcmVhZHk7XHJcbiAgICAgIC8vIHJlYWR5KCk7XHJcblxyXG4gICAgICByZXR1cm4gJG9wZW5EZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQWdyZWdhIHVuIG51ZXZvIG1vZGVsb1xyXG4gICAgICB0aGl6Lm1vZGVsID0gZnVuY3Rpb24gKG5hbWUsIHNvY2tldCkge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3VuZGVmaW5lZCcsICdvYmplY3QnXV0pO1xyXG5cclxuICAgICAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsb1xyXG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXoubW9kZWxzW25hbWVdO1xyXG5cclxuICAgICAgICAvLyBTaSBubyBleGlzdGUgZWwgbW9kZWxvIGNyZWFyXHJcbiAgICAgICAgaWYoIW1vZGVsKXtcclxuICAgICAgICAgIG1vZGVsID0gaWRiTW9kZWwodGhpeiwgbmFtZSwgc29ja2V0IHx8ICRzb2NrZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gR3VhcmRhciBlbCBtb2RlbG8gZW4gbG9zIG1vZGVsb3NcclxuICAgICAgICB0aGl6Lm1vZGVsc1tuYW1lXSA9IG1vZGVsO1xyXG5cclxuICAgICAgICAvLyBSZXRvcm5hciBlbCBtb2RlbG9cclxuICAgICAgICByZXR1cm4gbW9kZWw7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxyXG4gICAgICB0aGl6LmNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgbW9kZWxJZCkge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcclxuICAgICAgICAgIHJxLnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShtb2RlbE5hbWUsIG1vZGVsSWQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcclxuICAgIHRoaXouY3JlYXRlSW5kZXggPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XHJcbiAgICAgICAgcnEudHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5jcmVhdGVJbmRleChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSB1bmEgdHJhbnNhY2Npw7NuXHJcbiAgICB0aGl6LnRyYW5zYWN0aW9uID0gZnVuY3Rpb24obW9kZWxOYW1lLCBwZXJtcywgYWN0aW9uKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICAvLyBDdWFuZG8gc2UgYWJyYSBsYSBCRFxyXG4gICAgICAkb3BlbkRlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcclxuICAgICAgICBjb25zdCB0eCA9IHJxLnJlc3VsdC50cmFuc2FjdGlvbihtb2RlbE5hbWUsIHBlcm1zKTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhY3Rpb24odHgpO1xyXG5cclxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXHJcbiAgICAgICAgdHgub25jb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCByZXN1bHQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXHJcbiAgICAgICAgdHgub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KHR4LmVycm9yKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE9idGllbmUgdW4gZWxlbWVudG8gcG9yIHN1IGtleVxyXG4gICAgdGhpei5nZXQgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBrZXkpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnc3RyaW5nJywgJ251bWJlciddXSk7XHJcblxyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuXHJcbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXHJcbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBjb25zdCBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShycS5yZXN1bHQsIGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxyXG4gICAgICAgIHJxLm9uZXJyb3IgID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAvLyBDb3VsZCBjYWxsIHJxLnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEluc2VydGEgdW4gcmVnaXN0cm8gZW4gZWwgbW9kZWxvXHJcbiAgICB0aGl6LnB1dCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIHZhbHVlcykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cclxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBjb25zdCBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkucHV0KHZhbHVlcyk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICBycS5vbmVycm9yICA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBFbGltaW5hIHVuIG9iamV0byBwb3Igc3Uga2V5XHJcbiAgICB0aGl6LmRlbGV0ZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGtleSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cclxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBjb25zdCBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkuZGVsZXRlKGtleSk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICBycS5vbmVycm9yICA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cclxuICAgIHRoaXoub3BlbkN1cnNvciA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGZpbHRlcnMsIGVhY2hDYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ10sICdmdW5jdGlvbiddKTtcclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxyXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWRvbmx5JywgZnVuY3Rpb24gKHR4KSB7XHJcbiAgICAgICAgY29uc3QgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLm9wZW5DdXJzb3IoKTtcclxuXHJcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBycS5yZXN1bHQ7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIE5vIG1vcmUgbWF0Y2hpbmcgcmVjb3Jkcy5cclxuICAgICAgICAgIGlmIChjdXJzb3Ipe1xyXG4gICAgICAgICAgICBlYWNoQ2IoY3Vyc29yLnZhbHVlLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgLy8gQnVzY2FyIHNpZ3VpZW50ZVxyXG4gICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcmVkLnJlc29sdmUoKTtcclxuICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWFyIGFsaWFzIHBhcmEgbG9zIGV2ZW50b3MgZW5sYXphciBjYWxsYmFja3MgYSBsb3MgZXZlbnRvc1xyXG4gICAgbGV0IGRlZmVyZWRzO1xyXG4gICAgICBPYmplY3Qua2V5cyhkZWZlcmVkcyA9IHtcclxuICAgICAgICBvbk9wZW46ICRvcGVuRGVmZXJlZCxcclxuICAgICAgICBvblVwZ3JhZGVOZWVkZWQ6ICR1cGdyYWRlTmVlZGVkRGVmZXJlZCxcclxuICAgICAgICBvblNvY2tldENvbm5lY3RlZDogJHNvY2tldENvbm5lY3RlZERlZmVyZWRcclxuICAgICAgfSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zdCB0ZXh0ID0gJGRiTmFtZSsnLnYnKygkZGJWZXJzaW9ufHwxKSsnOiAnK2tleTtcclxuICAgICAgICAgIGlmIChlcnIpe1xyXG4gICAgICAgICAgICAkbG9nLmVycm9yKHRleHQsIGVycik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkbG9nLmxvZyh0ZXh0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGl6W2tleV0gPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcclxuICAgICAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGNiKTtcclxuICAgICAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG5cclxuICB9O1xyXG5cclxuICByZXR1cm4gaWRiO1xyXG5cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaWRiU2VydmljZTtcbmZ1bmN0aW9uIGlkYlNlcnZpY2UoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJFdmVudHMsIGlkYk1vZGVsKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxuXG4gIHZhciBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XG4gIC8vIE5vIHVzZSBcImNvbnN0IGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cbiAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XG4gIHZhciBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XG4gIHZhciBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XG4gIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXG5cbiAgaWYgKCFpbmRleGVkREIpIHtcbiAgICBhbGVydChcIlN1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhc1wiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBDbGFzZSBwYXJhIGxhIGNyZWFjacOzbiBkZSBpbnN0YW5jaWFzIGRlIGxhIEJEXG4gIGZ1bmN0aW9uIGlkYigkZGJOYW1lLCAkZGJWZXJzaW9uLCAkc29ja2V0KSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnbnVtYmVyJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAvLyBNYW5lamFkb3JlcyBkZSBldmVudG9zLlxuICAgIHZhciAkZXZlbnRzQ2FsbGJhY2tzID0ge307XG4gICAgdmFyICR1cGdyYWRlTmVlZGVkRGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgdmFyICRvcGVuRGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgdmFyICRzb2NrZXRDb25uZWN0ZWREZWZlcmVkID0gcXMuZGVmZXIoKTtcbiAgICB2YXIgJG9wZW5lZCA9IGZhbHNlO1xuXG4gICAgLy8gSW5zdGFuY2lhIGRlIGxhIGJhc2UgZGUgZGF0b3M7XG4gICAgdmFyICRyZXF1ZXN0ID0gbnVsbDtcbiAgICB0aGl6Lm1vZGVscyA9IHt9O1xuXG4gICAgLy8gQWdyZWdhciB1biBtYW5lamFkb3IgZGUgZXZlbnRvXG4gICAgdGhpei5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSB7XG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0ucHVzaChjYik7XG4gICAgfTtcblxuICAgIC8vUmVtdWV2ZSB1biBtYW5lamFkb3IgZGUgZXZlbnRvXG4gICAgdGhpei51bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHJldHVybjtcblxuICAgICAgLy8gQnVzY2FyIGVsIGNiXG4gICAgICB2YXIgaWR4ID0gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLmluZGV4T2YoY2IpO1xuXG4gICAgICAvLyBTaSBzZSBlbmNvbnRybyBlbCBjYiByZW1vdmVybG9cbiAgICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnNwbGljZShpZHgsIDEpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBEaXNwYXJhIHVuIGV2ZW50b1xuICAgIHRoaXoudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0J10pO1xuXG4gICAgICAkbG9nLmxvZygkZGJOYW1lICsgJy52JyArICgkZGJWZXJzaW9uIHx8IDEpICsgJzogJyArIGV2ZW50TmFtZSk7XG5cbiAgICAgIGZvciAodmFyIGkgaW4gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSB7XG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXVtpXS5hcHBseSh0aGl6LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gQ2FsbGJhY2tzIHBhcmEgbG9zIGVycm9yZXNcbiAgICB0aGl6LmVycm9yID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB0aGl6LmJpbmQoaWRiRXZlbnRzLkRCX0VSUk9SLCBjYik7XG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgLy8gQWJyaXIgdW5hIEJhc2UgZGUgZGF0b3MuXG4gICAgdGhpei5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCRvcGVuZWQpIHJldHVybiAkb3BlbkRlZmVyZWQ7XG5cbiAgICAgIC8vIENyZWFyIHVuIG51ZXZvIGRlZmVyXG4gICAgICAkb3BlbmVkID0gdHJ1ZTtcblxuICAgICAgLy8gZGVqYW1vcyBhYmllcnRhIG51ZXN0cmEgYmFzZSBkZSBkYXRvc1xuICAgICAgZnVuY3Rpb24gcmVhZHkoKSB7XG5cbiAgICAgICAgdmFyIHJxID0gaW5kZXhlZERCLm9wZW4oJGRiTmFtZSwgJGRiVmVyc2lvbik7XG5cbiAgICAgICAgcnEub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxuICAgICAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBycSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGVsIHJlc3VsdGFkb1xuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5yZXN1bHQhXG4gICAgICAgICAgJHJlcXVlc3QgPSBycTtcblxuICAgICAgICAgIC8vIEFzaW5nYXIgZWwgbWFuZWphZG9yIGRlIGVycm9yZXMgYSBsYSBCRFxuICAgICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICRsb2cuZXJyb3IoJ0RhdGFiYXNlIGVycm9yOiAnICsgZXZlbnQudGFyZ2V0LmVycm9yQ29kZSk7XG4gICAgICAgICAgICB0aGl6LnRyaWdnZXIoaWRiRXZlbnRzLkRCX0VSUk9SLCBbZXZlbnRdKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgJG9wZW5EZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzXG4gICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLmVycm9yQ29kZSFcbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZWplY3QocnEuZXJyb3JDb2RlLCBldmVudCk7XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICBpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UoJGRiTmFtZSkub25zdWNjZXNzID0gcmVhZHk7XG4gICAgICAvLyByZWFkeSgpO1xuXG4gICAgICByZXR1cm4gJG9wZW5EZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBBZ3JlZ2EgdW4gbnVldm8gbW9kZWxvXG4gICAgdGhpei5tb2RlbCA9IGZ1bmN0aW9uIChuYW1lLCBzb2NrZXQpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3VuZGVmaW5lZCcsICdvYmplY3QnXV0pO1xuXG4gICAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsb1xuICAgICAgdmFyIG1vZGVsID0gdGhpei5tb2RlbHNbbmFtZV07XG5cbiAgICAgIC8vIFNpIG5vIGV4aXN0ZSBlbCBtb2RlbG8gY3JlYXJcbiAgICAgIGlmICghbW9kZWwpIHtcbiAgICAgICAgbW9kZWwgPSBpZGJNb2RlbCh0aGl6LCBuYW1lLCBzb2NrZXQgfHwgJHNvY2tldCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEd1YXJkYXIgZWwgbW9kZWxvIGVuIGxvcyBtb2RlbG9zXG4gICAgICB0aGl6Lm1vZGVsc1tuYW1lXSA9IG1vZGVsO1xuXG4gICAgICAvLyBSZXRvcm5hciBlbCBtb2RlbG9cbiAgICAgIHJldHVybiBtb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXG4gICAgdGhpei5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIG1vZGVsSWQpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcbiAgICAgICAgcnEucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKG1vZGVsTmFtZSwgbW9kZWxJZCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXG4gICAgdGhpei5jcmVhdGVJbmRleCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcbiAgICAgICAgcnEudHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5jcmVhdGVJbmRleChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSB1bmEgdHJhbnNhY2Npw7NuXG4gICAgdGhpei50cmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIHBlcm1zLCBhY3Rpb24pIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgIC8vIEN1YW5kbyBzZSBhYnJhIGxhIEJEXG4gICAgICAkb3BlbkRlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcbiAgICAgICAgdmFyIHR4ID0gcnEucmVzdWx0LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgcGVybXMpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gYWN0aW9uKHR4KTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHR4Lm9uY29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJlc3VsdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgdHgub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdCh0eC5lcnJvcik7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIE9idGllbmUgdW4gZWxlbWVudG8gcG9yIHN1IGtleVxuICAgIHRoaXouZ2V0ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwga2V5KSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLmdldChrZXkpO1xuXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKHJxLnJlc3VsdCwgZXZlbnQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAvLyBDb3VsZCBjYWxsIHJxLnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIEluc2VydGEgdW4gcmVnaXN0cm8gZW4gZWwgbW9kZWxvXG4gICAgdGhpei5wdXQgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCB2YWx1ZXMpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0J10pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLnB1dCh2YWx1ZXMpO1xuXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBFbGltaW5hIHVuIG9iamV0byBwb3Igc3Uga2V5XG4gICAgdGhpei5kZWxldGUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBrZXkpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3N0cmluZycsICdudW1iZXInXV0pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLmRlbGV0ZShrZXkpO1xuXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xuICAgIHRoaXoub3BlbkN1cnNvciA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGZpbHRlcnMsIGVhY2hDYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddLCAnZnVuY3Rpb24nXSk7XG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWRvbmx5JywgZnVuY3Rpb24gKHR4KSB7XG4gICAgICAgIHZhciBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkub3BlbkN1cnNvcigpO1xuXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgY3Vyc29yID0gcnEucmVzdWx0O1xuXG4gICAgICAgICAgLy8gTm8gbW9yZSBtYXRjaGluZyByZWNvcmRzLlxuICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGVhY2hDYihjdXJzb3IudmFsdWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgLy8gQnVzY2FyIHNpZ3VpZW50ZVxuICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIENyZWFyIGFsaWFzIHBhcmEgbG9zIGV2ZW50b3MgZW5sYXphciBjYWxsYmFja3MgYSBsb3MgZXZlbnRvc1xuICAgIHZhciBkZWZlcmVkcyA9IHZvaWQgMDtcbiAgICBPYmplY3Qua2V5cyhkZWZlcmVkcyA9IHtcbiAgICAgIG9uT3BlbjogJG9wZW5EZWZlcmVkLFxuICAgICAgb25VcGdyYWRlTmVlZGVkOiAkdXBncmFkZU5lZWRlZERlZmVyZWQsXG4gICAgICBvblNvY2tldENvbm5lY3RlZDogJHNvY2tldENvbm5lY3RlZERlZmVyZWRcbiAgICB9KS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoZnVuY3Rpb24gKGVycikge1xuICAgICAgICB2YXIgdGV4dCA9ICRkYk5hbWUgKyAnLnYnICsgKCRkYlZlcnNpb24gfHwgMSkgKyAnOiAnICsga2V5O1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgJGxvZy5lcnJvcih0ZXh0LCBlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRsb2cubG9nKHRleHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXpba2V5XSA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XG4gICAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGNiKTtcbiAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBpZGI7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYk1vZGVsU2VydmljZSAoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJRdWVyeSwgaWRiRXZlbnRzLCBsYlJlc291cmNlLCAkdGltZW91dCkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAvLyBCdXNjYXIgdW4gY2FtcG9cclxuICBjb25zdCBzZWFyY2hEZWVwRmllbGQgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgY2IpIHtcclxuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgIGNvbnN0IGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XHJcbiAgICBjb25zdCBsYXN0RmllbGQgPSBmaWVsZHMucG9wKCk7XHJcblxyXG4gICAgcmV0dXJuIChmdW5jdGlvbiBfc2V0KG9iaikge1xyXG4gICAgICBpZiAoZmllbGRzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHJldHVybiBjYihvYmosIGxhc3RGaWVsZCk7XHJcbiAgICAgIGNvbnN0IGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XHJcbiAgICAgIGlmICh0eXBlb2Ygb2JqW2ZpZWxkXSA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAgb2JqW2ZpZWxkXSA9IHt9O1xyXG4gICAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcclxuICAgIH0pKG9iaik7XHJcblxyXG4gIH07XHJcblxyXG4gIC8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xyXG4gIGNvbnN0IGdldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCkge1xyXG4gICAgcmV0dXJuIHNlYXJjaERlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXHJcbiAgY29uc3Qgc2V0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIChvYmosIGZpZWxkLCB2YWx1ZSkge1xyXG4gICAgc2VhcmNoRGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiBmdW5jdGlvbiBpZGJNb2RlbCAoJGRiLCAkbW9kZWxOYW1lLCAkc29ja2V0KSB7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtudWxsICwnc3RyaW5nJ10pO1xyXG5cclxuICAgIC8vIENsYXZlIGRlbCBtb2RlbG9cclxuICAgIGNvbnN0ICRpZCA9IHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9O1xyXG4gICAgY29uc3QgJGV2ZW50c0hhbmRsZXJzID0ge307XHJcbiAgICBjb25zdCAkaW5zdGFuY2VzID0ge307XHJcbiAgICBsZXQgJGZpZWxkcyA9IHt9O1xyXG4gICAgbGV0ICRyZW1vdGUgPSBudWxsO1xyXG4gICAgbGV0ICR2ZXJzaW9uaW5nID0gbnVsbDtcclxuXHJcbiAgICAvLyBDb25zdHVjdG9yIGRlbCBtb2RlbG9cclxuICAgIGZ1bmN0aW9uIE1vZGVsKGRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgdGhpei4kbG9hZGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXouJGxvY2FsTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXouJHJlbW90ZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICBcclxuICAgICAgdGhpei4kbG9jYWxWYWx1ZXMgPSB7fTtcclxuICAgICAgdGhpei4kcmVtb3RlVmFsdWVzID0ge307XHJcblxyXG4gICAgICB0aGl6LiR2ZXJzaW9uID0gbnVsbDtcclxuICAgICAgdGhpei4kbG9jYWxWZXJzaW9uID0gbnVsbDtcclxuICAgICAgdGhpei4kcmVtb3RlVmVyc2lvbiA9IG51bGw7XHJcblxyXG4gICAgICB0aGl6LiRldmVudHNIYW5kbGVycyA9IHt9O1xyXG4gICAgICBcclxuICAgICAgaWYgKGRhdGEpe1xyXG4gICAgICAgIHRoaXouJHNldFZhbHVlcyhkYXRhKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpei4kY29uc3RydWN0b3IoZGF0YSk7XHJcblxyXG4gICAgICBpZiAoJHNvY2tldCkge1xyXG4gICAgICAgIHRoaXouJGxpc3RlbigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCAkcmVzdWx0cyA9IFtdO1xyXG5cclxuICAgICAgdGhpelxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEN1YW5kbyBzZWEgY29uc3VsdGFkbyBhZ3JlZ2FyIGxhIGNvbnN1bHRhXHJcbiAgICAgICAgLiRiaW5kKGlkYkV2ZW50cy5NT0RFTF9RVUVSSUVELCBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAkcmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gQ3VhbmRvIHNlYSBsaWJlcmFkbyBkZSBsYSBjb25zdWx0YXIgcXVpdGFyIGRlIGxhcyBjb25zdWx0YXNcclxuICAgICAgICAuJGJpbmQoaWRiRXZlbnRzLk1PREVMX1VOUVVFUklFRCwgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgY29uc3QgaWR4ID0gJHJlc3VsdHMuaW5kZXhPZihyZXN1bHQpO1xyXG4gICAgICAgICAgaWYgKGlkeCAhPSAtMSl7XHJcbiAgICAgICAgICAgICRyZXN1bHRzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIEV2ZW50byBkZSBxdWUgbW9kZWxvIGVzdMOhIGluc3RhbmNpYWRvXHJcbiAgICAgICAgLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9JTlNUQU5DRUQpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdiBlbCBub21icmUgZGVsIG1vZGVsb1xyXG4gICAgTW9kZWwuZ2V0TW9kZWxOYW1lID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgcmV0dXJuICRtb2RlbE5hbWU7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgZWwgSUQgYWwgbW9kZWxvXHJcbiAgICBNb2RlbC5hdXRvSW5jcmVtZW50ID0gZnVuY3Rpb24gKGF1dG9JbmNyZW1lbnQpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Jvb2xlYW4nXSk7XHJcblxyXG4gICAgICAkaWQuYXV0b0luY3JlbWVudCA9IGF1dG9JbmNyZW1lbnQ7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cclxuICAgIE1vZGVsLmtleVBhdGggPSBmdW5jdGlvbiAoa2V5UGF0aCkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJ10pO1xyXG5cclxuICAgICAgJGlkLmtleVBhdGggPSBrZXlQYXRoO1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIGVsIG9iamVjdG8gc3RvcmFnZSBwYXJhIGVsIG1vZGVsby5cclxuICAgIE1vZGVsLmNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgJGRiLmNyZWF0ZVN0b3JlKCRtb2RlbE5hbWUsICRpZCk7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBpbmRleFxyXG4gICAgTW9kZWwuaW5kZXggPSBmdW5jdGlvbiAoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcclxuXHJcbiAgICAgICRkYi5jcmVhdGVJbmRleCgkbW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE3DqXRvZG8gcXVlIHBlcm1pdGUgbW9kaWZpY2FyIG1vZGVsLlxyXG4gICAgTW9kZWwuYnVpbGQgPSBmdW5jdGlvbiAoYnVpbGRDYWxsYmFjaykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICBidWlsZENhbGxiYWNrKE1vZGVsKTtcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGxhIGVzcGVjaWZpY2FjacOzbiBkZSBsb3MgY2FtcG9zXHJcbiAgICBNb2RlbC5maWVsZHMgPSBmdW5jdGlvbiAoZmllbGRzKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnXSk7XHJcblxyXG4gICAgICAkZmllbGRzID0ge307XHJcbiAgICAgICRmaWVsZHNbJGlkLmtleVBhdGhdID0ge1xyXG4gICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiLFxyXG4gICAgICAgIFwicmVxdWlyZWRcIjogdHJ1ZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgT2JqZWN0LmtleXMoZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkTmFtZSkge1xyXG4gICAgICAgIGxldCBmaWVsZCA9IGZpZWxkc1tmaWVsZE5hbWVdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZmllbGRzW2ZpZWxkTmFtZV0gPT0gJ3N0cmluZycpe1xyXG4gICAgICAgICAgZmllbGQgPSB7IFwidHlwZVwiOiBmaWVsZCB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICAkZmllbGRzW2ZpZWxkTmFtZV0gPSBmaWVsZDtcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDb25maWd1cmEgZWwgcmVtb3RlIGFwaTtcclxuICAgIE1vZGVsLnJlbW90ZSA9IGZ1bmN0aW9uICh1cmwsIGFyZ3MsIGFjdGlvbnMpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnLCAnb2JqZWN0J10pO1xyXG5cclxuICAgICAgJHJlbW90ZSA9IGxiUmVzb3VyY2UodXJsLCBhcmdzLCBhY3Rpb25zKTtcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgbGEgaW5zdGFuY2lhIGRlbCAkcmVtb3RlIGRlbCBtb2RlbG9cclxuICAgIE1vZGVsLmdldFJlbW90ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHJldHVybiAkcmVtb3RlO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgY29ycmVzcG9uZGllbnRlIGFsIGtleSBkZSB1biBvYmpldG9cclxuICAgIE1vZGVsLmdldEtleUZyb20gPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZShkYXRhLCAkaWQua2V5UGF0aCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgbW9kZWwgZGUgbGFzIGd1YXJkYWRhcy4gU2kgbm8gZXhpc3RlIGVudG9uY2VcclxuICAgIC8vIHNlIGNyZWFcclxuICAgIE1vZGVsLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ3N0cmluZycsICdudW1iZXInLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIC8vIEVsIG9iamV0byBubyB0aWVuZSBJRFxyXG4gICAgICBpZiAoIWtleSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTW9kZWwoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTm8gZXhpc3RlIGxhIGluc3RhbmNpYSBlbnRvbmNlIHNlIGNyZWFcclxuICAgICAgaWYgKCEkaW5zdGFuY2VzW2tleV0pe1xyXG4gICAgICAgICRpbnN0YW5jZXNba2V5XSA9IG5ldyBNb2RlbCgpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gJGluc3RhbmNlc1trZXldO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQnVzY2EgdW4gcmVnaXN0cm8gZW4gbGEgb2JqZWN0U3RvcmUgZGVsIG1vZGVsby5cclxuICAgIE1vZGVsLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuXHJcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gTW9kZWwuZ2V0SW5zdGFuY2Uoa2V5KTtcclxuXHJcbiAgICAgIGlmIChpbnN0YW5jZS4kbG9jYWxMb2FkZWQpIHJldHVybiBpbnN0YW5jZTtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG4gICAgICBcclxuICAgICAgaW5zdGFuY2UuJHJlc29sdmVkID0gZmFsc2U7XHJcbiAgICAgIGluc3RhbmNlLiRwcm9taXNlID0gZGVmZXJlZC5wcm9taXNlO1xyXG5cclxuICAgICAgJGRiLmdldCgkbW9kZWxOYW1lLCBrZXkpLnByb21pc2UudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIE1vZGVsLmdldFZlcnNpb25PZihrZXkpLnByb21pc2VcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLiRzZXRMb2NhbFZhbHVlcyhkYXRhLCBkYXRhICYmIHZlcnNpb24/IHZlcnNpb24uaGFzaCA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgJGxvZy5lcnJvcihbJ01vZGVsLmdldFZlcnNpb25PZiBhbnkgZXJyb3InLCBlcnJdKVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xyXG4gICAgTW9kZWwuZmluZCA9IGZ1bmN0aW9uIChmaWx0ZXJzKSB7XHJcblxyXG4gICAgICByZXR1cm4gbmV3IGlkYlF1ZXJ5KCRkYiwgTW9kZWwsIGZpbHRlcnMpOztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgbnVldmFzIGluc3RhbmNpYXMgZGUgbG9zIG1vZGVsb3NcclxuICAgIE1vZGVsLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAvLyBTaSBlcyB1biBhcnJheVxyXG4gICAgICBpZiAoZGF0YS5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnN0IHJlY29yZCA9IE1vZGVsLmdldEluc3RhbmNlKE1vZGVsLmdldEtleUZyb20oZGF0YSkpO1xyXG5cclxuICAgICAgICBpZiAocmVjb3JkLiRsb2FkZWQpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuQ2FudENyZWF0ZWRMb2FkZWRJbnN0YW5jZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlY29yZC4kcHVsbCgpO1xyXG5cclxuICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAvLyBPYnRlbmVyIHVuYSBjb3BpYSBkZWwgYXJyYXlcclxuICAgICAgY29uc3QgYXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZGF0YSk7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoY2IpO1xyXG5cclxuICAgICAgKGZ1bmN0aW9uIGl0ZXJhdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIE5vIHF1ZWRhbiBlbGVtZW50b3MgZW4gZWwgYXJyYXlcclxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PSAwKSByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcblxyXG4gICAgICAgIC8vIENyZWFyIGVsIHNpZ3VpZW50ZSBlbGVtZW50b1xyXG4gICAgICAgIE1vZGVsLmNyZWF0ZShhcnIuc2hpZnQoKSlcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIGl0ZXJhdGlvbigpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0pKCk7XHJcblxyXG4gICAgICAvLyBEZXZvbHZlciBlbCBwcm9taXNlXHJcbiAgICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSB1biBtb2RlbG8gcGFyYSBndWFyZGFyIGxhcyB2ZXJzaW9uZXMgZGVsIG1vZGVsbyBhY3R1YWxcclxuICAgIE1vZGVsLnZlcnNpb25pbmcgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBjYikge1xyXG4gICAgICBpZiAodHlwZW9mIG1vZGVsTmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGNiID0gbW9kZWxOYW1lO1xyXG4gICAgICAgIG1vZGVsTmFtZSA9IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShbbW9kZWxOYW1lLCBjYl0sIFtbJ3N0cmluZycsICd1bmRlZmluZWQnXSwgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgaWYgKCEkdmVyc2lvbmluZykge1xyXG5cclxuICAgICAgICAvLyBTaSBlbCBtb2RlbCBubyB0aWVuZSBub21icmUgc2UgYWdyZWdhXHJcbiAgICAgICAgaWYgKCFtb2RlbE5hbWUpe1xyXG4gICAgICAgICAgbW9kZWxOYW1lID0gJG1vZGVsTmFtZSsnX3ZlcnNpb25pbmcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ3JlYXIgbW9kZWxvIHBhcmEgZWwgbWFuZWpvIGRlIGRhdG9zXHJcbiAgICAgICAgJHZlcnNpb25pbmcgPSAkZGIubW9kZWwobW9kZWxOYW1lKVxyXG4gICAgICAgICAgLmF1dG9JbmNyZW1lbnQoZmFsc2UpXHJcbiAgICAgICAgICAua2V5UGF0aCgkaWQua2V5UGF0aClcclxuICAgICAgICAgIC5maWVsZHMoe1xyXG4gICAgICAgICAgICBcImhhc2hcIjogeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0sXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjYikgY2IoJHZlcnNpb25pbmcpO1xyXG5cclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgbGEgaW5zdGFuY2lhIGRlIGxhIHZlcnNpb24gbG9jYWwgZGVsIHJlZ2lzdHJvXHJcbiAgICBNb2RlbC5nZXRWZXJzaW9uT2YgPSBmdW5jdGlvbiAoa2V5KSB7IFxyXG5cclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICBpZiAoJHZlcnNpb25pbmcpIHtcclxuICAgICAgICAkdmVyc2lvbmluZy5nZXQoa2V5KS4kcHJvbWlzZVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHZlcnNpb24pIHtcclxuICAgICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKHZlcnNpb24pO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KG51bGwpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGVmZXJlZC5yZXNvbHZlKG51bGwpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBtYW5kZWphZG9yIGRlIGV2ZW50b3MgYWwgbW9kZWxvXHJcbiAgICBNb2RlbC5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgaWYgKCEkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSkge1xyXG4gICAgICAgICRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdID0gW107XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XHJcblxyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEaXNwYXJhIHVuIGV2ZW50byBkZWwgbW9kZWxcclxuICAgIE1vZGVsLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3VuZGVmaW5lZCcsICdhcnJheSddXSk7XHJcblxyXG4gICAgICBpZiAoJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5tYXAoZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgICBjYi5hcHBseShNb2RlbCwgYXJncyB8fCBbXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcclxuICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0ID0gZnVuY3Rpb24gKGZpZWxkKSB7XHJcblxyXG4gICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgaW4gdmFsb3IgYSB1biBjYW1wb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRzZXQgPSBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XHJcblxyXG4gICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCwgdmFsdWUpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgdW4gb2JqZXRvIGNvbiBsYXMgcHJvcGllZGFkZXMgZGVsIHJlZ2lzdHJvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGdldFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICBjb25zdCB2YWx1ZXMgPSB7fTtcclxuICAgICAgZGF0YSA9IGRhdGEgfHwgdGhpcztcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKCRmaWVsZHMpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICBzZXRGaWVsZFZhbHVlKHZhbHVlcywgZmllbGQsIGdldEZpZWxkVmFsdWUoZGF0YSwgZmllbGQpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gdmFsdWVzO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgdW4gb2JqZXRvIGNvbiBsYXMgcHJvcGllZGFkZXMgbG9jYWxlcyBkZWwgcmVnaXN0cm9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0TG9jYWxWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy4kZ2V0VmFsdWVzKHRoaXMuJGxvY2FsVmFsdWVzKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIHVuIG1vZGVsbyBjb24gbGFzIHByb3BpZWRhZGVzIHJlbW90YXMgZGVsIHJlZ2lzdHJvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGdldFJlbW90ZVZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kcmVtb3RlVmFsdWVzKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBsYXMgcHJvcGllZGFkZXMgZGVsIHJlZ2lzdHJvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJHNldFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhLCB2ZXJzaW9uKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcclxuICAgICAgXHJcbiAgICAgIHRoaXouJHZlcnNpb24gPSB2ZXJzaW9uO1xyXG5cclxuICAgICAgT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICAgIHNldEZpZWxkVmFsdWUodGhpeiwgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGl6LiRsb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIGxvY2FsZXMgZGVsIHJlZ2lzdHJvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJHNldExvY2FsVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xyXG4gICAgICBcclxuICAgICAgdGhpei4kbG9jYWxWZXJzaW9uID0gdmVyc2lvbjtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJGxvY2FsVmFsdWVzLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgdGhpei4kbG9jYWxMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICghdGhpei4kbG9hZGVkKSB7XHJcbiAgICAgICAgICB0aGl6LiRzZXRWYWx1ZXMoZGF0YSwgdmVyc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIHJlbW90YXMgZGVsIHJlZ2lzdHJvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJHNldFJlbW90ZVZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhLCB2ZXJzaW9uKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcclxuICAgICAgXHJcbiAgICAgIHRoaXouJHJlbW90ZVZlcnNpb24gPSB2ZXJzaW9uO1xyXG5cclxuICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICAgIHNldEZpZWxkVmFsdWUodGhpei4kcmVtb3RlVmFsdWVzLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgdGhpei4kcmVtb3RlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICBpZiAoIXRoaXouJGxvYWRlZCkge1xyXG4gICAgICAgICAgdGhpei4kc2V0VmFsdWVzKGRhdGEsIHZlcnNpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgZWwgSUQgZGVsIG9iamV0b1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRzZXRLZXkgPSBmdW5jdGlvbiAobmV3S2V5KSB7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCBvbGRLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKHRoaXMpO1xyXG5cclxuICAgICAgTW9kZWwuc2VhcmNoRGVlcEZpZWxkKHRoaXMsICRpZC5rZXlQYXRoLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IG5ld0tleTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAob2xkS2V5ICE9PSBuZXdLZXkpIHtcclxuXHJcbiAgICAgICAgaWYgKG9sZEtleSAmJiAkaW5zdGFuY2VzW29sZEtleV0gJiYgJGluc3RhbmNlc1tvbGRLZXldICE9IHRoaXMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk9sZEtleUlzTm90U2FtZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV3S2V5ICYmICRpbnN0YW5jZXNbbmV3S2V5XSAmJiAkaW5zdGFuY2VzW25ld0tleV0gIT0gdGhpcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5JbnN0YW5jZU9mTmV3S2V5SXNOb3RTYW1lJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFbGltaW5hciBhbnRlcmlvclxyXG4gICAgICAgIGlmIChvbGRLZXkgJiYgJGluc3RhbmNlc1tvbGRLZXldKSB7XHJcbiAgICAgICAgICBkZWxldGUgJGluc3RhbmNlc1tvbGRLZXldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWdyZWdhciBudWV2YVxyXG4gICAgICAgIGlmIChuZXdLZXkgJiYgISRpbnN0YW5jZXNbbmV3S2V5XSkge1xyXG4gICAgICAgICAgJGluc3RhbmNlc1tuZXdLZXldID0gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29uc3R1cmN0b3IgcXVlIHNlIHB1ZWRlIHNvYnJlIGVzY3JpYmlyXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIH07XHJcblxyXG4gICAgLy8gR3VhcmRhIGxvcyBkYXRvcyBkZWwgb2JqZXRvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJHB1bGwgPSBmdW5jdGlvbiAobmV3VmFsdWVzLCB2ZXJzaW9uKXsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xyXG4gICAgICBcclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICBpZiAobmV3VmFsdWVzKSB7XHJcbiAgICAgICAgbmV3VmFsdWVzID0gdGhpei4kZ2V0VmFsdWVzKG5ld1ZhbHVlcyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV3VmFsdWVzID0gdGhpei4kZ2V0UmVtb3RlVmFsdWVzKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG5ld0tleSA9IE1vZGVsLmdldEtleUZyb20obmV3VmFsdWVzKTtcclxuICAgICAgY29uc3Qgb2xkVmFsdWVzID0gdGhpei4kZ2V0TG9jYWxWYWx1ZXMoKTtcclxuICAgICAgY29uc3Qgb2xkS2V5ID0gTW9kZWwuZ2V0S2V5RnJvbShvbGRWYWx1ZXMpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2cobmV3S2V5LCBvbGRLZXkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhuZXdWYWx1ZXMsIG9sZFZhbHVlcyk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEZ1bmNpb24gcXVlIGhhY2UgZXNjdWNoYXJzIGxvcyBtZW5zYWplcyBkZWwgc29ja2V0IHBhcmEgZWwgbW9kZWxcclxuICAgIE1vZGVsLnByb3RvdHlwZS4kbGlzdGVuID0gZnVuY3Rpb24gKCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWYgKCEkc29ja2V0KSB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkRvZXNOb3RIYXZlU29ja2V0SW5zdGFuY2UnKTtcclxuXHJcbiAgICAgIC8vIENyZWFyIHVuYSBzdWJzY3JpcGNpb24gYWwgc29ja2V0IHBhcmEgY3VhbmRvIHNlIHJlY2liYW4gZGF0b3NcclxuICAgICAgLy8gcGFyYSBsYSBpbnN0YW5jaWEgYWN0dWFsXHJcbiAgICAgICRzb2NrZXQuc3Vic2NyaWJlKHtcclxuICAgICAgICBtb2RlbE5hbWU6ICRtb2RlbE5hbWUsXHJcbiAgICAgICAgZXZlbnROYW1lOiAndXBkYXRlJyxcclxuICAgICAgICBtb2RlbElkOiB0aGl6LiRnZXQoJGlkLmtleVBhdGgpLFxyXG4gICAgICB9LCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAvLyBBIHJlY2liaXIgZGF0b3MgZGVsIHNvY2tldCBhc2lnbmFyIGxvcyB2YWxvcmVzXHJcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgLy8gRW1pdGlyIGV2ZW50byBkZSBkYXRvcyByZWNpYmlkb3IgcGFyYSBlbCBtb2RlbG9cclxuICAgICAgICAgIHRoaXouJHNldFJlbW90ZVZhbHVlcyhkYXRhLnZhbHVlcywgZGF0YS52ZXJzaW9uKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQWdyZWdhIHVuIG1hbmRlamFkb3IgZGUgZXZlbnRvc1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRiaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgdGhpcy4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGVtaXQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnYXJyYXknXV0pO1xyXG5cclxuICAgICAgLy8gTGxhbWFyIGVsIGV2ZW50byBwYXJhIGVsIG1vZGVsb1xyXG4gICAgICBNb2RlbC5lbWl0KGV2ZW50TmFtZSwgW3RoaXosIFtdLmNvbmNhdChbdGhpel0pLmNvbmNhdChhcmdzKV0pO1xyXG5cclxuICAgICAgaWYgKHRoaXouJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICB0aGl6LiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLm1hcChmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAgIGNiLmFwcGx5KHRoaXosIGFyZ3MgfHwgW10pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIE1vZGVsLiRpbnN0YW5jZXMgPSAkaW5zdGFuY2VzO1xyXG5cclxuICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgfTtcclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiTW9kZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYk1vZGVsU2VydmljZTtcbmZ1bmN0aW9uIGlkYk1vZGVsU2VydmljZSgkbG9nLCBxcywgaWRiVXRpbHMsIGlkYlF1ZXJ5LCBpZGJFdmVudHMsIGxiUmVzb3VyY2UsICR0aW1lb3V0KSB7XG4gICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAvLyBCdXNjYXIgdW4gY2FtcG9cblxuICAgICAgdmFyIHNlYXJjaERlZXBGaWVsZCA9IGZ1bmN0aW9uIHNlYXJjaERlZXBGaWVsZChvYmosIGZpZWxkLCBjYikge1xuICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgICAgICAgIHZhciBmaWVsZHMgPSBmaWVsZC5zcGxpdCgnLicpO1xuICAgICAgICAgICAgdmFyIGxhc3RGaWVsZCA9IGZpZWxkcy5wb3AoKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIF9zZXQob2JqKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoZmllbGRzLmxlbmd0aCA9PSAwKSByZXR1cm4gY2Iob2JqLCBsYXN0RmllbGQpO1xuICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtmaWVsZF0gPT09ICd1bmRlZmluZWQnKSBvYmpbZmllbGRdID0ge307XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcbiAgICAgICAgICAgIH0ob2JqKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xuICAgICAgdmFyIGdldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiBnZXRGaWVsZFZhbHVlKG9iaiwgZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWFyY2hEZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XG4gICAgICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIC8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xuICAgICAgdmFyIHNldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiBzZXRGaWVsZFZhbHVlKG9iaiwgZmllbGQsIHZhbHVlKSB7XG4gICAgICAgICAgICBzZWFyY2hEZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlkYk1vZGVsKCRkYiwgJG1vZGVsTmFtZSwgJHNvY2tldCkge1xuICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbbnVsbCwgJ3N0cmluZyddKTtcblxuICAgICAgICAgICAgLy8gQ2xhdmUgZGVsIG1vZGVsb1xuICAgICAgICAgICAgdmFyICRpZCA9IHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9O1xuICAgICAgICAgICAgdmFyICRldmVudHNIYW5kbGVycyA9IHt9O1xuICAgICAgICAgICAgdmFyICRpbnN0YW5jZXMgPSB7fTtcbiAgICAgICAgICAgIHZhciAkZmllbGRzID0ge307XG4gICAgICAgICAgICB2YXIgJHJlbW90ZSA9IG51bGw7XG4gICAgICAgICAgICB2YXIgJHZlcnNpb25pbmcgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBDb25zdHVjdG9yIGRlbCBtb2RlbG9cbiAgICAgICAgICAgIGZ1bmN0aW9uIE1vZGVsKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXouJHJlc29sdmVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXouJGxvYWRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhpei4kbG9jYWxMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHRoaXouJHJlbW90ZUxvYWRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRsb2NhbFZhbHVlcyA9IHt9O1xuICAgICAgICAgICAgICAgICAgdGhpei4kcmVtb3RlVmFsdWVzID0ge307XG5cbiAgICAgICAgICAgICAgICAgIHRoaXouJHZlcnNpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgdGhpei4kbG9jYWxWZXJzaW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgIHRoaXouJHJlbW90ZVZlcnNpb24gPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRldmVudHNIYW5kbGVycyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpei4kc2V0VmFsdWVzKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRjb25zdHJ1Y3RvcihkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCRzb2NrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXouJGxpc3RlbigpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICB2YXIgJHJlc3VsdHMgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgdGhpelxuXG4gICAgICAgICAgICAgICAgICAvLyBDdWFuZG8gc2VhIGNvbnN1bHRhZG8gYWdyZWdhciBsYSBjb25zdWx0YVxuICAgICAgICAgICAgICAgICAgLiRiaW5kKGlkYkV2ZW50cy5NT0RFTF9RVUVSSUVELCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAvLyBDdWFuZG8gc2VhIGxpYmVyYWRvIGRlIGxhIGNvbnN1bHRhciBxdWl0YXIgZGUgbGFzIGNvbnN1bHRhc1xuICAgICAgICAgICAgICAgICAgLiRiaW5kKGlkYkV2ZW50cy5NT0RFTF9VTlFVRVJJRUQsIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZHggPSAkcmVzdWx0cy5pbmRleE9mKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcmVzdWx0cy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgIC8vIEV2ZW50byBkZSBxdWUgbW9kZWxvIGVzdMOhIGluc3RhbmNpYWRvXG4gICAgICAgICAgICAgICAgICAuJGVtaXQoaWRiRXZlbnRzLk1PREVMX0lOU1RBTkNFRCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEZXZ1ZWx2IGVsIG5vbWJyZSBkZWwgbW9kZWxvXG4gICAgICAgICAgICBNb2RlbC5nZXRNb2RlbE5hbWUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiAkbW9kZWxOYW1lO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xuICAgICAgICAgICAgTW9kZWwuYXV0b0luY3JlbWVudCA9IGZ1bmN0aW9uIChhdXRvSW5jcmVtZW50KSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnYm9vbGVhbiddKTtcblxuICAgICAgICAgICAgICAgICAgJGlkLmF1dG9JbmNyZW1lbnQgPSBhdXRvSW5jcmVtZW50O1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xuICAgICAgICAgICAgTW9kZWwua2V5UGF0aCA9IGZ1bmN0aW9uIChrZXlQYXRoKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJ10pO1xuXG4gICAgICAgICAgICAgICAgICAkaWQua2V5UGF0aCA9IGtleVBhdGg7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDcmVhIGVsIG9iamVjdG8gc3RvcmFnZSBwYXJhIGVsIG1vZGVsby5cbiAgICAgICAgICAgIE1vZGVsLmNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAkZGIuY3JlYXRlU3RvcmUoJG1vZGVsTmFtZSwgJGlkKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBNb2RlbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFncmVnYSB1biBpbmRleFxuICAgICAgICAgICAgTW9kZWwuaW5kZXggPSBmdW5jdGlvbiAoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcblxuICAgICAgICAgICAgICAgICAgJGRiLmNyZWF0ZUluZGV4KCRtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBNb2RlbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIE3DqXRvZG8gcXVlIHBlcm1pdGUgbW9kaWZpY2FyIG1vZGVsLlxuICAgICAgICAgICAgTW9kZWwuYnVpbGQgPSBmdW5jdGlvbiAoYnVpbGRDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICAgICAgICAgICAgICBidWlsZENhbGxiYWNrKE1vZGVsKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBNb2RlbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBsYSBlc3BlY2lmaWNhY2nDs24gZGUgbG9zIGNhbXBvc1xuICAgICAgICAgICAgTW9kZWwuZmllbGRzID0gZnVuY3Rpb24gKGZpZWxkcykge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcblxuICAgICAgICAgICAgICAgICAgJGZpZWxkcyA9IHt9O1xuICAgICAgICAgICAgICAgICAgJGZpZWxkc1skaWQua2V5UGF0aF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gZmllbGRzW2ZpZWxkTmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkc1tmaWVsZE5hbWVdID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZCA9IHsgXCJ0eXBlXCI6IGZpZWxkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAkZmllbGRzW2ZpZWxkTmFtZV0gPSBmaWVsZDtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDb25maWd1cmEgZWwgcmVtb3RlIGFwaTtcbiAgICAgICAgICAgIE1vZGVsLnJlbW90ZSA9IGZ1bmN0aW9uICh1cmwsIGFyZ3MsIGFjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0JywgJ29iamVjdCddKTtcblxuICAgICAgICAgICAgICAgICAgJHJlbW90ZSA9IGxiUmVzb3VyY2UodXJsLCBhcmdzLCBhY3Rpb25zKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBNb2RlbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgJHJlbW90ZSBkZWwgbW9kZWxvXG4gICAgICAgICAgICBNb2RlbC5nZXRSZW1vdGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiAkcmVtb3RlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgY29ycmVzcG9uZGllbnRlIGFsIGtleSBkZSB1biBvYmpldG9cbiAgICAgICAgICAgIE1vZGVsLmdldEtleUZyb20gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUoZGF0YSwgJGlkLmtleVBhdGgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgbGEgaW5zdGFuY2lhIGRlbCBtb2RlbCBkZSBsYXMgZ3VhcmRhZGFzLiBTaSBubyBleGlzdGUgZW50b25jZVxuICAgICAgICAgICAgLy8gc2UgY3JlYVxuICAgICAgICAgICAgTW9kZWwuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ3N0cmluZycsICdudW1iZXInLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgLy8gRWwgb2JqZXRvIG5vIHRpZW5lIElEXG4gICAgICAgICAgICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNb2RlbCgpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAvLyBObyBleGlzdGUgbGEgaW5zdGFuY2lhIGVudG9uY2Ugc2UgY3JlYVxuICAgICAgICAgICAgICAgICAgaWYgKCEkaW5zdGFuY2VzW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnN0YW5jZXNba2V5XSA9IG5ldyBNb2RlbCgpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gJGluc3RhbmNlc1trZXldO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQnVzY2EgdW4gcmVnaXN0cm8gZW4gbGEgb2JqZWN0U3RvcmUgZGVsIG1vZGVsby5cbiAgICAgICAgICAgIE1vZGVsLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcblxuICAgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gTW9kZWwuZ2V0SW5zdGFuY2Uoa2V5KTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLiRsb2NhbExvYWRlZCkgcmV0dXJuIGluc3RhbmNlO1xuXG4gICAgICAgICAgICAgICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgICAgICAgICAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuJHByb21pc2UgPSBkZWZlcmVkLnByb21pc2U7XG5cbiAgICAgICAgICAgICAgICAgICRkYi5nZXQoJG1vZGVsTmFtZSwga2V5KS5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZGVsLmdldFZlcnNpb25PZihrZXkpLnByb21pc2UudGhlbihmdW5jdGlvbiAodmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuJHNldExvY2FsVmFsdWVzKGRhdGEsIGRhdGEgJiYgdmVyc2lvbiA/IHZlcnNpb24uaGFzaCA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsb2cuZXJyb3IoWydNb2RlbC5nZXRWZXJzaW9uT2YgYW55IGVycm9yJywgZXJyXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xuICAgICAgICAgICAgTW9kZWwuZmluZCA9IGZ1bmN0aW9uIChmaWx0ZXJzKSB7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgaWRiUXVlcnkoJGRiLCBNb2RlbCwgZmlsdGVycyk7O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQ3JlYSBudWV2YXMgaW5zdGFuY2lhcyBkZSBsb3MgbW9kZWxvc1xuICAgICAgICAgICAgTW9kZWwuY3JlYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIC8vIFNpIGVzIHVuIGFycmF5XG4gICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IE1vZGVsLmdldEluc3RhbmNlKE1vZGVsLmdldEtleUZyb20oZGF0YSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVjb3JkLiRsb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuQ2FudENyZWF0ZWRMb2FkZWRJbnN0YW5jZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVjb3JkLiRwdWxsKCk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIC8vIE9idGVuZXIgdW5hIGNvcGlhIGRlbCBhcnJheVxuICAgICAgICAgICAgICAgICAgdmFyIGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XG5cbiAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiBpdGVyYXRpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vIHF1ZWRhbiBlbGVtZW50b3MgZW4gZWwgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcnIubGVuZ3RoID09IDApIHJldHVybiBkZWZlcmVkLnJlc29sdmUocmVzdWx0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXIgZWwgc2lndWllbnRlIGVsZW1lbnRvXG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RlbC5jcmVhdGUoYXJyLnNoaWZ0KCkpLnRoZW4oZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0pKCk7XG5cbiAgICAgICAgICAgICAgICAgIC8vIERldm9sdmVyIGVsIHByb21pc2VcbiAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQ3JlYSB1biBtb2RlbG8gcGFyYSBndWFyZGFyIGxhcyB2ZXJzaW9uZXMgZGVsIG1vZGVsbyBhY3R1YWxcbiAgICAgICAgICAgIE1vZGVsLnZlcnNpb25pbmcgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBjYikge1xuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtb2RlbE5hbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiID0gbW9kZWxOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxOYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoW21vZGVsTmFtZSwgY2JdLCBbWydzdHJpbmcnLCAndW5kZWZpbmVkJ10sIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCEkdmVyc2lvbmluZykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTaSBlbCBtb2RlbCBubyB0aWVuZSBub21icmUgc2UgYWdyZWdhXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1vZGVsTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxOYW1lID0gJG1vZGVsTmFtZSArICdfdmVyc2lvbmluZyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWFyIG1vZGVsbyBwYXJhIGVsIG1hbmVqbyBkZSBkYXRvc1xuICAgICAgICAgICAgICAgICAgICAgICAgJHZlcnNpb25pbmcgPSAkZGIubW9kZWwobW9kZWxOYW1lKS5hdXRvSW5jcmVtZW50KGZhbHNlKS5rZXlQYXRoKCRpZC5rZXlQYXRoKS5maWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoYXNoXCI6IHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYgKGNiKSBjYigkdmVyc2lvbmluZyk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBNb2RlbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZSBsYSB2ZXJzaW9uIGxvY2FsIGRlbCByZWdpc3Ryb1xuICAgICAgICAgICAgTW9kZWwuZ2V0VmVyc2lvbk9mID0gZnVuY3Rpb24gKGtleSkge1xuXG4gICAgICAgICAgICAgICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICgkdmVyc2lvbmluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHZlcnNpb25pbmcuZ2V0KGtleSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAodmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKHZlcnNpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJlZC5yZWplY3QobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcmVkLnJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQWdyZWdhIHVuIG1hbmRlamFkb3IgZGUgZXZlbnRvcyBhbCBtb2RlbG9cbiAgICAgICAgICAgIE1vZGVsLmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoISRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEaXNwYXJhIHVuIGV2ZW50byBkZWwgbW9kZWxcbiAgICAgICAgICAgIE1vZGVsLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnYXJyYXknXV0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLm1hcChmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiLmFwcGx5KE1vZGVsLCBhcmdzIHx8IFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJGdldCA9IGZ1bmN0aW9uIChmaWVsZCkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBc2lnbmEgaW4gdmFsb3IgYSB1biBjYW1wb1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRzZXQgPSBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKHRoaXMsIGZpZWxkLCB2YWx1ZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEZXZ1ZWx2ZSB1biBvYmpldG8gY29uIGxhcyBwcm9waWVkYWRlcyBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0VmFsdWVzID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhIHx8IHRoaXM7XG5cbiAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKCRmaWVsZHMpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEZpZWxkVmFsdWUodmFsdWVzLCBmaWVsZCwgZ2V0RmllbGRWYWx1ZShkYXRhLCBmaWVsZCkpO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEZXZ1ZWx2ZSB1biBvYmpldG8gY29uIGxhcyBwcm9waWVkYWRlcyBsb2NhbGVzIGRlbCByZWdpc3Ryb1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRnZXRMb2NhbFZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGdldFZhbHVlcyh0aGlzLiRsb2NhbFZhbHVlcyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEZXZ1ZWx2ZSB1biBtb2RlbG8gY29uIGxhcyBwcm9waWVkYWRlcyByZW1vdGFzIGRlbCByZWdpc3Ryb1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRnZXRSZW1vdGVWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kcmVtb3RlVmFsdWVzKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBsYXMgcHJvcGllZGFkZXMgZGVsIHJlZ2lzdHJvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJHNldFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhLCB2ZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgdGhpei4kdmVyc2lvbiA9IHZlcnNpb247XG5cbiAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEZpZWxkVmFsdWUodGhpeiwgZmllbGQsIGRhdGFbZmllbGRdKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRsb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBsYXMgcHJvcGllZGFkZXMgbG9jYWxlcyBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0TG9jYWxWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSwgdmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXouJGxvY2FsVmVyc2lvbiA9IHZlcnNpb247XG5cbiAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEZpZWxkVmFsdWUodGhpei4kbG9jYWxWYWx1ZXMsIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXouJGxvY2FsTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpei4kbG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGl6LiRzZXRWYWx1ZXMoZGF0YSwgdmVyc2lvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQXNpZ25hIGxhcyBwcm9waWVkYWRlcyByZW1vdGFzIGRlbCByZWdpc3Ryb1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRzZXRSZW1vdGVWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSwgdmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXouJHJlbW90ZVZlcnNpb24gPSB2ZXJzaW9uO1xuXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJHJlbW90ZVZhbHVlcywgZmllbGQsIGRhdGFbZmllbGRdKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpei4kcmVtb3RlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpei4kbG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGl6LiRzZXRWYWx1ZXMoZGF0YSwgdmVyc2lvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQXNpZ25hIGVsIElEIGRlbCBvYmpldG9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0S2V5ID0gZnVuY3Rpb24gKG5ld0tleSkge1xuXG4gICAgICAgICAgICAgICAgICB2YXIgb2xkS2V5ID0gTW9kZWwuZ2V0S2V5RnJvbSh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgTW9kZWwuc2VhcmNoRGVlcEZpZWxkKHRoaXMsICRpZC5rZXlQYXRoLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ialtsYXN0RmllbGRdID0gbmV3S2V5O1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChvbGRLZXkgIT09IG5ld0tleSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkS2V5ICYmICRpbnN0YW5jZXNbb2xkS2V5XSAmJiAkaW5zdGFuY2VzW29sZEtleV0gIT0gdGhpcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5JbnN0YW5jZU9mT2xkS2V5SXNOb3RTYW1lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3S2V5ICYmICRpbnN0YW5jZXNbbmV3S2V5XSAmJiAkaW5zdGFuY2VzW25ld0tleV0gIT0gdGhpcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5JbnN0YW5jZU9mTmV3S2V5SXNOb3RTYW1lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVsaW1pbmFyIGFudGVyaW9yXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkS2V5ICYmICRpbnN0YW5jZXNbb2xkS2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlICRpbnN0YW5jZXNbb2xkS2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWdyZWdhciBudWV2YVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0tleSAmJiAhJGluc3RhbmNlc1tuZXdLZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5zdGFuY2VzW25ld0tleV0gPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIENvbnN0dXJjdG9yIHF1ZSBzZSBwdWVkZSBzb2JyZSBlc2NyaWJpclxuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7fTtcblxuICAgICAgICAgICAgLy8gR3VhcmRhIGxvcyBkYXRvcyBkZWwgb2JqZXRvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJHB1bGwgPSBmdW5jdGlvbiAobmV3VmFsdWVzLCB2ZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZXMgPSB0aGl6LiRnZXRWYWx1ZXMobmV3VmFsdWVzKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZXMgPSB0aGl6LiRnZXRSZW1vdGVWYWx1ZXMoKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgdmFyIG5ld0tleSA9IE1vZGVsLmdldEtleUZyb20obmV3VmFsdWVzKTtcbiAgICAgICAgICAgICAgICAgIHZhciBvbGRWYWx1ZXMgPSB0aGl6LiRnZXRMb2NhbFZhbHVlcygpO1xuICAgICAgICAgICAgICAgICAgdmFyIG9sZEtleSA9IE1vZGVsLmdldEtleUZyb20ob2xkVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobmV3S2V5LCBvbGRLZXkpO1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobmV3VmFsdWVzLCBvbGRWYWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEZ1bmNpb24gcXVlIGhhY2UgZXNjdWNoYXJzIGxvcyBtZW5zYWplcyBkZWwgc29ja2V0IHBhcmEgZWwgbW9kZWxcbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kbGlzdGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgaWYgKCEkc29ja2V0KSB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkRvZXNOb3RIYXZlU29ja2V0SW5zdGFuY2UnKTtcblxuICAgICAgICAgICAgICAgICAgLy8gQ3JlYXIgdW5hIHN1YnNjcmlwY2lvbiBhbCBzb2NrZXQgcGFyYSBjdWFuZG8gc2UgcmVjaWJhbiBkYXRvc1xuICAgICAgICAgICAgICAgICAgLy8gcGFyYSBsYSBpbnN0YW5jaWEgYWN0dWFsXG4gICAgICAgICAgICAgICAgICAkc29ja2V0LnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbE5hbWU6ICRtb2RlbE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6ICd1cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxJZDogdGhpei4kZ2V0KCRpZC5rZXlQYXRoKVxuICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQSByZWNpYmlyIGRhdG9zIGRlbCBzb2NrZXQgYXNpZ25hciBsb3MgdmFsb3Jlc1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRW1pdGlyIGV2ZW50byBkZSBkYXRvcyByZWNpYmlkb3IgcGFyYSBlbCBtb2RlbG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXouJHNldFJlbW90ZVZhbHVlcyhkYXRhLnZhbHVlcywgZGF0YS52ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBZ3JlZ2EgdW4gbWFuZGVqYWRvciBkZSBldmVudG9zXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJGJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgdGhpcy4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJGVtaXQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnYXJyYXknXV0pO1xuXG4gICAgICAgICAgICAgICAgICAvLyBMbGFtYXIgZWwgZXZlbnRvIHBhcmEgZWwgbW9kZWxvXG4gICAgICAgICAgICAgICAgICBNb2RlbC5lbWl0KGV2ZW50TmFtZSwgW3RoaXosIFtdLmNvbmNhdChbdGhpel0pLmNvbmNhdChhcmdzKV0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAodGhpei4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpei4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5tYXAoZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYi5hcHBseSh0aGl6LCBhcmdzIHx8IFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIE1vZGVsLiRpbnN0YW5jZXMgPSAkaW5zdGFuY2VzO1xuXG4gICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICB9O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYlF1ZXJ5ICgkbG9nLCBxcywgaWRiVXRpbHMsIGlkYkV2ZW50cykgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIHJldHVybiBmdW5jdGlvbiBpZGJRdWVyeSgkZGIsICRNb2RlbCwgJGZpbHRlcnMpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgJ2Z1bmN0aW9uJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICBsZXQgJHJlc3VsdCA9IG51bGw7XHJcblxyXG4gICAgLy8gRnVuY2lvbiBxdWUgZGV2dWVsdmUgZWplY3V0YSBlbCBxdWVyeSB5IGRldnVlbHZlIGVsIHJlc3VsdGFkby5cclxuICAgIHRoaXouZ2V0UmVzdWx0ID0gZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAvLyBFamVjdXRhciBzaSBubyBzZSBoYSBlamVjdXRhZG9cclxuICAgICAgaWYgKCEkcmVzdWx0KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcbiAgICAgICAgJHJlc3VsdCA9IFtdO1xyXG4gICAgICAgICRyZXN1bHQuJHJlc29sdmVkID0gZmFsc2U7XHJcbiAgICAgICAgJHJlc3VsdC4kcHJvbWlzZSA9IGRlZmVyZWQucHJvbWlzZTtcclxuXHJcbiAgICAgICAgJGRiLm9wZW5DdXJzb3IoJE1vZGVsLmdldE1vZGVsTmFtZSgpLCAkZmlsdGVycywgZnVuY3Rpb24gKGRhdGEsIG5leHQpIHtcclxuXHJcbiAgICAgICAgICBjb25zdCBrZXkgPSAkTW9kZWwuZ2V0S2V5RnJvbShkYXRhKTtcclxuXHJcbiAgICAgICAgICAvLyBPYnRlbmVyIGxhIGluc3RhbmNpYVxyXG4gICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSAkTW9kZWwuZ2V0SW5zdGFuY2Uoa2V5KTtcclxuXHJcbiAgICAgICAgICBpZiAoaW5zdGFuY2UuJGxvY2FsTG9hZGVkKSByZXR1cm4gbmV4dCgpO1xyXG5cclxuICAgICAgICAgICRNb2RlbC5nZXRWZXJzaW9uT2Yoa2V5KS5wcm9taXNlXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgIGluc3RhbmNlLiRzZXRMb2NhbFZhbHVlcyhkYXRhLCBkYXRhICYmIHZlcnNpb24/IHZlcnNpb24uaGFzaCA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgaW5zdGFuY2UuJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICBpbnN0YW5jZS4kZW1pdChpZGJFdmVudHMuTU9ERUxfUVVFUklFRCwgWyRyZXN1bHRdKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gQWdyZWdhciBhbCByZXN1bHRhZG9cclxuICAgICAgICAgICAgICAkcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAvLyBCdXNjYXIgc2lndWllbnRlXHJcbiAgICAgICAgICAgICAgbmV4dCgpO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuXHJcbiAgICAgICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAkbG9nLmVycm9yKFsnTW9kZWwuZ2V0VmVyc2lvbk9mIGFueSBlcnJvcicsIGVycl0pXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSkucHJvbWlzZVxyXG5cclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgJHJlc3VsdC4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKCRyZXN1bHQpO1xyXG4gICAgICAgICAgdGhpei5nZXRSZW1vdGVSZXN1bHQoKTtcclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuXHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAkcmVzdWx0O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gT2J0aWVuZSBlbCByZXN1bHRhZG8gZGUgdmFsb3JlcyByZW1vdG9zXHJcbiAgICB0aGl6LmdldFJlbW90ZVJlc3VsdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGxldCAkcmVtb3RlID0gJE1vZGVsLmdldFJlbW90ZSgpO1xyXG4gICAgICBsZXQgJHJlbW90ZVJlc3VsdCA9IG51bGw7XHJcblxyXG4gICAgICBpZiAoJHJlbW90ZSAmJiB0eXBlb2YgJHJlbW90ZS5maW5kID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAoJHJlbW90ZVJlc3VsdCA9ICRyZW1vdGUuZmluZCgkZmlsdGVycykuJHByb21pc2UpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5tYXAoZnVuY3Rpb24gKHJlY29yZCwgaSkge1xyXG4gICAgICAgICAgICAgICRNb2RlbC5nZXQoJE1vZGVsLmdldEtleUZyb20ocmVjb3JkLnZhbHVlcykpLiRwcm9taXNlXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoJHJlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAkcmVjb3JkLiRzZXRSZW1vdGVWYWx1ZXMocmVjb3JkLnZhbHVlcywgcmVjb3JkLnZlcnNpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKCRyZXN1bHRbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHJlc3VsdFtpXSAhPT0gJHJlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdFtpXS4kZW1pdChpZGJFdmVudHMuTU9ERUxfVU5RVUVSSUVELCBbJHJlc3VsdF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkcmVzdWx0W2ldID0gJHJlY29yZDtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkcmVzdWx0LnB1c2goJHJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICRyZWNvcmQuJGVtaXQoaWRiRXZlbnRzLk1PREVMX1FVRVJJRUQsIFskcmVzdWx0XSk7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAkcmVtb3RlUmVzdWx0O1xyXG5cclxuICAgIH07XHJcblxyXG4gIH1cclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJRdWVyeTtcbmZ1bmN0aW9uIGlkYlF1ZXJ5KCRsb2csIHFzLCBpZGJVdGlscywgaWRiRXZlbnRzKSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGlkYlF1ZXJ5KCRkYiwgJE1vZGVsLCAkZmlsdGVycykge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgJ2Z1bmN0aW9uJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgIHZhciAkcmVzdWx0ID0gbnVsbDtcblxuICAgIC8vIEZ1bmNpb24gcXVlIGRldnVlbHZlIGVqZWN1dGEgZWwgcXVlcnkgeSBkZXZ1ZWx2ZSBlbCByZXN1bHRhZG8uXG4gICAgdGhpei5nZXRSZXN1bHQgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgLy8gRWplY3V0YXIgc2kgbm8gc2UgaGEgZWplY3V0YWRvXG4gICAgICBpZiAoISRyZXN1bHQpIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcbiAgICAgICAgICAkcmVzdWx0ID0gW107XG4gICAgICAgICAgJHJlc3VsdC4kcmVzb2x2ZWQgPSBmYWxzZTtcbiAgICAgICAgICAkcmVzdWx0LiRwcm9taXNlID0gZGVmZXJlZC5wcm9taXNlO1xuXG4gICAgICAgICAgJGRiLm9wZW5DdXJzb3IoJE1vZGVsLmdldE1vZGVsTmFtZSgpLCAkZmlsdGVycywgZnVuY3Rpb24gKGRhdGEsIG5leHQpIHtcblxuICAgICAgICAgICAgdmFyIGtleSA9ICRNb2RlbC5nZXRLZXlGcm9tKGRhdGEpO1xuXG4gICAgICAgICAgICAvLyBPYnRlbmVyIGxhIGluc3RhbmNpYVxuICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gJE1vZGVsLmdldEluc3RhbmNlKGtleSk7XG5cbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS4kbG9jYWxMb2FkZWQpIHJldHVybiBuZXh0KCk7XG5cbiAgICAgICAgICAgICRNb2RlbC5nZXRWZXJzaW9uT2Yoa2V5KS5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKHZlcnNpb24pIHtcblxuICAgICAgICAgICAgICBpbnN0YW5jZS4kc2V0TG9jYWxWYWx1ZXMoZGF0YSwgZGF0YSAmJiB2ZXJzaW9uID8gdmVyc2lvbi5oYXNoIDogdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgaW5zdGFuY2UuJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaW5zdGFuY2UuJGVtaXQoaWRiRXZlbnRzLk1PREVMX1FVRVJJRUQsIFskcmVzdWx0XSk7XG5cbiAgICAgICAgICAgICAgLy8gQWdyZWdhciBhbCByZXN1bHRhZG9cbiAgICAgICAgICAgICAgJHJlc3VsdC5wdXNoKGluc3RhbmNlKTtcblxuICAgICAgICAgICAgICAvLyBCdXNjYXIgc2lndWllbnRlXG4gICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblxuICAgICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAkbG9nLmVycm9yKFsnTW9kZWwuZ2V0VmVyc2lvbk9mIGFueSBlcnJvcicsIGVycl0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkucHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgJHJlc3VsdC4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKCRyZXN1bHQpO1xuICAgICAgICAgICAgdGhpei5nZXRSZW1vdGVSZXN1bHQoKTtcbiAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkcmVzdWx0O1xuICAgIH07XG5cbiAgICAvLyBPYnRpZW5lIGVsIHJlc3VsdGFkbyBkZSB2YWxvcmVzIHJlbW90b3NcbiAgICB0aGl6LmdldFJlbW90ZVJlc3VsdCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB2YXIgJHJlbW90ZSA9ICRNb2RlbC5nZXRSZW1vdGUoKTtcbiAgICAgIHZhciAkcmVtb3RlUmVzdWx0ID0gbnVsbDtcblxuICAgICAgaWYgKCRyZW1vdGUgJiYgdHlwZW9mICRyZW1vdGUuZmluZCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICgkcmVtb3RlUmVzdWx0ID0gJHJlbW90ZS5maW5kKCRmaWx0ZXJzKS4kcHJvbWlzZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0Lm1hcChmdW5jdGlvbiAocmVjb3JkLCBpKSB7XG4gICAgICAgICAgICAkTW9kZWwuZ2V0KCRNb2RlbC5nZXRLZXlGcm9tKHJlY29yZC52YWx1ZXMpKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uICgkcmVjb3JkKSB7XG4gICAgICAgICAgICAgICRyZWNvcmQuJHNldFJlbW90ZVZhbHVlcyhyZWNvcmQudmFsdWVzLCByZWNvcmQudmVyc2lvbik7XG5cbiAgICAgICAgICAgICAgaWYgKCRyZXN1bHRbaV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoJHJlc3VsdFtpXSAhPT0gJHJlY29yZCkge1xuICAgICAgICAgICAgICAgICAgJHJlc3VsdFtpXS4kZW1pdChpZGJFdmVudHMuTU9ERUxfVU5RVUVSSUVELCBbJHJlc3VsdF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkcmVzdWx0W2ldID0gJHJlY29yZDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkcmVzdWx0LnB1c2goJHJlY29yZCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAkcmVjb3JkLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9RVUVSSUVELCBbJHJlc3VsdF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJHJlbW90ZVJlc3VsdDtcbiAgICB9O1xuICB9O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYlF1ZXJ5LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiU29ja2V0U2VydmljZSgkbG9nLCBpbywgaWRiVXRpbHMpIHsgJ25nSW5qZWN0JzsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgXHJcbiAgbGV0ICRkZWZVcmxTZXJ2ZXIgPSBudWxsO1xyXG5cclxuICBmdW5jdGlvbiBpZGJTb2NrZXQgKCR1cmxTZXJ2ZXIsICRhY2Nlc3NUb2tlbklkLCAkY3VycmVudFVzZXJJZCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3N0cmluZycsICdudW1iZXInXSwgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcclxuXHJcbiAgICBjb25zdCAkbGlzdGVuZXJzID0gIFtdO1xyXG4gICAgbGV0ICRzb2NrZXQgPSBudWxsO1xyXG4gICAgJHVybFNlcnZlciA9ICR1cmxTZXJ2ZXIgfHwgJGRlZlVybFNlcnZlcjtcclxuXHJcbiAgICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXHJcbiAgICB0aGl6LmNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIFxyXG4gICAgICAvLyBDcmVhdGluZyBjb25uZWN0aW9uIHdpdGggc2VydmVyXHJcbiAgICAgICRzb2NrZXQgPSBpby5jb25uZWN0KCR1cmxTZXJ2ZXIpO1xyXG5cclxuICAgICAgLy8gVGhpcyBwYXJ0IGlzIG9ubHkgZm9yIGxvZ2luIHVzZXJzIGZvciBhdXRoZW50aWNhdGVkICRzb2NrZXQgY29ubmVjdGlvbiBiZXR3ZWVuIGNsaWVudCBhbmQgc2VydmVyLlxyXG4gICAgICAvLyBJZiB5b3UgYXJlIG5vdCB1c2luZyBsb2dpbiBwYWdlIGluIHlvdSB3ZWJzaXRlIHRoZW4geW91IHNob3VsZCByZW1vdmUgcmVzdCBwaWVjZSBvZiBjb2RlLi5cclxuXHJcbiAgICAgICRzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICRsb2cubG9nKCdjb25uZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgJHNvY2tldC5lbWl0KCdhdXRoZW50aWNhdGlvbicsIHtcclxuICAgICAgICAgIGlkOiAkYWNjZXNzVG9rZW5JZCxcclxuICAgICAgICAgIHVzZXJJZDogJGN1cnJlbnRVc2VySWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHNvY2tldC5vbignYXV0aGVudGljYXRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgLy8gdXNlIHRoZSAkc29ja2V0IGFzIHVzdWFsXHJcbiAgICAgICAgICAkbG9nLmxvZygnVXNlciBpcyBhdXRoZW50aWNhdGVkJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouc3Vic2NyaWJlID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICB2YXIgbmFtZSA9IG9wdGlvbnMubW9kZWxOYW1lICsgJy4nICsgb3B0aW9ucy5ldmVudE5hbWU7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMubW9kZWxJZCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBuYW1lID0gbmFtZSArICcuJyArIG9wdGlvbnMubW9kZWxJZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgJHNvY2tldC5vbihuYW1lLCBjYik7XHJcbiAgICAgIFxyXG4gICAgICAvL1B1c2ggdGhlIGNvbnRhaW5lci4uXHJcbiAgICAgICRsaXN0ZW5lcnMucHVzaChuYW1lLCBjYik7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnB1c2hMaXN0ZW5lciA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgJGxpc3RlbmVycy5wdXNoKHN1YnNjcmlwdGlvbk5hbWUpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhpei51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lKSB7XHJcbiAgICAgICRzb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzKHN1YnNjcmlwdGlvbk5hbWUpOyAgXHJcbiAgICAgIHZhciBpZHggPSAkbGlzdGVuZXJzLmluZGV4T2Yoc3Vic2NyaXB0aW9uTmFtZSk7XHJcbiAgICAgIGlmIChpZHggIT0gLTEpe1xyXG4gICAgICAgICRsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpei5jb25uZWN0KCk7XHJcblxyXG4gIH07XHJcblxyXG4gIC8vIEFzaWduYSBsYSBVUkwgZGUgc2Vydmlkb3IgcG9yIGRlZmVjdG9cclxuICBpZGJTb2NrZXQuc2V0VXJsU2VydmVyID0gZnVuY3Rpb24gKHVybFNlcnZlcikge1xyXG4gICAgJGRlZlVybFNlcnZlciA9IHVybFNlcnZlcjtcclxuICB9O1xyXG5cclxuICAvLyBBU2lnbmEgbGFzIGNyZWRlbmNpYWxlcyBwb3IgZGVmZWN0b1xyXG4gIGlkYlNvY2tldC5zZXRDcmVkZW50aWFscyA9IGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XHJcbiAgICBhY2Nlc3NUb2tlbklkID0gJGFjY2Vzc1Rva2VuSWRcclxuICAgIGN1cnJlbnRVc2VySWQgPSAkY3VycmVudFVzZXJJZDtcclxuICB9O1xyXG5cclxuICByZXR1cm4gaWRiU29ja2V0O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYlNvY2tldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYlNvY2tldFNlcnZpY2U7XG5mdW5jdGlvbiBpZGJTb2NrZXRTZXJ2aWNlKCRsb2csIGlvLCBpZGJVdGlscykge1xuICAnbmdJbmplY3QnO1xuICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgdmFyICRkZWZVcmxTZXJ2ZXIgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIGlkYlNvY2tldCgkdXJsU2VydmVyLCAkYWNjZXNzVG9rZW5JZCwgJGN1cnJlbnRVc2VySWQpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnc3RyaW5nJywgJ251bWJlciddLCBbJ3N0cmluZycsICdudW1iZXInXV0pO1xuXG4gICAgdmFyICRsaXN0ZW5lcnMgPSBbXTtcbiAgICB2YXIgJHNvY2tldCA9IG51bGw7XG4gICAgJHVybFNlcnZlciA9ICR1cmxTZXJ2ZXIgfHwgJGRlZlVybFNlcnZlcjtcblxuICAgIC8vIENvbmVjdGFyc2UgYWwgc2Vydmlkb3JcbiAgICB0aGl6LmNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIC8vIENyZWF0aW5nIGNvbm5lY3Rpb24gd2l0aCBzZXJ2ZXJcbiAgICAgICRzb2NrZXQgPSBpby5jb25uZWN0KCR1cmxTZXJ2ZXIpO1xuXG4gICAgICAvLyBUaGlzIHBhcnQgaXMgb25seSBmb3IgbG9naW4gdXNlcnMgZm9yIGF1dGhlbnRpY2F0ZWQgJHNvY2tldCBjb25uZWN0aW9uIGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIuXG4gICAgICAvLyBJZiB5b3UgYXJlIG5vdCB1c2luZyBsb2dpbiBwYWdlIGluIHlvdSB3ZWJzaXRlIHRoZW4geW91IHNob3VsZCByZW1vdmUgcmVzdCBwaWVjZSBvZiBjb2RlLi5cblxuICAgICAgJHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJGxvZy5sb2coJ2Nvbm5lY3RlZCcpO1xuXG4gICAgICAgICRzb2NrZXQuZW1pdCgnYXV0aGVudGljYXRpb24nLCB7XG4gICAgICAgICAgaWQ6ICRhY2Nlc3NUb2tlbklkLFxuICAgICAgICAgIHVzZXJJZDogJGN1cnJlbnRVc2VySWRcbiAgICAgICAgfSk7XG4gICAgICAgICRzb2NrZXQub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gdXNlIHRoZSAkc29ja2V0IGFzIHVzdWFsXG4gICAgICAgICAgJGxvZy5sb2coJ1VzZXIgaXMgYXV0aGVudGljYXRlZCcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGl6LnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdmFyIG5hbWUgPSBvcHRpb25zLm1vZGVsTmFtZSArICcuJyArIG9wdGlvbnMuZXZlbnROYW1lO1xuXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMubW9kZWxJZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUgKyAnLicgKyBvcHRpb25zLm1vZGVsSWQ7XG4gICAgICB9XG5cbiAgICAgICRzb2NrZXQub24obmFtZSwgY2IpO1xuXG4gICAgICAvL1B1c2ggdGhlIGNvbnRhaW5lci4uXG4gICAgICAkbGlzdGVuZXJzLnB1c2gobmFtZSwgY2IpO1xuICAgIH07XG5cbiAgICB0aGl6LnB1c2hMaXN0ZW5lciA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lLCBjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgJGxpc3RlbmVycy5wdXNoKHN1YnNjcmlwdGlvbk5hbWUpO1xuICAgIH07XG5cbiAgICB0aGl6LnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmlwdGlvbk5hbWUpIHtcbiAgICAgICRzb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzKHN1YnNjcmlwdGlvbk5hbWUpO1xuICAgICAgdmFyIGlkeCA9ICRsaXN0ZW5lcnMuaW5kZXhPZihzdWJzY3JpcHRpb25OYW1lKTtcbiAgICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgICAgJGxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpei5jb25uZWN0KCk7XG4gIH07XG5cbiAgLy8gQXNpZ25hIGxhIFVSTCBkZSBzZXJ2aWRvciBwb3IgZGVmZWN0b1xuICBpZGJTb2NrZXQuc2V0VXJsU2VydmVyID0gZnVuY3Rpb24gKHVybFNlcnZlcikge1xuICAgICRkZWZVcmxTZXJ2ZXIgPSB1cmxTZXJ2ZXI7XG4gIH07XG5cbiAgLy8gQVNpZ25hIGxhcyBjcmVkZW5jaWFsZXMgcG9yIGRlZmVjdG9cbiAgaWRiU29ja2V0LnNldENyZWRlbnRpYWxzID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIGN1cnJlbnRVc2VySWQpIHtcbiAgICBhY2Nlc3NUb2tlbklkID0gJGFjY2Vzc1Rva2VuSWQ7XG4gICAgY3VycmVudFVzZXJJZCA9ICRjdXJyZW50VXNlcklkO1xuICB9O1xuXG4gIHJldHVybiBpZGJTb2NrZXQ7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGIgKG1vZHVsZSkge1xyXG5cclxuICAvLyBEdnVlbHZlIGVsIGhvc3QgZGUgdW5hIFVSTFxyXG4gIGZ1bmN0aW9uIGdldEhvc3QodXJsKSB7XHJcbiAgICBjb25zdCBtID0gdXJsLm1hdGNoKC9eKD86aHR0cHM/Oik/XFwvXFwvKFteXFwvXSspLyk7XHJcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgbGV0IHVybEJhc2VIb3N0ID0gbG9jYXRpb24uaG9zdDtcclxuXHJcbiAgY29uc3QgbGJBdXRoID0gZnVuY3Rpb24oKSB7ICduZ0luamVjdCdcclxuICAgIGNvbnN0IHByb3BzID0gWydhY2Nlc3NUb2tlbklkJywgJ2N1cnJlbnRVc2VySWQnLCAncmVtZW1iZXJNZSddO1xyXG4gICAgY29uc3QgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xyXG4gICAgXHJcbiAgICAvLyBOb3RlOiBMb2NhbFN0b3JhZ2UgY29udmVydHMgdGhlIHZhbHVlIHRvIHN0cmluZ1xyXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxyXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAnJztcclxuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcclxuICAgICAgY29uc3Qga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xyXG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICB0aGl6W25hbWVdID0gbG9hZChuYW1lKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGl6LnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgc2F2ZShzdG9yYWdlLCBuYW1lLCB0aGl6W25hbWVdKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2V0VXNlciA9IGZ1bmN0aW9uKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IHVzZXJJZDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSB1c2VyRGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclVzZXIgPSBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IG51bGw7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IG51bGw7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclN0b3JhZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgc2F2ZShzZXNzaW9uU3RvcmFnZSwgbmFtZSwgbnVsbCk7XHJcbiAgICAgICAgc2F2ZShsb2NhbFN0b3JhZ2UsIG5hbWUsIG51bGwpO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBsYkF1dGgoKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24oJHEsIGxiQXV0aCkgeyAnbmdJbmplY3QnO1xyXG4gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbihjb25maWcpIHtcclxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV4dGVybmFsIHJlcXVlc3RzXHJcbiAgICAgICAgY29uc3QgaG9zdCA9IGdldEhvc3QoY29uZmlnLnVybCk7XHJcbiAgICAgICAgaWYgKGhvc3QgJiYgaG9zdCAhPT0gdXJsQmFzZUhvc3QpIHtcclxuICAgICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGJBdXRoLmFjY2Vzc1Rva2VuSWQpIHtcclxuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzW2F1dGhIZWFkZXJdID0gbGJBdXRoLmFjY2Vzc1Rva2VuSWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuX19pc0dldEN1cnJlbnRVc2VyX18pIHtcclxuICAgICAgICAgIC8vIFJldHVybiBhIHN0dWIgNDAxIGVycm9yIGZvciBVc2VyLmdldEN1cnJlbnQoKSB3aGVuXHJcbiAgICAgICAgICAvLyB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpblxyXG4gICAgICAgICAgY29uc3QgcmVzID0ge1xyXG4gICAgICAgICAgICBib2R5OiB7IGVycm9yOiB7IHN0YXR1czogNDAxIH19LFxyXG4gICAgICAgICAgICBzdGF0dXM6IDQwMSxcclxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICB9O1xyXG5cclxuICBjb25zdCBsYlJlc291cmNlID0gZnVuY3Rpb24oKSB7ICduZ0luamVjdCc7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHVybEJhc2U6IFwiL2FwaVwiLFxyXG4gICAgICBhdXRoSGVhZGVyOiAnYXV0aG9yaXphdGlvbicsXHJcbiAgICB9O1xyXG5cclxuICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXIgVGhlIGhlYWRlciBuYW1lIHRvIHVzZSwgZS5nLiBgWC1BY2Nlc3MtVG9rZW5gXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENvbmZpZ3VyZSB0aGUgUkVTVCB0cmFuc3BvcnQgdG8gdXNlIGEgZGlmZmVyZW50IGhlYWRlciBmb3Igc2VuZGluZ1xyXG4gICAgICogdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLiBJdCBpcyBzZW50IGluIHRoZSBgQXV0aG9yaXphdGlvbmAgaGVhZGVyXHJcbiAgICAgKiBieSBkZWZhdWx0LlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldEF1dGhIZWFkZXIgPSBmdW5jdGlvbihoZWFkZXIpIHtcclxuICAgICAgb3B0aW9ucy5hdXRoSGVhZGVyID0gaGVhZGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIGhlYWRlciBuYW1lIHRoYXQgaXMgdXNlZCBmb3Igc2VuZGluZyB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uXHJcbiAgICAgKi9cclxuICAgIHRoaXouZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHVzZSwgZS5nLiBgL2FwaWAgb3IgYC8vZXhhbXBsZS5jb20vYXBpYC5cclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ2hhbmdlIHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gQnkgZGVmYXVsdCwgdGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cclxuICAgIHRoaXouc2V0VXJsQmFzZSA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICBvcHRpb25zLnVybEJhc2UgPSB1cmw7XHJcbiAgICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIFRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldFVybEJhc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei4kZ2V0ID0gZnVuY3Rpb24oJHJlc291cmNlKSB7ICduZ0luamVjdCc7XHJcblxyXG4gICAgICBjb25zdCBsYlJlc291cmNlID0gZnVuY3Rpb24odXJsLCBwYXJhbXMsIGFjdGlvbnMpIHtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMoYWN0aW9ucykubWFwKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgIGFjdGlvbnNba2V5XS5vcmlnaW5hbFVybCA9IGFjdGlvbnNba2V5XS51cmw7XHJcbiAgICAgICAgICBhY3Rpb25zW2tleV0udXJsID0gb3B0aW9ucy51cmxCYXNlICsgYWN0aW9uc1trZXldLnVybDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzb3VyY2UgPSAkcmVzb3VyY2Uob3B0aW9ucy51cmxCYXNlICsgdXJsLCBwYXJhbXMsIGFjdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBBbmd1bGFyIGFsd2F5cyBjYWxscyBQT1NUIG9uICRzYXZlKClcclxuICAgICAgICAvLyBUaGlzIGhhY2sgaXMgYmFzZWQgb25cclxuICAgICAgICAvLyBodHRwOi8va2lya2J1c2hlbGwubWUvYW5ndWxhci1qcy11c2luZy1uZy1yZXNvdXJjZS1pbi1hLW1vcmUtcmVzdGZ1bC1tYW5uZXIvXHJcbiAgICAgICAgcmVzb3VyY2UucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24oc3VjY2VzcywgZXJyb3IpIHtcclxuICAgICAgICAgIC8vIEZvcnR1bmF0ZWx5LCBMb29wQmFjayBwcm92aWRlcyBhIGNvbnZlbmllbnQgYHVwc2VydGAgbWV0aG9kXHJcbiAgICAgICAgICAvLyB0aGF0IGV4YWN0bHkgZml0cyBvdXIgbmVlZHMuXHJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSByZXNvdXJjZS51cHNlcnQuY2FsbCh0aGlzLCB7fSwgdGhpcywgc3VjY2VzcywgZXJyb3IpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC4kcHJvbWlzZSB8fCByZXN1bHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2U7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsYlJlc291cmNlLmdldFVybEJhc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgICAgfTtcclxuICAgIFxyXG4gICAgICByZXR1cm4gbGJSZXNvdXJjZTtcclxuXHJcbiAgICB9O1xyXG5cclxuICB9XHJcblxyXG4gIHJldHVybiBtb2R1bGVcclxuICAgIC5mYWN0b3J5KCdsYkF1dGgnLCBsYkF1dGgpXHJcbiAgICAucHJvdmlkZXIoJ2xiUmVzb3VyY2UnLCBsYlJlc291cmNlKVxyXG4gICAgLmZhY3RvcnkoJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicsIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcilcclxuICAgIC5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24oJGh0dHBQcm92aWRlcikgeyAnbmdJbmplY3QnO1xyXG4gICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InKTtcclxuICAgIH1dKTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9sYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGxiO1xuZnVuY3Rpb24gbGIobW9kdWxlKSB7XG5cbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcbiAgZnVuY3Rpb24gZ2V0SG9zdCh1cmwpIHtcbiAgICB2YXIgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xuICAgIHJldHVybiBtID8gbVsxXSA6IG51bGw7XG4gIH1cblxuICB2YXIgdXJsQmFzZUhvc3QgPSBsb2NhdGlvbi5ob3N0O1xuXG4gIHZhciBsYkF1dGggPSBmdW5jdGlvbiBsYkF1dGgoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcbiAgICB2YXIgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xuXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcbiAgICAvLyBXZSBhcmUgdXNpbmcgZW1wdHkgc3RyaW5nIGFzIGEgbWFya2VyIGZvciBudWxsL3VuZGVmaW5lZCB2YWx1ZXMuXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XG4gICAgICAgIHN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWQobmFtZSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Vba2V5XSB8fCBzZXNzaW9uU3RvcmFnZVtrZXldIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXpbbmFtZV0gPSBsb2FkKG5hbWUpO1xuICAgICAgfSk7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdmFyIHN0b3JhZ2UgPSB0aGl6LnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzdG9yYWdlLCBuYW1lLCB0aGl6W25hbWVdKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgdXNlcklkLCB1c2VyRGF0YSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IHVzZXJJZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gbnVsbDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBzYXZlKHNlc3Npb25TdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgICAgc2F2ZShsb2NhbFN0b3JhZ2UsIG5hbWUsIG51bGwpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XG4gIH07XG5cbiAgdmFyIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcigkcSwgbGJBdXRoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHJldHVybiB7XG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV4dGVybmFsIHJlcXVlc3RzXG4gICAgICAgIHZhciBob3N0ID0gZ2V0SG9zdChjb25maWcudXJsKTtcbiAgICAgICAgaWYgKGhvc3QgJiYgaG9zdCAhPT0gdXJsQmFzZUhvc3QpIHtcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XG4gICAgICAgICAgY29uZmlnLmhlYWRlcnNbYXV0aEhlYWRlcl0gPSBsYkF1dGguYWNjZXNzVG9rZW5JZDtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuX19pc0dldEN1cnJlbnRVc2VyX18pIHtcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxuICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIHVzZXIgbG9nZ2VkIGluXG4gICAgICAgICAgdmFyIHJlcyA9IHtcbiAgICAgICAgICAgIGJvZHk6IHsgZXJyb3I6IHsgc3RhdHVzOiA0MDEgfSB9LFxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXG4gICAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGZ1bmN0aW9uIGhlYWRlcnMoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICB2YXIgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uIGxiUmVzb3VyY2UoKSB7XG4gICAgJ25nSW5qZWN0JztcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHVybEJhc2U6IFwiL2FwaVwiLFxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nXG4gICAgfTtcblxuICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlciBUaGUgaGVhZGVyIG5hbWUgdG8gdXNlLCBlLmcuIGBYLUFjY2Vzcy1Ub2tlbmBcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ29uZmlndXJlIHRoZSBSRVNUIHRyYW5zcG9ydCB0byB1c2UgYSBkaWZmZXJlbnQgaGVhZGVyIGZvciBzZW5kaW5nXHJcbiAgICAgKiB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uIEl0IGlzIHNlbnQgaW4gdGhlIGBBdXRob3JpemF0aW9uYCBoZWFkZXJcclxuICAgICAqIGJ5IGRlZmF1bHQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoaGVhZGVyKSB7XG4gICAgICBvcHRpb25zLmF1dGhIZWFkZXIgPSBoZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgaGVhZGVyIG5hbWUgdGhhdCBpcyB1c2VkIGZvciBzZW5kaW5nIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdXNlLCBlLmcuIGAvYXBpYCBvciBgLy9leGFtcGxlLmNvbS9hcGlgLlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDaGFuZ2UgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBCeSBkZWZhdWx0LCB0aGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouc2V0VXJsQmFzZSA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgIG9wdGlvbnMudXJsQmFzZSA9IHVybDtcbiAgICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIFRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICB9O1xuXG4gICAgdGhpei4kZ2V0ID0gZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xuICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoYWN0aW9ucykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICAgIGFjdGlvbnNba2V5XS51cmwgPSBvcHRpb25zLnVybEJhc2UgKyBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSAkcmVzb3VyY2Uob3B0aW9ucy51cmxCYXNlICsgdXJsLCBwYXJhbXMsIGFjdGlvbnMpO1xuXG4gICAgICAgIC8vIEFuZ3VsYXIgYWx3YXlzIGNhbGxzIFBPU1Qgb24gJHNhdmUoKVxuICAgICAgICAvLyBUaGlzIGhhY2sgaXMgYmFzZWQgb25cbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xuICAgICAgICByZXNvdXJjZS5wcm90b3R5cGUuJHNhdmUgPSBmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxuICAgICAgICAgIC8vIHRoYXQgZXhhY3RseSBmaXRzIG91ciBuZWVkcy5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LiRwcm9taXNlIHx8IHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gbW9kdWxlLmZhY3RvcnkoJ2xiQXV0aCcsIGxiQXV0aCkucHJvdmlkZXIoJ2xiUmVzb3VyY2UnLCBsYlJlc291cmNlKS5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpLmNvbmZpZyhbJyRodHRwUHJvdmlkZXInLCBmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InKTtcbiAgfV0pO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2xiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gR2xvYmFsZXNcclxuaW1wb3J0IENsYXp6ZXIgIGZyb20gJy4vQ2xhenplcic7XHJcblxyXG4vLyBSZXF1ZXN0XHJcbmltcG9ydCBpZGJSZXF1ZXN0ICAgICAgICAgZnJvbSAnLi9pZGJSZXF1ZXN0JztcclxuaW1wb3J0IGlkYk9wZW5EQlJlcXVlc3QgICBmcm9tICcuL2lkYk9wZW5EQlJlcXVlc3QnO1xyXG5cclxuLy8gUHJpbmNpcGFsZXNcclxuaW1wb3J0IGlkYiAgICAgICAgICAgICAgZnJvbSAnLi9pZGInO1xyXG5pbXBvcnQgaWRiU3RvcmUgICAgICAgICBmcm9tICcuL2lkYlN0b3JlJztcclxuaW1wb3J0IGlkYk1vZGVsICAgICAgICAgZnJvbSAnLi9pZGJNb2RlbCc7XHJcbmltcG9ydCBpZGJTb2NrZXQgICAgICAgIGZyb20gJy4vaWRiU29ja2V0JztcclxuaW1wb3J0IGlkYlRyYW5zYWN0aW9uICAgZnJvbSAnLi9pZGJUcmFuc2FjdGlvbic7XHJcblxyXG5pbXBvcnQgbGIgZnJvbSAnLi9sYic7XHJcblxyXG5sYihhbmd1bGFyLm1vZHVsZSgnbmcudjEuaWRiJywgW10pKVxyXG4gIFxyXG4gIC5jb25zdGFudCgnaW8nLCBpbylcclxuICAuc2VydmljZSgnQ2xhenplcicsIENsYXp6ZXIpXHJcblxyXG4gIC5jb25zdGFudCgnaWRiVmVyc2lvbicsICcwLjAuMScpXHJcbiAgXHJcbiAgLnNlcnZpY2UoJ2lkYlJlcXVlc3QnLCBpZGJSZXF1ZXN0KVxyXG4gIC5zZXJ2aWNlKCdpZGJPcGVuREJSZXF1ZXN0JywgaWRiT3BlbkRCUmVxdWVzdClcclxuICAuc2VydmljZSgnaWRiMicsIGlkYilcclxuICAuc2VydmljZSgnaWRiU3RvcmUnLCBpZGJTdG9yZSlcclxuICAuc2VydmljZSgnaWRiTW9kZWwyJywgaWRiTW9kZWwpXHJcbiAgLnNlcnZpY2UoJ2lkYlNvY2tldDInLCBpZGJTb2NrZXQpXHJcbiAgLnNlcnZpY2UoJ2lkYlRyYW5zYWN0aW9uJywgaWRiVHJhbnNhY3Rpb24pXHJcblxyXG4gIC5zZXJ2aWNlKCdkYjInLCBmdW5jdGlvbiAoaWRiMikgeyAnbmdJbmplY3QnO1xyXG5cclxuICAgIGNvbnN0IGRiID0gbmV3IGlkYjIoJ2FhYScsIDQpO1xyXG5cclxuICAgIGRiLnVwZ3JhZGVuZWVkZWQoZnVuY3Rpb24gKGRiLCBldmVudCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhbJ3VwZ3JhZGVuZWVkZWQnLCBldmVudF0pXHJcbiAgICB9KVxyXG5cclxuICAgIC5hdXRvbWlncmF0aW9uKHtcclxuICAgICAgMTogZnVuY3Rpb24gKGRiKSB7XHJcbiAgICAgICAgdmFyIG1vZGVsID0gZGJcclxuICAgICAgICAgIC5tb2RlbCgnVHJhYmFqYWRvcicpXHJcbiAgICAgICAgICAuc2V0S2V5UGF0aCgnaWQnKVxyXG4gICAgICAgICAgLnNldEF1dG9JbmNyZW1lbnQoZmFsc2UpXHJcbiAgICAgICAgICAuY3JlYXRlU3RvcmUoKTtcclxuXHJcbiAgICAgICAgICBtb2RlbC5wdXQoe1xyXG4gICAgICAgICAgICAnaWQnIDogMSxcclxuICAgICAgICAgICAgJ25vbWJyZXMnOiAnYWxleCcsXHJcbiAgICAgICAgICAgICdhcGVsbGlkb3MnOiAncm9uZG9uJyxcclxuICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncHV0JywgYXJndW1lbnRzKVxyXG4gICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncHV0IGVycm9yJywgYXJndW1lbnRzKVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgbW9kZWwucHV0KHtcclxuICAgICAgICAgICAgJ2lkJyA6IDEsXHJcbiAgICAgICAgICAgICdub21icmVzJzogJ2FsZXgnLFxyXG4gICAgICAgICAgICAnYXBlbGxpZG9zJzogJ3JvbmRvbicsXHJcbiAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3B1dCcsIGFyZ3VtZW50cylcclxuICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3B1dCBlcnJvcicsIGFyZ3VtZW50cylcclxuICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBcclxuICAgICAgICAgIC8vIC5rZXlQYXRoKCdpZCcpXHJcbiAgICAgICAgICAvLyAuYXV0b0luY3JlbWVudChmYWxzZSlcclxuICAgICAgICAgIC8vIC5jcmVhdGUoKVxyXG4gICAgICAgICAgLy8gLnZlcnNpb25pbmcoZnVuY3Rpb24gKHZlcnNpb25pbmcpIHtcclxuICAgICAgICAgIC8vICAgdmVyc2lvbmluZy5jcmVhdGVTdG9yZSgpO1xyXG4gICAgICAgICAgLy8gfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGRiLmRyb3AoKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc29sZS5sb2coWydkcm9wJywgZXZlbnRdKTtcclxuICAgICAgZGIub3BlbigpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFsnb3BlbicsIGV2ZW50XSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGRiO1xyXG4gICAgXHJcbiAgfSlcclxuXHJcbiAgLnJ1bihmdW5jdGlvbiAoZGIyKSB7ICduZ0luamVjdCc7XHJcblxyXG4gIH0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gR2xvYmFsZXNcblxudmFyIF9DbGF6emVyID0gcmVxdWlyZSgnLi9DbGF6emVyJyk7XG5cbnZhciBfQ2xhenplcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9DbGF6emVyKTtcblxudmFyIF9pZGJSZXF1ZXN0ID0gcmVxdWlyZSgnLi9pZGJSZXF1ZXN0Jyk7XG5cbnZhciBfaWRiUmVxdWVzdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJSZXF1ZXN0KTtcblxudmFyIF9pZGJPcGVuREJSZXF1ZXN0ID0gcmVxdWlyZSgnLi9pZGJPcGVuREJSZXF1ZXN0Jyk7XG5cbnZhciBfaWRiT3BlbkRCUmVxdWVzdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJPcGVuREJSZXF1ZXN0KTtcblxudmFyIF9pZGIgPSByZXF1aXJlKCcuL2lkYicpO1xuXG52YXIgX2lkYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGIpO1xuXG52YXIgX2lkYlN0b3JlID0gcmVxdWlyZSgnLi9pZGJTdG9yZScpO1xuXG52YXIgX2lkYlN0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlN0b3JlKTtcblxudmFyIF9pZGJNb2RlbCA9IHJlcXVpcmUoJy4vaWRiTW9kZWwnKTtcblxudmFyIF9pZGJNb2RlbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJNb2RlbCk7XG5cbnZhciBfaWRiU29ja2V0ID0gcmVxdWlyZSgnLi9pZGJTb2NrZXQnKTtcblxudmFyIF9pZGJTb2NrZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiU29ja2V0KTtcblxudmFyIF9pZGJUcmFuc2FjdGlvbiA9IHJlcXVpcmUoJy4vaWRiVHJhbnNhY3Rpb24nKTtcblxudmFyIF9pZGJUcmFuc2FjdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJUcmFuc2FjdGlvbik7XG5cbnZhciBfbGIgPSByZXF1aXJlKCcuL2xiJyk7XG5cbnZhciBfbGIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vLyBQcmluY2lwYWxlc1xuXG5cbi8vIFJlcXVlc3RcbigwLCBfbGIyLmRlZmF1bHQpKGFuZ3VsYXIubW9kdWxlKCduZy52MS5pZGInLCBbXSkpLmNvbnN0YW50KCdpbycsIGlvKS5zZXJ2aWNlKCdDbGF6emVyJywgX0NsYXp6ZXIyLmRlZmF1bHQpLmNvbnN0YW50KCdpZGJWZXJzaW9uJywgJzAuMC4xJykuc2VydmljZSgnaWRiUmVxdWVzdCcsIF9pZGJSZXF1ZXN0Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJPcGVuREJSZXF1ZXN0JywgX2lkYk9wZW5EQlJlcXVlc3QyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYjInLCBfaWRiMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJTdG9yZScsIF9pZGJTdG9yZTIuZGVmYXVsdCkuc2VydmljZSgnaWRiTW9kZWwyJywgX2lkYk1vZGVsMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJTb2NrZXQyJywgX2lkYlNvY2tldDIuZGVmYXVsdCkuc2VydmljZSgnaWRiVHJhbnNhY3Rpb24nLCBfaWRiVHJhbnNhY3Rpb24yLmRlZmF1bHQpLnNlcnZpY2UoJ2RiMicsIGZ1bmN0aW9uIChpZGIyKSB7XG4gICduZ0luamVjdCc7XG5cbiAgdmFyIGRiID0gbmV3IGlkYjIoJ2FhYScsIDQpO1xuXG4gIGRiLnVwZ3JhZGVuZWVkZWQoZnVuY3Rpb24gKGRiLCBldmVudCkge1xuICAgIGNvbnNvbGUubG9nKFsndXBncmFkZW5lZWRlZCcsIGV2ZW50XSk7XG4gIH0pLmF1dG9taWdyYXRpb24oe1xuICAgIDE6IGZ1bmN0aW9uIF8oZGIpIHtcbiAgICAgIHZhciBtb2RlbCA9IGRiLm1vZGVsKCdUcmFiYWphZG9yJykuc2V0S2V5UGF0aCgnaWQnKS5zZXRBdXRvSW5jcmVtZW50KGZhbHNlKS5jcmVhdGVTdG9yZSgpO1xuXG4gICAgICBtb2RlbC5wdXQoe1xuICAgICAgICAnaWQnOiAxLFxuICAgICAgICAnbm9tYnJlcyc6ICdhbGV4JyxcbiAgICAgICAgJ2FwZWxsaWRvcyc6ICdyb25kb24nXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3B1dCcsIGFyZ3VtZW50cyk7XG4gICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwdXQgZXJyb3InLCBhcmd1bWVudHMpO1xuICAgICAgfSk7XG5cbiAgICAgIG1vZGVsLnB1dCh7XG4gICAgICAgICdpZCc6IDEsXG4gICAgICAgICdub21icmVzJzogJ2FsZXgnLFxuICAgICAgICAnYXBlbGxpZG9zJzogJ3JvbmRvbidcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygncHV0JywgYXJndW1lbnRzKTtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3B1dCBlcnJvcicsIGFyZ3VtZW50cyk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgICAgLy8gLmtleVBhdGgoJ2lkJylcbiAgICAgIC8vIC5hdXRvSW5jcmVtZW50KGZhbHNlKVxuICAgICAgLy8gLmNyZWF0ZSgpXG4gICAgICAvLyAudmVyc2lvbmluZyhmdW5jdGlvbiAodmVyc2lvbmluZykge1xuICAgICAgLy8gICB2ZXJzaW9uaW5nLmNyZWF0ZVN0b3JlKCk7XG4gICAgICAvLyB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIGRiLmRyb3AoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyhbJ2Ryb3AnLCBldmVudF0pO1xuICAgIGRiLm9wZW4oKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFsnb3BlbicsIGV2ZW50XSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBkYjtcbn0pLnJ1bihmdW5jdGlvbiAoZGIyKSB7fSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiUmVxdWVzdFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJSZXF1ZXN0IDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBhbnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0O1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01FeGNlcHRpb24/ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIChJREJPYmplY3RTdG9yZSBvciBJREJJbmRleCBvciBJREJDdXJzb3IpPyBzb3VyY2U7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uPyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCUmVxdWVzdFJlYWR5U3RhdGUgICAgICAgICAgICAgICAgICAgICAgIHJlYWR5U3RhdGU7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25zdWNjZXNzO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogfTtcclxuICpcclxuICogZW51bSBJREJSZXF1ZXN0UmVhZHlTdGF0ZSB7XHJcbiAqICAgXCJwZW5kaW5nXCIsXHJcbiAqICAgXCJkb25lXCJcclxuICogfTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyKSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcclxuICAvLyAkX3Byb21pc2VcclxuXHJcbiAgY29uc3QgUmVhZHlTdGF0ZSA9IG5ldyBDbGF6emVyKHt9KVxyXG4gICAgICAgIC5zdGF0aWMoJ1BFTkRJR04nLCAgJ3BlbmRpbmcnKVxyXG4gICAgICAgIC5zdGF0aWMoJ0RPTkUnLCAgICAgJ2RvbmUnKTtcclxuICBcclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlJlcXVlc3QgKG1lKSB7XHJcblxyXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFN0YXRpY3NcclxuICAuc3RhdGljKCdSZWFkeVN0YXRlJywgUmVhZHlTdGF0ZS5jbGF6eilcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gR2V0dGVyc1xyXG4gIC5nZXR0ZXIoJyRyZXN1bHQnLCAncmVzdWx0JylcclxuICAuZ2V0dGVyKCckZXJyb3InLCAnZXJyb3InKVxyXG4gIC5nZXR0ZXIoJyRzb3VyY2UnLCAnc291cmNlJylcclxuICAuZ2V0dGVyKCckcmVhZHlTdGF0ZScsICdyZWFkeVN0YXRlJylcclxuICAuZ2V0dGVyKCckdHJhbnNhY3Rpb24nLCAndHJhbnNhY3Rpb24nKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gIC5oYW5kbGVyRXZlbnQoJ3N1Y2Nlc3MnLCAnb25zdWNjZXNzJylcclxuICAuaGFuZGxlckV2ZW50KCdlcnJvcicsICdvbmVycm9yJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJvcGVydHlcclxuICAucHJvcGVydHkoJyRwcm9taXNlJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZiAodGhpei4kX3Byb21pc2UpIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcclxuXHJcbiAgICAgIC8vIENyZWFyIHByb21pc2UgcGFyYSBlbCByZXF1ZXN0XHJcbiAgICAgIHRoaXouJF9wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRoaXouc3VjY2VzcyhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmVycm9yKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBuZXcgQ2xhenplcih0aGl6LiRfcHJvbWlzZSkuc3RhdGljKCckcmVxdWVzdCcsIHRoaXogKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJSZXF1ZXN0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiUmVxdWVzdFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJSZXF1ZXN0IDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBhbnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0O1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01FeGNlcHRpb24/ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIChJREJPYmplY3RTdG9yZSBvciBJREJJbmRleCBvciBJREJDdXJzb3IpPyBzb3VyY2U7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uPyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCUmVxdWVzdFJlYWR5U3RhdGUgICAgICAgICAgICAgICAgICAgICAgIHJlYWR5U3RhdGU7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25zdWNjZXNzO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogfTtcclxuICpcclxuICogZW51bSBJREJSZXF1ZXN0UmVhZHlTdGF0ZSB7XHJcbiAqICAgXCJwZW5kaW5nXCIsXHJcbiAqICAgXCJkb25lXCJcclxuICogfTtcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXG4gIC8vICRfcHJvbWlzZVxuXG4gIHZhciBSZWFkeVN0YXRlID0gbmV3IENsYXp6ZXIoe30pLnN0YXRpYygnUEVORElHTicsICdwZW5kaW5nJykuc3RhdGljKCdET05FJywgJ2RvbmUnKTtcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlJlcXVlc3QobWUpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBIZXJlbmNpYVxuICAuaW5oZXJpdChFdmVudFRhcmdldClcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gU3RhdGljc1xuICAuc3RhdGljKCdSZWFkeVN0YXRlJywgUmVhZHlTdGF0ZS5jbGF6eilcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR2V0dGVyc1xuICAuZ2V0dGVyKCckcmVzdWx0JywgJ3Jlc3VsdCcpLmdldHRlcignJGVycm9yJywgJ2Vycm9yJykuZ2V0dGVyKCckc291cmNlJywgJ3NvdXJjZScpLmdldHRlcignJHJlYWR5U3RhdGUnLCAncmVhZHlTdGF0ZScpLmdldHRlcignJHRyYW5zYWN0aW9uJywgJ3RyYW5zYWN0aW9uJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRXZlbnQgaGFuZGxlcnNcbiAgLmhhbmRsZXJFdmVudCgnc3VjY2VzcycsICdvbnN1Y2Nlc3MnKS5oYW5kbGVyRXZlbnQoJ2Vycm9yJywgJ29uZXJyb3InKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQcm9wZXJ0eVxuICAucHJvcGVydHkoJyRwcm9taXNlJywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICBpZiAodGhpei4kX3Byb21pc2UpIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcblxuICAgICAgLy8gQ3JlYXIgcHJvbWlzZSBwYXJhIGVsIHJlcXVlc3RcbiAgICAgIHRoaXouJF9wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0aGl6LnN1Y2Nlc3MoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmVzb2x2ZShldmVudCk7XG4gICAgICAgIH0pLmVycm9yKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJlamVjdChldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIG5ldyBDbGF6emVyKHRoaXouJF9wcm9taXNlKS5zdGF0aWMoJyRyZXF1ZXN0JywgdGhpeik7XG5cbiAgICAgIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcbiAgICB9XG5cbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJSZXF1ZXN0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYk9wZW5EQlJlcXVlc3RcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCT3BlbkRCUmVxdWVzdCA6IElEQlJlcXVlc3Qge1xyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25ibG9ja2VkO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb251cGdyYWRlbmVlZGVkO1xyXG4gKiB9O1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYk9wZW5EQlJlcXVlc3QgKG1lKSB7XHJcbiAgICBpZGJSZXF1ZXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IC8vIExsYW1hciBhbCBjb25zdHJ1Y3RvcyBkZWwgcGFkcmVcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAuaW5oZXJpdChpZGJSZXF1ZXN0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gIC5oYW5kbGVyRXZlbnQoJ2Jsb2NrZWQnLCAnb25ibG9ja2VkJylcclxuICAuaGFuZGxlckV2ZW50KCd1cGdyYWRlbmVlZGVkJywgJ29udXBncmFkZW5lZWRlZCcpXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYk9wZW5EQlJlcXVlc3QuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJPcGVuREJSZXF1ZXN0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQk9wZW5EQlJlcXVlc3QgOiBJREJSZXF1ZXN0IHtcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYmxvY2tlZDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9udXBncmFkZW5lZWRlZDtcclxuICogfTtcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJSZXF1ZXN0KSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJPcGVuREJSZXF1ZXN0KG1lKSB7XG4gICAgaWRiUmVxdWVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyAvLyBMbGFtYXIgYWwgY29uc3RydWN0b3MgZGVsIHBhZHJlXG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KGlkYlJlcXVlc3QpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGhhbmRsZXJzXG4gIC5oYW5kbGVyRXZlbnQoJ2Jsb2NrZWQnLCAnb25ibG9ja2VkJykuaGFuZGxlckV2ZW50KCd1cGdyYWRlbmVlZGVkJywgJ29udXBncmFkZW5lZWRlZCcpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiT3BlbkRCUmVxdWVzdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCRmFjdG9yeSB7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBvcGVuKERPTVN0cmluZyBuYW1lLCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGxvbmcgdmVyc2lvbik7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBkZWxldGVEYXRhYmFzZShET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgc2hvcnQgY21wKGFueSBmaXJzdCwgYW55IHNlY29uZCk7XHJcbiAqIH07XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkRhdGFiYXNlIDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgdW5zaWduZWQgbG9uZyBsb25nIHZlcnNpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgICAgICBvYmplY3RTdG9yZU5hbWVzO1xyXG4gKiBcclxuICogICBJREJUcmFuc2FjdGlvbiB0cmFuc2FjdGlvbigoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pIHN0b3JlTmFtZXMsIG9wdGlvbmFsIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlID0gXCJyZWFkb25seVwiKTtcclxuICogICB2b2lkICAgICAgICAgICBjbG9zZSgpO1xyXG4gKiAgIElEQk9iamVjdFN0b3JlIGNyZWF0ZU9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lLCBvcHRpb25hbCBJREJPYmplY3RTdG9yZVBhcmFtZXRlcnMgb3B0aW9ucyk7XHJcbiAqICAgdm9pZCAgICAgICAgICAgZGVsZXRlT2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYWJvcnQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmNsb3NlO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9udmVyc2lvbmNoYW5nZTtcclxuICogfTtcclxuICogXHJcbiAqIGRpY3Rpb25hcnkgSURCT2JqZWN0U3RvcmVQYXJhbWV0ZXJzIHtcclxuICogICAoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pPyBrZXlQYXRoID0gbnVsbDtcclxuICogICBib29sZWFuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvSW5jcmVtZW50ID0gZmFsc2U7XHJcbiAqIH07bWVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJTdG9yZSwgaWRiTW9kZWwyLCBpZGJPcGVuREJSZXF1ZXN0LCBpZGJUcmFuc2FjdGlvbiwgJGxvZykgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cclxuICBjb25zdCBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XHJcbiAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxyXG4gIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxyXG4gIGNvbnN0IElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcclxuICBjb25zdCBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XHJcbiAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcclxuICBcclxuICBpZiAoIWluZGV4ZWREQikge1xyXG4gICAgYWxlcnQoJ1N1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhcycpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRtZVxyXG4gIC8vICRvcGVuZWRcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvciAgXHJcbiAgY29uc3QgaWRiID0gZnVuY3Rpb24gaWRiKG5hbWUsIHZlcnNpb24sIHNvY2tldCkge1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpXHJcblxyXG4gICAgICAuc3RhdGljKCckbmFtZScsIG5hbWUpXHJcbiAgICAgIC5zdGF0aWMoJyR2ZXJzaW9uJywgdmVyc2lvbilcclxuICAgICAgLnN0YXRpYygnJHNvY2tldCcsIHNvY2tldClcclxuICAgICAgXHJcbiAgICAgIC5zdGF0aWMoJyR1cGdyYWRlbmVlZGVkcycsIFtdKVxyXG4gICAgICAuc3RhdGljKCckbW9kZWxzJywgW10pO1xyXG5cclxuICB9O1xyXG5cclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGlkYilcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAuaW5oZXJpdChFdmVudFRhcmdldClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gR2V0dGVyc1xyXG4gIC5nZXR0ZXIoJyRvYmplY3RTdG9yZU5hbWVzJywgJ29iamVjdFN0b3JlTmFtZXMnKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gIC5oYW5kbGVyRXZlbnQoJ2Fib3J0ZWQnLCAnb25hYm9ydCcpXHJcbiAgLmhhbmRsZXJFdmVudCgnY2xvc2VkJywgJ29uY2xvc2UnKVxyXG4gIC5oYW5kbGVyRXZlbnQoJ2Vycm9yJywgJ29uZXJyb3InKVxyXG4gIC5oYW5kbGVyRXZlbnQoJ3ZlcnNpb25DaGFuZ2VkJywgJ29udmVyc2lvbmNoYW5nZScpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJ29wZW4nLCBmdW5jdGlvbiAobmFtZSwgdmVyc2lvbikge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiT3BlbkRCUmVxdWVzdChpbmRleGVkREIub3BlbihuYW1lLCB2ZXJzaW9uKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJ2Ryb3AnLCBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgXHJcbiAgICByZXR1cm4gbmV3IGlkYk9wZW5EQlJlcXVlc3QoaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKG5hbWUpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnY21wJywgZnVuY3Rpb24gKGZpcnN0LCBzZWNvbmQpIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIGluZGV4ZWREQi5jbXAoZmlyc3QsIHNlY29uZCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ3VwZ3JhZGVuZWVkZWQnLCBmdW5jdGlvbiAoY2IpIHtcclxuICAgIFxyXG4gICAgdGhpcy4kdXBncmFkZW5lZWRlZHMucHVzaChjYik7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnYXV0b21pZ3JhdGlvbicsIGZ1bmN0aW9uIChhbGxNaWdyYXRpb25zKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMudXBncmFkZW5lZWRlZChmdW5jdGlvbiAodGhpeiwgb3BlblJlcXVlc3QsIGV2ZW50KSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKGFsbE1pZ3JhdGlvbnMpLm1hcChmdW5jdGlvbiAodmVyc2lvbikge1xyXG5cclxuICAgICAgICBpZiAoZXZlbnQub2xkVmVyc2lvbiA8IHZlcnNpb24gJiYgdmVyc2lvbiA8PSBldmVudC5uZXdWZXJzaW9uKSB7XHJcblxyXG4gICAgICAgICAgY29uc3QgbWlncmF0aW9ucyA9IEFycmF5LmlzQXJyYXkoYWxsTWlncmF0aW9uc1t2ZXJzaW9uXSk/XHJcbiAgICAgICAgICAgIGFsbE1pZ3JhdGlvbnNbdmVyc2lvbl06W2FsbE1pZ3JhdGlvbnNbdmVyc2lvbl1dO1xyXG5cclxuICAgICAgICAgICRsb2cubG9nKCdtaWdyYXRpb24gdicrdmVyc2lvbisnIHN0YXJ0cycpO1xyXG4gICAgICAgICAgbWlncmF0aW9ucy5tYXAoZnVuY3Rpb24gKG1pZ3JhdGlvbikge1xyXG4gICAgICAgICAgICBtaWdyYXRpb24odGhpeiwgb3BlblJlcXVlc3QsIGV2ZW50KTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgICRsb2cubG9nKCdtaWdyYXRpb24gdicrdmVyc2lvbisnIGVuZHMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCdvcGVuJywgZnVuY3Rpb24gKGNiLCBjYkVycikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBsZXQgbGFzdFJxID0gbnVsbDtcclxuICAgIGxldCBsYXN0RXZlbnQgPSBudWxsO1xyXG5cclxuICAgIGlmICghdGhpei4kb3BlbmVkKSB7XHJcblxyXG4gICAgICB0aGl6LiRvcGVuZWQgPSAobGFzdFJxID0gaWRiLm9wZW4odGhpei4kbmFtZSwgdGhpei4kdmVyc2lvbilcclxuICAgICAgICAudXBncmFkZW5lZWRlZChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHRoaXouJG1lID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgICAgIHRoaXouJHVwZ3JhZGVuZWVkZWRzLm1hcChmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAgICAgY2IuYXBwbHkodGhpeiwgW3RoaXosIGxhc3RScSwgZXZlbnRdKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKVxyXG5cclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgICBsYXN0RXZlbnQgPSBldmVudDtcclxuICAgICAgICAgIGlmIChjYikgY2IodGhpeiwgbGFzdFJxLCBldmVudCk7XHJcbiAgICAgICAgICByZXR1cm4gdGhpejtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGxhc3RScSA9IG51bGw7XHJcbiAgICAgICAgICB0aGl6LiRvcGVuZWQgPSBudWxsO1xyXG4gICAgICAgICAgaWYgKGNiRXJyKSBjYkVycih0aGl6LCBsYXN0UnEsIGV2ZW50KTtcclxuICAgICAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0gZWxzZSBpZiAoY2IpIHtcclxuXHJcbiAgICAgIGNiKHRoaXosIGxhc3RScSwgbGFzdEV2ZW50KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJG9wZW5lZDtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnZHJvcCcsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgIGNvbnN0IHJxID0gaWRiLmRyb3AodGhpei4kbmFtZSlcclxuICAgICAgICAuc3VjY2VzcyhyZXNvbHZlKVxyXG4gICAgICAgIC5lcnJvcihyZWplY3QpO1xyXG4gICAgICBpZiAoY2IpIGNiKHJxKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnY2xvc2UnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdGhpcy4kbWUuY2xvc2UoKTtcclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ2NyZWF0ZVN0b3JlJywgZnVuY3Rpb24gKG5hbWUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLmNyZWF0ZU9iamVjdFN0b3JlKG5hbWUsIG9wdGlvbnMpKTtcclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ2Ryb3BTdG9yZScsIGZ1bmN0aW9uIChuYW1lKSB7XHJcblxyXG4gICAgdGhpcy4kbWUuZGVsZXRlT2JqZWN0U3RvcmUobmFtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ21vZGVsJywgZnVuY3Rpb24gKG5hbWUpIHtcclxuXHJcbiAgICAvLyBTaSBleGlzdGUgZWwgbW9kZWxvIHJldG9ybmFybG9cclxuICAgIGlmKHRoaXMuJG1vZGVsc1tuYW1lXSkgcmV0dXJuIHRoaXMuJG1vZGVsc1tuYW1lXTtcclxuXHJcbiAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsbyB5IGd1YXJkYXJsb1xyXG4gICAgcmV0dXJuIHRoaXMuJG1vZGVsc1tuYW1lXSA9IGlkYk1vZGVsMih0aGlzLCBuYW1lKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgndHJhbnNhY3Rpb24nLCBmdW5jdGlvbiAoc3RvcmVOYW1lcywgbW9kZSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIFxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgdGhpei5vcGVuKClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAodGhpeikge1xyXG4gICAgICAgICAgcmVzb2x2ZShuZXcgaWRiVHJhbnNhY3Rpb24odGhpei4kbWUudHJhbnNhY3Rpb24oc3RvcmVOYW1lcywgbW9kZSkpKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlamVjdChldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCdzdG9yZScsIGZ1bmN0aW9uIChzdG9yZU5hbWVzKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHN0b3JlTmFtZXMpKSBzdG9yZU5hbWVzID0gW3N0b3JlTmFtZXNdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFjdGlvbihtb2RlKSB7XHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgIHRoaXoudHJhbnNhY3Rpb24oc3RvcmVOYW1lcywgbW9kZSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHR4KSB7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc3RvcmVzID0gc3RvcmVOYW1lcy5tYXAoZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHR4LnN0b3JlKHN0b3JlTmFtZSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgaWYgKGNiKSBjYi5hcHBseSh0aGl6LCBzdG9yZXMpO1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoc3RvcmVzKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgIHJlamVjdChldmVudClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgQ2xhenplcih7fSlcclxuICAgICAgLnN0YXRpYygncmVhZG9ubHknLCBhY3Rpb24oaWRiVHJhbnNhY3Rpb24uVHJhbnNhY3Rpb25Nb2RlLlJFQURPTkxZKSlcclxuICAgICAgLnN0YXRpYygncmVhZHdyaXRlJywgYWN0aW9uKGlkYlRyYW5zYWN0aW9uLlRyYW5zYWN0aW9uTW9kZS5SRUFEV1JJVEUpKVxyXG4gICAgICAuY2xhenpcclxuXHJcbiAgfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkZhY3Rvcnkge1xyXG4gKiAgIElEQk9wZW5EQlJlcXVlc3Qgb3BlbihET01TdHJpbmcgbmFtZSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBsb25nIHZlcnNpb24pO1xyXG4gKiAgIElEQk9wZW5EQlJlcXVlc3QgZGVsZXRlRGF0YWJhc2UoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIHNob3J0IGNtcChhbnkgZmlyc3QsIGFueSBzZWNvbmQpO1xyXG4gKiB9O1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJEYXRhYmFzZSA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIHVuc2lnbmVkIGxvbmcgbG9uZyB2ZXJzaW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmdMaXN0ICAgICAgb2JqZWN0U3RvcmVOYW1lcztcclxuICogXHJcbiAqICAgSURCVHJhbnNhY3Rpb24gdHJhbnNhY3Rpb24oKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KSBzdG9yZU5hbWVzLCBvcHRpb25hbCBJREJUcmFuc2FjdGlvbk1vZGUgbW9kZSA9IFwicmVhZG9ubHlcIik7XHJcbiAqICAgdm9pZCAgICAgICAgICAgY2xvc2UoKTtcclxuICogICBJREJPYmplY3RTdG9yZSBjcmVhdGVPYmplY3RTdG9yZShET01TdHJpbmcgbmFtZSwgb3B0aW9uYWwgSURCT2JqZWN0U3RvcmVQYXJhbWV0ZXJzIG9wdGlvbnMpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGRlbGV0ZU9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lKTtcclxuICogXHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmFib3J0O1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25jbG9zZTtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uZXJyb3I7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnZlcnNpb25jaGFuZ2U7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBkaWN0aW9uYXJ5IElEQk9iamVjdFN0b3JlUGFyYW1ldGVycyB7XHJcbiAqICAgKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KT8ga2V5UGF0aCA9IG51bGw7XHJcbiAqICAgYm9vbGVhbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0luY3JlbWVudCA9IGZhbHNlO1xyXG4gKiB9O21lXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiU3RvcmUsIGlkYk1vZGVsMiwgaWRiT3BlbkRCUmVxdWVzdCwgaWRiVHJhbnNhY3Rpb24sICRsb2cpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyBFbiBsYSBzaWd1aWVudGUgbGluZWEsIHB1ZWRlIGluY2x1aXIgcHJlZmlqb3MgZGUgaW1wbGVtZW50YWNpb24gcXVlIHF1aWVyYSBwcm9iYXIuXG5cbiAgdmFyIGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQjtcbiAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxuICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcbiAgdmFyIElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcbiAgdmFyIElEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcbiAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcblxuICBpZiAoIWluZGV4ZWREQikge1xuICAgIGFsZXJ0KCdTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXMnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJG1lXG4gIC8vICRvcGVuZWRcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3IgIFxuICB2YXIgaWRiID0gZnVuY3Rpb24gaWRiKG5hbWUsIHZlcnNpb24sIHNvY2tldCkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbmFtZScsIG5hbWUpLnN0YXRpYygnJHZlcnNpb24nLCB2ZXJzaW9uKS5zdGF0aWMoJyRzb2NrZXQnLCBzb2NrZXQpLnN0YXRpYygnJHVwZ3JhZGVuZWVkZWRzJywgW10pLnN0YXRpYygnJG1vZGVscycsIFtdKTtcbiAgfTtcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGlkYilcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdldHRlcnNcbiAgLmdldHRlcignJG9iamVjdFN0b3JlTmFtZXMnLCAnb2JqZWN0U3RvcmVOYW1lcycpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGhhbmRsZXJzXG4gIC5oYW5kbGVyRXZlbnQoJ2Fib3J0ZWQnLCAnb25hYm9ydCcpLmhhbmRsZXJFdmVudCgnY2xvc2VkJywgJ29uY2xvc2UnKS5oYW5kbGVyRXZlbnQoJ2Vycm9yJywgJ29uZXJyb3InKS5oYW5kbGVyRXZlbnQoJ3ZlcnNpb25DaGFuZ2VkJywgJ29udmVyc2lvbmNoYW5nZScpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5zdGF0aWMoJ29wZW4nLCBmdW5jdGlvbiAobmFtZSwgdmVyc2lvbikge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJPcGVuREJSZXF1ZXN0KGluZGV4ZWREQi5vcGVuKG5hbWUsIHZlcnNpb24pKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLnN0YXRpYygnZHJvcCcsIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYk9wZW5EQlJlcXVlc3QoaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKG5hbWUpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLnN0YXRpYygnY21wJywgZnVuY3Rpb24gKGZpcnN0LCBzZWNvbmQpIHtcblxuICAgIHJldHVybiBpbmRleGVkREIuY21wKGZpcnN0LCBzZWNvbmQpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCd1cGdyYWRlbmVlZGVkJywgZnVuY3Rpb24gKGNiKSB7XG5cbiAgICB0aGlzLiR1cGdyYWRlbmVlZGVkcy5wdXNoKGNiKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnYXV0b21pZ3JhdGlvbicsIGZ1bmN0aW9uIChhbGxNaWdyYXRpb25zKSB7XG5cbiAgICByZXR1cm4gdGhpcy51cGdyYWRlbmVlZGVkKGZ1bmN0aW9uICh0aGl6LCBvcGVuUmVxdWVzdCwgZXZlbnQpIHtcbiAgICAgIE9iamVjdC5rZXlzKGFsbE1pZ3JhdGlvbnMpLm1hcChmdW5jdGlvbiAodmVyc2lvbikge1xuXG4gICAgICAgIGlmIChldmVudC5vbGRWZXJzaW9uIDwgdmVyc2lvbiAmJiB2ZXJzaW9uIDw9IGV2ZW50Lm5ld1ZlcnNpb24pIHtcblxuICAgICAgICAgIHZhciBtaWdyYXRpb25zID0gQXJyYXkuaXNBcnJheShhbGxNaWdyYXRpb25zW3ZlcnNpb25dKSA/IGFsbE1pZ3JhdGlvbnNbdmVyc2lvbl0gOiBbYWxsTWlncmF0aW9uc1t2ZXJzaW9uXV07XG5cbiAgICAgICAgICAkbG9nLmxvZygnbWlncmF0aW9uIHYnICsgdmVyc2lvbiArICcgc3RhcnRzJyk7XG4gICAgICAgICAgbWlncmF0aW9ucy5tYXAoZnVuY3Rpb24gKG1pZ3JhdGlvbikge1xuICAgICAgICAgICAgbWlncmF0aW9uKHRoaXosIG9wZW5SZXF1ZXN0LCBldmVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgJGxvZy5sb2coJ21pZ3JhdGlvbiB2JyArIHZlcnNpb24gKyAnIGVuZHMnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ29wZW4nLCBmdW5jdGlvbiAoY2IsIGNiRXJyKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIGxhc3RScSA9IG51bGw7XG4gICAgdmFyIGxhc3RFdmVudCA9IG51bGw7XG5cbiAgICBpZiAoIXRoaXouJG9wZW5lZCkge1xuXG4gICAgICB0aGl6LiRvcGVuZWQgPSAobGFzdFJxID0gaWRiLm9wZW4odGhpei4kbmFtZSwgdGhpei4kdmVyc2lvbikudXBncmFkZW5lZWRlZChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdGhpei4kbWUgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICB0aGl6LiR1cGdyYWRlbmVlZGVkcy5tYXAoZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgY2IuYXBwbHkodGhpeiwgW3RoaXosIGxhc3RScSwgZXZlbnRdKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdGhpei4kbWUgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICBsYXN0RXZlbnQgPSBldmVudDtcbiAgICAgICAgaWYgKGNiKSBjYih0aGl6LCBsYXN0UnEsIGV2ZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgbGFzdFJxID0gbnVsbDtcbiAgICAgICAgdGhpei4kb3BlbmVkID0gbnVsbDtcbiAgICAgICAgaWYgKGNiRXJyKSBjYkVycih0aGl6LCBsYXN0UnEsIGV2ZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGNiKSB7XG5cbiAgICAgIGNiKHRoaXosIGxhc3RScSwgbGFzdEV2ZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpei4kb3BlbmVkO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdkcm9wJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICB2YXIgcnEgPSBpZGIuZHJvcCh0aGl6LiRuYW1lKS5zdWNjZXNzKHJlc29sdmUpLmVycm9yKHJlamVjdCk7XG4gICAgICBpZiAoY2IpIGNiKHJxKTtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLiRtZS5jbG9zZSgpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdjcmVhdGVTdG9yZScsIGZ1bmN0aW9uIChuYW1lLCBvcHRpb25zKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLmNyZWF0ZU9iamVjdFN0b3JlKG5hbWUsIG9wdGlvbnMpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnZHJvcFN0b3JlJywgZnVuY3Rpb24gKG5hbWUpIHtcblxuICAgIHRoaXMuJG1lLmRlbGV0ZU9iamVjdFN0b3JlKG5hbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdtb2RlbCcsIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICAvLyBTaSBleGlzdGUgZWwgbW9kZWxvIHJldG9ybmFybG9cbiAgICBpZiAodGhpcy4kbW9kZWxzW25hbWVdKSByZXR1cm4gdGhpcy4kbW9kZWxzW25hbWVdO1xuXG4gICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG8geSBndWFyZGFybG9cbiAgICByZXR1cm4gdGhpcy4kbW9kZWxzW25hbWVdID0gaWRiTW9kZWwyKHRoaXMsIG5hbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCd0cmFuc2FjdGlvbicsIGZ1bmN0aW9uIChzdG9yZU5hbWVzLCBtb2RlKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHRoaXoub3BlbigpLnRoZW4oZnVuY3Rpb24gKHRoaXopIHtcbiAgICAgICAgcmVzb2x2ZShuZXcgaWRiVHJhbnNhY3Rpb24odGhpei4kbWUudHJhbnNhY3Rpb24oc3RvcmVOYW1lcywgbW9kZSkpKTtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZWplY3QoZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ3N0b3JlJywgZnVuY3Rpb24gKHN0b3JlTmFtZXMpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHN0b3JlTmFtZXMpKSBzdG9yZU5hbWVzID0gW3N0b3JlTmFtZXNdO1xuXG4gICAgZnVuY3Rpb24gYWN0aW9uKG1vZGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgIHRoaXoudHJhbnNhY3Rpb24oc3RvcmVOYW1lcywgbW9kZSkudGhlbihmdW5jdGlvbiAodHgpIHtcbiAgICAgICAgICAgIHZhciBzdG9yZXMgPSBzdG9yZU5hbWVzLm1hcChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0eC5zdG9yZShzdG9yZU5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY2IpIGNiLmFwcGx5KHRoaXosIHN0b3Jlcyk7XG4gICAgICAgICAgICByZXNvbHZlKHN0b3Jlcyk7XG4gICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICByZWplY3QoZXZlbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBDbGF6emVyKHt9KS5zdGF0aWMoJ3JlYWRvbmx5JywgYWN0aW9uKGlkYlRyYW5zYWN0aW9uLlRyYW5zYWN0aW9uTW9kZS5SRUFET05MWSkpLnN0YXRpYygncmVhZHdyaXRlJywgYWN0aW9uKGlkYlRyYW5zYWN0aW9uLlRyYW5zYWN0aW9uTW9kZS5SRUFEV1JJVEUpKS5jbGF6ejtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiU3RvcmVcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCT2JqZWN0U3RvcmUge1xyXG4gKiAgICAgICAgICAgIGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICBuYW1lO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBhbnkgICAgICAgICAgICBrZXlQYXRoO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmdMaXN0ICBpbmRleE5hbWVzO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbiB0cmFuc2FjdGlvbjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYm9vbGVhbiAgICAgICAgYXV0b0luY3JlbWVudDtcclxuICogXHJcbiAqICAgSURCUmVxdWVzdCBwdXQoYW55IHZhbHVlLCBvcHRpb25hbCBhbnkga2V5KTtcclxuICogICBJREJSZXF1ZXN0IGFkZChhbnkgdmFsdWUsIG9wdGlvbmFsIGFueSBrZXkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZGVsZXRlKGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBjbGVhcigpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRLZXkoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbChvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0QWxsS2V5cyhvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgY291bnQob3B0aW9uYWwgYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5DdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiAgIElEQlJlcXVlc3Qgb3BlbktleUN1cnNvcihvcHRpb25hbCBhbnkgcXVlcnksIG9wdGlvbmFsIElEQkN1cnNvckRpcmVjdGlvbiBkaXJlY3Rpb24gPSBcIm5leHRcIik7XHJcbiAqICAgSURCSW5kZXggICBpbmRleChET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgSURCSW5kZXggICBjcmVhdGVJbmRleChET01TdHJpbmcgbmFtZSwgKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KSBrZXlQYXRoLCBvcHRpb25hbCBJREJJbmRleFBhcmFtZXRlcnMgb3B0aW9ucyk7XHJcbiAqICAgdm9pZCAgICAgICBkZWxldGVJbmRleChET01TdHJpbmcgaW5kZXhOYW1lKTtcclxuICogfTtcclxuICogXHJcbiAqIGRpY3Rpb25hcnkgSURCSW5kZXhQYXJhbWV0ZXJzIHtcclxuICogICBib29sZWFuIHVuaXF1ZSA9IGZhbHNlO1xyXG4gKiAgIGJvb2xlYW4gbXVsdGlFbnRyeSA9IGZhbHNlO1xyXG4gKiB9O1xyXG4gKiBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJSZXF1ZXN0KSB7ICduZ0luamVjdCc7XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiU3RvcmUgKG1lKSB7XHJcblxyXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEdldHRlcnNcclxuICAuZ2V0dGVyKCckbmFtZScsICduYW1lJylcclxuICAuZ2V0dGVyKCcka2V5UGF0aCcsICdrZXlQYXRoJylcclxuICAuZ2V0dGVyKCckaW5kZXhOYW1lcycsICdpbmRleE5hbWVzJylcclxuICAuZ2V0dGVyKCckdHJhbnNhY3Rpb24nLCAndHJhbnNhY3Rpb24nKVxyXG4gIC5nZXR0ZXIoJyRhdXRvSW5jcmVtZW50JywgJ2F1dG9JbmNyZW1lbnQnKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCdwdXQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5wdXQodmFsdWUsIGtleSkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCdhZGQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5hZGQodmFsdWUsIGtleSkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCdkZWxldGUnLCBmdW5jdGlvbiAocXVlcnkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZGVsZXRlKHF1ZXJ5KSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ2NsZWFyJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5jbGVhcigpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnZ2V0JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldChxdWVyeSkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCdnZXRLZXknLCBmdW5jdGlvbiAocXVlcnkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0S2V5KHF1ZXJ5KSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ2dldEFsbCcsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0QWxsKHF1ZXJ5LCBjb3VudCkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCdnZXRBbGxLZXlzJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRBbGxLZXlzKHF1ZXJ5LCBjb3VudCkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCdjb3VudCcsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5jb3VudChxdWVyeSkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCdvcGVuQ3Vyc29yJywgZnVuY3Rpb24gKHF1ZXJ5LCBkaXJlY3Rpb24pIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUub3BlbkN1cnNvcihxdWVyeSwgZGlyZWN0aW9uKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ29wZW5LZXlDdXJzb3InLCBmdW5jdGlvbiAocXVlcnksIGRpcmVjdGlvbikge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5vcGVuS2V5Q3Vyc29yKHF1ZXJ5LCBkaXJlY3Rpb24pKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnaW5kZXgnLCBmdW5jdGlvbiAobmFtZSkge1xyXG5cclxuICAgIHRocm93ICdpZGJTdG9yZS5wcm90b3R5cGUuaW5kZXgnO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCdjcmVhdGVJbmRleCcsIGZ1bmN0aW9uIChuYW1lLCBrZXlQYXRoLCBvcHRpb25zKSB7XHJcblxyXG4gICAgdGhyb3cgJ2lkYlN0b3JlLnByb3RvdHlwZS5jcmVhdGVJbmRleCc7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ2RlbGV0ZUluZGV4JywgZnVuY3Rpb24gKGluZGV4TmFtZSkge1xyXG5cclxuICAgIHRoaXMuJG1lLmRlbGV0ZUluZGV4KGluZGV4TmFtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJTdG9yZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYlN0b3JlXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQk9iamVjdFN0b3JlIHtcclxuICogICAgICAgICAgICBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAga2V5UGF0aDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgaW5kZXhOYW1lcztcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb24gdHJhbnNhY3Rpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGJvb2xlYW4gICAgICAgIGF1dG9JbmNyZW1lbnQ7XHJcbiAqIFxyXG4gKiAgIElEQlJlcXVlc3QgcHV0KGFueSB2YWx1ZSwgb3B0aW9uYWwgYW55IGtleSk7XHJcbiAqICAgSURCUmVxdWVzdCBhZGQoYW55IHZhbHVlLCBvcHRpb25hbCBhbnkga2V5KTtcclxuICogICBJREJSZXF1ZXN0IGRlbGV0ZShhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgY2xlYXIoKTtcclxuICogICBJREJSZXF1ZXN0IGdldChhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0S2V5KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGwob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbEtleXMob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGNvdW50KG9wdGlvbmFsIGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuQ3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5LZXlDdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiAgIElEQkluZGV4ICAgaW5kZXgoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIElEQkluZGV4ICAgY3JlYXRlSW5kZXgoRE9NU3RyaW5nIG5hbWUsIChET01TdHJpbmcgb3Igc2VxdWVuY2U8RE9NU3RyaW5nPikga2V5UGF0aCwgb3B0aW9uYWwgSURCSW5kZXhQYXJhbWV0ZXJzIG9wdGlvbnMpO1xyXG4gKiAgIHZvaWQgICAgICAgZGVsZXRlSW5kZXgoRE9NU3RyaW5nIGluZGV4TmFtZSk7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBkaWN0aW9uYXJ5IElEQkluZGV4UGFyYW1ldGVycyB7XHJcbiAqICAgYm9vbGVhbiB1bmlxdWUgPSBmYWxzZTtcclxuICogICBib29sZWFuIG11bHRpRW50cnkgPSBmYWxzZTtcclxuICogfTtcclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiUmVxdWVzdCkge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiU3RvcmUobWUpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRuYW1lJywgJ25hbWUnKS5nZXR0ZXIoJyRrZXlQYXRoJywgJ2tleVBhdGgnKS5nZXR0ZXIoJyRpbmRleE5hbWVzJywgJ2luZGV4TmFtZXMnKS5nZXR0ZXIoJyR0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpLmdldHRlcignJGF1dG9JbmNyZW1lbnQnLCAnYXV0b0luY3JlbWVudCcpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ3B1dCcsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUucHV0KHZhbHVlLCBrZXkpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnYWRkJywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5hZGQodmFsdWUsIGtleSkpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdkZWxldGUnLCBmdW5jdGlvbiAocXVlcnkpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5kZWxldGUocXVlcnkpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnY2xlYXInLCBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuY2xlYXIoKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ2dldCcsIGZ1bmN0aW9uIChxdWVyeSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldChxdWVyeSkpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdnZXRLZXknLCBmdW5jdGlvbiAocXVlcnkpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRLZXkocXVlcnkpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnZ2V0QWxsJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldEFsbChxdWVyeSwgY291bnQpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnZ2V0QWxsS2V5cycsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRBbGxLZXlzKHF1ZXJ5LCBjb3VudCkpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdjb3VudCcsIGZ1bmN0aW9uIChxdWVyeSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNvdW50KHF1ZXJ5KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ29wZW5DdXJzb3InLCBmdW5jdGlvbiAocXVlcnksIGRpcmVjdGlvbikge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLm9wZW5DdXJzb3IocXVlcnksIGRpcmVjdGlvbikpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdvcGVuS2V5Q3Vyc29yJywgZnVuY3Rpb24gKHF1ZXJ5LCBkaXJlY3Rpb24pIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5vcGVuS2V5Q3Vyc29yKHF1ZXJ5LCBkaXJlY3Rpb24pKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnaW5kZXgnLCBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgdGhyb3cgJ2lkYlN0b3JlLnByb3RvdHlwZS5pbmRleCc7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ2NyZWF0ZUluZGV4JywgZnVuY3Rpb24gKG5hbWUsIGtleVBhdGgsIG9wdGlvbnMpIHtcblxuICAgIHRocm93ICdpZGJTdG9yZS5wcm90b3R5cGUuY3JlYXRlSW5kZXgnO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdkZWxldGVJbmRleCcsIGZ1bmN0aW9uIChpbmRleE5hbWUpIHtcblxuICAgIHRoaXMuJG1lLmRlbGV0ZUluZGV4KGluZGV4TmFtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiU3RvcmUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiTW9kZWxcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplcikgeyAnbmdJbmplY3QnO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQnVzY2FyIHVuIGNhbXBvXHJcbmNvbnN0IGRlZXBGaWVsZCA9IGZ1bmN0aW9uIChvYmosIGZpZWxkLCBjYikge1xyXG4gIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICBjb25zdCBmaWVsZHMgPSBmaWVsZC5zcGxpdCgnLicpO1xyXG4gIGNvbnN0IGxhc3RGaWVsZCA9IGZpZWxkcy5wb3AoKTtcclxuXHJcbiAgcmV0dXJuIChmdW5jdGlvbiBfc2V0KG9iaikge1xyXG4gICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMClcclxuICAgICAgcmV0dXJuIGNiKG9iaiwgbGFzdEZpZWxkKTtcclxuICAgIGNvbnN0IGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XHJcbiAgICBpZiAodHlwZW9mIG9ialtmaWVsZF0gPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICBvYmpbZmllbGRdID0ge307XHJcbiAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcclxuICB9KShvYmopO1xyXG5cclxufTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xyXG5jb25zdCBnZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gKG9iaiwgZmllbGQpIHtcclxuICByZXR1cm4gZGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXHJcbmNvbnN0IHNldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgdmFsdWUpIHtcclxuICBkZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xyXG4gIH0pO1xyXG4gIHJldHVybiBvYmo7XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5yZXR1cm4gZnVuY3Rpb24gaWRiTW9kZWxGYWN0b3J5IChkYiwgbmFtZSkge1xyXG5cclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYk1vZGVsKCkge1xyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByb3BpZWRhZGVzIHN0YXRpY2FzXHJcbiAgLnN0YXRpYygnJGRiJywgZGIpXHJcbiAgLnN0YXRpYygnJG5hbWUnLCBuYW1lKVxyXG4gIC5zdGF0aWMoJyRpZCcsIHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9KVxyXG4gIC5zdGF0aWMoJyRpbnN0YW5jZXMnLCBbXSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnc2V0S2V5UGF0aCcsIGZ1bmN0aW9uIChrZXlQYXRoKSB7XHJcblxyXG4gICAgdGhpcy4kaWQua2V5UGF0aCA9IGtleVBhdGg7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnc2V0QXV0b0luY3JlbWVudCcsIGZ1bmN0aW9uIChhdXRvSW5jcmVtZW50KSB7XHJcblxyXG4gICAgdGhpcy4kaWQuYXV0b0luY3JlbWVudCA9IGF1dG9JbmNyZW1lbnQ7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnY3JlYXRlU3RvcmUnLCBmdW5jdGlvbiAoY2IpIHtcclxuXHJcbiAgICBjb25zdCBzdG9yZSA9IHRoaXMuJGRiLmNyZWF0ZVN0b3JlKHRoaXMuJG5hbWUsIHRoaXMuJGlkKTtcclxuXHJcbiAgICBpZiAoY2IpIGNiKHRoaXMsIHN0b3JlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLnN0YXRpYygncHV0JywgZnVuY3Rpb24gKG9iaiwga2V5KSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuJGRiLnN0b3JlKHRoaXMuJG5hbWUpLnJlYWR3cml0ZSgpXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChzdG9yZXMpIHtcclxuICAgICAgICByZXR1cm4gc3RvcmVzWzBdLnB1dChvYmosIGtleSkuJHByb21pc2U7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59O31cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJNb2RlbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYk1vZGVsXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBCdXNjYXIgdW4gY2FtcG9cblxuICB2YXIgZGVlcEZpZWxkID0gZnVuY3Rpb24gZGVlcEZpZWxkKG9iaiwgZmllbGQsIGNiKSB7XG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICB2YXIgZmllbGRzID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICB2YXIgbGFzdEZpZWxkID0gZmllbGRzLnBvcCgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIF9zZXQob2JqKSB7XG4gICAgICBpZiAoZmllbGRzLmxlbmd0aCA9PSAwKSByZXR1cm4gY2Iob2JqLCBsYXN0RmllbGQpO1xuICAgICAgdmFyIGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XG4gICAgICBpZiAodHlwZW9mIG9ialtmaWVsZF0gPT09ICd1bmRlZmluZWQnKSBvYmpbZmllbGRdID0ge307XG4gICAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcbiAgICB9KG9iaik7XG4gIH07XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXG4gIHZhciBnZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gZ2V0RmllbGRWYWx1ZShvYmosIGZpZWxkKSB7XG4gICAgcmV0dXJuIGRlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cbiAgdmFyIHNldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiBzZXRGaWVsZFZhbHVlKG9iaiwgZmllbGQsIHZhbHVlKSB7XG4gICAgZGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgb2JqW2xhc3RGaWVsZF0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHJldHVybiBmdW5jdGlvbiBpZGJNb2RlbEZhY3RvcnkoZGIsIG5hbWUpIHtcblxuICAgIHJldHVybiBuZXdcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBDb25zdHJ1Y3RvclxuICAgIENsYXp6ZXIoZnVuY3Rpb24gaWRiTW9kZWwoKSB7fSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFByb3BpZWRhZGVzIHN0YXRpY2FzXG4gICAgLnN0YXRpYygnJGRiJywgZGIpLnN0YXRpYygnJG5hbWUnLCBuYW1lKS5zdGF0aWMoJyRpZCcsIHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9KS5zdGF0aWMoJyRpbnN0YW5jZXMnLCBbXSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJ3NldEtleVBhdGgnLCBmdW5jdGlvbiAoa2V5UGF0aCkge1xuXG4gICAgICB0aGlzLiRpZC5rZXlQYXRoID0ga2V5UGF0aDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCdzZXRBdXRvSW5jcmVtZW50JywgZnVuY3Rpb24gKGF1dG9JbmNyZW1lbnQpIHtcblxuICAgICAgdGhpcy4kaWQuYXV0b0luY3JlbWVudCA9IGF1dG9JbmNyZW1lbnQ7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnY3JlYXRlU3RvcmUnLCBmdW5jdGlvbiAoY2IpIHtcblxuICAgICAgdmFyIHN0b3JlID0gdGhpcy4kZGIuY3JlYXRlU3RvcmUodGhpcy4kbmFtZSwgdGhpcy4kaWQpO1xuXG4gICAgICBpZiAoY2IpIGNiKHRoaXMsIHN0b3JlKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSkuc3RhdGljKCdwdXQnLCBmdW5jdGlvbiAob2JqLCBrZXkpIHtcblxuICAgICAgcmV0dXJuIHRoaXMuJGRiLnN0b3JlKHRoaXMuJG5hbWUpLnJlYWR3cml0ZSgpLnRoZW4oZnVuY3Rpb24gKHN0b3Jlcykge1xuICAgICAgICByZXR1cm4gc3RvcmVzWzBdLnB1dChvYmosIGtleSkuJHByb21pc2U7XG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLmNsYXp6O1xuICB9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJNb2RlbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBDbGF6emVyXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIGZ1bmN0aW9uIENsYXp6ZXIgKGNvbnN0cnVjdG9yKSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NsYXp6JywgeyB2YWx1ZTogY29uc3RydWN0b3IgfHwgZnVuY3Rpb24gKCkge30gfSk7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdpbmhlcml0Jywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChwYXJlbnQpIHtcclxuICAgICAgbGV0IHRtcCA9IGZ1bmN0aW9uKCkge307XHJcbiAgICAgIHRtcC5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xyXG4gICAgICB0aGlzLmNsYXp6LnByb3RvdHlwZSA9IG5ldyB0bXAoKTtcclxuICAgICAgdGhpcy5jbGF6ei5wcm90b3R5cGUuY29uc3RydWN0b3IgPSB0aGlzLmNsYXp6O1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnc3RhdGljJywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jbGF6eiwgbmFtZSwge1xyXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3Byb3BlcnR5Jywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChuYW1lLCBvcHRzKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmNsYXp6LnByb3RvdHlwZSwgbmFtZSwgb3B0cyk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdtZXRob2QnLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKG5hbWUsIGZ1bmMpIHtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShuYW1lLCB7XHJcbiAgICAgICAgdmFsdWU6IGZ1bmNcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdnZXR0ZXInLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKGZyb20sIHRvKSB7XHJcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy4kbWVbdG9dO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdzZXR0ZXInLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKGZyb20sIHRvKSB7XHJcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgIHRoaXMuJG1lW3RvXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdoYW5kbGVyRXZlbnQnLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKGZyb20sIHRvKSB7XHJcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XHJcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgdGhpcy4kbWVbdG9dID0gY2I7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgcmV0dXJuIENsYXp6ZXI7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvQ2xhenplci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIENsYXp6ZXJcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG5cbiAgZnVuY3Rpb24gQ2xhenplcihjb25zdHJ1Y3Rvcikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY2xhenonLCB7IHZhbHVlOiBjb25zdHJ1Y3RvciB8fCBmdW5jdGlvbiAoKSB7fSB9KTtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdpbmhlcml0Jywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShwYXJlbnQpIHtcbiAgICAgIHZhciB0bXAgPSBmdW5jdGlvbiB0bXAoKSB7fTtcbiAgICAgIHRtcC5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xuICAgICAgdGhpcy5jbGF6ei5wcm90b3R5cGUgPSBuZXcgdG1wKCk7XG4gICAgICB0aGlzLmNsYXp6LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHRoaXMuY2xheno7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdzdGF0aWMnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKG5hbWUsIF92YWx1ZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuY2xhenosIG5hbWUsIHtcbiAgICAgICAgdmFsdWU6IF92YWx1ZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdwcm9wZXJ0eScsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobmFtZSwgb3B0cykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuY2xhenoucHJvdG90eXBlLCBuYW1lLCBvcHRzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ21ldGhvZCcsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobmFtZSwgZnVuYykge1xuICAgICAgdGhpcy5wcm9wZXJ0eShuYW1lLCB7XG4gICAgICAgIHZhbHVlOiBmdW5jXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ2dldHRlcicsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZnJvbSwgdG8pIHtcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy4kbWVbdG9dO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3NldHRlcicsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZnJvbSwgdG8pIHtcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuJG1lW3RvXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ2hhbmRsZXJFdmVudCcsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZnJvbSwgdG8pIHtcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoY2IpIHtcbiAgICAgICAgICB0aGlzLiRtZVt0b10gPSBjYjtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICByZXR1cm4gQ2xhenplcjtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvQ2xhenplci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpbywgJGxvZykgeyAnbmdJbmplY3QnO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRzb2NrZXRcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBjb25zdCBpZGJTb2NrZXQgPSBmdW5jdGlvbiBpZGJTb2NrZXQodXJsLCAkYWNjZXNzVG9rZW5JZCwgJGN1cnJlbnRVc2VySWQpe1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpXHJcbiAgICAgIC5zdGF0aWMoJyR1cmwnLCB1cmwgfHwgaWRiU29ja2V0LiRkZWZVcmxTZXJ2ZXIpXHJcbiAgICAgIC5zdGF0aWMoJyRhY2Nlc3NUb2tlbklkJywgYWNjZXNzVG9rZW5JZCB8fCBpZGJTb2NrZXQuJGRlZkFjY2Vzc1Rva2VuSWQpXHJcbiAgICAgIC5zdGF0aWMoJyRjdXJyZW50VXNlcklkJywgY3VycmVudFVzZXJJZCB8fCBpZGJTb2NrZXQuJGRlZkN1cnJlbnRVc2VySWQpXHJcbiAgICAgIFxyXG4gICAgICAuc3RhdGljKCckbGlzdGVuZXJzJywgW10pO1xyXG5cclxuICAgIHRoaXouY29ubmVjdCgpO1xyXG5cclxuICB9O1xyXG5cclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGlkYlNvY2tldClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uZWN0YXJzZSBhbCBzZXJ2aWRvclxyXG4gIC5tZXRob2QoJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8gQ3JlYXRpbmcgY29ubmVjdGlvbiB3aXRoIHNlcnZlclxyXG4gICAgY29uc3Qgc29ja2V0ID0gdGhpcy4kc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsKTtcclxuXHJcbiAgICAvLyBUaGlzIHBhcnQgaXMgb25seSBmb3IgbG9naW4gdXNlcnMgZm9yIGF1dGhlbnRpY2F0ZWQgJHNvY2tldCBjb25uZWN0aW9uIGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIuXHJcbiAgICAvLyBJZiB5b3UgYXJlIG5vdCB1c2luZyBsb2dpbiBwYWdlIGluIHlvdSB3ZWJzaXRlIHRoZW4geW91IHNob3VsZCByZW1vdmUgcmVzdCBwaWVjZSBvZiBjb2RlLi5cclxuICAgIHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICRsb2cubG9nKCdjb25uZWN0ZWQnKTtcclxuXHJcbiAgICAgIHNvY2tldC5lbWl0KCdhdXRoZW50aWNhdGlvbicsIHtcclxuICAgICAgICBpZDogJGFjY2Vzc1Rva2VuSWQsXHJcbiAgICAgICAgdXNlcklkOiAkY3VycmVudFVzZXJJZCxcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICBzb2NrZXQub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyB1c2UgdGhlICRzb2NrZXQgYXMgdXN1YWxcclxuICAgICAgICAkbG9nLmxvZygnVXNlciBpcyBhdXRoZW50aWNhdGVkJyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCdzdWJzY3JpYmUnLCBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcclxuXHJcbiAgICBsZXQgbmFtZSA9IG9wdGlvbnMubW9kZWxOYW1lICsgJy4nICsgb3B0aW9ucy5ldmVudE5hbWU7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIG5hbWUgPSBuYW1lICsgJy4nICsgb3B0aW9ucy5tb2RlbElkO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuJHNvY2tldC5vbihuYW1lLCBjYik7XHJcbiAgICBcclxuICAgIC8vUHVzaCB0aGUgY29udGFpbmVyLi5cclxuICAgIHRoaXMuJGxpc3RlbmVycy5wdXNoKG5hbWUsIGNiKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgncHVzaExpc3RlbmVyJywgZnVuY3Rpb24gKHN1YnNjcmlwdGlvbk5hbWUsIGNiKSB7XHJcblxyXG4gICAgdGhpcy4kbGlzdGVuZXJzLnB1c2goc3Vic2NyaXB0aW9uTmFtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ3Vuc3Vic2NyaWJlJyxmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSkge1xyXG5cclxuICAgIHRoaXMuJHNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMoc3Vic2NyaXB0aW9uTmFtZSk7ICBcclxuICAgIHZhciBpZHggPSB0aGlzLiRsaXN0ZW5lcnMuaW5kZXhPZihzdWJzY3JpcHRpb25OYW1lKTtcclxuICAgIGlmIChpZHggIT0gLTEpe1xyXG4gICAgICB0aGlzLiRsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICB9XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFzaWduYSBsYSBVUkwgZGUgc2Vydmlkb3IgcG9yIGRlZmVjdG9cclxuICAuc3RhdGljKCdzZXRVcmxTZXJ2ZXInLCBmdW5jdGlvbiAodXJsKSB7XHJcblxyXG4gICAgdGhpcy4kZGVmVXJsU2VydmVyID0gdXJsO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXHJcbiAgLnN0YXRpYygnc2V0Q3JlZGVudGlhbHMnLCBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCkge1xyXG5cclxuICAgIHRoaXMuJGRlZkFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xyXG4gICAgdGhpcy4kZGVmQ3VycmVudFVzZXJJZCA9IGN1cnJlbnRVc2VySWQ7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zZXRVcmxTZXJ2ZXIobnVsbClcclxuICAuc2V0Q3JlZGVudGlhbHMobnVsbCwgbnVsbCk7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiU29ja2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaW8sICRsb2cpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJHNvY2tldFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuXG4gIHZhciBpZGJTb2NrZXQgPSBmdW5jdGlvbiBpZGJTb2NrZXQodXJsLCAkYWNjZXNzVG9rZW5JZCwgJGN1cnJlbnRVc2VySWQpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJHVybCcsIHVybCB8fCBpZGJTb2NrZXQuJGRlZlVybFNlcnZlcikuc3RhdGljKCckYWNjZXNzVG9rZW5JZCcsIGFjY2Vzc1Rva2VuSWQgfHwgaWRiU29ja2V0LiRkZWZBY2Nlc3NUb2tlbklkKS5zdGF0aWMoJyRjdXJyZW50VXNlcklkJywgY3VycmVudFVzZXJJZCB8fCBpZGJTb2NrZXQuJGRlZkN1cnJlbnRVc2VySWQpLnN0YXRpYygnJGxpc3RlbmVycycsIFtdKTtcblxuICAgIHRoaXouY29ubmVjdCgpO1xuICB9O1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoaWRiU29ja2V0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXG4gIC5tZXRob2QoJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyBDcmVhdGluZyBjb25uZWN0aW9uIHdpdGggc2VydmVyXG4gICAgdmFyIHNvY2tldCA9IHRoaXMuJHNvY2tldCA9IGlvLmNvbm5lY3QoJHVybCk7XG5cbiAgICAvLyBUaGlzIHBhcnQgaXMgb25seSBmb3IgbG9naW4gdXNlcnMgZm9yIGF1dGhlbnRpY2F0ZWQgJHNvY2tldCBjb25uZWN0aW9uIGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIuXG4gICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXG4gICAgc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgJGxvZy5sb2coJ2Nvbm5lY3RlZCcpO1xuXG4gICAgICBzb2NrZXQuZW1pdCgnYXV0aGVudGljYXRpb24nLCB7XG4gICAgICAgIGlkOiAkYWNjZXNzVG9rZW5JZCxcbiAgICAgICAgdXNlcklkOiAkY3VycmVudFVzZXJJZFxuICAgICAgfSk7XG5cbiAgICAgIHNvY2tldC5vbignYXV0aGVudGljYXRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdXNlIHRoZSAkc29ja2V0IGFzIHVzdWFsXG4gICAgICAgICRsb2cubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdzdWJzY3JpYmUnLCBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcblxuICAgIHZhciBuYW1lID0gb3B0aW9ucy5tb2RlbE5hbWUgKyAnLicgKyBvcHRpb25zLmV2ZW50TmFtZTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tb2RlbElkID09PSAnbnVtYmVyJykge1xuICAgICAgbmFtZSA9IG5hbWUgKyAnLicgKyBvcHRpb25zLm1vZGVsSWQ7XG4gICAgfVxuXG4gICAgdGhpcy4kc29ja2V0Lm9uKG5hbWUsIGNiKTtcblxuICAgIC8vUHVzaCB0aGUgY29udGFpbmVyLi5cbiAgICB0aGlzLiRsaXN0ZW5lcnMucHVzaChuYW1lLCBjYik7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ3B1c2hMaXN0ZW5lcicsIGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lLCBjYikge1xuXG4gICAgdGhpcy4kbGlzdGVuZXJzLnB1c2goc3Vic2NyaXB0aW9uTmFtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ3Vuc3Vic2NyaWJlJywgZnVuY3Rpb24gKHN1YnNjcmlwdGlvbk5hbWUpIHtcblxuICAgIHRoaXMuJHNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMoc3Vic2NyaXB0aW9uTmFtZSk7XG4gICAgdmFyIGlkeCA9IHRoaXMuJGxpc3RlbmVycy5pbmRleE9mKHN1YnNjcmlwdGlvbk5hbWUpO1xuICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgIHRoaXMuJGxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEFzaWduYSBsYSBVUkwgZGUgc2Vydmlkb3IgcG9yIGRlZmVjdG9cbiAgLnN0YXRpYygnc2V0VXJsU2VydmVyJywgZnVuY3Rpb24gKHVybCkge1xuXG4gICAgdGhpcy4kZGVmVXJsU2VydmVyID0gdXJsO1xuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBU2lnbmEgbGFzIGNyZWRlbmNpYWxlcyBwb3IgZGVmZWN0b1xuICAuc3RhdGljKCdzZXRDcmVkZW50aWFscycsIGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XG5cbiAgICB0aGlzLiRkZWZBY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICB0aGlzLiRkZWZDdXJyZW50VXNlcklkID0gY3VycmVudFVzZXJJZDtcbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5zZXRVcmxTZXJ2ZXIobnVsbCkuc2V0Q3JlZGVudGlhbHMobnVsbCwgbnVsbCk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlNvY2tldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxiIChtb2R1bGUpIHtcclxuXHJcbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcclxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xyXG4gICAgY29uc3QgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xyXG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGxldCB1cmxCYXNlSG9zdCA9IGxvY2F0aW9uLmhvc3Q7XHJcblxyXG4gIGNvbnN0IGxiQXV0aCA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnXHJcbiAgICBjb25zdCBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcclxuICAgIGNvbnN0IHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcclxuICAgIFxyXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcclxuICAgIC8vIFdlIGFyZSB1c2luZyBlbXB0eSBzdHJpbmcgYXMgYSBtYXJrZXIgZm9yIG51bGwvdW5kZWZpbmVkIHZhbHVlcy5cclxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XHJcbiAgICAgICAgc3RvcmFnZVtrZXldID0gdmFsdWU7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZChuYW1lKSB7XHJcbiAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVtrZXldIHx8IHNlc3Npb25TdG9yYWdlW2tleV0gfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsYkF1dGgoKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpeltuYW1lXSA9IGxvYWQobmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBjb25zdCBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbihhY2Nlc3NUb2tlbklkLCB1c2VySWQsIHVzZXJEYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc2Vzc2lvblN0b3JhZ2UsIG5hbWUsIG51bGwpO1xyXG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XHJcblxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uKCRxLCBsYkF1dGgpIHsgJ25nSW5qZWN0JztcclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVxdWVzdDogZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xyXG4gICAgICAgIGNvbnN0IGhvc3QgPSBnZXRIb3N0KGNvbmZpZy51cmwpO1xyXG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XHJcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XHJcbiAgICAgICAgICBjb25maWcuaGVhZGVyc1thdXRoSGVhZGVyXSA9IGxiQXV0aC5hY2Nlc3NUb2tlbklkO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XHJcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxyXG4gICAgICAgICAgLy8gdGhlcmUgaXMgbm8gdXNlciBsb2dnZWQgaW5cclxuICAgICAgICAgIGNvbnN0IHJlcyA9IHtcclxuICAgICAgICAgICAgYm9keTogeyBlcnJvcjogeyBzdGF0dXM6IDQwMSB9fSxcclxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXHJcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbigpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnOyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcclxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nLFxyXG4gICAgfTtcclxuXHJcbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyIFRoZSBoZWFkZXIgbmFtZSB0byB1c2UsIGUuZy4gYFgtQWNjZXNzLVRva2VuYFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25maWd1cmUgdGhlIFJFU1QgdHJhbnNwb3J0IHRvIHVzZSBhIGRpZmZlcmVudCBoZWFkZXIgZm9yIHNlbmRpbmdcclxuICAgICAqIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi4gSXQgaXMgc2VudCBpbiB0aGUgYEF1dGhvcml6YXRpb25gIGhlYWRlclxyXG4gICAgICogYnkgZGVmYXVsdC5cclxuICAgICAqL1xyXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oaGVhZGVyKSB7XHJcbiAgICAgIG9wdGlvbnMuYXV0aEhlYWRlciA9IGhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBoZWFkZXIgbmFtZSB0aGF0IGlzIHVzZWQgZm9yIHNlbmRpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB1c2UsIGUuZy4gYC9hcGlgIG9yIGAvL2V4YW1wbGUuY29tL2FwaWAuXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENoYW5nZSB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIEJ5IGRlZmF1bHQsIHRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgb3B0aW9ucy51cmxCYXNlID0gdXJsO1xyXG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xyXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uKCRyZXNvdXJjZSkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xyXG4gICAgICAgICAgYWN0aW9uc1trZXldLnVybCA9IG9wdGlvbnMudXJsQmFzZSArIGFjdGlvbnNba2V5XS51cmw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcclxuXHJcbiAgICAgICAgLy8gQW5ndWxhciBhbHdheXMgY2FsbHMgUE9TVCBvbiAkc2F2ZSgpXHJcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXHJcbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xyXG4gICAgICAgIHJlc291cmNlLnByb3RvdHlwZS4kc2F2ZSA9IGZ1bmN0aW9uKHN1Y2Nlc3MsIGVycm9yKSB7XHJcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxyXG4gICAgICAgICAgLy8gdGhhdCBleGFjdGx5IGZpdHMgb3VyIG5lZWRzLlxyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcclxuICAgICAgICAgIHJldHVybiByZXN1bHQuJHByb21pc2UgfHwgcmVzdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XHJcbiAgICAgIH07XHJcbiAgICBcclxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kdWxlXHJcbiAgICAuZmFjdG9yeSgnbGJBdXRoJywgbGJBdXRoKVxyXG4gICAgLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSlcclxuICAgIC5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpXHJcbiAgICAuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uKCRodHRwUHJvdmlkZXIpIHsgJ25nSW5qZWN0JztcclxuICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XHJcbiAgICB9XSk7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvbGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBsYjtcbmZ1bmN0aW9uIGxiKG1vZHVsZSkge1xuXG4gIC8vIER2dWVsdmUgZWwgaG9zdCBkZSB1bmEgVVJMXG4gIGZ1bmN0aW9uIGdldEhvc3QodXJsKSB7XG4gICAgdmFyIG0gPSB1cmwubWF0Y2goL14oPzpodHRwcz86KT9cXC9cXC8oW15cXC9dKykvKTtcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBudWxsO1xuICB9XG5cbiAgdmFyIHVybEJhc2VIb3N0ID0gbG9jYXRpb24uaG9zdDtcblxuICB2YXIgbGJBdXRoID0gZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB2YXIgcHJvcHMgPSBbJ2FjY2Vzc1Rva2VuSWQnLCAnY3VycmVudFVzZXJJZCcsICdyZW1lbWJlck1lJ107XG4gICAgdmFyIHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcblxuICAgIC8vIE5vdGU6IExvY2FsU3RvcmFnZSBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gc3RyaW5nXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9ICcnO1xuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2Fubm90IGFjY2VzcyBsb2NhbC9zZXNzaW9uIHN0b3JhZ2U6JywgZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGl6W25hbWVdID0gbG9hZChuYW1lKTtcbiAgICAgIH0pO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zZXRVc2VyID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IHVzZXJEYXRhO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyVXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzZXNzaW9uU3RvcmFnZSwgbmFtZSwgbnVsbCk7XG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IGxiQXV0aCgpO1xuICB9O1xuXG4gIHZhciBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbiBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IoJHEsIGxiQXV0aCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVxdWVzdDogZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xuICAgICAgICB2YXIgaG9zdCA9IGdldEhvc3QoY29uZmlnLnVybCk7XG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYkF1dGguYWNjZXNzVG9rZW5JZCkge1xuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzW2F1dGhIZWFkZXJdID0gbGJBdXRoLmFjY2Vzc1Rva2VuSWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XG4gICAgICAgICAgLy8gUmV0dXJuIGEgc3R1YiA0MDEgZXJyb3IgZm9yIFVzZXIuZ2V0Q3VycmVudCgpIHdoZW5cbiAgICAgICAgICAvLyB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpblxuICAgICAgICAgIHZhciByZXMgPSB7XG4gICAgICAgICAgICBib2R5OiB7IGVycm9yOiB7IHN0YXR1czogNDAxIH0gfSxcbiAgICAgICAgICAgIHN0YXR1czogNDAxLFxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbiBoZWFkZXJzKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKCkge1xuICAgICduZ0luamVjdCc7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcbiAgICAgIGF1dGhIZWFkZXI6ICdhdXRob3JpemF0aW9uJ1xuICAgIH07XG5cbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXIgVGhlIGhlYWRlciBuYW1lIHRvIHVzZSwgZS5nLiBgWC1BY2Nlc3MtVG9rZW5gXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENvbmZpZ3VyZSB0aGUgUkVTVCB0cmFuc3BvcnQgdG8gdXNlIGEgZGlmZmVyZW50IGhlYWRlciBmb3Igc2VuZGluZ1xyXG4gICAgICogdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLiBJdCBpcyBzZW50IGluIHRoZSBgQXV0aG9yaXphdGlvbmAgaGVhZGVyXHJcbiAgICAgKiBieSBkZWZhdWx0LlxyXG4gICAgICovXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKGhlYWRlcikge1xuICAgICAgb3B0aW9ucy5hdXRoSGVhZGVyID0gaGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIGhlYWRlciBuYW1lIHRoYXQgaXMgdXNlZCBmb3Igc2VuZGluZyB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uXHJcbiAgICAgKi9cbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHVzZSwgZS5nLiBgL2FwaWAgb3IgYC8vZXhhbXBsZS5jb20vYXBpYC5cclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ2hhbmdlIHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gQnkgZGVmYXVsdCwgdGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICBvcHRpb25zLnVybEJhc2UgPSB1cmw7XG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XG4gICAgfTtcblxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcbiAgICAgICduZ0luamVjdCc7XG5cbiAgICAgIHZhciBsYlJlc291cmNlID0gZnVuY3Rpb24gbGJSZXNvdXJjZSh1cmwsIHBhcmFtcywgYWN0aW9ucykge1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgYWN0aW9uc1trZXldLm9yaWdpbmFsVXJsID0gYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgICBhY3Rpb25zW2tleV0udXJsID0gb3B0aW9ucy51cmxCYXNlICsgYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcblxuICAgICAgICAvLyBBbmd1bGFyIGFsd2F5cyBjYWxscyBQT1NUIG9uICRzYXZlKClcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXG4gICAgICAgIC8vIGh0dHA6Ly9raXJrYnVzaGVsbC5tZS9hbmd1bGFyLWpzLXVzaW5nLW5nLXJlc291cmNlLWluLWEtbW9yZS1yZXN0ZnVsLW1hbm5lci9cbiAgICAgICAgcmVzb3VyY2UucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgLy8gRm9ydHVuYXRlbHksIExvb3BCYWNrIHByb3ZpZGVzIGEgY29udmVuaWVudCBgdXBzZXJ0YCBtZXRob2RcbiAgICAgICAgICAvLyB0aGF0IGV4YWN0bHkgZml0cyBvdXIgbmVlZHMuXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc291cmNlLnVwc2VydC5jYWxsKHRoaXMsIHt9LCB0aGlzLCBzdWNjZXNzLCBlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC4kcHJvbWlzZSB8fCByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXNvdXJjZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBsYlJlc291cmNlO1xuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIG1vZHVsZS5mYWN0b3J5KCdsYkF1dGgnLCBsYkF1dGgpLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSkuZmFjdG9yeSgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJywgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yKS5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XG4gIH1dKTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9sYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJUcmFuc2FjdGlvblxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJUcmFuc2FjdGlvbiA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgICAgIG9iamVjdFN0b3JlTmFtZXM7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJEYXRhYmFzZSAgICAgICAgZGI7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTUV4Y2VwdGlvbiAgICAgICBlcnJvcjtcclxuICogXHJcbiAqICAgSURCT2JqZWN0U3RvcmUgb2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGFib3J0KCk7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25hYm9ydDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uY29tcGxldGU7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZW51bSBJREJUcmFuc2FjdGlvbk1vZGUge1xyXG4gKiAgIFwicmVhZG9ubHlcIixcclxuICogICBcInJlYWR3cml0ZVwiLFxyXG4gKiAgIFwidmVyc2lvbmNoYW5nZVwiXHJcbiAqIH07XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiU3RvcmUpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRfcHJvbWlzZVxyXG4gIFxyXG4gIGNvbnN0IFRyYW5zYWN0aW9uTW9kZSA9IG5ldyBDbGF6emVyKHt9KVxyXG4gICAgICAgIC5zdGF0aWMoJ1JFQURPTkxZJywgJ3JlYWRvbmx5JylcclxuICAgICAgICAuc3RhdGljKCdSRUFEV1JJVEUnLCAncmVhZHdyaXRlJylcclxuICAgICAgICAuc3RhdGljKCdWRVJTSU9OQ0hBTkdFJywgICd2ZXJzaW9uY2hhbmdlJyk7XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiVHJhbnNhY3Rpb24gKG1lKSB7XHJcbiAgICBcclxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBTdGF0aWNzXHJcbiAgLnN0YXRpYygnVHJhbnNhY3Rpb25Nb2RlJywgVHJhbnNhY3Rpb25Nb2RlLmNsYXp6KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJGRiJywgICAgICAgICAgICAgICAgJ2RiJylcclxuICAuZ2V0dGVyKCckbW9kZScsICAgICAgICAgICAgICAnbW9kZScpXHJcbiAgLmdldHRlcignJGVycm9yJywgICAgICAgICAgICAgJ2Vycm9yJylcclxuICAuZ2V0dGVyKCckb2JqZWN0U3RvcmVOYW1lcycsICAnb2JqZWN0U3RvcmVOYW1lcycpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEV2ZW50IGhhbmRsZXJzXHJcbiAgLmhhbmRsZXJFdmVudCgnYWJvcnRlZCcsICdvbmFib3J0JylcclxuICAuaGFuZGxlckV2ZW50KCdjb21wbGV0ZWQnLCAnb25jb21wbGV0ZScpXHJcbiAgLmhhbmRsZXJFdmVudCgnZXJyb3InLCAnb25lcnJvcicpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ3N0b3JlJywgZnVuY3Rpb24obmFtZSl7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJTdG9yZSh0aGlzLiRtZS5vYmplY3RTdG9yZShuYW1lKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJ2Fib3J0JywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICB0aGlzLiRtZS5hYm9ydCgpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9wZXJ0eVxyXG4gIC5wcm9wZXJ0eSgnJHByb21pc2UnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlmICh0aGl6LiRfcHJvbWlzZSkgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgICAgLy8gQ3JlYXIgcHJvbWlzZSBwYXJhIGVsIHJlcXVlc3RcclxuICAgICAgdGhpei4kX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdGhpei5jb21wbGV0ZWQoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZXNvbHZlKGV2ZW50KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5lcnJvcihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlamVjdChldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbmV3IENsYXp6ZXIodGhpei4kX3Byb21pc2UpLnN0YXRpYygnJHRyYW5zYWN0aW9uJywgdGhpeik7XHJcblxyXG4gICAgICByZXR1cm4gdGhpei4kX3Byb21pc2U7XHJcblxyXG4gICAgfVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiVHJhbnNhY3Rpb24uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJUcmFuc2FjdGlvblxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJUcmFuc2FjdGlvbiA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgICAgIG9iamVjdFN0b3JlTmFtZXM7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJEYXRhYmFzZSAgICAgICAgZGI7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTUV4Y2VwdGlvbiAgICAgICBlcnJvcjtcclxuICogXHJcbiAqICAgSURCT2JqZWN0U3RvcmUgb2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGFib3J0KCk7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25hYm9ydDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uY29tcGxldGU7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZW51bSBJREJUcmFuc2FjdGlvbk1vZGUge1xyXG4gKiAgIFwicmVhZG9ubHlcIixcclxuICogICBcInJlYWR3cml0ZVwiLFxyXG4gKiAgIFwidmVyc2lvbmNoYW5nZVwiXHJcbiAqIH07XHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiU3RvcmUpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJF9wcm9taXNlXG5cbiAgdmFyIFRyYW5zYWN0aW9uTW9kZSA9IG5ldyBDbGF6emVyKHt9KS5zdGF0aWMoJ1JFQURPTkxZJywgJ3JlYWRvbmx5Jykuc3RhdGljKCdSRUFEV1JJVEUnLCAncmVhZHdyaXRlJykuc3RhdGljKCdWRVJTSU9OQ0hBTkdFJywgJ3ZlcnNpb25jaGFuZ2UnKTtcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlRyYW5zYWN0aW9uKG1lKSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFN0YXRpY3NcbiAgLnN0YXRpYygnVHJhbnNhY3Rpb25Nb2RlJywgVHJhbnNhY3Rpb25Nb2RlLmNsYXp6KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRkYicsICdkYicpLmdldHRlcignJG1vZGUnLCAnbW9kZScpLmdldHRlcignJGVycm9yJywgJ2Vycm9yJykuZ2V0dGVyKCckb2JqZWN0U3RvcmVOYW1lcycsICdvYmplY3RTdG9yZU5hbWVzJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRXZlbnQgaGFuZGxlcnNcbiAgLmhhbmRsZXJFdmVudCgnYWJvcnRlZCcsICdvbmFib3J0JykuaGFuZGxlckV2ZW50KCdjb21wbGV0ZWQnLCAnb25jb21wbGV0ZScpLmhhbmRsZXJFdmVudCgnZXJyb3InLCAnb25lcnJvcicpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJ3N0b3JlJywgZnVuY3Rpb24gKG5hbWUpIHtcblxuICAgIHJldHVybiBuZXcgaWRiU3RvcmUodGhpcy4kbWUub2JqZWN0U3RvcmUobmFtZSkpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCdhYm9ydCcsIGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuJG1lLmFib3J0KCk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFByb3BlcnR5XG4gIC5wcm9wZXJ0eSgnJHByb21pc2UnLCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlmICh0aGl6LiRfcHJvbWlzZSkgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xuXG4gICAgICAvLyBDcmVhciBwcm9taXNlIHBhcmEgZWwgcmVxdWVzdFxuICAgICAgdGhpei4kX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRoaXouY29tcGxldGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xuICAgICAgICB9KS5lcnJvcihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBuZXcgQ2xhenplcih0aGl6LiRfcHJvbWlzZSkuc3RhdGljKCckdHJhbnNhY3Rpb24nLCB0aGl6KTtcblxuICAgICAgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xuICAgIH1cblxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlRyYW5zYWN0aW9uLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==