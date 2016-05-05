angular.module('broen')
  .directive('broenNavbar', function(broenNavState){
    return {
      templateUrl: 'angular/broen/broen.navbar.html',
      restrict: 'A',
      replace: true,
      link: function(scope) {
        scope.nav = broenNavState;
      }
    };
  });
