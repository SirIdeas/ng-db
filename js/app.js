'use strict';

angular.module('demo', ['ngDb'])

// Definicion de la Base de datos
.service('db', function ($iDb) { 'ngInject'

  var db = new $iDb('demo');

  db.onOpenSuccess(function(){ console.log('onOpenSuccess', arguments) })
    .onOpenError(function(){ console.log('onOpenSuccess', arguments) })
    .onUpgrateNeeded(function(){ console.log('onUpgrateNeeded', arguments); })
    .onError(function(){ console.log('error', arguments) })

  db.$open()
    .then(function () { console.log('openend');})
    .catch(function () { console.log('error'); });

  db.onUpgrateNeeded(function ($event, $dbInstance) {

    if ($event.oldVersion < 1) {

      db.$model('Genre')
        .$id({ keyPath: 'id' })
        .$create()
        .$index('by_nombre', 'nombre', {unique: true})
        .$index('by_descripcion', 'descripcion');

    }
    console.log(event.oldVersion, $event, $dbInstance);

  });

  return db;

})

// Definicion de un modelo
.service('Genre', function (db) { 'ngInject';
  return db.$model('Genre').$build(function (Genre) {

    Genre.prototype.$$constructor = function (nombre) {
    };

  });
})

.run(function (db, Genre) {
  window.Genre = Genre;
  console.log(db);
});