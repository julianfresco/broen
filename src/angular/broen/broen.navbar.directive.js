angular.module('broen')
  .directive('broenNavbar', function(broenNavState){
    return {
      templateUrl: 'broen/templates/broen.navbar.html',
      restrict: 'A',
      replace: true,
      link: function(scope) {
        scope.nav = broenNavState;
      }
    };
  });
