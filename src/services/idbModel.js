'use strict';

// Funcion para el servicio de la BD
export default function idbModelService ($log, qs, idbUtils, lbResource, $timeout) { 'ngInject';

  return function idbModel ($db, $modelName, $socket) {
    idbUtils.validate(arguments, [null ,'string']);

    // Clave del modelo
    const $id = { keyPath: 'id', autoIncrement: true };
    const $instances = {};
    let $fields = {};
    let $remote = null;

    // Constuctor del modelo
    function Model(data) {
      idbUtils.validate(arguments, [['object', 'undefined']]);

      this.$record = null;
      this.$originalValues = {};
      
      this.setAttributes(data || {}, true);
      this.constructor(data);

      if ($socket) {
        this.listen();
      }
      
    };

    // Devuelv el nombre del modelo
    Model.getModelName = function () {

      return $modelName;

    };

    // Devuelv el nombre del modelo
    Model.getKeyPath = function () {

      return $id.keyPath;

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

    // Crea nuevas instancias de los modelos
    Model.create = function (data, cb) {
      idbUtils.validate(arguments, ['object', ['function', 'undefined']]);

      // Si es un array
      if (data.length === undefined) {
        return Model.getInstanceFromObject(data, null)
          .save(cb);
      }
        
      // Obtener una copia del array
      const arr = Array.prototype.slice.call(data);
      const result = [];
      const defered = qs.defer(cb);

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

    // Devuelve el valor correspondiente al key de un objeto
    Model.getKeyFrom = function (data) {
      return Model.searchDeepField(data, $id.keyPath, function (obj, lastField) {
        return obj[lastField];
      });
    };

    // Devuelve la instancia del model de las guardadas. Si no existe entonce
    // se crea
    Model.getInstance = function (key, data) {
      idbUtils.validate(arguments, [['string', 'number', 'undefined'], ['object', 'undefined']]);

      // El objeto no tiene ID
      if (!key) {
        return new Model(data);
      }

      // No existe la instancia entonce se crea
      if (!$instances[key]){
        $instances[key] = new Model(data);
      }
      
      return $instances[key];
    };

    // Crea una instancia del modelo a partir de un object
    Model.getInstanceFromObject = function (data) {
      idbUtils.validate(arguments, ['object']);

      return Model.getInstance(Model.getKeyFrom(data), data);

    };

    // Busca un registro en la objectStore del modelo.
    Model.get = function (key, cb) {

      return $db.get(Model, key, cb);

    };

    // Buscar en el modelo
    Model.find = function (filters) {
      // let args = Array.prototype.slice.call(arguments);
      // cb = args.pop(); filters = args.pop();
      // if ($remote) {
      //   // Buscar los registros en la API
      //   $remote.find(filters, cb).$promise
      //     .then(function (result) {
      //       result.map(function (record, idx) {

      //         Model.get(Model.getKeyFrom(record)).$promise
      //           .then(function (instance) {
      //             instance
      //               .setAttributes(record)
      //               .resource(record);
      //             if (instance.$isNew){
      //               instance.create();
      //             }
      //           });

      //       });
      //     })
      //     .catch(function (err) {
      //       console.log(['err', err])
      //     });
      // }
      return $db.query(Model, filters);

    };

    // Asigna los atributos
    Model.prototype.setAttributes = function (data, original) { const thiz = this;
      idbUtils.validate(arguments, ['object', 'boolean']);
      
      Object.keys(data).map(function (property) {
        thiz.set(property, data[property], original);
      });

      return thiz;

    };

    // Devuelve el valor de una propiedad
    Model.prototype.get = function (field) { const thiz = this;

      return Model.searchDeepField(thiz, field, function (obj, lastField) {
        return obj[lastField];
      });

    };

    // Asigna el ID del objeto
    Model.prototype.setKey = function (newKey) { const thiz = this;
      
      const oldKey = Model.getKeyFrom(thiz);

      Model.searchDeepField(thiz, $id.keyPath, function (obj, lastField) {
        obj[lastField] = newKey;
      });

      if (oldKey !== newKey) {

        if (oldKey && $instances[oldKey] && $instances[oldKey] != thiz) {
          throw new Error('Model.InstanceOfOldKeyIsNotSame');
        }
        if (newKey && $instances[newKey] && $instances[newKey] != thiz) {
          throw new Error('Model.InstanceOfNewKeyIsNotSame');
        }

        // Eliminar anterior
        if (oldKey && $instances[oldKey]) {
          delete $instances[oldKey];
        }

        // Agregar nueva
        if (newKey && !$instances[newKey]) {
          $instances[newKey] = thiz;
        }

      }

      return thiz;

    }

    // Asigna in valor a un campo
    Model.prototype.set = function (field, value, original) { const thiz = this;
      idbUtils.validate(arguments, ['string', null, 'boolean']);

      if (field === $id.keyPath){
        thiz.setKey(value);
      } else {
        Model.searchDeepField(thiz, field, function (obj, lastField) {
          obj[lastField] = value;
        });
      }

      if (original) {
        Model.searchDeepField(thiz.$originalValues, field, function (obj, lastField) {
          obj[lastField] = value;
        });
      }

      return thiz;
    };

    // Obtiene los valores reales actuales para guardar en el store
    Model.prototype.values = function () { const thiz = this;
      const values = {};

      Object.keys($fields).map(function (field) {
        Model.searchDeepField(values, field, function (obj, lastField) {
          obj[lastField] = thiz.get(field);
        });
      });

      return values;

    };

    // Consturctor que se puede sobre escribir
    Model.prototype.constructor = function (data) {
    };

    // Devuelve si el objeto está almacenado
    Model.prototype.isStored = function () {

      return $instances[this.get($id.keyPath)] === this;

    };

    // Guarda los datos del objeto
    Model.prototype.save = function (cb){ const thiz = this;
      idbUtils.validate(arguments, ['function', 'undefined']);

      return $db.put($modelName, this, function (err, event) {
        if (err) { if (cb) cb(err); return; };

        // Asignar el generado al modelo
        const key = event.target.result;
        thiz.setKey(key);
        thiz.$isNew = false;

        if (cb) cb.apply(null, [null].concat(Array.prototype.slice.call(arguments)));

      });
    };

    // Funcion que hace escuchars los mensajes del socket para el model
    Model.prototype.listen = function () { const thiz = this;
      if (!$socket) throw new Error('Model.DoesNotHaveSocketInstance');

      $socket.subscribe({
        modelName: $modelName,
        eventName: 'update',
        modelId: thiz.get(Model.getKeyPath()),
      }, function (data) {
        thiz.setAttributes(data || {}, true);
        $timeout(function () {
          thiz.save();
        });
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
