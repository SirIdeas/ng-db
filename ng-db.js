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
	
	var _ngDbUtils = __webpack_require__(1);
	
	var _ngDbUtils2 = _interopRequireDefault(_ngDbUtils);
	
	var _events = __webpack_require__(2);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _qs = __webpack_require__(3);
	
	var _qs2 = _interopRequireDefault(_qs);
	
	var _iDb = __webpack_require__(4);
	
	var _iDb2 = _interopRequireDefault(_iDb);
	
	var _iModel = __webpack_require__(5);
	
	var _iModel2 = _interopRequireDefault(_iModel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	angular.module('ngDb', []).constant('NG_DB_VERSION', '0.0.1').service('$ngDbEvents', function () {
	  return _events2.default;
	}).service('$ngDbUtils', _ngDbUtils2.default).service('$qs', _qs2.default).service('$iDb', _iDb2.default).service('$iModel', _iModel2.default);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	ngDbUtils.$inject = ["$q"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = ngDbUtils;
	function ngDbUtils($q) {
	  'ngInject';
	
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
	exports.default = {
	  DB_ERROR: 'cb.error'
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
	
	iDbService.$inject = ["$qs", "$iModel", "$ngDbUtils", "$ngDbEvents", "$log"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = iDbService;
	function iDbService($qs, $iModel, $ngDbUtils, $ngDbEvents, $log) {
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
	  return function $iDb($dbName, $dbVersion) {
	    var thiz = this;
	    $ngDbUtils.validate(arguments, ['string', 'number']);
	
	    // Manejadores de eventos.
	    var $eventsCallbacks = {};
	    var $upgradeNeededDefered = $qs.defer();
	    var $openDefered = $qs.defer();
	    var $opened = false;
	
	    // Instancia de la base de datos;
	    var $request = null;
	    thiz.$models = {};
	
	    // Agregar un manejador de evento
	    thiz.$bind = function (eventName, cb) {
	      $ngDbUtils.validate(arguments, ['string', 'function']);
	
	      if (!$eventsCallbacks[eventName]) {
	        $eventsCallbacks[eventName] = [];
	      }
	
	      $eventsCallbacks[eventName].push(cb);
	    };
	
	    //Remueve un manejador de evento
	    thiz.$unbind = function (eventName, cb) {
	      $ngDbUtils.validate(arguments, ['string', 'function']);
	
	      if (!$eventsCallbacks[eventName]) return;
	
	      // Buscar el cb
	      var idx = $eventsCallbacks[eventName].indexOf(cb);
	
	      // Si se encontro el cb removerlo
	      if (idx != -1) {
	        $eventsCallbacks[eventName].splice(idx, 1);
	      }
	    };
	
	    // Dispara un evento
	    thiz.$trigger = function (eventName, args) {
	      $ngDbUtils.validate(arguments, ['string', 'object']);
	
	      $log.log($dbName + '.v' + ($dbVersion || 1) + ': ' + eventName);
	
	      for (var i in $eventsCallbacks[eventName]) {
	        $eventsCallbacks[eventName][i].apply(thiz, args);
	      }
	    };
	
	    // Callbacks para los errores
	    thiz.$error = function (cb) {
	      thiz.$bind($ngDbEvents.DB_ERROR, cb);
	      return thiz;
	    };
	
	    // Abrir una Base de datos.
	    thiz.$open = function () {
	      if ($opened) return $openDefered;
	
	      // Crear un nuevo defer
	      $opened = true;
	
	      // dejamos abierta nuestra base de datos
	      indexedDB.deleteDatabase($dbName).onsuccess = function () {
	
	        var request = indexedDB.open($dbName, $dbVersion);
	
	        request.onupgradeneeded = function (event) {
	          // Do something with request.result!
	          $upgradeNeededDefered.resolve(event, request);
	        };
	
	        // Asignar el manejador del resultado
	        request.onsuccess = function (event) {
	          // Do something with request.result!
	          $request = request;
	
	          // Asingar el manejador de errores a la BD
	          $request.onerror = function (event) {
	            $log.error('Database error: ' + event.target.errorCode);
	            thiz.$trigger($ngDbEvents.DB_ERROR, [event]);
	          };
	
	          $openDefered.resolve(event, request);
	        };
	
	        // Asignar el manejador de errores
	        // Do something with request.errorCode!
	        request.onerror = function (event) {
	          $openDefered.reject(request.errorCode);
	        };
	      };
	
	      return $openDefered;
	    };
	
	    // Agrega un nuevo modelo
	    thiz.$model = function (name) {
	      $ngDbUtils.validate(arguments, ['string']);
	
	      // Instanciar el modelo
	      var model = thiz.$models[name];
	
	      // Si no existe el modelo crear
	      if (!model) model = $iModel(thiz, name);
	
	      // Guardar el modelo en los modelos
	      thiz.$models[name] = model;
	
	      // Retornar el modelo
	      return model;
	    };
	
	    // Crea el objectStore para un model
	    thiz.$createStore = function (modelName, modelId) {
	      $ngDbUtils.validate(arguments, ['string', ['object', 'undefined']]);
	
	      $upgradeNeededDefered.promise.then(function (event, request) {
	        request.result.createObjectStore(modelName, modelId);
	      });
	    };
	
	    // Crea el objectStore para un model
	    thiz.$createIndex = function (modelName, indexName, fieldName, opts) {
	      $ngDbUtils.validate(arguments, ['string', 'string', 'string', ['object', 'undefined']]);
	
	      $upgradeNeededDefered.promise.then(function (event, request) {
	        var store = request.transaction.objectStore(modelName);
	        store.createIndex(indexName, fieldName, opts);
	      });
	    };
	
	    // Crea una transacción
	    thiz.$transaction = function (modelName, perms, action, cb) {
	      $ngDbUtils.validate(arguments, ['string', 'string', 'function', ['function', 'undefined']]);
	
	      var defered = $qs.defer(cb);
	
	      // Cuando se abra la BD
	      $openDefered.promise.then(function (event, request) {
	        var tx = request.result.transaction(modelName, perms);
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
	    thiz.$create = function (modelName, instance, cb) {
	      $ngDbUtils.validate(arguments, ['string', ['object', 'function'], ['function', 'undefined']]);
	
	      var defered = $qs.defer(cb);
	
	      // Se crea una transaccion
	      thiz.$transaction(modelName, 'readwrite', function (tx) {
	        var request = tx.objectStore(modelName).put(instance);
	
	        // Transaccion completada satisfatoriamente
	        request.onsuccess = function (event) {
	          defered.resolve(event, instance);
	        };
	
	        // Se generó un error en la transacción
	        request.onerror = function () {
	          // Could call request.preventDefault() to prevent the transaction from aborting.
	          defered.reject(request);
	        };
	      });
	    };
	
	    // Buscar en el modelo
	    thiz.$find = function (Model, modelName, scope, cb) {
	      $ngDbUtils.validate(arguments, ['function', 'string', ['object', 'undefined'], 'function']);
	
	      var defered = $qs.defer(cb);
	      var result = [];
	
	      // Se crea una transaccion
	      thiz.$transaction(modelName, 'readonly', function (tx) {
	        var store = tx.objectStore(modelName);
	        var request = store.openCursor();
	
	        request.onsuccess = function () {
	          var cursor = request.result;
	
	          // No more matching records.
	          if (!cursor) return defered.resolve(result);
	
	          // Called for each matching record.
	          result.push(Model.$get(cursor.value));
	          cursor.continue();
	        };
	      });
	    };
	
	    // Crear alias para los eventos enlazar callbacks a los eventos
	    var defereds = void 0;
	    Object.keys(defereds = {
	      $onOpen: $openDefered,
	      $onUpgradeNeeded: $upgradeNeededDefered
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
	        $ngDbUtils.validate(arguments, ['function']);
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
	
	iModelService.$inject = ["$qs", "$ngDbUtils"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = iModelService;
	function iModelService($qs, $ngDbUtils) {
	  'ngInject';
	
	  return function $iModel($db, $modelName) {
	    var thiz = this;
	    $ngDbUtils.validate(arguments, [null, 'string']);
	
	    // Clave del modelo
	    var $id = { keyPath: 'id', autoIncrement: true };
	    var $instances = {};
	
	    // Constuctor del modelo
	    function $Model(data) {
	      this.$setAttributes(data);
	      this.$constructor(data);
	    };
	
	    // Asigna el ID al modelo
	    $Model.$id = function ($pIid) {
	      $ngDbUtils.validate(arguments, ['object']);
	      $id = $pIid;
	      return $Model;
	    };
	
	    // Crea el objecto storage para el modelo.
	    $Model.$createStore = function () {
	      $db.$createStore($modelName, $id);
	      return $Model;
	    };
	
	    // Agrega un index
	    $Model.$index = function (indexName, fieldName, opts) {
	      $db.$createIndex($modelName, indexName, fieldName, opts);
	      return $Model;
	    };
	
	    // Método que permite modificar model.
	    $Model.$build = function (buildCallback) {
	      $ngDbUtils.validate(arguments, ['function']);
	      buildCallback($Model);
	      return $Model;
	    };
	
	    // Crea nuevas instancias de los modelos
	    $Model.$create = function (data, cb) {
	      $ngDbUtils.validate(arguments, ['object', ['function', 'undefined']]);
	
	      // Si es un array
	      if (data.length === undefined) {
	        var record = $Model.$get(data);
	        return record.$create(cb);
	      }
	
	      // Obtener una copia del array
	      var arr = Array.prototype.slice.call(data);
	      var result = [];
	      var defered = $qs.defer(cb);
	
	      (function iteration() {
	
	        // No quedan elementos en el array
	        if (arr.length == 0) return defered.resolve(result);
	
	        // Crear el siguiente elemento
	        $Model.$create(arr.shift(), function (err, instance) {
	          if (err) return defered.reject(err);
	          result.push(instance);
	          iteration();
	        });
	      })();
	
	      // Devolver el promise
	      return defered;
	    };
	
	    // Buscar un campo
	    $Model.searchDeepField = function (obj, field, cb) {
	      $ngDbUtils.validate(arguments, ['object', 'string', ['function', 'undefined']]);
	
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
	    $Model.$get = function (obj) {
	      $ngDbUtils.validate(arguments, ['object']);
	
	      // Obtener el key del objeto
	      var key = $Model.searchDeepField(obj, $id.keyPath, function (obj, lastField) {
	        return obj[lastField];
	      });
	
	      // El objeto no tiene ID
	      if (!key) return new $Model(obj);
	
	      // No existe la instancia entonce se crea
	      if (!$instances[key]) $instances[key] = new $Model(obj);
	
	      return $instances[key];
	    };
	
	    // Buscar en el modelo
	    $Model.$find = function (scope, cb) {
	      var args = Array.prototype.slice.call(arguments);
	      cb = args.pop();scope = args.pop();
	      return $db.$find($Model, $modelName, scope, cb);
	    };
	
	    // Asigna los atributos
	    $Model.prototype.$setAttributes = function (data) {
	      var thiz = this;
	      $ngDbUtils.validate(arguments, ['object']);
	
	      Object.keys(data).map(function (property) {
	        thiz.$set(property, data[property]);
	      });
	    };
	
	    // Devuelve el valor de una propiedad
	    $Model.prototype.$get = function (field) {
	      var thiz = this;
	      return $Model.searchDeepField(thiz, field, function (obj, lastField) {
	        return obj[lastField];
	      });
	    };
	
	    // Asigna in valor a un campo
	    $Model.prototype.$set = function (field, value) {
	      var thiz = this;
	      return $Model.searchDeepField(thiz, field, function (obj, lastField) {
	        obj[lastField] = value;
	        return thiz;
	      });
	    };
	
	    // Consturctor que se puede sobre escribir
	    $Model.prototype.$constructor = function (data) {};
	
	    // Guarda los datos del objeto
	    $Model.prototype.$create = function (cb) {
	      var thiz = this;
	      return $db.$create($modelName, this, function (err, event) {
	        if (err) {
	          if (cb) cb(err);return;
	        };
	
	        // Asignar el generado al modelo
	        thiz.$set($id.keyPath, event.target.result);
	
	        // Guardar la instancia en la colecion de instancias
	        $instances[thiz.$get($id.keyPath)] = thiz;
	
	        if (cb) cb.apply(null, [null].concat(Array.prototype.slice.call(arguments)));
	      });
	    };
	
	    return $Model;
	  };
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWQ1ZjNmZGVmY2FiNTlmYjU3NDUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy9uZ0RiVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL25nRGJVdGlscy5qcz9jMWEzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2V2ZW50cy5qcz81NzA0Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9xcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcXMuanM/NjQzOSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaURiLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pRGIuanM/MDUwMiIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaU1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pTW9kZWwuanM/ZTFjYyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29uc3RhbnQiLCJzZXJ2aWNlIiwibmdEYlV0aWxzIiwiJHEiLCJpc0NhbGxiYWNrIiwiY2IiLCJ0aHJvd0Vycm9yIiwidW5kZWZpbmVkIiwibXVzdEJlQ2FsbGJhY2siLCJlcnIiLCJFcnJvciIsIm5hbWUiLCJtdXN0QmUiLCJ2YWx1ZSIsInR5cGVzIiwiaSIsImpvaW4iLCJ2YWxpZGF0ZSIsImFyZ3MiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsInZhbHVlcyIsIkRCX0VSUk9SIiwicXMiLCJxc0NsYXNzIiwidGhpeiIsInRoZW5zIiwidGhlbnNSZWFkeSIsImNhdGNocyIsImNhdGNoc1JlYWR5IiwicmVzdWx0QXJncyIsImVycm9yIiwicHJvbWlzZSIsIiRyZXNvbHZlZCIsInRoZW5zUmVzb2x2ZWQiLCJsZW5ndGgiLCJzaGlmdCIsImFwcGx5IiwicHVzaCIsImNhdGNoc1Jlc29sdmVkIiwicmVzb2x2ZSIsImFyZ3VtZW50cyIsInJlamVjdCIsInRoZW4iLCJjYXRjaCIsImRvbmUiLCJjb25jYXQiLCJkZWZlciIsImlEYlNlcnZpY2UiLCIkcXMiLCIkaU1vZGVsIiwiJG5nRGJVdGlscyIsIiRuZ0RiRXZlbnRzIiwiJGxvZyIsImluZGV4ZWREQiIsIndpbmRvdyIsIm1vekluZGV4ZWREQiIsIndlYmtpdEluZGV4ZWREQiIsIm1zSW5kZXhlZERCIiwiSURCVHJhbnNhY3Rpb24iLCJ3ZWJraXRJREJUcmFuc2FjdGlvbiIsIm1zSURCVHJhbnNhY3Rpb24iLCJJREJLZXlSYW5nZSIsIndlYmtpdElEQktleVJhbmdlIiwibXNJREJLZXlSYW5nZSIsImFsZXJ0IiwiJGlEYiIsIiRkYk5hbWUiLCIkZGJWZXJzaW9uIiwiJGV2ZW50c0NhbGxiYWNrcyIsIiR1cGdyYWRlTmVlZGVkRGVmZXJlZCIsIiRvcGVuRGVmZXJlZCIsIiRvcGVuZWQiLCIkcmVxdWVzdCIsIiRtb2RlbHMiLCIkYmluZCIsImV2ZW50TmFtZSIsIiR1bmJpbmQiLCJpZHgiLCJpbmRleE9mIiwic3BsaWNlIiwiJHRyaWdnZXIiLCJsb2ciLCIkZXJyb3IiLCIkb3BlbiIsImRlbGV0ZURhdGFiYXNlIiwib25zdWNjZXNzIiwicmVxdWVzdCIsIm9wZW4iLCJvbnVwZ3JhZGVuZWVkZWQiLCJldmVudCIsIm9uZXJyb3IiLCJ0YXJnZXQiLCJlcnJvckNvZGUiLCIkbW9kZWwiLCJtb2RlbCIsIiRjcmVhdGVTdG9yZSIsIm1vZGVsTmFtZSIsIm1vZGVsSWQiLCJyZXN1bHQiLCJjcmVhdGVPYmplY3RTdG9yZSIsIiRjcmVhdGVJbmRleCIsImluZGV4TmFtZSIsImZpZWxkTmFtZSIsIm9wdHMiLCJzdG9yZSIsInRyYW5zYWN0aW9uIiwib2JqZWN0U3RvcmUiLCJjcmVhdGVJbmRleCIsIiR0cmFuc2FjdGlvbiIsInBlcm1zIiwiYWN0aW9uIiwiZGVmZXJlZCIsInR4Iiwib25jb21wbGV0ZSIsIm9uYWJvcnQiLCIkY3JlYXRlIiwiaW5zdGFuY2UiLCJwdXQiLCIkZmluZCIsIk1vZGVsIiwic2NvcGUiLCJvcGVuQ3Vyc29yIiwiY3Vyc29yIiwiJGdldCIsImNvbnRpbnVlIiwiZGVmZXJlZHMiLCJPYmplY3QiLCJrZXlzIiwiJG9uT3BlbiIsIiRvblVwZ3JhZGVOZWVkZWQiLCJtYXAiLCJrZXkiLCJ0ZXh0IiwiaU1vZGVsU2VydmljZSIsIiRkYiIsIiRtb2RlbE5hbWUiLCIkaWQiLCJrZXlQYXRoIiwiYXV0b0luY3JlbWVudCIsIiRpbnN0YW5jZXMiLCIkTW9kZWwiLCJkYXRhIiwiJHNldEF0dHJpYnV0ZXMiLCIkY29uc3RydWN0b3IiLCIkcElpZCIsIiRpbmRleCIsIiRidWlsZCIsImJ1aWxkQ2FsbGJhY2siLCJyZWNvcmQiLCJhcnIiLCJpdGVyYXRpb24iLCJzZWFyY2hEZWVwRmllbGQiLCJvYmoiLCJmaWVsZCIsImZpZWxkcyIsInNwbGl0IiwibGFzdEZpZWxkIiwicG9wIiwiX3NldCIsInByb3BlcnR5IiwiJHNldCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FBRUE7O0FDRUEsS0FBSSxjQUFjLHVCQUF1Qjs7QUREekM7O0FDS0EsS0FBSSxXQUFXLHVCQUF1Qjs7QURKdEM7O0FDUUEsS0FBSSxPQUFPLHVCQUF1Qjs7QURObEM7O0FDVUEsS0FBSSxRQUFRLHVCQUF1Qjs7QURUbkM7O0FDYUEsS0FBSSxXQUFXLHVCQUF1Qjs7QUFFdEMsVUFBUyx1QkFBdUIsS0FBSyxFQUFFLE9BQU8sT0FBTyxJQUFJLGFBQWEsTUFBTSxFQUFFLFNBQVM7O0FEYnZGQSxTQUFRQyxPQUFPLFFBQVEs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QUFVa0csVUFBVSxVQUFVakgsSUFBRztPQUFFLElBQUlzQixPQUFPO09BQ25ELE9BQU84RyxJQUFJbkIsUUFBUW9CLFlBQVksTUFBTSxVQUFVakksS0FBS21GLE9BQU87U0FDekQsSUFBSW5GLEtBQUs7V0FBRSxJQUFJSixJQUFJQSxHQUFHSSxLQUFNO1VBQVM7OztTQUdyQ2tCLEtBQUt3SSxLQUFLeEIsSUFBSUMsU0FBU2hELE1BQU1FLE9BQU9POzs7U0FHcEN5QyxXQUFXbkgsS0FBS21HLEtBQUthLElBQUlDLFlBQVlqSDs7U0FFckMsSUFBSXRCLElBQUlBLEdBQUdrQyxNQUFNLE1BQU0sQ0FBQyxNQUFNUyxPQUFPN0IsTUFBTUMsVUFBVUMsTUFBTUMsS0FBS3FCOzs7O0tBS3BFLE9BQU9vRyIsImZpbGUiOiJuZy1kYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZWQ1ZjNmZGVmY2FiNTlmYjU3NDVcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgbmdEYlV0aWxzIGZyb20gJy4vdXRpbHMvbmdEYlV0aWxzJztcclxuaW1wb3J0IG5nRGJFdmVudHMgZnJvbSAnLi91dGlscy9ldmVudHMnO1xyXG5pbXBvcnQgcXMgZnJvbSAnLi91dGlscy9xcyc7XHJcblxyXG5pbXBvcnQgaURiIGZyb20gJy4vc2VydmljZXMvaURiJztcclxuaW1wb3J0IGlNb2RlbCBmcm9tICcuL3NlcnZpY2VzL2lNb2RlbCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbmdEYicsIFtdKVxyXG4gIC5jb25zdGFudCgnTkdfREJfVkVSU0lPTicsICcwLjAuMScpXHJcbiAgLnNlcnZpY2UoJyRuZ0RiRXZlbnRzJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmdEYkV2ZW50czsgfSlcclxuICAuc2VydmljZSgnJG5nRGJVdGlscycsIG5nRGJVdGlscylcclxuICAuc2VydmljZSgnJHFzJywgcXMpXHJcbiAgLnNlcnZpY2UoJyRpRGInLCBpRGIpXHJcbiAgLnNlcnZpY2UoJyRpTW9kZWwnLCBpTW9kZWwpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9uZ0RiVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzL25nRGJVdGlscycpO1xuXG52YXIgX25nRGJVdGlsczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9uZ0RiVXRpbHMpO1xuXG52YXIgX2V2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyk7XG5cbnZhciBfZXZlbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V2ZW50cyk7XG5cbnZhciBfcXMgPSByZXF1aXJlKCcuL3V0aWxzL3FzJyk7XG5cbnZhciBfcXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcXMpO1xuXG52YXIgX2lEYiA9IHJlcXVpcmUoJy4vc2VydmljZXMvaURiJyk7XG5cbnZhciBfaURiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lEYik7XG5cbnZhciBfaU1vZGVsID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pTW9kZWwnKTtcblxudmFyIF9pTW9kZWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaU1vZGVsKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuYW5ndWxhci5tb2R1bGUoJ25nRGInLCBbXSkuY29uc3RhbnQoJ05HX0RCX1ZFUlNJT04nLCAnMC4wLjEnKS5zZXJ2aWNlKCckbmdEYkV2ZW50cycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIF9ldmVudHMyLmRlZmF1bHQ7XG59KS5zZXJ2aWNlKCckbmdEYlV0aWxzJywgX25nRGJVdGlsczIuZGVmYXVsdCkuc2VydmljZSgnJHFzJywgX3FzMi5kZWZhdWx0KS5zZXJ2aWNlKCckaURiJywgX2lEYjIuZGVmYXVsdCkuc2VydmljZSgnJGlNb2RlbCcsIF9pTW9kZWwyLmRlZmF1bHQpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbmdEYlV0aWxzICgkcSkgeyAnbmdJbmplY3QnXHJcblxyXG4gIC8vIEZ1bmNpb24gcGFyYSBkZXRlcm1pbmFyIHNpIGVzIHVuIGNhbGxiYWNrIHbDoWxpZG8gbyBub1xyXG4gIGZ1bmN0aW9uIGlzQ2FsbGJhY2sgKGNiLCB0aHJvd0Vycm9yKSB7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBjYiA9PSAnZnVuY3Rpb24nIHx8IGNiID09IG51bGwgfHwgY2IgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIFNpIGVsIGNhbGxiYWNrIG5vIGVzIHbDoWxpZG8gbGFuemEgdW4gZXJycG9yXHJcbiAgZnVuY3Rpb24gbXVzdEJlQ2FsbGJhY2sgKGNiKSB7XHJcbiAgICBpZiAoaXNDYWxsYmFjayhjYikpIHJldHVybjtcclxuXHJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIGNhbGxiYWNrJyk7XHJcbiAgICBlcnIubmFtZSA9ICdJbnZhbGlkQ2FsbGJhY2snXHJcblxyXG4gICAgdGhyb3cgZXJyO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIEdlbmVyYSB1biBlcnJvciBzaSBlbCB2YWxvciBubyBlcyBkZWwgdGlwbyBpbmRpY2FkbyBwb3IgcGFyYW1ldHJvXHJcbiAgZnVuY3Rpb24gbXVzdEJlICh2YWx1ZSwgdHlwZXMpIHtcclxuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcclxuICAgIGZvcih2YXIgaSBpbiB0eXBlcyl7XHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gdHlwZXNbaV0pIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWU6ICcrdmFsdWUrJyBtdXN0IGJlICcrdHlwZXMuam9pbignIG9yICcpKTtcclxuICAgIGVyci5uYW1lID0gJ0ludmFsaWRWYWx1ZSdcclxuICAgIHRocm93IGVycjtcclxuXHJcbiAgfVxyXG5cclxuICAvLyBWYWxpZGEgdW4gYXJyYXkgZGUgYXJndW1lbnRvcyBjb24gdW4gYXJyYSBkZSB0aXBvc1xyXG4gIGZ1bmN0aW9uIHZhbGlkYXRlIChhcmdzLCB0eXBlcykge1xyXG5cclxuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcclxuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcclxuICAgIGZvciAodmFyIGkgaW4gYXJncyl7XHJcbiAgICAgIGlmICh0eXBlc1tpXSl7XHJcbiAgICAgICAgaWYgKHR5cGVzW2ldID09IG51bGwpe1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdHlwZXNbaV0gPT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGVzW2ldID09ICdvYmplY3QnKXtcclxuICAgICAgICAgIG11c3RCZShhcmdzW2ldLCB0eXBlc1tpXSk7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0eXBlc1tpXSA9PSAnZnVuY2lvbicpe1xyXG4gICAgICAgICAgdHlwZXNbaV0oYXJnc1tpXSk7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsaWRhdG9yIHRvOiAnK3ZhbHVlc1tpXSsnIG11c3QgYmUgJyt0eXBlc1tpXSk7XHJcbiAgICAgICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbGlkYXRvcidcclxuICAgICAgICB0aHJvdyBlcnI7XHJcblxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGlzQ2FsbGJhY2s6IGlzQ2FsbGJhY2ssXHJcbiAgICBtdXN0QmVDYWxsYmFjazogbXVzdEJlQ2FsbGJhY2ssXHJcbiAgICBtdXN0QmU6IG11c3RCZSxcclxuICAgIHZhbGlkYXRlOiB2YWxpZGF0ZSxcclxuICB9O1xyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL25nRGJVdGlscy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBuZ0RiVXRpbHM7XG5mdW5jdGlvbiBuZ0RiVXRpbHMoJHEpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyBGdW5jaW9uIHBhcmEgZGV0ZXJtaW5hciBzaSBlcyB1biBjYWxsYmFjayB2w6FsaWRvIG8gbm9cblxuICBmdW5jdGlvbiBpc0NhbGxiYWNrKGNiLCB0aHJvd0Vycm9yKSB7XG5cbiAgICBpZiAodHlwZW9mIGNiID09ICdmdW5jdGlvbicgfHwgY2IgPT0gbnVsbCB8fCBjYiA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFNpIGVsIGNhbGxiYWNrIG5vIGVzIHbDoWxpZG8gbGFuemEgdW4gZXJycG9yXG4gIGZ1bmN0aW9uIG11c3RCZUNhbGxiYWNrKGNiKSB7XG4gICAgaWYgKGlzQ2FsbGJhY2soY2IpKSByZXR1cm47XG5cbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIGNhbGxiYWNrJyk7XG4gICAgZXJyLm5hbWUgPSAnSW52YWxpZENhbGxiYWNrJztcblxuICAgIHRocm93IGVycjtcbiAgfVxuXG4gIC8vIEdlbmVyYSB1biBlcnJvciBzaSBlbCB2YWxvciBubyBlcyBkZWwgdGlwbyBpbmRpY2FkbyBwb3IgcGFyYW1ldHJvXG4gIGZ1bmN0aW9uIG11c3RCZSh2YWx1ZSwgdHlwZXMpIHtcbiAgICBpZiAodHlwZW9mIHR5cGVzID09ICdzdHJpbmcnKSB0eXBlcyA9IFt0eXBlc107XG4gICAgZm9yICh2YXIgaSBpbiB0eXBlcykge1xuICAgICAgaWYgKCh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgPT0gdHlwZXNbaV0pIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZTogJyArIHZhbHVlICsgJyBtdXN0IGJlICcgKyB0eXBlcy5qb2luKCcgb3IgJykpO1xuICAgIGVyci5uYW1lID0gJ0ludmFsaWRWYWx1ZSc7XG4gICAgdGhyb3cgZXJyO1xuICB9XG5cbiAgLy8gVmFsaWRhIHVuIGFycmF5IGRlIGFyZ3VtZW50b3MgY29uIHVuIGFycmEgZGUgdGlwb3NcbiAgZnVuY3Rpb24gdmFsaWRhdGUoYXJncywgdHlwZXMpIHtcblxuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcbiAgICBpZiAodHlwZW9mIHR5cGVzID09ICdzdHJpbmcnKSB0eXBlcyA9IFt0eXBlc107XG4gICAgZm9yICh2YXIgaSBpbiBhcmdzKSB7XG4gICAgICBpZiAodHlwZXNbaV0pIHtcbiAgICAgICAgaWYgKHR5cGVzW2ldID09IG51bGwpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHR5cGVzW2ldID09ICdzdHJpbmcnIHx8IF90eXBlb2YodHlwZXNbaV0pID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgbXVzdEJlKGFyZ3NbaV0sIHR5cGVzW2ldKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHR5cGVzW2ldID09ICdmdW5jaW9uJykge1xuICAgICAgICAgIHR5cGVzW2ldKGFyZ3NbaV0pO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWxpZGF0b3IgdG86ICcgKyB2YWx1ZXNbaV0gKyAnIG11c3QgYmUgJyArIHR5cGVzW2ldKTtcbiAgICAgICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbGlkYXRvcic7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGlzQ2FsbGJhY2s6IGlzQ2FsbGJhY2ssXG4gICAgbXVzdEJlQ2FsbGJhY2s6IG11c3RCZUNhbGxiYWNrLFxuICAgIG11c3RCZTogbXVzdEJlLFxuICAgIHZhbGlkYXRlOiB2YWxpZGF0ZVxuICB9O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL25nRGJVdGlscy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIE5vbWJyZSBkZSBsb3MgZXZlbnRvc1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgREJfRVJST1I6ICdjYi5lcnJvcicsXHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvZXZlbnRzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBOb21icmUgZGUgbG9zIGV2ZW50b3NcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgREJfRVJST1I6ICdjYi5lcnJvcidcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvZXZlbnRzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcXMgKCkgeyAnbmdJbmplY3QnXHJcbiAgXHJcbiAgZnVuY3Rpb24gcXNDbGFzcyAoY2IpIHsgbGV0IHRoaXogPSB0aGlzO1xyXG4gICAgXHJcbiAgICBsZXQgdGhlbnMgPSBbXTtcclxuICAgIGxldCB0aGVuc1JlYWR5ID0gW107XHJcbiAgICBsZXQgY2F0Y2hzID0gW107XHJcbiAgICBsZXQgY2F0Y2hzUmVhZHkgPSBbXTtcclxuICAgIGxldCByZXN1bHRBcmdzID0gbnVsbDtcclxuICAgIGxldCBlcnJvciA9IG51bGw7XHJcblxyXG4gICAgdGhpei5wcm9taXNlID0ge307XHJcbiAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRoZW5zUmVzb2x2ZWQgKCkge1xyXG4gICAgICBpZiAoIXRoZW5zLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICBsZXQgY2IgPSB0aGVucy5zaGlmdCgpO1xyXG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LnJlc3VsdEFyZ3MpO1xyXG4gICAgICB0aGVuc1JlYWR5LnB1c2goY2IpO1xyXG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2F0Y2hzUmVzb2x2ZWQgKCkge1xyXG4gICAgICBpZiAoIWNhdGNocy5sZW5ndGgpIHJldHVybjtcclxuICAgICAgbGV0IGNiID0gY2F0Y2hzLnNoaWZ0KCk7XHJcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xyXG4gICAgICBjYXRjaHNSZWFkeS5wdXNoKGNiKTtcclxuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGl6LnJlc29sdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xyXG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgIHRoaXoucmVzdWx0QXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5yZWplY3QgPSBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xyXG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgIHRoaXouZXJyb3IgPSBlcnIgfHwge307XHJcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucHJvbWlzZS50aGVuID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIHRoZW5zLnB1c2goY2IpO1xyXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQgJiYgIXRoaXouZXJyb3IpIHtcclxuICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXoucHJvbWlzZS5jYXRjaCA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICBjYXRjaHMucHVzaChjYik7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiB0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpejtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLmRvbmUgPSBmdW5jdGlvbiAoY2IpIHtcclxuXHJcbiAgICAgIHRoZW5zLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQodGhpei5yZXN1bHRBcmdzKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY2F0Y2hzLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkge1xyXG4gICAgICAgIGlmICghdGhpei5lcnJvcikge1xyXG4gICAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpejtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGlmKGNiKSB0aGl6LnByb21pc2UuZG9uZShjYik7XHJcblxyXG4gIH07XHJcblxyXG4gIC8vIENyZWEgdW5hIGluc3RhbmNpYSBkZWwgZGVmZXJlZFxyXG4gIHFzQ2xhc3MuZGVmZXIgPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgIHJldHVybiBuZXcgcXNDbGFzcyhjYik7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHFzQ2xhc3M7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvcXMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBxcztcbmZ1bmN0aW9uIHFzKCkge1xuICAnbmdJbmplY3QnO1xuXG4gIGZ1bmN0aW9uIHFzQ2xhc3MoY2IpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICB2YXIgdGhlbnMgPSBbXTtcbiAgICB2YXIgdGhlbnNSZWFkeSA9IFtdO1xuICAgIHZhciBjYXRjaHMgPSBbXTtcbiAgICB2YXIgY2F0Y2hzUmVhZHkgPSBbXTtcbiAgICB2YXIgcmVzdWx0QXJncyA9IG51bGw7XG4gICAgdmFyIGVycm9yID0gbnVsbDtcblxuICAgIHRoaXoucHJvbWlzZSA9IHt9O1xuICAgIHRoaXouJHJlc29sdmVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiB0aGVuc1Jlc29sdmVkKCkge1xuICAgICAgaWYgKCF0aGVucy5sZW5ndGgpIHJldHVybjtcbiAgICAgIHZhciBjYiA9IHRoZW5zLnNoaWZ0KCk7XG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LnJlc3VsdEFyZ3MpO1xuICAgICAgdGhlbnNSZWFkeS5wdXNoKGNiKTtcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYXRjaHNSZXNvbHZlZCgpIHtcbiAgICAgIGlmICghY2F0Y2hzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgdmFyIGNiID0gY2F0Y2hzLnNoaWZ0KCk7XG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcbiAgICAgIGNhdGNoc1JlYWR5LnB1c2goY2IpO1xuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICB9XG5cbiAgICB0aGl6LnJlc29sdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgIHRoaXoucmVzdWx0QXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgfTtcblxuICAgIHRoaXoucmVqZWN0ID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICB0aGl6LmVycm9yID0gZXJyIHx8IHt9O1xuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICB9O1xuXG4gICAgdGhpei5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHRoZW5zLnB1c2goY2IpO1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmICF0aGl6LmVycm9yKSB7XG4gICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH07XG5cbiAgICB0aGl6LnByb21pc2UuY2F0Y2ggPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIGNhdGNocy5wdXNoKGNiKTtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiB0aGl6LmVycm9yKSB7XG4gICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgdGhpei5wcm9taXNlLmRvbmUgPSBmdW5jdGlvbiAoY2IpIHtcblxuICAgICAgdGhlbnMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQodGhpei5yZXN1bHRBcmdzKSk7XG4gICAgICB9KTtcblxuICAgICAgY2F0Y2hzLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHtcbiAgICAgICAgaWYgKCF0aGl6LmVycm9yKSB7XG4gICAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIGlmIChjYikgdGhpei5wcm9taXNlLmRvbmUoY2IpO1xuICB9O1xuXG4gIC8vIENyZWEgdW5hIGluc3RhbmNpYSBkZWwgZGVmZXJlZFxuICBxc0NsYXNzLmRlZmVyID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgcmV0dXJuIG5ldyBxc0NsYXNzKGNiKTtcbiAgfTtcblxuICByZXR1cm4gcXNDbGFzcztcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9xcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpRGJTZXJ2aWNlICgkcXMsICRpTW9kZWwsICRuZ0RiVXRpbHMsICRuZ0RiRXZlbnRzLCAkbG9nKSB7ICduZ0luamVjdCc7XHJcblxyXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cclxuICBjb25zdCBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XHJcbiAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxyXG4gIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxyXG4gIGNvbnN0IElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcclxuICBjb25zdCBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XHJcbiAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcclxuICBcclxuICBpZiAoIWluZGV4ZWREQikge1xyXG4gICAgYWxlcnQoXCJTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXNcIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICAvLyBDbGFzZSBwYXJhIGxhIGNyZWFjacOzbiBkZSBpbnN0YW5jaWFzIGRlIGxhIEJEXHJcbiAgcmV0dXJuIGZ1bmN0aW9uICRpRGIoJGRiTmFtZSwgJGRiVmVyc2lvbikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdudW1iZXInXSk7XHJcblxyXG4gICAgLy8gTWFuZWphZG9yZXMgZGUgZXZlbnRvcy5cclxuICAgIGxldCAkZXZlbnRzQ2FsbGJhY2tzID0ge307XHJcbiAgICBsZXQgJHVwZ3JhZGVOZWVkZWREZWZlcmVkID0gJHFzLmRlZmVyKCk7XHJcbiAgICBsZXQgJG9wZW5EZWZlcmVkID0gJHFzLmRlZmVyKCk7XHJcbiAgICBsZXQgJG9wZW5lZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIEluc3RhbmNpYSBkZSBsYSBiYXNlIGRlIGRhdG9zO1xyXG4gICAgbGV0ICRyZXF1ZXN0ID0gbnVsbDtcclxuICAgIHRoaXouJG1vZGVscyA9IHt9O1xyXG4gICAgXHJcbiAgICAvLyBBZ3JlZ2FyIHVuIG1hbmVqYWRvciBkZSBldmVudG9cclxuICAgIHRoaXouJGJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xyXG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSl7XHJcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdID0gW107XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5wdXNoKGNiKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vUmVtdWV2ZSB1biBtYW5lamFkb3IgZGUgZXZlbnRvXHJcbiAgICB0aGl6LiR1bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xyXG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkgcmV0dXJuO1xyXG5cclxuICAgICAgLy8gQnVzY2FyIGVsIGNiXHJcbiAgICAgIGNvbnN0IGlkeCA9ICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5pbmRleE9mKGNiKTtcclxuXHJcbiAgICAgIC8vIFNpIHNlIGVuY29udHJvIGVsIGNiIHJlbW92ZXJsb1xyXG4gICAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXHJcbiAgICB0aGl6LiR0cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xyXG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0J10pO1xyXG5cclxuICAgICAgJGxvZy5sb2coJGRiTmFtZSsnLnYnKygkZGJWZXJzaW9ufHwxKSsnOiAnK2V2ZW50TmFtZSk7XHJcblxyXG4gICAgICBmb3IobGV0IGkgaW4gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKXtcclxuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpeiwgYXJncyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENhbGxiYWNrcyBwYXJhIGxvcyBlcnJvcmVzXHJcbiAgICB0aGl6LiRlcnJvciA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICB0aGl6LiRiaW5kKCRuZ0RiRXZlbnRzLkRCX0VSUk9SLCBjYik7XHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBYnJpciB1bmEgQmFzZSBkZSBkYXRvcy5cclxuICAgIHRoaXouJG9wZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICgkb3BlbmVkKSByZXR1cm4gJG9wZW5EZWZlcmVkO1xyXG5cclxuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gZGVmZXJcclxuICAgICAgJG9wZW5lZCA9IHRydWU7XHJcblxyXG4gICAgICAvLyBkZWphbW9zIGFiaWVydGEgbnVlc3RyYSBiYXNlIGRlIGRhdG9zXHJcbiAgICAgIGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZSgkZGJOYW1lKS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIub3BlbigkZGJOYW1lLCAkZGJWZXJzaW9uKTtcclxuXHJcbiAgICAgICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJlcXVlc3QucmVzdWx0IVxyXG4gICAgICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJlcXVlc3QpO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZWwgcmVzdWx0YWRvXHJcbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJlcXVlc3QucmVzdWx0IVxyXG4gICAgICAgICAgJHJlcXVlc3QgPSByZXF1ZXN0O1xyXG5cclxuICAgICAgICAgIC8vIEFzaW5nYXIgZWwgbWFuZWphZG9yIGRlIGVycm9yZXMgYSBsYSBCRFxyXG4gICAgICAgICAgJHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAkbG9nLmVycm9yKCdEYXRhYmFzZSBlcnJvcjogJysgZXZlbnQudGFyZ2V0LmVycm9yQ29kZSk7XHJcbiAgICAgICAgICAgIHRoaXouJHRyaWdnZXIoJG5nRGJFdmVudHMuREJfRVJST1IsIFtldmVudF0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZXNvbHZlKGV2ZW50LCByZXF1ZXN0KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGUgZXJyb3Jlc1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcmVxdWVzdC5lcnJvckNvZGUhXHJcbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAkb3BlbkRlZmVyZWQucmVqZWN0KHJlcXVlc3QuZXJyb3JDb2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmV0dXJuICRvcGVuRGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBudWV2byBtb2RlbG9cclxuICAgIHRoaXouJG1vZGVsID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJ10pO1xyXG5cclxuICAgICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG9cclxuICAgICAgbGV0IG1vZGVsID0gdGhpei4kbW9kZWxzW25hbWVdO1xyXG5cclxuICAgICAgLy8gU2kgbm8gZXhpc3RlIGVsIG1vZGVsbyBjcmVhclxyXG4gICAgICBpZighbW9kZWwpXHJcbiAgICAgICAgbW9kZWwgPSAkaU1vZGVsKHRoaXosIG5hbWUpO1xyXG5cclxuICAgICAgLy8gR3VhcmRhciBlbCBtb2RlbG8gZW4gbG9zIG1vZGVsb3NcclxuICAgICAgdGhpei4kbW9kZWxzW25hbWVdID0gbW9kZWw7XHJcblxyXG4gICAgICAvLyBSZXRvcm5hciBlbCBtb2RlbG9cclxuICAgICAgcmV0dXJuIG1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXHJcbiAgICB0aGl6LiRjcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIG1vZGVsSWQpIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCByZXF1ZXN0KSB7XHJcbiAgICAgICAgcmVxdWVzdC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUobW9kZWxOYW1lLCBtb2RlbElkKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcclxuICAgIHRoaXouJGNyZWF0ZUluZGV4ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJlcXVlc3QpIHtcclxuICAgICAgICBsZXQgc3RvcmUgPSByZXF1ZXN0LnRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XHJcbiAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgdW5hIHRyYW5zYWNjacOzblxyXG4gICAgdGhpei4kdHJhbnNhY3Rpb24gPSBmdW5jdGlvbihtb2RlbE5hbWUsIHBlcm1zLCBhY3Rpb24sIGNiKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnZnVuY3Rpb24nLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICBsZXQgZGVmZXJlZCA9ICRxcy5kZWZlcihjYik7XHJcblxyXG4gICAgICAvLyBDdWFuZG8gc2UgYWJyYSBsYSBCRFxyXG4gICAgICAkb3BlbkRlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcmVxdWVzdCkge1xyXG4gICAgICAgIGxldCB0eCA9IHJlcXVlc3QucmVzdWx0LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgcGVybXMpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBhY3Rpb24odHgpO1xyXG5cclxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXHJcbiAgICAgICAgdHgub25jb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCByZXN1bHQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXHJcbiAgICAgICAgdHgub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KHR4LmVycm9yKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEluc2VydGEgdW4gcmVnaXN0cm8gZW4gZWwgbW9kZWxvXHJcbiAgICB0aGl6LiRjcmVhdGUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbnN0YW5jZSwgY2IpIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAnZnVuY3Rpb24nXSwgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgbGV0IGRlZmVyZWQgPSAkcXMuZGVmZXIoY2IpO1xyXG5cclxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cclxuICAgICAgdGhpei4kdHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZHdyaXRlJywgZnVuY3Rpb24gKHR4KSB7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLnB1dChpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyAgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCwgaW5zdGFuY2UpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXHJcbiAgICAgICAgcmVxdWVzdC5vbmVycm9yICA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIC8vIENvdWxkIGNhbGwgcmVxdWVzdC5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChyZXF1ZXN0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBCdXNjYXIgZW4gZWwgbW9kZWxvXHJcbiAgICB0aGl6LiRmaW5kID0gZnVuY3Rpb24gKE1vZGVsLCBtb2RlbE5hbWUsIHNjb3BlLCBjYikge1xyXG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbicsICdzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgbGV0IGRlZmVyZWQgPSAkcXMuZGVmZXIoY2IpO1xyXG4gICAgICBsZXQgcmVzdWx0ID0gW107XHJcblxyXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxyXG4gICAgICB0aGl6LiR0cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xyXG4gICAgICAgIGxldCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBzdG9yZS5vcGVuQ3Vyc29yKCk7XHJcblxyXG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBsZXQgY3Vyc29yID0gcmVxdWVzdC5yZXN1bHQ7XHJcblxyXG4gICAgICAgICAgLy8gTm8gbW9yZSBtYXRjaGluZyByZWNvcmRzLlxyXG4gICAgICAgICAgaWYgKCFjdXJzb3IpIHJldHVybiBkZWZlcmVkLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gQ2FsbGVkIGZvciBlYWNoIG1hdGNoaW5nIHJlY29yZC5cclxuICAgICAgICAgIHJlc3VsdC5wdXNoKE1vZGVsLiRnZXQoY3Vyc29yLnZhbHVlKSk7XHJcbiAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYXIgYWxpYXMgcGFyYSBsb3MgZXZlbnRvcyBlbmxhemFyIGNhbGxiYWNrcyBhIGxvcyBldmVudG9zXHJcbiAgICBsZXQgZGVmZXJlZHM7XHJcbiAgICBPYmplY3Qua2V5cyhkZWZlcmVkcyA9IHtcclxuICAgICAgJG9uT3BlbjogJG9wZW5EZWZlcmVkLFxyXG4gICAgICAkb25VcGdyYWRlTmVlZGVkOiAkdXBncmFkZU5lZWRlZERlZmVyZWQsXHJcbiAgICB9KS5tYXAoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgbGV0IHRleHQgPSAkZGJOYW1lKycudicrKCRkYlZlcnNpb258fDEpKyc6ICcra2V5O1xyXG4gICAgICAgIGlmIChlcnIpe1xyXG4gICAgICAgICAgJGxvZy5lcnJvcih0ZXh0LCBlcnIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkbG9nLmxvZyh0ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGl6W2tleV0gPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcclxuICAgICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShjYik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgfTtcclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaURiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlEYlNlcnZpY2U7XG5mdW5jdGlvbiBpRGJTZXJ2aWNlKCRxcywgJGlNb2RlbCwgJG5nRGJVdGlscywgJG5nRGJFdmVudHMsICRsb2cpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyBFbiBsYSBzaWd1aWVudGUgbGluZWEsIHB1ZWRlIGluY2x1aXIgcHJlZmlqb3MgZGUgaW1wbGVtZW50YWNpb24gcXVlIHF1aWVyYSBwcm9iYXIuXG5cbiAgdmFyIGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQjtcbiAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxuICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcbiAgdmFyIElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcbiAgdmFyIElEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcbiAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcblxuICBpZiAoIWluZGV4ZWREQikge1xuICAgIGFsZXJ0KFwiU3UgbmF2ZWdhZG9yIG5vIHNvcG9ydGEgdW5hIHZlcnNpw7NuIGVzdGFibGUgZGUgaW5kZXhlZERCLiBUYWwgeSBjb21vIGxhcyBjYXJhY3RlcsOtc3RpY2FzIG5vIHNlcsOhbiB2YWxpZGFzXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIENsYXNlIHBhcmEgbGEgY3JlYWNpw7NuIGRlIGluc3RhbmNpYXMgZGUgbGEgQkRcbiAgcmV0dXJuIGZ1bmN0aW9uICRpRGIoJGRiTmFtZSwgJGRiVmVyc2lvbikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnbnVtYmVyJ10pO1xuXG4gICAgLy8gTWFuZWphZG9yZXMgZGUgZXZlbnRvcy5cbiAgICB2YXIgJGV2ZW50c0NhbGxiYWNrcyA9IHt9O1xuICAgIHZhciAkdXBncmFkZU5lZWRlZERlZmVyZWQgPSAkcXMuZGVmZXIoKTtcbiAgICB2YXIgJG9wZW5EZWZlcmVkID0gJHFzLmRlZmVyKCk7XG4gICAgdmFyICRvcGVuZWQgPSBmYWxzZTtcblxuICAgIC8vIEluc3RhbmNpYSBkZSBsYSBiYXNlIGRlIGRhdG9zO1xuICAgIHZhciAkcmVxdWVzdCA9IG51bGw7XG4gICAgdGhpei4kbW9kZWxzID0ge307XG5cbiAgICAvLyBBZ3JlZ2FyIHVuIG1hbmVqYWRvciBkZSBldmVudG9cbiAgICB0aGl6LiRiaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdID0gW107XG4gICAgICB9XG5cbiAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5wdXNoKGNiKTtcbiAgICB9O1xuXG4gICAgLy9SZW11ZXZlIHVuIG1hbmVqYWRvciBkZSBldmVudG9cbiAgICB0aGl6LiR1bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkgcmV0dXJuO1xuXG4gICAgICAvLyBCdXNjYXIgZWwgY2JcbiAgICAgIHZhciBpZHggPSAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uaW5kZXhPZihjYik7XG5cbiAgICAgIC8vIFNpIHNlIGVuY29udHJvIGVsIGNiIHJlbW92ZXJsb1xuICAgICAgaWYgKGlkeCAhPSAtMSkge1xuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXG4gICAgdGhpei4kdHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHtcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnXSk7XG5cbiAgICAgICRsb2cubG9nKCRkYk5hbWUgKyAnLnYnICsgKCRkYlZlcnNpb24gfHwgMSkgKyAnOiAnICsgZXZlbnROYW1lKTtcblxuICAgICAgZm9yICh2YXIgaSBpbiAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdW2ldLmFwcGx5KHRoaXosIGFyZ3MpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBDYWxsYmFja3MgcGFyYSBsb3MgZXJyb3Jlc1xuICAgIHRoaXouJGVycm9yID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB0aGl6LiRiaW5kKCRuZ0RiRXZlbnRzLkRCX0VSUk9SLCBjYik7XG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgLy8gQWJyaXIgdW5hIEJhc2UgZGUgZGF0b3MuXG4gICAgdGhpei4kb3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgkb3BlbmVkKSByZXR1cm4gJG9wZW5EZWZlcmVkO1xuXG4gICAgICAvLyBDcmVhciB1biBudWV2byBkZWZlclxuICAgICAgJG9wZW5lZCA9IHRydWU7XG5cbiAgICAgIC8vIGRlamFtb3MgYWJpZXJ0YSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcbiAgICAgIGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZSgkZGJOYW1lKS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyIHJlcXVlc3QgPSBpbmRleGVkREIub3BlbigkZGJOYW1lLCAkZGJWZXJzaW9uKTtcblxuICAgICAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJlcXVlc3QucmVzdWx0IVxuICAgICAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5yZXNvbHZlKGV2ZW50LCByZXF1ZXN0KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZWwgcmVzdWx0YWRvXG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcmVxdWVzdC5yZXN1bHQhXG4gICAgICAgICAgJHJlcXVlc3QgPSByZXF1ZXN0O1xuXG4gICAgICAgICAgLy8gQXNpbmdhciBlbCBtYW5lamFkb3IgZGUgZXJyb3JlcyBhIGxhIEJEXG4gICAgICAgICAgJHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgJGxvZy5lcnJvcignRGF0YWJhc2UgZXJyb3I6ICcgKyBldmVudC50YXJnZXQuZXJyb3JDb2RlKTtcbiAgICAgICAgICAgIHRoaXouJHRyaWdnZXIoJG5nRGJFdmVudHMuREJfRVJST1IsIFtldmVudF0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAkb3BlbkRlZmVyZWQucmVzb2x2ZShldmVudCwgcmVxdWVzdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGUgZXJyb3Jlc1xuICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXF1ZXN0LmVycm9yQ29kZSFcbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgJG9wZW5EZWZlcmVkLnJlamVjdChyZXF1ZXN0LmVycm9yQ29kZSk7XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gJG9wZW5EZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBBZ3JlZ2EgdW4gbnVldm8gbW9kZWxvXG4gICAgdGhpei4kbW9kZWwgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJ10pO1xuXG4gICAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsb1xuICAgICAgdmFyIG1vZGVsID0gdGhpei4kbW9kZWxzW25hbWVdO1xuXG4gICAgICAvLyBTaSBubyBleGlzdGUgZWwgbW9kZWxvIGNyZWFyXG4gICAgICBpZiAoIW1vZGVsKSBtb2RlbCA9ICRpTW9kZWwodGhpeiwgbmFtZSk7XG5cbiAgICAgIC8vIEd1YXJkYXIgZWwgbW9kZWxvIGVuIGxvcyBtb2RlbG9zXG4gICAgICB0aGl6LiRtb2RlbHNbbmFtZV0gPSBtb2RlbDtcblxuICAgICAgLy8gUmV0b3JuYXIgZWwgbW9kZWxvXG4gICAgICByZXR1cm4gbW9kZWw7XG4gICAgfTtcblxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxuICAgIHRoaXouJGNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgbW9kZWxJZCkge1xuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJlcXVlc3QpIHtcbiAgICAgICAgcmVxdWVzdC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUobW9kZWxOYW1lLCBtb2RlbElkKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcbiAgICB0aGl6LiRjcmVhdGVJbmRleCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCByZXF1ZXN0KSB7XG4gICAgICAgIHZhciBzdG9yZSA9IHJlcXVlc3QudHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUobW9kZWxOYW1lKTtcbiAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIENyZWEgdW5hIHRyYW5zYWNjacOzblxuICAgIHRoaXouJHRyYW5zYWN0aW9uID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgcGVybXMsIGFjdGlvbiwgY2IpIHtcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnZnVuY3Rpb24nLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIHZhciBkZWZlcmVkID0gJHFzLmRlZmVyKGNiKTtcblxuICAgICAgLy8gQ3VhbmRvIHNlIGFicmEgbGEgQkRcbiAgICAgICRvcGVuRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCByZXF1ZXN0KSB7XG4gICAgICAgIHZhciB0eCA9IHJlcXVlc3QucmVzdWx0LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgcGVybXMpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gYWN0aW9uKHR4KTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHR4Lm9uY29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJlc3VsdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgdHgub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdCh0eC5lcnJvcik7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIEluc2VydGEgdW4gcmVnaXN0cm8gZW4gZWwgbW9kZWxvXG4gICAgdGhpei4kY3JlYXRlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgaW5zdGFuY2UsIGNiKSB7XG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICdmdW5jdGlvbiddLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIHZhciBkZWZlcmVkID0gJHFzLmRlZmVyKGNiKTtcblxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cbiAgICAgIHRoaXouJHRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkucHV0KGluc3RhbmNlKTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBpbnN0YW5jZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIENvdWxkIGNhbGwgcmVxdWVzdC5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QocmVxdWVzdCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xuICAgIHRoaXouJGZpbmQgPSBmdW5jdGlvbiAoTW9kZWwsIG1vZGVsTmFtZSwgc2NvcGUsIGNiKSB7XG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbicsICdzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9ICRxcy5kZWZlcihjYik7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXG4gICAgICB0aGl6LiR0cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgc3RvcmUgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpO1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHN0b3JlLm9wZW5DdXJzb3IoKTtcblxuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgY3Vyc29yID0gcmVxdWVzdC5yZXN1bHQ7XG5cbiAgICAgICAgICAvLyBObyBtb3JlIG1hdGNoaW5nIHJlY29yZHMuXG4gICAgICAgICAgaWYgKCFjdXJzb3IpIHJldHVybiBkZWZlcmVkLnJlc29sdmUocmVzdWx0KTtcblxuICAgICAgICAgIC8vIENhbGxlZCBmb3IgZWFjaCBtYXRjaGluZyByZWNvcmQuXG4gICAgICAgICAgcmVzdWx0LnB1c2goTW9kZWwuJGdldChjdXJzb3IudmFsdWUpKTtcbiAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBDcmVhciBhbGlhcyBwYXJhIGxvcyBldmVudG9zIGVubGF6YXIgY2FsbGJhY2tzIGEgbG9zIGV2ZW50b3NcbiAgICB2YXIgZGVmZXJlZHMgPSB2b2lkIDA7XG4gICAgT2JqZWN0LmtleXMoZGVmZXJlZHMgPSB7XG4gICAgICAkb25PcGVuOiAkb3BlbkRlZmVyZWQsXG4gICAgICAkb25VcGdyYWRlTmVlZGVkOiAkdXBncmFkZU5lZWRlZERlZmVyZWRcbiAgICB9KS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoZnVuY3Rpb24gKGVycikge1xuICAgICAgICB2YXIgdGV4dCA9ICRkYk5hbWUgKyAnLnYnICsgKCRkYlZlcnNpb24gfHwgMSkgKyAnOiAnICsga2V5O1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgJGxvZy5lcnJvcih0ZXh0LCBlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRsb2cubG9nKHRleHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXpba2V5XSA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcbiAgICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoY2IpO1xuICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaURiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlNb2RlbFNlcnZpY2UgKCRxcywgJG5nRGJVdGlscykgeyAnbmdJbmplY3QnO1xyXG5cclxuICByZXR1cm4gZnVuY3Rpb24gJGlNb2RlbCgkZGIsICRtb2RlbE5hbWUpIHsgbGV0IHRoaXogPSB0aGlzO1xyXG4gICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtudWxsICwnc3RyaW5nJ10pO1xyXG5cclxuICAgIC8vIENsYXZlIGRlbCBtb2RlbG9cclxuICAgIGxldCAkaWQgPSB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfTtcclxuICAgIGxldCAkaW5zdGFuY2VzID0ge307XHJcblxyXG4gICAgLy8gQ29uc3R1Y3RvciBkZWwgbW9kZWxvXHJcbiAgICBmdW5jdGlvbiAkTW9kZWwoZGF0YSkge1xyXG4gICAgICB0aGlzLiRzZXRBdHRyaWJ1dGVzKGRhdGEpO1xyXG4gICAgICB0aGlzLiRjb25zdHJ1Y3RvcihkYXRhKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xyXG4gICAgJE1vZGVsLiRpZCA9IGZ1bmN0aW9uICgkcElpZCkge1xyXG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnXSk7XHJcbiAgICAgICRpZCA9ICRwSWlkXHJcbiAgICAgIHJldHVybiAkTW9kZWw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgZWwgb2JqZWN0byBzdG9yYWdlIHBhcmEgZWwgbW9kZWxvLlxyXG4gICAgJE1vZGVsLiRjcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgJGRiLiRjcmVhdGVTdG9yZSgkbW9kZWxOYW1lLCAkaWQpO1xyXG4gICAgICByZXR1cm4gJE1vZGVsO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZ3JlZ2EgdW4gaW5kZXhcclxuICAgICRNb2RlbC4kaW5kZXggPSBmdW5jdGlvbiAoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcclxuICAgICAgJGRiLiRjcmVhdGVJbmRleCgkbW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XHJcbiAgICAgIHJldHVybiAkTW9kZWw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE3DqXRvZG8gcXVlIHBlcm1pdGUgbW9kaWZpY2FyIG1vZGVsLlxyXG4gICAgJE1vZGVsLiRidWlsZCA9IGZ1bmN0aW9uIChidWlsZENhbGxiYWNrKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xyXG4gICAgICBidWlsZENhbGxiYWNrKCRNb2RlbCk7XHJcbiAgICAgIHJldHVybiAkTW9kZWw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgbnVldmFzIGluc3RhbmNpYXMgZGUgbG9zIG1vZGVsb3NcclxuICAgICRNb2RlbC4kY3JlYXRlID0gZnVuY3Rpb24gKGRhdGEsIGNiKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIC8vIFNpIGVzIHVuIGFycmF5XHJcbiAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGV0IHJlY29yZCA9ICRNb2RlbC4kZ2V0KGRhdGEpO1xyXG4gICAgICAgIHJldHVybiByZWNvcmQuJGNyZWF0ZShjYik7XHJcbiAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgLy8gT2J0ZW5lciB1bmEgY29waWEgZGVsIGFycmF5XHJcbiAgICAgIGxldCBhcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhKTtcclxuICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICBsZXQgZGVmZXJlZCA9ICRxcy5kZWZlcihjYik7XHJcblxyXG4gICAgICAoZnVuY3Rpb24gaXRlcmF0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gTm8gcXVlZGFuIGVsZW1lbnRvcyBlbiBlbCBhcnJheVxyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09IDApIHJldHVybiBkZWZlcmVkLnJlc29sdmUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXIgZWwgc2lndWllbnRlIGVsZW1lbnRvXHJcbiAgICAgICAgJE1vZGVsLiRjcmVhdGUoYXJyLnNoaWZ0KCksIGZ1bmN0aW9uIChlcnIsIGluc3RhbmNlKSB7XHJcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZGVmZXJlZC5yZWplY3QoZXJyKTtcclxuICAgICAgICAgIHJlc3VsdC5wdXNoKGluc3RhbmNlKTtcclxuICAgICAgICAgIGl0ZXJhdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSkoKTtcclxuXHJcbiAgICAgIC8vIERldm9sdmVyIGVsIHByb21pc2VcclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBCdXNjYXIgdW4gY2FtcG9cclxuICAgICRNb2RlbC5zZWFyY2hEZWVwRmllbGQgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgY2IpIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGxldCBmaWVsZHMgPSBmaWVsZC5zcGxpdCgnLicpO1xyXG4gICAgICBsZXQgbGFzdEZpZWxkID0gZmllbGRzLnBvcCgpO1xyXG5cclxuICAgICAgcmV0dXJuIChmdW5jdGlvbiBfc2V0KG9iaikge1xyXG4gICAgICAgIGlmIChmaWVsZHMubGVuZ3RoID09IDApXHJcbiAgICAgICAgICByZXR1cm4gY2Iob2JqLCBsYXN0RmllbGQpO1xyXG4gICAgICAgIGxldCBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW2ZpZWxkXSA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAgICBvYmpbZmllbGRdID0ge307XHJcbiAgICAgICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XHJcbiAgICAgIH0pKG9iaik7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGVsIG1vZGVsIGRlIGxhcyBndWFyZGFkYXMuIFNpIG5vIGV4aXN0ZSBlbnRvbmNlXHJcbiAgICAvLyBzZSBjcmVhXHJcbiAgICAkTW9kZWwuJGdldCA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xyXG5cclxuICAgICAgLy8gT2J0ZW5lciBlbCBrZXkgZGVsIG9iamV0b1xyXG4gICAgICBsZXQga2V5ID0gJE1vZGVsLnNlYXJjaERlZXBGaWVsZChvYmosICRpZC5rZXlQYXRoLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gRWwgb2JqZXRvIG5vIHRpZW5lIElEXHJcbiAgICAgIGlmICgha2V5KSBcclxuICAgICAgICByZXR1cm4gbmV3ICRNb2RlbChvYmopO1xyXG5cclxuICAgICAgLy8gTm8gZXhpc3RlIGxhIGluc3RhbmNpYSBlbnRvbmNlIHNlIGNyZWFcclxuICAgICAgaWYgKCEkaW5zdGFuY2VzW2tleV0pXHJcbiAgICAgICAgJGluc3RhbmNlc1trZXldID0gbmV3ICRNb2RlbChvYmopO1xyXG4gICAgICBcclxuICAgICAgcmV0dXJuICRpbnN0YW5jZXNba2V5XTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xyXG4gICAgJE1vZGVsLiRmaW5kID0gZnVuY3Rpb24gKHNjb3BlLCBjYikge1xyXG4gICAgICBsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgIGNiID0gYXJncy5wb3AoKTsgc2NvcGUgPSBhcmdzLnBvcCgpO1xyXG4gICAgICByZXR1cm4gJGRiLiRmaW5kKCRNb2RlbCwgJG1vZGVsTmFtZSwgc2NvcGUsIGNiKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGxvcyBhdHJpYnV0b3NcclxuICAgICRNb2RlbC5wcm90b3R5cGUuJHNldEF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoZGF0YSkgeyBsZXQgdGhpeiA9IHRoaXM7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcclxuICAgICAgXHJcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbiAocHJvcGVydHkpIHtcclxuICAgICAgICB0aGl6LiRzZXQocHJvcGVydHksIGRhdGFbcHJvcGVydHldKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXHJcbiAgICAkTW9kZWwucHJvdG90eXBlLiRnZXQgPSBmdW5jdGlvbiAoZmllbGQpIHsgbGV0IHRoaXogPSB0aGlzO1xyXG4gICAgICByZXR1cm4gJE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGl6LCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICAgICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cclxuICAgICRNb2RlbC5wcm90b3R5cGUuJHNldCA9IGZ1bmN0aW9uIChmaWVsZCwgdmFsdWUpIHsgbGV0IHRoaXogPSB0aGlzO1xyXG4gICAgICByZXR1cm4gJE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGl6LCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICAgICAgb2JqW2xhc3RGaWVsZF0gPSB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gdGhpejtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENvbnN0dXJjdG9yIHF1ZSBzZSBwdWVkZSBzb2JyZSBlc2NyaWJpclxyXG4gICAgJE1vZGVsLnByb3RvdHlwZS4kY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBHdWFyZGEgbG9zIGRhdG9zIGRlbCBvYmpldG9cclxuICAgICRNb2RlbC5wcm90b3R5cGUuJGNyZWF0ZSA9IGZ1bmN0aW9uIChjYil7IGxldCB0aGl6ID0gdGhpcztcclxuICAgICAgcmV0dXJuICRkYi4kY3JlYXRlKCRtb2RlbE5hbWUsIHRoaXMsIGZ1bmN0aW9uIChlcnIsIGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGVycikgeyBpZiAoY2IpIGNiKGVycik7IHJldHVybjsgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBnZW5lcmFkbyBhbCBtb2RlbG9cclxuICAgICAgICB0aGl6LiRzZXQoJGlkLmtleVBhdGgsIGV2ZW50LnRhcmdldC5yZXN1bHQpXHJcblxyXG4gICAgICAgIC8vIEd1YXJkYXIgbGEgaW5zdGFuY2lhIGVuIGxhIGNvbGVjaW9uIGRlIGluc3RhbmNpYXNcclxuICAgICAgICAkaW5zdGFuY2VzW3RoaXouJGdldCgkaWQua2V5UGF0aCldID0gdGhpejtcclxuXHJcbiAgICAgICAgaWYgKGNiKSBjYi5hcHBseShudWxsLCBbbnVsbF0uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gJE1vZGVsO1xyXG5cclxuICB9O1xyXG5cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pTW9kZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaU1vZGVsU2VydmljZTtcbmZ1bmN0aW9uIGlNb2RlbFNlcnZpY2UoJHFzLCAkbmdEYlV0aWxzKSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICRpTW9kZWwoJGRiLCAkbW9kZWxOYW1lKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbbnVsbCwgJ3N0cmluZyddKTtcblxuICAgIC8vIENsYXZlIGRlbCBtb2RlbG9cbiAgICB2YXIgJGlkID0geyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OiB0cnVlIH07XG4gICAgdmFyICRpbnN0YW5jZXMgPSB7fTtcblxuICAgIC8vIENvbnN0dWN0b3IgZGVsIG1vZGVsb1xuICAgIGZ1bmN0aW9uICRNb2RlbChkYXRhKSB7XG4gICAgICB0aGlzLiRzZXRBdHRyaWJ1dGVzKGRhdGEpO1xuICAgICAgdGhpcy4kY29uc3RydWN0b3IoZGF0YSk7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cbiAgICAkTW9kZWwuJGlkID0gZnVuY3Rpb24gKCRwSWlkKSB7XG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnXSk7XG4gICAgICAkaWQgPSAkcElpZDtcbiAgICAgIHJldHVybiAkTW9kZWw7XG4gICAgfTtcblxuICAgIC8vIENyZWEgZWwgb2JqZWN0byBzdG9yYWdlIHBhcmEgZWwgbW9kZWxvLlxuICAgICRNb2RlbC4kY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkZGIuJGNyZWF0ZVN0b3JlKCRtb2RlbE5hbWUsICRpZCk7XG4gICAgICByZXR1cm4gJE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBBZ3JlZ2EgdW4gaW5kZXhcbiAgICAkTW9kZWwuJGluZGV4ID0gZnVuY3Rpb24gKGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XG4gICAgICAkZGIuJGNyZWF0ZUluZGV4KCRtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcbiAgICAgIHJldHVybiAkTW9kZWw7XG4gICAgfTtcblxuICAgIC8vIE3DqXRvZG8gcXVlIHBlcm1pdGUgbW9kaWZpY2FyIG1vZGVsLlxuICAgICRNb2RlbC4kYnVpbGQgPSBmdW5jdGlvbiAoYnVpbGRDYWxsYmFjaykge1xuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XG4gICAgICBidWlsZENhbGxiYWNrKCRNb2RlbCk7XG4gICAgICByZXR1cm4gJE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIG51ZXZhcyBpbnN0YW5jaWFzIGRlIGxvcyBtb2RlbG9zXG4gICAgJE1vZGVsLiRjcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSwgY2IpIHtcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgLy8gU2kgZXMgdW4gYXJyYXlcbiAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciByZWNvcmQgPSAkTW9kZWwuJGdldChkYXRhKTtcbiAgICAgICAgcmV0dXJuIHJlY29yZC4kY3JlYXRlKGNiKTtcbiAgICAgIH1cblxuICAgICAgLy8gT2J0ZW5lciB1bmEgY29waWEgZGVsIGFycmF5XG4gICAgICB2YXIgYXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZGF0YSk7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICB2YXIgZGVmZXJlZCA9ICRxcy5kZWZlcihjYik7XG5cbiAgICAgIChmdW5jdGlvbiBpdGVyYXRpb24oKSB7XG5cbiAgICAgICAgLy8gTm8gcXVlZGFuIGVsZW1lbnRvcyBlbiBlbCBhcnJheVxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PSAwKSByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKHJlc3VsdCk7XG5cbiAgICAgICAgLy8gQ3JlYXIgZWwgc2lndWllbnRlIGVsZW1lbnRvXG4gICAgICAgICRNb2RlbC4kY3JlYXRlKGFyci5zaGlmdCgpLCBmdW5jdGlvbiAoZXJyLCBpbnN0YW5jZSkge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkZWZlcmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGluc3RhbmNlKTtcbiAgICAgICAgICBpdGVyYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSgpO1xuXG4gICAgICAvLyBEZXZvbHZlciBlbCBwcm9taXNlXG4gICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICB9O1xuXG4gICAgLy8gQnVzY2FyIHVuIGNhbXBvXG4gICAgJE1vZGVsLnNlYXJjaERlZXBGaWVsZCA9IGZ1bmN0aW9uIChvYmosIGZpZWxkLCBjYikge1xuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdmFyIGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XG4gICAgICB2YXIgbGFzdEZpZWxkID0gZmllbGRzLnBvcCgpO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gX3NldChvYmopIHtcbiAgICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMCkgcmV0dXJuIGNiKG9iaiwgbGFzdEZpZWxkKTtcbiAgICAgICAgdmFyIGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW2ZpZWxkXSA9PT0gJ3VuZGVmaW5lZCcpIG9ialtmaWVsZF0gPSB7fTtcbiAgICAgICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XG4gICAgICB9KG9iaik7XG4gICAgfTtcblxuICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgbW9kZWwgZGUgbGFzIGd1YXJkYWRhcy4gU2kgbm8gZXhpc3RlIGVudG9uY2VcbiAgICAvLyBzZSBjcmVhXG4gICAgJE1vZGVsLiRnZXQgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnXSk7XG5cbiAgICAgIC8vIE9idGVuZXIgZWwga2V5IGRlbCBvYmpldG9cbiAgICAgIHZhciBrZXkgPSAkTW9kZWwuc2VhcmNoRGVlcEZpZWxkKG9iaiwgJGlkLmtleVBhdGgsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XG4gICAgICB9KTtcblxuICAgICAgLy8gRWwgb2JqZXRvIG5vIHRpZW5lIElEXG4gICAgICBpZiAoIWtleSkgcmV0dXJuIG5ldyAkTW9kZWwob2JqKTtcblxuICAgICAgLy8gTm8gZXhpc3RlIGxhIGluc3RhbmNpYSBlbnRvbmNlIHNlIGNyZWFcbiAgICAgIGlmICghJGluc3RhbmNlc1trZXldKSAkaW5zdGFuY2VzW2tleV0gPSBuZXcgJE1vZGVsKG9iaik7XG5cbiAgICAgIHJldHVybiAkaW5zdGFuY2VzW2tleV07XG4gICAgfTtcblxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cbiAgICAkTW9kZWwuJGZpbmQgPSBmdW5jdGlvbiAoc2NvcGUsIGNiKSB7XG4gICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICBjYiA9IGFyZ3MucG9wKCk7c2NvcGUgPSBhcmdzLnBvcCgpO1xuICAgICAgcmV0dXJuICRkYi4kZmluZCgkTW9kZWwsICRtb2RlbE5hbWUsIHNjb3BlLCBjYik7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBsb3MgYXRyaWJ1dG9zXG4gICAgJE1vZGVsLnByb3RvdHlwZS4kc2V0QXR0cmlidXRlcyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnXSk7XG5cbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgdGhpei4kc2V0KHByb3BlcnR5LCBkYXRhW3Byb3BlcnR5XSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxuICAgICRNb2RlbC5wcm90b3R5cGUuJGdldCA9IGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgcmV0dXJuICRNb2RlbC5zZWFyY2hEZWVwRmllbGQodGhpeiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cbiAgICAkTW9kZWwucHJvdG90eXBlLiRzZXQgPSBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICByZXR1cm4gJE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGl6LCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgIG9ialtsYXN0RmllbGRdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIENvbnN0dXJjdG9yIHF1ZSBzZSBwdWVkZSBzb2JyZSBlc2NyaWJpclxuICAgICRNb2RlbC5wcm90b3R5cGUuJGNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKGRhdGEpIHt9O1xuXG4gICAgLy8gR3VhcmRhIGxvcyBkYXRvcyBkZWwgb2JqZXRvXG4gICAgJE1vZGVsLnByb3RvdHlwZS4kY3JlYXRlID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICByZXR1cm4gJGRiLiRjcmVhdGUoJG1vZGVsTmFtZSwgdGhpcywgZnVuY3Rpb24gKGVyciwgZXZlbnQpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGlmIChjYikgY2IoZXJyKTtyZXR1cm47XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQXNpZ25hciBlbCBnZW5lcmFkbyBhbCBtb2RlbG9cbiAgICAgICAgdGhpei4kc2V0KCRpZC5rZXlQYXRoLCBldmVudC50YXJnZXQucmVzdWx0KTtcblxuICAgICAgICAvLyBHdWFyZGFyIGxhIGluc3RhbmNpYSBlbiBsYSBjb2xlY2lvbiBkZSBpbnN0YW5jaWFzXG4gICAgICAgICRpbnN0YW5jZXNbdGhpei4kZ2V0KCRpZC5rZXlQYXRoKV0gPSB0aGl6O1xuXG4gICAgICAgIGlmIChjYikgY2IuYXBwbHkobnVsbCwgW251bGxdLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuICRNb2RlbDtcbiAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pTW9kZWwuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9