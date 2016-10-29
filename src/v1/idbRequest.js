'use strict';

/**
 * idbRequest
 * -----------------------------------------------------------------------------
 * [Exposed=(Window,Worker)]
 * interface IDBRequest : EventTarget {
 *   readonly attribute any                                        result;
 *   readonly attribute DOMException?                              error;
 *   readonly attribute (IDBObjectStore or IDBIndex or IDBCursor)? source;
 *   readonly attribute IDBTransaction?                            transaction;
 *   readonly attribute IDBRequestReadyState                       readyState;
 * 
 *   // Event handlers:
 *   attribute EventHandler onsuccess;
 *   attribute EventHandler onerror;
 * };
 *
 * enum IDBRequestReadyState {
 *   "pending",
 *   "done"
 * };
 */
export default function (Clazzer) { 'ngInject';
  
  // ---------------------------------------------------------------------------
  // Atributos falntantes por definir
  // $_promise

  const ReadyState = new Clazzer({})
        .static('PENDIGN',  'pending')
        .static('DONE',     'done');
  
  return new
  // ---------------------------------------------------------------------------
  // Constructor
  Clazzer(function idbRequest (me) {

    new Clazzer(this).static('$me', me);

  })

  // ---------------------------------------------------------------------------
  // Herencia
  .inherit(EventTarget)

  // ---------------------------------------------------------------------------
  // Statics
  .static('ReadyState', ReadyState.clazz)

  // ---------------------------------------------------------------------------
  // Getters
  .getter('$result', 'result')
  .getter('$error', 'error')
  .getter('$source', 'source')
  .getter('$readyState', 'readyState')
  .getter('$transaction', 'transaction')

  // ---------------------------------------------------------------------------
  // Event handlers
  .handlerEvent('success', 'onsuccess')
  .handlerEvent('error', 'onerror')

  // ---------------------------------------------------------------------------
  // Property
  .property('$promise', {

    get: function() { const thiz = this;
      if (thiz.$_promise) return thiz.$_promise;

      // Crear promise para el request
      thiz.$_promise = new Promise(function (resolve, reject) {
        thiz.success(function (event) {
          resolve(event);
        })
        .error(function (event) {
          reject(event);
        });
      });

      new Clazzer(thiz.$_promise).static('$request', thiz );

      return thiz.$_promise;

    }

  })

  // ---------------------------------------------------------------------------
  .clazz;

}