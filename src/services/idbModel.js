'use strict';

// Funcion para el servicio de la BD
export default function idbModel (qs, idbUtils, lbResource) { 'ngInject';

  return function idbModel($db, $modelName) { let thiz = this;
    idbUtils.validate(arguments, [null ,'string']);

    // Clave del modelo
    let $id = { keyPath: 'id', autoIncrement: true };
    let $fields = {};
    let $instances = {};
    let $remote = null;

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
        return Model.getInstanceFromObject(record)
          .create(cb);
      }
        
      // Obtener una copia del array
      let arr = Array.prototype.slice.call(data);
      let result = [];
      let defered = qs.defer(cb);

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

      let fields = field.split('.');
      let lastField = fields.pop();

      return (function _set(obj) {
        if (fields.length == 0)
          return cb(obj, lastField);
        let field = fields.shift();
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
    Model.getInstance = function (key) {

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

    // Crea una instancia del modelo a partir de un object
    Model.getInstanceFromObject = function (data) {
      idbUtils.validate(arguments, ['object']);

      let record = Model.getInstance(Model.getKeyFrom(data));
      record.setAttributes(data);
      return record;

    };

    // Busca un registro en la objectStore del modelo.
    Model.get = function (key, cb) {

      return $db.get(Model, $modelName, key, cb);

    };

    // Buscar en el modelo
    Model.find = function (scope, cb) {
      let args = Array.prototype.slice.call(arguments);
      cb = args.pop(); scope = args.pop();
      if ($remote) {
        // Buscar los registros en la API
        $remote.find(scope, cb).$promise
          .then(function (result) {
            result.map(function (record, idx) {

              Model.get(Model.getKeyFrom(record)).$promise
                .then(function (instance) {
                  instance
                    .setAttributes(record)
                    .resource(record);
                  if (instance.$isNew){
                    instance.create();
                  }
                });

            });
          })
          .catch(function (err) {
            console.log(['err', err])
          });
      }
      return $db.find(Model, $modelName, scope, cb);
    };

    // Asigna los atributos
    Model.prototype.setAttributes = function (data) { let thiz = this;
      idbUtils.validate(arguments, ['object']);
      
      Object.keys(data).map(function (property) {
        thiz.set(property, data[property]);
      });

      return thiz;

    };

    // Devuelve el valor de una propiedad
    Model.prototype.get = function (field) { let thiz = this;
      return Model.searchDeepField(thiz, field, function (obj, lastField) {
        return obj[lastField];
      });
    };

    // Asigna in valor a un campo
    Model.prototype.set = function (field, value) { let thiz = this;
      return Model.searchDeepField(thiz, field, function (obj, lastField) {
        obj[lastField] = value;
        return thiz;
      });
    };

    // Obtiene los valores reales actuales para guardar en el store
    Model.prototype.values = function () { let thiz = this;
      let values = {};

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

    // Guarda los datos del objeto
    Model.prototype.create = function (cb){ let thiz = this;
      return $db.create($modelName, this, function (err, event) {
        if (err) { if (cb) cb(err); return; };

        // Asignar el generado al modelo
        thiz.set($id.keyPath, event.target.result);
        thiz.$isNew = false;

        // Si la instancia creada no concuerda con la guardada
        if ($instances[thiz.get($id.keyPath)]) {
          if ($instances[thiz.get($id.keyPath)] !== thiz){
            throw new Error('idbModel.TwoInstancesWithSameKey');
          }
        }else {
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
