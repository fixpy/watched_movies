(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name watchedMovies.controller:
   * @description The dialog controller for adding a new movie to watched list
   * # AddWatchedMovieCtrl
   * Controller of the watchedMovies
   */
  angular
    .module('watchedMovies')
    .controller('AddWatchedMovieCtrl', ['$rootScope', '$mdDialog', 'MovieService', AddWatchedMovieCtrl]);

  function AddWatchedMovieCtrl($rootScope, $mdDialog, MovieService) {
    this.$rootScope = $rootScope;
    this.$mdDialog = $mdDialog;

    this.load(MovieService.selected());
  }

  AddWatchedMovieCtrl.prototype.load = function (movie) {
    if(movie && _.has(movie, 'api_review')){
      this.movieReview = {
        review: movie['api_review'],
        rate: movie['api_rate']
      };
    }
  };

  AddWatchedMovieCtrl.prototype.hide = function () {
    this.$mdDialog.hide();
  };

  AddWatchedMovieCtrl.prototype.cancel = function () {
    this.$mdDialog.cancel();
  };

  AddWatchedMovieCtrl.prototype.ok = function () {
    this.$mdDialog.hide(this.movieReview);
  };
}());