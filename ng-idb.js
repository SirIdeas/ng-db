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
	      var model = db.$model('Trabajador').$createStore();
	    }
	  }).$drop().then(function (db) {
	    db.$open().then(function (event) {
	      console.log(['opened']);
	    });
	  });
	
	  return db;
	}]).service('Trabajador2', ["db2", function (db2) {
	  'ngInject';
	
	  return window.Trabajador2 = db2.$model('Trabajador').$field('cod', { "type": "string", "required": true }).$field('ci', { "type": "string", "required": true }).$field('nombres', { "type": "string", "required": true }).$field('apellidos', { "type": "string", "required": true }).$field('nacimiento', { "type": "date" }).$field('ingreso', { "type": "date" }).$field('direccion', { "type": "string" }).$remote('/trabajadores/:id', { 'id': '@id' }, {
	    'find': { url: '/trabajadores/_findWithVersion', method: 'GET', isArray: true }
	  })
	  // .versioning()
	  .$build(function (Trabajador) {
	
	    Trabajador.prototype.$constructor = function (data) {};
	
	    Trabajador.prototype.getNombre = function () {
	      return this.nombres + ' ' + this.apellidos;
	    };
	  });
	}]).run(["db2", "Trabajador2", function (db2, Trabajador2) {
	  'ngInject';
	
	  var t = new Trabajador2();
	  t.nombres = 'Alexander';
	  t.apellidos = 'Rondon';
	  console.log(t.$getValues());
	  console.log(t.getNombre());
	
	  Trabajador2.$put({
	    id: 1,
	    'nombres': 'Alexander'
	  });
	
	  Trabajador2.$put({
	    id: 2,
	    'nombres': 'Guillemo'
	  });
	
	  Trabajador2.$put({
	    id: 2,
	    'apellidos': 'Seminario'
	  });
	
	  Trabajador2.$put({
	    id: 4,
	    'nombres': 'Axel'
	  });
	
	  Trabajador2.$put({
	    'nombres': 'Gabriel'
	  });
	
	  window.r = Trabajador2.$get(2);
	
	  r.$promise.then(function (record) {
	    console.log(['then', record]);
	  }).catch(function (event) {
	    console.error(event);
	  });
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
	  .handlerEvent('$success', 'onsuccess').handlerEvent('$failed', 'onerror')
	
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
	        }).$failed(function (event) {
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
	
	exports.default = ["Clazzer", "idbEventTarget", "idbStore", "idbModel2", "idbOpenDBRequest", "idbTransaction", "$log", function (Clazzer, idbEventTarget, idbStore, idbModel2, idbOpenDBRequest, idbTransaction, $log) {
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
	
	    new Clazzer(this).static('$name', name).static('$version', version).static('$socket', socket);
	  };
	
	  return new
	  // ---------------------------------------------------------------------------
	  // Constructor
	  Clazzer(idb)
	
	  // ---------------------------------------------------------------------------
	  // Herencia
	  .inherit(idbEventTarget)
	
	  // ---------------------------------------------------------------------------
	  // Propiedades
	  .property('$_upgradeneededs', { value: [] }).property('$_models', { value: {} })
	
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
	
	    this.$_upgradeneededs.push(cb);
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
	        thiz.$_upgradeneededs.map(function (cb) {
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
	      }).$failed(function (event) {
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
	    if (this.$_models[name]) return this.$_models[name];
	
	    // Instanciar el modelo y guardarlo
	    return this.$_models[name] = idbModel2(this, name, socket || this.$socket);
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$transaction', function (storeNames, mode) {
	    var thiz = this;
	
	    return thiz.$open().then(function (thiz) {
	      return new idbTransaction(thiz.$me.transaction(storeNames, mode));
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$store', function (storeNames) {
	    var thiz = this;
	    if (!Array.isArray(storeNames)) storeNames = [storeNames];
	
	    function action(mode) {
	      return function (cb) {
	
	        return thiz.$transaction(storeNames, mode).then(function (tx) {
	          var storesObj = {};
	          var stores = storeNames.map(function (storeName) {
	            return storesObj[storeName] = tx.$store(storeName);
	          });
	          if (cb) cb.apply(thiz, stores);
	          return storesObj;
	        });
	      };
	    }
	
	    return new Clazzer({}).static('$reader', action(idbTransaction.TransactionMode.ReadOnly)).static('$writer', action(idbTransaction.TransactionMode.ReadWrite)).clazz;
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
	
	    throw 'idbStore.method.$index';
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$createIndex', function (name, keyPath, options) {
	
	    throw 'idbStore.method.$createIndex';
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
	
	exports.default = ["Clazzer", "idbEventTarget", "lbResource", "$timeout", function (Clazzer, idbEventTarget, lbResource, $timeout) {
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
	    .static('$db', db).static('$name', name).static('$socket', socket).static('$id', { keyPath: 'id', autoIncrement: true }).static('$fields', {
	      id: {
	        id: true,
	        name: 'id',
	        type: 'number'
	      }
	    }).static('$instances', {})
	
	    // ---------------------------------------------------------------------------
	    .static('$getKeyFrom', function (data) {
	
	      return getFieldValue(data, this.$id.keyPath);
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$createStore', function (cb) {
	
	      var store = this.$db.$createStore(this.$name, this.$id);
	
	      if (cb) cb(this, store);
	
	      return this;
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$writer', function (cb) {
	      var thiz = this;
	
	      return thiz.$db.$store(thiz.$name).$writer(cb).then(function (stores) {
	        return stores[thiz.$name];
	      });
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$reader', function (cb) {
	      var thiz = this;
	
	      return thiz.$db.$store(thiz.$name).$reader(cb).then(function (stores) {
	        return stores[thiz.$name];
	      });
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$put', function (obj, key) {
	      var thiz = this;
	
	      var data = this.$getValues(obj);
	
	      return thiz.$writer().then(function (store) {
	        return store.$put(data, key).$promise.then(function (event) {
	          var record = thiz.$getInstance(event.target.result);
	          record.$setLocalValues(data);
	          return record;
	        });
	      });
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$add', function (obj, key) {
	      var thiz = this;
	
	      var data = this.$getValues(obj);
	
	      return thiz.$writer().then(function (store) {
	        return store.$add(data, key).$promise.then(function (event) {
	          var record = thiz.$getInstance(event.target.result);
	          record.$setLocalValues(data);
	          return record;
	        });
	      });
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$delete', function (query) {
	
	      throw 'idbModel.static.$delete';
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$clear', function () {
	
	      throw 'idbModel.static.$clear';
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$get', function (key) {
	      var thiz = this;
	
	      var record = this.$getInstance(key);
	
	      record.$promise = thiz.$reader().then(function (store) {
	        return store.$get(key).$promise.then(function (event) {
	          record.$setLocalValues(event.target.result);
	          return record;
	        });
	      });
	
	      return record;
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$getKey', function (query) {
	
	      throw 'idbModel.static.$getKey';
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$getAll', function (query, count) {
	
	      throw 'idbModel.static.$getAll';
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$getAllKeys', function (query, count) {
	
	      throw 'idbModel.static.$getAllKeys';
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$count', function (query) {
	
	      throw 'idbModel.static.$count';
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$getInstance', function (key) {
	
	      // El objeto no tiene ID
	      if (key === undefined || key === null) {
	        return new this();
	      }
	
	      // No existe la instancia entonce se crea
	      if (!this.$instances[key]) {
	        this.$instances[key] = new this();
	        this.$instances[key].$set(this.$id.keyPath, key);
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
	    .static('$key', function (key, autoIncrement, type) {
	      if (typeof key === 'boolean') {
	        autoIncrement = key;
	      }
	      if (key === undefined || key === null || typeof key === 'boolean') {
	        key = 'id';
	      }
	      if (typeof autoIncrement === 'string') {
	        type = autoIncrement;
	        autoIncrement = null;
	      }
	      if (autoIncrement === undefined || autoIncrement === null) {
	        autoIncrement = true;
	      }
	      if (typeof autoIncrement === 'boolean' || type !== 'string') {
	        type = 'number';
	      }
	
	      this.$id.keyPath = key;
	      this.$id.autoIncrement = autoIncrement;
	
	      return this.$field(key, {
	        id: true,
	        type: type
	      });
	    })
	
	    // ---------------------------------------------------------------------------
	    // Devuelve el valor de una propiedad
	    .static('$getValues', function (data) {
	
	      var values = {};
	
	      Object.keys(this.$fields).map(function (field) {
	        var value = getFieldValue(data, field);
	        if (value !== undefined) {
	          setFieldValue(values, field, value);
	        }
	      });
	
	      return values;
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
	    // Propiedades
	    .property('$_values', { value: new Clazzer({}).static('local', {}).static('remote', {}).clazz
	    }).property('$_versions', { value: {} })
	
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
	
	      return idbModel.$getValues(data || this);
	    })
	
	    // ---------------------------------------------------------------------------
	    .method('$getLocalValues', function () {
	
	      return this.$getValues(this.$_values.local);
	    })
	
	    // ---------------------------------------------------------------------------
	    .method('$getRemoteValues', function () {
	
	      return this.$getValues(this.$_values.remote);
	    })
	
	    // ---------------------------------------------------------------------------
	    .method('$setValues', function (data) {
	      var thiz = this;
	
	      Object.keys(data || {}).map(function (field) {
	        setFieldValue(thiz, field, data[field]);
	      });
	
	      return thiz;
	    })
	
	    // ---------------------------------------------------------------------------
	    .method('$setLocalValues', function (data) {
	      var thiz = this;
	
	      Object.keys(data || {}).map(function (field) {
	        setFieldValue(thiz.$_values.local, field, data[field]);
	      });
	
	      return thiz;
	    })
	
	    // ---------------------------------------------------------------------------
	    .method('$setRemoteValues', function (data) {
	      var thiz = this;
	
	      Object.keys(data || {}).map(function (field) {
	        setFieldValue(thiz.$_values.remote, field, data[field]);
	      });
	
	      return thiz;
	    })
	
	    // ---------------------------------------------------------------------------
	    .method('$key', function (data) {
	
	      return getFieldValue(data, this.$id.keyPath);
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
	
	    new Clazzer(this).static('$url', url || idbSocket.$defUrlServer).static('$accessTokenId', accessTokenId || idbSocket.$defAccessTokenId).static('$currentUserId', currentUserId || idbSocket.$defCurrentUserId);
	
	    thiz.$connect();
	  };
	
	  return new
	  // ---------------------------------------------------------------------------
	  // Constructor
	  Clazzer(idbSocket)
	
	  // ---------------------------------------------------------------------------
	  .property('$_listeners', { value: [] })
	
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
	
	    this.$_listeners.push(name);
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$unsubscribe', function (subscriptionName) {
	
	    this.$socket.removeAllListeners(subscriptionName);
	    var idx = this.$_listeners.indexOf(subscriptionName);
	    if (idx != -1) {
	      this.$_listeners.splice(idx, 1);
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
	  .getter('$db', 'db').getter('$mode', 'mode').getter('$error', 'error').getter('$storeNames', 'objectStoreNames')
	
	  // ---------------------------------------------------------------------------
	  // Event handlers
	  .handlerEvent('$aborted', 'onabort').handlerEvent('$completed', 'oncomplete').handlerEvent('$failed', 'onerror')
	
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
	        }).$failed(function (event) {
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
	  // Propiedades
	  .property('$_listeners', { value: [] })
	
	  // ---------------------------------------------------------------------------
	  // method
	  .method('$bind', function (type, callback) {
	    if (!(type in this.$_listeners)) {
	      this.$_listeners[type] = [];
	    }
	    this.$_listeners[type].push(callback);
	  })
	
	  // ---------------------------------------------------------------------------
	  // method
	  .method('$unbind ', function (type, callback) {
	    if (!(type in this.$_listeners)) {
	      return;
	    }
	    var stack = this.$_listeners[type];
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
	    if (!(event.type in this.$_listeners)) {
	      return;
	    }
	    var stack = this.$_listeners[event.type];
	    for (var i = 0, l = stack.length; i < l; i++) {
	      stack[i].call(this, event);
	    }
	  })
	
	  // ---------------------------------------------------------------------------
	  .clazz;
	}];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTA0ZGVhNGE1NzBhZWQzZTdmY2QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiVXRpbHMuanM/MWJiNCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJFdmVudHMuanM/NDg2YSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3FzLmpzPzY0MzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzP2QxYTEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiLmpzPzYzNTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qcz9mOWY5Iiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanM/Zjc3YSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvbGIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2xiLmpzPzMwMDYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pbmRleC5qcz8wZjYyIiwid2VicGFjazovLy8uL3NyYy92MS9DbGF6emVyLmpzIiwid2VicGFjazovLy8uL3NyYy92MS9DbGF6emVyLmpzPzFmY2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlJlcXVlc3QuanM/MmNiYSIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiT3BlbkRCUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiT3BlbkRCUmVxdWVzdC5qcz9hOGRkIiwid2VicGFjazovLy8uL3NyYy92MS9pZGIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYi5qcz8xYzFiIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJTdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiU3RvcmUuanM/ZWE1NyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYk1vZGVsLmpzPzdjMWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiU29ja2V0LmpzPzE0ZjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlRyYW5zYWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJUcmFuc2FjdGlvbi5qcz8zMGMzIiwid2VicGFjazovLy8uL3NyYy92MS9sYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvbGIuanM/Y2Y1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiRXZlbnRUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYkV2ZW50VGFyZ2V0LmpzPzYzN2UiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsInNlcnZpY2UiLCJpZGJVdGlscyIsIiRxIiwidmFsaWRhdG9ycyIsImNhbGxiYWNrIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJhcnJheSIsIkFycmF5IiwiaXNBcnJheSIsInZhbGlkIiwidHlwZXMiLCJpIiwidHlwZSIsImFyZ3MiLCJ2YWxpZGF0ZSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImVyciIsIkVycm9yIiwibmFtZSIsImlkYkV2ZW50cyIsIkRCX0VSUk9SIiwiTU9ERUxfSU5TVEFOQ0VEIiwiTU9ERUxfUkVQTEFDRSIsIk1PREVMX1FVRVJJRUQiLCJNT0RFTF9VTlFVRVJJRUQiLCJxcyIsInFzQ2xhc3MiLCJjYiIsInRoaXoiLCJ0aGVucyIsInRoZW5zUmVhZHkiLCJjYXRjaHMiLCJjYXRjaHNSZWFkeSIsInJlc3VsdEFyZ3MiLCJlcnJvciIsInByb21pc2UiLCIkcmVzb2x2ZWQiLCJ0aGVuc1Jlc29sdmVkIiwibGVuZ3RoIiwic2hpZnQiLCJhcHBseSIsInB1c2giLCJjYXRjaHNSZXNvbHZlZCIsInJlc29sdmUiLCJhcmd1bWVudHMiLCJyZWplY3QiLCJ0aGVuIiwiY2F0Y2giLCJkb25lIiwiY29uY2F0IiwiZGVmZXIiLCJhbGwiLCJhcnIiLCJkZWZlcmVkIiwicHJvbWlzZXMiLCJrZXlzIiwiT2JqZWN0IiwicmVzdWx0cyIsIm1hcCIsImlkeCIsInJlc3VsdCIsImlkYlNvY2tldFNlcnZpY2UiLCIkbG9nIiwiaW8iLCIkZGVmVXJsU2VydmVyIiwiaWRiU29ja2V0IiwiJHVybFNlcnZlciIsIiRhY2Nlc3NUb2tlbklkIiwiJGN1cnJlbnRVc2VySWQiLCIkbGlzdGVuZXJzIiwiJHNvY2tldCIsImNvbm5lY3QiLCJvbiIsImxvZyIsImVtaXQiLCJpZCIsInVzZXJJZCIsInN1YnNjcmliZSIsIm9wdGlvbnMiLCJtb2RlbE5hbWUiLCJldmVudE5hbWUiLCJtb2RlbElkIiwicHVzaExpc3RlbmVyIiwic3Vic2NyaXB0aW9uTmFtZSIsInVuc3Vic2NyaWJlIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwiaW5kZXhPZiIsInNwbGljZSIsInNldFVybFNlcnZlciIsInVybFNlcnZlciIsInNldENyZWRlbnRpYWxzIiwiYWNjZXNzVG9rZW5JZCIsImN1cnJlbnRVc2VySWQiLCJpZGJTZXJ2aWNlIiwiaWRiTW9kZWwiLCJpbmRleGVkREIiLCJ3aW5kb3ciLCJtb3pJbmRleGVkREIiLCJ3ZWJraXRJbmRleGVkREIiLCJtc0luZGV4ZWREQiIsIklEQlRyYW5zYWN0aW9uIiwid2Via2l0SURCVHJhbnNhY3Rpb24iLCJtc0lEQlRyYW5zYWN0aW9uIiwiSURCS2V5UmFuZ2UiLCJ3ZWJraXRJREJLZXlSYW5nZSIsIm1zSURCS2V5UmFuZ2UiLCJhbGVydCIsImlkYiIsIiRkYk5hbWUiLCIkZGJWZXJzaW9uIiwiJGV2ZW50c0NhbGxiYWNrcyIsIiR1cGdyYWRlTmVlZGVkRGVmZXJlZCIsIiRvcGVuRGVmZXJlZCIsIiRzb2NrZXRDb25uZWN0ZWREZWZlcmVkIiwiJG9wZW5lZCIsIiRyZXF1ZXN0IiwibW9kZWxzIiwiYmluZCIsInVuYmluZCIsInRyaWdnZXIiLCJvcGVuIiwicmVhZHkiLCJycSIsIm9udXBncmFkZW5lZWRlZCIsImV2ZW50Iiwib25zdWNjZXNzIiwib25lcnJvciIsInRhcmdldCIsImVycm9yQ29kZSIsImRlbGV0ZURhdGFiYXNlIiwibW9kZWwiLCJzb2NrZXQiLCJjcmVhdGVTdG9yZSIsImNyZWF0ZU9iamVjdFN0b3JlIiwiY3JlYXRlSW5kZXgiLCJpbmRleE5hbWUiLCJmaWVsZE5hbWUiLCJvcHRzIiwidHJhbnNhY3Rpb24iLCJvYmplY3RTdG9yZSIsInBlcm1zIiwiYWN0aW9uIiwidHgiLCJvbmNvbXBsZXRlIiwib25hYm9ydCIsImdldCIsImtleSIsInB1dCIsInZhbHVlcyIsImRlbGV0ZSIsIm9wZW5DdXJzb3IiLCJmaWx0ZXJzIiwiZWFjaENiIiwiY3Vyc29yIiwiY29udGludWUiLCJkZWZlcmVkcyIsIm9uT3BlbiIsIm9uVXBncmFkZU5lZWRlZCIsIm9uU29ja2V0Q29ubmVjdGVkIiwidGV4dCIsImlkYk1vZGVsU2VydmljZSIsImlkYlF1ZXJ5IiwibGJSZXNvdXJjZSIsIiR0aW1lb3V0Iiwic2VhcmNoRGVlcEZpZWxkIiwib2JqIiwiZmllbGQiLCJmaWVsZHMiLCJzcGxpdCIsImxhc3RGaWVsZCIsInBvcCIsIl9zZXQiLCJnZXRGaWVsZFZhbHVlIiwic2V0RmllbGRWYWx1ZSIsIiRkYiIsIiRtb2RlbE5hbWUiLCIkaWQiLCJrZXlQYXRoIiwiYXV0b0luY3JlbWVudCIsIiRldmVudHNIYW5kbGVycyIsIiRpbnN0YW5jZXMiLCIkZmllbGRzIiwiJHJlbW90ZSIsIiR2ZXJzaW9uaW5nIiwiTW9kZWwiLCJkYXRhIiwiJGxvYWRlZCIsIiRsb2NhbExvYWRlZCIsIiRyZW1vdGVMb2FkZWQiLCIkbG9jYWxWYWx1ZXMiLCIkcmVtb3RlVmFsdWVzIiwiJHZlcnNpb24iLCIkbG9jYWxWZXJzaW9uIiwiJHJlbW90ZVZlcnNpb24iLCIkc2V0VmFsdWVzIiwiJGNvbnN0cnVjdG9yIiwiJGxpc3RlbiIsIiRyZXN1bHRzIiwiJGJpbmQiLCIkZW1pdCIsImdldE1vZGVsTmFtZSIsImluZGV4IiwiYnVpbGQiLCJidWlsZENhbGxiYWNrIiwicmVtb3RlIiwidXJsIiwiYWN0aW9ucyIsImdldFJlbW90ZSIsImdldEtleUZyb20iLCJnZXRJbnN0YW5jZSIsImluc3RhbmNlIiwiJHByb21pc2UiLCJnZXRWZXJzaW9uT2YiLCJ2ZXJzaW9uIiwiJHNldExvY2FsVmFsdWVzIiwiaGFzaCIsImZpbmQiLCJjcmVhdGUiLCJyZWNvcmQiLCIkcHVsbCIsIml0ZXJhdGlvbiIsInZlcnNpb25pbmciLCJoYW5kbGVyIiwiJGdldCIsIiRzZXQiLCIkZ2V0VmFsdWVzIiwiJGdldExvY2FsVmFsdWVzIiwiJGdldFJlbW90ZVZhbHVlcyIsIiRzZXRSZW1vdGVWYWx1ZXMiLCIkc2V0S2V5IiwibmV3S2V5Iiwib2xkS2V5IiwibmV3VmFsdWVzIiwib2xkVmFsdWVzIiwiY29uc29sZSIsIiRNb2RlbCIsIiRmaWx0ZXJzIiwiJHJlc3VsdCIsImdldFJlc3VsdCIsIm5leHQiLCJnZXRSZW1vdGVSZXN1bHQiLCIkcmVtb3RlUmVzdWx0IiwiJHJlY29yZCIsImxiIiwiZ2V0SG9zdCIsIm0iLCJtYXRjaCIsInVybEJhc2VIb3N0IiwibG9jYXRpb24iLCJob3N0IiwibGJBdXRoIiwicHJvcHMiLCJwcm9wc1ByZWZpeCIsInNhdmUiLCJzdG9yYWdlIiwibG9hZCIsImxvY2FsU3RvcmFnZSIsInNlc3Npb25TdG9yYWdlIiwiZm9yRWFjaCIsImN1cnJlbnRVc2VyRGF0YSIsInJlbWVtYmVyTWUiLCJzZXRVc2VyIiwidXNlckRhdGEiLCJjbGVhclVzZXIiLCJjbGVhclN0b3JhZ2UiLCJsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IiLCJyZXF1ZXN0IiwiY29uZmlnIiwiaGVhZGVycyIsImF1dGhIZWFkZXIiLCJfX2lzR2V0Q3VycmVudFVzZXJfXyIsInJlcyIsImJvZHkiLCJzdGF0dXMiLCJ3aGVuIiwidXJsQmFzZSIsInNldEF1dGhIZWFkZXIiLCJoZWFkZXIiLCJnZXRBdXRoSGVhZGVyIiwic2V0VXJsQmFzZSIsImdldFVybEJhc2UiLCIkcmVzb3VyY2UiLCJwYXJhbXMiLCJvcmlnaW5hbFVybCIsInJlc291cmNlIiwiJHNhdmUiLCJzdWNjZXNzIiwidXBzZXJ0IiwiZmFjdG9yeSIsInByb3ZpZGVyIiwiJGh0dHBQcm92aWRlciIsImludGVyY2VwdG9ycyIsImNvbnN0YW50IiwiaWRiMiIsImRiIiwiJGF1dG9taWdyYXRpb24iLCIkbW9kZWwiLCIkY3JlYXRlU3RvcmUiLCIkZHJvcCIsIiRvcGVuIiwiZGIyIiwiVHJhYmFqYWRvcjIiLCIkZmllbGQiLCJtZXRob2QiLCIkYnVpbGQiLCJUcmFiYWphZG9yIiwiZ2V0Tm9tYnJlIiwibm9tYnJlcyIsImFwZWxsaWRvcyIsInJ1biIsInQiLCIkcHV0IiwiciIsIkNsYXp6ZXIiLCJjb25zdHJ1Y3RvciIsImRlZmluZVByb3BlcnR5IiwicGFyZW50IiwidG1wIiwiY2xhenoiLCJmdW5jIiwicHJvcGVydHkiLCJmcm9tIiwidG8iLCIkbWUiLCJzZXQiLCJSZWFkeVN0YXRlIiwic3RhdGljIiwiaWRiUmVxdWVzdCIsIm1lIiwiaW5oZXJpdCIsIkV2ZW50VGFyZ2V0IiwiZ2V0dGVyIiwiaGFuZGxlckV2ZW50IiwiJF9wcm9taXNlIiwiUHJvbWlzZSIsIiRzdWNjZXNzIiwiJGZhaWxlZCIsImlkYk9wZW5EQlJlcXVlc3QiLCJpZGJFdmVudFRhcmdldCIsImlkYlN0b3JlIiwiaWRiTW9kZWwyIiwiaWRiVHJhbnNhY3Rpb24iLCJmaXJzdCIsInNlY29uZCIsImNtcCIsIiRfdXBncmFkZW5lZWRlZHMiLCJhbGxNaWdyYXRpb25zIiwiJHVwZ3JhZGVuZWVkZWQiLCJvcGVuUmVxdWVzdCIsIm9sZFZlcnNpb24iLCJuZXdWZXJzaW9uIiwibWlncmF0aW9ucyIsIm1pZ3JhdGlvbiIsImNiRXJyIiwibGFzdFJxIiwibGFzdEV2ZW50IiwiJG5hbWUiLCJjbG9zZSIsImRlbGV0ZU9iamVjdFN0b3JlIiwiJF9tb2RlbHMiLCJzdG9yZU5hbWVzIiwibW9kZSIsIiR0cmFuc2FjdGlvbiIsInN0b3Jlc09iaiIsInN0b3JlcyIsInN0b3JlTmFtZSIsIiRzdG9yZSIsIlRyYW5zYWN0aW9uTW9kZSIsIlJlYWRPbmx5IiwiUmVhZFdyaXRlIiwiYWRkIiwicXVlcnkiLCJjbGVhciIsImdldEtleSIsImNvdW50IiwiZ2V0QWxsIiwiZ2V0QWxsS2V5cyIsImRpcmVjdGlvbiIsIm9wZW5LZXlDdXJzb3IiLCJkZWxldGVJbmRleCIsImRlZXBGaWVsZCIsImlkYk1vZGVsRmFjdG9yeSIsInN0b3JlIiwiJHdyaXRlciIsIiRyZWFkZXIiLCIkZ2V0SW5zdGFuY2UiLCIkYWRkIiwiJF9yZW1vdGUiLCIkX3ZhbHVlcyIsImxvY2FsIiwiJGtleSIsIiRkZWZBY2Nlc3NUb2tlbklkIiwiJGRlZkN1cnJlbnRVc2VySWQiLCIkY29ubmVjdCIsIiR1cmwiLCIkcHVzaExpc3RlbmVyIiwiJF9saXN0ZW5lcnMiLCIkc2V0VXJsU2VydmVyIiwiJHNldENyZWRlbnRpYWxzIiwiYWJvcnQiLCIkY29tcGxldGVkIiwic3RhY2siLCJsIiwiJHVuYmluZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdB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Ozs7Ozs7O0FDUUEsUUFBTyxlQUFlLFNBQVMsY0FBYztHQUMzQyxPQUFPOzs7QUFHVCxTQUFRLHNCRExPLFVBQVVnUixTQUFTO0dBQUU7O0dBRWxDLE9BQU87OztHQUdQQSxRQUFRLFNBQVN5QixpQkFBa0I7Ozs7SUFJbENsQixTQUFTLGVBQWUsRUFBRTlULE9BQU87Ozs7SUFJakM2UyxPQUFPLFNBQVMsVUFBVXJTLE1BQU1ULFVBQVU7S0FDekMsSUFBRyxFQUFFUyxRQUFRLEtBQUtrWSxjQUFjO09BQzlCLEtBQUtBLFlBQVlsWSxRQUFROztLQUUzQixLQUFLa1ksWUFBWWxZLE1BQU0rQixLQUFLeEM7Ozs7O0lBSzdCOFMsT0FBTyxZQUFZLFVBQVVyUyxNQUFNVCxVQUFVO0tBQzVDLElBQUcsRUFBRVMsUUFBUSxLQUFLa1ksY0FBYztPQUM5Qjs7S0FFRixJQUFJSyxRQUFRLEtBQUtMLFlBQVlsWTtLQUM3QixLQUFJLElBQUlELElBQUksR0FBR3lZLElBQUlELE1BQU0zVyxRQUFRN0IsSUFBSXlZLEdBQUd6WSxLQUFLO09BQzNDLElBQUd3WSxNQUFNeFksT0FBT1IsVUFBUztTQUN2QmdaLE1BQU0xVCxPQUFPOUUsR0FBRztTQUNoQixPQUFPLEtBQUswWSxRQUFRelksTUFBTVQ7Ozs7Ozs7SUFPL0I4UyxPQUFPLFNBQVMsVUFBVW5MLE9BQU87S0FDaEMsSUFBRyxFQUFFQSxNQUFNbEgsUUFBUSxLQUFLa1ksY0FBYztPQUNwQzs7S0FFRixJQUFJSyxRQUFRLEtBQUtMLFlBQVloUixNQUFNbEg7S0FDbkMsS0FBSSxJQUFJRCxJQUFJLEdBQUd5WSxJQUFJRCxNQUFNM1csUUFBUTdCLElBQUl5WSxHQUFHelksS0FBSztPQUN6Q3dZLE1BQU14WSxHQUFHTSxLQUFLLE1BQU02Rzs7Ozs7SUFLekJrTSIsImZpbGUiOiJuZy1pZGIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDEwNGRlYTRhNTcwYWVkM2U3ZmNkXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IGlkYlV0aWxzIGZyb20gJy4vdXRpbHMvaWRiVXRpbHMnO1xyXG5pbXBvcnQgaWRiRXZlbnRzIGZyb20gJy4vdXRpbHMvaWRiRXZlbnRzJztcclxuaW1wb3J0IHFzIGZyb20gJy4vdXRpbHMvcXMnO1xyXG5cclxuaW1wb3J0IGlkYlNvY2tldCBmcm9tICcuL3NlcnZpY2VzL2lkYlNvY2tldCc7XHJcbmltcG9ydCBpZGIgZnJvbSAnLi9zZXJ2aWNlcy9pZGInO1xyXG5pbXBvcnQgaWRiTW9kZWwgZnJvbSAnLi9zZXJ2aWNlcy9pZGJNb2RlbCc7XHJcbmltcG9ydCBpZGJRdWVyeSBmcm9tICcuL3NlcnZpY2VzL2lkYlF1ZXJ5JztcclxuXHJcbmltcG9ydCBsYiBmcm9tICcuL3NlcnZpY2VzL2xiJztcclxuXHJcbmltcG9ydCAnLi92MS9pbmRleCc7XHJcblxyXG5sYihhbmd1bGFyLm1vZHVsZSgnbmcuaWRiJywgWyduZy52MS5pZGInXSkpXHJcbiAgXHJcbiAgLnNlcnZpY2UoJ2lkYkV2ZW50cycsIGlkYkV2ZW50cylcclxuICAuc2VydmljZSgnaWRiVXRpbHMnLCBpZGJVdGlscylcclxuICAuc2VydmljZSgncXMnLCBxcylcclxuXHJcbiAgLy8gVGFrZSBvZiBsYi1zZXJ2aWNlcy5qc1xyXG4gIC5zZXJ2aWNlKCdpZGInLCBpZGIpXHJcbiAgLnNlcnZpY2UoJ2lkYk1vZGVsJywgaWRiTW9kZWwpXHJcbiAgLnNlcnZpY2UoJ2lkYlF1ZXJ5JywgaWRiUXVlcnkpXHJcbiAgLnNlcnZpY2UoJ2lkYlNvY2tldCcsIGlkYlNvY2tldClcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfaWRiVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzL2lkYlV0aWxzJyk7XG5cbnZhciBfaWRiVXRpbHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiVXRpbHMpO1xuXG52YXIgX2lkYkV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvaWRiRXZlbnRzJyk7XG5cbnZhciBfaWRiRXZlbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYkV2ZW50cyk7XG5cbnZhciBfcXMgPSByZXF1aXJlKCcuL3V0aWxzL3FzJyk7XG5cbnZhciBfcXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcXMpO1xuXG52YXIgX2lkYlNvY2tldCA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiU29ja2V0Jyk7XG5cbnZhciBfaWRiU29ja2V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlNvY2tldCk7XG5cbnZhciBfaWRiID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGInKTtcblxudmFyIF9pZGIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiKTtcblxudmFyIF9pZGJNb2RlbCA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiTW9kZWwnKTtcblxudmFyIF9pZGJNb2RlbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJNb2RlbCk7XG5cbnZhciBfaWRiUXVlcnkgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYlF1ZXJ5Jyk7XG5cbnZhciBfaWRiUXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiUXVlcnkpO1xuXG52YXIgX2xiID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9sYicpO1xuXG52YXIgX2xiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xiKTtcblxucmVxdWlyZSgnLi92MS9pbmRleCcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4oMCwgX2xiMi5kZWZhdWx0KShhbmd1bGFyLm1vZHVsZSgnbmcuaWRiJywgWyduZy52MS5pZGInXSkpLnNlcnZpY2UoJ2lkYkV2ZW50cycsIF9pZGJFdmVudHMyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlV0aWxzJywgX2lkYlV0aWxzMi5kZWZhdWx0KS5zZXJ2aWNlKCdxcycsIF9xczIuZGVmYXVsdClcblxuLy8gVGFrZSBvZiBsYi1zZXJ2aWNlcy5qc1xuLnNlcnZpY2UoJ2lkYicsIF9pZGIyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYk1vZGVsJywgX2lkYk1vZGVsMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJRdWVyeScsIF9pZGJRdWVyeTIuZGVmYXVsdCkuc2VydmljZSgnaWRiU29ja2V0JywgX2lkYlNvY2tldDIuZGVmYXVsdCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJVdGlscyAoJHEpIHsgJ25nSW5qZWN0J1xyXG4gIFxyXG4gIGNvbnN0IHZhbGlkYXRvcnMgPSB7XHJcbiAgICAvLyBGdW5jaW9uIHBhcmEgZGV0ZXJtaW5hciBzaSBlcyB1biBjYWxsYmFjayB2w6FsaWRvIG8gbm9cclxuICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nIHx8IHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gdW5kZWZpbmVkO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBWZXJpZmljYSBzaSB1biB2YWxvciBlcyB1biBhcnJheVxyXG4gICAgYXJyYXk6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICB9ICBcclxuXHJcbiAgLy8gR2VuZXJhIHVuIGVycm9yIHNpIGVsIHZhbG9yIG5vIGVzIGRlbCB0aXBvIGluZGljYWRvIHBvciBwYXJhbWV0cm9cclxuICBmdW5jdGlvbiB2YWxpZCAodmFsdWUsIHR5cGVzKSB7XHJcbiAgICBpZiAoIXZhbGlkYXRvcnMuYXJyYXkodHlwZXMpKSB0eXBlcyA9IFt0eXBlc107XHJcblxyXG4gICAgZm9yKGxldCBpIGluIHR5cGVzKXtcclxuICAgICAgY29uc3QgdHlwZSA9IHR5cGVzW2ldO1xyXG4gICAgICBpZiAodHlwZW9mIHR5cGUgPT0gJ3N0cmluZycpe1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsaWRhdG9yc1t0eXBlXSA9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICBpZiAodmFsaWRhdG9yc1t0eXBlXSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT0gdHlwZSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0eXBlID09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgIGlmKHR5cGUoYXJnc1tpXSkpe1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIFZhbGlkYSB1biBhcnJheSBkZSBhcmd1bWVudG9zIGNvbiB1biBhcnJhIGRlIHRpcG9zXHJcbiAgZnVuY3Rpb24gdmFsaWRhdGUgKGFyZ3MsIHR5cGVzKSB7XHJcblxyXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xyXG4gICAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xyXG4gICAgZm9yIChsZXQgaSBpbiBhcmdzKXtcclxuICAgICAgY29uc3QgdmFsdWUgPSBhcmdzW2ldO1xyXG4gICAgICBjb25zdCB0eXBlID0gdHlwZXNbaV07XHJcbiAgICAgIGlmICh0eXBlICYmICF2YWxpZCh2YWx1ZSwgdHlwZSkpe1xyXG4gICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsaWRhdG9yIHRvOiAnK2FyZ3NbaV0rJyBtdXN0IGJlICcrdHlwZSk7XHJcbiAgICAgICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbGlkYXRvcidcclxuICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdmFsaWRhdGU6IHZhbGlkYXRlLFxyXG4gIH07XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiVXRpbHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gaWRiVXRpbHM7XG5mdW5jdGlvbiBpZGJVdGlscygkcSkge1xuICAnbmdJbmplY3QnO1xuXG4gIHZhciB2YWxpZGF0b3JzID0ge1xuICAgIC8vIEZ1bmNpb24gcGFyYSBkZXRlcm1pbmFyIHNpIGVzIHVuIGNhbGxiYWNrIHbDoWxpZG8gbyBub1xuICAgIGNhbGxiYWNrOiBmdW5jdGlvbiBjYWxsYmFjayh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nIHx8IHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gdW5kZWZpbmVkO1xuICAgIH0sXG5cbiAgICAvLyBWZXJpZmljYSBzaSB1biB2YWxvciBlcyB1biBhcnJheVxuICAgIGFycmF5OiBmdW5jdGlvbiBhcnJheSh2YWx1ZSkge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpO1xuICAgIH1cblxuICB9O1xuXG4gIC8vIEdlbmVyYSB1biBlcnJvciBzaSBlbCB2YWxvciBubyBlcyBkZWwgdGlwbyBpbmRpY2FkbyBwb3IgcGFyYW1ldHJvXG4gIGZ1bmN0aW9uIHZhbGlkKHZhbHVlLCB0eXBlcykge1xuICAgIGlmICghdmFsaWRhdG9ycy5hcnJheSh0eXBlcykpIHR5cGVzID0gW3R5cGVzXTtcblxuICAgIGZvciAodmFyIGkgaW4gdHlwZXMpIHtcbiAgICAgIHZhciB0eXBlID0gdHlwZXNbaV07XG4gICAgICBpZiAodHlwZW9mIHR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWxpZGF0b3JzW3R5cGVdID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpZiAodmFsaWRhdG9yc1t0eXBlXSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSkpID09IHR5cGUpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdHlwZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmICh0eXBlKGFyZ3NbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBWYWxpZGEgdW4gYXJyYXkgZGUgYXJndW1lbnRvcyBjb24gdW4gYXJyYSBkZSB0aXBvc1xuICBmdW5jdGlvbiB2YWxpZGF0ZShhcmdzLCB0eXBlcykge1xuXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcbiAgICBmb3IgKHZhciBpIGluIGFyZ3MpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGFyZ3NbaV07XG4gICAgICB2YXIgdHlwZSA9IHR5cGVzW2ldO1xuICAgICAgaWYgKHR5cGUgJiYgIXZhbGlkKHZhbHVlLCB0eXBlKSkge1xuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbGlkYXRvciB0bzogJyArIGFyZ3NbaV0gKyAnIG11c3QgYmUgJyArIHR5cGUpO1xuICAgICAgICBlcnIubmFtZSA9ICdJbnZhbGlkVmFsaWRhdG9yJztcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdmFsaWRhdGU6IHZhbGlkYXRlXG4gIH07XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiVXRpbHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBOb21icmUgZGUgbG9zIGV2ZW50b3NcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiRXZlbnRzKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBEQl9FUlJPUjogJ2NiLmVycm9yJyxcclxuICAgIE1PREVMX0lOU1RBTkNFRCA6ICdtb2RlbC5pbnN0YW5jZWQnLFxyXG4gICAgTU9ERUxfUkVQTEFDRSA6ICdtb2RlbC5yZXBsYWNlJyxcclxuICAgIE1PREVMX1FVRVJJRUQgOiAnbW9kZWwucXVlcmllZCcsXHJcbiAgICBNT0RFTF9VTlFVRVJJRUQgOiAnbW9kZWwudW5xdWVyaWVkJyxcclxuICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBOb21icmUgZGUgbG9zIGV2ZW50b3NcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYkV2ZW50cztcbmZ1bmN0aW9uIGlkYkV2ZW50cygpIHtcbiAgcmV0dXJuIHtcbiAgICBEQl9FUlJPUjogJ2NiLmVycm9yJyxcbiAgICBNT0RFTF9JTlNUQU5DRUQ6ICdtb2RlbC5pbnN0YW5jZWQnLFxuICAgIE1PREVMX1JFUExBQ0U6ICdtb2RlbC5yZXBsYWNlJyxcbiAgICBNT0RFTF9RVUVSSUVEOiAnbW9kZWwucXVlcmllZCcsXG4gICAgTU9ERUxfVU5RVUVSSUVEOiAnbW9kZWwudW5xdWVyaWVkJ1xuICB9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9pZGJFdmVudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBxcyAoKSB7ICduZ0luamVjdCdcclxuICBcclxuICBmdW5jdGlvbiBxc0NsYXNzIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIFxyXG4gICAgbGV0IHRoZW5zID0gW107XHJcbiAgICBsZXQgdGhlbnNSZWFkeSA9IFtdO1xyXG4gICAgbGV0IGNhdGNocyA9IFtdO1xyXG4gICAgbGV0IGNhdGNoc1JlYWR5ID0gW107XHJcbiAgICBsZXQgcmVzdWx0QXJncyA9IG51bGw7XHJcbiAgICBsZXQgZXJyb3IgPSBudWxsO1xyXG5cclxuICAgIHRoaXoucHJvbWlzZSA9IHt9O1xyXG4gICAgdGhpei4kcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiB0aGVuc1Jlc29sdmVkICgpIHtcclxuICAgICAgaWYgKCF0aGVucy5sZW5ndGgpIHJldHVybjtcclxuICAgICAgbGV0IGNiID0gdGhlbnMuc2hpZnQoKTtcclxuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5yZXN1bHRBcmdzKTtcclxuICAgICAgdGhlbnNSZWFkeS5wdXNoKGNiKTtcclxuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNhdGNoc1Jlc29sdmVkICgpIHtcclxuICAgICAgaWYgKCFjYXRjaHMubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgIGxldCBjYiA9IGNhdGNocy5zaGlmdCgpO1xyXG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcclxuICAgICAgY2F0Y2hzUmVhZHkucHVzaChjYik7XHJcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpei5yZXNvbHZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcclxuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICB0aGl6LnJlc3VsdEFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucmVqZWN0ID0gZnVuY3Rpb24gKGVycikge1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcclxuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICB0aGl6LmVycm9yID0gZXJyIHx8IHt9O1xyXG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnByb21pc2UudGhlbiA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICB0aGVucy5wdXNoKGNiKTtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmICF0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGl6LnByb21pc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucHJvbWlzZS5jYXRjaCA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICBjYXRjaHMucHVzaChjYik7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiB0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpei5wcm9taXNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnByb21pc2UuZG9uZSA9IGZ1bmN0aW9uIChjYikge1xyXG5cclxuICAgICAgdGhlbnMucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgW251bGxdLmNvbmNhdCh0aGl6LnJlc3VsdEFyZ3MpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjYXRjaHMucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSB7XHJcbiAgICAgICAgaWYgKCF0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgaWYoY2IpIHRoaXoucHJvbWlzZS5kb25lKGNiKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgLy8gQ3JlYSB1bmEgaW5zdGFuY2lhIGRlbCBkZWZlcmVkXHJcbiAgcXNDbGFzcy5kZWZlciA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgcmV0dXJuIG5ldyBxc0NsYXNzKGNiKTtcclxuICB9O1xyXG5cclxuICBxc0NsYXNzLmFsbCA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIGNvbnN0IGRlZmVyZWQgPSBxc0NsYXNzLmRlZmVyKCk7XHJcblxyXG4gICAgbGV0IHByb21pc2VzID0ga2V5cy5sZW5ndGg7XHJcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYXJyKTtcclxuICAgIGNvbnN0IHJlc3VsdHMgPSBhcnIubGVuZ3RoPyBbXSA6IHt9O1xyXG5cclxuICAgIGtleXMubWFwKGZ1bmN0aW9uIChpZHgpIHtcclxuXHJcbiAgICAgIGFycltpZHhdLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIHByb21pc2VzLS07XHJcbiAgICAgICAgcmVzdWx0c1tpZHhdID0gcmVzdWx0O1xyXG4gICAgICAgIGlmICghcHJvbWlzZXMpe1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKHJlc3VsdHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhcnJbaWR4XS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gIH07XHJcblxyXG4gIHJldHVybiBxc0NsYXNzO1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL3FzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gcXM7XG5mdW5jdGlvbiBxcygpIHtcbiAgJ25nSW5qZWN0JztcblxuICBmdW5jdGlvbiBxc0NsYXNzKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIHRoZW5zID0gW107XG4gICAgdmFyIHRoZW5zUmVhZHkgPSBbXTtcbiAgICB2YXIgY2F0Y2hzID0gW107XG4gICAgdmFyIGNhdGNoc1JlYWR5ID0gW107XG4gICAgdmFyIHJlc3VsdEFyZ3MgPSBudWxsO1xuICAgIHZhciBlcnJvciA9IG51bGw7XG5cbiAgICB0aGl6LnByb21pc2UgPSB7fTtcbiAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gdGhlbnNSZXNvbHZlZCgpIHtcbiAgICAgIGlmICghdGhlbnMubGVuZ3RoKSByZXR1cm47XG4gICAgICB2YXIgY2IgPSB0aGVucy5zaGlmdCgpO1xuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5yZXN1bHRBcmdzKTtcbiAgICAgIHRoZW5zUmVhZHkucHVzaChjYik7XG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2F0Y2hzUmVzb2x2ZWQoKSB7XG4gICAgICBpZiAoIWNhdGNocy5sZW5ndGgpIHJldHVybjtcbiAgICAgIHZhciBjYiA9IGNhdGNocy5zaGlmdCgpO1xuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XG4gICAgICBjYXRjaHNSZWFkeS5wdXNoKGNiKTtcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgfVxuXG4gICAgdGhpei5yZXNvbHZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICB0aGl6LnJlc3VsdEFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgIH07XG5cbiAgICB0aGl6LnJlamVjdCA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgdGhpei5lcnJvciA9IGVyciB8fCB7fTtcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgfTtcblxuICAgIHRoaXoucHJvbWlzZS50aGVuID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB0aGVucy5wdXNoKGNiKTtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiAhdGhpei5lcnJvcikge1xuICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpei5wcm9taXNlO1xuICAgIH07XG5cbiAgICB0aGl6LnByb21pc2UuY2F0Y2ggPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIGNhdGNocy5wdXNoKGNiKTtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiB0aGl6LmVycm9yKSB7XG4gICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpei5wcm9taXNlO1xuICAgIH07XG5cbiAgICB0aGl6LnByb21pc2UuZG9uZSA9IGZ1bmN0aW9uIChjYikge1xuXG4gICAgICB0aGVucy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgW251bGxdLmNvbmNhdCh0aGl6LnJlc3VsdEFyZ3MpKTtcbiAgICAgIH0pO1xuXG4gICAgICBjYXRjaHMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkge1xuICAgICAgICBpZiAoIXRoaXouZXJyb3IpIHtcbiAgICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgaWYgKGNiKSB0aGl6LnByb21pc2UuZG9uZShjYik7XG4gIH07XG5cbiAgLy8gQ3JlYSB1bmEgaW5zdGFuY2lhIGRlbCBkZWZlcmVkXG4gIHFzQ2xhc3MuZGVmZXIgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICByZXR1cm4gbmV3IHFzQ2xhc3MoY2IpO1xuICB9O1xuXG4gIHFzQ2xhc3MuYWxsID0gZnVuY3Rpb24gKGFycikge1xuICAgIHZhciBkZWZlcmVkID0gcXNDbGFzcy5kZWZlcigpO1xuXG4gICAgdmFyIHByb21pc2VzID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICAgIHZhciByZXN1bHRzID0gYXJyLmxlbmd0aCA/IFtdIDoge307XG5cbiAgICBrZXlzLm1hcChmdW5jdGlvbiAoaWR4KSB7XG5cbiAgICAgIGFycltpZHhdLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICBwcm9taXNlcy0tO1xuICAgICAgICByZXN1bHRzW2lkeF0gPSByZXN1bHQ7XG4gICAgICAgIGlmICghcHJvbWlzZXMpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBhcnJbaWR4XS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkZWZlcmVkO1xuICB9O1xuXG4gIHJldHVybiBxc0NsYXNzO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL3FzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiU29ja2V0U2VydmljZSgkbG9nLCBpbywgaWRiVXRpbHMpIHsgJ25nSW5qZWN0JzsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgXHJcbiAgbGV0ICRkZWZVcmxTZXJ2ZXIgPSBudWxsO1xyXG5cclxuICBmdW5jdGlvbiBpZGJTb2NrZXQgKCR1cmxTZXJ2ZXIsICRhY2Nlc3NUb2tlbklkLCAkY3VycmVudFVzZXJJZCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3N0cmluZycsICdudW1iZXInXSwgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcclxuXHJcbiAgICBjb25zdCAkbGlzdGVuZXJzID0gIFtdO1xyXG4gICAgbGV0ICRzb2NrZXQgPSBudWxsO1xyXG4gICAgJHVybFNlcnZlciA9ICR1cmxTZXJ2ZXIgfHwgJGRlZlVybFNlcnZlcjtcclxuXHJcbiAgICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXHJcbiAgICB0aGl6LmNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIFxyXG4gICAgICAvLyBDcmVhdGluZyBjb25uZWN0aW9uIHdpdGggc2VydmVyXHJcbiAgICAgICRzb2NrZXQgPSBpby5jb25uZWN0KCR1cmxTZXJ2ZXIpO1xyXG5cclxuICAgICAgLy8gVGhpcyBwYXJ0IGlzIG9ubHkgZm9yIGxvZ2luIHVzZXJzIGZvciBhdXRoZW50aWNhdGVkICRzb2NrZXQgY29ubmVjdGlvbiBiZXR3ZWVuIGNsaWVudCBhbmQgc2VydmVyLlxyXG4gICAgICAvLyBJZiB5b3UgYXJlIG5vdCB1c2luZyBsb2dpbiBwYWdlIGluIHlvdSB3ZWJzaXRlIHRoZW4geW91IHNob3VsZCByZW1vdmUgcmVzdCBwaWVjZSBvZiBjb2RlLi5cclxuXHJcbiAgICAgICRzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICRsb2cubG9nKCdjb25uZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgJHNvY2tldC5lbWl0KCdhdXRoZW50aWNhdGlvbicsIHtcclxuICAgICAgICAgIGlkOiAkYWNjZXNzVG9rZW5JZCxcclxuICAgICAgICAgIHVzZXJJZDogJGN1cnJlbnRVc2VySWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHNvY2tldC5vbignYXV0aGVudGljYXRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgLy8gdXNlIHRoZSAkc29ja2V0IGFzIHVzdWFsXHJcbiAgICAgICAgICAkbG9nLmxvZygnVXNlciBpcyBhdXRoZW50aWNhdGVkJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouc3Vic2NyaWJlID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICB2YXIgbmFtZSA9IG9wdGlvbnMubW9kZWxOYW1lICsgJy4nICsgb3B0aW9ucy5ldmVudE5hbWU7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMubW9kZWxJZCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBuYW1lID0gbmFtZSArICcuJyArIG9wdGlvbnMubW9kZWxJZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgJHNvY2tldC5vbihuYW1lLCBjYik7XHJcbiAgICAgIFxyXG4gICAgICAvL1B1c2ggdGhlIGNvbnRhaW5lci4uXHJcbiAgICAgICRsaXN0ZW5lcnMucHVzaChuYW1lLCBjYik7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnB1c2hMaXN0ZW5lciA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgJGxpc3RlbmVycy5wdXNoKHN1YnNjcmlwdGlvbk5hbWUpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhpei51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lKSB7XHJcbiAgICAgICRzb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzKHN1YnNjcmlwdGlvbk5hbWUpOyAgXHJcbiAgICAgIHZhciBpZHggPSAkbGlzdGVuZXJzLmluZGV4T2Yoc3Vic2NyaXB0aW9uTmFtZSk7XHJcbiAgICAgIGlmIChpZHggIT0gLTEpe1xyXG4gICAgICAgICRsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpei5jb25uZWN0KCk7XHJcblxyXG4gIH07XHJcblxyXG4gIC8vIEFzaWduYSBsYSBVUkwgZGUgc2Vydmlkb3IgcG9yIGRlZmVjdG9cclxuICBpZGJTb2NrZXQuc2V0VXJsU2VydmVyID0gZnVuY3Rpb24gKHVybFNlcnZlcikge1xyXG4gICAgJGRlZlVybFNlcnZlciA9IHVybFNlcnZlcjtcclxuICB9O1xyXG5cclxuICAvLyBBU2lnbmEgbGFzIGNyZWRlbmNpYWxlcyBwb3IgZGVmZWN0b1xyXG4gIGlkYlNvY2tldC5zZXRDcmVkZW50aWFscyA9IGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XHJcbiAgICBhY2Nlc3NUb2tlbklkID0gJGFjY2Vzc1Rva2VuSWRcclxuICAgIGN1cnJlbnRVc2VySWQgPSAkY3VycmVudFVzZXJJZDtcclxuICB9O1xyXG5cclxuICByZXR1cm4gaWRiU29ja2V0O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYlNvY2tldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYlNvY2tldFNlcnZpY2U7XG5mdW5jdGlvbiBpZGJTb2NrZXRTZXJ2aWNlKCRsb2csIGlvLCBpZGJVdGlscykge1xuICAnbmdJbmplY3QnO1xuICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgdmFyICRkZWZVcmxTZXJ2ZXIgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIGlkYlNvY2tldCgkdXJsU2VydmVyLCAkYWNjZXNzVG9rZW5JZCwgJGN1cnJlbnRVc2VySWQpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnc3RyaW5nJywgJ251bWJlciddLCBbJ3N0cmluZycsICdudW1iZXInXV0pO1xuXG4gICAgdmFyICRsaXN0ZW5lcnMgPSBbXTtcbiAgICB2YXIgJHNvY2tldCA9IG51bGw7XG4gICAgJHVybFNlcnZlciA9ICR1cmxTZXJ2ZXIgfHwgJGRlZlVybFNlcnZlcjtcblxuICAgIC8vIENvbmVjdGFyc2UgYWwgc2Vydmlkb3JcbiAgICB0aGl6LmNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIC8vIENyZWF0aW5nIGNvbm5lY3Rpb24gd2l0aCBzZXJ2ZXJcbiAgICAgICRzb2NrZXQgPSBpby5jb25uZWN0KCR1cmxTZXJ2ZXIpO1xuXG4gICAgICAvLyBUaGlzIHBhcnQgaXMgb25seSBmb3IgbG9naW4gdXNlcnMgZm9yIGF1dGhlbnRpY2F0ZWQgJHNvY2tldCBjb25uZWN0aW9uIGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIuXG4gICAgICAvLyBJZiB5b3UgYXJlIG5vdCB1c2luZyBsb2dpbiBwYWdlIGluIHlvdSB3ZWJzaXRlIHRoZW4geW91IHNob3VsZCByZW1vdmUgcmVzdCBwaWVjZSBvZiBjb2RlLi5cblxuICAgICAgJHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJGxvZy5sb2coJ2Nvbm5lY3RlZCcpO1xuXG4gICAgICAgICRzb2NrZXQuZW1pdCgnYXV0aGVudGljYXRpb24nLCB7XG4gICAgICAgICAgaWQ6ICRhY2Nlc3NUb2tlbklkLFxuICAgICAgICAgIHVzZXJJZDogJGN1cnJlbnRVc2VySWRcbiAgICAgICAgfSk7XG4gICAgICAgICRzb2NrZXQub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gdXNlIHRoZSAkc29ja2V0IGFzIHVzdWFsXG4gICAgICAgICAgJGxvZy5sb2coJ1VzZXIgaXMgYXV0aGVudGljYXRlZCcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGl6LnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdmFyIG5hbWUgPSBvcHRpb25zLm1vZGVsTmFtZSArICcuJyArIG9wdGlvbnMuZXZlbnROYW1lO1xuXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMubW9kZWxJZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUgKyAnLicgKyBvcHRpb25zLm1vZGVsSWQ7XG4gICAgICB9XG5cbiAgICAgICRzb2NrZXQub24obmFtZSwgY2IpO1xuXG4gICAgICAvL1B1c2ggdGhlIGNvbnRhaW5lci4uXG4gICAgICAkbGlzdGVuZXJzLnB1c2gobmFtZSwgY2IpO1xuICAgIH07XG5cbiAgICB0aGl6LnB1c2hMaXN0ZW5lciA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lLCBjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgJGxpc3RlbmVycy5wdXNoKHN1YnNjcmlwdGlvbk5hbWUpO1xuICAgIH07XG5cbiAgICB0aGl6LnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmlwdGlvbk5hbWUpIHtcbiAgICAgICRzb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzKHN1YnNjcmlwdGlvbk5hbWUpO1xuICAgICAgdmFyIGlkeCA9ICRsaXN0ZW5lcnMuaW5kZXhPZihzdWJzY3JpcHRpb25OYW1lKTtcbiAgICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgICAgJGxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpei5jb25uZWN0KCk7XG4gIH07XG5cbiAgLy8gQXNpZ25hIGxhIFVSTCBkZSBzZXJ2aWRvciBwb3IgZGVmZWN0b1xuICBpZGJTb2NrZXQuc2V0VXJsU2VydmVyID0gZnVuY3Rpb24gKHVybFNlcnZlcikge1xuICAgICRkZWZVcmxTZXJ2ZXIgPSB1cmxTZXJ2ZXI7XG4gIH07XG5cbiAgLy8gQVNpZ25hIGxhcyBjcmVkZW5jaWFsZXMgcG9yIGRlZmVjdG9cbiAgaWRiU29ja2V0LnNldENyZWRlbnRpYWxzID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIGN1cnJlbnRVc2VySWQpIHtcbiAgICBhY2Nlc3NUb2tlbklkID0gJGFjY2Vzc1Rva2VuSWQ7XG4gICAgY3VycmVudFVzZXJJZCA9ICRjdXJyZW50VXNlcklkO1xuICB9O1xuXG4gIHJldHVybiBpZGJTb2NrZXQ7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYlNlcnZpY2UgKCRsb2csIHFzLCBpZGJVdGlscywgaWRiRXZlbnRzLCBpZGJNb2RlbCkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAvLyBFbiBsYSBzaWd1aWVudGUgbGluZWEsIHB1ZWRlIGluY2x1aXIgcHJlZmlqb3MgZGUgaW1wbGVtZW50YWNpb24gcXVlIHF1aWVyYSBwcm9iYXIuXHJcbiAgICBjb25zdCBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XHJcbiAgICAvLyBObyB1c2UgXCJjb25zdCBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXHJcbiAgICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcclxuICAgIGNvbnN0IElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcclxuICAgIGNvbnN0IElEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcclxuICAgIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXHJcbiAgICBcclxuICAgIGlmICghaW5kZXhlZERCKSB7XHJcbiAgICAgIGFsZXJ0KFwiU3UgbmF2ZWdhZG9yIG5vIHNvcG9ydGEgdW5hIHZlcnNpw7NuIGVzdGFibGUgZGUgaW5kZXhlZERCLiBUYWwgeSBjb21vIGxhcyBjYXJhY3RlcsOtc3RpY2FzIG5vIHNlcsOhbiB2YWxpZGFzXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gIC8vIENsYXNlIHBhcmEgbGEgY3JlYWNpw7NuIGRlIGluc3RhbmNpYXMgZGUgbGEgQkRcclxuICBmdW5jdGlvbiBpZGIoJGRiTmFtZSwgJGRiVmVyc2lvbiwgJHNvY2tldCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnbnVtYmVyJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgLy8gTWFuZWphZG9yZXMgZGUgZXZlbnRvcy5cclxuICAgIGNvbnN0ICRldmVudHNDYWxsYmFja3MgPSB7fTtcclxuICAgIGNvbnN0ICR1cGdyYWRlTmVlZGVkRGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcbiAgICBjb25zdCAkb3BlbkRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG4gICAgY29uc3QgJHNvY2tldENvbm5lY3RlZERlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG4gICAgbGV0ICRvcGVuZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBJbnN0YW5jaWEgZGUgbGEgYmFzZSBkZSBkYXRvcztcclxuICAgIGxldCAkcmVxdWVzdCA9IG51bGw7XHJcbiAgICB0aGl6Lm1vZGVscyA9IHt9O1xyXG5cclxuICAgIC8vIEFncmVnYXIgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xyXG4gICAgICB0aGl6LmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKXtcclxuICAgICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnB1c2goY2IpO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAvL1JlbXVldmUgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xyXG4gICAgICB0aGl6LnVuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcclxuXHJcbiAgICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gQnVzY2FyIGVsIGNiXHJcbiAgICAgICAgY29uc3QgaWR4ID0gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLmluZGV4T2YoY2IpO1xyXG5cclxuICAgICAgICAvLyBTaSBzZSBlbmNvbnRybyBlbCBjYiByZW1vdmVybG9cclxuICAgICAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXHJcbiAgICAgIHRoaXoudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcclxuXHJcbiAgICAgICAgJGxvZy5sb2coJGRiTmFtZSsnLnYnKygkZGJWZXJzaW9ufHwxKSsnOiAnK2V2ZW50TmFtZSk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSBpbiAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pe1xyXG4gICAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdW2ldLmFwcGx5KHRoaXosIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgLy8gQ2FsbGJhY2tzIHBhcmEgbG9zIGVycm9yZXNcclxuICAgICAgdGhpei5lcnJvciA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgIHRoaXouYmluZChpZGJFdmVudHMuREJfRVJST1IsIGNiKTtcclxuICAgICAgICByZXR1cm4gdGhpejtcclxuICAgICAgfTtcclxuXHJcbiAgICAvLyBBYnJpciB1bmEgQmFzZSBkZSBkYXRvcy5cclxuICAgIHRoaXoub3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCRvcGVuZWQpIHJldHVybiAkb3BlbkRlZmVyZWQ7XHJcblxyXG4gICAgICAvLyBDcmVhciB1biBudWV2byBkZWZlclxyXG4gICAgICAkb3BlbmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIC8vIGRlamFtb3MgYWJpZXJ0YSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcclxuICAgICAgZnVuY3Rpb24gcmVhZHkoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHJxID0gaW5kZXhlZERCLm9wZW4oJGRiTmFtZSwgJGRiVmVyc2lvbik7XHJcblxyXG4gICAgICAgIHJxLm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxyXG4gICAgICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGVsIHJlc3VsdGFkb1xyXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxyXG4gICAgICAgICAgJHJlcXVlc3QgPSBycTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gQXNpbmdhciBlbCBtYW5lamFkb3IgZGUgZXJyb3JlcyBhIGxhIEJEXHJcbiAgICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICRsb2cuZXJyb3IoJ0RhdGFiYXNlIGVycm9yOiAnKyBldmVudC50YXJnZXQuZXJyb3JDb2RlKTtcclxuICAgICAgICAgICAgdGhpei50cmlnZ2VyKGlkYkV2ZW50cy5EQl9FUlJPUiwgW2V2ZW50XSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgJG9wZW5EZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGUgZXJyb3Jlc1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEuZXJyb3JDb2RlIVxyXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZWplY3QocnEuZXJyb3JDb2RlLCBldmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZSgkZGJOYW1lKS5vbnN1Y2Nlc3MgPSByZWFkeTtcclxuICAgICAgLy8gcmVhZHkoKTtcclxuXHJcbiAgICAgIHJldHVybiAkb3BlbkRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZ3JlZ2EgdW4gbnVldm8gbW9kZWxvXHJcbiAgICAgIHRoaXoubW9kZWwgPSBmdW5jdGlvbiAobmFtZSwgc29ja2V0KSB7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsndW5kZWZpbmVkJywgJ29iamVjdCddXSk7XHJcblxyXG4gICAgICAgIC8vIEluc3RhbmNpYXIgZWwgbW9kZWxvXHJcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpei5tb2RlbHNbbmFtZV07XHJcblxyXG4gICAgICAgIC8vIFNpIG5vIGV4aXN0ZSBlbCBtb2RlbG8gY3JlYXJcclxuICAgICAgICBpZighbW9kZWwpe1xyXG4gICAgICAgICAgbW9kZWwgPSBpZGJNb2RlbCh0aGl6LCBuYW1lLCBzb2NrZXQgfHwgJHNvY2tldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBHdWFyZGFyIGVsIG1vZGVsbyBlbiBsb3MgbW9kZWxvc1xyXG4gICAgICAgIHRoaXoubW9kZWxzW25hbWVdID0gbW9kZWw7XHJcblxyXG4gICAgICAgIC8vIFJldG9ybmFyIGVsIG1vZGVsb1xyXG4gICAgICAgIHJldHVybiBtb2RlbDtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXHJcbiAgICAgIHRoaXouY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBtb2RlbElkKSB7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xyXG4gICAgICAgICAgcnEucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKG1vZGVsTmFtZSwgbW9kZWxJZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxyXG4gICAgdGhpei5jcmVhdGVJbmRleCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcclxuICAgICAgICBycS50cmFuc2FjdGlvbi5vYmplY3RTdG9yZShtb2RlbE5hbWUpLmNyZWF0ZUluZGV4KGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIHVuYSB0cmFuc2FjY2nDs25cclxuICAgIHRoaXoudHJhbnNhY3Rpb24gPSBmdW5jdGlvbihtb2RlbE5hbWUsIHBlcm1zLCBhY3Rpb24pIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuXHJcbiAgICAgIC8vIEN1YW5kbyBzZSBhYnJhIGxhIEJEXHJcbiAgICAgICRvcGVuRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xyXG4gICAgICAgIGNvbnN0IHR4ID0gcnEucmVzdWx0LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgcGVybXMpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGFjdGlvbih0eCk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICB0eC5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJlc3VsdCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICB0eC5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QodHguZXJyb3IpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gT2J0aWVuZSB1biBlbGVtZW50byBwb3Igc3Uga2V5XHJcbiAgICB0aGl6LmdldCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGtleSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cclxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xyXG4gICAgICAgIGNvbnN0IHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5nZXQoa2V5KTtcclxuXHJcbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxyXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKHJxLnJlc3VsdCwgZXZlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXHJcbiAgICAgICAgcnEub25lcnJvciAgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIC8vIENvdWxkIGNhbGwgcnEucHJldmVudERlZmF1bHQoKSB0byBwcmV2ZW50IHRoZSB0cmFuc2FjdGlvbiBmcm9tIGFib3J0aW5nLlxyXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gSW5zZXJ0YSB1biByZWdpc3RybyBlbiBlbCBtb2RlbG9cclxuICAgIHRoaXoucHV0ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgdmFsdWVzKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0J10pO1xyXG5cclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxyXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0eCkge1xyXG4gICAgICAgIGNvbnN0IHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5wdXQodmFsdWVzKTtcclxuXHJcbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxyXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxyXG4gICAgICAgIHJxLm9uZXJyb3IgID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAvLyBDb3VsZCBjYWxsIHJxLnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEVsaW1pbmEgdW4gb2JqZXRvIHBvciBzdSBrZXlcclxuICAgIHRoaXouZGVsZXRlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwga2V5KSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3N0cmluZycsICdudW1iZXInXV0pO1xyXG5cclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxyXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0eCkge1xyXG4gICAgICAgIGNvbnN0IHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5kZWxldGUoa2V5KTtcclxuXHJcbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxyXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxyXG4gICAgICAgIHJxLm9uZXJyb3IgID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAvLyBDb3VsZCBjYWxsIHJxLnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xyXG4gICAgdGhpei5vcGVuQ3Vyc29yID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgZmlsdGVycywgZWFjaENiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgJ2Z1bmN0aW9uJ10pO1xyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuXHJcbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXHJcbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBjb25zdCBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkub3BlbkN1cnNvcigpO1xyXG5cclxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IHJxLnJlc3VsdDtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gTm8gbW9yZSBtYXRjaGluZyByZWNvcmRzLlxyXG4gICAgICAgICAgaWYgKGN1cnNvcil7XHJcbiAgICAgICAgICAgIGVhY2hDYihjdXJzb3IudmFsdWUsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAvLyBCdXNjYXIgc2lndWllbnRlXHJcbiAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYXIgYWxpYXMgcGFyYSBsb3MgZXZlbnRvcyBlbmxhemFyIGNhbGxiYWNrcyBhIGxvcyBldmVudG9zXHJcbiAgICBsZXQgZGVmZXJlZHM7XHJcbiAgICAgIE9iamVjdC5rZXlzKGRlZmVyZWRzID0ge1xyXG4gICAgICAgIG9uT3BlbjogJG9wZW5EZWZlcmVkLFxyXG4gICAgICAgIG9uVXBncmFkZU5lZWRlZDogJHVwZ3JhZGVOZWVkZWREZWZlcmVkLFxyXG4gICAgICAgIG9uU29ja2V0Q29ubmVjdGVkOiAkc29ja2V0Q29ubmVjdGVkRGVmZXJlZFxyXG4gICAgICB9KS5tYXAoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIGNvbnN0IHRleHQgPSAkZGJOYW1lKycudicrKCRkYlZlcnNpb258fDEpKyc6ICcra2V5O1xyXG4gICAgICAgICAgaWYgKGVycil7XHJcbiAgICAgICAgICAgICRsb2cuZXJyb3IodGV4dCwgZXJyKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRsb2cubG9nKHRleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXpba2V5XSA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xyXG4gICAgICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoY2IpO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcblxyXG4gIH07XHJcblxyXG4gIHJldHVybiBpZGI7XHJcblxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJTZXJ2aWNlO1xuZnVuY3Rpb24gaWRiU2VydmljZSgkbG9nLCBxcywgaWRiVXRpbHMsIGlkYkV2ZW50cywgaWRiTW9kZWwpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyBFbiBsYSBzaWd1aWVudGUgbGluZWEsIHB1ZWRlIGluY2x1aXIgcHJlZmlqb3MgZGUgaW1wbGVtZW50YWNpb24gcXVlIHF1aWVyYSBwcm9iYXIuXG5cbiAgdmFyIGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQjtcbiAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxuICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcbiAgdmFyIElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcbiAgdmFyIElEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcbiAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcblxuICBpZiAoIWluZGV4ZWREQikge1xuICAgIGFsZXJ0KFwiU3UgbmF2ZWdhZG9yIG5vIHNvcG9ydGEgdW5hIHZlcnNpw7NuIGVzdGFibGUgZGUgaW5kZXhlZERCLiBUYWwgeSBjb21vIGxhcyBjYXJhY3RlcsOtc3RpY2FzIG5vIHNlcsOhbiB2YWxpZGFzXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIENsYXNlIHBhcmEgbGEgY3JlYWNpw7NuIGRlIGluc3RhbmNpYXMgZGUgbGEgQkRcbiAgZnVuY3Rpb24gaWRiKCRkYk5hbWUsICRkYlZlcnNpb24sICRzb2NrZXQpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdudW1iZXInLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgIC8vIE1hbmVqYWRvcmVzIGRlIGV2ZW50b3MuXG4gICAgdmFyICRldmVudHNDYWxsYmFja3MgPSB7fTtcbiAgICB2YXIgJHVwZ3JhZGVOZWVkZWREZWZlcmVkID0gcXMuZGVmZXIoKTtcbiAgICB2YXIgJG9wZW5EZWZlcmVkID0gcXMuZGVmZXIoKTtcbiAgICB2YXIgJHNvY2tldENvbm5lY3RlZERlZmVyZWQgPSBxcy5kZWZlcigpO1xuICAgIHZhciAkb3BlbmVkID0gZmFsc2U7XG5cbiAgICAvLyBJbnN0YW5jaWEgZGUgbGEgYmFzZSBkZSBkYXRvcztcbiAgICB2YXIgJHJlcXVlc3QgPSBudWxsO1xuICAgIHRoaXoubW9kZWxzID0ge307XG5cbiAgICAvLyBBZ3JlZ2FyIHVuIG1hbmVqYWRvciBkZSBldmVudG9cbiAgICB0aGl6LmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdID0gW107XG4gICAgICB9XG5cbiAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5wdXNoKGNiKTtcbiAgICB9O1xuXG4gICAgLy9SZW11ZXZlIHVuIG1hbmVqYWRvciBkZSBldmVudG9cbiAgICB0aGl6LnVuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkgcmV0dXJuO1xuXG4gICAgICAvLyBCdXNjYXIgZWwgY2JcbiAgICAgIHZhciBpZHggPSAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uaW5kZXhPZihjYik7XG5cbiAgICAgIC8vIFNpIHNlIGVuY29udHJvIGVsIGNiIHJlbW92ZXJsb1xuICAgICAgaWYgKGlkeCAhPSAtMSkge1xuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXG4gICAgdGhpei50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnXSk7XG5cbiAgICAgICRsb2cubG9nKCRkYk5hbWUgKyAnLnYnICsgKCRkYlZlcnNpb24gfHwgMSkgKyAnOiAnICsgZXZlbnROYW1lKTtcblxuICAgICAgZm9yICh2YXIgaSBpbiAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdW2ldLmFwcGx5KHRoaXosIGFyZ3MpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBDYWxsYmFja3MgcGFyYSBsb3MgZXJyb3Jlc1xuICAgIHRoaXouZXJyb3IgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHRoaXouYmluZChpZGJFdmVudHMuREJfRVJST1IsIGNiKTtcbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH07XG5cbiAgICAvLyBBYnJpciB1bmEgQmFzZSBkZSBkYXRvcy5cbiAgICB0aGl6Lm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoJG9wZW5lZCkgcmV0dXJuICRvcGVuRGVmZXJlZDtcblxuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gZGVmZXJcbiAgICAgICRvcGVuZWQgPSB0cnVlO1xuXG4gICAgICAvLyBkZWphbW9zIGFiaWVydGEgbnVlc3RyYSBiYXNlIGRlIGRhdG9zXG4gICAgICBmdW5jdGlvbiByZWFkeSgpIHtcblxuICAgICAgICB2YXIgcnEgPSBpbmRleGVkREIub3BlbigkZGJOYW1lLCAkZGJWZXJzaW9uKTtcblxuICAgICAgICBycS5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5yZXN1bHQhXG4gICAgICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZWwgcmVzdWx0YWRvXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLnJlc3VsdCFcbiAgICAgICAgICAkcmVxdWVzdCA9IHJxO1xuXG4gICAgICAgICAgLy8gQXNpbmdhciBlbCBtYW5lamFkb3IgZGUgZXJyb3JlcyBhIGxhIEJEXG4gICAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgJGxvZy5lcnJvcignRGF0YWJhc2UgZXJyb3I6ICcgKyBldmVudC50YXJnZXQuZXJyb3JDb2RlKTtcbiAgICAgICAgICAgIHRoaXoudHJpZ2dlcihpZGJFdmVudHMuREJfRVJST1IsIFtldmVudF0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAkb3BlbkRlZmVyZWQucmVzb2x2ZShldmVudCwgcnEpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlIGVycm9yZXNcbiAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEuZXJyb3JDb2RlIVxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgJG9wZW5EZWZlcmVkLnJlamVjdChycS5lcnJvckNvZGUsIGV2ZW50KTtcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZSgkZGJOYW1lKS5vbnN1Y2Nlc3MgPSByZWFkeTtcbiAgICAgIC8vIHJlYWR5KCk7XG5cbiAgICAgIHJldHVybiAkb3BlbkRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIEFncmVnYSB1biBudWV2byBtb2RlbG9cbiAgICB0aGl6Lm1vZGVsID0gZnVuY3Rpb24gKG5hbWUsIHNvY2tldCkge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsndW5kZWZpbmVkJywgJ29iamVjdCddXSk7XG5cbiAgICAgIC8vIEluc3RhbmNpYXIgZWwgbW9kZWxvXG4gICAgICB2YXIgbW9kZWwgPSB0aGl6Lm1vZGVsc1tuYW1lXTtcblxuICAgICAgLy8gU2kgbm8gZXhpc3RlIGVsIG1vZGVsbyBjcmVhclxuICAgICAgaWYgKCFtb2RlbCkge1xuICAgICAgICBtb2RlbCA9IGlkYk1vZGVsKHRoaXosIG5hbWUsIHNvY2tldCB8fCAkc29ja2V0KTtcbiAgICAgIH1cblxuICAgICAgLy8gR3VhcmRhciBlbCBtb2RlbG8gZW4gbG9zIG1vZGVsb3NcbiAgICAgIHRoaXoubW9kZWxzW25hbWVdID0gbW9kZWw7XG5cbiAgICAgIC8vIFJldG9ybmFyIGVsIG1vZGVsb1xuICAgICAgcmV0dXJuIG1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcbiAgICB0aGl6LmNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgbW9kZWxJZCkge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xuICAgICAgICBycS5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUobW9kZWxOYW1lLCBtb2RlbElkKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcbiAgICB0aGl6LmNyZWF0ZUluZGV4ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xuICAgICAgICBycS50cmFuc2FjdGlvbi5vYmplY3RTdG9yZShtb2RlbE5hbWUpLmNyZWF0ZUluZGV4KGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIHVuYSB0cmFuc2FjY2nDs25cbiAgICB0aGl6LnRyYW5zYWN0aW9uID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgcGVybXMsIGFjdGlvbikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcblxuICAgICAgLy8gQ3VhbmRvIHNlIGFicmEgbGEgQkRcbiAgICAgICRvcGVuRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xuICAgICAgICB2YXIgdHggPSBycS5yZXN1bHQudHJhbnNhY3Rpb24obW9kZWxOYW1lLCBwZXJtcyk7XG4gICAgICAgIHZhciByZXN1bHQgPSBhY3Rpb24odHgpO1xuXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgdHgub25jb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCwgcmVzdWx0KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxuICAgICAgICB0eC5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KHR4LmVycm9yKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICB9O1xuXG4gICAgLy8gT2J0aWVuZSB1biBlbGVtZW50byBwb3Igc3Uga2V5XG4gICAgdGhpei5nZXQgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBrZXkpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3N0cmluZycsICdudW1iZXInXV0pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWRvbmx5JywgZnVuY3Rpb24gKHR4KSB7XG4gICAgICAgIHZhciBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkuZ2V0KGtleSk7XG5cbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUocnEucmVzdWx0LCBldmVudCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vIENvdWxkIGNhbGwgcnEucHJldmVudERlZmF1bHQoKSB0byBwcmV2ZW50IHRoZSB0cmFuc2FjdGlvbiBmcm9tIGFib3J0aW5nLlxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICB9O1xuXG4gICAgLy8gSW5zZXJ0YSB1biByZWdpc3RybyBlbiBlbCBtb2RlbG9cbiAgICB0aGl6LnB1dCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIHZhbHVlcykge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnXSk7XG5cbiAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcblxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZHdyaXRlJywgZnVuY3Rpb24gKHR4KSB7XG4gICAgICAgIHZhciBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkucHV0KHZhbHVlcyk7XG5cbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoZXZlbnQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAvLyBDb3VsZCBjYWxsIHJxLnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIEVsaW1pbmEgdW4gb2JqZXRvIHBvciBzdSBrZXlcbiAgICB0aGl6LmRlbGV0ZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGtleSkge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnc3RyaW5nJywgJ251bWJlciddXSk7XG5cbiAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcblxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZHdyaXRlJywgZnVuY3Rpb24gKHR4KSB7XG4gICAgICAgIHZhciBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkuZGVsZXRlKGtleSk7XG5cbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoZXZlbnQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAvLyBDb3VsZCBjYWxsIHJxLnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcbiAgICAvLyBCdXNjYXIgZW4gZWwgbW9kZWxvXG4gICAgdGhpei5vcGVuQ3Vyc29yID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgZmlsdGVycywgZWFjaENiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ10sICdmdW5jdGlvbiddKTtcbiAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcblxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcbiAgICAgICAgdmFyIHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5vcGVuQ3Vyc29yKCk7XG5cbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBjdXJzb3IgPSBycS5yZXN1bHQ7XG5cbiAgICAgICAgICAvLyBObyBtb3JlIG1hdGNoaW5nIHJlY29yZHMuXG4gICAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgICAgZWFjaENiKGN1cnNvci52YWx1ZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAvLyBCdXNjYXIgc2lndWllbnRlXG4gICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcmVkLnJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYXIgYWxpYXMgcGFyYSBsb3MgZXZlbnRvcyBlbmxhemFyIGNhbGxiYWNrcyBhIGxvcyBldmVudG9zXG4gICAgdmFyIGRlZmVyZWRzID0gdm9pZCAwO1xuICAgIE9iamVjdC5rZXlzKGRlZmVyZWRzID0ge1xuICAgICAgb25PcGVuOiAkb3BlbkRlZmVyZWQsXG4gICAgICBvblVwZ3JhZGVOZWVkZWQ6ICR1cGdyYWRlTmVlZGVkRGVmZXJlZCxcbiAgICAgIG9uU29ja2V0Q29ubmVjdGVkOiAkc29ja2V0Q29ubmVjdGVkRGVmZXJlZFxuICAgIH0pLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gJGRiTmFtZSArICcudicgKyAoJGRiVmVyc2lvbiB8fCAxKSArICc6ICcgKyBrZXk7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAkbG9nLmVycm9yKHRleHQsIGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGxvZy5sb2codGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpeltrZXldID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcbiAgICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoY2IpO1xuICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGlkYjtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiTW9kZWxTZXJ2aWNlICgkbG9nLCBxcywgaWRiVXRpbHMsIGlkYlF1ZXJ5LCBpZGJFdmVudHMsIGxiUmVzb3VyY2UsICR0aW1lb3V0KSB7ICduZ0luamVjdCc7XHJcblxyXG4gIC8vIEJ1c2NhciB1biBjYW1wb1xyXG4gICAgY29uc3Qgc2VhcmNoRGVlcEZpZWxkID0gZnVuY3Rpb24gKG9iaiwgZmllbGQsIGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgY29uc3QgZmllbGRzID0gZmllbGQuc3BsaXQoJy4nKTtcclxuICAgICAgY29uc3QgbGFzdEZpZWxkID0gZmllbGRzLnBvcCgpO1xyXG5cclxuICAgICAgcmV0dXJuIChmdW5jdGlvbiBfc2V0KG9iaikge1xyXG4gICAgICAgIGlmIChmaWVsZHMubGVuZ3RoID09IDApXHJcbiAgICAgICAgICByZXR1cm4gY2Iob2JqLCBsYXN0RmllbGQpO1xyXG4gICAgICAgIGNvbnN0IGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAndW5kZWZpbmVkJylcclxuICAgICAgICAgIG9ialtmaWVsZF0gPSB7fTtcclxuICAgICAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcclxuICAgICAgfSkob2JqKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xyXG4gICAgY29uc3QgZ2V0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIChvYmosIGZpZWxkKSB7XHJcbiAgICAgIHJldHVybiBzZWFyY2hEZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICAgICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXHJcbiAgICBjb25zdCBzZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gKG9iaiwgZmllbGQsIHZhbHVlKSB7XHJcbiAgICAgIHNlYXJjaERlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIG9iajtcclxuICAgIH07XHJcblxyXG4gIHJldHVybiBmdW5jdGlvbiBpZGJNb2RlbCAoJGRiLCAkbW9kZWxOYW1lLCAkc29ja2V0KSB7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtudWxsICwnc3RyaW5nJ10pO1xyXG5cclxuICAgIC8vIENsYXZlIGRlbCBtb2RlbG9cclxuICAgIGNvbnN0ICRpZCA9IHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9O1xyXG4gICAgY29uc3QgJGV2ZW50c0hhbmRsZXJzID0ge307XHJcbiAgICBjb25zdCAkaW5zdGFuY2VzID0ge307XHJcbiAgICBsZXQgJGZpZWxkcyA9IHt9O1xyXG4gICAgbGV0ICRyZW1vdGUgPSBudWxsO1xyXG4gICAgbGV0ICR2ZXJzaW9uaW5nID0gbnVsbDtcclxuXHJcbiAgICAvLyBDb25zdHVjdG9yIGRlbCBtb2RlbG9cclxuICAgIGZ1bmN0aW9uIE1vZGVsKGRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgdGhpei4kbG9hZGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXouJGxvY2FsTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXouJHJlbW90ZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICBcclxuICAgICAgdGhpei4kbG9jYWxWYWx1ZXMgPSB7fTtcclxuICAgICAgdGhpei4kcmVtb3RlVmFsdWVzID0ge307XHJcblxyXG4gICAgICB0aGl6LiR2ZXJzaW9uID0gbnVsbDtcclxuICAgICAgdGhpei4kbG9jYWxWZXJzaW9uID0gbnVsbDtcclxuICAgICAgdGhpei4kcmVtb3RlVmVyc2lvbiA9IG51bGw7XHJcblxyXG4gICAgICB0aGl6LiRldmVudHNIYW5kbGVycyA9IHt9O1xyXG4gICAgICBcclxuICAgICAgaWYgKGRhdGEpe1xyXG4gICAgICAgIHRoaXouJHNldFZhbHVlcyhkYXRhKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpei4kY29uc3RydWN0b3IoZGF0YSk7XHJcblxyXG4gICAgICBpZiAoJHNvY2tldCkge1xyXG4gICAgICAgIHRoaXouJGxpc3RlbigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCAkcmVzdWx0cyA9IFtdO1xyXG5cclxuICAgICAgdGhpelxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEN1YW5kbyBzZWEgY29uc3VsdGFkbyBhZ3JlZ2FyIGxhIGNvbnN1bHRhXHJcbiAgICAgICAgLiRiaW5kKGlkYkV2ZW50cy5NT0RFTF9RVUVSSUVELCBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAkcmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gQ3VhbmRvIHNlYSBsaWJlcmFkbyBkZSBsYSBjb25zdWx0YXIgcXVpdGFyIGRlIGxhcyBjb25zdWx0YXNcclxuICAgICAgICAuJGJpbmQoaWRiRXZlbnRzLk1PREVMX1VOUVVFUklFRCwgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgY29uc3QgaWR4ID0gJHJlc3VsdHMuaW5kZXhPZihyZXN1bHQpO1xyXG4gICAgICAgICAgaWYgKGlkeCAhPSAtMSl7XHJcbiAgICAgICAgICAgICRyZXN1bHRzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIEV2ZW50byBkZSBxdWUgbW9kZWxvIGVzdMOhIGluc3RhbmNpYWRvXHJcbiAgICAgICAgLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9JTlNUQU5DRUQpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdiBlbCBub21icmUgZGVsIG1vZGVsb1xyXG4gICAgICBNb2RlbC5nZXRNb2RlbE5hbWUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAkbW9kZWxOYW1lO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cclxuICAgICAgTW9kZWwuYXV0b0luY3JlbWVudCA9IGZ1bmN0aW9uIChhdXRvSW5jcmVtZW50KSB7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Jvb2xlYW4nXSk7XHJcblxyXG4gICAgICAgICRpZC5hdXRvSW5jcmVtZW50ID0gYXV0b0luY3JlbWVudDtcclxuICAgICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xyXG4gICAgICBNb2RlbC5rZXlQYXRoID0gZnVuY3Rpb24gKGtleVBhdGgpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJ10pO1xyXG5cclxuICAgICAgICAkaWQua2V5UGF0aCA9IGtleVBhdGg7XHJcbiAgICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIENyZWEgZWwgb2JqZWN0byBzdG9yYWdlIHBhcmEgZWwgbW9kZWxvLlxyXG4gICAgICBNb2RlbC5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgJGRiLmNyZWF0ZVN0b3JlKCRtb2RlbE5hbWUsICRpZCk7XHJcbiAgICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAvLyBBZ3JlZ2EgdW4gaW5kZXhcclxuICAgIE1vZGVsLmluZGV4ID0gZnVuY3Rpb24gKGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XHJcblxyXG4gICAgICAkZGIuY3JlYXRlSW5kZXgoJG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBNw6l0b2RvIHF1ZSBwZXJtaXRlIG1vZGlmaWNhciBtb2RlbC5cclxuICAgICAgTW9kZWwuYnVpbGQgPSBmdW5jdGlvbiAoYnVpbGRDYWxsYmFjaykge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcclxuXHJcbiAgICAgICAgYnVpbGRDYWxsYmFjayhNb2RlbCk7XHJcbiAgICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIEFzaWduYSBsYSBlc3BlY2lmaWNhY2nDs24gZGUgbG9zIGNhbXBvc1xyXG4gICAgICBNb2RlbC5maWVsZHMgPSBmdW5jdGlvbiAoZmllbGRzKSB7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcclxuXHJcbiAgICAgICAgJGZpZWxkcyA9IHt9O1xyXG4gICAgICAgICRmaWVsZHNbJGlkLmtleVBhdGhdID0ge1xyXG4gICAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCIsXHJcbiAgICAgICAgICBcInJlcXVpcmVkXCI6IHRydWVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhmaWVsZHMpLm1hcChmdW5jdGlvbiAoZmllbGROYW1lKSB7XHJcbiAgICAgICAgICBsZXQgZmllbGQgPSBmaWVsZHNbZmllbGROYW1lXTtcclxuICAgICAgICAgIGlmICh0eXBlb2YgZmllbGRzW2ZpZWxkTmFtZV0gPT0gJ3N0cmluZycpe1xyXG4gICAgICAgICAgICBmaWVsZCA9IHsgXCJ0eXBlXCI6IGZpZWxkIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAkZmllbGRzW2ZpZWxkTmFtZV0gPSBmaWVsZDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGk7XHJcbiAgICAgIE1vZGVsLnJlbW90ZSA9IGZ1bmN0aW9uICh1cmwsIGFyZ3MsIGFjdGlvbnMpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCcsICdvYmplY3QnXSk7XHJcblxyXG4gICAgICAgICRyZW1vdGUgPSBsYlJlc291cmNlKHVybCwgYXJncywgYWN0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgJHJlbW90ZSBkZWwgbW9kZWxvXHJcbiAgICAgIE1vZGVsLmdldFJlbW90ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuICRyZW1vdGU7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgY29ycmVzcG9uZGllbnRlIGFsIGtleSBkZSB1biBvYmpldG9cclxuICAgICAgTW9kZWwuZ2V0S2V5RnJvbSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUoZGF0YSwgJGlkLmtleVBhdGgpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gRGV2dWVsdmUgbGEgaW5zdGFuY2lhIGRlbCBtb2RlbCBkZSBsYXMgZ3VhcmRhZGFzLiBTaSBubyBleGlzdGUgZW50b25jZVxyXG4gICAgICAvLyBzZSBjcmVhXHJcbiAgICAgIE1vZGVsLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snc3RyaW5nJywgJ251bWJlcicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcclxuICAgICAgICBpZiAoIWtleSkge1xyXG4gICAgICAgICAgcmV0dXJuIG5ldyBNb2RlbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTm8gZXhpc3RlIGxhIGluc3RhbmNpYSBlbnRvbmNlIHNlIGNyZWFcclxuICAgICAgICBpZiAoISRpbnN0YW5jZXNba2V5XSl7XHJcbiAgICAgICAgICAkaW5zdGFuY2VzW2tleV0gPSBuZXcgTW9kZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuICRpbnN0YW5jZXNba2V5XTtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgLy8gQnVzY2EgdW4gcmVnaXN0cm8gZW4gbGEgb2JqZWN0U3RvcmUgZGVsIG1vZGVsby5cclxuICAgIE1vZGVsLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuXHJcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gTW9kZWwuZ2V0SW5zdGFuY2Uoa2V5KTtcclxuXHJcbiAgICAgIGlmIChpbnN0YW5jZS4kbG9jYWxMb2FkZWQpIHJldHVybiBpbnN0YW5jZTtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG4gICAgICBcclxuICAgICAgaW5zdGFuY2UuJHJlc29sdmVkID0gZmFsc2U7XHJcbiAgICAgIGluc3RhbmNlLiRwcm9taXNlID0gZGVmZXJlZC5wcm9taXNlO1xyXG5cclxuICAgICAgJGRiLmdldCgkbW9kZWxOYW1lLCBrZXkpLnByb21pc2UudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIE1vZGVsLmdldFZlcnNpb25PZihrZXkpLnByb21pc2VcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLiRzZXRMb2NhbFZhbHVlcyhkYXRhLCBkYXRhICYmIHZlcnNpb24/IHZlcnNpb24uaGFzaCA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgJGxvZy5lcnJvcihbJ01vZGVsLmdldFZlcnNpb25PZiBhbnkgZXJyb3InLCBlcnJdKVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xyXG4gICAgTW9kZWwuZmluZCA9IGZ1bmN0aW9uIChmaWx0ZXJzKSB7XHJcblxyXG4gICAgICByZXR1cm4gbmV3IGlkYlF1ZXJ5KCRkYiwgTW9kZWwsIGZpbHRlcnMpOztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgbnVldmFzIGluc3RhbmNpYXMgZGUgbG9zIG1vZGVsb3NcclxuICAgIE1vZGVsLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAvLyBTaSBlcyB1biBhcnJheVxyXG4gICAgICBpZiAoZGF0YS5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnN0IHJlY29yZCA9IE1vZGVsLmdldEluc3RhbmNlKE1vZGVsLmdldEtleUZyb20oZGF0YSkpO1xyXG5cclxuICAgICAgICBpZiAocmVjb3JkLiRsb2FkZWQpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuQ2FudENyZWF0ZWRMb2FkZWRJbnN0YW5jZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlY29yZC4kcHVsbCgpO1xyXG5cclxuICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAvLyBPYnRlbmVyIHVuYSBjb3BpYSBkZWwgYXJyYXlcclxuICAgICAgY29uc3QgYXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZGF0YSk7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoY2IpO1xyXG5cclxuICAgICAgKGZ1bmN0aW9uIGl0ZXJhdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIE5vIHF1ZWRhbiBlbGVtZW50b3MgZW4gZWwgYXJyYXlcclxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PSAwKSByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcblxyXG4gICAgICAgIC8vIENyZWFyIGVsIHNpZ3VpZW50ZSBlbGVtZW50b1xyXG4gICAgICAgIE1vZGVsLmNyZWF0ZShhcnIuc2hpZnQoKSlcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIGl0ZXJhdGlvbigpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0pKCk7XHJcblxyXG4gICAgICAvLyBEZXZvbHZlciBlbCBwcm9taXNlXHJcbiAgICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSB1biBtb2RlbG8gcGFyYSBndWFyZGFyIGxhcyB2ZXJzaW9uZXMgZGVsIG1vZGVsbyBhY3R1YWxcclxuICAgIE1vZGVsLnZlcnNpb25pbmcgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBjYikge1xyXG4gICAgICBpZiAodHlwZW9mIG1vZGVsTmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGNiID0gbW9kZWxOYW1lO1xyXG4gICAgICAgIG1vZGVsTmFtZSA9IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShbbW9kZWxOYW1lLCBjYl0sIFtbJ3N0cmluZycsICd1bmRlZmluZWQnXSwgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgaWYgKCEkdmVyc2lvbmluZykge1xyXG5cclxuICAgICAgICAvLyBTaSBlbCBtb2RlbCBubyB0aWVuZSBub21icmUgc2UgYWdyZWdhXHJcbiAgICAgICAgaWYgKCFtb2RlbE5hbWUpe1xyXG4gICAgICAgICAgbW9kZWxOYW1lID0gJG1vZGVsTmFtZSsnX3ZlcnNpb25pbmcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ3JlYXIgbW9kZWxvIHBhcmEgZWwgbWFuZWpvIGRlIGRhdG9zXHJcbiAgICAgICAgJHZlcnNpb25pbmcgPSAkZGIubW9kZWwobW9kZWxOYW1lKVxyXG4gICAgICAgICAgLmF1dG9JbmNyZW1lbnQoZmFsc2UpXHJcbiAgICAgICAgICAua2V5UGF0aCgkaWQua2V5UGF0aClcclxuICAgICAgICAgIC5maWVsZHMoe1xyXG4gICAgICAgICAgICBcImhhc2hcIjogeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0sXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjYikgY2IoJHZlcnNpb25pbmcpO1xyXG5cclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgbGEgaW5zdGFuY2lhIGRlIGxhIHZlcnNpb24gbG9jYWwgZGVsIHJlZ2lzdHJvXHJcbiAgICBNb2RlbC5nZXRWZXJzaW9uT2YgPSBmdW5jdGlvbiAoa2V5KSB7IFxyXG5cclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICBpZiAoJHZlcnNpb25pbmcpIHtcclxuICAgICAgICAkdmVyc2lvbmluZy5nZXQoa2V5KS4kcHJvbWlzZVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHZlcnNpb24pIHtcclxuICAgICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKHZlcnNpb24pO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KG51bGwpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGVmZXJlZC5yZXNvbHZlKG51bGwpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBtYW5kZWphZG9yIGRlIGV2ZW50b3MgYWwgbW9kZWxvXHJcbiAgICAgIE1vZGVsLmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICAgaWYgKCEkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSkge1xyXG4gICAgICAgICAgJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XHJcblxyXG4gICAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBEaXNwYXJhIHVuIGV2ZW50byBkZWwgbW9kZWxcclxuICAgICAgTW9kZWwuZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnYXJyYXknXV0pO1xyXG5cclxuICAgICAgICBpZiAoJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAgICRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLm1hcChmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAgICAgY2IuYXBwbHkoTW9kZWwsIGFyZ3MgfHwgW10pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcclxuICAgICAgTW9kZWwucHJvdG90eXBlLiRnZXQgPSBmdW5jdGlvbiAoZmllbGQpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIEFzaWduYSBpbiB2YWxvciBhIHVuIGNhbXBvXHJcbiAgICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0ID0gZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkge1xyXG5cclxuICAgICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCwgdmFsdWUpO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIERldnVlbHZlIHVuIG9iamV0byBjb24gbGFzIHByb3BpZWRhZGVzIGRlbCByZWdpc3Ryb1xyXG4gICAgICBNb2RlbC5wcm90b3R5cGUuJGdldFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICAgY29uc3QgdmFsdWVzID0ge307XHJcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwgdGhpcztcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMoJGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICAgICAgc2V0RmllbGRWYWx1ZSh2YWx1ZXMsIGZpZWxkLCBnZXRGaWVsZFZhbHVlKGRhdGEsIGZpZWxkKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gRGV2dWVsdmUgdW4gb2JqZXRvIGNvbiBsYXMgcHJvcGllZGFkZXMgbG9jYWxlcyBkZWwgcmVnaXN0cm9cclxuICAgICAgTW9kZWwucHJvdG90eXBlLiRnZXRMb2NhbFZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGdldFZhbHVlcyh0aGlzLiRsb2NhbFZhbHVlcyk7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gRGV2dWVsdmUgdW4gbW9kZWxvIGNvbiBsYXMgcHJvcGllZGFkZXMgcmVtb3RhcyBkZWwgcmVnaXN0cm9cclxuICAgICAgTW9kZWwucHJvdG90eXBlLiRnZXRSZW1vdGVWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kcmVtb3RlVmFsdWVzKTtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIGRlbCByZWdpc3Ryb1xyXG4gICAgICBNb2RlbC5wcm90b3R5cGUuJHNldFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhLCB2ZXJzaW9uKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXouJHZlcnNpb24gPSB2ZXJzaW9uO1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXosIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXouJGxvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIEFzaWduYSBsYXMgcHJvcGllZGFkZXMgbG9jYWxlcyBkZWwgcmVnaXN0cm9cclxuICAgICAgTW9kZWwucHJvdG90eXBlLiRzZXRMb2NhbFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhLCB2ZXJzaW9uKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXouJGxvY2FsVmVyc2lvbiA9IHZlcnNpb247XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICAgIHNldEZpZWxkVmFsdWUodGhpei4kbG9jYWxWYWx1ZXMsIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICB0aGl6LiRsb2NhbExvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICBpZiAoIXRoaXouJGxvYWRlZCkge1xyXG4gICAgICAgICAgICB0aGl6LiRzZXRWYWx1ZXMoZGF0YSwgdmVyc2lvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQXNpZ25hIGxhcyBwcm9waWVkYWRlcyByZW1vdGFzIGRlbCByZWdpc3Ryb1xyXG4gICAgICBNb2RlbC5wcm90b3R5cGUuJHNldFJlbW90ZVZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhLCB2ZXJzaW9uKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXouJHJlbW90ZVZlcnNpb24gPSB2ZXJzaW9uO1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJHJlbW90ZVZhbHVlcywgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgIHRoaXouJHJlbW90ZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICBpZiAoIXRoaXouJGxvYWRlZCkge1xyXG4gICAgICAgICAgICB0aGl6LiRzZXRWYWx1ZXMoZGF0YSwgdmVyc2lvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGVsIElEIGRlbCBvYmpldG9cclxuICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0S2V5ID0gZnVuY3Rpb24gKG5ld0tleSkge1xyXG4gICAgICBcclxuICAgICAgY29uc3Qgb2xkS2V5ID0gTW9kZWwuZ2V0S2V5RnJvbSh0aGlzKTtcclxuXHJcbiAgICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGlzLCAkaWQua2V5UGF0aCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICAgICAgb2JqW2xhc3RGaWVsZF0gPSBuZXdLZXk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKG9sZEtleSAhPT0gbmV3S2V5KSB7XHJcblxyXG4gICAgICAgIGlmIChvbGRLZXkgJiYgJGluc3RhbmNlc1tvbGRLZXldICYmICRpbnN0YW5jZXNbb2xkS2V5XSAhPSB0aGlzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkluc3RhbmNlT2ZPbGRLZXlJc05vdFNhbWUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5ld0tleSAmJiAkaW5zdGFuY2VzW25ld0tleV0gJiYgJGluc3RhbmNlc1tuZXdLZXldICE9IHRoaXMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk5ld0tleUlzTm90U2FtZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRWxpbWluYXIgYW50ZXJpb3JcclxuICAgICAgICBpZiAob2xkS2V5ICYmICRpbnN0YW5jZXNbb2xkS2V5XSkge1xyXG4gICAgICAgICAgZGVsZXRlICRpbnN0YW5jZXNbb2xkS2V5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFncmVnYXIgbnVldmFcclxuICAgICAgICBpZiAobmV3S2V5ICYmICEkaW5zdGFuY2VzW25ld0tleV0pIHtcclxuICAgICAgICAgICRpbnN0YW5jZXNbbmV3S2V5XSA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbnN0dXJjdG9yIHF1ZSBzZSBwdWVkZSBzb2JyZSBlc2NyaWJpclxyXG4gICAgTW9kZWwucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEd1YXJkYSBsb3MgZGF0b3MgZGVsIG9iamV0b1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRwdWxsID0gZnVuY3Rpb24gKG5ld1ZhbHVlcywgdmVyc2lvbil7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgaWYgKG5ld1ZhbHVlcykge1xyXG4gICAgICAgIG5ld1ZhbHVlcyA9IHRoaXouJGdldFZhbHVlcyhuZXdWYWx1ZXMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld1ZhbHVlcyA9IHRoaXouJGdldFJlbW90ZVZhbHVlcygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBuZXdLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKG5ld1ZhbHVlcyk7XHJcbiAgICAgIGNvbnN0IG9sZFZhbHVlcyA9IHRoaXouJGdldExvY2FsVmFsdWVzKCk7XHJcbiAgICAgIGNvbnN0IG9sZEtleSA9IE1vZGVsLmdldEtleUZyb20ob2xkVmFsdWVzKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKG5ld0tleSwgb2xkS2V5KTtcclxuICAgICAgY29uc29sZS5sb2cobmV3VmFsdWVzLCBvbGRWYWx1ZXMpO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBGdW5jaW9uIHF1ZSBoYWNlIGVzY3VjaGFycyBsb3MgbWVuc2FqZXMgZGVsIHNvY2tldCBwYXJhIGVsIG1vZGVsXHJcbiAgICAgIE1vZGVsLnByb3RvdHlwZS4kbGlzdGVuID0gZnVuY3Rpb24gKCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgICBpZiAoISRzb2NrZXQpIHRocm93IG5ldyBFcnJvcignTW9kZWwuRG9lc05vdEhhdmVTb2NrZXRJbnN0YW5jZScpO1xyXG5cclxuICAgICAgICAvLyBDcmVhciB1bmEgc3Vic2NyaXBjaW9uIGFsIHNvY2tldCBwYXJhIGN1YW5kbyBzZSByZWNpYmFuIGRhdG9zXHJcbiAgICAgICAgLy8gcGFyYSBsYSBpbnN0YW5jaWEgYWN0dWFsXHJcbiAgICAgICAgJHNvY2tldC5zdWJzY3JpYmUoe1xyXG4gICAgICAgICAgbW9kZWxOYW1lOiAkbW9kZWxOYW1lLFxyXG4gICAgICAgICAgZXZlbnROYW1lOiAndXBkYXRlJyxcclxuICAgICAgICAgIG1vZGVsSWQ6IHRoaXouJGdldCgkaWQua2V5UGF0aCksXHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAvLyBBIHJlY2liaXIgZGF0b3MgZGVsIHNvY2tldCBhc2lnbmFyIGxvcyB2YWxvcmVzXHJcbiAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIEVtaXRpciBldmVudG8gZGUgZGF0b3MgcmVjaWJpZG9yIHBhcmEgZWwgbW9kZWxvXHJcbiAgICAgICAgICAgIHRoaXouJHNldFJlbW90ZVZhbHVlcyhkYXRhLnZhbHVlcywgZGF0YS52ZXJzaW9uKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgLy8gQWdyZWdhIHVuIG1hbmRlamFkb3IgZGUgZXZlbnRvc1xyXG4gICAgICBNb2RlbC5wcm90b3R5cGUuJGJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgICB0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXHJcbiAgICAgIE1vZGVsLnByb3RvdHlwZS4kZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsndW5kZWZpbmVkJywgJ2FycmF5J11dKTtcclxuXHJcbiAgICAgICAgLy8gTGxhbWFyIGVsIGV2ZW50byBwYXJhIGVsIG1vZGVsb1xyXG4gICAgICAgIE1vZGVsLmVtaXQoZXZlbnROYW1lLCBbdGhpeiwgW10uY29uY2F0KFt0aGl6XSkuY29uY2F0KGFyZ3MpXSk7XHJcblxyXG4gICAgICAgIGlmICh0aGl6LiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgICB0aGl6LiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLm1hcChmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAgICAgY2IuYXBwbHkodGhpeiwgYXJncyB8fCBbXSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIE1vZGVsLiRpbnN0YW5jZXMgPSAkaW5zdGFuY2VzO1xyXG5cclxuICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgfTtcclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiTW9kZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaWRiTW9kZWxTZXJ2aWNlO1xuZnVuY3Rpb24gaWRiTW9kZWxTZXJ2aWNlKCRsb2csIHFzLCBpZGJVdGlscywgaWRiUXVlcnksIGlkYkV2ZW50cywgbGJSZXNvdXJjZSwgJHRpbWVvdXQpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyBCdXNjYXIgdW4gY2FtcG9cblxuICB2YXIgc2VhcmNoRGVlcEZpZWxkID0gZnVuY3Rpb24gc2VhcmNoRGVlcEZpZWxkKG9iaiwgZmllbGQsIGNiKSB7XG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICB2YXIgZmllbGRzID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICB2YXIgbGFzdEZpZWxkID0gZmllbGRzLnBvcCgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIF9zZXQob2JqKSB7XG4gICAgICBpZiAoZmllbGRzLmxlbmd0aCA9PSAwKSByZXR1cm4gY2Iob2JqLCBsYXN0RmllbGQpO1xuICAgICAgdmFyIGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XG4gICAgICBpZiAodHlwZW9mIG9ialtmaWVsZF0gPT09ICd1bmRlZmluZWQnKSBvYmpbZmllbGRdID0ge307XG4gICAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcbiAgICB9KG9iaik7XG4gIH07XG5cbiAgLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXG4gIHZhciBnZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gZ2V0RmllbGRWYWx1ZShvYmosIGZpZWxkKSB7XG4gICAgcmV0dXJuIHNlYXJjaERlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cbiAgdmFyIHNldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiBzZXRGaWVsZFZhbHVlKG9iaiwgZmllbGQsIHZhbHVlKSB7XG4gICAgc2VhcmNoRGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgb2JqW2xhc3RGaWVsZF0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbiBpZGJNb2RlbCgkZGIsICRtb2RlbE5hbWUsICRzb2NrZXQpIHtcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtudWxsLCAnc3RyaW5nJ10pO1xuXG4gICAgLy8gQ2xhdmUgZGVsIG1vZGVsb1xuICAgIHZhciAkaWQgPSB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfTtcbiAgICB2YXIgJGV2ZW50c0hhbmRsZXJzID0ge307XG4gICAgdmFyICRpbnN0YW5jZXMgPSB7fTtcbiAgICB2YXIgJGZpZWxkcyA9IHt9O1xuICAgIHZhciAkcmVtb3RlID0gbnVsbDtcbiAgICB2YXIgJHZlcnNpb25pbmcgPSBudWxsO1xuXG4gICAgLy8gQ29uc3R1Y3RvciBkZWwgbW9kZWxvXG4gICAgZnVuY3Rpb24gTW9kZWwoZGF0YSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdGhpei4kcmVzb2x2ZWQgPSBmYWxzZTtcblxuICAgICAgdGhpei4kbG9hZGVkID0gZmFsc2U7XG4gICAgICB0aGl6LiRsb2NhbExvYWRlZCA9IGZhbHNlO1xuICAgICAgdGhpei4kcmVtb3RlTG9hZGVkID0gZmFsc2U7XG5cbiAgICAgIHRoaXouJGxvY2FsVmFsdWVzID0ge307XG4gICAgICB0aGl6LiRyZW1vdGVWYWx1ZXMgPSB7fTtcblxuICAgICAgdGhpei4kdmVyc2lvbiA9IG51bGw7XG4gICAgICB0aGl6LiRsb2NhbFZlcnNpb24gPSBudWxsO1xuICAgICAgdGhpei4kcmVtb3RlVmVyc2lvbiA9IG51bGw7XG5cbiAgICAgIHRoaXouJGV2ZW50c0hhbmRsZXJzID0ge307XG5cbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIHRoaXouJHNldFZhbHVlcyhkYXRhKTtcbiAgICAgIH1cblxuICAgICAgdGhpei4kY29uc3RydWN0b3IoZGF0YSk7XG5cbiAgICAgIGlmICgkc29ja2V0KSB7XG4gICAgICAgIHRoaXouJGxpc3RlbigpO1xuICAgICAgfVxuXG4gICAgICB2YXIgJHJlc3VsdHMgPSBbXTtcblxuICAgICAgdGhpelxuXG4gICAgICAvLyBDdWFuZG8gc2VhIGNvbnN1bHRhZG8gYWdyZWdhciBsYSBjb25zdWx0YVxuICAgICAgLiRiaW5kKGlkYkV2ZW50cy5NT0RFTF9RVUVSSUVELCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICRyZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgIH0pXG5cbiAgICAgIC8vIEN1YW5kbyBzZWEgbGliZXJhZG8gZGUgbGEgY29uc3VsdGFyIHF1aXRhciBkZSBsYXMgY29uc3VsdGFzXG4gICAgICAuJGJpbmQoaWRiRXZlbnRzLk1PREVMX1VOUVVFUklFRCwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICB2YXIgaWR4ID0gJHJlc3VsdHMuaW5kZXhPZihyZXN1bHQpO1xuICAgICAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICAgICAgJHJlc3VsdHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vIEV2ZW50byBkZSBxdWUgbW9kZWxvIGVzdMOhIGluc3RhbmNpYWRvXG4gICAgICAuJGVtaXQoaWRiRXZlbnRzLk1PREVMX0lOU1RBTkNFRCk7XG4gICAgfTtcblxuICAgIC8vIERldnVlbHYgZWwgbm9tYnJlIGRlbCBtb2RlbG9cbiAgICBNb2RlbC5nZXRNb2RlbE5hbWUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHJldHVybiAkbW9kZWxOYW1lO1xuICAgIH07XG5cbiAgICAvLyBBc2lnbmEgZWwgSUQgYWwgbW9kZWxvXG4gICAgTW9kZWwuYXV0b0luY3JlbWVudCA9IGZ1bmN0aW9uIChhdXRvSW5jcmVtZW50KSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnYm9vbGVhbiddKTtcblxuICAgICAgJGlkLmF1dG9JbmNyZW1lbnQgPSBhdXRvSW5jcmVtZW50O1xuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBBc2lnbmEgZWwgSUQgYWwgbW9kZWxvXG4gICAgTW9kZWwua2V5UGF0aCA9IGZ1bmN0aW9uIChrZXlQYXRoKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJ10pO1xuXG4gICAgICAkaWQua2V5UGF0aCA9IGtleVBhdGg7XG4gICAgICByZXR1cm4gTW9kZWw7XG4gICAgfTtcblxuICAgIC8vIENyZWEgZWwgb2JqZWN0byBzdG9yYWdlIHBhcmEgZWwgbW9kZWxvLlxuICAgIE1vZGVsLmNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAkZGIuY3JlYXRlU3RvcmUoJG1vZGVsTmFtZSwgJGlkKTtcbiAgICAgIHJldHVybiBNb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQWdyZWdhIHVuIGluZGV4XG4gICAgTW9kZWwuaW5kZXggPSBmdW5jdGlvbiAoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcblxuICAgICAgJGRiLmNyZWF0ZUluZGV4KCRtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcbiAgICAgIHJldHVybiBNb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gTcOpdG9kbyBxdWUgcGVybWl0ZSBtb2RpZmljYXIgbW9kZWwuXG4gICAgTW9kZWwuYnVpbGQgPSBmdW5jdGlvbiAoYnVpbGRDYWxsYmFjaykge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICBidWlsZENhbGxiYWNrKE1vZGVsKTtcbiAgICAgIHJldHVybiBNb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQXNpZ25hIGxhIGVzcGVjaWZpY2FjacOzbiBkZSBsb3MgY2FtcG9zXG4gICAgTW9kZWwuZmllbGRzID0gZnVuY3Rpb24gKGZpZWxkcykge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcblxuICAgICAgJGZpZWxkcyA9IHt9O1xuICAgICAgJGZpZWxkc1skaWQua2V5UGF0aF0gPSB7XG4gICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiLFxuICAgICAgICBcInJlcXVpcmVkXCI6IHRydWVcbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5rZXlzKGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZE5hbWUpIHtcbiAgICAgICAgdmFyIGZpZWxkID0gZmllbGRzW2ZpZWxkTmFtZV07XG4gICAgICAgIGlmICh0eXBlb2YgZmllbGRzW2ZpZWxkTmFtZV0gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBmaWVsZCA9IHsgXCJ0eXBlXCI6IGZpZWxkIH07XG4gICAgICAgIH1cbiAgICAgICAgJGZpZWxkc1tmaWVsZE5hbWVdID0gZmllbGQ7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBDb25maWd1cmEgZWwgcmVtb3RlIGFwaTtcbiAgICBNb2RlbC5yZW1vdGUgPSBmdW5jdGlvbiAodXJsLCBhcmdzLCBhY3Rpb25zKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCcsICdvYmplY3QnXSk7XG5cbiAgICAgICRyZW1vdGUgPSBsYlJlc291cmNlKHVybCwgYXJncywgYWN0aW9ucyk7XG4gICAgICByZXR1cm4gTW9kZWw7XG4gICAgfTtcblxuICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgJHJlbW90ZSBkZWwgbW9kZWxvXG4gICAgTW9kZWwuZ2V0UmVtb3RlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICByZXR1cm4gJHJlbW90ZTtcbiAgICB9O1xuXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgY29ycmVzcG9uZGllbnRlIGFsIGtleSBkZSB1biBvYmpldG9cbiAgICBNb2RlbC5nZXRLZXlGcm9tID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsICRpZC5rZXlQYXRoKTtcbiAgICB9O1xuXG4gICAgLy8gRGV2dWVsdmUgbGEgaW5zdGFuY2lhIGRlbCBtb2RlbCBkZSBsYXMgZ3VhcmRhZGFzLiBTaSBubyBleGlzdGUgZW50b25jZVxuICAgIC8vIHNlIGNyZWFcbiAgICBNb2RlbC5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snc3RyaW5nJywgJ251bWJlcicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcbiAgICAgIGlmICgha2V5KSB7XG4gICAgICAgIHJldHVybiBuZXcgTW9kZWwoKTtcbiAgICAgIH1cblxuICAgICAgLy8gTm8gZXhpc3RlIGxhIGluc3RhbmNpYSBlbnRvbmNlIHNlIGNyZWFcbiAgICAgIGlmICghJGluc3RhbmNlc1trZXldKSB7XG4gICAgICAgICRpbnN0YW5jZXNba2V5XSA9IG5ldyBNb2RlbCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJGluc3RhbmNlc1trZXldO1xuICAgIH07XG5cbiAgICAvLyBCdXNjYSB1biByZWdpc3RybyBlbiBsYSBvYmplY3RTdG9yZSBkZWwgbW9kZWxvLlxuICAgIE1vZGVsLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcblxuICAgICAgdmFyIGluc3RhbmNlID0gTW9kZWwuZ2V0SW5zdGFuY2Uoa2V5KTtcblxuICAgICAgaWYgKGluc3RhbmNlLiRsb2NhbExvYWRlZCkgcmV0dXJuIGluc3RhbmNlO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IGZhbHNlO1xuICAgICAgaW5zdGFuY2UuJHByb21pc2UgPSBkZWZlcmVkLnByb21pc2U7XG5cbiAgICAgICRkYi5nZXQoJG1vZGVsTmFtZSwga2V5KS5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaW5zdGFuY2UuJHJlc29sdmVkID0gdHJ1ZTtcblxuICAgICAgICBNb2RlbC5nZXRWZXJzaW9uT2Yoa2V5KS5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICAgICAgICBpbnN0YW5jZS4kc2V0TG9jYWxWYWx1ZXMoZGF0YSwgZGF0YSAmJiB2ZXJzaW9uID8gdmVyc2lvbi5oYXNoIDogdW5kZWZpbmVkKTtcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoaW5zdGFuY2UpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGluc3RhbmNlKTtcbiAgICAgICAgICAkbG9nLmVycm9yKFsnTW9kZWwuZ2V0VmVyc2lvbk9mIGFueSBlcnJvcicsIGVycl0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfTtcblxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cbiAgICBNb2RlbC5maW5kID0gZnVuY3Rpb24gKGZpbHRlcnMpIHtcblxuICAgICAgcmV0dXJuIG5ldyBpZGJRdWVyeSgkZGIsIE1vZGVsLCBmaWx0ZXJzKTs7XG4gICAgfTtcblxuICAgIC8vIENyZWEgbnVldmFzIGluc3RhbmNpYXMgZGUgbG9zIG1vZGVsb3NcbiAgICBNb2RlbC5jcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgLy8gU2kgZXMgdW4gYXJyYXlcbiAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciByZWNvcmQgPSBNb2RlbC5nZXRJbnN0YW5jZShNb2RlbC5nZXRLZXlGcm9tKGRhdGEpKTtcblxuICAgICAgICBpZiAocmVjb3JkLiRsb2FkZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkNhbnRDcmVhdGVkTG9hZGVkSW5zdGFuY2UnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWNvcmQuJHB1bGwoKTtcbiAgICAgIH1cblxuICAgICAgLy8gT2J0ZW5lciB1bmEgY29waWEgZGVsIGFycmF5XG4gICAgICB2YXIgYXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZGF0YSk7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKGNiKTtcblxuICAgICAgKGZ1bmN0aW9uIGl0ZXJhdGlvbigpIHtcblxuICAgICAgICAvLyBObyBxdWVkYW4gZWxlbWVudG9zIGVuIGVsIGFycmF5XG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09IDApIHJldHVybiBkZWZlcmVkLnJlc29sdmUocmVzdWx0KTtcblxuICAgICAgICAvLyBDcmVhciBlbCBzaWd1aWVudGUgZWxlbWVudG9cbiAgICAgICAgTW9kZWwuY3JlYXRlKGFyci5zaGlmdCgpKS50aGVuKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGluc3RhbmNlKTtcbiAgICAgICAgICBpdGVyYXRpb24oKTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfSkoKTtcblxuICAgICAgLy8gRGV2b2x2ZXIgZWwgcHJvbWlzZVxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIENyZWEgdW4gbW9kZWxvIHBhcmEgZ3VhcmRhciBsYXMgdmVyc2lvbmVzIGRlbCBtb2RlbG8gYWN0dWFsXG4gICAgTW9kZWwudmVyc2lvbmluZyA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGNiKSB7XG4gICAgICBpZiAodHlwZW9mIG1vZGVsTmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjYiA9IG1vZGVsTmFtZTtcbiAgICAgICAgbW9kZWxOYW1lID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoW21vZGVsTmFtZSwgY2JdLCBbWydzdHJpbmcnLCAndW5kZWZpbmVkJ10sIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgaWYgKCEkdmVyc2lvbmluZykge1xuXG4gICAgICAgIC8vIFNpIGVsIG1vZGVsIG5vIHRpZW5lIG5vbWJyZSBzZSBhZ3JlZ2FcbiAgICAgICAgaWYgKCFtb2RlbE5hbWUpIHtcbiAgICAgICAgICBtb2RlbE5hbWUgPSAkbW9kZWxOYW1lICsgJ192ZXJzaW9uaW5nJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWFyIG1vZGVsbyBwYXJhIGVsIG1hbmVqbyBkZSBkYXRvc1xuICAgICAgICAkdmVyc2lvbmluZyA9ICRkYi5tb2RlbChtb2RlbE5hbWUpLmF1dG9JbmNyZW1lbnQoZmFsc2UpLmtleVBhdGgoJGlkLmtleVBhdGgpLmZpZWxkcyh7XG4gICAgICAgICAgXCJoYXNoXCI6IHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2IpIGNiKCR2ZXJzaW9uaW5nKTtcblxuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGUgbGEgdmVyc2lvbiBsb2NhbCBkZWwgcmVnaXN0cm9cbiAgICBNb2RlbC5nZXRWZXJzaW9uT2YgPSBmdW5jdGlvbiAoa2V5KSB7XG5cbiAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcblxuICAgICAgaWYgKCR2ZXJzaW9uaW5nKSB7XG4gICAgICAgICR2ZXJzaW9uaW5nLmdldChrZXkpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUodmVyc2lvbik7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChudWxsKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWZlcmVkLnJlc29sdmUobnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBBZ3JlZ2EgdW4gbWFuZGVqYWRvciBkZSBldmVudG9zIGFsIG1vZGVsb1xuICAgIE1vZGVsLmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICBpZiAoISRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdID0gW107XG4gICAgICB9XG5cbiAgICAgICRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XG5cbiAgICAgIHJldHVybiBNb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gRGlzcGFyYSB1biBldmVudG8gZGVsIG1vZGVsXG4gICAgTW9kZWwuZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3VuZGVmaW5lZCcsICdhcnJheSddXSk7XG5cbiAgICAgIGlmICgkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSkge1xuICAgICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5tYXAoZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgY2IuYXBwbHkoTW9kZWwsIGFyZ3MgfHwgW10pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXG4gICAgTW9kZWwucHJvdG90eXBlLiRnZXQgPSBmdW5jdGlvbiAoZmllbGQpIHtcblxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xuICAgIH07XG5cbiAgICAvLyBBc2lnbmEgaW4gdmFsb3IgYSB1biBjYW1wb1xuICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0ID0gZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkge1xuXG4gICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCwgdmFsdWUpO1xuICAgIH07XG5cbiAgICAvLyBEZXZ1ZWx2ZSB1biBvYmpldG8gY29uIGxhcyBwcm9waWVkYWRlcyBkZWwgcmVnaXN0cm9cbiAgICBNb2RlbC5wcm90b3R5cGUuJGdldFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB2YXIgdmFsdWVzID0ge307XG4gICAgICBkYXRhID0gZGF0YSB8fCB0aGlzO1xuXG4gICAgICBPYmplY3Qua2V5cygkZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIHNldEZpZWxkVmFsdWUodmFsdWVzLCBmaWVsZCwgZ2V0RmllbGRWYWx1ZShkYXRhLCBmaWVsZCkpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfTtcblxuICAgIC8vIERldnVlbHZlIHVuIG9iamV0byBjb24gbGFzIHByb3BpZWRhZGVzIGxvY2FsZXMgZGVsIHJlZ2lzdHJvXG4gICAgTW9kZWwucHJvdG90eXBlLiRnZXRMb2NhbFZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgcmV0dXJuIHRoaXMuJGdldFZhbHVlcyh0aGlzLiRsb2NhbFZhbHVlcyk7XG4gICAgfTtcblxuICAgIC8vIERldnVlbHZlIHVuIG1vZGVsbyBjb24gbGFzIHByb3BpZWRhZGVzIHJlbW90YXMgZGVsIHJlZ2lzdHJvXG4gICAgTW9kZWwucHJvdG90eXBlLiRnZXRSZW1vdGVWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kcmVtb3RlVmFsdWVzKTtcbiAgICB9O1xuXG4gICAgLy8gQXNpZ25hIGxhcyBwcm9waWVkYWRlcyBkZWwgcmVnaXN0cm9cbiAgICBNb2RlbC5wcm90b3R5cGUuJHNldFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhLCB2ZXJzaW9uKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdGhpei4kdmVyc2lvbiA9IHZlcnNpb247XG5cbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXouJGxvYWRlZCA9IHRydWU7XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH07XG5cbiAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIGxvY2FsZXMgZGVsIHJlZ2lzdHJvXG4gICAgTW9kZWwucHJvdG90eXBlLiRzZXRMb2NhbFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhLCB2ZXJzaW9uKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdGhpei4kbG9jYWxWZXJzaW9uID0gdmVyc2lvbjtcblxuICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJGxvY2FsVmFsdWVzLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIHRoaXouJGxvY2FsTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKCF0aGl6LiRsb2FkZWQpIHtcbiAgICAgICAgICB0aGl6LiRzZXRWYWx1ZXMoZGF0YSwgdmVyc2lvbik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBsYXMgcHJvcGllZGFkZXMgcmVtb3RhcyBkZWwgcmVnaXN0cm9cbiAgICBNb2RlbC5wcm90b3R5cGUuJHNldFJlbW90ZVZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhLCB2ZXJzaW9uKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdGhpei4kcmVtb3RlVmVyc2lvbiA9IHZlcnNpb247XG5cbiAgICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRyZW1vdGVWYWx1ZXMsIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgdGhpei4kcmVtb3RlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKCF0aGl6LiRsb2FkZWQpIHtcbiAgICAgICAgICB0aGl6LiRzZXRWYWx1ZXMoZGF0YSwgdmVyc2lvbik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBlbCBJRCBkZWwgb2JqZXRvXG4gICAgTW9kZWwucHJvdG90eXBlLiRzZXRLZXkgPSBmdW5jdGlvbiAobmV3S2V5KSB7XG5cbiAgICAgIHZhciBvbGRLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKHRoaXMpO1xuXG4gICAgICBNb2RlbC5zZWFyY2hEZWVwRmllbGQodGhpcywgJGlkLmtleVBhdGgsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IG5ld0tleTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAob2xkS2V5ICE9PSBuZXdLZXkpIHtcblxuICAgICAgICBpZiAob2xkS2V5ICYmICRpbnN0YW5jZXNbb2xkS2V5XSAmJiAkaW5zdGFuY2VzW29sZEtleV0gIT0gdGhpcykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk9sZEtleUlzTm90U2FtZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdLZXkgJiYgJGluc3RhbmNlc1tuZXdLZXldICYmICRpbnN0YW5jZXNbbmV3S2V5XSAhPSB0aGlzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5JbnN0YW5jZU9mTmV3S2V5SXNOb3RTYW1lJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbGltaW5hciBhbnRlcmlvclxuICAgICAgICBpZiAob2xkS2V5ICYmICRpbnN0YW5jZXNbb2xkS2V5XSkge1xuICAgICAgICAgIGRlbGV0ZSAkaW5zdGFuY2VzW29sZEtleV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZ3JlZ2FyIG51ZXZhXG4gICAgICAgIGlmIChuZXdLZXkgJiYgISRpbnN0YW5jZXNbbmV3S2V5XSkge1xuICAgICAgICAgICRpbnN0YW5jZXNbbmV3S2V5XSA9IHRoaXM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8vIENvbnN0dXJjdG9yIHF1ZSBzZSBwdWVkZSBzb2JyZSBlc2NyaWJpclxuICAgIE1vZGVsLnByb3RvdHlwZS4kY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZGF0YSkge307XG5cbiAgICAvLyBHdWFyZGEgbG9zIGRhdG9zIGRlbCBvYmpldG9cbiAgICBNb2RlbC5wcm90b3R5cGUuJHB1bGwgPSBmdW5jdGlvbiAobmV3VmFsdWVzLCB2ZXJzaW9uKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydzdHJpbmcnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICBpZiAobmV3VmFsdWVzKSB7XG4gICAgICAgIG5ld1ZhbHVlcyA9IHRoaXouJGdldFZhbHVlcyhuZXdWYWx1ZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3VmFsdWVzID0gdGhpei4kZ2V0UmVtb3RlVmFsdWVzKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBuZXdLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKG5ld1ZhbHVlcyk7XG4gICAgICB2YXIgb2xkVmFsdWVzID0gdGhpei4kZ2V0TG9jYWxWYWx1ZXMoKTtcbiAgICAgIHZhciBvbGRLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKG9sZFZhbHVlcyk7XG5cbiAgICAgIGNvbnNvbGUubG9nKG5ld0tleSwgb2xkS2V5KTtcbiAgICAgIGNvbnNvbGUubG9nKG5ld1ZhbHVlcywgb2xkVmFsdWVzKTtcblxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIEZ1bmNpb24gcXVlIGhhY2UgZXNjdWNoYXJzIGxvcyBtZW5zYWplcyBkZWwgc29ja2V0IHBhcmEgZWwgbW9kZWxcbiAgICBNb2RlbC5wcm90b3R5cGUuJGxpc3RlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlmICghJHNvY2tldCkgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5Eb2VzTm90SGF2ZVNvY2tldEluc3RhbmNlJyk7XG5cbiAgICAgIC8vIENyZWFyIHVuYSBzdWJzY3JpcGNpb24gYWwgc29ja2V0IHBhcmEgY3VhbmRvIHNlIHJlY2liYW4gZGF0b3NcbiAgICAgIC8vIHBhcmEgbGEgaW5zdGFuY2lhIGFjdHVhbFxuICAgICAgJHNvY2tldC5zdWJzY3JpYmUoe1xuICAgICAgICBtb2RlbE5hbWU6ICRtb2RlbE5hbWUsXG4gICAgICAgIGV2ZW50TmFtZTogJ3VwZGF0ZScsXG4gICAgICAgIG1vZGVsSWQ6IHRoaXouJGdldCgkaWQua2V5UGF0aClcbiAgICAgIH0sIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgLy8gQSByZWNpYmlyIGRhdG9zIGRlbCBzb2NrZXQgYXNpZ25hciBsb3MgdmFsb3Jlc1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gRW1pdGlyIGV2ZW50byBkZSBkYXRvcyByZWNpYmlkb3IgcGFyYSBlbCBtb2RlbG9cbiAgICAgICAgICB0aGl6LiRzZXRSZW1vdGVWYWx1ZXMoZGF0YS52YWx1ZXMsIGRhdGEudmVyc2lvbik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIEFncmVnYSB1biBtYW5kZWphZG9yIGRlIGV2ZW50b3NcbiAgICBNb2RlbC5wcm90b3R5cGUuJGJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICBpZiAoIXRoaXMuJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgdGhpcy4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvLyBEaXNwYXJhIHVuIGV2ZW50b1xuICAgIE1vZGVsLnByb3RvdHlwZS4kZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3VuZGVmaW5lZCcsICdhcnJheSddXSk7XG5cbiAgICAgIC8vIExsYW1hciBlbCBldmVudG8gcGFyYSBlbCBtb2RlbG9cbiAgICAgIE1vZGVsLmVtaXQoZXZlbnROYW1lLCBbdGhpeiwgW10uY29uY2F0KFt0aGl6XSkuY29uY2F0KGFyZ3MpXSk7XG5cbiAgICAgIGlmICh0aGl6LiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgIHRoaXouJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ubWFwKGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgIGNiLmFwcGx5KHRoaXosIGFyZ3MgfHwgW10pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIE1vZGVsLiRpbnN0YW5jZXMgPSAkaW5zdGFuY2VzO1xuXG4gICAgcmV0dXJuIE1vZGVsO1xuICB9O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYlF1ZXJ5ICgkbG9nLCBxcywgaWRiVXRpbHMsIGlkYkV2ZW50cykgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIHJldHVybiBmdW5jdGlvbiBpZGJRdWVyeSgkZGIsICRNb2RlbCwgJGZpbHRlcnMpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgJ2Z1bmN0aW9uJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICBsZXQgJHJlc3VsdCA9IG51bGw7XHJcblxyXG4gICAgLy8gRnVuY2lvbiBxdWUgZGV2dWVsdmUgZWplY3V0YSBlbCBxdWVyeSB5IGRldnVlbHZlIGVsIHJlc3VsdGFkby5cclxuICAgIHRoaXouZ2V0UmVzdWx0ID0gZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAvLyBFamVjdXRhciBzaSBubyBzZSBoYSBlamVjdXRhZG9cclxuICAgICAgaWYgKCEkcmVzdWx0KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcbiAgICAgICAgJHJlc3VsdCA9IFtdO1xyXG4gICAgICAgICRyZXN1bHQuJHJlc29sdmVkID0gZmFsc2U7XHJcbiAgICAgICAgJHJlc3VsdC4kcHJvbWlzZSA9IGRlZmVyZWQucHJvbWlzZTtcclxuXHJcbiAgICAgICAgJGRiLm9wZW5DdXJzb3IoJE1vZGVsLmdldE1vZGVsTmFtZSgpLCAkZmlsdGVycywgZnVuY3Rpb24gKGRhdGEsIG5leHQpIHtcclxuXHJcbiAgICAgICAgICBjb25zdCBrZXkgPSAkTW9kZWwuZ2V0S2V5RnJvbShkYXRhKTtcclxuXHJcbiAgICAgICAgICAvLyBPYnRlbmVyIGxhIGluc3RhbmNpYVxyXG4gICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSAkTW9kZWwuZ2V0SW5zdGFuY2Uoa2V5KTtcclxuXHJcbiAgICAgICAgICBpZiAoaW5zdGFuY2UuJGxvY2FsTG9hZGVkKSByZXR1cm4gbmV4dCgpO1xyXG5cclxuICAgICAgICAgICRNb2RlbC5nZXRWZXJzaW9uT2Yoa2V5KS5wcm9taXNlXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgIGluc3RhbmNlLiRzZXRMb2NhbFZhbHVlcyhkYXRhLCBkYXRhICYmIHZlcnNpb24/IHZlcnNpb24uaGFzaCA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgaW5zdGFuY2UuJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICBpbnN0YW5jZS4kZW1pdChpZGJFdmVudHMuTU9ERUxfUVVFUklFRCwgWyRyZXN1bHRdKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gQWdyZWdhciBhbCByZXN1bHRhZG9cclxuICAgICAgICAgICAgICAkcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAvLyBCdXNjYXIgc2lndWllbnRlXHJcbiAgICAgICAgICAgICAgbmV4dCgpO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuXHJcbiAgICAgICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAkbG9nLmVycm9yKFsnTW9kZWwuZ2V0VmVyc2lvbk9mIGFueSBlcnJvcicsIGVycl0pXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSkucHJvbWlzZVxyXG5cclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgJHJlc3VsdC4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKCRyZXN1bHQpO1xyXG4gICAgICAgICAgdGhpei5nZXRSZW1vdGVSZXN1bHQoKTtcclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuXHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAkcmVzdWx0O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gT2J0aWVuZSBlbCByZXN1bHRhZG8gZGUgdmFsb3JlcyByZW1vdG9zXHJcbiAgICB0aGl6LmdldFJlbW90ZVJlc3VsdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGxldCAkcmVtb3RlID0gJE1vZGVsLmdldFJlbW90ZSgpO1xyXG4gICAgICBsZXQgJHJlbW90ZVJlc3VsdCA9IG51bGw7XHJcblxyXG4gICAgICBpZiAoJHJlbW90ZSAmJiB0eXBlb2YgJHJlbW90ZS5maW5kID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAoJHJlbW90ZVJlc3VsdCA9ICRyZW1vdGUuZmluZCgkZmlsdGVycykuJHByb21pc2UpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5tYXAoZnVuY3Rpb24gKHJlY29yZCwgaSkge1xyXG4gICAgICAgICAgICAgICRNb2RlbC5nZXQoJE1vZGVsLmdldEtleUZyb20ocmVjb3JkLnZhbHVlcykpLiRwcm9taXNlXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoJHJlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAkcmVjb3JkLiRzZXRSZW1vdGVWYWx1ZXMocmVjb3JkLnZhbHVlcywgcmVjb3JkLnZlcnNpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKCRyZXN1bHRbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHJlc3VsdFtpXSAhPT0gJHJlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdFtpXS4kZW1pdChpZGJFdmVudHMuTU9ERUxfVU5RVUVSSUVELCBbJHJlc3VsdF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkcmVzdWx0W2ldID0gJHJlY29yZDtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkcmVzdWx0LnB1c2goJHJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICRyZWNvcmQuJGVtaXQoaWRiRXZlbnRzLk1PREVMX1FVRVJJRUQsIFskcmVzdWx0XSk7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAkcmVtb3RlUmVzdWx0O1xyXG5cclxuICAgIH07XHJcblxyXG4gIH1cclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJRdWVyeTtcbmZ1bmN0aW9uIGlkYlF1ZXJ5KCRsb2csIHFzLCBpZGJVdGlscywgaWRiRXZlbnRzKSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGlkYlF1ZXJ5KCRkYiwgJE1vZGVsLCAkZmlsdGVycykge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgJ2Z1bmN0aW9uJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgIHZhciAkcmVzdWx0ID0gbnVsbDtcblxuICAgIC8vIEZ1bmNpb24gcXVlIGRldnVlbHZlIGVqZWN1dGEgZWwgcXVlcnkgeSBkZXZ1ZWx2ZSBlbCByZXN1bHRhZG8uXG4gICAgdGhpei5nZXRSZXN1bHQgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgLy8gRWplY3V0YXIgc2kgbm8gc2UgaGEgZWplY3V0YWRvXG4gICAgICBpZiAoISRyZXN1bHQpIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcbiAgICAgICAgICAkcmVzdWx0ID0gW107XG4gICAgICAgICAgJHJlc3VsdC4kcmVzb2x2ZWQgPSBmYWxzZTtcbiAgICAgICAgICAkcmVzdWx0LiRwcm9taXNlID0gZGVmZXJlZC5wcm9taXNlO1xuXG4gICAgICAgICAgJGRiLm9wZW5DdXJzb3IoJE1vZGVsLmdldE1vZGVsTmFtZSgpLCAkZmlsdGVycywgZnVuY3Rpb24gKGRhdGEsIG5leHQpIHtcblxuICAgICAgICAgICAgdmFyIGtleSA9ICRNb2RlbC5nZXRLZXlGcm9tKGRhdGEpO1xuXG4gICAgICAgICAgICAvLyBPYnRlbmVyIGxhIGluc3RhbmNpYVxuICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gJE1vZGVsLmdldEluc3RhbmNlKGtleSk7XG5cbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS4kbG9jYWxMb2FkZWQpIHJldHVybiBuZXh0KCk7XG5cbiAgICAgICAgICAgICRNb2RlbC5nZXRWZXJzaW9uT2Yoa2V5KS5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKHZlcnNpb24pIHtcblxuICAgICAgICAgICAgICBpbnN0YW5jZS4kc2V0TG9jYWxWYWx1ZXMoZGF0YSwgZGF0YSAmJiB2ZXJzaW9uID8gdmVyc2lvbi5oYXNoIDogdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgaW5zdGFuY2UuJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaW5zdGFuY2UuJGVtaXQoaWRiRXZlbnRzLk1PREVMX1FVRVJJRUQsIFskcmVzdWx0XSk7XG5cbiAgICAgICAgICAgICAgLy8gQWdyZWdhciBhbCByZXN1bHRhZG9cbiAgICAgICAgICAgICAgJHJlc3VsdC5wdXNoKGluc3RhbmNlKTtcblxuICAgICAgICAgICAgICAvLyBCdXNjYXIgc2lndWllbnRlXG4gICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblxuICAgICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAkbG9nLmVycm9yKFsnTW9kZWwuZ2V0VmVyc2lvbk9mIGFueSBlcnJvcicsIGVycl0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkucHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgJHJlc3VsdC4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKCRyZXN1bHQpO1xuICAgICAgICAgICAgdGhpei5nZXRSZW1vdGVSZXN1bHQoKTtcbiAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkcmVzdWx0O1xuICAgIH07XG5cbiAgICAvLyBPYnRpZW5lIGVsIHJlc3VsdGFkbyBkZSB2YWxvcmVzIHJlbW90b3NcbiAgICB0aGl6LmdldFJlbW90ZVJlc3VsdCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB2YXIgJHJlbW90ZSA9ICRNb2RlbC5nZXRSZW1vdGUoKTtcbiAgICAgIHZhciAkcmVtb3RlUmVzdWx0ID0gbnVsbDtcblxuICAgICAgaWYgKCRyZW1vdGUgJiYgdHlwZW9mICRyZW1vdGUuZmluZCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICgkcmVtb3RlUmVzdWx0ID0gJHJlbW90ZS5maW5kKCRmaWx0ZXJzKS4kcHJvbWlzZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0Lm1hcChmdW5jdGlvbiAocmVjb3JkLCBpKSB7XG4gICAgICAgICAgICAkTW9kZWwuZ2V0KCRNb2RlbC5nZXRLZXlGcm9tKHJlY29yZC52YWx1ZXMpKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uICgkcmVjb3JkKSB7XG4gICAgICAgICAgICAgICRyZWNvcmQuJHNldFJlbW90ZVZhbHVlcyhyZWNvcmQudmFsdWVzLCByZWNvcmQudmVyc2lvbik7XG5cbiAgICAgICAgICAgICAgaWYgKCRyZXN1bHRbaV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoJHJlc3VsdFtpXSAhPT0gJHJlY29yZCkge1xuICAgICAgICAgICAgICAgICAgJHJlc3VsdFtpXS4kZW1pdChpZGJFdmVudHMuTU9ERUxfVU5RVUVSSUVELCBbJHJlc3VsdF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkcmVzdWx0W2ldID0gJHJlY29yZDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkcmVzdWx0LnB1c2goJHJlY29yZCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAkcmVjb3JkLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9RVUVSSUVELCBbJHJlc3VsdF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJHJlbW90ZVJlc3VsdDtcbiAgICB9O1xuICB9O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYlF1ZXJ5LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGIgKG1vZHVsZSkge1xyXG5cclxuICAvLyBEdnVlbHZlIGVsIGhvc3QgZGUgdW5hIFVSTFxyXG4gIGZ1bmN0aW9uIGdldEhvc3QodXJsKSB7XHJcbiAgICBjb25zdCBtID0gdXJsLm1hdGNoKC9eKD86aHR0cHM/Oik/XFwvXFwvKFteXFwvXSspLyk7XHJcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgbGV0IHVybEJhc2VIb3N0ID0gbG9jYXRpb24uaG9zdDtcclxuXHJcbiAgY29uc3QgbGJBdXRoID0gZnVuY3Rpb24oKSB7ICduZ0luamVjdCdcclxuICAgIGNvbnN0IHByb3BzID0gWydhY2Nlc3NUb2tlbklkJywgJ2N1cnJlbnRVc2VySWQnLCAncmVtZW1iZXJNZSddO1xyXG4gICAgY29uc3QgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xyXG4gICAgXHJcbiAgICAvLyBOb3RlOiBMb2NhbFN0b3JhZ2UgY29udmVydHMgdGhlIHZhbHVlIHRvIHN0cmluZ1xyXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxyXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAnJztcclxuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcclxuICAgICAgY29uc3Qga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xyXG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICB0aGl6W25hbWVdID0gbG9hZChuYW1lKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGl6LnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgc2F2ZShzdG9yYWdlLCBuYW1lLCB0aGl6W25hbWVdKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2V0VXNlciA9IGZ1bmN0aW9uKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IHVzZXJJZDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSB1c2VyRGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclVzZXIgPSBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IG51bGw7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IG51bGw7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclN0b3JhZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgc2F2ZShzZXNzaW9uU3RvcmFnZSwgbmFtZSwgbnVsbCk7XHJcbiAgICAgICAgc2F2ZShsb2NhbFN0b3JhZ2UsIG5hbWUsIG51bGwpO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBsYkF1dGgoKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24oJHEsIGxiQXV0aCkgeyAnbmdJbmplY3QnO1xyXG4gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbihjb25maWcpIHtcclxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV4dGVybmFsIHJlcXVlc3RzXHJcbiAgICAgICAgY29uc3QgaG9zdCA9IGdldEhvc3QoY29uZmlnLnVybCk7XHJcbiAgICAgICAgaWYgKGhvc3QgJiYgaG9zdCAhPT0gdXJsQmFzZUhvc3QpIHtcclxuICAgICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGJBdXRoLmFjY2Vzc1Rva2VuSWQpIHtcclxuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzW2F1dGhIZWFkZXJdID0gbGJBdXRoLmFjY2Vzc1Rva2VuSWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuX19pc0dldEN1cnJlbnRVc2VyX18pIHtcclxuICAgICAgICAgIC8vIFJldHVybiBhIHN0dWIgNDAxIGVycm9yIGZvciBVc2VyLmdldEN1cnJlbnQoKSB3aGVuXHJcbiAgICAgICAgICAvLyB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpblxyXG4gICAgICAgICAgY29uc3QgcmVzID0ge1xyXG4gICAgICAgICAgICBib2R5OiB7IGVycm9yOiB7IHN0YXR1czogNDAxIH19LFxyXG4gICAgICAgICAgICBzdGF0dXM6IDQwMSxcclxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICB9O1xyXG5cclxuICBjb25zdCBsYlJlc291cmNlID0gZnVuY3Rpb24oKSB7ICduZ0luamVjdCc7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHVybEJhc2U6IFwiL2FwaVwiLFxyXG4gICAgICBhdXRoSGVhZGVyOiAnYXV0aG9yaXphdGlvbicsXHJcbiAgICB9O1xyXG5cclxuICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXIgVGhlIGhlYWRlciBuYW1lIHRvIHVzZSwgZS5nLiBgWC1BY2Nlc3MtVG9rZW5gXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENvbmZpZ3VyZSB0aGUgUkVTVCB0cmFuc3BvcnQgdG8gdXNlIGEgZGlmZmVyZW50IGhlYWRlciBmb3Igc2VuZGluZ1xyXG4gICAgICogdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLiBJdCBpcyBzZW50IGluIHRoZSBgQXV0aG9yaXphdGlvbmAgaGVhZGVyXHJcbiAgICAgKiBieSBkZWZhdWx0LlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldEF1dGhIZWFkZXIgPSBmdW5jdGlvbihoZWFkZXIpIHtcclxuICAgICAgb3B0aW9ucy5hdXRoSGVhZGVyID0gaGVhZGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIGhlYWRlciBuYW1lIHRoYXQgaXMgdXNlZCBmb3Igc2VuZGluZyB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uXHJcbiAgICAgKi9cclxuICAgIHRoaXouZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHVzZSwgZS5nLiBgL2FwaWAgb3IgYC8vZXhhbXBsZS5jb20vYXBpYC5cclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ2hhbmdlIHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gQnkgZGVmYXVsdCwgdGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cclxuICAgIHRoaXouc2V0VXJsQmFzZSA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICBvcHRpb25zLnVybEJhc2UgPSB1cmw7XHJcbiAgICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIFRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldFVybEJhc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei4kZ2V0ID0gZnVuY3Rpb24oJHJlc291cmNlKSB7ICduZ0luamVjdCc7XHJcblxyXG4gICAgICBjb25zdCBsYlJlc291cmNlID0gZnVuY3Rpb24odXJsLCBwYXJhbXMsIGFjdGlvbnMpIHtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMoYWN0aW9ucykubWFwKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgIGFjdGlvbnNba2V5XS5vcmlnaW5hbFVybCA9IGFjdGlvbnNba2V5XS51cmw7XHJcbiAgICAgICAgICBhY3Rpb25zW2tleV0udXJsID0gb3B0aW9ucy51cmxCYXNlICsgYWN0aW9uc1trZXldLnVybDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzb3VyY2UgPSAkcmVzb3VyY2Uob3B0aW9ucy51cmxCYXNlICsgdXJsLCBwYXJhbXMsIGFjdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBBbmd1bGFyIGFsd2F5cyBjYWxscyBQT1NUIG9uICRzYXZlKClcclxuICAgICAgICAvLyBUaGlzIGhhY2sgaXMgYmFzZWQgb25cclxuICAgICAgICAvLyBodHRwOi8va2lya2J1c2hlbGwubWUvYW5ndWxhci1qcy11c2luZy1uZy1yZXNvdXJjZS1pbi1hLW1vcmUtcmVzdGZ1bC1tYW5uZXIvXHJcbiAgICAgICAgcmVzb3VyY2UucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24oc3VjY2VzcywgZXJyb3IpIHtcclxuICAgICAgICAgIC8vIEZvcnR1bmF0ZWx5LCBMb29wQmFjayBwcm92aWRlcyBhIGNvbnZlbmllbnQgYHVwc2VydGAgbWV0aG9kXHJcbiAgICAgICAgICAvLyB0aGF0IGV4YWN0bHkgZml0cyBvdXIgbmVlZHMuXHJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSByZXNvdXJjZS51cHNlcnQuY2FsbCh0aGlzLCB7fSwgdGhpcywgc3VjY2VzcywgZXJyb3IpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC4kcHJvbWlzZSB8fCByZXN1bHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2U7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsYlJlc291cmNlLmdldFVybEJhc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgICAgfTtcclxuICAgIFxyXG4gICAgICByZXR1cm4gbGJSZXNvdXJjZTtcclxuXHJcbiAgICB9O1xyXG5cclxuICB9XHJcblxyXG4gIHJldHVybiBtb2R1bGVcclxuICAgIC5mYWN0b3J5KCdsYkF1dGgnLCBsYkF1dGgpXHJcbiAgICAucHJvdmlkZXIoJ2xiUmVzb3VyY2UnLCBsYlJlc291cmNlKVxyXG4gICAgLmZhY3RvcnkoJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicsIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcilcclxuICAgIC5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24oJGh0dHBQcm92aWRlcikgeyAnbmdJbmplY3QnO1xyXG4gICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InKTtcclxuICAgIH1dKTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9sYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGxiO1xuZnVuY3Rpb24gbGIobW9kdWxlKSB7XG5cbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcbiAgZnVuY3Rpb24gZ2V0SG9zdCh1cmwpIHtcbiAgICB2YXIgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xuICAgIHJldHVybiBtID8gbVsxXSA6IG51bGw7XG4gIH1cblxuICB2YXIgdXJsQmFzZUhvc3QgPSBsb2NhdGlvbi5ob3N0O1xuXG4gIHZhciBsYkF1dGggPSBmdW5jdGlvbiBsYkF1dGgoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcbiAgICB2YXIgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xuXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcbiAgICAvLyBXZSBhcmUgdXNpbmcgZW1wdHkgc3RyaW5nIGFzIGEgbWFya2VyIGZvciBudWxsL3VuZGVmaW5lZCB2YWx1ZXMuXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XG4gICAgICAgIHN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWQobmFtZSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Vba2V5XSB8fCBzZXNzaW9uU3RvcmFnZVtrZXldIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXpbbmFtZV0gPSBsb2FkKG5hbWUpO1xuICAgICAgfSk7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdmFyIHN0b3JhZ2UgPSB0aGl6LnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzdG9yYWdlLCBuYW1lLCB0aGl6W25hbWVdKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgdXNlcklkLCB1c2VyRGF0YSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IHVzZXJJZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gbnVsbDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBzYXZlKHNlc3Npb25TdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgICAgc2F2ZShsb2NhbFN0b3JhZ2UsIG5hbWUsIG51bGwpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XG4gIH07XG5cbiAgdmFyIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcigkcSwgbGJBdXRoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHJldHVybiB7XG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV4dGVybmFsIHJlcXVlc3RzXG4gICAgICAgIHZhciBob3N0ID0gZ2V0SG9zdChjb25maWcudXJsKTtcbiAgICAgICAgaWYgKGhvc3QgJiYgaG9zdCAhPT0gdXJsQmFzZUhvc3QpIHtcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XG4gICAgICAgICAgY29uZmlnLmhlYWRlcnNbYXV0aEhlYWRlcl0gPSBsYkF1dGguYWNjZXNzVG9rZW5JZDtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuX19pc0dldEN1cnJlbnRVc2VyX18pIHtcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxuICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIHVzZXIgbG9nZ2VkIGluXG4gICAgICAgICAgdmFyIHJlcyA9IHtcbiAgICAgICAgICAgIGJvZHk6IHsgZXJyb3I6IHsgc3RhdHVzOiA0MDEgfSB9LFxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXG4gICAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGZ1bmN0aW9uIGhlYWRlcnMoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICB2YXIgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uIGxiUmVzb3VyY2UoKSB7XG4gICAgJ25nSW5qZWN0JztcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHVybEJhc2U6IFwiL2FwaVwiLFxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nXG4gICAgfTtcblxuICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlciBUaGUgaGVhZGVyIG5hbWUgdG8gdXNlLCBlLmcuIGBYLUFjY2Vzcy1Ub2tlbmBcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ29uZmlndXJlIHRoZSBSRVNUIHRyYW5zcG9ydCB0byB1c2UgYSBkaWZmZXJlbnQgaGVhZGVyIGZvciBzZW5kaW5nXHJcbiAgICAgKiB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uIEl0IGlzIHNlbnQgaW4gdGhlIGBBdXRob3JpemF0aW9uYCBoZWFkZXJcclxuICAgICAqIGJ5IGRlZmF1bHQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoaGVhZGVyKSB7XG4gICAgICBvcHRpb25zLmF1dGhIZWFkZXIgPSBoZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgaGVhZGVyIG5hbWUgdGhhdCBpcyB1c2VkIGZvciBzZW5kaW5nIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdXNlLCBlLmcuIGAvYXBpYCBvciBgLy9leGFtcGxlLmNvbS9hcGlgLlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDaGFuZ2UgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBCeSBkZWZhdWx0LCB0aGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouc2V0VXJsQmFzZSA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgIG9wdGlvbnMudXJsQmFzZSA9IHVybDtcbiAgICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIFRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICB9O1xuXG4gICAgdGhpei4kZ2V0ID0gZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xuICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoYWN0aW9ucykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICAgIGFjdGlvbnNba2V5XS51cmwgPSBvcHRpb25zLnVybEJhc2UgKyBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSAkcmVzb3VyY2Uob3B0aW9ucy51cmxCYXNlICsgdXJsLCBwYXJhbXMsIGFjdGlvbnMpO1xuXG4gICAgICAgIC8vIEFuZ3VsYXIgYWx3YXlzIGNhbGxzIFBPU1Qgb24gJHNhdmUoKVxuICAgICAgICAvLyBUaGlzIGhhY2sgaXMgYmFzZWQgb25cbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xuICAgICAgICByZXNvdXJjZS5wcm90b3R5cGUuJHNhdmUgPSBmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxuICAgICAgICAgIC8vIHRoYXQgZXhhY3RseSBmaXRzIG91ciBuZWVkcy5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LiRwcm9taXNlIHx8IHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gbW9kdWxlLmZhY3RvcnkoJ2xiQXV0aCcsIGxiQXV0aCkucHJvdmlkZXIoJ2xiUmVzb3VyY2UnLCBsYlJlc291cmNlKS5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpLmNvbmZpZyhbJyRodHRwUHJvdmlkZXInLCBmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InKTtcbiAgfV0pO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2xiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gR2xvYmFsZXNcclxuaW1wb3J0IENsYXp6ZXIgIGZyb20gJy4vQ2xhenplcic7XHJcblxyXG4vLyBSZXF1ZXN0XHJcbmltcG9ydCBpZGJSZXF1ZXN0ICAgICAgICAgZnJvbSAnLi9pZGJSZXF1ZXN0JztcclxuaW1wb3J0IGlkYk9wZW5EQlJlcXVlc3QgICBmcm9tICcuL2lkYk9wZW5EQlJlcXVlc3QnO1xyXG5cclxuLy8gUHJpbmNpcGFsZXNcclxuaW1wb3J0IGlkYiAgICAgICAgICAgICAgZnJvbSAnLi9pZGInO1xyXG5pbXBvcnQgaWRiU3RvcmUgICAgICAgICBmcm9tICcuL2lkYlN0b3JlJztcclxuaW1wb3J0IGlkYkV2ZW50VGFyZ2V0ICAgZnJvbSAnLi9pZGJFdmVudFRhcmdldCc7XHJcbmltcG9ydCBpZGJNb2RlbCAgICAgICAgIGZyb20gJy4vaWRiTW9kZWwnO1xyXG5pbXBvcnQgaWRiU29ja2V0ICAgICAgICBmcm9tICcuL2lkYlNvY2tldCc7XHJcbmltcG9ydCBpZGJUcmFuc2FjdGlvbiAgIGZyb20gJy4vaWRiVHJhbnNhY3Rpb24nO1xyXG5cclxuaW1wb3J0IGxiIGZyb20gJy4vbGInO1xyXG5cclxubGIoYW5ndWxhci5tb2R1bGUoJ25nLnYxLmlkYicsIFtdKSlcclxuICBcclxuICAuY29uc3RhbnQoJ2lvJywgaW8pXHJcbiAgLnNlcnZpY2UoJ0NsYXp6ZXInLCBDbGF6emVyKVxyXG5cclxuICAuY29uc3RhbnQoJ2lkYlZlcnNpb24nLCAnMC4wLjEnKVxyXG4gIFxyXG4gIC5zZXJ2aWNlKCdpZGJSZXF1ZXN0JywgaWRiUmVxdWVzdClcclxuICAuc2VydmljZSgnaWRiT3BlbkRCUmVxdWVzdCcsIGlkYk9wZW5EQlJlcXVlc3QpXHJcbiAgLnNlcnZpY2UoJ2lkYjInLCBpZGIpXHJcbiAgLnNlcnZpY2UoJ2lkYlN0b3JlJywgaWRiU3RvcmUpXHJcbiAgLnNlcnZpY2UoJ2lkYkV2ZW50VGFyZ2V0JywgaWRiRXZlbnRUYXJnZXQpXHJcbiAgLnNlcnZpY2UoJ2lkYk1vZGVsMicsIGlkYk1vZGVsKVxyXG4gIC5zZXJ2aWNlKCdpZGJTb2NrZXQyJywgaWRiU29ja2V0KVxyXG4gIC5zZXJ2aWNlKCdpZGJUcmFuc2FjdGlvbicsIGlkYlRyYW5zYWN0aW9uKVxyXG5cclxuICAuc2VydmljZSgnZGIyJywgZnVuY3Rpb24gKGlkYjIpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgICBjb25zdCBkYiA9IG5ldyBpZGIyKCdhYWEnLCA0KVxyXG5cclxuICAgIGRiLiRhdXRvbWlncmF0aW9uKHtcclxuICAgICAgMTogZnVuY3Rpb24gKGRiKSB7XHJcbiAgICAgICAgdmFyIG1vZGVsID0gZGJcclxuICAgICAgICAgIC4kbW9kZWwoJ1RyYWJhamFkb3InKVxyXG4gICAgICAgICAgLiRjcmVhdGVTdG9yZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIC4kZHJvcCgpLnRoZW4oZnVuY3Rpb24gKGRiKSB7XHJcbiAgICAgIGRiLiRvcGVuKCkudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhbJ29wZW5lZCddKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGI7XHJcbiAgICBcclxuICB9KVxyXG5cclxuICAuc2VydmljZSgnVHJhYmFqYWRvcjInLCBmdW5jdGlvbiAoZGIyKSB7ICduZ0luamVjdCc7XHJcbiAgICByZXR1cm4gd2luZG93LlRyYWJhamFkb3IyID0gZGIyLiRtb2RlbCgnVHJhYmFqYWRvcicpXHJcbiAgICAgIC4kZmllbGQoJ2NvZCcsICAgICAgICB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSlcclxuICAgICAgLiRmaWVsZCgnY2knLCAgICAgICAgIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KVxyXG4gICAgICAuJGZpZWxkKCdub21icmVzJywgICAgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pXHJcbiAgICAgIC4kZmllbGQoJ2FwZWxsaWRvcycsICB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSlcclxuICAgICAgLiRmaWVsZCgnbmFjaW1pZW50bycsIHsgXCJ0eXBlXCI6IFwiZGF0ZVwiIH0pXHJcbiAgICAgIC4kZmllbGQoJ2luZ3Jlc28nLCAgICB7IFwidHlwZVwiOiBcImRhdGVcIiB9KVxyXG4gICAgICAuJGZpZWxkKCdkaXJlY2Npb24nLCAgeyBcInR5cGVcIjogXCJzdHJpbmdcIn0pXHJcbiAgICAgIC4kcmVtb3RlKFxyXG4gICAgICAgICcvdHJhYmFqYWRvcmVzLzppZCcsXHJcbiAgICAgICAgeyAnaWQnOiAnQGlkJyB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICdmaW5kJzogICB7IHVybDogJy90cmFiYWphZG9yZXMvX2ZpbmRXaXRoVmVyc2lvbicsIG1ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWUsIH0sXHJcbiAgICAgICAgICAvLyAnY3JlYXRlJzogeyB1cmw6ICcvdHJhYmFqYWRvcmVzJywgbWV0aG9kOiAnUE9TVCcsIH0sXHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICAgIC8vIC52ZXJzaW9uaW5nKClcclxuICAgICAgLiRidWlsZChmdW5jdGlvbiAoVHJhYmFqYWRvcikge1xyXG5cclxuICAgICAgICBUcmFiYWphZG9yLnByb3RvdHlwZS4kY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBUcmFiYWphZG9yLnByb3RvdHlwZS5nZXROb21icmUgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgICAgIHJldHVybiB0aGlzLm5vbWJyZXMgKyAnICcgKyB0aGlzLmFwZWxsaWRvcztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcbiAgfSlcclxuXHJcbiAgLnJ1bihmdW5jdGlvbiAoZGIyLCBUcmFiYWphZG9yMikgeyAnbmdJbmplY3QnO1xyXG4gICAgY29uc3QgdCA9IG5ldyBUcmFiYWphZG9yMigpO1xyXG4gICAgdC5ub21icmVzID0gJ0FsZXhhbmRlcic7XHJcbiAgICB0LmFwZWxsaWRvcyA9ICdSb25kb24nO1xyXG4gICAgY29uc29sZS5sb2codC4kZ2V0VmFsdWVzKCkpO1xyXG4gICAgY29uc29sZS5sb2codC5nZXROb21icmUoKSk7XHJcblxyXG4gICAgVHJhYmFqYWRvcjIuJHB1dCh7XHJcbiAgICAgIGlkOiAxLFxyXG4gICAgICAnbm9tYnJlcyc6ICdBbGV4YW5kZXInXHJcbiAgICB9KTtcclxuXHJcbiAgICBUcmFiYWphZG9yMi4kcHV0KHtcclxuICAgICAgaWQ6IDIsXHJcbiAgICAgICdub21icmVzJzogJ0d1aWxsZW1vJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgVHJhYmFqYWRvcjIuJHB1dCh7XHJcbiAgICAgIGlkOiAyLFxyXG4gICAgICAnYXBlbGxpZG9zJzogJ1NlbWluYXJpbydcclxuICAgIH0pO1xyXG5cclxuICAgIFRyYWJhamFkb3IyLiRwdXQoe1xyXG4gICAgICBpZDogNCxcclxuICAgICAgJ25vbWJyZXMnOiAnQXhlbCdcclxuICAgIH0pO1xyXG5cclxuICAgIFRyYWJhamFkb3IyLiRwdXQoe1xyXG4gICAgICAnbm9tYnJlcyc6ICdHYWJyaWVsJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LnIgPSBUcmFiYWphZG9yMi4kZ2V0KDIpO1xyXG5cclxuICAgIHIuJHByb21pc2VcclxuICAgIC50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcclxuICAgICAgY29uc29sZS5sb2coWyd0aGVuJywgcmVjb3JkXSlcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXZlbnQpXHJcbiAgICB9KVxyXG5cclxuICB9KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEdsb2JhbGVzXG5cbnZhciBfQ2xhenplciA9IHJlcXVpcmUoJy4vQ2xhenplcicpO1xuXG52YXIgX0NsYXp6ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ2xhenplcik7XG5cbnZhciBfaWRiUmVxdWVzdCA9IHJlcXVpcmUoJy4vaWRiUmVxdWVzdCcpO1xuXG52YXIgX2lkYlJlcXVlc3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiUmVxdWVzdCk7XG5cbnZhciBfaWRiT3BlbkRCUmVxdWVzdCA9IHJlcXVpcmUoJy4vaWRiT3BlbkRCUmVxdWVzdCcpO1xuXG52YXIgX2lkYk9wZW5EQlJlcXVlc3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiT3BlbkRCUmVxdWVzdCk7XG5cbnZhciBfaWRiID0gcmVxdWlyZSgnLi9pZGInKTtcblxudmFyIF9pZGIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiKTtcblxudmFyIF9pZGJTdG9yZSA9IHJlcXVpcmUoJy4vaWRiU3RvcmUnKTtcblxudmFyIF9pZGJTdG9yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJTdG9yZSk7XG5cbnZhciBfaWRiRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuL2lkYkV2ZW50VGFyZ2V0Jyk7XG5cbnZhciBfaWRiRXZlbnRUYXJnZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiRXZlbnRUYXJnZXQpO1xuXG52YXIgX2lkYk1vZGVsID0gcmVxdWlyZSgnLi9pZGJNb2RlbCcpO1xuXG52YXIgX2lkYk1vZGVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYk1vZGVsKTtcblxudmFyIF9pZGJTb2NrZXQgPSByZXF1aXJlKCcuL2lkYlNvY2tldCcpO1xuXG52YXIgX2lkYlNvY2tldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJTb2NrZXQpO1xuXG52YXIgX2lkYlRyYW5zYWN0aW9uID0gcmVxdWlyZSgnLi9pZGJUcmFuc2FjdGlvbicpO1xuXG52YXIgX2lkYlRyYW5zYWN0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlRyYW5zYWN0aW9uKTtcblxudmFyIF9sYiA9IHJlcXVpcmUoJy4vbGInKTtcblxudmFyIF9sYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbigwLCBfbGIyLmRlZmF1bHQpKGFuZ3VsYXIubW9kdWxlKCduZy52MS5pZGInLCBbXSkpLmNvbnN0YW50KCdpbycsIGlvKS5zZXJ2aWNlKCdDbGF6emVyJywgX0NsYXp6ZXIyLmRlZmF1bHQpLmNvbnN0YW50KCdpZGJWZXJzaW9uJywgJzAuMC4xJykuc2VydmljZSgnaWRiUmVxdWVzdCcsIF9pZGJSZXF1ZXN0Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJPcGVuREJSZXF1ZXN0JywgX2lkYk9wZW5EQlJlcXVlc3QyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYjInLCBfaWRiMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJTdG9yZScsIF9pZGJTdG9yZTIuZGVmYXVsdCkuc2VydmljZSgnaWRiRXZlbnRUYXJnZXQnLCBfaWRiRXZlbnRUYXJnZXQyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYk1vZGVsMicsIF9pZGJNb2RlbDIuZGVmYXVsdCkuc2VydmljZSgnaWRiU29ja2V0MicsIF9pZGJTb2NrZXQyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlRyYW5zYWN0aW9uJywgX2lkYlRyYW5zYWN0aW9uMi5kZWZhdWx0KS5zZXJ2aWNlKCdkYjInLCBmdW5jdGlvbiAoaWRiMikge1xuICAnbmdJbmplY3QnO1xuXG4gIHZhciBkYiA9IG5ldyBpZGIyKCdhYWEnLCA0KTtcblxuICBkYi4kYXV0b21pZ3JhdGlvbih7XG4gICAgMTogZnVuY3Rpb24gXyhkYikge1xuICAgICAgdmFyIG1vZGVsID0gZGIuJG1vZGVsKCdUcmFiYWphZG9yJykuJGNyZWF0ZVN0b3JlKCk7XG4gICAgfVxuICB9KS4kZHJvcCgpLnRoZW4oZnVuY3Rpb24gKGRiKSB7XG4gICAgZGIuJG9wZW4oKS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgY29uc29sZS5sb2coWydvcGVuZWQnXSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBkYjtcbn0pLnNlcnZpY2UoJ1RyYWJhamFkb3IyJywgZnVuY3Rpb24gKGRiMikge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiB3aW5kb3cuVHJhYmFqYWRvcjIgPSBkYjIuJG1vZGVsKCdUcmFiYWphZG9yJykuJGZpZWxkKCdjb2QnLCB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSkuJGZpZWxkKCdjaScsIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KS4kZmllbGQoJ25vbWJyZXMnLCB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSkuJGZpZWxkKCdhcGVsbGlkb3MnLCB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSkuJGZpZWxkKCduYWNpbWllbnRvJywgeyBcInR5cGVcIjogXCJkYXRlXCIgfSkuJGZpZWxkKCdpbmdyZXNvJywgeyBcInR5cGVcIjogXCJkYXRlXCIgfSkuJGZpZWxkKCdkaXJlY2Npb24nLCB7IFwidHlwZVwiOiBcInN0cmluZ1wiIH0pLiRyZW1vdGUoJy90cmFiYWphZG9yZXMvOmlkJywgeyAnaWQnOiAnQGlkJyB9LCB7XG4gICAgJ2ZpbmQnOiB7IHVybDogJy90cmFiYWphZG9yZXMvX2ZpbmRXaXRoVmVyc2lvbicsIG1ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWUgfVxuICB9KVxuICAvLyAudmVyc2lvbmluZygpXG4gIC4kYnVpbGQoZnVuY3Rpb24gKFRyYWJhamFkb3IpIHtcblxuICAgIFRyYWJhamFkb3IucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7fTtcblxuICAgIFRyYWJhamFkb3IucHJvdG90eXBlLmdldE5vbWJyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vbWJyZXMgKyAnICcgKyB0aGlzLmFwZWxsaWRvcztcbiAgICB9O1xuICB9KTtcbn0pLnJ1bihmdW5jdGlvbiAoZGIyLCBUcmFiYWphZG9yMikge1xuICAnbmdJbmplY3QnO1xuXG4gIHZhciB0ID0gbmV3IFRyYWJhamFkb3IyKCk7XG4gIHQubm9tYnJlcyA9ICdBbGV4YW5kZXInO1xuICB0LmFwZWxsaWRvcyA9ICdSb25kb24nO1xuICBjb25zb2xlLmxvZyh0LiRnZXRWYWx1ZXMoKSk7XG4gIGNvbnNvbGUubG9nKHQuZ2V0Tm9tYnJlKCkpO1xuXG4gIFRyYWJhamFkb3IyLiRwdXQoe1xuICAgIGlkOiAxLFxuICAgICdub21icmVzJzogJ0FsZXhhbmRlcidcbiAgfSk7XG5cbiAgVHJhYmFqYWRvcjIuJHB1dCh7XG4gICAgaWQ6IDIsXG4gICAgJ25vbWJyZXMnOiAnR3VpbGxlbW8nXG4gIH0pO1xuXG4gIFRyYWJhamFkb3IyLiRwdXQoe1xuICAgIGlkOiAyLFxuICAgICdhcGVsbGlkb3MnOiAnU2VtaW5hcmlvJ1xuICB9KTtcblxuICBUcmFiYWphZG9yMi4kcHV0KHtcbiAgICBpZDogNCxcbiAgICAnbm9tYnJlcyc6ICdBeGVsJ1xuICB9KTtcblxuICBUcmFiYWphZG9yMi4kcHV0KHtcbiAgICAnbm9tYnJlcyc6ICdHYWJyaWVsJ1xuICB9KTtcblxuICB3aW5kb3cuciA9IFRyYWJhamFkb3IyLiRnZXQoMik7XG5cbiAgci4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcbiAgICBjb25zb2xlLmxvZyhbJ3RoZW4nLCByZWNvcmRdKTtcbiAgfSkuY2F0Y2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc29sZS5lcnJvcihldmVudCk7XG4gIH0pO1xufSk7XG5cbi8vIFByaW5jaXBhbGVzXG5cblxuLy8gUmVxdWVzdFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIENsYXp6ZXJcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7ICduZ0luamVjdCc7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgZnVuY3Rpb24gQ2xhenplciAoY29uc3RydWN0b3IpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY2xhenonLCB7IHZhbHVlOiBjb25zdHJ1Y3RvciB8fCBmdW5jdGlvbiAoKSB7fSB9KTtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ2luaGVyaXQnLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKHBhcmVudCkge1xyXG4gICAgICBsZXQgdG1wID0gZnVuY3Rpb24oKSB7fTtcclxuICAgICAgdG1wLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7XHJcbiAgICAgIHRoaXMuY2xhenoucHJvdG90eXBlID0gbmV3IHRtcCgpO1xyXG4gICAgICB0aGlzLmNsYXp6LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHRoaXMuY2xheno7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdzdGF0aWMnLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmNsYXp6LCBuYW1lLCB7XHJcbiAgICAgICAgdmFsdWU6IHZhbHVlXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAncHJvcGVydHknLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKG5hbWUsIG9wdHMpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuY2xhenoucHJvdG90eXBlLCBuYW1lLCBvcHRzKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ21ldGhvZCcsIHtcclxuICAgIHZhbHVlOiBmdW5jdGlvbiAobmFtZSwgZnVuYykge1xyXG4gICAgICB0aGlzLnByb3BlcnR5KG5hbWUsIHtcclxuICAgICAgICB2YWx1ZTogZnVuY1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ2dldHRlcicsIHtcclxuICAgIHZhbHVlOiBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcclxuICAgICAgaWYgKCF0bykgdG8gPSBmcm9tO1xyXG4gICAgICB0aGlzLnByb3BlcnR5KGZyb20sIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLiRtZVt0b107XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3NldHRlcicsIHtcclxuICAgIHZhbHVlOiBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcclxuICAgICAgaWYgKCF0bykgdG8gPSBmcm9tO1xyXG4gICAgICB0aGlzLnByb3BlcnR5KGZyb20sIHtcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy4kbWVbdG9dID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ2hhbmRsZXJFdmVudCcsIHtcclxuICAgIHZhbHVlOiBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcclxuICAgICAgaWYgKCF0bykgdG8gPSBmcm9tO1xyXG4gICAgICB0aGlzLnByb3BlcnR5KGZyb20sIHtcclxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgICB0aGlzLiRtZVt0b10gPSBjYjtcclxuICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICByZXR1cm4gQ2xhenplcjtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9DbGF6emVyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogQ2xhenplclxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcblxuICBmdW5jdGlvbiBDbGF6emVyKGNvbnN0cnVjdG9yKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjbGF6eicsIHsgdmFsdWU6IGNvbnN0cnVjdG9yIHx8IGZ1bmN0aW9uICgpIHt9IH0pO1xuICB9XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ2luaGVyaXQnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKHBhcmVudCkge1xuICAgICAgdmFyIHRtcCA9IGZ1bmN0aW9uIHRtcCgpIHt9O1xuICAgICAgdG1wLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7XG4gICAgICB0aGlzLmNsYXp6LnByb3RvdHlwZSA9IG5ldyB0bXAoKTtcbiAgICAgIHRoaXMuY2xhenoucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gdGhpcy5jbGF6ejtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3N0YXRpYycsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobmFtZSwgX3ZhbHVlKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jbGF6eiwgbmFtZSwge1xuICAgICAgICB2YWx1ZTogX3ZhbHVlXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3Byb3BlcnR5Jywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShuYW1lLCBvcHRzKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jbGF6ei5wcm90b3R5cGUsIG5hbWUsIG9wdHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnbWV0aG9kJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShuYW1lLCBmdW5jKSB7XG4gICAgICB0aGlzLnByb3BlcnR5KG5hbWUsIHtcbiAgICAgICAgdmFsdWU6IGZ1bmNcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnZ2V0dGVyJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShmcm9tLCB0bykge1xuICAgICAgaWYgKCF0bykgdG8gPSBmcm9tO1xuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLiRtZVt0b107XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnc2V0dGVyJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShmcm9tLCB0bykge1xuICAgICAgaWYgKCF0bykgdG8gPSBmcm9tO1xuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XG4gICAgICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy4kbWVbdG9dID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnaGFuZGxlckV2ZW50Jywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShmcm9tLCB0bykge1xuICAgICAgaWYgKCF0bykgdG8gPSBmcm9tO1xuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShjYikge1xuICAgICAgICAgIHRoaXMuJG1lW3RvXSA9IGNiO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHJldHVybiBDbGF6emVyO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9DbGF6emVyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYlJlcXVlc3RcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCUmVxdWVzdCA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NRXhjZXB0aW9uPyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSAoSURCT2JqZWN0U3RvcmUgb3IgSURCSW5kZXggb3IgSURCQ3Vyc29yKT8gc291cmNlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbj8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlJlcXVlc3RSZWFkeVN0YXRlICAgICAgICAgICAgICAgICAgICAgICByZWFkeVN0YXRlO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uc3VjY2VzcztcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uZXJyb3I7XHJcbiAqIH07XHJcbiAqXHJcbiAqIGVudW0gSURCUmVxdWVzdFJlYWR5U3RhdGUge1xyXG4gKiAgIFwicGVuZGluZ1wiLFxyXG4gKiAgIFwiZG9uZVwiXHJcbiAqIH07XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplcikgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXHJcbiAgLy8gJF9wcm9taXNlXHJcblxyXG4gIGNvbnN0IFJlYWR5U3RhdGUgPSBuZXcgQ2xhenplcih7fSlcclxuICAgICAgICAuc3RhdGljKCdQZW5kaW5nJywgICdwZW5kaW5nJylcclxuICAgICAgICAuc3RhdGljKCdEb25lJywgICAgICdkb25lJyk7XHJcbiAgXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJSZXF1ZXN0IChtZSkge1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBTdGF0aWNzXHJcbiAgLnN0YXRpYygnUmVhZHlTdGF0ZScsIFJlYWR5U3RhdGUuY2xhenopXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEdldHRlcnNcclxuICAuZ2V0dGVyKCckcmVzdWx0JywgJ3Jlc3VsdCcpXHJcbiAgLmdldHRlcignJGVycm9yJywgJ2Vycm9yJylcclxuICAuZ2V0dGVyKCckc291cmNlJywgJ3NvdXJjZScpXHJcbiAgLmdldHRlcignJHJlYWR5U3RhdGUnLCAncmVhZHlTdGF0ZScpXHJcbiAgLmdldHRlcignJHRyYW5zYWN0aW9uJywgJ3RyYW5zYWN0aW9uJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRXZlbnQgaGFuZGxlcnNcclxuICAuaGFuZGxlckV2ZW50KCckc3VjY2VzcycsICdvbnN1Y2Nlc3MnKVxyXG4gIC5oYW5kbGVyRXZlbnQoJyRmYWlsZWQnLCAgJ29uZXJyb3InKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9wZXJ0eVxyXG4gIC5wcm9wZXJ0eSgnJHByb21pc2UnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlmICh0aGl6LiRfcHJvbWlzZSkgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgICAgLy8gQ3JlYXIgcHJvbWlzZSBwYXJhIGVsIHJlcXVlc3RcclxuICAgICAgdGhpei4kX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdGhpei4kc3VjY2VzcyhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG5ldyBDbGF6emVyKHRoaXouJF9wcm9taXNlKS5zdGF0aWMoJyRyZXF1ZXN0JywgdGhpeiApO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlJlcXVlc3QuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJSZXF1ZXN0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQlJlcXVlc3QgOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGFueSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTUV4Y2VwdGlvbj8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgKElEQk9iamVjdFN0b3JlIG9yIElEQkluZGV4IG9yIElEQkN1cnNvcik/IHNvdXJjZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb24/ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJSZXF1ZXN0UmVhZHlTdGF0ZSAgICAgICAgICAgICAgICAgICAgICAgcmVhZHlTdGF0ZTtcclxuICogXHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnN1Y2Nlc3M7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiB9O1xyXG4gKlxyXG4gKiBlbnVtIElEQlJlcXVlc3RSZWFkeVN0YXRlIHtcclxuICogICBcInBlbmRpbmdcIixcclxuICogICBcImRvbmVcIlxyXG4gKiB9O1xyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJF9wcm9taXNlXG5cbiAgdmFyIFJlYWR5U3RhdGUgPSBuZXcgQ2xhenplcih7fSkuc3RhdGljKCdQZW5kaW5nJywgJ3BlbmRpbmcnKS5zdGF0aWMoJ0RvbmUnLCAnZG9uZScpO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiUmVxdWVzdChtZSkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTdGF0aWNzXG4gIC5zdGF0aWMoJ1JlYWR5U3RhdGUnLCBSZWFkeVN0YXRlLmNsYXp6KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRyZXN1bHQnLCAncmVzdWx0JykuZ2V0dGVyKCckZXJyb3InLCAnZXJyb3InKS5nZXR0ZXIoJyRzb3VyY2UnLCAnc291cmNlJykuZ2V0dGVyKCckcmVhZHlTdGF0ZScsICdyZWFkeVN0YXRlJykuZ2V0dGVyKCckdHJhbnNhY3Rpb24nLCAndHJhbnNhY3Rpb24nKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBFdmVudCBoYW5kbGVyc1xuICAuaGFuZGxlckV2ZW50KCckc3VjY2VzcycsICdvbnN1Y2Nlc3MnKS5oYW5kbGVyRXZlbnQoJyRmYWlsZWQnLCAnb25lcnJvcicpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFByb3BlcnR5XG4gIC5wcm9wZXJ0eSgnJHByb21pc2UnLCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlmICh0aGl6LiRfcHJvbWlzZSkgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xuXG4gICAgICAvLyBDcmVhciBwcm9taXNlIHBhcmEgZWwgcmVxdWVzdFxuICAgICAgdGhpei4kX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRoaXouJHN1Y2Nlc3MoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmVzb2x2ZShldmVudCk7XG4gICAgICAgIH0pLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmVqZWN0KGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgbmV3IENsYXp6ZXIodGhpei4kX3Byb21pc2UpLnN0YXRpYygnJHJlcXVlc3QnLCB0aGl6KTtcblxuICAgICAgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xuICAgIH1cblxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlJlcXVlc3QuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiT3BlbkRCUmVxdWVzdFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJPcGVuREJSZXF1ZXN0IDogSURCUmVxdWVzdCB7XHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmJsb2NrZWQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnVwZ3JhZGVuZWVkZWQ7XHJcbiAqIH07XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiUmVxdWVzdCkgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiT3BlbkRCUmVxdWVzdCAobWUpIHtcclxuICAgIGlkYlJlcXVlc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgLy8gTGxhbWFyIGFsIGNvbnN0cnVjdG9zIGRlbCBwYWRyZVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KGlkYlJlcXVlc3QpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEV2ZW50IGhhbmRsZXJzXHJcbiAgLmhhbmRsZXJFdmVudCgnJGJsb2NrZWQnLCAnb25ibG9ja2VkJylcclxuICAuaGFuZGxlckV2ZW50KCckdXBncmFkZW5lZWRlZCcsICdvbnVwZ3JhZGVuZWVkZWQnKVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJPcGVuREJSZXF1ZXN0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiT3BlbkRCUmVxdWVzdFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJPcGVuREJSZXF1ZXN0IDogSURCUmVxdWVzdCB7XHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmJsb2NrZWQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnVwZ3JhZGVuZWVkZWQ7XHJcbiAqIH07XHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiUmVxdWVzdCkge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiT3BlbkRCUmVxdWVzdChtZSkge1xuICAgIGlkYlJlcXVlc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgLy8gTGxhbWFyIGFsIGNvbnN0cnVjdG9zIGRlbCBwYWRyZVxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBIZXJlbmNpYVxuICAuaW5oZXJpdChpZGJSZXF1ZXN0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBFdmVudCBoYW5kbGVyc1xuICAuaGFuZGxlckV2ZW50KCckYmxvY2tlZCcsICdvbmJsb2NrZWQnKS5oYW5kbGVyRXZlbnQoJyR1cGdyYWRlbmVlZGVkJywgJ29udXBncmFkZW5lZWRlZCcpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiT3BlbkRCUmVxdWVzdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCRmFjdG9yeSB7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBvcGVuKERPTVN0cmluZyBuYW1lLCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGxvbmcgdmVyc2lvbik7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBkZWxldGVEYXRhYmFzZShET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgc2hvcnQgY21wKGFueSBmaXJzdCwgYW55IHNlY29uZCk7XHJcbiAqIH07XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkRhdGFiYXNlIDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgdW5zaWduZWQgbG9uZyBsb25nIHZlcnNpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgICAgICBvYmplY3RTdG9yZU5hbWVzO1xyXG4gKiBcclxuICogICBJREJUcmFuc2FjdGlvbiB0cmFuc2FjdGlvbigoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pIHN0b3JlTmFtZXMsIG9wdGlvbmFsIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlID0gXCJyZWFkb25seVwiKTtcclxuICogICB2b2lkICAgICAgICAgICBjbG9zZSgpO1xyXG4gKiAgIElEQk9iamVjdFN0b3JlIGNyZWF0ZU9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lLCBvcHRpb25hbCBJREJPYmplY3RTdG9yZVBhcmFtZXRlcnMgb3B0aW9ucyk7XHJcbiAqICAgdm9pZCAgICAgICAgICAgZGVsZXRlT2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYWJvcnQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmNsb3NlO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9udmVyc2lvbmNoYW5nZTtcclxuICogfTtcclxuICogXHJcbiAqIGRpY3Rpb25hcnkgSURCT2JqZWN0U3RvcmVQYXJhbWV0ZXJzIHtcclxuICogICAoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pPyBrZXlQYXRoID0gbnVsbDtcclxuICogICBib29sZWFuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvSW5jcmVtZW50ID0gZmFsc2U7XHJcbiAqIH07bWVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJFdmVudFRhcmdldCwgaWRiU3RvcmUsIGlkYk1vZGVsMiwgaWRiT3BlbkRCUmVxdWVzdCwgaWRiVHJhbnNhY3Rpb24sICRsb2cpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICAvLyBFbiBsYSBzaWd1aWVudGUgbGluZWEsIHB1ZWRlIGluY2x1aXIgcHJlZmlqb3MgZGUgaW1wbGVtZW50YWNpb24gcXVlIHF1aWVyYSBwcm9iYXIuXHJcbiAgY29uc3QgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xyXG4gIC8vIE5vIHVzZSBcImNvbnN0IGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cclxuICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcclxuICBjb25zdCBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XHJcbiAgY29uc3QgSURCS2V5UmFuZ2UgPSB3aW5kb3cuSURCS2V5UmFuZ2UgfHwgd2luZG93LndlYmtpdElEQktleVJhbmdlIHx8IHdpbmRvdy5tc0lEQktleVJhbmdlO1xyXG4gIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXHJcbiAgXHJcbiAgaWYgKCFpbmRleGVkREIpIHtcclxuICAgIGFsZXJ0KCdTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXMnKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcclxuICAvLyAkbWVcclxuICAvLyAkb3BlbmVkXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3IgIFxyXG4gIGNvbnN0IGlkYiA9IGZ1bmN0aW9uIGlkYihuYW1lLCB2ZXJzaW9uLCBzb2NrZXQpIHtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKVxyXG4gICAgICAuc3RhdGljKCckbmFtZScsIG5hbWUpXHJcbiAgICAgIC5zdGF0aWMoJyR2ZXJzaW9uJywgdmVyc2lvbilcclxuICAgICAgLnN0YXRpYygnJHNvY2tldCcsIHNvY2tldCk7XHJcblxyXG4gIH07XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoaWRiKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KGlkYkV2ZW50VGFyZ2V0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9waWVkYWRlc1xyXG4gIC5wcm9wZXJ0eSgnJF91cGdyYWRlbmVlZGVkcycsIHsgdmFsdWU6W10gfSlcclxuICAucHJvcGVydHkoJyRfbW9kZWxzJywgeyB2YWx1ZToge30gfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gR2V0dGVyc1xyXG4gIC5nZXR0ZXIoJyRvYmplY3RTdG9yZU5hbWVzJywgJ29iamVjdFN0b3JlTmFtZXMnKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gIC5oYW5kbGVyRXZlbnQoJyRhYm9ydGVkJywgJ29uYWJvcnQnKVxyXG4gIC5oYW5kbGVyRXZlbnQoJyRjbG9zZWQnLCAnb25jbG9zZScpXHJcbiAgLmhhbmRsZXJFdmVudCgnJGVycm9yJywgJ29uZXJyb3InKVxyXG4gIC5oYW5kbGVyRXZlbnQoJyR2ZXJzaW9uQ2hhbmdlZCcsICdvbnZlcnNpb25jaGFuZ2UnKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckb3BlbicsIGZ1bmN0aW9uIChuYW1lLCB2ZXJzaW9uKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJPcGVuREJSZXF1ZXN0KGluZGV4ZWREQi5vcGVuKG5hbWUsIHZlcnNpb24pKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGRyb3AnLCBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgXHJcbiAgICByZXR1cm4gbmV3IGlkYk9wZW5EQlJlcXVlc3QoaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKG5hbWUpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGNtcCcsIGZ1bmN0aW9uIChmaXJzdCwgc2Vjb25kKSB7XHJcbiAgICBcclxuICAgIHJldHVybiBpbmRleGVkREIuY21wKGZpcnN0LCBzZWNvbmQpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckdXBncmFkZW5lZWRlZCcsIGZ1bmN0aW9uIChjYikge1xyXG4gICAgXHJcbiAgICB0aGlzLiRfdXBncmFkZW5lZWRlZHMucHVzaChjYik7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGF1dG9taWdyYXRpb24nLCBmdW5jdGlvbiAoYWxsTWlncmF0aW9ucykge1xyXG5cclxuICAgIHJldHVybiB0aGlzLiR1cGdyYWRlbmVlZGVkKGZ1bmN0aW9uICh0aGl6LCBvcGVuUmVxdWVzdCwgZXZlbnQpIHtcclxuICAgICAgT2JqZWN0LmtleXMoYWxsTWlncmF0aW9ucykubWFwKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XHJcblxyXG4gICAgICAgIGlmIChldmVudC5vbGRWZXJzaW9uIDwgdmVyc2lvbiAmJiB2ZXJzaW9uIDw9IGV2ZW50Lm5ld1ZlcnNpb24pIHtcclxuXHJcbiAgICAgICAgICBjb25zdCBtaWdyYXRpb25zID0gQXJyYXkuaXNBcnJheShhbGxNaWdyYXRpb25zW3ZlcnNpb25dKT9cclxuICAgICAgICAgICAgYWxsTWlncmF0aW9uc1t2ZXJzaW9uXTpbYWxsTWlncmF0aW9uc1t2ZXJzaW9uXV07XHJcblxyXG4gICAgICAgICAgJGxvZy5sb2coJ21pZ3JhdGlvbiB2Jyt2ZXJzaW9uKycgc3RhcnRzJyk7XHJcbiAgICAgICAgICBtaWdyYXRpb25zLm1hcChmdW5jdGlvbiAobWlncmF0aW9uKSB7XHJcbiAgICAgICAgICAgIG1pZ3JhdGlvbih0aGl6LCBvcGVuUmVxdWVzdCwgZXZlbnQpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgJGxvZy5sb2coJ21pZ3JhdGlvbiB2Jyt2ZXJzaW9uKycgZW5kcycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRvcGVuJywgZnVuY3Rpb24gKGNiLCBjYkVycikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBsZXQgbGFzdFJxID0gbnVsbDtcclxuICAgIGxldCBsYXN0RXZlbnQgPSBudWxsO1xyXG5cclxuICAgIGlmICghdGhpei4kb3BlbmVkKSB7XHJcblxyXG4gICAgICB0aGl6LiRvcGVuZWQgPSAobGFzdFJxID0gaWRiLiRvcGVuKHRoaXouJG5hbWUsIHRoaXouJHZlcnNpb24pXHJcbiAgICAgICAgLiR1cGdyYWRlbmVlZGVkKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgdGhpei4kbWUgPSBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICAgICAgdGhpei4kX3VwZ3JhZGVuZWVkZWRzLm1hcChmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAgICAgY2IuYXBwbHkodGhpeiwgW3RoaXosIGxhc3RScSwgZXZlbnRdKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKVxyXG5cclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgICBsYXN0RXZlbnQgPSBldmVudDtcclxuICAgICAgICAgIGlmIChjYikgY2IodGhpeiwgbGFzdFJxLCBldmVudCk7XHJcbiAgICAgICAgICByZXR1cm4gdGhpejtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGxhc3RScSA9IG51bGw7XHJcbiAgICAgICAgICB0aGl6LiRvcGVuZWQgPSBudWxsO1xyXG4gICAgICAgICAgaWYgKGNiRXJyKSBjYkVycih0aGl6LCBsYXN0UnEsIGV2ZW50KTtcclxuICAgICAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0gZWxzZSBpZiAoY2IpIHtcclxuXHJcbiAgICAgIGNiKHRoaXosIGxhc3RScSwgbGFzdEV2ZW50KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJG9wZW5lZDtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGRyb3AnLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICB0aGl6LiRvcGVuZWQgPSBudWxsO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICBjb25zdCBycSA9IGlkYi4kZHJvcCh0aGl6LiRuYW1lKVxyXG4gICAgICAgIC4kc3VjY2VzcyhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlc29sdmUodGhpeilcclxuICAgICAgICB9KVxyXG4gICAgICAgIC4kZmFpbGVkKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgaWYgKGNiKSBjYihycSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRjbG9zZScsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB0aGlzLiRtZS5jbG9zZSgpO1xyXG4gICAgXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNyZWF0ZVN0b3JlJywgZnVuY3Rpb24gKG5hbWUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLmNyZWF0ZU9iamVjdFN0b3JlKG5hbWUsIG9wdGlvbnMpKTtcclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRkcm9wU3RvcmUnLCBmdW5jdGlvbiAobmFtZSkge1xyXG5cclxuICAgIHRoaXMuJG1lLmRlbGV0ZU9iamVjdFN0b3JlKG5hbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckbW9kZWwnLCBmdW5jdGlvbiAobmFtZSwgc29ja2V0KSB7XHJcblxyXG4gICAgLy8gU2kgZXhpc3RlIGVsIG1vZGVsbyByZXRvcm5hcmxvXHJcbiAgICBpZih0aGlzLiRfbW9kZWxzW25hbWVdKSByZXR1cm4gdGhpcy4kX21vZGVsc1tuYW1lXTtcclxuXHJcbiAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsbyB5IGd1YXJkYXJsb1xyXG4gICAgcmV0dXJuIHRoaXMuJF9tb2RlbHNbbmFtZV0gPSBpZGJNb2RlbDIodGhpcywgbmFtZSwgc29ja2V0IHx8IHRoaXMuJHNvY2tldCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyR0cmFuc2FjdGlvbicsIGZ1bmN0aW9uIChzdG9yZU5hbWVzLCBtb2RlKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpei4kb3BlbigpXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uICh0aGl6KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBpZGJUcmFuc2FjdGlvbih0aGl6LiRtZS50cmFuc2FjdGlvbihzdG9yZU5hbWVzLCBtb2RlKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRzdG9yZScsIGZ1bmN0aW9uIChzdG9yZU5hbWVzKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHN0b3JlTmFtZXMpKSBzdG9yZU5hbWVzID0gW3N0b3JlTmFtZXNdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFjdGlvbihtb2RlKSB7XHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpei4kdHJhbnNhY3Rpb24oc3RvcmVOYW1lcywgbW9kZSlcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh0eCkge1xyXG4gICAgICAgICAgICBjb25zdCBzdG9yZXNPYmogPSB7fTtcclxuICAgICAgICAgICAgY29uc3Qgc3RvcmVzID0gc3RvcmVOYW1lcy5tYXAoZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBzdG9yZXNPYmpbc3RvcmVOYW1lXSA9IHR4LiRzdG9yZShzdG9yZU5hbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGNiKSBjYi5hcHBseSh0aGl6LCBzdG9yZXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3RvcmVzT2JqO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgQ2xhenplcih7fSlcclxuICAgICAgLnN0YXRpYygnJHJlYWRlcicsIGFjdGlvbihpZGJUcmFuc2FjdGlvbi5UcmFuc2FjdGlvbk1vZGUuUmVhZE9ubHkpKVxyXG4gICAgICAuc3RhdGljKCckd3JpdGVyJywgYWN0aW9uKGlkYlRyYW5zYWN0aW9uLlRyYW5zYWN0aW9uTW9kZS5SZWFkV3JpdGUpKVxyXG4gICAgICAuY2xhenpcclxuXHJcbiAgfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkZhY3Rvcnkge1xyXG4gKiAgIElEQk9wZW5EQlJlcXVlc3Qgb3BlbihET01TdHJpbmcgbmFtZSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBsb25nIHZlcnNpb24pO1xyXG4gKiAgIElEQk9wZW5EQlJlcXVlc3QgZGVsZXRlRGF0YWJhc2UoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIHNob3J0IGNtcChhbnkgZmlyc3QsIGFueSBzZWNvbmQpO1xyXG4gKiB9O1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJEYXRhYmFzZSA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIHVuc2lnbmVkIGxvbmcgbG9uZyB2ZXJzaW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmdMaXN0ICAgICAgb2JqZWN0U3RvcmVOYW1lcztcclxuICogXHJcbiAqICAgSURCVHJhbnNhY3Rpb24gdHJhbnNhY3Rpb24oKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KSBzdG9yZU5hbWVzLCBvcHRpb25hbCBJREJUcmFuc2FjdGlvbk1vZGUgbW9kZSA9IFwicmVhZG9ubHlcIik7XHJcbiAqICAgdm9pZCAgICAgICAgICAgY2xvc2UoKTtcclxuICogICBJREJPYmplY3RTdG9yZSBjcmVhdGVPYmplY3RTdG9yZShET01TdHJpbmcgbmFtZSwgb3B0aW9uYWwgSURCT2JqZWN0U3RvcmVQYXJhbWV0ZXJzIG9wdGlvbnMpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGRlbGV0ZU9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lKTtcclxuICogXHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmFib3J0O1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25jbG9zZTtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uZXJyb3I7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnZlcnNpb25jaGFuZ2U7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBkaWN0aW9uYXJ5IElEQk9iamVjdFN0b3JlUGFyYW1ldGVycyB7XHJcbiAqICAgKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KT8ga2V5UGF0aCA9IG51bGw7XHJcbiAqICAgYm9vbGVhbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0luY3JlbWVudCA9IGZhbHNlO1xyXG4gKiB9O21lXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiRXZlbnRUYXJnZXQsIGlkYlN0b3JlLCBpZGJNb2RlbDIsIGlkYk9wZW5EQlJlcXVlc3QsIGlkYlRyYW5zYWN0aW9uLCAkbG9nKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxuXG4gIHZhciBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XG4gIC8vIE5vIHVzZSBcImNvbnN0IGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cbiAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XG4gIHZhciBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XG4gIHZhciBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XG4gIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXG5cbiAgaWYgKCFpbmRleGVkREIpIHtcbiAgICBhbGVydCgnU3UgbmF2ZWdhZG9yIG5vIHNvcG9ydGEgdW5hIHZlcnNpw7NuIGVzdGFibGUgZGUgaW5kZXhlZERCLiBUYWwgeSBjb21vIGxhcyBjYXJhY3RlcsOtc3RpY2FzIG5vIHNlcsOhbiB2YWxpZGFzJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXG4gIC8vICRtZVxuICAvLyAkb3BlbmVkXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yICBcbiAgdmFyIGlkYiA9IGZ1bmN0aW9uIGlkYihuYW1lLCB2ZXJzaW9uLCBzb2NrZXQpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG5hbWUnLCBuYW1lKS5zdGF0aWMoJyR2ZXJzaW9uJywgdmVyc2lvbikuc3RhdGljKCckc29ja2V0Jywgc29ja2V0KTtcbiAgfTtcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGlkYilcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoaWRiRXZlbnRUYXJnZXQpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFByb3BpZWRhZGVzXG4gIC5wcm9wZXJ0eSgnJF91cGdyYWRlbmVlZGVkcycsIHsgdmFsdWU6IFtdIH0pLnByb3BlcnR5KCckX21vZGVscycsIHsgdmFsdWU6IHt9IH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdldHRlcnNcbiAgLmdldHRlcignJG9iamVjdFN0b3JlTmFtZXMnLCAnb2JqZWN0U3RvcmVOYW1lcycpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGhhbmRsZXJzXG4gIC5oYW5kbGVyRXZlbnQoJyRhYm9ydGVkJywgJ29uYWJvcnQnKS5oYW5kbGVyRXZlbnQoJyRjbG9zZWQnLCAnb25jbG9zZScpLmhhbmRsZXJFdmVudCgnJGVycm9yJywgJ29uZXJyb3InKS5oYW5kbGVyRXZlbnQoJyR2ZXJzaW9uQ2hhbmdlZCcsICdvbnZlcnNpb25jaGFuZ2UnKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuc3RhdGljKCckb3BlbicsIGZ1bmN0aW9uIChuYW1lLCB2ZXJzaW9uKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYk9wZW5EQlJlcXVlc3QoaW5kZXhlZERCLm9wZW4obmFtZSwgdmVyc2lvbikpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuc3RhdGljKCckZHJvcCcsIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYk9wZW5EQlJlcXVlc3QoaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKG5hbWUpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLnN0YXRpYygnJGNtcCcsIGZ1bmN0aW9uIChmaXJzdCwgc2Vjb25kKSB7XG5cbiAgICByZXR1cm4gaW5kZXhlZERCLmNtcChmaXJzdCwgc2Vjb25kKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHVwZ3JhZGVuZWVkZWQnLCBmdW5jdGlvbiAoY2IpIHtcblxuICAgIHRoaXMuJF91cGdyYWRlbmVlZGVkcy5wdXNoKGNiKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGF1dG9taWdyYXRpb24nLCBmdW5jdGlvbiAoYWxsTWlncmF0aW9ucykge1xuXG4gICAgcmV0dXJuIHRoaXMuJHVwZ3JhZGVuZWVkZWQoZnVuY3Rpb24gKHRoaXosIG9wZW5SZXF1ZXN0LCBldmVudCkge1xuICAgICAgT2JqZWN0LmtleXMoYWxsTWlncmF0aW9ucykubWFwKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG5cbiAgICAgICAgaWYgKGV2ZW50Lm9sZFZlcnNpb24gPCB2ZXJzaW9uICYmIHZlcnNpb24gPD0gZXZlbnQubmV3VmVyc2lvbikge1xuXG4gICAgICAgICAgdmFyIG1pZ3JhdGlvbnMgPSBBcnJheS5pc0FycmF5KGFsbE1pZ3JhdGlvbnNbdmVyc2lvbl0pID8gYWxsTWlncmF0aW9uc1t2ZXJzaW9uXSA6IFthbGxNaWdyYXRpb25zW3ZlcnNpb25dXTtcblxuICAgICAgICAgICRsb2cubG9nKCdtaWdyYXRpb24gdicgKyB2ZXJzaW9uICsgJyBzdGFydHMnKTtcbiAgICAgICAgICBtaWdyYXRpb25zLm1hcChmdW5jdGlvbiAobWlncmF0aW9uKSB7XG4gICAgICAgICAgICBtaWdyYXRpb24odGhpeiwgb3BlblJlcXVlc3QsIGV2ZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkbG9nLmxvZygnbWlncmF0aW9uIHYnICsgdmVyc2lvbiArICcgZW5kcycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJG9wZW4nLCBmdW5jdGlvbiAoY2IsIGNiRXJyKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIGxhc3RScSA9IG51bGw7XG4gICAgdmFyIGxhc3RFdmVudCA9IG51bGw7XG5cbiAgICBpZiAoIXRoaXouJG9wZW5lZCkge1xuXG4gICAgICB0aGl6LiRvcGVuZWQgPSAobGFzdFJxID0gaWRiLiRvcGVuKHRoaXouJG5hbWUsIHRoaXouJHZlcnNpb24pLiR1cGdyYWRlbmVlZGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgIHRoaXouJF91cGdyYWRlbmVlZGVkcy5tYXAoZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgY2IuYXBwbHkodGhpeiwgW3RoaXosIGxhc3RScSwgZXZlbnRdKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdGhpei4kbWUgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICBsYXN0RXZlbnQgPSBldmVudDtcbiAgICAgICAgaWYgKGNiKSBjYih0aGl6LCBsYXN0UnEsIGV2ZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgbGFzdFJxID0gbnVsbDtcbiAgICAgICAgdGhpei4kb3BlbmVkID0gbnVsbDtcbiAgICAgICAgaWYgKGNiRXJyKSBjYkVycih0aGl6LCBsYXN0UnEsIGV2ZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGNiKSB7XG5cbiAgICAgIGNiKHRoaXosIGxhc3RScSwgbGFzdEV2ZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpei4kb3BlbmVkO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZHJvcCcsIGZ1bmN0aW9uIChjYikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICB0aGl6LiRvcGVuZWQgPSBudWxsO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgdmFyIHJxID0gaWRiLiRkcm9wKHRoaXouJG5hbWUpLiRzdWNjZXNzKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXNvbHZlKHRoaXopO1xuICAgICAgfSkuJGZhaWxlZChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgcmVqZWN0KGV2ZW50KTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGNiKSBjYihycSk7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjbG9zZScsIGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuJG1lLmNsb3NlKCk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjcmVhdGVTdG9yZScsIGZ1bmN0aW9uIChuYW1lLCBvcHRpb25zKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLmNyZWF0ZU9iamVjdFN0b3JlKG5hbWUsIG9wdGlvbnMpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGRyb3BTdG9yZScsIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICB0aGlzLiRtZS5kZWxldGVPYmplY3RTdG9yZShuYW1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJG1vZGVsJywgZnVuY3Rpb24gKG5hbWUsIHNvY2tldCkge1xuXG4gICAgLy8gU2kgZXhpc3RlIGVsIG1vZGVsbyByZXRvcm5hcmxvXG4gICAgaWYgKHRoaXMuJF9tb2RlbHNbbmFtZV0pIHJldHVybiB0aGlzLiRfbW9kZWxzW25hbWVdO1xuXG4gICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG8geSBndWFyZGFybG9cbiAgICByZXR1cm4gdGhpcy4kX21vZGVsc1tuYW1lXSA9IGlkYk1vZGVsMih0aGlzLCBuYW1lLCBzb2NrZXQgfHwgdGhpcy4kc29ja2V0KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHRyYW5zYWN0aW9uJywgZnVuY3Rpb24gKHN0b3JlTmFtZXMsIG1vZGUpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICByZXR1cm4gdGhpei4kb3BlbigpLnRoZW4oZnVuY3Rpb24gKHRoaXopIHtcbiAgICAgIHJldHVybiBuZXcgaWRiVHJhbnNhY3Rpb24odGhpei4kbWUudHJhbnNhY3Rpb24oc3RvcmVOYW1lcywgbW9kZSkpO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckc3RvcmUnLCBmdW5jdGlvbiAoc3RvcmVOYW1lcykge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoc3RvcmVOYW1lcykpIHN0b3JlTmFtZXMgPSBbc3RvcmVOYW1lc107XG5cbiAgICBmdW5jdGlvbiBhY3Rpb24obW9kZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjYikge1xuXG4gICAgICAgIHJldHVybiB0aGl6LiR0cmFuc2FjdGlvbihzdG9yZU5hbWVzLCBtb2RlKS50aGVuKGZ1bmN0aW9uICh0eCkge1xuICAgICAgICAgIHZhciBzdG9yZXNPYmogPSB7fTtcbiAgICAgICAgICB2YXIgc3RvcmVzID0gc3RvcmVOYW1lcy5tYXAoZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0b3Jlc09ialtzdG9yZU5hbWVdID0gdHguJHN0b3JlKHN0b3JlTmFtZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGNiKSBjYi5hcHBseSh0aGl6LCBzdG9yZXMpO1xuICAgICAgICAgIHJldHVybiBzdG9yZXNPYmo7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENsYXp6ZXIoe30pLnN0YXRpYygnJHJlYWRlcicsIGFjdGlvbihpZGJUcmFuc2FjdGlvbi5UcmFuc2FjdGlvbk1vZGUuUmVhZE9ubHkpKS5zdGF0aWMoJyR3cml0ZXInLCBhY3Rpb24oaWRiVHJhbnNhY3Rpb24uVHJhbnNhY3Rpb25Nb2RlLlJlYWRXcml0ZSkpLmNsYXp6O1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJTdG9yZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJPYmplY3RTdG9yZSB7XHJcbiAqICAgICAgICAgICAgYXR0cmlidXRlIERPTVN0cmluZyAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGFueSAgICAgICAgICAgIGtleVBhdGg7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgIGluZGV4TmFtZXM7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uIHRyYW5zYWN0aW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICBhdXRvSW5jcmVtZW50O1xyXG4gKiBcclxuICogICBJREJSZXF1ZXN0IHB1dChhbnkgdmFsdWUsIG9wdGlvbmFsIGFueSBrZXkpO1xyXG4gKiAgIElEQlJlcXVlc3QgYWRkKGFueSB2YWx1ZSwgb3B0aW9uYWwgYW55IGtleSk7XHJcbiAqICAgSURCUmVxdWVzdCBkZWxldGUoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGNsZWFyKCk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXQoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGdldEtleShhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0QWxsKG9wdGlvbmFsIGFueSBxdWVyeSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBjb3VudCk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGxLZXlzKG9wdGlvbmFsIGFueSBxdWVyeSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBjb3VudCk7XHJcbiAqICAgSURCUmVxdWVzdCBjb3VudChvcHRpb25hbCBhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3Qgb3BlbkN1cnNvcihvcHRpb25hbCBhbnkgcXVlcnksIG9wdGlvbmFsIElEQkN1cnNvckRpcmVjdGlvbiBkaXJlY3Rpb24gPSBcIm5leHRcIik7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuS2V5Q3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogICBJREJJbmRleCAgIGluZGV4KERPTVN0cmluZyBuYW1lKTtcclxuICogICBJREJJbmRleCAgIGNyZWF0ZUluZGV4KERPTVN0cmluZyBuYW1lLCAoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pIGtleVBhdGgsIG9wdGlvbmFsIElEQkluZGV4UGFyYW1ldGVycyBvcHRpb25zKTtcclxuICogICB2b2lkICAgICAgIGRlbGV0ZUluZGV4KERPTVN0cmluZyBpbmRleE5hbWUpO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZGljdGlvbmFyeSBJREJJbmRleFBhcmFtZXRlcnMge1xyXG4gKiAgIGJvb2xlYW4gdW5pcXVlID0gZmFsc2U7XHJcbiAqICAgYm9vbGVhbiBtdWx0aUVudHJ5ID0gZmFsc2U7XHJcbiAqIH07XHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJTdG9yZSAobWUpIHtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gR2V0dGVyc1xyXG4gIC5nZXR0ZXIoJyRuYW1lJywgJ25hbWUnKVxyXG4gIC5nZXR0ZXIoJyRrZXlQYXRoJywgJ2tleVBhdGgnKVxyXG4gIC5nZXR0ZXIoJyRpbmRleE5hbWVzJywgJ2luZGV4TmFtZXMnKVxyXG4gIC5nZXR0ZXIoJyR0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpXHJcbiAgLmdldHRlcignJGF1dG9JbmNyZW1lbnQnLCAnYXV0b0luY3JlbWVudCcpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRwdXQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5wdXQodmFsdWUsIGtleSkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckYWRkJywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuYWRkKHZhbHVlLCBrZXkpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGRlbGV0ZScsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5kZWxldGUocXVlcnkpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNsZWFyJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5jbGVhcigpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldCcsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXQocXVlcnkpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldEtleScsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRLZXkocXVlcnkpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldEFsbCcsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0QWxsKHF1ZXJ5LCBjb3VudCkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZ2V0QWxsS2V5cycsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0QWxsS2V5cyhxdWVyeSwgY291bnQpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNvdW50JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNvdW50KHF1ZXJ5KSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRvcGVuQ3Vyc29yJywgZnVuY3Rpb24gKHF1ZXJ5LCBkaXJlY3Rpb24pIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUub3BlbkN1cnNvcihxdWVyeSwgZGlyZWN0aW9uKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRvcGVuS2V5Q3Vyc29yJywgZnVuY3Rpb24gKHF1ZXJ5LCBkaXJlY3Rpb24pIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUub3BlbktleUN1cnNvcihxdWVyeSwgZGlyZWN0aW9uKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRpbmRleCcsIGZ1bmN0aW9uIChuYW1lKSB7XHJcblxyXG4gICAgdGhyb3cgJ2lkYlN0b3JlLm1ldGhvZC4kaW5kZXgnO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckY3JlYXRlSW5kZXgnLCBmdW5jdGlvbiAobmFtZSwga2V5UGF0aCwgb3B0aW9ucykge1xyXG5cclxuICAgIHRocm93ICdpZGJTdG9yZS5tZXRob2QuJGNyZWF0ZUluZGV4JztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGRlbGV0ZUluZGV4JywgZnVuY3Rpb24gKGluZGV4TmFtZSkge1xyXG5cclxuICAgIHRoaXMuJG1lLmRlbGV0ZUluZGV4KGluZGV4TmFtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJTdG9yZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYlN0b3JlXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQk9iamVjdFN0b3JlIHtcclxuICogICAgICAgICAgICBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAga2V5UGF0aDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgaW5kZXhOYW1lcztcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb24gdHJhbnNhY3Rpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGJvb2xlYW4gICAgICAgIGF1dG9JbmNyZW1lbnQ7XHJcbiAqIFxyXG4gKiAgIElEQlJlcXVlc3QgcHV0KGFueSB2YWx1ZSwgb3B0aW9uYWwgYW55IGtleSk7XHJcbiAqICAgSURCUmVxdWVzdCBhZGQoYW55IHZhbHVlLCBvcHRpb25hbCBhbnkga2V5KTtcclxuICogICBJREJSZXF1ZXN0IGRlbGV0ZShhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgY2xlYXIoKTtcclxuICogICBJREJSZXF1ZXN0IGdldChhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0S2V5KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGwob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbEtleXMob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGNvdW50KG9wdGlvbmFsIGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuQ3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5LZXlDdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiAgIElEQkluZGV4ICAgaW5kZXgoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIElEQkluZGV4ICAgY3JlYXRlSW5kZXgoRE9NU3RyaW5nIG5hbWUsIChET01TdHJpbmcgb3Igc2VxdWVuY2U8RE9NU3RyaW5nPikga2V5UGF0aCwgb3B0aW9uYWwgSURCSW5kZXhQYXJhbWV0ZXJzIG9wdGlvbnMpO1xyXG4gKiAgIHZvaWQgICAgICAgZGVsZXRlSW5kZXgoRE9NU3RyaW5nIGluZGV4TmFtZSk7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBkaWN0aW9uYXJ5IElEQkluZGV4UGFyYW1ldGVycyB7XHJcbiAqICAgYm9vbGVhbiB1bmlxdWUgPSBmYWxzZTtcclxuICogICBib29sZWFuIG11bHRpRW50cnkgPSBmYWxzZTtcclxuICogfTtcclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiUmVxdWVzdCkge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiU3RvcmUobWUpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRuYW1lJywgJ25hbWUnKS5nZXR0ZXIoJyRrZXlQYXRoJywgJ2tleVBhdGgnKS5nZXR0ZXIoJyRpbmRleE5hbWVzJywgJ2luZGV4TmFtZXMnKS5nZXR0ZXIoJyR0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpLmdldHRlcignJGF1dG9JbmNyZW1lbnQnLCAnYXV0b0luY3JlbWVudCcpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRwdXQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLnB1dCh2YWx1ZSwga2V5KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRhZGQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmFkZCh2YWx1ZSwga2V5KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRkZWxldGUnLCBmdW5jdGlvbiAocXVlcnkpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5kZWxldGUocXVlcnkpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGNsZWFyJywgZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNsZWFyKCkpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZ2V0JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0KHF1ZXJ5KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRnZXRLZXknLCBmdW5jdGlvbiAocXVlcnkpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRLZXkocXVlcnkpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGdldEFsbCcsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRBbGwocXVlcnksIGNvdW50KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRnZXRBbGxLZXlzJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldEFsbEtleXMocXVlcnksIGNvdW50KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjb3VudCcsIGZ1bmN0aW9uIChxdWVyeSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNvdW50KHF1ZXJ5KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRvcGVuQ3Vyc29yJywgZnVuY3Rpb24gKHF1ZXJ5LCBkaXJlY3Rpb24pIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5vcGVuQ3Vyc29yKHF1ZXJ5LCBkaXJlY3Rpb24pKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJG9wZW5LZXlDdXJzb3InLCBmdW5jdGlvbiAocXVlcnksIGRpcmVjdGlvbikge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLm9wZW5LZXlDdXJzb3IocXVlcnksIGRpcmVjdGlvbikpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckaW5kZXgnLCBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgdGhyb3cgJ2lkYlN0b3JlLm1ldGhvZC4kaW5kZXgnO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckY3JlYXRlSW5kZXgnLCBmdW5jdGlvbiAobmFtZSwga2V5UGF0aCwgb3B0aW9ucykge1xuXG4gICAgdGhyb3cgJ2lkYlN0b3JlLm1ldGhvZC4kY3JlYXRlSW5kZXgnO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZGVsZXRlSW5kZXgnLCBmdW5jdGlvbiAoaW5kZXhOYW1lKSB7XG5cbiAgICB0aGlzLiRtZS5kZWxldGVJbmRleChpbmRleE5hbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlN0b3JlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYk1vZGVsXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYkV2ZW50VGFyZ2V0LCBsYlJlc291cmNlLCAkdGltZW91dCkgeyAnbmdJbmplY3QnO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQnVzY2FyIHVuIGNhbXBvXHJcbmNvbnN0IGRlZXBGaWVsZCA9IGZ1bmN0aW9uIChvYmosIGZpZWxkLCBjYikge1xyXG5cclxuICBjb25zdCBmaWVsZHMgPSBmaWVsZC5zcGxpdCgnLicpO1xyXG4gIGNvbnN0IGxhc3RGaWVsZCA9IGZpZWxkcy5wb3AoKTtcclxuXHJcbiAgcmV0dXJuIChmdW5jdGlvbiBfc2V0KG9iaikge1xyXG4gICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMClcclxuICAgICAgcmV0dXJuIGNiKG9iaiwgbGFzdEZpZWxkKTtcclxuICAgIGNvbnN0IGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XHJcbiAgICBpZiAodHlwZW9mIG9ialtmaWVsZF0gPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICBvYmpbZmllbGRdID0ge307XHJcbiAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcclxuICB9KShvYmopO1xyXG5cclxufTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xyXG5jb25zdCBnZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gKG9iaiwgZmllbGQpIHtcclxuICByZXR1cm4gZGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXHJcbmNvbnN0IHNldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgdmFsdWUpIHtcclxuICBkZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xyXG4gIH0pO1xyXG4gIHJldHVybiBvYmo7XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5yZXR1cm4gZnVuY3Rpb24gaWRiTW9kZWxGYWN0b3J5IChkYiwgbmFtZSwgc29ja2V0KSB7XHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcclxuICAvLyAkX3JlbW90ZVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGZ1bmN0aW9uIGlkYk1vZGVsKCkge1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihpZGJNb2RlbClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAuaW5oZXJpdChpZGJFdmVudFRhcmdldClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAvLyAuaW5oZXJpdChFdmVudFRhcmdldClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJvcGllZGFkZXMgc3RhdGljYXNcclxuICAuc3RhdGljKCckZGInLCBkYilcclxuICAuc3RhdGljKCckbmFtZScsIG5hbWUpXHJcbiAgLnN0YXRpYygnJHNvY2tldCcsIHNvY2tldClcclxuXHJcbiAgLnN0YXRpYygnJGlkJywgeyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OiB0cnVlIH0pXHJcbiAgLnN0YXRpYygnJGZpZWxkcycsIHtcclxuICAgIGlkOiB7XHJcbiAgICAgIGlkOiB0cnVlLFxyXG4gICAgICBuYW1lOiAnaWQnLFxyXG4gICAgICB0eXBlOiAnbnVtYmVyJ1xyXG4gICAgfVxyXG4gIH0pXHJcbiAgLnN0YXRpYygnJGluc3RhbmNlcycsIHt9KVxyXG4gICAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGdldEtleUZyb20nLCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsIHRoaXMuJGlkLmtleVBhdGgpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckY3JlYXRlU3RvcmUnLCBmdW5jdGlvbiAoY2IpIHtcclxuXHJcbiAgICBjb25zdCBzdG9yZSA9IHRoaXMuJGRiLiRjcmVhdGVTdG9yZSh0aGlzLiRuYW1lLCB0aGlzLiRpZCk7XHJcblxyXG4gICAgaWYgKGNiKSBjYih0aGlzLCBzdG9yZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyR3cml0ZXInLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJGRiLiRzdG9yZSh0aGl6LiRuYW1lKS4kd3JpdGVyKGNiKVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAoc3RvcmVzKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0b3Jlc1t0aGl6LiRuYW1lXVxyXG4gICAgICB9KVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckcmVhZGVyJywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIHJldHVybiB0aGl6LiRkYi4kc3RvcmUodGhpei4kbmFtZSkuJHJlYWRlcihjYilcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHN0b3Jlcykge1xyXG4gICAgICAgIHJldHVybiBzdG9yZXNbdGhpei4kbmFtZV1cclxuICAgICAgfSlcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJHB1dCcsIGZ1bmN0aW9uIChvYmosIGtleSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIFxyXG4gICAgY29uc3QgZGF0YSA9IHRoaXMuJGdldFZhbHVlcyhvYmopO1xyXG5cclxuICAgIHJldHVybiB0aGl6LiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gICAgICByZXR1cm4gc3RvcmUuJHB1dChkYXRhLCBrZXkpLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICBjb25zdCByZWNvcmQgPSB0aGl6LiRnZXRJbnN0YW5jZShldmVudC50YXJnZXQucmVzdWx0KTtcclxuICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XHJcbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRhZGQnLCBmdW5jdGlvbiAob2JqLCBrZXkpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBcclxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLiRnZXRWYWx1ZXMob2JqKTtcclxuXHJcbiAgICByZXR1cm4gdGhpei4kd3JpdGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRhZGQoZGF0YSwga2V5KS4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpei4kZ2V0SW5zdGFuY2UoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XHJcbiAgICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlY29yZDtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZGVsZXRlJywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcbiAgICBcclxuICAgIHRocm93ICdpZGJNb2RlbC5zdGF0aWMuJGRlbGV0ZSc7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRjbGVhcicsIGZ1bmN0aW9uICgpIHtcclxuICAgIFxyXG4gICAgdGhyb3cgJ2lkYk1vZGVsLnN0YXRpYy4kY2xlYXInO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0JywgZnVuY3Rpb24gKGtleSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBjb25zdCByZWNvcmQgPSB0aGlzLiRnZXRJbnN0YW5jZShrZXkpO1xyXG5cclxuICAgIHJlY29yZC4kcHJvbWlzZSA9IHRoaXouJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBzdG9yZS4kZ2V0KGtleSkuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XHJcbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlY29yZDtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGdldEtleScsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG4gICAgXHJcbiAgICB0aHJvdyAnaWRiTW9kZWwuc3RhdGljLiRnZXRLZXknO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0QWxsJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xyXG4gICAgXHJcbiAgICB0aHJvdyAnaWRiTW9kZWwuc3RhdGljLiRnZXRBbGwnO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0QWxsS2V5cycsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcclxuICAgIFxyXG4gICAgdGhyb3cgJ2lkYk1vZGVsLnN0YXRpYy4kZ2V0QWxsS2V5cyc7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRjb3VudCcsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG4gICAgXHJcbiAgICB0aHJvdyAnaWRiTW9kZWwuc3RhdGljLiRjb3VudCc7XHJcblxyXG4gIH0pXHJcblxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0SW5zdGFuY2UnLCBmdW5jdGlvbiAoa2V5KSB7XHJcblxyXG4gICAgLy8gRWwgb2JqZXRvIG5vIHRpZW5lIElEXHJcbiAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQgfHwga2V5ID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBuZXcgdGhpcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE5vIGV4aXN0ZSBsYSBpbnN0YW5jaWEgZW50b25jZSBzZSBjcmVhXHJcbiAgICBpZiAoIXRoaXMuJGluc3RhbmNlc1trZXldKXtcclxuICAgICAgdGhpcy4kaW5zdGFuY2VzW2tleV0gPSBuZXcgdGhpcygpO1xyXG4gICAgICB0aGlzLiRpbnN0YW5jZXNba2V5XS4kc2V0KHRoaXMuJGlkLmtleVBhdGgsIGtleSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzLiRpbnN0YW5jZXNba2V5XTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXNpZ25hIGxhIGVzcGVjaWZpY2FjacOzbiBkZSBsb3MgY2FtcG9zXHJcbiAgLnN0YXRpYygnJGZpZWxkJywgZnVuY3Rpb24gKG5hbWUsIGZpZWxkKSB7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgZmllbGQgPSB7IFwidHlwZVwiOiBmaWVsZCB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZpZWxkLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgIHRoaXMuJGZpZWxkc1tuYW1lXSA9IGZpZWxkO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBZ3JlZ2EgZWwgZWwgY2FtcG8gSUQgYXV0b21hdGljYW1lbnRlXHJcbiAgLnN0YXRpYygnJGtleScsIGZ1bmN0aW9uIChrZXksIGF1dG9JbmNyZW1lbnQsIHR5cGUpIHtcclxuICAgIGlmKHR5cGVvZiBrZXkgPT09ICdib29sZWFuJykge1xyXG4gICAgICBhdXRvSW5jcmVtZW50ID0ga2V5O1xyXG4gICAgfVxyXG4gICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkIHx8IGtleSA9PT0gbnVsbCB8fCB0eXBlb2Yga2V5ID09PSAnYm9vbGVhbicpe1xyXG4gICAgICBrZXkgPSAnaWQnO1xyXG4gICAgfVxyXG4gICAgaWYodHlwZW9mIGF1dG9JbmNyZW1lbnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHR5cGUgPSBhdXRvSW5jcmVtZW50O1xyXG4gICAgICBhdXRvSW5jcmVtZW50ID0gbnVsbDtcclxuICAgIH1cclxuICAgIGlmIChhdXRvSW5jcmVtZW50ID09PSB1bmRlZmluZWQgfHwgYXV0b0luY3JlbWVudCA9PT0gbnVsbCl7XHJcbiAgICAgIGF1dG9JbmNyZW1lbnQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYodHlwZW9mIGF1dG9JbmNyZW1lbnQgPT09ICdib29sZWFuJyB8fCB0eXBlICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0eXBlID0gJ251bWJlcic7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy4kaWQua2V5UGF0aCA9IGtleTtcclxuICAgIHRoaXMuJGlkLmF1dG9JbmNyZW1lbnQgPSBhdXRvSW5jcmVtZW50O1xyXG5cclxuICAgIHJldHVybiB0aGlzLiRmaWVsZChrZXksIHtcclxuICAgICAgaWQ6IHRydWUsXHJcbiAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxyXG4gIC5zdGF0aWMoJyRnZXRWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICBcclxuICAgIGNvbnN0IHZhbHVlcyA9IHt9O1xyXG5cclxuICAgIE9iamVjdC5rZXlzKHRoaXMuJGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGdldEZpZWxkVmFsdWUoZGF0YSwgZmllbGQpO1xyXG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh2YWx1ZXMsIGZpZWxkLCB2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB2YWx1ZXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFncmVnYSBlbCBlbCBjYW1wbyBJRCBhdXRvbWF0aWNhbWVudGVcclxuICAuc3RhdGljKCckYnVpbGQnLCBmdW5jdGlvbiAoYnVpbGRDYWxsYmFjaykge1xyXG5cclxuICAgIGJ1aWxkQ2FsbGJhY2sodGhpcyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGlcclxuICAuc3RhdGljKCckcmVtb3RlJywgZnVuY3Rpb24gKHVybCwgYXJncywgYWN0aW9ucykge1xyXG5cclxuICAgIHRoaXMuJF9yZW1vdGUgPSBsYlJlc291cmNlKHVybCwgYXJncywgYWN0aW9ucyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJvcGllZGFkZXNcclxuICAucHJvcGVydHkoJyRfdmFsdWVzJywgeyB2YWx1ZTogbmV3IENsYXp6ZXIoe30pXHJcbiAgICAuc3RhdGljKCdsb2NhbCcsIHt9KVxyXG4gICAgLnN0YXRpYygncmVtb3RlJywge30pXHJcbiAgICAuY2xhenpcclxuICB9KVxyXG5cclxuICAucHJvcGVydHkoJyRfdmVyc2lvbnMnLCB7IHZhbHVlOiB7fSB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcclxuICAubWV0aG9kKCckZ2V0JywgZnVuY3Rpb24gKGZpZWxkKSB7XHJcblxyXG4gICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBc2lnbmEgaW4gdmFsb3IgYSB1biBjYW1wb1xyXG4gIC5tZXRob2QoJyRzZXQnLCBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XHJcblxyXG4gICAgcmV0dXJuIHNldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXHJcbiAgLm1ldGhvZCgnJGdldFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgcmV0dXJuIGlkYk1vZGVsLiRnZXRWYWx1ZXMoZGF0YSB8fCB0aGlzKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldExvY2FsVmFsdWVzJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kX3ZhbHVlcy5sb2NhbCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRnZXRSZW1vdGVWYWx1ZXMnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuJGdldFZhbHVlcyh0aGlzLiRfdmFsdWVzLnJlbW90ZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRzZXRWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgIHNldEZpZWxkVmFsdWUodGhpeiwgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGl6O1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc2V0TG9jYWxWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgIHNldEZpZWxkVmFsdWUodGhpei4kX3ZhbHVlcy5sb2NhbCwgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGl6O1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc2V0UmVtb3RlVmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJF92YWx1ZXMucmVtb3RlLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRrZXknLCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsIHRoaXMuJGlkLmtleVBhdGgpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBGdW5jaW9uIHF1ZSBoYWNlIGVzY3VjaGFycyBsb3MgbWVuc2FqZXMgZGVsIHNvY2tldCBwYXJhIGVsIG1vZGVsXHJcbiAgLm1ldGhvZCgnJGxpc3RlbicsIGZ1bmN0aW9uIChkYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgaWYgKCF0aGlzLiRzb2NrZXQpIHRocm93IG5ldyBFcnJvcignaWRiTW9kZWwuRG9lc05vdEhhdmVTb2NrZXRJbnN0YW5jZScpO1xyXG5cclxuICAgIC8vIENyZWFyIHVuYSBzdWJzY3JpcGNpb24gYWwgc29ja2V0IHBhcmEgY3VhbmRvIHNlIHJlY2liYW4gZGF0b3NcclxuICAgIC8vIHBhcmEgbGEgaW5zdGFuY2lhIGFjdHVhbFxyXG4gICAgdGhpcy4kc29ja2V0LnN1YnNjcmliZSh7XHJcbiAgICAgIG1vZGVsTmFtZTogaWRiTW9kZWwuJG5hbWUsXHJcbiAgICAgIGV2ZW50TmFtZTogJ3VwZGF0ZScsXHJcbiAgICAgIG1vZGVsSWQ6IHRoaXouJGtleSgpLFxyXG4gICAgfSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgIC8vIEEgcmVjaWJpciBkYXRvcyBkZWwgc29ja2V0IGFzaWduYXIgbG9zIHZhbG9yZXNcclxuICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIEVtaXRpciBldmVudG8gZGUgZGF0b3MgcmVjaWJpZG9yIHBhcmEgZWwgbW9kZWxvXHJcbiAgICAgICAgdGhpei4kc2V0UmVtb3RlVmFsdWVzKGRhdGEudmFsdWVzLCBkYXRhLnZlcnNpb24pO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn07fVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYk1vZGVsLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiTW9kZWxcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiRXZlbnRUYXJnZXQsIGxiUmVzb3VyY2UsICR0aW1lb3V0KSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQnVzY2FyIHVuIGNhbXBvXG5cbiAgdmFyIGRlZXBGaWVsZCA9IGZ1bmN0aW9uIGRlZXBGaWVsZChvYmosIGZpZWxkLCBjYikge1xuXG4gICAgdmFyIGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XG4gICAgdmFyIGxhc3RGaWVsZCA9IGZpZWxkcy5wb3AoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiBfc2V0KG9iaikge1xuICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMCkgcmV0dXJuIGNiKG9iaiwgbGFzdEZpZWxkKTtcbiAgICAgIHZhciBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xuICAgICAgaWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAndW5kZWZpbmVkJykgb2JqW2ZpZWxkXSA9IHt9O1xuICAgICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XG4gICAgfShvYmopO1xuICB9O1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xuICB2YXIgZ2V0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIGdldEZpZWxkVmFsdWUob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBkZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXG4gIHZhciBzZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gc2V0RmllbGRWYWx1ZShvYmosIGZpZWxkLCB2YWx1ZSkge1xuICAgIGRlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgIG9ialtsYXN0RmllbGRdID0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICByZXR1cm4gZnVuY3Rpb24gaWRiTW9kZWxGYWN0b3J5KGRiLCBuYW1lLCBzb2NrZXQpIHtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXG4gICAgLy8gJF9yZW1vdGVcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGZ1bmN0aW9uIGlkYk1vZGVsKCkge31cblxuICAgIHJldHVybiBuZXdcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBDb25zdHJ1Y3RvclxuICAgIENsYXp6ZXIoaWRiTW9kZWwpXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBIZXJlbmNpYVxuICAgIC5pbmhlcml0KGlkYkV2ZW50VGFyZ2V0KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSGVyZW5jaWFcbiAgICAvLyAuaW5oZXJpdChFdmVudFRhcmdldClcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFByb3BpZWRhZGVzIHN0YXRpY2FzXG4gICAgLnN0YXRpYygnJGRiJywgZGIpLnN0YXRpYygnJG5hbWUnLCBuYW1lKS5zdGF0aWMoJyRzb2NrZXQnLCBzb2NrZXQpLnN0YXRpYygnJGlkJywgeyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OiB0cnVlIH0pLnN0YXRpYygnJGZpZWxkcycsIHtcbiAgICAgIGlkOiB7XG4gICAgICAgIGlkOiB0cnVlLFxuICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgfVxuICAgIH0pLnN0YXRpYygnJGluc3RhbmNlcycsIHt9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGdldEtleUZyb20nLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZShkYXRhLCB0aGlzLiRpZC5rZXlQYXRoKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGNyZWF0ZVN0b3JlJywgZnVuY3Rpb24gKGNiKSB7XG5cbiAgICAgIHZhciBzdG9yZSA9IHRoaXMuJGRiLiRjcmVhdGVTdG9yZSh0aGlzLiRuYW1lLCB0aGlzLiRpZCk7XG5cbiAgICAgIGlmIChjYikgY2IodGhpcywgc3RvcmUpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJHdyaXRlcicsIGZ1bmN0aW9uIChjYikge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICByZXR1cm4gdGhpei4kZGIuJHN0b3JlKHRoaXouJG5hbWUpLiR3cml0ZXIoY2IpLnRoZW4oZnVuY3Rpb24gKHN0b3Jlcykge1xuICAgICAgICByZXR1cm4gc3RvcmVzW3RoaXouJG5hbWVdO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRyZWFkZXInLCBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgcmV0dXJuIHRoaXouJGRiLiRzdG9yZSh0aGl6LiRuYW1lKS4kcmVhZGVyKGNiKS50aGVuKGZ1bmN0aW9uIChzdG9yZXMpIHtcbiAgICAgICAgcmV0dXJuIHN0b3Jlc1t0aGl6LiRuYW1lXTtcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckcHV0JywgZnVuY3Rpb24gKG9iaiwga2V5KSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIHZhciBkYXRhID0gdGhpcy4kZ2V0VmFsdWVzKG9iaik7XG5cbiAgICAgIHJldHVybiB0aGl6LiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuJHB1dChkYXRhLCBrZXkpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IHRoaXouJGdldEluc3RhbmNlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XG4gICAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGFkZCcsIGZ1bmN0aW9uIChvYmosIGtleSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICB2YXIgZGF0YSA9IHRoaXMuJGdldFZhbHVlcyhvYmopO1xuXG4gICAgICByZXR1cm4gdGhpei4kd3JpdGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRhZGQoZGF0YSwga2V5KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHZhciByZWNvcmQgPSB0aGl6LiRnZXRJbnN0YW5jZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xuICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRkZWxldGUnLCBmdW5jdGlvbiAocXVlcnkpIHtcblxuICAgICAgdGhyb3cgJ2lkYk1vZGVsLnN0YXRpYy4kZGVsZXRlJztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGNsZWFyJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICB0aHJvdyAnaWRiTW9kZWwuc3RhdGljLiRjbGVhcic7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXQnLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIHZhciByZWNvcmQgPSB0aGlzLiRnZXRJbnN0YW5jZShrZXkpO1xuXG4gICAgICByZWNvcmQuJHByb21pc2UgPSB0aGl6LiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuJGdldChrZXkpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmVjb3JkLiRzZXRMb2NhbFZhbHVlcyhldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVjb3JkO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckZ2V0S2V5JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICAgIHRocm93ICdpZGJNb2RlbC5zdGF0aWMuJGdldEtleSc7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXRBbGwnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XG5cbiAgICAgIHRocm93ICdpZGJNb2RlbC5zdGF0aWMuJGdldEFsbCc7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXRBbGxLZXlzJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xuXG4gICAgICB0aHJvdyAnaWRiTW9kZWwuc3RhdGljLiRnZXRBbGxLZXlzJztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGNvdW50JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICAgIHRocm93ICdpZGJNb2RlbC5zdGF0aWMuJGNvdW50JztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGdldEluc3RhbmNlJywgZnVuY3Rpb24gKGtleSkge1xuXG4gICAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcbiAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCB8fCBrZXkgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIE5vIGV4aXN0ZSBsYSBpbnN0YW5jaWEgZW50b25jZSBzZSBjcmVhXG4gICAgICBpZiAoIXRoaXMuJGluc3RhbmNlc1trZXldKSB7XG4gICAgICAgIHRoaXMuJGluc3RhbmNlc1trZXldID0gbmV3IHRoaXMoKTtcbiAgICAgICAgdGhpcy4kaW5zdGFuY2VzW2tleV0uJHNldCh0aGlzLiRpZC5rZXlQYXRoLCBrZXkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy4kaW5zdGFuY2VzW2tleV07XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEFzaWduYSBsYSBlc3BlY2lmaWNhY2nDs24gZGUgbG9zIGNhbXBvc1xuICAgIC5zdGF0aWMoJyRmaWVsZCcsIGZ1bmN0aW9uIChuYW1lLCBmaWVsZCkge1xuXG4gICAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICBmaWVsZCA9IHsgXCJ0eXBlXCI6IGZpZWxkIH07XG4gICAgICB9XG5cbiAgICAgIGZpZWxkLm5hbWUgPSBuYW1lO1xuXG4gICAgICB0aGlzLiRmaWVsZHNbbmFtZV0gPSBmaWVsZDtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEFncmVnYSBlbCBlbCBjYW1wbyBJRCBhdXRvbWF0aWNhbWVudGVcbiAgICAuc3RhdGljKCcka2V5JywgZnVuY3Rpb24gKGtleSwgYXV0b0luY3JlbWVudCwgdHlwZSkge1xuICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdib29sZWFuJykge1xuICAgICAgICBhdXRvSW5jcmVtZW50ID0ga2V5O1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkIHx8IGtleSA9PT0gbnVsbCB8fCB0eXBlb2Yga2V5ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAga2V5ID0gJ2lkJztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgYXV0b0luY3JlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHlwZSA9IGF1dG9JbmNyZW1lbnQ7XG4gICAgICAgIGF1dG9JbmNyZW1lbnQgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKGF1dG9JbmNyZW1lbnQgPT09IHVuZGVmaW5lZCB8fCBhdXRvSW5jcmVtZW50ID09PSBudWxsKSB7XG4gICAgICAgIGF1dG9JbmNyZW1lbnQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBhdXRvSW5jcmVtZW50ID09PSAnYm9vbGVhbicgfHwgdHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHlwZSA9ICdudW1iZXInO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiRpZC5rZXlQYXRoID0ga2V5O1xuICAgICAgdGhpcy4kaWQuYXV0b0luY3JlbWVudCA9IGF1dG9JbmNyZW1lbnQ7XG5cbiAgICAgIHJldHVybiB0aGlzLiRmaWVsZChrZXksIHtcbiAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgIHR5cGU6IHR5cGVcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXG4gICAgLnN0YXRpYygnJGdldFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgIHZhciB2YWx1ZXMgPSB7fTtcblxuICAgICAgT2JqZWN0LmtleXModGhpcy4kZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGdldEZpZWxkVmFsdWUoZGF0YSwgZmllbGQpO1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNldEZpZWxkVmFsdWUodmFsdWVzLCBmaWVsZCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQWdyZWdhIGVsIGVsIGNhbXBvIElEIGF1dG9tYXRpY2FtZW50ZVxuICAgIC5zdGF0aWMoJyRidWlsZCcsIGZ1bmN0aW9uIChidWlsZENhbGxiYWNrKSB7XG5cbiAgICAgIGJ1aWxkQ2FsbGJhY2sodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGlcbiAgICAuc3RhdGljKCckcmVtb3RlJywgZnVuY3Rpb24gKHVybCwgYXJncywgYWN0aW9ucykge1xuXG4gICAgICB0aGlzLiRfcmVtb3RlID0gbGJSZXNvdXJjZSh1cmwsIGFyZ3MsIGFjdGlvbnMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFByb3BpZWRhZGVzXG4gICAgLnByb3BlcnR5KCckX3ZhbHVlcycsIHsgdmFsdWU6IG5ldyBDbGF6emVyKHt9KS5zdGF0aWMoJ2xvY2FsJywge30pLnN0YXRpYygncmVtb3RlJywge30pLmNsYXp6XG4gICAgfSkucHJvcGVydHkoJyRfdmVyc2lvbnMnLCB7IHZhbHVlOiB7fSB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxuICAgIC5tZXRob2QoJyRnZXQnLCBmdW5jdGlvbiAoZmllbGQpIHtcblxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBc2lnbmEgaW4gdmFsb3IgYSB1biBjYW1wb1xuICAgIC5tZXRob2QoJyRzZXQnLCBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XG5cbiAgICAgIHJldHVybiBzZXRGaWVsZFZhbHVlKHRoaXMsIGZpZWxkKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxuICAgIC5tZXRob2QoJyRnZXRWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICByZXR1cm4gaWRiTW9kZWwuJGdldFZhbHVlcyhkYXRhIHx8IHRoaXMpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCckZ2V0TG9jYWxWYWx1ZXMnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kX3ZhbHVlcy5sb2NhbCk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5tZXRob2QoJyRnZXRSZW1vdGVWYWx1ZXMnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kX3ZhbHVlcy5yZW1vdGUpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCckc2V0VmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXosIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5tZXRob2QoJyRzZXRMb2NhbFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRfdmFsdWVzLmxvY2FsLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCckc2V0UmVtb3RlVmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJF92YWx1ZXMucmVtb3RlLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCcka2V5JywgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUoZGF0YSwgdGhpcy4kaWQua2V5UGF0aCk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEZ1bmNpb24gcXVlIGhhY2UgZXNjdWNoYXJzIGxvcyBtZW5zYWplcyBkZWwgc29ja2V0IHBhcmEgZWwgbW9kZWxcbiAgICAubWV0aG9kKCckbGlzdGVuJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlmICghdGhpcy4kc29ja2V0KSB0aHJvdyBuZXcgRXJyb3IoJ2lkYk1vZGVsLkRvZXNOb3RIYXZlU29ja2V0SW5zdGFuY2UnKTtcblxuICAgICAgLy8gQ3JlYXIgdW5hIHN1YnNjcmlwY2lvbiBhbCBzb2NrZXQgcGFyYSBjdWFuZG8gc2UgcmVjaWJhbiBkYXRvc1xuICAgICAgLy8gcGFyYSBsYSBpbnN0YW5jaWEgYWN0dWFsXG4gICAgICB0aGlzLiRzb2NrZXQuc3Vic2NyaWJlKHtcbiAgICAgICAgbW9kZWxOYW1lOiBpZGJNb2RlbC4kbmFtZSxcbiAgICAgICAgZXZlbnROYW1lOiAndXBkYXRlJyxcbiAgICAgICAgbW9kZWxJZDogdGhpei4ka2V5KClcbiAgICAgIH0sIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgLy8gQSByZWNpYmlyIGRhdG9zIGRlbCBzb2NrZXQgYXNpZ25hciBsb3MgdmFsb3Jlc1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gRW1pdGlyIGV2ZW50byBkZSBkYXRvcyByZWNpYmlkb3IgcGFyYSBlbCBtb2RlbG9cbiAgICAgICAgICB0aGl6LiRzZXRSZW1vdGVWYWx1ZXMoZGF0YS52YWx1ZXMsIGRhdGEudmVyc2lvbik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5jbGF6ejtcbiAgfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiTW9kZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaW8sICRsb2cpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcclxuICAvLyAkc29ja2V0XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgY29uc3QgaWRiU29ja2V0ID0gZnVuY3Rpb24gaWRiU29ja2V0KHVybCwgJGFjY2Vzc1Rva2VuSWQsICRjdXJyZW50VXNlcklkKXtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKVxyXG4gICAgICAuc3RhdGljKCckdXJsJywgdXJsIHx8IGlkYlNvY2tldC4kZGVmVXJsU2VydmVyKVxyXG4gICAgICAuc3RhdGljKCckYWNjZXNzVG9rZW5JZCcsIGFjY2Vzc1Rva2VuSWQgfHwgaWRiU29ja2V0LiRkZWZBY2Nlc3NUb2tlbklkKVxyXG4gICAgICAuc3RhdGljKCckY3VycmVudFVzZXJJZCcsIGN1cnJlbnRVc2VySWQgfHwgaWRiU29ja2V0LiRkZWZDdXJyZW50VXNlcklkKTtcclxuXHJcbiAgICB0aGl6LiRjb25uZWN0KCk7XHJcblxyXG4gIH07XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoaWRiU29ja2V0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAucHJvcGVydHkoJyRfbGlzdGVuZXJzJywgeyB2YWx1ZTpbXSB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXHJcbiAgLm1ldGhvZCgnJGNvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8gQ3JlYXRpbmcgY29ubmVjdGlvbiB3aXRoIHNlcnZlclxyXG4gICAgY29uc3Qgc29ja2V0ID0gdGhpcy4kc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsKTtcclxuXHJcbiAgICAvLyBUaGlzIHBhcnQgaXMgb25seSBmb3IgbG9naW4gdXNlcnMgZm9yIGF1dGhlbnRpY2F0ZWQgJHNvY2tldCBjb25uZWN0aW9uIGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIuXHJcbiAgICAvLyBJZiB5b3UgYXJlIG5vdCB1c2luZyBsb2dpbiBwYWdlIGluIHlvdSB3ZWJzaXRlIHRoZW4geW91IHNob3VsZCByZW1vdmUgcmVzdCBwaWVjZSBvZiBjb2RlLi5cclxuICAgIHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICRsb2cubG9nKCdjb25uZWN0ZWQnKTtcclxuXHJcbiAgICAgIHNvY2tldC5lbWl0KCdhdXRoZW50aWNhdGlvbicsIHtcclxuICAgICAgICBpZDogdGhpcy4kYWNjZXNzVG9rZW5JZCxcclxuICAgICAgICB1c2VySWQ6IHRoaXMuJGN1cnJlbnRVc2VySWQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgc29ja2V0Lm9uKCdhdXRoZW50aWNhdGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gdXNlIHRoZSAkc29ja2V0IGFzIHVzdWFsXHJcbiAgICAgICAgJGxvZy5sb2coJ1VzZXIgaXMgYXV0aGVudGljYXRlZCcpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHN1YnNjcmliZScsIGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xyXG5cclxuICAgIGxldCBuYW1lID0gb3B0aW9ucy5tb2RlbE5hbWUgKyAnLicgKyBvcHRpb25zLmV2ZW50TmFtZTtcclxuXHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMubW9kZWxJZCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbmFtZSA9IG5hbWUgKyAnLicgKyBvcHRpb25zLm1vZGVsSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy4kc29ja2V0Lm9uKG5hbWUsIGNiKTtcclxuICAgIFxyXG4gICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxyXG4gICAgdGhpcy4kcHVzaExpc3RlbmVyKG5hbWUsIGNiKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHB1c2hMaXN0ZW5lcicsIGZ1bmN0aW9uIChuYW1lLCBjYikge1xyXG5cclxuICAgIHRoaXMuJF9saXN0ZW5lcnMucHVzaChuYW1lKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHVuc3Vic2NyaWJlJyxmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSkge1xyXG5cclxuICAgIHRoaXMuJHNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMoc3Vic2NyaXB0aW9uTmFtZSk7ICBcclxuICAgIHZhciBpZHggPSB0aGlzLiRfbGlzdGVuZXJzLmluZGV4T2Yoc3Vic2NyaXB0aW9uTmFtZSk7XHJcbiAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgdGhpcy4kX2xpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXNpZ25hIGxhIFVSTCBkZSBzZXJ2aWRvciBwb3IgZGVmZWN0b1xyXG4gIC5zdGF0aWMoJyRzZXRVcmxTZXJ2ZXInLCBmdW5jdGlvbiAodXJsKSB7XHJcblxyXG4gICAgdGhpcy4kZGVmVXJsU2VydmVyID0gdXJsO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXHJcbiAgLnN0YXRpYygnJHNldENyZWRlbnRpYWxzJywgZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIGN1cnJlbnRVc2VySWQpIHtcclxuXHJcbiAgICB0aGlzLiRkZWZBY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcclxuICAgIHRoaXMuJGRlZkN1cnJlbnRVc2VySWQgPSBjdXJyZW50VXNlcklkO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6elxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuJHNldFVybFNlcnZlcihudWxsKVxyXG4gIC4kc2V0Q3JlZGVudGlhbHMobnVsbCwgbnVsbCk7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiU29ja2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaW8sICRsb2cpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJHNvY2tldFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuXG4gIHZhciBpZGJTb2NrZXQgPSBmdW5jdGlvbiBpZGJTb2NrZXQodXJsLCAkYWNjZXNzVG9rZW5JZCwgJGN1cnJlbnRVc2VySWQpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJHVybCcsIHVybCB8fCBpZGJTb2NrZXQuJGRlZlVybFNlcnZlcikuc3RhdGljKCckYWNjZXNzVG9rZW5JZCcsIGFjY2Vzc1Rva2VuSWQgfHwgaWRiU29ja2V0LiRkZWZBY2Nlc3NUb2tlbklkKS5zdGF0aWMoJyRjdXJyZW50VXNlcklkJywgY3VycmVudFVzZXJJZCB8fCBpZGJTb2NrZXQuJGRlZkN1cnJlbnRVc2VySWQpO1xuXG4gICAgdGhpei4kY29ubmVjdCgpO1xuICB9O1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoaWRiU29ja2V0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAucHJvcGVydHkoJyRfbGlzdGVuZXJzJywgeyB2YWx1ZTogW10gfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uZWN0YXJzZSBhbCBzZXJ2aWRvclxuICAubWV0aG9kKCckY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcblxuICAgIC8vIENyZWF0aW5nIGNvbm5lY3Rpb24gd2l0aCBzZXJ2ZXJcbiAgICB2YXIgc29ja2V0ID0gdGhpcy4kc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsKTtcblxuICAgIC8vIFRoaXMgcGFydCBpcyBvbmx5IGZvciBsb2dpbiB1c2VycyBmb3IgYXV0aGVudGljYXRlZCAkc29ja2V0IGNvbm5lY3Rpb24gYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlci5cbiAgICAvLyBJZiB5b3UgYXJlIG5vdCB1c2luZyBsb2dpbiBwYWdlIGluIHlvdSB3ZWJzaXRlIHRoZW4geW91IHNob3VsZCByZW1vdmUgcmVzdCBwaWVjZSBvZiBjb2RlLi5cbiAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkbG9nLmxvZygnY29ubmVjdGVkJyk7XG5cbiAgICAgIHNvY2tldC5lbWl0KCdhdXRoZW50aWNhdGlvbicsIHtcbiAgICAgICAgaWQ6IHRoaXMuJGFjY2Vzc1Rva2VuSWQsXG4gICAgICAgIHVzZXJJZDogdGhpcy4kY3VycmVudFVzZXJJZFxuICAgICAgfSk7XG5cbiAgICAgIHNvY2tldC5vbignYXV0aGVudGljYXRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdXNlIHRoZSAkc29ja2V0IGFzIHVzdWFsXG4gICAgICAgICRsb2cubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckc3Vic2NyaWJlJywgZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XG5cbiAgICB2YXIgbmFtZSA9IG9wdGlvbnMubW9kZWxOYW1lICsgJy4nICsgb3B0aW9ucy5ldmVudE5hbWU7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMubW9kZWxJZCA9PT0gJ251bWJlcicpIHtcbiAgICAgIG5hbWUgPSBuYW1lICsgJy4nICsgb3B0aW9ucy5tb2RlbElkO1xuICAgIH1cblxuICAgIHRoaXMuJHNvY2tldC5vbihuYW1lLCBjYik7XG5cbiAgICAvL1B1c2ggdGhlIGNvbnRhaW5lci4uXG4gICAgdGhpcy4kcHVzaExpc3RlbmVyKG5hbWUsIGNiKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHB1c2hMaXN0ZW5lcicsIGZ1bmN0aW9uIChuYW1lLCBjYikge1xuXG4gICAgdGhpcy4kX2xpc3RlbmVycy5wdXNoKG5hbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckdW5zdWJzY3JpYmUnLCBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSkge1xuXG4gICAgdGhpcy4kc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTtcbiAgICB2YXIgaWR4ID0gdGhpcy4kX2xpc3RlbmVycy5pbmRleE9mKHN1YnNjcmlwdGlvbk5hbWUpO1xuICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgIHRoaXMuJF9saXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBc2lnbmEgbGEgVVJMIGRlIHNlcnZpZG9yIHBvciBkZWZlY3RvXG4gIC5zdGF0aWMoJyRzZXRVcmxTZXJ2ZXInLCBmdW5jdGlvbiAodXJsKSB7XG5cbiAgICB0aGlzLiRkZWZVcmxTZXJ2ZXIgPSB1cmw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXG4gIC5zdGF0aWMoJyRzZXRDcmVkZW50aWFscycsIGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XG5cbiAgICB0aGlzLiRkZWZBY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICB0aGlzLiRkZWZDdXJyZW50VXNlcklkID0gY3VycmVudFVzZXJJZDtcbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC4kc2V0VXJsU2VydmVyKG51bGwpLiRzZXRDcmVkZW50aWFscyhudWxsLCBudWxsKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiU29ja2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYlRyYW5zYWN0aW9uXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQlRyYW5zYWN0aW9uIDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmdMaXN0ICAgICAgb2JqZWN0U3RvcmVOYW1lcztcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb25Nb2RlIG1vZGU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQkRhdGFiYXNlICAgICAgICBkYjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NRXhjZXB0aW9uICAgICAgIGVycm9yO1xyXG4gKiBcclxuICogICBJREJPYmplY3RTdG9yZSBvYmplY3RTdG9yZShET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgdm9pZCAgICAgICAgICAgYWJvcnQoKTtcclxuICogXHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmFib3J0O1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25jb21wbGV0ZTtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uZXJyb3I7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBlbnVtIElEQlRyYW5zYWN0aW9uTW9kZSB7XHJcbiAqICAgXCJyZWFkb25seVwiLFxyXG4gKiAgIFwicmVhZHdyaXRlXCIsXHJcbiAqICAgXCJ2ZXJzaW9uY2hhbmdlXCJcclxuICogfTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJTdG9yZSkgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXHJcbiAgLy8gJF9wcm9taXNlXHJcbiAgXHJcbiAgY29uc3QgVHJhbnNhY3Rpb25Nb2RlID0gbmV3IENsYXp6ZXIoe30pXHJcbiAgICAgICAgLnN0YXRpYygnUmVhZE9ubHknLCAncmVhZG9ubHknKVxyXG4gICAgICAgIC5zdGF0aWMoJ1JlYWRXcml0ZScsICdyZWFkd3JpdGUnKVxyXG4gICAgICAgIC5zdGF0aWMoJ1ZlcnNpb25DaGFuZ2UnLCAgJ3ZlcnNpb25jaGFuZ2UnKTtcclxuXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJUcmFuc2FjdGlvbiAobWUpIHtcclxuICAgIFxyXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFN0YXRpY3NcclxuICAuc3RhdGljKCdUcmFuc2FjdGlvbk1vZGUnLCBUcmFuc2FjdGlvbk1vZGUuY2xhenopXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEdldHRlcnNcclxuICAuZ2V0dGVyKCckZGInLCAgICAgICAgICAnZGInKVxyXG4gIC5nZXR0ZXIoJyRtb2RlJywgICAgICAgICdtb2RlJylcclxuICAuZ2V0dGVyKCckZXJyb3InLCAgICAgICAnZXJyb3InKVxyXG4gIC5nZXR0ZXIoJyRzdG9yZU5hbWVzJywgICdvYmplY3RTdG9yZU5hbWVzJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRXZlbnQgaGFuZGxlcnNcclxuICAuaGFuZGxlckV2ZW50KCckYWJvcnRlZCcsICAgJ29uYWJvcnQnKVxyXG4gIC5oYW5kbGVyRXZlbnQoJyRjb21wbGV0ZWQnLCAnb25jb21wbGV0ZScpXHJcbiAgLmhhbmRsZXJFdmVudCgnJGZhaWxlZCcsICAgICdvbmVycm9yJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHN0b3JlJywgZnVuY3Rpb24obmFtZSl7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJTdG9yZSh0aGlzLiRtZS5vYmplY3RTdG9yZShuYW1lKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRhYm9ydCcsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgdGhpcy4kbWUuYWJvcnQoKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJvcGVydHlcclxuICAucHJvcGVydHkoJyRwcm9taXNlJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZiAodGhpei4kX3Byb21pc2UpIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcclxuXHJcbiAgICAgIC8vIENyZWFyIHByb21pc2UgcGFyYSBlbCByZXF1ZXN0XHJcbiAgICAgIHRoaXouJF9wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRoaXouJGNvbXBsZXRlZChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG5ldyBDbGF6emVyKHRoaXouJF9wcm9taXNlKS5zdGF0aWMoJyR0cmFuc2FjdGlvbicsIHRoaXopO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlRyYW5zYWN0aW9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiVHJhbnNhY3Rpb25cclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCVHJhbnNhY3Rpb24gOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgICAgICBvYmplY3RTdG9yZU5hbWVzO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbk1vZGUgbW9kZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCRGF0YWJhc2UgICAgICAgIGRiO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01FeGNlcHRpb24gICAgICAgZXJyb3I7XHJcbiAqIFxyXG4gKiAgIElEQk9iamVjdFN0b3JlIG9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lKTtcclxuICogICB2b2lkICAgICAgICAgICBhYm9ydCgpO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYWJvcnQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmNvbXBsZXRlO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogfTtcclxuICogXHJcbiAqIGVudW0gSURCVHJhbnNhY3Rpb25Nb2RlIHtcclxuICogICBcInJlYWRvbmx5XCIsXHJcbiAqICAgXCJyZWFkd3JpdGVcIixcclxuICogICBcInZlcnNpb25jaGFuZ2VcIlxyXG4gKiB9O1xyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlN0b3JlKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXG4gIC8vICRfcHJvbWlzZVxuXG4gIHZhciBUcmFuc2FjdGlvbk1vZGUgPSBuZXcgQ2xhenplcih7fSkuc3RhdGljKCdSZWFkT25seScsICdyZWFkb25seScpLnN0YXRpYygnUmVhZFdyaXRlJywgJ3JlYWR3cml0ZScpLnN0YXRpYygnVmVyc2lvbkNoYW5nZScsICd2ZXJzaW9uY2hhbmdlJyk7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJUcmFuc2FjdGlvbihtZSkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTdGF0aWNzXG4gIC5zdGF0aWMoJ1RyYW5zYWN0aW9uTW9kZScsIFRyYW5zYWN0aW9uTW9kZS5jbGF6eilcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR2V0dGVyc1xuICAuZ2V0dGVyKCckZGInLCAnZGInKS5nZXR0ZXIoJyRtb2RlJywgJ21vZGUnKS5nZXR0ZXIoJyRlcnJvcicsICdlcnJvcicpLmdldHRlcignJHN0b3JlTmFtZXMnLCAnb2JqZWN0U3RvcmVOYW1lcycpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGhhbmRsZXJzXG4gIC5oYW5kbGVyRXZlbnQoJyRhYm9ydGVkJywgJ29uYWJvcnQnKS5oYW5kbGVyRXZlbnQoJyRjb21wbGV0ZWQnLCAnb25jb21wbGV0ZScpLmhhbmRsZXJFdmVudCgnJGZhaWxlZCcsICdvbmVycm9yJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHN0b3JlJywgZnVuY3Rpb24gKG5hbWUpIHtcblxuICAgIHJldHVybiBuZXcgaWRiU3RvcmUodGhpcy4kbWUub2JqZWN0U3RvcmUobmFtZSkpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckYWJvcnQnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLiRtZS5hYm9ydCgpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQcm9wZXJ0eVxuICAucHJvcGVydHkoJyRwcm9taXNlJywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICBpZiAodGhpei4kX3Byb21pc2UpIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcblxuICAgICAgLy8gQ3JlYXIgcHJvbWlzZSBwYXJhIGVsIHJlcXVlc3RcbiAgICAgIHRoaXouJF9wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0aGl6LiRjb21wbGV0ZWQoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmVzb2x2ZShldmVudCk7XG4gICAgICAgIH0pLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmVqZWN0KGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgbmV3IENsYXp6ZXIodGhpei4kX3Byb21pc2UpLnN0YXRpYygnJHRyYW5zYWN0aW9uJywgdGhpeik7XG5cbiAgICAgIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcbiAgICB9XG5cbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJUcmFuc2FjdGlvbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxiIChtb2R1bGUpIHtcclxuXHJcbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcclxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xyXG4gICAgY29uc3QgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xyXG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGxldCB1cmxCYXNlSG9zdCA9IGxvY2F0aW9uLmhvc3Q7XHJcblxyXG4gIGNvbnN0IGxiQXV0aCA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnXHJcbiAgICBjb25zdCBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcclxuICAgIGNvbnN0IHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcclxuICAgIFxyXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcclxuICAgIC8vIFdlIGFyZSB1c2luZyBlbXB0eSBzdHJpbmcgYXMgYSBtYXJrZXIgZm9yIG51bGwvdW5kZWZpbmVkIHZhbHVlcy5cclxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XHJcbiAgICAgICAgc3RvcmFnZVtrZXldID0gdmFsdWU7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZChuYW1lKSB7XHJcbiAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVtrZXldIHx8IHNlc3Npb25TdG9yYWdlW2tleV0gfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsYkF1dGgoKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpeltuYW1lXSA9IGxvYWQobmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBjb25zdCBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbihhY2Nlc3NUb2tlbklkLCB1c2VySWQsIHVzZXJEYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc2Vzc2lvblN0b3JhZ2UsIG5hbWUsIG51bGwpO1xyXG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XHJcblxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uKCRxLCBsYkF1dGgpIHsgJ25nSW5qZWN0JztcclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVxdWVzdDogZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xyXG4gICAgICAgIGNvbnN0IGhvc3QgPSBnZXRIb3N0KGNvbmZpZy51cmwpO1xyXG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XHJcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XHJcbiAgICAgICAgICBjb25maWcuaGVhZGVyc1thdXRoSGVhZGVyXSA9IGxiQXV0aC5hY2Nlc3NUb2tlbklkO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XHJcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxyXG4gICAgICAgICAgLy8gdGhlcmUgaXMgbm8gdXNlciBsb2dnZWQgaW5cclxuICAgICAgICAgIGNvbnN0IHJlcyA9IHtcclxuICAgICAgICAgICAgYm9keTogeyBlcnJvcjogeyBzdGF0dXM6IDQwMSB9fSxcclxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXHJcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbigpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnOyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcclxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nLFxyXG4gICAgfTtcclxuXHJcbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyIFRoZSBoZWFkZXIgbmFtZSB0byB1c2UsIGUuZy4gYFgtQWNjZXNzLVRva2VuYFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25maWd1cmUgdGhlIFJFU1QgdHJhbnNwb3J0IHRvIHVzZSBhIGRpZmZlcmVudCBoZWFkZXIgZm9yIHNlbmRpbmdcclxuICAgICAqIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi4gSXQgaXMgc2VudCBpbiB0aGUgYEF1dGhvcml6YXRpb25gIGhlYWRlclxyXG4gICAgICogYnkgZGVmYXVsdC5cclxuICAgICAqL1xyXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oaGVhZGVyKSB7XHJcbiAgICAgIG9wdGlvbnMuYXV0aEhlYWRlciA9IGhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBoZWFkZXIgbmFtZSB0aGF0IGlzIHVzZWQgZm9yIHNlbmRpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB1c2UsIGUuZy4gYC9hcGlgIG9yIGAvL2V4YW1wbGUuY29tL2FwaWAuXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENoYW5nZSB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIEJ5IGRlZmF1bHQsIHRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgb3B0aW9ucy51cmxCYXNlID0gdXJsO1xyXG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xyXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uKCRyZXNvdXJjZSkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xyXG4gICAgICAgICAgYWN0aW9uc1trZXldLnVybCA9IG9wdGlvbnMudXJsQmFzZSArIGFjdGlvbnNba2V5XS51cmw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcclxuXHJcbiAgICAgICAgLy8gQW5ndWxhciBhbHdheXMgY2FsbHMgUE9TVCBvbiAkc2F2ZSgpXHJcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXHJcbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xyXG4gICAgICAgIHJlc291cmNlLnByb3RvdHlwZS4kc2F2ZSA9IGZ1bmN0aW9uKHN1Y2Nlc3MsIGVycm9yKSB7XHJcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxyXG4gICAgICAgICAgLy8gdGhhdCBleGFjdGx5IGZpdHMgb3VyIG5lZWRzLlxyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcclxuICAgICAgICAgIHJldHVybiByZXN1bHQuJHByb21pc2UgfHwgcmVzdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XHJcbiAgICAgIH07XHJcbiAgICBcclxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kdWxlXHJcbiAgICAuZmFjdG9yeSgnbGJBdXRoJywgbGJBdXRoKVxyXG4gICAgLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSlcclxuICAgIC5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpXHJcbiAgICAuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uKCRodHRwUHJvdmlkZXIpIHsgJ25nSW5qZWN0JztcclxuICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XHJcbiAgICB9XSk7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvbGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBsYjtcbmZ1bmN0aW9uIGxiKG1vZHVsZSkge1xuXG4gIC8vIER2dWVsdmUgZWwgaG9zdCBkZSB1bmEgVVJMXG4gIGZ1bmN0aW9uIGdldEhvc3QodXJsKSB7XG4gICAgdmFyIG0gPSB1cmwubWF0Y2goL14oPzpodHRwcz86KT9cXC9cXC8oW15cXC9dKykvKTtcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBudWxsO1xuICB9XG5cbiAgdmFyIHVybEJhc2VIb3N0ID0gbG9jYXRpb24uaG9zdDtcblxuICB2YXIgbGJBdXRoID0gZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB2YXIgcHJvcHMgPSBbJ2FjY2Vzc1Rva2VuSWQnLCAnY3VycmVudFVzZXJJZCcsICdyZW1lbWJlck1lJ107XG4gICAgdmFyIHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcblxuICAgIC8vIE5vdGU6IExvY2FsU3RvcmFnZSBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gc3RyaW5nXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9ICcnO1xuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2Fubm90IGFjY2VzcyBsb2NhbC9zZXNzaW9uIHN0b3JhZ2U6JywgZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGl6W25hbWVdID0gbG9hZChuYW1lKTtcbiAgICAgIH0pO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zZXRVc2VyID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IHVzZXJEYXRhO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyVXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzZXNzaW9uU3RvcmFnZSwgbmFtZSwgbnVsbCk7XG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IGxiQXV0aCgpO1xuICB9O1xuXG4gIHZhciBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbiBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IoJHEsIGxiQXV0aCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVxdWVzdDogZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xuICAgICAgICB2YXIgaG9zdCA9IGdldEhvc3QoY29uZmlnLnVybCk7XG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYkF1dGguYWNjZXNzVG9rZW5JZCkge1xuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzW2F1dGhIZWFkZXJdID0gbGJBdXRoLmFjY2Vzc1Rva2VuSWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XG4gICAgICAgICAgLy8gUmV0dXJuIGEgc3R1YiA0MDEgZXJyb3IgZm9yIFVzZXIuZ2V0Q3VycmVudCgpIHdoZW5cbiAgICAgICAgICAvLyB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpblxuICAgICAgICAgIHZhciByZXMgPSB7XG4gICAgICAgICAgICBib2R5OiB7IGVycm9yOiB7IHN0YXR1czogNDAxIH0gfSxcbiAgICAgICAgICAgIHN0YXR1czogNDAxLFxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbiBoZWFkZXJzKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKCkge1xuICAgICduZ0luamVjdCc7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcbiAgICAgIGF1dGhIZWFkZXI6ICdhdXRob3JpemF0aW9uJ1xuICAgIH07XG5cbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXIgVGhlIGhlYWRlciBuYW1lIHRvIHVzZSwgZS5nLiBgWC1BY2Nlc3MtVG9rZW5gXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENvbmZpZ3VyZSB0aGUgUkVTVCB0cmFuc3BvcnQgdG8gdXNlIGEgZGlmZmVyZW50IGhlYWRlciBmb3Igc2VuZGluZ1xyXG4gICAgICogdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLiBJdCBpcyBzZW50IGluIHRoZSBgQXV0aG9yaXphdGlvbmAgaGVhZGVyXHJcbiAgICAgKiBieSBkZWZhdWx0LlxyXG4gICAgICovXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKGhlYWRlcikge1xuICAgICAgb3B0aW9ucy5hdXRoSGVhZGVyID0gaGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIGhlYWRlciBuYW1lIHRoYXQgaXMgdXNlZCBmb3Igc2VuZGluZyB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uXHJcbiAgICAgKi9cbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHVzZSwgZS5nLiBgL2FwaWAgb3IgYC8vZXhhbXBsZS5jb20vYXBpYC5cclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ2hhbmdlIHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gQnkgZGVmYXVsdCwgdGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICBvcHRpb25zLnVybEJhc2UgPSB1cmw7XG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XG4gICAgfTtcblxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcbiAgICAgICduZ0luamVjdCc7XG5cbiAgICAgIHZhciBsYlJlc291cmNlID0gZnVuY3Rpb24gbGJSZXNvdXJjZSh1cmwsIHBhcmFtcywgYWN0aW9ucykge1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgYWN0aW9uc1trZXldLm9yaWdpbmFsVXJsID0gYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgICBhY3Rpb25zW2tleV0udXJsID0gb3B0aW9ucy51cmxCYXNlICsgYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcblxuICAgICAgICAvLyBBbmd1bGFyIGFsd2F5cyBjYWxscyBQT1NUIG9uICRzYXZlKClcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXG4gICAgICAgIC8vIGh0dHA6Ly9raXJrYnVzaGVsbC5tZS9hbmd1bGFyLWpzLXVzaW5nLW5nLXJlc291cmNlLWluLWEtbW9yZS1yZXN0ZnVsLW1hbm5lci9cbiAgICAgICAgcmVzb3VyY2UucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgLy8gRm9ydHVuYXRlbHksIExvb3BCYWNrIHByb3ZpZGVzIGEgY29udmVuaWVudCBgdXBzZXJ0YCBtZXRob2RcbiAgICAgICAgICAvLyB0aGF0IGV4YWN0bHkgZml0cyBvdXIgbmVlZHMuXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc291cmNlLnVwc2VydC5jYWxsKHRoaXMsIHt9LCB0aGlzLCBzdWNjZXNzLCBlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC4kcHJvbWlzZSB8fCByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXNvdXJjZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBsYlJlc291cmNlO1xuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIG1vZHVsZS5mYWN0b3J5KCdsYkF1dGgnLCBsYkF1dGgpLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSkuZmFjdG9yeSgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJywgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yKS5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XG4gIH1dKTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9sYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJFdmVudFRhcmdldFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyKSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJFdmVudFRhcmdldCAoKSB7fSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9waWVkYWRlc1xyXG4gIC5wcm9wZXJ0eSgnJF9saXN0ZW5lcnMnLCB7IHZhbHVlOiBbXSB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIG1ldGhvZFxyXG4gIC5tZXRob2QoJyRiaW5kJywgZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICBpZighKHR5cGUgaW4gdGhpcy4kX2xpc3RlbmVycykpIHtcclxuICAgICAgdGhpcy4kX2xpc3RlbmVyc1t0eXBlXSA9IFtdO1xyXG4gICAgfVxyXG4gICAgdGhpcy4kX2xpc3RlbmVyc1t0eXBlXS5wdXNoKGNhbGxiYWNrKTtcclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIG1ldGhvZFxyXG4gIC5tZXRob2QoJyR1bmJpbmQgJywgZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICBpZighKHR5cGUgaW4gdGhpcy4kX2xpc3RlbmVycykpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIHN0YWNrID0gdGhpcy4kX2xpc3RlbmVyc1t0eXBlXTtcclxuICAgIGZvcih2YXIgaSA9IDAsIGwgPSBzdGFjay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgaWYoc3RhY2tbaV0gPT09IGNhbGxiYWNrKXtcclxuICAgICAgICBzdGFjay5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJHVuYmluZCh0eXBlLCBjYWxsYmFjayk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIG1ldGhvZFxyXG4gIC5tZXRob2QoJyRlbWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZighKGV2ZW50LnR5cGUgaW4gdGhpcy4kX2xpc3RlbmVycykpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIHN0YWNrID0gdGhpcy4kX2xpc3RlbmVyc1tldmVudC50eXBlXTtcclxuICAgIGZvcih2YXIgaSA9IDAsIGwgPSBzdGFjay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBzdGFja1tpXS5jYWxsKHRoaXMsIGV2ZW50KTtcclxuICAgIH1cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiRXZlbnRUYXJnZXQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJFdmVudFRhcmdldFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyKSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJFdmVudFRhcmdldCgpIHt9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQcm9waWVkYWRlc1xuICAucHJvcGVydHkoJyRfbGlzdGVuZXJzJywgeyB2YWx1ZTogW10gfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gbWV0aG9kXG4gIC5tZXRob2QoJyRiaW5kJywgZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSkge1xuICAgICAgdGhpcy4kX2xpc3RlbmVyc1t0eXBlXSA9IFtdO1xuICAgIH1cbiAgICB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdLnB1c2goY2FsbGJhY2spO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBtZXRob2RcbiAgLm1ldGhvZCgnJHVuYmluZCAnLCBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoISh0eXBlIGluIHRoaXMuJF9saXN0ZW5lcnMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBzdGFjayA9IHRoaXMuJF9saXN0ZW5lcnNbdHlwZV07XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdGFjay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChzdGFja1tpXSA9PT0gY2FsbGJhY2spIHtcbiAgICAgICAgc3RhY2suc3BsaWNlKGksIDEpO1xuICAgICAgICByZXR1cm4gdGhpcy4kdW5iaW5kKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIG1ldGhvZFxuICAubWV0aG9kKCckZW1pdCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmICghKGV2ZW50LnR5cGUgaW4gdGhpcy4kX2xpc3RlbmVycykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHN0YWNrID0gdGhpcy4kX2xpc3RlbmVyc1tldmVudC50eXBlXTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHN0YWNrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgc3RhY2tbaV0uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfVxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYkV2ZW50VGFyZ2V0LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==