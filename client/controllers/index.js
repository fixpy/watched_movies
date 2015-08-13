(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name watchedMovies.controller:IndexCtrl
   * @description The root controller used in index.html
   * # IndexCtrl
   * Controller of the watchedMovies
   */
  function IndexCtrl($rootScope, $location, $q, MetacriticAPIService, $mdBottomSheet, $mdSidenav, MovieService, AuthService) {
    var vm = this;
    //dependencies
    vm.$mdBottomSheet = $mdBottomSheet;
    vm.$mdSidenav = $mdSidenav;
    vm.$rootScope = $rootScope;
    vm.$q = $q;
    vm.MetacriticAPIService = MetacriticAPIService;
    vm.MovieService = MovieService;
    vm.AuthService = AuthService;

    //properties
    var collection = 'lastYear',
      collections = {
        lastDecade: 'The Best Of The Decade',
        lastYear: 'The Best Of The Year',
        comingSoon: 'New Movies Coming Soon',
        newReleases: 'New Movie Releases',
        reviewed: 'My Review List',
        watched: 'My Watched Movies'
      };
    vm.setTitle = function () {
      if (vm.collection) {
        vm.title = collections[vm.collection];
      }
    };

    vm.selected = null;
    vm.loaderVisible = false;
    vm.collection = null;
    vm.title = '';
    vm.reviewEnabled = false;

    vm.showReviewDialog = function (event) {
      $rootScope.$broadcast('movie:review', event);
    };

    vm.setMovies = function (movies) {
      vm.movies = movies;
      if (vm._movieName === '*' && _.isObject(vm.movies[0]) && vm.movies[0].name) {
        location.assign('/#/' + vm.collection + '/' + vm.movies[0].name);
      }
    };

    vm.loadCollection = function (collectionName, name) {
      vm.collection = collectionName;
      vm._movieName = name || '*';
      vm.setTitle();
      vm.load();
    };

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      if (toParams.collection && toParams.name && (vm.collection !== toParams.collection)) {
        vm.loadCollection((toParams.collection || collection), toParams.name);
      }
    });

    $rootScope.$on('movie:update', function (event, collectionName) {
      vm.loadCollection(collectionName);
    });

    vm.movieName = function () {
      var movie = MovieService.selected();
      if (_.isObject(movie)) {
        return movie.name;
      }
      return '*';
    };

    $rootScope.$watch(vm.movieName, function (name) {
      vm.reviewEnabled = (name !== '*');
    });

    if ($location.path() === '' || $location.path() === '/') {
      vm.collection = collection;
      vm._movieName = '*';
      vm.setTitle();
      vm.load();
    }

    vm.loadUser();
  }

  IndexCtrl.prototype.listIsEmpty = function () {
    var vm = this;
    return (vm.MovieService.isLocal(vm.collection) && _.isArray(vm.movies) && !vm.movies.length);
  };

  IndexCtrl.prototype.userDisplayName = function () {
    var vm = this;
    return (_.isObject(vm.user) && (vm.user.display_name || vm.user.username));
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
        location.assign('/auth/logout');
      });
  };

  IndexCtrl.prototype.load = function () {
    var vm = this;
    vm.movies = null;
    vm
      .MovieService
      .find(vm.collection)
      .then(vm.setMovies)
      .catch(function (err) {
        console.error('An error happened while loading movies:', err);
      });
  };

  IndexCtrl.prototype.getIcon = function (movie) {
    var vm = this;
    return vm.MovieService.getIcon(movie);
  };

  IndexCtrl.prototype.toggleList = function () {
    var vm = this,
      pending = vm.$mdBottomSheet.hide() || vm.$q.when(true);
    pending.then(function () {
      vm.$mdSidenav('left').toggle();
    });
  };

  angular
    .module('watchedMovies')
    .controller('IndexCtrl', ['$rootScope', '$location', '$q', 'MetacriticAPIService', '$mdBottomSheet', '$mdSidenav', 'MovieService', 'AuthService', IndexCtrl]);
}());