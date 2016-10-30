'use strict';

/**
 * idbModel
 * -----------------------------------------------------------------------------
 * 
 */
export default function (Clazzer, lbResource, $timeout, idbEventTarget) { 'ngInject';

// -----------------------------------------------------------------------------
// Buscar un campo
const deepField = function (obj, field, cb) {

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
return function idbModelFactory (db, name, socket) {
  
  // ---------------------------------------------------------------------------
  // Atributos falntantes por definir
  // $_remote
  
  // ---------------------------------------------------------------------------
  function idbModel() {
  }

  return new
  // ---------------------------------------------------------------------------
  // Constructor
  Clazzer(idbModel)

  // ---------------------------------------------------------------------------
  // Herencia
  .inherit(idbEventTarget)

  // ---------------------------------------------------------------------------
  // Herencia
  // .inherit(EventTarget)

  // ---------------------------------------------------------------------------
  // Propiedades staticas
  .static('$db', db)
  .static('$name', name)
  .static('$socket', socket)

  .static('$id', { keyPath: 'id', autoIncrement: true })
  .static('$fields', {})
  .static('$instances', {})
    
  // ---------------------------------------------------------------------------
  .static('$getKeyFrom', function (data) {
    return getFieldValue(data, this.$id.keyPath);
  })

  // ---------------------------------------------------------------------------
  .static('$setKeyPath', function (keyPath) {

    this.$id.keyPath = keyPath;
    return this;

  })

  // ---------------------------------------------------------------------------
  .static('$setAutoIncrement', function (autoIncrement) {

    this.$id.autoIncrement = autoIncrement;
    return this;

  })

  // ---------------------------------------------------------------------------
  .static('$createStore', function (cb) {

    const store = this.$db.$createStore(this.$name, this.$id);

    if (cb) cb(this, store);

    return this;

  })

  // ---------------------------------------------------------------------------
  .static('$put', function (obj, key) { const thiz = this;

    return thiz.$db.$store(thiz.$name).$readwrite()
      .then(function (stores) {
        return stores[thiz.$name].put(obj, key).$promise;
      });

  })

  // ---------------------------------------------------------------------------
  .static('$getInstance', function (key) {

    // El objeto no tiene ID
    if (key === undefined || key === null) {
      return new this();
    }

    // No existe la instancia entonce se crea
    if (!this.$instances[key]){
      this.$instances[key] = new this();
      this.$instances[key].$set(this.$id.keyPath, key);
    }
    
    return this.$instances[key];

  })

  // ---------------------------------------------------------------------------
  // Asigna la especificación de los campos
  .static('$field', function (name, field) {

    if (typeof field === 'string') {
      field = { "type": field };
    }

    field.name = name;

    this.$fields[name] = field;

    return this;

  })

  // ---------------------------------------------------------------------------
  // Agrega el el campo ID automaticamente
  .static('$idInject', function () {

    this.field('name', {
      id: true,
      type: 'number'
    });

  })

  // ---------------------------------------------------------------------------
  // Agrega el el campo ID automaticamente
  .static('$build', function (buildCallback) {

    buildCallback(this);
    return this;

  })

  // ---------------------------------------------------------------------------
  // Configura el remote api
  .static('$remote', function (url, args, actions) {

    this.$_remote = lbResource(url, args, actions);
    return this;

  })

  // ---------------------------------------------------------------------------
  // Propiedades
  .property('$_values', { value: new Clazzer({})
    .static('local', {})
    .static('remote', {})
    .clazz
  })
  
  .property('$_versions', { value: {} })
  
  // ---------------------------------------------------------------------------
  // Devuelve el valor de una propiedad
  .method('$get', function (field) {

    return getFieldValue(this, field);

  })

  // ---------------------------------------------------------------------------
  // Asigna in valor a un campo
  .method('$set', function (field, value) {

    return setFieldValue(this, field);

  })

  // ---------------------------------------------------------------------------
  // Devuelve el valor de una propiedad
  .method('$getValues', function (data) {
      
    const values = {};
    data = data || this;

    Object.keys(idbModel.$fields).map(function (field) {
      setFieldValue(values, field, getFieldValue(data, field));
    });

    return values;

  })

  // ---------------------------------------------------------------------------
  .method('$getLocalValues', function () {

    return this.$getValues(this.$_values.local);

  })

  // ---------------------------------------------------------------------------
  .method('$getRemoteValues', function () {

    return this.$getValues(this.$_values.remote);

  })

  // ---------------------------------------------------------------------------
  .method('$setValues', function (data) { const thiz = this;

    Object.keys(data || {}).map(function (field) {
      setFieldValue(thiz, field, data[field]);
    });

    return thiz;

  })

  // ---------------------------------------------------------------------------
  .method('$setLocalValues', function (data) { const thiz = this;

    Object.keys(data || {}).map(function (field) {
      setFieldValue(thiz.$_values.local, field, data[field]);
    });

    return thiz;

  })

  // ---------------------------------------------------------------------------
  .method('$setRemoteValues', function (data) { const thiz = this;

    Object.keys(data || {}).map(function (field) {
      setFieldValue(thiz.$_values.remote, field, data[field]);
    });

    return thiz;

  })

  // ---------------------------------------------------------------------------
  .method('$key', function (data) {

    return getFieldValue(data, this.$id.keyPath);

  })

  // ---------------------------------------------------------------------------
  // Funcion que hace escuchars los mensajes del socket para el model
  .method('$listen', function (data) { const thiz = this;
    if (!this.$socket) throw new Error('idbModel.DoesNotHaveSocketInstance');

    // Crear una subscripcion al socket para cuando se reciban datos
    // para la instancia actual
    this.$socket.subscribe({
      modelName: idbModel.$name,
      eventName: 'update',
      modelId: thiz.$key(),
    }, function (data) {

      // A recibir datos del socket asignar los valores
      $timeout(function () {
        // Emitir evento de datos recibidor para el modelo
        thiz.$setRemoteValues(data.values, data.version);

      });

    });

  })

  // ---------------------------------------------------------------------------
  .clazz;

};}