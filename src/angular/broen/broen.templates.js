angular.module("broen").run(["$templateCache", function($templateCache) {$templateCache.put("broen/templates/broen.header.html","<div class=\"broen-header container-fluid\">\n  <!-- logo goes inside here -->\n  <div class=\"broen-logo col-sm-3 col-xs-6\"></div>\n  <!-- top menu items go inside here -->\n  <div class=\"broen-top-menu col-sm-offset-5 col-sm-4 col-xs-6\">\n    <div class=\"broen-top-menu-toggle navbar-toggle\" ng-click=\"nav.navbarMobileToggle()\">\n      <span class=\"sr-only\">Toggle navigation</span>\n      <span class=\"fa fa-bars fa-lg\" aria-hidden=\"true\"></span>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("broen/templates/broen.html","<div class=\"broen-container\">\n  <div broen-header></div>\n  <div class=\"broen-body\">\n    <div broen-navbar></div>\n    <div class=\"broen-page container-fluid\" ng-click=\"nav.navbarUnsetOpen()\">\n      <!-- User\'s content transcludes here -->\n      <div ng-transclude></div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("broen/templates/broen.navbar.html","<div class=\"broen-nav-container\"\n  ng-class=\"{\n    \'nav-collapsed\': !nav.state.regularOpen,\n    \'nav-mobile-collapsed\': !nav.state.mobileOpen\n  }\">\n  <div class=\"broen-navbar navbar-collapse\"\n    ng-class=\"{\n      \'navbar-mobile-open\': nav.state.mobileOpen,\n      \'navbar-open\': nav.state.regularOpen\n    }\">\n\n    <ul class=\"broen-nav nav navbar-nav\">\n      <!-- Sidebar toggles -->\n      <li id=\"toggle-compress\" class=\"broen-nav-item nav-collapse-toggle\"\n        ng-click=\"nav.navbarRegular(false)\">\n        <div class=\"nav-item-container\">\n          <span class=\"fa fa-compress fa-fw fa-lg rotate-45\"></span>\n          <span class=\"nav-item-text nav-toggle-text\"> Collapse Menu</span>\n        </div>\n      </li>\n      <li id=\"toggle-expand\" class=\"broen-nav-item nav-collapse-toggle\"\n        title=\"Open Menu\" data-toggle=\"tooltip\" data-placement=\"right\"\n        ng-click=\"nav.navbarRegular(true)\">\n        <div class=\"nav-item-container\">\n          <span class=\"fa fa-expand fa-fw fa-lg rotate-45\"></span>\n        </div>\n      </li>\n      <!-- Navbar -->\n      <li class=\"broen-nav-item nav-item-{{::$index}}\"\n        ng-repeat=\"listitem in nav.navlist track by $index\"\n        ng-class=\"{\'nav-item-open\': nav.navbarCheckOpen($index)}\"\n        ng-click=\"nav.navigate(listitem.link)\">\n        <div class=\"nav-item-container\" ng-click=\"nav.navbarToggleOpenItem($index)\">\n          <span class=\"nav-item-icon fa {{::listitem.icon}} fa-fw fa-lg\"></span>\n          <span class=\"nav-item-text\"> {{::listitem.title}}</span>\n          <span ng-if=\"listitem.items.length\" class=\"nav-item-caret fa fa-caret-down pull-right\"></span>\n        </div>\n        <ul ng-if=\"listitem.items.length\" class=\"broen-nav-dropdown nav-item-group nav-item-group-{{::$index}}\">\n          <li class=\"nav-link\"\n            ng-repeat=\"item in listitem.items\"\n            ng-click=\"nav.navigate(item.link)\">\n              {{::item.name}}\n          </li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n</div>\n");}]);