'use strict';

/**
 * idbModel
 * -----------------------------------------------------------------------------
 * 
 */
export default function (Clazzer, idbQuery, idbEventTarget, lbResource, $timeout) { 'ngInject';

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
  // $_versioning
  
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
  .static('$indexesToCreate', [])
  .static('$instances', {})
    
  // ---------------------------------------------------------------------------
  .static('$getKeyFrom', function (data) {

    return getFieldValue(data, this.$id.keyPath);

  })
    
  // ---------------------------------------------------------------------------
  .static('$addIndex', function (fields, name, options) {

    this.$indexesToCreate.push(arguments);

    return this;

  })

  // ---------------------------------------------------------------------------
  .static('$create', function (cb) { const thiz = this;

    const store = thiz.$db.$createStore(thiz.$name, thiz.$id);

    thiz.$indexesToCreate.map(function (args) {
      store.$createIndex.apply(store, args);
    });

    if (cb) cb(thiz, store);

    return thiz;

  })

  // ---------------------------------------------------------------------------
  .static('$drop', function (cb) {

    this.$db.$dropStore(this.$name);

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
    const args = arguments;
    const data = this.$getValues(obj);
    args[0] = data;

    return thiz.$writer().then(function (store) {
      return store.$put.apply(store, args).then(function (key) {
        const record = thiz.$getInstance(key);
        record.$setValues(data);
        record.$setLocalValues(data);
        return record;
      });
    });

  })

  // ---------------------------------------------------------------------------
  .static('$add', function (obj, key) { const thiz = this;
    const args = arguments;
    const data = this.$getValues(obj);
    args[0] = data;

    return thiz.$writer().then(function (store) {
      return store.$add.apply(store, args).then(function (key) {
        const record = thiz.$getInstance(key);
        record.$setValues(data);
        record.$setLocalValues(data);
        return record;
      });
    });

  })

  // ---------------------------------------------------------------------------
  .static('$delete', function (query) {
    const args = arguments;
    
    return this.$writer().then(function (store) {
      return store.$delete.apply(store, args);
    });

  })

  // ---------------------------------------------------------------------------
  .static('$clear', function () {
    const args = arguments;
    
    return this.$writer().then(function (store) {
      return store.$clear.apply(store, args);
    });

  })

  // ---------------------------------------------------------------------------
  .static('$get', function (key) { const thiz = this;
    const args = arguments;
    const record = this.$getInstance(key);

    record.$promise = thiz.$reader().then(function (store) {
      return store.$get.apply(store, args).then(function (data) {
        record.$setValues(data);
        record.$setLocalValues(data);
        return record;
      });
    });

    return record;

  })

  // ---------------------------------------------------------------------------
  .static('$getKey', function (query) { const thiz = this;
    const args = arguments;

    return thiz.$reader().then(function (store) {
      return store.$getKey.apply(store, args);
    });
    
  })

  // ---------------------------------------------------------------------------
  .static('$getAll', function (query, count) { const thiz = this;
    const args = arguments;
    const result = [];

    result.$promise = thiz.$reader().then(function (store) {
      return store.$getAll.apply(store, args).then(function (arr) {
        return arr.map(function (data) {
          const record = thiz.$getInstance(thiz.$getKeyFrom(data));
          record.$setValues(data);
          record.$setLocalValues(data);
          result.push(record);
          return record;
        });
      });
    });

    return result;

  })

  // ---------------------------------------------------------------------------
  .static('$getAllKeys', function (query, count) {
    const args = arguments;
    const result = [];

    result.$promise = this.$reader().then(function (store) {
      return store.$getAllKeys.apply(store, args).then(function (arr) {
        return arr.map(function (key) {
          result.push(key);
          return key;
        });
      });
    });
    
    return result;

  })

  // ---------------------------------------------------------------------------
  .static('$count', function (query) {
    const args = arguments;

    return this.$reader().then(function (store) {
      return store.$count.apply(store, args);
    });

  })

  // ---------------------------------------------------------------------------
  .static('$find', function (filters) {
    
    return new idbQuery(this, filters);

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
  // Control de versiones del modelo
  .static('$versioning', function (modelName, cb) {
    if (!this.$_versioning) {
        
      if (typeof modelName === 'function') {
        cb = modelName;
        modelName = undefined;
      }

      // Si el model no tiene nombre se agrega
      if (!modelName){
        modelName = this.$name+'_versioning';
      }

      // Crear modelo para el manejo de datos
      this.$_versioning = this.$db.$model(modelName)
        .$key(this.$id.keyPath, true)
        .$field('hash', {
          'type': 'string',
          'required': true
        });

    }

    if (cb) cb(this.$_versioning);
    
    return this;

  })

  // ---------------------------------------------------------------------------
  // Configura el remote api
  .static('$remote', function (url, args, actions) {

    this.$_remote = lbResource.apply(lbResource, arguments);
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