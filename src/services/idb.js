'use strict';

/**
 * idb
 * -----------------------------------------------------------------------------
 * [Exposed=(Window,Worker)]
 * interface IDBFactory {
 *   IDBOpenDBRequest open(DOMString name, [EnforceRange] optional unsigned long long version);
 *   IDBOpenDBRequest deleteDatabase(DOMString name);
 *   short cmp(any first, any second);
 * };
 * -----------------------------------------------------------------------------
 * [Exposed=(Window,Worker)]
 * interface IDBDatabase : EventTarget {
 *   readonly attribute DOMString          name;
 *   readonly attribute unsigned long long version;
 *   readonly attribute DOMStringList      objectStoreNames;
 * 
 *   IDBTransaction transaction((DOMString or sequence<DOMString>) storeNames, optional IDBTransactionMode mode = "readonly");
 *   void           close();
 *   IDBObjectStore createObjectStore(DOMString name, optional IDBObjectStoreParameters options);
 *   void           deleteObjectStore(DOMString name);
 * 
 *   // Event handlers:
 *   attribute EventHandler onabort;
 *   attribute EventHandler onclose;
 *   attribute EventHandler onerror;
 *   attribute EventHandler onversionchange;
 * };
 * 
 * dictionary IDBObjectStoreParameters {
 *   (DOMString or sequence<DOMString>)? keyPath = null;
 *   boolean                             autoIncrement = false;
 * };me
 */
