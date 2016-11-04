'use strict';

/**
 * idbStore
 * -----------------------------------------------------------------------------
 * [Exposed=(Window,Worker)]
 * interface IDBObjectStore {
 *            attribute DOMString      name;
 *   readonly attribute any            keyPath;
 *   readonly attribute DOMStringList  indexNames;
 *   readonly attribute IDBTransaction transaction;
 *   readonly attribute boolean        autoIncrement;
 * 
 *   IDBRequest put(any value, optional any key);
 *   IDBRequest add(any value, optional any key);
 *   IDBRequest delete(any query);
 *   IDBRequest clear();
 *   IDBIndex   index(DOMString name);
 *   IDBIndex   createIndex(DOMString name, (DOMString or sequence<DOMString>) keyPath, optional IDBIndexParameters options);
 *   void       deleteIndex(DOMString indexName);
 * };
 * 
 * dictionary IDBIndexParameters {
 *   boolean unique = false;
 *   boolean multiEntry = false;
 * };
 * 
 */
export default function (Clazzer, idbRequest, idbIndex, idbConsultant, $log) { 'ngInject';

  return new
  // ---------------------------------------------------------------------------
  // Constructor
  Clazzer(function idbStore (me) {

    new Clazzer(this).static('$me', me);

  })

  // ---------------------------------------------------------------------------
  // Herencia
  .inherit(idbConsultant)

  // ---------------------------------------------------------------------------
  // Getters
  .getter('$keyPath', 'keyPath')
  .getter('$indexNames', 'indexNames')
  .getter('$transaction', 'transaction')
  .getter('$autoIncrement', 'autoIncrement')

  // ---------------------------------------------------------------------------
  .method('$put', function (value, key) {

    return new idbRequest(this.$me.put(value, key))
      .$promise
      .then(function (event) {
        return event.target.result;
      });

  })

  // ---------------------------------------------------------------------------
  .method('$add', function (value, key) {

    return new idbRequest(this.$me.add(value, key))
      .$promise
      .then(function (event) {
        return event.target.result;
      });

  })

  // ---------------------------------------------------------------------------
  .method('$delete', function (query) {

    return new idbRequest(this.$me.delete(query))
      .$promise
      .then(function (event) {});

  })

  // ---------------------------------------------------------------------------
  .method('$clear', function () {

    return new idbRequest(this.$me.clear())
      .$promise
      .then(function(event){});

  })

  // ---------------------------------------------------------------------------
  .method('$index', function (name) {

    return new idbIndex(this.$me.index(name));

  })

  // ---------------------------------------------------------------------------
  .method('$createIndex', function (fields, name, options) {
    if (typeof fields == 'string') {
      fields = [fields];
    }
    if (typeof name == 'object'){
      options = name;
      name = null;
    }
    if (!name) {
      name = fields.sort().join('_');
    }

    return new idbIndex(this.$me.createIndex(name, fields, options));

  })

  // ---------------------------------------------------------------------------
  .method('$deleteIndex', function (indexName) {
    if (Array.angular.isArray(indexName)) {
      indexName = indexName.sort().join('_');
    }
    this.$me.deleteIndex(indexName);

  })

  // ---------------------------------------------------------------------------
  .clazz;

}