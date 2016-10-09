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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGE5NjY1MDcwMmI5Mzc2Njk5YWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy9uZ0RiVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL25nRGJVdGlscy5qcz9jMWEzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2V2ZW50cy5qcz81NzA0Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9xcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcXMuanM/NjQzOSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaURiLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pRGIuanM/MDUwMiIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaU1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pTW9kZWwuanM/ZTFjYyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29uc3RhbnQiLCJzZXJ2aWNlIiwibmdEYlV0aWxzIiwiJHEiLCJpc0NhbGxiYWNrIiwiY2IiLCJ0aHJvd0Vycm9yIiwidW5kZWZpbmVkIiwibXVzdEJlQ2FsbGJhY2siLCJlcnIiLCJFcnJvciIsIm5hbWUiLCJtdXN0QmUiLCJ2YWx1ZSIsInR5cGVzIiwiaSIsImpvaW4iLCJ2YWxpZGF0ZSIsImFyZ3MiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsInZhbHVlcyIsIkRCX0VSUk9SIiwicXMiLCJxc0NsYXNzIiwidGhpeiIsInRoZW5zIiwidGhlbnNSZWFkeSIsImNhdGNocyIsImNhdGNoc1JlYWR5IiwicmVzdWx0QXJncyIsImVycm9yIiwicHJvbWlzZSIsIiRyZXNvbHZlZCIsInRoZW5zUmVzb2x2ZWQiLCJsZW5ndGgiLCJzaGlmdCIsImFwcGx5IiwicHVzaCIsImNhdGNoc1Jlc29sdmVkIiwicmVzb2x2ZSIsImFyZ3VtZW50cyIsInJlamVjdCIsInRoZW4iLCJjYXRjaCIsImRvbmUiLCJjb25jYXQiLCJkZWZlciIsImlEYlNlcnZpY2UiLCIkcXMiLCIkaU1vZGVsIiwiJG5nRGJVdGlscyIsIiRuZ0RiRXZlbnRzIiwiJGxvZyIsImluZGV4ZWREQiIsIndpbmRvdyIsIm1vekluZGV4ZWREQiIsIndlYmtpdEluZGV4ZWREQiIsIm1zSW5kZXhlZERCIiwiSURCVHJhbnNhY3Rpb24iLCJ3ZWJraXRJREJUcmFuc2FjdGlvbiIsIm1zSURCVHJhbnNhY3Rpb24iLCJJREJLZXlSYW5nZSIsIndlYmtpdElEQktleVJhbmdlIiwibXNJREJLZXlSYW5nZSIsImFsZXJ0IiwiJGlEYiIsIiRkYk5hbWUiLCIkZGJWZXJzaW9uIiwiJGV2ZW50c0NhbGxiYWNrcyIsIiR1cGdyYWRlTmVlZGVkRGVmZXJlZCIsIiRvcGVuRGVmZXJlZCIsIiRvcGVuZWQiLCIkcmVxdWVzdCIsIiRtb2RlbHMiLCIkYmluZCIsImV2ZW50TmFtZSIsIiR1bmJpbmQiLCJpZHgiLCJpbmRleE9mIiwic3BsaWNlIiwiJHRyaWdnZXIiLCJsb2ciLCIkZXJyb3IiLCIkb3BlbiIsImRlbGV0ZURhdGFiYXNlIiwib25zdWNjZXNzIiwicmVxdWVzdCIsIm9wZW4iLCJvbnVwZ3JhZGVuZWVkZWQiLCJldmVudCIsIm9uZXJyb3IiLCJ0YXJnZXQiLCJlcnJvckNvZGUiLCIkbW9kZWwiLCJtb2RlbCIsIiRjcmVhdGVTdG9yZSIsIm1vZGVsTmFtZSIsIm1vZGVsSWQiLCJyZXN1bHQiLCJjcmVhdGVPYmplY3RTdG9yZSIsIiRjcmVhdGVJbmRleCIsImluZGV4TmFtZSIsImZpZWxkTmFtZSIsIm9wdHMiLCJzdG9yZSIsInRyYW5zYWN0aW9uIiwib2JqZWN0U3RvcmUiLCJjcmVhdGVJbmRleCIsIiR0cmFuc2FjdGlvbiIsInBlcm1zIiwiYWN0aW9uIiwiZGVmZXJlZCIsInR4Iiwib25jb21wbGV0ZSIsIm9uYWJvcnQiLCIkY3JlYXRlIiwiaW5zdGFuY2UiLCJwdXQiLCIkZmluZCIsIk1vZGVsIiwic2NvcGUiLCJvcGVuQ3Vyc29yIiwiY3Vyc29yIiwiJGdldCIsImNvbnRpbnVlIiwiZGVmZXJlZHMiLCJPYmplY3QiLCJrZXlzIiwiJG9uT3BlbiIsIiRvblVwZ3JhZGVOZWVkZWQiLCJtYXAiLCJrZXkiLCJ0ZXh0IiwiaU1vZGVsU2VydmljZSIsIiRkYiIsIiRtb2RlbE5hbWUiLCIkaWQiLCJrZXlQYXRoIiwiYXV0b0luY3JlbWVudCIsIiRpbnN0YW5jZXMiLCIkTW9kZWwiLCJkYXRhIiwiJHNldEF0dHJpYnV0ZXMiLCIkY29uc3RydWN0b3IiLCIkcElpZCIsIiRpbmRleCIsIiRidWlsZCIsImJ1aWxkQ2FsbGJhY2siLCJyZWNvcmQiLCJhcnIiLCJpdGVyYXRpb24iLCJzZWFyY2hEZWVwRmllbGQiLCJvYmoiLCJmaWVsZCIsImZpZWxkcyIsInNwbGl0IiwibGFzdEZpZWxkIiwicG9wIiwiX3NldCIsInByb3BlcnR5IiwiJHNldCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FBRUE7O0FDRUEsS0FBSSxjQUFjLHVCQUF1Qjs7QUREekM7O0FDS0EsS0FBSSxXQUFXLHVCQUF1Qjs7QURKdEM7O0FDUUEsS0FBSSxPQUFPLHVCQUF1Qjs7QURObEM7O0FDVUEsS0FBSSxRQUFRLHVCQUF1Qjs7QURUbkM7O0FDYUEsS0FBSSxXQUFXLHVCQUF1Qjs7QUFFdEMsVUFBUyx1QkFBdUIsS0FBSyxFQUFFLE9BQU8sT0FBTyxJQUFJLGFBQWEsTUFBTSxFQUFFLFNBQVM7O0FEYnZGQSxTQUFRQyxPQUFPLFFBQVEs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QU87T0FDbkQsT0FBTzhHLElBQUluQixRQUFRb0IsWUFBWSxNQUFNLFVBQVVqSSxLQUFLbUYsT0FBTztTQUN6RCxJQUFJbkYsS0FBSztXQUFFLElBQUlKLElBQUlBLEdBQUdJLEtBQU07VUFBUzs7O1NBR3JDa0IsS0FBS3dJLEtBQUt4QixJQUFJQyxTQUFTaEQsTUFBTUUsT0FBT087OztTQUdwQ3lDLFdBQVduSCxLQUFLbUcsS0FBS2EsSUFBSUMsWUFBWWpIOztTQUVyQyxJQUFJdEIsSUFBSUEsR0FBR2tDLE1BQU0sTUFBTSxDQUFDLE1BQU1TLE9BQU83QixNQUFNQyxVQUFVQyxNQUFNQyxLQUFLcUI7Ozs7S0FLcEUsT0FBT29HIiwiZmlsZSI6Im5nLWRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwYTk2NjUwNzAyYjkzNzY2OTlhY1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBuZ0RiVXRpbHMgZnJvbSAnLi91dGlscy9uZ0RiVXRpbHMnO1xyXG5pbXBvcnQgbmdEYkV2ZW50cyBmcm9tICcuL3V0aWxzL2V2ZW50cyc7XHJcbmltcG9ydCBxcyBmcm9tICcuL3V0aWxzL3FzJztcclxuXHJcbmltcG9ydCBpRGIgZnJvbSAnLi9zZXJ2aWNlcy9pRGInO1xyXG5pbXBvcnQgaU1vZGVsIGZyb20gJy4vc2VydmljZXMvaU1vZGVsJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCduZ0RiJywgW10pXHJcbiAgLmNvbnN0YW50KCdOR19EQl9WRVJTSU9OJywgJzAuMC4xJylcclxuICAuc2VydmljZSgnJG5nRGJFdmVudHMnLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZ0RiRXZlbnRzOyB9KVxyXG4gIC5zZXJ2aWNlKCckbmdEYlV0aWxzJywgbmdEYlV0aWxzKVxyXG4gIC5zZXJ2aWNlKCckcXMnLCBxcylcclxuICAuc2VydmljZSgnJGlEYicsIGlEYilcclxuICAuc2VydmljZSgnJGlNb2RlbCcsIGlNb2RlbCk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX25nRGJVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMvbmdEYlV0aWxzJyk7XG5cbnZhciBfbmdEYlV0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX25nRGJVdGlscyk7XG5cbnZhciBfZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKTtcblxudmFyIF9ldmVudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXZlbnRzKTtcblxudmFyIF9xcyA9IHJlcXVpcmUoJy4vdXRpbHMvcXMnKTtcblxudmFyIF9xczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9xcyk7XG5cbnZhciBfaURiID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pRGInKTtcblxudmFyIF9pRGIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaURiKTtcblxudmFyIF9pTW9kZWwgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lNb2RlbCcpO1xuXG52YXIgX2lNb2RlbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pTW9kZWwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5hbmd1bGFyLm1vZHVsZSgnbmdEYicsIFtdKS5jb25zdGFudCgnTkdfREJfVkVSU0lPTicsICcwLjAuMScpLnNlcnZpY2UoJyRuZ0RiRXZlbnRzJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gX2V2ZW50czIuZGVmYXVsdDtcbn0pLnNlcnZpY2UoJyRuZ0RiVXRpbHMnLCBfbmdEYlV0aWxzMi5kZWZhdWx0KS5zZXJ2aWNlKCckcXMnLCBfcXMyLmRlZmF1bHQpLnNlcnZpY2UoJyRpRGInLCBfaURiMi5kZWZhdWx0KS5zZXJ2aWNlKCckaU1vZGVsJywgX2lNb2RlbDIuZGVmYXVsdCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBuZ0RiVXRpbHMgKCRxKSB7ICduZ0luamVjdCdcclxuXHJcbiAgLy8gRnVuY2lvbiBwYXJhIGRldGVybWluYXIgc2kgZXMgdW4gY2FsbGJhY2sgdsOhbGlkbyBvIG5vXHJcbiAgZnVuY3Rpb24gaXNDYWxsYmFjayAoY2IsIHRocm93RXJyb3IpIHtcclxuXHJcbiAgICBpZiAodHlwZW9mIGNiID09ICdmdW5jdGlvbicgfHwgY2IgPT0gbnVsbCB8fCBjYiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gIH1cclxuXHJcbiAgLy8gU2kgZWwgY2FsbGJhY2sgbm8gZXMgdsOhbGlkbyBsYW56YSB1biBlcnJwb3JcclxuICBmdW5jdGlvbiBtdXN0QmVDYWxsYmFjayAoY2IpIHtcclxuICAgIGlmIChpc0NhbGxiYWNrKGNiKSkgcmV0dXJuO1xyXG5cclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgY2FsbGJhY2snKTtcclxuICAgIGVyci5uYW1lID0gJ0ludmFsaWRDYWxsYmFjaydcclxuXHJcbiAgICB0aHJvdyBlcnI7XHJcblxyXG4gIH1cclxuXHJcbiAgLy8gR2VuZXJhIHVuIGVycm9yIHNpIGVsIHZhbG9yIG5vIGVzIGRlbCB0aXBvIGluZGljYWRvIHBvciBwYXJhbWV0cm9cclxuICBmdW5jdGlvbiBtdXN0QmUgKHZhbHVlLCB0eXBlcykge1xyXG4gICAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xyXG4gICAgZm9yKHZhciBpIGluIHR5cGVzKXtcclxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSB0eXBlc1tpXSkgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZTogJyt2YWx1ZSsnIG11c3QgYmUgJyt0eXBlcy5qb2luKCcgb3IgJykpO1xyXG4gICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbHVlJ1xyXG4gICAgdGhyb3cgZXJyO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIFZhbGlkYSB1biBhcnJheSBkZSBhcmd1bWVudG9zIGNvbiB1biBhcnJhIGRlIHRpcG9zXHJcbiAgZnVuY3Rpb24gdmFsaWRhdGUgKGFyZ3MsIHR5cGVzKSB7XHJcblxyXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xyXG4gICAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xyXG4gICAgZm9yICh2YXIgaSBpbiBhcmdzKXtcclxuICAgICAgaWYgKHR5cGVzW2ldKXtcclxuICAgICAgICBpZiAodHlwZXNbaV0gPT0gbnVsbCl7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0eXBlc1tpXSA9PSAnc3RyaW5nJyB8fCB0eXBlb2YgdHlwZXNbaV0gPT0gJ29iamVjdCcpe1xyXG4gICAgICAgICAgbXVzdEJlKGFyZ3NbaV0sIHR5cGVzW2ldKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHR5cGVzW2ldID09ICdmdW5jaW9uJyl7XHJcbiAgICAgICAgICB0eXBlc1tpXShhcmdzW2ldKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWxpZGF0b3IgdG86ICcrdmFsdWVzW2ldKycgbXVzdCBiZSAnK3R5cGVzW2ldKTtcclxuICAgICAgICBlcnIubmFtZSA9ICdJbnZhbGlkVmFsaWRhdG9yJ1xyXG4gICAgICAgIHRocm93IGVycjtcclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaXNDYWxsYmFjazogaXNDYWxsYmFjayxcclxuICAgIG11c3RCZUNhbGxiYWNrOiBtdXN0QmVDYWxsYmFjayxcclxuICAgIG11c3RCZTogbXVzdEJlLFxyXG4gICAgdmFsaWRhdGU6IHZhbGlkYXRlLFxyXG4gIH07XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvbmdEYlV0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IG5nRGJVdGlscztcbmZ1bmN0aW9uIG5nRGJVdGlscygkcSkge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIEZ1bmNpb24gcGFyYSBkZXRlcm1pbmFyIHNpIGVzIHVuIGNhbGxiYWNrIHbDoWxpZG8gbyBub1xuXG4gIGZ1bmN0aW9uIGlzQ2FsbGJhY2soY2IsIHRocm93RXJyb3IpIHtcblxuICAgIGlmICh0eXBlb2YgY2IgPT0gJ2Z1bmN0aW9uJyB8fCBjYiA9PSBudWxsIHx8IGNiID09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gU2kgZWwgY2FsbGJhY2sgbm8gZXMgdsOhbGlkbyBsYW56YSB1biBlcnJwb3JcbiAgZnVuY3Rpb24gbXVzdEJlQ2FsbGJhY2soY2IpIHtcbiAgICBpZiAoaXNDYWxsYmFjayhjYikpIHJldHVybjtcblxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgY2FsbGJhY2snKTtcbiAgICBlcnIubmFtZSA9ICdJbnZhbGlkQ2FsbGJhY2snO1xuXG4gICAgdGhyb3cgZXJyO1xuICB9XG5cbiAgLy8gR2VuZXJhIHVuIGVycm9yIHNpIGVsIHZhbG9yIG5vIGVzIGRlbCB0aXBvIGluZGljYWRvIHBvciBwYXJhbWV0cm9cbiAgZnVuY3Rpb24gbXVzdEJlKHZhbHVlLCB0eXBlcykge1xuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcbiAgICBmb3IgKHZhciBpIGluIHR5cGVzKSB7XG4gICAgICBpZiAoKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PSB0eXBlc1tpXSkgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlOiAnICsgdmFsdWUgKyAnIG11c3QgYmUgJyArIHR5cGVzLmpvaW4oJyBvciAnKSk7XG4gICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbHVlJztcbiAgICB0aHJvdyBlcnI7XG4gIH1cblxuICAvLyBWYWxpZGEgdW4gYXJyYXkgZGUgYXJndW1lbnRvcyBjb24gdW4gYXJyYSBkZSB0aXBvc1xuICBmdW5jdGlvbiB2YWxpZGF0ZShhcmdzLCB0eXBlcykge1xuXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcbiAgICBmb3IgKHZhciBpIGluIGFyZ3MpIHtcbiAgICAgIGlmICh0eXBlc1tpXSkge1xuICAgICAgICBpZiAodHlwZXNbaV0gPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZXNbaV0gPT0gJ3N0cmluZycgfHwgX3R5cGVvZih0eXBlc1tpXSkgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBtdXN0QmUoYXJnc1tpXSwgdHlwZXNbaV0pO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZXNbaV0gPT0gJ2Z1bmNpb24nKSB7XG4gICAgICAgICAgdHlwZXNbaV0oYXJnc1tpXSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbGlkYXRvciB0bzogJyArIHZhbHVlc1tpXSArICcgbXVzdCBiZSAnICsgdHlwZXNbaV0pO1xuICAgICAgICBlcnIubmFtZSA9ICdJbnZhbGlkVmFsaWRhdG9yJztcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaXNDYWxsYmFjazogaXNDYWxsYmFjayxcbiAgICBtdXN0QmVDYWxsYmFjazogbXVzdEJlQ2FsbGJhY2ssXG4gICAgbXVzdEJlOiBtdXN0QmUsXG4gICAgdmFsaWRhdGU6IHZhbGlkYXRlXG4gIH07XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvbmdEYlV0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gTm9tYnJlIGRlIGxvcyBldmVudG9zXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBEQl9FUlJPUjogJ2NiLmVycm9yJyxcclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9ldmVudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIE5vbWJyZSBkZSBsb3MgZXZlbnRvc1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICBEQl9FUlJPUjogJ2NiLmVycm9yJ1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9ldmVudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBxcyAoKSB7ICduZ0luamVjdCdcclxuICBcclxuICBmdW5jdGlvbiBxc0NsYXNzIChjYikgeyBsZXQgdGhpeiA9IHRoaXM7XHJcbiAgICBcclxuICAgIGxldCB0aGVucyA9IFtdO1xyXG4gICAgbGV0IHRoZW5zUmVhZHkgPSBbXTtcclxuICAgIGxldCBjYXRjaHMgPSBbXTtcclxuICAgIGxldCBjYXRjaHNSZWFkeSA9IFtdO1xyXG4gICAgbGV0IHJlc3VsdEFyZ3MgPSBudWxsO1xyXG4gICAgbGV0IGVycm9yID0gbnVsbDtcclxuXHJcbiAgICB0aGl6LnByb21pc2UgPSB7fTtcclxuICAgIHRoaXouJHJlc29sdmVkID0gZmFsc2U7XHJcblxyXG4gICAgZnVuY3Rpb24gdGhlbnNSZXNvbHZlZCAoKSB7XHJcbiAgICAgIGlmICghdGhlbnMubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgIGxldCBjYiA9IHRoZW5zLnNoaWZ0KCk7XHJcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXoucmVzdWx0QXJncyk7XHJcbiAgICAgIHRoZW5zUmVhZHkucHVzaChjYik7XHJcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYXRjaHNSZXNvbHZlZCAoKSB7XHJcbiAgICAgIGlmICghY2F0Y2hzLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICBsZXQgY2IgPSBjYXRjaHMuc2hpZnQoKTtcclxuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XHJcbiAgICAgIGNhdGNoc1JlYWR5LnB1c2goY2IpO1xyXG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXoucmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XHJcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgdGhpei5yZXN1bHRBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnJlamVjdCA9IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XHJcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgdGhpei5lcnJvciA9IGVyciB8fCB7fTtcclxuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgdGhlbnMucHVzaChjYik7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiAhdGhpei5lcnJvcikge1xyXG4gICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpejtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLmNhdGNoID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIGNhdGNocy5wdXNoKGNiKTtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmIHRoaXouZXJyb3IpIHtcclxuICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnByb21pc2UuZG9uZSA9IGZ1bmN0aW9uIChjYikge1xyXG5cclxuICAgICAgdGhlbnMucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgW251bGxdLmNvbmNhdCh0aGl6LnJlc3VsdEFyZ3MpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjYXRjaHMucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSB7XHJcbiAgICAgICAgaWYgKCF0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgaWYoY2IpIHRoaXoucHJvbWlzZS5kb25lKGNiKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgLy8gQ3JlYSB1bmEgaW5zdGFuY2lhIGRlbCBkZWZlcmVkXHJcbiAgcXNDbGFzcy5kZWZlciA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgcmV0dXJuIG5ldyBxc0NsYXNzKGNiKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gcXNDbGFzcztcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9xcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHFzO1xuZnVuY3Rpb24gcXMoKSB7XG4gICduZ0luamVjdCc7XG5cbiAgZnVuY3Rpb24gcXNDbGFzcyhjYikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgIHZhciB0aGVucyA9IFtdO1xuICAgIHZhciB0aGVuc1JlYWR5ID0gW107XG4gICAgdmFyIGNhdGNocyA9IFtdO1xuICAgIHZhciBjYXRjaHNSZWFkeSA9IFtdO1xuICAgIHZhciByZXN1bHRBcmdzID0gbnVsbDtcbiAgICB2YXIgZXJyb3IgPSBudWxsO1xuXG4gICAgdGhpei5wcm9taXNlID0ge307XG4gICAgdGhpei4kcmVzb2x2ZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIHRoZW5zUmVzb2x2ZWQoKSB7XG4gICAgICBpZiAoIXRoZW5zLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgdmFyIGNiID0gdGhlbnMuc2hpZnQoKTtcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXoucmVzdWx0QXJncyk7XG4gICAgICB0aGVuc1JlYWR5LnB1c2goY2IpO1xuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhdGNoc1Jlc29sdmVkKCkge1xuICAgICAgaWYgKCFjYXRjaHMubGVuZ3RoKSByZXR1cm47XG4gICAgICB2YXIgY2IgPSBjYXRjaHMuc2hpZnQoKTtcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xuICAgICAgY2F0Y2hzUmVhZHkucHVzaChjYik7XG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgIH1cblxuICAgIHRoaXoucmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgdGhpei5yZXN1bHRBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICB9O1xuXG4gICAgdGhpei5yZWplY3QgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgIHRoaXouZXJyb3IgPSBlcnIgfHwge307XG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgIH07XG5cbiAgICB0aGl6LnByb21pc2UudGhlbiA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgdGhlbnMucHVzaChjYik7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQgJiYgIXRoaXouZXJyb3IpIHtcbiAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIHRoaXoucHJvbWlzZS5jYXRjaCA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgY2F0Y2hzLnB1c2goY2IpO1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmIHRoaXouZXJyb3IpIHtcbiAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH07XG5cbiAgICB0aGl6LnByb21pc2UuZG9uZSA9IGZ1bmN0aW9uIChjYikge1xuXG4gICAgICB0aGVucy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgW251bGxdLmNvbmNhdCh0aGl6LnJlc3VsdEFyZ3MpKTtcbiAgICAgIH0pO1xuXG4gICAgICBjYXRjaHMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkge1xuICAgICAgICBpZiAoIXRoaXouZXJyb3IpIHtcbiAgICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgaWYgKGNiKSB0aGl6LnByb21pc2UuZG9uZShjYik7XG4gIH07XG5cbiAgLy8gQ3JlYSB1bmEgaW5zdGFuY2lhIGRlbCBkZWZlcmVkXG4gIHFzQ2xhc3MuZGVmZXIgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICByZXR1cm4gbmV3IHFzQ2xhc3MoY2IpO1xuICB9O1xuXG4gIHJldHVybiBxc0NsYXNzO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL3FzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlEYlNlcnZpY2UgKCRxcywgJGlNb2RlbCwgJG5nRGJVdGlscywgJG5nRGJFdmVudHMsICRsb2cpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxyXG4gIGNvbnN0IGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQjtcclxuICAvLyBObyB1c2UgXCJjb25zdCBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXHJcbiAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XHJcbiAgY29uc3QgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xyXG4gIGNvbnN0IElEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcclxuICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxyXG4gIFxyXG4gIGlmICghaW5kZXhlZERCKSB7XHJcbiAgICBhbGVydChcIlN1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhc1wiKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8vIENsYXNlIHBhcmEgbGEgY3JlYWNpw7NuIGRlIGluc3RhbmNpYXMgZGUgbGEgQkRcclxuICByZXR1cm4gZnVuY3Rpb24gJGlEYigkZGJOYW1lLCAkZGJWZXJzaW9uKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ251bWJlciddKTtcclxuXHJcbiAgICAvLyBNYW5lamFkb3JlcyBkZSBldmVudG9zLlxyXG4gICAgbGV0ICRldmVudHNDYWxsYmFja3MgPSB7fTtcclxuICAgIGxldCAkdXBncmFkZU5lZWRlZERlZmVyZWQgPSAkcXMuZGVmZXIoKTtcclxuICAgIGxldCAkb3BlbkRlZmVyZWQgPSAkcXMuZGVmZXIoKTtcclxuICAgIGxldCAkb3BlbmVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gSW5zdGFuY2lhIGRlIGxhIGJhc2UgZGUgZGF0b3M7XHJcbiAgICBsZXQgJHJlcXVlc3QgPSBudWxsO1xyXG4gICAgdGhpei4kbW9kZWxzID0ge307XHJcbiAgICBcclxuICAgIC8vIEFncmVnYXIgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xyXG4gICAgdGhpei4kYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcclxuXHJcbiAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKXtcclxuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnB1c2goY2IpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy9SZW11ZXZlIHVuIG1hbmVqYWRvciBkZSBldmVudG9cclxuICAgIHRoaXouJHVuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcclxuXHJcbiAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSByZXR1cm47XHJcblxyXG4gICAgICAvLyBCdXNjYXIgZWwgY2JcclxuICAgICAgY29uc3QgaWR4ID0gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLmluZGV4T2YoY2IpO1xyXG5cclxuICAgICAgLy8gU2kgc2UgZW5jb250cm8gZWwgY2IgcmVtb3ZlcmxvXHJcbiAgICAgIGlmIChpZHggIT0gLTEpe1xyXG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGlzcGFyYSB1biBldmVudG9cclxuICAgIHRoaXouJHRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnXSk7XHJcblxyXG4gICAgICAkbG9nLmxvZygkZGJOYW1lKycudicrKCRkYlZlcnNpb258fDEpKyc6ICcrZXZlbnROYW1lKTtcclxuXHJcbiAgICAgIGZvcihsZXQgaSBpbiAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pe1xyXG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXVtpXS5hcHBseSh0aGl6LCBhcmdzKTtcclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ2FsbGJhY2tzIHBhcmEgbG9zIGVycm9yZXNcclxuICAgIHRoaXouJGVycm9yID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIHRoaXouJGJpbmQoJG5nRGJFdmVudHMuREJfRVJST1IsIGNiKTtcclxuICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFicmlyIHVuYSBCYXNlIGRlIGRhdG9zLlxyXG4gICAgdGhpei4kb3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCRvcGVuZWQpIHJldHVybiAkb3BlbkRlZmVyZWQ7XHJcblxyXG4gICAgICAvLyBDcmVhciB1biBudWV2byBkZWZlclxyXG4gICAgICAkb3BlbmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIC8vIGRlamFtb3MgYWJpZXJ0YSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcclxuICAgICAgaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKCRkYk5hbWUpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKCRkYk5hbWUsICRkYlZlcnNpb24pO1xyXG5cclxuICAgICAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcmVxdWVzdC5yZXN1bHQhXHJcbiAgICAgICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucmVzb2x2ZShldmVudCwgcmVxdWVzdCk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlbCByZXN1bHRhZG9cclxuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcmVxdWVzdC5yZXN1bHQhXHJcbiAgICAgICAgICAkcmVxdWVzdCA9IHJlcXVlc3Q7XHJcblxyXG4gICAgICAgICAgLy8gQXNpbmdhciBlbCBtYW5lamFkb3IgZGUgZXJyb3JlcyBhIGxhIEJEXHJcbiAgICAgICAgICAkcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICRsb2cuZXJyb3IoJ0RhdGFiYXNlIGVycm9yOiAnKyBldmVudC50YXJnZXQuZXJyb3JDb2RlKTtcclxuICAgICAgICAgICAgdGhpei4kdHJpZ2dlcigkbmdEYkV2ZW50cy5EQl9FUlJPUiwgW2V2ZW50XSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgJG9wZW5EZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJlcXVlc3QpO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzXHJcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXF1ZXN0LmVycm9yQ29kZSFcclxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZWplY3QocmVxdWVzdC5lcnJvckNvZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXR1cm4gJG9wZW5EZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQWdyZWdhIHVuIG51ZXZvIG1vZGVsb1xyXG4gICAgdGhpei4kbW9kZWwgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnXSk7XHJcblxyXG4gICAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsb1xyXG4gICAgICBsZXQgbW9kZWwgPSB0aGl6LiRtb2RlbHNbbmFtZV07XHJcblxyXG4gICAgICAvLyBTaSBubyBleGlzdGUgZWwgbW9kZWxvIGNyZWFyXHJcbiAgICAgIGlmKCFtb2RlbClcclxuICAgICAgICBtb2RlbCA9ICRpTW9kZWwodGhpeiwgbmFtZSk7XHJcblxyXG4gICAgICAvLyBHdWFyZGFyIGVsIG1vZGVsbyBlbiBsb3MgbW9kZWxvc1xyXG4gICAgICB0aGl6LiRtb2RlbHNbbmFtZV0gPSBtb2RlbDtcclxuXHJcbiAgICAgIC8vIFJldG9ybmFyIGVsIG1vZGVsb1xyXG4gICAgICByZXR1cm4gbW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcclxuICAgIHRoaXouJGNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgbW9kZWxJZCkge1xyXG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJlcXVlc3QpIHtcclxuICAgICAgICByZXF1ZXN0LnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShtb2RlbE5hbWUsIG1vZGVsSWQpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxyXG4gICAgdGhpei4kY3JlYXRlSW5kZXggPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xyXG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcmVxdWVzdCkge1xyXG4gICAgICAgIGxldCBzdG9yZSA9IHJlcXVlc3QudHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUobW9kZWxOYW1lKTtcclxuICAgICAgICBzdG9yZS5jcmVhdGVJbmRleChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSB1bmEgdHJhbnNhY2Npw7NuXHJcbiAgICB0aGl6LiR0cmFuc2FjdGlvbiA9IGZ1bmN0aW9uKG1vZGVsTmFtZSwgcGVybXMsIGFjdGlvbiwgY2IpIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdmdW5jdGlvbicsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGxldCBkZWZlcmVkID0gJHFzLmRlZmVyKGNiKTtcclxuXHJcbiAgICAgIC8vIEN1YW5kbyBzZSBhYnJhIGxhIEJEXHJcbiAgICAgICRvcGVuRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCByZXF1ZXN0KSB7XHJcbiAgICAgICAgbGV0IHR4ID0gcmVxdWVzdC5yZXN1bHQudHJhbnNhY3Rpb24obW9kZWxOYW1lLCBwZXJtcyk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGFjdGlvbih0eCk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICB0eC5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJlc3VsdCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICB0eC5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QodHguZXJyb3IpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBkZWZlcmVkO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gSW5zZXJ0YSB1biByZWdpc3RybyBlbiBlbCBtb2RlbG9cclxuICAgIHRoaXouJGNyZWF0ZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluc3RhbmNlLCBjYikge1xyXG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICdmdW5jdGlvbiddLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICBsZXQgZGVmZXJlZCA9ICRxcy5kZWZlcihjYik7XHJcblxyXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxyXG4gICAgICB0aGl6LiR0cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkucHV0KGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxyXG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzICA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBpbnN0YW5jZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgLy8gQ291bGQgY2FsbCByZXF1ZXN0LnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KHJlcXVlc3QpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cclxuICAgIHRoaXouJGZpbmQgPSBmdW5jdGlvbiAoTW9kZWwsIG1vZGVsTmFtZSwgc2NvcGUsIGNiKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJywgJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICBsZXQgZGVmZXJlZCA9ICRxcy5kZWZlcihjYik7XHJcbiAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuXHJcbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXHJcbiAgICAgIHRoaXouJHRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWRvbmx5JywgZnVuY3Rpb24gKHR4KSB7XHJcbiAgICAgICAgbGV0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKTtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9IHN0b3JlLm9wZW5DdXJzb3IoKTtcclxuXHJcbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGxldCBjdXJzb3IgPSByZXF1ZXN0LnJlc3VsdDtcclxuXHJcbiAgICAgICAgICAvLyBObyBtb3JlIG1hdGNoaW5nIHJlY29yZHMuXHJcbiAgICAgICAgICBpZiAoIWN1cnNvcikgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBDYWxsZWQgZm9yIGVhY2ggbWF0Y2hpbmcgcmVjb3JkLlxyXG4gICAgICAgICAgcmVzdWx0LnB1c2goTW9kZWwuJGdldChjdXJzb3IudmFsdWUpKTtcclxuICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhciBhbGlhcyBwYXJhIGxvcyBldmVudG9zIGVubGF6YXIgY2FsbGJhY2tzIGEgbG9zIGV2ZW50b3NcclxuICAgIGxldCBkZWZlcmVkcztcclxuICAgIE9iamVjdC5rZXlzKGRlZmVyZWRzID0ge1xyXG4gICAgICAkb25PcGVuOiAkb3BlbkRlZmVyZWQsXHJcbiAgICAgICRvblVwZ3JhZGVOZWVkZWQ6ICR1cGdyYWRlTmVlZGVkRGVmZXJlZCxcclxuICAgIH0pLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICBsZXQgdGV4dCA9ICRkYk5hbWUrJy52JysoJGRiVmVyc2lvbnx8MSkrJzogJytrZXk7XHJcbiAgICAgICAgaWYgKGVycil7XHJcbiAgICAgICAgICAkbG9nLmVycm9yKHRleHQsIGVycik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICRsb2cubG9nKHRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXpba2V5XSA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xyXG4gICAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGNiKTtcclxuICAgICAgICByZXR1cm4gdGhpejtcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICB9O1xyXG5cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pRGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaURiU2VydmljZTtcbmZ1bmN0aW9uIGlEYlNlcnZpY2UoJHFzLCAkaU1vZGVsLCAkbmdEYlV0aWxzLCAkbmdEYkV2ZW50cywgJGxvZykge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cblxuICB2YXIgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xuICAvLyBObyB1c2UgXCJjb25zdCBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXG4gIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxuICB2YXIgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xuICB2YXIgSURCS2V5UmFuZ2UgPSB3aW5kb3cuSURCS2V5UmFuZ2UgfHwgd2luZG93LndlYmtpdElEQktleVJhbmdlIHx8IHdpbmRvdy5tc0lEQktleVJhbmdlO1xuICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxuXG4gIGlmICghaW5kZXhlZERCKSB7XG4gICAgYWxlcnQoXCJTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXNcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gQ2xhc2UgcGFyYSBsYSBjcmVhY2nDs24gZGUgaW5zdGFuY2lhcyBkZSBsYSBCRFxuICByZXR1cm4gZnVuY3Rpb24gJGlEYigkZGJOYW1lLCAkZGJWZXJzaW9uKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdudW1iZXInXSk7XG5cbiAgICAvLyBNYW5lamFkb3JlcyBkZSBldmVudG9zLlxuICAgIHZhciAkZXZlbnRzQ2FsbGJhY2tzID0ge307XG4gICAgdmFyICR1cGdyYWRlTmVlZGVkRGVmZXJlZCA9ICRxcy5kZWZlcigpO1xuICAgIHZhciAkb3BlbkRlZmVyZWQgPSAkcXMuZGVmZXIoKTtcbiAgICB2YXIgJG9wZW5lZCA9IGZhbHNlO1xuXG4gICAgLy8gSW5zdGFuY2lhIGRlIGxhIGJhc2UgZGUgZGF0b3M7XG4gICAgdmFyICRyZXF1ZXN0ID0gbnVsbDtcbiAgICB0aGl6LiRtb2RlbHMgPSB7fTtcblxuICAgIC8vIEFncmVnYXIgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xuICAgIHRoaXouJGJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkge1xuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnB1c2goY2IpO1xuICAgIH07XG5cbiAgICAvL1JlbXVldmUgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xuICAgIHRoaXouJHVuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSByZXR1cm47XG5cbiAgICAgIC8vIEJ1c2NhciBlbCBjYlxuICAgICAgdmFyIGlkeCA9ICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5pbmRleE9mKGNiKTtcblxuICAgICAgLy8gU2kgc2UgZW5jb250cm8gZWwgY2IgcmVtb3ZlcmxvXG4gICAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gRGlzcGFyYSB1biBldmVudG9cbiAgICB0aGl6LiR0cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcblxuICAgICAgJGxvZy5sb2coJGRiTmFtZSArICcudicgKyAoJGRiVmVyc2lvbiB8fCAxKSArICc6ICcgKyBldmVudE5hbWUpO1xuXG4gICAgICBmb3IgKHZhciBpIGluICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkge1xuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpeiwgYXJncyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIENhbGxiYWNrcyBwYXJhIGxvcyBlcnJvcmVzXG4gICAgdGhpei4kZXJyb3IgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHRoaXouJGJpbmQoJG5nRGJFdmVudHMuREJfRVJST1IsIGNiKTtcbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH07XG5cbiAgICAvLyBBYnJpciB1bmEgQmFzZSBkZSBkYXRvcy5cbiAgICB0aGl6LiRvcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCRvcGVuZWQpIHJldHVybiAkb3BlbkRlZmVyZWQ7XG5cbiAgICAgIC8vIENyZWFyIHVuIG51ZXZvIGRlZmVyXG4gICAgICAkb3BlbmVkID0gdHJ1ZTtcblxuICAgICAgLy8gZGVqYW1vcyBhYmllcnRhIG51ZXN0cmEgYmFzZSBkZSBkYXRvc1xuICAgICAgaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKCRkYk5hbWUpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKCRkYk5hbWUsICRkYlZlcnNpb24pO1xuXG4gICAgICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcmVxdWVzdC5yZXN1bHQhXG4gICAgICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJlcXVlc3QpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlbCByZXN1bHRhZG9cbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXF1ZXN0LnJlc3VsdCFcbiAgICAgICAgICAkcmVxdWVzdCA9IHJlcXVlc3Q7XG5cbiAgICAgICAgICAvLyBBc2luZ2FyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzIGEgbGEgQkRcbiAgICAgICAgICAkcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAkbG9nLmVycm9yKCdEYXRhYmFzZSBlcnJvcjogJyArIGV2ZW50LnRhcmdldC5lcnJvckNvZGUpO1xuICAgICAgICAgICAgdGhpei4kdHJpZ2dlcigkbmdEYkV2ZW50cy5EQl9FUlJPUiwgW2V2ZW50XSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZXNvbHZlKGV2ZW50LCByZXF1ZXN0KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzXG4gICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJlcXVlc3QuZXJyb3JDb2RlIVxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAkb3BlbkRlZmVyZWQucmVqZWN0KHJlcXVlc3QuZXJyb3JDb2RlKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiAkb3BlbkRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIEFncmVnYSB1biBudWV2byBtb2RlbG9cbiAgICB0aGl6LiRtb2RlbCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnXSk7XG5cbiAgICAgIC8vIEluc3RhbmNpYXIgZWwgbW9kZWxvXG4gICAgICB2YXIgbW9kZWwgPSB0aGl6LiRtb2RlbHNbbmFtZV07XG5cbiAgICAgIC8vIFNpIG5vIGV4aXN0ZSBlbCBtb2RlbG8gY3JlYXJcbiAgICAgIGlmICghbW9kZWwpIG1vZGVsID0gJGlNb2RlbCh0aGl6LCBuYW1lKTtcblxuICAgICAgLy8gR3VhcmRhciBlbCBtb2RlbG8gZW4gbG9zIG1vZGVsb3NcbiAgICAgIHRoaXouJG1vZGVsc1tuYW1lXSA9IG1vZGVsO1xuXG4gICAgICAvLyBSZXRvcm5hciBlbCBtb2RlbG9cbiAgICAgIHJldHVybiBtb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXG4gICAgdGhpei4kY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBtb2RlbElkKSB7XG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcmVxdWVzdCkge1xuICAgICAgICByZXF1ZXN0LnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShtb2RlbE5hbWUsIG1vZGVsSWQpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxuICAgIHRoaXouJGNyZWF0ZUluZGV4ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIHN0b3JlID0gcmVxdWVzdC50cmFuc2FjdGlvbi5vYmplY3RTdG9yZShtb2RlbE5hbWUpO1xuICAgICAgICBzdG9yZS5jcmVhdGVJbmRleChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSB1bmEgdHJhbnNhY2Npw7NuXG4gICAgdGhpei4kdHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBwZXJtcywgYWN0aW9uLCBjYikge1xuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdmdW5jdGlvbicsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSAkcXMuZGVmZXIoY2IpO1xuXG4gICAgICAvLyBDdWFuZG8gc2UgYWJyYSBsYSBCRFxuICAgICAgJG9wZW5EZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIHR4ID0gcmVxdWVzdC5yZXN1bHQudHJhbnNhY3Rpb24obW9kZWxOYW1lLCBwZXJtcyk7XG4gICAgICAgIHZhciByZXN1bHQgPSBhY3Rpb24odHgpO1xuXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgdHgub25jb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCwgcmVzdWx0KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxuICAgICAgICB0eC5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KHR4LmVycm9yKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICB9O1xuXG4gICAgLy8gSW5zZXJ0YSB1biByZWdpc3RybyBlbiBlbCBtb2RlbG9cbiAgICB0aGl6LiRjcmVhdGUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbnN0YW5jZSwgY2IpIHtcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnb2JqZWN0JywgJ2Z1bmN0aW9uJ10sIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSAkcXMuZGVmZXIoY2IpO1xuXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxuICAgICAgdGhpei4kdHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZHdyaXRlJywgZnVuY3Rpb24gKHR4KSB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5wdXQoaW5zdGFuY2UpO1xuXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoZXZlbnQsIGluc3RhbmNlKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gQ291bGQgY2FsbCByZXF1ZXN0LnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChyZXF1ZXN0KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBCdXNjYXIgZW4gZWwgbW9kZWxvXG4gICAgdGhpei4kZmluZCA9IGZ1bmN0aW9uIChNb2RlbCwgbW9kZWxOYW1lLCBzY29wZSwgY2IpIHtcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJywgJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgIHZhciBkZWZlcmVkID0gJHFzLmRlZmVyKGNiKTtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cbiAgICAgIHRoaXouJHRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWRvbmx5JywgZnVuY3Rpb24gKHR4KSB7XG4gICAgICAgIHZhciBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gc3RvcmUub3BlbkN1cnNvcigpO1xuXG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBjdXJzb3IgPSByZXF1ZXN0LnJlc3VsdDtcblxuICAgICAgICAgIC8vIE5vIG1vcmUgbWF0Y2hpbmcgcmVjb3Jkcy5cbiAgICAgICAgICBpZiAoIWN1cnNvcikgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZShyZXN1bHQpO1xuXG4gICAgICAgICAgLy8gQ2FsbGVkIGZvciBlYWNoIG1hdGNoaW5nIHJlY29yZC5cbiAgICAgICAgICByZXN1bHQucHVzaChNb2RlbC4kZ2V0KGN1cnNvci52YWx1ZSkpO1xuICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIENyZWFyIGFsaWFzIHBhcmEgbG9zIGV2ZW50b3MgZW5sYXphciBjYWxsYmFja3MgYSBsb3MgZXZlbnRvc1xuICAgIHZhciBkZWZlcmVkcyA9IHZvaWQgMDtcbiAgICBPYmplY3Qua2V5cyhkZWZlcmVkcyA9IHtcbiAgICAgICRvbk9wZW46ICRvcGVuRGVmZXJlZCxcbiAgICAgICRvblVwZ3JhZGVOZWVkZWQ6ICR1cGdyYWRlTmVlZGVkRGVmZXJlZFxuICAgIH0pLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gJGRiTmFtZSArICcudicgKyAoJGRiVmVyc2lvbiB8fCAxKSArICc6ICcgKyBrZXk7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAkbG9nLmVycm9yKHRleHQsIGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGxvZy5sb2codGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpeltrZXldID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xuICAgICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShjYik7XG4gICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pRGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaU1vZGVsU2VydmljZSAoJHFzLCAkbmdEYlV0aWxzKSB7ICduZ0luamVjdCc7XHJcblxyXG4gIHJldHVybiBmdW5jdGlvbiAkaU1vZGVsKCRkYiwgJG1vZGVsTmFtZSkgeyBsZXQgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgLy8gQ2xhdmUgZGVsIG1vZGVsb1xyXG4gICAgbGV0ICRpZCA9IHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9O1xyXG4gICAgbGV0ICRpbnN0YW5jZXMgPSB7fTtcclxuXHJcbiAgICAvLyBDb25zdHVjdG9yIGRlbCBtb2RlbG9cclxuICAgIGZ1bmN0aW9uICRNb2RlbChkYXRhKSB7XHJcbiAgICAgIHRoaXMuJHNldEF0dHJpYnV0ZXMoZGF0YSk7XHJcbiAgICAgIHRoaXMuJGNvbnN0cnVjdG9yKGRhdGEpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgZWwgSUQgYWwgbW9kZWxvXHJcbiAgICAkTW9kZWwuJGlkID0gZnVuY3Rpb24gKCRwSWlkKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcclxuICAgICAgJGlkID0gJHBJaWRcclxuICAgICAgcmV0dXJuICRNb2RlbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RvIHN0b3JhZ2UgcGFyYSBlbCBtb2RlbG8uXHJcbiAgICAkTW9kZWwuJGNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAkZGIuJGNyZWF0ZVN0b3JlKCRtb2RlbE5hbWUsICRpZCk7XHJcbiAgICAgIHJldHVybiAkTW9kZWw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBpbmRleFxyXG4gICAgJE1vZGVsLiRpbmRleCA9IGZ1bmN0aW9uIChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xyXG4gICAgICAkZGIuJGNyZWF0ZUluZGV4KCRtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcclxuICAgICAgcmV0dXJuICRNb2RlbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gTcOpdG9kbyBxdWUgcGVybWl0ZSBtb2RpZmljYXIgbW9kZWwuXHJcbiAgICAkTW9kZWwuJGJ1aWxkID0gZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XHJcbiAgICAgIGJ1aWxkQ2FsbGJhY2soJE1vZGVsKTtcclxuICAgICAgcmV0dXJuICRNb2RlbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBudWV2YXMgaW5zdGFuY2lhcyBkZSBsb3MgbW9kZWxvc1xyXG4gICAgJE1vZGVsLiRjcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSwgY2IpIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgLy8gU2kgZXMgdW4gYXJyYXlcclxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgcmVjb3JkID0gJE1vZGVsLiRnZXQoZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIHJlY29yZC4kY3JlYXRlKGNiKTtcclxuICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAvLyBPYnRlbmVyIHVuYSBjb3BpYSBkZWwgYXJyYXlcclxuICAgICAgbGV0IGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRhdGEpO1xyXG4gICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgIGxldCBkZWZlcmVkID0gJHFzLmRlZmVyKGNiKTtcclxuXHJcbiAgICAgIChmdW5jdGlvbiBpdGVyYXRpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyBObyBxdWVkYW4gZWxlbWVudG9zIGVuIGVsIGFycmF5XHJcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT0gMCkgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZShyZXN1bHQpO1xyXG5cclxuICAgICAgICAvLyBDcmVhciBlbCBzaWd1aWVudGUgZWxlbWVudG9cclxuICAgICAgICAkTW9kZWwuJGNyZWF0ZShhcnIuc2hpZnQoKSwgZnVuY3Rpb24gKGVyciwgaW5zdGFuY2UpIHtcclxuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkZWZlcmVkLnJlamVjdChlcnIpO1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xyXG4gICAgICAgICAgaXRlcmF0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KSgpO1xyXG5cclxuICAgICAgLy8gRGV2b2x2ZXIgZWwgcHJvbWlzZVxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEJ1c2NhciB1biBjYW1wb1xyXG4gICAgJE1vZGVsLnNlYXJjaERlZXBGaWVsZCA9IGZ1bmN0aW9uIChvYmosIGZpZWxkLCBjYikge1xyXG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgbGV0IGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XHJcbiAgICAgIGxldCBsYXN0RmllbGQgPSBmaWVsZHMucG9wKCk7XHJcblxyXG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIF9zZXQob2JqKSB7XHJcbiAgICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMClcclxuICAgICAgICAgIHJldHVybiBjYihvYmosIGxhc3RGaWVsZCk7XHJcbiAgICAgICAgbGV0IGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAndW5kZWZpbmVkJylcclxuICAgICAgICAgIG9ialtmaWVsZF0gPSB7fTtcclxuICAgICAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcclxuICAgICAgfSkob2JqKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgbW9kZWwgZGUgbGFzIGd1YXJkYWRhcy4gU2kgbm8gZXhpc3RlIGVudG9uY2VcclxuICAgIC8vIHNlIGNyZWFcclxuICAgICRNb2RlbC4kZ2V0ID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnXSk7XHJcblxyXG4gICAgICAvLyBPYnRlbmVyIGVsIGtleSBkZWwgb2JqZXRvXHJcbiAgICAgIGxldCBrZXkgPSAkTW9kZWwuc2VhcmNoRGVlcEZpZWxkKG9iaiwgJGlkLmtleVBhdGgsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcclxuICAgICAgaWYgKCFrZXkpIFxyXG4gICAgICAgIHJldHVybiBuZXcgJE1vZGVsKG9iaik7XHJcblxyXG4gICAgICAvLyBObyBleGlzdGUgbGEgaW5zdGFuY2lhIGVudG9uY2Ugc2UgY3JlYVxyXG4gICAgICBpZiAoISRpbnN0YW5jZXNba2V5XSlcclxuICAgICAgICAkaW5zdGFuY2VzW2tleV0gPSBuZXcgJE1vZGVsKG9iaik7XHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gJGluc3RhbmNlc1trZXldO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBCdXNjYXIgZW4gZWwgbW9kZWxvXHJcbiAgICAkTW9kZWwuJGZpbmQgPSBmdW5jdGlvbiAoc2NvcGUsIGNiKSB7XHJcbiAgICAgIGxldCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgY2IgPSBhcmdzLnBvcCgpOyBzY29wZSA9IGFyZ3MucG9wKCk7XHJcbiAgICAgIHJldHVybiAkZGIuJGZpbmQoJE1vZGVsLCAkbW9kZWxOYW1lLCBzY29wZSwgY2IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgbG9zIGF0cmlidXRvc1xyXG4gICAgJE1vZGVsLnByb3RvdHlwZS4kc2V0QXR0cmlidXRlcyA9IGZ1bmN0aW9uIChkYXRhKSB7IGxldCB0aGl6ID0gdGhpcztcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xyXG4gICAgICBcclxuICAgICAgT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xyXG4gICAgICAgIHRoaXouJHNldChwcm9wZXJ0eSwgZGF0YVtwcm9wZXJ0eV0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcclxuICAgICRNb2RlbC5wcm90b3R5cGUuJGdldCA9IGZ1bmN0aW9uIChmaWVsZCkgeyBsZXQgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHJldHVybiAkTW9kZWwuc2VhcmNoRGVlcEZpZWxkKHRoaXosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgaW4gdmFsb3IgYSB1biBjYW1wb1xyXG4gICAgJE1vZGVsLnByb3RvdHlwZS4kc2V0ID0gZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkgeyBsZXQgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHJldHVybiAkTW9kZWwuc2VhcmNoRGVlcEZpZWxkKHRoaXosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ29uc3R1cmN0b3IgcXVlIHNlIHB1ZWRlIHNvYnJlIGVzY3JpYmlyXHJcbiAgICAkTW9kZWwucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEd1YXJkYSBsb3MgZGF0b3MgZGVsIG9iamV0b1xyXG4gICAgJE1vZGVsLnByb3RvdHlwZS4kY3JlYXRlID0gZnVuY3Rpb24gKGNiKXsgbGV0IHRoaXogPSB0aGlzO1xyXG4gICAgICByZXR1cm4gJGRiLiRjcmVhdGUoJG1vZGVsTmFtZSwgdGhpcywgZnVuY3Rpb24gKGVyciwgZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXJyKSB7IGlmIChjYikgY2IoZXJyKTsgcmV0dXJuOyB9O1xyXG5cclxuICAgICAgICAvLyBBc2lnbmFyIGVsIGdlbmVyYWRvIGFsIG1vZGVsb1xyXG4gICAgICAgIHRoaXouJHNldCgkaWQua2V5UGF0aCwgZXZlbnQudGFyZ2V0LnJlc3VsdClcclxuXHJcbiAgICAgICAgLy8gR3VhcmRhciBsYSBpbnN0YW5jaWEgZW4gbGEgY29sZWNpb24gZGUgaW5zdGFuY2lhc1xyXG4gICAgICAgICRpbnN0YW5jZXNbdGhpei4kZ2V0KCRpZC5rZXlQYXRoKV0gPSB0aGl6O1xyXG5cclxuICAgICAgICBpZiAoY2IpIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xyXG5cclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAkTW9kZWw7XHJcblxyXG4gIH07XHJcblxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lNb2RlbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpTW9kZWxTZXJ2aWNlO1xuZnVuY3Rpb24gaU1vZGVsU2VydmljZSgkcXMsICRuZ0RiVXRpbHMpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gZnVuY3Rpb24gJGlNb2RlbCgkZGIsICRtb2RlbE5hbWUpIHtcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICAvLyBDbGF2ZSBkZWwgbW9kZWxvXG4gICAgdmFyICRpZCA9IHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9O1xuICAgIHZhciAkaW5zdGFuY2VzID0ge307XG5cbiAgICAvLyBDb25zdHVjdG9yIGRlbCBtb2RlbG9cbiAgICBmdW5jdGlvbiAkTW9kZWwoZGF0YSkge1xuICAgICAgdGhpcy4kc2V0QXR0cmlidXRlcyhkYXRhKTtcbiAgICAgIHRoaXMuJGNvbnN0cnVjdG9yKGRhdGEpO1xuICAgIH07XG5cbiAgICAvLyBBc2lnbmEgZWwgSUQgYWwgbW9kZWxvXG4gICAgJE1vZGVsLiRpZCA9IGZ1bmN0aW9uICgkcElpZCkge1xuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xuICAgICAgJGlkID0gJHBJaWQ7XG4gICAgICByZXR1cm4gJE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIGVsIG9iamVjdG8gc3RvcmFnZSBwYXJhIGVsIG1vZGVsby5cbiAgICAkTW9kZWwuJGNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgJGRiLiRjcmVhdGVTdG9yZSgkbW9kZWxOYW1lLCAkaWQpO1xuICAgICAgcmV0dXJuICRNb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQWdyZWdhIHVuIGluZGV4XG4gICAgJE1vZGVsLiRpbmRleCA9IGZ1bmN0aW9uIChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xuICAgICAgJGRiLiRjcmVhdGVJbmRleCgkbW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XG4gICAgICByZXR1cm4gJE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBNw6l0b2RvIHF1ZSBwZXJtaXRlIG1vZGlmaWNhciBtb2RlbC5cbiAgICAkTW9kZWwuJGJ1aWxkID0gZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xuICAgICAgYnVpbGRDYWxsYmFjaygkTW9kZWwpO1xuICAgICAgcmV0dXJuICRNb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSBudWV2YXMgaW5zdGFuY2lhcyBkZSBsb3MgbW9kZWxvc1xuICAgICRNb2RlbC4kY3JlYXRlID0gZnVuY3Rpb24gKGRhdGEsIGNiKSB7XG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIC8vIFNpIGVzIHVuIGFycmF5XG4gICAgICBpZiAoZGF0YS5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgcmVjb3JkID0gJE1vZGVsLiRnZXQoZGF0YSk7XG4gICAgICAgIHJldHVybiByZWNvcmQuJGNyZWF0ZShjYik7XG4gICAgICB9XG5cbiAgICAgIC8vIE9idGVuZXIgdW5hIGNvcGlhIGRlbCBhcnJheVxuICAgICAgdmFyIGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRhdGEpO1xuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgdmFyIGRlZmVyZWQgPSAkcXMuZGVmZXIoY2IpO1xuXG4gICAgICAoZnVuY3Rpb24gaXRlcmF0aW9uKCkge1xuXG4gICAgICAgIC8vIE5vIHF1ZWRhbiBlbGVtZW50b3MgZW4gZWwgYXJyYXlcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT0gMCkgcmV0dXJuIGRlZmVyZWQucmVzb2x2ZShyZXN1bHQpO1xuXG4gICAgICAgIC8vIENyZWFyIGVsIHNpZ3VpZW50ZSBlbGVtZW50b1xuICAgICAgICAkTW9kZWwuJGNyZWF0ZShhcnIuc2hpZnQoKSwgZnVuY3Rpb24gKGVyciwgaW5zdGFuY2UpIHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZGVmZXJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICByZXN1bHQucHVzaChpbnN0YW5jZSk7XG4gICAgICAgICAgaXRlcmF0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSkoKTtcblxuICAgICAgLy8gRGV2b2x2ZXIgZWwgcHJvbWlzZVxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIEJ1c2NhciB1biBjYW1wb1xuICAgICRNb2RlbC5zZWFyY2hEZWVwRmllbGQgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgY2IpIHtcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdzdHJpbmcnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIHZhciBmaWVsZHMgPSBmaWVsZC5zcGxpdCgnLicpO1xuICAgICAgdmFyIGxhc3RGaWVsZCA9IGZpZWxkcy5wb3AoKTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIF9zZXQob2JqKSB7XG4gICAgICAgIGlmIChmaWVsZHMubGVuZ3RoID09IDApIHJldHVybiBjYihvYmosIGxhc3RGaWVsZCk7XG4gICAgICAgIHZhciBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xuICAgICAgICBpZiAodHlwZW9mIG9ialtmaWVsZF0gPT09ICd1bmRlZmluZWQnKSBvYmpbZmllbGRdID0ge307XG4gICAgICAgIHJldHVybiBfc2V0KG9ialtmaWVsZF0pO1xuICAgICAgfShvYmopO1xuICAgIH07XG5cbiAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGVsIG1vZGVsIGRlIGxhcyBndWFyZGFkYXMuIFNpIG5vIGV4aXN0ZSBlbnRvbmNlXG4gICAgLy8gc2UgY3JlYVxuICAgICRNb2RlbC4kZ2V0ID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xuXG4gICAgICAvLyBPYnRlbmVyIGVsIGtleSBkZWwgb2JqZXRvXG4gICAgICB2YXIga2V5ID0gJE1vZGVsLnNlYXJjaERlZXBGaWVsZChvYmosICRpZC5rZXlQYXRoLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIEVsIG9iamV0byBubyB0aWVuZSBJRFxuICAgICAgaWYgKCFrZXkpIHJldHVybiBuZXcgJE1vZGVsKG9iaik7XG5cbiAgICAgIC8vIE5vIGV4aXN0ZSBsYSBpbnN0YW5jaWEgZW50b25jZSBzZSBjcmVhXG4gICAgICBpZiAoISRpbnN0YW5jZXNba2V5XSkgJGluc3RhbmNlc1trZXldID0gbmV3ICRNb2RlbChvYmopO1xuXG4gICAgICByZXR1cm4gJGluc3RhbmNlc1trZXldO1xuICAgIH07XG5cbiAgICAvLyBCdXNjYXIgZW4gZWwgbW9kZWxvXG4gICAgJE1vZGVsLiRmaW5kID0gZnVuY3Rpb24gKHNjb3BlLCBjYikge1xuICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgY2IgPSBhcmdzLnBvcCgpO3Njb3BlID0gYXJncy5wb3AoKTtcbiAgICAgIHJldHVybiAkZGIuJGZpbmQoJE1vZGVsLCAkbW9kZWxOYW1lLCBzY29wZSwgY2IpO1xuICAgIH07XG5cbiAgICAvLyBBc2lnbmEgbG9zIGF0cmlidXRvc1xuICAgICRNb2RlbC5wcm90b3R5cGUuJHNldEF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xuXG4gICAgICBPYmplY3Qua2V5cyhkYXRhKS5tYXAoZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgIHRoaXouJHNldChwcm9wZXJ0eSwgZGF0YVtwcm9wZXJ0eV0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGRlIHVuYSBwcm9waWVkYWRcbiAgICAkTW9kZWwucHJvdG90eXBlLiRnZXQgPSBmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHJldHVybiAkTW9kZWwuc2VhcmNoRGVlcEZpZWxkKHRoaXosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBpbiB2YWxvciBhIHVuIGNhbXBvXG4gICAgJE1vZGVsLnByb3RvdHlwZS4kc2V0ID0gZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgcmV0dXJuICRNb2RlbC5zZWFyY2hEZWVwRmllbGQodGhpeiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICBvYmpbbGFzdEZpZWxkXSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBDb25zdHVyY3RvciBxdWUgc2UgcHVlZGUgc29icmUgZXNjcmliaXJcbiAgICAkTW9kZWwucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7fTtcblxuICAgIC8vIEd1YXJkYSBsb3MgZGF0b3MgZGVsIG9iamV0b1xuICAgICRNb2RlbC5wcm90b3R5cGUuJGNyZWF0ZSA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgcmV0dXJuICRkYi4kY3JlYXRlKCRtb2RlbE5hbWUsIHRoaXMsIGZ1bmN0aW9uIChlcnIsIGV2ZW50KSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBpZiAoY2IpIGNiKGVycik7cmV0dXJuO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFzaWduYXIgZWwgZ2VuZXJhZG8gYWwgbW9kZWxvXG4gICAgICAgIHRoaXouJHNldCgkaWQua2V5UGF0aCwgZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG5cbiAgICAgICAgLy8gR3VhcmRhciBsYSBpbnN0YW5jaWEgZW4gbGEgY29sZWNpb24gZGUgaW5zdGFuY2lhc1xuICAgICAgICAkaW5zdGFuY2VzW3RoaXouJGdldCgkaWQua2V5UGF0aCldID0gdGhpejtcblxuICAgICAgICBpZiAoY2IpIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiAkTW9kZWw7XG4gIH07XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaU1vZGVsLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==