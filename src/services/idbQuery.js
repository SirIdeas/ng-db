'use strict';

// Funcion para el servicio de la BD
export default function idbQuery ($log, qs, idbUtils, idbEvents) { 'ngInject';
  
  return function idbQuery($db, $Model, $filters) { const thiz = this;
    idbUtils.validate(arguments, ['object', 'function', ['object', 'undefined']]);

    let $result = null;

    // Funcion que devuelve ejecuta el query y devuelve el resultado.
    thiz.getResult = function (cb) { const thiz = this;
      idbUtils.validate(arguments, [['function', 'undefined']]);

      // Ejecutar si no se ha ejecutado
      if (!$result) {
        
        const defered = qs.defer();
        $result = [];
        $result.$resolved = false;
        $result.$promise = defered.promise;

        $db.openCursor($Model.getModelName(), $filters, function (data, next) {

          const key = $Model.getKeyFrom(data);

          // Obtener la instancia
          const instance = $Model.getInstance(key);

          $Model.getVersionOf(key).promise
            .then(function (version) {

              instance.$setLocalValues(data, version? version.hash : undefined);
              instance.$resolved = true;
              instance.$emit(idbEvents.MODEL_QUERIED, thiz);

              // Agregar al resultado
              $result.push(instance);

              // Buscar siguiente
              next();

            })
            .catch(function (err) {

              defered.reject(err);
              $log.error(['Model.getVersionOf any error', err])

            });

        }).promise

        .then(function () {

          $result.$resolved = true;
          defered.resolve($result);
          thiz.getRemoteResult();

        })

        .catch(function (err) {

          defered.reject(err);

        });

      }

      return $result;

    };

    // Obtiene el resultado de valores remotos
    thiz.getRemoteResult = function () {
      idbUtils.validate(arguments, [['function', 'undefined']]);

      let $remote = $Model.getRemote();
      let $remoteResult = null;

      if ($remote && typeof $remote.find == 'function') {
        ($remoteResult = $remote.find($filters).$promise)
          .then(function (result) {
            result.map(function (record, i) {

              $Model.get($Model.getKeyFrom(record.values)).$promise
                .then(function ($record) {

                  $record.$setRemoteValues(record.values, record.version);

                  if ($result[i]) {
                    if ($result[i] !== $record) {
                      $result[i].$emit(idbEvents.MODEL_UNQUERIED, [thiz]);
                    }
                    $result[i] = $record;
                  } else {
                    $result.push($record);
                  }

                  $record.$emit(idbEvents.MODEL_QUERIED, [thiz]);
                  
                });
            });
          });
        
      }

      return $remoteResult;

    };

  }

}