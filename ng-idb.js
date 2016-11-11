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
	
	// Globales
	
	var _Clazzer = __webpack_require__(1);
	
	var _Clazzer2 = _interopRequireDefault(_Clazzer);
	
	var _idbRequest = __webpack_require__(2);
	
	var _idbRequest2 = _interopRequireDefault(_idbRequest);
	
	var _idbOpenDBRequest = __webpack_require__(3);
	
	var _idbOpenDBRequest2 = _interopRequireDefault(_idbOpenDBRequest);
	
	var _idbConsultant = __webpack_require__(4);
	
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
	
	// Services
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

/***/ },
/* 1 */
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
/* 2 */
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
/* 3 */
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
/* 4 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTZiZDMxOTQxNTRjY2U3Y2M4OTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy9DbGF6emVyLmpzIiwid2VicGFjazovLy8uL3NyYy9DbGF6emVyLmpzPzA5MWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlJlcXVlc3QuanM/MzcxMSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiT3BlbkRCUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiT3BlbkRCUmVxdWVzdC5qcz85YWIzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJDb25zdWx0YW50LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJDb25zdWx0YW50LmpzP2IyYWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiLmpzPzYzNTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlN0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJTdG9yZS5qcz80NDBkIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJJbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiSW5kZXguanM/MTMyOSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiRXZlbnRUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYkV2ZW50VGFyZ2V0LmpzPzZiZGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qcz9mOWY5Iiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJUcmFuc2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiVHJhbnNhY3Rpb24uanM/NmUzNiIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlF1ZXJ5LmpzP2Y3N2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzP2QxYTEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xiLmpzIiwid2VicGFjazovLy8uL3NyYy9sYi5qcz9mZmRjIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25zdGFudCIsImlvIiwic2VydmljZSIsImlkYlNvY2tldCIsIkFQSV9ST09UIiwibG9jYWxTdG9yYWdlIiwiaWRiIiwic29ja2V0IiwiZGIiLCIkYmluZCIsImNvbnNvbGUiLCJsb2ciLCIkYWJvcnRlZCIsIiRjbG9zZWQiLCIkZXJyb3IiLCIkdmVyc2lvbkNoYW5nZWQiLCIkYXV0b21pZ3JhdGlvbiIsIiRtb2RlbCIsIiRjcmVhdGUiLCIkYWRkSW5kZXgiLCJtb2RlbCIsInN0b3JlIiwiJGNyZWF0ZUluZGV4IiwiJGRyb3AiLCJ0aGVuIiwiJG9wZW4iLCJ3aW5kb3ciLCJFbXBsZWFkbyIsIiRmaWVsZCIsIiRyZW1vdGUiLCJ1cmwiLCJtZXRob2QiLCJpc0FycmF5IiwiJGJ1aWxkIiwicHJvdG90eXBlIiwiJGNvbnN0cnVjdG9yIiwiZGF0YSIsImdldE5vbWJyZSIsIm5vbWJyZXMiLCJhcGVsbGlkb3MiLCJydW4iLCIkcHV0IiwiaWQiLCJyZWNvcmQiLCIkYWRkIiwiciIsIiRnZXQiLCIkcHJvbWlzZSIsIiRmaW5kIiwiJGdldFJlc3VsdCIsIiRnZXRBbGwiLCIkY291bnQiLCJjb3VudCIsIiRnZXRBbGxLZXlzIiwiJGRlbGV0ZSIsIiRjbGVhciIsIiRjbG9zZSIsIkNsYXp6ZXIiLCJjb25zdHJ1Y3RvciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJwYXJlbnQiLCJ0bXAiLCJjbGF6eiIsIm5hbWUiLCJvcHRzIiwiZnVuYyIsInByb3BlcnR5IiwiZnJvbSIsInRvIiwiZ2V0IiwiJG1lIiwic2V0IiwiY2IiLCJSZWFkeVN0YXRlIiwic3RhdGljIiwiaWRiUmVxdWVzdCIsIm1lIiwiaW5oZXJpdCIsIkV2ZW50VGFyZ2V0IiwiZ2V0dGVyIiwiaGFuZGxlckV2ZW50IiwidGhpeiIsIiRfcHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiJHN1Y2Nlc3MiLCJldmVudCIsIiRmYWlsZWQiLCJpZGJPcGVuREJSZXF1ZXN0IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJpZGJDb25zdWx0YW50IiwicXVlcnkiLCJ0YXJnZXQiLCJyZXN1bHQiLCJnZXRLZXkiLCJnZXRBbGwiLCJnZXRBbGxLZXlzIiwiZGlyZWN0aW9uIiwib3BlbkN1cnNvciIsIm9wZW5LZXlDdXJzb3IiLCJpZGJFdmVudFRhcmdldCIsImlkYlN0b3JlIiwiaWRiTW9kZWwiLCJpZGJUcmFuc2FjdGlvbiIsIiRsb2ciLCJpbmRleGVkREIiLCJtb3pJbmRleGVkREIiLCJ3ZWJraXRJbmRleGVkREIiLCJtc0luZGV4ZWREQiIsIklEQlRyYW5zYWN0aW9uIiwid2Via2l0SURCVHJhbnNhY3Rpb24iLCJtc0lEQlRyYW5zYWN0aW9uIiwiSURCS2V5UmFuZ2UiLCJ3ZWJraXRJREJLZXlSYW5nZSIsIm1zSURCS2V5UmFuZ2UiLCJhbGVydCIsInZlcnNpb24iLCIkX21lIiwiZSIsIkV2ZW50IiwiJGVtaXQiLCJvcGVuIiwiZGVsZXRlRGF0YWJhc2UiLCJmaXJzdCIsInNlY29uZCIsImNtcCIsIm9uYWJvcnQiLCJvbmNsb3NlIiwib25lcnJvciIsIm9udmVyc2lvbmNoYW5nZSIsIiRfdXBncmFkZW5lZWRlZHMiLCJwdXNoIiwiYWxsTWlncmF0aW9ucyIsIiR1cGdyYWRlbmVlZGVkIiwib3BlblJlcXVlc3QiLCJrZXlzIiwibWFwIiwib2xkVmVyc2lvbiIsIm5ld1ZlcnNpb24iLCJtaWdyYXRpb25zIiwiQXJyYXkiLCJtaWdyYXRpb24iLCJjYkVyciIsImxhc3RScSIsImxhc3RFdmVudCIsIiRvcGVuZWQiLCIkbmFtZSIsIiR2ZXJzaW9uIiwiY2F0Y2giLCJycSIsImNsb3NlIiwib3B0aW9ucyIsImNyZWF0ZU9iamVjdFN0b3JlIiwiZGVsZXRlT2JqZWN0U3RvcmUiLCIkX21vZGVscyIsIiRzb2NrZXQiLCJzdG9yZU5hbWVzIiwibW9kZSIsImFyZ3MiLCJ0cmFuc2FjdGlvbiIsImFjdGlvbiIsIiR0cmFuc2FjdGlvbiIsInR4Iiwic3RvcmVzT2JqIiwic3RvcmVzIiwic3RvcmVOYW1lIiwiJHN0b3JlIiwiVHJhbnNhY3Rpb25Nb2RlIiwiUmVhZE9ubHkiLCJSZWFkV3JpdGUiLCJpZGJJbmRleCIsImtleSIsInB1dCIsImFkZCIsImRlbGV0ZSIsImNsZWFyIiwiaW5kZXgiLCJmaWVsZHMiLCJzb3J0Iiwiam9pbiIsImNyZWF0ZUluZGV4IiwiaW5kZXhOYW1lIiwiZGVsZXRlSW5kZXgiLCJ0eXBlIiwiY2FsbGJhY2siLCIkX2xpc3RlbmVycyIsInN0YWNrIiwiaSIsImwiLCJsZW5ndGgiLCJzcGxpY2UiLCIkdW5iaW5kIiwiY2FsbCIsImlkYlF1ZXJ5IiwibGJSZXNvdXJjZSIsIiR0aW1lb3V0IiwiZGVlcEZpZWxkIiwib2JqIiwiZmllbGQiLCJzcGxpdCIsImxhc3RGaWVsZCIsInBvcCIsIl9zZXQiLCJzaGlmdCIsImdldEZpZWxkVmFsdWUiLCJzZXRGaWVsZFZhbHVlIiwiaWRiTW9kZWxGYWN0b3J5Iiwia2V5UGF0aCIsImF1dG9JbmNyZW1lbnQiLCIkaWQiLCIkaW5kZXhlc1RvQ3JlYXRlIiwiJGRiIiwiJGNyZWF0ZVN0b3JlIiwiJGRyb3BTdG9yZSIsIiR3cml0ZXIiLCIkcmVhZGVyIiwiJGdldFZhbHVlcyIsIiRnZXRJbnN0YW5jZSIsIiRzZXRWYWx1ZXMiLCIkc2V0TG9jYWxWYWx1ZXMiLCIkZ2V0S2V5IiwiYXJyIiwiJGdldEtleUZyb20iLCJmaWx0ZXJzIiwidW5kZWZpbmVkIiwiJGluc3RhbmNlcyIsIiRzZXQiLCIkZmllbGRzIiwidmFsdWVzIiwiYnVpbGRDYWxsYmFjayIsImFjdGlvbnMiLCIkX3JlbW90ZSIsIiRfdmFsdWVzIiwibG9jYWwiLCJyZW1vdGUiLCJFcnJvciIsInN1YnNjcmliZSIsIm1vZGVsTmFtZSIsImV2ZW50TmFtZSIsIm1vZGVsSWQiLCIka2V5IiwiJHNldFJlbW90ZVZhbHVlcyIsIm9iamVjdFN0b3JlIiwiYWJvcnQiLCIkY29tcGxldGVkIiwiJHJlc3VsdCIsIiRvcGVuQ3Vyc29yIiwiY3Vyc29yIiwiY29udGludWUiLCJhY2Nlc3NUb2tlbklkIiwiY3VycmVudFVzZXJJZCIsIiRkZWZVcmxTZXJ2ZXIiLCIkZGVmQWNjZXNzVG9rZW5JZCIsIiRkZWZDdXJyZW50VXNlcklkIiwiJGNvbm5lY3QiLCJjb25uZWN0IiwiJHVybCIsIm9uIiwiZW1pdCIsIiRhY2Nlc3NUb2tlbklkIiwidXNlcklkIiwiJGN1cnJlbnRVc2VySWQiLCIkcHVzaExpc3RlbmVyIiwic3Vic2NyaXB0aW9uTmFtZSIsInJlbW92ZUFsbExpc3RlbmVycyIsImlkeCIsImluZGV4T2YiLCIkc2V0VXJsU2VydmVyIiwiJHNldENyZWRlbnRpYWxzIiwibGIiLCJnZXRIb3N0IiwibSIsIm1hdGNoIiwidXJsQmFzZUhvc3QiLCJsb2NhdGlvbiIsImhvc3QiLCJsYkF1dGgiLCJwcm9wcyIsInByb3BzUHJlZml4Iiwic2F2ZSIsInN0b3JhZ2UiLCJlcnIiLCJsb2FkIiwic2Vzc2lvblN0b3JhZ2UiLCJmb3JFYWNoIiwiY3VycmVudFVzZXJEYXRhIiwicmVtZW1iZXJNZSIsInNldFVzZXIiLCJ1c2VyRGF0YSIsImNsZWFyVXNlciIsImNsZWFyU3RvcmFnZSIsImxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciIsIiRxIiwicmVxdWVzdCIsImNvbmZpZyIsImhlYWRlcnMiLCJhdXRoSGVhZGVyIiwiX19pc0dldEN1cnJlbnRVc2VyX18iLCJyZXMiLCJib2R5IiwiZXJyb3IiLCJzdGF0dXMiLCJ3aGVuIiwidXJsQmFzZSIsInNldEF1dGhIZWFkZXIiLCJoZWFkZXIiLCJnZXRBdXRoSGVhZGVyIiwic2V0VXJsQmFzZSIsImdldFVybEJhc2UiLCIkcmVzb3VyY2UiLCJwYXJhbXMiLCJvcmlnaW5hbFVybCIsInJlc291cmNlIiwiJHNhdmUiLCJzdWNjZXNzIiwidXBzZXJ0IiwiZmFjdG9yeSIsInByb3ZpZGVyIiwiJGh0dHBQcm92aWRlciIsImludGVyY2VwdG9ycyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7Ozs7QUFHQTs7QUNHQSxLQUFJLFlBQVksdUJBQXVCOztBREF2Qzs7QUNJQSxLQUFJLGVBQWUsdUJBQXVCOztBREgxQzs7QUNPQSxLQUFJLHFCQUFxQix1QkFBdUI7O0FETmhEOztBQ1VBLEtBQUksa0JBQWtCLHVCQUF1Qjs7QURUN0M7O0FDYUEsS0FBSSxRQUFRLHVCQUF1Qjs7QURabkM7O0FDZ0JBLEtBQUksYUFBYSx1QkFBdUI7O0FEZnhDOztBQ21CQSxLQUFJLGFBQWEsdUJBQXVCOztBRGxCeEM7O0FDc0JBLEtBQUksbUJBQW1CLHVCQUF1Qjs7QURyQjlDOztBQ3lCQSxLQUFJLGFBQWEsdUJBQXVCOztBRHhCeEM7O0FDNEJBLEtBQUksbUJBQW1CLHVCQUF1Qjs7QUQzQjlDOztBQytCQSxLQUFJLGFBQWEsdUJBQXVCOztBRDlCeEM7O0FDa0NBLEtBQUksY0FBYyx1QkFBdUI7O0FEaEN6Qzs7QUNvQ0EsS0FBSSxPQUFPLHVCQUF1Qjs7QUFFbEMsVUFBUyx1QkFBdUIsS0FBSyxFQUFFLE9BQU8sT0FB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QUFPN0osUUFBUXdKOzs7T0FHakI3RyxXQUFXZ0gsZ0JBQWdCLFlBQVc7U0FDcEMsT0FBTzNKLFFBQVFpSjs7O09BR2pCLE9BQU90Rzs7OztHQU1YLE9BQU92TSxPQUNKaVUsUUFBUSxVQUFVeEMsUUFDbEJ5QyxTQUFTLGNBQWMzSCxZQUN2QjBILFFBQVEsNEJBQTRCekIsMEJBQ3BDRyxPQUFPLENBQUMsaUJBQWlCLFVBQVN3QixlQUFlO0tBQUU7O0tBQ2xEQSxjQUFjQyxhQUFhNUwsS0FBSyIsImZpbGUiOiJuZy1pZGIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGU2YmQzMTk0MTU0Y2NlN2NjODk5XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gR2xvYmFsZXNcclxuaW1wb3J0IENsYXp6ZXIgIGZyb20gJy4vQ2xhenplcic7XHJcblxyXG4vLyBTZXJ2aWNlc1xyXG5pbXBvcnQgaWRiUmVxdWVzdCAgICAgICAgIGZyb20gJy4vc2VydmljZXMvaWRiUmVxdWVzdCc7XHJcbmltcG9ydCBpZGJPcGVuREJSZXF1ZXN0ICAgZnJvbSAnLi9zZXJ2aWNlcy9pZGJPcGVuREJSZXF1ZXN0JztcclxuaW1wb3J0IGlkYkNvbnN1bHRhbnQgICAgICBmcm9tICcuL3NlcnZpY2VzL2lkYkNvbnN1bHRhbnQnO1xyXG5pbXBvcnQgaWRiICAgICAgICAgICAgICAgIGZyb20gJy4vc2VydmljZXMvaWRiJztcclxuaW1wb3J0IGlkYlN0b3JlICAgICAgICAgICBmcm9tICcuL3NlcnZpY2VzL2lkYlN0b3JlJztcclxuaW1wb3J0IGlkYkluZGV4ICAgICAgICAgICBmcm9tICcuL3NlcnZpY2VzL2lkYkluZGV4JztcclxuaW1wb3J0IGlkYkV2ZW50VGFyZ2V0ICAgICBmcm9tICcuL3NlcnZpY2VzL2lkYkV2ZW50VGFyZ2V0JztcclxuaW1wb3J0IGlkYk1vZGVsICAgICAgICAgICBmcm9tICcuL3NlcnZpY2VzL2lkYk1vZGVsJztcclxuaW1wb3J0IGlkYlRyYW5zYWN0aW9uICAgICBmcm9tICcuL3NlcnZpY2VzL2lkYlRyYW5zYWN0aW9uJztcclxuaW1wb3J0IGlkYlF1ZXJ5ICAgICAgICAgICBmcm9tICcuL3NlcnZpY2VzL2lkYlF1ZXJ5JztcclxuaW1wb3J0IGlkYlNvY2tldCAgICAgICAgICBmcm9tICcuL3NlcnZpY2VzL2lkYlNvY2tldCc7XHJcblxyXG5pbXBvcnQgbGIgZnJvbSAnLi9sYic7XHJcblxyXG5sYihhbmd1bGFyLm1vZHVsZSgnbmcuaWRiJywgW10pKVxyXG4gIFxyXG4gIC5jb25zdGFudCgnaW8nLCBpbylcclxuICAuc2VydmljZSgnQ2xhenplcicsIENsYXp6ZXIpXHJcblxyXG4gIC5jb25zdGFudCgnaWRiVmVyc2lvbicsICcwLjAuMScpXHJcbiAgXHJcbiAgLnNlcnZpY2UoJ2lkYlJlcXVlc3QnLCBpZGJSZXF1ZXN0KVxyXG4gIC5zZXJ2aWNlKCdpZGJPcGVuREJSZXF1ZXN0JywgaWRiT3BlbkRCUmVxdWVzdClcclxuICAuc2VydmljZSgnaWRiQ29uc3VsdGFudCcsIGlkYkNvbnN1bHRhbnQpXHJcbiAgLnNlcnZpY2UoJ2lkYicsIGlkYilcclxuICAuc2VydmljZSgnaWRiU3RvcmUnLCBpZGJTdG9yZSlcclxuICAuc2VydmljZSgnaWRiSW5kZXgnLCBpZGJJbmRleClcclxuICAuc2VydmljZSgnaWRiRXZlbnRUYXJnZXQnLCBpZGJFdmVudFRhcmdldClcclxuICAuc2VydmljZSgnaWRiTW9kZWwnLCBpZGJNb2RlbClcclxuICAuc2VydmljZSgnaWRiU29ja2V0JywgaWRiU29ja2V0KVxyXG4gIC5zZXJ2aWNlKCdpZGJRdWVyeScsIGlkYlF1ZXJ5KVxyXG4gIC5zZXJ2aWNlKCdpZGJUcmFuc2FjdGlvbicsIGlkYlRyYW5zYWN0aW9uKVxyXG5cclxuICAuc2VydmljZSgnc29ja2V0JywgZnVuY3Rpb24oaWRiU29ja2V0LCBBUElfUk9PVCkgeyAnbmdJbmplY3QnXHJcbiAgXHJcbiAgICByZXR1cm4gbmV3IGlkYlNvY2tldChcclxuICAgICAgJ2h0dHA6Ly9sb2NhbGhvc3Q6MzIwMC8nLFxyXG4gICAgICBsb2NhbFN0b3JhZ2VbJyRMb29wQmFjayRhY2Nlc3NUb2tlbklkJ10sXHJcbiAgICAgIGxvY2FsU3RvcmFnZVsnJExvb3BCYWNrJGN1cnJlbnRVc2VySWQnXVxyXG4gICAgKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLnNlcnZpY2UoJ2RiJywgZnVuY3Rpb24gKGlkYiwgc29ja2V0KSB7ICduZ0luamVjdCc7XHJcblxyXG4gICAgY29uc3QgZGIgPSBuZXcgaWRiKCdhYWEnLCA0LCBzb2NrZXQpXHJcblxyXG4gICAgZGJcclxuICAgICAgLiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKFsnJG9wZW5lZCddKTsgfSlcclxuICAgICAgLiRhYm9ydGVkKGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coWyckYWJvcnRlZCddKTsgfSlcclxuICAgICAgLiRjbG9zZWQoZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZyhbJyRjbG9zZWQnXSk7IH0pXHJcbiAgICAgIC4kZXJyb3IoZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZyhbJyRlcnJvciddKTsgfSlcclxuICAgICAgLiR2ZXJzaW9uQ2hhbmdlZChmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKFsnJHZlcnNpb25DaGFuZ2VkJ10pOyB9KVxyXG5cclxuICAgICAgLiRhdXRvbWlncmF0aW9uKHtcclxuICAgICAgICAxOiBmdW5jdGlvbiAoZGIpIHtcclxuICAgICAgICAgIGRiLiRtb2RlbCgnVHJhYmFqYWRvcicpXHJcbiAgICAgICAgICAgIC4kY3JlYXRlKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIDI6IGZ1bmN0aW9uIChkYikge1xyXG4gICAgICAgICAgZGIuJG1vZGVsKCdFbXBsZWFkbycpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAuJGFkZEluZGV4KFsnbm9tYnJlcycsICdhcGVsbGlkb3MnXSlcclxuICAgICAgICAgICAgLiRhZGRJbmRleCgnbmFjaW1pZW50bycpXHJcblxyXG4gICAgICAgICAgICAuJGNyZWF0ZShmdW5jdGlvbiAobW9kZWwsIHN0b3JlKSB7XHJcblxyXG4gICAgICAgICAgICAgIHN0b3JlLiRjcmVhdGVJbmRleCgnY2knKTtcclxuICAgICAgICAgICAgICBzdG9yZS4kY3JlYXRlSW5kZXgoJ2NvZCcpO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIDM6IGZ1bmN0aW9uIChkYikge1xyXG4gICAgICAgICAgZGIuJG1vZGVsKCdUcmFiYWphZG9yJylcclxuICAgICAgICAgICAgLiRkcm9wKClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAuJGRyb3AoKS50aGVuKGZ1bmN0aW9uIChkYikge1xyXG4gICAgICAgIGRiLiRvcGVuKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkYjtcclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIC5zZXJ2aWNlKCdFbXBsZWFkbycsIGZ1bmN0aW9uIChkYikgeyAnbmdJbmplY3QnO1xyXG4gICAgcmV0dXJuIHdpbmRvdy5FbXBsZWFkbyA9IGRiLiRtb2RlbCgnRW1wbGVhZG8nKVxyXG4gICAgICAuJGZpZWxkKCdjb2QnLCAgICAgICAgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pXHJcbiAgICAgIC4kZmllbGQoJ2NpJywgICAgICAgICB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSlcclxuICAgICAgLiRmaWVsZCgnbm9tYnJlcycsICAgIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KVxyXG4gICAgICAuJGZpZWxkKCdhcGVsbGlkb3MnLCAgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pXHJcbiAgICAgIC4kZmllbGQoJ25hY2ltaWVudG8nLCB7IFwidHlwZVwiOiBcImRhdGVcIiB9KVxyXG4gICAgICAuJGZpZWxkKCdpbmdyZXNvJywgICAgeyBcInR5cGVcIjogXCJkYXRlXCIgfSlcclxuICAgICAgLiRmaWVsZCgnZGlyZWNjaW9uJywgIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCJ9KVxyXG4gICAgICAuJHJlbW90ZShcclxuICAgICAgICAnL3RyYWJhamFkb3Jlcy86aWQnLFxyXG4gICAgICAgIHsgJ2lkJzogJ0BpZCcgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAnZmluZCc6ICAgeyB1cmw6ICcvdHJhYmFqYWRvcmVzL19maW5kV2l0aFZlcnNpb24nLCBtZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlLCB9LFxyXG4gICAgICAgICAgLy8gJ2NyZWF0ZSc6IHsgdXJsOiAnL3RyYWJhamFkb3JlcycsIG1ldGhvZDogJ1BPU1QnLCB9LFxyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgICAvLyAudmVyc2lvbmluZygpXHJcbiAgICAgIC4kYnVpbGQoZnVuY3Rpb24gKEVtcGxlYWRvKSB7XHJcblxyXG4gICAgICAgIEVtcGxlYWRvLnByb3RvdHlwZS4kY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBFbXBsZWFkby5wcm90b3R5cGUuZ2V0Tm9tYnJlID0gZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5ub21icmVzICsgJyAnICsgdGhpcy5hcGVsbGlkb3M7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG4gIH0pXHJcblxyXG4ucnVuKGZ1bmN0aW9uIChkYiwgRW1wbGVhZG8pIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgRW1wbGVhZG8uJHB1dCh7XHJcbiAgICBpZDogMSxcclxuICAgICdub21icmVzJzogJ0FsZXhhbmRlcidcclxuICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcclxuICAgIC8vXHJcbiAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XHJcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gRW1wbGVhZG8uJHB1dCh7XHJcbiAgICAgIGlkOiAyLFxyXG4gICAgICAnbm9tYnJlcyc6ICdHdWlsbGVtbydcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XHJcbiAgICB9KTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBFbXBsZWFkby4kcHV0KHtcclxuICAgICAgaWQ6IDIsXHJcbiAgICAgICdhcGVsbGlkb3MnOiAnU2VtaW5hcmlvJ1xyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFsncHV0JywgcmVjb3JkLm5vbWJyZXNdKTtcclxuICAgIH0pO1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIEVtcGxlYWRvLiRwdXQoe1xyXG4gICAgICBpZDogNCxcclxuICAgICAgJ25vbWJyZXMnOiAnQXhlbCdcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XHJcbiAgICB9KTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBFbXBsZWFkby4kcHV0KHtcclxuICAgICAgJ25vbWJyZXMnOiAnR2FicmllbCdcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XHJcbiAgICB9KTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBFbXBsZWFkby4kYWRkKHtcclxuICAgICAgJ25vbWJyZXMnOiAnRXZlcnQnXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcclxuICAgICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xyXG4gICAgfSk7XHJcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCByID0gRW1wbGVhZG8uJGdldCgyKTtcclxuICAgIGNvbnNvbGUubG9nKFsnZ2V0Jywgcl0pXHJcbiAgICByZXR1cm4gci4kcHJvbWlzZTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHIgPSBFbXBsZWFkby4kZmluZCgpLiRnZXRSZXN1bHQoKTtcclxuICAgIGNvbnNvbGUubG9nKFsnZmluZCcsIHJdKTtcclxuICAgIHJldHVybiByLiRwcm9taXNlO1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgciA9IEVtcGxlYWRvLiRnZXRBbGwoKTtcclxuICAgIGNvbnNvbGUubG9nKFsnZ2V0QWxsJywgcl0pO1xyXG4gICAgcmV0dXJuIHIuJHByb21pc2U7XHJcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gRW1wbGVhZG8uJGNvdW50KCkudGhlbihmdW5jdGlvbiAoY291bnQpIHtcclxuICAgICAgY29uc29sZS5sb2coWydjb3VudCcsIGNvdW50XSk7XHJcbiAgICB9KTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHIgPSBFbXBsZWFkby4kZ2V0QWxsS2V5cygpO1xyXG4gICAgY29uc29sZS5sb2coWydnZXRBbGxLZXlzJywgcl0pO1xyXG4gICAgcmV0dXJuIHIuJHByb21pc2U7XHJcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gRW1wbGVhZG8uJGRlbGV0ZSgyKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc29sZS5sb2coWydkZWxldGUnXSk7XHJcbiAgICB9KTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBFbXBsZWFkby4kY291bnQoKS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhbJ2NvdW50JywgY291bnRdKTtcclxuICAgIH0pO1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIEVtcGxlYWRvLiRjbGVhcigpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhbJ2NsZWFyJ10pO1xyXG4gICAgfSk7XHJcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gRW1wbGVhZG8uJGNvdW50KCkudGhlbihmdW5jdGlvbiAoY291bnQpIHtcclxuICAgICAgY29uc29sZS5sb2coWydjb3VudCcsIGNvdW50XSk7XHJcbiAgICB9KTtcclxuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgIGRiLiRjbG9zZSgpO1xyXG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgZGIuJG9wZW4oKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgZGIuJGNsb3NlKCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbn0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gR2xvYmFsZXNcblxudmFyIF9DbGF6emVyID0gcmVxdWlyZSgnLi9DbGF6emVyJyk7XG5cbnZhciBfQ2xhenplcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9DbGF6emVyKTtcblxudmFyIF9pZGJSZXF1ZXN0ID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJSZXF1ZXN0Jyk7XG5cbnZhciBfaWRiUmVxdWVzdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJSZXF1ZXN0KTtcblxudmFyIF9pZGJPcGVuREJSZXF1ZXN0ID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJPcGVuREJSZXF1ZXN0Jyk7XG5cbnZhciBfaWRiT3BlbkRCUmVxdWVzdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJPcGVuREJSZXF1ZXN0KTtcblxudmFyIF9pZGJDb25zdWx0YW50ID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJDb25zdWx0YW50Jyk7XG5cbnZhciBfaWRiQ29uc3VsdGFudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJDb25zdWx0YW50KTtcblxudmFyIF9pZGIgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYicpO1xuXG52YXIgX2lkYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGIpO1xuXG52YXIgX2lkYlN0b3JlID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJTdG9yZScpO1xuXG52YXIgX2lkYlN0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlN0b3JlKTtcblxudmFyIF9pZGJJbmRleCA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiSW5kZXgnKTtcblxudmFyIF9pZGJJbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJJbmRleCk7XG5cbnZhciBfaWRiRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYkV2ZW50VGFyZ2V0Jyk7XG5cbnZhciBfaWRiRXZlbnRUYXJnZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiRXZlbnRUYXJnZXQpO1xuXG52YXIgX2lkYk1vZGVsID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJNb2RlbCcpO1xuXG52YXIgX2lkYk1vZGVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYk1vZGVsKTtcblxudmFyIF9pZGJUcmFuc2FjdGlvbiA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiVHJhbnNhY3Rpb24nKTtcblxudmFyIF9pZGJUcmFuc2FjdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJUcmFuc2FjdGlvbik7XG5cbnZhciBfaWRiUXVlcnkgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYlF1ZXJ5Jyk7XG5cbnZhciBfaWRiUXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiUXVlcnkpO1xuXG52YXIgX2lkYlNvY2tldCA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiU29ja2V0Jyk7XG5cbnZhciBfaWRiU29ja2V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlNvY2tldCk7XG5cbnZhciBfbGIgPSByZXF1aXJlKCcuL2xiJyk7XG5cbnZhciBfbGIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vLyBTZXJ2aWNlc1xuKDAsIF9sYjIuZGVmYXVsdCkoYW5ndWxhci5tb2R1bGUoJ25nLmlkYicsIFtdKSkuY29uc3RhbnQoJ2lvJywgaW8pLnNlcnZpY2UoJ0NsYXp6ZXInLCBfQ2xhenplcjIuZGVmYXVsdCkuY29uc3RhbnQoJ2lkYlZlcnNpb24nLCAnMC4wLjEnKS5zZXJ2aWNlKCdpZGJSZXF1ZXN0JywgX2lkYlJlcXVlc3QyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYk9wZW5EQlJlcXVlc3QnLCBfaWRiT3BlbkRCUmVxdWVzdDIuZGVmYXVsdCkuc2VydmljZSgnaWRiQ29uc3VsdGFudCcsIF9pZGJDb25zdWx0YW50Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGInLCBfaWRiMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJTdG9yZScsIF9pZGJTdG9yZTIuZGVmYXVsdCkuc2VydmljZSgnaWRiSW5kZXgnLCBfaWRiSW5kZXgyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYkV2ZW50VGFyZ2V0JywgX2lkYkV2ZW50VGFyZ2V0Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJNb2RlbCcsIF9pZGJNb2RlbDIuZGVmYXVsdCkuc2VydmljZSgnaWRiU29ja2V0JywgX2lkYlNvY2tldDIuZGVmYXVsdCkuc2VydmljZSgnaWRiUXVlcnknLCBfaWRiUXVlcnkyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlRyYW5zYWN0aW9uJywgX2lkYlRyYW5zYWN0aW9uMi5kZWZhdWx0KS5zZXJ2aWNlKCdzb2NrZXQnLCBmdW5jdGlvbiAoaWRiU29ja2V0LCBBUElfUk9PVCkge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBuZXcgaWRiU29ja2V0KCdodHRwOi8vbG9jYWxob3N0OjMyMDAvJywgbG9jYWxTdG9yYWdlWyckTG9vcEJhY2skYWNjZXNzVG9rZW5JZCddLCBsb2NhbFN0b3JhZ2VbJyRMb29wQmFjayRjdXJyZW50VXNlcklkJ10pO1xufSkuc2VydmljZSgnZGInLCBmdW5jdGlvbiAoaWRiLCBzb2NrZXQpIHtcbiAgJ25nSW5qZWN0JztcblxuICB2YXIgZGIgPSBuZXcgaWRiKCdhYWEnLCA0LCBzb2NrZXQpO1xuXG4gIGRiLiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coWyckb3BlbmVkJ10pO1xuICB9KS4kYWJvcnRlZChmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coWyckYWJvcnRlZCddKTtcbiAgfSkuJGNsb3NlZChmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coWyckY2xvc2VkJ10pO1xuICB9KS4kZXJyb3IoZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFsnJGVycm9yJ10pO1xuICB9KS4kdmVyc2lvbkNoYW5nZWQoZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFsnJHZlcnNpb25DaGFuZ2VkJ10pO1xuICB9KS4kYXV0b21pZ3JhdGlvbih7XG4gICAgMTogZnVuY3Rpb24gXyhkYikge1xuICAgICAgZGIuJG1vZGVsKCdUcmFiYWphZG9yJykuJGNyZWF0ZSgpO1xuICAgIH0sXG4gICAgMjogZnVuY3Rpb24gXyhkYikge1xuICAgICAgZGIuJG1vZGVsKCdFbXBsZWFkbycpLiRhZGRJbmRleChbJ25vbWJyZXMnLCAnYXBlbGxpZG9zJ10pLiRhZGRJbmRleCgnbmFjaW1pZW50bycpLiRjcmVhdGUoZnVuY3Rpb24gKG1vZGVsLCBzdG9yZSkge1xuXG4gICAgICAgIHN0b3JlLiRjcmVhdGVJbmRleCgnY2knKTtcbiAgICAgICAgc3RvcmUuJGNyZWF0ZUluZGV4KCdjb2QnKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgMzogZnVuY3Rpb24gXyhkYikge1xuICAgICAgZGIuJG1vZGVsKCdUcmFiYWphZG9yJykuJGRyb3AoKTtcbiAgICB9XG4gIH0pLiRkcm9wKCkudGhlbihmdW5jdGlvbiAoZGIpIHtcbiAgICBkYi4kb3BlbigpO1xuICB9KTtcblxuICByZXR1cm4gZGI7XG59KS5zZXJ2aWNlKCdFbXBsZWFkbycsIGZ1bmN0aW9uIChkYikge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiB3aW5kb3cuRW1wbGVhZG8gPSBkYi4kbW9kZWwoJ0VtcGxlYWRvJykuJGZpZWxkKCdjb2QnLCB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSkuJGZpZWxkKCdjaScsIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KS4kZmllbGQoJ25vbWJyZXMnLCB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSkuJGZpZWxkKCdhcGVsbGlkb3MnLCB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSkuJGZpZWxkKCduYWNpbWllbnRvJywgeyBcInR5cGVcIjogXCJkYXRlXCIgfSkuJGZpZWxkKCdpbmdyZXNvJywgeyBcInR5cGVcIjogXCJkYXRlXCIgfSkuJGZpZWxkKCdkaXJlY2Npb24nLCB7IFwidHlwZVwiOiBcInN0cmluZ1wiIH0pLiRyZW1vdGUoJy90cmFiYWphZG9yZXMvOmlkJywgeyAnaWQnOiAnQGlkJyB9LCB7XG4gICAgJ2ZpbmQnOiB7IHVybDogJy90cmFiYWphZG9yZXMvX2ZpbmRXaXRoVmVyc2lvbicsIG1ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWUgfVxuICB9KVxuICAvLyAudmVyc2lvbmluZygpXG4gIC4kYnVpbGQoZnVuY3Rpb24gKEVtcGxlYWRvKSB7XG5cbiAgICBFbXBsZWFkby5wcm90b3R5cGUuJGNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKGRhdGEpIHt9O1xuXG4gICAgRW1wbGVhZG8ucHJvdG90eXBlLmdldE5vbWJyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vbWJyZXMgKyAnICcgKyB0aGlzLmFwZWxsaWRvcztcbiAgICB9O1xuICB9KTtcbn0pLnJ1bihmdW5jdGlvbiAoZGIsIEVtcGxlYWRvKSB7XG4gICduZ0luamVjdCc7XG5cbiAgRW1wbGVhZG8uJHB1dCh7XG4gICAgaWQ6IDEsXG4gICAgJ25vbWJyZXMnOiAnQWxleGFuZGVyJ1xuICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcbiAgICAvL1xuICAgIGNvbnNvbGUubG9nKFsncHV0JywgcmVjb3JkLm5vbWJyZXNdKTtcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEVtcGxlYWRvLiRwdXQoe1xuICAgICAgaWQ6IDIsXG4gICAgICAnbm9tYnJlcyc6ICdHdWlsbGVtbydcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFsncHV0JywgcmVjb3JkLm5vbWJyZXNdKTtcbiAgICB9KTtcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEVtcGxlYWRvLiRwdXQoe1xuICAgICAgaWQ6IDIsXG4gICAgICAnYXBlbGxpZG9zJzogJ1NlbWluYXJpbydcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFsncHV0JywgcmVjb3JkLm5vbWJyZXNdKTtcbiAgICB9KTtcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEVtcGxlYWRvLiRwdXQoe1xuICAgICAgaWQ6IDQsXG4gICAgICAnbm9tYnJlcyc6ICdBeGVsJ1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xuICAgICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xuICAgIH0pO1xuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gRW1wbGVhZG8uJHB1dCh7XG4gICAgICAnbm9tYnJlcyc6ICdHYWJyaWVsJ1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xuICAgICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xuICAgIH0pO1xuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gRW1wbGVhZG8uJGFkZCh7XG4gICAgICAnbm9tYnJlcyc6ICdFdmVydCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFsncHV0JywgcmVjb3JkLm5vbWJyZXNdKTtcbiAgICB9KTtcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHIgPSBFbXBsZWFkby4kZ2V0KDIpO1xuICAgIGNvbnNvbGUubG9nKFsnZ2V0Jywgcl0pO1xuICAgIHJldHVybiByLiRwcm9taXNlO1xuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgciA9IEVtcGxlYWRvLiRmaW5kKCkuJGdldFJlc3VsdCgpO1xuICAgIGNvbnNvbGUubG9nKFsnZmluZCcsIHJdKTtcbiAgICByZXR1cm4gci4kcHJvbWlzZTtcbiAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHIgPSBFbXBsZWFkby4kZ2V0QWxsKCk7XG4gICAgY29uc29sZS5sb2coWydnZXRBbGwnLCByXSk7XG4gICAgcmV0dXJuIHIuJHByb21pc2U7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBFbXBsZWFkby4kY291bnQoKS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xuICAgICAgY29uc29sZS5sb2coWydjb3VudCcsIGNvdW50XSk7XG4gICAgfSk7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHZhciByID0gRW1wbGVhZG8uJGdldEFsbEtleXMoKTtcbiAgICBjb25zb2xlLmxvZyhbJ2dldEFsbEtleXMnLCByXSk7XG4gICAgcmV0dXJuIHIuJHByb21pc2U7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBFbXBsZWFkby4kZGVsZXRlKDIpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgY29uc29sZS5sb2coWydkZWxldGUnXSk7XG4gICAgfSk7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBFbXBsZWFkby4kY291bnQoKS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xuICAgICAgY29uc29sZS5sb2coWydjb3VudCcsIGNvdW50XSk7XG4gICAgfSk7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBFbXBsZWFkby4kY2xlYXIoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFsnY2xlYXInXSk7XG4gICAgfSk7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBFbXBsZWFkby4kY291bnQoKS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xuICAgICAgY29uc29sZS5sb2coWydjb3VudCcsIGNvdW50XSk7XG4gICAgfSk7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIGRiLiRjbG9zZSgpO1xuICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICBkYi4kb3BlbigpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgZGIuJGNsb3NlKCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogQ2xhenplclxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBmdW5jdGlvbiBDbGF6emVyIChjb25zdHJ1Y3Rvcikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjbGF6eicsIHsgdmFsdWU6IGNvbnN0cnVjdG9yIHx8IGZ1bmN0aW9uICgpIHt9IH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnaW5oZXJpdCcsIHtcclxuICAgIHZhbHVlOiBmdW5jdGlvbiAocGFyZW50KSB7XHJcbiAgICAgIGxldCB0bXAgPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgICB0bXAucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTtcclxuICAgICAgdGhpcy5jbGF6ei5wcm90b3R5cGUgPSBuZXcgdG1wKCk7XHJcbiAgICAgIHRoaXMuY2xhenoucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gdGhpcy5jbGF6ejtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3N0YXRpYycsIHtcclxuICAgIHZhbHVlOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuY2xhenosIG5hbWUsIHtcclxuICAgICAgICB2YWx1ZTogdmFsdWVcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdwcm9wZXJ0eScsIHtcclxuICAgIHZhbHVlOiBmdW5jdGlvbiAobmFtZSwgb3B0cykge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jbGF6ei5wcm90b3R5cGUsIG5hbWUsIG9wdHMpO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnbWV0aG9kJywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChuYW1lLCBmdW5jKSB7XHJcbiAgICAgIHRoaXMucHJvcGVydHkobmFtZSwge1xyXG4gICAgICAgIHZhbHVlOiBmdW5jXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnZ2V0dGVyJywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChmcm9tLCB0bykge1xyXG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XHJcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuJG1lW3RvXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnc2V0dGVyJywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChmcm9tLCB0bykge1xyXG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XHJcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICB0aGlzLiRtZVt0b10gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnaGFuZGxlckV2ZW50Jywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChmcm9tLCB0bykge1xyXG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XHJcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xyXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAgIHRoaXMuJG1lW3RvXSA9IGNiO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIHJldHVybiBDbGF6emVyO1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0NsYXp6ZXIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBDbGF6emVyXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuXG4gIGZ1bmN0aW9uIENsYXp6ZXIoY29uc3RydWN0b3IpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NsYXp6JywgeyB2YWx1ZTogY29uc3RydWN0b3IgfHwgZnVuY3Rpb24gKCkge30gfSk7XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnaW5oZXJpdCcsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUocGFyZW50KSB7XG4gICAgICB2YXIgdG1wID0gZnVuY3Rpb24gdG1wKCkge307XG4gICAgICB0bXAucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTtcbiAgICAgIHRoaXMuY2xhenoucHJvdG90eXBlID0gbmV3IHRtcCgpO1xuICAgICAgdGhpcy5jbGF6ei5wcm90b3R5cGUuY29uc3RydWN0b3IgPSB0aGlzLmNsYXp6O1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnc3RhdGljJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShuYW1lLCBfdmFsdWUpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmNsYXp6LCBuYW1lLCB7XG4gICAgICAgIHZhbHVlOiBfdmFsdWVcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAncHJvcGVydHknLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKG5hbWUsIG9wdHMpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmNsYXp6LnByb3RvdHlwZSwgbmFtZSwgb3B0cyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdtZXRob2QnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKG5hbWUsIGZ1bmMpIHtcbiAgICAgIHRoaXMucHJvcGVydHkobmFtZSwge1xuICAgICAgICB2YWx1ZTogZnVuY1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdnZXR0ZXInLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGZyb20sIHRvKSB7XG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XG4gICAgICB0aGlzLnByb3BlcnR5KGZyb20sIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuJG1lW3RvXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdzZXR0ZXInLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGZyb20sIHRvKSB7XG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XG4gICAgICB0aGlzLnByb3BlcnR5KGZyb20sIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgICAgICB0aGlzLiRtZVt0b10gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdoYW5kbGVyRXZlbnQnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGZyb20sIHRvKSB7XG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XG4gICAgICB0aGlzLnByb3BlcnR5KGZyb20sIHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGNiKSB7XG4gICAgICAgICAgdGhpcy4kbWVbdG9dID0gY2I7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgcmV0dXJuIENsYXp6ZXI7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0NsYXp6ZXIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiUmVxdWVzdFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJSZXF1ZXN0IDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBhbnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0O1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01FeGNlcHRpb24/ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIChJREJPYmplY3RTdG9yZSBvciBJREJJbmRleCBvciBJREJDdXJzb3IpPyBzb3VyY2U7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uPyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCUmVxdWVzdFJlYWR5U3RhdGUgICAgICAgICAgICAgICAgICAgICAgIHJlYWR5U3RhdGU7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25zdWNjZXNzO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogfTtcclxuICpcclxuICogZW51bSBJREJSZXF1ZXN0UmVhZHlTdGF0ZSB7XHJcbiAqICAgXCJwZW5kaW5nXCIsXHJcbiAqICAgXCJkb25lXCJcclxuICogfTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyKSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcclxuICAvLyAkX3Byb21pc2VcclxuXHJcbiAgY29uc3QgUmVhZHlTdGF0ZSA9IG5ldyBDbGF6emVyKHt9KVxyXG4gICAgICAgIC5zdGF0aWMoJ1BlbmRpbmcnLCAgJ3BlbmRpbmcnKVxyXG4gICAgICAgIC5zdGF0aWMoJ0RvbmUnLCAgICAgJ2RvbmUnKTtcclxuICBcclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlJlcXVlc3QgKG1lKSB7XHJcblxyXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFN0YXRpY3NcclxuICAuc3RhdGljKCdSZWFkeVN0YXRlJywgUmVhZHlTdGF0ZS5jbGF6eilcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gR2V0dGVyc1xyXG4gIC5nZXR0ZXIoJyRyZXN1bHQnLCAncmVzdWx0JylcclxuICAuZ2V0dGVyKCckZXJyb3InLCAnZXJyb3InKVxyXG4gIC5nZXR0ZXIoJyRzb3VyY2UnLCAnc291cmNlJylcclxuICAuZ2V0dGVyKCckcmVhZHlTdGF0ZScsICdyZWFkeVN0YXRlJylcclxuICAuZ2V0dGVyKCckdHJhbnNhY3Rpb24nLCAndHJhbnNhY3Rpb24nKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gIC5oYW5kbGVyRXZlbnQoJyRzdWNjZXNzJywgJ29uc3VjY2VzcycpXHJcbiAgLmhhbmRsZXJFdmVudCgnJGZhaWxlZCcsICAnb25lcnJvcicpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByb3BlcnR5XHJcbiAgLnByb3BlcnR5KCckcHJvbWlzZScsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWYgKHRoaXouJF9wcm9taXNlKSByZXR1cm4gdGhpei4kX3Byb21pc2U7XHJcblxyXG4gICAgICAvLyBDcmVhciBwcm9taXNlIHBhcmEgZWwgcmVxdWVzdFxyXG4gICAgICB0aGl6LiRfcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0aGl6LiRzdWNjZXNzKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVzb2x2ZShldmVudCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuJGZhaWxlZChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlamVjdChldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbmV3IENsYXp6ZXIodGhpei4kX3Byb21pc2UpLnN0YXRpYygnJHJlcXVlc3QnLCB0aGl6ICk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpei4kX3Byb21pc2U7XHJcblxyXG4gICAgfVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiUmVxdWVzdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYlJlcXVlc3RcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCUmVxdWVzdCA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NRXhjZXB0aW9uPyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSAoSURCT2JqZWN0U3RvcmUgb3IgSURCSW5kZXggb3IgSURCQ3Vyc29yKT8gc291cmNlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbj8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlJlcXVlc3RSZWFkeVN0YXRlICAgICAgICAgICAgICAgICAgICAgICByZWFkeVN0YXRlO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uc3VjY2VzcztcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uZXJyb3I7XHJcbiAqIH07XHJcbiAqXHJcbiAqIGVudW0gSURCUmVxdWVzdFJlYWR5U3RhdGUge1xyXG4gKiAgIFwicGVuZGluZ1wiLFxyXG4gKiAgIFwiZG9uZVwiXHJcbiAqIH07XHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplcikge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxuICAvLyAkX3Byb21pc2VcblxuICB2YXIgUmVhZHlTdGF0ZSA9IG5ldyBDbGF6emVyKHt9KS5zdGF0aWMoJ1BlbmRpbmcnLCAncGVuZGluZycpLnN0YXRpYygnRG9uZScsICdkb25lJyk7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJSZXF1ZXN0KG1lKSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFN0YXRpY3NcbiAgLnN0YXRpYygnUmVhZHlTdGF0ZScsIFJlYWR5U3RhdGUuY2xhenopXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdldHRlcnNcbiAgLmdldHRlcignJHJlc3VsdCcsICdyZXN1bHQnKS5nZXR0ZXIoJyRlcnJvcicsICdlcnJvcicpLmdldHRlcignJHNvdXJjZScsICdzb3VyY2UnKS5nZXR0ZXIoJyRyZWFkeVN0YXRlJywgJ3JlYWR5U3RhdGUnKS5nZXR0ZXIoJyR0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGhhbmRsZXJzXG4gIC5oYW5kbGVyRXZlbnQoJyRzdWNjZXNzJywgJ29uc3VjY2VzcycpLmhhbmRsZXJFdmVudCgnJGZhaWxlZCcsICdvbmVycm9yJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUHJvcGVydHlcbiAgLnByb3BlcnR5KCckcHJvbWlzZScsIHtcblxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgaWYgKHRoaXouJF9wcm9taXNlKSByZXR1cm4gdGhpei4kX3Byb21pc2U7XG5cbiAgICAgIC8vIENyZWFyIHByb21pc2UgcGFyYSBlbCByZXF1ZXN0XG4gICAgICB0aGl6LiRfcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdGhpei4kc3VjY2VzcyhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZXNvbHZlKGV2ZW50KTtcbiAgICAgICAgfSkuJGZhaWxlZChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBuZXcgQ2xhenplcih0aGl6LiRfcHJvbWlzZSkuc3RhdGljKCckcmVxdWVzdCcsIHRoaXopO1xuXG4gICAgICByZXR1cm4gdGhpei4kX3Byb21pc2U7XG4gICAgfVxuXG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiUmVxdWVzdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJPcGVuREJSZXF1ZXN0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQk9wZW5EQlJlcXVlc3QgOiBJREJSZXF1ZXN0IHtcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYmxvY2tlZDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9udXBncmFkZW5lZWRlZDtcclxuICogfTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJSZXF1ZXN0KSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJPcGVuREJSZXF1ZXN0IChtZSkge1xyXG4gICAgaWRiUmVxdWVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyAvLyBMbGFtYXIgYWwgY29uc3RydWN0b3MgZGVsIHBhZHJlXHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoaWRiUmVxdWVzdClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRXZlbnQgaGFuZGxlcnNcclxuICAuaGFuZGxlckV2ZW50KCckYmxvY2tlZCcsICdvbmJsb2NrZWQnKVxyXG4gIC5oYW5kbGVyRXZlbnQoJyR1cGdyYWRlbmVlZGVkJywgJ29udXBncmFkZW5lZWRlZCcpXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYk9wZW5EQlJlcXVlc3QuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJPcGVuREJSZXF1ZXN0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQk9wZW5EQlJlcXVlc3QgOiBJREJSZXF1ZXN0IHtcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYmxvY2tlZDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9udXBncmFkZW5lZWRlZDtcclxuICogfTtcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJSZXF1ZXN0KSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJPcGVuREJSZXF1ZXN0KG1lKSB7XG4gICAgaWRiUmVxdWVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyAvLyBMbGFtYXIgYWwgY29uc3RydWN0b3MgZGVsIHBhZHJlXG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KGlkYlJlcXVlc3QpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGhhbmRsZXJzXG4gIC5oYW5kbGVyRXZlbnQoJyRibG9ja2VkJywgJ29uYmxvY2tlZCcpLmhhbmRsZXJFdmVudCgnJHVwZ3JhZGVuZWVkZWQnLCAnb251cGdyYWRlbmVlZGVkJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJPcGVuREJSZXF1ZXN0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYkNvbnN1bHRhbnRcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCSW5kZXgvSURCU3RvcmUge1xyXG4gKiAgICAgICAgICAgIGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICBuYW1lO1xyXG4gKiBcclxuICogICBJREJSZXF1ZXN0IGdldChhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0S2V5KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGwob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbEtleXMob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGNvdW50KG9wdGlvbmFsIGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuQ3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5LZXlDdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiB9O1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkNvbnN1bHRhbnQgKG1lKSB7XHJcblxyXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XHJcblxyXG4gIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gR2V0dGVyc1xyXG4gIC5nZXR0ZXIoJyRuYW1lJywgJ25hbWUnKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZ2V0JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldC5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSlcclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldEtleScsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRLZXkuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpXHJcbiAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRnZXRBbGwnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldEFsbC5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSlcclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldEFsbEtleXMnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0QWxsS2V5cy5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSlcclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNvdW50JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNvdW50LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckb3BlbkN1cnNvcicsIGZ1bmN0aW9uIChxdWVyeSwgZGlyZWN0aW9uKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLm9wZW5DdXJzb3IuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckb3BlbktleUN1cnNvcicsIGZ1bmN0aW9uIChxdWVyeSwgZGlyZWN0aW9uKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLm9wZW5LZXlDdXJzb3IuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiQ29uc3VsdGFudC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYkNvbnN1bHRhbnRcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCSW5kZXgvSURCU3RvcmUge1xyXG4gKiAgICAgICAgICAgIGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICBuYW1lO1xyXG4gKiBcclxuICogICBJREJSZXF1ZXN0IGdldChhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0S2V5KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGwob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbEtleXMob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGNvdW50KG9wdGlvbmFsIGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuQ3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5LZXlDdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiB9O1xyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkNvbnN1bHRhbnQobWUpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRuYW1lJywgJ25hbWUnKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZ2V0JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRnZXRLZXknLCBmdW5jdGlvbiAocXVlcnkpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRLZXkuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGdldEFsbCcsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRBbGwuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGdldEFsbEtleXMnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldEFsbEtleXMuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGNvdW50JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuY291bnQuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJG9wZW5DdXJzb3InLCBmdW5jdGlvbiAocXVlcnksIGRpcmVjdGlvbikge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLm9wZW5DdXJzb3IuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckb3BlbktleUN1cnNvcicsIGZ1bmN0aW9uIChxdWVyeSwgZGlyZWN0aW9uKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUub3BlbktleUN1cnNvci5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiQ29uc3VsdGFudC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCRmFjdG9yeSB7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBvcGVuKERPTVN0cmluZyBuYW1lLCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGxvbmcgdmVyc2lvbik7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBkZWxldGVEYXRhYmFzZShET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgc2hvcnQgY21wKGFueSBmaXJzdCwgYW55IHNlY29uZCk7XHJcbiAqIH07XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkRhdGFiYXNlIDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgdW5zaWduZWQgbG9uZyBsb25nIHZlcnNpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgICAgICBvYmplY3RTdG9yZU5hbWVzO1xyXG4gKiBcclxuICogICBJREJUcmFuc2FjdGlvbiB0cmFuc2FjdGlvbigoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pIHN0b3JlTmFtZXMsIG9wdGlvbmFsIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlID0gXCJyZWFkb25seVwiKTtcclxuICogICB2b2lkICAgICAgICAgICBjbG9zZSgpO1xyXG4gKiAgIElEQk9iamVjdFN0b3JlIGNyZWF0ZU9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lLCBvcHRpb25hbCBJREJPYmplY3RTdG9yZVBhcmFtZXRlcnMgb3B0aW9ucyk7XHJcbiAqICAgdm9pZCAgICAgICAgICAgZGVsZXRlT2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYWJvcnQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmNsb3NlO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9udmVyc2lvbmNoYW5nZTtcclxuICogfTtcclxuICogXHJcbiAqIGRpY3Rpb25hcnkgSURCT2JqZWN0U3RvcmVQYXJhbWV0ZXJzIHtcclxuICogICAoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pPyBrZXlQYXRoID0gbnVsbDtcclxuICogICBib29sZWFuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvSW5jcmVtZW50ID0gZmFsc2U7XHJcbiAqIH07bWVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJFdmVudFRhcmdldCwgaWRiU3RvcmUsIGlkYk1vZGVsLCBpZGJPcGVuREJSZXF1ZXN0LCBpZGJUcmFuc2FjdGlvbiwgJGxvZykgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cclxuICBjb25zdCBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XHJcbiAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxyXG4gIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxyXG4gIGNvbnN0IElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcclxuICBjb25zdCBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XHJcbiAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcclxuICBcclxuICBpZiAoIWluZGV4ZWREQikge1xyXG4gICAgYWxlcnQoJ1N1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhcycpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRfbWVcclxuICAvLyAkb3BlbmVkXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3IgIFxyXG4gIGNvbnN0IGlkYiA9IGZ1bmN0aW9uIGlkYihuYW1lLCB2ZXJzaW9uLCBzb2NrZXQpIHtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKVxyXG4gICAgICAuc3RhdGljKCckbmFtZScsIG5hbWUpXHJcbiAgICAgIC5zdGF0aWMoJyR2ZXJzaW9uJywgdmVyc2lvbilcclxuICAgICAgLnN0YXRpYygnJHNvY2tldCcsIHNvY2tldCk7XHJcblxyXG4gIH07XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoaWRiKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KGlkYkV2ZW50VGFyZ2V0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9waWVkYWRlc1xyXG4gIC5wcm9wZXJ0eSgnJF91cGdyYWRlbmVlZGVkcycsIHsgdmFsdWU6W10gfSlcclxuICAucHJvcGVydHkoJyRfbW9kZWxzJywgeyB2YWx1ZToge30gfSlcclxuXHJcbiAgLnByb3BlcnR5KCckbWUnLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuJF9tZTtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uIChtZSkge1xyXG4gICAgICB0aGlzLiRfbWUgPSBtZTtcclxuICAgICAgY29uc3QgZSA9IG5ldyBFdmVudCgnb3BlbmVkJyk7XHJcbiAgICAgIC8vIGUudGFyZ2V0ID0gdGhpcztcclxuICAgICAgdGhpcy4kZW1pdChlKTtcclxuICAgIH1cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJG9iamVjdFN0b3JlTmFtZXMnLCAnb2JqZWN0U3RvcmVOYW1lcycpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRvcGVuJywgZnVuY3Rpb24gKG5hbWUsIHZlcnNpb24pIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYk9wZW5EQlJlcXVlc3QoaW5kZXhlZERCLm9wZW4uYXBwbHkoaW5kZXhlZERCLCBhcmd1bWVudHMpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGRyb3AnLCBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgXHJcbiAgICByZXR1cm4gbmV3IGlkYk9wZW5EQlJlcXVlc3QoaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlLmFwcGx5KGluZGV4ZWREQiwgYXJndW1lbnRzKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRjbXAnLCBmdW5jdGlvbiAoZmlyc3QsIHNlY29uZCkge1xyXG4gICAgXHJcbiAgICByZXR1cm4gaW5kZXhlZERCLmNtcChmaXJzdCwgc2Vjb25kKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRXZlbnQgaGFuZGxlcnNcclxuICAubWV0aG9kKCckYWJvcnRlZCcsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIHJldHVybiB0aGl6LiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXouJG1lLm9uYWJvcnQgPSBjYjtcclxuICAgIH0pO1xyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRjbG9zZWQnLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICByZXR1cm4gdGhpei4kYmluZCgnb3BlbmVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGl6LiRtZS5vbmNsb3NlID0gY2I7XHJcbiAgICB9KTtcclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZXJyb3InLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICByZXR1cm4gdGhpei4kYmluZCgnb3BlbmVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGl6LiRtZS5vbmVycm9yID0gY2I7XHJcbiAgICB9KTtcclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckdmVyc2lvbkNoYW5nZWQnLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICByZXR1cm4gdGhpei4kYmluZCgnb3BlbmVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGl6LiRtZS5vbnZlcnNpb25jaGFuZ2UgPSBjYjtcclxuICAgIH0pO1xyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyR1cGdyYWRlbmVlZGVkJywgZnVuY3Rpb24gKGNiKSB7XHJcbiAgICBcclxuICAgIHRoaXMuJF91cGdyYWRlbmVlZGVkcy5wdXNoKGNiKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckYXV0b21pZ3JhdGlvbicsIGZ1bmN0aW9uIChhbGxNaWdyYXRpb25zKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuJHVwZ3JhZGVuZWVkZWQoZnVuY3Rpb24gKHRoaXosIG9wZW5SZXF1ZXN0LCBldmVudCkge1xyXG4gICAgICBPYmplY3Qua2V5cyhhbGxNaWdyYXRpb25zKS5tYXAoZnVuY3Rpb24gKHZlcnNpb24pIHtcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50Lm9sZFZlcnNpb24gPCB2ZXJzaW9uICYmIHZlcnNpb24gPD0gZXZlbnQubmV3VmVyc2lvbikge1xyXG5cclxuICAgICAgICAgIGNvbnN0IG1pZ3JhdGlvbnMgPSBBcnJheS5pc0FycmF5KGFsbE1pZ3JhdGlvbnNbdmVyc2lvbl0pP1xyXG4gICAgICAgICAgICBhbGxNaWdyYXRpb25zW3ZlcnNpb25dOlthbGxNaWdyYXRpb25zW3ZlcnNpb25dXTtcclxuXHJcbiAgICAgICAgICAkbG9nLmxvZygnbWlncmF0aW9uIHYnK3ZlcnNpb24rJyBzdGFydHMnKTtcclxuICAgICAgICAgIG1pZ3JhdGlvbnMubWFwKGZ1bmN0aW9uIChtaWdyYXRpb24pIHtcclxuICAgICAgICAgICAgbWlncmF0aW9uKHRoaXosIG9wZW5SZXF1ZXN0LCBldmVudCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJG9wZW4nLCBmdW5jdGlvbiAoY2IsIGNiRXJyKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIGxldCBsYXN0UnEgPSBudWxsO1xyXG4gICAgbGV0IGxhc3RFdmVudCA9IG51bGw7XHJcblxyXG4gICAgaWYgKCF0aGl6LiRvcGVuZWQpIHtcclxuXHJcbiAgICAgIHRoaXouJG9wZW5lZCA9IChsYXN0UnEgPSBpZGIuJG9wZW4odGhpei4kbmFtZSwgdGhpei4kdmVyc2lvbilcclxuICAgICAgICAuJHVwZ3JhZGVuZWVkZWQoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAkbG9nLmxvZygndXBncmFkZW5lZWRlZCBpZGI6ICcrdGhpei4kbmFtZSsnIHYnK3RoaXouJHZlcnNpb24pO1xyXG4gICAgICAgICAgdGhpei4kbWUgPSBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICAgICAgdGhpei4kX3VwZ3JhZGVuZWVkZWRzLm1hcChmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAgICAgY2IuYXBwbHkodGhpeiwgW3RoaXosIGxhc3RScSwgZXZlbnRdKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKVxyXG5cclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAkbG9nLmxvZygnb3BlbmVkIGlkYjogJyt0aGl6LiRuYW1lKycgdicrdGhpei4kdmVyc2lvbik7XHJcbiAgICAgICAgICBpZiAodGhpei4kbWUgIT09IGV2ZW50LnRhcmdldC5yZXN1bHQpe1xyXG4gICAgICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBsYXN0RXZlbnQgPSBldmVudDtcclxuICAgICAgICAgIGlmIChjYikgY2IodGhpeiwgbGFzdFJxLCBldmVudCk7XHJcbiAgICAgICAgICByZXR1cm4gdGhpejtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGxhc3RScSA9IG51bGw7XHJcbiAgICAgICAgICB0aGl6LiRvcGVuZWQgPSBudWxsO1xyXG4gICAgICAgICAgaWYgKGNiRXJyKSBjYkVycih0aGl6LCBsYXN0UnEsIGV2ZW50KTtcclxuICAgICAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0gZWxzZSBpZiAoY2IpIHtcclxuXHJcbiAgICAgIGNiKHRoaXosIGxhc3RScSwgbGFzdEV2ZW50KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJG9wZW5lZDtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGRyb3AnLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICB0aGl6LiRvcGVuZWQgPSBudWxsO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICBjb25zdCBycSA9IGlkYi4kZHJvcCh0aGl6LiRuYW1lKVxyXG4gICAgICAgIC4kc3VjY2VzcyhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlc29sdmUodGhpeilcclxuICAgICAgICB9KVxyXG4gICAgICAgIC4kZmFpbGVkKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgaWYgKGNiKSBjYihycSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRjbG9zZScsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB0aGlzLiRvcGVuZWQgPSBudWxsO1xyXG4gICAgdGhpcy4kbWUuY2xvc2UuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgICBcclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckY3JlYXRlU3RvcmUnLCBmdW5jdGlvbiAobmFtZSwgb3B0aW9ucykge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiU3RvcmUodGhpcy4kbWUuY3JlYXRlT2JqZWN0U3RvcmUuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpO1xyXG4gICAgXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGRyb3BTdG9yZScsIGZ1bmN0aW9uIChuYW1lKSB7XHJcblxyXG4gICAgdGhpcy4kbWUuZGVsZXRlT2JqZWN0U3RvcmUuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRtb2RlbCcsIGZ1bmN0aW9uIChuYW1lLCBzb2NrZXQpIHtcclxuXHJcbiAgICAvLyBTaSBleGlzdGUgZWwgbW9kZWxvIHJldG9ybmFybG9cclxuICAgIGlmKHRoaXMuJF9tb2RlbHNbbmFtZV0pIHJldHVybiB0aGlzLiRfbW9kZWxzW25hbWVdO1xyXG5cclxuICAgIC8vIEluc3RhbmNpYXIgZWwgbW9kZWxvIHkgZ3VhcmRhcmxvXHJcbiAgICByZXR1cm4gdGhpcy4kX21vZGVsc1tuYW1lXSA9IGlkYk1vZGVsKHRoaXMsIG5hbWUsIHNvY2tldCB8fCB0aGlzLiRzb2NrZXQpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckdHJhbnNhY3Rpb24nLCBmdW5jdGlvbiAoc3RvcmVOYW1lcywgbW9kZSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJG9wZW4oKVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAodGhpeikge1xyXG4gICAgICAgIHJldHVybiBuZXcgaWRiVHJhbnNhY3Rpb24odGhpei4kbWUudHJhbnNhY3Rpb24uYXBwbHkodGhpei4kbWUsIGFyZ3MpKTtcclxuICAgICAgfSk7XHJcblxyXG4gIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHN0b3JlJywgZnVuY3Rpb24gKHN0b3JlTmFtZXMpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoc3RvcmVOYW1lcykpIHN0b3JlTmFtZXMgPSBbc3RvcmVOYW1lc107XHJcblxyXG4gICAgZnVuY3Rpb24gYWN0aW9uKG1vZGUpIHtcclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGl6LiR0cmFuc2FjdGlvbihzdG9yZU5hbWVzLCBtb2RlKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHR4KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3Jlc09iaiA9IHt9O1xyXG4gICAgICAgICAgICBjb25zdCBzdG9yZXMgPSBzdG9yZU5hbWVzLm1hcChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHN0b3Jlc09ialtzdG9yZU5hbWVdID0gdHguJHN0b3JlKHN0b3JlTmFtZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoY2IpIGNiLmFwcGx5KHRoaXosIHN0b3Jlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdG9yZXNPYmo7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBDbGF6emVyKHt9KVxyXG4gICAgICAuc3RhdGljKCckcmVhZGVyJywgYWN0aW9uKGlkYlRyYW5zYWN0aW9uLlRyYW5zYWN0aW9uTW9kZS5SZWFkT25seSkpXHJcbiAgICAgIC5zdGF0aWMoJyR3cml0ZXInLCBhY3Rpb24oaWRiVHJhbnNhY3Rpb24uVHJhbnNhY3Rpb25Nb2RlLlJlYWRXcml0ZSkpXHJcbiAgICAgIC5jbGF6elxyXG5cclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCRmFjdG9yeSB7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBvcGVuKERPTVN0cmluZyBuYW1lLCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGxvbmcgdmVyc2lvbik7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBkZWxldGVEYXRhYmFzZShET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgc2hvcnQgY21wKGFueSBmaXJzdCwgYW55IHNlY29uZCk7XHJcbiAqIH07XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkRhdGFiYXNlIDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgdW5zaWduZWQgbG9uZyBsb25nIHZlcnNpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgICAgICBvYmplY3RTdG9yZU5hbWVzO1xyXG4gKiBcclxuICogICBJREJUcmFuc2FjdGlvbiB0cmFuc2FjdGlvbigoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pIHN0b3JlTmFtZXMsIG9wdGlvbmFsIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlID0gXCJyZWFkb25seVwiKTtcclxuICogICB2b2lkICAgICAgICAgICBjbG9zZSgpO1xyXG4gKiAgIElEQk9iamVjdFN0b3JlIGNyZWF0ZU9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lLCBvcHRpb25hbCBJREJPYmplY3RTdG9yZVBhcmFtZXRlcnMgb3B0aW9ucyk7XHJcbiAqICAgdm9pZCAgICAgICAgICAgZGVsZXRlT2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYWJvcnQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmNsb3NlO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9udmVyc2lvbmNoYW5nZTtcclxuICogfTtcclxuICogXHJcbiAqIGRpY3Rpb25hcnkgSURCT2JqZWN0U3RvcmVQYXJhbWV0ZXJzIHtcclxuICogICAoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pPyBrZXlQYXRoID0gbnVsbDtcclxuICogICBib29sZWFuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvSW5jcmVtZW50ID0gZmFsc2U7XHJcbiAqIH07bWVcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJFdmVudFRhcmdldCwgaWRiU3RvcmUsIGlkYk1vZGVsLCBpZGJPcGVuREJSZXF1ZXN0LCBpZGJUcmFuc2FjdGlvbiwgJGxvZykge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cblxuICB2YXIgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xuICAvLyBObyB1c2UgXCJjb25zdCBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXG4gIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxuICB2YXIgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xuICB2YXIgSURCS2V5UmFuZ2UgPSB3aW5kb3cuSURCS2V5UmFuZ2UgfHwgd2luZG93LndlYmtpdElEQktleVJhbmdlIHx8IHdpbmRvdy5tc0lEQktleVJhbmdlO1xuICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxuXG4gIGlmICghaW5kZXhlZERCKSB7XG4gICAgYWxlcnQoJ1N1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhcycpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxuICAvLyAkX21lXG4gIC8vICRvcGVuZWRcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3IgIFxuICB2YXIgaWRiID0gZnVuY3Rpb24gaWRiKG5hbWUsIHZlcnNpb24sIHNvY2tldCkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbmFtZScsIG5hbWUpLnN0YXRpYygnJHZlcnNpb24nLCB2ZXJzaW9uKS5zdGF0aWMoJyRzb2NrZXQnLCBzb2NrZXQpO1xuICB9O1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoaWRiKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBIZXJlbmNpYVxuICAuaW5oZXJpdChpZGJFdmVudFRhcmdldClcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUHJvcGllZGFkZXNcbiAgLnByb3BlcnR5KCckX3VwZ3JhZGVuZWVkZWRzJywgeyB2YWx1ZTogW10gfSkucHJvcGVydHkoJyRfbW9kZWxzJywgeyB2YWx1ZToge30gfSkucHJvcGVydHkoJyRtZScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRfbWU7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChtZSkge1xuICAgICAgdGhpcy4kX21lID0gbWU7XG4gICAgICB2YXIgZSA9IG5ldyBFdmVudCgnb3BlbmVkJyk7XG4gICAgICAvLyBlLnRhcmdldCA9IHRoaXM7XG4gICAgICB0aGlzLiRlbWl0KGUpO1xuICAgIH1cbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR2V0dGVyc1xuICAuZ2V0dGVyKCckb2JqZWN0U3RvcmVOYW1lcycsICdvYmplY3RTdG9yZU5hbWVzJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLnN0YXRpYygnJG9wZW4nLCBmdW5jdGlvbiAobmFtZSwgdmVyc2lvbikge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJPcGVuREJSZXF1ZXN0KGluZGV4ZWREQi5vcGVuLmFwcGx5KGluZGV4ZWREQiwgYXJndW1lbnRzKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5zdGF0aWMoJyRkcm9wJywgZnVuY3Rpb24gKG5hbWUpIHtcblxuICAgIHJldHVybiBuZXcgaWRiT3BlbkRCUmVxdWVzdChpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UuYXBwbHkoaW5kZXhlZERCLCBhcmd1bWVudHMpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLnN0YXRpYygnJGNtcCcsIGZ1bmN0aW9uIChmaXJzdCwgc2Vjb25kKSB7XG5cbiAgICByZXR1cm4gaW5kZXhlZERCLmNtcChmaXJzdCwgc2Vjb25kKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRXZlbnQgaGFuZGxlcnNcbiAgLm1ldGhvZCgnJGFib3J0ZWQnLCBmdW5jdGlvbiAoY2IpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgcmV0dXJuIHRoaXouJGJpbmQoJ29wZW5lZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXouJG1lLm9uYWJvcnQgPSBjYjtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGNsb3NlZCcsIGZ1bmN0aW9uIChjYikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICByZXR1cm4gdGhpei4kYmluZCgnb3BlbmVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpei4kbWUub25jbG9zZSA9IGNiO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZXJyb3InLCBmdW5jdGlvbiAoY2IpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgcmV0dXJuIHRoaXouJGJpbmQoJ29wZW5lZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXouJG1lLm9uZXJyb3IgPSBjYjtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHZlcnNpb25DaGFuZ2VkJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIHJldHVybiB0aGl6LiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGl6LiRtZS5vbnZlcnNpb25jaGFuZ2UgPSBjYjtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHVwZ3JhZGVuZWVkZWQnLCBmdW5jdGlvbiAoY2IpIHtcblxuICAgIHRoaXMuJF91cGdyYWRlbmVlZGVkcy5wdXNoKGNiKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGF1dG9taWdyYXRpb24nLCBmdW5jdGlvbiAoYWxsTWlncmF0aW9ucykge1xuXG4gICAgcmV0dXJuIHRoaXMuJHVwZ3JhZGVuZWVkZWQoZnVuY3Rpb24gKHRoaXosIG9wZW5SZXF1ZXN0LCBldmVudCkge1xuICAgICAgT2JqZWN0LmtleXMoYWxsTWlncmF0aW9ucykubWFwKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG5cbiAgICAgICAgaWYgKGV2ZW50Lm9sZFZlcnNpb24gPCB2ZXJzaW9uICYmIHZlcnNpb24gPD0gZXZlbnQubmV3VmVyc2lvbikge1xuXG4gICAgICAgICAgdmFyIG1pZ3JhdGlvbnMgPSBBcnJheS5pc0FycmF5KGFsbE1pZ3JhdGlvbnNbdmVyc2lvbl0pID8gYWxsTWlncmF0aW9uc1t2ZXJzaW9uXSA6IFthbGxNaWdyYXRpb25zW3ZlcnNpb25dXTtcblxuICAgICAgICAgICRsb2cubG9nKCdtaWdyYXRpb24gdicgKyB2ZXJzaW9uICsgJyBzdGFydHMnKTtcbiAgICAgICAgICBtaWdyYXRpb25zLm1hcChmdW5jdGlvbiAobWlncmF0aW9uKSB7XG4gICAgICAgICAgICBtaWdyYXRpb24odGhpeiwgb3BlblJlcXVlc3QsIGV2ZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRvcGVuJywgZnVuY3Rpb24gKGNiLCBjYkVycikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgIHZhciBsYXN0UnEgPSBudWxsO1xuICAgIHZhciBsYXN0RXZlbnQgPSBudWxsO1xuXG4gICAgaWYgKCF0aGl6LiRvcGVuZWQpIHtcblxuICAgICAgdGhpei4kb3BlbmVkID0gKGxhc3RScSA9IGlkYi4kb3Blbih0aGl6LiRuYW1lLCB0aGl6LiR2ZXJzaW9uKS4kdXBncmFkZW5lZWRlZChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgJGxvZy5sb2coJ3VwZ3JhZGVuZWVkZWQgaWRiOiAnICsgdGhpei4kbmFtZSArICcgdicgKyB0aGl6LiR2ZXJzaW9uKTtcbiAgICAgICAgdGhpei4kbWUgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICB0aGl6LiRfdXBncmFkZW5lZWRlZHMubWFwKGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgIGNiLmFwcGx5KHRoaXosIFt0aGl6LCBsYXN0UnEsIGV2ZW50XSk7XG4gICAgICAgIH0pO1xuICAgICAgfSkpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICRsb2cubG9nKCdvcGVuZWQgaWRiOiAnICsgdGhpei4kbmFtZSArICcgdicgKyB0aGl6LiR2ZXJzaW9uKTtcbiAgICAgICAgaWYgKHRoaXouJG1lICE9PSBldmVudC50YXJnZXQucmVzdWx0KSB7XG4gICAgICAgICAgdGhpei4kbWUgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGxhc3RFdmVudCA9IGV2ZW50O1xuICAgICAgICBpZiAoY2IpIGNiKHRoaXosIGxhc3RScSwgZXZlbnQpO1xuICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBsYXN0UnEgPSBudWxsO1xuICAgICAgICB0aGl6LiRvcGVuZWQgPSBudWxsO1xuICAgICAgICBpZiAoY2JFcnIpIGNiRXJyKHRoaXosIGxhc3RScSwgZXZlbnQpO1xuICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY2IpIHtcblxuICAgICAgY2IodGhpeiwgbGFzdFJxLCBsYXN0RXZlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGl6LiRvcGVuZWQ7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRkcm9wJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICB2YXIgcnEgPSBpZGIuJGRyb3AodGhpei4kbmFtZSkuJHN1Y2Nlc3MoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJlc29sdmUodGhpeik7XG4gICAgICB9KS4kZmFpbGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZWplY3QoZXZlbnQpO1xuICAgICAgfSk7XG4gICAgICBpZiAoY2IpIGNiKHJxKTtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGNsb3NlJywgZnVuY3Rpb24gKCkge1xuXG4gICAgdGhpcy4kb3BlbmVkID0gbnVsbDtcbiAgICB0aGlzLiRtZS5jbG9zZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckY3JlYXRlU3RvcmUnLCBmdW5jdGlvbiAobmFtZSwgb3B0aW9ucykge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJTdG9yZSh0aGlzLiRtZS5jcmVhdGVPYmplY3RTdG9yZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRkcm9wU3RvcmUnLCBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgdGhpcy4kbWUuZGVsZXRlT2JqZWN0U3RvcmUuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJG1vZGVsJywgZnVuY3Rpb24gKG5hbWUsIHNvY2tldCkge1xuXG4gICAgLy8gU2kgZXhpc3RlIGVsIG1vZGVsbyByZXRvcm5hcmxvXG4gICAgaWYgKHRoaXMuJF9tb2RlbHNbbmFtZV0pIHJldHVybiB0aGlzLiRfbW9kZWxzW25hbWVdO1xuXG4gICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG8geSBndWFyZGFybG9cbiAgICByZXR1cm4gdGhpcy4kX21vZGVsc1tuYW1lXSA9IGlkYk1vZGVsKHRoaXMsIG5hbWUsIHNvY2tldCB8fCB0aGlzLiRzb2NrZXQpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckdHJhbnNhY3Rpb24nLCBmdW5jdGlvbiAoc3RvcmVOYW1lcywgbW9kZSkge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgIHJldHVybiB0aGl6LiRvcGVuKCkudGhlbihmdW5jdGlvbiAodGhpeikge1xuICAgICAgcmV0dXJuIG5ldyBpZGJUcmFuc2FjdGlvbih0aGl6LiRtZS50cmFuc2FjdGlvbi5hcHBseSh0aGl6LiRtZSwgYXJncykpO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckc3RvcmUnLCBmdW5jdGlvbiAoc3RvcmVOYW1lcykge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoc3RvcmVOYW1lcykpIHN0b3JlTmFtZXMgPSBbc3RvcmVOYW1lc107XG5cbiAgICBmdW5jdGlvbiBhY3Rpb24obW9kZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjYikge1xuXG4gICAgICAgIHJldHVybiB0aGl6LiR0cmFuc2FjdGlvbihzdG9yZU5hbWVzLCBtb2RlKS50aGVuKGZ1bmN0aW9uICh0eCkge1xuICAgICAgICAgIHZhciBzdG9yZXNPYmogPSB7fTtcbiAgICAgICAgICB2YXIgc3RvcmVzID0gc3RvcmVOYW1lcy5tYXAoZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0b3Jlc09ialtzdG9yZU5hbWVdID0gdHguJHN0b3JlKHN0b3JlTmFtZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGNiKSBjYi5hcHBseSh0aGl6LCBzdG9yZXMpO1xuICAgICAgICAgIHJldHVybiBzdG9yZXNPYmo7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENsYXp6ZXIoe30pLnN0YXRpYygnJHJlYWRlcicsIGFjdGlvbihpZGJUcmFuc2FjdGlvbi5UcmFuc2FjdGlvbk1vZGUuUmVhZE9ubHkpKS5zdGF0aWMoJyR3cml0ZXInLCBhY3Rpb24oaWRiVHJhbnNhY3Rpb24uVHJhbnNhY3Rpb25Nb2RlLlJlYWRXcml0ZSkpLmNsYXp6O1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJTdG9yZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJPYmplY3RTdG9yZSB7XHJcbiAqICAgICAgICAgICAgYXR0cmlidXRlIERPTVN0cmluZyAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGFueSAgICAgICAgICAgIGtleVBhdGg7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgIGluZGV4TmFtZXM7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uIHRyYW5zYWN0aW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICBhdXRvSW5jcmVtZW50O1xyXG4gKiBcclxuICogICBJREJSZXF1ZXN0IHB1dChhbnkgdmFsdWUsIG9wdGlvbmFsIGFueSBrZXkpO1xyXG4gKiAgIElEQlJlcXVlc3QgYWRkKGFueSB2YWx1ZSwgb3B0aW9uYWwgYW55IGtleSk7XHJcbiAqICAgSURCUmVxdWVzdCBkZWxldGUoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGNsZWFyKCk7XHJcbiAqICAgSURCSW5kZXggICBpbmRleChET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgSURCSW5kZXggICBjcmVhdGVJbmRleChET01TdHJpbmcgbmFtZSwgKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KSBrZXlQYXRoLCBvcHRpb25hbCBJREJJbmRleFBhcmFtZXRlcnMgb3B0aW9ucyk7XHJcbiAqICAgdm9pZCAgICAgICBkZWxldGVJbmRleChET01TdHJpbmcgaW5kZXhOYW1lKTtcclxuICogfTtcclxuICogXHJcbiAqIGRpY3Rpb25hcnkgSURCSW5kZXhQYXJhbWV0ZXJzIHtcclxuICogICBib29sZWFuIHVuaXF1ZSA9IGZhbHNlO1xyXG4gKiAgIGJvb2xlYW4gbXVsdGlFbnRyeSA9IGZhbHNlO1xyXG4gKiB9O1xyXG4gKiBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJSZXF1ZXN0LCBpZGJJbmRleCwgaWRiQ29uc3VsdGFudCwgJGxvZykgeyAnbmdJbmplY3QnO1xyXG5cclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlN0b3JlIChtZSkge1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KGlkYkNvbnN1bHRhbnQpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEdldHRlcnNcclxuICAuZ2V0dGVyKCcka2V5UGF0aCcsICdrZXlQYXRoJylcclxuICAuZ2V0dGVyKCckaW5kZXhOYW1lcycsICdpbmRleE5hbWVzJylcclxuICAuZ2V0dGVyKCckdHJhbnNhY3Rpb24nLCAndHJhbnNhY3Rpb24nKVxyXG4gIC5nZXR0ZXIoJyRhdXRvSW5jcmVtZW50JywgJ2F1dG9JbmNyZW1lbnQnKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckcHV0JywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUucHV0LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckYWRkJywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuYWRkLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZGVsZXRlJywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmRlbGV0ZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSlcclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge30pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckY2xlYXInLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNsZWFyLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24oZXZlbnQpe30pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckaW5kZXgnLCBmdW5jdGlvbiAobmFtZSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiSW5kZXgodGhpcy4kbWUuaW5kZXguYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckY3JlYXRlSW5kZXgnLCBmdW5jdGlvbiAoZmllbGRzLCBuYW1lLCBvcHRpb25zKSB7XHJcbiAgICBpZiAodHlwZW9mIGZpZWxkcyA9PSAnc3RyaW5nJykge1xyXG4gICAgICBmaWVsZHMgPSBbZmllbGRzXTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PSAnb2JqZWN0Jyl7XHJcbiAgICAgIG9wdGlvbnMgPSBuYW1lO1xyXG4gICAgICBuYW1lID0gbnVsbDtcclxuICAgIH1cclxuICAgIGlmICghbmFtZSkge1xyXG4gICAgICBuYW1lID0gZmllbGRzLnNvcnQoKS5qb2luKCdfJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJJbmRleCh0aGlzLiRtZS5jcmVhdGVJbmRleChuYW1lLCBmaWVsZHMsIG9wdGlvbnMpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGRlbGV0ZUluZGV4JywgZnVuY3Rpb24gKGluZGV4TmFtZSkge1xyXG4gICAgaWYgKEFycmF5LmFuZ3VsYXIuaXNBcnJheShpbmRleE5hbWUpKSB7XHJcbiAgICAgIGluZGV4TmFtZSA9IGluZGV4TmFtZS5zb3J0KCkuam9pbignXycpO1xyXG4gICAgfVxyXG4gICAgdGhpcy4kbWUuZGVsZXRlSW5kZXgoaW5kZXhOYW1lKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYlN0b3JlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiU3RvcmVcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCT2JqZWN0U3RvcmUge1xyXG4gKiAgICAgICAgICAgIGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICBuYW1lO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBhbnkgICAgICAgICAgICBrZXlQYXRoO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmdMaXN0ICBpbmRleE5hbWVzO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbiB0cmFuc2FjdGlvbjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYm9vbGVhbiAgICAgICAgYXV0b0luY3JlbWVudDtcclxuICogXHJcbiAqICAgSURCUmVxdWVzdCBwdXQoYW55IHZhbHVlLCBvcHRpb25hbCBhbnkga2V5KTtcclxuICogICBJREJSZXF1ZXN0IGFkZChhbnkgdmFsdWUsIG9wdGlvbmFsIGFueSBrZXkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZGVsZXRlKGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBjbGVhcigpO1xyXG4gKiAgIElEQkluZGV4ICAgaW5kZXgoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIElEQkluZGV4ICAgY3JlYXRlSW5kZXgoRE9NU3RyaW5nIG5hbWUsIChET01TdHJpbmcgb3Igc2VxdWVuY2U8RE9NU3RyaW5nPikga2V5UGF0aCwgb3B0aW9uYWwgSURCSW5kZXhQYXJhbWV0ZXJzIG9wdGlvbnMpO1xyXG4gKiAgIHZvaWQgICAgICAgZGVsZXRlSW5kZXgoRE9NU3RyaW5nIGluZGV4TmFtZSk7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBkaWN0aW9uYXJ5IElEQkluZGV4UGFyYW1ldGVycyB7XHJcbiAqICAgYm9vbGVhbiB1bmlxdWUgPSBmYWxzZTtcclxuICogICBib29sZWFuIG11bHRpRW50cnkgPSBmYWxzZTtcclxuICogfTtcclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJSZXF1ZXN0LCBpZGJJbmRleCwgaWRiQ29uc3VsdGFudCwgJGxvZykge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiU3RvcmUobWUpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBIZXJlbmNpYVxuICAuaW5oZXJpdChpZGJDb25zdWx0YW50KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRrZXlQYXRoJywgJ2tleVBhdGgnKS5nZXR0ZXIoJyRpbmRleE5hbWVzJywgJ2luZGV4TmFtZXMnKS5nZXR0ZXIoJyR0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpLmdldHRlcignJGF1dG9JbmNyZW1lbnQnLCAnYXV0b0luY3JlbWVudCcpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRwdXQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLnB1dC5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckYWRkJywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5hZGQuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGRlbGV0ZScsIGZ1bmN0aW9uIChxdWVyeSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmRlbGV0ZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHt9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGNsZWFyJywgZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNsZWFyLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge30pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckaW5kZXgnLCBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJJbmRleCh0aGlzLiRtZS5pbmRleC5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjcmVhdGVJbmRleCcsIGZ1bmN0aW9uIChmaWVsZHMsIG5hbWUsIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIGZpZWxkcyA9PSAnc3RyaW5nJykge1xuICAgICAgZmllbGRzID0gW2ZpZWxkc107XG4gICAgfVxuICAgIGlmICgodHlwZW9mIG5hbWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG5hbWUpKSA9PSAnb2JqZWN0Jykge1xuICAgICAgb3B0aW9ucyA9IG5hbWU7XG4gICAgICBuYW1lID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICBuYW1lID0gZmllbGRzLnNvcnQoKS5qb2luKCdfJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBpZGJJbmRleCh0aGlzLiRtZS5jcmVhdGVJbmRleChuYW1lLCBmaWVsZHMsIG9wdGlvbnMpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGRlbGV0ZUluZGV4JywgZnVuY3Rpb24gKGluZGV4TmFtZSkge1xuICAgIGlmIChBcnJheS5hbmd1bGFyLmlzQXJyYXkoaW5kZXhOYW1lKSkge1xuICAgICAgaW5kZXhOYW1lID0gaW5kZXhOYW1lLnNvcnQoKS5qb2luKCdfJyk7XG4gICAgfVxuICAgIHRoaXMuJG1lLmRlbGV0ZUluZGV4KGluZGV4TmFtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiU3RvcmUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiSW5kZXhcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCSW5kZXgge1xyXG4gKiAgICAgICAgICAgIGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICBuYW1lO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJPYmplY3RTdG9yZSBvYmplY3RTdG9yZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAga2V5UGF0aDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYm9vbGVhbiAgICAgICAgbXVsdGlFbnRyeTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYm9vbGVhbiAgICAgICAgdW5pcXVlO1xyXG4gKiBcclxuICogICBJREJSZXF1ZXN0IGdldChhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0S2V5KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGwob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbEtleXMob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGNvdW50KG9wdGlvbmFsIGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuQ3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5LZXlDdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiB9O1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYkNvbnN1bHRhbnQpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkluZGV4IChtZSkge1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KGlkYkNvbnN1bHRhbnQpXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gR2V0dGVyc1xyXG4gIC5nZXR0ZXIoJyRvYmplY3RTdG9yZScsICdvYmplY3RTdG9yZScpXHJcbiAgLmdldHRlcignJGtleVBhdGgnLCAgICAgJ2tleVBhdGgnKVxyXG4gIC5nZXR0ZXIoJyRtdWx0aUVudHJ5JywgICdtdWx0aUVudHJ5JylcclxuICAuZ2V0dGVyKCckdW5pcXVlJywgICAgICAndW5pcXVlJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYkluZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiSW5kZXhcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCSW5kZXgge1xyXG4gKiAgICAgICAgICAgIGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICBuYW1lO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJPYmplY3RTdG9yZSBvYmplY3RTdG9yZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAga2V5UGF0aDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYm9vbGVhbiAgICAgICAgbXVsdGlFbnRyeTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYm9vbGVhbiAgICAgICAgdW5pcXVlO1xyXG4gKiBcclxuICogICBJREJSZXF1ZXN0IGdldChhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0S2V5KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGwob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbEtleXMob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGNvdW50KG9wdGlvbmFsIGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuQ3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5LZXlDdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiB9O1xyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYkNvbnN1bHRhbnQpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkluZGV4KG1lKSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoaWRiQ29uc3VsdGFudClcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR2V0dGVyc1xuICAuZ2V0dGVyKCckb2JqZWN0U3RvcmUnLCAnb2JqZWN0U3RvcmUnKS5nZXR0ZXIoJyRrZXlQYXRoJywgJ2tleVBhdGgnKS5nZXR0ZXIoJyRtdWx0aUVudHJ5JywgJ211bHRpRW50cnknKS5nZXR0ZXIoJyR1bmlxdWUnLCAndW5pcXVlJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJJbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJFdmVudFRhcmdldFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyKSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJFdmVudFRhcmdldCAoKSB7fSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9waWVkYWRlc1xyXG4gIC5wcm9wZXJ0eSgnJF9saXN0ZW5lcnMnLCB7IHZhbHVlOiBbXSB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIG1ldGhvZFxyXG4gIC5tZXRob2QoJyRiaW5kJywgZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICBpZighKHR5cGUgaW4gdGhpcy4kX2xpc3RlbmVycykpIHtcclxuICAgICAgdGhpcy4kX2xpc3RlbmVyc1t0eXBlXSA9IFtdO1xyXG4gICAgfVxyXG4gICAgdGhpcy4kX2xpc3RlbmVyc1t0eXBlXS5wdXNoKGNhbGxiYWNrKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gbWV0aG9kXHJcbiAgLm1ldGhvZCgnJHVuYmluZCAnLCBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcclxuICAgIGlmKHR5cGUgaW4gdGhpcy4kX2xpc3RlbmVycykge1xyXG4gICAgICB2YXIgc3RhY2sgPSB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdO1xyXG4gICAgICBmb3IodmFyIGkgPSAwLCBsID0gc3RhY2subGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYoc3RhY2tbaV0gPT09IGNhbGxiYWNrKXtcclxuICAgICAgICAgIHN0YWNrLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgIHJldHVybiB0aGlzLiR1bmJpbmQodHlwZSwgY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBtZXRob2RcclxuICAubWV0aG9kKCckZW1pdCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYoZXZlbnQudHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSB7XHJcbiAgICAgIHZhciBzdGFjayA9IHRoaXMuJF9saXN0ZW5lcnNbZXZlbnQudHlwZV07XHJcbiAgICAgIGZvcih2YXIgaSA9IDAsIGwgPSBzdGFjay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgIHN0YWNrW2ldLmNhbGwodGhpcywgZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiRXZlbnRUYXJnZXQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJFdmVudFRhcmdldFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyKSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJFdmVudFRhcmdldCgpIHt9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQcm9waWVkYWRlc1xuICAucHJvcGVydHkoJyRfbGlzdGVuZXJzJywgeyB2YWx1ZTogW10gfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gbWV0aG9kXG4gIC5tZXRob2QoJyRiaW5kJywgZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSkge1xuICAgICAgdGhpcy4kX2xpc3RlbmVyc1t0eXBlXSA9IFtdO1xuICAgIH1cbiAgICB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdLnB1c2goY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBtZXRob2RcbiAgLm1ldGhvZCgnJHVuYmluZCAnLCBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSB7XG4gICAgICB2YXIgc3RhY2sgPSB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdGFjay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKHN0YWNrW2ldID09PSBjYWxsYmFjaykge1xuICAgICAgICAgIHN0YWNrLnNwbGljZShpLCAxKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy4kdW5iaW5kKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gbWV0aG9kXG4gIC5tZXRob2QoJyRlbWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnR5cGUgaW4gdGhpcy4kX2xpc3RlbmVycykge1xuICAgICAgdmFyIHN0YWNrID0gdGhpcy4kX2xpc3RlbmVyc1tldmVudC50eXBlXTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gc3RhY2subGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHN0YWNrW2ldLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJFdmVudFRhcmdldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJNb2RlbFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJRdWVyeSwgaWRiRXZlbnRUYXJnZXQsIGxiUmVzb3VyY2UsICR0aW1lb3V0KSB7ICduZ0luamVjdCc7XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBCdXNjYXIgdW4gY2FtcG9cclxuY29uc3QgZGVlcEZpZWxkID0gZnVuY3Rpb24gKG9iaiwgZmllbGQsIGNiKSB7XHJcblxyXG4gIGNvbnN0IGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XHJcbiAgY29uc3QgbGFzdEZpZWxkID0gZmllbGRzLnBvcCgpO1xyXG5cclxuICByZXR1cm4gKGZ1bmN0aW9uIF9zZXQob2JqKSB7XHJcbiAgICBpZiAoZmllbGRzLmxlbmd0aCA9PSAwKVxyXG4gICAgICByZXR1cm4gY2Iob2JqLCBsYXN0RmllbGQpO1xyXG4gICAgY29uc3QgZmllbGQgPSBmaWVsZHMuc2hpZnQoKTtcclxuICAgIGlmICh0eXBlb2Ygb2JqW2ZpZWxkXSA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgIG9ialtmaWVsZF0gPSB7fTtcclxuICAgIHJldHVybiBfc2V0KG9ialtmaWVsZF0pO1xyXG4gIH0pKG9iaik7XHJcblxyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXHJcbmNvbnN0IGdldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCkge1xyXG4gIHJldHVybiBkZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cclxuY29uc3Qgc2V0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIChvYmosIGZpZWxkLCB2YWx1ZSkge1xyXG4gIGRlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgIG9ialtsYXN0RmllbGRdID0gdmFsdWU7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIG9iajtcclxufTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnJldHVybiBmdW5jdGlvbiBpZGJNb2RlbEZhY3RvcnkgKGRiLCBuYW1lLCBzb2NrZXQpIHtcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRfcmVtb3RlXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgZnVuY3Rpb24gaWRiTW9kZWwoKSB7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGlkYk1vZGVsKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KGlkYkV2ZW50VGFyZ2V0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9waWVkYWRlcyBzdGF0aWNhc1xyXG4gIC5zdGF0aWMoJyRkYicsIGRiKVxyXG4gIC5zdGF0aWMoJyRuYW1lJywgbmFtZSlcclxuICAuc3RhdGljKCckc29ja2V0Jywgc29ja2V0KVxyXG5cclxuICAuc3RhdGljKCckaWQnLCB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfSlcclxuICAuc3RhdGljKCckZmllbGRzJywge1xyXG4gICAgaWQ6IHtcclxuICAgICAgaWQ6IHRydWUsXHJcbiAgICAgIG5hbWU6ICdpZCcsXHJcbiAgICAgIHR5cGU6ICdudW1iZXInXHJcbiAgICB9XHJcbiAgfSlcclxuICAuc3RhdGljKCckaW5kZXhlc1RvQ3JlYXRlJywgW10pXHJcbiAgLnN0YXRpYygnJGluc3RhbmNlcycsIHt9KVxyXG4gICAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGdldEtleUZyb20nLCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsIHRoaXMuJGlkLmtleVBhdGgpO1xyXG5cclxuICB9KVxyXG4gICAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGFkZEluZGV4JywgZnVuY3Rpb24gKGZpZWxkcywgbmFtZSwgb3B0aW9ucykge1xyXG5cclxuICAgIHRoaXMuJGluZGV4ZXNUb0NyZWF0ZS5wdXNoKGFyZ3VtZW50cyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRjcmVhdGUnLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgY29uc3Qgc3RvcmUgPSB0aGl6LiRkYi4kY3JlYXRlU3RvcmUodGhpei4kbmFtZSwgdGhpei4kaWQpO1xyXG5cclxuICAgIHRoaXouJGluZGV4ZXNUb0NyZWF0ZS5tYXAoZnVuY3Rpb24gKGFyZ3MpIHtcclxuICAgICAgc3RvcmUuJGNyZWF0ZUluZGV4LmFwcGx5KHN0b3JlLCBhcmdzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChjYikgY2IodGhpeiwgc3RvcmUpO1xyXG5cclxuICAgIHJldHVybiB0aGl6O1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZHJvcCcsIGZ1bmN0aW9uIChjYikge1xyXG5cclxuICAgIHRoaXMuJGRiLiRkcm9wU3RvcmUodGhpcy4kbmFtZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyR3cml0ZXInLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJGRiLiRzdG9yZSh0aGl6LiRuYW1lKS4kd3JpdGVyKGNiKVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAoc3RvcmVzKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0b3Jlc1t0aGl6LiRuYW1lXVxyXG4gICAgICB9KVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckcmVhZGVyJywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIHJldHVybiB0aGl6LiRkYi4kc3RvcmUodGhpei4kbmFtZSkuJHJlYWRlcihjYilcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHN0b3Jlcykge1xyXG4gICAgICAgIHJldHVybiBzdG9yZXNbdGhpei4kbmFtZV1cclxuICAgICAgfSlcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJHB1dCcsIGZ1bmN0aW9uIChvYmosIGtleSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBjb25zdCBkYXRhID0gdGhpcy4kZ2V0VmFsdWVzKG9iaik7XHJcbiAgICBhcmdzWzBdID0gZGF0YTtcclxuXHJcbiAgICByZXR1cm4gdGhpei4kd3JpdGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRwdXQuYXBwbHkoc3RvcmUsIGFyZ3MpLnRoZW4oZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIGNvbnN0IHJlY29yZCA9IHRoaXouJGdldEluc3RhbmNlKGtleSk7XHJcbiAgICAgICAgcmVjb3JkLiRzZXRWYWx1ZXMoZGF0YSk7XHJcbiAgICAgICAgcmVjb3JkLiRzZXRMb2NhbFZhbHVlcyhkYXRhKTtcclxuICAgICAgICByZXR1cm4gcmVjb3JkO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckYWRkJywgZnVuY3Rpb24gKG9iaiwga2V5KSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLiRnZXRWYWx1ZXMob2JqKTtcclxuICAgIGFyZ3NbMF0gPSBkYXRhO1xyXG5cclxuICAgIHJldHVybiB0aGl6LiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gICAgICByZXR1cm4gc3RvcmUuJGFkZC5hcHBseShzdG9yZSwgYXJncykudGhlbihmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpei4kZ2V0SW5zdGFuY2Uoa2V5KTtcclxuICAgICAgICByZWNvcmQuJHNldFZhbHVlcyhkYXRhKTtcclxuICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xyXG4gICAgICAgIHJldHVybiByZWNvcmQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRkZWxldGUnLCBmdW5jdGlvbiAocXVlcnkpIHtcclxuICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzLiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gICAgICByZXR1cm4gc3RvcmUuJGRlbGV0ZS5hcHBseShzdG9yZSwgYXJncyk7XHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGNsZWFyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIFxyXG4gICAgcmV0dXJuIHRoaXMuJHdyaXRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBzdG9yZS4kY2xlYXIuYXBwbHkoc3RvcmUsIGFyZ3MpO1xyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRnZXQnLCBmdW5jdGlvbiAoa2V5KSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIGNvbnN0IHJlY29yZCA9IHRoaXMuJGdldEluc3RhbmNlKGtleSk7XHJcblxyXG4gICAgcmVjb3JkLiRwcm9taXNlID0gdGhpei4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRnZXQuYXBwbHkoc3RvcmUsIGFyZ3MpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZWNvcmQuJHNldFZhbHVlcyhkYXRhKTtcclxuICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xyXG4gICAgICAgIHJldHVybiByZWNvcmQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlY29yZDtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGdldEtleScsIGZ1bmN0aW9uIChxdWVyeSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBzdG9yZS4kZ2V0S2V5LmFwcGx5KHN0b3JlLCBhcmdzKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGdldEFsbCcsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gW107XHJcblxyXG4gICAgcmVzdWx0LiRwcm9taXNlID0gdGhpei4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRnZXRBbGwuYXBwbHkoc3RvcmUsIGFyZ3MpLnRoZW4oZnVuY3Rpb24gKGFycikge1xyXG4gICAgICAgIHJldHVybiBhcnIubWFwKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICBjb25zdCByZWNvcmQgPSB0aGl6LiRnZXRJbnN0YW5jZSh0aGl6LiRnZXRLZXlGcm9tKGRhdGEpKTtcclxuICAgICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGRhdGEpO1xyXG4gICAgICAgICAgcmVjb3JkLiRzZXRMb2NhbFZhbHVlcyhkYXRhKTtcclxuICAgICAgICAgIHJlc3VsdC5wdXNoKHJlY29yZCk7XHJcbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRnZXRBbGxLZXlzJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cclxuICAgIHJlc3VsdC4kcHJvbWlzZSA9IHRoaXMuJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBzdG9yZS4kZ2V0QWxsS2V5cy5hcHBseShzdG9yZSwgYXJncykudGhlbihmdW5jdGlvbiAoYXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIGFyci5tYXAoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2goa2V5KTtcclxuICAgICAgICAgIHJldHVybiBrZXk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRjb3VudCcsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuXHJcbiAgICByZXR1cm4gdGhpcy4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRjb3VudC5hcHBseShzdG9yZSwgYXJncyk7XHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGZpbmQnLCBmdW5jdGlvbiAoZmlsdGVycykge1xyXG4gICAgXHJcbiAgICByZXR1cm4gbmV3IGlkYlF1ZXJ5KHRoaXMsIGZpbHRlcnMpO1xyXG5cclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRnZXRJbnN0YW5jZScsIGZ1bmN0aW9uIChrZXkpIHtcclxuXHJcbiAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcclxuICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCB8fCBrZXkgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG5ldyB0aGlzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTm8gZXhpc3RlIGxhIGluc3RhbmNpYSBlbnRvbmNlIHNlIGNyZWFcclxuICAgIGlmICghdGhpcy4kaW5zdGFuY2VzW2tleV0pe1xyXG4gICAgICB0aGlzLiRpbnN0YW5jZXNba2V5XSA9IG5ldyB0aGlzKCk7XHJcbiAgICAgIHRoaXMuJGluc3RhbmNlc1trZXldLiRzZXQodGhpcy4kaWQua2V5UGF0aCwga2V5KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHRoaXMuJGluc3RhbmNlc1trZXldO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBc2lnbmEgbGEgZXNwZWNpZmljYWNpw7NuIGRlIGxvcyBjYW1wb3NcclxuICAuc3RhdGljKCckZmllbGQnLCBmdW5jdGlvbiAobmFtZSwgZmllbGQpIHtcclxuXHJcbiAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnc3RyaW5nJykge1xyXG4gICAgICBmaWVsZCA9IHsgXCJ0eXBlXCI6IGZpZWxkIH07XHJcbiAgICB9XHJcblxyXG4gICAgZmllbGQubmFtZSA9IG5hbWU7XHJcblxyXG4gICAgdGhpcy4kZmllbGRzW25hbWVdID0gZmllbGQ7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFncmVnYSBlbCBlbCBjYW1wbyBJRCBhdXRvbWF0aWNhbWVudGVcclxuICAuc3RhdGljKCcka2V5JywgZnVuY3Rpb24gKGtleSwgYXV0b0luY3JlbWVudCwgdHlwZSkge1xyXG4gICAgaWYodHlwZW9mIGtleSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgIGF1dG9JbmNyZW1lbnQgPSBrZXk7XHJcbiAgICB9XHJcbiAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQgfHwga2V5ID09PSBudWxsIHx8IHR5cGVvZiBrZXkgPT09ICdib29sZWFuJyl7XHJcbiAgICAgIGtleSA9ICdpZCc7XHJcbiAgICB9XHJcbiAgICBpZih0eXBlb2YgYXV0b0luY3JlbWVudCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgdHlwZSA9IGF1dG9JbmNyZW1lbnQ7XHJcbiAgICAgIGF1dG9JbmNyZW1lbnQgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKGF1dG9JbmNyZW1lbnQgPT09IHVuZGVmaW5lZCB8fCBhdXRvSW5jcmVtZW50ID09PSBudWxsKXtcclxuICAgICAgYXV0b0luY3JlbWVudCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZih0eXBlb2YgYXV0b0luY3JlbWVudCA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHR5cGUgPSAnbnVtYmVyJztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLiRpZC5rZXlQYXRoID0ga2V5O1xyXG4gICAgdGhpcy4kaWQuYXV0b0luY3JlbWVudCA9IGF1dG9JbmNyZW1lbnQ7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuJGZpZWxkKGtleSwge1xyXG4gICAgICBpZDogdHJ1ZSxcclxuICAgICAgdHlwZTogdHlwZSxcclxuICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXHJcbiAgLnN0YXRpYygnJGdldFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgIFxyXG4gICAgY29uc3QgdmFsdWVzID0ge307XHJcblxyXG4gICAgT2JqZWN0LmtleXModGhpcy4kZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gZ2V0RmllbGRWYWx1ZShkYXRhLCBmaWVsZCk7XHJcbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICBzZXRGaWVsZFZhbHVlKHZhbHVlcywgZmllbGQsIHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQWdyZWdhIGVsIGVsIGNhbXBvIElEIGF1dG9tYXRpY2FtZW50ZVxyXG4gIC5zdGF0aWMoJyRidWlsZCcsIGZ1bmN0aW9uIChidWlsZENhbGxiYWNrKSB7XHJcblxyXG4gICAgYnVpbGRDYWxsYmFjayh0aGlzKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25maWd1cmEgZWwgcmVtb3RlIGFwaVxyXG4gIC5zdGF0aWMoJyRyZW1vdGUnLCBmdW5jdGlvbiAodXJsLCBhcmdzLCBhY3Rpb25zKSB7XHJcblxyXG4gICAgdGhpcy4kX3JlbW90ZSA9IGxiUmVzb3VyY2UuYXBwbHkobGJSZXNvdXJjZSwgYXJndW1lbnRzKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9waWVkYWRlc1xyXG4gIC5wcm9wZXJ0eSgnJF92YWx1ZXMnLCB7IHZhbHVlOiBuZXcgQ2xhenplcih7fSlcclxuICAgIC5zdGF0aWMoJ2xvY2FsJywge30pXHJcbiAgICAuc3RhdGljKCdyZW1vdGUnLCB7fSlcclxuICAgIC5jbGF6elxyXG4gIH0pXHJcblxyXG4gIC5wcm9wZXJ0eSgnJF92ZXJzaW9ucycsIHsgdmFsdWU6IHt9IH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxyXG4gIC5tZXRob2QoJyRnZXQnLCBmdW5jdGlvbiAoZmllbGQpIHtcclxuXHJcbiAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFzaWduYSBpbiB2YWxvciBhIHVuIGNhbXBvXHJcbiAgLm1ldGhvZCgnJHNldCcsIGZ1bmN0aW9uIChmaWVsZCwgdmFsdWUpIHtcclxuXHJcbiAgICByZXR1cm4gc2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcclxuICAubWV0aG9kKCckZ2V0VmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICByZXR1cm4gaWRiTW9kZWwuJGdldFZhbHVlcyhkYXRhIHx8IHRoaXMpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZ2V0TG9jYWxWYWx1ZXMnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuJGdldFZhbHVlcyh0aGlzLiRfdmFsdWVzLmxvY2FsKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldFJlbW90ZVZhbHVlcycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy4kZ2V0VmFsdWVzKHRoaXMuJF92YWx1ZXMucmVtb3RlKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHNldFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRzZXRMb2NhbFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRfdmFsdWVzLmxvY2FsLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRzZXRSZW1vdGVWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgIHNldEZpZWxkVmFsdWUodGhpei4kX3ZhbHVlcy5yZW1vdGUsIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGtleScsIGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgcmV0dXJuIGdldEZpZWxkVmFsdWUoZGF0YSwgdGhpcy4kaWQua2V5UGF0aCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEZ1bmNpb24gcXVlIGhhY2UgZXNjdWNoYXJzIGxvcyBtZW5zYWplcyBkZWwgc29ja2V0IHBhcmEgZWwgbW9kZWxcclxuICAubWV0aG9kKCckbGlzdGVuJywgZnVuY3Rpb24gKGRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBpZiAoIXRoaXMuJHNvY2tldCkgdGhyb3cgbmV3IEVycm9yKCdpZGJNb2RlbC5Eb2VzTm90SGF2ZVNvY2tldEluc3RhbmNlJyk7XHJcblxyXG4gICAgLy8gQ3JlYXIgdW5hIHN1YnNjcmlwY2lvbiBhbCBzb2NrZXQgcGFyYSBjdWFuZG8gc2UgcmVjaWJhbiBkYXRvc1xyXG4gICAgLy8gcGFyYSBsYSBpbnN0YW5jaWEgYWN0dWFsXHJcbiAgICB0aGlzLiRzb2NrZXQuc3Vic2NyaWJlKHtcclxuICAgICAgbW9kZWxOYW1lOiBpZGJNb2RlbC4kbmFtZSxcclxuICAgICAgZXZlbnROYW1lOiAndXBkYXRlJyxcclxuICAgICAgbW9kZWxJZDogdGhpei4ka2V5KCksXHJcbiAgICB9LCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgLy8gQSByZWNpYmlyIGRhdG9zIGRlbCBzb2NrZXQgYXNpZ25hciBsb3MgdmFsb3Jlc1xyXG4gICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRW1pdGlyIGV2ZW50byBkZSBkYXRvcyByZWNpYmlkb3IgcGFyYSBlbCBtb2RlbG9cclxuICAgICAgICB0aGl6LiRzZXRSZW1vdGVWYWx1ZXMoZGF0YS52YWx1ZXMsIGRhdGEudmVyc2lvbik7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufTt9XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiTW9kZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJNb2RlbFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJRdWVyeSwgaWRiRXZlbnRUYXJnZXQsIGxiUmVzb3VyY2UsICR0aW1lb3V0KSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQnVzY2FyIHVuIGNhbXBvXG5cbiAgdmFyIGRlZXBGaWVsZCA9IGZ1bmN0aW9uIGRlZXBGaWVsZChvYmosIGZpZWxkLCBjYikge1xuXG4gICAgdmFyIGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XG4gICAgdmFyIGxhc3RGaWVsZCA9IGZpZWxkcy5wb3AoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiBfc2V0KG9iaikge1xuICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMCkgcmV0dXJuIGNiKG9iaiwgbGFzdEZpZWxkKTtcbiAgICAgIHZhciBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xuICAgICAgaWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAndW5kZWZpbmVkJykgb2JqW2ZpZWxkXSA9IHt9O1xuICAgICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XG4gICAgfShvYmopO1xuICB9O1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xuICB2YXIgZ2V0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIGdldEZpZWxkVmFsdWUob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBkZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXG4gIHZhciBzZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gc2V0RmllbGRWYWx1ZShvYmosIGZpZWxkLCB2YWx1ZSkge1xuICAgIGRlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgIG9ialtsYXN0RmllbGRdID0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICByZXR1cm4gZnVuY3Rpb24gaWRiTW9kZWxGYWN0b3J5KGRiLCBuYW1lLCBzb2NrZXQpIHtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXG4gICAgLy8gJF9yZW1vdGVcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGZ1bmN0aW9uIGlkYk1vZGVsKCkge31cblxuICAgIHJldHVybiBuZXdcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBDb25zdHJ1Y3RvclxuICAgIENsYXp6ZXIoaWRiTW9kZWwpXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBIZXJlbmNpYVxuICAgIC5pbmhlcml0KGlkYkV2ZW50VGFyZ2V0KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUHJvcGllZGFkZXMgc3RhdGljYXNcbiAgICAuc3RhdGljKCckZGInLCBkYikuc3RhdGljKCckbmFtZScsIG5hbWUpLnN0YXRpYygnJHNvY2tldCcsIHNvY2tldCkuc3RhdGljKCckaWQnLCB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfSkuc3RhdGljKCckZmllbGRzJywge1xuICAgICAgaWQ6IHtcbiAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgIG5hbWU6ICdpZCcsXG4gICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICB9XG4gICAgfSkuc3RhdGljKCckaW5kZXhlc1RvQ3JlYXRlJywgW10pLnN0YXRpYygnJGluc3RhbmNlcycsIHt9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGdldEtleUZyb20nLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZShkYXRhLCB0aGlzLiRpZC5rZXlQYXRoKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGFkZEluZGV4JywgZnVuY3Rpb24gKGZpZWxkcywgbmFtZSwgb3B0aW9ucykge1xuXG4gICAgICB0aGlzLiRpbmRleGVzVG9DcmVhdGUucHVzaChhcmd1bWVudHMpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGNyZWF0ZScsIGZ1bmN0aW9uIChjYikge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICB2YXIgc3RvcmUgPSB0aGl6LiRkYi4kY3JlYXRlU3RvcmUodGhpei4kbmFtZSwgdGhpei4kaWQpO1xuXG4gICAgICB0aGl6LiRpbmRleGVzVG9DcmVhdGUubWFwKGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgIHN0b3JlLiRjcmVhdGVJbmRleC5hcHBseShzdG9yZSwgYXJncyk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGNiKSBjYih0aGl6LCBzdG9yZSk7XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckZHJvcCcsIGZ1bmN0aW9uIChjYikge1xuXG4gICAgICB0aGlzLiRkYi4kZHJvcFN0b3JlKHRoaXMuJG5hbWUpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJHdyaXRlcicsIGZ1bmN0aW9uIChjYikge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICByZXR1cm4gdGhpei4kZGIuJHN0b3JlKHRoaXouJG5hbWUpLiR3cml0ZXIoY2IpLnRoZW4oZnVuY3Rpb24gKHN0b3Jlcykge1xuICAgICAgICByZXR1cm4gc3RvcmVzW3RoaXouJG5hbWVdO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRyZWFkZXInLCBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgcmV0dXJuIHRoaXouJGRiLiRzdG9yZSh0aGl6LiRuYW1lKS4kcmVhZGVyKGNiKS50aGVuKGZ1bmN0aW9uIChzdG9yZXMpIHtcbiAgICAgICAgcmV0dXJuIHN0b3Jlc1t0aGl6LiRuYW1lXTtcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckcHV0JywgZnVuY3Rpb24gKG9iaiwga2V5KSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHZhciBkYXRhID0gdGhpcy4kZ2V0VmFsdWVzKG9iaik7XG4gICAgICBhcmdzWzBdID0gZGF0YTtcblxuICAgICAgcmV0dXJuIHRoaXouJHdyaXRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS4kcHV0LmFwcGx5KHN0b3JlLCBhcmdzKS50aGVuKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gdGhpei4kZ2V0SW5zdGFuY2Uoa2V5KTtcbiAgICAgICAgICByZWNvcmQuJHNldFZhbHVlcyhkYXRhKTtcbiAgICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xuICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRhZGQnLCBmdW5jdGlvbiAob2JqLCBrZXkpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdmFyIGRhdGEgPSB0aGlzLiRnZXRWYWx1ZXMob2JqKTtcbiAgICAgIGFyZ3NbMF0gPSBkYXRhO1xuXG4gICAgICByZXR1cm4gdGhpei4kd3JpdGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRhZGQuYXBwbHkoc3RvcmUsIGFyZ3MpLnRoZW4oZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHZhciByZWNvcmQgPSB0aGl6LiRnZXRJbnN0YW5jZShrZXkpO1xuICAgICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGRhdGEpO1xuICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XG4gICAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGRlbGV0ZScsIGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgIHJldHVybiB0aGlzLiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuJGRlbGV0ZS5hcHBseShzdG9yZSwgYXJncyk7XG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGNsZWFyJywgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgIHJldHVybiB0aGlzLiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuJGNsZWFyLmFwcGx5KHN0b3JlLCBhcmdzKTtcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckZ2V0JywgZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB2YXIgcmVjb3JkID0gdGhpcy4kZ2V0SW5zdGFuY2Uoa2V5KTtcblxuICAgICAgcmVjb3JkLiRwcm9taXNlID0gdGhpei4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRnZXQuYXBwbHkoc3RvcmUsIGFyZ3MpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICByZWNvcmQuJHNldFZhbHVlcyhkYXRhKTtcbiAgICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xuICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXRLZXknLCBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICByZXR1cm4gdGhpei4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRnZXRLZXkuYXBwbHkoc3RvcmUsIGFyZ3MpO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXRBbGwnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgICAgcmVzdWx0LiRwcm9taXNlID0gdGhpei4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRnZXRBbGwuYXBwbHkoc3RvcmUsIGFyZ3MpLnRoZW4oZnVuY3Rpb24gKGFycikge1xuICAgICAgICAgIHJldHVybiBhcnIubWFwKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgcmVjb3JkID0gdGhpei4kZ2V0SW5zdGFuY2UodGhpei4kZ2V0S2V5RnJvbShkYXRhKSk7XG4gICAgICAgICAgICByZWNvcmQuJHNldFZhbHVlcyhkYXRhKTtcbiAgICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XG4gICAgICAgICAgICByZXN1bHQucHVzaChyZWNvcmQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGdldEFsbEtleXMnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgICAgcmVzdWx0LiRwcm9taXNlID0gdGhpcy4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRnZXRBbGxLZXlzLmFwcGx5KHN0b3JlLCBhcmdzKS50aGVuKGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgICByZXR1cm4gYXJyLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGNvdW50JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgcmV0dXJuIHRoaXMuJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS4kY291bnQuYXBwbHkoc3RvcmUsIGFyZ3MpO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRmaW5kJywgZnVuY3Rpb24gKGZpbHRlcnMpIHtcblxuICAgICAgcmV0dXJuIG5ldyBpZGJRdWVyeSh0aGlzLCBmaWx0ZXJzKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGdldEluc3RhbmNlJywgZnVuY3Rpb24gKGtleSkge1xuXG4gICAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcbiAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCB8fCBrZXkgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIE5vIGV4aXN0ZSBsYSBpbnN0YW5jaWEgZW50b25jZSBzZSBjcmVhXG4gICAgICBpZiAoIXRoaXMuJGluc3RhbmNlc1trZXldKSB7XG4gICAgICAgIHRoaXMuJGluc3RhbmNlc1trZXldID0gbmV3IHRoaXMoKTtcbiAgICAgICAgdGhpcy4kaW5zdGFuY2VzW2tleV0uJHNldCh0aGlzLiRpZC5rZXlQYXRoLCBrZXkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy4kaW5zdGFuY2VzW2tleV07XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEFzaWduYSBsYSBlc3BlY2lmaWNhY2nDs24gZGUgbG9zIGNhbXBvc1xuICAgIC5zdGF0aWMoJyRmaWVsZCcsIGZ1bmN0aW9uIChuYW1lLCBmaWVsZCkge1xuXG4gICAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICBmaWVsZCA9IHsgXCJ0eXBlXCI6IGZpZWxkIH07XG4gICAgICB9XG5cbiAgICAgIGZpZWxkLm5hbWUgPSBuYW1lO1xuXG4gICAgICB0aGlzLiRmaWVsZHNbbmFtZV0gPSBmaWVsZDtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEFncmVnYSBlbCBlbCBjYW1wbyBJRCBhdXRvbWF0aWNhbWVudGVcbiAgICAuc3RhdGljKCcka2V5JywgZnVuY3Rpb24gKGtleSwgYXV0b0luY3JlbWVudCwgdHlwZSkge1xuICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdib29sZWFuJykge1xuICAgICAgICBhdXRvSW5jcmVtZW50ID0ga2V5O1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkIHx8IGtleSA9PT0gbnVsbCB8fCB0eXBlb2Yga2V5ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAga2V5ID0gJ2lkJztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgYXV0b0luY3JlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHlwZSA9IGF1dG9JbmNyZW1lbnQ7XG4gICAgICAgIGF1dG9JbmNyZW1lbnQgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKGF1dG9JbmNyZW1lbnQgPT09IHVuZGVmaW5lZCB8fCBhdXRvSW5jcmVtZW50ID09PSBudWxsKSB7XG4gICAgICAgIGF1dG9JbmNyZW1lbnQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBhdXRvSW5jcmVtZW50ID09PSAnYm9vbGVhbicgfHwgdHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHlwZSA9ICdudW1iZXInO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiRpZC5rZXlQYXRoID0ga2V5O1xuICAgICAgdGhpcy4kaWQuYXV0b0luY3JlbWVudCA9IGF1dG9JbmNyZW1lbnQ7XG5cbiAgICAgIHJldHVybiB0aGlzLiRmaWVsZChrZXksIHtcbiAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgIHR5cGU6IHR5cGVcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXG4gICAgLnN0YXRpYygnJGdldFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgIHZhciB2YWx1ZXMgPSB7fTtcblxuICAgICAgT2JqZWN0LmtleXModGhpcy4kZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGdldEZpZWxkVmFsdWUoZGF0YSwgZmllbGQpO1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNldEZpZWxkVmFsdWUodmFsdWVzLCBmaWVsZCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQWdyZWdhIGVsIGVsIGNhbXBvIElEIGF1dG9tYXRpY2FtZW50ZVxuICAgIC5zdGF0aWMoJyRidWlsZCcsIGZ1bmN0aW9uIChidWlsZENhbGxiYWNrKSB7XG5cbiAgICAgIGJ1aWxkQ2FsbGJhY2sodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGlcbiAgICAuc3RhdGljKCckcmVtb3RlJywgZnVuY3Rpb24gKHVybCwgYXJncywgYWN0aW9ucykge1xuXG4gICAgICB0aGlzLiRfcmVtb3RlID0gbGJSZXNvdXJjZS5hcHBseShsYlJlc291cmNlLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFByb3BpZWRhZGVzXG4gICAgLnByb3BlcnR5KCckX3ZhbHVlcycsIHsgdmFsdWU6IG5ldyBDbGF6emVyKHt9KS5zdGF0aWMoJ2xvY2FsJywge30pLnN0YXRpYygncmVtb3RlJywge30pLmNsYXp6XG4gICAgfSkucHJvcGVydHkoJyRfdmVyc2lvbnMnLCB7IHZhbHVlOiB7fSB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxuICAgIC5tZXRob2QoJyRnZXQnLCBmdW5jdGlvbiAoZmllbGQpIHtcblxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBc2lnbmEgaW4gdmFsb3IgYSB1biBjYW1wb1xuICAgIC5tZXRob2QoJyRzZXQnLCBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XG5cbiAgICAgIHJldHVybiBzZXRGaWVsZFZhbHVlKHRoaXMsIGZpZWxkKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxuICAgIC5tZXRob2QoJyRnZXRWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICByZXR1cm4gaWRiTW9kZWwuJGdldFZhbHVlcyhkYXRhIHx8IHRoaXMpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCckZ2V0TG9jYWxWYWx1ZXMnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kX3ZhbHVlcy5sb2NhbCk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5tZXRob2QoJyRnZXRSZW1vdGVWYWx1ZXMnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kX3ZhbHVlcy5yZW1vdGUpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCckc2V0VmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXosIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5tZXRob2QoJyRzZXRMb2NhbFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRfdmFsdWVzLmxvY2FsLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCckc2V0UmVtb3RlVmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJF92YWx1ZXMucmVtb3RlLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCcka2V5JywgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUoZGF0YSwgdGhpcy4kaWQua2V5UGF0aCk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEZ1bmNpb24gcXVlIGhhY2UgZXNjdWNoYXJzIGxvcyBtZW5zYWplcyBkZWwgc29ja2V0IHBhcmEgZWwgbW9kZWxcbiAgICAubWV0aG9kKCckbGlzdGVuJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlmICghdGhpcy4kc29ja2V0KSB0aHJvdyBuZXcgRXJyb3IoJ2lkYk1vZGVsLkRvZXNOb3RIYXZlU29ja2V0SW5zdGFuY2UnKTtcblxuICAgICAgLy8gQ3JlYXIgdW5hIHN1YnNjcmlwY2lvbiBhbCBzb2NrZXQgcGFyYSBjdWFuZG8gc2UgcmVjaWJhbiBkYXRvc1xuICAgICAgLy8gcGFyYSBsYSBpbnN0YW5jaWEgYWN0dWFsXG4gICAgICB0aGlzLiRzb2NrZXQuc3Vic2NyaWJlKHtcbiAgICAgICAgbW9kZWxOYW1lOiBpZGJNb2RlbC4kbmFtZSxcbiAgICAgICAgZXZlbnROYW1lOiAndXBkYXRlJyxcbiAgICAgICAgbW9kZWxJZDogdGhpei4ka2V5KClcbiAgICAgIH0sIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgLy8gQSByZWNpYmlyIGRhdG9zIGRlbCBzb2NrZXQgYXNpZ25hciBsb3MgdmFsb3Jlc1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gRW1pdGlyIGV2ZW50byBkZSBkYXRvcyByZWNpYmlkb3IgcGFyYSBlbCBtb2RlbG9cbiAgICAgICAgICB0aGl6LiRzZXRSZW1vdGVWYWx1ZXMoZGF0YS52YWx1ZXMsIGRhdGEudmVyc2lvbik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5jbGF6ejtcbiAgfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiTW9kZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiVHJhbnNhY3Rpb25cclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCVHJhbnNhY3Rpb24gOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgICAgICBvYmplY3RTdG9yZU5hbWVzO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbk1vZGUgbW9kZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCRGF0YWJhc2UgICAgICAgIGRiO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01FeGNlcHRpb24gICAgICAgZXJyb3I7XHJcbiAqIFxyXG4gKiAgIElEQk9iamVjdFN0b3JlIG9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lKTtcclxuICogICB2b2lkICAgICAgICAgICBhYm9ydCgpO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYWJvcnQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmNvbXBsZXRlO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogfTtcclxuICogXHJcbiAqIGVudW0gSURCVHJhbnNhY3Rpb25Nb2RlIHtcclxuICogICBcInJlYWRvbmx5XCIsXHJcbiAqICAgXCJyZWFkd3JpdGVcIixcclxuICogICBcInZlcnNpb25jaGFuZ2VcIlxyXG4gKiB9O1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlN0b3JlKSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcclxuICAvLyAkX3Byb21pc2VcclxuICBcclxuICBjb25zdCBUcmFuc2FjdGlvbk1vZGUgPSBuZXcgQ2xhenplcih7fSlcclxuICAgICAgICAuc3RhdGljKCdSZWFkT25seScsICdyZWFkb25seScpXHJcbiAgICAgICAgLnN0YXRpYygnUmVhZFdyaXRlJywgJ3JlYWR3cml0ZScpXHJcbiAgICAgICAgLnN0YXRpYygnVmVyc2lvbkNoYW5nZScsICAndmVyc2lvbmNoYW5nZScpO1xyXG5cclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlRyYW5zYWN0aW9uIChtZSkge1xyXG4gICAgXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAuaW5oZXJpdChFdmVudFRhcmdldClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gU3RhdGljc1xyXG4gIC5zdGF0aWMoJ1RyYW5zYWN0aW9uTW9kZScsIFRyYW5zYWN0aW9uTW9kZS5jbGF6eilcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gR2V0dGVyc1xyXG4gIC5nZXR0ZXIoJyRkYicsICAgICAgICAgICdkYicpXHJcbiAgLmdldHRlcignJG1vZGUnLCAgICAgICAgJ21vZGUnKVxyXG4gIC5nZXR0ZXIoJyRlcnJvcicsICAgICAgICdlcnJvcicpXHJcbiAgLmdldHRlcignJHN0b3JlTmFtZXMnLCAgJ29iamVjdFN0b3JlTmFtZXMnKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gIC5oYW5kbGVyRXZlbnQoJyRhYm9ydGVkJywgICAnb25hYm9ydCcpXHJcbiAgLmhhbmRsZXJFdmVudCgnJGNvbXBsZXRlZCcsICdvbmNvbXBsZXRlJylcclxuICAuaGFuZGxlckV2ZW50KCckZmFpbGVkJywgICAgJ29uZXJyb3InKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc3RvcmUnLCBmdW5jdGlvbihuYW1lKXtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLm9iamVjdFN0b3JlLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGFib3J0JywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICB0aGlzLiRtZS5hYm9ydC5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJvcGVydHlcclxuICAucHJvcGVydHkoJyRwcm9taXNlJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZiAodGhpei4kX3Byb21pc2UpIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcclxuXHJcbiAgICAgIC8vIENyZWFyIHByb21pc2UgcGFyYSBlbCByZXF1ZXN0XHJcbiAgICAgIHRoaXouJF9wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRoaXouJGNvbXBsZXRlZChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG5ldyBDbGF6emVyKHRoaXouJF9wcm9taXNlKS5zdGF0aWMoJyR0cmFuc2FjdGlvbicsIHRoaXopO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYlRyYW5zYWN0aW9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiVHJhbnNhY3Rpb25cclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCVHJhbnNhY3Rpb24gOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgICAgICBvYmplY3RTdG9yZU5hbWVzO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbk1vZGUgbW9kZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCRGF0YWJhc2UgICAgICAgIGRiO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01FeGNlcHRpb24gICAgICAgZXJyb3I7XHJcbiAqIFxyXG4gKiAgIElEQk9iamVjdFN0b3JlIG9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lKTtcclxuICogICB2b2lkICAgICAgICAgICBhYm9ydCgpO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYWJvcnQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmNvbXBsZXRlO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogfTtcclxuICogXHJcbiAqIGVudW0gSURCVHJhbnNhY3Rpb25Nb2RlIHtcclxuICogICBcInJlYWRvbmx5XCIsXHJcbiAqICAgXCJyZWFkd3JpdGVcIixcclxuICogICBcInZlcnNpb25jaGFuZ2VcIlxyXG4gKiB9O1xyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlN0b3JlKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXG4gIC8vICRfcHJvbWlzZVxuXG4gIHZhciBUcmFuc2FjdGlvbk1vZGUgPSBuZXcgQ2xhenplcih7fSkuc3RhdGljKCdSZWFkT25seScsICdyZWFkb25seScpLnN0YXRpYygnUmVhZFdyaXRlJywgJ3JlYWR3cml0ZScpLnN0YXRpYygnVmVyc2lvbkNoYW5nZScsICd2ZXJzaW9uY2hhbmdlJyk7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJUcmFuc2FjdGlvbihtZSkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTdGF0aWNzXG4gIC5zdGF0aWMoJ1RyYW5zYWN0aW9uTW9kZScsIFRyYW5zYWN0aW9uTW9kZS5jbGF6eilcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR2V0dGVyc1xuICAuZ2V0dGVyKCckZGInLCAnZGInKS5nZXR0ZXIoJyRtb2RlJywgJ21vZGUnKS5nZXR0ZXIoJyRlcnJvcicsICdlcnJvcicpLmdldHRlcignJHN0b3JlTmFtZXMnLCAnb2JqZWN0U3RvcmVOYW1lcycpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGhhbmRsZXJzXG4gIC5oYW5kbGVyRXZlbnQoJyRhYm9ydGVkJywgJ29uYWJvcnQnKS5oYW5kbGVyRXZlbnQoJyRjb21wbGV0ZWQnLCAnb25jb21wbGV0ZScpLmhhbmRsZXJFdmVudCgnJGZhaWxlZCcsICdvbmVycm9yJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHN0b3JlJywgZnVuY3Rpb24gKG5hbWUpIHtcblxuICAgIHJldHVybiBuZXcgaWRiU3RvcmUodGhpcy4kbWUub2JqZWN0U3RvcmUuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckYWJvcnQnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLiRtZS5hYm9ydC5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUHJvcGVydHlcbiAgLnByb3BlcnR5KCckcHJvbWlzZScsIHtcblxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgaWYgKHRoaXouJF9wcm9taXNlKSByZXR1cm4gdGhpei4kX3Byb21pc2U7XG5cbiAgICAgIC8vIENyZWFyIHByb21pc2UgcGFyYSBlbCByZXF1ZXN0XG4gICAgICB0aGl6LiRfcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdGhpei4kY29tcGxldGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xuICAgICAgICB9KS4kZmFpbGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJlamVjdChldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIG5ldyBDbGF6emVyKHRoaXouJF9wcm9taXNlKS5zdGF0aWMoJyR0cmFuc2FjdGlvbicsIHRoaXopO1xuXG4gICAgICByZXR1cm4gdGhpei4kX3Byb21pc2U7XG4gICAgfVxuXG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiVHJhbnNhY3Rpb24uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiUXVlcnlcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplcikgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiUXVlcnkgKG1vZGVsLCBxdWVyeSkge1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpXHJcbiAgICAgIC5zdGF0aWMoJyRtb2RlbCcsIG1vZGVsKVxyXG4gICAgICAuc3RhdGljKCckcXVlcnknLCBxdWVyeSlcclxuICAgICAgO1xyXG5cclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFN0YXRpY1xyXG4gIC5wcm9wZXJ0eSgnJHJlc3VsdCcsIHsgdmFsdWU6IFtdIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIG1ldGhvZFxyXG4gIC5tZXRob2QoJyRnZXRSZXN1bHQnLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgaWYgKCF0aGl6LiRyZXN1bHQuJHByb21pc2UpIHtcclxuXHJcbiAgICAgIHRoaXouJHJlc3VsdC4kcHJvbWlzZSA9IHRoaXouJG1vZGVsLiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgICAgY29uc3QgcnEgPSBzdG9yZS4kb3BlbkN1cnNvcigpO1xyXG4gICAgICAgICAgcnEuJHN1Y2Nlc3MoZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjdXJzb3IgPSBycS4kbWUucmVzdWx0O1xyXG4gICAgICAgICAgICBpZiAoIWN1cnNvcikgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlY29yZCA9IHRoaXouJG1vZGVsLiRnZXRJbnN0YW5jZShjdXJzb3Iua2V5KTtcclxuICAgICAgICAgICAgcmVjb3JkLiRzZXRWYWx1ZXMoY3Vyc29yLnZhbHVlKTtcclxuICAgICAgICAgICAgcmVjb3JkLiRzZXRMb2NhbFZhbHVlcyhjdXJzb3IudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGl6LiRyZXN1bHQucHVzaChyZWNvcmQpO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChyZWNvcmQpO1xyXG5cclxuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XHJcblxyXG4gICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAuJGZhaWxlZChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGV2ZW50KTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpei4kcmVzdWx0O1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJRdWVyeVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyKSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJRdWVyeShtb2RlbCwgcXVlcnkpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1vZGVsJywgbW9kZWwpLnN0YXRpYygnJHF1ZXJ5JywgcXVlcnkpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTdGF0aWNcbiAgLnByb3BlcnR5KCckcmVzdWx0JywgeyB2YWx1ZTogW10gfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gbWV0aG9kXG4gIC5tZXRob2QoJyRnZXRSZXN1bHQnLCBmdW5jdGlvbiAoY2IpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICBpZiAoIXRoaXouJHJlc3VsdC4kcHJvbWlzZSkge1xuXG4gICAgICB0aGl6LiRyZXN1bHQuJHByb21pc2UgPSB0aGl6LiRtb2RlbC4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIHZhciBycSA9IHN0b3JlLiRvcGVuQ3Vyc29yKCk7XG4gICAgICAgICAgcnEuJHN1Y2Nlc3MoZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBycS4kbWUucmVzdWx0O1xuICAgICAgICAgICAgaWYgKCFjdXJzb3IpIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XG5cbiAgICAgICAgICAgIHZhciByZWNvcmQgPSB0aGl6LiRtb2RlbC4kZ2V0SW5zdGFuY2UoY3Vyc29yLmtleSk7XG4gICAgICAgICAgICByZWNvcmQuJHNldFZhbHVlcyhjdXJzb3IudmFsdWUpO1xuICAgICAgICAgICAgcmVjb3JkLiRzZXRMb2NhbFZhbHVlcyhjdXJzb3IudmFsdWUpO1xuICAgICAgICAgICAgdGhpei4kcmVzdWx0LnB1c2gocmVjb3JkKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHJlY29yZCk7XG5cbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0pLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICByZWplY3QoZXZlbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGl6LiRyZXN1bHQ7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaW8sICRsb2cpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcclxuICAvLyAkc29ja2V0XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiU29ja2V0KHVybCwgYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCl7XHJcblxyXG4gICAgbmV3IENsYXp6ZXIodGhpcylcclxuICAgICAgLnN0YXRpYygnJHVybCcsIHVybCB8fCBpZGJTb2NrZXQuJGRlZlVybFNlcnZlcilcclxuICAgICAgLnN0YXRpYygnJGFjY2Vzc1Rva2VuSWQnLCBhY2Nlc3NUb2tlbklkIHx8IGlkYlNvY2tldC4kZGVmQWNjZXNzVG9rZW5JZClcclxuICAgICAgLnN0YXRpYygnJGN1cnJlbnRVc2VySWQnLCBjdXJyZW50VXNlcklkIHx8IGlkYlNvY2tldC4kZGVmQ3VycmVudFVzZXJJZCk7XHJcblxyXG4gICAgdGhpcy4kY29ubmVjdCgpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAucHJvcGVydHkoJyRfbGlzdGVuZXJzJywgeyB2YWx1ZTpbXSB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXHJcbiAgLm1ldGhvZCgnJGNvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8gQ3JlYXRpbmcgY29ubmVjdGlvbiB3aXRoIHNlcnZlclxyXG4gICAgY29uc3Qgc29ja2V0ID0gdGhpcy4kc29ja2V0ID0gaW8uY29ubmVjdCh0aGlzLiR1cmwpO1xyXG5cclxuICAgIC8vIFRoaXMgcGFydCBpcyBvbmx5IGZvciBsb2dpbiB1c2VycyBmb3IgYXV0aGVudGljYXRlZCAkc29ja2V0IGNvbm5lY3Rpb24gYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlci5cclxuICAgIC8vIElmIHlvdSBhcmUgbm90IHVzaW5nIGxvZ2luIHBhZ2UgaW4geW91IHdlYnNpdGUgdGhlbiB5b3Ugc2hvdWxkIHJlbW92ZSByZXN0IHBpZWNlIG9mIGNvZGUuLlxyXG4gICAgc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKXtcclxuICAgICAgJGxvZy5sb2coJ2Nvbm5lY3RlZCcpO1xyXG5cclxuICAgICAgc29ja2V0LmVtaXQoJ2F1dGhlbnRpY2F0aW9uJywge1xyXG4gICAgICAgIGlkOiB0aGlzLiRhY2Nlc3NUb2tlbklkLFxyXG4gICAgICAgIHVzZXJJZDogdGhpcy4kY3VycmVudFVzZXJJZCxcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICBzb2NrZXQub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyB1c2UgdGhlICRzb2NrZXQgYXMgdXN1YWxcclxuICAgICAgICAkbG9nLmxvZygnVXNlciBpcyBhdXRoZW50aWNhdGVkJyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc3Vic2NyaWJlJywgZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XHJcblxyXG4gICAgbGV0IG5hbWUgPSBvcHRpb25zLm1vZGVsTmFtZSArICcuJyArIG9wdGlvbnMuZXZlbnROYW1lO1xyXG5cclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tb2RlbElkID09PSAnbnVtYmVyJykge1xyXG4gICAgICBuYW1lID0gbmFtZSArICcuJyArIG9wdGlvbnMubW9kZWxJZDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLiRzb2NrZXQub24obmFtZSwgY2IpO1xyXG4gICAgXHJcbiAgICAvL1B1c2ggdGhlIGNvbnRhaW5lci4uXHJcbiAgICB0aGlzLiRwdXNoTGlzdGVuZXIobmFtZSwgY2IpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckcHVzaExpc3RlbmVyJywgZnVuY3Rpb24gKG5hbWUsIGNiKSB7XHJcblxyXG4gICAgdGhpcy4kX2xpc3RlbmVycy5wdXNoKG5hbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckdW5zdWJzY3JpYmUnLGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lKSB7XHJcblxyXG4gICAgdGhpcy4kc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTsgIFxyXG4gICAgdmFyIGlkeCA9IHRoaXMuJF9saXN0ZW5lcnMuaW5kZXhPZihzdWJzY3JpcHRpb25OYW1lKTtcclxuICAgIGlmIChpZHggIT0gLTEpe1xyXG4gICAgICB0aGlzLiRfbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgfVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBc2lnbmEgbGEgVVJMIGRlIHNlcnZpZG9yIHBvciBkZWZlY3RvXHJcbiAgLnN0YXRpYygnJHNldFVybFNlcnZlcicsIGZ1bmN0aW9uICh1cmwpIHtcclxuXHJcbiAgICB0aGlzLiRkZWZVcmxTZXJ2ZXIgPSB1cmw7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQVNpZ25hIGxhcyBjcmVkZW5jaWFsZXMgcG9yIGRlZmVjdG9cclxuICAuc3RhdGljKCckc2V0Q3JlZGVudGlhbHMnLCBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCkge1xyXG5cclxuICAgIHRoaXMuJGRlZkFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xyXG4gICAgdGhpcy4kZGVmQ3VycmVudFVzZXJJZCA9IGN1cnJlbnRVc2VySWQ7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC4kc2V0VXJsU2VydmVyKG51bGwpXHJcbiAgLiRzZXRDcmVkZW50aWFscyhudWxsLCBudWxsKTtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJTb2NrZXQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyLCBpbywgJGxvZykge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxuICAvLyAkc29ja2V0XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJTb2NrZXQodXJsLCBhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyR1cmwnLCB1cmwgfHwgaWRiU29ja2V0LiRkZWZVcmxTZXJ2ZXIpLnN0YXRpYygnJGFjY2Vzc1Rva2VuSWQnLCBhY2Nlc3NUb2tlbklkIHx8IGlkYlNvY2tldC4kZGVmQWNjZXNzVG9rZW5JZCkuc3RhdGljKCckY3VycmVudFVzZXJJZCcsIGN1cnJlbnRVc2VySWQgfHwgaWRiU29ja2V0LiRkZWZDdXJyZW50VXNlcklkKTtcblxuICAgIHRoaXMuJGNvbm5lY3QoKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLnByb3BlcnR5KCckX2xpc3RlbmVycycsIHsgdmFsdWU6IFtdIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbmVjdGFyc2UgYWwgc2Vydmlkb3JcbiAgLm1ldGhvZCgnJGNvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyBDcmVhdGluZyBjb25uZWN0aW9uIHdpdGggc2VydmVyXG4gICAgdmFyIHNvY2tldCA9IHRoaXMuJHNvY2tldCA9IGlvLmNvbm5lY3QodGhpcy4kdXJsKTtcblxuICAgIC8vIFRoaXMgcGFydCBpcyBvbmx5IGZvciBsb2dpbiB1c2VycyBmb3IgYXV0aGVudGljYXRlZCAkc29ja2V0IGNvbm5lY3Rpb24gYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlci5cbiAgICAvLyBJZiB5b3UgYXJlIG5vdCB1c2luZyBsb2dpbiBwYWdlIGluIHlvdSB3ZWJzaXRlIHRoZW4geW91IHNob3VsZCByZW1vdmUgcmVzdCBwaWVjZSBvZiBjb2RlLi5cbiAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkbG9nLmxvZygnY29ubmVjdGVkJyk7XG5cbiAgICAgIHNvY2tldC5lbWl0KCdhdXRoZW50aWNhdGlvbicsIHtcbiAgICAgICAgaWQ6IHRoaXMuJGFjY2Vzc1Rva2VuSWQsXG4gICAgICAgIHVzZXJJZDogdGhpcy4kY3VycmVudFVzZXJJZFxuICAgICAgfSk7XG5cbiAgICAgIHNvY2tldC5vbignYXV0aGVudGljYXRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdXNlIHRoZSAkc29ja2V0IGFzIHVzdWFsXG4gICAgICAgICRsb2cubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckc3Vic2NyaWJlJywgZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XG5cbiAgICB2YXIgbmFtZSA9IG9wdGlvbnMubW9kZWxOYW1lICsgJy4nICsgb3B0aW9ucy5ldmVudE5hbWU7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMubW9kZWxJZCA9PT0gJ251bWJlcicpIHtcbiAgICAgIG5hbWUgPSBuYW1lICsgJy4nICsgb3B0aW9ucy5tb2RlbElkO1xuICAgIH1cblxuICAgIHRoaXMuJHNvY2tldC5vbihuYW1lLCBjYik7XG5cbiAgICAvL1B1c2ggdGhlIGNvbnRhaW5lci4uXG4gICAgdGhpcy4kcHVzaExpc3RlbmVyKG5hbWUsIGNiKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHB1c2hMaXN0ZW5lcicsIGZ1bmN0aW9uIChuYW1lLCBjYikge1xuXG4gICAgdGhpcy4kX2xpc3RlbmVycy5wdXNoKG5hbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckdW5zdWJzY3JpYmUnLCBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSkge1xuXG4gICAgdGhpcy4kc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTtcbiAgICB2YXIgaWR4ID0gdGhpcy4kX2xpc3RlbmVycy5pbmRleE9mKHN1YnNjcmlwdGlvbk5hbWUpO1xuICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgIHRoaXMuJF9saXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBc2lnbmEgbGEgVVJMIGRlIHNlcnZpZG9yIHBvciBkZWZlY3RvXG4gIC5zdGF0aWMoJyRzZXRVcmxTZXJ2ZXInLCBmdW5jdGlvbiAodXJsKSB7XG5cbiAgICB0aGlzLiRkZWZVcmxTZXJ2ZXIgPSB1cmw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXG4gIC5zdGF0aWMoJyRzZXRDcmVkZW50aWFscycsIGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XG5cbiAgICB0aGlzLiRkZWZBY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICB0aGlzLiRkZWZDdXJyZW50VXNlcklkID0gY3VycmVudFVzZXJJZDtcbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC4kc2V0VXJsU2VydmVyKG51bGwpLiRzZXRDcmVkZW50aWFscyhudWxsLCBudWxsKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGIgKG1vZHVsZSkge1xyXG5cclxuICAvLyBEdnVlbHZlIGVsIGhvc3QgZGUgdW5hIFVSTFxyXG4gIGZ1bmN0aW9uIGdldEhvc3QodXJsKSB7XHJcbiAgICBjb25zdCBtID0gdXJsLm1hdGNoKC9eKD86aHR0cHM/Oik/XFwvXFwvKFteXFwvXSspLyk7XHJcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgbGV0IHVybEJhc2VIb3N0ID0gbG9jYXRpb24uaG9zdDtcclxuXHJcbiAgY29uc3QgbGJBdXRoID0gZnVuY3Rpb24oKSB7ICduZ0luamVjdCdcclxuICAgIGNvbnN0IHByb3BzID0gWydhY2Nlc3NUb2tlbklkJywgJ2N1cnJlbnRVc2VySWQnLCAncmVtZW1iZXJNZSddO1xyXG4gICAgY29uc3QgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xyXG4gICAgXHJcbiAgICAvLyBOb3RlOiBMb2NhbFN0b3JhZ2UgY29udmVydHMgdGhlIHZhbHVlIHRvIHN0cmluZ1xyXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxyXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAnJztcclxuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcclxuICAgICAgY29uc3Qga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xyXG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICB0aGl6W25hbWVdID0gbG9hZChuYW1lKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGl6LnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgc2F2ZShzdG9yYWdlLCBuYW1lLCB0aGl6W25hbWVdKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2V0VXNlciA9IGZ1bmN0aW9uKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IHVzZXJJZDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSB1c2VyRGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclVzZXIgPSBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHRoaXouYWNjZXNzVG9rZW5JZCA9IG51bGw7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IG51bGw7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclN0b3JhZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgc2F2ZShzZXNzaW9uU3RvcmFnZSwgbmFtZSwgbnVsbCk7XHJcbiAgICAgICAgc2F2ZShsb2NhbFN0b3JhZ2UsIG5hbWUsIG51bGwpO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBsYkF1dGgoKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24oJHEsIGxiQXV0aCkgeyAnbmdJbmplY3QnO1xyXG4gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbihjb25maWcpIHtcclxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV4dGVybmFsIHJlcXVlc3RzXHJcbiAgICAgICAgY29uc3QgaG9zdCA9IGdldEhvc3QoY29uZmlnLnVybCk7XHJcbiAgICAgICAgaWYgKGhvc3QgJiYgaG9zdCAhPT0gdXJsQmFzZUhvc3QpIHtcclxuICAgICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGJBdXRoLmFjY2Vzc1Rva2VuSWQpIHtcclxuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzW2F1dGhIZWFkZXJdID0gbGJBdXRoLmFjY2Vzc1Rva2VuSWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuX19pc0dldEN1cnJlbnRVc2VyX18pIHtcclxuICAgICAgICAgIC8vIFJldHVybiBhIHN0dWIgNDAxIGVycm9yIGZvciBVc2VyLmdldEN1cnJlbnQoKSB3aGVuXHJcbiAgICAgICAgICAvLyB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpblxyXG4gICAgICAgICAgY29uc3QgcmVzID0ge1xyXG4gICAgICAgICAgICBib2R5OiB7IGVycm9yOiB7IHN0YXR1czogNDAxIH19LFxyXG4gICAgICAgICAgICBzdGF0dXM6IDQwMSxcclxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICB9O1xyXG5cclxuICBjb25zdCBsYlJlc291cmNlID0gZnVuY3Rpb24oKSB7ICduZ0luamVjdCc7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHVybEJhc2U6IFwiL2FwaVwiLFxyXG4gICAgICBhdXRoSGVhZGVyOiAnYXV0aG9yaXphdGlvbicsXHJcbiAgICB9O1xyXG5cclxuICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXIgVGhlIGhlYWRlciBuYW1lIHRvIHVzZSwgZS5nLiBgWC1BY2Nlc3MtVG9rZW5gXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENvbmZpZ3VyZSB0aGUgUkVTVCB0cmFuc3BvcnQgdG8gdXNlIGEgZGlmZmVyZW50IGhlYWRlciBmb3Igc2VuZGluZ1xyXG4gICAgICogdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLiBJdCBpcyBzZW50IGluIHRoZSBgQXV0aG9yaXphdGlvbmAgaGVhZGVyXHJcbiAgICAgKiBieSBkZWZhdWx0LlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldEF1dGhIZWFkZXIgPSBmdW5jdGlvbihoZWFkZXIpIHtcclxuICAgICAgb3B0aW9ucy5hdXRoSGVhZGVyID0gaGVhZGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIGhlYWRlciBuYW1lIHRoYXQgaXMgdXNlZCBmb3Igc2VuZGluZyB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uXHJcbiAgICAgKi9cclxuICAgIHRoaXouZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHVzZSwgZS5nLiBgL2FwaWAgb3IgYC8vZXhhbXBsZS5jb20vYXBpYC5cclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ2hhbmdlIHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gQnkgZGVmYXVsdCwgdGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cclxuICAgIHRoaXouc2V0VXJsQmFzZSA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICBvcHRpb25zLnVybEJhc2UgPSB1cmw7XHJcbiAgICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIFRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldFVybEJhc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei4kZ2V0ID0gZnVuY3Rpb24oJHJlc291cmNlKSB7ICduZ0luamVjdCc7XHJcblxyXG4gICAgICBjb25zdCBsYlJlc291cmNlID0gZnVuY3Rpb24odXJsLCBwYXJhbXMsIGFjdGlvbnMpIHtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMoYWN0aW9ucykubWFwKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgIGFjdGlvbnNba2V5XS5vcmlnaW5hbFVybCA9IGFjdGlvbnNba2V5XS51cmw7XHJcbiAgICAgICAgICBhY3Rpb25zW2tleV0udXJsID0gb3B0aW9ucy51cmxCYXNlICsgYWN0aW9uc1trZXldLnVybDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzb3VyY2UgPSAkcmVzb3VyY2Uob3B0aW9ucy51cmxCYXNlICsgdXJsLCBwYXJhbXMsIGFjdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBBbmd1bGFyIGFsd2F5cyBjYWxscyBQT1NUIG9uICRzYXZlKClcclxuICAgICAgICAvLyBUaGlzIGhhY2sgaXMgYmFzZWQgb25cclxuICAgICAgICAvLyBodHRwOi8va2lya2J1c2hlbGwubWUvYW5ndWxhci1qcy11c2luZy1uZy1yZXNvdXJjZS1pbi1hLW1vcmUtcmVzdGZ1bC1tYW5uZXIvXHJcbiAgICAgICAgcmVzb3VyY2UucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24oc3VjY2VzcywgZXJyb3IpIHtcclxuICAgICAgICAgIC8vIEZvcnR1bmF0ZWx5LCBMb29wQmFjayBwcm92aWRlcyBhIGNvbnZlbmllbnQgYHVwc2VydGAgbWV0aG9kXHJcbiAgICAgICAgICAvLyB0aGF0IGV4YWN0bHkgZml0cyBvdXIgbmVlZHMuXHJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSByZXNvdXJjZS51cHNlcnQuY2FsbCh0aGlzLCB7fSwgdGhpcywgc3VjY2VzcywgZXJyb3IpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC4kcHJvbWlzZSB8fCByZXN1bHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2U7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsYlJlc291cmNlLmdldFVybEJhc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgICAgfTtcclxuICAgIFxyXG4gICAgICByZXR1cm4gbGJSZXNvdXJjZTtcclxuXHJcbiAgICB9O1xyXG5cclxuICB9XHJcblxyXG4gIHJldHVybiBtb2R1bGVcclxuICAgIC5mYWN0b3J5KCdsYkF1dGgnLCBsYkF1dGgpXHJcbiAgICAucHJvdmlkZXIoJ2xiUmVzb3VyY2UnLCBsYlJlc291cmNlKVxyXG4gICAgLmZhY3RvcnkoJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicsIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcilcclxuICAgIC5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24oJGh0dHBQcm92aWRlcikgeyAnbmdJbmplY3QnO1xyXG4gICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InKTtcclxuICAgIH1dKTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGxiO1xuZnVuY3Rpb24gbGIobW9kdWxlKSB7XG5cbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcbiAgZnVuY3Rpb24gZ2V0SG9zdCh1cmwpIHtcbiAgICB2YXIgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xuICAgIHJldHVybiBtID8gbVsxXSA6IG51bGw7XG4gIH1cblxuICB2YXIgdXJsQmFzZUhvc3QgPSBsb2NhdGlvbi5ob3N0O1xuXG4gIHZhciBsYkF1dGggPSBmdW5jdGlvbiBsYkF1dGgoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcbiAgICB2YXIgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xuXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcbiAgICAvLyBXZSBhcmUgdXNpbmcgZW1wdHkgc3RyaW5nIGFzIGEgbWFya2VyIGZvciBudWxsL3VuZGVmaW5lZCB2YWx1ZXMuXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XG4gICAgICAgIHN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWQobmFtZSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Vba2V5XSB8fCBzZXNzaW9uU3RvcmFnZVtrZXldIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXpbbmFtZV0gPSBsb2FkKG5hbWUpO1xuICAgICAgfSk7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdmFyIHN0b3JhZ2UgPSB0aGl6LnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzdG9yYWdlLCBuYW1lLCB0aGl6W25hbWVdKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgdXNlcklkLCB1c2VyRGF0YSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IHVzZXJJZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gbnVsbDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBzYXZlKHNlc3Npb25TdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgICAgc2F2ZShsb2NhbFN0b3JhZ2UsIG5hbWUsIG51bGwpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XG4gIH07XG5cbiAgdmFyIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcigkcSwgbGJBdXRoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHJldHVybiB7XG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV4dGVybmFsIHJlcXVlc3RzXG4gICAgICAgIHZhciBob3N0ID0gZ2V0SG9zdChjb25maWcudXJsKTtcbiAgICAgICAgaWYgKGhvc3QgJiYgaG9zdCAhPT0gdXJsQmFzZUhvc3QpIHtcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XG4gICAgICAgICAgY29uZmlnLmhlYWRlcnNbYXV0aEhlYWRlcl0gPSBsYkF1dGguYWNjZXNzVG9rZW5JZDtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuX19pc0dldEN1cnJlbnRVc2VyX18pIHtcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxuICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIHVzZXIgbG9nZ2VkIGluXG4gICAgICAgICAgdmFyIHJlcyA9IHtcbiAgICAgICAgICAgIGJvZHk6IHsgZXJyb3I6IHsgc3RhdHVzOiA0MDEgfSB9LFxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXG4gICAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGZ1bmN0aW9uIGhlYWRlcnMoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICB2YXIgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uIGxiUmVzb3VyY2UoKSB7XG4gICAgJ25nSW5qZWN0JztcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHVybEJhc2U6IFwiL2FwaVwiLFxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nXG4gICAgfTtcblxuICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlciBUaGUgaGVhZGVyIG5hbWUgdG8gdXNlLCBlLmcuIGBYLUFjY2Vzcy1Ub2tlbmBcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ29uZmlndXJlIHRoZSBSRVNUIHRyYW5zcG9ydCB0byB1c2UgYSBkaWZmZXJlbnQgaGVhZGVyIGZvciBzZW5kaW5nXHJcbiAgICAgKiB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uIEl0IGlzIHNlbnQgaW4gdGhlIGBBdXRob3JpemF0aW9uYCBoZWFkZXJcclxuICAgICAqIGJ5IGRlZmF1bHQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoaGVhZGVyKSB7XG4gICAgICBvcHRpb25zLmF1dGhIZWFkZXIgPSBoZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgaGVhZGVyIG5hbWUgdGhhdCBpcyB1c2VkIGZvciBzZW5kaW5nIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdXNlLCBlLmcuIGAvYXBpYCBvciBgLy9leGFtcGxlLmNvbS9hcGlgLlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDaGFuZ2UgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBCeSBkZWZhdWx0LCB0aGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouc2V0VXJsQmFzZSA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgIG9wdGlvbnMudXJsQmFzZSA9IHVybDtcbiAgICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIFRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICB9O1xuXG4gICAgdGhpei4kZ2V0ID0gZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xuICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoYWN0aW9ucykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICAgIGFjdGlvbnNba2V5XS51cmwgPSBvcHRpb25zLnVybEJhc2UgKyBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSAkcmVzb3VyY2Uob3B0aW9ucy51cmxCYXNlICsgdXJsLCBwYXJhbXMsIGFjdGlvbnMpO1xuXG4gICAgICAgIC8vIEFuZ3VsYXIgYWx3YXlzIGNhbGxzIFBPU1Qgb24gJHNhdmUoKVxuICAgICAgICAvLyBUaGlzIGhhY2sgaXMgYmFzZWQgb25cbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xuICAgICAgICByZXNvdXJjZS5wcm90b3R5cGUuJHNhdmUgPSBmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxuICAgICAgICAgIC8vIHRoYXQgZXhhY3RseSBmaXRzIG91ciBuZWVkcy5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LiRwcm9taXNlIHx8IHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gbW9kdWxlLmZhY3RvcnkoJ2xiQXV0aCcsIGxiQXV0aCkucHJvdmlkZXIoJ2xiUmVzb3VyY2UnLCBsYlJlc291cmNlKS5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpLmNvbmZpZyhbJyRodHRwUHJvdmlkZXInLCBmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InKTtcbiAgfV0pO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2xiLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==