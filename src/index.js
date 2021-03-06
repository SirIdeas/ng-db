'use strict';

// Globales
import Clazzer  from './Clazzer';

// Services
import idbRequest         from './services/idbRequest';
import idbOpenDBRequest   from './services/idbOpenDBRequest';
import idbConsultant      from './services/idbConsultant';
import idb                from './services/idb';
import idbStore           from './services/idbStore';
import idbIndex           from './services/idbIndex';
import idbEventTarget     from './services/idbEventTarget';
import idbModel           from './services/idbModel';
import idbTransaction     from './services/idbTransaction';
import idbQuery           from './services/idbQuery';
import idbSocket          from './services/idbSocket';

import lb from './lb';

lb(angular.module('ng.idb', []))
  
  .constant('io', io)
  .service('Clazzer', Clazzer)

  .constant('idbVersion', '0.0.1')
  
  .service('idbRequest', idbRequest)
  .service('idbOpenDBRequest', idbOpenDBRequest)
  .service('idbConsultant', idbConsultant)
  .service('idb', idb)
  .service('idbStore', idbStore)
  .service('idbIndex', idbIndex)
  .service('idbEventTarget', idbEventTarget)
  .service('idbModel', idbModel)
  .service('idbSocket', idbSocket)
  .service('idbQuery', idbQuery)
  .service('idbTransaction', idbTransaction)

//   .service('socket', function(idbSocket, API_ROOT) { 'ngInject'
  
//     return new idbSocket(
//       'http://localhost:3200/',
//       localStorage['$LoopBack$accessTokenId'],
//       localStorage['$LoopBack$currentUserId']
//     );

//   })

//   .service('db2', function (idb, socket) { 'ngInject';

//     const db = new idb('aaa', 4, socket)

//     db
//       .$bind('opened', function () { console.log(['$opened']); })
//       .$aborted(function () { console.log(['$aborted']); })
//       .$closed(function () { console.log(['$closed']); })
//       .$error(function () { console.log(['$error']); })
//       .$versionChanged(function () { console.log(['$versionChanged']); })

//       .$automigration({
//         1: function (db) {
//           db.$model('Trabajador')
//             .$create()
//         },
//         2: function (db) {
//           db.$model('Empleado')
            
//             .$addIndex(['nombres', 'apellidos'])
//             .$addIndex('nacimiento')

//             .$create(function (model, store) {

//               store.$createIndex('ci');
//               store.$createIndex('cod');

//             })
//         },
//         3: function (db) {
//           db.$model('Trabajador')
//             .$drop()
//         }
//       })

//       .$drop().then(function (db) {
//         db.$open();
//       });

//     return db;
    
//   })

//   .service('Empleado', function (db2) { 'ngInject';
//     return window.Empleado = db2.$model('Empleado')
//       .$field('cod',        { "type": "string", "required": true })
//       .$field('ci',         { "type": "string", "required": true })
//       .$field('nombres',    { "type": "string", "required": true })
//       .$field('apellidos',  { "type": "string", "required": true })
//       .$field('nacimiento', { "type": "date" })
//       .$field('ingreso',    { "type": "date" })
//       .$field('direccion',  { "type": "string"})
//       .$remote(
//         '/trabajadores/:id',
//         { 'id': '@id' },
//         {
//           'find':   { url: '/trabajadores/_findWithVersion', method: 'GET', isArray: true, },
//           // 'create': { url: '/trabajadores', method: 'POST', },
//         }
//       )
//       // .versioning()
//       .$build(function (Empleado) {

//         Empleado.prototype.$constructor = function (data) {

//         };

//         Empleado.prototype.getNombre = function (){
//           return this.nombres + ' ' + this.apellidos;
//         };

//       });
//   })

// .run(function (db2, Empleado) { 'ngInject';

//   Empleado.$put({
//     id: 1,
//     'nombres': 'Alexander'
//   }).then(function (record) {
//     //
//     console.log(['put', record.nombres]);
//   }).then(function () {
//     return Empleado.$put({
//       id: 2,
//       'nombres': 'Guillemo'
//     }).then(function (record) {
//       console.log(['put', record.nombres]);
//     });
//   }).then(function () {
//     return Empleado.$put({
//       id: 2,
//       'apellidos': 'Seminario'
//     }).then(function (record) {
//       console.log(['put', record.nombres]);
//     });
//   }).then(function () {
//     return Empleado.$put({
//       id: 4,
//       'nombres': 'Axel'
//     }).then(function (record) {
//       console.log(['put', record.nombres]);
//     });
//   }).then(function () {
//     return Empleado.$put({
//       'nombres': 'Gabriel'
//     }).then(function (record) {
//       console.log(['put', record.nombres]);
//     });
//   }).then(function () {
//     return Empleado.$add({
//       'nombres': 'Evert'
//     }).then(function (record) {
//       console.log(['put', record.nombres]);
//     });
//   }).then(function () {
//     const r = Empleado.$get(2);
//     console.log(['get', r])
//     return r.$promise;
//   }).then(function () {
//     const r = Empleado.$find().$getResult();
//     console.log(['find', r]);
//     return r.$promise;
//   }).then(function () {
//     const r = Empleado.$getAll();
//     console.log(['getAll', r]);
//     return r.$promise;
//   }).then(function () {
//     return Empleado.$count().then(function (count) {
//       console.log(['count', count]);
//     });
//   }).then(function () {
//     const r = Empleado.$getAllKeys();
//     console.log(['getAllKeys', r]);
//     return r.$promise;
//   }).then(function () {
//     return Empleado.$delete(2).then(function () {
//       console.log(['delete']);
//     });
//   }).then(function () {
//     return Empleado.$count().then(function (count) {
//       console.log(['count', count]);
//     });
//   }).then(function () {
//     return Empleado.$clear().then(function () {
//       console.log(['clear']);
//     });
//   }).then(function () {
//     return Empleado.$count().then(function (count) {
//       console.log(['count', count]);
//     });
//   }).then(function () {
//     db2.$close();
//   }).then(function () {
//     db2.$open().then(function () {
//       db2.$close();
//     });
//   });

// });
