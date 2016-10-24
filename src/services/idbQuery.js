'use strict';

// Funcion para el servicio de la BD
export default function idbQuery ($log, idbUtils, idbEvents) { 'ngInject';
  
  return function idbQuery($db, $Model, $filters) { const thiz = this;
    idbUtils.validate(arguments, ['object', 'function', ['object', 'undefined']]);

    let $result = null;

    // Funcion que devuelve ejecuta el query y devuelve el resultado.
    thiz.getResult = function (cb) { const thiz = this;
      idbUtils.validate(arguments, [['function', 'undefined']]);

      // Ejecutar si no se ha ejecutado
      if (!$result) {
        $result = $db.find($Model, $filters);

        $result.$promise
          .then(function () {
            thiz.getRemoteResult();
          });

      }

      return $result;

    };

    // Obtiene el resultado de valores remotos
    thiz.getRemoteResult = function (cb) {
      idbUtils.validate(arguments, [['function', 'undefined']]);

      let $remote = $Model.getRemote();
      let $remoteResult = null;

      if ($remote && typeof $remote.find == 'function') {
        ($remoteResult = $remote.find($filters, cb).$promise)
          .then(function (result) {
            result.map(function (record, i) {
              $Model.get($Model.getKeyFrom(record.values)).$promise
                .then(function ($record) {

                  $record.$setRemoteValues(record.values, record.version);

                  if ($result[i]) {
                    if ($result[i] !== $record) {
                      $result[i].$emit(idbEvents.MODEL_UNQUERIED, [$result]);
                    }
                    $result[i] = $record;
                  } else {
                    $result.push($record);
                  }

                  $record.$emit(idbEvents.MODEL_QUERIED, [$result]);
                  
                });
            });
          });
        
      }

      return $remoteResult;

    };

  }

}