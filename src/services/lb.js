'use strict';

export default function lb (module) {

  // Dvuelve el host de una URL
  function getHost(url) {
    let m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
    return m ? m[1] : null;
  }

  let urlBaseHost = location.host;

  let lbAuth = function() { 'ngInject'
    const props = ['accessTokenId', 'currentUserId', 'rememberMe'];
    const propsPrefix = '$idb-lb$';
    
    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      try {
        const key = propsPrefix + name;
        if (value == null) value = '';
        storage[key] = value;
      } catch (err) {
        console.log('Cannot access local/session storage:', err);
      }
    }

    function load(name) {
      const key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }

    function lbAuth() { const thiz = this;

      props.forEach(function(name) {
        thiz[name] = load(name);
      });
      thiz.currentUserData = null;
    }

    lbAuth.prototype.save = function() { const thiz = this;
      let storage = thiz.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, thiz[name]);
      });
    };

    lbAuth.prototype.setUser = function(accessTokenId, userId, userData) { const thiz = this;
      thiz.accessTokenId = accessTokenId;
      thiz.currentUserId = userId;
      thiz.currentUserData = userData;
    };

    lbAuth.prototype.clearUser = function() { const thiz = this;
      thiz.accessTokenId = null;
      thiz.currentUserId = null;
      thiz.currentUserData = null;
    };

    lbAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new lbAuth();

  };

  let lbAuthRequestInterceptor = function($q, lbAuth) { 'ngInject';
    
    return {
      request: function(config) {
        // filter out external requests
        const host = getHost(config.url);
        if (host && host !== urlBaseHost) {
          return config;
        }

        if (lbAuth.accessTokenId) {
          config.headers[authHeader] = lbAuth.accessTokenId;
        } else if (config.__isGetCurrentUser__) {
          // Return a stub 401 error for User.getCurrent() when
          // there is no user logged in
          let res = {
            body: { error: { status: 401 }},
            status: 401,
            config: config,
            headers: function() { return undefined; },
          };
          return $q.reject(res);
        }
        return config || $q.when(config);
      },
    };

  };

  let lbResource = function() { 'ngInject'; const thiz = this;

    let options = {
      urlBase: "/api",
      authHeader: 'authorization',
    };

    urlBaseHost = getHost(options.urlBase) || location.host;

    /**
     * @ngdoc method
     * @name lbServices.lbResourceProvider#setAuthHeader
     * @methodOf lbServices.lbResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    thiz.setAuthHeader = function(header) {
      options.authHeader = header;
    },

    /**
     * @ngdoc method
     * @name lbServices.lbResourceProvider#getAuthHeader
     * @methodOf lbServices.lbResourceProvider
     * @description
     * Get the header name that is used for sending the authentication token.
     */
    thiz.getAuthHeader = function() {
      return options.authHeader;
    },

    /**
     * @ngdoc method
     * @name lbServices.lbResourceProvider#setUrlBase
     * @methodOf lbServices.lbResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    thiz.setUrlBase = function(url) {
      options.urlBase = url;
      urlBaseHost = getHost(options.urlBase) || location.host;
    },

    /**
     * @ngdoc method
     * @name lbServices.lbResourceProvider#getUrlBase
     * @methodOf lbServices.lbResourceProvider
     * @description
     * Get the URL of the REST API server. The URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    thiz.getUrlBase = function() {
      return options.urlBase;
    };

    thiz.$get = function($resource) { 'ngInject';

      let lbResource = function(url, params, actions) {

        Object.keys(actions).map(function (key) {
          actions[key].originalUrl = actions[key].url;
          actions[key].url = options.urlBase + actions[key].url;
        });

        let resource = $resource(options.urlBase + url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          let result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };

      lbResource.getUrlBase = function() {
        return options.urlBase;
      };

      lbResource.getAuthHeader = function() {
        return options.authHeader;
      };
    
      return lbResource;

    };

  }

  return module
    .factory('lbAuth', lbAuth)
    .provider('lbResource', lbResource)
    .factory('lbAuthRequestInterceptor', lbAuthRequestInterceptor)
    .config(['$httpProvider', function($httpProvider) { 'ngInject';
      $httpProvider.interceptors.push('lbAuthRequestInterceptor');
    }]);
}
