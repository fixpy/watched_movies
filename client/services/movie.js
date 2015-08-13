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
    .factory('MovieService', ['$http', '$q', 'options', 'MetacriticAPIService', MovieService]);

  function MovieService($http, $q, options, MetacriticAPIService) {
    var selected,
      reviewed,
      factory;

    factory = {
      find: function () {
        return $http
          .get(options.api.movies)
          .then(function (response) {
            reviewed = response.data;
            return reviewed;
          });
      },
      add: function (newMovie) {
        return $http
          .post(options.api.movies, newMovie)
          .then(function (response) {
            return response.data;
          });
      },
      findOnce: function (movieName) {
        return $http.get(options.api.movies + '/' + movieName);
      },
      defineGenresIcons: function (iconProvider) {
        _.each(options.genres, function (genre) {
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
          if (_.contains(options.genres, genre)) {
            icon = genre;
            return true;
          }
        });
        if (!icon) {
          icon = 'All';
        }
        movie.icon = icon;
        return movie.icon;
      },
      selected: function (movie) {
        if (_.isObject(movie)) {
          selected = movie;
        }
        return selected;
      },
      findMovieByName: function (collection, name) {
        var filter = {
          name: name
        };
        if (collection === 'reviewed') {
          if (_.isArray(reviewed)) {
            return $q.when(_.find(reviewed, filter));
          } else {
            return factory
              .find()
              .then(function (reviewed) {
                return _.find(reviewed, filter);
              });
          }
        } else {
          return MetacriticAPIService.findMovie(collection, filter);
        }
      }
    };

    return factory;
  }
}());