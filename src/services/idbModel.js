'use strict';

// Funcion para el servicio de la BD
export default function idbModelService ($log, qs, idbUtils, lbResource, $timeout) { 'ngInject';

  return function idbModel ($db, $modelName, $socket) {
    idbUtils.validate(arguments, [null ,'string']);

    // Clave del modelo
    let $id = { keyPath: 'id', autoIncrement: true };
    let $fields = {};
    let $instances = {};
    let $remote = null;

    // Constuctor del modelo
    function Model(data, stored) {
      idbUtils.validate(arguments, [['object', 'undefined'] ,'boolean']);

      this.$isNew = true;
      this.$record = null;
      this.$originalValues = {};
      this.$stored = stored;
      
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
      idbUtils.validate(arguments, ['object', 'string', 'function']);

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
    Model.getInstance = function (key, data) {

      // El objeto no tiene ID
      if (!key) {
        return new Model(data);
      }

      // No existe la instancia entonce se crea
      if (!$instances[key]){
        $instances[key] = new Model(data, true);
      }
      
      return $instances[key];
    };

    // Crea una instancia del modelo a partir de un object
    Model.getInstanceFromObject = function (data) {
      idbUtils.validate(arguments, ['object']);

      let record = Model.getInstance(Model.getKeyFrom(data), data);
      return record;

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
      idbUtils.validate(arguments, ['object']);
      
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

    // Asigna in valor a un campo
    Model.prototype.set = function (field, value, original) { const thiz = this;

      Model.searchDeepField(thiz.$originalValues, field, function (obj, lastField) {
        obj[lastField] = value;
      });
      Model.searchDeepField(thiz, field, function (obj, lastField) {
        obj[lastField] = value;
      });
      return thiz;
    };

    // Obtiene los valores reales actuales para guardar en el store
    Model.prototype.values = function () { const thiz = this;
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
    Model.prototype.create = function (cb){ const thiz = this;
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

    // Funcion que hace escuchars los mensajes del socket para el model
    Model.prototype.listen = function () { const thiz = this;
      if (!$socket) throw new Error('Model.DoesNotHaveSocketInstance');

      $socket.subscribe({
        modelName: $modelName,
        eventName: 'update',
        modelId: thiz.get(Model.getKeyPath()),
      }, function (data) {
        $timeout(function () {
          thiz.setAttributes(data || {}, true);
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
