'use strict';

export default function qs () { 'ngInject'
  
  function qsClass (cb) { const thiz = this;
    
    let thens = [];
    let thensReady = [];
    let catchs = [];
    let catchsReady = [];
    let resultArgs = null;
    let error = null;

    thiz.promise = {};
    thiz.$resolved = false;

    function thensResolved () {
      if (!thens.length) return;
      let cb = thens.shift();
      cb.apply(null, thiz.resultArgs);
      thensReady.push(cb);
      thensResolved();
    }

    function catchsResolved () {
      if (!catchs.length) return;
      let cb = catchs.shift();
      cb.apply(null, thiz.error);
      catchsReady.push(cb);
      catchsResolved();
    }

    thiz.resolve = function () {
      if (thiz.$resolved) return;
      thiz.$resolved = true;
      thiz.resultArgs = Array.prototype.slice.call(arguments);
      thensResolved();
    };

    thiz.reject = function (err) {
      if (thiz.$resolved) return;
      thiz.$resolved = true;
      thiz.error = err || {};
      catchsResolved();
    };

    thiz.promise.then = function (cb) {
      thens.push(cb);
      if (thiz.$resolved && !thiz.error) {
        thensResolved();
      }
      return thiz.promise;
    };

    thiz.promise.catch = function (cb) {
      catchs.push(cb);
      if (thiz.$resolved && thiz.error) {
        catchsResolved();
      }
      return thiz.promise;
    };

    thiz.promise.done = function (cb) {

      thens.push(function () {
        cb.apply(null, [null].concat(thiz.resultArgs));
      });

      catchs.push(function () {
        cb.apply(null, thiz.error);
      });

      if (thiz.$resolved) {
        if (!thiz.error) {
          thensResolved();
        }else {
          catchsResolved();
        }
      }

      return thiz;

    };

    if(cb) thiz.promise.done(cb);

  };

  // Crea una instancia del defered
  qsClass.defer = function (cb) {
    return new qsClass(cb);
  };

  return qsClass;

}