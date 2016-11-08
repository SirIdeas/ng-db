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
	
	var _idbConsultant = __webpack_require__(5);
	
	var _idbConsultant2 = _interopRequireDefault(_idbConsultant);
	
	var _idb = __webpack_require__(6);
	
	var _idb2 = _interopRequireDefault(_idb);
	
	var _idbStore = __webpack_require__(7);
	
	var _idbStore2 = _interopRequireDefault(_idbStore);
	
	var _idbIndex = __webpack_require__(8);
	
	var _idbIndex2 = _interopRequireDefault(_idbIndex);
	
	var _idbEventTarget = __webpack_require__(9);
	
	var _idbEventTarget2 = _interopRequireDefault(_idbEventTarget);
	
	var _idbModel = __webpack_require__(10);
	
	var _idbModel2 = _interopRequireDefault(_idbModel);
	
	var _idbTransaction = __webpack_require__(11);
	
	var _idbTransaction2 = _interopRequireDefault(_idbTransaction);
	
	var _idbQuery = __webpack_require__(12);
	
	var _idbQuery2 = _interopRequireDefault(_idbQuery);
	
	var _idbSocket = __webpack_require__(13);
	
	var _idbSocket2 = _interopRequireDefault(_idbSocket);
	
	var _lb = __webpack_require__(14);
	
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
	
	    return new idbRequest(this.$me.get.apply(this.$me, arguments)).$promise.then(function (event) {
	      return event.target.result;
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$getKey', function (query) {
	
	    return new idbRequest(this.$me.getKey.apply(this.$me, arguments)).$promise.then(function (event) {
	      return event.target.result;
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$getAll', function (query, count) {
	
	    return new idbRequest(this.$me.getAll.apply(this.$me, arguments)).$promise.then(function (event) {
	      return event.target.result;
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$getAllKeys', function (query, count) {
	    return new idbRequest(this.$me.getAllKeys.apply(this.$me, arguments)).$promise.then(function (event) {
	      return event.target.result;
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$count', function (query) {
	
	    return new idbRequest(this.$me.count.apply(this.$me, arguments)).$promise.then(function (event) {
	      return event.target.result;
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$openCursor', function (query, direction) {
	
	    return new idbRequest(this.$me.openCursor.apply(this.$me, arguments));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$openKeyCursor', function (query, direction) {
	
	    return new idbRequest(this.$me.openKeyCursor.apply(this.$me, arguments));
	  })
	
	  // ---------------------------------------------------------------------------
	  .clazz;
	}];

/***/ },
/* 6 */
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
	
	    return new idbOpenDBRequest(indexedDB.open.apply(indexedDB, arguments));
	  })
	
	  // ---------------------------------------------------------------------------
	  .static('$drop', function (name) {
	
	    return new idbOpenDBRequest(indexedDB.deleteDatabase.apply(indexedDB, arguments));
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
	    this.$me.close.apply(this.$me, arguments);
	
	    return this;
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$createStore', function (name, options) {
	
	    return new idbStore(this.$me.createObjectStore.apply(this.$me, arguments));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$dropStore', function (name) {
	
	    this.$me.deleteObjectStore.apply(this.$me, arguments);
	
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
	    var args = arguments;
	
	    return thiz.$open().then(function (thiz) {
	      return new idbTransaction(thiz.$me.transaction.apply(thiz.$me, args));
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
/* 7 */
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
	
	    return new idbRequest(this.$me.put.apply(this.$me, arguments)).$promise.then(function (event) {
	      return event.target.result;
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$add', function (value, key) {
	
	    return new idbRequest(this.$me.add.apply(this.$me, arguments)).$promise.then(function (event) {
	      return event.target.result;
	    });
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$delete', function (query) {
	
	    return new idbRequest(this.$me.delete.apply(this.$me, arguments)).$promise.then(function (event) {});
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$clear', function () {
	
	    return new idbRequest(this.$me.clear.apply(this.$me, arguments)).$promise.then(function (event) {});
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$index', function (name) {
	
	    return new idbIndex(this.$me.index.apply(this.$me, arguments));
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
/* 8 */
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
/* 9 */
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
/* 10 */
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
	    }).static('$indexesToCreate', []).static('$instances', {})
	
	    // ---------------------------------------------------------------------------
	    .static('$getKeyFrom', function (data) {
	
	      return getFieldValue(data, this.$id.keyPath);
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$addIndex', function (fields, name, options) {
	
	      this.$indexesToCreate.push(arguments);
	
	      return this;
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$create', function (cb) {
	      var thiz = this;
	
	      var store = thiz.$db.$createStore(thiz.$name, thiz.$id);
	
	      thiz.$indexesToCreate.map(function (args) {
	        store.$createIndex.apply(store, args);
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
	      var args = arguments;
	      var data = this.$getValues(obj);
	      args[0] = data;
	
	      return thiz.$writer().then(function (store) {
	        return store.$put.apply(store, args).then(function (key) {
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
	      var args = arguments;
	      var data = this.$getValues(obj);
	      args[0] = data;
	
	      return thiz.$writer().then(function (store) {
	        return store.$add.apply(store, args).then(function (key) {
	          var record = thiz.$getInstance(key);
	          record.$setValues(data);
	          record.$setLocalValues(data);
	          return record;
	        });
	      });
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$delete', function (query) {
	      var args = arguments;
	
	      return this.$writer().then(function (store) {
	        return store.$delete.apply(store, args);
	      });
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$clear', function () {
	      var args = arguments;
	
	      return this.$writer().then(function (store) {
	        return store.$clear.apply(store, args);
	      });
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$get', function (key) {
	      var thiz = this;
	      var args = arguments;
	      var record = this.$getInstance(key);
	
	      record.$promise = thiz.$reader().then(function (store) {
	        return store.$get.apply(store, args).then(function (data) {
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
	      var args = arguments;
	
	      return thiz.$reader().then(function (store) {
	        return store.$getKey.apply(store, args);
	      });
	    })
	
	    // ---------------------------------------------------------------------------
	    .static('$getAll', function (query, count) {
	      var thiz = this;
	      var args = arguments;
	      var result = [];
	
	      result.$promise = thiz.$reader().then(function (store) {
	        return store.$getAll.apply(store, args).then(function (arr) {
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
	      var args = arguments;
	      var result = [];
	
	      result.$promise = this.$reader().then(function (store) {
	        return store.$getAllKeys.apply(store, args).then(function (arr) {
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
	      var args = arguments;
	
	      return this.$reader().then(function (store) {
	        return store.$count.apply(store, args);
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
	
	      this.$_remote = lbResource.apply(lbResource, arguments);
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
/* 11 */
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
	
	    return new idbStore(this.$me.objectStore.apply(this.$me, arguments));
	  })
	
	  // ---------------------------------------------------------------------------
	  .method('$abort', function () {
	
	    this.$me.abort.apply(this.$me, arguments);
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGVmMzhmNjdlZGM3OGFjZDQ1MTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaW5kZXguanM/MGY2MiIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvQ2xhenplci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvQ2xhenplci5qcz8xZmNmIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJSZXF1ZXN0LmpzPzJjYmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYk9wZW5EQlJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYk9wZW5EQlJlcXVlc3QuanM/YThkZCIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiQ29uc3VsdGFudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiQ29uc3VsdGFudC5qcz9jOTNlIiwid2VicGFjazovLy8uL3NyYy92MS9pZGIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYi5qcz8xYzFiIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJTdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiU3RvcmUuanM/ZWE1NyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiSW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYkluZGV4LmpzPzhkNWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYkV2ZW50VGFyZ2V0LmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJFdmVudFRhcmdldC5qcz82MzdlIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiTW9kZWwuanM/N2MxZCIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvaWRiVHJhbnNhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlRyYW5zYWN0aW9uLmpzPzMwYzMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlF1ZXJ5LmpzIiwid2VicGFjazovLy8uL3NyYy92MS9pZGJRdWVyeS5qcz85ZmU3Iiwid2VicGFjazovLy8uL3NyYy92MS9pZGJTb2NrZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3YxL2lkYlNvY2tldC5qcz8xNGY0Iiwid2VicGFjazovLy8uL3NyYy92MS9sYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdjEvbGIuanM/Y2Y1ZSJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29uc3RhbnQiLCJpbyIsInNlcnZpY2UiLCJpZGJTb2NrZXQiLCJBUElfUk9PVCIsImxvY2FsU3RvcmFnZSIsImlkYiIsInNvY2tldCIsImRiIiwiJGJpbmQiLCJjb25zb2xlIiwibG9nIiwiJGFib3J0ZWQiLCIkY2xvc2VkIiwiJGVycm9yIiwiJHZlcnNpb25DaGFuZ2VkIiwiJGF1dG9taWdyYXRpb24iLCIkbW9kZWwiLCIkY3JlYXRlIiwiJGFkZEluZGV4IiwibW9kZWwiLCJzdG9yZSIsIiRjcmVhdGVJbmRleCIsIiRkcm9wIiwidGhlbiIsIiRvcGVuIiwid2luZG93IiwiRW1wbGVhZG8iLCIkZmllbGQiLCIkcmVtb3RlIiwidXJsIiwibWV0aG9kIiwiaXNBcnJheSIsIiRidWlsZCIsInByb3RvdHlwZSIsIiRjb25zdHJ1Y3RvciIsImRhdGEiLCJnZXROb21icmUiLCJub21icmVzIiwiYXBlbGxpZG9zIiwicnVuIiwiJHB1dCIsImlkIiwicmVjb3JkIiwiJGFkZCIsInIiLCIkZ2V0IiwiJHByb21pc2UiLCIkZmluZCIsIiRnZXRSZXN1bHQiLCIkZ2V0QWxsIiwiJGNvdW50IiwiY291bnQiLCIkZ2V0QWxsS2V5cyIsIiRkZWxldGUiLCIkY2xlYXIiLCIkY2xvc2UiLCJDbGF6emVyIiwiY29uc3RydWN0b3IiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwicGFyZW50IiwidG1wIiwiY2xhenoiLCJuYW1lIiwib3B0cyIsImZ1bmMiLCJwcm9wZXJ0eSIsImZyb20iLCJ0byIsImdldCIsIiRtZSIsInNldCIsImNiIiwiUmVhZHlTdGF0ZSIsInN0YXRpYyIsImlkYlJlcXVlc3QiLCJtZSIsImluaGVyaXQiLCJFdmVudFRhcmdldCIsImdldHRlciIsImhhbmRsZXJFdmVudCIsInRoaXoiLCIkX3Byb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIiRzdWNjZXNzIiwiZXZlbnQiLCIkZmFpbGVkIiwiaWRiT3BlbkRCUmVxdWVzdCIsImFwcGx5IiwiYXJndW1lbnRzIiwiaWRiQ29uc3VsdGFudCIsInF1ZXJ5IiwidGFyZ2V0IiwicmVzdWx0IiwiZ2V0S2V5IiwiZ2V0QWxsIiwiZ2V0QWxsS2V5cyIsImRpcmVjdGlvbiIsIm9wZW5DdXJzb3IiLCJvcGVuS2V5Q3Vyc29yIiwiaWRiRXZlbnRUYXJnZXQiLCJpZGJTdG9yZSIsImlkYk1vZGVsIiwiaWRiVHJhbnNhY3Rpb24iLCIkbG9nIiwiaW5kZXhlZERCIiwibW96SW5kZXhlZERCIiwid2Via2l0SW5kZXhlZERCIiwibXNJbmRleGVkREIiLCJJREJUcmFuc2FjdGlvbiIsIndlYmtpdElEQlRyYW5zYWN0aW9uIiwibXNJREJUcmFuc2FjdGlvbiIsIklEQktleVJhbmdlIiwid2Via2l0SURCS2V5UmFuZ2UiLCJtc0lEQktleVJhbmdlIiwiYWxlcnQiLCJ2ZXJzaW9uIiwiJF9tZSIsImUiLCJFdmVudCIsIiRlbWl0Iiwib3BlbiIsImRlbGV0ZURhdGFiYXNlIiwiZmlyc3QiLCJzZWNvbmQiLCJjbXAiLCJvbmFib3J0Iiwib25jbG9zZSIsIm9uZXJyb3IiLCJvbnZlcnNpb25jaGFuZ2UiLCIkX3VwZ3JhZGVuZWVkZWRzIiwicHVzaCIsImFsbE1pZ3JhdGlvbnMiLCIkdXBncmFkZW5lZWRlZCIsIm9wZW5SZXF1ZXN0Iiwia2V5cyIsIm1hcCIsIm9sZFZlcnNpb24iLCJuZXdWZXJzaW9uIiwibWlncmF0aW9ucyIsIkFycmF5IiwibWlncmF0aW9uIiwiY2JFcnIiLCJsYXN0UnEiLCJsYXN0RXZlbnQiLCIkb3BlbmVkIiwiJG5hbWUiLCIkdmVyc2lvbiIsImNhdGNoIiwicnEiLCJjbG9zZSIsIm9wdGlvbnMiLCJjcmVhdGVPYmplY3RTdG9yZSIsImRlbGV0ZU9iamVjdFN0b3JlIiwiJF9tb2RlbHMiLCIkc29ja2V0Iiwic3RvcmVOYW1lcyIsIm1vZGUiLCJhcmdzIiwidHJhbnNhY3Rpb24iLCJhY3Rpb24iLCIkdHJhbnNhY3Rpb24iLCJ0eCIsInN0b3Jlc09iaiIsInN0b3JlcyIsInN0b3JlTmFtZSIsIiRzdG9yZSIsIlRyYW5zYWN0aW9uTW9kZSIsIlJlYWRPbmx5IiwiUmVhZFdyaXRlIiwiaWRiSW5kZXgiLCJrZXkiLCJwdXQiLCJhZGQiLCJkZWxldGUiLCJjbGVhciIsImluZGV4IiwiZmllbGRzIiwic29ydCIsImpvaW4iLCJjcmVhdGVJbmRleCIsImluZGV4TmFtZSIsImRlbGV0ZUluZGV4IiwidHlwZSIsImNhbGxiYWNrIiwiJF9saXN0ZW5lcnMiLCJzdGFjayIsImkiLCJsIiwibGVuZ3RoIiwic3BsaWNlIiwiJHVuYmluZCIsImNhbGwiLCJpZGJRdWVyeSIsImxiUmVzb3VyY2UiLCIkdGltZW91dCIsImRlZXBGaWVsZCIsIm9iaiIsImZpZWxkIiwic3BsaXQiLCJsYXN0RmllbGQiLCJwb3AiLCJfc2V0Iiwic2hpZnQiLCJnZXRGaWVsZFZhbHVlIiwic2V0RmllbGRWYWx1ZSIsImlkYk1vZGVsRmFjdG9yeSIsImtleVBhdGgiLCJhdXRvSW5jcmVtZW50IiwiJGlkIiwiJGluZGV4ZXNUb0NyZWF0ZSIsIiRkYiIsIiRjcmVhdGVTdG9yZSIsIiRkcm9wU3RvcmUiLCIkd3JpdGVyIiwiJHJlYWRlciIsIiRnZXRWYWx1ZXMiLCIkZ2V0SW5zdGFuY2UiLCIkc2V0VmFsdWVzIiwiJHNldExvY2FsVmFsdWVzIiwiJGdldEtleSIsImFyciIsIiRnZXRLZXlGcm9tIiwiZmlsdGVycyIsInVuZGVmaW5lZCIsIiRpbnN0YW5jZXMiLCIkc2V0IiwiJGZpZWxkcyIsInZhbHVlcyIsImJ1aWxkQ2FsbGJhY2siLCJhY3Rpb25zIiwiJF9yZW1vdGUiLCIkX3ZhbHVlcyIsImxvY2FsIiwicmVtb3RlIiwiRXJyb3IiLCJzdWJzY3JpYmUiLCJtb2RlbE5hbWUiLCJldmVudE5hbWUiLCJtb2RlbElkIiwiJGtleSIsIiRzZXRSZW1vdGVWYWx1ZXMiLCJvYmplY3RTdG9yZSIsImFib3J0IiwiJGNvbXBsZXRlZCIsIiRyZXN1bHQiLCIkb3BlbkN1cnNvciIsImN1cnNvciIsImNvbnRpbnVlIiwiYWNjZXNzVG9rZW5JZCIsImN1cnJlbnRVc2VySWQiLCIkZGVmVXJsU2VydmVyIiwiJGRlZkFjY2Vzc1Rva2VuSWQiLCIkZGVmQ3VycmVudFVzZXJJZCIsIiRjb25uZWN0IiwiY29ubmVjdCIsIiR1cmwiLCJvbiIsImVtaXQiLCIkYWNjZXNzVG9rZW5JZCIsInVzZXJJZCIsIiRjdXJyZW50VXNlcklkIiwiJHB1c2hMaXN0ZW5lciIsInN1YnNjcmlwdGlvbk5hbWUiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJpZHgiLCJpbmRleE9mIiwiJHNldFVybFNlcnZlciIsIiRzZXRDcmVkZW50aWFscyIsImxiIiwiZ2V0SG9zdCIsIm0iLCJtYXRjaCIsInVybEJhc2VIb3N0IiwibG9jYXRpb24iLCJob3N0IiwibGJBdXRoIiwicHJvcHMiLCJwcm9wc1ByZWZpeCIsInNhdmUiLCJzdG9yYWdlIiwiZXJyIiwibG9hZCIsInNlc3Npb25TdG9yYWdlIiwiZm9yRWFjaCIsImN1cnJlbnRVc2VyRGF0YSIsInJlbWVtYmVyTWUiLCJzZXRVc2VyIiwidXNlckRhdGEiLCJjbGVhclVzZXIiLCJjbGVhclN0b3JhZ2UiLCJsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IiLCIkcSIsInJlcXVlc3QiLCJjb25maWciLCJoZWFkZXJzIiwiYXV0aEhlYWRlciIsIl9faXNHZXRDdXJyZW50VXNlcl9fIiwicmVzIiwiYm9keSIsImVycm9yIiwic3RhdHVzIiwid2hlbiIsInVybEJhc2UiLCJzZXRBdXRoSGVhZGVyIiwiaGVhZGVyIiwiZ2V0QXV0aEhlYWRlciIsInNldFVybEJhc2UiLCJnZXRVcmxCYXNlIiwiJHJlc291cmNlIiwicGFyYW1zIiwib3JpZ2luYWxVcmwiLCJyZXNvdXJjZSIsIiRzYXZlIiwic3VjY2VzcyIsInVwc2VydCIsImZhY3RvcnkiLCJwcm92aWRlciIsIiRodHRwUHJvdmlkZXIiLCJpbnRlcmNlcHRvcnMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOzs7Ozs7Ozs7Ozs7O0FBYUEsd0I7Ozs7OztBQ2JBOzs7O0FBR0E7O0FDR0EsS0FBSSxZQUFZLHVCQUF1Qjs7QURBdkM7O0FDSUEsS0FBSSxlQUFlLHVCQUF1Qjs7QURIMUM7O0FDT0EsS0FBSSxxQkFBcUIsdUJBQXVCOztBRExoRDs7QUNTQSxLQUFJLGtCQUFrQix1QkFBdUI7O0FETjdDOztBQ1VBLEtBQUksUUFBUSx1QkFBdUI7O0FEVG5DOztBQ2FBLEtBQUksYUFBYSx1QkFBdUI7O0FEWnhDOztBQ2dCQSxLQUFJLGFBQWEsdUJBQXVCOztBRGZ4Qzs7QUNtQkEsS0FBSSxtQkFBbUIsdUJBQXVCOztBRGxCOUM7O0FDc0JBLEtBQUksYUFBYSx1QkFBdUI7O0FEckJ4Qzs7QUN5QkEsS0FBSSxtQkFBbUIsdUJBQXVCOztBRHhCOUM7O0FDNEJBLEtBQUksYUFBYSx1QkFBdUI7O0FEM0J4Qzs7QUMrQkEsS0FBSSxjQUFjLHVCQUF1Qjs7QUQ3QnpDOztBQ2lDQSxLQUFJLE9BQU8sdUJBQXVCOztBQUVsQyxVQUFTLHVCQUF1QixLQUFLLEVBQUUsT0FBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsU0FBUzs7O0FEakN2RixtQkFBR0EsUUFBUUMsT0FBTyxVQUFV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QUFRaUo7OztPQUdqQixPQUFPdEc7Ozs7R0FNWCxPQUFPdk0sT0FDSmlVLFFBQVEsVUFBVXhDLFFBQ2xCeUMsU0FBUyxjQUFjM0gsWUFDdkIwSCxRQUFRLDRCQUE0QnpCLDBCQUNwQ0csT0FBTyxDQUFDLGlCQUFpQixVQUFTd0IsZUFBZTtLQUFFOztLQUNsREEsY0FBY0MsYUFBYTVMLEtBQUsiLCJmaWxlIjoibmctaWRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBkZWYzOGY2N2VkYzc4YWNkNDUxNlxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIGltcG9ydCBpZGJVdGlscyBmcm9tICcuL3V0aWxzL2lkYlV0aWxzJztcclxuLy8gaW1wb3J0IGlkYkV2ZW50cyBmcm9tICcuL3V0aWxzL2lkYkV2ZW50cyc7XHJcbi8vIGltcG9ydCBxcyBmcm9tICcuL3V0aWxzL3FzJztcclxuXHJcbi8vIGltcG9ydCBpZGJTb2NrZXQgZnJvbSAnLi9zZXJ2aWNlcy9pZGJTb2NrZXQnO1xyXG4vLyBpbXBvcnQgaWRiIGZyb20gJy4vc2VydmljZXMvaWRiJztcclxuLy8gaW1wb3J0IGlkYk1vZGVsIGZyb20gJy4vc2VydmljZXMvaWRiTW9kZWwnO1xyXG4vLyBpbXBvcnQgaWRiUXVlcnkgZnJvbSAnLi9zZXJ2aWNlcy9pZGJRdWVyeSc7XHJcblxyXG4vLyBpbXBvcnQgbGIgZnJvbSAnLi9zZXJ2aWNlcy9sYic7XHJcblxyXG5pbXBvcnQgJy4vdjEvaW5kZXgnO1xyXG5cclxuLy8gbGIoYW5ndWxhci5tb2R1bGUoJ25nLmlkYicsIFsnbmcudjEuaWRiJ10pKVxyXG4gIFxyXG4vLyAgIC5zZXJ2aWNlKCdpZGJFdmVudHMnLCBpZGJFdmVudHMpXHJcbi8vICAgLnNlcnZpY2UoJ2lkYlV0aWxzJywgaWRiVXRpbHMpXHJcbi8vICAgLnNlcnZpY2UoJ3FzJywgcXMpXHJcblxyXG4vLyAgIC8vIFRha2Ugb2YgbGItc2VydmljZXMuanNcclxuLy8gICAuc2VydmljZSgnaWRiJywgaWRiKVxyXG4vLyAgIC5zZXJ2aWNlKCdpZGJNb2RlbCcsIGlkYk1vZGVsKVxyXG4vLyAgIC5zZXJ2aWNlKCdpZGJRdWVyeScsIGlkYlF1ZXJ5KVxyXG4vLyAgIC5zZXJ2aWNlKCdpZGJTb2NrZXQnLCBpZGJTb2NrZXQpXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gR2xvYmFsZXNcclxuaW1wb3J0IENsYXp6ZXIgIGZyb20gJy4vQ2xhenplcic7XHJcblxyXG4vLyBSZXF1ZXN0XHJcbmltcG9ydCBpZGJSZXF1ZXN0ICAgICAgICAgZnJvbSAnLi9pZGJSZXF1ZXN0JztcclxuaW1wb3J0IGlkYk9wZW5EQlJlcXVlc3QgICBmcm9tICcuL2lkYk9wZW5EQlJlcXVlc3QnO1xyXG5cclxuaW1wb3J0IGlkYkNvbnN1bHRhbnQgICBmcm9tICcuL2lkYkNvbnN1bHRhbnQnO1xyXG5cclxuLy8gUHJpbmNpcGFsZXNcclxuaW1wb3J0IGlkYiAgICAgICAgICAgICAgZnJvbSAnLi9pZGInO1xyXG5pbXBvcnQgaWRiU3RvcmUgICAgICAgICBmcm9tICcuL2lkYlN0b3JlJztcclxuaW1wb3J0IGlkYkluZGV4ICAgICAgICAgZnJvbSAnLi9pZGJJbmRleCc7XHJcbmltcG9ydCBpZGJFdmVudFRhcmdldCAgIGZyb20gJy4vaWRiRXZlbnRUYXJnZXQnO1xyXG5pbXBvcnQgaWRiTW9kZWwgICAgICAgICBmcm9tICcuL2lkYk1vZGVsJztcclxuaW1wb3J0IGlkYlRyYW5zYWN0aW9uICAgZnJvbSAnLi9pZGJUcmFuc2FjdGlvbic7XHJcbmltcG9ydCBpZGJRdWVyeSAgICAgICAgIGZyb20gJy4vaWRiUXVlcnknO1xyXG5pbXBvcnQgaWRiU29ja2V0ICAgICAgICBmcm9tICcuL2lkYlNvY2tldCc7XHJcblxyXG5pbXBvcnQgbGIgZnJvbSAnLi9sYic7XHJcblxyXG5sYihhbmd1bGFyLm1vZHVsZSgnbmcuaWRiJywgW10pKVxyXG4gIFxyXG4gIC5jb25zdGFudCgnaW8nLCBpbylcclxuICAuc2VydmljZSgnQ2xhenplcicsIENsYXp6ZXIpXHJcblxyXG4gIC5jb25zdGFudCgnaWRiVmVyc2lvbicsICcwLjAuMScpXHJcbiAgXHJcbiAgLnNlcnZpY2UoJ2lkYlJlcXVlc3QnLCBpZGJSZXF1ZXN0KVxyXG4gIC5zZXJ2aWNlKCdpZGJPcGVuREJSZXF1ZXN0JywgaWRiT3BlbkRCUmVxdWVzdClcclxuICAuc2VydmljZSgnaWRiQ29uc3VsdGFudCcsIGlkYkNvbnN1bHRhbnQpXHJcbiAgLnNlcnZpY2UoJ2lkYicsIGlkYilcclxuICAuc2VydmljZSgnaWRiU3RvcmUnLCBpZGJTdG9yZSlcclxuICAuc2VydmljZSgnaWRiSW5kZXgnLCBpZGJJbmRleClcclxuICAuc2VydmljZSgnaWRiRXZlbnRUYXJnZXQnLCBpZGJFdmVudFRhcmdldClcclxuICAuc2VydmljZSgnaWRiTW9kZWwnLCBpZGJNb2RlbClcclxuICAuc2VydmljZSgnaWRiU29ja2V0JywgaWRiU29ja2V0KVxyXG4gIC5zZXJ2aWNlKCdpZGJRdWVyeScsIGlkYlF1ZXJ5KVxyXG4gIC5zZXJ2aWNlKCdpZGJUcmFuc2FjdGlvbicsIGlkYlRyYW5zYWN0aW9uKVxyXG5cclxuICAuc2VydmljZSgnc29ja2V0JywgZnVuY3Rpb24oaWRiU29ja2V0LCBBUElfUk9PVCkgeyAnbmdJbmplY3QnXHJcbiAgXHJcbiAgICByZXR1cm4gbmV3IGlkYlNvY2tldChcclxuICAgICAgJ2h0dHA6Ly9sb2NhbGhvc3Q6MzIwMC8nLFxyXG4gICAgICBsb2NhbFN0b3JhZ2VbJyRMb29wQmFjayRhY2Nlc3NUb2tlbklkJ10sXHJcbiAgICAgIGxvY2FsU3RvcmFnZVsnJExvb3BCYWNrJGN1cnJlbnRVc2VySWQnXVxyXG4gICAgKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLnNlcnZpY2UoJ2RiJywgZnVuY3Rpb24gKGlkYiwgc29ja2V0KSB7ICduZ0luamVjdCc7XHJcblxyXG4gICAgY29uc3QgZGIgPSBuZXcgaWRiKCdhYWEnLCA0LCBzb2NrZXQpXHJcblxyXG4gICAgZGJcclxuICAgICAgLiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKFsnJG9wZW5lZCddKTsgfSlcclxuICAgICAgLiRhYm9ydGVkKGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coWyckYWJvcnRlZCddKTsgfSlcclxuICAgICAgLiRjbG9zZWQoZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZyhbJyRjbG9zZWQnXSk7IH0pXHJcbiAgICAgIC4kZXJyb3IoZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZyhbJyRlcnJvciddKTsgfSlcclxuICAgICAgLiR2ZXJzaW9uQ2hhbmdlZChmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKFsnJHZlcnNpb25DaGFuZ2VkJ10pOyB9KVxyXG5cclxuICAgICAgLiRhdXRvbWlncmF0aW9uKHtcclxuICAgICAgICAxOiBmdW5jdGlvbiAoZGIpIHtcclxuICAgICAgICAgIGRiLiRtb2RlbCgnVHJhYmFqYWRvcicpXHJcbiAgICAgICAgICAgIC4kY3JlYXRlKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIDI6IGZ1bmN0aW9uIChkYikge1xyXG4gICAgICAgICAgZGIuJG1vZGVsKCdFbXBsZWFkbycpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAuJGFkZEluZGV4KFsnbm9tYnJlcycsICdhcGVsbGlkb3MnXSlcclxuICAgICAgICAgICAgLiRhZGRJbmRleCgnbmFjaW1pZW50bycpXHJcblxyXG4gICAgICAgICAgICAuJGNyZWF0ZShmdW5jdGlvbiAobW9kZWwsIHN0b3JlKSB7XHJcblxyXG4gICAgICAgICAgICAgIHN0b3JlLiRjcmVhdGVJbmRleCgnY2knKTtcclxuICAgICAgICAgICAgICBzdG9yZS4kY3JlYXRlSW5kZXgoJ2NvZCcpO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIDM6IGZ1bmN0aW9uIChkYikge1xyXG4gICAgICAgICAgZGIuJG1vZGVsKCdUcmFiYWphZG9yJylcclxuICAgICAgICAgICAgLiRkcm9wKClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAuJGRyb3AoKS50aGVuKGZ1bmN0aW9uIChkYikge1xyXG4gICAgICAgIGRiLiRvcGVuKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkYjtcclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIC5zZXJ2aWNlKCdFbXBsZWFkbycsIGZ1bmN0aW9uIChkYikgeyAnbmdJbmplY3QnO1xyXG4gICAgcmV0dXJuIHdpbmRvdy5FbXBsZWFkbyA9IGRiLiRtb2RlbCgnRW1wbGVhZG8nKVxyXG4gICAgICAuJGZpZWxkKCdjb2QnLCAgICAgICAgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pXHJcbiAgICAgIC4kZmllbGQoJ2NpJywgICAgICAgICB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSlcclxuICAgICAgLiRmaWVsZCgnbm9tYnJlcycsICAgIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KVxyXG4gICAgICAuJGZpZWxkKCdhcGVsbGlkb3MnLCAgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pXHJcbiAgICAgIC4kZmllbGQoJ25hY2ltaWVudG8nLCB7IFwidHlwZVwiOiBcImRhdGVcIiB9KVxyXG4gICAgICAuJGZpZWxkKCdpbmdyZXNvJywgICAgeyBcInR5cGVcIjogXCJkYXRlXCIgfSlcclxuICAgICAgLiRmaWVsZCgnZGlyZWNjaW9uJywgIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCJ9KVxyXG4gICAgICAuJHJlbW90ZShcclxuICAgICAgICAnL3RyYWJhamFkb3Jlcy86aWQnLFxyXG4gICAgICAgIHsgJ2lkJzogJ0BpZCcgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAnZmluZCc6ICAgeyB1cmw6ICcvdHJhYmFqYWRvcmVzL19maW5kV2l0aFZlcnNpb24nLCBtZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlLCB9LFxyXG4gICAgICAgICAgLy8gJ2NyZWF0ZSc6IHsgdXJsOiAnL3RyYWJhamFkb3JlcycsIG1ldGhvZDogJ1BPU1QnLCB9LFxyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgICAvLyAudmVyc2lvbmluZygpXHJcbiAgICAgIC4kYnVpbGQoZnVuY3Rpb24gKEVtcGxlYWRvKSB7XHJcblxyXG4gICAgICAgIEVtcGxlYWRvLnByb3RvdHlwZS4kY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBFbXBsZWFkby5wcm90b3R5cGUuZ2V0Tm9tYnJlID0gZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5ub21icmVzICsgJyAnICsgdGhpcy5hcGVsbGlkb3M7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG4gIH0pXHJcblxyXG4ucnVuKGZ1bmN0aW9uIChkYiwgRW1wbGVhZG8pIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgRW1wbGVhZG8uJHB1dCh7XHJcbiAgICBpZDogMSxcclxuICAgICdub21icmVzJzogJ0FsZXhhbmRlcidcclxuICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcclxuICAgIC8vXHJcbiAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XHJcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gRW1wbGVhZG8uJHB1dCh7XHJcbiAgICAgIGlkOiAyLFxyXG4gICAgICAnbm9tYnJlcyc6ICdHdWlsbGVtbydcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XHJcbiAgICB9KTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBFbXBsZWFkby4kcHV0KHtcclxuICAgICAgaWQ6IDIsXHJcbiAgICAgICdhcGVsbGlkb3MnOiAnU2VtaW5hcmlvJ1xyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFsncHV0JywgcmVjb3JkLm5vbWJyZXNdKTtcclxuICAgIH0pO1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIEVtcGxlYWRvLiRwdXQoe1xyXG4gICAgICBpZDogNCxcclxuICAgICAgJ25vbWJyZXMnOiAnQXhlbCdcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XHJcbiAgICB9KTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBFbXBsZWFkby4kcHV0KHtcclxuICAgICAgJ25vbWJyZXMnOiAnR2FicmllbCdcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XHJcbiAgICB9KTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBFbXBsZWFkby4kYWRkKHtcclxuICAgICAgJ25vbWJyZXMnOiAnRXZlcnQnXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcclxuICAgICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xyXG4gICAgfSk7XHJcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCByID0gRW1wbGVhZG8uJGdldCgyKTtcclxuICAgIGNvbnNvbGUubG9nKFsnZ2V0Jywgcl0pXHJcbiAgICByZXR1cm4gci4kcHJvbWlzZTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHIgPSBFbXBsZWFkby4kZmluZCgpLiRnZXRSZXN1bHQoKTtcclxuICAgIGNvbnNvbGUubG9nKFsnZmluZCcsIHJdKTtcclxuICAgIHJldHVybiByLiRwcm9taXNlO1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgciA9IEVtcGxlYWRvLiRnZXRBbGwoKTtcclxuICAgIGNvbnNvbGUubG9nKFsnZ2V0QWxsJywgcl0pO1xyXG4gICAgcmV0dXJuIHIuJHByb21pc2U7XHJcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gRW1wbGVhZG8uJGNvdW50KCkudGhlbihmdW5jdGlvbiAoY291bnQpIHtcclxuICAgICAgY29uc29sZS5sb2coWydjb3VudCcsIGNvdW50XSk7XHJcbiAgICB9KTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHIgPSBFbXBsZWFkby4kZ2V0QWxsS2V5cygpO1xyXG4gICAgY29uc29sZS5sb2coWydnZXRBbGxLZXlzJywgcl0pO1xyXG4gICAgcmV0dXJuIHIuJHByb21pc2U7XHJcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gRW1wbGVhZG8uJGRlbGV0ZSgyKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc29sZS5sb2coWydkZWxldGUnXSk7XHJcbiAgICB9KTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBFbXBsZWFkby4kY291bnQoKS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhbJ2NvdW50JywgY291bnRdKTtcclxuICAgIH0pO1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIEVtcGxlYWRvLiRjbGVhcigpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhbJ2NsZWFyJ10pO1xyXG4gICAgfSk7XHJcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gRW1wbGVhZG8uJGNvdW50KCkudGhlbihmdW5jdGlvbiAoY291bnQpIHtcclxuICAgICAgY29uc29sZS5sb2coWydjb3VudCcsIGNvdW50XSk7XHJcbiAgICB9KTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIGRiLiRjbG9zZSgpO1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgZGIuJG9wZW4oKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgZGIuJGNsb3NlKCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbn0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gR2xvYmFsZXNcblxudmFyIF9DbGF6emVyID0gcmVxdWlyZSgnLi9DbGF6emVyJyk7XG5cbnZhciBfQ2xhenplcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9DbGF6emVyKTtcblxudmFyIF9pZGJSZXF1ZXN0ID0gcmVxdWlyZSgnLi9pZGJSZXF1ZXN0Jyk7XG5cbnZhciBfaWRiUmVxdWVzdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJSZXF1ZXN0KTtcblxudmFyIF9pZGJPcGVuREJSZXF1ZXN0ID0gcmVxdWlyZSgnLi9pZGJPcGVuREJSZXF1ZXN0Jyk7XG5cbnZhciBfaWRiT3BlbkRCUmVxdWVzdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJPcGVuREJSZXF1ZXN0KTtcblxudmFyIF9pZGJDb25zdWx0YW50ID0gcmVxdWlyZSgnLi9pZGJDb25zdWx0YW50Jyk7XG5cbnZhciBfaWRiQ29uc3VsdGFudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJDb25zdWx0YW50KTtcblxudmFyIF9pZGIgPSByZXF1aXJlKCcuL2lkYicpO1xuXG52YXIgX2lkYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGIpO1xuXG52YXIgX2lkYlN0b3JlID0gcmVxdWlyZSgnLi9pZGJTdG9yZScpO1xuXG52YXIgX2lkYlN0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlN0b3JlKTtcblxudmFyIF9pZGJJbmRleCA9IHJlcXVpcmUoJy4vaWRiSW5kZXgnKTtcblxudmFyIF9pZGJJbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJJbmRleCk7XG5cbnZhciBfaWRiRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuL2lkYkV2ZW50VGFyZ2V0Jyk7XG5cbnZhciBfaWRiRXZlbnRUYXJnZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiRXZlbnRUYXJnZXQpO1xuXG52YXIgX2lkYk1vZGVsID0gcmVxdWlyZSgnLi9pZGJNb2RlbCcpO1xuXG52YXIgX2lkYk1vZGVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYk1vZGVsKTtcblxudmFyIF9pZGJUcmFuc2FjdGlvbiA9IHJlcXVpcmUoJy4vaWRiVHJhbnNhY3Rpb24nKTtcblxudmFyIF9pZGJUcmFuc2FjdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJUcmFuc2FjdGlvbik7XG5cbnZhciBfaWRiUXVlcnkgPSByZXF1aXJlKCcuL2lkYlF1ZXJ5Jyk7XG5cbnZhciBfaWRiUXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiUXVlcnkpO1xuXG52YXIgX2lkYlNvY2tldCA9IHJlcXVpcmUoJy4vaWRiU29ja2V0Jyk7XG5cbnZhciBfaWRiU29ja2V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlNvY2tldCk7XG5cbnZhciBfbGIgPSByZXF1aXJlKCcuL2xiJyk7XG5cbnZhciBfbGIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vLyBSZXF1ZXN0XG4oMCwgX2xiMi5kZWZhdWx0KShhbmd1bGFyLm1vZHVsZSgnbmcuaWRiJywgW10pKS5jb25zdGFudCgnaW8nLCBpbykuc2VydmljZSgnQ2xhenplcicsIF9DbGF6emVyMi5kZWZhdWx0KS5jb25zdGFudCgnaWRiVmVyc2lvbicsICcwLjAuMScpLnNlcnZpY2UoJ2lkYlJlcXVlc3QnLCBfaWRiUmVxdWVzdDIuZGVmYXVsdCkuc2VydmljZSgnaWRiT3BlbkRCUmVxdWVzdCcsIF9pZGJPcGVuREJSZXF1ZXN0Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJDb25zdWx0YW50JywgX2lkYkNvbnN1bHRhbnQyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYicsIF9pZGIyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlN0b3JlJywgX2lkYlN0b3JlMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJJbmRleCcsIF9pZGJJbmRleDIuZGVmYXVsdCkuc2VydmljZSgnaWRiRXZlbnRUYXJnZXQnLCBfaWRiRXZlbnRUYXJnZXQyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYk1vZGVsJywgX2lkYk1vZGVsMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJTb2NrZXQnLCBfaWRiU29ja2V0Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJRdWVyeScsIF9pZGJRdWVyeTIuZGVmYXVsdCkuc2VydmljZSgnaWRiVHJhbnNhY3Rpb24nLCBfaWRiVHJhbnNhY3Rpb24yLmRlZmF1bHQpLnNlcnZpY2UoJ3NvY2tldCcsIGZ1bmN0aW9uIChpZGJTb2NrZXQsIEFQSV9ST09UKSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIG5ldyBpZGJTb2NrZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzIwMC8nLCBsb2NhbFN0b3JhZ2VbJyRMb29wQmFjayRhY2Nlc3NUb2tlbklkJ10sIGxvY2FsU3RvcmFnZVsnJExvb3BCYWNrJGN1cnJlbnRVc2VySWQnXSk7XG59KS5zZXJ2aWNlKCdkYicsIGZ1bmN0aW9uIChpZGIsIHNvY2tldCkge1xuICAnbmdJbmplY3QnO1xuXG4gIHZhciBkYiA9IG5ldyBpZGIoJ2FhYScsIDQsIHNvY2tldCk7XG5cbiAgZGIuJGJpbmQoJ29wZW5lZCcsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyhbJyRvcGVuZWQnXSk7XG4gIH0pLiRhYm9ydGVkKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyhbJyRhYm9ydGVkJ10pO1xuICB9KS4kY2xvc2VkKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyhbJyRjbG9zZWQnXSk7XG4gIH0pLiRlcnJvcihmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coWyckZXJyb3InXSk7XG4gIH0pLiR2ZXJzaW9uQ2hhbmdlZChmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coWyckdmVyc2lvbkNoYW5nZWQnXSk7XG4gIH0pLiRhdXRvbWlncmF0aW9uKHtcbiAgICAxOiBmdW5jdGlvbiBfKGRiKSB7XG4gICAgICBkYi4kbW9kZWwoJ1RyYWJhamFkb3InKS4kY3JlYXRlKCk7XG4gICAgfSxcbiAgICAyOiBmdW5jdGlvbiBfKGRiKSB7XG4gICAgICBkYi4kbW9kZWwoJ0VtcGxlYWRvJykuJGFkZEluZGV4KFsnbm9tYnJlcycsICdhcGVsbGlkb3MnXSkuJGFkZEluZGV4KCduYWNpbWllbnRvJykuJGNyZWF0ZShmdW5jdGlvbiAobW9kZWwsIHN0b3JlKSB7XG5cbiAgICAgICAgc3RvcmUuJGNyZWF0ZUluZGV4KCdjaScpO1xuICAgICAgICBzdG9yZS4kY3JlYXRlSW5kZXgoJ2NvZCcpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICAzOiBmdW5jdGlvbiBfKGRiKSB7XG4gICAgICBkYi4kbW9kZWwoJ1RyYWJhamFkb3InKS4kZHJvcCgpO1xuICAgIH1cbiAgfSkuJGRyb3AoKS50aGVuKGZ1bmN0aW9uIChkYikge1xuICAgIGRiLiRvcGVuKCk7XG4gIH0pO1xuXG4gIHJldHVybiBkYjtcbn0pLnNlcnZpY2UoJ0VtcGxlYWRvJywgZnVuY3Rpb24gKGRiKSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIHdpbmRvdy5FbXBsZWFkbyA9IGRiLiRtb2RlbCgnRW1wbGVhZG8nKS4kZmllbGQoJ2NvZCcsIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KS4kZmllbGQoJ2NpJywgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pLiRmaWVsZCgnbm9tYnJlcycsIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KS4kZmllbGQoJ2FwZWxsaWRvcycsIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KS4kZmllbGQoJ25hY2ltaWVudG8nLCB7IFwidHlwZVwiOiBcImRhdGVcIiB9KS4kZmllbGQoJ2luZ3Jlc28nLCB7IFwidHlwZVwiOiBcImRhdGVcIiB9KS4kZmllbGQoJ2RpcmVjY2lvbicsIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIgfSkuJHJlbW90ZSgnL3RyYWJhamFkb3Jlcy86aWQnLCB7ICdpZCc6ICdAaWQnIH0sIHtcbiAgICAnZmluZCc6IHsgdXJsOiAnL3RyYWJhamFkb3Jlcy9fZmluZFdpdGhWZXJzaW9uJywgbWV0aG9kOiAnR0VUJywgaXNBcnJheTogdHJ1ZSB9XG4gIH0pXG4gIC8vIC52ZXJzaW9uaW5nKClcbiAgLiRidWlsZChmdW5jdGlvbiAoRW1wbGVhZG8pIHtcblxuICAgIEVtcGxlYWRvLnByb3RvdHlwZS4kY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZGF0YSkge307XG5cbiAgICBFbXBsZWFkby5wcm90b3R5cGUuZ2V0Tm9tYnJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9tYnJlcyArICcgJyArIHRoaXMuYXBlbGxpZG9zO1xuICAgIH07XG4gIH0pO1xufSkucnVuKGZ1bmN0aW9uIChkYiwgRW1wbGVhZG8pIHtcbiAgJ25nSW5qZWN0JztcblxuICBFbXBsZWFkby4kcHV0KHtcbiAgICBpZDogMSxcbiAgICAnbm9tYnJlcyc6ICdBbGV4YW5kZXInXG4gIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xuICAgIC8vXG4gICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gRW1wbGVhZG8uJHB1dCh7XG4gICAgICBpZDogMixcbiAgICAgICdub21icmVzJzogJ0d1aWxsZW1vJ1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xuICAgICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xuICAgIH0pO1xuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gRW1wbGVhZG8uJHB1dCh7XG4gICAgICBpZDogMixcbiAgICAgICdhcGVsbGlkb3MnOiAnU2VtaW5hcmlvJ1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xuICAgICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xuICAgIH0pO1xuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gRW1wbGVhZG8uJHB1dCh7XG4gICAgICBpZDogNCxcbiAgICAgICdub21icmVzJzogJ0F4ZWwnXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XG4gICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XG4gICAgfSk7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBFbXBsZWFkby4kcHV0KHtcbiAgICAgICdub21icmVzJzogJ0dhYnJpZWwnXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XG4gICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XG4gICAgfSk7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBFbXBsZWFkby4kYWRkKHtcbiAgICAgICdub21icmVzJzogJ0V2ZXJ0J1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xuICAgICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xuICAgIH0pO1xuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgciA9IEVtcGxlYWRvLiRnZXQoMik7XG4gICAgY29uc29sZS5sb2coWydnZXQnLCByXSk7XG4gICAgcmV0dXJuIHIuJHByb21pc2U7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHZhciByID0gRW1wbGVhZG8uJGZpbmQoKS4kZ2V0UmVzdWx0KCk7XG4gICAgY29uc29sZS5sb2coWydmaW5kJywgcl0pO1xuICAgIHJldHVybiByLiRwcm9taXNlO1xuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgciA9IEVtcGxlYWRvLiRnZXRBbGwoKTtcbiAgICBjb25zb2xlLmxvZyhbJ2dldEFsbCcsIHJdKTtcbiAgICByZXR1cm4gci4kcHJvbWlzZTtcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEVtcGxlYWRvLiRjb3VudCgpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICBjb25zb2xlLmxvZyhbJ2NvdW50JywgY291bnRdKTtcbiAgICB9KTtcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHIgPSBFbXBsZWFkby4kZ2V0QWxsS2V5cygpO1xuICAgIGNvbnNvbGUubG9nKFsnZ2V0QWxsS2V5cycsIHJdKTtcbiAgICByZXR1cm4gci4kcHJvbWlzZTtcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEVtcGxlYWRvLiRkZWxldGUoMikudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zb2xlLmxvZyhbJ2RlbGV0ZSddKTtcbiAgICB9KTtcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEVtcGxlYWRvLiRjb3VudCgpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICBjb25zb2xlLmxvZyhbJ2NvdW50JywgY291bnRdKTtcbiAgICB9KTtcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEVtcGxlYWRvLiRjbGVhcigpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgY29uc29sZS5sb2coWydjbGVhciddKTtcbiAgICB9KTtcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEVtcGxlYWRvLiRjb3VudCgpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICBjb25zb2xlLmxvZyhbJ2NvdW50JywgY291bnRdKTtcbiAgICB9KTtcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgZGIuJGNsb3NlKCk7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIGRiLiRvcGVuKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICBkYi4kY2xvc2UoKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuLy8gUHJpbmNpcGFsZXNcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBDbGF6emVyXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIGZ1bmN0aW9uIENsYXp6ZXIgKGNvbnN0cnVjdG9yKSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NsYXp6JywgeyB2YWx1ZTogY29uc3RydWN0b3IgfHwgZnVuY3Rpb24gKCkge30gfSk7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdpbmhlcml0Jywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChwYXJlbnQpIHtcclxuICAgICAgbGV0IHRtcCA9IGZ1bmN0aW9uKCkge307XHJcbiAgICAgIHRtcC5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xyXG4gICAgICB0aGlzLmNsYXp6LnByb3RvdHlwZSA9IG5ldyB0bXAoKTtcclxuICAgICAgdGhpcy5jbGF6ei5wcm90b3R5cGUuY29uc3RydWN0b3IgPSB0aGlzLmNsYXp6O1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnc3RhdGljJywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jbGF6eiwgbmFtZSwge1xyXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3Byb3BlcnR5Jywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChuYW1lLCBvcHRzKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmNsYXp6LnByb3RvdHlwZSwgbmFtZSwgb3B0cyk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdtZXRob2QnLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKG5hbWUsIGZ1bmMpIHtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShuYW1lLCB7XHJcbiAgICAgICAgdmFsdWU6IGZ1bmNcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdnZXR0ZXInLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKGZyb20sIHRvKSB7XHJcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy4kbWVbdG9dO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdzZXR0ZXInLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKGZyb20sIHRvKSB7XHJcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgIHRoaXMuJG1lW3RvXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdoYW5kbGVyRXZlbnQnLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKGZyb20sIHRvKSB7XHJcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XHJcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgdGhpcy4kbWVbdG9dID0gY2I7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgcmV0dXJuIENsYXp6ZXI7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvQ2xhenplci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIENsYXp6ZXJcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG5cbiAgZnVuY3Rpb24gQ2xhenplcihjb25zdHJ1Y3Rvcikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY2xhenonLCB7IHZhbHVlOiBjb25zdHJ1Y3RvciB8fCBmdW5jdGlvbiAoKSB7fSB9KTtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdpbmhlcml0Jywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShwYXJlbnQpIHtcbiAgICAgIHZhciB0bXAgPSBmdW5jdGlvbiB0bXAoKSB7fTtcbiAgICAgIHRtcC5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xuICAgICAgdGhpcy5jbGF6ei5wcm90b3R5cGUgPSBuZXcgdG1wKCk7XG4gICAgICB0aGlzLmNsYXp6LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHRoaXMuY2xheno7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdzdGF0aWMnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKG5hbWUsIF92YWx1ZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuY2xhenosIG5hbWUsIHtcbiAgICAgICAgdmFsdWU6IF92YWx1ZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdwcm9wZXJ0eScsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobmFtZSwgb3B0cykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuY2xhenoucHJvdG90eXBlLCBuYW1lLCBvcHRzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ21ldGhvZCcsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobmFtZSwgZnVuYykge1xuICAgICAgdGhpcy5wcm9wZXJ0eShuYW1lLCB7XG4gICAgICAgIHZhbHVlOiBmdW5jXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ2dldHRlcicsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZnJvbSwgdG8pIHtcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy4kbWVbdG9dO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3NldHRlcicsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZnJvbSwgdG8pIHtcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuJG1lW3RvXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ2hhbmRsZXJFdmVudCcsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZnJvbSwgdG8pIHtcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoY2IpIHtcbiAgICAgICAgICB0aGlzLiRtZVt0b10gPSBjYjtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICByZXR1cm4gQ2xhenplcjtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvQ2xhenplci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJSZXF1ZXN0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQlJlcXVlc3QgOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGFueSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTUV4Y2VwdGlvbj8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgKElEQk9iamVjdFN0b3JlIG9yIElEQkluZGV4IG9yIElEQkN1cnNvcik/IHNvdXJjZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb24/ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJSZXF1ZXN0UmVhZHlTdGF0ZSAgICAgICAgICAgICAgICAgICAgICAgcmVhZHlTdGF0ZTtcclxuICogXHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnN1Y2Nlc3M7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiB9O1xyXG4gKlxyXG4gKiBlbnVtIElEQlJlcXVlc3RSZWFkeVN0YXRlIHtcclxuICogICBcInBlbmRpbmdcIixcclxuICogICBcImRvbmVcIlxyXG4gKiB9O1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRfcHJvbWlzZVxyXG5cclxuICBjb25zdCBSZWFkeVN0YXRlID0gbmV3IENsYXp6ZXIoe30pXHJcbiAgICAgICAgLnN0YXRpYygnUGVuZGluZycsICAncGVuZGluZycpXHJcbiAgICAgICAgLnN0YXRpYygnRG9uZScsICAgICAnZG9uZScpO1xyXG4gIFxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiUmVxdWVzdCAobWUpIHtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAuaW5oZXJpdChFdmVudFRhcmdldClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gU3RhdGljc1xyXG4gIC5zdGF0aWMoJ1JlYWR5U3RhdGUnLCBSZWFkeVN0YXRlLmNsYXp6KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJHJlc3VsdCcsICdyZXN1bHQnKVxyXG4gIC5nZXR0ZXIoJyRlcnJvcicsICdlcnJvcicpXHJcbiAgLmdldHRlcignJHNvdXJjZScsICdzb3VyY2UnKVxyXG4gIC5nZXR0ZXIoJyRyZWFkeVN0YXRlJywgJ3JlYWR5U3RhdGUnKVxyXG4gIC5nZXR0ZXIoJyR0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEV2ZW50IGhhbmRsZXJzXHJcbiAgLmhhbmRsZXJFdmVudCgnJHN1Y2Nlc3MnLCAnb25zdWNjZXNzJylcclxuICAuaGFuZGxlckV2ZW50KCckZmFpbGVkJywgICdvbmVycm9yJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJvcGVydHlcclxuICAucHJvcGVydHkoJyRwcm9taXNlJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZiAodGhpei4kX3Byb21pc2UpIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcclxuXHJcbiAgICAgIC8vIENyZWFyIHByb21pc2UgcGFyYSBlbCByZXF1ZXN0XHJcbiAgICAgIHRoaXouJF9wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRoaXouJHN1Y2Nlc3MoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZXNvbHZlKGV2ZW50KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC4kZmFpbGVkKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBuZXcgQ2xhenplcih0aGl6LiRfcHJvbWlzZSkuc3RhdGljKCckcmVxdWVzdCcsIHRoaXogKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJSZXF1ZXN0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiUmVxdWVzdFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJSZXF1ZXN0IDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBhbnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0O1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01FeGNlcHRpb24/ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIChJREJPYmplY3RTdG9yZSBvciBJREJJbmRleCBvciBJREJDdXJzb3IpPyBzb3VyY2U7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uPyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCUmVxdWVzdFJlYWR5U3RhdGUgICAgICAgICAgICAgICAgICAgICAgIHJlYWR5U3RhdGU7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25zdWNjZXNzO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogfTtcclxuICpcclxuICogZW51bSBJREJSZXF1ZXN0UmVhZHlTdGF0ZSB7XHJcbiAqICAgXCJwZW5kaW5nXCIsXHJcbiAqICAgXCJkb25lXCJcclxuICogfTtcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXG4gIC8vICRfcHJvbWlzZVxuXG4gIHZhciBSZWFkeVN0YXRlID0gbmV3IENsYXp6ZXIoe30pLnN0YXRpYygnUGVuZGluZycsICdwZW5kaW5nJykuc3RhdGljKCdEb25lJywgJ2RvbmUnKTtcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlJlcXVlc3QobWUpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBIZXJlbmNpYVxuICAuaW5oZXJpdChFdmVudFRhcmdldClcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gU3RhdGljc1xuICAuc3RhdGljKCdSZWFkeVN0YXRlJywgUmVhZHlTdGF0ZS5jbGF6eilcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR2V0dGVyc1xuICAuZ2V0dGVyKCckcmVzdWx0JywgJ3Jlc3VsdCcpLmdldHRlcignJGVycm9yJywgJ2Vycm9yJykuZ2V0dGVyKCckc291cmNlJywgJ3NvdXJjZScpLmdldHRlcignJHJlYWR5U3RhdGUnLCAncmVhZHlTdGF0ZScpLmdldHRlcignJHRyYW5zYWN0aW9uJywgJ3RyYW5zYWN0aW9uJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRXZlbnQgaGFuZGxlcnNcbiAgLmhhbmRsZXJFdmVudCgnJHN1Y2Nlc3MnLCAnb25zdWNjZXNzJykuaGFuZGxlckV2ZW50KCckZmFpbGVkJywgJ29uZXJyb3InKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQcm9wZXJ0eVxuICAucHJvcGVydHkoJyRwcm9taXNlJywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICBpZiAodGhpei4kX3Byb21pc2UpIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcblxuICAgICAgLy8gQ3JlYXIgcHJvbWlzZSBwYXJhIGVsIHJlcXVlc3RcbiAgICAgIHRoaXouJF9wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0aGl6LiRzdWNjZXNzKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xuICAgICAgICB9KS4kZmFpbGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJlamVjdChldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIG5ldyBDbGF6emVyKHRoaXouJF9wcm9taXNlKS5zdGF0aWMoJyRyZXF1ZXN0JywgdGhpeik7XG5cbiAgICAgIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcbiAgICB9XG5cbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJSZXF1ZXN0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYk9wZW5EQlJlcXVlc3RcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCT3BlbkRCUmVxdWVzdCA6IElEQlJlcXVlc3Qge1xyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25ibG9ja2VkO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb251cGdyYWRlbmVlZGVkO1xyXG4gKiB9O1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYk9wZW5EQlJlcXVlc3QgKG1lKSB7XHJcbiAgICBpZGJSZXF1ZXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IC8vIExsYW1hciBhbCBjb25zdHJ1Y3RvcyBkZWwgcGFkcmVcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAuaW5oZXJpdChpZGJSZXF1ZXN0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gIC5oYW5kbGVyRXZlbnQoJyRibG9ja2VkJywgJ29uYmxvY2tlZCcpXHJcbiAgLmhhbmRsZXJFdmVudCgnJHVwZ3JhZGVuZWVkZWQnLCAnb251cGdyYWRlbmVlZGVkJylcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiT3BlbkRCUmVxdWVzdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYk9wZW5EQlJlcXVlc3RcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCT3BlbkRCUmVxdWVzdCA6IElEQlJlcXVlc3Qge1xyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25ibG9ja2VkO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb251cGdyYWRlbmVlZGVkO1xyXG4gKiB9O1xyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYk9wZW5EQlJlcXVlc3QobWUpIHtcbiAgICBpZGJSZXF1ZXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IC8vIExsYW1hciBhbCBjb25zdHJ1Y3RvcyBkZWwgcGFkcmVcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoaWRiUmVxdWVzdClcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRXZlbnQgaGFuZGxlcnNcbiAgLmhhbmRsZXJFdmVudCgnJGJsb2NrZWQnLCAnb25ibG9ja2VkJykuaGFuZGxlckV2ZW50KCckdXBncmFkZW5lZWRlZCcsICdvbnVwZ3JhZGVuZWVkZWQnKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYk9wZW5EQlJlcXVlc3QuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiQ29uc3VsdGFudFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJJbmRleC9JREJTdG9yZSB7XHJcbiAqICAgICAgICAgICAgYXR0cmlidXRlIERPTVN0cmluZyAgICAgIG5hbWU7XHJcbiAqIFxyXG4gKiAgIElEQlJlcXVlc3QgZ2V0KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRLZXkoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbChvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0QWxsS2V5cyhvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgY291bnQob3B0aW9uYWwgYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5DdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiAgIElEQlJlcXVlc3Qgb3BlbktleUN1cnNvcihvcHRpb25hbCBhbnkgcXVlcnksIG9wdGlvbmFsIElEQkN1cnNvckRpcmVjdGlvbiBkaXJlY3Rpb24gPSBcIm5leHRcIik7XHJcbiAqIH07XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiUmVxdWVzdCkgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiQ29uc3VsdGFudCAobWUpIHtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcclxuXHJcbiAgfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJG5hbWUnLCAnbmFtZScpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRnZXQnLCBmdW5jdGlvbiAocXVlcnkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZ2V0S2V5JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldEtleS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSlcclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldEFsbCcsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0QWxsLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZ2V0QWxsS2V5cycsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRBbGxLZXlzLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckY291bnQnLCBmdW5jdGlvbiAocXVlcnkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuY291bnQuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpXHJcbiAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRvcGVuQ3Vyc29yJywgZnVuY3Rpb24gKHF1ZXJ5LCBkaXJlY3Rpb24pIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUub3BlbkN1cnNvci5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRvcGVuS2V5Q3Vyc29yJywgZnVuY3Rpb24gKHF1ZXJ5LCBkaXJlY3Rpb24pIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUub3BlbktleUN1cnNvci5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJDb25zdWx0YW50LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiQ29uc3VsdGFudFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJJbmRleC9JREJTdG9yZSB7XHJcbiAqICAgICAgICAgICAgYXR0cmlidXRlIERPTVN0cmluZyAgICAgIG5hbWU7XHJcbiAqIFxyXG4gKiAgIElEQlJlcXVlc3QgZ2V0KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRLZXkoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbChvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0QWxsS2V5cyhvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgY291bnQob3B0aW9uYWwgYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5DdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiAgIElEQlJlcXVlc3Qgb3BlbktleUN1cnNvcihvcHRpb25hbCBhbnkgcXVlcnksIG9wdGlvbmFsIElEQkN1cnNvckRpcmVjdGlvbiBkaXJlY3Rpb24gPSBcIm5leHRcIik7XHJcbiAqIH07XHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiUmVxdWVzdCkge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiQ29uc3VsdGFudChtZSkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdldHRlcnNcbiAgLmdldHRlcignJG5hbWUnLCAnbmFtZScpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRnZXQnLCBmdW5jdGlvbiAocXVlcnkpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXQuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGdldEtleScsIGZ1bmN0aW9uIChxdWVyeSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldEtleS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZ2V0QWxsJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldEFsbC5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZ2V0QWxsS2V5cycsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0QWxsS2V5cy5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckY291bnQnLCBmdW5jdGlvbiAocXVlcnkpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5jb3VudC5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckb3BlbkN1cnNvcicsIGZ1bmN0aW9uIChxdWVyeSwgZGlyZWN0aW9uKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUub3BlbkN1cnNvci5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRvcGVuS2V5Q3Vyc29yJywgZnVuY3Rpb24gKHF1ZXJ5LCBkaXJlY3Rpb24pIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5vcGVuS2V5Q3Vyc29yLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJDb25zdWx0YW50LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJGYWN0b3J5IHtcclxuICogICBJREJPcGVuREJSZXF1ZXN0IG9wZW4oRE9NU3RyaW5nIG5hbWUsIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgbG9uZyB2ZXJzaW9uKTtcclxuICogICBJREJPcGVuREJSZXF1ZXN0IGRlbGV0ZURhdGFiYXNlKERPTVN0cmluZyBuYW1lKTtcclxuICogICBzaG9ydCBjbXAoYW55IGZpcnN0LCBhbnkgc2Vjb25kKTtcclxuICogfTtcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCRGF0YWJhc2UgOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZyAgICAgICAgICBuYW1lO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSB1bnNpZ25lZCBsb25nIGxvbmcgdmVyc2lvbjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgICAgIG9iamVjdFN0b3JlTmFtZXM7XHJcbiAqIFxyXG4gKiAgIElEQlRyYW5zYWN0aW9uIHRyYW5zYWN0aW9uKChET01TdHJpbmcgb3Igc2VxdWVuY2U8RE9NU3RyaW5nPikgc3RvcmVOYW1lcywgb3B0aW9uYWwgSURCVHJhbnNhY3Rpb25Nb2RlIG1vZGUgPSBcInJlYWRvbmx5XCIpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGNsb3NlKCk7XHJcbiAqICAgSURCT2JqZWN0U3RvcmUgY3JlYXRlT2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUsIG9wdGlvbmFsIElEQk9iamVjdFN0b3JlUGFyYW1ldGVycyBvcHRpb25zKTtcclxuICogICB2b2lkICAgICAgICAgICBkZWxldGVPYmplY3RTdG9yZShET01TdHJpbmcgbmFtZSk7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25hYm9ydDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uY2xvc2U7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb252ZXJzaW9uY2hhbmdlO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZGljdGlvbmFyeSBJREJPYmplY3RTdG9yZVBhcmFtZXRlcnMge1xyXG4gKiAgIChET01TdHJpbmcgb3Igc2VxdWVuY2U8RE9NU3RyaW5nPik/IGtleVBhdGggPSBudWxsO1xyXG4gKiAgIGJvb2xlYW4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9JbmNyZW1lbnQgPSBmYWxzZTtcclxuICogfTttZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYkV2ZW50VGFyZ2V0LCBpZGJTdG9yZSwgaWRiTW9kZWwsIGlkYk9wZW5EQlJlcXVlc3QsIGlkYlRyYW5zYWN0aW9uLCAkbG9nKSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxyXG4gIGNvbnN0IGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQjtcclxuICAvLyBObyB1c2UgXCJjb25zdCBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXHJcbiAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XHJcbiAgY29uc3QgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xyXG4gIGNvbnN0IElEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcclxuICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxyXG4gIFxyXG4gIGlmICghaW5kZXhlZERCKSB7XHJcbiAgICBhbGVydCgnU3UgbmF2ZWdhZG9yIG5vIHNvcG9ydGEgdW5hIHZlcnNpw7NuIGVzdGFibGUgZGUgaW5kZXhlZERCLiBUYWwgeSBjb21vIGxhcyBjYXJhY3RlcsOtc3RpY2FzIG5vIHNlcsOhbiB2YWxpZGFzJyk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXHJcbiAgLy8gJF9tZVxyXG4gIC8vICRvcGVuZWRcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvciAgXHJcbiAgY29uc3QgaWRiID0gZnVuY3Rpb24gaWRiKG5hbWUsIHZlcnNpb24sIHNvY2tldCkge1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpXHJcbiAgICAgIC5zdGF0aWMoJyRuYW1lJywgbmFtZSlcclxuICAgICAgLnN0YXRpYygnJHZlcnNpb24nLCB2ZXJzaW9uKVxyXG4gICAgICAuc3RhdGljKCckc29ja2V0Jywgc29ja2V0KTtcclxuXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihpZGIpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoaWRiRXZlbnRUYXJnZXQpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByb3BpZWRhZGVzXHJcbiAgLnByb3BlcnR5KCckX3VwZ3JhZGVuZWVkZWRzJywgeyB2YWx1ZTpbXSB9KVxyXG4gIC5wcm9wZXJ0eSgnJF9tb2RlbHMnLCB7IHZhbHVlOiB7fSB9KVxyXG5cclxuICAucHJvcGVydHkoJyRtZScsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy4kX21lO1xyXG4gICAgfSxcclxuICAgIHNldDogZnVuY3Rpb24gKG1lKSB7XHJcbiAgICAgIHRoaXMuJF9tZSA9IG1lO1xyXG4gICAgICBjb25zdCBlID0gbmV3IEV2ZW50KCdvcGVuZWQnKTtcclxuICAgICAgLy8gZS50YXJnZXQgPSB0aGlzO1xyXG4gICAgICB0aGlzLiRlbWl0KGUpO1xyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEdldHRlcnNcclxuICAuZ2V0dGVyKCckb2JqZWN0U3RvcmVOYW1lcycsICdvYmplY3RTdG9yZU5hbWVzJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJG9wZW4nLCBmdW5jdGlvbiAobmFtZSwgdmVyc2lvbikge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiT3BlbkRCUmVxdWVzdChpbmRleGVkREIub3Blbi5hcHBseShpbmRleGVkREIsIGFyZ3VtZW50cykpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZHJvcCcsIGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICBcclxuICAgIHJldHVybiBuZXcgaWRiT3BlbkRCUmVxdWVzdChpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UuYXBwbHkoaW5kZXhlZERCLCBhcmd1bWVudHMpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGNtcCcsIGZ1bmN0aW9uIChmaXJzdCwgc2Vjb25kKSB7XHJcbiAgICBcclxuICAgIHJldHVybiBpbmRleGVkREIuY21wKGZpcnN0LCBzZWNvbmQpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gIC5tZXRob2QoJyRhYm9ydGVkJywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgcmV0dXJuIHRoaXouJGJpbmQoJ29wZW5lZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpei4kbWUub25hYm9ydCA9IGNiO1xyXG4gICAgfSk7XHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNsb3NlZCcsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIHJldHVybiB0aGl6LiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXouJG1lLm9uY2xvc2UgPSBjYjtcclxuICAgIH0pO1xyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRlcnJvcicsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIHJldHVybiB0aGl6LiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXouJG1lLm9uZXJyb3IgPSBjYjtcclxuICAgIH0pO1xyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyR2ZXJzaW9uQ2hhbmdlZCcsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIHJldHVybiB0aGl6LiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXouJG1lLm9udmVyc2lvbmNoYW5nZSA9IGNiO1xyXG4gICAgfSk7XHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHVwZ3JhZGVuZWVkZWQnLCBmdW5jdGlvbiAoY2IpIHtcclxuICAgIFxyXG4gICAgdGhpcy4kX3VwZ3JhZGVuZWVkZWRzLnB1c2goY2IpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRhdXRvbWlncmF0aW9uJywgZnVuY3Rpb24gKGFsbE1pZ3JhdGlvbnMpIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy4kdXBncmFkZW5lZWRlZChmdW5jdGlvbiAodGhpeiwgb3BlblJlcXVlc3QsIGV2ZW50KSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKGFsbE1pZ3JhdGlvbnMpLm1hcChmdW5jdGlvbiAodmVyc2lvbikge1xyXG5cclxuICAgICAgICBpZiAoZXZlbnQub2xkVmVyc2lvbiA8IHZlcnNpb24gJiYgdmVyc2lvbiA8PSBldmVudC5uZXdWZXJzaW9uKSB7XHJcblxyXG4gICAgICAgICAgY29uc3QgbWlncmF0aW9ucyA9IEFycmF5LmlzQXJyYXkoYWxsTWlncmF0aW9uc1t2ZXJzaW9uXSk/XHJcbiAgICAgICAgICAgIGFsbE1pZ3JhdGlvbnNbdmVyc2lvbl06W2FsbE1pZ3JhdGlvbnNbdmVyc2lvbl1dO1xyXG5cclxuICAgICAgICAgICRsb2cubG9nKCdtaWdyYXRpb24gdicrdmVyc2lvbisnIHN0YXJ0cycpO1xyXG4gICAgICAgICAgbWlncmF0aW9ucy5tYXAoZnVuY3Rpb24gKG1pZ3JhdGlvbikge1xyXG4gICAgICAgICAgICBtaWdyYXRpb24odGhpeiwgb3BlblJlcXVlc3QsIGV2ZW50KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiAgICBcclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckb3BlbicsIGZ1bmN0aW9uIChjYiwgY2JFcnIpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgbGV0IGxhc3RScSA9IG51bGw7XHJcbiAgICBsZXQgbGFzdEV2ZW50ID0gbnVsbDtcclxuXHJcbiAgICBpZiAoIXRoaXouJG9wZW5lZCkge1xyXG5cclxuICAgICAgdGhpei4kb3BlbmVkID0gKGxhc3RScSA9IGlkYi4kb3Blbih0aGl6LiRuYW1lLCB0aGl6LiR2ZXJzaW9uKVxyXG4gICAgICAgIC4kdXBncmFkZW5lZWRlZChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICRsb2cubG9nKCd1cGdyYWRlbmVlZGVkIGlkYjogJyt0aGl6LiRuYW1lKycgdicrdGhpei4kdmVyc2lvbik7XHJcbiAgICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgICB0aGl6LiRfdXBncmFkZW5lZWRlZHMubWFwKGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgICBjYi5hcHBseSh0aGl6LCBbdGhpeiwgbGFzdFJxLCBldmVudF0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkpXHJcblxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICRsb2cubG9nKCdvcGVuZWQgaWRiOiAnK3RoaXouJG5hbWUrJyB2Jyt0aGl6LiR2ZXJzaW9uKTtcclxuICAgICAgICAgIGlmICh0aGl6LiRtZSAhPT0gZXZlbnQudGFyZ2V0LnJlc3VsdCl7XHJcbiAgICAgICAgICAgIHRoaXouJG1lID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxhc3RFdmVudCA9IGV2ZW50O1xyXG4gICAgICAgICAgaWYgKGNiKSBjYih0aGl6LCBsYXN0UnEsIGV2ZW50KTtcclxuICAgICAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgbGFzdFJxID0gbnVsbDtcclxuICAgICAgICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XHJcbiAgICAgICAgICBpZiAoY2JFcnIpIGNiRXJyKHRoaXosIGxhc3RScSwgZXZlbnQpO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSBlbHNlIGlmIChjYikge1xyXG5cclxuICAgICAgY2IodGhpeiwgbGFzdFJxLCBsYXN0RXZlbnQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpei4kb3BlbmVkO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZHJvcCcsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgIGNvbnN0IHJxID0gaWRiLiRkcm9wKHRoaXouJG5hbWUpXHJcbiAgICAgICAgLiRzdWNjZXNzKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVzb2x2ZSh0aGl6KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICBpZiAoY2IpIGNiKHJxKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNsb3NlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHRoaXMuJG9wZW5lZCA9IG51bGw7XHJcbiAgICB0aGlzLiRtZS5jbG9zZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRjcmVhdGVTdG9yZScsIGZ1bmN0aW9uIChuYW1lLCBvcHRpb25zKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJTdG9yZSh0aGlzLiRtZS5jcmVhdGVPYmplY3RTdG9yZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSk7XHJcbiAgICBcclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZHJvcFN0b3JlJywgZnVuY3Rpb24gKG5hbWUpIHtcclxuXHJcbiAgICB0aGlzLiRtZS5kZWxldGVPYmplY3RTdG9yZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJG1vZGVsJywgZnVuY3Rpb24gKG5hbWUsIHNvY2tldCkge1xyXG5cclxuICAgIC8vIFNpIGV4aXN0ZSBlbCBtb2RlbG8gcmV0b3JuYXJsb1xyXG4gICAgaWYodGhpcy4kX21vZGVsc1tuYW1lXSkgcmV0dXJuIHRoaXMuJF9tb2RlbHNbbmFtZV07XHJcblxyXG4gICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG8geSBndWFyZGFybG9cclxuICAgIHJldHVybiB0aGlzLiRfbW9kZWxzW25hbWVdID0gaWRiTW9kZWwodGhpcywgbmFtZSwgc29ja2V0IHx8IHRoaXMuJHNvY2tldCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyR0cmFuc2FjdGlvbicsIGZ1bmN0aW9uIChzdG9yZU5hbWVzLCBtb2RlKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuXHJcbiAgICByZXR1cm4gdGhpei4kb3BlbigpXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uICh0aGl6KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBpZGJUcmFuc2FjdGlvbih0aGl6LiRtZS50cmFuc2FjdGlvbi5hcHBseSh0aGl6LiRtZSwgYXJncykpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc3RvcmUnLCBmdW5jdGlvbiAoc3RvcmVOYW1lcykgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShzdG9yZU5hbWVzKSkgc3RvcmVOYW1lcyA9IFtzdG9yZU5hbWVzXTtcclxuXHJcbiAgICBmdW5jdGlvbiBhY3Rpb24obW9kZSkge1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXouJHRyYW5zYWN0aW9uKHN0b3JlTmFtZXMsIG1vZGUpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RvcmVzT2JqID0ge307XHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlcyA9IHN0b3JlTmFtZXMubWFwKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gc3RvcmVzT2JqW3N0b3JlTmFtZV0gPSB0eC4kc3RvcmUoc3RvcmVOYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChjYikgY2IuYXBwbHkodGhpeiwgc3RvcmVzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0b3Jlc09iajtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IENsYXp6ZXIoe30pXHJcbiAgICAgIC5zdGF0aWMoJyRyZWFkZXInLCBhY3Rpb24oaWRiVHJhbnNhY3Rpb24uVHJhbnNhY3Rpb25Nb2RlLlJlYWRPbmx5KSlcclxuICAgICAgLnN0YXRpYygnJHdyaXRlcicsIGFjdGlvbihpZGJUcmFuc2FjdGlvbi5UcmFuc2FjdGlvbk1vZGUuUmVhZFdyaXRlKSlcclxuICAgICAgLmNsYXp6XHJcblxyXG4gIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJGYWN0b3J5IHtcclxuICogICBJREJPcGVuREJSZXF1ZXN0IG9wZW4oRE9NU3RyaW5nIG5hbWUsIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgbG9uZyB2ZXJzaW9uKTtcclxuICogICBJREJPcGVuREJSZXF1ZXN0IGRlbGV0ZURhdGFiYXNlKERPTVN0cmluZyBuYW1lKTtcclxuICogICBzaG9ydCBjbXAoYW55IGZpcnN0LCBhbnkgc2Vjb25kKTtcclxuICogfTtcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCRGF0YWJhc2UgOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZyAgICAgICAgICBuYW1lO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSB1bnNpZ25lZCBsb25nIGxvbmcgdmVyc2lvbjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgICAgIG9iamVjdFN0b3JlTmFtZXM7XHJcbiAqIFxyXG4gKiAgIElEQlRyYW5zYWN0aW9uIHRyYW5zYWN0aW9uKChET01TdHJpbmcgb3Igc2VxdWVuY2U8RE9NU3RyaW5nPikgc3RvcmVOYW1lcywgb3B0aW9uYWwgSURCVHJhbnNhY3Rpb25Nb2RlIG1vZGUgPSBcInJlYWRvbmx5XCIpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGNsb3NlKCk7XHJcbiAqICAgSURCT2JqZWN0U3RvcmUgY3JlYXRlT2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUsIG9wdGlvbmFsIElEQk9iamVjdFN0b3JlUGFyYW1ldGVycyBvcHRpb25zKTtcclxuICogICB2b2lkICAgICAgICAgICBkZWxldGVPYmplY3RTdG9yZShET01TdHJpbmcgbmFtZSk7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25hYm9ydDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uY2xvc2U7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb252ZXJzaW9uY2hhbmdlO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZGljdGlvbmFyeSBJREJPYmplY3RTdG9yZVBhcmFtZXRlcnMge1xyXG4gKiAgIChET01TdHJpbmcgb3Igc2VxdWVuY2U8RE9NU3RyaW5nPik/IGtleVBhdGggPSBudWxsO1xyXG4gKiAgIGJvb2xlYW4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9JbmNyZW1lbnQgPSBmYWxzZTtcclxuICogfTttZVxyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYkV2ZW50VGFyZ2V0LCBpZGJTdG9yZSwgaWRiTW9kZWwsIGlkYk9wZW5EQlJlcXVlc3QsIGlkYlRyYW5zYWN0aW9uLCAkbG9nKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxuXG4gIHZhciBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XG4gIC8vIE5vIHVzZSBcImNvbnN0IGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cbiAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XG4gIHZhciBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XG4gIHZhciBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XG4gIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXG5cbiAgaWYgKCFpbmRleGVkREIpIHtcbiAgICBhbGVydCgnU3UgbmF2ZWdhZG9yIG5vIHNvcG9ydGEgdW5hIHZlcnNpw7NuIGVzdGFibGUgZGUgaW5kZXhlZERCLiBUYWwgeSBjb21vIGxhcyBjYXJhY3RlcsOtc3RpY2FzIG5vIHNlcsOhbiB2YWxpZGFzJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXG4gIC8vICRfbWVcbiAgLy8gJG9wZW5lZFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvciAgXG4gIHZhciBpZGIgPSBmdW5jdGlvbiBpZGIobmFtZSwgdmVyc2lvbiwgc29ja2V0KSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRuYW1lJywgbmFtZSkuc3RhdGljKCckdmVyc2lvbicsIHZlcnNpb24pLnN0YXRpYygnJHNvY2tldCcsIHNvY2tldCk7XG4gIH07XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihpZGIpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KGlkYkV2ZW50VGFyZ2V0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQcm9waWVkYWRlc1xuICAucHJvcGVydHkoJyRfdXBncmFkZW5lZWRlZHMnLCB7IHZhbHVlOiBbXSB9KS5wcm9wZXJ0eSgnJF9tb2RlbHMnLCB7IHZhbHVlOiB7fSB9KS5wcm9wZXJ0eSgnJG1lJywge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuJF9tZTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KG1lKSB7XG4gICAgICB0aGlzLiRfbWUgPSBtZTtcbiAgICAgIHZhciBlID0gbmV3IEV2ZW50KCdvcGVuZWQnKTtcbiAgICAgIC8vIGUudGFyZ2V0ID0gdGhpcztcbiAgICAgIHRoaXMuJGVtaXQoZSk7XG4gICAgfVxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRvYmplY3RTdG9yZU5hbWVzJywgJ29iamVjdFN0b3JlTmFtZXMnKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuc3RhdGljKCckb3BlbicsIGZ1bmN0aW9uIChuYW1lLCB2ZXJzaW9uKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYk9wZW5EQlJlcXVlc3QoaW5kZXhlZERCLm9wZW4uYXBwbHkoaW5kZXhlZERCLCBhcmd1bWVudHMpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLnN0YXRpYygnJGRyb3AnLCBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJPcGVuREJSZXF1ZXN0KGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZS5hcHBseShpbmRleGVkREIsIGFyZ3VtZW50cykpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuc3RhdGljKCckY21wJywgZnVuY3Rpb24gKGZpcnN0LCBzZWNvbmQpIHtcblxuICAgIHJldHVybiBpbmRleGVkREIuY21wKGZpcnN0LCBzZWNvbmQpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBFdmVudCBoYW5kbGVyc1xuICAubWV0aG9kKCckYWJvcnRlZCcsIGZ1bmN0aW9uIChjYikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICByZXR1cm4gdGhpei4kYmluZCgnb3BlbmVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpei4kbWUub25hYm9ydCA9IGNiO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckY2xvc2VkJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIHJldHVybiB0aGl6LiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGl6LiRtZS5vbmNsb3NlID0gY2I7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRlcnJvcicsIGZ1bmN0aW9uIChjYikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICByZXR1cm4gdGhpei4kYmluZCgnb3BlbmVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpei4kbWUub25lcnJvciA9IGNiO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckdmVyc2lvbkNoYW5nZWQnLCBmdW5jdGlvbiAoY2IpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgcmV0dXJuIHRoaXouJGJpbmQoJ29wZW5lZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXouJG1lLm9udmVyc2lvbmNoYW5nZSA9IGNiO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckdXBncmFkZW5lZWRlZCcsIGZ1bmN0aW9uIChjYikge1xuXG4gICAgdGhpcy4kX3VwZ3JhZGVuZWVkZWRzLnB1c2goY2IpO1xuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckYXV0b21pZ3JhdGlvbicsIGZ1bmN0aW9uIChhbGxNaWdyYXRpb25zKSB7XG5cbiAgICByZXR1cm4gdGhpcy4kdXBncmFkZW5lZWRlZChmdW5jdGlvbiAodGhpeiwgb3BlblJlcXVlc3QsIGV2ZW50KSB7XG4gICAgICBPYmplY3Qua2V5cyhhbGxNaWdyYXRpb25zKS5tYXAoZnVuY3Rpb24gKHZlcnNpb24pIHtcblxuICAgICAgICBpZiAoZXZlbnQub2xkVmVyc2lvbiA8IHZlcnNpb24gJiYgdmVyc2lvbiA8PSBldmVudC5uZXdWZXJzaW9uKSB7XG5cbiAgICAgICAgICB2YXIgbWlncmF0aW9ucyA9IEFycmF5LmlzQXJyYXkoYWxsTWlncmF0aW9uc1t2ZXJzaW9uXSkgPyBhbGxNaWdyYXRpb25zW3ZlcnNpb25dIDogW2FsbE1pZ3JhdGlvbnNbdmVyc2lvbl1dO1xuXG4gICAgICAgICAgJGxvZy5sb2coJ21pZ3JhdGlvbiB2JyArIHZlcnNpb24gKyAnIHN0YXJ0cycpO1xuICAgICAgICAgIG1pZ3JhdGlvbnMubWFwKGZ1bmN0aW9uIChtaWdyYXRpb24pIHtcbiAgICAgICAgICAgIG1pZ3JhdGlvbih0aGl6LCBvcGVuUmVxdWVzdCwgZXZlbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJG9wZW4nLCBmdW5jdGlvbiAoY2IsIGNiRXJyKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIGxhc3RScSA9IG51bGw7XG4gICAgdmFyIGxhc3RFdmVudCA9IG51bGw7XG5cbiAgICBpZiAoIXRoaXouJG9wZW5lZCkge1xuXG4gICAgICB0aGl6LiRvcGVuZWQgPSAobGFzdFJxID0gaWRiLiRvcGVuKHRoaXouJG5hbWUsIHRoaXouJHZlcnNpb24pLiR1cGdyYWRlbmVlZGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAkbG9nLmxvZygndXBncmFkZW5lZWRlZCBpZGI6ICcgKyB0aGl6LiRuYW1lICsgJyB2JyArIHRoaXouJHZlcnNpb24pO1xuICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgIHRoaXouJF91cGdyYWRlbmVlZGVkcy5tYXAoZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgY2IuYXBwbHkodGhpeiwgW3RoaXosIGxhc3RScSwgZXZlbnRdKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgJGxvZy5sb2coJ29wZW5lZCBpZGI6ICcgKyB0aGl6LiRuYW1lICsgJyB2JyArIHRoaXouJHZlcnNpb24pO1xuICAgICAgICBpZiAodGhpei4kbWUgIT09IGV2ZW50LnRhcmdldC5yZXN1bHQpIHtcbiAgICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdEV2ZW50ID0gZXZlbnQ7XG4gICAgICAgIGlmIChjYikgY2IodGhpeiwgbGFzdFJxLCBldmVudCk7XG4gICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGxhc3RScSA9IG51bGw7XG4gICAgICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XG4gICAgICAgIGlmIChjYkVycikgY2JFcnIodGhpeiwgbGFzdFJxLCBldmVudCk7XG4gICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChjYikge1xuXG4gICAgICBjYih0aGl6LCBsYXN0UnEsIGxhc3RFdmVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXouJG9wZW5lZDtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGRyb3AnLCBmdW5jdGlvbiAoY2IpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgdGhpei4kb3BlbmVkID0gbnVsbDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgIHZhciBycSA9IGlkYi4kZHJvcCh0aGl6LiRuYW1lKS4kc3VjY2VzcyhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgcmVzb2x2ZSh0aGl6KTtcbiAgICAgIH0pLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJlamVjdChldmVudCk7XG4gICAgICB9KTtcbiAgICAgIGlmIChjYikgY2IocnEpO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLiRvcGVuZWQgPSBudWxsO1xuICAgIHRoaXMuJG1lLmNsb3NlLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjcmVhdGVTdG9yZScsIGZ1bmN0aW9uIChuYW1lLCBvcHRpb25zKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLmNyZWF0ZU9iamVjdFN0b3JlLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGRyb3BTdG9yZScsIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICB0aGlzLiRtZS5kZWxldGVPYmplY3RTdG9yZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckbW9kZWwnLCBmdW5jdGlvbiAobmFtZSwgc29ja2V0KSB7XG5cbiAgICAvLyBTaSBleGlzdGUgZWwgbW9kZWxvIHJldG9ybmFybG9cbiAgICBpZiAodGhpcy4kX21vZGVsc1tuYW1lXSkgcmV0dXJuIHRoaXMuJF9tb2RlbHNbbmFtZV07XG5cbiAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsbyB5IGd1YXJkYXJsb1xuICAgIHJldHVybiB0aGlzLiRfbW9kZWxzW25hbWVdID0gaWRiTW9kZWwodGhpcywgbmFtZSwgc29ja2V0IHx8IHRoaXMuJHNvY2tldCk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyR0cmFuc2FjdGlvbicsIGZ1bmN0aW9uIChzdG9yZU5hbWVzLCBtb2RlKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgcmV0dXJuIHRoaXouJG9wZW4oKS50aGVuKGZ1bmN0aW9uICh0aGl6KSB7XG4gICAgICByZXR1cm4gbmV3IGlkYlRyYW5zYWN0aW9uKHRoaXouJG1lLnRyYW5zYWN0aW9uLmFwcGx5KHRoaXouJG1lLCBhcmdzKSk7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRzdG9yZScsIGZ1bmN0aW9uIChzdG9yZU5hbWVzKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShzdG9yZU5hbWVzKSkgc3RvcmVOYW1lcyA9IFtzdG9yZU5hbWVzXTtcblxuICAgIGZ1bmN0aW9uIGFjdGlvbihtb2RlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGNiKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXouJHRyYW5zYWN0aW9uKHN0b3JlTmFtZXMsIG1vZGUpLnRoZW4oZnVuY3Rpb24gKHR4KSB7XG4gICAgICAgICAgdmFyIHN0b3Jlc09iaiA9IHt9O1xuICAgICAgICAgIHZhciBzdG9yZXMgPSBzdG9yZU5hbWVzLm1hcChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RvcmVzT2JqW3N0b3JlTmFtZV0gPSB0eC4kc3RvcmUoc3RvcmVOYW1lKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoY2IpIGNiLmFwcGx5KHRoaXosIHN0b3Jlcyk7XG4gICAgICAgICAgcmV0dXJuIHN0b3Jlc09iajtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ2xhenplcih7fSkuc3RhdGljKCckcmVhZGVyJywgYWN0aW9uKGlkYlRyYW5zYWN0aW9uLlRyYW5zYWN0aW9uTW9kZS5SZWFkT25seSkpLnN0YXRpYygnJHdyaXRlcicsIGFjdGlvbihpZGJUcmFuc2FjdGlvbi5UcmFuc2FjdGlvbk1vZGUuUmVhZFdyaXRlKSkuY2xheno7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYlN0b3JlXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQk9iamVjdFN0b3JlIHtcclxuICogICAgICAgICAgICBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAga2V5UGF0aDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgaW5kZXhOYW1lcztcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb24gdHJhbnNhY3Rpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGJvb2xlYW4gICAgICAgIGF1dG9JbmNyZW1lbnQ7XHJcbiAqIFxyXG4gKiAgIElEQlJlcXVlc3QgcHV0KGFueSB2YWx1ZSwgb3B0aW9uYWwgYW55IGtleSk7XHJcbiAqICAgSURCUmVxdWVzdCBhZGQoYW55IHZhbHVlLCBvcHRpb25hbCBhbnkga2V5KTtcclxuICogICBJREJSZXF1ZXN0IGRlbGV0ZShhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgY2xlYXIoKTtcclxuICogICBJREJJbmRleCAgIGluZGV4KERPTVN0cmluZyBuYW1lKTtcclxuICogICBJREJJbmRleCAgIGNyZWF0ZUluZGV4KERPTVN0cmluZyBuYW1lLCAoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pIGtleVBhdGgsIG9wdGlvbmFsIElEQkluZGV4UGFyYW1ldGVycyBvcHRpb25zKTtcclxuICogICB2b2lkICAgICAgIGRlbGV0ZUluZGV4KERPTVN0cmluZyBpbmRleE5hbWUpO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZGljdGlvbmFyeSBJREJJbmRleFBhcmFtZXRlcnMge1xyXG4gKiAgIGJvb2xlYW4gdW5pcXVlID0gZmFsc2U7XHJcbiAqICAgYm9vbGVhbiBtdWx0aUVudHJ5ID0gZmFsc2U7XHJcbiAqIH07XHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QsIGlkYkluZGV4LCBpZGJDb25zdWx0YW50LCAkbG9nKSB7ICduZ0luamVjdCc7XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiU3RvcmUgKG1lKSB7XHJcblxyXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoaWRiQ29uc3VsdGFudClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gR2V0dGVyc1xyXG4gIC5nZXR0ZXIoJyRrZXlQYXRoJywgJ2tleVBhdGgnKVxyXG4gIC5nZXR0ZXIoJyRpbmRleE5hbWVzJywgJ2luZGV4TmFtZXMnKVxyXG4gIC5nZXR0ZXIoJyR0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpXHJcbiAgLmdldHRlcignJGF1dG9JbmNyZW1lbnQnLCAnYXV0b0luY3JlbWVudCcpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRwdXQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5wdXQuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpXHJcbiAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRhZGQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5hZGQuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpXHJcbiAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRkZWxldGUnLCBmdW5jdGlvbiAocXVlcnkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZGVsZXRlLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7fSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRjbGVhcicsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuY2xlYXIuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpXHJcbiAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAudGhlbihmdW5jdGlvbihldmVudCl7fSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRpbmRleCcsIGZ1bmN0aW9uIChuYW1lKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJJbmRleCh0aGlzLiRtZS5pbmRleC5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRjcmVhdGVJbmRleCcsIGZ1bmN0aW9uIChmaWVsZHMsIG5hbWUsIG9wdGlvbnMpIHtcclxuICAgIGlmICh0eXBlb2YgZmllbGRzID09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGZpZWxkcyA9IFtmaWVsZHNdO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09ICdvYmplY3QnKXtcclxuICAgICAgb3B0aW9ucyA9IG5hbWU7XHJcbiAgICAgIG5hbWUgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKCFuYW1lKSB7XHJcbiAgICAgIG5hbWUgPSBmaWVsZHMuc29ydCgpLmpvaW4oJ18nKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYkluZGV4KHRoaXMuJG1lLmNyZWF0ZUluZGV4KG5hbWUsIGZpZWxkcywgb3B0aW9ucykpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZGVsZXRlSW5kZXgnLCBmdW5jdGlvbiAoaW5kZXhOYW1lKSB7XHJcbiAgICBpZiAoQXJyYXkuYW5ndWxhci5pc0FycmF5KGluZGV4TmFtZSkpIHtcclxuICAgICAgaW5kZXhOYW1lID0gaW5kZXhOYW1lLnNvcnQoKS5qb2luKCdfJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLiRtZS5kZWxldGVJbmRleChpbmRleE5hbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiU3RvcmUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJTdG9yZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJPYmplY3RTdG9yZSB7XHJcbiAqICAgICAgICAgICAgYXR0cmlidXRlIERPTVN0cmluZyAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGFueSAgICAgICAgICAgIGtleVBhdGg7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgIGluZGV4TmFtZXM7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uIHRyYW5zYWN0aW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICBhdXRvSW5jcmVtZW50O1xyXG4gKiBcclxuICogICBJREJSZXF1ZXN0IHB1dChhbnkgdmFsdWUsIG9wdGlvbmFsIGFueSBrZXkpO1xyXG4gKiAgIElEQlJlcXVlc3QgYWRkKGFueSB2YWx1ZSwgb3B0aW9uYWwgYW55IGtleSk7XHJcbiAqICAgSURCUmVxdWVzdCBkZWxldGUoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGNsZWFyKCk7XHJcbiAqICAgSURCSW5kZXggICBpbmRleChET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgSURCSW5kZXggICBjcmVhdGVJbmRleChET01TdHJpbmcgbmFtZSwgKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KSBrZXlQYXRoLCBvcHRpb25hbCBJREJJbmRleFBhcmFtZXRlcnMgb3B0aW9ucyk7XHJcbiAqICAgdm9pZCAgICAgICBkZWxldGVJbmRleChET01TdHJpbmcgaW5kZXhOYW1lKTtcclxuICogfTtcclxuICogXHJcbiAqIGRpY3Rpb25hcnkgSURCSW5kZXhQYXJhbWV0ZXJzIHtcclxuICogICBib29sZWFuIHVuaXF1ZSA9IGZhbHNlO1xyXG4gKiAgIGJvb2xlYW4gbXVsdGlFbnRyeSA9IGZhbHNlO1xyXG4gKiB9O1xyXG4gKiBcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QsIGlkYkluZGV4LCBpZGJDb25zdWx0YW50LCAkbG9nKSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJTdG9yZShtZSkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KGlkYkNvbnN1bHRhbnQpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdldHRlcnNcbiAgLmdldHRlcignJGtleVBhdGgnLCAna2V5UGF0aCcpLmdldHRlcignJGluZGV4TmFtZXMnLCAnaW5kZXhOYW1lcycpLmdldHRlcignJHRyYW5zYWN0aW9uJywgJ3RyYW5zYWN0aW9uJykuZ2V0dGVyKCckYXV0b0luY3JlbWVudCcsICdhdXRvSW5jcmVtZW50JylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHB1dCcsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUucHV0LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRhZGQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmFkZC5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZGVsZXRlJywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZGVsZXRlLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge30pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckY2xlYXInLCBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuY2xlYXIuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7fSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRpbmRleCcsIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYkluZGV4KHRoaXMuJG1lLmluZGV4LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGNyZWF0ZUluZGV4JywgZnVuY3Rpb24gKGZpZWxkcywgbmFtZSwgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YgZmllbGRzID09ICdzdHJpbmcnKSB7XG4gICAgICBmaWVsZHMgPSBbZmllbGRzXTtcbiAgICB9XG4gICAgaWYgKCh0eXBlb2YgbmFtZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YobmFtZSkpID09ICdvYmplY3QnKSB7XG4gICAgICBvcHRpb25zID0gbmFtZTtcbiAgICAgIG5hbWUgPSBudWxsO1xuICAgIH1cbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIG5hbWUgPSBmaWVsZHMuc29ydCgpLmpvaW4oJ18nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IGlkYkluZGV4KHRoaXMuJG1lLmNyZWF0ZUluZGV4KG5hbWUsIGZpZWxkcywgb3B0aW9ucykpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZGVsZXRlSW5kZXgnLCBmdW5jdGlvbiAoaW5kZXhOYW1lKSB7XG4gICAgaWYgKEFycmF5LmFuZ3VsYXIuaXNBcnJheShpbmRleE5hbWUpKSB7XG4gICAgICBpbmRleE5hbWUgPSBpbmRleE5hbWUuc29ydCgpLmpvaW4oJ18nKTtcbiAgICB9XG4gICAgdGhpcy4kbWUuZGVsZXRlSW5kZXgoaW5kZXhOYW1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJTdG9yZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJJbmRleFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJJbmRleCB7XHJcbiAqICAgICAgICAgICAgYXR0cmlidXRlIERPTVN0cmluZyAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQk9iamVjdFN0b3JlIG9iamVjdFN0b3JlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBhbnkgICAgICAgICAgICBrZXlQYXRoO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICBtdWx0aUVudHJ5O1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICB1bmlxdWU7XHJcbiAqIFxyXG4gKiAgIElEQlJlcXVlc3QgZ2V0KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRLZXkoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbChvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0QWxsS2V5cyhvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgY291bnQob3B0aW9uYWwgYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5DdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiAgIElEQlJlcXVlc3Qgb3BlbktleUN1cnNvcihvcHRpb25hbCBhbnkgcXVlcnksIG9wdGlvbmFsIElEQkN1cnNvckRpcmVjdGlvbiBkaXJlY3Rpb24gPSBcIm5leHRcIik7XHJcbiAqIH07XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiQ29uc3VsdGFudCkgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiSW5kZXggKG1lKSB7XHJcblxyXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoaWRiQ29uc3VsdGFudClcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJG9iamVjdFN0b3JlJywgJ29iamVjdFN0b3JlJylcclxuICAuZ2V0dGVyKCcka2V5UGF0aCcsICAgICAna2V5UGF0aCcpXHJcbiAgLmdldHRlcignJG11bHRpRW50cnknLCAgJ211bHRpRW50cnknKVxyXG4gIC5nZXR0ZXIoJyR1bmlxdWUnLCAgICAgICd1bmlxdWUnKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiSW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJJbmRleFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJJbmRleCB7XHJcbiAqICAgICAgICAgICAgYXR0cmlidXRlIERPTVN0cmluZyAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQk9iamVjdFN0b3JlIG9iamVjdFN0b3JlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBhbnkgICAgICAgICAgICBrZXlQYXRoO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICBtdWx0aUVudHJ5O1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICB1bmlxdWU7XHJcbiAqIFxyXG4gKiAgIElEQlJlcXVlc3QgZ2V0KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRLZXkoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbChvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0QWxsS2V5cyhvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgY291bnQob3B0aW9uYWwgYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5DdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiAgIElEQlJlcXVlc3Qgb3BlbktleUN1cnNvcihvcHRpb25hbCBhbnkgcXVlcnksIG9wdGlvbmFsIElEQkN1cnNvckRpcmVjdGlvbiBkaXJlY3Rpb24gPSBcIm5leHRcIik7XHJcbiAqIH07XHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiQ29uc3VsdGFudCkge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiSW5kZXgobWUpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBIZXJlbmNpYVxuICAuaW5oZXJpdChpZGJDb25zdWx0YW50KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRvYmplY3RTdG9yZScsICdvYmplY3RTdG9yZScpLmdldHRlcignJGtleVBhdGgnLCAna2V5UGF0aCcpLmdldHRlcignJG11bHRpRW50cnknLCAnbXVsdGlFbnRyeScpLmdldHRlcignJHVuaXF1ZScsICd1bmlxdWUnKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYkluZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYkV2ZW50VGFyZ2V0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkV2ZW50VGFyZ2V0ICgpIHt9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByb3BpZWRhZGVzXHJcbiAgLnByb3BlcnR5KCckX2xpc3RlbmVycycsIHsgdmFsdWU6IFtdIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gbWV0aG9kXHJcbiAgLm1ldGhvZCgnJGJpbmQnLCBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcclxuICAgIGlmKCEodHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSkge1xyXG4gICAgICB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdID0gW107XHJcbiAgICB9XHJcbiAgICB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdLnB1c2goY2FsbGJhY2spO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBtZXRob2RcclxuICAubWV0aG9kKCckdW5iaW5kICcsIGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaykge1xyXG4gICAgaWYodHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSB7XHJcbiAgICAgIHZhciBzdGFjayA9IHRoaXMuJF9saXN0ZW5lcnNbdHlwZV07XHJcbiAgICAgIGZvcih2YXIgaSA9IDAsIGwgPSBzdGFjay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZihzdGFja1tpXSA9PT0gY2FsbGJhY2spe1xyXG4gICAgICAgICAgc3RhY2suc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuJHVuYmluZCh0eXBlLCBjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIG1ldGhvZFxyXG4gIC5tZXRob2QoJyRlbWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZihldmVudC50eXBlIGluIHRoaXMuJF9saXN0ZW5lcnMpIHtcclxuICAgICAgdmFyIHN0YWNrID0gdGhpcy4kX2xpc3RlbmVyc1tldmVudC50eXBlXTtcclxuICAgICAgZm9yKHZhciBpID0gMCwgbCA9IHN0YWNrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgc3RhY2tbaV0uY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJFdmVudFRhcmdldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYkV2ZW50VGFyZ2V0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkV2ZW50VGFyZ2V0KCkge30pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFByb3BpZWRhZGVzXG4gIC5wcm9wZXJ0eSgnJF9saXN0ZW5lcnMnLCB7IHZhbHVlOiBbXSB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBtZXRob2RcbiAgLm1ldGhvZCgnJGJpbmQnLCBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoISh0eXBlIGluIHRoaXMuJF9saXN0ZW5lcnMpKSB7XG4gICAgICB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgfVxuICAgIHRoaXMuJF9saXN0ZW5lcnNbdHlwZV0ucHVzaChjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIG1ldGhvZFxuICAubWV0aG9kKCckdW5iaW5kICcsIGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlIGluIHRoaXMuJF9saXN0ZW5lcnMpIHtcbiAgICAgIHZhciBzdGFjayA9IHRoaXMuJF9saXN0ZW5lcnNbdHlwZV07XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHN0YWNrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoc3RhY2tbaV0gPT09IGNhbGxiYWNrKSB7XG4gICAgICAgICAgc3RhY2suc3BsaWNlKGksIDEpO1xuICAgICAgICAgIHJldHVybiB0aGlzLiR1bmJpbmQodHlwZSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBtZXRob2RcbiAgLm1ldGhvZCgnJGVtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSB7XG4gICAgICB2YXIgc3RhY2sgPSB0aGlzLiRfbGlzdGVuZXJzW2V2ZW50LnR5cGVdO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdGFjay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgc3RhY2tbaV0uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYkV2ZW50VGFyZ2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYk1vZGVsXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlF1ZXJ5LCBpZGJFdmVudFRhcmdldCwgbGJSZXNvdXJjZSwgJHRpbWVvdXQpIHsgJ25nSW5qZWN0JztcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIEJ1c2NhciB1biBjYW1wb1xyXG5jb25zdCBkZWVwRmllbGQgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgY2IpIHtcclxuXHJcbiAgY29uc3QgZmllbGRzID0gZmllbGQuc3BsaXQoJy4nKTtcclxuICBjb25zdCBsYXN0RmllbGQgPSBmaWVsZHMucG9wKCk7XHJcblxyXG4gIHJldHVybiAoZnVuY3Rpb24gX3NldChvYmopIHtcclxuICAgIGlmIChmaWVsZHMubGVuZ3RoID09IDApXHJcbiAgICAgIHJldHVybiBjYihvYmosIGxhc3RGaWVsZCk7XHJcbiAgICBjb25zdCBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xyXG4gICAgaWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAndW5kZWZpbmVkJylcclxuICAgICAgb2JqW2ZpZWxkXSA9IHt9O1xyXG4gICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XHJcbiAgfSkob2JqKTtcclxuXHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cclxuY29uc3QgZ2V0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIChvYmosIGZpZWxkKSB7XHJcbiAgcmV0dXJuIGRlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcclxuICB9KTtcclxufTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xyXG5jb25zdCBzZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gKG9iaiwgZmllbGQsIHZhbHVlKSB7XHJcbiAgZGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgb2JqW2xhc3RGaWVsZF0gPSB2YWx1ZTtcclxuICB9KTtcclxuICByZXR1cm4gb2JqO1xyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxucmV0dXJuIGZ1bmN0aW9uIGlkYk1vZGVsRmFjdG9yeSAoZGIsIG5hbWUsIHNvY2tldCkge1xyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXHJcbiAgLy8gJF9yZW1vdGVcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBmdW5jdGlvbiBpZGJNb2RlbCgpIHtcclxuICB9XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoaWRiTW9kZWwpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoaWRiRXZlbnRUYXJnZXQpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByb3BpZWRhZGVzIHN0YXRpY2FzXHJcbiAgLnN0YXRpYygnJGRiJywgZGIpXHJcbiAgLnN0YXRpYygnJG5hbWUnLCBuYW1lKVxyXG4gIC5zdGF0aWMoJyRzb2NrZXQnLCBzb2NrZXQpXHJcblxyXG4gIC5zdGF0aWMoJyRpZCcsIHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9KVxyXG4gIC5zdGF0aWMoJyRmaWVsZHMnLCB7XHJcbiAgICBpZDoge1xyXG4gICAgICBpZDogdHJ1ZSxcclxuICAgICAgbmFtZTogJ2lkJyxcclxuICAgICAgdHlwZTogJ251bWJlcidcclxuICAgIH1cclxuICB9KVxyXG4gIC5zdGF0aWMoJyRpbmRleGVzVG9DcmVhdGUnLCBbXSlcclxuICAuc3RhdGljKCckaW5zdGFuY2VzJywge30pXHJcbiAgICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0S2V5RnJvbScsIGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgcmV0dXJuIGdldEZpZWxkVmFsdWUoZGF0YSwgdGhpcy4kaWQua2V5UGF0aCk7XHJcblxyXG4gIH0pXHJcbiAgICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckYWRkSW5kZXgnLCBmdW5jdGlvbiAoZmllbGRzLCBuYW1lLCBvcHRpb25zKSB7XHJcblxyXG4gICAgdGhpcy4kaW5kZXhlc1RvQ3JlYXRlLnB1c2goYXJndW1lbnRzKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGNyZWF0ZScsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBjb25zdCBzdG9yZSA9IHRoaXouJGRiLiRjcmVhdGVTdG9yZSh0aGl6LiRuYW1lLCB0aGl6LiRpZCk7XHJcblxyXG4gICAgdGhpei4kaW5kZXhlc1RvQ3JlYXRlLm1hcChmdW5jdGlvbiAoYXJncykge1xyXG4gICAgICBzdG9yZS4kY3JlYXRlSW5kZXguYXBwbHkoc3RvcmUsIGFyZ3MpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGNiKSBjYih0aGl6LCBzdG9yZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRkcm9wJywgZnVuY3Rpb24gKGNiKSB7XHJcblxyXG4gICAgdGhpcy4kZGIuJGRyb3BTdG9yZSh0aGlzLiRuYW1lKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJHdyaXRlcicsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICByZXR1cm4gdGhpei4kZGIuJHN0b3JlKHRoaXouJG5hbWUpLiR3cml0ZXIoY2IpXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChzdG9yZXMpIHtcclxuICAgICAgICByZXR1cm4gc3RvcmVzW3RoaXouJG5hbWVdXHJcbiAgICAgIH0pXHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRyZWFkZXInLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJGRiLiRzdG9yZSh0aGl6LiRuYW1lKS4kcmVhZGVyKGNiKVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAoc3RvcmVzKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0b3Jlc1t0aGl6LiRuYW1lXVxyXG4gICAgICB9KVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckcHV0JywgZnVuY3Rpb24gKG9iaiwga2V5KSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLiRnZXRWYWx1ZXMob2JqKTtcclxuICAgIGFyZ3NbMF0gPSBkYXRhO1xyXG5cclxuICAgIHJldHVybiB0aGl6LiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gICAgICByZXR1cm4gc3RvcmUuJHB1dC5hcHBseShzdG9yZSwgYXJncykudGhlbihmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpei4kZ2V0SW5zdGFuY2Uoa2V5KTtcclxuICAgICAgICByZWNvcmQuJHNldFZhbHVlcyhkYXRhKTtcclxuICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xyXG4gICAgICAgIHJldHVybiByZWNvcmQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRhZGQnLCBmdW5jdGlvbiAob2JqLCBrZXkpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgY29uc3QgZGF0YSA9IHRoaXMuJGdldFZhbHVlcyhvYmopO1xyXG4gICAgYXJnc1swXSA9IGRhdGE7XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJHdyaXRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBzdG9yZS4kYWRkLmFwcGx5KHN0b3JlLCBhcmdzKS50aGVuKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICBjb25zdCByZWNvcmQgPSB0aGl6LiRnZXRJbnN0YW5jZShrZXkpO1xyXG4gICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGRhdGEpO1xyXG4gICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIHJlY29yZDtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGRlbGV0ZScsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIFxyXG4gICAgcmV0dXJuIHRoaXMuJHdyaXRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBzdG9yZS4kZGVsZXRlLmFwcGx5KHN0b3JlLCBhcmdzKTtcclxuICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckY2xlYXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpcy4kd3JpdGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRjbGVhci5hcHBseShzdG9yZSwgYXJncyk7XHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGdldCcsIGZ1bmN0aW9uIChrZXkpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgY29uc3QgcmVjb3JkID0gdGhpcy4kZ2V0SW5zdGFuY2Uoa2V5KTtcclxuXHJcbiAgICByZWNvcmQuJHByb21pc2UgPSB0aGl6LiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gICAgICByZXR1cm4gc3RvcmUuJGdldC5hcHBseShzdG9yZSwgYXJncykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGRhdGEpO1xyXG4gICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIHJlY29yZDtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVjb3JkO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0S2V5JywgZnVuY3Rpb24gKHF1ZXJ5KSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuXHJcbiAgICByZXR1cm4gdGhpei4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRnZXRLZXkuYXBwbHkoc3RvcmUsIGFyZ3MpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0QWxsJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuXHJcbiAgICByZXN1bHQuJHByb21pc2UgPSB0aGl6LiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gICAgICByZXR1cm4gc3RvcmUuJGdldEFsbC5hcHBseShzdG9yZSwgYXJncykudGhlbihmdW5jdGlvbiAoYXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIGFyci5tYXAoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgIGNvbnN0IHJlY29yZCA9IHRoaXouJGdldEluc3RhbmNlKHRoaXouJGdldEtleUZyb20oZGF0YSkpO1xyXG4gICAgICAgICAgcmVjb3JkLiRzZXRWYWx1ZXMoZGF0YSk7XHJcbiAgICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2gocmVjb3JkKTtcclxuICAgICAgICAgIHJldHVybiByZWNvcmQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGdldEFsbEtleXMnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XHJcbiAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gW107XHJcblxyXG4gICAgcmVzdWx0LiRwcm9taXNlID0gdGhpcy4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRnZXRBbGxLZXlzLmFwcGx5KHN0b3JlLCBhcmdzKS50aGVuKGZ1bmN0aW9uIChhcnIpIHtcclxuICAgICAgICByZXR1cm4gYXJyLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICByZXN1bHQucHVzaChrZXkpO1xyXG4gICAgICAgICAgcmV0dXJuIGtleTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGNvdW50JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcbiAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xyXG5cclxuICAgIHJldHVybiB0aGlzLiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gICAgICByZXR1cm4gc3RvcmUuJGNvdW50LmFwcGx5KHN0b3JlLCBhcmdzKTtcclxuICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZmluZCcsIGZ1bmN0aW9uIChmaWx0ZXJzKSB7XHJcbiAgICBcclxuICAgIHJldHVybiBuZXcgaWRiUXVlcnkodGhpcywgZmlsdGVycyk7XHJcblxyXG4gIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGdldEluc3RhbmNlJywgZnVuY3Rpb24gKGtleSkge1xyXG5cclxuICAgIC8vIEVsIG9iamV0byBubyB0aWVuZSBJRFxyXG4gICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkIHx8IGtleSA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gbmV3IHRoaXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBObyBleGlzdGUgbGEgaW5zdGFuY2lhIGVudG9uY2Ugc2UgY3JlYVxyXG4gICAgaWYgKCF0aGlzLiRpbnN0YW5jZXNba2V5XSl7XHJcbiAgICAgIHRoaXMuJGluc3RhbmNlc1trZXldID0gbmV3IHRoaXMoKTtcclxuICAgICAgdGhpcy4kaW5zdGFuY2VzW2tleV0uJHNldCh0aGlzLiRpZC5rZXlQYXRoLCBrZXkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpcy4kaW5zdGFuY2VzW2tleV07XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFzaWduYSBsYSBlc3BlY2lmaWNhY2nDs24gZGUgbG9zIGNhbXBvc1xyXG4gIC5zdGF0aWMoJyRmaWVsZCcsIGZ1bmN0aW9uIChuYW1lLCBmaWVsZCkge1xyXG5cclxuICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGZpZWxkID0geyBcInR5cGVcIjogZmllbGQgfTtcclxuICAgIH1cclxuXHJcbiAgICBmaWVsZC5uYW1lID0gbmFtZTtcclxuXHJcbiAgICB0aGlzLiRmaWVsZHNbbmFtZV0gPSBmaWVsZDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQWdyZWdhIGVsIGVsIGNhbXBvIElEIGF1dG9tYXRpY2FtZW50ZVxyXG4gIC5zdGF0aWMoJyRrZXknLCBmdW5jdGlvbiAoa2V5LCBhdXRvSW5jcmVtZW50LCB0eXBlKSB7XHJcbiAgICBpZih0eXBlb2Yga2V5ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgYXV0b0luY3JlbWVudCA9IGtleTtcclxuICAgIH1cclxuICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCB8fCBrZXkgPT09IG51bGwgfHwgdHlwZW9mIGtleSA9PT0gJ2Jvb2xlYW4nKXtcclxuICAgICAga2V5ID0gJ2lkJztcclxuICAgIH1cclxuICAgIGlmKHR5cGVvZiBhdXRvSW5jcmVtZW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgICB0eXBlID0gYXV0b0luY3JlbWVudDtcclxuICAgICAgYXV0b0luY3JlbWVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoYXV0b0luY3JlbWVudCA9PT0gdW5kZWZpbmVkIHx8IGF1dG9JbmNyZW1lbnQgPT09IG51bGwpe1xyXG4gICAgICBhdXRvSW5jcmVtZW50ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmKHR5cGVvZiBhdXRvSW5jcmVtZW50ID09PSAnYm9vbGVhbicgfHwgdHlwZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdHlwZSA9ICdudW1iZXInO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuJGlkLmtleVBhdGggPSBrZXk7XHJcbiAgICB0aGlzLiRpZC5hdXRvSW5jcmVtZW50ID0gYXV0b0luY3JlbWVudDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy4kZmllbGQoa2V5LCB7XHJcbiAgICAgIGlkOiB0cnVlLFxyXG4gICAgICB0eXBlOiB0eXBlLFxyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcclxuICAuc3RhdGljKCckZ2V0VmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgXHJcbiAgICBjb25zdCB2YWx1ZXMgPSB7fTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLiRmaWVsZHMpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgY29uc3QgdmFsdWUgPSBnZXRGaWVsZFZhbHVlKGRhdGEsIGZpZWxkKTtcclxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHNldEZpZWxkVmFsdWUodmFsdWVzLCBmaWVsZCwgdmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdmFsdWVzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBZ3JlZ2EgZWwgZWwgY2FtcG8gSUQgYXV0b21hdGljYW1lbnRlXHJcbiAgLnN0YXRpYygnJGJ1aWxkJywgZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcclxuXHJcbiAgICBidWlsZENhbGxiYWNrKHRoaXMpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbmZpZ3VyYSBlbCByZW1vdGUgYXBpXHJcbiAgLnN0YXRpYygnJHJlbW90ZScsIGZ1bmN0aW9uICh1cmwsIGFyZ3MsIGFjdGlvbnMpIHtcclxuXHJcbiAgICB0aGlzLiRfcmVtb3RlID0gbGJSZXNvdXJjZS5hcHBseShsYlJlc291cmNlLCBhcmd1bWVudHMpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByb3BpZWRhZGVzXHJcbiAgLnByb3BlcnR5KCckX3ZhbHVlcycsIHsgdmFsdWU6IG5ldyBDbGF6emVyKHt9KVxyXG4gICAgLnN0YXRpYygnbG9jYWwnLCB7fSlcclxuICAgIC5zdGF0aWMoJ3JlbW90ZScsIHt9KVxyXG4gICAgLmNsYXp6XHJcbiAgfSlcclxuXHJcbiAgLnByb3BlcnR5KCckX3ZlcnNpb25zJywgeyB2YWx1ZToge30gfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXHJcbiAgLm1ldGhvZCgnJGdldCcsIGZ1bmN0aW9uIChmaWVsZCkge1xyXG5cclxuICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKHRoaXMsIGZpZWxkKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cclxuICAubWV0aG9kKCckc2V0JywgZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkge1xyXG5cclxuICAgIHJldHVybiBzZXRGaWVsZFZhbHVlKHRoaXMsIGZpZWxkKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxyXG4gIC5tZXRob2QoJyRnZXRWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgIHJldHVybiBpZGJNb2RlbC4kZ2V0VmFsdWVzKGRhdGEgfHwgdGhpcyk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRnZXRMb2NhbFZhbHVlcycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy4kZ2V0VmFsdWVzKHRoaXMuJF92YWx1ZXMubG9jYWwpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZ2V0UmVtb3RlVmFsdWVzJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kX3ZhbHVlcy5yZW1vdGUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc2V0VmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICBzZXRGaWVsZFZhbHVlKHRoaXosIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHNldExvY2FsVmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJF92YWx1ZXMubG9jYWwsIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHNldFJlbW90ZVZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRfdmFsdWVzLnJlbW90ZSwgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGl6O1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCcka2V5JywgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZShkYXRhLCB0aGlzLiRpZC5rZXlQYXRoKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRnVuY2lvbiBxdWUgaGFjZSBlc2N1Y2hhcnMgbG9zIG1lbnNhamVzIGRlbCBzb2NrZXQgcGFyYSBlbCBtb2RlbFxyXG4gIC5tZXRob2QoJyRsaXN0ZW4nLCBmdW5jdGlvbiAoZGF0YSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGlmICghdGhpcy4kc29ja2V0KSB0aHJvdyBuZXcgRXJyb3IoJ2lkYk1vZGVsLkRvZXNOb3RIYXZlU29ja2V0SW5zdGFuY2UnKTtcclxuXHJcbiAgICAvLyBDcmVhciB1bmEgc3Vic2NyaXBjaW9uIGFsIHNvY2tldCBwYXJhIGN1YW5kbyBzZSByZWNpYmFuIGRhdG9zXHJcbiAgICAvLyBwYXJhIGxhIGluc3RhbmNpYSBhY3R1YWxcclxuICAgIHRoaXMuJHNvY2tldC5zdWJzY3JpYmUoe1xyXG4gICAgICBtb2RlbE5hbWU6IGlkYk1vZGVsLiRuYW1lLFxyXG4gICAgICBldmVudE5hbWU6ICd1cGRhdGUnLFxyXG4gICAgICBtb2RlbElkOiB0aGl6LiRrZXkoKSxcclxuICAgIH0sIGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAvLyBBIHJlY2liaXIgZGF0b3MgZGVsIHNvY2tldCBhc2lnbmFyIGxvcyB2YWxvcmVzXHJcbiAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBFbWl0aXIgZXZlbnRvIGRlIGRhdG9zIHJlY2liaWRvciBwYXJhIGVsIG1vZGVsb1xyXG4gICAgICAgIHRoaXouJHNldFJlbW90ZVZhbHVlcyhkYXRhLnZhbHVlcywgZGF0YS52ZXJzaW9uKTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59O31cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJNb2RlbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYk1vZGVsXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlF1ZXJ5LCBpZGJFdmVudFRhcmdldCwgbGJSZXNvdXJjZSwgJHRpbWVvdXQpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBCdXNjYXIgdW4gY2FtcG9cblxuICB2YXIgZGVlcEZpZWxkID0gZnVuY3Rpb24gZGVlcEZpZWxkKG9iaiwgZmllbGQsIGNiKSB7XG5cbiAgICB2YXIgZmllbGRzID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICB2YXIgbGFzdEZpZWxkID0gZmllbGRzLnBvcCgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIF9zZXQob2JqKSB7XG4gICAgICBpZiAoZmllbGRzLmxlbmd0aCA9PSAwKSByZXR1cm4gY2Iob2JqLCBsYXN0RmllbGQpO1xuICAgICAgdmFyIGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XG4gICAgICBpZiAodHlwZW9mIG9ialtmaWVsZF0gPT09ICd1bmRlZmluZWQnKSBvYmpbZmllbGRdID0ge307XG4gICAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcbiAgICB9KG9iaik7XG4gIH07XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXG4gIHZhciBnZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gZ2V0RmllbGRWYWx1ZShvYmosIGZpZWxkKSB7XG4gICAgcmV0dXJuIGRlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cbiAgdmFyIHNldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiBzZXRGaWVsZFZhbHVlKG9iaiwgZmllbGQsIHZhbHVlKSB7XG4gICAgZGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgb2JqW2xhc3RGaWVsZF0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHJldHVybiBmdW5jdGlvbiBpZGJNb2RlbEZhY3RvcnkoZGIsIG5hbWUsIHNvY2tldCkge1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgICAvLyAkX3JlbW90ZVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgZnVuY3Rpb24gaWRiTW9kZWwoKSB7fVxuXG4gICAgcmV0dXJuIG5ld1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIENvbnN0cnVjdG9yXG4gICAgQ2xhenplcihpZGJNb2RlbClcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEhlcmVuY2lhXG4gICAgLmluaGVyaXQoaWRiRXZlbnRUYXJnZXQpXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQcm9waWVkYWRlcyBzdGF0aWNhc1xuICAgIC5zdGF0aWMoJyRkYicsIGRiKS5zdGF0aWMoJyRuYW1lJywgbmFtZSkuc3RhdGljKCckc29ja2V0Jywgc29ja2V0KS5zdGF0aWMoJyRpZCcsIHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9KS5zdGF0aWMoJyRmaWVsZHMnLCB7XG4gICAgICBpZDoge1xuICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgbmFtZTogJ2lkJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgIH1cbiAgICB9KS5zdGF0aWMoJyRpbmRleGVzVG9DcmVhdGUnLCBbXSkuc3RhdGljKCckaW5zdGFuY2VzJywge30pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckZ2V0S2V5RnJvbScsIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsIHRoaXMuJGlkLmtleVBhdGgpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckYWRkSW5kZXgnLCBmdW5jdGlvbiAoZmllbGRzLCBuYW1lLCBvcHRpb25zKSB7XG5cbiAgICAgIHRoaXMuJGluZGV4ZXNUb0NyZWF0ZS5wdXNoKGFyZ3VtZW50cyk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckY3JlYXRlJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIHZhciBzdG9yZSA9IHRoaXouJGRiLiRjcmVhdGVTdG9yZSh0aGl6LiRuYW1lLCB0aGl6LiRpZCk7XG5cbiAgICAgIHRoaXouJGluZGV4ZXNUb0NyZWF0ZS5tYXAoZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgc3RvcmUuJGNyZWF0ZUluZGV4LmFwcGx5KHN0b3JlLCBhcmdzKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoY2IpIGNiKHRoaXosIHN0b3JlKTtcblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRkcm9wJywgZnVuY3Rpb24gKGNiKSB7XG5cbiAgICAgIHRoaXMuJGRiLiRkcm9wU3RvcmUodGhpcy4kbmFtZSk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckd3JpdGVyJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIHJldHVybiB0aGl6LiRkYi4kc3RvcmUodGhpei4kbmFtZSkuJHdyaXRlcihjYikudGhlbihmdW5jdGlvbiAoc3RvcmVzKSB7XG4gICAgICAgIHJldHVybiBzdG9yZXNbdGhpei4kbmFtZV07XG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJHJlYWRlcicsIGZ1bmN0aW9uIChjYikge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICByZXR1cm4gdGhpei4kZGIuJHN0b3JlKHRoaXouJG5hbWUpLiRyZWFkZXIoY2IpLnRoZW4oZnVuY3Rpb24gKHN0b3Jlcykge1xuICAgICAgICByZXR1cm4gc3RvcmVzW3RoaXouJG5hbWVdO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRwdXQnLCBmdW5jdGlvbiAob2JqLCBrZXkpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdmFyIGRhdGEgPSB0aGlzLiRnZXRWYWx1ZXMob2JqKTtcbiAgICAgIGFyZ3NbMF0gPSBkYXRhO1xuXG4gICAgICByZXR1cm4gdGhpei4kd3JpdGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRwdXQuYXBwbHkoc3RvcmUsIGFyZ3MpLnRoZW4oZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHZhciByZWNvcmQgPSB0aGl6LiRnZXRJbnN0YW5jZShrZXkpO1xuICAgICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGRhdGEpO1xuICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XG4gICAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGFkZCcsIGZ1bmN0aW9uIChvYmosIGtleSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB2YXIgZGF0YSA9IHRoaXMuJGdldFZhbHVlcyhvYmopO1xuICAgICAgYXJnc1swXSA9IGRhdGE7XG5cbiAgICAgIHJldHVybiB0aGl6LiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuJGFkZC5hcHBseShzdG9yZSwgYXJncykudGhlbihmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IHRoaXouJGdldEluc3RhbmNlKGtleSk7XG4gICAgICAgICAgcmVjb3JkLiRzZXRWYWx1ZXMoZGF0YSk7XG4gICAgICAgICAgcmVjb3JkLiRzZXRMb2NhbFZhbHVlcyhkYXRhKTtcbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckZGVsZXRlJywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgcmV0dXJuIHRoaXMuJHdyaXRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS4kZGVsZXRlLmFwcGx5KHN0b3JlLCBhcmdzKTtcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckY2xlYXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgcmV0dXJuIHRoaXMuJHdyaXRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS4kY2xlYXIuYXBwbHkoc3RvcmUsIGFyZ3MpO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXQnLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHZhciByZWNvcmQgPSB0aGlzLiRnZXRJbnN0YW5jZShrZXkpO1xuXG4gICAgICByZWNvcmQuJHByb21pc2UgPSB0aGl6LiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuJGdldC5hcHBseShzdG9yZSwgYXJncykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGRhdGEpO1xuICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XG4gICAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGdldEtleScsIGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgIHJldHVybiB0aGl6LiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuJGdldEtleS5hcHBseShzdG9yZSwgYXJncyk7XG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGdldEFsbCcsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgICByZXN1bHQuJHByb21pc2UgPSB0aGl6LiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuJGdldEFsbC5hcHBseShzdG9yZSwgYXJncykudGhlbihmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgICAgcmV0dXJuIGFyci5tYXAoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciByZWNvcmQgPSB0aGl6LiRnZXRJbnN0YW5jZSh0aGl6LiRnZXRLZXlGcm9tKGRhdGEpKTtcbiAgICAgICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGRhdGEpO1xuICAgICAgICAgICAgcmVjb3JkLiRzZXRMb2NhbFZhbHVlcyhkYXRhKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHJlY29yZCk7XG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckZ2V0QWxsS2V5cycsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgICByZXN1bHQuJHByb21pc2UgPSB0aGlzLiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuJGdldEFsbEtleXMuYXBwbHkoc3RvcmUsIGFyZ3MpLnRoZW4oZnVuY3Rpb24gKGFycikge1xuICAgICAgICAgIHJldHVybiBhcnIubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckY291bnQnLCBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICByZXR1cm4gdGhpcy4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRjb3VudC5hcHBseShzdG9yZSwgYXJncyk7XG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGZpbmQnLCBmdW5jdGlvbiAoZmlsdGVycykge1xuXG4gICAgICByZXR1cm4gbmV3IGlkYlF1ZXJ5KHRoaXMsIGZpbHRlcnMpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckZ2V0SW5zdGFuY2UnLCBmdW5jdGlvbiAoa2V5KSB7XG5cbiAgICAgIC8vIEVsIG9iamV0byBubyB0aWVuZSBJRFxuICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkIHx8IGtleSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoKTtcbiAgICAgIH1cblxuICAgICAgLy8gTm8gZXhpc3RlIGxhIGluc3RhbmNpYSBlbnRvbmNlIHNlIGNyZWFcbiAgICAgIGlmICghdGhpcy4kaW5zdGFuY2VzW2tleV0pIHtcbiAgICAgICAgdGhpcy4kaW5zdGFuY2VzW2tleV0gPSBuZXcgdGhpcygpO1xuICAgICAgICB0aGlzLiRpbnN0YW5jZXNba2V5XS4kc2V0KHRoaXMuJGlkLmtleVBhdGgsIGtleSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLiRpbnN0YW5jZXNba2V5XTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQXNpZ25hIGxhIGVzcGVjaWZpY2FjacOzbiBkZSBsb3MgY2FtcG9zXG4gICAgLnN0YXRpYygnJGZpZWxkJywgZnVuY3Rpb24gKG5hbWUsIGZpZWxkKSB7XG5cbiAgICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGZpZWxkID0geyBcInR5cGVcIjogZmllbGQgfTtcbiAgICAgIH1cblxuICAgICAgZmllbGQubmFtZSA9IG5hbWU7XG5cbiAgICAgIHRoaXMuJGZpZWxkc1tuYW1lXSA9IGZpZWxkO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQWdyZWdhIGVsIGVsIGNhbXBvIElEIGF1dG9tYXRpY2FtZW50ZVxuICAgIC5zdGF0aWMoJyRrZXknLCBmdW5jdGlvbiAoa2V5LCBhdXRvSW5jcmVtZW50LCB0eXBlKSB7XG4gICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGF1dG9JbmNyZW1lbnQgPSBrZXk7XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQgfHwga2V5ID09PSBudWxsIHx8IHR5cGVvZiBrZXkgPT09ICdib29sZWFuJykge1xuICAgICAgICBrZXkgPSAnaWQnO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBhdXRvSW5jcmVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0eXBlID0gYXV0b0luY3JlbWVudDtcbiAgICAgICAgYXV0b0luY3JlbWVudCA9IG51bGw7XG4gICAgICB9XG4gICAgICBpZiAoYXV0b0luY3JlbWVudCA9PT0gdW5kZWZpbmVkIHx8IGF1dG9JbmNyZW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgYXV0b0luY3JlbWVudCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGF1dG9JbmNyZW1lbnQgPT09ICdib29sZWFuJyB8fCB0eXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0eXBlID0gJ251bWJlcic7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuJGlkLmtleVBhdGggPSBrZXk7XG4gICAgICB0aGlzLiRpZC5hdXRvSW5jcmVtZW50ID0gYXV0b0luY3JlbWVudDtcblxuICAgICAgcmV0dXJuIHRoaXMuJGZpZWxkKGtleSwge1xuICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgdHlwZTogdHlwZVxuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcbiAgICAuc3RhdGljKCckZ2V0VmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgdmFyIHZhbHVlcyA9IHt9O1xuXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLiRmaWVsZHMpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZ2V0RmllbGRWYWx1ZShkYXRhLCBmaWVsZCk7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc2V0RmllbGRWYWx1ZSh2YWx1ZXMsIGZpZWxkLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBZ3JlZ2EgZWwgZWwgY2FtcG8gSUQgYXV0b21hdGljYW1lbnRlXG4gICAgLnN0YXRpYygnJGJ1aWxkJywgZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcblxuICAgICAgYnVpbGRDYWxsYmFjayh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBDb25maWd1cmEgZWwgcmVtb3RlIGFwaVxuICAgIC5zdGF0aWMoJyRyZW1vdGUnLCBmdW5jdGlvbiAodXJsLCBhcmdzLCBhY3Rpb25zKSB7XG5cbiAgICAgIHRoaXMuJF9yZW1vdGUgPSBsYlJlc291cmNlLmFwcGx5KGxiUmVzb3VyY2UsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUHJvcGllZGFkZXNcbiAgICAucHJvcGVydHkoJyRfdmFsdWVzJywgeyB2YWx1ZTogbmV3IENsYXp6ZXIoe30pLnN0YXRpYygnbG9jYWwnLCB7fSkuc3RhdGljKCdyZW1vdGUnLCB7fSkuY2xhenpcbiAgICB9KS5wcm9wZXJ0eSgnJF92ZXJzaW9ucycsIHsgdmFsdWU6IHt9IH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXG4gICAgLm1ldGhvZCgnJGdldCcsIGZ1bmN0aW9uIChmaWVsZCkge1xuXG4gICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEFzaWduYSBpbiB2YWxvciBhIHVuIGNhbXBvXG4gICAgLm1ldGhvZCgnJHNldCcsIGZ1bmN0aW9uIChmaWVsZCwgdmFsdWUpIHtcblxuICAgICAgcmV0dXJuIHNldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXG4gICAgLm1ldGhvZCgnJGdldFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgIHJldHVybiBpZGJNb2RlbC4kZ2V0VmFsdWVzKGRhdGEgfHwgdGhpcyk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5tZXRob2QoJyRnZXRMb2NhbFZhbHVlcycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgcmV0dXJuIHRoaXMuJGdldFZhbHVlcyh0aGlzLiRfdmFsdWVzLmxvY2FsKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLm1ldGhvZCgnJGdldFJlbW90ZVZhbHVlcycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgcmV0dXJuIHRoaXMuJGdldFZhbHVlcyh0aGlzLiRfdmFsdWVzLnJlbW90ZSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5tZXRob2QoJyRzZXRWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIHNldEZpZWxkVmFsdWUodGhpeiwgZmllbGQsIGRhdGFbZmllbGRdKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLm1ldGhvZCgnJHNldExvY2FsVmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJF92YWx1ZXMubG9jYWwsIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5tZXRob2QoJyRzZXRSZW1vdGVWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIHNldEZpZWxkVmFsdWUodGhpei4kX3ZhbHVlcy5yZW1vdGUsIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5tZXRob2QoJyRrZXknLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZShkYXRhLCB0aGlzLiRpZC5rZXlQYXRoKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gRnVuY2lvbiBxdWUgaGFjZSBlc2N1Y2hhcnMgbG9zIG1lbnNhamVzIGRlbCBzb2NrZXQgcGFyYSBlbCBtb2RlbFxuICAgIC5tZXRob2QoJyRsaXN0ZW4nLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgaWYgKCF0aGlzLiRzb2NrZXQpIHRocm93IG5ldyBFcnJvcignaWRiTW9kZWwuRG9lc05vdEhhdmVTb2NrZXRJbnN0YW5jZScpO1xuXG4gICAgICAvLyBDcmVhciB1bmEgc3Vic2NyaXBjaW9uIGFsIHNvY2tldCBwYXJhIGN1YW5kbyBzZSByZWNpYmFuIGRhdG9zXG4gICAgICAvLyBwYXJhIGxhIGluc3RhbmNpYSBhY3R1YWxcbiAgICAgIHRoaXMuJHNvY2tldC5zdWJzY3JpYmUoe1xuICAgICAgICBtb2RlbE5hbWU6IGlkYk1vZGVsLiRuYW1lLFxuICAgICAgICBldmVudE5hbWU6ICd1cGRhdGUnLFxuICAgICAgICBtb2RlbElkOiB0aGl6LiRrZXkoKVxuICAgICAgfSwgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAvLyBBIHJlY2liaXIgZGF0b3MgZGVsIHNvY2tldCBhc2lnbmFyIGxvcyB2YWxvcmVzXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBFbWl0aXIgZXZlbnRvIGRlIGRhdG9zIHJlY2liaWRvciBwYXJhIGVsIG1vZGVsb1xuICAgICAgICAgIHRoaXouJHNldFJlbW90ZVZhbHVlcyhkYXRhLnZhbHVlcywgZGF0YS52ZXJzaW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLmNsYXp6O1xuICB9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJNb2RlbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJUcmFuc2FjdGlvblxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJUcmFuc2FjdGlvbiA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgICAgIG9iamVjdFN0b3JlTmFtZXM7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJEYXRhYmFzZSAgICAgICAgZGI7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTUV4Y2VwdGlvbiAgICAgICBlcnJvcjtcclxuICogXHJcbiAqICAgSURCT2JqZWN0U3RvcmUgb2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGFib3J0KCk7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25hYm9ydDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uY29tcGxldGU7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZW51bSBJREJUcmFuc2FjdGlvbk1vZGUge1xyXG4gKiAgIFwicmVhZG9ubHlcIixcclxuICogICBcInJlYWR3cml0ZVwiLFxyXG4gKiAgIFwidmVyc2lvbmNoYW5nZVwiXHJcbiAqIH07XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiU3RvcmUpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRfcHJvbWlzZVxyXG4gIFxyXG4gIGNvbnN0IFRyYW5zYWN0aW9uTW9kZSA9IG5ldyBDbGF6emVyKHt9KVxyXG4gICAgICAgIC5zdGF0aWMoJ1JlYWRPbmx5JywgJ3JlYWRvbmx5JylcclxuICAgICAgICAuc3RhdGljKCdSZWFkV3JpdGUnLCAncmVhZHdyaXRlJylcclxuICAgICAgICAuc3RhdGljKCdWZXJzaW9uQ2hhbmdlJywgICd2ZXJzaW9uY2hhbmdlJyk7XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiVHJhbnNhY3Rpb24gKG1lKSB7XHJcbiAgICBcclxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBTdGF0aWNzXHJcbiAgLnN0YXRpYygnVHJhbnNhY3Rpb25Nb2RlJywgVHJhbnNhY3Rpb25Nb2RlLmNsYXp6KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJGRiJywgICAgICAgICAgJ2RiJylcclxuICAuZ2V0dGVyKCckbW9kZScsICAgICAgICAnbW9kZScpXHJcbiAgLmdldHRlcignJGVycm9yJywgICAgICAgJ2Vycm9yJylcclxuICAuZ2V0dGVyKCckc3RvcmVOYW1lcycsICAnb2JqZWN0U3RvcmVOYW1lcycpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEV2ZW50IGhhbmRsZXJzXHJcbiAgLmhhbmRsZXJFdmVudCgnJGFib3J0ZWQnLCAgICdvbmFib3J0JylcclxuICAuaGFuZGxlckV2ZW50KCckY29tcGxldGVkJywgJ29uY29tcGxldGUnKVxyXG4gIC5oYW5kbGVyRXZlbnQoJyRmYWlsZWQnLCAgICAnb25lcnJvcicpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRzdG9yZScsIGZ1bmN0aW9uKG5hbWUpe1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiU3RvcmUodGhpcy4kbWUub2JqZWN0U3RvcmUuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckYWJvcnQnLCBmdW5jdGlvbigpe1xyXG5cclxuICAgIHRoaXMuJG1lLmFib3J0LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9wZXJ0eVxyXG4gIC5wcm9wZXJ0eSgnJHByb21pc2UnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlmICh0aGl6LiRfcHJvbWlzZSkgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgICAgLy8gQ3JlYXIgcHJvbWlzZSBwYXJhIGVsIHJlcXVlc3RcclxuICAgICAgdGhpei4kX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdGhpei4kY29tcGxldGVkKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVzb2x2ZShldmVudCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuJGZhaWxlZChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlamVjdChldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbmV3IENsYXp6ZXIodGhpei4kX3Byb21pc2UpLnN0YXRpYygnJHRyYW5zYWN0aW9uJywgdGhpeik7XHJcblxyXG4gICAgICByZXR1cm4gdGhpei4kX3Byb21pc2U7XHJcblxyXG4gICAgfVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvaWRiVHJhbnNhY3Rpb24uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJUcmFuc2FjdGlvblxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJUcmFuc2FjdGlvbiA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgICAgIG9iamVjdFN0b3JlTmFtZXM7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJEYXRhYmFzZSAgICAgICAgZGI7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTUV4Y2VwdGlvbiAgICAgICBlcnJvcjtcclxuICogXHJcbiAqICAgSURCT2JqZWN0U3RvcmUgb2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGFib3J0KCk7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25hYm9ydDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uY29tcGxldGU7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZW51bSBJREJUcmFuc2FjdGlvbk1vZGUge1xyXG4gKiAgIFwicmVhZG9ubHlcIixcclxuICogICBcInJlYWR3cml0ZVwiLFxyXG4gKiAgIFwidmVyc2lvbmNoYW5nZVwiXHJcbiAqIH07XHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiU3RvcmUpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJF9wcm9taXNlXG5cbiAgdmFyIFRyYW5zYWN0aW9uTW9kZSA9IG5ldyBDbGF6emVyKHt9KS5zdGF0aWMoJ1JlYWRPbmx5JywgJ3JlYWRvbmx5Jykuc3RhdGljKCdSZWFkV3JpdGUnLCAncmVhZHdyaXRlJykuc3RhdGljKCdWZXJzaW9uQ2hhbmdlJywgJ3ZlcnNpb25jaGFuZ2UnKTtcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlRyYW5zYWN0aW9uKG1lKSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFN0YXRpY3NcbiAgLnN0YXRpYygnVHJhbnNhY3Rpb25Nb2RlJywgVHJhbnNhY3Rpb25Nb2RlLmNsYXp6KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRkYicsICdkYicpLmdldHRlcignJG1vZGUnLCAnbW9kZScpLmdldHRlcignJGVycm9yJywgJ2Vycm9yJykuZ2V0dGVyKCckc3RvcmVOYW1lcycsICdvYmplY3RTdG9yZU5hbWVzJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRXZlbnQgaGFuZGxlcnNcbiAgLmhhbmRsZXJFdmVudCgnJGFib3J0ZWQnLCAnb25hYm9ydCcpLmhhbmRsZXJFdmVudCgnJGNvbXBsZXRlZCcsICdvbmNvbXBsZXRlJykuaGFuZGxlckV2ZW50KCckZmFpbGVkJywgJ29uZXJyb3InKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckc3RvcmUnLCBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJTdG9yZSh0aGlzLiRtZS5vYmplY3RTdG9yZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRhYm9ydCcsIGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuJG1lLmFib3J0LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQcm9wZXJ0eVxuICAucHJvcGVydHkoJyRwcm9taXNlJywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICBpZiAodGhpei4kX3Byb21pc2UpIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcblxuICAgICAgLy8gQ3JlYXIgcHJvbWlzZSBwYXJhIGVsIHJlcXVlc3RcbiAgICAgIHRoaXouJF9wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0aGl6LiRjb21wbGV0ZWQoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmVzb2x2ZShldmVudCk7XG4gICAgICAgIH0pLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmVqZWN0KGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgbmV3IENsYXp6ZXIodGhpei4kX3Byb21pc2UpLnN0YXRpYygnJHRyYW5zYWN0aW9uJywgdGhpeik7XG5cbiAgICAgIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcbiAgICB9XG5cbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJUcmFuc2FjdGlvbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJRdWVyeVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyKSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJRdWVyeSAobW9kZWwsIHF1ZXJ5KSB7XHJcblxyXG4gICAgbmV3IENsYXp6ZXIodGhpcylcclxuICAgICAgLnN0YXRpYygnJG1vZGVsJywgbW9kZWwpXHJcbiAgICAgIC5zdGF0aWMoJyRxdWVyeScsIHF1ZXJ5KVxyXG4gICAgICA7XHJcblxyXG4gIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gU3RhdGljXHJcbiAgLnByb3BlcnR5KCckcmVzdWx0JywgeyB2YWx1ZTogW10gfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gbWV0aG9kXHJcbiAgLm1ldGhvZCgnJGdldFJlc3VsdCcsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBpZiAoIXRoaXouJHJlc3VsdC4kcHJvbWlzZSkge1xyXG5cclxuICAgICAgdGhpei4kcmVzdWx0LiRwcm9taXNlID0gdGhpei4kbW9kZWwuJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XHJcbiAgICAgICAgICBjb25zdCBycSA9IHN0b3JlLiRvcGVuQ3Vyc29yKCk7XHJcbiAgICAgICAgICBycS4kc3VjY2VzcyhmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnNvciA9IHJxLiRtZS5yZXN1bHQ7XHJcbiAgICAgICAgICAgIGlmICghY3Vyc29yKSByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpei4kbW9kZWwuJGdldEluc3RhbmNlKGN1cnNvci5rZXkpO1xyXG4gICAgICAgICAgICByZWNvcmQuJHNldFZhbHVlcyhjdXJzb3IudmFsdWUpO1xyXG4gICAgICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGN1cnNvci52YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXouJHJlc3VsdC5wdXNoKHJlY29yZCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHJlY29yZCk7XHJcblxyXG4gICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcclxuXHJcbiAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgIC4kZmFpbGVkKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICByZWplY3QoZXZlbnQpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGl6LiRyZXN1bHQ7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJRdWVyeS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYlF1ZXJ5XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlF1ZXJ5KG1vZGVsLCBxdWVyeSkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbW9kZWwnLCBtb2RlbCkuc3RhdGljKCckcXVlcnknLCBxdWVyeSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFN0YXRpY1xuICAucHJvcGVydHkoJyRyZXN1bHQnLCB7IHZhbHVlOiBbXSB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBtZXRob2RcbiAgLm1ldGhvZCgnJGdldFJlc3VsdCcsIGZ1bmN0aW9uIChjYikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgIGlmICghdGhpei4kcmVzdWx0LiRwcm9taXNlKSB7XG5cbiAgICAgIHRoaXouJHJlc3VsdC4kcHJvbWlzZSA9IHRoaXouJG1vZGVsLiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgdmFyIHJxID0gc3RvcmUuJG9wZW5DdXJzb3IoKTtcbiAgICAgICAgICBycS4kc3VjY2VzcyhmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgdmFyIGN1cnNvciA9IHJxLiRtZS5yZXN1bHQ7XG4gICAgICAgICAgICBpZiAoIWN1cnNvcikgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcblxuICAgICAgICAgICAgdmFyIHJlY29yZCA9IHRoaXouJG1vZGVsLiRnZXRJbnN0YW5jZShjdXJzb3Iua2V5KTtcbiAgICAgICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGN1cnNvci52YWx1ZSk7XG4gICAgICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGN1cnNvci52YWx1ZSk7XG4gICAgICAgICAgICB0aGl6LiRyZXN1bHQucHVzaChyZWNvcmQpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gocmVjb3JkKTtcblxuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSkuJGZhaWxlZChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJlamVjdChldmVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXouJHJlc3VsdDtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJRdWVyeS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpbywgJGxvZykgeyAnbmdJbmplY3QnO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRzb2NrZXRcclxuXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJTb2NrZXQodXJsLCBhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKXtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKVxyXG4gICAgICAuc3RhdGljKCckdXJsJywgdXJsIHx8IGlkYlNvY2tldC4kZGVmVXJsU2VydmVyKVxyXG4gICAgICAuc3RhdGljKCckYWNjZXNzVG9rZW5JZCcsIGFjY2Vzc1Rva2VuSWQgfHwgaWRiU29ja2V0LiRkZWZBY2Nlc3NUb2tlbklkKVxyXG4gICAgICAuc3RhdGljKCckY3VycmVudFVzZXJJZCcsIGN1cnJlbnRVc2VySWQgfHwgaWRiU29ja2V0LiRkZWZDdXJyZW50VXNlcklkKTtcclxuXHJcbiAgICB0aGlzLiRjb25uZWN0KCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5wcm9wZXJ0eSgnJF9saXN0ZW5lcnMnLCB7IHZhbHVlOltdIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbmVjdGFyc2UgYWwgc2Vydmlkb3JcclxuICAubWV0aG9kKCckY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyBDcmVhdGluZyBjb25uZWN0aW9uIHdpdGggc2VydmVyXHJcbiAgICBjb25zdCBzb2NrZXQgPSB0aGlzLiRzb2NrZXQgPSBpby5jb25uZWN0KHRoaXMuJHVybCk7XHJcblxyXG4gICAgLy8gVGhpcyBwYXJ0IGlzIG9ubHkgZm9yIGxvZ2luIHVzZXJzIGZvciBhdXRoZW50aWNhdGVkICRzb2NrZXQgY29ubmVjdGlvbiBiZXR3ZWVuIGNsaWVudCBhbmQgc2VydmVyLlxyXG4gICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXHJcbiAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpe1xyXG4gICAgICAkbG9nLmxvZygnY29ubmVjdGVkJyk7XHJcblxyXG4gICAgICBzb2NrZXQuZW1pdCgnYXV0aGVudGljYXRpb24nLCB7XHJcbiAgICAgICAgaWQ6IHRoaXMuJGFjY2Vzc1Rva2VuSWQsXHJcbiAgICAgICAgdXNlcklkOiB0aGlzLiRjdXJyZW50VXNlcklkLFxyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIHNvY2tldC5vbignYXV0aGVudGljYXRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIHVzZSB0aGUgJHNvY2tldCBhcyB1c3VhbFxyXG4gICAgICAgICRsb2cubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQnKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRzdWJzY3JpYmUnLCBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcclxuXHJcbiAgICBsZXQgbmFtZSA9IG9wdGlvbnMubW9kZWxOYW1lICsgJy4nICsgb3B0aW9ucy5ldmVudE5hbWU7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIG5hbWUgPSBuYW1lICsgJy4nICsgb3B0aW9ucy5tb2RlbElkO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuJHNvY2tldC5vbihuYW1lLCBjYik7XHJcbiAgICBcclxuICAgIC8vUHVzaCB0aGUgY29udGFpbmVyLi5cclxuICAgIHRoaXMuJHB1c2hMaXN0ZW5lcihuYW1lLCBjYik7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRwdXNoTGlzdGVuZXInLCBmdW5jdGlvbiAobmFtZSwgY2IpIHtcclxuXHJcbiAgICB0aGlzLiRfbGlzdGVuZXJzLnB1c2gobmFtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyR1bnN1YnNjcmliZScsZnVuY3Rpb24gKHN1YnNjcmlwdGlvbk5hbWUpIHtcclxuXHJcbiAgICB0aGlzLiRzb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzKHN1YnNjcmlwdGlvbk5hbWUpOyAgXHJcbiAgICB2YXIgaWR4ID0gdGhpcy4kX2xpc3RlbmVycy5pbmRleE9mKHN1YnNjcmlwdGlvbk5hbWUpO1xyXG4gICAgaWYgKGlkeCAhPSAtMSl7XHJcbiAgICAgIHRoaXMuJF9saXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICB9XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFzaWduYSBsYSBVUkwgZGUgc2Vydmlkb3IgcG9yIGRlZmVjdG9cclxuICAuc3RhdGljKCckc2V0VXJsU2VydmVyJywgZnVuY3Rpb24gKHVybCkge1xyXG5cclxuICAgIHRoaXMuJGRlZlVybFNlcnZlciA9IHVybDtcclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBU2lnbmEgbGFzIGNyZWRlbmNpYWxlcyBwb3IgZGVmZWN0b1xyXG4gIC5zdGF0aWMoJyRzZXRDcmVkZW50aWFscycsIGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XHJcblxyXG4gICAgdGhpcy4kZGVmQWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XHJcbiAgICB0aGlzLiRkZWZDdXJyZW50VXNlcklkID0gY3VycmVudFVzZXJJZDtcclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xhenpcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLiRzZXRVcmxTZXJ2ZXIobnVsbClcclxuICAuJHNldENyZWRlbnRpYWxzKG51bGwsIG51bGwpO1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2lkYlNvY2tldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlvLCAkbG9nKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXG4gIC8vICRzb2NrZXRcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlNvY2tldCh1cmwsIGFjY2Vzc1Rva2VuSWQsIGN1cnJlbnRVc2VySWQpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJHVybCcsIHVybCB8fCBpZGJTb2NrZXQuJGRlZlVybFNlcnZlcikuc3RhdGljKCckYWNjZXNzVG9rZW5JZCcsIGFjY2Vzc1Rva2VuSWQgfHwgaWRiU29ja2V0LiRkZWZBY2Nlc3NUb2tlbklkKS5zdGF0aWMoJyRjdXJyZW50VXNlcklkJywgY3VycmVudFVzZXJJZCB8fCBpZGJTb2NrZXQuJGRlZkN1cnJlbnRVc2VySWQpO1xuXG4gICAgdGhpcy4kY29ubmVjdCgpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAucHJvcGVydHkoJyRfbGlzdGVuZXJzJywgeyB2YWx1ZTogW10gfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uZWN0YXJzZSBhbCBzZXJ2aWRvclxuICAubWV0aG9kKCckY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcblxuICAgIC8vIENyZWF0aW5nIGNvbm5lY3Rpb24gd2l0aCBzZXJ2ZXJcbiAgICB2YXIgc29ja2V0ID0gdGhpcy4kc29ja2V0ID0gaW8uY29ubmVjdCh0aGlzLiR1cmwpO1xuXG4gICAgLy8gVGhpcyBwYXJ0IGlzIG9ubHkgZm9yIGxvZ2luIHVzZXJzIGZvciBhdXRoZW50aWNhdGVkICRzb2NrZXQgY29ubmVjdGlvbiBiZXR3ZWVuIGNsaWVudCBhbmQgc2VydmVyLlxuICAgIC8vIElmIHlvdSBhcmUgbm90IHVzaW5nIGxvZ2luIHBhZ2UgaW4geW91IHdlYnNpdGUgdGhlbiB5b3Ugc2hvdWxkIHJlbW92ZSByZXN0IHBpZWNlIG9mIGNvZGUuLlxuICAgIHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICRsb2cubG9nKCdjb25uZWN0ZWQnKTtcblxuICAgICAgc29ja2V0LmVtaXQoJ2F1dGhlbnRpY2F0aW9uJywge1xuICAgICAgICBpZDogdGhpcy4kYWNjZXNzVG9rZW5JZCxcbiAgICAgICAgdXNlcklkOiB0aGlzLiRjdXJyZW50VXNlcklkXG4gICAgICB9KTtcblxuICAgICAgc29ja2V0Lm9uKCdhdXRoZW50aWNhdGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyB1c2UgdGhlICRzb2NrZXQgYXMgdXN1YWxcbiAgICAgICAgJGxvZy5sb2coJ1VzZXIgaXMgYXV0aGVudGljYXRlZCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRzdWJzY3JpYmUnLCBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcblxuICAgIHZhciBuYW1lID0gb3B0aW9ucy5tb2RlbE5hbWUgKyAnLicgKyBvcHRpb25zLmV2ZW50TmFtZTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tb2RlbElkID09PSAnbnVtYmVyJykge1xuICAgICAgbmFtZSA9IG5hbWUgKyAnLicgKyBvcHRpb25zLm1vZGVsSWQ7XG4gICAgfVxuXG4gICAgdGhpcy4kc29ja2V0Lm9uKG5hbWUsIGNiKTtcblxuICAgIC8vUHVzaCB0aGUgY29udGFpbmVyLi5cbiAgICB0aGlzLiRwdXNoTGlzdGVuZXIobmFtZSwgY2IpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckcHVzaExpc3RlbmVyJywgZnVuY3Rpb24gKG5hbWUsIGNiKSB7XG5cbiAgICB0aGlzLiRfbGlzdGVuZXJzLnB1c2gobmFtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyR1bnN1YnNjcmliZScsIGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lKSB7XG5cbiAgICB0aGlzLiRzb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzKHN1YnNjcmlwdGlvbk5hbWUpO1xuICAgIHZhciBpZHggPSB0aGlzLiRfbGlzdGVuZXJzLmluZGV4T2Yoc3Vic2NyaXB0aW9uTmFtZSk7XG4gICAgaWYgKGlkeCAhPSAtMSkge1xuICAgICAgdGhpcy4kX2xpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEFzaWduYSBsYSBVUkwgZGUgc2Vydmlkb3IgcG9yIGRlZmVjdG9cbiAgLnN0YXRpYygnJHNldFVybFNlcnZlcicsIGZ1bmN0aW9uICh1cmwpIHtcblxuICAgIHRoaXMuJGRlZlVybFNlcnZlciA9IHVybDtcbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQVNpZ25hIGxhcyBjcmVkZW5jaWFsZXMgcG9yIGRlZmVjdG9cbiAgLnN0YXRpYygnJHNldENyZWRlbnRpYWxzJywgZnVuY3Rpb24gKGFjY2Vzc1Rva2VuSWQsIGN1cnJlbnRVc2VySWQpIHtcblxuICAgIHRoaXMuJGRlZkFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xuICAgIHRoaXMuJGRlZkN1cnJlbnRVc2VySWQgPSBjdXJyZW50VXNlcklkO1xuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xhenpcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLiRzZXRVcmxTZXJ2ZXIobnVsbCkuJHNldENyZWRlbnRpYWxzKG51bGwsIG51bGwpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92MS9pZGJTb2NrZXQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsYiAobW9kdWxlKSB7XHJcblxyXG4gIC8vIER2dWVsdmUgZWwgaG9zdCBkZSB1bmEgVVJMXHJcbiAgZnVuY3Rpb24gZ2V0SG9zdCh1cmwpIHtcclxuICAgIGNvbnN0IG0gPSB1cmwubWF0Y2goL14oPzpodHRwcz86KT9cXC9cXC8oW15cXC9dKykvKTtcclxuICAgIHJldHVybiBtID8gbVsxXSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBsZXQgdXJsQmFzZUhvc3QgPSBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICBjb25zdCBsYkF1dGggPSBmdW5jdGlvbigpIHsgJ25nSW5qZWN0J1xyXG4gICAgY29uc3QgcHJvcHMgPSBbJ2FjY2Vzc1Rva2VuSWQnLCAnY3VycmVudFVzZXJJZCcsICdyZW1lbWJlck1lJ107XHJcbiAgICBjb25zdCBwcm9wc1ByZWZpeCA9ICckaWRiLWxiJCc7XHJcbiAgICBcclxuICAgIC8vIE5vdGU6IExvY2FsU3RvcmFnZSBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gc3RyaW5nXHJcbiAgICAvLyBXZSBhcmUgdXNpbmcgZW1wdHkgc3RyaW5nIGFzIGEgbWFya2VyIGZvciBudWxsL3VuZGVmaW5lZCB2YWx1ZXMuXHJcbiAgICBmdW5jdGlvbiBzYXZlKHN0b3JhZ2UsIG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9ICcnO1xyXG4gICAgICAgIHN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQ2Fubm90IGFjY2VzcyBsb2NhbC9zZXNzaW9uIHN0b3JhZ2U6JywgZXJyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxvYWQobmFtZSkge1xyXG4gICAgICBjb25zdCBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XHJcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Vba2V5XSB8fCBzZXNzaW9uU3RvcmFnZVtrZXldIHx8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbGJBdXRoKCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHRoaXpbbmFtZV0gPSBsb2FkKG5hbWUpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgY29uc3Qgc3RvcmFnZSA9IHRoaXoucmVtZW1iZXJNZSA/IGxvY2FsU3RvcmFnZSA6IHNlc3Npb25TdG9yYWdlO1xyXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICBzYXZlKHN0b3JhZ2UsIG5hbWUsIHRoaXpbbmFtZV0pO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zZXRVc2VyID0gZnVuY3Rpb24oYWNjZXNzVG9rZW5JZCwgdXNlcklkLCB1c2VyRGF0YSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlcklkID0gdXNlcklkO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IHVzZXJEYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyVXNlciA9IGZ1bmN0aW9uKCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gbnVsbDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlcklkID0gbnVsbDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyU3RvcmFnZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICBzYXZlKHNlc3Npb25TdG9yYWdlLCBuYW1lLCBudWxsKTtcclxuICAgICAgICBzYXZlKGxvY2FsU3RvcmFnZSwgbmFtZSwgbnVsbCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbmV3IGxiQXV0aCgpO1xyXG5cclxuICB9O1xyXG5cclxuICBjb25zdCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbigkcSwgbGJBdXRoKSB7ICduZ0luamVjdCc7XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlcXVlc3Q6IGZ1bmN0aW9uKGNvbmZpZykge1xyXG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXh0ZXJuYWwgcmVxdWVzdHNcclxuICAgICAgICBjb25zdCBob3N0ID0gZ2V0SG9zdChjb25maWcudXJsKTtcclxuICAgICAgICBpZiAoaG9zdCAmJiBob3N0ICE9PSB1cmxCYXNlSG9zdCkge1xyXG4gICAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsYkF1dGguYWNjZXNzVG9rZW5JZCkge1xyXG4gICAgICAgICAgY29uZmlnLmhlYWRlcnNbYXV0aEhlYWRlcl0gPSBsYkF1dGguYWNjZXNzVG9rZW5JZDtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5fX2lzR2V0Q3VycmVudFVzZXJfXykge1xyXG4gICAgICAgICAgLy8gUmV0dXJuIGEgc3R1YiA0MDEgZXJyb3IgZm9yIFVzZXIuZ2V0Q3VycmVudCgpIHdoZW5cclxuICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIHVzZXIgbG9nZ2VkIGluXHJcbiAgICAgICAgICBjb25zdCByZXMgPSB7XHJcbiAgICAgICAgICAgIGJvZHk6IHsgZXJyb3I6IHsgc3RhdHVzOiA0MDEgfX0sXHJcbiAgICAgICAgICAgIHN0YXR1czogNDAxLFxyXG4gICAgICAgICAgICBjb25maWc6IGNvbmZpZyxcclxuICAgICAgICAgICAgaGVhZGVyczogZnVuY3Rpb24oKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29uZmlnIHx8ICRxLndoZW4oY29uZmlnKTtcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxiUmVzb3VyY2UgPSBmdW5jdGlvbigpIHsgJ25nSW5qZWN0JzsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgdXJsQmFzZTogXCIvYXBpXCIsXHJcbiAgICAgIGF1dGhIZWFkZXI6ICdhdXRob3JpemF0aW9uJyxcclxuICAgIH07XHJcblxyXG4gICAgdXJsQmFzZUhvc3QgPSBnZXRIb3N0KG9wdGlvbnMudXJsQmFzZSkgfHwgbG9jYXRpb24uaG9zdDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlciBUaGUgaGVhZGVyIG5hbWUgdG8gdXNlLCBlLmcuIGBYLUFjY2Vzcy1Ub2tlbmBcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ29uZmlndXJlIHRoZSBSRVNUIHRyYW5zcG9ydCB0byB1c2UgYSBkaWZmZXJlbnQgaGVhZGVyIGZvciBzZW5kaW5nXHJcbiAgICAgKiB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uIEl0IGlzIHNlbnQgaW4gdGhlIGBBdXRob3JpemF0aW9uYCBoZWFkZXJcclxuICAgICAqIGJ5IGRlZmF1bHQuXHJcbiAgICAgKi9cclxuICAgIHRoaXouc2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKGhlYWRlcikge1xyXG4gICAgICBvcHRpb25zLmF1dGhIZWFkZXIgPSBoZWFkZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgaGVhZGVyIG5hbWUgdGhhdCBpcyB1c2VkIGZvciBzZW5kaW5nIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cclxuICAgICAqL1xyXG4gICAgdGhpei5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdXNlLCBlLmcuIGAvYXBpYCBvciBgLy9leGFtcGxlLmNvbS9hcGlgLlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDaGFuZ2UgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBCeSBkZWZhdWx0LCB0aGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xyXG4gICAgdGhpei5zZXRVcmxCYXNlID0gZnVuY3Rpb24odXJsKSB7XHJcbiAgICAgIG9wdGlvbnMudXJsQmFzZSA9IHVybDtcclxuICAgICAgdXJsQmFzZUhvc3QgPSBnZXRIb3N0KG9wdGlvbnMudXJsQmFzZSkgfHwgbG9jYXRpb24uaG9zdDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gVGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cclxuICAgIHRoaXouZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LiRnZXQgPSBmdW5jdGlvbigkcmVzb3VyY2UpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgICAgIGNvbnN0IGxiUmVzb3VyY2UgPSBmdW5jdGlvbih1cmwsIHBhcmFtcywgYWN0aW9ucykge1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhhY3Rpb25zKS5tYXAoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgYWN0aW9uc1trZXldLm9yaWdpbmFsVXJsID0gYWN0aW9uc1trZXldLnVybDtcclxuICAgICAgICAgIGFjdGlvbnNba2V5XS51cmwgPSBvcHRpb25zLnVybEJhc2UgKyBhY3Rpb25zW2tleV0udXJsO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCByZXNvdXJjZSA9ICRyZXNvdXJjZShvcHRpb25zLnVybEJhc2UgKyB1cmwsIHBhcmFtcywgYWN0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vIEFuZ3VsYXIgYWx3YXlzIGNhbGxzIFBPU1Qgb24gJHNhdmUoKVxyXG4gICAgICAgIC8vIFRoaXMgaGFjayBpcyBiYXNlZCBvblxyXG4gICAgICAgIC8vIGh0dHA6Ly9raXJrYnVzaGVsbC5tZS9hbmd1bGFyLWpzLXVzaW5nLW5nLXJlc291cmNlLWluLWEtbW9yZS1yZXN0ZnVsLW1hbm5lci9cclxuICAgICAgICByZXNvdXJjZS5wcm90b3R5cGUuJHNhdmUgPSBmdW5jdGlvbihzdWNjZXNzLCBlcnJvcikge1xyXG4gICAgICAgICAgLy8gRm9ydHVuYXRlbHksIExvb3BCYWNrIHByb3ZpZGVzIGEgY29udmVuaWVudCBgdXBzZXJ0YCBtZXRob2RcclxuICAgICAgICAgIC8vIHRoYXQgZXhhY3RseSBmaXRzIG91ciBuZWVkcy5cclxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc291cmNlLnVwc2VydC5jYWxsKHRoaXMsIHt9LCB0aGlzLCBzdWNjZXNzLCBlcnJvcik7XHJcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LiRwcm9taXNlIHx8IHJlc3VsdDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxiUmVzb3VyY2UuZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsYlJlc291cmNlLmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xyXG4gICAgICB9O1xyXG4gICAgXHJcbiAgICAgIHJldHVybiBsYlJlc291cmNlO1xyXG5cclxuICAgIH07XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1vZHVsZVxyXG4gICAgLmZhY3RvcnkoJ2xiQXV0aCcsIGxiQXV0aClcclxuICAgIC5wcm92aWRlcignbGJSZXNvdXJjZScsIGxiUmVzb3VyY2UpXHJcbiAgICAuZmFjdG9yeSgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJywgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yKVxyXG4gICAgLmNvbmZpZyhbJyRodHRwUHJvdmlkZXInLCBmdW5jdGlvbigkaHR0cFByb3ZpZGVyKSB7ICduZ0luamVjdCc7XHJcbiAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicpO1xyXG4gICAgfV0pO1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3YxL2xiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gbGI7XG5mdW5jdGlvbiBsYihtb2R1bGUpIHtcblxuICAvLyBEdnVlbHZlIGVsIGhvc3QgZGUgdW5hIFVSTFxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xuICAgIHZhciBtID0gdXJsLm1hdGNoKC9eKD86aHR0cHM/Oik/XFwvXFwvKFteXFwvXSspLyk7XG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcbiAgfVxuXG4gIHZhciB1cmxCYXNlSG9zdCA9IGxvY2F0aW9uLmhvc3Q7XG5cbiAgdmFyIGxiQXV0aCA9IGZ1bmN0aW9uIGxiQXV0aCgpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdmFyIHByb3BzID0gWydhY2Nlc3NUb2tlbklkJywgJ2N1cnJlbnRVc2VySWQnLCAncmVtZW1iZXJNZSddO1xuICAgIHZhciBwcm9wc1ByZWZpeCA9ICckaWRiLWxiJCc7XG5cbiAgICAvLyBOb3RlOiBMb2NhbFN0b3JhZ2UgY29udmVydHMgdGhlIHZhbHVlIHRvIHN0cmluZ1xuICAgIC8vIFdlIGFyZSB1c2luZyBlbXB0eSBzdHJpbmcgYXMgYSBtYXJrZXIgZm9yIG51bGwvdW5kZWZpbmVkIHZhbHVlcy5cbiAgICBmdW5jdGlvbiBzYXZlKHN0b3JhZ2UsIG5hbWUsIHZhbHVlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAnJztcbiAgICAgICAgc3RvcmFnZVtrZXldID0gdmFsdWU7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZChuYW1lKSB7XG4gICAgICB2YXIga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVtrZXldIHx8IHNlc3Npb25TdG9yYWdlW2tleV0gfHwgbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsYkF1dGgoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdGhpeltuYW1lXSA9IGxvYWQobmFtZSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB2YXIgc3RvcmFnZSA9IHRoaXoucmVtZW1iZXJNZSA/IGxvY2FsU3RvcmFnZSA6IHNlc3Npb25TdG9yYWdlO1xuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBzYXZlKHN0b3JhZ2UsIG5hbWUsIHRoaXpbbmFtZV0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2V0VXNlciA9IGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCB1c2VySWQsIHVzZXJEYXRhKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xuICAgICAgdGhpei5jdXJyZW50VXNlcklkID0gdXNlcklkO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSB1c2VyRGF0YTtcbiAgICB9O1xuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclVzZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xuICAgICAgdGhpei5jdXJyZW50VXNlcklkID0gbnVsbDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcbiAgICB9O1xuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclN0b3JhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHNhdmUoc2Vzc2lvblN0b3JhZ2UsIG5hbWUsIG51bGwpO1xuICAgICAgICBzYXZlKGxvY2FsU3RvcmFnZSwgbmFtZSwgbnVsbCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBsYkF1dGgoKTtcbiAgfTtcblxuICB2YXIgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24gbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yKCRxLCBsYkF1dGgpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXh0ZXJuYWwgcmVxdWVzdHNcbiAgICAgICAgdmFyIGhvc3QgPSBnZXRIb3N0KGNvbmZpZy51cmwpO1xuICAgICAgICBpZiAoaG9zdCAmJiBob3N0ICE9PSB1cmxCYXNlSG9zdCkge1xuICAgICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGJBdXRoLmFjY2Vzc1Rva2VuSWQpIHtcbiAgICAgICAgICBjb25maWcuaGVhZGVyc1thdXRoSGVhZGVyXSA9IGxiQXV0aC5hY2Nlc3NUb2tlbklkO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5fX2lzR2V0Q3VycmVudFVzZXJfXykge1xuICAgICAgICAgIC8vIFJldHVybiBhIHN0dWIgNDAxIGVycm9yIGZvciBVc2VyLmdldEN1cnJlbnQoKSB3aGVuXG4gICAgICAgICAgLy8gdGhlcmUgaXMgbm8gdXNlciBsb2dnZWQgaW5cbiAgICAgICAgICB2YXIgcmVzID0ge1xuICAgICAgICAgICAgYm9keTogeyBlcnJvcjogeyBzdGF0dXM6IDQwMSB9IH0sXG4gICAgICAgICAgICBzdGF0dXM6IDQwMSxcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICAgICAgaGVhZGVyczogZnVuY3Rpb24gaGVhZGVycygpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29uZmlnIHx8ICRxLndoZW4oY29uZmlnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIHZhciBsYlJlc291cmNlID0gZnVuY3Rpb24gbGJSZXNvdXJjZSgpIHtcbiAgICAnbmdJbmplY3QnO1xuICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgdXJsQmFzZTogXCIvYXBpXCIsXG4gICAgICBhdXRoSGVhZGVyOiAnYXV0aG9yaXphdGlvbidcbiAgICB9O1xuXG4gICAgdXJsQmFzZUhvc3QgPSBnZXRIb3N0KG9wdGlvbnMudXJsQmFzZSkgfHwgbG9jYXRpb24uaG9zdDtcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyIFRoZSBoZWFkZXIgbmFtZSB0byB1c2UsIGUuZy4gYFgtQWNjZXNzLVRva2VuYFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25maWd1cmUgdGhlIFJFU1QgdHJhbnNwb3J0IHRvIHVzZSBhIGRpZmZlcmVudCBoZWFkZXIgZm9yIHNlbmRpbmdcclxuICAgICAqIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi4gSXQgaXMgc2VudCBpbiB0aGUgYEF1dGhvcml6YXRpb25gIGhlYWRlclxyXG4gICAgICogYnkgZGVmYXVsdC5cclxuICAgICAqL1xuICAgIHRoaXouc2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uIChoZWFkZXIpIHtcbiAgICAgIG9wdGlvbnMuYXV0aEhlYWRlciA9IGhlYWRlcjtcbiAgICB9LFxuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBoZWFkZXIgbmFtZSB0aGF0IGlzIHVzZWQgZm9yIHNlbmRpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLlxyXG4gICAgICovXG4gICAgdGhpei5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcbiAgICB9LFxuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB1c2UsIGUuZy4gYC9hcGlgIG9yIGAvL2V4YW1wbGUuY29tL2FwaWAuXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENoYW5nZSB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIEJ5IGRlZmF1bHQsIHRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXG4gICAgdGhpei5zZXRVcmxCYXNlID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgb3B0aW9ucy51cmxCYXNlID0gdXJsO1xuICAgICAgdXJsQmFzZUhvc3QgPSBnZXRIb3N0KG9wdGlvbnMudXJsQmFzZSkgfHwgbG9jYXRpb24uaG9zdDtcbiAgICB9LFxuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gVGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cbiAgICB0aGl6LmdldFVybEJhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xuICAgIH07XG5cbiAgICB0aGl6LiRnZXQgPSBmdW5jdGlvbiAoJHJlc291cmNlKSB7XG4gICAgICAnbmdJbmplY3QnO1xuXG4gICAgICB2YXIgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uIGxiUmVzb3VyY2UodXJsLCBwYXJhbXMsIGFjdGlvbnMpIHtcblxuICAgICAgICBPYmplY3Qua2V5cyhhY3Rpb25zKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIGFjdGlvbnNba2V5XS5vcmlnaW5hbFVybCA9IGFjdGlvbnNba2V5XS51cmw7XG4gICAgICAgICAgYWN0aW9uc1trZXldLnVybCA9IG9wdGlvbnMudXJsQmFzZSArIGFjdGlvbnNba2V5XS51cmw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciByZXNvdXJjZSA9ICRyZXNvdXJjZShvcHRpb25zLnVybEJhc2UgKyB1cmwsIHBhcmFtcywgYWN0aW9ucyk7XG5cbiAgICAgICAgLy8gQW5ndWxhciBhbHdheXMgY2FsbHMgUE9TVCBvbiAkc2F2ZSgpXG4gICAgICAgIC8vIFRoaXMgaGFjayBpcyBiYXNlZCBvblxuICAgICAgICAvLyBodHRwOi8va2lya2J1c2hlbGwubWUvYW5ndWxhci1qcy11c2luZy1uZy1yZXNvdXJjZS1pbi1hLW1vcmUtcmVzdGZ1bC1tYW5uZXIvXG4gICAgICAgIHJlc291cmNlLnByb3RvdHlwZS4kc2F2ZSA9IGZ1bmN0aW9uIChzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgIC8vIEZvcnR1bmF0ZWx5LCBMb29wQmFjayBwcm92aWRlcyBhIGNvbnZlbmllbnQgYHVwc2VydGAgbWV0aG9kXG4gICAgICAgICAgLy8gdGhhdCBleGFjdGx5IGZpdHMgb3VyIG5lZWRzLlxuICAgICAgICAgIHZhciByZXN1bHQgPSByZXNvdXJjZS51cHNlcnQuY2FsbCh0aGlzLCB7fSwgdGhpcywgc3VjY2VzcywgZXJyb3IpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQuJHByb21pc2UgfHwgcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzb3VyY2U7XG4gICAgICB9O1xuXG4gICAgICBsYlJlc291cmNlLmdldFVybEJhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XG4gICAgICB9O1xuXG4gICAgICBsYlJlc291cmNlLmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gbGJSZXNvdXJjZTtcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBtb2R1bGUuZmFjdG9yeSgnbGJBdXRoJywgbGJBdXRoKS5wcm92aWRlcignbGJSZXNvdXJjZScsIGxiUmVzb3VyY2UpLmZhY3RvcnkoJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicsIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcikuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicpO1xuICB9XSk7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdjEvbGIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9