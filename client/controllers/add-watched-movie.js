(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name watchedMovies.controller:
   * @description The dialog controller for adding a new movie to watched list
   * # AddWatchedMovieCtrl
   * Controller of the watchedMovies
   */
  function AddWatchedMovieCtrl($rootScope, $mdDialog, MovieService) {
    var vm = this;
    vm.$rootScope = $rootScope;
    vm.$mdDialog = $mdDialog;
    vm.load(MovieService.selected());
  }

  AddWatchedMovieCtrl.prototype.load = function (movie) {
    var vm = this;
    if (movie && _.has(movie, 'api_review')) {
      vm.movieReview = {
        review: movie.api_review,
        rate: movie.api_rate,
        watched: movie.api_watched,
        action: 'update'
      };
    }
  };

  AddWatchedMovieCtrl.prototype.newReview = function () {
    var vm = this;
    return (!_.isObject(vm.movieReview) || (vm.movieReview.action !== 'update'));
  };

  AddWatchedMovieCtrl.prototype.hide = function () {
    var vm = this;
    vm.$mdDialog.hide();
  };

  AddWatchedMovieCtrl.prototype.cancel = function () {
    var vm = this;
    vm.$mdDialog.cancel();
  };

  AddWatchedMovieCtrl.prototype.delete = function () {
    var vm = this;
    vm.movieReview.action = 'delete';
    vm.$mdDialog.hide(vm.movieReview);
  };

  AddWatchedMovieCtrl.prototype.add = function () {
    var vm = this;
    if (vm.movieReview.action !== 'update') {
      vm.movieReview.action = 'add';
    }
    vm.$mdDialog.hide(vm.movieReview);
  };

  angular
    .module('watchedMovies')
    .controller('AddWatchedMovieCtrl', ['$rootScope', '$mdDialog', 'MovieService', AddWatchedMovieCtrl]);
}());