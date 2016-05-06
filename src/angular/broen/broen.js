
// Create the broen module namespace
angular.module('broen',[])
  .directive('broenTheme',function(broenNavState){
    return {
      templateUrl: 'src/angular/broen/broen.html',
      restrict: 'EA',
      replace: true,
      transclude: true,
      link: function(scope) {
        scope.nav = broenNavState;
      }
    };
  });
