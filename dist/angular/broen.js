
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

angular.module('broen')
  .directive('broenHeader',function($window, $compile, broenNavState, broenLogo){
    return {
      templateUrl: 'src/angular/broen/broen.header.html',
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

angular.module('broen')
  .provider('broenLogo',function(){

    var defaultLogo = '<span class="fa fa-ship broen-logo-icon"></span>' +
      '<span class="logo-text"> Broen</span>';

    var logo = defaultLogo;

    this.setLogo = function(html){
      logo = html;
    }

    this.$get = function(){
      return {
        logo: logo
      };
    };
  });

angular.module('broen')
  .provider('broenNav',function(){

    var defaultNav = [{
        title: 'Dashboard',
        icon: 'fa-home',
        link: 'dashboard'
      },
      {
        title: 'Broen How To',
        icon: 'fa-motorcycle rotate-neg-45',
        items: [{
          name: 'Angular Overview',
          link: 'broen'
        },
        {
          name: 'Broen Configurations',
          link: 'broen/config'
        }]
      }];

    var broenNavItems = defaultNav;
    var collapseItemOnBlur = false;

    this.setNav = function(navObject){
      // TODO: add some validations
      broenNavItems = navObject;
    };

    this.setCollapseItemOnBlur = function(value){
      collapseItemOnBlur = !!value;
    };

    this.$get = function(){
      if ( broenNavItems === defaultNav ) {
        console.warn('You are using the default navigation built into Broen. ' +
          'See the docs to learn how to pass in your own nav items as a config ' +
          'to broenNavItemsProvider.')
      }

      return {
        nav: broenNavItems,
        collapseItemOnBlur: collapseItemOnBlur
      };
    }

  });

angular.module('broen')
  .service('broenNavState', function($location, broenNav){
    var self = this;

    self.state = {
      mobileOpen: false,
      regularOpen: true,
      openItem: null
    };

    self.navbarMobileToggle = function(){
      self.state.mobileOpen = !self.state.mobileOpen;
    };

    self.navbarRegular = function(val){
      self.state.regularOpen = !!val;
    };

    self.navbarToggleOpenItem = function(num){
      var val = parseInt(num);
      self.state.openItem = self.state.openItem === val ? null : val;
    };

    self.navbarUnsetOpen = function(){
      if(broenNav.collapseItemOnBlur){
        self.state.openItem = null;
      }
    };

    self.navbarCheckOpen = function(num){
      return self.state.openItem === num;
    };

    self.navigate = function(destination){
      if(!destination) { return; }
      $location.path(destination);
    };

    // This sets the nav items
    self.navlist = broenNav.nav;

  });

angular.module('broen')
  .directive('broenNavbar', function(broenNavState){
    return {
      templateUrl: 'src/angular/broen/broen.navbar.html',
      restrict: 'A',
      replace: true,
      link: function(scope) {
        scope.nav = broenNavState;
      }
    };
  });
