(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name watchedMovies.controller:IndexCtrl
   * @description The root controller used in index.html
   * # IndexCtrl
   * Controller of the watchedMovies
   */
  angular
    .module('watchedMovies')
    .controller('IndexCtrl', ['$scope', '$rootScope', '$q', '$stateParams', 'MetacriticAPIService', '$mdDialog', '$mdBottomSheet', '$mdSidenav', IndexCtrl]);

  function IndexCtrl($scope, $rootScope, $q, $stateParams, MetacriticAPIService, $mdDialog, $mdBottomSheet, $mdSidenav) {
    this.$stateParams = $stateParams;
    this.$mdDialog = $mdDialog;
    this.$mdBottomSheet = $mdBottomSheet;
    this.$mdSidenav = $mdSidenav;
    this.$rootScope = $rootScope;
    this.$q = $q;
    this.MetacriticAPIService = MetacriticAPIService;

    this.movies = [];

    this.selected = null;

    this.load();
  }

  IndexCtrl.prototype.load = function () {
    var that = this;

    that
      .MetacriticAPIService
      .lastDecade()
      .then(function (movies) {
        that.movies = movies;
      })
      .catch(function (err) {
        console.error('An error happened while loading movies:', err);
      });
  };

  IndexCtrl.prototype.toggleList = function () {
    var that = this,
      pending = that.$mdBottomSheet.hide() || that.$q.when(true);

    pending.then(function () {
      that.$mdSidenav('left').toggle();
    });
  };

  IndexCtrl.prototype.showAddDialog = function (e) {
    var that = this;

    this.$mdDialog.show({
      templateUrl: 'views/add-watched-movie.html',
      parent: angular.element(document.body),
      targetEvent: e,
    })
      .then(function (movieReview) {
        console.log('movieReview:', movieReview);
        that.addWatchedMovie(movieReview);
      }, function () {
        console.log('You cancelled the dialog.');
      });
  };

  IndexCtrl.prototype.addWatchedMovie = function (movieReview) {
    var that = this;

    console.log('>>movieReview:', movieReview);
  };

  IndexCtrl.prototype.selectMovie = function (movie) {
    var that = this;

    that.selected = movie;

  };
}());