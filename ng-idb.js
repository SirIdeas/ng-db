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
	    if (this.$_models[name]) return this.$_models[name];
	
	    // Instanciar el modelo y guardarlo
	    return this.$_models[name] = idbModel2(this, name, socket || this.$socket);
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
	            resolve(storesObj);
	          }).catch(function (event) {
	            reject(event);
	          });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTM4YjMxYjFiNWZiNjBmMzlkZjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiVXRpbHMuanM/MWJiNCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJFdmVudHMuanM/NDg2YSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3FzLmpzPzY0MzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzP2QxYTEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiLmpzPzYzNTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qcz9mOWY5Iiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanM/Zjc3YSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvbGIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2xiLmpzPzMwMDYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pbmRleC5qcz8wZjYyIiwid2VicGFjazovLy8uL3NyYy92MS9DbGF6emVyLmpzIiwid2VicGFjazovLy8uL3NyYy92MS9DbGF6emVyLmpzPzFmY2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlJlcXVlc3QuanM/MmNiYSIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiT3BlbkRCUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiT3BlbkRCUmVxdWVzdC5qcz9hOGRkIiwid2VicGFjazovLy8uL3NyYy92MS9pZGIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYi5qcz8xYzFiIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJTdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiU3RvcmUuanM/ZWE1NyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYk1vZGVsLmpzPzdjMWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiU29ja2V0LmpzPzE0ZjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlRyYW5zYWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJUcmFuc2FjdGlvbi5qcz8zMGMzIiwid2VicGFjazovLy8uL3NyYy92MS9sYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvbGIuanM/Y2Y1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiRXZlbnRUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYkV2ZW50VGFyZ2V0LmpzPzYzN2UiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsInNlcnZpY2UiLCJpZGJVdGlscyIsIiRxIiwidmFsaWRhdG9ycyIsImNhbGxiYWNrIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJhcnJheSIsIkFycmF5IiwiaXNBcnJheSIsInZhbGlkIiwidHlwZXMiLCJpIiwidHlwZSIsImFyZ3MiLCJ2YWxpZGF0ZSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImVyciIsIkVycm9yIiwibmFtZSIsImlkYkV2ZW50cyIsIkRCX0VSUk9SIiwiTU9ERUxfSU5TVEFOQ0VEIiwiTU9ERUxfUkVQTEFDRSIsIk1PREVMX1FVRVJJRUQiLCJNT0RFTF9VTlFVRVJJRUQiLCJxcyIsInFzQ2xhc3MiLCJjYiIsInRoaXoiLCJ0aGVucyIsInRoZW5zUmVhZHkiLCJjYXRjaHMiLCJjYXRjaHNSZWFkeSIsInJlc3VsdEFyZ3MiLCJlcnJvciIsInByb21pc2UiLCIkcmVzb2x2ZWQiLCJ0aGVuc1Jlc29sdmVkIiwibGVuZ3RoIiwic2hpZnQiLCJhcHBseSIsInB1c2giLCJjYXRjaHNSZXNvbHZlZCIsInJlc29sdmUiLCJhcmd1bWVudHMiLCJyZWplY3QiLCJ0aGVuIiwiY2F0Y2giLCJkb25lIiwiY29uY2F0IiwiZGVmZXIiLCJhbGwiLCJhcnIiLCJkZWZlcmVkIiwicHJvbWlzZXMiLCJrZXlzIiwiT2JqZWN0IiwicmVzdWx0cyIsIm1hcCIsImlkeCIsInJlc3VsdCIsImlkYlNvY2tldFNlcnZpY2UiLCIkbG9nIiwiaW8iLCIkZGVmVXJsU2VydmVyIiwiaWRiU29ja2V0IiwiJHVybFNlcnZlciIsIiRhY2Nlc3NUb2tlbklkIiwiJGN1cnJlbnRVc2VySWQiLCIkbGlzdGVuZXJzIiwiJHNvY2tldCIsImNvbm5lY3QiLCJvbiIsImxvZyIsImVtaXQiLCJpZCIsInVzZXJJZCIsInN1YnNjcmliZSIsIm9wdGlvbnMiLCJtb2RlbE5hbWUiLCJldmVudE5hbWUiLCJtb2RlbElkIiwicHVzaExpc3RlbmVyIiwic3Vic2NyaXB0aW9uTmFtZSIsInVuc3Vic2NyaWJlIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwiaW5kZXhPZiIsInNwbGljZSIsInNldFVybFNlcnZlciIsInVybFNlcnZlciIsInNldENyZWRlbnRpYWxzIiwiYWNjZXNzVG9rZW5JZCIsImN1cnJlbnRVc2VySWQiLCJpZGJTZXJ2aWNlIiwiaWRiTW9kZWwiLCJpbmRleGVkREIiLCJ3aW5kb3ciLCJtb3pJbmRleGVkREIiLCJ3ZWJraXRJbmRleGVkREIiLCJtc0luZGV4ZWREQiIsIklEQlRyYW5zYWN0aW9uIiwid2Via2l0SURCVHJhbnNhY3Rpb24iLCJtc0lEQlRyYW5zYWN0aW9uIiwiSURCS2V5UmFuZ2UiLCJ3ZWJraXRJREJLZXlSYW5nZSIsIm1zSURCS2V5UmFuZ2UiLCJhbGVydCIsImlkYiIsIiRkYk5hbWUiLCIkZGJWZXJzaW9uIiwiJGV2ZW50c0NhbGxiYWNrcyIsIiR1cGdyYWRlTmVlZGVkRGVmZXJlZCIsIiRvcGVuRGVmZXJlZCIsIiRzb2NrZXRDb25uZWN0ZWREZWZlcmVkIiwiJG9wZW5lZCIsIiRyZXF1ZXN0IiwibW9kZWxzIiwiYmluZCIsInVuYmluZCIsInRyaWdnZXIiLCJvcGVuIiwicmVhZHkiLCJycSIsIm9udXBncmFkZW5lZWRlZCIsImV2ZW50Iiwib25zdWNjZXNzIiwib25lcnJvciIsInRhcmdldCIsImVycm9yQ29kZSIsImRlbGV0ZURhdGFiYXNlIiwibW9kZWwiLCJzb2NrZXQiLCJjcmVhdGVTdG9yZSIsImNyZWF0ZU9iamVjdFN0b3JlIiwiY3JlYXRlSW5kZXgiLCJpbmRleE5hbWUiLCJmaWVsZE5hbWUiLCJvcHRzIiwidHJhbnNhY3Rpb24iLCJvYmplY3RTdG9yZSIsInBlcm1zIiwiYWN0aW9uIiwidHgiLCJvbmNvbXBsZXRlIiwib25hYm9ydCIsImdldCIsImtleSIsInB1dCIsInZhbHVlcyIsImRlbGV0ZSIsIm9wZW5DdXJzb3IiLCJmaWx0ZXJzIiwiZWFjaENiIiwiY3Vyc29yIiwiY29udGludWUiLCJkZWZlcmVkcyIsIm9uT3BlbiIsIm9uVXBncmFkZU5lZWRlZCIsIm9uU29ja2V0Q29ubmVjdGVkIiwidGV4dCIsImlkYk1vZGVsU2VydmljZSIsImlkYlF1ZXJ5IiwibGJSZXNvdXJjZSIsIiR0aW1lb3V0Iiwic2VhcmNoRGVlcEZpZWxkIiwib2JqIiwiZmllbGQiLCJmaWVsZHMiLCJzcGxpdCIsImxhc3RGaWVsZCIsInBvcCIsIl9zZXQiLCJnZXRGaWVsZFZhbHVlIiwic2V0RmllbGRWYWx1ZSIsIiRkYiIsIiRtb2RlbE5hbWUiLCIkaWQiLCJrZXlQYXRoIiwiYXV0b0luY3JlbWVudCIsIiRldmVudHNIYW5kbGVycyIsIiRpbnN0YW5jZXMiLCIkZmllbGRzIiwiJHJlbW90ZSIsIiR2ZXJzaW9uaW5nIiwiTW9kZWwiLCJkYXRhIiwiJGxvYWRlZCIsIiRsb2NhbExvYWRlZCIsIiRyZW1vdGVMb2FkZWQiLCIkbG9jYWxWYWx1ZXMiLCIkcmVtb3RlVmFsdWVzIiwiJHZlcnNpb24iLCIkbG9jYWxWZXJzaW9uIiwiJHJlbW90ZVZlcnNpb24iLCIkc2V0VmFsdWVzIiwiJGNvbnN0cnVjdG9yIiwiJGxpc3RlbiIsIiRyZXN1bHRzIiwiJGJpbmQiLCIkZW1pdCIsImdldE1vZGVsTmFtZSIsImluZGV4IiwiYnVpbGQiLCJidWlsZENhbGxiYWNrIiwicmVtb3RlIiwidXJsIiwiYWN0aW9ucyIsImdldFJlbW90ZSIsImdldEtleUZyb20iLCJnZXRJbnN0YW5jZSIsImluc3RhbmNlIiwiJHByb21pc2UiLCJnZXRWZXJzaW9uT2YiLCJ2ZXJzaW9uIiwiJHNldExvY2FsVmFsdWVzIiwiaGFzaCIsImZpbmQiLCJjcmVhdGUiLCJyZWNvcmQiLCIkcHVsbCIsIml0ZXJhdGlvbiIsInZlcnNpb25pbmciLCJoYW5kbGVyIiwiJGdldCIsIiRzZXQiLCIkZ2V0VmFsdWVzIiwiJGdldExvY2FsVmFsdWVzIiwiJGdldFJlbW90ZVZhbHVlcyIsIiRzZXRSZW1vdGVWYWx1ZXMiLCIkc2V0S2V5IiwibmV3S2V5Iiwib2xkS2V5IiwibmV3VmFsdWVzIiwib2xkVmFsdWVzIiwiY29uc29sZSIsIiRNb2RlbCIsIiRmaWx0ZXJzIiwiJHJlc3VsdCIsImdldFJlc3VsdCIsIm5leHQiLCJnZXRSZW1vdGVSZXN1bHQiLCIkcmVtb3RlUmVzdWx0IiwiJHJlY29yZCIsImxiIiwiZ2V0SG9zdCIsIm0iLCJtYXRjaCIsInVybEJhc2VIb3N0IiwibG9jYXRpb24iLCJob3N0IiwibGJBdXRoIiwicHJvcHMiLCJwcm9wc1ByZWZpeCIsInNhdmUiLCJzdG9yYWdlIiwibG9hZCIsImxvY2FsU3RvcmFnZSIsInNlc3Npb25TdG9yYWdlIiwiZm9yRWFjaCIsImN1cnJlbnRVc2VyRGF0YSIsInJlbWVtYmVyTWUiLCJzZXRVc2VyIiwidXNlckRhdGEiLCJjbGVhclVzZXIiLCJjbGVhclN0b3JhZ2UiLCJsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IiLCJyZXF1ZXN0IiwiY29uZmlnIiwiaGVhZGVycyIsImF1dGhIZWFkZXIiLCJfX2lzR2V0Q3VycmVudFVzZXJfXyIsInJlcyIsImJvZHkiLCJzdGF0dXMiLCJ3aGVuIiwidXJsQmFzZSIsInNldEF1dGhIZWFkZXIiLCJoZWFkZXIiLCJnZXRBdXRoSGVhZGVyIiwic2V0VXJsQmFzZSIsImdldFVybEJhc2UiLCIkcmVzb3VyY2UiLCJwYXJhbXMiLCJvcmlnaW5hbFVybCIsInJlc291cmNlIiwiJHNhdmUiLCJzdWNjZXNzIiwidXBzZXJ0IiwiZmFjdG9yeSIsInByb3ZpZGVyIiwiJGh0dHBQcm92aWRlciIsImludGVyY2VwdG9ycyIsImNvbnN0YW50IiwiaWRiMiIsImRiIiwiJGF1dG9taWdyYXRpb24iLCIkbW9kZWwiLCIkY3JlYXRlU3RvcmUiLCIkZHJvcCIsIiRvcGVuIiwiZGIyIiwiVHJhYmFqYWRvcjIiLCIkZmllbGQiLCJtZXRob2QiLCIkYnVpbGQiLCJUcmFiYWphZG9yIiwiZ2V0Tm9tYnJlIiwibm9tYnJlcyIsImFwZWxsaWRvcyIsInJ1biIsInQiLCIkcHV0IiwiciIsIkNsYXp6ZXIiLCJjb25zdHJ1Y3RvciIsImRlZmluZVByb3BlcnR5IiwicGFyZW50IiwidG1wIiwiY2xhenoiLCJmdW5jIiwicHJvcGVydHkiLCJmcm9tIiwidG8iLCIkbWUiLCJzZXQiLCJSZWFkeVN0YXRlIiwic3RhdGljIiwiaWRiUmVxdWVzdCIsIm1lIiwiaW5oZXJpdCIsIkV2ZW50VGFyZ2V0IiwiZ2V0dGVyIiwiaGFuZGxlckV2ZW50IiwiJF9wcm9taXNlIiwiUHJvbWlzZSIsIiRzdWNjZXNzIiwiJGZhaWwiLCJpZGJPcGVuREJSZXF1ZXN0IiwiaWRiRXZlbnRUYXJnZXQiLCJpZGJTdG9yZSIsImlkYk1vZGVsMiIsImlkYlRyYW5zYWN0aW9uIiwiZmlyc3QiLCJzZWNvbmQiLCJjbXAiLCIkX3VwZ3JhZGVuZWVkZWRzIiwiYWxsTWlncmF0aW9ucyIsIiR1cGdyYWRlbmVlZGVkIiwib3BlblJlcXVlc3QiLCJvbGRWZXJzaW9uIiwibmV3VmVyc2lvbiIsIm1pZ3JhdGlvbnMiLCJtaWdyYXRpb24iLCJjYkVyciIsImxhc3RScSIsImxhc3RFdmVudCIsIiRuYW1lIiwiY2xvc2UiLCJkZWxldGVPYmplY3RTdG9yZSIsIiRfbW9kZWxzIiwic3RvcmVOYW1lcyIsIm1vZGUiLCIkdHJhbnNhY3Rpb24iLCJzdG9yZXNPYmoiLCJzdG9yZXMiLCJzdG9yZU5hbWUiLCIkc3RvcmUiLCJUcmFuc2FjdGlvbk1vZGUiLCJSZWFkT25seSIsIlJlYWRXcml0ZSIsImFkZCIsInF1ZXJ5IiwiY2xlYXIiLCJnZXRLZXkiLCJjb3VudCIsImdldEFsbCIsImdldEFsbEtleXMiLCJkaXJlY3Rpb24iLCJvcGVuS2V5Q3Vyc29yIiwiZGVsZXRlSW5kZXgiLCJkZWVwRmllbGQiLCJpZGJNb2RlbEZhY3RvcnkiLCJzdG9yZSIsIiR3cml0ZXIiLCIkcmVhZGVyIiwiJGdldEluc3RhbmNlIiwiJGFkZCIsIiRfcmVtb3RlIiwiJF92YWx1ZXMiLCJsb2NhbCIsIiRrZXkiLCIkZGVmQWNjZXNzVG9rZW5JZCIsIiRkZWZDdXJyZW50VXNlcklkIiwiJGNvbm5lY3QiLCIkdXJsIiwiJHB1c2hMaXN0ZW5lciIsIiRfbGlzdGVuZXJzIiwiJHNldFVybFNlcnZlciIsIiRzZXRDcmVkZW50aWFscyIsImFib3J0IiwiJGNvbXBsZXRlZCIsInN0YWNrIiwibCIsIiR1bmJpbmQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtB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d1ksTUFBTXhZLEdBQUdNLEtBQUssTUFBTTZHOzs7OztJQUt6QmtNIiwiZmlsZSI6Im5nLWlkYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMTM4YjMxYjFiNWZiNjBmMzlkZjFcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgaWRiVXRpbHMgZnJvbSAnLi91dGlscy9pZGJVdGlscyc7XHJcbmltcG9ydCBpZGJFdmVudHMgZnJvbSAnLi91dGlscy9pZGJFdmVudHMnO1xyXG5pbXBvcnQgcXMgZnJvbSAnLi91dGlscy9xcyc7XHJcblxyXG5pbXBvcnQgaWRiU29ja2V0IGZyb20gJy4vc2VydmljZXMvaWRiU29ja2V0JztcclxuaW1wb3J0IGlkYiBmcm9tICcuL3NlcnZpY2VzL2lkYic7XHJcbmltcG9ydCBpZGJNb2RlbCBmcm9tICcuL3NlcnZpY2VzL2lkYk1vZGVsJztcclxuaW1wb3J0IGlkYlF1ZXJ5IGZyb20gJy4vc2VydmljZXMvaWRiUXVlcnknO1xyXG5cclxuaW1wb3J0IGxiIGZyb20gJy4vc2VydmljZXMvbGInO1xyXG5cclxuaW1wb3J0ICcuL3YxL2luZGV4JztcclxuXHJcbmxiKGFuZ3VsYXIubW9kdWxlKCduZy5pZGInLCBbJ25nLnYxLmlkYiddKSlcclxuICBcclxuICAuc2VydmljZSgnaWRiRXZlbnRzJywgaWRiRXZlbnRzKVxyXG4gIC5zZXJ2aWNlKCdpZGJVdGlscycsIGlkYlV0aWxzKVxyXG4gIC5zZXJ2aWNlKCdxcycsIHFzKVxyXG5cclxuICAvLyBUYWtlIG9mIGxiLXNlcnZpY2VzLmpzXHJcbiAgLnNlcnZpY2UoJ2lkYicsIGlkYilcclxuICAuc2VydmljZSgnaWRiTW9kZWwnLCBpZGJNb2RlbClcclxuICAuc2VydmljZSgnaWRiUXVlcnknLCBpZGJRdWVyeSlcclxuICAuc2VydmljZSgnaWRiU29ja2V0JywgaWRiU29ja2V0KVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9pZGJVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMvaWRiVXRpbHMnKTtcblxudmFyIF9pZGJVdGlsczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJVdGlscyk7XG5cbnZhciBfaWRiRXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9pZGJFdmVudHMnKTtcblxudmFyIF9pZGJFdmVudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiRXZlbnRzKTtcblxudmFyIF9xcyA9IHJlcXVpcmUoJy4vdXRpbHMvcXMnKTtcblxudmFyIF9xczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9xcyk7XG5cbnZhciBfaWRiU29ja2V0ID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJTb2NrZXQnKTtcblxudmFyIF9pZGJTb2NrZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiU29ja2V0KTtcblxudmFyIF9pZGIgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYicpO1xuXG52YXIgX2lkYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGIpO1xuXG52YXIgX2lkYk1vZGVsID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJNb2RlbCcpO1xuXG52YXIgX2lkYk1vZGVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYk1vZGVsKTtcblxudmFyIF9pZGJRdWVyeSA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiUXVlcnknKTtcblxudmFyIF9pZGJRdWVyeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJRdWVyeSk7XG5cbnZhciBfbGIgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2xiJyk7XG5cbnZhciBfbGIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGIpO1xuXG5yZXF1aXJlKCcuL3YxL2luZGV4Jyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbigwLCBfbGIyLmRlZmF1bHQpKGFuZ3VsYXIubW9kdWxlKCduZy5pZGInLCBbJ25nLnYxLmlkYiddKSkuc2VydmljZSgnaWRiRXZlbnRzJywgX2lkYkV2ZW50czIuZGVmYXVsdCkuc2VydmljZSgnaWRiVXRpbHMnLCBfaWRiVXRpbHMyLmRlZmF1bHQpLnNlcnZpY2UoJ3FzJywgX3FzMi5kZWZhdWx0KVxuXG4vLyBUYWtlIG9mIGxiLXNlcnZpY2VzLmpzXG4uc2VydmljZSgnaWRiJywgX2lkYjIuZGVmYXVsdCkuc2VydmljZSgnaWRiTW9kZWwnLCBfaWRiTW9kZWwyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlF1ZXJ5JywgX2lkYlF1ZXJ5Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJTb2NrZXQnLCBfaWRiU29ja2V0Mi5kZWZhdWx0KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYlV0aWxzICgkcSkgeyAnbmdJbmplY3QnXHJcbiAgXHJcbiAgY29uc3QgdmFsaWRhdG9ycyA9IHtcclxuICAgIC8vIEZ1bmNpb24gcGFyYSBkZXRlcm1pbmFyIHNpIGVzIHVuIGNhbGxiYWNrIHbDoWxpZG8gbyBub1xyXG4gICAgY2FsbGJhY2s6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicgfHwgdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PSB1bmRlZmluZWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFZlcmlmaWNhIHNpIHVuIHZhbG9yIGVzIHVuIGFycmF5XHJcbiAgICBhcnJheTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG4gIH0gIFxyXG5cclxuICAvLyBHZW5lcmEgdW4gZXJyb3Igc2kgZWwgdmFsb3Igbm8gZXMgZGVsIHRpcG8gaW5kaWNhZG8gcG9yIHBhcmFtZXRyb1xyXG4gIGZ1bmN0aW9uIHZhbGlkICh2YWx1ZSwgdHlwZXMpIHtcclxuICAgIGlmICghdmFsaWRhdG9ycy5hcnJheSh0eXBlcykpIHR5cGVzID0gW3R5cGVzXTtcclxuXHJcbiAgICBmb3IobGV0IGkgaW4gdHlwZXMpe1xyXG4gICAgICBjb25zdCB0eXBlID0gdHlwZXNbaV07XHJcbiAgICAgIGlmICh0eXBlb2YgdHlwZSA9PSAnc3RyaW5nJyl7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWxpZGF0b3JzW3R5cGVdID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgIGlmICh2YWxpZGF0b3JzW3R5cGVdKHZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PSB0eXBlKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHR5cGUgPT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgaWYodHlwZShhcmdzW2ldKSl7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gIH1cclxuXHJcbiAgLy8gVmFsaWRhIHVuIGFycmF5IGRlIGFyZ3VtZW50b3MgY29uIHVuIGFycmEgZGUgdGlwb3NcclxuICBmdW5jdGlvbiB2YWxpZGF0ZSAoYXJncywgdHlwZXMpIHtcclxuXHJcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyk7XHJcbiAgICBpZiAodHlwZW9mIHR5cGVzID09ICdzdHJpbmcnKSB0eXBlcyA9IFt0eXBlc107XHJcbiAgICBmb3IgKGxldCBpIGluIGFyZ3Mpe1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGFyZ3NbaV07XHJcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlc1tpXTtcclxuICAgICAgaWYgKHR5cGUgJiYgIXZhbGlkKHZhbHVlLCB0eXBlKSl7XHJcbiAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWxpZGF0b3IgdG86ICcrYXJnc1tpXSsnIG11c3QgYmUgJyt0eXBlKTtcclxuICAgICAgICBlcnIubmFtZSA9ICdJbnZhbGlkVmFsaWRhdG9yJ1xyXG4gICAgICAgIHRocm93IGVycjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB2YWxpZGF0ZTogdmFsaWRhdGUsXHJcbiAgfTtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9pZGJVdGlscy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBpZGJVdGlscztcbmZ1bmN0aW9uIGlkYlV0aWxzKCRxKSB7XG4gICduZ0luamVjdCc7XG5cbiAgdmFyIHZhbGlkYXRvcnMgPSB7XG4gICAgLy8gRnVuY2lvbiBwYXJhIGRldGVybWluYXIgc2kgZXMgdW4gY2FsbGJhY2sgdsOhbGlkbyBvIG5vXG4gICAgY2FsbGJhY2s6IGZ1bmN0aW9uIGNhbGxiYWNrKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicgfHwgdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PSB1bmRlZmluZWQ7XG4gICAgfSxcblxuICAgIC8vIFZlcmlmaWNhIHNpIHVuIHZhbG9yIGVzIHVuIGFycmF5XG4gICAgYXJyYXk6IGZ1bmN0aW9uIGFycmF5KHZhbHVlKSB7XG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG4gICAgfVxuXG4gIH07XG5cbiAgLy8gR2VuZXJhIHVuIGVycm9yIHNpIGVsIHZhbG9yIG5vIGVzIGRlbCB0aXBvIGluZGljYWRvIHBvciBwYXJhbWV0cm9cbiAgZnVuY3Rpb24gdmFsaWQodmFsdWUsIHR5cGVzKSB7XG4gICAgaWYgKCF2YWxpZGF0b3JzLmFycmF5KHR5cGVzKSkgdHlwZXMgPSBbdHlwZXNdO1xuXG4gICAgZm9yICh2YXIgaSBpbiB0eXBlcykge1xuICAgICAgdmFyIHR5cGUgPSB0eXBlc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgdHlwZSA9PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodHlwZW9mIHZhbGlkYXRvcnNbdHlwZV0gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGlmICh2YWxpZGF0b3JzW3R5cGVdKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgPT0gdHlwZSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0eXBlID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaWYgKHR5cGUoYXJnc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFZhbGlkYSB1biBhcnJheSBkZSBhcmd1bWVudG9zIGNvbiB1biBhcnJhIGRlIHRpcG9zXG4gIGZ1bmN0aW9uIHZhbGlkYXRlKGFyZ3MsIHR5cGVzKSB7XG5cbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyk7XG4gICAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xuICAgIGZvciAodmFyIGkgaW4gYXJncykge1xuICAgICAgdmFyIHZhbHVlID0gYXJnc1tpXTtcbiAgICAgIHZhciB0eXBlID0gdHlwZXNbaV07XG4gICAgICBpZiAodHlwZSAmJiAhdmFsaWQodmFsdWUsIHR5cGUpKSB7XG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsaWRhdG9yIHRvOiAnICsgYXJnc1tpXSArICcgbXVzdCBiZSAnICsgdHlwZSk7XG4gICAgICAgIGVyci5uYW1lID0gJ0ludmFsaWRWYWxpZGF0b3InO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB2YWxpZGF0ZTogdmFsaWRhdGVcbiAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9pZGJVdGlscy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIE5vbWJyZSBkZSBsb3MgZXZlbnRvc1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJFdmVudHMoKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIERCX0VSUk9SOiAnY2IuZXJyb3InLFxyXG4gICAgTU9ERUxfSU5TVEFOQ0VEIDogJ21vZGVsLmluc3RhbmNlZCcsXHJcbiAgICBNT0RFTF9SRVBMQUNFIDogJ21vZGVsLnJlcGxhY2UnLFxyXG4gICAgTU9ERUxfUVVFUklFRCA6ICdtb2RlbC5xdWVyaWVkJyxcclxuICAgIE1PREVMX1VOUVVFUklFRCA6ICdtb2RlbC51bnF1ZXJpZWQnLFxyXG4gIH1cclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9pZGJFdmVudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIE5vbWJyZSBkZSBsb3MgZXZlbnRvc1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaWRiRXZlbnRzO1xuZnVuY3Rpb24gaWRiRXZlbnRzKCkge1xuICByZXR1cm4ge1xuICAgIERCX0VSUk9SOiAnY2IuZXJyb3InLFxuICAgIE1PREVMX0lOU1RBTkNFRDogJ21vZGVsLmluc3RhbmNlZCcsXG4gICAgTU9ERUxfUkVQTEFDRTogJ21vZGVsLnJlcGxhY2UnLFxuICAgIE1PREVMX1FVRVJJRUQ6ICdtb2RlbC5xdWVyaWVkJyxcbiAgICBNT0RFTF9VTlFVRVJJRUQ6ICdtb2RlbC51bnF1ZXJpZWQnXG4gIH07XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL2lkYkV2ZW50cy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHFzICgpIHsgJ25nSW5qZWN0J1xyXG4gIFxyXG4gIGZ1bmN0aW9uIHFzQ2xhc3MgKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgXHJcbiAgICBsZXQgdGhlbnMgPSBbXTtcclxuICAgIGxldCB0aGVuc1JlYWR5ID0gW107XHJcbiAgICBsZXQgY2F0Y2hzID0gW107XHJcbiAgICBsZXQgY2F0Y2hzUmVhZHkgPSBbXTtcclxuICAgIGxldCByZXN1bHRBcmdzID0gbnVsbDtcclxuICAgIGxldCBlcnJvciA9IG51bGw7XHJcblxyXG4gICAgdGhpei5wcm9taXNlID0ge307XHJcbiAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRoZW5zUmVzb2x2ZWQgKCkge1xyXG4gICAgICBpZiAoIXRoZW5zLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICBsZXQgY2IgPSB0aGVucy5zaGlmdCgpO1xyXG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LnJlc3VsdEFyZ3MpO1xyXG4gICAgICB0aGVuc1JlYWR5LnB1c2goY2IpO1xyXG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2F0Y2hzUmVzb2x2ZWQgKCkge1xyXG4gICAgICBpZiAoIWNhdGNocy5sZW5ndGgpIHJldHVybjtcclxuICAgICAgbGV0IGNiID0gY2F0Y2hzLnNoaWZ0KCk7XHJcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xyXG4gICAgICBjYXRjaHNSZWFkeS5wdXNoKGNiKTtcclxuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGl6LnJlc29sdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xyXG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgIHRoaXoucmVzdWx0QXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5yZWplY3QgPSBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xyXG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgIHRoaXouZXJyb3IgPSBlcnIgfHwge307XHJcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucHJvbWlzZS50aGVuID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIHRoZW5zLnB1c2goY2IpO1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQgJiYgIXRoaXouZXJyb3IpIHtcclxuICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXoucHJvbWlzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLmNhdGNoID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIGNhdGNocy5wdXNoKGNiKTtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmIHRoaXouZXJyb3IpIHtcclxuICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGl6LnByb21pc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucHJvbWlzZS5kb25lID0gZnVuY3Rpb24gKGNiKSB7XHJcblxyXG4gICAgICB0aGVucy5wdXNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYi5hcHBseShudWxsLCBbbnVsbF0uY29uY2F0KHRoaXoucmVzdWx0QXJncykpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNhdGNocy5wdXNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHtcclxuICAgICAgICBpZiAoIXRoaXouZXJyb3IpIHtcclxuICAgICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBpZihjYikgdGhpei5wcm9taXNlLmRvbmUoY2IpO1xyXG5cclxuICB9O1xyXG5cclxuICAvLyBDcmVhIHVuYSBpbnN0YW5jaWEgZGVsIGRlZmVyZWRcclxuICBxc0NsYXNzLmRlZmVyID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICByZXR1cm4gbmV3IHFzQ2xhc3MoY2IpO1xyXG4gIH07XHJcblxyXG4gIHFzQ2xhc3MuYWxsID0gZnVuY3Rpb24gKGFycikge1xyXG4gICAgY29uc3QgZGVmZXJlZCA9IHFzQ2xhc3MuZGVmZXIoKTtcclxuXHJcbiAgICBsZXQgcHJvbWlzZXMgPSBrZXlzLmxlbmd0aDtcclxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xyXG4gICAgY29uc3QgcmVzdWx0cyA9IGFyci5sZW5ndGg/IFtdIDoge307XHJcblxyXG4gICAga2V5cy5tYXAoZnVuY3Rpb24gKGlkeCkge1xyXG5cclxuICAgICAgYXJyW2lkeF0udGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgcHJvbWlzZXMtLTtcclxuICAgICAgICByZXN1bHRzW2lkeF0gPSByZXN1bHQ7XHJcbiAgICAgICAgaWYgKCFwcm9taXNlcyl7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUocmVzdWx0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGFycltpZHhdLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHFzQ2xhc3M7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvcXMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBxcztcbmZ1bmN0aW9uIHFzKCkge1xuICAnbmdJbmplY3QnO1xuXG4gIGZ1bmN0aW9uIHFzQ2xhc3MoY2IpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICB2YXIgdGhlbnMgPSBbXTtcbiAgICB2YXIgdGhlbnNSZWFkeSA9IFtdO1xuICAgIHZhciBjYXRjaHMgPSBbXTtcbiAgICB2YXIgY2F0Y2hzUmVhZHkgPSBbXTtcbiAgICB2YXIgcmVzdWx0QXJncyA9IG51bGw7XG4gICAgdmFyIGVycm9yID0gbnVsbDtcblxuICAgIHRoaXoucHJvbWlzZSA9IHt9O1xuICAgIHRoaXouJHJlc29sdmVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiB0aGVuc1Jlc29sdmVkKCkge1xuICAgICAgaWYgKCF0aGVucy5sZW5ndGgpIHJldHVybjtcbiAgICAgIHZhciBjYiA9IHRoZW5zLnNoaWZ0KCk7XG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LnJlc3VsdEFyZ3MpO1xuICAgICAgdGhlbnNSZWFkeS5wdXNoKGNiKTtcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYXRjaHNSZXNvbHZlZCgpIHtcbiAgICAgIGlmICghY2F0Y2hzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgdmFyIGNiID0gY2F0Y2hzLnNoaWZ0KCk7XG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcbiAgICAgIGNhdGNoc1JlYWR5LnB1c2goY2IpO1xuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICB9XG5cbiAgICB0aGl6LnJlc29sdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgIHRoaXoucmVzdWx0QXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgfTtcblxuICAgIHRoaXoucmVqZWN0ID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICB0aGl6LmVycm9yID0gZXJyIHx8IHt9O1xuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICB9O1xuXG4gICAgdGhpei5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHRoZW5zLnB1c2goY2IpO1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmICF0aGl6LmVycm9yKSB7XG4gICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGl6LnByb21pc2U7XG4gICAgfTtcblxuICAgIHRoaXoucHJvbWlzZS5jYXRjaCA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgY2F0Y2hzLnB1c2goY2IpO1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmIHRoaXouZXJyb3IpIHtcbiAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGl6LnByb21pc2U7XG4gICAgfTtcblxuICAgIHRoaXoucHJvbWlzZS5kb25lID0gZnVuY3Rpb24gKGNiKSB7XG5cbiAgICAgIHRoZW5zLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjYi5hcHBseShudWxsLCBbbnVsbF0uY29uY2F0KHRoaXoucmVzdWx0QXJncykpO1xuICAgICAgfSk7XG5cbiAgICAgIGNhdGNocy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSB7XG4gICAgICAgIGlmICghdGhpei5lcnJvcikge1xuICAgICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH07XG5cbiAgICBpZiAoY2IpIHRoaXoucHJvbWlzZS5kb25lKGNiKTtcbiAgfTtcblxuICAvLyBDcmVhIHVuYSBpbnN0YW5jaWEgZGVsIGRlZmVyZWRcbiAgcXNDbGFzcy5kZWZlciA9IGZ1bmN0aW9uIChjYikge1xuICAgIHJldHVybiBuZXcgcXNDbGFzcyhjYik7XG4gIH07XG5cbiAgcXNDbGFzcy5hbGwgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgdmFyIGRlZmVyZWQgPSBxc0NsYXNzLmRlZmVyKCk7XG5cbiAgICB2YXIgcHJvbWlzZXMgPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFycik7XG4gICAgdmFyIHJlc3VsdHMgPSBhcnIubGVuZ3RoID8gW10gOiB7fTtcblxuICAgIGtleXMubWFwKGZ1bmN0aW9uIChpZHgpIHtcblxuICAgICAgYXJyW2lkeF0udGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIHByb21pc2VzLS07XG4gICAgICAgIHJlc3VsdHNbaWR4XSA9IHJlc3VsdDtcbiAgICAgICAgaWYgKCFwcm9taXNlcykge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGFycltpZHhdLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRlZmVyZWQ7XG4gIH07XG5cbiAgcmV0dXJuIHFzQ2xhc3M7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvcXMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJTb2NrZXRTZXJ2aWNlKCRsb2csIGlvLCBpZGJVdGlscykgeyAnbmdJbmplY3QnOyBjb25zdCB0aGl6ID0gdGhpcztcclxuICBcclxuICBsZXQgJGRlZlVybFNlcnZlciA9IG51bGw7XHJcblxyXG4gIGZ1bmN0aW9uIGlkYlNvY2tldCAoJHVybFNlcnZlciwgJGFjY2Vzc1Rva2VuSWQsICRjdXJyZW50VXNlcklkKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnc3RyaW5nJywgJ251bWJlciddLCBbJ3N0cmluZycsICdudW1iZXInXV0pO1xyXG5cclxuICAgIGNvbnN0ICRsaXN0ZW5lcnMgPSAgW107XHJcbiAgICBsZXQgJHNvY2tldCA9IG51bGw7XHJcbiAgICAkdXJsU2VydmVyID0gJHVybFNlcnZlciB8fCAkZGVmVXJsU2VydmVyO1xyXG5cclxuICAgIC8vIENvbmVjdGFyc2UgYWwgc2Vydmlkb3JcclxuICAgIHRoaXouY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgXHJcbiAgICAgIC8vIENyZWF0aW5nIGNvbm5lY3Rpb24gd2l0aCBzZXJ2ZXJcclxuICAgICAgJHNvY2tldCA9IGlvLmNvbm5lY3QoJHVybFNlcnZlcik7XHJcblxyXG4gICAgICAvLyBUaGlzIHBhcnQgaXMgb25seSBmb3IgbG9naW4gdXNlcnMgZm9yIGF1dGhlbnRpY2F0ZWQgJHNvY2tldCBjb25uZWN0aW9uIGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIuXHJcbiAgICAgIC8vIElmIHlvdSBhcmUgbm90IHVzaW5nIGxvZ2luIHBhZ2UgaW4geW91IHdlYnNpdGUgdGhlbiB5b3Ugc2hvdWxkIHJlbW92ZSByZXN0IHBpZWNlIG9mIGNvZGUuLlxyXG5cclxuICAgICAgJHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJGxvZy5sb2coJ2Nvbm5lY3RlZCcpO1xyXG5cclxuICAgICAgICAkc29ja2V0LmVtaXQoJ2F1dGhlbnRpY2F0aW9uJywge1xyXG4gICAgICAgICAgaWQ6ICRhY2Nlc3NUb2tlbklkLFxyXG4gICAgICAgICAgdXNlcklkOiAkY3VycmVudFVzZXJJZCxcclxuICAgICAgICB9KTtcclxuICAgICAgICAkc29ja2V0Lm9uKCdhdXRoZW50aWNhdGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAvLyB1c2UgdGhlICRzb2NrZXQgYXMgdXN1YWxcclxuICAgICAgICAgICRsb2cubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhpei5zdWJzY3JpYmUgPSBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIHZhciBuYW1lID0gb3B0aW9ucy5tb2RlbE5hbWUgKyAnLicgKyBvcHRpb25zLmV2ZW50TmFtZTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tb2RlbElkID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgIG5hbWUgPSBuYW1lICsgJy4nICsgb3B0aW9ucy5tb2RlbElkO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkc29ja2V0Lm9uKG5hbWUsIGNiKTtcclxuICAgICAgXHJcbiAgICAgIC8vUHVzaCB0aGUgY29udGFpbmVyLi5cclxuICAgICAgJGxpc3RlbmVycy5wdXNoKG5hbWUsIGNiKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucHVzaExpc3RlbmVyID0gZnVuY3Rpb24gKHN1YnNjcmlwdGlvbk5hbWUsIGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAkbGlzdGVuZXJzLnB1c2goc3Vic2NyaXB0aW9uTmFtZSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmlwdGlvbk5hbWUpIHtcclxuICAgICAgJHNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMoc3Vic2NyaXB0aW9uTmFtZSk7ICBcclxuICAgICAgdmFyIGlkeCA9ICRsaXN0ZW5lcnMuaW5kZXhPZihzdWJzY3JpcHRpb25OYW1lKTtcclxuICAgICAgaWYgKGlkeCAhPSAtMSl7XHJcbiAgICAgICAgJGxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LmNvbm5lY3QoKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgLy8gQXNpZ25hIGxhIFVSTCBkZSBzZXJ2aWRvciBwb3IgZGVmZWN0b1xyXG4gIGlkYlNvY2tldC5zZXRVcmxTZXJ2ZXIgPSBmdW5jdGlvbiAodXJsU2VydmVyKSB7XHJcbiAgICAkZGVmVXJsU2VydmVyID0gdXJsU2VydmVyO1xyXG4gIH07XHJcblxyXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXHJcbiAgaWRiU29ja2V0LnNldENyZWRlbnRpYWxzID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIGN1cnJlbnRVc2VySWQpIHtcclxuICAgIGFjY2Vzc1Rva2VuSWQgPSAkYWNjZXNzVG9rZW5JZFxyXG4gICAgY3VycmVudFVzZXJJZCA9ICRjdXJyZW50VXNlcklkO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiBpZGJTb2NrZXQ7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaWRiU29ja2V0U2VydmljZTtcbmZ1bmN0aW9uIGlkYlNvY2tldFNlcnZpY2UoJGxvZywgaW8sIGlkYlV0aWxzKSB7XG4gICduZ0luamVjdCc7XG4gIHZhciB0aGl6ID0gdGhpcztcblxuICB2YXIgJGRlZlVybFNlcnZlciA9IG51bGw7XG5cbiAgZnVuY3Rpb24gaWRiU29ja2V0KCR1cmxTZXJ2ZXIsICRhY2Nlc3NUb2tlbklkLCAkY3VycmVudFVzZXJJZCkge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ10sIFsnc3RyaW5nJywgJ251bWJlciddXSk7XG5cbiAgICB2YXIgJGxpc3RlbmVycyA9IFtdO1xuICAgIHZhciAkc29ja2V0ID0gbnVsbDtcbiAgICAkdXJsU2VydmVyID0gJHVybFNlcnZlciB8fCAkZGVmVXJsU2VydmVyO1xuXG4gICAgLy8gQ29uZWN0YXJzZSBhbCBzZXJ2aWRvclxuICAgIHRoaXouY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgLy8gQ3JlYXRpbmcgY29ubmVjdGlvbiB3aXRoIHNlcnZlclxuICAgICAgJHNvY2tldCA9IGlvLmNvbm5lY3QoJHVybFNlcnZlcik7XG5cbiAgICAgIC8vIFRoaXMgcGFydCBpcyBvbmx5IGZvciBsb2dpbiB1c2VycyBmb3IgYXV0aGVudGljYXRlZCAkc29ja2V0IGNvbm5lY3Rpb24gYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlci5cbiAgICAgIC8vIElmIHlvdSBhcmUgbm90IHVzaW5nIGxvZ2luIHBhZ2UgaW4geW91IHdlYnNpdGUgdGhlbiB5b3Ugc2hvdWxkIHJlbW92ZSByZXN0IHBpZWNlIG9mIGNvZGUuLlxuXG4gICAgICAkc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkbG9nLmxvZygnY29ubmVjdGVkJyk7XG5cbiAgICAgICAgJHNvY2tldC5lbWl0KCdhdXRoZW50aWNhdGlvbicsIHtcbiAgICAgICAgICBpZDogJGFjY2Vzc1Rva2VuSWQsXG4gICAgICAgICAgdXNlcklkOiAkY3VycmVudFVzZXJJZFxuICAgICAgICB9KTtcbiAgICAgICAgJHNvY2tldC5vbignYXV0aGVudGljYXRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyB1c2UgdGhlICRzb2NrZXQgYXMgdXN1YWxcbiAgICAgICAgICAkbG9nLmxvZygnVXNlciBpcyBhdXRoZW50aWNhdGVkJyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXouc3Vic2NyaWJlID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB2YXIgbmFtZSA9IG9wdGlvbnMubW9kZWxOYW1lICsgJy4nICsgb3B0aW9ucy5ldmVudE5hbWU7XG5cbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tb2RlbElkID09PSAnbnVtYmVyJykge1xuICAgICAgICBuYW1lID0gbmFtZSArICcuJyArIG9wdGlvbnMubW9kZWxJZDtcbiAgICAgIH1cblxuICAgICAgJHNvY2tldC5vbihuYW1lLCBjYik7XG5cbiAgICAgIC8vUHVzaCB0aGUgY29udGFpbmVyLi5cbiAgICAgICRsaXN0ZW5lcnMucHVzaChuYW1lLCBjYik7XG4gICAgfTtcblxuICAgIHRoaXoucHVzaExpc3RlbmVyID0gZnVuY3Rpb24gKHN1YnNjcmlwdGlvbk5hbWUsIGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAkbGlzdGVuZXJzLnB1c2goc3Vic2NyaXB0aW9uTmFtZSk7XG4gICAgfTtcblxuICAgIHRoaXoudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSkge1xuICAgICAgJHNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMoc3Vic2NyaXB0aW9uTmFtZSk7XG4gICAgICB2YXIgaWR4ID0gJGxpc3RlbmVycy5pbmRleE9mKHN1YnNjcmlwdGlvbk5hbWUpO1xuICAgICAgaWYgKGlkeCAhPSAtMSkge1xuICAgICAgICAkbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGl6LmNvbm5lY3QoKTtcbiAgfTtcblxuICAvLyBBc2lnbmEgbGEgVVJMIGRlIHNlcnZpZG9yIHBvciBkZWZlY3RvXG4gIGlkYlNvY2tldC5zZXRVcmxTZXJ2ZXIgPSBmdW5jdGlvbiAodXJsU2VydmVyKSB7XG4gICAgJGRlZlVybFNlcnZlciA9IHVybFNlcnZlcjtcbiAgfTtcblxuICAvLyBBU2lnbmEgbGFzIGNyZWRlbmNpYWxlcyBwb3IgZGVmZWN0b1xuICBpZGJTb2NrZXQuc2V0Q3JlZGVudGlhbHMgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCkge1xuICAgIGFjY2Vzc1Rva2VuSWQgPSAkYWNjZXNzVG9rZW5JZDtcbiAgICBjdXJyZW50VXNlcklkID0gJGN1cnJlbnRVc2VySWQ7XG4gIH07XG5cbiAgcmV0dXJuIGlkYlNvY2tldDtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJTb2NrZXQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiU2VydmljZSAoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJFdmVudHMsIGlkYk1vZGVsKSB7ICduZ0luamVjdCc7XHJcblxyXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cclxuICAgIGNvbnN0IGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQjtcclxuICAgIC8vIE5vIHVzZSBcImNvbnN0IGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cclxuICAgIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxyXG4gICAgY29uc3QgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xyXG4gICAgY29uc3QgSURCS2V5UmFuZ2UgPSB3aW5kb3cuSURCS2V5UmFuZ2UgfHwgd2luZG93LndlYmtpdElEQktleVJhbmdlIHx8IHdpbmRvdy5tc0lEQktleVJhbmdlO1xyXG4gICAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcclxuICAgIFxyXG4gICAgaWYgKCFpbmRleGVkREIpIHtcclxuICAgICAgYWxlcnQoXCJTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXNcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgLy8gQ2xhc2UgcGFyYSBsYSBjcmVhY2nDs24gZGUgaW5zdGFuY2lhcyBkZSBsYSBCRFxyXG4gIGZ1bmN0aW9uIGlkYigkZGJOYW1lLCAkZGJWZXJzaW9uLCAkc29ja2V0KSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdudW1iZXInLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAvLyBNYW5lamFkb3JlcyBkZSBldmVudG9zLlxyXG4gICAgY29uc3QgJGV2ZW50c0NhbGxiYWNrcyA9IHt9O1xyXG4gICAgY29uc3QgJHVwZ3JhZGVOZWVkZWREZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgIGNvbnN0ICRvcGVuRGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcbiAgICBjb25zdCAkc29ja2V0Q29ubmVjdGVkRGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcbiAgICBsZXQgJG9wZW5lZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIEluc3RhbmNpYSBkZSBsYSBiYXNlIGRlIGRhdG9zO1xyXG4gICAgbGV0ICRyZXF1ZXN0ID0gbnVsbDtcclxuICAgIHRoaXoubW9kZWxzID0ge307XHJcblxyXG4gICAgLy8gQWdyZWdhciB1biBtYW5lamFkb3IgZGUgZXZlbnRvXHJcbiAgICAgIHRoaXouYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcclxuXHJcbiAgICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pe1xyXG4gICAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0ucHVzaChjYik7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgIC8vUmVtdWV2ZSB1biBtYW5lamFkb3IgZGUgZXZlbnRvXHJcbiAgICAgIHRoaXoudW5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBCdXNjYXIgZWwgY2JcclxuICAgICAgICBjb25zdCBpZHggPSAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uaW5kZXhPZihjYik7XHJcblxyXG4gICAgICAgIC8vIFNpIHNlIGVuY29udHJvIGVsIGNiIHJlbW92ZXJsb1xyXG4gICAgICAgIGlmIChpZHggIT0gLTEpe1xyXG4gICAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgLy8gRGlzcGFyYSB1biBldmVudG9cclxuICAgICAgdGhpei50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0J10pO1xyXG5cclxuICAgICAgICAkbG9nLmxvZygkZGJOYW1lKycudicrKCRkYlZlcnNpb258fDEpKyc6ICcrZXZlbnROYW1lKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpIGluICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSl7XHJcbiAgICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpeiwgYXJncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAvLyBDYWxsYmFja3MgcGFyYSBsb3MgZXJyb3Jlc1xyXG4gICAgICB0aGl6LmVycm9yID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgdGhpei5iaW5kKGlkYkV2ZW50cy5EQl9FUlJPUiwgY2IpO1xyXG4gICAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgICB9O1xyXG5cclxuICAgIC8vIEFicmlyIHVuYSBCYXNlIGRlIGRhdG9zLlxyXG4gICAgdGhpei5vcGVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAoJG9wZW5lZCkgcmV0dXJuICRvcGVuRGVmZXJlZDtcclxuXHJcbiAgICAgIC8vIENyZWFyIHVuIG51ZXZvIGRlZmVyXHJcbiAgICAgICRvcGVuZWQgPSB0cnVlO1xyXG5cclxuICAgICAgLy8gZGVqYW1vcyBhYmllcnRhIG51ZXN0cmEgYmFzZSBkZSBkYXRvc1xyXG4gICAgICBmdW5jdGlvbiByZWFkeSgpIHtcclxuXHJcbiAgICAgICAgY29uc3QgcnEgPSBpbmRleGVkREIub3BlbigkZGJOYW1lLCAkZGJWZXJzaW9uKTtcclxuXHJcbiAgICAgICAgcnEub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5yZXN1bHQhXHJcbiAgICAgICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucmVzb2x2ZShldmVudCwgcnEpO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZWwgcmVzdWx0YWRvXHJcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5yZXN1bHQhXHJcbiAgICAgICAgICAkcmVxdWVzdCA9IHJxO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBBc2luZ2FyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzIGEgbGEgQkRcclxuICAgICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgJGxvZy5lcnJvcignRGF0YWJhc2UgZXJyb3I6ICcrIGV2ZW50LnRhcmdldC5lcnJvckNvZGUpO1xyXG4gICAgICAgICAgICB0aGl6LnRyaWdnZXIoaWRiRXZlbnRzLkRCX0VSUk9SLCBbZXZlbnRdKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAkb3BlbkRlZmVyZWQucmVzb2x2ZShldmVudCwgcnEpO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzXHJcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5lcnJvckNvZGUhXHJcbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgJG9wZW5EZWZlcmVkLnJlamVjdChycS5lcnJvckNvZGUsIGV2ZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKCRkYk5hbWUpLm9uc3VjY2VzcyA9IHJlYWR5O1xyXG4gICAgICAvLyByZWFkeSgpO1xyXG5cclxuICAgICAgcmV0dXJuICRvcGVuRGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBudWV2byBtb2RlbG9cclxuICAgICAgdGhpei5tb2RlbCA9IGZ1bmN0aW9uIChuYW1lLCBzb2NrZXQpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnb2JqZWN0J11dKTtcclxuXHJcbiAgICAgICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG9cclxuICAgICAgICBsZXQgbW9kZWwgPSB0aGl6Lm1vZGVsc1tuYW1lXTtcclxuXHJcbiAgICAgICAgLy8gU2kgbm8gZXhpc3RlIGVsIG1vZGVsbyBjcmVhclxyXG4gICAgICAgIGlmKCFtb2RlbCl7XHJcbiAgICAgICAgICBtb2RlbCA9IGlkYk1vZGVsKHRoaXosIG5hbWUsIHNvY2tldCB8fCAkc29ja2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEd1YXJkYXIgZWwgbW9kZWxvIGVuIGxvcyBtb2RlbG9zXHJcbiAgICAgICAgdGhpei5tb2RlbHNbbmFtZV0gPSBtb2RlbDtcclxuXHJcbiAgICAgICAgLy8gUmV0b3JuYXIgZWwgbW9kZWxvXHJcbiAgICAgICAgcmV0dXJuIG1vZGVsO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcclxuICAgICAgdGhpei5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIG1vZGVsSWQpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XHJcbiAgICAgICAgICBycS5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUobW9kZWxOYW1lLCBtb2RlbElkKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXHJcbiAgICB0aGl6LmNyZWF0ZUluZGV4ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xyXG4gICAgICAgIHJxLnRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG1vZGVsTmFtZSkuY3JlYXRlSW5kZXgoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgdW5hIHRyYW5zYWNjacOzblxyXG4gICAgdGhpei50cmFuc2FjdGlvbiA9IGZ1bmN0aW9uKG1vZGVsTmFtZSwgcGVybXMsIGFjdGlvbikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdmdW5jdGlvbiddKTtcclxuXHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgLy8gQ3VhbmRvIHNlIGFicmEgbGEgQkRcclxuICAgICAgJG9wZW5EZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XHJcbiAgICAgICAgY29uc3QgdHggPSBycS5yZXN1bHQudHJhbnNhY3Rpb24obW9kZWxOYW1lLCBwZXJtcyk7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYWN0aW9uKHR4KTtcclxuXHJcbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxyXG4gICAgICAgIHR4Lm9uY29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCwgcmVzdWx0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxyXG4gICAgICAgIHR4Lm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdCh0eC5lcnJvcik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBPYnRpZW5lIHVuIGVsZW1lbnRvIHBvciBzdSBrZXlcclxuICAgIHRoaXouZ2V0ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwga2V5KSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3N0cmluZycsICdudW1iZXInXV0pO1xyXG5cclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxyXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWRvbmx5JywgZnVuY3Rpb24gKHR4KSB7XHJcbiAgICAgICAgY29uc3QgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLmdldChrZXkpO1xyXG5cclxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXHJcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUocnEucmVzdWx0LCBldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICBycS5vbmVycm9yICA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBJbnNlcnRhIHVuIHJlZ2lzdHJvIGVuIGVsIG1vZGVsb1xyXG4gICAgdGhpei5wdXQgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCB2YWx1ZXMpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnXSk7XHJcblxyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuXHJcbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXHJcbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZHdyaXRlJywgZnVuY3Rpb24gKHR4KSB7XHJcbiAgICAgICAgY29uc3QgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLnB1dCh2YWx1ZXMpO1xyXG5cclxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXHJcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoZXZlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXHJcbiAgICAgICAgcnEub25lcnJvciAgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIC8vIENvdWxkIGNhbGwgcnEucHJldmVudERlZmF1bHQoKSB0byBwcmV2ZW50IHRoZSB0cmFuc2FjdGlvbiBmcm9tIGFib3J0aW5nLlxyXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRWxpbWluYSB1biBvYmpldG8gcG9yIHN1IGtleVxyXG4gICAgdGhpei5kZWxldGUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBrZXkpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnc3RyaW5nJywgJ251bWJlciddXSk7XHJcblxyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuXHJcbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXHJcbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZHdyaXRlJywgZnVuY3Rpb24gKHR4KSB7XHJcbiAgICAgICAgY29uc3QgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLmRlbGV0ZShrZXkpO1xyXG5cclxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXHJcbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoZXZlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXHJcbiAgICAgICAgcnEub25lcnJvciAgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIC8vIENvdWxkIGNhbGwgcnEucHJldmVudERlZmF1bHQoKSB0byBwcmV2ZW50IHRoZSB0cmFuc2FjdGlvbiBmcm9tIGFib3J0aW5nLlxyXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICAgIH07XHJcbiAgICAvLyBCdXNjYXIgZW4gZWwgbW9kZWxvXHJcbiAgICB0aGl6Lm9wZW5DdXJzb3IgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBmaWx0ZXJzLCBlYWNoQ2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddLCAnZnVuY3Rpb24nXSk7XHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG5cclxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cclxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xyXG4gICAgICAgIGNvbnN0IHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5vcGVuQ3Vyc29yKCk7XHJcblxyXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gcnEucmVzdWx0O1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBObyBtb3JlIG1hdGNoaW5nIHJlY29yZHMuXHJcbiAgICAgICAgICBpZiAoY3Vyc29yKXtcclxuICAgICAgICAgICAgZWFjaENiKGN1cnNvci52YWx1ZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIC8vIEJ1c2NhciBzaWd1aWVudGVcclxuICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhciBhbGlhcyBwYXJhIGxvcyBldmVudG9zIGVubGF6YXIgY2FsbGJhY2tzIGEgbG9zIGV2ZW50b3NcclxuICAgIGxldCBkZWZlcmVkcztcclxuICAgICAgT2JqZWN0LmtleXMoZGVmZXJlZHMgPSB7XHJcbiAgICAgICAgb25PcGVuOiAkb3BlbkRlZmVyZWQsXHJcbiAgICAgICAgb25VcGdyYWRlTmVlZGVkOiAkdXBncmFkZU5lZWRlZERlZmVyZWQsXHJcbiAgICAgICAgb25Tb2NrZXRDb25uZWN0ZWQ6ICRzb2NrZXRDb25uZWN0ZWREZWZlcmVkXHJcbiAgICAgIH0pLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgY29uc3QgdGV4dCA9ICRkYk5hbWUrJy52JysoJGRiVmVyc2lvbnx8MSkrJzogJytrZXk7XHJcbiAgICAgICAgICBpZiAoZXJyKXtcclxuICAgICAgICAgICAgJGxvZy5lcnJvcih0ZXh0LCBlcnIpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGxvZy5sb2codGV4dCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpeltrZXldID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XHJcbiAgICAgICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShjYik7XHJcbiAgICAgICAgICByZXR1cm4gdGhpejtcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGlkYjtcclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYlNlcnZpY2U7XG5mdW5jdGlvbiBpZGJTZXJ2aWNlKCRsb2csIHFzLCBpZGJVdGlscywgaWRiRXZlbnRzLCBpZGJNb2RlbCkge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cblxuICB2YXIgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xuICAvLyBObyB1c2UgXCJjb25zdCBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXG4gIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxuICB2YXIgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xuICB2YXIgSURCS2V5UmFuZ2UgPSB3aW5kb3cuSURCS2V5UmFuZ2UgfHwgd2luZG93LndlYmtpdElEQktleVJhbmdlIHx8IHdpbmRvdy5tc0lEQktleVJhbmdlO1xuICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxuXG4gIGlmICghaW5kZXhlZERCKSB7XG4gICAgYWxlcnQoXCJTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXNcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gQ2xhc2UgcGFyYSBsYSBjcmVhY2nDs24gZGUgaW5zdGFuY2lhcyBkZSBsYSBCRFxuICBmdW5jdGlvbiBpZGIoJGRiTmFtZSwgJGRiVmVyc2lvbiwgJHNvY2tldCkge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ251bWJlcicsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgLy8gTWFuZWphZG9yZXMgZGUgZXZlbnRvcy5cbiAgICB2YXIgJGV2ZW50c0NhbGxiYWNrcyA9IHt9O1xuICAgIHZhciAkdXBncmFkZU5lZWRlZERlZmVyZWQgPSBxcy5kZWZlcigpO1xuICAgIHZhciAkb3BlbkRlZmVyZWQgPSBxcy5kZWZlcigpO1xuICAgIHZhciAkc29ja2V0Q29ubmVjdGVkRGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgdmFyICRvcGVuZWQgPSBmYWxzZTtcblxuICAgIC8vIEluc3RhbmNpYSBkZSBsYSBiYXNlIGRlIGRhdG9zO1xuICAgIHZhciAkcmVxdWVzdCA9IG51bGw7XG4gICAgdGhpei5tb2RlbHMgPSB7fTtcblxuICAgIC8vIEFncmVnYXIgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xuICAgIHRoaXouYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkge1xuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnB1c2goY2IpO1xuICAgIH07XG5cbiAgICAvL1JlbXVldmUgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xuICAgIHRoaXoudW5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSByZXR1cm47XG5cbiAgICAgIC8vIEJ1c2NhciBlbCBjYlxuICAgICAgdmFyIGlkeCA9ICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5pbmRleE9mKGNiKTtcblxuICAgICAgLy8gU2kgc2UgZW5jb250cm8gZWwgY2IgcmVtb3ZlcmxvXG4gICAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gRGlzcGFyYSB1biBldmVudG9cbiAgICB0aGl6LnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcblxuICAgICAgJGxvZy5sb2coJGRiTmFtZSArICcudicgKyAoJGRiVmVyc2lvbiB8fCAxKSArICc6ICcgKyBldmVudE5hbWUpO1xuXG4gICAgICBmb3IgKHZhciBpIGluICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkge1xuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpeiwgYXJncyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIENhbGxiYWNrcyBwYXJhIGxvcyBlcnJvcmVzXG4gICAgdGhpei5lcnJvciA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgdGhpei5iaW5kKGlkYkV2ZW50cy5EQl9FUlJPUiwgY2IpO1xuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIC8vIEFicmlyIHVuYSBCYXNlIGRlIGRhdG9zLlxuICAgIHRoaXoub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgkb3BlbmVkKSByZXR1cm4gJG9wZW5EZWZlcmVkO1xuXG4gICAgICAvLyBDcmVhciB1biBudWV2byBkZWZlclxuICAgICAgJG9wZW5lZCA9IHRydWU7XG5cbiAgICAgIC8vIGRlamFtb3MgYWJpZXJ0YSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcbiAgICAgIGZ1bmN0aW9uIHJlYWR5KCkge1xuXG4gICAgICAgIHZhciBycSA9IGluZGV4ZWREQi5vcGVuKCRkYk5hbWUsICRkYlZlcnNpb24pO1xuXG4gICAgICAgIHJxLm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLnJlc3VsdCFcbiAgICAgICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucmVzb2x2ZShldmVudCwgcnEpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlbCByZXN1bHRhZG9cbiAgICAgICAgcnEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxuICAgICAgICAgICRyZXF1ZXN0ID0gcnE7XG5cbiAgICAgICAgICAvLyBBc2luZ2FyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzIGEgbGEgQkRcbiAgICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAkbG9nLmVycm9yKCdEYXRhYmFzZSBlcnJvcjogJyArIGV2ZW50LnRhcmdldC5lcnJvckNvZGUpO1xuICAgICAgICAgICAgdGhpei50cmlnZ2VyKGlkYkV2ZW50cy5EQl9FUlJPUiwgW2V2ZW50XSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBycSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGUgZXJyb3Jlc1xuICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCBycS5lcnJvckNvZGUhXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAkb3BlbkRlZmVyZWQucmVqZWN0KHJxLmVycm9yQ29kZSwgZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKCRkYk5hbWUpLm9uc3VjY2VzcyA9IHJlYWR5O1xuICAgICAgLy8gcmVhZHkoKTtcblxuICAgICAgcmV0dXJuICRvcGVuRGVmZXJlZDtcbiAgICB9O1xuXG4gICAgLy8gQWdyZWdhIHVuIG51ZXZvIG1vZGVsb1xuICAgIHRoaXoubW9kZWwgPSBmdW5jdGlvbiAobmFtZSwgc29ja2V0KSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnb2JqZWN0J11dKTtcblxuICAgICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG9cbiAgICAgIHZhciBtb2RlbCA9IHRoaXoubW9kZWxzW25hbWVdO1xuXG4gICAgICAvLyBTaSBubyBleGlzdGUgZWwgbW9kZWxvIGNyZWFyXG4gICAgICBpZiAoIW1vZGVsKSB7XG4gICAgICAgIG1vZGVsID0gaWRiTW9kZWwodGhpeiwgbmFtZSwgc29ja2V0IHx8ICRzb2NrZXQpO1xuICAgICAgfVxuXG4gICAgICAvLyBHdWFyZGFyIGVsIG1vZGVsbyBlbiBsb3MgbW9kZWxvc1xuICAgICAgdGhpei5tb2RlbHNbbmFtZV0gPSBtb2RlbDtcblxuICAgICAgLy8gUmV0b3JuYXIgZWwgbW9kZWxvXG4gICAgICByZXR1cm4gbW9kZWw7XG4gICAgfTtcblxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxuICAgIHRoaXouY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBtb2RlbElkKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XG4gICAgICAgIHJxLnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShtb2RlbE5hbWUsIG1vZGVsSWQpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxuICAgIHRoaXouY3JlYXRlSW5kZXggPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XG4gICAgICAgIHJxLnRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG1vZGVsTmFtZSkuY3JlYXRlSW5kZXgoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIENyZWEgdW5hIHRyYW5zYWNjacOzblxuICAgIHRoaXoudHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBwZXJtcywgYWN0aW9uKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAvLyBDdWFuZG8gc2UgYWJyYSBsYSBCRFxuICAgICAgJG9wZW5EZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XG4gICAgICAgIHZhciB0eCA9IHJxLnJlc3VsdC50cmFuc2FjdGlvbihtb2RlbE5hbWUsIHBlcm1zKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGFjdGlvbih0eCk7XG5cbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxuICAgICAgICB0eC5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCByZXN1bHQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXG4gICAgICAgIHR4Lm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QodHguZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBPYnRpZW5lIHVuIGVsZW1lbnRvIHBvciBzdSBrZXlcbiAgICB0aGl6LmdldCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGtleSkge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnc3RyaW5nJywgJ251bWJlciddXSk7XG5cbiAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcblxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcbiAgICAgICAgdmFyIHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5nZXQoa2V5KTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShycS5yZXN1bHQsIGV2ZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBJbnNlcnRhIHVuIHJlZ2lzdHJvIGVuIGVsIG1vZGVsb1xuICAgIHRoaXoucHV0ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgdmFsdWVzKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHgpIHtcbiAgICAgICAgdmFyIHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5wdXQodmFsdWVzKTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vIENvdWxkIGNhbGwgcnEucHJldmVudERlZmF1bHQoKSB0byBwcmV2ZW50IHRoZSB0cmFuc2FjdGlvbiBmcm9tIGFib3J0aW5nLlxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICB9O1xuXG4gICAgLy8gRWxpbWluYSB1biBvYmpldG8gcG9yIHN1IGtleVxuICAgIHRoaXouZGVsZXRlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwga2V5KSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydzdHJpbmcnLCAnbnVtYmVyJ11dKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHgpIHtcbiAgICAgICAgdmFyIHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5kZWxldGUoa2V5KTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vIENvdWxkIGNhbGwgcnEucHJldmVudERlZmF1bHQoKSB0byBwcmV2ZW50IHRoZSB0cmFuc2FjdGlvbiBmcm9tIGFib3J0aW5nLlxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGV2ZW50KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICB9O1xuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cbiAgICB0aGl6Lm9wZW5DdXJzb3IgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBmaWx0ZXJzLCBlYWNoQ2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgJ2Z1bmN0aW9uJ10pO1xuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLm9wZW5DdXJzb3IoKTtcblxuICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGN1cnNvciA9IHJxLnJlc3VsdDtcblxuICAgICAgICAgIC8vIE5vIG1vcmUgbWF0Y2hpbmcgcmVjb3Jkcy5cbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBlYWNoQ2IoY3Vyc29yLnZhbHVlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIC8vIEJ1c2NhciBzaWd1aWVudGVcbiAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBDcmVhciBhbGlhcyBwYXJhIGxvcyBldmVudG9zIGVubGF6YXIgY2FsbGJhY2tzIGEgbG9zIGV2ZW50b3NcbiAgICB2YXIgZGVmZXJlZHMgPSB2b2lkIDA7XG4gICAgT2JqZWN0LmtleXMoZGVmZXJlZHMgPSB7XG4gICAgICBvbk9wZW46ICRvcGVuRGVmZXJlZCxcbiAgICAgIG9uVXBncmFkZU5lZWRlZDogJHVwZ3JhZGVOZWVkZWREZWZlcmVkLFxuICAgICAgb25Tb2NrZXRDb25uZWN0ZWQ6ICRzb2NrZXRDb25uZWN0ZWREZWZlcmVkXG4gICAgfSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdmFyIHRleHQgPSAkZGJOYW1lICsgJy52JyArICgkZGJWZXJzaW9uIHx8IDEpICsgJzogJyArIGtleTtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICRsb2cuZXJyb3IodGV4dCwgZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkbG9nLmxvZyh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGl6W2tleV0gPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xuICAgICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShjYik7XG4gICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gaWRiO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJNb2RlbFNlcnZpY2UgKCRsb2csIHFzLCBpZGJVdGlscywgaWRiUXVlcnksIGlkYkV2ZW50cywgbGJSZXNvdXJjZSwgJHRpbWVvdXQpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gQnVzY2FyIHVuIGNhbXBvXHJcbiAgICBjb25zdCBzZWFyY2hEZWVwRmllbGQgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgY2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICBjb25zdCBmaWVsZHMgPSBmaWVsZC5zcGxpdCgnLicpO1xyXG4gICAgICBjb25zdCBsYXN0RmllbGQgPSBmaWVsZHMucG9wKCk7XHJcblxyXG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIF9zZXQob2JqKSB7XHJcbiAgICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMClcclxuICAgICAgICAgIHJldHVybiBjYihvYmosIGxhc3RGaWVsZCk7XHJcbiAgICAgICAgY29uc3QgZmllbGQgPSBmaWVsZHMuc2hpZnQoKTtcclxuICAgICAgICBpZiAodHlwZW9mIG9ialtmaWVsZF0gPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICAgICAgb2JqW2ZpZWxkXSA9IHt9O1xyXG4gICAgICAgIHJldHVybiBfc2V0KG9ialtmaWVsZF0pO1xyXG4gICAgICB9KShvYmopO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXHJcbiAgICBjb25zdCBnZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gKG9iaiwgZmllbGQpIHtcclxuICAgICAgcmV0dXJuIHNlYXJjaERlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cclxuICAgIGNvbnN0IHNldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgdmFsdWUpIHtcclxuICAgICAgc2VhcmNoRGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgICAgIG9ialtsYXN0RmllbGRdID0gdmFsdWU7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gb2JqO1xyXG4gICAgfTtcclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIGlkYk1vZGVsICgkZGIsICRtb2RlbE5hbWUsICRzb2NrZXQpIHtcclxuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW251bGwgLCdzdHJpbmcnXSk7XHJcblxyXG4gICAgLy8gQ2xhdmUgZGVsIG1vZGVsb1xyXG4gICAgY29uc3QgJGlkID0geyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OiB0cnVlIH07XHJcbiAgICBjb25zdCAkZXZlbnRzSGFuZGxlcnMgPSB7fTtcclxuICAgIGNvbnN0ICRpbnN0YW5jZXMgPSB7fTtcclxuICAgIGxldCAkZmllbGRzID0ge307XHJcbiAgICBsZXQgJHJlbW90ZSA9IG51bGw7XHJcbiAgICBsZXQgJHZlcnNpb25pbmcgPSBudWxsO1xyXG5cclxuICAgIC8vIENvbnN0dWN0b3IgZGVsIG1vZGVsb1xyXG4gICAgZnVuY3Rpb24gTW9kZWwoZGF0YSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIHRoaXouJHJlc29sdmVkID0gZmFsc2U7XHJcblxyXG4gICAgICB0aGl6LiRsb2FkZWQgPSBmYWxzZTtcclxuICAgICAgdGhpei4kbG9jYWxMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgdGhpei4kcmVtb3RlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgIFxyXG4gICAgICB0aGl6LiRsb2NhbFZhbHVlcyA9IHt9O1xyXG4gICAgICB0aGl6LiRyZW1vdGVWYWx1ZXMgPSB7fTtcclxuXHJcbiAgICAgIHRoaXouJHZlcnNpb24gPSBudWxsO1xyXG4gICAgICB0aGl6LiRsb2NhbFZlcnNpb24gPSBudWxsO1xyXG4gICAgICB0aGl6LiRyZW1vdGVWZXJzaW9uID0gbnVsbDtcclxuXHJcbiAgICAgIHRoaXouJGV2ZW50c0hhbmRsZXJzID0ge307XHJcbiAgICAgIFxyXG4gICAgICBpZiAoZGF0YSl7XHJcbiAgICAgICAgdGhpei4kc2V0VmFsdWVzKGRhdGEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGl6LiRjb25zdHJ1Y3RvcihkYXRhKTtcclxuXHJcbiAgICAgIGlmICgkc29ja2V0KSB7XHJcbiAgICAgICAgdGhpei4kbGlzdGVuKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0ICRyZXN1bHRzID0gW107XHJcblxyXG4gICAgICB0aGl6XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ3VhbmRvIHNlYSBjb25zdWx0YWRvIGFncmVnYXIgbGEgY29uc3VsdGFcclxuICAgICAgICAuJGJpbmQoaWRiRXZlbnRzLk1PREVMX1FVRVJJRUQsIGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICRyZXN1bHRzLnB1c2gocmVzdWx0KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBDdWFuZG8gc2VhIGxpYmVyYWRvIGRlIGxhIGNvbnN1bHRhciBxdWl0YXIgZGUgbGFzIGNvbnN1bHRhc1xyXG4gICAgICAgIC4kYmluZChpZGJFdmVudHMuTU9ERUxfVU5RVUVSSUVELCBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICBjb25zdCBpZHggPSAkcmVzdWx0cy5pbmRleE9mKHJlc3VsdCk7XHJcbiAgICAgICAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgICAgICAgJHJlc3VsdHMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gRXZlbnRvIGRlIHF1ZSBtb2RlbG8gZXN0w6EgaW5zdGFuY2lhZG9cclxuICAgICAgICAuJGVtaXQoaWRiRXZlbnRzLk1PREVMX0lOU1RBTkNFRCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2IGVsIG5vbWJyZSBkZWwgbW9kZWxvXHJcbiAgICAgIE1vZGVsLmdldE1vZGVsTmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuICRtb2RlbE5hbWU7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xyXG4gICAgICBNb2RlbC5hdXRvSW5jcmVtZW50ID0gZnVuY3Rpb24gKGF1dG9JbmNyZW1lbnQpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnYm9vbGVhbiddKTtcclxuXHJcbiAgICAgICAgJGlkLmF1dG9JbmNyZW1lbnQgPSBhdXRvSW5jcmVtZW50O1xyXG4gICAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBBc2lnbmEgZWwgSUQgYWwgbW9kZWxvXHJcbiAgICAgIE1vZGVsLmtleVBhdGggPSBmdW5jdGlvbiAoa2V5UGF0aCkge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnXSk7XHJcblxyXG4gICAgICAgICRpZC5rZXlQYXRoID0ga2V5UGF0aDtcclxuICAgICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQ3JlYSBlbCBvYmplY3RvIHN0b3JhZ2UgcGFyYSBlbCBtb2RlbG8uXHJcbiAgICAgIE1vZGVsLmNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAkZGIuY3JlYXRlU3RvcmUoJG1vZGVsTmFtZSwgJGlkKTtcclxuICAgICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBpbmRleFxyXG4gICAgTW9kZWwuaW5kZXggPSBmdW5jdGlvbiAoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcclxuXHJcbiAgICAgICRkYi5jcmVhdGVJbmRleCgkbW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE3DqXRvZG8gcXVlIHBlcm1pdGUgbW9kaWZpY2FyIG1vZGVsLlxyXG4gICAgICBNb2RlbC5idWlsZCA9IGZ1bmN0aW9uIChidWlsZENhbGxiYWNrKSB7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgICBidWlsZENhbGxiYWNrKE1vZGVsKTtcclxuICAgICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQXNpZ25hIGxhIGVzcGVjaWZpY2FjacOzbiBkZSBsb3MgY2FtcG9zXHJcbiAgICAgIE1vZGVsLmZpZWxkcyA9IGZ1bmN0aW9uIChmaWVsZHMpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xyXG5cclxuICAgICAgICAkZmllbGRzID0ge307XHJcbiAgICAgICAgJGZpZWxkc1skaWQua2V5UGF0aF0gPSB7XHJcbiAgICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIixcclxuICAgICAgICAgIFwicmVxdWlyZWRcIjogdHJ1ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZE5hbWUpIHtcclxuICAgICAgICAgIGxldCBmaWVsZCA9IGZpZWxkc1tmaWVsZE5hbWVdO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZHNbZmllbGROYW1lXSA9PSAnc3RyaW5nJyl7XHJcbiAgICAgICAgICAgIGZpZWxkID0geyBcInR5cGVcIjogZmllbGQgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICRmaWVsZHNbZmllbGROYW1lXSA9IGZpZWxkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBDb25maWd1cmEgZWwgcmVtb3RlIGFwaTtcclxuICAgICAgTW9kZWwucmVtb3RlID0gZnVuY3Rpb24gKHVybCwgYXJncywgYWN0aW9ucykge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0JywgJ29iamVjdCddKTtcclxuXHJcbiAgICAgICAgJHJlbW90ZSA9IGxiUmVzb3VyY2UodXJsLCBhcmdzLCBhY3Rpb25zKTtcclxuICAgICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gRGV2dWVsdmUgbGEgaW5zdGFuY2lhIGRlbCAkcmVtb3RlIGRlbCBtb2RlbG9cclxuICAgICAgTW9kZWwuZ2V0UmVtb3RlID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gJHJlbW90ZTtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBjb3JyZXNwb25kaWVudGUgYWwga2V5IGRlIHVuIG9iamV0b1xyXG4gICAgICBNb2RlbC5nZXRLZXlGcm9tID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZShkYXRhLCAkaWQua2V5UGF0aCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGVsIG1vZGVsIGRlIGxhcyBndWFyZGFkYXMuIFNpIG5vIGV4aXN0ZSBlbnRvbmNlXHJcbiAgICAgIC8vIHNlIGNyZWFcclxuICAgICAgTW9kZWwuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydzdHJpbmcnLCAnbnVtYmVyJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAgIC8vIEVsIG9iamV0byBubyB0aWVuZSBJRFxyXG4gICAgICAgIGlmICgha2V5KSB7XHJcbiAgICAgICAgICByZXR1cm4gbmV3IE1vZGVsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBObyBleGlzdGUgbGEgaW5zdGFuY2lhIGVudG9uY2Ugc2UgY3JlYVxyXG4gICAgICAgIGlmICghJGluc3RhbmNlc1trZXldKXtcclxuICAgICAgICAgICRpbnN0YW5jZXNba2V5XSA9IG5ldyBNb2RlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gJGluc3RhbmNlc1trZXldO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAvLyBCdXNjYSB1biByZWdpc3RybyBlbiBsYSBvYmplY3RTdG9yZSBkZWwgbW9kZWxvLlxyXG4gICAgTW9kZWwuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xyXG5cclxuICAgICAgY29uc3QgaW5zdGFuY2UgPSBNb2RlbC5nZXRJbnN0YW5jZShrZXkpO1xyXG5cclxuICAgICAgaWYgKGluc3RhbmNlLiRsb2NhbExvYWRlZCkgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgICBcclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcbiAgICAgIFxyXG4gICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSBmYWxzZTtcclxuICAgICAgaW5zdGFuY2UuJHByb21pc2UgPSBkZWZlcmVkLnByb21pc2U7XHJcblxyXG4gICAgICAkZGIuZ2V0KCRtb2RlbE5hbWUsIGtleSkucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgaW5zdGFuY2UuJHJlc29sdmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgTW9kZWwuZ2V0VmVyc2lvbk9mKGtleSkucHJvbWlzZVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHZlcnNpb24pIHtcclxuICAgICAgICAgICAgaW5zdGFuY2UuJHNldExvY2FsVmFsdWVzKGRhdGEsIGRhdGEgJiYgdmVyc2lvbj8gdmVyc2lvbi5oYXNoIDogdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGluc3RhbmNlKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAkbG9nLmVycm9yKFsnTW9kZWwuZ2V0VmVyc2lvbk9mIGFueSBlcnJvcicsIGVycl0pXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gaW5zdGFuY2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBCdXNjYXIgZW4gZWwgbW9kZWxvXHJcbiAgICBNb2RlbC5maW5kID0gZnVuY3Rpb24gKGZpbHRlcnMpIHtcclxuXHJcbiAgICAgIHJldHVybiBuZXcgaWRiUXVlcnkoJGRiLCBNb2RlbCwgZmlsdGVycyk7O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBudWV2YXMgaW5zdGFuY2lhcyBkZSBsb3MgbW9kZWxvc1xyXG4gICAgTW9kZWwuY3JlYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIC8vIFNpIGVzIHVuIGFycmF5XHJcbiAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc3QgcmVjb3JkID0gTW9kZWwuZ2V0SW5zdGFuY2UoTW9kZWwuZ2V0S2V5RnJvbShkYXRhKSk7XHJcblxyXG4gICAgICAgIGlmIChyZWNvcmQuJGxvYWRlZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5DYW50Q3JlYXRlZExvYWRlZEluc3RhbmNlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVjb3JkLiRwdWxsKCk7XHJcblxyXG4gICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgIC8vIE9idGVuZXIgdW5hIGNvcGlhIGRlbCBhcnJheVxyXG4gICAgICBjb25zdCBhcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhKTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gW107XHJcbiAgICAgIGNvbnN0IGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XHJcblxyXG4gICAgICAoZnVuY3Rpb24gaXRlcmF0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gTm8gcXVlZGFuIGVsZW1lbnRvcyBlbiBlbCBhcnJheVxyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09IDApIHJldHVybiBkZWZlcmVkLnJlc29sdmUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXIgZWwgc2lndWllbnRlIGVsZW1lbnRvXHJcbiAgICAgICAgTW9kZWwuY3JlYXRlKGFyci5zaGlmdCgpKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgaXRlcmF0aW9uKCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgfSkoKTtcclxuXHJcbiAgICAgIC8vIERldm9sdmVyIGVsIHByb21pc2VcclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIHVuIG1vZGVsbyBwYXJhIGd1YXJkYXIgbGFzIHZlcnNpb25lcyBkZWwgbW9kZWxvIGFjdHVhbFxyXG4gICAgTW9kZWwudmVyc2lvbmluZyA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGNiKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgbW9kZWxOYW1lID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY2IgPSBtb2RlbE5hbWU7XHJcbiAgICAgICAgbW9kZWxOYW1lID0gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKFttb2RlbE5hbWUsIGNiXSwgW1snc3RyaW5nJywgJ3VuZGVmaW5lZCddLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICBpZiAoISR2ZXJzaW9uaW5nKSB7XHJcblxyXG4gICAgICAgIC8vIFNpIGVsIG1vZGVsIG5vIHRpZW5lIG5vbWJyZSBzZSBhZ3JlZ2FcclxuICAgICAgICBpZiAoIW1vZGVsTmFtZSl7XHJcbiAgICAgICAgICBtb2RlbE5hbWUgPSAkbW9kZWxOYW1lKydfdmVyc2lvbmluZyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDcmVhciBtb2RlbG8gcGFyYSBlbCBtYW5lam8gZGUgZGF0b3NcclxuICAgICAgICAkdmVyc2lvbmluZyA9ICRkYi5tb2RlbChtb2RlbE5hbWUpXHJcbiAgICAgICAgICAuYXV0b0luY3JlbWVudChmYWxzZSlcclxuICAgICAgICAgIC5rZXlQYXRoKCRpZC5rZXlQYXRoKVxyXG4gICAgICAgICAgLmZpZWxkcyh7XHJcbiAgICAgICAgICAgIFwiaGFzaFwiOiB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSxcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNiKSBjYigkdmVyc2lvbmluZyk7XHJcblxyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGUgbGEgdmVyc2lvbiBsb2NhbCBkZWwgcmVnaXN0cm9cclxuICAgIE1vZGVsLmdldFZlcnNpb25PZiA9IGZ1bmN0aW9uIChrZXkpIHsgXHJcblxyXG4gICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuXHJcbiAgICAgIGlmICgkdmVyc2lvbmluZykge1xyXG4gICAgICAgICR2ZXJzaW9uaW5nLmdldChrZXkpLiRwcm9taXNlXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAodmVyc2lvbikge1xyXG4gICAgICAgICAgICBkZWZlcmVkLnJlc29sdmUodmVyc2lvbik7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZGVmZXJlZC5yZWplY3QobnVsbCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkZWZlcmVkLnJlc29sdmUobnVsbCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQWdyZWdhIHVuIG1hbmRlamFkb3IgZGUgZXZlbnRvcyBhbCBtb2RlbG9cclxuICAgICAgTW9kZWwuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgICBpZiAoISRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgICAkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvIGRlbCBtb2RlbFxyXG4gICAgICBNb2RlbC5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xyXG4gICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ3VuZGVmaW5lZCcsICdhcnJheSddXSk7XHJcblxyXG4gICAgICAgIGlmICgkZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSkge1xyXG4gICAgICAgICAgJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ubWFwKGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgICBjYi5hcHBseShNb2RlbCwgYXJncyB8fCBbXSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxyXG4gICAgICBNb2RlbC5wcm90b3R5cGUuJGdldCA9IGZ1bmN0aW9uIChmaWVsZCkge1xyXG5cclxuICAgICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCk7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cclxuICAgICAgTW9kZWwucHJvdG90eXBlLiRzZXQgPSBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKHRoaXMsIGZpZWxkLCB2YWx1ZSk7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gRGV2dWVsdmUgdW4gb2JqZXRvIGNvbiBsYXMgcHJvcGllZGFkZXMgZGVsIHJlZ2lzdHJvXHJcbiAgICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0VmFsdWVzID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgICBjb25zdCB2YWx1ZXMgPSB7fTtcclxuICAgICAgICBkYXRhID0gZGF0YSB8fCB0aGlzO1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cygkZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgICAgICBzZXRGaWVsZFZhbHVlKHZhbHVlcywgZmllbGQsIGdldEZpZWxkVmFsdWUoZGF0YSwgZmllbGQpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBEZXZ1ZWx2ZSB1biBvYmpldG8gY29uIGxhcyBwcm9waWVkYWRlcyBsb2NhbGVzIGRlbCByZWdpc3Ryb1xyXG4gICAgICBNb2RlbC5wcm90b3R5cGUuJGdldExvY2FsVmFsdWVzID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy4kZ2V0VmFsdWVzKHRoaXMuJGxvY2FsVmFsdWVzKTtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBEZXZ1ZWx2ZSB1biBtb2RlbG8gY29uIGxhcyBwcm9waWVkYWRlcyByZW1vdGFzIGRlbCByZWdpc3Ryb1xyXG4gICAgICBNb2RlbC5wcm90b3R5cGUuJGdldFJlbW90ZVZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGdldFZhbHVlcyh0aGlzLiRyZW1vdGVWYWx1ZXMpO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIEFzaWduYSBsYXMgcHJvcGllZGFkZXMgZGVsIHJlZ2lzdHJvXHJcbiAgICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0VmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpei4kdmVyc2lvbiA9IHZlcnNpb247XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICAgIHNldEZpZWxkVmFsdWUodGhpeiwgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpei4kbG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQXNpZ25hIGxhcyBwcm9waWVkYWRlcyBsb2NhbGVzIGRlbCByZWdpc3Ryb1xyXG4gICAgICBNb2RlbC5wcm90b3R5cGUuJHNldExvY2FsVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpei4kbG9jYWxWZXJzaW9uID0gdmVyc2lvbjtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRsb2NhbFZhbHVlcywgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgIHRoaXouJGxvY2FsTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgIGlmICghdGhpei4kbG9hZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXouJHNldFZhbHVlcyhkYXRhLCB2ZXJzaW9uKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIHJlbW90YXMgZGVsIHJlZ2lzdHJvXHJcbiAgICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0UmVtb3RlVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnc3RyaW5nJywgJ3VuZGVmaW5lZCddXSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpei4kcmVtb3RlVmVyc2lvbiA9IHZlcnNpb247XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICAgIHNldEZpZWxkVmFsdWUodGhpei4kcmVtb3RlVmFsdWVzLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgdGhpei4kcmVtb3RlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgIGlmICghdGhpei4kbG9hZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXouJHNldFZhbHVlcyhkYXRhLCB2ZXJzaW9uKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgZWwgSUQgZGVsIG9iamV0b1xyXG4gICAgTW9kZWwucHJvdG90eXBlLiRzZXRLZXkgPSBmdW5jdGlvbiAobmV3S2V5KSB7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCBvbGRLZXkgPSBNb2RlbC5nZXRLZXlGcm9tKHRoaXMpO1xyXG5cclxuICAgICAgTW9kZWwuc2VhcmNoRGVlcEZpZWxkKHRoaXMsICRpZC5rZXlQYXRoLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IG5ld0tleTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAob2xkS2V5ICE9PSBuZXdLZXkpIHtcclxuXHJcbiAgICAgICAgaWYgKG9sZEtleSAmJiAkaW5zdGFuY2VzW29sZEtleV0gJiYgJGluc3RhbmNlc1tvbGRLZXldICE9IHRoaXMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuSW5zdGFuY2VPZk9sZEtleUlzTm90U2FtZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV3S2V5ICYmICRpbnN0YW5jZXNbbmV3S2V5XSAmJiAkaW5zdGFuY2VzW25ld0tleV0gIT0gdGhpcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5JbnN0YW5jZU9mTmV3S2V5SXNOb3RTYW1lJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFbGltaW5hciBhbnRlcmlvclxyXG4gICAgICAgIGlmIChvbGRLZXkgJiYgJGluc3RhbmNlc1tvbGRLZXldKSB7XHJcbiAgICAgICAgICBkZWxldGUgJGluc3RhbmNlc1tvbGRLZXldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWdyZWdhciBudWV2YVxyXG4gICAgICAgIGlmIChuZXdLZXkgJiYgISRpbnN0YW5jZXNbbmV3S2V5XSkge1xyXG4gICAgICAgICAgJGluc3RhbmNlc1tuZXdLZXldID0gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29uc3R1cmN0b3IgcXVlIHNlIHB1ZWRlIHNvYnJlIGVzY3JpYmlyXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJGNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIH07XHJcblxyXG4gICAgLy8gR3VhcmRhIGxvcyBkYXRvcyBkZWwgb2JqZXRvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuJHB1bGwgPSBmdW5jdGlvbiAobmV3VmFsdWVzLCB2ZXJzaW9uKXsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xyXG4gICAgICBcclxuICAgICAgY29uc3QgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcblxyXG4gICAgICBpZiAobmV3VmFsdWVzKSB7XHJcbiAgICAgICAgbmV3VmFsdWVzID0gdGhpei4kZ2V0VmFsdWVzKG5ld1ZhbHVlcyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV3VmFsdWVzID0gdGhpei4kZ2V0UmVtb3RlVmFsdWVzKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG5ld0tleSA9IE1vZGVsLmdldEtleUZyb20obmV3VmFsdWVzKTtcclxuICAgICAgY29uc3Qgb2xkVmFsdWVzID0gdGhpei4kZ2V0TG9jYWxWYWx1ZXMoKTtcclxuICAgICAgY29uc3Qgb2xkS2V5ID0gTW9kZWwuZ2V0S2V5RnJvbShvbGRWYWx1ZXMpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2cobmV3S2V5LCBvbGRLZXkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhuZXdWYWx1ZXMsIG9sZFZhbHVlcyk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEZ1bmNpb24gcXVlIGhhY2UgZXNjdWNoYXJzIGxvcyBtZW5zYWplcyBkZWwgc29ja2V0IHBhcmEgZWwgbW9kZWxcclxuICAgICAgTW9kZWwucHJvdG90eXBlLiRsaXN0ZW4gPSBmdW5jdGlvbiAoKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICAgIGlmICghJHNvY2tldCkgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5Eb2VzTm90SGF2ZVNvY2tldEluc3RhbmNlJyk7XHJcblxyXG4gICAgICAgIC8vIENyZWFyIHVuYSBzdWJzY3JpcGNpb24gYWwgc29ja2V0IHBhcmEgY3VhbmRvIHNlIHJlY2liYW4gZGF0b3NcclxuICAgICAgICAvLyBwYXJhIGxhIGluc3RhbmNpYSBhY3R1YWxcclxuICAgICAgICAkc29ja2V0LnN1YnNjcmliZSh7XHJcbiAgICAgICAgICBtb2RlbE5hbWU6ICRtb2RlbE5hbWUsXHJcbiAgICAgICAgICBldmVudE5hbWU6ICd1cGRhdGUnLFxyXG4gICAgICAgICAgbW9kZWxJZDogdGhpei4kZ2V0KCRpZC5rZXlQYXRoKSxcclxuICAgICAgICB9LCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgIC8vIEEgcmVjaWJpciBkYXRvcyBkZWwgc29ja2V0IGFzaWduYXIgbG9zIHZhbG9yZXNcclxuICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gRW1pdGlyIGV2ZW50byBkZSBkYXRvcyByZWNpYmlkb3IgcGFyYSBlbCBtb2RlbG9cclxuICAgICAgICAgICAgdGhpei4kc2V0UmVtb3RlVmFsdWVzKGRhdGEudmFsdWVzLCBkYXRhLnZlcnNpb24pO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAvLyBBZ3JlZ2EgdW4gbWFuZGVqYWRvciBkZSBldmVudG9zXHJcbiAgICAgIE1vZGVsLnByb3RvdHlwZS4kYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAgIHRoaXMuJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gRGlzcGFyYSB1biBldmVudG9cclxuICAgICAgTW9kZWwucHJvdG90eXBlLiRlbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWyd1bmRlZmluZWQnLCAnYXJyYXknXV0pO1xyXG5cclxuICAgICAgICAvLyBMbGFtYXIgZWwgZXZlbnRvIHBhcmEgZWwgbW9kZWxvXHJcbiAgICAgICAgTW9kZWwuZW1pdChldmVudE5hbWUsIFt0aGl6LCBbXS5jb25jYXQoW3RoaXpdKS5jb25jYXQoYXJncyldKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXouJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAgIHRoaXouJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ubWFwKGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgICBjYi5hcHBseSh0aGl6LCBhcmdzIHx8IFtdKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgTW9kZWwuJGluc3RhbmNlcyA9ICRpbnN0YW5jZXM7XHJcblxyXG4gICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICB9O1xyXG5cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJNb2RlbFNlcnZpY2U7XG5mdW5jdGlvbiBpZGJNb2RlbFNlcnZpY2UoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJRdWVyeSwgaWRiRXZlbnRzLCBsYlJlc291cmNlLCAkdGltZW91dCkge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIEJ1c2NhciB1biBjYW1wb1xuXG4gIHZhciBzZWFyY2hEZWVwRmllbGQgPSBmdW5jdGlvbiBzZWFyY2hEZWVwRmllbGQob2JqLCBmaWVsZCwgY2IpIHtcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgIHZhciBmaWVsZHMgPSBmaWVsZC5zcGxpdCgnLicpO1xuICAgIHZhciBsYXN0RmllbGQgPSBmaWVsZHMucG9wKCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gX3NldChvYmopIHtcbiAgICAgIGlmIChmaWVsZHMubGVuZ3RoID09IDApIHJldHVybiBjYihvYmosIGxhc3RGaWVsZCk7XG4gICAgICB2YXIgZmllbGQgPSBmaWVsZHMuc2hpZnQoKTtcbiAgICAgIGlmICh0eXBlb2Ygb2JqW2ZpZWxkXSA9PT0gJ3VuZGVmaW5lZCcpIG9ialtmaWVsZF0gPSB7fTtcbiAgICAgIHJldHVybiBfc2V0KG9ialtmaWVsZF0pO1xuICAgIH0ob2JqKTtcbiAgfTtcblxuICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cbiAgdmFyIGdldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiBnZXRGaWVsZFZhbHVlKG9iaiwgZmllbGQpIHtcbiAgICByZXR1cm4gc2VhcmNoRGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xuICB2YXIgc2V0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIHNldEZpZWxkVmFsdWUob2JqLCBmaWVsZCwgdmFsdWUpIHtcbiAgICBzZWFyY2hEZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGlkYk1vZGVsKCRkYiwgJG1vZGVsTmFtZSwgJHNvY2tldCkge1xuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW251bGwsICdzdHJpbmcnXSk7XG5cbiAgICAvLyBDbGF2ZSBkZWwgbW9kZWxvXG4gICAgdmFyICRpZCA9IHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9O1xuICAgIHZhciAkZXZlbnRzSGFuZGxlcnMgPSB7fTtcbiAgICB2YXIgJGluc3RhbmNlcyA9IHt9O1xuICAgIHZhciAkZmllbGRzID0ge307XG4gICAgdmFyICRyZW1vdGUgPSBudWxsO1xuICAgIHZhciAkdmVyc2lvbmluZyA9IG51bGw7XG5cbiAgICAvLyBDb25zdHVjdG9yIGRlbCBtb2RlbG9cbiAgICBmdW5jdGlvbiBNb2RlbChkYXRhKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xuXG4gICAgICB0aGl6LiRsb2FkZWQgPSBmYWxzZTtcbiAgICAgIHRoaXouJGxvY2FsTG9hZGVkID0gZmFsc2U7XG4gICAgICB0aGl6LiRyZW1vdGVMb2FkZWQgPSBmYWxzZTtcblxuICAgICAgdGhpei4kbG9jYWxWYWx1ZXMgPSB7fTtcbiAgICAgIHRoaXouJHJlbW90ZVZhbHVlcyA9IHt9O1xuXG4gICAgICB0aGl6LiR2ZXJzaW9uID0gbnVsbDtcbiAgICAgIHRoaXouJGxvY2FsVmVyc2lvbiA9IG51bGw7XG4gICAgICB0aGl6LiRyZW1vdGVWZXJzaW9uID0gbnVsbDtcblxuICAgICAgdGhpei4kZXZlbnRzSGFuZGxlcnMgPSB7fTtcblxuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgdGhpei4kc2V0VmFsdWVzKGRhdGEpO1xuICAgICAgfVxuXG4gICAgICB0aGl6LiRjb25zdHJ1Y3RvcihkYXRhKTtcblxuICAgICAgaWYgKCRzb2NrZXQpIHtcbiAgICAgICAgdGhpei4kbGlzdGVuKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciAkcmVzdWx0cyA9IFtdO1xuXG4gICAgICB0aGl6XG5cbiAgICAgIC8vIEN1YW5kbyBzZWEgY29uc3VsdGFkbyBhZ3JlZ2FyIGxhIGNvbnN1bHRhXG4gICAgICAuJGJpbmQoaWRiRXZlbnRzLk1PREVMX1FVRVJJRUQsIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgJHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgfSlcblxuICAgICAgLy8gQ3VhbmRvIHNlYSBsaWJlcmFkbyBkZSBsYSBjb25zdWx0YXIgcXVpdGFyIGRlIGxhcyBjb25zdWx0YXNcbiAgICAgIC4kYmluZChpZGJFdmVudHMuTU9ERUxfVU5RVUVSSUVELCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIHZhciBpZHggPSAkcmVzdWx0cy5pbmRleE9mKHJlc3VsdCk7XG4gICAgICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgICAgICAkcmVzdWx0cy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8gRXZlbnRvIGRlIHF1ZSBtb2RlbG8gZXN0w6EgaW5zdGFuY2lhZG9cbiAgICAgIC4kZW1pdChpZGJFdmVudHMuTU9ERUxfSU5TVEFOQ0VEKTtcbiAgICB9O1xuXG4gICAgLy8gRGV2dWVsdiBlbCBub21icmUgZGVsIG1vZGVsb1xuICAgIE1vZGVsLmdldE1vZGVsTmFtZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgcmV0dXJuICRtb2RlbE5hbWU7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cbiAgICBNb2RlbC5hdXRvSW5jcmVtZW50ID0gZnVuY3Rpb24gKGF1dG9JbmNyZW1lbnQpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydib29sZWFuJ10pO1xuXG4gICAgICAkaWQuYXV0b0luY3JlbWVudCA9IGF1dG9JbmNyZW1lbnQ7XG4gICAgICByZXR1cm4gTW9kZWw7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cbiAgICBNb2RlbC5rZXlQYXRoID0gZnVuY3Rpb24gKGtleVBhdGgpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnXSk7XG5cbiAgICAgICRpZC5rZXlQYXRoID0ga2V5UGF0aDtcbiAgICAgIHJldHVybiBNb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RvIHN0b3JhZ2UgcGFyYSBlbCBtb2RlbG8uXG4gICAgTW9kZWwuY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICRkYi5jcmVhdGVTdG9yZSgkbW9kZWxOYW1lLCAkaWQpO1xuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBBZ3JlZ2EgdW4gaW5kZXhcbiAgICBNb2RlbC5pbmRleCA9IGZ1bmN0aW9uIChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xuXG4gICAgICAkZGIuY3JlYXRlSW5kZXgoJG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBNw6l0b2RvIHF1ZSBwZXJtaXRlIG1vZGlmaWNhciBtb2RlbC5cbiAgICBNb2RlbC5idWlsZCA9IGZ1bmN0aW9uIChidWlsZENhbGxiYWNrKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XG5cbiAgICAgIGJ1aWxkQ2FsbGJhY2soTW9kZWwpO1xuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBBc2lnbmEgbGEgZXNwZWNpZmljYWNpw7NuIGRlIGxvcyBjYW1wb3NcbiAgICBNb2RlbC5maWVsZHMgPSBmdW5jdGlvbiAoZmllbGRzKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xuXG4gICAgICAkZmllbGRzID0ge307XG4gICAgICAkZmllbGRzWyRpZC5rZXlQYXRoXSA9IHtcbiAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCIsXG4gICAgICAgIFwicmVxdWlyZWRcIjogdHJ1ZVxuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmtleXMoZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkTmFtZSkge1xuICAgICAgICB2YXIgZmllbGQgPSBmaWVsZHNbZmllbGROYW1lXTtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZHNbZmllbGROYW1lXSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgIGZpZWxkID0geyBcInR5cGVcIjogZmllbGQgfTtcbiAgICAgICAgfVxuICAgICAgICAkZmllbGRzW2ZpZWxkTmFtZV0gPSBmaWVsZDtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gTW9kZWw7XG4gICAgfTtcblxuICAgIC8vIENvbmZpZ3VyYSBlbCByZW1vdGUgYXBpO1xuICAgIE1vZGVsLnJlbW90ZSA9IGZ1bmN0aW9uICh1cmwsIGFyZ3MsIGFjdGlvbnMpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0JywgJ29iamVjdCddKTtcblxuICAgICAgJHJlbW90ZSA9IGxiUmVzb3VyY2UodXJsLCBhcmdzLCBhY3Rpb25zKTtcbiAgICAgIHJldHVybiBNb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gRGV2dWVsdmUgbGEgaW5zdGFuY2lhIGRlbCAkcmVtb3RlIGRlbCBtb2RlbG9cbiAgICBNb2RlbC5nZXRSZW1vdGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHJldHVybiAkcmVtb3RlO1xuICAgIH07XG5cbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBjb3JyZXNwb25kaWVudGUgYWwga2V5IGRlIHVuIG9iamV0b1xuICAgIE1vZGVsLmdldEtleUZyb20gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUoZGF0YSwgJGlkLmtleVBhdGgpO1xuICAgIH07XG5cbiAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGVsIG1vZGVsIGRlIGxhcyBndWFyZGFkYXMuIFNpIG5vIGV4aXN0ZSBlbnRvbmNlXG4gICAgLy8gc2UgY3JlYVxuICAgIE1vZGVsLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydzdHJpbmcnLCAnbnVtYmVyJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIC8vIEVsIG9iamV0byBubyB0aWVuZSBJRFxuICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNb2RlbCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBObyBleGlzdGUgbGEgaW5zdGFuY2lhIGVudG9uY2Ugc2UgY3JlYVxuICAgICAgaWYgKCEkaW5zdGFuY2VzW2tleV0pIHtcbiAgICAgICAgJGluc3RhbmNlc1trZXldID0gbmV3IE1vZGVsKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkaW5zdGFuY2VzW2tleV07XG4gICAgfTtcblxuICAgIC8vIEJ1c2NhIHVuIHJlZ2lzdHJvIGVuIGxhIG9iamVjdFN0b3JlIGRlbCBtb2RlbG8uXG4gICAgTW9kZWwuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuXG4gICAgICB2YXIgaW5zdGFuY2UgPSBNb2RlbC5nZXRJbnN0YW5jZShrZXkpO1xuXG4gICAgICBpZiAoaW5zdGFuY2UuJGxvY2FsTG9hZGVkKSByZXR1cm4gaW5zdGFuY2U7XG5cbiAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoKTtcblxuICAgICAgaW5zdGFuY2UuJHJlc29sdmVkID0gZmFsc2U7XG4gICAgICBpbnN0YW5jZS4kcHJvbWlzZSA9IGRlZmVyZWQucHJvbWlzZTtcblxuICAgICAgJGRiLmdldCgkbW9kZWxOYW1lLCBrZXkpLnByb21pc2UudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSB0cnVlO1xuXG4gICAgICAgIE1vZGVsLmdldFZlcnNpb25PZihrZXkpLnByb21pc2UudGhlbihmdW5jdGlvbiAodmVyc2lvbikge1xuICAgICAgICAgIGluc3RhbmNlLiRzZXRMb2NhbFZhbHVlcyhkYXRhLCBkYXRhICYmIHZlcnNpb24gPyB2ZXJzaW9uLmhhc2ggOiB1bmRlZmluZWQpO1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShpbnN0YW5jZSk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoaW5zdGFuY2UpO1xuICAgICAgICAgICRsb2cuZXJyb3IoWydNb2RlbC5nZXRWZXJzaW9uT2YgYW55IGVycm9yJywgZXJyXSk7XG4gICAgICAgIH0pO1xuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9O1xuXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xuICAgIE1vZGVsLmZpbmQgPSBmdW5jdGlvbiAoZmlsdGVycykge1xuXG4gICAgICByZXR1cm4gbmV3IGlkYlF1ZXJ5KCRkYiwgTW9kZWwsIGZpbHRlcnMpOztcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSBudWV2YXMgaW5zdGFuY2lhcyBkZSBsb3MgbW9kZWxvc1xuICAgIE1vZGVsLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAvLyBTaSBlcyB1biBhcnJheVxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHJlY29yZCA9IE1vZGVsLmdldEluc3RhbmNlKE1vZGVsLmdldEtleUZyb20oZGF0YSkpO1xuXG4gICAgICAgIGlmIChyZWNvcmQuJGxvYWRlZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuQ2FudENyZWF0ZWRMb2FkZWRJbnN0YW5jZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlY29yZC4kcHVsbCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBPYnRlbmVyIHVuYSBjb3BpYSBkZWwgYXJyYXlcbiAgICAgIHZhciBhcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhKTtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoY2IpO1xuXG4gICAgICAoZnVuY3Rpb24gaXRlcmF0aW9uKCkge1xuXG4gICAgICAgIC8vIE5vIHF1ZWRhbiBlbGVtZW50b3MgZW4gZWwgYXJyYXlcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT0gMCkgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZShyZXN1bHQpO1xuXG4gICAgICAgIC8vIENyZWFyIGVsIHNpZ3VpZW50ZSBlbGVtZW50b1xuICAgICAgICBNb2RlbC5jcmVhdGUoYXJyLnNoaWZ0KCkpLnRoZW4oZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xuICAgICAgICAgIGl0ZXJhdGlvbigpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSgpO1xuXG4gICAgICAvLyBEZXZvbHZlciBlbCBwcm9taXNlXG4gICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSB1biBtb2RlbG8gcGFyYSBndWFyZGFyIGxhcyB2ZXJzaW9uZXMgZGVsIG1vZGVsbyBhY3R1YWxcbiAgICBNb2RlbC52ZXJzaW9uaW5nID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgY2IpIHtcbiAgICAgIGlmICh0eXBlb2YgbW9kZWxOYW1lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNiID0gbW9kZWxOYW1lO1xuICAgICAgICBtb2RlbE5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShbbW9kZWxOYW1lLCBjYl0sIFtbJ3N0cmluZycsICd1bmRlZmluZWQnXSwgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICBpZiAoISR2ZXJzaW9uaW5nKSB7XG5cbiAgICAgICAgLy8gU2kgZWwgbW9kZWwgbm8gdGllbmUgbm9tYnJlIHNlIGFncmVnYVxuICAgICAgICBpZiAoIW1vZGVsTmFtZSkge1xuICAgICAgICAgIG1vZGVsTmFtZSA9ICRtb2RlbE5hbWUgKyAnX3ZlcnNpb25pbmcnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXIgbW9kZWxvIHBhcmEgZWwgbWFuZWpvIGRlIGRhdG9zXG4gICAgICAgICR2ZXJzaW9uaW5nID0gJGRiLm1vZGVsKG1vZGVsTmFtZSkuYXV0b0luY3JlbWVudChmYWxzZSkua2V5UGF0aCgkaWQua2V5UGF0aCkuZmllbGRzKHtcbiAgICAgICAgICBcImhhc2hcIjogeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYikgY2IoJHZlcnNpb25pbmcpO1xuXG4gICAgICByZXR1cm4gTW9kZWw7XG4gICAgfTtcblxuICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZSBsYSB2ZXJzaW9uIGxvY2FsIGRlbCByZWdpc3Ryb1xuICAgIE1vZGVsLmdldFZlcnNpb25PZiA9IGZ1bmN0aW9uIChrZXkpIHtcblxuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuXG4gICAgICBpZiAoJHZlcnNpb25pbmcpIHtcbiAgICAgICAgJHZlcnNpb25pbmcuZ2V0KGtleSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAodmVyc2lvbikge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZSh2ZXJzaW9uKTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlZmVyZWQucmVzb2x2ZShudWxsKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIEFncmVnYSB1biBtYW5kZWphZG9yIGRlIGV2ZW50b3MgYWwgbW9kZWxvXG4gICAgTW9kZWwuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIGlmICghJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcblxuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBEaXNwYXJhIHVuIGV2ZW50byBkZWwgbW9kZWxcbiAgICBNb2RlbC5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsndW5kZWZpbmVkJywgJ2FycmF5J11dKTtcblxuICAgICAgaWYgKCRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdLm1hcChmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICBjYi5hcHBseShNb2RlbCwgYXJncyB8fCBbXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gTW9kZWw7XG4gICAgfTtcblxuICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcbiAgICBNb2RlbC5wcm90b3R5cGUuJGdldCA9IGZ1bmN0aW9uIChmaWVsZCkge1xuXG4gICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCk7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBpbiB2YWxvciBhIHVuIGNhbXBvXG4gICAgTW9kZWwucHJvdG90eXBlLiRzZXQgPSBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XG5cbiAgICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKHRoaXMsIGZpZWxkLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIC8vIERldnVlbHZlIHVuIG9iamV0byBjb24gbGFzIHByb3BpZWRhZGVzIGRlbCByZWdpc3Ryb1xuICAgIE1vZGVsLnByb3RvdHlwZS4kZ2V0VmFsdWVzID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIHZhciB2YWx1ZXMgPSB7fTtcbiAgICAgIGRhdGEgPSBkYXRhIHx8IHRoaXM7XG5cbiAgICAgIE9iamVjdC5rZXlzKCRmaWVsZHMpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh2YWx1ZXMsIGZpZWxkLCBnZXRGaWVsZFZhbHVlKGRhdGEsIGZpZWxkKSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9O1xuXG4gICAgLy8gRGV2dWVsdmUgdW4gb2JqZXRvIGNvbiBsYXMgcHJvcGllZGFkZXMgbG9jYWxlcyBkZWwgcmVnaXN0cm9cbiAgICBNb2RlbC5wcm90b3R5cGUuJGdldExvY2FsVmFsdWVzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICByZXR1cm4gdGhpcy4kZ2V0VmFsdWVzKHRoaXMuJGxvY2FsVmFsdWVzKTtcbiAgICB9O1xuXG4gICAgLy8gRGV2dWVsdmUgdW4gbW9kZWxvIGNvbiBsYXMgcHJvcGllZGFkZXMgcmVtb3RhcyBkZWwgcmVnaXN0cm9cbiAgICBNb2RlbC5wcm90b3R5cGUuJGdldFJlbW90ZVZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgcmV0dXJuIHRoaXMuJGdldFZhbHVlcyh0aGlzLiRyZW1vdGVWYWx1ZXMpO1xuICAgIH07XG5cbiAgICAvLyBBc2lnbmEgbGFzIHByb3BpZWRhZGVzIGRlbCByZWdpc3Ryb1xuICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0VmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB0aGl6LiR2ZXJzaW9uID0gdmVyc2lvbjtcblxuICAgICAgT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXosIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpei4kbG9hZGVkID0gdHJ1ZTtcblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBsYXMgcHJvcGllZGFkZXMgbG9jYWxlcyBkZWwgcmVnaXN0cm9cbiAgICBNb2RlbC5wcm90b3R5cGUuJHNldExvY2FsVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB0aGl6LiRsb2NhbFZlcnNpb24gPSB2ZXJzaW9uO1xuXG4gICAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIHNldEZpZWxkVmFsdWUodGhpei4kbG9jYWxWYWx1ZXMsIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgdGhpei4kbG9jYWxMb2FkZWQgPSB0cnVlO1xuICAgICAgICBpZiAoIXRoaXouJGxvYWRlZCkge1xuICAgICAgICAgIHRoaXouJHNldFZhbHVlcyhkYXRhLCB2ZXJzaW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgLy8gQXNpZ25hIGxhcyBwcm9waWVkYWRlcyByZW1vdGFzIGRlbCByZWdpc3Ryb1xuICAgIE1vZGVsLnByb3RvdHlwZS4kc2V0UmVtb3RlVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEsIHZlcnNpb24pIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB0aGl6LiRyZW1vdGVWZXJzaW9uID0gdmVyc2lvbjtcblxuICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJHJlbW90ZVZhbHVlcywgZmllbGQsIGRhdGFbZmllbGRdKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICB0aGl6LiRyZW1vdGVMb2FkZWQgPSB0cnVlO1xuICAgICAgICBpZiAoIXRoaXouJGxvYWRlZCkge1xuICAgICAgICAgIHRoaXouJHNldFZhbHVlcyhkYXRhLCB2ZXJzaW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgLy8gQXNpZ25hIGVsIElEIGRlbCBvYmpldG9cbiAgICBNb2RlbC5wcm90b3R5cGUuJHNldEtleSA9IGZ1bmN0aW9uIChuZXdLZXkpIHtcblxuICAgICAgdmFyIG9sZEtleSA9IE1vZGVsLmdldEtleUZyb20odGhpcyk7XG5cbiAgICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGlzLCAkaWQua2V5UGF0aCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgIG9ialtsYXN0RmllbGRdID0gbmV3S2V5O1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChvbGRLZXkgIT09IG5ld0tleSkge1xuXG4gICAgICAgIGlmIChvbGRLZXkgJiYgJGluc3RhbmNlc1tvbGRLZXldICYmICRpbnN0YW5jZXNbb2xkS2V5XSAhPSB0aGlzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5JbnN0YW5jZU9mT2xkS2V5SXNOb3RTYW1lJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld0tleSAmJiAkaW5zdGFuY2VzW25ld0tleV0gJiYgJGluc3RhbmNlc1tuZXdLZXldICE9IHRoaXMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkluc3RhbmNlT2ZOZXdLZXlJc05vdFNhbWUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVsaW1pbmFyIGFudGVyaW9yXG4gICAgICAgIGlmIChvbGRLZXkgJiYgJGluc3RhbmNlc1tvbGRLZXldKSB7XG4gICAgICAgICAgZGVsZXRlICRpbnN0YW5jZXNbb2xkS2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFncmVnYXIgbnVldmFcbiAgICAgICAgaWYgKG5ld0tleSAmJiAhJGluc3RhbmNlc1tuZXdLZXldKSB7XG4gICAgICAgICAgJGluc3RhbmNlc1tuZXdLZXldID0gdGhpcztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLy8gQ29uc3R1cmN0b3IgcXVlIHNlIHB1ZWRlIHNvYnJlIGVzY3JpYmlyXG4gICAgTW9kZWwucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7fTtcblxuICAgIC8vIEd1YXJkYSBsb3MgZGF0b3MgZGVsIG9iamV0b1xuICAgIE1vZGVsLnByb3RvdHlwZS4kcHVsbCA9IGZ1bmN0aW9uIChuZXdWYWx1ZXMsIHZlcnNpb24pIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snb2JqZWN0JywgJ3VuZGVmaW5lZCddLCBbJ3N0cmluZycsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKCk7XG5cbiAgICAgIGlmIChuZXdWYWx1ZXMpIHtcbiAgICAgICAgbmV3VmFsdWVzID0gdGhpei4kZ2V0VmFsdWVzKG5ld1ZhbHVlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdWYWx1ZXMgPSB0aGl6LiRnZXRSZW1vdGVWYWx1ZXMoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG5ld0tleSA9IE1vZGVsLmdldEtleUZyb20obmV3VmFsdWVzKTtcbiAgICAgIHZhciBvbGRWYWx1ZXMgPSB0aGl6LiRnZXRMb2NhbFZhbHVlcygpO1xuICAgICAgdmFyIG9sZEtleSA9IE1vZGVsLmdldEtleUZyb20ob2xkVmFsdWVzKTtcblxuICAgICAgY29uc29sZS5sb2cobmV3S2V5LCBvbGRLZXkpO1xuICAgICAgY29uc29sZS5sb2cobmV3VmFsdWVzLCBvbGRWYWx1ZXMpO1xuXG4gICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICB9O1xuXG4gICAgLy8gRnVuY2lvbiBxdWUgaGFjZSBlc2N1Y2hhcnMgbG9zIG1lbnNhamVzIGRlbCBzb2NrZXQgcGFyYSBlbCBtb2RlbFxuICAgIE1vZGVsLnByb3RvdHlwZS4kbGlzdGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgaWYgKCEkc29ja2V0KSB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLkRvZXNOb3RIYXZlU29ja2V0SW5zdGFuY2UnKTtcblxuICAgICAgLy8gQ3JlYXIgdW5hIHN1YnNjcmlwY2lvbiBhbCBzb2NrZXQgcGFyYSBjdWFuZG8gc2UgcmVjaWJhbiBkYXRvc1xuICAgICAgLy8gcGFyYSBsYSBpbnN0YW5jaWEgYWN0dWFsXG4gICAgICAkc29ja2V0LnN1YnNjcmliZSh7XG4gICAgICAgIG1vZGVsTmFtZTogJG1vZGVsTmFtZSxcbiAgICAgICAgZXZlbnROYW1lOiAndXBkYXRlJyxcbiAgICAgICAgbW9kZWxJZDogdGhpei4kZ2V0KCRpZC5rZXlQYXRoKVxuICAgICAgfSwgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAvLyBBIHJlY2liaXIgZGF0b3MgZGVsIHNvY2tldCBhc2lnbmFyIGxvcyB2YWxvcmVzXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBFbWl0aXIgZXZlbnRvIGRlIGRhdG9zIHJlY2liaWRvciBwYXJhIGVsIG1vZGVsb1xuICAgICAgICAgIHRoaXouJHNldFJlbW90ZVZhbHVlcyhkYXRhLnZhbHVlcywgZGF0YS52ZXJzaW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQWdyZWdhIHVuIG1hbmRlamFkb3IgZGUgZXZlbnRvc1xuICAgIE1vZGVsLnByb3RvdHlwZS4kYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIGlmICghdGhpcy4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXSkge1xuICAgICAgICB0aGlzLiRldmVudHNIYW5kbGVyc1tldmVudE5hbWVdID0gW107XG4gICAgICB9XG5cbiAgICAgIHRoaXMuJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXG4gICAgTW9kZWwucHJvdG90eXBlLiRlbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsndW5kZWZpbmVkJywgJ2FycmF5J11dKTtcblxuICAgICAgLy8gTGxhbWFyIGVsIGV2ZW50byBwYXJhIGVsIG1vZGVsb1xuICAgICAgTW9kZWwuZW1pdChldmVudE5hbWUsIFt0aGl6LCBbXS5jb25jYXQoW3RoaXpdKS5jb25jYXQoYXJncyldKTtcblxuICAgICAgaWYgKHRoaXouJGV2ZW50c0hhbmRsZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgdGhpei4kZXZlbnRzSGFuZGxlcnNbZXZlbnROYW1lXS5tYXAoZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgY2IuYXBwbHkodGhpeiwgYXJncyB8fCBbXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgTW9kZWwuJGluc3RhbmNlcyA9ICRpbnN0YW5jZXM7XG5cbiAgICByZXR1cm4gTW9kZWw7XG4gIH07XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiTW9kZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiUXVlcnkgKCRsb2csIHFzLCBpZGJVdGlscywgaWRiRXZlbnRzKSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIGlkYlF1ZXJ5KCRkYiwgJE1vZGVsLCAkZmlsdGVycykgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnZnVuY3Rpb24nLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgIGxldCAkcmVzdWx0ID0gbnVsbDtcclxuXHJcbiAgICAvLyBGdW5jaW9uIHF1ZSBkZXZ1ZWx2ZSBlamVjdXRhIGVsIHF1ZXJ5IHkgZGV2dWVsdmUgZWwgcmVzdWx0YWRvLlxyXG4gICAgdGhpei5nZXRSZXN1bHQgPSBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW1snZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIC8vIEVqZWN1dGFyIHNpIG5vIHNlIGhhIGVqZWN1dGFkb1xyXG4gICAgICBpZiAoISRyZXN1bHQpIHtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBkZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgICAgICAkcmVzdWx0ID0gW107XHJcbiAgICAgICAgJHJlc3VsdC4kcmVzb2x2ZWQgPSBmYWxzZTtcclxuICAgICAgICAkcmVzdWx0LiRwcm9taXNlID0gZGVmZXJlZC5wcm9taXNlO1xyXG5cclxuICAgICAgICAkZGIub3BlbkN1cnNvcigkTW9kZWwuZ2V0TW9kZWxOYW1lKCksICRmaWx0ZXJzLCBmdW5jdGlvbiAoZGF0YSwgbmV4dCkge1xyXG5cclxuICAgICAgICAgIGNvbnN0IGtleSA9ICRNb2RlbC5nZXRLZXlGcm9tKGRhdGEpO1xyXG5cclxuICAgICAgICAgIC8vIE9idGVuZXIgbGEgaW5zdGFuY2lhXHJcbiAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9ICRNb2RlbC5nZXRJbnN0YW5jZShrZXkpO1xyXG5cclxuICAgICAgICAgIGlmIChpbnN0YW5jZS4kbG9jYWxMb2FkZWQpIHJldHVybiBuZXh0KCk7XHJcblxyXG4gICAgICAgICAgJE1vZGVsLmdldFZlcnNpb25PZihrZXkpLnByb21pc2VcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHZlcnNpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgaW5zdGFuY2UuJHNldExvY2FsVmFsdWVzKGRhdGEsIGRhdGEgJiYgdmVyc2lvbj8gdmVyc2lvbi5oYXNoIDogdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIGluc3RhbmNlLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9RVUVSSUVELCBbJHJlc3VsdF0pO1xyXG5cclxuICAgICAgICAgICAgICAvLyBBZ3JlZ2FyIGFsIHJlc3VsdGFkb1xyXG4gICAgICAgICAgICAgICRyZXN1bHQucHVzaChpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIEJ1c2NhciBzaWd1aWVudGVcclxuICAgICAgICAgICAgICBuZXh0KCk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG5cclxuICAgICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICRsb2cuZXJyb3IoWydNb2RlbC5nZXRWZXJzaW9uT2YgYW55IGVycm9yJywgZXJyXSlcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KS5wcm9taXNlXHJcblxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAkcmVzdWx0LiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoJHJlc3VsdCk7XHJcbiAgICAgICAgICB0aGl6LmdldFJlbW90ZVJlc3VsdCgpO1xyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG5cclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuICRyZXN1bHQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBPYnRpZW5lIGVsIHJlc3VsdGFkbyBkZSB2YWxvcmVzIHJlbW90b3NcclxuICAgIHRoaXouZ2V0UmVtb3RlUmVzdWx0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgbGV0ICRyZW1vdGUgPSAkTW9kZWwuZ2V0UmVtb3RlKCk7XHJcbiAgICAgIGxldCAkcmVtb3RlUmVzdWx0ID0gbnVsbDtcclxuXHJcbiAgICAgIGlmICgkcmVtb3RlICYmIHR5cGVvZiAkcmVtb3RlLmZpbmQgPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICgkcmVtb3RlUmVzdWx0ID0gJHJlbW90ZS5maW5kKCRmaWx0ZXJzKS4kcHJvbWlzZSlcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVzdWx0Lm1hcChmdW5jdGlvbiAocmVjb3JkLCBpKSB7XHJcbiAgICAgICAgICAgICAgJE1vZGVsLmdldCgkTW9kZWwuZ2V0S2V5RnJvbShyZWNvcmQudmFsdWVzKSkuJHByb21pc2VcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgkcmVjb3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICRyZWNvcmQuJHNldFJlbW90ZVZhbHVlcyhyZWNvcmQudmFsdWVzLCByZWNvcmQudmVyc2lvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICBpZiAoJHJlc3VsdFtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkcmVzdWx0W2ldICE9PSAkcmVjb3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAkcmVzdWx0W2ldLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9VTlFVRVJJRUQsIFskcmVzdWx0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICRyZXN1bHRbaV0gPSAkcmVjb3JkO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRyZXN1bHQucHVzaCgkcmVjb3JkKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgJHJlY29yZC4kZW1pdChpZGJFdmVudHMuTU9ERUxfUVVFUklFRCwgWyRyZXN1bHRdKTtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuICRyZW1vdGVSZXN1bHQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYlF1ZXJ5LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYlF1ZXJ5O1xuZnVuY3Rpb24gaWRiUXVlcnkoJGxvZywgcXMsIGlkYlV0aWxzLCBpZGJFdmVudHMpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gZnVuY3Rpb24gaWRiUXVlcnkoJGRiLCAkTW9kZWwsICRmaWx0ZXJzKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnZnVuY3Rpb24nLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgdmFyICRyZXN1bHQgPSBudWxsO1xuXG4gICAgLy8gRnVuY2lvbiBxdWUgZGV2dWVsdmUgZWplY3V0YSBlbCBxdWVyeSB5IGRldnVlbHZlIGVsIHJlc3VsdGFkby5cbiAgICB0aGl6LmdldFJlc3VsdCA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAvLyBFamVjdXRhciBzaSBubyBzZSBoYSBlamVjdXRhZG9cbiAgICAgIGlmICghJHJlc3VsdCkge1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcigpO1xuICAgICAgICAgICRyZXN1bHQgPSBbXTtcbiAgICAgICAgICAkcmVzdWx0LiRyZXNvbHZlZCA9IGZhbHNlO1xuICAgICAgICAgICRyZXN1bHQuJHByb21pc2UgPSBkZWZlcmVkLnByb21pc2U7XG5cbiAgICAgICAgICAkZGIub3BlbkN1cnNvcigkTW9kZWwuZ2V0TW9kZWxOYW1lKCksICRmaWx0ZXJzLCBmdW5jdGlvbiAoZGF0YSwgbmV4dCkge1xuXG4gICAgICAgICAgICB2YXIga2V5ID0gJE1vZGVsLmdldEtleUZyb20oZGF0YSk7XG5cbiAgICAgICAgICAgIC8vIE9idGVuZXIgbGEgaW5zdGFuY2lhXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSAkTW9kZWwuZ2V0SW5zdGFuY2Uoa2V5KTtcblxuICAgICAgICAgICAgaWYgKGluc3RhbmNlLiRsb2NhbExvYWRlZCkgcmV0dXJuIG5leHQoKTtcblxuICAgICAgICAgICAgJE1vZGVsLmdldFZlcnNpb25PZihrZXkpLnByb21pc2UudGhlbihmdW5jdGlvbiAodmVyc2lvbikge1xuXG4gICAgICAgICAgICAgIGluc3RhbmNlLiRzZXRMb2NhbFZhbHVlcyhkYXRhLCBkYXRhICYmIHZlcnNpb24gPyB2ZXJzaW9uLmhhc2ggOiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBpbnN0YW5jZS4kZW1pdChpZGJFdmVudHMuTU9ERUxfUVVFUklFRCwgWyRyZXN1bHRdKTtcblxuICAgICAgICAgICAgICAvLyBBZ3JlZ2FyIGFsIHJlc3VsdGFkb1xuICAgICAgICAgICAgICAkcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xuXG4gICAgICAgICAgICAgIC8vIEJ1c2NhciBzaWd1aWVudGVcbiAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXG4gICAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICRsb2cuZXJyb3IoWydNb2RlbC5nZXRWZXJzaW9uT2YgYW55IGVycm9yJywgZXJyXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KS5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAkcmVzdWx0LiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoJHJlc3VsdCk7XG4gICAgICAgICAgICB0aGl6LmdldFJlbW90ZVJlc3VsdCgpO1xuICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblxuICAgICAgICAgICAgZGVmZXJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICRyZXN1bHQ7XG4gICAgfTtcblxuICAgIC8vIE9idGllbmUgZWwgcmVzdWx0YWRvIGRlIHZhbG9yZXMgcmVtb3Rvc1xuICAgIHRoaXouZ2V0UmVtb3RlUmVzdWx0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIHZhciAkcmVtb3RlID0gJE1vZGVsLmdldFJlbW90ZSgpO1xuICAgICAgdmFyICRyZW1vdGVSZXN1bHQgPSBudWxsO1xuXG4gICAgICBpZiAoJHJlbW90ZSAmJiB0eXBlb2YgJHJlbW90ZS5maW5kID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgKCRyZW1vdGVSZXN1bHQgPSAkcmVtb3RlLmZpbmQoJGZpbHRlcnMpLiRwcm9taXNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHQubWFwKGZ1bmN0aW9uIChyZWNvcmQsIGkpIHtcbiAgICAgICAgICAgICRNb2RlbC5nZXQoJE1vZGVsLmdldEtleUZyb20ocmVjb3JkLnZhbHVlcykpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKCRyZWNvcmQpIHtcbiAgICAgICAgICAgICAgJHJlY29yZC4kc2V0UmVtb3RlVmFsdWVzKHJlY29yZC52YWx1ZXMsIHJlY29yZC52ZXJzaW9uKTtcblxuICAgICAgICAgICAgICBpZiAoJHJlc3VsdFtpXSkge1xuICAgICAgICAgICAgICAgIGlmICgkcmVzdWx0W2ldICE9PSAkcmVjb3JkKSB7XG4gICAgICAgICAgICAgICAgICAkcmVzdWx0W2ldLiRlbWl0KGlkYkV2ZW50cy5NT0RFTF9VTlFVRVJJRUQsIFskcmVzdWx0XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRyZXN1bHRbaV0gPSAkcmVjb3JkO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRyZXN1bHQucHVzaCgkcmVjb3JkKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICRyZWNvcmQuJGVtaXQoaWRiRXZlbnRzLk1PREVMX1FVRVJJRUQsIFskcmVzdWx0XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkcmVtb3RlUmVzdWx0O1xuICAgIH07XG4gIH07XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsYiAobW9kdWxlKSB7XHJcblxyXG4gIC8vIER2dWVsdmUgZWwgaG9zdCBkZSB1bmEgVVJMXHJcbiAgZnVuY3Rpb24gZ2V0SG9zdCh1cmwpIHtcclxuICAgIGNvbnN0IG0gPSB1cmwubWF0Y2goL14oPzpodHRwcz86KT9cXC9cXC8oW15cXC9dKykvKTtcclxuICAgIHJldHVybiBtID8gbVsxXSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBsZXQgdXJsQmFzZUhvc3QgPSBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICBjb25zdCBsYkF1dGggPSBmdW5jdGlvbigpIHsgJ25nSW5qZWN0J1xyXG4gICAgY29uc3QgcHJvcHMgPSBbJ2FjY2Vzc1Rva2VuSWQnLCAnY3VycmVudFVzZXJJZCcsICdyZW1lbWJlck1lJ107XHJcbiAgICBjb25zdCBwcm9wc1ByZWZpeCA9ICckaWRiLWxiJCc7XHJcbiAgICBcclxuICAgIC8vIE5vdGU6IExvY2FsU3RvcmFnZSBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gc3RyaW5nXHJcbiAgICAvLyBXZSBhcmUgdXNpbmcgZW1wdHkgc3RyaW5nIGFzIGEgbWFya2VyIGZvciBudWxsL3VuZGVmaW5lZCB2YWx1ZXMuXHJcbiAgICBmdW5jdGlvbiBzYXZlKHN0b3JhZ2UsIG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9ICcnO1xyXG4gICAgICAgIHN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQ2Fubm90IGFjY2VzcyBsb2NhbC9zZXNzaW9uIHN0b3JhZ2U6JywgZXJyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxvYWQobmFtZSkge1xyXG4gICAgICBjb25zdCBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XHJcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Vba2V5XSB8fCBzZXNzaW9uU3RvcmFnZVtrZXldIHx8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbGJBdXRoKCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHRoaXpbbmFtZV0gPSBsb2FkKG5hbWUpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgY29uc3Qgc3RvcmFnZSA9IHRoaXoucmVtZW1iZXJNZSA/IGxvY2FsU3RvcmFnZSA6IHNlc3Npb25TdG9yYWdlO1xyXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICBzYXZlKHN0b3JhZ2UsIG5hbWUsIHRoaXpbbmFtZV0pO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zZXRVc2VyID0gZnVuY3Rpb24oYWNjZXNzVG9rZW5JZCwgdXNlcklkLCB1c2VyRGF0YSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlcklkID0gdXNlcklkO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IHVzZXJEYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyVXNlciA9IGZ1bmN0aW9uKCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gbnVsbDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlcklkID0gbnVsbDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyU3RvcmFnZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICBzYXZlKHNlc3Npb25TdG9yYWdlLCBuYW1lLCBudWxsKTtcclxuICAgICAgICBzYXZlKGxvY2FsU3RvcmFnZSwgbmFtZSwgbnVsbCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbmV3IGxiQXV0aCgpO1xyXG5cclxuICB9O1xyXG5cclxuICBjb25zdCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbigkcSwgbGJBdXRoKSB7ICduZ0luamVjdCc7XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlcXVlc3Q6IGZ1bmN0aW9uKGNvbmZpZykge1xyXG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXh0ZXJuYWwgcmVxdWVzdHNcclxuICAgICAgICBjb25zdCBob3N0ID0gZ2V0SG9zdChjb25maWcudXJsKTtcclxuICAgICAgICBpZiAoaG9zdCAmJiBob3N0ICE9PSB1cmxCYXNlSG9zdCkge1xyXG4gICAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsYkF1dGguYWNjZXNzVG9rZW5JZCkge1xyXG4gICAgICAgICAgY29uZmlnLmhlYWRlcnNbYXV0aEhlYWRlcl0gPSBsYkF1dGguYWNjZXNzVG9rZW5JZDtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5fX2lzR2V0Q3VycmVudFVzZXJfXykge1xyXG4gICAgICAgICAgLy8gUmV0dXJuIGEgc3R1YiA0MDEgZXJyb3IgZm9yIFVzZXIuZ2V0Q3VycmVudCgpIHdoZW5cclxuICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIHVzZXIgbG9nZ2VkIGluXHJcbiAgICAgICAgICBjb25zdCByZXMgPSB7XHJcbiAgICAgICAgICAgIGJvZHk6IHsgZXJyb3I6IHsgc3RhdHVzOiA0MDEgfX0sXHJcbiAgICAgICAgICAgIHN0YXR1czogNDAxLFxyXG4gICAgICAgICAgICBjb25maWc6IGNvbmZpZyxcclxuICAgICAgICAgICAgaGVhZGVyczogZnVuY3Rpb24oKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29uZmlnIHx8ICRxLndoZW4oY29uZmlnKTtcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxiUmVzb3VyY2UgPSBmdW5jdGlvbigpIHsgJ25nSW5qZWN0JzsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgdXJsQmFzZTogXCIvYXBpXCIsXHJcbiAgICAgIGF1dGhIZWFkZXI6ICdhdXRob3JpemF0aW9uJyxcclxuICAgIH07XHJcblxyXG4gICAgdXJsQmFzZUhvc3QgPSBnZXRIb3N0KG9wdGlvbnMudXJsQmFzZSkgfHwgbG9jYXRpb24uaG9zdDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlciBUaGUgaGVhZGVyIG5hbWUgdG8gdXNlLCBlLmcuIGBYLUFjY2Vzcy1Ub2tlbmBcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ29uZmlndXJlIHRoZSBSRVNUIHRyYW5zcG9ydCB0byB1c2UgYSBkaWZmZXJlbnQgaGVhZGVyIGZvciBzZW5kaW5nXHJcbiAgICAgKiB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uIEl0IGlzIHNlbnQgaW4gdGhlIGBBdXRob3JpemF0aW9uYCBoZWFkZXJcclxuICAgICAqIGJ5IGRlZmF1bHQuXHJcbiAgICAgKi9cclxuICAgIHRoaXouc2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKGhlYWRlcikge1xyXG4gICAgICBvcHRpb25zLmF1dGhIZWFkZXIgPSBoZWFkZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgaGVhZGVyIG5hbWUgdGhhdCBpcyB1c2VkIGZvciBzZW5kaW5nIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cclxuICAgICAqL1xyXG4gICAgdGhpei5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdXNlLCBlLmcuIGAvYXBpYCBvciBgLy9leGFtcGxlLmNvbS9hcGlgLlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDaGFuZ2UgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBCeSBkZWZhdWx0LCB0aGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xyXG4gICAgdGhpei5zZXRVcmxCYXNlID0gZnVuY3Rpb24odXJsKSB7XHJcbiAgICAgIG9wdGlvbnMudXJsQmFzZSA9IHVybDtcclxuICAgICAgdXJsQmFzZUhvc3QgPSBnZXRIb3N0KG9wdGlvbnMudXJsQmFzZSkgfHwgbG9jYXRpb24uaG9zdDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gVGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cclxuICAgIHRoaXouZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LiRnZXQgPSBmdW5jdGlvbigkcmVzb3VyY2UpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgICAgIGNvbnN0IGxiUmVzb3VyY2UgPSBmdW5jdGlvbih1cmwsIHBhcmFtcywgYWN0aW9ucykge1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhhY3Rpb25zKS5tYXAoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgYWN0aW9uc1trZXldLm9yaWdpbmFsVXJsID0gYWN0aW9uc1trZXldLnVybDtcclxuICAgICAgICAgIGFjdGlvbnNba2V5XS51cmwgPSBvcHRpb25zLnVybEJhc2UgKyBhY3Rpb25zW2tleV0udXJsO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCByZXNvdXJjZSA9ICRyZXNvdXJjZShvcHRpb25zLnVybEJhc2UgKyB1cmwsIHBhcmFtcywgYWN0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vIEFuZ3VsYXIgYWx3YXlzIGNhbGxzIFBPU1Qgb24gJHNhdmUoKVxyXG4gICAgICAgIC8vIFRoaXMgaGFjayBpcyBiYXNlZCBvblxyXG4gICAgICAgIC8vIGh0dHA6Ly9raXJrYnVzaGVsbC5tZS9hbmd1bGFyLWpzLXVzaW5nLW5nLXJlc291cmNlLWluLWEtbW9yZS1yZXN0ZnVsLW1hbm5lci9cclxuICAgICAgICByZXNvdXJjZS5wcm90b3R5cGUuJHNhdmUgPSBmdW5jdGlvbihzdWNjZXNzLCBlcnJvcikge1xyXG4gICAgICAgICAgLy8gRm9ydHVuYXRlbHksIExvb3BCYWNrIHByb3ZpZGVzIGEgY29udmVuaWVudCBgdXBzZXJ0YCBtZXRob2RcclxuICAgICAgICAgIC8vIHRoYXQgZXhhY3RseSBmaXRzIG91ciBuZWVkcy5cclxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc291cmNlLnVwc2VydC5jYWxsKHRoaXMsIHt9LCB0aGlzLCBzdWNjZXNzLCBlcnJvcik7XHJcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LiRwcm9taXNlIHx8IHJlc3VsdDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxiUmVzb3VyY2UuZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsYlJlc291cmNlLmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xyXG4gICAgICB9O1xyXG4gICAgXHJcbiAgICAgIHJldHVybiBsYlJlc291cmNlO1xyXG5cclxuICAgIH07XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1vZHVsZVxyXG4gICAgLmZhY3RvcnkoJ2xiQXV0aCcsIGxiQXV0aClcclxuICAgIC5wcm92aWRlcignbGJSZXNvdXJjZScsIGxiUmVzb3VyY2UpXHJcbiAgICAuZmFjdG9yeSgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJywgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yKVxyXG4gICAgLmNvbmZpZyhbJyRodHRwUHJvdmlkZXInLCBmdW5jdGlvbigkaHR0cFByb3ZpZGVyKSB7ICduZ0luamVjdCc7XHJcbiAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicpO1xyXG4gICAgfV0pO1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2xiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gbGI7XG5mdW5jdGlvbiBsYihtb2R1bGUpIHtcblxuICAvLyBEdnVlbHZlIGVsIGhvc3QgZGUgdW5hIFVSTFxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xuICAgIHZhciBtID0gdXJsLm1hdGNoKC9eKD86aHR0cHM/Oik/XFwvXFwvKFteXFwvXSspLyk7XG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcbiAgfVxuXG4gIHZhciB1cmxCYXNlSG9zdCA9IGxvY2F0aW9uLmhvc3Q7XG5cbiAgdmFyIGxiQXV0aCA9IGZ1bmN0aW9uIGxiQXV0aCgpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdmFyIHByb3BzID0gWydhY2Nlc3NUb2tlbklkJywgJ2N1cnJlbnRVc2VySWQnLCAncmVtZW1iZXJNZSddO1xuICAgIHZhciBwcm9wc1ByZWZpeCA9ICckaWRiLWxiJCc7XG5cbiAgICAvLyBOb3RlOiBMb2NhbFN0b3JhZ2UgY29udmVydHMgdGhlIHZhbHVlIHRvIHN0cmluZ1xuICAgIC8vIFdlIGFyZSB1c2luZyBlbXB0eSBzdHJpbmcgYXMgYSBtYXJrZXIgZm9yIG51bGwvdW5kZWZpbmVkIHZhbHVlcy5cbiAgICBmdW5jdGlvbiBzYXZlKHN0b3JhZ2UsIG5hbWUsIHZhbHVlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAnJztcbiAgICAgICAgc3RvcmFnZVtrZXldID0gdmFsdWU7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZChuYW1lKSB7XG4gICAgICB2YXIga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVtrZXldIHx8IHNlc3Npb25TdG9yYWdlW2tleV0gfHwgbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsYkF1dGgoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdGhpeltuYW1lXSA9IGxvYWQobmFtZSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB2YXIgc3RvcmFnZSA9IHRoaXoucmVtZW1iZXJNZSA/IGxvY2FsU3RvcmFnZSA6IHNlc3Npb25TdG9yYWdlO1xuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBzYXZlKHN0b3JhZ2UsIG5hbWUsIHRoaXpbbmFtZV0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2V0VXNlciA9IGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCB1c2VySWQsIHVzZXJEYXRhKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xuICAgICAgdGhpei5jdXJyZW50VXNlcklkID0gdXNlcklkO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSB1c2VyRGF0YTtcbiAgICB9O1xuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclVzZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xuICAgICAgdGhpei5jdXJyZW50VXNlcklkID0gbnVsbDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcbiAgICB9O1xuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclN0b3JhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHNhdmUoc2Vzc2lvblN0b3JhZ2UsIG5hbWUsIG51bGwpO1xuICAgICAgICBzYXZlKGxvY2FsU3RvcmFnZSwgbmFtZSwgbnVsbCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBsYkF1dGgoKTtcbiAgfTtcblxuICB2YXIgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24gbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yKCRxLCBsYkF1dGgpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXh0ZXJuYWwgcmVxdWVzdHNcbiAgICAgICAgdmFyIGhvc3QgPSBnZXRIb3N0KGNvbmZpZy51cmwpO1xuICAgICAgICBpZiAoaG9zdCAmJiBob3N0ICE9PSB1cmxCYXNlSG9zdCkge1xuICAgICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGJBdXRoLmFjY2Vzc1Rva2VuSWQpIHtcbiAgICAgICAgICBjb25maWcuaGVhZGVyc1thdXRoSGVhZGVyXSA9IGxiQXV0aC5hY2Nlc3NUb2tlbklkO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5fX2lzR2V0Q3VycmVudFVzZXJfXykge1xuICAgICAgICAgIC8vIFJldHVybiBhIHN0dWIgNDAxIGVycm9yIGZvciBVc2VyLmdldEN1cnJlbnQoKSB3aGVuXG4gICAgICAgICAgLy8gdGhlcmUgaXMgbm8gdXNlciBsb2dnZWQgaW5cbiAgICAgICAgICB2YXIgcmVzID0ge1xuICAgICAgICAgICAgYm9keTogeyBlcnJvcjogeyBzdGF0dXM6IDQwMSB9IH0sXG4gICAgICAgICAgICBzdGF0dXM6IDQwMSxcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICAgICAgaGVhZGVyczogZnVuY3Rpb24gaGVhZGVycygpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29uZmlnIHx8ICRxLndoZW4oY29uZmlnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIHZhciBsYlJlc291cmNlID0gZnVuY3Rpb24gbGJSZXNvdXJjZSgpIHtcbiAgICAnbmdJbmplY3QnO1xuICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgdXJsQmFzZTogXCIvYXBpXCIsXG4gICAgICBhdXRoSGVhZGVyOiAnYXV0aG9yaXphdGlvbidcbiAgICB9O1xuXG4gICAgdXJsQmFzZUhvc3QgPSBnZXRIb3N0KG9wdGlvbnMudXJsQmFzZSkgfHwgbG9jYXRpb24uaG9zdDtcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyIFRoZSBoZWFkZXIgbmFtZSB0byB1c2UsIGUuZy4gYFgtQWNjZXNzLVRva2VuYFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25maWd1cmUgdGhlIFJFU1QgdHJhbnNwb3J0IHRvIHVzZSBhIGRpZmZlcmVudCBoZWFkZXIgZm9yIHNlbmRpbmdcclxuICAgICAqIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi4gSXQgaXMgc2VudCBpbiB0aGUgYEF1dGhvcml6YXRpb25gIGhlYWRlclxyXG4gICAgICogYnkgZGVmYXVsdC5cclxuICAgICAqL1xuICAgIHRoaXouc2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uIChoZWFkZXIpIHtcbiAgICAgIG9wdGlvbnMuYXV0aEhlYWRlciA9IGhlYWRlcjtcbiAgICB9LFxuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBoZWFkZXIgbmFtZSB0aGF0IGlzIHVzZWQgZm9yIHNlbmRpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLlxyXG4gICAgICovXG4gICAgdGhpei5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcbiAgICB9LFxuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB1c2UsIGUuZy4gYC9hcGlgIG9yIGAvL2V4YW1wbGUuY29tL2FwaWAuXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENoYW5nZSB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIEJ5IGRlZmF1bHQsIHRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXG4gICAgdGhpei5zZXRVcmxCYXNlID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgb3B0aW9ucy51cmxCYXNlID0gdXJsO1xuICAgICAgdXJsQmFzZUhvc3QgPSBnZXRIb3N0KG9wdGlvbnMudXJsQmFzZSkgfHwgbG9jYXRpb24uaG9zdDtcbiAgICB9LFxuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gVGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cbiAgICB0aGl6LmdldFVybEJhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xuICAgIH07XG5cbiAgICB0aGl6LiRnZXQgPSBmdW5jdGlvbiAoJHJlc291cmNlKSB7XG4gICAgICAnbmdJbmplY3QnO1xuXG4gICAgICB2YXIgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uIGxiUmVzb3VyY2UodXJsLCBwYXJhbXMsIGFjdGlvbnMpIHtcblxuICAgICAgICBPYmplY3Qua2V5cyhhY3Rpb25zKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIGFjdGlvbnNba2V5XS5vcmlnaW5hbFVybCA9IGFjdGlvbnNba2V5XS51cmw7XG4gICAgICAgICAgYWN0aW9uc1trZXldLnVybCA9IG9wdGlvbnMudXJsQmFzZSArIGFjdGlvbnNba2V5XS51cmw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciByZXNvdXJjZSA9ICRyZXNvdXJjZShvcHRpb25zLnVybEJhc2UgKyB1cmwsIHBhcmFtcywgYWN0aW9ucyk7XG5cbiAgICAgICAgLy8gQW5ndWxhciBhbHdheXMgY2FsbHMgUE9TVCBvbiAkc2F2ZSgpXG4gICAgICAgIC8vIFRoaXMgaGFjayBpcyBiYXNlZCBvblxuICAgICAgICAvLyBodHRwOi8va2lya2J1c2hlbGwubWUvYW5ndWxhci1qcy11c2luZy1uZy1yZXNvdXJjZS1pbi1hLW1vcmUtcmVzdGZ1bC1tYW5uZXIvXG4gICAgICAgIHJlc291cmNlLnByb3RvdHlwZS4kc2F2ZSA9IGZ1bmN0aW9uIChzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgIC8vIEZvcnR1bmF0ZWx5LCBMb29wQmFjayBwcm92aWRlcyBhIGNvbnZlbmllbnQgYHVwc2VydGAgbWV0aG9kXG4gICAgICAgICAgLy8gdGhhdCBleGFjdGx5IGZpdHMgb3VyIG5lZWRzLlxuICAgICAgICAgIHZhciByZXN1bHQgPSByZXNvdXJjZS51cHNlcnQuY2FsbCh0aGlzLCB7fSwgdGhpcywgc3VjY2VzcywgZXJyb3IpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQuJHByb21pc2UgfHwgcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzb3VyY2U7XG4gICAgICB9O1xuXG4gICAgICBsYlJlc291cmNlLmdldFVybEJhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XG4gICAgICB9O1xuXG4gICAgICBsYlJlc291cmNlLmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gbGJSZXNvdXJjZTtcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBtb2R1bGUuZmFjdG9yeSgnbGJBdXRoJywgbGJBdXRoKS5wcm92aWRlcignbGJSZXNvdXJjZScsIGxiUmVzb3VyY2UpLmZhY3RvcnkoJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicsIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcikuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicpO1xuICB9XSk7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvbGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBHbG9iYWxlc1xyXG5pbXBvcnQgQ2xhenplciAgZnJvbSAnLi9DbGF6emVyJztcclxuXHJcbi8vIFJlcXVlc3RcclxuaW1wb3J0IGlkYlJlcXVlc3QgICAgICAgICBmcm9tICcuL2lkYlJlcXVlc3QnO1xyXG5pbXBvcnQgaWRiT3BlbkRCUmVxdWVzdCAgIGZyb20gJy4vaWRiT3BlbkRCUmVxdWVzdCc7XHJcblxyXG4vLyBQcmluY2lwYWxlc1xyXG5pbXBvcnQgaWRiICAgICAgICAgICAgICBmcm9tICcuL2lkYic7XHJcbmltcG9ydCBpZGJTdG9yZSAgICAgICAgIGZyb20gJy4vaWRiU3RvcmUnO1xyXG5pbXBvcnQgaWRiRXZlbnRUYXJnZXQgICBmcm9tICcuL2lkYkV2ZW50VGFyZ2V0JztcclxuaW1wb3J0IGlkYk1vZGVsICAgICAgICAgZnJvbSAnLi9pZGJNb2RlbCc7XHJcbmltcG9ydCBpZGJTb2NrZXQgICAgICAgIGZyb20gJy4vaWRiU29ja2V0JztcclxuaW1wb3J0IGlkYlRyYW5zYWN0aW9uICAgZnJvbSAnLi9pZGJUcmFuc2FjdGlvbic7XHJcblxyXG5pbXBvcnQgbGIgZnJvbSAnLi9sYic7XHJcblxyXG5sYihhbmd1bGFyLm1vZHVsZSgnbmcudjEuaWRiJywgW10pKVxyXG4gIFxyXG4gIC5jb25zdGFudCgnaW8nLCBpbylcclxuICAuc2VydmljZSgnQ2xhenplcicsIENsYXp6ZXIpXHJcblxyXG4gIC5jb25zdGFudCgnaWRiVmVyc2lvbicsICcwLjAuMScpXHJcbiAgXHJcbiAgLnNlcnZpY2UoJ2lkYlJlcXVlc3QnLCBpZGJSZXF1ZXN0KVxyXG4gIC5zZXJ2aWNlKCdpZGJPcGVuREJSZXF1ZXN0JywgaWRiT3BlbkRCUmVxdWVzdClcclxuICAuc2VydmljZSgnaWRiMicsIGlkYilcclxuICAuc2VydmljZSgnaWRiU3RvcmUnLCBpZGJTdG9yZSlcclxuICAuc2VydmljZSgnaWRiRXZlbnRUYXJnZXQnLCBpZGJFdmVudFRhcmdldClcclxuICAuc2VydmljZSgnaWRiTW9kZWwyJywgaWRiTW9kZWwpXHJcbiAgLnNlcnZpY2UoJ2lkYlNvY2tldDInLCBpZGJTb2NrZXQpXHJcbiAgLnNlcnZpY2UoJ2lkYlRyYW5zYWN0aW9uJywgaWRiVHJhbnNhY3Rpb24pXHJcblxyXG4gIC5zZXJ2aWNlKCdkYjInLCBmdW5jdGlvbiAoaWRiMikgeyAnbmdJbmplY3QnO1xyXG5cclxuICAgIGNvbnN0IGRiID0gbmV3IGlkYjIoJ2FhYScsIDQpXHJcblxyXG4gICAgZGIuJGF1dG9taWdyYXRpb24oe1xyXG4gICAgICAxOiBmdW5jdGlvbiAoZGIpIHtcclxuICAgICAgICB2YXIgbW9kZWwgPSBkYlxyXG4gICAgICAgICAgLiRtb2RlbCgnVHJhYmFqYWRvcicpXHJcbiAgICAgICAgICAuJGNyZWF0ZVN0b3JlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgLiRkcm9wKCkudGhlbihmdW5jdGlvbiAoZGIpIHtcclxuICAgICAgZGIuJG9wZW4oKS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFsnb3BlbmVkJ10pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkYjtcclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIC5zZXJ2aWNlKCdUcmFiYWphZG9yMicsIGZ1bmN0aW9uIChkYjIpIHsgJ25nSW5qZWN0JztcclxuICAgIHJldHVybiB3aW5kb3cuVHJhYmFqYWRvcjIgPSBkYjIuJG1vZGVsKCdUcmFiYWphZG9yJylcclxuICAgICAgLiRmaWVsZCgnY29kJywgICAgICAgIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KVxyXG4gICAgICAuJGZpZWxkKCdjaScsICAgICAgICAgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pXHJcbiAgICAgIC4kZmllbGQoJ25vbWJyZXMnLCAgICB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSlcclxuICAgICAgLiRmaWVsZCgnYXBlbGxpZG9zJywgIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KVxyXG4gICAgICAuJGZpZWxkKCduYWNpbWllbnRvJywgeyBcInR5cGVcIjogXCJkYXRlXCIgfSlcclxuICAgICAgLiRmaWVsZCgnaW5ncmVzbycsICAgIHsgXCJ0eXBlXCI6IFwiZGF0ZVwiIH0pXHJcbiAgICAgIC4kZmllbGQoJ2RpcmVjY2lvbicsICB7IFwidHlwZVwiOiBcInN0cmluZ1wifSlcclxuICAgICAgLiRyZW1vdGUoXHJcbiAgICAgICAgJy90cmFiYWphZG9yZXMvOmlkJyxcclxuICAgICAgICB7ICdpZCc6ICdAaWQnIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ2ZpbmQnOiAgIHsgdXJsOiAnL3RyYWJhamFkb3Jlcy9fZmluZFdpdGhWZXJzaW9uJywgbWV0aG9kOiAnR0VUJywgaXNBcnJheTogdHJ1ZSwgfSxcclxuICAgICAgICAgIC8vICdjcmVhdGUnOiB7IHVybDogJy90cmFiYWphZG9yZXMnLCBtZXRob2Q6ICdQT1NUJywgfSxcclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICAgICAgLy8gLnZlcnNpb25pbmcoKVxyXG4gICAgICAuJGJ1aWxkKGZ1bmN0aW9uIChUcmFiYWphZG9yKSB7XHJcblxyXG4gICAgICAgIFRyYWJhamFkb3IucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIFRyYWJhamFkb3IucHJvdG90eXBlLmdldE5vbWJyZSA9IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubm9tYnJlcyArICcgJyArIHRoaXMuYXBlbGxpZG9zO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuICB9KVxyXG5cclxuICAucnVuKGZ1bmN0aW9uIChkYjIsIFRyYWJhamFkb3IyKSB7ICduZ0luamVjdCc7XHJcbiAgICBjb25zdCB0ID0gbmV3IFRyYWJhamFkb3IyKCk7XHJcbiAgICB0Lm5vbWJyZXMgPSAnQWxleGFuZGVyJztcclxuICAgIHQuYXBlbGxpZG9zID0gJ1JvbmRvbic7XHJcbiAgICBjb25zb2xlLmxvZyh0LiRnZXRWYWx1ZXMoKSk7XHJcbiAgICBjb25zb2xlLmxvZyh0LmdldE5vbWJyZSgpKTtcclxuXHJcbiAgICBUcmFiYWphZG9yMi4kcHV0KHtcclxuICAgICAgaWQ6IDEsXHJcbiAgICAgICdub21icmVzJzogJ0FsZXhhbmRlcidcclxuICAgIH0pO1xyXG5cclxuICAgIFRyYWJhamFkb3IyLiRwdXQoe1xyXG4gICAgICBpZDogMixcclxuICAgICAgJ25vbWJyZXMnOiAnR3VpbGxlbW8nXHJcbiAgICB9KTtcclxuXHJcbiAgICBUcmFiYWphZG9yMi4kcHV0KHtcclxuICAgICAgaWQ6IDIsXHJcbiAgICAgICdhcGVsbGlkb3MnOiAnU2VtaW5hcmlvJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgVHJhYmFqYWRvcjIuJHB1dCh7XHJcbiAgICAgIGlkOiA0LFxyXG4gICAgICAnbm9tYnJlcyc6ICdBeGVsJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgVHJhYmFqYWRvcjIuJHB1dCh7XHJcbiAgICAgICdub21icmVzJzogJ0dhYnJpZWwnXHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuciA9IFRyYWJhamFkb3IyLiRnZXQoMik7XHJcblxyXG4gICAgci4kcHJvbWlzZVxyXG4gICAgLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhbJ3RoZW4nLCByZWNvcmRdKVxyXG4gICAgfSlcclxuICAgIC5jYXRjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihldmVudClcclxuICAgIH0pXHJcblxyXG4gIH0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gR2xvYmFsZXNcblxudmFyIF9DbGF6emVyID0gcmVxdWlyZSgnLi9DbGF6emVyJyk7XG5cbnZhciBfQ2xhenplcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9DbGF6emVyKTtcblxudmFyIF9pZGJSZXF1ZXN0ID0gcmVxdWlyZSgnLi9pZGJSZXF1ZXN0Jyk7XG5cbnZhciBfaWRiUmVxdWVzdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJSZXF1ZXN0KTtcblxudmFyIF9pZGJPcGVuREJSZXF1ZXN0ID0gcmVxdWlyZSgnLi9pZGJPcGVuREJSZXF1ZXN0Jyk7XG5cbnZhciBfaWRiT3BlbkRCUmVxdWVzdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJPcGVuREJSZXF1ZXN0KTtcblxudmFyIF9pZGIgPSByZXF1aXJlKCcuL2lkYicpO1xuXG52YXIgX2lkYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGIpO1xuXG52YXIgX2lkYlN0b3JlID0gcmVxdWlyZSgnLi9pZGJTdG9yZScpO1xuXG52YXIgX2lkYlN0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlN0b3JlKTtcblxudmFyIF9pZGJFdmVudFRhcmdldCA9IHJlcXVpcmUoJy4vaWRiRXZlbnRUYXJnZXQnKTtcblxudmFyIF9pZGJFdmVudFRhcmdldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJFdmVudFRhcmdldCk7XG5cbnZhciBfaWRiTW9kZWwgPSByZXF1aXJlKCcuL2lkYk1vZGVsJyk7XG5cbnZhciBfaWRiTW9kZWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiTW9kZWwpO1xuXG52YXIgX2lkYlNvY2tldCA9IHJlcXVpcmUoJy4vaWRiU29ja2V0Jyk7XG5cbnZhciBfaWRiU29ja2V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlNvY2tldCk7XG5cbnZhciBfaWRiVHJhbnNhY3Rpb24gPSByZXF1aXJlKCcuL2lkYlRyYW5zYWN0aW9uJyk7XG5cbnZhciBfaWRiVHJhbnNhY3Rpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiVHJhbnNhY3Rpb24pO1xuXG52YXIgX2xiID0gcmVxdWlyZSgnLi9sYicpO1xuXG52YXIgX2xiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuKDAsIF9sYjIuZGVmYXVsdCkoYW5ndWxhci5tb2R1bGUoJ25nLnYxLmlkYicsIFtdKSkuY29uc3RhbnQoJ2lvJywgaW8pLnNlcnZpY2UoJ0NsYXp6ZXInLCBfQ2xhenplcjIuZGVmYXVsdCkuY29uc3RhbnQoJ2lkYlZlcnNpb24nLCAnMC4wLjEnKS5zZXJ2aWNlKCdpZGJSZXF1ZXN0JywgX2lkYlJlcXVlc3QyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYk9wZW5EQlJlcXVlc3QnLCBfaWRiT3BlbkRCUmVxdWVzdDIuZGVmYXVsdCkuc2VydmljZSgnaWRiMicsIF9pZGIyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlN0b3JlJywgX2lkYlN0b3JlMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJFdmVudFRhcmdldCcsIF9pZGJFdmVudFRhcmdldDIuZGVmYXVsdCkuc2VydmljZSgnaWRiTW9kZWwyJywgX2lkYk1vZGVsMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJTb2NrZXQyJywgX2lkYlNvY2tldDIuZGVmYXVsdCkuc2VydmljZSgnaWRiVHJhbnNhY3Rpb24nLCBfaWRiVHJhbnNhY3Rpb24yLmRlZmF1bHQpLnNlcnZpY2UoJ2RiMicsIGZ1bmN0aW9uIChpZGIyKSB7XG4gICduZ0luamVjdCc7XG5cbiAgdmFyIGRiID0gbmV3IGlkYjIoJ2FhYScsIDQpO1xuXG4gIGRiLiRhdXRvbWlncmF0aW9uKHtcbiAgICAxOiBmdW5jdGlvbiBfKGRiKSB7XG4gICAgICB2YXIgbW9kZWwgPSBkYi4kbW9kZWwoJ1RyYWJhamFkb3InKS4kY3JlYXRlU3RvcmUoKTtcbiAgICB9XG4gIH0pLiRkcm9wKCkudGhlbihmdW5jdGlvbiAoZGIpIHtcbiAgICBkYi4kb3BlbigpLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBjb25zb2xlLmxvZyhbJ29wZW5lZCddKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRiO1xufSkuc2VydmljZSgnVHJhYmFqYWRvcjInLCBmdW5jdGlvbiAoZGIyKSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIHdpbmRvdy5UcmFiYWphZG9yMiA9IGRiMi4kbW9kZWwoJ1RyYWJhamFkb3InKS4kZmllbGQoJ2NvZCcsIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KS4kZmllbGQoJ2NpJywgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pLiRmaWVsZCgnbm9tYnJlcycsIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KS4kZmllbGQoJ2FwZWxsaWRvcycsIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KS4kZmllbGQoJ25hY2ltaWVudG8nLCB7IFwidHlwZVwiOiBcImRhdGVcIiB9KS4kZmllbGQoJ2luZ3Jlc28nLCB7IFwidHlwZVwiOiBcImRhdGVcIiB9KS4kZmllbGQoJ2RpcmVjY2lvbicsIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIgfSkuJHJlbW90ZSgnL3RyYWJhamFkb3Jlcy86aWQnLCB7ICdpZCc6ICdAaWQnIH0sIHtcbiAgICAnZmluZCc6IHsgdXJsOiAnL3RyYWJhamFkb3Jlcy9fZmluZFdpdGhWZXJzaW9uJywgbWV0aG9kOiAnR0VUJywgaXNBcnJheTogdHJ1ZSB9XG4gIH0pXG4gIC8vIC52ZXJzaW9uaW5nKClcbiAgLiRidWlsZChmdW5jdGlvbiAoVHJhYmFqYWRvcikge1xuXG4gICAgVHJhYmFqYWRvci5wcm90b3R5cGUuJGNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKGRhdGEpIHt9O1xuXG4gICAgVHJhYmFqYWRvci5wcm90b3R5cGUuZ2V0Tm9tYnJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9tYnJlcyArICcgJyArIHRoaXMuYXBlbGxpZG9zO1xuICAgIH07XG4gIH0pO1xufSkucnVuKGZ1bmN0aW9uIChkYjIsIFRyYWJhamFkb3IyKSB7XG4gICduZ0luamVjdCc7XG5cbiAgdmFyIHQgPSBuZXcgVHJhYmFqYWRvcjIoKTtcbiAgdC5ub21icmVzID0gJ0FsZXhhbmRlcic7XG4gIHQuYXBlbGxpZG9zID0gJ1JvbmRvbic7XG4gIGNvbnNvbGUubG9nKHQuJGdldFZhbHVlcygpKTtcbiAgY29uc29sZS5sb2codC5nZXROb21icmUoKSk7XG5cbiAgVHJhYmFqYWRvcjIuJHB1dCh7XG4gICAgaWQ6IDEsXG4gICAgJ25vbWJyZXMnOiAnQWxleGFuZGVyJ1xuICB9KTtcblxuICBUcmFiYWphZG9yMi4kcHV0KHtcbiAgICBpZDogMixcbiAgICAnbm9tYnJlcyc6ICdHdWlsbGVtbydcbiAgfSk7XG5cbiAgVHJhYmFqYWRvcjIuJHB1dCh7XG4gICAgaWQ6IDIsXG4gICAgJ2FwZWxsaWRvcyc6ICdTZW1pbmFyaW8nXG4gIH0pO1xuXG4gIFRyYWJhamFkb3IyLiRwdXQoe1xuICAgIGlkOiA0LFxuICAgICdub21icmVzJzogJ0F4ZWwnXG4gIH0pO1xuXG4gIFRyYWJhamFkb3IyLiRwdXQoe1xuICAgICdub21icmVzJzogJ0dhYnJpZWwnXG4gIH0pO1xuXG4gIHdpbmRvdy5yID0gVHJhYmFqYWRvcjIuJGdldCgyKTtcblxuICByLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xuICAgIGNvbnNvbGUubG9nKFsndGhlbicsIHJlY29yZF0pO1xuICB9KS5jYXRjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zb2xlLmVycm9yKGV2ZW50KTtcbiAgfSk7XG59KTtcblxuLy8gUHJpbmNpcGFsZXNcblxuXG4vLyBSZXF1ZXN0XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogQ2xhenplclxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBmdW5jdGlvbiBDbGF6emVyIChjb25zdHJ1Y3Rvcikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjbGF6eicsIHsgdmFsdWU6IGNvbnN0cnVjdG9yIHx8IGZ1bmN0aW9uICgpIHt9IH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnaW5oZXJpdCcsIHtcclxuICAgIHZhbHVlOiBmdW5jdGlvbiAocGFyZW50KSB7XHJcbiAgICAgIGxldCB0bXAgPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgICB0bXAucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTtcclxuICAgICAgdGhpcy5jbGF6ei5wcm90b3R5cGUgPSBuZXcgdG1wKCk7XHJcbiAgICAgIHRoaXMuY2xhenoucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gdGhpcy5jbGF6ejtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3N0YXRpYycsIHtcclxuICAgIHZhbHVlOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuY2xhenosIG5hbWUsIHtcclxuICAgICAgICB2YWx1ZTogdmFsdWVcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdwcm9wZXJ0eScsIHtcclxuICAgIHZhbHVlOiBmdW5jdGlvbiAobmFtZSwgb3B0cykge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jbGF6ei5wcm90b3R5cGUsIG5hbWUsIG9wdHMpO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnbWV0aG9kJywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChuYW1lLCBmdW5jKSB7XHJcbiAgICAgIHRoaXMucHJvcGVydHkobmFtZSwge1xyXG4gICAgICAgIHZhbHVlOiBmdW5jXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnZ2V0dGVyJywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChmcm9tLCB0bykge1xyXG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XHJcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuJG1lW3RvXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnc2V0dGVyJywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChmcm9tLCB0bykge1xyXG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XHJcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICB0aGlzLiRtZVt0b10gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnaGFuZGxlckV2ZW50Jywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChmcm9tLCB0bykge1xyXG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XHJcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xyXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAgIHRoaXMuJG1lW3RvXSA9IGNiO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIHJldHVybiBDbGF6emVyO1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL0NsYXp6ZXIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBDbGF6emVyXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuXG4gIGZ1bmN0aW9uIENsYXp6ZXIoY29uc3RydWN0b3IpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NsYXp6JywgeyB2YWx1ZTogY29uc3RydWN0b3IgfHwgZnVuY3Rpb24gKCkge30gfSk7XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnaW5oZXJpdCcsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUocGFyZW50KSB7XG4gICAgICB2YXIgdG1wID0gZnVuY3Rpb24gdG1wKCkge307XG4gICAgICB0bXAucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTtcbiAgICAgIHRoaXMuY2xhenoucHJvdG90eXBlID0gbmV3IHRtcCgpO1xuICAgICAgdGhpcy5jbGF6ei5wcm90b3R5cGUuY29uc3RydWN0b3IgPSB0aGlzLmNsYXp6O1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnc3RhdGljJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShuYW1lLCBfdmFsdWUpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmNsYXp6LCBuYW1lLCB7XG4gICAgICAgIHZhbHVlOiBfdmFsdWVcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAncHJvcGVydHknLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKG5hbWUsIG9wdHMpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmNsYXp6LnByb3RvdHlwZSwgbmFtZSwgb3B0cyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdtZXRob2QnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKG5hbWUsIGZ1bmMpIHtcbiAgICAgIHRoaXMucHJvcGVydHkobmFtZSwge1xuICAgICAgICB2YWx1ZTogZnVuY1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdnZXR0ZXInLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGZyb20sIHRvKSB7XG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XG4gICAgICB0aGlzLnByb3BlcnR5KGZyb20sIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuJG1lW3RvXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdzZXR0ZXInLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGZyb20sIHRvKSB7XG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XG4gICAgICB0aGlzLnByb3BlcnR5KGZyb20sIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgICAgICB0aGlzLiRtZVt0b10gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdoYW5kbGVyRXZlbnQnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGZyb20sIHRvKSB7XG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XG4gICAgICB0aGlzLnByb3BlcnR5KGZyb20sIHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGNiKSB7XG4gICAgICAgICAgdGhpcy4kbWVbdG9dID0gY2I7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgcmV0dXJuIENsYXp6ZXI7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL0NsYXp6ZXIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiUmVxdWVzdFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJSZXF1ZXN0IDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBhbnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0O1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01FeGNlcHRpb24/ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIChJREJPYmplY3RTdG9yZSBvciBJREJJbmRleCBvciBJREJDdXJzb3IpPyBzb3VyY2U7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uPyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCUmVxdWVzdFJlYWR5U3RhdGUgICAgICAgICAgICAgICAgICAgICAgIHJlYWR5U3RhdGU7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25zdWNjZXNzO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogfTtcclxuICpcclxuICogZW51bSBJREJSZXF1ZXN0UmVhZHlTdGF0ZSB7XHJcbiAqICAgXCJwZW5kaW5nXCIsXHJcbiAqICAgXCJkb25lXCJcclxuICogfTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyKSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcclxuICAvLyAkX3Byb21pc2VcclxuXHJcbiAgY29uc3QgUmVhZHlTdGF0ZSA9IG5ldyBDbGF6emVyKHt9KVxyXG4gICAgICAgIC5zdGF0aWMoJ1BlbmRpbmcnLCAgJ3BlbmRpbmcnKVxyXG4gICAgICAgIC5zdGF0aWMoJ0RvbmUnLCAgICAgJ2RvbmUnKTtcclxuICBcclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlJlcXVlc3QgKG1lKSB7XHJcblxyXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFN0YXRpY3NcclxuICAuc3RhdGljKCdSZWFkeVN0YXRlJywgUmVhZHlTdGF0ZS5jbGF6eilcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gR2V0dGVyc1xyXG4gIC5nZXR0ZXIoJyRyZXN1bHQnLCAncmVzdWx0JylcclxuICAuZ2V0dGVyKCckZXJyb3InLCAnZXJyb3InKVxyXG4gIC5nZXR0ZXIoJyRzb3VyY2UnLCAnc291cmNlJylcclxuICAuZ2V0dGVyKCckcmVhZHlTdGF0ZScsICdyZWFkeVN0YXRlJylcclxuICAuZ2V0dGVyKCckdHJhbnNhY3Rpb24nLCAndHJhbnNhY3Rpb24nKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gIC5oYW5kbGVyRXZlbnQoJyRzdWNjZXNzJywgJ29uc3VjY2VzcycpXHJcbiAgLmhhbmRsZXJFdmVudCgnJGZhaWwnLCAnb25lcnJvcicpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByb3BlcnR5XHJcbiAgLnByb3BlcnR5KCckcHJvbWlzZScsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWYgKHRoaXouJF9wcm9taXNlKSByZXR1cm4gdGhpei4kX3Byb21pc2U7XHJcblxyXG4gICAgICAvLyBDcmVhciBwcm9taXNlIHBhcmEgZWwgcmVxdWVzdFxyXG4gICAgICB0aGl6LiRfcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0aGl6LiRzdWNjZXNzKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVzb2x2ZShldmVudCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuJGZhaWwoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG5ldyBDbGF6emVyKHRoaXouJF9wcm9taXNlKS5zdGF0aWMoJyRyZXF1ZXN0JywgdGhpeiApO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlJlcXVlc3QuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJSZXF1ZXN0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQlJlcXVlc3QgOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGFueSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTUV4Y2VwdGlvbj8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgKElEQk9iamVjdFN0b3JlIG9yIElEQkluZGV4IG9yIElEQkN1cnNvcik/IHNvdXJjZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb24/ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJSZXF1ZXN0UmVhZHlTdGF0ZSAgICAgICAgICAgICAgICAgICAgICAgcmVhZHlTdGF0ZTtcclxuICogXHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnN1Y2Nlc3M7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiB9O1xyXG4gKlxyXG4gKiBlbnVtIElEQlJlcXVlc3RSZWFkeVN0YXRlIHtcclxuICogICBcInBlbmRpbmdcIixcclxuICogICBcImRvbmVcIlxyXG4gKiB9O1xyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJF9wcm9taXNlXG5cbiAgdmFyIFJlYWR5U3RhdGUgPSBuZXcgQ2xhenplcih7fSkuc3RhdGljKCdQZW5kaW5nJywgJ3BlbmRpbmcnKS5zdGF0aWMoJ0RvbmUnLCAnZG9uZScpO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiUmVxdWVzdChtZSkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTdGF0aWNzXG4gIC5zdGF0aWMoJ1JlYWR5U3RhdGUnLCBSZWFkeVN0YXRlLmNsYXp6KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRyZXN1bHQnLCAncmVzdWx0JykuZ2V0dGVyKCckZXJyb3InLCAnZXJyb3InKS5nZXR0ZXIoJyRzb3VyY2UnLCAnc291cmNlJykuZ2V0dGVyKCckcmVhZHlTdGF0ZScsICdyZWFkeVN0YXRlJykuZ2V0dGVyKCckdHJhbnNhY3Rpb24nLCAndHJhbnNhY3Rpb24nKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBFdmVudCBoYW5kbGVyc1xuICAuaGFuZGxlckV2ZW50KCckc3VjY2VzcycsICdvbnN1Y2Nlc3MnKS5oYW5kbGVyRXZlbnQoJyRmYWlsJywgJ29uZXJyb3InKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQcm9wZXJ0eVxuICAucHJvcGVydHkoJyRwcm9taXNlJywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICBpZiAodGhpei4kX3Byb21pc2UpIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcblxuICAgICAgLy8gQ3JlYXIgcHJvbWlzZSBwYXJhIGVsIHJlcXVlc3RcbiAgICAgIHRoaXouJF9wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0aGl6LiRzdWNjZXNzKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xuICAgICAgICB9KS4kZmFpbChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBuZXcgQ2xhenplcih0aGl6LiRfcHJvbWlzZSkuc3RhdGljKCckcmVxdWVzdCcsIHRoaXopO1xuXG4gICAgICByZXR1cm4gdGhpei4kX3Byb21pc2U7XG4gICAgfVxuXG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiUmVxdWVzdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJPcGVuREJSZXF1ZXN0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQk9wZW5EQlJlcXVlc3QgOiBJREJSZXF1ZXN0IHtcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYmxvY2tlZDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9udXBncmFkZW5lZWRlZDtcclxuICogfTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJSZXF1ZXN0KSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJPcGVuREJSZXF1ZXN0IChtZSkge1xyXG4gICAgaWRiUmVxdWVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyAvLyBMbGFtYXIgYWwgY29uc3RydWN0b3MgZGVsIHBhZHJlXHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoaWRiUmVxdWVzdClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRXZlbnQgaGFuZGxlcnNcclxuICAuaGFuZGxlckV2ZW50KCckYmxvY2tlZCcsICdvbmJsb2NrZWQnKVxyXG4gIC5oYW5kbGVyRXZlbnQoJyR1cGdyYWRlbmVlZGVkJywgJ29udXBncmFkZW5lZWRlZCcpXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYk9wZW5EQlJlcXVlc3QuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJPcGVuREJSZXF1ZXN0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQk9wZW5EQlJlcXVlc3QgOiBJREJSZXF1ZXN0IHtcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYmxvY2tlZDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9udXBncmFkZW5lZWRlZDtcclxuICogfTtcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJSZXF1ZXN0KSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJPcGVuREJSZXF1ZXN0KG1lKSB7XG4gICAgaWRiUmVxdWVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyAvLyBMbGFtYXIgYWwgY29uc3RydWN0b3MgZGVsIHBhZHJlXG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KGlkYlJlcXVlc3QpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGhhbmRsZXJzXG4gIC5oYW5kbGVyRXZlbnQoJyRibG9ja2VkJywgJ29uYmxvY2tlZCcpLmhhbmRsZXJFdmVudCgnJHVwZ3JhZGVuZWVkZWQnLCAnb251cGdyYWRlbmVlZGVkJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJPcGVuREJSZXF1ZXN0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJGYWN0b3J5IHtcclxuICogICBJREJPcGVuREJSZXF1ZXN0IG9wZW4oRE9NU3RyaW5nIG5hbWUsIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgbG9uZyB2ZXJzaW9uKTtcclxuICogICBJREJPcGVuREJSZXF1ZXN0IGRlbGV0ZURhdGFiYXNlKERPTVN0cmluZyBuYW1lKTtcclxuICogICBzaG9ydCBjbXAoYW55IGZpcnN0LCBhbnkgc2Vjb25kKTtcclxuICogfTtcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCRGF0YWJhc2UgOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZyAgICAgICAgICBuYW1lO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSB1bnNpZ25lZCBsb25nIGxvbmcgdmVyc2lvbjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgICAgIG9iamVjdFN0b3JlTmFtZXM7XHJcbiAqIFxyXG4gKiAgIElEQlRyYW5zYWN0aW9uIHRyYW5zYWN0aW9uKChET01TdHJpbmcgb3Igc2VxdWVuY2U8RE9NU3RyaW5nPikgc3RvcmVOYW1lcywgb3B0aW9uYWwgSURCVHJhbnNhY3Rpb25Nb2RlIG1vZGUgPSBcInJlYWRvbmx5XCIpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGNsb3NlKCk7XHJcbiAqICAgSURCT2JqZWN0U3RvcmUgY3JlYXRlT2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUsIG9wdGlvbmFsIElEQk9iamVjdFN0b3JlUGFyYW1ldGVycyBvcHRpb25zKTtcclxuICogICB2b2lkICAgICAgICAgICBkZWxldGVPYmplY3RTdG9yZShET01TdHJpbmcgbmFtZSk7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25hYm9ydDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uY2xvc2U7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb252ZXJzaW9uY2hhbmdlO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZGljdGlvbmFyeSBJREJPYmplY3RTdG9yZVBhcmFtZXRlcnMge1xyXG4gKiAgIChET01TdHJpbmcgb3Igc2VxdWVuY2U8RE9NU3RyaW5nPik/IGtleVBhdGggPSBudWxsO1xyXG4gKiAgIGJvb2xlYW4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9JbmNyZW1lbnQgPSBmYWxzZTtcclxuICogfTttZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYkV2ZW50VGFyZ2V0LCBpZGJTdG9yZSwgaWRiTW9kZWwyLCBpZGJPcGVuREJSZXF1ZXN0LCBpZGJUcmFuc2FjdGlvbiwgJGxvZykgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cclxuICBjb25zdCBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XHJcbiAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxyXG4gIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxyXG4gIGNvbnN0IElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcclxuICBjb25zdCBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XHJcbiAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcclxuICBcclxuICBpZiAoIWluZGV4ZWREQikge1xyXG4gICAgYWxlcnQoJ1N1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhcycpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRtZVxyXG4gIC8vICRvcGVuZWRcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvciAgXHJcbiAgY29uc3QgaWRiID0gZnVuY3Rpb24gaWRiKG5hbWUsIHZlcnNpb24sIHNvY2tldCkge1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpXHJcbiAgICAgIC5zdGF0aWMoJyRuYW1lJywgbmFtZSlcclxuICAgICAgLnN0YXRpYygnJHZlcnNpb24nLCB2ZXJzaW9uKVxyXG4gICAgICAuc3RhdGljKCckc29ja2V0Jywgc29ja2V0KTtcclxuXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihpZGIpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoaWRiRXZlbnRUYXJnZXQpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByb3BpZWRhZGVzXHJcbiAgLnByb3BlcnR5KCckX3VwZ3JhZGVuZWVkZWRzJywgeyB2YWx1ZTpbXSB9KVxyXG4gIC5wcm9wZXJ0eSgnJF9tb2RlbHMnLCB7IHZhbHVlOiB7fSB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJG9iamVjdFN0b3JlTmFtZXMnLCAnb2JqZWN0U3RvcmVOYW1lcycpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEV2ZW50IGhhbmRsZXJzXHJcbiAgLmhhbmRsZXJFdmVudCgnJGFib3J0ZWQnLCAnb25hYm9ydCcpXHJcbiAgLmhhbmRsZXJFdmVudCgnJGNsb3NlZCcsICdvbmNsb3NlJylcclxuICAuaGFuZGxlckV2ZW50KCckZXJyb3InLCAnb25lcnJvcicpXHJcbiAgLmhhbmRsZXJFdmVudCgnJHZlcnNpb25DaGFuZ2VkJywgJ29udmVyc2lvbmNoYW5nZScpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRvcGVuJywgZnVuY3Rpb24gKG5hbWUsIHZlcnNpb24pIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYk9wZW5EQlJlcXVlc3QoaW5kZXhlZERCLm9wZW4obmFtZSwgdmVyc2lvbikpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZHJvcCcsIGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICBcclxuICAgIHJldHVybiBuZXcgaWRiT3BlbkRCUmVxdWVzdChpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UobmFtZSkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckY21wJywgZnVuY3Rpb24gKGZpcnN0LCBzZWNvbmQpIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIGluZGV4ZWREQi5jbXAoZmlyc3QsIHNlY29uZCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyR1cGdyYWRlbmVlZGVkJywgZnVuY3Rpb24gKGNiKSB7XHJcbiAgICBcclxuICAgIHRoaXMuJF91cGdyYWRlbmVlZGVkcy5wdXNoKGNiKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckYXV0b21pZ3JhdGlvbicsIGZ1bmN0aW9uIChhbGxNaWdyYXRpb25zKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuJHVwZ3JhZGVuZWVkZWQoZnVuY3Rpb24gKHRoaXosIG9wZW5SZXF1ZXN0LCBldmVudCkge1xyXG4gICAgICBPYmplY3Qua2V5cyhhbGxNaWdyYXRpb25zKS5tYXAoZnVuY3Rpb24gKHZlcnNpb24pIHtcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50Lm9sZFZlcnNpb24gPCB2ZXJzaW9uICYmIHZlcnNpb24gPD0gZXZlbnQubmV3VmVyc2lvbikge1xyXG5cclxuICAgICAgICAgIGNvbnN0IG1pZ3JhdGlvbnMgPSBBcnJheS5pc0FycmF5KGFsbE1pZ3JhdGlvbnNbdmVyc2lvbl0pP1xyXG4gICAgICAgICAgICBhbGxNaWdyYXRpb25zW3ZlcnNpb25dOlthbGxNaWdyYXRpb25zW3ZlcnNpb25dXTtcclxuXHJcbiAgICAgICAgICAkbG9nLmxvZygnbWlncmF0aW9uIHYnK3ZlcnNpb24rJyBzdGFydHMnKTtcclxuICAgICAgICAgIG1pZ3JhdGlvbnMubWFwKGZ1bmN0aW9uIChtaWdyYXRpb24pIHtcclxuICAgICAgICAgICAgbWlncmF0aW9uKHRoaXosIG9wZW5SZXF1ZXN0LCBldmVudCk7XHJcblxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICAkbG9nLmxvZygnbWlncmF0aW9uIHYnK3ZlcnNpb24rJyBlbmRzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJG9wZW4nLCBmdW5jdGlvbiAoY2IsIGNiRXJyKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIGxldCBsYXN0UnEgPSBudWxsO1xyXG4gICAgbGV0IGxhc3RFdmVudCA9IG51bGw7XHJcblxyXG4gICAgaWYgKCF0aGl6LiRvcGVuZWQpIHtcclxuXHJcbiAgICAgIHRoaXouJG9wZW5lZCA9IChsYXN0UnEgPSBpZGIuJG9wZW4odGhpei4kbmFtZSwgdGhpei4kdmVyc2lvbilcclxuICAgICAgICAuJHVwZ3JhZGVuZWVkZWQoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgICB0aGl6LiRfdXBncmFkZW5lZWRlZHMubWFwKGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgICBjYi5hcHBseSh0aGl6LCBbdGhpeiwgbGFzdFJxLCBldmVudF0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkpXHJcblxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHRoaXouJG1lID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgICAgIGxhc3RFdmVudCA9IGV2ZW50O1xyXG4gICAgICAgICAgaWYgKGNiKSBjYih0aGl6LCBsYXN0UnEsIGV2ZW50KTtcclxuICAgICAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgbGFzdFJxID0gbnVsbDtcclxuICAgICAgICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XHJcbiAgICAgICAgICBpZiAoY2JFcnIpIGNiRXJyKHRoaXosIGxhc3RScSwgZXZlbnQpO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSBlbHNlIGlmIChjYikge1xyXG5cclxuICAgICAgY2IodGhpeiwgbGFzdFJxLCBsYXN0RXZlbnQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpei4kb3BlbmVkO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZHJvcCcsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgIGNvbnN0IHJxID0gaWRiLiRkcm9wKHRoaXouJG5hbWUpXHJcbiAgICAgICAgLiRzdWNjZXNzKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVzb2x2ZSh0aGl6KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLiRmYWlsKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgaWYgKGNiKSBjYihycSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRjbG9zZScsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB0aGlzLiRtZS5jbG9zZSgpO1xyXG4gICAgXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNyZWF0ZVN0b3JlJywgZnVuY3Rpb24gKG5hbWUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLmNyZWF0ZU9iamVjdFN0b3JlKG5hbWUsIG9wdGlvbnMpKTtcclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRkcm9wU3RvcmUnLCBmdW5jdGlvbiAobmFtZSkge1xyXG5cclxuICAgIHRoaXMuJG1lLmRlbGV0ZU9iamVjdFN0b3JlKG5hbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckbW9kZWwnLCBmdW5jdGlvbiAobmFtZSwgc29ja2V0KSB7XHJcblxyXG4gICAgLy8gU2kgZXhpc3RlIGVsIG1vZGVsbyByZXRvcm5hcmxvXHJcbiAgICBpZih0aGlzLiRfbW9kZWxzW25hbWVdKSByZXR1cm4gdGhpcy4kX21vZGVsc1tuYW1lXTtcclxuXHJcbiAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsbyB5IGd1YXJkYXJsb1xyXG4gICAgcmV0dXJuIHRoaXMuJF9tb2RlbHNbbmFtZV0gPSBpZGJNb2RlbDIodGhpcywgbmFtZSwgc29ja2V0IHx8IHRoaXMuJHNvY2tldCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyR0cmFuc2FjdGlvbicsIGZ1bmN0aW9uIChzdG9yZU5hbWVzLCBtb2RlKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICB0aGl6LiRvcGVuKClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAodGhpeikge1xyXG4gICAgICAgICAgcmVzb2x2ZShuZXcgaWRiVHJhbnNhY3Rpb24odGhpei4kbWUudHJhbnNhY3Rpb24oc3RvcmVOYW1lcywgbW9kZSkpKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlamVjdChldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc3RvcmUnLCBmdW5jdGlvbiAoc3RvcmVOYW1lcykgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShzdG9yZU5hbWVzKSkgc3RvcmVOYW1lcyA9IFtzdG9yZU5hbWVzXTtcclxuXHJcbiAgICBmdW5jdGlvbiBhY3Rpb24obW9kZSkge1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICB0aGl6LiR0cmFuc2FjdGlvbihzdG9yZU5hbWVzLCBtb2RlKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICAgICAgICBjb25zdCBzdG9yZXNPYmogPSB7fTtcclxuICAgICAgICAgICAgICBjb25zdCBzdG9yZXMgPSBzdG9yZU5hbWVzLm1hcChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RvcmVzT2JqW3N0b3JlTmFtZV0gPSB0eC4kc3RvcmUoc3RvcmVOYW1lKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBpZiAoY2IpIGNiLmFwcGx5KHRoaXosIHN0b3Jlcyk7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShzdG9yZXNPYmopO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgcmVqZWN0KGV2ZW50KVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBDbGF6emVyKHt9KVxyXG4gICAgICAuc3RhdGljKCckcmVhZGVyJywgYWN0aW9uKGlkYlRyYW5zYWN0aW9uLlRyYW5zYWN0aW9uTW9kZS5SZWFkT25seSkpXHJcbiAgICAgIC5zdGF0aWMoJyR3cml0ZXInLCBhY3Rpb24oaWRiVHJhbnNhY3Rpb24uVHJhbnNhY3Rpb25Nb2RlLlJlYWRXcml0ZSkpXHJcbiAgICAgIC5jbGF6elxyXG5cclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCRmFjdG9yeSB7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBvcGVuKERPTVN0cmluZyBuYW1lLCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGxvbmcgdmVyc2lvbik7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBkZWxldGVEYXRhYmFzZShET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgc2hvcnQgY21wKGFueSBmaXJzdCwgYW55IHNlY29uZCk7XHJcbiAqIH07XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkRhdGFiYXNlIDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgdW5zaWduZWQgbG9uZyBsb25nIHZlcnNpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgICAgICBvYmplY3RTdG9yZU5hbWVzO1xyXG4gKiBcclxuICogICBJREJUcmFuc2FjdGlvbiB0cmFuc2FjdGlvbigoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pIHN0b3JlTmFtZXMsIG9wdGlvbmFsIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlID0gXCJyZWFkb25seVwiKTtcclxuICogICB2b2lkICAgICAgICAgICBjbG9zZSgpO1xyXG4gKiAgIElEQk9iamVjdFN0b3JlIGNyZWF0ZU9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lLCBvcHRpb25hbCBJREJPYmplY3RTdG9yZVBhcmFtZXRlcnMgb3B0aW9ucyk7XHJcbiAqICAgdm9pZCAgICAgICAgICAgZGVsZXRlT2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYWJvcnQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmNsb3NlO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9udmVyc2lvbmNoYW5nZTtcclxuICogfTtcclxuICogXHJcbiAqIGRpY3Rpb25hcnkgSURCT2JqZWN0U3RvcmVQYXJhbWV0ZXJzIHtcclxuICogICAoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pPyBrZXlQYXRoID0gbnVsbDtcclxuICogICBib29sZWFuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvSW5jcmVtZW50ID0gZmFsc2U7XHJcbiAqIH07bWVcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJFdmVudFRhcmdldCwgaWRiU3RvcmUsIGlkYk1vZGVsMiwgaWRiT3BlbkRCUmVxdWVzdCwgaWRiVHJhbnNhY3Rpb24sICRsb2cpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyBFbiBsYSBzaWd1aWVudGUgbGluZWEsIHB1ZWRlIGluY2x1aXIgcHJlZmlqb3MgZGUgaW1wbGVtZW50YWNpb24gcXVlIHF1aWVyYSBwcm9iYXIuXG5cbiAgdmFyIGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQjtcbiAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxuICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcbiAgdmFyIElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcbiAgdmFyIElEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcbiAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcblxuICBpZiAoIWluZGV4ZWREQikge1xuICAgIGFsZXJ0KCdTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXMnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJG1lXG4gIC8vICRvcGVuZWRcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3IgIFxuICB2YXIgaWRiID0gZnVuY3Rpb24gaWRiKG5hbWUsIHZlcnNpb24sIHNvY2tldCkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbmFtZScsIG5hbWUpLnN0YXRpYygnJHZlcnNpb24nLCB2ZXJzaW9uKS5zdGF0aWMoJyRzb2NrZXQnLCBzb2NrZXQpO1xuICB9O1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoaWRiKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBIZXJlbmNpYVxuICAuaW5oZXJpdChpZGJFdmVudFRhcmdldClcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUHJvcGllZGFkZXNcbiAgLnByb3BlcnR5KCckX3VwZ3JhZGVuZWVkZWRzJywgeyB2YWx1ZTogW10gfSkucHJvcGVydHkoJyRfbW9kZWxzJywgeyB2YWx1ZToge30gfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR2V0dGVyc1xuICAuZ2V0dGVyKCckb2JqZWN0U3RvcmVOYW1lcycsICdvYmplY3RTdG9yZU5hbWVzJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRXZlbnQgaGFuZGxlcnNcbiAgLmhhbmRsZXJFdmVudCgnJGFib3J0ZWQnLCAnb25hYm9ydCcpLmhhbmRsZXJFdmVudCgnJGNsb3NlZCcsICdvbmNsb3NlJykuaGFuZGxlckV2ZW50KCckZXJyb3InLCAnb25lcnJvcicpLmhhbmRsZXJFdmVudCgnJHZlcnNpb25DaGFuZ2VkJywgJ29udmVyc2lvbmNoYW5nZScpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5zdGF0aWMoJyRvcGVuJywgZnVuY3Rpb24gKG5hbWUsIHZlcnNpb24pIHtcblxuICAgIHJldHVybiBuZXcgaWRiT3BlbkRCUmVxdWVzdChpbmRleGVkREIub3BlbihuYW1lLCB2ZXJzaW9uKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5zdGF0aWMoJyRkcm9wJywgZnVuY3Rpb24gKG5hbWUpIHtcblxuICAgIHJldHVybiBuZXcgaWRiT3BlbkRCUmVxdWVzdChpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UobmFtZSkpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuc3RhdGljKCckY21wJywgZnVuY3Rpb24gKGZpcnN0LCBzZWNvbmQpIHtcblxuICAgIHJldHVybiBpbmRleGVkREIuY21wKGZpcnN0LCBzZWNvbmQpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckdXBncmFkZW5lZWRlZCcsIGZ1bmN0aW9uIChjYikge1xuXG4gICAgdGhpcy4kX3VwZ3JhZGVuZWVkZWRzLnB1c2goY2IpO1xuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckYXV0b21pZ3JhdGlvbicsIGZ1bmN0aW9uIChhbGxNaWdyYXRpb25zKSB7XG5cbiAgICByZXR1cm4gdGhpcy4kdXBncmFkZW5lZWRlZChmdW5jdGlvbiAodGhpeiwgb3BlblJlcXVlc3QsIGV2ZW50KSB7XG4gICAgICBPYmplY3Qua2V5cyhhbGxNaWdyYXRpb25zKS5tYXAoZnVuY3Rpb24gKHZlcnNpb24pIHtcblxuICAgICAgICBpZiAoZXZlbnQub2xkVmVyc2lvbiA8IHZlcnNpb24gJiYgdmVyc2lvbiA8PSBldmVudC5uZXdWZXJzaW9uKSB7XG5cbiAgICAgICAgICB2YXIgbWlncmF0aW9ucyA9IEFycmF5LmlzQXJyYXkoYWxsTWlncmF0aW9uc1t2ZXJzaW9uXSkgPyBhbGxNaWdyYXRpb25zW3ZlcnNpb25dIDogW2FsbE1pZ3JhdGlvbnNbdmVyc2lvbl1dO1xuXG4gICAgICAgICAgJGxvZy5sb2coJ21pZ3JhdGlvbiB2JyArIHZlcnNpb24gKyAnIHN0YXJ0cycpO1xuICAgICAgICAgIG1pZ3JhdGlvbnMubWFwKGZ1bmN0aW9uIChtaWdyYXRpb24pIHtcbiAgICAgICAgICAgIG1pZ3JhdGlvbih0aGl6LCBvcGVuUmVxdWVzdCwgZXZlbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgICRsb2cubG9nKCdtaWdyYXRpb24gdicgKyB2ZXJzaW9uICsgJyBlbmRzJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckb3BlbicsIGZ1bmN0aW9uIChjYiwgY2JFcnIpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICB2YXIgbGFzdFJxID0gbnVsbDtcbiAgICB2YXIgbGFzdEV2ZW50ID0gbnVsbDtcblxuICAgIGlmICghdGhpei4kb3BlbmVkKSB7XG5cbiAgICAgIHRoaXouJG9wZW5lZCA9IChsYXN0UnEgPSBpZGIuJG9wZW4odGhpei4kbmFtZSwgdGhpei4kdmVyc2lvbikuJHVwZ3JhZGVuZWVkZWQoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHRoaXouJG1lID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgdGhpei4kX3VwZ3JhZGVuZWVkZWRzLm1hcChmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICBjYi5hcHBseSh0aGl6LCBbdGhpeiwgbGFzdFJxLCBldmVudF0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgIGxhc3RFdmVudCA9IGV2ZW50O1xuICAgICAgICBpZiAoY2IpIGNiKHRoaXosIGxhc3RScSwgZXZlbnQpO1xuICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBsYXN0UnEgPSBudWxsO1xuICAgICAgICB0aGl6LiRvcGVuZWQgPSBudWxsO1xuICAgICAgICBpZiAoY2JFcnIpIGNiRXJyKHRoaXosIGxhc3RScSwgZXZlbnQpO1xuICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY2IpIHtcblxuICAgICAgY2IodGhpeiwgbGFzdFJxLCBsYXN0RXZlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGl6LiRvcGVuZWQ7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRkcm9wJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICB2YXIgcnEgPSBpZGIuJGRyb3AodGhpei4kbmFtZSkuJHN1Y2Nlc3MoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJlc29sdmUodGhpeik7XG4gICAgICB9KS4kZmFpbChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgcmVqZWN0KGV2ZW50KTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGNiKSBjYihycSk7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjbG9zZScsIGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuJG1lLmNsb3NlKCk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjcmVhdGVTdG9yZScsIGZ1bmN0aW9uIChuYW1lLCBvcHRpb25zKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLmNyZWF0ZU9iamVjdFN0b3JlKG5hbWUsIG9wdGlvbnMpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGRyb3BTdG9yZScsIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICB0aGlzLiRtZS5kZWxldGVPYmplY3RTdG9yZShuYW1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJG1vZGVsJywgZnVuY3Rpb24gKG5hbWUsIHNvY2tldCkge1xuXG4gICAgLy8gU2kgZXhpc3RlIGVsIG1vZGVsbyByZXRvcm5hcmxvXG4gICAgaWYgKHRoaXMuJF9tb2RlbHNbbmFtZV0pIHJldHVybiB0aGlzLiRfbW9kZWxzW25hbWVdO1xuXG4gICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG8geSBndWFyZGFybG9cbiAgICByZXR1cm4gdGhpcy4kX21vZGVsc1tuYW1lXSA9IGlkYk1vZGVsMih0aGlzLCBuYW1lLCBzb2NrZXQgfHwgdGhpcy4kc29ja2V0KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHRyYW5zYWN0aW9uJywgZnVuY3Rpb24gKHN0b3JlTmFtZXMsIG1vZGUpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdGhpei4kb3BlbigpLnRoZW4oZnVuY3Rpb24gKHRoaXopIHtcbiAgICAgICAgcmVzb2x2ZShuZXcgaWRiVHJhbnNhY3Rpb24odGhpei4kbWUudHJhbnNhY3Rpb24oc3RvcmVOYW1lcywgbW9kZSkpKTtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZWplY3QoZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRzdG9yZScsIGZ1bmN0aW9uIChzdG9yZU5hbWVzKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShzdG9yZU5hbWVzKSkgc3RvcmVOYW1lcyA9IFtzdG9yZU5hbWVzXTtcblxuICAgIGZ1bmN0aW9uIGFjdGlvbihtb2RlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICB0aGl6LiR0cmFuc2FjdGlvbihzdG9yZU5hbWVzLCBtb2RlKS50aGVuKGZ1bmN0aW9uICh0eCkge1xuICAgICAgICAgICAgdmFyIHN0b3Jlc09iaiA9IHt9O1xuICAgICAgICAgICAgdmFyIHN0b3JlcyA9IHN0b3JlTmFtZXMubWFwKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHN0b3Jlc09ialtzdG9yZU5hbWVdID0gdHguJHN0b3JlKHN0b3JlTmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChjYikgY2IuYXBwbHkodGhpeiwgc3RvcmVzKTtcbiAgICAgICAgICAgIHJlc29sdmUoc3RvcmVzT2JqKTtcbiAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJlamVjdChldmVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENsYXp6ZXIoe30pLnN0YXRpYygnJHJlYWRlcicsIGFjdGlvbihpZGJUcmFuc2FjdGlvbi5UcmFuc2FjdGlvbk1vZGUuUmVhZE9ubHkpKS5zdGF0aWMoJyR3cml0ZXInLCBhY3Rpb24oaWRiVHJhbnNhY3Rpb24uVHJhbnNhY3Rpb25Nb2RlLlJlYWRXcml0ZSkpLmNsYXp6O1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJTdG9yZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJPYmplY3RTdG9yZSB7XHJcbiAqICAgICAgICAgICAgYXR0cmlidXRlIERPTVN0cmluZyAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGFueSAgICAgICAgICAgIGtleVBhdGg7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgIGluZGV4TmFtZXM7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uIHRyYW5zYWN0aW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICBhdXRvSW5jcmVtZW50O1xyXG4gKiBcclxuICogICBJREJSZXF1ZXN0IHB1dChhbnkgdmFsdWUsIG9wdGlvbmFsIGFueSBrZXkpO1xyXG4gKiAgIElEQlJlcXVlc3QgYWRkKGFueSB2YWx1ZSwgb3B0aW9uYWwgYW55IGtleSk7XHJcbiAqICAgSURCUmVxdWVzdCBkZWxldGUoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGNsZWFyKCk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXQoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGdldEtleShhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0QWxsKG9wdGlvbmFsIGFueSBxdWVyeSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBjb3VudCk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGxLZXlzKG9wdGlvbmFsIGFueSBxdWVyeSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBjb3VudCk7XHJcbiAqICAgSURCUmVxdWVzdCBjb3VudChvcHRpb25hbCBhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3Qgb3BlbkN1cnNvcihvcHRpb25hbCBhbnkgcXVlcnksIG9wdGlvbmFsIElEQkN1cnNvckRpcmVjdGlvbiBkaXJlY3Rpb24gPSBcIm5leHRcIik7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuS2V5Q3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogICBJREJJbmRleCAgIGluZGV4KERPTVN0cmluZyBuYW1lKTtcclxuICogICBJREJJbmRleCAgIGNyZWF0ZUluZGV4KERPTVN0cmluZyBuYW1lLCAoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pIGtleVBhdGgsIG9wdGlvbmFsIElEQkluZGV4UGFyYW1ldGVycyBvcHRpb25zKTtcclxuICogICB2b2lkICAgICAgIGRlbGV0ZUluZGV4KERPTVN0cmluZyBpbmRleE5hbWUpO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZGljdGlvbmFyeSBJREJJbmRleFBhcmFtZXRlcnMge1xyXG4gKiAgIGJvb2xlYW4gdW5pcXVlID0gZmFsc2U7XHJcbiAqICAgYm9vbGVhbiBtdWx0aUVudHJ5ID0gZmFsc2U7XHJcbiAqIH07XHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJTdG9yZSAobWUpIHtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gR2V0dGVyc1xyXG4gIC5nZXR0ZXIoJyRuYW1lJywgJ25hbWUnKVxyXG4gIC5nZXR0ZXIoJyRrZXlQYXRoJywgJ2tleVBhdGgnKVxyXG4gIC5nZXR0ZXIoJyRpbmRleE5hbWVzJywgJ2luZGV4TmFtZXMnKVxyXG4gIC5nZXR0ZXIoJyR0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpXHJcbiAgLmdldHRlcignJGF1dG9JbmNyZW1lbnQnLCAnYXV0b0luY3JlbWVudCcpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRwdXQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5wdXQodmFsdWUsIGtleSkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckYWRkJywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuYWRkKHZhbHVlLCBrZXkpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGRlbGV0ZScsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5kZWxldGUocXVlcnkpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNsZWFyJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5jbGVhcigpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldCcsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXQocXVlcnkpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldEtleScsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRLZXkocXVlcnkpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldEFsbCcsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0QWxsKHF1ZXJ5LCBjb3VudCkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZ2V0QWxsS2V5cycsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0QWxsS2V5cyhxdWVyeSwgY291bnQpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNvdW50JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNvdW50KHF1ZXJ5KSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRvcGVuQ3Vyc29yJywgZnVuY3Rpb24gKHF1ZXJ5LCBkaXJlY3Rpb24pIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUub3BlbkN1cnNvcihxdWVyeSwgZGlyZWN0aW9uKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRvcGVuS2V5Q3Vyc29yJywgZnVuY3Rpb24gKHF1ZXJ5LCBkaXJlY3Rpb24pIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUub3BlbktleUN1cnNvcihxdWVyeSwgZGlyZWN0aW9uKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRpbmRleCcsIGZ1bmN0aW9uIChuYW1lKSB7XHJcblxyXG4gICAgdGhyb3cgJ2lkYlN0b3JlLm1ldGhvZC4kaW5kZXgnO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckY3JlYXRlSW5kZXgnLCBmdW5jdGlvbiAobmFtZSwga2V5UGF0aCwgb3B0aW9ucykge1xyXG5cclxuICAgIHRocm93ICdpZGJTdG9yZS5tZXRob2QuJGNyZWF0ZUluZGV4JztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGRlbGV0ZUluZGV4JywgZnVuY3Rpb24gKGluZGV4TmFtZSkge1xyXG5cclxuICAgIHRoaXMuJG1lLmRlbGV0ZUluZGV4KGluZGV4TmFtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJTdG9yZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYlN0b3JlXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQk9iamVjdFN0b3JlIHtcclxuICogICAgICAgICAgICBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAga2V5UGF0aDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgaW5kZXhOYW1lcztcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb24gdHJhbnNhY3Rpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGJvb2xlYW4gICAgICAgIGF1dG9JbmNyZW1lbnQ7XHJcbiAqIFxyXG4gKiAgIElEQlJlcXVlc3QgcHV0KGFueSB2YWx1ZSwgb3B0aW9uYWwgYW55IGtleSk7XHJcbiAqICAgSURCUmVxdWVzdCBhZGQoYW55IHZhbHVlLCBvcHRpb25hbCBhbnkga2V5KTtcclxuICogICBJREJSZXF1ZXN0IGRlbGV0ZShhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgY2xlYXIoKTtcclxuICogICBJREJSZXF1ZXN0IGdldChhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0S2V5KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGwob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbEtleXMob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGNvdW50KG9wdGlvbmFsIGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuQ3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5LZXlDdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiAgIElEQkluZGV4ICAgaW5kZXgoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIElEQkluZGV4ICAgY3JlYXRlSW5kZXgoRE9NU3RyaW5nIG5hbWUsIChET01TdHJpbmcgb3Igc2VxdWVuY2U8RE9NU3RyaW5nPikga2V5UGF0aCwgb3B0aW9uYWwgSURCSW5kZXhQYXJhbWV0ZXJzIG9wdGlvbnMpO1xyXG4gKiAgIHZvaWQgICAgICAgZGVsZXRlSW5kZXgoRE9NU3RyaW5nIGluZGV4TmFtZSk7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBkaWN0aW9uYXJ5IElEQkluZGV4UGFyYW1ldGVycyB7XHJcbiAqICAgYm9vbGVhbiB1bmlxdWUgPSBmYWxzZTtcclxuICogICBib29sZWFuIG11bHRpRW50cnkgPSBmYWxzZTtcclxuICogfTtcclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiUmVxdWVzdCkge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiU3RvcmUobWUpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRuYW1lJywgJ25hbWUnKS5nZXR0ZXIoJyRrZXlQYXRoJywgJ2tleVBhdGgnKS5nZXR0ZXIoJyRpbmRleE5hbWVzJywgJ2luZGV4TmFtZXMnKS5nZXR0ZXIoJyR0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpLmdldHRlcignJGF1dG9JbmNyZW1lbnQnLCAnYXV0b0luY3JlbWVudCcpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRwdXQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLnB1dCh2YWx1ZSwga2V5KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRhZGQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmFkZCh2YWx1ZSwga2V5KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRkZWxldGUnLCBmdW5jdGlvbiAocXVlcnkpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5kZWxldGUocXVlcnkpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGNsZWFyJywgZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNsZWFyKCkpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZ2V0JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0KHF1ZXJ5KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRnZXRLZXknLCBmdW5jdGlvbiAocXVlcnkpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRLZXkocXVlcnkpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGdldEFsbCcsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRBbGwocXVlcnksIGNvdW50KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRnZXRBbGxLZXlzJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldEFsbEtleXMocXVlcnksIGNvdW50KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjb3VudCcsIGZ1bmN0aW9uIChxdWVyeSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNvdW50KHF1ZXJ5KSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRvcGVuQ3Vyc29yJywgZnVuY3Rpb24gKHF1ZXJ5LCBkaXJlY3Rpb24pIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5vcGVuQ3Vyc29yKHF1ZXJ5LCBkaXJlY3Rpb24pKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJG9wZW5LZXlDdXJzb3InLCBmdW5jdGlvbiAocXVlcnksIGRpcmVjdGlvbikge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLm9wZW5LZXlDdXJzb3IocXVlcnksIGRpcmVjdGlvbikpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckaW5kZXgnLCBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgdGhyb3cgJ2lkYlN0b3JlLm1ldGhvZC4kaW5kZXgnO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckY3JlYXRlSW5kZXgnLCBmdW5jdGlvbiAobmFtZSwga2V5UGF0aCwgb3B0aW9ucykge1xuXG4gICAgdGhyb3cgJ2lkYlN0b3JlLm1ldGhvZC4kY3JlYXRlSW5kZXgnO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZGVsZXRlSW5kZXgnLCBmdW5jdGlvbiAoaW5kZXhOYW1lKSB7XG5cbiAgICB0aGlzLiRtZS5kZWxldGVJbmRleChpbmRleE5hbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlN0b3JlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYk1vZGVsXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYkV2ZW50VGFyZ2V0LCBsYlJlc291cmNlLCAkdGltZW91dCkgeyAnbmdJbmplY3QnO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQnVzY2FyIHVuIGNhbXBvXHJcbmNvbnN0IGRlZXBGaWVsZCA9IGZ1bmN0aW9uIChvYmosIGZpZWxkLCBjYikge1xyXG5cclxuICBjb25zdCBmaWVsZHMgPSBmaWVsZC5zcGxpdCgnLicpO1xyXG4gIGNvbnN0IGxhc3RGaWVsZCA9IGZpZWxkcy5wb3AoKTtcclxuXHJcbiAgcmV0dXJuIChmdW5jdGlvbiBfc2V0KG9iaikge1xyXG4gICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMClcclxuICAgICAgcmV0dXJuIGNiKG9iaiwgbGFzdEZpZWxkKTtcclxuICAgIGNvbnN0IGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XHJcbiAgICBpZiAodHlwZW9mIG9ialtmaWVsZF0gPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICBvYmpbZmllbGRdID0ge307XHJcbiAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcclxuICB9KShvYmopO1xyXG5cclxufTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xyXG5jb25zdCBnZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gKG9iaiwgZmllbGQpIHtcclxuICByZXR1cm4gZGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXHJcbmNvbnN0IHNldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgdmFsdWUpIHtcclxuICBkZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xyXG4gIH0pO1xyXG4gIHJldHVybiBvYmo7XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5yZXR1cm4gZnVuY3Rpb24gaWRiTW9kZWxGYWN0b3J5IChkYiwgbmFtZSwgc29ja2V0KSB7XHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcclxuICAvLyAkX3JlbW90ZVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGZ1bmN0aW9uIGlkYk1vZGVsKCkge1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihpZGJNb2RlbClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAuaW5oZXJpdChpZGJFdmVudFRhcmdldClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAvLyAuaW5oZXJpdChFdmVudFRhcmdldClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJvcGllZGFkZXMgc3RhdGljYXNcclxuICAuc3RhdGljKCckZGInLCBkYilcclxuICAuc3RhdGljKCckbmFtZScsIG5hbWUpXHJcbiAgLnN0YXRpYygnJHNvY2tldCcsIHNvY2tldClcclxuXHJcbiAgLnN0YXRpYygnJGlkJywgeyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OiB0cnVlIH0pXHJcbiAgLnN0YXRpYygnJGZpZWxkcycsIHtcclxuICAgIGlkOiB7XHJcbiAgICAgIGlkOiB0cnVlLFxyXG4gICAgICBuYW1lOiAnaWQnLFxyXG4gICAgICB0eXBlOiAnbnVtYmVyJ1xyXG4gICAgfVxyXG4gIH0pXHJcbiAgLnN0YXRpYygnJGluc3RhbmNlcycsIHt9KVxyXG4gICAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGdldEtleUZyb20nLCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsIHRoaXMuJGlkLmtleVBhdGgpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckY3JlYXRlU3RvcmUnLCBmdW5jdGlvbiAoY2IpIHtcclxuXHJcbiAgICBjb25zdCBzdG9yZSA9IHRoaXMuJGRiLiRjcmVhdGVTdG9yZSh0aGlzLiRuYW1lLCB0aGlzLiRpZCk7XHJcblxyXG4gICAgaWYgKGNiKSBjYih0aGlzLCBzdG9yZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyR3cml0ZXInLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJGRiLiRzdG9yZSh0aGl6LiRuYW1lKS4kd3JpdGVyKGNiKVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAoc3RvcmVzKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0b3Jlc1t0aGl6LiRuYW1lXVxyXG4gICAgICB9KVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckcmVhZGVyJywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIHJldHVybiB0aGl6LiRkYi4kc3RvcmUodGhpei4kbmFtZSkuJHJlYWRlcihjYilcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHN0b3Jlcykge1xyXG4gICAgICAgIHJldHVybiBzdG9yZXNbdGhpei4kbmFtZV1cclxuICAgICAgfSlcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJHB1dCcsIGZ1bmN0aW9uIChvYmosIGtleSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIFxyXG4gICAgY29uc3QgZGF0YSA9IHRoaXMuJGdldFZhbHVlcyhvYmopO1xyXG5cclxuICAgIHJldHVybiB0aGl6LiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gICAgICByZXR1cm4gc3RvcmUuJHB1dChkYXRhLCBrZXkpLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICBjb25zdCByZWNvcmQgPSB0aGl6LiRnZXRJbnN0YW5jZShldmVudC50YXJnZXQucmVzdWx0KTtcclxuICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XHJcbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRhZGQnLCBmdW5jdGlvbiAob2JqLCBrZXkpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBcclxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLiRnZXRWYWx1ZXMob2JqKTtcclxuXHJcbiAgICByZXR1cm4gdGhpei4kd3JpdGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRhZGQoZGF0YSwga2V5KS4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpei4kZ2V0SW5zdGFuY2UoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XHJcbiAgICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlY29yZDtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZGVsZXRlJywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcbiAgICBcclxuICAgIHRocm93ICdpZGJNb2RlbC5zdGF0aWMuJGRlbGV0ZSc7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRjbGVhcicsIGZ1bmN0aW9uICgpIHtcclxuICAgIFxyXG4gICAgdGhyb3cgJ2lkYk1vZGVsLnN0YXRpYy4kY2xlYXInO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0JywgZnVuY3Rpb24gKGtleSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBjb25zdCByZWNvcmQgPSB0aGlzLiRnZXRJbnN0YW5jZShrZXkpO1xyXG5cclxuICAgIHJlY29yZC4kcHJvbWlzZSA9IHRoaXouJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBzdG9yZS4kZ2V0KGtleSkuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XHJcbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlY29yZDtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGdldEtleScsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG4gICAgXHJcbiAgICB0aHJvdyAnaWRiTW9kZWwuc3RhdGljLiRnZXRLZXknO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0QWxsJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xyXG4gICAgXHJcbiAgICB0aHJvdyAnaWRiTW9kZWwuc3RhdGljLiRnZXRBbGwnO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0QWxsS2V5cycsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcclxuICAgIFxyXG4gICAgdGhyb3cgJ2lkYk1vZGVsLnN0YXRpYy4kZ2V0QWxsS2V5cyc7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRjb3VudCcsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG4gICAgXHJcbiAgICB0aHJvdyAnaWRiTW9kZWwuc3RhdGljLiRjb3VudCc7XHJcblxyXG4gIH0pXHJcblxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0SW5zdGFuY2UnLCBmdW5jdGlvbiAoa2V5KSB7XHJcblxyXG4gICAgLy8gRWwgb2JqZXRvIG5vIHRpZW5lIElEXHJcbiAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQgfHwga2V5ID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBuZXcgdGhpcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE5vIGV4aXN0ZSBsYSBpbnN0YW5jaWEgZW50b25jZSBzZSBjcmVhXHJcbiAgICBpZiAoIXRoaXMuJGluc3RhbmNlc1trZXldKXtcclxuICAgICAgdGhpcy4kaW5zdGFuY2VzW2tleV0gPSBuZXcgdGhpcygpO1xyXG4gICAgICB0aGlzLiRpbnN0YW5jZXNba2V5XS4kc2V0KHRoaXMuJGlkLmtleVBhdGgsIGtleSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzLiRpbnN0YW5jZXNba2V5XTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXNpZ25hIGxhIGVzcGVjaWZpY2FjacOzbiBkZSBsb3MgY2FtcG9zXHJcbiAgLnN0YXRpYygnJGZpZWxkJywgZnVuY3Rpb24gKG5hbWUsIGZpZWxkKSB7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgZmllbGQgPSB7IFwidHlwZVwiOiBmaWVsZCB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZpZWxkLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgIHRoaXMuJGZpZWxkc1tuYW1lXSA9IGZpZWxkO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBZ3JlZ2EgZWwgZWwgY2FtcG8gSUQgYXV0b21hdGljYW1lbnRlXHJcbiAgLnN0YXRpYygnJGtleScsIGZ1bmN0aW9uIChrZXksIGF1dG9JbmNyZW1lbnQsIHR5cGUpIHtcclxuICAgIGlmKHR5cGVvZiBrZXkgPT09ICdib29sZWFuJykge1xyXG4gICAgICBhdXRvSW5jcmVtZW50ID0ga2V5O1xyXG4gICAgfVxyXG4gICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkIHx8IGtleSA9PT0gbnVsbCB8fCB0eXBlb2Yga2V5ID09PSAnYm9vbGVhbicpe1xyXG4gICAgICBrZXkgPSAnaWQnO1xyXG4gICAgfVxyXG4gICAgaWYodHlwZW9mIGF1dG9JbmNyZW1lbnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHR5cGUgPSBhdXRvSW5jcmVtZW50O1xyXG4gICAgICBhdXRvSW5jcmVtZW50ID0gbnVsbDtcclxuICAgIH1cclxuICAgIGlmIChhdXRvSW5jcmVtZW50ID09PSB1bmRlZmluZWQgfHwgYXV0b0luY3JlbWVudCA9PT0gbnVsbCl7XHJcbiAgICAgIGF1dG9JbmNyZW1lbnQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYodHlwZW9mIGF1dG9JbmNyZW1lbnQgPT09ICdib29sZWFuJyB8fCB0eXBlICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0eXBlID0gJ251bWJlcic7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy4kaWQua2V5UGF0aCA9IGtleTtcclxuICAgIHRoaXMuJGlkLmF1dG9JbmNyZW1lbnQgPSBhdXRvSW5jcmVtZW50O1xyXG5cclxuICAgIHJldHVybiB0aGlzLiRmaWVsZChrZXksIHtcclxuICAgICAgaWQ6IHRydWUsXHJcbiAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxyXG4gIC5zdGF0aWMoJyRnZXRWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICBcclxuICAgIGNvbnN0IHZhbHVlcyA9IHt9O1xyXG5cclxuICAgIE9iamVjdC5rZXlzKHRoaXMuJGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGdldEZpZWxkVmFsdWUoZGF0YSwgZmllbGQpO1xyXG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh2YWx1ZXMsIGZpZWxkLCB2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB2YWx1ZXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFncmVnYSBlbCBlbCBjYW1wbyBJRCBhdXRvbWF0aWNhbWVudGVcclxuICAuc3RhdGljKCckYnVpbGQnLCBmdW5jdGlvbiAoYnVpbGRDYWxsYmFjaykge1xyXG5cclxuICAgIGJ1aWxkQ2FsbGJhY2sodGhpcyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGlcclxuICAuc3RhdGljKCckcmVtb3RlJywgZnVuY3Rpb24gKHVybCwgYXJncywgYWN0aW9ucykge1xyXG5cclxuICAgIHRoaXMuJF9yZW1vdGUgPSBsYlJlc291cmNlKHVybCwgYXJncywgYWN0aW9ucyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJvcGllZGFkZXNcclxuICAucHJvcGVydHkoJyRfdmFsdWVzJywgeyB2YWx1ZTogbmV3IENsYXp6ZXIoe30pXHJcbiAgICAuc3RhdGljKCdsb2NhbCcsIHt9KVxyXG4gICAgLnN0YXRpYygncmVtb3RlJywge30pXHJcbiAgICAuY2xhenpcclxuICB9KVxyXG5cclxuICAucHJvcGVydHkoJyRfdmVyc2lvbnMnLCB7IHZhbHVlOiB7fSB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcclxuICAubWV0aG9kKCckZ2V0JywgZnVuY3Rpb24gKGZpZWxkKSB7XHJcblxyXG4gICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBc2lnbmEgaW4gdmFsb3IgYSB1biBjYW1wb1xyXG4gIC5tZXRob2QoJyRzZXQnLCBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XHJcblxyXG4gICAgcmV0dXJuIHNldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXHJcbiAgLm1ldGhvZCgnJGdldFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgcmV0dXJuIGlkYk1vZGVsLiRnZXRWYWx1ZXMoZGF0YSB8fCB0aGlzKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldExvY2FsVmFsdWVzJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kX3ZhbHVlcy5sb2NhbCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRnZXRSZW1vdGVWYWx1ZXMnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuJGdldFZhbHVlcyh0aGlzLiRfdmFsdWVzLnJlbW90ZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRzZXRWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgIHNldEZpZWxkVmFsdWUodGhpeiwgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGl6O1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc2V0TG9jYWxWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgIHNldEZpZWxkVmFsdWUodGhpei4kX3ZhbHVlcy5sb2NhbCwgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGl6O1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc2V0UmVtb3RlVmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJF92YWx1ZXMucmVtb3RlLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRrZXknLCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsIHRoaXMuJGlkLmtleVBhdGgpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBGdW5jaW9uIHF1ZSBoYWNlIGVzY3VjaGFycyBsb3MgbWVuc2FqZXMgZGVsIHNvY2tldCBwYXJhIGVsIG1vZGVsXHJcbiAgLm1ldGhvZCgnJGxpc3RlbicsIGZ1bmN0aW9uIChkYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgaWYgKCF0aGlzLiRzb2NrZXQpIHRocm93IG5ldyBFcnJvcignaWRiTW9kZWwuRG9lc05vdEhhdmVTb2NrZXRJbnN0YW5jZScpO1xyXG5cclxuICAgIC8vIENyZWFyIHVuYSBzdWJzY3JpcGNpb24gYWwgc29ja2V0IHBhcmEgY3VhbmRvIHNlIHJlY2liYW4gZGF0b3NcclxuICAgIC8vIHBhcmEgbGEgaW5zdGFuY2lhIGFjdHVhbFxyXG4gICAgdGhpcy4kc29ja2V0LnN1YnNjcmliZSh7XHJcbiAgICAgIG1vZGVsTmFtZTogaWRiTW9kZWwuJG5hbWUsXHJcbiAgICAgIGV2ZW50TmFtZTogJ3VwZGF0ZScsXHJcbiAgICAgIG1vZGVsSWQ6IHRoaXouJGtleSgpLFxyXG4gICAgfSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgIC8vIEEgcmVjaWJpciBkYXRvcyBkZWwgc29ja2V0IGFzaWduYXIgbG9zIHZhbG9yZXNcclxuICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIEVtaXRpciBldmVudG8gZGUgZGF0b3MgcmVjaWJpZG9yIHBhcmEgZWwgbW9kZWxvXHJcbiAgICAgICAgdGhpei4kc2V0UmVtb3RlVmFsdWVzKGRhdGEudmFsdWVzLCBkYXRhLnZlcnNpb24pO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn07fVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYk1vZGVsLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiTW9kZWxcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiRXZlbnRUYXJnZXQsIGxiUmVzb3VyY2UsICR0aW1lb3V0KSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQnVzY2FyIHVuIGNhbXBvXG5cbiAgdmFyIGRlZXBGaWVsZCA9IGZ1bmN0aW9uIGRlZXBGaWVsZChvYmosIGZpZWxkLCBjYikge1xuXG4gICAgdmFyIGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XG4gICAgdmFyIGxhc3RGaWVsZCA9IGZpZWxkcy5wb3AoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiBfc2V0KG9iaikge1xuICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMCkgcmV0dXJuIGNiKG9iaiwgbGFzdEZpZWxkKTtcbiAgICAgIHZhciBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xuICAgICAgaWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAndW5kZWZpbmVkJykgb2JqW2ZpZWxkXSA9IHt9O1xuICAgICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XG4gICAgfShvYmopO1xuICB9O1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xuICB2YXIgZ2V0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIGdldEZpZWxkVmFsdWUob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBkZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXG4gIHZhciBzZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gc2V0RmllbGRWYWx1ZShvYmosIGZpZWxkLCB2YWx1ZSkge1xuICAgIGRlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgIG9ialtsYXN0RmllbGRdID0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICByZXR1cm4gZnVuY3Rpb24gaWRiTW9kZWxGYWN0b3J5KGRiLCBuYW1lLCBzb2NrZXQpIHtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXG4gICAgLy8gJF9yZW1vdGVcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGZ1bmN0aW9uIGlkYk1vZGVsKCkge31cblxuICAgIHJldHVybiBuZXdcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBDb25zdHJ1Y3RvclxuICAgIENsYXp6ZXIoaWRiTW9kZWwpXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBIZXJlbmNpYVxuICAgIC5pbmhlcml0KGlkYkV2ZW50VGFyZ2V0KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSGVyZW5jaWFcbiAgICAvLyAuaW5oZXJpdChFdmVudFRhcmdldClcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFByb3BpZWRhZGVzIHN0YXRpY2FzXG4gICAgLnN0YXRpYygnJGRiJywgZGIpLnN0YXRpYygnJG5hbWUnLCBuYW1lKS5zdGF0aWMoJyRzb2NrZXQnLCBzb2NrZXQpLnN0YXRpYygnJGlkJywgeyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OiB0cnVlIH0pLnN0YXRpYygnJGZpZWxkcycsIHtcbiAgICAgIGlkOiB7XG4gICAgICAgIGlkOiB0cnVlLFxuICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgfVxuICAgIH0pLnN0YXRpYygnJGluc3RhbmNlcycsIHt9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGdldEtleUZyb20nLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZShkYXRhLCB0aGlzLiRpZC5rZXlQYXRoKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGNyZWF0ZVN0b3JlJywgZnVuY3Rpb24gKGNiKSB7XG5cbiAgICAgIHZhciBzdG9yZSA9IHRoaXMuJGRiLiRjcmVhdGVTdG9yZSh0aGlzLiRuYW1lLCB0aGlzLiRpZCk7XG5cbiAgICAgIGlmIChjYikgY2IodGhpcywgc3RvcmUpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJHdyaXRlcicsIGZ1bmN0aW9uIChjYikge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICByZXR1cm4gdGhpei4kZGIuJHN0b3JlKHRoaXouJG5hbWUpLiR3cml0ZXIoY2IpLnRoZW4oZnVuY3Rpb24gKHN0b3Jlcykge1xuICAgICAgICByZXR1cm4gc3RvcmVzW3RoaXouJG5hbWVdO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRyZWFkZXInLCBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgcmV0dXJuIHRoaXouJGRiLiRzdG9yZSh0aGl6LiRuYW1lKS4kcmVhZGVyKGNiKS50aGVuKGZ1bmN0aW9uIChzdG9yZXMpIHtcbiAgICAgICAgcmV0dXJuIHN0b3Jlc1t0aGl6LiRuYW1lXTtcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckcHV0JywgZnVuY3Rpb24gKG9iaiwga2V5KSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIHZhciBkYXRhID0gdGhpcy4kZ2V0VmFsdWVzKG9iaik7XG5cbiAgICAgIHJldHVybiB0aGl6LiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuJHB1dChkYXRhLCBrZXkpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IHRoaXouJGdldEluc3RhbmNlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XG4gICAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGFkZCcsIGZ1bmN0aW9uIChvYmosIGtleSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICB2YXIgZGF0YSA9IHRoaXMuJGdldFZhbHVlcyhvYmopO1xuXG4gICAgICByZXR1cm4gdGhpei4kd3JpdGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRhZGQoZGF0YSwga2V5KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHZhciByZWNvcmQgPSB0aGl6LiRnZXRJbnN0YW5jZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xuICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRkZWxldGUnLCBmdW5jdGlvbiAocXVlcnkpIHtcblxuICAgICAgdGhyb3cgJ2lkYk1vZGVsLnN0YXRpYy4kZGVsZXRlJztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGNsZWFyJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICB0aHJvdyAnaWRiTW9kZWwuc3RhdGljLiRjbGVhcic7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXQnLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIHZhciByZWNvcmQgPSB0aGlzLiRnZXRJbnN0YW5jZShrZXkpO1xuXG4gICAgICByZWNvcmQuJHByb21pc2UgPSB0aGl6LiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuJGdldChrZXkpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmVjb3JkLiRzZXRMb2NhbFZhbHVlcyhldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVjb3JkO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckZ2V0S2V5JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICAgIHRocm93ICdpZGJNb2RlbC5zdGF0aWMuJGdldEtleSc7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXRBbGwnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XG5cbiAgICAgIHRocm93ICdpZGJNb2RlbC5zdGF0aWMuJGdldEFsbCc7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXRBbGxLZXlzJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xuXG4gICAgICB0aHJvdyAnaWRiTW9kZWwuc3RhdGljLiRnZXRBbGxLZXlzJztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGNvdW50JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICAgIHRocm93ICdpZGJNb2RlbC5zdGF0aWMuJGNvdW50JztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGdldEluc3RhbmNlJywgZnVuY3Rpb24gKGtleSkge1xuXG4gICAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcbiAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCB8fCBrZXkgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIE5vIGV4aXN0ZSBsYSBpbnN0YW5jaWEgZW50b25jZSBzZSBjcmVhXG4gICAgICBpZiAoIXRoaXMuJGluc3RhbmNlc1trZXldKSB7XG4gICAgICAgIHRoaXMuJGluc3RhbmNlc1trZXldID0gbmV3IHRoaXMoKTtcbiAgICAgICAgdGhpcy4kaW5zdGFuY2VzW2tleV0uJHNldCh0aGlzLiRpZC5rZXlQYXRoLCBrZXkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy4kaW5zdGFuY2VzW2tleV07XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEFzaWduYSBsYSBlc3BlY2lmaWNhY2nDs24gZGUgbG9zIGNhbXBvc1xuICAgIC5zdGF0aWMoJyRmaWVsZCcsIGZ1bmN0aW9uIChuYW1lLCBmaWVsZCkge1xuXG4gICAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICBmaWVsZCA9IHsgXCJ0eXBlXCI6IGZpZWxkIH07XG4gICAgICB9XG5cbiAgICAgIGZpZWxkLm5hbWUgPSBuYW1lO1xuXG4gICAgICB0aGlzLiRmaWVsZHNbbmFtZV0gPSBmaWVsZDtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEFncmVnYSBlbCBlbCBjYW1wbyBJRCBhdXRvbWF0aWNhbWVudGVcbiAgICAuc3RhdGljKCcka2V5JywgZnVuY3Rpb24gKGtleSwgYXV0b0luY3JlbWVudCwgdHlwZSkge1xuICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdib29sZWFuJykge1xuICAgICAgICBhdXRvSW5jcmVtZW50ID0ga2V5O1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkIHx8IGtleSA9PT0gbnVsbCB8fCB0eXBlb2Yga2V5ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAga2V5ID0gJ2lkJztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgYXV0b0luY3JlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHlwZSA9IGF1dG9JbmNyZW1lbnQ7XG4gICAgICAgIGF1dG9JbmNyZW1lbnQgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKGF1dG9JbmNyZW1lbnQgPT09IHVuZGVmaW5lZCB8fCBhdXRvSW5jcmVtZW50ID09PSBudWxsKSB7XG4gICAgICAgIGF1dG9JbmNyZW1lbnQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBhdXRvSW5jcmVtZW50ID09PSAnYm9vbGVhbicgfHwgdHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHlwZSA9ICdudW1iZXInO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiRpZC5rZXlQYXRoID0ga2V5O1xuICAgICAgdGhpcy4kaWQuYXV0b0luY3JlbWVudCA9IGF1dG9JbmNyZW1lbnQ7XG5cbiAgICAgIHJldHVybiB0aGlzLiRmaWVsZChrZXksIHtcbiAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgIHR5cGU6IHR5cGVcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXG4gICAgLnN0YXRpYygnJGdldFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgIHZhciB2YWx1ZXMgPSB7fTtcblxuICAgICAgT2JqZWN0LmtleXModGhpcy4kZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGdldEZpZWxkVmFsdWUoZGF0YSwgZmllbGQpO1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNldEZpZWxkVmFsdWUodmFsdWVzLCBmaWVsZCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQWdyZWdhIGVsIGVsIGNhbXBvIElEIGF1dG9tYXRpY2FtZW50ZVxuICAgIC5zdGF0aWMoJyRidWlsZCcsIGZ1bmN0aW9uIChidWlsZENhbGxiYWNrKSB7XG5cbiAgICAgIGJ1aWxkQ2FsbGJhY2sodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGlcbiAgICAuc3RhdGljKCckcmVtb3RlJywgZnVuY3Rpb24gKHVybCwgYXJncywgYWN0aW9ucykge1xuXG4gICAgICB0aGlzLiRfcmVtb3RlID0gbGJSZXNvdXJjZSh1cmwsIGFyZ3MsIGFjdGlvbnMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFByb3BpZWRhZGVzXG4gICAgLnByb3BlcnR5KCckX3ZhbHVlcycsIHsgdmFsdWU6IG5ldyBDbGF6emVyKHt9KS5zdGF0aWMoJ2xvY2FsJywge30pLnN0YXRpYygncmVtb3RlJywge30pLmNsYXp6XG4gICAgfSkucHJvcGVydHkoJyRfdmVyc2lvbnMnLCB7IHZhbHVlOiB7fSB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxuICAgIC5tZXRob2QoJyRnZXQnLCBmdW5jdGlvbiAoZmllbGQpIHtcblxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBc2lnbmEgaW4gdmFsb3IgYSB1biBjYW1wb1xuICAgIC5tZXRob2QoJyRzZXQnLCBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XG5cbiAgICAgIHJldHVybiBzZXRGaWVsZFZhbHVlKHRoaXMsIGZpZWxkKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxuICAgIC5tZXRob2QoJyRnZXRWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICByZXR1cm4gaWRiTW9kZWwuJGdldFZhbHVlcyhkYXRhIHx8IHRoaXMpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCckZ2V0TG9jYWxWYWx1ZXMnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kX3ZhbHVlcy5sb2NhbCk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5tZXRob2QoJyRnZXRSZW1vdGVWYWx1ZXMnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kX3ZhbHVlcy5yZW1vdGUpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCckc2V0VmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXosIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5tZXRob2QoJyRzZXRMb2NhbFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRfdmFsdWVzLmxvY2FsLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCckc2V0UmVtb3RlVmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJF92YWx1ZXMucmVtb3RlLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCcka2V5JywgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUoZGF0YSwgdGhpcy4kaWQua2V5UGF0aCk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEZ1bmNpb24gcXVlIGhhY2UgZXNjdWNoYXJzIGxvcyBtZW5zYWplcyBkZWwgc29ja2V0IHBhcmEgZWwgbW9kZWxcbiAgICAubWV0aG9kKCckbGlzdGVuJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlmICghdGhpcy4kc29ja2V0KSB0aHJvdyBuZXcgRXJyb3IoJ2lkYk1vZGVsLkRvZXNOb3RIYXZlU29ja2V0SW5zdGFuY2UnKTtcblxuICAgICAgLy8gQ3JlYXIgdW5hIHN1YnNjcmlwY2lvbiBhbCBzb2NrZXQgcGFyYSBjdWFuZG8gc2UgcmVjaWJhbiBkYXRvc1xuICAgICAgLy8gcGFyYSBsYSBpbnN0YW5jaWEgYWN0dWFsXG4gICAgICB0aGlzLiRzb2NrZXQuc3Vic2NyaWJlKHtcbiAgICAgICAgbW9kZWxOYW1lOiBpZGJNb2RlbC4kbmFtZSxcbiAgICAgICAgZXZlbnROYW1lOiAndXBkYXRlJyxcbiAgICAgICAgbW9kZWxJZDogdGhpei4ka2V5KClcbiAgICAgIH0sIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgLy8gQSByZWNpYmlyIGRhdG9zIGRlbCBzb2NrZXQgYXNpZ25hciBsb3MgdmFsb3Jlc1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gRW1pdGlyIGV2ZW50byBkZSBkYXRvcyByZWNpYmlkb3IgcGFyYSBlbCBtb2RlbG9cbiAgICAgICAgICB0aGl6LiRzZXRSZW1vdGVWYWx1ZXMoZGF0YS52YWx1ZXMsIGRhdGEudmVyc2lvbik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5jbGF6ejtcbiAgfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiTW9kZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaW8sICRsb2cpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcclxuICAvLyAkc29ja2V0XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgY29uc3QgaWRiU29ja2V0ID0gZnVuY3Rpb24gaWRiU29ja2V0KHVybCwgJGFjY2Vzc1Rva2VuSWQsICRjdXJyZW50VXNlcklkKXtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKVxyXG4gICAgICAuc3RhdGljKCckdXJsJywgdXJsIHx8IGlkYlNvY2tldC4kZGVmVXJsU2VydmVyKVxyXG4gICAgICAuc3RhdGljKCckYWNjZXNzVG9rZW5JZCcsIGFjY2Vzc1Rva2VuSWQgfHwgaWRiU29ja2V0LiRkZWZBY2Nlc3NUb2tlbklkKVxyXG4gICAgICAuc3RhdGljKCckY3VycmVudFVzZXJJZCcsIGN1cnJlbnRVc2VySWQgfHwgaWRiU29ja2V0LiRkZWZDdXJyZW50VXNlcklkKTtcclxuXHJcbiAgICB0aGl6LiRjb25uZWN0KCk7XHJcblxyXG4gIH07XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoaWRiU29ja2V0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAucHJvcGVydHkoJyRfbGlzdGVuZXJzJywgeyB2YWx1ZTpbXSB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXHJcbiAgLm1ldGhvZCgnJGNvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8gQ3JlYXRpbmcgY29ubmVjdGlvbiB3aXRoIHNlcnZlclxyXG4gICAgY29uc3Qgc29ja2V0ID0gdGhpcy4kc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsKTtcclxuXHJcbiAgICAvLyBUaGlzIHBhcnQgaXMgb25seSBmb3IgbG9naW4gdXNlcnMgZm9yIGF1dGhlbnRpY2F0ZWQgJHNvY2tldCBjb25uZWN0aW9uIGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIuXHJcbiAgICAvLyBJZiB5b3UgYXJlIG5vdCB1c2luZyBsb2dpbiBwYWdlIGluIHlvdSB3ZWJzaXRlIHRoZW4geW91IHNob3VsZCByZW1vdmUgcmVzdCBwaWVjZSBvZiBjb2RlLi5cclxuICAgIHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICRsb2cubG9nKCdjb25uZWN0ZWQnKTtcclxuXHJcbiAgICAgIHNvY2tldC5lbWl0KCdhdXRoZW50aWNhdGlvbicsIHtcclxuICAgICAgICBpZDogdGhpcy4kYWNjZXNzVG9rZW5JZCxcclxuICAgICAgICB1c2VySWQ6IHRoaXMuJGN1cnJlbnRVc2VySWQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgc29ja2V0Lm9uKCdhdXRoZW50aWNhdGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gdXNlIHRoZSAkc29ja2V0IGFzIHVzdWFsXHJcbiAgICAgICAgJGxvZy5sb2coJ1VzZXIgaXMgYXV0aGVudGljYXRlZCcpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHN1YnNjcmliZScsIGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xyXG5cclxuICAgIGxldCBuYW1lID0gb3B0aW9ucy5tb2RlbE5hbWUgKyAnLicgKyBvcHRpb25zLmV2ZW50TmFtZTtcclxuXHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMubW9kZWxJZCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbmFtZSA9IG5hbWUgKyAnLicgKyBvcHRpb25zLm1vZGVsSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy4kc29ja2V0Lm9uKG5hbWUsIGNiKTtcclxuICAgIFxyXG4gICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxyXG4gICAgdGhpcy4kcHVzaExpc3RlbmVyKG5hbWUsIGNiKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHB1c2hMaXN0ZW5lcicsIGZ1bmN0aW9uIChuYW1lLCBjYikge1xyXG5cclxuICAgIHRoaXMuJF9saXN0ZW5lcnMucHVzaChuYW1lKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHVuc3Vic2NyaWJlJyxmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSkge1xyXG5cclxuICAgIHRoaXMuJHNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMoc3Vic2NyaXB0aW9uTmFtZSk7ICBcclxuICAgIHZhciBpZHggPSB0aGlzLiRfbGlzdGVuZXJzLmluZGV4T2Yoc3Vic2NyaXB0aW9uTmFtZSk7XHJcbiAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgdGhpcy4kX2xpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXNpZ25hIGxhIFVSTCBkZSBzZXJ2aWRvciBwb3IgZGVmZWN0b1xyXG4gIC5zdGF0aWMoJyRzZXRVcmxTZXJ2ZXInLCBmdW5jdGlvbiAodXJsKSB7XHJcblxyXG4gICAgdGhpcy4kZGVmVXJsU2VydmVyID0gdXJsO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXHJcbiAgLnN0YXRpYygnJHNldENyZWRlbnRpYWxzJywgZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIGN1cnJlbnRVc2VySWQpIHtcclxuXHJcbiAgICB0aGlzLiRkZWZBY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcclxuICAgIHRoaXMuJGRlZkN1cnJlbnRVc2VySWQgPSBjdXJyZW50VXNlcklkO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6elxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuJHNldFVybFNlcnZlcihudWxsKVxyXG4gIC4kc2V0Q3JlZGVudGlhbHMobnVsbCwgbnVsbCk7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiU29ja2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaW8sICRsb2cpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJHNvY2tldFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuXG4gIHZhciBpZGJTb2NrZXQgPSBmdW5jdGlvbiBpZGJTb2NrZXQodXJsLCAkYWNjZXNzVG9rZW5JZCwgJGN1cnJlbnRVc2VySWQpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJHVybCcsIHVybCB8fCBpZGJTb2NrZXQuJGRlZlVybFNlcnZlcikuc3RhdGljKCckYWNjZXNzVG9rZW5JZCcsIGFjY2Vzc1Rva2VuSWQgfHwgaWRiU29ja2V0LiRkZWZBY2Nlc3NUb2tlbklkKS5zdGF0aWMoJyRjdXJyZW50VXNlcklkJywgY3VycmVudFVzZXJJZCB8fCBpZGJTb2NrZXQuJGRlZkN1cnJlbnRVc2VySWQpO1xuXG4gICAgdGhpei4kY29ubmVjdCgpO1xuICB9O1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoaWRiU29ja2V0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAucHJvcGVydHkoJyRfbGlzdGVuZXJzJywgeyB2YWx1ZTogW10gfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uZWN0YXJzZSBhbCBzZXJ2aWRvclxuICAubWV0aG9kKCckY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcblxuICAgIC8vIENyZWF0aW5nIGNvbm5lY3Rpb24gd2l0aCBzZXJ2ZXJcbiAgICB2YXIgc29ja2V0ID0gdGhpcy4kc29ja2V0ID0gaW8uY29ubmVjdCgkdXJsKTtcblxuICAgIC8vIFRoaXMgcGFydCBpcyBvbmx5IGZvciBsb2dpbiB1c2VycyBmb3IgYXV0aGVudGljYXRlZCAkc29ja2V0IGNvbm5lY3Rpb24gYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlci5cbiAgICAvLyBJZiB5b3UgYXJlIG5vdCB1c2luZyBsb2dpbiBwYWdlIGluIHlvdSB3ZWJzaXRlIHRoZW4geW91IHNob3VsZCByZW1vdmUgcmVzdCBwaWVjZSBvZiBjb2RlLi5cbiAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkbG9nLmxvZygnY29ubmVjdGVkJyk7XG5cbiAgICAgIHNvY2tldC5lbWl0KCdhdXRoZW50aWNhdGlvbicsIHtcbiAgICAgICAgaWQ6IHRoaXMuJGFjY2Vzc1Rva2VuSWQsXG4gICAgICAgIHVzZXJJZDogdGhpcy4kY3VycmVudFVzZXJJZFxuICAgICAgfSk7XG5cbiAgICAgIHNvY2tldC5vbignYXV0aGVudGljYXRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdXNlIHRoZSAkc29ja2V0IGFzIHVzdWFsXG4gICAgICAgICRsb2cubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckc3Vic2NyaWJlJywgZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XG5cbiAgICB2YXIgbmFtZSA9IG9wdGlvbnMubW9kZWxOYW1lICsgJy4nICsgb3B0aW9ucy5ldmVudE5hbWU7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMubW9kZWxJZCA9PT0gJ251bWJlcicpIHtcbiAgICAgIG5hbWUgPSBuYW1lICsgJy4nICsgb3B0aW9ucy5tb2RlbElkO1xuICAgIH1cblxuICAgIHRoaXMuJHNvY2tldC5vbihuYW1lLCBjYik7XG5cbiAgICAvL1B1c2ggdGhlIGNvbnRhaW5lci4uXG4gICAgdGhpcy4kcHVzaExpc3RlbmVyKG5hbWUsIGNiKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHB1c2hMaXN0ZW5lcicsIGZ1bmN0aW9uIChuYW1lLCBjYikge1xuXG4gICAgdGhpcy4kX2xpc3RlbmVycy5wdXNoKG5hbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckdW5zdWJzY3JpYmUnLCBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSkge1xuXG4gICAgdGhpcy4kc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTtcbiAgICB2YXIgaWR4ID0gdGhpcy4kX2xpc3RlbmVycy5pbmRleE9mKHN1YnNjcmlwdGlvbk5hbWUpO1xuICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgIHRoaXMuJF9saXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBc2lnbmEgbGEgVVJMIGRlIHNlcnZpZG9yIHBvciBkZWZlY3RvXG4gIC5zdGF0aWMoJyRzZXRVcmxTZXJ2ZXInLCBmdW5jdGlvbiAodXJsKSB7XG5cbiAgICB0aGlzLiRkZWZVcmxTZXJ2ZXIgPSB1cmw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXG4gIC5zdGF0aWMoJyRzZXRDcmVkZW50aWFscycsIGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XG5cbiAgICB0aGlzLiRkZWZBY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICB0aGlzLiRkZWZDdXJyZW50VXNlcklkID0gY3VycmVudFVzZXJJZDtcbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC4kc2V0VXJsU2VydmVyKG51bGwpLiRzZXRDcmVkZW50aWFscyhudWxsLCBudWxsKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiU29ja2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYlRyYW5zYWN0aW9uXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQlRyYW5zYWN0aW9uIDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmdMaXN0ICAgICAgb2JqZWN0U3RvcmVOYW1lcztcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb25Nb2RlIG1vZGU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQkRhdGFiYXNlICAgICAgICBkYjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NRXhjZXB0aW9uICAgICAgIGVycm9yO1xyXG4gKiBcclxuICogICBJREJPYmplY3RTdG9yZSBvYmplY3RTdG9yZShET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgdm9pZCAgICAgICAgICAgYWJvcnQoKTtcclxuICogXHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmFib3J0O1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25jb21wbGV0ZTtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uZXJyb3I7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBlbnVtIElEQlRyYW5zYWN0aW9uTW9kZSB7XHJcbiAqICAgXCJyZWFkb25seVwiLFxyXG4gKiAgIFwicmVhZHdyaXRlXCIsXHJcbiAqICAgXCJ2ZXJzaW9uY2hhbmdlXCJcclxuICogfTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJTdG9yZSkgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXHJcbiAgLy8gJF9wcm9taXNlXHJcbiAgXHJcbiAgY29uc3QgVHJhbnNhY3Rpb25Nb2RlID0gbmV3IENsYXp6ZXIoe30pXHJcbiAgICAgICAgLnN0YXRpYygnUmVhZE9ubHknLCAncmVhZG9ubHknKVxyXG4gICAgICAgIC5zdGF0aWMoJ1JlYWRXcml0ZScsICdyZWFkd3JpdGUnKVxyXG4gICAgICAgIC5zdGF0aWMoJ1ZlcnNpb25DaGFuZ2UnLCAgJ3ZlcnNpb25jaGFuZ2UnKTtcclxuXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJUcmFuc2FjdGlvbiAobWUpIHtcclxuICAgIFxyXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFN0YXRpY3NcclxuICAuc3RhdGljKCdUcmFuc2FjdGlvbk1vZGUnLCBUcmFuc2FjdGlvbk1vZGUuY2xhenopXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEdldHRlcnNcclxuICAuZ2V0dGVyKCckZGInLCAgICAgICAgICAgICAgICAnZGInKVxyXG4gIC5nZXR0ZXIoJyRtb2RlJywgICAgICAgICAgICAgICdtb2RlJylcclxuICAuZ2V0dGVyKCckZXJyb3InLCAgICAgICAgICAgICAnZXJyb3InKVxyXG4gIC5nZXR0ZXIoJyRvYmplY3RTdG9yZU5hbWVzJywgICdvYmplY3RTdG9yZU5hbWVzJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRXZlbnQgaGFuZGxlcnNcclxuICAuaGFuZGxlckV2ZW50KCckYWJvcnRlZCcsICdvbmFib3J0JylcclxuICAuaGFuZGxlckV2ZW50KCckY29tcGxldGVkJywgJ29uY29tcGxldGUnKVxyXG4gIC5oYW5kbGVyRXZlbnQoJyRmYWlsJywgJ29uZXJyb3InKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc3RvcmUnLCBmdW5jdGlvbihuYW1lKXtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLm9iamVjdFN0b3JlKG5hbWUpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGFib3J0JywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICB0aGlzLiRtZS5hYm9ydCgpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9wZXJ0eVxyXG4gIC5wcm9wZXJ0eSgnJHByb21pc2UnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlmICh0aGl6LiRfcHJvbWlzZSkgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgICAgLy8gQ3JlYXIgcHJvbWlzZSBwYXJhIGVsIHJlcXVlc3RcclxuICAgICAgdGhpei4kX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdGhpei4kY29tcGxldGVkKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVzb2x2ZShldmVudCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuJGZhaWwoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG5ldyBDbGF6emVyKHRoaXouJF9wcm9taXNlKS5zdGF0aWMoJyR0cmFuc2FjdGlvbicsIHRoaXopO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlRyYW5zYWN0aW9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiVHJhbnNhY3Rpb25cclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCVHJhbnNhY3Rpb24gOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgICAgICBvYmplY3RTdG9yZU5hbWVzO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbk1vZGUgbW9kZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCRGF0YWJhc2UgICAgICAgIGRiO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01FeGNlcHRpb24gICAgICAgZXJyb3I7XHJcbiAqIFxyXG4gKiAgIElEQk9iamVjdFN0b3JlIG9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lKTtcclxuICogICB2b2lkICAgICAgICAgICBhYm9ydCgpO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYWJvcnQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmNvbXBsZXRlO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogfTtcclxuICogXHJcbiAqIGVudW0gSURCVHJhbnNhY3Rpb25Nb2RlIHtcclxuICogICBcInJlYWRvbmx5XCIsXHJcbiAqICAgXCJyZWFkd3JpdGVcIixcclxuICogICBcInZlcnNpb25jaGFuZ2VcIlxyXG4gKiB9O1xyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlN0b3JlKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXG4gIC8vICRfcHJvbWlzZVxuXG4gIHZhciBUcmFuc2FjdGlvbk1vZGUgPSBuZXcgQ2xhenplcih7fSkuc3RhdGljKCdSZWFkT25seScsICdyZWFkb25seScpLnN0YXRpYygnUmVhZFdyaXRlJywgJ3JlYWR3cml0ZScpLnN0YXRpYygnVmVyc2lvbkNoYW5nZScsICd2ZXJzaW9uY2hhbmdlJyk7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJUcmFuc2FjdGlvbihtZSkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTdGF0aWNzXG4gIC5zdGF0aWMoJ1RyYW5zYWN0aW9uTW9kZScsIFRyYW5zYWN0aW9uTW9kZS5jbGF6eilcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR2V0dGVyc1xuICAuZ2V0dGVyKCckZGInLCAnZGInKS5nZXR0ZXIoJyRtb2RlJywgJ21vZGUnKS5nZXR0ZXIoJyRlcnJvcicsICdlcnJvcicpLmdldHRlcignJG9iamVjdFN0b3JlTmFtZXMnLCAnb2JqZWN0U3RvcmVOYW1lcycpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGhhbmRsZXJzXG4gIC5oYW5kbGVyRXZlbnQoJyRhYm9ydGVkJywgJ29uYWJvcnQnKS5oYW5kbGVyRXZlbnQoJyRjb21wbGV0ZWQnLCAnb25jb21wbGV0ZScpLmhhbmRsZXJFdmVudCgnJGZhaWwnLCAnb25lcnJvcicpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRzdG9yZScsIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLm9iamVjdFN0b3JlKG5hbWUpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGFib3J0JywgZnVuY3Rpb24gKCkge1xuXG4gICAgdGhpcy4kbWUuYWJvcnQoKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUHJvcGVydHlcbiAgLnByb3BlcnR5KCckcHJvbWlzZScsIHtcblxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgaWYgKHRoaXouJF9wcm9taXNlKSByZXR1cm4gdGhpei4kX3Byb21pc2U7XG5cbiAgICAgIC8vIENyZWFyIHByb21pc2UgcGFyYSBlbCByZXF1ZXN0XG4gICAgICB0aGl6LiRfcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdGhpei4kY29tcGxldGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xuICAgICAgICB9KS4kZmFpbChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBuZXcgQ2xhenplcih0aGl6LiRfcHJvbWlzZSkuc3RhdGljKCckdHJhbnNhY3Rpb24nLCB0aGl6KTtcblxuICAgICAgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xuICAgIH1cblxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlRyYW5zYWN0aW9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGIgKG1vZHVsZSkge1xyXG5cclxuICAvLyBEdnVlbHZlIGVsIGhvc3QgZGUgdW5hIFVSTFxyXG4gIGZ1bmN0aW9uIGdldEhvc3QodXJsKSB7XHJcbiAgICBjb25zdCBtID0gdXJsLm1hdGNoKC9eKD86aHR0cHM/Oik/XFwvXFwvKFteXFwvXSspLyk7XHJcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgbGV0IHVybEJhc2VIb3N0ID0gbG9jYXRpb24uaG9zdDtcclxuXHJcbiAgY29uc3QgbGJBdXRoID0gZnVuY3Rpb24oKSB7ICduZ0luamVjdCdcclxuICAgIGNvbnN0IHByb3BzID0gWydhY2Nlc3NUb2tlbklkJywgJ2N1cnJlbnRVc2VySWQnLCAncmVtZW1iZXJNZSddO1xyXG4gICAgY29uc3QgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xyXG4gICAgXHJcbiAgICAvLyBOb3RlOiBMb2NhbFN0b3JhZ2UgY29udmVydHMgdGhlIHZhbHVlIHRvIHN0cmluZ1xyXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxyXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAnJztcclxuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcclxuICAgICAgY29uc3Qga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xyXG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICB0aGl6W25hbWVdID0gbG9hZChuYW1lKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGl6LnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgc2F2ZShzdG9yYWdlLCBuYW1lLCB0aGl6W25hbWVdKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2V0VXNlciA9IGZ1bmN0aW9uKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IHVzZXJJZDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSB1c2VyRGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclVzZXIgPSBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IG51bGw7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IG51bGw7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclN0b3JhZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgc2F2ZShzZXNzaW9uU3RvcmFnZSwgbmFtZSwgbnVsbCk7XHJcbiAgICAgICAgc2F2ZShsb2NhbFN0b3JhZ2UsIG5hbWUsIG51bGwpO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBsYkF1dGgoKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24oJHEsIGxiQXV0aCkgeyAnbmdJbmplY3QnO1xyXG4gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbihjb25maWcpIHtcclxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV4dGVybmFsIHJlcXVlc3RzXHJcbiAgICAgICAgY29uc3QgaG9zdCA9IGdldEhvc3QoY29uZmlnLnVybCk7XHJcbiAgICAgICAgaWYgKGhvc3QgJiYgaG9zdCAhPT0gdXJsQmFzZUhvc3QpIHtcclxuICAgICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGJBdXRoLmFjY2Vzc1Rva2VuSWQpIHtcclxuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzW2F1dGhIZWFkZXJdID0gbGJBdXRoLmFjY2Vzc1Rva2VuSWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuX19pc0dldEN1cnJlbnRVc2VyX18pIHtcclxuICAgICAgICAgIC8vIFJldHVybiBhIHN0dWIgNDAxIGVycm9yIGZvciBVc2VyLmdldEN1cnJlbnQoKSB3aGVuXHJcbiAgICAgICAgICAvLyB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpblxyXG4gICAgICAgICAgY29uc3QgcmVzID0ge1xyXG4gICAgICAgICAgICBib2R5OiB7IGVycm9yOiB7IHN0YXR1czogNDAxIH19LFxyXG4gICAgICAgICAgICBzdGF0dXM6IDQwMSxcclxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICB9O1xyXG5cclxuICBjb25zdCBsYlJlc291cmNlID0gZnVuY3Rpb24oKSB7ICduZ0luamVjdCc7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHVybEJhc2U6IFwiL2FwaVwiLFxyXG4gICAgICBhdXRoSGVhZGVyOiAnYXV0aG9yaXphdGlvbicsXHJcbiAgICB9O1xyXG5cclxuICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXIgVGhlIGhlYWRlciBuYW1lIHRvIHVzZSwgZS5nLiBgWC1BY2Nlc3MtVG9rZW5gXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENvbmZpZ3VyZSB0aGUgUkVTVCB0cmFuc3BvcnQgdG8gdXNlIGEgZGlmZmVyZW50IGhlYWRlciBmb3Igc2VuZGluZ1xyXG4gICAgICogdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLiBJdCBpcyBzZW50IGluIHRoZSBgQXV0aG9yaXphdGlvbmAgaGVhZGVyXHJcbiAgICAgKiBieSBkZWZhdWx0LlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldEF1dGhIZWFkZXIgPSBmdW5jdGlvbihoZWFkZXIpIHtcclxuICAgICAgb3B0aW9ucy5hdXRoSGVhZGVyID0gaGVhZGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIGhlYWRlciBuYW1lIHRoYXQgaXMgdXNlZCBmb3Igc2VuZGluZyB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uXHJcbiAgICAgKi9cclxuICAgIHRoaXouZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHVzZSwgZS5nLiBgL2FwaWAgb3IgYC8vZXhhbXBsZS5jb20vYXBpYC5cclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ2hhbmdlIHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gQnkgZGVmYXVsdCwgdGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cclxuICAgIHRoaXouc2V0VXJsQmFzZSA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICBvcHRpb25zLnVybEJhc2UgPSB1cmw7XHJcbiAgICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIFRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldFVybEJhc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei4kZ2V0ID0gZnVuY3Rpb24oJHJlc291cmNlKSB7ICduZ0luamVjdCc7XHJcblxyXG4gICAgICBjb25zdCBsYlJlc291cmNlID0gZnVuY3Rpb24odXJsLCBwYXJhbXMsIGFjdGlvbnMpIHtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMoYWN0aW9ucykubWFwKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgIGFjdGlvbnNba2V5XS5vcmlnaW5hbFVybCA9IGFjdGlvbnNba2V5XS51cmw7XHJcbiAgICAgICAgICBhY3Rpb25zW2tleV0udXJsID0gb3B0aW9ucy51cmxCYXNlICsgYWN0aW9uc1trZXldLnVybDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzb3VyY2UgPSAkcmVzb3VyY2Uob3B0aW9ucy51cmxCYXNlICsgdXJsLCBwYXJhbXMsIGFjdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBBbmd1bGFyIGFsd2F5cyBjYWxscyBQT1NUIG9uICRzYXZlKClcclxuICAgICAgICAvLyBUaGlzIGhhY2sgaXMgYmFzZWQgb25cclxuICAgICAgICAvLyBodHRwOi8va2lya2J1c2hlbGwubWUvYW5ndWxhci1qcy11c2luZy1uZy1yZXNvdXJjZS1pbi1hLW1vcmUtcmVzdGZ1bC1tYW5uZXIvXHJcbiAgICAgICAgcmVzb3VyY2UucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24oc3VjY2VzcywgZXJyb3IpIHtcclxuICAgICAgICAgIC8vIEZvcnR1bmF0ZWx5LCBMb29wQmFjayBwcm92aWRlcyBhIGNvbnZlbmllbnQgYHVwc2VydGAgbWV0aG9kXHJcbiAgICAgICAgICAvLyB0aGF0IGV4YWN0bHkgZml0cyBvdXIgbmVlZHMuXHJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSByZXNvdXJjZS51cHNlcnQuY2FsbCh0aGlzLCB7fSwgdGhpcywgc3VjY2VzcywgZXJyb3IpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC4kcHJvbWlzZSB8fCByZXN1bHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2U7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsYlJlc291cmNlLmdldFVybEJhc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgICAgfTtcclxuICAgIFxyXG4gICAgICByZXR1cm4gbGJSZXNvdXJjZTtcclxuXHJcbiAgICB9O1xyXG5cclxuICB9XHJcblxyXG4gIHJldHVybiBtb2R1bGVcclxuICAgIC5mYWN0b3J5KCdsYkF1dGgnLCBsYkF1dGgpXHJcbiAgICAucHJvdmlkZXIoJ2xiUmVzb3VyY2UnLCBsYlJlc291cmNlKVxyXG4gICAgLmZhY3RvcnkoJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicsIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcilcclxuICAgIC5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24oJGh0dHBQcm92aWRlcikgeyAnbmdJbmplY3QnO1xyXG4gICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InKTtcclxuICAgIH1dKTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9sYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGxiO1xuZnVuY3Rpb24gbGIobW9kdWxlKSB7XG5cbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcbiAgZnVuY3Rpb24gZ2V0SG9zdCh1cmwpIHtcbiAgICB2YXIgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xuICAgIHJldHVybiBtID8gbVsxXSA6IG51bGw7XG4gIH1cblxuICB2YXIgdXJsQmFzZUhvc3QgPSBsb2NhdGlvbi5ob3N0O1xuXG4gIHZhciBsYkF1dGggPSBmdW5jdGlvbiBsYkF1dGgoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcbiAgICB2YXIgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xuXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcbiAgICAvLyBXZSBhcmUgdXNpbmcgZW1wdHkgc3RyaW5nIGFzIGEgbWFya2VyIGZvciBudWxsL3VuZGVmaW5lZCB2YWx1ZXMuXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XG4gICAgICAgIHN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWQobmFtZSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Vba2V5XSB8fCBzZXNzaW9uU3RvcmFnZVtrZXldIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXpbbmFtZV0gPSBsb2FkKG5hbWUpO1xuICAgICAgfSk7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdmFyIHN0b3JhZ2UgPSB0aGl6LnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzdG9yYWdlLCBuYW1lLCB0aGl6W25hbWVdKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgdXNlcklkLCB1c2VyRGF0YSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IHVzZXJJZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gbnVsbDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBzYXZlKHNlc3Npb25TdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgICAgc2F2ZShsb2NhbFN0b3JhZ2UsIG5hbWUsIG51bGwpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XG4gIH07XG5cbiAgdmFyIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcigkcSwgbGJBdXRoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHJldHVybiB7XG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV4dGVybmFsIHJlcXVlc3RzXG4gICAgICAgIHZhciBob3N0ID0gZ2V0SG9zdChjb25maWcudXJsKTtcbiAgICAgICAgaWYgKGhvc3QgJiYgaG9zdCAhPT0gdXJsQmFzZUhvc3QpIHtcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XG4gICAgICAgICAgY29uZmlnLmhlYWRlcnNbYXV0aEhlYWRlcl0gPSBsYkF1dGguYWNjZXNzVG9rZW5JZDtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuX19pc0dldEN1cnJlbnRVc2VyX18pIHtcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxuICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIHVzZXIgbG9nZ2VkIGluXG4gICAgICAgICAgdmFyIHJlcyA9IHtcbiAgICAgICAgICAgIGJvZHk6IHsgZXJyb3I6IHsgc3RhdHVzOiA0MDEgfSB9LFxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXG4gICAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGZ1bmN0aW9uIGhlYWRlcnMoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICB2YXIgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uIGxiUmVzb3VyY2UoKSB7XG4gICAgJ25nSW5qZWN0JztcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHVybEJhc2U6IFwiL2FwaVwiLFxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nXG4gICAgfTtcblxuICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlciBUaGUgaGVhZGVyIG5hbWUgdG8gdXNlLCBlLmcuIGBYLUFjY2Vzcy1Ub2tlbmBcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ29uZmlndXJlIHRoZSBSRVNUIHRyYW5zcG9ydCB0byB1c2UgYSBkaWZmZXJlbnQgaGVhZGVyIGZvciBzZW5kaW5nXHJcbiAgICAgKiB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uIEl0IGlzIHNlbnQgaW4gdGhlIGBBdXRob3JpemF0aW9uYCBoZWFkZXJcclxuICAgICAqIGJ5IGRlZmF1bHQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoaGVhZGVyKSB7XG4gICAgICBvcHRpb25zLmF1dGhIZWFkZXIgPSBoZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgaGVhZGVyIG5hbWUgdGhhdCBpcyB1c2VkIGZvciBzZW5kaW5nIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdXNlLCBlLmcuIGAvYXBpYCBvciBgLy9leGFtcGxlLmNvbS9hcGlgLlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDaGFuZ2UgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBCeSBkZWZhdWx0LCB0aGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouc2V0VXJsQmFzZSA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgIG9wdGlvbnMudXJsQmFzZSA9IHVybDtcbiAgICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIFRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICB9O1xuXG4gICAgdGhpei4kZ2V0ID0gZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xuICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoYWN0aW9ucykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICAgIGFjdGlvbnNba2V5XS51cmwgPSBvcHRpb25zLnVybEJhc2UgKyBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSAkcmVzb3VyY2Uob3B0aW9ucy51cmxCYXNlICsgdXJsLCBwYXJhbXMsIGFjdGlvbnMpO1xuXG4gICAgICAgIC8vIEFuZ3VsYXIgYWx3YXlzIGNhbGxzIFBPU1Qgb24gJHNhdmUoKVxuICAgICAgICAvLyBUaGlzIGhhY2sgaXMgYmFzZWQgb25cbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xuICAgICAgICByZXNvdXJjZS5wcm90b3R5cGUuJHNhdmUgPSBmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxuICAgICAgICAgIC8vIHRoYXQgZXhhY3RseSBmaXRzIG91ciBuZWVkcy5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LiRwcm9taXNlIHx8IHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gbW9kdWxlLmZhY3RvcnkoJ2xiQXV0aCcsIGxiQXV0aCkucHJvdmlkZXIoJ2xiUmVzb3VyY2UnLCBsYlJlc291cmNlKS5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpLmNvbmZpZyhbJyRodHRwUHJvdmlkZXInLCBmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InKTtcbiAgfV0pO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2xiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYkV2ZW50VGFyZ2V0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkV2ZW50VGFyZ2V0ICgpIHt9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByb3BpZWRhZGVzXHJcbiAgLnByb3BlcnR5KCckX2xpc3RlbmVycycsIHsgdmFsdWU6IFtdIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gbWV0aG9kXHJcbiAgLm1ldGhvZCgnJGJpbmQnLCBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcclxuICAgIGlmKCEodHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSkge1xyXG4gICAgICB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdID0gW107XHJcbiAgICB9XHJcbiAgICB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdLnB1c2goY2FsbGJhY2spO1xyXG4gIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gbWV0aG9kXHJcbiAgLm1ldGhvZCgnJHVuYmluZCAnLCBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcclxuICAgIGlmKCEodHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgc3RhY2sgPSB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdO1xyXG4gICAgZm9yKHZhciBpID0gMCwgbCA9IHN0YWNrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICBpZihzdGFja1tpXSA9PT0gY2FsbGJhY2spe1xyXG4gICAgICAgIHN0YWNrLnNwbGljZShpLCAxKTtcclxuICAgICAgICByZXR1cm4gdGhpcy4kdW5iaW5kKHR5cGUsIGNhbGxiYWNrKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gbWV0aG9kXHJcbiAgLm1ldGhvZCgnJGVtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmKCEoZXZlbnQudHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgc3RhY2sgPSB0aGlzLiRfbGlzdGVuZXJzW2V2ZW50LnR5cGVdO1xyXG4gICAgZm9yKHZhciBpID0gMCwgbCA9IHN0YWNrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIHN0YWNrW2ldLmNhbGwodGhpcywgZXZlbnQpO1xyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJFdmVudFRhcmdldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYkV2ZW50VGFyZ2V0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkV2ZW50VGFyZ2V0KCkge30pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFByb3BpZWRhZGVzXG4gIC5wcm9wZXJ0eSgnJF9saXN0ZW5lcnMnLCB7IHZhbHVlOiBbXSB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBtZXRob2RcbiAgLm1ldGhvZCgnJGJpbmQnLCBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoISh0eXBlIGluIHRoaXMuJF9saXN0ZW5lcnMpKSB7XG4gICAgICB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgfVxuICAgIHRoaXMuJF9saXN0ZW5lcnNbdHlwZV0ucHVzaChjYWxsYmFjayk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIG1ldGhvZFxuICAubWV0aG9kKCckdW5iaW5kICcsIGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaykge1xuICAgIGlmICghKHR5cGUgaW4gdGhpcy4kX2xpc3RlbmVycykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHN0YWNrID0gdGhpcy4kX2xpc3RlbmVyc1t0eXBlXTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHN0YWNrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKHN0YWNrW2ldID09PSBjYWxsYmFjaykge1xuICAgICAgICBzdGFjay5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHJldHVybiB0aGlzLiR1bmJpbmQodHlwZSwgY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gbWV0aG9kXG4gIC5tZXRob2QoJyRlbWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKCEoZXZlbnQudHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgc3RhY2sgPSB0aGlzLiRfbGlzdGVuZXJzW2V2ZW50LnR5cGVdO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gc3RhY2subGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBzdGFja1tpXS5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiRXZlbnRUYXJnZXQuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9