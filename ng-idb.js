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
	(0, _lb2.default)(angular.module('ng.idb', [])).constant('io', io).service('Clazzer', _Clazzer2.default).constant('idbVersion', '0.0.1').service('idbRequest', _idbRequest2.default).service('idbOpenDBRequest', _idbOpenDBRequest2.default).service('idbConsultant', _idbConsultant2.default).service('idb', _idb2.default).service('idbStore', _idbStore2.default).service('idbIndex', _idbIndex2.default).service('idbEventTarget', _idbEventTarget2.default).service('idbModel', _idbModel2.default).service('idbSocket', _idbSocket2.default).service('idbQuery', _idbQuery2.default).service('idbTransaction', _idbTransaction2.default);
	
	//   .service('socket', function(idbSocket, API_ROOT) { 'ngInject'
	
	//     return new idbSocket(
	//       'http://localhost:3200/',
	//       localStorage['$LoopBack$accessTokenId'],
	//       localStorage['$LoopBack$currentUserId']
	//     );
	
	//   })
	
	//   .service('db2', function (idb, socket) { 'ngInject';
	
	//     const db = new idb('aaa', 4, socket)
	
	//     db
	//       .$bind('opened', function () { console.log(['$opened']); })
	//       .$aborted(function () { console.log(['$aborted']); })
	//       .$closed(function () { console.log(['$closed']); })
	//       .$error(function () { console.log(['$error']); })
	//       .$versionChanged(function () { console.log(['$versionChanged']); })
	
	//       .$automigration({
	//         1: function (db) {
	//           db.$model('Trabajador')
	//             .$create()
	//         },
	//         2: function (db) {
	//           db.$model('Empleado')
	
	//             .$addIndex(['nombres', 'apellidos'])
	//             .$addIndex('nacimiento')
	
	//             .$create(function (model, store) {
	
	//               store.$createIndex('ci');
	//               store.$createIndex('cod');
	
	//             })
	//         },
	//         3: function (db) {
	//           db.$model('Trabajador')
	//             .$drop()
	//         }
	//       })
	
	//       .$drop().then(function (db) {
	//         db.$open();
	//       });
	
	//     return db;
	
	//   })
	
	//   .service('Empleado', function (db2) { 'ngInject';
	//     return window.Empleado = db2.$model('Empleado')
	//       .$field('cod',        { "type": "string", "required": true })
	//       .$field('ci',         { "type": "string", "required": true })
	//       .$field('nombres',    { "type": "string", "required": true })
	//       .$field('apellidos',  { "type": "string", "required": true })
	//       .$field('nacimiento', { "type": "date" })
	//       .$field('ingreso',    { "type": "date" })
	//       .$field('direccion',  { "type": "string"})
	//       .$remote(
	//         '/trabajadores/:id',
	//         { 'id': '@id' },
	//         {
	//           'find':   { url: '/trabajadores/_findWithVersion', method: 'GET', isArray: true, },
	//           // 'create': { url: '/trabajadores', method: 'POST', },
	//         }
	//       )
	//       // .versioning()
	//       .$build(function (Empleado) {
	
	//         Empleado.prototype.$constructor = function (data) {
	
	//         };
	
	//         Empleado.prototype.getNombre = function (){
	//           return this.nombres + ' ' + this.apellidos;
	//         };
	
	//       });
	//   })
	
	// .run(function (db2, Empleado) { 'ngInject';
	
	//   Empleado.$put({
	//     id: 1,
	//     'nombres': 'Alexander'
	//   }).then(function (record) {
	//     //
	//     console.log(['put', record.nombres]);
	//   }).then(function () {
	//     return Empleado.$put({
	//       id: 2,
	//       'nombres': 'Guillemo'
	//     }).then(function (record) {
	//       console.log(['put', record.nombres]);
	//     });
	//   }).then(function () {
	//     return Empleado.$put({
	//       id: 2,
	//       'apellidos': 'Seminario'
	//     }).then(function (record) {
	//       console.log(['put', record.nombres]);
	//     });
	//   }).then(function () {
	//     return Empleado.$put({
	//       id: 4,
	//       'nombres': 'Axel'
	//     }).then(function (record) {
	//       console.log(['put', record.nombres]);
	//     });
	//   }).then(function () {
	//     return Empleado.$put({
	//       'nombres': 'Gabriel'
	//     }).then(function (record) {
	//       console.log(['put', record.nombres]);
	//     });
	//   }).then(function () {
	//     return Empleado.$add({
	//       'nombres': 'Evert'
	//     }).then(function (record) {
	//       console.log(['put', record.nombres]);
	//     });
	//   }).then(function () {
	//     const r = Empleado.$get(2);
	//     console.log(['get', r])
	//     return r.$promise;
	//   }).then(function () {
	//     const r = Empleado.$find().$getResult();
	//     console.log(['find', r]);
	//     return r.$promise;
	//   }).then(function () {
	//     const r = Empleado.$getAll();
	//     console.log(['getAll', r]);
	//     return r.$promise;
	//   }).then(function () {
	//     return Empleado.$count().then(function (count) {
	//       console.log(['count', count]);
	//     });
	//   }).then(function () {
	//     const r = Empleado.$getAllKeys();
	//     console.log(['getAllKeys', r]);
	//     return r.$promise;
	//   }).then(function () {
	//     return Empleado.$delete(2).then(function () {
	//       console.log(['delete']);
	//     });
	//   }).then(function () {
	//     return Empleado.$count().then(function (count) {
	//       console.log(['count', count]);
	//     });
	//   }).then(function () {
	//     return Empleado.$clear().then(function () {
	//       console.log(['clear']);
	//     });
	//   }).then(function () {
	//     return Empleado.$count().then(function (count) {
	//       console.log(['count', count]);
	//     });
	//   }).then(function () {
	//     db2.$close();
	//   }).then(function () {
	//     db2.$open().then(function () {
	//       db2.$close();
	//     });
	//   });
	
	// });

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
	  .method('$migrate', function (modelName) {
	    var thiz = this;
	
	    if (!modelName) {
	      return Object.keys(thiz.$_models).map(function (modelName) {
	        return thiz.$migrate(modelName);
	      });
	    }
	
	    return thiz.$model(modelName).$create();
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
	    // $_versioning
	
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
	    // Control de versiones del modelo
	    .static('$versioning', function (modelName, cb) {
	      if (!this.$_versioning) {
	
	        if (typeof modelName === 'function') {
	          cb = modelName;
	          modelName = undefined;
	        }
	
	        // Si el model no tiene nombre se agrega
	        if (!modelName) {
	          modelName = this.$name + '_versioning';
	        }
	
	        // Crear modelo para el manejo de datos
	        this.$_versioning = this.$db.$model(modelName).$key(this.$id.keyPath, true).$field('hash', {
	          'type': 'string',
	          'required': true
	        });
	      }
	
	      if (cb) cb(this.$_versioning);
	
	      return this;
	    })
	
	    // ---------------------------------------------------------------------------
	    // Configura el remote api
	    .static('$remote', function (url, args, actions) {
	
	      this.$_remote = lbResource.apply(lbResource, arguments);
	      return this;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjQ4ZGIwZDk2Njc2YWZmNWU5M2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy9DbGF6emVyLmpzIiwid2VicGFjazovLy8uL3NyYy9DbGF6emVyLmpzPzA5MWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlJlcXVlc3QuanM/MzcxMSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiT3BlbkRCUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiT3BlbkRCUmVxdWVzdC5qcz85YWIzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJDb25zdWx0YW50LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJDb25zdWx0YW50LmpzP2IyYWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiLmpzPzYzNTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlN0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJTdG9yZS5qcz80NDBkIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJJbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiSW5kZXguanM/MTMyOSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiRXZlbnRUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYkV2ZW50VGFyZ2V0LmpzPzZiZGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qcz9mOWY5Iiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJUcmFuc2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiVHJhbnNhY3Rpb24uanM/NmUzNiIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlF1ZXJ5LmpzP2Y3N2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzP2QxYTEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xiLmpzIiwid2VicGFjazovLy8uL3NyYy9sYi5qcz9mZmRjIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25zdGFudCIsImlvIiwic2VydmljZSIsIkNsYXp6ZXIiLCJjb25zdHJ1Y3RvciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJwcm90b3R5cGUiLCJwYXJlbnQiLCJ0bXAiLCJjbGF6eiIsIm5hbWUiLCJvcHRzIiwiZnVuYyIsInByb3BlcnR5IiwiZnJvbSIsInRvIiwiZ2V0IiwiJG1lIiwic2V0IiwiY2IiLCJSZWFkeVN0YXRlIiwic3RhdGljIiwiaWRiUmVxdWVzdCIsIm1lIiwiaW5oZXJpdCIsIkV2ZW50VGFyZ2V0IiwiZ2V0dGVyIiwiaGFuZGxlckV2ZW50IiwidGhpeiIsIiRfcHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiJHN1Y2Nlc3MiLCJldmVudCIsIiRmYWlsZWQiLCJpZGJPcGVuREJSZXF1ZXN0IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJpZGJDb25zdWx0YW50IiwibWV0aG9kIiwicXVlcnkiLCIkcHJvbWlzZSIsInRoZW4iLCJ0YXJnZXQiLCJyZXN1bHQiLCJnZXRLZXkiLCJjb3VudCIsImdldEFsbCIsImdldEFsbEtleXMiLCJkaXJlY3Rpb24iLCJvcGVuQ3Vyc29yIiwib3BlbktleUN1cnNvciIsImlkYkV2ZW50VGFyZ2V0IiwiaWRiU3RvcmUiLCJpZGJNb2RlbCIsImlkYlRyYW5zYWN0aW9uIiwiJGxvZyIsImluZGV4ZWREQiIsIndpbmRvdyIsIm1vekluZGV4ZWREQiIsIndlYmtpdEluZGV4ZWREQiIsIm1zSW5kZXhlZERCIiwiSURCVHJhbnNhY3Rpb24iLCJ3ZWJraXRJREJUcmFuc2FjdGlvbiIsIm1zSURCVHJhbnNhY3Rpb24iLCJJREJLZXlSYW5nZSIsIndlYmtpdElEQktleVJhbmdlIiwibXNJREJLZXlSYW5nZSIsImFsZXJ0IiwiaWRiIiwidmVyc2lvbiIsInNvY2tldCIsIiRfbWUiLCJlIiwiRXZlbnQiLCIkZW1pdCIsIm9wZW4iLCJkZWxldGVEYXRhYmFzZSIsImZpcnN0Iiwic2Vjb25kIiwiY21wIiwiJGJpbmQiLCJvbmFib3J0Iiwib25jbG9zZSIsIm9uZXJyb3IiLCJvbnZlcnNpb25jaGFuZ2UiLCIkX3VwZ3JhZGVuZWVkZWRzIiwicHVzaCIsImFsbE1pZ3JhdGlvbnMiLCIkdXBncmFkZW5lZWRlZCIsIm9wZW5SZXF1ZXN0Iiwia2V5cyIsIm1hcCIsIm9sZFZlcnNpb24iLCJuZXdWZXJzaW9uIiwibWlncmF0aW9ucyIsIkFycmF5IiwiaXNBcnJheSIsImxvZyIsIm1pZ3JhdGlvbiIsIm1vZGVsTmFtZSIsIiRfbW9kZWxzIiwiJG1pZ3JhdGUiLCIkbW9kZWwiLCIkY3JlYXRlIiwiY2JFcnIiLCJsYXN0UnEiLCJsYXN0RXZlbnQiLCIkb3BlbmVkIiwiJG9wZW4iLCIkbmFtZSIsIiR2ZXJzaW9uIiwiY2F0Y2giLCJycSIsIiRkcm9wIiwiY2xvc2UiLCJvcHRpb25zIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJkZWxldGVPYmplY3RTdG9yZSIsIiRzb2NrZXQiLCJzdG9yZU5hbWVzIiwibW9kZSIsImFyZ3MiLCJ0cmFuc2FjdGlvbiIsImFjdGlvbiIsIiR0cmFuc2FjdGlvbiIsInR4Iiwic3RvcmVzT2JqIiwic3RvcmVzIiwic3RvcmVOYW1lIiwiJHN0b3JlIiwiVHJhbnNhY3Rpb25Nb2RlIiwiUmVhZE9ubHkiLCJSZWFkV3JpdGUiLCJpZGJJbmRleCIsImtleSIsInB1dCIsImFkZCIsImRlbGV0ZSIsImNsZWFyIiwiaW5kZXgiLCJmaWVsZHMiLCJzb3J0Iiwiam9pbiIsImNyZWF0ZUluZGV4IiwiaW5kZXhOYW1lIiwiZGVsZXRlSW5kZXgiLCJ0eXBlIiwiY2FsbGJhY2siLCIkX2xpc3RlbmVycyIsInN0YWNrIiwiaSIsImwiLCJsZW5ndGgiLCJzcGxpY2UiLCIkdW5iaW5kIiwiY2FsbCIsImlkYlF1ZXJ5IiwibGJSZXNvdXJjZSIsIiR0aW1lb3V0IiwiZGVlcEZpZWxkIiwib2JqIiwiZmllbGQiLCJzcGxpdCIsImxhc3RGaWVsZCIsInBvcCIsIl9zZXQiLCJzaGlmdCIsImdldEZpZWxkVmFsdWUiLCJzZXRGaWVsZFZhbHVlIiwiaWRiTW9kZWxGYWN0b3J5IiwiZGIiLCJrZXlQYXRoIiwiYXV0b0luY3JlbWVudCIsImlkIiwiZGF0YSIsIiRpZCIsIiRpbmRleGVzVG9DcmVhdGUiLCJzdG9yZSIsIiRkYiIsIiRjcmVhdGVTdG9yZSIsIiRjcmVhdGVJbmRleCIsIiRkcm9wU3RvcmUiLCIkd3JpdGVyIiwiJHJlYWRlciIsIiRfdmVyc2lvbmluZyIsInVuZGVmaW5lZCIsIiRrZXkiLCIkZmllbGQiLCJ1cmwiLCJhY3Rpb25zIiwiJF9yZW1vdGUiLCIkaW5zdGFuY2VzIiwiJHNldCIsIiRnZXRWYWx1ZXMiLCIkcHV0IiwicmVjb3JkIiwiJGdldEluc3RhbmNlIiwiJHNldFZhbHVlcyIsIiRzZXRMb2NhbFZhbHVlcyIsIiRhZGQiLCIkZGVsZXRlIiwiJGNsZWFyIiwiJGdldCIsIiRnZXRLZXkiLCIkZ2V0QWxsIiwiYXJyIiwiJGdldEtleUZyb20iLCIkZ2V0QWxsS2V5cyIsIiRjb3VudCIsImZpbHRlcnMiLCIkZmllbGRzIiwidmFsdWVzIiwiYnVpbGRDYWxsYmFjayIsIiRfdmFsdWVzIiwibG9jYWwiLCJyZW1vdGUiLCJFcnJvciIsInN1YnNjcmliZSIsImV2ZW50TmFtZSIsIm1vZGVsSWQiLCIkc2V0UmVtb3RlVmFsdWVzIiwib2JqZWN0U3RvcmUiLCJhYm9ydCIsIiRjb21wbGV0ZWQiLCJtb2RlbCIsIiRyZXN1bHQiLCIkb3BlbkN1cnNvciIsImN1cnNvciIsImNvbnRpbnVlIiwiaWRiU29ja2V0IiwiYWNjZXNzVG9rZW5JZCIsImN1cnJlbnRVc2VySWQiLCIkZGVmVXJsU2VydmVyIiwiJGRlZkFjY2Vzc1Rva2VuSWQiLCIkZGVmQ3VycmVudFVzZXJJZCIsIiRjb25uZWN0IiwiY29ubmVjdCIsIiR1cmwiLCJvbiIsImVtaXQiLCIkYWNjZXNzVG9rZW5JZCIsInVzZXJJZCIsIiRjdXJyZW50VXNlcklkIiwiJHB1c2hMaXN0ZW5lciIsInN1YnNjcmlwdGlvbk5hbWUiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJpZHgiLCJpbmRleE9mIiwiJHNldFVybFNlcnZlciIsIiRzZXRDcmVkZW50aWFscyIsImxiIiwiZ2V0SG9zdCIsIm0iLCJtYXRjaCIsInVybEJhc2VIb3N0IiwibG9jYXRpb24iLCJob3N0IiwibGJBdXRoIiwicHJvcHMiLCJwcm9wc1ByZWZpeCIsInNhdmUiLCJzdG9yYWdlIiwiZXJyIiwiY29uc29sZSIsImxvYWQiLCJsb2NhbFN0b3JhZ2UiLCJzZXNzaW9uU3RvcmFnZSIsImZvckVhY2giLCJjdXJyZW50VXNlckRhdGEiLCJyZW1lbWJlck1lIiwic2V0VXNlciIsInVzZXJEYXRhIiwiY2xlYXJVc2VyIiwiY2xlYXJTdG9yYWdlIiwibGJBdXRoUmVxdWVzdEludGVyY2VwdG9yIiwiJHEiLCJyZXF1ZXN0IiwiY29uZmlnIiwiaGVhZGVycyIsImF1dGhIZWFkZXIiLCJfX2lzR2V0Q3VycmVudFVzZXJfXyIsInJlcyIsImJvZHkiLCJlcnJvciIsInN0YXR1cyIsIndoZW4iLCJ1cmxCYXNlIiwic2V0QXV0aEhlYWRlciIsImhlYWRlciIsImdldEF1dGhIZWFkZXIiLCJzZXRVcmxCYXNlIiwiZ2V0VXJsQmFzZSIsIiRyZXNvdXJjZSIsInBhcmFtcyIsIm9yaWdpbmFsVXJsIiwicmVzb3VyY2UiLCIkc2F2ZSIsInN1Y2Nlc3MiLCJ1cHNlcnQiLCJmYWN0b3J5IiwicHJvdmlkZXIiLCIkaHR0cFByb3ZpZGVyIiwiaW50ZXJjZXB0b3JzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTs7OztBQUdBOztBQ0dBLEtBQUksWUFBWSx1QkFBdUI7O0FEQXZDOztBQ0lBLEtBQUksZUFBZSx1QkFBdUI7O0FESDFDOztBQ09BLEtBQUkscUJBQXFCLHVCQUF1Qjs7QUROaEQ7O0FDVUEsS0FBSSxrQkFBa0IsdUJBQXVCOztBRFQ3Qzs7QUNhQSxLQUFJLFFBQVEsdUJBQXVCOztBRFpuQzs7QUNnQkEsS0FBSSxhQUFhLHVCQUF1Qjs7QURmeEM7O0FDbUJBLEtBQUksYUFBYSx1QkFBdUI7O0FEbEJ4Qzs7QUNzQkEsS0FBSSxtQkFBbUIsdUJBQXVCOztBRHJCOUM7O0FDeUJBLEtBQUksYUFBYSx1QkFBdUI7O0FEeEJ4Qzs7QUM0QkEsS0FBSSxtQkFBbUIsdUJBQXVCOztBRDNCOUM7O0FDK0JBLEtBQUksYUFBYSx1QkFBdUI7O0FEOUJ4Qzs7QUNrQ0EsS0FBSSxjQUFjLHVCQUF1Qjs7QURoQ3pDOztBQ29DQSxLQUFJLE9BQU8sdUJBQXVCOztBQUVsQyxVQUFTLHVCQUF1QixLQUFLLEVBQUUsT0FBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsU0FBUzs7O0FEcEN2RixtQkFBR0EsUUFBUUMsT0FBTyxVQUFVLEtBRXpCQyxTQUFTLE1BQU1DLElBQ2ZDLFFBQVEsV0FIWCxtQkFLR0YsU0FBUyxjQUFjLFNBRXZCRSxRQUFRLGNBUFgsc0JBUUdBLFFBQVEsb0JBUlgsNEJBU0dBLFFBQVEsaUJBVFgseUJBVUdBLFFBQVEsT0FWWCxl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RCxLQUFLc0Q7OztTQUdwRCxJQUFNMkcsV0FBV0gsVUFBVWpMLFFBQVEySyxVQUFVbEcsS0FBS3lHLFFBQVF4Rzs7Ozs7U0FLMUQwRyxTQUFTblMsVUFBVW9TLFFBQVEsVUFBU0MsU0FBU2QsT0FBTzs7O1dBR2xELElBQU1oUCxTQUFTNFAsU0FBU0csT0FBTy9JLEtBQUssTUFBTSxJQUFJLE1BQU04SSxTQUFTZDtXQUM3RCxPQUFPaFAsT0FBT0gsWUFBWUc7O1NBRTVCLE9BQU80UDs7O09BR1QxSSxXQUFXc0ksYUFBYSxZQUFXO1NBQ2pDLE9BQU9oTCxRQUFRMks7OztPQUdqQmpJLFdBQVdvSSxnQkFBZ0IsWUFBVztTQUNwQyxPQUFPOUssUUFBUW9LOzs7T0FHakIsT0FBTzFIOzs7O0dBTVgsT0FBT2xLLE9BQ0pnVCxRQUFRLFVBQVUxQyxRQUNsQjJDLFNBQVMsY0FBYy9JLFlBQ3ZCOEksUUFBUSw0QkFBNEJ6QiwwQkFDcENHLE9BQU8sQ0FBQyxpQkFBaUIsVUFBU3dCLGVBQWU7S0FBRTs7S0FDbERBLGNBQWNDLGFBQWF4TixLQUFLIiwiZmlsZSI6Im5nLWlkYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI0OGRiMGQ5NjY3NmFmZjVlOTNhIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gR2xvYmFsZXNcclxuaW1wb3J0IENsYXp6ZXIgIGZyb20gJy4vQ2xhenplcic7XHJcblxyXG4vLyBTZXJ2aWNlc1xyXG5pbXBvcnQgaWRiUmVxdWVzdCAgICAgICAgIGZyb20gJy4vc2VydmljZXMvaWRiUmVxdWVzdCc7XHJcbmltcG9ydCBpZGJPcGVuREJSZXF1ZXN0ICAgZnJvbSAnLi9zZXJ2aWNlcy9pZGJPcGVuREJSZXF1ZXN0JztcclxuaW1wb3J0IGlkYkNvbnN1bHRhbnQgICAgICBmcm9tICcuL3NlcnZpY2VzL2lkYkNvbnN1bHRhbnQnO1xyXG5pbXBvcnQgaWRiICAgICAgICAgICAgICAgIGZyb20gJy4vc2VydmljZXMvaWRiJztcclxuaW1wb3J0IGlkYlN0b3JlICAgICAgICAgICBmcm9tICcuL3NlcnZpY2VzL2lkYlN0b3JlJztcclxuaW1wb3J0IGlkYkluZGV4ICAgICAgICAgICBmcm9tICcuL3NlcnZpY2VzL2lkYkluZGV4JztcclxuaW1wb3J0IGlkYkV2ZW50VGFyZ2V0ICAgICBmcm9tICcuL3NlcnZpY2VzL2lkYkV2ZW50VGFyZ2V0JztcclxuaW1wb3J0IGlkYk1vZGVsICAgICAgICAgICBmcm9tICcuL3NlcnZpY2VzL2lkYk1vZGVsJztcclxuaW1wb3J0IGlkYlRyYW5zYWN0aW9uICAgICBmcm9tICcuL3NlcnZpY2VzL2lkYlRyYW5zYWN0aW9uJztcclxuaW1wb3J0IGlkYlF1ZXJ5ICAgICAgICAgICBmcm9tICcuL3NlcnZpY2VzL2lkYlF1ZXJ5JztcclxuaW1wb3J0IGlkYlNvY2tldCAgICAgICAgICBmcm9tICcuL3NlcnZpY2VzL2lkYlNvY2tldCc7XHJcblxyXG5pbXBvcnQgbGIgZnJvbSAnLi9sYic7XHJcblxyXG5sYihhbmd1bGFyLm1vZHVsZSgnbmcuaWRiJywgW10pKVxyXG4gIFxyXG4gIC5jb25zdGFudCgnaW8nLCBpbylcclxuICAuc2VydmljZSgnQ2xhenplcicsIENsYXp6ZXIpXHJcblxyXG4gIC5jb25zdGFudCgnaWRiVmVyc2lvbicsICcwLjAuMScpXHJcbiAgXHJcbiAgLnNlcnZpY2UoJ2lkYlJlcXVlc3QnLCBpZGJSZXF1ZXN0KVxyXG4gIC5zZXJ2aWNlKCdpZGJPcGVuREJSZXF1ZXN0JywgaWRiT3BlbkRCUmVxdWVzdClcclxuICAuc2VydmljZSgnaWRiQ29uc3VsdGFudCcsIGlkYkNvbnN1bHRhbnQpXHJcbiAgLnNlcnZpY2UoJ2lkYicsIGlkYilcclxuICAuc2VydmljZSgnaWRiU3RvcmUnLCBpZGJTdG9yZSlcclxuICAuc2VydmljZSgnaWRiSW5kZXgnLCBpZGJJbmRleClcclxuICAuc2VydmljZSgnaWRiRXZlbnRUYXJnZXQnLCBpZGJFdmVudFRhcmdldClcclxuICAuc2VydmljZSgnaWRiTW9kZWwnLCBpZGJNb2RlbClcclxuICAuc2VydmljZSgnaWRiU29ja2V0JywgaWRiU29ja2V0KVxyXG4gIC5zZXJ2aWNlKCdpZGJRdWVyeScsIGlkYlF1ZXJ5KVxyXG4gIC5zZXJ2aWNlKCdpZGJUcmFuc2FjdGlvbicsIGlkYlRyYW5zYWN0aW9uKVxyXG5cclxuLy8gICAuc2VydmljZSgnc29ja2V0JywgZnVuY3Rpb24oaWRiU29ja2V0LCBBUElfUk9PVCkgeyAnbmdJbmplY3QnXHJcbiAgXHJcbi8vICAgICByZXR1cm4gbmV3IGlkYlNvY2tldChcclxuLy8gICAgICAgJ2h0dHA6Ly9sb2NhbGhvc3Q6MzIwMC8nLFxyXG4vLyAgICAgICBsb2NhbFN0b3JhZ2VbJyRMb29wQmFjayRhY2Nlc3NUb2tlbklkJ10sXHJcbi8vICAgICAgIGxvY2FsU3RvcmFnZVsnJExvb3BCYWNrJGN1cnJlbnRVc2VySWQnXVxyXG4vLyAgICAgKTtcclxuXHJcbi8vICAgfSlcclxuXHJcbi8vICAgLnNlcnZpY2UoJ2RiMicsIGZ1bmN0aW9uIChpZGIsIHNvY2tldCkgeyAnbmdJbmplY3QnO1xyXG5cclxuLy8gICAgIGNvbnN0IGRiID0gbmV3IGlkYignYWFhJywgNCwgc29ja2V0KVxyXG5cclxuLy8gICAgIGRiXHJcbi8vICAgICAgIC4kYmluZCgnb3BlbmVkJywgZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZyhbJyRvcGVuZWQnXSk7IH0pXHJcbi8vICAgICAgIC4kYWJvcnRlZChmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKFsnJGFib3J0ZWQnXSk7IH0pXHJcbi8vICAgICAgIC4kY2xvc2VkKGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coWyckY2xvc2VkJ10pOyB9KVxyXG4vLyAgICAgICAuJGVycm9yKGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coWyckZXJyb3InXSk7IH0pXHJcbi8vICAgICAgIC4kdmVyc2lvbkNoYW5nZWQoZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZyhbJyR2ZXJzaW9uQ2hhbmdlZCddKTsgfSlcclxuXHJcbi8vICAgICAgIC4kYXV0b21pZ3JhdGlvbih7XHJcbi8vICAgICAgICAgMTogZnVuY3Rpb24gKGRiKSB7XHJcbi8vICAgICAgICAgICBkYi4kbW9kZWwoJ1RyYWJhamFkb3InKVxyXG4vLyAgICAgICAgICAgICAuJGNyZWF0ZSgpXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICAyOiBmdW5jdGlvbiAoZGIpIHtcclxuLy8gICAgICAgICAgIGRiLiRtb2RlbCgnRW1wbGVhZG8nKVxyXG4gICAgICAgICAgICBcclxuLy8gICAgICAgICAgICAgLiRhZGRJbmRleChbJ25vbWJyZXMnLCAnYXBlbGxpZG9zJ10pXHJcbi8vICAgICAgICAgICAgIC4kYWRkSW5kZXgoJ25hY2ltaWVudG8nKVxyXG5cclxuLy8gICAgICAgICAgICAgLiRjcmVhdGUoZnVuY3Rpb24gKG1vZGVsLCBzdG9yZSkge1xyXG5cclxuLy8gICAgICAgICAgICAgICBzdG9yZS4kY3JlYXRlSW5kZXgoJ2NpJyk7XHJcbi8vICAgICAgICAgICAgICAgc3RvcmUuJGNyZWF0ZUluZGV4KCdjb2QnKTtcclxuXHJcbi8vICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICAzOiBmdW5jdGlvbiAoZGIpIHtcclxuLy8gICAgICAgICAgIGRiLiRtb2RlbCgnVHJhYmFqYWRvcicpXHJcbi8vICAgICAgICAgICAgIC4kZHJvcCgpXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICB9KVxyXG5cclxuLy8gICAgICAgLiRkcm9wKCkudGhlbihmdW5jdGlvbiAoZGIpIHtcclxuLy8gICAgICAgICBkYi4kb3BlbigpO1xyXG4vLyAgICAgICB9KTtcclxuXHJcbi8vICAgICByZXR1cm4gZGI7XHJcbiAgICBcclxuLy8gICB9KVxyXG5cclxuLy8gICAuc2VydmljZSgnRW1wbGVhZG8nLCBmdW5jdGlvbiAoZGIyKSB7ICduZ0luamVjdCc7XHJcbi8vICAgICByZXR1cm4gd2luZG93LkVtcGxlYWRvID0gZGIyLiRtb2RlbCgnRW1wbGVhZG8nKVxyXG4vLyAgICAgICAuJGZpZWxkKCdjb2QnLCAgICAgICAgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pXHJcbi8vICAgICAgIC4kZmllbGQoJ2NpJywgICAgICAgICB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSlcclxuLy8gICAgICAgLiRmaWVsZCgnbm9tYnJlcycsICAgIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KVxyXG4vLyAgICAgICAuJGZpZWxkKCdhcGVsbGlkb3MnLCAgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pXHJcbi8vICAgICAgIC4kZmllbGQoJ25hY2ltaWVudG8nLCB7IFwidHlwZVwiOiBcImRhdGVcIiB9KVxyXG4vLyAgICAgICAuJGZpZWxkKCdpbmdyZXNvJywgICAgeyBcInR5cGVcIjogXCJkYXRlXCIgfSlcclxuLy8gICAgICAgLiRmaWVsZCgnZGlyZWNjaW9uJywgIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCJ9KVxyXG4vLyAgICAgICAuJHJlbW90ZShcclxuLy8gICAgICAgICAnL3RyYWJhamFkb3Jlcy86aWQnLFxyXG4vLyAgICAgICAgIHsgJ2lkJzogJ0BpZCcgfSxcclxuLy8gICAgICAgICB7XHJcbi8vICAgICAgICAgICAnZmluZCc6ICAgeyB1cmw6ICcvdHJhYmFqYWRvcmVzL19maW5kV2l0aFZlcnNpb24nLCBtZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlLCB9LFxyXG4vLyAgICAgICAgICAgLy8gJ2NyZWF0ZSc6IHsgdXJsOiAnL3RyYWJhamFkb3JlcycsIG1ldGhvZDogJ1BPU1QnLCB9LFxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgKVxyXG4vLyAgICAgICAvLyAudmVyc2lvbmluZygpXHJcbi8vICAgICAgIC4kYnVpbGQoZnVuY3Rpb24gKEVtcGxlYWRvKSB7XHJcblxyXG4vLyAgICAgICAgIEVtcGxlYWRvLnByb3RvdHlwZS4kY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuLy8gICAgICAgICB9O1xyXG5cclxuLy8gICAgICAgICBFbXBsZWFkby5wcm90b3R5cGUuZ2V0Tm9tYnJlID0gZnVuY3Rpb24gKCl7XHJcbi8vICAgICAgICAgICByZXR1cm4gdGhpcy5ub21icmVzICsgJyAnICsgdGhpcy5hcGVsbGlkb3M7XHJcbi8vICAgICAgICAgfTtcclxuXHJcbi8vICAgICAgIH0pO1xyXG4vLyAgIH0pXHJcblxyXG4vLyAucnVuKGZ1bmN0aW9uIChkYjIsIEVtcGxlYWRvKSB7ICduZ0luamVjdCc7XHJcblxyXG4vLyAgIEVtcGxlYWRvLiRwdXQoe1xyXG4vLyAgICAgaWQ6IDEsXHJcbi8vICAgICAnbm9tYnJlcyc6ICdBbGV4YW5kZXInXHJcbi8vICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XHJcbi8vICAgICAvL1xyXG4vLyAgICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xyXG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgcmV0dXJuIEVtcGxlYWRvLiRwdXQoe1xyXG4vLyAgICAgICBpZDogMixcclxuLy8gICAgICAgJ25vbWJyZXMnOiAnR3VpbGxlbW8nXHJcbi8vICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcclxuLy8gICAgICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xyXG4vLyAgICAgfSk7XHJcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbi8vICAgICByZXR1cm4gRW1wbGVhZG8uJHB1dCh7XHJcbi8vICAgICAgIGlkOiAyLFxyXG4vLyAgICAgICAnYXBlbGxpZG9zJzogJ1NlbWluYXJpbydcclxuLy8gICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xyXG4vLyAgICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XHJcbi8vICAgICB9KTtcclxuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIHJldHVybiBFbXBsZWFkby4kcHV0KHtcclxuLy8gICAgICAgaWQ6IDQsXHJcbi8vICAgICAgICdub21icmVzJzogJ0F4ZWwnXHJcbi8vICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcclxuLy8gICAgICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xyXG4vLyAgICAgfSk7XHJcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbi8vICAgICByZXR1cm4gRW1wbGVhZG8uJHB1dCh7XHJcbi8vICAgICAgICdub21icmVzJzogJ0dhYnJpZWwnXHJcbi8vICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcclxuLy8gICAgICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xyXG4vLyAgICAgfSk7XHJcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbi8vICAgICByZXR1cm4gRW1wbGVhZG8uJGFkZCh7XHJcbi8vICAgICAgICdub21icmVzJzogJ0V2ZXJ0J1xyXG4vLyAgICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XHJcbi8vICAgICAgIGNvbnNvbGUubG9nKFsncHV0JywgcmVjb3JkLm5vbWJyZXNdKTtcclxuLy8gICAgIH0pO1xyXG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgY29uc3QgciA9IEVtcGxlYWRvLiRnZXQoMik7XHJcbi8vICAgICBjb25zb2xlLmxvZyhbJ2dldCcsIHJdKVxyXG4vLyAgICAgcmV0dXJuIHIuJHByb21pc2U7XHJcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbi8vICAgICBjb25zdCByID0gRW1wbGVhZG8uJGZpbmQoKS4kZ2V0UmVzdWx0KCk7XHJcbi8vICAgICBjb25zb2xlLmxvZyhbJ2ZpbmQnLCByXSk7XHJcbi8vICAgICByZXR1cm4gci4kcHJvbWlzZTtcclxuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIGNvbnN0IHIgPSBFbXBsZWFkby4kZ2V0QWxsKCk7XHJcbi8vICAgICBjb25zb2xlLmxvZyhbJ2dldEFsbCcsIHJdKTtcclxuLy8gICAgIHJldHVybiByLiRwcm9taXNlO1xyXG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgcmV0dXJuIEVtcGxlYWRvLiRjb3VudCgpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XHJcbi8vICAgICAgIGNvbnNvbGUubG9nKFsnY291bnQnLCBjb3VudF0pO1xyXG4vLyAgICAgfSk7XHJcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbi8vICAgICBjb25zdCByID0gRW1wbGVhZG8uJGdldEFsbEtleXMoKTtcclxuLy8gICAgIGNvbnNvbGUubG9nKFsnZ2V0QWxsS2V5cycsIHJdKTtcclxuLy8gICAgIHJldHVybiByLiRwcm9taXNlO1xyXG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgcmV0dXJuIEVtcGxlYWRvLiRkZWxldGUoMikudGhlbihmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgIGNvbnNvbGUubG9nKFsnZGVsZXRlJ10pO1xyXG4vLyAgICAgfSk7XHJcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbi8vICAgICByZXR1cm4gRW1wbGVhZG8uJGNvdW50KCkudGhlbihmdW5jdGlvbiAoY291bnQpIHtcclxuLy8gICAgICAgY29uc29sZS5sb2coWydjb3VudCcsIGNvdW50XSk7XHJcbi8vICAgICB9KTtcclxuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIHJldHVybiBFbXBsZWFkby4kY2xlYXIoKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgY29uc29sZS5sb2coWydjbGVhciddKTtcclxuLy8gICAgIH0pO1xyXG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgcmV0dXJuIEVtcGxlYWRvLiRjb3VudCgpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XHJcbi8vICAgICAgIGNvbnNvbGUubG9nKFsnY291bnQnLCBjb3VudF0pO1xyXG4vLyAgICAgfSk7XHJcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbi8vICAgICBkYjIuJGNsb3NlKCk7XHJcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbi8vICAgICBkYjIuJG9wZW4oKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgZGIyLiRjbG9zZSgpO1xyXG4vLyAgICAgfSk7XHJcbi8vICAgfSk7XHJcblxyXG4vLyB9KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBHbG9iYWxlc1xuXG52YXIgX0NsYXp6ZXIgPSByZXF1aXJlKCcuL0NsYXp6ZXInKTtcblxudmFyIF9DbGF6emVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NsYXp6ZXIpO1xuXG52YXIgX2lkYlJlcXVlc3QgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYlJlcXVlc3QnKTtcblxudmFyIF9pZGJSZXF1ZXN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlJlcXVlc3QpO1xuXG52YXIgX2lkYk9wZW5EQlJlcXVlc3QgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYk9wZW5EQlJlcXVlc3QnKTtcblxudmFyIF9pZGJPcGVuREJSZXF1ZXN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYk9wZW5EQlJlcXVlc3QpO1xuXG52YXIgX2lkYkNvbnN1bHRhbnQgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYkNvbnN1bHRhbnQnKTtcblxudmFyIF9pZGJDb25zdWx0YW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYkNvbnN1bHRhbnQpO1xuXG52YXIgX2lkYiA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiJyk7XG5cbnZhciBfaWRiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYik7XG5cbnZhciBfaWRiU3RvcmUgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYlN0b3JlJyk7XG5cbnZhciBfaWRiU3RvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiU3RvcmUpO1xuXG52YXIgX2lkYkluZGV4ID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJJbmRleCcpO1xuXG52YXIgX2lkYkluZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYkluZGV4KTtcblxudmFyIF9pZGJFdmVudFRhcmdldCA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiRXZlbnRUYXJnZXQnKTtcblxudmFyIF9pZGJFdmVudFRhcmdldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJFdmVudFRhcmdldCk7XG5cbnZhciBfaWRiTW9kZWwgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYk1vZGVsJyk7XG5cbnZhciBfaWRiTW9kZWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiTW9kZWwpO1xuXG52YXIgX2lkYlRyYW5zYWN0aW9uID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJUcmFuc2FjdGlvbicpO1xuXG52YXIgX2lkYlRyYW5zYWN0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlRyYW5zYWN0aW9uKTtcblxudmFyIF9pZGJRdWVyeSA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiUXVlcnknKTtcblxudmFyIF9pZGJRdWVyeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJRdWVyeSk7XG5cbnZhciBfaWRiU29ja2V0ID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJTb2NrZXQnKTtcblxudmFyIF9pZGJTb2NrZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiU29ja2V0KTtcblxudmFyIF9sYiA9IHJlcXVpcmUoJy4vbGInKTtcblxudmFyIF9sYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vIFNlcnZpY2VzXG4oMCwgX2xiMi5kZWZhdWx0KShhbmd1bGFyLm1vZHVsZSgnbmcuaWRiJywgW10pKS5jb25zdGFudCgnaW8nLCBpbykuc2VydmljZSgnQ2xhenplcicsIF9DbGF6emVyMi5kZWZhdWx0KS5jb25zdGFudCgnaWRiVmVyc2lvbicsICcwLjAuMScpLnNlcnZpY2UoJ2lkYlJlcXVlc3QnLCBfaWRiUmVxdWVzdDIuZGVmYXVsdCkuc2VydmljZSgnaWRiT3BlbkRCUmVxdWVzdCcsIF9pZGJPcGVuREJSZXF1ZXN0Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJDb25zdWx0YW50JywgX2lkYkNvbnN1bHRhbnQyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYicsIF9pZGIyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlN0b3JlJywgX2lkYlN0b3JlMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJJbmRleCcsIF9pZGJJbmRleDIuZGVmYXVsdCkuc2VydmljZSgnaWRiRXZlbnRUYXJnZXQnLCBfaWRiRXZlbnRUYXJnZXQyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYk1vZGVsJywgX2lkYk1vZGVsMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJTb2NrZXQnLCBfaWRiU29ja2V0Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJRdWVyeScsIF9pZGJRdWVyeTIuZGVmYXVsdCkuc2VydmljZSgnaWRiVHJhbnNhY3Rpb24nLCBfaWRiVHJhbnNhY3Rpb24yLmRlZmF1bHQpO1xuXG4vLyAgIC5zZXJ2aWNlKCdzb2NrZXQnLCBmdW5jdGlvbihpZGJTb2NrZXQsIEFQSV9ST09UKSB7ICduZ0luamVjdCdcblxuLy8gICAgIHJldHVybiBuZXcgaWRiU29ja2V0KFxuLy8gICAgICAgJ2h0dHA6Ly9sb2NhbGhvc3Q6MzIwMC8nLFxuLy8gICAgICAgbG9jYWxTdG9yYWdlWyckTG9vcEJhY2skYWNjZXNzVG9rZW5JZCddLFxuLy8gICAgICAgbG9jYWxTdG9yYWdlWyckTG9vcEJhY2skY3VycmVudFVzZXJJZCddXG4vLyAgICAgKTtcblxuLy8gICB9KVxuXG4vLyAgIC5zZXJ2aWNlKCdkYjInLCBmdW5jdGlvbiAoaWRiLCBzb2NrZXQpIHsgJ25nSW5qZWN0JztcblxuLy8gICAgIGNvbnN0IGRiID0gbmV3IGlkYignYWFhJywgNCwgc29ja2V0KVxuXG4vLyAgICAgZGJcbi8vICAgICAgIC4kYmluZCgnb3BlbmVkJywgZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZyhbJyRvcGVuZWQnXSk7IH0pXG4vLyAgICAgICAuJGFib3J0ZWQoZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZyhbJyRhYm9ydGVkJ10pOyB9KVxuLy8gICAgICAgLiRjbG9zZWQoZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZyhbJyRjbG9zZWQnXSk7IH0pXG4vLyAgICAgICAuJGVycm9yKGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coWyckZXJyb3InXSk7IH0pXG4vLyAgICAgICAuJHZlcnNpb25DaGFuZ2VkKGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coWyckdmVyc2lvbkNoYW5nZWQnXSk7IH0pXG5cbi8vICAgICAgIC4kYXV0b21pZ3JhdGlvbih7XG4vLyAgICAgICAgIDE6IGZ1bmN0aW9uIChkYikge1xuLy8gICAgICAgICAgIGRiLiRtb2RlbCgnVHJhYmFqYWRvcicpXG4vLyAgICAgICAgICAgICAuJGNyZWF0ZSgpXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIDI6IGZ1bmN0aW9uIChkYikge1xuLy8gICAgICAgICAgIGRiLiRtb2RlbCgnRW1wbGVhZG8nKVxuXG4vLyAgICAgICAgICAgICAuJGFkZEluZGV4KFsnbm9tYnJlcycsICdhcGVsbGlkb3MnXSlcbi8vICAgICAgICAgICAgIC4kYWRkSW5kZXgoJ25hY2ltaWVudG8nKVxuXG4vLyAgICAgICAgICAgICAuJGNyZWF0ZShmdW5jdGlvbiAobW9kZWwsIHN0b3JlKSB7XG5cbi8vICAgICAgICAgICAgICAgc3RvcmUuJGNyZWF0ZUluZGV4KCdjaScpO1xuLy8gICAgICAgICAgICAgICBzdG9yZS4kY3JlYXRlSW5kZXgoJ2NvZCcpO1xuXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICAzOiBmdW5jdGlvbiAoZGIpIHtcbi8vICAgICAgICAgICBkYi4kbW9kZWwoJ1RyYWJhamFkb3InKVxuLy8gICAgICAgICAgICAgLiRkcm9wKClcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSlcblxuLy8gICAgICAgLiRkcm9wKCkudGhlbihmdW5jdGlvbiAoZGIpIHtcbi8vICAgICAgICAgZGIuJG9wZW4oKTtcbi8vICAgICAgIH0pO1xuXG4vLyAgICAgcmV0dXJuIGRiO1xuXG4vLyAgIH0pXG5cbi8vICAgLnNlcnZpY2UoJ0VtcGxlYWRvJywgZnVuY3Rpb24gKGRiMikgeyAnbmdJbmplY3QnO1xuLy8gICAgIHJldHVybiB3aW5kb3cuRW1wbGVhZG8gPSBkYjIuJG1vZGVsKCdFbXBsZWFkbycpXG4vLyAgICAgICAuJGZpZWxkKCdjb2QnLCAgICAgICAgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pXG4vLyAgICAgICAuJGZpZWxkKCdjaScsICAgICAgICAgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pXG4vLyAgICAgICAuJGZpZWxkKCdub21icmVzJywgICAgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pXG4vLyAgICAgICAuJGZpZWxkKCdhcGVsbGlkb3MnLCAgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pXG4vLyAgICAgICAuJGZpZWxkKCduYWNpbWllbnRvJywgeyBcInR5cGVcIjogXCJkYXRlXCIgfSlcbi8vICAgICAgIC4kZmllbGQoJ2luZ3Jlc28nLCAgICB7IFwidHlwZVwiOiBcImRhdGVcIiB9KVxuLy8gICAgICAgLiRmaWVsZCgnZGlyZWNjaW9uJywgIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCJ9KVxuLy8gICAgICAgLiRyZW1vdGUoXG4vLyAgICAgICAgICcvdHJhYmFqYWRvcmVzLzppZCcsXG4vLyAgICAgICAgIHsgJ2lkJzogJ0BpZCcgfSxcbi8vICAgICAgICAge1xuLy8gICAgICAgICAgICdmaW5kJzogICB7IHVybDogJy90cmFiYWphZG9yZXMvX2ZpbmRXaXRoVmVyc2lvbicsIG1ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWUsIH0sXG4vLyAgICAgICAgICAgLy8gJ2NyZWF0ZSc6IHsgdXJsOiAnL3RyYWJhamFkb3JlcycsIG1ldGhvZDogJ1BPU1QnLCB9LFxuLy8gICAgICAgICB9XG4vLyAgICAgICApXG4vLyAgICAgICAvLyAudmVyc2lvbmluZygpXG4vLyAgICAgICAuJGJ1aWxkKGZ1bmN0aW9uIChFbXBsZWFkbykge1xuXG4vLyAgICAgICAgIEVtcGxlYWRvLnByb3RvdHlwZS4kY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZGF0YSkge1xuXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgRW1wbGVhZG8ucHJvdG90eXBlLmdldE5vbWJyZSA9IGZ1bmN0aW9uICgpe1xuLy8gICAgICAgICAgIHJldHVybiB0aGlzLm5vbWJyZXMgKyAnICcgKyB0aGlzLmFwZWxsaWRvcztcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgfSk7XG4vLyAgIH0pXG5cbi8vIC5ydW4oZnVuY3Rpb24gKGRiMiwgRW1wbGVhZG8pIHsgJ25nSW5qZWN0JztcblxuLy8gICBFbXBsZWFkby4kcHV0KHtcbi8vICAgICBpZDogMSxcbi8vICAgICAnbm9tYnJlcyc6ICdBbGV4YW5kZXInXG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xuLy8gICAgIC8vXG4vLyAgICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICByZXR1cm4gRW1wbGVhZG8uJHB1dCh7XG4vLyAgICAgICBpZDogMixcbi8vICAgICAgICdub21icmVzJzogJ0d1aWxsZW1vJ1xuLy8gICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xuLy8gICAgICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xuLy8gICAgIH0pO1xuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICByZXR1cm4gRW1wbGVhZG8uJHB1dCh7XG4vLyAgICAgICBpZDogMixcbi8vICAgICAgICdhcGVsbGlkb3MnOiAnU2VtaW5hcmlvJ1xuLy8gICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xuLy8gICAgICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xuLy8gICAgIH0pO1xuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICByZXR1cm4gRW1wbGVhZG8uJHB1dCh7XG4vLyAgICAgICBpZDogNCxcbi8vICAgICAgICdub21icmVzJzogJ0F4ZWwnXG4vLyAgICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XG4vLyAgICAgfSk7XG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgIHJldHVybiBFbXBsZWFkby4kcHV0KHtcbi8vICAgICAgICdub21icmVzJzogJ0dhYnJpZWwnXG4vLyAgICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XG4vLyAgICAgfSk7XG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgIHJldHVybiBFbXBsZWFkby4kYWRkKHtcbi8vICAgICAgICdub21icmVzJzogJ0V2ZXJ0J1xuLy8gICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xuLy8gICAgICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xuLy8gICAgIH0pO1xuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICBjb25zdCByID0gRW1wbGVhZG8uJGdldCgyKTtcbi8vICAgICBjb25zb2xlLmxvZyhbJ2dldCcsIHJdKVxuLy8gICAgIHJldHVybiByLiRwcm9taXNlO1xuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICBjb25zdCByID0gRW1wbGVhZG8uJGZpbmQoKS4kZ2V0UmVzdWx0KCk7XG4vLyAgICAgY29uc29sZS5sb2coWydmaW5kJywgcl0pO1xuLy8gICAgIHJldHVybiByLiRwcm9taXNlO1xuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICBjb25zdCByID0gRW1wbGVhZG8uJGdldEFsbCgpO1xuLy8gICAgIGNvbnNvbGUubG9nKFsnZ2V0QWxsJywgcl0pO1xuLy8gICAgIHJldHVybiByLiRwcm9taXNlO1xuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICByZXR1cm4gRW1wbGVhZG8uJGNvdW50KCkudGhlbihmdW5jdGlvbiAoY291bnQpIHtcbi8vICAgICAgIGNvbnNvbGUubG9nKFsnY291bnQnLCBjb3VudF0pO1xuLy8gICAgIH0pO1xuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICBjb25zdCByID0gRW1wbGVhZG8uJGdldEFsbEtleXMoKTtcbi8vICAgICBjb25zb2xlLmxvZyhbJ2dldEFsbEtleXMnLCByXSk7XG4vLyAgICAgcmV0dXJuIHIuJHByb21pc2U7XG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgIHJldHVybiBFbXBsZWFkby4kZGVsZXRlKDIpLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgICAgY29uc29sZS5sb2coWydkZWxldGUnXSk7XG4vLyAgICAgfSk7XG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgIHJldHVybiBFbXBsZWFkby4kY291bnQoKS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xuLy8gICAgICAgY29uc29sZS5sb2coWydjb3VudCcsIGNvdW50XSk7XG4vLyAgICAgfSk7XG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgIHJldHVybiBFbXBsZWFkby4kY2xlYXIoKS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgIGNvbnNvbGUubG9nKFsnY2xlYXInXSk7XG4vLyAgICAgfSk7XG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgIHJldHVybiBFbXBsZWFkby4kY291bnQoKS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xuLy8gICAgICAgY29uc29sZS5sb2coWydjb3VudCcsIGNvdW50XSk7XG4vLyAgICAgfSk7XG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgIGRiMi4kY2xvc2UoKTtcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgZGIyLiRvcGVuKCkudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgICBkYjIuJGNsb3NlKCk7XG4vLyAgICAgfSk7XG4vLyAgIH0pO1xuXG4vLyB9KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogQ2xhenplclxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBmdW5jdGlvbiBDbGF6emVyIChjb25zdHJ1Y3Rvcikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjbGF6eicsIHsgdmFsdWU6IGNvbnN0cnVjdG9yIHx8IGZ1bmN0aW9uICgpIHt9IH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnaW5oZXJpdCcsIHtcclxuICAgIHZhbHVlOiBmdW5jdGlvbiAocGFyZW50KSB7XHJcbiAgICAgIGxldCB0bXAgPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgICB0bXAucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTtcclxuICAgICAgdGhpcy5jbGF6ei5wcm90b3R5cGUgPSBuZXcgdG1wKCk7XHJcbiAgICAgIHRoaXMuY2xhenoucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gdGhpcy5jbGF6ejtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3N0YXRpYycsIHtcclxuICAgIHZhbHVlOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuY2xhenosIG5hbWUsIHtcclxuICAgICAgICB2YWx1ZTogdmFsdWVcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdwcm9wZXJ0eScsIHtcclxuICAgIHZhbHVlOiBmdW5jdGlvbiAobmFtZSwgb3B0cykge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jbGF6ei5wcm90b3R5cGUsIG5hbWUsIG9wdHMpO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnbWV0aG9kJywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChuYW1lLCBmdW5jKSB7XHJcbiAgICAgIHRoaXMucHJvcGVydHkobmFtZSwge1xyXG4gICAgICAgIHZhbHVlOiBmdW5jXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnZ2V0dGVyJywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChmcm9tLCB0bykge1xyXG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XHJcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuJG1lW3RvXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnc2V0dGVyJywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChmcm9tLCB0bykge1xyXG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XHJcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICB0aGlzLiRtZVt0b10gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnaGFuZGxlckV2ZW50Jywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChmcm9tLCB0bykge1xyXG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XHJcbiAgICAgIHRoaXMucHJvcGVydHkoZnJvbSwge1xyXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAgIHRoaXMuJG1lW3RvXSA9IGNiO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIHJldHVybiBDbGF6emVyO1xyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9DbGF6emVyLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogQ2xhenplclxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcblxuICBmdW5jdGlvbiBDbGF6emVyKGNvbnN0cnVjdG9yKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjbGF6eicsIHsgdmFsdWU6IGNvbnN0cnVjdG9yIHx8IGZ1bmN0aW9uICgpIHt9IH0pO1xuICB9XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ2luaGVyaXQnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKHBhcmVudCkge1xuICAgICAgdmFyIHRtcCA9IGZ1bmN0aW9uIHRtcCgpIHt9O1xuICAgICAgdG1wLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7XG4gICAgICB0aGlzLmNsYXp6LnByb3RvdHlwZSA9IG5ldyB0bXAoKTtcbiAgICAgIHRoaXMuY2xhenoucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gdGhpcy5jbGF6ejtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3N0YXRpYycsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobmFtZSwgX3ZhbHVlKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jbGF6eiwgbmFtZSwge1xuICAgICAgICB2YWx1ZTogX3ZhbHVlXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3Byb3BlcnR5Jywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShuYW1lLCBvcHRzKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jbGF6ei5wcm90b3R5cGUsIG5hbWUsIG9wdHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnbWV0aG9kJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShuYW1lLCBmdW5jKSB7XG4gICAgICB0aGlzLnByb3BlcnR5KG5hbWUsIHtcbiAgICAgICAgdmFsdWU6IGZ1bmNcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnZ2V0dGVyJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShmcm9tLCB0bykge1xuICAgICAgaWYgKCF0bykgdG8gPSBmcm9tO1xuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLiRtZVt0b107XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnc2V0dGVyJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShmcm9tLCB0bykge1xuICAgICAgaWYgKCF0bykgdG8gPSBmcm9tO1xuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XG4gICAgICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy4kbWVbdG9dID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnaGFuZGxlckV2ZW50Jywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShmcm9tLCB0bykge1xuICAgICAgaWYgKCF0bykgdG8gPSBmcm9tO1xuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShjYikge1xuICAgICAgICAgIHRoaXMuJG1lW3RvXSA9IGNiO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHJldHVybiBDbGF6emVyO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQ2xhenplci5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJSZXF1ZXN0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQlJlcXVlc3QgOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGFueSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTUV4Y2VwdGlvbj8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgKElEQk9iamVjdFN0b3JlIG9yIElEQkluZGV4IG9yIElEQkN1cnNvcik/IHNvdXJjZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb24/ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJSZXF1ZXN0UmVhZHlTdGF0ZSAgICAgICAgICAgICAgICAgICAgICAgcmVhZHlTdGF0ZTtcclxuICogXHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnN1Y2Nlc3M7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiB9O1xyXG4gKlxyXG4gKiBlbnVtIElEQlJlcXVlc3RSZWFkeVN0YXRlIHtcclxuICogICBcInBlbmRpbmdcIixcclxuICogICBcImRvbmVcIlxyXG4gKiB9O1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRfcHJvbWlzZVxyXG5cclxuICBjb25zdCBSZWFkeVN0YXRlID0gbmV3IENsYXp6ZXIoe30pXHJcbiAgICAgICAgLnN0YXRpYygnUGVuZGluZycsICAncGVuZGluZycpXHJcbiAgICAgICAgLnN0YXRpYygnRG9uZScsICAgICAnZG9uZScpO1xyXG4gIFxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiUmVxdWVzdCAobWUpIHtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAuaW5oZXJpdChFdmVudFRhcmdldClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gU3RhdGljc1xyXG4gIC5zdGF0aWMoJ1JlYWR5U3RhdGUnLCBSZWFkeVN0YXRlLmNsYXp6KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJHJlc3VsdCcsICdyZXN1bHQnKVxyXG4gIC5nZXR0ZXIoJyRlcnJvcicsICdlcnJvcicpXHJcbiAgLmdldHRlcignJHNvdXJjZScsICdzb3VyY2UnKVxyXG4gIC5nZXR0ZXIoJyRyZWFkeVN0YXRlJywgJ3JlYWR5U3RhdGUnKVxyXG4gIC5nZXR0ZXIoJyR0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEV2ZW50IGhhbmRsZXJzXHJcbiAgLmhhbmRsZXJFdmVudCgnJHN1Y2Nlc3MnLCAnb25zdWNjZXNzJylcclxuICAuaGFuZGxlckV2ZW50KCckZmFpbGVkJywgICdvbmVycm9yJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJvcGVydHlcclxuICAucHJvcGVydHkoJyRwcm9taXNlJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBpZiAodGhpei4kX3Byb21pc2UpIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcclxuXHJcbiAgICAgIC8vIENyZWFyIHByb21pc2UgcGFyYSBlbCByZXF1ZXN0XHJcbiAgICAgIHRoaXouJF9wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRoaXouJHN1Y2Nlc3MoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZXNvbHZlKGV2ZW50KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC4kZmFpbGVkKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBuZXcgQ2xhenplcih0aGl6LiRfcHJvbWlzZSkuc3RhdGljKCckcmVxdWVzdCcsIHRoaXogKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMvaWRiUmVxdWVzdC5qcyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYlJlcXVlc3RcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCUmVxdWVzdCA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NRXhjZXB0aW9uPyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSAoSURCT2JqZWN0U3RvcmUgb3IgSURCSW5kZXggb3IgSURCQ3Vyc29yKT8gc291cmNlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbj8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlJlcXVlc3RSZWFkeVN0YXRlICAgICAgICAgICAgICAgICAgICAgICByZWFkeVN0YXRlO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uc3VjY2VzcztcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uZXJyb3I7XHJcbiAqIH07XHJcbiAqXHJcbiAqIGVudW0gSURCUmVxdWVzdFJlYWR5U3RhdGUge1xyXG4gKiAgIFwicGVuZGluZ1wiLFxyXG4gKiAgIFwiZG9uZVwiXHJcbiAqIH07XHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplcikge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxuICAvLyAkX3Byb21pc2VcblxuICB2YXIgUmVhZHlTdGF0ZSA9IG5ldyBDbGF6emVyKHt9KS5zdGF0aWMoJ1BlbmRpbmcnLCAncGVuZGluZycpLnN0YXRpYygnRG9uZScsICdkb25lJyk7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJSZXF1ZXN0KG1lKSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFN0YXRpY3NcbiAgLnN0YXRpYygnUmVhZHlTdGF0ZScsIFJlYWR5U3RhdGUuY2xhenopXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdldHRlcnNcbiAgLmdldHRlcignJHJlc3VsdCcsICdyZXN1bHQnKS5nZXR0ZXIoJyRlcnJvcicsICdlcnJvcicpLmdldHRlcignJHNvdXJjZScsICdzb3VyY2UnKS5nZXR0ZXIoJyRyZWFkeVN0YXRlJywgJ3JlYWR5U3RhdGUnKS5nZXR0ZXIoJyR0cmFuc2FjdGlvbicsICd0cmFuc2FjdGlvbicpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGhhbmRsZXJzXG4gIC5oYW5kbGVyRXZlbnQoJyRzdWNjZXNzJywgJ29uc3VjY2VzcycpLmhhbmRsZXJFdmVudCgnJGZhaWxlZCcsICdvbmVycm9yJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUHJvcGVydHlcbiAgLnByb3BlcnR5KCckcHJvbWlzZScsIHtcblxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgaWYgKHRoaXouJF9wcm9taXNlKSByZXR1cm4gdGhpei4kX3Byb21pc2U7XG5cbiAgICAgIC8vIENyZWFyIHByb21pc2UgcGFyYSBlbCByZXF1ZXN0XG4gICAgICB0aGl6LiRfcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdGhpei4kc3VjY2VzcyhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZXNvbHZlKGV2ZW50KTtcbiAgICAgICAgfSkuJGZhaWxlZChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBuZXcgQ2xhenplcih0aGl6LiRfcHJvbWlzZSkuc3RhdGljKCckcmVxdWVzdCcsIHRoaXopO1xuXG4gICAgICByZXR1cm4gdGhpei4kX3Byb21pc2U7XG4gICAgfVxuXG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzL2lkYlJlcXVlc3QuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiT3BlbkRCUmVxdWVzdFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJPcGVuREJSZXF1ZXN0IDogSURCUmVxdWVzdCB7XHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmJsb2NrZWQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnVwZ3JhZGVuZWVkZWQ7XHJcbiAqIH07XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiUmVxdWVzdCkgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiT3BlbkRCUmVxdWVzdCAobWUpIHtcclxuICAgIGlkYlJlcXVlc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgLy8gTGxhbWFyIGFsIGNvbnN0cnVjdG9zIGRlbCBwYWRyZVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KGlkYlJlcXVlc3QpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEV2ZW50IGhhbmRsZXJzXHJcbiAgLmhhbmRsZXJFdmVudCgnJGJsb2NrZWQnLCAnb25ibG9ja2VkJylcclxuICAuaGFuZGxlckV2ZW50KCckdXBncmFkZW5lZWRlZCcsICdvbnVwZ3JhZGVuZWVkZWQnKVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMvaWRiT3BlbkRCUmVxdWVzdC5qcyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYk9wZW5EQlJlcXVlc3RcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCT3BlbkRCUmVxdWVzdCA6IElEQlJlcXVlc3Qge1xyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25ibG9ja2VkO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb251cGdyYWRlbmVlZGVkO1xyXG4gKiB9O1xyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYk9wZW5EQlJlcXVlc3QobWUpIHtcbiAgICBpZGJSZXF1ZXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IC8vIExsYW1hciBhbCBjb25zdHJ1Y3RvcyBkZWwgcGFkcmVcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoaWRiUmVxdWVzdClcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRXZlbnQgaGFuZGxlcnNcbiAgLmhhbmRsZXJFdmVudCgnJGJsb2NrZWQnLCAnb25ibG9ja2VkJykuaGFuZGxlckV2ZW50KCckdXBncmFkZW5lZWRlZCcsICdvbnVwZ3JhZGVuZWVkZWQnKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9pZGJPcGVuREJSZXF1ZXN0LmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYkNvbnN1bHRhbnRcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCSW5kZXgvSURCU3RvcmUge1xyXG4gKiAgICAgICAgICAgIGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICBuYW1lO1xyXG4gKiBcclxuICogICBJREJSZXF1ZXN0IGdldChhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0S2V5KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGwob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbEtleXMob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGNvdW50KG9wdGlvbmFsIGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuQ3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5LZXlDdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiB9O1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkNvbnN1bHRhbnQgKG1lKSB7XHJcblxyXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XHJcblxyXG4gIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gR2V0dGVyc1xyXG4gIC5nZXR0ZXIoJyRuYW1lJywgJ25hbWUnKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZ2V0JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldC5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSlcclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldEtleScsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRLZXkuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpXHJcbiAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRnZXRBbGwnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldEFsbC5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSlcclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldEFsbEtleXMnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0QWxsS2V5cy5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSlcclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNvdW50JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNvdW50LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckb3BlbkN1cnNvcicsIGZ1bmN0aW9uIChxdWVyeSwgZGlyZWN0aW9uKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLm9wZW5DdXJzb3IuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckb3BlbktleUN1cnNvcicsIGZ1bmN0aW9uIChxdWVyeSwgZGlyZWN0aW9uKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLm9wZW5LZXlDdXJzb3IuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzL2lkYkNvbnN1bHRhbnQuanMiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJDb25zdWx0YW50XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkluZGV4L0lEQlN0b3JlIHtcclxuICogICAgICAgICAgICBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICAgbmFtZTtcclxuICogXHJcbiAqICAgSURCUmVxdWVzdCBnZXQoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGdldEtleShhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0QWxsKG9wdGlvbmFsIGFueSBxdWVyeSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBjb3VudCk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGxLZXlzKG9wdGlvbmFsIGFueSBxdWVyeSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBjb3VudCk7XHJcbiAqICAgSURCUmVxdWVzdCBjb3VudChvcHRpb25hbCBhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3Qgb3BlbkN1cnNvcihvcHRpb25hbCBhbnkgcXVlcnksIG9wdGlvbmFsIElEQkN1cnNvckRpcmVjdGlvbiBkaXJlY3Rpb24gPSBcIm5leHRcIik7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuS2V5Q3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogfTtcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJSZXF1ZXN0KSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJDb25zdWx0YW50KG1lKSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR2V0dGVyc1xuICAuZ2V0dGVyKCckbmFtZScsICduYW1lJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGdldCcsIGZ1bmN0aW9uIChxdWVyeSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldC5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZ2V0S2V5JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0S2V5LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRnZXRBbGwnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0QWxsLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRnZXRBbGxLZXlzJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRBbGxLZXlzLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjb3VudCcsIGZ1bmN0aW9uIChxdWVyeSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNvdW50LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRvcGVuQ3Vyc29yJywgZnVuY3Rpb24gKHF1ZXJ5LCBkaXJlY3Rpb24pIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5vcGVuQ3Vyc29yLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJG9wZW5LZXlDdXJzb3InLCBmdW5jdGlvbiAocXVlcnksIGRpcmVjdGlvbikge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLm9wZW5LZXlDdXJzb3IuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9pZGJDb25zdWx0YW50LmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJGYWN0b3J5IHtcclxuICogICBJREJPcGVuREJSZXF1ZXN0IG9wZW4oRE9NU3RyaW5nIG5hbWUsIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgbG9uZyB2ZXJzaW9uKTtcclxuICogICBJREJPcGVuREJSZXF1ZXN0IGRlbGV0ZURhdGFiYXNlKERPTVN0cmluZyBuYW1lKTtcclxuICogICBzaG9ydCBjbXAoYW55IGZpcnN0LCBhbnkgc2Vjb25kKTtcclxuICogfTtcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCRGF0YWJhc2UgOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZyAgICAgICAgICBuYW1lO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSB1bnNpZ25lZCBsb25nIGxvbmcgdmVyc2lvbjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgICAgIG9iamVjdFN0b3JlTmFtZXM7XHJcbiAqIFxyXG4gKiAgIElEQlRyYW5zYWN0aW9uIHRyYW5zYWN0aW9uKChET01TdHJpbmcgb3Igc2VxdWVuY2U8RE9NU3RyaW5nPikgc3RvcmVOYW1lcywgb3B0aW9uYWwgSURCVHJhbnNhY3Rpb25Nb2RlIG1vZGUgPSBcInJlYWRvbmx5XCIpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGNsb3NlKCk7XHJcbiAqICAgSURCT2JqZWN0U3RvcmUgY3JlYXRlT2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUsIG9wdGlvbmFsIElEQk9iamVjdFN0b3JlUGFyYW1ldGVycyBvcHRpb25zKTtcclxuICogICB2b2lkICAgICAgICAgICBkZWxldGVPYmplY3RTdG9yZShET01TdHJpbmcgbmFtZSk7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25hYm9ydDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uY2xvc2U7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb252ZXJzaW9uY2hhbmdlO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZGljdGlvbmFyeSBJREJPYmplY3RTdG9yZVBhcmFtZXRlcnMge1xyXG4gKiAgIChET01TdHJpbmcgb3Igc2VxdWVuY2U8RE9NU3RyaW5nPik/IGtleVBhdGggPSBudWxsO1xyXG4gKiAgIGJvb2xlYW4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9JbmNyZW1lbnQgPSBmYWxzZTtcclxuICogfTttZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYkV2ZW50VGFyZ2V0LCBpZGJTdG9yZSwgaWRiTW9kZWwsIGlkYk9wZW5EQlJlcXVlc3QsIGlkYlRyYW5zYWN0aW9uLCAkbG9nKSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxyXG4gIGNvbnN0IGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQjtcclxuICAvLyBObyB1c2UgXCJjb25zdCBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXHJcbiAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XHJcbiAgY29uc3QgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xyXG4gIGNvbnN0IElEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcclxuICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxyXG4gIFxyXG4gIGlmICghaW5kZXhlZERCKSB7XHJcbiAgICBhbGVydCgnU3UgbmF2ZWdhZG9yIG5vIHNvcG9ydGEgdW5hIHZlcnNpw7NuIGVzdGFibGUgZGUgaW5kZXhlZERCLiBUYWwgeSBjb21vIGxhcyBjYXJhY3RlcsOtc3RpY2FzIG5vIHNlcsOhbiB2YWxpZGFzJyk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXHJcbiAgLy8gJF9tZVxyXG4gIC8vICRvcGVuZWRcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvciAgXHJcbiAgY29uc3QgaWRiID0gZnVuY3Rpb24gaWRiKG5hbWUsIHZlcnNpb24sIHNvY2tldCkge1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpXHJcbiAgICAgIC5zdGF0aWMoJyRuYW1lJywgbmFtZSlcclxuICAgICAgLnN0YXRpYygnJHZlcnNpb24nLCB2ZXJzaW9uKVxyXG4gICAgICAuc3RhdGljKCckc29ja2V0Jywgc29ja2V0KTtcclxuXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihpZGIpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoaWRiRXZlbnRUYXJnZXQpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByb3BpZWRhZGVzXHJcbiAgLnByb3BlcnR5KCckX3VwZ3JhZGVuZWVkZWRzJywgeyB2YWx1ZTpbXSB9KVxyXG4gIC5wcm9wZXJ0eSgnJF9tb2RlbHMnLCB7IHZhbHVlOiB7fSB9KVxyXG5cclxuICAucHJvcGVydHkoJyRtZScsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy4kX21lO1xyXG4gICAgfSxcclxuICAgIHNldDogZnVuY3Rpb24gKG1lKSB7XHJcbiAgICAgIHRoaXMuJF9tZSA9IG1lO1xyXG4gICAgICBjb25zdCBlID0gbmV3IEV2ZW50KCdvcGVuZWQnKTtcclxuICAgICAgLy8gZS50YXJnZXQgPSB0aGlzO1xyXG4gICAgICB0aGlzLiRlbWl0KGUpO1xyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEdldHRlcnNcclxuICAuZ2V0dGVyKCckb2JqZWN0U3RvcmVOYW1lcycsICdvYmplY3RTdG9yZU5hbWVzJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJG9wZW4nLCBmdW5jdGlvbiAobmFtZSwgdmVyc2lvbikge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiT3BlbkRCUmVxdWVzdChpbmRleGVkREIub3Blbi5hcHBseShpbmRleGVkREIsIGFyZ3VtZW50cykpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZHJvcCcsIGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICBcclxuICAgIHJldHVybiBuZXcgaWRiT3BlbkRCUmVxdWVzdChpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UuYXBwbHkoaW5kZXhlZERCLCBhcmd1bWVudHMpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGNtcCcsIGZ1bmN0aW9uIChmaXJzdCwgc2Vjb25kKSB7XHJcbiAgICBcclxuICAgIHJldHVybiBpbmRleGVkREIuY21wKGZpcnN0LCBzZWNvbmQpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gIC5tZXRob2QoJyRhYm9ydGVkJywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgcmV0dXJuIHRoaXouJGJpbmQoJ29wZW5lZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpei4kbWUub25hYm9ydCA9IGNiO1xyXG4gICAgfSk7XHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNsb3NlZCcsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIHJldHVybiB0aGl6LiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXouJG1lLm9uY2xvc2UgPSBjYjtcclxuICAgIH0pO1xyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRlcnJvcicsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIHJldHVybiB0aGl6LiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXouJG1lLm9uZXJyb3IgPSBjYjtcclxuICAgIH0pO1xyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyR2ZXJzaW9uQ2hhbmdlZCcsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIHJldHVybiB0aGl6LiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXouJG1lLm9udmVyc2lvbmNoYW5nZSA9IGNiO1xyXG4gICAgfSk7XHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHVwZ3JhZGVuZWVkZWQnLCBmdW5jdGlvbiAoY2IpIHtcclxuICAgIFxyXG4gICAgdGhpcy4kX3VwZ3JhZGVuZWVkZWRzLnB1c2goY2IpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRhdXRvbWlncmF0aW9uJywgZnVuY3Rpb24gKGFsbE1pZ3JhdGlvbnMpIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy4kdXBncmFkZW5lZWRlZChmdW5jdGlvbiAodGhpeiwgb3BlblJlcXVlc3QsIGV2ZW50KSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKGFsbE1pZ3JhdGlvbnMpLm1hcChmdW5jdGlvbiAodmVyc2lvbikge1xyXG5cclxuICAgICAgICBpZiAoZXZlbnQub2xkVmVyc2lvbiA8IHZlcnNpb24gJiYgdmVyc2lvbiA8PSBldmVudC5uZXdWZXJzaW9uKSB7XHJcblxyXG4gICAgICAgICAgY29uc3QgbWlncmF0aW9ucyA9IEFycmF5LmlzQXJyYXkoYWxsTWlncmF0aW9uc1t2ZXJzaW9uXSk/XHJcbiAgICAgICAgICAgIGFsbE1pZ3JhdGlvbnNbdmVyc2lvbl06W2FsbE1pZ3JhdGlvbnNbdmVyc2lvbl1dO1xyXG5cclxuICAgICAgICAgICRsb2cubG9nKCdtaWdyYXRpb24gdicrdmVyc2lvbisnIHN0YXJ0cycpO1xyXG4gICAgICAgICAgbWlncmF0aW9ucy5tYXAoZnVuY3Rpb24gKG1pZ3JhdGlvbikge1xyXG4gICAgICAgICAgICBtaWdyYXRpb24odGhpeiwgb3BlblJlcXVlc3QsIGV2ZW50KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiAgICBcclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckbWlncmF0ZScsIGZ1bmN0aW9uIChtb2RlbE5hbWUpeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBpZiAoIW1vZGVsTmFtZSl7XHJcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGl6LiRfbW9kZWxzKS5tYXAoZnVuY3Rpb24gKG1vZGVsTmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGl6LiRtaWdyYXRlKG1vZGVsTmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGl6LiRtb2RlbChtb2RlbE5hbWUpLiRjcmVhdGUoKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJG9wZW4nLCBmdW5jdGlvbiAoY2IsIGNiRXJyKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIGxldCBsYXN0UnEgPSBudWxsO1xyXG4gICAgbGV0IGxhc3RFdmVudCA9IG51bGw7XHJcblxyXG4gICAgaWYgKCF0aGl6LiRvcGVuZWQpIHtcclxuXHJcbiAgICAgIHRoaXouJG9wZW5lZCA9IChsYXN0UnEgPSBpZGIuJG9wZW4odGhpei4kbmFtZSwgdGhpei4kdmVyc2lvbilcclxuICAgICAgICAuJHVwZ3JhZGVuZWVkZWQoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAkbG9nLmxvZygndXBncmFkZW5lZWRlZCBpZGI6ICcrdGhpei4kbmFtZSsnIHYnK3RoaXouJHZlcnNpb24pO1xyXG4gICAgICAgICAgdGhpei4kbWUgPSBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICAgICAgdGhpei4kX3VwZ3JhZGVuZWVkZWRzLm1hcChmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAgICAgY2IuYXBwbHkodGhpeiwgW3RoaXosIGxhc3RScSwgZXZlbnRdKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKVxyXG5cclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAkbG9nLmxvZygnb3BlbmVkIGlkYjogJyt0aGl6LiRuYW1lKycgdicrdGhpei4kdmVyc2lvbik7XHJcbiAgICAgICAgICBpZiAodGhpei4kbWUgIT09IGV2ZW50LnRhcmdldC5yZXN1bHQpe1xyXG4gICAgICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBsYXN0RXZlbnQgPSBldmVudDtcclxuICAgICAgICAgIGlmIChjYikgY2IodGhpeiwgbGFzdFJxLCBldmVudCk7XHJcbiAgICAgICAgICByZXR1cm4gdGhpejtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGxhc3RScSA9IG51bGw7XHJcbiAgICAgICAgICB0aGl6LiRvcGVuZWQgPSBudWxsO1xyXG4gICAgICAgICAgaWYgKGNiRXJyKSBjYkVycih0aGl6LCBsYXN0UnEsIGV2ZW50KTtcclxuICAgICAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0gZWxzZSBpZiAoY2IpIHtcclxuXHJcbiAgICAgIGNiKHRoaXosIGxhc3RScSwgbGFzdEV2ZW50KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJG9wZW5lZDtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGRyb3AnLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICB0aGl6LiRvcGVuZWQgPSBudWxsO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICBjb25zdCBycSA9IGlkYi4kZHJvcCh0aGl6LiRuYW1lKVxyXG4gICAgICAgIC4kc3VjY2VzcyhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlc29sdmUodGhpeilcclxuICAgICAgICB9KVxyXG4gICAgICAgIC4kZmFpbGVkKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgaWYgKGNiKSBjYihycSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRjbG9zZScsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB0aGlzLiRvcGVuZWQgPSBudWxsO1xyXG4gICAgdGhpcy4kbWUuY2xvc2UuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgICBcclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckY3JlYXRlU3RvcmUnLCBmdW5jdGlvbiAobmFtZSwgb3B0aW9ucykge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiU3RvcmUodGhpcy4kbWUuY3JlYXRlT2JqZWN0U3RvcmUuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpO1xyXG4gICAgXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGRyb3BTdG9yZScsIGZ1bmN0aW9uIChuYW1lKSB7XHJcblxyXG4gICAgdGhpcy4kbWUuZGVsZXRlT2JqZWN0U3RvcmUuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRtb2RlbCcsIGZ1bmN0aW9uIChuYW1lLCBzb2NrZXQpIHtcclxuXHJcbiAgICAvLyBTaSBleGlzdGUgZWwgbW9kZWxvIHJldG9ybmFybG9cclxuICAgIGlmKHRoaXMuJF9tb2RlbHNbbmFtZV0pIHJldHVybiB0aGlzLiRfbW9kZWxzW25hbWVdO1xyXG5cclxuICAgIC8vIEluc3RhbmNpYXIgZWwgbW9kZWxvIHkgZ3VhcmRhcmxvXHJcbiAgICByZXR1cm4gdGhpcy4kX21vZGVsc1tuYW1lXSA9IGlkYk1vZGVsKHRoaXMsIG5hbWUsIHNvY2tldCB8fCB0aGlzLiRzb2NrZXQpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckdHJhbnNhY3Rpb24nLCBmdW5jdGlvbiAoc3RvcmVOYW1lcywgbW9kZSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJG9wZW4oKVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAodGhpeikge1xyXG4gICAgICAgIHJldHVybiBuZXcgaWRiVHJhbnNhY3Rpb24odGhpei4kbWUudHJhbnNhY3Rpb24uYXBwbHkodGhpei4kbWUsIGFyZ3MpKTtcclxuICAgICAgfSk7XHJcblxyXG4gIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHN0b3JlJywgZnVuY3Rpb24gKHN0b3JlTmFtZXMpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoc3RvcmVOYW1lcykpIHN0b3JlTmFtZXMgPSBbc3RvcmVOYW1lc107XHJcblxyXG4gICAgZnVuY3Rpb24gYWN0aW9uKG1vZGUpIHtcclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGl6LiR0cmFuc2FjdGlvbihzdG9yZU5hbWVzLCBtb2RlKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHR4KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3Jlc09iaiA9IHt9O1xyXG4gICAgICAgICAgICBjb25zdCBzdG9yZXMgPSBzdG9yZU5hbWVzLm1hcChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHN0b3Jlc09ialtzdG9yZU5hbWVdID0gdHguJHN0b3JlKHN0b3JlTmFtZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoY2IpIGNiLmFwcGx5KHRoaXosIHN0b3Jlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdG9yZXNPYmo7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBDbGF6emVyKHt9KVxyXG4gICAgICAuc3RhdGljKCckcmVhZGVyJywgYWN0aW9uKGlkYlRyYW5zYWN0aW9uLlRyYW5zYWN0aW9uTW9kZS5SZWFkT25seSkpXHJcbiAgICAgIC5zdGF0aWMoJyR3cml0ZXInLCBhY3Rpb24oaWRiVHJhbnNhY3Rpb24uVHJhbnNhY3Rpb25Nb2RlLlJlYWRXcml0ZSkpXHJcbiAgICAgIC5jbGF6elxyXG5cclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMvaWRiLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkZhY3Rvcnkge1xyXG4gKiAgIElEQk9wZW5EQlJlcXVlc3Qgb3BlbihET01TdHJpbmcgbmFtZSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBsb25nIHZlcnNpb24pO1xyXG4gKiAgIElEQk9wZW5EQlJlcXVlc3QgZGVsZXRlRGF0YWJhc2UoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIHNob3J0IGNtcChhbnkgZmlyc3QsIGFueSBzZWNvbmQpO1xyXG4gKiB9O1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJEYXRhYmFzZSA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIHVuc2lnbmVkIGxvbmcgbG9uZyB2ZXJzaW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmdMaXN0ICAgICAgb2JqZWN0U3RvcmVOYW1lcztcclxuICogXHJcbiAqICAgSURCVHJhbnNhY3Rpb24gdHJhbnNhY3Rpb24oKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KSBzdG9yZU5hbWVzLCBvcHRpb25hbCBJREJUcmFuc2FjdGlvbk1vZGUgbW9kZSA9IFwicmVhZG9ubHlcIik7XHJcbiAqICAgdm9pZCAgICAgICAgICAgY2xvc2UoKTtcclxuICogICBJREJPYmplY3RTdG9yZSBjcmVhdGVPYmplY3RTdG9yZShET01TdHJpbmcgbmFtZSwgb3B0aW9uYWwgSURCT2JqZWN0U3RvcmVQYXJhbWV0ZXJzIG9wdGlvbnMpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGRlbGV0ZU9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lKTtcclxuICogXHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmFib3J0O1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25jbG9zZTtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uZXJyb3I7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnZlcnNpb25jaGFuZ2U7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBkaWN0aW9uYXJ5IElEQk9iamVjdFN0b3JlUGFyYW1ldGVycyB7XHJcbiAqICAgKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KT8ga2V5UGF0aCA9IG51bGw7XHJcbiAqICAgYm9vbGVhbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0luY3JlbWVudCA9IGZhbHNlO1xyXG4gKiB9O21lXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiRXZlbnRUYXJnZXQsIGlkYlN0b3JlLCBpZGJNb2RlbCwgaWRiT3BlbkRCUmVxdWVzdCwgaWRiVHJhbnNhY3Rpb24sICRsb2cpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyBFbiBsYSBzaWd1aWVudGUgbGluZWEsIHB1ZWRlIGluY2x1aXIgcHJlZmlqb3MgZGUgaW1wbGVtZW50YWNpb24gcXVlIHF1aWVyYSBwcm9iYXIuXG5cbiAgdmFyIGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQjtcbiAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxuICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcbiAgdmFyIElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcbiAgdmFyIElEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcbiAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcblxuICBpZiAoIWluZGV4ZWREQikge1xuICAgIGFsZXJ0KCdTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXMnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJF9tZVxuICAvLyAkb3BlbmVkXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yICBcbiAgdmFyIGlkYiA9IGZ1bmN0aW9uIGlkYihuYW1lLCB2ZXJzaW9uLCBzb2NrZXQpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG5hbWUnLCBuYW1lKS5zdGF0aWMoJyR2ZXJzaW9uJywgdmVyc2lvbikuc3RhdGljKCckc29ja2V0Jywgc29ja2V0KTtcbiAgfTtcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGlkYilcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoaWRiRXZlbnRUYXJnZXQpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFByb3BpZWRhZGVzXG4gIC5wcm9wZXJ0eSgnJF91cGdyYWRlbmVlZGVkcycsIHsgdmFsdWU6IFtdIH0pLnByb3BlcnR5KCckX21vZGVscycsIHsgdmFsdWU6IHt9IH0pLnByb3BlcnR5KCckbWUnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kX21lO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQobWUpIHtcbiAgICAgIHRoaXMuJF9tZSA9IG1lO1xuICAgICAgdmFyIGUgPSBuZXcgRXZlbnQoJ29wZW5lZCcpO1xuICAgICAgLy8gZS50YXJnZXQgPSB0aGlzO1xuICAgICAgdGhpcy4kZW1pdChlKTtcbiAgICB9XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdldHRlcnNcbiAgLmdldHRlcignJG9iamVjdFN0b3JlTmFtZXMnLCAnb2JqZWN0U3RvcmVOYW1lcycpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5zdGF0aWMoJyRvcGVuJywgZnVuY3Rpb24gKG5hbWUsIHZlcnNpb24pIHtcblxuICAgIHJldHVybiBuZXcgaWRiT3BlbkRCUmVxdWVzdChpbmRleGVkREIub3Blbi5hcHBseShpbmRleGVkREIsIGFyZ3VtZW50cykpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuc3RhdGljKCckZHJvcCcsIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYk9wZW5EQlJlcXVlc3QoaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlLmFwcGx5KGluZGV4ZWREQiwgYXJndW1lbnRzKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5zdGF0aWMoJyRjbXAnLCBmdW5jdGlvbiAoZmlyc3QsIHNlY29uZCkge1xuXG4gICAgcmV0dXJuIGluZGV4ZWREQi5jbXAoZmlyc3QsIHNlY29uZCk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGhhbmRsZXJzXG4gIC5tZXRob2QoJyRhYm9ydGVkJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIHJldHVybiB0aGl6LiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGl6LiRtZS5vbmFib3J0ID0gY2I7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjbG9zZWQnLCBmdW5jdGlvbiAoY2IpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgcmV0dXJuIHRoaXouJGJpbmQoJ29wZW5lZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXouJG1lLm9uY2xvc2UgPSBjYjtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGVycm9yJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIHJldHVybiB0aGl6LiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGl6LiRtZS5vbmVycm9yID0gY2I7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyR2ZXJzaW9uQ2hhbmdlZCcsIGZ1bmN0aW9uIChjYikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICByZXR1cm4gdGhpei4kYmluZCgnb3BlbmVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpei4kbWUub252ZXJzaW9uY2hhbmdlID0gY2I7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyR1cGdyYWRlbmVlZGVkJywgZnVuY3Rpb24gKGNiKSB7XG5cbiAgICB0aGlzLiRfdXBncmFkZW5lZWRlZHMucHVzaChjYik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRhdXRvbWlncmF0aW9uJywgZnVuY3Rpb24gKGFsbE1pZ3JhdGlvbnMpIHtcblxuICAgIHJldHVybiB0aGlzLiR1cGdyYWRlbmVlZGVkKGZ1bmN0aW9uICh0aGl6LCBvcGVuUmVxdWVzdCwgZXZlbnQpIHtcbiAgICAgIE9iamVjdC5rZXlzKGFsbE1pZ3JhdGlvbnMpLm1hcChmdW5jdGlvbiAodmVyc2lvbikge1xuXG4gICAgICAgIGlmIChldmVudC5vbGRWZXJzaW9uIDwgdmVyc2lvbiAmJiB2ZXJzaW9uIDw9IGV2ZW50Lm5ld1ZlcnNpb24pIHtcblxuICAgICAgICAgIHZhciBtaWdyYXRpb25zID0gQXJyYXkuaXNBcnJheShhbGxNaWdyYXRpb25zW3ZlcnNpb25dKSA/IGFsbE1pZ3JhdGlvbnNbdmVyc2lvbl0gOiBbYWxsTWlncmF0aW9uc1t2ZXJzaW9uXV07XG5cbiAgICAgICAgICAkbG9nLmxvZygnbWlncmF0aW9uIHYnICsgdmVyc2lvbiArICcgc3RhcnRzJyk7XG4gICAgICAgICAgbWlncmF0aW9ucy5tYXAoZnVuY3Rpb24gKG1pZ3JhdGlvbikge1xuICAgICAgICAgICAgbWlncmF0aW9uKHRoaXosIG9wZW5SZXF1ZXN0LCBldmVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckbWlncmF0ZScsIGZ1bmN0aW9uIChtb2RlbE5hbWUpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICBpZiAoIW1vZGVsTmFtZSkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXouJF9tb2RlbHMpLm1hcChmdW5jdGlvbiAobW9kZWxOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGl6LiRtaWdyYXRlKG1vZGVsTmFtZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpei4kbW9kZWwobW9kZWxOYW1lKS4kY3JlYXRlKCk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRvcGVuJywgZnVuY3Rpb24gKGNiLCBjYkVycikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgIHZhciBsYXN0UnEgPSBudWxsO1xuICAgIHZhciBsYXN0RXZlbnQgPSBudWxsO1xuXG4gICAgaWYgKCF0aGl6LiRvcGVuZWQpIHtcblxuICAgICAgdGhpei4kb3BlbmVkID0gKGxhc3RScSA9IGlkYi4kb3Blbih0aGl6LiRuYW1lLCB0aGl6LiR2ZXJzaW9uKS4kdXBncmFkZW5lZWRlZChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgJGxvZy5sb2coJ3VwZ3JhZGVuZWVkZWQgaWRiOiAnICsgdGhpei4kbmFtZSArICcgdicgKyB0aGl6LiR2ZXJzaW9uKTtcbiAgICAgICAgdGhpei4kbWUgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICB0aGl6LiRfdXBncmFkZW5lZWRlZHMubWFwKGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgIGNiLmFwcGx5KHRoaXosIFt0aGl6LCBsYXN0UnEsIGV2ZW50XSk7XG4gICAgICAgIH0pO1xuICAgICAgfSkpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICRsb2cubG9nKCdvcGVuZWQgaWRiOiAnICsgdGhpei4kbmFtZSArICcgdicgKyB0aGl6LiR2ZXJzaW9uKTtcbiAgICAgICAgaWYgKHRoaXouJG1lICE9PSBldmVudC50YXJnZXQucmVzdWx0KSB7XG4gICAgICAgICAgdGhpei4kbWUgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGxhc3RFdmVudCA9IGV2ZW50O1xuICAgICAgICBpZiAoY2IpIGNiKHRoaXosIGxhc3RScSwgZXZlbnQpO1xuICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBsYXN0UnEgPSBudWxsO1xuICAgICAgICB0aGl6LiRvcGVuZWQgPSBudWxsO1xuICAgICAgICBpZiAoY2JFcnIpIGNiRXJyKHRoaXosIGxhc3RScSwgZXZlbnQpO1xuICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY2IpIHtcblxuICAgICAgY2IodGhpeiwgbGFzdFJxLCBsYXN0RXZlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGl6LiRvcGVuZWQ7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRkcm9wJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICB2YXIgcnEgPSBpZGIuJGRyb3AodGhpei4kbmFtZSkuJHN1Y2Nlc3MoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJlc29sdmUodGhpeik7XG4gICAgICB9KS4kZmFpbGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZWplY3QoZXZlbnQpO1xuICAgICAgfSk7XG4gICAgICBpZiAoY2IpIGNiKHJxKTtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGNsb3NlJywgZnVuY3Rpb24gKCkge1xuXG4gICAgdGhpcy4kb3BlbmVkID0gbnVsbDtcbiAgICB0aGlzLiRtZS5jbG9zZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckY3JlYXRlU3RvcmUnLCBmdW5jdGlvbiAobmFtZSwgb3B0aW9ucykge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJTdG9yZSh0aGlzLiRtZS5jcmVhdGVPYmplY3RTdG9yZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRkcm9wU3RvcmUnLCBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgdGhpcy4kbWUuZGVsZXRlT2JqZWN0U3RvcmUuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJG1vZGVsJywgZnVuY3Rpb24gKG5hbWUsIHNvY2tldCkge1xuXG4gICAgLy8gU2kgZXhpc3RlIGVsIG1vZGVsbyByZXRvcm5hcmxvXG4gICAgaWYgKHRoaXMuJF9tb2RlbHNbbmFtZV0pIHJldHVybiB0aGlzLiRfbW9kZWxzW25hbWVdO1xuXG4gICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG8geSBndWFyZGFybG9cbiAgICByZXR1cm4gdGhpcy4kX21vZGVsc1tuYW1lXSA9IGlkYk1vZGVsKHRoaXMsIG5hbWUsIHNvY2tldCB8fCB0aGlzLiRzb2NrZXQpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckdHJhbnNhY3Rpb24nLCBmdW5jdGlvbiAoc3RvcmVOYW1lcywgbW9kZSkge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgIHJldHVybiB0aGl6LiRvcGVuKCkudGhlbihmdW5jdGlvbiAodGhpeikge1xuICAgICAgcmV0dXJuIG5ldyBpZGJUcmFuc2FjdGlvbih0aGl6LiRtZS50cmFuc2FjdGlvbi5hcHBseSh0aGl6LiRtZSwgYXJncykpO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckc3RvcmUnLCBmdW5jdGlvbiAoc3RvcmVOYW1lcykge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoc3RvcmVOYW1lcykpIHN0b3JlTmFtZXMgPSBbc3RvcmVOYW1lc107XG5cbiAgICBmdW5jdGlvbiBhY3Rpb24obW9kZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjYikge1xuXG4gICAgICAgIHJldHVybiB0aGl6LiR0cmFuc2FjdGlvbihzdG9yZU5hbWVzLCBtb2RlKS50aGVuKGZ1bmN0aW9uICh0eCkge1xuICAgICAgICAgIHZhciBzdG9yZXNPYmogPSB7fTtcbiAgICAgICAgICB2YXIgc3RvcmVzID0gc3RvcmVOYW1lcy5tYXAoZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0b3Jlc09ialtzdG9yZU5hbWVdID0gdHguJHN0b3JlKHN0b3JlTmFtZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGNiKSBjYi5hcHBseSh0aGl6LCBzdG9yZXMpO1xuICAgICAgICAgIHJldHVybiBzdG9yZXNPYmo7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENsYXp6ZXIoe30pLnN0YXRpYygnJHJlYWRlcicsIGFjdGlvbihpZGJUcmFuc2FjdGlvbi5UcmFuc2FjdGlvbk1vZGUuUmVhZE9ubHkpKS5zdGF0aWMoJyR3cml0ZXInLCBhY3Rpb24oaWRiVHJhbnNhY3Rpb24uVHJhbnNhY3Rpb25Nb2RlLlJlYWRXcml0ZSkpLmNsYXp6O1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9pZGIuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiU3RvcmVcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCT2JqZWN0U3RvcmUge1xyXG4gKiAgICAgICAgICAgIGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICBuYW1lO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBhbnkgICAgICAgICAgICBrZXlQYXRoO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmdMaXN0ICBpbmRleE5hbWVzO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbiB0cmFuc2FjdGlvbjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYm9vbGVhbiAgICAgICAgYXV0b0luY3JlbWVudDtcclxuICogXHJcbiAqICAgSURCUmVxdWVzdCBwdXQoYW55IHZhbHVlLCBvcHRpb25hbCBhbnkga2V5KTtcclxuICogICBJREJSZXF1ZXN0IGFkZChhbnkgdmFsdWUsIG9wdGlvbmFsIGFueSBrZXkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZGVsZXRlKGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBjbGVhcigpO1xyXG4gKiAgIElEQkluZGV4ICAgaW5kZXgoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIElEQkluZGV4ICAgY3JlYXRlSW5kZXgoRE9NU3RyaW5nIG5hbWUsIChET01TdHJpbmcgb3Igc2VxdWVuY2U8RE9NU3RyaW5nPikga2V5UGF0aCwgb3B0aW9uYWwgSURCSW5kZXhQYXJhbWV0ZXJzIG9wdGlvbnMpO1xyXG4gKiAgIHZvaWQgICAgICAgZGVsZXRlSW5kZXgoRE9NU3RyaW5nIGluZGV4TmFtZSk7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBkaWN0aW9uYXJ5IElEQkluZGV4UGFyYW1ldGVycyB7XHJcbiAqICAgYm9vbGVhbiB1bmlxdWUgPSBmYWxzZTtcclxuICogICBib29sZWFuIG11bHRpRW50cnkgPSBmYWxzZTtcclxuICogfTtcclxuICogXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiUmVxdWVzdCwgaWRiSW5kZXgsIGlkYkNvbnN1bHRhbnQsICRsb2cpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJTdG9yZSAobWUpIHtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAuaW5oZXJpdChpZGJDb25zdWx0YW50KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJGtleVBhdGgnLCAna2V5UGF0aCcpXHJcbiAgLmdldHRlcignJGluZGV4TmFtZXMnLCAnaW5kZXhOYW1lcycpXHJcbiAgLmdldHRlcignJHRyYW5zYWN0aW9uJywgJ3RyYW5zYWN0aW9uJylcclxuICAuZ2V0dGVyKCckYXV0b0luY3JlbWVudCcsICdhdXRvSW5jcmVtZW50JylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHB1dCcsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLnB1dC5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSlcclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGFkZCcsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmFkZC5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSlcclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGRlbGV0ZScsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5kZWxldGUuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpXHJcbiAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAoZXZlbnQpIHt9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNsZWFyJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5jbGVhci5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSlcclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uKGV2ZW50KXt9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGluZGV4JywgZnVuY3Rpb24gKG5hbWUpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYkluZGV4KHRoaXMuJG1lLmluZGV4LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNyZWF0ZUluZGV4JywgZnVuY3Rpb24gKGZpZWxkcywgbmFtZSwgb3B0aW9ucykge1xyXG4gICAgaWYgKHR5cGVvZiBmaWVsZHMgPT0gJ3N0cmluZycpIHtcclxuICAgICAgZmllbGRzID0gW2ZpZWxkc107XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIG5hbWUgPT0gJ29iamVjdCcpe1xyXG4gICAgICBvcHRpb25zID0gbmFtZTtcclxuICAgICAgbmFtZSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgbmFtZSA9IGZpZWxkcy5zb3J0KCkuam9pbignXycpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgaWRiSW5kZXgodGhpcy4kbWUuY3JlYXRlSW5kZXgobmFtZSwgZmllbGRzLCBvcHRpb25zKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRkZWxldGVJbmRleCcsIGZ1bmN0aW9uIChpbmRleE5hbWUpIHtcclxuICAgIGlmIChBcnJheS5hbmd1bGFyLmlzQXJyYXkoaW5kZXhOYW1lKSkge1xyXG4gICAgICBpbmRleE5hbWUgPSBpbmRleE5hbWUuc29ydCgpLmpvaW4oJ18nKTtcclxuICAgIH1cclxuICAgIHRoaXMuJG1lLmRlbGV0ZUluZGV4KGluZGV4TmFtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMvaWRiU3RvcmUuanMiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJTdG9yZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJPYmplY3RTdG9yZSB7XHJcbiAqICAgICAgICAgICAgYXR0cmlidXRlIERPTVN0cmluZyAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGFueSAgICAgICAgICAgIGtleVBhdGg7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgIGluZGV4TmFtZXM7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uIHRyYW5zYWN0aW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICBhdXRvSW5jcmVtZW50O1xyXG4gKiBcclxuICogICBJREJSZXF1ZXN0IHB1dChhbnkgdmFsdWUsIG9wdGlvbmFsIGFueSBrZXkpO1xyXG4gKiAgIElEQlJlcXVlc3QgYWRkKGFueSB2YWx1ZSwgb3B0aW9uYWwgYW55IGtleSk7XHJcbiAqICAgSURCUmVxdWVzdCBkZWxldGUoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGNsZWFyKCk7XHJcbiAqICAgSURCSW5kZXggICBpbmRleChET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgSURCSW5kZXggICBjcmVhdGVJbmRleChET01TdHJpbmcgbmFtZSwgKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KSBrZXlQYXRoLCBvcHRpb25hbCBJREJJbmRleFBhcmFtZXRlcnMgb3B0aW9ucyk7XHJcbiAqICAgdm9pZCAgICAgICBkZWxldGVJbmRleChET01TdHJpbmcgaW5kZXhOYW1lKTtcclxuICogfTtcclxuICogXHJcbiAqIGRpY3Rpb25hcnkgSURCSW5kZXhQYXJhbWV0ZXJzIHtcclxuICogICBib29sZWFuIHVuaXF1ZSA9IGZhbHNlO1xyXG4gKiAgIGJvb2xlYW4gbXVsdGlFbnRyeSA9IGZhbHNlO1xyXG4gKiB9O1xyXG4gKiBcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QsIGlkYkluZGV4LCBpZGJDb25zdWx0YW50LCAkbG9nKSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJTdG9yZShtZSkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KGlkYkNvbnN1bHRhbnQpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdldHRlcnNcbiAgLmdldHRlcignJGtleVBhdGgnLCAna2V5UGF0aCcpLmdldHRlcignJGluZGV4TmFtZXMnLCAnaW5kZXhOYW1lcycpLmdldHRlcignJHRyYW5zYWN0aW9uJywgJ3RyYW5zYWN0aW9uJykuZ2V0dGVyKCckYXV0b0luY3JlbWVudCcsICdhdXRvSW5jcmVtZW50JylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHB1dCcsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUucHV0LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRhZGQnLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmFkZC5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZGVsZXRlJywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZGVsZXRlLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge30pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckY2xlYXInLCBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuY2xlYXIuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7fSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRpbmRleCcsIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYkluZGV4KHRoaXMuJG1lLmluZGV4LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGNyZWF0ZUluZGV4JywgZnVuY3Rpb24gKGZpZWxkcywgbmFtZSwgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YgZmllbGRzID09ICdzdHJpbmcnKSB7XG4gICAgICBmaWVsZHMgPSBbZmllbGRzXTtcbiAgICB9XG4gICAgaWYgKCh0eXBlb2YgbmFtZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YobmFtZSkpID09ICdvYmplY3QnKSB7XG4gICAgICBvcHRpb25zID0gbmFtZTtcbiAgICAgIG5hbWUgPSBudWxsO1xuICAgIH1cbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIG5hbWUgPSBmaWVsZHMuc29ydCgpLmpvaW4oJ18nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IGlkYkluZGV4KHRoaXMuJG1lLmNyZWF0ZUluZGV4KG5hbWUsIGZpZWxkcywgb3B0aW9ucykpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZGVsZXRlSW5kZXgnLCBmdW5jdGlvbiAoaW5kZXhOYW1lKSB7XG4gICAgaWYgKEFycmF5LmFuZ3VsYXIuaXNBcnJheShpbmRleE5hbWUpKSB7XG4gICAgICBpbmRleE5hbWUgPSBpbmRleE5hbWUuc29ydCgpLmpvaW4oJ18nKTtcbiAgICB9XG4gICAgdGhpcy4kbWUuZGVsZXRlSW5kZXgoaW5kZXhOYW1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMvaWRiU3RvcmUuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiSW5kZXhcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCSW5kZXgge1xyXG4gKiAgICAgICAgICAgIGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICBuYW1lO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJPYmplY3RTdG9yZSBvYmplY3RTdG9yZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAga2V5UGF0aDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYm9vbGVhbiAgICAgICAgbXVsdGlFbnRyeTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYm9vbGVhbiAgICAgICAgdW5pcXVlO1xyXG4gKiBcclxuICogICBJREJSZXF1ZXN0IGdldChhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0S2V5KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGwob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbEtleXMob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGNvdW50KG9wdGlvbmFsIGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuQ3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5LZXlDdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiB9O1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIsIGlkYkNvbnN1bHRhbnQpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkluZGV4IChtZSkge1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KGlkYkNvbnN1bHRhbnQpXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gR2V0dGVyc1xyXG4gIC5nZXR0ZXIoJyRvYmplY3RTdG9yZScsICdvYmplY3RTdG9yZScpXHJcbiAgLmdldHRlcignJGtleVBhdGgnLCAgICAgJ2tleVBhdGgnKVxyXG4gIC5nZXR0ZXIoJyRtdWx0aUVudHJ5JywgICdtdWx0aUVudHJ5JylcclxuICAuZ2V0dGVyKCckdW5pcXVlJywgICAgICAndW5pcXVlJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9pZGJJbmRleC5qcyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYkluZGV4XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkluZGV4IHtcclxuICogICAgICAgICAgICBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCT2JqZWN0U3RvcmUgb2JqZWN0U3RvcmU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGFueSAgICAgICAgICAgIGtleVBhdGg7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGJvb2xlYW4gICAgICAgIG11bHRpRW50cnk7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGJvb2xlYW4gICAgICAgIHVuaXF1ZTtcclxuICogXHJcbiAqICAgSURCUmVxdWVzdCBnZXQoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGdldEtleShhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0QWxsKG9wdGlvbmFsIGFueSBxdWVyeSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBjb3VudCk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGxLZXlzKG9wdGlvbmFsIGFueSBxdWVyeSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBjb3VudCk7XHJcbiAqICAgSURCUmVxdWVzdCBjb3VudChvcHRpb25hbCBhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3Qgb3BlbkN1cnNvcihvcHRpb25hbCBhbnkgcXVlcnksIG9wdGlvbmFsIElEQkN1cnNvckRpcmVjdGlvbiBkaXJlY3Rpb24gPSBcIm5leHRcIik7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuS2V5Q3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogfTtcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJDb25zdWx0YW50KSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJJbmRleChtZSkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KGlkYkNvbnN1bHRhbnQpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdldHRlcnNcbiAgLmdldHRlcignJG9iamVjdFN0b3JlJywgJ29iamVjdFN0b3JlJykuZ2V0dGVyKCcka2V5UGF0aCcsICdrZXlQYXRoJykuZ2V0dGVyKCckbXVsdGlFbnRyeScsICdtdWx0aUVudHJ5JykuZ2V0dGVyKCckdW5pcXVlJywgJ3VuaXF1ZScpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzL2lkYkluZGV4LmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYkV2ZW50VGFyZ2V0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkV2ZW50VGFyZ2V0ICgpIHt9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByb3BpZWRhZGVzXHJcbiAgLnByb3BlcnR5KCckX2xpc3RlbmVycycsIHsgdmFsdWU6IFtdIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gbWV0aG9kXHJcbiAgLm1ldGhvZCgnJGJpbmQnLCBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcclxuICAgIGlmKCEodHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSkge1xyXG4gICAgICB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdID0gW107XHJcbiAgICB9XHJcbiAgICB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdLnB1c2goY2FsbGJhY2spO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBtZXRob2RcclxuICAubWV0aG9kKCckdW5iaW5kICcsIGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaykge1xyXG4gICAgaWYodHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSB7XHJcbiAgICAgIHZhciBzdGFjayA9IHRoaXMuJF9saXN0ZW5lcnNbdHlwZV07XHJcbiAgICAgIGZvcih2YXIgaSA9IDAsIGwgPSBzdGFjay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZihzdGFja1tpXSA9PT0gY2FsbGJhY2spe1xyXG4gICAgICAgICAgc3RhY2suc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuJHVuYmluZCh0eXBlLCBjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIG1ldGhvZFxyXG4gIC5tZXRob2QoJyRlbWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZihldmVudC50eXBlIGluIHRoaXMuJF9saXN0ZW5lcnMpIHtcclxuICAgICAgdmFyIHN0YWNrID0gdGhpcy4kX2xpc3RlbmVyc1tldmVudC50eXBlXTtcclxuICAgICAgZm9yKHZhciBpID0gMCwgbCA9IHN0YWNrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgc3RhY2tbaV0uY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMvaWRiRXZlbnRUYXJnZXQuanMiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJFdmVudFRhcmdldFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyKSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJFdmVudFRhcmdldCgpIHt9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQcm9waWVkYWRlc1xuICAucHJvcGVydHkoJyRfbGlzdGVuZXJzJywgeyB2YWx1ZTogW10gfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gbWV0aG9kXG4gIC5tZXRob2QoJyRiaW5kJywgZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSkge1xuICAgICAgdGhpcy4kX2xpc3RlbmVyc1t0eXBlXSA9IFtdO1xuICAgIH1cbiAgICB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdLnB1c2goY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBtZXRob2RcbiAgLm1ldGhvZCgnJHVuYmluZCAnLCBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSB7XG4gICAgICB2YXIgc3RhY2sgPSB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdGFjay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKHN0YWNrW2ldID09PSBjYWxsYmFjaykge1xuICAgICAgICAgIHN0YWNrLnNwbGljZShpLCAxKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy4kdW5iaW5kKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gbWV0aG9kXG4gIC5tZXRob2QoJyRlbWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnR5cGUgaW4gdGhpcy4kX2xpc3RlbmVycykge1xuICAgICAgdmFyIHN0YWNrID0gdGhpcy4kX2xpc3RlbmVyc1tldmVudC50eXBlXTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gc3RhY2subGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHN0YWNrW2ldLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMvaWRiRXZlbnRUYXJnZXQuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiTW9kZWxcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiUXVlcnksIGlkYkV2ZW50VGFyZ2V0LCBsYlJlc291cmNlLCAkdGltZW91dCkgeyAnbmdJbmplY3QnO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQnVzY2FyIHVuIGNhbXBvXHJcbmNvbnN0IGRlZXBGaWVsZCA9IGZ1bmN0aW9uIChvYmosIGZpZWxkLCBjYikge1xyXG5cclxuICBjb25zdCBmaWVsZHMgPSBmaWVsZC5zcGxpdCgnLicpO1xyXG4gIGNvbnN0IGxhc3RGaWVsZCA9IGZpZWxkcy5wb3AoKTtcclxuXHJcbiAgcmV0dXJuIChmdW5jdGlvbiBfc2V0KG9iaikge1xyXG4gICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMClcclxuICAgICAgcmV0dXJuIGNiKG9iaiwgbGFzdEZpZWxkKTtcclxuICAgIGNvbnN0IGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XHJcbiAgICBpZiAodHlwZW9mIG9ialtmaWVsZF0gPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICBvYmpbZmllbGRdID0ge307XHJcbiAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcclxuICB9KShvYmopO1xyXG5cclxufTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xyXG5jb25zdCBnZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gKG9iaiwgZmllbGQpIHtcclxuICByZXR1cm4gZGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXHJcbmNvbnN0IHNldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgdmFsdWUpIHtcclxuICBkZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xyXG4gIH0pO1xyXG4gIHJldHVybiBvYmo7XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5yZXR1cm4gZnVuY3Rpb24gaWRiTW9kZWxGYWN0b3J5IChkYiwgbmFtZSwgc29ja2V0KSB7XHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcclxuICAvLyAkX3JlbW90ZVxyXG4gIC8vICRfdmVyc2lvbmluZ1xyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGZ1bmN0aW9uIGlkYk1vZGVsKCkge1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihpZGJNb2RlbClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAuaW5oZXJpdChpZGJFdmVudFRhcmdldClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJvcGllZGFkZXMgc3RhdGljYXNcclxuICAuc3RhdGljKCckZGInLCBkYilcclxuICAuc3RhdGljKCckbmFtZScsIG5hbWUpXHJcbiAgLnN0YXRpYygnJHNvY2tldCcsIHNvY2tldClcclxuXHJcbiAgLnN0YXRpYygnJGlkJywgeyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OiB0cnVlIH0pXHJcbiAgLnN0YXRpYygnJGZpZWxkcycsIHtcclxuICAgIGlkOiB7XHJcbiAgICAgIGlkOiB0cnVlLFxyXG4gICAgICBuYW1lOiAnaWQnLFxyXG4gICAgICB0eXBlOiAnbnVtYmVyJ1xyXG4gICAgfVxyXG4gIH0pXHJcbiAgLnN0YXRpYygnJGluZGV4ZXNUb0NyZWF0ZScsIFtdKVxyXG4gIC5zdGF0aWMoJyRpbnN0YW5jZXMnLCB7fSlcclxuICAgIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRnZXRLZXlGcm9tJywgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZShkYXRhLCB0aGlzLiRpZC5rZXlQYXRoKTtcclxuXHJcbiAgfSlcclxuICAgIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRhZGRJbmRleCcsIGZ1bmN0aW9uIChmaWVsZHMsIG5hbWUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICB0aGlzLiRpbmRleGVzVG9DcmVhdGUucHVzaChhcmd1bWVudHMpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckY3JlYXRlJywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIGNvbnN0IHN0b3JlID0gdGhpei4kZGIuJGNyZWF0ZVN0b3JlKHRoaXouJG5hbWUsIHRoaXouJGlkKTtcclxuXHJcbiAgICB0aGl6LiRpbmRleGVzVG9DcmVhdGUubWFwKGZ1bmN0aW9uIChhcmdzKSB7XHJcbiAgICAgIHN0b3JlLiRjcmVhdGVJbmRleC5hcHBseShzdG9yZSwgYXJncyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoY2IpIGNiKHRoaXosIHN0b3JlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGRyb3AnLCBmdW5jdGlvbiAoY2IpIHtcclxuXHJcbiAgICB0aGlzLiRkYi4kZHJvcFN0b3JlKHRoaXMuJG5hbWUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckd3JpdGVyJywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIHJldHVybiB0aGl6LiRkYi4kc3RvcmUodGhpei4kbmFtZSkuJHdyaXRlcihjYilcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHN0b3Jlcykge1xyXG4gICAgICAgIHJldHVybiBzdG9yZXNbdGhpei4kbmFtZV1cclxuICAgICAgfSlcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJHJlYWRlcicsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICByZXR1cm4gdGhpei4kZGIuJHN0b3JlKHRoaXouJG5hbWUpLiRyZWFkZXIoY2IpXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChzdG9yZXMpIHtcclxuICAgICAgICByZXR1cm4gc3RvcmVzW3RoaXouJG5hbWVdXHJcbiAgICAgIH0pXHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnRyb2wgZGUgdmVyc2lvbmVzIGRlbCBtb2RlbG9cclxuICAuc3RhdGljKCckdmVyc2lvbmluZycsIGZ1bmN0aW9uIChtb2RlbE5hbWUsIGNiKSB7XHJcbiAgICBpZiAoIXRoaXMuJF92ZXJzaW9uaW5nKSB7XHJcbiAgICAgICAgXHJcbiAgICAgIGlmICh0eXBlb2YgbW9kZWxOYW1lID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY2IgPSBtb2RlbE5hbWU7XHJcbiAgICAgICAgbW9kZWxOYW1lID0gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTaSBlbCBtb2RlbCBubyB0aWVuZSBub21icmUgc2UgYWdyZWdhXHJcbiAgICAgIGlmICghbW9kZWxOYW1lKXtcclxuICAgICAgICBtb2RlbE5hbWUgPSB0aGlzLiRuYW1lKydfdmVyc2lvbmluZyc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENyZWFyIG1vZGVsbyBwYXJhIGVsIG1hbmVqbyBkZSBkYXRvc1xyXG4gICAgICB0aGlzLiRfdmVyc2lvbmluZyA9IHRoaXMuJGRiLiRtb2RlbChtb2RlbE5hbWUpXHJcbiAgICAgICAgLiRrZXkodGhpcy4kaWQua2V5UGF0aCwgdHJ1ZSlcclxuICAgICAgICAuJGZpZWxkKCdoYXNoJywge1xyXG4gICAgICAgICAgJ3R5cGUnOiAnc3RyaW5nJyxcclxuICAgICAgICAgICdyZXF1aXJlZCc6IHRydWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNiKSBjYih0aGlzLiRfdmVyc2lvbmluZyk7XHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25maWd1cmEgZWwgcmVtb3RlIGFwaVxyXG4gIC5zdGF0aWMoJyRyZW1vdGUnLCBmdW5jdGlvbiAodXJsLCBhcmdzLCBhY3Rpb25zKSB7XHJcblxyXG4gICAgdGhpcy4kX3JlbW90ZSA9IGxiUmVzb3VyY2UuYXBwbHkobGJSZXNvdXJjZSwgYXJndW1lbnRzKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRnZXRJbnN0YW5jZScsIGZ1bmN0aW9uIChrZXkpIHtcclxuXHJcbiAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcclxuICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCB8fCBrZXkgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG5ldyB0aGlzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTm8gZXhpc3RlIGxhIGluc3RhbmNpYSBlbnRvbmNlIHNlIGNyZWFcclxuICAgIGlmICghdGhpcy4kaW5zdGFuY2VzW2tleV0pe1xyXG4gICAgICB0aGlzLiRpbnN0YW5jZXNba2V5XSA9IG5ldyB0aGlzKCk7XHJcbiAgICAgIHRoaXMuJGluc3RhbmNlc1trZXldLiRzZXQodGhpcy4kaWQua2V5UGF0aCwga2V5KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHRoaXMuJGluc3RhbmNlc1trZXldO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckcHV0JywgZnVuY3Rpb24gKG9iaiwga2V5KSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLiRnZXRWYWx1ZXMob2JqKTtcclxuICAgIGFyZ3NbMF0gPSBkYXRhO1xyXG5cclxuICAgIHJldHVybiB0aGl6LiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gICAgICByZXR1cm4gc3RvcmUuJHB1dC5hcHBseShzdG9yZSwgYXJncykudGhlbihmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpei4kZ2V0SW5zdGFuY2Uoa2V5KTtcclxuICAgICAgICByZWNvcmQuJHNldFZhbHVlcyhkYXRhKTtcclxuICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xyXG4gICAgICAgIHJldHVybiByZWNvcmQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRhZGQnLCBmdW5jdGlvbiAob2JqLCBrZXkpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgY29uc3QgZGF0YSA9IHRoaXMuJGdldFZhbHVlcyhvYmopO1xyXG4gICAgYXJnc1swXSA9IGRhdGE7XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJHdyaXRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBzdG9yZS4kYWRkLmFwcGx5KHN0b3JlLCBhcmdzKS50aGVuKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICBjb25zdCByZWNvcmQgPSB0aGl6LiRnZXRJbnN0YW5jZShrZXkpO1xyXG4gICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGRhdGEpO1xyXG4gICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIHJlY29yZDtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGRlbGV0ZScsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIFxyXG4gICAgcmV0dXJuIHRoaXMuJHdyaXRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBzdG9yZS4kZGVsZXRlLmFwcGx5KHN0b3JlLCBhcmdzKTtcclxuICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckY2xlYXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpcy4kd3JpdGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRjbGVhci5hcHBseShzdG9yZSwgYXJncyk7XHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGdldCcsIGZ1bmN0aW9uIChrZXkpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgY29uc3QgcmVjb3JkID0gdGhpcy4kZ2V0SW5zdGFuY2Uoa2V5KTtcclxuXHJcbiAgICByZWNvcmQuJHByb21pc2UgPSB0aGl6LiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gICAgICByZXR1cm4gc3RvcmUuJGdldC5hcHBseShzdG9yZSwgYXJncykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGRhdGEpO1xyXG4gICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIHJlY29yZDtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVjb3JkO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0S2V5JywgZnVuY3Rpb24gKHF1ZXJ5KSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuXHJcbiAgICByZXR1cm4gdGhpei4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRnZXRLZXkuYXBwbHkoc3RvcmUsIGFyZ3MpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZ2V0QWxsJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuXHJcbiAgICByZXN1bHQuJHByb21pc2UgPSB0aGl6LiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gICAgICByZXR1cm4gc3RvcmUuJGdldEFsbC5hcHBseShzdG9yZSwgYXJncykudGhlbihmdW5jdGlvbiAoYXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIGFyci5tYXAoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgIGNvbnN0IHJlY29yZCA9IHRoaXouJGdldEluc3RhbmNlKHRoaXouJGdldEtleUZyb20oZGF0YSkpO1xyXG4gICAgICAgICAgcmVjb3JkLiRzZXRWYWx1ZXMoZGF0YSk7XHJcbiAgICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2gocmVjb3JkKTtcclxuICAgICAgICAgIHJldHVybiByZWNvcmQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGdldEFsbEtleXMnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XHJcbiAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gW107XHJcblxyXG4gICAgcmVzdWx0LiRwcm9taXNlID0gdGhpcy4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRnZXRBbGxLZXlzLmFwcGx5KHN0b3JlLCBhcmdzKS50aGVuKGZ1bmN0aW9uIChhcnIpIHtcclxuICAgICAgICByZXR1cm4gYXJyLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICByZXN1bHQucHVzaChrZXkpO1xyXG4gICAgICAgICAgcmV0dXJuIGtleTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGNvdW50JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcbiAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xyXG5cclxuICAgIHJldHVybiB0aGlzLiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gICAgICByZXR1cm4gc3RvcmUuJGNvdW50LmFwcGx5KHN0b3JlLCBhcmdzKTtcclxuICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZmluZCcsIGZ1bmN0aW9uIChmaWx0ZXJzKSB7XHJcbiAgICBcclxuICAgIHJldHVybiBuZXcgaWRiUXVlcnkodGhpcywgZmlsdGVycyk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFzaWduYSBsYSBlc3BlY2lmaWNhY2nDs24gZGUgbG9zIGNhbXBvc1xyXG4gIC5zdGF0aWMoJyRmaWVsZCcsIGZ1bmN0aW9uIChuYW1lLCBmaWVsZCkge1xyXG5cclxuICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGZpZWxkID0geyBcInR5cGVcIjogZmllbGQgfTtcclxuICAgIH1cclxuXHJcbiAgICBmaWVsZC5uYW1lID0gbmFtZTtcclxuXHJcbiAgICB0aGlzLiRmaWVsZHNbbmFtZV0gPSBmaWVsZDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQWdyZWdhIGVsIGVsIGNhbXBvIElEIGF1dG9tYXRpY2FtZW50ZVxyXG4gIC5zdGF0aWMoJyRrZXknLCBmdW5jdGlvbiAoa2V5LCBhdXRvSW5jcmVtZW50LCB0eXBlKSB7XHJcbiAgICBpZih0eXBlb2Yga2V5ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgYXV0b0luY3JlbWVudCA9IGtleTtcclxuICAgIH1cclxuICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCB8fCBrZXkgPT09IG51bGwgfHwgdHlwZW9mIGtleSA9PT0gJ2Jvb2xlYW4nKXtcclxuICAgICAga2V5ID0gJ2lkJztcclxuICAgIH1cclxuICAgIGlmKHR5cGVvZiBhdXRvSW5jcmVtZW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgICB0eXBlID0gYXV0b0luY3JlbWVudDtcclxuICAgICAgYXV0b0luY3JlbWVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoYXV0b0luY3JlbWVudCA9PT0gdW5kZWZpbmVkIHx8IGF1dG9JbmNyZW1lbnQgPT09IG51bGwpe1xyXG4gICAgICBhdXRvSW5jcmVtZW50ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmKHR5cGVvZiBhdXRvSW5jcmVtZW50ID09PSAnYm9vbGVhbicgfHwgdHlwZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdHlwZSA9ICdudW1iZXInO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuJGlkLmtleVBhdGggPSBrZXk7XHJcbiAgICB0aGlzLiRpZC5hdXRvSW5jcmVtZW50ID0gYXV0b0luY3JlbWVudDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy4kZmllbGQoa2V5LCB7XHJcbiAgICAgIGlkOiB0cnVlLFxyXG4gICAgICB0eXBlOiB0eXBlLFxyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcclxuICAuc3RhdGljKCckZ2V0VmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgXHJcbiAgICBjb25zdCB2YWx1ZXMgPSB7fTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLiRmaWVsZHMpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgY29uc3QgdmFsdWUgPSBnZXRGaWVsZFZhbHVlKGRhdGEsIGZpZWxkKTtcclxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHNldEZpZWxkVmFsdWUodmFsdWVzLCBmaWVsZCwgdmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdmFsdWVzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBZ3JlZ2EgZWwgZWwgY2FtcG8gSUQgYXV0b21hdGljYW1lbnRlXHJcbiAgLnN0YXRpYygnJGJ1aWxkJywgZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcclxuXHJcbiAgICBidWlsZENhbGxiYWNrKHRoaXMpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByb3BpZWRhZGVzXHJcbiAgLnByb3BlcnR5KCckX3ZhbHVlcycsIHsgdmFsdWU6IG5ldyBDbGF6emVyKHt9KVxyXG4gICAgLnN0YXRpYygnbG9jYWwnLCB7fSlcclxuICAgIC5zdGF0aWMoJ3JlbW90ZScsIHt9KVxyXG4gICAgLmNsYXp6XHJcbiAgfSlcclxuXHJcbiAgLnByb3BlcnR5KCckX3ZlcnNpb25zJywgeyB2YWx1ZToge30gfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXHJcbiAgLm1ldGhvZCgnJGdldCcsIGZ1bmN0aW9uIChmaWVsZCkge1xyXG5cclxuICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKHRoaXMsIGZpZWxkKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cclxuICAubWV0aG9kKCckc2V0JywgZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkge1xyXG5cclxuICAgIHJldHVybiBzZXRGaWVsZFZhbHVlKHRoaXMsIGZpZWxkKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxyXG4gIC5tZXRob2QoJyRnZXRWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgIHJldHVybiBpZGJNb2RlbC4kZ2V0VmFsdWVzKGRhdGEgfHwgdGhpcyk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRnZXRMb2NhbFZhbHVlcycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy4kZ2V0VmFsdWVzKHRoaXMuJF92YWx1ZXMubG9jYWwpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZ2V0UmVtb3RlVmFsdWVzJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kX3ZhbHVlcy5yZW1vdGUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc2V0VmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICBzZXRGaWVsZFZhbHVlKHRoaXosIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHNldExvY2FsVmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJF92YWx1ZXMubG9jYWwsIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHNldFJlbW90ZVZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRfdmFsdWVzLnJlbW90ZSwgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGl6O1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCcka2V5JywgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICByZXR1cm4gZ2V0RmllbGRWYWx1ZShkYXRhLCB0aGlzLiRpZC5rZXlQYXRoKTtcclxuXHJcbiAgfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBGdW5jaW9uIHF1ZSBoYWNlIGVzY3VjaGFycyBsb3MgbWVuc2FqZXMgZGVsIHNvY2tldCBwYXJhIGVsIG1vZGVsXHJcbiAgLm1ldGhvZCgnJGxpc3RlbicsIGZ1bmN0aW9uIChkYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgaWYgKCF0aGlzLiRzb2NrZXQpIHRocm93IG5ldyBFcnJvcignaWRiTW9kZWwuRG9lc05vdEhhdmVTb2NrZXRJbnN0YW5jZScpO1xyXG5cclxuICAgIC8vIENyZWFyIHVuYSBzdWJzY3JpcGNpb24gYWwgc29ja2V0IHBhcmEgY3VhbmRvIHNlIHJlY2liYW4gZGF0b3NcclxuICAgIC8vIHBhcmEgbGEgaW5zdGFuY2lhIGFjdHVhbFxyXG4gICAgdGhpcy4kc29ja2V0LnN1YnNjcmliZSh7XHJcbiAgICAgIG1vZGVsTmFtZTogaWRiTW9kZWwuJG5hbWUsXHJcbiAgICAgIGV2ZW50TmFtZTogJ3VwZGF0ZScsXHJcbiAgICAgIG1vZGVsSWQ6IHRoaXouJGtleSgpLFxyXG4gICAgfSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgIC8vIEEgcmVjaWJpciBkYXRvcyBkZWwgc29ja2V0IGFzaWduYXIgbG9zIHZhbG9yZXNcclxuICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIEVtaXRpciBldmVudG8gZGUgZGF0b3MgcmVjaWJpZG9yIHBhcmEgZWwgbW9kZWxvXHJcbiAgICAgICAgdGhpei4kc2V0UmVtb3RlVmFsdWVzKGRhdGEudmFsdWVzLCBkYXRhLnZlcnNpb24pO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn07fVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qcyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYk1vZGVsXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlF1ZXJ5LCBpZGJFdmVudFRhcmdldCwgbGJSZXNvdXJjZSwgJHRpbWVvdXQpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBCdXNjYXIgdW4gY2FtcG9cblxuICB2YXIgZGVlcEZpZWxkID0gZnVuY3Rpb24gZGVlcEZpZWxkKG9iaiwgZmllbGQsIGNiKSB7XG5cbiAgICB2YXIgZmllbGRzID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICB2YXIgbGFzdEZpZWxkID0gZmllbGRzLnBvcCgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIF9zZXQob2JqKSB7XG4gICAgICBpZiAoZmllbGRzLmxlbmd0aCA9PSAwKSByZXR1cm4gY2Iob2JqLCBsYXN0RmllbGQpO1xuICAgICAgdmFyIGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XG4gICAgICBpZiAodHlwZW9mIG9ialtmaWVsZF0gPT09ICd1bmRlZmluZWQnKSBvYmpbZmllbGRdID0ge307XG4gICAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcbiAgICB9KG9iaik7XG4gIH07XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXG4gIHZhciBnZXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gZ2V0RmllbGRWYWx1ZShvYmosIGZpZWxkKSB7XG4gICAgcmV0dXJuIGRlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cbiAgdmFyIHNldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiBzZXRGaWVsZFZhbHVlKG9iaiwgZmllbGQsIHZhbHVlKSB7XG4gICAgZGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgb2JqW2xhc3RGaWVsZF0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHJldHVybiBmdW5jdGlvbiBpZGJNb2RlbEZhY3RvcnkoZGIsIG5hbWUsIHNvY2tldCkge1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgICAvLyAkX3JlbW90ZVxuICAgIC8vICRfdmVyc2lvbmluZ1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgZnVuY3Rpb24gaWRiTW9kZWwoKSB7fVxuXG4gICAgcmV0dXJuIG5ld1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIENvbnN0cnVjdG9yXG4gICAgQ2xhenplcihpZGJNb2RlbClcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEhlcmVuY2lhXG4gICAgLmluaGVyaXQoaWRiRXZlbnRUYXJnZXQpXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQcm9waWVkYWRlcyBzdGF0aWNhc1xuICAgIC5zdGF0aWMoJyRkYicsIGRiKS5zdGF0aWMoJyRuYW1lJywgbmFtZSkuc3RhdGljKCckc29ja2V0Jywgc29ja2V0KS5zdGF0aWMoJyRpZCcsIHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9KS5zdGF0aWMoJyRmaWVsZHMnLCB7XG4gICAgICBpZDoge1xuICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgbmFtZTogJ2lkJyxcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgIH1cbiAgICB9KS5zdGF0aWMoJyRpbmRleGVzVG9DcmVhdGUnLCBbXSkuc3RhdGljKCckaW5zdGFuY2VzJywge30pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckZ2V0S2V5RnJvbScsIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsIHRoaXMuJGlkLmtleVBhdGgpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckYWRkSW5kZXgnLCBmdW5jdGlvbiAoZmllbGRzLCBuYW1lLCBvcHRpb25zKSB7XG5cbiAgICAgIHRoaXMuJGluZGV4ZXNUb0NyZWF0ZS5wdXNoKGFyZ3VtZW50cyk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckY3JlYXRlJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIHZhciBzdG9yZSA9IHRoaXouJGRiLiRjcmVhdGVTdG9yZSh0aGl6LiRuYW1lLCB0aGl6LiRpZCk7XG5cbiAgICAgIHRoaXouJGluZGV4ZXNUb0NyZWF0ZS5tYXAoZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgc3RvcmUuJGNyZWF0ZUluZGV4LmFwcGx5KHN0b3JlLCBhcmdzKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoY2IpIGNiKHRoaXosIHN0b3JlKTtcblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRkcm9wJywgZnVuY3Rpb24gKGNiKSB7XG5cbiAgICAgIHRoaXMuJGRiLiRkcm9wU3RvcmUodGhpcy4kbmFtZSk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckd3JpdGVyJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIHJldHVybiB0aGl6LiRkYi4kc3RvcmUodGhpei4kbmFtZSkuJHdyaXRlcihjYikudGhlbihmdW5jdGlvbiAoc3RvcmVzKSB7XG4gICAgICAgIHJldHVybiBzdG9yZXNbdGhpei4kbmFtZV07XG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJHJlYWRlcicsIGZ1bmN0aW9uIChjYikge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICByZXR1cm4gdGhpei4kZGIuJHN0b3JlKHRoaXouJG5hbWUpLiRyZWFkZXIoY2IpLnRoZW4oZnVuY3Rpb24gKHN0b3Jlcykge1xuICAgICAgICByZXR1cm4gc3RvcmVzW3RoaXouJG5hbWVdO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIENvbnRyb2wgZGUgdmVyc2lvbmVzIGRlbCBtb2RlbG9cbiAgICAuc3RhdGljKCckdmVyc2lvbmluZycsIGZ1bmN0aW9uIChtb2RlbE5hbWUsIGNiKSB7XG4gICAgICBpZiAoIXRoaXMuJF92ZXJzaW9uaW5nKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBtb2RlbE5hbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjYiA9IG1vZGVsTmFtZTtcbiAgICAgICAgICBtb2RlbE5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTaSBlbCBtb2RlbCBubyB0aWVuZSBub21icmUgc2UgYWdyZWdhXG4gICAgICAgIGlmICghbW9kZWxOYW1lKSB7XG4gICAgICAgICAgbW9kZWxOYW1lID0gdGhpcy4kbmFtZSArICdfdmVyc2lvbmluZyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhciBtb2RlbG8gcGFyYSBlbCBtYW5lam8gZGUgZGF0b3NcbiAgICAgICAgdGhpcy4kX3ZlcnNpb25pbmcgPSB0aGlzLiRkYi4kbW9kZWwobW9kZWxOYW1lKS4ka2V5KHRoaXMuJGlkLmtleVBhdGgsIHRydWUpLiRmaWVsZCgnaGFzaCcsIHtcbiAgICAgICAgICAndHlwZSc6ICdzdHJpbmcnLFxuICAgICAgICAgICdyZXF1aXJlZCc6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYikgY2IodGhpcy4kX3ZlcnNpb25pbmcpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGlcbiAgICAuc3RhdGljKCckcmVtb3RlJywgZnVuY3Rpb24gKHVybCwgYXJncywgYWN0aW9ucykge1xuXG4gICAgICB0aGlzLiRfcmVtb3RlID0gbGJSZXNvdXJjZS5hcHBseShsYlJlc291cmNlLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXRJbnN0YW5jZScsIGZ1bmN0aW9uIChrZXkpIHtcblxuICAgICAgLy8gRWwgb2JqZXRvIG5vIHRpZW5lIElEXG4gICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQgfHwga2V5ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcygpO1xuICAgICAgfVxuXG4gICAgICAvLyBObyBleGlzdGUgbGEgaW5zdGFuY2lhIGVudG9uY2Ugc2UgY3JlYVxuICAgICAgaWYgKCF0aGlzLiRpbnN0YW5jZXNba2V5XSkge1xuICAgICAgICB0aGlzLiRpbnN0YW5jZXNba2V5XSA9IG5ldyB0aGlzKCk7XG4gICAgICAgIHRoaXMuJGluc3RhbmNlc1trZXldLiRzZXQodGhpcy4kaWQua2V5UGF0aCwga2V5KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuJGluc3RhbmNlc1trZXldO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckcHV0JywgZnVuY3Rpb24gKG9iaiwga2V5KSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHZhciBkYXRhID0gdGhpcy4kZ2V0VmFsdWVzKG9iaik7XG4gICAgICBhcmdzWzBdID0gZGF0YTtcblxuICAgICAgcmV0dXJuIHRoaXouJHdyaXRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS4kcHV0LmFwcGx5KHN0b3JlLCBhcmdzKS50aGVuKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gdGhpei4kZ2V0SW5zdGFuY2Uoa2V5KTtcbiAgICAgICAgICByZWNvcmQuJHNldFZhbHVlcyhkYXRhKTtcbiAgICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xuICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRhZGQnLCBmdW5jdGlvbiAob2JqLCBrZXkpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdmFyIGRhdGEgPSB0aGlzLiRnZXRWYWx1ZXMob2JqKTtcbiAgICAgIGFyZ3NbMF0gPSBkYXRhO1xuXG4gICAgICByZXR1cm4gdGhpei4kd3JpdGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRhZGQuYXBwbHkoc3RvcmUsIGFyZ3MpLnRoZW4oZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHZhciByZWNvcmQgPSB0aGl6LiRnZXRJbnN0YW5jZShrZXkpO1xuICAgICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGRhdGEpO1xuICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XG4gICAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGRlbGV0ZScsIGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgIHJldHVybiB0aGlzLiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuJGRlbGV0ZS5hcHBseShzdG9yZSwgYXJncyk7XG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGNsZWFyJywgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgIHJldHVybiB0aGlzLiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuJGNsZWFyLmFwcGx5KHN0b3JlLCBhcmdzKTtcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckZ2V0JywgZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB2YXIgcmVjb3JkID0gdGhpcy4kZ2V0SW5zdGFuY2Uoa2V5KTtcblxuICAgICAgcmVjb3JkLiRwcm9taXNlID0gdGhpei4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRnZXQuYXBwbHkoc3RvcmUsIGFyZ3MpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICByZWNvcmQuJHNldFZhbHVlcyhkYXRhKTtcbiAgICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xuICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXRLZXknLCBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICByZXR1cm4gdGhpei4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRnZXRLZXkuYXBwbHkoc3RvcmUsIGFyZ3MpO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXRBbGwnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgICAgcmVzdWx0LiRwcm9taXNlID0gdGhpei4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRnZXRBbGwuYXBwbHkoc3RvcmUsIGFyZ3MpLnRoZW4oZnVuY3Rpb24gKGFycikge1xuICAgICAgICAgIHJldHVybiBhcnIubWFwKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgcmVjb3JkID0gdGhpei4kZ2V0SW5zdGFuY2UodGhpei4kZ2V0S2V5RnJvbShkYXRhKSk7XG4gICAgICAgICAgICByZWNvcmQuJHNldFZhbHVlcyhkYXRhKTtcbiAgICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoZGF0YSk7XG4gICAgICAgICAgICByZXN1bHQucHVzaChyZWNvcmQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGdldEFsbEtleXMnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgICAgcmVzdWx0LiRwcm9taXNlID0gdGhpcy4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRnZXRBbGxLZXlzLmFwcGx5KHN0b3JlLCBhcmdzKS50aGVuKGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgICByZXR1cm4gYXJyLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGNvdW50JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgcmV0dXJuIHRoaXMuJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS4kY291bnQuYXBwbHkoc3RvcmUsIGFyZ3MpO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRmaW5kJywgZnVuY3Rpb24gKGZpbHRlcnMpIHtcblxuICAgICAgcmV0dXJuIG5ldyBpZGJRdWVyeSh0aGlzLCBmaWx0ZXJzKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQXNpZ25hIGxhIGVzcGVjaWZpY2FjacOzbiBkZSBsb3MgY2FtcG9zXG4gICAgLnN0YXRpYygnJGZpZWxkJywgZnVuY3Rpb24gKG5hbWUsIGZpZWxkKSB7XG5cbiAgICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGZpZWxkID0geyBcInR5cGVcIjogZmllbGQgfTtcbiAgICAgIH1cblxuICAgICAgZmllbGQubmFtZSA9IG5hbWU7XG5cbiAgICAgIHRoaXMuJGZpZWxkc1tuYW1lXSA9IGZpZWxkO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQWdyZWdhIGVsIGVsIGNhbXBvIElEIGF1dG9tYXRpY2FtZW50ZVxuICAgIC5zdGF0aWMoJyRrZXknLCBmdW5jdGlvbiAoa2V5LCBhdXRvSW5jcmVtZW50LCB0eXBlKSB7XG4gICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGF1dG9JbmNyZW1lbnQgPSBrZXk7XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQgfHwga2V5ID09PSBudWxsIHx8IHR5cGVvZiBrZXkgPT09ICdib29sZWFuJykge1xuICAgICAgICBrZXkgPSAnaWQnO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBhdXRvSW5jcmVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0eXBlID0gYXV0b0luY3JlbWVudDtcbiAgICAgICAgYXV0b0luY3JlbWVudCA9IG51bGw7XG4gICAgICB9XG4gICAgICBpZiAoYXV0b0luY3JlbWVudCA9PT0gdW5kZWZpbmVkIHx8IGF1dG9JbmNyZW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgYXV0b0luY3JlbWVudCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGF1dG9JbmNyZW1lbnQgPT09ICdib29sZWFuJyB8fCB0eXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0eXBlID0gJ251bWJlcic7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuJGlkLmtleVBhdGggPSBrZXk7XG4gICAgICB0aGlzLiRpZC5hdXRvSW5jcmVtZW50ID0gYXV0b0luY3JlbWVudDtcblxuICAgICAgcmV0dXJuIHRoaXMuJGZpZWxkKGtleSwge1xuICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgdHlwZTogdHlwZVxuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcbiAgICAuc3RhdGljKCckZ2V0VmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgdmFyIHZhbHVlcyA9IHt9O1xuXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLiRmaWVsZHMpLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZ2V0RmllbGRWYWx1ZShkYXRhLCBmaWVsZCk7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc2V0RmllbGRWYWx1ZSh2YWx1ZXMsIGZpZWxkLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBZ3JlZ2EgZWwgZWwgY2FtcG8gSUQgYXV0b21hdGljYW1lbnRlXG4gICAgLnN0YXRpYygnJGJ1aWxkJywgZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcblxuICAgICAgYnVpbGRDYWxsYmFjayh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQcm9waWVkYWRlc1xuICAgIC5wcm9wZXJ0eSgnJF92YWx1ZXMnLCB7IHZhbHVlOiBuZXcgQ2xhenplcih7fSkuc3RhdGljKCdsb2NhbCcsIHt9KS5zdGF0aWMoJ3JlbW90ZScsIHt9KS5jbGF6elxuICAgIH0pLnByb3BlcnR5KCckX3ZlcnNpb25zJywgeyB2YWx1ZToge30gfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcbiAgICAubWV0aG9kKCckZ2V0JywgZnVuY3Rpb24gKGZpZWxkKSB7XG5cbiAgICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKHRoaXMsIGZpZWxkKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cbiAgICAubWV0aG9kKCckc2V0JywgZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkge1xuXG4gICAgICByZXR1cm4gc2V0RmllbGRWYWx1ZSh0aGlzLCBmaWVsZCk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcbiAgICAubWV0aG9kKCckZ2V0VmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgcmV0dXJuIGlkYk1vZGVsLiRnZXRWYWx1ZXMoZGF0YSB8fCB0aGlzKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLm1ldGhvZCgnJGdldExvY2FsVmFsdWVzJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICByZXR1cm4gdGhpcy4kZ2V0VmFsdWVzKHRoaXMuJF92YWx1ZXMubG9jYWwpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCckZ2V0UmVtb3RlVmFsdWVzJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICByZXR1cm4gdGhpcy4kZ2V0VmFsdWVzKHRoaXMuJF92YWx1ZXMucmVtb3RlKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLm1ldGhvZCgnJHNldFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCckc2V0TG9jYWxWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIHNldEZpZWxkVmFsdWUodGhpei4kX3ZhbHVlcy5sb2NhbCwgZmllbGQsIGRhdGFbZmllbGRdKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLm1ldGhvZCgnJHNldFJlbW90ZVZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRfdmFsdWVzLnJlbW90ZSwgZmllbGQsIGRhdGFbZmllbGRdKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLm1ldGhvZCgnJGtleScsIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsIHRoaXMuJGlkLmtleVBhdGgpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBGdW5jaW9uIHF1ZSBoYWNlIGVzY3VjaGFycyBsb3MgbWVuc2FqZXMgZGVsIHNvY2tldCBwYXJhIGVsIG1vZGVsXG4gICAgLm1ldGhvZCgnJGxpc3RlbicsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICBpZiAoIXRoaXMuJHNvY2tldCkgdGhyb3cgbmV3IEVycm9yKCdpZGJNb2RlbC5Eb2VzTm90SGF2ZVNvY2tldEluc3RhbmNlJyk7XG5cbiAgICAgIC8vIENyZWFyIHVuYSBzdWJzY3JpcGNpb24gYWwgc29ja2V0IHBhcmEgY3VhbmRvIHNlIHJlY2liYW4gZGF0b3NcbiAgICAgIC8vIHBhcmEgbGEgaW5zdGFuY2lhIGFjdHVhbFxuICAgICAgdGhpcy4kc29ja2V0LnN1YnNjcmliZSh7XG4gICAgICAgIG1vZGVsTmFtZTogaWRiTW9kZWwuJG5hbWUsXG4gICAgICAgIGV2ZW50TmFtZTogJ3VwZGF0ZScsXG4gICAgICAgIG1vZGVsSWQ6IHRoaXouJGtleSgpXG4gICAgICB9LCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgIC8vIEEgcmVjaWJpciBkYXRvcyBkZWwgc29ja2V0IGFzaWduYXIgbG9zIHZhbG9yZXNcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIEVtaXRpciBldmVudG8gZGUgZGF0b3MgcmVjaWJpZG9yIHBhcmEgZWwgbW9kZWxvXG4gICAgICAgICAgdGhpei4kc2V0UmVtb3RlVmFsdWVzKGRhdGEudmFsdWVzLCBkYXRhLnZlcnNpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuY2xheno7XG4gIH07XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJUcmFuc2FjdGlvblxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJUcmFuc2FjdGlvbiA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgICAgIG9iamVjdFN0b3JlTmFtZXM7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJEYXRhYmFzZSAgICAgICAgZGI7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTUV4Y2VwdGlvbiAgICAgICBlcnJvcjtcclxuICogXHJcbiAqICAgSURCT2JqZWN0U3RvcmUgb2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGFib3J0KCk7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25hYm9ydDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uY29tcGxldGU7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZW51bSBJREJUcmFuc2FjdGlvbk1vZGUge1xyXG4gKiAgIFwicmVhZG9ubHlcIixcclxuICogICBcInJlYWR3cml0ZVwiLFxyXG4gKiAgIFwidmVyc2lvbmNoYW5nZVwiXHJcbiAqIH07XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiU3RvcmUpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRfcHJvbWlzZVxyXG4gIFxyXG4gIGNvbnN0IFRyYW5zYWN0aW9uTW9kZSA9IG5ldyBDbGF6emVyKHt9KVxyXG4gICAgICAgIC5zdGF0aWMoJ1JlYWRPbmx5JywgJ3JlYWRvbmx5JylcclxuICAgICAgICAuc3RhdGljKCdSZWFkV3JpdGUnLCAncmVhZHdyaXRlJylcclxuICAgICAgICAuc3RhdGljKCdWZXJzaW9uQ2hhbmdlJywgICd2ZXJzaW9uY2hhbmdlJyk7XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiVHJhbnNhY3Rpb24gKG1lKSB7XHJcbiAgICBcclxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBTdGF0aWNzXHJcbiAgLnN0YXRpYygnVHJhbnNhY3Rpb25Nb2RlJywgVHJhbnNhY3Rpb25Nb2RlLmNsYXp6KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJGRiJywgICAgICAgICAgJ2RiJylcclxuICAuZ2V0dGVyKCckbW9kZScsICAgICAgICAnbW9kZScpXHJcbiAgLmdldHRlcignJGVycm9yJywgICAgICAgJ2Vycm9yJylcclxuICAuZ2V0dGVyKCckc3RvcmVOYW1lcycsICAnb2JqZWN0U3RvcmVOYW1lcycpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEV2ZW50IGhhbmRsZXJzXHJcbiAgLmhhbmRsZXJFdmVudCgnJGFib3J0ZWQnLCAgICdvbmFib3J0JylcclxuICAuaGFuZGxlckV2ZW50KCckY29tcGxldGVkJywgJ29uY29tcGxldGUnKVxyXG4gIC5oYW5kbGVyRXZlbnQoJyRmYWlsZWQnLCAgICAnb25lcnJvcicpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRzdG9yZScsIGZ1bmN0aW9uKG5hbWUpe1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiU3RvcmUodGhpcy4kbWUub2JqZWN0U3RvcmUuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckYWJvcnQnLCBmdW5jdGlvbigpe1xyXG5cclxuICAgIHRoaXMuJG1lLmFib3J0LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9wZXJ0eVxyXG4gIC5wcm9wZXJ0eSgnJHByb21pc2UnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlmICh0aGl6LiRfcHJvbWlzZSkgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgICAgLy8gQ3JlYXIgcHJvbWlzZSBwYXJhIGVsIHJlcXVlc3RcclxuICAgICAgdGhpei4kX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdGhpei4kY29tcGxldGVkKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVzb2x2ZShldmVudCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuJGZhaWxlZChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlamVjdChldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbmV3IENsYXp6ZXIodGhpei4kX3Byb21pc2UpLnN0YXRpYygnJHRyYW5zYWN0aW9uJywgdGhpeik7XHJcblxyXG4gICAgICByZXR1cm4gdGhpei4kX3Byb21pc2U7XHJcblxyXG4gICAgfVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzL2lkYlRyYW5zYWN0aW9uLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiVHJhbnNhY3Rpb25cclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCVHJhbnNhY3Rpb24gOiBFdmVudFRhcmdldCB7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgICAgICBvYmplY3RTdG9yZU5hbWVzO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbk1vZGUgbW9kZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCRGF0YWJhc2UgICAgICAgIGRiO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01FeGNlcHRpb24gICAgICAgZXJyb3I7XHJcbiAqIFxyXG4gKiAgIElEQk9iamVjdFN0b3JlIG9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lKTtcclxuICogICB2b2lkICAgICAgICAgICBhYm9ydCgpO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYWJvcnQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmNvbXBsZXRlO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogfTtcclxuICogXHJcbiAqIGVudW0gSURCVHJhbnNhY3Rpb25Nb2RlIHtcclxuICogICBcInJlYWRvbmx5XCIsXHJcbiAqICAgXCJyZWFkd3JpdGVcIixcclxuICogICBcInZlcnNpb25jaGFuZ2VcIlxyXG4gKiB9O1xyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlN0b3JlKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXG4gIC8vICRfcHJvbWlzZVxuXG4gIHZhciBUcmFuc2FjdGlvbk1vZGUgPSBuZXcgQ2xhenplcih7fSkuc3RhdGljKCdSZWFkT25seScsICdyZWFkb25seScpLnN0YXRpYygnUmVhZFdyaXRlJywgJ3JlYWR3cml0ZScpLnN0YXRpYygnVmVyc2lvbkNoYW5nZScsICd2ZXJzaW9uY2hhbmdlJyk7XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJUcmFuc2FjdGlvbihtZSkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEhlcmVuY2lhXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTdGF0aWNzXG4gIC5zdGF0aWMoJ1RyYW5zYWN0aW9uTW9kZScsIFRyYW5zYWN0aW9uTW9kZS5jbGF6eilcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR2V0dGVyc1xuICAuZ2V0dGVyKCckZGInLCAnZGInKS5nZXR0ZXIoJyRtb2RlJywgJ21vZGUnKS5nZXR0ZXIoJyRlcnJvcicsICdlcnJvcicpLmdldHRlcignJHN0b3JlTmFtZXMnLCAnb2JqZWN0U3RvcmVOYW1lcycpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGhhbmRsZXJzXG4gIC5oYW5kbGVyRXZlbnQoJyRhYm9ydGVkJywgJ29uYWJvcnQnKS5oYW5kbGVyRXZlbnQoJyRjb21wbGV0ZWQnLCAnb25jb21wbGV0ZScpLmhhbmRsZXJFdmVudCgnJGZhaWxlZCcsICdvbmVycm9yJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHN0b3JlJywgZnVuY3Rpb24gKG5hbWUpIHtcblxuICAgIHJldHVybiBuZXcgaWRiU3RvcmUodGhpcy4kbWUub2JqZWN0U3RvcmUuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckYWJvcnQnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLiRtZS5hYm9ydC5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUHJvcGVydHlcbiAgLnByb3BlcnR5KCckcHJvbWlzZScsIHtcblxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgaWYgKHRoaXouJF9wcm9taXNlKSByZXR1cm4gdGhpei4kX3Byb21pc2U7XG5cbiAgICAgIC8vIENyZWFyIHByb21pc2UgcGFyYSBlbCByZXF1ZXN0XG4gICAgICB0aGl6LiRfcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdGhpei4kY29tcGxldGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xuICAgICAgICB9KS4kZmFpbGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJlamVjdChldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIG5ldyBDbGF6emVyKHRoaXouJF9wcm9taXNlKS5zdGF0aWMoJyR0cmFuc2FjdGlvbicsIHRoaXopO1xuXG4gICAgICByZXR1cm4gdGhpei4kX3Byb21pc2U7XG4gICAgfVxuXG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzL2lkYlRyYW5zYWN0aW9uLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYlF1ZXJ5XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKENsYXp6ZXIpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlF1ZXJ5IChtb2RlbCwgcXVlcnkpIHtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKVxyXG4gICAgICAuc3RhdGljKCckbW9kZWwnLCBtb2RlbClcclxuICAgICAgLnN0YXRpYygnJHF1ZXJ5JywgcXVlcnkpXHJcbiAgICAgIDtcclxuXHJcbiAgfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBTdGF0aWNcclxuICAucHJvcGVydHkoJyRyZXN1bHQnLCB7IHZhbHVlOiBbXSB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBtZXRob2RcclxuICAubWV0aG9kKCckZ2V0UmVzdWx0JywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIGlmICghdGhpei4kcmVzdWx0LiRwcm9taXNlKSB7XHJcblxyXG4gICAgICB0aGl6LiRyZXN1bHQuJHByb21pc2UgPSB0aGl6LiRtb2RlbC4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuICAgICAgICAgIGNvbnN0IHJxID0gc3RvcmUuJG9wZW5DdXJzb3IoKTtcclxuICAgICAgICAgIHJxLiRzdWNjZXNzKGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY3Vyc29yID0gcnEuJG1lLnJlc3VsdDtcclxuICAgICAgICAgICAgaWYgKCFjdXJzb3IpIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZWNvcmQgPSB0aGl6LiRtb2RlbC4kZ2V0SW5zdGFuY2UoY3Vyc29yLmtleSk7XHJcbiAgICAgICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGN1cnNvci52YWx1ZSk7XHJcbiAgICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoY3Vyc29yLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpei4kcmVzdWx0LnB1c2gocmVjb3JkKTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2gocmVjb3JkKTtcclxuXHJcbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xyXG5cclxuICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHJlamVjdChldmVudCk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJHJlc3VsdDtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qcyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYlF1ZXJ5XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlF1ZXJ5KG1vZGVsLCBxdWVyeSkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbW9kZWwnLCBtb2RlbCkuc3RhdGljKCckcXVlcnknLCBxdWVyeSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFN0YXRpY1xuICAucHJvcGVydHkoJyRyZXN1bHQnLCB7IHZhbHVlOiBbXSB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBtZXRob2RcbiAgLm1ldGhvZCgnJGdldFJlc3VsdCcsIGZ1bmN0aW9uIChjYikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgIGlmICghdGhpei4kcmVzdWx0LiRwcm9taXNlKSB7XG5cbiAgICAgIHRoaXouJHJlc3VsdC4kcHJvbWlzZSA9IHRoaXouJG1vZGVsLiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgdmFyIHJxID0gc3RvcmUuJG9wZW5DdXJzb3IoKTtcbiAgICAgICAgICBycS4kc3VjY2VzcyhmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgdmFyIGN1cnNvciA9IHJxLiRtZS5yZXN1bHQ7XG4gICAgICAgICAgICBpZiAoIWN1cnNvcikgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcblxuICAgICAgICAgICAgdmFyIHJlY29yZCA9IHRoaXouJG1vZGVsLiRnZXRJbnN0YW5jZShjdXJzb3Iua2V5KTtcbiAgICAgICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGN1cnNvci52YWx1ZSk7XG4gICAgICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGN1cnNvci52YWx1ZSk7XG4gICAgICAgICAgICB0aGl6LiRyZXN1bHQucHVzaChyZWNvcmQpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gocmVjb3JkKTtcblxuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSkuJGZhaWxlZChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJlamVjdChldmVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXouJHJlc3VsdDtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaW8sICRsb2cpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcclxuICAvLyAkc29ja2V0XHJcblxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiU29ja2V0KHVybCwgYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCl7XHJcblxyXG4gICAgbmV3IENsYXp6ZXIodGhpcylcclxuICAgICAgLnN0YXRpYygnJHVybCcsIHVybCB8fCBpZGJTb2NrZXQuJGRlZlVybFNlcnZlcilcclxuICAgICAgLnN0YXRpYygnJGFjY2Vzc1Rva2VuSWQnLCBhY2Nlc3NUb2tlbklkIHx8IGlkYlNvY2tldC4kZGVmQWNjZXNzVG9rZW5JZClcclxuICAgICAgLnN0YXRpYygnJGN1cnJlbnRVc2VySWQnLCBjdXJyZW50VXNlcklkIHx8IGlkYlNvY2tldC4kZGVmQ3VycmVudFVzZXJJZCk7XHJcblxyXG4gICAgdGhpcy4kY29ubmVjdCgpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAucHJvcGVydHkoJyRfbGlzdGVuZXJzJywgeyB2YWx1ZTpbXSB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXHJcbiAgLm1ldGhvZCgnJGNvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8gQ3JlYXRpbmcgY29ubmVjdGlvbiB3aXRoIHNlcnZlclxyXG4gICAgY29uc3Qgc29ja2V0ID0gdGhpcy4kc29ja2V0ID0gaW8uY29ubmVjdCh0aGlzLiR1cmwpO1xyXG5cclxuICAgIC8vIFRoaXMgcGFydCBpcyBvbmx5IGZvciBsb2dpbiB1c2VycyBmb3IgYXV0aGVudGljYXRlZCAkc29ja2V0IGNvbm5lY3Rpb24gYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlci5cclxuICAgIC8vIElmIHlvdSBhcmUgbm90IHVzaW5nIGxvZ2luIHBhZ2UgaW4geW91IHdlYnNpdGUgdGhlbiB5b3Ugc2hvdWxkIHJlbW92ZSByZXN0IHBpZWNlIG9mIGNvZGUuLlxyXG4gICAgc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKXtcclxuICAgICAgJGxvZy5sb2coJ2Nvbm5lY3RlZCcpO1xyXG5cclxuICAgICAgc29ja2V0LmVtaXQoJ2F1dGhlbnRpY2F0aW9uJywge1xyXG4gICAgICAgIGlkOiB0aGlzLiRhY2Nlc3NUb2tlbklkLFxyXG4gICAgICAgIHVzZXJJZDogdGhpcy4kY3VycmVudFVzZXJJZCxcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICBzb2NrZXQub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyB1c2UgdGhlICRzb2NrZXQgYXMgdXN1YWxcclxuICAgICAgICAkbG9nLmxvZygnVXNlciBpcyBhdXRoZW50aWNhdGVkJyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc3Vic2NyaWJlJywgZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XHJcblxyXG4gICAgbGV0IG5hbWUgPSBvcHRpb25zLm1vZGVsTmFtZSArICcuJyArIG9wdGlvbnMuZXZlbnROYW1lO1xyXG5cclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tb2RlbElkID09PSAnbnVtYmVyJykge1xyXG4gICAgICBuYW1lID0gbmFtZSArICcuJyArIG9wdGlvbnMubW9kZWxJZDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLiRzb2NrZXQub24obmFtZSwgY2IpO1xyXG4gICAgXHJcbiAgICAvL1B1c2ggdGhlIGNvbnRhaW5lci4uXHJcbiAgICB0aGlzLiRwdXNoTGlzdGVuZXIobmFtZSwgY2IpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckcHVzaExpc3RlbmVyJywgZnVuY3Rpb24gKG5hbWUsIGNiKSB7XHJcblxyXG4gICAgdGhpcy4kX2xpc3RlbmVycy5wdXNoKG5hbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckdW5zdWJzY3JpYmUnLGZ1bmN0aW9uIChzdWJzY3JpcHRpb25OYW1lKSB7XHJcblxyXG4gICAgdGhpcy4kc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTsgIFxyXG4gICAgdmFyIGlkeCA9IHRoaXMuJF9saXN0ZW5lcnMuaW5kZXhPZihzdWJzY3JpcHRpb25OYW1lKTtcclxuICAgIGlmIChpZHggIT0gLTEpe1xyXG4gICAgICB0aGlzLiRfbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgfVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBc2lnbmEgbGEgVVJMIGRlIHNlcnZpZG9yIHBvciBkZWZlY3RvXHJcbiAgLnN0YXRpYygnJHNldFVybFNlcnZlcicsIGZ1bmN0aW9uICh1cmwpIHtcclxuXHJcbiAgICB0aGlzLiRkZWZVcmxTZXJ2ZXIgPSB1cmw7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQVNpZ25hIGxhcyBjcmVkZW5jaWFsZXMgcG9yIGRlZmVjdG9cclxuICAuc3RhdGljKCckc2V0Q3JlZGVudGlhbHMnLCBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCkge1xyXG5cclxuICAgIHRoaXMuJGRlZkFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xyXG4gICAgdGhpcy4kZGVmQ3VycmVudFVzZXJJZCA9IGN1cnJlbnRVc2VySWQ7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC4kc2V0VXJsU2VydmVyKG51bGwpXHJcbiAgLiRzZXRDcmVkZW50aWFscyhudWxsLCBudWxsKTtcclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaW8sICRsb2cpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJHNvY2tldFxuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiU29ja2V0KHVybCwgYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckdXJsJywgdXJsIHx8IGlkYlNvY2tldC4kZGVmVXJsU2VydmVyKS5zdGF0aWMoJyRhY2Nlc3NUb2tlbklkJywgYWNjZXNzVG9rZW5JZCB8fCBpZGJTb2NrZXQuJGRlZkFjY2Vzc1Rva2VuSWQpLnN0YXRpYygnJGN1cnJlbnRVc2VySWQnLCBjdXJyZW50VXNlcklkIHx8IGlkYlNvY2tldC4kZGVmQ3VycmVudFVzZXJJZCk7XG5cbiAgICB0aGlzLiRjb25uZWN0KCk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5wcm9wZXJ0eSgnJF9saXN0ZW5lcnMnLCB7IHZhbHVlOiBbXSB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25lY3RhcnNlIGFsIHNlcnZpZG9yXG4gIC5tZXRob2QoJyRjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gQ3JlYXRpbmcgY29ubmVjdGlvbiB3aXRoIHNlcnZlclxuICAgIHZhciBzb2NrZXQgPSB0aGlzLiRzb2NrZXQgPSBpby5jb25uZWN0KHRoaXMuJHVybCk7XG5cbiAgICAvLyBUaGlzIHBhcnQgaXMgb25seSBmb3IgbG9naW4gdXNlcnMgZm9yIGF1dGhlbnRpY2F0ZWQgJHNvY2tldCBjb25uZWN0aW9uIGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIuXG4gICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXG4gICAgc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgJGxvZy5sb2coJ2Nvbm5lY3RlZCcpO1xuXG4gICAgICBzb2NrZXQuZW1pdCgnYXV0aGVudGljYXRpb24nLCB7XG4gICAgICAgIGlkOiB0aGlzLiRhY2Nlc3NUb2tlbklkLFxuICAgICAgICB1c2VySWQ6IHRoaXMuJGN1cnJlbnRVc2VySWRcbiAgICAgIH0pO1xuXG4gICAgICBzb2NrZXQub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHVzZSB0aGUgJHNvY2tldCBhcyB1c3VhbFxuICAgICAgICAkbG9nLmxvZygnVXNlciBpcyBhdXRoZW50aWNhdGVkJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHN1YnNjcmliZScsIGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xuXG4gICAgdmFyIG5hbWUgPSBvcHRpb25zLm1vZGVsTmFtZSArICcuJyArIG9wdGlvbnMuZXZlbnROYW1lO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XG4gICAgICBuYW1lID0gbmFtZSArICcuJyArIG9wdGlvbnMubW9kZWxJZDtcbiAgICB9XG5cbiAgICB0aGlzLiRzb2NrZXQub24obmFtZSwgY2IpO1xuXG4gICAgLy9QdXNoIHRoZSBjb250YWluZXIuLlxuICAgIHRoaXMuJHB1c2hMaXN0ZW5lcihuYW1lLCBjYik7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRwdXNoTGlzdGVuZXInLCBmdW5jdGlvbiAobmFtZSwgY2IpIHtcblxuICAgIHRoaXMuJF9saXN0ZW5lcnMucHVzaChuYW1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHVuc3Vic2NyaWJlJywgZnVuY3Rpb24gKHN1YnNjcmlwdGlvbk5hbWUpIHtcblxuICAgIHRoaXMuJHNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMoc3Vic2NyaXB0aW9uTmFtZSk7XG4gICAgdmFyIGlkeCA9IHRoaXMuJF9saXN0ZW5lcnMuaW5kZXhPZihzdWJzY3JpcHRpb25OYW1lKTtcbiAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICB0aGlzLiRfbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xuICAgIH1cbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXNpZ25hIGxhIFVSTCBkZSBzZXJ2aWRvciBwb3IgZGVmZWN0b1xuICAuc3RhdGljKCckc2V0VXJsU2VydmVyJywgZnVuY3Rpb24gKHVybCkge1xuXG4gICAgdGhpcy4kZGVmVXJsU2VydmVyID0gdXJsO1xuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBU2lnbmEgbGFzIGNyZWRlbmNpYWxlcyBwb3IgZGVmZWN0b1xuICAuc3RhdGljKCckc2V0Q3JlZGVudGlhbHMnLCBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCkge1xuXG4gICAgdGhpcy4kZGVmQWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XG4gICAgdGhpcy4kZGVmQ3VycmVudFVzZXJJZCA9IGN1cnJlbnRVc2VySWQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6elxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuJHNldFVybFNlcnZlcihudWxsKS4kc2V0Q3JlZGVudGlhbHMobnVsbCwgbnVsbCk7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9pZGJTb2NrZXQuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsYiAobW9kdWxlKSB7XHJcblxyXG4gIC8vIER2dWVsdmUgZWwgaG9zdCBkZSB1bmEgVVJMXHJcbiAgZnVuY3Rpb24gZ2V0SG9zdCh1cmwpIHtcclxuICAgIGNvbnN0IG0gPSB1cmwubWF0Y2goL14oPzpodHRwcz86KT9cXC9cXC8oW15cXC9dKykvKTtcclxuICAgIHJldHVybiBtID8gbVsxXSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBsZXQgdXJsQmFzZUhvc3QgPSBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICBjb25zdCBsYkF1dGggPSBmdW5jdGlvbigpIHsgJ25nSW5qZWN0J1xyXG4gICAgY29uc3QgcHJvcHMgPSBbJ2FjY2Vzc1Rva2VuSWQnLCAnY3VycmVudFVzZXJJZCcsICdyZW1lbWJlck1lJ107XHJcbiAgICBjb25zdCBwcm9wc1ByZWZpeCA9ICckaWRiLWxiJCc7XHJcbiAgICBcclxuICAgIC8vIE5vdGU6IExvY2FsU3RvcmFnZSBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gc3RyaW5nXHJcbiAgICAvLyBXZSBhcmUgdXNpbmcgZW1wdHkgc3RyaW5nIGFzIGEgbWFya2VyIGZvciBudWxsL3VuZGVmaW5lZCB2YWx1ZXMuXHJcbiAgICBmdW5jdGlvbiBzYXZlKHN0b3JhZ2UsIG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9ICcnO1xyXG4gICAgICAgIHN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQ2Fubm90IGFjY2VzcyBsb2NhbC9zZXNzaW9uIHN0b3JhZ2U6JywgZXJyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxvYWQobmFtZSkge1xyXG4gICAgICBjb25zdCBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XHJcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Vba2V5XSB8fCBzZXNzaW9uU3RvcmFnZVtrZXldIHx8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbGJBdXRoKCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHRoaXpbbmFtZV0gPSBsb2FkKG5hbWUpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgY29uc3Qgc3RvcmFnZSA9IHRoaXoucmVtZW1iZXJNZSA/IGxvY2FsU3RvcmFnZSA6IHNlc3Npb25TdG9yYWdlO1xyXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICBzYXZlKHN0b3JhZ2UsIG5hbWUsIHRoaXpbbmFtZV0pO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zZXRVc2VyID0gZnVuY3Rpb24oYWNjZXNzVG9rZW5JZCwgdXNlcklkLCB1c2VyRGF0YSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlcklkID0gdXNlcklkO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IHVzZXJEYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyVXNlciA9IGZ1bmN0aW9uKCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gbnVsbDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlcklkID0gbnVsbDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyU3RvcmFnZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICBzYXZlKHNlc3Npb25TdG9yYWdlLCBuYW1lLCBudWxsKTtcclxuICAgICAgICBzYXZlKGxvY2FsU3RvcmFnZSwgbmFtZSwgbnVsbCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbmV3IGxiQXV0aCgpO1xyXG5cclxuICB9O1xyXG5cclxuICBjb25zdCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbigkcSwgbGJBdXRoKSB7ICduZ0luamVjdCc7XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlcXVlc3Q6IGZ1bmN0aW9uKGNvbmZpZykge1xyXG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXh0ZXJuYWwgcmVxdWVzdHNcclxuICAgICAgICBjb25zdCBob3N0ID0gZ2V0SG9zdChjb25maWcudXJsKTtcclxuICAgICAgICBpZiAoaG9zdCAmJiBob3N0ICE9PSB1cmxCYXNlSG9zdCkge1xyXG4gICAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsYkF1dGguYWNjZXNzVG9rZW5JZCkge1xyXG4gICAgICAgICAgY29uZmlnLmhlYWRlcnNbYXV0aEhlYWRlcl0gPSBsYkF1dGguYWNjZXNzVG9rZW5JZDtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5fX2lzR2V0Q3VycmVudFVzZXJfXykge1xyXG4gICAgICAgICAgLy8gUmV0dXJuIGEgc3R1YiA0MDEgZXJyb3IgZm9yIFVzZXIuZ2V0Q3VycmVudCgpIHdoZW5cclxuICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIHVzZXIgbG9nZ2VkIGluXHJcbiAgICAgICAgICBjb25zdCByZXMgPSB7XHJcbiAgICAgICAgICAgIGJvZHk6IHsgZXJyb3I6IHsgc3RhdHVzOiA0MDEgfX0sXHJcbiAgICAgICAgICAgIHN0YXR1czogNDAxLFxyXG4gICAgICAgICAgICBjb25maWc6IGNvbmZpZyxcclxuICAgICAgICAgICAgaGVhZGVyczogZnVuY3Rpb24oKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29uZmlnIHx8ICRxLndoZW4oY29uZmlnKTtcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxiUmVzb3VyY2UgPSBmdW5jdGlvbigpIHsgJ25nSW5qZWN0JzsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgdXJsQmFzZTogXCIvYXBpXCIsXHJcbiAgICAgIGF1dGhIZWFkZXI6ICdhdXRob3JpemF0aW9uJyxcclxuICAgIH07XHJcblxyXG4gICAgdXJsQmFzZUhvc3QgPSBnZXRIb3N0KG9wdGlvbnMudXJsQmFzZSkgfHwgbG9jYXRpb24uaG9zdDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlciBUaGUgaGVhZGVyIG5hbWUgdG8gdXNlLCBlLmcuIGBYLUFjY2Vzcy1Ub2tlbmBcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ29uZmlndXJlIHRoZSBSRVNUIHRyYW5zcG9ydCB0byB1c2UgYSBkaWZmZXJlbnQgaGVhZGVyIGZvciBzZW5kaW5nXHJcbiAgICAgKiB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uIEl0IGlzIHNlbnQgaW4gdGhlIGBBdXRob3JpemF0aW9uYCBoZWFkZXJcclxuICAgICAqIGJ5IGRlZmF1bHQuXHJcbiAgICAgKi9cclxuICAgIHRoaXouc2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKGhlYWRlcikge1xyXG4gICAgICBvcHRpb25zLmF1dGhIZWFkZXIgPSBoZWFkZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgaGVhZGVyIG5hbWUgdGhhdCBpcyB1c2VkIGZvciBzZW5kaW5nIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cclxuICAgICAqL1xyXG4gICAgdGhpei5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdXNlLCBlLmcuIGAvYXBpYCBvciBgLy9leGFtcGxlLmNvbS9hcGlgLlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDaGFuZ2UgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBCeSBkZWZhdWx0LCB0aGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xyXG4gICAgdGhpei5zZXRVcmxCYXNlID0gZnVuY3Rpb24odXJsKSB7XHJcbiAgICAgIG9wdGlvbnMudXJsQmFzZSA9IHVybDtcclxuICAgICAgdXJsQmFzZUhvc3QgPSBnZXRIb3N0KG9wdGlvbnMudXJsQmFzZSkgfHwgbG9jYXRpb24uaG9zdDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gVGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cclxuICAgIHRoaXouZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LiRnZXQgPSBmdW5jdGlvbigkcmVzb3VyY2UpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgICAgIGNvbnN0IGxiUmVzb3VyY2UgPSBmdW5jdGlvbih1cmwsIHBhcmFtcywgYWN0aW9ucykge1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhhY3Rpb25zKS5tYXAoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgYWN0aW9uc1trZXldLm9yaWdpbmFsVXJsID0gYWN0aW9uc1trZXldLnVybDtcclxuICAgICAgICAgIGFjdGlvbnNba2V5XS51cmwgPSBvcHRpb25zLnVybEJhc2UgKyBhY3Rpb25zW2tleV0udXJsO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCByZXNvdXJjZSA9ICRyZXNvdXJjZShvcHRpb25zLnVybEJhc2UgKyB1cmwsIHBhcmFtcywgYWN0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vIEFuZ3VsYXIgYWx3YXlzIGNhbGxzIFBPU1Qgb24gJHNhdmUoKVxyXG4gICAgICAgIC8vIFRoaXMgaGFjayBpcyBiYXNlZCBvblxyXG4gICAgICAgIC8vIGh0dHA6Ly9raXJrYnVzaGVsbC5tZS9hbmd1bGFyLWpzLXVzaW5nLW5nLXJlc291cmNlLWluLWEtbW9yZS1yZXN0ZnVsLW1hbm5lci9cclxuICAgICAgICByZXNvdXJjZS5wcm90b3R5cGUuJHNhdmUgPSBmdW5jdGlvbihzdWNjZXNzLCBlcnJvcikge1xyXG4gICAgICAgICAgLy8gRm9ydHVuYXRlbHksIExvb3BCYWNrIHByb3ZpZGVzIGEgY29udmVuaWVudCBgdXBzZXJ0YCBtZXRob2RcclxuICAgICAgICAgIC8vIHRoYXQgZXhhY3RseSBmaXRzIG91ciBuZWVkcy5cclxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc291cmNlLnVwc2VydC5jYWxsKHRoaXMsIHt9LCB0aGlzLCBzdWNjZXNzLCBlcnJvcik7XHJcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LiRwcm9taXNlIHx8IHJlc3VsdDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxiUmVzb3VyY2UuZ2V0VXJsQmFzZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsYlJlc291cmNlLmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xyXG4gICAgICB9O1xyXG4gICAgXHJcbiAgICAgIHJldHVybiBsYlJlc291cmNlO1xyXG5cclxuICAgIH07XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1vZHVsZVxyXG4gICAgLmZhY3RvcnkoJ2xiQXV0aCcsIGxiQXV0aClcclxuICAgIC5wcm92aWRlcignbGJSZXNvdXJjZScsIGxiUmVzb3VyY2UpXHJcbiAgICAuZmFjdG9yeSgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJywgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yKVxyXG4gICAgLmNvbmZpZyhbJyRodHRwUHJvdmlkZXInLCBmdW5jdGlvbigkaHR0cFByb3ZpZGVyKSB7ICduZ0luamVjdCc7XHJcbiAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicpO1xyXG4gICAgfV0pO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYi5qcyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGxiO1xuZnVuY3Rpb24gbGIobW9kdWxlKSB7XG5cbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcbiAgZnVuY3Rpb24gZ2V0SG9zdCh1cmwpIHtcbiAgICB2YXIgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xuICAgIHJldHVybiBtID8gbVsxXSA6IG51bGw7XG4gIH1cblxuICB2YXIgdXJsQmFzZUhvc3QgPSBsb2NhdGlvbi5ob3N0O1xuXG4gIHZhciBsYkF1dGggPSBmdW5jdGlvbiBsYkF1dGgoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcbiAgICB2YXIgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xuXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcbiAgICAvLyBXZSBhcmUgdXNpbmcgZW1wdHkgc3RyaW5nIGFzIGEgbWFya2VyIGZvciBudWxsL3VuZGVmaW5lZCB2YWx1ZXMuXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XG4gICAgICAgIHN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWQobmFtZSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Vba2V5XSB8fCBzZXNzaW9uU3RvcmFnZVtrZXldIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXpbbmFtZV0gPSBsb2FkKG5hbWUpO1xuICAgICAgfSk7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdmFyIHN0b3JhZ2UgPSB0aGl6LnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzdG9yYWdlLCBuYW1lLCB0aGl6W25hbWVdKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgdXNlcklkLCB1c2VyRGF0YSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IHVzZXJJZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gbnVsbDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBzYXZlKHNlc3Npb25TdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgICAgc2F2ZShsb2NhbFN0b3JhZ2UsIG5hbWUsIG51bGwpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XG4gIH07XG5cbiAgdmFyIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcigkcSwgbGJBdXRoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHJldHVybiB7XG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV4dGVybmFsIHJlcXVlc3RzXG4gICAgICAgIHZhciBob3N0ID0gZ2V0SG9zdChjb25maWcudXJsKTtcbiAgICAgICAgaWYgKGhvc3QgJiYgaG9zdCAhPT0gdXJsQmFzZUhvc3QpIHtcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XG4gICAgICAgICAgY29uZmlnLmhlYWRlcnNbYXV0aEhlYWRlcl0gPSBsYkF1dGguYWNjZXNzVG9rZW5JZDtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuX19pc0dldEN1cnJlbnRVc2VyX18pIHtcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxuICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIHVzZXIgbG9nZ2VkIGluXG4gICAgICAgICAgdmFyIHJlcyA9IHtcbiAgICAgICAgICAgIGJvZHk6IHsgZXJyb3I6IHsgc3RhdHVzOiA0MDEgfSB9LFxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXG4gICAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGZ1bmN0aW9uIGhlYWRlcnMoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICB2YXIgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uIGxiUmVzb3VyY2UoKSB7XG4gICAgJ25nSW5qZWN0JztcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHVybEJhc2U6IFwiL2FwaVwiLFxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nXG4gICAgfTtcblxuICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlciBUaGUgaGVhZGVyIG5hbWUgdG8gdXNlLCBlLmcuIGBYLUFjY2Vzcy1Ub2tlbmBcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ29uZmlndXJlIHRoZSBSRVNUIHRyYW5zcG9ydCB0byB1c2UgYSBkaWZmZXJlbnQgaGVhZGVyIGZvciBzZW5kaW5nXHJcbiAgICAgKiB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uIEl0IGlzIHNlbnQgaW4gdGhlIGBBdXRob3JpemF0aW9uYCBoZWFkZXJcclxuICAgICAqIGJ5IGRlZmF1bHQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoaGVhZGVyKSB7XG4gICAgICBvcHRpb25zLmF1dGhIZWFkZXIgPSBoZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgaGVhZGVyIG5hbWUgdGhhdCBpcyB1c2VkIGZvciBzZW5kaW5nIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdXNlLCBlLmcuIGAvYXBpYCBvciBgLy9leGFtcGxlLmNvbS9hcGlgLlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDaGFuZ2UgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBCeSBkZWZhdWx0LCB0aGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouc2V0VXJsQmFzZSA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgIG9wdGlvbnMudXJsQmFzZSA9IHVybDtcbiAgICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIFRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICB9O1xuXG4gICAgdGhpei4kZ2V0ID0gZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xuICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoYWN0aW9ucykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICAgIGFjdGlvbnNba2V5XS51cmwgPSBvcHRpb25zLnVybEJhc2UgKyBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSAkcmVzb3VyY2Uob3B0aW9ucy51cmxCYXNlICsgdXJsLCBwYXJhbXMsIGFjdGlvbnMpO1xuXG4gICAgICAgIC8vIEFuZ3VsYXIgYWx3YXlzIGNhbGxzIFBPU1Qgb24gJHNhdmUoKVxuICAgICAgICAvLyBUaGlzIGhhY2sgaXMgYmFzZWQgb25cbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xuICAgICAgICByZXNvdXJjZS5wcm90b3R5cGUuJHNhdmUgPSBmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxuICAgICAgICAgIC8vIHRoYXQgZXhhY3RseSBmaXRzIG91ciBuZWVkcy5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LiRwcm9taXNlIHx8IHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gbW9kdWxlLmZhY3RvcnkoJ2xiQXV0aCcsIGxiQXV0aCkucHJvdmlkZXIoJ2xiUmVzb3VyY2UnLCBsYlJlc291cmNlKS5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpLmNvbmZpZyhbJyRodHRwUHJvdmlkZXInLCBmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InKTtcbiAgfV0pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYi5qcyJdLCJzb3VyY2VSb290IjoiIn0=