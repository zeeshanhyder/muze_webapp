(function(){
  'use strict';


    /** @ngInject */

  angular.module('muze')
  .component('appHeader',{
    bindings: {
      props: '='
    },
    templateUrl: '/app/components/header/header.html',
    controller: HeaderController
  });

  /** @ngInject */

  function HeaderController(){
    this.componentName = 'header';
  }

})();
