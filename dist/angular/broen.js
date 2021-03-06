
// Create the broen module namespace
angular.module('broen',[])
  .directive('broenTheme',function(broenNavState){
    return {
      templateUrl: 'broen/templates/broen.html',
      restrict: 'EA',
      replace: true,
      transclude: true,
      link: function(scope) {
        scope.nav = broenNavState;
      }
    };
  });

angular.module('broen')
  .provider('broenCustomize',function(){


    // Local Variable defaults

    var defaultLogo = '<span class="fa fa-ship broen-logo-icon"></span>' +
      '<span class="logo-text"> Broen</span>';

    var defaultHeaderMenu = '<div class="pull-right broen-headermenu-text">Hello Broen!</div>';

    var logo = defaultLogo,
        headerMenu = defaultHeaderMenu;


    // Public Access Methods

    this.setLogo = function(html){
      logo = html;
    }

    this.setHeaderMenu = function(html){
      headerMenu = html;
    }

    this.$get = function(){
      return {
        logo: logo,
        headerMenu: headerMenu
      };
    };
  });

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
      if(!self.state.regularOpen) {
        self.state.openItem = null;
      }
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

    var originalNavlist = broenNav.nav;
    // This sets the nav items
    self.navlist = originalNavlist;
    self.filterNav = function(filterFunction){
      if(filterFunction && typeof filterFunction === 'function') {
        self.navlist = originalNavlist.filter(filterFunction);
      }
      else {
        self.navlist = originalNavlist;
      }
    };

  });

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

angular.module("broen").run(["$templateCache", function($templateCache) {$templateCache.put("broen/templates/broen.header.html","<div class=\"broen-header container-fluid\">\n  <!-- logo goes inside here -->\n  <div class=\"broen-logo col-xs-8\"></div>\n\n  <!-- header menu items go inside here -->\n  <div class=\"broen-headermenu col-xs-4\">\n    <!-- Bootstrap mobile hamburger menu toggle -->\n    <div class=\"broen-headermenu-toggle navbar-toggle\" ng-click=\"nav.navbarMobileToggle()\">\n      <span class=\"sr-only\">Toggle navigation</span>\n      <span class=\"fa fa-bars fa-lg\" aria-hidden=\"true\"></span>\n    </div>\n    <!-- Additional items appended here -->\n    <div class=\"broen-headermenu-custom\"></div>\n  </div>\n</div>\n");
$templateCache.put("broen/templates/broen.html","<div class=\"broen-container\">\n  <div broen-header></div>\n  <div class=\"broen-body\">\n    <div broen-navbar></div>\n    <div class=\"broen-page container-fluid\" ng-click=\"nav.navbarUnsetOpen()\">\n      <!-- User\'s content transcludes here -->\n      <div ng-transclude></div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("broen/templates/broen.navbar.html","<div class=\"broen-nav-container\"\n  ng-class=\"{\n    \'nav-collapsed\': !nav.state.regularOpen,\n    \'nav-mobile-collapsed\': !nav.state.mobileOpen\n  }\">\n  <div class=\"broen-navbar navbar-collapse\"\n    ng-class=\"{\n      \'navbar-mobile-open\': nav.state.mobileOpen,\n      \'navbar-open\': nav.state.regularOpen\n    }\">\n\n    <ul class=\"broen-nav nav navbar-nav\">\n      <!-- Sidebar toggles -->\n      <li id=\"toggle-compress\" class=\"broen-nav-item nav-collapse-toggle\"\n        ng-click=\"nav.navbarRegular(false)\">\n        <div class=\"nav-item-container\">\n          <span class=\"fa fa-compress fa-fw fa-lg rotate-45\"></span>\n          <span class=\"nav-item-text nav-toggle-text\"> Collapse Menu</span>\n        </div>\n      </li>\n      <li id=\"toggle-expand\" class=\"broen-nav-item nav-collapse-toggle\"\n        title=\"Open Menu\" data-toggle=\"tooltip\" data-placement=\"right\"\n        ng-click=\"nav.navbarRegular(true)\">\n        <div class=\"nav-item-container\">\n          <span class=\"fa fa-expand fa-fw fa-lg rotate-45\"></span>\n        </div>\n      </li>\n      <!-- Navbar -->\n      <li class=\"broen-nav-item nav-item-{{::$index}}\"\n        ng-repeat=\"listitem in nav.navlist track by $index\"\n        ng-class=\"{\'nav-item-open\': nav.navbarCheckOpen($index)}\"\n        ng-click=\"nav.navigate(listitem.link)\">\n        <div class=\"nav-item-container\" ng-click=\"nav.navbarToggleOpenItem($index)\">\n          <span class=\"nav-item-icon fa {{::listitem.icon}} fa-fw fa-lg\"></span>\n          <span class=\"nav-item-text\"> {{::listitem.title}}</span>\n          <span class=\"nav-item-caret nav-item-caret-left fa fa-caret-left pull-right\"\n            ng-if=\"!listitem.link && (listitem.items && listitem.items.length)\"></span>\n          <span class=\"nav-item-caret nav-item-caret-down fa fa-caret-down pull-right\"\n            ng-if=\"!listitem.link && (listitem.items && listitem.items.length)\"></span>\n        </div>\n        <ul ng-if=\"listitem.items.length\" class=\"broen-nav-dropdown nav-item-group nav-item-group-{{::$index}}\">\n          <li class=\"nav-link\"\n            ng-repeat=\"item in listitem.items\"\n            ng-click=\"nav.navigate(item.link)\">\n              {{::item.name}}\n          </li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n</div>\n");}]);