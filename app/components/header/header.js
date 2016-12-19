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

  function HeaderController($scope, locationService, $state, $transitions){
    var vm = this;
    vm.componentName = 'header';

    $transitions.onStart({}, function($transition$){
      vm.currentState = $transition$.$to().name;
    });

    function init(){

    }
    init();

  }

})();
