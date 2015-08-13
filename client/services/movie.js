(function () {
  'use strict';
  /**
   * @ngdoc service
   * @name watchedMovies.MovieService
   * @description
   * # MovieService
   * Factory in the watchedMovies module.
   */
  function MovieService($http, $q, options, MetacriticAPIService) {
    var selected,
      dialogIsOpen = false,
      cache = {
        reviewed: null,
        watched: null
      },
      factory;

    factory = {
      clearCache: function () {
        cache = {
          reviewed: null,
          watched: null
        };
      },
      isLocal: function (collectionName) {
        return _(cache)
          .keys()
          .contains(collectionName);
      },
      find: function (collection) {
        if (factory.isLocal(collection) && _.isArray(cache[collection])) {
          return $q.when(cache[collection]);
        }
        return factory.findCollection(collection);
      },
      findCollection: function (name) {
        var factoryObject = factory.isLocal(name) ? factory : MetacriticAPIService;

        if (_.isFunction(factoryObject[name])) {
          return factoryObject[name]();
        }
        return $q.reject('INVALID_COLLECTION');
      },
      reviewed: function () {
        return $http
          .get(options.api.movies)
          .then(function (response) {
            cache.reviewed = response.data;
            return cache.reviewed;
          });
      },
      watched: function () {
        return $http
          .get(options.api.watched)
          .then(function (response) {
            cache.watched = response.data;
            return cache.watched;
          });
      },
      add: function (newMovie) {
        return $http
          .post(options.api.movies, newMovie)
          .then(function (response) {
            return response.data;
          });
      },
      update: function (movie) {
        return $http
          .put(options.api.movies, movie)
          .then(function (response) {
            return response.data;
          });
      },
      delete: function (movie) {
        return $http
          .delete(options.api.movies + '/' + movie.name)
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
      dialogIsOpen: function (isOpen) {
        if (!_.isUndefined(isOpen)) {
          dialogIsOpen = isOpen;
        }
        return dialogIsOpen;
      },
      findMovie: function (collection, movie) {
        return factory
          .find(collection)
          .then(function (movies) {
            return _.find(movies, movie);
          });
      },
      findMovieByName: function (collection, name) {
        return factory
          .findMovie(collection, {
            name: name
          });
      }
    };

    return factory;
  }

  angular.module('watchedMovies')
    .factory('MovieService', ['$http', '$q', 'options', 'MetacriticAPIService', MovieService]);
}());