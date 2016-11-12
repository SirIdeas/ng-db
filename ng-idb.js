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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjY4NWY2MzMxN2FhNDYxZjIyYWYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy9DbGF6emVyLmpzIiwid2VicGFjazovLy8uL3NyYy9DbGF6emVyLmpzPzA5MWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlJlcXVlc3QuanM/MzcxMSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiT3BlbkRCUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiT3BlbkRCUmVxdWVzdC5qcz85YWIzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJDb25zdWx0YW50LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJDb25zdWx0YW50LmpzP2IyYWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiLmpzPzYzNTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlN0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJTdG9yZS5qcz80NDBkIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJJbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiSW5kZXguanM/MTMyOSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiRXZlbnRUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYkV2ZW50VGFyZ2V0LmpzPzZiZGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qcz9mOWY5Iiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJUcmFuc2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiVHJhbnNhY3Rpb24uanM/NmUzNiIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiUXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlF1ZXJ5LmpzP2Y3N2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYlNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiU29ja2V0LmpzP2QxYTEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xiLmpzIiwid2VicGFjazovLy8uL3NyYy9sYi5qcz9mZmRjIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25zdGFudCIsImlvIiwic2VydmljZSIsIkNsYXp6ZXIiLCJjb25zdHJ1Y3RvciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJwcm90b3R5cGUiLCJwYXJlbnQiLCJ0bXAiLCJjbGF6eiIsIm5hbWUiLCJvcHRzIiwiZnVuYyIsInByb3BlcnR5IiwiZnJvbSIsInRvIiwiZ2V0IiwiJG1lIiwic2V0IiwiY2IiLCJSZWFkeVN0YXRlIiwic3RhdGljIiwiaWRiUmVxdWVzdCIsIm1lIiwiaW5oZXJpdCIsIkV2ZW50VGFyZ2V0IiwiZ2V0dGVyIiwiaGFuZGxlckV2ZW50IiwidGhpeiIsIiRfcHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiJHN1Y2Nlc3MiLCJldmVudCIsIiRmYWlsZWQiLCJpZGJPcGVuREJSZXF1ZXN0IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJpZGJDb25zdWx0YW50IiwibWV0aG9kIiwicXVlcnkiLCIkcHJvbWlzZSIsInRoZW4iLCJ0YXJnZXQiLCJyZXN1bHQiLCJnZXRLZXkiLCJjb3VudCIsImdldEFsbCIsImdldEFsbEtleXMiLCJkaXJlY3Rpb24iLCJvcGVuQ3Vyc29yIiwib3BlbktleUN1cnNvciIsImlkYkV2ZW50VGFyZ2V0IiwiaWRiU3RvcmUiLCJpZGJNb2RlbCIsImlkYlRyYW5zYWN0aW9uIiwiJGxvZyIsImluZGV4ZWREQiIsIndpbmRvdyIsIm1vekluZGV4ZWREQiIsIndlYmtpdEluZGV4ZWREQiIsIm1zSW5kZXhlZERCIiwiSURCVHJhbnNhY3Rpb24iLCJ3ZWJraXRJREJUcmFuc2FjdGlvbiIsIm1zSURCVHJhbnNhY3Rpb24iLCJJREJLZXlSYW5nZSIsIndlYmtpdElEQktleVJhbmdlIiwibXNJREJLZXlSYW5nZSIsImFsZXJ0IiwiaWRiIiwidmVyc2lvbiIsInNvY2tldCIsIiRfbWUiLCJlIiwiRXZlbnQiLCIkZW1pdCIsIm9wZW4iLCJkZWxldGVEYXRhYmFzZSIsImZpcnN0Iiwic2Vjb25kIiwiY21wIiwiJGJpbmQiLCJvbmFib3J0Iiwib25jbG9zZSIsIm9uZXJyb3IiLCJvbnZlcnNpb25jaGFuZ2UiLCIkX3VwZ3JhZGVuZWVkZWRzIiwicHVzaCIsImFsbE1pZ3JhdGlvbnMiLCIkdXBncmFkZW5lZWRlZCIsIm9wZW5SZXF1ZXN0Iiwia2V5cyIsIm1hcCIsIm9sZFZlcnNpb24iLCJuZXdWZXJzaW9uIiwibWlncmF0aW9ucyIsIkFycmF5IiwiaXNBcnJheSIsImxvZyIsIm1pZ3JhdGlvbiIsIm1vZGVsTmFtZSIsIiRfbW9kZWxzIiwiJG1pZ3JhdGUiLCIkbW9kZWwiLCIkY3JlYXRlIiwiY2JFcnIiLCJsYXN0UnEiLCJsYXN0RXZlbnQiLCIkb3BlbmVkIiwiJG9wZW4iLCIkbmFtZSIsIiR2ZXJzaW9uIiwiY2F0Y2giLCJycSIsIiRkcm9wIiwiY2xvc2UiLCJvcHRpb25zIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJkZWxldGVPYmplY3RTdG9yZSIsIiRzb2NrZXQiLCJzdG9yZU5hbWVzIiwibW9kZSIsImFyZ3MiLCJ0cmFuc2FjdGlvbiIsImFjdGlvbiIsIiR0cmFuc2FjdGlvbiIsInR4Iiwic3RvcmVzT2JqIiwic3RvcmVzIiwic3RvcmVOYW1lIiwiJHN0b3JlIiwiVHJhbnNhY3Rpb25Nb2RlIiwiUmVhZE9ubHkiLCJSZWFkV3JpdGUiLCJpZGJJbmRleCIsImtleSIsInB1dCIsImFkZCIsImRlbGV0ZSIsImNsZWFyIiwiaW5kZXgiLCJmaWVsZHMiLCJzb3J0Iiwiam9pbiIsImNyZWF0ZUluZGV4IiwiaW5kZXhOYW1lIiwiZGVsZXRlSW5kZXgiLCJ0eXBlIiwiY2FsbGJhY2siLCIkX2xpc3RlbmVycyIsInN0YWNrIiwiaSIsImwiLCJsZW5ndGgiLCJzcGxpY2UiLCIkdW5iaW5kIiwiY2FsbCIsImlkYlF1ZXJ5IiwibGJSZXNvdXJjZSIsIiR0aW1lb3V0IiwiZGVlcEZpZWxkIiwib2JqIiwiZmllbGQiLCJzcGxpdCIsImxhc3RGaWVsZCIsInBvcCIsIl9zZXQiLCJzaGlmdCIsImdldEZpZWxkVmFsdWUiLCJzZXRGaWVsZFZhbHVlIiwiaWRiTW9kZWxGYWN0b3J5IiwiZGIiLCJrZXlQYXRoIiwiYXV0b0luY3JlbWVudCIsImlkIiwiZGF0YSIsIiRpZCIsIiRpbmRleGVzVG9DcmVhdGUiLCJzdG9yZSIsIiRkYiIsIiRjcmVhdGVTdG9yZSIsIiRjcmVhdGVJbmRleCIsIiRkcm9wU3RvcmUiLCIkd3JpdGVyIiwiJHJlYWRlciIsIiRnZXRWYWx1ZXMiLCIkcHV0IiwicmVjb3JkIiwiJGdldEluc3RhbmNlIiwiJHNldFZhbHVlcyIsIiRzZXRMb2NhbFZhbHVlcyIsIiRhZGQiLCIkZGVsZXRlIiwiJGNsZWFyIiwiJGdldCIsIiRnZXRLZXkiLCIkZ2V0QWxsIiwiYXJyIiwiJGdldEtleUZyb20iLCIkZ2V0QWxsS2V5cyIsIiRjb3VudCIsImZpbHRlcnMiLCJ1bmRlZmluZWQiLCIkaW5zdGFuY2VzIiwiJHNldCIsIiRmaWVsZHMiLCIkZmllbGQiLCJ2YWx1ZXMiLCJidWlsZENhbGxiYWNrIiwiJF92ZXJzaW9uaW5nIiwiJGtleSIsInVybCIsImFjdGlvbnMiLCIkX3JlbW90ZSIsIiRfdmFsdWVzIiwibG9jYWwiLCJyZW1vdGUiLCJFcnJvciIsInN1YnNjcmliZSIsImV2ZW50TmFtZSIsIm1vZGVsSWQiLCIkc2V0UmVtb3RlVmFsdWVzIiwib2JqZWN0U3RvcmUiLCJhYm9ydCIsIiRjb21wbGV0ZWQiLCJtb2RlbCIsIiRyZXN1bHQiLCIkb3BlbkN1cnNvciIsImN1cnNvciIsImNvbnRpbnVlIiwiaWRiU29ja2V0IiwiYWNjZXNzVG9rZW5JZCIsImN1cnJlbnRVc2VySWQiLCIkZGVmVXJsU2VydmVyIiwiJGRlZkFjY2Vzc1Rva2VuSWQiLCIkZGVmQ3VycmVudFVzZXJJZCIsIiRjb25uZWN0IiwiY29ubmVjdCIsIiR1cmwiLCJvbiIsImVtaXQiLCIkYWNjZXNzVG9rZW5JZCIsInVzZXJJZCIsIiRjdXJyZW50VXNlcklkIiwiJHB1c2hMaXN0ZW5lciIsInN1YnNjcmlwdGlvbk5hbWUiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJpZHgiLCJpbmRleE9mIiwiJHNldFVybFNlcnZlciIsIiRzZXRDcmVkZW50aWFscyIsImxiIiwiZ2V0SG9zdCIsIm0iLCJtYXRjaCIsInVybEJhc2VIb3N0IiwibG9jYXRpb24iLCJob3N0IiwibGJBdXRoIiwicHJvcHMiLCJwcm9wc1ByZWZpeCIsInNhdmUiLCJzdG9yYWdlIiwiZXJyIiwiY29uc29sZSIsImxvYWQiLCJsb2NhbFN0b3JhZ2UiLCJzZXNzaW9uU3RvcmFnZSIsImZvckVhY2giLCJjdXJyZW50VXNlckRhdGEiLCJyZW1lbWJlck1lIiwic2V0VXNlciIsInVzZXJEYXRhIiwiY2xlYXJVc2VyIiwiY2xlYXJTdG9yYWdlIiwibGJBdXRoUmVxdWVzdEludGVyY2VwdG9yIiwiJHEiLCJyZXF1ZXN0IiwiY29uZmlnIiwiaGVhZGVycyIsImF1dGhIZWFkZXIiLCJfX2lzR2V0Q3VycmVudFVzZXJfXyIsInJlcyIsImJvZHkiLCJlcnJvciIsInN0YXR1cyIsIndoZW4iLCJ1cmxCYXNlIiwic2V0QXV0aEhlYWRlciIsImhlYWRlciIsImdldEF1dGhIZWFkZXIiLCJzZXRVcmxCYXNlIiwiZ2V0VXJsQmFzZSIsIiRyZXNvdXJjZSIsInBhcmFtcyIsIm9yaWdpbmFsVXJsIiwicmVzb3VyY2UiLCIkc2F2ZSIsInN1Y2Nlc3MiLCJ1cHNlcnQiLCJmYWN0b3J5IiwicHJvdmlkZXIiLCIkaHR0cFByb3ZpZGVyIiwiaW50ZXJjZXB0b3JzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTs7OztBQUdBOztBQ0dBLEtBQUksWUFBWSx1QkFBdUI7O0FEQXZDOztBQ0lBLEtBQUksZUFBZSx1QkFBdUI7O0FESDFDOztBQ09BLEtBQUkscUJBQXFCLHVCQUF1Qjs7QUROaEQ7O0FDVUEsS0FBSSxrQkFBa0IsdUJBQXVCOztBRFQ3Qzs7QUNhQSxLQUFJLFFBQVEsdUJBQXVCOztBRFpuQzs7QUNnQkEsS0FBSSxhQUFhLHVCQUF1Qjs7QURmeEM7O0FDbUJBLEtBQUksYUFBYSx1QkFBdUI7O0FEbEJ4Qzs7QUNzQkEsS0FBSSxtQkFBbUIsdUJBQXVCOztBRHJCOUM7O0FDeUJBLEtBQUksYUFBYSx1QkFBdUI7O0FEeEJ4Qzs7QUM0QkEsS0FBSSxtQkFBbUIsdUJBQXVCOztBRDNCOUM7O0FDK0JBLEtBQUksYUFBYSx1QkFBdUI7O0FEOUJ4Qzs7QUNrQ0EsS0FBSSxjQUFjLHVCQUF1Qjs7QURoQ3pDOztBQ29DQSxLQUFJLE9BQU8sdUJBQXVCOztBQUVsQyxVQUFTLHVCQUF1QixLQUFLLEVBQUUsT0FBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsU0FBUzs7O0FEcEN2RixtQkFBR0EsUUFBUUMsT0FBTyxVQUFVLEtBRXpCQyxTQUFTLE1BQU1DLElBQ2ZDLFFBQVEsV0FIWCxtQkFLR0YsU0FBUyxjQUFjLFNBRXZCRSxRQUFRLGNBUFgsc0JBUUdBLFFBQVEsb0JBUlgsNEJBU0dBLFFBQVEsaUJBVFgseUJBVUdBLFFBQVEsT0FWWCxl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QU1xRixXQUFXSCxVQUFVakwsUUFBUTJLLFVBQVU1RSxLQUFLbUYsUUFBUWxGOzs7OztTQUsxRG9GLFNBQVNuUyxVQUFVb1MsUUFBUSxVQUFTQyxTQUFTZCxPQUFPOzs7V0FHbEQsSUFBTWhQLFNBQVM0UCxTQUFTRyxPQUFPL0ksS0FBSyxNQUFNLElBQUksTUFBTThJLFNBQVNkO1dBQzdELE9BQU9oUCxPQUFPSCxZQUFZRzs7U0FFNUIsT0FBTzRQOzs7T0FHVDFJLFdBQVdzSSxhQUFhLFlBQVc7U0FDakMsT0FBT2hMLFFBQVEySzs7O09BR2pCakksV0FBV29JLGdCQUFnQixZQUFXO1NBQ3BDLE9BQU85SyxRQUFRb0s7OztPQUdqQixPQUFPMUg7Ozs7R0FNWCxPQUFPbEssT0FDSmdULFFBQVEsVUFBVTFDLFFBQ2xCMkMsU0FBUyxjQUFjL0ksWUFDdkI4SSxRQUFRLDRCQUE0QnpCLDBCQUNwQ0csT0FBTyxDQUFDLGlCQUFpQixVQUFTd0IsZUFBZTtLQUFFOztLQUNsREEsY0FBY0MsYUFBYXhOLEtBQUsiLCJmaWxlIjoibmctaWRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjY4NWY2MzMxN2FhNDYxZjIyYWYiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBHbG9iYWxlc1xyXG5pbXBvcnQgQ2xhenplciAgZnJvbSAnLi9DbGF6emVyJztcclxuXHJcbi8vIFNlcnZpY2VzXHJcbmltcG9ydCBpZGJSZXF1ZXN0ICAgICAgICAgZnJvbSAnLi9zZXJ2aWNlcy9pZGJSZXF1ZXN0JztcclxuaW1wb3J0IGlkYk9wZW5EQlJlcXVlc3QgICBmcm9tICcuL3NlcnZpY2VzL2lkYk9wZW5EQlJlcXVlc3QnO1xyXG5pbXBvcnQgaWRiQ29uc3VsdGFudCAgICAgIGZyb20gJy4vc2VydmljZXMvaWRiQ29uc3VsdGFudCc7XHJcbmltcG9ydCBpZGIgICAgICAgICAgICAgICAgZnJvbSAnLi9zZXJ2aWNlcy9pZGInO1xyXG5pbXBvcnQgaWRiU3RvcmUgICAgICAgICAgIGZyb20gJy4vc2VydmljZXMvaWRiU3RvcmUnO1xyXG5pbXBvcnQgaWRiSW5kZXggICAgICAgICAgIGZyb20gJy4vc2VydmljZXMvaWRiSW5kZXgnO1xyXG5pbXBvcnQgaWRiRXZlbnRUYXJnZXQgICAgIGZyb20gJy4vc2VydmljZXMvaWRiRXZlbnRUYXJnZXQnO1xyXG5pbXBvcnQgaWRiTW9kZWwgICAgICAgICAgIGZyb20gJy4vc2VydmljZXMvaWRiTW9kZWwnO1xyXG5pbXBvcnQgaWRiVHJhbnNhY3Rpb24gICAgIGZyb20gJy4vc2VydmljZXMvaWRiVHJhbnNhY3Rpb24nO1xyXG5pbXBvcnQgaWRiUXVlcnkgICAgICAgICAgIGZyb20gJy4vc2VydmljZXMvaWRiUXVlcnknO1xyXG5pbXBvcnQgaWRiU29ja2V0ICAgICAgICAgIGZyb20gJy4vc2VydmljZXMvaWRiU29ja2V0JztcclxuXHJcbmltcG9ydCBsYiBmcm9tICcuL2xiJztcclxuXHJcbmxiKGFuZ3VsYXIubW9kdWxlKCduZy5pZGInLCBbXSkpXHJcbiAgXHJcbiAgLmNvbnN0YW50KCdpbycsIGlvKVxyXG4gIC5zZXJ2aWNlKCdDbGF6emVyJywgQ2xhenplcilcclxuXHJcbiAgLmNvbnN0YW50KCdpZGJWZXJzaW9uJywgJzAuMC4xJylcclxuICBcclxuICAuc2VydmljZSgnaWRiUmVxdWVzdCcsIGlkYlJlcXVlc3QpXHJcbiAgLnNlcnZpY2UoJ2lkYk9wZW5EQlJlcXVlc3QnLCBpZGJPcGVuREJSZXF1ZXN0KVxyXG4gIC5zZXJ2aWNlKCdpZGJDb25zdWx0YW50JywgaWRiQ29uc3VsdGFudClcclxuICAuc2VydmljZSgnaWRiJywgaWRiKVxyXG4gIC5zZXJ2aWNlKCdpZGJTdG9yZScsIGlkYlN0b3JlKVxyXG4gIC5zZXJ2aWNlKCdpZGJJbmRleCcsIGlkYkluZGV4KVxyXG4gIC5zZXJ2aWNlKCdpZGJFdmVudFRhcmdldCcsIGlkYkV2ZW50VGFyZ2V0KVxyXG4gIC5zZXJ2aWNlKCdpZGJNb2RlbCcsIGlkYk1vZGVsKVxyXG4gIC5zZXJ2aWNlKCdpZGJTb2NrZXQnLCBpZGJTb2NrZXQpXHJcbiAgLnNlcnZpY2UoJ2lkYlF1ZXJ5JywgaWRiUXVlcnkpXHJcbiAgLnNlcnZpY2UoJ2lkYlRyYW5zYWN0aW9uJywgaWRiVHJhbnNhY3Rpb24pXHJcblxyXG4vLyAgIC5zZXJ2aWNlKCdzb2NrZXQnLCBmdW5jdGlvbihpZGJTb2NrZXQsIEFQSV9ST09UKSB7ICduZ0luamVjdCdcclxuICBcclxuLy8gICAgIHJldHVybiBuZXcgaWRiU29ja2V0KFxyXG4vLyAgICAgICAnaHR0cDovL2xvY2FsaG9zdDozMjAwLycsXHJcbi8vICAgICAgIGxvY2FsU3RvcmFnZVsnJExvb3BCYWNrJGFjY2Vzc1Rva2VuSWQnXSxcclxuLy8gICAgICAgbG9jYWxTdG9yYWdlWyckTG9vcEJhY2skY3VycmVudFVzZXJJZCddXHJcbi8vICAgICApO1xyXG5cclxuLy8gICB9KVxyXG5cclxuLy8gICAuc2VydmljZSgnZGIyJywgZnVuY3Rpb24gKGlkYiwgc29ja2V0KSB7ICduZ0luamVjdCc7XHJcblxyXG4vLyAgICAgY29uc3QgZGIgPSBuZXcgaWRiKCdhYWEnLCA0LCBzb2NrZXQpXHJcblxyXG4vLyAgICAgZGJcclxuLy8gICAgICAgLiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKFsnJG9wZW5lZCddKTsgfSlcclxuLy8gICAgICAgLiRhYm9ydGVkKGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coWyckYWJvcnRlZCddKTsgfSlcclxuLy8gICAgICAgLiRjbG9zZWQoZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZyhbJyRjbG9zZWQnXSk7IH0pXHJcbi8vICAgICAgIC4kZXJyb3IoZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZyhbJyRlcnJvciddKTsgfSlcclxuLy8gICAgICAgLiR2ZXJzaW9uQ2hhbmdlZChmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKFsnJHZlcnNpb25DaGFuZ2VkJ10pOyB9KVxyXG5cclxuLy8gICAgICAgLiRhdXRvbWlncmF0aW9uKHtcclxuLy8gICAgICAgICAxOiBmdW5jdGlvbiAoZGIpIHtcclxuLy8gICAgICAgICAgIGRiLiRtb2RlbCgnVHJhYmFqYWRvcicpXHJcbi8vICAgICAgICAgICAgIC4kY3JlYXRlKClcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIDI6IGZ1bmN0aW9uIChkYikge1xyXG4vLyAgICAgICAgICAgZGIuJG1vZGVsKCdFbXBsZWFkbycpXHJcbiAgICAgICAgICAgIFxyXG4vLyAgICAgICAgICAgICAuJGFkZEluZGV4KFsnbm9tYnJlcycsICdhcGVsbGlkb3MnXSlcclxuLy8gICAgICAgICAgICAgLiRhZGRJbmRleCgnbmFjaW1pZW50bycpXHJcblxyXG4vLyAgICAgICAgICAgICAuJGNyZWF0ZShmdW5jdGlvbiAobW9kZWwsIHN0b3JlKSB7XHJcblxyXG4vLyAgICAgICAgICAgICAgIHN0b3JlLiRjcmVhdGVJbmRleCgnY2knKTtcclxuLy8gICAgICAgICAgICAgICBzdG9yZS4kY3JlYXRlSW5kZXgoJ2NvZCcpO1xyXG5cclxuLy8gICAgICAgICAgICAgfSlcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIDM6IGZ1bmN0aW9uIChkYikge1xyXG4vLyAgICAgICAgICAgZGIuJG1vZGVsKCdUcmFiYWphZG9yJylcclxuLy8gICAgICAgICAgICAgLiRkcm9wKClcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgIH0pXHJcblxyXG4vLyAgICAgICAuJGRyb3AoKS50aGVuKGZ1bmN0aW9uIChkYikge1xyXG4vLyAgICAgICAgIGRiLiRvcGVuKCk7XHJcbi8vICAgICAgIH0pO1xyXG5cclxuLy8gICAgIHJldHVybiBkYjtcclxuICAgIFxyXG4vLyAgIH0pXHJcblxyXG4vLyAgIC5zZXJ2aWNlKCdFbXBsZWFkbycsIGZ1bmN0aW9uIChkYjIpIHsgJ25nSW5qZWN0JztcclxuLy8gICAgIHJldHVybiB3aW5kb3cuRW1wbGVhZG8gPSBkYjIuJG1vZGVsKCdFbXBsZWFkbycpXHJcbi8vICAgICAgIC4kZmllbGQoJ2NvZCcsICAgICAgICB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSlcclxuLy8gICAgICAgLiRmaWVsZCgnY2knLCAgICAgICAgIHsgXCJ0eXBlXCI6IFwic3RyaW5nXCIsIFwicmVxdWlyZWRcIjogdHJ1ZSB9KVxyXG4vLyAgICAgICAuJGZpZWxkKCdub21icmVzJywgICAgeyBcInR5cGVcIjogXCJzdHJpbmdcIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0pXHJcbi8vICAgICAgIC4kZmllbGQoJ2FwZWxsaWRvcycsICB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSlcclxuLy8gICAgICAgLiRmaWVsZCgnbmFjaW1pZW50bycsIHsgXCJ0eXBlXCI6IFwiZGF0ZVwiIH0pXHJcbi8vICAgICAgIC4kZmllbGQoJ2luZ3Jlc28nLCAgICB7IFwidHlwZVwiOiBcImRhdGVcIiB9KVxyXG4vLyAgICAgICAuJGZpZWxkKCdkaXJlY2Npb24nLCAgeyBcInR5cGVcIjogXCJzdHJpbmdcIn0pXHJcbi8vICAgICAgIC4kcmVtb3RlKFxyXG4vLyAgICAgICAgICcvdHJhYmFqYWRvcmVzLzppZCcsXHJcbi8vICAgICAgICAgeyAnaWQnOiAnQGlkJyB9LFxyXG4vLyAgICAgICAgIHtcclxuLy8gICAgICAgICAgICdmaW5kJzogICB7IHVybDogJy90cmFiYWphZG9yZXMvX2ZpbmRXaXRoVmVyc2lvbicsIG1ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWUsIH0sXHJcbi8vICAgICAgICAgICAvLyAnY3JlYXRlJzogeyB1cmw6ICcvdHJhYmFqYWRvcmVzJywgbWV0aG9kOiAnUE9TVCcsIH0sXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICApXHJcbi8vICAgICAgIC8vIC52ZXJzaW9uaW5nKClcclxuLy8gICAgICAgLiRidWlsZChmdW5jdGlvbiAoRW1wbGVhZG8pIHtcclxuXHJcbi8vICAgICAgICAgRW1wbGVhZG8ucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4vLyAgICAgICAgIH07XHJcblxyXG4vLyAgICAgICAgIEVtcGxlYWRvLnByb3RvdHlwZS5nZXROb21icmUgPSBmdW5jdGlvbiAoKXtcclxuLy8gICAgICAgICAgIHJldHVybiB0aGlzLm5vbWJyZXMgKyAnICcgKyB0aGlzLmFwZWxsaWRvcztcclxuLy8gICAgICAgICB9O1xyXG5cclxuLy8gICAgICAgfSk7XHJcbi8vICAgfSlcclxuXHJcbi8vIC5ydW4oZnVuY3Rpb24gKGRiMiwgRW1wbGVhZG8pIHsgJ25nSW5qZWN0JztcclxuXHJcbi8vICAgRW1wbGVhZG8uJHB1dCh7XHJcbi8vICAgICBpZDogMSxcclxuLy8gICAgICdub21icmVzJzogJ0FsZXhhbmRlcidcclxuLy8gICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcclxuLy8gICAgIC8vXHJcbi8vICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XHJcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbi8vICAgICByZXR1cm4gRW1wbGVhZG8uJHB1dCh7XHJcbi8vICAgICAgIGlkOiAyLFxyXG4vLyAgICAgICAnbm9tYnJlcyc6ICdHdWlsbGVtbydcclxuLy8gICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xyXG4vLyAgICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XHJcbi8vICAgICB9KTtcclxuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIHJldHVybiBFbXBsZWFkby4kcHV0KHtcclxuLy8gICAgICAgaWQ6IDIsXHJcbi8vICAgICAgICdhcGVsbGlkb3MnOiAnU2VtaW5hcmlvJ1xyXG4vLyAgICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XHJcbi8vICAgICAgIGNvbnNvbGUubG9nKFsncHV0JywgcmVjb3JkLm5vbWJyZXNdKTtcclxuLy8gICAgIH0pO1xyXG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgcmV0dXJuIEVtcGxlYWRvLiRwdXQoe1xyXG4vLyAgICAgICBpZDogNCxcclxuLy8gICAgICAgJ25vbWJyZXMnOiAnQXhlbCdcclxuLy8gICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xyXG4vLyAgICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XHJcbi8vICAgICB9KTtcclxuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIHJldHVybiBFbXBsZWFkby4kcHV0KHtcclxuLy8gICAgICAgJ25vbWJyZXMnOiAnR2FicmllbCdcclxuLy8gICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlY29yZCkge1xyXG4vLyAgICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XHJcbi8vICAgICB9KTtcclxuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIHJldHVybiBFbXBsZWFkby4kYWRkKHtcclxuLy8gICAgICAgJ25vbWJyZXMnOiAnRXZlcnQnXHJcbi8vICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcclxuLy8gICAgICAgY29uc29sZS5sb2coWydwdXQnLCByZWNvcmQubm9tYnJlc10pO1xyXG4vLyAgICAgfSk7XHJcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbi8vICAgICBjb25zdCByID0gRW1wbGVhZG8uJGdldCgyKTtcclxuLy8gICAgIGNvbnNvbGUubG9nKFsnZ2V0Jywgcl0pXHJcbi8vICAgICByZXR1cm4gci4kcHJvbWlzZTtcclxuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIGNvbnN0IHIgPSBFbXBsZWFkby4kZmluZCgpLiRnZXRSZXN1bHQoKTtcclxuLy8gICAgIGNvbnNvbGUubG9nKFsnZmluZCcsIHJdKTtcclxuLy8gICAgIHJldHVybiByLiRwcm9taXNlO1xyXG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgY29uc3QgciA9IEVtcGxlYWRvLiRnZXRBbGwoKTtcclxuLy8gICAgIGNvbnNvbGUubG9nKFsnZ2V0QWxsJywgcl0pO1xyXG4vLyAgICAgcmV0dXJuIHIuJHByb21pc2U7XHJcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbi8vICAgICByZXR1cm4gRW1wbGVhZG8uJGNvdW50KCkudGhlbihmdW5jdGlvbiAoY291bnQpIHtcclxuLy8gICAgICAgY29uc29sZS5sb2coWydjb3VudCcsIGNvdW50XSk7XHJcbi8vICAgICB9KTtcclxuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIGNvbnN0IHIgPSBFbXBsZWFkby4kZ2V0QWxsS2V5cygpO1xyXG4vLyAgICAgY29uc29sZS5sb2coWydnZXRBbGxLZXlzJywgcl0pO1xyXG4vLyAgICAgcmV0dXJuIHIuJHByb21pc2U7XHJcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbi8vICAgICByZXR1cm4gRW1wbGVhZG8uJGRlbGV0ZSgyKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgY29uc29sZS5sb2coWydkZWxldGUnXSk7XHJcbi8vICAgICB9KTtcclxuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIHJldHVybiBFbXBsZWFkby4kY291bnQoKS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xyXG4vLyAgICAgICBjb25zb2xlLmxvZyhbJ2NvdW50JywgY291bnRdKTtcclxuLy8gICAgIH0pO1xyXG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgcmV0dXJuIEVtcGxlYWRvLiRjbGVhcigpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICBjb25zb2xlLmxvZyhbJ2NsZWFyJ10pO1xyXG4vLyAgICAgfSk7XHJcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbi8vICAgICByZXR1cm4gRW1wbGVhZG8uJGNvdW50KCkudGhlbihmdW5jdGlvbiAoY291bnQpIHtcclxuLy8gICAgICAgY29uc29sZS5sb2coWydjb3VudCcsIGNvdW50XSk7XHJcbi8vICAgICB9KTtcclxuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIGRiMi4kY2xvc2UoKTtcclxuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIGRiMi4kb3BlbigpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICBkYjIuJGNsb3NlKCk7XHJcbi8vICAgICB9KTtcclxuLy8gICB9KTtcclxuXHJcbi8vIH0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIndXNlIHN0cmljdCc7XG5cbi8vIEdsb2JhbGVzXG5cbnZhciBfQ2xhenplciA9IHJlcXVpcmUoJy4vQ2xhenplcicpO1xuXG52YXIgX0NsYXp6ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ2xhenplcik7XG5cbnZhciBfaWRiUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiUmVxdWVzdCcpO1xuXG52YXIgX2lkYlJlcXVlc3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiUmVxdWVzdCk7XG5cbnZhciBfaWRiT3BlbkRCUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiT3BlbkRCUmVxdWVzdCcpO1xuXG52YXIgX2lkYk9wZW5EQlJlcXVlc3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiT3BlbkRCUmVxdWVzdCk7XG5cbnZhciBfaWRiQ29uc3VsdGFudCA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiQ29uc3VsdGFudCcpO1xuXG52YXIgX2lkYkNvbnN1bHRhbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiQ29uc3VsdGFudCk7XG5cbnZhciBfaWRiID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGInKTtcblxudmFyIF9pZGIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiKTtcblxudmFyIF9pZGJTdG9yZSA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiU3RvcmUnKTtcblxudmFyIF9pZGJTdG9yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJTdG9yZSk7XG5cbnZhciBfaWRiSW5kZXggPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYkluZGV4Jyk7XG5cbnZhciBfaWRiSW5kZXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiSW5kZXgpO1xuXG52YXIgX2lkYkV2ZW50VGFyZ2V0ID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJFdmVudFRhcmdldCcpO1xuXG52YXIgX2lkYkV2ZW50VGFyZ2V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYkV2ZW50VGFyZ2V0KTtcblxudmFyIF9pZGJNb2RlbCA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiTW9kZWwnKTtcblxudmFyIF9pZGJNb2RlbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJNb2RlbCk7XG5cbnZhciBfaWRiVHJhbnNhY3Rpb24gPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYlRyYW5zYWN0aW9uJyk7XG5cbnZhciBfaWRiVHJhbnNhY3Rpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiVHJhbnNhY3Rpb24pO1xuXG52YXIgX2lkYlF1ZXJ5ID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pZGJRdWVyeScpO1xuXG52YXIgX2lkYlF1ZXJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYlF1ZXJ5KTtcblxudmFyIF9pZGJTb2NrZXQgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYlNvY2tldCcpO1xuXG52YXIgX2lkYlNvY2tldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGJTb2NrZXQpO1xuXG52YXIgX2xiID0gcmVxdWlyZSgnLi9sYicpO1xuXG52YXIgX2xiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gU2VydmljZXNcbigwLCBfbGIyLmRlZmF1bHQpKGFuZ3VsYXIubW9kdWxlKCduZy5pZGInLCBbXSkpLmNvbnN0YW50KCdpbycsIGlvKS5zZXJ2aWNlKCdDbGF6emVyJywgX0NsYXp6ZXIyLmRlZmF1bHQpLmNvbnN0YW50KCdpZGJWZXJzaW9uJywgJzAuMC4xJykuc2VydmljZSgnaWRiUmVxdWVzdCcsIF9pZGJSZXF1ZXN0Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJPcGVuREJSZXF1ZXN0JywgX2lkYk9wZW5EQlJlcXVlc3QyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYkNvbnN1bHRhbnQnLCBfaWRiQ29uc3VsdGFudDIuZGVmYXVsdCkuc2VydmljZSgnaWRiJywgX2lkYjIuZGVmYXVsdCkuc2VydmljZSgnaWRiU3RvcmUnLCBfaWRiU3RvcmUyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYkluZGV4JywgX2lkYkluZGV4Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJFdmVudFRhcmdldCcsIF9pZGJFdmVudFRhcmdldDIuZGVmYXVsdCkuc2VydmljZSgnaWRiTW9kZWwnLCBfaWRiTW9kZWwyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlNvY2tldCcsIF9pZGJTb2NrZXQyLmRlZmF1bHQpLnNlcnZpY2UoJ2lkYlF1ZXJ5JywgX2lkYlF1ZXJ5Mi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJUcmFuc2FjdGlvbicsIF9pZGJUcmFuc2FjdGlvbjIuZGVmYXVsdCk7XG5cbi8vICAgLnNlcnZpY2UoJ3NvY2tldCcsIGZ1bmN0aW9uKGlkYlNvY2tldCwgQVBJX1JPT1QpIHsgJ25nSW5qZWN0J1xuXG4vLyAgICAgcmV0dXJuIG5ldyBpZGJTb2NrZXQoXG4vLyAgICAgICAnaHR0cDovL2xvY2FsaG9zdDozMjAwLycsXG4vLyAgICAgICBsb2NhbFN0b3JhZ2VbJyRMb29wQmFjayRhY2Nlc3NUb2tlbklkJ10sXG4vLyAgICAgICBsb2NhbFN0b3JhZ2VbJyRMb29wQmFjayRjdXJyZW50VXNlcklkJ11cbi8vICAgICApO1xuXG4vLyAgIH0pXG5cbi8vICAgLnNlcnZpY2UoJ2RiMicsIGZ1bmN0aW9uIChpZGIsIHNvY2tldCkgeyAnbmdJbmplY3QnO1xuXG4vLyAgICAgY29uc3QgZGIgPSBuZXcgaWRiKCdhYWEnLCA0LCBzb2NrZXQpXG5cbi8vICAgICBkYlxuLy8gICAgICAgLiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKFsnJG9wZW5lZCddKTsgfSlcbi8vICAgICAgIC4kYWJvcnRlZChmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKFsnJGFib3J0ZWQnXSk7IH0pXG4vLyAgICAgICAuJGNsb3NlZChmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKFsnJGNsb3NlZCddKTsgfSlcbi8vICAgICAgIC4kZXJyb3IoZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZyhbJyRlcnJvciddKTsgfSlcbi8vICAgICAgIC4kdmVyc2lvbkNoYW5nZWQoZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZyhbJyR2ZXJzaW9uQ2hhbmdlZCddKTsgfSlcblxuLy8gICAgICAgLiRhdXRvbWlncmF0aW9uKHtcbi8vICAgICAgICAgMTogZnVuY3Rpb24gKGRiKSB7XG4vLyAgICAgICAgICAgZGIuJG1vZGVsKCdUcmFiYWphZG9yJylcbi8vICAgICAgICAgICAgIC4kY3JlYXRlKClcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgMjogZnVuY3Rpb24gKGRiKSB7XG4vLyAgICAgICAgICAgZGIuJG1vZGVsKCdFbXBsZWFkbycpXG5cbi8vICAgICAgICAgICAgIC4kYWRkSW5kZXgoWydub21icmVzJywgJ2FwZWxsaWRvcyddKVxuLy8gICAgICAgICAgICAgLiRhZGRJbmRleCgnbmFjaW1pZW50bycpXG5cbi8vICAgICAgICAgICAgIC4kY3JlYXRlKGZ1bmN0aW9uIChtb2RlbCwgc3RvcmUpIHtcblxuLy8gICAgICAgICAgICAgICBzdG9yZS4kY3JlYXRlSW5kZXgoJ2NpJyk7XG4vLyAgICAgICAgICAgICAgIHN0b3JlLiRjcmVhdGVJbmRleCgnY29kJyk7XG5cbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIDM6IGZ1bmN0aW9uIChkYikge1xuLy8gICAgICAgICAgIGRiLiRtb2RlbCgnVHJhYmFqYWRvcicpXG4vLyAgICAgICAgICAgICAuJGRyb3AoKVxuLy8gICAgICAgICB9XG4vLyAgICAgICB9KVxuXG4vLyAgICAgICAuJGRyb3AoKS50aGVuKGZ1bmN0aW9uIChkYikge1xuLy8gICAgICAgICBkYi4kb3BlbigpO1xuLy8gICAgICAgfSk7XG5cbi8vICAgICByZXR1cm4gZGI7XG5cbi8vICAgfSlcblxuLy8gICAuc2VydmljZSgnRW1wbGVhZG8nLCBmdW5jdGlvbiAoZGIyKSB7ICduZ0luamVjdCc7XG4vLyAgICAgcmV0dXJuIHdpbmRvdy5FbXBsZWFkbyA9IGRiMi4kbW9kZWwoJ0VtcGxlYWRvJylcbi8vICAgICAgIC4kZmllbGQoJ2NvZCcsICAgICAgICB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSlcbi8vICAgICAgIC4kZmllbGQoJ2NpJywgICAgICAgICB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSlcbi8vICAgICAgIC4kZmllbGQoJ25vbWJyZXMnLCAgICB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSlcbi8vICAgICAgIC4kZmllbGQoJ2FwZWxsaWRvcycsICB7IFwidHlwZVwiOiBcInN0cmluZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSlcbi8vICAgICAgIC4kZmllbGQoJ25hY2ltaWVudG8nLCB7IFwidHlwZVwiOiBcImRhdGVcIiB9KVxuLy8gICAgICAgLiRmaWVsZCgnaW5ncmVzbycsICAgIHsgXCJ0eXBlXCI6IFwiZGF0ZVwiIH0pXG4vLyAgICAgICAuJGZpZWxkKCdkaXJlY2Npb24nLCAgeyBcInR5cGVcIjogXCJzdHJpbmdcIn0pXG4vLyAgICAgICAuJHJlbW90ZShcbi8vICAgICAgICAgJy90cmFiYWphZG9yZXMvOmlkJyxcbi8vICAgICAgICAgeyAnaWQnOiAnQGlkJyB9LFxuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgJ2ZpbmQnOiAgIHsgdXJsOiAnL3RyYWJhamFkb3Jlcy9fZmluZFdpdGhWZXJzaW9uJywgbWV0aG9kOiAnR0VUJywgaXNBcnJheTogdHJ1ZSwgfSxcbi8vICAgICAgICAgICAvLyAnY3JlYXRlJzogeyB1cmw6ICcvdHJhYmFqYWRvcmVzJywgbWV0aG9kOiAnUE9TVCcsIH0sXG4vLyAgICAgICAgIH1cbi8vICAgICAgIClcbi8vICAgICAgIC8vIC52ZXJzaW9uaW5nKClcbi8vICAgICAgIC4kYnVpbGQoZnVuY3Rpb24gKEVtcGxlYWRvKSB7XG5cbi8vICAgICAgICAgRW1wbGVhZG8ucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7XG5cbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICBFbXBsZWFkby5wcm90b3R5cGUuZ2V0Tm9tYnJlID0gZnVuY3Rpb24gKCl7XG4vLyAgICAgICAgICAgcmV0dXJuIHRoaXMubm9tYnJlcyArICcgJyArIHRoaXMuYXBlbGxpZG9zO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICB9KTtcbi8vICAgfSlcblxuLy8gLnJ1bihmdW5jdGlvbiAoZGIyLCBFbXBsZWFkbykgeyAnbmdJbmplY3QnO1xuXG4vLyAgIEVtcGxlYWRvLiRwdXQoe1xuLy8gICAgIGlkOiAxLFxuLy8gICAgICdub21icmVzJzogJ0FsZXhhbmRlcidcbi8vICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XG4vLyAgICAgLy9cbi8vICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgIHJldHVybiBFbXBsZWFkby4kcHV0KHtcbi8vICAgICAgIGlkOiAyLFxuLy8gICAgICAgJ25vbWJyZXMnOiAnR3VpbGxlbW8nXG4vLyAgICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XG4vLyAgICAgfSk7XG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgIHJldHVybiBFbXBsZWFkby4kcHV0KHtcbi8vICAgICAgIGlkOiAyLFxuLy8gICAgICAgJ2FwZWxsaWRvcyc6ICdTZW1pbmFyaW8nXG4vLyAgICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XG4vLyAgICAgfSk7XG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgIHJldHVybiBFbXBsZWFkby4kcHV0KHtcbi8vICAgICAgIGlkOiA0LFxuLy8gICAgICAgJ25vbWJyZXMnOiAnQXhlbCdcbi8vICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcbi8vICAgICAgIGNvbnNvbGUubG9nKFsncHV0JywgcmVjb3JkLm5vbWJyZXNdKTtcbi8vICAgICB9KTtcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgcmV0dXJuIEVtcGxlYWRvLiRwdXQoe1xuLy8gICAgICAgJ25vbWJyZXMnOiAnR2FicmllbCdcbi8vICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZWNvcmQpIHtcbi8vICAgICAgIGNvbnNvbGUubG9nKFsncHV0JywgcmVjb3JkLm5vbWJyZXNdKTtcbi8vICAgICB9KTtcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgcmV0dXJuIEVtcGxlYWRvLiRhZGQoe1xuLy8gICAgICAgJ25vbWJyZXMnOiAnRXZlcnQnXG4vLyAgICAgfSkudGhlbihmdW5jdGlvbiAocmVjb3JkKSB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhbJ3B1dCcsIHJlY29yZC5ub21icmVzXSk7XG4vLyAgICAgfSk7XG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgIGNvbnN0IHIgPSBFbXBsZWFkby4kZ2V0KDIpO1xuLy8gICAgIGNvbnNvbGUubG9nKFsnZ2V0Jywgcl0pXG4vLyAgICAgcmV0dXJuIHIuJHByb21pc2U7XG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgIGNvbnN0IHIgPSBFbXBsZWFkby4kZmluZCgpLiRnZXRSZXN1bHQoKTtcbi8vICAgICBjb25zb2xlLmxvZyhbJ2ZpbmQnLCByXSk7XG4vLyAgICAgcmV0dXJuIHIuJHByb21pc2U7XG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgIGNvbnN0IHIgPSBFbXBsZWFkby4kZ2V0QWxsKCk7XG4vLyAgICAgY29uc29sZS5sb2coWydnZXRBbGwnLCByXSk7XG4vLyAgICAgcmV0dXJuIHIuJHByb21pc2U7XG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgIHJldHVybiBFbXBsZWFkby4kY291bnQoKS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xuLy8gICAgICAgY29uc29sZS5sb2coWydjb3VudCcsIGNvdW50XSk7XG4vLyAgICAgfSk7XG4vLyAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgIGNvbnN0IHIgPSBFbXBsZWFkby4kZ2V0QWxsS2V5cygpO1xuLy8gICAgIGNvbnNvbGUubG9nKFsnZ2V0QWxsS2V5cycsIHJdKTtcbi8vICAgICByZXR1cm4gci4kcHJvbWlzZTtcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgcmV0dXJuIEVtcGxlYWRvLiRkZWxldGUoMikudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhbJ2RlbGV0ZSddKTtcbi8vICAgICB9KTtcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgcmV0dXJuIEVtcGxlYWRvLiRjb3VudCgpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhbJ2NvdW50JywgY291bnRdKTtcbi8vICAgICB9KTtcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgcmV0dXJuIEVtcGxlYWRvLiRjbGVhcigpLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgICAgY29uc29sZS5sb2coWydjbGVhciddKTtcbi8vICAgICB9KTtcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgcmV0dXJuIEVtcGxlYWRvLiRjb3VudCgpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhbJ2NvdW50JywgY291bnRdKTtcbi8vICAgICB9KTtcbi8vICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgZGIyLiRjbG9zZSgpO1xuLy8gICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICBkYjIuJG9wZW4oKS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgIGRiMi4kY2xvc2UoKTtcbi8vICAgICB9KTtcbi8vICAgfSk7XG5cbi8vIH0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBDbGF6emVyXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIGZ1bmN0aW9uIENsYXp6ZXIgKGNvbnN0cnVjdG9yKSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NsYXp6JywgeyB2YWx1ZTogY29uc3RydWN0b3IgfHwgZnVuY3Rpb24gKCkge30gfSk7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdpbmhlcml0Jywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChwYXJlbnQpIHtcclxuICAgICAgbGV0IHRtcCA9IGZ1bmN0aW9uKCkge307XHJcbiAgICAgIHRtcC5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xyXG4gICAgICB0aGlzLmNsYXp6LnByb3RvdHlwZSA9IG5ldyB0bXAoKTtcclxuICAgICAgdGhpcy5jbGF6ei5wcm90b3R5cGUuY29uc3RydWN0b3IgPSB0aGlzLmNsYXp6O1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnc3RhdGljJywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jbGF6eiwgbmFtZSwge1xyXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6emVyLnByb3RvdHlwZSwgJ3Byb3BlcnR5Jywge1xyXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChuYW1lLCBvcHRzKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmNsYXp6LnByb3RvdHlwZSwgbmFtZSwgb3B0cyk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdtZXRob2QnLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKG5hbWUsIGZ1bmMpIHtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShuYW1lLCB7XHJcbiAgICAgICAgdmFsdWU6IGZ1bmNcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdnZXR0ZXInLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKGZyb20sIHRvKSB7XHJcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy4kbWVbdG9dO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdzZXR0ZXInLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKGZyb20sIHRvKSB7XHJcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgIHRoaXMuJG1lW3RvXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdoYW5kbGVyRXZlbnQnLCB7XHJcbiAgICB2YWx1ZTogZnVuY3Rpb24gKGZyb20sIHRvKSB7XHJcbiAgICAgIGlmICghdG8pIHRvID0gZnJvbTtcclxuICAgICAgdGhpcy5wcm9wZXJ0eShmcm9tLCB7XHJcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgdGhpcy4kbWVbdG9dID0gY2I7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgcmV0dXJuIENsYXp6ZXI7XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0NsYXp6ZXIuanMiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBDbGF6emVyXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuXG4gIGZ1bmN0aW9uIENsYXp6ZXIoY29uc3RydWN0b3IpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NsYXp6JywgeyB2YWx1ZTogY29uc3RydWN0b3IgfHwgZnVuY3Rpb24gKCkge30gfSk7XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnaW5oZXJpdCcsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUocGFyZW50KSB7XG4gICAgICB2YXIgdG1wID0gZnVuY3Rpb24gdG1wKCkge307XG4gICAgICB0bXAucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTtcbiAgICAgIHRoaXMuY2xhenoucHJvdG90eXBlID0gbmV3IHRtcCgpO1xuICAgICAgdGhpcy5jbGF6ei5wcm90b3R5cGUuY29uc3RydWN0b3IgPSB0aGlzLmNsYXp6O1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAnc3RhdGljJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShuYW1lLCBfdmFsdWUpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmNsYXp6LCBuYW1lLCB7XG4gICAgICAgIHZhbHVlOiBfdmFsdWVcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXp6ZXIucHJvdG90eXBlLCAncHJvcGVydHknLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKG5hbWUsIG9wdHMpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmNsYXp6LnByb3RvdHlwZSwgbmFtZSwgb3B0cyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdtZXRob2QnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKG5hbWUsIGZ1bmMpIHtcbiAgICAgIHRoaXMucHJvcGVydHkobmFtZSwge1xuICAgICAgICB2YWx1ZTogZnVuY1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdnZXR0ZXInLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGZyb20sIHRvKSB7XG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XG4gICAgICB0aGlzLnByb3BlcnR5KGZyb20sIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuJG1lW3RvXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdzZXR0ZXInLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGZyb20sIHRvKSB7XG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XG4gICAgICB0aGlzLnByb3BlcnR5KGZyb20sIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgICAgICB0aGlzLiRtZVt0b10gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xhenplci5wcm90b3R5cGUsICdoYW5kbGVyRXZlbnQnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGZyb20sIHRvKSB7XG4gICAgICBpZiAoIXRvKSB0byA9IGZyb207XG4gICAgICB0aGlzLnByb3BlcnR5KGZyb20sIHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGNiKSB7XG4gICAgICAgICAgdGhpcy4kbWVbdG9dID0gY2I7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgcmV0dXJuIENsYXp6ZXI7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9DbGF6emVyLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYlJlcXVlc3RcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCUmVxdWVzdCA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NRXhjZXB0aW9uPyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSAoSURCT2JqZWN0U3RvcmUgb3IgSURCSW5kZXggb3IgSURCQ3Vyc29yKT8gc291cmNlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJUcmFuc2FjdGlvbj8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlJlcXVlc3RSZWFkeVN0YXRlICAgICAgICAgICAgICAgICAgICAgICByZWFkeVN0YXRlO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uc3VjY2VzcztcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uZXJyb3I7XHJcbiAqIH07XHJcbiAqXHJcbiAqIGVudW0gSURCUmVxdWVzdFJlYWR5U3RhdGUge1xyXG4gKiAgIFwicGVuZGluZ1wiLFxyXG4gKiAgIFwiZG9uZVwiXHJcbiAqIH07XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplcikgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXHJcbiAgLy8gJF9wcm9taXNlXHJcblxyXG4gIGNvbnN0IFJlYWR5U3RhdGUgPSBuZXcgQ2xhenplcih7fSlcclxuICAgICAgICAuc3RhdGljKCdQZW5kaW5nJywgICdwZW5kaW5nJylcclxuICAgICAgICAuc3RhdGljKCdEb25lJywgICAgICdkb25lJyk7XHJcbiAgXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJSZXF1ZXN0IChtZSkge1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KEV2ZW50VGFyZ2V0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBTdGF0aWNzXHJcbiAgLnN0YXRpYygnUmVhZHlTdGF0ZScsIFJlYWR5U3RhdGUuY2xhenopXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEdldHRlcnNcclxuICAuZ2V0dGVyKCckcmVzdWx0JywgJ3Jlc3VsdCcpXHJcbiAgLmdldHRlcignJGVycm9yJywgJ2Vycm9yJylcclxuICAuZ2V0dGVyKCckc291cmNlJywgJ3NvdXJjZScpXHJcbiAgLmdldHRlcignJHJlYWR5U3RhdGUnLCAncmVhZHlTdGF0ZScpXHJcbiAgLmdldHRlcignJHRyYW5zYWN0aW9uJywgJ3RyYW5zYWN0aW9uJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRXZlbnQgaGFuZGxlcnNcclxuICAuaGFuZGxlckV2ZW50KCckc3VjY2VzcycsICdvbnN1Y2Nlc3MnKVxyXG4gIC5oYW5kbGVyRXZlbnQoJyRmYWlsZWQnLCAgJ29uZXJyb3InKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9wZXJ0eVxyXG4gIC5wcm9wZXJ0eSgnJHByb21pc2UnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICAgIGlmICh0aGl6LiRfcHJvbWlzZSkgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgICAgLy8gQ3JlYXIgcHJvbWlzZSBwYXJhIGVsIHJlcXVlc3RcclxuICAgICAgdGhpei4kX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdGhpei4kc3VjY2VzcyhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG5ldyBDbGF6emVyKHRoaXouJF9wcm9taXNlKS5zdGF0aWMoJyRyZXF1ZXN0JywgdGhpeiApO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXouJF9wcm9taXNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9pZGJSZXF1ZXN0LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiUmVxdWVzdFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJSZXF1ZXN0IDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBhbnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0O1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01FeGNlcHRpb24/ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIChJREJPYmplY3RTdG9yZSBvciBJREJJbmRleCBvciBJREJDdXJzb3IpPyBzb3VyY2U7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uPyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCUmVxdWVzdFJlYWR5U3RhdGUgICAgICAgICAgICAgICAgICAgICAgIHJlYWR5U3RhdGU7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25zdWNjZXNzO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogfTtcclxuICpcclxuICogZW51bSBJREJSZXF1ZXN0UmVhZHlTdGF0ZSB7XHJcbiAqICAgXCJwZW5kaW5nXCIsXHJcbiAqICAgXCJkb25lXCJcclxuICogfTtcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXG4gIC8vICRfcHJvbWlzZVxuXG4gIHZhciBSZWFkeVN0YXRlID0gbmV3IENsYXp6ZXIoe30pLnN0YXRpYygnUGVuZGluZycsICdwZW5kaW5nJykuc3RhdGljKCdEb25lJywgJ2RvbmUnKTtcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlJlcXVlc3QobWUpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBIZXJlbmNpYVxuICAuaW5oZXJpdChFdmVudFRhcmdldClcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gU3RhdGljc1xuICAuc3RhdGljKCdSZWFkeVN0YXRlJywgUmVhZHlTdGF0ZS5jbGF6eilcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR2V0dGVyc1xuICAuZ2V0dGVyKCckcmVzdWx0JywgJ3Jlc3VsdCcpLmdldHRlcignJGVycm9yJywgJ2Vycm9yJykuZ2V0dGVyKCckc291cmNlJywgJ3NvdXJjZScpLmdldHRlcignJHJlYWR5U3RhdGUnLCAncmVhZHlTdGF0ZScpLmdldHRlcignJHRyYW5zYWN0aW9uJywgJ3RyYW5zYWN0aW9uJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRXZlbnQgaGFuZGxlcnNcbiAgLmhhbmRsZXJFdmVudCgnJHN1Y2Nlc3MnLCAnb25zdWNjZXNzJykuaGFuZGxlckV2ZW50KCckZmFpbGVkJywgJ29uZXJyb3InKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQcm9wZXJ0eVxuICAucHJvcGVydHkoJyRwcm9taXNlJywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICBpZiAodGhpei4kX3Byb21pc2UpIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcblxuICAgICAgLy8gQ3JlYXIgcHJvbWlzZSBwYXJhIGVsIHJlcXVlc3RcbiAgICAgIHRoaXouJF9wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0aGl6LiRzdWNjZXNzKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xuICAgICAgICB9KS4kZmFpbGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJlamVjdChldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIG5ldyBDbGF6emVyKHRoaXouJF9wcm9taXNlKS5zdGF0aWMoJyRyZXF1ZXN0JywgdGhpeik7XG5cbiAgICAgIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcbiAgICB9XG5cbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMvaWRiUmVxdWVzdC5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJPcGVuREJSZXF1ZXN0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQk9wZW5EQlJlcXVlc3QgOiBJREJSZXF1ZXN0IHtcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYmxvY2tlZDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9udXBncmFkZW5lZWRlZDtcclxuICogfTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJSZXF1ZXN0KSB7ICduZ0luamVjdCc7XHJcbiAgXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJPcGVuREJSZXF1ZXN0IChtZSkge1xyXG4gICAgaWRiUmVxdWVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyAvLyBMbGFtYXIgYWwgY29uc3RydWN0b3MgZGVsIHBhZHJlXHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoaWRiUmVxdWVzdClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRXZlbnQgaGFuZGxlcnNcclxuICAuaGFuZGxlckV2ZW50KCckYmxvY2tlZCcsICdvbmJsb2NrZWQnKVxyXG4gIC5oYW5kbGVyRXZlbnQoJyR1cGdyYWRlbmVlZGVkJywgJ29udXBncmFkZW5lZWRlZCcpXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9pZGJPcGVuREJSZXF1ZXN0LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiT3BlbkRCUmVxdWVzdFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJPcGVuREJSZXF1ZXN0IDogSURCUmVxdWVzdCB7XHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmJsb2NrZWQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnVwZ3JhZGVuZWVkZWQ7XHJcbiAqIH07XHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiUmVxdWVzdCkge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiT3BlbkRCUmVxdWVzdChtZSkge1xuICAgIGlkYlJlcXVlc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgLy8gTGxhbWFyIGFsIGNvbnN0cnVjdG9zIGRlbCBwYWRyZVxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBIZXJlbmNpYVxuICAuaW5oZXJpdChpZGJSZXF1ZXN0KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBFdmVudCBoYW5kbGVyc1xuICAuaGFuZGxlckV2ZW50KCckYmxvY2tlZCcsICdvbmJsb2NrZWQnKS5oYW5kbGVyRXZlbnQoJyR1cGdyYWRlbmVlZGVkJywgJ29udXBncmFkZW5lZWRlZCcpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzL2lkYk9wZW5EQlJlcXVlc3QuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiQ29uc3VsdGFudFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJJbmRleC9JREJTdG9yZSB7XHJcbiAqICAgICAgICAgICAgYXR0cmlidXRlIERPTVN0cmluZyAgICAgIG5hbWU7XHJcbiAqIFxyXG4gKiAgIElEQlJlcXVlc3QgZ2V0KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRLZXkoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbChvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0QWxsS2V5cyhvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgY291bnQob3B0aW9uYWwgYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5DdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiAgIElEQlJlcXVlc3Qgb3BlbktleUN1cnNvcihvcHRpb25hbCBhbnkgcXVlcnksIG9wdGlvbmFsIElEQkN1cnNvckRpcmVjdGlvbiBkaXJlY3Rpb24gPSBcIm5leHRcIik7XHJcbiAqIH07XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiUmVxdWVzdCkgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiQ29uc3VsdGFudCAobWUpIHtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcclxuXHJcbiAgfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJG5hbWUnLCAnbmFtZScpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRnZXQnLCBmdW5jdGlvbiAocXVlcnkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZ2V0S2V5JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldEtleS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSlcclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldEFsbCcsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0QWxsLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZ2V0QWxsS2V5cycsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcclxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRBbGxLZXlzLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckY291bnQnLCBmdW5jdGlvbiAocXVlcnkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuY291bnQuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpXHJcbiAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRvcGVuQ3Vyc29yJywgZnVuY3Rpb24gKHF1ZXJ5LCBkaXJlY3Rpb24pIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUub3BlbkN1cnNvci5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRvcGVuS2V5Q3Vyc29yJywgZnVuY3Rpb24gKHF1ZXJ5LCBkaXJlY3Rpb24pIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUub3BlbktleUN1cnNvci5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMvaWRiQ29uc3VsdGFudC5qcyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYkNvbnN1bHRhbnRcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCSW5kZXgvSURCU3RvcmUge1xyXG4gKiAgICAgICAgICAgIGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICBuYW1lO1xyXG4gKiBcclxuICogICBJREJSZXF1ZXN0IGdldChhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0S2V5KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGwob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbEtleXMob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGNvdW50KG9wdGlvbmFsIGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuQ3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5LZXlDdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiB9O1xyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYlJlcXVlc3QpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkNvbnN1bHRhbnQobWUpIHtcblxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRuYW1lJywgJ25hbWUnKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZ2V0JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuZ2V0LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRnZXRLZXknLCBmdW5jdGlvbiAocXVlcnkpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRLZXkuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGdldEFsbCcsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5nZXRBbGwuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGdldEFsbEtleXMnLCBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmdldEFsbEtleXMuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGNvdW50JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuY291bnQuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJG9wZW5DdXJzb3InLCBmdW5jdGlvbiAocXVlcnksIGRpcmVjdGlvbikge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLm9wZW5DdXJzb3IuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckb3BlbktleUN1cnNvcicsIGZ1bmN0aW9uIChxdWVyeSwgZGlyZWN0aW9uKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUub3BlbktleUN1cnNvci5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzL2lkYkNvbnN1bHRhbnQuanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkZhY3Rvcnkge1xyXG4gKiAgIElEQk9wZW5EQlJlcXVlc3Qgb3BlbihET01TdHJpbmcgbmFtZSwgW0VuZm9yY2VSYW5nZV0gb3B0aW9uYWwgdW5zaWduZWQgbG9uZyBsb25nIHZlcnNpb24pO1xyXG4gKiAgIElEQk9wZW5EQlJlcXVlc3QgZGVsZXRlRGF0YWJhc2UoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIHNob3J0IGNtcChhbnkgZmlyc3QsIGFueSBzZWNvbmQpO1xyXG4gKiB9O1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJEYXRhYmFzZSA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIHVuc2lnbmVkIGxvbmcgbG9uZyB2ZXJzaW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmdMaXN0ICAgICAgb2JqZWN0U3RvcmVOYW1lcztcclxuICogXHJcbiAqICAgSURCVHJhbnNhY3Rpb24gdHJhbnNhY3Rpb24oKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KSBzdG9yZU5hbWVzLCBvcHRpb25hbCBJREJUcmFuc2FjdGlvbk1vZGUgbW9kZSA9IFwicmVhZG9ubHlcIik7XHJcbiAqICAgdm9pZCAgICAgICAgICAgY2xvc2UoKTtcclxuICogICBJREJPYmplY3RTdG9yZSBjcmVhdGVPYmplY3RTdG9yZShET01TdHJpbmcgbmFtZSwgb3B0aW9uYWwgSURCT2JqZWN0U3RvcmVQYXJhbWV0ZXJzIG9wdGlvbnMpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGRlbGV0ZU9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lKTtcclxuICogXHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmFib3J0O1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25jbG9zZTtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uZXJyb3I7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbnZlcnNpb25jaGFuZ2U7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBkaWN0aW9uYXJ5IElEQk9iamVjdFN0b3JlUGFyYW1ldGVycyB7XHJcbiAqICAgKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KT8ga2V5UGF0aCA9IG51bGw7XHJcbiAqICAgYm9vbGVhbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0luY3JlbWVudCA9IGZhbHNlO1xyXG4gKiB9O21lXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiRXZlbnRUYXJnZXQsIGlkYlN0b3JlLCBpZGJNb2RlbCwgaWRiT3BlbkRCUmVxdWVzdCwgaWRiVHJhbnNhY3Rpb24sICRsb2cpIHsgJ25nSW5qZWN0JztcclxuICBcclxuICAvLyBFbiBsYSBzaWd1aWVudGUgbGluZWEsIHB1ZWRlIGluY2x1aXIgcHJlZmlqb3MgZGUgaW1wbGVtZW50YWNpb24gcXVlIHF1aWVyYSBwcm9iYXIuXHJcbiAgY29uc3QgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xyXG4gIC8vIE5vIHVzZSBcImNvbnN0IGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cclxuICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcclxuICBjb25zdCBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XHJcbiAgY29uc3QgSURCS2V5UmFuZ2UgPSB3aW5kb3cuSURCS2V5UmFuZ2UgfHwgd2luZG93LndlYmtpdElEQktleVJhbmdlIHx8IHdpbmRvdy5tc0lEQktleVJhbmdlO1xyXG4gIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXHJcbiAgXHJcbiAgaWYgKCFpbmRleGVkREIpIHtcclxuICAgIGFsZXJ0KCdTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXMnKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcclxuICAvLyAkX21lXHJcbiAgLy8gJG9wZW5lZFxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yICBcclxuICBjb25zdCBpZGIgPSBmdW5jdGlvbiBpZGIobmFtZSwgdmVyc2lvbiwgc29ja2V0KSB7XHJcblxyXG4gICAgbmV3IENsYXp6ZXIodGhpcylcclxuICAgICAgLnN0YXRpYygnJG5hbWUnLCBuYW1lKVxyXG4gICAgICAuc3RhdGljKCckdmVyc2lvbicsIHZlcnNpb24pXHJcbiAgICAgIC5zdGF0aWMoJyRzb2NrZXQnLCBzb2NrZXQpO1xyXG5cclxuICB9O1xyXG5cclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGlkYilcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gSGVyZW5jaWFcclxuICAuaW5oZXJpdChpZGJFdmVudFRhcmdldClcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJvcGllZGFkZXNcclxuICAucHJvcGVydHkoJyRfdXBncmFkZW5lZWRlZHMnLCB7IHZhbHVlOltdIH0pXHJcbiAgLnByb3BlcnR5KCckX21vZGVscycsIHsgdmFsdWU6IHt9IH0pXHJcblxyXG4gIC5wcm9wZXJ0eSgnJG1lJywge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLiRfbWU7XHJcbiAgICB9LFxyXG4gICAgc2V0OiBmdW5jdGlvbiAobWUpIHtcclxuICAgICAgdGhpcy4kX21lID0gbWU7XHJcbiAgICAgIGNvbnN0IGUgPSBuZXcgRXZlbnQoJ29wZW5lZCcpO1xyXG4gICAgICAvLyBlLnRhcmdldCA9IHRoaXM7XHJcbiAgICAgIHRoaXMuJGVtaXQoZSk7XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gR2V0dGVyc1xyXG4gIC5nZXR0ZXIoJyRvYmplY3RTdG9yZU5hbWVzJywgJ29iamVjdFN0b3JlTmFtZXMnKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckb3BlbicsIGZ1bmN0aW9uIChuYW1lLCB2ZXJzaW9uKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJPcGVuREJSZXF1ZXN0KGluZGV4ZWREQi5vcGVuLmFwcGx5KGluZGV4ZWREQiwgYXJndW1lbnRzKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRkcm9wJywgZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIG5ldyBpZGJPcGVuREJSZXF1ZXN0KGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZS5hcHBseShpbmRleGVkREIsIGFyZ3VtZW50cykpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckY21wJywgZnVuY3Rpb24gKGZpcnN0LCBzZWNvbmQpIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIGluZGV4ZWREQi5jbXAoZmlyc3QsIHNlY29uZCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEV2ZW50IGhhbmRsZXJzXHJcbiAgLm1ldGhvZCgnJGFib3J0ZWQnLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICByZXR1cm4gdGhpei4kYmluZCgnb3BlbmVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGl6LiRtZS5vbmFib3J0ID0gY2I7XHJcbiAgICB9KTtcclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckY2xvc2VkJywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgcmV0dXJuIHRoaXouJGJpbmQoJ29wZW5lZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpei4kbWUub25jbG9zZSA9IGNiO1xyXG4gICAgfSk7XHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGVycm9yJywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgcmV0dXJuIHRoaXouJGJpbmQoJ29wZW5lZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpei4kbWUub25lcnJvciA9IGNiO1xyXG4gICAgfSk7XHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHZlcnNpb25DaGFuZ2VkJywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgcmV0dXJuIHRoaXouJGJpbmQoJ29wZW5lZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpei4kbWUub252ZXJzaW9uY2hhbmdlID0gY2I7XHJcbiAgICB9KTtcclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckdXBncmFkZW5lZWRlZCcsIGZ1bmN0aW9uIChjYikge1xyXG4gICAgXHJcbiAgICB0aGlzLiRfdXBncmFkZW5lZWRlZHMucHVzaChjYik7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGF1dG9taWdyYXRpb24nLCBmdW5jdGlvbiAoYWxsTWlncmF0aW9ucykge1xyXG5cclxuICAgIHJldHVybiB0aGlzLiR1cGdyYWRlbmVlZGVkKGZ1bmN0aW9uICh0aGl6LCBvcGVuUmVxdWVzdCwgZXZlbnQpIHtcclxuICAgICAgT2JqZWN0LmtleXMoYWxsTWlncmF0aW9ucykubWFwKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XHJcblxyXG4gICAgICAgIGlmIChldmVudC5vbGRWZXJzaW9uIDwgdmVyc2lvbiAmJiB2ZXJzaW9uIDw9IGV2ZW50Lm5ld1ZlcnNpb24pIHtcclxuXHJcbiAgICAgICAgICBjb25zdCBtaWdyYXRpb25zID0gQXJyYXkuaXNBcnJheShhbGxNaWdyYXRpb25zW3ZlcnNpb25dKT9cclxuICAgICAgICAgICAgYWxsTWlncmF0aW9uc1t2ZXJzaW9uXTpbYWxsTWlncmF0aW9uc1t2ZXJzaW9uXV07XHJcblxyXG4gICAgICAgICAgJGxvZy5sb2coJ21pZ3JhdGlvbiB2Jyt2ZXJzaW9uKycgc3RhcnRzJyk7XHJcbiAgICAgICAgICBtaWdyYXRpb25zLm1hcChmdW5jdGlvbiAobWlncmF0aW9uKSB7XHJcbiAgICAgICAgICAgIG1pZ3JhdGlvbih0aGl6LCBvcGVuUmVxdWVzdCwgZXZlbnQpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRtaWdyYXRlJywgZnVuY3Rpb24gKG1vZGVsTmFtZSl7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIGlmICghbW9kZWxOYW1lKXtcclxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXouJF9tb2RlbHMpLm1hcChmdW5jdGlvbiAobW9kZWxOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXouJG1pZ3JhdGUobW9kZWxOYW1lKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJG1vZGVsKG1vZGVsTmFtZSkuJGNyZWF0ZSgpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckb3BlbicsIGZ1bmN0aW9uIChjYiwgY2JFcnIpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgbGV0IGxhc3RScSA9IG51bGw7XHJcbiAgICBsZXQgbGFzdEV2ZW50ID0gbnVsbDtcclxuXHJcbiAgICBpZiAoIXRoaXouJG9wZW5lZCkge1xyXG5cclxuICAgICAgdGhpei4kb3BlbmVkID0gKGxhc3RScSA9IGlkYi4kb3Blbih0aGl6LiRuYW1lLCB0aGl6LiR2ZXJzaW9uKVxyXG4gICAgICAgIC4kdXBncmFkZW5lZWRlZChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICRsb2cubG9nKCd1cGdyYWRlbmVlZGVkIGlkYjogJyt0aGl6LiRuYW1lKycgdicrdGhpei4kdmVyc2lvbik7XHJcbiAgICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgICB0aGl6LiRfdXBncmFkZW5lZWRlZHMubWFwKGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgICBjYi5hcHBseSh0aGl6LCBbdGhpeiwgbGFzdFJxLCBldmVudF0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkpXHJcblxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICRsb2cubG9nKCdvcGVuZWQgaWRiOiAnK3RoaXouJG5hbWUrJyB2Jyt0aGl6LiR2ZXJzaW9uKTtcclxuICAgICAgICAgIGlmICh0aGl6LiRtZSAhPT0gZXZlbnQudGFyZ2V0LnJlc3VsdCl7XHJcbiAgICAgICAgICAgIHRoaXouJG1lID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxhc3RFdmVudCA9IGV2ZW50O1xyXG4gICAgICAgICAgaWYgKGNiKSBjYih0aGl6LCBsYXN0UnEsIGV2ZW50KTtcclxuICAgICAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgbGFzdFJxID0gbnVsbDtcclxuICAgICAgICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XHJcbiAgICAgICAgICBpZiAoY2JFcnIpIGNiRXJyKHRoaXosIGxhc3RScSwgZXZlbnQpO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSBlbHNlIGlmIChjYikge1xyXG5cclxuICAgICAgY2IodGhpeiwgbGFzdFJxLCBsYXN0RXZlbnQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpei4kb3BlbmVkO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZHJvcCcsIGZ1bmN0aW9uIChjYikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgIGNvbnN0IHJxID0gaWRiLiRkcm9wKHRoaXouJG5hbWUpXHJcbiAgICAgICAgLiRzdWNjZXNzKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVzb2x2ZSh0aGl6KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZWplY3QoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICBpZiAoY2IpIGNiKHJxKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGNsb3NlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHRoaXMuJG9wZW5lZCA9IG51bGw7XHJcbiAgICB0aGlzLiRtZS5jbG9zZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRjcmVhdGVTdG9yZScsIGZ1bmN0aW9uIChuYW1lLCBvcHRpb25zKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJTdG9yZSh0aGlzLiRtZS5jcmVhdGVPYmplY3RTdG9yZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSk7XHJcbiAgICBcclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZHJvcFN0b3JlJywgZnVuY3Rpb24gKG5hbWUpIHtcclxuXHJcbiAgICB0aGlzLiRtZS5kZWxldGVPYmplY3RTdG9yZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJG1vZGVsJywgZnVuY3Rpb24gKG5hbWUsIHNvY2tldCkge1xyXG5cclxuICAgIC8vIFNpIGV4aXN0ZSBlbCBtb2RlbG8gcmV0b3JuYXJsb1xyXG4gICAgaWYodGhpcy4kX21vZGVsc1tuYW1lXSkgcmV0dXJuIHRoaXMuJF9tb2RlbHNbbmFtZV07XHJcblxyXG4gICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG8geSBndWFyZGFybG9cclxuICAgIHJldHVybiB0aGlzLiRfbW9kZWxzW25hbWVdID0gaWRiTW9kZWwodGhpcywgbmFtZSwgc29ja2V0IHx8IHRoaXMuJHNvY2tldCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyR0cmFuc2FjdGlvbicsIGZ1bmN0aW9uIChzdG9yZU5hbWVzLCBtb2RlKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuXHJcbiAgICByZXR1cm4gdGhpei4kb3BlbigpXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uICh0aGl6KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBpZGJUcmFuc2FjdGlvbih0aGl6LiRtZS50cmFuc2FjdGlvbi5hcHBseSh0aGl6LiRtZSwgYXJncykpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc3RvcmUnLCBmdW5jdGlvbiAoc3RvcmVOYW1lcykgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShzdG9yZU5hbWVzKSkgc3RvcmVOYW1lcyA9IFtzdG9yZU5hbWVzXTtcclxuXHJcbiAgICBmdW5jdGlvbiBhY3Rpb24obW9kZSkge1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXouJHRyYW5zYWN0aW9uKHN0b3JlTmFtZXMsIG1vZGUpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RvcmVzT2JqID0ge307XHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlcyA9IHN0b3JlTmFtZXMubWFwKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gc3RvcmVzT2JqW3N0b3JlTmFtZV0gPSB0eC4kc3RvcmUoc3RvcmVOYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChjYikgY2IuYXBwbHkodGhpeiwgc3RvcmVzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0b3Jlc09iajtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IENsYXp6ZXIoe30pXHJcbiAgICAgIC5zdGF0aWMoJyRyZWFkZXInLCBhY3Rpb24oaWRiVHJhbnNhY3Rpb24uVHJhbnNhY3Rpb25Nb2RlLlJlYWRPbmx5KSlcclxuICAgICAgLnN0YXRpYygnJHdyaXRlcicsIGFjdGlvbihpZGJUcmFuc2FjdGlvbi5UcmFuc2FjdGlvbk1vZGUuUmVhZFdyaXRlKSlcclxuICAgICAgLmNsYXp6XHJcblxyXG4gIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9pZGIuanMiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCRmFjdG9yeSB7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBvcGVuKERPTVN0cmluZyBuYW1lLCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGxvbmcgdmVyc2lvbik7XHJcbiAqICAgSURCT3BlbkRCUmVxdWVzdCBkZWxldGVEYXRhYmFzZShET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgc2hvcnQgY21wKGFueSBmaXJzdCwgYW55IHNlY29uZCk7XHJcbiAqIH07XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQkRhdGFiYXNlIDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgdW5zaWduZWQgbG9uZyBsb25nIHZlcnNpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgICAgICBvYmplY3RTdG9yZU5hbWVzO1xyXG4gKiBcclxuICogICBJREJUcmFuc2FjdGlvbiB0cmFuc2FjdGlvbigoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pIHN0b3JlTmFtZXMsIG9wdGlvbmFsIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlID0gXCJyZWFkb25seVwiKTtcclxuICogICB2b2lkICAgICAgICAgICBjbG9zZSgpO1xyXG4gKiAgIElEQk9iamVjdFN0b3JlIGNyZWF0ZU9iamVjdFN0b3JlKERPTVN0cmluZyBuYW1lLCBvcHRpb25hbCBJREJPYmplY3RTdG9yZVBhcmFtZXRlcnMgb3B0aW9ucyk7XHJcbiAqICAgdm9pZCAgICAgICAgICAgZGVsZXRlT2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiBcclxuICogICAvLyBFdmVudCBoYW5kbGVyczpcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uYWJvcnQ7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmNsb3NlO1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25lcnJvcjtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9udmVyc2lvbmNoYW5nZTtcclxuICogfTtcclxuICogXHJcbiAqIGRpY3Rpb25hcnkgSURCT2JqZWN0U3RvcmVQYXJhbWV0ZXJzIHtcclxuICogICAoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pPyBrZXlQYXRoID0gbnVsbDtcclxuICogICBib29sZWFuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvSW5jcmVtZW50ID0gZmFsc2U7XHJcbiAqIH07bWVcclxuICovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJFdmVudFRhcmdldCwgaWRiU3RvcmUsIGlkYk1vZGVsLCBpZGJPcGVuREJSZXF1ZXN0LCBpZGJUcmFuc2FjdGlvbiwgJGxvZykge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cblxuICB2YXIgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xuICAvLyBObyB1c2UgXCJjb25zdCBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXG4gIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxuICB2YXIgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xuICB2YXIgSURCS2V5UmFuZ2UgPSB3aW5kb3cuSURCS2V5UmFuZ2UgfHwgd2luZG93LndlYmtpdElEQktleVJhbmdlIHx8IHdpbmRvdy5tc0lEQktleVJhbmdlO1xuICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxuXG4gIGlmICghaW5kZXhlZERCKSB7XG4gICAgYWxlcnQoJ1N1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhcycpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxuICAvLyAkX21lXG4gIC8vICRvcGVuZWRcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3IgIFxuICB2YXIgaWRiID0gZnVuY3Rpb24gaWRiKG5hbWUsIHZlcnNpb24sIHNvY2tldCkge1xuXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbmFtZScsIG5hbWUpLnN0YXRpYygnJHZlcnNpb24nLCB2ZXJzaW9uKS5zdGF0aWMoJyRzb2NrZXQnLCBzb2NrZXQpO1xuICB9O1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoaWRiKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBIZXJlbmNpYVxuICAuaW5oZXJpdChpZGJFdmVudFRhcmdldClcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUHJvcGllZGFkZXNcbiAgLnByb3BlcnR5KCckX3VwZ3JhZGVuZWVkZWRzJywgeyB2YWx1ZTogW10gfSkucHJvcGVydHkoJyRfbW9kZWxzJywgeyB2YWx1ZToge30gfSkucHJvcGVydHkoJyRtZScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRfbWU7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChtZSkge1xuICAgICAgdGhpcy4kX21lID0gbWU7XG4gICAgICB2YXIgZSA9IG5ldyBFdmVudCgnb3BlbmVkJyk7XG4gICAgICAvLyBlLnRhcmdldCA9IHRoaXM7XG4gICAgICB0aGlzLiRlbWl0KGUpO1xuICAgIH1cbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR2V0dGVyc1xuICAuZ2V0dGVyKCckb2JqZWN0U3RvcmVOYW1lcycsICdvYmplY3RTdG9yZU5hbWVzJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLnN0YXRpYygnJG9wZW4nLCBmdW5jdGlvbiAobmFtZSwgdmVyc2lvbikge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJPcGVuREJSZXF1ZXN0KGluZGV4ZWREQi5vcGVuLmFwcGx5KGluZGV4ZWREQiwgYXJndW1lbnRzKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5zdGF0aWMoJyRkcm9wJywgZnVuY3Rpb24gKG5hbWUpIHtcblxuICAgIHJldHVybiBuZXcgaWRiT3BlbkRCUmVxdWVzdChpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UuYXBwbHkoaW5kZXhlZERCLCBhcmd1bWVudHMpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLnN0YXRpYygnJGNtcCcsIGZ1bmN0aW9uIChmaXJzdCwgc2Vjb25kKSB7XG5cbiAgICByZXR1cm4gaW5kZXhlZERCLmNtcChmaXJzdCwgc2Vjb25kKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRXZlbnQgaGFuZGxlcnNcbiAgLm1ldGhvZCgnJGFib3J0ZWQnLCBmdW5jdGlvbiAoY2IpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgcmV0dXJuIHRoaXouJGJpbmQoJ29wZW5lZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXouJG1lLm9uYWJvcnQgPSBjYjtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGNsb3NlZCcsIGZ1bmN0aW9uIChjYikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICByZXR1cm4gdGhpei4kYmluZCgnb3BlbmVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpei4kbWUub25jbG9zZSA9IGNiO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckZXJyb3InLCBmdW5jdGlvbiAoY2IpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgcmV0dXJuIHRoaXouJGJpbmQoJ29wZW5lZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXouJG1lLm9uZXJyb3IgPSBjYjtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHZlcnNpb25DaGFuZ2VkJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIHJldHVybiB0aGl6LiRiaW5kKCdvcGVuZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGl6LiRtZS5vbnZlcnNpb25jaGFuZ2UgPSBjYjtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHVwZ3JhZGVuZWVkZWQnLCBmdW5jdGlvbiAoY2IpIHtcblxuICAgIHRoaXMuJF91cGdyYWRlbmVlZGVkcy5wdXNoKGNiKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGF1dG9taWdyYXRpb24nLCBmdW5jdGlvbiAoYWxsTWlncmF0aW9ucykge1xuXG4gICAgcmV0dXJuIHRoaXMuJHVwZ3JhZGVuZWVkZWQoZnVuY3Rpb24gKHRoaXosIG9wZW5SZXF1ZXN0LCBldmVudCkge1xuICAgICAgT2JqZWN0LmtleXMoYWxsTWlncmF0aW9ucykubWFwKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG5cbiAgICAgICAgaWYgKGV2ZW50Lm9sZFZlcnNpb24gPCB2ZXJzaW9uICYmIHZlcnNpb24gPD0gZXZlbnQubmV3VmVyc2lvbikge1xuXG4gICAgICAgICAgdmFyIG1pZ3JhdGlvbnMgPSBBcnJheS5pc0FycmF5KGFsbE1pZ3JhdGlvbnNbdmVyc2lvbl0pID8gYWxsTWlncmF0aW9uc1t2ZXJzaW9uXSA6IFthbGxNaWdyYXRpb25zW3ZlcnNpb25dXTtcblxuICAgICAgICAgICRsb2cubG9nKCdtaWdyYXRpb24gdicgKyB2ZXJzaW9uICsgJyBzdGFydHMnKTtcbiAgICAgICAgICBtaWdyYXRpb25zLm1hcChmdW5jdGlvbiAobWlncmF0aW9uKSB7XG4gICAgICAgICAgICBtaWdyYXRpb24odGhpeiwgb3BlblJlcXVlc3QsIGV2ZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRtaWdyYXRlJywgZnVuY3Rpb24gKG1vZGVsTmFtZSkge1xuICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgIGlmICghbW9kZWxOYW1lKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpei4kX21vZGVscykubWFwKGZ1bmN0aW9uIChtb2RlbE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXouJG1pZ3JhdGUobW9kZWxOYW1lKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGl6LiRtb2RlbChtb2RlbE5hbWUpLiRjcmVhdGUoKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJG9wZW4nLCBmdW5jdGlvbiAoY2IsIGNiRXJyKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIGxhc3RScSA9IG51bGw7XG4gICAgdmFyIGxhc3RFdmVudCA9IG51bGw7XG5cbiAgICBpZiAoIXRoaXouJG9wZW5lZCkge1xuXG4gICAgICB0aGl6LiRvcGVuZWQgPSAobGFzdFJxID0gaWRiLiRvcGVuKHRoaXouJG5hbWUsIHRoaXouJHZlcnNpb24pLiR1cGdyYWRlbmVlZGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAkbG9nLmxvZygndXBncmFkZW5lZWRlZCBpZGI6ICcgKyB0aGl6LiRuYW1lICsgJyB2JyArIHRoaXouJHZlcnNpb24pO1xuICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgIHRoaXouJF91cGdyYWRlbmVlZGVkcy5tYXAoZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgY2IuYXBwbHkodGhpeiwgW3RoaXosIGxhc3RScSwgZXZlbnRdKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgJGxvZy5sb2coJ29wZW5lZCBpZGI6ICcgKyB0aGl6LiRuYW1lICsgJyB2JyArIHRoaXouJHZlcnNpb24pO1xuICAgICAgICBpZiAodGhpei4kbWUgIT09IGV2ZW50LnRhcmdldC5yZXN1bHQpIHtcbiAgICAgICAgICB0aGl6LiRtZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdEV2ZW50ID0gZXZlbnQ7XG4gICAgICAgIGlmIChjYikgY2IodGhpeiwgbGFzdFJxLCBldmVudCk7XG4gICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGxhc3RScSA9IG51bGw7XG4gICAgICAgIHRoaXouJG9wZW5lZCA9IG51bGw7XG4gICAgICAgIGlmIChjYkVycikgY2JFcnIodGhpeiwgbGFzdFJxLCBldmVudCk7XG4gICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChjYikge1xuXG4gICAgICBjYih0aGl6LCBsYXN0UnEsIGxhc3RFdmVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXouJG9wZW5lZDtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGRyb3AnLCBmdW5jdGlvbiAoY2IpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgdGhpei4kb3BlbmVkID0gbnVsbDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgIHZhciBycSA9IGlkYi4kZHJvcCh0aGl6LiRuYW1lKS4kc3VjY2VzcyhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgcmVzb2x2ZSh0aGl6KTtcbiAgICAgIH0pLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJlamVjdChldmVudCk7XG4gICAgICB9KTtcbiAgICAgIGlmIChjYikgY2IocnEpO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLiRvcGVuZWQgPSBudWxsO1xuICAgIHRoaXMuJG1lLmNsb3NlLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjcmVhdGVTdG9yZScsIGZ1bmN0aW9uIChuYW1lLCBvcHRpb25zKSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlN0b3JlKHRoaXMuJG1lLmNyZWF0ZU9iamVjdFN0b3JlLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGRyb3BTdG9yZScsIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICB0aGlzLiRtZS5kZWxldGVPYmplY3RTdG9yZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckbW9kZWwnLCBmdW5jdGlvbiAobmFtZSwgc29ja2V0KSB7XG5cbiAgICAvLyBTaSBleGlzdGUgZWwgbW9kZWxvIHJldG9ybmFybG9cbiAgICBpZiAodGhpcy4kX21vZGVsc1tuYW1lXSkgcmV0dXJuIHRoaXMuJF9tb2RlbHNbbmFtZV07XG5cbiAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsbyB5IGd1YXJkYXJsb1xuICAgIHJldHVybiB0aGlzLiRfbW9kZWxzW25hbWVdID0gaWRiTW9kZWwodGhpcywgbmFtZSwgc29ja2V0IHx8IHRoaXMuJHNvY2tldCk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyR0cmFuc2FjdGlvbicsIGZ1bmN0aW9uIChzdG9yZU5hbWVzLCBtb2RlKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgcmV0dXJuIHRoaXouJG9wZW4oKS50aGVuKGZ1bmN0aW9uICh0aGl6KSB7XG4gICAgICByZXR1cm4gbmV3IGlkYlRyYW5zYWN0aW9uKHRoaXouJG1lLnRyYW5zYWN0aW9uLmFwcGx5KHRoaXouJG1lLCBhcmdzKSk7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRzdG9yZScsIGZ1bmN0aW9uIChzdG9yZU5hbWVzKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShzdG9yZU5hbWVzKSkgc3RvcmVOYW1lcyA9IFtzdG9yZU5hbWVzXTtcblxuICAgIGZ1bmN0aW9uIGFjdGlvbihtb2RlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGNiKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXouJHRyYW5zYWN0aW9uKHN0b3JlTmFtZXMsIG1vZGUpLnRoZW4oZnVuY3Rpb24gKHR4KSB7XG4gICAgICAgICAgdmFyIHN0b3Jlc09iaiA9IHt9O1xuICAgICAgICAgIHZhciBzdG9yZXMgPSBzdG9yZU5hbWVzLm1hcChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RvcmVzT2JqW3N0b3JlTmFtZV0gPSB0eC4kc3RvcmUoc3RvcmVOYW1lKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoY2IpIGNiLmFwcGx5KHRoaXosIHN0b3Jlcyk7XG4gICAgICAgICAgcmV0dXJuIHN0b3Jlc09iajtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ2xhenplcih7fSkuc3RhdGljKCckcmVhZGVyJywgYWN0aW9uKGlkYlRyYW5zYWN0aW9uLlRyYW5zYWN0aW9uTW9kZS5SZWFkT25seSkpLnN0YXRpYygnJHdyaXRlcicsIGFjdGlvbihpZGJUcmFuc2FjdGlvbi5UcmFuc2FjdGlvbk1vZGUuUmVhZFdyaXRlKSkuY2xheno7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5jbGF6ejtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzL2lkYi5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJTdG9yZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJPYmplY3RTdG9yZSB7XHJcbiAqICAgICAgICAgICAgYXR0cmlidXRlIERPTVN0cmluZyAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGFueSAgICAgICAgICAgIGtleVBhdGg7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZ0xpc3QgIGluZGV4TmFtZXM7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uIHRyYW5zYWN0aW9uO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICBhdXRvSW5jcmVtZW50O1xyXG4gKiBcclxuICogICBJREJSZXF1ZXN0IHB1dChhbnkgdmFsdWUsIG9wdGlvbmFsIGFueSBrZXkpO1xyXG4gKiAgIElEQlJlcXVlc3QgYWRkKGFueSB2YWx1ZSwgb3B0aW9uYWwgYW55IGtleSk7XHJcbiAqICAgSURCUmVxdWVzdCBkZWxldGUoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGNsZWFyKCk7XHJcbiAqICAgSURCSW5kZXggICBpbmRleChET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgSURCSW5kZXggICBjcmVhdGVJbmRleChET01TdHJpbmcgbmFtZSwgKERPTVN0cmluZyBvciBzZXF1ZW5jZTxET01TdHJpbmc+KSBrZXlQYXRoLCBvcHRpb25hbCBJREJJbmRleFBhcmFtZXRlcnMgb3B0aW9ucyk7XHJcbiAqICAgdm9pZCAgICAgICBkZWxldGVJbmRleChET01TdHJpbmcgaW5kZXhOYW1lKTtcclxuICogfTtcclxuICogXHJcbiAqIGRpY3Rpb25hcnkgSURCSW5kZXhQYXJhbWV0ZXJzIHtcclxuICogICBib29sZWFuIHVuaXF1ZSA9IGZhbHNlO1xyXG4gKiAgIGJvb2xlYW4gbXVsdGlFbnRyeSA9IGZhbHNlO1xyXG4gKiB9O1xyXG4gKiBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJSZXF1ZXN0LCBpZGJJbmRleCwgaWRiQ29uc3VsdGFudCwgJGxvZykgeyAnbmdJbmplY3QnO1xyXG5cclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlN0b3JlIChtZSkge1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpLnN0YXRpYygnJG1lJywgbWUpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KGlkYkNvbnN1bHRhbnQpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEdldHRlcnNcclxuICAuZ2V0dGVyKCcka2V5UGF0aCcsICdrZXlQYXRoJylcclxuICAuZ2V0dGVyKCckaW5kZXhOYW1lcycsICdpbmRleE5hbWVzJylcclxuICAuZ2V0dGVyKCckdHJhbnNhY3Rpb24nLCAndHJhbnNhY3Rpb24nKVxyXG4gIC5nZXR0ZXIoJyRhdXRvSW5jcmVtZW50JywgJ2F1dG9JbmNyZW1lbnQnKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckcHV0JywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUucHV0LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckYWRkJywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuYWRkLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckZGVsZXRlJywgZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmRlbGV0ZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSlcclxuICAgICAgLiRwcm9taXNlXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChldmVudCkge30pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckY2xlYXInLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJSZXF1ZXN0KHRoaXMuJG1lLmNsZWFyLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKVxyXG4gICAgICAuJHByb21pc2VcclxuICAgICAgLnRoZW4oZnVuY3Rpb24oZXZlbnQpe30pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckaW5kZXgnLCBmdW5jdGlvbiAobmFtZSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgaWRiSW5kZXgodGhpcy4kbWUuaW5kZXguYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckY3JlYXRlSW5kZXgnLCBmdW5jdGlvbiAoZmllbGRzLCBuYW1lLCBvcHRpb25zKSB7XHJcbiAgICBpZiAodHlwZW9mIGZpZWxkcyA9PSAnc3RyaW5nJykge1xyXG4gICAgICBmaWVsZHMgPSBbZmllbGRzXTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PSAnb2JqZWN0Jyl7XHJcbiAgICAgIG9wdGlvbnMgPSBuYW1lO1xyXG4gICAgICBuYW1lID0gbnVsbDtcclxuICAgIH1cclxuICAgIGlmICghbmFtZSkge1xyXG4gICAgICBuYW1lID0gZmllbGRzLnNvcnQoKS5qb2luKCdfJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJJbmRleCh0aGlzLiRtZS5jcmVhdGVJbmRleChuYW1lLCBmaWVsZHMsIG9wdGlvbnMpKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGRlbGV0ZUluZGV4JywgZnVuY3Rpb24gKGluZGV4TmFtZSkge1xyXG4gICAgaWYgKEFycmF5LmFuZ3VsYXIuaXNBcnJheShpbmRleE5hbWUpKSB7XHJcbiAgICAgIGluZGV4TmFtZSA9IGluZGV4TmFtZS5zb3J0KCkuam9pbignXycpO1xyXG4gICAgfVxyXG4gICAgdGhpcy4kbWUuZGVsZXRlSW5kZXgoaW5kZXhOYW1lKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9pZGJTdG9yZS5qcyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYlN0b3JlXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQk9iamVjdFN0b3JlIHtcclxuICogICAgICAgICAgICBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICAgbmFtZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAga2V5UGF0aDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgaW5kZXhOYW1lcztcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb24gdHJhbnNhY3Rpb247XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIGJvb2xlYW4gICAgICAgIGF1dG9JbmNyZW1lbnQ7XHJcbiAqIFxyXG4gKiAgIElEQlJlcXVlc3QgcHV0KGFueSB2YWx1ZSwgb3B0aW9uYWwgYW55IGtleSk7XHJcbiAqICAgSURCUmVxdWVzdCBhZGQoYW55IHZhbHVlLCBvcHRpb25hbCBhbnkga2V5KTtcclxuICogICBJREJSZXF1ZXN0IGRlbGV0ZShhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgY2xlYXIoKTtcclxuICogICBJREJJbmRleCAgIGluZGV4KERPTVN0cmluZyBuYW1lKTtcclxuICogICBJREJJbmRleCAgIGNyZWF0ZUluZGV4KERPTVN0cmluZyBuYW1lLCAoRE9NU3RyaW5nIG9yIHNlcXVlbmNlPERPTVN0cmluZz4pIGtleVBhdGgsIG9wdGlvbmFsIElEQkluZGV4UGFyYW1ldGVycyBvcHRpb25zKTtcclxuICogICB2b2lkICAgICAgIGRlbGV0ZUluZGV4KERPTVN0cmluZyBpbmRleE5hbWUpO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZGljdGlvbmFyeSBJREJJbmRleFBhcmFtZXRlcnMge1xyXG4gKiAgIGJvb2xlYW4gdW5pcXVlID0gZmFsc2U7XHJcbiAqICAgYm9vbGVhbiBtdWx0aUVudHJ5ID0gZmFsc2U7XHJcbiAqIH07XHJcbiAqIFxyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiUmVxdWVzdCwgaWRiSW5kZXgsIGlkYkNvbnN1bHRhbnQsICRsb2cpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlN0b3JlKG1lKSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoaWRiQ29uc3VsdGFudClcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR2V0dGVyc1xuICAuZ2V0dGVyKCcka2V5UGF0aCcsICdrZXlQYXRoJykuZ2V0dGVyKCckaW5kZXhOYW1lcycsICdpbmRleE5hbWVzJykuZ2V0dGVyKCckdHJhbnNhY3Rpb24nLCAndHJhbnNhY3Rpb24nKS5nZXR0ZXIoJyRhdXRvSW5jcmVtZW50JywgJ2F1dG9JbmNyZW1lbnQnKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckcHV0JywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5wdXQuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICB9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGFkZCcsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG5cbiAgICByZXR1cm4gbmV3IGlkYlJlcXVlc3QodGhpcy4kbWUuYWRkLmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpKS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgfSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRkZWxldGUnLCBmdW5jdGlvbiAocXVlcnkpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5kZWxldGUuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7fSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRjbGVhcicsIGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiBuZXcgaWRiUmVxdWVzdCh0aGlzLiRtZS5jbGVhci5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSkuJHByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHt9KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJGluZGV4JywgZnVuY3Rpb24gKG5hbWUpIHtcblxuICAgIHJldHVybiBuZXcgaWRiSW5kZXgodGhpcy4kbWUuaW5kZXguYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cykpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckY3JlYXRlSW5kZXgnLCBmdW5jdGlvbiAoZmllbGRzLCBuYW1lLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBmaWVsZHMgPT0gJ3N0cmluZycpIHtcbiAgICAgIGZpZWxkcyA9IFtmaWVsZHNdO1xuICAgIH1cbiAgICBpZiAoKHR5cGVvZiBuYW1lID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihuYW1lKSkgPT0gJ29iamVjdCcpIHtcbiAgICAgIG9wdGlvbnMgPSBuYW1lO1xuICAgICAgbmFtZSA9IG51bGw7XG4gICAgfVxuICAgIGlmICghbmFtZSkge1xuICAgICAgbmFtZSA9IGZpZWxkcy5zb3J0KCkuam9pbignXycpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgaWRiSW5kZXgodGhpcy4kbWUuY3JlYXRlSW5kZXgobmFtZSwgZmllbGRzLCBvcHRpb25zKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRkZWxldGVJbmRleCcsIGZ1bmN0aW9uIChpbmRleE5hbWUpIHtcbiAgICBpZiAoQXJyYXkuYW5ndWxhci5pc0FycmF5KGluZGV4TmFtZSkpIHtcbiAgICAgIGluZGV4TmFtZSA9IGluZGV4TmFtZS5zb3J0KCkuam9pbignXycpO1xuICAgIH1cbiAgICB0aGlzLiRtZS5kZWxldGVJbmRleChpbmRleE5hbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9pZGJTdG9yZS5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJJbmRleFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJJbmRleCB7XHJcbiAqICAgICAgICAgICAgYXR0cmlidXRlIERPTVN0cmluZyAgICAgIG5hbWU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQk9iamVjdFN0b3JlIG9iamVjdFN0b3JlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBhbnkgICAgICAgICAgICBrZXlQYXRoO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICBtdWx0aUVudHJ5O1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuICAgICAgICB1bmlxdWU7XHJcbiAqIFxyXG4gKiAgIElEQlJlcXVlc3QgZ2V0KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRLZXkoYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbChvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0QWxsS2V5cyhvcHRpb25hbCBhbnkgcXVlcnksIFtFbmZvcmNlUmFuZ2VdIG9wdGlvbmFsIHVuc2lnbmVkIGxvbmcgY291bnQpO1xyXG4gKiAgIElEQlJlcXVlc3QgY291bnQob3B0aW9uYWwgYW55IHF1ZXJ5KTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5DdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiAgIElEQlJlcXVlc3Qgb3BlbktleUN1cnNvcihvcHRpb25hbCBhbnkgcXVlcnksIG9wdGlvbmFsIElEQkN1cnNvckRpcmVjdGlvbiBkaXJlY3Rpb24gPSBcIm5leHRcIik7XHJcbiAqIH07XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplciwgaWRiQ29uc3VsdGFudCkgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiSW5kZXggKG1lKSB7XHJcblxyXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoaWRiQ29uc3VsdGFudClcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBHZXR0ZXJzXHJcbiAgLmdldHRlcignJG9iamVjdFN0b3JlJywgJ29iamVjdFN0b3JlJylcclxuICAuZ2V0dGVyKCcka2V5UGF0aCcsICAgICAna2V5UGF0aCcpXHJcbiAgLmdldHRlcignJG11bHRpRW50cnknLCAgJ211bHRpRW50cnknKVxyXG4gIC5nZXR0ZXIoJyR1bmlxdWUnLCAgICAgICd1bmlxdWUnKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzL2lkYkluZGV4LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiSW5kZXhcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogW0V4cG9zZWQ9KFdpbmRvdyxXb3JrZXIpXVxyXG4gKiBpbnRlcmZhY2UgSURCSW5kZXgge1xyXG4gKiAgICAgICAgICAgIGF0dHJpYnV0ZSBET01TdHJpbmcgICAgICBuYW1lO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJPYmplY3RTdG9yZSBvYmplY3RTdG9yZTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYW55ICAgICAgICAgICAga2V5UGF0aDtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYm9vbGVhbiAgICAgICAgbXVsdGlFbnRyeTtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgYm9vbGVhbiAgICAgICAgdW5pcXVlO1xyXG4gKiBcclxuICogICBJREJSZXF1ZXN0IGdldChhbnkgcXVlcnkpO1xyXG4gKiAgIElEQlJlcXVlc3QgZ2V0S2V5KGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBnZXRBbGwob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGdldEFsbEtleXMob3B0aW9uYWwgYW55IHF1ZXJ5LCBbRW5mb3JjZVJhbmdlXSBvcHRpb25hbCB1bnNpZ25lZCBsb25nIGNvdW50KTtcclxuICogICBJREJSZXF1ZXN0IGNvdW50KG9wdGlvbmFsIGFueSBxdWVyeSk7XHJcbiAqICAgSURCUmVxdWVzdCBvcGVuQ3Vyc29yKG9wdGlvbmFsIGFueSBxdWVyeSwgb3B0aW9uYWwgSURCQ3Vyc29yRGlyZWN0aW9uIGRpcmVjdGlvbiA9IFwibmV4dFwiKTtcclxuICogICBJREJSZXF1ZXN0IG9wZW5LZXlDdXJzb3Iob3B0aW9uYWwgYW55IHF1ZXJ5LCBvcHRpb25hbCBJREJDdXJzb3JEaXJlY3Rpb24gZGlyZWN0aW9uID0gXCJuZXh0XCIpO1xyXG4gKiB9O1xyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIsIGlkYkNvbnN1bHRhbnQpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkluZGV4KG1lKSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoaWRiQ29uc3VsdGFudClcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR2V0dGVyc1xuICAuZ2V0dGVyKCckb2JqZWN0U3RvcmUnLCAnb2JqZWN0U3RvcmUnKS5nZXR0ZXIoJyRrZXlQYXRoJywgJ2tleVBhdGgnKS5nZXR0ZXIoJyRtdWx0aUVudHJ5JywgJ211bHRpRW50cnknKS5nZXR0ZXIoJyR1bmlxdWUnLCAndW5pcXVlJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMvaWRiSW5kZXguanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiRXZlbnRUYXJnZXRcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplcikgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiRXZlbnRUYXJnZXQgKCkge30pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJvcGllZGFkZXNcclxuICAucHJvcGVydHkoJyRfbGlzdGVuZXJzJywgeyB2YWx1ZTogW10gfSlcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBtZXRob2RcclxuICAubWV0aG9kKCckYmluZCcsIGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaykge1xyXG4gICAgaWYoISh0eXBlIGluIHRoaXMuJF9saXN0ZW5lcnMpKSB7XHJcbiAgICAgIHRoaXMuJF9saXN0ZW5lcnNbdHlwZV0gPSBbXTtcclxuICAgIH1cclxuICAgIHRoaXMuJF9saXN0ZW5lcnNbdHlwZV0ucHVzaChjYWxsYmFjayk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIG1ldGhvZFxyXG4gIC5tZXRob2QoJyR1bmJpbmQgJywgZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICBpZih0eXBlIGluIHRoaXMuJF9saXN0ZW5lcnMpIHtcclxuICAgICAgdmFyIHN0YWNrID0gdGhpcy4kX2xpc3RlbmVyc1t0eXBlXTtcclxuICAgICAgZm9yKHZhciBpID0gMCwgbCA9IHN0YWNrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmKHN0YWNrW2ldID09PSBjYWxsYmFjayl7XHJcbiAgICAgICAgICBzdGFjay5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy4kdW5iaW5kKHR5cGUsIGNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH0pXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gbWV0aG9kXHJcbiAgLm1ldGhvZCgnJGVtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmKGV2ZW50LnR5cGUgaW4gdGhpcy4kX2xpc3RlbmVycykge1xyXG4gICAgICB2YXIgc3RhY2sgPSB0aGlzLiRfbGlzdGVuZXJzW2V2ZW50LnR5cGVdO1xyXG4gICAgICBmb3IodmFyIGkgPSAwLCBsID0gc3RhY2subGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICBzdGFja1tpXS5jYWxsKHRoaXMsIGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9pZGJFdmVudFRhcmdldC5qcyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXHJcbiAqIGlkYkV2ZW50VGFyZ2V0XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFxyXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKENsYXp6ZXIpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYkV2ZW50VGFyZ2V0KCkge30pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFByb3BpZWRhZGVzXG4gIC5wcm9wZXJ0eSgnJF9saXN0ZW5lcnMnLCB7IHZhbHVlOiBbXSB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBtZXRob2RcbiAgLm1ldGhvZCgnJGJpbmQnLCBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoISh0eXBlIGluIHRoaXMuJF9saXN0ZW5lcnMpKSB7XG4gICAgICB0aGlzLiRfbGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgfVxuICAgIHRoaXMuJF9saXN0ZW5lcnNbdHlwZV0ucHVzaChjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIG1ldGhvZFxuICAubWV0aG9kKCckdW5iaW5kICcsIGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlIGluIHRoaXMuJF9saXN0ZW5lcnMpIHtcbiAgICAgIHZhciBzdGFjayA9IHRoaXMuJF9saXN0ZW5lcnNbdHlwZV07XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHN0YWNrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoc3RhY2tbaV0gPT09IGNhbGxiYWNrKSB7XG4gICAgICAgICAgc3RhY2suc3BsaWNlKGksIDEpO1xuICAgICAgICAgIHJldHVybiB0aGlzLiR1bmJpbmQodHlwZSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBtZXRob2RcbiAgLm1ldGhvZCgnJGVtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudHlwZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSB7XG4gICAgICB2YXIgc3RhY2sgPSB0aGlzLiRfbGlzdGVuZXJzW2V2ZW50LnR5cGVdO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdGFjay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgc3RhY2tbaV0uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9pZGJFdmVudFRhcmdldC5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBpZGJNb2RlbFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJRdWVyeSwgaWRiRXZlbnRUYXJnZXQsIGxiUmVzb3VyY2UsICR0aW1lb3V0KSB7ICduZ0luamVjdCc7XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBCdXNjYXIgdW4gY2FtcG9cclxuY29uc3QgZGVlcEZpZWxkID0gZnVuY3Rpb24gKG9iaiwgZmllbGQsIGNiKSB7XHJcblxyXG4gIGNvbnN0IGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XHJcbiAgY29uc3QgbGFzdEZpZWxkID0gZmllbGRzLnBvcCgpO1xyXG5cclxuICByZXR1cm4gKGZ1bmN0aW9uIF9zZXQob2JqKSB7XHJcbiAgICBpZiAoZmllbGRzLmxlbmd0aCA9PSAwKVxyXG4gICAgICByZXR1cm4gY2Iob2JqLCBsYXN0RmllbGQpO1xyXG4gICAgY29uc3QgZmllbGQgPSBmaWVsZHMuc2hpZnQoKTtcclxuICAgIGlmICh0eXBlb2Ygb2JqW2ZpZWxkXSA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgIG9ialtmaWVsZF0gPSB7fTtcclxuICAgIHJldHVybiBfc2V0KG9ialtmaWVsZF0pO1xyXG4gIH0pKG9iaik7XHJcblxyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gT2J0aWVuZSBlbCB2YWxvciBwYSB1bmEgcHJvcGllZGEgZGUgdW4gb2JqZXRvXHJcbmNvbnN0IGdldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCkge1xyXG4gIHJldHVybiBkZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cclxuY29uc3Qgc2V0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIChvYmosIGZpZWxkLCB2YWx1ZSkge1xyXG4gIGRlZXBGaWVsZChvYmosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgIG9ialtsYXN0RmllbGRdID0gdmFsdWU7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIG9iajtcclxufTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnJldHVybiBmdW5jdGlvbiBpZGJNb2RlbEZhY3RvcnkgKGRiLCBuYW1lLCBzb2NrZXQpIHtcclxuICBcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRfcmVtb3RlXHJcbiAgLy8gJF92ZXJzaW9uaW5nXHJcbiAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgZnVuY3Rpb24gaWRiTW9kZWwoKSB7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3XHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBDbGF6emVyKGlkYk1vZGVsKVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBIZXJlbmNpYVxyXG4gIC5pbmhlcml0KGlkYkV2ZW50VGFyZ2V0KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQcm9waWVkYWRlcyBzdGF0aWNhc1xyXG4gIC5zdGF0aWMoJyRkYicsIGRiKVxyXG4gIC5zdGF0aWMoJyRuYW1lJywgbmFtZSlcclxuICAuc3RhdGljKCckc29ja2V0Jywgc29ja2V0KVxyXG5cclxuICAuc3RhdGljKCckaWQnLCB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfSlcclxuICAuc3RhdGljKCckZmllbGRzJywge1xyXG4gICAgaWQ6IHtcclxuICAgICAgaWQ6IHRydWUsXHJcbiAgICAgIG5hbWU6ICdpZCcsXHJcbiAgICAgIHR5cGU6ICdudW1iZXInXHJcbiAgICB9XHJcbiAgfSlcclxuICAuc3RhdGljKCckaW5kZXhlc1RvQ3JlYXRlJywgW10pXHJcbiAgLnN0YXRpYygnJGluc3RhbmNlcycsIHt9KVxyXG4gICAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGdldEtleUZyb20nLCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsIHRoaXMuJGlkLmtleVBhdGgpO1xyXG5cclxuICB9KVxyXG4gICAgXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGFkZEluZGV4JywgZnVuY3Rpb24gKGZpZWxkcywgbmFtZSwgb3B0aW9ucykge1xyXG5cclxuICAgIHRoaXMuJGluZGV4ZXNUb0NyZWF0ZS5wdXNoKGFyZ3VtZW50cyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRjcmVhdGUnLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgY29uc3Qgc3RvcmUgPSB0aGl6LiRkYi4kY3JlYXRlU3RvcmUodGhpei4kbmFtZSwgdGhpei4kaWQpO1xyXG5cclxuICAgIHRoaXouJGluZGV4ZXNUb0NyZWF0ZS5tYXAoZnVuY3Rpb24gKGFyZ3MpIHtcclxuICAgICAgc3RvcmUuJGNyZWF0ZUluZGV4LmFwcGx5KHN0b3JlLCBhcmdzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChjYikgY2IodGhpeiwgc3RvcmUpO1xyXG5cclxuICAgIHJldHVybiB0aGl6O1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckZHJvcCcsIGZ1bmN0aW9uIChjYikge1xyXG5cclxuICAgIHRoaXMuJGRiLiRkcm9wU3RvcmUodGhpcy4kbmFtZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyR3cml0ZXInLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJGRiLiRzdG9yZSh0aGl6LiRuYW1lKS4kd3JpdGVyKGNiKVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAoc3RvcmVzKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0b3Jlc1t0aGl6LiRuYW1lXVxyXG4gICAgICB9KVxyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckcmVhZGVyJywgZnVuY3Rpb24gKGNiKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIHJldHVybiB0aGl6LiRkYi4kc3RvcmUodGhpei4kbmFtZSkuJHJlYWRlcihjYilcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHN0b3Jlcykge1xyXG4gICAgICAgIHJldHVybiBzdG9yZXNbdGhpei4kbmFtZV1cclxuICAgICAgfSlcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJHB1dCcsIGZ1bmN0aW9uIChvYmosIGtleSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBjb25zdCBkYXRhID0gdGhpcy4kZ2V0VmFsdWVzKG9iaik7XHJcbiAgICBhcmdzWzBdID0gZGF0YTtcclxuXHJcbiAgICByZXR1cm4gdGhpei4kd3JpdGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRwdXQuYXBwbHkoc3RvcmUsIGFyZ3MpLnRoZW4oZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIGNvbnN0IHJlY29yZCA9IHRoaXouJGdldEluc3RhbmNlKGtleSk7XHJcbiAgICAgICAgcmVjb3JkLiRzZXRWYWx1ZXMoZGF0YSk7XHJcbiAgICAgICAgcmVjb3JkLiRzZXRMb2NhbFZhbHVlcyhkYXRhKTtcclxuICAgICAgICByZXR1cm4gcmVjb3JkO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuc3RhdGljKCckYWRkJywgZnVuY3Rpb24gKG9iaiwga2V5KSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLiRnZXRWYWx1ZXMob2JqKTtcclxuICAgIGFyZ3NbMF0gPSBkYXRhO1xyXG5cclxuICAgIHJldHVybiB0aGl6LiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gICAgICByZXR1cm4gc3RvcmUuJGFkZC5hcHBseShzdG9yZSwgYXJncykudGhlbihmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpei4kZ2V0SW5zdGFuY2Uoa2V5KTtcclxuICAgICAgICByZWNvcmQuJHNldFZhbHVlcyhkYXRhKTtcclxuICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xyXG4gICAgICAgIHJldHVybiByZWNvcmQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRkZWxldGUnLCBmdW5jdGlvbiAocXVlcnkpIHtcclxuICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzLiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gICAgICByZXR1cm4gc3RvcmUuJGRlbGV0ZS5hcHBseShzdG9yZSwgYXJncyk7XHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGNsZWFyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIFxyXG4gICAgcmV0dXJuIHRoaXMuJHdyaXRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBzdG9yZS4kY2xlYXIuYXBwbHkoc3RvcmUsIGFyZ3MpO1xyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRnZXQnLCBmdW5jdGlvbiAoa2V5KSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIGNvbnN0IHJlY29yZCA9IHRoaXMuJGdldEluc3RhbmNlKGtleSk7XHJcblxyXG4gICAgcmVjb3JkLiRwcm9taXNlID0gdGhpei4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRnZXQuYXBwbHkoc3RvcmUsIGFyZ3MpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZWNvcmQuJHNldFZhbHVlcyhkYXRhKTtcclxuICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xyXG4gICAgICAgIHJldHVybiByZWNvcmQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlY29yZDtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGdldEtleScsIGZ1bmN0aW9uIChxdWVyeSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXouJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBzdG9yZS4kZ2V0S2V5LmFwcGx5KHN0b3JlLCBhcmdzKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGdldEFsbCcsIGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gW107XHJcblxyXG4gICAgcmVzdWx0LiRwcm9taXNlID0gdGhpei4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRnZXRBbGwuYXBwbHkoc3RvcmUsIGFyZ3MpLnRoZW4oZnVuY3Rpb24gKGFycikge1xyXG4gICAgICAgIHJldHVybiBhcnIubWFwKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICBjb25zdCByZWNvcmQgPSB0aGl6LiRnZXRJbnN0YW5jZSh0aGl6LiRnZXRLZXlGcm9tKGRhdGEpKTtcclxuICAgICAgICAgIHJlY29yZC4kc2V0VmFsdWVzKGRhdGEpO1xyXG4gICAgICAgICAgcmVjb3JkLiRzZXRMb2NhbFZhbHVlcyhkYXRhKTtcclxuICAgICAgICAgIHJlc3VsdC5wdXNoKHJlY29yZCk7XHJcbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRnZXRBbGxLZXlzJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cclxuICAgIHJlc3VsdC4kcHJvbWlzZSA9IHRoaXMuJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBzdG9yZS4kZ2V0QWxsS2V5cy5hcHBseShzdG9yZSwgYXJncykudGhlbihmdW5jdGlvbiAoYXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIGFyci5tYXAoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2goa2V5KTtcclxuICAgICAgICAgIHJldHVybiBrZXk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRjb3VudCcsIGZ1bmN0aW9uIChxdWVyeSkge1xyXG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcclxuXHJcbiAgICByZXR1cm4gdGhpcy4kcmVhZGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlLiRjb3VudC5hcHBseShzdG9yZSwgYXJncyk7XHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLnN0YXRpYygnJGZpbmQnLCBmdW5jdGlvbiAoZmlsdGVycykge1xyXG4gICAgXHJcbiAgICByZXR1cm4gbmV3IGlkYlF1ZXJ5KHRoaXMsIGZpbHRlcnMpO1xyXG5cclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5zdGF0aWMoJyRnZXRJbnN0YW5jZScsIGZ1bmN0aW9uIChrZXkpIHtcclxuXHJcbiAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcclxuICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCB8fCBrZXkgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG5ldyB0aGlzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTm8gZXhpc3RlIGxhIGluc3RhbmNpYSBlbnRvbmNlIHNlIGNyZWFcclxuICAgIGlmICghdGhpcy4kaW5zdGFuY2VzW2tleV0pe1xyXG4gICAgICB0aGlzLiRpbnN0YW5jZXNba2V5XSA9IG5ldyB0aGlzKCk7XHJcbiAgICAgIHRoaXMuJGluc3RhbmNlc1trZXldLiRzZXQodGhpcy4kaWQua2V5UGF0aCwga2V5KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHRoaXMuJGluc3RhbmNlc1trZXldO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBc2lnbmEgbGEgZXNwZWNpZmljYWNpw7NuIGRlIGxvcyBjYW1wb3NcclxuICAuc3RhdGljKCckZmllbGQnLCBmdW5jdGlvbiAobmFtZSwgZmllbGQpIHtcclxuXHJcbiAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnc3RyaW5nJykge1xyXG4gICAgICBmaWVsZCA9IHsgXCJ0eXBlXCI6IGZpZWxkIH07XHJcbiAgICB9XHJcblxyXG4gICAgZmllbGQubmFtZSA9IG5hbWU7XHJcblxyXG4gICAgdGhpcy4kZmllbGRzW25hbWVdID0gZmllbGQ7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFncmVnYSBlbCBlbCBjYW1wbyBJRCBhdXRvbWF0aWNhbWVudGVcclxuICAuc3RhdGljKCcka2V5JywgZnVuY3Rpb24gKGtleSwgYXV0b0luY3JlbWVudCwgdHlwZSkge1xyXG4gICAgaWYodHlwZW9mIGtleSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgIGF1dG9JbmNyZW1lbnQgPSBrZXk7XHJcbiAgICB9XHJcbiAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQgfHwga2V5ID09PSBudWxsIHx8IHR5cGVvZiBrZXkgPT09ICdib29sZWFuJyl7XHJcbiAgICAgIGtleSA9ICdpZCc7XHJcbiAgICB9XHJcbiAgICBpZih0eXBlb2YgYXV0b0luY3JlbWVudCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgdHlwZSA9IGF1dG9JbmNyZW1lbnQ7XHJcbiAgICAgIGF1dG9JbmNyZW1lbnQgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKGF1dG9JbmNyZW1lbnQgPT09IHVuZGVmaW5lZCB8fCBhdXRvSW5jcmVtZW50ID09PSBudWxsKXtcclxuICAgICAgYXV0b0luY3JlbWVudCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZih0eXBlb2YgYXV0b0luY3JlbWVudCA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHR5cGUgPSAnbnVtYmVyJztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLiRpZC5rZXlQYXRoID0ga2V5O1xyXG4gICAgdGhpcy4kaWQuYXV0b0luY3JlbWVudCA9IGF1dG9JbmNyZW1lbnQ7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuJGZpZWxkKGtleSwge1xyXG4gICAgICBpZDogdHJ1ZSxcclxuICAgICAgdHlwZTogdHlwZSxcclxuICAgIH0pO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXHJcbiAgLnN0YXRpYygnJGdldFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgIFxyXG4gICAgY29uc3QgdmFsdWVzID0ge307XHJcblxyXG4gICAgT2JqZWN0LmtleXModGhpcy4kZmllbGRzKS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gZ2V0RmllbGRWYWx1ZShkYXRhLCBmaWVsZCk7XHJcbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICBzZXRGaWVsZFZhbHVlKHZhbHVlcywgZmllbGQsIHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQWdyZWdhIGVsIGVsIGNhbXBvIElEIGF1dG9tYXRpY2FtZW50ZVxyXG4gIC5zdGF0aWMoJyRidWlsZCcsIGZ1bmN0aW9uIChidWlsZENhbGxiYWNrKSB7XHJcblxyXG4gICAgYnVpbGRDYWxsYmFjayh0aGlzKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb250cm9sIGRlIHZlcnNpb25lcyBkZWwgbW9kZWxvXHJcbiAgLnN0YXRpYygnJHZlcnNpb25pbmcnLCBmdW5jdGlvbiAobW9kZWxOYW1lLCBjYikge1xyXG4gICAgaWYgKCF0aGlzLiRfdmVyc2lvbmluZykge1xyXG4gICAgICAgIFxyXG4gICAgICBpZiAodHlwZW9mIG1vZGVsTmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGNiID0gbW9kZWxOYW1lO1xyXG4gICAgICAgIG1vZGVsTmFtZSA9IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gU2kgZWwgbW9kZWwgbm8gdGllbmUgbm9tYnJlIHNlIGFncmVnYVxyXG4gICAgICBpZiAoIW1vZGVsTmFtZSl7XHJcbiAgICAgICAgbW9kZWxOYW1lID0gdGhpcy4kbmFtZSsnX3ZlcnNpb25pbmcnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDcmVhciBtb2RlbG8gcGFyYSBlbCBtYW5lam8gZGUgZGF0b3NcclxuICAgICAgdGhpcy4kX3ZlcnNpb25pbmcgPSB0aGlzLiRkYi4kbW9kZWwobW9kZWxOYW1lKVxyXG4gICAgICAgIC4ka2V5KHRoaXMuJGlkLmtleVBhdGgsIHRydWUpXHJcbiAgICAgICAgLiRmaWVsZCgnaGFzaCcsIHtcclxuICAgICAgICAgICd0eXBlJzogJ3N0cmluZycsXHJcbiAgICAgICAgICAncmVxdWlyZWQnOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjYikgY2IodGhpcy4kX3ZlcnNpb25pbmcpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGlcclxuICAuc3RhdGljKCckcmVtb3RlJywgZnVuY3Rpb24gKHVybCwgYXJncywgYWN0aW9ucykge1xyXG5cclxuICAgIHRoaXMuJF9yZW1vdGUgPSBsYlJlc291cmNlLmFwcGx5KGxiUmVzb3VyY2UsIGFyZ3VtZW50cyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJvcGllZGFkZXNcclxuICAucHJvcGVydHkoJyRfdmFsdWVzJywgeyB2YWx1ZTogbmV3IENsYXp6ZXIoe30pXHJcbiAgICAuc3RhdGljKCdsb2NhbCcsIHt9KVxyXG4gICAgLnN0YXRpYygncmVtb3RlJywge30pXHJcbiAgICAuY2xhenpcclxuICB9KVxyXG5cclxuICAucHJvcGVydHkoJyRfdmVyc2lvbnMnLCB7IHZhbHVlOiB7fSB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcclxuICAubWV0aG9kKCckZ2V0JywgZnVuY3Rpb24gKGZpZWxkKSB7XHJcblxyXG4gICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBc2lnbmEgaW4gdmFsb3IgYSB1biBjYW1wb1xyXG4gIC5tZXRob2QoJyRzZXQnLCBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XHJcblxyXG4gICAgcmV0dXJuIHNldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXHJcbiAgLm1ldGhvZCgnJGdldFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgcmV0dXJuIGlkYk1vZGVsLiRnZXRWYWx1ZXMoZGF0YSB8fCB0aGlzKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJGdldExvY2FsVmFsdWVzJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kX3ZhbHVlcy5sb2NhbCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRnZXRSZW1vdGVWYWx1ZXMnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuJGdldFZhbHVlcyh0aGlzLiRfdmFsdWVzLnJlbW90ZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRzZXRWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgIHNldEZpZWxkVmFsdWUodGhpeiwgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGl6O1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc2V0TG9jYWxWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgIHNldEZpZWxkVmFsdWUodGhpei4kX3ZhbHVlcy5sb2NhbCwgZmllbGQsIGRhdGFbZmllbGRdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGl6O1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAubWV0aG9kKCckc2V0UmVtb3RlVmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJF92YWx1ZXMucmVtb3RlLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXo7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRrZXknLCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgIHJldHVybiBnZXRGaWVsZFZhbHVlKGRhdGEsIHRoaXMuJGlkLmtleVBhdGgpO1xyXG5cclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEZ1bmNpb24gcXVlIGhhY2UgZXNjdWNoYXJzIGxvcyBtZW5zYWplcyBkZWwgc29ja2V0IHBhcmEgZWwgbW9kZWxcclxuICAubWV0aG9kKCckbGlzdGVuJywgZnVuY3Rpb24gKGRhdGEpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcbiAgICBpZiAoIXRoaXMuJHNvY2tldCkgdGhyb3cgbmV3IEVycm9yKCdpZGJNb2RlbC5Eb2VzTm90SGF2ZVNvY2tldEluc3RhbmNlJyk7XHJcblxyXG4gICAgLy8gQ3JlYXIgdW5hIHN1YnNjcmlwY2lvbiBhbCBzb2NrZXQgcGFyYSBjdWFuZG8gc2UgcmVjaWJhbiBkYXRvc1xyXG4gICAgLy8gcGFyYSBsYSBpbnN0YW5jaWEgYWN0dWFsXHJcbiAgICB0aGlzLiRzb2NrZXQuc3Vic2NyaWJlKHtcclxuICAgICAgbW9kZWxOYW1lOiBpZGJNb2RlbC4kbmFtZSxcclxuICAgICAgZXZlbnROYW1lOiAndXBkYXRlJyxcclxuICAgICAgbW9kZWxJZDogdGhpei4ka2V5KCksXHJcbiAgICB9LCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgLy8gQSByZWNpYmlyIGRhdG9zIGRlbCBzb2NrZXQgYXNpZ25hciBsb3MgdmFsb3Jlc1xyXG4gICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRW1pdGlyIGV2ZW50byBkZSBkYXRvcyByZWNpYmlkb3IgcGFyYSBlbCBtb2RlbG9cclxuICAgICAgICB0aGl6LiRzZXRSZW1vdGVWYWx1ZXMoZGF0YS52YWx1ZXMsIGRhdGEudmVyc2lvbik7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgfSlcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLmNsYXp6O1xyXG5cclxufTt9XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiTW9kZWxcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiUXVlcnksIGlkYkV2ZW50VGFyZ2V0LCBsYlJlc291cmNlLCAkdGltZW91dCkge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEJ1c2NhciB1biBjYW1wb1xuXG4gIHZhciBkZWVwRmllbGQgPSBmdW5jdGlvbiBkZWVwRmllbGQob2JqLCBmaWVsZCwgY2IpIHtcblxuICAgIHZhciBmaWVsZHMgPSBmaWVsZC5zcGxpdCgnLicpO1xuICAgIHZhciBsYXN0RmllbGQgPSBmaWVsZHMucG9wKCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gX3NldChvYmopIHtcbiAgICAgIGlmIChmaWVsZHMubGVuZ3RoID09IDApIHJldHVybiBjYihvYmosIGxhc3RGaWVsZCk7XG4gICAgICB2YXIgZmllbGQgPSBmaWVsZHMuc2hpZnQoKTtcbiAgICAgIGlmICh0eXBlb2Ygb2JqW2ZpZWxkXSA9PT0gJ3VuZGVmaW5lZCcpIG9ialtmaWVsZF0gPSB7fTtcbiAgICAgIHJldHVybiBfc2V0KG9ialtmaWVsZF0pO1xuICAgIH0ob2JqKTtcbiAgfTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBPYnRpZW5lIGVsIHZhbG9yIHBhIHVuYSBwcm9waWVkYSBkZSB1biBvYmpldG9cbiAgdmFyIGdldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiBnZXRGaWVsZFZhbHVlKG9iaiwgZmllbGQpIHtcbiAgICByZXR1cm4gZGVlcEZpZWxkKG9iaiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIE9idGllbmUgZWwgdmFsb3IgcGEgdW5hIHByb3BpZWRhIGRlIHVuIG9iamV0b1xuICB2YXIgc2V0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIHNldEZpZWxkVmFsdWUob2JqLCBmaWVsZCwgdmFsdWUpIHtcbiAgICBkZWVwRmllbGQob2JqLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgcmV0dXJuIGZ1bmN0aW9uIGlkYk1vZGVsRmFjdG9yeShkYiwgbmFtZSwgc29ja2V0KSB7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxuICAgIC8vICRfcmVtb3RlXG4gICAgLy8gJF92ZXJzaW9uaW5nXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBmdW5jdGlvbiBpZGJNb2RlbCgpIHt9XG5cbiAgICByZXR1cm4gbmV3XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQ29uc3RydWN0b3JcbiAgICBDbGF6emVyKGlkYk1vZGVsKVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSGVyZW5jaWFcbiAgICAuaW5oZXJpdChpZGJFdmVudFRhcmdldClcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFByb3BpZWRhZGVzIHN0YXRpY2FzXG4gICAgLnN0YXRpYygnJGRiJywgZGIpLnN0YXRpYygnJG5hbWUnLCBuYW1lKS5zdGF0aWMoJyRzb2NrZXQnLCBzb2NrZXQpLnN0YXRpYygnJGlkJywgeyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OiB0cnVlIH0pLnN0YXRpYygnJGZpZWxkcycsIHtcbiAgICAgIGlkOiB7XG4gICAgICAgIGlkOiB0cnVlLFxuICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgfVxuICAgIH0pLnN0YXRpYygnJGluZGV4ZXNUb0NyZWF0ZScsIFtdKS5zdGF0aWMoJyRpbnN0YW5jZXMnLCB7fSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXRLZXlGcm9tJywgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUoZGF0YSwgdGhpcy4kaWQua2V5UGF0aCk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRhZGRJbmRleCcsIGZ1bmN0aW9uIChmaWVsZHMsIG5hbWUsIG9wdGlvbnMpIHtcblxuICAgICAgdGhpcy4kaW5kZXhlc1RvQ3JlYXRlLnB1c2goYXJndW1lbnRzKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRjcmVhdGUnLCBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgdmFyIHN0b3JlID0gdGhpei4kZGIuJGNyZWF0ZVN0b3JlKHRoaXouJG5hbWUsIHRoaXouJGlkKTtcblxuICAgICAgdGhpei4kaW5kZXhlc1RvQ3JlYXRlLm1hcChmdW5jdGlvbiAoYXJncykge1xuICAgICAgICBzdG9yZS4kY3JlYXRlSW5kZXguYXBwbHkoc3RvcmUsIGFyZ3MpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChjYikgY2IodGhpeiwgc3RvcmUpO1xuXG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGRyb3AnLCBmdW5jdGlvbiAoY2IpIHtcblxuICAgICAgdGhpcy4kZGIuJGRyb3BTdG9yZSh0aGlzLiRuYW1lKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyR3cml0ZXInLCBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgcmV0dXJuIHRoaXouJGRiLiRzdG9yZSh0aGl6LiRuYW1lKS4kd3JpdGVyKGNiKS50aGVuKGZ1bmN0aW9uIChzdG9yZXMpIHtcbiAgICAgICAgcmV0dXJuIHN0b3Jlc1t0aGl6LiRuYW1lXTtcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckcmVhZGVyJywgZnVuY3Rpb24gKGNiKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIHJldHVybiB0aGl6LiRkYi4kc3RvcmUodGhpei4kbmFtZSkuJHJlYWRlcihjYikudGhlbihmdW5jdGlvbiAoc3RvcmVzKSB7XG4gICAgICAgIHJldHVybiBzdG9yZXNbdGhpei4kbmFtZV07XG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJHB1dCcsIGZ1bmN0aW9uIChvYmosIGtleSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB2YXIgZGF0YSA9IHRoaXMuJGdldFZhbHVlcyhvYmopO1xuICAgICAgYXJnc1swXSA9IGRhdGE7XG5cbiAgICAgIHJldHVybiB0aGl6LiR3cml0ZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuJHB1dC5hcHBseShzdG9yZSwgYXJncykudGhlbihmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IHRoaXouJGdldEluc3RhbmNlKGtleSk7XG4gICAgICAgICAgcmVjb3JkLiRzZXRWYWx1ZXMoZGF0YSk7XG4gICAgICAgICAgcmVjb3JkLiRzZXRMb2NhbFZhbHVlcyhkYXRhKTtcbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckYWRkJywgZnVuY3Rpb24gKG9iaiwga2V5KSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHZhciBkYXRhID0gdGhpcy4kZ2V0VmFsdWVzKG9iaik7XG4gICAgICBhcmdzWzBdID0gZGF0YTtcblxuICAgICAgcmV0dXJuIHRoaXouJHdyaXRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS4kYWRkLmFwcGx5KHN0b3JlLCBhcmdzKS50aGVuKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gdGhpei4kZ2V0SW5zdGFuY2Uoa2V5KTtcbiAgICAgICAgICByZWNvcmQuJHNldFZhbHVlcyhkYXRhKTtcbiAgICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xuICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRkZWxldGUnLCBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICByZXR1cm4gdGhpcy4kd3JpdGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRkZWxldGUuYXBwbHkoc3RvcmUsIGFyZ3MpO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRjbGVhcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICByZXR1cm4gdGhpcy4kd3JpdGVyKCkudGhlbihmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLiRjbGVhci5hcHBseShzdG9yZSwgYXJncyk7XG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLnN0YXRpYygnJGdldCcsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdmFyIHJlY29yZCA9IHRoaXMuJGdldEluc3RhbmNlKGtleSk7XG5cbiAgICAgIHJlY29yZC4kcHJvbWlzZSA9IHRoaXouJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS4kZ2V0LmFwcGx5KHN0b3JlLCBhcmdzKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgcmVjb3JkLiRzZXRWYWx1ZXMoZGF0YSk7XG4gICAgICAgICAgcmVjb3JkLiRzZXRMb2NhbFZhbHVlcyhkYXRhKTtcbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVjb3JkO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckZ2V0S2V5JywgZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgcmV0dXJuIHRoaXouJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS4kZ2V0S2V5LmFwcGx5KHN0b3JlLCBhcmdzKTtcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckZ2V0QWxsJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgIHJlc3VsdC4kcHJvbWlzZSA9IHRoaXouJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS4kZ2V0QWxsLmFwcGx5KHN0b3JlLCBhcmdzKS50aGVuKGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgICByZXR1cm4gYXJyLm1hcChmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgdmFyIHJlY29yZCA9IHRoaXouJGdldEluc3RhbmNlKHRoaXouJGdldEtleUZyb20oZGF0YSkpO1xuICAgICAgICAgICAgcmVjb3JkLiRzZXRWYWx1ZXMoZGF0YSk7XG4gICAgICAgICAgICByZWNvcmQuJHNldExvY2FsVmFsdWVzKGRhdGEpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gocmVjb3JkKTtcbiAgICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXRBbGxLZXlzJywgZnVuY3Rpb24gKHF1ZXJ5LCBjb3VudCkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgIHJlc3VsdC4kcHJvbWlzZSA9IHRoaXMuJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS4kZ2V0QWxsS2V5cy5hcHBseShzdG9yZSwgYXJncykudGhlbihmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgICAgcmV0dXJuIGFyci5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRjb3VudCcsIGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgIHJldHVybiB0aGlzLiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gc3RvcmUuJGNvdW50LmFwcGx5KHN0b3JlLCBhcmdzKTtcbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAuc3RhdGljKCckZmluZCcsIGZ1bmN0aW9uIChmaWx0ZXJzKSB7XG5cbiAgICAgIHJldHVybiBuZXcgaWRiUXVlcnkodGhpcywgZmlsdGVycyk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5zdGF0aWMoJyRnZXRJbnN0YW5jZScsIGZ1bmN0aW9uIChrZXkpIHtcblxuICAgICAgLy8gRWwgb2JqZXRvIG5vIHRpZW5lIElEXG4gICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQgfHwga2V5ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcygpO1xuICAgICAgfVxuXG4gICAgICAvLyBObyBleGlzdGUgbGEgaW5zdGFuY2lhIGVudG9uY2Ugc2UgY3JlYVxuICAgICAgaWYgKCF0aGlzLiRpbnN0YW5jZXNba2V5XSkge1xuICAgICAgICB0aGlzLiRpbnN0YW5jZXNba2V5XSA9IG5ldyB0aGlzKCk7XG4gICAgICAgIHRoaXMuJGluc3RhbmNlc1trZXldLiRzZXQodGhpcy4kaWQua2V5UGF0aCwga2V5KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuJGluc3RhbmNlc1trZXldO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBc2lnbmEgbGEgZXNwZWNpZmljYWNpw7NuIGRlIGxvcyBjYW1wb3NcbiAgICAuc3RhdGljKCckZmllbGQnLCBmdW5jdGlvbiAobmFtZSwgZmllbGQpIHtcblxuICAgICAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZmllbGQgPSB7IFwidHlwZVwiOiBmaWVsZCB9O1xuICAgICAgfVxuXG4gICAgICBmaWVsZC5uYW1lID0gbmFtZTtcblxuICAgICAgdGhpcy4kZmllbGRzW25hbWVdID0gZmllbGQ7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBZ3JlZ2EgZWwgZWwgY2FtcG8gSUQgYXV0b21hdGljYW1lbnRlXG4gICAgLnN0YXRpYygnJGtleScsIGZ1bmN0aW9uIChrZXksIGF1dG9JbmNyZW1lbnQsIHR5cGUpIHtcbiAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgYXV0b0luY3JlbWVudCA9IGtleTtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCB8fCBrZXkgPT09IG51bGwgfHwgdHlwZW9mIGtleSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGtleSA9ICdpZCc7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGF1dG9JbmNyZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHR5cGUgPSBhdXRvSW5jcmVtZW50O1xuICAgICAgICBhdXRvSW5jcmVtZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmIChhdXRvSW5jcmVtZW50ID09PSB1bmRlZmluZWQgfHwgYXV0b0luY3JlbWVudCA9PT0gbnVsbCkge1xuICAgICAgICBhdXRvSW5jcmVtZW50ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgYXV0b0luY3JlbWVudCA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHR5cGUgPSAnbnVtYmVyJztcbiAgICAgIH1cblxuICAgICAgdGhpcy4kaWQua2V5UGF0aCA9IGtleTtcbiAgICAgIHRoaXMuJGlkLmF1dG9JbmNyZW1lbnQgPSBhdXRvSW5jcmVtZW50O1xuXG4gICAgICByZXR1cm4gdGhpcy4kZmllbGQoa2V5LCB7XG4gICAgICAgIGlkOiB0cnVlLFxuICAgICAgICB0eXBlOiB0eXBlXG4gICAgICB9KTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxuICAgIC5zdGF0aWMoJyRnZXRWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICB2YXIgdmFsdWVzID0ge307XG5cbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuJGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBnZXRGaWVsZFZhbHVlKGRhdGEsIGZpZWxkKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzZXRGaWVsZFZhbHVlKHZhbHVlcywgZmllbGQsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEFncmVnYSBlbCBlbCBjYW1wbyBJRCBhdXRvbWF0aWNhbWVudGVcbiAgICAuc3RhdGljKCckYnVpbGQnLCBmdW5jdGlvbiAoYnVpbGRDYWxsYmFjaykge1xuXG4gICAgICBidWlsZENhbGxiYWNrKHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIENvbnRyb2wgZGUgdmVyc2lvbmVzIGRlbCBtb2RlbG9cbiAgICAuc3RhdGljKCckdmVyc2lvbmluZycsIGZ1bmN0aW9uIChtb2RlbE5hbWUsIGNiKSB7XG4gICAgICBpZiAoIXRoaXMuJF92ZXJzaW9uaW5nKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBtb2RlbE5hbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjYiA9IG1vZGVsTmFtZTtcbiAgICAgICAgICBtb2RlbE5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTaSBlbCBtb2RlbCBubyB0aWVuZSBub21icmUgc2UgYWdyZWdhXG4gICAgICAgIGlmICghbW9kZWxOYW1lKSB7XG4gICAgICAgICAgbW9kZWxOYW1lID0gdGhpcy4kbmFtZSArICdfdmVyc2lvbmluZyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhciBtb2RlbG8gcGFyYSBlbCBtYW5lam8gZGUgZGF0b3NcbiAgICAgICAgdGhpcy4kX3ZlcnNpb25pbmcgPSB0aGlzLiRkYi4kbW9kZWwobW9kZWxOYW1lKS4ka2V5KHRoaXMuJGlkLmtleVBhdGgsIHRydWUpLiRmaWVsZCgnaGFzaCcsIHtcbiAgICAgICAgICAndHlwZSc6ICdzdHJpbmcnLFxuICAgICAgICAgICdyZXF1aXJlZCc6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYikgY2IodGhpcy4kX3ZlcnNpb25pbmcpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGlcbiAgICAuc3RhdGljKCckcmVtb3RlJywgZnVuY3Rpb24gKHVybCwgYXJncywgYWN0aW9ucykge1xuXG4gICAgICB0aGlzLiRfcmVtb3RlID0gbGJSZXNvdXJjZS5hcHBseShsYlJlc291cmNlLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFByb3BpZWRhZGVzXG4gICAgLnByb3BlcnR5KCckX3ZhbHVlcycsIHsgdmFsdWU6IG5ldyBDbGF6emVyKHt9KS5zdGF0aWMoJ2xvY2FsJywge30pLnN0YXRpYygncmVtb3RlJywge30pLmNsYXp6XG4gICAgfSkucHJvcGVydHkoJyRfdmVyc2lvbnMnLCB7IHZhbHVlOiB7fSB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxuICAgIC5tZXRob2QoJyRnZXQnLCBmdW5jdGlvbiAoZmllbGQpIHtcblxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUodGhpcywgZmllbGQpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBc2lnbmEgaW4gdmFsb3IgYSB1biBjYW1wb1xuICAgIC5tZXRob2QoJyRzZXQnLCBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XG5cbiAgICAgIHJldHVybiBzZXRGaWVsZFZhbHVlKHRoaXMsIGZpZWxkKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxuICAgIC5tZXRob2QoJyRnZXRWYWx1ZXMnLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICByZXR1cm4gaWRiTW9kZWwuJGdldFZhbHVlcyhkYXRhIHx8IHRoaXMpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCckZ2V0TG9jYWxWYWx1ZXMnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kX3ZhbHVlcy5sb2NhbCk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5tZXRob2QoJyRnZXRSZW1vdGVWYWx1ZXMnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLiRnZXRWYWx1ZXModGhpcy4kX3ZhbHVlcy5yZW1vdGUpO1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCckc2V0VmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXosIGZpZWxkLCBkYXRhW2ZpZWxkXSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5tZXRob2QoJyRzZXRMb2NhbFZhbHVlcycsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIE9iamVjdC5rZXlzKGRhdGEgfHwge30pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgc2V0RmllbGRWYWx1ZSh0aGl6LiRfdmFsdWVzLmxvY2FsLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCckc2V0UmVtb3RlVmFsdWVzJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgICAgT2JqZWN0LmtleXMoZGF0YSB8fCB7fSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBzZXRGaWVsZFZhbHVlKHRoaXouJF92YWx1ZXMucmVtb3RlLCBmaWVsZCwgZGF0YVtmaWVsZF0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH0pXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAubWV0aG9kKCcka2V5JywgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgcmV0dXJuIGdldEZpZWxkVmFsdWUoZGF0YSwgdGhpcy4kaWQua2V5UGF0aCk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEZ1bmNpb24gcXVlIGhhY2UgZXNjdWNoYXJzIGxvcyBtZW5zYWplcyBkZWwgc29ja2V0IHBhcmEgZWwgbW9kZWxcbiAgICAubWV0aG9kKCckbGlzdGVuJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIGlmICghdGhpcy4kc29ja2V0KSB0aHJvdyBuZXcgRXJyb3IoJ2lkYk1vZGVsLkRvZXNOb3RIYXZlU29ja2V0SW5zdGFuY2UnKTtcblxuICAgICAgLy8gQ3JlYXIgdW5hIHN1YnNjcmlwY2lvbiBhbCBzb2NrZXQgcGFyYSBjdWFuZG8gc2UgcmVjaWJhbiBkYXRvc1xuICAgICAgLy8gcGFyYSBsYSBpbnN0YW5jaWEgYWN0dWFsXG4gICAgICB0aGlzLiRzb2NrZXQuc3Vic2NyaWJlKHtcbiAgICAgICAgbW9kZWxOYW1lOiBpZGJNb2RlbC4kbmFtZSxcbiAgICAgICAgZXZlbnROYW1lOiAndXBkYXRlJyxcbiAgICAgICAgbW9kZWxJZDogdGhpei4ka2V5KClcbiAgICAgIH0sIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgLy8gQSByZWNpYmlyIGRhdG9zIGRlbCBzb2NrZXQgYXNpZ25hciBsb3MgdmFsb3Jlc1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gRW1pdGlyIGV2ZW50byBkZSBkYXRvcyByZWNpYmlkb3IgcGFyYSBlbCBtb2RlbG9cbiAgICAgICAgICB0aGl6LiRzZXRSZW1vdGVWYWx1ZXMoZGF0YS52YWx1ZXMsIGRhdGEudmVyc2lvbik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC5jbGF6ejtcbiAgfTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIGlkYlRyYW5zYWN0aW9uXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFtFeHBvc2VkPShXaW5kb3csV29ya2VyKV1cclxuICogaW50ZXJmYWNlIElEQlRyYW5zYWN0aW9uIDogRXZlbnRUYXJnZXQge1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmdMaXN0ICAgICAgb2JqZWN0U3RvcmVOYW1lcztcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgSURCVHJhbnNhY3Rpb25Nb2RlIG1vZGU7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQkRhdGFiYXNlICAgICAgICBkYjtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NRXhjZXB0aW9uICAgICAgIGVycm9yO1xyXG4gKiBcclxuICogICBJREJPYmplY3RTdG9yZSBvYmplY3RTdG9yZShET01TdHJpbmcgbmFtZSk7XHJcbiAqICAgdm9pZCAgICAgICAgICAgYWJvcnQoKTtcclxuICogXHJcbiAqICAgLy8gRXZlbnQgaGFuZGxlcnM6XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmFib3J0O1xyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25jb21wbGV0ZTtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uZXJyb3I7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBlbnVtIElEQlRyYW5zYWN0aW9uTW9kZSB7XHJcbiAqICAgXCJyZWFkb25seVwiLFxyXG4gKiAgIFwicmVhZHdyaXRlXCIsXHJcbiAqICAgXCJ2ZXJzaW9uY2hhbmdlXCJcclxuICogfTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpZGJTdG9yZSkgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEF0cmlidXRvcyBmYWxudGFudGVzIHBvciBkZWZpbmlyXHJcbiAgLy8gJF9wcm9taXNlXHJcbiAgXHJcbiAgY29uc3QgVHJhbnNhY3Rpb25Nb2RlID0gbmV3IENsYXp6ZXIoe30pXHJcbiAgICAgICAgLnN0YXRpYygnUmVhZE9ubHknLCAncmVhZG9ubHknKVxyXG4gICAgICAgIC5zdGF0aWMoJ1JlYWRXcml0ZScsICdyZWFkd3JpdGUnKVxyXG4gICAgICAgIC5zdGF0aWMoJ1ZlcnNpb25DaGFuZ2UnLCAgJ3ZlcnNpb25jaGFuZ2UnKTtcclxuXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJUcmFuc2FjdGlvbiAobWUpIHtcclxuICAgIFxyXG4gICAgbmV3IENsYXp6ZXIodGhpcykuc3RhdGljKCckbWUnLCBtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEhlcmVuY2lhXHJcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFN0YXRpY3NcclxuICAuc3RhdGljKCdUcmFuc2FjdGlvbk1vZGUnLCBUcmFuc2FjdGlvbk1vZGUuY2xhenopXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEdldHRlcnNcclxuICAuZ2V0dGVyKCckZGInLCAgICAgICAgICAnZGInKVxyXG4gIC5nZXR0ZXIoJyRtb2RlJywgICAgICAgICdtb2RlJylcclxuICAuZ2V0dGVyKCckZXJyb3InLCAgICAgICAnZXJyb3InKVxyXG4gIC5nZXR0ZXIoJyRzdG9yZU5hbWVzJywgICdvYmplY3RTdG9yZU5hbWVzJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRXZlbnQgaGFuZGxlcnNcclxuICAuaGFuZGxlckV2ZW50KCckYWJvcnRlZCcsICAgJ29uYWJvcnQnKVxyXG4gIC5oYW5kbGVyRXZlbnQoJyRjb21wbGV0ZWQnLCAnb25jb21wbGV0ZScpXHJcbiAgLmhhbmRsZXJFdmVudCgnJGZhaWxlZCcsICAgICdvbmVycm9yJylcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLm1ldGhvZCgnJHN0b3JlJywgZnVuY3Rpb24obmFtZSl7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBpZGJTdG9yZSh0aGlzLiRtZS5vYmplY3RTdG9yZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRhYm9ydCcsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgdGhpcy4kbWUuYWJvcnQuYXBwbHkodGhpcy4kbWUsIGFyZ3VtZW50cyk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByb3BlcnR5XHJcbiAgLnByb3BlcnR5KCckcHJvbWlzZScsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICAgaWYgKHRoaXouJF9wcm9taXNlKSByZXR1cm4gdGhpei4kX3Byb21pc2U7XHJcblxyXG4gICAgICAvLyBDcmVhciBwcm9taXNlIHBhcmEgZWwgcmVxdWVzdFxyXG4gICAgICB0aGl6LiRfcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0aGl6LiRjb21wbGV0ZWQoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICByZXNvbHZlKGV2ZW50KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC4kZmFpbGVkKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgcmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBuZXcgQ2xhenplcih0aGl6LiRfcHJvbWlzZSkuc3RhdGljKCckdHJhbnNhY3Rpb24nLCB0aGl6KTtcclxuXHJcbiAgICAgIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5jbGF6ejtcclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMvaWRiVHJhbnNhY3Rpb24uanMiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxyXG4gKiBpZGJUcmFuc2FjdGlvblxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBbRXhwb3NlZD0oV2luZG93LFdvcmtlcildXHJcbiAqIGludGVyZmFjZSBJREJUcmFuc2FjdGlvbiA6IEV2ZW50VGFyZ2V0IHtcclxuICogICByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nTGlzdCAgICAgIG9iamVjdFN0b3JlTmFtZXM7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIElEQlRyYW5zYWN0aW9uTW9kZSBtb2RlO1xyXG4gKiAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBJREJEYXRhYmFzZSAgICAgICAgZGI7XHJcbiAqICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTUV4Y2VwdGlvbiAgICAgICBlcnJvcjtcclxuICogXHJcbiAqICAgSURCT2JqZWN0U3RvcmUgb2JqZWN0U3RvcmUoRE9NU3RyaW5nIG5hbWUpO1xyXG4gKiAgIHZvaWQgICAgICAgICAgIGFib3J0KCk7XHJcbiAqIFxyXG4gKiAgIC8vIEV2ZW50IGhhbmRsZXJzOlxyXG4gKiAgIGF0dHJpYnV0ZSBFdmVudEhhbmRsZXIgb25hYm9ydDtcclxuICogICBhdHRyaWJ1dGUgRXZlbnRIYW5kbGVyIG9uY29tcGxldGU7XHJcbiAqICAgYXR0cmlidXRlIEV2ZW50SGFuZGxlciBvbmVycm9yO1xyXG4gKiB9O1xyXG4gKiBcclxuICogZW51bSBJREJUcmFuc2FjdGlvbk1vZGUge1xyXG4gKiAgIFwicmVhZG9ubHlcIixcclxuICogICBcInJlYWR3cml0ZVwiLFxyXG4gKiAgIFwidmVyc2lvbmNoYW5nZVwiXHJcbiAqIH07XHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplciwgaWRiU3RvcmUpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXRyaWJ1dG9zIGZhbG50YW50ZXMgcG9yIGRlZmluaXJcbiAgLy8gJF9wcm9taXNlXG5cbiAgdmFyIFRyYW5zYWN0aW9uTW9kZSA9IG5ldyBDbGF6emVyKHt9KS5zdGF0aWMoJ1JlYWRPbmx5JywgJ3JlYWRvbmx5Jykuc3RhdGljKCdSZWFkV3JpdGUnLCAncmVhZHdyaXRlJykuc3RhdGljKCdWZXJzaW9uQ2hhbmdlJywgJ3ZlcnNpb25jaGFuZ2UnKTtcblxuICByZXR1cm4gbmV3XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDb25zdHJ1Y3RvclxuICBDbGF6emVyKGZ1bmN0aW9uIGlkYlRyYW5zYWN0aW9uKG1lKSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtZScsIG1lKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gSGVyZW5jaWFcbiAgLmluaGVyaXQoRXZlbnRUYXJnZXQpXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFN0YXRpY3NcbiAgLnN0YXRpYygnVHJhbnNhY3Rpb25Nb2RlJywgVHJhbnNhY3Rpb25Nb2RlLmNsYXp6KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHZXR0ZXJzXG4gIC5nZXR0ZXIoJyRkYicsICdkYicpLmdldHRlcignJG1vZGUnLCAnbW9kZScpLmdldHRlcignJGVycm9yJywgJ2Vycm9yJykuZ2V0dGVyKCckc3RvcmVOYW1lcycsICdvYmplY3RTdG9yZU5hbWVzJylcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRXZlbnQgaGFuZGxlcnNcbiAgLmhhbmRsZXJFdmVudCgnJGFib3J0ZWQnLCAnb25hYm9ydCcpLmhhbmRsZXJFdmVudCgnJGNvbXBsZXRlZCcsICdvbmNvbXBsZXRlJykuaGFuZGxlckV2ZW50KCckZmFpbGVkJywgJ29uZXJyb3InKVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckc3RvcmUnLCBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgcmV0dXJuIG5ldyBpZGJTdG9yZSh0aGlzLiRtZS5vYmplY3RTdG9yZS5hcHBseSh0aGlzLiRtZSwgYXJndW1lbnRzKSk7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC5tZXRob2QoJyRhYm9ydCcsIGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuJG1lLmFib3J0LmFwcGx5KHRoaXMuJG1lLCBhcmd1bWVudHMpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQcm9wZXJ0eVxuICAucHJvcGVydHkoJyRwcm9taXNlJywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICBpZiAodGhpei4kX3Byb21pc2UpIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcblxuICAgICAgLy8gQ3JlYXIgcHJvbWlzZSBwYXJhIGVsIHJlcXVlc3RcbiAgICAgIHRoaXouJF9wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0aGl6LiRjb21wbGV0ZWQoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmVzb2x2ZShldmVudCk7XG4gICAgICAgIH0pLiRmYWlsZWQoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmVqZWN0KGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgbmV3IENsYXp6ZXIodGhpei4kX3Byb21pc2UpLnN0YXRpYygnJHRyYW5zYWN0aW9uJywgdGhpeik7XG5cbiAgICAgIHJldHVybiB0aGl6LiRfcHJvbWlzZTtcbiAgICB9XG5cbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6O1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMvaWRiVHJhbnNhY3Rpb24uanMiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogaWRiUXVlcnlcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xhenplcikgeyAnbmdJbmplY3QnO1xyXG4gIFxyXG4gIHJldHVybiBuZXdcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiUXVlcnkgKG1vZGVsLCBxdWVyeSkge1xyXG5cclxuICAgIG5ldyBDbGF6emVyKHRoaXMpXHJcbiAgICAgIC5zdGF0aWMoJyRtb2RlbCcsIG1vZGVsKVxyXG4gICAgICAuc3RhdGljKCckcXVlcnknLCBxdWVyeSlcclxuICAgICAgO1xyXG5cclxuICB9KVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFN0YXRpY1xyXG4gIC5wcm9wZXJ0eSgnJHJlc3VsdCcsIHsgdmFsdWU6IFtdIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIG1ldGhvZFxyXG4gIC5tZXRob2QoJyRnZXRSZXN1bHQnLCBmdW5jdGlvbiAoY2IpIHsgY29uc3QgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgaWYgKCF0aGl6LiRyZXN1bHQuJHByb21pc2UpIHtcclxuXHJcbiAgICAgIHRoaXouJHJlc3VsdC4kcHJvbWlzZSA9IHRoaXouJG1vZGVsLiRyZWFkZXIoKS50aGVuKGZ1bmN0aW9uIChzdG9yZSkge1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgICAgY29uc3QgcnEgPSBzdG9yZS4kb3BlbkN1cnNvcigpO1xyXG4gICAgICAgICAgcnEuJHN1Y2Nlc3MoZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjdXJzb3IgPSBycS4kbWUucmVzdWx0O1xyXG4gICAgICAgICAgICBpZiAoIWN1cnNvcikgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlY29yZCA9IHRoaXouJG1vZGVsLiRnZXRJbnN0YW5jZShjdXJzb3Iua2V5KTtcclxuICAgICAgICAgICAgcmVjb3JkLiRzZXRWYWx1ZXMoY3Vyc29yLnZhbHVlKTtcclxuICAgICAgICAgICAgcmVjb3JkLiRzZXRMb2NhbFZhbHVlcyhjdXJzb3IudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGl6LiRyZXN1bHQucHVzaChyZWNvcmQpO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChyZWNvcmQpO1xyXG5cclxuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XHJcblxyXG4gICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAuJGZhaWxlZChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGV2ZW50KTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpei4kcmVzdWx0O1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xheno7XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzL2lkYlF1ZXJ5LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcclxuICogaWRiUXVlcnlcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoQ2xhenplcikge1xuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBuZXdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbnN0cnVjdG9yXG4gIENsYXp6ZXIoZnVuY3Rpb24gaWRiUXVlcnkobW9kZWwsIHF1ZXJ5KSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyRtb2RlbCcsIG1vZGVsKS5zdGF0aWMoJyRxdWVyeScsIHF1ZXJ5KTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gU3RhdGljXG4gIC5wcm9wZXJ0eSgnJHJlc3VsdCcsIHsgdmFsdWU6IFtdIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIG1ldGhvZFxuICAubWV0aG9kKCckZ2V0UmVzdWx0JywgZnVuY3Rpb24gKGNiKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgaWYgKCF0aGl6LiRyZXN1bHQuJHByb21pc2UpIHtcblxuICAgICAgdGhpei4kcmVzdWx0LiRwcm9taXNlID0gdGhpei4kbW9kZWwuJHJlYWRlcigpLnRoZW4oZnVuY3Rpb24gKHN0b3JlKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICB2YXIgcnEgPSBzdG9yZS4kb3BlbkN1cnNvcigpO1xuICAgICAgICAgIHJxLiRzdWNjZXNzKGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICB2YXIgY3Vyc29yID0gcnEuJG1lLnJlc3VsdDtcbiAgICAgICAgICAgIGlmICghY3Vyc29yKSByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuXG4gICAgICAgICAgICB2YXIgcmVjb3JkID0gdGhpei4kbW9kZWwuJGdldEluc3RhbmNlKGN1cnNvci5rZXkpO1xuICAgICAgICAgICAgcmVjb3JkLiRzZXRWYWx1ZXMoY3Vyc29yLnZhbHVlKTtcbiAgICAgICAgICAgIHJlY29yZC4kc2V0TG9jYWxWYWx1ZXMoY3Vyc29yLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXouJHJlc3VsdC5wdXNoKHJlY29yZCk7XG4gICAgICAgICAgICByZXN1bHQucHVzaChyZWNvcmQpO1xuXG4gICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICB9KS4kZmFpbGVkKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgcmVqZWN0KGV2ZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpei4kcmVzdWx0O1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAuY2xheno7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9pZGJRdWVyeS5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGF6emVyLCBpbywgJGxvZykgeyAnbmdJbmplY3QnO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxyXG4gIC8vICRzb2NrZXRcclxuXHJcbiAgcmV0dXJuIG5ld1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJTb2NrZXQodXJsLCBhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKXtcclxuXHJcbiAgICBuZXcgQ2xhenplcih0aGlzKVxyXG4gICAgICAuc3RhdGljKCckdXJsJywgdXJsIHx8IGlkYlNvY2tldC4kZGVmVXJsU2VydmVyKVxyXG4gICAgICAuc3RhdGljKCckYWNjZXNzVG9rZW5JZCcsIGFjY2Vzc1Rva2VuSWQgfHwgaWRiU29ja2V0LiRkZWZBY2Nlc3NUb2tlbklkKVxyXG4gICAgICAuc3RhdGljKCckY3VycmVudFVzZXJJZCcsIGN1cnJlbnRVc2VySWQgfHwgaWRiU29ja2V0LiRkZWZDdXJyZW50VXNlcklkKTtcclxuXHJcbiAgICB0aGlzLiRjb25uZWN0KCk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5wcm9wZXJ0eSgnJF9saXN0ZW5lcnMnLCB7IHZhbHVlOltdIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIENvbmVjdGFyc2UgYWwgc2Vydmlkb3JcclxuICAubWV0aG9kKCckY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyBDcmVhdGluZyBjb25uZWN0aW9uIHdpdGggc2VydmVyXHJcbiAgICBjb25zdCBzb2NrZXQgPSB0aGlzLiRzb2NrZXQgPSBpby5jb25uZWN0KHRoaXMuJHVybCk7XHJcblxyXG4gICAgLy8gVGhpcyBwYXJ0IGlzIG9ubHkgZm9yIGxvZ2luIHVzZXJzIGZvciBhdXRoZW50aWNhdGVkICRzb2NrZXQgY29ubmVjdGlvbiBiZXR3ZWVuIGNsaWVudCBhbmQgc2VydmVyLlxyXG4gICAgLy8gSWYgeW91IGFyZSBub3QgdXNpbmcgbG9naW4gcGFnZSBpbiB5b3Ugd2Vic2l0ZSB0aGVuIHlvdSBzaG91bGQgcmVtb3ZlIHJlc3QgcGllY2Ugb2YgY29kZS4uXHJcbiAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpe1xyXG4gICAgICAkbG9nLmxvZygnY29ubmVjdGVkJyk7XHJcblxyXG4gICAgICBzb2NrZXQuZW1pdCgnYXV0aGVudGljYXRpb24nLCB7XHJcbiAgICAgICAgaWQ6IHRoaXMuJGFjY2Vzc1Rva2VuSWQsXHJcbiAgICAgICAgdXNlcklkOiB0aGlzLiRjdXJyZW50VXNlcklkLFxyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIHNvY2tldC5vbignYXV0aGVudGljYXRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIHVzZSB0aGUgJHNvY2tldCBhcyB1c3VhbFxyXG4gICAgICAgICRsb2cubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQnKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRzdWJzY3JpYmUnLCBmdW5jdGlvbiAob3B0aW9ucywgY2IpIHtcclxuXHJcbiAgICBsZXQgbmFtZSA9IG9wdGlvbnMubW9kZWxOYW1lICsgJy4nICsgb3B0aW9ucy5ldmVudE5hbWU7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGVsSWQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIG5hbWUgPSBuYW1lICsgJy4nICsgb3B0aW9ucy5tb2RlbElkO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuJHNvY2tldC5vbihuYW1lLCBjYik7XHJcbiAgICBcclxuICAgIC8vUHVzaCB0aGUgY29udGFpbmVyLi5cclxuICAgIHRoaXMuJHB1c2hMaXN0ZW5lcihuYW1lLCBjYik7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyRwdXNoTGlzdGVuZXInLCBmdW5jdGlvbiAobmFtZSwgY2IpIHtcclxuXHJcbiAgICB0aGlzLiRfbGlzdGVuZXJzLnB1c2gobmFtZSk7XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC5tZXRob2QoJyR1bnN1YnNjcmliZScsZnVuY3Rpb24gKHN1YnNjcmlwdGlvbk5hbWUpIHtcclxuXHJcbiAgICB0aGlzLiRzb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzKHN1YnNjcmlwdGlvbk5hbWUpOyAgXHJcbiAgICB2YXIgaWR4ID0gdGhpcy4kX2xpc3RlbmVycy5pbmRleE9mKHN1YnNjcmlwdGlvbk5hbWUpO1xyXG4gICAgaWYgKGlkeCAhPSAtMSl7XHJcbiAgICAgIHRoaXMuJF9saXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICB9XHJcblxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIEFzaWduYSBsYSBVUkwgZGUgc2Vydmlkb3IgcG9yIGRlZmVjdG9cclxuICAuc3RhdGljKCckc2V0VXJsU2VydmVyJywgZnVuY3Rpb24gKHVybCkge1xyXG5cclxuICAgIHRoaXMuJGRlZlVybFNlcnZlciA9IHVybDtcclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBBU2lnbmEgbGFzIGNyZWRlbmNpYWxlcyBwb3IgZGVmZWN0b1xyXG4gIC5zdGF0aWMoJyRzZXRDcmVkZW50aWFscycsIGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XHJcblxyXG4gICAgdGhpcy4kZGVmQWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XHJcbiAgICB0aGlzLiRkZWZDdXJyZW50VXNlcklkID0gY3VycmVudFVzZXJJZDtcclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAuY2xhenpcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLiRzZXRVcmxTZXJ2ZXIobnVsbClcclxuICAuJHNldENyZWRlbnRpYWxzKG51bGwsIG51bGwpO1xyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy9pZGJTb2NrZXQuanMiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChDbGF6emVyLCBpbywgJGxvZykge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBdHJpYnV0b3MgZmFsbnRhbnRlcyBwb3IgZGVmaW5pclxuICAvLyAkc29ja2V0XG5cbiAgcmV0dXJuIG5ld1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ29uc3RydWN0b3JcbiAgQ2xhenplcihmdW5jdGlvbiBpZGJTb2NrZXQodXJsLCBhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XG5cbiAgICBuZXcgQ2xhenplcih0aGlzKS5zdGF0aWMoJyR1cmwnLCB1cmwgfHwgaWRiU29ja2V0LiRkZWZVcmxTZXJ2ZXIpLnN0YXRpYygnJGFjY2Vzc1Rva2VuSWQnLCBhY2Nlc3NUb2tlbklkIHx8IGlkYlNvY2tldC4kZGVmQWNjZXNzVG9rZW5JZCkuc3RhdGljKCckY3VycmVudFVzZXJJZCcsIGN1cnJlbnRVc2VySWQgfHwgaWRiU29ja2V0LiRkZWZDdXJyZW50VXNlcklkKTtcblxuICAgIHRoaXMuJGNvbm5lY3QoKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLnByb3BlcnR5KCckX2xpc3RlbmVycycsIHsgdmFsdWU6IFtdIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIENvbmVjdGFyc2UgYWwgc2Vydmlkb3JcbiAgLm1ldGhvZCgnJGNvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyBDcmVhdGluZyBjb25uZWN0aW9uIHdpdGggc2VydmVyXG4gICAgdmFyIHNvY2tldCA9IHRoaXMuJHNvY2tldCA9IGlvLmNvbm5lY3QodGhpcy4kdXJsKTtcblxuICAgIC8vIFRoaXMgcGFydCBpcyBvbmx5IGZvciBsb2dpbiB1c2VycyBmb3IgYXV0aGVudGljYXRlZCAkc29ja2V0IGNvbm5lY3Rpb24gYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlci5cbiAgICAvLyBJZiB5b3UgYXJlIG5vdCB1c2luZyBsb2dpbiBwYWdlIGluIHlvdSB3ZWJzaXRlIHRoZW4geW91IHNob3VsZCByZW1vdmUgcmVzdCBwaWVjZSBvZiBjb2RlLi5cbiAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkbG9nLmxvZygnY29ubmVjdGVkJyk7XG5cbiAgICAgIHNvY2tldC5lbWl0KCdhdXRoZW50aWNhdGlvbicsIHtcbiAgICAgICAgaWQ6IHRoaXMuJGFjY2Vzc1Rva2VuSWQsXG4gICAgICAgIHVzZXJJZDogdGhpcy4kY3VycmVudFVzZXJJZFxuICAgICAgfSk7XG5cbiAgICAgIHNvY2tldC5vbignYXV0aGVudGljYXRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdXNlIHRoZSAkc29ja2V0IGFzIHVzdWFsXG4gICAgICAgICRsb2cubG9nKCdVc2VyIGlzIGF1dGhlbnRpY2F0ZWQnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckc3Vic2NyaWJlJywgZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XG5cbiAgICB2YXIgbmFtZSA9IG9wdGlvbnMubW9kZWxOYW1lICsgJy4nICsgb3B0aW9ucy5ldmVudE5hbWU7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMubW9kZWxJZCA9PT0gJ251bWJlcicpIHtcbiAgICAgIG5hbWUgPSBuYW1lICsgJy4nICsgb3B0aW9ucy5tb2RlbElkO1xuICAgIH1cblxuICAgIHRoaXMuJHNvY2tldC5vbihuYW1lLCBjYik7XG5cbiAgICAvL1B1c2ggdGhlIGNvbnRhaW5lci4uXG4gICAgdGhpcy4kcHVzaExpc3RlbmVyKG5hbWUsIGNiKTtcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLm1ldGhvZCgnJHB1c2hMaXN0ZW5lcicsIGZ1bmN0aW9uIChuYW1lLCBjYikge1xuXG4gICAgdGhpcy4kX2xpc3RlbmVycy5wdXNoKG5hbWUpO1xuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAubWV0aG9kKCckdW5zdWJzY3JpYmUnLCBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uTmFtZSkge1xuXG4gICAgdGhpcy4kc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhzdWJzY3JpcHRpb25OYW1lKTtcbiAgICB2YXIgaWR4ID0gdGhpcy4kX2xpc3RlbmVycy5pbmRleE9mKHN1YnNjcmlwdGlvbk5hbWUpO1xuICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgIHRoaXMuJF9saXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuICB9KVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBc2lnbmEgbGEgVVJMIGRlIHNlcnZpZG9yIHBvciBkZWZlY3RvXG4gIC5zdGF0aWMoJyRzZXRVcmxTZXJ2ZXInLCBmdW5jdGlvbiAodXJsKSB7XG5cbiAgICB0aGlzLiRkZWZVcmxTZXJ2ZXIgPSB1cmw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEFTaWduYSBsYXMgY3JlZGVuY2lhbGVzIHBvciBkZWZlY3RvXG4gIC5zdGF0aWMoJyRzZXRDcmVkZW50aWFscycsIGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkKSB7XG5cbiAgICB0aGlzLiRkZWZBY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICB0aGlzLiRkZWZDdXJyZW50VXNlcklkID0gY3VycmVudFVzZXJJZDtcbiAgICByZXR1cm4gdGhpcztcbiAgfSlcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLmNsYXp6XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC4kc2V0VXJsU2VydmVyKG51bGwpLiRzZXRDcmVkZW50aWFscyhudWxsLCBudWxsKTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzL2lkYlNvY2tldC5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxiIChtb2R1bGUpIHtcclxuXHJcbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcclxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xyXG4gICAgY29uc3QgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xyXG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGxldCB1cmxCYXNlSG9zdCA9IGxvY2F0aW9uLmhvc3Q7XHJcblxyXG4gIGNvbnN0IGxiQXV0aCA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnXHJcbiAgICBjb25zdCBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcclxuICAgIGNvbnN0IHByb3BzUHJlZml4ID0gJyRpZGItbGIkJztcclxuICAgIFxyXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcclxuICAgIC8vIFdlIGFyZSB1c2luZyBlbXB0eSBzdHJpbmcgYXMgYSBtYXJrZXIgZm9yIG51bGwvdW5kZWZpbmVkIHZhbHVlcy5cclxuICAgIGZ1bmN0aW9uIHNhdmUoc3RvcmFnZSwgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBrZXkgPSBwcm9wc1ByZWZpeCArIG5hbWU7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XHJcbiAgICAgICAgc3RvcmFnZVtrZXldID0gdmFsdWU7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZChuYW1lKSB7XHJcbiAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVtrZXldIHx8IHNlc3Npb25TdG9yYWdlW2tleV0gfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsYkF1dGgoKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpeltuYW1lXSA9IGxvYWQobmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICBjb25zdCBzdG9yYWdlID0gdGhpei5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc3RvcmFnZSwgbmFtZSwgdGhpeltuYW1lXSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbihhY2Nlc3NUb2tlbklkLCB1c2VySWQsIHVzZXJEYXRhKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24oKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSBudWxsO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHNhdmUoc2Vzc2lvblN0b3JhZ2UsIG5hbWUsIG51bGwpO1xyXG4gICAgICAgIHNhdmUobG9jYWxTdG9yYWdlLCBuYW1lLCBudWxsKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XHJcblxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uKCRxLCBsYkF1dGgpIHsgJ25nSW5qZWN0JztcclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVxdWVzdDogZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICAgICAgLy8gZmlsdGVyIG91dCBleHRlcm5hbCByZXF1ZXN0c1xyXG4gICAgICAgIGNvbnN0IGhvc3QgPSBnZXRIb3N0KGNvbmZpZy51cmwpO1xyXG4gICAgICAgIGlmIChob3N0ICYmIGhvc3QgIT09IHVybEJhc2VIb3N0KSB7XHJcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XHJcbiAgICAgICAgICBjb25maWcuaGVhZGVyc1thdXRoSGVhZGVyXSA9IGxiQXV0aC5hY2Nlc3NUb2tlbklkO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLl9faXNHZXRDdXJyZW50VXNlcl9fKSB7XHJcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxyXG4gICAgICAgICAgLy8gdGhlcmUgaXMgbm8gdXNlciBsb2dnZWQgaW5cclxuICAgICAgICAgIGNvbnN0IHJlcyA9IHtcclxuICAgICAgICAgICAgYm9keTogeyBlcnJvcjogeyBzdGF0dXM6IDQwMSB9fSxcclxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXHJcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbigpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKCkgeyAnbmdJbmplY3QnOyBjb25zdCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcclxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nLFxyXG4gICAgfTtcclxuXHJcbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyIFRoZSBoZWFkZXIgbmFtZSB0byB1c2UsIGUuZy4gYFgtQWNjZXNzLVRva2VuYFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25maWd1cmUgdGhlIFJFU1QgdHJhbnNwb3J0IHRvIHVzZSBhIGRpZmZlcmVudCBoZWFkZXIgZm9yIHNlbmRpbmdcclxuICAgICAqIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi4gSXQgaXMgc2VudCBpbiB0aGUgYEF1dGhvcml6YXRpb25gIGhlYWRlclxyXG4gICAgICogYnkgZGVmYXVsdC5cclxuICAgICAqL1xyXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oaGVhZGVyKSB7XHJcbiAgICAgIG9wdGlvbnMuYXV0aEhlYWRlciA9IGhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBoZWFkZXIgbmFtZSB0aGF0IGlzIHVzZWQgZm9yIHNlbmRpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB1c2UsIGUuZy4gYC9hcGlgIG9yIGAvL2V4YW1wbGUuY29tL2FwaWAuXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENoYW5nZSB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIEJ5IGRlZmF1bHQsIHRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgb3B0aW9ucy51cmxCYXNlID0gdXJsO1xyXG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xyXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uKCRyZXNvdXJjZSkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgY29uc3QgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xyXG4gICAgICAgICAgYWN0aW9uc1trZXldLnVybCA9IG9wdGlvbnMudXJsQmFzZSArIGFjdGlvbnNba2V5XS51cmw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc291cmNlID0gJHJlc291cmNlKG9wdGlvbnMudXJsQmFzZSArIHVybCwgcGFyYW1zLCBhY3Rpb25zKTtcclxuXHJcbiAgICAgICAgLy8gQW5ndWxhciBhbHdheXMgY2FsbHMgUE9TVCBvbiAkc2F2ZSgpXHJcbiAgICAgICAgLy8gVGhpcyBoYWNrIGlzIGJhc2VkIG9uXHJcbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xyXG4gICAgICAgIHJlc291cmNlLnByb3RvdHlwZS4kc2F2ZSA9IGZ1bmN0aW9uKHN1Y2Nlc3MsIGVycm9yKSB7XHJcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxyXG4gICAgICAgICAgLy8gdGhhdCBleGFjdGx5IGZpdHMgb3VyIG5lZWRzLlxyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcclxuICAgICAgICAgIHJldHVybiByZXN1bHQuJHByb21pc2UgfHwgcmVzdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XHJcbiAgICAgIH07XHJcbiAgICBcclxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kdWxlXHJcbiAgICAuZmFjdG9yeSgnbGJBdXRoJywgbGJBdXRoKVxyXG4gICAgLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSlcclxuICAgIC5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpXHJcbiAgICAuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uKCRodHRwUHJvdmlkZXIpIHsgJ25nSW5qZWN0JztcclxuICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XHJcbiAgICB9XSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xiLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gbGI7XG5mdW5jdGlvbiBsYihtb2R1bGUpIHtcblxuICAvLyBEdnVlbHZlIGVsIGhvc3QgZGUgdW5hIFVSTFxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xuICAgIHZhciBtID0gdXJsLm1hdGNoKC9eKD86aHR0cHM/Oik/XFwvXFwvKFteXFwvXSspLyk7XG4gICAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcbiAgfVxuXG4gIHZhciB1cmxCYXNlSG9zdCA9IGxvY2F0aW9uLmhvc3Q7XG5cbiAgdmFyIGxiQXV0aCA9IGZ1bmN0aW9uIGxiQXV0aCgpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdmFyIHByb3BzID0gWydhY2Nlc3NUb2tlbklkJywgJ2N1cnJlbnRVc2VySWQnLCAncmVtZW1iZXJNZSddO1xuICAgIHZhciBwcm9wc1ByZWZpeCA9ICckaWRiLWxiJCc7XG5cbiAgICAvLyBOb3RlOiBMb2NhbFN0b3JhZ2UgY29udmVydHMgdGhlIHZhbHVlIHRvIHN0cmluZ1xuICAgIC8vIFdlIGFyZSB1c2luZyBlbXB0eSBzdHJpbmcgYXMgYSBtYXJrZXIgZm9yIG51bGwvdW5kZWZpbmVkIHZhbHVlcy5cbiAgICBmdW5jdGlvbiBzYXZlKHN0b3JhZ2UsIG5hbWUsIHZhbHVlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAnJztcbiAgICAgICAgc3RvcmFnZVtrZXldID0gdmFsdWU7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZChuYW1lKSB7XG4gICAgICB2YXIga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVtrZXldIHx8IHNlc3Npb25TdG9yYWdlW2tleV0gfHwgbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsYkF1dGgoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdGhpeltuYW1lXSA9IGxvYWQobmFtZSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB2YXIgc3RvcmFnZSA9IHRoaXoucmVtZW1iZXJNZSA/IGxvY2FsU3RvcmFnZSA6IHNlc3Npb25TdG9yYWdlO1xuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBzYXZlKHN0b3JhZ2UsIG5hbWUsIHRoaXpbbmFtZV0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2V0VXNlciA9IGZ1bmN0aW9uIChhY2Nlc3NUb2tlbklkLCB1c2VySWQsIHVzZXJEYXRhKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xuICAgICAgdGhpei5jdXJyZW50VXNlcklkID0gdXNlcklkO1xuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSB1c2VyRGF0YTtcbiAgICB9O1xuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclVzZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xuICAgICAgdGhpei5jdXJyZW50VXNlcklkID0gbnVsbDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gbnVsbDtcbiAgICB9O1xuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5jbGVhclN0b3JhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHNhdmUoc2Vzc2lvblN0b3JhZ2UsIG5hbWUsIG51bGwpO1xuICAgICAgICBzYXZlKGxvY2FsU3RvcmFnZSwgbmFtZSwgbnVsbCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBsYkF1dGgoKTtcbiAgfTtcblxuICB2YXIgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24gbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yKCRxLCBsYkF1dGgpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXh0ZXJuYWwgcmVxdWVzdHNcbiAgICAgICAgdmFyIGhvc3QgPSBnZXRIb3N0KGNvbmZpZy51cmwpO1xuICAgICAgICBpZiAoaG9zdCAmJiBob3N0ICE9PSB1cmxCYXNlSG9zdCkge1xuICAgICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGJBdXRoLmFjY2Vzc1Rva2VuSWQpIHtcbiAgICAgICAgICBjb25maWcuaGVhZGVyc1thdXRoSGVhZGVyXSA9IGxiQXV0aC5hY2Nlc3NUb2tlbklkO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5fX2lzR2V0Q3VycmVudFVzZXJfXykge1xuICAgICAgICAgIC8vIFJldHVybiBhIHN0dWIgNDAxIGVycm9yIGZvciBVc2VyLmdldEN1cnJlbnQoKSB3aGVuXG4gICAgICAgICAgLy8gdGhlcmUgaXMgbm8gdXNlciBsb2dnZWQgaW5cbiAgICAgICAgICB2YXIgcmVzID0ge1xuICAgICAgICAgICAgYm9keTogeyBlcnJvcjogeyBzdGF0dXM6IDQwMSB9IH0sXG4gICAgICAgICAgICBzdGF0dXM6IDQwMSxcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICAgICAgaGVhZGVyczogZnVuY3Rpb24gaGVhZGVycygpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29uZmlnIHx8ICRxLndoZW4oY29uZmlnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIHZhciBsYlJlc291cmNlID0gZnVuY3Rpb24gbGJSZXNvdXJjZSgpIHtcbiAgICAnbmdJbmplY3QnO1xuICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgdXJsQmFzZTogXCIvYXBpXCIsXG4gICAgICBhdXRoSGVhZGVyOiAnYXV0aG9yaXphdGlvbidcbiAgICB9O1xuXG4gICAgdXJsQmFzZUhvc3QgPSBnZXRIb3N0KG9wdGlvbnMudXJsQmFzZSkgfHwgbG9jYXRpb24uaG9zdDtcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyIFRoZSBoZWFkZXIgbmFtZSB0byB1c2UsIGUuZy4gYFgtQWNjZXNzLVRva2VuYFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25maWd1cmUgdGhlIFJFU1QgdHJhbnNwb3J0IHRvIHVzZSBhIGRpZmZlcmVudCBoZWFkZXIgZm9yIHNlbmRpbmdcclxuICAgICAqIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi4gSXQgaXMgc2VudCBpbiB0aGUgYEF1dGhvcml6YXRpb25gIGhlYWRlclxyXG4gICAgICogYnkgZGVmYXVsdC5cclxuICAgICAqL1xuICAgIHRoaXouc2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uIChoZWFkZXIpIHtcbiAgICAgIG9wdGlvbnMuYXV0aEhlYWRlciA9IGhlYWRlcjtcbiAgICB9LFxuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBoZWFkZXIgbmFtZSB0aGF0IGlzIHVzZWQgZm9yIHNlbmRpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLlxyXG4gICAgICovXG4gICAgdGhpei5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcbiAgICB9LFxuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB1c2UsIGUuZy4gYC9hcGlgIG9yIGAvL2V4YW1wbGUuY29tL2FwaWAuXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENoYW5nZSB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIEJ5IGRlZmF1bHQsIHRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXG4gICAgdGhpei5zZXRVcmxCYXNlID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgb3B0aW9ucy51cmxCYXNlID0gdXJsO1xuICAgICAgdXJsQmFzZUhvc3QgPSBnZXRIb3N0KG9wdGlvbnMudXJsQmFzZSkgfHwgbG9jYXRpb24uaG9zdDtcbiAgICB9LFxuXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBVUkwgb2YgdGhlIFJFU1QgQVBJIHNlcnZlci4gVGhlIFVSTCBwcm92aWRlZFxyXG4gICAgICogdG8gdGhlIGNvZGUgZ2VuZXJhdG9yIChgbGItbmdgIG9yIGBncnVudC1sb29wYmFjay1zZGstYW5ndWxhcmApIGlzIHVzZWQuXHJcbiAgICAgKi9cbiAgICB0aGl6LmdldFVybEJhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xuICAgIH07XG5cbiAgICB0aGl6LiRnZXQgPSBmdW5jdGlvbiAoJHJlc291cmNlKSB7XG4gICAgICAnbmdJbmplY3QnO1xuXG4gICAgICB2YXIgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uIGxiUmVzb3VyY2UodXJsLCBwYXJhbXMsIGFjdGlvbnMpIHtcblxuICAgICAgICBPYmplY3Qua2V5cyhhY3Rpb25zKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIGFjdGlvbnNba2V5XS5vcmlnaW5hbFVybCA9IGFjdGlvbnNba2V5XS51cmw7XG4gICAgICAgICAgYWN0aW9uc1trZXldLnVybCA9IG9wdGlvbnMudXJsQmFzZSArIGFjdGlvbnNba2V5XS51cmw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciByZXNvdXJjZSA9ICRyZXNvdXJjZShvcHRpb25zLnVybEJhc2UgKyB1cmwsIHBhcmFtcywgYWN0aW9ucyk7XG5cbiAgICAgICAgLy8gQW5ndWxhciBhbHdheXMgY2FsbHMgUE9TVCBvbiAkc2F2ZSgpXG4gICAgICAgIC8vIFRoaXMgaGFjayBpcyBiYXNlZCBvblxuICAgICAgICAvLyBodHRwOi8va2lya2J1c2hlbGwubWUvYW5ndWxhci1qcy11c2luZy1uZy1yZXNvdXJjZS1pbi1hLW1vcmUtcmVzdGZ1bC1tYW5uZXIvXG4gICAgICAgIHJlc291cmNlLnByb3RvdHlwZS4kc2F2ZSA9IGZ1bmN0aW9uIChzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgIC8vIEZvcnR1bmF0ZWx5LCBMb29wQmFjayBwcm92aWRlcyBhIGNvbnZlbmllbnQgYHVwc2VydGAgbWV0aG9kXG4gICAgICAgICAgLy8gdGhhdCBleGFjdGx5IGZpdHMgb3VyIG5lZWRzLlxuICAgICAgICAgIHZhciByZXN1bHQgPSByZXNvdXJjZS51cHNlcnQuY2FsbCh0aGlzLCB7fSwgdGhpcywgc3VjY2VzcywgZXJyb3IpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQuJHByb21pc2UgfHwgcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzb3VyY2U7XG4gICAgICB9O1xuXG4gICAgICBsYlJlc291cmNlLmdldFVybEJhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XG4gICAgICB9O1xuXG4gICAgICBsYlJlc291cmNlLmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gbGJSZXNvdXJjZTtcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBtb2R1bGUuZmFjdG9yeSgnbGJBdXRoJywgbGJBdXRoKS5wcm92aWRlcignbGJSZXNvdXJjZScsIGxiUmVzb3VyY2UpLmZhY3RvcnkoJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicsIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcikuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2xiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcicpO1xuICB9XSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xiLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==