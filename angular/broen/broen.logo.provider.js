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
