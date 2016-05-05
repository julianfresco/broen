angular.module('broen')
  .provider('broenNav',function(){

    var defaultNav = [{
        title: 'Dashboard',
        icon: 'fa-home',
        link: '#/dashboard'
      },
      {
        title: 'Broen How To',
        icon: 'fa-motorcycle rotate-neg-45',
        items: [{
          name: 'Angular Overview',
          link: '#/broen'
        },
        {
          name: 'Broen Configurations',
          link: '#/broen/config'
        }]
      }];

    var broenNavItems = defaultNav;

    this.setNav = function(navObject){
      // TODO: add some validations
      broenNavItems = navObject;
    };

    this.$get = function(){
      if ( broenNavItems === defaultNav ) {
        console.warn('You are using the default navigation built into Broen. ' +
          'See the docs to learn how to pass in your own nav items as a config ' +
          'to broenNavItemsProvider.')
      }
      return broenNavItems;
    }

  });
