angular.module('broen')
  .service('broenNavState', function(broenNav){
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
      self.state.openItem = null;
    };

    self.navbarCheckOpen = function(num){
      return self.state.openItem === num;
    };

    // This sets the nav items
    self.navlist = broenNav;

  });
