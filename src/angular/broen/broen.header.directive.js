angular.module('broen')
  .directive('broenHeader',function($window, $compile, broenNavState, broenCustomize){
    return {
      templateUrl: 'broen/templates/broen.header.html',
      restrict: 'A',
      replace: true,
      link: function(scope, element) {
        scope.nav = broenNavState;
        // Add the customizable logo
        angular
          .element( element[0].querySelector('.broen-logo') )
          .append( $compile(broenCustomize.logo)(scope) );

        // Add the customizable header menu
        angular
          .element( element[0].querySelector('.broen-headermenu-custom') )
          .append( $compile(broenCustomize.headerMenu)(scope) );
      }
    };
  });
