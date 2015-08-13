(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name watchedMovies.controller:MovieCtrl
   * @description A controller to show Movie information
   * # MovieCtrl
   * Controller of the watchedMovies
   */
  function MovieCtrl($rootScope, $timeout, $q, $sce, $stateParams, MovieService, $mdDialog) {
    var vm = this;
    //dependencies
    vm.$mdDialog = $mdDialog;
    vm.$timeout = $timeout;
    vm.$rootScope = $rootScope;
    vm.$q = $q;
    vm.MovieService = MovieService;

    //properties
    vm.actions = {
      'delete': 'Review has been successfuly deleted!',
      'add': 'A new review has been successfuly added!',
      'update': 'Review has been successfuly updated!'
    };
    vm.movie = null;
    vm.loading = false;
    vm.movieUrl = null;
    vm._movieUrl = null;
    vm.collection = $stateParams.collection;
    vm.name = $stateParams.name;

    vm.selectMovie = function (movie) {
      vm.movie = movie;
      if (movie) {
        MovieService.selected(movie);
        vm._movieUrl = $sce.trustAsResourceUrl(movie.url);
      } else {
        $rootScope.$broadcast('movie:update', vm.collection);
      }
      vm.loading = false;
    };

    vm.hideMessage = function () {
      $timeout(function () {
        vm.message = '';
      }, 2000);
    };

    vm.showMessage = function (message) {
      vm.message = message;
      vm.hideMessage();
    };

    vm.load();

    $rootScope.$on('movie:review', function (event, e) {
      vm.showReviewDialog(e);
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

  MovieCtrl.prototype.showReviewDialog = function (e) {
    var vm = this;
    if (!vm.MovieService.dialogIsOpen()) {
      vm.MovieService.dialogIsOpen(true);
      vm.$mdDialog.show({
        templateUrl: 'views/add-watched-movie.html',
        parent: angular.element(document.body),
        targetEvent: e,
      })
        .then(function (review) {
          vm.MovieService.dialogIsOpen(false);
          vm.action(review);
        }, function () {
          vm.MovieService.dialogIsOpen(false);
          console.log('You cancelled the dialog.');
        });
    }
  };

  MovieCtrl.prototype.action = function (review) {
    var vm = this,
      movieReview = vm.MovieService.selected();

    if (review.action === 'delete') {
      delete movieReview.api_collection;
      delete movieReview.api_review;
      delete movieReview.api_rate;
      delete movieReview.api_watched;
    } else {
      movieReview.api_collection = vm.collection;
      movieReview.api_review = review.review;
      movieReview.api_rate = review.rate;
      movieReview.api_watched = review.watched;
    }
    if (!_.isFunction(vm.MovieService[review.action])) {
      vm.showMessage('Invalid action!');
      return vm.$q.reject('INVALID_ACTION');
    }
    return vm
      .MovieService[review.action](movieReview)
      .then(function () {
        vm.showMessage(vm.actions[review.action]);
        vm.MovieService.clearCache();
        if (vm.MovieService.isLocal(vm.collection)) {
          vm.$timeout(function () {
            // location.assign('/#/' + vm.collection + '/*');
            vm.$rootScope.$broadcast('movie:update', vm.collection);
          }, 1500);
        }
      })
      .catch(function () {
        vm.showMessage('[Review: ' + review.action + '] An error happened: ');
      });
  };

  MovieCtrl.prototype.toggleMoviePage = function () {
    var vm = this;
    if (vm.movieUrl) {
      vm.movieUrl = null;
    } else {
      vm.movieUrl = vm._movieUrl;
    }
  };

  angular
    .module('watchedMovies')
    .controller('MovieCtrl', ['$rootScope', '$timeout', '$q', '$sce', '$stateParams', 'MovieService', '$mdDialog', MovieCtrl]);
}());