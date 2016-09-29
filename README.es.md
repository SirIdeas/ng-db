# ng-db

Paquete Bower para usar archivos assets de forma offline descargando estos en el sistema de archivos local mediante la [Api para Archivos de HTML5](https://dev.w3.org/2009/dap/file-system/file-dir-sys.html).

## Demo
[Demo](https://sirideas.github.io/ng-db)

## Dependencias

* AngularJS

## Instalación

Bower:

```
$ bower install ng-db
```

O puedes descargar el paquete [aquí](https://codeload.github.com/SirIdeas/ng-db/zip/master).

Agrega el archivo javascript al html, por ejemplo:

```html
<script src="ng-db/ng-db.js"></script>
```

Finalmente, debes agregar `ngOfflineAssets` a tu módulo de dependencias:

```javascript
angular.module('app', ['ngOfflineAssets'])
```

## Versiones del README
[Inglés](README.md)
[Español](README.es.md)

## Licencia
Liberado bajo [la licencia MIT](https://github.com/SirIdeas/ng-db/blob/master/LICENSE)