export default function (Clazzer, idbEventTarget, idbStore, idbModel, idbOpenDBRequest, idbTransaction, $log) { 'ngInject';
  
  // En la siguiente linea, puede incluir prefijos de implementacion que quiera probar.
  const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  // No use "const indexedDB = ..." Si no está en una función.
  // Por otra parte, puedes necesitar referencias a algun objeto window.IDB*:
  const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  const IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  // (Mozilla nunca ha prefijado estos objetos, por lo tanto no necesitamos window.mozIDB*)
  
  if (!indexedDB) {
    alert('Su navegador no soporta una versión estable de indexedDB. Tal y como las características no serán validas');
    return;
  }
  
  // ---------------------------------------------------------------------------
  // Atributos falntantes por definir
  // $_me
  // $opened
  
  // ---------------------------------------------------------------------------
  // Constructor  
  const idb = function idb(name, version, socket) {

    new Clazzer(this)
      .static('$name', name)
      .static('$version', version)
      .static('$socket', socket);

  };

  return new
  // ---------------------------------------------------------------------------
  // Constructor
  Clazzer(idb)

  // ---------------------------------------------------------------------------
  // Herencia
  .inherit(idbEventTarget)

  // ---------------------------------------------------------------------------
  // Propiedades
  .property('$_upgradeneededs', { value:[] })
  .property('$_models', { value: {} })

  .property('$me', {
    get: function () {
      return this.$_me;
    },
    set: function (me) {
      this.$_me = me;
      const e = new Event('opened');
      // e.target = this;
      this.$emit(e);
    }
  })

  // ---------------------------------------------------------------------------
  // Getters
  .getter('$objectStoreNames', 'objectStoreNames')

  // ---------------------------------------------------------------------------
  .static('$open', function (name, version) {

    return new idbOpenDBRequest(indexedDB.open.apply(indexedDB, arguments));

  })

  // ---------------------------------------------------------------------------
  .static('$drop', function (name) {
    
    return new idbOpenDBRequest(indexedDB.deleteDatabase.apply(indexedDB, arguments));

  })

  // ---------------------------------------------------------------------------
  .static('$cmp', function (first, second) {
    
    return indexedDB.cmp(first, second);

  })

  // ---------------------------------------------------------------------------
  // Event handlers
  .method('$aborted', function (cb) { const thiz = this;
    return thiz.$bind('opened', function () {
      thiz.$me.onabort = cb;
    });
  })

  // ---------------------------------------------------------------------------
  .method('$closed', function (cb) { const thiz = this;
    return thiz.$bind('opened', function () {
      thiz.$me.onclose = cb;
    });
  })

  // ---------------------------------------------------------------------------
  .method('$error', function (cb) { const thiz = this;
    return thiz.$bind('opened', function () {
      thiz.$me.onerror = cb;
    });
  })

  // ---------------------------------------------------------------------------
  .method('$versionChanged', function (cb) { const thiz = this;
    return thiz.$bind('opened', function () {
      thiz.$me.onversionchange = cb;
    });
  })

  // ---------------------------------------------------------------------------
  .method('$upgradeneeded', function (cb) {
    
    this.$_upgradeneededs.push(cb);
    return this;

  })

  // ---------------------------------------------------------------------------
  .method('$automigration', function (allMigrations) {

    return this.$upgradeneeded(function (thiz, openRequest, event) {
      Object.keys(allMigrations).map(function (version) {

        if (event.oldVersion < version && version <= event.newVersion) {

          const migrations = Array.isArray(allMigrations[version])?
            allMigrations[version]:[allMigrations[version]];

          $log.log('migration v'+version+' starts');
          migrations.map(function (migration) {
            migration(thiz, openRequest, event);
          });
          
        }

      });

    });
    
  })

  // ---------------------------------------------------------------------------
  .method('$migrate', function (modelName){ const thiz = this;

    if (!modelName){
      return Object.keys(thiz.$_models).map(function (modelName) {
        return thiz.$migrate(modelName);
      });
    }

    return thiz.$model(modelName).$create();

  })

  // ---------------------------------------------------------------------------
  .method('$open', function (cb, cbErr) { const thiz = this;

    let lastRq = null;
    let lastEvent = null;

    if (!thiz.$opened) {

      thiz.$opened = (lastRq = idb.$open(thiz.$name, thiz.$version)
        .$upgradeneeded(function (event) {
          $log.log('upgradeneeded idb: '+thiz.$name+' v'+thiz.$version);
          thiz.$me = event.target.result;
          thiz.$_upgradeneededs.map(function (cb) {
            cb.apply(thiz, [thiz, lastRq, event]);
          });
        }))

      .$promise
        .then(function (event) {
          $log.log('opened idb: '+thiz.$name+' v'+thiz.$version);
          if (thiz.$me !== event.target.result){
            thiz.$me = event.target.result;
          }
          lastEvent = event;
          if (cb) cb(thiz, lastRq, event);
          return thiz;
        })
        .catch(function (event) {
          lastRq = null;
          thiz.$opened = null;
          if (cbErr) cbErr(thiz, lastRq, event);
          return thiz;
        });

    } else if (cb) {

      cb(thiz, lastRq, lastEvent);

    }

    return thiz.$opened;

  })

  // ---------------------------------------------------------------------------
  .method('$drop', function (cb) { const thiz = this;
    thiz.$opened = null;

    return new Promise(function (resolve, reject) {

      const rq = idb.$drop(thiz.$name)
        .$success(function (event) {
          resolve(thiz)
        })
        .$failed(function (event) {
          reject(event);
        });
      if (cb) cb(rq);

    });

  })

  // ---------------------------------------------------------------------------
  .method('$close', function () {

    this.$opened = null;
    this.$me.close.apply(this.$me, arguments);

    return this;
    
  })

  // ---------------------------------------------------------------------------
  .method('$createStore', function (name, options) {

    return new idbStore(this.$me.createObjectStore.apply(this.$me, arguments));
    
  })

  // ---------------------------------------------------------------------------
  .method('$dropStore', function (name) {

    this.$me.deleteObjectStore.apply(this.$me, arguments);

    return this;

  })

  // ---------------------------------------------------------------------------
  .method('$model', function (name, socket) {

    // Si existe el modelo retornarlo
    if(this.$_models[name]) return this.$_models[name];

    // Instanciar el modelo y guardarlo
    return this.$_models[name] = idbModel(this, name, socket || this.$socket);

  })

  // ---------------------------------------------------------------------------
  .method('$transaction', function (storeNames, mode) { const thiz = this;
    const args = arguments;

    return thiz.$open()
      .then(function (thiz) {
        return new idbTransaction(thiz.$me.transaction.apply(thiz.$me, args));
      });

  })
  
  // ---------------------------------------------------------------------------
  .method('$store', function (storeNames) { const thiz = this;
    if (!Array.isArray(storeNames)) storeNames = [storeNames];

    function action(mode) {
      return function (cb) {
        
        return thiz.$transaction(storeNames, mode)
          .then(function (tx) {
            const storesObj = {};
            const stores = storeNames.map(function (storeName) {
              return storesObj[storeName] = tx.$store(storeName);
            });
            if (cb) cb.apply(thiz, stores);
            return storesObj;
          });

      };
    }

    return new Clazzer({})
      .static('$reader', action(idbTransaction.TransactionMode.ReadOnly))
      .static('$writer', action(idbTransaction.TransactionMode.ReadWrite))
      .clazz

  })
  
  // ---------------------------------------------------------------------------
  .clazz;

}