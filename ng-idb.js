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
	
	var _idbSocket = __webpack_require__(4);
	
	var _idbSocket2 = _interopRequireDefault(_idbSocket);
	
	var _idb = __webpack_require__(5);
	
	var _idb2 = _interopRequireDefault(_idb);
	
	var _idbModel = __webpack_require__(6);
	
	var _idbModel2 = _interopRequireDefault(_idbModel);
	
	var _idbQuery = __webpack_require__(7);
	
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
/* 5 */
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
/* 6 */
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
/* 7 */
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
	
	var _Clazzer = __webpack_require__(10);
	
	var _Clazzer2 = _interopRequireDefault(_Clazzer);
	
	var _idbRequest = __webpack_require__(11);
	
	var _idbRequest2 = _interopRequireDefault(_idbRequest);
	
	var _idbOpenDBRequest = __webpack_require__(12);
	
	var _idbOpenDBRequest2 = _interopRequireDefault(_idbOpenDBRequest);
	
	var _idb = __webpack_require__(13);
	
	var _idb2 = _interopRequireDefault(_idb);
	
	var _idbStore = __webpack_require__(14);
	
	var _idbStore2 = _interopRequireDefault(_idbStore);
	
	var _idbEventTarget = __webpack_require__(19);
	
	var _idbEventTarget2 = _interopRequireDefault(_idbEventTarget);
	
	var _idbModel = __webpack_require__(15);
	
	var _idbModel2 = _interopRequireDefault(_idbModel);
	
	var _idbSocket = __webpack_require__(16);
	
	var _idbSocket2 = _interopRequireDefault(_idbSocket);
	
	var _idbTransaction = __webpack_require__(17);
	
	var _idbTransaction2 = _interopRequireDefault(_idbTransaction);
	
	var _lb = __webpack_require__(18);
	
	var _lb2 = _interopRequireDefault(_lb);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _lb2.default)(angular.module('ng.v1.idb', [])).constant('io', io).service('Clazzer', _Clazzer2.default).constant('idbVersion', '0.0.1').service('idbRequest', _idbRequest2.default).service('idbOpenDBRequest', _idbOpenDBRequest2.default).service('idb2', _idb2.default).service('idbStore', _idbStore2.default).service('idbEventTarget', _idbEventTarget2.default).service('idbModel2', _idbModel2.default).service('idbSocket2', _idbSocket2.default).service('idbTransaction', _idbTransaction2.default).service('db2', ["idb2", function (idb2) {
	  'ngInject';
	
	  var db = new idb2('aaa', 4);
	
	  db.$automigration({
	    1: function _(db) {
	      var model = db.$model('Trabajador').$setKeyPath('id').$setAutoIncrement(false).$createStore();
	    }
	  }).$drop().then(function (db) {
	    db.$open().then(function (event) {
	      console.log(['opened']);
	    });
	  });
	
	  return db;
	}]).service('Trabajador2', ["db2", function (db2) {
	  'ngInject';
	
	  return window.Trabajador2 = db2.$model('Trabajador').$setKeyPath('id').$setAutoIncrement(false).$field('cod', { "type": "string", "required": true }).$field('ci', { "type": "string", "required": true }).$field('nombres', { "type": "string", "required": true }).$field('apellidos', { "type": "string", "required": true }).$field('nacimiento', { "type": "date" }).$field('ingreso', { "type": "date" }).$field('direccion', { "type": "string" }).$remote('/trabajadores/:id', { 'id': '@id' }, {
	    'find': { url: '/trabajadores/_findWithVersion', method: 'GET', isArray: true }
	  })
	  // .versioning()
	  .$build(function (Trabajador) {
	
	    Trabajador.prototype.$constructor = function (data) {};
	
	    Trabajador.prototype.getNombre = function () {
	      return this.nombres + ' ' + this.apellidos;
	    };
	  });
	}]).run(["Trabajador2", function (Trabajador2) {
	  'ngInject';
	
	  var t = new Trabajador2();
	  t.nombres = 'Alexander';
	  t.apellidos = 'Rondon';
	  console.log(t.$getValues());
	  console.log(t.getNombre());
	}]);
	
	// Principales
	
	
	// Request

