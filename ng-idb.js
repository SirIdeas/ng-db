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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmJjZGU3OTg5NGQ1ODlkZmFlODciLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiVXRpbHMuanM/MWJiNCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJFdmVudHMuanM/NDg2YSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3FzLmpzPzY0MzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiLmpzPzYzNTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qcz9mOWY5Iiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanM/Zjc3YSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJTb2NrZXQuanM/ZDFhMSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvbGIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2xiLmpzPzMwMDYiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnN0YW50IiwiaW8iLCJzZXJ2aWNlIiwiaWRiVXRpbHMiLCIkcSIsInZhbGlkYXRvcnMiLCJjYWxsYmFjayIsInZhbHVlIiwidW5kZWZpbmVkIiwiYXJyYXkiLCJBcnJheSIsImlzQXJyYXkiLCJ2YWxpZCIsInR5cGVzIiwiaSIsInR5cGUiLCJhcmdzIiwidmFsaWRhdGUiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJlcnIiLCJFcnJvciIsIm5hbWUiLCJpZGJFdmVudHMiLCJEQl9FUlJPUiIsIk1PREVMX0lOU1RBTkNFRCIsIk1PREVMX1JFUExBQ0UiLCJNT0RFTF9RVUVSSUVEIiwiTU9ERUxfVU5RVUVSSUVEIiwicXMiLCJxc0NsYXNzIiwiY2IiLCJ0aGl6IiwidGhlbnMiLCJ0aGVuc1JlYWR5IiwiY2F0Y2hzIiwiY2F0Y2hzUmVhZHkiLCJyZXN1bHRBcmdzIiwiZXJyb3IiLCJwcm9taXNlIiwiJHJlc29sdmVkIiwidGhlbnNSZXNvbHZlZCIsImxlbmd0aCIsInNoaWZ0IiwiYXBwbHkiLCJwdXNoIiwiY2F0Y2hzUmVzb2x2ZWQiLCJyZXNvbHZlIiwiYXJndW1lbnRzIiwicmVqZWN0IiwidGhlbiIsImNhdGNoIiwiZG9uZSIsImNvbmNhdCIsImRlZmVyIiwiYWxsIiwiYXJyIiwiZGVmZXJlZCIsInByb21pc2VzIiwia2V5cyIsIk9iamVjdCIsInJlc3VsdHMiLCJtYXAiLCJpZHgiLCJyZXN1bHQiLCJpZGJTZXJ2aWNlIiwiJGxvZyIsImlkYk1vZGVsIiwiaW5kZXhlZERCIiwid2luZG93IiwibW96SW5kZXhlZERCIiwid2Via2l0SW5kZXhlZERCIiwibXNJbmRleGVkREIiLCJJREJUcmFuc2FjdGlvbiIsIndlYmtpdElEQlRyYW5zYWN0aW9uIiwibXNJREJUcmFuc2FjdGlvbiIsIklEQktleVJhbmdlIiwid2Via2l0SURCS2V5UmFuZ2UiLCJtc0lEQktleVJhbmdlIiwiYWxlcnQiLCJpZGIiLCIkZGJOYW1lIiwiJGRiVmVyc2lvbiIsIiRzb2NrZXQiLCIkZXZlbnRzQ2FsbGJhY2tzIiwiJHVwZ3JhZGVOZWVkZWREZWZlcmVkIiwiJG9wZW5EZWZlcmVkIiwiJHNvY2tldENvbm5lY3RlZERlZmVyZWQiLCIkb3BlbmVkIiwiJHJlcXVlc3QiLCJtb2RlbHMiLCJiaW5kIiwiZXZlbnROYW1lIiwidW5iaW5kIiwiaW5kZXhPZiIsInNwbGljZSIsInRyaWdnZXIiLCJsb2ciLCJvcGVuIiwicmVhZHkiLCJycSIsIm9udXBncmFkZW5lZWRlZCIsImV2ZW50Iiwib25zdWNjZXNzIiwib25lcnJvciIsInRhcmdldCIsImVycm9yQ29kZSIsImRlbGV0ZURhdGFiYXNlIiwibW9kZWwiLCJzb2NrZXQiLCJjcmVhdGVTdG9yZSIsIm1vZGVsTmFtZSIsIm1vZGVsSWQiLCJjcmVhdGVPYmplY3RTdG9yZSIsImNyZWF0ZUluZGV4IiwiaW5kZXhOYW1lIiwiZmllbGROYW1lIiwib3B0cyIsInRyYW5zYWN0aW9uIiwib2JqZWN0U3RvcmUiLCJwZXJtcyIsImFjdGlvbiIsInR4Iiwib25jb21wbGV0ZSIsIm9uYWJvcnQiLCJnZXQiLCJrZXkiLCJwdXQiLCJ2YWx1ZXMiLCJkZWxldGUiLCJvcGVuQ3Vyc29yIiwiZmlsdGVycyIsImVhY2hDYiIsImN1cnNvciIsImNvbnRpbnVlIiwiZGVmZXJlZHMiLCJvbk9wZW4iLCJvblVwZ3JhZGVOZWVkZWQiLCJvblNvY2tldENvbm5lY3RlZCIsInRleHQiLCJpZGJNb2RlbFNlcnZpY2UiLCJpZGJRdWVyeSIsImxiUmVzb3VyY2UiLCIkdGltZW91dCIsInNlYXJjaERlZXBGaWVsZCIsIm9iaiIsImZpZWxkIiwiZmllbGRzIiwic3BsaXQiLCJsYXN0RmllbGQiLCJwb3AiLCJfc2V0IiwiZ2V0RmllbGRWYWx1ZSIsInNldEZpZWxkVmFsdWUiLCIkZGIiLCIkbW9kZWxOYW1lIiwiJGlkIiwia2V5UGF0aCIsImF1dG9JbmNyZW1lbnQiLCIkZXZlbnRzSGFuZGxlcnMiLCIkaW5zdGFuY2VzIiwiJGZpZWxkcyIsIiRyZW1vdGUiLCIkdmVyc2lvbmluZyIsIk1vZGVsIiwiZGF0YSIsIiRsb2FkZWQiLCIkbG9jYWxMb2FkZWQiLCIkcmVtb3RlTG9hZGVkIiwiJGxvY2FsVmFsdWVzIiwiJHJlbW90ZVZhbHVlcyIsIiR2ZXJzaW9uIiwiJGxvY2FsVmVyc2lvbiIsIiRyZW1vdGVWZXJzaW9uIiwiJHNldFZhbHVlcyIsIiRjb25zdHJ1Y3RvciIsIiRsaXN0ZW4iLCIkcmVzdWx0cyIsIiRiaW5kIiwiJGVtaXQiLCJnZXRNb2RlbE5hbWUiLCJpbmRleCIsImJ1aWxkIiwiYnVpbGRDYWxsYmFjayIsInJlbW90ZSIsInVybCIsImFjdGlvbnMiLCJnZXRSZW1vdGUiLCJnZXRLZXlGcm9tIiwiZ2V0SW5zdGFuY2UiLCJpbnN0YW5jZSIsIiRwcm9taXNlIiwiZ2V0VmVyc2lvbk9mIiwidmVyc2lvbiIsIiRzZXRMb2NhbFZhbHVlcyIsImhhc2giLCJmaW5kIiwiY3JlYXRlIiwicmVjb3JkIiwiJHB1bGwiLCJpdGVyYXRpb24iLCJ2ZXJzaW9uaW5nIiwiaGFuZGxlciIsImVtaXQiLCIkZ2V0IiwiJHNldCIsIiRnZXRWYWx1ZXMiLCIkZ2V0TG9jYWxWYWx1ZXMiLCIkZ2V0UmVtb3RlVmFsdWVzIiwiJHNldFJlbW90ZVZhbHVlcyIsIiRzZXRLZXkiLCJuZXdLZXkiLCJvbGRLZXkiLCJuZXdWYWx1ZXMiLCJvbGRWYWx1ZXMiLCJjb25zb2xlIiwic3Vic2NyaWJlIiwiJE1vZGVsIiwiJGZpbHRlcnMiLCIkcmVzdWx0IiwiZ2V0UmVzdWx0IiwibmV4dCIsImdldFJlbW90ZVJlc3VsdCIsIiRyZW1vdGVSZXN1bHQiLCIkcmVjb3JkIiwiaWRiU29ja2V0U2VydmljZSIsIiRkZWZVcmxTZXJ2ZXIiLCJpZGJTb2NrZXQiLCIkdXJsU2VydmVyIiwiJGFjY2Vzc1Rva2VuSWQiLCIkY3VycmVudFVzZXJJZCIsIiRsaXN0ZW5lcnMiLCJjb25uZWN0Iiwib24iLCJpZCIsInVzZXJJZCIsIm9wdGlvbnMiLCJwdXNoTGlzdGVuZXIiLCJzdWJzY3JpcHRpb25OYW1lIiwidW5zdWJzY3JpYmUiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJzZXRVcmxTZXJ2ZXIiLCJ1cmxTZXJ2ZXIiLCJzZXRDcmVkZW50aWFscyIsImFjY2Vzc1Rva2VuSWQiLCJjdXJyZW50VXNlcklkIiwibGIiLCJnZXRIb3N0IiwibSIsIm1hdGNoIiwidXJsQmFzZUhvc3QiLCJsb2NhdGlvbiIsImhvc3QiLCJsYkF1dGgiLCJwcm9wcyIsInByb3BzUHJlZml4Iiwic2F2ZSIsInN0b3JhZ2UiLCJsb2FkIiwibG9jYWxTdG9yYWdlIiwic2Vzc2lvblN0b3JhZ2UiLCJmb3JFYWNoIiwiY3VycmVudFVzZXJEYXRhIiwicmVtZW1iZXJNZSIsInNldFVzZXIiLCJ1c2VyRGF0YSIsImNsZWFyVXNlciIsImNsZWFyU3RvcmFnZSIsImxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciIsInJlcXVlc3QiLCJjb25maWciLCJoZWFkZXJzIiwiYXV0aEhlYWRlciIsIl9faXNHZXRDdXJyZW50VXNlcl9fIiwicmVzIiwiYm9keSIsInN0YXR1cyIsIndoZW4iLCJ1cmxCYXNlIiwic2V0QXV0aEhlYWRlciIsImhlYWRlciIsImdldEF1dGhIZWFkZXIiLCJzZXRVcmxCYXNlIiwiZ2V0VXJsQmFzZSIsIiRyZXNvdXJjZSIsInBhcmFtcyIsIm9yaWdpbmFsVXJsIiwicmVzb3VyY2UiLCIkc2F2ZSIsInN1Y2Nlc3MiLCJ1cHNlcnQiLCJmYWN0b3J5IiwicHJvdmlkZXIiLCIkaHR0cFByb3ZpZGVyIiwiaW50ZXJjZXB0b3JzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTs7QUFFQTs7QUNFQSxLQUFJLGFBQWEsdUJBQXVCOztBRER4Qzs7QUNLQSxLQUFJLGNBQWMsdUJBQXVCOztBREp6Qzs7QUNRQSxLQUFJLE9BQU8sdUJBQXVCOztBRE5sQzs7QUNVQSxLQUFJLFFBQVEsdUJBQXVCOztBRFRuQzs7QUNhQSxLQUFJLGFBQWEsdUJBQXVCOztBRFp4Qzs7QUNnQkEsS0FBSSxhQUFhLHVCQUF1Qjs7QURm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LFFBQ2xCdUMsU0FBUyxjQUFjdEosWUFDdkJxSixRQUFRLDRCQUE0QnZCLDBCQUNwQ0UsT0FBTyxDQUFDLGlCQUFpQixVQUFTdUIsZUFBZTtLQUFFOztLQUNsREEsY0FBY0MsYUFBYXpQLEtBQUsiLCJmaWxlIjoibmctaWRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBmYmNkZTc5ODk0ZDU4OWRmYWU4N1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBpZGJVdGlscyBmcm9tICcuL3V0aWxzL2lkYlV0aWxzJztcclxuaW1wb3J0IGlkYkV2ZW50cyBmcm9tICcuL3V0aWxzL2lkYkV2ZW50cyc7XHJcbmltcG9ydCBxcyBmcm9tICcuL3V0aWxzL3FzJztcclxuXHJcbmltcG9ydCBpZGIgZnJvbSAnLi9zZXJ2aWNlcy9pZGInO1xyXG5pbXBvcnQgaWRiTW9kZWwgZnJvbSAnLi9zZXJ2aWNlcy9pZGJNb2RlbCc7XHJcbmltcG9ydCBpZGJRdWVyeSBmcm9tICcuL3NlcnZpY2VzL2lkYlF1ZXJ5JztcclxuaW1wb3J0IGlkYlNvY2tldCBmcm9tICcuL3NlcnZpY2VzL2lkYlNvY2tldCc7XHJcblxyXG5pbXBvcnQgbGIgZnJvbSAnLi9zZXJ2aWNlcy9sYic7XHJcblxyXG5sYihhbmd1bGFyLm1vZHVsZSgnbmcuaWRiJywgW10pKVxyXG4gIC5jb25zdGFudCgnaW8nLCBpbylcclxuICBcclxuICAuY29uc3RhbnQoJ2lkYlZlcnNpb24nLCAnMC4wLjEnKVxyXG4gIC5zZXJ2aWNlKCdpZGJFdmVudHMnLCBpZGJFdmVudHMpXHJcbiAgLnNlcnZpY2UoJ2lkYlV0aWxzJywgaWRiVXRpbHMpXHJcbiAgLnNlcnZpY2UoJ3FzJywgcXMpXHJcblxyXG4gIC8vIFRha2Ugb2YgbGItc2VydmljZXMuanNcclxuICAuc2VydmljZSgnaWRiJywgaWRiKVxyXG4gIC5zZXJ2aWNlKCdpZGJNb2RlbCcsIGlkYk1vZGVsKVxyXG4gIC5zZXJ2aWNlKCdpZGJRdWVyeScsIGlkYlF1ZXJ5KVxyXG4gIC5zZXJ2aWNlKCdpZGJTb2NrZXQnLCBpZGJTb2NrZXQpXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2lkYlV0aWxzID0gcmVxdWlyZSgnLi91dGlscy9pZGJVdGlscycpO1xuXG52YXIgX2lkYlV0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlV0aWxzKTtcblxudmFyIF9pZGJFdmVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2lkYkV2ZW50cycpO1xuXG52YXIgX2lkYkV2ZW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJFdmVudHMpO1xuXG52YXIgX3FzID0gcmVxdWlyZSgnLi91dGlscy9xcycpO1xuXG52YXIgX3FzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3FzKTtcblxudmFyIF9pZGIgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYicpO1xuXG52YXIgX2lkYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGIpO1xuXG52YXIgX2lkYk1vZGVsID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJNb2RlbCcpO1xuXG52YXIgX2lkYk1vZGVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYk1vZGVsKTtcblxudmFyIF9pZGJRdWVyeSA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiUXVlcnknKTtcblxudmFyIF9pZGJRdWVyeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJRdWVyeSk7XG5cbnZhciBfaWRiU29ja2V0ID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJTb2NrZXQnKTtcblxudmFyIF9pZGJTb2NrZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiU29ja2V0KTtcblxudmFyIF9sYiA9IHJlcXVpcmUoJy4vc2VydmljZXMvbGInKTtcblxudmFyIF9sYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbigwLCBfbGIyLmRlZmF1bHQpKGFuZ3VsYXIubW9kdWxlKCduZy5pZGInLCBbXSkpLmNvbnN0YW50KCdpbycsIGlvKS5jb25zdGFudCgnaWRiVmVyc2lvbicsICcwLjAuMScpLnNlcnZpY2UoJ2lkYkV2ZW50cycsIF9pZGJFdmVudHMyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlV0aWxzJywgX2lkYlV0aWxzMi5kZWZhdWx0KS5zZXJ2aWNlKCdxcycsIF9xczIuZGVmYXVsdClcblxuLy8gVGFrZSBvZiBsYi1zZXJ2aWNlcy5qc1xuLnNlcnZpY2UoJ2lkYicsIF9pZGIyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYk1vZGVsJywgX2lkYk1vZGVsMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJRdWVyeScsIF9pZGJRdWVyeTIuZGVmYXVsdCkuc2VydmljZSgnaWRiU29ja2V0JywgX2lkYlNvY2tldDIuZGVmYXVsdCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJVdGlscyAoJHEpIHsgJ25nSW5qZWN0J1xyXG4gIFxyXG4gIGNvbnN0IHZhbGlkYXRvcnMgPSB7XHJcbiAgICAvLyBGdW5jaW9uIHBhcmEgZGV0ZXJtaW5hciBzaSBlcyB1biBjYWxsYmFjayB2w6FsaWRvIG8gbm9cclxuICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nIHx8IHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gdW5kZWZpbmVkO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBWZXJpZmljYSBzaSB1biB2YWxvciBlcyB1biBhcnJheVxyXG4gICAgYXJyYXk6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICB9ICBcclxuXHJcbiAgLy8gR2VuZXJhIHVuIGVycm9yIHNpIGVsIHZhbG9yIG5vIGVzIGRlbCB0aXBvIGluZGljYWRvIHBvciBwYXJhbWV0cm9cclxuICBmdW5jdGlvbiB2YWxpZCAodmFsdWUsIHR5cGVzKSB7XHJcbiAgICBpZiAoIXZhbGlkYXRvcnMuYXJyYXkodHlwZXMpKSB0eXBlcyA9IFt0eXBlc107XHJcblxyXG4gICAgZm9yKGxldCBpIGluIHR5cGVzKXtcclxuICAgICAgY29uc3QgdHlwZSA9IHR5cGVzW2ldO1xyXG4gICAgICBpZiAodHlwZW9mIHR5cGUgPT0gJ3N0cmluZycpe1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsaWRhdG9yc1t0eXBlXSA9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICBpZiAodmFsaWRhdG9yc1t0eXBlXSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT0gdHlwZSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0eXBlID09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgIGlmKHR5cGUoYXJnc1tpXSkpe1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIFZhbGlkYSB1biBhcnJheSBkZSBhcmd1bWVudG9zIGNvbiB1biBhcnJhIGRlIHRpcG9zXHJcbiAgZnVuY3Rpb24gdmFsaWRhdGUgKGFyZ3MsIHR5cGVzKSB7XHJcblxyXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xyXG4gICAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xyXG4gICAgZm9yIChsZXQgaSBpbiBhcmdzKXtcclxuICAgICAgY29uc3QgdmFsdWUgPSBhcmdzW2ldO1xyXG4gICAgICBjb25zdCB0eXBlID0gdHlwZXNbaV07XHJcbiAgICAgIGlmICh0eXBlICYmICF2YWxpZCh2YWx1ZSwgdHlwZSkpe1xyXG4gICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsaWRhdG9yIHRvOiAnK2FyZ3NbaV0rJyBtdXN0IGJlICcrdHlwZSk7XHJcbiAgICAgICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbGlkYXRvcidcclxuICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdmFsaWRhdGU6IHZhbGlkYXRlLFxyXG4gIH07XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiVXRpbHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gaWRiVXRpbHM7XG5mdW5jdGlvbiBpZGJVdGlscygkcSkge1xuICAnbmdJbmplY3QnO1xuXG4gIHZhciB2YWxpZGF0b3JzID0ge1xuICAgIC8vIEZ1bmNpb24gcGFyYSBkZXRlcm1pbmFyIHNpIGVzIHVuIGNhbGxiYWNrIHbDoWxpZG8gbyBub1xuICAgIGNhbGxiYWNrOiBmdW5jdGlvbiBjYWxsYmFjayh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nIHx8IHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gdW5kZWZpbmVkO1xuICAgIH0sXG5cbiAgICAvLyBWZXJpZmljYSBzaSB1biB2YWxvciBlcyB1biBhcnJheVxuICAgIGFycmF5OiBmdW5jdGlvbiBhcnJheSh2YWx1ZSkge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpO1xuICAgIH1cblxuICB9O1xuXG4gIC8vIEdlbmVyYSB1biBlcnJvciBzaSBlbCB2YWxvciBubyBlcyBkZWwgdGlwbyBpbmRpY2FkbyBwb3IgcGFyYW1ldHJvXG4gIGZ1bmN0aW9uIHZhbGlkKHZhbHVlLCB0eXBlcykge1xuICAgIGlmICghdmFsaWRhdG9ycy5hcnJheSh0eXBlcykpIHR5cGVzID0gW3R5cGVzXTtcblxuICAgIGZvciAodmFyIGkgaW4gdHlwZXMpIHtcbiAgICAgIHZhciB0eXBlID0gdHlwZXNbaV07XG4gICAgICBpZiAodHlwZW9mIHR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWxpZGF0b3JzW3R5cGVdID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpZiAodmFsaWRhdG9yc1t0eXBlXSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSkpID09IHR5cGUpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdHlwZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmICh0eXBlKGFyZ3NbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBWYWxpZGEgdW4gYXJyYXkgZGUgYXJndW1lbnRvcyBjb24gdW4gYXJyYSBkZSB0aXBvc1xuICBmdW5jdGlvbiB2YWxpZGF0ZShhcmdzLCB0eXBlcykge1xuXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcbiAgICBmb3IgKHZhciBpIGluIGFyZ3MpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGFyZ3NbaV07XG4gICAgICB2YXIgdHlwZSA9IHR5cGVzW2ldO1xuICAgICAgaWYgKHR5cGUgJiYgIXZhbGlkKHZhbHVlLCB0eXBlKSkge1xuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbGlkYXRvciB0bzogJyArIGFyZ3NbaV0gKyAnIG11c3QgYmUgJyArIHR5cGUpO1xuICAgICAgICBlcnIubmFtZSA9ICdJbnZhbGlkVmFsaWRhdG9yJztcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdmFsaWRhdGU6IHZhbGlkYXRlXG4gIH07XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiVXRpbHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBOb21icmUgZGUgbG9zIGV2ZW50b3NcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiRXZlbnRzKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBEQl9FUlJPUjogJ2NiLmVycm9yJyxcclxuICAgIE1PREVMX0lOU1RBTkNFRCA6ICdtb2RlbC5pbnN0YW5jZWQnLFxyXG4gICAgTU9ERUxfUkVQTEFDRSA6ICdtb2RlbC5yZXBsYWNlJyxcclxuICAgIE1PREVMX1FVRVJJRUQgOiAnbW9kZWwucXVlcmllZCcsXHJcbiAgICBNT0RFTF9VTlFVRVJJRUQgOiAnbW9kZWwudW5xdWVyaWVkJyxcclxuICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBOb21icmUgZGUgbG9zIGV2ZW50b3NcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYkV2ZW50cztcbmZ1bmN0aW9uIGlkYkV2ZW50cygpIHtcbiAgcmV0dXJuIHtcbiAgICBEQl9FUlJPUjogJ2NiLmVycm9yJyxcbiAgICBNT0RFTF9JTlNUQU5DRUQ6ICdtb2RlbC5pbnN0YW5jZWQnLFxuICAgIE1PREVMX1JFUExBQ0U6ICdtb2RlbC5yZXBsYWNlJyxcbiAgICBNT0RFTF9RVUVSSUVEOiAnbW9kZWwucXVlcmllZCcsXG4gICAgTU9ERUxfVU5RVUVSSUVEOiAnbW9kZWwudW5xdWVyaWVkJ1xuICB9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9pZGJFdmVudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBxcyAoKSB7ICduZ0luamVjdCdcclxuICBcclxuICBmdW5jdGlvbiBxc0NsYXNzIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIFxyXG4gICAgbGV0IHRoZW5zID0gW107XHJcbiAgICBsZXQgdGhlbnNSZWFkeSA9IFtdO1xyXG4gICAgbGV0IGNhdGNocyA9IFtdO1xyXG4gICAgbGV0IGNhdGNoc1JlYWR5ID0gW107XHJcbiAgICBsZXQgcmVzdWx0QXJncyA9IG51bGw7XHJcbiAgICBsZXQgZXJyb3IgPSBudWxsO1xyXG5cclxuICAgIHRoaXoucHJvbWlzZSA9IHt9O1xyXG4gICAgdGhpei4kcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiB0aGVuc1Jlc29sdmVkICgpIHtcclxuICAgICAgaWYgKCF0aGVucy5sZW5ndGgpIHJldHVybjtcclxuICAgICAgbGV0IGNiID0gdGhlbnMuc2hpZnQoKTtcclxuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5yZXN1bHRBcmdzKTtcclxuICAgICAgdGhlbnNSZWFkeS5wdXNoKGNiKTtcclxuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNhdGNoc1Jlc29sdmVkICgpIHtcclxuICAgICAgaWYgKCFjYXRjaHMubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgIGxldCBjYiA9IGNhdGNocy5zaGlmdCgpO1xyXG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcclxuICAgICAgY2F0Y2hzUmVhZHkucHVzaChjYik7XHJcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpei5yZXNvbHZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcclxuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICB0aGl6LnJlc3VsdEFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucmVqZWN0ID0gZnVuY3Rpb24gKGVycikge1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcclxuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICB0aGl6LmVycm9yID0gZXJyIHx8IHt9O1xyXG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnByb21pc2UudGhlbiA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICB0aGVucy5wdXNoKGNiKTtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmICF0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGl6LnByb21pc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucHJvbWlzZS5jYXRjaCA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICBjYXRjaHMucHVzaChjYik7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiB0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpei5wcm9taXNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnByb21pc2UuZG9uZSA9IGZ1bmN0aW9uIChjYikge1xyXG5cclxuICAgICAgdGhlbnMucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgW251bGxdLmNvbmNhdCh0aGl6LnJlc3VsdEFyZ3MpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjYXRjaHMucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSB7XHJcbiAgICAgICAgaWYgKCF0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgaWYoY2IpIHRoaXoucHJvbWlzZS5kb25lKGNiKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgLy8gQ3JlYSB1bmEgaW5zdGFuY2lhIGRlbCBkZWZlcmVkXHJcbiAgcXNDbGFzcy5kZWZlciA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgcmV0dXJuIG5ldyBxc0NsYXNzKGNiKTtcclxuICB9O1xyXG5cclxuICBxc0NsYXNzLmFsbCA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIGNvbnN0IGRlZmVyZWQgPSBxc0NsYXNzLmRlZmVyKCk7XHJcblxyXG4gICAgbGV0IHByb21pc2VzID0ga2V5cy5sZW5ndGg7XHJcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYXJyKTtcclxuICAgIGNvbnN0IHJlc3VsdHMgPSBhcnIubGVuZ3RoPyBbXSA6IHt9O1xyXG5cclxuICAgIGtleXMubWFwKGZ1bmN0aW9uIChpZHgpIHtcclxuXHJcbiAgICAgIGFycltpZHhdLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIHByb21pc2VzLS07XHJcbiAgICAgICAgcmVzdWx0c1tpZHhdID0gcmVzdWx0O1xyXG4gICAgICAgIGlmICghcHJvbWlzZXMpe1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKHJlc3VsdHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhcnJbaWR4XS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gIH07XHJcblxyXG4gIHJldHVybiBxc0NsYXNzO1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL3FzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gcXM7XG5mdW5jdGlvbiBxcygpIHtcbiAgJ25nSW5qZWN0JztcblxuICBmdW5jdGlvbiBxc0NsYXNzKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIHRoZW5zID0gW107XG4gICAgdmFyIHRoZW5zUmVhZHkgPSBbXTtcbiAgICB2YXIgY2F0Y2hzID0gW107XG4gICAgdmFyIGNhdGNoc1JlYWR5ID0gW107XG4gICAgdmFyIHJlc3VsdEFyZ3MgPSBudWxsO1xuICAgIHZhciBlcnJvciA9IG51bGw7XG5cbiAgICB0aGl6LnByb21pc2UgPSB7fTtcbiAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gdGhlbnNSZXNvbHZlZCgpIHtcbiAgICAgIGlmICghdGhlbnMubGVuZ3RoKSByZXR1cm47XG4gICAgICB2YXIgY2IgPSB0aGVucy5zaGlmdCgpO1xuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5yZXN1bHRBcmdzKTtcbiAgICAgIHRoZW5zUmVhZHkucHVzaChjYik7XG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2F0Y2hzUmVzb2x2ZWQoKSB7XG4gICAgICBpZiAoIWNhdGNocy5sZW5ndGgpIHJldHVybjtcbiAgICAgIHZhciBjYiA9IGNhdGNocy5zaGlmdCgpO1xuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XG4gICAgICBjYXRjaHNSZWFkeS5wdXNoKGNiKTtcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgfVxuXG4gICAgdGhpei5yZXNvbHZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICB0aGl6LnJlc3VsdEFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgIH07XG5cbiAgICB0aGl6LnJlamVjdCA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgdGhpei5lcnJvciA9IGVyciB8fCB7fTtcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgfTtcblxuICAgIHRoaXoucHJvbWlzZS50aGVuID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB0aGVucy5wdXNoKGNiKTtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiAhdGhpei5lcnJvcikge1xuICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpei5wcm9taXNlO1xuICAgIH07XG5cbiAgICB0aGl6LnByb21pc2UuY2F0Y2ggPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIGNhdGNocy5wdXNoKGNiKTtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiB0aGl6LmVycm9yKSB7XG4gICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpei5wcm9taXNlO1xuICAgIH07XG5cbiAgICB0aGl6LnByb21pc2UuZG9uZSA9IGZ1bmN0aW9uIChjYikge1xuXG4gICAgICB0aGVucy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgW251bGxdLmNvbmNhdCh0aGl6LnJlc3VsdEFyZ3MpKTtcbiAgICAgIH0pO1xuXG4gICAgICBjYXRjaHMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkge1xuICAgICAgICBpZiAoIXRoaXouZXJyb3IpIHtcbiAgICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgaWYgKGNiKSB0aGl6LnByb21pc2UuZG9uZShjYik7XG4gIH07XG5cbiAgLy8gQ3JlYSB1bmEgaW5zdGFuY2lhIGRlbCBkZWZlcmVkXG4gIHFzQ2xhc3MuZGVmZXIgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICByZXR1cm4gbmV3IHFzQ2xhc3MoY2IpO1xuICB9O1xuXG4gIHFzQ2xhc3MuYWxsID0gZnVuY3Rpb24gKGFycikge1xuICAgIHZhciBkZWZlcmVkID0gcXNDbGFzcy5kZWZlcigpO1xuXG4gICAgdmFyIHByb21pc2VzID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICAgIHZhciByZXN1bHRzID0gYXJyLmxlbmd0aCA/IFtdIDoge307XG5cbiAgICBrZXlzLm1hcChmdW5jdGlvbiAoaWR4KSB7XG5cbiAgICAgIGFycltpZHhdLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICBwcm9taXNlcy0tO1xuICAgICAgICByZXN1bHRzW2lkeF0gPSByZXN1bHQ7XG4gICAgICAgIGlmICghcHJvbWlzZXMpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBhcnJbaWR4XS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkZWZlcmVkO1xuICB9O1xuXG4gIHJldHVybiBxc0NsYXNzO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL3FzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYlNlcnZpY2UgKCRsb2csIHFzLCBpZGJVdGlscywgaWRiRXZlbnRzLCBpZGJNb2RlbCkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAvLyBFbiBsYSBzaWd1aWVudGUgbGluZWEsIHB1ZWRlIGluY2x1aXIgcHJlZmlqb3MgZGUgaW1wbGVtZW50YWNpb24gcXVlIHF1aWVyYSBwcm9iYXIuXHJcbiAgY29uc3QgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xyXG4gIC8vIE5vIHVzZSBcImNvbnN0IGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cclxuICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcclxuICBjb25zdCBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XHJcbiAgY29uc3QgSURCS2V5UmFuZ2UgPSB3aW5kb3cuSURCS2V5UmFuZ2UgfHwgd2luZG93LndlYmtpdElEQktleVJhbmdlIHx8IHdpbmRvdy5tc0lEQktleVJhbmdlO1xyXG4gIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXHJcbiAgXHJcbiAgaWYgKCFpbmRleGVkREIpIHtcclxuICAgIGFsZXJ0KFwiU3UgbmF2ZWdhZG9yIG5vIHNvcG9ydGEgdW5hIHZlcnNpw7NuIGVzdGFibGUgZGUgaW5kZXhlZERCLiBUYWwgeSBjb21vIGxhcyBjYXJhY3RlcsOtc3RpY2FzIG5vIHNlcsOhbiB2YWxpZGFzXCIpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2xhc2UgcGFyYSBsYSBjcmVhY2nDs24gZGUgaW5zdGFuY2lhcyBkZSBsYSBCRFxyXG4gIGZ1bmN0aW9uIGlkYigkZGJOYW1lLCAkZGJWZXJzaW9uLCAkc29ja2V0KSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdudW1iZXInLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAvLyBNYW5lamFkb3JlcyBkZSBldmVudG9zLlxyXG4gICAgY29uc3QgJGV2ZW50c0NhbGxiYWNrcyA9IHt9O1xyXG4gICAgY29uc3QgJHVwZ3JhZGVOZWVkZWREZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgIGNvbnN0ICRvcGVuRGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcbiAgICBjb25zdCAkc29ja2V0Q29ubmVjdGVkRGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcbiAgICBsZXQgJG9wZW5lZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIEluc3RhbmNpYSBkZSBsYSBiYXNlIGRlIGRhdG9zO1xyXG4gICAgbGV0ICRyZXF1ZXN0ID0gbnVsbDtcclxuICAgIHRoaXoubW9kZWxzID0ge307XHJcblxyXG4gICAgLy8gQWdyZWdhciB1biBtYW5lamFkb3IgZGUgZXZlbnRvXHJcbiAgICB0aGl6LmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pe1xyXG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0ucHVzaChjYik7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvL1JlbXVldmUgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xyXG4gICAgdGhpei51bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHJldHVybjtcclxuXHJcbiAgICAgIC8vIEJ1c2NhciBlbCBjYlxyXG4gICAgICBjb25zdCBpZHggPSAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uaW5kZXhPZihjYik7XHJcblxyXG4gICAgICAvLyBTaSBzZSBlbmNvbnRybyBlbCBjYiByZW1vdmVybG9cclxuICAgICAgaWYgKGlkeCAhPSAtMSl7XHJcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEaXNwYXJhIHVuIGV2ZW50b1xyXG4gICAgdGhpei50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcclxuXHJcbiAgICAgICRsb2cubG9nKCRkYk5hbWUrJy52JysoJGRiVmVyc2lvbnx8MSkrJzogJytldmVudE5hbWUpO1xyXG5cclxuICAgICAgZm9yKGxldCBpIGluICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSl7XHJcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdW2ldLmFwcGx5KHRoaXosIGFyZ3MpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDYWxsYmFja3MgcGFyYSBsb3MgZXJyb3Jlc1xyXG4gICAgdGhpei5lcnJvciA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICB0aGl6LmJpbmQoaWRiRXZlbnRzLkRCX0VSUk9SLCBjYik7XHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBYnJpciB1bmEgQmFzZSBkZSBkYXRvcy5cclxuICAgIHRoaXoub3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCRvcGVuZWQpIHJldHVybiAkb3BlbkRlZmVyZWQ7XHJcblxyXG4gICAgICAvLyBDcmVhciB1biBudWV2byBkZWZlclxyXG4gICAgICAkb3BlbmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIC8vIGRlamFtb3MgYWJpZXJ0YSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcclxuICAgICAgZnVuY3Rpb24gcmVhZHkoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHJxID0gaW5kZXhlZERCLm9wZW4oJGRiTmFtZSwgJGRiVmVyc2lvbik7XHJcblxyXG4gICAgICAgIHJxLm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxyXG4gICAgICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGVsIHJlc3VsdGFkb1xyXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxyXG4gICAgICAgICAgJHJlcXVlc3QgPSBycTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gQXNpbmdhciBlbCBtYW5lamFkb3IgZGUgZXJyb3JlcyBhIGxhIEJEXHJcbiAgICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICRsb2cuZXJyb3IoJ0RhdGFiYXNlIGVycm9yOiAnKyBldmVudC50YXJnZXQuZXJyb3JDb2RlKTtcclxuICAgICAgICAgICAgdGhpei50cmlnZ2VyKGlkYkV2ZW50cy5EQl9FUlJPUiwgW2V2ZW50XSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgJG9wZW5EZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGUgZXJyb3Jlc1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEuZXJyb3JDb2RlIVxyXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZWplY3QocnEuZXJyb3JDb2RlLCBldmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZSgkZGJOYW1lKS5vbnN1Y2Nlc3MgPSByZWFkeTtcclxuICAgICAgLy8gcmVhZHkoKTtcclxuXHJcbiAgICAgIHJldHVybiAkb3BlbkRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZ3JlZ2EgdW4gbnVldm8gbW9kZWxvXHJcbiAgICB0aGl6Lm1vZGVsID0gZnVuY3Rpb24gKG5hbWUsIHNvY2tldCkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnb2JqZWN0J11dKTtcclxuXHJcbiAgICAgIC8vIEluc3RhbmNpYXIgZWwgbW9kZWxvXHJcbiAgICAgIGxldCBtb2RlbCA9IHRoaXoubW9kZWxzW25hbWVdO1xyXG5cclxuICAgICAgLy8gU2kgbm8gZXhpc3RlIGVsIG1vZGVsbyBjcmVhclxyXG4gICAgICBpZighbW9kZWwpe1xyXG4gICAgICAgIG1vZGVsID0gaWRiTW9kZWwodGhpeiwgbmFtZSwgc29ja2V0IHx8ICRzb2NrZXQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBHdWFyZGFyIGVsIG1vZGVsbyBlbiBsb3MgbW9kZWxvc1xyXG4gICAgICB0aGl6Lm1vZGVsc1tuYW1lXSA9IG1vZGVsO1xyXG5cclxuICAgICAgLy8gUmV0b3JuYXIgZWwgbW9kZWxvXHJcbiAgICAgIHJldHVybiBtb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxyXG4gICAgdGhpei5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIG1vZGVsSWQpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcclxuICAgICAgICBycS5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUobW9kZWxOYW1lLCBtb2RlbElkKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcclxuICAgIHRoaXouY3JlYXRlSW5kZXggPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XHJcbiAgICAgICAgcnEudHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5jcmVhdGVJbmRleChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSB1bmEgdHJhbnNhY2Npw7NuXHJcbiAgICB0aGl6LnRyYW5zYWN0aW9uID0gZnVuY3Rpb24obW9kZWxOYW1lLCBwZXJtcywgYWN0aW9uKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICAvLyBDdWFuZG8gc2UgYWJyYSBsYSBCRFxyXG4gICAgICAkb3BlbkRlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcclxuICAgICAgICBjb25zdCB0eCA9IHJxLnJlc3VsdC50cmFuc2FjdGlvbihtb2RlbE5hbWUsIHBlcm1zKTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhY3Rpb24odHgpO1xyXG5cclxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXHJcbiAgICAgICAgdHgub25jb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCByZXN1bHQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXHJcbiAgICAgICAgdHgub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KHR4LmVycm9yKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE9idGllbmUgdW4gZWxlbWVudG8gcG9yIHN1IGtleVxyXG4gICAgdGhpei5nZXQgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBrZXkpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnc3RyaW5nJywgJ251bWJlciddXSk7XHJcblxyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuXHJcbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXHJcbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBjb25zdCBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShycS5yZXN1bHQsIGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxyXG4gICAgICAgIHJxLm9uZXJyb3IgID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAvLyBDb3VsZCBjYWxsIHJxLnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEluc2VydGEgdW4gcmVnaXN0cm8gZW4gZWwgbW9kZWxvXHJcbiAgICB0aGl6LnB1dCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIHZhbHVlcykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cclxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBjb25zdCBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkucHV0KHZhbHVlcyk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICBycS5vbmVycm9yICA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBFbGltaW5hIHVuIG9iamV0byBwb3Igc3Uga2V5XHJcbiAgICB0aGl6LmRlbGV0ZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGtleSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cclxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBjb25zdCBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkuZGVsZXRlKGtleSk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICBycS5vbmVycm9yICA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cclxuICAgIHRoaXoub3BlbkN1cnNvciA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGZpbHRlcnMsIGVhY2hDYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ10sICdmdW5jdGlvbiddKTtcclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxyXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWRvbmx5JywgZnVuY3Rpb24gKHR4KSB7XHJcbiAgICAgICAgY29uc3QgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLm9wZW5DdXJzb3IoKTtcclxuXHJcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBycS5yZXN1bHQ7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIE5vIG1vcmUgbWF0Y2hpbmcgcmVjb3Jkcy5cclxuICAgICAgICAgIGlmIChjdXJzb3Ipe1xyXG4gICAgICAgICAgICBlYWNoQ2IoY3Vyc29yLnZhbHVlLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgLy8gQnVzY2FyIHNpZ3VpZW50ZVxyXG4gICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcmVkLnJlc29sdmUoKTtcclxuICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWFyIGFsaWFzIHBhcmEgbG9zIGV2ZW50b3MgZW5sYXphciBjYWxsYmFja3MgYSBsb3MgZXZlbnRvc1xyXG4gICAgbGV0IGRlZmVyZWRzO1xyXG4gICAgT2JqZWN0LmtleXMoZGVmZXJlZHMgPSB7XHJcbiAgICAgIG9uT3BlbjogJG9wZW5EZWZlcmVkLFxyXG4gICAgICBvblVwZ3JhZGVOZWVkZWQ6ICR1cGdyYWRlTmVlZGVkRGVmZXJlZCxcclxuICAgICAgb25Tb2NrZXRDb25uZWN0ZWQ6ICRzb2NrZXRDb25uZWN0ZWREZWZlcmVkXHJcbiAgICB9KS5tYXAoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9ICRkYk5hbWUrJy52JysoJGRiVmVyc2lvbnx8MSkrJzogJytrZXk7XHJcbiAgICAgICAgaWYgKGVycil7XHJcbiAgICAgICAgICAkbG9nLmVycm9yKHRleHQsIGVycik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICRsb2cubG9nKHRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXpba2V5XSA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcclxuICAgICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShjYik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGlkYjtcclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYlNlcnZpY2U7XG5mdW5jdGlvbiBpZGJTZXJ2aWNlKCRsb2csIHFzLCBpZGJVdGlscywgaWRiRXZlbnRzLCBpZGJNb2RlbCkge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cblxuICB2YXIgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xuICAvLyBObyB1c2UgXCJjb25zdCBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXG4gIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxuICB2YXIgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xuICB2YXIgSURCS2V5UmFuZ2UgPSB3aW5kb3cuSURCS2V5UmFuZ2UgfHwgd2luZG93LndlYmtpdElEQktleVJhbmdlIHx8IHdpbmRvdy5tc0lEQktleVJhbmdlO1xuICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxuXG4gIGlmICghaW5kZXhlZERCKSB7XG4gICAgYWxlcnQoXCJTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXNcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gQ2xhc2UgcGFyYSBsYSBjcmVhY2nDs24gZGUgaW5zdGFuY2lhcyBkZSBsYSBCRFxuICBmdW5jdGlvbiBpZGIoJGRiTmFtZSwgJGRiVmVyc2lvbiwgJHNvY2tldCkge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ251bWJlcicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgLy8gTWFuZWphZG9yZXMgZGUgZXZlbnRvcy5cbiAgICB2YXIgJGV2ZW50c0NhbGxiYWNrcyA9IHt9O1xuICAgIHZhciAkdXBncmFkZU5lZWRlZERlZmVyZWQgPSBxcy5kZWZlcigpO1xuICAgIHZhciAkb3BlbkRlZmVyZWQgPSBxcy5kZWZlcigpO1xuICAgIHZhciAkc29ja2V0Q29ubmVjdGVkRGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgdmFyICRvcGVuZWQgPSBmYWxzZTtcblxuICAgIC8vIEluc3RhbmNpYSBkZSBsYSBiYXNlIGRlIGRhdG9zO1xuICAgIHZhciAkcmVxdWVzdCA9IG51bGw7XG4gICAgdGhpei5tb2RlbHMgPSB7fTtcblxuICAgIC8vIEFncmVnYXIgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xuICAgIHRoaXouYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkge1xuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnB1c2goY2IpO1xuICAgIH07XG5cbiAgICAvL1JlbXVldmUgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xuICAgIHRoaXoudW5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSByZXR1cm47XG5cbiAgICAgIC8vIEJ1c2NhciBlbCBjYlxuICAgICAgdmFyIGlkeCA9ICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5pbmRleE9mKGNiKTtcblxuICAgICAgLy8gU2kgc2UgZW5jb250cm8gZWwgY2IgcmVtb3ZlcmxvXG4gICAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gRGlzcGFyYSB1biBldmVudG9cbiAgICB0aGl6LnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcblxuICAgICAgJGxvZy5sb2coJGRiTmFtZSArICcudicgKyAoJGRiVmVyc2lvbiB8fCAxKSArICc6ICcgKyBldmVudE5hbWUpO1xuXG4gICAgICBmb3IgKHZhciBpIGluICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkge1xuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpeiwgYXJncyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIENhbGxiYWNrcyBwYXJhIGxvcyBlcnJvcmVzXG4gICAgdGhpei5lcnJvciA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgdGhpei5iaW5kKGlkYkV2ZW50cy5EQl9FUlJPUiwgY2IpO1xuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIC8vIEFicmlyIHVuYSBCYXNlIGRlIGRhdG9zLlxuICAgIHRoaXoub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgkb3BlbmVkKSByZXR1cm4gJG9wZW5EZWZlcmVkO1xuXG4gICAgICAvLyBDcmVhciB1biBudWV2byBkZWZlclxuICAgICAgJG9wZW5lZCA9IHRydWU7XG5cbiAgICAgIC8vIGRlamFtb3MgYWJpZXJ0YSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcbiAgICAgIGZ1bmN0aW9uIHJlYWR5KCkge1xuXG4gICAgICAgIHZhciBycSA9IGluZGV4ZWREQi5vcGVuKCRkYk5hbWUsICRkYlZlcnNpb24pO1xuXG4gICAgICAgIHJxLm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLnJlc3VsdCFcbiAgICAgICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucmVzb2x2ZShldmVudCwgcnEpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlbCByZXN1bHRhZG9cbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxuICAgICAgICAgICRyZXF1ZXN0ID0gcnE7XG5cbiAgICAgICAgICAvLyBBc2luZ2FyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzIGEgbGEgQkRcbiAgICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAkbG9nLmVycm9yKCdEYXRhYmFzZSBlcnJvcjogJyArIGV2ZW50LnRhcmdldC5lcnJvckNvZGUpO1xuICAgICAgICAgICAgdGhpei50cmlnZ2VyKGlkYkV2ZW50cy5EQl9FUlJPUiwgW2V2ZW50XSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBycSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGUgZXJyb3Jlc1xuICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5lcnJvckNvZGUhXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAkb3BlbkRlZmVyZWQucmVqZWN0KHJxLmVycm9yQ29kZSwgZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKCRkYk5hbWUpLm9uc3VjY2VzcyA9IHJlYWR5O1xuICAgICAgLy8gcmVhZHkoKTtcblxuICAgICAgcmV0dXJuICRvcGVuRGVmZXJlZDtcbiAgICB9O1xuXG4gICAgLy8gQWdyZWdhIHVuIG51ZXZvIG1vZGVsb1xuICAgIHRoaXoubW9kZWwgPSBmdW5jdGlvbiAobmFtZSwgc29ja2V0KSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnb2JqZWN0J11dKTtcblxuICAgICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG9cbiAgICAgIHZhciBtb2RlbCA9IHRoaXoubW9kZWxzW25hbWVdO1xuXG4gICAgICAvLyBTaSBubyBleGlzdGUgZWwgbW9kZWxvIGNyZWFyXG4gICAgICBpZiAoIW1vZGVsKSB7XG4gICAgICAgIG1vZGVsID0gaWRiTW9kZWwodGhpeiwgbmFtZSwgc29ja2V0IHx8ICRzb2NrZXQpO1xuICAgICAgfVxuXG4gICAgICAvLyBHdWFyZGFyIGVsIG1vZGVsbyBlbiBsb3MgbW9kZWxvc1xuICAgICAgdGhpei5tb2RlbHNbbmFtZV0gPSBtb2RlbDtcblxuICAgICAgLy8gUmV0b3JuYXIgZWwgbW9kZWxvXG4gICAgICByZXR1cm4gbW9kZWw7XG4gICAgfTtcblxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxuICAgIHRoaXouY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBtb2RlbElkKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XG4gICAgICAgIHJxLnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShtb2RlbE5hbWUsIG1vZGVsSWQpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxuICAgIHRoaXouY3JlYXRlSW5kZXggPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XG4gICAgICAgIHJxLnRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG1vZGVsTmFtZSkuY3JlYXRlSW5kZXgoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIENyZWEgdW5hIHRyYW5zYWNjacOzblxuICAgIHRoaXoudHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBwZXJtcywgYWN0aW9uKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAvLyBDdWFuZG8gc2UgYWJyYSBsYSBCRFxuICAgICAgJG9wZW5EZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XG4gICAgICAgIHZhciB0eCA9IHJxLnJlc3VsdC50cmFuc2FjdGlvbihtb2RlbE5hbWUsIHBlcm1zKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGFjdGlvbih0eCk7XG5cbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxuICAgICAgICB0eC5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCByZXN1bHQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXG4gICAgICAgIHR4Lm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QodHguZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBPYnRpZW5lIHVuIGVsZW1lbnRvIHBvciBzdSBrZXlcbiAgICB0aGl6LmdldCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGtleSkge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnc3RyaW5nJywgJ251bWJlciddXSk7XG5cbiAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcblxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcbiAgICAgICAgdmFyIHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5nZXQoa2V5KTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShycS5yZXN1bHQsIGV2ZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBJbnNlcnRhIHVuIHJlZ2lzdHJvIGVuIGVsIG1vZGVsb1xuICAgIHRoaXoucHV0ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgdmFsdWVzKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHgpIHtcbiAgICAgICAgdmFyIHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5wdXQodmFsdWVzKTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vIENvdWxkIGNhbGwgcnEucHJldmVudERlZmF1bHQoKSB0byBwcmV2ZW50IHRoZSB0cmFuc2FjdGlvbiBmcm9tIGFib3J0aW5nLlxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICB9O1xuXG4gICAgLy8gRWxpbWluYSB1biBvYmpldG8gcG9yIHN1IGtleVxuICAgIHRoaXouZGVsZXRlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwga2V5KSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHgpIHtcbiAgICAgICAgdmFyIHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5kZWxldGUoa2V5KTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vIENvdWxkIGNhbGwgcnEucHJldmVudERlZmF1bHQoKSB0byBwcmV2ZW50IHRoZSB0cmFuc2FjdGlvbiBmcm9tIGFib3J0aW5nLlxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICB9O1xuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cbiAgICB0aGl6Lm9wZW5DdXJzb3IgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBmaWx0ZXJzLCBlYWNoQ2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgJ2Z1bmN0aW9uJ10pO1xuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLm9wZW5DdXJzb3IoKTtcblxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGN1cnNvciA9IHJxLnJlc3VsdDtcblxuICAgICAgICAgIC8vIE5vIG1vcmUgbWF0Y2hpbmcgcmVjb3Jkcy5cbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBlYWNoQ2IoY3Vyc29yLnZhbHVlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIC8vIEJ1c2NhciBzaWd1aWVudGVcbiAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBDcmVhciBhbGlhcyBwYXJhIGxvcyBldmVudG9zIGVubGF6YXIgY2FsbGJhY2tzIGEgbG9zIGV2ZW50b3NcbiAgICB2YXIgZGVmZXJlZHMgPSB2b2lkIDA7XG4gICAgT2JqZWN0LmtleXMoZGVmZXJlZHMgPSB7XG4gICAgICBvbk9wZW46ICRvcGVuRGVmZXJlZCxcbiAgICAgIG9uVXBncmFkZU5lZWRlZDogJHVwZ3JhZGVOZWVkZWREZWZlcmVkLFxuICAgICAgb25Tb2NrZXRDb25uZWN0ZWQ6ICRzb2NrZXRDb25uZWN0ZWREZWZlcmVkXG4gICAgfSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdmFyIHRleHQgPSAkZGJOYW1lICsgJy52JyArICgkZGJWZXJzaW9uIHx8IDEpICsgJzogJyArIGtleTtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICRsb2cuZXJyb3IodGV4dCwgZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkbG9nLmxvZyh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGl6W2tleV0gPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xuICAgICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShjYik7XG4gICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gaWRiO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJNb2RlbFNlcnZpY2UgKCRsb2csIHFzLCBpZGJVdGlscywgaWRiUXVlcnksIGlkYkV2ZW50cywgbGJSZXNvdXJjZSwgJHRpbWVvdXQpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gQnVzY2FyIHVuIGNhbXBvXHJcbiAgY29uc3Qgc2VhcmNoRGVlcEZpZWxkID0gZnVuY3Rpb24gKG9iaiwgZmllbGQsIGNiKSB7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgJ3N0cmluZycsICdmdW5jdGlvbiddKTtcclxuXHJcbiAgICBjb25zdCBmaWVsZHMgPSBmaWVsZC5zcGxpdCgnLicpO1xyXG4gICAgY29uc3QgbGFzdEZpZWxkID0gZmllbGRzLnBvcCgpO1xyXG5cclxuICAgIHJldHVybiAoZnVuY3Rpb24gX3NldChvYmopIHtcclxuICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMClcclxuICAgICAgICByZXR1cm4gY2Iob2JqLCBsYXN0RmllbGQpO1xyXG4gICAgICBjb25zdCBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xyXG4gICAgICBpZiAodHlwZW9mIG9ialtmaWVsZF0gPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICAgIG9ialtmaWVsZF0gPSB7fTtcclxuICAgICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XHJcbiAgICB9KShvYmopO1xyXG5cclxuICB9O1xyXG5cclxuICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cclxuICBjb25zdCBnZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gKG9iaiwgZmllbGQpIHtcclxuICAgIHJldHVybiBzZWFyY2hEZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xyXG4gIGNvbnN0IHNldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgdmFsdWUpIHtcclxuICAgIHNlYXJjaERlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgb2JqW2xhc3RGaWVsZF0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG9iajtcclxuICB9O1xyXG5cclxuICByZXR1cm4gZnVuY3Rpb24gaWRiTW9kZWwgKCRkYiwgJG1vZGVsTmFtZSwgJHNvY2tldCkge1xyXG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbbnVsbCAsJ3N0cmluZyddKTtcclxuXHJcbiAgICAvLyBDbGF2ZSBkZWwgbW9kZWxvXHJcbiAgICBjb25zdCAkaWQgPSB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfTtcclxuICAgIGNvbnN0ICRldmVudHNIYW5kbGVycyA9IHt9O1xyXG4gICAgY29uc3QgJGluc3RhbmNlcyA9IHt9O1xyXG4gICAgbGV0ICRmaWVsZHMgPSB7fTtcclxuICAgIGxldCAkcmVtb3RlID0gbnVsbDtcclxuICAgIGxldCAkdmVyc2lvbmluZyA9IG51bGw7XHJcblxyXG4gICAgLy8gQ29uc3R1Y3RvciBkZWwgbW9kZWxvXHJcbiAgICBmdW5jdGlvbiBNb2RlbChkYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgdGhpei4kcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIHRoaXouJGxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGl6LiRsb2NhbExvYWRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGl6LiRyZW1vdGVMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgXHJcbiAgICAgIHRoaXouJGxvY2FsVmFsdWVzID0ge307XHJcbiAgICAgIHRoaXouJHJlbW90ZVZhbHVlcyA9IHt9O1xyXG5cclxuICAgICAgdGhpei4kdmVyc2lvbiA9IG51bGw7XHJcbiAgICAgIHRoaXouJGxvY2FsVmVyc2lvbiA9IG51bGw7XHJcbiAgICAgIHRoaXouJHJlbW90ZVZlcnNpb24gPSBudWxsO1xyXG5cclxuICAgICAgdGhpei4kZXZlbnRzSGFuZGxlcnMgPSB7fTtcclxuICAgICAgXHJcbiAgICAgIGlmIChkYXRhKXtcclxuICAgICAgICB0aGl6LiRzZXRWYWx1ZXMoZGF0YSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXouJGNvbnN0cnVjdG9yKGRhdGEpO1xyXG5cclxuICAgICAgaWYgKCRzb2NrZXQpIHtcclxuICAgICAgICB0aGl6LiRsaXN0ZW4oKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgJHJlc3VsdHMgPSBbXTtcclxuXHJcbiAgICAgIHRoaXpcclxuICAgICAgICBcclxuICAgICAgICAvLyBDdWFuZG8gc2VhIGNvbnN1bHRhZG8gYWdyZWdhciBsYSBjb25zdWx0YVxyXG4gICAgICAgIC4kYmluZChpZGJFdmVudHMuTU9ERUxfUVVFUklFRCwgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgJHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIEN1YW5kbyBzZWEgbGliZXJhZG8gZGUgbGEgY29uc3VsdGFyIHF1aXRhciBkZSBsYXMgY29uc3VsdGFzXHJcbiAgICAgICAgLiRiaW5kKGlkYkV2ZW50cy5NT0RFTF9VTlFVRVJJRUQsIGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgIGNvbnN0IGlkeCA9ICRyZXN1bHRzLmluZGV4T2YocmVzdWx0KTtcclxuICAgICAgICAgIGlmIChpZHggIT0gLTEpe1xyXG4gICAgICAgICAgICAkcmVzdWx0cy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBFdmVudG8gZGUgcXVlIG1vZGVsbyBlc3TDoSBpbnN0YW5jaWFkb1xyXG4gICAgICAgIC4kZW1pdChpZGJFdmVudHMuTU9ERUxfSU5TVEFOQ0VEKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHYgZWwgbm9tYnJlIGRlbCBtb2RlbG9cclxuICAgIE1vZGVsLmdldE1vZGVsTmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHJldHVybiAkbW9kZWxOYW1lO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xyXG4gICAgTW9kZWwuYXV0b0luY3JlbWVudCA9IGZ1bmN0aW9uIChhdXRvSW5jcmVtZW50KSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydib29sZWFuJ10pO1xyXG5cclxuICAgICAgJGlkLmF1dG9JbmNyZW1lbnQgPSBhdXRvSW5jcmVtZW50O1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgZWwgSUQgYWwgbW9kZWxvXHJcbiAgICBNb2RlbC5rZXlQYXRoID0gZnVuY3Rpb24gKGtleVBhdGgpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZyddKTtcclxuXHJcbiAgICAgICRpZC5rZXlQYXRoID0ga2V5UGF0aDtcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RvIHN0b3JhZ2UgcGFyYSBlbCBtb2RlbG8uXHJcbiAgICBNb2RlbC5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICRkYi5jcmVhdGVTdG9yZSgkbW9kZWxOYW1lLCAkaWQpO1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZ3JlZ2EgdW4gaW5kZXhcclxuICAgIE1vZGVsLmluZGV4ID0gZnVuY3Rpb24gKGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XHJcblxyXG4gICAgICAkZGIuY3JlYXRlSW5kZXgoJG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBNw6l0b2RvIHF1ZSBwZXJtaXRlIG1vZGlmaWNhciBtb2RlbC5cclxuICAgIE1vZGVsLmJ1aWxkID0gZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgYnVpbGRDYWxsYmFjayhNb2RlbCk7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBsYSBlc3BlY2lmaWNhY2nDs24gZGUgbG9zIGNhbXBvc1xyXG4gICAgTW9kZWwuZmllbGRzID0gZnVuY3Rpb24gKGZpZWxkcykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xyXG5cclxuICAgICAgJGZpZWxkcyA9IHt9O1xyXG4gICAgICAkZmllbGRzWyRpZC5rZXlQYXRoXSA9IHtcclxuICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIixcclxuICAgICAgICBcInJlcXVpcmVkXCI6IHRydWVcclxuICAgICAgfTtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZE5hbWUpIHtcclxuICAgICAgICBsZXQgZmllbGQgPSBmaWVsZHNbZmllbGROYW1lXTtcclxuICAgICAgICBpZiAodHlwZW9mIGZpZWxkc1tmaWVsZE5hbWVdID09ICdzdHJpbmcnKXtcclxuICAgICAgICAgIGZpZWxkID0geyBcInR5cGVcIjogZmllbGQgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJGZpZWxkc1tmaWVsZE5hbWVdID0gZmllbGQ7XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGk7XHJcbiAgICBNb2RlbC5yZW1vdGUgPSBmdW5jdGlvbiAodXJsLCBhcmdzLCBhY3Rpb25zKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0JywgJ29iamVjdCddKTtcclxuXHJcbiAgICAgICRyZW1vdGUgPSBsYlJlc291cmNlKHVybCwgYXJncywgYWN0aW9ucyk7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgJHJlbW90ZSBkZWwgbW9kZWxvXHJcbiAgICBNb2RlbC5nZXRSZW1vdGUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICByZXR1cm4gJHJlbW90ZTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGNvcnJlc3BvbmRpZW50ZSBhbCBrZXkgZGUgdW4gb2JqZXRvXHJcbiAgICBNb2RlbC5nZXRLZXlGcm9tID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUoZGF0YSwgJGlkLmtleVBhdGgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGVsIG1vZGVsIGRlIGxhcyBndWFyZGFkYXMuIFNpIG5vIGV4aXN0ZSBlbnRvbmNlXHJcbiAgICAvLyBzZSBjcmVhXHJcbiAgICBNb2RlbC5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydzdHJpbmcnLCAnbnVtYmVyJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcclxuICAgICAgaWYgKCFrZXkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1vZGVsKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE5vIGV4aXN0ZSBsYSBpbnN0YW5jaWEgZW50b25jZSBzZSBjcmVhXHJcbiAgICAgIGlmICghJGluc3RhbmNlc1trZXldKXtcclxuICAgICAgICAkaW5zdGFuY2VzW2tleV0gPSBuZXcgTW9kZWwoKTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgcmV0dXJuICRpbnN0YW5jZXNba2V5XTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEJ1c2NhIHVuIHJlZ2lzdHJvIGVuIGxhIG9iamVjdFN0b3JlIGRlbCBtb2RlbG8uXHJcbiAgICBNb2RlbC5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcblxyXG4gICAgICBjb25zdCBpbnN0YW5jZSA9IE1vZGVsLmdldEluc3RhbmNlKGtleSk7XHJcblxyXG4gICAgICBpZiAoaW5zdGFuY2UuJGxvY2FsTG9hZGVkKSByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgICAgXHJcbiAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IGZhbHNlO1xyXG4gICAgICBpbnN0YW5jZS4kcHJvbWlzZSA9IGRlZmVyZWQucHJvbWlzZTtcclxuXHJcbiAgICAgICRkYi5nZXQoJG1vZGVsTmFtZSwga2V5KS5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBNb2RlbC5nZXRWZXJzaW9uT2Yoa2V5KS5wcm9taXNlXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAodmVyc2lvbikge1xyXG4gICAgICAgICAgICBpbnN0YW5jZS4kc2V0TG9jYWxWYWx1ZXMoZGF0YSwgZGF0YSAmJiB2ZXJzaW9uPyB2ZXJzaW9uLmhhc2ggOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICRsb2cuZXJyb3IoWydNb2RlbC5nZXRWZXJzaW9uT2YgYW55IGVycm9yJywgZXJyXSlcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cclxuICAgIE1vZGVsLmZpbmQgPSBmdW5jdGlvbiAoZmlsdGVycykge1xyXG5cclxuICAgICAgcmV0dXJuIG5ldyBpZGJRdWVyeSgkZGIsIE1vZGVsLCBmaWx0ZXJzKTs7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIG51ZXZhcyBpbnN0YW5jaWFzIGRlIGxvcyBtb2RlbG9zXHJcbiAgICBNb2RlbC5jcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgLy8gU2kgZXMgdW4gYXJyYXlcclxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCByZWNvcmQgPSBNb2RlbC5nZXRJbnN0YW5jZShNb2RlbC5nZXRLZXlGcm9tKGRhdGEpKTtcclxuXHJcbiAgICAgICAgaWYgKHJlY29yZC4kbG9hZGVkKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkNhbnRDcmVhdGVkTG9hZGVkSW5zdGFuY2UnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZWNvcmQuJHB1bGwoKTtcclxuXHJcbiAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgLy8gT2J0ZW5lciB1bmEgY29waWEgZGVsIGFycmF5XHJcbiAgICAgIGNvbnN0IGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRhdGEpO1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKGNiKTtcclxuXHJcbiAgICAgIChmdW5jdGlvbiBpdGVyYXRpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyBObyBxdWVkYW4gZWxlbWVudG9zIGVuIGVsIGFycmF5XHJcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT0gMCkgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZShyZXN1bHQpO1xyXG5cclxuICAgICAgICAvLyBDcmVhciBlbCBzaWd1aWVudGUgZWxlbWVudG9cclxuICAgICAgICBNb2RlbC5jcmVhdGUoYXJyLnNoaWZ0KCkpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBpdGVyYXRpb24oKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KSgpO1xyXG5cclxuICAgICAgLy8gRGV2b2x2ZXIgZWwgcHJvbWlzZVxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgdW4gbW9kZWxvIHBhcmEgZ3VhcmRhciBsYXMgdmVyc2lvbmVzIGRlbCBtb2RlbG8gYWN0dWFsXHJcbiAgICBNb2RlbC52ZXJzaW9uaW5nID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgY2IpIHtcclxuICAgICAgaWYgKHR5cGVvZiBtb2RlbE5hbWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjYiA9IG1vZGVsTmFtZTtcclxuICAgICAgICBtb2RlbE5hbWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoW21vZGVsTmFtZSwgY2JdLCBbWydzdHJpbmcnLCAndW5kZWZpbmVkJ10sIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGlmICghJHZlcnNpb25pbmcpIHtcclxuXHJcbiAgICAgICAgLy8gU2kgZWwgbW9kZWwgbm8gdGllbmUgbm9tYnJlIHNlIGFncmVnYVxyXG4gICAgICAgIGlmICghbW9kZWxOYW1lKXtcclxuICAgICAgICAgIG1vZGVsTmFtZSA9ICRtb2RlbE5hbWUrJ192ZXJzaW9uaW5nJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENyZWFyIG1vZGVsbyBwYXJhIGVsIG1hbmVqbyBkZSBkYXRvc1xyXG4gICAgICAgICR2ZXJzaW9uaW5nID0gJGRiLm1vZGVsKG1vZGVsTmFtZSlcclxuICAgICAgICAgIC5hdXRvSW5jcmVtZW50KGZhbHNlKVxyXG4gICAgICAgICAgLmtleVBhdGgoJGlkLmtleVBhdGgpXHJcbiAgICAgICAgICAuZmllbGRzKHtcclxuICAgICAgICAgICAgXCJoYXNoXCI6IHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9LFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2IpIGNiKCR2ZXJzaW9uaW5nKTtcclxuXHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZSBsYSB2ZXJzaW9uIGxvY2FsIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwuZ2V0VmVyc2lvbk9mID0gZnVuY3Rpb24gKGtleSkgeyBcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgaWYgKCR2ZXJzaW9uaW5nKSB7XHJcbiAgICAgICAgJHZlcnNpb25pbmcuZ2V0KGtleSkuJHByb21pc2VcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZSh2ZXJzaW9uKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkZWZlcmVkLnJlamVjdChudWxsKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRlZmVyZWQucmVzb2x2ZShudWxsKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZ3JlZ2EgdW4gbWFuZGVqYWRvciBkZSBldmVudG9zIGFsIG1vZGVsb1xyXG4gICAgTW9kZWwuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGlmICghJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xyXG5cclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGlzcGFyYSB1biBldmVudG8gZGVsIG1vZGVsXHJcbiAgICBNb2RlbC5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnYXJyYXknXV0pO1xyXG5cclxuICAgICAgaWYgKCRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ubWFwKGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgY2IuYXBwbHkoTW9kZWwsIGFyZ3MgfHwgW10pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGdldCA9IGZ1bmN0aW9uIChmaWVsZCkge1xyXG5cclxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0ID0gZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkge1xyXG5cclxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQsIHZhbHVlKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIHVuIG9iamV0byBjb24gbGFzIHByb3BpZWRhZGVzIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRnZXRWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgY29uc3QgdmFsdWVzID0ge307XHJcbiAgICAgIGRhdGEgPSBkYXRhIHx8IHRoaXM7XHJcblxyXG4gICAgICBPYmplY3Qua2V5cygkZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh2YWx1ZXMsIGZpZWxkLCBnZXRGaWVsZFZhbHVlKGRhdGEsIGZpZWxkKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHZhbHVlcztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIHVuIG9iamV0byBjb24gbGFzIHByb3BpZWRhZGVzIGxvY2FsZXMgZGVsIHJlZ2lzdHJvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGdldExvY2FsVmFsdWVzID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuJGdldFZhbHVlcyh0aGlzLiRsb2NhbFZhbHVlcyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSB1biBtb2RlbG8gY29uIGxhcyBwcm9waWVkYWRlcyByZW1vdGFzIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRnZXRSZW1vdGVWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy4kZ2V0VmFsdWVzKHRoaXMuJHJlbW90ZVZhbHVlcyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRzZXRWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSwgdmVyc2lvbikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XHJcbiAgICAgIFxyXG4gICAgICB0aGl6LiR2ZXJzaW9uID0gdmVyc2lvbjtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXosIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpei4kbG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGxhcyBwcm9waWVkYWRlcyBsb2NhbGVzIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRzZXRMb2NhbFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhLCB2ZXJzaW9uKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcclxuICAgICAgXHJcbiAgICAgIHRoaXouJGxvY2FsVmVyc2lvbiA9IHZlcnNpb247XHJcblxyXG4gICAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRsb2NhbFZhbHVlcywgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgIHRoaXouJGxvY2FsTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICBpZiAoIXRoaXouJGxvYWRlZCkge1xyXG4gICAgICAgICAgdGhpei4kc2V0VmFsdWVzKGRhdGEsIHZlcnNpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGxhcyBwcm9waWVkYWRlcyByZW1vdGFzIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRzZXRSZW1vdGVWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSwgdmVyc2lvbikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XHJcbiAgICAgIFxyXG4gICAgICB0aGl6LiRyZW1vdGVWZXJzaW9uID0gdmVyc2lvbjtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJHJlbW90ZVZhbHVlcywgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgIHRoaXouJHJlbW90ZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKCF0aGl6LiRsb2FkZWQpIHtcclxuICAgICAgICAgIHRoaXouJHNldFZhbHVlcyhkYXRhLCB2ZXJzaW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGVsIElEIGRlbCBvYmpldG9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0S2V5ID0gZnVuY3Rpb24gKG5ld0tleSkge1xyXG4gICAgICBcclxuICAgICAgY29uc3Qgb2xkS2V5ID0gTW9kZWwuZ2V0S2V5RnJvbSh0aGlzKTtcclxuXHJcbiAgICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGlzLCAkaWQua2V5UGF0aCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICAgICAgb2JqW2xhc3RGaWVsZF0gPSBuZXdLZXk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKG9sZEtleSAhPT0gbmV3S2V5KSB7XHJcblxyXG4gICAgICAgIGlmIChvbGRLZXkgJiYgJGluc3RhbmNlc1tvbGRLZXldICYmICRpbnN0YW5jZXNbb2xkS2V5XSAhPSB0aGlzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkluc3RhbmNlT2ZPbGRLZXlJc05vdFNhbWUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5ld0tleSAmJiAkaW5zdGFuY2VzW25ld0tleV0gJiYgJGluc3RhbmNlc1tuZXdLZXldICE9IHRoaXMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk5ld0tleUlzTm90U2FtZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRWxpbWluYXIgYW50ZXJpb3JcclxuICAgICAgICBpZiAob2xkS2V5ICYmICRpbnN0YW5jZXNbb2xkS2V5XSkge1xyXG4gICAgICAgICAgZGVsZXRlICRpbnN0YW5jZXNbb2xkS2V5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFncmVnYXIgbnVldmFcclxuICAgICAgICBpZiAobmV3S2V5ICYmICEkaW5zdGFuY2VzW25ld0tleV0pIHtcclxuICAgICAgICAgICRpbnN0YW5jZXNbbmV3S2V5XSA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbnN0dXJjdG9yIHF1ZSBzZSBwdWVkZSBzb2JyZSBlc2NyaWJpclxyXG4gICAgTW9kZWwucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEd1YXJkYSBsb3MgZGF0b3MgZGVsIG9iamV0b1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRwdWxsID0gZnVuY3Rpb24gKG5ld1ZhbHVlcywgdmVyc2lvbil7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgaWYgKG5ld1ZhbHVlcykge1xyXG4gICAgICAgIG5ld1ZhbHVlcyA9IHRoaXouJGdldFZhbHVlcyhuZXdWYWx1ZXMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld1ZhbHVlcyA9IHRoaXouJGdldFJlbW90ZVZhbHVlcygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBuZXdLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKG5ld1ZhbHVlcyk7XHJcbiAgICAgIGNvbnN0IG9sZFZhbHVlcyA9IHRoaXouJGdldExvY2FsVmFsdWVzKCk7XHJcbiAgICAgIGNvbnN0IG9sZEtleSA9IE1vZGVsLmdldEtleUZyb20ob2xkVmFsdWVzKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKG5ld0tleSwgb2xkS2V5KTtcclxuICAgICAgY29uc29sZS5sb2cobmV3VmFsdWVzLCBvbGRWYWx1ZXMpO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBGdW5jaW9uIHF1ZSBoYWNlIGVzY3VjaGFycyBsb3MgbWVuc2FqZXMgZGVsIHNvY2tldCBwYXJhIGVsIG1vZGVsXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGxpc3RlbiA9IGZ1bmN0aW9uICgpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlmICghJHNvY2tldCkgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5Eb2VzTm90SGF2ZVNvY2tldEluc3RhbmNlJyk7XHJcblxyXG4gICAgICAvLyBDcmVhciB1bmEgc3Vic2NyaXBjaW9uIGFsIHNvY2tldCBwYXJhIGN1YW5kbyBzZSByZWNpYmFuIGRhdG9zXHJcbiAgICAgIC8vIHBhcmEgbGEgaW5zdGFuY2lhIGFjdHVhbFxyXG4gICAgICAkc29ja2V0LnN1YnNjcmliZSh7XHJcbiAgICAgICAgbW9kZWxOYW1lOiAkbW9kZWxOYW1lLFxyXG4gICAgICAgIGV2ZW50TmFtZTogJ3VwZGF0ZScsXHJcbiAgICAgICAgbW9kZWxJZDogdGhpei4kZ2V0KCRpZC5rZXlQYXRoKSxcclxuICAgICAgfSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgLy8gQSByZWNpYmlyIGRhdG9zIGRlbCBzb2NrZXQgYXNpZ25hciBsb3MgdmFsb3Jlc1xyXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIC8vIEVtaXRpciBldmVudG8gZGUgZGF0b3MgcmVjaWJpZG9yIHBhcmEgZWwgbW9kZWxvXHJcbiAgICAgICAgICB0aGl6LiRzZXRSZW1vdGVWYWx1ZXMoZGF0YS52YWx1ZXMsIGRhdGEudmVyc2lvbik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBtYW5kZWphZG9yIGRlIGV2ZW50b3NcclxuICAgIE1vZGVsLnByb3RvdHlwZS4kYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGlmICghdGhpcy4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSkge1xyXG4gICAgICAgIHRoaXMuJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEaXNwYXJhIHVuIGV2ZW50b1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRlbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsndW5kZWZpbmVkJywgJ2FycmF5J11dKTtcclxuXHJcbiAgICAgIC8vIExsYW1hciBlbCBldmVudG8gcGFyYSBlbCBtb2RlbG9cclxuICAgICAgTW9kZWwuZW1pdChldmVudE5hbWUsIFt0aGl6LCBbXS5jb25jYXQoW3RoaXpdKS5jb25jYXQoYXJncyldKTtcclxuXHJcbiAgICAgIGlmICh0aGl6LiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgdGhpei4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5tYXAoZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgICBjYi5hcHBseSh0aGl6LCBhcmdzIHx8IFtdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBNb2RlbC4kaW5zdGFuY2VzID0gJGluc3RhbmNlcztcclxuXHJcbiAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gIH07XHJcblxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJNb2RlbFNlcnZpY2U7XG5mdW5jdGlvbiBpZGJNb2RlbFNlcnZpY2UoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJRdWVyeSwgaWRiRXZlbnRzLCBsYlJlc291cmNlLCAkdGltZW91dCkge1xuICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgLy8gQnVzY2FyIHVuIGNhbXBvXG5cbiAgICAgIHZhciBzZWFyY2hEZWVwRmllbGQgPSBmdW5jdGlvbiBzZWFyY2hEZWVwRmllbGQob2JqLCBmaWVsZCwgY2IpIHtcbiAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICAgICAgICB2YXIgZmllbGRzID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIHZhciBsYXN0RmllbGQgPSBmaWVsZHMucG9wKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBfc2V0KG9iaikge1xuICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMCkgcmV0dXJuIGNiKG9iaiwgbGFzdEZpZWxkKTtcbiAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAndW5kZWZpbmVkJykgb2JqW2ZpZWxkXSA9IHt9O1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XG4gICAgICAgICAgICB9KG9iaik7XG4gICAgICB9O1xuXG4gICAgICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cbiAgICAgIHZhciBnZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gZ2V0RmllbGRWYWx1ZShvYmosIGZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VhcmNoRGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xuICAgICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cbiAgICAgIHZhciBzZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gc2V0RmllbGRWYWx1ZShvYmosIGZpZWxkLCB2YWx1ZSkge1xuICAgICAgICAgICAgc2VhcmNoRGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICAgICAgICAgICAgb2JqW2xhc3RGaWVsZF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpZGJNb2RlbCgkZGIsICRtb2RlbE5hbWUsICRzb2NrZXQpIHtcbiAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW251bGwsICdzdHJpbmcnXSk7XG5cbiAgICAgICAgICAgIC8vIENsYXZlIGRlbCBtb2RlbG9cbiAgICAgICAgICAgIHZhciAkaWQgPSB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfTtcbiAgICAgICAgICAgIHZhciAkZXZlbnRzSGFuZGxlcnMgPSB7fTtcbiAgICAgICAgICAgIHZhciAkaW5zdGFuY2VzID0ge307XG4gICAgICAgICAgICB2YXIgJGZpZWxkcyA9IHt9O1xuICAgICAgICAgICAgdmFyICRyZW1vdGUgPSBudWxsO1xuICAgICAgICAgICAgdmFyICR2ZXJzaW9uaW5nID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gQ29uc3R1Y3RvciBkZWwgbW9kZWxvXG4gICAgICAgICAgICBmdW5jdGlvbiBNb2RlbChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRsb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHRoaXouJGxvY2FsTG9hZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB0aGl6LiRyZW1vdGVMb2FkZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgdGhpei4kbG9jYWxWYWx1ZXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgIHRoaXouJHJlbW90ZVZhbHVlcyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiR2ZXJzaW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgIHRoaXouJGxvY2FsVmVyc2lvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICB0aGl6LiRyZW1vdGVWZXJzaW9uID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgdGhpei4kZXZlbnRzSGFuZGxlcnMgPSB7fTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXouJHNldFZhbHVlcyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgdGhpei4kY29uc3RydWN0b3IoZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICgkc29ja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGl6LiRsaXN0ZW4oKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgdmFyICRyZXN1bHRzID0gW107XG5cbiAgICAgICAgICAgICAgICAgIHRoaXpcblxuICAgICAgICAgICAgICAgICAgLy8gQ3VhbmRvIHNlYSBjb25zdWx0YWRvIGFncmVnYXIgbGEgY29uc3VsdGFcbiAgICAgICAgICAgICAgICAgIC4kYmluZChpZGJFdmVudHMuTU9ERUxfUVVFUklFRCwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgLy8gQ3VhbmRvIHNlYSBsaWJlcmFkbyBkZSBsYSBjb25zdWx0YXIgcXVpdGFyIGRlIGxhcyBjb25zdWx0YXNcbiAgICAgICAgICAgICAgICAgIC4kYmluZChpZGJFdmVudHMuTU9ERUxfVU5RVUVSSUVELCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWR4ID0gJHJlc3VsdHMuaW5kZXhPZihyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAvLyBFdmVudG8gZGUgcXVlIG1vZGVsbyBlc3TDoSBpbnN0YW5jaWFkb1xuICAgICAgICAgICAgICAgICAgLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9JTlNUQU5DRUQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdiBlbCBub21icmUgZGVsIG1vZGVsb1xuICAgICAgICAgICAgTW9kZWwuZ2V0TW9kZWxOYW1lID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gJG1vZGVsTmFtZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cbiAgICAgICAgICAgIE1vZGVsLmF1dG9JbmNyZW1lbnQgPSBmdW5jdGlvbiAoYXV0b0luY3JlbWVudCkge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Jvb2xlYW4nXSk7XG5cbiAgICAgICAgICAgICAgICAgICRpZC5hdXRvSW5jcmVtZW50ID0gYXV0b0luY3JlbWVudDtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBNb2RlbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cbiAgICAgICAgICAgIE1vZGVsLmtleVBhdGggPSBmdW5jdGlvbiAoa2V5UGF0aCkge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZyddKTtcblxuICAgICAgICAgICAgICAgICAgJGlkLmtleVBhdGggPSBrZXlQYXRoO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQ3JlYSBlbCBvYmplY3RvIHN0b3JhZ2UgcGFyYSBlbCBtb2RlbG8uXG4gICAgICAgICAgICBNb2RlbC5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgJGRiLmNyZWF0ZVN0b3JlKCRtb2RlbE5hbWUsICRpZCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBZ3JlZ2EgdW4gaW5kZXhcbiAgICAgICAgICAgIE1vZGVsLmluZGV4ID0gZnVuY3Rpb24gKGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XG5cbiAgICAgICAgICAgICAgICAgICRkYi5jcmVhdGVJbmRleCgkbW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBNw6l0b2RvIHF1ZSBwZXJtaXRlIG1vZGlmaWNhciBtb2RlbC5cbiAgICAgICAgICAgIE1vZGVsLmJ1aWxkID0gZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcblxuICAgICAgICAgICAgICAgICAgYnVpbGRDYWxsYmFjayhNb2RlbCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBc2lnbmEgbGEgZXNwZWNpZmljYWNpw7NuIGRlIGxvcyBjYW1wb3NcbiAgICAgICAgICAgIE1vZGVsLmZpZWxkcyA9IGZ1bmN0aW9uIChmaWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnXSk7XG5cbiAgICAgICAgICAgICAgICAgICRmaWVsZHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICRmaWVsZHNbJGlkLmtleVBhdGhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCI6IHRydWVcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IGZpZWxkc1tmaWVsZE5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZHNbZmllbGROYW1lXSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQgPSB7IFwidHlwZVwiOiBmaWVsZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgJGZpZWxkc1tmaWVsZE5hbWVdID0gZmllbGQ7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGk7XG4gICAgICAgICAgICBNb2RlbC5yZW1vdGUgPSBmdW5jdGlvbiAodXJsLCBhcmdzLCBhY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCcsICdvYmplY3QnXSk7XG5cbiAgICAgICAgICAgICAgICAgICRyZW1vdGUgPSBsYlJlc291cmNlKHVybCwgYXJncywgYWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGVsICRyZW1vdGUgZGVsIG1vZGVsb1xuICAgICAgICAgICAgTW9kZWwuZ2V0UmVtb3RlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gJHJlbW90ZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGNvcnJlc3BvbmRpZW50ZSBhbCBrZXkgZGUgdW4gb2JqZXRvXG4gICAgICAgICAgICBNb2RlbC5nZXRLZXlGcm9tID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsICRpZC5rZXlQYXRoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgbW9kZWwgZGUgbGFzIGd1YXJkYWRhcy4gU2kgbm8gZXhpc3RlIGVudG9uY2VcbiAgICAgICAgICAgIC8vIHNlIGNyZWFcbiAgICAgICAgICAgIE1vZGVsLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydzdHJpbmcnLCAnbnVtYmVyJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIC8vIEVsIG9iamV0byBubyB0aWVuZSBJRFxuICAgICAgICAgICAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTW9kZWwoKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgLy8gTm8gZXhpc3RlIGxhIGluc3RhbmNpYSBlbnRvbmNlIHNlIGNyZWFcbiAgICAgICAgICAgICAgICAgIGlmICghJGluc3RhbmNlc1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5zdGFuY2VzW2tleV0gPSBuZXcgTW9kZWwoKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgcmV0dXJuICRpbnN0YW5jZXNba2V5XTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEJ1c2NhIHVuIHJlZ2lzdHJvIGVuIGxhIG9iamVjdFN0b3JlIGRlbCBtb2RlbG8uXG4gICAgICAgICAgICBNb2RlbC5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG5cbiAgICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IE1vZGVsLmdldEluc3RhbmNlKGtleSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS4kbG9jYWxMb2FkZWQpIHJldHVybiBpbnN0YW5jZTtcblxuICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAgICAgICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIGluc3RhbmNlLiRwcm9taXNlID0gZGVmZXJlZC5wcm9taXNlO1xuXG4gICAgICAgICAgICAgICAgICAkZGIuZ2V0KCRtb2RlbE5hbWUsIGtleSkucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RlbC5nZXRWZXJzaW9uT2Yoa2V5KS5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLiRzZXRMb2NhbFZhbHVlcyhkYXRhLCBkYXRhICYmIHZlcnNpb24gPyB2ZXJzaW9uLmhhc2ggOiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbG9nLmVycm9yKFsnTW9kZWwuZ2V0VmVyc2lvbk9mIGFueSBlcnJvcicsIGVycl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cbiAgICAgICAgICAgIE1vZGVsLmZpbmQgPSBmdW5jdGlvbiAoZmlsdGVycykge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGlkYlF1ZXJ5KCRkYiwgTW9kZWwsIGZpbHRlcnMpOztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIENyZWEgbnVldmFzIGluc3RhbmNpYXMgZGUgbG9zIG1vZGVsb3NcbiAgICAgICAgICAgIE1vZGVsLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICAvLyBTaSBlcyB1biBhcnJheVxuICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWNvcmQgPSBNb2RlbC5nZXRJbnN0YW5jZShNb2RlbC5nZXRLZXlGcm9tKGRhdGEpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29yZC4kbG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkNhbnRDcmVhdGVkTG9hZGVkSW5zdGFuY2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlY29yZC4kcHVsbCgpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAvLyBPYnRlbmVyIHVuYSBjb3BpYSBkZWwgYXJyYXlcbiAgICAgICAgICAgICAgICAgIHZhciBhcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhKTtcbiAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoY2IpO1xuXG4gICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gaXRlcmF0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBObyBxdWVkYW4gZWxlbWVudG9zIGVuIGVsIGFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PSAwKSByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWFyIGVsIHNpZ3VpZW50ZSBlbGVtZW50b1xuICAgICAgICAgICAgICAgICAgICAgICAgTW9kZWwuY3JlYXRlKGFyci5zaGlmdCgpKS50aGVuKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgICAgICAgICAvLyBEZXZvbHZlciBlbCBwcm9taXNlXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIENyZWEgdW4gbW9kZWxvIHBhcmEgZ3VhcmRhciBsYXMgdmVyc2lvbmVzIGRlbCBtb2RlbG8gYWN0dWFsXG4gICAgICAgICAgICBNb2RlbC52ZXJzaW9uaW5nID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgY2IpIHtcbiAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbW9kZWxOYW1lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYiA9IG1vZGVsTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKFttb2RlbE5hbWUsIGNiXSwgW1snc3RyaW5nJywgJ3VuZGVmaW5lZCddLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICghJHZlcnNpb25pbmcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2kgZWwgbW9kZWwgbm8gdGllbmUgbm9tYnJlIHNlIGFncmVnYVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtb2RlbE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsTmFtZSA9ICRtb2RlbE5hbWUgKyAnX3ZlcnNpb25pbmcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhciBtb2RlbG8gcGFyYSBlbCBtYW5lam8gZGUgZGF0b3NcbiAgICAgICAgICAgICAgICAgICAgICAgICR2ZXJzaW9uaW5nID0gJGRiLm1vZGVsKG1vZGVsTmFtZSkuYXV0b0luY3JlbWVudChmYWxzZSkua2V5UGF0aCgkaWQua2V5UGF0aCkuZmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGFzaFwiOiB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmIChjYikgY2IoJHZlcnNpb25pbmcpO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGUgbGEgdmVyc2lvbiBsb2NhbCBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLmdldFZlcnNpb25PZiA9IGZ1bmN0aW9uIChrZXkpIHtcblxuICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoJHZlcnNpb25pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICR2ZXJzaW9uaW5nLmdldChrZXkpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZSh2ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFncmVnYSB1biBtYW5kZWphZG9yIGRlIGV2ZW50b3MgYWwgbW9kZWxvXG4gICAgICAgICAgICBNb2RlbC5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCEkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGlzcGFyYSB1biBldmVudG8gZGVsIG1vZGVsXG4gICAgICAgICAgICBNb2RlbC5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsndW5kZWZpbmVkJywgJ2FycmF5J11dKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5tYXAoZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYi5hcHBseShNb2RlbCwgYXJncyB8fCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRnZXQgPSBmdW5jdGlvbiAoZmllbGQpIHtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0ID0gZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCwgdmFsdWUpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgdW4gb2JqZXRvIGNvbiBsYXMgcHJvcGllZGFkZXMgZGVsIHJlZ2lzdHJvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJGdldFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0ge307XG4gICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YSB8fCB0aGlzO1xuXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cygkZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGaWVsZFZhbHVlKHZhbHVlcywgZmllbGQsIGdldEZpZWxkVmFsdWUoZGF0YSwgZmllbGQpKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgdW4gb2JqZXRvIGNvbiBsYXMgcHJvcGllZGFkZXMgbG9jYWxlcyBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0TG9jYWxWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kbG9jYWxWYWx1ZXMpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgdW4gbW9kZWxvIGNvbiBsYXMgcHJvcGllZGFkZXMgcmVtb3RhcyBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0UmVtb3RlVmFsdWVzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kZ2V0VmFsdWVzKHRoaXMuJHJlbW90ZVZhbHVlcyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIGRlbCByZWdpc3Ryb1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRzZXRWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSwgdmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXouJHZlcnNpb24gPSB2ZXJzaW9uO1xuXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXosIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgdGhpei4kbG9hZGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIGxvY2FsZXMgZGVsIHJlZ2lzdHJvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJHNldExvY2FsVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRsb2NhbFZlcnNpb24gPSB2ZXJzaW9uO1xuXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJGxvY2FsVmFsdWVzLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGl6LiRsb2NhbExvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXouJGxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpei4kc2V0VmFsdWVzKGRhdGEsIHZlcnNpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBsYXMgcHJvcGllZGFkZXMgcmVtb3RhcyBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0UmVtb3RlVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRyZW1vdGVWZXJzaW9uID0gdmVyc2lvbjtcblxuICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRyZW1vdGVWYWx1ZXMsIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXouJHJlbW90ZUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXouJGxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpei4kc2V0VmFsdWVzKGRhdGEsIHZlcnNpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBlbCBJRCBkZWwgb2JqZXRvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJHNldEtleSA9IGZ1bmN0aW9uIChuZXdLZXkpIHtcblxuICAgICAgICAgICAgICAgICAgdmFyIG9sZEtleSA9IE1vZGVsLmdldEtleUZyb20odGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGlzLCAkaWQua2V5UGF0aCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IG5ld0tleTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAob2xkS2V5ICE9PSBuZXdLZXkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZEtleSAmJiAkaW5zdGFuY2VzW29sZEtleV0gJiYgJGluc3RhbmNlc1tvbGRLZXldICE9IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk9sZEtleUlzTm90U2FtZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0tleSAmJiAkaW5zdGFuY2VzW25ld0tleV0gJiYgJGluc3RhbmNlc1tuZXdLZXldICE9IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk5ld0tleUlzTm90U2FtZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFbGltaW5hciBhbnRlcmlvclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZEtleSAmJiAkaW5zdGFuY2VzW29sZEtleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSAkaW5zdGFuY2VzW29sZEtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFncmVnYXIgbnVldmFcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdLZXkgJiYgISRpbnN0YW5jZXNbbmV3S2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGluc3RhbmNlc1tuZXdLZXldID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDb25zdHVyY3RvciBxdWUgc2UgcHVlZGUgc29icmUgZXNjcmliaXJcbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZGF0YSkge307XG5cbiAgICAgICAgICAgIC8vIEd1YXJkYSBsb3MgZGF0b3MgZGVsIG9iamV0b1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRwdWxsID0gZnVuY3Rpb24gKG5ld1ZhbHVlcywgdmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVzID0gdGhpei4kZ2V0VmFsdWVzKG5ld1ZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVzID0gdGhpei4kZ2V0UmVtb3RlVmFsdWVzKCk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHZhciBuZXdLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKG5ld1ZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICB2YXIgb2xkVmFsdWVzID0gdGhpei4kZ2V0TG9jYWxWYWx1ZXMoKTtcbiAgICAgICAgICAgICAgICAgIHZhciBvbGRLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKG9sZFZhbHVlcyk7XG5cbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0tleSwgb2xkS2V5KTtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1ZhbHVlcywgb2xkVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBGdW5jaW9uIHF1ZSBoYWNlIGVzY3VjaGFycyBsb3MgbWVuc2FqZXMgZGVsIHNvY2tldCBwYXJhIGVsIG1vZGVsXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJGxpc3RlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlmICghJHNvY2tldCkgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5Eb2VzTm90SGF2ZVNvY2tldEluc3RhbmNlJyk7XG5cbiAgICAgICAgICAgICAgICAgIC8vIENyZWFyIHVuYSBzdWJzY3JpcGNpb24gYWwgc29ja2V0IHBhcmEgY3VhbmRvIHNlIHJlY2liYW4gZGF0b3NcbiAgICAgICAgICAgICAgICAgIC8vIHBhcmEgbGEgaW5zdGFuY2lhIGFjdHVhbFxuICAgICAgICAgICAgICAgICAgJHNvY2tldC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxOYW1lOiAkbW9kZWxOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiAndXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsSWQ6IHRoaXouJGdldCgkaWQua2V5UGF0aClcbiAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgcmVjaWJpciBkYXRvcyBkZWwgc29ja2V0IGFzaWduYXIgbG9zIHZhbG9yZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVtaXRpciBldmVudG8gZGUgZGF0b3MgcmVjaWJpZG9yIHBhcmEgZWwgbW9kZWxvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGl6LiRzZXRSZW1vdGVWYWx1ZXMoZGF0YS52YWx1ZXMsIGRhdGEudmVyc2lvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQWdyZWdhIHVuIG1hbmRlamFkb3IgZGUgZXZlbnRvc1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRiaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdID0gW107XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHRoaXMuJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEaXNwYXJhIHVuIGV2ZW50b1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRlbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsndW5kZWZpbmVkJywgJ2FycmF5J11dKTtcblxuICAgICAgICAgICAgICAgICAgLy8gTGxhbWFyIGVsIGV2ZW50byBwYXJhIGVsIG1vZGVsb1xuICAgICAgICAgICAgICAgICAgTW9kZWwuZW1pdChldmVudE5hbWUsIFt0aGl6LCBbXS5jb25jYXQoW3RoaXpdKS5jb25jYXQoYXJncyldKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKHRoaXouJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXouJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ubWFwKGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IuYXBwbHkodGhpeiwgYXJncyB8fCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBNb2RlbC4kaW5zdGFuY2VzID0gJGluc3RhbmNlcztcblxuICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJRdWVyeSAoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJFdmVudHMpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gZnVuY3Rpb24gaWRiUXVlcnkoJGRiLCAkTW9kZWwsICRmaWx0ZXJzKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdmdW5jdGlvbicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgbGV0ICRyZXN1bHQgPSBudWxsO1xyXG5cclxuICAgIC8vIEZ1bmNpb24gcXVlIGRldnVlbHZlIGVqZWN1dGEgZWwgcXVlcnkgeSBkZXZ1ZWx2ZSBlbCByZXN1bHRhZG8uXHJcbiAgICB0aGl6LmdldFJlc3VsdCA9IGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgLy8gRWplY3V0YXIgc2kgbm8gc2UgaGEgZWplY3V0YWRvXHJcbiAgICAgIGlmICghJHJlc3VsdCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG4gICAgICAgICRyZXN1bHQgPSBbXTtcclxuICAgICAgICAkcmVzdWx0LiRyZXNvbHZlZCA9IGZhbHNlO1xyXG4gICAgICAgICRyZXN1bHQuJHByb21pc2UgPSBkZWZlcmVkLnByb21pc2U7XHJcblxyXG4gICAgICAgICRkYi5vcGVuQ3Vyc29yKCRNb2RlbC5nZXRNb2RlbE5hbWUoKSwgJGZpbHRlcnMsIGZ1bmN0aW9uIChkYXRhLCBuZXh0KSB7XHJcblxyXG4gICAgICAgICAgY29uc3Qga2V5ID0gJE1vZGVsLmdldEtleUZyb20oZGF0YSk7XHJcblxyXG4gICAgICAgICAgLy8gT2J0ZW5lciBsYSBpbnN0YW5jaWFcclxuICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gJE1vZGVsLmdldEluc3RhbmNlKGtleSk7XHJcblxyXG4gICAgICAgICAgaWYgKGluc3RhbmNlLiRsb2NhbExvYWRlZCkgcmV0dXJuIG5leHQoKTtcclxuXHJcbiAgICAgICAgICAkTW9kZWwuZ2V0VmVyc2lvbk9mKGtleSkucHJvbWlzZVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodmVyc2lvbikge1xyXG5cclxuICAgICAgICAgICAgICBpbnN0YW5jZS4kc2V0TG9jYWxWYWx1ZXMoZGF0YSwgZGF0YSAmJiB2ZXJzaW9uPyB2ZXJzaW9uLmhhc2ggOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgaW5zdGFuY2UuJGVtaXQoaWRiRXZlbnRzLk1PREVMX1FVRVJJRUQsIFskcmVzdWx0XSk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIEFncmVnYXIgYWwgcmVzdWx0YWRvXHJcbiAgICAgICAgICAgICAgJHJlc3VsdC5wdXNoKGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gQnVzY2FyIHNpZ3VpZW50ZVxyXG4gICAgICAgICAgICAgIG5leHQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcblxyXG4gICAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgJGxvZy5lcnJvcihbJ01vZGVsLmdldFZlcnNpb25PZiBhbnkgZXJyb3InLCBlcnJdKVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pLnByb21pc2VcclxuXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICRyZXN1bHQuJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZSgkcmVzdWx0KTtcclxuICAgICAgICAgIHRoaXouZ2V0UmVtb3RlUmVzdWx0KCk7XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcblxyXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gJHJlc3VsdDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE9idGllbmUgZWwgcmVzdWx0YWRvIGRlIHZhbG9yZXMgcmVtb3Rvc1xyXG4gICAgdGhpei5nZXRSZW1vdGVSZXN1bHQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICBsZXQgJHJlbW90ZSA9ICRNb2RlbC5nZXRSZW1vdGUoKTtcclxuICAgICAgbGV0ICRyZW1vdGVSZXN1bHQgPSBudWxsO1xyXG5cclxuICAgICAgaWYgKCRyZW1vdGUgJiYgdHlwZW9mICRyZW1vdGUuZmluZCA9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgKCRyZW1vdGVSZXN1bHQgPSAkcmVtb3RlLmZpbmQoJGZpbHRlcnMpLiRwcm9taXNlKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXN1bHQubWFwKGZ1bmN0aW9uIChyZWNvcmQsIGkpIHtcclxuICAgICAgICAgICAgICAkTW9kZWwuZ2V0KCRNb2RlbC5nZXRLZXlGcm9tKHJlY29yZC52YWx1ZXMpKS4kcHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCRyZWNvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgJHJlY29yZC4kc2V0UmVtb3RlVmFsdWVzKHJlY29yZC52YWx1ZXMsIHJlY29yZC52ZXJzaW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmICgkcmVzdWx0W2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRyZXN1bHRbaV0gIT09ICRyZWNvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRbaV0uJGVtaXQoaWRiRXZlbnRzLk1PREVMX1VOUVVFUklFRCwgWyRyZXN1bHRdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgJHJlc3VsdFtpXSA9ICRyZWNvcmQ7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHJlc3VsdC5wdXNoKCRyZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAkcmVjb3JkLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9RVUVSSUVELCBbJHJlc3VsdF0pO1xyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gJHJlbW90ZVJlc3VsdDtcclxuXHJcbiAgICB9O1xyXG5cclxuICB9XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaWRiUXVlcnk7XG5mdW5jdGlvbiBpZGJRdWVyeSgkbG9nLCBxcywgaWRiVXRpbHMsIGlkYkV2ZW50cykge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBmdW5jdGlvbiBpZGJRdWVyeSgkZGIsICRNb2RlbCwgJGZpbHRlcnMpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdmdW5jdGlvbicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICB2YXIgJHJlc3VsdCA9IG51bGw7XG5cbiAgICAvLyBGdW5jaW9uIHF1ZSBkZXZ1ZWx2ZSBlamVjdXRhIGVsIHF1ZXJ5IHkgZGV2dWVsdmUgZWwgcmVzdWx0YWRvLlxuICAgIHRoaXouZ2V0UmVzdWx0ID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIC8vIEVqZWN1dGFyIHNpIG5vIHNlIGhhIGVqZWN1dGFkb1xuICAgICAgaWYgKCEkcmVzdWx0KSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgICAgICAgJHJlc3VsdCA9IFtdO1xuICAgICAgICAgICRyZXN1bHQuJHJlc29sdmVkID0gZmFsc2U7XG4gICAgICAgICAgJHJlc3VsdC4kcHJvbWlzZSA9IGRlZmVyZWQucHJvbWlzZTtcblxuICAgICAgICAgICRkYi5vcGVuQ3Vyc29yKCRNb2RlbC5nZXRNb2RlbE5hbWUoKSwgJGZpbHRlcnMsIGZ1bmN0aW9uIChkYXRhLCBuZXh0KSB7XG5cbiAgICAgICAgICAgIHZhciBrZXkgPSAkTW9kZWwuZ2V0S2V5RnJvbShkYXRhKTtcblxuICAgICAgICAgICAgLy8gT2J0ZW5lciBsYSBpbnN0YW5jaWFcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9ICRNb2RlbC5nZXRJbnN0YW5jZShrZXkpO1xuXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UuJGxvY2FsTG9hZGVkKSByZXR1cm4gbmV4dCgpO1xuXG4gICAgICAgICAgICAkTW9kZWwuZ2V0VmVyc2lvbk9mKGtleSkucHJvbWlzZS50aGVuKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG5cbiAgICAgICAgICAgICAgaW5zdGFuY2UuJHNldExvY2FsVmFsdWVzKGRhdGEsIGRhdGEgJiYgdmVyc2lvbiA/IHZlcnNpb24uaGFzaCA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGluc3RhbmNlLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9RVUVSSUVELCBbJHJlc3VsdF0pO1xuXG4gICAgICAgICAgICAgIC8vIEFncmVnYXIgYWwgcmVzdWx0YWRvXG4gICAgICAgICAgICAgICRyZXN1bHQucHVzaChpbnN0YW5jZSk7XG5cbiAgICAgICAgICAgICAgLy8gQnVzY2FyIHNpZ3VpZW50ZVxuICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgJGxvZy5lcnJvcihbJ01vZGVsLmdldFZlcnNpb25PZiBhbnkgZXJyb3InLCBlcnJdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pLnByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICRyZXN1bHQuJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZSgkcmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXouZ2V0UmVtb3RlUmVzdWx0KCk7XG4gICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXG4gICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJHJlc3VsdDtcbiAgICB9O1xuXG4gICAgLy8gT2J0aWVuZSBlbCByZXN1bHRhZG8gZGUgdmFsb3JlcyByZW1vdG9zXG4gICAgdGhpei5nZXRSZW1vdGVSZXN1bHQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdmFyICRyZW1vdGUgPSAkTW9kZWwuZ2V0UmVtb3RlKCk7XG4gICAgICB2YXIgJHJlbW90ZVJlc3VsdCA9IG51bGw7XG5cbiAgICAgIGlmICgkcmVtb3RlICYmIHR5cGVvZiAkcmVtb3RlLmZpbmQgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAoJHJlbW90ZVJlc3VsdCA9ICRyZW1vdGUuZmluZCgkZmlsdGVycykuJHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdC5tYXAoZnVuY3Rpb24gKHJlY29yZCwgaSkge1xuICAgICAgICAgICAgJE1vZGVsLmdldCgkTW9kZWwuZ2V0S2V5RnJvbShyZWNvcmQudmFsdWVzKSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoJHJlY29yZCkge1xuICAgICAgICAgICAgICAkcmVjb3JkLiRzZXRSZW1vdGVWYWx1ZXMocmVjb3JkLnZhbHVlcywgcmVjb3JkLnZlcnNpb24pO1xuXG4gICAgICAgICAgICAgIGlmICgkcmVzdWx0W2ldKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRyZXN1bHRbaV0gIT09ICRyZWNvcmQpIHtcbiAgICAgICAgICAgICAgICAgICRyZXN1bHRbaV0uJGVtaXQoaWRiRXZlbnRzLk1PREVMX1VOUVVFUklFRCwgWyRyZXN1bHRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHJlc3VsdFtpXSA9ICRyZWNvcmQ7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHJlc3VsdC5wdXNoKCRyZWNvcmQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgJHJlY29yZC4kZW1pdChpZGJFdmVudHMuTU9ERUxfUVVFUklFRCwgWyRyZXN1bHRdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICRyZW1vdGVSZXN1bHQ7XG4gICAgfTtcbiAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYlNvY2tldFNlcnZpY2UoJGxvZywgaW8sIGlkYlV0aWxzKSB7ICduZ0luamVjdCc7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gIFxyXG4gIGxldCAkZGVmVXJsU2VydmVyID0gbnVsbDtcclxuXHJcbiAgZnVuY3Rpb24gaWRiU29ja2V0ICgkdXJsU2VydmVyLCAkYWNjZXNzVG9rZW5JZCwgJGN1cnJlbnRVc2VySWQpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ10sIFsnc3RyaW5nJywgJ251bWJlciddXSk7XHJcblxyXG4gICAgY29uc3QgJGxpc3RlbmVycyA9ICBbXTtcclxuICAgIGxldCAkc29ja2V0ID0gbnVsbDtcclxuICAgICR1cmxTZXJ2ZXIgPSAkdXJsU2VydmVyIHx8ICRkZWZVcmxTZXJ2ZXI7XHJcblxyXG4gICAgLy8gQ29uZWN0YXJzZSBhbCBzZXJ2aWRvclxyXG4gICAgdGhpei5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBcclxuICAgICAgLy8gQ3JlYXRpbmcgY29ubmVjdGlvbiB3aXRoIHNlcnZlclxyXG4gICAgICAkc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsU2VydmVyKTtcclxuXHJcbiAgICAgIC8vIFRoaXMgcGFydCBpcyBvbmx5IGZvciBsb2dpbiB1c2VycyBmb3IgYXV0aGVudGljYXRlZCAkc29ja2V0IGNvbm5lY3Rpb24gYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlci5cclxuICAgICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXHJcblxyXG4gICAgICAkc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkbG9nLmxvZygnY29ubmVjdGVkJyk7XHJcblxyXG4gICAgICAgICRzb2NrZXQuZW1pdCgnYXV0aGVudGljYXRpb24nLCB7XHJcbiAgICAgICAgICBpZDogJGFjY2Vzc1Rva2VuSWQsXHJcbiAgICAgICAgICB1c2VySWQ6ICRjdXJyZW50VXNlcklkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRzb2NrZXQub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIC8vIHVzZSB0aGUgJHNvY2tldCBhcyB1c3VhbFxyXG4gICAgICAgICAgJGxvZy5sb2coJ1VzZXIgaXMgYXV0aGVudGljYXRlZCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgdmFyIG5hbWUgPSBvcHRpb25zLm1vZGVsTmFtZSArICcuJyArIG9wdGlvbnMuZXZlbnROYW1lO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgbmFtZSA9IG5hbWUgKyAnLicgKyBvcHRpb25zLm1vZGVsSWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRzb2NrZXQub24obmFtZSwgY2IpO1xyXG4gICAgICBcclxuICAgICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxyXG4gICAgICAkbGlzdGVuZXJzLnB1c2gobmFtZSwgY2IpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wdXNoTGlzdGVuZXIgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSwgY2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICRsaXN0ZW5lcnMucHVzaChzdWJzY3JpcHRpb25OYW1lKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSkge1xyXG4gICAgICAkc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTsgIFxyXG4gICAgICB2YXIgaWR4ID0gJGxpc3RlbmVycy5pbmRleE9mKHN1YnNjcmlwdGlvbk5hbWUpO1xyXG4gICAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgICAkbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouY29ubmVjdCgpO1xyXG5cclxuICB9O1xyXG5cclxuICAvLyBBc2lnbmEgbGEgVVJMIGRlIHNlcnZpZG9yIHBvciBkZWZlY3RvXHJcbiAgaWRiU29ja2V0LnNldFVybFNlcnZlciA9IGZ1bmN0aW9uICh1cmxTZXJ2ZXIpIHtcclxuICAgICRkZWZVcmxTZXJ2ZXIgPSB1cmxTZXJ2ZXI7XHJcbiAgfTtcclxuXHJcbiAgLy8gQVNpZ25hIGxhcyBjcmVkZW5jaWFsZXMgcG9yIGRlZmVjdG9cclxuICBpZGJTb2NrZXQuc2V0Q3JlZGVudGlhbHMgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCkge1xyXG4gICAgYWNjZXNzVG9rZW5JZCA9ICRhY2Nlc3NUb2tlbklkXHJcbiAgICBjdXJyZW50VXNlcklkID0gJGN1cnJlbnRVc2VySWQ7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGlkYlNvY2tldDtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJTb2NrZXQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJTb2NrZXRTZXJ2aWNlO1xuZnVuY3Rpb24gaWRiU29ja2V0U2VydmljZSgkbG9nLCBpbywgaWRiVXRpbHMpIHtcbiAgJ25nSW5qZWN0JztcbiAgdmFyIHRoaXogPSB0aGlzO1xuXG4gIHZhciAkZGVmVXJsU2VydmVyID0gbnVsbDtcblxuICBmdW5jdGlvbiBpZGJTb2NrZXQoJHVybFNlcnZlciwgJGFjY2Vzc1Rva2VuSWQsICRjdXJyZW50VXNlcklkKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3N0cmluZycsICdudW1iZXInXSwgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcblxuICAgIHZhciAkbGlzdGVuZXJzID0gW107XG4gICAgdmFyICRzb2NrZXQgPSBudWxsO1xuICAgICR1cmxTZXJ2ZXIgPSAkdXJsU2VydmVyIHx8ICRkZWZVcmxTZXJ2ZXI7XG5cbiAgICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXG4gICAgdGhpei5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyBDcmVhdGluZyBjb25uZWN0aW9uIHdpdGggc2VydmVyXG4gICAgICAkc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsU2VydmVyKTtcblxuICAgICAgLy8gVGhpcyBwYXJ0IGlzIG9ubHkgZm9yIGxvZ2luIHVzZXJzIGZvciBhdXRoZW50aWNhdGVkICRzb2NrZXQgY29ubmVjdGlvbiBiZXR3ZWVuIGNsaWVudCBhbmQgc2VydmVyLlxuICAgICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXG5cbiAgICAgICRzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRsb2cubG9nKCdjb25uZWN0ZWQnKTtcblxuICAgICAgICAkc29ja2V0LmVtaXQoJ2F1dGhlbnRpY2F0aW9uJywge1xuICAgICAgICAgIGlkOiAkYWNjZXNzVG9rZW5JZCxcbiAgICAgICAgICB1c2VySWQ6ICRjdXJyZW50VXNlcklkXG4gICAgICAgIH0pO1xuICAgICAgICAkc29ja2V0Lm9uKCdhdXRoZW50aWNhdGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIHVzZSB0aGUgJHNvY2tldCBhcyB1c3VhbFxuICAgICAgICAgICRsb2cubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpei5zdWJzY3JpYmUgPSBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIHZhciBuYW1lID0gb3B0aW9ucy5tb2RlbE5hbWUgKyAnLicgKyBvcHRpb25zLmV2ZW50TmFtZTtcblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lICsgJy4nICsgb3B0aW9ucy5tb2RlbElkO1xuICAgICAgfVxuXG4gICAgICAkc29ja2V0Lm9uKG5hbWUsIGNiKTtcblxuICAgICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxuICAgICAgJGxpc3RlbmVycy5wdXNoKG5hbWUsIGNiKTtcbiAgICB9O1xuXG4gICAgdGhpei5wdXNoTGlzdGVuZXIgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICRsaXN0ZW5lcnMucHVzaChzdWJzY3JpcHRpb25OYW1lKTtcbiAgICB9O1xuXG4gICAgdGhpei51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lKSB7XG4gICAgICAkc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTtcbiAgICAgIHZhciBpZHggPSAkbGlzdGVuZXJzLmluZGV4T2Yoc3Vic2NyaXB0aW9uTmFtZSk7XG4gICAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICAgICRsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXouY29ubmVjdCgpO1xuICB9O1xuXG4gIC8vIEFzaWduYSBsYSBVUkwgZGUgc2Vydmlkb3IgcG9yIGRlZmVjdG9cbiAgaWRiU29ja2V0LnNldFVybFNlcnZlciA9IGZ1bmN0aW9uICh1cmxTZXJ2ZXIpIHtcbiAgICAkZGVmVXJsU2VydmVyID0gdXJsU2VydmVyO1xuICB9O1xuXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXG4gIGlkYlNvY2tldC5zZXRDcmVkZW50aWFscyA9IGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XG4gICAgYWNjZXNzVG9rZW5JZCA9ICRhY2Nlc3NUb2tlbklkO1xuICAgIGN1cnJlbnRVc2VySWQgPSAkY3VycmVudFVzZXJJZDtcbiAgfTtcblxuICByZXR1cm4gaWRiU29ja2V0O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYlNvY2tldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxiIChtb2R1bGUpIHtcclxuXHJcbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcclxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xyXG4gICAgY29uc3QgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xyXG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGxldCB1cmxCYXNlSG9zdCA9IGxvY2F0aW9uLmhvc3Q7XHJcblxyXG4gIGNvbnN0IGxiQXV0aCA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnXHJcbiAgICBjb25zdCBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcclxuICAgIGNvbnN0IHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcclxuICAgIFxyXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcclxuICAgIC8vIFdlIGFyZSB1c2luZyBlbXB0eSBzdHJpbmcgYXMgYSBtYXJrZXIgZm9yIG51bGwvdW5kZWZpbmVkIHZhbHVlcy5cclxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XHJcbiAgICAgICAgc3RvcmFnZVtrZXldID0gdmFsdWU7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZChuYW1lKSB7XHJcbiAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVtrZXldIHx8IHNlc3Npb25TdG9yYWdlW2tleV0gfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsYkF1dGgoKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpeltuYW1lXSA9IGxvYWQobmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBjb25zdCBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbihhY2Nlc3NUb2tlbklkLCB1c2VySWQsIHVzZXJEYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc2Vzc2lvblN0b3JhZ2UsIG5hbWUsIG51bGwpO1xyXG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XHJcblxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uKCRxLCBsYkF1dGgpIHsgJ25nSW5qZWN0JztcclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVxdWVzdDogZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xyXG4gICAgICAgIGNvbnN0IGhvc3QgPSBnZXRIb3N0KGNvbmZpZy51cmwpO1xyXG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XHJcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XHJcbiAgICAgICAgICBjb25maWcuaGVhZGVyc1thdXRoSGVhZGVyXSA9IGxiQXV0aC5hY2Nlc3NUb2tlbklkO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XHJcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxyXG4gICAgICAgICAgLy8gdGhlcmUgaXMgbm8gdXNlciBsb2dnZWQgaW5cclxuICAgICAgICAgIGNvbnN0IHJlcyA9IHtcclxuICAgICAgICAgICAgYm9keTogeyBlcnJvcjogeyBzdGF0dXM6IDQwMSB9fSxcclxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXHJcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbigpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnOyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcclxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nLFxyXG4gICAgfTtcclxuXHJcbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyIFRoZSBoZWFkZXIgbmFtZSB0byB1c2UsIGUuZy4gYFgtQWNjZXNzLVRva2VuYFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25maWd1cmUgdGhlIFJFU1QgdHJhbnNwb3J0IHRvIHVzZSBhIGRpZmZlcmVudCBoZWFkZXIgZm9yIHNlbmRpbmdcclxuICAgICAqIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi4gSXQgaXMgc2VudCBpbiB0aGUgYEF1dGhvcml6YXRpb25gIGhlYWRlclxyXG4gICAgICogYnkgZGVmYXVsdC5cclxuICAgICAqL1xyXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oaGVhZGVyKSB7XHJcbiAgICAgIG9wdGlvbnMuYXV0aEhlYWRlciA9IGhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBoZWFkZXIgbmFtZSB0aGF0IGlzIHVzZWQgZm9yIHNlbmRpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB1c2UsIGUuZy4gYC9hcGlgIG9yIGAvL2V4YW1wbGUuY29tL2FwaWAuXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENoYW5nZSB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIEJ5IGRlZmF1bHQsIHRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgb3B0aW9ucy51cmxCYXNlID0gdXJsO1xyXG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xyXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uKCRyZXNvdXJjZSkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xyXG4gICAgICAgICAgYWN0aW9uc1trZXldLnVybCA9IG9wdGlvbnMudXJsQmFzZSArIGFjdGlvbnNba2V5XS51cmw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcclxuXHJcbiAgICAgICAgLy8gQW5ndWxhciBhbHdheXMgY2FsbHMgUE9TVCBvbiAkc2F2ZSgpXHJcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXHJcbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xyXG4gICAgICAgIHJlc291cmNlLnByb3RvdHlwZS4kc2F2ZSA9IGZ1bmN0aW9uKHN1Y2Nlc3MsIGVycm9yKSB7XHJcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxyXG4gICAgICAgICAgLy8gdGhhdCBleGFjdGx5IGZpdHMgb3VyIG5lZWRzLlxyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcclxuICAgICAgICAgIHJldHVybiByZXN1bHQuJHByb21pc2UgfHwgcmVzdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XHJcbiAgICAgIH07XHJcbiAgICBcclxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kdWxlXHJcbiAgICAuZmFjdG9yeSgnbGJBdXRoJywgbGJBdXRoKVxyXG4gICAgLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSlcclxuICAgIC5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpXHJcbiAgICAuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uKCRodHRwUHJvdmlkZXIpIHsgJ25nSW5qZWN0JztcclxuICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XHJcbiAgICB9XSk7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvbGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBsYjtcbmZ1bmN0aW9uIGxiKG1vZHVsZSkge1xuXG4gIC8vIER2dWVsdmUgZWwgaG9zdCBkZSB1bmEgVVJMXG4gIGZ1bmN0aW9uIGdldEhvc3QodXJsKSB7XG4gICAgdmFyIG0gPSB1cmwubWF0Y2goL14oPzpodHRwcz86KT9cXC9cXC8oW15cXC9dKykvKTtcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBudWxsO1xuICB9XG5cbiAgdmFyIHVybEJhc2VIb3N0ID0gbG9jYXRpb24uaG9zdDtcblxuICB2YXIgbGJBdXRoID0gZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB2YXIgcHJvcHMgPSBbJ2FjY2Vzc1Rva2VuSWQnLCAnY3VycmVudFVzZXJJZCcsICdyZW1lbWJlck1lJ107XG4gICAgdmFyIHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcblxuICAgIC8vIE5vdGU6IExvY2FsU3RvcmFnZSBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gc3RyaW5nXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9ICcnO1xuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2Fubm90IGFjY2VzcyBsb2NhbC9zZXNzaW9uIHN0b3JhZ2U6JywgZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGl6W25hbWVdID0gbG9hZChuYW1lKTtcbiAgICAgIH0pO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zZXRVc2VyID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IHVzZXJEYXRhO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyVXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzZXNzaW9uU3RvcmFnZSwgbmFtZSwgbnVsbCk7XG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IGxiQXV0aCgpO1xuICB9O1xuXG4gIHZhciBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbiBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IoJHEsIGxiQXV0aCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVxdWVzdDogZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xuICAgICAgICB2YXIgaG9zdCA9IGdldEhvc3QoY29uZmlnLnVybCk7XG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYkF1dGguYWNjZXNzVG9rZW5JZCkge1xuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzW2F1dGhIZWFkZXJdID0gbGJBdXRoLmFjY2Vzc1Rva2VuSWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XG4gICAgICAgICAgLy8gUmV0dXJuIGEgc3R1YiA0MDEgZXJyb3IgZm9yIFVzZXIuZ2V0Q3VycmVudCgpIHdoZW5cbiAgICAgICAgICAvLyB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpblxuICAgICAgICAgIHZhciByZXMgPSB7XG4gICAgICAgICAgICBib2R5OiB7IGVycm9yOiB7IHN0YXR1czogNDAxIH0gfSxcbiAgICAgICAgICAgIHN0YXR1czogNDAxLFxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbiBoZWFkZXJzKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKCkge1xuICAgICduZ0luamVjdCc7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcbiAgICAgIGF1dGhIZWFkZXI6ICdhdXRob3JpemF0aW9uJ1xuICAgIH07XG5cbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXIgVGhlIGhlYWRlciBuYW1lIHRvIHVzZSwgZS5nLiBgWC1BY2Nlc3MtVG9rZW5gXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENvbmZpZ3VyZSB0aGUgUkVTVCB0cmFuc3BvcnQgdG8gdXNlIGEgZGlmZmVyZW50IGhlYWRlciBmb3Igc2VuZGluZ1xyXG4gICAgICogdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLiBJdCBpcyBzZW50IGluIHRoZSBgQXV0aG9yaXphdGlvbmAgaGVhZGVyXHJcbiAgICAgKiBieSBkZWZhdWx0LlxyXG4gICAgICovXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKGhlYWRlcikge1xuICAgICAgb3B0aW9ucy5hdXRoSGVhZGVyID0gaGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIGhlYWRlciBuYW1lIHRoYXQgaXMgdXNlZCBmb3Igc2VuZGluZyB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uXHJcbiAgICAgKi9cbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHVzZSwgZS5nLiBgL2FwaWAgb3IgYC8vZXhhbXBsZS5jb20vYXBpYC5cclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ2hhbmdlIHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gQnkgZGVmYXVsdCwgdGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICBvcHRpb25zLnVybEJhc2UgPSB1cmw7XG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XG4gICAgfTtcblxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcbiAgICAgICduZ0luamVjdCc7XG5cbiAgICAgIHZhciBsYlJlc291cmNlID0gZnVuY3Rpb24gbGJSZXNvdXJjZSh1cmwsIHBhcmFtcywgYWN0aW9ucykge1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgYWN0aW9uc1trZXldLm9yaWdpbmFsVXJsID0gYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgICBhY3Rpb25zW2tleV0udXJsID0gb3B0aW9ucy51cmxCYXNlICsgYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcblxuICAgICAgICAvLyBBbmd1bGFyIGFsd2F5cyBjYWxscyBQT1NUIG9uICRzYXZlKClcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXG4gICAgICAgIC8vIGh0dHA6Ly9raXJrYnVzaGVsbC5tZS9hbmd1bGFyLWpzLXVzaW5nLW5nLXJlc291cmNlLWluLWEtbW9yZS1yZXN0ZnVsLW1hbm5lci9cbiAgICAgICAgcmVzb3VyY2UucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgLy8gRm9ydHVuYXRlbHksIExvb3BCYWNrIHByb3ZpZGVzIGEgY29udmVuaWVudCBgdXBzZXJ0YCBtZXRob2RcbiAgICAgICAgICAvLyB0aGF0IGV4YWN0bHkgZml0cyBvdXIgbmVlZHMuXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc291cmNlLnVwc2VydC5jYWxsKHRoaXMsIHt9LCB0aGlzLCBzdWNjZXNzLCBlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC4kcHJvbWlzZSB8fCByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXNvdXJjZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBsYlJlc291cmNlO1xuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIG1vZHVsZS5mYWN0b3J5KCdsYkF1dGgnLCBsYkF1dGgpLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSkuZmFjdG9yeSgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJywgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yKS5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XG4gIH1dKTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9sYi5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=