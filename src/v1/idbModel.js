'use strict';

/**
 * idbModel
 * -----------------------------------------------------------------------------
 * 
 */
export default function (Clazzer, idbEventTarget, lbResource, $timeout) { 'ngInject';

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
  .static('$fields', {
    id: {
      id: true,
      name: 'id',
      type: 'number'
    }
  })
  .static('$instances', {})
    
  // ---------------------------------------------------------------------------
  .static('$getKeyFrom', function (data) {

    return getFieldValue(data, this.$id.keyPath);

  })

  // ---------------------------------------------------------------------------
  .static('$createStore', function (cb) {

    const store = this.$db.$createStore(this.$name, this.$id);

    if (cb) cb(this, store);

    return this;

  })

  // ---------------------------------------------------------------------------
  .static('$writer', function (cb) { const thiz = this;

    return thiz.$db.$store(thiz.$name).$writer(cb)
      .then(function (stores) {
        return stores[thiz.$name]
      })

  })

  // ---------------------------------------------------------------------------
  .static('$reader', function (cb) { const thiz = this;

    return thiz.$db.$store(thiz.$name).$reader(cb)
      .then(function (stores) {
        return stores[thiz.$name]
      })

  })

  // ---------------------------------------------------------------------------
  .static('$put', function (obj, key) { const thiz = this;
    
    const data = this.$getValues(obj);

    return thiz.$writer().then(function (store) {
      return store.$put(data, key).$promise
        .then(function (event) {
          const record = thiz.$getInstance(event.target.result);
          record.$setLocalValues(data);
          return record;
        });
    });

  })

  // ---------------------------------------------------------------------------
  .static('$add', function (obj, key) { const thiz = this;
    
    const data = this.$getValues(obj);

    return thiz.$writer().then(function (store) {
      return store.$add(data, key).$promise
        .then(function (event) {
          const record = thiz.$getInstance(event.target.result);
          record.$setLocalValues(data);
          return record;
        });
    });

  })

  // ---------------------------------------------------------------------------
  .static('$delete', function (query) {
    
    throw 'idbModel.static.$delete';

  })

  // ---------------------------------------------------------------------------
  .static('$clear', function () {
    
    throw 'idbModel.static.$clear';

  })

  // ---------------------------------------------------------------------------
  .static('$get', function (key) { const thiz = this;

    const record = this.$getInstance(key);

    record.$promise = thiz.$reader().then(function (store) {
      return store.$get(key).$promise
        .then(function (event) {
          record.$setLocalValues(event.target.result);
          return record;
        });
    });

    return record;

  })

  // ---------------------------------------------------------------------------
  .static('$getKey', function (query) {
    
    throw 'idbModel.static.$getKey';

  })

  // ---------------------------------------------------------------------------
  .static('$getAll', function (query, count) {
    
    throw 'idbModel.static.$getAll';

  })

  // ---------------------------------------------------------------------------
  .static('$getAllKeys', function (query, count) {
    
    throw 'idbModel.static.$getAllKeys';

  })

  // ---------------------------------------------------------------------------
  .static('$count', function (query) {
    
    throw 'idbModel.static.$count';

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
  .static('$key', function (key, autoIncrement, type) {
    if(typeof key === 'boolean') {
      autoIncrement = key;
    }
    if (key === undefined || key === null || typeof key === 'boolean'){
      key = 'id';
    }
    if(typeof autoIncrement === 'string') {
      type = autoIncrement;
      autoIncrement = null;
    }
    if (autoIncrement === undefined || autoIncrement === null){
      autoIncrement = true;
    }
    if(typeof autoIncrement === 'boolean' || type !== 'string') {
      type = 'number';
    }

    this.$id.keyPath = key;
    this.$id.autoIncrement = autoIncrement;

    return this.$field(key, {
      id: true,
      type: type,
    });

  })

  // ---------------------------------------------------------------------------
  // Devuelve el valor de una propiedad
  .static('$getValues', function (data) {
      
    const values = {};

    Object.keys(this.$fields).map(function (field) {
      const value = getFieldValue(data, field);
      if (value !== undefined){
        setFieldValue(values, field, value);
      }
    });

    return values;

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

    return idbModel.$getValues(data || this);

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