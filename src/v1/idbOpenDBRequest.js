'use strict';

/**
 * idbOpenDBRequest
 * -----------------------------------------------------------------------------
 * [Exposed=(Window,Worker)]
 * interface IDBOpenDBRequest : IDBRequest {
 *   // Event handlers:
 *   attribute EventHandler onblocked;
 *   attribute EventHandler onupgradeneeded;
 * };
 */
export default function (Clazzer, idbRequest) { 'ngInject';
  
  return new
  // ---------------------------------------------------------------------------
  // Constructor
  Clazzer(function idbOpenDBRequest (me) {
    idbRequest.apply(this, arguments); // Llamar al constructos del padre

  })

  // ---------------------------------------------------------------------------
  // Herencia
  .inherit(idbRequest)

  // ---------------------------------------------------------------------------
  // Event handlers
  .handlerEvent('blocked', 'onblocked')
  .handlerEvent('upgradeneeded', 'onupgradeneeded')
  
  // ---------------------------------------------------------------------------
  .clazz;

}