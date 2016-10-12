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
	
	var _idbUtils = __webpack_require__(1);
	
	var _idbUtils2 = _interopRequireDefault(_idbUtils);
	
	var _idbEvents = __webpack_require__(2);
	
	var _idbEvents2 = _interopRequireDefault(_idbEvents);
	
	var _qs = __webpack_require__(3);
	
	var _qs2 = _interopRequireDefault(_qs);
	
	var _idb = __webpack_require__(4);
	
	var _idb2 = _interopRequireDefault(_idb);
	
	var _idbModel = __webpack_require__(5);
	
	var _idbModel2 = _interopRequireDefault(_idbModel);
	
	var _lb = __webpack_require__(6);
	
	var _lb2 = _interopRequireDefault(_lb);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _lb2.default)(angular.module('ng.idb', [])).constant('idbVersion', '0.0.1').service('idbEvents', _idbEvents2.default).service('idbUtils', _idbUtils2.default).service('qs', _qs2.default)
	
	// Take of lb-services.js
	.service('idb', _idb2.default).service('idbModel', _idbModel2.default);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	idbUtils.$inject = ["$q"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = idbUtils;
	function idbUtils($q) {
	  'ngInject';
	
	  // Funcion para determinar si es un callback válido o no
	
	  function isCallback(cb) {
	
	    return typeof cb == 'function' || cb == null || cb == undefined;
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
	        if (typeof types[i] == 'function') {
	          if (types[i](args[i])) continue;
	        }
	
	        var err = new Error('Invalid validator to: ' + args[i] + ' must be ' + types[i]);
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
	exports.default = idbEvents;
	function idbEvents() {
	  return {
	    DB_ERROR: 'cb.error'
	  };
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
	
	idb.$inject = ["qs", "idbModel", "idbUtils", "idbEvents", "$log"];
	Object.defineProperty(exports, "__esModule", {
	      value: true
	});
	exports.default = idb;
	function idb(qs, idbModel, idbUtils, idbEvents, $log) {
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
	      return function idb(dbName, dbVersion) {
	            var thiz = this;
	            idbUtils.validate(arguments, ['string', 'number']);
	
	            // Manejadores de eventos.
	            var eventsCallbacks = {};
	            var upgradeNeededDefered = qs.defer();
	            var openDefered = qs.defer();
	            var opened = false;
	
	            // Instancia de la base de datos;
	            var request = null;
	            thiz.models = {};
	
	            // Agregar un manejador de evento
	            thiz.bind = function (eventName, cb) {
	                  idbUtils.validate(arguments, ['string', 'function']);
	
	                  if (!eventsCallbacks[eventName]) {
	                        eventsCallbacks[eventName] = [];
	                  }
	
	                  eventsCallbacks[eventName].push(cb);
	            };
	
	            //Remueve un manejador de evento
	            thiz.unbind = function (eventName, cb) {
	                  idbUtils.validate(arguments, ['string', 'function']);
	
	                  if (!eventsCallbacks[eventName]) return;
	
	                  // Buscar el cb
	                  var idx = eventsCallbacks[eventName].indexOf(cb);
	
	                  // Si se encontro el cb removerlo
	                  if (idx != -1) {
	                        eventsCallbacks[eventName].splice(idx, 1);
	                  }
	            };
	
	            // Dispara un evento
	            thiz.trigger = function (eventName, args) {
	                  idbUtils.validate(arguments, ['string', 'object']);
	
	                  $log.log(dbName + '.v' + (dbVersion || 1) + ': ' + eventName);
	
	                  for (var i in eventsCallbacks[eventName]) {
	                        eventsCallbacks[eventName][i].apply(thiz, args);
	                  }
	            };
	
	            // Callbacks para los errores
	            thiz.error = function (cb) {
	                  thiz.bind(idbEvents.DB_ERROR, cb);
	                  return thiz;
	            };
	
	            // Abrir una Base de datos.
	            thiz.open = function () {
	                  if (opened) return openDefered;
	
	                  // Crear un nuevo defer
	                  opened = true;
	
	                  // dejamos abierta nuestra base de datos
	                  // indexedDB.deleteDatabase(dbName).onsuccess =
	                  function ready() {
	
	                        var rq = indexedDB.open(dbName, dbVersion);
	
	                        rq.onupgradeneeded = function (event) {
	                              // Do something with rq.result!
	                              upgradeNeededDefered.resolve(event, rq);
	                        };
	
	                        // Asignar el manejador del resultado
	                        rq.onsuccess = function (event) {
	                              // Do something with rq.result!
	                              request = rq;
	
	                              // Asingar el manejador de errores a la BD
	                              rq.onerror = function (event) {
	                                    $log.error('Database error: ' + event.target.errorCode);
	                                    thiz.trigger(idbEvents.DB_ERROR, [event]);
	                              };
	
	                              openDefered.resolve(event, rq);
	                        };
	
	                        // Asignar el manejador de errores
	                        // Do something with rq.errorCode!
	                        rq.onerror = function (event) {
	                              openDefered.reject(rq.errorCode);
	                        };
	                  };
	
	                  ready();
	
	                  return openDefered;
	            };
	
	            // Agrega un nuevo modelo
	            thiz.model = function (name) {
	                  idbUtils.validate(arguments, ['string']);
	
	                  // Instanciar el modelo
	                  var model = thiz.models[name];
	
	                  // Si no existe el modelo crear
	                  if (!model) model = idbModel(thiz, name);
	
	                  // Guardar el modelo en los modelos
	                  thiz.models[name] = model;
	
	                  // Retornar el modelo
	                  return model;
	            };
	
	            // Crea el objectStore para un model
	            thiz.createStore = function (modelName, modelId) {
	                  idbUtils.validate(arguments, ['string', ['object', 'undefined']]);
	
	                  upgradeNeededDefered.promise.then(function (event, rq) {
	                        rq.result.createObjectStore(modelName, modelId);
	                  });
	            };
	
	            // Crea el objectStore para un model
	            thiz.createIndex = function (modelName, indexName, fieldName, opts) {
	                  idbUtils.validate(arguments, ['string', 'string', 'string', ['object', 'undefined']]);
	
	                  upgradeNeededDefered.promise.then(function (event, rq) {
	                        var store = rq.transaction.objectStore(modelName);
	                        store.createIndex(indexName, fieldName, opts);
	                  });
	            };
	
	            // Crea una transacción
	            thiz.transaction = function (modelName, perms, action, cb) {
	                  idbUtils.validate(arguments, ['string', 'string', 'function', ['function', 'undefined']]);
	
	                  var defered = qs.defer(cb);
	
	                  // Cuando se abra la BD
	                  openDefered.promise.then(function (event, rq) {
	                        var tx = rq.result.transaction(modelName, perms);
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
	            thiz.create = function (modelName, instance, cb) {
	                  idbUtils.validate(arguments, ['string', ['object', 'function'], ['function', 'undefined']]);
	
	                  var defered = qs.defer(cb);
	
	                  // Se crea una transaccion
	                  thiz.transaction(modelName, 'readwrite', function (tx) {
	                        var rq = tx.objectStore(modelName).put(instance.values());
	
	                        // Transaccion completada satisfatoriamente
	                        rq.onsuccess = function (event) {
	                              defered.resolve(event, instance);
	                        };
	
	                        // Se generó un error en la transacción
	                        rq.onerror = function () {
	                              // Could call rq.preventDefault() to prevent the transaction from aborting.
	                              defered.reject(rq);
	                        };
	                  });
	
	                  return defered.$promise;
	            };
	
	            // Obtiene un elemento por si key
	            thiz.get = function (Model, modelName, key, cb) {
	                  idbUtils.validate(arguments, ['function', 'string', null, ['function', 'undefined']]);
	
	                  var defered = qs.defer(cb);
	                  var instance = Model.getInstance(key);
	
	                  instance.$promise = defered.promise;
	                  instance.$resolved = false;
	
	                  thiz.transaction(modelName, 'readonly', function (tx) {
	                        var store = tx.objectStore(modelName);
	                        var request = store.get(key);
	
	                        request.onsuccess = function () {
	                              if (request.result != undefined) {
	                                    instance.setAttributes(request.result);
	                                    instance.$isNew = false;
	                              }
	                              instance.$resolved = true;
	                              defered.resolve(instance);
	                        };
	
	                        request.onerror = function () {
	                              defered.reject(instance);
	                        };
	                  });
	
	                  return instance;
	            };
	
	            // Buscar en el modelo
	            thiz.find = function (Model, modelName, scope, cb) {
	                  idbUtils.validate(arguments, ['function', 'string', ['object', 'undefined'], ['function', 'undefined']]);
	
	                  var defered = qs.defer(cb);
	                  var result = [];
	
	                  result.$promise = defered.promise;
	                  result.$resolved = false;
	
	                  // Se crea una transaccion
	                  thiz.transaction(modelName, 'readonly', function (tx) {
	                        var store = tx.objectStore(modelName);
	                        var request = store.openCursor();
	
	                        request.onsuccess = function () {
	                              var cursor = request.result;
	
	                              // No more matching records.
	                              if (!cursor) {
	                                    result.$resolved = true;
	                                    return defered.resolve(result);
	                              }
	
	                              // Obtener la instancia
	                              var record = Model.getInstanceFromObject(cursor.value);
	                              record.$isNew = false; // Inicar que no es un registro nuevo
	
	                              // Agregar al resultado
	                              result.push(record);
	
	                              // Buscar siguiente
	                              cursor.continue();
	                        };
	                  });
	
	                  return result;
	            };
	
	            // Crear alias para los eventos enlazar callbacks a los eventos
	            var defereds = void 0;
	            Object.keys(defereds = {
	                  onOpen: openDefered,
	                  onUpgradeNeeded: upgradeNeededDefered
	            }).map(function (key) {
	                  defereds[key].promise.done(function (err) {
	                        var text = dbName + '.v' + (dbVersion || 1) + ': ' + key;
	                        if (err) {
	                              $log.error(text, err);
	                        } else {
	                              $log.log(text);
	                        }
	                  });
	                  thiz[key] = function (cb) {
	                        idbUtils.validate(arguments, ['function']);
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
	
	idbModel.$inject = ["qs", "idbUtils", "lbResource"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = idbModel;
	function idbModel(qs, idbUtils, lbResource) {
	  'ngInject';
	
	  return function idbModel($db, $modelName) {
	    var thiz = this;
	    idbUtils.validate(arguments, [null, 'string']);
	
	    // Clave del modelo
	    var $id = { keyPath: 'id', autoIncrement: true };
	    var $fields = {};
	    var $instances = {};
	    var $remote = null;
	
	    // Constuctor del modelo
	    function Model(data) {
	      this.setAttributes(data || {});
	      this.constructor(data);
	      this.$isNew = true;
	      this.$record = null;
	    };
	
	    // Asigna el ID al modelo
	    Model.id = function (id) {
	      idbUtils.validate(arguments, ['object']);
	      $id = id;
	      return Model;
	    };
	
	    // Crea el objecto storage para el modelo.
	    Model.createStore = function () {
	      $db.createStore($modelName, $id);
	      return Model;
	    };
	
	    // Agrega un index
	    Model.index = function (indexName, fieldName, opts) {
	      $db.createIndex($modelName, indexName, fieldName, opts);
	      return Model;
	    };
	
	    // Método que permite modificar model.
	    Model.build = function (buildCallback) {
	      idbUtils.validate(arguments, ['function']);
	      buildCallback(Model);
	      return Model;
	    };
	
	    // Asigna la especificación de los campos
	    Model.fields = function (fields) {
	      idbUtils.validate(arguments, ['object']);
	
	      $fields = {};
	      $fields[$id.keyPath] = {
	        "type": "number",
	        "required": true
	      };
	
	      Object.keys(fields).map(function (fieldName) {
	        var field = fields[fieldName];
	        if (typeof fields[fieldName] == 'string') {
	          field = { "type": field };
	        }
	        $fields[fieldName] = field;
	      });
	
	      return Model;
	    };
	
	    // Configura el remote api;
	    Model.remote = function (url, args, actions) {
	      idbUtils.validate(arguments, ['string', 'object', 'object']);
	      $remote = lbResource(url, args, actions);
	      return Model;
	    };
	
	    // Crea nuevas instancias de los modelos
	    Model.create = function (data, cb) {
	      idbUtils.validate(arguments, ['object', ['function', 'undefined']]);
	
	      // Si es un array
	      if (data.length === undefined) {
	        return Model.getInstanceFromObject(record).create(cb);
	      }
	
	      // Obtener una copia del array
	      var arr = Array.prototype.slice.call(data);
	      var result = [];
	      var defered = qs.defer(cb);
	
	      (function iteration() {
	
	        // No quedan elementos en el array
	        if (arr.length == 0) return defered.resolve(result);
	
	        // Crear el siguiente elemento
	        Model.create(arr.shift(), function (err, instance) {
	          if (err) return defered.reject(err);
	          result.push(instance);
	          iteration();
	        });
	      })();
	
	      // Devolver el promise
	      return defered;
	    };
	
	    // Buscar un campo
	    Model.searchDeepField = function (obj, field, cb) {
	      idbUtils.validate(arguments, ['object', 'string', ['function', 'undefined']]);
	
	      var fields = field.split('.');
	      var lastField = fields.pop();
	
	      return function _set(obj) {
	        if (fields.length == 0) return cb(obj, lastField);
	        var field = fields.shift();
	        if (typeof obj[field] === 'undefined') obj[field] = {};
	        return _set(obj[field]);
	      }(obj);
	    };
	
	    // Devuelve el valor correspondiente al key de un objeto
	    Model.getKeyFrom = function (data) {
	      return Model.searchDeepField(data, $id.keyPath, function (obj, lastField) {
	        return obj[lastField];
	      });
	    };
	
	    // Devuelve la instancia del model de las guardadas. Si no existe entonce
	    // se crea
	    Model.getInstance = function (key) {
	
	      // El objeto no tiene ID
	      if (!key) {
	        return new Model();
	      }
	
	      // No existe la instancia entonce se crea
	      if (!$instances[key]) {
	        $instances[key] = new Model();
	      }
	
	      return $instances[key];
	    };
	
	    // Crea una instancia del modelo a partir de un object
	    Model.getInstanceFromObject = function (data) {
	      idbUtils.validate(arguments, ['object']);
	
	      var record = Model.getInstance(Model.getKeyFrom(data));
	      record.setAttributes(data);
	      return record;
	    };
	
	    // Busca un registro en la objectStore del modelo.
	    Model.get = function (key, cb) {
	
	      return $db.get(Model, $modelName, key, cb);
	    };
	
	    // Buscar en el modelo
	    Model.find = function (scope, cb) {
	      var args = Array.prototype.slice.call(arguments);
	      cb = args.pop();scope = args.pop();
	      if ($remote) {
	        // Buscar los registros en la API
	        $remote.find(scope, cb).$promise.then(function (result) {
	          result.map(function (record, idx) {
	
	            Model.get(Model.getKeyFrom(record)).$promise.then(function (instance) {
	              instance.setAttributes(record).resource(record);
	              if (instance.$isNew) {
	                instance.create();
	              }
	            });
	          });
	        }).catch(function (err) {
	          console.log(['err', err]);
	        });
	      }
	      return $db.find(Model, $modelName, scope, cb);
	    };
	
	    // Asigna los atributos
	    Model.prototype.setAttributes = function (data) {
	      var thiz = this;
	      idbUtils.validate(arguments, ['object']);
	
	      Object.keys(data).map(function (property) {
	        thiz.set(property, data[property]);
	      });
	
	      return thiz;
	    };
	
	    // Devuelve el valor de una propiedad
	    Model.prototype.get = function (field) {
	      var thiz = this;
	      return Model.searchDeepField(thiz, field, function (obj, lastField) {
	        return obj[lastField];
	      });
	    };
	
	    // Asigna in valor a un campo
	    Model.prototype.set = function (field, value) {
	      var thiz = this;
	      return Model.searchDeepField(thiz, field, function (obj, lastField) {
	        obj[lastField] = value;
	        return thiz;
	      });
	    };
	
	    // Obtiene los valores reales actuales para guardar en el store
	    Model.prototype.values = function () {
	      var thiz = this;
	      var values = {};
	
	      Object.keys($fields).map(function (field) {
	        Model.searchDeepField(values, field, function (obj, lastField) {
	          obj[lastField] = thiz.get(field);
	        });
	      });
	
	      return values;
	    };
	
	    // Consturctor que se puede sobre escribir
	    Model.prototype.constructor = function (data) {};
	
	    // Guarda los datos del objeto
	    Model.prototype.create = function (cb) {
	      var thiz = this;
	      return $db.create($modelName, this, function (err, event) {
	        if (err) {
	          if (cb) cb(err);return;
	        };
	
	        // Asignar el generado al modelo
	        thiz.set($id.keyPath, event.target.result);
	        thiz.$isNew = false;
	
	        // Si la instancia creada no concuerda con la guardada
	        if ($instances[thiz.get($id.keyPath)]) {
	          if ($instances[thiz.get($id.keyPath)] !== thiz) {
	            throw new Error('idbModel.TwoInstancesWithSameKey');
	          }
	        } else {
	          // Guardar la instancia en la colecion de instancias
	          $instances[thiz.get($id.keyPath)] = thiz;
	        }
	
	        if (cb) cb.apply(null, [null].concat(Array.prototype.slice.call(arguments)));
	      });
	    };
	
	    // Asigna la instancia del registro
	    Model.prototype.resource = function (record) {
	      this.$record = record;
	      return this;
	    };
	
	    return Model;
	  };
	}

/***/ },
/* 6 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjUwMGYwOTEyNWM2NDVmMmJjOTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz85NTUyIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiVXRpbHMuanM/MWJiNCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pZGJFdmVudHMuanM/NDg2YSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3FzLmpzPzY0MzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRiLmpzPzYzNTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkYk1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qcz9mOWY5Iiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9sYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvbGIuanM/MzAwNiJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29uc3RhbnQiLCJzZXJ2aWNlIiwiaWRiVXRpbHMiLCIkcSIsImlzQ2FsbGJhY2siLCJjYiIsInVuZGVmaW5lZCIsIm11c3RCZUNhbGxiYWNrIiwiZXJyIiwiRXJyb3IiLCJuYW1lIiwibXVzdEJlIiwidmFsdWUiLCJ0eXBlcyIsImkiLCJqb2luIiwidmFsaWRhdGUiLCJhcmdzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJpZGJFdmVudHMiLCJEQl9FUlJPUiIsInFzIiwicXNDbGFzcyIsInRoaXoiLCJ0aGVucyIsInRoZW5zUmVhZHkiLCJjYXRjaHMiLCJjYXRjaHNSZWFkeSIsInJlc3VsdEFyZ3MiLCJlcnJvciIsInByb21pc2UiLCIkcmVzb2x2ZWQiLCJ0aGVuc1Jlc29sdmVkIiwibGVuZ3RoIiwic2hpZnQiLCJhcHBseSIsInB1c2giLCJjYXRjaHNSZXNvbHZlZCIsInJlc29sdmUiLCJhcmd1bWVudHMiLCJyZWplY3QiLCJ0aGVuIiwiY2F0Y2giLCJkb25lIiwiY29uY2F0IiwiZGVmZXIiLCJpZGIiLCJpZGJNb2RlbCIsIiRsb2ciLCJpbmRleGVkREIiLCJ3aW5kb3ciLCJtb3pJbmRleGVkREIiLCJ3ZWJraXRJbmRleGVkREIiLCJtc0luZGV4ZWREQiIsIklEQlRyYW5zYWN0aW9uIiwid2Via2l0SURCVHJhbnNhY3Rpb24iLCJtc0lEQlRyYW5zYWN0aW9uIiwiSURCS2V5UmFuZ2UiLCJ3ZWJraXRJREJLZXlSYW5nZSIsIm1zSURCS2V5UmFuZ2UiLCJhbGVydCIsImRiTmFtZSIsImRiVmVyc2lvbiIsImV2ZW50c0NhbGxiYWNrcyIsInVwZ3JhZGVOZWVkZWREZWZlcmVkIiwib3BlbkRlZmVyZWQiLCJvcGVuZWQiLCJyZXF1ZXN0IiwibW9kZWxzIiwiYmluZCIsImV2ZW50TmFtZSIsInVuYmluZCIsImlkeCIsImluZGV4T2YiLCJzcGxpY2UiLCJ0cmlnZ2VyIiwibG9nIiwib3BlbiIsInJlYWR5IiwicnEiLCJvbnVwZ3JhZGVuZWVkZWQiLCJldmVudCIsIm9uc3VjY2VzcyIsIm9uZXJyb3IiLCJ0YXJnZXQiLCJlcnJvckNvZGUiLCJtb2RlbCIsImNyZWF0ZVN0b3JlIiwibW9kZWxOYW1lIiwibW9kZWxJZCIsInJlc3VsdCIsImNyZWF0ZU9iamVjdFN0b3JlIiwiY3JlYXRlSW5kZXgiLCJpbmRleE5hbWUiLCJmaWVsZE5hbWUiLCJvcHRzIiwic3RvcmUiLCJ0cmFuc2FjdGlvbiIsIm9iamVjdFN0b3JlIiwicGVybXMiLCJhY3Rpb24iLCJkZWZlcmVkIiwidHgiLCJvbmNvbXBsZXRlIiwib25hYm9ydCIsImNyZWF0ZSIsImluc3RhbmNlIiwicHV0IiwidmFsdWVzIiwiJHByb21pc2UiLCJnZXQiLCJNb2RlbCIsImtleSIsImdldEluc3RhbmNlIiwic2V0QXR0cmlidXRlcyIsIiRpc05ldyIsImZpbmQiLCJzY29wZSIsIm9wZW5DdXJzb3IiLCJjdXJzb3IiLCJyZWNvcmQiLCJnZXRJbnN0YW5jZUZyb21PYmplY3QiLCJjb250aW51ZSIsImRlZmVyZWRzIiwiT2JqZWN0Iiwia2V5cyIsIm9uT3BlbiIsIm9uVXBncmFkZU5lZWRlZCIsIm1hcCIsInRleHQiLCJsYlJlc291cmNlIiwiJGRiIiwiJG1vZGVsTmFtZSIsIiRpZCIsImtleVBhdGgiLCJhdXRvSW5jcmVtZW50IiwiJGZpZWxkcyIsIiRpbnN0YW5jZXMiLCIkcmVtb3RlIiwiZGF0YSIsImNvbnN0cnVjdG9yIiwiJHJlY29yZCIsImlkIiwiaW5kZXgiLCJidWlsZCIsImJ1aWxkQ2FsbGJhY2siLCJmaWVsZHMiLCJmaWVsZCIsInJlbW90ZSIsInVybCIsImFjdGlvbnMiLCJhcnIiLCJpdGVyYXRpb24iLCJzZWFyY2hEZWVwRmllbGQiLCJvYmoiLCJzcGxpdCIsImxhc3RGaWVsZCIsInBvcCIsIl9zZXQiLCJnZXRLZXlGcm9tIiwicmVzb3VyY2UiLCJjb25zb2xlIiwicHJvcGVydHkiLCJzZXQiLCJsYiIsImdldEhvc3QiLCJtIiwibWF0Y2giLCJ1cmxCYXNlSG9zdCIsImxvY2F0aW9uIiwiaG9zdCIsImxiQXV0aCIsInByb3BzIiwicHJvcHNQcmVmaXgiLCJzYXZlIiwic3RvcmFnZSIsImxvYWQiLCJsb2NhbFN0b3JhZ2UiLCJzZXNzaW9uU3RvcmFnZSIsImZvckVhY2giLCJjdXJyZW50VXNlckRhdGEiLCJyZW1lbWJlck1lIiwic2V0VXNlciIsImFjY2Vzc1Rva2VuSWQiLCJ1c2VySWQiLCJ1c2VyRGF0YSIsImN1cnJlbnRVc2VySWQiLCJjbGVhclVzZXIiLCJjbGVhclN0b3JhZ2UiLCJsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IiLCJjb25maWciLCJoZWFkZXJzIiwiYXV0aEhlYWRlciIsIl9faXNHZXRDdXJyZW50VXNlcl9fIiwicmVzIiwiYm9keSIsInN0YXR1cyIsIndoZW4iLCJvcHRpb25zIiwidXJsQmFzZSIsInNldEF1dGhIZWFkZXIiLCJoZWFkZXIiLCJnZXRBdXRoSGVhZGVyIiwic2V0VXJsQmFzZSIsImdldFVybEJhc2UiLCIkZ2V0IiwiJHJlc291cmNlIiwicGFyYW1zIiwib3JpZ2luYWxVcmwiLCIkc2F2ZSIsInN1Y2Nlc3MiLCJ1cHNlcnQiLCJmYWN0b3J5IiwicHJvdmlkZXIiLCIkaHR0cFByb3ZpZGVyIiwiaW50ZXJjZXB0b3JzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTs7QUFFQTs7QUNFQSxLQUFJLGFBQWEsdUJBQXVCOztBRER4Qzs7QUNLQSxLQUFJLGNBQWMsdUJBQXVCOztBREp6Qzs7QUNRQSxLQUFJLE9BQU8sdUJBQXVCOztBRE5sQzs7QUNVQSxLQUFJLFFBQVEsdUJBQXVCOztBRFRuQzs7QUNhQSxLQUFJLGFBQWEsdUJBQXVCOztBRFp4Qzs7QUNnQkEsS0FBSSxPQUFPLHVCQUF1Qjs7QUFFbEMsVUFBUyx1QkFBdUIsS0FBSyxFQUFFLE9BQU8sT0FBTyxJQUFJLGFBQWEsTUFBTSxFQUFFLFNBQVM7O0FEaEJ2RixtQkFBR0EsUUFBUUMsT0FBTyxVQUFVLEtBQ3pCQyxTQUFTLGNBQWMsU0FDdkJDLFFBQVEsYUFGWCxxQkFHR0EsUUFBUSxZQUhYLG9CQUlHQSxRQUFRLE1BSlg7OztFQU9HQSxRQUFRLE9BUFgsZUFRR0EsUUFBUSxZQVJYLG9COzs7Ozs7QUVWQTs7O0FDRUEsUUFBTyxlQUFlLFNBQVMsY0FBYztHQUMzQyxPQUFPOzs7QUFHVCxLQUFJLFVBQVUsT0FBTyxXQUFXLGNBQWMsT0FBTyxPQUFP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LElBQUk1RSxhQUFhLFNBQWJBLFdBQXNCbUIsS0FBSzBELFFBQVF6RCxTQUFTOztTQUU5QzFCLE9BQU9DLEtBQUt5QixTQUFTdEIsSUFBSSxVQUFVaEIsS0FBSztXQUN0Q3NDLFFBQVF0QyxLQUFLZ0csY0FBYzFELFFBQVF0QyxLQUFLcUM7V0FDeENDLFFBQVF0QyxLQUFLcUMsTUFBTWlELFFBQVFDLFVBQVVqRCxRQUFRdEMsS0FBS3FDOzs7U0FHcEQsSUFBSVcsV0FBVzhDLFVBQVVSLFFBQVFDLFVBQVVsRCxLQUFLMEQsUUFBUXpEOzs7OztTQUt4RFUsU0FBU2hKLFVBQVVpTSxRQUFRLFVBQVNDLFNBQVNyTCxPQUFPOzs7V0FHbEQsSUFBSTZELFNBQVNzRSxTQUFTbUQsT0FBT2pNLEtBQUssTUFBTSxJQUFJLE1BQU1nTSxTQUFTckw7V0FDM0QsT0FBTzZELE9BQU9tQixZQUFZbkI7O1NBRTVCLE9BQU9zRTs7O09BR1Q5QixXQUFXMEUsYUFBYSxZQUFXO1NBQ2pDLE9BQU9OLFFBQVFDOzs7T0FHakJyRSxXQUFXd0UsZ0JBQWdCLFlBQVc7U0FDcEMsT0FBT0osUUFBUU47OztPQUdqQixPQUFPOUQ7Ozs7R0FNWCxPQUFPdEksT0FDSndOLFFBQVEsVUFBVXpDLFFBQ2xCMEMsU0FBUyxjQUFjbkYsWUFDdkJrRixRQUFRLDRCQUE0QnZCLDBCQUNwQ0MsT0FBTyxDQUFDLGlCQUFpQixVQUFTd0IsZUFBZTtLQUFFOztLQUNsREEsY0FBY0MsYUFBYW5MLEtBQUsiLCJmaWxlIjoibmctaWRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBmNTAwZjA5MTI1YzY0NWYyYmM5MlxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBpZGJVdGlscyBmcm9tICcuL3V0aWxzL2lkYlV0aWxzJztcclxuaW1wb3J0IGlkYkV2ZW50cyBmcm9tICcuL3V0aWxzL2lkYkV2ZW50cyc7XHJcbmltcG9ydCBxcyBmcm9tICcuL3V0aWxzL3FzJztcclxuXHJcbmltcG9ydCBpZGIgZnJvbSAnLi9zZXJ2aWNlcy9pZGInO1xyXG5pbXBvcnQgaWRiTW9kZWwgZnJvbSAnLi9zZXJ2aWNlcy9pZGJNb2RlbCc7XHJcbmltcG9ydCBsYiBmcm9tICcuL3NlcnZpY2VzL2xiJztcclxuXHJcbmxiKGFuZ3VsYXIubW9kdWxlKCduZy5pZGInLCBbXSkpXHJcbiAgLmNvbnN0YW50KCdpZGJWZXJzaW9uJywgJzAuMC4xJylcclxuICAuc2VydmljZSgnaWRiRXZlbnRzJywgaWRiRXZlbnRzKVxyXG4gIC5zZXJ2aWNlKCdpZGJVdGlscycsIGlkYlV0aWxzKVxyXG4gIC5zZXJ2aWNlKCdxcycsIHFzKVxyXG5cclxuICAvLyBUYWtlIG9mIGxiLXNlcnZpY2VzLmpzXHJcbiAgLnNlcnZpY2UoJ2lkYicsIGlkYilcclxuICAuc2VydmljZSgnaWRiTW9kZWwnLCBpZGJNb2RlbClcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfaWRiVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzL2lkYlV0aWxzJyk7XG5cbnZhciBfaWRiVXRpbHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiVXRpbHMpO1xuXG52YXIgX2lkYkV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvaWRiRXZlbnRzJyk7XG5cbnZhciBfaWRiRXZlbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYkV2ZW50cyk7XG5cbnZhciBfcXMgPSByZXF1aXJlKCcuL3V0aWxzL3FzJyk7XG5cbnZhciBfcXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcXMpO1xuXG52YXIgX2lkYiA9IHJlcXVpcmUoJy4vc2VydmljZXMvaWRiJyk7XG5cbnZhciBfaWRiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lkYik7XG5cbnZhciBfaWRiTW9kZWwgPSByZXF1aXJlKCcuL3NlcnZpY2VzL2lkYk1vZGVsJyk7XG5cbnZhciBfaWRiTW9kZWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWRiTW9kZWwpO1xuXG52YXIgX2xiID0gcmVxdWlyZSgnLi9zZXJ2aWNlcy9sYicpO1xuXG52YXIgX2xiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuKDAsIF9sYjIuZGVmYXVsdCkoYW5ndWxhci5tb2R1bGUoJ25nLmlkYicsIFtdKSkuY29uc3RhbnQoJ2lkYlZlcnNpb24nLCAnMC4wLjEnKS5zZXJ2aWNlKCdpZGJFdmVudHMnLCBfaWRiRXZlbnRzMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJVdGlscycsIF9pZGJVdGlsczIuZGVmYXVsdCkuc2VydmljZSgncXMnLCBfcXMyLmRlZmF1bHQpXG5cbi8vIFRha2Ugb2YgbGItc2VydmljZXMuanNcbi5zZXJ2aWNlKCdpZGInLCBfaWRiMi5kZWZhdWx0KS5zZXJ2aWNlKCdpZGJNb2RlbCcsIF9pZGJNb2RlbDIuZGVmYXVsdCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGJVdGlscyAoJHEpIHsgJ25nSW5qZWN0J1xyXG4gIFxyXG4gIC8vIEZ1bmNpb24gcGFyYSBkZXRlcm1pbmFyIHNpIGVzIHVuIGNhbGxiYWNrIHbDoWxpZG8gbyBub1xyXG4gIGZ1bmN0aW9uIGlzQ2FsbGJhY2sgKGNiKSB7XHJcblxyXG4gICAgcmV0dXJuIHR5cGVvZiBjYiA9PSAnZnVuY3Rpb24nIHx8IGNiID09IG51bGwgfHwgY2IgPT0gdW5kZWZpbmVkO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIFNpIGVsIGNhbGxiYWNrIG5vIGVzIHbDoWxpZG8gbGFuemEgdW4gZXJycG9yXHJcbiAgZnVuY3Rpb24gbXVzdEJlQ2FsbGJhY2sgKGNiKSB7XHJcbiAgICBpZiAoaXNDYWxsYmFjayhjYikpIHJldHVybjtcclxuXHJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIGNhbGxiYWNrJyk7XHJcbiAgICBlcnIubmFtZSA9ICdJbnZhbGlkQ2FsbGJhY2snXHJcblxyXG4gICAgdGhyb3cgZXJyO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIEdlbmVyYSB1biBlcnJvciBzaSBlbCB2YWxvciBubyBlcyBkZWwgdGlwbyBpbmRpY2FkbyBwb3IgcGFyYW1ldHJvXHJcbiAgZnVuY3Rpb24gbXVzdEJlICh2YWx1ZSwgdHlwZXMpIHtcclxuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcclxuICAgIGZvcih2YXIgaSBpbiB0eXBlcyl7XHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gdHlwZXNbaV0pIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWU6ICcrdmFsdWUrJyBtdXN0IGJlICcrdHlwZXMuam9pbignIG9yICcpKTtcclxuICAgIGVyci5uYW1lID0gJ0ludmFsaWRWYWx1ZSdcclxuICAgIHRocm93IGVycjtcclxuXHJcbiAgfVxyXG5cclxuICAvLyBWYWxpZGEgdW4gYXJyYXkgZGUgYXJndW1lbnRvcyBjb24gdW4gYXJyYSBkZSB0aXBvc1xyXG4gIGZ1bmN0aW9uIHZhbGlkYXRlIChhcmdzLCB0eXBlcykge1xyXG5cclxuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcclxuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcclxuICAgIGZvciAodmFyIGkgaW4gYXJncyl7XHJcbiAgICAgIGlmICh0eXBlc1tpXSl7XHJcbiAgICAgICAgaWYgKHR5cGVzW2ldID09IG51bGwpe1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdHlwZXNbaV0gPT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGVzW2ldID09ICdvYmplY3QnKXtcclxuICAgICAgICAgIG11c3RCZShhcmdzW2ldLCB0eXBlc1tpXSk7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0eXBlc1tpXSA9PSAnZnVuY3Rpb24nKXtcclxuICAgICAgICAgIGlmKHR5cGVzW2ldKGFyZ3NbaV0pKVxyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsaWRhdG9yIHRvOiAnK2FyZ3NbaV0rJyBtdXN0IGJlICcrdHlwZXNbaV0pO1xyXG4gICAgICAgIGVyci5uYW1lID0gJ0ludmFsaWRWYWxpZGF0b3InXHJcbiAgICAgICAgdGhyb3cgZXJyO1xyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpc0NhbGxiYWNrOiBpc0NhbGxiYWNrLFxyXG4gICAgbXVzdEJlQ2FsbGJhY2s6IG11c3RCZUNhbGxiYWNrLFxyXG4gICAgbXVzdEJlOiBtdXN0QmUsXHJcbiAgICB2YWxpZGF0ZTogdmFsaWRhdGUsXHJcbiAgfTtcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9pZGJVdGlscy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBpZGJVdGlscztcbmZ1bmN0aW9uIGlkYlV0aWxzKCRxKSB7XG4gICduZ0luamVjdCc7XG5cbiAgLy8gRnVuY2lvbiBwYXJhIGRldGVybWluYXIgc2kgZXMgdW4gY2FsbGJhY2sgdsOhbGlkbyBvIG5vXG5cbiAgZnVuY3Rpb24gaXNDYWxsYmFjayhjYikge1xuXG4gICAgcmV0dXJuIHR5cGVvZiBjYiA9PSAnZnVuY3Rpb24nIHx8IGNiID09IG51bGwgfHwgY2IgPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLy8gU2kgZWwgY2FsbGJhY2sgbm8gZXMgdsOhbGlkbyBsYW56YSB1biBlcnJwb3JcbiAgZnVuY3Rpb24gbXVzdEJlQ2FsbGJhY2soY2IpIHtcbiAgICBpZiAoaXNDYWxsYmFjayhjYikpIHJldHVybjtcblxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ludmFsaWQgY2FsbGJhY2snKTtcbiAgICBlcnIubmFtZSA9ICdJbnZhbGlkQ2FsbGJhY2snO1xuXG4gICAgdGhyb3cgZXJyO1xuICB9XG5cbiAgLy8gR2VuZXJhIHVuIGVycm9yIHNpIGVsIHZhbG9yIG5vIGVzIGRlbCB0aXBvIGluZGljYWRvIHBvciBwYXJhbWV0cm9cbiAgZnVuY3Rpb24gbXVzdEJlKHZhbHVlLCB0eXBlcykge1xuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcbiAgICBmb3IgKHZhciBpIGluIHR5cGVzKSB7XG4gICAgICBpZiAoKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PSB0eXBlc1tpXSkgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlOiAnICsgdmFsdWUgKyAnIG11c3QgYmUgJyArIHR5cGVzLmpvaW4oJyBvciAnKSk7XG4gICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbHVlJztcbiAgICB0aHJvdyBlcnI7XG4gIH1cblxuICAvLyBWYWxpZGEgdW4gYXJyYXkgZGUgYXJndW1lbnRvcyBjb24gdW4gYXJyYSBkZSB0aXBvc1xuICBmdW5jdGlvbiB2YWxpZGF0ZShhcmdzLCB0eXBlcykge1xuXG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICAgIGlmICh0eXBlb2YgdHlwZXMgPT0gJ3N0cmluZycpIHR5cGVzID0gW3R5cGVzXTtcbiAgICBmb3IgKHZhciBpIGluIGFyZ3MpIHtcbiAgICAgIGlmICh0eXBlc1tpXSkge1xuICAgICAgICBpZiAodHlwZXNbaV0gPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZXNbaV0gPT0gJ3N0cmluZycgfHwgX3R5cGVvZih0eXBlc1tpXSkgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBtdXN0QmUoYXJnc1tpXSwgdHlwZXNbaV0pO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZXNbaV0gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGlmICh0eXBlc1tpXShhcmdzW2ldKSkgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdJbnZhbGlkIHZhbGlkYXRvciB0bzogJyArIGFyZ3NbaV0gKyAnIG11c3QgYmUgJyArIHR5cGVzW2ldKTtcbiAgICAgICAgZXJyLm5hbWUgPSAnSW52YWxpZFZhbGlkYXRvcic7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGlzQ2FsbGJhY2s6IGlzQ2FsbGJhY2ssXG4gICAgbXVzdEJlQ2FsbGJhY2s6IG11c3RCZUNhbGxiYWNrLFxuICAgIG11c3RCZTogbXVzdEJlLFxuICAgIHZhbGlkYXRlOiB2YWxpZGF0ZVxuICB9O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL2lkYlV0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gTm9tYnJlIGRlIGxvcyBldmVudG9zXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYkV2ZW50cygpIHtcclxuICByZXR1cm4ge1xyXG4gICAgREJfRVJST1I6ICdjYi5lcnJvcidcclxuICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaWRiRXZlbnRzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBOb21icmUgZGUgbG9zIGV2ZW50b3NcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYkV2ZW50cztcbmZ1bmN0aW9uIGlkYkV2ZW50cygpIHtcbiAgcmV0dXJuIHtcbiAgICBEQl9FUlJPUjogJ2NiLmVycm9yJ1xuICB9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9pZGJFdmVudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBxcyAoKSB7ICduZ0luamVjdCdcclxuICBcclxuICBmdW5jdGlvbiBxc0NsYXNzIChjYikgeyBsZXQgdGhpeiA9IHRoaXM7XHJcbiAgICBcclxuICAgIGxldCB0aGVucyA9IFtdO1xyXG4gICAgbGV0IHRoZW5zUmVhZHkgPSBbXTtcclxuICAgIGxldCBjYXRjaHMgPSBbXTtcclxuICAgIGxldCBjYXRjaHNSZWFkeSA9IFtdO1xyXG4gICAgbGV0IHJlc3VsdEFyZ3MgPSBudWxsO1xyXG4gICAgbGV0IGVycm9yID0gbnVsbDtcclxuXHJcbiAgICB0aGl6LnByb21pc2UgPSB7fTtcclxuICAgIHRoaXouJHJlc29sdmVkID0gZmFsc2U7XHJcblxyXG4gICAgZnVuY3Rpb24gdGhlbnNSZXNvbHZlZCAoKSB7XHJcbiAgICAgIGlmICghdGhlbnMubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgIGxldCBjYiA9IHRoZW5zLnNoaWZ0KCk7XHJcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXoucmVzdWx0QXJncyk7XHJcbiAgICAgIHRoZW5zUmVhZHkucHVzaChjYik7XHJcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYXRjaHNSZXNvbHZlZCAoKSB7XHJcbiAgICAgIGlmICghY2F0Y2hzLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICBsZXQgY2IgPSBjYXRjaHMuc2hpZnQoKTtcclxuICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XHJcbiAgICAgIGNhdGNoc1JlYWR5LnB1c2goY2IpO1xyXG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXoucmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XHJcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgdGhpei5yZXN1bHRBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnJlamVjdCA9IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSByZXR1cm47XHJcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgdGhpei5lcnJvciA9IGVyciB8fCB7fTtcclxuICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgdGhlbnMucHVzaChjYik7XHJcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCAmJiAhdGhpei5lcnJvcikge1xyXG4gICAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpejtcclxuICAgIH07XHJcblxyXG4gICAgdGhpei5wcm9taXNlLmNhdGNoID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIGNhdGNocy5wdXNoKGNiKTtcclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmIHRoaXouZXJyb3IpIHtcclxuICAgICAgICBjYXRjaHNSZXNvbHZlZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGl6LnByb21pc2UuZG9uZSA9IGZ1bmN0aW9uIChjYikge1xyXG5cclxuICAgICAgdGhlbnMucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgW251bGxdLmNvbmNhdCh0aGl6LnJlc3VsdEFyZ3MpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjYXRjaHMucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgdGhpei5lcnJvcik7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHRoaXouJHJlc29sdmVkKSB7XHJcbiAgICAgICAgaWYgKCF0aGl6LmVycm9yKSB7XHJcbiAgICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgaWYoY2IpIHRoaXoucHJvbWlzZS5kb25lKGNiKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgLy8gQ3JlYSB1bmEgaW5zdGFuY2lhIGRlbCBkZWZlcmVkXHJcbiAgcXNDbGFzcy5kZWZlciA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgcmV0dXJuIG5ldyBxc0NsYXNzKGNiKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gcXNDbGFzcztcclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9xcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHFzO1xuZnVuY3Rpb24gcXMoKSB7XG4gICduZ0luamVjdCc7XG5cbiAgZnVuY3Rpb24gcXNDbGFzcyhjYikge1xuICAgIHZhciB0aGl6ID0gdGhpcztcblxuICAgIHZhciB0aGVucyA9IFtdO1xuICAgIHZhciB0aGVuc1JlYWR5ID0gW107XG4gICAgdmFyIGNhdGNocyA9IFtdO1xuICAgIHZhciBjYXRjaHNSZWFkeSA9IFtdO1xuICAgIHZhciByZXN1bHRBcmdzID0gbnVsbDtcbiAgICB2YXIgZXJyb3IgPSBudWxsO1xuXG4gICAgdGhpei5wcm9taXNlID0ge307XG4gICAgdGhpei4kcmVzb2x2ZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIHRoZW5zUmVzb2x2ZWQoKSB7XG4gICAgICBpZiAoIXRoZW5zLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgdmFyIGNiID0gdGhlbnMuc2hpZnQoKTtcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXoucmVzdWx0QXJncyk7XG4gICAgICB0aGVuc1JlYWR5LnB1c2goY2IpO1xuICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhdGNoc1Jlc29sdmVkKCkge1xuICAgICAgaWYgKCFjYXRjaHMubGVuZ3RoKSByZXR1cm47XG4gICAgICB2YXIgY2IgPSBjYXRjaHMuc2hpZnQoKTtcbiAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xuICAgICAgY2F0Y2hzUmVhZHkucHVzaChjYik7XG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgIH1cblxuICAgIHRoaXoucmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkgcmV0dXJuO1xuICAgICAgdGhpei4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgdGhpei5yZXN1bHRBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIHRoZW5zUmVzb2x2ZWQoKTtcbiAgICB9O1xuXG4gICAgdGhpei5yZWplY3QgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQpIHJldHVybjtcbiAgICAgIHRoaXouJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgIHRoaXouZXJyb3IgPSBlcnIgfHwge307XG4gICAgICBjYXRjaHNSZXNvbHZlZCgpO1xuICAgIH07XG5cbiAgICB0aGl6LnByb21pc2UudGhlbiA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgdGhlbnMucHVzaChjYik7XG4gICAgICBpZiAodGhpei4kcmVzb2x2ZWQgJiYgIXRoaXouZXJyb3IpIHtcbiAgICAgICAgdGhlbnNSZXNvbHZlZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXo7XG4gICAgfTtcblxuICAgIHRoaXoucHJvbWlzZS5jYXRjaCA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgY2F0Y2hzLnB1c2goY2IpO1xuICAgICAgaWYgKHRoaXouJHJlc29sdmVkICYmIHRoaXouZXJyb3IpIHtcbiAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH07XG5cbiAgICB0aGl6LnByb21pc2UuZG9uZSA9IGZ1bmN0aW9uIChjYikge1xuXG4gICAgICB0aGVucy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2IuYXBwbHkobnVsbCwgW251bGxdLmNvbmNhdCh0aGl6LnJlc3VsdEFyZ3MpKTtcbiAgICAgIH0pO1xuXG4gICAgICBjYXRjaHMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNiLmFwcGx5KG51bGwsIHRoaXouZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGl6LiRyZXNvbHZlZCkge1xuICAgICAgICBpZiAoIXRoaXouZXJyb3IpIHtcbiAgICAgICAgICB0aGVuc1Jlc29sdmVkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2F0Y2hzUmVzb2x2ZWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpejtcbiAgICB9O1xuXG4gICAgaWYgKGNiKSB0aGl6LnByb21pc2UuZG9uZShjYik7XG4gIH07XG5cbiAgLy8gQ3JlYSB1bmEgaW5zdGFuY2lhIGRlbCBkZWZlcmVkXG4gIHFzQ2xhc3MuZGVmZXIgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICByZXR1cm4gbmV3IHFzQ2xhc3MoY2IpO1xuICB9O1xuXG4gIHJldHVybiBxc0NsYXNzO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL3FzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYiAocXMsIGlkYk1vZGVsLCBpZGJVdGlscywgaWRiRXZlbnRzLCAkbG9nKSB7ICduZ0luamVjdCc7XHJcblxyXG4gIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cclxuICBjb25zdCBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREI7XHJcbiAgLy8gTm8gdXNlIFwiY29uc3QgaW5kZXhlZERCID0gLi4uXCIgU2kgbm8gZXN0w6EgZW4gdW5hIGZ1bmNpw7NuLlxyXG4gIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxyXG4gIGNvbnN0IElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcclxuICBjb25zdCBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XHJcbiAgLy8gKE1vemlsbGEgbnVuY2EgaGEgcHJlZmlqYWRvIGVzdG9zIG9iamV0b3MsIHBvciBsbyB0YW50byBubyBuZWNlc2l0YW1vcyB3aW5kb3cubW96SURCKilcclxuICBcclxuICBpZiAoIWluZGV4ZWREQikge1xyXG4gICAgYWxlcnQoXCJTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXNcIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICAvLyBDbGFzZSBwYXJhIGxhIGNyZWFjacOzbiBkZSBpbnN0YW5jaWFzIGRlIGxhIEJEXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIGlkYihkYk5hbWUsIGRiVmVyc2lvbikgeyBjb25zdCB0aGl6ID0gdGhpcztcclxuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnbnVtYmVyJ10pO1xyXG5cclxuICAgIC8vIE1hbmVqYWRvcmVzIGRlIGV2ZW50b3MuXHJcbiAgICBsZXQgZXZlbnRzQ2FsbGJhY2tzID0ge307XHJcbiAgICBsZXQgdXBncmFkZU5lZWRlZERlZmVyZWQgPSBxcy5kZWZlcigpO1xyXG4gICAgbGV0IG9wZW5EZWZlcmVkID0gcXMuZGVmZXIoKTtcclxuICAgIGxldCBvcGVuZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBJbnN0YW5jaWEgZGUgbGEgYmFzZSBkZSBkYXRvcztcclxuICAgIGxldCByZXF1ZXN0ID0gbnVsbDtcclxuICAgIHRoaXoubW9kZWxzID0ge307XHJcbiAgICBcclxuICAgIC8vIEFncmVnYXIgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xyXG4gICAgdGhpei5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcclxuXHJcbiAgICAgIGlmICghZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pe1xyXG4gICAgICAgIGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdID0gW107XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdLnB1c2goY2IpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy9SZW11ZXZlIHVuIG1hbmVqYWRvciBkZSBldmVudG9cclxuICAgIHRoaXoudW5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcclxuXHJcbiAgICAgIGlmICghZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pIHJldHVybjtcclxuXHJcbiAgICAgIC8vIEJ1c2NhciBlbCBjYlxyXG4gICAgICBjb25zdCBpZHggPSBldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5pbmRleE9mKGNiKTtcclxuXHJcbiAgICAgIC8vIFNpIHNlIGVuY29udHJvIGVsIGNiIHJlbW92ZXJsb1xyXG4gICAgICBpZiAoaWR4ICE9IC0xKXtcclxuICAgICAgICBldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGlzcGFyYSB1biBldmVudG9cclxuICAgIHRoaXoudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGFyZ3MpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdvYmplY3QnXSk7XHJcblxyXG4gICAgICAkbG9nLmxvZyhkYk5hbWUrJy52JysoZGJWZXJzaW9ufHwxKSsnOiAnK2V2ZW50TmFtZSk7XHJcblxyXG4gICAgICBmb3IobGV0IGkgaW4gZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0pe1xyXG4gICAgICAgIGV2ZW50c0NhbGxiYWNrc1tldmVudE5hbWVdW2ldLmFwcGx5KHRoaXosIGFyZ3MpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDYWxsYmFja3MgcGFyYSBsb3MgZXJyb3Jlc1xyXG4gICAgdGhpei5lcnJvciA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICB0aGl6LmJpbmQoaWRiRXZlbnRzLkRCX0VSUk9SLCBjYik7XHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBYnJpciB1bmEgQmFzZSBkZSBkYXRvcy5cclxuICAgIHRoaXoub3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKG9wZW5lZCkgcmV0dXJuIG9wZW5EZWZlcmVkO1xyXG5cclxuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gZGVmZXJcclxuICAgICAgb3BlbmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIC8vIGRlamFtb3MgYWJpZXJ0YSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcclxuICAgICAgLy8gaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKGRiTmFtZSkub25zdWNjZXNzID1cclxuICAgICAgZnVuY3Rpb24gcmVhZHkoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHJxID0gaW5kZXhlZERCLm9wZW4oZGJOYW1lLCBkYlZlcnNpb24pO1xyXG5cclxuICAgICAgICBycS5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLnJlc3VsdCFcclxuICAgICAgICAgIHVwZ3JhZGVOZWVkZWREZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hciBlbCBtYW5lamFkb3IgZGVsIHJlc3VsdGFkb1xyXG4gICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxyXG4gICAgICAgICAgcmVxdWVzdCA9IHJxO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBBc2luZ2FyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzIGEgbGEgQkRcclxuICAgICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgJGxvZy5lcnJvcignRGF0YWJhc2UgZXJyb3I6ICcrIGV2ZW50LnRhcmdldC5lcnJvckNvZGUpO1xyXG4gICAgICAgICAgICB0aGl6LnRyaWdnZXIoaWRiRXZlbnRzLkRCX0VSUk9SLCBbZXZlbnRdKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBvcGVuRGVmZXJlZC5yZXNvbHZlKGV2ZW50LCBycSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlIGVycm9yZXNcclxuICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLmVycm9yQ29kZSFcclxuICAgICAgICBycS5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICBvcGVuRGVmZXJlZC5yZWplY3QocnEuZXJyb3JDb2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmVhZHkoKTtcclxuXHJcbiAgICAgIHJldHVybiBvcGVuRGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFncmVnYSB1biBudWV2byBtb2RlbG9cclxuICAgIHRoaXoubW9kZWwgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJ10pO1xyXG5cclxuICAgICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG9cclxuICAgICAgbGV0IG1vZGVsID0gdGhpei5tb2RlbHNbbmFtZV07XHJcblxyXG4gICAgICAvLyBTaSBubyBleGlzdGUgZWwgbW9kZWxvIGNyZWFyXHJcbiAgICAgIGlmKCFtb2RlbClcclxuICAgICAgICBtb2RlbCA9IGlkYk1vZGVsKHRoaXosIG5hbWUpO1xyXG5cclxuICAgICAgLy8gR3VhcmRhciBlbCBtb2RlbG8gZW4gbG9zIG1vZGVsb3NcclxuICAgICAgdGhpei5tb2RlbHNbbmFtZV0gPSBtb2RlbDtcclxuXHJcbiAgICAgIC8vIFJldG9ybmFyIGVsIG1vZGVsb1xyXG4gICAgICByZXR1cm4gbW9kZWw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcclxuICAgIHRoaXouY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBtb2RlbElkKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcclxuICAgICAgICBycS5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUobW9kZWxOYW1lLCBtb2RlbElkKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcclxuICAgIHRoaXouY3JlYXRlSW5kZXggPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnLCBbJ29iamVjdCcsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcclxuICAgICAgICBsZXQgc3RvcmUgPSBycS50cmFuc2FjdGlvbi5vYmplY3RTdG9yZShtb2RlbE5hbWUpO1xyXG4gICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIHVuYSB0cmFuc2FjY2nDs25cclxuICAgIHRoaXoudHJhbnNhY3Rpb24gPSBmdW5jdGlvbihtb2RlbE5hbWUsIHBlcm1zLCBhY3Rpb24sIGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgbGV0IGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XHJcblxyXG4gICAgICAvLyBDdWFuZG8gc2UgYWJyYSBsYSBCRFxyXG4gICAgICBvcGVuRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xyXG4gICAgICAgIGxldCB0eCA9IHJxLnJlc3VsdC50cmFuc2FjdGlvbihtb2RlbE5hbWUsIHBlcm1zKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYWN0aW9uKHR4KTtcclxuXHJcbiAgICAgICAgLy8gVHJhbnNhY2Npb24gY29tcGxldGFkYSBzYXRpc2ZhdG9yaWFtZW50ZVxyXG4gICAgICAgIHR4Lm9uY29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCwgcmVzdWx0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxyXG4gICAgICAgIHR4Lm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdCh0eC5lcnJvcik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBJbnNlcnRhIHVuIHJlZ2lzdHJvIGVuIGVsIG1vZGVsb1xyXG4gICAgdGhpei5jcmVhdGUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbnN0YW5jZSwgY2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnb2JqZWN0JywgJ2Z1bmN0aW9uJ10sIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGxldCBkZWZlcmVkID0gcXMuZGVmZXIoY2IpO1xyXG5cclxuICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cclxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBsZXQgcnEgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpLnB1dChpbnN0YW5jZS52YWx1ZXMoKSk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcclxuICAgICAgICBycS5vbnN1Y2Nlc3MgID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoZXZlbnQsIGluc3RhbmNlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZSBnZW5lcsOzIHVuIGVycm9yIGVuIGxhIHRyYW5zYWNjacOzblxyXG4gICAgICAgIHJxLm9uZXJyb3IgID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgLy8gQ291bGQgY2FsbCBycS5wcmV2ZW50RGVmYXVsdCgpIHRvIHByZXZlbnQgdGhlIHRyYW5zYWN0aW9uIGZyb20gYWJvcnRpbmcuXHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChycSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGRlZmVyZWQuJHByb21pc2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBPYnRpZW5lIHVuIGVsZW1lbnRvIHBvciBzaSBrZXlcclxuICAgIHRoaXouZ2V0ID0gZnVuY3Rpb24gKE1vZGVsLCBtb2RlbE5hbWUsIGtleSwgY2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJywgJ3N0cmluZycsIG51bGwsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuICAgICAgXHJcbiAgICAgIGxldCBkZWZlcmVkID0gcXMuZGVmZXIoY2IpO1xyXG4gICAgICBsZXQgaW5zdGFuY2UgPSBNb2RlbC5nZXRJbnN0YW5jZShrZXkpO1xyXG5cclxuICAgICAgaW5zdGFuY2UuJHByb21pc2UgPSBkZWZlcmVkLnByb21pc2U7XHJcbiAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xyXG4gICAgICAgIGxldCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBzdG9yZS5nZXQoa2V5KTtcclxuXHJcbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmIChyZXF1ZXN0LnJlc3VsdCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5zZXRBdHRyaWJ1dGVzKHJlcXVlc3QucmVzdWx0KTtcclxuICAgICAgICAgICAgaW5zdGFuY2UuJGlzTmV3ID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgZGVmZXJlZC5yZXNvbHZlKGluc3RhbmNlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBkZWZlcmVkLnJlamVjdChpbnN0YW5jZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xyXG4gICAgdGhpei5maW5kID0gZnVuY3Rpb24gKE1vZGVsLCBtb2RlbE5hbWUsIHNjb3BlLCBjYikge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nLCAnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIGxldCBkZWZlcmVkID0gcXMuZGVmZXIoY2IpO1xyXG4gICAgICBsZXQgcmVzdWx0ID0gW107XHJcblxyXG4gICAgICByZXN1bHQuJHByb21pc2UgPSBkZWZlcmVkLnByb21pc2U7XHJcbiAgICAgIHJlc3VsdC4kcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXHJcbiAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcclxuICAgICAgICBsZXQgc3RvcmUgPSB0eC5vYmplY3RTdG9yZShtb2RlbE5hbWUpO1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gc3RvcmUub3BlbkN1cnNvcigpO1xyXG5cclxuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgbGV0IGN1cnNvciA9IHJlcXVlc3QucmVzdWx0O1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBObyBtb3JlIG1hdGNoaW5nIHJlY29yZHMuXHJcbiAgICAgICAgICBpZiAoIWN1cnNvcil7XHJcbiAgICAgICAgICAgIHJlc3VsdC4kcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIE9idGVuZXIgbGEgaW5zdGFuY2lhXHJcbiAgICAgICAgICBsZXQgcmVjb3JkID0gTW9kZWwuZ2V0SW5zdGFuY2VGcm9tT2JqZWN0KGN1cnNvci52YWx1ZSk7XHJcbiAgICAgICAgICByZWNvcmQuJGlzTmV3ID0gZmFsc2U7IC8vIEluaWNhciBxdWUgbm8gZXMgdW4gcmVnaXN0cm8gbnVldm9cclxuXHJcbiAgICAgICAgICAvLyBBZ3JlZ2FyIGFsIHJlc3VsdGFkb1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2gocmVjb3JkKTtcclxuXHJcbiAgICAgICAgICAvLyBCdXNjYXIgc2lndWllbnRlXHJcbiAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWFyIGFsaWFzIHBhcmEgbG9zIGV2ZW50b3MgZW5sYXphciBjYWxsYmFja3MgYSBsb3MgZXZlbnRvc1xyXG4gICAgbGV0IGRlZmVyZWRzO1xyXG4gICAgT2JqZWN0LmtleXMoZGVmZXJlZHMgPSB7XHJcbiAgICAgIG9uT3Blbjogb3BlbkRlZmVyZWQsXHJcbiAgICAgIG9uVXBncmFkZU5lZWRlZDogdXBncmFkZU5lZWRlZERlZmVyZWQsXHJcbiAgICB9KS5tYXAoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgbGV0IHRleHQgPSBkYk5hbWUrJy52JysoZGJWZXJzaW9ufHwxKSsnOiAnK2tleTtcclxuICAgICAgICBpZiAoZXJyKXtcclxuICAgICAgICAgICRsb2cuZXJyb3IodGV4dCwgZXJyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJGxvZy5sb2codGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpeltrZXldID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ2Z1bmN0aW9uJ10pO1xyXG4gICAgICAgIGRlZmVyZWRzW2tleV0ucHJvbWlzZS5kb25lKGNiKTtcclxuICAgICAgICByZXR1cm4gdGhpejtcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICB9O1xyXG5cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlkYjtcbmZ1bmN0aW9uIGlkYihxcywgaWRiTW9kZWwsIGlkYlV0aWxzLCBpZGJFdmVudHMsICRsb2cpIHtcbiAgICAgICduZ0luamVjdCc7XG5cbiAgICAgIC8vIEVuIGxhIHNpZ3VpZW50ZSBsaW5lYSwgcHVlZGUgaW5jbHVpciBwcmVmaWpvcyBkZSBpbXBsZW1lbnRhY2lvbiBxdWUgcXVpZXJhIHByb2Jhci5cblxuICAgICAgdmFyIGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQjtcbiAgICAgIC8vIE5vIHVzZSBcImNvbnN0IGluZGV4ZWREQiA9IC4uLlwiIFNpIG5vIGVzdMOhIGVuIHVuYSBmdW5jacOzbi5cbiAgICAgIC8vIFBvciBvdHJhIHBhcnRlLCBwdWVkZXMgbmVjZXNpdGFyIHJlZmVyZW5jaWFzIGEgYWxndW4gb2JqZXRvIHdpbmRvdy5JREIqOlxuICAgICAgdmFyIElEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbjtcbiAgICAgIHZhciBJREJLZXlSYW5nZSA9IHdpbmRvdy5JREJLZXlSYW5nZSB8fCB3aW5kb3cud2Via2l0SURCS2V5UmFuZ2UgfHwgd2luZG93Lm1zSURCS2V5UmFuZ2U7XG4gICAgICAvLyAoTW96aWxsYSBudW5jYSBoYSBwcmVmaWphZG8gZXN0b3Mgb2JqZXRvcywgcG9yIGxvIHRhbnRvIG5vIG5lY2VzaXRhbW9zIHdpbmRvdy5tb3pJREIqKVxuXG4gICAgICBpZiAoIWluZGV4ZWREQikge1xuICAgICAgICAgICAgYWxlcnQoXCJTdSBuYXZlZ2Fkb3Igbm8gc29wb3J0YSB1bmEgdmVyc2nDs24gZXN0YWJsZSBkZSBpbmRleGVkREIuIFRhbCB5IGNvbW8gbGFzIGNhcmFjdGVyw61zdGljYXMgbm8gc2Vyw6FuIHZhbGlkYXNcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIENsYXNlIHBhcmEgbGEgY3JlYWNpw7NuIGRlIGluc3RhbmNpYXMgZGUgbGEgQkRcbiAgICAgIHJldHVybiBmdW5jdGlvbiBpZGIoZGJOYW1lLCBkYlZlcnNpb24pIHtcbiAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnbnVtYmVyJ10pO1xuXG4gICAgICAgICAgICAvLyBNYW5lamFkb3JlcyBkZSBldmVudG9zLlxuICAgICAgICAgICAgdmFyIGV2ZW50c0NhbGxiYWNrcyA9IHt9O1xuICAgICAgICAgICAgdmFyIHVwZ3JhZGVOZWVkZWREZWZlcmVkID0gcXMuZGVmZXIoKTtcbiAgICAgICAgICAgIHZhciBvcGVuRGVmZXJlZCA9IHFzLmRlZmVyKCk7XG4gICAgICAgICAgICB2YXIgb3BlbmVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIEluc3RhbmNpYSBkZSBsYSBiYXNlIGRlIGRhdG9zO1xuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSBudWxsO1xuICAgICAgICAgICAgdGhpei5tb2RlbHMgPSB7fTtcblxuICAgICAgICAgICAgLy8gQWdyZWdhciB1biBtYW5lamFkb3IgZGUgZXZlbnRvXG4gICAgICAgICAgICB0aGl6LmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCFldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV0ucHVzaChjYik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvL1JlbXVldmUgdW4gbWFuZWphZG9yIGRlIGV2ZW50b1xuICAgICAgICAgICAgdGhpei51bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdmdW5jdGlvbiddKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCFldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAvLyBCdXNjYXIgZWwgY2JcbiAgICAgICAgICAgICAgICAgIHZhciBpZHggPSBldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5pbmRleE9mKGNiKTtcblxuICAgICAgICAgICAgICAgICAgLy8gU2kgc2UgZW5jb250cm8gZWwgY2IgcmVtb3ZlcmxvXG4gICAgICAgICAgICAgICAgICBpZiAoaWR4ICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERpc3BhcmEgdW4gZXZlbnRvXG4gICAgICAgICAgICB0aGl6LnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCddKTtcblxuICAgICAgICAgICAgICAgICAgJGxvZy5sb2coZGJOYW1lICsgJy52JyArIChkYlZlcnNpb24gfHwgMSkgKyAnOiAnICsgZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBldmVudHNDYWxsYmFja3NbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzQ2FsbGJhY2tzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpeiwgYXJncyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDYWxsYmFja3MgcGFyYSBsb3MgZXJyb3Jlc1xuICAgICAgICAgICAgdGhpei5lcnJvciA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgICAgICAgdGhpei5iaW5kKGlkYkV2ZW50cy5EQl9FUlJPUiwgY2IpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBYnJpciB1bmEgQmFzZSBkZSBkYXRvcy5cbiAgICAgICAgICAgIHRoaXoub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChvcGVuZWQpIHJldHVybiBvcGVuRGVmZXJlZDtcblxuICAgICAgICAgICAgICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gZGVmZXJcbiAgICAgICAgICAgICAgICAgIG9wZW5lZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgIC8vIGRlamFtb3MgYWJpZXJ0YSBudWVzdHJhIGJhc2UgZGUgZGF0b3NcbiAgICAgICAgICAgICAgICAgIC8vIGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShkYk5hbWUpLm9uc3VjY2VzcyA9XG4gICAgICAgICAgICAgICAgICBmdW5jdGlvbiByZWFkeSgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJxID0gaW5kZXhlZERCLm9wZW4oZGJOYW1lLCBkYlZlcnNpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBycS5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLnJlc3VsdCFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZ3JhZGVOZWVkZWREZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlbCByZXN1bHRhZG9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcnEucmVzdWx0IVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdCA9IHJxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBc2luZ2FyIGVsIG1hbmVqYWRvciBkZSBlcnJvcmVzIGEgbGEgQkRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsb2cuZXJyb3IoJ0RhdGFiYXNlIGVycm9yOiAnICsgZXZlbnQudGFyZ2V0LmVycm9yQ29kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGl6LnRyaWdnZXIoaWRiRXZlbnRzLkRCX0VSUk9SLCBbZXZlbnRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5EZWZlcmVkLnJlc29sdmUoZXZlbnQsIHJxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFzaWduYXIgZWwgbWFuZWphZG9yIGRlIGVycm9yZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJxLmVycm9yQ29kZSFcbiAgICAgICAgICAgICAgICAgICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5EZWZlcmVkLnJlamVjdChycS5lcnJvckNvZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIHJlYWR5KCk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcGVuRGVmZXJlZDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEFncmVnYSB1biBudWV2byBtb2RlbG9cbiAgICAgICAgICAgIHRoaXoubW9kZWwgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZyddKTtcblxuICAgICAgICAgICAgICAgICAgLy8gSW5zdGFuY2lhciBlbCBtb2RlbG9cbiAgICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IHRoaXoubW9kZWxzW25hbWVdO1xuXG4gICAgICAgICAgICAgICAgICAvLyBTaSBubyBleGlzdGUgZWwgbW9kZWxvIGNyZWFyXG4gICAgICAgICAgICAgICAgICBpZiAoIW1vZGVsKSBtb2RlbCA9IGlkYk1vZGVsKHRoaXosIG5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAvLyBHdWFyZGFyIGVsIG1vZGVsbyBlbiBsb3MgbW9kZWxvc1xuICAgICAgICAgICAgICAgICAgdGhpei5tb2RlbHNbbmFtZV0gPSBtb2RlbDtcblxuICAgICAgICAgICAgICAgICAgLy8gUmV0b3JuYXIgZWwgbW9kZWxvXG4gICAgICAgICAgICAgICAgICByZXR1cm4gbW9kZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcbiAgICAgICAgICAgIHRoaXouY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBtb2RlbElkKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJxLnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShtb2RlbE5hbWUsIG1vZGVsSWQpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDcmVhIGVsIG9iamVjdFN0b3JlIHBhcmEgdW4gbW9kZWxcbiAgICAgICAgICAgIHRoaXouY3JlYXRlSW5kZXggPSBmdW5jdGlvbiAobW9kZWxOYW1lLCBpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsICdzdHJpbmcnLCAnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgdXBncmFkZU5lZWRlZERlZmVyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChldmVudCwgcnEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdG9yZSA9IHJxLnRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIENyZWEgdW5hIHRyYW5zYWNjacOzblxuICAgICAgICAgICAgdGhpei50cmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIHBlcm1zLCBhY3Rpb24sIGNiKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ3N0cmluZycsICdmdW5jdGlvbicsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XG5cbiAgICAgICAgICAgICAgICAgIC8vIEN1YW5kbyBzZSBhYnJhIGxhIEJEXG4gICAgICAgICAgICAgICAgICBvcGVuRGVmZXJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV2ZW50LCBycSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR4ID0gcnEucmVzdWx0LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgcGVybXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGFjdGlvbih0eCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyYW5zYWNjaW9uIGNvbXBsZXRhZGEgc2F0aXNmYXRvcmlhbWVudGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4Lm9uY29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNlIGdlbmVyw7MgdW4gZXJyb3IgZW4gbGEgdHJhbnNhY2Npw7NuXG4gICAgICAgICAgICAgICAgICAgICAgICB0eC5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJlZC5yZWplY3QodHguZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJlZDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEluc2VydGEgdW4gcmVnaXN0cm8gZW4gZWwgbW9kZWxvXG4gICAgICAgICAgICB0aGl6LmNyZWF0ZSA9IGZ1bmN0aW9uIChtb2RlbE5hbWUsIGluc3RhbmNlLCBjYikge1xuICAgICAgICAgICAgICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ3N0cmluZycsIFsnb2JqZWN0JywgJ2Z1bmN0aW9uJ10sIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XG5cbiAgICAgICAgICAgICAgICAgIC8vIFNlIGNyZWEgdW5hIHRyYW5zYWNjaW9uXG4gICAgICAgICAgICAgICAgICB0aGl6LnRyYW5zYWN0aW9uKG1vZGVsTmFtZSwgJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJxID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKS5wdXQoaW5zdGFuY2UudmFsdWVzKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmFuc2FjY2lvbiBjb21wbGV0YWRhIHNhdGlzZmF0b3JpYW1lbnRlXG4gICAgICAgICAgICAgICAgICAgICAgICBycS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVzb2x2ZShldmVudCwgaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2UgZ2VuZXLDsyB1biBlcnJvciBlbiBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgICAgICAgICAgICAgICAgIHJxLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDb3VsZCBjYWxsIHJxLnByZXZlbnREZWZhdWx0KCkgdG8gcHJldmVudCB0aGUgdHJhbnNhY3Rpb24gZnJvbSBhYm9ydGluZy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyZWQucmVqZWN0KHJxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVyZWQuJHByb21pc2U7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBPYnRpZW5lIHVuIGVsZW1lbnRvIHBvciBzaSBrZXlcbiAgICAgICAgICAgIHRoaXouZ2V0ID0gZnVuY3Rpb24gKE1vZGVsLCBtb2RlbE5hbWUsIGtleSwgY2IpIHtcbiAgICAgICAgICAgICAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydmdW5jdGlvbicsICdzdHJpbmcnLCBudWxsLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgICAgICAgICAgICAgIHZhciBkZWZlcmVkID0gcXMuZGVmZXIoY2IpO1xuICAgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gTW9kZWwuZ2V0SW5zdGFuY2Uoa2V5KTtcblxuICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuJHByb21pc2UgPSBkZWZlcmVkLnByb21pc2U7XG4gICAgICAgICAgICAgICAgICBpbnN0YW5jZS4kcmVzb2x2ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgdGhpei50cmFuc2FjdGlvbihtb2RlbE5hbWUsICdyZWFkb25seScsIGZ1bmN0aW9uICh0eCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3JlID0gdHgub2JqZWN0U3RvcmUobW9kZWxOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gc3RvcmUuZ2V0KGtleSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QucmVzdWx0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2Uuc2V0QXR0cmlidXRlcyhyZXF1ZXN0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS4kaXNOZXcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcmVkLnJlc29sdmUoaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJlZC5yZWplY3QoaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBCdXNjYXIgZW4gZWwgbW9kZWxvXG4gICAgICAgICAgICB0aGl6LmZpbmQgPSBmdW5jdGlvbiAoTW9kZWwsIG1vZGVsTmFtZSwgc2NvcGUsIGNiKSB7XG4gICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nLCAnc3RyaW5nJywgWydvYmplY3QnLCAndW5kZWZpbmVkJ10sIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcblxuICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XG4gICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgICAgICAgICAgICAgIHJlc3VsdC4kcHJvbWlzZSA9IGRlZmVyZWQucHJvbWlzZTtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdC4kcmVzb2x2ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgLy8gU2UgY3JlYSB1bmEgdHJhbnNhY2Npb25cbiAgICAgICAgICAgICAgICAgIHRoaXoudHJhbnNhY3Rpb24obW9kZWxOYW1lLCAncmVhZG9ubHknLCBmdW5jdGlvbiAodHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKG1vZGVsTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWVzdCA9IHN0b3JlLm9wZW5DdXJzb3IoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3Vyc29yID0gcmVxdWVzdC5yZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vIG1vcmUgbWF0Y2hpbmcgcmVjb3Jkcy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcmVkLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT2J0ZW5lciBsYSBpbnN0YW5jaWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWNvcmQgPSBNb2RlbC5nZXRJbnN0YW5jZUZyb21PYmplY3QoY3Vyc29yLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZC4kaXNOZXcgPSBmYWxzZTsgLy8gSW5pY2FyIHF1ZSBubyBlcyB1biByZWdpc3RybyBudWV2b1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZ3JlZ2FyIGFsIHJlc3VsdGFkb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocmVjb3JkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQnVzY2FyIHNpZ3VpZW50ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDcmVhciBhbGlhcyBwYXJhIGxvcyBldmVudG9zIGVubGF6YXIgY2FsbGJhY2tzIGEgbG9zIGV2ZW50b3NcbiAgICAgICAgICAgIHZhciBkZWZlcmVkcyA9IHZvaWQgMDtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGRlZmVyZWRzID0ge1xuICAgICAgICAgICAgICAgICAgb25PcGVuOiBvcGVuRGVmZXJlZCxcbiAgICAgICAgICAgICAgICAgIG9uVXBncmFkZU5lZWRlZDogdXBncmFkZU5lZWRlZERlZmVyZWRcbiAgICAgICAgICAgIH0pLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IGRiTmFtZSArICcudicgKyAoZGJWZXJzaW9uIHx8IDEpICsgJzogJyArIGtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsb2cuZXJyb3IodGV4dCwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbG9nLmxvZyh0ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgdGhpeltrZXldID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcmVkc1trZXldLnByb21pc2UuZG9uZShjYik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpejtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgIH07XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRnVuY2lvbiBwYXJhIGVsIHNlcnZpY2lvIGRlIGxhIEJEXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkYk1vZGVsIChxcywgaWRiVXRpbHMsIGxiUmVzb3VyY2UpIHsgJ25nSW5qZWN0JztcclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIGlkYk1vZGVsKCRkYiwgJG1vZGVsTmFtZSkgeyBsZXQgdGhpeiA9IHRoaXM7XHJcbiAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFtudWxsICwnc3RyaW5nJ10pO1xyXG5cclxuICAgIC8vIENsYXZlIGRlbCBtb2RlbG9cclxuICAgIGxldCAkaWQgPSB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfTtcclxuICAgIGxldCAkZmllbGRzID0ge307XHJcbiAgICBsZXQgJGluc3RhbmNlcyA9IHt9O1xyXG4gICAgbGV0ICRyZW1vdGUgPSBudWxsO1xyXG5cclxuICAgIC8vIENvbnN0dWN0b3IgZGVsIG1vZGVsb1xyXG4gICAgZnVuY3Rpb24gTW9kZWwoZGF0YSkge1xyXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZXMoZGF0YSB8fCB7fSk7XHJcbiAgICAgIHRoaXMuY29uc3RydWN0b3IoZGF0YSk7XHJcbiAgICAgIHRoaXMuJGlzTmV3ID0gdHJ1ZTtcclxuICAgICAgdGhpcy4kcmVjb3JkID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xyXG4gICAgTW9kZWwuaWQgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcclxuICAgICAgJGlkID0gaWQ7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSBlbCBvYmplY3RvIHN0b3JhZ2UgcGFyYSBlbCBtb2RlbG8uXHJcbiAgICBNb2RlbC5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgJGRiLmNyZWF0ZVN0b3JlKCRtb2RlbE5hbWUsICRpZCk7XHJcbiAgICAgIHJldHVybiBNb2RlbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQWdyZWdhIHVuIGluZGV4XHJcbiAgICBNb2RlbC5pbmRleCA9IGZ1bmN0aW9uIChpbmRleE5hbWUsIGZpZWxkTmFtZSwgb3B0cykge1xyXG4gICAgICAkZGIuY3JlYXRlSW5kZXgoJG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE3DqXRvZG8gcXVlIHBlcm1pdGUgbW9kaWZpY2FyIG1vZGVsLlxyXG4gICAgTW9kZWwuYnVpbGQgPSBmdW5jdGlvbiAoYnVpbGRDYWxsYmFjaykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XHJcbiAgICAgIGJ1aWxkQ2FsbGJhY2soTW9kZWwpO1xyXG4gICAgICByZXR1cm4gTW9kZWw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBsYSBlc3BlY2lmaWNhY2nDs24gZGUgbG9zIGNhbXBvc1xyXG4gICAgTW9kZWwuZmllbGRzID0gZnVuY3Rpb24gKGZpZWxkcykge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xyXG5cclxuICAgICAgJGZpZWxkcyA9IHt9O1xyXG4gICAgICAkZmllbGRzWyRpZC5rZXlQYXRoXSA9IHtcclxuICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIixcclxuICAgICAgICBcInJlcXVpcmVkXCI6IHRydWVcclxuICAgICAgfTtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZE5hbWUpIHtcclxuICAgICAgICBsZXQgZmllbGQgPSBmaWVsZHNbZmllbGROYW1lXTtcclxuICAgICAgICBpZiAodHlwZW9mIGZpZWxkc1tmaWVsZE5hbWVdID09ICdzdHJpbmcnKXtcclxuICAgICAgICAgIGZpZWxkID0geyBcInR5cGVcIjogZmllbGQgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJGZpZWxkc1tmaWVsZE5hbWVdID0gZmllbGQ7XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ29uZmlndXJhIGVsIHJlbW90ZSBhcGk7XHJcbiAgICBNb2RlbC5yZW1vdGUgPSBmdW5jdGlvbiAodXJsLCBhcmdzLCBhY3Rpb25zKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydzdHJpbmcnLCAnb2JqZWN0JywgJ29iamVjdCddKTtcclxuICAgICAgJHJlbW90ZSA9IGxiUmVzb3VyY2UodXJsLCBhcmdzLCBhY3Rpb25zKTtcclxuICAgICAgcmV0dXJuIE1vZGVsO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhIG51ZXZhcyBpbnN0YW5jaWFzIGRlIGxvcyBtb2RlbG9zXHJcbiAgICBNb2RlbC5jcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSwgY2IpIHtcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsIFsnZnVuY3Rpb24nLCAndW5kZWZpbmVkJ11dKTtcclxuXHJcbiAgICAgIC8vIFNpIGVzIHVuIGFycmF5XHJcbiAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIE1vZGVsLmdldEluc3RhbmNlRnJvbU9iamVjdChyZWNvcmQpXHJcbiAgICAgICAgICAuY3JlYXRlKGNiKTtcclxuICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAvLyBPYnRlbmVyIHVuYSBjb3BpYSBkZWwgYXJyYXlcclxuICAgICAgbGV0IGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRhdGEpO1xyXG4gICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgIGxldCBkZWZlcmVkID0gcXMuZGVmZXIoY2IpO1xyXG5cclxuICAgICAgKGZ1bmN0aW9uIGl0ZXJhdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIE5vIHF1ZWRhbiBlbGVtZW50b3MgZW4gZWwgYXJyYXlcclxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PSAwKSByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcblxyXG4gICAgICAgIC8vIENyZWFyIGVsIHNpZ3VpZW50ZSBlbGVtZW50b1xyXG4gICAgICAgIE1vZGVsLmNyZWF0ZShhcnIuc2hpZnQoKSwgZnVuY3Rpb24gKGVyciwgaW5zdGFuY2UpIHtcclxuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkZWZlcmVkLnJlamVjdChlcnIpO1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xyXG4gICAgICAgICAgaXRlcmF0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KSgpO1xyXG5cclxuICAgICAgLy8gRGV2b2x2ZXIgZWwgcHJvbWlzZVxyXG4gICAgICByZXR1cm4gZGVmZXJlZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEJ1c2NhciB1biBjYW1wb1xyXG4gICAgTW9kZWwuc2VhcmNoRGVlcEZpZWxkID0gZnVuY3Rpb24gKG9iaiwgZmllbGQsIGNiKSB7XHJcbiAgICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgWydvYmplY3QnLCAnc3RyaW5nJywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xyXG5cclxuICAgICAgbGV0IGZpZWxkcyA9IGZpZWxkLnNwbGl0KCcuJyk7XHJcbiAgICAgIGxldCBsYXN0RmllbGQgPSBmaWVsZHMucG9wKCk7XHJcblxyXG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIF9zZXQob2JqKSB7XHJcbiAgICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPT0gMClcclxuICAgICAgICAgIHJldHVybiBjYihvYmosIGxhc3RGaWVsZCk7XHJcbiAgICAgICAgbGV0IGZpZWxkID0gZmllbGRzLnNoaWZ0KCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAndW5kZWZpbmVkJylcclxuICAgICAgICAgIG9ialtmaWVsZF0gPSB7fTtcclxuICAgICAgICByZXR1cm4gX3NldChvYmpbZmllbGRdKTtcclxuICAgICAgfSkob2JqKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldnVlbHZlIGVsIHZhbG9yIGNvcnJlc3BvbmRpZW50ZSBhbCBrZXkgZGUgdW4gb2JqZXRvXHJcbiAgICBNb2RlbC5nZXRLZXlGcm9tID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgcmV0dXJuIE1vZGVsLnNlYXJjaERlZXBGaWVsZChkYXRhLCAkaWQua2V5UGF0aCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XHJcbiAgICAgICAgcmV0dXJuIG9ialtsYXN0RmllbGRdO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgbGEgaW5zdGFuY2lhIGRlbCBtb2RlbCBkZSBsYXMgZ3VhcmRhZGFzLiBTaSBubyBleGlzdGUgZW50b25jZVxyXG4gICAgLy8gc2UgY3JlYVxyXG4gICAgTW9kZWwuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoa2V5KSB7XHJcblxyXG4gICAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcclxuICAgICAgaWYgKCFrZXkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1vZGVsKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE5vIGV4aXN0ZSBsYSBpbnN0YW5jaWEgZW50b25jZSBzZSBjcmVhXHJcbiAgICAgIGlmICghJGluc3RhbmNlc1trZXldKXtcclxuICAgICAgICAkaW5zdGFuY2VzW2tleV0gPSBuZXcgTW9kZWwoKTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgcmV0dXJuICRpbnN0YW5jZXNba2V5XTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYSB1bmEgaW5zdGFuY2lhIGRlbCBtb2RlbG8gYSBwYXJ0aXIgZGUgdW4gb2JqZWN0XHJcbiAgICBNb2RlbC5nZXRJbnN0YW5jZUZyb21PYmplY3QgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xyXG5cclxuICAgICAgbGV0IHJlY29yZCA9IE1vZGVsLmdldEluc3RhbmNlKE1vZGVsLmdldEtleUZyb20oZGF0YSkpO1xyXG4gICAgICByZWNvcmQuc2V0QXR0cmlidXRlcyhkYXRhKTtcclxuICAgICAgcmV0dXJuIHJlY29yZDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEJ1c2NhIHVuIHJlZ2lzdHJvIGVuIGxhIG9iamVjdFN0b3JlIGRlbCBtb2RlbG8uXHJcbiAgICBNb2RlbC5nZXQgPSBmdW5jdGlvbiAoa2V5LCBjYikge1xyXG5cclxuICAgICAgcmV0dXJuICRkYi5nZXQoTW9kZWwsICRtb2RlbE5hbWUsIGtleSwgY2IpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xyXG4gICAgTW9kZWwuZmluZCA9IGZ1bmN0aW9uIChzY29wZSwgY2IpIHtcclxuICAgICAgbGV0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICBjYiA9IGFyZ3MucG9wKCk7IHNjb3BlID0gYXJncy5wb3AoKTtcclxuICAgICAgaWYgKCRyZW1vdGUpIHtcclxuICAgICAgICAvLyBCdXNjYXIgbG9zIHJlZ2lzdHJvcyBlbiBsYSBBUElcclxuICAgICAgICAkcmVtb3RlLmZpbmQoc2NvcGUsIGNiKS4kcHJvbWlzZVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXN1bHQubWFwKGZ1bmN0aW9uIChyZWNvcmQsIGlkeCkge1xyXG5cclxuICAgICAgICAgICAgICBNb2RlbC5nZXQoTW9kZWwuZ2V0S2V5RnJvbShyZWNvcmQpKS4kcHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgLnNldEF0dHJpYnV0ZXMocmVjb3JkKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXNvdXJjZShyZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuJGlzTmV3KXtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhbJ2VycicsIGVycl0pXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gJGRiLmZpbmQoTW9kZWwsICRtb2RlbE5hbWUsIHNjb3BlLCBjYik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBsb3MgYXRyaWJ1dG9zXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuc2V0QXR0cmlidXRlcyA9IGZ1bmN0aW9uIChkYXRhKSB7IGxldCB0aGl6ID0gdGhpcztcclxuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcclxuICAgICAgXHJcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbiAocHJvcGVydHkpIHtcclxuICAgICAgICB0aGl6LnNldChwcm9wZXJ0eSwgZGF0YVtwcm9wZXJ0eV0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiB0aGl6O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV2dWVsdmUgZWwgdmFsb3IgZGUgdW5hIHByb3BpZWRhZFxyXG4gICAgTW9kZWwucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChmaWVsZCkgeyBsZXQgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHJldHVybiBNb2RlbC5zZWFyY2hEZWVwRmllbGQodGhpeiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBpbiB2YWxvciBhIHVuIGNhbXBvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkgeyBsZXQgdGhpeiA9IHRoaXM7XHJcbiAgICAgIHJldHVybiBNb2RlbC5zZWFyY2hEZWVwRmllbGQodGhpeiwgZmllbGQsIGZ1bmN0aW9uIChvYmosIGxhc3RGaWVsZCkge1xyXG4gICAgICAgIG9ialtsYXN0RmllbGRdID0gdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXo7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBPYnRpZW5lIGxvcyB2YWxvcmVzIHJlYWxlcyBhY3R1YWxlcyBwYXJhIGd1YXJkYXIgZW4gZWwgc3RvcmVcclxuICAgIE1vZGVsLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7IGxldCB0aGl6ID0gdGhpcztcclxuICAgICAgbGV0IHZhbHVlcyA9IHt9O1xyXG5cclxuICAgICAgT2JqZWN0LmtleXMoJGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh2YWx1ZXMsIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcclxuICAgICAgICAgIG9ialtsYXN0RmllbGRdID0gdGhpei5nZXQoZmllbGQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiB2YWx1ZXM7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDb25zdHVyY3RvciBxdWUgc2UgcHVlZGUgc29icmUgZXNjcmliaXJcclxuICAgIE1vZGVsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEd1YXJkYSBsb3MgZGF0b3MgZGVsIG9iamV0b1xyXG4gICAgTW9kZWwucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChjYil7IGxldCB0aGl6ID0gdGhpcztcclxuICAgICAgcmV0dXJuICRkYi5jcmVhdGUoJG1vZGVsTmFtZSwgdGhpcywgZnVuY3Rpb24gKGVyciwgZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXJyKSB7IGlmIChjYikgY2IoZXJyKTsgcmV0dXJuOyB9O1xyXG5cclxuICAgICAgICAvLyBBc2lnbmFyIGVsIGdlbmVyYWRvIGFsIG1vZGVsb1xyXG4gICAgICAgIHRoaXouc2V0KCRpZC5rZXlQYXRoLCBldmVudC50YXJnZXQucmVzdWx0KTtcclxuICAgICAgICB0aGl6LiRpc05ldyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBTaSBsYSBpbnN0YW5jaWEgY3JlYWRhIG5vIGNvbmN1ZXJkYSBjb24gbGEgZ3VhcmRhZGFcclxuICAgICAgICBpZiAoJGluc3RhbmNlc1t0aGl6LmdldCgkaWQua2V5UGF0aCldKSB7XHJcbiAgICAgICAgICBpZiAoJGluc3RhbmNlc1t0aGl6LmdldCgkaWQua2V5UGF0aCldICE9PSB0aGl6KXtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpZGJNb2RlbC5Ud29JbnN0YW5jZXNXaXRoU2FtZUtleScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgIC8vIEd1YXJkYXIgbGEgaW5zdGFuY2lhIGVuIGxhIGNvbGVjaW9uIGRlIGluc3RhbmNpYXNcclxuICAgICAgICAgICRpbnN0YW5jZXNbdGhpei5nZXQoJGlkLmtleVBhdGgpXSA9IHRoaXo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2IpIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xyXG5cclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFzaWduYSBsYSBpbnN0YW5jaWEgZGVsIHJlZ2lzdHJvXHJcbiAgICBNb2RlbC5wcm90b3R5cGUucmVzb3VyY2UgPSBmdW5jdGlvbiAocmVjb3JkKSB7XHJcbiAgICAgIHRoaXMuJHJlY29yZCA9IHJlY29yZDtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBNb2RlbDtcclxuXHJcbiAgfTtcclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VydmljZXMvaWRiTW9kZWwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZ1bmNpb24gcGFyYSBlbCBzZXJ2aWNpbyBkZSBsYSBCRFxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaWRiTW9kZWw7XG5mdW5jdGlvbiBpZGJNb2RlbChxcywgaWRiVXRpbHMsIGxiUmVzb3VyY2UpIHtcbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gZnVuY3Rpb24gaWRiTW9kZWwoJGRiLCAkbW9kZWxOYW1lKSB7XG4gICAgdmFyIHRoaXogPSB0aGlzO1xuICAgIGlkYlV0aWxzLnZhbGlkYXRlKGFyZ3VtZW50cywgW251bGwsICdzdHJpbmcnXSk7XG5cbiAgICAvLyBDbGF2ZSBkZWwgbW9kZWxvXG4gICAgdmFyICRpZCA9IHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogdHJ1ZSB9O1xuICAgIHZhciAkZmllbGRzID0ge307XG4gICAgdmFyICRpbnN0YW5jZXMgPSB7fTtcbiAgICB2YXIgJHJlbW90ZSA9IG51bGw7XG5cbiAgICAvLyBDb25zdHVjdG9yIGRlbCBtb2RlbG9cbiAgICBmdW5jdGlvbiBNb2RlbChkYXRhKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZXMoZGF0YSB8fCB7fSk7XG4gICAgICB0aGlzLmNvbnN0cnVjdG9yKGRhdGEpO1xuICAgICAgdGhpcy4kaXNOZXcgPSB0cnVlO1xuICAgICAgdGhpcy4kcmVjb3JkID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQXNpZ25hIGVsIElEIGFsIG1vZGVsb1xuICAgIE1vZGVsLmlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0J10pO1xuICAgICAgJGlkID0gaWQ7XG4gICAgICByZXR1cm4gTW9kZWw7XG4gICAgfTtcblxuICAgIC8vIENyZWEgZWwgb2JqZWN0byBzdG9yYWdlIHBhcmEgZWwgbW9kZWxvLlxuICAgIE1vZGVsLmNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgJGRiLmNyZWF0ZVN0b3JlKCRtb2RlbE5hbWUsICRpZCk7XG4gICAgICByZXR1cm4gTW9kZWw7XG4gICAgfTtcblxuICAgIC8vIEFncmVnYSB1biBpbmRleFxuICAgIE1vZGVsLmluZGV4ID0gZnVuY3Rpb24gKGluZGV4TmFtZSwgZmllbGROYW1lLCBvcHRzKSB7XG4gICAgICAkZGIuY3JlYXRlSW5kZXgoJG1vZGVsTmFtZSwgaW5kZXhOYW1lLCBmaWVsZE5hbWUsIG9wdHMpO1xuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBNw6l0b2RvIHF1ZSBwZXJtaXRlIG1vZGlmaWNhciBtb2RlbC5cbiAgICBNb2RlbC5idWlsZCA9IGZ1bmN0aW9uIChidWlsZENhbGxiYWNrKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnZnVuY3Rpb24nXSk7XG4gICAgICBidWlsZENhbGxiYWNrKE1vZGVsKTtcbiAgICAgIHJldHVybiBNb2RlbDtcbiAgICB9O1xuXG4gICAgLy8gQXNpZ25hIGxhIGVzcGVjaWZpY2FjacOzbiBkZSBsb3MgY2FtcG9zXG4gICAgTW9kZWwuZmllbGRzID0gZnVuY3Rpb24gKGZpZWxkcykge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcblxuICAgICAgJGZpZWxkcyA9IHt9O1xuICAgICAgJGZpZWxkc1skaWQua2V5UGF0aF0gPSB7XG4gICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiLFxuICAgICAgICBcInJlcXVpcmVkXCI6IHRydWVcbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5rZXlzKGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZE5hbWUpIHtcbiAgICAgICAgdmFyIGZpZWxkID0gZmllbGRzW2ZpZWxkTmFtZV07XG4gICAgICAgIGlmICh0eXBlb2YgZmllbGRzW2ZpZWxkTmFtZV0gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBmaWVsZCA9IHsgXCJ0eXBlXCI6IGZpZWxkIH07XG4gICAgICAgIH1cbiAgICAgICAgJGZpZWxkc1tmaWVsZE5hbWVdID0gZmllbGQ7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBDb25maWd1cmEgZWwgcmVtb3RlIGFwaTtcbiAgICBNb2RlbC5yZW1vdGUgPSBmdW5jdGlvbiAodXJsLCBhcmdzLCBhY3Rpb25zKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnc3RyaW5nJywgJ29iamVjdCcsICdvYmplY3QnXSk7XG4gICAgICAkcmVtb3RlID0gbGJSZXNvdXJjZSh1cmwsIGFyZ3MsIGFjdGlvbnMpO1xuICAgICAgcmV0dXJuIE1vZGVsO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIG51ZXZhcyBpbnN0YW5jaWFzIGRlIGxvcyBtb2RlbG9zXG4gICAgTW9kZWwuY3JlYXRlID0gZnVuY3Rpb24gKGRhdGEsIGNiKSB7XG4gICAgICBpZGJVdGlscy52YWxpZGF0ZShhcmd1bWVudHMsIFsnb2JqZWN0JywgWydmdW5jdGlvbicsICd1bmRlZmluZWQnXV0pO1xuXG4gICAgICAvLyBTaSBlcyB1biBhcnJheVxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIE1vZGVsLmdldEluc3RhbmNlRnJvbU9iamVjdChyZWNvcmQpLmNyZWF0ZShjYik7XG4gICAgICB9XG5cbiAgICAgIC8vIE9idGVuZXIgdW5hIGNvcGlhIGRlbCBhcnJheVxuICAgICAgdmFyIGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRhdGEpO1xuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgdmFyIGRlZmVyZWQgPSBxcy5kZWZlcihjYik7XG5cbiAgICAgIChmdW5jdGlvbiBpdGVyYXRpb24oKSB7XG5cbiAgICAgICAgLy8gTm8gcXVlZGFuIGVsZW1lbnRvcyBlbiBlbCBhcnJheVxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PSAwKSByZXR1cm4gZGVmZXJlZC5yZXNvbHZlKHJlc3VsdCk7XG5cbiAgICAgICAgLy8gQ3JlYXIgZWwgc2lndWllbnRlIGVsZW1lbnRvXG4gICAgICAgIE1vZGVsLmNyZWF0ZShhcnIuc2hpZnQoKSwgZnVuY3Rpb24gKGVyciwgaW5zdGFuY2UpIHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZGVmZXJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICByZXN1bHQucHVzaChpbnN0YW5jZSk7XG4gICAgICAgICAgaXRlcmF0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSkoKTtcblxuICAgICAgLy8gRGV2b2x2ZXIgZWwgcHJvbWlzZVxuICAgICAgcmV0dXJuIGRlZmVyZWQ7XG4gICAgfTtcblxuICAgIC8vIEJ1c2NhciB1biBjYW1wb1xuICAgIE1vZGVsLnNlYXJjaERlZXBGaWVsZCA9IGZ1bmN0aW9uIChvYmosIGZpZWxkLCBjYikge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCcsICdzdHJpbmcnLCBbJ2Z1bmN0aW9uJywgJ3VuZGVmaW5lZCddXSk7XG5cbiAgICAgIHZhciBmaWVsZHMgPSBmaWVsZC5zcGxpdCgnLicpO1xuICAgICAgdmFyIGxhc3RGaWVsZCA9IGZpZWxkcy5wb3AoKTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIF9zZXQob2JqKSB7XG4gICAgICAgIGlmIChmaWVsZHMubGVuZ3RoID09IDApIHJldHVybiBjYihvYmosIGxhc3RGaWVsZCk7XG4gICAgICAgIHZhciBmaWVsZCA9IGZpZWxkcy5zaGlmdCgpO1xuICAgICAgICBpZiAodHlwZW9mIG9ialtmaWVsZF0gPT09ICd1bmRlZmluZWQnKSBvYmpbZmllbGRdID0ge307XG4gICAgICAgIHJldHVybiBfc2V0KG9ialtmaWVsZF0pO1xuICAgICAgfShvYmopO1xuICAgIH07XG5cbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBjb3JyZXNwb25kaWVudGUgYWwga2V5IGRlIHVuIG9iamV0b1xuICAgIE1vZGVsLmdldEtleUZyb20gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgcmV0dXJuIE1vZGVsLnNlYXJjaERlZXBGaWVsZChkYXRhLCAkaWQua2V5UGF0aCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBEZXZ1ZWx2ZSBsYSBpbnN0YW5jaWEgZGVsIG1vZGVsIGRlIGxhcyBndWFyZGFkYXMuIFNpIG5vIGV4aXN0ZSBlbnRvbmNlXG4gICAgLy8gc2UgY3JlYVxuICAgIE1vZGVsLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKGtleSkge1xuXG4gICAgICAvLyBFbCBvYmpldG8gbm8gdGllbmUgSURcbiAgICAgIGlmICgha2V5KSB7XG4gICAgICAgIHJldHVybiBuZXcgTW9kZWwoKTtcbiAgICAgIH1cblxuICAgICAgLy8gTm8gZXhpc3RlIGxhIGluc3RhbmNpYSBlbnRvbmNlIHNlIGNyZWFcbiAgICAgIGlmICghJGluc3RhbmNlc1trZXldKSB7XG4gICAgICAgICRpbnN0YW5jZXNba2V5XSA9IG5ldyBNb2RlbCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJGluc3RhbmNlc1trZXldO1xuICAgIH07XG5cbiAgICAvLyBDcmVhIHVuYSBpbnN0YW5jaWEgZGVsIG1vZGVsbyBhIHBhcnRpciBkZSB1biBvYmplY3RcbiAgICBNb2RlbC5nZXRJbnN0YW5jZUZyb21PYmplY3QgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcblxuICAgICAgdmFyIHJlY29yZCA9IE1vZGVsLmdldEluc3RhbmNlKE1vZGVsLmdldEtleUZyb20oZGF0YSkpO1xuICAgICAgcmVjb3JkLnNldEF0dHJpYnV0ZXMoZGF0YSk7XG4gICAgICByZXR1cm4gcmVjb3JkO1xuICAgIH07XG5cbiAgICAvLyBCdXNjYSB1biByZWdpc3RybyBlbiBsYSBvYmplY3RTdG9yZSBkZWwgbW9kZWxvLlxuICAgIE1vZGVsLmdldCA9IGZ1bmN0aW9uIChrZXksIGNiKSB7XG5cbiAgICAgIHJldHVybiAkZGIuZ2V0KE1vZGVsLCAkbW9kZWxOYW1lLCBrZXksIGNiKTtcbiAgICB9O1xuXG4gICAgLy8gQnVzY2FyIGVuIGVsIG1vZGVsb1xuICAgIE1vZGVsLmZpbmQgPSBmdW5jdGlvbiAoc2NvcGUsIGNiKSB7XG4gICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICBjYiA9IGFyZ3MucG9wKCk7c2NvcGUgPSBhcmdzLnBvcCgpO1xuICAgICAgaWYgKCRyZW1vdGUpIHtcbiAgICAgICAgLy8gQnVzY2FyIGxvcyByZWdpc3Ryb3MgZW4gbGEgQVBJXG4gICAgICAgICRyZW1vdGUuZmluZChzY29wZSwgY2IpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdC5tYXAoZnVuY3Rpb24gKHJlY29yZCwgaWR4KSB7XG5cbiAgICAgICAgICAgIE1vZGVsLmdldChNb2RlbC5nZXRLZXlGcm9tKHJlY29yZCkpLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgICAgICAgIGluc3RhbmNlLnNldEF0dHJpYnV0ZXMocmVjb3JkKS5yZXNvdXJjZShyZWNvcmQpO1xuICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuJGlzTmV3KSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY3JlYXRlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coWydlcnInLCBlcnJdKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gJGRiLmZpbmQoTW9kZWwsICRtb2RlbE5hbWUsIHNjb3BlLCBjYik7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBsb3MgYXRyaWJ1dG9zXG4gICAgTW9kZWwucHJvdG90eXBlLnNldEF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgaWRiVXRpbHMudmFsaWRhdGUoYXJndW1lbnRzLCBbJ29iamVjdCddKTtcblxuICAgICAgT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICB0aGl6LnNldChwcm9wZXJ0eSwgZGF0YVtwcm9wZXJ0eV0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGl6O1xuICAgIH07XG5cbiAgICAvLyBEZXZ1ZWx2ZSBlbCB2YWxvciBkZSB1bmEgcHJvcGllZGFkXG4gICAgTW9kZWwucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgcmV0dXJuIE1vZGVsLnNlYXJjaERlZXBGaWVsZCh0aGl6LCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgIHJldHVybiBvYmpbbGFzdEZpZWxkXTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBBc2lnbmEgaW4gdmFsb3IgYSB1biBjYW1wb1xuICAgIE1vZGVsLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoZmllbGQsIHZhbHVlKSB7XG4gICAgICB2YXIgdGhpeiA9IHRoaXM7XG4gICAgICByZXR1cm4gTW9kZWwuc2VhcmNoRGVlcEZpZWxkKHRoaXosIGZpZWxkLCBmdW5jdGlvbiAob2JqLCBsYXN0RmllbGQpIHtcbiAgICAgICAgb2JqW2xhc3RGaWVsZF0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXo7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gT2J0aWVuZSBsb3MgdmFsb3JlcyByZWFsZXMgYWN0dWFsZXMgcGFyYSBndWFyZGFyIGVuIGVsIHN0b3JlXG4gICAgTW9kZWwucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHZhciB2YWx1ZXMgPSB7fTtcblxuICAgICAgT2JqZWN0LmtleXMoJGZpZWxkcykubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBNb2RlbC5zZWFyY2hEZWVwRmllbGQodmFsdWVzLCBmaWVsZCwgZnVuY3Rpb24gKG9iaiwgbGFzdEZpZWxkKSB7XG4gICAgICAgICAgb2JqW2xhc3RGaWVsZF0gPSB0aGl6LmdldChmaWVsZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfTtcblxuICAgIC8vIENvbnN0dXJjdG9yIHF1ZSBzZSBwdWVkZSBzb2JyZSBlc2NyaWJpclxuICAgIE1vZGVsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChkYXRhKSB7fTtcblxuICAgIC8vIEd1YXJkYSBsb3MgZGF0b3MgZGVsIG9iamV0b1xuICAgIE1vZGVsLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHZhciB0aGl6ID0gdGhpcztcbiAgICAgIHJldHVybiAkZGIuY3JlYXRlKCRtb2RlbE5hbWUsIHRoaXMsIGZ1bmN0aW9uIChlcnIsIGV2ZW50KSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBpZiAoY2IpIGNiKGVycik7cmV0dXJuO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFzaWduYXIgZWwgZ2VuZXJhZG8gYWwgbW9kZWxvXG4gICAgICAgIHRoaXouc2V0KCRpZC5rZXlQYXRoLCBldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgdGhpei4kaXNOZXcgPSBmYWxzZTtcblxuICAgICAgICAvLyBTaSBsYSBpbnN0YW5jaWEgY3JlYWRhIG5vIGNvbmN1ZXJkYSBjb24gbGEgZ3VhcmRhZGFcbiAgICAgICAgaWYgKCRpbnN0YW5jZXNbdGhpei5nZXQoJGlkLmtleVBhdGgpXSkge1xuICAgICAgICAgIGlmICgkaW5zdGFuY2VzW3RoaXouZ2V0KCRpZC5rZXlQYXRoKV0gIT09IHRoaXopIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaWRiTW9kZWwuVHdvSW5zdGFuY2VzV2l0aFNhbWVLZXknKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gR3VhcmRhciBsYSBpbnN0YW5jaWEgZW4gbGEgY29sZWNpb24gZGUgaW5zdGFuY2lhc1xuICAgICAgICAgICRpbnN0YW5jZXNbdGhpei5nZXQoJGlkLmtleVBhdGgpXSA9IHRoaXo7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2IpIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIEFzaWduYSBsYSBpbnN0YW5jaWEgZGVsIHJlZ2lzdHJvXG4gICAgTW9kZWwucHJvdG90eXBlLnJlc291cmNlID0gZnVuY3Rpb24gKHJlY29yZCkge1xuICAgICAgdGhpcy4kcmVjb3JkID0gcmVjb3JkO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIHJldHVybiBNb2RlbDtcbiAgfTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9pZGJNb2RlbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxiIChtb2R1bGUpIHtcclxuXHJcbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcclxuICBmdW5jdGlvbiBnZXRIb3N0KHVybCkge1xyXG4gICAgbGV0IG0gPSB1cmwubWF0Y2goL14oPzpodHRwcz86KT9cXC9cXC8oW15cXC9dKykvKTtcclxuICAgIHJldHVybiBtID8gbVsxXSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBsZXQgdXJsQmFzZUhvc3QgPSBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICBsZXQgbGJBdXRoID0gZnVuY3Rpb24oKSB7ICduZ0luamVjdCdcclxuICAgIGNvbnN0IHByb3BzID0gWydhY2Nlc3NUb2tlbklkJywgJ2N1cnJlbnRVc2VySWQnLCAncmVtZW1iZXJNZSddO1xyXG4gICAgY29uc3QgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xyXG4gICAgXHJcbiAgICAvLyBOb3RlOiBMb2NhbFN0b3JhZ2UgY29udmVydHMgdGhlIHZhbHVlIHRvIHN0cmluZ1xyXG4gICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxyXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcclxuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAnJztcclxuICAgICAgICBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkKG5hbWUpIHtcclxuICAgICAgY29uc3Qga2V5ID0gcHJvcHNQcmVmaXggKyBuYW1lO1xyXG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxiQXV0aCgpIHsgbGV0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpeltuYW1lXSA9IGxvYWQobmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7IGxldCB0aGl6ID0gdGhpcztcclxuICAgICAgbGV0IHN0b3JhZ2UgPSB0aGl6LnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcclxuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgc2F2ZShzdG9yYWdlLCBuYW1lLCB0aGl6W25hbWVdKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuc2V0VXNlciA9IGZ1bmN0aW9uKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpIHsgbGV0IHRoaXogPSB0aGlzO1xyXG4gICAgICB0aGl6LmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xyXG4gICAgICB0aGl6LmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24oKSB7IGxldCB0aGl6ID0gdGhpcztcclxuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gbnVsbDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlcklkID0gbnVsbDtcclxuICAgICAgdGhpei5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBsYkF1dGgucHJvdG90eXBlLmNsZWFyU3RvcmFnZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICBzYXZlKHNlc3Npb25TdG9yYWdlLCBuYW1lLCBudWxsKTtcclxuICAgICAgICBzYXZlKGxvY2FsU3RvcmFnZSwgbmFtZSwgbnVsbCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbmV3IGxiQXV0aCgpO1xyXG5cclxuICB9O1xyXG5cclxuICBsZXQgbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24oJHEsIGxiQXV0aCkgeyAnbmdJbmplY3QnO1xyXG4gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbihjb25maWcpIHtcclxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV4dGVybmFsIHJlcXVlc3RzXHJcbiAgICAgICAgY29uc3QgaG9zdCA9IGdldEhvc3QoY29uZmlnLnVybCk7XHJcbiAgICAgICAgaWYgKGhvc3QgJiYgaG9zdCAhPT0gdXJsQmFzZUhvc3QpIHtcclxuICAgICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGJBdXRoLmFjY2Vzc1Rva2VuSWQpIHtcclxuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzW2F1dGhIZWFkZXJdID0gbGJBdXRoLmFjY2Vzc1Rva2VuSWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuX19pc0dldEN1cnJlbnRVc2VyX18pIHtcclxuICAgICAgICAgIC8vIFJldHVybiBhIHN0dWIgNDAxIGVycm9yIGZvciBVc2VyLmdldEN1cnJlbnQoKSB3aGVuXHJcbiAgICAgICAgICAvLyB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpblxyXG4gICAgICAgICAgbGV0IHJlcyA9IHtcclxuICAgICAgICAgICAgYm9keTogeyBlcnJvcjogeyBzdGF0dXM6IDQwMSB9fSxcclxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXHJcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiBmdW5jdGlvbigpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgfTtcclxuXHJcbiAgbGV0IGxiUmVzb3VyY2UgPSBmdW5jdGlvbigpIHsgJ25nSW5qZWN0JzsgbGV0IHRoaXogPSB0aGlzO1xyXG5cclxuICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICB1cmxCYXNlOiBcIi9hcGlcIixcclxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nLFxyXG4gICAgfTtcclxuXHJcbiAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyIFRoZSBoZWFkZXIgbmFtZSB0byB1c2UsIGUuZy4gYFgtQWNjZXNzLVRva2VuYFxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25maWd1cmUgdGhlIFJFU1QgdHJhbnNwb3J0IHRvIHVzZSBhIGRpZmZlcmVudCBoZWFkZXIgZm9yIHNlbmRpbmdcclxuICAgICAqIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi4gSXQgaXMgc2VudCBpbiB0aGUgYEF1dGhvcml6YXRpb25gIGhlYWRlclxyXG4gICAgICogYnkgZGVmYXVsdC5cclxuICAgICAqL1xyXG4gICAgdGhpei5zZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24oaGVhZGVyKSB7XHJcbiAgICAgIG9wdGlvbnMuYXV0aEhlYWRlciA9IGhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNnZXRBdXRoSGVhZGVyXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogR2V0IHRoZSBoZWFkZXIgbmFtZSB0aGF0IGlzIHVzZWQgZm9yIHNlbmRpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLlxyXG4gICAgICovXHJcbiAgICB0aGl6LmdldEF1dGhIZWFkZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMuYXV0aEhlYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmdkb2MgbWV0aG9kXHJcbiAgICAgKiBAbmFtZSBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlciNzZXRVcmxCYXNlXHJcbiAgICAgKiBAbWV0aG9kT2YgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB1c2UsIGUuZy4gYC9hcGlgIG9yIGAvL2V4YW1wbGUuY29tL2FwaWAuXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIENoYW5nZSB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIEJ5IGRlZmF1bHQsIHRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0aGl6LnNldFVybEJhc2UgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgb3B0aW9ucy51cmxCYXNlID0gdXJsO1xyXG4gICAgICB1cmxCYXNlSG9zdCA9IGdldEhvc3Qob3B0aW9ucy51cmxCYXNlKSB8fCBsb2NhdGlvbi5ob3N0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI2dldFVybEJhc2VcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBHZXQgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBUaGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xyXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb25zLnVybEJhc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXouJGdldCA9IGZ1bmN0aW9uKCRyZXNvdXJjZSkgeyAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgbGV0IGxiUmVzb3VyY2UgPSBmdW5jdGlvbih1cmwsIHBhcmFtcywgYWN0aW9ucykge1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhhY3Rpb25zKS5tYXAoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgYWN0aW9uc1trZXldLm9yaWdpbmFsVXJsID0gYWN0aW9uc1trZXldLnVybDtcclxuICAgICAgICAgIGFjdGlvbnNba2V5XS51cmwgPSBvcHRpb25zLnVybEJhc2UgKyBhY3Rpb25zW2tleV0udXJsO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgcmVzb3VyY2UgPSAkcmVzb3VyY2Uob3B0aW9ucy51cmxCYXNlICsgdXJsLCBwYXJhbXMsIGFjdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBBbmd1bGFyIGFsd2F5cyBjYWxscyBQT1NUIG9uICRzYXZlKClcclxuICAgICAgICAvLyBUaGlzIGhhY2sgaXMgYmFzZWQgb25cclxuICAgICAgICAvLyBodHRwOi8va2lya2J1c2hlbGwubWUvYW5ndWxhci1qcy11c2luZy1uZy1yZXNvdXJjZS1pbi1hLW1vcmUtcmVzdGZ1bC1tYW5uZXIvXHJcbiAgICAgICAgcmVzb3VyY2UucHJvdG90eXBlLiRzYXZlID0gZnVuY3Rpb24oc3VjY2VzcywgZXJyb3IpIHtcclxuICAgICAgICAgIC8vIEZvcnR1bmF0ZWx5LCBMb29wQmFjayBwcm92aWRlcyBhIGNvbnZlbmllbnQgYHVwc2VydGAgbWV0aG9kXHJcbiAgICAgICAgICAvLyB0aGF0IGV4YWN0bHkgZml0cyBvdXIgbmVlZHMuXHJcbiAgICAgICAgICBsZXQgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcclxuICAgICAgICAgIHJldHVybiByZXN1bHQuJHByb21pc2UgfHwgcmVzdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxiUmVzb3VyY2UuZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XHJcbiAgICAgIH07XHJcbiAgICBcclxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kdWxlXHJcbiAgICAuZmFjdG9yeSgnbGJBdXRoJywgbGJBdXRoKVxyXG4gICAgLnByb3ZpZGVyKCdsYlJlc291cmNlJywgbGJSZXNvdXJjZSlcclxuICAgIC5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpXHJcbiAgICAuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uKCRodHRwUHJvdmlkZXIpIHsgJ25nSW5qZWN0JztcclxuICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnbGJBdXRoUmVxdWVzdEludGVyY2VwdG9yJyk7XHJcbiAgICB9XSlcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXJ2aWNlcy9sYi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGxiO1xuZnVuY3Rpb24gbGIobW9kdWxlKSB7XG5cbiAgLy8gRHZ1ZWx2ZSBlbCBob3N0IGRlIHVuYSBVUkxcbiAgZnVuY3Rpb24gZ2V0SG9zdCh1cmwpIHtcbiAgICB2YXIgbSA9IHVybC5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyhbXlxcL10rKS8pO1xuICAgIHJldHVybiBtID8gbVsxXSA6IG51bGw7XG4gIH1cblxuICB2YXIgdXJsQmFzZUhvc3QgPSBsb2NhdGlvbi5ob3N0O1xuXG4gIHZhciBsYkF1dGggPSBmdW5jdGlvbiBsYkF1dGgoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBwcm9wcyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnXTtcbiAgICB2YXIgcHJvcHNQcmVmaXggPSAnJGlkYi1sYiQnO1xuXG4gICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcbiAgICAvLyBXZSBhcmUgdXNpbmcgZW1wdHkgc3RyaW5nIGFzIGEgbWFya2VyIGZvciBudWxsL3VuZGVmaW5lZCB2YWx1ZXMuXG4gICAgZnVuY3Rpb24gc2F2ZShzdG9yYWdlLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJyc7XG4gICAgICAgIHN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWQobmFtZSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzUHJlZml4ICsgbmFtZTtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Vba2V5XSB8fCBzZXNzaW9uU3RvcmFnZVtrZXldIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGJBdXRoKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuXG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXpbbmFtZV0gPSBsb2FkKG5hbWUpO1xuICAgICAgfSk7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgbGJBdXRoLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdmFyIHN0b3JhZ2UgPSB0aGl6LnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgc2F2ZShzdG9yYWdlLCBuYW1lLCB0aGl6W25hbWVdKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsYkF1dGgucHJvdG90eXBlLnNldFVzZXIgPSBmdW5jdGlvbiAoYWNjZXNzVG9rZW5JZCwgdXNlcklkLCB1c2VyRGF0YSkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IHVzZXJJZDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoaXogPSB0aGlzO1xuICAgICAgdGhpei5hY2Nlc3NUb2tlbklkID0gbnVsbDtcbiAgICAgIHRoaXouY3VycmVudFVzZXJJZCA9IG51bGw7XG4gICAgICB0aGl6LmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgfTtcblxuICAgIGxiQXV0aC5wcm90b3R5cGUuY2xlYXJTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBzYXZlKHNlc3Npb25TdG9yYWdlLCBuYW1lLCBudWxsKTtcbiAgICAgICAgc2F2ZShsb2NhbFN0b3JhZ2UsIG5hbWUsIG51bGwpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgbGJBdXRoKCk7XG4gIH07XG5cbiAgdmFyIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIGxiQXV0aFJlcXVlc3RJbnRlcmNlcHRvcigkcSwgbGJBdXRoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHJldHVybiB7XG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV4dGVybmFsIHJlcXVlc3RzXG4gICAgICAgIHZhciBob3N0ID0gZ2V0SG9zdChjb25maWcudXJsKTtcbiAgICAgICAgaWYgKGhvc3QgJiYgaG9zdCAhPT0gdXJsQmFzZUhvc3QpIHtcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxiQXV0aC5hY2Nlc3NUb2tlbklkKSB7XG4gICAgICAgICAgY29uZmlnLmhlYWRlcnNbYXV0aEhlYWRlcl0gPSBsYkF1dGguYWNjZXNzVG9rZW5JZDtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuX19pc0dldEN1cnJlbnRVc2VyX18pIHtcbiAgICAgICAgICAvLyBSZXR1cm4gYSBzdHViIDQwMSBlcnJvciBmb3IgVXNlci5nZXRDdXJyZW50KCkgd2hlblxuICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIHVzZXIgbG9nZ2VkIGluXG4gICAgICAgICAgdmFyIHJlcyA9IHtcbiAgICAgICAgICAgIGJvZHk6IHsgZXJyb3I6IHsgc3RhdHVzOiA0MDEgfSB9LFxuICAgICAgICAgICAgc3RhdHVzOiA0MDEsXG4gICAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGZ1bmN0aW9uIGhlYWRlcnMoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICB2YXIgbGJSZXNvdXJjZSA9IGZ1bmN0aW9uIGxiUmVzb3VyY2UoKSB7XG4gICAgJ25nSW5qZWN0JztcbiAgICB2YXIgdGhpeiA9IHRoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHVybEJhc2U6IFwiL2FwaVwiLFxuICAgICAgYXV0aEhlYWRlcjogJ2F1dGhvcml6YXRpb24nXG4gICAgfTtcblxuICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG5cbiAgICAvKipcclxuICAgICAqIEBuZ2RvYyBtZXRob2RcclxuICAgICAqIEBuYW1lIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyI3NldEF1dGhIZWFkZXJcclxuICAgICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLmxiUmVzb3VyY2VQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlciBUaGUgaGVhZGVyIG5hbWUgdG8gdXNlLCBlLmcuIGBYLUFjY2Vzcy1Ub2tlbmBcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ29uZmlndXJlIHRoZSBSRVNUIHRyYW5zcG9ydCB0byB1c2UgYSBkaWZmZXJlbnQgaGVhZGVyIGZvciBzZW5kaW5nXHJcbiAgICAgKiB0aGUgYXV0aGVudGljYXRpb24gdG9rZW4uIEl0IGlzIHNlbnQgaW4gdGhlIGBBdXRob3JpemF0aW9uYCBoZWFkZXJcclxuICAgICAqIGJ5IGRlZmF1bHQuXHJcbiAgICAgKi9cbiAgICB0aGl6LnNldEF1dGhIZWFkZXIgPSBmdW5jdGlvbiAoaGVhZGVyKSB7XG4gICAgICBvcHRpb25zLmF1dGhIZWFkZXIgPSBoZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0QXV0aEhlYWRlclxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgaGVhZGVyIG5hbWUgdGhhdCBpcyB1c2VkIGZvciBzZW5kaW5nIHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlbi5cclxuICAgICAqL1xuICAgIHRoaXouZ2V0QXV0aEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmF1dGhIZWFkZXI7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjc2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdXNlLCBlLmcuIGAvYXBpYCBvciBgLy9leGFtcGxlLmNvbS9hcGlgLlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDaGFuZ2UgdGhlIFVSTCBvZiB0aGUgUkVTVCBBUEkgc2VydmVyLiBCeSBkZWZhdWx0LCB0aGUgVVJMIHByb3ZpZGVkXHJcbiAgICAgKiB0byB0aGUgY29kZSBnZW5lcmF0b3IgKGBsYi1uZ2Agb3IgYGdydW50LWxvb3BiYWNrLXNkay1hbmd1bGFyYCkgaXMgdXNlZC5cclxuICAgICAqL1xuICAgIHRoaXouc2V0VXJsQmFzZSA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgIG9wdGlvbnMudXJsQmFzZSA9IHVybDtcbiAgICAgIHVybEJhc2VIb3N0ID0gZ2V0SG9zdChvcHRpb25zLnVybEJhc2UpIHx8IGxvY2F0aW9uLmhvc3Q7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQG5nZG9jIG1ldGhvZFxyXG4gICAgICogQG5hbWUgbGJTZXJ2aWNlcy5sYlJlc291cmNlUHJvdmlkZXIjZ2V0VXJsQmFzZVxyXG4gICAgICogQG1ldGhvZE9mIGxiU2VydmljZXMubGJSZXNvdXJjZVByb3ZpZGVyXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEdldCB0aGUgVVJMIG9mIHRoZSBSRVNUIEFQSSBzZXJ2ZXIuIFRoZSBVUkwgcHJvdmlkZWRcclxuICAgICAqIHRvIHRoZSBjb2RlIGdlbmVyYXRvciAoYGxiLW5nYCBvciBgZ3J1bnQtbG9vcGJhY2stc2RrLWFuZ3VsYXJgKSBpcyB1c2VkLlxyXG4gICAgICovXG4gICAgdGhpei5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMudXJsQmFzZTtcbiAgICB9O1xuXG4gICAgdGhpei4kZ2V0ID0gZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xuICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgdmFyIGxiUmVzb3VyY2UgPSBmdW5jdGlvbiBsYlJlc291cmNlKHVybCwgcGFyYW1zLCBhY3Rpb25zKSB7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoYWN0aW9ucykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICBhY3Rpb25zW2tleV0ub3JpZ2luYWxVcmwgPSBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICAgIGFjdGlvbnNba2V5XS51cmwgPSBvcHRpb25zLnVybEJhc2UgKyBhY3Rpb25zW2tleV0udXJsO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSAkcmVzb3VyY2Uob3B0aW9ucy51cmxCYXNlICsgdXJsLCBwYXJhbXMsIGFjdGlvbnMpO1xuXG4gICAgICAgIC8vIEFuZ3VsYXIgYWx3YXlzIGNhbGxzIFBPU1Qgb24gJHNhdmUoKVxuICAgICAgICAvLyBUaGlzIGhhY2sgaXMgYmFzZWQgb25cbiAgICAgICAgLy8gaHR0cDovL2tpcmtidXNoZWxsLm1lL2FuZ3VsYXItanMtdXNpbmctbmctcmVzb3VyY2UtaW4tYS1tb3JlLXJlc3RmdWwtbWFubmVyL1xuICAgICAgICByZXNvdXJjZS5wcm90b3R5cGUuJHNhdmUgPSBmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAvLyBGb3J0dW5hdGVseSwgTG9vcEJhY2sgcHJvdmlkZXMgYSBjb252ZW5pZW50IGB1cHNlcnRgIG1ldGhvZFxuICAgICAgICAgIC8vIHRoYXQgZXhhY3RseSBmaXRzIG91ciBuZWVkcy5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzb3VyY2UudXBzZXJ0LmNhbGwodGhpcywge30sIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LiRwcm9taXNlIHx8IHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRVcmxCYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy51cmxCYXNlO1xuICAgICAgfTtcblxuICAgICAgbGJSZXNvdXJjZS5nZXRBdXRoSGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5hdXRoSGVhZGVyO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGxiUmVzb3VyY2U7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gbW9kdWxlLmZhY3RvcnkoJ2xiQXV0aCcsIGxiQXV0aCkucHJvdmlkZXIoJ2xiUmVzb3VyY2UnLCBsYlJlc291cmNlKS5mYWN0b3J5KCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InLCBsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3IpLmNvbmZpZyhbJyRodHRwUHJvdmlkZXInLCBmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdsYkF1dGhSZXF1ZXN0SW50ZXJjZXB0b3InKTtcbiAgfV0pO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZpY2VzL2xiLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==