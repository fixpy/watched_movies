(function () {
  'use strict';
  /**
   * @ngdoc service
   * @name watchedMovies.AuthInterceptor
   * @description
   * # AuthInterceptor
   * Factory in the watchedMovies module.
   */
  function AuthInterceptor($q) {
    return {
      response: function (response) {
        if (_.isString(response.data) && _.contains(response.data, 'Please sign in')) {
          location.assign('/auth/login');
        }
        return response || $q.when(response);
      }
    };
  }

  angular.module('watchedMovies')
    .factory('AuthInterceptor', ['$q', AuthInterceptor]);
}());