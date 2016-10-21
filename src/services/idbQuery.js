'use strict';

// Funcion para el servicio de la BD
export default function idbQuery ($log, idbUtils) { 'ngInject';
  
  return function idbQuery($db, $Model, $filters) { const thiz = this;
    idbUtils.validate(arguments, ['object', 'function', ['object', 'undefined']]);

    let $result = null;
    let $remoteResult = [];

    // Funcion que devuelve ejecuta el query y devuelve el resultado.
    thiz.getResult = function (cb) {
      idbUtils.validate(arguments, [['function', 'undefined']]);

      // Ejecutar si no se ha ejecutado
      if (!$result)
        $result = $db.find($Model, $filters, cb);
      return $result;

    }

  }

}