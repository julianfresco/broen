angular.module('broen')
  .directive('broenHeader',function(broenNavState){
    return {
      templateUrl: 'angular/broen/broen.header.html',
      restrict: 'A',
      replace: true,
      link: function(scope) {
        scope.nav = broenNavState;
      }
    };
  });
