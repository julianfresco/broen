
// Create the broen module namespace
angular.module('broen',[])
  .directive('broenTheme',function($timeout, $window, broenNavState){
    return {
      templateUrl: 'angular/broen/broen.html',
      restrict: 'EA',
      replace: true,
      transclude: true,
      link: function(scope, element) {
        scope.nav = broenNavState;
      }
    };
  });
