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
    .directive('loader', ['$timeout', '$rootScope', loader]);

  function loader($timeout, $rootScope) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {},
      link: function (scope, element) {
        scope.visible = false;
        $rootScope.$on('loader:update', function (event, info) {
          if (info.active === 0) {
            scope.visible = false;
          } else {
            scope.visible = true;
          }
        });
      },
      templateUrl: 'views/loader.html'
    };
  }
}());