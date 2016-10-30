'use strict';

// Funcion para el servicio de la BD
export default function idbModelService ($log, qs, idbUtils, idbQuery, idbEvents, lbResource, $timeout) { 'ngInject';

  // Buscar un campo
    const searchDeepField = function (obj, field, cb) {
      idbUtils.validate(arguments, ['object', 'string', 'function']);

      const fields = field.split('.');
      const lastField = fields.pop();

      return (function _set(obj) {
        if (fields.length == 0)
          return cb(obj, lastField);
        const field = fields.shift();
        if (typeof obj[field] === 'undefined')
          obj[field] = {};
        return _set(obj[field]);
      })(obj);

    };

    // Obtiene el valor pa una propieda de un objeto
    const getFieldValue = function (obj, field) {
      return searchDeepField(obj, field, function (obj, lastField) {
        return obj[lastField];
      });
    };

    // Obtiene el valor pa una propieda de un objeto
    const setFieldValue = function (obj, field, value) {
      searchDeepField(obj, field, function (obj, lastField) {
        obj[lastField] = value;
      });
      return obj;
    };

  return function idbModel ($db, $modelName, $socket) {
    idbUtils.validate(arguments, [null ,'string']);

    // Clave del modelo
    const $id = { keyPath: 'id', autoIncrement: true };
    const $eventsHandlers = {};
    const $instances = {};
    let $fields = {};
    let $remote = null;
    let $versioning = null;

    // Constuctor del modelo
    function Model(data) { const thiz = this;
      idbUtils.validate(arguments, [['object', 'undefined']]);

      thiz.$resolved = false;

      thiz.$loaded = false;
      thiz.$localLoaded = false;
      thiz.$remoteLoaded = false;
      
      thiz.$localValues = {};
      thiz.$remoteValues = {};

      thiz.$version = null;
      thiz.$localVersion = null;
      thiz.$remoteVersion = null;

      thiz.$eventsHandlers = {};
      
      if (data){
        thiz.$setValues(data);
      }

      thiz.$constructor(data);

      if ($socket) {
        thiz.$listen();
      }

      const $results = [];

      thiz
        
        // Cuando sea consultado agregar la consulta
        .$bind(idbEvents.MODEL_QUERIED, function (result) {
          $results.push(result);
        })

        // Cuando sea liberado de la consultar quitar de las consultas
        .$bind(idbEvents.MODEL_UNQUERIED, function (result) {
          const idx = $results.indexOf(result);
          if (idx != -1){
            $results.splice(idx, 1);
          }
        })

        // Evento de que modelo está instanciado
        .$emit(idbEvents.MODEL_INSTANCED);

    };

    // Devuelv el nombre del modelo
      Model.getModelName = function () {

        return $modelName;

      };

      // Asigna el ID al modelo
      Model.autoIncrement = function (autoIncrement) {
        idbUtils.validate(arguments, ['boolean']);

        $id.autoIncrement = autoIncrement;
        return Model;

      };

      // Asigna el ID al modelo
      Model.keyPath = function (keyPath) {
        idbUtils.validate(arguments, ['string']);

        $id.keyPath = keyPath;
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
          let field = fields[fieldName];
          if (typeof fields[fieldName] == 'string'){
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

      // Devuelve la instancia del $remote del modelo
      Model.getRemote = function () {

        return $remote;

      };

      // Devuelve el valor correspondiente al key de un objeto
      Model.getKeyFrom = function (data) {
        return getFieldValue(data, $id.keyPath);
      };

      // Devuelve la instancia del model de las guardadas. Si no existe entonce
      // se crea
      Model.getInstance = function (key) {
        idbUtils.validate(arguments, [['string', 'number', 'undefined']]);

        // El objeto no tiene ID
        if (!key) {
          return new Model();
        }

        // No existe la instancia entonce se crea
        if (!$instances[key]){
          $instances[key] = new Model();
        }
        
        return $instances[key];

      };

    // Busca un registro en la objectStore del modelo.
    Model.get = function (key) {

      const instance = Model.getInstance(key);

      if (instance.$localLoaded) return instance;
      
      const defered = qs.defer();
      
      instance.$resolved = false;
      instance.$promise = defered.promise;

      $db.get($modelName, key).promise.then(function (data) {
        instance.$resolved = true;

        Model.getVersionOf(key).promise
          .then(function (version) {
            instance.$setLocalValues(data, data && version? version.hash : undefined);
            defered.resolve(instance);
          })
          .catch(function (err) {
            defered.resolve(instance);
            $log.error(['Model.getVersionOf any error', err])
          });

      })
      .catch(function (err) {
        defered.reject(err);
      });
      
      return instance;

    };

    // Buscar en el modelo
    Model.find = function (filters) {

      return new idbQuery($db, Model, filters);;

    };

    // Crea nuevas instancias de los modelos
    Model.create = function (data) {
      idbUtils.validate(arguments, ['object', ['function', 'undefined']]);

      // Si es un array
      if (data.length === undefined) {
        const record = Model.getInstance(Model.getKeyFrom(data));

        if (record.$loaded) {
          throw new Error('Model.CantCreatedLoadedInstance');
        }

        return record.$pull();

      }
        
      // Obtener una copia del array
      const arr = Array.prototype.slice.call(data);
      const result = [];
      const defered = qs.defer(cb);

      (function iteration() {
                
        // No quedan elementos en el array
        if (arr.length == 0) return defered.resolve(result);

        // Crear el siguiente elemento
        Model.create(arr.shift())
          .then(function (instance) {
            result.push(instance);
            iteration();
          })
          .catch(function (err) {
            defered.reject(err);
          });

      })();

      // Devolver el promise
      return defered;

    };

    // Crea un modelo para guardar las versiones del modelo actual
    Model.versioning = function (modelName, cb) {
      if (typeof modelName === 'function') {
        cb = modelName;
        modelName = undefined;
      }
      idbUtils.validate([modelName, cb], [['string', 'undefined'], ['function', 'undefined']]);

      if (!$versioning) {

        // Si el model no tiene nombre se agrega
        if (!modelName){
          modelName = $modelName+'_versioning';
        }

        // Crear modelo para el manejo de datos
        $versioning = $db.model(modelName)
          .autoIncrement(false)
          .keyPath($id.keyPath)
          .fields({
            "hash": { "type": "string", "required": true },
          });

      }

      if (cb) cb($versioning);

      return Model;

    };

    // Devuelve la instancia de la version local del registro
    Model.getVersionOf = function (key) { 

      const defered = qs.defer();

      if ($versioning) {
        $versioning.get(key).$promise
          .then(function (version) {
            defered.resolve(version);
          })
          .catch(function () {
            defered.reject(null);
          });
      } else {
        defered.resolve(null);
      }

      return defered;

    };

    // Agrega un mandejador de eventos al modelo
      Model.bind = function (eventName, handler) {
        idbUtils.validate(arguments, ['string', ['function', 'undefined']]);

        if (!$eventsHandlers[eventName]) {
          $eventsHandlers[eventName] = [];
        }

        $eventsHandlers[eventName].push(handler);

        return Model;

      };

      // Dispara un evento del model
      Model.emit = function (eventName, args) {
        idbUtils.validate(arguments, ['string', ['undefined', 'array']]);

        if ($eventsHandlers[eventName]) {
          $eventsHandlers[eventName].map(function (cb) {
            cb.apply(Model, args || []);
          });
        }

        return Model;

      };

    // Devuelve el valor de una propiedad
      Model.prototype.$get = function (field) {

        return getFieldValue(this, field);

      };

      // Asigna in valor a un campo
      Model.prototype.$set = function (field, value) {

        return getFieldValue(this, field, value);

      };

      // Devuelve un objeto con las propiedades del registro
      Model.prototype.$getValues = function (data) {
        idbUtils.validate(arguments, [['object', 'undefined']]);

        const values = {};
        data = data || this;

        Object.keys($fields).map(function (field) {
          setFieldValue(values, field, getFieldValue(data, field));
        });

        return values;

      };

      // Devuelve un objeto con las propiedades locales del registro
      Model.prototype.$getLocalValues = function () {

        return this.$getValues(this.$localValues);

      };

      // Devuelve un modelo con las propiedades remotas del registro
      Model.prototype.$getRemoteValues = function () {

        return this.$getValues(this.$remoteValues);

      };

      // Asigna las propiedades del registro
      Model.prototype.$setValues = function (data, version) { const thiz = this;
        idbUtils.validate(arguments, ['object', ['string', 'undefined']]);
        
        thiz.$version = version;

        Object.keys(data).map(function (field) {
          setFieldValue(thiz, field, data[field]);
        });

        thiz.$loaded = true;

        return thiz;

      };

      // Asigna las propiedades locales del registro
      Model.prototype.$setLocalValues = function (data, version) { const thiz = this;
        idbUtils.validate(arguments, [['object', 'undefined'], ['string', 'undefined']]);
        
        thiz.$localVersion = version;

        Object.keys(data || {}).map(function (field) {
          setFieldValue(thiz.$localValues, field, data[field]);
        });

        if (data) {
          thiz.$localLoaded = true;
          if (!thiz.$loaded) {
            thiz.$setValues(data, version);
          }
        }


        return thiz;

      };

      // Asigna las propiedades remotas del registro
      Model.prototype.$setRemoteValues = function (data, version) { const thiz = this;
        idbUtils.validate(arguments, [['object', 'undefined'], ['string', 'undefined']]);
        
        thiz.$remoteVersion = version;

        Object.keys(data || {}).map(function (field) {
          setFieldValue(thiz.$remoteValues, field, data[field]);
        });

        if (data) {
          thiz.$remoteLoaded = true;
          if (!thiz.$loaded) {
            thiz.$setValues(data, version);
          }
        }

        return thiz;

      };

    // Asigna el ID del objeto
    Model.prototype.$setKey = function (newKey) {
      
      const oldKey = Model.getKeyFrom(this);

      Model.searchDeepField(this, $id.keyPath, function (obj, lastField) {
        obj[lastField] = newKey;
      });

      if (oldKey !== newKey) {

        if (oldKey && $instances[oldKey] && $instances[oldKey] != this) {
          throw new Error('Model.InstanceOfOldKeyIsNotSame');
        }
        if (newKey && $instances[newKey] && $instances[newKey] != this) {
          throw new Error('Model.InstanceOfNewKeyIsNotSame');
        }

        // Eliminar anterior
        if (oldKey && $instances[oldKey]) {
          delete $instances[oldKey];
        }

        // Agregar nueva
        if (newKey && !$instances[newKey]) {
          $instances[newKey] = this;
        }

      }

      return this;

    }

    // Consturctor que se puede sobre escribir
    Model.prototype.$constructor = function (data) {
    };

    // Guarda los datos del objeto
    Model.prototype.$pull = function (newValues, version){ const thiz = this;
      idbUtils.validate(arguments, [['object', 'undefined'], ['string', 'undefined']]);
      
      const defered = qs.defer();

      if (newValues) {
        newValues = thiz.$getValues(newValues);
      } else {
        newValues = thiz.$getRemoteValues();
      }

      const newKey = Model.getKeyFrom(newValues);
      const oldValues = thiz.$getLocalValues();
      const oldKey = Model.getKeyFrom(oldValues);

      console.log(newKey, oldKey);
      console.log(newValues, oldValues);

      return defered;

    };

    // Funcion que hace escuchars los mensajes del socket para el model
      Model.prototype.$listen = function () { const thiz = this;
        if (!$socket) throw new Error('Model.DoesNotHaveSocketInstance');

        // Crear una subscripcion al socket para cuando se reciban datos
        // para la instancia actual
        $socket.subscribe({
          modelName: $modelName,
          eventName: 'update',
          modelId: thiz.$get($id.keyPath),
        }, function (data) {

          // A recibir datos del socket asignar los valores
          $timeout(function () {
            // Emitir evento de datos recibidor para el modelo
            thiz.$setRemoteValues(data.values, data.version);
          });

        });

      };

    // Agrega un mandejador de eventos
      Model.prototype.$bind = function (eventName, handler) {
        idbUtils.validate(arguments, ['string', ['function', 'undefined']]);

        if (!this.$eventsHandlers[eventName]) {
          this.$eventsHandlers[eventName] = [];
        }

        this.$eventsHandlers[eventName].push(handler);

        return this;

      };

      // Dispara un evento
      Model.prototype.$emit = function (eventName, args) { const thiz = this;
        idbUtils.validate(arguments, ['string', ['undefined', 'array']]);

        // Llamar el evento para el modelo
        Model.emit(eventName, [thiz, [].concat([thiz]).concat(args)]);

        if (thiz.$eventsHandlers[eventName]) {
          thiz.$eventsHandlers[eventName].map(function (cb) {
            cb.apply(thiz, args || []);
          });
        }

        return thiz;

      };

      Model.$instances = $instances;

    return Model;

  };

}
