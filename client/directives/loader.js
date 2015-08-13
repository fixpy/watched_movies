(function () {
  'use strict';
  /**
   * @ngdoc service
   * @name watchedMovies.loader
   * @description
   * # loader
   * Factory in the watchedMovies module.
   */
  function loader($timeout, $rootScope) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {},
      link: function (scope) {
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

  angular.module('watchedMovies')
    .directive('loader', ['$timeout', '$rootScope', loader]);
}());