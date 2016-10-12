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
	
	var _lb = __webpack_require__(9);
	
	var _lb2 = _interopRequireDefault(_lb);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _lb2.default)(angular.module('ng.idb', [])).constant('idbVersion', '0.0.1').service('idbEvents', _idbEvents2.default).service('idbUtils', _idbUtils2.default).service('qs', _qs2.default)
	
	// Take of lb-services.js
	.service('idb', _idb2.default).service('idbModel', _idbModel2.default);

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
	
	  // Dvuelve el host de una URL
	
	  function getHost(url) {
	    var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
	    return m ? m[1] : null;
	  }
	
	  // Funcion para determinar si es un callback válido o no
	  function isCallback(cb, throwError) {
	
	    if (typeof cb == 'function' || cb == null || cb == undefined) {
	      return true;
	    }
	
	    return false;
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
	        if (typeof types[i] == 'funcion') {
	          types[i](args[i]);
	          continue;
	        }
	
	        var err = new Error('Invalid validator to: ' + values[i] + ' must be ' + types[i]);
	        err.name = 'InvalidValidator';
	        throw err;
	      }
	    }
	  }
	
	  return {
	    getHost: getHost,
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
	
	idb.$inject = ["qs", "idbModel", "idbUtils", "idbEvents", "$log"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = idb;
	function idb(qs, idbModel, idbUtils, idbEvents, $log) {
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
	  return function idb(dbName, dbVersion) {
	    var thiz = this;
	    idbUtils.validate(arguments, ['string', 'number']);
	
	    // Manejadores de eventos.
	    var eventsCallbacks = {};
	    var upgradeNeededDefered = qs.defer();
	    var openDefered = qs.defer();
	    var opened = false;
	
	    // Instancia de la base de datos;
	    var request = null;
	    thiz.models = {};
	
	    // Agregar un manejador de evento
	    thiz.bind = function (eventName, cb) {
	      idbUtils.validate(arguments, ['string', 'function']);
	
	      if (!eventsCallbacks[eventName]) {
	        eventsCallbacks[eventName] = [];
	      }
	
	      eventsCallbacks[eventName].push(cb);
	    };
	
	    //Remueve un manejador de evento
	    thiz.unbind = function (eventName, cb) {
	      idbUtils.validate(arguments, ['string', 'function']);
	
	      if (!eventsCallbacks[eventName]) return;
	
	      // Buscar el cb
	      var idx = eventsCallbacks[eventName].indexOf(cb);
	
	      // Si se encontro el cb removerlo
	      if (idx != -1) {
	        eventsCallbacks[eventName].splice(idx, 1);
	      }
	    };
	
	    // Dispara un evento
	    thiz.trigger = function (eventName, args) {
	      idbUtils.validate(arguments, ['string', 'object']);
	
	      $log.log(dbName + '.v' + (dbVersion || 1) + ': ' + eventName);
	
	      for (var i in eventsCallbacks[eventName]) {
	        eventsCallbacks[eventName][i].apply(thiz, args);
	      }
	    };
	
	    // Callbacks para los errores
	    thiz.error = function (cb) {
	      thiz.bind(idbEvents.DB_ERROR, cb);
	      return thiz;
	    };
	
	    // Abrir una Base de datos.
	    thiz.open = function () {
	      if (opened) return openDefered;
	
	      // Crear un nuevo defer
	      opened = true;
	
	      // dejamos abierta nuestra base de datos
	      indexedDB.deleteDatabase(dbName).onsuccess = function () {
	
	        var rq = indexedDB.open(dbName, dbVersion);
	
	        rq.onupgradeneeded = function (event) {
	          // Do something with rq.result!
	          upgradeNeededDefered.resolve(event, rq);
	        };
	
	        // Asignar el manejador del resultado
	        rq.onsuccess = function (event) {
	          // Do something with rq.result!
	          request = rq;
	
	          // Asingar el manejador de errores a la BD
	          rq.onerror = function (event) {
	            $log.error('Database error: ' + event.target.errorCode);
	            thiz.trigger(idbEvents.DB_ERROR, [event]);
	          };
	
	          openDefered.resolve(event, rq);
	        };
	
	        // Asignar el manejador de errores
	        // Do something with rq.errorCode!
	        rq.onerror = function (event) {
	          openDefered.reject(rq.errorCode);
	        };
	      };
	
	      return openDefered;
	    };
	
	    // Agrega un nuevo modelo
	    thiz.model = function (name) {
	      idbUtils.validate(arguments, ['string']);
	
	      // Instanciar el modelo
	      var model = thiz.models[name];
	
	      // Si no existe el modelo crear
	      if (!model) model = idbModel(thiz, name);
	
	      // Guardar el modelo en los modelos
	      thiz.models[name] = model;
	
	      // Retornar el modelo
	      return model;
	    };
	
	    // Crea el objectStore para un model
	    thiz.createStore = function (modelName, modelId) {
	      idbUtils.validate(arguments, ['string', ['object', 'undefined']]);
	
	      upgradeNeededDefered.promise.then(function (event, rq) {
	        rq.result.createObjectStore(modelName, modelId);
	      });
	    };
	
	    // Crea el objectStore para un model
	    thiz.createIndex = function (modelName, indexName, fieldName, opts) {
	      idbUtils.validate(arguments, ['string', 'string', 'string', ['object', 'undefined']]);
	
	      upgradeNeededDefered.promise.then(function (event, rq) {
	        var store = rq.transaction.objectStore(modelName);
	        store.createIndex(indexName, fieldName, opts);
	      });
	    };
	
	    // Crea una transacción
	    thiz.transaction = function (modelName, perms, action, cb) {
	      idbUtils.validate(arguments, ['string', 'string', 'function', ['function', 'undefined']]);
	
	      var defered = qs.defer(cb);
	
	      // Cuando se abra la BD
	      openDefered.promise.then(function (event, rq) {
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
	        var rq = tx.objectStore(modelName).put(instance);
	
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
	    };
	
	    // Buscar en el modelo
	    thiz.find = function (Model, modelName, scope, cb) {
	      idbUtils.validate(arguments, ['function', 'string', ['object', 'undefined'], 'function']);
	
	      var defered = qs.defer(cb);
	      var result = [];
	
	      // Se crea una transaccion
	      thiz.transaction(modelName, 'readonly', function (tx) {
	        var store = tx.objectStore(modelName);
	        var request = store.openCursor();
	
	        request.onsuccess = function () {
	          var cursor = request.result;
	
	          // No more matching records.
	          if (!cursor) return defered.resolve(result);
	
	          // Called for each matching record.
	          result.push(Model.get(cursor.value));
	          cursor.continue();
	        };
	      });
	    };
	
	    // Crear alias para los eventos enlazar callbacks a los eventos
	    var defereds = void 0;
	    Object.keys(defereds = {
	      onOpen: openDefered,
	      onUpgradeNeeded: upgradeNeededDefered
	    }).map(function (key) {
	      defereds[key].promise.done(function (err) {
	        var text = dbName + '.v' + (dbVersion || 1) + ': ' + key;
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
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	// Funcion para el servicio de la BD
	
	idbModel.$inject = ["qs", "idbUtils", "lbResource"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = idbModel;
	function idbModel(qs, idbUtils, lbResource) {
	  'ngInject';
	
	  return function idbModel(db, modelName) {
	    var thiz = this;
	    idbUtils.validate(arguments, [null, 'string']);
	
	    // Clave del modelo
	    var id = { keyPath: 'id', autoIncrement: true };
	    var instances = {};
	    var remote = null;
	
	    // Constuctor del modelo
	    function Model(data) {
	      this.setAttributes(data);
	      this.constructor(data);
	    };
	
	    // Asigna el ID al modelo
	    Model.id = function (pId) {
	      idbUtils.validate(arguments, ['object']);
	      id = pId;
	      return Model;
	    };
	
	    // Crea el objecto storage para el modelo.
	    Model.createStore = function () {
	      db.createStore(modelName, id);
	      return Model;
	    };
	
	    // Agrega un index
	    Model.index = function (indexName, fieldName, opts) {
	      db.createIndex(modelName, indexName, fieldName, opts);
	      return Model;
	    };
	
	    // Método que permite modificar model.
	    Model.build = function (buildCallback) {
	      idbUtils.validate(arguments, ['function']);
	      buildCallback(Model);
	      return Model;
	    };
	
	    // Configura el remote api;
	    Model.remote = function (url, args, actions) {
	      idbUtils.validate(arguments, ['string', 'object', 'object']);
	      Model._remote = lbResource(url, args, actions);
	      return Model;
	    };
	
	    // Crea nuevas instancias de los modelos
	    Model.create = function (data, cb) {
	      idbUtils.validate(arguments, ['object', ['function', 'undefined']]);
	
	      // Si es un array
	      if (data.length === undefined) {
	        var record = Model.get(data);
	        return record.create(cb);
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
	      idbUtils.validate(arguments, ['object', 'string', ['function', 'undefined']]);
	
	      var fields = field.split('.');
	      var lastField = fields.pop();
	
	      return function _set(obj) {
	        if (fields.length == 0) return cb(obj, lastField);
	        var field = fields.shift();
	        if (typeof obj[field] === 'undefined') obj[field] = {};
	        return _set(obj[field]);
	      }(obj);
	    };
	
	    // Devuelve la instancia del model de las guardadas. Si no existe entonce
	    // se crea
	    Model.get = function (obj) {
	      idbUtils.validate(arguments, ['object']);
	
	      // Obtener el key del objeto
	      var key = Model.searchDeepField(obj, id.keyPath, function (obj, lastField) {
	        return obj[lastField];
	      });
	
	      // El objeto no tiene ID
	      if (!key) return new Model(obj);
	
	      // No existe la instancia entonce se crea
	      if (!instances[key]) instances[key] = new Model(obj);
	
	      return instances[key];
	    };
	
	    // Buscar en el modelo
	    Model.find = function (scope, cb) {
	      var args = Array.prototype.slice.call(arguments);
	      cb = args.pop();scope = args.pop();
	      return db.find(Model, modelName, scope, cb);
	    };
	
	    // Asigna los atributos
	    Model.prototype.setAttributes = function (data) {
	      var thiz = this;
	      idbUtils.validate(arguments, ['object']);
	
	      Object.keys(data).map(function (property) {
	        thiz.set(property, data[property]);
	      });
	    };
	
	    // Devuelve el valor de una propiedad
	    Model.prototype.get = function (field) {
	      var thiz = this;
	      return Model.searchDeepField(thiz, field, function (obj, lastField) {
	        return obj[lastField];
	      });
	    };
	
	    // Asigna in valor a un campo
	    Model.prototype.set = function (field, value) {
	      var thiz = this;
	      return Model.searchDeepField(thiz, field, function (obj, lastField) {
	        obj[lastField] = value;
	        return thiz;
	      });
	    };
	
	    // Consturctor que se puede sobre escribir
	    Model.prototype.constructor = function (data) {};
	
	    // Guarda los datos del objeto
	    Model.prototype.create = function (cb) {
	      var thiz = this;
	      return db.create(modelName, this, function (err, event) {
	        if (err) {
	          if (cb) cb(err);return;
	        };
	
	        // Asignar el generado al modelo
	        thiz.set(id.keyPath, event.target.result);
	
	        // Guardar la instancia en la colecion de instancias
	        instances[thiz.get(id.keyPath)] = thiz;
	
	        if (cb) cb.apply(null, [null].concat(Array.prototype.slice.call(arguments)));
	      });
	    };
	
	    return Model;
	  };
	}

/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzliMTZmOWUyOTc0NGU0MTI0ZjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiVXRpbHMuanM/MWJiNCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJFdmVudHMuanM/NDg2YSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3FzLmpzPzY0MzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiLmpzPzYzNTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qcz9mOWY5Iiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9sYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvbGIuanM/MzAwNiJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29uc3RhbnQiLCJzZXJ2aWNlIiwiaWRiVXRpbHMiLCIkcSIsImdldEhvc3QiLCJ1cmwiLCJtIiwibWF0Y2giLCJpc0NhbGxiYWNrIiwiY2IiLCJ0aHJvd0Vycm9yIiwidW5kZWZpbmVkIiwibXVzdEJlQ2FsbGJhY2siLCJlcnIiLCJFcnJvciIsIm5hbWUiLCJtdXN0QmUiLCJ2YWx1ZSIsInR5cGVzIiwiaSIsImpvaW4iLCJ2YWxpZGF0ZSIsImFyZ3MiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsInZhbHVlcyIsImlkYkV2ZW50cyIsIkRCX0VSUk9SIiwicXMiLCJxc0NsYXNzIiwidGhpeiIsInRoZW5zIiwidGhlbnNSZWFkeSIsImNhdGNocyIsImNhdGNoc1JlYWR5IiwicmVzdWx0QXJncyIsImVycm9yIiwicHJvbWlzZSIsIiRyZXNvbHZlZCIsInRoZW5zUmVzb2x2ZWQiLCJsZW5ndGgiLCJzaGlmdCIsImFwcGx5IiwicHVzaCIsImNhdGNoc1Jlc29sdmVkIiwicmVzb2x2ZSIsImFyZ3VtZW50cyIsInJlamVjdCIsInRoZW4iLCJjYXRjaCIsImRvbmUiLCJjb25jYXQiLCJkZWZlciIsImlkYiIsImlkYk1vZGVsIiwiJGxvZyIsImluZGV4ZWREQiIsIndpbmRvdyIsIm1vekluZGV4ZWREQiIsIndlYmtpdEluZGV4ZWREQiIsIm1zSW5kZXhlZERCIiwiSURCVHJhbnNhY3Rpb24iLCJ3ZWJraXRJREJUcmFuc2FjdGlvbiIsIm1zSURCVHJhbnNhY3Rpb24iLCJJREJLZXlSYW5nZSIsIndlYmtpdElEQktleVJhbmdlIiwibXNJREJLZXlSYW5nZSIsImFsZXJ0IiwiZGJOYW1lIiwiZGJWZXJzaW9uIiwiZXZlbnRzQ2FsbGJhY2tzIiwidXBncmFkZU5lZWRlZERlZmVyZWQiLCJvcGVuRGVmZXJlZCIsIm9wZW5lZCIsInJlcXVlc3QiLCJtb2RlbHMiLCJiaW5kIiwiZXZlbnROYW1lIiwidW5iaW5kIiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsInRyaWdnZXIiLCJsb2ciLCJvcGVuIiwiZGVsZXRlRGF0YWJhc2UiLCJvbnN1Y2Nlc3MiLCJycSIsIm9udXBncmFkZW5lZWRlZCIsImV2ZW50Iiwib25lcnJvciIsInRhcmdldCIsImVycm9yQ29kZSIsIm1vZGVsIiwiY3JlYXRlU3RvcmUiLCJtb2RlbE5hbWUiLCJtb2RlbElkIiwicmVzdWx0IiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJjcmVhdGVJbmRleCIsImluZGV4TmFtZSIsImZpZWxkTmFtZSIsIm9wdHMiLCJzdG9yZSIsInRyYW5zYWN0aW9uIiwib2JqZWN0U3RvcmUiLCJwZXJtcyIsImFjdGlvbiIsImRlZmVyZWQiLCJ0eCIsIm9uY29tcGxldGUiLCJvbmFib3J0IiwiY3JlYXRlIiwiaW5zdGFuY2UiLCJwdXQiLCJmaW5kIiwiTW9kZWwiLCJzY29wZSIsIm9wZW5DdXJzb3IiLCJjdXJzb3IiLCJnZXQiLCJjb250aW51ZSIsImRlZmVyZWRzIiwiT2JqZWN0Iiwia2V5cyIsIm9uT3BlbiIsIm9uVXBncmFkZU5lZWRlZCIsIm1hcCIsImtleSIsInRleHQiLCJsYlJlc291cmNlIiwiZGIiLCJpZCIsImtleVBhdGgiLCJhdXRvSW5jcmVtZW50IiwiaW5zdGFuY2VzIiwicmVtb3RlIiwiZGF0YSIsInNldEF0dHJpYnV0ZXMiLCJjb25zdHJ1Y3RvciIsInBJZCIsImluZGV4IiwiYnVpbGQiLCJidWlsZENhbGxiYWNrIiwiYWN0aW9ucyIsIl9yZW1vdGUiLCJyZWNvcmQiLCJhcnIiLCJpdGVyYXRpb24iLCJzZWFyY2hEZWVwRmllbGQiLCJvYmoiLCJmaWVsZCIsImZpZWxkcyIsInNwbGl0IiwibGFzdEZpZWxkIiwicG9wIiwiX3NldCIsInByb3BlcnR5Iiwic2V0IiwibGIiLCJ1cmxCYXNlSG9zdCIsImxvY2F0aW9uIiwiaG9zdCIsImxiQXV0aCIsInByb3BzIiwicHJvcHNQcmVmaXgiLCJzYXZlIiwic3RvcmFnZSIsImNvbnNvbGUiLCJsb2FkIiwibG9jYWxTdG9yYWdlIiwic2Vzc2lvblN0b3JhZ2UiLCJmb3JFYWNoIiwiY3VycmVudFVzZXJEYXRhIiwicmVtZW1iZXJNZSIsInNldFVzZXIiLCJhY2Nlc3NUb2tlbklkIiwidXNlcklkIiwidXNlckRhdGEiLCJjdXJyZW50VXNlcklkIiwiY2xlYXJVc2VyIiwiY2xlYXJTdG9yYWdlIiwibGJBdXRoUmVxdWVzdEludGVyY2VwdG9yIiwiY29uZmlnIiwiaGVhZGVycyIsImF1dGhIZWFkZXIiLCJfX2lzR2V0Q3VycmVudFVzZXJfXyIsInJlcyIsImJvZHkiLCJzdGF0dXMiLCJ3aGVuIiwib3B0aW9ucyIsInVybEJhc2UiLCJzZXRBdXRoSGVhZGVyIiwiaGVhZGVyIiwiZ2V0QXV0aEhlYWRlciIsInNldFVybEJhc2UiLCJnZXRVcmxCYXNlIiwiJGdldCIsIiRyZXNvdXJjZSIsInBhcmFtcyIsIm9yaWdpbmFsVXJsIiwicmVzb3VyY2UiLCIkc2F2ZSIsInN1Y2Nlc3MiLCJ1cHNlcnQiLCIkcHJvbWlzZSIsImZhY3RvcnkiLCJwcm92aWRlciIsIiRodHRwUHJvdmlkZXIiLCJpbnRlcmNlcHRvcnMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBOztBQ0VBLEtBQUksYUFBYSx1QkFBdUI7O0FERHhDOztBQ0tBLEtBQUksY0FBYyx1QkFBdUI7O0FESnpDOztBQ1FBLEtBQUksT0FBTyx1QkFBdUI7O0FETmxDOztBQ1VBLEtBQUksUUFBUSx1QkFBdUI7O0FEVG5DOztBQ2FBLEtBQUksYUFBYSx1QkFBdUI7O0FEWnhDOztBQ2dCQSxLQUFJLE9BQU8sdUJBQXVCOztBQUVsQyxVQUFTLHVCQUF1QixLQUFLLEVBQUUsT0FBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsU0FBUzs7QURoQnZGLG1CQUFHQSxRQUFRQyxPQUFPLFVBQVUsS0FDekJDLFNBQVMsY0FBYyxTQUN2QkMsUUFBUSxhQUZYLHFCQUdHQSxRQUFRLFlBSFgsb0JBSUdBLFFBQVEsTUFKWDs7O0VBT0dBLFFBQVEsT0FQWCxlQVFHQSxRQUFRLFlBUlgsb0I7Ozs7OztBRVZBOzs7QUNFQSxRQUFPLGVBQWUsU0FBUyxjQUFjO0dBQzNDLE9BQU87OztBQUdULEtBQUksVUFBVSxPQUFPLFdBQVcsY0FBYyxPQUFPLE9BQU8sYUFBYSxXQUFXLFVBQVUsS0FBSyxFQUFFLE9BQU8sT0FBTyxTQUFTLFVBQVUsS0FBSyxFQUFFLE9BQU8sT0FBTyxPQUFPLFdB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LFFBQVF4RDs7Ozs7U0FLeEQwRCxTQUFTcEwsVUFBVXFMLFFBQVEsVUFBU0MsU0FBU3hLLE9BQU87OztXQUdsRCxJQUFJNkQsU0FBU3lHLFNBQVNHLE9BQU9yTCxLQUFLLE1BQU0sSUFBSSxNQUFNb0wsU0FBU3hLO1dBQzNELE9BQU82RCxPQUFPNkcsWUFBWTdHOztTQUU1QixPQUFPeUc7OztPQUdUeEUsV0FBV21FLGFBQWEsWUFBVztTQUNqQyxPQUFPTixRQUFRQzs7O09BR2pCOUQsV0FBV2lFLGdCQUFnQixZQUFXO1NBQ3BDLE9BQU9KLFFBQVFOOzs7T0FHakIsT0FBT3ZEOzs7O0dBTVgsT0FBT3JJLE9BQ0prTixRQUFRLFVBQVU1QyxRQUNsQjZDLFNBQVMsY0FBYzlFLFlBQ3ZCNkUsUUFBUSw0QkFBNEJ6QiwwQkFDcENDLE9BQU8sQ0FBQyxpQkFBaUIsVUFBUzBCLGVBQWU7S0FBRTs7S0FDbERBLGNBQWNDLGFBQWF2SyxLQUFLIiwiZmlsZSI6Im5nLWlkYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNzliMTZmOWUyOTc0NGU0MTI0ZjZcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgaWRiVXRpbHMgZnJvbSAnLi91dGlscy9pZGJVdGlscyc7XHJcbmltcG9ydCBpZGJFdmVudHMgZnJvbSAnLi91dGlscy9pZGJFdmVudHMnO1xyXG5pbXBvcnQgcXMgZnJvbSAnLi91dGlscy9xcyc7XHJcblxyXG5pbXBvcnQgaWRiIGZyb20gJy4vc2VydmljZXMvaWRiJztcclxuaW1wb3J0IGlkYk1vZGVsIGZyb20gJy4vc2VydmljZXMvaWRiTW9kZWwnO1xyXG5pbXBvcnQgbGIgZnJvbSAnLi9zZXJ2aWNlcy9sYic7XHJcblxyXG5sYihhbmd1bGFyLm1vZHVsZSgnbmcuaWRiJywgW10pKVxyXG4gIC5jb25zdGFudCgnaWRiVmVyc2lvbicsICcwLjAuMScpXHJcbiAgLnNlcnZpY2UoJ2lkYkV2ZW50cycsIGlkYkV2ZW50cylcclxuICAuc2VydmljZSgnaWRiVXRpbHMnLCBpZGJVdGlscylcclxuICAuc2VydmljZSgncXMnLCBxcylcclxuXHJcbiAgLy8gVGFrZSBvZiBsYi1zZXJ2aWNlcy5qc1xyXG4gIC5zZXJ2aWNlKCdpZGInLCBpZGIpXHJcbiAgLnNlcnZpY2UoJ2lkYk1vZGVsJywgaWRiTW9kZWwpXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2lkYlV0aWxzID0gcmVxdWlyZSgnLi91dGlscy9pZGJVdGlscycpO1xuXG52YXIgX2lkYlV0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlV0aWxzKTtcblxudmFyIF9pZGJFdmVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2lkYkV2ZW50cycpO1xuXG52YXIgX2lkYkV2ZW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJFdmVudHMpO1xuXG52YXIgX3FzID0gcmVxdWlyZSgnLi91dGlscy9xcycpO1xuXG52YXIgX3FzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3FzKTtcblxudmFyIF9pZGIgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYicpO1xuXG52YXIgX2lkYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGIpO1xuXG52YXIgX2lkYk1vZGVsID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJNb2RlbCcpO1xuXG52YXIgX2lkYk1vZGVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYk1vZGVsKTtcblxudmFyIF9sYiA9IHJlcXVpcmUoJy4vc2VydmljZXMvbGInKTtcblxudmFyIF9sYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbigwLCBfbGIyLmRlZmF1bHQpKGFuZ3VsYXIubW9kdWxlKCduZy5pZGInLCBbXSkpLmNvbnN0YW50KCdpZGJWZXJzaW9uJywgJzAuMC4xJykuc2VydmljZSgnaWRiRXZlbnRzJywgX2lkYkV2ZW50czIuZGVmYXVsdCkuc2VydmljZSgnaWRiVXRpbHMnLCBfaWRiVXRpbHMyLmRlZmF1bHQpLnNlcnZpY2UoJ3FzJywgX3FzMi5kZWZhdWx0KVxuXG4vLyBUYWtlIG9mIGxiLXNlcnZpY2VzLmpzXG4uc2VydmljZSgnaWRiJywgX2lkYjIuZGVmYXVsdCkuc2VydmljZSgnaWRiTW9kZWwnLCBfaWRiTW9kZWwyLmRlZmF1bHQpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiVXRpbHMgKCRxKSB7ICduZ0luamVjdCdcclxuICBcclxuICAvLyBEdnVlbHZlIGVsIGhvc3QgZGUgdW5hIFVSTFxyXG4gIGZ1bmN0aW9uIGdldEhvc3QodXJsKSB7XHJcbiAgICBsZXQgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xyXG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcclxuICB9XHJcblxyXG4gIC8vIEZ1bmNpb24gcGFyYSBkZXRlcm1pbmFyIHNpIGVzIHVuIGNhbGxiYWNrIHbDoWxpZG8gbyBub1xyXG4gIGZ1bmN0aW9uIGlzQ2FsbGJhY2sgKGNiLCB0aHJvd0Vycm9yKSB7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBjYiA9PSAnZnVuY3Rpb24nIHx8IGNiID09IG51bGwgfHwgY2IgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIFNpIGVsIGNhbGxiYWNrIG5vIGVzIHbDoWxpZG8gbGFuemEgdW4gZXJycG9yXHJcbiAgZnVuY3Rpb24gbXVzdEJlQ2FsbGJhY2sgKGNiKSB7XHJcbiAgICBpZiAoaXNDYWxsYmFjayhjYikpIHJldHVybjtcclxuXHJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIGNhbGxiYWNrJyk7XHJcbiAgICBlcnIubmFtZSA9ICdJbnZhbGlkQ2FsbGJhY2snXHJcblxyXG4gICAgdGhyb3cgZXJyO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIEdlbmVyYSB1biBlcnJvciBzaSBlbCB2YWxvciBubyBlcyBkZWwgdGlwbyBpbmRpY2FkbyBwb3IgcGFyYW1ldHJvXHJcbiAgZnVuY3Rpb24gbXVzdEJlICh2YWx1ZSwgdHlwZXMpIHtcclxuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcclxuICAgIGZvcih2YXIgaSBpbiB0eXBlcyl7XHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gdHlwZXNbaV0pIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWU6ICcrdmFsdWUrJyBtdXN0IGJlICcrdHlwZXMuam9pbignIG9yICcpKTtcclxuICAgIGVyci5uYW1lID0gJ0ludmFsaWRWYWx1ZSdcclxuICAgIHRocm93IGVycjtcclxuXHJcbiAgfVxyXG5cclxuICAvLyBWYWxpZGEgdW4gYXJyYXkgZGUgYXJndW1lbnRvcyBjb24gdW4gYXJyYSBkZSB0aXBvc1xyXG4gIGZ1bmN0aW9uIHZhbGlkYXRlIChhcmdzLCB0eXBlcykge1xyXG5cclxuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcclxuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcclxuICAgIGZvciAodmFyIGkgaW4gYXJncyl7XHJcbiAgICAgIGlmICh0eXBlc1tpXSl7XHJcbiAgICAgICAgaWYgKHR5cGVzW2ldID09IG51bGwpe1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdHlwZXNbaV0gPT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGVzW2ldID09ICdvYmplY3QnKXtcclxuICAgICAgICAgIG11c3RCZShhcmdzW2ldLCB0eXBlc1tpXSk7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0eXBlc1tpXSA9PSAnZnVuY2lvbicpe1xyXG4gICAgICAgICAgdHlwZXNbaV0oYXJnc1tpXSk7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsaWRhdG9yIHRvOiAnK3ZhbHVlc1tpXSsnIG11c3QgYmUgJyt0eXBlc1tpXSk7XHJcbiAgICAgICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbGlkYXRvcidcclxuICAgICAgICB0aHJvdyBlcnI7XHJcblxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGdldEhvc3Q6IGdldEhvc3QsXHJcbiAgICBpc0NhbGxiYWNrOiBpc0NhbGxiYWNrLFxyXG4gICAgbXVzdEJlQ2FsbGJhY2s6IG11c3RCZUNhbGxiYWNrLFxyXG4gICAgbXVzdEJlOiBtdXN0QmUsXHJcbiAgICB2YWxpZGF0ZTogdmFsaWRhdGUsXHJcbiAgfTtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9pZGJVdGlscy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBpZGJVdGlscztcbmZ1bmN0aW9uIGlkYlV0aWxzKCRxKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcblxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xuICAgIHZhciBtID0gdXJsLm1hdGNoKC9eKD86aHR0cHM/Oik/XFwvXFwvKFteXFwvXSspLyk7XG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcbiAgfVxuXG4gIC8vIEZ1bmNpb24gcGFyYSBkZXRlcm1pbmFyIHNpIGVzIHVuIGNhbGxiYWNrIHbDoWxpZG8gbyBub1xuICBmdW5jdGlvbiBpc0NhbGxiYWNrKGNiLCB0aHJvd0Vycm9yKSB7XG5cbiAgICBpZiAodHlwZW9mIGNiID09ICdmdW5jdGlvbicgfHwgY2IgPT0gbnVsbCB8fCBjYiA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFNpIGVsIGNhbGxiYWNrIG5vIGVzIHbDoWxpZG8gbGFuemEgdW4gZXJycG9yXG4gIGZ1bmN0aW9uIG11c3RCZUNhbGxiYWNrKGNiKSB7XG4gICAgaWYgKGlzQ2FsbGJhY2soY2IpKSByZXR1cm47XG5cbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIGNhbGxiYWNrJyk7XG4gICAgZXJyLm5hbWUgPSAnSW52YWxpZENhbGxiYWNrJztcblxuICAgIHRocm93IGVycjtcbiAgfVxuXG4gIC8vIEdlbmVyYSB1biBlcnJvciBzaSBlbCB2YWxvciBubyBlcyBkZWwgdGlwbyBpbmRpY2FkbyBwb3IgcGFyYW1ldHJvXG4gIGZ1bmN0aW9uIG11c3RCZSh2YWx1ZSwgdHlwZXMpIHtcbiAgICBpZiAodHlwZW9mIHR5cGVzID09ICdzdHJpbmcnKSB0eXBlcyA9IFt0eXBlc107XG4gICAgZm9yICh2YXIgaSBpbiB0eXBlcykge1xuICAgICAgaWYgKCh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgPT0gdHlwZXNbaV0pIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZTogJyArIHZhbHVlICsgJyBtdXN0IGJlICcgKyB0eXBlcy5qb2luKCcgb3IgJykpO1xuICAgIGVyci5uYW1lID0gJ0ludmFsaWRWYWx1ZSc7XG4gICAgdGhyb3cgZXJyO1xuICB9XG5cbiAgLy8gVmFsaWRhIHVuIGFycmF5IGRlIGFyZ3VtZW50b3MgY29uIHVuIGFycmEgZGUgdGlwb3NcbiAgZnVuY3Rpb24gdmFsaWRhdGUoYXJncywgdHlwZXMpIHtcblxuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcbiAgICBpZiAodHlwZW9mIHR5cGVzID09ICdzdHJpbmcnKSB0eXBlcyA9IFt0eXBlc107XG4gICAgZm9yICh2YXIgaSBpbiBhcmdzKSB7XG4gICAgICBpZiAodHlwZXNbaV0pIHtcbiAgICAgICAgaWYgKHR5cGVzW2ldID09IG51bGwpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHR5cGVzW2ldID09ICdzdHJpbmcnIHx8IF90eXBlb2YodHlwZXNbaV0pID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgbXVzdEJlKGFyZ3NbaV0sIHR5cGVzW2ldKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHR5cGVzW2ldID09ICdmdW5jaW9uJykge1xuICAgICAgICAgIHR5cGVzW2ldKGFyZ3NbaV0pO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWxpZGF0b3IgdG86ICcgKyB2YWx1ZXNbaV0gKyAnIG11c3QgYmUgJyArIHR5cGVzW2ldKTtcbiAgICAgICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbGlkYXRvcic7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldEhvc3Q6IGdldEhvc3QsXG4gICAgaXNDYWxsYmFjazogaXNDYWxsYmFjayxcbiAgICBtdXN0QmVDYWxsYmFjazogbXVzdEJlQ2FsbGJhY2ssXG4gICAgbXVzdEJlOiBtdXN0QmUsXG4gICAgdmFsaWRhdGU6IHZhbGlkYXRlXG4gIH07XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiVXRpbHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBOb21icmUgZGUgbG9zIGV2ZW50b3NcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiRXZlbnRzKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBEQl9FUlJPUjogJ2NiLmVycm9yJ1xyXG4gIH1cclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9pZGJFdmVudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIE5vbWJyZSBkZSBsb3MgZXZlbnRvc1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaWRiRXZlbnRzO1xuZnVuY3Rpb24gaWRiRXZlbnRzKCkge1xuICByZXR1cm4ge1xuICAgIERCX0VSUk9SOiAnY2IuZXJyb3InXG4gIH07XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL2lkYkV2ZW50cy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHFzICgpIHsgJ25nSW5qZWN0J1xyXG4gIFxyXG4gIGZ1bmN0aW9uIHFzQ2xhc3MgKGNiKSB7IGxldCB0aGl6ID0gdGhpcztcclxuICAgIFxyXG4gICAgbGV0IHRoZW5zID0gW107XHJcbiAgICBsZXQgdGhlbnNSZWFkeSA9IFtdO1xyXG4gICAgbGV0IGNhdGNocyA9IFtdO1xyXG4gICAgbGV0IGNhdGNoc1JlYWR5ID0gW107XHJcbiAgICBsZXQgcmVzdWx0QXJncyA9IG51bGw7XHJcbiAgICBsZXQgZXJyb3IgPSBudWxsO1xyXG5cclxuICAgIHRoaXoucHJvbWlzZSA9IHt9O1xyXG4gICAgdGhpei4kcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiB0aGVuc1Jlc29sdmVkICgpIHtcclxuICAgICAgaWYgKCF0aGVucy5sZW5ndGgpIHJldHVybjtcclxuICAgICAgbGV0IGNiID0gdGhlbnMuc2hpZnQoKTtcclxuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5yZXN1bHRBcmdzKTtcclxuICAgICAgdGhlbnNSZWFkeS5wdXNoKGNiKTtcclxuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNhdGNoc1Jlc29sdmVkICgpIHtcclxuICAgICAgaWYgKCFjYXRjaHMubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgIGxldCBjYiA9IGNhdGNocy5zaGlmdCgpO1xyXG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcclxuICAgICAgY2F0Y2hzUmVhZHkucHVzaChjYik7XHJcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpei5yZXNvbHZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcclxuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICB0aGl6LnJlc3VsdEFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucmVqZWN0ID0gZnVuY3Rpb24gKGVycikge1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcclxuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICB0aGl6LmVycm9yID0gZXJyIHx8IHt9O1xyXG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnByb21pc2UudGhlbiA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICB0aGVucy5wdXNoKGNiKTtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmICF0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnByb21pc2UuY2F0Y2ggPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgY2F0Y2hzLnB1c2goY2IpO1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQgJiYgdGhpei5lcnJvcikge1xyXG4gICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucHJvbWlzZS5kb25lID0gZnVuY3Rpb24gKGNiKSB7XHJcblxyXG4gICAgICB0aGVucy5wdXNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYi5hcHBseShudWxsLCBbbnVsbF0uY29uY2F0KHRoaXoucmVzdWx0QXJncykpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNhdGNocy5wdXNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHtcclxuICAgICAgICBpZiAoIXRoaXouZXJyb3IpIHtcclxuICAgICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBpZihjYikgdGhpei5wcm9taXNlLmRvbmUoY2IpO1xyXG5cclxuICB9O1xyXG5cclxuICAvLyBDcmVhIHVuYSBpbnN0YW5jaWEgZGVsIGRlZmVyZWRcclxuICBxc0NsYXNzLmRlZmVyID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICByZXR1cm4gbmV3IHFzQ2xhc3MoY2IpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiBxc0NsYXNzO1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL3FzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gcXM7XG5mdW5jdGlvbiBxcygpIHtcbiAgJ25nSW5qZWN0JztcblxuICBmdW5jdGlvbiBxc0NsYXNzKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIHRoZW5zID0gW107XG4gICAgdmFyIHRoZW5zUmVhZHkgPSBbXTtcbiAgICB2YXIgY2F0Y2hzID0gW107XG4gICAgdmFyIGNhdGNoc1JlYWR5ID0gW107XG4gICAgdmFyIHJlc3VsdEFyZ3MgPSBudWxsO1xuICAgIHZhciBlcnJvciA9IG51bGw7XG5cbiAgICB0aGl6LnByb21pc2UgPSB7fTtcbiAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gdGhlbnNSZXNvbHZlZCgpIHtcbiAgICAgIGlmICghdGhlbnMubGVuZ3RoKSByZXR1cm47XG4gICAgICB2YXIgY2IgPSB0aGVucy5zaGlmdCgpO1xuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5yZXN1bHRBcmdzKTtcbiAgICAgIHRoZW5zUmVhZHkucHVzaChjYik7XG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2F0Y2hzUmVzb2x2ZWQoKSB7XG4gICAgICBpZiAoIWNhdGNocy5sZW5ndGgpIHJldHVybjtcbiAgICAgIHZhciBjYiA9IGNhdGNocy5zaGlmdCgpO1xuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XG4gICAgICBjYXRjaHNSZWFkeS5wdXNoKGNiKTtcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgfVxuXG4gICAgdGhpei5yZXNvbHZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICB0aGl6LnJlc3VsdEFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgIH07XG5cbiAgICB0aGl6LnJlamVjdCA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgdGhpei5lcnJvciA9IGVyciB8fCB7fTtcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgfTtcblxuICAgIHRoaXoucHJvbWlzZS50aGVuID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB0aGVucy5wdXNoKGNiKTtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiAhdGhpei5lcnJvcikge1xuICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgdGhpei5wcm9taXNlLmNhdGNoID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICBjYXRjaHMucHVzaChjYik7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQgJiYgdGhpei5lcnJvcikge1xuICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIHRoaXoucHJvbWlzZS5kb25lID0gZnVuY3Rpb24gKGNiKSB7XG5cbiAgICAgIHRoZW5zLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjYi5hcHBseShudWxsLCBbbnVsbF0uY29uY2F0KHRoaXoucmVzdWx0QXJncykpO1xuICAgICAgfSk7XG5cbiAgICAgIGNhdGNocy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSB7XG4gICAgICAgIGlmICghdGhpei5lcnJvcikge1xuICAgICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH07XG5cbiAgICBpZiAoY2IpIHRoaXoucHJvbWlzZS5kb25lKGNiKTtcbiAgfTtcblxuICAvLyBDcmVhIHVuYSBpbnN0YW5jaWEgZGVsIGRlZmVyZWRcbiAgcXNDbGFzcy5kZWZlciA9IGZ1bmN0aW9uIChjYikge1xuICAgIHJldHVybiBuZXcgcXNDbGFzcyhjYik7XG4gIH07XG5cbiAgcmV0dXJuIHFzQ2xhc3M7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvcXMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiIChxcywgaWRiTW9kZWwsIGlkYlV0aWxzLCBpZGJFdmVudHMsICRsb2cpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxyXG4gIGNvbnN0IGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQjtcclxuICAvLyBObyB1c2UgXCJjb25zdCBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXHJcbiAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XHJcbiAgY29uc3QgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xyXG4gIGNvbnN0IElEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcclxuICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxyXG4gIFxyXG4gIGlmICghaW5kZXhlZERCKSB7XHJcbiAgICBhbGVydChcIlN1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhc1wiKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8vIENsYXNlIHBhcmEgbGEgY3JlYWNpw7NuIGRlIGluc3RhbmNpYXMgZGUgbGEgQkRcclxuICByZXR1cm4gZnVuY3Rpb24gaWRiKGRiTmFtZSwgZGJWZXJzaW9uKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdudW1iZXInXSk7XHJcblxyXG4gICAgLy8gTWFuZWphZG9yZXMgZGUgZXZlbnRvcy5cclxuICAgIGxldCBldmVudHNDYWxsYmFja3MgPSB7fTtcclxuICAgIGxldCB1cGdyYWRlTmVlZGVkRGVmZXJlZCA9IHFzLmRlZmVyKCk7XHJcbiAgICBsZXQgb3BlbkRlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG4gICAgbGV0IG9wZW5lZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIEluc3RhbmNpYSBkZSBsYSBiYXNlIGRlIGRhdG9zO1xyXG4gICAgbGV0IHJlcXVlc3QgPSBudWxsO1xyXG4gICAgdGhpei5tb2RlbHMgPSB7fTtcclxuICAgIFxyXG4gICAgLy8gQWdyZWdhciB1biBtYW5lamFkb3IgZGUgZXZlbnRvXHJcbiAgICB0aGl6LmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgaWYgKCFldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSl7XHJcbiAgICAgICAgZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0ucHVzaChjYik7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvL1JlbXVldmUgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xyXG4gICAgdGhpei51bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgaWYgKCFldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkgcmV0dXJuO1xyXG5cclxuICAgICAgLy8gQnVzY2FyIGVsIGNiXHJcbiAgICAgIGNvbnN0IGlkeCA9IGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLmluZGV4T2YoY2IpO1xyXG5cclxuICAgICAgLy8gU2kgc2UgZW5jb250cm8gZWwgY2IgcmVtb3ZlcmxvXHJcbiAgICAgIGlmIChpZHggIT0gLTEpe1xyXG4gICAgICAgIGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEaXNwYXJhIHVuIGV2ZW50b1xyXG4gICAgdGhpei50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcclxuXHJcbiAgICAgICRsb2cubG9nKGRiTmFtZSsnLnYnKyhkYlZlcnNpb258fDEpKyc6ICcrZXZlbnROYW1lKTtcclxuXHJcbiAgICAgIGZvcihsZXQgaSBpbiBldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSl7XHJcbiAgICAgICAgZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpeiwgYXJncyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENhbGxiYWNrcyBwYXJhIGxvcyBlcnJvcmVzXHJcbiAgICB0aGl6LmVycm9yID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIHRoaXouYmluZChpZGJFdmVudHMuREJfRVJST1IsIGNiKTtcclxuICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFicmlyIHVuYSBCYXNlIGRlIGRhdG9zLlxyXG4gICAgdGhpei5vcGVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAob3BlbmVkKSByZXR1cm4gb3BlbkRlZmVyZWQ7XHJcblxyXG4gICAgICAvLyBDcmVhciB1biBudWV2byBkZWZlclxyXG4gICAgICBvcGVuZWQgPSB0cnVlO1xyXG5cclxuICAgICAgLy8gZGVqYW1vcyBhYmllcnRhIG51ZXN0cmEgYmFzZSBkZSBkYXRvc1xyXG4gICAgICBpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UoZGJOYW1lKS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHJxID0gaW5kZXhlZERCLm9wZW4oZGJOYW1lLCBkYlZlcnNpb24pO1xyXG5cclxuICAgICAgICBycS5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLnJlc3VsdCFcclxuICAgICAgICAgIHVwZ3JhZGVOZWVkZWREZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGVsIHJlc3VsdGFkb1xyXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxyXG4gICAgICAgICAgcmVxdWVzdCA9IHJxO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBBc2luZ2FyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzIGEgbGEgQkRcclxuICAgICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgJGxvZy5lcnJvcignRGF0YWJhc2UgZXJyb3I6ICcrIGV2ZW50LnRhcmdldC5lcnJvckNvZGUpO1xyXG4gICAgICAgICAgICB0aGl6LnRyaWdnZXIoaWRiRXZlbnRzLkRCX0VSUk9SLCBbZXZlbnRdKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBvcGVuRGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBycSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlIGVycm9yZXNcclxuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLmVycm9yQ29kZSFcclxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICBvcGVuRGVmZXJlZC5yZWplY3QocnEuZXJyb3JDb2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmV0dXJuIG9wZW5EZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQWdyZWdhIHVuIG51ZXZvIG1vZGVsb1xyXG4gICAgdGhpei5tb2RlbCA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnXSk7XHJcblxyXG4gICAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsb1xyXG4gICAgICBsZXQgbW9kZWwgPSB0aGl6Lm1vZGVsc1tuYW1lXTtcclxuXHJcbiAgICAgIC8vIFNpIG5vIGV4aXN0ZSBlbCBtb2RlbG8gY3JlYXJcclxuICAgICAgaWYoIW1vZGVsKVxyXG4gICAgICAgIG1vZGVsID0gaWRiTW9kZWwodGhpeiwgbmFtZSk7XHJcblxyXG4gICAgICAvLyBHdWFyZGFyIGVsIG1vZGVsbyBlbiBsb3MgbW9kZWxvc1xyXG4gICAgICB0aGl6Lm1vZGVsc1tuYW1lXSA9IG1vZGVsO1xyXG5cclxuICAgICAgLy8gUmV0b3JuYXIgZWwgbW9kZWxvXHJcbiAgICAgIHJldHVybiBtb2RlbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxyXG4gICAgdGhpei5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIG1vZGVsSWQpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICB1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xyXG4gICAgICAgIHJxLnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShtb2RlbE5hbWUsIG1vZGVsSWQpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxyXG4gICAgdGhpei5jcmVhdGVJbmRleCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICB1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xyXG4gICAgICAgIGxldCBzdG9yZSA9IHJxLnRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XHJcbiAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgdW5hIHRyYW5zYWNjacOzblxyXG4gICAgdGhpei50cmFuc2FjdGlvbiA9IGZ1bmN0aW9uKG1vZGVsTmFtZSwgcGVybXMsIGFjdGlvbiwgY2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnZnVuY3Rpb24nLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICBsZXQgZGVmZXJlZCA9IHFzLmRlZmVyKGNiKTtcclxuXHJcbiAgICAgIC8vIEN1YW5kbyBzZSBhYnJhIGxhIEJEXHJcbiAgICAgIG9wZW5EZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XHJcbiAgICAgICAgbGV0IHR4ID0gcnEucmVzdWx0LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgcGVybXMpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBhY3Rpb24odHgpO1xyXG5cclxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXHJcbiAgICAgICAgdHgub25jb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCByZXN1bHQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXHJcbiAgICAgICAgdHgub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KHR4LmVycm9yKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEluc2VydGEgdW4gcmVnaXN0cm8gZW4gZWwgbW9kZWxvXHJcbiAgICB0aGl6LmNyZWF0ZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluc3RhbmNlLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAnZnVuY3Rpb24nXSwgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgbGV0IGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XHJcblxyXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxyXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0eCkge1xyXG4gICAgICAgIGxldCBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkucHV0KGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxyXG4gICAgICAgIHJxLm9uc3VjY2VzcyAgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCwgaW5zdGFuY2UpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXHJcbiAgICAgICAgcnEub25lcnJvciAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAvLyBDb3VsZCBjYWxsIHJxLnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KHJxKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBCdXNjYXIgZW4gZWwgbW9kZWxvXHJcbiAgICB0aGl6LmZpbmQgPSBmdW5jdGlvbiAoTW9kZWwsIG1vZGVsTmFtZSwgc2NvcGUsIGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbicsICdzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgbGV0IGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XHJcbiAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuXHJcbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXHJcbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBsZXQgc3RvcmUgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpO1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gc3RvcmUub3BlbkN1cnNvcigpO1xyXG5cclxuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgbGV0IGN1cnNvciA9IHJlcXVlc3QucmVzdWx0O1xyXG5cclxuICAgICAgICAgIC8vIE5vIG1vcmUgbWF0Y2hpbmcgcmVjb3Jkcy5cclxuICAgICAgICAgIGlmICghY3Vyc29yKSByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIENhbGxlZCBmb3IgZWFjaCBtYXRjaGluZyByZWNvcmQuXHJcbiAgICAgICAgICByZXN1bHQucHVzaChNb2RlbC5nZXQoY3Vyc29yLnZhbHVlKSk7XHJcbiAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYXIgYWxpYXMgcGFyYSBsb3MgZXZlbnRvcyBlbmxhemFyIGNhbGxiYWNrcyBhIGxvcyBldmVudG9zXHJcbiAgICBsZXQgZGVmZXJlZHM7XHJcbiAgICBPYmplY3Qua2V5cyhkZWZlcmVkcyA9IHtcclxuICAgICAgb25PcGVuOiBvcGVuRGVmZXJlZCxcclxuICAgICAgb25VcGdyYWRlTmVlZGVkOiB1cGdyYWRlTmVlZGVkRGVmZXJlZCxcclxuICAgIH0pLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICBsZXQgdGV4dCA9IGRiTmFtZSsnLnYnKyhkYlZlcnNpb258fDEpKyc6ICcra2V5O1xyXG4gICAgICAgIGlmIChlcnIpe1xyXG4gICAgICAgICAgJGxvZy5lcnJvcih0ZXh0LCBlcnIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkbG9nLmxvZyh0ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGl6W2tleV0gPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XHJcbiAgICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoY2IpO1xyXG4gICAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gIH07XHJcblxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGI7XG5mdW5jdGlvbiBpZGIocXMsIGlkYk1vZGVsLCBpZGJVdGlscywgaWRiRXZlbnRzLCAkbG9nKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxuXG4gIHZhciBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XG4gIC8vIE5vIHVzZSBcImNvbnN0IGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cbiAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XG4gIHZhciBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XG4gIHZhciBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XG4gIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXG5cbiAgaWYgKCFpbmRleGVkREIpIHtcbiAgICBhbGVydChcIlN1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhc1wiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBDbGFzZSBwYXJhIGxhIGNyZWFjacOzbiBkZSBpbnN0YW5jaWFzIGRlIGxhIEJEXG4gIHJldHVybiBmdW5jdGlvbiBpZGIoZGJOYW1lLCBkYlZlcnNpb24pIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdudW1iZXInXSk7XG5cbiAgICAvLyBNYW5lamFkb3JlcyBkZSBldmVudG9zLlxuICAgIHZhciBldmVudHNDYWxsYmFja3MgPSB7fTtcbiAgICB2YXIgdXBncmFkZU5lZWRlZERlZmVyZWQgPSBxcy5kZWZlcigpO1xuICAgIHZhciBvcGVuRGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgdmFyIG9wZW5lZCA9IGZhbHNlO1xuXG4gICAgLy8gSW5zdGFuY2lhIGRlIGxhIGJhc2UgZGUgZGF0b3M7XG4gICAgdmFyIHJlcXVlc3QgPSBudWxsO1xuICAgIHRoaXoubW9kZWxzID0ge307XG5cbiAgICAvLyBBZ3JlZ2FyIHVuIG1hbmVqYWRvciBkZSBldmVudG9cbiAgICB0aGl6LmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgICAgaWYgKCFldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkge1xuICAgICAgICBldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICBldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5wdXNoKGNiKTtcbiAgICB9O1xuXG4gICAgLy9SZW11ZXZlIHVuIG1hbmVqYWRvciBkZSBldmVudG9cbiAgICB0aGl6LnVuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICBpZiAoIWV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSByZXR1cm47XG5cbiAgICAgIC8vIEJ1c2NhciBlbCBjYlxuICAgICAgdmFyIGlkeCA9IGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLmluZGV4T2YoY2IpO1xuXG4gICAgICAvLyBTaSBzZSBlbmNvbnRybyBlbCBjYiByZW1vdmVybG9cbiAgICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgICAgZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXG4gICAgdGhpei50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnXSk7XG5cbiAgICAgICRsb2cubG9nKGRiTmFtZSArICcudicgKyAoZGJWZXJzaW9uIHx8IDEpICsgJzogJyArIGV2ZW50TmFtZSk7XG5cbiAgICAgIGZvciAodmFyIGkgaW4gZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpeiwgYXJncyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIENhbGxiYWNrcyBwYXJhIGxvcyBlcnJvcmVzXG4gICAgdGhpei5lcnJvciA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgdGhpei5iaW5kKGlkYkV2ZW50cy5EQl9FUlJPUiwgY2IpO1xuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIC8vIEFicmlyIHVuYSBCYXNlIGRlIGRhdG9zLlxuICAgIHRoaXoub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChvcGVuZWQpIHJldHVybiBvcGVuRGVmZXJlZDtcblxuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gZGVmZXJcbiAgICAgIG9wZW5lZCA9IHRydWU7XG5cbiAgICAgIC8vIGRlamFtb3MgYWJpZXJ0YSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcbiAgICAgIGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShkYk5hbWUpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIgcnEgPSBpbmRleGVkREIub3BlbihkYk5hbWUsIGRiVmVyc2lvbik7XG5cbiAgICAgICAgcnEub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxuICAgICAgICAgIHVwZ3JhZGVOZWVkZWREZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZWwgcmVzdWx0YWRvXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLnJlc3VsdCFcbiAgICAgICAgICByZXF1ZXN0ID0gcnE7XG5cbiAgICAgICAgICAvLyBBc2luZ2FyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzIGEgbGEgQkRcbiAgICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAkbG9nLmVycm9yKCdEYXRhYmFzZSBlcnJvcjogJyArIGV2ZW50LnRhcmdldC5lcnJvckNvZGUpO1xuICAgICAgICAgICAgdGhpei50cmlnZ2VyKGlkYkV2ZW50cy5EQl9FUlJPUiwgW2V2ZW50XSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIG9wZW5EZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzXG4gICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLmVycm9yQ29kZSFcbiAgICAgICAgcnEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIG9wZW5EZWZlcmVkLnJlamVjdChycS5lcnJvckNvZGUpO1xuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIG9wZW5EZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBBZ3JlZ2EgdW4gbnVldm8gbW9kZWxvXG4gICAgdGhpei5tb2RlbCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJ10pO1xuXG4gICAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsb1xuICAgICAgdmFyIG1vZGVsID0gdGhpei5tb2RlbHNbbmFtZV07XG5cbiAgICAgIC8vIFNpIG5vIGV4aXN0ZSBlbCBtb2RlbG8gY3JlYXJcbiAgICAgIGlmICghbW9kZWwpIG1vZGVsID0gaWRiTW9kZWwodGhpeiwgbmFtZSk7XG5cbiAgICAgIC8vIEd1YXJkYXIgZWwgbW9kZWxvIGVuIGxvcyBtb2RlbG9zXG4gICAgICB0aGl6Lm1vZGVsc1tuYW1lXSA9IG1vZGVsO1xuXG4gICAgICAvLyBSZXRvcm5hciBlbCBtb2RlbG9cbiAgICAgIHJldHVybiBtb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXG4gICAgdGhpei5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIG1vZGVsSWQpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xuICAgICAgICBycS5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUobW9kZWxOYW1lLCBtb2RlbElkKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcbiAgICB0aGl6LmNyZWF0ZUluZGV4ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XG4gICAgICAgIHZhciBzdG9yZSA9IHJxLnRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XG4gICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIHVuYSB0cmFuc2FjY2nDs25cbiAgICB0aGl6LnRyYW5zYWN0aW9uID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgcGVybXMsIGFjdGlvbiwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKGNiKTtcblxuICAgICAgLy8gQ3VhbmRvIHNlIGFicmEgbGEgQkRcbiAgICAgIG9wZW5EZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJxKSB7XG4gICAgICAgIHZhciB0eCA9IHJxLnJlc3VsdC50cmFuc2FjdGlvbihtb2RlbE5hbWUsIHBlcm1zKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGFjdGlvbih0eCk7XG5cbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxuICAgICAgICB0eC5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCByZXN1bHQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXG4gICAgICAgIHR4Lm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QodHguZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBJbnNlcnRhIHVuIHJlZ2lzdHJvIGVuIGVsIG1vZGVsb1xuICAgIHRoaXouY3JlYXRlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgaW5zdGFuY2UsIGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAnZnVuY3Rpb24nXSwgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9IHFzLmRlZmVyKGNiKTtcblxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZHdyaXRlJywgZnVuY3Rpb24gKHR4KSB7XG4gICAgICAgIHZhciBycSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkucHV0KGluc3RhbmNlKTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCwgaW5zdGFuY2UpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXG4gICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QocnEpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cbiAgICB0aGl6LmZpbmQgPSBmdW5jdGlvbiAoTW9kZWwsIG1vZGVsTmFtZSwgc2NvcGUsIGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nLCAnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ10sICdmdW5jdGlvbiddKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXG4gICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWRvbmx5JywgZnVuY3Rpb24gKHR4KSB7XG4gICAgICAgIHZhciBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gc3RvcmUub3BlbkN1cnNvcigpO1xuXG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBjdXJzb3IgPSByZXF1ZXN0LnJlc3VsdDtcblxuICAgICAgICAgIC8vIE5vIG1vcmUgbWF0Y2hpbmcgcmVjb3Jkcy5cbiAgICAgICAgICBpZiAoIWN1cnNvcikgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZShyZXN1bHQpO1xuXG4gICAgICAgICAgLy8gQ2FsbGVkIGZvciBlYWNoIG1hdGNoaW5nIHJlY29yZC5cbiAgICAgICAgICByZXN1bHQucHVzaChNb2RlbC5nZXQoY3Vyc29yLnZhbHVlKSk7XG4gICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYXIgYWxpYXMgcGFyYSBsb3MgZXZlbnRvcyBlbmxhemFyIGNhbGxiYWNrcyBhIGxvcyBldmVudG9zXG4gICAgdmFyIGRlZmVyZWRzID0gdm9pZCAwO1xuICAgIE9iamVjdC5rZXlzKGRlZmVyZWRzID0ge1xuICAgICAgb25PcGVuOiBvcGVuRGVmZXJlZCxcbiAgICAgIG9uVXBncmFkZU5lZWRlZDogdXBncmFkZU5lZWRlZERlZmVyZWRcbiAgICB9KS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoZnVuY3Rpb24gKGVycikge1xuICAgICAgICB2YXIgdGV4dCA9IGRiTmFtZSArICcudicgKyAoZGJWZXJzaW9uIHx8IDEpICsgJzogJyArIGtleTtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICRsb2cuZXJyb3IodGV4dCwgZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkbG9nLmxvZyh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGl6W2tleV0gPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xuICAgICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShjYik7XG4gICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRiTW9kZWwgKHFzLCBpZGJVdGlscywgbGJSZXNvdXJjZSkgeyAnbmdJbmplY3QnO1xyXG5cclxuICByZXR1cm4gZnVuY3Rpb24gaWRiTW9kZWwoZGIsIG1vZGVsTmFtZSkgeyBsZXQgdGhpeiA9IHRoaXM7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtudWxsICwnc3RyaW5nJ10pO1xyXG5cclxuICAgIC8vIENsYXZlIGRlbCBtb2RlbG9cclxuICAgIGxldCBpZCA9IHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9O1xyXG4gICAgbGV0IGluc3RhbmNlcyA9IHt9O1xyXG4gICAgbGV0IHJlbW90ZSA9IG51bGxcclxuXHJcbiAgICAvLyBDb25zdHVjdG9yIGRlbCBtb2RlbG9cclxuICAgIGZ1bmN0aW9uIE1vZGVsKGRhdGEpIHtcclxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGVzKGRhdGEpO1xyXG4gICAgICB0aGlzLmNvbnN0cnVjdG9yKGRhdGEpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgZWwgSUQgYWwgbW9kZWxvXHJcbiAgICBNb2RlbC5pZCA9IGZ1bmN0aW9uIChwSWQpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcclxuICAgICAgaWQgPSBwSWQ7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RvIHN0b3JhZ2UgcGFyYSBlbCBtb2RlbG8uXHJcbiAgICBNb2RlbC5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZGIuY3JlYXRlU3RvcmUobW9kZWxOYW1lLCBpZCk7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQWdyZWdhIHVuIGluZGV4XHJcbiAgICBNb2RlbC5pbmRleCA9IGZ1bmN0aW9uIChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xyXG4gICAgICBkYi5jcmVhdGVJbmRleChtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBNw6l0b2RvIHF1ZSBwZXJtaXRlIG1vZGlmaWNhciBtb2RlbC5cclxuICAgIE1vZGVsLmJ1aWxkID0gZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xyXG4gICAgICBidWlsZENhbGxiYWNrKE1vZGVsKTtcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDb25maWd1cmEgZWwgcmVtb3RlIGFwaTtcclxuICAgIE1vZGVsLnJlbW90ZSA9IGZ1bmN0aW9uICh1cmwsIGFyZ3MsIGFjdGlvbnMpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnLCAnb2JqZWN0J10pO1xyXG4gICAgICBNb2RlbC5fcmVtb3RlID0gbGJSZXNvdXJjZSh1cmwsIGFyZ3MsIGFjdGlvbnMpO1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgbnVldmFzIGluc3RhbmNpYXMgZGUgbG9zIG1vZGVsb3NcclxuICAgIE1vZGVsLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgLy8gU2kgZXMgdW4gYXJyYXlcclxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgcmVjb3JkID0gTW9kZWwuZ2V0KGRhdGEpO1xyXG4gICAgICAgIHJldHVybiByZWNvcmQuY3JlYXRlKGNiKTtcclxuICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAvLyBPYnRlbmVyIHVuYSBjb3BpYSBkZWwgYXJyYXlcclxuICAgICAgbGV0IGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRhdGEpO1xyXG4gICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgIGxldCBkZWZlcmVkID0gcXMuZGVmZXIoY2IpO1xyXG5cclxuICAgICAgKGZ1bmN0aW9uIGl0ZXJhdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIE5vIHF1ZWRhbiBlbGVtZW50b3MgZW4gZWwgYXJyYXlcclxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PSAwKSByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcblxyXG4gICAgICAgIC8vIENyZWFyIGVsIHNpZ3VpZW50ZSBlbGVtZW50b1xyXG4gICAgICAgIE1vZGVsLmNyZWF0ZShhcnIuc2hpZnQoKSwgZnVuY3Rpb24gKGVyciwgaW5zdGFuY2UpIHtcclxuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkZWZlcmVkLnJlamVjdChlcnIpO1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xyXG4gICAgICAgICAgaXRlcmF0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KSgpO1xyXG5cclxuICAgICAgLy8gRGV2b2x2ZXIgZWwgcHJvbWlzZVxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEJ1c2NhciB1biBjYW1wb1xyXG4gICAgTW9kZWwuc2VhcmNoRGVlcEZpZWxkID0gZnVuY3Rpb24gKG9iaiwgZmllbGQsIGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgbGV0IGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XHJcbiAgICAgIGxldCBsYXN0RmllbGQgPSBmaWVsZHMucG9wKCk7XHJcblxyXG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIF9zZXQob2JqKSB7XHJcbiAgICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMClcclxuICAgICAgICAgIHJldHVybiBjYihvYmosIGxhc3RGaWVsZCk7XHJcbiAgICAgICAgbGV0IGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAndW5kZWZpbmVkJylcclxuICAgICAgICAgIG9ialtmaWVsZF0gPSB7fTtcclxuICAgICAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcclxuICAgICAgfSkob2JqKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgbW9kZWwgZGUgbGFzIGd1YXJkYWRhcy4gU2kgbm8gZXhpc3RlIGVudG9uY2VcclxuICAgIC8vIHNlIGNyZWFcclxuICAgIE1vZGVsLmdldCA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcclxuXHJcbiAgICAgIC8vIE9idGVuZXIgZWwga2V5IGRlbCBvYmpldG9cclxuICAgICAgbGV0IGtleSA9IE1vZGVsLnNlYXJjaERlZXBGaWVsZChvYmosIGlkLmtleVBhdGgsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcclxuICAgICAgaWYgKCFrZXkpIFxyXG4gICAgICAgIHJldHVybiBuZXcgTW9kZWwob2JqKTtcclxuXHJcbiAgICAgIC8vIE5vIGV4aXN0ZSBsYSBpbnN0YW5jaWEgZW50b25jZSBzZSBjcmVhXHJcbiAgICAgIGlmICghaW5zdGFuY2VzW2tleV0pXHJcbiAgICAgICAgaW5zdGFuY2VzW2tleV0gPSBuZXcgTW9kZWwob2JqKTtcclxuICAgICAgXHJcbiAgICAgIHJldHVybiBpbnN0YW5jZXNba2V5XTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xyXG4gICAgTW9kZWwuZmluZCA9IGZ1bmN0aW9uIChzY29wZSwgY2IpIHtcclxuICAgICAgbGV0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICBjYiA9IGFyZ3MucG9wKCk7IHNjb3BlID0gYXJncy5wb3AoKTtcclxuICAgICAgcmV0dXJuIGRiLmZpbmQoTW9kZWwsIG1vZGVsTmFtZSwgc2NvcGUsIGNiKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGxvcyBhdHJpYnV0b3NcclxuICAgIE1vZGVsLnByb3RvdHlwZS5zZXRBdHRyaWJ1dGVzID0gZnVuY3Rpb24gKGRhdGEpIHsgbGV0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xyXG4gICAgICBcclxuICAgICAgT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xyXG4gICAgICAgIHRoaXouc2V0KHByb3BlcnR5LCBkYXRhW3Byb3BlcnR5XSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxyXG4gICAgTW9kZWwucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChmaWVsZCkgeyBsZXQgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHJldHVybiBNb2RlbC5zZWFyY2hEZWVwRmllbGQodGhpeiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBpbiB2YWxvciBhIHVuIGNhbXBvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkgeyBsZXQgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHJldHVybiBNb2RlbC5zZWFyY2hEZWVwRmllbGQodGhpeiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgICAgIG9ialtsYXN0RmllbGRdID0gdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDb25zdHVyY3RvciBxdWUgc2UgcHVlZGUgc29icmUgZXNjcmliaXJcclxuICAgIE1vZGVsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEd1YXJkYSBsb3MgZGF0b3MgZGVsIG9iamV0b1xyXG4gICAgTW9kZWwucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChjYil7IGxldCB0aGl6ID0gdGhpcztcclxuICAgICAgcmV0dXJuIGRiLmNyZWF0ZShtb2RlbE5hbWUsIHRoaXMsIGZ1bmN0aW9uIChlcnIsIGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGVycikgeyBpZiAoY2IpIGNiKGVycik7IHJldHVybjsgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBnZW5lcmFkbyBhbCBtb2RlbG9cclxuICAgICAgICB0aGl6LnNldChpZC5rZXlQYXRoLCBldmVudC50YXJnZXQucmVzdWx0KVxyXG5cclxuICAgICAgICAvLyBHdWFyZGFyIGxhIGluc3RhbmNpYSBlbiBsYSBjb2xlY2lvbiBkZSBpbnN0YW5jaWFzXHJcbiAgICAgICAgaW5zdGFuY2VzW3RoaXouZ2V0KGlkLmtleVBhdGgpXSA9IHRoaXo7XHJcblxyXG4gICAgICAgIGlmIChjYikgY2IuYXBwbHkobnVsbCwgW251bGxdLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XHJcblxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICB9O1xyXG5cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpZGJNb2RlbDtcbmZ1bmN0aW9uIGlkYk1vZGVsKHFzLCBpZGJVdGlscywgbGJSZXNvdXJjZSkge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBmdW5jdGlvbiBpZGJNb2RlbChkYiwgbW9kZWxOYW1lKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW251bGwsICdzdHJpbmcnXSk7XG5cbiAgICAvLyBDbGF2ZSBkZWwgbW9kZWxvXG4gICAgdmFyIGlkID0geyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OiB0cnVlIH07XG4gICAgdmFyIGluc3RhbmNlcyA9IHt9O1xuICAgIHZhciByZW1vdGUgPSBudWxsO1xuXG4gICAgLy8gQ29uc3R1Y3RvciBkZWwgbW9kZWxvXG4gICAgZnVuY3Rpb24gTW9kZWwoZGF0YSkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGVzKGRhdGEpO1xuICAgICAgdGhpcy5jb25zdHJ1Y3RvcihkYXRhKTtcbiAgICB9O1xuXG4gICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xuICAgIE1vZGVsLmlkID0gZnVuY3Rpb24gKHBJZCkge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcbiAgICAgIGlkID0gcElkO1xuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIGVsIG9iamVjdG8gc3RvcmFnZSBwYXJhIGVsIG1vZGVsby5cbiAgICBNb2RlbC5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGRiLmNyZWF0ZVN0b3JlKG1vZGVsTmFtZSwgaWQpO1xuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBBZ3JlZ2EgdW4gaW5kZXhcbiAgICBNb2RlbC5pbmRleCA9IGZ1bmN0aW9uIChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xuICAgICAgZGIuY3JlYXRlSW5kZXgobW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XG4gICAgICByZXR1cm4gTW9kZWw7XG4gICAgfTtcblxuICAgIC8vIE3DqXRvZG8gcXVlIHBlcm1pdGUgbW9kaWZpY2FyIG1vZGVsLlxuICAgIE1vZGVsLmJ1aWxkID0gZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcbiAgICAgIGJ1aWxkQ2FsbGJhY2soTW9kZWwpO1xuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBDb25maWd1cmEgZWwgcmVtb3RlIGFwaTtcbiAgICBNb2RlbC5yZW1vdGUgPSBmdW5jdGlvbiAodXJsLCBhcmdzLCBhY3Rpb25zKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCcsICdvYmplY3QnXSk7XG4gICAgICBNb2RlbC5fcmVtb3RlID0gbGJSZXNvdXJjZSh1cmwsIGFyZ3MsIGFjdGlvbnMpO1xuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIG51ZXZhcyBpbnN0YW5jaWFzIGRlIGxvcyBtb2RlbG9zXG4gICAgTW9kZWwuY3JlYXRlID0gZnVuY3Rpb24gKGRhdGEsIGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAvLyBTaSBlcyB1biBhcnJheVxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHJlY29yZCA9IE1vZGVsLmdldChkYXRhKTtcbiAgICAgICAgcmV0dXJuIHJlY29yZC5jcmVhdGUoY2IpO1xuICAgICAgfVxuXG4gICAgICAvLyBPYnRlbmVyIHVuYSBjb3BpYSBkZWwgYXJyYXlcbiAgICAgIHZhciBhcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhKTtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoY2IpO1xuXG4gICAgICAoZnVuY3Rpb24gaXRlcmF0aW9uKCkge1xuXG4gICAgICAgIC8vIE5vIHF1ZWRhbiBlbGVtZW50b3MgZW4gZWwgYXJyYXlcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT0gMCkgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZShyZXN1bHQpO1xuXG4gICAgICAgIC8vIENyZWFyIGVsIHNpZ3VpZW50ZSBlbGVtZW50b1xuICAgICAgICBNb2RlbC5jcmVhdGUoYXJyLnNoaWZ0KCksIGZ1bmN0aW9uIChlcnIsIGluc3RhbmNlKSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRlZmVyZWQucmVqZWN0KGVycik7XG4gICAgICAgICAgcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xuICAgICAgICAgIGl0ZXJhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICAgIH0pKCk7XG5cbiAgICAgIC8vIERldm9sdmVyIGVsIHByb21pc2VcbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBCdXNjYXIgdW4gY2FtcG9cbiAgICBNb2RlbC5zZWFyY2hEZWVwRmllbGQgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgY2IpIHtcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB2YXIgZmllbGRzID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICAgIHZhciBsYXN0RmllbGQgPSBmaWVsZHMucG9wKCk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiBfc2V0KG9iaikge1xuICAgICAgICBpZiAoZmllbGRzLmxlbmd0aCA9PSAwKSByZXR1cm4gY2Iob2JqLCBsYXN0RmllbGQpO1xuICAgICAgICB2YXIgZmllbGQgPSBmaWVsZHMuc2hpZnQoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAndW5kZWZpbmVkJykgb2JqW2ZpZWxkXSA9IHt9O1xuICAgICAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcbiAgICAgIH0ob2JqKTtcbiAgICB9O1xuXG4gICAgLy8gRGV2dWVsdmUgbGEgaW5zdGFuY2lhIGRlbCBtb2RlbCBkZSBsYXMgZ3VhcmRhZGFzLiBTaSBubyBleGlzdGUgZW50b25jZVxuICAgIC8vIHNlIGNyZWFcbiAgICBNb2RlbC5nZXQgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xuXG4gICAgICAvLyBPYnRlbmVyIGVsIGtleSBkZWwgb2JqZXRvXG4gICAgICB2YXIga2V5ID0gTW9kZWwuc2VhcmNoRGVlcEZpZWxkKG9iaiwgaWQua2V5UGF0aCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcbiAgICAgIGlmICgha2V5KSByZXR1cm4gbmV3IE1vZGVsKG9iaik7XG5cbiAgICAgIC8vIE5vIGV4aXN0ZSBsYSBpbnN0YW5jaWEgZW50b25jZSBzZSBjcmVhXG4gICAgICBpZiAoIWluc3RhbmNlc1trZXldKSBpbnN0YW5jZXNba2V5XSA9IG5ldyBNb2RlbChvYmopO1xuXG4gICAgICByZXR1cm4gaW5zdGFuY2VzW2tleV07XG4gICAgfTtcblxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cbiAgICBNb2RlbC5maW5kID0gZnVuY3Rpb24gKHNjb3BlLCBjYikge1xuICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgY2IgPSBhcmdzLnBvcCgpO3Njb3BlID0gYXJncy5wb3AoKTtcbiAgICAgIHJldHVybiBkYi5maW5kKE1vZGVsLCBtb2RlbE5hbWUsIHNjb3BlLCBjYik7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBsb3MgYXRyaWJ1dG9zXG4gICAgTW9kZWwucHJvdG90eXBlLnNldEF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcblxuICAgICAgT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICB0aGl6LnNldChwcm9wZXJ0eSwgZGF0YVtwcm9wZXJ0eV0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcbiAgICBNb2RlbC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICByZXR1cm4gTW9kZWwuc2VhcmNoRGVlcEZpZWxkKHRoaXosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBpbiB2YWxvciBhIHVuIGNhbXBvXG4gICAgTW9kZWwucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChmaWVsZCwgdmFsdWUpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHJldHVybiBNb2RlbC5zZWFyY2hEZWVwRmllbGQodGhpeiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBDb25zdHVyY3RvciBxdWUgc2UgcHVlZGUgc29icmUgZXNjcmliaXJcbiAgICBNb2RlbC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZGF0YSkge307XG5cbiAgICAvLyBHdWFyZGEgbG9zIGRhdG9zIGRlbCBvYmpldG9cbiAgICBNb2RlbC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICByZXR1cm4gZGIuY3JlYXRlKG1vZGVsTmFtZSwgdGhpcywgZnVuY3Rpb24gKGVyciwgZXZlbnQpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGlmIChjYikgY2IoZXJyKTtyZXR1cm47XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQXNpZ25hciBlbCBnZW5lcmFkbyBhbCBtb2RlbG9cbiAgICAgICAgdGhpei5zZXQoaWQua2V5UGF0aCwgZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG5cbiAgICAgICAgLy8gR3VhcmRhciBsYSBpbnN0YW5jaWEgZW4gbGEgY29sZWNpb24gZGUgaW5zdGFuY2lhc1xuICAgICAgICBpbnN0YW5jZXNbdGhpei5nZXQoaWQua2V5UGF0aCldID0gdGhpejtcblxuICAgICAgICBpZiAoY2IpIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiBNb2RlbDtcbiAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxiIChtb2R1bGUpIHtcclxuXHJcbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcclxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xyXG4gICAgbGV0IG0gPSB1cmwubWF0Y2goL14oPzpodHRwcz86KT9cXC9cXC8oW15cXC9dKykvKTtcclxuICAgIHJldHVybiBtID8gbVsxXSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBsZXQgdXJsQmFzZUhvc3QgPSBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICBsZXQgbGJBdXRoID0gZnVuY3Rpb24oKSB7ICduZ0luamVjdCdcclxuICAgIGNvbnN0IHByb3BzID0gWydhY2Nlc3NUb2tlbklkJywgJ2N1cnJlbnRVc2VySWQnLCAncmVtZW1iZXJNZSddO1xyXG4gICAgY29uc3QgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xyXG4gICAgXHJcbiAgICAvLyBOb3RlOiBMb2NhbFN0b3JhZ2UgY29udmVydHMgdGhlIHZhbHVlIHRvIHN0cmluZ1xyXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxyXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAnJztcclxuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcclxuICAgICAgY29uc3Qga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xyXG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHsgbGV0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpeltuYW1lXSA9IGxvYWQobmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7IGxldCB0aGl6ID0gdGhpcztcclxuICAgICAgbGV0IHN0b3JhZ2UgPSB0aGl6LnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgc2F2ZShzdG9yYWdlLCBuYW1lLCB0aGl6W25hbWVdKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2V0VXNlciA9IGZ1bmN0aW9uKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpIHsgbGV0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24oKSB7IGxldCB0aGl6ID0gdGhpcztcclxuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gbnVsbDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlcklkID0gbnVsbDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyU3RvcmFnZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICBzYXZlKHNlc3Npb25TdG9yYWdlLCBuYW1lLCBudWxsKTtcclxuICAgICAgICBzYXZlKGxvY2FsU3RvcmFnZSwgbmFtZSwgbnVsbCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbmV3IGxiQXV0aCgpO1xyXG5cclxuICB9O1xyXG5cclxuICBsZXQgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24oJHEsIGxiQXV0aCkgeyAnbmdJbmplY3QnO1xyXG4gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbihjb25maWcpIHtcclxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV4dGVybmFsIHJlcXVlc3RzXHJcbiAgICAgICAgY29uc3QgaG9zdCA9IGdldEhvc3QoY29uZmlnLnVybCk7XHJcbiAgICAgICAgaWYgKGhvc3QgJiYgaG9zdCAhPT0gdXJsQmFzZUhvc3QpIHtcclxuICAgICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGJBdXRoLmFjY2Vzc1Rva2VuSWQpIHtcclxuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzW2F1dGhIZWFkZXJdID0gbGJBdXRoLmFjY2Vzc1Rva2VuSWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuX19pc0dldEN1cnJlbnRVc2VyX18pIHtcclxuICAgICAgICAgIC8vIFJldHVybiBhIHN0dWIgNDAxIGVycm9yIGZvciBVc2VyLmdldEN1cnJlbnQoKSB3aGVuXHJcbiAgICAgICAgICAvLyB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpblxyXG4gICAgICAgICAgbGV0IHJlcyA9IHtcclxuICAgICAgICAgICAgYm9keTogeyBlcnJvcjogeyBzdGF0dXM6IDQwMSB9fSxcclxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXHJcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbigpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgfTtcclxuXHJcbiAgbGV0IGxiUmVzb3VyY2UgPSBmdW5jdGlvbigpIHsgJ25nSW5qZWN0JzsgbGV0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcclxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nLFxyXG4gICAgfTtcclxuXHJcbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyIFRoZSBoZWFkZXIgbmFtZSB0byB1c2UsIGUuZy4gYFgtQWNjZXNzLVRva2VuYFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25maWd1cmUgdGhlIFJFU1QgdHJhbnNwb3J0IHRvIHVzZSBhIGRpZmZlcmVudCBoZWFkZXIgZm9yIHNlbmRpbmdcclxuICAgICAqIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi4gSXQgaXMgc2VudCBpbiB0aGUgYEF1dGhvcml6YXRpb25gIGhlYWRlclxyXG4gICAgICogYnkgZGVmYXVsdC5cclxuICAgICAqL1xyXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oaGVhZGVyKSB7XHJcbiAgICAgIG9wdGlvbnMuYXV0aEhlYWRlciA9IGhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBoZWFkZXIgbmFtZSB0aGF0IGlzIHVzZWQgZm9yIHNlbmRpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB1c2UsIGUuZy4gYC9hcGlgIG9yIGAvL2V4YW1wbGUuY29tL2FwaWAuXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENoYW5nZSB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIEJ5IGRlZmF1bHQsIHRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgb3B0aW9ucy51cmxCYXNlID0gdXJsO1xyXG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xyXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uKCRyZXNvdXJjZSkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgbGV0IGxiUmVzb3VyY2UgPSBmdW5jdGlvbih1cmwsIHBhcmFtcywgYWN0aW9ucykge1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhhY3Rpb25zKS5tYXAoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgYWN0aW9uc1trZXldLm9yaWdpbmFsVXJsID0gYWN0aW9uc1trZXldLnVybDtcclxuICAgICAgICAgIGFjdGlvbnNba2V5XS51cmwgPSBvcHRpb25zLnVybEJhc2UgKyBhY3Rpb25zW2tleV0udXJsO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgcmVzb3VyY2UgPSAkcmVzb3VyY2Uob3B0aW9ucy51cmxCYXNlICsgdXJsLCBwYXJhbXMsIGFjdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBBbmd1bGFyIGFsd2F5cyBjYWxscyBQT1NUIG9uICRzYXZlKClcclxuICAgICAgICAvLyBUaGlzIGhhY2sgaXMgYmFzZWQgb25cclxuICAgICAgICAvLyBodHRwOi8va2lya2J1c2hlbGwubWUvYW5ndWxhci1qcy11c2luZy1uZy1yZXNvdXJjZS1pbi1hLW1vcmUtcmVzdGZ1bC1tYW5uZXIvXHJcbiAgICAgICAgcmVzb3VyY2UucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24oc3VjY2VzcywgZXJyb3IpIHtcclxuICAgICAgICAgIC8vIEZvcnR1bmF0ZWx5LCBMb29wQmFjayBwcm92aWRlcyBhIGNvbnZlbmllbnQgYHVwc2VydGAgbWV0aG9kXHJcbiAgICAgICAgICAvLyB0aGF0IGV4YWN0bHkgZml0cyBvdXIgbmVlZHMuXHJcbiAgICAgICAgICBsZXQgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcclxuICAgICAgICAgIHJldHVybiByZXN1bHQuJHByb21pc2UgfHwgcmVzdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XHJcbiAgICAgIH07XHJcbiAgICBcclxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kdWxlXHJcbiAgICAuZmFjdG9yeSgnbGJBdXRoJywgbGJBdXRoKVxyXG4gICAgLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSlcclxuICAgIC5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpXHJcbiAgICAuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uKCRodHRwUHJvdmlkZXIpIHsgJ25nSW5qZWN0JztcclxuICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XHJcbiAgICB9XSlcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9sYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGxiO1xuZnVuY3Rpb24gbGIobW9kdWxlKSB7XG5cbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcbiAgZnVuY3Rpb24gZ2V0SG9zdCh1cmwpIHtcbiAgICB2YXIgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xuICAgIHJldHVybiBtID8gbVsxXSA6IG51bGw7XG4gIH1cblxuICB2YXIgdXJsQmFzZUhvc3QgPSBsb2NhdGlvbi5ob3N0O1xuXG4gIHZhciBsYkF1dGggPSBmdW5jdGlvbiBsYkF1dGgoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcbiAgICB2YXIgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xuXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcbiAgICAvLyBXZSBhcmUgdXNpbmcgZW1wdHkgc3RyaW5nIGFzIGEgbWFya2VyIGZvciBudWxsL3VuZGVmaW5lZCB2YWx1ZXMuXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XG4gICAgICAgIHN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWQobmFtZSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Vba2V5XSB8fCBzZXNzaW9uU3RvcmFnZVtrZXldIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXpbbmFtZV0gPSBsb2FkKG5hbWUpO1xuICAgICAgfSk7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdmFyIHN0b3JhZ2UgPSB0aGl6LnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzdG9yYWdlLCBuYW1lLCB0aGl6W25hbWVdKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgdXNlcklkLCB1c2VyRGF0YSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IHVzZXJJZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gbnVsbDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBzYXZlKHNlc3Npb25TdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgICAgc2F2ZShsb2NhbFN0b3JhZ2UsIG5hbWUsIG51bGwpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XG4gIH07XG5cbiAgdmFyIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcigkcSwgbGJBdXRoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHJldHVybiB7XG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV4dGVybmFsIHJlcXVlc3RzXG4gICAgICAgIHZhciBob3N0ID0gZ2V0SG9zdChjb25maWcudXJsKTtcbiAgICAgICAgaWYgKGhvc3QgJiYgaG9zdCAhPT0gdXJsQmFzZUhvc3QpIHtcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XG4gICAgICAgICAgY29uZmlnLmhlYWRlcnNbYXV0aEhlYWRlcl0gPSBsYkF1dGguYWNjZXNzVG9rZW5JZDtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuX19pc0dldEN1cnJlbnRVc2VyX18pIHtcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxuICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIHVzZXIgbG9nZ2VkIGluXG4gICAgICAgICAgdmFyIHJlcyA9IHtcbiAgICAgICAgICAgIGJvZHk6IHsgZXJyb3I6IHsgc3RhdHVzOiA0MDEgfSB9LFxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXG4gICAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGZ1bmN0aW9uIGhlYWRlcnMoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICB2YXIgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uIGxiUmVzb3VyY2UoKSB7XG4gICAgJ25nSW5qZWN0JztcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHVybEJhc2U6IFwiL2FwaVwiLFxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nXG4gICAgfTtcblxuICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlciBUaGUgaGVhZGVyIG5hbWUgdG8gdXNlLCBlLmcuIGBYLUFjY2Vzcy1Ub2tlbmBcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ29uZmlndXJlIHRoZSBSRVNUIHRyYW5zcG9ydCB0byB1c2UgYSBkaWZmZXJlbnQgaGVhZGVyIGZvciBzZW5kaW5nXHJcbiAgICAgKiB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uIEl0IGlzIHNlbnQgaW4gdGhlIGBBdXRob3JpemF0aW9uYCBoZWFkZXJcclxuICAgICAqIGJ5IGRlZmF1bHQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoaGVhZGVyKSB7XG4gICAgICBvcHRpb25zLmF1dGhIZWFkZXIgPSBoZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgaGVhZGVyIG5hbWUgdGhhdCBpcyB1c2VkIGZvciBzZW5kaW5nIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdXNlLCBlLmcuIGAvYXBpYCBvciBgLy9leGFtcGxlLmNvbS9hcGlgLlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDaGFuZ2UgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBCeSBkZWZhdWx0LCB0aGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouc2V0VXJsQmFzZSA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgIG9wdGlvbnMudXJsQmFzZSA9IHVybDtcbiAgICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIFRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICB9O1xuXG4gICAgdGhpei4kZ2V0ID0gZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xuICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoYWN0aW9ucykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICAgIGFjdGlvbnNba2V5XS51cmwgPSBvcHRpb25zLnVybEJhc2UgKyBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSAkcmVzb3VyY2Uob3B0aW9ucy51cmxCYXNlICsgdXJsLCBwYXJhbXMsIGFjdGlvbnMpO1xuXG4gICAgICAgIC8vIEFuZ3VsYXIgYWx3YXlzIGNhbGxzIFBPU1Qgb24gJHNhdmUoKVxuICAgICAgICAvLyBUaGlzIGhhY2sgaXMgYmFzZWQgb25cbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xuICAgICAgICByZXNvdXJjZS5wcm90b3R5cGUuJHNhdmUgPSBmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxuICAgICAgICAgIC8vIHRoYXQgZXhhY3RseSBmaXRzIG91ciBuZWVkcy5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LiRwcm9taXNlIHx8IHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gbW9kdWxlLmZhY3RvcnkoJ2xiQXV0aCcsIGxiQXV0aCkucHJvdmlkZXIoJ2xiUmVzb3VyY2UnLCBsYlJlc291cmNlKS5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpLmNvbmZpZyhbJyRodHRwUHJvdmlkZXInLCBmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InKTtcbiAgfV0pO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2xiLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==