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
