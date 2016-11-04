'use strict';

/**
 * idbConsultant
 * -----------------------------------------------------------------------------
 * [Exposed=(Window,Worker)]
 * interface IDBIndex/IDBStore {
 *            attribute DOMString      name;
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
export default function (Clazzer, idbRequest) { 'ngInject';
  
  return new
  // ---------------------------------------------------------------------------
  // Constructor
  Clazzer(function idbConsultant (me) {

    new Clazzer(this).static('$me', me);

  })
  
  // ---------------------------------------------------------------------------
  // Getters
  .getter('$name',        'name')

  // ---------------------------------------------------------------------------
  .method('$get', function (query) {

    return new idbRequest(this.$me.get(query))
      .$promise
      .then(function (event) {
        return event.target.result;
      });

  })

  // ---------------------------------------------------------------------------
  .method('$getKey', function (query) {

    return new idbRequest(this.$me.getKey(query))
      .$promise
      .then(function (event) {
        return event.target.result;
      });

  })

  // ---------------------------------------------------------------------------
  .method('$getAll', function (query, count) {

    return new idbRequest(this.$me.getAll(query, count))
      .$promise
      .then(function (event) {
        return event.target.result;
      });

  })

  // ---------------------------------------------------------------------------
  .method('$getAllKeys', function (query, count) {
    return new idbRequest(this.$me.getAllKeys(query, count))
      .$promise
      .then(function (event) {
        return event.target.result;
      });

  })

  // ---------------------------------------------------------------------------
  .method('$count', function (query) {

    return new idbRequest(this.$me.count(query))
      .$promise
      .then(function (event) {
        return event.target.result;
      });

  })

  // ---------------------------------------------------------------------------
  .method('$openCursor', function (query, direction) {

    return new idbRequest(this.$me.openCursor(query, direction));

  })

  // ---------------------------------------------------------------------------
  .method('$openKeyCursor', function (query, direction) {

    return new idbRequest(this.$me.openKeyCursor(query, direction));

  })

  // ---------------------------------------------------------------------------
  .clazz;

}