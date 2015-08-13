(function () {
  'use strict';
  /**
   * @ngdoc service
   * @name watchedMovies.MetacriticAPIService
   * @description
   * # MetacriticAPIService
   * Factory in the watchedMovies module.
   */
  function MetacriticAPIService($http, $q, options) {
    var cache = {
        lastDecade: null,
        lastYear: null,
        comingSoon: null,
        newReleases: null
      },
      key,
      factory;

    factory = {
      validFindKeys: ['max_pages', 'retry', 'title', 'year_from', 'year_to'],
      key: function () {
        if (key) {
          return $q.when(key);
        }
        return $http.get(options.metacritic.key)
          .then(function (value) {
            key = value.data;
            return value.data;
          });
      },
      getFindOneRequest: function (key, title) {
        return {
          method: 'POST',
          url: options.metacritic.movies.serach,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'X-Mashape-Key': key
          },
          data: {
            retry: 4,
            title: title
          }
        };
      },
      getFindRequest: function (key, data) {
        return {
          method: 'GET',
          url: options.metacritic.movies.serach,
          headers: {
            'Accept': 'application/json',
            'X-Mashape-Key': key
          },
          params: data
        };
      },
      getRequest: function (key, url) {
        return {
          method: 'GET',
          url: url,
          headers: {
            'Accept': 'application/json',
            'X-Mashape-Key': key
          }
        };
      },
      findOne: function (title) {
        return factory
          .key()
          .then(function (key) {
            return $http(factory.getFindOneRequest(key, title));
          });
      },
      find: function (data) {
        var invalidData = _(data)
          .keys()
          .some(function (key) {
            return !_.contains(factory.validFindKeys, key);
          });

        if (invalidData) {
          return $q.reject('INVALID_DATA');
        }

        return factory
          .key()
          .then(function (key) {
            return $http(factory.getFindRequest(key, data));
          });
      },
      comingSoon: function () {
        if (!_.isObject(cache.comingSoon)) {
          cache.comingSoon = factory
            .key()
            .then(function (key) {
              return $http(factory.getRequest(key, options.metacritic.movies.comingSoon));
            })
            .then(function (response) {
              return response.data.results;
            });
        }
        return cache.comingSoon;
      },
      newReleases: function () {
        if (!_.isObject(cache.newReleases)) {
          cache.newReleases = factory
            .key()
            .then(function (key) {
              return $http(factory.getRequest(key, options.metacritic.movies.newReleases));
            })
            .then(function (response) {
              return response.data.results;
            });
        }
        return cache.newReleases;
      },
      lastYears: function (count) {
        var currentYear = new Date().getFullYear();
        return factory
          .find({
            year_from: currentYear - count,
            title: '*',
            max_pages: 2
          })
          .then(function (response) {
            return response.data.results;
          });
      },
      lastYear: function () {
        if (!_.isObject(cache.lastYear)) {
          cache.lastYear = factory.lastYears(1);
        }
        return cache.lastYear;
      },
      lastDecade: function () {
        if (!_.isObject(cache.lastDecade)) {
          cache.lastDecade = factory.lastYears(10);
        }
        return cache.lastDecade;
      }
    };
    return factory;
  }

  angular.module('watchedMovies')
    .factory('MetacriticAPIService', ['$http', '$q', 'options', MetacriticAPIService]);
}());