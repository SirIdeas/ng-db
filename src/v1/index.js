'use strict';

// Globales
import Clazzer  from './Clazzer';

// Request
import idbRequest         from './idbRequest';
import idbOpenDBRequest   from './idbOpenDBRequest';

// Principales
import idb              from './idb';
import idbStore         from './idbStore';
import idbModel         from './idbModel';
import idbSocket        from './idbSocket';
import idbTransaction   from './idbTransaction';

import lb from './lb';

lb(angular.module('ng.v1.idb', []))
  
  .constant('io', io)
  .service('Clazzer', Clazzer)

  .constant('idbVersion', '0.0.1')
  
  .service('idbRequest', idbRequest)
  .service('idbOpenDBRequest', idbOpenDBRequest)
  .service('idb2', idb)
  .service('idbStore', idbStore)
  .service('idbModel2', idbModel)
  .service('idbSocket2', idbSocket)
  .service('idbTransaction', idbTransaction)

  .service('db2', function (idb2) { 'ngInject';

    const db = new idb2('aaa', 4);

    db.upgradeneeded(function (db, event) {
      console.log(['upgradeneeded', event])
    })

    .automigration({
      1: function (db) {
        var model = db
          .model('Trabajador')
          .setKeyPath('id')
          .setAutoIncrement(false)
          .createStore();

          console.log(['model', model.$id]);

        return 
          // .keyPath('id')
          // .autoIncrement(false)
          // .create()
          // .versioning(function (versioning) {
          //   versioning.createStore();
          // });
      }
    });

    db.drop().then(function () {
      console.log(['drop', event]);
      db.open().then(function () {
        console.log(['open', event]);
      });
    });

    return db;
    
  })

  .run(function (db2) { 'ngInject';

  });
