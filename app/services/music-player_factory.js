(function(){
  'use strict';

  angular.module('muze')
  .factory('musicPlayerFactory', musicPlayerFactory);

  /** @ngInject */
  
  function musicPlayerFactory(){
    var music = {};

    music.playState = false;
    music.togglePlay = function(){
      music.playState = !music.playState;
    };


    return music;

  }
})();
