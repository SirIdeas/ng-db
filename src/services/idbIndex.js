'use strict';

/**
 * idbIndex
 * -----------------------------------------------------------------------------
 * [Exposed=(Window,Worker)]
 * interface IDBIndex {
 *            attribute DOMString      name;
 *   readonly attribute IDBObjectStore objectStore;
 *   readonly attribute any            keyPath;
 *   readonly attribute boolean        multiEntry;
 *   readonly attribute boolean        unique;
 * 
 *   IDBRequest get(any query);
 *   IDBRequest getKey(any query);
 *   IDBRequest getAll(optional any query, [EnforceRange] optional unsigned long count);
 *   IDBRequest getAllKeys(optional any query, [EnforceRange] optional unsigned long count);
 *   IDBRequest count(optional any query);
 *   IDBRequest openCursor(optional any query, optional IDBCursorDirection direction = "next");
 *   IDBRequest openKeyCursor(optional any query, optional IDBCursorDirection direction = "next");
 * };
 */
export default function (Clazzer, idbConsultant) { 'ngInject';
  
  return new
  // ---------------------------------------------------------------------------
  // Constructor
  Clazzer(function idbIndex (me) {

    new Clazzer(this).static('$me', me);

  })

  // ---------------------------------------------------------------------------
  // Herencia
  .inherit(idbConsultant)
  
  // ---------------------------------------------------------------------------
  // Getters
  .getter('$objectStore', 'objectStore')
  .getter('$keyPath',     'keyPath')
  .getter('$multiEntry',  'multiEntry')
  .getter('$unique',      'unique')

  // ---------------------------------------------------------------------------
  .clazz;

}