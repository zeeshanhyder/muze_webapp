(function(){
  'use strict';
  angular.module('muze')
  .component('musicPlayer', {
    bindings: {
      props: '=',
      lite: '='
    },
    templateUrl: function($element, $attrs, $log){
      var url = '/app/components/music-player/';
      if($attrs.lite){
        return url+'music-player-lite.html';
      }else{
        return url+'music-player.html';
      }
    },
    controller: MusicPlayerController
  });


  /** @ngInject */

  function MusicPlayerController(musicPlayerFactory){

    this.musicPlayer = musicPlayerFactory;

  }
})();
