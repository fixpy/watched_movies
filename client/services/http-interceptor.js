(function () {
  'use strict';
  /**
   * @ngdoc service
   * @name watchedMovies.HttpInterceptor
   * @description
   * # HttpInterceptor
   * Factory in the watchedMovies module.
   */
  angular.module('watchedMovies')
    .factory('HttpInterceptor', ['$injector', '$q', '$rootScope', HttpInterceptor]);

  function HttpInterceptor($injector, $q, $rootScope) {
    window.$injector = $injector;
    var active = 0,
      total = 0,
      done = 0;

    function info() {
      return {
        total: total,
        active: active,
        done: done
      };
    }
    return {
      request: function (config) {
        if (active === 0) {
          total = 0;
          done = 0;
        }
        active++;
        total++;
        $rootScope.$broadcast('loader:update', info());
        return config || $q.when(config);
      },
      response: function (response) {
        active--;
        done++;
        $rootScope.$broadcast('loader:update', info());
        return response || $q.when(response);
      },
      responseError: function (response) {
        active--;
        done++;
        $rootScope.$broadcast('loader:update', info());
        return $q.reject(response);
      }
    };
  }
}());