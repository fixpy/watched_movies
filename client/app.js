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
  var options = {
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
      movies: '/api/movies',
      watched: '/api/movies/watched'
    },
    genres: [
      'All', 'Adventure', 'Drama', 'Fantasy', 'Comedy', 'Animation',
      'Family', 'Action', 'Sci-Fi', 'Thriller', 'Sport', 'Crime',
      'Music', 'History', 'Horror', 'Documentary', 'Romance'
    ]
  };
  angular
    .module('watchedMovies', [
      'ngMaterial',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ui.router',
      'angularjs-gravatardirective'
    ])
    .value('options', options)
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$mdIconProvider',
      function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {
        $urlRouterProvider
          .otherwise('/');

        $stateProvider
          .state('watched', {
            url: '/:collection/:name',
            templateUrl: 'views/movie.html'
          });

        function defineGenresIcons(iconProvider) {
          _.each(options.genres, function (genre) {
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

        /*
         * Supported palettes:
         *   red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green, light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
         */
        $mdThemingProvider.theme('default')
          .primaryPalette('light-blue')
          .accentPalette('blue');
      }
    ])
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
      $httpProvider.interceptors.push('HttpInterceptor');
    });
}());