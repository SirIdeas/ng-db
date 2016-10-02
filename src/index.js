'use strict';

import * as $ngDbUtils from './utils/validations';
import $ngDbEvents from './utils/events';

import iDbServiceFactory from './services/idb';

angular.module('ngDb', [])
  .constant('NG_DB_VERSION', '0.0.1')
  .service('$ngDbUtils', function () { return $ngDbUtils; })
  .service('$ngDbEvents', function () { return $ngDbEvents; })
  .service('$iDb', iDbServiceFactory(angular));
