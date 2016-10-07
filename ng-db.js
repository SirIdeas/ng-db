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
	
	var _validations = __webpack_require__(1);
	
	var $ngDbUtils = _interopRequireWildcard(_validations);
	
	var _events = __webpack_require__(2);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _iDb = __webpack_require__(3);
	
	var _iDb2 = _interopRequireDefault(_iDb);
	
	var _iModel = __webpack_require__(4);
	
	var _iModel2 = _interopRequireDefault(_iModel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	angular.module('ngDb', []).constant('NG_DB_VERSION', '0.0.1').service('$ngDbUtils', function () {
	  return $ngDbUtils;
	}).service('$ngDbEvents', function () {
	  return _events2.default;
	}).service('$iDb', (0, _iDb2.default)(angular)).service('$iModel', (0, _iModel2.default)(angular));

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	// Funcion para determinar si es un callback válido o no
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.isCallback = isCallback;
	exports.mustBeCallback = mustBeCallback;
	exports.mustBe = mustBe;
	exports.validate = validate;
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
	    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == types[i]) continue;
	    var err = new Error('Invalid value: ' + value + ' must be ' + types[i]);
	    err.name = 'InvalidValue';
	    throw err;
	  }
	}
	
	// Valida un array de argumentos con un arra de tipos
	function validate(args, types) {
	  args = Array.prototype.slice.call(args);
	  if (typeof types == 'string') types = [types];
	  for (var i in args) {
	    if (types[i]) {
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	// Nombre de los eventos
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  DB: {
	    OPEN: 'db.opened',
	    OPEN_SUCCESS: 'db.opened.success',
	    OPEN_ERROR: 'db.open.error',
	    ERROR: 'cb.error',
	    UPGRATENEEDED: 'cb.upgradeneeded'
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	        value: true
	});
	exports.default = iDbServiceFactory;
	function iDbServiceFactory(ng) {
	
	        // Funcion para el servicio de la BD
	        return ["$q", "$iModel", "$ngDbUtils", "$ngDbEvents", "$log", function iDbService($q, $iModel, $ngDbUtils, $ngDbEvents, $log) {
	                'ngInject';
	
	                // En la siguiente linea, puede incluir prefijos de implementacion que quiera probar.
	
	                var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	                // No use "var indexedDB = ..." Si no está en una función.
	                // Por otra parte, puedes necesitar referencias a algun objeto window.IDB*:
	                var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	                var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	                // (Mozilla nunca ha prefijado estos objetos, por lo tanto no necesitamos window.mozIDB*)
	
	                if (!indexedDB) {
	                        window.alert("Su navegador no soporta una versión estable de indexedDB. Tal y como las características no serán validas");
	                        return;
	                }
	
	                // Clase para la creación de instancias de la BD
	                return function $iDb($dbName, $dbVersion) {
	                        var self = this;
	                        $ngDbUtils.validate(arguments, ['string', 'number']);
	
	                        // Manejadores de eventos.
	                        var $eventsCallbacks = {};
	                        var $openDefered = null;
	
	                        // Instancia de la base de datos;
	                        var $request = null;
	                        self.$models = {};
	
	                        // Agregar un manejador de evento
	                        self.$bind = function (eventName, cb) {
	                                $ngDbUtils.validate(arguments, ['string', 'function']);
	
	                                if (!$eventsCallbacks[eventName]) {
	                                        $eventsCallbacks[eventName] = [];
	                                }
	
	                                $eventsCallbacks[eventName].push(cb);
	                        };
	
	                        //Remueve un manejador de evento
	                        self.$unbind = function (eventName, cb) {
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
	                        self.$trigger = function (eventName, args) {
	                                $ngDbUtils.validate(arguments, ['string', 'object']);
	
	                                $log.log($dbName + '.v' + ($dbVersion || 1) + ': ' + eventName);
	
	                                for (var i in $eventsCallbacks[eventName]) {
	                                        $eventsCallbacks[eventName][i].apply(self, args);
	                                }
	                        };
	
	                        // Abrir una Base de datos.
	                        self.$open = function () {
	
	                                if ($openDefered) return $openDefered.promise;
	
	                                // Crear un nuevo defer
	                                $openDefered = $q.defer();
	
	                                // dejamos abierta nuestra base de datos
	                                var request = window.indexedDB.open($dbName, $dbVersion);
	
	                                // Asignar el manejador de errores
	                                // Do something with request.errorCode!
	                                request.onerror = function (event) {
	                                        self.$trigger($ngDbEvents.DB.OPEN_ERROR, [event, request.errorCode]);
	                                        $openDefered.reject(request.errorCode);
	                                };
	
	                                // Asignar el manejador del resultado
	                                request.onsuccess = function (event) {
	                                        // Do something with request.result!
	                                        $request = request;
	
	                                        // Asingar el manejador de errores a la BD
	                                        $request.onerror = function (event) {
	                                                $log.error('Database error: ' + event.target.errorCode);
	                                                self.$trigger($ngDbEvents.DB.ERROR, [event]);
	                                        };
	
	                                        self.$trigger($ngDbEvents.DB.OPEN_SUCCESS, [event, request]);
	                                        $openDefered.resolve(request);
	                                };
	
	                                // Asignar el callback para la actualizacion de los modelos entre versiones de la BD
	                                request.onupgradeneeded = function (event) {
	                                        // Do something with request.result!
	
	                                        self.$trigger($ngDbEvents.DB.UPGRATENEEDED, [event, request]);
	                                };
	
	                                return $openDefered.promise;
	                        };
	
	                        // Agrega un nuevo modelo
	                        self.$model = function (name, def) {
	
	                                // Instanciar el modelo
	                                var model = self.$models[name];
	
	                                // Si no existe el modelo crear
	                                if (!model) model = $iModel(self, name);
	
	                                // Guardar el modelo en los modelos
	                                self.$models[name] = model;
	
	                                // Retornar el modelo
	                                return model;
	                        };
	
	                        // Crea el objectStore para un model
	                        self.$createStore = function (modelName, modelId) {
	
	                                self.onUpgrateNeeded(function ($event, request) {
	
	                                        var db = request.result;
	                                        db.createObjectStore(modelName, modelId);
	                                });
	                        };
	
	                        // Crea el objectStore para un model
	                        self.$createIndex = function (modelName, indexName, fieldName, opts) {
	
	                                self.onUpgrateNeeded(function ($event, request) {
	
	                                        var db = request.result;
	                                        var store = request.transaction.objectStore(modelName);
	                                        store.createIndex(indexName, fieldName, opts);
	                                });
	                        };
	
	                        // Crear alias para los eventos enlazar callbacks a los eventos
	                        ng.forEach({
	                                onOpenSuccess: $ngDbEvents.DB.OPEN_SUCCESS,
	                                onOpenError: $ngDbEvents.DB.OPEN_ERROR,
	                                onUpgrateNeeded: $ngDbEvents.DB.UPGRATENEEDED,
	                                onError: $ngDbEvents.DB.ERROR
	                        }, function (event, i) {
	                                self[i] = function (cb) {
	                                        self.$bind(event, cb);
	                                        return self;
	                                };
	                        });
	                };
	        }];
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	      value: true
	});
	exports.default = iModelServiceFactory;
	function iModelServiceFactory(ng) {
	      // Funcion para el servicio de la BD
	      return function iModelService() {
	            'ngInject';
	
	            return function $iModel($db, $modelName) {
	                  var self = this;
	
	                  // Clave del modelo
	                  var $id = { keyPath: 'id', autoIncrement: true };
	
	                  // Constuctor del modelo
	                  function $Model() {
	                        this.$constructor.apply(this, arguments);
	                  };
	
	                  // Consturctor que se puede sobre escribir
	                  $Model.prototype.$constructor = function () {};
	
	                  // Asigna el ID al modelo
	                  $Model.$id = function ($pIid) {
	                        $id = $pIid;
	
	                        return $Model;
	                  };
	
	                  // Crea el objecto storage para el modelo.
	                  $Model.$create = function () {
	
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
	
	                        buildCallback($Model);
	                  };
	
	                  return $Model;
	            };
	      };
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWRmYWQ5NzI2ZDQxNWY1MDQ4YjUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy92YWxpZGF0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvdmFsaWRhdGlvbnMuanM/YzE5ZiIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9ldmVudHMuanM/NTcwNCIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaURiLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pRGIuanM/MDUwMiIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaU1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pTW9kZWwuanM/ZTFjYyJdLCJuYW1lcyI6WyIkbmdEYlV0aWxzIiwiYW5ndWxhciIsIm1vZHVsZSIsImNvbnN0YW50Iiwic2VydmljZSIsImlzQ2FsbGJhY2siLCJtdXN0QmVDYWxsYmFjayIsIm11c3RCZSIsInZhbGlkYXRlIiwiY2IiLCJ0aHJvd0Vycm9yIiwidW5kZWZpbmVkIiwiZXJyIiwiRXJyb3IiLCJuYW1lIiwidmFsdWUiLCJ0eXBlcyIsImkiLCJhcmdzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJ2YWx1ZXMiLCJEQiIsIk9QRU4iLCJPUEVOX1NVQ0NFU1MiLCJPUEVOX0VSUk9SIiwiRVJST1IiLCJVUEdSQVRFTkVFREVEIiwiaURiU2VydmljZUZhY3RvcnkiLCJuZyIsImlEYlNlcnZpY2UiLCIkcSIsIiRpTW9kZWwiLCIkbmdEYkV2ZW50cyIsIiRsb2ciLCJpbmRleGVkREIiLCJ3aW5kb3ciLCJtb3pJbmRleGVkREIiLCJ3ZWJraXRJbmRleGVkREIiLCJtc0luZGV4ZWREQiIsIklEQlRyYW5zYWN0aW9uIiwid2Via2l0SURCVHJhbnNhY3Rpb24iLCJtc0lEQlRyYW5zYWN0aW9uIiwiSURCS2V5UmFuZ2UiLCJ3ZWJraXRJREJLZXlSYW5nZSIsIm1zSURCS2V5UmFuZ2UiLCJhbGVydCIsIiRpRGIiLCIkZGJOYW1lIiwiJGRiVmVyc2lvbiIsInNlbGYiLCJhcmd1bWVudHMiLCIkZXZlbnRzQ2FsbGJhY2tzIiwiJG9wZW5EZWZlcmVkIiwiJHJlcXVlc3QiLCIkbW9kZWxzIiwiJGJpbmQiLCJldmVudE5hbWUiLCJwdXNoIiwiJHVuYmluZCIsImlkeCIsImluZGV4T2YiLCJzcGxpY2UiLCIkdHJpZ2dlciIsImxvZyIsImFwcGx5IiwiJG9wZW4iLCJwcm9taXNlIiwiZGVmZXIiLCJyZXF1ZXN0Iiwib3BlbiIsIm9uZXJyb3IiLCJldmVudCIsImVycm9yQ29kZSIsInJlamVjdCIsIm9uc3VjY2VzcyIsImVycm9yIiwidGFyZ2V0IiwicmVzb2x2ZSIsIm9udXBncmFkZW5lZWRlZCIsIiRtb2RlbCIsImRlZiIsIm1vZGVsIiwiJGNyZWF0ZVN0b3JlIiwibW9kZWxOYW1lIiwibW9kZWxJZCIsIm9uVXBncmF0ZU5lZWRlZCIsIiRldmVudCIsImRiIiwicmVzdWx0IiwiY3JlYXRlT2JqZWN0U3RvcmUiLCIkY3JlYXRlSW5kZXgiLCJpbmRleE5hbWUiLCJmaWVsZE5hbWUiLCJvcHRzIiwic3RvcmUiLCJ0cmFuc2FjdGlvbiIsIm9iamVjdFN0b3JlIiwiY3JlYXRlSW5kZXgiLCJmb3JFYWNoIiwib25PcGVuU3VjY2VzcyIsIm9uT3BlbkVycm9yIiwib25FcnJvciIsImlNb2RlbFNlcnZpY2VGYWN0b3J5IiwiaU1vZGVsU2VydmljZSIsIiRkYiIsIiRtb2RlbE5hbWUiLCIkaWQiLCJrZXlQYXRoIiwiYXV0b0luY3JlbWVudCIsIiRNb2RlbCIsIiRjb25zdHJ1Y3RvciIsIiRwSWlkIiwiJGNyZWF0ZSIsIiRpbmRleCIsIiRidWlsZCIsImJ1aWxkQ2FsbGJhY2siXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztB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O0FBQVQsVUFBU0EscUJBQXFCMUUsSUFBSTs7T0FFL0MsT0FBTyxTQUFTMkUsZ0JBQWlCO2FBQUU7O2FBRWpDLE9BQU8sU0FBU3hFLFFBQVF5RSxLQUFLQyxZQUFZO21CQUFFLElBQUl4RCxPQUFPOzs7bUJBR3BELElBQUl5RCxNQUFNLEVBQUVDLFNBQVMsTUFBTUMsZUFBZTs7O21CQUcxQyxTQUFTQyxTQUFTO3lCQUNoQixLQUFLQyxhQUFhOUMsTUFBTSxNQUFNZDtvQkFDL0I7OzttQkFHRDJELE9BQU81RixVQUFVNkYsZUFBZSxZQUFZOzs7bUJBSTVDRCxPQUFPSCxNQUFNLFVBQVVLLE9BQU87eUJBQzVCTCxNQUFNSzs7eUJBRU4sT0FBT0Y7Ozs7bUJBSVRBLE9BQU9HLFVBQVUsWUFBWTs7eUJBRTNCUixJQUFJdEIsYUFBYXVCLFlBQVlDOzt5QkFFN0IsT0FBT0c7Ozs7bUJBS1RBLE9BQU9JLFNBQVMsVUFBVXRCLFdBQVdDLFdBQVdDLE1BQU07O3lCQUVwRFcsSUFBSWQsYUFBYWUsWUFBWWQsV0FBV0MsV0FBV0M7O3lCQUVuRCxPQUFPZ0I7Ozs7bUJBS1RBLE9BQU9LLFNBQVMsVUFBVUMsZUFBZTs7eUJBRXZDQSxjQUFjTjs7O21CQUloQixPQUFPQSIsImZpbGUiOiJuZy1kYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOWRmYWQ5NzI2ZDQxNWY1MDQ4YjVcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyAkbmdEYlV0aWxzIGZyb20gJy4vdXRpbHMvdmFsaWRhdGlvbnMnO1xyXG5pbXBvcnQgJG5nRGJFdmVudHMgZnJvbSAnLi91dGlscy9ldmVudHMnO1xyXG5cclxuaW1wb3J0IGlEYlNlcnZpY2VGYWN0b3J5IGZyb20gJy4vc2VydmljZXMvaURiJztcclxuaW1wb3J0IGlNb2RlbFNlcnZpY2VGYWN0b3J5IGZyb20gJy4vc2VydmljZXMvaU1vZGVsJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCduZ0RiJywgW10pXHJcbiAgLmNvbnN0YW50KCdOR19EQl9WRVJTSU9OJywgJzAuMC4xJylcclxuICAuc2VydmljZSgnJG5nRGJVdGlscycsIGZ1bmN0aW9uICgpIHsgcmV0dXJuICRuZ0RiVXRpbHM7IH0pXHJcbiAgLnNlcnZpY2UoJyRuZ0RiRXZlbnRzJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gJG5nRGJFdmVudHM7IH0pXHJcblxyXG4gIC5zZXJ2aWNlKCckaURiJywgaURiU2VydmljZUZhY3RvcnkoYW5ndWxhcikpXHJcbiAgLnNlcnZpY2UoJyRpTW9kZWwnLCBpTW9kZWxTZXJ2aWNlRmFjdG9yeShhbmd1bGFyKSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3ZhbGlkYXRpb25zID0gcmVxdWlyZSgnLi91dGlscy92YWxpZGF0aW9ucycpO1xuXG52YXIgJG5nRGJVdGlscyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF92YWxpZGF0aW9ucyk7XG5cbnZhciBfZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKTtcblxudmFyIF9ldmVudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXZlbnRzKTtcblxudmFyIF9pRGIgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lEYicpO1xuXG52YXIgX2lEYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pRGIpO1xuXG52YXIgX2lNb2RlbCA9IHJlcXVpcmUoJy4vc2VydmljZXMvaU1vZGVsJyk7XG5cbnZhciBfaU1vZGVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lNb2RlbCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbmFuZ3VsYXIubW9kdWxlKCduZ0RiJywgW10pLmNvbnN0YW50KCdOR19EQl9WRVJTSU9OJywgJzAuMC4xJykuc2VydmljZSgnJG5nRGJVdGlscycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICRuZ0RiVXRpbHM7XG59KS5zZXJ2aWNlKCckbmdEYkV2ZW50cycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIF9ldmVudHMyLmRlZmF1bHQ7XG59KS5zZXJ2aWNlKCckaURiJywgKDAsIF9pRGIyLmRlZmF1bHQpKGFuZ3VsYXIpKS5zZXJ2aWNlKCckaU1vZGVsJywgKDAsIF9pTW9kZWwyLmRlZmF1bHQpKGFuZ3VsYXIpKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEZ1bmNpb24gcGFyYSBkZXRlcm1pbmFyIHNpIGVzIHVuIGNhbGxiYWNrIHbDoWxpZG8gbyBub1xyXG5leHBvcnQgZnVuY3Rpb24gaXNDYWxsYmFjayAoY2IsIHRocm93RXJyb3IpIHtcclxuXHJcbiAgaWYgKHR5cGVvZiBjYiA9PSAnZnVuY3Rpb24nIHx8IGNiID09IG51bGwgfHwgY2IgPT0gdW5kZWZpbmVkKXtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZhbHNlO1xyXG5cclxufVxyXG5cclxuLy8gU2kgZWwgY2FsbGJhY2sgbm8gZXMgdsOhbGlkbyBsYW56YSB1biBlcnJwb3JcclxuZXhwb3J0IGZ1bmN0aW9uIG11c3RCZUNhbGxiYWNrIChjYikge1xyXG4gIGlmIChpc0NhbGxiYWNrKGNiKSkgcmV0dXJuO1xyXG5cclxuICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIGNhbGxiYWNrJyk7XHJcbiAgZXJyLm5hbWUgPSAnSW52YWxpZENhbGxiYWNrJ1xyXG5cclxuICB0aHJvdyBlcnI7XHJcblxyXG59XHJcblxyXG4vLyBHZW5lcmEgdW4gZXJyb3Igc2kgZWwgdmFsb3Igbm8gZXMgZGVsIHRpcG8gaW5kaWNhZG8gcG9yIHBhcmFtZXRyb1xyXG5leHBvcnQgZnVuY3Rpb24gbXVzdEJlICh2YWx1ZSwgdHlwZXMpIHtcclxuICBpZiAodHlwZW9mIHR5cGVzID09ICdzdHJpbmcnKSB0eXBlcyA9IFt0eXBlc107XHJcbiAgZm9yKHZhciBpIGluIHR5cGVzKXtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gdHlwZXNbaV0pIGNvbnRpbnVlO1xyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZTogJyt2YWx1ZSsnIG11c3QgYmUgJyt0eXBlc1tpXSk7XHJcbiAgICBlcnIubmFtZSA9ICdJbnZhbGlkVmFsdWUnXHJcbiAgICB0aHJvdyBlcnI7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuLy8gVmFsaWRhIHVuIGFycmF5IGRlIGFyZ3VtZW50b3MgY29uIHVuIGFycmEgZGUgdGlwb3NcclxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlIChhcmdzLCB0eXBlcykge1xyXG4gIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcclxuICBpZiAodHlwZW9mIHR5cGVzID09ICdzdHJpbmcnKSB0eXBlcyA9IFt0eXBlc107XHJcbiAgZm9yICh2YXIgaSBpbiBhcmdzKXtcclxuICAgIGlmICh0eXBlc1tpXSl7XHJcbiAgICAgIGlmICh0eXBlb2YgdHlwZXNbaV0gPT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGVzW2ldID09ICdvYmplY3QnKXtcclxuICAgICAgICBtdXN0QmUoYXJnc1tpXSwgdHlwZXNbaV0pO1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgdHlwZXNbaV0gPT0gJ2Z1bmNpb24nKXtcclxuICAgICAgICB0eXBlc1tpXShhcmdzW2ldKTtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWxpZGF0b3IgdG86ICcrdmFsdWVzW2ldKycgbXVzdCBiZSAnK3R5cGVzW2ldKTtcclxuICAgICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbGlkYXRvcidcclxuICAgICAgdGhyb3cgZXJyO1xyXG5cclxuICAgIH1cclxuICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy92YWxpZGF0aW9ucy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gRnVuY2lvbiBwYXJhIGRldGVybWluYXIgc2kgZXMgdW4gY2FsbGJhY2sgdsOhbGlkbyBvIG5vXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZXhwb3J0cy5pc0NhbGxiYWNrID0gaXNDYWxsYmFjaztcbmV4cG9ydHMubXVzdEJlQ2FsbGJhY2sgPSBtdXN0QmVDYWxsYmFjaztcbmV4cG9ydHMubXVzdEJlID0gbXVzdEJlO1xuZXhwb3J0cy52YWxpZGF0ZSA9IHZhbGlkYXRlO1xuZnVuY3Rpb24gaXNDYWxsYmFjayhjYiwgdGhyb3dFcnJvcikge1xuXG4gIGlmICh0eXBlb2YgY2IgPT0gJ2Z1bmN0aW9uJyB8fCBjYiA9PSBudWxsIHx8IGNiID09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBTaSBlbCBjYWxsYmFjayBubyBlcyB2w6FsaWRvIGxhbnphIHVuIGVycnBvclxuZnVuY3Rpb24gbXVzdEJlQ2FsbGJhY2soY2IpIHtcbiAgaWYgKGlzQ2FsbGJhY2soY2IpKSByZXR1cm47XG5cbiAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCBjYWxsYmFjaycpO1xuICBlcnIubmFtZSA9ICdJbnZhbGlkQ2FsbGJhY2snO1xuXG4gIHRocm93IGVycjtcbn1cblxuLy8gR2VuZXJhIHVuIGVycm9yIHNpIGVsIHZhbG9yIG5vIGVzIGRlbCB0aXBvIGluZGljYWRvIHBvciBwYXJhbWV0cm9cbmZ1bmN0aW9uIG11c3RCZSh2YWx1ZSwgdHlwZXMpIHtcbiAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xuICBmb3IgKHZhciBpIGluIHR5cGVzKSB7XG4gICAgaWYgKCh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgPT0gdHlwZXNbaV0pIGNvbnRpbnVlO1xuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWU6ICcgKyB2YWx1ZSArICcgbXVzdCBiZSAnICsgdHlwZXNbaV0pO1xuICAgIGVyci5uYW1lID0gJ0ludmFsaWRWYWx1ZSc7XG4gICAgdGhyb3cgZXJyO1xuICB9XG59XG5cbi8vIFZhbGlkYSB1biBhcnJheSBkZSBhcmd1bWVudG9zIGNvbiB1biBhcnJhIGRlIHRpcG9zXG5mdW5jdGlvbiB2YWxpZGF0ZShhcmdzLCB0eXBlcykge1xuICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyk7XG4gIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcbiAgZm9yICh2YXIgaSBpbiBhcmdzKSB7XG4gICAgaWYgKHR5cGVzW2ldKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVzW2ldID09ICdzdHJpbmcnIHx8IF90eXBlb2YodHlwZXNbaV0pID09ICdvYmplY3QnKSB7XG4gICAgICAgIG11c3RCZShhcmdzW2ldLCB0eXBlc1tpXSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0eXBlc1tpXSA9PSAnZnVuY2lvbicpIHtcbiAgICAgICAgdHlwZXNbaV0oYXJnc1tpXSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbGlkYXRvciB0bzogJyArIHZhbHVlc1tpXSArICcgbXVzdCBiZSAnICsgdHlwZXNbaV0pO1xuICAgICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbGlkYXRvcic7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvdmFsaWRhdGlvbnMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBOb21icmUgZGUgbG9zIGV2ZW50b3NcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIERCOiB7XHJcbiAgICBPUEVOOidkYi5vcGVuZWQnLFxyXG4gICAgT1BFTl9TVUNDRVNTOiAnZGIub3BlbmVkLnN1Y2Nlc3MnLFxyXG4gICAgT1BFTl9FUlJPUjogJ2RiLm9wZW4uZXJyb3InLFxyXG4gICAgRVJST1I6ICdjYi5lcnJvcicsXHJcbiAgICBVUEdSQVRFTkVFREVEOiAnY2IudXBncmFkZW5lZWRlZCdcclxuICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvZXZlbnRzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBOb21icmUgZGUgbG9zIGV2ZW50b3NcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgREI6IHtcbiAgICBPUEVOOiAnZGIub3BlbmVkJyxcbiAgICBPUEVOX1NVQ0NFU1M6ICdkYi5vcGVuZWQuc3VjY2VzcycsXG4gICAgT1BFTl9FUlJPUjogJ2RiLm9wZW4uZXJyb3InLFxuICAgIEVSUk9SOiAnY2IuZXJyb3InLFxuICAgIFVQR1JBVEVORUVERUQ6ICdjYi51cGdyYWRlbmVlZGVkJ1xuICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL2V2ZW50cy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlEYlNlcnZpY2VGYWN0b3J5KG5nKSB7XHJcblxyXG4gIC8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxyXG4gIHJldHVybiBmdW5jdGlvbiBpRGJTZXJ2aWNlICgkcSwgJGlNb2RlbCwgJG5nRGJVdGlscywgJG5nRGJFdmVudHMsICRsb2cpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgICAvLyBFbiBsYSBzaWd1aWVudGUgbGluZWEsIHB1ZWRlIGluY2x1aXIgcHJlZmlqb3MgZGUgaW1wbGVtZW50YWNpb24gcXVlIHF1aWVyYSBwcm9iYXIuXHJcbiAgICBjb25zdCBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XHJcbiAgICAvLyBObyB1c2UgXCJ2YXIgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxyXG4gICAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XHJcbiAgICBjb25zdCBJREJUcmFuc2FjdGlvbiA9IHdpbmRvdy5JREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cud2Via2l0SURCVHJhbnNhY3Rpb24gfHwgd2luZG93Lm1zSURCVHJhbnNhY3Rpb247XHJcbiAgICBjb25zdCBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XHJcbiAgICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxyXG4gICAgXHJcbiAgICBpZiAoIWluZGV4ZWREQikge1xyXG4gICAgICB3aW5kb3cuYWxlcnQoXCJTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXNcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDbGFzZSBwYXJhIGxhIGNyZWFjacOzbiBkZSBpbnN0YW5jaWFzIGRlIGxhIEJEXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gJGlEYigkZGJOYW1lLCAkZGJWZXJzaW9uKSB7IGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnbnVtYmVyJ10pO1xyXG5cclxuICAgICAgLy8gTWFuZWphZG9yZXMgZGUgZXZlbnRvcy5cclxuICAgICAgbGV0ICRldmVudHNDYWxsYmFja3MgPSB7fTtcclxuICAgICAgbGV0ICRvcGVuRGVmZXJlZCA9IG51bGw7XHJcblxyXG4gICAgICAvLyBJbnN0YW5jaWEgZGUgbGEgYmFzZSBkZSBkYXRvcztcclxuICAgICAgbGV0ICRyZXF1ZXN0ID0gbnVsbDtcclxuICAgICAgc2VsZi4kbW9kZWxzID0ge307XHJcbiAgICAgIFxyXG4gICAgICAvLyBBZ3JlZ2FyIHVuIG1hbmVqYWRvciBkZSBldmVudG9cclxuICAgICAgc2VsZi4kYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XHJcbiAgICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xyXG5cclxuICAgICAgICBpZiAoISRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSl7XHJcbiAgICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5wdXNoKGNiKTtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvL1JlbXVldmUgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xyXG4gICAgICBzZWxmLiR1bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xyXG4gICAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcclxuXHJcbiAgICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gQnVzY2FyIGVsIGNiXHJcbiAgICAgICAgY29uc3QgaWR4ID0gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLmluZGV4T2YoY2IpO1xyXG5cclxuICAgICAgICAvLyBTaSBzZSBlbmNvbnRybyBlbCBjYiByZW1vdmVybG9cclxuICAgICAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gRGlzcGFyYSB1biBldmVudG9cclxuICAgICAgc2VsZi4kdHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHtcclxuICAgICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0J10pO1xyXG5cclxuICAgICAgICAkbG9nLmxvZygkZGJOYW1lKycudicrKCRkYlZlcnNpb258fDEpKyc6ICcrZXZlbnROYW1lKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpIGluICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSl7XHJcbiAgICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV1baV0uYXBwbHkoc2VsZiwgYXJncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIEFicmlyIHVuYSBCYXNlIGRlIGRhdG9zLlxyXG4gICAgICBzZWxmLiRvcGVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICgkb3BlbkRlZmVyZWQpIHJldHVybiAkb3BlbkRlZmVyZWQucHJvbWlzZTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gZGVmZXJcclxuICAgICAgICAkb3BlbkRlZmVyZWQgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICAgICAvLyBkZWphbW9zIGFiaWVydGEgbnVlc3RyYSBiYXNlIGRlIGRhdG9zXHJcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IHdpbmRvdy5pbmRleGVkREIub3BlbigkZGJOYW1lLCAkZGJWZXJzaW9uKTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGUgZXJyb3Jlc1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcmVxdWVzdC5lcnJvckNvZGUhXHJcbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICBzZWxmLiR0cmlnZ2VyKCRuZ0RiRXZlbnRzLkRCLk9QRU5fRVJST1IsIFtldmVudCwgcmVxdWVzdC5lcnJvckNvZGVdKTtcclxuICAgICAgICAgICRvcGVuRGVmZXJlZC5yZWplY3QocmVxdWVzdC5lcnJvckNvZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGVsIHJlc3VsdGFkb1xyXG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXF1ZXN0LnJlc3VsdCFcclxuICAgICAgICAgICRyZXF1ZXN0ID0gcmVxdWVzdDtcclxuXHJcbiAgICAgICAgICAvLyBBc2luZ2FyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzIGEgbGEgQkRcclxuICAgICAgICAgICRyZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgJGxvZy5lcnJvcignRGF0YWJhc2UgZXJyb3I6ICcrIGV2ZW50LnRhcmdldC5lcnJvckNvZGUpO1xyXG4gICAgICAgICAgICBzZWxmLiR0cmlnZ2VyKCRuZ0RiRXZlbnRzLkRCLkVSUk9SLCBbZXZlbnRdKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBzZWxmLiR0cmlnZ2VyKCRuZ0RiRXZlbnRzLkRCLk9QRU5fU1VDQ0VTUywgW2V2ZW50LCByZXF1ZXN0XSk7XHJcbiAgICAgICAgICAkb3BlbkRlZmVyZWQucmVzb2x2ZShyZXF1ZXN0KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBjYWxsYmFjayBwYXJhIGxhIGFjdHVhbGl6YWNpb24gZGUgbG9zIG1vZGVsb3MgZW50cmUgdmVyc2lvbmVzIGRlIGxhIEJEXHJcbiAgICAgICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJlcXVlc3QucmVzdWx0IVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBzZWxmLiR0cmlnZ2VyKCRuZ0RiRXZlbnRzLkRCLlVQR1JBVEVORUVERUQsIFtldmVudCwgcmVxdWVzdF0pO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gJG9wZW5EZWZlcmVkLnByb21pc2U7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQWdyZWdhIHVuIG51ZXZvIG1vZGVsb1xyXG4gICAgICBzZWxmLiRtb2RlbCA9IGZ1bmN0aW9uIChuYW1lLCBkZWYpIHtcclxuXHJcbiAgICAgICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG9cclxuICAgICAgICBsZXQgbW9kZWwgPSBzZWxmLiRtb2RlbHNbbmFtZV07XHJcblxyXG4gICAgICAgIC8vIFNpIG5vIGV4aXN0ZSBlbCBtb2RlbG8gY3JlYXJcclxuICAgICAgICBpZighbW9kZWwpXHJcbiAgICAgICAgICBtb2RlbCA9ICRpTW9kZWwoc2VsZiwgbmFtZSk7XHJcblxyXG4gICAgICAgIC8vIEd1YXJkYXIgZWwgbW9kZWxvIGVuIGxvcyBtb2RlbG9zXHJcbiAgICAgICAgc2VsZi4kbW9kZWxzW25hbWVdID0gbW9kZWw7XHJcblxyXG4gICAgICAgIC8vIFJldG9ybmFyIGVsIG1vZGVsb1xyXG4gICAgICAgIHJldHVybiBtb2RlbDtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcclxuICAgICAgc2VsZi4kY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBtb2RlbElkKSB7XHJcblxyXG4gICAgICAgIHNlbGYub25VcGdyYXRlTmVlZGVkKGZ1bmN0aW9uICgkZXZlbnQsIHJlcXVlc3QpIHtcclxuXHJcbiAgICAgICAgICB2YXIgZGIgPSByZXF1ZXN0LnJlc3VsdDtcclxuICAgICAgICAgIGRiLmNyZWF0ZU9iamVjdFN0b3JlKG1vZGVsTmFtZSwgbW9kZWxJZCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxyXG4gICAgICBzZWxmLiRjcmVhdGVJbmRleCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XHJcblxyXG4gICAgICAgIHNlbGYub25VcGdyYXRlTmVlZGVkKGZ1bmN0aW9uICgkZXZlbnQsIHJlcXVlc3QpIHtcclxuXHJcbiAgICAgICAgICB2YXIgZGIgPSByZXF1ZXN0LnJlc3VsdDtcclxuICAgICAgICAgIHZhciBzdG9yZSA9IHJlcXVlc3QudHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUobW9kZWxOYW1lKTtcclxuICAgICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQ3JlYXIgYWxpYXMgcGFyYSBsb3MgZXZlbnRvcyBlbmxhemFyIGNhbGxiYWNrcyBhIGxvcyBldmVudG9zXHJcbiAgICAgIG5nLmZvckVhY2goe1xyXG4gICAgICAgIG9uT3BlblN1Y2Nlc3M6ICRuZ0RiRXZlbnRzLkRCLk9QRU5fU1VDQ0VTUyxcclxuICAgICAgICBvbk9wZW5FcnJvcjogJG5nRGJFdmVudHMuREIuT1BFTl9FUlJPUixcclxuICAgICAgICBvblVwZ3JhdGVOZWVkZWQ6ICRuZ0RiRXZlbnRzLkRCLlVQR1JBVEVORUVERUQsXHJcbiAgICAgICAgb25FcnJvcjogJG5nRGJFdmVudHMuREIuRVJST1IsXHJcbiAgICAgIH0sIGZ1bmN0aW9uIChldmVudCwgaSkge1xyXG4gICAgICAgIHNlbGZbaV0gPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAgIHNlbGYuJGJpbmQoZXZlbnQsIGNiKVxyXG4gICAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lEYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlEYlNlcnZpY2VGYWN0b3J5O1xuZnVuY3Rpb24gaURiU2VydmljZUZhY3RvcnkobmcpIHtcblxuICAgICAgICAvLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlEYlNlcnZpY2UoJHEsICRpTW9kZWwsICRuZ0RiVXRpbHMsICRuZ0RiRXZlbnRzLCAkbG9nKSB7XG4gICAgICAgICAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAgICAgICAgIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cblxuICAgICAgICAgICAgICAgIHZhciBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XG4gICAgICAgICAgICAgICAgLy8gTm8gdXNlIFwidmFyIGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cbiAgICAgICAgICAgICAgICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcbiAgICAgICAgICAgICAgICB2YXIgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xuICAgICAgICAgICAgICAgIHZhciBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XG4gICAgICAgICAgICAgICAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcblxuICAgICAgICAgICAgICAgIGlmICghaW5kZXhlZERCKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQ2xhc2UgcGFyYSBsYSBjcmVhY2nDs24gZGUgaW5zdGFuY2lhcyBkZSBsYSBCRFxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAkaURiKCRkYk5hbWUsICRkYlZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdudW1iZXInXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1hbmVqYWRvcmVzIGRlIGV2ZW50b3MuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGV2ZW50c0NhbGxiYWNrcyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRvcGVuRGVmZXJlZCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluc3RhbmNpYSBkZSBsYSBiYXNlIGRlIGRhdG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRyZXF1ZXN0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJG1vZGVscyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZ3JlZ2FyIHVuIG1hbmVqYWRvciBkZSBldmVudG9cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5wdXNoKGNiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vUmVtdWV2ZSB1biBtYW5lamFkb3IgZGUgZXZlbnRvXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiR1bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCdXNjYXIgZWwgY2JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkeCA9ICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5pbmRleE9mKGNiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTaSBzZSBlbmNvbnRybyBlbCBjYiByZW1vdmVybG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGlzcGFyYSB1biBldmVudG9cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJHRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGxvZy5sb2coJGRiTmFtZSArICcudicgKyAoJGRiVmVyc2lvbiB8fCAxKSArICc6ICcgKyBldmVudE5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdW2ldLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBYnJpciB1bmEgQmFzZSBkZSBkYXRvcy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJG9wZW4gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRvcGVuRGVmZXJlZCkgcmV0dXJuICRvcGVuRGVmZXJlZC5wcm9taXNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWFyIHVuIG51ZXZvIGRlZmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRvcGVuRGVmZXJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVqYW1vcyBhYmllcnRhIG51ZXN0cmEgYmFzZSBkZSBkYXRvc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWVzdCA9IHdpbmRvdy5pbmRleGVkREIub3BlbigkZGJOYW1lLCAkZGJWZXJzaW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJlcXVlc3QuZXJyb3JDb2RlIVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiR0cmlnZ2VyKCRuZ0RiRXZlbnRzLkRCLk9QRU5fRVJST1IsIFtldmVudCwgcmVxdWVzdC5lcnJvckNvZGVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkb3BlbkRlZmVyZWQucmVqZWN0KHJlcXVlc3QuZXJyb3JDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZWwgcmVzdWx0YWRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcmVxdWVzdC5yZXN1bHQhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJlcXVlc3QgPSByZXF1ZXN0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXNpbmdhciBlbCBtYW5lamFkb3IgZGUgZXJyb3JlcyBhIGxhIEJEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGxvZy5lcnJvcignRGF0YWJhc2UgZXJyb3I6ICcgKyBldmVudC50YXJnZXQuZXJyb3JDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJHRyaWdnZXIoJG5nRGJFdmVudHMuREIuRVJST1IsIFtldmVudF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiR0cmlnZ2VyKCRuZ0RiRXZlbnRzLkRCLk9QRU5fU1VDQ0VTUywgW2V2ZW50LCByZXF1ZXN0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJG9wZW5EZWZlcmVkLnJlc29sdmUocmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXNpZ25hciBlbCBjYWxsYmFjayBwYXJhIGxhIGFjdHVhbGl6YWNpb24gZGUgbG9zIG1vZGVsb3MgZW50cmUgdmVyc2lvbmVzIGRlIGxhIEJEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcmVxdWVzdC5yZXN1bHQhXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiR0cmlnZ2VyKCRuZ0RiRXZlbnRzLkRCLlVQR1JBVEVORUVERUQsIFtldmVudCwgcmVxdWVzdF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkb3BlbkRlZmVyZWQucHJvbWlzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFncmVnYSB1biBudWV2byBtb2RlbG9cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJG1vZGVsID0gZnVuY3Rpb24gKG5hbWUsIGRlZikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluc3RhbmNpYXIgZWwgbW9kZWxvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IHNlbGYuJG1vZGVsc1tuYW1lXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTaSBubyBleGlzdGUgZWwgbW9kZWxvIGNyZWFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbW9kZWwpIG1vZGVsID0gJGlNb2RlbChzZWxmLCBuYW1lKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBHdWFyZGFyIGVsIG1vZGVsbyBlbiBsb3MgbW9kZWxvc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRtb2RlbHNbbmFtZV0gPSBtb2RlbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXRvcm5hciBlbCBtb2RlbG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vZGVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRjcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIG1vZGVsSWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm9uVXBncmF0ZU5lZWRlZChmdW5jdGlvbiAoJGV2ZW50LCByZXF1ZXN0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGIgPSByZXF1ZXN0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYi5jcmVhdGVPYmplY3RTdG9yZShtb2RlbE5hbWUsIG1vZGVsSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWEgZWwgb2JqZWN0U3RvcmUgcGFyYSB1biBtb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kY3JlYXRlSW5kZXggPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYub25VcGdyYXRlTmVlZGVkKGZ1bmN0aW9uICgkZXZlbnQsIHJlcXVlc3QpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYiA9IHJlcXVlc3QucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdG9yZSA9IHJlcXVlc3QudHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUobW9kZWxOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXIgYWxpYXMgcGFyYSBsb3MgZXZlbnRvcyBlbmxhemFyIGNhbGxiYWNrcyBhIGxvcyBldmVudG9zXG4gICAgICAgICAgICAgICAgICAgICAgICBuZy5mb3JFYWNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25PcGVuU3VjY2VzczogJG5nRGJFdmVudHMuREIuT1BFTl9TVUNDRVNTLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk9wZW5FcnJvcjogJG5nRGJFdmVudHMuREIuT1BFTl9FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VcGdyYXRlTmVlZGVkOiAkbmdEYkV2ZW50cy5EQi5VUEdSQVRFTkVFREVELFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVycm9yOiAkbmdEYkV2ZW50cy5EQi5FUlJPUlxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGV2ZW50LCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGZbaV0gPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRiaW5kKGV2ZW50LCBjYik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lEYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlNb2RlbFNlcnZpY2VGYWN0b3J5KG5nKSB7XHJcbiAgLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIGlNb2RlbFNlcnZpY2UgKCkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbiAkaU1vZGVsKCRkYiwgJG1vZGVsTmFtZSkgeyBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAvLyBDbGF2ZSBkZWwgbW9kZWxvXHJcbiAgICAgIGxldCAkaWQgPSB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfTtcclxuXHJcbiAgICAgIC8vIENvbnN0dWN0b3IgZGVsIG1vZGVsb1xyXG4gICAgICBmdW5jdGlvbiAkTW9kZWwoKSB7XHJcbiAgICAgICAgdGhpcy4kY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIENvbnN0dXJjdG9yIHF1ZSBzZSBwdWVkZSBzb2JyZSBlc2NyaWJpclxyXG4gICAgICAkTW9kZWwucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cclxuICAgICAgJE1vZGVsLiRpZCA9IGZ1bmN0aW9uICgkcElpZCkge1xyXG4gICAgICAgICRpZCA9ICRwSWlkXHJcblxyXG4gICAgICAgIHJldHVybiAkTW9kZWw7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBDcmVhIGVsIG9iamVjdG8gc3RvcmFnZSBwYXJhIGVsIG1vZGVsby5cclxuICAgICAgJE1vZGVsLiRjcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICRkYi4kY3JlYXRlU3RvcmUoJG1vZGVsTmFtZSwgJGlkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICRNb2RlbDtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBBZ3JlZ2EgdW4gaW5kZXhcclxuICAgICAgJE1vZGVsLiRpbmRleCA9IGZ1bmN0aW9uIChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xyXG5cclxuICAgICAgICAkZGIuJGNyZWF0ZUluZGV4KCRtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICRNb2RlbDtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBNw6l0b2RvIHF1ZSBwZXJtaXRlIG1vZGlmaWNhciBtb2RlbC5cclxuICAgICAgJE1vZGVsLiRidWlsZCA9IGZ1bmN0aW9uIChidWlsZENhbGxiYWNrKSB7XHJcblxyXG4gICAgICAgIGJ1aWxkQ2FsbGJhY2soJE1vZGVsKTtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXR1cm4gJE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG5cclxuICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pTW9kZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaU1vZGVsU2VydmljZUZhY3Rvcnk7XG5mdW5jdGlvbiBpTW9kZWxTZXJ2aWNlRmFjdG9yeShuZykge1xuICAgICAgLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaU1vZGVsU2VydmljZSgpIHtcbiAgICAgICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAkaU1vZGVsKCRkYiwgJG1vZGVsTmFtZSkge1xuICAgICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgICAvLyBDbGF2ZSBkZWwgbW9kZWxvXG4gICAgICAgICAgICAgICAgICB2YXIgJGlkID0geyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OiB0cnVlIH07XG5cbiAgICAgICAgICAgICAgICAgIC8vIENvbnN0dWN0b3IgZGVsIG1vZGVsb1xuICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gJE1vZGVsKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIC8vIENvbnN0dXJjdG9yIHF1ZSBzZSBwdWVkZSBzb2JyZSBlc2NyaWJpclxuICAgICAgICAgICAgICAgICAgJE1vZGVsLnByb3RvdHlwZS4kY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgICAgICAgICAgICAgICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xuICAgICAgICAgICAgICAgICAgJE1vZGVsLiRpZCA9IGZ1bmN0aW9uICgkcElpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGlkID0gJHBJaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkTW9kZWw7XG4gICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAvLyBDcmVhIGVsIG9iamVjdG8gc3RvcmFnZSBwYXJhIGVsIG1vZGVsby5cbiAgICAgICAgICAgICAgICAgICRNb2RlbC4kY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkZGIuJGNyZWF0ZVN0b3JlKCRtb2RlbE5hbWUsICRpZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkTW9kZWw7XG4gICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAvLyBBZ3JlZ2EgdW4gaW5kZXhcbiAgICAgICAgICAgICAgICAgICRNb2RlbC4kaW5kZXggPSBmdW5jdGlvbiAoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJGRiLiRjcmVhdGVJbmRleCgkbW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkTW9kZWw7XG4gICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAvLyBNw6l0b2RvIHF1ZSBwZXJtaXRlIG1vZGlmaWNhciBtb2RlbC5cbiAgICAgICAgICAgICAgICAgICRNb2RlbC4kYnVpbGQgPSBmdW5jdGlvbiAoYnVpbGRDYWxsYmFjaykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBidWlsZENhbGxiYWNrKCRNb2RlbCk7XG4gICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gJE1vZGVsO1xuICAgICAgICAgICAgfTtcbiAgICAgIH07XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaU1vZGVsLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==