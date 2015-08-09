(function () {
  'use strict';
  /**
   * @ngdoc service
   * @name watchedMovies.MovieService
   * @description
   * # MovieService
   * Factory in the watchedMovies module.
   */
  angular.module('watchedMovies')
    .factory('MovieService', ['$http', 'options', MovieService]);

  var allGenres = ['All', 'Adventure', 'Drama', 'Fantasy', 'Comedy', 'Animation', 'Family', 'Action',
    'Sci-Fi', 'Thriller', 'Sport', 'Crime',
    'Music', 'History', 'Horror',
    'Documentary', 'Romance'
  ];

  function MovieService($http, options) {
    return {
      find: function () {
        return $http.get(options.api.movies);
      },
      findOnce: function (movieName) {
        return $http.get(options.api.movies + '/' + movieName);
      },
      defineGenresIcons: function (iconProvider) {
        _.each(allGenres, function (genre) {
          iconProvider = iconProvider.icon(genre, './styles/svg/genres/' + genre + '.svg', 64);
        });
        return iconProvider;
      },
      getIcon: function (movie) {
        if (!_.isObject(movie) || !_.isString(movie.genre)) {
          return 'All';
        }
        if (_.isString(movie.icon)) {
          return movie.icon;
        }
        var genres = movie.genre.split(','),
          icon;
        _.some(genres, function (genre) {
          if (_.contains(allGenres, genre)) {
            icon = genre;
            return true;
          }
        });
        if (!icon) {
          icon = 'All';
        }
        movie.icon = icon;
        return movie.icon;
      }
    };
  }
}());