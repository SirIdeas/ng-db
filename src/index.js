'use strict';

import iDb from './services/idb';

angular.module('ngDb', [])
  .constant('NG_DB_VERSION', '0.0.1')
  .service('iDbService', iDb);
