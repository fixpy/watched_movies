(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name watchedMovies.controller:MovieCtrl
   * @description The root controller used in index.html
   * # MovieCtrl
   * Controller of the watchedMovies
   */
  angular
    .module('watchedMovies')
    .controller('MovieCtrl', ['$scope', '$rootScope', '$q', '$sce', '$stateParams', 'MetacriticAPIService', 'MovieService', '$mdDialog', MovieCtrl]);

  function MovieCtrl($scope, $rootScope, $q, $sce, $stateParams, MetacriticAPIService, MovieService, $mdDialog) {
    var vm = this;
    window.vm = this;

    this.$mdDialog = $mdDialog;
    vm.MovieService = MovieService;
    vm.MetacriticAPIService = MetacriticAPIService;

    vm.movie = null;
    vm.loading = false;
    vm.movieUrl = null;

    vm.collection = $stateParams.collection;
    vm.name = $stateParams.name;

    vm.selectMovie = function (movie) {
      vm.movie = movie;
      MovieService.selected(movie);
      vm.movieUrl = $sce.trustAsResourceUrl(movie.url);
      vm.loading = false;
    };

    vm.load();

    $rootScope.$on('movie:add', function (event, e) {
      vm.showAddDialog(e);
    });
  }

  MovieCtrl.prototype.load = function () {
    var vm = this;
    if (vm.name !== '*') {
      vm.loading = true;

      vm
        .MovieService
        .findMovieByName(vm.collection, vm.name)
        .then(vm.selectMovie);
    }
  };

  MovieCtrl.prototype.showAddDialog = function (e) {
    var vm = this;

    this.$mdDialog.show({
      templateUrl: 'views/add-watched-movie.html',
      parent: angular.element(document.body),
      targetEvent: e,
    })
      .then(function (review) {
        vm.addWatchedMovie(review);
      }, function () {
        console.log('You cancelled the dialog.');
      });
  };

  MovieCtrl.prototype.addWatchedMovie = function (review) {
    var vm = this,
      movieReview = _.clone(vm.MovieService.selected());

    movieReview.api_collection = vm.collection;
    movieReview.api_review = review.review;
    movieReview.api_rate = review.rate;
    movieReview.api_watched = review.watched;

    return vm
      .MovieService
      .add(movieReview);
  };
}());