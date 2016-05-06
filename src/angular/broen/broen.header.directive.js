angular.module('broen')
  .directive('broenHeader',function($window, $compile, broenNavState, broenLogo){
    return {
      templateUrl: 'broen/templates/broen.header.html',
      restrict: 'A',
      replace: true,
      link: function(scope, element) {
        scope.nav = broenNavState;
        // Append the user configurable logo to the page
        angular
          .element(element.children()[0])
          .append( $compile(broenLogo.logo)(scope) );
      }
    };
  });
