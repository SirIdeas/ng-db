'use strict';

/**
 * idbTransaction
 * -----------------------------------------------------------------------------
 * [Exposed=(Window,Worker)]
 * interface IDBTransaction : EventTarget {
 *   readonly attribute DOMStringList      objectStoreNames;
 *   readonly attribute IDBTransactionMode mode;
 *   readonly attribute IDBDatabase        db;
 *   readonly attribute DOMException       error;
 * 
 *   IDBObjectStore objectStore(DOMString name);
 *   void           abort();
 * 
 *   // Event handlers:
 *   attribute EventHandler onabort;
 *   attribute EventHandler oncomplete;
 *   attribute EventHandler onerror;
 * };
 * 
 * enum IDBTransactionMode {
 *   "readonly",
 *   "readwrite",
 *   "versionchange"
 * };
 */
export default function (Clazzer, idbStore) { 'ngInject';
  
  // ---------------------------------------------------------------------------
  // Atributos falntantes por definir
  // $_promise
  
  const TransactionMode = new Clazzer({})
        .static('ReadOnly', 'readonly')
        .static('ReadWrite', 'readwrite')
        .static('VersionChange',  'versionchange');

  return new
  // ---------------------------------------------------------------------------
  // Constructor
  Clazzer(function idbTransaction (me) {
    
    new Clazzer(this).static('$me', me);

  })

  // ---------------------------------------------------------------------------
  // Herencia
  .inherit(EventTarget)

  // ---------------------------------------------------------------------------
  // Statics
  .static('TransactionMode', TransactionMode.clazz)

  // ---------------------------------------------------------------------------
  // Getters
  .getter('$db',          'db')
  .getter('$mode',        'mode')
  .getter('$error',       'error')
  .getter('$storeNames',  'objectStoreNames')

  // ---------------------------------------------------------------------------
  // Event handlers
  .handlerEvent('$aborted',   'onabort')
  .handlerEvent('$completed', 'oncomplete')
  .handlerEvent('$failed',    'onerror')

  // ---------------------------------------------------------------------------
  .method('$store', function(name){

    return new idbStore(this.$me.objectStore(name));

  })

  // ---------------------------------------------------------------------------
  .method('$abort', function(){

    this.$me.abort();

  })

  // ---------------------------------------------------------------------------
  // Property
  .property('$promise', {

    get: function() { const thiz = this;
      if (thiz.$_promise) return thiz.$_promise;

      // Crear promise para el request
      thiz.$_promise = new Promise(function (resolve, reject) {
        thiz.$completed(function (event) {
          resolve(event);
        })
        .$failed(function (event) {
          reject(event);
        });
      });

      new Clazzer(thiz.$_promise).static('$transaction', thiz);

      return thiz.$_promise;

    }

  })

  // ---------------------------------------------------------------------------
  .clazz;

}