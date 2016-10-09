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
	      if (thiz.resolved && !thiz.error) {
	        thensResolved();
	      }
	      return thiz;
	    };
	
	    thiz.promise.catch = function (cb) {
	      catchs.push(cb);
	      if (thiz.resolved && thiz.error) {
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
	
	      if (thiz.resolved) {
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
	      thiz.$transaction(modelName, 'readonly', function (tx) {
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
	          if (cursor) {
	            // Called for each matching record.
	            result.push(Model.$get(cursor.value));
	            cursor.continue();
	          } else {
	            // No more matching records.
	            console.log(result);
	          }
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
	    function $Model() {
	      this.$constructor.apply(this, arguments);
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
	        var $record = new $Model(data);
	        return $record.$create(cb);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOThlNTM1YjhlMTg5MWI5M2UzYjciLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy9uZ0RiVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL25nRGJVdGlscy5qcz9jMWEzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2V2ZW50cy5qcz81NzA0Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9xcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcXMuanM/NjQzOSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaURiLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pRGIuanM/MDUwMiIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaU1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pTW9kZWwuanM/ZTFjYyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29uc3RhbnQiLCJzZXJ2aWNlIiwibmdEYlV0aWxzIiwiJHEiLCJpc0NhbGxiYWNrIiwiY2IiLCJ0aHJvd0Vycm9yIiwidW5kZWZpbmVkIiwibXVzdEJlQ2FsbGJhY2siLCJlcnIiLCJFcnJvciIsIm5hbWUiLCJtdXN0QmUiLCJ2YWx1ZSIsInR5cGVzIiwiaSIsImpvaW4iLCJ2YWxpZGF0ZSIsImFyZ3MiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsInZhbHVlcyIsIkRCX0VSUk9SIiwicXMiLCJxc0NsYXNzIiwidGhpeiIsInRoZW5zIiwidGhlbnNSZWFkeSIsImNhdGNocyIsImNhdGNoc1JlYWR5IiwicmVzdWx0QXJncyIsImVycm9yIiwicHJvbWlzZSIsIiRyZXNvbHZlZCIsInRoZW5zUmVzb2x2ZWQiLCJsZW5ndGgiLCJzaGlmdCIsImFwcGx5IiwicHVzaCIsImNhdGNoc1Jlc29sdmVkIiwicmVzb2x2ZSIsImFyZ3VtZW50cyIsInJlamVjdCIsInRoZW4iLCJyZXNvbHZlZCIsImNhdGNoIiwiZG9uZSIsImNvbmNhdCIsImRlZmVyIiwiaURiU2VydmljZSIsIiRxcyIsIiRpTW9kZWwiLCIkbmdEYlV0aWxzIiwiJG5nRGJFdmVudHMiLCIkbG9nIiwiaW5kZXhlZERCIiwid2luZG93IiwibW96SW5kZXhlZERCIiwid2Via2l0SW5kZXhlZERCIiwibXNJbmRleGVkREIiLCJJREJUcmFuc2FjdGlvbiIsIndlYmtpdElEQlRyYW5zYWN0aW9uIiwibXNJREJUcmFuc2FjdGlvbiIsIklEQktleVJhbmdlIiwid2Via2l0SURCS2V5UmFuZ2UiLCJtc0lEQktleVJhbmdlIiwiYWxlcnQiLCIkaURiIiwiJGRiTmFtZSIsIiRkYlZlcnNpb24iLCIkZXZlbnRzQ2FsbGJhY2tzIiwiJHVwZ3JhZGVOZWVkZWREZWZlcmVkIiwiJG9wZW5EZWZlcmVkIiwiJG9wZW5lZCIsIiRyZXF1ZXN0IiwiJG1vZGVscyIsIiRiaW5kIiwiZXZlbnROYW1lIiwiJHVuYmluZCIsImlkeCIsImluZGV4T2YiLCJzcGxpY2UiLCIkdHJpZ2dlciIsImxvZyIsIiRlcnJvciIsIiRvcGVuIiwicmVxdWVzdCIsIm9wZW4iLCJvbnVwZ3JhZGVuZWVkZWQiLCJldmVudCIsIm9uc3VjY2VzcyIsIm9uZXJyb3IiLCJ0YXJnZXQiLCJlcnJvckNvZGUiLCIkbW9kZWwiLCJtb2RlbCIsIiRjcmVhdGVTdG9yZSIsIm1vZGVsTmFtZSIsIm1vZGVsSWQiLCJyZXN1bHQiLCJjcmVhdGVPYmplY3RTdG9yZSIsIiRjcmVhdGVJbmRleCIsImluZGV4TmFtZSIsImZpZWxkTmFtZSIsIm9wdHMiLCJzdG9yZSIsInRyYW5zYWN0aW9uIiwib2JqZWN0U3RvcmUiLCJjcmVhdGVJbmRleCIsIiR0cmFuc2FjdGlvbiIsInBlcm1zIiwiYWN0aW9uIiwiZGVmZXJlZCIsInR4Iiwib25jb21wbGV0ZSIsIm9uYWJvcnQiLCIkY3JlYXRlIiwiaW5zdGFuY2UiLCJwdXQiLCIkZmluZCIsIk1vZGVsIiwic2NvcGUiLCJvcGVuQ3Vyc29yIiwiY3Vyc29yIiwiJGdldCIsImNvbnRpbnVlIiwiY29uc29sZSIsImRlZmVyZWRzIiwiT2JqZWN0Iiwia2V5cyIsIiRvbk9wZW4iLCIkb25VcGdyYWRlTmVlZGVkIiwibWFwIiwia2V5IiwidGV4dCIsImlNb2RlbFNlcnZpY2UiLCIkZGIiLCIkbW9kZWxOYW1lIiwiJGlkIiwia2V5UGF0aCIsImF1dG9JbmNyZW1lbnQiLCIkaW5zdGFuY2VzIiwiJE1vZGVsIiwiJGNvbnN0cnVjdG9yIiwiJHBJaWQiLCIkaW5kZXgiLCIkYnVpbGQiLCJidWlsZENhbGxiYWNrIiwiZGF0YSIsIiRyZWNvcmQiLCJhcnIiLCJpdGVyYXRpb24iLCJzZWFyY2hEZWVwRmllbGQiLCJvYmoiLCJmaWVsZCIsImZpZWxkcyIsInNwbGl0IiwibGFzdEZpZWxkIiwicG9wIiwiX3NldCIsIiRzZXRBdHRyaWJ1dGVzIiwicHJvcGVydHkiLCIkc2V0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTs7QUFFQTs7QUNFQSxLQUFJLGNBQWMsdUJBQXVCOztBRER6Qzs7QUNLQSxLQUFJLFdBQVcsdUJBQXVCOztBREp0Qzs7QUNRQSxLQUFJLE9BQU8sdUJBQXVCOztBRE5sQzs7QUNVQSxLQUFJLFFBQVEsdUJBQXVCOztBRFRuQzs7QUNhQSxLQUFJLFdBQVcsdUJBQXVCOztBQUV0QyxVQUFTLHVCQUF1QixLQUFLLEVBQUUsT0FBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsU0FBUzs7QURidkZBLFNBQVFDLE9BQU8s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QUlKLElBQUlBLEdBQUdJLEtBQU07VUFBUzs7O1NBR3JDa0IsS0FBS3lJLEtBQUt4QixJQUFJQyxTQUFTbEQsTUFBTUcsT0FBT087OztTQUdwQzBDLFdBQVdwSCxLQUFLbUcsS0FBS2MsSUFBSUMsWUFBWWxIOztTQUVyQyxJQUFJdEIsSUFBSUEsR0FBR2tDLE1BQU0sTUFBTSxDQUFDLE1BQU1VLE9BQU85QixNQUFNQyxVQUFVQyxNQUFNQyxLQUFLcUI7Ozs7S0FLcEUsT0FBT3FHIiwiZmlsZSI6Im5nLWRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5OGU1MzViOGUxODkxYjkzZTNiN1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBuZ0RiVXRpbHMgZnJvbSAnLi91dGlscy9uZ0RiVXRpbHMnO1xyXG5pbXBvcnQgbmdEYkV2ZW50cyBmcm9tICcuL3V0aWxzL2V2ZW50cyc7XHJcbmltcG9ydCBxcyBmcm9tICcuL3V0aWxzL3FzJztcclxuXHJcbmltcG9ydCBpRGIgZnJvbSAnLi9zZXJ2aWNlcy9pRGInO1xyXG5pbXBvcnQgaU1vZGVsIGZyb20gJy4vc2VydmljZXMvaU1vZGVsJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCduZ0RiJywgW10pXHJcbiAgLmNvbnN0YW50KCdOR19EQl9WRVJTSU9OJywgJzAuMC4xJylcclxuICAuc2VydmljZSgnJG5nRGJFdmVudHMnLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZ0RiRXZlbnRzOyB9KVxyXG4gIC5zZXJ2aWNlKCckbmdEYlV0aWxzJywgbmdEYlV0aWxzKVxyXG4gIC5zZXJ2aWNlKCckcXMnLCBxcylcclxuICAuc2VydmljZSgnJGlEYicsIGlEYilcclxuICAuc2VydmljZSgnJGlNb2RlbCcsIGlNb2RlbCk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX25nRGJVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMvbmdEYlV0aWxzJyk7XG5cbnZhciBfbmdEYlV0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX25nRGJVdGlscyk7XG5cbnZhciBfZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKTtcblxudmFyIF9ldmVudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXZlbnRzKTtcblxudmFyIF9xcyA9IHJlcXVpcmUoJy4vdXRpbHMvcXMnKTtcblxudmFyIF9xczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9xcyk7XG5cbnZhciBfaURiID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pRGInKTtcblxudmFyIF9pRGIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaURiKTtcblxudmFyIF9pTW9kZWwgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lNb2RlbCcpO1xuXG52YXIgX2lNb2RlbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pTW9kZWwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5hbmd1bGFyLm1vZHVsZSgnbmdEYicsIFtdKS5jb25zdGFudCgnTkdfREJfVkVSU0lPTicsICcwLjAuMScpLnNlcnZpY2UoJyRuZ0RiRXZlbnRzJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gX2V2ZW50czIuZGVmYXVsdDtcbn0pLnNlcnZpY2UoJyRuZ0RiVXRpbHMnLCBfbmdEYlV0aWxzMi5kZWZhdWx0KS5zZXJ2aWNlKCckcXMnLCBfcXMyLmRlZmF1bHQpLnNlcnZpY2UoJyRpRGInLCBfaURiMi5kZWZhdWx0KS5zZXJ2aWNlKCckaU1vZGVsJywgX2lNb2RlbDIuZGVmYXVsdCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBuZ0RiVXRpbHMgKCRxKSB7ICduZ0luamVjdCdcclxuXHJcbiAgLy8gRnVuY2lvbiBwYXJhIGRldGVybWluYXIgc2kgZXMgdW4gY2FsbGJhY2sgdsOhbGlkbyBvIG5vXHJcbiAgZnVuY3Rpb24gaXNDYWxsYmFjayAoY2IsIHRocm93RXJyb3IpIHtcclxuXHJcbiAgICBpZiAodHlwZW9mIGNiID09ICdmdW5jdGlvbicgfHwgY2IgPT0gbnVsbCB8fCBjYiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gIH1cclxuXHJcbiAgLy8gU2kgZWwgY2FsbGJhY2sgbm8gZXMgdsOhbGlkbyBsYW56YSB1biBlcnJwb3JcclxuICBmdW5jdGlvbiBtdXN0QmVDYWxsYmFjayAoY2IpIHtcclxuICAgIGlmIChpc0NhbGxiYWNrKGNiKSkgcmV0dXJuO1xyXG5cclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgY2FsbGJhY2snKTtcclxuICAgIGVyci5uYW1lID0gJ0ludmFsaWRDYWxsYmFjaydcclxuXHJcbiAgICB0aHJvdyBlcnI7XHJcblxyXG4gIH1cclxuXHJcbiAgLy8gR2VuZXJhIHVuIGVycm9yIHNpIGVsIHZhbG9yIG5vIGVzIGRlbCB0aXBvIGluZGljYWRvIHBvciBwYXJhbWV0cm9cclxuICBmdW5jdGlvbiBtdXN0QmUgKHZhbHVlLCB0eXBlcykge1xyXG4gICAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xyXG4gICAgZm9yKHZhciBpIGluIHR5cGVzKXtcclxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSB0eXBlc1tpXSkgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZTogJyt2YWx1ZSsnIG11c3QgYmUgJyt0eXBlcy5qb2luKCcgb3IgJykpO1xyXG4gICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbHVlJ1xyXG4gICAgdGhyb3cgZXJyO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIFZhbGlkYSB1biBhcnJheSBkZSBhcmd1bWVudG9zIGNvbiB1biBhcnJhIGRlIHRpcG9zXHJcbiAgZnVuY3Rpb24gdmFsaWRhdGUgKGFyZ3MsIHR5cGVzKSB7XHJcblxyXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xyXG4gICAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xyXG4gICAgZm9yICh2YXIgaSBpbiBhcmdzKXtcclxuICAgICAgaWYgKHR5cGVzW2ldKXtcclxuICAgICAgICBpZiAodHlwZXNbaV0gPT0gbnVsbCl7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0eXBlc1tpXSA9PSAnc3RyaW5nJyB8fCB0eXBlb2YgdHlwZXNbaV0gPT0gJ29iamVjdCcpe1xyXG4gICAgICAgICAgbXVzdEJlKGFyZ3NbaV0sIHR5cGVzW2ldKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHR5cGVzW2ldID09ICdmdW5jaW9uJyl7XHJcbiAgICAgICAgICB0eXBlc1tpXShhcmdzW2ldKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWxpZGF0b3IgdG86ICcrdmFsdWVzW2ldKycgbXVzdCBiZSAnK3R5cGVzW2ldKTtcclxuICAgICAgICBlcnIubmFtZSA9ICdJbnZhbGlkVmFsaWRhdG9yJ1xyXG4gICAgICAgIHRocm93IGVycjtcclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaXNDYWxsYmFjazogaXNDYWxsYmFjayxcclxuICAgIG11c3RCZUNhbGxiYWNrOiBtdXN0QmVDYWxsYmFjayxcclxuICAgIG11c3RCZTogbXVzdEJlLFxyXG4gICAgdmFsaWRhdGU6IHZhbGlkYXRlLFxyXG4gIH07XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvbmdEYlV0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IG5nRGJVdGlscztcbmZ1bmN0aW9uIG5nRGJVdGlscygkcSkge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIEZ1bmNpb24gcGFyYSBkZXRlcm1pbmFyIHNpIGVzIHVuIGNhbGxiYWNrIHbDoWxpZG8gbyBub1xuXG4gIGZ1bmN0aW9uIGlzQ2FsbGJhY2soY2IsIHRocm93RXJyb3IpIHtcblxuICAgIGlmICh0eXBlb2YgY2IgPT0gJ2Z1bmN0aW9uJyB8fCBjYiA9PSBudWxsIHx8IGNiID09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gU2kgZWwgY2FsbGJhY2sgbm8gZXMgdsOhbGlkbyBsYW56YSB1biBlcnJwb3JcbiAgZnVuY3Rpb24gbXVzdEJlQ2FsbGJhY2soY2IpIHtcbiAgICBpZiAoaXNDYWxsYmFjayhjYikpIHJldHVybjtcblxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgY2FsbGJhY2snKTtcbiAgICBlcnIubmFtZSA9ICdJbnZhbGlkQ2FsbGJhY2snO1xuXG4gICAgdGhyb3cgZXJyO1xuICB9XG5cbiAgLy8gR2VuZXJhIHVuIGVycm9yIHNpIGVsIHZhbG9yIG5vIGVzIGRlbCB0aXBvIGluZGljYWRvIHBvciBwYXJhbWV0cm9cbiAgZnVuY3Rpb24gbXVzdEJlKHZhbHVlLCB0eXBlcykge1xuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcbiAgICBmb3IgKHZhciBpIGluIHR5cGVzKSB7XG4gICAgICBpZiAoKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PSB0eXBlc1tpXSkgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlOiAnICsgdmFsdWUgKyAnIG11c3QgYmUgJyArIHR5cGVzLmpvaW4oJyBvciAnKSk7XG4gICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbHVlJztcbiAgICB0aHJvdyBlcnI7XG4gIH1cblxuICAvLyBWYWxpZGEgdW4gYXJyYXkgZGUgYXJndW1lbnRvcyBjb24gdW4gYXJyYSBkZSB0aXBvc1xuICBmdW5jdGlvbiB2YWxpZGF0ZShhcmdzLCB0eXBlcykge1xuXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcbiAgICBmb3IgKHZhciBpIGluIGFyZ3MpIHtcbiAgICAgIGlmICh0eXBlc1tpXSkge1xuICAgICAgICBpZiAodHlwZXNbaV0gPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZXNbaV0gPT0gJ3N0cmluZycgfHwgX3R5cGVvZih0eXBlc1tpXSkgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBtdXN0QmUoYXJnc1tpXSwgdHlwZXNbaV0pO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZXNbaV0gPT0gJ2Z1bmNpb24nKSB7XG4gICAgICAgICAgdHlwZXNbaV0oYXJnc1tpXSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbGlkYXRvciB0bzogJyArIHZhbHVlc1tpXSArICcgbXVzdCBiZSAnICsgdHlwZXNbaV0pO1xuICAgICAgICBlcnIubmFtZSA9ICdJbnZhbGlkVmFsaWRhdG9yJztcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaXNDYWxsYmFjazogaXNDYWxsYmFjayxcbiAgICBtdXN0QmVDYWxsYmFjazogbXVzdEJlQ2FsbGJhY2ssXG4gICAgbXVzdEJlOiBtdXN0QmUsXG4gICAgdmFsaWRhdGU6IHZhbGlkYXRlXG4gIH07XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvbmdEYlV0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gTm9tYnJlIGRlIGxvcyBldmVudG9zXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBEQl9FUlJPUjogJ2NiLmVycm9yJyxcclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9ldmVudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIE5vbWJyZSBkZSBsb3MgZXZlbnRvc1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICBEQl9FUlJPUjogJ2NiLmVycm9yJ1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9ldmVudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBxcyAoKSB7ICduZ0luamVjdCdcclxuICBcclxuICBmdW5jdGlvbiBxc0NsYXNzIChjYikgeyBsZXQgdGhpeiA9IHRoaXM7XHJcbiAgICBcclxuICAgIGxldCB0aGVucyA9IFtdO1xyXG4gICAgbGV0IHRoZW5zUmVhZHkgPSBbXTtcclxuICAgIGxldCBjYXRjaHMgPSBbXTtcclxuICAgIGxldCBjYXRjaHNSZWFkeSA9IFtdO1xyXG4gICAgbGV0IHJlc3VsdEFyZ3MgPSBudWxsO1xyXG4gICAgbGV0IGVycm9yID0gbnVsbDtcclxuXHJcbiAgICB0aGl6LnByb21pc2UgPSB7fTtcclxuICAgIHRoaXouJHJlc29sdmVkID0gZmFsc2U7XHJcblxyXG4gICAgZnVuY3Rpb24gdGhlbnNSZXNvbHZlZCAoKSB7XHJcbiAgICAgIGlmICghdGhlbnMubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgIHZhciBjYiA9IHRoZW5zLnNoaWZ0KCk7XHJcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXoucmVzdWx0QXJncyk7XHJcbiAgICAgIHRoZW5zUmVhZHkucHVzaChjYik7XHJcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYXRjaHNSZXNvbHZlZCAoKSB7XHJcbiAgICAgIGlmICghY2F0Y2hzLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICB2YXIgY2IgPSBjYXRjaHMuc2hpZnQoKTtcclxuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XHJcbiAgICAgIGNhdGNoc1JlYWR5LnB1c2goY2IpO1xyXG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXoucmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XHJcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgdGhpei5yZXN1bHRBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnJlamVjdCA9IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XHJcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgdGhpei5lcnJvciA9IGVyciB8fCB7fTtcclxuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgdGhlbnMucHVzaChjYik7XHJcbiAgICAgIGlmICh0aGl6LnJlc29sdmVkICYmICF0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnByb21pc2UuY2F0Y2ggPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgY2F0Y2hzLnB1c2goY2IpO1xyXG4gICAgICBpZiAodGhpei5yZXNvbHZlZCAmJiB0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpejtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLmRvbmUgPSBmdW5jdGlvbiAoY2IpIHtcclxuXHJcbiAgICAgIHRoZW5zLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQodGhpei5yZXN1bHRBcmdzKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY2F0Y2hzLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh0aGl6LnJlc29sdmVkKSB7XHJcbiAgICAgICAgaWYgKCF0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgaWYoY2IpIHRoaXoucHJvbWlzZS5kb25lKGNiKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgLy8gQ3JlYSB1bmEgaW5zdGFuY2lhIGRlbCBkZWZlcmVkXHJcbiAgcXNDbGFzcy5kZWZlciA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgcmV0dXJuIG5ldyBxc0NsYXNzKGNiKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gcXNDbGFzcztcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9xcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHFzO1xuZnVuY3Rpb24gcXMoKSB7XG4gICduZ0luamVjdCc7XG5cbiAgZnVuY3Rpb24gcXNDbGFzcyhjYikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgIHZhciB0aGVucyA9IFtdO1xuICAgIHZhciB0aGVuc1JlYWR5ID0gW107XG4gICAgdmFyIGNhdGNocyA9IFtdO1xuICAgIHZhciBjYXRjaHNSZWFkeSA9IFtdO1xuICAgIHZhciByZXN1bHRBcmdzID0gbnVsbDtcbiAgICB2YXIgZXJyb3IgPSBudWxsO1xuXG4gICAgdGhpei5wcm9taXNlID0ge307XG4gICAgdGhpei4kcmVzb2x2ZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIHRoZW5zUmVzb2x2ZWQoKSB7XG4gICAgICBpZiAoIXRoZW5zLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgdmFyIGNiID0gdGhlbnMuc2hpZnQoKTtcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXoucmVzdWx0QXJncyk7XG4gICAgICB0aGVuc1JlYWR5LnB1c2goY2IpO1xuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhdGNoc1Jlc29sdmVkKCkge1xuICAgICAgaWYgKCFjYXRjaHMubGVuZ3RoKSByZXR1cm47XG4gICAgICB2YXIgY2IgPSBjYXRjaHMuc2hpZnQoKTtcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xuICAgICAgY2F0Y2hzUmVhZHkucHVzaChjYik7XG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgIH1cblxuICAgIHRoaXoucmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgdGhpei5yZXN1bHRBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICB9O1xuXG4gICAgdGhpei5yZWplY3QgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgIHRoaXouZXJyb3IgPSBlcnIgfHwge307XG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgIH07XG5cbiAgICB0aGl6LnByb21pc2UudGhlbiA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgdGhlbnMucHVzaChjYik7XG4gICAgICBpZiAodGhpei5yZXNvbHZlZCAmJiAhdGhpei5lcnJvcikge1xuICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgdGhpei5wcm9taXNlLmNhdGNoID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICBjYXRjaHMucHVzaChjYik7XG4gICAgICBpZiAodGhpei5yZXNvbHZlZCAmJiB0aGl6LmVycm9yKSB7XG4gICAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgdGhpei5wcm9taXNlLmRvbmUgPSBmdW5jdGlvbiAoY2IpIHtcblxuICAgICAgdGhlbnMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQodGhpei5yZXN1bHRBcmdzKSk7XG4gICAgICB9KTtcblxuICAgICAgY2F0Y2hzLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpei5yZXNvbHZlZCkge1xuICAgICAgICBpZiAoIXRoaXouZXJyb3IpIHtcbiAgICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgaWYgKGNiKSB0aGl6LnByb21pc2UuZG9uZShjYik7XG4gIH07XG5cbiAgLy8gQ3JlYSB1bmEgaW5zdGFuY2lhIGRlbCBkZWZlcmVkXG4gIHFzQ2xhc3MuZGVmZXIgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICByZXR1cm4gbmV3IHFzQ2xhc3MoY2IpO1xuICB9O1xuXG4gIHJldHVybiBxc0NsYXNzO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL3FzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlEYlNlcnZpY2UgKCRxcywgJGlNb2RlbCwgJG5nRGJVdGlscywgJG5nRGJFdmVudHMsICRsb2cpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxyXG4gIGNvbnN0IGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQjtcclxuICAvLyBObyB1c2UgXCJjb25zdCBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXHJcbiAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XHJcbiAgY29uc3QgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xyXG4gIGNvbnN0IElEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcclxuICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxyXG4gIFxyXG4gIGlmICghaW5kZXhlZERCKSB7XHJcbiAgICBhbGVydChcIlN1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhc1wiKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8vIENsYXNlIHBhcmEgbGEgY3JlYWNpw7NuIGRlIGluc3RhbmNpYXMgZGUgbGEgQkRcclxuICByZXR1cm4gZnVuY3Rpb24gJGlEYigkZGJOYW1lLCAkZGJWZXJzaW9uKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ251bWJlciddKTtcclxuXHJcbiAgICAvLyBNYW5lamFkb3JlcyBkZSBldmVudG9zLlxyXG4gICAgbGV0ICRldmVudHNDYWxsYmFja3MgPSB7fTtcclxuICAgIGxldCAkdXBncmFkZU5lZWRlZERlZmVyZWQgPSAkcXMuZGVmZXIoKTtcclxuICAgIGxldCAkb3BlbkRlZmVyZWQgPSAkcXMuZGVmZXIoKTtcclxuICAgIGxldCAkb3BlbmVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gSW5zdGFuY2lhIGRlIGxhIGJhc2UgZGUgZGF0b3M7XHJcbiAgICBsZXQgJHJlcXVlc3QgPSBudWxsO1xyXG4gICAgdGhpei4kbW9kZWxzID0ge307XHJcbiAgICBcclxuICAgIC8vIEFncmVnYXIgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xyXG4gICAgdGhpei4kYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcclxuXHJcbiAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKXtcclxuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnB1c2goY2IpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy9SZW11ZXZlIHVuIG1hbmVqYWRvciBkZSBldmVudG9cclxuICAgIHRoaXouJHVuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcclxuXHJcbiAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSByZXR1cm47XHJcblxyXG4gICAgICAvLyBCdXNjYXIgZWwgY2JcclxuICAgICAgY29uc3QgaWR4ID0gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLmluZGV4T2YoY2IpO1xyXG5cclxuICAgICAgLy8gU2kgc2UgZW5jb250cm8gZWwgY2IgcmVtb3ZlcmxvXHJcbiAgICAgIGlmIChpZHggIT0gLTEpe1xyXG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGlzcGFyYSB1biBldmVudG9cclxuICAgIHRoaXouJHRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnXSk7XHJcblxyXG4gICAgICAkbG9nLmxvZygkZGJOYW1lKycudicrKCRkYlZlcnNpb258fDEpKyc6ICcrZXZlbnROYW1lKTtcclxuXHJcbiAgICAgIGZvcihsZXQgaSBpbiAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pe1xyXG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXVtpXS5hcHBseSh0aGl6LCBhcmdzKTtcclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ2FsbGJhY2tzIHBhcmEgbG9zIGVycm9yZXNcclxuICAgIHRoaXouJGVycm9yID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIHRoaXouJGJpbmQoJG5nRGJFdmVudHMuREJfRVJST1IsIGNiKTtcclxuICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFicmlyIHVuYSBCYXNlIGRlIGRhdG9zLlxyXG4gICAgdGhpei4kb3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCRvcGVuZWQpIHJldHVybiAkb3BlbkRlZmVyZWQ7XHJcblxyXG4gICAgICAvLyBDcmVhciB1biBudWV2byBkZWZlclxyXG4gICAgICAkb3BlbmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIC8vIGRlamFtb3MgYWJpZXJ0YSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcclxuICAgICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKCRkYk5hbWUsICRkYlZlcnNpb24pO1xyXG5cclxuICAgICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXF1ZXN0LnJlc3VsdCFcclxuICAgICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucmVzb2x2ZShldmVudCwgcmVxdWVzdCk7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGVsIHJlc3VsdGFkb1xyXG4gICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJlcXVlc3QucmVzdWx0IVxyXG4gICAgICAgICRyZXF1ZXN0ID0gcmVxdWVzdDtcclxuXHJcbiAgICAgICAgLy8gQXNpbmdhciBlbCBtYW5lamFkb3IgZGUgZXJyb3JlcyBhIGxhIEJEXHJcbiAgICAgICAgJHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgJGxvZy5lcnJvcignRGF0YWJhc2UgZXJyb3I6ICcrIGV2ZW50LnRhcmdldC5lcnJvckNvZGUpO1xyXG4gICAgICAgICAgdGhpei4kdHJpZ2dlcigkbmdEYkV2ZW50cy5EQl9FUlJPUiwgW2V2ZW50XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkb3BlbkRlZmVyZWQucmVzb2x2ZShldmVudCwgcmVxdWVzdCk7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGUgZXJyb3Jlc1xyXG4gICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJlcXVlc3QuZXJyb3JDb2RlIVxyXG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAkb3BlbkRlZmVyZWQucmVqZWN0KHJlcXVlc3QuZXJyb3JDb2RlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuICRvcGVuRGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBudWV2byBtb2RlbG9cclxuICAgIHRoaXouJG1vZGVsID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJ10pO1xyXG5cclxuICAgICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG9cclxuICAgICAgbGV0IG1vZGVsID0gdGhpei4kbW9kZWxzW25hbWVdO1xyXG5cclxuICAgICAgLy8gU2kgbm8gZXhpc3RlIGVsIG1vZGVsbyBjcmVhclxyXG4gICAgICBpZighbW9kZWwpXHJcbiAgICAgICAgbW9kZWwgPSAkaU1vZGVsKHRoaXosIG5hbWUpO1xyXG5cclxuICAgICAgLy8gR3VhcmRhciBlbCBtb2RlbG8gZW4gbG9zIG1vZGVsb3NcclxuICAgICAgdGhpei4kbW9kZWxzW25hbWVdID0gbW9kZWw7XHJcblxyXG4gICAgICAvLyBSZXRvcm5hciBlbCBtb2RlbG9cclxuICAgICAgcmV0dXJuIG1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXHJcbiAgICB0aGl6LiRjcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIG1vZGVsSWQpIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCByZXF1ZXN0KSB7XHJcbiAgICAgICAgcmVxdWVzdC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUobW9kZWxOYW1lLCBtb2RlbElkKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcclxuICAgIHRoaXouJGNyZWF0ZUluZGV4ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJlcXVlc3QpIHtcclxuICAgICAgICBsZXQgc3RvcmUgPSByZXF1ZXN0LnRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XHJcbiAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgdW5hIHRyYW5zYWNjacOzblxyXG4gICAgdGhpei4kdHJhbnNhY3Rpb24gPSBmdW5jdGlvbihtb2RlbE5hbWUsIHBlcm1zLCBhY3Rpb24sIGNiKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnZnVuY3Rpb24nLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICBsZXQgZGVmZXJlZCA9ICRxcy5kZWZlcihjYik7XHJcblxyXG4gICAgICAvLyBDdWFuZG8gc2UgYWJyYSBsYSBCRFxyXG4gICAgICAkb3BlbkRlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcmVxdWVzdCkge1xyXG5cclxuICAgICAgICBsZXQgdHggPSByZXF1ZXN0LnJlc3VsdC50cmFuc2FjdGlvbihtb2RlbE5hbWUsIHBlcm1zKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYWN0aW9uKHR4KTtcclxuXHJcbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxyXG4gICAgICAgIHR4Lm9uY29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCwgcmVzdWx0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxyXG4gICAgICAgIHR4Lm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdCh0eC5lcnJvcik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBJbnNlcnRhIHVuIHJlZ2lzdHJvIGVuIGVsIG1vZGVsb1xyXG4gICAgdGhpei4kY3JlYXRlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgaW5zdGFuY2UsIGNiKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnb2JqZWN0JywgJ2Z1bmN0aW9uJ10sIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGxldCBkZWZlcmVkID0gJHFzLmRlZmVyKGNiKTtcclxuXHJcbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXHJcbiAgICAgIHRoaXouJHRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWRvbmx5JywgZnVuY3Rpb24gKHR4KSB7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLnB1dChpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyAgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCwgaW5zdGFuY2UpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXHJcbiAgICAgICAgcmVxdWVzdC5vbmVycm9yICA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIC8vIENvdWxkIGNhbGwgcmVxdWVzdC5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChyZXF1ZXN0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBCdXNjYXIgZW4gZWwgbW9kZWxvXHJcbiAgICB0aGl6LiRmaW5kID0gZnVuY3Rpb24gKE1vZGVsLCBtb2RlbE5hbWUsIHNjb3BlLCBjYikge1xyXG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbicsICdzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgbGV0IGRlZmVyZWQgPSAkcXMuZGVmZXIoY2IpO1xyXG4gICAgICBsZXQgcmVzdWx0ID0gW107XHJcblxyXG4gICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxyXG4gICAgICB0aGl6LiR0cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xyXG4gICAgICAgIGxldCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBzdG9yZS5vcGVuQ3Vyc29yKCk7XHJcblxyXG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgY3Vyc29yID0gcmVxdWVzdC5yZXN1bHQ7XHJcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XHJcbiAgICAgICAgICAgIC8vIENhbGxlZCBmb3IgZWFjaCBtYXRjaGluZyByZWNvcmQuXHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKE1vZGVsLiRnZXQoY3Vyc29yLnZhbHVlKSk7XHJcbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gTm8gbW9yZSBtYXRjaGluZyByZWNvcmRzLlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYXIgYWxpYXMgcGFyYSBsb3MgZXZlbnRvcyBlbmxhemFyIGNhbGxiYWNrcyBhIGxvcyBldmVudG9zXHJcbiAgICBsZXQgZGVmZXJlZHM7XHJcbiAgICBPYmplY3Qua2V5cyhkZWZlcmVkcyA9IHtcclxuICAgICAgJG9uT3BlbjogJG9wZW5EZWZlcmVkLFxyXG4gICAgICAkb25VcGdyYWRlTmVlZGVkOiAkdXBncmFkZU5lZWRlZERlZmVyZWQsXHJcbiAgICB9KS5tYXAoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgbGV0IHRleHQgPSAkZGJOYW1lKycudicrKCRkYlZlcnNpb258fDEpKyc6ICcra2V5O1xyXG4gICAgICAgIGlmIChlcnIpe1xyXG4gICAgICAgICAgJGxvZy5lcnJvcih0ZXh0LCBlcnIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkbG9nLmxvZyh0ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGl6W2tleV0gPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcclxuICAgICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShjYik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgfTtcclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaURiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlEYlNlcnZpY2U7XG5mdW5jdGlvbiBpRGJTZXJ2aWNlKCRxcywgJGlNb2RlbCwgJG5nRGJVdGlscywgJG5nRGJFdmVudHMsICRsb2cpIHtcbiAgJ25nSW5qZWN0JztcblxuICAvLyBFbiBsYSBzaWd1aWVudGUgbGluZWEsIHB1ZWRlIGluY2x1aXIgcHJlZmlqb3MgZGUgaW1wbGVtZW50YWNpb24gcXVlIHF1aWVyYSBwcm9iYXIuXG5cbiAgdmFyIGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQjtcbiAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxuICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcbiAgdmFyIElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcbiAgdmFyIElEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcbiAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcblxuICBpZiAoIWluZGV4ZWREQikge1xuICAgIGFsZXJ0KFwiU3UgbmF2ZWdhZG9yIG5vIHNvcG9ydGEgdW5hIHZlcnNpw7NuIGVzdGFibGUgZGUgaW5kZXhlZERCLiBUYWwgeSBjb21vIGxhcyBjYXJhY3RlcsOtc3RpY2FzIG5vIHNlcsOhbiB2YWxpZGFzXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIENsYXNlIHBhcmEgbGEgY3JlYWNpw7NuIGRlIGluc3RhbmNpYXMgZGUgbGEgQkRcbiAgcmV0dXJuIGZ1bmN0aW9uICRpRGIoJGRiTmFtZSwgJGRiVmVyc2lvbikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnbnVtYmVyJ10pO1xuXG4gICAgLy8gTWFuZWphZG9yZXMgZGUgZXZlbnRvcy5cbiAgICB2YXIgJGV2ZW50c0NhbGxiYWNrcyA9IHt9O1xuICAgIHZhciAkdXBncmFkZU5lZWRlZERlZmVyZWQgPSAkcXMuZGVmZXIoKTtcbiAgICB2YXIgJG9wZW5EZWZlcmVkID0gJHFzLmRlZmVyKCk7XG4gICAgdmFyICRvcGVuZWQgPSBmYWxzZTtcblxuICAgIC8vIEluc3RhbmNpYSBkZSBsYSBiYXNlIGRlIGRhdG9zO1xuICAgIHZhciAkcmVxdWVzdCA9IG51bGw7XG4gICAgdGhpei4kbW9kZWxzID0ge307XG5cbiAgICAvLyBBZ3JlZ2FyIHVuIG1hbmVqYWRvciBkZSBldmVudG9cbiAgICB0aGl6LiRiaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdID0gW107XG4gICAgICB9XG5cbiAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5wdXNoKGNiKTtcbiAgICB9O1xuXG4gICAgLy9SZW11ZXZlIHVuIG1hbmVqYWRvciBkZSBldmVudG9cbiAgICB0aGl6LiR1bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkgcmV0dXJuO1xuXG4gICAgICAvLyBCdXNjYXIgZWwgY2JcbiAgICAgIHZhciBpZHggPSAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uaW5kZXhPZihjYik7XG5cbiAgICAgIC8vIFNpIHNlIGVuY29udHJvIGVsIGNiIHJlbW92ZXJsb1xuICAgICAgaWYgKGlkeCAhPSAtMSkge1xuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXG4gICAgdGhpei4kdHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHtcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnXSk7XG5cbiAgICAgICRsb2cubG9nKCRkYk5hbWUgKyAnLnYnICsgKCRkYlZlcnNpb24gfHwgMSkgKyAnOiAnICsgZXZlbnROYW1lKTtcblxuICAgICAgZm9yICh2YXIgaSBpbiAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdW2ldLmFwcGx5KHRoaXosIGFyZ3MpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBDYWxsYmFja3MgcGFyYSBsb3MgZXJyb3Jlc1xuICAgIHRoaXouJGVycm9yID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB0aGl6LiRiaW5kKCRuZ0RiRXZlbnRzLkRCX0VSUk9SLCBjYik7XG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgLy8gQWJyaXIgdW5hIEJhc2UgZGUgZGF0b3MuXG4gICAgdGhpei4kb3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgkb3BlbmVkKSByZXR1cm4gJG9wZW5EZWZlcmVkO1xuXG4gICAgICAvLyBDcmVhciB1biBudWV2byBkZWZlclxuICAgICAgJG9wZW5lZCA9IHRydWU7XG5cbiAgICAgIC8vIGRlamFtb3MgYWJpZXJ0YSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcbiAgICAgIHZhciByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4oJGRiTmFtZSwgJGRiVmVyc2lvbik7XG5cbiAgICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJlcXVlc3QucmVzdWx0IVxuICAgICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucmVzb2x2ZShldmVudCwgcmVxdWVzdCk7XG4gICAgICB9O1xuXG4gICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZWwgcmVzdWx0YWRvXG4gICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXF1ZXN0LnJlc3VsdCFcbiAgICAgICAgJHJlcXVlc3QgPSByZXF1ZXN0O1xuXG4gICAgICAgIC8vIEFzaW5nYXIgZWwgbWFuZWphZG9yIGRlIGVycm9yZXMgYSBsYSBCRFxuICAgICAgICAkcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgJGxvZy5lcnJvcignRGF0YWJhc2UgZXJyb3I6ICcgKyBldmVudC50YXJnZXQuZXJyb3JDb2RlKTtcbiAgICAgICAgICB0aGl6LiR0cmlnZ2VyKCRuZ0RiRXZlbnRzLkRCX0VSUk9SLCBbZXZlbnRdKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkb3BlbkRlZmVyZWQucmVzb2x2ZShldmVudCwgcmVxdWVzdCk7XG4gICAgICB9O1xuXG4gICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzXG4gICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXF1ZXN0LmVycm9yQ29kZSFcbiAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAkb3BlbkRlZmVyZWQucmVqZWN0KHJlcXVlc3QuZXJyb3JDb2RlKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiAkb3BlbkRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIEFncmVnYSB1biBudWV2byBtb2RlbG9cbiAgICB0aGl6LiRtb2RlbCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnXSk7XG5cbiAgICAgIC8vIEluc3RhbmNpYXIgZWwgbW9kZWxvXG4gICAgICB2YXIgbW9kZWwgPSB0aGl6LiRtb2RlbHNbbmFtZV07XG5cbiAgICAgIC8vIFNpIG5vIGV4aXN0ZSBlbCBtb2RlbG8gY3JlYXJcbiAgICAgIGlmICghbW9kZWwpIG1vZGVsID0gJGlNb2RlbCh0aGl6LCBuYW1lKTtcblxuICAgICAgLy8gR3VhcmRhciBlbCBtb2RlbG8gZW4gbG9zIG1vZGVsb3NcbiAgICAgIHRoaXouJG1vZGVsc1tuYW1lXSA9IG1vZGVsO1xuXG4gICAgICAvLyBSZXRvcm5hciBlbCBtb2RlbG9cbiAgICAgIHJldHVybiBtb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXG4gICAgdGhpei4kY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBtb2RlbElkKSB7XG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcmVxdWVzdCkge1xuICAgICAgICByZXF1ZXN0LnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShtb2RlbE5hbWUsIG1vZGVsSWQpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxuICAgIHRoaXouJGNyZWF0ZUluZGV4ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIHN0b3JlID0gcmVxdWVzdC50cmFuc2FjdGlvbi5vYmplY3RTdG9yZShtb2RlbE5hbWUpO1xuICAgICAgICBzdG9yZS5jcmVhdGVJbmRleChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSB1bmEgdHJhbnNhY2Npw7NuXG4gICAgdGhpei4kdHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBwZXJtcywgYWN0aW9uLCBjYikge1xuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdmdW5jdGlvbicsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdmFyIGRlZmVyZWQgPSAkcXMuZGVmZXIoY2IpO1xuXG4gICAgICAvLyBDdWFuZG8gc2UgYWJyYSBsYSBCRFxuICAgICAgJG9wZW5EZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJlcXVlc3QpIHtcblxuICAgICAgICB2YXIgdHggPSByZXF1ZXN0LnJlc3VsdC50cmFuc2FjdGlvbihtb2RlbE5hbWUsIHBlcm1zKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGFjdGlvbih0eCk7XG5cbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxuICAgICAgICB0eC5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCByZXN1bHQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXG4gICAgICAgIHR4Lm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QodHguZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcmVkO1xuICAgIH07XG5cbiAgICAvLyBJbnNlcnRhIHVuIHJlZ2lzdHJvIGVuIGVsIG1vZGVsb1xuICAgIHRoaXouJGNyZWF0ZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluc3RhbmNlLCBjYikge1xuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAnZnVuY3Rpb24nXSwgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9ICRxcy5kZWZlcihjYik7XG5cbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXG4gICAgICB0aGl6LiR0cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSkucHV0KGluc3RhbmNlKTtcblxuICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBpbnN0YW5jZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIENvdWxkIGNhbGwgcmVxdWVzdC5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXG4gICAgICAgICAgZGVmZXJlZC5yZWplY3QocmVxdWVzdCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xuICAgIHRoaXouJGZpbmQgPSBmdW5jdGlvbiAoTW9kZWwsIG1vZGVsTmFtZSwgc2NvcGUsIGNiKSB7XG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbicsICdzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXSwgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICB2YXIgZGVmZXJlZCA9ICRxcy5kZWZlcihjYik7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXG4gICAgICB0aGl6LiR0cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICB2YXIgc3RvcmUgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpO1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHN0b3JlLm9wZW5DdXJzb3IoKTtcblxuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgY3Vyc29yID0gcmVxdWVzdC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgICAgLy8gQ2FsbGVkIGZvciBlYWNoIG1hdGNoaW5nIHJlY29yZC5cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKE1vZGVsLiRnZXQoY3Vyc29yLnZhbHVlKSk7XG4gICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTm8gbW9yZSBtYXRjaGluZyByZWNvcmRzLlxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYXIgYWxpYXMgcGFyYSBsb3MgZXZlbnRvcyBlbmxhemFyIGNhbGxiYWNrcyBhIGxvcyBldmVudG9zXG4gICAgdmFyIGRlZmVyZWRzID0gdm9pZCAwO1xuICAgIE9iamVjdC5rZXlzKGRlZmVyZWRzID0ge1xuICAgICAgJG9uT3BlbjogJG9wZW5EZWZlcmVkLFxuICAgICAgJG9uVXBncmFkZU5lZWRlZDogJHVwZ3JhZGVOZWVkZWREZWZlcmVkXG4gICAgfSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdmFyIHRleHQgPSAkZGJOYW1lICsgJy52JyArICgkZGJWZXJzaW9uIHx8IDEpICsgJzogJyArIGtleTtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICRsb2cuZXJyb3IodGV4dCwgZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkbG9nLmxvZyh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGl6W2tleV0gPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XG4gICAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGNiKTtcbiAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lEYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpTW9kZWxTZXJ2aWNlICgkcXMsICRuZ0RiVXRpbHMpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uICRpTW9kZWwoJGRiLCAkbW9kZWxOYW1lKSB7IGxldCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAvLyBDbGF2ZSBkZWwgbW9kZWxvXHJcbiAgICBsZXQgJGlkID0geyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OiB0cnVlIH07XHJcbiAgICBsZXQgJGluc3RhbmNlcyA9IHt9O1xyXG5cclxuICAgIC8vIENvbnN0dWN0b3IgZGVsIG1vZGVsb1xyXG4gICAgZnVuY3Rpb24gJE1vZGVsKCkge1xyXG4gICAgICB0aGlzLiRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgZWwgSUQgYWwgbW9kZWxvXHJcbiAgICAkTW9kZWwuJGlkID0gZnVuY3Rpb24gKCRwSWlkKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcclxuICAgICAgJGlkID0gJHBJaWRcclxuICAgICAgcmV0dXJuICRNb2RlbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RvIHN0b3JhZ2UgcGFyYSBlbCBtb2RlbG8uXHJcbiAgICAkTW9kZWwuJGNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAkZGIuJGNyZWF0ZVN0b3JlKCRtb2RlbE5hbWUsICRpZCk7XHJcbiAgICAgIHJldHVybiAkTW9kZWw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBpbmRleFxyXG4gICAgJE1vZGVsLiRpbmRleCA9IGZ1bmN0aW9uIChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xyXG4gICAgICAkZGIuJGNyZWF0ZUluZGV4KCRtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcclxuICAgICAgcmV0dXJuICRNb2RlbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gTcOpdG9kbyBxdWUgcGVybWl0ZSBtb2RpZmljYXIgbW9kZWwuXHJcbiAgICAkTW9kZWwuJGJ1aWxkID0gZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XHJcbiAgICAgIGJ1aWxkQ2FsbGJhY2soJE1vZGVsKTtcclxuICAgICAgcmV0dXJuICRNb2RlbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBudWV2YXMgaW5zdGFuY2lhcyBkZSBsb3MgbW9kZWxvc1xyXG4gICAgJE1vZGVsLiRjcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSwgY2IpIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgLy8gU2kgZXMgdW4gYXJyYXlcclxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgJHJlY29yZCA9IG5ldyAkTW9kZWwoZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuICRyZWNvcmQuJGNyZWF0ZShjYik7XHJcbiAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgLy8gT2J0ZW5lciB1bmEgY29waWEgZGVsIGFycmF5XHJcbiAgICAgIGxldCBhcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhKTtcclxuICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICBsZXQgZGVmZXJlZCA9ICRxcy5kZWZlcihjYik7XHJcblxyXG4gICAgICAoZnVuY3Rpb24gaXRlcmF0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gTm8gcXVlZGFuIGVsZW1lbnRvcyBlbiBlbCBhcnJheVxyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09IDApIHJldHVybiBkZWZlcmVkLnJlc29sdmUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXIgZWwgc2lndWllbnRlIGVsZW1lbnRvXHJcbiAgICAgICAgJE1vZGVsLiRjcmVhdGUoYXJyLnNoaWZ0KCksIGZ1bmN0aW9uIChlcnIsIGluc3RhbmNlKSB7XHJcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZGVmZXJlZC5yZWplY3QoZXJyKTtcclxuICAgICAgICAgIHJlc3VsdC5wdXNoKGluc3RhbmNlKTtcclxuICAgICAgICAgIGl0ZXJhdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSkoKTtcclxuXHJcbiAgICAgIC8vIERldm9sdmVyIGVsIHByb21pc2VcclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBCdXNjYXIgdW4gY2FtcG9cclxuICAgICRNb2RlbC5zZWFyY2hEZWVwRmllbGQgPSBmdW5jdGlvbiAob2JqLCBmaWVsZCwgY2IpIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGxldCBmaWVsZHMgPSBmaWVsZC5zcGxpdCgnLicpO1xyXG4gICAgICBsZXQgbGFzdEZpZWxkID0gZmllbGRzLnBvcCgpO1xyXG5cclxuICAgICAgcmV0dXJuIChmdW5jdGlvbiBfc2V0KG9iaikge1xyXG4gICAgICAgIGlmIChmaWVsZHMubGVuZ3RoID09IDApXHJcbiAgICAgICAgICByZXR1cm4gY2Iob2JqLCBsYXN0RmllbGQpO1xyXG4gICAgICAgIGxldCBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW2ZpZWxkXSA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAgICBvYmpbZmllbGRdID0ge307XHJcbiAgICAgICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XHJcbiAgICAgIH0pKG9iaik7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGVsIG1vZGVsIGRlIGxhcyBndWFyZGFkYXMuIFNpIG5vIGV4aXN0ZSBlbnRvbmNlXHJcbiAgICAvLyBzZSBjcmVhXHJcbiAgICAkTW9kZWwuJGdldCA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xyXG5cclxuICAgICAgLy8gT2J0ZW5lciBlbCBrZXkgZGVsIG9iamV0b1xyXG4gICAgICBsZXQga2V5ID0gJE1vZGVsLnNlYXJjaERlZXBGaWVsZChvYmosICRpZC5rZXlQYXRoLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gTm8gZXhpc3RlIGxhIGluc3RhbmNpYSBlbnRvbmNlIHNlIGNyZWFcclxuICAgICAgaWYgKCEkaW5zdGFuY2VzW2tleV0pXHJcbiAgICAgICAgJGluc3RhbmNlc1trZXldID0gbmV3ICRNb2RlbChvYmopO1xyXG4gICAgICBcclxuICAgICAgcmV0dXJuICRpbnN0YW5jZXNba2V5XTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xyXG4gICAgJE1vZGVsLiRmaW5kID0gZnVuY3Rpb24gKHNjb3BlLCBjYikge1xyXG4gICAgICBsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgIGNiID0gYXJncy5wb3AoKTsgc2NvcGUgPSBhcmdzLnBvcCgpO1xyXG4gICAgICByZXR1cm4gJGRiLiRmaW5kKCRNb2RlbCwgJG1vZGVsTmFtZSwgc2NvcGUsIGNiKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGxvcyBhdHJpYnV0b3NcclxuICAgICRNb2RlbC5wcm90b3R5cGUuJHNldEF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoZGF0YSkgeyBsZXQgdGhpeiA9IHRoaXM7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcclxuICAgICAgXHJcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbiAocHJvcGVydHkpIHtcclxuICAgICAgICB0aGl6LiRzZXQocHJvcGVydHksIGRhdGFbcHJvcGVydHldKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXHJcbiAgICAkTW9kZWwucHJvdG90eXBlLiRnZXQgPSBmdW5jdGlvbiAoZmllbGQpIHsgbGV0IHRoaXogPSB0aGlzO1xyXG4gICAgICByZXR1cm4gJE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGl6LCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICAgICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cclxuICAgICRNb2RlbC5wcm90b3R5cGUuJHNldCA9IGZ1bmN0aW9uIChmaWVsZCwgdmFsdWUpIHsgbGV0IHRoaXogPSB0aGlzO1xyXG4gICAgICByZXR1cm4gJE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGl6LCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICAgICAgb2JqW2xhc3RGaWVsZF0gPSB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gdGhpejtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENvbnN0dXJjdG9yIHF1ZSBzZSBwdWVkZSBzb2JyZSBlc2NyaWJpclxyXG4gICAgJE1vZGVsLnByb3RvdHlwZS4kY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBHdWFyZGEgbG9zIGRhdG9zIGRlbCBvYmpldG9cclxuICAgICRNb2RlbC5wcm90b3R5cGUuJGNyZWF0ZSA9IGZ1bmN0aW9uIChjYil7IGxldCB0aGl6ID0gdGhpcztcclxuICAgICAgcmV0dXJuICRkYi4kY3JlYXRlKCRtb2RlbE5hbWUsIHRoaXMsIGZ1bmN0aW9uIChlcnIsIGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGVycikgeyBpZiAoY2IpIGNiKGVycik7IHJldHVybjsgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBnZW5lcmFkbyBhbCBtb2RlbG9cclxuICAgICAgICB0aGl6LiRzZXQoJGlkLmtleVBhdGgsIGV2ZW50LnRhcmdldC5yZXN1bHQpXHJcblxyXG4gICAgICAgIC8vIEd1YXJkYXIgbGEgaW5zdGFuY2lhIGVuIGxhIGNvbGVjaW9uIGRlIGluc3RhbmNpYXNcclxuICAgICAgICAkaW5zdGFuY2VzW3RoaXouJGdldCgkaWQua2V5UGF0aCldID0gdGhpejtcclxuXHJcbiAgICAgICAgaWYgKGNiKSBjYi5hcHBseShudWxsLCBbbnVsbF0uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gJE1vZGVsO1xyXG5cclxuICB9O1xyXG5cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pTW9kZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaU1vZGVsU2VydmljZTtcbmZ1bmN0aW9uIGlNb2RlbFNlcnZpY2UoJHFzLCAkbmdEYlV0aWxzKSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICRpTW9kZWwoJGRiLCAkbW9kZWxOYW1lKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgLy8gQ2xhdmUgZGVsIG1vZGVsb1xuICAgIHZhciAkaWQgPSB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfTtcbiAgICB2YXIgJGluc3RhbmNlcyA9IHt9O1xuXG4gICAgLy8gQ29uc3R1Y3RvciBkZWwgbW9kZWxvXG4gICAgZnVuY3Rpb24gJE1vZGVsKCkge1xuICAgICAgdGhpcy4kY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xuICAgICRNb2RlbC4kaWQgPSBmdW5jdGlvbiAoJHBJaWQpIHtcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcbiAgICAgICRpZCA9ICRwSWlkO1xuICAgICAgcmV0dXJuICRNb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RvIHN0b3JhZ2UgcGFyYSBlbCBtb2RlbG8uXG4gICAgJE1vZGVsLiRjcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICRkYi4kY3JlYXRlU3RvcmUoJG1vZGVsTmFtZSwgJGlkKTtcbiAgICAgIHJldHVybiAkTW9kZWw7XG4gICAgfTtcblxuICAgIC8vIEFncmVnYSB1biBpbmRleFxuICAgICRNb2RlbC4kaW5kZXggPSBmdW5jdGlvbiAoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcbiAgICAgICRkYi4kY3JlYXRlSW5kZXgoJG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xuICAgICAgcmV0dXJuICRNb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gTcOpdG9kbyBxdWUgcGVybWl0ZSBtb2RpZmljYXIgbW9kZWwuXG4gICAgJE1vZGVsLiRidWlsZCA9IGZ1bmN0aW9uIChidWlsZENhbGxiYWNrKSB7XG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbiddKTtcbiAgICAgIGJ1aWxkQ2FsbGJhY2soJE1vZGVsKTtcbiAgICAgIHJldHVybiAkTW9kZWw7XG4gICAgfTtcblxuICAgIC8vIENyZWEgbnVldmFzIGluc3RhbmNpYXMgZGUgbG9zIG1vZGVsb3NcbiAgICAkTW9kZWwuJGNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhLCBjYikge1xuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAvLyBTaSBlcyB1biBhcnJheVxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyICRyZWNvcmQgPSBuZXcgJE1vZGVsKGRhdGEpO1xuICAgICAgICByZXR1cm4gJHJlY29yZC4kY3JlYXRlKGNiKTtcbiAgICAgIH1cblxuICAgICAgLy8gT2J0ZW5lciB1bmEgY29waWEgZGVsIGFycmF5XG4gICAgICB2YXIgYXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZGF0YSk7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICB2YXIgZGVmZXJlZCA9ICRxcy5kZWZlcihjYik7XG5cbiAgICAgIChmdW5jdGlvbiBpdGVyYXRpb24oKSB7XG5cbiAgICAgICAgLy8gTm8gcXVlZGFuIGVsZW1lbnRvcyBlbiBlbCBhcnJheVxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PSAwKSByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKHJlc3VsdCk7XG5cbiAgICAgICAgLy8gQ3JlYXIgZWwgc2lndWllbnRlIGVsZW1lbnRvXG4gICAgICAgICRNb2RlbC4kY3JlYXRlKGFyci5zaGlmdCgpLCBmdW5jdGlvbiAoZXJyLCBpbnN0YW5jZSkge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkZWZlcmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGluc3RhbmNlKTtcbiAgICAgICAgICBpdGVyYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSgpO1xuXG4gICAgICAvLyBEZXZvbHZlciBlbCBwcm9taXNlXG4gICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICB9O1xuXG4gICAgLy8gQnVzY2FyIHVuIGNhbXBvXG4gICAgJE1vZGVsLnNlYXJjaERlZXBGaWVsZCA9IGZ1bmN0aW9uIChvYmosIGZpZWxkLCBjYikge1xuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgJ3N0cmluZycsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgdmFyIGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XG4gICAgICB2YXIgbGFzdEZpZWxkID0gZmllbGRzLnBvcCgpO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gX3NldChvYmopIHtcbiAgICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMCkgcmV0dXJuIGNiKG9iaiwgbGFzdEZpZWxkKTtcbiAgICAgICAgdmFyIGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW2ZpZWxkXSA9PT0gJ3VuZGVmaW5lZCcpIG9ialtmaWVsZF0gPSB7fTtcbiAgICAgICAgcmV0dXJuIF9zZXQob2JqW2ZpZWxkXSk7XG4gICAgICB9KG9iaik7XG4gICAgfTtcblxuICAgIC8vIERldnVlbHZlIGxhIGluc3RhbmNpYSBkZWwgbW9kZWwgZGUgbGFzIGd1YXJkYWRhcy4gU2kgbm8gZXhpc3RlIGVudG9uY2VcbiAgICAvLyBzZSBjcmVhXG4gICAgJE1vZGVsLiRnZXQgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnXSk7XG5cbiAgICAgIC8vIE9idGVuZXIgZWwga2V5IGRlbCBvYmpldG9cbiAgICAgIHZhciBrZXkgPSAkTW9kZWwuc2VhcmNoRGVlcEZpZWxkKG9iaiwgJGlkLmtleVBhdGgsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XG4gICAgICB9KTtcblxuICAgICAgLy8gTm8gZXhpc3RlIGxhIGluc3RhbmNpYSBlbnRvbmNlIHNlIGNyZWFcbiAgICAgIGlmICghJGluc3RhbmNlc1trZXldKSAkaW5zdGFuY2VzW2tleV0gPSBuZXcgJE1vZGVsKG9iaik7XG5cbiAgICAgIHJldHVybiAkaW5zdGFuY2VzW2tleV07XG4gICAgfTtcblxuICAgIC8vIEJ1c2NhciBlbiBlbCBtb2RlbG9cbiAgICAkTW9kZWwuJGZpbmQgPSBmdW5jdGlvbiAoc2NvcGUsIGNiKSB7XG4gICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICBjYiA9IGFyZ3MucG9wKCk7c2NvcGUgPSBhcmdzLnBvcCgpO1xuICAgICAgcmV0dXJuICRkYi4kZmluZCgkTW9kZWwsICRtb2RlbE5hbWUsIHNjb3BlLCBjYik7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBsb3MgYXRyaWJ1dG9zXG4gICAgJE1vZGVsLnByb3RvdHlwZS4kc2V0QXR0cmlidXRlcyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnXSk7XG5cbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgdGhpei4kc2V0KHByb3BlcnR5LCBkYXRhW3Byb3BlcnR5XSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxuICAgICRNb2RlbC5wcm90b3R5cGUuJGdldCA9IGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgcmV0dXJuICRNb2RlbC5zZWFyY2hEZWVwRmllbGQodGhpeiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xuICAgICAgICByZXR1cm4gb2JqW2xhc3RGaWVsZF07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQXNpZ25hIGluIHZhbG9yIGEgdW4gY2FtcG9cbiAgICAkTW9kZWwucHJvdG90eXBlLiRzZXQgPSBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICByZXR1cm4gJE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGl6LCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgIG9ialtsYXN0RmllbGRdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGl6O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIENvbnN0dXJjdG9yIHF1ZSBzZSBwdWVkZSBzb2JyZSBlc2NyaWJpclxuICAgICRNb2RlbC5wcm90b3R5cGUuJGNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKGRhdGEpIHt9O1xuXG4gICAgLy8gR3VhcmRhIGxvcyBkYXRvcyBkZWwgb2JqZXRvXG4gICAgJE1vZGVsLnByb3RvdHlwZS4kY3JlYXRlID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICByZXR1cm4gJGRiLiRjcmVhdGUoJG1vZGVsTmFtZSwgdGhpcywgZnVuY3Rpb24gKGVyciwgZXZlbnQpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGlmIChjYikgY2IoZXJyKTtyZXR1cm47XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQXNpZ25hciBlbCBnZW5lcmFkbyBhbCBtb2RlbG9cbiAgICAgICAgdGhpei4kc2V0KCRpZC5rZXlQYXRoLCBldmVudC50YXJnZXQucmVzdWx0KTtcblxuICAgICAgICAvLyBHdWFyZGFyIGxhIGluc3RhbmNpYSBlbiBsYSBjb2xlY2lvbiBkZSBpbnN0YW5jaWFzXG4gICAgICAgICRpbnN0YW5jZXNbdGhpei4kZ2V0KCRpZC5rZXlQYXRoKV0gPSB0aGl6O1xuXG4gICAgICAgIGlmIChjYikgY2IuYXBwbHkobnVsbCwgW251bGxdLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuICRNb2RlbDtcbiAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pTW9kZWwuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9