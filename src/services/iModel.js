'use strict';

export default function iModelServiceFactory(ng) {
  // Funcion para el servicio de la BD
  return function iModelService () { 'ngInject';

    return function $iModel($db, $modelName) { let self = this;

      // Clave del modelo
      let $id = { keyPath: 'id', autoIncrement: true };

      // Constuctor del modelo
      function $Model() {
        this.$constructor.apply(this, arguments);
      };

      // Consturctor que se puede sobre escribir
      $Model.prototype.$constructor = function () {
      };

      // Asigna el ID al modelo
      $Model.$id = function ($pIid) {
        $id = $pIid

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


  }
}