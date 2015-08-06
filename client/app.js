(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name watchedMovies
   * @description
   * # watchedMovies
   *
   * Main module of the application.
   */
  angular
    .module('watchedMovies', [
      'ngMaterial',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ui.router',
    ])
    .value('options', {
      metacritic: {
        key: '/metacritic/mashape_key',
        movies: {
          serach: 'https://metacritic-2.p.mashape.com/search/movie',
          comingSoon: 'https://metacritic-2.p.mashape.com/movie-list/coming-soon',
          newReleases: 'https://metacritic-2.p.mashape.com/movie-list/new-releases'
        }
      },
      api:{
        movies: '/api/v1.0/movies'
      }
    })
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$mdIconProvider',
      function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {
        $urlRouterProvider
          .otherwise('/');

        $stateProvider
          .state('movies', {
            url: '/movies',
            templateUrl: 'views/index.html'
          });
          // .state('movies.search', {
          //   url: '/:name',
          //   templateUrl: 'views/index.html'
          // })
          // .state('company', {
          //   url: '/company/:company',
          //   templateUrl: 'views/orders.html'
          // });

        // couple of sample svg icons borrowed from google
        $mdIconProvider
          .defaultIconSet("./styles/svg/avatars.svg", 128)
          .icon("menu", "./styles/svg/menu.svg", 24)
          .icon("share", "./styles/svg/share.svg", 24)
          .icon("google_plus", "./styles/svg/google_plus.svg", 512)
          .icon("hangouts", "./styles/svg/hangouts.svg", 512)
          .icon("twitter", "./styles/svg/twitter.svg", 512)
          .icon("phone", "./styles/svg/phone.svg", 512);

        $mdThemingProvider.theme('default')
          .primaryPalette('brown')
          .accentPalette('red');
      }
    ]);
}());