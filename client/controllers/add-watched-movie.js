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
    .controller('AddWatchedMovieCtrl', ['$rootScope', '$mdDialog', AddWatchedMovieCtrl]);

  function AddWatchedMovieCtrl($rootScope, $mdDialog) {
    this.$rootScope = $rootScope;
    this.$mdDialog = $mdDialog;
    this.rates = [1, 2, 3, 4, 5];
  }

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