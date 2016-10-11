'use strict';

export default function iLoopBackResourceProvider() { 'ngInject'; let thiz = this;

  function getHost(url) {
    let m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
    return m ? m[1] : null;
  }

  let options = {
    urlBase: "/api",
    authHeader: 'authorization',
  };

  options.urlBaseHost = getHost(options.urlBase) || location.host;

  /**
   * @ngdoc method
   * @name lbServices.iLoopBackResourceProvider#setAuthHeader
   * @methodOf lbServices.iLoopBackResourceProvider
   * @param {string} header The header name to use, e.g. `X-Access-Token`
   * @description
   * Configure the REST transport to use a different header for sending
   * the authentication token. It is sent in the `Authorization` header
   * by default.
   */
  thiz.setAuthHeader = function(header) {
    options.authHeader = header;
  };

  /**
   * @ngdoc method
   * @name lbServices.iLoopBackResourceProvider#getAuthHeader
   * @methodOf lbServices.iLoopBackResourceProvider
   * @description
   * Get the header name that is used for sending the authentication token.
   */
  thiz.getAuthHeader = function() {
    return options.authHeader;
  };

  /**
   * @ngdoc method
   * @name lbServices.iLoopBackResourceProvider#setUrlBase
   * @methodOf lbServices.iLoopBackResourceProvider
   * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
   * @description
   * Change the URL of the REST API server. By default, the URL provided
   * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
   */
  thiz.setUrlBase = function(url) {
    options.urlBase = url;
    options.urlBaseHost = getHost(options.urlBase) || location.host;
  };

  /**
   * @ngdoc method
   * @name lbServices.iLoopBackResourceProvider#getUrlBase
   * @methodOf lbServices.iLoopBackResourceProvider
   * @description
   * Get the URL of the REST API server. The URL provided
   * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
   */
  thiz.getUrlBase = function() {
    return options.urlBase;
  };

  thiz.$get = function($resource) { 'ngInject';

    let iLoopBackResource = function(url, params, actions, opts) {
      opts = angular.extend({}, options, opts || {});

      Object.keys(actions).map(function (key) {
        actions[key].originalUrl = actions[key].url;
        actions[key].url = opts.urlBase + actions[key].url;
      });

      let resource = $resource(opts.urlBase + url, params, actions);

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

    iLoopBackResource.getUrlBase = function() {
      return options.urlBase;
    };

    iLoopBackResource.getAuthHeader = function() {
      return options.authHeader;
    };

    return iLoopBackResource;

  };
}