/***/ },
/* 10 */
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
	
	  var ReadyState = new Clazzer({}).static('Pending', 'pending').static('Done', 'done');
	
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
	  .handlerEvent('$success', 'onsuccess').handlerEvent('$fail', 'onerror')
	
	  // ---------------------------------------------------------------------------
	  // Property
	  .property('$promise', {
	
	    get: function get() {
	      var thiz = this;
	      if (thiz.$_promise) return thiz.$_promise;
	
	      // Crear promise para el request
	      thiz.$_promise = new Promise(function (resolve, reject) {
	        thiz.$success(function (event) {
	          resolve(event);
	        }).$fail(function (event) {
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
	  .handlerEvent('$blocked', 'onblocked').handlerEvent('$upgradeneeded', 'onupgradeneeded')
	
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
	  .handlerEvent('$aborted', 'onabort').handlerEvent('$closed', 'onclose').handlerEvent('$error', 'onerror').handlerEvent('$versionChanged', 'onversionchange')
	
	  // ---------------------------------------------------------------------------
	  .static('$open', function (name, version) {
	
	    return new idbOpenDBRequest(indexedDB.open(name, version));
	  })
	
	  // ---------------------------------------------------------------------------
	  .static('$drop', function (name) {
	
	    return new idbOpenDBRequest(indexedDB.deleteDatabase(name));
	  })
	
	  // ---------------------------------------------------------------------------
	  .static('$cmp', function (first, second) {
	
	    return indexedDB.cmp(first, second);
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$upgradeneeded', function (cb) {
	
	    this.$upgradeneededs.push(cb);
	    return this;
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$automigration', function (allMigrations) {
	
	    return this.$upgradeneeded(function (thiz, openRequest, event) {
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
	  .method('$open', function (cb, cbErr) {
	    var thiz = this;
	
	    var lastRq = null;
	    var lastEvent = null;
	
	    if (!thiz.$opened) {
	
	      thiz.$opened = (lastRq = idb.$open(thiz.$name, thiz.$version).$upgradeneeded(function (event) {
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
	  .method('$drop', function (cb) {
	    var thiz = this;
	    thiz.$opened = null;
	
	    return new Promise(function (resolve, reject) {
	
	      var rq = idb.$drop(thiz.$name).$success(function (event) {
	        resolve(thiz);
	      }).$fail(function (event) {
	        reject(event);
	      });
	      if (cb) cb(rq);
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$close', function () {
	
	    this.$me.close();
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$createStore', function (name, options) {
	
	    return new idbStore(this.$me.createObjectStore(name, options));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$dropStore', function (name) {
	
	    this.$me.deleteObjectStore(name);
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$model', function (name, socket) {
	
	    // Si existe el modelo retornarlo
	    if (this.$models[name]) return this.$models[name];
	
	    // Instanciar el modelo y guardarlo
	    return this.$models[name] = idbModel2(this, name, socket || this.$socket);
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$transaction', function (storeNames, mode) {
	    var thiz = this;
	
	    return new Promise(function (resolve, reject) {
	      thiz.$open().then(function (thiz) {
	        resolve(new idbTransaction(thiz.$me.transaction(storeNames, mode)));
	      }).catch(function (event) {
	        reject(event);
	      });
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$store', function (storeNames) {
	    var thiz = this;
	    if (!Array.isArray(storeNames)) storeNames = [storeNames];
	
	    function action(mode) {
	      return function (cb) {
	        return new Promise(function (resolve, reject) {
	
	          thiz.$transaction(storeNames, mode).then(function (tx) {
	            var storesObj = {};
	            var stores = storeNames.map(function (storeName) {
	              return storesObj[storeName] = tx.$store(storeName);
	            });
	            if (cb) cb.apply(thiz, stores);
	            resolve(stores);
	          }).catch(function (event) {
	            reject(event);
	          });
	        });
	      };
	    }
	
	    return new Clazzer({}).static('$readonly', action(idbTransaction.TransactionMode.ReadOnly)).static('$readwrite', action(idbTransaction.TransactionMode.ReadWrite)).clazz;
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
	  .method('$put', function (value, key) {
	
	    return new idbRequest(this.$me.put(value, key));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$add', function (value, key) {
	
	    return new idbRequest(this.$me.add(value, key));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$delete', function (query) {
	
	    return new idbRequest(this.$me.delete(query));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$clear', function () {
	
	    return new idbRequest(this.$me.clear());
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$get', function (query) {
	
	    return new idbRequest(this.$me.get(query));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$getKey', function (query) {
	
	    return new idbRequest(this.$me.getKey(query));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$getAll', function (query, count) {
	
	    return new idbRequest(this.$me.getAll(query, count));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$getAllKeys', function (query, count) {
	
	    return new idbRequest(this.$me.getAllKeys(query, count));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$count', function (query) {
	
	    return new idbRequest(this.$me.count(query));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$openCursor', function (query, direction) {
	
	    return new idbRequest(this.$me.openCursor(query, direction));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$openKeyCursor', function (query, direction) {
	
	    return new idbRequest(this.$me.openKeyCursor(query, direction));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$index', function (name) {
	
	    throw 'idbStore.prototype.index';
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$createIndex', function (name, keyPath, options) {
	
	    throw 'idbStore.prototype.createIndex';
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$deleteIndex', function (indexName) {
	
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
	
	exports.default = ["Clazzer", "lbResource", "$timeout", "idbEventTarget", function (Clazzer, lbResource, $timeout, idbEventTarget) {
	  'ngInject';
	
	  // -----------------------------------------------------------------------------
	  // Buscar un campo
	
	  var deepField = function deepField(obj, field, cb) {
	
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
	  return function idbModelFactory(db, name, socket) {
	
	    // ---------------------------------------------------------------------------
	    // Atributos falntantes por definir
	    // $_remote
	
	    // ---------------------------------------------------------------------------
	    function idbModel() {}
	
	    return new
	    // ---------------------------------------------------------------------------
	    // Constructor
	    Clazzer(idbModel)
	
	    // ---------------------------------------------------------------------------
	    // Herencia
	    .inherit(idbEventTarget)
	
	    // ---------------------------------------------------------------------------
	    // Herencia
	    // .inherit(EventTarget)
	
	    // ---------------------------------------------------------------------------
	    // Propiedades staticas
	    .static('$db', db).static('$name', name).static('$socket', socket).static('$id', { keyPath: 'id', autoIncrement: true }).static('$fields', {}).static('$instances', {})
	
	    // ---------------------------------------------------------------------------
	    .static('$getKeyFrom', function (data) {
	      return getFieldValue(data, this.$id.keyPath);
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$setKeyPath', function (keyPath) {
	
	      this.$id.keyPath = keyPath;
	      return this;
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$setAutoIncrement', function (autoIncrement) {
	
	      this.$id.autoIncrement = autoIncrement;
	      return this;
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$createStore', function (cb) {
	
	      var store = this.$db.$createStore(this.$name, this.$id);
	
	      if (cb) cb(this, store);
	
	      return this;
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$put', function (obj, key) {
	      var thiz = this;
	
	      return thiz.$db.$store(thiz.$name).$readwrite().then(function (stores) {
	        return stores[thiz.$name].put(obj, key).$promise;
	      });
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$getInstance', function (key) {
	
	      // El objeto no tiene ID
	      if (!key) {
	        return new this();
	      }
	
	      // No existe la instancia entonce se crea
	      if (!this.$instances[key]) {
	        this.$instances[key] = new Model();
	        this.$instances[key];
	      }
	
	      return this.$instances[key];
	    })
	
	    // ---------------------------------------------------------------------------
	    // Asigna la especificación de los campos
	    .static('$field', function (name, field) {
	
	      if (typeof field === 'string') {
	        field = { "type": field };
	      }
	
	      field.name = name;
	
	      this.$fields[name] = field;
	
	      return this;
	    })
	
	    // ---------------------------------------------------------------------------
	    // Agrega el el campo ID automaticamente
	    .static('$idInject', function () {
	
	      this.field('name', {
	        id: true,
	        type: 'number'
	      });
	    })
	
	    // ---------------------------------------------------------------------------
	    // Agrega el el campo ID automaticamente
	    .static('$build', function (buildCallback) {
	
	      buildCallback(this);
	      return this;
	    })
	
	    // ---------------------------------------------------------------------------
	    // Configura el remote api
	    .static('$remote', function (url, args, actions) {
	
	      this.$_remote = lbResource(url, args, actions);
	      return this;
	    })
	
	    // ---------------------------------------------------------------------------
	    // Devuelve el valor de una propiedad
	    .method('$get', function (field) {
	
	      return getFieldValue(this, field);
	    })
	
	    // ---------------------------------------------------------------------------
	    // Asigna in valor a un campo
	    .method('$set', function (field, value) {
	
	      return setFieldValue(this, field);
	    })
	
	    // ---------------------------------------------------------------------------
	    // Devuelve el valor de una propiedad
	    .method('$getValues', function (data) {
	
	      var values = {};
	      data = data || this;
	
	      Object.keys(idbModel.$fields).map(function (field) {
	        setFieldValue(values, field, getFieldValue(data, field));
	      });
	
	      return values;
	    })
	
	    // ---------------------------------------------------------------------------
	    .method('$key', function (data) {
	
	      return this.$get(idbModel.$id.keyPath);
	    })
	
	    // ---------------------------------------------------------------------------
	    // Funcion que hace escuchars los mensajes del socket para el model
	    .method('$listen', function (data) {
	      var thiz = this;
	      if (!this.$socket) throw new Error('idbModel.DoesNotHaveSocketInstance');
	
	      // Crear una subscripcion al socket para cuando se reciban datos
	      // para la instancia actual
	      this.$socket.subscribe({
	        modelName: idbModel.$name,
	        eventName: 'update',
	        modelId: thiz.$key()
	      }, function (data) {
	
	        // A recibir datos del socket asignar los valores
	        $timeout(function () {
	          // Emitir evento de datos recibidor para el modelo
	          thiz.$setRemoteValues(data.values, data.version);
	        });
	      });
	    })
	
	    // ---------------------------------------------------------------------------
	    .clazz;
	  };
	}];

/***/ },
/* 16 */
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
	
	    thiz.$connect();
	  };
	
	  return new
	  // ---------------------------------------------------------------------------
	  // Constructor
	  Clazzer(idbSocket)
	
	  // ---------------------------------------------------------------------------
	  // Conectarse al servidor
	  .method('$connect', function () {
	
	    // Creating connection with server
	    var socket = this.$socket = io.connect($url);
	
	    // This part is only for login users for authenticated $socket connection between client and server.
	    // If you are not using login page in you website then you should remove rest piece of code..
	    socket.on('connect', function () {
	      $log.log('connected');
	
	      socket.emit('authentication', {
	        id: this.$accessTokenId,
	        userId: this.$currentUserId
	      });
	
	      socket.on('authenticated', function () {
	        // use the $socket as usual
	        $log.log('User is authenticated');
	      });
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$subscribe', function (options, cb) {
	
	    var name = options.modelName + '.' + options.eventName;
	
	    if (typeof options.modelId === 'number') {
	      name = name + '.' + options.modelId;
	    }
	
	    this.$socket.on(name, cb);
	
	    //Push the container..
	    this.$pushListener(name, cb);
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$pushListener', function (name, cb) {
	
	    this.$listeners.push(name);
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$unsubscribe', function (subscriptionName) {
	
	    this.$socket.removeAllListeners(subscriptionName);
	    var idx = this.$listeners.indexOf(subscriptionName);
	    if (idx != -1) {
	      this.$listeners.splice(idx, 1);
	    }
	  })
	
	  // ---------------------------------------------------------------------------
	  // Asigna la URL de servidor por defecto
	  .static('$setUrlServer', function (url) {
	
	    this.$defUrlServer = url;
	    return this;
	  })
	
	  // ---------------------------------------------------------------------------
	  // ASigna las credenciales por defecto
	  .static('$setCredentials', function (accessTokenId, currentUserId) {
	
	    this.$defAccessTokenId = accessTokenId;
	    this.$defCurrentUserId = currentUserId;
	    return this;
	  })
	
	  // ---------------------------------------------------------------------------
	  .clazz
	
	  // ---------------------------------------------------------------------------
	  .$setUrlServer(null).$setCredentials(null, null);
	}];

/***/ },
/* 17 */
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
	
	  var TransactionMode = new Clazzer({}).static('ReadOnly', 'readonly').static('ReadWrite', 'readwrite').static('VersionChange', 'versionchange');
	
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
	  .handlerEvent('$aborted', 'onabort').handlerEvent('$completed', 'oncomplete').handlerEvent('$fail', 'onerror')
	
	  // ---------------------------------------------------------------------------
	  .method('$store', function (name) {
	
	    return new idbStore(this.$me.objectStore(name));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$abort', function () {
	
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
	        thiz.$completed(function (event) {
	          resolve(event);
	        }).$fail(function (event) {
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

/***/ },
/* 18 */
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
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * idbEventTarget
	 * -----------------------------------------------------------------------------
	 * 
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = ["Clazzer", function (Clazzer) {
	  'ngInject';
	
	  return new
	  // ---------------------------------------------------------------------------
	  // Constructor
	  Clazzer(function idbEventTarget() {})
	
	  // ---------------------------------------------------------------------------
	  // propiedad
	  .property('$listeners', {
	    value: []
	  })
	
	  // ---------------------------------------------------------------------------
	  // method
	  .method('$bind', function (type, callback) {
	    if (!(type in this.$listeners)) {
	      this.$listeners[type] = [];
	    }
	    this.$listeners[type].push(callback);
	  })
	
	  // ---------------------------------------------------------------------------
	  // method
	  .method('$unbind ', function (type, callback) {
	    if (!(type in this.$listeners)) {
	      return;
	    }
	    var stack = this.$listeners[type];
	    for (var i = 0, l = stack.length; i < l; i++) {
	      if (stack[i] === callback) {
	        stack.splice(i, 1);
	        return this.$unbind(type, callback);
	      }
	    }
	  })
	
	  // ---------------------------------------------------------------------------
	  // method
	  .method('$emit', function (event) {
	    if (!(event.type in this.$listeners)) {
	      return;
	    }
	    var stack = this.$listeners[event.type];
	    for (var i = 0, l = stack.length; i < l; i++) {
	      stack[i].call(this, event);
	    }
	  })
	
	  // ---------------------------------------------------------------------------
	  .clazz;
	}];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTViNTQyNzJmODM5NzU3NWMxMzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiVXRpbHMuanM/MWJiNCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJFdmVudHMuanM/NDg2YSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3FzLmpzPzY0MzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzP2QxYTEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiLmpzPzYzNTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qcz9mOWY5Iiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanM/Zjc3YSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvbGIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2xiLmpzPzMwMDYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pbmRleC5qcz8wZjYyIiwid2VicGFjazovLy8uL3NyYy92MS9DbGF6emVyLmpzIiwid2VicGFjazovLy8uL3NyYy92MS9DbGF6emVyLmpzPzFmY2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlJlcXVlc3QuanM/MmNiYSIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiT3BlbkRCUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiT3BlbkRCUmVxdWVzdC5qcz9hOGRkIiwid2VicGFjazovLy8uL3NyYy92MS9pZGIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYi5qcz8xYzFiIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJTdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiU3RvcmUuanM/ZWE1NyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYk1vZGVsLmpzPzdjMWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiU29ja2V0LmpzPzE0ZjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlRyYW5zYWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJUcmFuc2FjdGlvbi5qcz8zMGMzIiwid2VicGFjazovLy8uL3NyYy92MS9sYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvbGIuanM/Y2Y1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiRXZlbnRUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYkV2ZW50VGFyZ2V0LmpzPzYzN2UiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsInNlcnZpY2UiLCJpZGJVdGlscyIsIiRxIiwidmFsaWRhdG9ycyIsImNhbGxiYWNrIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJhcnJheSIsIkFycmF5IiwiaXNBcnJheSIsInZhbGlkIiwidHlwZXMiLCJpIiwidHlwZSIsImFyZ3MiLCJ2YWxpZGF0ZSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImVyciIsIkVycm9yIiwibmFtZSIsImlkYkV2ZW50cyIsIkRCX0VSUk9SIiwiTU9ERUxfSU5TVEFOQ0VEIiwiTU9ERUxfUkVQTEFDRSIsIk1PREVMX1FVRVJJRUQiLCJNT0RFTF9VTlFVRVJJRUQiLCJxcyIsInFzQ2xhc3MiLCJjYiIsInRoaXoiLCJ0aGVucyIsInRoZW5zUmVhZHkiLCJjYXRjaHMiLCJjYXRjaHNSZWFkeSIsInJlc3VsdEFyZ3MiLCJlcnJvciIsInByb21pc2UiLCIkcmVzb2x2ZWQiLCJ0aGVuc1Jlc29sdmVkIiwibGVuZ3RoIiwic2hpZnQiLCJhcHBseSIsInB1c2giLCJjYXRjaHNSZXNvbHZlZCIsInJlc29sdmUiLCJhcmd1bWVudHMiLCJyZWplY3QiLCJ0aGVuIiwiY2F0Y2giLCJkb25lIiwiY29uY2F0IiwiZGVmZXIiLCJhbGwiLCJhcnIiLCJkZWZlcmVkIiwicHJvbWlzZXMiLCJrZXlzIiwiT2JqZWN0IiwicmVzdWx0cyIsIm1hcCIsImlkeCIsInJlc3VsdCIsImlkYlNvY2tldFNlcnZpY2UiLCIkbG9nIiwiaW8iLCIkZGVmVXJsU2VydmVyIiwiaWRiU29ja2V0IiwiJHVybFNlcnZlciIsIiRhY2Nlc3NUb2tlbklkIiwiJGN1cnJlbnRVc2VySWQiLCIkbGlzdGVuZXJzIiwiJHNvY2tldCIsImNvbm5lY3QiLCJvbiIsImxvZyIsImVtaXQiLCJpZCIsInVzZXJJZCIsInN1YnNjcmliZSIsIm9wdGlvbnMiLCJtb2RlbE5hbWUiLCJldmVudE5hbWUiLCJtb2RlbElkIiwicHVzaExpc3RlbmVyIiwic3Vic2NyaXB0aW9uTmFtZSIsInVuc3Vic2NyaWJlIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwiaW5kZXhPZiIsInNwbGljZSIsInNldFVybFNlcnZlciIsInVybFNlcnZlciIsInNldENyZWRlbnRpYWxzIiwiYWNjZXNzVG9rZW5JZCIsImN1cnJlbnRVc2VySWQiLCJpZGJTZXJ2aWNlIiwiaWRiTW9kZWwiLCJpbmRleGVkREIiLCJ3aW5kb3ciLCJtb3pJbmRleGVkREIiLCJ3ZWJraXRJbmRleGVkREIiLCJtc0luZGV4ZWREQiIsIklEQlRyYW5zYWN0aW9uIiwid2Via2l0SURCVHJhbnNhY3Rpb24iLCJtc0lEQlRyYW5zYWN0aW9uIiwiSURCS2V5UmFuZ2UiLCJ3ZWJraXRJREJLZXlSYW5nZSIsIm1zSURCS2V5UmFuZ2UiLCJhbGVydCIsImlkYiIsIiRkYk5hbWUiLCIkZGJWZXJzaW9uIiwiJGV2ZW50c0NhbGxiYWNrcyIsIiR1cGdyYWRlTmVlZGVkRGVmZXJlZCIsIiRvcGVuRGVmZXJlZCIsIiRzb2NrZXRDb25uZWN0ZWREZWZlcmVkIiwiJG9wZW5lZCIsIiRyZXF1ZXN0IiwibW9kZWxzIiwiYmluZCIsInVuYmluZCIsInRyaWdnZXIiLCJvcGVuIiwicmVhZHkiLCJycSIsIm9udXBncmFkZW5lZWRlZCIsImV2ZW50Iiwib25zdWNjZXNzIiwib25lcnJvciIsInRhcmdldCIsImVycm9yQ29kZSIsImRlbGV0ZURhdGFiYXNlIiwibW9kZWwiLCJzb2NrZXQiLCJjcmVhdGVTdG9yZSIsImNyZWF0ZU9iamVjdFN0b3JlIiwiY3JlYXRlSW5kZXgiLCJpbmRleE5hbWUiLCJmaWVsZE5hbWUiLCJvcHRzIiwidHJhbnNhY3Rpb24iLCJvYmplY3RTdG9yZSIsInBlcm1zIiwiYWN0aW9uIiwidHgiLCJvbmNvbXBsZXRlIiwib25hYm9ydCIsImdldCIsImtleSIsInB1dCIsInZhbHVlcyIsImRlbGV0ZSIsIm9wZW5DdXJzb3IiLCJmaWx0ZXJzIiwiZWFjaENiIiwiY3Vyc29yIiwiY29udGludWUiLCJkZWZlcmVkcyIsIm9uT3BlbiIsIm9uVXBncmFkZU5lZWRlZCIsIm9uU29ja2V0Q29ubmVjdGVkIiwidGV4dCIsImlkYk1vZGVsU2VydmljZSIsImlkYlF1ZXJ5IiwibGJSZXNvdXJjZSIsIiR0aW1lb3V0Iiwic2VhcmNoRGVlcEZpZWxkIiwib2JqIiwiZmllbGQiLCJmaWVsZHMiLCJzcGxpdCIsImxhc3RGaWVsZCIsInBvcCIsIl9zZXQiLCJnZXRGaWVsZFZhbHVlIiwic2V0RmllbGRWYWx1ZSIsIiRkYiIsIiRtb2RlbE5hbWUiLCIkaWQiLCJrZXlQYXRoIiwiYXV0b0luY3JlbWVudCIsIiRldmVudHNIYW5kbGVycyIsIiRpbnN0YW5jZXMiLCIkZmllbGRzIiwiJHJlbW90ZSIsIiR2ZXJzaW9uaW5nIiwiTW9kZWwiLCJkYXRhIiwiJGxvYWRlZCIsIiRsb2NhbExvYWRlZCIsIiRyZW1vdGVMb2FkZWQiLCIkbG9jYWxWYWx1ZXMiLCIkcmVtb3RlVmFsdWVzIiwiJHZlcnNpb24iLCIkbG9jYWxWZXJzaW9uIiwiJHJlbW90ZVZlcnNpb24iLCIkc2V0VmFsdWVzIiwiJGNvbnN0cnVjdG9yIiwiJGxpc3RlbiIsIiRyZXN1bHRzIiwiJGJpbmQiLCIkZW1pdCIsImdldE1vZGVsTmFtZSIsImluZGV4IiwiYnVpbGQiLCJidWlsZENhbGxiYWNrIiwicmVtb3RlIiwidXJsIiwiYWN0aW9ucyIsImdldFJlbW90ZSIsImdldEtleUZyb20iLCJnZXRJbnN0YW5jZSIsImluc3RhbmNlIiwiJHByb21pc2UiLCJnZXRWZXJzaW9uT2YiLCJ2ZXJzaW9uIiwiJHNldExvY2FsVmFsdWVzIiwiaGFzaCIsImZpbmQiLCJjcmVhdGUiLCJyZWNvcmQiLCIkcHVsbCIsIml0ZXJhdGlvbiIsInZlcnNpb25pbmciLCJoYW5kbGVyIiwiJGdldCIsIiRzZXQiLCIkZ2V0VmFsdWVzIiwiJGdldExvY2FsVmFsdWVzIiwiJGdldFJlbW90ZVZhbHVlcyIsIiRzZXRSZW1vdGVWYWx1ZXMiLCIkc2V0S2V5IiwibmV3S2V5Iiwib2xkS2V5IiwibmV3VmFsdWVzIiwib2xkVmFsdWVzIiwiY29uc29sZSIsIiRNb2RlbCIsIiRmaWx0ZXJzIiwiJHJlc3VsdCIsImdldFJlc3VsdCIsIm5leHQiLCJnZXRSZW1vdGVSZXN1bHQiLCIkcmVtb3RlUmVzdWx0IiwiJHJlY29yZCIsImxiIiwiZ2V0SG9zdCIsIm0iLCJtYXRjaCIsInVybEJhc2VIb3N0IiwibG9jYXRpb24iLCJob3N0IiwibGJBdXRoIiwicHJvcHMiLCJwcm9wc1ByZWZpeCIsInNhdmUiLCJzdG9yYWdlIiwibG9hZCIsImxvY2FsU3RvcmFnZSIsInNlc3Npb25TdG9yYWdlIiwiZm9yRWFjaCIsImN1cnJlbnRVc2VyRGF0YSIsInJlbWVtYmVyTWUiLCJzZXRVc2VyIiwidXNlckRhdGEiLCJjbGVhclVzZXIiLCJjbGVhclN0b3JhZ2UiLCJsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IiLCJyZXF1ZXN0IiwiY29uZmlnIiwiaGVhZGVycyIsImF1dGhIZWFkZXIiLCJfX2lzR2V0Q3VycmVudFVzZXJfXyIsInJlcyIsImJvZHkiLCJzdGF0dXMiLCJ3aGVuIiwidXJsQmFzZSIsInNldEF1dGhIZWFkZXIiLCJoZWFkZXIiLCJnZXRBdXRoSGVhZGVyIiwic2V0VXJsQmFzZSIsImdldFVybEJhc2UiLCIkcmVzb3VyY2UiLCJwYXJhbXMiLCJvcmlnaW5hbFVybCIsInJlc291cmNlIiwiJHNhdmUiLCJzdWNjZXNzIiwidXBzZXJ0IiwiZmFjdG9yeSIsInByb3ZpZGVyIiwiJGh0dHBQcm92aWRlciIsImludGVyY2VwdG9ycyIsImNvbnN0YW50IiwiaWRiMiIsImRiIiwiJGF1dG9taWdyYXRpb24iLCIkbW9kZWwiLCIkc2V0S2V5UGF0aCIsIiRzZXRBdXRvSW5jcmVtZW50IiwiJGNyZWF0ZVN0b3JlIiwiJGRyb3AiLCIkb3BlbiIsImRiMiIsIlRyYWJhamFkb3IyIiwiJGZpZWxkIiwibWV0aG9kIiwiJGJ1aWxkIiwiVHJhYmFqYWRvciIsImdldE5vbWJyZSIsIm5vbWJyZXMiLCJhcGVsbGlkb3MiLCJydW4iLCJ0IiwiQ2xhenplciIsImNvbnN0cnVjdG9yIiwiZGVmaW5lUHJvcGVydHkiLCJwYXJlbnQiLCJ0bXAiLCJjbGF6eiIsImZ1bmMiLCJwcm9wZXJ0eSIsImZyb20iLCJ0byIsIiRtZSIsInNldCIsIlJlYWR5U3RhdGUiLCJzdGF0aWMiLCJpZGJSZXF1ZXN0IiwibWUiLCJpbmhlcml0IiwiRXZlbnRUYXJnZXQiLCJnZXR0ZXIiLCJoYW5kbGVyRXZlbnQiLCIkX3Byb21pc2UiLCJQcm9taXNlIiwiJHN1Y2Nlc3MiLCIkZmFpbCIsImlkYk9wZW5EQlJlcXVlc3QiLCJpZGJTdG9yZSIsImlkYk1vZGVsMiIsImlkYlRyYW5zYWN0aW9uIiwiZmlyc3QiLCJzZWNvbmQiLCJjbXAiLCIkdXBncmFkZW5lZWRlZHMiLCJhbGxNaWdyYXRpb25zIiwiJHVwZ3JhZGVuZWVkZWQiLCJvcGVuUmVxdWVzdCIsIm9sZFZlcnNpb24iLCJuZXdWZXJzaW9uIiwibWlncmF0aW9ucyIsIm1pZ3JhdGlvbiIsImNiRXJyIiwibGFzdFJxIiwibGFzdEV2ZW50IiwiJG5hbWUiLCJjbG9zZSIsImRlbGV0ZU9iamVjdFN0b3JlIiwiJG1vZGVscyIsInN0b3JlTmFtZXMiLCJtb2RlIiwiJHRyYW5zYWN0aW9uIiwic3RvcmVzT2JqIiwic3RvcmVzIiwic3RvcmVOYW1lIiwiJHN0b3JlIiwiVHJhbnNhY3Rpb25Nb2RlIiwiUmVhZE9ubHkiLCJSZWFkV3JpdGUiLCJhZGQiLCJxdWVyeSIsImNsZWFyIiwiZ2V0S2V5IiwiY291bnQiLCJnZXRBbGwiLCJnZXRBbGxLZXlzIiwiZGlyZWN0aW9uIiwib3BlbktleUN1cnNvciIsImRlbGV0ZUluZGV4IiwiaWRiRXZlbnRUYXJnZXQiLCJkZWVwRmllbGQiLCJpZGJNb2RlbEZhY3RvcnkiLCJzdG9yZSIsIiRyZWFkd3JpdGUiLCIkX3JlbW90ZSIsIiRrZXkiLCIkZGVmQWNjZXNzVG9rZW5JZCIsIiRkZWZDdXJyZW50VXNlcklkIiwiJGNvbm5lY3QiLCIkdXJsIiwiJHB1c2hMaXN0ZW5lciIsIiRzZXRVcmxTZXJ2ZXIiLCIkc2V0Q3JlZGVudGlhbHMiLCJhYm9ydCIsIiRjb21wbGV0ZWQiLCJzdGFjayIsImwiLCIkdW5iaW5kIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7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ckwsT0FBTztLQUNoQyxJQUFHLEVBQUVBLE1BQU1sSCxRQUFRLEtBQUsyRCxhQUFhO09BQ25DOztLQUVGLElBQUlzVSxRQUFRLEtBQUt0VSxXQUFXdUQsTUFBTWxIO0tBQ2xDLEtBQUksSUFBSUQsSUFBSSxHQUFHbVksSUFBSUQsTUFBTXJXLFFBQVE3QixJQUFJbVksR0FBR25ZLEtBQUs7T0FDekNrWSxNQUFNbFksR0FBR00sS0FBSyxNQUFNNkc7Ozs7O0lBS3pCa00iLCJmaWxlIjoibmctaWRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5NWI1NDI3MmY4Mzk3NTc1YzEzOVxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBpZGJVdGlscyBmcm9tICcuL3V0aWxzL2lkYlV0aWxzJztcclxuaW1wb3J0IGlkYkV2ZW50cyBmcm9tICcuL3V0aWxzL2lkYkV2ZW50cyc7XHJcbmltcG9ydCBxcyBmcm9tICcuL3V0aWxzL3FzJztcclxuXHJcbmltcG9ydCBpZGJTb2NrZXQgZnJvbSAnLi9zZXJ2aWNlcy9pZGJTb2NrZXQnO1xyXG5pbXBvcnQgaWRiIGZyb20gJy4vc2VydmljZXMvaWRiJztcclxuaW1wb3J0IGlkYk1vZGVsIGZyb20gJy4vc2VydmljZXMvaWRiTW9kZWwnO1xyXG5pbXBvcnQgaWRiUXVlcnkgZnJvbSAnLi9zZXJ2aWNlcy9pZGJRdWVyeSc7XHJcblxyXG5pbXBvcnQgbGIgZnJvbSAnLi9zZXJ2aWNlcy9sYic7XHJcblxyXG5pbXBvcnQgJy4vdjEvaW5kZXgnO1xyXG5cclxubGIoYW5ndWxhci5tb2R1bGUoJ25nLmlkYicsIFsnbmcudjEuaWRiJ10pKVxyXG4gIFxyXG4gIC5zZXJ2aWNlKCdpZGJFdmVudHMnLCBpZGJFdmVudHMpXHJcbiAgLnNlcnZpY2UoJ2lkYlV0aWxzJywgaWRiVXRpbHMpXHJcbiAgLnNlcnZpY2UoJ3FzJywgcXMpXHJcblxyXG4gIC8vIFRha2Ugb2YgbGItc2VydmljZXMuanNcclxuICAuc2VydmljZSgnaWRiJywgaWRiKVxyXG4gIC5zZXJ2aWNlKCdpZGJNb2RlbCcsIGlkYk1vZGVsKVxyXG4gIC5zZXJ2aWNlKCdpZGJRdWVyeScsIGlkYlF1ZXJ5KVxyXG4gIC5zZXJ2aWNlKCdpZGJTb2NrZXQnLCBpZGJTb2NrZXQpXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2lkYlV0aWxzID0gcmVxdWlyZSgnLi91dGlscy9pZGJVdGlscycpO1xuXG52YXIgX2lkYlV0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlV0aWxzKTtcblxudmFyIF9pZGJFdmVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2lkYkV2ZW50cycpO1xuXG52YXIgX2lkYkV2ZW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJFdmVudHMpO1xuXG52YXIgX3FzID0gcmVxdWlyZSgnLi91dGlscy9xcycpO1xuXG52YXIgX3FzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3FzKTtcblxudmFyIF9pZGJTb2NrZXQgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYlNvY2tldCcpO1xuXG52YXIgX2lkYlNvY2tldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJTb2NrZXQpO1xuXG52YXIgX2lkYiA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiJyk7XG5cbnZhciBfaWRiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYik7XG5cbnZhciBfaWRiTW9kZWwgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYk1vZGVsJyk7XG5cbnZhciBfaWRiTW9kZWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiTW9kZWwpO1xuXG52YXIgX2lkYlF1ZXJ5ID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJRdWVyeScpO1xuXG52YXIgX2lkYlF1ZXJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlF1ZXJ5KTtcblxudmFyIF9sYiA9IHJlcXVpcmUoJy4vc2VydmljZXMvbGInKTtcblxudmFyIF9sYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYik7XG5cbnJlcXVpcmUoJy4vdjEvaW5kZXgnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuKDAsIF9sYjIuZGVmYXVsdCkoYW5ndWxhci5tb2R1bGUoJ25nLmlkYicsIFsnbmcudjEuaWRiJ10pKS5zZXJ2aWNlKCdpZGJFdmVudHMnLCBfaWRiRXZlbnRzMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJVdGlscycsIF9pZGJVdGlsczIuZGVmYXVsdCkuc2VydmljZSgncXMnLCBfcXMyLmRlZmF1bHQpXG5cbi8vIFRha2Ugb2YgbGItc2VydmljZXMuanNcbi5zZXJ2aWNlKCdpZGInLCBfaWRiMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJNb2RlbCcsIF9pZGJNb2RlbDIuZGVmYXVsdCkuc2VydmljZSgnaWRiUXVlcnknLCBfaWRiUXVlcnkyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlNvY2tldCcsIF9pZGJTb2NrZXQyLmRlZmF1bHQpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiVXRpbHMgKCRxKSB7ICduZ0luamVjdCdcclxuICBcclxuICBjb25zdCB2YWxpZGF0b3JzID0ge1xyXG4gICAgLy8gRnVuY2lvbiBwYXJhIGRldGVybWluYXIgc2kgZXMgdW4gY2FsbGJhY2sgdsOhbGlkbyBvIG5vXHJcbiAgICBjYWxsYmFjazogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJyB8fCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09IHVuZGVmaW5lZDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gVmVyaWZpY2Egc2kgdW4gdmFsb3IgZXMgdW4gYXJyYXlcclxuICAgIGFycmF5OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgfSAgXHJcblxyXG4gIC8vIEdlbmVyYSB1biBlcnJvciBzaSBlbCB2YWxvciBubyBlcyBkZWwgdGlwbyBpbmRpY2FkbyBwb3IgcGFyYW1ldHJvXHJcbiAgZnVuY3Rpb24gdmFsaWQgKHZhbHVlLCB0eXBlcykge1xyXG4gICAgaWYgKCF2YWxpZGF0b3JzLmFycmF5KHR5cGVzKSkgdHlwZXMgPSBbdHlwZXNdO1xyXG5cclxuICAgIGZvcihsZXQgaSBpbiB0eXBlcyl7XHJcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlc1tpXTtcclxuICAgICAgaWYgKHR5cGVvZiB0eXBlID09ICdzdHJpbmcnKXtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbGlkYXRvcnNbdHlwZV0gPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgaWYgKHZhbGlkYXRvcnNbdHlwZV0odmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09IHR5cGUpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdHlwZSA9PSAnZnVuY3Rpb24nKXtcclxuICAgICAgICBpZih0eXBlKGFyZ3NbaV0pKXtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgfVxyXG5cclxuICAvLyBWYWxpZGEgdW4gYXJyYXkgZGUgYXJndW1lbnRvcyBjb24gdW4gYXJyYSBkZSB0aXBvc1xyXG4gIGZ1bmN0aW9uIHZhbGlkYXRlIChhcmdzLCB0eXBlcykge1xyXG5cclxuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcclxuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcclxuICAgIGZvciAobGV0IGkgaW4gYXJncyl7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gYXJnc1tpXTtcclxuICAgICAgY29uc3QgdHlwZSA9IHR5cGVzW2ldO1xyXG4gICAgICBpZiAodHlwZSAmJiAhdmFsaWQodmFsdWUsIHR5cGUpKXtcclxuICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbGlkYXRvciB0bzogJythcmdzW2ldKycgbXVzdCBiZSAnK3R5cGUpO1xyXG4gICAgICAgIGVyci5uYW1lID0gJ0ludmFsaWRWYWxpZGF0b3InXHJcbiAgICAgICAgdGhyb3cgZXJyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHZhbGlkYXRlOiB2YWxpZGF0ZSxcclxuICB9O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL2lkYlV0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGlkYlV0aWxzO1xuZnVuY3Rpb24gaWRiVXRpbHMoJHEpIHtcbiAgJ25nSW5qZWN0JztcblxuICB2YXIgdmFsaWRhdG9ycyA9IHtcbiAgICAvLyBGdW5jaW9uIHBhcmEgZGV0ZXJtaW5hciBzaSBlcyB1biBjYWxsYmFjayB2w6FsaWRvIG8gbm9cbiAgICBjYWxsYmFjazogZnVuY3Rpb24gY2FsbGJhY2sodmFsdWUpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJyB8fCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09IHVuZGVmaW5lZDtcbiAgICB9LFxuXG4gICAgLy8gVmVyaWZpY2Egc2kgdW4gdmFsb3IgZXMgdW4gYXJyYXlcbiAgICBhcnJheTogZnVuY3Rpb24gYXJyYXkodmFsdWUpIHtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKTtcbiAgICB9XG5cbiAgfTtcblxuICAvLyBHZW5lcmEgdW4gZXJyb3Igc2kgZWwgdmFsb3Igbm8gZXMgZGVsIHRpcG8gaW5kaWNhZG8gcG9yIHBhcmFtZXRyb1xuICBmdW5jdGlvbiB2YWxpZCh2YWx1ZSwgdHlwZXMpIHtcbiAgICBpZiAoIXZhbGlkYXRvcnMuYXJyYXkodHlwZXMpKSB0eXBlcyA9IFt0eXBlc107XG5cbiAgICBmb3IgKHZhciBpIGluIHR5cGVzKSB7XG4gICAgICB2YXIgdHlwZSA9IHR5cGVzW2ldO1xuICAgICAgaWYgKHR5cGVvZiB0eXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsaWRhdG9yc1t0eXBlXSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaWYgKHZhbGlkYXRvcnNbdHlwZV0odmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PSB0eXBlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHR5cGUgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAodHlwZShhcmdzW2ldKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gVmFsaWRhIHVuIGFycmF5IGRlIGFyZ3VtZW50b3MgY29uIHVuIGFycmEgZGUgdGlwb3NcbiAgZnVuY3Rpb24gdmFsaWRhdGUoYXJncywgdHlwZXMpIHtcblxuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcbiAgICBpZiAodHlwZW9mIHR5cGVzID09ICdzdHJpbmcnKSB0eXBlcyA9IFt0eXBlc107XG4gICAgZm9yICh2YXIgaSBpbiBhcmdzKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhcmdzW2ldO1xuICAgICAgdmFyIHR5cGUgPSB0eXBlc1tpXTtcbiAgICAgIGlmICh0eXBlICYmICF2YWxpZCh2YWx1ZSwgdHlwZSkpIHtcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWxpZGF0b3IgdG86ICcgKyBhcmdzW2ldICsgJyBtdXN0IGJlICcgKyB0eXBlKTtcbiAgICAgICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbGlkYXRvcic7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHZhbGlkYXRlOiB2YWxpZGF0ZVxuICB9O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL2lkYlV0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gTm9tYnJlIGRlIGxvcyBldmVudG9zXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYkV2ZW50cygpIHtcclxuICByZXR1cm4ge1xyXG4gICAgREJfRVJST1I6ICdjYi5lcnJvcicsXHJcbiAgICBNT0RFTF9JTlNUQU5DRUQgOiAnbW9kZWwuaW5zdGFuY2VkJyxcclxuICAgIE1PREVMX1JFUExBQ0UgOiAnbW9kZWwucmVwbGFjZScsXHJcbiAgICBNT0RFTF9RVUVSSUVEIDogJ21vZGVsLnF1ZXJpZWQnLFxyXG4gICAgTU9ERUxfVU5RVUVSSUVEIDogJ21vZGVsLnVucXVlcmllZCcsXHJcbiAgfVxyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL2lkYkV2ZW50cy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gTm9tYnJlIGRlIGxvcyBldmVudG9zXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJFdmVudHM7XG5mdW5jdGlvbiBpZGJFdmVudHMoKSB7XG4gIHJldHVybiB7XG4gICAgREJfRVJST1I6ICdjYi5lcnJvcicsXG4gICAgTU9ERUxfSU5TVEFOQ0VEOiAnbW9kZWwuaW5zdGFuY2VkJyxcbiAgICBNT0RFTF9SRVBMQUNFOiAnbW9kZWwucmVwbGFjZScsXG4gICAgTU9ERUxfUVVFUklFRDogJ21vZGVsLnF1ZXJpZWQnLFxuICAgIE1PREVMX1VOUVVFUklFRDogJ21vZGVsLnVucXVlcmllZCdcbiAgfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcXMgKCkgeyAnbmdJbmplY3QnXHJcbiAgXHJcbiAgZnVuY3Rpb24gcXNDbGFzcyAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBcclxuICAgIGxldCB0aGVucyA9IFtdO1xyXG4gICAgbGV0IHRoZW5zUmVhZHkgPSBbXTtcclxuICAgIGxldCBjYXRjaHMgPSBbXTtcclxuICAgIGxldCBjYXRjaHNSZWFkeSA9IFtdO1xyXG4gICAgbGV0IHJlc3VsdEFyZ3MgPSBudWxsO1xyXG4gICAgbGV0IGVycm9yID0gbnVsbDtcclxuXHJcbiAgICB0aGl6LnByb21pc2UgPSB7fTtcclxuICAgIHRoaXouJHJlc29sdmVkID0gZmFsc2U7XHJcblxyXG4gICAgZnVuY3Rpb24gdGhlbnNSZXNvbHZlZCAoKSB7XHJcbiAgICAgIGlmICghdGhlbnMubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgIGxldCBjYiA9IHRoZW5zLnNoaWZ0KCk7XHJcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXoucmVzdWx0QXJncyk7XHJcbiAgICAgIHRoZW5zUmVhZHkucHVzaChjYik7XHJcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYXRjaHNSZXNvbHZlZCAoKSB7XHJcbiAgICAgIGlmICghY2F0Y2hzLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICBsZXQgY2IgPSBjYXRjaHMuc2hpZnQoKTtcclxuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XHJcbiAgICAgIGNhdGNoc1JlYWR5LnB1c2goY2IpO1xyXG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXoucmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XHJcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgdGhpei5yZXN1bHRBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnJlamVjdCA9IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XHJcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgdGhpei5lcnJvciA9IGVyciB8fCB7fTtcclxuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgdGhlbnMucHVzaChjYik7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiAhdGhpei5lcnJvcikge1xyXG4gICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpei5wcm9taXNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnByb21pc2UuY2F0Y2ggPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgY2F0Y2hzLnB1c2goY2IpO1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQgJiYgdGhpei5lcnJvcikge1xyXG4gICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXoucHJvbWlzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLmRvbmUgPSBmdW5jdGlvbiAoY2IpIHtcclxuXHJcbiAgICAgIHRoZW5zLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQodGhpei5yZXN1bHRBcmdzKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY2F0Y2hzLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkge1xyXG4gICAgICAgIGlmICghdGhpei5lcnJvcikge1xyXG4gICAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGlmKGNiKSB0aGl6LnByb21pc2UuZG9uZShjYik7XHJcblxyXG4gIH07XHJcblxyXG4gIC8vIENyZWEgdW5hIGluc3RhbmNpYSBkZWwgZGVmZXJlZFxyXG4gIHFzQ2xhc3MuZGVmZXIgPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgIHJldHVybiBuZXcgcXNDbGFzcyhjYik7XHJcbiAgfTtcclxuXHJcbiAgcXNDbGFzcy5hbGwgPSBmdW5jdGlvbiAoYXJyKSB7XHJcbiAgICBjb25zdCBkZWZlcmVkID0gcXNDbGFzcy5kZWZlcigpO1xyXG5cclxuICAgIGxldCBwcm9taXNlcyA9IGtleXMubGVuZ3RoO1xyXG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGFycik7XHJcbiAgICBjb25zdCByZXN1bHRzID0gYXJyLmxlbmd0aD8gW10gOiB7fTtcclxuXHJcbiAgICBrZXlzLm1hcChmdW5jdGlvbiAoaWR4KSB7XHJcblxyXG4gICAgICBhcnJbaWR4XS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICBwcm9taXNlcy0tO1xyXG4gICAgICAgIHJlc3VsdHNbaWR4XSA9IHJlc3VsdDtcclxuICAgICAgICBpZiAoIXByb21pc2VzKXtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShyZXN1bHRzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgYXJyW2lkeF0uY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICB9O1xyXG5cclxuICByZXR1cm4gcXNDbGFzcztcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9xcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHFzO1xuZnVuY3Rpb24gcXMoKSB7XG4gICduZ0luamVjdCc7XG5cbiAgZnVuY3Rpb24gcXNDbGFzcyhjYikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgIHZhciB0aGVucyA9IFtdO1xuICAgIHZhciB0aGVuc1JlYWR5ID0gW107XG4gICAgdmFyIGNhdGNocyA9IFtdO1xuICAgIHZhciBjYXRjaHNSZWFkeSA9IFtdO1xuICAgIHZhciByZXN1bHRBcmdzID0gbnVsbDtcbiAgICB2YXIgZXJyb3IgPSBudWxsO1xuXG4gICAgdGhpei5wcm9taXNlID0ge307XG4gICAgdGhpei4kcmVzb2x2ZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIHRoZW5zUmVzb2x2ZWQoKSB7XG4gICAgICBpZiAoIXRoZW5zLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgdmFyIGNiID0gdGhlbnMuc2hpZnQoKTtcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXoucmVzdWx0QXJncyk7XG4gICAgICB0aGVuc1JlYWR5LnB1c2goY2IpO1xuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhdGNoc1Jlc29sdmVkKCkge1xuICAgICAgaWYgKCFjYXRjaHMubGVuZ3RoKSByZXR1cm47XG4gICAgICB2YXIgY2IgPSBjYXRjaHMuc2hpZnQoKTtcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xuICAgICAgY2F0Y2hzUmVhZHkucHVzaChjYik7XG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgIH1cblxuICAgIHRoaXoucmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgdGhpei5yZXN1bHRBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICB9O1xuXG4gICAgdGhpei5yZWplY3QgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgIHRoaXouZXJyb3IgPSBlcnIgfHwge307XG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgIH07XG5cbiAgICB0aGl6LnByb21pc2UudGhlbiA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgdGhlbnMucHVzaChjYik7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQgJiYgIXRoaXouZXJyb3IpIHtcbiAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXoucHJvbWlzZTtcbiAgICB9O1xuXG4gICAgdGhpei5wcm9taXNlLmNhdGNoID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICBjYXRjaHMucHVzaChjYik7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQgJiYgdGhpei5lcnJvcikge1xuICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXoucHJvbWlzZTtcbiAgICB9O1xuXG4gICAgdGhpei5wcm9taXNlLmRvbmUgPSBmdW5jdGlvbiAoY2IpIHtcblxuICAgICAgdGhlbnMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQodGhpei5yZXN1bHRBcmdzKSk7XG4gICAgICB9KTtcblxuICAgICAgY2F0Y2hzLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHtcbiAgICAgICAgaWYgKCF0aGl6LmVycm9yKSB7XG4gICAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIGlmIChjYikgdGhpei5wcm9taXNlLmRvbmUoY2IpO1xuICB9O1xuXG4gIC8vIENyZWEgdW5hIGluc3RhbmNpYSBkZWwgZGVmZXJlZFxuICBxc0NsYXNzLmRlZmVyID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgcmV0dXJuIG5ldyBxc0NsYXNzKGNiKTtcbiAgfTtcblxuICBxc0NsYXNzLmFsbCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICB2YXIgZGVmZXJlZCA9IHFzQ2xhc3MuZGVmZXIoKTtcblxuICAgIHZhciBwcm9taXNlcyA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYXJyKTtcbiAgICB2YXIgcmVzdWx0cyA9IGFyci5sZW5ndGggPyBbXSA6IHt9O1xuXG4gICAga2V5cy5tYXAoZnVuY3Rpb24gKGlkeCkge1xuXG4gICAgICBhcnJbaWR4XS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgcHJvbWlzZXMtLTtcbiAgICAgICAgcmVzdWx0c1tpZHhdID0gcmVzdWx0O1xuICAgICAgICBpZiAoIXByb21pc2VzKSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgYXJyW2lkeF0uY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGVmZXJlZDtcbiAgfTtcblxuICByZXR1cm4gcXNDbGFzcztcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9xcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYlNvY2tldFNlcnZpY2UoJGxvZywgaW8sIGlkYlV0aWxzKSB7ICduZ0luamVjdCc7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gIFxyXG4gIGxldCAkZGVmVXJsU2VydmVyID0gbnVsbDtcclxuXHJcbiAgZnVuY3Rpb24gaWRiU29ja2V0ICgkdXJsU2VydmVyLCAkYWNjZXNzVG9rZW5JZCwgJGN1cnJlbnRVc2VySWQpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ10sIFsnc3RyaW5nJywgJ251bWJlciddXSk7XHJcblxyXG4gICAgY29uc3QgJGxpc3RlbmVycyA9ICBbXTtcclxuICAgIGxldCAkc29ja2V0ID0gbnVsbDtcclxuICAgICR1cmxTZXJ2ZXIgPSAkdXJsU2VydmVyIHx8ICRkZWZVcmxTZXJ2ZXI7XHJcblxyXG4gICAgLy8gQ29uZWN0YXJzZSBhbCBzZXJ2aWRvclxyXG4gICAgdGhpei5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBcclxuICAgICAgLy8gQ3JlYXRpbmcgY29ubmVjdGlvbiB3aXRoIHNlcnZlclxyXG4gICAgICAkc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsU2VydmVyKTtcclxuXHJcbiAgICAgIC8vIFRoaXMgcGFydCBpcyBvbmx5IGZvciBsb2dpbiB1c2VycyBmb3IgYXV0aGVudGljYXRlZCAkc29ja2V0IGNvbm5lY3Rpb24gYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlci5cclxuICAgICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXHJcblxyXG4gICAgICAkc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkbG9nLmxvZygnY29ubmVjdGVkJyk7XHJcblxyXG4gICAgICAgICRzb2NrZXQuZW1pdCgnYXV0aGVudGljYXRpb24nLCB7XHJcbiAgICAgICAgICBpZDogJGFjY2Vzc1Rva2VuSWQsXHJcbiAgICAgICAgICB1c2VySWQ6ICRjdXJyZW50VXNlcklkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRzb2NrZXQub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIC8vIHVzZSB0aGUgJHNvY2tldCBhcyB1c3VhbFxyXG4gICAgICAgICAgJGxvZy5sb2coJ1VzZXIgaXMgYXV0aGVudGljYXRlZCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgdmFyIG5hbWUgPSBvcHRpb25zLm1vZGVsTmFtZSArICcuJyArIG9wdGlvbnMuZXZlbnROYW1lO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgbmFtZSA9IG5hbWUgKyAnLicgKyBvcHRpb25zLm1vZGVsSWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRzb2NrZXQub24obmFtZSwgY2IpO1xyXG4gICAgICBcclxuICAgICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxyXG4gICAgICAkbGlzdGVuZXJzLnB1c2gobmFtZSwgY2IpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wdXNoTGlzdGVuZXIgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSwgY2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICRsaXN0ZW5lcnMucHVzaChzdWJzY3JpcHRpb25OYW1lKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSkge1xyXG4gICAgICAkc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTsgIFxyXG4gICAgICB2YXIgaWR4ID0gJGxpc3RlbmVycy5pbmRleE9mKHN1YnNjcmlwdGlvbk5hbWUpO1xyXG4gICAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgICAkbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouY29ubmVjdCgpO1xyXG5cclxuICB9O1xyXG5cclxuICAvLyBBc2lnbmEgbGEgVVJMIGRlIHNlcnZpZG9yIHBvciBkZWZlY3RvXHJcbiAgaWRiU29ja2V0LnNldFVybFNlcnZlciA9IGZ1bmN0aW9uICh1cmxTZXJ2ZXIpIHtcclxuICAgICRkZWZVcmxTZXJ2ZXIgPSB1cmxTZXJ2ZXI7XHJcbiAgfTtcclxuXHJcbiAgLy8gQVNpZ25hIGxhcyBjcmVkZW5jaWFsZXMgcG9yIGRlZmVjdG9cclxuICBpZGJTb2NrZXQuc2V0Q3JlZGVudGlhbHMgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCkge1xyXG4gICAgYWNjZXNzVG9rZW5JZCA9ICRhY2Nlc3NUb2tlbklkXHJcbiAgICBjdXJyZW50VXNlcklkID0gJGN1cnJlbnRVc2VySWQ7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGlkYlNvY2tldDtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJTb2NrZXQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJTb2NrZXRTZXJ2aWNlO1xuZnVuY3Rpb24gaWRiU29ja2V0U2VydmljZSgkbG9nLCBpbywgaWRiVXRpbHMpIHtcbiAgJ25nSW5qZWN0JztcbiAgdmFyIHRoaXogPSB0aGlzO1xuXG4gIHZhciAkZGVmVXJsU2VydmVyID0gbnVsbDtcblxuICBmdW5jdGlvbiBpZGJTb2NrZXQoJHVybFNlcnZlciwgJGFjY2Vzc1Rva2VuSWQsICRjdXJyZW50VXNlcklkKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3N0cmluZycsICdudW1iZXInXSwgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcblxuICAgIHZhciAkbGlzdGVuZXJzID0gW107XG4gICAgdmFyICRzb2NrZXQgPSBudWxsO1xuICAgICR1cmxTZXJ2ZXIgPSAkdXJsU2VydmVyIHx8ICRkZWZVcmxTZXJ2ZXI7XG5cbiAgICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXG4gICAgdGhpei5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyBDcmVhdGluZyBjb25uZWN0aW9uIHdpdGggc2VydmVyXG4gICAgICAkc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsU2VydmVyKTtcblxuICAgICAgLy8gVGhpcyBwYXJ0IGlzIG9ubHkgZm9yIGxvZ2luIHVzZXJzIGZvciBhdXRoZW50aWNhdGVkICRzb2NrZXQgY29ubmVjdGlvbiBiZXR3ZWVuIGNsaWVudCBhbmQgc2VydmVyLlxuICAgICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXG5cbiAgICAgICRzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRsb2cubG9nKCdjb25uZWN0ZWQnKTtcblxuICAgICAgICAkc29ja2V0LmVtaXQoJ2F1dGhlbnRpY2F0aW9uJywge1xuICAgICAgICAgIGlkOiAkYWNjZXNzVG9rZW5JZCxcbiAgICAgICAgICB1c2VySWQ6ICRjdXJyZW50VXNlcklkXG4gICAgICAgIH0pO1xuICAgICAgICAkc29ja2V0Lm9uKCdhdXRoZW50aWNhdGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIHVzZSB0aGUgJHNvY2tldCBhcyB1c3VhbFxuICAgICAgICAgICRsb2cubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpei5zdWJzY3JpYmUgPSBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIHZhciBuYW1lID0gb3B0aW9ucy5tb2RlbE5hbWUgKyAnLicgKyBvcHRpb25zLmV2ZW50TmFtZTtcblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lICsgJy4nICsgb3B0aW9ucy5tb2RlbElkO1xuICAgICAgfVxuXG4gICAgICAkc29ja2V0Lm9uKG5hbWUsIGNiKTtcblxuICAgICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxuICAgICAgJGxpc3RlbmVycy5wdXNoKG5hbWUsIGNiKTtcbiAgICB9O1xuXG4gICAgdGhpei5wdXNoTGlzdGVuZXIgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICRsaXN0ZW5lcnMucHVzaChzdWJzY3JpcHRpb25OYW1lKTtcbiAgICB9O1xuXG4gICAgdGhpei51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lKSB7XG4gICAgICAkc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTtcbiAgICAgIHZhciBpZHggPSAkbGlzdGVuZXJzLmluZGV4T2Yoc3Vic2NyaXB0aW9uTmFtZSk7XG4gICAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICAgICRsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXouY29ubmVjdCgpO1xuICB9O1xuXG4gIC8vIEFzaWduYSBsYSBVUkwgZGUgc2Vydmlkb3IgcG9yIGRlZmVjdG9cbiAgaWRiU29ja2V0LnNldFVybFNlcnZlciA9IGZ1bmN0aW9uICh1cmxTZXJ2ZXIpIHtcbiAgICAkZGVmVXJsU2VydmVyID0gdXJsU2VydmVyO1xuICB9O1xuXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXG4gIGlkYlNvY2tldC5zZXRDcmVkZW50aWFscyA9IGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XG4gICAgYWNjZXNzVG9rZW5JZCA9ICRhY2Nlc3NUb2tlbklkO1xuICAgIGN1cnJlbnRVc2VySWQgPSAkY3VycmVudFVzZXJJZDtcbiAgfTtcblxuICByZXR1cm4gaWRiU29ja2V0O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYlNvY2tldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJTZXJ2aWNlICgkbG9nLCBxcywgaWRiVXRpbHMsIGlkYkV2ZW50cywgaWRiTW9kZWwpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxyXG4gICAgY29uc3QgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xyXG4gICAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxyXG4gICAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XHJcbiAgICBjb25zdCBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XHJcbiAgICBjb25zdCBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XHJcbiAgICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxyXG4gICAgXHJcbiAgICBpZiAoIWluZGV4ZWREQikge1xyXG4gICAgICBhbGVydChcIlN1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhc1wiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAvLyBDbGFzZSBwYXJhIGxhIGNyZWFjacOzbiBkZSBpbnN0YW5jaWFzIGRlIGxhIEJEXHJcbiAgZnVuY3Rpb24gaWRiKCRkYk5hbWUsICRkYlZlcnNpb24sICRzb2NrZXQpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ251bWJlcicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgIC8vIE1hbmVqYWRvcmVzIGRlIGV2ZW50b3MuXHJcbiAgICBjb25zdCAkZXZlbnRzQ2FsbGJhY2tzID0ge307XHJcbiAgICBjb25zdCAkdXBncmFkZU5lZWRlZERlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG4gICAgY29uc3QgJG9wZW5EZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgIGNvbnN0ICRzb2NrZXRDb25uZWN0ZWREZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgIGxldCAkb3BlbmVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gSW5zdGFuY2lhIGRlIGxhIGJhc2UgZGUgZGF0b3M7XHJcbiAgICBsZXQgJHJlcXVlc3QgPSBudWxsO1xyXG4gICAgdGhpei5tb2RlbHMgPSB7fTtcclxuXHJcbiAgICAvLyBBZ3JlZ2FyIHVuIG1hbmVqYWRvciBkZSBldmVudG9cclxuICAgICAgdGhpei5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSl7XHJcbiAgICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5wdXNoKGNiKTtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgLy9SZW11ZXZlIHVuIG1hbmVqYWRvciBkZSBldmVudG9cclxuICAgICAgdGhpei51bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIEJ1c2NhciBlbCBjYlxyXG4gICAgICAgIGNvbnN0IGlkeCA9ICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5pbmRleE9mKGNiKTtcclxuXHJcbiAgICAgICAgLy8gU2kgc2UgZW5jb250cm8gZWwgY2IgcmVtb3ZlcmxvXHJcbiAgICAgICAgaWYgKGlkeCAhPSAtMSl7XHJcbiAgICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAvLyBEaXNwYXJhIHVuIGV2ZW50b1xyXG4gICAgICB0aGl6LnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnXSk7XHJcblxyXG4gICAgICAgICRsb2cubG9nKCRkYk5hbWUrJy52JysoJGRiVmVyc2lvbnx8MSkrJzogJytldmVudE5hbWUpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgaW4gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKXtcclxuICAgICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXVtpXS5hcHBseSh0aGl6LCBhcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgIC8vIENhbGxiYWNrcyBwYXJhIGxvcyBlcnJvcmVzXHJcbiAgICAgIHRoaXouZXJyb3IgPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICB0aGl6LmJpbmQoaWRiRXZlbnRzLkRCX0VSUk9SLCBjYik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICAgIH07XHJcblxyXG4gICAgLy8gQWJyaXIgdW5hIEJhc2UgZGUgZGF0b3MuXHJcbiAgICB0aGl6Lm9wZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICgkb3BlbmVkKSByZXR1cm4gJG9wZW5EZWZlcmVkO1xyXG5cclxuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gZGVmZXJcclxuICAgICAgJG9wZW5lZCA9IHRydWU7XHJcblxyXG4gICAgICAvLyBkZWphbW9zIGFiaWVydGEgbnVlc3RyYSBiYXNlIGRlIGRhdG9zXHJcbiAgICAgIGZ1bmN0aW9uIHJlYWR5KCkge1xyXG5cclxuICAgICAgICBjb25zdCBycSA9IGluZGV4ZWREQi5vcGVuKCRkYk5hbWUsICRkYlZlcnNpb24pO1xyXG5cclxuICAgICAgICBycS5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLnJlc3VsdCFcclxuICAgICAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBycSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlbCByZXN1bHRhZG9cclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLnJlc3VsdCFcclxuICAgICAgICAgICRyZXF1ZXN0ID0gcnE7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIEFzaW5nYXIgZWwgbWFuZWphZG9yIGRlIGVycm9yZXMgYSBsYSBCRFxyXG4gICAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAkbG9nLmVycm9yKCdEYXRhYmFzZSBlcnJvcjogJysgZXZlbnQudGFyZ2V0LmVycm9yQ29kZSk7XHJcbiAgICAgICAgICAgIHRoaXoudHJpZ2dlcihpZGJFdmVudHMuREJfRVJST1IsIFtldmVudF0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBycSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlIGVycm9yZXNcclxuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLmVycm9yQ29kZSFcclxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAkb3BlbkRlZmVyZWQucmVqZWN0KHJxLmVycm9yQ29kZSwgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UoJGRiTmFtZSkub25zdWNjZXNzID0gcmVhZHk7XHJcbiAgICAgIC8vIHJlYWR5KCk7XHJcblxyXG4gICAgICByZXR1cm4gJG9wZW5EZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQWdyZWdhIHVuIG51ZXZvIG1vZGVsb1xyXG4gICAgICB0aGl6Lm1vZGVsID0gZnVuY3Rpb24gKG5hbWUsIHNvY2tldCkge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3VuZGVmaW5lZCcsICdvYmplY3QnXV0pO1xyXG5cclxuICAgICAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsb1xyXG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXoubW9kZWxzW25hbWVdO1xyXG5cclxuICAgICAgICAvLyBTaSBubyBleGlzdGUgZWwgbW9kZWxvIGNyZWFyXHJcbiAgICAgICAgaWYoIW1vZGVsKXtcclxuICAgICAgICAgIG1vZGVsID0gaWRiTW9kZWwodGhpeiwgbmFtZSwgc29ja2V0IHx8ICRzb2NrZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gR3VhcmRhciBlbCBtb2RlbG8gZW4gbG9zIG1vZGVsb3NcclxuICAgICAgICB0aGl6Lm1vZGVsc1tuYW1lXSA9IG1vZGVsO1xyXG5cclxuICAgICAgICAvLyBSZXRvcm5hciBlbCBtb2RlbG9cclxuICAgICAgICByZXR1cm4gbW9kZWw7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxyXG4gICAgICB0aGl6LmNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgbW9kZWxJZCkge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcclxuICAgICAgICAgIHJxLnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShtb2RlbE5hbWUsIG1vZGVsSWQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcclxuICAgIHRoaXouY3JlYXRlSW5kZXggPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XHJcbiAgICAgICAgcnEudHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5jcmVhdGVJbmRleChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSB1bmEgdHJhbnNhY2Npw7NuXHJcbiAgICB0aGl6LnRyYW5zYWN0aW9uID0gZnVuY3Rpb24obW9kZWxOYW1lLCBwZXJtcywgYWN0aW9uKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICAvLyBDdWFuZG8gc2UgYWJyYSBsYSBCRFxyXG4gICAgICAkb3BlbkRlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcclxuICAgICAgICBjb25zdCB0eCA9IHJxLnJlc3VsdC50cmFuc2FjdGlvbihtb2RlbE5hbWUsIHBlcm1zKTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhY3Rpb24odHgpO1xyXG5cclxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXHJcbiAgICAgICAgdHgub25jb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCByZXN1bHQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXHJcbiAgICAgICAgdHgub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KHR4LmVycm9yKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE9idGllbmUgdW4gZWxlbWVudG8gcG9yIHN1IGtleVxyXG4gICAgdGhpei5nZXQgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBrZXkpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnc3RyaW5nJywgJ251bWJlciddXSk7XHJcblxyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuXHJcbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXHJcbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBjb25zdCBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShycS5yZXN1bHQsIGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxyXG4gICAgICAgIHJxLm9uZXJyb3IgID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAvLyBDb3VsZCBjYWxsIHJxLnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEluc2VydGEgdW4gcmVnaXN0cm8gZW4gZWwgbW9kZWxvXHJcbiAgICB0aGl6LnB1dCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIHZhbHVlcykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cclxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBjb25zdCBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkucHV0KHZhbHVlcyk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICBycS5vbmVycm9yICA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBFbGltaW5hIHVuIG9iamV0byBwb3Igc3Uga2V5XHJcbiAgICB0aGl6LmRlbGV0ZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGtleSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cclxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBjb25zdCBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkuZGVsZXRlKGtleSk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICBycS5vbmVycm9yICA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cclxuICAgIHRoaXoub3BlbkN1cnNvciA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGZpbHRlcnMsIGVhY2hDYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ10sICdmdW5jdGlvbiddKTtcclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxyXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWRvbmx5JywgZnVuY3Rpb24gKHR4KSB7XHJcbiAgICAgICAgY29uc3QgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLm9wZW5DdXJzb3IoKTtcclxuXHJcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBycS5yZXN1bHQ7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIE5vIG1vcmUgbWF0Y2hpbmcgcmVjb3Jkcy5cclxuICAgICAgICAgIGlmIChjdXJzb3Ipe1xyXG4gICAgICAgICAgICBlYWNoQ2IoY3Vyc29yLnZhbHVlLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgLy8gQnVzY2FyIHNpZ3VpZW50ZVxyXG4gICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcmVkLnJlc29sdmUoKTtcclxuICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWFyIGFsaWFzIHBhcmEgbG9zIGV2ZW50b3MgZW5sYXphciBjYWxsYmFja3MgYSBsb3MgZXZlbnRvc1xyXG4gICAgbGV0IGRlZmVyZWRzO1xyXG4gICAgICBPYmplY3Qua2V5cyhkZWZlcmVkcyA9IHtcclxuICAgICAgICBvbk9wZW46ICRvcGVuRGVmZXJlZCxcclxuICAgICAgICBvblVwZ3JhZGVOZWVkZWQ6ICR1cGdyYWRlTmVlZGVkRGVmZXJlZCxcclxuICAgICAgICBvblNvY2tldENvbm5lY3RlZDogJHNvY2tldENvbm5lY3RlZERlZmVyZWRcclxuICAgICAgfSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zdCB0ZXh0ID0gJGRiTmFtZSsnLnYnKygkZGJWZXJzaW9ufHwxKSsnOiAnK2tleTtcclxuICAgICAgICAgIGlmIChlcnIpe1xyXG4gICAgICAgICAgICAkbG9nLmVycm9yKHRleHQsIGVycik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkbG9nLmxvZyh0ZXh0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGl6W2tleV0gPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcclxuICAgICAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGNiKTtcclxuICAgICAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG5cclxuICB9O1xyXG5cclxuICByZXR1cm4gaWRiO1xyXG5cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaWRiU2VydmljZTtcbmZ1bmN0aW9uIGlkYlNlcnZpY2UoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJFdmVudHMsIGlkYk1vZGVsKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxuXG4gIHZhciBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XG4gIC8vIE5vIHVzZSBcImNvbnN0IGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cbiAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XG4gIHZhciBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XG4gIHZhciBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XG4gIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXG5cbiAgaWYgKCFpbmRleGVkREIpIHtcbiAgICBhbGVydChcIlN1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhc1wiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBDbGFzZSBwYXJhIGxhIGNyZWFjacOzbiBkZSBpbnN0YW5jaWFzIGRlIGxhIEJEXG4gIGZ1bmN0aW9uIGlkYigkZGJOYW1lLCAkZGJWZXJzaW9uLCAkc29ja2V0KSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnbnVtYmVyJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAvLyBNYW5lamFkb3JlcyBkZSBldmVudG9zLlxuICAgIHZhciAkZXZlbnRzQ2FsbGJhY2tzID0ge307XG4gICAgdmFyICR1cGdyYWRlTmVlZGVkRGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgdmFyICRvcGVuRGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgdmFyICRzb2NrZXRDb25uZWN0ZWREZWZlcmVkID0gcXMuZGVmZXIoKTtcbiAgICB2YXIgJG9wZW5lZCA9IGZhbHNlO1xuXG4gICAgLy8gSW5zdGFuY2lhIGRlIGxhIGJhc2UgZGUgZGF0b3M7XG4gICAgdmFyICRyZXF1ZXN0ID0gbnVsbDtcbiAgICB0aGl6Lm1vZGVscyA9IHt9O1xuXG4gICAgLy8gQWdyZWdhciB1biBtYW5lamFkb3IgZGUgZXZlbnRvXG4gICAgdGhpei5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSB7XG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0ucHVzaChjYik7XG4gICAgfTtcblxuICAgIC8vUmVtdWV2ZSB1biBtYW5lamFkb3IgZGUgZXZlbnRvXG4gICAgdGhpei51bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHJldHVybjtcblxuICAgICAgLy8gQnVzY2FyIGVsIGNiXG4gICAgICB2YXIgaWR4ID0gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLmluZGV4T2YoY2IpO1xuXG4gICAgICAvLyBTaSBzZSBlbmNvbnRybyBlbCBjYiByZW1vdmVybG9cbiAgICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnNwbGljZShpZHgsIDEpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBEaXNwYXJhIHVuIGV2ZW50b1xuICAgIHRoaXoudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0J10pO1xuXG4gICAgICAkbG9nLmxvZygkZGJOYW1lICsgJy52JyArICgkZGJWZXJzaW9uIHx8IDEpICsgJzogJyArIGV2ZW50TmFtZSk7XG5cbiAgICAgIGZvciAodmFyIGkgaW4gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSB7XG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXVtpXS5hcHBseSh0aGl6LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gQ2FsbGJhY2tzIHBhcmEgbG9zIGVycm9yZXNcbiAgICB0aGl6LmVycm9yID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB0aGl6LmJpbmQoaWRiRXZlbnRzLkRCX0VSUk9SLCBjYik7XG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgLy8gQWJyaXIgdW5hIEJhc2UgZGUgZGF0b3MuXG4gICAgdGhpei5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCRvcGVuZWQpIHJldHVybiAkb3BlbkRlZmVyZWQ7XG5cbiAgICAgIC8vIENyZWFyIHVuIG51ZXZvIGRlZmVyXG4gICAgICAkb3BlbmVkID0gdHJ1ZTtcblxuICAgICAgLy8gZGVqYW1vcyBhYmllcnRhIG51ZXN0cmEgYmFzZSBkZSBkYXRvc1xuICAgICAgZnVuY3Rpb24gcmVhZHkoKSB7XG5cbiAgICAgICAgdmFyIHJxID0gaW5kZXhlZERCLm9wZW4oJGRiTmFtZSwgJGRiVmVyc2lvbik7XG5cbiAgICAgICAgcnEub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxuICAgICAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBycSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGVsIHJlc3VsdGFkb1xuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5yZXN1bHQhXG4gICAgICAgICAgJHJlcXVlc3QgPSBycTtcblxuICAgICAgICAgIC8vIEFzaW5nYXIgZWwgbWFuZWphZG9yIGRlIGVycm9yZXMgYSBsYSBCRFxuICAgICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICRsb2cuZXJyb3IoJ0RhdGFiYXNlIGVycm9yOiAnICsgZXZlbnQudGFyZ2V0LmVycm9yQ29kZSk7XG4gICAgICAgICAgICB0aGl6LnRyaWdnZXIoaWRiRXZlbnRzLkRCX0VSUk9SLCBbZXZlbnRdKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgJG9wZW5EZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzXG4gICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLmVycm9yQ29kZSFcbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZWplY3QocnEuZXJyb3JDb2RlLCBldmVudCk7XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICBpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UoJGRiTmFtZSkub25zdWNjZXNzID0gcmVhZHk7XG4gICAgICAvLyByZWFkeSgpO1xuXG4gICAgICByZXR1cm4gJG9wZW5EZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBBZ3JlZ2EgdW4gbnVldm8gbW9kZWxvXG4gICAgdGhpei5tb2RlbCA9IGZ1bmN0aW9uIChuYW1lLCBzb2NrZXQpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3VuZGVmaW5lZCcsICdvYmplY3QnXV0pO1xuXG4gICAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsb1xuICAgICAgdmFyIG1vZGVsID0gdGhpei5tb2RlbHNbbmFtZV07XG5cbiAgICAgIC8vIFNpIG5vIGV4aXN0ZSBlbCBtb2RlbG8gY3JlYXJcbiAgICAgIGlmICghbW9kZWwpIHtcbiAgICAgICAgbW9kZWwgPSBpZGJNb2RlbCh0aGl6LCBuYW1lLCBzb2NrZXQgfHwgJHNvY2tldCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEd1YXJkYXIgZWwgbW9kZWxvIGVuIGxvcyBtb2RlbG9zXG4gICAgICB0aGl6Lm1vZGVsc1tuYW1lXSA9IG1vZGVsO1xuXG4gICAgICAvLyBSZXRvcm5hciBlbCBtb2RlbG9cbiAgICAgIHJldHVybiBtb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXG4gICAgdGhpei5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIG1vZGVsSWQpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcbiAgICAgICAgcnEucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKG1vZGVsTmFtZSwgbW9kZWxJZCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXG4gICAgdGhpei5jcmVhdGVJbmRleCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcbiAgICAgICAgcnEudHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5jcmVhdGVJbmRleChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSB1bmEgdHJhbnNhY2Npw7NuXG4gICAgdGhpei50cmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIHBlcm1zLCBhY3Rpb24pIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgIC8vIEN1YW5kbyBzZSBhYnJhIGxhIEJEXG4gICAgICAkb3BlbkRlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcbiAgICAgICAgdmFyIHR4ID0gcnEucmVzdWx0LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgcGVybXMpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gYWN0aW9uKHR4KTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHR4Lm9uY29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJlc3VsdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgdHgub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdCh0eC5lcnJvcik7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIE9idGllbmUgdW4gZWxlbWVudG8gcG9yIHN1IGtleVxuICAgIHRoaXouZ2V0ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwga2V5KSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLmdldChrZXkpO1xuXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKHJxLnJlc3VsdCwgZXZlbnQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAvLyBDb3VsZCBjYWxsIHJxLnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIEluc2VydGEgdW4gcmVnaXN0cm8gZW4gZWwgbW9kZWxvXG4gICAgdGhpei5wdXQgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCB2YWx1ZXMpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0J10pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLnB1dCh2YWx1ZXMpO1xuXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBFbGltaW5hIHVuIG9iamV0byBwb3Igc3Uga2V5XG4gICAgdGhpei5kZWxldGUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBrZXkpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3N0cmluZycsICdudW1iZXInXV0pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLmRlbGV0ZShrZXkpO1xuXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xuICAgIHRoaXoub3BlbkN1cnNvciA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGZpbHRlcnMsIGVhY2hDYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddLCAnZnVuY3Rpb24nXSk7XG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWRvbmx5JywgZnVuY3Rpb24gKHR4KSB7XG4gICAgICAgIHZhciBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkub3BlbkN1cnNvcigpO1xuXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgY3Vyc29yID0gcnEucmVzdWx0O1xuXG4gICAgICAgICAgLy8gTm8gbW9yZSBtYXRjaGluZyByZWNvcmRzLlxuICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGVhY2hDYihjdXJzb3IudmFsdWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgLy8gQnVzY2FyIHNpZ3VpZW50ZVxuICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIENyZWFyIGFsaWFzIHBhcmEgbG9zIGV2ZW50b3MgZW5sYXphciBjYWxsYmFja3MgYSBsb3MgZXZlbnRvc1xuICAgIHZhciBkZWZlcmVkcyA9IHZvaWQgMDtcbiAgICBPYmplY3Qua2V5cyhkZWZlcmVkcyA9IHtcbiAgICAgIG9uT3BlbjogJG9wZW5EZWZlcmVkLFxuICAgICAgb25VcGdyYWRlTmVlZGVkOiAkdXBncmFkZU5lZWRlZERlZmVyZWQsXG4gICAgICBvblNvY2tldENvbm5lY3RlZDogJHNvY2tldENvbm5lY3RlZERlZmVyZWRcbiAgICB9KS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoZnVuY3Rpb24gKGVycikge1xuICAgICAgICB2YXIgdGV4dCA9ICRkYk5hbWUgKyAnLnYnICsgKCRkYlZlcnNpb24gfHwgMSkgKyAnOiAnICsga2V5O1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgJGxvZy5lcnJvcih0ZXh0LCBlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRsb2cubG9nKHRleHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXpba2V5XSA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XG4gICAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGNiKTtcbiAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBpZGI7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYk1vZGVsU2VydmljZSAoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJRdWVyeSwgaWRiRXZlbnRzLCBsYlJlc291cmNlLCAkdGltZW91dCkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAvLyBCdXNjYXIgdW4gY2FtcG9cclxuICAgIGNvbnN0IHNlYXJjaERlZXBGaWVsZCA9IGZ1bmN0aW9uIChvYmosIGZpZWxkLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgJ3N0cmluZycsICdmdW5jdGlvbiddKTtcclxuXHJcbiAgICAgIGNvbnN0IGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XHJcbiAgICAgIGNvbnN0IGxhc3RGaWVsZCA9IGZpZWxkcy5wb3AoKTtcclxuXHJcbiAgICAgIHJldHVybiAoZnVuY3Rpb24gX3NldChvYmopIHtcclxuICAgICAgICBpZiAoZmllbGRzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgcmV0dXJuIGNiKG9iaiwgbGFzdEZpZWxkKTtcclxuICAgICAgICBjb25zdCBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW2ZpZWxkXSA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAgICBvYmpbZmllbGRdID0ge307XHJcbiAgICAgICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XHJcbiAgICAgIH0pKG9iaik7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cclxuICAgIGNvbnN0IGdldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCkge1xyXG4gICAgICByZXR1cm4gc2VhcmNoRGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xyXG4gICAgY29uc3Qgc2V0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIChvYmosIGZpZWxkLCB2YWx1ZSkge1xyXG4gICAgICBzZWFyY2hEZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICAgICAgb2JqW2xhc3RGaWVsZF0gPSB2YWx1ZTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9O1xyXG5cclxuICByZXR1cm4gZnVuY3Rpb24gaWRiTW9kZWwgKCRkYiwgJG1vZGVsTmFtZSwgJHNvY2tldCkge1xyXG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbbnVsbCAsJ3N0cmluZyddKTtcclxuXHJcbiAgICAvLyBDbGF2ZSBkZWwgbW9kZWxvXHJcbiAgICBjb25zdCAkaWQgPSB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfTtcclxuICAgIGNvbnN0ICRldmVudHNIYW5kbGVycyA9IHt9O1xyXG4gICAgY29uc3QgJGluc3RhbmNlcyA9IHt9O1xyXG4gICAgbGV0ICRmaWVsZHMgPSB7fTtcclxuICAgIGxldCAkcmVtb3RlID0gbnVsbDtcclxuICAgIGxldCAkdmVyc2lvbmluZyA9IG51bGw7XHJcblxyXG4gICAgLy8gQ29uc3R1Y3RvciBkZWwgbW9kZWxvXHJcbiAgICBmdW5jdGlvbiBNb2RlbChkYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgdGhpei4kcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIHRoaXouJGxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGl6LiRsb2NhbExvYWRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGl6LiRyZW1vdGVMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgXHJcbiAgICAgIHRoaXouJGxvY2FsVmFsdWVzID0ge307XHJcbiAgICAgIHRoaXouJHJlbW90ZVZhbHVlcyA9IHt9O1xyXG5cclxuICAgICAgdGhpei4kdmVyc2lvbiA9IG51bGw7XHJcbiAgICAgIHRoaXouJGxvY2FsVmVyc2lvbiA9IG51bGw7XHJcbiAgICAgIHRoaXouJHJlbW90ZVZlcnNpb24gPSBudWxsO1xyXG5cclxuICAgICAgdGhpei4kZXZlbnRzSGFuZGxlcnMgPSB7fTtcclxuICAgICAgXHJcbiAgICAgIGlmIChkYXRhKXtcclxuICAgICAgICB0aGl6LiRzZXRWYWx1ZXMoZGF0YSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXouJGNvbnN0cnVjdG9yKGRhdGEpO1xyXG5cclxuICAgICAgaWYgKCRzb2NrZXQpIHtcclxuICAgICAgICB0aGl6LiRsaXN0ZW4oKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgJHJlc3VsdHMgPSBbXTtcclxuXHJcbiAgICAgIHRoaXpcclxuICAgICAgICBcclxuICAgICAgICAvLyBDdWFuZG8gc2VhIGNvbnN1bHRhZG8gYWdyZWdhciBsYSBjb25zdWx0YVxyXG4gICAgICAgIC4kYmluZChpZGJFdmVudHMuTU9ERUxfUVVFUklFRCwgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgJHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIEN1YW5kbyBzZWEgbGliZXJhZG8gZGUgbGEgY29uc3VsdGFyIHF1aXRhciBkZSBsYXMgY29uc3VsdGFzXHJcbiAgICAgICAgLiRiaW5kKGlkYkV2ZW50cy5NT0RFTF9VTlFVRVJJRUQsIGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgIGNvbnN0IGlkeCA9ICRyZXN1bHRzLmluZGV4T2YocmVzdWx0KTtcclxuICAgICAgICAgIGlmIChpZHggIT0gLTEpe1xyXG4gICAgICAgICAgICAkcmVzdWx0cy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBFdmVudG8gZGUgcXVlIG1vZGVsbyBlc3TDoSBpbnN0YW5jaWFkb1xyXG4gICAgICAgIC4kZW1pdChpZGJFdmVudHMuTU9ERUxfSU5TVEFOQ0VEKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHYgZWwgbm9tYnJlIGRlbCBtb2RlbG9cclxuICAgICAgTW9kZWwuZ2V0TW9kZWxOYW1lID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gJG1vZGVsTmFtZTtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBBc2lnbmEgZWwgSUQgYWwgbW9kZWxvXHJcbiAgICAgIE1vZGVsLmF1dG9JbmNyZW1lbnQgPSBmdW5jdGlvbiAoYXV0b0luY3JlbWVudCkge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydib29sZWFuJ10pO1xyXG5cclxuICAgICAgICAkaWQuYXV0b0luY3JlbWVudCA9IGF1dG9JbmNyZW1lbnQ7XHJcbiAgICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cclxuICAgICAgTW9kZWwua2V5UGF0aCA9IGZ1bmN0aW9uIChrZXlQYXRoKSB7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZyddKTtcclxuXHJcbiAgICAgICAgJGlkLmtleVBhdGggPSBrZXlQYXRoO1xyXG4gICAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBDcmVhIGVsIG9iamVjdG8gc3RvcmFnZSBwYXJhIGVsIG1vZGVsby5cclxuICAgICAgTW9kZWwuY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICRkYi5jcmVhdGVTdG9yZSgkbW9kZWxOYW1lLCAkaWQpO1xyXG4gICAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgLy8gQWdyZWdhIHVuIGluZGV4XHJcbiAgICBNb2RlbC5pbmRleCA9IGZ1bmN0aW9uIChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xyXG5cclxuICAgICAgJGRiLmNyZWF0ZUluZGV4KCRtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gTcOpdG9kbyBxdWUgcGVybWl0ZSBtb2RpZmljYXIgbW9kZWwuXHJcbiAgICAgIE1vZGVsLmJ1aWxkID0gZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICAgIGJ1aWxkQ2FsbGJhY2soTW9kZWwpO1xyXG4gICAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBBc2lnbmEgbGEgZXNwZWNpZmljYWNpw7NuIGRlIGxvcyBjYW1wb3NcclxuICAgICAgTW9kZWwuZmllbGRzID0gZnVuY3Rpb24gKGZpZWxkcykge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnXSk7XHJcblxyXG4gICAgICAgICRmaWVsZHMgPSB7fTtcclxuICAgICAgICAkZmllbGRzWyRpZC5rZXlQYXRoXSA9IHtcclxuICAgICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiLFxyXG4gICAgICAgICAgXCJyZXF1aXJlZFwiOiB0cnVlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMoZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkTmFtZSkge1xyXG4gICAgICAgICAgbGV0IGZpZWxkID0gZmllbGRzW2ZpZWxkTmFtZV07XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkc1tmaWVsZE5hbWVdID09ICdzdHJpbmcnKXtcclxuICAgICAgICAgICAgZmllbGQgPSB7IFwidHlwZVwiOiBmaWVsZCB9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgJGZpZWxkc1tmaWVsZE5hbWVdID0gZmllbGQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIENvbmZpZ3VyYSBlbCByZW1vdGUgYXBpO1xyXG4gICAgICBNb2RlbC5yZW1vdGUgPSBmdW5jdGlvbiAodXJsLCBhcmdzLCBhY3Rpb25zKSB7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnLCAnb2JqZWN0J10pO1xyXG5cclxuICAgICAgICAkcmVtb3RlID0gbGJSZXNvdXJjZSh1cmwsIGFyZ3MsIGFjdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGVsICRyZW1vdGUgZGVsIG1vZGVsb1xyXG4gICAgICBNb2RlbC5nZXRSZW1vdGUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAkcmVtb3RlO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGNvcnJlc3BvbmRpZW50ZSBhbCBrZXkgZGUgdW4gb2JqZXRvXHJcbiAgICAgIE1vZGVsLmdldEtleUZyb20gPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsICRpZC5rZXlQYXRoKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgbW9kZWwgZGUgbGFzIGd1YXJkYWRhcy4gU2kgbm8gZXhpc3RlIGVudG9uY2VcclxuICAgICAgLy8gc2UgY3JlYVxyXG4gICAgICBNb2RlbC5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ3N0cmluZycsICdudW1iZXInLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICAgLy8gRWwgb2JqZXRvIG5vIHRpZW5lIElEXHJcbiAgICAgICAgaWYgKCFrZXkpIHtcclxuICAgICAgICAgIHJldHVybiBuZXcgTW9kZWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE5vIGV4aXN0ZSBsYSBpbnN0YW5jaWEgZW50b25jZSBzZSBjcmVhXHJcbiAgICAgICAgaWYgKCEkaW5zdGFuY2VzW2tleV0pe1xyXG4gICAgICAgICAgJGluc3RhbmNlc1trZXldID0gbmV3IE1vZGVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiAkaW5zdGFuY2VzW2tleV07XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgIC8vIEJ1c2NhIHVuIHJlZ2lzdHJvIGVuIGxhIG9iamVjdFN0b3JlIGRlbCBtb2RlbG8uXHJcbiAgICBNb2RlbC5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcblxyXG4gICAgICBjb25zdCBpbnN0YW5jZSA9IE1vZGVsLmdldEluc3RhbmNlKGtleSk7XHJcblxyXG4gICAgICBpZiAoaW5zdGFuY2UuJGxvY2FsTG9hZGVkKSByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgICAgXHJcbiAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IGZhbHNlO1xyXG4gICAgICBpbnN0YW5jZS4kcHJvbWlzZSA9IGRlZmVyZWQucHJvbWlzZTtcclxuXHJcbiAgICAgICRkYi5nZXQoJG1vZGVsTmFtZSwga2V5KS5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBNb2RlbC5nZXRWZXJzaW9uT2Yoa2V5KS5wcm9taXNlXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAodmVyc2lvbikge1xyXG4gICAgICAgICAgICBpbnN0YW5jZS4kc2V0TG9jYWxWYWx1ZXMoZGF0YSwgZGF0YSAmJiB2ZXJzaW9uPyB2ZXJzaW9uLmhhc2ggOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICRsb2cuZXJyb3IoWydNb2RlbC5nZXRWZXJzaW9uT2YgYW55IGVycm9yJywgZXJyXSlcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cclxuICAgIE1vZGVsLmZpbmQgPSBmdW5jdGlvbiAoZmlsdGVycykge1xyXG5cclxuICAgICAgcmV0dXJuIG5ldyBpZGJRdWVyeSgkZGIsIE1vZGVsLCBmaWx0ZXJzKTs7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIG51ZXZhcyBpbnN0YW5jaWFzIGRlIGxvcyBtb2RlbG9zXHJcbiAgICBNb2RlbC5jcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgLy8gU2kgZXMgdW4gYXJyYXlcclxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCByZWNvcmQgPSBNb2RlbC5nZXRJbnN0YW5jZShNb2RlbC5nZXRLZXlGcm9tKGRhdGEpKTtcclxuXHJcbiAgICAgICAgaWYgKHJlY29yZC4kbG9hZGVkKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkNhbnRDcmVhdGVkTG9hZGVkSW5zdGFuY2UnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZWNvcmQuJHB1bGwoKTtcclxuXHJcbiAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgLy8gT2J0ZW5lciB1bmEgY29waWEgZGVsIGFycmF5XHJcbiAgICAgIGNvbnN0IGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRhdGEpO1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKGNiKTtcclxuXHJcbiAgICAgIChmdW5jdGlvbiBpdGVyYXRpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyBObyBxdWVkYW4gZWxlbWVudG9zIGVuIGVsIGFycmF5XHJcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT0gMCkgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZShyZXN1bHQpO1xyXG5cclxuICAgICAgICAvLyBDcmVhciBlbCBzaWd1aWVudGUgZWxlbWVudG9cclxuICAgICAgICBNb2RlbC5jcmVhdGUoYXJyLnNoaWZ0KCkpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBpdGVyYXRpb24oKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KSgpO1xyXG5cclxuICAgICAgLy8gRGV2b2x2ZXIgZWwgcHJvbWlzZVxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgdW4gbW9kZWxvIHBhcmEgZ3VhcmRhciBsYXMgdmVyc2lvbmVzIGRlbCBtb2RlbG8gYWN0dWFsXHJcbiAgICBNb2RlbC52ZXJzaW9uaW5nID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgY2IpIHtcclxuICAgICAgaWYgKHR5cGVvZiBtb2RlbE5hbWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjYiA9IG1vZGVsTmFtZTtcclxuICAgICAgICBtb2RlbE5hbWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoW21vZGVsTmFtZSwgY2JdLCBbWydzdHJpbmcnLCAndW5kZWZpbmVkJ10sIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGlmICghJHZlcnNpb25pbmcpIHtcclxuXHJcbiAgICAgICAgLy8gU2kgZWwgbW9kZWwgbm8gdGllbmUgbm9tYnJlIHNlIGFncmVnYVxyXG4gICAgICAgIGlmICghbW9kZWxOYW1lKXtcclxuICAgICAgICAgIG1vZGVsTmFtZSA9ICRtb2RlbE5hbWUrJ192ZXJzaW9uaW5nJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENyZWFyIG1vZGVsbyBwYXJhIGVsIG1hbmVqbyBkZSBkYXRvc1xyXG4gICAgICAgICR2ZXJzaW9uaW5nID0gJGRiLm1vZGVsKG1vZGVsTmFtZSlcclxuICAgICAgICAgIC5hdXRvSW5jcmVtZW50KGZhbHNlKVxyXG4gICAgICAgICAgLmtleVBhdGgoJGlkLmtleVBhdGgpXHJcbiAgICAgICAgICAuZmllbGRzKHtcclxuICAgICAgICAgICAgXCJoYXNoXCI6IHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9LFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2IpIGNiKCR2ZXJzaW9uaW5nKTtcclxuXHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZSBsYSB2ZXJzaW9uIGxvY2FsIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwuZ2V0VmVyc2lvbk9mID0gZnVuY3Rpb24gKGtleSkgeyBcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgaWYgKCR2ZXJzaW9uaW5nKSB7XHJcbiAgICAgICAgJHZlcnNpb25pbmcuZ2V0KGtleSkuJHByb21pc2VcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZSh2ZXJzaW9uKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkZWZlcmVkLnJlamVjdChudWxsKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRlZmVyZWQucmVzb2x2ZShudWxsKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZ3JlZ2EgdW4gbWFuZGVqYWRvciBkZSBldmVudG9zIGFsIG1vZGVsb1xyXG4gICAgTW9kZWwuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGlmICghJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xyXG5cclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGlzcGFyYSB1biBldmVudG8gZGVsIG1vZGVsXHJcbiAgICBNb2RlbC5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnYXJyYXknXV0pO1xyXG5cclxuICAgICAgaWYgKCRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ubWFwKGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgY2IuYXBwbHkoTW9kZWwsIGFyZ3MgfHwgW10pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXHJcbiAgICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0ID0gZnVuY3Rpb24gKGZpZWxkKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKHRoaXMsIGZpZWxkKTtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBBc2lnbmEgaW4gdmFsb3IgYSB1biBjYW1wb1xyXG4gICAgICBNb2RlbC5wcm90b3R5cGUuJHNldCA9IGZ1bmN0aW9uIChmaWVsZCwgdmFsdWUpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQsIHZhbHVlKTtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBEZXZ1ZWx2ZSB1biBvYmpldG8gY29uIGxhcyBwcm9waWVkYWRlcyBkZWwgcmVnaXN0cm9cclxuICAgICAgTW9kZWwucHJvdG90eXBlLiRnZXRWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHt9O1xyXG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHRoaXM7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKCRmaWVsZHMpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICAgIHNldEZpZWxkVmFsdWUodmFsdWVzLCBmaWVsZCwgZ2V0RmllbGRWYWx1ZShkYXRhLCBmaWVsZCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdmFsdWVzO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSB1biBvYmpldG8gY29uIGxhcyBwcm9waWVkYWRlcyBsb2NhbGVzIGRlbCByZWdpc3Ryb1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRnZXRMb2NhbFZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kbG9jYWxWYWx1ZXMpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgdW4gbW9kZWxvIGNvbiBsYXMgcHJvcGllZGFkZXMgcmVtb3RhcyBkZWwgcmVnaXN0cm9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0UmVtb3RlVmFsdWVzID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuJGdldFZhbHVlcyh0aGlzLiRyZW1vdGVWYWx1ZXMpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGxhcyBwcm9waWVkYWRlcyBkZWwgcmVnaXN0cm9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0VmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xyXG4gICAgICBcclxuICAgICAgdGhpei4kdmVyc2lvbiA9IHZlcnNpb247XHJcblxyXG4gICAgICBPYmplY3Qua2V5cyhkYXRhKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXouJGxvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBsYXMgcHJvcGllZGFkZXMgbG9jYWxlcyBkZWwgcmVnaXN0cm9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0TG9jYWxWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSwgdmVyc2lvbikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XHJcbiAgICAgIFxyXG4gICAgICB0aGl6LiRsb2NhbFZlcnNpb24gPSB2ZXJzaW9uO1xyXG5cclxuICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICAgIHNldEZpZWxkVmFsdWUodGhpei4kbG9jYWxWYWx1ZXMsIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICB0aGl6LiRsb2NhbExvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKCF0aGl6LiRsb2FkZWQpIHtcclxuICAgICAgICAgIHRoaXouJHNldFZhbHVlcyhkYXRhLCB2ZXJzaW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBsYXMgcHJvcGllZGFkZXMgcmVtb3RhcyBkZWwgcmVnaXN0cm9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0UmVtb3RlVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xyXG4gICAgICBcclxuICAgICAgdGhpei4kcmVtb3RlVmVyc2lvbiA9IHZlcnNpb247XHJcblxyXG4gICAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRyZW1vdGVWYWx1ZXMsIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICB0aGl6LiRyZW1vdGVMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICghdGhpei4kbG9hZGVkKSB7XHJcbiAgICAgICAgICB0aGl6LiRzZXRWYWx1ZXMoZGF0YSwgdmVyc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBlbCBJRCBkZWwgb2JqZXRvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJHNldEtleSA9IGZ1bmN0aW9uIChuZXdLZXkpIHtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IG9sZEtleSA9IE1vZGVsLmdldEtleUZyb20odGhpcyk7XHJcblxyXG4gICAgICBNb2RlbC5zZWFyY2hEZWVwRmllbGQodGhpcywgJGlkLmtleVBhdGgsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgICAgIG9ialtsYXN0RmllbGRdID0gbmV3S2V5O1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChvbGRLZXkgIT09IG5ld0tleSkge1xyXG5cclxuICAgICAgICBpZiAob2xkS2V5ICYmICRpbnN0YW5jZXNbb2xkS2V5XSAmJiAkaW5zdGFuY2VzW29sZEtleV0gIT0gdGhpcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5JbnN0YW5jZU9mT2xkS2V5SXNOb3RTYW1lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXdLZXkgJiYgJGluc3RhbmNlc1tuZXdLZXldICYmICRpbnN0YW5jZXNbbmV3S2V5XSAhPSB0aGlzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkluc3RhbmNlT2ZOZXdLZXlJc05vdFNhbWUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEVsaW1pbmFyIGFudGVyaW9yXHJcbiAgICAgICAgaWYgKG9sZEtleSAmJiAkaW5zdGFuY2VzW29sZEtleV0pIHtcclxuICAgICAgICAgIGRlbGV0ZSAkaW5zdGFuY2VzW29sZEtleV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZ3JlZ2FyIG51ZXZhXHJcbiAgICAgICAgaWYgKG5ld0tleSAmJiAhJGluc3RhbmNlc1tuZXdLZXldKSB7XHJcbiAgICAgICAgICAkaW5zdGFuY2VzW25ld0tleV0gPSB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyBDb25zdHVyY3RvciBxdWUgc2UgcHVlZGUgc29icmUgZXNjcmliaXJcclxuICAgIE1vZGVsLnByb3RvdHlwZS4kY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBHdWFyZGEgbG9zIGRhdG9zIGRlbCBvYmpldG9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kcHVsbCA9IGZ1bmN0aW9uIChuZXdWYWx1ZXMsIHZlcnNpb24peyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuXHJcbiAgICAgIGlmIChuZXdWYWx1ZXMpIHtcclxuICAgICAgICBuZXdWYWx1ZXMgPSB0aGl6LiRnZXRWYWx1ZXMobmV3VmFsdWVzKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdWYWx1ZXMgPSB0aGl6LiRnZXRSZW1vdGVWYWx1ZXMoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbmV3S2V5ID0gTW9kZWwuZ2V0S2V5RnJvbShuZXdWYWx1ZXMpO1xyXG4gICAgICBjb25zdCBvbGRWYWx1ZXMgPSB0aGl6LiRnZXRMb2NhbFZhbHVlcygpO1xyXG4gICAgICBjb25zdCBvbGRLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKG9sZFZhbHVlcyk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhuZXdLZXksIG9sZEtleSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKG5ld1ZhbHVlcywgb2xkVmFsdWVzKTtcclxuXHJcbiAgICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRnVuY2lvbiBxdWUgaGFjZSBlc2N1Y2hhcnMgbG9zIG1lbnNhamVzIGRlbCBzb2NrZXQgcGFyYSBlbCBtb2RlbFxyXG4gICAgICBNb2RlbC5wcm90b3R5cGUuJGxpc3RlbiA9IGZ1bmN0aW9uICgpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCEkc29ja2V0KSB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkRvZXNOb3RIYXZlU29ja2V0SW5zdGFuY2UnKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXIgdW5hIHN1YnNjcmlwY2lvbiBhbCBzb2NrZXQgcGFyYSBjdWFuZG8gc2UgcmVjaWJhbiBkYXRvc1xyXG4gICAgICAgIC8vIHBhcmEgbGEgaW5zdGFuY2lhIGFjdHVhbFxyXG4gICAgICAgICRzb2NrZXQuc3Vic2NyaWJlKHtcclxuICAgICAgICAgIG1vZGVsTmFtZTogJG1vZGVsTmFtZSxcclxuICAgICAgICAgIGV2ZW50TmFtZTogJ3VwZGF0ZScsXHJcbiAgICAgICAgICBtb2RlbElkOiB0aGl6LiRnZXQoJGlkLmtleVBhdGgpLFxyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgLy8gQSByZWNpYmlyIGRhdG9zIGRlbCBzb2NrZXQgYXNpZ25hciBsb3MgdmFsb3Jlc1xyXG4gICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBFbWl0aXIgZXZlbnRvIGRlIGRhdG9zIHJlY2liaWRvciBwYXJhIGVsIG1vZGVsb1xyXG4gICAgICAgICAgICB0aGl6LiRzZXRSZW1vdGVWYWx1ZXMoZGF0YS52YWx1ZXMsIGRhdGEudmVyc2lvbik7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBtYW5kZWphZG9yIGRlIGV2ZW50b3NcclxuICAgIE1vZGVsLnByb3RvdHlwZS4kYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGlmICghdGhpcy4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSkge1xyXG4gICAgICAgIHRoaXMuJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEaXNwYXJhIHVuIGV2ZW50b1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRlbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsndW5kZWZpbmVkJywgJ2FycmF5J11dKTtcclxuXHJcbiAgICAgIC8vIExsYW1hciBlbCBldmVudG8gcGFyYSBlbCBtb2RlbG9cclxuICAgICAgTW9kZWwuZW1pdChldmVudE5hbWUsIFt0aGl6LCBbXS5jb25jYXQoW3RoaXpdKS5jb25jYXQoYXJncyldKTtcclxuXHJcbiAgICAgIGlmICh0aGl6LiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgdGhpei4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5tYXAoZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgICBjYi5hcHBseSh0aGl6LCBhcmdzIHx8IFtdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBNb2RlbC4kaW5zdGFuY2VzID0gJGluc3RhbmNlcztcclxuXHJcbiAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gIH07XHJcblxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJNb2RlbFNlcnZpY2U7XG5mdW5jdGlvbiBpZGJNb2RlbFNlcnZpY2UoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJRdWVyeSwgaWRiRXZlbnRzLCBsYlJlc291cmNlLCAkdGltZW91dCkge1xuICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgLy8gQnVzY2FyIHVuIGNhbXBvXG5cbiAgICAgIHZhciBzZWFyY2hEZWVwRmllbGQgPSBmdW5jdGlvbiBzZWFyY2hEZWVwRmllbGQob2JqLCBmaWVsZCwgY2IpIHtcbiAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICAgICAgICB2YXIgZmllbGRzID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIHZhciBsYXN0RmllbGQgPSBmaWVsZHMucG9wKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBfc2V0KG9iaikge1xuICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMCkgcmV0dXJuIGNiKG9iaiwgbGFzdEZpZWxkKTtcbiAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAndW5kZWZpbmVkJykgb2JqW2ZpZWxkXSA9IHt9O1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XG4gICAgICAgICAgICB9KG9iaik7XG4gICAgICB9O1xuXG4gICAgICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cbiAgICAgIHZhciBnZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gZ2V0RmllbGRWYWx1ZShvYmosIGZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VhcmNoRGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xuICAgICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cbiAgICAgIHZhciBzZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gc2V0RmllbGRWYWx1ZShvYmosIGZpZWxkLCB2YWx1ZSkge1xuICAgICAgICAgICAgc2VhcmNoRGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICAgICAgICAgICAgb2JqW2xhc3RGaWVsZF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpZGJNb2RlbCgkZGIsICRtb2RlbE5hbWUsICRzb2NrZXQpIHtcbiAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW251bGwsICdzdHJpbmcnXSk7XG5cbiAgICAgICAgICAgIC8vIENsYXZlIGRlbCBtb2RlbG9cbiAgICAgICAgICAgIHZhciAkaWQgPSB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfTtcbiAgICAgICAgICAgIHZhciAkZXZlbnRzSGFuZGxlcnMgPSB7fTtcbiAgICAgICAgICAgIHZhciAkaW5zdGFuY2VzID0ge307XG4gICAgICAgICAgICB2YXIgJGZpZWxkcyA9IHt9O1xuICAgICAgICAgICAgdmFyICRyZW1vdGUgPSBudWxsO1xuICAgICAgICAgICAgdmFyICR2ZXJzaW9uaW5nID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gQ29uc3R1Y3RvciBkZWwgbW9kZWxvXG4gICAgICAgICAgICBmdW5jdGlvbiBNb2RlbChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRsb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHRoaXouJGxvY2FsTG9hZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB0aGl6LiRyZW1vdGVMb2FkZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgdGhpei4kbG9jYWxWYWx1ZXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgIHRoaXouJHJlbW90ZVZhbHVlcyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiR2ZXJzaW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgIHRoaXouJGxvY2FsVmVyc2lvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICB0aGl6LiRyZW1vdGVWZXJzaW9uID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgdGhpei4kZXZlbnRzSGFuZGxlcnMgPSB7fTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXouJHNldFZhbHVlcyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgdGhpei4kY29uc3RydWN0b3IoZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICgkc29ja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGl6LiRsaXN0ZW4oKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgdmFyICRyZXN1bHRzID0gW107XG5cbiAgICAgICAgICAgICAgICAgIHRoaXpcblxuICAgICAgICAgICAgICAgICAgLy8gQ3VhbmRvIHNlYSBjb25zdWx0YWRvIGFncmVnYXIgbGEgY29uc3VsdGFcbiAgICAgICAgICAgICAgICAgIC4kYmluZChpZGJFdmVudHMuTU9ERUxfUVVFUklFRCwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgLy8gQ3VhbmRvIHNlYSBsaWJlcmFkbyBkZSBsYSBjb25zdWx0YXIgcXVpdGFyIGRlIGxhcyBjb25zdWx0YXNcbiAgICAgICAgICAgICAgICAgIC4kYmluZChpZGJFdmVudHMuTU9ERUxfVU5RVUVSSUVELCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWR4ID0gJHJlc3VsdHMuaW5kZXhPZihyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAvLyBFdmVudG8gZGUgcXVlIG1vZGVsbyBlc3TDoSBpbnN0YW5jaWFkb1xuICAgICAgICAgICAgICAgICAgLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9JTlNUQU5DRUQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdiBlbCBub21icmUgZGVsIG1vZGVsb1xuICAgICAgICAgICAgTW9kZWwuZ2V0TW9kZWxOYW1lID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gJG1vZGVsTmFtZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cbiAgICAgICAgICAgIE1vZGVsLmF1dG9JbmNyZW1lbnQgPSBmdW5jdGlvbiAoYXV0b0luY3JlbWVudCkge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Jvb2xlYW4nXSk7XG5cbiAgICAgICAgICAgICAgICAgICRpZC5hdXRvSW5jcmVtZW50ID0gYXV0b0luY3JlbWVudDtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBNb2RlbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cbiAgICAgICAgICAgIE1vZGVsLmtleVBhdGggPSBmdW5jdGlvbiAoa2V5UGF0aCkge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZyddKTtcblxuICAgICAgICAgICAgICAgICAgJGlkLmtleVBhdGggPSBrZXlQYXRoO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQ3JlYSBlbCBvYmplY3RvIHN0b3JhZ2UgcGFyYSBlbCBtb2RlbG8uXG4gICAgICAgICAgICBNb2RlbC5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgJGRiLmNyZWF0ZVN0b3JlKCRtb2RlbE5hbWUsICRpZCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBZ3JlZ2EgdW4gaW5kZXhcbiAgICAgICAgICAgIE1vZGVsLmluZGV4ID0gZnVuY3Rpb24gKGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XG5cbiAgICAgICAgICAgICAgICAgICRkYi5jcmVhdGVJbmRleCgkbW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBNw6l0b2RvIHF1ZSBwZXJtaXRlIG1vZGlmaWNhciBtb2RlbC5cbiAgICAgICAgICAgIE1vZGVsLmJ1aWxkID0gZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcblxuICAgICAgICAgICAgICAgICAgYnVpbGRDYWxsYmFjayhNb2RlbCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBc2lnbmEgbGEgZXNwZWNpZmljYWNpw7NuIGRlIGxvcyBjYW1wb3NcbiAgICAgICAgICAgIE1vZGVsLmZpZWxkcyA9IGZ1bmN0aW9uIChmaWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnXSk7XG5cbiAgICAgICAgICAgICAgICAgICRmaWVsZHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICRmaWVsZHNbJGlkLmtleVBhdGhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCI6IHRydWVcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IGZpZWxkc1tmaWVsZE5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZHNbZmllbGROYW1lXSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQgPSB7IFwidHlwZVwiOiBmaWVsZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgJGZpZWxkc1tmaWVsZE5hbWVdID0gZmllbGQ7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGk7XG4gICAgICAgICAgICBNb2RlbC5yZW1vdGUgPSBmdW5jdGlvbiAodXJsLCBhcmdzLCBhY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCcsICdvYmplY3QnXSk7XG5cbiAgICAgICAgICAgICAgICAgICRyZW1vdGUgPSBsYlJlc291cmNlKHVybCwgYXJncywgYWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGVsICRyZW1vdGUgZGVsIG1vZGVsb1xuICAgICAgICAgICAgTW9kZWwuZ2V0UmVtb3RlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gJHJlbW90ZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGNvcnJlc3BvbmRpZW50ZSBhbCBrZXkgZGUgdW4gb2JqZXRvXG4gICAgICAgICAgICBNb2RlbC5nZXRLZXlGcm9tID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsICRpZC5rZXlQYXRoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgbW9kZWwgZGUgbGFzIGd1YXJkYWRhcy4gU2kgbm8gZXhpc3RlIGVudG9uY2VcbiAgICAgICAgICAgIC8vIHNlIGNyZWFcbiAgICAgICAgICAgIE1vZGVsLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydzdHJpbmcnLCAnbnVtYmVyJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIC8vIEVsIG9iamV0byBubyB0aWVuZSBJRFxuICAgICAgICAgICAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTW9kZWwoKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgLy8gTm8gZXhpc3RlIGxhIGluc3RhbmNpYSBlbnRvbmNlIHNlIGNyZWFcbiAgICAgICAgICAgICAgICAgIGlmICghJGluc3RhbmNlc1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5zdGFuY2VzW2tleV0gPSBuZXcgTW9kZWwoKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgcmV0dXJuICRpbnN0YW5jZXNba2V5XTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEJ1c2NhIHVuIHJlZ2lzdHJvIGVuIGxhIG9iamVjdFN0b3JlIGRlbCBtb2RlbG8uXG4gICAgICAgICAgICBNb2RlbC5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG5cbiAgICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IE1vZGVsLmdldEluc3RhbmNlKGtleSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS4kbG9jYWxMb2FkZWQpIHJldHVybiBpbnN0YW5jZTtcblxuICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAgICAgICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIGluc3RhbmNlLiRwcm9taXNlID0gZGVmZXJlZC5wcm9taXNlO1xuXG4gICAgICAgICAgICAgICAgICAkZGIuZ2V0KCRtb2RlbE5hbWUsIGtleSkucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RlbC5nZXRWZXJzaW9uT2Yoa2V5KS5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLiRzZXRMb2NhbFZhbHVlcyhkYXRhLCBkYXRhICYmIHZlcnNpb24gPyB2ZXJzaW9uLmhhc2ggOiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbG9nLmVycm9yKFsnTW9kZWwuZ2V0VmVyc2lvbk9mIGFueSBlcnJvcicsIGVycl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cbiAgICAgICAgICAgIE1vZGVsLmZpbmQgPSBmdW5jdGlvbiAoZmlsdGVycykge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGlkYlF1ZXJ5KCRkYiwgTW9kZWwsIGZpbHRlcnMpOztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIENyZWEgbnVldmFzIGluc3RhbmNpYXMgZGUgbG9zIG1vZGVsb3NcbiAgICAgICAgICAgIE1vZGVsLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICAvLyBTaSBlcyB1biBhcnJheVxuICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWNvcmQgPSBNb2RlbC5nZXRJbnN0YW5jZShNb2RlbC5nZXRLZXlGcm9tKGRhdGEpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29yZC4kbG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkNhbnRDcmVhdGVkTG9hZGVkSW5zdGFuY2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlY29yZC4kcHVsbCgpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAvLyBPYnRlbmVyIHVuYSBjb3BpYSBkZWwgYXJyYXlcbiAgICAgICAgICAgICAgICAgIHZhciBhcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhKTtcbiAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoY2IpO1xuXG4gICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gaXRlcmF0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBObyBxdWVkYW4gZWxlbWVudG9zIGVuIGVsIGFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PSAwKSByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWFyIGVsIHNpZ3VpZW50ZSBlbGVtZW50b1xuICAgICAgICAgICAgICAgICAgICAgICAgTW9kZWwuY3JlYXRlKGFyci5zaGlmdCgpKS50aGVuKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgICAgICAgICAvLyBEZXZvbHZlciBlbCBwcm9taXNlXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIENyZWEgdW4gbW9kZWxvIHBhcmEgZ3VhcmRhciBsYXMgdmVyc2lvbmVzIGRlbCBtb2RlbG8gYWN0dWFsXG4gICAgICAgICAgICBNb2RlbC52ZXJzaW9uaW5nID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgY2IpIHtcbiAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbW9kZWxOYW1lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYiA9IG1vZGVsTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKFttb2RlbE5hbWUsIGNiXSwgW1snc3RyaW5nJywgJ3VuZGVmaW5lZCddLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICghJHZlcnNpb25pbmcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2kgZWwgbW9kZWwgbm8gdGllbmUgbm9tYnJlIHNlIGFncmVnYVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtb2RlbE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsTmFtZSA9ICRtb2RlbE5hbWUgKyAnX3ZlcnNpb25pbmcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhciBtb2RlbG8gcGFyYSBlbCBtYW5lam8gZGUgZGF0b3NcbiAgICAgICAgICAgICAgICAgICAgICAgICR2ZXJzaW9uaW5nID0gJGRiLm1vZGVsKG1vZGVsTmFtZSkuYXV0b0luY3JlbWVudChmYWxzZSkua2V5UGF0aCgkaWQua2V5UGF0aCkuZmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGFzaFwiOiB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmIChjYikgY2IoJHZlcnNpb25pbmcpO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gTW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGUgbGEgdmVyc2lvbiBsb2NhbCBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLmdldFZlcnNpb25PZiA9IGZ1bmN0aW9uIChrZXkpIHtcblxuICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoJHZlcnNpb25pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICR2ZXJzaW9uaW5nLmdldChrZXkpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZSh2ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFncmVnYSB1biBtYW5kZWphZG9yIGRlIGV2ZW50b3MgYWwgbW9kZWxvXG4gICAgICAgICAgICBNb2RlbC5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCEkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGlzcGFyYSB1biBldmVudG8gZGVsIG1vZGVsXG4gICAgICAgICAgICBNb2RlbC5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsndW5kZWZpbmVkJywgJ2FycmF5J11dKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5tYXAoZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYi5hcHBseShNb2RlbCwgYXJncyB8fCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRnZXQgPSBmdW5jdGlvbiAoZmllbGQpIHtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0ID0gZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCwgdmFsdWUpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgdW4gb2JqZXRvIGNvbiBsYXMgcHJvcGllZGFkZXMgZGVsIHJlZ2lzdHJvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJGdldFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0ge307XG4gICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YSB8fCB0aGlzO1xuXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cygkZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGaWVsZFZhbHVlKHZhbHVlcywgZmllbGQsIGdldEZpZWxkVmFsdWUoZGF0YSwgZmllbGQpKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgdW4gb2JqZXRvIGNvbiBsYXMgcHJvcGllZGFkZXMgbG9jYWxlcyBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0TG9jYWxWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kbG9jYWxWYWx1ZXMpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV2dWVsdmUgdW4gbW9kZWxvIGNvbiBsYXMgcHJvcGllZGFkZXMgcmVtb3RhcyBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0UmVtb3RlVmFsdWVzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kZ2V0VmFsdWVzKHRoaXMuJHJlbW90ZVZhbHVlcyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIGRlbCByZWdpc3Ryb1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRzZXRWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSwgdmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXouJHZlcnNpb24gPSB2ZXJzaW9uO1xuXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXosIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgdGhpei4kbG9hZGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIGxvY2FsZXMgZGVsIHJlZ2lzdHJvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJHNldExvY2FsVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRsb2NhbFZlcnNpb24gPSB2ZXJzaW9uO1xuXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJGxvY2FsVmFsdWVzLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGl6LiRsb2NhbExvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXouJGxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpei4kc2V0VmFsdWVzKGRhdGEsIHZlcnNpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBsYXMgcHJvcGllZGFkZXMgcmVtb3RhcyBkZWwgcmVnaXN0cm9cbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0UmVtb3RlVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICB0aGl6LiRyZW1vdGVWZXJzaW9uID0gdmVyc2lvbjtcblxuICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRyZW1vdGVWYWx1ZXMsIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXouJHJlbW90ZUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXouJGxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpei4kc2V0VmFsdWVzKGRhdGEsIHZlcnNpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFzaWduYSBlbCBJRCBkZWwgb2JqZXRvXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJHNldEtleSA9IGZ1bmN0aW9uIChuZXdLZXkpIHtcblxuICAgICAgICAgICAgICAgICAgdmFyIG9sZEtleSA9IE1vZGVsLmdldEtleUZyb20odGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGlzLCAkaWQua2V5UGF0aCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IG5ld0tleTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAob2xkS2V5ICE9PSBuZXdLZXkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZEtleSAmJiAkaW5zdGFuY2VzW29sZEtleV0gJiYgJGluc3RhbmNlc1tvbGRLZXldICE9IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk9sZEtleUlzTm90U2FtZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0tleSAmJiAkaW5zdGFuY2VzW25ld0tleV0gJiYgJGluc3RhbmNlc1tuZXdLZXldICE9IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk5ld0tleUlzTm90U2FtZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFbGltaW5hciBhbnRlcmlvclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZEtleSAmJiAkaW5zdGFuY2VzW29sZEtleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSAkaW5zdGFuY2VzW29sZEtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFncmVnYXIgbnVldmFcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdLZXkgJiYgISRpbnN0YW5jZXNbbmV3S2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGluc3RhbmNlc1tuZXdLZXldID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDb25zdHVyY3RvciBxdWUgc2UgcHVlZGUgc29icmUgZXNjcmliaXJcbiAgICAgICAgICAgIE1vZGVsLnByb3RvdHlwZS4kY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZGF0YSkge307XG5cbiAgICAgICAgICAgIC8vIEd1YXJkYSBsb3MgZGF0b3MgZGVsIG9iamV0b1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRwdWxsID0gZnVuY3Rpb24gKG5ld1ZhbHVlcywgdmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVzID0gdGhpei4kZ2V0VmFsdWVzKG5ld1ZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVzID0gdGhpei4kZ2V0UmVtb3RlVmFsdWVzKCk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHZhciBuZXdLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKG5ld1ZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICB2YXIgb2xkVmFsdWVzID0gdGhpei4kZ2V0TG9jYWxWYWx1ZXMoKTtcbiAgICAgICAgICAgICAgICAgIHZhciBvbGRLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKG9sZFZhbHVlcyk7XG5cbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0tleSwgb2xkS2V5KTtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1ZhbHVlcywgb2xkVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBGdW5jaW9uIHF1ZSBoYWNlIGVzY3VjaGFycyBsb3MgbWVuc2FqZXMgZGVsIHNvY2tldCBwYXJhIGVsIG1vZGVsXG4gICAgICAgICAgICBNb2RlbC5wcm90b3R5cGUuJGxpc3RlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgIGlmICghJHNvY2tldCkgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5Eb2VzTm90SGF2ZVNvY2tldEluc3RhbmNlJyk7XG5cbiAgICAgICAgICAgICAgICAgIC8vIENyZWFyIHVuYSBzdWJzY3JpcGNpb24gYWwgc29ja2V0IHBhcmEgY3VhbmRvIHNlIHJlY2liYW4gZGF0b3NcbiAgICAgICAgICAgICAgICAgIC8vIHBhcmEgbGEgaW5zdGFuY2lhIGFjdHVhbFxuICAgICAgICAgICAgICAgICAgJHNvY2tldC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxOYW1lOiAkbW9kZWxOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiAndXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsSWQ6IHRoaXouJGdldCgkaWQua2V5UGF0aClcbiAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgcmVjaWJpciBkYXRvcyBkZWwgc29ja2V0IGFzaWduYXIgbG9zIHZhbG9yZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVtaXRpciBldmVudG8gZGUgZGF0b3MgcmVjaWJpZG9yIHBhcmEgZWwgbW9kZWxvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGl6LiRzZXRSZW1vdGVWYWx1ZXMoZGF0YS52YWx1ZXMsIGRhdGEudmVyc2lvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQWdyZWdhIHVuIG1hbmRlamFkb3IgZGUgZXZlbnRvc1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRiaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdID0gW107XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHRoaXMuJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEaXNwYXJhIHVuIGV2ZW50b1xuICAgICAgICAgICAgTW9kZWwucHJvdG90eXBlLiRlbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsndW5kZWZpbmVkJywgJ2FycmF5J11dKTtcblxuICAgICAgICAgICAgICAgICAgLy8gTGxhbWFyIGVsIGV2ZW50byBwYXJhIGVsIG1vZGVsb1xuICAgICAgICAgICAgICAgICAgTW9kZWwuZW1pdChldmVudE5hbWUsIFt0aGl6LCBbXS5jb25jYXQoW3RoaXpdKS5jb25jYXQoYXJncyldKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKHRoaXouJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXouJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ubWFwKGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IuYXBwbHkodGhpeiwgYXJncyB8fCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBNb2RlbC4kaW5zdGFuY2VzID0gJGluc3RhbmNlcztcblxuICAgICAgICAgICAgcmV0dXJuIE1vZGVsO1xuICAgICAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJRdWVyeSAoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJFdmVudHMpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gZnVuY3Rpb24gaWRiUXVlcnkoJGRiLCAkTW9kZWwsICRmaWx0ZXJzKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdmdW5jdGlvbicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgbGV0ICRyZXN1bHQgPSBudWxsO1xyXG5cclxuICAgIC8vIEZ1bmNpb24gcXVlIGRldnVlbHZlIGVqZWN1dGEgZWwgcXVlcnkgeSBkZXZ1ZWx2ZSBlbCByZXN1bHRhZG8uXHJcbiAgICB0aGl6LmdldFJlc3VsdCA9IGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgLy8gRWplY3V0YXIgc2kgbm8gc2UgaGEgZWplY3V0YWRvXHJcbiAgICAgIGlmICghJHJlc3VsdCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG4gICAgICAgICRyZXN1bHQgPSBbXTtcclxuICAgICAgICAkcmVzdWx0LiRyZXNvbHZlZCA9IGZhbHNlO1xyXG4gICAgICAgICRyZXN1bHQuJHByb21pc2UgPSBkZWZlcmVkLnByb21pc2U7XHJcblxyXG4gICAgICAgICRkYi5vcGVuQ3Vyc29yKCRNb2RlbC5nZXRNb2RlbE5hbWUoKSwgJGZpbHRlcnMsIGZ1bmN0aW9uIChkYXRhLCBuZXh0KSB7XHJcblxyXG4gICAgICAgICAgY29uc3Qga2V5ID0gJE1vZGVsLmdldEtleUZyb20oZGF0YSk7XHJcblxyXG4gICAgICAgICAgLy8gT2J0ZW5lciBsYSBpbnN0YW5jaWFcclxuICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gJE1vZGVsLmdldEluc3RhbmNlKGtleSk7XHJcblxyXG4gICAgICAgICAgaWYgKGluc3RhbmNlLiRsb2NhbExvYWRlZCkgcmV0dXJuIG5leHQoKTtcclxuXHJcbiAgICAgICAgICAkTW9kZWwuZ2V0VmVyc2lvbk9mKGtleSkucHJvbWlzZVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodmVyc2lvbikge1xyXG5cclxuICAgICAgICAgICAgICBpbnN0YW5jZS4kc2V0TG9jYWxWYWx1ZXMoZGF0YSwgZGF0YSAmJiB2ZXJzaW9uPyB2ZXJzaW9uLmhhc2ggOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgaW5zdGFuY2UuJGVtaXQoaWRiRXZlbnRzLk1PREVMX1FVRVJJRUQsIFskcmVzdWx0XSk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIEFncmVnYXIgYWwgcmVzdWx0YWRvXHJcbiAgICAgICAgICAgICAgJHJlc3VsdC5wdXNoKGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gQnVzY2FyIHNpZ3VpZW50ZVxyXG4gICAgICAgICAgICAgIG5leHQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcblxyXG4gICAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgJGxvZy5lcnJvcihbJ01vZGVsLmdldFZlcnNpb25PZiBhbnkgZXJyb3InLCBlcnJdKVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pLnByb21pc2VcclxuXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICRyZXN1bHQuJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZSgkcmVzdWx0KTtcclxuICAgICAgICAgIHRoaXouZ2V0UmVtb3RlUmVzdWx0KCk7XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcblxyXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gJHJlc3VsdDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE9idGllbmUgZWwgcmVzdWx0YWRvIGRlIHZhbG9yZXMgcmVtb3Rvc1xyXG4gICAgdGhpei5nZXRSZW1vdGVSZXN1bHQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICBsZXQgJHJlbW90ZSA9ICRNb2RlbC5nZXRSZW1vdGUoKTtcclxuICAgICAgbGV0ICRyZW1vdGVSZXN1bHQgPSBudWxsO1xyXG5cclxuICAgICAgaWYgKCRyZW1vdGUgJiYgdHlwZW9mICRyZW1vdGUuZmluZCA9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgKCRyZW1vdGVSZXN1bHQgPSAkcmVtb3RlLmZpbmQoJGZpbHRlcnMpLiRwcm9taXNlKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXN1bHQubWFwKGZ1bmN0aW9uIChyZWNvcmQsIGkpIHtcclxuICAgICAgICAgICAgICAkTW9kZWwuZ2V0KCRNb2RlbC5nZXRLZXlGcm9tKHJlY29yZC52YWx1ZXMpKS4kcHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCRyZWNvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgJHJlY29yZC4kc2V0UmVtb3RlVmFsdWVzKHJlY29yZC52YWx1ZXMsIHJlY29yZC52ZXJzaW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmICgkcmVzdWx0W2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRyZXN1bHRbaV0gIT09ICRyZWNvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRbaV0uJGVtaXQoaWRiRXZlbnRzLk1PREVMX1VOUVVFUklFRCwgWyRyZXN1bHRdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgJHJlc3VsdFtpXSA9ICRyZWNvcmQ7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHJlc3VsdC5wdXNoKCRyZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAkcmVjb3JkLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9RVUVSSUVELCBbJHJlc3VsdF0pO1xyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gJHJlbW90ZVJlc3VsdDtcclxuXHJcbiAgICB9O1xyXG5cclxuICB9XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaWRiUXVlcnk7XG5mdW5jdGlvbiBpZGJRdWVyeSgkbG9nLCBxcywgaWRiVXRpbHMsIGlkYkV2ZW50cykge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBmdW5jdGlvbiBpZGJRdWVyeSgkZGIsICRNb2RlbCwgJGZpbHRlcnMpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdmdW5jdGlvbicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICB2YXIgJHJlc3VsdCA9IG51bGw7XG5cbiAgICAvLyBGdW5jaW9uIHF1ZSBkZXZ1ZWx2ZSBlamVjdXRhIGVsIHF1ZXJ5IHkgZGV2dWVsdmUgZWwgcmVzdWx0YWRvLlxuICAgIHRoaXouZ2V0UmVzdWx0ID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIC8vIEVqZWN1dGFyIHNpIG5vIHNlIGhhIGVqZWN1dGFkb1xuICAgICAgaWYgKCEkcmVzdWx0KSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgICAgICAgJHJlc3VsdCA9IFtdO1xuICAgICAgICAgICRyZXN1bHQuJHJlc29sdmVkID0gZmFsc2U7XG4gICAgICAgICAgJHJlc3VsdC4kcHJvbWlzZSA9IGRlZmVyZWQucHJvbWlzZTtcblxuICAgICAgICAgICRkYi5vcGVuQ3Vyc29yKCRNb2RlbC5nZXRNb2RlbE5hbWUoKSwgJGZpbHRlcnMsIGZ1bmN0aW9uIChkYXRhLCBuZXh0KSB7XG5cbiAgICAgICAgICAgIHZhciBrZXkgPSAkTW9kZWwuZ2V0S2V5RnJvbShkYXRhKTtcblxuICAgICAgICAgICAgLy8gT2J0ZW5lciBsYSBpbnN0YW5jaWFcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9ICRNb2RlbC5nZXRJbnN0YW5jZShrZXkpO1xuXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UuJGxvY2FsTG9hZGVkKSByZXR1cm4gbmV4dCgpO1xuXG4gICAgICAgICAgICAkTW9kZWwuZ2V0VmVyc2lvbk9mKGtleSkucHJvbWlzZS50aGVuKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG5cbiAgICAgICAgICAgICAgaW5zdGFuY2UuJHNldExvY2FsVmFsdWVzKGRhdGEsIGRhdGEgJiYgdmVyc2lvbiA/IHZlcnNpb24uaGFzaCA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGluc3RhbmNlLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9RVUVSSUVELCBbJHJlc3VsdF0pO1xuXG4gICAgICAgICAgICAgIC8vIEFncmVnYXIgYWwgcmVzdWx0YWRvXG4gICAgICAgICAgICAgICRyZXN1bHQucHVzaChpbnN0YW5jZSk7XG5cbiAgICAgICAgICAgICAgLy8gQnVzY2FyIHNpZ3VpZW50ZVxuICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgJGxvZy5lcnJvcihbJ01vZGVsLmdldFZlcnNpb25PZiBhbnkgZXJyb3InLCBlcnJdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pLnByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICRyZXN1bHQuJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZSgkcmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXouZ2V0UmVtb3RlUmVzdWx0KCk7XG4gICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXG4gICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJHJlc3VsdDtcbiAgICB9O1xuXG4gICAgLy8gT2J0aWVuZSBlbCByZXN1bHRhZG8gZGUgdmFsb3JlcyByZW1vdG9zXG4gICAgdGhpei5nZXRSZW1vdGVSZXN1bHQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdmFyICRyZW1vdGUgPSAkTW9kZWwuZ2V0UmVtb3RlKCk7XG4gICAgICB2YXIgJHJlbW90ZVJlc3VsdCA9IG51bGw7XG5cbiAgICAgIGlmICgkcmVtb3RlICYmIHR5cGVvZiAkcmVtb3RlLmZpbmQgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAoJHJlbW90ZVJlc3VsdCA9ICRyZW1vdGUuZmluZCgkZmlsdGVycykuJHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdC5tYXAoZnVuY3Rpb24gKHJlY29yZCwgaSkge1xuICAgICAgICAgICAgJE1vZGVsLmdldCgkTW9kZWwuZ2V0S2V5RnJvbShyZWNvcmQudmFsdWVzKSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoJHJlY29yZCkge1xuICAgICAgICAgICAgICAkcmVjb3JkLiRzZXRSZW1vdGVWYWx1ZXMocmVjb3JkLnZhbHVlcywgcmVjb3JkLnZlcnNpb24pO1xuXG4gICAgICAgICAgICAgIGlmICgkcmVzdWx0W2ldKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRyZXN1bHRbaV0gIT09ICRyZWNvcmQpIHtcbiAgICAgICAgICAgICAgICAgICRyZXN1bHRbaV0uJGVtaXQoaWRiRXZlbnRzLk1PREVMX1VOUVVFUklFRCwgWyRyZXN1bHRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHJlc3VsdFtpXSA9ICRyZWNvcmQ7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHJlc3VsdC5wdXNoKCRyZWNvcmQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgJHJlY29yZC4kZW1pdChpZGJFdmVudHMuTU9ERUxfUVVFUklFRCwgWyRyZXN1bHRdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICRyZW1vdGVSZXN1bHQ7XG4gICAgfTtcbiAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxiIChtb2R1bGUpIHtcclxuXHJcbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcclxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xyXG4gICAgY29uc3QgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xyXG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGxldCB1cmxCYXNlSG9zdCA9IGxvY2F0aW9uLmhvc3Q7XHJcblxyXG4gIGNvbnN0IGxiQXV0aCA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnXHJcbiAgICBjb25zdCBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcclxuICAgIGNvbnN0IHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcclxuICAgIFxyXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcclxuICAgIC8vIFdlIGFyZSB1c2luZyBlbXB0eSBzdHJpbmcgYXMgYSBtYXJrZXIgZm9yIG51bGwvdW5kZWZpbmVkIHZhbHVlcy5cclxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XHJcbiAgICAgICAgc3RvcmFnZVtrZXldID0gdmFsdWU7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZChuYW1lKSB7XHJcbiAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVtrZXldIHx8IHNlc3Npb25TdG9yYWdlW2tleV0gfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsYkF1dGgoKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpeltuYW1lXSA9IGxvYWQobmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBjb25zdCBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbihhY2Nlc3NUb2tlbklkLCB1c2VySWQsIHVzZXJEYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc2Vzc2lvblN0b3JhZ2UsIG5hbWUsIG51bGwpO1xyXG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XHJcblxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uKCRxLCBsYkF1dGgpIHsgJ25nSW5qZWN0JztcclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVxdWVzdDogZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xyXG4gICAgICAgIGNvbnN0IGhvc3QgPSBnZXRIb3N0KGNvbmZpZy51cmwpO1xyXG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XHJcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XHJcbiAgICAgICAgICBjb25maWcuaGVhZGVyc1thdXRoSGVhZGVyXSA9IGxiQXV0aC5hY2Nlc3NUb2tlbklkO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XHJcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxyXG4gICAgICAgICAgLy8gdGhlcmUgaXMgbm8gdXNlciBsb2dnZWQgaW5cclxuICAgICAgICAgIGNvbnN0IHJlcyA9IHtcclxuICAgICAgICAgICAgYm9keTogeyBlcnJvcjogeyBzdGF0dXM6IDQwMSB9fSxcclxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXHJcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbigpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnOyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcclxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nLFxyXG4gICAgfTtcclxuXHJcbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyIFRoZSBoZWFkZXIgbmFtZSB0byB1c2UsIGUuZy4gYFgtQWNjZXNzLVRva2VuYFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25maWd1cmUgdGhlIFJFU1QgdHJhbnNwb3J0IHRvIHVzZSBhIGRpZmZlcmVudCBoZWFkZXIgZm9yIHNlbmRpbmdcclxuICAgICAqIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi4gSXQgaXMgc2VudCBpbiB0aGUgYEF1dGhvcml6YXRpb25gIGhlYWRlclxyXG4gICAgICogYnkgZGVmYXVsdC5cclxuICAgICAqL1xyXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oaGVhZGVyKSB7XHJcbiAgICAgIG9wdGlvbnMuYXV0aEhlYWRlciA9IGhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBoZWFkZXIgbmFtZSB0aGF0IGlzIHVzZWQgZm9yIHNlbmRpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB1c2UsIGUuZy4gYC9hcGlgIG9yIGAvL2V4YW1wbGUuY29tL2FwaWAuXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENoYW5nZSB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIEJ5IGRlZmF1bHQsIHRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgb3B0aW9ucy51cmxCYXNlID0gdXJsO1xyXG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xyXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uKCRyZXNvdXJjZSkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xyXG4gICAgICAgICAgYWN0aW9uc1trZXldLnVybCA9IG9wdGlvbnMudXJsQmFzZSArIGFjdGlvbnNba2V5XS51cmw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcclxuXHJcbiAgICAgICAgLy8gQW5ndWxhciBhbHdheXMgY2FsbHMgUE9TVCBvbiAkc2F2ZSgpXHJcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXHJcbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xyXG4gICAgICAgIHJlc291cmNlLnByb3RvdHlwZS4kc2F2ZSA9IGZ1bmN0aW9uKHN1Y2Nlc3MsIGVycm9yKSB7XHJcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxyXG4gICAgICAgICAgLy8gdGhhdCBleGFjdGx5IGZpdHMgb3VyIG5lZWRzLlxyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcclxuICAgICAgICAgIHJldHVybiByZXN1bHQuJHByb21pc2UgfHwgcmVzdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XHJcbiAgICAgIH07XHJcbiAgICBcclxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kdWxlXHJcbiAgICAuZmFjdG9yeSgnbGJBdXRoJywgbGJBdXRoKVxyXG4gICAgLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSlcclxuICAgIC5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpXHJcbiAgICAuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uKCRodHRwUHJvdmlkZXIpIHsgJ25nSW5qZWN0JztcclxuICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XHJcbiAgICB9XSk7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvbGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBsYjtcbmZ1bmN0aW9uIGxiKG1vZHVsZSkge1xuXG4gIC8vIER2dWVsdmUgZWwgaG9zdCBkZSB1bmEgVVJMXG4gIGZ1bmN0aW9uIGdldEhvc3QodXJsKSB7XG4gICAgdmFyIG0gPSB1cmwubWF0Y2goL14oPzpodHRwcz86KT9cXC9cXC8oW15cXC9dKykvKTtcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBudWxsO1xuICB9XG5cbiAgdmFyIHVybEJhc2VIb3N0ID0gbG9jYXRpb24uaG9zdDtcblxuICB2YXIgbGJBdXRoID0gZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB2YXIgcHJvcHMgPSBbJ2FjY2Vzc1Rva2VuSWQnLCAnY3VycmVudFVzZXJJZCcsICdyZW1lbWJlck1lJ107XG4gICAgdmFyIHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcblxuICAgIC8vIE5vdGU6IExvY2FsU3RvcmFnZSBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gc3RyaW5nXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9ICcnO1xuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2Fubm90IGFjY2VzcyBsb2NhbC9zZXNzaW9uIHN0b3JhZ2U6JywgZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGl6W25hbWVdID0gbG9hZChuYW1lKTtcbiAgICAgIH0pO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zZXRVc2VyID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IHVzZXJEYXRhO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyVXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzZXNzaW9uU3RvcmFnZSwgbmFtZSwgbnVsbCk7XG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IGxiQXV0aCgpO1xuICB9O1xuXG4gIHZhciBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbiBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IoJHEsIGxiQXV0aCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVxdWVzdDogZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xuICAgICAgICB2YXIgaG9zdCA9IGdldEhvc3QoY29uZmlnLnVybCk7XG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYkF1dGguYWNjZXNzVG9rZW5JZCkge1xuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzW2F1dGhIZWFkZXJdID0gbGJBdXRoLmFjY2Vzc1Rva2VuSWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XG4gICAgICAgICAgLy8gUmV0dXJuIGEgc3R1YiA0MDEgZXJyb3IgZm9yIFVzZXIuZ2V0Q3VycmVudCgpIHdoZW5cbiAgICAgICAgICAvLyB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpblxuICAgICAgICAgIHZhciByZXMgPSB7XG4gICAgICAgICAgICBib2R5OiB7IGVycm9yOiB7IHN0YXR1czogNDAxIH0gfSxcbiAgICAgICAgICAgIHN0YXR1czogNDAxLFxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbiBoZWFkZXJzKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKCkge1xuICAgICduZ0luamVjdCc7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcbiAgICAgIGF1dGhIZWFkZXI6ICdhdXRob3JpemF0aW9uJ1xuICAgIH07XG5cbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXIgVGhlIGhlYWRlciBuYW1lIHRvIHVzZSwgZS5nLiBgWC1BY2Nlc3MtVG9rZW5gXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENvbmZpZ3VyZSB0aGUgUkVTVCB0cmFuc3BvcnQgdG8gdXNlIGEgZGlmZmVyZW50IGhlYWRlciBmb3Igc2VuZGluZ1xyXG4gICAgICogdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLiBJdCBpcyBzZW50IGluIHRoZSBgQXV0aG9yaXphdGlvbmAgaGVhZGVyXHJcbiAgICAgKiBieSBkZWZhdWx0LlxyXG4gICAgICovXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKGhlYWRlcikge1xuICAgICAgb3B0aW9ucy5hdXRoSGVhZGVyID0gaGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIGhlYWRlciBuYW1lIHRoYXQgaXMgdXNlZCBmb3Igc2VuZGluZyB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uXHJcbiAgICAgKi9cbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHVzZSwgZS5nLiBgL2FwaWAgb3IgYC8vZXhhbXBsZS5jb20vYXBpYC5cclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ2hhbmdlIHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gQnkgZGVmYXVsdCwgdGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICBvcHRpb25zLnVybEJhc2UgPSB1cmw7XG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XG4gICAgfTtcblxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcbiAgICAgICduZ0luamVjdCc7XG5cbiAgICAgIHZhciBsYlJlc291cmNlID0gZnVuY3Rpb24gbGJSZXNvdXJjZSh1cmwsIHBhcmFtcywgYWN0aW9ucykge1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgYWN0aW9uc1trZXldLm9yaWdpbmFsVXJsID0gYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgICBhY3Rpb25zW2tleV0udXJsID0gb3B0aW9ucy51cmxCYXNlICsgYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcblxuICAgICAgICAvLyBBbmd1bGFyIGFsd2F5cyBjYWxscyBQT1NUIG9uICRzYXZlKClcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXG4gICAgICAgIC8vIGh0dHA6Ly9raXJrYnVzaGVsbC5tZS9hbmd1bGFyLWpzLXVzaW5nLW5nLXJlc291cmNlLWluLWEtbW9yZS1yZXN0ZnVsLW1hbm5lci9cbiAgICAgICAgcmVzb3VyY2UucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgLy8gRm9ydHVuYXRlbHksIExvb3BCYWNrIHByb3ZpZGVzIGEgY29udmVuaWVudCBgdXBzZXJ0YCBtZXRob2RcbiAgICAgICAgICAvLyB0aGF0IGV4YWN0bHkgZml0cyBvdXIgbmVlZHMuXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc291cmNlLnVwc2VydC5jYWxsKHRoaXMsIHt9LCB0aGlzLCBzdWNjZXNzLCBlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC4kcHJvbWlzZSB8fCByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXNvdXJjZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBsYlJlc291cmNlO1xuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIG1vZHVsZS5mYWN0b3J5KCdsYkF1dGgnLCBsYkF1dGgpLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSkuZmFjdG9yeSgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJywgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yKS5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XG4gIH1dKTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9sYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEdsb2JhbGVzXHJcbmltcG9ydCBDbGF6emVyICBmcm9tICcuL0NsYXp6ZXInO1xyXG5cclxuLy8gUmVxdWVzdFxyXG5pbXBvcnQgaWRiUmVxdWVzdCAgICAgICAgIGZyb20gJy4vaWRiUmVxdWVzdCc7XHJcbmltcG9ydCBpZGJPcGVuREJSZXF1ZXN0ICAgZnJvbSAnLi9pZGJPcGVuREJSZXF1ZXN0JztcclxuXHJcbi8vIFByaW5jaXBhbGVzXHJcbmltcG9ydCBpZGIgICAgICAgICAgICAgIGZyb20gJy4vaWRiJztcclxuaW1wb3J0IGlkYlN0b3JlICAgICAgICAgZnJvbSAnLi9pZGJTdG9yZSc7XHJcbmltcG9ydCBpZGJFdmVudFRhcmdldCAgIGZyb20gJy4vaWRiRXZlbnRUYXJnZXQnO1xyXG5pbXBvcnQgaWRiTW9kZWwgICAgICAgICBmcm9tICcuL2lkYk1vZGVsJztcclxuaW1wb3J0IGlkYlNvY2tldCAgICAgICAgZnJvbSAnLi9pZGJTb2NrZXQnO1xyXG5pbXBvcnQgaWRiVHJhbnNhY3Rpb24gICBmcm9tICcuL2lkYlRyYW5zYWN0aW9uJztcclxuXHJcbmltcG9ydCBsYiBmcm9tICcuL2xiJztcclxuXHJcbmxiKGFuZ3VsYXIubW9kdWxlKCduZy52MS5pZGInLCBbXSkpXHJcbiAgXHJcbiAgLmNvbnN0YW50KCdpbycsIGlvKVxyXG4gIC5zZXJ2aWNlKCdDbGF6emVyJywgQ2xhenplcilcclxuXHJcbiAgLmNvbnN0YW50KCdpZGJWZXJzaW9uJywgJzAuMC4xJylcclxuICBcclxuICAuc2VydmljZSgnaWRiUmVxdWVzdCcsIGlkYlJlcXVlc3QpXHJcbiAgLnNlcnZpY2UoJ2lkYk9wZW5EQlJlcXVlc3QnLCBpZGJPcGVuREJSZXF1ZXN0KVxyXG4gIC5zZXJ2aWNlKCdpZGIyJywgaWRiKVxyXG4gIC5zZXJ2aWNlKCdpZGJTdG9yZScsIGlkYlN0b3JlKVxyXG4gIC5zZXJ2aWNlKCdpZGJFdmVudFRhcmdldCcsIGlkYkV2ZW50VGFyZ2V0KVxyXG4gIC5zZXJ2aWNlKCdpZGJNb2RlbDInLCBpZGJNb2RlbClcclxuICAuc2VydmljZSgnaWRiU29ja2V0MicsIGlkYlNvY2tldClcclxuICAuc2VydmljZSgnaWRiVHJhbnNhY3Rpb24nLCBpZGJUcmFuc2FjdGlvbilcclxuXHJcbiAgLnNlcnZpY2UoJ2RiMicsIGZ1bmN0aW9uIChpZGIyKSB7ICduZ0luamVjdCc7XHJcblxyXG4gICAgY29uc3QgZGIgPSBuZXcgaWRiMignYWFhJywgNClcclxuXHJcbiAgICBkYi4kYXV0b21pZ3JhdGlvbih7XHJcbiAgICAgICAgMTogZnVuY3Rpb24gKGRiKSB7XHJcbiAgICAgICAgICB2YXIgbW9kZWwgPSBkYlxyXG4gICAgICAgICAgICAuJG1vZGVsKCdUcmFiYWphZG9yJylcclxuICAgICAgICAgICAgLiRzZXRLZXlQYXRoKCdpZCcpXHJcbiAgICAgICAgICAgIC4kc2V0QXV0b0luY3JlbWVudChmYWxzZSlcclxuICAgICAgICAgICAgLiRjcmVhdGVTdG9yZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIC4kZHJvcCgpLnRoZW4oZnVuY3Rpb24gKGRiKSB7XHJcbiAgICAgICAgZGIuJG9wZW4oKS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coWydvcGVuZWQnXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkYjtcclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIC5zZXJ2aWNlKCdUcmFiYWphZG9yMicsIGZ1bmN0aW9uIChkYjIpIHsgJ25nSW5qZWN0JztcclxuICAgIHJldHVybiB3aW5kb3cuVHJhYmFqYWRvcjIgPSBkYjIuJG1vZGVsKCdUcmFiYWphZG9yJylcclxuICAgICAgLiRzZXRLZXlQYXRoKCdpZCcpXHJcbiAgICAgIC4kc2V0QXV0b0luY3JlbWVudChmYWxzZSlcclxuICAgICAgLiRmaWVsZCgnY29kJywgICAgICAgIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KVxyXG4gICAgICAuJGZpZWxkKCdjaScsICAgICAgICAgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pXHJcbiAgICAgIC4kZmllbGQoJ25vbWJyZXMnLCAgICB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSlcclxuICAgICAgLiRmaWVsZCgnYXBlbGxpZG9zJywgIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KVxyXG4gICAgICAuJGZpZWxkKCduYWNpbWllbnRvJywgeyBcInR5cGVcIjogXCJkYXRlXCIgfSlcclxuICAgICAgLiRmaWVsZCgnaW5ncmVzbycsICAgIHsgXCJ0eXBlXCI6IFwiZGF0ZVwiIH0pXHJcbiAgICAgIC4kZmllbGQoJ2RpcmVjY2lvbicsICB7IFwidHlwZVwiOiBcInN0cmluZ1wifSlcclxuICAgICAgLiRyZW1vdGUoXHJcbiAgICAgICAgJy90cmFiYWphZG9yZXMvOmlkJyxcclxuICAgICAgICB7ICdpZCc6ICdAaWQnIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ2ZpbmQnOiAgIHsgdXJsOiAnL3RyYWJhamFkb3Jlcy9fZmluZFdpdGhWZXJzaW9uJywgbWV0aG9kOiAnR0VUJywgaXNBcnJheTogdHJ1ZSwgfSxcclxuICAgICAgICAgIC8vICdjcmVhdGUnOiB7IHVybDogJy90cmFiYWphZG9yZXMnLCBtZXRob2Q6ICdQT1NUJywgfSxcclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICAgICAgLy8gLnZlcnNpb25pbmcoKVxyXG4gICAgICAuJGJ1aWxkKGZ1bmN0aW9uIChUcmFiYWphZG9yKSB7XHJcblxyXG4gICAgICAgIFRyYWJhamFkb3IucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIFRyYWJhamFkb3IucHJvdG90eXBlLmdldE5vbWJyZSA9IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubm9tYnJlcyArICcgJyArIHRoaXMuYXBlbGxpZG9zO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuICB9KVxyXG5cclxuICAucnVuKGZ1bmN0aW9uIChUcmFiYWphZG9yMikgeyAnbmdJbmplY3QnO1xyXG4gICAgY29uc3QgdCA9IG5ldyBUcmFiYWphZG9yMigpO1xyXG4gICAgdC5ub21icmVzID0gJ0FsZXhhbmRlcic7XHJcbiAgICB0LmFwZWxsaWRvcyA9ICdSb25kb24nO1xyXG4gICAgY29uc29sZS5sb2codC4kZ2V0VmFsdWVzKCkpO1xyXG4gICAgY29uc29sZS5sb2codC5nZXROb21icmUoKSk7XHJcbiAgfSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBHbG9iYWxlc1xuXG52YXIgX0NsYXp6ZXIgPSByZXF1aXJlKCcuL0NsYXp6ZXInKTtcblxudmFyIF9DbGF6emVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NsYXp6ZXIpO1xuXG52YXIgX2lkYlJlcXVlc3QgPSByZXF1aXJlKCcuL2lkYlJlcXVlc3QnKTtcblxudmFyIF9pZGJSZXF1ZXN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlJlcXVlc3QpO1xuXG52YXIgX2lkYk9wZW5EQlJlcXVlc3QgPSByZXF1aXJlKCcuL2lkYk9wZW5EQlJlcXVlc3QnKTtcblxudmFyIF9pZGJPcGVuREJSZXF1ZXN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYk9wZW5EQlJlcXVlc3QpO1xuXG52YXIgX2lkYiA9IHJlcXVpcmUoJy4vaWRiJyk7XG5cbnZhciBfaWRiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYik7XG5cbnZhciBfaWRiU3RvcmUgPSByZXF1aXJlKCcuL2lkYlN0b3JlJyk7XG5cbnZhciBfaWRiU3RvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiU3RvcmUpO1xuXG52YXIgX2lkYkV2ZW50VGFyZ2V0ID0gcmVxdWlyZSgnLi9pZGJFdmVudFRhcmdldCcpO1xuXG52YXIgX2lkYkV2ZW50VGFyZ2V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYkV2ZW50VGFyZ2V0KTtcblxudmFyIF9pZGJNb2RlbCA9IHJlcXVpcmUoJy4vaWRiTW9kZWwnKTtcblxudmFyIF9pZGJNb2RlbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJNb2RlbCk7XG5cbnZhciBfaWRiU29ja2V0ID0gcmVxdWlyZSgnLi9pZGJTb2NrZXQnKTtcblxudmFyIF9pZGJTb2NrZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiU29ja2V0KTtcblxudmFyIF9pZGJUcmFuc2FjdGlvbiA9IHJlcXVpcmUoJy4vaWRiVHJhbnNhY3Rpb24nKTtcblxudmFyIF9pZGJUcmFuc2FjdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJUcmFuc2FjdGlvbik7XG5cbnZhciBfbGIgPSByZXF1aXJlKCcuL2xiJyk7XG5cbnZhciBfbGIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4oMCwgX2xiMi5kZWZhdWx0KShhbmd1bGFyLm1vZHVsZSgnbmcudjEuaWRiJywgW10pKS5jb25zdGFudCgnaW8nLCBpbykuc2VydmljZSgnQ2xhenplcicsIF9DbGF6emVyMi5kZWZhdWx0KS5jb25zdGFudCgnaWRiVmVyc2lvbicsICcwLjAuMScpLnNlcnZpY2UoJ2lkYlJlcXVlc3QnLCBfaWRiUmVxdWVzdDIuZGVmYXVsdCkuc2VydmljZSgnaWRiT3BlbkRCUmVxdWVzdCcsIF9pZGJPcGVuREJSZXF1ZXN0Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGIyJywgX2lkYjIuZGVmYXVsdCkuc2VydmljZSgnaWRiU3RvcmUnLCBfaWRiU3RvcmUyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYkV2ZW50VGFyZ2V0JywgX2lkYkV2ZW50VGFyZ2V0Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJNb2RlbDInLCBfaWRiTW9kZWwyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlNvY2tldDInLCBfaWRiU29ja2V0Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJUcmFuc2FjdGlvbicsIF9pZGJUcmFuc2FjdGlvbjIuZGVmYXVsdCkuc2VydmljZSgnZGIyJywgZnVuY3Rpb24gKGlkYjIpIHtcbiAgJ25nSW5qZWN0JztcblxuICB2YXIgZGIgPSBuZXcgaWRiMignYWFhJywgNCk7XG5cbiAgZGIuJGF1dG9taWdyYXRpb24oe1xuICAgIDE6IGZ1bmN0aW9uIF8oZGIpIHtcbiAgICAgIHZhciBtb2RlbCA9IGRiLiRtb2RlbCgnVHJhYmFqYWRvcicpLiRzZXRLZXlQYXRoKCdpZCcpLiRzZXRBdXRvSW5jcmVtZW50KGZhbHNlKS4kY3JlYXRlU3RvcmUoKTtcbiAgICB9XG4gIH0pLiRkcm9wKCkudGhlbihmdW5jdGlvbiAoZGIpIHtcbiAgICBkYi4kb3BlbigpLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBjb25zb2xlLmxvZyhbJ29wZW5lZCddKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRiO1xufSkuc2VydmljZSgnVHJhYmFqYWRvcjInLCBmdW5jdGlvbiAoZGIyKSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIHdpbmRvdy5UcmFiYWphZG9yMiA9IGRiMi4kbW9kZWwoJ1RyYWJhamFkb3InKS4kc2V0S2V5UGF0aCgnaWQnKS4kc2V0QXV0b0luY3JlbWVudChmYWxzZSkuJGZpZWxkKCdjb2QnLCB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSkuJGZpZWxkKCdjaScsIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KS4kZmllbGQoJ25vbWJyZXMnLCB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSkuJGZpZWxkKCdhcGVsbGlkb3MnLCB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSkuJGZpZWxkKCduYWNpbWllbnRvJywgeyBcInR5cGVcIjogXCJkYXRlXCIgfSkuJGZpZWxkKCdpbmdyZXNvJywgeyBcInR5cGVcIjogXCJkYXRlXCIgfSkuJGZpZWxkKCdkaXJlY2Npb24nLCB7IFwidHlwZVwiOiBcInN0cmluZ1wiIH0pLiRyZW1vdGUoJy90cmFiYWphZG9yZXMvOmlkJywgeyAnaWQnOiAnQGlkJyB9LCB7XG4gICAgJ2ZpbmQnOiB7IHVybDogJy90cmFiYWphZG9yZXMvX2ZpbmRXaXRoVmVyc2lvbicsIG1ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWUgfVxuICB9KVxuICAvLyAudmVyc2lvbmluZygpXG4gIC4kYnVpbGQoZnVuY3Rpb24gKFRyYWJhamFkb3IpIHtcblxuICAgIFRyYWJhamFkb3IucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7fTtcblxuICAgIFRyYWJhamFkb3IucHJvdG90eXBlLmdldE5vbWJyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vbWJyZXMgKyAnICcgKyB0aGlzLmFwZWxsaWRvcztcbiAgICB9O1xuICB9KTtcbn0pLnJ1bihmdW5jdGlvbiAoVHJhYmFqYWRvcjIpIHtcbiAgJ25nSW5qZWN0JztcblxuICB2YXIgdCA9IG5ldyBUcmFiYWphZG9yMigpO1xuICB0Lm5vbWJyZXMgPSAnQWxleGFuZGVyJztcbiAgdC5hcGVsbGlkb3MgPSAnUm9uZG9uJztcbiAgY29uc29sZS5sb2codC4kZ2V0VmFsdWVzKCkpO1xuICBjb25zb2xlLmxvZyh0LmdldE5vbWJyZSgpKTtcbn0pO1xuXG4vLyBQcmluY2lwYWxlc1xuXG5cbi8vIFJlcXVlc3RcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBDbGF6emVyXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIGZ1bmN0aW9uIENsYXp6ZXIgKGNvbnN0cnVjdG9yKSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NsYXp6JywgeyB2YWx1ZTogY29uc3RydWN0b3IgfHwgZnVuY3Rpb24gKCkge30gfSk7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdpbmhlcml0Jywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChwYXJlbnQpIHtcclxuICAgICAgbGV0IHRtcCA9IGZ1bmN0aW9uKCkge307XHJcbiAgICAgIHRtcC5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xyXG4gICAgICB0aGlzLmNsYXp6LnByb3RvdHlwZSA9IG5ldyB0bXAoKTtcclxuICAgICAgdGhpcy5jbGF6ei5wcm90b3R5cGUuY29uc3RydWN0b3IgPSB0aGlzLmNsYXp6O1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnc3RhdGljJywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jbGF6eiwgbmFtZSwge1xyXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3Byb3BlcnR5Jywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChuYW1lLCBvcHRzKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmNsYXp6LnByb3RvdHlwZSwgbmFtZSwgb3B0cyk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdtZXRob2QnLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKG5hbWUsIGZ1bmMpIHtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShuYW1lLCB7XHJcbiAgICAgICAgdmFsdWU6IGZ1bmNcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdnZXR0ZXInLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKGZyb20sIHRvKSB7XHJcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy4kbWVbdG9dO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdzZXR0ZXInLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKGZyb20sIHRvKSB7XHJcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgIHRoaXMuJG1lW3RvXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdoYW5kbGVyRXZlbnQnLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKGZyb20sIHRvKSB7XHJcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XHJcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgdGhpcy4kbWVbdG9dID0gY2I7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgcmV0dXJuIENsYXp6ZXI7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvQ2xhenplci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIENsYXp6ZXJcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG5cbiAgZnVuY3Rpb24gQ2xhenplcihjb25zdHJ1Y3Rvcikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY2xhenonLCB7IHZhbHVlOiBjb25zdHJ1Y3RvciB8fCBmdW5jdGlvbiAoKSB7fSB9KTtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdpbmhlcml0Jywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShwYXJlbnQpIHtcbiAgICAgIHZhciB0bXAgPSBmdW5jdGlvbiB0bXAoKSB7fTtcbiAgICAgIHRtcC5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xuICAgICAgdGhpcy5jbGF6ei5wcm90b3R5cGUgPSBuZXcgdG1wKCk7XG4gICAgICB0aGlzLmNsYXp6LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHRoaXMuY2xheno7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdzdGF0aWMnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKG5hbWUsIF92YWx1ZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuY2xhenosIG5hbWUsIHtcbiAgICAgICAgdmFsdWU6IF92YWx1ZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdwcm9wZXJ0eScsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobmFtZSwgb3B0cykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuY2xhenoucHJvdG90eXBlLCBuYW1lLCBvcHRzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ21ldGhvZCcsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobmFtZSwgZnVuYykge1xuICAgICAgdGhpcy5wcm9wZXJ0eShuYW1lLCB7XG4gICAgICAgIHZhbHVlOiBmdW5jXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ2dldHRlcicsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZnJvbSwgdG8pIHtcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy4kbWVbdG9dO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3NldHRlcicsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZnJvbSwgdG8pIHtcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuJG1lW3RvXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ2hhbmRsZXJFdmVudCcsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZnJvbSwgdG8pIHtcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoY2IpIHtcbiAgICAgICAgICB0aGlzLiRtZVt0b10gPSBjYjtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICByZXR1cm4gQ2xhenplcjtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvQ2xhenplci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJSZXF1ZXN0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQlJlcXVlc3QgOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGFueSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTUV4Y2VwdGlvbj8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgKElEQk9iamVjdFN0b3JlIG9yIElEQkluZGV4IG9yIElEQkN1cnNvcik/IHNvdXJjZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb24/ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJSZXF1ZXN0UmVhZHlTdGF0ZSAgICAgICAgICAgICAgICAgICAgICAgcmVhZHlTdGF0ZTtcclxuICogXHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnN1Y2Nlc3M7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiB9O1xyXG4gKlxyXG4gKiBlbnVtIElEQlJlcXVlc3RSZWFkeVN0YXRlIHtcclxuICogICBcInBlbmRpbmdcIixcclxuICogICBcImRvbmVcIlxyXG4gKiB9O1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRfcHJvbWlzZVxyXG5cclxuICBjb25zdCBSZWFkeVN0YXRlID0gbmV3IENsYXp6ZXIoe30pXHJcbiAgICAgICAgLnN0YXRpYygnUGVuZGluZycsICAncGVuZGluZycpXHJcbiAgICAgICAgLnN0YXRpYygnRG9uZScsICAgICAnZG9uZScpO1xyXG4gIFxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiUmVxdWVzdCAobWUpIHtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAuaW5oZXJpdChFdmVudFRhcmdldClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gU3RhdGljc1xyXG4gIC5zdGF0aWMoJ1JlYWR5U3RhdGUnLCBSZWFkeVN0YXRlLmNsYXp6KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJHJlc3VsdCcsICdyZXN1bHQnKVxyXG4gIC5nZXR0ZXIoJyRlcnJvcicsICdlcnJvcicpXHJcbiAgLmdldHRlcignJHNvdXJjZScsICdzb3VyY2UnKVxyXG4gIC5nZXR0ZXIoJyRyZWFkeVN0YXRlJywgJ3JlYWR5U3RhdGUnKVxyXG4gIC5nZXR0ZXIoJyR0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEV2ZW50IGhhbmRsZXJzXHJcbiAgLmhhbmRsZXJFdmVudCgnJHN1Y2Nlc3MnLCAnb25zdWNjZXNzJylcclxuICAuaGFuZGxlckV2ZW50KCckZmFpbCcsICdvbmVycm9yJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJvcGVydHlcclxuICAucHJvcGVydHkoJyRwcm9taXNlJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZiAodGhpei4kX3Byb21pc2UpIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcclxuXHJcbiAgICAgIC8vIENyZWFyIHByb21pc2UgcGFyYSBlbCByZXF1ZXN0XHJcbiAgICAgIHRoaXouJF9wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRoaXouJHN1Y2Nlc3MoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZXNvbHZlKGV2ZW50KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC4kZmFpbChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlamVjdChldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbmV3IENsYXp6ZXIodGhpei4kX3Byb21pc2UpLnN0YXRpYygnJHJlcXVlc3QnLCB0aGl6ICk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpei4kX3Byb21pc2U7XHJcblxyXG4gICAgfVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiUmVxdWVzdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYlJlcXVlc3RcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCUmVxdWVzdCA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NRXhjZXB0aW9uPyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSAoSURCT2JqZWN0U3RvcmUgb3IgSURCSW5kZXggb3IgSURCQ3Vyc29yKT8gc291cmNlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbj8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlJlcXVlc3RSZWFkeVN0YXRlICAgICAgICAgICAgICAgICAgICAgICByZWFkeVN0YXRlO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uc3VjY2VzcztcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uZXJyb3I7XHJcbiAqIH07XHJcbiAqXHJcbiAqIGVudW0gSURCUmVxdWVzdFJlYWR5U3RhdGUge1xyXG4gKiAgIFwicGVuZGluZ1wiLFxyXG4gKiAgIFwiZG9uZVwiXHJcbiAqIH07XHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplcikge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxuICAvLyAkX3Byb21pc2VcblxuICB2YXIgUmVhZHlTdGF0ZSA9IG5ldyBDbGF6emVyKHt9KS5zdGF0aWMoJ1BlbmRpbmcnLCAncGVuZGluZycpLnN0YXRpYygnRG9uZScsICdkb25lJyk7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJSZXF1ZXN0KG1lKSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFN0YXRpY3NcbiAgLnN0YXRpYygnUmVhZHlTdGF0ZScsIFJlYWR5U3RhdGUuY2xhenopXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdldHRlcnNcbiAgLmdldHRlcignJHJlc3VsdCcsICdyZXN1bHQnKS5nZXR0ZXIoJyRlcnJvcicsICdlcnJvcicpLmdldHRlcignJHNvdXJjZScsICdzb3VyY2UnKS5nZXR0ZXIoJyRyZWFkeVN0YXRlJywgJ3JlYWR5U3RhdGUnKS5nZXR0ZXIoJyR0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGhhbmRsZXJzXG4gIC5oYW5kbGVyRXZlbnQoJyRzdWNjZXNzJywgJ29uc3VjY2VzcycpLmhhbmRsZXJFdmVudCgnJGZhaWwnLCAnb25lcnJvcicpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFByb3BlcnR5XG4gIC5wcm9wZXJ0eSgnJHByb21pc2UnLCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlmICh0aGl6LiRfcHJvbWlzZSkgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xuXG4gICAgICAvLyBDcmVhciBwcm9taXNlIHBhcmEgZWwgcmVxdWVzdFxuICAgICAgdGhpei4kX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRoaXouJHN1Y2Nlc3MoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmVzb2x2ZShldmVudCk7XG4gICAgICAgIH0pLiRmYWlsKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJlamVjdChldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIG5ldyBDbGF6emVyKHRoaXouJF9wcm9taXNlKS5zdGF0aWMoJyRyZXF1ZXN0JywgdGhpeik7XG5cbiAgICAgIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcbiAgICB9XG5cbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJSZXF1ZXN0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYk9wZW5EQlJlcXVlc3RcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCT3BlbkRCUmVxdWVzdCA6IElEQlJlcXVlc3Qge1xyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25ibG9ja2VkO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb251cGdyYWRlbmVlZGVkO1xyXG4gKiB9O1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYk9wZW5EQlJlcXVlc3QgKG1lKSB7XHJcbiAgICBpZGJSZXF1ZXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IC8vIExsYW1hciBhbCBjb25zdHJ1Y3RvcyBkZWwgcGFkcmVcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAuaW5oZXJpdChpZGJSZXF1ZXN0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gIC5oYW5kbGVyRXZlbnQoJyRibG9ja2VkJywgJ29uYmxvY2tlZCcpXHJcbiAgLmhhbmRsZXJFdmVudCgnJHVwZ3JhZGVuZWVkZWQnLCAnb251cGdyYWRlbmVlZGVkJylcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiT3BlbkRCUmVxdWVzdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYk9wZW5EQlJlcXVlc3RcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCT3BlbkRCUmVxdWVzdCA6IElEQlJlcXVlc3Qge1xyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25ibG9ja2VkO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb251cGdyYWRlbmVlZGVkO1xyXG4gKiB9O1xyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYk9wZW5EQlJlcXVlc3QobWUpIHtcbiAgICBpZGJSZXF1ZXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IC8vIExsYW1hciBhbCBjb25zdHJ1Y3RvcyBkZWwgcGFkcmVcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoaWRiUmVxdWVzdClcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRXZlbnQgaGFuZGxlcnNcbiAgLmhhbmRsZXJFdmVudCgnJGJsb2NrZWQnLCAnb25ibG9ja2VkJykuaGFuZGxlckV2ZW50KCckdXBncmFkZW5lZWRlZCcsICdvbnVwZ3JhZGVuZWVkZWQnKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYk9wZW5EQlJlcXVlc3QuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkZhY3Rvcnkge1xyXG4gKiAgIElEQk9wZW5EQlJlcXVlc3Qgb3BlbihET01TdHJpbmcgbmFtZSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBsb25nIHZlcnNpb24pO1xyXG4gKiAgIElEQk9wZW5EQlJlcXVlc3QgZGVsZXRlRGF0YWJhc2UoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIHNob3J0IGNtcChhbnkgZmlyc3QsIGFueSBzZWNvbmQpO1xyXG4gKiB9O1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJEYXRhYmFzZSA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIHVuc2lnbmVkIGxvbmcgbG9uZyB2ZXJzaW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmdMaXN0ICAgICAgb2JqZWN0U3RvcmVOYW1lcztcclxuICogXHJcbiAqICAgSURCVHJhbnNhY3Rpb24gdHJhbnNhY3Rpb24oKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KSBzdG9yZU5hbWVzLCBvcHRpb25hbCBJREJUcmFuc2FjdGlvbk1vZGUgbW9kZSA9IFwicmVhZG9ubHlcIik7XHJcbiAqICAgdm9pZCAgICAgICAgICAgY2xvc2UoKTtcclxuICogICBJREJPYmplY3RTdG9yZSBjcmVhdGVPYmplY3RTdG9yZShET01TdHJpbmcgbmFtZSwgb3B0aW9uYWwgSURCT2JqZWN0U3RvcmVQYXJhbWV0ZXJzIG9wdGlvbnMpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGRlbGV0ZU9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lKTtcclxuICogXHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmFib3J0O1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25jbG9zZTtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uZXJyb3I7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnZlcnNpb25jaGFuZ2U7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBkaWN0aW9uYXJ5IElEQk9iamVjdFN0b3JlUGFyYW1ldGVycyB7XHJcbiAqICAgKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KT8ga2V5UGF0aCA9IG51bGw7XHJcbiAqICAgYm9vbGVhbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0luY3JlbWVudCA9IGZhbHNlO1xyXG4gKiB9O21lXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiU3RvcmUsIGlkYk1vZGVsMiwgaWRiT3BlbkRCUmVxdWVzdCwgaWRiVHJhbnNhY3Rpb24sICRsb2cpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICAvLyBFbiBsYSBzaWd1aWVudGUgbGluZWEsIHB1ZWRlIGluY2x1aXIgcHJlZmlqb3MgZGUgaW1wbGVtZW50YWNpb24gcXVlIHF1aWVyYSBwcm9iYXIuXHJcbiAgY29uc3QgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xyXG4gIC8vIE5vIHVzZSBcImNvbnN0IGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cclxuICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcclxuICBjb25zdCBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XHJcbiAgY29uc3QgSURCS2V5UmFuZ2UgPSB3aW5kb3cuSURCS2V5UmFuZ2UgfHwgd2luZG93LndlYmtpdElEQktleVJhbmdlIHx8IHdpbmRvdy5tc0lEQktleVJhbmdlO1xyXG4gIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXHJcbiAgXHJcbiAgaWYgKCFpbmRleGVkREIpIHtcclxuICAgIGFsZXJ0KCdTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXMnKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcclxuICAvLyAkbWVcclxuICAvLyAkb3BlbmVkXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3IgIFxyXG4gIGNvbnN0IGlkYiA9IGZ1bmN0aW9uIGlkYihuYW1lLCB2ZXJzaW9uLCBzb2NrZXQpIHtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKVxyXG5cclxuICAgICAgLnN0YXRpYygnJG5hbWUnLCBuYW1lKVxyXG4gICAgICAuc3RhdGljKCckdmVyc2lvbicsIHZlcnNpb24pXHJcbiAgICAgIC5zdGF0aWMoJyRzb2NrZXQnLCBzb2NrZXQpXHJcbiAgICAgIFxyXG4gICAgICAuc3RhdGljKCckdXBncmFkZW5lZWRlZHMnLCBbXSlcclxuICAgICAgLnN0YXRpYygnJG1vZGVscycsIFtdKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihpZGIpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEdldHRlcnNcclxuICAuZ2V0dGVyKCckb2JqZWN0U3RvcmVOYW1lcycsICdvYmplY3RTdG9yZU5hbWVzJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRXZlbnQgaGFuZGxlcnNcclxuICAuaGFuZGxlckV2ZW50KCckYWJvcnRlZCcsICdvbmFib3J0JylcclxuICAuaGFuZGxlckV2ZW50KCckY2xvc2VkJywgJ29uY2xvc2UnKVxyXG4gIC5oYW5kbGVyRXZlbnQoJyRlcnJvcicsICdvbmVycm9yJylcclxuICAuaGFuZGxlckV2ZW50KCckdmVyc2lvbkNoYW5nZWQnLCAnb252ZXJzaW9uY2hhbmdlJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJG9wZW4nLCBmdW5jdGlvbiAobmFtZSwgdmVyc2lvbikge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiT3BlbkRCUmVxdWVzdChpbmRleGVkREIub3BlbihuYW1lLCB2ZXJzaW9uKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRkcm9wJywgZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIG5ldyBpZGJPcGVuREJSZXF1ZXN0KGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShuYW1lKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRjbXAnLCBmdW5jdGlvbiAoZmlyc3QsIHNlY29uZCkge1xyXG4gICAgXHJcbiAgICByZXR1cm4gaW5kZXhlZERCLmNtcChmaXJzdCwgc2Vjb25kKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHVwZ3JhZGVuZWVkZWQnLCBmdW5jdGlvbiAoY2IpIHtcclxuICAgIFxyXG4gICAgdGhpcy4kdXBncmFkZW5lZWRlZHMucHVzaChjYik7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGF1dG9taWdyYXRpb24nLCBmdW5jdGlvbiAoYWxsTWlncmF0aW9ucykge1xyXG5cclxuICAgIHJldHVybiB0aGlzLiR1cGdyYWRlbmVlZGVkKGZ1bmN0aW9uICh0aGl6LCBvcGVuUmVxdWVzdCwgZXZlbnQpIHtcclxuICAgICAgT2JqZWN0LmtleXMoYWxsTWlncmF0aW9ucykubWFwKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XHJcblxyXG4gICAgICAgIGlmIChldmVudC5vbGRWZXJzaW9uIDwgdmVyc2lvbiAmJiB2ZXJzaW9uIDw9IGV2ZW50Lm5ld1ZlcnNpb24pIHtcclxuXHJcbiAgICAgICAgICBjb25zdCBtaWdyYXRpb25zID0gQXJyYXkuaXNBcnJheShhbGxNaWdyYXRpb25zW3ZlcnNpb25dKT9cclxuICAgICAgICAgICAgYWxsTWlncmF0aW9uc1t2ZXJzaW9uXTpbYWxsTWlncmF0aW9uc1t2ZXJzaW9uXV07XHJcblxyXG4gICAgICAgICAgJGxvZy5sb2coJ21pZ3JhdGlvbiB2Jyt2ZXJzaW9uKycgc3RhcnRzJyk7XHJcbiAgICAgICAgICBtaWdyYXRpb25zLm1hcChmdW5jdGlvbiAobWlncmF0aW9uKSB7XHJcbiAgICAgICAgICAgIG1pZ3JhdGlvbih0aGl6LCBvcGVuUmVxdWVzdCwgZXZlbnQpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgJGxvZy5sb2coJ21pZ3JhdGlvbiB2Jyt2ZXJzaW9uKycgZW5kcycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRvcGVuJywgZnVuY3Rpb24gKGNiLCBjYkVycikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBsZXQgbGFzdFJxID0gbnVsbDtcclxuICAgIGxldCBsYXN0RXZlbnQgPSBudWxsO1xyXG5cclxuICAgIGlmICghdGhpei4kb3BlbmVkKSB7XHJcblxyXG4gICAgICB0aGl6LiRvcGVuZWQgPSAobGFzdFJxID0gaWRiLiRvcGVuKHRoaXouJG5hbWUsIHRoaXouJHZlcnNpb24pXHJcbiAgICAgICAgLiR1cGdyYWRlbmVlZGVkKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgdGhpei4kbWUgPSBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICAgICAgdGhpei4kdXBncmFkZW5lZWRlZHMubWFwKGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgICBjYi5hcHBseSh0aGl6LCBbdGhpeiwgbGFzdFJxLCBldmVudF0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkpXHJcblxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHRoaXouJG1lID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgICAgIGxhc3RFdmVudCA9IGV2ZW50O1xyXG4gICAgICAgICAgaWYgKGNiKSBjYih0aGl6LCBsYXN0UnEsIGV2ZW50KTtcclxuICAgICAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgbGFzdFJxID0gbnVsbDtcclxuICAgICAgICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XHJcbiAgICAgICAgICBpZiAoY2JFcnIpIGNiRXJyKHRoaXosIGxhc3RScSwgZXZlbnQpO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSBlbHNlIGlmIChjYikge1xyXG5cclxuICAgICAgY2IodGhpeiwgbGFzdFJxLCBsYXN0RXZlbnQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpei4kb3BlbmVkO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZHJvcCcsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgIGNvbnN0IHJxID0gaWRiLiRkcm9wKHRoaXouJG5hbWUpXHJcbiAgICAgICAgLiRzdWNjZXNzKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVzb2x2ZSh0aGl6KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLiRmYWlsKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgaWYgKGNiKSBjYihycSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRjbG9zZScsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB0aGlzLiRtZS5jbG9zZSgpO1xyXG4gICAgXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNyZWF0ZVN0b3JlJywgZnVuY3Rpb24gKG5hbWUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLmNyZWF0ZU9iamVjdFN0b3JlKG5hbWUsIG9wdGlvbnMpKTtcclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRkcm9wU3RvcmUnLCBmdW5jdGlvbiAobmFtZSkge1xyXG5cclxuICAgIHRoaXMuJG1lLmRlbGV0ZU9iamVjdFN0b3JlKG5hbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckbW9kZWwnLCBmdW5jdGlvbiAobmFtZSwgc29ja2V0KSB7XHJcblxyXG4gICAgLy8gU2kgZXhpc3RlIGVsIG1vZGVsbyByZXRvcm5hcmxvXHJcbiAgICBpZih0aGlzLiRtb2RlbHNbbmFtZV0pIHJldHVybiB0aGlzLiRtb2RlbHNbbmFtZV07XHJcblxyXG4gICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG8geSBndWFyZGFybG9cclxuICAgIHJldHVybiB0aGlzLiRtb2RlbHNbbmFtZV0gPSBpZGJNb2RlbDIodGhpcywgbmFtZSwgc29ja2V0IHx8IHRoaXMuJHNvY2tldCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyR0cmFuc2FjdGlvbicsIGZ1bmN0aW9uIChzdG9yZU5hbWVzLCBtb2RlKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICB0aGl6LiRvcGVuKClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAodGhpeikge1xyXG4gICAgICAgICAgcmVzb2x2ZShuZXcgaWRiVHJhbnNhY3Rpb24odGhpei4kbWUudHJhbnNhY3Rpb24oc3RvcmVOYW1lcywgbW9kZSkpKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlamVjdChldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc3RvcmUnLCBmdW5jdGlvbiAoc3RvcmVOYW1lcykgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShzdG9yZU5hbWVzKSkgc3RvcmVOYW1lcyA9IFtzdG9yZU5hbWVzXTtcclxuXHJcbiAgICBmdW5jdGlvbiBhY3Rpb24obW9kZSkge1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICB0aGl6LiR0cmFuc2FjdGlvbihzdG9yZU5hbWVzLCBtb2RlKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICAgICAgICBjb25zdCBzdG9yZXNPYmogPSB7fTtcclxuICAgICAgICAgICAgICBjb25zdCBzdG9yZXMgPSBzdG9yZU5hbWVzLm1hcChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RvcmVzT2JqW3N0b3JlTmFtZV0gPSB0eC4kc3RvcmUoc3RvcmVOYW1lKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBpZiAoY2IpIGNiLmFwcGx5KHRoaXosIHN0b3Jlcyk7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShzdG9yZXMpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgcmVqZWN0KGV2ZW50KVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBDbGF6emVyKHt9KVxyXG4gICAgICAuc3RhdGljKCckcmVhZG9ubHknLCBhY3Rpb24oaWRiVHJhbnNhY3Rpb24uVHJhbnNhY3Rpb25Nb2RlLlJlYWRPbmx5KSlcclxuICAgICAgLnN0YXRpYygnJHJlYWR3cml0ZScsIGFjdGlvbihpZGJUcmFuc2FjdGlvbi5UcmFuc2FjdGlvbk1vZGUuUmVhZFdyaXRlKSlcclxuICAgICAgLmNsYXp6XHJcblxyXG4gIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJGYWN0b3J5IHtcclxuICogICBJREJPcGVuREJSZXF1ZXN0IG9wZW4oRE9NU3RyaW5nIG5hbWUsIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgbG9uZyB2ZXJzaW9uKTtcclxuICogICBJREJPcGVuREJSZXF1ZXN0IGRlbGV0ZURhdGFiYXNlKERPTVN0cmluZyBuYW1lKTtcclxuICogICBzaG9ydCBjbXAoYW55IGZpcnN0LCBhbnkgc2Vjb25kKTtcclxuICogfTtcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCRGF0YWJhc2UgOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZyAgICAgICAgICBuYW1lO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSB1bnNpZ25lZCBsb25nIGxvbmcgdmVyc2lvbjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgICAgIG9iamVjdFN0b3JlTmFtZXM7XHJcbiAqIFxyXG4gKiAgIElEQlRyYW5zYWN0aW9uIHRyYW5zYWN0aW9uKChET01TdHJpbmcgb3Igc2VxdWVuY2U8RE9NU3RyaW5nPikgc3RvcmVOYW1lcywgb3B0aW9uYWwgSURCVHJhbnNhY3Rpb25Nb2RlIG1vZGUgPSBcInJlYWRvbmx5XCIpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGNsb3NlKCk7XHJcbiAqICAgSURCT2JqZWN0U3RvcmUgY3JlYXRlT2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUsIG9wdGlvbmFsIElEQk9iamVjdFN0b3JlUGFyYW1ldGVycyBvcHRpb25zKTtcclxuICogICB2b2lkICAgICAgICAgICBkZWxldGVPYmplY3RTdG9yZShET01TdHJpbmcgbmFtZSk7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25hYm9ydDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uY2xvc2U7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb252ZXJzaW9uY2hhbmdlO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZGljdGlvbmFyeSBJREJPYmplY3RTdG9yZVBhcmFtZXRlcnMge1xyXG4gKiAgIChET01TdHJpbmcgb3Igc2VxdWVuY2U8RE9NU3RyaW5nPik/IGtleVBhdGggPSBudWxsO1xyXG4gKiAgIGJvb2xlYW4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9JbmNyZW1lbnQgPSBmYWxzZTtcclxuICogfTttZVxyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlN0b3JlLCBpZGJNb2RlbDIsIGlkYk9wZW5EQlJlcXVlc3QsIGlkYlRyYW5zYWN0aW9uLCAkbG9nKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxuXG4gIHZhciBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XG4gIC8vIE5vIHVzZSBcImNvbnN0IGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cbiAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XG4gIHZhciBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XG4gIHZhciBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XG4gIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXG5cbiAgaWYgKCFpbmRleGVkREIpIHtcbiAgICBhbGVydCgnU3UgbmF2ZWdhZG9yIG5vIHNvcG9ydGEgdW5hIHZlcnNpw7NuIGVzdGFibGUgZGUgaW5kZXhlZERCLiBUYWwgeSBjb21vIGxhcyBjYXJhY3RlcsOtc3RpY2FzIG5vIHNlcsOhbiB2YWxpZGFzJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXG4gIC8vICRtZVxuICAvLyAkb3BlbmVkXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yICBcbiAgdmFyIGlkYiA9IGZ1bmN0aW9uIGlkYihuYW1lLCB2ZXJzaW9uLCBzb2NrZXQpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG5hbWUnLCBuYW1lKS5zdGF0aWMoJyR2ZXJzaW9uJywgdmVyc2lvbikuc3RhdGljKCckc29ja2V0Jywgc29ja2V0KS5zdGF0aWMoJyR1cGdyYWRlbmVlZGVkcycsIFtdKS5zdGF0aWMoJyRtb2RlbHMnLCBbXSk7XG4gIH07XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihpZGIpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRvYmplY3RTdG9yZU5hbWVzJywgJ29iamVjdFN0b3JlTmFtZXMnKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBFdmVudCBoYW5kbGVyc1xuICAuaGFuZGxlckV2ZW50KCckYWJvcnRlZCcsICdvbmFib3J0JykuaGFuZGxlckV2ZW50KCckY2xvc2VkJywgJ29uY2xvc2UnKS5oYW5kbGVyRXZlbnQoJyRlcnJvcicsICdvbmVycm9yJykuaGFuZGxlckV2ZW50KCckdmVyc2lvbkNoYW5nZWQnLCAnb252ZXJzaW9uY2hhbmdlJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLnN0YXRpYygnJG9wZW4nLCBmdW5jdGlvbiAobmFtZSwgdmVyc2lvbikge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJPcGVuREJSZXF1ZXN0KGluZGV4ZWREQi5vcGVuKG5hbWUsIHZlcnNpb24pKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLnN0YXRpYygnJGRyb3AnLCBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJPcGVuREJSZXF1ZXN0KGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShuYW1lKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5zdGF0aWMoJyRjbXAnLCBmdW5jdGlvbiAoZmlyc3QsIHNlY29uZCkge1xuXG4gICAgcmV0dXJuIGluZGV4ZWREQi5jbXAoZmlyc3QsIHNlY29uZCk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyR1cGdyYWRlbmVlZGVkJywgZnVuY3Rpb24gKGNiKSB7XG5cbiAgICB0aGlzLiR1cGdyYWRlbmVlZGVkcy5wdXNoKGNiKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGF1dG9taWdyYXRpb24nLCBmdW5jdGlvbiAoYWxsTWlncmF0aW9ucykge1xuXG4gICAgcmV0dXJuIHRoaXMuJHVwZ3JhZGVuZWVkZWQoZnVuY3Rpb24gKHRoaXosIG9wZW5SZXF1ZXN0LCBldmVudCkge1xuICAgICAgT2JqZWN0LmtleXMoYWxsTWlncmF0aW9ucykubWFwKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG5cbiAgICAgICAgaWYgKGV2ZW50Lm9sZFZlcnNpb24gPCB2ZXJzaW9uICYmIHZlcnNpb24gPD0gZXZlbnQubmV3VmVyc2lvbikge1xuXG4gICAgICAgICAgdmFyIG1pZ3JhdGlvbnMgPSBBcnJheS5pc0FycmF5KGFsbE1pZ3JhdGlvbnNbdmVyc2lvbl0pID8gYWxsTWlncmF0aW9uc1t2ZXJzaW9uXSA6IFthbGxNaWdyYXRpb25zW3ZlcnNpb25dXTtcblxuICAgICAgICAgICRsb2cubG9nKCdtaWdyYXRpb24gdicgKyB2ZXJzaW9uICsgJyBzdGFydHMnKTtcbiAgICAgICAgICBtaWdyYXRpb25zLm1hcChmdW5jdGlvbiAobWlncmF0aW9uKSB7XG4gICAgICAgICAgICBtaWdyYXRpb24odGhpeiwgb3BlblJlcXVlc3QsIGV2ZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkbG9nLmxvZygnbWlncmF0aW9uIHYnICsgdmVyc2lvbiArICcgZW5kcycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJG9wZW4nLCBmdW5jdGlvbiAoY2IsIGNiRXJyKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIGxhc3RScSA9IG51bGw7XG4gICAgdmFyIGxhc3RFdmVudCA9IG51bGw7XG5cbiAgICBpZiAoIXRoaXouJG9wZW5lZCkge1xuXG4gICAgICB0aGl6LiRvcGVuZWQgPSAobGFzdFJxID0gaWRiLiRvcGVuKHRoaXouJG5hbWUsIHRoaXouJHZlcnNpb24pLiR1cGdyYWRlbmVlZGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgIHRoaXouJHVwZ3JhZGVuZWVkZWRzLm1hcChmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICBjYi5hcHBseSh0aGl6LCBbdGhpeiwgbGFzdFJxLCBldmVudF0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgIGxhc3RFdmVudCA9IGV2ZW50O1xuICAgICAgICBpZiAoY2IpIGNiKHRoaXosIGxhc3RScSwgZXZlbnQpO1xuICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBsYXN0UnEgPSBudWxsO1xuICAgICAgICB0aGl6LiRvcGVuZWQgPSBudWxsO1xuICAgICAgICBpZiAoY2JFcnIpIGNiRXJyKHRoaXosIGxhc3RScSwgZXZlbnQpO1xuICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY2IpIHtcblxuICAgICAgY2IodGhpeiwgbGFzdFJxLCBsYXN0RXZlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGl6LiRvcGVuZWQ7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRkcm9wJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICB2YXIgcnEgPSBpZGIuJGRyb3AodGhpei4kbmFtZSkuJHN1Y2Nlc3MoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJlc29sdmUodGhpeik7XG4gICAgICB9KS4kZmFpbChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgcmVqZWN0KGV2ZW50KTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGNiKSBjYihycSk7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjbG9zZScsIGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuJG1lLmNsb3NlKCk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjcmVhdGVTdG9yZScsIGZ1bmN0aW9uIChuYW1lLCBvcHRpb25zKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLmNyZWF0ZU9iamVjdFN0b3JlKG5hbWUsIG9wdGlvbnMpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGRyb3BTdG9yZScsIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICB0aGlzLiRtZS5kZWxldGVPYmplY3RTdG9yZShuYW1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJG1vZGVsJywgZnVuY3Rpb24gKG5hbWUsIHNvY2tldCkge1xuXG4gICAgLy8gU2kgZXhpc3RlIGVsIG1vZGVsbyByZXRvcm5hcmxvXG4gICAgaWYgKHRoaXMuJG1vZGVsc1tuYW1lXSkgcmV0dXJuIHRoaXMuJG1vZGVsc1tuYW1lXTtcblxuICAgIC8vIEluc3RhbmNpYXIgZWwgbW9kZWxvIHkgZ3VhcmRhcmxvXG4gICAgcmV0dXJuIHRoaXMuJG1vZGVsc1tuYW1lXSA9IGlkYk1vZGVsMih0aGlzLCBuYW1lLCBzb2NrZXQgfHwgdGhpcy4kc29ja2V0KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHRyYW5zYWN0aW9uJywgZnVuY3Rpb24gKHN0b3JlTmFtZXMsIG1vZGUpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdGhpei4kb3BlbigpLnRoZW4oZnVuY3Rpb24gKHRoaXopIHtcbiAgICAgICAgcmVzb2x2ZShuZXcgaWRiVHJhbnNhY3Rpb24odGhpei4kbWUudHJhbnNhY3Rpb24oc3RvcmVOYW1lcywgbW9kZSkpKTtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZWplY3QoZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRzdG9yZScsIGZ1bmN0aW9uIChzdG9yZU5hbWVzKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShzdG9yZU5hbWVzKSkgc3RvcmVOYW1lcyA9IFtzdG9yZU5hbWVzXTtcblxuICAgIGZ1bmN0aW9uIGFjdGlvbihtb2RlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICB0aGl6LiR0cmFuc2FjdGlvbihzdG9yZU5hbWVzLCBtb2RlKS50aGVuKGZ1bmN0aW9uICh0eCkge1xuICAgICAgICAgICAgdmFyIHN0b3Jlc09iaiA9IHt9O1xuICAgICAgICAgICAgdmFyIHN0b3JlcyA9IHN0b3JlTmFtZXMubWFwKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHN0b3Jlc09ialtzdG9yZU5hbWVdID0gdHguJHN0b3JlKHN0b3JlTmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChjYikgY2IuYXBwbHkodGhpeiwgc3RvcmVzKTtcbiAgICAgICAgICAgIHJlc29sdmUoc3RvcmVzKTtcbiAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJlamVjdChldmVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENsYXp6ZXIoe30pLnN0YXRpYygnJHJlYWRvbmx5JywgYWN0aW9uKGlkYlRyYW5zYWN0aW9uLlRyYW5zYWN0aW9uTW9kZS5SZWFkT25seSkpLnN0YXRpYygnJHJlYWR3cml0ZScsIGFjdGlvbihpZGJUcmFuc2FjdGlvbi5UcmFuc2FjdGlvbk1vZGUuUmVhZFdyaXRlKSkuY2xheno7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYlN0b3JlXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQk9iamVjdFN0b3JlIHtcclxuICogICAgICAgICAgICBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAga2V5UGF0aDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgaW5kZXhOYW1lcztcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb24gdHJhbnNhY3Rpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGJvb2xlYW4gICAgICAgIGF1dG9JbmNyZW1lbnQ7XHJcbiAqIFxyXG4gKiAgIElEQlJlcXVlc3QgcHV0KGFueSB2YWx1ZSwgb3B0aW9uYWwgYW55IGtleSk7XHJcbiAqICAgSURCUmVxdWVzdCBhZGQoYW55IHZhbHVlLCBvcHRpb25hbCBhbnkga2V5KTtcclxuICogICBJREJSZXF1ZXN0IGRlbGV0ZShhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgY2xlYXIoKTtcclxuICogICBJREJSZXF1ZXN0IGdldChhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0S2V5KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGwob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbEtleXMob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGNvdW50KG9wdGlvbmFsIGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuQ3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5LZXlDdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiAgIElEQkluZGV4ICAgaW5kZXgoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIElEQkluZGV4ICAgY3JlYXRlSW5kZXgoRE9NU3RyaW5nIG5hbWUsIChET01TdHJpbmcgb3Igc2VxdWVuY2U8RE9NU3RyaW5nPikga2V5UGF0aCwgb3B0aW9uYWwgSURCSW5kZXhQYXJhbWV0ZXJzIG9wdGlvbnMpO1xyXG4gKiAgIHZvaWQgICAgICAgZGVsZXRlSW5kZXgoRE9NU3RyaW5nIGluZGV4TmFtZSk7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBkaWN0aW9uYXJ5IElEQkluZGV4UGFyYW1ldGVycyB7XHJcbiAqICAgYm9vbGVhbiB1bmlxdWUgPSBmYWxzZTtcclxuICogICBib29sZWFuIG11bHRpRW50cnkgPSBmYWxzZTtcclxuICogfTtcclxuICogXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiUmVxdWVzdCkgeyAnbmdJbmplY3QnO1xyXG5cclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlN0b3JlIChtZSkge1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJG5hbWUnLCAnbmFtZScpXHJcbiAgLmdldHRlcignJGtleVBhdGgnLCAna2V5UGF0aCcpXHJcbiAgLmdldHRlcignJGluZGV4TmFtZXMnLCAnaW5kZXhOYW1lcycpXHJcbiAgLmdldHRlcignJHRyYW5zYWN0aW9uJywgJ3RyYW5zYWN0aW9uJylcclxuICAuZ2V0dGVyKCckYXV0b0luY3JlbWVudCcsICdhdXRvSW5jcmVtZW50JylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHB1dCcsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLnB1dCh2YWx1ZSwga2V5KSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRhZGQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5hZGQodmFsdWUsIGtleSkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZGVsZXRlJywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmRlbGV0ZShxdWVyeSkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckY2xlYXInLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNsZWFyKCkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZ2V0JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldChxdWVyeSkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZ2V0S2V5JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldEtleShxdWVyeSkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZ2V0QWxsJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRBbGwocXVlcnksIGNvdW50KSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRnZXRBbGxLZXlzJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRBbGxLZXlzKHF1ZXJ5LCBjb3VudCkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckY291bnQnLCBmdW5jdGlvbiAocXVlcnkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuY291bnQocXVlcnkpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJG9wZW5DdXJzb3InLCBmdW5jdGlvbiAocXVlcnksIGRpcmVjdGlvbikge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5vcGVuQ3Vyc29yKHF1ZXJ5LCBkaXJlY3Rpb24pKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJG9wZW5LZXlDdXJzb3InLCBmdW5jdGlvbiAocXVlcnksIGRpcmVjdGlvbikge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5vcGVuS2V5Q3Vyc29yKHF1ZXJ5LCBkaXJlY3Rpb24pKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGluZGV4JywgZnVuY3Rpb24gKG5hbWUpIHtcclxuXHJcbiAgICB0aHJvdyAnaWRiU3RvcmUucHJvdG90eXBlLmluZGV4JztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNyZWF0ZUluZGV4JywgZnVuY3Rpb24gKG5hbWUsIGtleVBhdGgsIG9wdGlvbnMpIHtcclxuXHJcbiAgICB0aHJvdyAnaWRiU3RvcmUucHJvdG90eXBlLmNyZWF0ZUluZGV4JztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGRlbGV0ZUluZGV4JywgZnVuY3Rpb24gKGluZGV4TmFtZSkge1xyXG5cclxuICAgIHRoaXMuJG1lLmRlbGV0ZUluZGV4KGluZGV4TmFtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJTdG9yZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYlN0b3JlXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQk9iamVjdFN0b3JlIHtcclxuICogICAgICAgICAgICBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAga2V5UGF0aDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgaW5kZXhOYW1lcztcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb24gdHJhbnNhY3Rpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGJvb2xlYW4gICAgICAgIGF1dG9JbmNyZW1lbnQ7XHJcbiAqIFxyXG4gKiAgIElEQlJlcXVlc3QgcHV0KGFueSB2YWx1ZSwgb3B0aW9uYWwgYW55IGtleSk7XHJcbiAqICAgSURCUmVxdWVzdCBhZGQoYW55IHZhbHVlLCBvcHRpb25hbCBhbnkga2V5KTtcclxuICogICBJREJSZXF1ZXN0IGRlbGV0ZShhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgY2xlYXIoKTtcclxuICogICBJREJSZXF1ZXN0IGdldChhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0S2V5KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGwob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbEtleXMob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGNvdW50KG9wdGlvbmFsIGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuQ3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5LZXlDdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiAgIElEQkluZGV4ICAgaW5kZXgoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIElEQkluZGV4ICAgY3JlYXRlSW5kZXgoRE9NU3RyaW5nIG5hbWUsIChET01TdHJpbmcgb3Igc2VxdWVuY2U8RE9NU3RyaW5nPikga2V5UGF0aCwgb3B0aW9uYWwgSURCSW5kZXhQYXJhbWV0ZXJzIG9wdGlvbnMpO1xyXG4gKiAgIHZvaWQgICAgICAgZGVsZXRlSW5kZXgoRE9NU3RyaW5nIGluZGV4TmFtZSk7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBkaWN0aW9uYXJ5IElEQkluZGV4UGFyYW1ldGVycyB7XHJcbiAqICAgYm9vbGVhbiB1bmlxdWUgPSBmYWxzZTtcclxuICogICBib29sZWFuIG11bHRpRW50cnkgPSBmYWxzZTtcclxuICogfTtcclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiUmVxdWVzdCkge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiU3RvcmUobWUpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRuYW1lJywgJ25hbWUnKS5nZXR0ZXIoJyRrZXlQYXRoJywgJ2tleVBhdGgnKS5nZXR0ZXIoJyRpbmRleE5hbWVzJywgJ2luZGV4TmFtZXMnKS5nZXR0ZXIoJyR0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpLmdldHRlcignJGF1dG9JbmNyZW1lbnQnLCAnYXV0b0luY3JlbWVudCcpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRwdXQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLnB1dCh2YWx1ZSwga2V5KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRhZGQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmFkZCh2YWx1ZSwga2V5KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRkZWxldGUnLCBmdW5jdGlvbiAocXVlcnkpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5kZWxldGUocXVlcnkpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGNsZWFyJywgZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNsZWFyKCkpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZ2V0JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0KHF1ZXJ5KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRnZXRLZXknLCBmdW5jdGlvbiAocXVlcnkpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRLZXkocXVlcnkpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGdldEFsbCcsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRBbGwocXVlcnksIGNvdW50KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRnZXRBbGxLZXlzJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldEFsbEtleXMocXVlcnksIGNvdW50KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjb3VudCcsIGZ1bmN0aW9uIChxdWVyeSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNvdW50KHF1ZXJ5KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRvcGVuQ3Vyc29yJywgZnVuY3Rpb24gKHF1ZXJ5LCBkaXJlY3Rpb24pIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5vcGVuQ3Vyc29yKHF1ZXJ5LCBkaXJlY3Rpb24pKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJG9wZW5LZXlDdXJzb3InLCBmdW5jdGlvbiAocXVlcnksIGRpcmVjdGlvbikge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLm9wZW5LZXlDdXJzb3IocXVlcnksIGRpcmVjdGlvbikpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckaW5kZXgnLCBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgdGhyb3cgJ2lkYlN0b3JlLnByb3RvdHlwZS5pbmRleCc7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjcmVhdGVJbmRleCcsIGZ1bmN0aW9uIChuYW1lLCBrZXlQYXRoLCBvcHRpb25zKSB7XG5cbiAgICB0aHJvdyAnaWRiU3RvcmUucHJvdG90eXBlLmNyZWF0ZUluZGV4JztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGRlbGV0ZUluZGV4JywgZnVuY3Rpb24gKGluZGV4TmFtZSkge1xuXG4gICAgdGhpcy4kbWUuZGVsZXRlSW5kZXgoaW5kZXhOYW1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJTdG9yZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJNb2RlbFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBsYlJlc291cmNlLCAkdGltZW91dCwgaWRiRXZlbnRUYXJnZXQpIHsgJ25nSW5qZWN0JztcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIEJ1c2NhciB1biBjYW1wb1xyXG5jb25zdCBkZWVwRmllbGQgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgY2IpIHtcclxuXHJcbiAgY29uc3QgZmllbGRzID0gZmllbGQuc3BsaXQoJy4nKTtcclxuICBjb25zdCBsYXN0RmllbGQgPSBmaWVsZHMucG9wKCk7XHJcblxyXG4gIHJldHVybiAoZnVuY3Rpb24gX3NldChvYmopIHtcclxuICAgIGlmIChmaWVsZHMubGVuZ3RoID09IDApXHJcbiAgICAgIHJldHVybiBjYihvYmosIGxhc3RGaWVsZCk7XHJcbiAgICBjb25zdCBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xyXG4gICAgaWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAndW5kZWZpbmVkJylcclxuICAgICAgb2JqW2ZpZWxkXSA9IHt9O1xyXG4gICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XHJcbiAgfSkob2JqKTtcclxuXHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cclxuY29uc3QgZ2V0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIChvYmosIGZpZWxkKSB7XHJcbiAgcmV0dXJuIGRlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcclxuICB9KTtcclxufTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xyXG5jb25zdCBzZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gKG9iaiwgZmllbGQsIHZhbHVlKSB7XHJcbiAgZGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgb2JqW2xhc3RGaWVsZF0gPSB2YWx1ZTtcclxuICB9KTtcclxuICByZXR1cm4gb2JqO1xyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxucmV0dXJuIGZ1bmN0aW9uIGlkYk1vZGVsRmFjdG9yeSAoZGIsIG5hbWUsIHNvY2tldCkge1xyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXHJcbiAgLy8gJF9yZW1vdGVcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBmdW5jdGlvbiBpZGJNb2RlbCgpIHtcclxuICB9XHJcbiAgXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihpZGJNb2RlbClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAuaW5oZXJpdChpZGJFdmVudFRhcmdldClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAvLyAuaW5oZXJpdChFdmVudFRhcmdldClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJvcGllZGFkZXMgc3RhdGljYXNcclxuICAuc3RhdGljKCckZGInLCBkYilcclxuICAuc3RhdGljKCckbmFtZScsIG5hbWUpXHJcbiAgLnN0YXRpYygnJHNvY2tldCcsIHNvY2tldClcclxuXHJcbiAgLnN0YXRpYygnJGlkJywgeyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OiB0cnVlIH0pXHJcbiAgLnN0YXRpYygnJGZpZWxkcycsIHt9KVxyXG4gIC5zdGF0aWMoJyRpbnN0YW5jZXMnLCB7fSlcclxuICAgIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRnZXRLZXlGcm9tJywgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsIHRoaXMuJGlkLmtleVBhdGgpO1xyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRzZXRLZXlQYXRoJywgZnVuY3Rpb24gKGtleVBhdGgpIHtcclxuXHJcbiAgICB0aGlzLiRpZC5rZXlQYXRoID0ga2V5UGF0aDtcclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckc2V0QXV0b0luY3JlbWVudCcsIGZ1bmN0aW9uIChhdXRvSW5jcmVtZW50KSB7XHJcblxyXG4gICAgdGhpcy4kaWQuYXV0b0luY3JlbWVudCA9IGF1dG9JbmNyZW1lbnQ7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGNyZWF0ZVN0b3JlJywgZnVuY3Rpb24gKGNiKSB7XHJcblxyXG4gICAgY29uc3Qgc3RvcmUgPSB0aGlzLiRkYi4kY3JlYXRlU3RvcmUodGhpcy4kbmFtZSwgdGhpcy4kaWQpO1xyXG5cclxuICAgIGlmIChjYikgY2IodGhpcywgc3RvcmUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckcHV0JywgZnVuY3Rpb24gKG9iaiwga2V5KSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIHJldHVybiB0aGl6LiRkYi4kc3RvcmUodGhpei4kbmFtZSkuJHJlYWR3cml0ZSgpXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChzdG9yZXMpIHtcclxuICAgICAgICByZXR1cm4gc3RvcmVzW3RoaXouJG5hbWVdLnB1dChvYmosIGtleSkuJHByb21pc2U7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0SW5zdGFuY2UnLCBmdW5jdGlvbiAoa2V5KSB7XHJcblxyXG4gICAgLy8gRWwgb2JqZXRvIG5vIHRpZW5lIElEXHJcbiAgICBpZiAoIWtleSkge1xyXG4gICAgICByZXR1cm4gbmV3IHRoaXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBObyBleGlzdGUgbGEgaW5zdGFuY2lhIGVudG9uY2Ugc2UgY3JlYVxyXG4gICAgaWYgKCF0aGlzLiRpbnN0YW5jZXNba2V5XSl7XHJcbiAgICAgIHRoaXMuJGluc3RhbmNlc1trZXldID0gbmV3IE1vZGVsKCk7XHJcbiAgICAgIHRoaXMuJGluc3RhbmNlc1trZXldXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzLiRpbnN0YW5jZXNba2V5XTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXNpZ25hIGxhIGVzcGVjaWZpY2FjacOzbiBkZSBsb3MgY2FtcG9zXHJcbiAgLnN0YXRpYygnJGZpZWxkJywgZnVuY3Rpb24gKG5hbWUsIGZpZWxkKSB7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgZmllbGQgPSB7IFwidHlwZVwiOiBmaWVsZCB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZpZWxkLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgIHRoaXMuJGZpZWxkc1tuYW1lXSA9IGZpZWxkO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBZ3JlZ2EgZWwgZWwgY2FtcG8gSUQgYXV0b21hdGljYW1lbnRlXHJcbiAgLnN0YXRpYygnJGlkSW5qZWN0JywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHRoaXMuZmllbGQoJ25hbWUnLCB7XHJcbiAgICAgIGlkOiB0cnVlLFxyXG4gICAgICB0eXBlOiAnbnVtYmVyJ1xyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFncmVnYSBlbCBlbCBjYW1wbyBJRCBhdXRvbWF0aWNhbWVudGVcclxuICAuc3RhdGljKCckYnVpbGQnLCBmdW5jdGlvbiAoYnVpbGRDYWxsYmFjaykge1xyXG5cclxuICAgIGJ1aWxkQ2FsbGJhY2sodGhpcyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGlcclxuICAuc3RhdGljKCckcmVtb3RlJywgZnVuY3Rpb24gKHVybCwgYXJncywgYWN0aW9ucykge1xyXG5cclxuICAgIHRoaXMuJF9yZW1vdGUgPSBsYlJlc291cmNlKHVybCwgYXJncywgYWN0aW9ucyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxyXG4gIC5tZXRob2QoJyRnZXQnLCBmdW5jdGlvbiAoZmllbGQpIHtcclxuXHJcbiAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFzaWduYSBpbiB2YWxvciBhIHVuIGNhbXBvXHJcbiAgLm1ldGhvZCgnJHNldCcsIGZ1bmN0aW9uIChmaWVsZCwgdmFsdWUpIHtcclxuXHJcbiAgICByZXR1cm4gc2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcclxuICAubWV0aG9kKCckZ2V0VmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgXHJcbiAgICBjb25zdCB2YWx1ZXMgPSB7fTtcclxuICAgIGRhdGEgPSBkYXRhIHx8IHRoaXM7XHJcblxyXG4gICAgT2JqZWN0LmtleXMoaWRiTW9kZWwuJGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICBzZXRGaWVsZFZhbHVlKHZhbHVlcywgZmllbGQsIGdldEZpZWxkVmFsdWUoZGF0YSwgZmllbGQpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB2YWx1ZXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRrZXknLCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgIHJldHVybiB0aGlzLiRnZXQoaWRiTW9kZWwuJGlkLmtleVBhdGgpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBGdW5jaW9uIHF1ZSBoYWNlIGVzY3VjaGFycyBsb3MgbWVuc2FqZXMgZGVsIHNvY2tldCBwYXJhIGVsIG1vZGVsXHJcbiAgLm1ldGhvZCgnJGxpc3RlbicsIGZ1bmN0aW9uIChkYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgaWYgKCF0aGlzLiRzb2NrZXQpIHRocm93IG5ldyBFcnJvcignaWRiTW9kZWwuRG9lc05vdEhhdmVTb2NrZXRJbnN0YW5jZScpO1xyXG5cclxuICAgIC8vIENyZWFyIHVuYSBzdWJzY3JpcGNpb24gYWwgc29ja2V0IHBhcmEgY3VhbmRvIHNlIHJlY2liYW4gZGF0b3NcclxuICAgIC8vIHBhcmEgbGEgaW5zdGFuY2lhIGFjdHVhbFxyXG4gICAgdGhpcy4kc29ja2V0LnN1YnNjcmliZSh7XHJcbiAgICAgIG1vZGVsTmFtZTogaWRiTW9kZWwuJG5hbWUsXHJcbiAgICAgIGV2ZW50TmFtZTogJ3VwZGF0ZScsXHJcbiAgICAgIG1vZGVsSWQ6IHRoaXouJGtleSgpLFxyXG4gICAgfSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgIC8vIEEgcmVjaWJpciBkYXRvcyBkZWwgc29ja2V0IGFzaWduYXIgbG9zIHZhbG9yZXNcclxuICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIEVtaXRpciBldmVudG8gZGUgZGF0b3MgcmVjaWJpZG9yIHBhcmEgZWwgbW9kZWxvXHJcbiAgICAgICAgdGhpei4kc2V0UmVtb3RlVmFsdWVzKGRhdGEudmFsdWVzLCBkYXRhLnZlcnNpb24pO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn07fVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYk1vZGVsLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiTW9kZWxcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgbGJSZXNvdXJjZSwgJHRpbWVvdXQsIGlkYkV2ZW50VGFyZ2V0KSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQnVzY2FyIHVuIGNhbXBvXG5cbiAgdmFyIGRlZXBGaWVsZCA9IGZ1bmN0aW9uIGRlZXBGaWVsZChvYmosIGZpZWxkLCBjYikge1xuXG4gICAgdmFyIGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XG4gICAgdmFyIGxhc3RGaWVsZCA9IGZpZWxkcy5wb3AoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiBfc2V0KG9iaikge1xuICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMCkgcmV0dXJuIGNiKG9iaiwgbGFzdEZpZWxkKTtcbiAgICAgIHZhciBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xuICAgICAgaWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAndW5kZWZpbmVkJykgb2JqW2ZpZWxkXSA9IHt9O1xuICAgICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XG4gICAgfShvYmopO1xuICB9O1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xuICB2YXIgZ2V0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIGdldEZpZWxkVmFsdWUob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBkZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXG4gIHZhciBzZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gc2V0RmllbGRWYWx1ZShvYmosIGZpZWxkLCB2YWx1ZSkge1xuICAgIGRlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgIG9ialtsYXN0RmllbGRdID0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICByZXR1cm4gZnVuY3Rpb24gaWRiTW9kZWxGYWN0b3J5KGRiLCBuYW1lLCBzb2NrZXQpIHtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXG4gICAgLy8gJF9yZW1vdGVcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGZ1bmN0aW9uIGlkYk1vZGVsKCkge31cblxuICAgIHJldHVybiBuZXdcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBDb25zdHJ1Y3RvclxuICAgIENsYXp6ZXIoaWRiTW9kZWwpXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBIZXJlbmNpYVxuICAgIC5pbmhlcml0KGlkYkV2ZW50VGFyZ2V0KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSGVyZW5jaWFcbiAgICAvLyAuaW5oZXJpdChFdmVudFRhcmdldClcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFByb3BpZWRhZGVzIHN0YXRpY2FzXG4gICAgLnN0YXRpYygnJGRiJywgZGIpLnN0YXRpYygnJG5hbWUnLCBuYW1lKS5zdGF0aWMoJyRzb2NrZXQnLCBzb2NrZXQpLnN0YXRpYygnJGlkJywgeyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OiB0cnVlIH0pLnN0YXRpYygnJGZpZWxkcycsIHt9KS5zdGF0aWMoJyRpbnN0YW5jZXMnLCB7fSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXRLZXlGcm9tJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsIHRoaXMuJGlkLmtleVBhdGgpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckc2V0S2V5UGF0aCcsIGZ1bmN0aW9uIChrZXlQYXRoKSB7XG5cbiAgICAgIHRoaXMuJGlkLmtleVBhdGggPSBrZXlQYXRoO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRzZXRBdXRvSW5jcmVtZW50JywgZnVuY3Rpb24gKGF1dG9JbmNyZW1lbnQpIHtcblxuICAgICAgdGhpcy4kaWQuYXV0b0luY3JlbWVudCA9IGF1dG9JbmNyZW1lbnQ7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGNyZWF0ZVN0b3JlJywgZnVuY3Rpb24gKGNiKSB7XG5cbiAgICAgIHZhciBzdG9yZSA9IHRoaXMuJGRiLiRjcmVhdGVTdG9yZSh0aGlzLiRuYW1lLCB0aGlzLiRpZCk7XG5cbiAgICAgIGlmIChjYikgY2IodGhpcywgc3RvcmUpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJHB1dCcsIGZ1bmN0aW9uIChvYmosIGtleSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICByZXR1cm4gdGhpei4kZGIuJHN0b3JlKHRoaXouJG5hbWUpLiRyZWFkd3JpdGUoKS50aGVuKGZ1bmN0aW9uIChzdG9yZXMpIHtcbiAgICAgICAgcmV0dXJuIHN0b3Jlc1t0aGl6LiRuYW1lXS5wdXQob2JqLCBrZXkpLiRwcm9taXNlO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXRJbnN0YW5jZScsIGZ1bmN0aW9uIChrZXkpIHtcblxuICAgICAgLy8gRWwgb2JqZXRvIG5vIHRpZW5lIElEXG4gICAgICBpZiAoIWtleSkge1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoKTtcbiAgICAgIH1cblxuICAgICAgLy8gTm8gZXhpc3RlIGxhIGluc3RhbmNpYSBlbnRvbmNlIHNlIGNyZWFcbiAgICAgIGlmICghdGhpcy4kaW5zdGFuY2VzW2tleV0pIHtcbiAgICAgICAgdGhpcy4kaW5zdGFuY2VzW2tleV0gPSBuZXcgTW9kZWwoKTtcbiAgICAgICAgdGhpcy4kaW5zdGFuY2VzW2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLiRpbnN0YW5jZXNba2V5XTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQXNpZ25hIGxhIGVzcGVjaWZpY2FjacOzbiBkZSBsb3MgY2FtcG9zXG4gICAgLnN0YXRpYygnJGZpZWxkJywgZnVuY3Rpb24gKG5hbWUsIGZpZWxkKSB7XG5cbiAgICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGZpZWxkID0geyBcInR5cGVcIjogZmllbGQgfTtcbiAgICAgIH1cblxuICAgICAgZmllbGQubmFtZSA9IG5hbWU7XG5cbiAgICAgIHRoaXMuJGZpZWxkc1tuYW1lXSA9IGZpZWxkO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQWdyZWdhIGVsIGVsIGNhbXBvIElEIGF1dG9tYXRpY2FtZW50ZVxuICAgIC5zdGF0aWMoJyRpZEluamVjdCcsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgdGhpcy5maWVsZCgnbmFtZScsIHtcbiAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQWdyZWdhIGVsIGVsIGNhbXBvIElEIGF1dG9tYXRpY2FtZW50ZVxuICAgIC5zdGF0aWMoJyRidWlsZCcsIGZ1bmN0aW9uIChidWlsZENhbGxiYWNrKSB7XG5cbiAgICAgIGJ1aWxkQ2FsbGJhY2sodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGlcbiAgICAuc3RhdGljKCckcmVtb3RlJywgZnVuY3Rpb24gKHVybCwgYXJncywgYWN0aW9ucykge1xuXG4gICAgICB0aGlzLiRfcmVtb3RlID0gbGJSZXNvdXJjZSh1cmwsIGFyZ3MsIGFjdGlvbnMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcbiAgICAubWV0aG9kKCckZ2V0JywgZnVuY3Rpb24gKGZpZWxkKSB7XG5cbiAgICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKHRoaXMsIGZpZWxkKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cbiAgICAubWV0aG9kKCckc2V0JywgZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkge1xuXG4gICAgICByZXR1cm4gc2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcbiAgICAubWV0aG9kKCckZ2V0VmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgdmFyIHZhbHVlcyA9IHt9O1xuICAgICAgZGF0YSA9IGRhdGEgfHwgdGhpcztcblxuICAgICAgT2JqZWN0LmtleXMoaWRiTW9kZWwuJGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBzZXRGaWVsZFZhbHVlKHZhbHVlcywgZmllbGQsIGdldEZpZWxkVmFsdWUoZGF0YSwgZmllbGQpKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCcka2V5JywgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgcmV0dXJuIHRoaXMuJGdldChpZGJNb2RlbC4kaWQua2V5UGF0aCk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEZ1bmNpb24gcXVlIGhhY2UgZXNjdWNoYXJzIGxvcyBtZW5zYWplcyBkZWwgc29ja2V0IHBhcmEgZWwgbW9kZWxcbiAgICAubWV0aG9kKCckbGlzdGVuJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlmICghdGhpcy4kc29ja2V0KSB0aHJvdyBuZXcgRXJyb3IoJ2lkYk1vZGVsLkRvZXNOb3RIYXZlU29ja2V0SW5zdGFuY2UnKTtcblxuICAgICAgLy8gQ3JlYXIgdW5hIHN1YnNjcmlwY2lvbiBhbCBzb2NrZXQgcGFyYSBjdWFuZG8gc2UgcmVjaWJhbiBkYXRvc1xuICAgICAgLy8gcGFyYSBsYSBpbnN0YW5jaWEgYWN0dWFsXG4gICAgICB0aGlzLiRzb2NrZXQuc3Vic2NyaWJlKHtcbiAgICAgICAgbW9kZWxOYW1lOiBpZGJNb2RlbC4kbmFtZSxcbiAgICAgICAgZXZlbnROYW1lOiAndXBkYXRlJyxcbiAgICAgICAgbW9kZWxJZDogdGhpei4ka2V5KClcbiAgICAgIH0sIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgLy8gQSByZWNpYmlyIGRhdG9zIGRlbCBzb2NrZXQgYXNpZ25hciBsb3MgdmFsb3Jlc1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gRW1pdGlyIGV2ZW50byBkZSBkYXRvcyByZWNpYmlkb3IgcGFyYSBlbCBtb2RlbG9cbiAgICAgICAgICB0aGl6LiRzZXRSZW1vdGVWYWx1ZXMoZGF0YS52YWx1ZXMsIGRhdGEudmVyc2lvbik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5jbGF6ejtcbiAgfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiTW9kZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaW8sICRsb2cpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcclxuICAvLyAkc29ja2V0XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgY29uc3QgaWRiU29ja2V0ID0gZnVuY3Rpb24gaWRiU29ja2V0KHVybCwgJGFjY2Vzc1Rva2VuSWQsICRjdXJyZW50VXNlcklkKXtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKVxyXG4gICAgICAuc3RhdGljKCckdXJsJywgdXJsIHx8IGlkYlNvY2tldC4kZGVmVXJsU2VydmVyKVxyXG4gICAgICAuc3RhdGljKCckYWNjZXNzVG9rZW5JZCcsIGFjY2Vzc1Rva2VuSWQgfHwgaWRiU29ja2V0LiRkZWZBY2Nlc3NUb2tlbklkKVxyXG4gICAgICAuc3RhdGljKCckY3VycmVudFVzZXJJZCcsIGN1cnJlbnRVc2VySWQgfHwgaWRiU29ja2V0LiRkZWZDdXJyZW50VXNlcklkKVxyXG4gICAgICBcclxuICAgICAgLnN0YXRpYygnJGxpc3RlbmVycycsIFtdKTtcclxuXHJcbiAgICB0aGl6LiRjb25uZWN0KCk7XHJcblxyXG4gIH07XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoaWRiU29ja2V0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXHJcbiAgLm1ldGhvZCgnJGNvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8gQ3JlYXRpbmcgY29ubmVjdGlvbiB3aXRoIHNlcnZlclxyXG4gICAgY29uc3Qgc29ja2V0ID0gdGhpcy4kc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsKTtcclxuXHJcbiAgICAvLyBUaGlzIHBhcnQgaXMgb25seSBmb3IgbG9naW4gdXNlcnMgZm9yIGF1dGhlbnRpY2F0ZWQgJHNvY2tldCBjb25uZWN0aW9uIGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIuXHJcbiAgICAvLyBJZiB5b3UgYXJlIG5vdCB1c2luZyBsb2dpbiBwYWdlIGluIHlvdSB3ZWJzaXRlIHRoZW4geW91IHNob3VsZCByZW1vdmUgcmVzdCBwaWVjZSBvZiBjb2RlLi5cclxuICAgIHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICRsb2cubG9nKCdjb25uZWN0ZWQnKTtcclxuXHJcbiAgICAgIHNvY2tldC5lbWl0KCdhdXRoZW50aWNhdGlvbicsIHtcclxuICAgICAgICBpZDogdGhpcy4kYWNjZXNzVG9rZW5JZCxcclxuICAgICAgICB1c2VySWQ6IHRoaXMuJGN1cnJlbnRVc2VySWQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgc29ja2V0Lm9uKCdhdXRoZW50aWNhdGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gdXNlIHRoZSAkc29ja2V0IGFzIHVzdWFsXHJcbiAgICAgICAgJGxvZy5sb2coJ1VzZXIgaXMgYXV0aGVudGljYXRlZCcpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHN1YnNjcmliZScsIGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xyXG5cclxuICAgIGxldCBuYW1lID0gb3B0aW9ucy5tb2RlbE5hbWUgKyAnLicgKyBvcHRpb25zLmV2ZW50TmFtZTtcclxuXHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMubW9kZWxJZCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbmFtZSA9IG5hbWUgKyAnLicgKyBvcHRpb25zLm1vZGVsSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy4kc29ja2V0Lm9uKG5hbWUsIGNiKTtcclxuICAgIFxyXG4gICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxyXG4gICAgdGhpcy4kcHVzaExpc3RlbmVyKG5hbWUsIGNiKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHB1c2hMaXN0ZW5lcicsIGZ1bmN0aW9uIChuYW1lLCBjYikge1xyXG5cclxuICAgIHRoaXMuJGxpc3RlbmVycy5wdXNoKG5hbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckdW5zdWJzY3JpYmUnLGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lKSB7XHJcblxyXG4gICAgdGhpcy4kc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTsgIFxyXG4gICAgdmFyIGlkeCA9IHRoaXMuJGxpc3RlbmVycy5pbmRleE9mKHN1YnNjcmlwdGlvbk5hbWUpO1xyXG4gICAgaWYgKGlkeCAhPSAtMSl7XHJcbiAgICAgIHRoaXMuJGxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXNpZ25hIGxhIFVSTCBkZSBzZXJ2aWRvciBwb3IgZGVmZWN0b1xyXG4gIC5zdGF0aWMoJyRzZXRVcmxTZXJ2ZXInLCBmdW5jdGlvbiAodXJsKSB7XHJcblxyXG4gICAgdGhpcy4kZGVmVXJsU2VydmVyID0gdXJsO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXHJcbiAgLnN0YXRpYygnJHNldENyZWRlbnRpYWxzJywgZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIGN1cnJlbnRVc2VySWQpIHtcclxuXHJcbiAgICB0aGlzLiRkZWZBY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcclxuICAgIHRoaXMuJGRlZkN1cnJlbnRVc2VySWQgPSBjdXJyZW50VXNlcklkO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6elxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuJHNldFVybFNlcnZlcihudWxsKVxyXG4gIC4kc2V0Q3JlZGVudGlhbHMobnVsbCwgbnVsbCk7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiU29ja2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaW8sICRsb2cpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJHNvY2tldFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuXG4gIHZhciBpZGJTb2NrZXQgPSBmdW5jdGlvbiBpZGJTb2NrZXQodXJsLCAkYWNjZXNzVG9rZW5JZCwgJGN1cnJlbnRVc2VySWQpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJHVybCcsIHVybCB8fCBpZGJTb2NrZXQuJGRlZlVybFNlcnZlcikuc3RhdGljKCckYWNjZXNzVG9rZW5JZCcsIGFjY2Vzc1Rva2VuSWQgfHwgaWRiU29ja2V0LiRkZWZBY2Nlc3NUb2tlbklkKS5zdGF0aWMoJyRjdXJyZW50VXNlcklkJywgY3VycmVudFVzZXJJZCB8fCBpZGJTb2NrZXQuJGRlZkN1cnJlbnRVc2VySWQpLnN0YXRpYygnJGxpc3RlbmVycycsIFtdKTtcblxuICAgIHRoaXouJGNvbm5lY3QoKTtcbiAgfTtcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGlkYlNvY2tldClcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uZWN0YXJzZSBhbCBzZXJ2aWRvclxuICAubWV0aG9kKCckY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcblxuICAgIC8vIENyZWF0aW5nIGNvbm5lY3Rpb24gd2l0aCBzZXJ2ZXJcbiAgICB2YXIgc29ja2V0ID0gdGhpcy4kc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsKTtcblxuICAgIC8vIFRoaXMgcGFydCBpcyBvbmx5IGZvciBsb2dpbiB1c2VycyBmb3IgYXV0aGVudGljYXRlZCAkc29ja2V0IGNvbm5lY3Rpb24gYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlci5cbiAgICAvLyBJZiB5b3UgYXJlIG5vdCB1c2luZyBsb2dpbiBwYWdlIGluIHlvdSB3ZWJzaXRlIHRoZW4geW91IHNob3VsZCByZW1vdmUgcmVzdCBwaWVjZSBvZiBjb2RlLi5cbiAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkbG9nLmxvZygnY29ubmVjdGVkJyk7XG5cbiAgICAgIHNvY2tldC5lbWl0KCdhdXRoZW50aWNhdGlvbicsIHtcbiAgICAgICAgaWQ6IHRoaXMuJGFjY2Vzc1Rva2VuSWQsXG4gICAgICAgIHVzZXJJZDogdGhpcy4kY3VycmVudFVzZXJJZFxuICAgICAgfSk7XG5cbiAgICAgIHNvY2tldC5vbignYXV0aGVudGljYXRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdXNlIHRoZSAkc29ja2V0IGFzIHVzdWFsXG4gICAgICAgICRsb2cubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckc3Vic2NyaWJlJywgZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XG5cbiAgICB2YXIgbmFtZSA9IG9wdGlvbnMubW9kZWxOYW1lICsgJy4nICsgb3B0aW9ucy5ldmVudE5hbWU7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMubW9kZWxJZCA9PT0gJ251bWJlcicpIHtcbiAgICAgIG5hbWUgPSBuYW1lICsgJy4nICsgb3B0aW9ucy5tb2RlbElkO1xuICAgIH1cblxuICAgIHRoaXMuJHNvY2tldC5vbihuYW1lLCBjYik7XG5cbiAgICAvL1B1c2ggdGhlIGNvbnRhaW5lci4uXG4gICAgdGhpcy4kcHVzaExpc3RlbmVyKG5hbWUsIGNiKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHB1c2hMaXN0ZW5lcicsIGZ1bmN0aW9uIChuYW1lLCBjYikge1xuXG4gICAgdGhpcy4kbGlzdGVuZXJzLnB1c2gobmFtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyR1bnN1YnNjcmliZScsIGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lKSB7XG5cbiAgICB0aGlzLiRzb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzKHN1YnNjcmlwdGlvbk5hbWUpO1xuICAgIHZhciBpZHggPSB0aGlzLiRsaXN0ZW5lcnMuaW5kZXhPZihzdWJzY3JpcHRpb25OYW1lKTtcbiAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICB0aGlzLiRsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBc2lnbmEgbGEgVVJMIGRlIHNlcnZpZG9yIHBvciBkZWZlY3RvXG4gIC5zdGF0aWMoJyRzZXRVcmxTZXJ2ZXInLCBmdW5jdGlvbiAodXJsKSB7XG5cbiAgICB0aGlzLiRkZWZVcmxTZXJ2ZXIgPSB1cmw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXG4gIC5zdGF0aWMoJyRzZXRDcmVkZW50aWFscycsIGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XG5cbiAgICB0aGlzLiRkZWZBY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICB0aGlzLiRkZWZDdXJyZW50VXNlcklkID0gY3VycmVudFVzZXJJZDtcbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC4kc2V0VXJsU2VydmVyKG51bGwpLiRzZXRDcmVkZW50aWFscyhudWxsLCBudWxsKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiU29ja2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYlRyYW5zYWN0aW9uXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQlRyYW5zYWN0aW9uIDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmdMaXN0ICAgICAgb2JqZWN0U3RvcmVOYW1lcztcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb25Nb2RlIG1vZGU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQkRhdGFiYXNlICAgICAgICBkYjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NRXhjZXB0aW9uICAgICAgIGVycm9yO1xyXG4gKiBcclxuICogICBJREJPYmplY3RTdG9yZSBvYmplY3RTdG9yZShET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgdm9pZCAgICAgICAgICAgYWJvcnQoKTtcclxuICogXHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmFib3J0O1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25jb21wbGV0ZTtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uZXJyb3I7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBlbnVtIElEQlRyYW5zYWN0aW9uTW9kZSB7XHJcbiAqICAgXCJyZWFkb25seVwiLFxyXG4gKiAgIFwicmVhZHdyaXRlXCIsXHJcbiAqICAgXCJ2ZXJzaW9uY2hhbmdlXCJcclxuICogfTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJTdG9yZSkgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXHJcbiAgLy8gJF9wcm9taXNlXHJcbiAgXHJcbiAgY29uc3QgVHJhbnNhY3Rpb25Nb2RlID0gbmV3IENsYXp6ZXIoe30pXHJcbiAgICAgICAgLnN0YXRpYygnUmVhZE9ubHknLCAncmVhZG9ubHknKVxyXG4gICAgICAgIC5zdGF0aWMoJ1JlYWRXcml0ZScsICdyZWFkd3JpdGUnKVxyXG4gICAgICAgIC5zdGF0aWMoJ1ZlcnNpb25DaGFuZ2UnLCAgJ3ZlcnNpb25jaGFuZ2UnKTtcclxuXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJUcmFuc2FjdGlvbiAobWUpIHtcclxuICAgIFxyXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFN0YXRpY3NcclxuICAuc3RhdGljKCdUcmFuc2FjdGlvbk1vZGUnLCBUcmFuc2FjdGlvbk1vZGUuY2xhenopXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEdldHRlcnNcclxuICAuZ2V0dGVyKCckZGInLCAgICAgICAgICAgICAgICAnZGInKVxyXG4gIC5nZXR0ZXIoJyRtb2RlJywgICAgICAgICAgICAgICdtb2RlJylcclxuICAuZ2V0dGVyKCckZXJyb3InLCAgICAgICAgICAgICAnZXJyb3InKVxyXG4gIC5nZXR0ZXIoJyRvYmplY3RTdG9yZU5hbWVzJywgICdvYmplY3RTdG9yZU5hbWVzJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRXZlbnQgaGFuZGxlcnNcclxuICAuaGFuZGxlckV2ZW50KCckYWJvcnRlZCcsICdvbmFib3J0JylcclxuICAuaGFuZGxlckV2ZW50KCckY29tcGxldGVkJywgJ29uY29tcGxldGUnKVxyXG4gIC5oYW5kbGVyRXZlbnQoJyRmYWlsJywgJ29uZXJyb3InKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc3RvcmUnLCBmdW5jdGlvbihuYW1lKXtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLm9iamVjdFN0b3JlKG5hbWUpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGFib3J0JywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICB0aGlzLiRtZS5hYm9ydCgpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9wZXJ0eVxyXG4gIC5wcm9wZXJ0eSgnJHByb21pc2UnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlmICh0aGl6LiRfcHJvbWlzZSkgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgICAgLy8gQ3JlYXIgcHJvbWlzZSBwYXJhIGVsIHJlcXVlc3RcclxuICAgICAgdGhpei4kX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdGhpei4kY29tcGxldGVkKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVzb2x2ZShldmVudCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuJGZhaWwoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG5ldyBDbGF6emVyKHRoaXouJF9wcm9taXNlKS5zdGF0aWMoJyR0cmFuc2FjdGlvbicsIHRoaXopO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlRyYW5zYWN0aW9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiVHJhbnNhY3Rpb25cclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCVHJhbnNhY3Rpb24gOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgICAgICBvYmplY3RTdG9yZU5hbWVzO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbk1vZGUgbW9kZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCRGF0YWJhc2UgICAgICAgIGRiO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01FeGNlcHRpb24gICAgICAgZXJyb3I7XHJcbiAqIFxyXG4gKiAgIElEQk9iamVjdFN0b3JlIG9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lKTtcclxuICogICB2b2lkICAgICAgICAgICBhYm9ydCgpO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYWJvcnQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmNvbXBsZXRlO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogfTtcclxuICogXHJcbiAqIGVudW0gSURCVHJhbnNhY3Rpb25Nb2RlIHtcclxuICogICBcInJlYWRvbmx5XCIsXHJcbiAqICAgXCJyZWFkd3JpdGVcIixcclxuICogICBcInZlcnNpb25jaGFuZ2VcIlxyXG4gKiB9O1xyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlN0b3JlKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXG4gIC8vICRfcHJvbWlzZVxuXG4gIHZhciBUcmFuc2FjdGlvbk1vZGUgPSBuZXcgQ2xhenplcih7fSkuc3RhdGljKCdSZWFkT25seScsICdyZWFkb25seScpLnN0YXRpYygnUmVhZFdyaXRlJywgJ3JlYWR3cml0ZScpLnN0YXRpYygnVmVyc2lvbkNoYW5nZScsICd2ZXJzaW9uY2hhbmdlJyk7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJUcmFuc2FjdGlvbihtZSkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTdGF0aWNzXG4gIC5zdGF0aWMoJ1RyYW5zYWN0aW9uTW9kZScsIFRyYW5zYWN0aW9uTW9kZS5jbGF6eilcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR2V0dGVyc1xuICAuZ2V0dGVyKCckZGInLCAnZGInKS5nZXR0ZXIoJyRtb2RlJywgJ21vZGUnKS5nZXR0ZXIoJyRlcnJvcicsICdlcnJvcicpLmdldHRlcignJG9iamVjdFN0b3JlTmFtZXMnLCAnb2JqZWN0U3RvcmVOYW1lcycpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGhhbmRsZXJzXG4gIC5oYW5kbGVyRXZlbnQoJyRhYm9ydGVkJywgJ29uYWJvcnQnKS5oYW5kbGVyRXZlbnQoJyRjb21wbGV0ZWQnLCAnb25jb21wbGV0ZScpLmhhbmRsZXJFdmVudCgnJGZhaWwnLCAnb25lcnJvcicpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRzdG9yZScsIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLm9iamVjdFN0b3JlKG5hbWUpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGFib3J0JywgZnVuY3Rpb24gKCkge1xuXG4gICAgdGhpcy4kbWUuYWJvcnQoKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUHJvcGVydHlcbiAgLnByb3BlcnR5KCckcHJvbWlzZScsIHtcblxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgaWYgKHRoaXouJF9wcm9taXNlKSByZXR1cm4gdGhpei4kX3Byb21pc2U7XG5cbiAgICAgIC8vIENyZWFyIHByb21pc2UgcGFyYSBlbCByZXF1ZXN0XG4gICAgICB0aGl6LiRfcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdGhpei4kY29tcGxldGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xuICAgICAgICB9KS4kZmFpbChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBuZXcgQ2xhenplcih0aGl6LiRfcHJvbWlzZSkuc3RhdGljKCckdHJhbnNhY3Rpb24nLCB0aGl6KTtcblxuICAgICAgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xuICAgIH1cblxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlRyYW5zYWN0aW9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGIgKG1vZHVsZSkge1xyXG5cclxuICAvLyBEdnVlbHZlIGVsIGhvc3QgZGUgdW5hIFVSTFxyXG4gIGZ1bmN0aW9uIGdldEhvc3QodXJsKSB7XHJcbiAgICBjb25zdCBtID0gdXJsLm1hdGNoKC9eKD86aHR0cHM/Oik/XFwvXFwvKFteXFwvXSspLyk7XHJcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgbGV0IHVybEJhc2VIb3N0ID0gbG9jYXRpb24uaG9zdDtcclxuXHJcbiAgY29uc3QgbGJBdXRoID0gZnVuY3Rpb24oKSB7ICduZ0luamVjdCdcclxuICAgIGNvbnN0IHByb3BzID0gWydhY2Nlc3NUb2tlbklkJywgJ2N1cnJlbnRVc2VySWQnLCAncmVtZW1iZXJNZSddO1xyXG4gICAgY29uc3QgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xyXG4gICAgXHJcbiAgICAvLyBOb3RlOiBMb2NhbFN0b3JhZ2UgY29udmVydHMgdGhlIHZhbHVlIHRvIHN0cmluZ1xyXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxyXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAnJztcclxuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcclxuICAgICAgY29uc3Qga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xyXG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICB0aGl6W25hbWVdID0gbG9hZChuYW1lKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGl6LnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgc2F2ZShzdG9yYWdlLCBuYW1lLCB0aGl6W25hbWVdKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2V0VXNlciA9IGZ1bmN0aW9uKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IHVzZXJJZDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSB1c2VyRGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclVzZXIgPSBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IG51bGw7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IG51bGw7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclN0b3JhZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgc2F2ZShzZXNzaW9uU3RvcmFnZSwgbmFtZSwgbnVsbCk7XHJcbiAgICAgICAgc2F2ZShsb2NhbFN0b3JhZ2UsIG5hbWUsIG51bGwpO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBsYkF1dGgoKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24oJHEsIGxiQXV0aCkgeyAnbmdJbmplY3QnO1xyXG4gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbihjb25maWcpIHtcclxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV4dGVybmFsIHJlcXVlc3RzXHJcbiAgICAgICAgY29uc3QgaG9zdCA9IGdldEhvc3QoY29uZmlnLnVybCk7XHJcbiAgICAgICAgaWYgKGhvc3QgJiYgaG9zdCAhPT0gdXJsQmFzZUhvc3QpIHtcclxuICAgICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGJBdXRoLmFjY2Vzc1Rva2VuSWQpIHtcclxuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzW2F1dGhIZWFkZXJdID0gbGJBdXRoLmFjY2Vzc1Rva2VuSWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuX19pc0dldEN1cnJlbnRVc2VyX18pIHtcclxuICAgICAgICAgIC8vIFJldHVybiBhIHN0dWIgNDAxIGVycm9yIGZvciBVc2VyLmdldEN1cnJlbnQoKSB3aGVuXHJcbiAgICAgICAgICAvLyB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpblxyXG4gICAgICAgICAgY29uc3QgcmVzID0ge1xyXG4gICAgICAgICAgICBib2R5OiB7IGVycm9yOiB7IHN0YXR1czogNDAxIH19LFxyXG4gICAgICAgICAgICBzdGF0dXM6IDQwMSxcclxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICB9O1xyXG5cclxuICBjb25zdCBsYlJlc291cmNlID0gZnVuY3Rpb24oKSB7ICduZ0luamVjdCc7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHVybEJhc2U6IFwiL2FwaVwiLFxyXG4gICAgICBhdXRoSGVhZGVyOiAnYXV0aG9yaXphdGlvbicsXHJcbiAgICB9O1xyXG5cclxuICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXIgVGhlIGhlYWRlciBuYW1lIHRvIHVzZSwgZS5nLiBgWC1BY2Nlc3MtVG9rZW5gXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENvbmZpZ3VyZSB0aGUgUkVTVCB0cmFuc3BvcnQgdG8gdXNlIGEgZGlmZmVyZW50IGhlYWRlciBmb3Igc2VuZGluZ1xyXG4gICAgICogdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLiBJdCBpcyBzZW50IGluIHRoZSBgQXV0aG9yaXphdGlvbmAgaGVhZGVyXHJcbiAgICAgKiBieSBkZWZhdWx0LlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldEF1dGhIZWFkZXIgPSBmdW5jdGlvbihoZWFkZXIpIHtcclxuICAgICAgb3B0aW9ucy5hdXRoSGVhZGVyID0gaGVhZGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIGhlYWRlciBuYW1lIHRoYXQgaXMgdXNlZCBmb3Igc2VuZGluZyB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uXHJcbiAgICAgKi9cclxuICAgIHRoaXouZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHVzZSwgZS5nLiBgL2FwaWAgb3IgYC8vZXhhbXBsZS5jb20vYXBpYC5cclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ2hhbmdlIHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gQnkgZGVmYXVsdCwgdGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cclxuICAgIHRoaXouc2V0VXJsQmFzZSA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICBvcHRpb25zLnVybEJhc2UgPSB1cmw7XHJcbiAgICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIFRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldFVybEJhc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei4kZ2V0ID0gZnVuY3Rpb24oJHJlc291cmNlKSB7ICduZ0luamVjdCc7XHJcblxyXG4gICAgICBjb25zdCBsYlJlc291cmNlID0gZnVuY3Rpb24odXJsLCBwYXJhbXMsIGFjdGlvbnMpIHtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMoYWN0aW9ucykubWFwKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgIGFjdGlvbnNba2V5XS5vcmlnaW5hbFVybCA9IGFjdGlvbnNba2V5XS51cmw7XHJcbiAgICAgICAgICBhY3Rpb25zW2tleV0udXJsID0gb3B0aW9ucy51cmxCYXNlICsgYWN0aW9uc1trZXldLnVybDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzb3VyY2UgPSAkcmVzb3VyY2Uob3B0aW9ucy51cmxCYXNlICsgdXJsLCBwYXJhbXMsIGFjdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBBbmd1bGFyIGFsd2F5cyBjYWxscyBQT1NUIG9uICRzYXZlKClcclxuICAgICAgICAvLyBUaGlzIGhhY2sgaXMgYmFzZWQgb25cclxuICAgICAgICAvLyBodHRwOi8va2lya2J1c2hlbGwubWUvYW5ndWxhci1qcy11c2luZy1uZy1yZXNvdXJjZS1pbi1hLW1vcmUtcmVzdGZ1bC1tYW5uZXIvXHJcbiAgICAgICAgcmVzb3VyY2UucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24oc3VjY2VzcywgZXJyb3IpIHtcclxuICAgICAgICAgIC8vIEZvcnR1bmF0ZWx5LCBMb29wQmFjayBwcm92aWRlcyBhIGNvbnZlbmllbnQgYHVwc2VydGAgbWV0aG9kXHJcbiAgICAgICAgICAvLyB0aGF0IGV4YWN0bHkgZml0cyBvdXIgbmVlZHMuXHJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSByZXNvdXJjZS51cHNlcnQuY2FsbCh0aGlzLCB7fSwgdGhpcywgc3VjY2VzcywgZXJyb3IpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC4kcHJvbWlzZSB8fCByZXN1bHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2U7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsYlJlc291cmNlLmdldFVybEJhc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgICAgfTtcclxuICAgIFxyXG4gICAgICByZXR1cm4gbGJSZXNvdXJjZTtcclxuXHJcbiAgICB9O1xyXG5cclxuICB9XHJcblxyXG4gIHJldHVybiBtb2R1bGVcclxuICAgIC5mYWN0b3J5KCdsYkF1dGgnLCBsYkF1dGgpXHJcbiAgICAucHJvdmlkZXIoJ2xiUmVzb3VyY2UnLCBsYlJlc291cmNlKVxyXG4gICAgLmZhY3RvcnkoJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicsIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcilcclxuICAgIC5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24oJGh0dHBQcm92aWRlcikgeyAnbmdJbmplY3QnO1xyXG4gICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InKTtcclxuICAgIH1dKTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9sYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGxiO1xuZnVuY3Rpb24gbGIobW9kdWxlKSB7XG5cbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcbiAgZnVuY3Rpb24gZ2V0SG9zdCh1cmwpIHtcbiAgICB2YXIgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xuICAgIHJldHVybiBtID8gbVsxXSA6IG51bGw7XG4gIH1cblxuICB2YXIgdXJsQmFzZUhvc3QgPSBsb2NhdGlvbi5ob3N0O1xuXG4gIHZhciBsYkF1dGggPSBmdW5jdGlvbiBsYkF1dGgoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcbiAgICB2YXIgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xuXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcbiAgICAvLyBXZSBhcmUgdXNpbmcgZW1wdHkgc3RyaW5nIGFzIGEgbWFya2VyIGZvciBudWxsL3VuZGVmaW5lZCB2YWx1ZXMuXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XG4gICAgICAgIHN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWQobmFtZSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Vba2V5XSB8fCBzZXNzaW9uU3RvcmFnZVtrZXldIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXpbbmFtZV0gPSBsb2FkKG5hbWUpO1xuICAgICAgfSk7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdmFyIHN0b3JhZ2UgPSB0aGl6LnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzdG9yYWdlLCBuYW1lLCB0aGl6W25hbWVdKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgdXNlcklkLCB1c2VyRGF0YSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IHVzZXJJZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gbnVsbDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBzYXZlKHNlc3Npb25TdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgICAgc2F2ZShsb2NhbFN0b3JhZ2UsIG5hbWUsIG51bGwpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XG4gIH07XG5cbiAgdmFyIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcigkcSwgbGJBdXRoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHJldHVybiB7XG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV4dGVybmFsIHJlcXVlc3RzXG4gICAgICAgIHZhciBob3N0ID0gZ2V0SG9zdChjb25maWcudXJsKTtcbiAgICAgICAgaWYgKGhvc3QgJiYgaG9zdCAhPT0gdXJsQmFzZUhvc3QpIHtcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XG4gICAgICAgICAgY29uZmlnLmhlYWRlcnNbYXV0aEhlYWRlcl0gPSBsYkF1dGguYWNjZXNzVG9rZW5JZDtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuX19pc0dldEN1cnJlbnRVc2VyX18pIHtcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxuICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIHVzZXIgbG9nZ2VkIGluXG4gICAgICAgICAgdmFyIHJlcyA9IHtcbiAgICAgICAgICAgIGJvZHk6IHsgZXJyb3I6IHsgc3RhdHVzOiA0MDEgfSB9LFxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXG4gICAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGZ1bmN0aW9uIGhlYWRlcnMoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICB2YXIgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uIGxiUmVzb3VyY2UoKSB7XG4gICAgJ25nSW5qZWN0JztcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHVybEJhc2U6IFwiL2FwaVwiLFxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nXG4gICAgfTtcblxuICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlciBUaGUgaGVhZGVyIG5hbWUgdG8gdXNlLCBlLmcuIGBYLUFjY2Vzcy1Ub2tlbmBcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ29uZmlndXJlIHRoZSBSRVNUIHRyYW5zcG9ydCB0byB1c2UgYSBkaWZmZXJlbnQgaGVhZGVyIGZvciBzZW5kaW5nXHJcbiAgICAgKiB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uIEl0IGlzIHNlbnQgaW4gdGhlIGBBdXRob3JpemF0aW9uYCBoZWFkZXJcclxuICAgICAqIGJ5IGRlZmF1bHQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoaGVhZGVyKSB7XG4gICAgICBvcHRpb25zLmF1dGhIZWFkZXIgPSBoZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgaGVhZGVyIG5hbWUgdGhhdCBpcyB1c2VkIGZvciBzZW5kaW5nIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdXNlLCBlLmcuIGAvYXBpYCBvciBgLy9leGFtcGxlLmNvbS9hcGlgLlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDaGFuZ2UgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBCeSBkZWZhdWx0LCB0aGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouc2V0VXJsQmFzZSA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgIG9wdGlvbnMudXJsQmFzZSA9IHVybDtcbiAgICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIFRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICB9O1xuXG4gICAgdGhpei4kZ2V0ID0gZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xuICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoYWN0aW9ucykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICAgIGFjdGlvbnNba2V5XS51cmwgPSBvcHRpb25zLnVybEJhc2UgKyBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSAkcmVzb3VyY2Uob3B0aW9ucy51cmxCYXNlICsgdXJsLCBwYXJhbXMsIGFjdGlvbnMpO1xuXG4gICAgICAgIC8vIEFuZ3VsYXIgYWx3YXlzIGNhbGxzIFBPU1Qgb24gJHNhdmUoKVxuICAgICAgICAvLyBUaGlzIGhhY2sgaXMgYmFzZWQgb25cbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xuICAgICAgICByZXNvdXJjZS5wcm90b3R5cGUuJHNhdmUgPSBmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxuICAgICAgICAgIC8vIHRoYXQgZXhhY3RseSBmaXRzIG91ciBuZWVkcy5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LiRwcm9taXNlIHx8IHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gbW9kdWxlLmZhY3RvcnkoJ2xiQXV0aCcsIGxiQXV0aCkucHJvdmlkZXIoJ2xiUmVzb3VyY2UnLCBsYlJlc291cmNlKS5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpLmNvbmZpZyhbJyRodHRwUHJvdmlkZXInLCBmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InKTtcbiAgfV0pO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2xiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYkV2ZW50VGFyZ2V0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkV2ZW50VGFyZ2V0ICgpIHt9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIHByb3BpZWRhZFxyXG4gIC5wcm9wZXJ0eSgnJGxpc3RlbmVycycsIHtcclxuICAgIHZhbHVlOiBbXVxyXG4gIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gbWV0aG9kXHJcbiAgLm1ldGhvZCgnJGJpbmQnLCBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcclxuICAgIGlmKCEodHlwZSBpbiB0aGlzLiRsaXN0ZW5lcnMpKSB7XHJcbiAgICAgIHRoaXMuJGxpc3RlbmVyc1t0eXBlXSA9IFtdO1xyXG4gICAgfVxyXG4gICAgdGhpcy4kbGlzdGVuZXJzW3R5cGVdLnB1c2goY2FsbGJhY2spO1xyXG4gIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gbWV0aG9kXHJcbiAgLm1ldGhvZCgnJHVuYmluZCAnLCBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcclxuICAgIGlmKCEodHlwZSBpbiB0aGlzLiRsaXN0ZW5lcnMpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBzdGFjayA9IHRoaXMuJGxpc3RlbmVyc1t0eXBlXTtcclxuICAgIGZvcih2YXIgaSA9IDAsIGwgPSBzdGFjay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgaWYoc3RhY2tbaV0gPT09IGNhbGxiYWNrKXtcclxuICAgICAgICBzdGFjay5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJHVuYmluZCh0eXBlLCBjYWxsYmFjayk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIG1ldGhvZFxyXG4gIC5tZXRob2QoJyRlbWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZighKGV2ZW50LnR5cGUgaW4gdGhpcy4kbGlzdGVuZXJzKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgc3RhY2sgPSB0aGlzLiRsaXN0ZW5lcnNbZXZlbnQudHlwZV07XHJcbiAgICBmb3IodmFyIGkgPSAwLCBsID0gc3RhY2subGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgc3RhY2tbaV0uY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYkV2ZW50VGFyZ2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiRXZlbnRUYXJnZXRcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplcikge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiRXZlbnRUYXJnZXQoKSB7fSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gcHJvcGllZGFkXG4gIC5wcm9wZXJ0eSgnJGxpc3RlbmVycycsIHtcbiAgICB2YWx1ZTogW11cbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gbWV0aG9kXG4gIC5tZXRob2QoJyRiaW5kJywgZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLiRsaXN0ZW5lcnMpKSB7XG4gICAgICB0aGlzLiRsaXN0ZW5lcnNbdHlwZV0gPSBbXTtcbiAgICB9XG4gICAgdGhpcy4kbGlzdGVuZXJzW3R5cGVdLnB1c2goY2FsbGJhY2spO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBtZXRob2RcbiAgLm1ldGhvZCgnJHVuYmluZCAnLCBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoISh0eXBlIGluIHRoaXMuJGxpc3RlbmVycykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHN0YWNrID0gdGhpcy4kbGlzdGVuZXJzW3R5cGVdO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gc3RhY2subGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoc3RhY2tbaV0gPT09IGNhbGxiYWNrKSB7XG4gICAgICAgIHN0YWNrLnNwbGljZShpLCAxKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHVuYmluZCh0eXBlLCBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBtZXRob2RcbiAgLm1ldGhvZCgnJGVtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoIShldmVudC50eXBlIGluIHRoaXMuJGxpc3RlbmVycykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHN0YWNrID0gdGhpcy4kbGlzdGVuZXJzW2V2ZW50LnR5cGVdO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gc3RhY2subGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBzdGFja1tpXS5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiRXZlbnRUYXJnZXQuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9