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
    .controller('IndexCtrl', ['$rootScope', '$location', '$q', 'MetacriticAPIService', '$mdBottomSheet', '$mdSidenav', 'MovieService', 'AuthService', IndexCtrl]);

  function IndexCtrl($rootScope, $location, $q, MetacriticAPIService, $mdBottomSheet, $mdSidenav, MovieService, AuthService) {
    var vm = this;
    window.ul = this;
    window.$location = $location;

    //dependencies
    vm.$mdBottomSheet = $mdBottomSheet;
    vm.$mdSidenav = $mdSidenav;
    vm.$rootScope = $rootScope;
    vm.$q = $q;
    vm.MetacriticAPIService = MetacriticAPIService;
    vm.MovieService = MovieService;
    vm.AuthService = AuthService;

    //properties
    var collection = 'lastYear';
    vm.selected = null;
    vm.loaderVisible = false;
    vm.collection = null;

    vm.showAddDialog = function (event) {
      $rootScope.$broadcast('movie:add', event);
    };

    vm.setMovies = function (movies) {
      vm.movies = movies;
      if (vm.movieName === '*' && _.isObject(ul.movies[0]) && ul.movies[0].name) {
        location.assign('/#/' + vm.collection + '/' + ul.movies[0].name);
      }
    };

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      if (toParams.collection && toParams.name && (vm.collection !== toParams.collection)) {
        vm.collection = toParams.collection || collection;
        vm.movieName = toParams.name;
        vm.load();
      }
    });

    if ($location.path() === '/') {
      vm.collection = collection;
      vm.movieName = '*';
      vm.load();
    }

    vm.loadUser();
  }

  IndexCtrl.prototype.watchedListIsEmpty = function () {
    var vm = this;

    return (vm.collection === 'watched' && _.isArray(vm.movies) && !vm.movies.length);
  };

  IndexCtrl.prototype.loadUser = function () {
    var vm = this;

    vm.user = {};
    vm
      .AuthService
      .user()
      .then(function (user) {
        vm.user = user;
      })
      .catch(function (err) {
        console.error('An error happened while loading user info:', err);
      });
  };

  IndexCtrl.prototype.load = function () {
    var vm = this;

    vm.movies = null;

    if (vm.MetacriticAPIService.isMetacritic(vm.collection)) {
      vm
        .MetacriticAPIService
        .findCollection(vm.collection)
        .then(vm.setMovies)
        .catch(function (err) {
          console.error('An error happened while loading movies:', err);
        });
    } else if (vm.collection === 'watched') {
      vm.loadWatchedMovies();
    }
  };

  IndexCtrl.prototype.loadWatchedMovies = function () {
    var vm = this;

    vm.MovieService
      .find()
      .then(vm.setMovies);
  };

  IndexCtrl.prototype.getIcon = function (movie) {
    return this.MovieService.getIcon(movie);
  };

  IndexCtrl.prototype.toggleList = function () {
    var vm = this,
      pending = vm.$mdBottomSheet.hide() || vm.$q.when(true);

    pending.then(function () {
      vm.$mdSidenav('left').toggle();
    });
  };
}());