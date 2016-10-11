'use strict';

import ngDbUtils from './utils/ngDbUtils';
import ngDbEvents from './utils/events';
import qs from './utils/qs';

import iDb from './services/iDb';
import iModel from './services/iModel';
import iLoopBackResource from './services/iLoopBackResource';

angular.module('ngDb', [])
  .constant('NG_DB_VERSION', '0.0.1')
  .provider('iLoopBackResource', iLoopBackResource)
  .service('$ngDbEvents', function () { return ngDbEvents; })
  .service('$ngDbUtils', ngDbUtils)
  .service('$qs', qs)
  .service('$iDb', iDb)
  .service('$iModel', iModel);
