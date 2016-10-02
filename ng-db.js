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
	
	var _events = __webpack_require__(3);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _idb = __webpack_require__(2);
	
	var _idb2 = _interopRequireDefault(_idb);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	angular.module('ngDb', []).constant('NG_DB_VERSION', '0.0.1').service('$ngDbUtils', function () {
	  return $ngDbUtils;
	}).service('$ngDbEvents', function () {
	  return _events2.default;
	}).service('$iDb', (0, _idb2.default)(angular));

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
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = iDbServiceFactory;
	function iDbServiceFactory(ng) {
	
	  // Funcion para el servicio de la BD
	  return ["$q", "$ngDbUtils", "$ngDbEvents", "$log", function iDbService($q, $ngDbUtils, $ngDbEvents, $log) {
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
	    return function $iDb(dbName, dbVersion) {
	      var self = this;
	
	      $ngDbUtils.validate(arguments, ['string', 'number']);
	
	      // Manejadores de eventos.
	      var eventsCallbacks = {};
	      var openDefered = null;
	
	      // Instancia de la base de datos;
	      var dbInstance = null;
	      self.models = {};
	
	      // Agregar un manejador de evento
	      self.bind = function (eventName, cb) {
	        $ngDbUtils.validate(arguments, ['string', 'function']);
	
	        if (!eventsCallbacks[eventName]) {
	          eventsCallbacks[eventName] = [];
	        }
	
	        eventsCallbacks[eventName].push(cb);
	      };
	
	      //Remueve un manejador de evento
	      self.unbind = function (eventName, cb) {
	        $ngDbUtils.validate(arguments, ['string', 'function']);
	
	        if (!eventsCallbacks[eventName]) return;
	
	        // Buscar el cb
	        var idx = eventsCallbacks[eventName].indexOf(cb);
	
	        // Si se encontro el cb removerlo
	        if (idx != -1) {
	          eventsCallbacks[eventName].splice(idx, 1);
	        }
	      };
	
	      // Dispara un evento
	      self.trigger = function (eventName, args) {
	        $ngDbUtils.validate(arguments, ['string', 'object']);
	
	        $log.log(dbName + '.v' + (dbVersion || 1) + ': ' + eventName);
	
	        for (var i in eventsCallbacks[eventName]) {
	          eventsCallbacks[eventName][i].apply(self, args);
	        }
	      };
	
	      // Abrir una Base de datos.
	      self.open = function () {
	
	        if (openDefered) return openDefered.promise;
	
	        // Crear un nuevo defer
	        openDefered = $q.defer();
	
	        // dejamos abierta nuestra base de datos
	        var request = window.indexedDB.open(dbName, dbVersion);
	
	        // Asignar el manejador de errores
	        // Do something with request.errorCode!
	        request.onerror = function (event) {
	          self.trigger($ngDbEvents.DB.OPEN_ERROR, [event, request.errorCode]);
	          openDefered.reject(request.errorCode);
	        };
	
	        // Asignar el manejador del resultado
	        request.onsuccess = function (event) {
	          // Do something with request.result!
	          dbInstance = request.result;
	
	          // Asingar el manejador de errores a la BD
	          dbInstance.onerror = function (event) {
	            $log.error('Database error: ' + event.target.errorCode);
	            self.trigger($ngDbEvents.DB.ERROR, [event]);
	          };
	
	          self.trigger($ngDbEvents.DB.OPEN_SUCCESS, [event, dbInstance]);
	          openDefered.resolve(dbInstance);
	        };
	
	        // Asignar el callback para la actualizacion de los modelos entre versiones de la BD
	        request.onupgradeneeded = function (event) {
	          self.trigger($ngDbEvents.DB.UPGRATENEEDED, [event]);
	        };
	
	        return openDefered.promise;
	      };
	
	      // Crear alias para los eventos enlazar callbacks a los eventos
	      ng.forEach({
	        onOpenSuccess: $ngDbEvents.DB.OPEN_SUCCESS,
	        onOpenError: $ngDbEvents.DB.OPEN_ERROR,
	        onUpgrateNeeded: $ngDbEvents.DB.UPGRATENEEDED,
	        onError: $ngDbEvents.DB.ERROR
	      }, function (event, i) {
	        self[i] = function (cb) {
	          return self.bind(event, cb);
	        };
	      });
	    };
	  }];
	}

