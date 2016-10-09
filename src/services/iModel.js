'use strict';

// Funcion para el servicio de la BD
export default function iModelService ($qs, $ngDbUtils) { 'ngInject';

  return function $iModel($db, $modelName) { let thiz = this;

    // Clave del modelo
    let $id = { keyPath: 'id', autoIncrement: true };
    let $instances = {};

    // Constuctor del modelo
    function $Model() {
      this.$constructor.apply(this, arguments);
    };

    // Asigna los atributos
    $Model.prototype.$setAttributes = function (data) { let thiz = this;
      $ngDbUtils.validate(arguments, ['object']);
      
      Object.keys(data).map(function (property) {
        thiz[property] = data[property];
      });

    };

    // Consturctor que se puede sobre escribir
    $Model.prototype.$constructor = function (data) {
    };

    // Asigna el ID al modelo
    $Model.$id = function ($pIid) {
      $id = $pIid
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
        let $record = new $Model(data);
        return $record.$create(cb);
      }
        
      // Obtener una copia del array
      let arr = Array.prototype.slice.call(data);
      let result = [];
      let defered = $qs.defer(cb);

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
    $Model.prototype.$create = function (cb){
      return $db.$create($modelName, this, cb);
    };

    return $Model;

  };

}
