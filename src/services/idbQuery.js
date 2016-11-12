'use strict';

/**
 * idbQuery
 * -----------------------------------------------------------------------------
 * 
 */
export default function (Clazzer) { 'ngInject';
  
  return new
  // ---------------------------------------------------------------------------
  // Constructor
  Clazzer(function idbQuery (model, query) {

    new Clazzer(this)
      .static('$model', model)
      .static('$query', query)
      ;

  })
  
  // ---------------------------------------------------------------------------
  // Static
  .property('$result', { value: [] })

  // ---------------------------------------------------------------------------
  // method
  .method('$getResult', function (cb) { const thiz = this;

    if (!thiz.$result.$promise) {

      thiz.$result.$promise = thiz.$model.$reader().then(function (store) {

        return new Promise(function (resolve, reject) {

          const result = [];
          const rq = store.$openCursor();
          rq.$success(function (event) {

            const cursor = rq.$me.result;
            if (!cursor) return resolve(result);

            const record = thiz.$model.$getInstance(cursor.key);
            record.$setValues(cursor.value);
            record.$setLocalValues(cursor.value);
            thiz.$result.push(record);
            result.push(record);

            cursor.continue();

          })

          .$failed(function (event) {
            reject(event);
          });

        });

      });

    }

    return thiz.$result;

  })

  // ---------------------------------------------------------------------------
  .clazz;

}