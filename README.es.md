# ng-idb

Paquete Bower para usar archivos assets de forma offline descargando estos en el sistema de archivos local mediante la [Api para Archivos de HTML5](https://dev.w3.org/2009/dap/file-system/file-dir-sys.html).

## Dependencias

* AngularJS

## Instalación

Bower:

```
$ bower install ng-idb
```

O puedes descargar el paquete [aquí](https://codeload.github.com/arondn2/ng-idb/zip/master).

Agrega el archivo javascript al html, por ejemplo:

```html
<script src="ng-idb/ng-idb.js"></script>
```

Finalmente, debes agregar `ng.idb` a tu módulo de dependencias:

```javascript
angular.module('app', ['ng.idb'])
```

## Versiones del README
[Español](README.es.md)
[Inglés](README.md)

## Licencia
Liberado bajo [la licencia MIT](https://github.com/arondn2/ng-idb/blob/master/LICENSE)
