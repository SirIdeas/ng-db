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
	
	// import idbUtils from './utils/idbUtils';
	// import idbEvents from './utils/idbEvents';
	// import qs from './utils/qs';
	
	// import idbSocket from './services/idbSocket';
	// import idb from './services/idb';
	// import idbModel from './services/idbModel';
	// import idbQuery from './services/idbQuery';
	
	// import lb from './services/lb';
	
	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Globales
	
	var _Clazzer = __webpack_require__(2);
	
	var _Clazzer2 = _interopRequireDefault(_Clazzer);
	
	var _idbRequest = __webpack_require__(3);
	
	var _idbRequest2 = _interopRequireDefault(_idbRequest);
	
	var _idbOpenDBRequest = __webpack_require__(4);
	
	var _idbOpenDBRequest2 = _interopRequireDefault(_idbOpenDBRequest);
	
	var _idbConsultant = __webpack_require__(14);
	
	var _idbConsultant2 = _interopRequireDefault(_idbConsultant);
	
	var _idb = __webpack_require__(5);
	
	var _idb2 = _interopRequireDefault(_idb);
	
	var _idbStore = __webpack_require__(6);
	
	var _idbStore2 = _interopRequireDefault(_idbStore);
	
	var _idbIndex = __webpack_require__(7);
	
	var _idbIndex2 = _interopRequireDefault(_idbIndex);
	
	var _idbEventTarget = __webpack_require__(8);
	
	var _idbEventTarget2 = _interopRequireDefault(_idbEventTarget);
	
	var _idbModel = __webpack_require__(9);
	
	var _idbModel2 = _interopRequireDefault(_idbModel);
	
	var _idbTransaction = __webpack_require__(10);
	
	var _idbTransaction2 = _interopRequireDefault(_idbTransaction);
	
	var _idbQuery = __webpack_require__(11);
	
	var _idbQuery2 = _interopRequireDefault(_idbQuery);
	
	var _idbSocket = __webpack_require__(12);
	
	var _idbSocket2 = _interopRequireDefault(_idbSocket);
	
	var _lb = __webpack_require__(13);
	
	var _lb2 = _interopRequireDefault(_lb);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Request
	(0, _lb2.default)(angular.module('ng.idb', [])).constant('io', io).service('Clazzer', _Clazzer2.default).constant('idbVersion', '0.0.1').service('idbRequest', _idbRequest2.default).service('idbOpenDBRequest', _idbOpenDBRequest2.default).service('idbConsultant', _idbConsultant2.default).service('idb', _idb2.default).service('idbStore', _idbStore2.default).service('idbIndex', _idbIndex2.default).service('idbEventTarget', _idbEventTarget2.default).service('idbModel', _idbModel2.default).service('idbSocket', _idbSocket2.default).service('idbQuery', _idbQuery2.default).service('idbTransaction', _idbTransaction2.default).service('socket', ["idbSocket", "API_ROOT", function (idbSocket, API_ROOT) {
	  'ngInject';
	
	  return new idbSocket('http://localhost:3200/', localStorage['$LoopBack$accessTokenId'], localStorage['$LoopBack$currentUserId']);
	}]).service('db', ["idb", "socket", function (idb, socket) {
	  'ngInject';
	
	  var db = new idb('aaa', 4, socket);
	
	  db.$bind('opened', function () {
	    console.log(['$opened']);
	  }).$aborted(function () {
	    console.log(['$aborted']);
	  }).$closed(function () {
	    console.log(['$closed']);
	  }).$error(function () {
	    console.log(['$error']);
	  }).$versionChanged(function () {
	    console.log(['$versionChanged']);
	  }).$automigration({
	    1: function _(db) {
	      db.$model('Trabajador').$create();
	    },
	    2: function _(db) {
	      db.$model('Empleado').$addIndex(['nombres', 'apellidos']).$addIndex('nacimiento').$create(function (model, store) {
	
	        store.$createIndex('ci');
	        store.$createIndex('cod');
	      });
	    },
	    3: function _(db) {
	      db.$model('Trabajador').$drop();
	    }
	  }).$drop().then(function (db) {
	    db.$open();
	  });
	
	  return db;
	}]).service('Empleado', ["db", function (db) {
	  'ngInject';
	
	  return window.Empleado = db.$model('Empleado').$field('cod', { "type": "string", "required": true }).$field('ci', { "type": "string", "required": true }).$field('nombres', { "type": "string", "required": true }).$field('apellidos', { "type": "string", "required": true }).$field('nacimiento', { "type": "date" }).$field('ingreso', { "type": "date" }).$field('direccion', { "type": "string" }).$remote('/trabajadores/:id', { 'id': '@id' }, {
	    'find': { url: '/trabajadores/_findWithVersion', method: 'GET', isArray: true }
	  })
	  // .versioning()
	  .$build(function (Empleado) {
	
	    Empleado.prototype.$constructor = function (data) {};
	
	    Empleado.prototype.getNombre = function () {
	      return this.nombres + ' ' + this.apellidos;
	    };
	  });
	}]).run(["db", "Empleado", function (db, Empleado) {
	  'ngInject';
	
	  Empleado.$put({
	    id: 1,
	    'nombres': 'Alexander'
	  }).then(function (record) {
	    //
	    console.log(['put', record.nombres]);
	  }).then(function () {
	    return Empleado.$put({
	      id: 2,
	      'nombres': 'Guillemo'
	    }).then(function (record) {
	      console.log(['put', record.nombres]);
	    });
	  }).then(function () {
	    return Empleado.$put({
	      id: 2,
	      'apellidos': 'Seminario'
	    }).then(function (record) {
	      console.log(['put', record.nombres]);
	    });
	  }).then(function () {
	    return Empleado.$put({
	      id: 4,
	      'nombres': 'Axel'
	    }).then(function (record) {
	      console.log(['put', record.nombres]);
	    });
	  }).then(function () {
	    return Empleado.$put({
	      'nombres': 'Gabriel'
	    }).then(function (record) {
	      console.log(['put', record.nombres]);
	    });
	  }).then(function () {
	    return Empleado.$add({
	      'nombres': 'Evert'
	    }).then(function (record) {
	      console.log(['put', record.nombres]);
	    });
	  }).then(function () {
	    var r = Empleado.$get(2);
	    console.log(['get', r]);
	    return r.$promise;
	  }).then(function () {
	    var r = Empleado.$find().$getResult();
	    console.log(['find', r]);
	    return r.$promise;
	  }).then(function () {
	    var r = Empleado.$getAll();
	    console.log(['getAll', r]);
	    return r.$promise;
	  }).then(function () {
	    return Empleado.$count().then(function (count) {
	      console.log(['count', count]);
	    });
	  }).then(function () {
	    var r = Empleado.$getAllKeys();
	    console.log(['getAllKeys', r]);
	    return r.$promise;
	  }).then(function () {
	    return Empleado.$delete(2).then(function () {
	      console.log(['delete']);
	    });
	  }).then(function () {
	    return Empleado.$count().then(function (count) {
	      console.log(['count', count]);
	    });
	  }).then(function () {
	    return Empleado.$clear().then(function () {
	      console.log(['clear']);
	    });
	  }).then(function () {
	    return Empleado.$count().then(function (count) {
	      console.log(['count', count]);
	    });
	  }).then(function () {
	    db.$close();
	  }).then(function () {
	    db.$open().then(function () {
	      db.$close();
	    });
	  });
	}]);
	
	// Principales

