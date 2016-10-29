'use strict';

/**
 * idbModel
 * -----------------------------------------------------------------------------
 * 
 */
export default function (Clazzer) { 'ngInject';

// -----------------------------------------------------------------------------
// Buscar un campo
const deepField = function (obj, field, cb) {
  idbUtils.validate(arguments, ['object', 'string', 'function']);

  const fields = field.split('.');
  const lastField = fields.pop();

  return (function _set(obj) {
    if (fields.length == 0)
      return cb(obj, lastField);
    const field = fields.shift();
    if (typeof obj[field] === 'undefined')
      obj[field] = {};
    return _set(obj[field]);
  })(obj);

};

// -----------------------------------------------------------------------------
// Obtiene el valor pa una propieda de un objeto
const getFieldValue = function (obj, field) {
  return deepField(obj, field, function (obj, lastField) {
    return obj[lastField];
  });
};

// -----------------------------------------------------------------------------
// Obtiene el valor pa una propieda de un objeto
const setFieldValue = function (obj, field, value) {
  deepField(obj, field, function (obj, lastField) {
    obj[lastField] = value;
  });
  return obj;
};

// -----------------------------------------------------------------------------
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
  .static('$instances', [])

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

  .static('put', function (obj, key) {

    return this.$db.store(this.$name).readwrite()
      .then(function (stores) {
        return stores[0].put(obj, key).$promise;
      });

  })

  // ---------------------------------------------------------------------------
  .clazz;

};}