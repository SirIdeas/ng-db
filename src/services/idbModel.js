'use strict';

// Funcion para el servicio de la BD
export default function idbModel (qs, idbUtils, lbResource) { 'ngInject';

  return function idbModel(db, modelName) { let thiz = this;
    idbUtils.validate(arguments, [null ,'string']);

    // Clave del modelo
    let id = { keyPath: 'id', autoIncrement: true };
    let instances = {};
    let remote = null

    // Constuctor del modelo
    function Model(data) {
      this.setAttributes(data);
      this.constructor(data);
    };

    // Asigna el ID al modelo
    Model.id = function (pId) {
      idbUtils.validate(arguments, ['object']);
      id = pId;
      return Model;
    };

    // Crea el objecto storage para el modelo.
    Model.createStore = function () {
      db.createStore(modelName, id);
      return Model;
    };

    // Agrega un index
    Model.index = function (indexName, fieldName, opts) {
      db.createIndex(modelName, indexName, fieldName, opts);
      return Model;
    };

    // Método que permite modificar model.
    Model.build = function (buildCallback) {
      idbUtils.validate(arguments, ['function']);
      buildCallback(Model);
      return Model;
    };

    // Configura el remote api;
    Model.remote = function (url, args, actions) {
      idbUtils.validate(arguments, ['string', 'object', 'object']);
      Model._remote = lbResource(url, args, actions);
      return Model;
    };

    // Crea nuevas instancias de los modelos
    Model.create = function (data, cb) {
      idbUtils.validate(arguments, ['object', ['function', 'undefined']]);

      // Si es un array
      if (data.length === undefined) {
        let record = Model.get(data);
        return record.create(cb);
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

    // Devuelve la instancia del model de las guardadas. Si no existe entonce
    // se crea
    Model.get = function (obj) {
      idbUtils.validate(arguments, ['object']);

      // Obtener el key del objeto
      let key = Model.searchDeepField(obj, id.keyPath, function (obj, lastField) {
        return obj[lastField];
      });

      // El objeto no tiene ID
      if (!key) 
        return new Model(obj);

      // No existe la instancia entonce se crea
      if (!instances[key])
        instances[key] = new Model(obj);
      
      return instances[key];
    };

    // Buscar en el modelo
    Model.find = function (scope, cb) {
      let args = Array.prototype.slice.call(arguments);
      cb = args.pop(); scope = args.pop();
      return db.find(Model, modelName, scope, cb);
    };

    // Asigna los atributos
    Model.prototype.setAttributes = function (data) { let thiz = this;
      idbUtils.validate(arguments, ['object']);
      
      Object.keys(data).map(function (property) {
        thiz.set(property, data[property]);
      });

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

    // Consturctor que se puede sobre escribir
    Model.prototype.constructor = function (data) {
    };

    // Guarda los datos del objeto
    Model.prototype.create = function (cb){ let thiz = this;
      return db.create(modelName, this, function (err, event) {
        if (err) { if (cb) cb(err); return; };

        // Asignar el generado al modelo
        thiz.set(id.keyPath, event.target.result)

        // Guardar la instancia en la colecion de instancias
        instances[thiz.get(id.keyPath)] = thiz;

        if (cb) cb.apply(null, [null].concat(Array.prototype.slice.call(arguments)));

      });
    };

    return Model;

  };

}
