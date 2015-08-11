(function () {
  'use strict';
  /**
   * @ngdoc service
   * @name watchedMovies.AuthService
   * @description
   * # AuthService
   * Factory in the watchedMovies module.
   */
  angular.module('watchedMovies')
    .factory('AuthService', ['$http', 'options', AuthService]);

  function AuthService($http, options) {
    window.$http = $http;
    var key,
      factory = {
        user: function () {
          return $http.get(options.api.user)
            .then(function (res) {
              if(_.isString(res.data) && _.contains(res.data, 'Please sign in')) {

              } else {

              }
              window.userInfo = res.data;
              return res.data;
            })
            .catch(function (err) {
              window.userInfoError = err;
              return err;
            });
        }
      };
    return factory;
  }
}());