/***/ },
/* 2 */
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
/* 3 */
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
/* 4 */
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
/* 5 */
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
	
	exports.default = ["Clazzer", "idbEventTarget", "idbStore", "idbModel", "idbOpenDBRequest", "idbTransaction", "$log", function (Clazzer, idbEventTarget, idbStore, idbModel, idbOpenDBRequest, idbTransaction, $log) {
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
	  // $_me
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
	  .property('$_upgradeneededs', { value: [] }).property('$_models', { value: {} }).property('$me', {
	    get: function get() {
	      return this.$_me;
	    },
	    set: function set(me) {
	      this.$_me = me;
	      var e = new Event('opened');
	      // e.target = this;
	      this.$emit(e);
	    }
	  })
	
	  // ---------------------------------------------------------------------------
	  // Getters
	  .getter('$objectStoreNames', 'objectStoreNames')
	
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
	  // Event handlers
	  .method('$aborted', function (cb) {
	    var thiz = this;
	    return thiz.$bind('opened', function () {
	      thiz.$me.onabort = cb;
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$closed', function (cb) {
	    var thiz = this;
	    return thiz.$bind('opened', function () {
	      thiz.$me.onclose = cb;
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$error', function (cb) {
	    var thiz = this;
	    return thiz.$bind('opened', function () {
	      thiz.$me.onerror = cb;
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$versionChanged', function (cb) {
	    var thiz = this;
	    return thiz.$bind('opened', function () {
	      thiz.$me.onversionchange = cb;
	    });
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
	        $log.log('upgradeneeded idb: ' + thiz.$name + ' v' + thiz.$version);
	        thiz.$me = event.target.result;
	        thiz.$_upgradeneededs.map(function (cb) {
	          cb.apply(thiz, [thiz, lastRq, event]);
	        });
	      })).$promise.then(function (event) {
	        $log.log('opened idb: ' + thiz.$name + ' v' + thiz.$version);
	        if (thiz.$me !== event.target.result) {
	          thiz.$me = event.target.result;
	        }
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
	
	    this.$opened = null;
	    this.$me.close();
	
	    return this;
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$createStore', function (name, options) {
	
	    return new idbStore(this.$me.createObjectStore(name, options));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$dropStore', function (name) {
	
	    this.$me.deleteObjectStore(name);
	
	    return this;
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$model', function (name, socket) {
	
	    // Si existe el modelo retornarlo
	    if (this.$_models[name]) return this.$_models[name];
	
	    // Instanciar el modelo y guardarlo
	    return this.$_models[name] = idbModel(this, name, socket || this.$socket);
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
/* 6 */
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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = ["Clazzer", "idbRequest", "idbIndex", "idbConsultant", "$log", function (Clazzer, idbRequest, idbIndex, idbConsultant, $log) {
	  'ngInject';
	
	  return new
	  // ---------------------------------------------------------------------------
	  // Constructor
	  Clazzer(function idbStore(me) {
	
	    new Clazzer(this).static('$me', me);
	  })
	
	  // ---------------------------------------------------------------------------
	  // Herencia
	  .inherit(idbConsultant)
	
	  // ---------------------------------------------------------------------------
	  // Getters
	  .getter('$keyPath', 'keyPath').getter('$indexNames', 'indexNames').getter('$transaction', 'transaction').getter('$autoIncrement', 'autoIncrement')
	
	  // ---------------------------------------------------------------------------
	  .method('$put', function (value, key) {
	
	    return new idbRequest(this.$me.put(value, key)).$promise.then(function (event) {
	      return event.target.result;
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$add', function (value, key) {
	
	    return new idbRequest(this.$me.add(value, key)).$promise.then(function (event) {
	      return event.target.result;
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$delete', function (query) {
	
	    return new idbRequest(this.$me.delete(query)).$promise.then(function (event) {});
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$clear', function () {
	
	    return new idbRequest(this.$me.clear()).$promise.then(function (event) {});
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$index', function (name) {
	
	    return new idbIndex(this.$me.index(name));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$createIndex', function (fields, name, options) {
	    if (typeof fields == 'string') {
	      fields = [fields];
	    }
	    if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object') {
	      options = name;
	      name = null;
	    }
	    if (!name) {
	      name = fields.sort().join('_');
	    }
	
	    return new idbIndex(this.$me.createIndex(name, fields, options));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$deleteIndex', function (indexName) {
	    if (Array.angular.isArray(indexName)) {
	      indexName = indexName.sort().join('_');
	    }
	    this.$me.deleteIndex(indexName);
	  })
	
	  // ---------------------------------------------------------------------------
	  .clazz;
	}];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * idbIndex
	 * -----------------------------------------------------------------------------
	 * [Exposed=(Window,Worker)]
	 * interface IDBIndex {
	 *            attribute DOMString      name;
	 *   readonly attribute IDBObjectStore objectStore;
	 *   readonly attribute any            keyPath;
	 *   readonly attribute boolean        multiEntry;
	 *   readonly attribute boolean        unique;
	 * 
	 *   IDBRequest get(any query);
	 *   IDBRequest getKey(any query);
	 *   IDBRequest getAll(optional any query, [EnforceRange] optional unsigned long count);
	 *   IDBRequest getAllKeys(optional any query, [EnforceRange] optional unsigned long count);
	 *   IDBRequest count(optional any query);
	 *   IDBRequest openCursor(optional any query, optional IDBCursorDirection direction = "next");
	 *   IDBRequest openKeyCursor(optional any query, optional IDBCursorDirection direction = "next");
	 * };
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = ["Clazzer", "idbConsultant", function (Clazzer, idbConsultant) {
	  'ngInject';
	
	  return new
	  // ---------------------------------------------------------------------------
	  // Constructor
	  Clazzer(function idbIndex(me) {
	
	    new Clazzer(this).static('$me', me);
	  })
	
	  // ---------------------------------------------------------------------------
	  // Herencia
	  .inherit(idbConsultant)
	
	  // ---------------------------------------------------------------------------
	  // Getters
	  .getter('$objectStore', 'objectStore').getter('$keyPath', 'keyPath').getter('$multiEntry', 'multiEntry').getter('$unique', 'unique')
	
	  // ---------------------------------------------------------------------------
	  .clazz;
	}];

/***/ },
/* 8 */
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
	    return this;
	  })
	
	  // ---------------------------------------------------------------------------
	  // method
	  .method('$unbind ', function (type, callback) {
	    if (type in this.$_listeners) {
	      var stack = this.$_listeners[type];
	      for (var i = 0, l = stack.length; i < l; i++) {
	        if (stack[i] === callback) {
	          stack.splice(i, 1);
	          return this.$unbind(type, callback);
	        }
	      }
	    }
	    return this;
	  })
	
	  // ---------------------------------------------------------------------------
	  // method
	  .method('$emit', function (event) {
	    if (event.type in this.$_listeners) {
	      var stack = this.$_listeners[event.type];
	      for (var i = 0, l = stack.length; i < l; i++) {
	        stack[i].call(this, event);
	      }
	    }
	    return this;
	  })
	
	  // ---------------------------------------------------------------------------
	  .clazz;
	}];

/***/ },
/* 9 */
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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = ["Clazzer", "idbQuery", "idbEventTarget", "lbResource", "$timeout", function (Clazzer, idbQuery, idbEventTarget, lbResource, $timeout) {
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
	    // Propiedades staticas
	    .static('$db', db).static('$name', name).static('$socket', socket).static('$id', { keyPath: 'id', autoIncrement: true }).static('$fields', {
	      id: {
	        id: true,
	        name: 'id',
	        type: 'number'
	      }
	    }).static('$indexesToCreate', {}).static('$instances', {})
	
	    // ---------------------------------------------------------------------------
	    .static('$getKeyFrom', function (data) {
	
	      return getFieldValue(data, this.$id.keyPath);
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$addIndex', function (fields, name, options) {
	      if (typeof fields == 'string') {
	        fields = [fields];
	      }
	      if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object') {
	        options = name;
	        name = null;
	      }
	      if (!name) {
	        name = fields.sort().join('_');
	      }
	
	      this.$indexesToCreate[name] = {
	        fields: fields,
	        name: name,
	        options: options
	      };
	
	      return this;
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$create', function (cb) {
	      var thiz = this;
	
	      var store = thiz.$db.$createStore(thiz.$name, thiz.$id);
	
	      Object.keys(thiz.$indexesToCreate).map(function (key) {
	        var index = thiz.$indexesToCreate[key];
	        store.$createIndex(index.fields, index.name, index.options);
	      });
	
	      if (cb) cb(thiz, store);
	
	      return thiz;
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$drop', function (cb) {
	
	      this.$db.$dropStore(this.$name);
	
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
	        return store.$put(data, key).then(function (key) {
	          var record = thiz.$getInstance(key);
	          record.$setValues(data);
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
	        return store.$add(data, key).then(function (key) {
	          var record = thiz.$getInstance(key);
	          record.$setValues(data);
	          record.$setLocalValues(data);
	          return record;
	        });
	      });
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$delete', function (query) {
	
	      return this.$writer().then(function (store) {
	        return store.$delete(query);
	      });
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$clear', function () {
	
	      return this.$writer().then(function (store) {
	        return store.$clear();
	      });
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$get', function (key) {
	      var thiz = this;
	
	      var record = this.$getInstance(key);
	
	      record.$promise = thiz.$reader().then(function (store) {
	        return store.$get(key).then(function (data) {
	          record.$setValues(data);
	          record.$setLocalValues(data);
	          return record;
	        });
	      });
	
	      return record;
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$getKey', function (query) {
	      var thiz = this;
	
	      return thiz.$reader().then(function (store) {
	        return store.$getKey(query);
	      });
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$getAll', function (query, count) {
	      var thiz = this;
	
	      var result = [];
	
	      result.$promise = thiz.$reader().then(function (store) {
	        return store.$getAll(query, count).then(function (arr) {
	          return arr.map(function (data) {
	            var record = thiz.$getInstance(thiz.$getKeyFrom(data));
	            record.$setValues(data);
	            record.$setLocalValues(data);
	            result.push(record);
	            return record;
	          });
	        });
	      });
	
	      return result;
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$getAllKeys', function (query, count) {
	
	      var result = [];
	
	      result.$promise = this.$reader().then(function (store) {
	        return store.$getAllKeys().then(function (arr) {
	          return arr.map(function (key) {
	            result.push(key);
	            return key;
	          });
	        });
	      });
	
	      return result;
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$count', function (query) {
	
	      return this.$reader().then(function (store) {
	        return store.$count(query);
	      });
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$find', function (filters) {
	
	      return new idbQuery(this, filters);
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
/* 10 */
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
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * idbQuery
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
	  Clazzer(function idbQuery(model, query) {
	
	    new Clazzer(this).static('$model', model).static('$query', query);
	  })
	
	  // ---------------------------------------------------------------------------
	  // Static
	  .property('$result', { value: [] })
	
	  // ---------------------------------------------------------------------------
	  // method
	  .method('$getResult', function (cb) {
	    var thiz = this;
	
	    if (!thiz.$result.$promise) {
	
	      thiz.$result.$promise = thiz.$model.$reader().then(function (store) {
	
	        return new Promise(function (resolve, reject) {
	
	          var result = [];
	          var rq = store.$openCursor();
	          rq.$success(function (event) {
	
	            var cursor = rq.$me.result;
	            if (!cursor) return resolve(result);
	
	            var record = thiz.$model.$getInstance(cursor.key);
	            record.$setValues(cursor.value);
	            record.$setLocalValues(cursor.value);
	            thiz.$result.push(record);
	            result.push(record);
	
	            cursor.continue();
	          }).$failed(function (event) {
	            reject(event);
	          });
	        });
	      });
	    }
	
	    return thiz.$result;
	  })
	
	  // ---------------------------------------------------------------------------
	  .clazz;
	}];

/***/ },
/* 12 */
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
	
	  return new
	  // ---------------------------------------------------------------------------
	  // Constructor
	  Clazzer(function idbSocket(url, accessTokenId, currentUserId) {
	
	    new Clazzer(this).static('$url', url || idbSocket.$defUrlServer).static('$accessTokenId', accessTokenId || idbSocket.$defAccessTokenId).static('$currentUserId', currentUserId || idbSocket.$defCurrentUserId);
	
	    this.$connect();
	  })
	
	  // ---------------------------------------------------------------------------
	  .property('$_listeners', { value: [] })
	
	  // ---------------------------------------------------------------------------
	  // Conectarse al servidor
	  .method('$connect', function () {
	
	    // Creating connection with server
	    var socket = this.$socket = io.connect(this.$url);
	
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
/* 13 */
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
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * idbConsultant
	 * -----------------------------------------------------------------------------
	 * [Exposed=(Window,Worker)]
	 * interface IDBIndex/IDBStore {
	 *            attribute DOMString      name;
	 * 
	 *   IDBRequest get(any query);
	 *   IDBRequest getKey(any query);
	 *   IDBRequest getAll(optional any query, [EnforceRange] optional unsigned long count);
	 *   IDBRequest getAllKeys(optional any query, [EnforceRange] optional unsigned long count);
	 *   IDBRequest count(optional any query);
	 *   IDBRequest openCursor(optional any query, optional IDBCursorDirection direction = "next");
	 *   IDBRequest openKeyCursor(optional any query, optional IDBCursorDirection direction = "next");
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
	  Clazzer(function idbConsultant(me) {
	
	    new Clazzer(this).static('$me', me);
	  })
	
	  // ---------------------------------------------------------------------------
	  // Getters
	  .getter('$name', 'name')
	
	  // ---------------------------------------------------------------------------
	  .method('$get', function (query) {
	
	    return new idbRequest(this.$me.get(query)).$promise.then(function (event) {
	      return event.target.result;
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$getKey', function (query) {
	
	    return new idbRequest(this.$me.getKey(query)).$promise.then(function (event) {
	      return event.target.result;
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$getAll', function (query, count) {
	
	    return new idbRequest(this.$me.getAll(query, count)).$promise.then(function (event) {
	      return event.target.result;
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$getAllKeys', function (query, count) {
	    return new idbRequest(this.$me.getAllKeys(query, count)).$promise.then(function (event) {
	      return event.target.result;
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$count', function (query) {
	
	    return new idbRequest(this.$me.count(query)).$promise.then(function (event) {
	      return event.target.result;
	    });
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
	  .clazz;
	}];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzVjYzAxYjgyMjg2Y2ZmOTA3NmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaW5kZXguanM/MGY2MiIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvQ2xhenplci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvQ2xhenplci5qcz8xZmNmIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJSZXF1ZXN0LmpzPzJjYmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYk9wZW5EQlJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYk9wZW5EQlJlcXVlc3QuanM/YThkZCIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiLmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGIuanM/MWMxYiIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiU3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlN0b3JlLmpzP2VhNTciLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYkluZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJJbmRleC5qcz84ZDViIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJFdmVudFRhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiRXZlbnRUYXJnZXQuanM/NjM3ZSIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYk1vZGVsLmpzPzdjMWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlRyYW5zYWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJUcmFuc2FjdGlvbi5qcz8zMGMzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJRdWVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiUXVlcnkuanM/OWZlNyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiU29ja2V0LmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJTb2NrZXQuanM/MTRmNCIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvbGIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2xiLmpzP2NmNWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYkNvbnN1bHRhbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYkNvbnN1bHRhbnQuanM/YzkzZSJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29uc3RhbnQiLCJpbyIsInNlcnZpY2UiLCJpZGJTb2NrZXQiLCJBUElfUk9PVCIsImxvY2FsU3RvcmFnZSIsImlkYiIsInNvY2tldCIsImRiIiwiJGJpbmQiLCJjb25zb2xlIiwibG9nIiwiJGFib3J0ZWQiLCIkY2xvc2VkIiwiJGVycm9yIiwiJHZlcnNpb25DaGFuZ2VkIiwiJGF1dG9taWdyYXRpb24iLCIkbW9kZWwiLCIkY3JlYXRlIiwiJGFkZEluZGV4IiwibW9kZWwiLCJzdG9yZSIsIiRjcmVhdGVJbmRleCIsIiRkcm9wIiwidGhlbiIsIiRvcGVuIiwid2luZG93IiwiRW1wbGVhZG8iLCIkZmllbGQiLCIkcmVtb3RlIiwidXJsIiwibWV0aG9kIiwiaXNBcnJheSIsIiRidWlsZCIsInByb3RvdHlwZSIsIiRjb25zdHJ1Y3RvciIsImRhdGEiLCJnZXROb21icmUiLCJub21icmVzIiwiYXBlbGxpZG9zIiwicnVuIiwiJHB1dCIsImlkIiwicmVjb3JkIiwiJGFkZCIsInIiLCIkZ2V0IiwiJHByb21pc2UiLCIkZmluZCIsIiRnZXRSZXN1bHQiLCIkZ2V0QWxsIiwiJGNvdW50IiwiY291bnQiLCIkZ2V0QWxsS2V5cyIsIiRkZWxldGUiLCIkY2xlYXIiLCIkY2xvc2UiLCJDbGF6emVyIiwiY29uc3RydWN0b3IiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwicGFyZW50IiwidG1wIiwiY2xhenoiLCJuYW1lIiwib3B0cyIsImZ1bmMiLCJwcm9wZXJ0eSIsImZyb20iLCJ0byIsImdldCIsIiRtZSIsInNldCIsImNiIiwiUmVhZHlTdGF0ZSIsInN0YXRpYyIsImlkYlJlcXVlc3QiLCJtZSIsImluaGVyaXQiLCJFdmVudFRhcmdldCIsImdldHRlciIsImhhbmRsZXJFdmVudCIsInRoaXoiLCIkX3Byb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIiRzdWNjZXNzIiwiZXZlbnQiLCIkZmFpbGVkIiwiaWRiT3BlbkRCUmVxdWVzdCIsImFwcGx5IiwiYXJndW1lbnRzIiwiaWRiRXZlbnRUYXJnZXQiLCJpZGJTdG9yZSIsImlkYk1vZGVsIiwiaWRiVHJhbnNhY3Rpb24iLCIkbG9nIiwiaW5kZXhlZERCIiwibW96SW5kZXhlZERCIiwid2Via2l0SW5kZXhlZERCIiwibXNJbmRleGVkREIiLCJJREJUcmFuc2FjdGlvbiIsIndlYmtpdElEQlRyYW5zYWN0aW9uIiwibXNJREJUcmFuc2FjdGlvbiIsIklEQktleVJhbmdlIiwid2Via2l0SURCS2V5UmFuZ2UiLCJtc0lEQktleVJhbmdlIiwiYWxlcnQiLCJ2ZXJzaW9uIiwiJF9tZSIsImUiLCJFdmVudCIsIiRlbWl0Iiwib3BlbiIsImRlbGV0ZURhdGFiYXNlIiwiZmlyc3QiLCJzZWNvbmQiLCJjbXAiLCJvbmFib3J0Iiwib25jbG9zZSIsIm9uZXJyb3IiLCJvbnZlcnNpb25jaGFuZ2UiLCIkX3VwZ3JhZGVuZWVkZWRzIiwicHVzaCIsImFsbE1pZ3JhdGlvbnMiLCIkdXBncmFkZW5lZWRlZCIsIm9wZW5SZXF1ZXN0Iiwia2V5cyIsIm1hcCIsIm9sZFZlcnNpb24iLCJuZXdWZXJzaW9uIiwibWlncmF0aW9ucyIsIkFycmF5IiwibWlncmF0aW9uIiwiY2JFcnIiLCJsYXN0UnEiLCJsYXN0RXZlbnQiLCIkb3BlbmVkIiwiJG5hbWUiLCIkdmVyc2lvbiIsInRhcmdldCIsInJlc3VsdCIsImNhdGNoIiwicnEiLCJjbG9zZSIsIm9wdGlvbnMiLCJjcmVhdGVPYmplY3RTdG9yZSIsImRlbGV0ZU9iamVjdFN0b3JlIiwiJF9tb2RlbHMiLCIkc29ja2V0Iiwic3RvcmVOYW1lcyIsIm1vZGUiLCJ0cmFuc2FjdGlvbiIsImFjdGlvbiIsIiR0cmFuc2FjdGlvbiIsInR4Iiwic3RvcmVzT2JqIiwic3RvcmVzIiwic3RvcmVOYW1lIiwiJHN0b3JlIiwiVHJhbnNhY3Rpb25Nb2RlIiwiUmVhZE9ubHkiLCJSZWFkV3JpdGUiLCJpZGJJbmRleCIsImlkYkNvbnN1bHRhbnQiLCJrZXkiLCJwdXQiLCJhZGQiLCJxdWVyeSIsImRlbGV0ZSIsImNsZWFyIiwiaW5kZXgiLCJmaWVsZHMiLCJzb3J0Iiwiam9pbiIsImNyZWF0ZUluZGV4IiwiaW5kZXhOYW1lIiwiZGVsZXRlSW5kZXgiLCJ0eXBlIiwiY2FsbGJhY2siLCIkX2xpc3RlbmVycyIsInN0YWNrIiwiaSIsImwiLCJsZW5ndGgiLCJzcGxpY2UiLCIkdW5iaW5kIiwiY2FsbCIsImlkYlF1ZXJ5IiwibGJSZXNvdXJjZSIsIiR0aW1lb3V0IiwiZGVlcEZpZWxkIiwib2JqIiwiZmllbGQiLCJzcGxpdCIsImxhc3RGaWVsZCIsInBvcCIsIl9zZXQiLCJzaGlmdCIsImdldEZpZWxkVmFsdWUiLCJzZXRGaWVsZFZhbHVlIiwiaWRiTW9kZWxGYWN0b3J5Iiwia2V5UGF0aCIsImF1dG9JbmNyZW1lbnQiLCIkaWQiLCIkaW5kZXhlc1RvQ3JlYXRlIiwiJGRiIiwiJGNyZWF0ZVN0b3JlIiwiJGRyb3BTdG9yZSIsIiR3cml0ZXIiLCIkcmVhZGVyIiwiJGdldFZhbHVlcyIsIiRnZXRJbnN0YW5jZSIsIiRzZXRWYWx1ZXMiLCIkc2V0TG9jYWxWYWx1ZXMiLCIkZ2V0S2V5IiwiYXJyIiwiJGdldEtleUZyb20iLCJmaWx0ZXJzIiwidW5kZWZpbmVkIiwiJGluc3RhbmNlcyIsIiRzZXQiLCIkZmllbGRzIiwidmFsdWVzIiwiYnVpbGRDYWxsYmFjayIsImFyZ3MiLCJhY3Rpb25zIiwiJF9yZW1vdGUiLCIkX3ZhbHVlcyIsImxvY2FsIiwicmVtb3RlIiwiRXJyb3IiLCJzdWJzY3JpYmUiLCJtb2RlbE5hbWUiLCJldmVudE5hbWUiLCJtb2RlbElkIiwiJGtleSIsIiRzZXRSZW1vdGVWYWx1ZXMiLCJvYmplY3RTdG9yZSIsImFib3J0IiwiJGNvbXBsZXRlZCIsIiRyZXN1bHQiLCIkb3BlbkN1cnNvciIsImN1cnNvciIsImNvbnRpbnVlIiwiYWNjZXNzVG9rZW5JZCIsImN1cnJlbnRVc2VySWQiLCIkZGVmVXJsU2VydmVyIiwiJGRlZkFjY2Vzc1Rva2VuSWQiLCIkZGVmQ3VycmVudFVzZXJJZCIsIiRjb25uZWN0IiwiY29ubmVjdCIsIiR1cmwiLCJvbiIsImVtaXQiLCIkYWNjZXNzVG9rZW5JZCIsInVzZXJJZCIsIiRjdXJyZW50VXNlcklkIiwiJHB1c2hMaXN0ZW5lciIsInN1YnNjcmlwdGlvbk5hbWUiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJpZHgiLCJpbmRleE9mIiwiJHNldFVybFNlcnZlciIsIiRzZXRDcmVkZW50aWFscyIsImxiIiwiZ2V0SG9zdCIsIm0iLCJtYXRjaCIsInVybEJhc2VIb3N0IiwibG9jYXRpb24iLCJob3N0IiwibGJBdXRoIiwicHJvcHMiLCJwcm9wc1ByZWZpeCIsInNhdmUiLCJzdG9yYWdlIiwiZXJyIiwibG9hZCIsInNlc3Npb25TdG9yYWdlIiwiZm9yRWFjaCIsImN1cnJlbnRVc2VyRGF0YSIsInJlbWVtYmVyTWUiLCJzZXRVc2VyIiwidXNlckRhdGEiLCJjbGVhclVzZXIiLCJjbGVhclN0b3JhZ2UiLCJsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IiLCIkcSIsInJlcXVlc3QiLCJjb25maWciLCJoZWFkZXJzIiwiYXV0aEhlYWRlciIsIl9faXNHZXRDdXJyZW50VXNlcl9fIiwicmVzIiwiYm9keSIsImVycm9yIiwic3RhdHVzIiwid2hlbiIsInVybEJhc2UiLCJzZXRBdXRoSGVhZGVyIiwiaGVhZGVyIiwiZ2V0QXV0aEhlYWRlciIsInNldFVybEJhc2UiLCJnZXRVcmxCYXNlIiwiJHJlc291cmNlIiwicGFyYW1zIiwib3JpZ2luYWxVcmwiLCJyZXNvdXJjZSIsIiRzYXZlIiwic3VjY2VzcyIsInVwc2VydCIsImZhY3RvcnkiLCJwcm92aWRlciIsIiRodHRwUHJvdmlkZXIiLCJpbnRlcmNlcHRvcnMiLCJnZXRLZXkiLCJnZXRBbGwiLCJnZXRBbGxLZXlzIiwiZGlyZWN0aW9uIiwib3BlbkN1cnNvciIsIm9wZW5LZXlDdXJzb3IiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOzs7Ozs7Ozs7Ozs7O0FBYUEsd0I7Ozs7OztBQ2JBOzs7O0FBR0E7O0FDR0EsS0FBSSxZQUFZLHVCQUF1Qjs7QURBdkM7O0FDSUEsS0FBSSxlQUFlLHVCQUF1Qjs7QURIMUM7O0FDT0EsS0FBSSxxQkFBcUIsdUJBQXVCOztBRExoRDs7QUNTQSxLQUFJLGtCQUFrQix1QkFBdUI7O0FETjdDOztBQ1VBLEtBQUksUUFBUSx1QkFBdUI7O0FEVG5DOztBQ2FBLEtBQUksYUFBYSx1QkFBdUI7O0FEWnhDOztBQ2dCQSxLQUFJLGFBQWEsdUJBQXVCOztBRGZ4Qzs7QUNtQkEsS0FBSSxtQkFBbUIsdUJBQXVCOztBRGxCOUM7O0FDc0JBLEtBQUksYUFBYSx1QkFBdUI7O0FEckJ4Qzs7QUN5QkEsS0FBSSxtQkFBbUIsdUJBQXVCOztBRHhCOUM7O0FDNEJBLEtBQUksYUFBYSx1QkFBdUI7O0FEM0J4Qzs7QUMrQkEsS0FBSSxjQUFjLHVCQUF1Qjs7QUQ3QnpDOztBQ2lDQSxLQUFJLE9BQU8sdUJBQXVCOztBQUVsQyxVQUFTLHVCQUF1QixLQUFLLEVBQUUsT0FBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsU0FBUzs7O0FEakN2RixtQkFBR0EsUUFBUUMsT0FBTyxVQUFV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XG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDc1Y2MwMWI4MjI4NmNmZjkwNzZmXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gaW1wb3J0IGlkYlV0aWxzIGZyb20gJy4vdXRpbHMvaWRiVXRpbHMnO1xyXG4vLyBpbXBvcnQgaWRiRXZlbnRzIGZyb20gJy4vdXRpbHMvaWRiRXZlbnRzJztcclxuLy8gaW1wb3J0IHFzIGZyb20gJy4vdXRpbHMvcXMnO1xyXG5cclxuLy8gaW1wb3J0IGlkYlNvY2tldCBmcm9tICcuL3NlcnZpY2VzL2lkYlNvY2tldCc7XHJcbi8vIGltcG9ydCBpZGIgZnJvbSAnLi9zZXJ2aWNlcy9pZGInO1xyXG4vLyBpbXBvcnQgaWRiTW9kZWwgZnJvbSAnLi9zZXJ2aWNlcy9pZGJNb2RlbCc7XHJcbi8vIGltcG9ydCBpZGJRdWVyeSBmcm9tICcuL3NlcnZpY2VzL2lkYlF1ZXJ5JztcclxuXHJcbi8vIGltcG9ydCBsYiBmcm9tICcuL3NlcnZpY2VzL2xiJztcclxuXHJcbmltcG9ydCAnLi92MS9pbmRleCc7XHJcblxyXG4vLyBsYihhbmd1bGFyLm1vZHVsZSgnbmcuaWRiJywgWyduZy52MS5pZGInXSkpXHJcbiAgXHJcbi8vICAgLnNlcnZpY2UoJ2lkYkV2ZW50cycsIGlkYkV2ZW50cylcclxuLy8gICAuc2VydmljZSgnaWRiVXRpbHMnLCBpZGJVdGlscylcclxuLy8gICAuc2VydmljZSgncXMnLCBxcylcclxuXHJcbi8vICAgLy8gVGFrZSBvZiBsYi1zZXJ2aWNlcy5qc1xyXG4vLyAgIC5zZXJ2aWNlKCdpZGInLCBpZGIpXHJcbi8vICAgLnNlcnZpY2UoJ2lkYk1vZGVsJywgaWRiTW9kZWwpXHJcbi8vICAgLnNlcnZpY2UoJ2lkYlF1ZXJ5JywgaWRiUXVlcnkpXHJcbi8vICAgLnNlcnZpY2UoJ2lkYlNvY2tldCcsIGlkYlNvY2tldClcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBHbG9iYWxlc1xyXG5pbXBvcnQgQ2xhenplciAgZnJvbSAnLi9DbGF6emVyJztcclxuXHJcbi8vIFJlcXVlc3RcclxuaW1wb3J0IGlkYlJlcXVlc3QgICAgICAgICBmcm9tICcuL2lkYlJlcXVlc3QnO1xyXG5pbXBvcnQgaWRiT3BlbkRCUmVxdWVzdCAgIGZyb20gJy4vaWRiT3BlbkRCUmVxdWVzdCc7XHJcblxyXG5pbXBvcnQgaWRiQ29uc3VsdGFudCAgIGZyb20gJy4vaWRiQ29uc3VsdGFudCc7XHJcblxyXG4vLyBQcmluY2lwYWxlc1xyXG5pbXBvcnQgaWRiICAgICAgICAgICAgICBmcm9tICcuL2lkYic7XHJcbmltcG9ydCBpZGJTdG9yZSAgICAgICAgIGZyb20gJy4vaWRiU3RvcmUnO1xyXG5pbXBvcnQgaWRiSW5kZXggICAgICAgICBmcm9tICcuL2lkYkluZGV4JztcclxuaW1wb3J0IGlkYkV2ZW50VGFyZ2V0ICAgZnJvbSAnLi9pZGJFdmVudFRhcmdldCc7XHJcbmltcG9ydCBpZGJNb2RlbCAgICAgICAgIGZyb20gJy4vaWRiTW9kZWwnO1xyXG5pbXBvcnQgaWRiVHJhbnNhY3Rpb24gICBmcm9tICcuL2lkYlRyYW5zYWN0aW9uJztcclxuaW1wb3J0IGlkYlF1ZXJ5ICAgICAgICAgZnJvbSAnLi9pZGJRdWVyeSc7XHJcbmltcG9ydCBpZGJTb2NrZXQgICAgICAgIGZyb20gJy4vaWRiU29ja2V0JztcclxuXHJcbmltcG9ydCBsYiBmcm9tICcuL2xiJztcclxuXHJcbmxiKGFuZ3VsYXIubW9kdWxlKCduZy5pZGInLCBbXSkpXHJcbiAgXHJcbiAgLmNvbnN0YW50KCdpbycsIGlvKVxyXG4gIC5zZXJ2aWNlKCdDbGF6emVyJywgQ2xhenplcilcclxuXHJcbiAgLmNvbnN0YW50KCdpZGJWZXJzaW9uJywgJzAuMC4xJylcclxuICBcclxuICAuc2VydmljZSgnaWRiUmVxdWVzdCcsIGlkYlJlcXVlc3QpXHJcbiAgLnNlcnZpY2UoJ2lkYk9wZW5EQlJlcXVlc3QnLCBpZGJPcGVuREJSZXF1ZXN0KVxyXG4gIC5zZXJ2aWNlKCdpZGJDb25zdWx0YW50JywgaWRiQ29uc3VsdGFudClcclxuICAuc2VydmljZSgnaWRiJywgaWRiKVxyXG4gIC5zZXJ2aWNlKCdpZGJTdG9yZScsIGlkYlN0b3JlKVxyXG4gIC5zZXJ2aWNlKCdpZGJJbmRleCcsIGlkYkluZGV4KVxyXG4gIC5zZXJ2aWNlKCdpZGJFdmVudFRhcmdldCcsIGlkYkV2ZW50VGFyZ2V0KVxyXG4gIC5zZXJ2aWNlKCdpZGJNb2RlbCcsIGlkYk1vZGVsKVxyXG4gIC5zZXJ2aWNlKCdpZGJTb2NrZXQnLCBpZGJTb2NrZXQpXHJcbiAgLnNlcnZpY2UoJ2lkYlF1ZXJ5JywgaWRiUXVlcnkpXHJcbiAgLnNlcnZpY2UoJ2lkYlRyYW5zYWN0aW9uJywgaWRiVHJhbnNhY3Rpb24pXHJcblxyXG4gIC5zZXJ2aWNlKCdzb2NrZXQnLCBmdW5jdGlvbihpZGJTb2NrZXQsIEFQSV9ST09UKSB7ICduZ0luamVjdCdcclxuICBcclxuICAgIHJldHVybiBuZXcgaWRiU29ja2V0KFxyXG4gICAgICAnaHR0cDovL2xvY2FsaG9zdDozMjAwLycsXHJcbiAgICAgIGxvY2FsU3RvcmFnZVsnJExvb3BCYWNrJGFjY2Vzc1Rva2VuSWQnXSxcclxuICAgICAgbG9jYWxTdG9yYWdlWyckTG9vcEJhY2skY3VycmVudFVzZXJJZCddXHJcbiAgICApO1xyXG5cclxuICB9KVxyXG5cclxuICAuc2VydmljZSgnZGInLCBmdW5jdGlvbiAoaWRiLCBzb2NrZXQpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgICBjb25zdCBkYiA9IG5ldyBpZGIoJ2FhYScsIDQsIHNvY2tldClcclxuXHJcbiAgICBkYlxyXG4gICAgICAuJGJpbmQoJ29wZW5lZCcsIGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coWyckb3BlbmVkJ10pOyB9KVxyXG4gICAgICAuJGFib3J0ZWQoZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZyhbJyRhYm9ydGVkJ10pOyB9KVxyXG4gICAgICAuJGNsb3NlZChmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKFsnJGNsb3NlZCddKTsgfSlcclxuICAgICAgLiRlcnJvcihmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKFsnJGVycm9yJ10pOyB9KVxyXG4gICAgICAuJHZlcnNpb25DaGFuZ2VkKGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coWyckdmVyc2lvbkNoYW5nZWQnXSk7IH0pXHJcblxyXG4gICAgICAuJGF1dG9taWdyYXRpb24oe1xyXG4gICAgICAgIDE6IGZ1bmN0aW9uIChkYikge1xyXG4gICAgICAgICAgZGIuJG1vZGVsKCdUcmFiYWphZG9yJylcclxuICAgICAgICAgICAgLiRjcmVhdGUoKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMjogZnVuY3Rpb24gKGRiKSB7XHJcbiAgICAgICAgICBkYi4kbW9kZWwoJ0VtcGxlYWRvJylcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC4kYWRkSW5kZXgoWydub21icmVzJywgJ2FwZWxsaWRvcyddKVxyXG4gICAgICAgICAgICAuJGFkZEluZGV4KCduYWNpbWllbnRvJylcclxuXHJcbiAgICAgICAgICAgIC4kY3JlYXRlKGZ1bmN0aW9uIChtb2RlbCwgc3RvcmUpIHtcclxuXHJcbiAgICAgICAgICAgICAgc3RvcmUuJGNyZWF0ZUluZGV4KCdjaScpO1xyXG4gICAgICAgICAgICAgIHN0b3JlLiRjcmVhdGVJbmRleCgnY29kJyk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMzogZnVuY3Rpb24gKGRiKSB7XHJcbiAgICAgICAgICBkYi4kbW9kZWwoJ1RyYWJhamFkb3InKVxyXG4gICAgICAgICAgICAuJGRyb3AoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIC4kZHJvcCgpLnRoZW4oZnVuY3Rpb24gKGRiKSB7XHJcbiAgICAgICAgZGIuJG9wZW4oKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGRiO1xyXG4gICAgXHJcbiAgfSlcclxuXHJcbiAgLnNlcnZpY2UoJ0VtcGxlYWRvJywgZnVuY3Rpb24gKGRiKSB7ICduZ0luamVjdCc7XHJcbiAgICByZXR1cm4gd2luZG93LkVtcGxlYWRvID0gZGIuJG1vZGVsKCdFbXBsZWFkbycpXHJcbiAgICAgIC4kZmllbGQoJ2NvZCcsICAgICAgICB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSlcclxuICAgICAgLiRmaWVsZCgnY2knLCAgICAgICAgIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KVxyXG4gICAgICAuJGZpZWxkKCdub21icmVzJywgICAgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pXHJcbiAgICAgIC4kZmllbGQoJ2FwZWxsaWRvcycsICB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSlcclxuICAgICAgLiRmaWVsZCgnbmFjaW1pZW50bycsIHsgXCJ0eXBlXCI6IFwiZGF0ZVwiIH0pXHJcbiAgICAgIC4kZmllbGQoJ2luZ3Jlc28nLCAgICB7IFwidHlwZVwiOiBcImRhdGVcIiB9KVxyXG4gICAgICAuJGZpZWxkKCdkaXJlY2Npb24nLCAgeyBcInR5cGVcIjogXCJzdHJpbmdcIn0pXHJcbiAgICAgIC4kcmVtb3RlKFxyXG4gICAgICAgICcvdHJhYmFqYWRvcmVzLzppZCcsXHJcbiAgICAgICAgeyAnaWQnOiAnQGlkJyB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICdmaW5kJzogICB7IHVybDogJy90cmFiYWphZG9yZXMvX2ZpbmRXaXRoVmVyc2lvbicsIG1ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWUsIH0sXHJcbiAgICAgICAgICAvLyAnY3JlYXRlJzogeyB1cmw6ICcvdHJhYmFqYWRvcmVzJywgbWV0aG9kOiAnUE9TVCcsIH0sXHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICAgIC8vIC52ZXJzaW9uaW5nKClcclxuICAgICAgLiRidWlsZChmdW5jdGlvbiAoRW1wbGVhZG8pIHtcclxuXHJcbiAgICAgICAgRW1wbGVhZG8ucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIEVtcGxlYWRvLnByb3RvdHlwZS5nZXROb21icmUgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgICAgIHJldHVybiB0aGlzLm5vbWJyZXMgKyAnICcgKyB0aGlzLmFwZWxsaWRvcztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcbiAgfSlcclxuXHJcbi5ydW4oZnVuY3Rpb24gKGRiLCBFbXBsZWFkbykgeyAnbmdJbmplY3QnO1xyXG5cclxuICBFbXBsZWFkby4kcHV0KHtcclxuICAgIGlkOiAxLFxyXG4gICAgJ25vbWJyZXMnOiAnQWxleGFuZGVyJ1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xyXG4gICAgLy9cclxuICAgIGNvbnNvbGUubG9nKFsncHV0JywgcmVjb3JkLm5vbWJyZXNdKTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBFbXBsZWFkby4kcHV0KHtcclxuICAgICAgaWQ6IDIsXHJcbiAgICAgICdub21icmVzJzogJ0d1aWxsZW1vJ1xyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFsncHV0JywgcmVjb3JkLm5vbWJyZXNdKTtcclxuICAgIH0pO1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIEVtcGxlYWRvLiRwdXQoe1xyXG4gICAgICBpZDogMixcclxuICAgICAgJ2FwZWxsaWRvcyc6ICdTZW1pbmFyaW8nXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcclxuICAgICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xyXG4gICAgfSk7XHJcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gRW1wbGVhZG8uJHB1dCh7XHJcbiAgICAgIGlkOiA0LFxyXG4gICAgICAnbm9tYnJlcyc6ICdBeGVsJ1xyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFsncHV0JywgcmVjb3JkLm5vbWJyZXNdKTtcclxuICAgIH0pO1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIEVtcGxlYWRvLiRwdXQoe1xyXG4gICAgICAnbm9tYnJlcyc6ICdHYWJyaWVsJ1xyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFsncHV0JywgcmVjb3JkLm5vbWJyZXNdKTtcclxuICAgIH0pO1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIEVtcGxlYWRvLiRhZGQoe1xyXG4gICAgICAnbm9tYnJlcyc6ICdFdmVydCdcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XHJcbiAgICB9KTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHIgPSBFbXBsZWFkby4kZ2V0KDIpO1xyXG4gICAgY29uc29sZS5sb2coWydnZXQnLCByXSlcclxuICAgIHJldHVybiByLiRwcm9taXNlO1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgciA9IEVtcGxlYWRvLiRmaW5kKCkuJGdldFJlc3VsdCgpO1xyXG4gICAgY29uc29sZS5sb2coWydmaW5kJywgcl0pO1xyXG4gICAgcmV0dXJuIHIuJHByb21pc2U7XHJcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCByID0gRW1wbGVhZG8uJGdldEFsbCgpO1xyXG4gICAgY29uc29sZS5sb2coWydnZXRBbGwnLCByXSk7XHJcbiAgICByZXR1cm4gci4kcHJvbWlzZTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBFbXBsZWFkby4kY291bnQoKS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhbJ2NvdW50JywgY291bnRdKTtcclxuICAgIH0pO1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgciA9IEVtcGxlYWRvLiRnZXRBbGxLZXlzKCk7XHJcbiAgICBjb25zb2xlLmxvZyhbJ2dldEFsbEtleXMnLCByXSk7XHJcbiAgICByZXR1cm4gci4kcHJvbWlzZTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBFbXBsZWFkby4kZGVsZXRlKDIpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhbJ2RlbGV0ZSddKTtcclxuICAgIH0pO1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIEVtcGxlYWRvLiRjb3VudCgpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFsnY291bnQnLCBjb3VudF0pO1xyXG4gICAgfSk7XHJcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gRW1wbGVhZG8uJGNsZWFyKCkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFsnY2xlYXInXSk7XHJcbiAgICB9KTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBFbXBsZWFkby4kY291bnQoKS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhbJ2NvdW50JywgY291bnRdKTtcclxuICAgIH0pO1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgZGIuJGNsb3NlKCk7XHJcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICBkYi4kb3BlbigpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICBkYi4kY2xvc2UoKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxufSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBHbG9iYWxlc1xuXG52YXIgX0NsYXp6ZXIgPSByZXF1aXJlKCcuL0NsYXp6ZXInKTtcblxudmFyIF9DbGF6emVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NsYXp6ZXIpO1xuXG52YXIgX2lkYlJlcXVlc3QgPSByZXF1aXJlKCcuL2lkYlJlcXVlc3QnKTtcblxudmFyIF9pZGJSZXF1ZXN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlJlcXVlc3QpO1xuXG52YXIgX2lkYk9wZW5EQlJlcXVlc3QgPSByZXF1aXJlKCcuL2lkYk9wZW5EQlJlcXVlc3QnKTtcblxudmFyIF9pZGJPcGVuREJSZXF1ZXN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYk9wZW5EQlJlcXVlc3QpO1xuXG52YXIgX2lkYkNvbnN1bHRhbnQgPSByZXF1aXJlKCcuL2lkYkNvbnN1bHRhbnQnKTtcblxudmFyIF9pZGJDb25zdWx0YW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYkNvbnN1bHRhbnQpO1xuXG52YXIgX2lkYiA9IHJlcXVpcmUoJy4vaWRiJyk7XG5cbnZhciBfaWRiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYik7XG5cbnZhciBfaWRiU3RvcmUgPSByZXF1aXJlKCcuL2lkYlN0b3JlJyk7XG5cbnZhciBfaWRiU3RvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiU3RvcmUpO1xuXG52YXIgX2lkYkluZGV4ID0gcmVxdWlyZSgnLi9pZGJJbmRleCcpO1xuXG52YXIgX2lkYkluZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYkluZGV4KTtcblxudmFyIF9pZGJFdmVudFRhcmdldCA9IHJlcXVpcmUoJy4vaWRiRXZlbnRUYXJnZXQnKTtcblxudmFyIF9pZGJFdmVudFRhcmdldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJFdmVudFRhcmdldCk7XG5cbnZhciBfaWRiTW9kZWwgPSByZXF1aXJlKCcuL2lkYk1vZGVsJyk7XG5cbnZhciBfaWRiTW9kZWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiTW9kZWwpO1xuXG52YXIgX2lkYlRyYW5zYWN0aW9uID0gcmVxdWlyZSgnLi9pZGJUcmFuc2FjdGlvbicpO1xuXG52YXIgX2lkYlRyYW5zYWN0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlRyYW5zYWN0aW9uKTtcblxudmFyIF9pZGJRdWVyeSA9IHJlcXVpcmUoJy4vaWRiUXVlcnknKTtcblxudmFyIF9pZGJRdWVyeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJRdWVyeSk7XG5cbnZhciBfaWRiU29ja2V0ID0gcmVxdWlyZSgnLi9pZGJTb2NrZXQnKTtcblxudmFyIF9pZGJTb2NrZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiU29ja2V0KTtcblxudmFyIF9sYiA9IHJlcXVpcmUoJy4vbGInKTtcblxudmFyIF9sYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vIFJlcXVlc3RcbigwLCBfbGIyLmRlZmF1bHQpKGFuZ3VsYXIubW9kdWxlKCduZy5pZGInLCBbXSkpLmNvbnN0YW50KCdpbycsIGlvKS5zZXJ2aWNlKCdDbGF6emVyJywgX0NsYXp6ZXIyLmRlZmF1bHQpLmNvbnN0YW50KCdpZGJWZXJzaW9uJywgJzAuMC4xJykuc2VydmljZSgnaWRiUmVxdWVzdCcsIF9pZGJSZXF1ZXN0Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJPcGVuREJSZXF1ZXN0JywgX2lkYk9wZW5EQlJlcXVlc3QyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYkNvbnN1bHRhbnQnLCBfaWRiQ29uc3VsdGFudDIuZGVmYXVsdCkuc2VydmljZSgnaWRiJywgX2lkYjIuZGVmYXVsdCkuc2VydmljZSgnaWRiU3RvcmUnLCBfaWRiU3RvcmUyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYkluZGV4JywgX2lkYkluZGV4Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJFdmVudFRhcmdldCcsIF9pZGJFdmVudFRhcmdldDIuZGVmYXVsdCkuc2VydmljZSgnaWRiTW9kZWwnLCBfaWRiTW9kZWwyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlNvY2tldCcsIF9pZGJTb2NrZXQyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlF1ZXJ5JywgX2lkYlF1ZXJ5Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJUcmFuc2FjdGlvbicsIF9pZGJUcmFuc2FjdGlvbjIuZGVmYXVsdCkuc2VydmljZSgnc29ja2V0JywgZnVuY3Rpb24gKGlkYlNvY2tldCwgQVBJX1JPT1QpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gbmV3IGlkYlNvY2tldCgnaHR0cDovL2xvY2FsaG9zdDozMjAwLycsIGxvY2FsU3RvcmFnZVsnJExvb3BCYWNrJGFjY2Vzc1Rva2VuSWQnXSwgbG9jYWxTdG9yYWdlWyckTG9vcEJhY2skY3VycmVudFVzZXJJZCddKTtcbn0pLnNlcnZpY2UoJ2RiJywgZnVuY3Rpb24gKGlkYiwgc29ja2V0KSB7XG4gICduZ0luamVjdCc7XG5cbiAgdmFyIGRiID0gbmV3IGlkYignYWFhJywgNCwgc29ja2V0KTtcblxuICBkYi4kYmluZCgnb3BlbmVkJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFsnJG9wZW5lZCddKTtcbiAgfSkuJGFib3J0ZWQoZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFsnJGFib3J0ZWQnXSk7XG4gIH0pLiRjbG9zZWQoZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFsnJGNsb3NlZCddKTtcbiAgfSkuJGVycm9yKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyhbJyRlcnJvciddKTtcbiAgfSkuJHZlcnNpb25DaGFuZ2VkKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyhbJyR2ZXJzaW9uQ2hhbmdlZCddKTtcbiAgfSkuJGF1dG9taWdyYXRpb24oe1xuICAgIDE6IGZ1bmN0aW9uIF8oZGIpIHtcbiAgICAgIGRiLiRtb2RlbCgnVHJhYmFqYWRvcicpLiRjcmVhdGUoKTtcbiAgICB9LFxuICAgIDI6IGZ1bmN0aW9uIF8oZGIpIHtcbiAgICAgIGRiLiRtb2RlbCgnRW1wbGVhZG8nKS4kYWRkSW5kZXgoWydub21icmVzJywgJ2FwZWxsaWRvcyddKS4kYWRkSW5kZXgoJ25hY2ltaWVudG8nKS4kY3JlYXRlKGZ1bmN0aW9uIChtb2RlbCwgc3RvcmUpIHtcblxuICAgICAgICBzdG9yZS4kY3JlYXRlSW5kZXgoJ2NpJyk7XG4gICAgICAgIHN0b3JlLiRjcmVhdGVJbmRleCgnY29kJyk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIDM6IGZ1bmN0aW9uIF8oZGIpIHtcbiAgICAgIGRiLiRtb2RlbCgnVHJhYmFqYWRvcicpLiRkcm9wKCk7XG4gICAgfVxuICB9KS4kZHJvcCgpLnRoZW4oZnVuY3Rpb24gKGRiKSB7XG4gICAgZGIuJG9wZW4oKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRiO1xufSkuc2VydmljZSgnRW1wbGVhZG8nLCBmdW5jdGlvbiAoZGIpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gd2luZG93LkVtcGxlYWRvID0gZGIuJG1vZGVsKCdFbXBsZWFkbycpLiRmaWVsZCgnY29kJywgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pLiRmaWVsZCgnY2knLCB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSkuJGZpZWxkKCdub21icmVzJywgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pLiRmaWVsZCgnYXBlbGxpZG9zJywgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pLiRmaWVsZCgnbmFjaW1pZW50bycsIHsgXCJ0eXBlXCI6IFwiZGF0ZVwiIH0pLiRmaWVsZCgnaW5ncmVzbycsIHsgXCJ0eXBlXCI6IFwiZGF0ZVwiIH0pLiRmaWVsZCgnZGlyZWNjaW9uJywgeyBcInR5cGVcIjogXCJzdHJpbmdcIiB9KS4kcmVtb3RlKCcvdHJhYmFqYWRvcmVzLzppZCcsIHsgJ2lkJzogJ0BpZCcgfSwge1xuICAgICdmaW5kJzogeyB1cmw6ICcvdHJhYmFqYWRvcmVzL19maW5kV2l0aFZlcnNpb24nLCBtZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlIH1cbiAgfSlcbiAgLy8gLnZlcnNpb25pbmcoKVxuICAuJGJ1aWxkKGZ1bmN0aW9uIChFbXBsZWFkbykge1xuXG4gICAgRW1wbGVhZG8ucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7fTtcblxuICAgIEVtcGxlYWRvLnByb3RvdHlwZS5nZXROb21icmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub21icmVzICsgJyAnICsgdGhpcy5hcGVsbGlkb3M7XG4gICAgfTtcbiAgfSk7XG59KS5ydW4oZnVuY3Rpb24gKGRiLCBFbXBsZWFkbykge1xuICAnbmdJbmplY3QnO1xuXG4gIEVtcGxlYWRvLiRwdXQoe1xuICAgIGlkOiAxLFxuICAgICdub21icmVzJzogJ0FsZXhhbmRlcidcbiAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XG4gICAgLy9cbiAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBFbXBsZWFkby4kcHV0KHtcbiAgICAgIGlkOiAyLFxuICAgICAgJ25vbWJyZXMnOiAnR3VpbGxlbW8nXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XG4gICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XG4gICAgfSk7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBFbXBsZWFkby4kcHV0KHtcbiAgICAgIGlkOiAyLFxuICAgICAgJ2FwZWxsaWRvcyc6ICdTZW1pbmFyaW8nXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XG4gICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XG4gICAgfSk7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBFbXBsZWFkby4kcHV0KHtcbiAgICAgIGlkOiA0LFxuICAgICAgJ25vbWJyZXMnOiAnQXhlbCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFsncHV0JywgcmVjb3JkLm5vbWJyZXNdKTtcbiAgICB9KTtcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEVtcGxlYWRvLiRwdXQoe1xuICAgICAgJ25vbWJyZXMnOiAnR2FicmllbCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFsncHV0JywgcmVjb3JkLm5vbWJyZXNdKTtcbiAgICB9KTtcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEVtcGxlYWRvLiRhZGQoe1xuICAgICAgJ25vbWJyZXMnOiAnRXZlcnQnXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XG4gICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XG4gICAgfSk7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHZhciByID0gRW1wbGVhZG8uJGdldCgyKTtcbiAgICBjb25zb2xlLmxvZyhbJ2dldCcsIHJdKTtcbiAgICByZXR1cm4gci4kcHJvbWlzZTtcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHIgPSBFbXBsZWFkby4kZmluZCgpLiRnZXRSZXN1bHQoKTtcbiAgICBjb25zb2xlLmxvZyhbJ2ZpbmQnLCByXSk7XG4gICAgcmV0dXJuIHIuJHByb21pc2U7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHZhciByID0gRW1wbGVhZG8uJGdldEFsbCgpO1xuICAgIGNvbnNvbGUubG9nKFsnZ2V0QWxsJywgcl0pO1xuICAgIHJldHVybiByLiRwcm9taXNlO1xuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gRW1wbGVhZG8uJGNvdW50KCkudGhlbihmdW5jdGlvbiAoY291bnQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFsnY291bnQnLCBjb3VudF0pO1xuICAgIH0pO1xuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgciA9IEVtcGxlYWRvLiRnZXRBbGxLZXlzKCk7XG4gICAgY29uc29sZS5sb2coWydnZXRBbGxLZXlzJywgcl0pO1xuICAgIHJldHVybiByLiRwcm9taXNlO1xuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gRW1wbGVhZG8uJGRlbGV0ZSgyKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFsnZGVsZXRlJ10pO1xuICAgIH0pO1xuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gRW1wbGVhZG8uJGNvdW50KCkudGhlbihmdW5jdGlvbiAoY291bnQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFsnY291bnQnLCBjb3VudF0pO1xuICAgIH0pO1xuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gRW1wbGVhZG8uJGNsZWFyKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zb2xlLmxvZyhbJ2NsZWFyJ10pO1xuICAgIH0pO1xuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gRW1wbGVhZG8uJGNvdW50KCkudGhlbihmdW5jdGlvbiAoY291bnQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFsnY291bnQnLCBjb3VudF0pO1xuICAgIH0pO1xuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICBkYi4kY2xvc2UoKTtcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgZGIuJG9wZW4oKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIGRiLiRjbG9zZSgpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG4vLyBQcmluY2lwYWxlc1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIENsYXp6ZXJcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7ICduZ0luamVjdCc7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgZnVuY3Rpb24gQ2xhenplciAoY29uc3RydWN0b3IpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY2xhenonLCB7IHZhbHVlOiBjb25zdHJ1Y3RvciB8fCBmdW5jdGlvbiAoKSB7fSB9KTtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ2luaGVyaXQnLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKHBhcmVudCkge1xyXG4gICAgICBsZXQgdG1wID0gZnVuY3Rpb24oKSB7fTtcclxuICAgICAgdG1wLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7XHJcbiAgICAgIHRoaXMuY2xhenoucHJvdG90eXBlID0gbmV3IHRtcCgpO1xyXG4gICAgICB0aGlzLmNsYXp6LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHRoaXMuY2xheno7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdzdGF0aWMnLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmNsYXp6LCBuYW1lLCB7XHJcbiAgICAgICAgdmFsdWU6IHZhbHVlXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAncHJvcGVydHknLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKG5hbWUsIG9wdHMpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuY2xhenoucHJvdG90eXBlLCBuYW1lLCBvcHRzKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ21ldGhvZCcsIHtcclxuICAgIHZhbHVlOiBmdW5jdGlvbiAobmFtZSwgZnVuYykge1xyXG4gICAgICB0aGlzLnByb3BlcnR5KG5hbWUsIHtcclxuICAgICAgICB2YWx1ZTogZnVuY1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ2dldHRlcicsIHtcclxuICAgIHZhbHVlOiBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcclxuICAgICAgaWYgKCF0bykgdG8gPSBmcm9tO1xyXG4gICAgICB0aGlzLnByb3BlcnR5KGZyb20sIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLiRtZVt0b107XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3NldHRlcicsIHtcclxuICAgIHZhbHVlOiBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcclxuICAgICAgaWYgKCF0bykgdG8gPSBmcm9tO1xyXG4gICAgICB0aGlzLnByb3BlcnR5KGZyb20sIHtcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy4kbWVbdG9dID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ2hhbmRsZXJFdmVudCcsIHtcclxuICAgIHZhbHVlOiBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcclxuICAgICAgaWYgKCF0bykgdG8gPSBmcm9tO1xyXG4gICAgICB0aGlzLnByb3BlcnR5KGZyb20sIHtcclxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgICB0aGlzLiRtZVt0b10gPSBjYjtcclxuICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICByZXR1cm4gQ2xhenplcjtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9DbGF6emVyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogQ2xhenplclxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcblxuICBmdW5jdGlvbiBDbGF6emVyKGNvbnN0cnVjdG9yKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjbGF6eicsIHsgdmFsdWU6IGNvbnN0cnVjdG9yIHx8IGZ1bmN0aW9uICgpIHt9IH0pO1xuICB9XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ2luaGVyaXQnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKHBhcmVudCkge1xuICAgICAgdmFyIHRtcCA9IGZ1bmN0aW9uIHRtcCgpIHt9O1xuICAgICAgdG1wLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7XG4gICAgICB0aGlzLmNsYXp6LnByb3RvdHlwZSA9IG5ldyB0bXAoKTtcbiAgICAgIHRoaXMuY2xhenoucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gdGhpcy5jbGF6ejtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3N0YXRpYycsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobmFtZSwgX3ZhbHVlKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jbGF6eiwgbmFtZSwge1xuICAgICAgICB2YWx1ZTogX3ZhbHVlXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3Byb3BlcnR5Jywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShuYW1lLCBvcHRzKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jbGF6ei5wcm90b3R5cGUsIG5hbWUsIG9wdHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnbWV0aG9kJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShuYW1lLCBmdW5jKSB7XG4gICAgICB0aGlzLnByb3BlcnR5KG5hbWUsIHtcbiAgICAgICAgdmFsdWU6IGZ1bmNcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnZ2V0dGVyJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShmcm9tLCB0bykge1xuICAgICAgaWYgKCF0bykgdG8gPSBmcm9tO1xuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLiRtZVt0b107XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnc2V0dGVyJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShmcm9tLCB0bykge1xuICAgICAgaWYgKCF0bykgdG8gPSBmcm9tO1xuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XG4gICAgICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy4kbWVbdG9dID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnaGFuZGxlckV2ZW50Jywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShmcm9tLCB0bykge1xuICAgICAgaWYgKCF0bykgdG8gPSBmcm9tO1xuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShjYikge1xuICAgICAgICAgIHRoaXMuJG1lW3RvXSA9IGNiO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHJldHVybiBDbGF6emVyO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9DbGF6emVyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYlJlcXVlc3RcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCUmVxdWVzdCA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NRXhjZXB0aW9uPyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSAoSURCT2JqZWN0U3RvcmUgb3IgSURCSW5kZXggb3IgSURCQ3Vyc29yKT8gc291cmNlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbj8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlJlcXVlc3RSZWFkeVN0YXRlICAgICAgICAgICAgICAgICAgICAgICByZWFkeVN0YXRlO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uc3VjY2VzcztcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uZXJyb3I7XHJcbiAqIH07XHJcbiAqXHJcbiAqIGVudW0gSURCUmVxdWVzdFJlYWR5U3RhdGUge1xyXG4gKiAgIFwicGVuZGluZ1wiLFxyXG4gKiAgIFwiZG9uZVwiXHJcbiAqIH07XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplcikgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXHJcbiAgLy8gJF9wcm9taXNlXHJcblxyXG4gIGNvbnN0IFJlYWR5U3RhdGUgPSBuZXcgQ2xhenplcih7fSlcclxuICAgICAgICAuc3RhdGljKCdQZW5kaW5nJywgICdwZW5kaW5nJylcclxuICAgICAgICAuc3RhdGljKCdEb25lJywgICAgICdkb25lJyk7XHJcbiAgXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJSZXF1ZXN0IChtZSkge1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBTdGF0aWNzXHJcbiAgLnN0YXRpYygnUmVhZHlTdGF0ZScsIFJlYWR5U3RhdGUuY2xhenopXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEdldHRlcnNcclxuICAuZ2V0dGVyKCckcmVzdWx0JywgJ3Jlc3VsdCcpXHJcbiAgLmdldHRlcignJGVycm9yJywgJ2Vycm9yJylcclxuICAuZ2V0dGVyKCckc291cmNlJywgJ3NvdXJjZScpXHJcbiAgLmdldHRlcignJHJlYWR5U3RhdGUnLCAncmVhZHlTdGF0ZScpXHJcbiAgLmdldHRlcignJHRyYW5zYWN0aW9uJywgJ3RyYW5zYWN0aW9uJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRXZlbnQgaGFuZGxlcnNcclxuICAuaGFuZGxlckV2ZW50KCckc3VjY2VzcycsICdvbnN1Y2Nlc3MnKVxyXG4gIC5oYW5kbGVyRXZlbnQoJyRmYWlsZWQnLCAgJ29uZXJyb3InKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9wZXJ0eVxyXG4gIC5wcm9wZXJ0eSgnJHByb21pc2UnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlmICh0aGl6LiRfcHJvbWlzZSkgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgICAgLy8gQ3JlYXIgcHJvbWlzZSBwYXJhIGVsIHJlcXVlc3RcclxuICAgICAgdGhpei4kX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdGhpei4kc3VjY2VzcyhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG5ldyBDbGF6emVyKHRoaXouJF9wcm9taXNlKS5zdGF0aWMoJyRyZXF1ZXN0JywgdGhpeiApO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlJlcXVlc3QuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJSZXF1ZXN0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQlJlcXVlc3QgOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGFueSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTUV4Y2VwdGlvbj8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgKElEQk9iamVjdFN0b3JlIG9yIElEQkluZGV4IG9yIElEQkN1cnNvcik/IHNvdXJjZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb24/ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJSZXF1ZXN0UmVhZHlTdGF0ZSAgICAgICAgICAgICAgICAgICAgICAgcmVhZHlTdGF0ZTtcclxuICogXHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnN1Y2Nlc3M7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiB9O1xyXG4gKlxyXG4gKiBlbnVtIElEQlJlcXVlc3RSZWFkeVN0YXRlIHtcclxuICogICBcInBlbmRpbmdcIixcclxuICogICBcImRvbmVcIlxyXG4gKiB9O1xyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJF9wcm9taXNlXG5cbiAgdmFyIFJlYWR5U3RhdGUgPSBuZXcgQ2xhenplcih7fSkuc3RhdGljKCdQZW5kaW5nJywgJ3BlbmRpbmcnKS5zdGF0aWMoJ0RvbmUnLCAnZG9uZScpO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiUmVxdWVzdChtZSkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTdGF0aWNzXG4gIC5zdGF0aWMoJ1JlYWR5U3RhdGUnLCBSZWFkeVN0YXRlLmNsYXp6KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRyZXN1bHQnLCAncmVzdWx0JykuZ2V0dGVyKCckZXJyb3InLCAnZXJyb3InKS5nZXR0ZXIoJyRzb3VyY2UnLCAnc291cmNlJykuZ2V0dGVyKCckcmVhZHlTdGF0ZScsICdyZWFkeVN0YXRlJykuZ2V0dGVyKCckdHJhbnNhY3Rpb24nLCAndHJhbnNhY3Rpb24nKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBFdmVudCBoYW5kbGVyc1xuICAuaGFuZGxlckV2ZW50KCckc3VjY2VzcycsICdvbnN1Y2Nlc3MnKS5oYW5kbGVyRXZlbnQoJyRmYWlsZWQnLCAnb25lcnJvcicpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFByb3BlcnR5XG4gIC5wcm9wZXJ0eSgnJHByb21pc2UnLCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlmICh0aGl6LiRfcHJvbWlzZSkgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xuXG4gICAgICAvLyBDcmVhciBwcm9taXNlIHBhcmEgZWwgcmVxdWVzdFxuICAgICAgdGhpei4kX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRoaXouJHN1Y2Nlc3MoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmVzb2x2ZShldmVudCk7XG4gICAgICAgIH0pLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmVqZWN0KGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgbmV3IENsYXp6ZXIodGhpei4kX3Byb21pc2UpLnN0YXRpYygnJHJlcXVlc3QnLCB0aGl6KTtcblxuICAgICAgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xuICAgIH1cblxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlJlcXVlc3QuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiT3BlbkRCUmVxdWVzdFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJPcGVuREJSZXF1ZXN0IDogSURCUmVxdWVzdCB7XHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmJsb2NrZWQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnVwZ3JhZGVuZWVkZWQ7XHJcbiAqIH07XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiUmVxdWVzdCkgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiT3BlbkRCUmVxdWVzdCAobWUpIHtcclxuICAgIGlkYlJlcXVlc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgLy8gTGxhbWFyIGFsIGNvbnN0cnVjdG9zIGRlbCBwYWRyZVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KGlkYlJlcXVlc3QpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEV2ZW50IGhhbmRsZXJzXHJcbiAgLmhhbmRsZXJFdmVudCgnJGJsb2NrZWQnLCAnb25ibG9ja2VkJylcclxuICAuaGFuZGxlckV2ZW50KCckdXBncmFkZW5lZWRlZCcsICdvbnVwZ3JhZGVuZWVkZWQnKVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJPcGVuREJSZXF1ZXN0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiT3BlbkRCUmVxdWVzdFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJPcGVuREJSZXF1ZXN0IDogSURCUmVxdWVzdCB7XHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmJsb2NrZWQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnVwZ3JhZGVuZWVkZWQ7XHJcbiAqIH07XHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiUmVxdWVzdCkge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiT3BlbkRCUmVxdWVzdChtZSkge1xuICAgIGlkYlJlcXVlc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgLy8gTGxhbWFyIGFsIGNvbnN0cnVjdG9zIGRlbCBwYWRyZVxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBIZXJlbmNpYVxuICAuaW5oZXJpdChpZGJSZXF1ZXN0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBFdmVudCBoYW5kbGVyc1xuICAuaGFuZGxlckV2ZW50KCckYmxvY2tlZCcsICdvbmJsb2NrZWQnKS5oYW5kbGVyRXZlbnQoJyR1cGdyYWRlbmVlZGVkJywgJ29udXBncmFkZW5lZWRlZCcpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiT3BlbkRCUmVxdWVzdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCRmFjdG9yeSB7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBvcGVuKERPTVN0cmluZyBuYW1lLCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGxvbmcgdmVyc2lvbik7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBkZWxldGVEYXRhYmFzZShET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgc2hvcnQgY21wKGFueSBmaXJzdCwgYW55IHNlY29uZCk7XHJcbiAqIH07XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkRhdGFiYXNlIDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgdW5zaWduZWQgbG9uZyBsb25nIHZlcnNpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgICAgICBvYmplY3RTdG9yZU5hbWVzO1xyXG4gKiBcclxuICogICBJREJUcmFuc2FjdGlvbiB0cmFuc2FjdGlvbigoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pIHN0b3JlTmFtZXMsIG9wdGlvbmFsIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlID0gXCJyZWFkb25seVwiKTtcclxuICogICB2b2lkICAgICAgICAgICBjbG9zZSgpO1xyXG4gKiAgIElEQk9iamVjdFN0b3JlIGNyZWF0ZU9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lLCBvcHRpb25hbCBJREJPYmplY3RTdG9yZVBhcmFtZXRlcnMgb3B0aW9ucyk7XHJcbiAqICAgdm9pZCAgICAgICAgICAgZGVsZXRlT2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYWJvcnQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmNsb3NlO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9udmVyc2lvbmNoYW5nZTtcclxuICogfTtcclxuICogXHJcbiAqIGRpY3Rpb25hcnkgSURCT2JqZWN0U3RvcmVQYXJhbWV0ZXJzIHtcclxuICogICAoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pPyBrZXlQYXRoID0gbnVsbDtcclxuICogICBib29sZWFuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvSW5jcmVtZW50ID0gZmFsc2U7XHJcbiAqIH07bWVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJFdmVudFRhcmdldCwgaWRiU3RvcmUsIGlkYk1vZGVsLCBpZGJPcGVuREJSZXF1ZXN0LCBpZGJUcmFuc2FjdGlvbiwgJGxvZykgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cclxuICBjb25zdCBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XHJcbiAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxyXG4gIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxyXG4gIGNvbnN0IElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcclxuICBjb25zdCBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XHJcbiAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcclxuICBcclxuICBpZiAoIWluZGV4ZWREQikge1xyXG4gICAgYWxlcnQoJ1N1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhcycpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRfbWVcclxuICAvLyAkb3BlbmVkXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3IgIFxyXG4gIGNvbnN0IGlkYiA9IGZ1bmN0aW9uIGlkYihuYW1lLCB2ZXJzaW9uLCBzb2NrZXQpIHtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKVxyXG4gICAgICAuc3RhdGljKCckbmFtZScsIG5hbWUpXHJcbiAgICAgIC5zdGF0aWMoJyR2ZXJzaW9uJywgdmVyc2lvbilcclxuICAgICAgLnN0YXRpYygnJHNvY2tldCcsIHNvY2tldCk7XHJcblxyXG4gIH07XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoaWRiKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KGlkYkV2ZW50VGFyZ2V0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9waWVkYWRlc1xyXG4gIC5wcm9wZXJ0eSgnJF91cGdyYWRlbmVlZGVkcycsIHsgdmFsdWU6W10gfSlcclxuICAucHJvcGVydHkoJyRfbW9kZWxzJywgeyB2YWx1ZToge30gfSlcclxuXHJcbiAgLnByb3BlcnR5KCckbWUnLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuJF9tZTtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uIChtZSkge1xyXG4gICAgICB0aGlzLiRfbWUgPSBtZTtcclxuICAgICAgY29uc3QgZSA9IG5ldyBFdmVudCgnb3BlbmVkJyk7XHJcbiAgICAgIC8vIGUudGFyZ2V0ID0gdGhpcztcclxuICAgICAgdGhpcy4kZW1pdChlKTtcclxuICAgIH1cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJG9iamVjdFN0b3JlTmFtZXMnLCAnb2JqZWN0U3RvcmVOYW1lcycpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRvcGVuJywgZnVuY3Rpb24gKG5hbWUsIHZlcnNpb24pIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYk9wZW5EQlJlcXVlc3QoaW5kZXhlZERCLm9wZW4obmFtZSwgdmVyc2lvbikpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZHJvcCcsIGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICBcclxuICAgIHJldHVybiBuZXcgaWRiT3BlbkRCUmVxdWVzdChpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UobmFtZSkpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckY21wJywgZnVuY3Rpb24gKGZpcnN0LCBzZWNvbmQpIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIGluZGV4ZWREQi5jbXAoZmlyc3QsIHNlY29uZCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEV2ZW50IGhhbmRsZXJzXHJcbiAgLm1ldGhvZCgnJGFib3J0ZWQnLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICByZXR1cm4gdGhpei4kYmluZCgnb3BlbmVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGl6LiRtZS5vbmFib3J0ID0gY2I7XHJcbiAgICB9KTtcclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckY2xvc2VkJywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgcmV0dXJuIHRoaXouJGJpbmQoJ29wZW5lZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpei4kbWUub25jbG9zZSA9IGNiO1xyXG4gICAgfSk7XHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGVycm9yJywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgcmV0dXJuIHRoaXouJGJpbmQoJ29wZW5lZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpei4kbWUub25lcnJvciA9IGNiO1xyXG4gICAgfSk7XHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHZlcnNpb25DaGFuZ2VkJywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgcmV0dXJuIHRoaXouJGJpbmQoJ29wZW5lZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpei4kbWUub252ZXJzaW9uY2hhbmdlID0gY2I7XHJcbiAgICB9KTtcclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckdXBncmFkZW5lZWRlZCcsIGZ1bmN0aW9uIChjYikge1xyXG4gICAgXHJcbiAgICB0aGlzLiRfdXBncmFkZW5lZWRlZHMucHVzaChjYik7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGF1dG9taWdyYXRpb24nLCBmdW5jdGlvbiAoYWxsTWlncmF0aW9ucykge1xyXG5cclxuICAgIHJldHVybiB0aGlzLiR1cGdyYWRlbmVlZGVkKGZ1bmN0aW9uICh0aGl6LCBvcGVuUmVxdWVzdCwgZXZlbnQpIHtcclxuICAgICAgT2JqZWN0LmtleXMoYWxsTWlncmF0aW9ucykubWFwKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XHJcblxyXG4gICAgICAgIGlmIChldmVudC5vbGRWZXJzaW9uIDwgdmVyc2lvbiAmJiB2ZXJzaW9uIDw9IGV2ZW50Lm5ld1ZlcnNpb24pIHtcclxuXHJcbiAgICAgICAgICBjb25zdCBtaWdyYXRpb25zID0gQXJyYXkuaXNBcnJheShhbGxNaWdyYXRpb25zW3ZlcnNpb25dKT9cclxuICAgICAgICAgICAgYWxsTWlncmF0aW9uc1t2ZXJzaW9uXTpbYWxsTWlncmF0aW9uc1t2ZXJzaW9uXV07XHJcblxyXG4gICAgICAgICAgJGxvZy5sb2coJ21pZ3JhdGlvbiB2Jyt2ZXJzaW9uKycgc3RhcnRzJyk7XHJcbiAgICAgICAgICBtaWdyYXRpb25zLm1hcChmdW5jdGlvbiAobWlncmF0aW9uKSB7XHJcbiAgICAgICAgICAgIG1pZ3JhdGlvbih0aGl6LCBvcGVuUmVxdWVzdCwgZXZlbnQpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckb3BlbicsIGZ1bmN0aW9uIChjYiwgY2JFcnIpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgbGV0IGxhc3RScSA9IG51bGw7XHJcbiAgICBsZXQgbGFzdEV2ZW50ID0gbnVsbDtcclxuXHJcbiAgICBpZiAoIXRoaXouJG9wZW5lZCkge1xyXG5cclxuICAgICAgdGhpei4kb3BlbmVkID0gKGxhc3RScSA9IGlkYi4kb3Blbih0aGl6LiRuYW1lLCB0aGl6LiR2ZXJzaW9uKVxyXG4gICAgICAgIC4kdXBncmFkZW5lZWRlZChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICRsb2cubG9nKCd1cGdyYWRlbmVlZGVkIGlkYjogJyt0aGl6LiRuYW1lKycgdicrdGhpei4kdmVyc2lvbik7XHJcbiAgICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgICB0aGl6LiRfdXBncmFkZW5lZWRlZHMubWFwKGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgICBjYi5hcHBseSh0aGl6LCBbdGhpeiwgbGFzdFJxLCBldmVudF0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkpXHJcblxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICRsb2cubG9nKCdvcGVuZWQgaWRiOiAnK3RoaXouJG5hbWUrJyB2Jyt0aGl6LiR2ZXJzaW9uKTtcclxuICAgICAgICAgIGlmICh0aGl6LiRtZSAhPT0gZXZlbnQudGFyZ2V0LnJlc3VsdCl7XHJcbiAgICAgICAgICAgIHRoaXouJG1lID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxhc3RFdmVudCA9IGV2ZW50O1xyXG4gICAgICAgICAgaWYgKGNiKSBjYih0aGl6LCBsYXN0UnEsIGV2ZW50KTtcclxuICAgICAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgbGFzdFJxID0gbnVsbDtcclxuICAgICAgICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XHJcbiAgICAgICAgICBpZiAoY2JFcnIpIGNiRXJyKHRoaXosIGxhc3RScSwgZXZlbnQpO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSBlbHNlIGlmIChjYikge1xyXG5cclxuICAgICAgY2IodGhpeiwgbGFzdFJxLCBsYXN0RXZlbnQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpei4kb3BlbmVkO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZHJvcCcsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgIGNvbnN0IHJxID0gaWRiLiRkcm9wKHRoaXouJG5hbWUpXHJcbiAgICAgICAgLiRzdWNjZXNzKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVzb2x2ZSh0aGl6KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICBpZiAoY2IpIGNiKHJxKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNsb3NlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHRoaXMuJG9wZW5lZCA9IG51bGw7XHJcbiAgICB0aGlzLiRtZS5jbG9zZSgpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gICAgXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNyZWF0ZVN0b3JlJywgZnVuY3Rpb24gKG5hbWUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLmNyZWF0ZU9iamVjdFN0b3JlKG5hbWUsIG9wdGlvbnMpKTtcclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRkcm9wU3RvcmUnLCBmdW5jdGlvbiAobmFtZSkge1xyXG5cclxuICAgIHRoaXMuJG1lLmRlbGV0ZU9iamVjdFN0b3JlKG5hbWUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckbW9kZWwnLCBmdW5jdGlvbiAobmFtZSwgc29ja2V0KSB7XHJcblxyXG4gICAgLy8gU2kgZXhpc3RlIGVsIG1vZGVsbyByZXRvcm5hcmxvXHJcbiAgICBpZih0aGlzLiRfbW9kZWxzW25hbWVdKSByZXR1cm4gdGhpcy4kX21vZGVsc1tuYW1lXTtcclxuXHJcbiAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsbyB5IGd1YXJkYXJsb1xyXG4gICAgcmV0dXJuIHRoaXMuJF9tb2RlbHNbbmFtZV0gPSBpZGJNb2RlbCh0aGlzLCBuYW1lLCBzb2NrZXQgfHwgdGhpcy4kc29ja2V0KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHRyYW5zYWN0aW9uJywgZnVuY3Rpb24gKHN0b3JlTmFtZXMsIG1vZGUpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBcclxuICAgIHJldHVybiB0aGl6LiRvcGVuKClcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHRoaXopIHtcclxuICAgICAgICByZXR1cm4gbmV3IGlkYlRyYW5zYWN0aW9uKHRoaXouJG1lLnRyYW5zYWN0aW9uKHN0b3JlTmFtZXMsIG1vZGUpKTtcclxuICAgICAgfSk7XHJcblxyXG4gIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHN0b3JlJywgZnVuY3Rpb24gKHN0b3JlTmFtZXMpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoc3RvcmVOYW1lcykpIHN0b3JlTmFtZXMgPSBbc3RvcmVOYW1lc107XHJcblxyXG4gICAgZnVuY3Rpb24gYWN0aW9uKG1vZGUpIHtcclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGl6LiR0cmFuc2FjdGlvbihzdG9yZU5hbWVzLCBtb2RlKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHR4KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3Jlc09iaiA9IHt9O1xyXG4gICAgICAgICAgICBjb25zdCBzdG9yZXMgPSBzdG9yZU5hbWVzLm1hcChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHN0b3Jlc09ialtzdG9yZU5hbWVdID0gdHguJHN0b3JlKHN0b3JlTmFtZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoY2IpIGNiLmFwcGx5KHRoaXosIHN0b3Jlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdG9yZXNPYmo7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBDbGF6emVyKHt9KVxyXG4gICAgICAuc3RhdGljKCckcmVhZGVyJywgYWN0aW9uKGlkYlRyYW5zYWN0aW9uLlRyYW5zYWN0aW9uTW9kZS5SZWFkT25seSkpXHJcbiAgICAgIC5zdGF0aWMoJyR3cml0ZXInLCBhY3Rpb24oaWRiVHJhbnNhY3Rpb24uVHJhbnNhY3Rpb25Nb2RlLlJlYWRXcml0ZSkpXHJcbiAgICAgIC5jbGF6elxyXG5cclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCRmFjdG9yeSB7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBvcGVuKERPTVN0cmluZyBuYW1lLCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGxvbmcgdmVyc2lvbik7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBkZWxldGVEYXRhYmFzZShET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgc2hvcnQgY21wKGFueSBmaXJzdCwgYW55IHNlY29uZCk7XHJcbiAqIH07XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkRhdGFiYXNlIDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgdW5zaWduZWQgbG9uZyBsb25nIHZlcnNpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgICAgICBvYmplY3RTdG9yZU5hbWVzO1xyXG4gKiBcclxuICogICBJREJUcmFuc2FjdGlvbiB0cmFuc2FjdGlvbigoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pIHN0b3JlTmFtZXMsIG9wdGlvbmFsIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlID0gXCJyZWFkb25seVwiKTtcclxuICogICB2b2lkICAgICAgICAgICBjbG9zZSgpO1xyXG4gKiAgIElEQk9iamVjdFN0b3JlIGNyZWF0ZU9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lLCBvcHRpb25hbCBJREJPYmplY3RTdG9yZVBhcmFtZXRlcnMgb3B0aW9ucyk7XHJcbiAqICAgdm9pZCAgICAgICAgICAgZGVsZXRlT2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYWJvcnQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmNsb3NlO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9udmVyc2lvbmNoYW5nZTtcclxuICogfTtcclxuICogXHJcbiAqIGRpY3Rpb25hcnkgSURCT2JqZWN0U3RvcmVQYXJhbWV0ZXJzIHtcclxuICogICAoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pPyBrZXlQYXRoID0gbnVsbDtcclxuICogICBib29sZWFuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvSW5jcmVtZW50ID0gZmFsc2U7XHJcbiAqIH07bWVcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJFdmVudFRhcmdldCwgaWRiU3RvcmUsIGlkYk1vZGVsLCBpZGJPcGVuREJSZXF1ZXN0LCBpZGJUcmFuc2FjdGlvbiwgJGxvZykge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cblxuICB2YXIgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xuICAvLyBObyB1c2UgXCJjb25zdCBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXG4gIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxuICB2YXIgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xuICB2YXIgSURCS2V5UmFuZ2UgPSB3aW5kb3cuSURCS2V5UmFuZ2UgfHwgd2luZG93LndlYmtpdElEQktleVJhbmdlIHx8IHdpbmRvdy5tc0lEQktleVJhbmdlO1xuICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxuXG4gIGlmICghaW5kZXhlZERCKSB7XG4gICAgYWxlcnQoJ1N1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhcycpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxuICAvLyAkX21lXG4gIC8vICRvcGVuZWRcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3IgIFxuICB2YXIgaWRiID0gZnVuY3Rpb24gaWRiKG5hbWUsIHZlcnNpb24sIHNvY2tldCkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbmFtZScsIG5hbWUpLnN0YXRpYygnJHZlcnNpb24nLCB2ZXJzaW9uKS5zdGF0aWMoJyRzb2NrZXQnLCBzb2NrZXQpO1xuICB9O1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoaWRiKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBIZXJlbmNpYVxuICAuaW5oZXJpdChpZGJFdmVudFRhcmdldClcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUHJvcGllZGFkZXNcbiAgLnByb3BlcnR5KCckX3VwZ3JhZGVuZWVkZWRzJywgeyB2YWx1ZTogW10gfSkucHJvcGVydHkoJyRfbW9kZWxzJywgeyB2YWx1ZToge30gfSkucHJvcGVydHkoJyRtZScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRfbWU7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChtZSkge1xuICAgICAgdGhpcy4kX21lID0gbWU7XG4gICAgICB2YXIgZSA9IG5ldyBFdmVudCgnb3BlbmVkJyk7XG4gICAgICAvLyBlLnRhcmdldCA9IHRoaXM7XG4gICAgICB0aGlzLiRlbWl0KGUpO1xuICAgIH1cbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR2V0dGVyc1xuICAuZ2V0dGVyKCckb2JqZWN0U3RvcmVOYW1lcycsICdvYmplY3RTdG9yZU5hbWVzJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLnN0YXRpYygnJG9wZW4nLCBmdW5jdGlvbiAobmFtZSwgdmVyc2lvbikge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJPcGVuREJSZXF1ZXN0KGluZGV4ZWREQi5vcGVuKG5hbWUsIHZlcnNpb24pKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLnN0YXRpYygnJGRyb3AnLCBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJPcGVuREJSZXF1ZXN0KGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShuYW1lKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5zdGF0aWMoJyRjbXAnLCBmdW5jdGlvbiAoZmlyc3QsIHNlY29uZCkge1xuXG4gICAgcmV0dXJuIGluZGV4ZWREQi5jbXAoZmlyc3QsIHNlY29uZCk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGhhbmRsZXJzXG4gIC5tZXRob2QoJyRhYm9ydGVkJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIHJldHVybiB0aGl6LiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGl6LiRtZS5vbmFib3J0ID0gY2I7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjbG9zZWQnLCBmdW5jdGlvbiAoY2IpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgcmV0dXJuIHRoaXouJGJpbmQoJ29wZW5lZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXouJG1lLm9uY2xvc2UgPSBjYjtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGVycm9yJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIHJldHVybiB0aGl6LiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGl6LiRtZS5vbmVycm9yID0gY2I7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyR2ZXJzaW9uQ2hhbmdlZCcsIGZ1bmN0aW9uIChjYikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICByZXR1cm4gdGhpei4kYmluZCgnb3BlbmVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpei4kbWUub252ZXJzaW9uY2hhbmdlID0gY2I7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyR1cGdyYWRlbmVlZGVkJywgZnVuY3Rpb24gKGNiKSB7XG5cbiAgICB0aGlzLiRfdXBncmFkZW5lZWRlZHMucHVzaChjYik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRhdXRvbWlncmF0aW9uJywgZnVuY3Rpb24gKGFsbE1pZ3JhdGlvbnMpIHtcblxuICAgIHJldHVybiB0aGlzLiR1cGdyYWRlbmVlZGVkKGZ1bmN0aW9uICh0aGl6LCBvcGVuUmVxdWVzdCwgZXZlbnQpIHtcbiAgICAgIE9iamVjdC5rZXlzKGFsbE1pZ3JhdGlvbnMpLm1hcChmdW5jdGlvbiAodmVyc2lvbikge1xuXG4gICAgICAgIGlmIChldmVudC5vbGRWZXJzaW9uIDwgdmVyc2lvbiAmJiB2ZXJzaW9uIDw9IGV2ZW50Lm5ld1ZlcnNpb24pIHtcblxuICAgICAgICAgIHZhciBtaWdyYXRpb25zID0gQXJyYXkuaXNBcnJheShhbGxNaWdyYXRpb25zW3ZlcnNpb25dKSA/IGFsbE1pZ3JhdGlvbnNbdmVyc2lvbl0gOiBbYWxsTWlncmF0aW9uc1t2ZXJzaW9uXV07XG5cbiAgICAgICAgICAkbG9nLmxvZygnbWlncmF0aW9uIHYnICsgdmVyc2lvbiArICcgc3RhcnRzJyk7XG4gICAgICAgICAgbWlncmF0aW9ucy5tYXAoZnVuY3Rpb24gKG1pZ3JhdGlvbikge1xuICAgICAgICAgICAgbWlncmF0aW9uKHRoaXosIG9wZW5SZXF1ZXN0LCBldmVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckb3BlbicsIGZ1bmN0aW9uIChjYiwgY2JFcnIpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICB2YXIgbGFzdFJxID0gbnVsbDtcbiAgICB2YXIgbGFzdEV2ZW50ID0gbnVsbDtcblxuICAgIGlmICghdGhpei4kb3BlbmVkKSB7XG5cbiAgICAgIHRoaXouJG9wZW5lZCA9IChsYXN0UnEgPSBpZGIuJG9wZW4odGhpei4kbmFtZSwgdGhpei4kdmVyc2lvbikuJHVwZ3JhZGVuZWVkZWQoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICRsb2cubG9nKCd1cGdyYWRlbmVlZGVkIGlkYjogJyArIHRoaXouJG5hbWUgKyAnIHYnICsgdGhpei4kdmVyc2lvbik7XG4gICAgICAgIHRoaXouJG1lID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgdGhpei4kX3VwZ3JhZGVuZWVkZWRzLm1hcChmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICBjYi5hcHBseSh0aGl6LCBbdGhpeiwgbGFzdFJxLCBldmVudF0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAkbG9nLmxvZygnb3BlbmVkIGlkYjogJyArIHRoaXouJG5hbWUgKyAnIHYnICsgdGhpei4kdmVyc2lvbik7XG4gICAgICAgIGlmICh0aGl6LiRtZSAhPT0gZXZlbnQudGFyZ2V0LnJlc3VsdCkge1xuICAgICAgICAgIHRoaXouJG1lID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBsYXN0RXZlbnQgPSBldmVudDtcbiAgICAgICAgaWYgKGNiKSBjYih0aGl6LCBsYXN0UnEsIGV2ZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgbGFzdFJxID0gbnVsbDtcbiAgICAgICAgdGhpei4kb3BlbmVkID0gbnVsbDtcbiAgICAgICAgaWYgKGNiRXJyKSBjYkVycih0aGl6LCBsYXN0UnEsIGV2ZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGNiKSB7XG5cbiAgICAgIGNiKHRoaXosIGxhc3RScSwgbGFzdEV2ZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpei4kb3BlbmVkO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZHJvcCcsIGZ1bmN0aW9uIChjYikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICB0aGl6LiRvcGVuZWQgPSBudWxsO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgdmFyIHJxID0gaWRiLiRkcm9wKHRoaXouJG5hbWUpLiRzdWNjZXNzKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXNvbHZlKHRoaXopO1xuICAgICAgfSkuJGZhaWxlZChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgcmVqZWN0KGV2ZW50KTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGNiKSBjYihycSk7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjbG9zZScsIGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuJG9wZW5lZCA9IG51bGw7XG4gICAgdGhpcy4kbWUuY2xvc2UoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckY3JlYXRlU3RvcmUnLCBmdW5jdGlvbiAobmFtZSwgb3B0aW9ucykge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJTdG9yZSh0aGlzLiRtZS5jcmVhdGVPYmplY3RTdG9yZShuYW1lLCBvcHRpb25zKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRkcm9wU3RvcmUnLCBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgdGhpcy4kbWUuZGVsZXRlT2JqZWN0U3RvcmUobmFtZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJG1vZGVsJywgZnVuY3Rpb24gKG5hbWUsIHNvY2tldCkge1xuXG4gICAgLy8gU2kgZXhpc3RlIGVsIG1vZGVsbyByZXRvcm5hcmxvXG4gICAgaWYgKHRoaXMuJF9tb2RlbHNbbmFtZV0pIHJldHVybiB0aGlzLiRfbW9kZWxzW25hbWVdO1xuXG4gICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG8geSBndWFyZGFybG9cbiAgICByZXR1cm4gdGhpcy4kX21vZGVsc1tuYW1lXSA9IGlkYk1vZGVsKHRoaXMsIG5hbWUsIHNvY2tldCB8fCB0aGlzLiRzb2NrZXQpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckdHJhbnNhY3Rpb24nLCBmdW5jdGlvbiAoc3RvcmVOYW1lcywgbW9kZSkge1xuICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgIHJldHVybiB0aGl6LiRvcGVuKCkudGhlbihmdW5jdGlvbiAodGhpeikge1xuICAgICAgcmV0dXJuIG5ldyBpZGJUcmFuc2FjdGlvbih0aGl6LiRtZS50cmFuc2FjdGlvbihzdG9yZU5hbWVzLCBtb2RlKSk7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRzdG9yZScsIGZ1bmN0aW9uIChzdG9yZU5hbWVzKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShzdG9yZU5hbWVzKSkgc3RvcmVOYW1lcyA9IFtzdG9yZU5hbWVzXTtcblxuICAgIGZ1bmN0aW9uIGFjdGlvbihtb2RlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGNiKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXouJHRyYW5zYWN0aW9uKHN0b3JlTmFtZXMsIG1vZGUpLnRoZW4oZnVuY3Rpb24gKHR4KSB7XG4gICAgICAgICAgdmFyIHN0b3Jlc09iaiA9IHt9O1xuICAgICAgICAgIHZhciBzdG9yZXMgPSBzdG9yZU5hbWVzLm1hcChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RvcmVzT2JqW3N0b3JlTmFtZV0gPSB0eC4kc3RvcmUoc3RvcmVOYW1lKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoY2IpIGNiLmFwcGx5KHRoaXosIHN0b3Jlcyk7XG4gICAgICAgICAgcmV0dXJuIHN0b3Jlc09iajtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ2xhenplcih7fSkuc3RhdGljKCckcmVhZGVyJywgYWN0aW9uKGlkYlRyYW5zYWN0aW9uLlRyYW5zYWN0aW9uTW9kZS5SZWFkT25seSkpLnN0YXRpYygnJHdyaXRlcicsIGFjdGlvbihpZGJUcmFuc2FjdGlvbi5UcmFuc2FjdGlvbk1vZGUuUmVhZFdyaXRlKSkuY2xheno7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYlN0b3JlXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQk9iamVjdFN0b3JlIHtcclxuICogICAgICAgICAgICBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAga2V5UGF0aDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgaW5kZXhOYW1lcztcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb24gdHJhbnNhY3Rpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGJvb2xlYW4gICAgICAgIGF1dG9JbmNyZW1lbnQ7XHJcbiAqIFxyXG4gKiAgIElEQlJlcXVlc3QgcHV0KGFueSB2YWx1ZSwgb3B0aW9uYWwgYW55IGtleSk7XHJcbiAqICAgSURCUmVxdWVzdCBhZGQoYW55IHZhbHVlLCBvcHRpb25hbCBhbnkga2V5KTtcclxuICogICBJREJSZXF1ZXN0IGRlbGV0ZShhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgY2xlYXIoKTtcclxuICogICBJREJJbmRleCAgIGluZGV4KERPTVN0cmluZyBuYW1lKTtcclxuICogICBJREJJbmRleCAgIGNyZWF0ZUluZGV4KERPTVN0cmluZyBuYW1lLCAoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pIGtleVBhdGgsIG9wdGlvbmFsIElEQkluZGV4UGFyYW1ldGVycyBvcHRpb25zKTtcclxuICogICB2b2lkICAgICAgIGRlbGV0ZUluZGV4KERPTVN0cmluZyBpbmRleE5hbWUpO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZGljdGlvbmFyeSBJREJJbmRleFBhcmFtZXRlcnMge1xyXG4gKiAgIGJvb2xlYW4gdW5pcXVlID0gZmFsc2U7XHJcbiAqICAgYm9vbGVhbiBtdWx0aUVudHJ5ID0gZmFsc2U7XHJcbiAqIH07XHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QsIGlkYkluZGV4LCBpZGJDb25zdWx0YW50LCAkbG9nKSB7ICduZ0luamVjdCc7XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiU3RvcmUgKG1lKSB7XHJcblxyXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoaWRiQ29uc3VsdGFudClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gR2V0dGVyc1xyXG4gIC5nZXR0ZXIoJyRrZXlQYXRoJywgJ2tleVBhdGgnKVxyXG4gIC5nZXR0ZXIoJyRpbmRleE5hbWVzJywgJ2luZGV4TmFtZXMnKVxyXG4gIC5nZXR0ZXIoJyR0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpXHJcbiAgLmdldHRlcignJGF1dG9JbmNyZW1lbnQnLCAnYXV0b0luY3JlbWVudCcpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRwdXQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5wdXQodmFsdWUsIGtleSkpXHJcbiAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRhZGQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5hZGQodmFsdWUsIGtleSkpXHJcbiAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRkZWxldGUnLCBmdW5jdGlvbiAocXVlcnkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZGVsZXRlKHF1ZXJ5KSlcclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge30pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckY2xlYXInLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNsZWFyKCkpXHJcbiAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAudGhlbihmdW5jdGlvbihldmVudCl7fSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRpbmRleCcsIGZ1bmN0aW9uIChuYW1lKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJJbmRleCh0aGlzLiRtZS5pbmRleChuYW1lKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRjcmVhdGVJbmRleCcsIGZ1bmN0aW9uIChmaWVsZHMsIG5hbWUsIG9wdGlvbnMpIHtcclxuICAgIGlmICh0eXBlb2YgZmllbGRzID09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGZpZWxkcyA9IFtmaWVsZHNdO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09ICdvYmplY3QnKXtcclxuICAgICAgb3B0aW9ucyA9IG5hbWU7XHJcbiAgICAgIG5hbWUgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKCFuYW1lKSB7XHJcbiAgICAgIG5hbWUgPSBmaWVsZHMuc29ydCgpLmpvaW4oJ18nKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYkluZGV4KHRoaXMuJG1lLmNyZWF0ZUluZGV4KG5hbWUsIGZpZWxkcywgb3B0aW9ucykpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZGVsZXRlSW5kZXgnLCBmdW5jdGlvbiAoaW5kZXhOYW1lKSB7XHJcbiAgICBpZiAoQXJyYXkuYW5ndWxhci5pc0FycmF5KGluZGV4TmFtZSkpIHtcclxuICAgICAgaW5kZXhOYW1lID0gaW5kZXhOYW1lLnNvcnQoKS5qb2luKCdfJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLiRtZS5kZWxldGVJbmRleChpbmRleE5hbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiU3RvcmUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJTdG9yZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJPYmplY3RTdG9yZSB7XHJcbiAqICAgICAgICAgICAgYXR0cmlidXRlIERPTVN0cmluZyAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGFueSAgICAgICAgICAgIGtleVBhdGg7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgIGluZGV4TmFtZXM7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uIHRyYW5zYWN0aW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICBhdXRvSW5jcmVtZW50O1xyXG4gKiBcclxuICogICBJREJSZXF1ZXN0IHB1dChhbnkgdmFsdWUsIG9wdGlvbmFsIGFueSBrZXkpO1xyXG4gKiAgIElEQlJlcXVlc3QgYWRkKGFueSB2YWx1ZSwgb3B0aW9uYWwgYW55IGtleSk7XHJcbiAqICAgSURCUmVxdWVzdCBkZWxldGUoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGNsZWFyKCk7XHJcbiAqICAgSURCSW5kZXggICBpbmRleChET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgSURCSW5kZXggICBjcmVhdGVJbmRleChET01TdHJpbmcgbmFtZSwgKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KSBrZXlQYXRoLCBvcHRpb25hbCBJREJJbmRleFBhcmFtZXRlcnMgb3B0aW9ucyk7XHJcbiAqICAgdm9pZCAgICAgICBkZWxldGVJbmRleChET01TdHJpbmcgaW5kZXhOYW1lKTtcclxuICogfTtcclxuICogXHJcbiAqIGRpY3Rpb25hcnkgSURCSW5kZXhQYXJhbWV0ZXJzIHtcclxuICogICBib29sZWFuIHVuaXF1ZSA9IGZhbHNlO1xyXG4gKiAgIGJvb2xlYW4gbXVsdGlFbnRyeSA9IGZhbHNlO1xyXG4gKiB9O1xyXG4gKiBcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QsIGlkYkluZGV4LCBpZGJDb25zdWx0YW50LCAkbG9nKSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJTdG9yZShtZSkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KGlkYkNvbnN1bHRhbnQpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdldHRlcnNcbiAgLmdldHRlcignJGtleVBhdGgnLCAna2V5UGF0aCcpLmdldHRlcignJGluZGV4TmFtZXMnLCAnaW5kZXhOYW1lcycpLmdldHRlcignJHRyYW5zYWN0aW9uJywgJ3RyYW5zYWN0aW9uJykuZ2V0dGVyKCckYXV0b0luY3JlbWVudCcsICdhdXRvSW5jcmVtZW50JylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHB1dCcsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUucHV0KHZhbHVlLCBrZXkpKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRhZGQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmFkZCh2YWx1ZSwga2V5KSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZGVsZXRlJywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZGVsZXRlKHF1ZXJ5KSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHt9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGNsZWFyJywgZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNsZWFyKCkpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7fSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRpbmRleCcsIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYkluZGV4KHRoaXMuJG1lLmluZGV4KG5hbWUpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGNyZWF0ZUluZGV4JywgZnVuY3Rpb24gKGZpZWxkcywgbmFtZSwgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YgZmllbGRzID09ICdzdHJpbmcnKSB7XG4gICAgICBmaWVsZHMgPSBbZmllbGRzXTtcbiAgICB9XG4gICAgaWYgKCh0eXBlb2YgbmFtZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YobmFtZSkpID09ICdvYmplY3QnKSB7XG4gICAgICBvcHRpb25zID0gbmFtZTtcbiAgICAgIG5hbWUgPSBudWxsO1xuICAgIH1cbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIG5hbWUgPSBmaWVsZHMuc29ydCgpLmpvaW4oJ18nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IGlkYkluZGV4KHRoaXMuJG1lLmNyZWF0ZUluZGV4KG5hbWUsIGZpZWxkcywgb3B0aW9ucykpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZGVsZXRlSW5kZXgnLCBmdW5jdGlvbiAoaW5kZXhOYW1lKSB7XG4gICAgaWYgKEFycmF5LmFuZ3VsYXIuaXNBcnJheShpbmRleE5hbWUpKSB7XG4gICAgICBpbmRleE5hbWUgPSBpbmRleE5hbWUuc29ydCgpLmpvaW4oJ18nKTtcbiAgICB9XG4gICAgdGhpcy4kbWUuZGVsZXRlSW5kZXgoaW5kZXhOYW1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJTdG9yZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJJbmRleFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJJbmRleCB7XHJcbiAqICAgICAgICAgICAgYXR0cmlidXRlIERPTVN0cmluZyAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQk9iamVjdFN0b3JlIG9iamVjdFN0b3JlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBhbnkgICAgICAgICAgICBrZXlQYXRoO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICBtdWx0aUVudHJ5O1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICB1bmlxdWU7XHJcbiAqIFxyXG4gKiAgIElEQlJlcXVlc3QgZ2V0KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRLZXkoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbChvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0QWxsS2V5cyhvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgY291bnQob3B0aW9uYWwgYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5DdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiAgIElEQlJlcXVlc3Qgb3BlbktleUN1cnNvcihvcHRpb25hbCBhbnkgcXVlcnksIG9wdGlvbmFsIElEQkN1cnNvckRpcmVjdGlvbiBkaXJlY3Rpb24gPSBcIm5leHRcIik7XHJcbiAqIH07XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiQ29uc3VsdGFudCkgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiSW5kZXggKG1lKSB7XHJcblxyXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoaWRiQ29uc3VsdGFudClcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJG9iamVjdFN0b3JlJywgJ29iamVjdFN0b3JlJylcclxuICAuZ2V0dGVyKCcka2V5UGF0aCcsICAgICAna2V5UGF0aCcpXHJcbiAgLmdldHRlcignJG11bHRpRW50cnknLCAgJ211bHRpRW50cnknKVxyXG4gIC5nZXR0ZXIoJyR1bmlxdWUnLCAgICAgICd1bmlxdWUnKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiSW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJJbmRleFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJJbmRleCB7XHJcbiAqICAgICAgICAgICAgYXR0cmlidXRlIERPTVN0cmluZyAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQk9iamVjdFN0b3JlIG9iamVjdFN0b3JlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBhbnkgICAgICAgICAgICBrZXlQYXRoO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICBtdWx0aUVudHJ5O1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICB1bmlxdWU7XHJcbiAqIFxyXG4gKiAgIElEQlJlcXVlc3QgZ2V0KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRLZXkoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbChvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0QWxsS2V5cyhvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgY291bnQob3B0aW9uYWwgYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5DdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiAgIElEQlJlcXVlc3Qgb3BlbktleUN1cnNvcihvcHRpb25hbCBhbnkgcXVlcnksIG9wdGlvbmFsIElEQkN1cnNvckRpcmVjdGlvbiBkaXJlY3Rpb24gPSBcIm5leHRcIik7XHJcbiAqIH07XHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiQ29uc3VsdGFudCkge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiSW5kZXgobWUpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBIZXJlbmNpYVxuICAuaW5oZXJpdChpZGJDb25zdWx0YW50KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRvYmplY3RTdG9yZScsICdvYmplY3RTdG9yZScpLmdldHRlcignJGtleVBhdGgnLCAna2V5UGF0aCcpLmdldHRlcignJG11bHRpRW50cnknLCAnbXVsdGlFbnRyeScpLmdldHRlcignJHVuaXF1ZScsICd1bmlxdWUnKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYkluZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYkV2ZW50VGFyZ2V0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkV2ZW50VGFyZ2V0ICgpIHt9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByb3BpZWRhZGVzXHJcbiAgLnByb3BlcnR5KCckX2xpc3RlbmVycycsIHsgdmFsdWU6IFtdIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gbWV0aG9kXHJcbiAgLm1ldGhvZCgnJGJpbmQnLCBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcclxuICAgIGlmKCEodHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSkge1xyXG4gICAgICB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdID0gW107XHJcbiAgICB9XHJcbiAgICB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdLnB1c2goY2FsbGJhY2spO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBtZXRob2RcclxuICAubWV0aG9kKCckdW5iaW5kICcsIGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaykge1xyXG4gICAgaWYodHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSB7XHJcbiAgICAgIHZhciBzdGFjayA9IHRoaXMuJF9saXN0ZW5lcnNbdHlwZV07XHJcbiAgICAgIGZvcih2YXIgaSA9IDAsIGwgPSBzdGFjay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZihzdGFja1tpXSA9PT0gY2FsbGJhY2spe1xyXG4gICAgICAgICAgc3RhY2suc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuJHVuYmluZCh0eXBlLCBjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIG1ldGhvZFxyXG4gIC5tZXRob2QoJyRlbWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZihldmVudC50eXBlIGluIHRoaXMuJF9saXN0ZW5lcnMpIHtcclxuICAgICAgdmFyIHN0YWNrID0gdGhpcy4kX2xpc3RlbmVyc1tldmVudC50eXBlXTtcclxuICAgICAgZm9yKHZhciBpID0gMCwgbCA9IHN0YWNrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgc3RhY2tbaV0uY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJFdmVudFRhcmdldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYkV2ZW50VGFyZ2V0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkV2ZW50VGFyZ2V0KCkge30pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFByb3BpZWRhZGVzXG4gIC5wcm9wZXJ0eSgnJF9saXN0ZW5lcnMnLCB7IHZhbHVlOiBbXSB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBtZXRob2RcbiAgLm1ldGhvZCgnJGJpbmQnLCBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoISh0eXBlIGluIHRoaXMuJF9saXN0ZW5lcnMpKSB7XG4gICAgICB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgfVxuICAgIHRoaXMuJF9saXN0ZW5lcnNbdHlwZV0ucHVzaChjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIG1ldGhvZFxuICAubWV0aG9kKCckdW5iaW5kICcsIGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlIGluIHRoaXMuJF9saXN0ZW5lcnMpIHtcbiAgICAgIHZhciBzdGFjayA9IHRoaXMuJF9saXN0ZW5lcnNbdHlwZV07XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHN0YWNrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoc3RhY2tbaV0gPT09IGNhbGxiYWNrKSB7XG4gICAgICAgICAgc3RhY2suc3BsaWNlKGksIDEpO1xuICAgICAgICAgIHJldHVybiB0aGlzLiR1bmJpbmQodHlwZSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBtZXRob2RcbiAgLm1ldGhvZCgnJGVtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSB7XG4gICAgICB2YXIgc3RhY2sgPSB0aGlzLiRfbGlzdGVuZXJzW2V2ZW50LnR5cGVdO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdGFjay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgc3RhY2tbaV0uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYkV2ZW50VGFyZ2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYk1vZGVsXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlF1ZXJ5LCBpZGJFdmVudFRhcmdldCwgbGJSZXNvdXJjZSwgJHRpbWVvdXQpIHsgJ25nSW5qZWN0JztcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIEJ1c2NhciB1biBjYW1wb1xyXG5jb25zdCBkZWVwRmllbGQgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgY2IpIHtcclxuXHJcbiAgY29uc3QgZmllbGRzID0gZmllbGQuc3BsaXQoJy4nKTtcclxuICBjb25zdCBsYXN0RmllbGQgPSBmaWVsZHMucG9wKCk7XHJcblxyXG4gIHJldHVybiAoZnVuY3Rpb24gX3NldChvYmopIHtcclxuICAgIGlmIChmaWVsZHMubGVuZ3RoID09IDApXHJcbiAgICAgIHJldHVybiBjYihvYmosIGxhc3RGaWVsZCk7XHJcbiAgICBjb25zdCBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xyXG4gICAgaWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAndW5kZWZpbmVkJylcclxuICAgICAgb2JqW2ZpZWxkXSA9IHt9O1xyXG4gICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XHJcbiAgfSkob2JqKTtcclxuXHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cclxuY29uc3QgZ2V0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIChvYmosIGZpZWxkKSB7XHJcbiAgcmV0dXJuIGRlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcclxuICB9KTtcclxufTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xyXG5jb25zdCBzZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gKG9iaiwgZmllbGQsIHZhbHVlKSB7XHJcbiAgZGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgb2JqW2xhc3RGaWVsZF0gPSB2YWx1ZTtcclxuICB9KTtcclxuICByZXR1cm4gb2JqO1xyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxucmV0dXJuIGZ1bmN0aW9uIGlkYk1vZGVsRmFjdG9yeSAoZGIsIG5hbWUsIHNvY2tldCkge1xyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXHJcbiAgLy8gJF9yZW1vdGVcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBmdW5jdGlvbiBpZGJNb2RlbCgpIHtcclxuICB9XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoaWRiTW9kZWwpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoaWRiRXZlbnRUYXJnZXQpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByb3BpZWRhZGVzIHN0YXRpY2FzXHJcbiAgLnN0YXRpYygnJGRiJywgZGIpXHJcbiAgLnN0YXRpYygnJG5hbWUnLCBuYW1lKVxyXG4gIC5zdGF0aWMoJyRzb2NrZXQnLCBzb2NrZXQpXHJcblxyXG4gIC5zdGF0aWMoJyRpZCcsIHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9KVxyXG4gIC5zdGF0aWMoJyRmaWVsZHMnLCB7XHJcbiAgICBpZDoge1xyXG4gICAgICBpZDogdHJ1ZSxcclxuICAgICAgbmFtZTogJ2lkJyxcclxuICAgICAgdHlwZTogJ251bWJlcidcclxuICAgIH1cclxuICB9KVxyXG4gIC5zdGF0aWMoJyRpbmRleGVzVG9DcmVhdGUnLCB7fSlcclxuICAuc3RhdGljKCckaW5zdGFuY2VzJywge30pXHJcbiAgICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0S2V5RnJvbScsIGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgcmV0dXJuIGdldEZpZWxkVmFsdWUoZGF0YSwgdGhpcy4kaWQua2V5UGF0aCk7XHJcblxyXG4gIH0pXHJcbiAgICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckYWRkSW5kZXgnLCBmdW5jdGlvbiAoZmllbGRzLCBuYW1lLCBvcHRpb25zKSB7XHJcbiAgICBpZiAodHlwZW9mIGZpZWxkcyA9PSAnc3RyaW5nJykge1xyXG4gICAgICBmaWVsZHMgPSBbZmllbGRzXTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PSAnb2JqZWN0Jykge1xyXG4gICAgICBvcHRpb25zID0gbmFtZTtcclxuICAgICAgbmFtZSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgbmFtZSA9IGZpZWxkcy5zb3J0KCkuam9pbignXycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuJGluZGV4ZXNUb0NyZWF0ZVtuYW1lXSA9IHtcclxuICAgICAgZmllbGRzOiBmaWVsZHMsXHJcbiAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckY3JlYXRlJywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIGNvbnN0IHN0b3JlID0gdGhpei4kZGIuJGNyZWF0ZVN0b3JlKHRoaXouJG5hbWUsIHRoaXouJGlkKTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyh0aGl6LiRpbmRleGVzVG9DcmVhdGUpLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpei4kaW5kZXhlc1RvQ3JlYXRlW2tleV07XHJcbiAgICAgIHN0b3JlLiRjcmVhdGVJbmRleChpbmRleC5maWVsZHMsIGluZGV4Lm5hbWUsIGluZGV4Lm9wdGlvbnMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGNiKSBjYih0aGl6LCBzdG9yZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRkcm9wJywgZnVuY3Rpb24gKGNiKSB7XHJcblxyXG4gICAgdGhpcy4kZGIuJGRyb3BTdG9yZSh0aGlzLiRuYW1lKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJHdyaXRlcicsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICByZXR1cm4gdGhpei4kZGIuJHN0b3JlKHRoaXouJG5hbWUpLiR3cml0ZXIoY2IpXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChzdG9yZXMpIHtcclxuICAgICAgICByZXR1cm4gc3RvcmVzW3RoaXouJG5hbWVdXHJcbiAgICAgIH0pXHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRyZWFkZXInLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJGRiLiRzdG9yZSh0aGl6LiRuYW1lKS4kcmVhZGVyKGNiKVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAoc3RvcmVzKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0b3Jlc1t0aGl6LiRuYW1lXVxyXG4gICAgICB9KVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckcHV0JywgZnVuY3Rpb24gKG9iaiwga2V5KSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgXHJcbiAgICBjb25zdCBkYXRhID0gdGhpcy4kZ2V0VmFsdWVzKG9iaik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJHdyaXRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBzdG9yZS4kcHV0KGRhdGEsIGtleSkudGhlbihmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpei4kZ2V0SW5zdGFuY2Uoa2V5KTtcclxuICAgICAgICByZWNvcmQuJHNldFZhbHVlcyhkYXRhKTtcclxuICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xyXG4gICAgICAgIHJldHVybiByZWNvcmQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRhZGQnLCBmdW5jdGlvbiAob2JqLCBrZXkpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBcclxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLiRnZXRWYWx1ZXMob2JqKTtcclxuXHJcbiAgICByZXR1cm4gdGhpei4kd3JpdGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRhZGQoZGF0YSwga2V5KS50aGVuKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICBjb25zdCByZWNvcmQgPSB0aGl6LiRnZXRJbnN0YW5jZShrZXkpO1xyXG4gICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGRhdGEpO1xyXG4gICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIHJlY29yZDtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGRlbGV0ZScsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpcy4kd3JpdGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRkZWxldGUocXVlcnkpO1xyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRjbGVhcicsIGZ1bmN0aW9uICgpIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIHRoaXMuJHdyaXRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBzdG9yZS4kY2xlYXIoKTtcclxuICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0JywgZnVuY3Rpb24gKGtleSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBjb25zdCByZWNvcmQgPSB0aGlzLiRnZXRJbnN0YW5jZShrZXkpO1xyXG5cclxuICAgIHJlY29yZC4kcHJvbWlzZSA9IHRoaXouJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBzdG9yZS4kZ2V0KGtleSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGRhdGEpO1xyXG4gICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIHJlY29yZDtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVjb3JkO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0S2V5JywgZnVuY3Rpb24gKHF1ZXJ5KSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIHJldHVybiB0aGl6LiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gICAgICByZXR1cm4gc3RvcmUuJGdldEtleShxdWVyeSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRnZXRBbGwnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgXHJcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuXHJcbiAgICByZXN1bHQuJHByb21pc2UgPSB0aGl6LiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gICAgICByZXR1cm4gc3RvcmUuJGdldEFsbChxdWVyeSwgY291bnQpLnRoZW4oZnVuY3Rpb24gKGFycikge1xyXG4gICAgICAgIHJldHVybiBhcnIubWFwKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICBjb25zdCByZWNvcmQgPSB0aGl6LiRnZXRJbnN0YW5jZSh0aGl6LiRnZXRLZXlGcm9tKGRhdGEpKTtcclxuICAgICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGRhdGEpO1xyXG4gICAgICAgICAgcmVjb3JkLiRzZXRMb2NhbFZhbHVlcyhkYXRhKTtcclxuICAgICAgICAgIHJlc3VsdC5wdXNoKHJlY29yZCk7XHJcbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRnZXRBbGxLZXlzJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xyXG4gICAgXHJcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuXHJcbiAgICByZXN1bHQuJHByb21pc2UgPSB0aGlzLiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gICAgICByZXR1cm4gc3RvcmUuJGdldEFsbEtleXMoKS50aGVuKGZ1bmN0aW9uIChhcnIpIHtcclxuICAgICAgICByZXR1cm4gYXJyLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICByZXN1bHQucHVzaChrZXkpO1xyXG4gICAgICAgICAgcmV0dXJuIGtleTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckY291bnQnLCBmdW5jdGlvbiAocXVlcnkpIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIHRoaXMuJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBzdG9yZS4kY291bnQocXVlcnkpO1xyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRmaW5kJywgZnVuY3Rpb24gKGZpbHRlcnMpIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIG5ldyBpZGJRdWVyeSh0aGlzLCBmaWx0ZXJzKTtcclxuXHJcbiAgfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0SW5zdGFuY2UnLCBmdW5jdGlvbiAoa2V5KSB7XHJcblxyXG4gICAgLy8gRWwgb2JqZXRvIG5vIHRpZW5lIElEXHJcbiAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQgfHwga2V5ID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBuZXcgdGhpcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE5vIGV4aXN0ZSBsYSBpbnN0YW5jaWEgZW50b25jZSBzZSBjcmVhXHJcbiAgICBpZiAoIXRoaXMuJGluc3RhbmNlc1trZXldKXtcclxuICAgICAgdGhpcy4kaW5zdGFuY2VzW2tleV0gPSBuZXcgdGhpcygpO1xyXG4gICAgICB0aGlzLiRpbnN0YW5jZXNba2V5XS4kc2V0KHRoaXMuJGlkLmtleVBhdGgsIGtleSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzLiRpbnN0YW5jZXNba2V5XTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXNpZ25hIGxhIGVzcGVjaWZpY2FjacOzbiBkZSBsb3MgY2FtcG9zXHJcbiAgLnN0YXRpYygnJGZpZWxkJywgZnVuY3Rpb24gKG5hbWUsIGZpZWxkKSB7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgZmllbGQgPSB7IFwidHlwZVwiOiBmaWVsZCB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZpZWxkLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgIHRoaXMuJGZpZWxkc1tuYW1lXSA9IGZpZWxkO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBZ3JlZ2EgZWwgZWwgY2FtcG8gSUQgYXV0b21hdGljYW1lbnRlXHJcbiAgLnN0YXRpYygnJGtleScsIGZ1bmN0aW9uIChrZXksIGF1dG9JbmNyZW1lbnQsIHR5cGUpIHtcclxuICAgIGlmKHR5cGVvZiBrZXkgPT09ICdib29sZWFuJykge1xyXG4gICAgICBhdXRvSW5jcmVtZW50ID0ga2V5O1xyXG4gICAgfVxyXG4gICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkIHx8IGtleSA9PT0gbnVsbCB8fCB0eXBlb2Yga2V5ID09PSAnYm9vbGVhbicpe1xyXG4gICAgICBrZXkgPSAnaWQnO1xyXG4gICAgfVxyXG4gICAgaWYodHlwZW9mIGF1dG9JbmNyZW1lbnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHR5cGUgPSBhdXRvSW5jcmVtZW50O1xyXG4gICAgICBhdXRvSW5jcmVtZW50ID0gbnVsbDtcclxuICAgIH1cclxuICAgIGlmIChhdXRvSW5jcmVtZW50ID09PSB1bmRlZmluZWQgfHwgYXV0b0luY3JlbWVudCA9PT0gbnVsbCl7XHJcbiAgICAgIGF1dG9JbmNyZW1lbnQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYodHlwZW9mIGF1dG9JbmNyZW1lbnQgPT09ICdib29sZWFuJyB8fCB0eXBlICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0eXBlID0gJ251bWJlcic7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy4kaWQua2V5UGF0aCA9IGtleTtcclxuICAgIHRoaXMuJGlkLmF1dG9JbmNyZW1lbnQgPSBhdXRvSW5jcmVtZW50O1xyXG5cclxuICAgIHJldHVybiB0aGlzLiRmaWVsZChrZXksIHtcclxuICAgICAgaWQ6IHRydWUsXHJcbiAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxyXG4gIC5zdGF0aWMoJyRnZXRWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICBcclxuICAgIGNvbnN0IHZhbHVlcyA9IHt9O1xyXG5cclxuICAgIE9iamVjdC5rZXlzKHRoaXMuJGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGdldEZpZWxkVmFsdWUoZGF0YSwgZmllbGQpO1xyXG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh2YWx1ZXMsIGZpZWxkLCB2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB2YWx1ZXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFncmVnYSBlbCBlbCBjYW1wbyBJRCBhdXRvbWF0aWNhbWVudGVcclxuICAuc3RhdGljKCckYnVpbGQnLCBmdW5jdGlvbiAoYnVpbGRDYWxsYmFjaykge1xyXG5cclxuICAgIGJ1aWxkQ2FsbGJhY2sodGhpcyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGlcclxuICAuc3RhdGljKCckcmVtb3RlJywgZnVuY3Rpb24gKHVybCwgYXJncywgYWN0aW9ucykge1xyXG5cclxuICAgIHRoaXMuJF9yZW1vdGUgPSBsYlJlc291cmNlKHVybCwgYXJncywgYWN0aW9ucyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJvcGllZGFkZXNcclxuICAucHJvcGVydHkoJyRfdmFsdWVzJywgeyB2YWx1ZTogbmV3IENsYXp6ZXIoe30pXHJcbiAgICAuc3RhdGljKCdsb2NhbCcsIHt9KVxyXG4gICAgLnN0YXRpYygncmVtb3RlJywge30pXHJcbiAgICAuY2xhenpcclxuICB9KVxyXG5cclxuICAucHJvcGVydHkoJyRfdmVyc2lvbnMnLCB7IHZhbHVlOiB7fSB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcclxuICAubWV0aG9kKCckZ2V0JywgZnVuY3Rpb24gKGZpZWxkKSB7XHJcblxyXG4gICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBc2lnbmEgaW4gdmFsb3IgYSB1biBjYW1wb1xyXG4gIC5tZXRob2QoJyRzZXQnLCBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XHJcblxyXG4gICAgcmV0dXJuIHNldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXHJcbiAgLm1ldGhvZCgnJGdldFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgcmV0dXJuIGlkYk1vZGVsLiRnZXRWYWx1ZXMoZGF0YSB8fCB0aGlzKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldExvY2FsVmFsdWVzJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kX3ZhbHVlcy5sb2NhbCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRnZXRSZW1vdGVWYWx1ZXMnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuJGdldFZhbHVlcyh0aGlzLiRfdmFsdWVzLnJlbW90ZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRzZXRWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgIHNldEZpZWxkVmFsdWUodGhpeiwgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGl6O1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc2V0TG9jYWxWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgIHNldEZpZWxkVmFsdWUodGhpei4kX3ZhbHVlcy5sb2NhbCwgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGl6O1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc2V0UmVtb3RlVmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJF92YWx1ZXMucmVtb3RlLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRrZXknLCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsIHRoaXMuJGlkLmtleVBhdGgpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBGdW5jaW9uIHF1ZSBoYWNlIGVzY3VjaGFycyBsb3MgbWVuc2FqZXMgZGVsIHNvY2tldCBwYXJhIGVsIG1vZGVsXHJcbiAgLm1ldGhvZCgnJGxpc3RlbicsIGZ1bmN0aW9uIChkYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgaWYgKCF0aGlzLiRzb2NrZXQpIHRocm93IG5ldyBFcnJvcignaWRiTW9kZWwuRG9lc05vdEhhdmVTb2NrZXRJbnN0YW5jZScpO1xyXG5cclxuICAgIC8vIENyZWFyIHVuYSBzdWJzY3JpcGNpb24gYWwgc29ja2V0IHBhcmEgY3VhbmRvIHNlIHJlY2liYW4gZGF0b3NcclxuICAgIC8vIHBhcmEgbGEgaW5zdGFuY2lhIGFjdHVhbFxyXG4gICAgdGhpcy4kc29ja2V0LnN1YnNjcmliZSh7XHJcbiAgICAgIG1vZGVsTmFtZTogaWRiTW9kZWwuJG5hbWUsXHJcbiAgICAgIGV2ZW50TmFtZTogJ3VwZGF0ZScsXHJcbiAgICAgIG1vZGVsSWQ6IHRoaXouJGtleSgpLFxyXG4gICAgfSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgIC8vIEEgcmVjaWJpciBkYXRvcyBkZWwgc29ja2V0IGFzaWduYXIgbG9zIHZhbG9yZXNcclxuICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIEVtaXRpciBldmVudG8gZGUgZGF0b3MgcmVjaWJpZG9yIHBhcmEgZWwgbW9kZWxvXHJcbiAgICAgICAgdGhpei4kc2V0UmVtb3RlVmFsdWVzKGRhdGEudmFsdWVzLCBkYXRhLnZlcnNpb24pO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn07fVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYk1vZGVsLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiTW9kZWxcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJRdWVyeSwgaWRiRXZlbnRUYXJnZXQsIGxiUmVzb3VyY2UsICR0aW1lb3V0KSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQnVzY2FyIHVuIGNhbXBvXG5cbiAgdmFyIGRlZXBGaWVsZCA9IGZ1bmN0aW9uIGRlZXBGaWVsZChvYmosIGZpZWxkLCBjYikge1xuXG4gICAgdmFyIGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XG4gICAgdmFyIGxhc3RGaWVsZCA9IGZpZWxkcy5wb3AoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiBfc2V0KG9iaikge1xuICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMCkgcmV0dXJuIGNiKG9iaiwgbGFzdEZpZWxkKTtcbiAgICAgIHZhciBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xuICAgICAgaWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAndW5kZWZpbmVkJykgb2JqW2ZpZWxkXSA9IHt9O1xuICAgICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XG4gICAgfShvYmopO1xuICB9O1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xuICB2YXIgZ2V0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIGdldEZpZWxkVmFsdWUob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBkZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXG4gIHZhciBzZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gc2V0RmllbGRWYWx1ZShvYmosIGZpZWxkLCB2YWx1ZSkge1xuICAgIGRlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgIG9ialtsYXN0RmllbGRdID0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICByZXR1cm4gZnVuY3Rpb24gaWRiTW9kZWxGYWN0b3J5KGRiLCBuYW1lLCBzb2NrZXQpIHtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXG4gICAgLy8gJF9yZW1vdGVcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGZ1bmN0aW9uIGlkYk1vZGVsKCkge31cblxuICAgIHJldHVybiBuZXdcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBDb25zdHJ1Y3RvclxuICAgIENsYXp6ZXIoaWRiTW9kZWwpXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBIZXJlbmNpYVxuICAgIC5pbmhlcml0KGlkYkV2ZW50VGFyZ2V0KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUHJvcGllZGFkZXMgc3RhdGljYXNcbiAgICAuc3RhdGljKCckZGInLCBkYikuc3RhdGljKCckbmFtZScsIG5hbWUpLnN0YXRpYygnJHNvY2tldCcsIHNvY2tldCkuc3RhdGljKCckaWQnLCB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfSkuc3RhdGljKCckZmllbGRzJywge1xuICAgICAgaWQ6IHtcbiAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgIG5hbWU6ICdpZCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICB9XG4gICAgfSkuc3RhdGljKCckaW5kZXhlc1RvQ3JlYXRlJywge30pLnN0YXRpYygnJGluc3RhbmNlcycsIHt9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGdldEtleUZyb20nLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZShkYXRhLCB0aGlzLiRpZC5rZXlQYXRoKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGFkZEluZGV4JywgZnVuY3Rpb24gKGZpZWxkcywgbmFtZSwgb3B0aW9ucykge1xuICAgICAgaWYgKHR5cGVvZiBmaWVsZHMgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgZmllbGRzID0gW2ZpZWxkc107XG4gICAgICB9XG4gICAgICBpZiAoKHR5cGVvZiBuYW1lID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihuYW1lKSkgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgb3B0aW9ucyA9IG5hbWU7XG4gICAgICAgIG5hbWUgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIG5hbWUgPSBmaWVsZHMuc29ydCgpLmpvaW4oJ18nKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy4kaW5kZXhlc1RvQ3JlYXRlW25hbWVdID0ge1xuICAgICAgICBmaWVsZHM6IGZpZWxkcyxcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRjcmVhdGUnLCBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgdmFyIHN0b3JlID0gdGhpei4kZGIuJGNyZWF0ZVN0b3JlKHRoaXouJG5hbWUsIHRoaXouJGlkKTtcblxuICAgICAgT2JqZWN0LmtleXModGhpei4kaW5kZXhlc1RvQ3JlYXRlKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGl6LiRpbmRleGVzVG9DcmVhdGVba2V5XTtcbiAgICAgICAgc3RvcmUuJGNyZWF0ZUluZGV4KGluZGV4LmZpZWxkcywgaW5kZXgubmFtZSwgaW5kZXgub3B0aW9ucyk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGNiKSBjYih0aGl6LCBzdG9yZSk7XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckZHJvcCcsIGZ1bmN0aW9uIChjYikge1xuXG4gICAgICB0aGlzLiRkYi4kZHJvcFN0b3JlKHRoaXMuJG5hbWUpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJHdyaXRlcicsIGZ1bmN0aW9uIChjYikge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICByZXR1cm4gdGhpei4kZGIuJHN0b3JlKHRoaXouJG5hbWUpLiR3cml0ZXIoY2IpLnRoZW4oZnVuY3Rpb24gKHN0b3Jlcykge1xuICAgICAgICByZXR1cm4gc3RvcmVzW3RoaXouJG5hbWVdO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRyZWFkZXInLCBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgcmV0dXJuIHRoaXouJGRiLiRzdG9yZSh0aGl6LiRuYW1lKS4kcmVhZGVyKGNiKS50aGVuKGZ1bmN0aW9uIChzdG9yZXMpIHtcbiAgICAgICAgcmV0dXJuIHN0b3Jlc1t0aGl6LiRuYW1lXTtcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckcHV0JywgZnVuY3Rpb24gKG9iaiwga2V5KSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIHZhciBkYXRhID0gdGhpcy4kZ2V0VmFsdWVzKG9iaik7XG5cbiAgICAgIHJldHVybiB0aGl6LiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuJHB1dChkYXRhLCBrZXkpLnRoZW4oZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHZhciByZWNvcmQgPSB0aGl6LiRnZXRJbnN0YW5jZShrZXkpO1xuICAgICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGRhdGEpO1xuICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XG4gICAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGFkZCcsIGZ1bmN0aW9uIChvYmosIGtleSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICB2YXIgZGF0YSA9IHRoaXMuJGdldFZhbHVlcyhvYmopO1xuXG4gICAgICByZXR1cm4gdGhpei4kd3JpdGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRhZGQoZGF0YSwga2V5KS50aGVuKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gdGhpei4kZ2V0SW5zdGFuY2Uoa2V5KTtcbiAgICAgICAgICByZWNvcmQuJHNldFZhbHVlcyhkYXRhKTtcbiAgICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xuICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRkZWxldGUnLCBmdW5jdGlvbiAocXVlcnkpIHtcblxuICAgICAgcmV0dXJuIHRoaXMuJHdyaXRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS4kZGVsZXRlKHF1ZXJ5KTtcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckY2xlYXInLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuJGNsZWFyKCk7XG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGdldCcsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgdmFyIHJlY29yZCA9IHRoaXMuJGdldEluc3RhbmNlKGtleSk7XG5cbiAgICAgIHJlY29yZC4kcHJvbWlzZSA9IHRoaXouJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS4kZ2V0KGtleSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGRhdGEpO1xuICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XG4gICAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGdldEtleScsIGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICByZXR1cm4gdGhpei4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRnZXRLZXkocXVlcnkpO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXRBbGwnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgICAgcmVzdWx0LiRwcm9taXNlID0gdGhpei4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRnZXRBbGwocXVlcnksIGNvdW50KS50aGVuKGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgICByZXR1cm4gYXJyLm1hcChmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgdmFyIHJlY29yZCA9IHRoaXouJGdldEluc3RhbmNlKHRoaXouJGdldEtleUZyb20oZGF0YSkpO1xuICAgICAgICAgICAgcmVjb3JkLiRzZXRWYWx1ZXMoZGF0YSk7XG4gICAgICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gocmVjb3JkKTtcbiAgICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXRBbGxLZXlzJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xuXG4gICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgIHJlc3VsdC4kcHJvbWlzZSA9IHRoaXMuJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS4kZ2V0QWxsS2V5cygpLnRoZW4oZnVuY3Rpb24gKGFycikge1xuICAgICAgICAgIHJldHVybiBhcnIubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckY291bnQnLCBmdW5jdGlvbiAocXVlcnkpIHtcblxuICAgICAgcmV0dXJuIHRoaXMuJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS4kY291bnQocXVlcnkpO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRmaW5kJywgZnVuY3Rpb24gKGZpbHRlcnMpIHtcblxuICAgICAgcmV0dXJuIG5ldyBpZGJRdWVyeSh0aGlzLCBmaWx0ZXJzKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGdldEluc3RhbmNlJywgZnVuY3Rpb24gKGtleSkge1xuXG4gICAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcbiAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCB8fCBrZXkgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIE5vIGV4aXN0ZSBsYSBpbnN0YW5jaWEgZW50b25jZSBzZSBjcmVhXG4gICAgICBpZiAoIXRoaXMuJGluc3RhbmNlc1trZXldKSB7XG4gICAgICAgIHRoaXMuJGluc3RhbmNlc1trZXldID0gbmV3IHRoaXMoKTtcbiAgICAgICAgdGhpcy4kaW5zdGFuY2VzW2tleV0uJHNldCh0aGlzLiRpZC5rZXlQYXRoLCBrZXkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy4kaW5zdGFuY2VzW2tleV07XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEFzaWduYSBsYSBlc3BlY2lmaWNhY2nDs24gZGUgbG9zIGNhbXBvc1xuICAgIC5zdGF0aWMoJyRmaWVsZCcsIGZ1bmN0aW9uIChuYW1lLCBmaWVsZCkge1xuXG4gICAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICBmaWVsZCA9IHsgXCJ0eXBlXCI6IGZpZWxkIH07XG4gICAgICB9XG5cbiAgICAgIGZpZWxkLm5hbWUgPSBuYW1lO1xuXG4gICAgICB0aGlzLiRmaWVsZHNbbmFtZV0gPSBmaWVsZDtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEFncmVnYSBlbCBlbCBjYW1wbyBJRCBhdXRvbWF0aWNhbWVudGVcbiAgICAuc3RhdGljKCcka2V5JywgZnVuY3Rpb24gKGtleSwgYXV0b0luY3JlbWVudCwgdHlwZSkge1xuICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdib29sZWFuJykge1xuICAgICAgICBhdXRvSW5jcmVtZW50ID0ga2V5O1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkIHx8IGtleSA9PT0gbnVsbCB8fCB0eXBlb2Yga2V5ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAga2V5ID0gJ2lkJztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgYXV0b0luY3JlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHlwZSA9IGF1dG9JbmNyZW1lbnQ7XG4gICAgICAgIGF1dG9JbmNyZW1lbnQgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKGF1dG9JbmNyZW1lbnQgPT09IHVuZGVmaW5lZCB8fCBhdXRvSW5jcmVtZW50ID09PSBudWxsKSB7XG4gICAgICAgIGF1dG9JbmNyZW1lbnQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBhdXRvSW5jcmVtZW50ID09PSAnYm9vbGVhbicgfHwgdHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHlwZSA9ICdudW1iZXInO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiRpZC5rZXlQYXRoID0ga2V5O1xuICAgICAgdGhpcy4kaWQuYXV0b0luY3JlbWVudCA9IGF1dG9JbmNyZW1lbnQ7XG5cbiAgICAgIHJldHVybiB0aGlzLiRmaWVsZChrZXksIHtcbiAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgIHR5cGU6IHR5cGVcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXG4gICAgLnN0YXRpYygnJGdldFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgIHZhciB2YWx1ZXMgPSB7fTtcblxuICAgICAgT2JqZWN0LmtleXModGhpcy4kZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGdldEZpZWxkVmFsdWUoZGF0YSwgZmllbGQpO1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNldEZpZWxkVmFsdWUodmFsdWVzLCBmaWVsZCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQWdyZWdhIGVsIGVsIGNhbXBvIElEIGF1dG9tYXRpY2FtZW50ZVxuICAgIC5zdGF0aWMoJyRidWlsZCcsIGZ1bmN0aW9uIChidWlsZENhbGxiYWNrKSB7XG5cbiAgICAgIGJ1aWxkQ2FsbGJhY2sodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGlcbiAgICAuc3RhdGljKCckcmVtb3RlJywgZnVuY3Rpb24gKHVybCwgYXJncywgYWN0aW9ucykge1xuXG4gICAgICB0aGlzLiRfcmVtb3RlID0gbGJSZXNvdXJjZSh1cmwsIGFyZ3MsIGFjdGlvbnMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFByb3BpZWRhZGVzXG4gICAgLnByb3BlcnR5KCckX3ZhbHVlcycsIHsgdmFsdWU6IG5ldyBDbGF6emVyKHt9KS5zdGF0aWMoJ2xvY2FsJywge30pLnN0YXRpYygncmVtb3RlJywge30pLmNsYXp6XG4gICAgfSkucHJvcGVydHkoJyRfdmVyc2lvbnMnLCB7IHZhbHVlOiB7fSB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxuICAgIC5tZXRob2QoJyRnZXQnLCBmdW5jdGlvbiAoZmllbGQpIHtcblxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBc2lnbmEgaW4gdmFsb3IgYSB1biBjYW1wb1xuICAgIC5tZXRob2QoJyRzZXQnLCBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XG5cbiAgICAgIHJldHVybiBzZXRGaWVsZFZhbHVlKHRoaXMsIGZpZWxkKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxuICAgIC5tZXRob2QoJyRnZXRWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICByZXR1cm4gaWRiTW9kZWwuJGdldFZhbHVlcyhkYXRhIHx8IHRoaXMpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCckZ2V0TG9jYWxWYWx1ZXMnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kX3ZhbHVlcy5sb2NhbCk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5tZXRob2QoJyRnZXRSZW1vdGVWYWx1ZXMnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kX3ZhbHVlcy5yZW1vdGUpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCckc2V0VmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXosIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5tZXRob2QoJyRzZXRMb2NhbFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRfdmFsdWVzLmxvY2FsLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCckc2V0UmVtb3RlVmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJF92YWx1ZXMucmVtb3RlLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCcka2V5JywgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUoZGF0YSwgdGhpcy4kaWQua2V5UGF0aCk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEZ1bmNpb24gcXVlIGhhY2UgZXNjdWNoYXJzIGxvcyBtZW5zYWplcyBkZWwgc29ja2V0IHBhcmEgZWwgbW9kZWxcbiAgICAubWV0aG9kKCckbGlzdGVuJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlmICghdGhpcy4kc29ja2V0KSB0aHJvdyBuZXcgRXJyb3IoJ2lkYk1vZGVsLkRvZXNOb3RIYXZlU29ja2V0SW5zdGFuY2UnKTtcblxuICAgICAgLy8gQ3JlYXIgdW5hIHN1YnNjcmlwY2lvbiBhbCBzb2NrZXQgcGFyYSBjdWFuZG8gc2UgcmVjaWJhbiBkYXRvc1xuICAgICAgLy8gcGFyYSBsYSBpbnN0YW5jaWEgYWN0dWFsXG4gICAgICB0aGlzLiRzb2NrZXQuc3Vic2NyaWJlKHtcbiAgICAgICAgbW9kZWxOYW1lOiBpZGJNb2RlbC4kbmFtZSxcbiAgICAgICAgZXZlbnROYW1lOiAndXBkYXRlJyxcbiAgICAgICAgbW9kZWxJZDogdGhpei4ka2V5KClcbiAgICAgIH0sIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgLy8gQSByZWNpYmlyIGRhdG9zIGRlbCBzb2NrZXQgYXNpZ25hciBsb3MgdmFsb3Jlc1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gRW1pdGlyIGV2ZW50byBkZSBkYXRvcyByZWNpYmlkb3IgcGFyYSBlbCBtb2RlbG9cbiAgICAgICAgICB0aGl6LiRzZXRSZW1vdGVWYWx1ZXMoZGF0YS52YWx1ZXMsIGRhdGEudmVyc2lvbik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5jbGF6ejtcbiAgfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiTW9kZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiVHJhbnNhY3Rpb25cclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCVHJhbnNhY3Rpb24gOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgICAgICBvYmplY3RTdG9yZU5hbWVzO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbk1vZGUgbW9kZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCRGF0YWJhc2UgICAgICAgIGRiO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01FeGNlcHRpb24gICAgICAgZXJyb3I7XHJcbiAqIFxyXG4gKiAgIElEQk9iamVjdFN0b3JlIG9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lKTtcclxuICogICB2b2lkICAgICAgICAgICBhYm9ydCgpO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYWJvcnQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmNvbXBsZXRlO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogfTtcclxuICogXHJcbiAqIGVudW0gSURCVHJhbnNhY3Rpb25Nb2RlIHtcclxuICogICBcInJlYWRvbmx5XCIsXHJcbiAqICAgXCJyZWFkd3JpdGVcIixcclxuICogICBcInZlcnNpb25jaGFuZ2VcIlxyXG4gKiB9O1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlN0b3JlKSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcclxuICAvLyAkX3Byb21pc2VcclxuICBcclxuICBjb25zdCBUcmFuc2FjdGlvbk1vZGUgPSBuZXcgQ2xhenplcih7fSlcclxuICAgICAgICAuc3RhdGljKCdSZWFkT25seScsICdyZWFkb25seScpXHJcbiAgICAgICAgLnN0YXRpYygnUmVhZFdyaXRlJywgJ3JlYWR3cml0ZScpXHJcbiAgICAgICAgLnN0YXRpYygnVmVyc2lvbkNoYW5nZScsICAndmVyc2lvbmNoYW5nZScpO1xyXG5cclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlRyYW5zYWN0aW9uIChtZSkge1xyXG4gICAgXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAuaW5oZXJpdChFdmVudFRhcmdldClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gU3RhdGljc1xyXG4gIC5zdGF0aWMoJ1RyYW5zYWN0aW9uTW9kZScsIFRyYW5zYWN0aW9uTW9kZS5jbGF6eilcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gR2V0dGVyc1xyXG4gIC5nZXR0ZXIoJyRkYicsICAgICAgICAgICdkYicpXHJcbiAgLmdldHRlcignJG1vZGUnLCAgICAgICAgJ21vZGUnKVxyXG4gIC5nZXR0ZXIoJyRlcnJvcicsICAgICAgICdlcnJvcicpXHJcbiAgLmdldHRlcignJHN0b3JlTmFtZXMnLCAgJ29iamVjdFN0b3JlTmFtZXMnKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gIC5oYW5kbGVyRXZlbnQoJyRhYm9ydGVkJywgICAnb25hYm9ydCcpXHJcbiAgLmhhbmRsZXJFdmVudCgnJGNvbXBsZXRlZCcsICdvbmNvbXBsZXRlJylcclxuICAuaGFuZGxlckV2ZW50KCckZmFpbGVkJywgICAgJ29uZXJyb3InKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc3RvcmUnLCBmdW5jdGlvbihuYW1lKXtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLm9iamVjdFN0b3JlKG5hbWUpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGFib3J0JywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICB0aGlzLiRtZS5hYm9ydCgpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9wZXJ0eVxyXG4gIC5wcm9wZXJ0eSgnJHByb21pc2UnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlmICh0aGl6LiRfcHJvbWlzZSkgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgICAgLy8gQ3JlYXIgcHJvbWlzZSBwYXJhIGVsIHJlcXVlc3RcclxuICAgICAgdGhpei4kX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdGhpei4kY29tcGxldGVkKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVzb2x2ZShldmVudCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuJGZhaWxlZChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlamVjdChldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbmV3IENsYXp6ZXIodGhpei4kX3Byb21pc2UpLnN0YXRpYygnJHRyYW5zYWN0aW9uJywgdGhpeik7XHJcblxyXG4gICAgICByZXR1cm4gdGhpei4kX3Byb21pc2U7XHJcblxyXG4gICAgfVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiVHJhbnNhY3Rpb24uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJUcmFuc2FjdGlvblxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJUcmFuc2FjdGlvbiA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgICAgIG9iamVjdFN0b3JlTmFtZXM7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJEYXRhYmFzZSAgICAgICAgZGI7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTUV4Y2VwdGlvbiAgICAgICBlcnJvcjtcclxuICogXHJcbiAqICAgSURCT2JqZWN0U3RvcmUgb2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGFib3J0KCk7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25hYm9ydDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uY29tcGxldGU7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZW51bSBJREJUcmFuc2FjdGlvbk1vZGUge1xyXG4gKiAgIFwicmVhZG9ubHlcIixcclxuICogICBcInJlYWR3cml0ZVwiLFxyXG4gKiAgIFwidmVyc2lvbmNoYW5nZVwiXHJcbiAqIH07XHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiU3RvcmUpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJF9wcm9taXNlXG5cbiAgdmFyIFRyYW5zYWN0aW9uTW9kZSA9IG5ldyBDbGF6emVyKHt9KS5zdGF0aWMoJ1JlYWRPbmx5JywgJ3JlYWRvbmx5Jykuc3RhdGljKCdSZWFkV3JpdGUnLCAncmVhZHdyaXRlJykuc3RhdGljKCdWZXJzaW9uQ2hhbmdlJywgJ3ZlcnNpb25jaGFuZ2UnKTtcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlRyYW5zYWN0aW9uKG1lKSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFN0YXRpY3NcbiAgLnN0YXRpYygnVHJhbnNhY3Rpb25Nb2RlJywgVHJhbnNhY3Rpb25Nb2RlLmNsYXp6KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRkYicsICdkYicpLmdldHRlcignJG1vZGUnLCAnbW9kZScpLmdldHRlcignJGVycm9yJywgJ2Vycm9yJykuZ2V0dGVyKCckc3RvcmVOYW1lcycsICdvYmplY3RTdG9yZU5hbWVzJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRXZlbnQgaGFuZGxlcnNcbiAgLmhhbmRsZXJFdmVudCgnJGFib3J0ZWQnLCAnb25hYm9ydCcpLmhhbmRsZXJFdmVudCgnJGNvbXBsZXRlZCcsICdvbmNvbXBsZXRlJykuaGFuZGxlckV2ZW50KCckZmFpbGVkJywgJ29uZXJyb3InKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckc3RvcmUnLCBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJTdG9yZSh0aGlzLiRtZS5vYmplY3RTdG9yZShuYW1lKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRhYm9ydCcsIGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuJG1lLmFib3J0KCk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFByb3BlcnR5XG4gIC5wcm9wZXJ0eSgnJHByb21pc2UnLCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlmICh0aGl6LiRfcHJvbWlzZSkgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xuXG4gICAgICAvLyBDcmVhciBwcm9taXNlIHBhcmEgZWwgcmVxdWVzdFxuICAgICAgdGhpei4kX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRoaXouJGNvbXBsZXRlZChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZXNvbHZlKGV2ZW50KTtcbiAgICAgICAgfSkuJGZhaWxlZChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBuZXcgQ2xhenplcih0aGl6LiRfcHJvbWlzZSkuc3RhdGljKCckdHJhbnNhY3Rpb24nLCB0aGl6KTtcblxuICAgICAgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xuICAgIH1cblxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlRyYW5zYWN0aW9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYlF1ZXJ5XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlF1ZXJ5IChtb2RlbCwgcXVlcnkpIHtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKVxyXG4gICAgICAuc3RhdGljKCckbW9kZWwnLCBtb2RlbClcclxuICAgICAgLnN0YXRpYygnJHF1ZXJ5JywgcXVlcnkpXHJcbiAgICAgIDtcclxuXHJcbiAgfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBTdGF0aWNcclxuICAucHJvcGVydHkoJyRyZXN1bHQnLCB7IHZhbHVlOiBbXSB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBtZXRob2RcclxuICAubWV0aG9kKCckZ2V0UmVzdWx0JywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIGlmICghdGhpei4kcmVzdWx0LiRwcm9taXNlKSB7XHJcblxyXG4gICAgICB0aGl6LiRyZXN1bHQuJHByb21pc2UgPSB0aGl6LiRtb2RlbC4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuICAgICAgICAgIGNvbnN0IHJxID0gc3RvcmUuJG9wZW5DdXJzb3IoKTtcclxuICAgICAgICAgIHJxLiRzdWNjZXNzKGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY3Vyc29yID0gcnEuJG1lLnJlc3VsdDtcclxuICAgICAgICAgICAgaWYgKCFjdXJzb3IpIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZWNvcmQgPSB0aGl6LiRtb2RlbC4kZ2V0SW5zdGFuY2UoY3Vyc29yLmtleSk7XHJcbiAgICAgICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGN1cnNvci52YWx1ZSk7XHJcbiAgICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoY3Vyc29yLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpei4kcmVzdWx0LnB1c2gocmVjb3JkKTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2gocmVjb3JkKTtcclxuXHJcbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xyXG5cclxuICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHJlamVjdChldmVudCk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJHJlc3VsdDtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlF1ZXJ5LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiUXVlcnlcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplcikge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiUXVlcnkobW9kZWwsIHF1ZXJ5KSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtb2RlbCcsIG1vZGVsKS5zdGF0aWMoJyRxdWVyeScsIHF1ZXJ5KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gU3RhdGljXG4gIC5wcm9wZXJ0eSgnJHJlc3VsdCcsIHsgdmFsdWU6IFtdIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIG1ldGhvZFxuICAubWV0aG9kKCckZ2V0UmVzdWx0JywgZnVuY3Rpb24gKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgaWYgKCF0aGl6LiRyZXN1bHQuJHByb21pc2UpIHtcblxuICAgICAgdGhpei4kcmVzdWx0LiRwcm9taXNlID0gdGhpei4kbW9kZWwuJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICB2YXIgcnEgPSBzdG9yZS4kb3BlbkN1cnNvcigpO1xuICAgICAgICAgIHJxLiRzdWNjZXNzKGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICB2YXIgY3Vyc29yID0gcnEuJG1lLnJlc3VsdDtcbiAgICAgICAgICAgIGlmICghY3Vyc29yKSByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuXG4gICAgICAgICAgICB2YXIgcmVjb3JkID0gdGhpei4kbW9kZWwuJGdldEluc3RhbmNlKGN1cnNvci5rZXkpO1xuICAgICAgICAgICAgcmVjb3JkLiRzZXRWYWx1ZXMoY3Vyc29yLnZhbHVlKTtcbiAgICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoY3Vyc29yLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXouJHJlc3VsdC5wdXNoKHJlY29yZCk7XG4gICAgICAgICAgICByZXN1bHQucHVzaChyZWNvcmQpO1xuXG4gICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICB9KS4kZmFpbGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgcmVqZWN0KGV2ZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpei4kcmVzdWx0O1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlF1ZXJ5LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlvLCAkbG9nKSB7ICduZ0luamVjdCc7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXHJcbiAgLy8gJHNvY2tldFxyXG5cclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlNvY2tldCh1cmwsIGFjY2Vzc1Rva2VuSWQsIGN1cnJlbnRVc2VySWQpe1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpXHJcbiAgICAgIC5zdGF0aWMoJyR1cmwnLCB1cmwgfHwgaWRiU29ja2V0LiRkZWZVcmxTZXJ2ZXIpXHJcbiAgICAgIC5zdGF0aWMoJyRhY2Nlc3NUb2tlbklkJywgYWNjZXNzVG9rZW5JZCB8fCBpZGJTb2NrZXQuJGRlZkFjY2Vzc1Rva2VuSWQpXHJcbiAgICAgIC5zdGF0aWMoJyRjdXJyZW50VXNlcklkJywgY3VycmVudFVzZXJJZCB8fCBpZGJTb2NrZXQuJGRlZkN1cnJlbnRVc2VySWQpO1xyXG5cclxuICAgIHRoaXMuJGNvbm5lY3QoKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnByb3BlcnR5KCckX2xpc3RlbmVycycsIHsgdmFsdWU6W10gfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uZWN0YXJzZSBhbCBzZXJ2aWRvclxyXG4gIC5tZXRob2QoJyRjb25uZWN0JywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vIENyZWF0aW5nIGNvbm5lY3Rpb24gd2l0aCBzZXJ2ZXJcclxuICAgIGNvbnN0IHNvY2tldCA9IHRoaXMuJHNvY2tldCA9IGlvLmNvbm5lY3QodGhpcy4kdXJsKTtcclxuXHJcbiAgICAvLyBUaGlzIHBhcnQgaXMgb25seSBmb3IgbG9naW4gdXNlcnMgZm9yIGF1dGhlbnRpY2F0ZWQgJHNvY2tldCBjb25uZWN0aW9uIGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIuXHJcbiAgICAvLyBJZiB5b3UgYXJlIG5vdCB1c2luZyBsb2dpbiBwYWdlIGluIHlvdSB3ZWJzaXRlIHRoZW4geW91IHNob3VsZCByZW1vdmUgcmVzdCBwaWVjZSBvZiBjb2RlLi5cclxuICAgIHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICRsb2cubG9nKCdjb25uZWN0ZWQnKTtcclxuXHJcbiAgICAgIHNvY2tldC5lbWl0KCdhdXRoZW50aWNhdGlvbicsIHtcclxuICAgICAgICBpZDogdGhpcy4kYWNjZXNzVG9rZW5JZCxcclxuICAgICAgICB1c2VySWQ6IHRoaXMuJGN1cnJlbnRVc2VySWQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgc29ja2V0Lm9uKCdhdXRoZW50aWNhdGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gdXNlIHRoZSAkc29ja2V0IGFzIHVzdWFsXHJcbiAgICAgICAgJGxvZy5sb2coJ1VzZXIgaXMgYXV0aGVudGljYXRlZCcpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHN1YnNjcmliZScsIGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xyXG5cclxuICAgIGxldCBuYW1lID0gb3B0aW9ucy5tb2RlbE5hbWUgKyAnLicgKyBvcHRpb25zLmV2ZW50TmFtZTtcclxuXHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMubW9kZWxJZCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgbmFtZSA9IG5hbWUgKyAnLicgKyBvcHRpb25zLm1vZGVsSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy4kc29ja2V0Lm9uKG5hbWUsIGNiKTtcclxuICAgIFxyXG4gICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxyXG4gICAgdGhpcy4kcHVzaExpc3RlbmVyKG5hbWUsIGNiKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHB1c2hMaXN0ZW5lcicsIGZ1bmN0aW9uIChuYW1lLCBjYikge1xyXG5cclxuICAgIHRoaXMuJF9saXN0ZW5lcnMucHVzaChuYW1lKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHVuc3Vic2NyaWJlJyxmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSkge1xyXG5cclxuICAgIHRoaXMuJHNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMoc3Vic2NyaXB0aW9uTmFtZSk7ICBcclxuICAgIHZhciBpZHggPSB0aGlzLiRfbGlzdGVuZXJzLmluZGV4T2Yoc3Vic2NyaXB0aW9uTmFtZSk7XHJcbiAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgdGhpcy4kX2xpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXNpZ25hIGxhIFVSTCBkZSBzZXJ2aWRvciBwb3IgZGVmZWN0b1xyXG4gIC5zdGF0aWMoJyRzZXRVcmxTZXJ2ZXInLCBmdW5jdGlvbiAodXJsKSB7XHJcblxyXG4gICAgdGhpcy4kZGVmVXJsU2VydmVyID0gdXJsO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXHJcbiAgLnN0YXRpYygnJHNldENyZWRlbnRpYWxzJywgZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIGN1cnJlbnRVc2VySWQpIHtcclxuXHJcbiAgICB0aGlzLiRkZWZBY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcclxuICAgIHRoaXMuJGRlZkN1cnJlbnRVc2VySWQgPSBjdXJyZW50VXNlcklkO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6elxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuJHNldFVybFNlcnZlcihudWxsKVxyXG4gIC4kc2V0Q3JlZGVudGlhbHMobnVsbCwgbnVsbCk7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiU29ja2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaW8sICRsb2cpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJHNvY2tldFxuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiU29ja2V0KHVybCwgYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckdXJsJywgdXJsIHx8IGlkYlNvY2tldC4kZGVmVXJsU2VydmVyKS5zdGF0aWMoJyRhY2Nlc3NUb2tlbklkJywgYWNjZXNzVG9rZW5JZCB8fCBpZGJTb2NrZXQuJGRlZkFjY2Vzc1Rva2VuSWQpLnN0YXRpYygnJGN1cnJlbnRVc2VySWQnLCBjdXJyZW50VXNlcklkIHx8IGlkYlNvY2tldC4kZGVmQ3VycmVudFVzZXJJZCk7XG5cbiAgICB0aGlzLiRjb25uZWN0KCk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5wcm9wZXJ0eSgnJF9saXN0ZW5lcnMnLCB7IHZhbHVlOiBbXSB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXG4gIC5tZXRob2QoJyRjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gQ3JlYXRpbmcgY29ubmVjdGlvbiB3aXRoIHNlcnZlclxuICAgIHZhciBzb2NrZXQgPSB0aGlzLiRzb2NrZXQgPSBpby5jb25uZWN0KHRoaXMuJHVybCk7XG5cbiAgICAvLyBUaGlzIHBhcnQgaXMgb25seSBmb3IgbG9naW4gdXNlcnMgZm9yIGF1dGhlbnRpY2F0ZWQgJHNvY2tldCBjb25uZWN0aW9uIGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIuXG4gICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXG4gICAgc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgJGxvZy5sb2coJ2Nvbm5lY3RlZCcpO1xuXG4gICAgICBzb2NrZXQuZW1pdCgnYXV0aGVudGljYXRpb24nLCB7XG4gICAgICAgIGlkOiB0aGlzLiRhY2Nlc3NUb2tlbklkLFxuICAgICAgICB1c2VySWQ6IHRoaXMuJGN1cnJlbnRVc2VySWRcbiAgICAgIH0pO1xuXG4gICAgICBzb2NrZXQub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHVzZSB0aGUgJHNvY2tldCBhcyB1c3VhbFxuICAgICAgICAkbG9nLmxvZygnVXNlciBpcyBhdXRoZW50aWNhdGVkJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHN1YnNjcmliZScsIGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xuXG4gICAgdmFyIG5hbWUgPSBvcHRpb25zLm1vZGVsTmFtZSArICcuJyArIG9wdGlvbnMuZXZlbnROYW1lO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XG4gICAgICBuYW1lID0gbmFtZSArICcuJyArIG9wdGlvbnMubW9kZWxJZDtcbiAgICB9XG5cbiAgICB0aGlzLiRzb2NrZXQub24obmFtZSwgY2IpO1xuXG4gICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxuICAgIHRoaXMuJHB1c2hMaXN0ZW5lcihuYW1lLCBjYik7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRwdXNoTGlzdGVuZXInLCBmdW5jdGlvbiAobmFtZSwgY2IpIHtcblxuICAgIHRoaXMuJF9saXN0ZW5lcnMucHVzaChuYW1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHVuc3Vic2NyaWJlJywgZnVuY3Rpb24gKHN1YnNjcmlwdGlvbk5hbWUpIHtcblxuICAgIHRoaXMuJHNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMoc3Vic2NyaXB0aW9uTmFtZSk7XG4gICAgdmFyIGlkeCA9IHRoaXMuJF9saXN0ZW5lcnMuaW5kZXhPZihzdWJzY3JpcHRpb25OYW1lKTtcbiAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICB0aGlzLiRfbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xuICAgIH1cbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXNpZ25hIGxhIFVSTCBkZSBzZXJ2aWRvciBwb3IgZGVmZWN0b1xuICAuc3RhdGljKCckc2V0VXJsU2VydmVyJywgZnVuY3Rpb24gKHVybCkge1xuXG4gICAgdGhpcy4kZGVmVXJsU2VydmVyID0gdXJsO1xuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBU2lnbmEgbGFzIGNyZWRlbmNpYWxlcyBwb3IgZGVmZWN0b1xuICAuc3RhdGljKCckc2V0Q3JlZGVudGlhbHMnLCBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCkge1xuXG4gICAgdGhpcy4kZGVmQWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XG4gICAgdGhpcy4kZGVmQ3VycmVudFVzZXJJZCA9IGN1cnJlbnRVc2VySWQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6elxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuJHNldFVybFNlcnZlcihudWxsKS4kc2V0Q3JlZGVudGlhbHMobnVsbCwgbnVsbCk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlNvY2tldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxiIChtb2R1bGUpIHtcclxuXHJcbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcclxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xyXG4gICAgY29uc3QgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xyXG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGxldCB1cmxCYXNlSG9zdCA9IGxvY2F0aW9uLmhvc3Q7XHJcblxyXG4gIGNvbnN0IGxiQXV0aCA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnXHJcbiAgICBjb25zdCBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcclxuICAgIGNvbnN0IHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcclxuICAgIFxyXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcclxuICAgIC8vIFdlIGFyZSB1c2luZyBlbXB0eSBzdHJpbmcgYXMgYSBtYXJrZXIgZm9yIG51bGwvdW5kZWZpbmVkIHZhbHVlcy5cclxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XHJcbiAgICAgICAgc3RvcmFnZVtrZXldID0gdmFsdWU7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZChuYW1lKSB7XHJcbiAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVtrZXldIHx8IHNlc3Npb25TdG9yYWdlW2tleV0gfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsYkF1dGgoKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpeltuYW1lXSA9IGxvYWQobmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBjb25zdCBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbihhY2Nlc3NUb2tlbklkLCB1c2VySWQsIHVzZXJEYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc2Vzc2lvblN0b3JhZ2UsIG5hbWUsIG51bGwpO1xyXG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XHJcblxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uKCRxLCBsYkF1dGgpIHsgJ25nSW5qZWN0JztcclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVxdWVzdDogZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xyXG4gICAgICAgIGNvbnN0IGhvc3QgPSBnZXRIb3N0KGNvbmZpZy51cmwpO1xyXG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XHJcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XHJcbiAgICAgICAgICBjb25maWcuaGVhZGVyc1thdXRoSGVhZGVyXSA9IGxiQXV0aC5hY2Nlc3NUb2tlbklkO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XHJcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxyXG4gICAgICAgICAgLy8gdGhlcmUgaXMgbm8gdXNlciBsb2dnZWQgaW5cclxuICAgICAgICAgIGNvbnN0IHJlcyA9IHtcclxuICAgICAgICAgICAgYm9keTogeyBlcnJvcjogeyBzdGF0dXM6IDQwMSB9fSxcclxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXHJcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbigpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnOyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcclxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nLFxyXG4gICAgfTtcclxuXHJcbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyIFRoZSBoZWFkZXIgbmFtZSB0byB1c2UsIGUuZy4gYFgtQWNjZXNzLVRva2VuYFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25maWd1cmUgdGhlIFJFU1QgdHJhbnNwb3J0IHRvIHVzZSBhIGRpZmZlcmVudCBoZWFkZXIgZm9yIHNlbmRpbmdcclxuICAgICAqIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi4gSXQgaXMgc2VudCBpbiB0aGUgYEF1dGhvcml6YXRpb25gIGhlYWRlclxyXG4gICAgICogYnkgZGVmYXVsdC5cclxuICAgICAqL1xyXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oaGVhZGVyKSB7XHJcbiAgICAgIG9wdGlvbnMuYXV0aEhlYWRlciA9IGhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBoZWFkZXIgbmFtZSB0aGF0IGlzIHVzZWQgZm9yIHNlbmRpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB1c2UsIGUuZy4gYC9hcGlgIG9yIGAvL2V4YW1wbGUuY29tL2FwaWAuXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENoYW5nZSB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIEJ5IGRlZmF1bHQsIHRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgb3B0aW9ucy51cmxCYXNlID0gdXJsO1xyXG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xyXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uKCRyZXNvdXJjZSkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xyXG4gICAgICAgICAgYWN0aW9uc1trZXldLnVybCA9IG9wdGlvbnMudXJsQmFzZSArIGFjdGlvbnNba2V5XS51cmw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcclxuXHJcbiAgICAgICAgLy8gQW5ndWxhciBhbHdheXMgY2FsbHMgUE9TVCBvbiAkc2F2ZSgpXHJcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXHJcbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xyXG4gICAgICAgIHJlc291cmNlLnByb3RvdHlwZS4kc2F2ZSA9IGZ1bmN0aW9uKHN1Y2Nlc3MsIGVycm9yKSB7XHJcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxyXG4gICAgICAgICAgLy8gdGhhdCBleGFjdGx5IGZpdHMgb3VyIG5lZWRzLlxyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcclxuICAgICAgICAgIHJldHVybiByZXN1bHQuJHByb21pc2UgfHwgcmVzdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XHJcbiAgICAgIH07XHJcbiAgICBcclxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kdWxlXHJcbiAgICAuZmFjdG9yeSgnbGJBdXRoJywgbGJBdXRoKVxyXG4gICAgLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSlcclxuICAgIC5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpXHJcbiAgICAuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uKCRodHRwUHJvdmlkZXIpIHsgJ25nSW5qZWN0JztcclxuICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XHJcbiAgICB9XSk7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvbGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBsYjtcbmZ1bmN0aW9uIGxiKG1vZHVsZSkge1xuXG4gIC8vIER2dWVsdmUgZWwgaG9zdCBkZSB1bmEgVVJMXG4gIGZ1bmN0aW9uIGdldEhvc3QodXJsKSB7XG4gICAgdmFyIG0gPSB1cmwubWF0Y2goL14oPzpodHRwcz86KT9cXC9cXC8oW15cXC9dKykvKTtcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBudWxsO1xuICB9XG5cbiAgdmFyIHVybEJhc2VIb3N0ID0gbG9jYXRpb24uaG9zdDtcblxuICB2YXIgbGJBdXRoID0gZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB2YXIgcHJvcHMgPSBbJ2FjY2Vzc1Rva2VuSWQnLCAnY3VycmVudFVzZXJJZCcsICdyZW1lbWJlck1lJ107XG4gICAgdmFyIHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcblxuICAgIC8vIE5vdGU6IExvY2FsU3RvcmFnZSBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gc3RyaW5nXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9ICcnO1xuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2Fubm90IGFjY2VzcyBsb2NhbC9zZXNzaW9uIHN0b3JhZ2U6JywgZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGl6W25hbWVdID0gbG9hZChuYW1lKTtcbiAgICAgIH0pO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zZXRVc2VyID0gZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IHVzZXJEYXRhO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyVXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzZXNzaW9uU3RvcmFnZSwgbmFtZSwgbnVsbCk7XG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IGxiQXV0aCgpO1xuICB9O1xuXG4gIHZhciBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbiBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IoJHEsIGxiQXV0aCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVxdWVzdDogZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xuICAgICAgICB2YXIgaG9zdCA9IGdldEhvc3QoY29uZmlnLnVybCk7XG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYkF1dGguYWNjZXNzVG9rZW5JZCkge1xuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzW2F1dGhIZWFkZXJdID0gbGJBdXRoLmFjY2Vzc1Rva2VuSWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XG4gICAgICAgICAgLy8gUmV0dXJuIGEgc3R1YiA0MDEgZXJyb3IgZm9yIFVzZXIuZ2V0Q3VycmVudCgpIHdoZW5cbiAgICAgICAgICAvLyB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpblxuICAgICAgICAgIHZhciByZXMgPSB7XG4gICAgICAgICAgICBib2R5OiB7IGVycm9yOiB7IHN0YXR1czogNDAxIH0gfSxcbiAgICAgICAgICAgIHN0YXR1czogNDAxLFxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbiBoZWFkZXJzKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKCkge1xuICAgICduZ0luamVjdCc7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcbiAgICAgIGF1dGhIZWFkZXI6ICdhdXRob3JpemF0aW9uJ1xuICAgIH07XG5cbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXIgVGhlIGhlYWRlciBuYW1lIHRvIHVzZSwgZS5nLiBgWC1BY2Nlc3MtVG9rZW5gXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENvbmZpZ3VyZSB0aGUgUkVTVCB0cmFuc3BvcnQgdG8gdXNlIGEgZGlmZmVyZW50IGhlYWRlciBmb3Igc2VuZGluZ1xyXG4gICAgICogdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLiBJdCBpcyBzZW50IGluIHRoZSBgQXV0aG9yaXphdGlvbmAgaGVhZGVyXHJcbiAgICAgKiBieSBkZWZhdWx0LlxyXG4gICAgICovXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKGhlYWRlcikge1xuICAgICAgb3B0aW9ucy5hdXRoSGVhZGVyID0gaGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIGhlYWRlciBuYW1lIHRoYXQgaXMgdXNlZCBmb3Igc2VuZGluZyB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uXHJcbiAgICAgKi9cbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHVzZSwgZS5nLiBgL2FwaWAgb3IgYC8vZXhhbXBsZS5jb20vYXBpYC5cclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ2hhbmdlIHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gQnkgZGVmYXVsdCwgdGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICBvcHRpb25zLnVybEJhc2UgPSB1cmw7XG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XG4gICAgfTtcblxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcbiAgICAgICduZ0luamVjdCc7XG5cbiAgICAgIHZhciBsYlJlc291cmNlID0gZnVuY3Rpb24gbGJSZXNvdXJjZSh1cmwsIHBhcmFtcywgYWN0aW9ucykge1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgYWN0aW9uc1trZXldLm9yaWdpbmFsVXJsID0gYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgICBhY3Rpb25zW2tleV0udXJsID0gb3B0aW9ucy51cmxCYXNlICsgYWN0aW9uc1trZXldLnVybDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcblxuICAgICAgICAvLyBBbmd1bGFyIGFsd2F5cyBjYWxscyBQT1NUIG9uICRzYXZlKClcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXG4gICAgICAgIC8vIGh0dHA6Ly9raXJrYnVzaGVsbC5tZS9hbmd1bGFyLWpzLXVzaW5nLW5nLXJlc291cmNlLWluLWEtbW9yZS1yZXN0ZnVsLW1hbm5lci9cbiAgICAgICAgcmVzb3VyY2UucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgLy8gRm9ydHVuYXRlbHksIExvb3BCYWNrIHByb3ZpZGVzIGEgY29udmVuaWVudCBgdXBzZXJ0YCBtZXRob2RcbiAgICAgICAgICAvLyB0aGF0IGV4YWN0bHkgZml0cyBvdXIgbmVlZHMuXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc291cmNlLnVwc2VydC5jYWxsKHRoaXMsIHt9LCB0aGlzLCBzdWNjZXNzLCBlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC4kcHJvbWlzZSB8fCByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXNvdXJjZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICAgIH07XG5cbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBsYlJlc291cmNlO1xuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIG1vZHVsZS5mYWN0b3J5KCdsYkF1dGgnLCBsYkF1dGgpLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSkuZmFjdG9yeSgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJywgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yKS5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XG4gIH1dKTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9sYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJDb25zdWx0YW50XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkluZGV4L0lEQlN0b3JlIHtcclxuICogICAgICAgICAgICBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICAgbmFtZTtcclxuICogXHJcbiAqICAgSURCUmVxdWVzdCBnZXQoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGdldEtleShhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0QWxsKG9wdGlvbmFsIGFueSBxdWVyeSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBjb3VudCk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGxLZXlzKG9wdGlvbmFsIGFueSBxdWVyeSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBjb3VudCk7XHJcbiAqICAgSURCUmVxdWVzdCBjb3VudChvcHRpb25hbCBhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3Qgb3BlbkN1cnNvcihvcHRpb25hbCBhbnkgcXVlcnksIG9wdGlvbmFsIElEQkN1cnNvckRpcmVjdGlvbiBkaXJlY3Rpb24gPSBcIm5leHRcIik7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuS2V5Q3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogfTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJSZXF1ZXN0KSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJDb25zdWx0YW50IChtZSkge1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xyXG5cclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEdldHRlcnNcclxuICAuZ2V0dGVyKCckbmFtZScsICAgICAgICAnbmFtZScpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRnZXQnLCBmdW5jdGlvbiAocXVlcnkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0KHF1ZXJ5KSlcclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldEtleScsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRLZXkocXVlcnkpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZ2V0QWxsJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRBbGwocXVlcnksIGNvdW50KSlcclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldEFsbEtleXMnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0QWxsS2V5cyhxdWVyeSwgY291bnQpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckY291bnQnLCBmdW5jdGlvbiAocXVlcnkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuY291bnQocXVlcnkpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckb3BlbkN1cnNvcicsIGZ1bmN0aW9uIChxdWVyeSwgZGlyZWN0aW9uKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLm9wZW5DdXJzb3IocXVlcnksIGRpcmVjdGlvbikpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckb3BlbktleUN1cnNvcicsIGZ1bmN0aW9uIChxdWVyeSwgZGlyZWN0aW9uKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLm9wZW5LZXlDdXJzb3IocXVlcnksIGRpcmVjdGlvbikpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiQ29uc3VsdGFudC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYkNvbnN1bHRhbnRcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCSW5kZXgvSURCU3RvcmUge1xyXG4gKiAgICAgICAgICAgIGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICBuYW1lO1xyXG4gKiBcclxuICogICBJREJSZXF1ZXN0IGdldChhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0S2V5KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGwob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbEtleXMob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGNvdW50KG9wdGlvbmFsIGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuQ3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5LZXlDdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiB9O1xyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkNvbnN1bHRhbnQobWUpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRuYW1lJywgJ25hbWUnKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZ2V0JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0KHF1ZXJ5KSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZ2V0S2V5JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0S2V5KHF1ZXJ5KSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZ2V0QWxsJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldEFsbChxdWVyeSwgY291bnQpKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRnZXRBbGxLZXlzJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRBbGxLZXlzKHF1ZXJ5LCBjb3VudCkpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGNvdW50JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuY291bnQocXVlcnkpKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRvcGVuQ3Vyc29yJywgZnVuY3Rpb24gKHF1ZXJ5LCBkaXJlY3Rpb24pIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5vcGVuQ3Vyc29yKHF1ZXJ5LCBkaXJlY3Rpb24pKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJG9wZW5LZXlDdXJzb3InLCBmdW5jdGlvbiAocXVlcnksIGRpcmVjdGlvbikge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLm9wZW5LZXlDdXJzb3IocXVlcnksIGRpcmVjdGlvbikpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYkNvbnN1bHRhbnQuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9