(function () {
  'use strict';
  /**
   * @ngdoc service
   * @name watchedMovies.CompanyService
   * @description
   * # CompanyService
   * Factory in the watchedMovies module.
   */
  angular.module('watchedMovies')
    .factory('MetacriticAPIService', ['$http', '$q', 'options', MetacriticAPIService]);

  function MetacriticAPIService($http, $q, options) {
    var key,
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
          return factory
            .key()
            .then(function (key) {
              return $http(factory.getRequest(key, options.metacritic.movies.comingSoon));
            })
            .then(function (response) {
              return response.data.results;
            });
        },
        newReleases: function () {
          return factory
            .key()
            .then(function (key) {
              return $http(factory.getRequest(key, options.metacritic.movies.newReleases));
            })
            .then(function (response) {
              return response.data.results;
            });
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
            })
        },
        lastYear: function () {
          return factory.lastYears(1);
        },
        lastFiveYear: function () {
          return factory.lastYears(5);
        },
        lastDecade: function () {
          return factory.lastYears(10);
        }
      };
    return factory;
  }
}());