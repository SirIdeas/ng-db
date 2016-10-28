'use strict';

/**
 * idbModel
 * -----------------------------------------------------------------------------
 * 
 */
export default function (Clazzer) { 'ngInject';
return function idbModelFactory (db, name) {

  return new
  // ---------------------------------------------------------------------------
  // Constructor
  Clazzer(function idbModel() {
  })

  // ---------------------------------------------------------------------------
  // Propiedades staticas
  .static('$db', db)
  .static('$name', name)
  .static('$id', { keyPath: 'id', autoIncrement: true })

  // ---------------------------------------------------------------------------
  .static('setKeyPath', function (keyPath) {

    this.$id.keyPath = keyPath;
    return this;

  })

  // ---------------------------------------------------------------------------
  .static('setAutoIncrement', function (autoIncrement) {

    this.$id.autoIncrement = autoIncrement;
    return this;

  })

  // ---------------------------------------------------------------------------
  .static('createStore', function (cb) {

    const store = this.$db.createStore(this.$name, this.$id);

    if (cb) cb(this, store);

    return this;

  })

  // ---------------------------------------------------------------------------
  .clazz;

};}