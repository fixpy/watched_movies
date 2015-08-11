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
      api: {
        user: '/user',
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
        var allGenres = ['All', 'Adventure', 'Drama', 'Fantasy', 'Comedy', 'Animation', 'Family', 'Action',
          'Sci-Fi', 'Thriller', 'Sport', 'Crime',
          'Music', 'History', 'Horror',
          'Documentary', 'Romance'
        ];

        function defineGenresIcons(iconProvider) {
          _.each(allGenres, function (genre) {
            iconProvider = iconProvider.icon(genre, './styles/svg/genres/' + genre + '.svg');
          });
          return iconProvider;
        }

        // couple of sample svg icons borrowed from google
        var iconProvider = $mdIconProvider
          .defaultIconSet("./styles/svg/avatars.svg", 128)
          .icon("menu", "./styles/svg/menu.svg", 24)
          .icon("share", "./styles/svg/share.svg", 24)
          .icon("google_plus", "./styles/svg/google_plus.svg", 512)
          .icon("hangouts", "./styles/svg/hangouts.svg", 512)
          .icon("twitter", "./styles/svg/twitter.svg", 512)
          .icon("phone", "./styles/svg/phone.svg", 512);

        defineGenresIcons(iconProvider);

        $mdThemingProvider.theme('default')
          .primaryPalette('light-blue')
          .accentPalette('blue');
        /*
        red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green, light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
        */
      }
    ])
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
      $httpProvider.interceptors.push('HttpInterceptor');
    });
}());