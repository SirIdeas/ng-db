'use strict';

// Globales
import Clazzer  from './Clazzer';

// Request
import idbRequest         from './idbRequest';
import idbOpenDBRequest   from './idbOpenDBRequest';

// Principales
import idb              from './idb';
import idbStore         from './idbStore';
import idbEventTarget   from './idbEventTarget';
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
  .service('idbEventTarget', idbEventTarget)
  .service('idbModel2', idbModel)
  .service('idbSocket2', idbSocket)
  .service('idbTransaction', idbTransaction)

  .service('db2', function (idb2) { 'ngInject';

    const db = new idb2('aaa', 4)

    db.$automigration({
      1: function (db) {
        var model = db
          .$model('Trabajador')
          .$createStore();
      }
    })

    .$drop().then(function (db) {
      db.$open().then(function (event) {
        console.log(['opened']);
      });
    });

    return db;
    
  })

  .service('Trabajador2', function (db2) { 'ngInject';
    return window.Trabajador2 = db2.$model('Trabajador')
      .$field('cod',        { "type": "string", "required": true })
      .$field('ci',         { "type": "string", "required": true })
      .$field('nombres',    { "type": "string", "required": true })
      .$field('apellidos',  { "type": "string", "required": true })
      .$field('nacimiento', { "type": "date" })
      .$field('ingreso',    { "type": "date" })
      .$field('direccion',  { "type": "string"})
      .$remote(
        '/trabajadores/:id',
        { 'id': '@id' },
        {
          'find':   { url: '/trabajadores/_findWithVersion', method: 'GET', isArray: true, },
          // 'create': { url: '/trabajadores', method: 'POST', },
        }
      )
      // .versioning()
      .$build(function (Trabajador) {

        Trabajador.prototype.$constructor = function (data) {

        };

        Trabajador.prototype.getNombre = function (){
          return this.nombres + ' ' + this.apellidos;
        };

      });
  })

  .run(function (db2, Trabajador2) { 'ngInject';
    const t = new Trabajador2();
    t.nombres = 'Alexander';
    t.apellidos = 'Rondon';
    console.log(t.$getValues());
    console.log(t.getNombre());

    Trabajador2.$put({
      id: 1,
      'nombres': 'Alexander'
    });

    Trabajador2.$put({
      id: 2,
      'nombres': 'Guillemo'
    });

    Trabajador2.$put({
      id: 2,
      'apellidos': 'Seminario'
    });

    Trabajador2.$put({
      id: 4,
      'nombres': 'Axel'
    });

    Trabajador2.$put({
      'nombres': 'Gabriel'
    });

    window.r = Trabajador2.$get(2);

    r.$promise
    .then(function (record) {
      console.log(['then', record])
    })
    .catch(function (event) {
      console.error(event)
    })

  });
