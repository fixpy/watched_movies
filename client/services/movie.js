(function () {
  'use strict';
  /**
   * @ngdoc service
   * @name watchedMovies.MovieService
   * @description
   * # MovieService
   * Factory in the watchedMovies module.
   */
  angular.module('watchedMovies')
    .factory('MovieService', ['$http', 'options', MovieService]);

  function MovieService($http, options) {
    return {
      find: function () {
        return $http.get(options.api.movies);
      },
      findOnce: function (movieName) {
        return $http.get(options.api.movies + '/' + movieName);
      }
    };
  }
}());