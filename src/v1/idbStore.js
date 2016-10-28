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
 *   IDBRequest get(any query);
 *   IDBRequest getKey(any query);
 *   IDBRequest getAll(optional any query, [EnforceRange] optional unsigned long count);
 *   IDBRequest getAllKeys(optional any query, [EnforceRange] optional unsigned long count);
 *   IDBRequest count(optional any query);
 *   IDBRequest openCursor(optional any query, optional IDBCursorDirection direction = "next");
 *   IDBRequest openKeyCursor(optional any query, optional IDBCursorDirection direction = "next");
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
export default function (Clazzer, idbRequest) { 'ngInject';

  return new
  // ---------------------------------------------------------------------------
  // Constructor
  Clazzer(function idbStore (me) {

    new Clazzer(this).static('$me', me);

  })

  // ---------------------------------------------------------------------------
  // Getters
  .getter('$name', 'name')
  .getter('$keyPath', 'keyPath')
  .getter('$indexNames', 'indexNames')
  .getter('$transaction', 'transaction')
  .getter('$autoIncrement', 'autoIncrement')

  // ---------------------------------------------------------------------------
  .method('put', function (value, key) {

    return new idbRequest(this.$me.put(value, key));

  })

  // ---------------------------------------------------------------------------
  .method('add', function (value, key) {

    return new idbRequest(this.$me.add(value, key));

  })

  // ---------------------------------------------------------------------------
  .method('delete', function (query) {

    return new idbRequest(this.$me.delete(query));

  })

  // ---------------------------------------------------------------------------
  .method('clear', function () {

    return new idbRequest(this.$me.clear());

  })

  // ---------------------------------------------------------------------------
  .method('get', function (query) {

    return new idbRequest(this.$me.get(query));

  })

  // ---------------------------------------------------------------------------
  .method('getKey', function (query) {

    return new idbRequest(this.$me.getKey(query));

  })

  // ---------------------------------------------------------------------------
  .method('getAll', function (query, count) {

    return new idbRequest(this.$me.getAll(query, count));

  })

  // ---------------------------------------------------------------------------
  .method('getAllKeys', function (query, count) {

    return new idbRequest(this.$me.getAllKeys(query, count));

  })

  // ---------------------------------------------------------------------------
  .method('count', function (query) {

    return new idbRequest(this.$me.count(query));

  })

  // ---------------------------------------------------------------------------
  .method('openCursor', function (query, direction) {

    return new idbRequest(this.$me.openCursor(query, direction));

  })

  // ---------------------------------------------------------------------------
  .method('openKeyCursor', function (query, direction) {

    return new idbRequest(this.$me.openKeyCursor(query, direction));

  })

  // ---------------------------------------------------------------------------
  .method('index', function (name) {

    throw 'idbStore.prototype.index';

  })

  // ---------------------------------------------------------------------------
  .method('createIndex', function (name, keyPath, options) {

    throw 'idbStore.prototype.createIndex';

  })

  // ---------------------------------------------------------------------------
  .method('deleteIndex', function (indexName) {

    this.$me.deleteIndex(indexName);

  })

  // ---------------------------------------------------------------------------
  .clazz;

}