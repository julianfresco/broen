angular.module('broen')
  .provider('broenCustomize',function(){


    // Local Variable defaults

    var defaultLogo = '<span class="fa fa-ship broen-logo-icon"></span>' +
      '<span class="logo-text"> Broen</span>';

    var defaultHeaderMenu = '<div class="pull-right broen-headermenu-text">Hello Broen!</div>'

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
