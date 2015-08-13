(function () {
  'use strict';
  /**
   * @ngdoc service
   * @name watchedMovies.AuthService
   * @description
   * # AuthService
   * Factory in the watchedMovies module.
   */
  function AuthService($http, options) {
    var factory = {
      user: function () {
        return $http.get(options.api.user)
          .then(function (res) {
            return res.data;
          });
      }
    };
    return factory;
  }

  angular.module('watchedMovies')
    .factory('AuthService', ['$http', 'options', AuthService]);
}());