/***/ },
/* 3 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzhhNjI5MzkwNjYyNzVjZWM5ZjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy92YWxpZGF0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvdmFsaWRhdGlvbnMuanM/YzE5ZiIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGIuanM/NjM1MCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9ldmVudHMuanM/NTcwNCJdLCJuYW1lcyI6WyIkbmdEYlV0aWxzIiwiYW5ndWxhciIsIm1vZHVsZSIsImNvbnN0YW50Iiwic2VydmljZSIsImlzQ2FsbGJhY2siLCJtdXN0QmVDYWxsYmFjayIsIm11c3RCZSIsInZhbGlkYXRlIiwiY2IiLCJ0aHJvd0Vycm9yIiwidW5kZWZpbmVkIiwiZXJyIiwiRXJyb3IiLCJuYW1lIiwidmFsdWUiLCJ0eXBlcyIsImkiLCJhcmdzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJ2YWx1ZXMiLCJpRGJTZXJ2aWNlRmFjdG9yeSIsIm5nIiwiaURiU2VydmljZSIsIiRxIiwiJG5nRGJFdmVudHMiLCIkbG9nIiwiaW5kZXhlZERCIiwid2luZG93IiwibW96SW5kZXhlZERCIiwid2Via2l0SW5kZXhlZERCIiwibXNJbmRleGVkREIiLCJJREJUcmFuc2FjdGlvbiIsIndlYmtpdElEQlRyYW5zYWN0aW9uIiwibXNJREJUcmFuc2FjdGlvbiIsIklEQktleVJhbmdlIiwid2Via2l0SURCS2V5UmFuZ2UiLCJtc0lEQktleVJhbmdlIiwiYWxlcnQiLCIkaURiIiwiZGJOYW1lIiwiZGJWZXJzaW9uIiwic2VsZiIsImFyZ3VtZW50cyIsImV2ZW50c0NhbGxiYWNrcyIsIm9wZW5EZWZlcmVkIiwiZGJJbnN0YW5jZSIsIm1vZGVscyIsImJpbmQiLCJldmVudE5hbWUiLCJwdXNoIiwidW5iaW5kIiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsInRyaWdnZXIiLCJsb2ciLCJhcHBseSIsIm9wZW4iLCJwcm9taXNlIiwiZGVmZXIiLCJyZXF1ZXN0Iiwib25lcnJvciIsImV2ZW50IiwiREIiLCJPUEVOX0VSUk9SIiwiZXJyb3JDb2RlIiwicmVqZWN0Iiwib25zdWNjZXNzIiwicmVzdWx0IiwiZXJyb3IiLCJ0YXJnZXQiLCJFUlJPUiIsIk9QRU5fU1VDQ0VTUyIsInJlc29sdmUiLCJvbnVwZ3JhZGVuZWVkZWQiLCJVUEdSQVRFTkVFREVEIiwiZm9yRWFjaCIsIm9uT3BlblN1Y2Nlc3MiLCJvbk9wZW5FcnJvciIsIm9uVXBncmF0ZU5lZWRlZCIsIm9uRXJyb3IiLCJPUEVOIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTs7QUFFQTs7QUNFQSxLREZZQSxhQ0VLLHdCQUF3Qjs7QUREekM7O0FDS0EsS0FBSSxXQUFXLHVCQUF1Qjs7QURIdEM7O0FDT0EsS0FBSSxRQUFRLHVCQUF1Qjs7QUFFbkMsVUFBUyx1QkFBdUIsS0FBSyxFQUFFLE9BQU8sT0FBTyxJQUFJLGFBQWEsTUFBTSxFQUFFLFNBQVM7O0FBRXZGLFVBQVMsd0JBQXdCLEtBQUssRUFBRSxJQUFJLE9BQU8sSUFBSSxZQUFZLEVBQUUsT0FBTyxZQUFZLEVBQUUsSUFBSSxTQUFTLElBQUksSUFBSSxPQUFPLE1BQU0sRUFBRSxLQUFLLElBQUksT0FBTyxLQUFLLEVBQUUsSUFBSSxPQUFPLFVBQVUsZUFBZSxL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V0FBV2dCLFVBQVUsVUFBVUMsT0FBTzthQUNwQ3JDLEtBQUs0QyxNQUFNLHFCQUFvQlAsTUFBTVEsT0FBT0w7YUFDNUN4QixLQUFLYSxRQUFROUIsWUFBWXVDLEdBQUdRLE9BQU8sQ0FBQ1Q7OztXQUd0Q3JCLEtBQUthLFFBQVE5QixZQUFZdUMsR0FBR1MsY0FBYyxDQUFDVixPQUFPakI7V0FDbERELFlBQVk2QixRQUFRNUI7Ozs7U0FLdEJlLFFBQVFjLGtCQUFrQixVQUFVWixPQUFPO1dBQ3pDckIsS0FBS2EsUUFBUTlCLFlBQVl1QyxHQUFHWSxlQUFlLENBQUNiOzs7U0FHOUMsT0FBT2xCLFlBQVljOzs7O09BS3JCckMsR0FBR3VELFFBQVE7U0FDVEMsZUFBZXJELFlBQVl1QyxHQUFHUztTQUM5Qk0sYUFBYXRELFlBQVl1QyxHQUFHQztTQUM1QmUsaUJBQWlCdkQsWUFBWXVDLEdBQUdZO1NBQ2hDSyxTQUFTeEQsWUFBWXVDLEdBQUdRO1VBQ3ZCLFVBQVVULE9BQU9qRCxHQUFHO1NBQ3JCNEIsS0FBSzVCLEtBQUssVUFBQ1IsSUFBRDtXQUFBLE9BQVFvQyxLQUFLTSxLQUFLZSxPQUFPekQ7Ozs7Ozs7Ozs7O0FFM0gzQzs7OztBQ0lBLFFBQU8sZUFBZSxTQUFTLGNBQWM7R0FDM0MsT0FBTzs7QUFFVCxTQUFRLFVESk87R0FDYjBELElBQUk7S0FDRmtCLE1BQUs7S0FDTFQsY0FBYztLQUNkUixZQUFZO0tBQ1pPLE9BQU87S0FDUEksZUFBZSIsImZpbGUiOiJuZy1kYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMzhhNjI5MzkwNjYyNzVjZWM5ZjJcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyAkbmdEYlV0aWxzIGZyb20gJy4vdXRpbHMvdmFsaWRhdGlvbnMnO1xyXG5pbXBvcnQgJG5nRGJFdmVudHMgZnJvbSAnLi91dGlscy9ldmVudHMnO1xyXG5cclxuaW1wb3J0IGlEYlNlcnZpY2VGYWN0b3J5IGZyb20gJy4vc2VydmljZXMvaWRiJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCduZ0RiJywgW10pXHJcbiAgLmNvbnN0YW50KCdOR19EQl9WRVJTSU9OJywgJzAuMC4xJylcclxuICAuc2VydmljZSgnJG5nRGJVdGlscycsIGZ1bmN0aW9uICgpIHsgcmV0dXJuICRuZ0RiVXRpbHM7IH0pXHJcbiAgLnNlcnZpY2UoJyRuZ0RiRXZlbnRzJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gJG5nRGJFdmVudHM7IH0pXHJcbiAgLnNlcnZpY2UoJyRpRGInLCBpRGJTZXJ2aWNlRmFjdG9yeShhbmd1bGFyKSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3ZhbGlkYXRpb25zID0gcmVxdWlyZSgnLi91dGlscy92YWxpZGF0aW9ucycpO1xuXG52YXIgJG5nRGJVdGlscyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF92YWxpZGF0aW9ucyk7XG5cbnZhciBfZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKTtcblxudmFyIF9ldmVudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXZlbnRzKTtcblxudmFyIF9pZGIgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYicpO1xuXG52YXIgX2lkYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZGIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5hbmd1bGFyLm1vZHVsZSgnbmdEYicsIFtdKS5jb25zdGFudCgnTkdfREJfVkVSU0lPTicsICcwLjAuMScpLnNlcnZpY2UoJyRuZ0RiVXRpbHMnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAkbmdEYlV0aWxzO1xufSkuc2VydmljZSgnJG5nRGJFdmVudHMnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBfZXZlbnRzMi5kZWZhdWx0O1xufSkuc2VydmljZSgnJGlEYicsICgwLCBfaWRiMi5kZWZhdWx0KShhbmd1bGFyKSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBGdW5jaW9uIHBhcmEgZGV0ZXJtaW5hciBzaSBlcyB1biBjYWxsYmFjayB2w6FsaWRvIG8gbm9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2FsbGJhY2sgKGNiLCB0aHJvd0Vycm9yKSB7XHJcblxyXG4gIGlmICh0eXBlb2YgY2IgPT0gJ2Z1bmN0aW9uJyB8fCBjYiA9PSBudWxsIHx8IGNiID09IHVuZGVmaW5lZCl7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBmYWxzZTtcclxuXHJcbn1cclxuXHJcbi8vIFNpIGVsIGNhbGxiYWNrIG5vIGVzIHbDoWxpZG8gbGFuemEgdW4gZXJycG9yXHJcbmV4cG9ydCBmdW5jdGlvbiBtdXN0QmVDYWxsYmFjayAoY2IpIHtcclxuICBpZiAoaXNDYWxsYmFjayhjYikpIHJldHVybjtcclxuXHJcbiAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCBjYWxsYmFjaycpO1xyXG4gIGVyci5uYW1lID0gJ0ludmFsaWRDYWxsYmFjaydcclxuXHJcbiAgdGhyb3cgZXJyO1xyXG5cclxufVxyXG5cclxuLy8gR2VuZXJhIHVuIGVycm9yIHNpIGVsIHZhbG9yIG5vIGVzIGRlbCB0aXBvIGluZGljYWRvIHBvciBwYXJhbWV0cm9cclxuZXhwb3J0IGZ1bmN0aW9uIG11c3RCZSAodmFsdWUsIHR5cGVzKSB7XHJcbiAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xyXG4gIGZvcih2YXIgaSBpbiB0eXBlcyl7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09IHR5cGVzW2ldKSBjb250aW51ZTtcclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWU6ICcrdmFsdWUrJyBtdXN0IGJlICcrdHlwZXNbaV0pO1xyXG4gICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbHVlJ1xyXG4gICAgdGhyb3cgZXJyO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbi8vIFZhbGlkYSB1biBhcnJheSBkZSBhcmd1bWVudG9zIGNvbiB1biBhcnJhIGRlIHRpcG9zXHJcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZSAoYXJncywgdHlwZXMpIHtcclxuICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyk7XHJcbiAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xyXG4gIGZvciAodmFyIGkgaW4gYXJncyl7XHJcbiAgICBpZiAodHlwZXNbaV0pe1xyXG4gICAgICBpZiAodHlwZW9mIHR5cGVzW2ldID09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlc1tpXSA9PSAnb2JqZWN0Jyl7XHJcbiAgICAgICAgbXVzdEJlKGFyZ3NbaV0sIHR5cGVzW2ldKTtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZW9mIHR5cGVzW2ldID09ICdmdW5jaW9uJyl7XHJcbiAgICAgICAgdHlwZXNbaV0oYXJnc1tpXSk7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsaWRhdG9yIHRvOiAnK3ZhbHVlc1tpXSsnIG11c3QgYmUgJyt0eXBlc1tpXSk7XHJcbiAgICAgIGVyci5uYW1lID0gJ0ludmFsaWRWYWxpZGF0b3InXHJcbiAgICAgIHRocm93IGVycjtcclxuXHJcbiAgICB9XHJcbiAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvdmFsaWRhdGlvbnMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBkZXRlcm1pbmFyIHNpIGVzIHVuIGNhbGxiYWNrIHbDoWxpZG8gbyBub1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmV4cG9ydHMuaXNDYWxsYmFjayA9IGlzQ2FsbGJhY2s7XG5leHBvcnRzLm11c3RCZUNhbGxiYWNrID0gbXVzdEJlQ2FsbGJhY2s7XG5leHBvcnRzLm11c3RCZSA9IG11c3RCZTtcbmV4cG9ydHMudmFsaWRhdGUgPSB2YWxpZGF0ZTtcbmZ1bmN0aW9uIGlzQ2FsbGJhY2soY2IsIHRocm93RXJyb3IpIHtcblxuICBpZiAodHlwZW9mIGNiID09ICdmdW5jdGlvbicgfHwgY2IgPT0gbnVsbCB8fCBjYiA9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gU2kgZWwgY2FsbGJhY2sgbm8gZXMgdsOhbGlkbyBsYW56YSB1biBlcnJwb3JcbmZ1bmN0aW9uIG11c3RCZUNhbGxiYWNrKGNiKSB7XG4gIGlmIChpc0NhbGxiYWNrKGNiKSkgcmV0dXJuO1xuXG4gIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgY2FsbGJhY2snKTtcbiAgZXJyLm5hbWUgPSAnSW52YWxpZENhbGxiYWNrJztcblxuICB0aHJvdyBlcnI7XG59XG5cbi8vIEdlbmVyYSB1biBlcnJvciBzaSBlbCB2YWxvciBubyBlcyBkZWwgdGlwbyBpbmRpY2FkbyBwb3IgcGFyYW1ldHJvXG5mdW5jdGlvbiBtdXN0QmUodmFsdWUsIHR5cGVzKSB7XG4gIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcbiAgZm9yICh2YXIgaSBpbiB0eXBlcykge1xuICAgIGlmICgodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSkpID09IHR5cGVzW2ldKSBjb250aW51ZTtcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlOiAnICsgdmFsdWUgKyAnIG11c3QgYmUgJyArIHR5cGVzW2ldKTtcbiAgICBlcnIubmFtZSA9ICdJbnZhbGlkVmFsdWUnO1xuICAgIHRocm93IGVycjtcbiAgfVxufVxuXG4vLyBWYWxpZGEgdW4gYXJyYXkgZGUgYXJndW1lbnRvcyBjb24gdW4gYXJyYSBkZSB0aXBvc1xuZnVuY3Rpb24gdmFsaWRhdGUoYXJncywgdHlwZXMpIHtcbiAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICBpZiAodHlwZW9mIHR5cGVzID09ICdzdHJpbmcnKSB0eXBlcyA9IFt0eXBlc107XG4gIGZvciAodmFyIGkgaW4gYXJncykge1xuICAgIGlmICh0eXBlc1tpXSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlc1tpXSA9PSAnc3RyaW5nJyB8fCBfdHlwZW9mKHR5cGVzW2ldKSA9PSAnb2JqZWN0Jykge1xuICAgICAgICBtdXN0QmUoYXJnc1tpXSwgdHlwZXNbaV0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdHlwZXNbaV0gPT0gJ2Z1bmNpb24nKSB7XG4gICAgICAgIHR5cGVzW2ldKGFyZ3NbaV0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWxpZGF0b3IgdG86ICcgKyB2YWx1ZXNbaV0gKyAnIG11c3QgYmUgJyArIHR5cGVzW2ldKTtcbiAgICAgIGVyci5uYW1lID0gJ0ludmFsaWRWYWxpZGF0b3InO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL3ZhbGlkYXRpb25zLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaURiU2VydmljZUZhY3RvcnkobmcpIHtcclxuXHJcbiAgLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIGlEYlNlcnZpY2UgKCRxLCAkbmdEYlV0aWxzLCAkbmdEYkV2ZW50cywgJGxvZykgeyAnbmdJbmplY3QnO1xyXG5cclxuICAgIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cclxuICAgIGNvbnN0IGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQjtcclxuICAgIC8vIE5vIHVzZSBcInZhciBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXHJcbiAgICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcclxuICAgIGNvbnN0IElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcclxuICAgIGNvbnN0IElEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcclxuICAgIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXHJcbiAgICBcclxuICAgIGlmICghaW5kZXhlZERCKSB7XHJcbiAgICAgIHdpbmRvdy5hbGVydChcIlN1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhc1wiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENsYXNlIHBhcmEgbGEgY3JlYWNpw7NuIGRlIGluc3RhbmNpYXMgZGUgbGEgQkRcclxuICAgIHJldHVybiBmdW5jdGlvbiAkaURiKGRiTmFtZSwgZGJWZXJzaW9uKSB7IGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICBcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ251bWJlciddKTtcclxuXHJcbiAgICAgIC8vIE1hbmVqYWRvcmVzIGRlIGV2ZW50b3MuXHJcbiAgICAgIGxldCBldmVudHNDYWxsYmFja3MgPSB7fTtcclxuICAgICAgbGV0IG9wZW5EZWZlcmVkID0gbnVsbDtcclxuXHJcbiAgICAgIC8vIEluc3RhbmNpYSBkZSBsYSBiYXNlIGRlIGRhdG9zO1xyXG4gICAgICBsZXQgZGJJbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgIHNlbGYubW9kZWxzID0ge307XHJcbiAgICAgIFxyXG4gICAgICAvLyBBZ3JlZ2FyIHVuIG1hbmVqYWRvciBkZSBldmVudG9cclxuICAgICAgc2VsZi5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcclxuICAgICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICAgIGlmICghZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pe1xyXG4gICAgICAgICAgZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnB1c2goY2IpO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vUmVtdWV2ZSB1biBtYW5lamFkb3IgZGUgZXZlbnRvXHJcbiAgICAgIHNlbGYudW5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcclxuICAgICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XHJcblxyXG4gICAgICAgIGlmICghZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gQnVzY2FyIGVsIGNiXHJcbiAgICAgICAgY29uc3QgaWR4ID0gZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uaW5kZXhPZihjYik7XHJcblxyXG4gICAgICAgIC8vIFNpIHNlIGVuY29udHJvIGVsIGNiIHJlbW92ZXJsb1xyXG4gICAgICAgIGlmIChpZHggIT0gLTEpe1xyXG4gICAgICAgICAgZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXHJcbiAgICAgIHNlbGYudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHtcclxuICAgICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0J10pO1xyXG5cclxuICAgICAgICAkbG9nLmxvZyhkYk5hbWUrJy52JysoZGJWZXJzaW9ufHwxKSsnOiAnK2V2ZW50TmFtZSk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSBpbiBldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSl7XHJcbiAgICAgICAgICBldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXVtpXS5hcHBseShzZWxmLCBhcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQWJyaXIgdW5hIEJhc2UgZGUgZGF0b3MuXHJcbiAgICAgIHNlbGYub3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAob3BlbkRlZmVyZWQpIHJldHVybiBvcGVuRGVmZXJlZC5wcm9taXNlO1xyXG5cclxuICAgICAgICAvLyBDcmVhciB1biBudWV2byBkZWZlclxyXG4gICAgICAgIG9wZW5EZWZlcmVkID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgLy8gZGVqYW1vcyBhYmllcnRhIG51ZXN0cmEgYmFzZSBkZSBkYXRvc1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSB3aW5kb3cuaW5kZXhlZERCLm9wZW4oZGJOYW1lLCBkYlZlcnNpb24pO1xyXG5cclxuICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzXHJcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXF1ZXN0LmVycm9yQ29kZSFcclxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHNlbGYudHJpZ2dlcigkbmdEYkV2ZW50cy5EQi5PUEVOX0VSUk9SLCBbZXZlbnQsIHJlcXVlc3QuZXJyb3JDb2RlXSk7XHJcbiAgICAgICAgICBvcGVuRGVmZXJlZC5yZWplY3QocmVxdWVzdC5lcnJvckNvZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGVsIHJlc3VsdGFkb1xyXG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXF1ZXN0LnJlc3VsdCFcclxuICAgICAgICAgIGRiSW5zdGFuY2UgPSByZXF1ZXN0LnJlc3VsdDtcclxuXHJcbiAgICAgICAgICAvLyBBc2luZ2FyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzIGEgbGEgQkRcclxuICAgICAgICAgIGRiSW5zdGFuY2Uub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAkbG9nLmVycm9yKCdEYXRhYmFzZSBlcnJvcjogJysgZXZlbnQudGFyZ2V0LmVycm9yQ29kZSk7XHJcbiAgICAgICAgICAgIHNlbGYudHJpZ2dlcigkbmdEYkV2ZW50cy5EQi5FUlJPUiwgW2V2ZW50XSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2VsZi50cmlnZ2VyKCRuZ0RiRXZlbnRzLkRCLk9QRU5fU1VDQ0VTUywgW2V2ZW50LCBkYkluc3RhbmNlXSk7XHJcbiAgICAgICAgICBvcGVuRGVmZXJlZC5yZXNvbHZlKGRiSW5zdGFuY2UpO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBBc2lnbmFyIGVsIGNhbGxiYWNrIHBhcmEgbGEgYWN0dWFsaXphY2lvbiBkZSBsb3MgbW9kZWxvcyBlbnRyZSB2ZXJzaW9uZXMgZGUgbGEgQkRcclxuICAgICAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgc2VsZi50cmlnZ2VyKCRuZ0RiRXZlbnRzLkRCLlVQR1JBVEVORUVERUQsIFtldmVudF0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBvcGVuRGVmZXJlZC5wcm9taXNlO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIENyZWFyIGFsaWFzIHBhcmEgbG9zIGV2ZW50b3MgZW5sYXphciBjYWxsYmFja3MgYSBsb3MgZXZlbnRvc1xyXG4gICAgICBuZy5mb3JFYWNoKHtcclxuICAgICAgICBvbk9wZW5TdWNjZXNzOiAkbmdEYkV2ZW50cy5EQi5PUEVOX1NVQ0NFU1MsXHJcbiAgICAgICAgb25PcGVuRXJyb3I6ICRuZ0RiRXZlbnRzLkRCLk9QRU5fRVJST1IsXHJcbiAgICAgICAgb25VcGdyYXRlTmVlZGVkOiAkbmdEYkV2ZW50cy5EQi5VUEdSQVRFTkVFREVELFxyXG4gICAgICAgIG9uRXJyb3I6ICRuZ0RiRXZlbnRzLkRCLkVSUk9SLFxyXG4gICAgICB9LCBmdW5jdGlvbiAoZXZlbnQsIGkpIHtcclxuICAgICAgICBzZWxmW2ldID0gKGNiKSA9PiBzZWxmLmJpbmQoZXZlbnQsIGNiKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lkYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlEYlNlcnZpY2VGYWN0b3J5O1xuZnVuY3Rpb24gaURiU2VydmljZUZhY3RvcnkobmcpIHtcblxuICAvLyBGdW5jaW9uIHBhcmEgZWwgc2VydmljaW8gZGUgbGEgQkRcbiAgcmV0dXJuIGZ1bmN0aW9uIGlEYlNlcnZpY2UoJHEsICRuZ0RiVXRpbHMsICRuZ0RiRXZlbnRzLCAkbG9nKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cblxuICAgIHZhciBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XG4gICAgLy8gTm8gdXNlIFwidmFyIGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cbiAgICAvLyBQb3Igb3RyYSBwYXJ0ZSwgcHVlZGVzIG5lY2VzaXRhciByZWZlcmVuY2lhcyBhIGFsZ3VuIG9iamV0byB3aW5kb3cuSURCKjpcbiAgICB2YXIgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xuICAgIHZhciBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XG4gICAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcblxuICAgIGlmICghaW5kZXhlZERCKSB7XG4gICAgICB3aW5kb3cuYWxlcnQoXCJTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXNcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2xhc2UgcGFyYSBsYSBjcmVhY2nDs24gZGUgaW5zdGFuY2lhcyBkZSBsYSBCRFxuICAgIHJldHVybiBmdW5jdGlvbiAkaURiKGRiTmFtZSwgZGJWZXJzaW9uKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdudW1iZXInXSk7XG5cbiAgICAgIC8vIE1hbmVqYWRvcmVzIGRlIGV2ZW50b3MuXG4gICAgICB2YXIgZXZlbnRzQ2FsbGJhY2tzID0ge307XG4gICAgICB2YXIgb3BlbkRlZmVyZWQgPSBudWxsO1xuXG4gICAgICAvLyBJbnN0YW5jaWEgZGUgbGEgYmFzZSBkZSBkYXRvcztcbiAgICAgIHZhciBkYkluc3RhbmNlID0gbnVsbDtcbiAgICAgIHNlbGYubW9kZWxzID0ge307XG5cbiAgICAgIC8vIEFncmVnYXIgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xuICAgICAgc2VsZi5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcbiAgICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ2Z1bmN0aW9uJ10pO1xuXG4gICAgICAgIGlmICghZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICBldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0ucHVzaChjYik7XG4gICAgICB9O1xuXG4gICAgICAvL1JlbXVldmUgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xuICAgICAgc2VsZi51bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xuICAgICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnZnVuY3Rpb24nXSk7XG5cbiAgICAgICAgaWYgKCFldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkgcmV0dXJuO1xuXG4gICAgICAgIC8vIEJ1c2NhciBlbCBjYlxuICAgICAgICB2YXIgaWR4ID0gZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0uaW5kZXhPZihjYik7XG5cbiAgICAgICAgLy8gU2kgc2UgZW5jb250cm8gZWwgY2IgcmVtb3ZlcmxvXG4gICAgICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgICAgICBldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gRGlzcGFyYSB1biBldmVudG9cbiAgICAgIHNlbGYudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHtcbiAgICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcblxuICAgICAgICAkbG9nLmxvZyhkYk5hbWUgKyAnLnYnICsgKGRiVmVyc2lvbiB8fCAxKSArICc6ICcgKyBldmVudE5hbWUpO1xuXG4gICAgICAgIGZvciAodmFyIGkgaW4gZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICBldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXVtpXS5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gQWJyaXIgdW5hIEJhc2UgZGUgZGF0b3MuXG4gICAgICBzZWxmLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKG9wZW5EZWZlcmVkKSByZXR1cm4gb3BlbkRlZmVyZWQucHJvbWlzZTtcblxuICAgICAgICAvLyBDcmVhciB1biBudWV2byBkZWZlclxuICAgICAgICBvcGVuRGVmZXJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgLy8gZGVqYW1vcyBhYmllcnRhIG51ZXN0cmEgYmFzZSBkZSBkYXRvc1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHdpbmRvdy5pbmRleGVkREIub3BlbihkYk5hbWUsIGRiVmVyc2lvbik7XG5cbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGUgZXJyb3Jlc1xuICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXF1ZXN0LmVycm9yQ29kZSFcbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgc2VsZi50cmlnZ2VyKCRuZ0RiRXZlbnRzLkRCLk9QRU5fRVJST1IsIFtldmVudCwgcmVxdWVzdC5lcnJvckNvZGVdKTtcbiAgICAgICAgICBvcGVuRGVmZXJlZC5yZWplY3QocmVxdWVzdC5lcnJvckNvZGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlbCByZXN1bHRhZG9cbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXF1ZXN0LnJlc3VsdCFcbiAgICAgICAgICBkYkluc3RhbmNlID0gcmVxdWVzdC5yZXN1bHQ7XG5cbiAgICAgICAgICAvLyBBc2luZ2FyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzIGEgbGEgQkRcbiAgICAgICAgICBkYkluc3RhbmNlLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICRsb2cuZXJyb3IoJ0RhdGFiYXNlIGVycm9yOiAnICsgZXZlbnQudGFyZ2V0LmVycm9yQ29kZSk7XG4gICAgICAgICAgICBzZWxmLnRyaWdnZXIoJG5nRGJFdmVudHMuREIuRVJST1IsIFtldmVudF0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBzZWxmLnRyaWdnZXIoJG5nRGJFdmVudHMuREIuT1BFTl9TVUNDRVNTLCBbZXZlbnQsIGRiSW5zdGFuY2VdKTtcbiAgICAgICAgICBvcGVuRGVmZXJlZC5yZXNvbHZlKGRiSW5zdGFuY2UpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFzaWduYXIgZWwgY2FsbGJhY2sgcGFyYSBsYSBhY3R1YWxpemFjaW9uIGRlIGxvcyBtb2RlbG9zIGVudHJlIHZlcnNpb25lcyBkZSBsYSBCRFxuICAgICAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHNlbGYudHJpZ2dlcigkbmdEYkV2ZW50cy5EQi5VUEdSQVRFTkVFREVELCBbZXZlbnRdKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gb3BlbkRlZmVyZWQucHJvbWlzZTtcbiAgICAgIH07XG5cbiAgICAgIC8vIENyZWFyIGFsaWFzIHBhcmEgbG9zIGV2ZW50b3MgZW5sYXphciBjYWxsYmFja3MgYSBsb3MgZXZlbnRvc1xuICAgICAgbmcuZm9yRWFjaCh7XG4gICAgICAgIG9uT3BlblN1Y2Nlc3M6ICRuZ0RiRXZlbnRzLkRCLk9QRU5fU1VDQ0VTUyxcbiAgICAgICAgb25PcGVuRXJyb3I6ICRuZ0RiRXZlbnRzLkRCLk9QRU5fRVJST1IsXG4gICAgICAgIG9uVXBncmF0ZU5lZWRlZDogJG5nRGJFdmVudHMuREIuVVBHUkFURU5FRURFRCxcbiAgICAgICAgb25FcnJvcjogJG5nRGJFdmVudHMuREIuRVJST1JcbiAgICAgIH0sIGZ1bmN0aW9uIChldmVudCwgaSkge1xuICAgICAgICBzZWxmW2ldID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgcmV0dXJuIHNlbGYuYmluZChldmVudCwgY2IpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcbiAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBOb21icmUgZGUgbG9zIGV2ZW50b3NcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIERCOiB7XHJcbiAgICBPUEVOOidkYi5vcGVuZWQnLFxyXG4gICAgT1BFTl9TVUNDRVNTOiAnZGIub3BlbmVkLnN1Y2Nlc3MnLFxyXG4gICAgT1BFTl9FUlJPUjogJ2RiLm9wZW4uZXJyb3InLFxyXG4gICAgRVJST1I6ICdjYi5lcnJvcicsXHJcbiAgICBVUEdSQVRFTkVFREVEOiAnY2IudXBncmFkZW5lZWRlZCdcclxuICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvZXZlbnRzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBOb21icmUgZGUgbG9zIGV2ZW50b3NcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgREI6IHtcbiAgICBPUEVOOiAnZGIub3BlbmVkJyxcbiAgICBPUEVOX1NVQ0NFU1M6ICdkYi5vcGVuZWQuc3VjY2VzcycsXG4gICAgT1BFTl9FUlJPUjogJ2RiLm9wZW4uZXJyb3InLFxuICAgIEVSUk9SOiAnY2IuZXJyb3InLFxuICAgIFVQR1JBVEVORUVERUQ6ICdjYi51cGdyYWRlbmVlZGVkJ1xuICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL2V2ZW50cy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=