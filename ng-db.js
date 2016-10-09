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
	
	  function qsClass() {
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
	      thensResolved();
	    }
	
	    function catchsResolved() {
	      if (!catchs.length) return;
	      var cb = catchs.shift();
	      cb.apply(null, thiz.error);
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
	                        var db = request.result;
	                        db.createObjectStore(modelName, modelId);
	                  });
	            };
	
	            // Crea el objectStore para un model
	            thiz.$createIndex = function (modelName, indexName, fieldName, opts) {
	                  $ngDbUtils.validate(arguments, ['string', 'string', 'string', ['object', 'undefined']]);
	
	                  $upgradeNeededDefered.promise.then(function (event) {
	                        var db = request.result;
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
	                              defered.resolve([event, result]);
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
	                  thiz.$transaction(modelName, "readwrite", function (tx) {
	
	                        var request = tx.objectStore(modelName).put(instance);
	
	                        // Transaccion completada satisfatoriamente
	                        request.onsuccess = function (event) {
	                              console.log('onsuccess', event.target.result);
	                              defered.resolve([event, instance]);
	                        };
	
	                        // Se generó un error en la transacción
	                        request.onerror = function () {
	                              // Could call request.preventDefault() to prevent the transaction from aborting.
	                              defered.reject(request);
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
	
	        // Asigna los atributos
	        $Model.prototype.$setAttributes = function (data) {
	            var thiz = this;
	            $ngDbUtils.validate(arguments, ['object']);
	
	            Object.keys(data).map(function (property) {
	                thiz[property] = data[property];
	            });
	        };
	
	        // Consturctor que se puede sobre escribir
	        $Model.prototype.$constructor = function (data) {};
	
	        // Asigna el ID al modelo
	        $Model.$id = function ($pIid) {
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
	            buildCallback($Model);
	            return $Model;
	        };
	
	        // Crea nuevas instancias de los modelos
	        $Model.$create = function (data, cb) {
	
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
	
	        // Guarda los datos del objeto
	        $Model.prototype.$create = function (cb) {
	            return $db.$create($modelName, this, cb);
	        };
	
	        return $Model;
	    };
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2FkOTUxMzQ4ZmM0OWUzMDgyN2IiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy9uZ0RiVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL25nRGJVdGlscy5qcz9jMWEzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2V2ZW50cy5qcz81NzA0Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9xcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcXMuanM/NjQzOSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaURiLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pRGIuanM/MDUwMiIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaU1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pTW9kZWwuanM/ZTFjYyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29uc3RhbnQiLCJzZXJ2aWNlIiwibmdEYlV0aWxzIiwiJHEiLCJpc0NhbGxiYWNrIiwiY2IiLCJ0aHJvd0Vycm9yIiwidW5kZWZpbmVkIiwibXVzdEJlQ2FsbGJhY2siLCJlcnIiLCJFcnJvciIsIm5hbWUiLCJtdXN0QmUiLCJ2YWx1ZSIsInR5cGVzIiwiaSIsImpvaW4iLCJ2YWxpZGF0ZSIsImFyZ3MiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsInZhbHVlcyIsIkRCX0VSUk9SIiwicXMiLCJxc0NsYXNzIiwidGhpeiIsInRoZW5zIiwidGhlbnNSZWFkeSIsImNhdGNocyIsImNhdGNoc1JlYWR5IiwicmVzdWx0QXJncyIsImVycm9yIiwicHJvbWlzZSIsIiRyZXNvbHZlZCIsInRoZW5zUmVzb2x2ZWQiLCJsZW5ndGgiLCJzaGlmdCIsImFwcGx5IiwiY2F0Y2hzUmVzb2x2ZWQiLCJyZXNvbHZlIiwiYXJndW1lbnRzIiwicmVqZWN0IiwidGhlbiIsInB1c2giLCJyZXNvbHZlZCIsImNhdGNoIiwiZG9uZSIsImNvbmNhdCIsImRlZmVyIiwiaURiU2VydmljZSIsIiRxcyIsIiRpTW9kZWwiLCIkbmdEYlV0aWxzIiwiJG5nRGJFdmVudHMiLCIkbG9nIiwiaW5kZXhlZERCIiwid2luZG93IiwibW96SW5kZXhlZERCIiwid2Via2l0SW5kZXhlZERCIiwibXNJbmRleGVkREIiLCJJREJUcmFuc2FjdGlvbiIsIndlYmtpdElEQlRyYW5zYWN0aW9uIiwibXNJREJUcmFuc2FjdGlvbiIsIklEQktleVJhbmdlIiwid2Via2l0SURCS2V5UmFuZ2UiLCJtc0lEQktleVJhbmdlIiwiYWxlcnQiLCIkaURiIiwiJGRiTmFtZSIsIiRkYlZlcnNpb24iLCIkZXZlbnRzQ2FsbGJhY2tzIiwiJHVwZ3JhZGVOZWVkZWREZWZlcmVkIiwiJG9wZW5EZWZlcmVkIiwiJG9wZW5lZCIsIiRyZXF1ZXN0IiwiJG1vZGVscyIsIiRiaW5kIiwiZXZlbnROYW1lIiwiJHVuYmluZCIsImlkeCIsImluZGV4T2YiLCJzcGxpY2UiLCIkdHJpZ2dlciIsImxvZyIsIiRlcnJvciIsIiRvcGVuIiwicmVxdWVzdCIsIm9wZW4iLCJvbnVwZ3JhZGVuZWVkZWQiLCJldmVudCIsIm9uc3VjY2VzcyIsIm9uZXJyb3IiLCJ0YXJnZXQiLCJlcnJvckNvZGUiLCIkbW9kZWwiLCJtb2RlbCIsIiRjcmVhdGVTdG9yZSIsIm1vZGVsTmFtZSIsIm1vZGVsSWQiLCJkYiIsInJlc3VsdCIsImNyZWF0ZU9iamVjdFN0b3JlIiwiJGNyZWF0ZUluZGV4IiwiaW5kZXhOYW1lIiwiZmllbGROYW1lIiwib3B0cyIsInN0b3JlIiwidHJhbnNhY3Rpb24iLCJvYmplY3RTdG9yZSIsImNyZWF0ZUluZGV4IiwiJHRyYW5zYWN0aW9uIiwicGVybXMiLCJhY3Rpb24iLCJkZWZlcmVkIiwidHgiLCJvbmNvbXBsZXRlIiwib25hYm9ydCIsIiRjcmVhdGUiLCJpbnN0YW5jZSIsInB1dCIsImNvbnNvbGUiLCJkZWZlcmVkcyIsIk9iamVjdCIsImtleXMiLCIkb25PcGVuIiwiJG9uVXBncmFkZU5lZWRlZCIsIm1hcCIsImtleSIsInRleHQiLCJpTW9kZWxTZXJ2aWNlIiwiJGRiIiwiJG1vZGVsTmFtZSIsIiRpZCIsImtleVBhdGgiLCJhdXRvSW5jcmVtZW50IiwiJGluc3RhbmNlcyIsIiRNb2RlbCIsIiRjb25zdHJ1Y3RvciIsIiRzZXRBdHRyaWJ1dGVzIiwiZGF0YSIsInByb3BlcnR5IiwiJHBJaWQiLCIkaW5kZXgiLCIkYnVpbGQiLCJidWlsZENhbGxiYWNrIiwiJHJlY29yZCIsImFyciIsIml0ZXJhdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FBRUE7O0FDRUEsS0FBSSxjQUFjLHVCQUF1Qjs7QUREekM7O0FDS0EsS0FBSSxXQUFXLHVCQUF1Qjs7QURKdEM7O0FDUUEsS0FBSSxPQUFPLHVCQUF1Qjs7QURObEM7O0FDVUEsS0FBSSxRQUFRLHVCQUF1Qjs7QURUbkM7O0FDYUEsS0FBSSxXQUFXLHVCQUF1Qjs7QUFFdEMsVUFBUyx1QkFBdUIsS0FBSyxFQUFFLE9BQU8sT0FBTyxJQUFJLGFBQWEsTUFBTSxFQUFFLFNBQVM7O0FEYnZGQSxTQUFRQyxPQUFPLFFBQVEsSUFDcEJDLFNBQVMsaUJBQWlCLFNBQzFCQyxRQUFRLGVBQWUsWUFBWTtHQUFFO0lBQ3JDQSxRQUFRLGNBSFgscUJBSUdBLFFBQVEsT0FKWCxjQUtHQSxRQUFRLFFBTFgsZUFNR0EsUUFBUSxXQU5YLGtCOzs7Ozs7QUVUQTs7O0FDRUEsUUFB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QUFPekQsS0FBSzJFO3FCQUNaNkI7Ozs7O2FBTUosT0FBT2xDOzs7O1NBS1R1QixPQUFPdEgsVUFBVW1HLFVBQVUsVUFBVWxILElBQUc7YUFDdEMsT0FBTytILElBQUliLFFBQVFjLFlBQVksTUFBTWhJOzs7U0FHdkMsT0FBT3FJIiwiZmlsZSI6Im5nLWRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAzYWQ5NTEzNDhmYzQ5ZTMwODI3YlxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBuZ0RiVXRpbHMgZnJvbSAnLi91dGlscy9uZ0RiVXRpbHMnO1xyXG5pbXBvcnQgbmdEYkV2ZW50cyBmcm9tICcuL3V0aWxzL2V2ZW50cyc7XHJcbmltcG9ydCBxcyBmcm9tICcuL3V0aWxzL3FzJztcclxuXHJcbmltcG9ydCBpRGIgZnJvbSAnLi9zZXJ2aWNlcy9pRGInO1xyXG5pbXBvcnQgaU1vZGVsIGZyb20gJy4vc2VydmljZXMvaU1vZGVsJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCduZ0RiJywgW10pXHJcbiAgLmNvbnN0YW50KCdOR19EQl9WRVJTSU9OJywgJzAuMC4xJylcclxuICAuc2VydmljZSgnJG5nRGJFdmVudHMnLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZ0RiRXZlbnRzOyB9KVxyXG4gIC5zZXJ2aWNlKCckbmdEYlV0aWxzJywgbmdEYlV0aWxzKVxyXG4gIC5zZXJ2aWNlKCckcXMnLCBxcylcclxuICAuc2VydmljZSgnJGlEYicsIGlEYilcclxuICAuc2VydmljZSgnJGlNb2RlbCcsIGlNb2RlbCk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX25nRGJVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMvbmdEYlV0aWxzJyk7XG5cbnZhciBfbmdEYlV0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX25nRGJVdGlscyk7XG5cbnZhciBfZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKTtcblxudmFyIF9ldmVudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXZlbnRzKTtcblxudmFyIF9xcyA9IHJlcXVpcmUoJy4vdXRpbHMvcXMnKTtcblxudmFyIF9xczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9xcyk7XG5cbnZhciBfaURiID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9pRGInKTtcblxudmFyIF9pRGIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaURiKTtcblxudmFyIF9pTW9kZWwgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lNb2RlbCcpO1xuXG52YXIgX2lNb2RlbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pTW9kZWwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5hbmd1bGFyLm1vZHVsZSgnbmdEYicsIFtdKS5jb25zdGFudCgnTkdfREJfVkVSU0lPTicsICcwLjAuMScpLnNlcnZpY2UoJyRuZ0RiRXZlbnRzJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gX2V2ZW50czIuZGVmYXVsdDtcbn0pLnNlcnZpY2UoJyRuZ0RiVXRpbHMnLCBfbmdEYlV0aWxzMi5kZWZhdWx0KS5zZXJ2aWNlKCckcXMnLCBfcXMyLmRlZmF1bHQpLnNlcnZpY2UoJyRpRGInLCBfaURiMi5kZWZhdWx0KS5zZXJ2aWNlKCckaU1vZGVsJywgX2lNb2RlbDIuZGVmYXVsdCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBuZ0RiVXRpbHMgKCRxKSB7ICduZ0luamVjdCdcclxuXHJcbiAgLy8gRnVuY2lvbiBwYXJhIGRldGVybWluYXIgc2kgZXMgdW4gY2FsbGJhY2sgdsOhbGlkbyBvIG5vXHJcbiAgZnVuY3Rpb24gaXNDYWxsYmFjayAoY2IsIHRocm93RXJyb3IpIHtcclxuXHJcbiAgICBpZiAodHlwZW9mIGNiID09ICdmdW5jdGlvbicgfHwgY2IgPT0gbnVsbCB8fCBjYiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gIH1cclxuXHJcbiAgLy8gU2kgZWwgY2FsbGJhY2sgbm8gZXMgdsOhbGlkbyBsYW56YSB1biBlcnJwb3JcclxuICBmdW5jdGlvbiBtdXN0QmVDYWxsYmFjayAoY2IpIHtcclxuICAgIGlmIChpc0NhbGxiYWNrKGNiKSkgcmV0dXJuO1xyXG5cclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgY2FsbGJhY2snKTtcclxuICAgIGVyci5uYW1lID0gJ0ludmFsaWRDYWxsYmFjaydcclxuXHJcbiAgICB0aHJvdyBlcnI7XHJcblxyXG4gIH1cclxuXHJcbiAgLy8gR2VuZXJhIHVuIGVycm9yIHNpIGVsIHZhbG9yIG5vIGVzIGRlbCB0aXBvIGluZGljYWRvIHBvciBwYXJhbWV0cm9cclxuICBmdW5jdGlvbiBtdXN0QmUgKHZhbHVlLCB0eXBlcykge1xyXG4gICAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xyXG4gICAgZm9yKHZhciBpIGluIHR5cGVzKXtcclxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSB0eXBlc1tpXSkgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZTogJyt2YWx1ZSsnIG11c3QgYmUgJyt0eXBlcy5qb2luKCcgb3IgJykpO1xyXG4gICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbHVlJ1xyXG4gICAgdGhyb3cgZXJyO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIFZhbGlkYSB1biBhcnJheSBkZSBhcmd1bWVudG9zIGNvbiB1biBhcnJhIGRlIHRpcG9zXHJcbiAgZnVuY3Rpb24gdmFsaWRhdGUgKGFyZ3MsIHR5cGVzKSB7XHJcblxyXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xyXG4gICAgaWYgKHR5cGVvZiB0eXBlcyA9PSAnc3RyaW5nJykgdHlwZXMgPSBbdHlwZXNdO1xyXG4gICAgZm9yICh2YXIgaSBpbiBhcmdzKXtcclxuICAgICAgaWYgKHR5cGVzW2ldKXtcclxuICAgICAgICBpZiAodHlwZXNbaV0gPT0gbnVsbCl7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0eXBlc1tpXSA9PSAnc3RyaW5nJyB8fCB0eXBlb2YgdHlwZXNbaV0gPT0gJ29iamVjdCcpe1xyXG4gICAgICAgICAgbXVzdEJlKGFyZ3NbaV0sIHR5cGVzW2ldKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHR5cGVzW2ldID09ICdmdW5jaW9uJyl7XHJcbiAgICAgICAgICB0eXBlc1tpXShhcmdzW2ldKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignSW52YWxpZCB2YWxpZGF0b3IgdG86ICcrdmFsdWVzW2ldKycgbXVzdCBiZSAnK3R5cGVzW2ldKTtcclxuICAgICAgICBlcnIubmFtZSA9ICdJbnZhbGlkVmFsaWRhdG9yJ1xyXG4gICAgICAgIHRocm93IGVycjtcclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaXNDYWxsYmFjazogaXNDYWxsYmFjayxcclxuICAgIG11c3RCZUNhbGxiYWNrOiBtdXN0QmVDYWxsYmFjayxcclxuICAgIG11c3RCZTogbXVzdEJlLFxyXG4gICAgdmFsaWRhdGU6IHZhbGlkYXRlLFxyXG4gIH07XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvbmdEYlV0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IG5nRGJVdGlscztcbmZ1bmN0aW9uIG5nRGJVdGlscygkcSkge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIEZ1bmNpb24gcGFyYSBkZXRlcm1pbmFyIHNpIGVzIHVuIGNhbGxiYWNrIHbDoWxpZG8gbyBub1xuXG4gIGZ1bmN0aW9uIGlzQ2FsbGJhY2soY2IsIHRocm93RXJyb3IpIHtcblxuICAgIGlmICh0eXBlb2YgY2IgPT0gJ2Z1bmN0aW9uJyB8fCBjYiA9PSBudWxsIHx8IGNiID09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gU2kgZWwgY2FsbGJhY2sgbm8gZXMgdsOhbGlkbyBsYW56YSB1biBlcnJwb3JcbiAgZnVuY3Rpb24gbXVzdEJlQ2FsbGJhY2soY2IpIHtcbiAgICBpZiAoaXNDYWxsYmFjayhjYikpIHJldHVybjtcblxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgY2FsbGJhY2snKTtcbiAgICBlcnIubmFtZSA9ICdJbnZhbGlkQ2FsbGJhY2snO1xuXG4gICAgdGhyb3cgZXJyO1xuICB9XG5cbiAgLy8gR2VuZXJhIHVuIGVycm9yIHNpIGVsIHZhbG9yIG5vIGVzIGRlbCB0aXBvIGluZGljYWRvIHBvciBwYXJhbWV0cm9cbiAgZnVuY3Rpb24gbXVzdEJlKHZhbHVlLCB0eXBlcykge1xuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcbiAgICBmb3IgKHZhciBpIGluIHR5cGVzKSB7XG4gICAgICBpZiAoKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PSB0eXBlc1tpXSkgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlOiAnICsgdmFsdWUgKyAnIG11c3QgYmUgJyArIHR5cGVzLmpvaW4oJyBvciAnKSk7XG4gICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbHVlJztcbiAgICB0aHJvdyBlcnI7XG4gIH1cblxuICAvLyBWYWxpZGEgdW4gYXJyYXkgZGUgYXJndW1lbnRvcyBjb24gdW4gYXJyYSBkZSB0aXBvc1xuICBmdW5jdGlvbiB2YWxpZGF0ZShhcmdzLCB0eXBlcykge1xuXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcbiAgICBmb3IgKHZhciBpIGluIGFyZ3MpIHtcbiAgICAgIGlmICh0eXBlc1tpXSkge1xuICAgICAgICBpZiAodHlwZXNbaV0gPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZXNbaV0gPT0gJ3N0cmluZycgfHwgX3R5cGVvZih0eXBlc1tpXSkgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBtdXN0QmUoYXJnc1tpXSwgdHlwZXNbaV0pO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZXNbaV0gPT0gJ2Z1bmNpb24nKSB7XG4gICAgICAgICAgdHlwZXNbaV0oYXJnc1tpXSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbGlkYXRvciB0bzogJyArIHZhbHVlc1tpXSArICcgbXVzdCBiZSAnICsgdHlwZXNbaV0pO1xuICAgICAgICBlcnIubmFtZSA9ICdJbnZhbGlkVmFsaWRhdG9yJztcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaXNDYWxsYmFjazogaXNDYWxsYmFjayxcbiAgICBtdXN0QmVDYWxsYmFjazogbXVzdEJlQ2FsbGJhY2ssXG4gICAgbXVzdEJlOiBtdXN0QmUsXG4gICAgdmFsaWRhdGU6IHZhbGlkYXRlXG4gIH07XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvbmdEYlV0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gTm9tYnJlIGRlIGxvcyBldmVudG9zXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBEQl9FUlJPUjogJ2NiLmVycm9yJyxcclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9ldmVudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIE5vbWJyZSBkZSBsb3MgZXZlbnRvc1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICBEQl9FUlJPUjogJ2NiLmVycm9yJ1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9ldmVudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBxcyAoKSB7ICduZ0luamVjdCdcclxuICBcclxuICBmdW5jdGlvbiBxc0NsYXNzICgpIHsgbGV0IHRoaXogPSB0aGlzO1xyXG4gICAgXHJcbiAgICBsZXQgdGhlbnMgPSBbXTtcclxuICAgIGxldCB0aGVuc1JlYWR5ID0gW107XHJcbiAgICBsZXQgY2F0Y2hzID0gW107XHJcbiAgICBsZXQgY2F0Y2hzUmVhZHkgPSBbXTtcclxuICAgIGxldCByZXN1bHRBcmdzID0gbnVsbDtcclxuICAgIGxldCBlcnJvciA9IG51bGw7XHJcblxyXG4gICAgdGhpei5wcm9taXNlID0ge307XHJcbiAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRoZW5zUmVzb2x2ZWQgKCkge1xyXG4gICAgICBpZiAoIXRoZW5zLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICB2YXIgY2IgPSB0aGVucy5zaGlmdCgpO1xyXG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LnJlc3VsdEFyZ3MpO1xyXG4gICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2F0Y2hzUmVzb2x2ZWQgKCkge1xyXG4gICAgICBpZiAoIWNhdGNocy5sZW5ndGgpIHJldHVybjtcclxuICAgICAgdmFyIGNiID0gY2F0Y2hzLnNoaWZ0KCk7XHJcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xyXG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXoucmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XHJcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgdGhpei5yZXN1bHRBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnJlamVjdCA9IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XHJcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgdGhpei5lcnJvciA9IGVyciB8fCB7fTtcclxuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgdGhlbnMucHVzaChjYik7XHJcbiAgICAgIGlmICh0aGl6LnJlc29sdmVkICYmICF0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnByb21pc2UuY2F0Y2ggPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgY2F0Y2hzLnB1c2goY2IpO1xyXG4gICAgICBpZiAodGhpei5yZXNvbHZlZCAmJiB0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpejtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLmRvbmUgPSBmdW5jdGlvbiAoY2IpIHtcclxuXHJcbiAgICAgIHRoZW5zLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQodGhpei5yZXN1bHRBcmdzKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY2F0Y2hzLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh0aGl6LnJlc29sdmVkKSB7XHJcbiAgICAgICAgaWYgKCF0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gIH07XHJcblxyXG4gIC8vIENyZWEgdW5hIGluc3RhbmNpYSBkZWwgZGVmZXJlZFxyXG4gIHFzQ2xhc3MuZGVmZXIgPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgIHJldHVybiBuZXcgcXNDbGFzcyhjYik7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHFzQ2xhc3M7XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvcXMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBxcztcbmZ1bmN0aW9uIHFzKCkge1xuICAnbmdJbmplY3QnO1xuXG4gIGZ1bmN0aW9uIHFzQ2xhc3MoKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgdmFyIHRoZW5zID0gW107XG4gICAgdmFyIHRoZW5zUmVhZHkgPSBbXTtcbiAgICB2YXIgY2F0Y2hzID0gW107XG4gICAgdmFyIGNhdGNoc1JlYWR5ID0gW107XG4gICAgdmFyIHJlc3VsdEFyZ3MgPSBudWxsO1xuICAgIHZhciBlcnJvciA9IG51bGw7XG5cbiAgICB0aGl6LnByb21pc2UgPSB7fTtcbiAgICB0aGl6LiRyZXNvbHZlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gdGhlbnNSZXNvbHZlZCgpIHtcbiAgICAgIGlmICghdGhlbnMubGVuZ3RoKSByZXR1cm47XG4gICAgICB2YXIgY2IgPSB0aGVucy5zaGlmdCgpO1xuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5yZXN1bHRBcmdzKTtcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYXRjaHNSZXNvbHZlZCgpIHtcbiAgICAgIGlmICghY2F0Y2hzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgdmFyIGNiID0gY2F0Y2hzLnNoaWZ0KCk7XG4gICAgICBjYi5hcHBseShudWxsLCB0aGl6LmVycm9yKTtcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgfVxuXG4gICAgdGhpei5yZXNvbHZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XG4gICAgICB0aGl6LiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICB0aGl6LnJlc3VsdEFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgIH07XG5cbiAgICB0aGl6LnJlamVjdCA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgdGhpei5lcnJvciA9IGVyciB8fCB7fTtcbiAgICAgIGNhdGNoc1Jlc29sdmVkKCk7XG4gICAgfTtcblxuICAgIHRoaXoucHJvbWlzZS50aGVuID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB0aGVucy5wdXNoKGNiKTtcbiAgICAgIGlmICh0aGl6LnJlc29sdmVkICYmICF0aGl6LmVycm9yKSB7XG4gICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH07XG5cbiAgICB0aGl6LnByb21pc2UuY2F0Y2ggPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIGNhdGNocy5wdXNoKGNiKTtcbiAgICAgIGlmICh0aGl6LnJlc29sdmVkICYmIHRoaXouZXJyb3IpIHtcbiAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH07XG5cbiAgICB0aGl6LnByb21pc2UuZG9uZSA9IGZ1bmN0aW9uIChjYikge1xuXG4gICAgICB0aGVucy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgW251bGxdLmNvbmNhdCh0aGl6LnJlc3VsdEFyZ3MpKTtcbiAgICAgIH0pO1xuXG4gICAgICBjYXRjaHMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGl6LnJlc29sdmVkKSB7XG4gICAgICAgIGlmICghdGhpei5lcnJvcikge1xuICAgICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH07XG4gIH07XG5cbiAgLy8gQ3JlYSB1bmEgaW5zdGFuY2lhIGRlbCBkZWZlcmVkXG4gIHFzQ2xhc3MuZGVmZXIgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICByZXR1cm4gbmV3IHFzQ2xhc3MoY2IpO1xuICB9O1xuXG4gIHJldHVybiBxc0NsYXNzO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL3FzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlEYlNlcnZpY2UgKCRxcywgJGlNb2RlbCwgJG5nRGJVdGlscywgJG5nRGJFdmVudHMsICRsb2cpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxyXG4gIGNvbnN0IGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQjtcclxuICAvLyBObyB1c2UgXCJjb25zdCBpbmRleGVkREIgPSAuLi5cIiBTaSBubyBlc3TDoSBlbiB1bmEgZnVuY2nDs24uXHJcbiAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XHJcbiAgY29uc3QgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xyXG4gIGNvbnN0IElEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcclxuICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxyXG4gIFxyXG4gIGlmICghaW5kZXhlZERCKSB7XHJcbiAgICBhbGVydChcIlN1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhc1wiKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8vIENsYXNlIHBhcmEgbGEgY3JlYWNpw7NuIGRlIGluc3RhbmNpYXMgZGUgbGEgQkRcclxuICByZXR1cm4gZnVuY3Rpb24gJGlEYigkZGJOYW1lLCAkZGJWZXJzaW9uKSB7IGNvbnN0IHRoaXogPSB0aGlzO1xyXG4gICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ251bWJlciddKTtcclxuXHJcbiAgICAvLyBNYW5lamFkb3JlcyBkZSBldmVudG9zLlxyXG4gICAgbGV0ICRldmVudHNDYWxsYmFja3MgPSB7fTtcclxuICAgIGxldCAkdXBncmFkZU5lZWRlZERlZmVyZWQgPSAkcXMuZGVmZXIoKTtcclxuICAgIGxldCAkb3BlbkRlZmVyZWQgPSAkcXMuZGVmZXIoKTtcclxuICAgIGxldCAkb3BlbmVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gSW5zdGFuY2lhIGRlIGxhIGJhc2UgZGUgZGF0b3M7XHJcbiAgICBsZXQgJHJlcXVlc3QgPSBudWxsO1xyXG4gICAgdGhpei4kbW9kZWxzID0ge307XHJcbiAgICBcclxuICAgIC8vIEFncmVnYXIgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xyXG4gICAgdGhpei4kYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcclxuXHJcbiAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKXtcclxuICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnB1c2goY2IpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy9SZW11ZXZlIHVuIG1hbmVqYWRvciBkZSBldmVudG9cclxuICAgIHRoaXouJHVuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNiKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcclxuXHJcbiAgICAgIGlmICghJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdKSByZXR1cm47XHJcblxyXG4gICAgICAvLyBCdXNjYXIgZWwgY2JcclxuICAgICAgY29uc3QgaWR4ID0gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLmluZGV4T2YoY2IpO1xyXG5cclxuICAgICAgLy8gU2kgc2UgZW5jb250cm8gZWwgY2IgcmVtb3ZlcmxvXHJcbiAgICAgIGlmIChpZHggIT0gLTEpe1xyXG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGlzcGFyYSB1biBldmVudG9cclxuICAgIHRoaXouJHRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnXSk7XHJcblxyXG4gICAgICAkbG9nLmxvZygkZGJOYW1lKycudicrKCRkYlZlcnNpb258fDEpKyc6ICcrZXZlbnROYW1lKTtcclxuXHJcbiAgICAgIGZvcihsZXQgaSBpbiAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pe1xyXG4gICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXVtpXS5hcHBseSh0aGl6LCBhcmdzKTtcclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ2FsbGJhY2tzIHBhcmEgbG9zIGVycm9yZXNcclxuICAgIHRoaXouJGVycm9yID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIHRoaXouJGJpbmQoJG5nRGJFdmVudHMuREJfRVJST1IsIGNiKTtcclxuICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFicmlyIHVuYSBCYXNlIGRlIGRhdG9zLlxyXG4gICAgdGhpei4kb3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCRvcGVuZWQpIHJldHVybiAkb3BlbkRlZmVyZWQ7XHJcblxyXG4gICAgICAvLyBDcmVhciB1biBudWV2byBkZWZlclxyXG4gICAgICAkb3BlbmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIC8vIGRlamFtb3MgYWJpZXJ0YSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcclxuICAgICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKCRkYk5hbWUsICRkYlZlcnNpb24pO1xyXG5cclxuICAgICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXF1ZXN0LnJlc3VsdCFcclxuICAgICAgICAkdXBncmFkZU5lZWRlZERlZmVyZWQucmVzb2x2ZShldmVudCwgcmVxdWVzdCk7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGVsIHJlc3VsdGFkb1xyXG4gICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJlcXVlc3QucmVzdWx0IVxyXG4gICAgICAgICRyZXF1ZXN0ID0gcmVxdWVzdDtcclxuXHJcbiAgICAgICAgLy8gQXNpbmdhciBlbCBtYW5lamFkb3IgZGUgZXJyb3JlcyBhIGxhIEJEXHJcbiAgICAgICAgJHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgJGxvZy5lcnJvcignRGF0YWJhc2UgZXJyb3I6ICcrIGV2ZW50LnRhcmdldC5lcnJvckNvZGUpO1xyXG4gICAgICAgICAgdGhpei4kdHJpZ2dlcigkbmdEYkV2ZW50cy5EQl9FUlJPUiwgW2V2ZW50XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkb3BlbkRlZmVyZWQucmVzb2x2ZShldmVudCwgcmVxdWVzdCk7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGUgZXJyb3Jlc1xyXG4gICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJlcXVlc3QuZXJyb3JDb2RlIVxyXG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAkb3BlbkRlZmVyZWQucmVqZWN0KHJlcXVlc3QuZXJyb3JDb2RlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuICRvcGVuRGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBudWV2byBtb2RlbG9cclxuICAgIHRoaXouJG1vZGVsID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJ10pO1xyXG5cclxuICAgICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG9cclxuICAgICAgbGV0IG1vZGVsID0gdGhpei4kbW9kZWxzW25hbWVdO1xyXG5cclxuICAgICAgLy8gU2kgbm8gZXhpc3RlIGVsIG1vZGVsbyBjcmVhclxyXG4gICAgICBpZighbW9kZWwpXHJcbiAgICAgICAgbW9kZWwgPSAkaU1vZGVsKHRoaXosIG5hbWUpO1xyXG5cclxuICAgICAgLy8gR3VhcmRhciBlbCBtb2RlbG8gZW4gbG9zIG1vZGVsb3NcclxuICAgICAgdGhpei4kbW9kZWxzW25hbWVdID0gbW9kZWw7XHJcblxyXG4gICAgICAvLyBSZXRvcm5hciBlbCBtb2RlbG9cclxuICAgICAgcmV0dXJuIG1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXHJcbiAgICB0aGl6LiRjcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIG1vZGVsSWQpIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCByZXF1ZXN0KSB7XHJcbiAgICAgICAgbGV0IGRiID0gcmVxdWVzdC5yZXN1bHQ7XHJcbiAgICAgICAgZGIuY3JlYXRlT2JqZWN0U3RvcmUobW9kZWxOYW1lLCBtb2RlbElkKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcclxuICAgIHRoaXouJGNyZWF0ZUluZGV4ID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBsZXQgZGIgPSByZXF1ZXN0LnJlc3VsdDtcclxuICAgICAgICBsZXQgc3RvcmUgPSByZXF1ZXN0LnRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XHJcbiAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWEgdW5hIHRyYW5zYWNjacOzblxyXG4gICAgdGhpei4kdHJhbnNhY3Rpb24gPSBmdW5jdGlvbihtb2RlbE5hbWUsIHBlcm1zLCBhY3Rpb24sIGNiKSB7XHJcbiAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnZnVuY3Rpb24nLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XHJcblxyXG4gICAgICBsZXQgZGVmZXJlZCA9ICRxcy5kZWZlcihjYik7XHJcblxyXG4gICAgICAvLyBDdWFuZG8gc2UgYWJyYSBsYSBCRFxyXG4gICAgICAkb3BlbkRlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcmVxdWVzdCkge1xyXG5cclxuICAgICAgICBsZXQgdHggPSByZXF1ZXN0LnJlc3VsdC50cmFuc2FjdGlvbihtb2RlbE5hbWUsIHBlcm1zKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYWN0aW9uKHR4KTtcclxuXHJcbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxyXG4gICAgICAgIHR4Lm9uY29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShbZXZlbnQsIHJlc3VsdF0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXHJcbiAgICAgICAgdHgub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KHR4LmVycm9yKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEluc2VydGEgdW4gcmVnaXN0cm8gZW4gZWwgbW9kZWxvXHJcbiAgICB0aGl6LiRjcmVhdGUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbnN0YW5jZSwgY2IpIHtcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAnZnVuY3Rpb24nXSwgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgbGV0IGRlZmVyZWQgPSAkcXMuZGVmZXIoY2IpO1xyXG5cclxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cclxuICAgICAgdGhpei4kdHJhbnNhY3Rpb24obW9kZWxOYW1lLCBcInJlYWR3cml0ZVwiLCBmdW5jdGlvbiAodHgpIHtcclxuXHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLnB1dChpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyAgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdvbnN1Y2Nlc3MnLCBldmVudC50YXJnZXQucmVzdWx0KTtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShbZXZlbnQsIGluc3RhbmNlXSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cclxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgLy8gQ291bGQgY2FsbCByZXF1ZXN0LnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cclxuICAgICAgICAgIGRlZmVyZWQucmVqZWN0KHJlcXVlc3QpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWFyIGFsaWFzIHBhcmEgbG9zIGV2ZW50b3MgZW5sYXphciBjYWxsYmFja3MgYSBsb3MgZXZlbnRvc1xyXG4gICAgbGV0IGRlZmVyZWRzO1xyXG4gICAgT2JqZWN0LmtleXMoZGVmZXJlZHMgPSB7XHJcbiAgICAgICRvbk9wZW46ICRvcGVuRGVmZXJlZCxcclxuICAgICAgJG9uVXBncmFkZU5lZWRlZDogJHVwZ3JhZGVOZWVkZWREZWZlcmVkLFxyXG4gICAgfSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgIGxldCB0ZXh0ID0gJGRiTmFtZSsnLnYnKygkZGJWZXJzaW9ufHwxKSsnOiAnK2tleTtcclxuICAgICAgICBpZiAoZXJyKXtcclxuICAgICAgICAgICRsb2cuZXJyb3IodGV4dCwgZXJyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJGxvZy5sb2codGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpeltrZXldID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XHJcbiAgICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoY2IpO1xyXG4gICAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gIH07XHJcblxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lEYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaURiU2VydmljZTtcbmZ1bmN0aW9uIGlEYlNlcnZpY2UoJHFzLCAkaU1vZGVsLCAkbmdEYlV0aWxzLCAkbmdEYkV2ZW50cywgJGxvZykge1xuICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgLy8gRW4gbGEgc2lndWllbnRlIGxpbmVhLCBwdWVkZSBpbmNsdWlyIHByZWZpam9zIGRlIGltcGxlbWVudGFjaW9uIHF1ZSBxdWllcmEgcHJvYmFyLlxuXG4gICAgICB2YXIgaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xuICAgICAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxuICAgICAgLy8gUG9yIG90cmEgcGFydGUsIHB1ZWRlcyBuZWNlc2l0YXIgcmVmZXJlbmNpYXMgYSBhbGd1biBvYmpldG8gd2luZG93LklEQio6XG4gICAgICB2YXIgSURCVHJhbnNhY3Rpb24gPSB3aW5kb3cuSURCVHJhbnNhY3Rpb24gfHwgd2luZG93LndlYmtpdElEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy5tc0lEQlRyYW5zYWN0aW9uO1xuICAgICAgdmFyIElEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcbiAgICAgIC8vIChNb3ppbGxhIG51bmNhIGhhIHByZWZpamFkbyBlc3RvcyBvYmpldG9zLCBwb3IgbG8gdGFudG8gbm8gbmVjZXNpdGFtb3Mgd2luZG93Lm1veklEQiopXG5cbiAgICAgIGlmICghaW5kZXhlZERCKSB7XG4gICAgICAgICAgICBhbGVydChcIlN1IG5hdmVnYWRvciBubyBzb3BvcnRhIHVuYSB2ZXJzacOzbiBlc3RhYmxlIGRlIGluZGV4ZWREQi4gVGFsIHkgY29tbyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBubyBzZXLDoW4gdmFsaWRhc1wiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gQ2xhc2UgcGFyYSBsYSBjcmVhY2nDs24gZGUgaW5zdGFuY2lhcyBkZSBsYSBCRFxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICRpRGIoJGRiTmFtZSwgJGRiVmVyc2lvbikge1xuICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ251bWJlciddKTtcblxuICAgICAgICAgICAgLy8gTWFuZWphZG9yZXMgZGUgZXZlbnRvcy5cbiAgICAgICAgICAgIHZhciAkZXZlbnRzQ2FsbGJhY2tzID0ge307XG4gICAgICAgICAgICB2YXIgJHVwZ3JhZGVOZWVkZWREZWZlcmVkID0gJHFzLmRlZmVyKCk7XG4gICAgICAgICAgICB2YXIgJG9wZW5EZWZlcmVkID0gJHFzLmRlZmVyKCk7XG4gICAgICAgICAgICB2YXIgJG9wZW5lZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBJbnN0YW5jaWEgZGUgbGEgYmFzZSBkZSBkYXRvcztcbiAgICAgICAgICAgIHZhciAkcmVxdWVzdCA9IG51bGw7XG4gICAgICAgICAgICB0aGl6LiRtb2RlbHMgPSB7fTtcblxuICAgICAgICAgICAgLy8gQWdyZWdhciB1biBtYW5lamFkb3IgZGUgZXZlbnRvXG4gICAgICAgICAgICB0aGl6LiRiaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcbiAgICAgICAgICAgICAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0ucHVzaChjYik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvL1JlbXVldmUgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xuICAgICAgICAgICAgdGhpei4kdW5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcbiAgICAgICAgICAgICAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCEkZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgLy8gQnVzY2FyIGVsIGNiXG4gICAgICAgICAgICAgICAgICB2YXIgaWR4ID0gJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLmluZGV4T2YoY2IpO1xuXG4gICAgICAgICAgICAgICAgICAvLyBTaSBzZSBlbmNvbnRybyBlbCBjYiByZW1vdmVybG9cbiAgICAgICAgICAgICAgICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXG4gICAgICAgICAgICB0aGl6LiR0cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgYXJncykge1xuICAgICAgICAgICAgICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcblxuICAgICAgICAgICAgICAgICAgJGxvZy5sb2coJGRiTmFtZSArICcudicgKyAoJGRiVmVyc2lvbiB8fCAxKSArICc6ICcgKyBldmVudE5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluICRldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdW2ldLmFwcGx5KHRoaXosIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQ2FsbGJhY2tzIHBhcmEgbG9zIGVycm9yZXNcbiAgICAgICAgICAgIHRoaXouJGVycm9yID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICAgICAgICB0aGl6LiRiaW5kKCRuZ0RiRXZlbnRzLkRCX0VSUk9SLCBjYik7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFicmlyIHVuYSBCYXNlIGRlIGRhdG9zLlxuICAgICAgICAgICAgdGhpei4kb3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIGlmICgkb3BlbmVkKSByZXR1cm4gJG9wZW5EZWZlcmVkO1xuXG4gICAgICAgICAgICAgICAgICAvLyBDcmVhciB1biBudWV2byBkZWZlclxuICAgICAgICAgICAgICAgICAgJG9wZW5lZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgIC8vIGRlamFtb3MgYWJpZXJ0YSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcbiAgICAgICAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4oJGRiTmFtZSwgJGRiVmVyc2lvbik7XG5cbiAgICAgICAgICAgICAgICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXF1ZXN0LnJlc3VsdCFcbiAgICAgICAgICAgICAgICAgICAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5yZXNvbHZlKGV2ZW50LCByZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlbCByZXN1bHRhZG9cbiAgICAgICAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXF1ZXN0LnJlc3VsdCFcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXF1ZXN0ID0gcmVxdWVzdDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXNpbmdhciBlbCBtYW5lamFkb3IgZGUgZXJyb3JlcyBhIGxhIEJEXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbG9nLmVycm9yKCdEYXRhYmFzZSBlcnJvcjogJyArIGV2ZW50LnRhcmdldC5lcnJvckNvZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpei4kdHJpZ2dlcigkbmdEYkV2ZW50cy5EQl9FUlJPUiwgW2V2ZW50XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkb3BlbkRlZmVyZWQucmVzb2x2ZShldmVudCwgcmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAvLyBBc2lnbmFyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzXG4gICAgICAgICAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXF1ZXN0LmVycm9yQ29kZSFcbiAgICAgICAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJG9wZW5EZWZlcmVkLnJlamVjdChyZXF1ZXN0LmVycm9yQ29kZSk7XG4gICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gJG9wZW5EZWZlcmVkO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQWdyZWdhIHVuIG51ZXZvIG1vZGVsb1xuICAgICAgICAgICAgdGhpei4kbW9kZWwgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJ10pO1xuXG4gICAgICAgICAgICAgICAgICAvLyBJbnN0YW5jaWFyIGVsIG1vZGVsb1xuICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gdGhpei4kbW9kZWxzW25hbWVdO1xuXG4gICAgICAgICAgICAgICAgICAvLyBTaSBubyBleGlzdGUgZWwgbW9kZWxvIGNyZWFyXG4gICAgICAgICAgICAgICAgICBpZiAoIW1vZGVsKSBtb2RlbCA9ICRpTW9kZWwodGhpeiwgbmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgIC8vIEd1YXJkYXIgZWwgbW9kZWxvIGVuIGxvcyBtb2RlbG9zXG4gICAgICAgICAgICAgICAgICB0aGl6LiRtb2RlbHNbbmFtZV0gPSBtb2RlbDtcblxuICAgICAgICAgICAgICAgICAgLy8gUmV0b3JuYXIgZWwgbW9kZWxvXG4gICAgICAgICAgICAgICAgICByZXR1cm4gbW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcbiAgICAgICAgICAgIHRoaXouJGNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKG1vZGVsTmFtZSwgbW9kZWxJZCkge1xuICAgICAgICAgICAgICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgJHVwZ3JhZGVOZWVkZWREZWZlcmVkLnByb21pc2UudGhlbihmdW5jdGlvbiAoZXZlbnQsIHJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYiA9IHJlcXVlc3QucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgZGIuY3JlYXRlT2JqZWN0U3RvcmUobW9kZWxOYW1lLCBtb2RlbElkKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQ3JlYSBlbCBvYmplY3RTdG9yZSBwYXJhIHVuIG1vZGVsXG4gICAgICAgICAgICB0aGl6LiRjcmVhdGVJbmRleCA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZycsIFsnb2JqZWN0JywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgICR1cGdyYWRlTmVlZGVkRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGIgPSByZXF1ZXN0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdG9yZSA9IHJlcXVlc3QudHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUobW9kZWxOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQ3JlYSB1bmEgdHJhbnNhY2Npw7NuXG4gICAgICAgICAgICB0aGl6LiR0cmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIHBlcm1zLCBhY3Rpb24sIGNiKSB7XG4gICAgICAgICAgICAgICAgICAkbmdEYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAgICAgICAgICAgICB2YXIgZGVmZXJlZCA9ICRxcy5kZWZlcihjYik7XG5cbiAgICAgICAgICAgICAgICAgIC8vIEN1YW5kbyBzZSBhYnJhIGxhIEJEXG4gICAgICAgICAgICAgICAgICAkb3BlbkRlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcmVxdWVzdCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHggPSByZXF1ZXN0LnJlc3VsdC50cmFuc2FjdGlvbihtb2RlbE5hbWUsIHBlcm1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBhY3Rpb24odHgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgICAgICAgICAgICAgICAgICB0eC5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoW2V2ZW50LCByZXN1bHRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXG4gICAgICAgICAgICAgICAgICAgICAgICB0eC5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJlZC5yZWplY3QodHguZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEluc2VydGEgdW4gcmVnaXN0cm8gZW4gZWwgbW9kZWxvXG4gICAgICAgICAgICB0aGl6LiRjcmVhdGUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbnN0YW5jZSwgY2IpIHtcbiAgICAgICAgICAgICAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnb2JqZWN0JywgJ2Z1bmN0aW9uJ10sIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyZWQgPSAkcXMuZGVmZXIoY2IpO1xuXG4gICAgICAgICAgICAgICAgICAvLyBTZSBjcmVhIHVuYSB0cmFuc2FjY2lvblxuICAgICAgICAgICAgICAgICAgdGhpei4kdHJhbnNhY3Rpb24obW9kZWxOYW1lLCBcInJlYWR3cml0ZVwiLCBmdW5jdGlvbiAodHgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLnB1dChpbnN0YW5jZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb25zdWNjZXNzJywgZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoW2V2ZW50LCBpbnN0YW5jZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvdWxkIGNhbGwgcmVxdWVzdC5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcmVkLnJlamVjdChyZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIENyZWFyIGFsaWFzIHBhcmEgbG9zIGV2ZW50b3MgZW5sYXphciBjYWxsYmFja3MgYSBsb3MgZXZlbnRvc1xuICAgICAgICAgICAgdmFyIGRlZmVyZWRzID0gdm9pZCAwO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoZGVmZXJlZHMgPSB7XG4gICAgICAgICAgICAgICAgICAkb25PcGVuOiAkb3BlbkRlZmVyZWQsXG4gICAgICAgICAgICAgICAgICAkb25VcGdyYWRlTmVlZGVkOiAkdXBncmFkZU5lZWRlZERlZmVyZWRcbiAgICAgICAgICAgIH0pLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICRkYk5hbWUgKyAnLnYnICsgKCRkYlZlcnNpb24gfHwgMSkgKyAnOiAnICsga2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGxvZy5lcnJvcih0ZXh0LCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsb2cubG9nKHRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB0aGl6W2tleV0gPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRuZ0RiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJlZHNba2V5XS5wcm9taXNlLmRvbmUoY2IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICB9O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lEYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpTW9kZWxTZXJ2aWNlICgkcXMsICRuZ0RiVXRpbHMpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uICRpTW9kZWwoJGRiLCAkbW9kZWxOYW1lKSB7IGxldCB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAvLyBDbGF2ZSBkZWwgbW9kZWxvXHJcbiAgICBsZXQgJGlkID0geyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OiB0cnVlIH07XHJcbiAgICBsZXQgJGluc3RhbmNlcyA9IHt9O1xyXG5cclxuICAgIC8vIENvbnN0dWN0b3IgZGVsIG1vZGVsb1xyXG4gICAgZnVuY3Rpb24gJE1vZGVsKCkge1xyXG4gICAgICB0aGlzLiRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBc2lnbmEgbG9zIGF0cmlidXRvc1xyXG4gICAgJE1vZGVsLnByb3RvdHlwZS4kc2V0QXR0cmlidXRlcyA9IGZ1bmN0aW9uIChkYXRhKSB7IGxldCB0aGl6ID0gdGhpcztcclxuICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xyXG4gICAgICBcclxuICAgICAgT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xyXG4gICAgICAgIHRoaXpbcHJvcGVydHldID0gZGF0YVtwcm9wZXJ0eV07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ29uc3R1cmN0b3IgcXVlIHNlIHB1ZWRlIHNvYnJlIGVzY3JpYmlyXHJcbiAgICAkTW9kZWwucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBlbCBJRCBhbCBtb2RlbG9cclxuICAgICRNb2RlbC4kaWQgPSBmdW5jdGlvbiAoJHBJaWQpIHtcclxuICAgICAgJGlkID0gJHBJaWRcclxuICAgICAgcmV0dXJuICRNb2RlbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RvIHN0b3JhZ2UgcGFyYSBlbCBtb2RlbG8uXHJcbiAgICAkTW9kZWwuJGNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAkZGIuJGNyZWF0ZVN0b3JlKCRtb2RlbE5hbWUsICRpZCk7XHJcbiAgICAgIHJldHVybiAkTW9kZWw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBpbmRleFxyXG4gICAgJE1vZGVsLiRpbmRleCA9IGZ1bmN0aW9uIChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xyXG4gICAgICAkZGIuJGNyZWF0ZUluZGV4KCRtb2RlbE5hbWUsIGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcclxuICAgICAgcmV0dXJuICRNb2RlbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gTcOpdG9kbyBxdWUgcGVybWl0ZSBtb2RpZmljYXIgbW9kZWwuXHJcbiAgICAkTW9kZWwuJGJ1aWxkID0gZnVuY3Rpb24gKGJ1aWxkQ2FsbGJhY2spIHtcclxuICAgICAgYnVpbGRDYWxsYmFjaygkTW9kZWwpO1xyXG4gICAgICByZXR1cm4gJE1vZGVsO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIG51ZXZhcyBpbnN0YW5jaWFzIGRlIGxvcyBtb2RlbG9zXHJcbiAgICAkTW9kZWwuJGNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhLCBjYikge1xyXG5cclxuICAgICAgLy8gU2kgZXMgdW4gYXJyYXlcclxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgJHJlY29yZCA9IG5ldyAkTW9kZWwoZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuICRyZWNvcmQuJGNyZWF0ZShjYik7XHJcbiAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgLy8gT2J0ZW5lciB1bmEgY29waWEgZGVsIGFycmF5XHJcbiAgICAgIGxldCBhcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhKTtcclxuICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICBsZXQgZGVmZXJlZCA9ICRxcy5kZWZlcihjYik7XHJcblxyXG4gICAgICAoZnVuY3Rpb24gaXRlcmF0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gTm8gcXVlZGFuIGVsZW1lbnRvcyBlbiBlbCBhcnJheVxyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09IDApIHJldHVybiBkZWZlcmVkLnJlc29sdmUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXIgZWwgc2lndWllbnRlIGVsZW1lbnRvXHJcbiAgICAgICAgJE1vZGVsLiRjcmVhdGUoYXJyLnNoaWZ0KCksIGZ1bmN0aW9uIChlcnIsIGluc3RhbmNlKSB7XHJcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZGVmZXJlZC5yZWplY3QoZXJyKTtcclxuICAgICAgICAgIHJlc3VsdC5wdXNoKGluc3RhbmNlKTtcclxuICAgICAgICAgIGl0ZXJhdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSkoKTtcclxuXHJcbiAgICAgIC8vIERldm9sdmVyIGVsIHByb21pc2VcclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBHdWFyZGEgbG9zIGRhdG9zIGRlbCBvYmpldG9cclxuICAgICRNb2RlbC5wcm90b3R5cGUuJGNyZWF0ZSA9IGZ1bmN0aW9uIChjYil7XHJcbiAgICAgIHJldHVybiAkZGIuJGNyZWF0ZSgkbW9kZWxOYW1lLCB0aGlzLCBjYik7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAkTW9kZWw7XHJcblxyXG4gIH07XHJcblxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2lNb2RlbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlNb2RlbFNlcnZpY2U7XG5mdW5jdGlvbiBpTW9kZWxTZXJ2aWNlKCRxcywgJG5nRGJVdGlscykge1xuICAgICduZ0luamVjdCc7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gJGlNb2RlbCgkZGIsICRtb2RlbE5hbWUpIHtcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICAgIC8vIENsYXZlIGRlbCBtb2RlbG9cbiAgICAgICAgdmFyICRpZCA9IHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9O1xuICAgICAgICB2YXIgJGluc3RhbmNlcyA9IHt9O1xuXG4gICAgICAgIC8vIENvbnN0dWN0b3IgZGVsIG1vZGVsb1xuICAgICAgICBmdW5jdGlvbiAkTW9kZWwoKSB7XG4gICAgICAgICAgICB0aGlzLiRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFzaWduYSBsb3MgYXRyaWJ1dG9zXG4gICAgICAgICRNb2RlbC5wcm90b3R5cGUuJHNldEF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgICAgICAgJG5nRGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5tYXAoZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgdGhpeltwcm9wZXJ0eV0gPSBkYXRhW3Byb3BlcnR5XTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIENvbnN0dXJjdG9yIHF1ZSBzZSBwdWVkZSBzb2JyZSBlc2NyaWJpclxuICAgICAgICAkTW9kZWwucHJvdG90eXBlLiRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7fTtcblxuICAgICAgICAvLyBBc2lnbmEgZWwgSUQgYWwgbW9kZWxvXG4gICAgICAgICRNb2RlbC4kaWQgPSBmdW5jdGlvbiAoJHBJaWQpIHtcbiAgICAgICAgICAgICRpZCA9ICRwSWlkO1xuICAgICAgICAgICAgcmV0dXJuICRNb2RlbDtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBDcmVhIGVsIG9iamVjdG8gc3RvcmFnZSBwYXJhIGVsIG1vZGVsby5cbiAgICAgICAgJE1vZGVsLiRjcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRkYi4kY3JlYXRlU3RvcmUoJG1vZGVsTmFtZSwgJGlkKTtcbiAgICAgICAgICAgIHJldHVybiAkTW9kZWw7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQWdyZWdhIHVuIGluZGV4XG4gICAgICAgICRNb2RlbC4kaW5kZXggPSBmdW5jdGlvbiAoaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpIHtcbiAgICAgICAgICAgICRkYi4kY3JlYXRlSW5kZXgoJG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xuICAgICAgICAgICAgcmV0dXJuICRNb2RlbDtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBNw6l0b2RvIHF1ZSBwZXJtaXRlIG1vZGlmaWNhciBtb2RlbC5cbiAgICAgICAgJE1vZGVsLiRidWlsZCA9IGZ1bmN0aW9uIChidWlsZENhbGxiYWNrKSB7XG4gICAgICAgICAgICBidWlsZENhbGxiYWNrKCRNb2RlbCk7XG4gICAgICAgICAgICByZXR1cm4gJE1vZGVsO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIENyZWEgbnVldmFzIGluc3RhbmNpYXMgZGUgbG9zIG1vZGVsb3NcbiAgICAgICAgJE1vZGVsLiRjcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSwgY2IpIHtcblxuICAgICAgICAgICAgLy8gU2kgZXMgdW4gYXJyYXlcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFyICRyZWNvcmQgPSBuZXcgJE1vZGVsKGRhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkcmVjb3JkLiRjcmVhdGUoY2IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBPYnRlbmVyIHVuYSBjb3BpYSBkZWwgYXJyYXlcbiAgICAgICAgICAgIHZhciBhcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhKTtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIHZhciBkZWZlcmVkID0gJHFzLmRlZmVyKGNiKTtcblxuICAgICAgICAgICAgKGZ1bmN0aW9uIGl0ZXJhdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIC8vIE5vIHF1ZWRhbiBlbGVtZW50b3MgZW4gZWwgYXJyYXlcbiAgICAgICAgICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PSAwKSByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAvLyBDcmVhciBlbCBzaWd1aWVudGUgZWxlbWVudG9cbiAgICAgICAgICAgICAgICAkTW9kZWwuJGNyZWF0ZShhcnIuc2hpZnQoKSwgZnVuY3Rpb24gKGVyciwgaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRlZmVyZWQucmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgICAvLyBEZXZvbHZlciBlbCBwcm9taXNlXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBHdWFyZGEgbG9zIGRhdG9zIGRlbCBvYmpldG9cbiAgICAgICAgJE1vZGVsLnByb3RvdHlwZS4kY3JlYXRlID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICByZXR1cm4gJGRiLiRjcmVhdGUoJG1vZGVsTmFtZSwgdGhpcywgY2IpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiAkTW9kZWw7XG4gICAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pTW9kZWwuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9