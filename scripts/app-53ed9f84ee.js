
routesConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];angular
  .module('muze', ['ui.router']);

(function(){
  'use strict';

  angular.module('muze')
  .component('trendingNow', {
    bindings: {
      props: '='
    },
    templateUrl: '/app/components/trending-now/trending-now.html',
    controller: TrendingNowController
  });

  /** @ngInject */

  function TrendingNowController(){
    this.component = 'trending now';

    this.cards = [
      {
        image: 'image 1',
        desc: 'This is a sample description'
      },
      {
        image: 'image 1',
        desc: 'This is a sample description'
      },
      {
        image: 'image 1',
        desc: 'This is a sample description'
      },
      {
        image: 'image 1',
        desc: 'This is a sample description'
      },
      {
        image: 'image 1',
        desc: 'This is a sample description'
      }
    ];
  }
})();

(function(){
  'use strict';


    /** @ngInject */

  angular.module('muze')
  .component('shows',{
    bindings: {
      props: '='
    },
    templateUrl: '/app/components/shows/shows.html',
    controller: ShowsController
  });

  /** @ngInject */

  function ShowsController(){
    this.component = 'shows'
  }
})();

(function(){
  'use strict';


  angular.module('muze')
  .component('shopNow',{
    bindings: {
      props: '='
    },
    templateUrl: '/app/components/shop-now/shop-now.html',
    controller: ShopNowController
  });

  /** @ngInject */

  function ShopNowController(){
    this.component = 'shop-now';
  }

})();


(function(){
  'use strict';

  angular.module('muze')
  .component('rjProfiles',{
    bindings: {
      props: '='
    },
    templateUrl: '/app/components/rj-profiles/rj-profiles.html',
    controller: RJProfilesController
  });

  /** @ngInject */

  function RJProfilesController(){
    this.component = 'RJ Profiles';
  }
})();

(function(){
  'use strict';


    /** @ngInject */

  angular.module('muze')
  .component('news',{
    bindings : {
      props: '='
    },
    templateUrl: '/app/components/news/news.html',
    controller: NewsController

  });

  /** @ngInject */
  function NewsController(){
    this.component = 'news';

    this.cards = [
      {
        image: 'image 1',
        desc: 'This is a sample description'
      },
      {
        image: 'image 1',
        desc: 'This is a sample description'
      },
      {
        image: 'image 1',
        desc: 'This is a sample description'
      }
    ];
  }
})();

(function(){
  'use strict';
  MusicPlayerController.$inject = ["musicPlayerFactory"];
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

(function(){
  'use strict';

  angular.module('muze')
  .component('gallery',{
    bindings: {
      props: '='
    },
    templateUrl: '/app/components/gallery/gallery.html',
    controller: GalleryController
  });

  /** @ngInject */

  function GalleryController(){
    this.component = 'Gallery';
  }
})();

(function(){
  'use strict';

  angular.module('muze')
  .component('classifieds',{
    bindings: {
      props: '='
    },
    templateUrl: '/app/components/classifieds/classifieds.html',
    controller: ClassifiedsController
  });

  /** @ngInject */

  function ClassifiedsController(){
    this.component = 'classifieds';
  }
})();

(function(){
  'use strict';

  angular.module('muze')
  .component('charts',{
    bindings: {
      props: '='
    },
    templateUrl: '/app/components/charts/charts.html',
    controller: ChartsController
  });

  /** @ngInject */
  function ChartsController(){
    this.page = 'charts';
  }

})();

(function(){
  'use strict';

  angular.module('muze')
  .component('adUnit',{
    bindings: {
      props: '=',
      type: '='
    },
    replace: true,
    templateUrl: '/app/components/ad-unit/ad-unit.html',
    controller: AdUnitController
  });

  /** @ngInject */

  function AdUnitController(){
    this.page = 'Ad here';

    this.isLarge = function(){
      if(this.type === 'large'){
        return {
          'min-height': '500px;'
        };
      }else{
        return {};
      }
    }
  }
})();

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

(function(){
  'use strict';

  angular.module('muze')
  .component('app', {
    templateUrl: 'app/main.html',
    controller: MainController
  });

  /** @ngInject */

  function MainController() {
  }

})();

angular.module("muze").run(["$templateCache", function($templateCache) {$templateCache.put("app/main.html","<div class=\"main-app-container\">\n  <div>\n    <ad-unit></ad-unit>\n  </div>\n\n  <!-- gallery -->\n  <div class=\"layout-row flex\">\n\n    <div class=\"flex-rem flex main-tabs-wrapper\">\n      <div class=\"main-tabs-container\">\n\n        <div class=\"tabs-tab-container layout-row flex\">\n          <div class=\"tabs-tab active\">Music</div>\n          <div class=\"tabs-tab\">Discuss</div>\n          <div class=\"tabs-tab\">Engage</div>\n        </div>\n        <div class=\"flex flex-rem tabs-content-container layout-column\">\n\n          <music-player class=\"component\"></music-player>\n          <music-player class=\"component\"></music-player>\n          <music-player class=\"component\"></music-player>\n\n        </div>\n        <div class=\"tabs-tab-container layout-row flex\">\n          <div class=\"tabs-tab\">Shows</div>\n          <div class=\"tabs-tab\">Request</div>\n          <div class=\"tabs-tab\">Info</div>\n        </div>\n\n\n      </div>\n\n    </div>\n\n    <div class=\"flex-rem flex layout-column gallery-home-container\">\n      <gallery class=\"component\"></gallery>\n    </div>\n\n  </div>\n\n\n\n\n  <div>\n    <trending-now class=\"component\"></trending-now>\n  </div>\n\n  <div class=\"layout-row flex\">\n\n    <div class=\"flex flex-rem layout-column margin-r-20\">\n      <div>\n        <shows class=\"component\"></shows>\n      </div>\n      <div>\n        <charts class=\"component\"></charts>\n      </div>\n      <div>\n        <news class=\"component\"></news>\n      </div>\n      <div>\n        <shop-now class=\"component\"></shop-now>\n      </div>\n      <div>\n        <classifieds class=\"component\"></classifieds>\n      </div>\n      <div>\n        <rj-profiles class=\"component\"></rj-profiles>\n      </div>\n    </div>\n    <div class=\"flex layout-column main-app-container--right-ads-container pad-box-10\" style=\"min-width:400px\">\n      <ad-unit class=\"margin-td-10 component\" type=\"\'large\'\"></ad-unit>\n      <ad-unit type=\"\'large\'\" class=\"margin-td-10 component\"></ad-unit>\n    </div>\n\n  </div>\n\n</div>\n");
$templateCache.put("app/components/ad-unit/ad-unit.html","<div class=\"flex flex-rem pad-lr-10\" ng-style=\"$ctrl.type == \'large\'? {\'min-height\': \'500px\'}:{}\" style=\"background:rgba(0,0,0,0.2);color:grey\"><h2>{{$ctrl.page}}</h2></div>\n");
$templateCache.put("app/components/classifieds/classifieds.html","<div class=\"classifieds-container\">\n  <div class=\"component-header component-classifieds-header\">\n    <h4>Classifieds</h4>\n  </div>\n\n  <div class=\"component-content-container component-classifieds-container\">\n\n\n    <div class=\"pad-box-20 layout-row flex\">\n\n      <div class=\"flex layout-column\" style=\"width:30%\">\n        <h3>Advertiser Login</h3>\n        <form class=\"flex layout-column\">\n          <input type=\"email\" placeholder=\"Email\">\n          <input type=\"password\" placeholder=\"Password\">\n          <div class=\"flex layout-row layout-align-start-center\">\n            <div class=\"flex flex-rem layout-column\">\n              <a href=\"#\">Forgot Password</a>\n              <a href=\"#\">Signup</a>\n            </div>\n            <input type=\"submit\" value=\"Log In\">\n          </div>\n        </form>\n\n      </div>\n      <div class=\"flex flex-rem\"></div>\n\n    </div>\n\n\n\n  </div>\n\n</div>\n");
$templateCache.put("app/components/gallery/gallery.html","<div class=\"shows-container\">\n  <div class=\"component-header component-shows-header\">\n    <h4>{{$ctrl.component}}</h4>\n  </div>\n\n  <div class=\"component-content-container component-gallery-container pad-box-20\">\n\n    <div class=\"carousel-container\">\n      <div class=\"current-image\">\n        <img src=\"http://lorempixel.com/500/320/\">\n      </div>\n      <div class=\"image-stack\">\n        <div class=\"thumbnail thumbnail-1\">\n          <img src=\"http://lorempixel.com/100/100/\">\n        </div>\n        <div class=\"thumbnail thumbnail-2\">\n          <img src=\"http://lorempixel.com/100/100/\">\n        </div>\n        <div class=\"thumbnail thumbnail-3\">\n          <img src=\"http://lorempixel.com/100/100/\">\n        </div>\n      </div>\n    </div>\n\n\n  </div>\n\n</div>\n");
$templateCache.put("app/components/charts/charts.html","<div class=\"charts-container\">\n  <div class=\"component-header component-charts-header\">\n    <h4>Charts</h4>\n  </div>\n\n  <div class=\"component-content-container component-charts-container\">\n\n\n    <div class=\"charts-card layout-row flex layout-align-start-center\">\n\n        <div class=\"flex flex-rem\"></div>\n      <div class=\"layout-column flex\">\n        <h4>Humm FM Top 20</h4>\n        <div>\n          <div class=\"layout-row flex flex-rem margin-d-20 chart-table-item\">\n            <div class=\"margin-r-10\">\n              <span>1</span>\n            </div>\n            <div class=\"flex flex-rem layout-column\">\n              <p class=\"margin-d-10\">Song Name</p>\n              <p>Album Title, Artist, Artist, Artist</p>\n            </div>\n          </div>\n          <div class=\"layout-row flex flex-rem margin-d-20 chart-table-item\">\n            <div class=\"margin-r-10\">\n              <span>2</span>\n            </div>\n            <div class=\"flex flex-rem layout-column\">\n                <p class=\"margin-d-10\">Song Name</p>\n                <p>Album Title, Artist, Artist, Artist</p>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"flex flex-rem\"></div>\n      <div class=\"layout-column flex\">\n        <h4>New Zealand Top 20</h4>\n        <div>\n          <div class=\"layout-row flex flex-rem margin-d-20 chart-table-item\">\n            <div class=\"margin-r-10\">\n              <span>1</span>\n            </div>\n            <div class=\"flex flex-rem layout-column\">\n                <p class=\"margin-d-10\">Song Name</p>\n                <p>Album Title, Artist, Artist, Artist</p>\n            </div>\n          </div>\n          <div class=\"layout-row flex flex-rem margin-d-20 chart-table-item\">\n            <div class=\"margin-r-10\">\n              <span>2</span>\n            </div>\n            <div class=\"flex flex-rem layout-column\">\n                <p class=\"margin-d-10\">Song Name</p>\n                <p>Album Title, Artist, Artist, Artist</p>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"flex flex-rem\"></div>\n    </div>\n\n\n  </div>\n\n</div>\n");
$templateCache.put("app/components/header/header.html","<header class=\"header\">\n  <div class=\"header--subheader-top flex layout-row\">\n    <div class=\"subheader-top--logo-container\">\n      <img class=\"logo-container--logo\" src=\"app/assets/img/top_banner_logo.jpg\" alt=\"HummFM\">\n    </div>\n    <div class=\"header--ad-unit-container flex flex-rem layout-column\">\n      <ad-unit class=\"component\"></ad-unit>\n    </div>\n  </div>\n  <div class=\"header--subheader-bottom\">\n    <div class=\"subheader-bottom--toolbar\">\n        <div class=\"layout-row flex flex-rem\">\n          <div class=\"toolbar--menu-button-container flex layout-align-start-center\">\n            <button class=\"pad-box-10\">\n              <i class=\"mdi mdi-menu\"></i>\n            </button>\n          </div>\n          <div class=\"flex flex-rem\"></div>\n        </div>\n        <div class=\"flex layout-column layout-align-center pad-r-20\">\n          <music-player class=\"component\" lite=\"true\"></music-player>\n        </div>\n        <div class=\"flex layout-column toolbar--right-pane\">\n          <div class=\"flex layout-column relative layout-align-end\">\n            <div class=\"flex layout-row toolbar--search-input-container\">\n              <i class=\"mdi mdi-magnify toolbar--search-input-icon\"></i>\n              <input class=\"toolbar--search-input\" type=\"text\" placeholder=\"Search\">\n            </div>\n          </div>\n          <div class=\"flex layout-row toolbar--social-media-container\">\n            <a class=\"flex flex-rem\">\n              <i class=\"mdi mdi-facebook\"></i>\n            </a>\n            <a class=\"flex flex-rem\">\n              <i class=\"mdi mdi-twitter\"></i>\n            </a>\n            <a class=\"flex flex-rem\">\n              <i class=\"mdi mdi-youtube-play\"></i>\n            </a>\n            <a class=\"flex flex-rem\">\n              <i class=\"mdi mdi-account\"></i>\n            </a>\n            <a class=\"flex flex-rem\">\n              <i class=\"mdi mdi-map-marker\"></i>\n            </a>\n          </div>\n        </div>\n    </div>\n  </div>\n</header>\n");
$templateCache.put("app/components/music-player/music-player-lite.html","<div class=\"layout-row flex music-player lite\">\n  <div class=\"player-controls play-pause\" ng-click=\"$ctrl.musicPlayer.togglePlay()\">\n    <i class=\"mdi play-button\" ng-class=\"$ctrl.musicPlayer.playState?\'mdi-pause\':\'mdi-play\'\"></i>\n  </div>\n  <div class=\"player-labels\">\n    <div class=\"song-title\">Song Name</div>\n    <div class=\"song-info\">\n        <p class=\"margin-0 margin-r-10\">Album,</p>\n        <p class=\"margin-0 margin-r-10\">Artist,</p>\n        <p class=\"margin-0 margin-r-10\">Artist</p>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("app/components/music-player/music-player.html","<div class=\"layout-row flex music-player\">\n  <div class=\"player-controls play-pause\" ng-click=\"$ctrl.musicPlayer.togglePlay()\">\n    <i class=\"mdi play-button\" ng-class=\"$ctrl.musicPlayer.playState?\'mdi-pause\':\'mdi-play\'\"></i>\n  </div>\n  <div class=\"player-labels\">\n    <div class=\"song-title\">Song Name</div>\n    <div class=\"song-info\">\n        <p class=\"margin-0 margin-r-10\">Album,</p>\n        <p class=\"margin-0 margin-r-10\">Artist,</p>\n        <p class=\"margin-0 margin-r-10\">Artist</p>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("app/components/news/news.html","<div class=\"trending-now-container news-container\">\n  <div class=\"component-header component-news-header\">\n    <h4>News</h4>\n  </div>\n\n  <div class=\"component-content-container component-trending-now-container component-news-container\">\n\n    <div class=\"news-card trending-now-card\" ng-repeat=\"card in $ctrl.cards\">\n      <img src=\"http://lorempixel.com/150/150/\" alt=\"{{card.image}}\">\n      <p>{{card.desc}}</p>\n    </div>\n\n  </div>\n\n</div>\n");
$templateCache.put("app/components/rj-profiles/rj-profiles.html","<div class=\"shows-container\">\n  <div class=\"component-header component-shows-header\">\n    <h4>RJ Profiles</h4>\n  </div>\n\n  <div class=\"component-content-container component-shows-container\">\n\n    <div class=\"layout-row flex pad-box-20\">\n      <div class=\"layout-column flex pad-r-10\" style=\"width:450px\">\n        <img src=\"http://lorempixel.com/200/200/\" class=\"margin-d-10\" alt=\"hello\">\n        <p class=\"margin-0 margin-t-10\">Lorem ipsum is simply dummy</p>\n      </div>\n      <div class=\"margin-l-10 layout-column flex flex-rem pad-lr-20\">\n        <p class=\"margin-0 margin-d-10\">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum\n          has been the industry\'s standard dummy text ever since the 1500\'s, when an unknown printer took a gallery of type\n          and scrambled it to make a type specimen book.\n        </p>\n        <p class=\"margin-0 margin-d-10\">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum\n          has been the industry\'s standard dummy text ever since the 1500\'s, when an unknown printer took a gallery of type\n          and scrambled it to make a type specimen book.\n        </p>\n        <p class=\"margin-0 margin-d-10\">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum\n          has been the industry\'s standard dummy text ever since the 1500\'s, when an unknown printer took a gallery of type\n          and scrambled it to make a type specimen book.\n        </p>\n        <!--<div class=\"layout-row flex layout-align-start-center\">\n          <a class=\"flex icon-button margin-lr-10\">\n            <i class=\"mdi mdi-access-point\"></i>\n            <span> RJ Profile</span>\n          </a>\n          <a class=\"flex icon-button margin-lr-10\">\n            <i class=\"mdi mdi-access-point\"></i>\n            <span> Podcasts</span>\n          </a>\n        </div> -->\n      </div>\n    </div>\n\n  </div>\n\n</div>\n");
$templateCache.put("app/components/sales-and-advertising/sales-and-advertising.html","");
$templateCache.put("app/components/shop-now/shop-now.html","<div class=\"shop-now-container\">\n  <div class=\"component-header component-shop-now-header\">\n    <h4>Shop Now</h4>\n  </div>\n\n  <div class=\"component-content-container component-shop-now-container\">\n    <div class=\"flex layout-column pad-l-20\" style=\"width:30%\">\n      <h2>Categories</h2>\n      <div>\n        <p>Category 1</p>\n        <p>Category 2</p>\n        <p>Category 3</p>\n        <p>Category 1</p>\n        <p>Category 2</p>\n        <p>Category 3</p>\n      </div>\n    </div>\n    <div class=\"flex layout-row flex-rem\"></div>\n    \n  </div>\n\n</div>\n");
$templateCache.put("app/components/shows/shows.html","<div class=\"shows-container\">\n  <div class=\"component-header component-shows-header\">\n    <h4>Shows</h4>\n  </div>\n\n  <div class=\"component-content-container component-shows-container\">\n\n    <div class=\"layout-row flex layout-align-start-center pad-box-20\">\n      <img src=\"http://lorempixel.com/200/200/\" alt=\"hello\">\n      <div class=\"margin-l-10 layout-column flex flex-rem\">\n        <h3>LOREM IPSUM IS SIMPLY DUMMY TEXT OF PRINTING AND TYPE</h3>\n        <p class=\"margin-0 margin-d-10\">Lorem ipsum is simply dummy</p>\n        <p class=\"margin-0 margin-d-10\">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum\n          has been the industry\'s standard dummy text ever since the 1500\'s, when an unknown printer took a gallery of type\n          and scrambled it to make a type specimen book.\n        </p>\n        <div class=\"layout-row flex layout-align-start-center\">\n          <a class=\"flex icon-button margin-lr-10\">\n            <i class=\"mdi mdi-access-point\"></i>\n            <span> RJ Profile</span>\n          </a>\n          <a class=\"flex icon-button margin-lr-10\">\n            <i class=\"mdi mdi-access-point\"></i>\n            <span> Podcasts</span>\n          </a>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n</div>\n");
$templateCache.put("app/components/trending-now/trending-now.html","<div class=\"trending-now-container\">\n  <div class=\"component-header component-trending-now-header\">\n    <h4>#Trending Now</h4>\n  </div>\n\n  <div class=\"component-content-container component-trending-now-container\">\n\n    <div class=\"trending-now-card\" ng-repeat=\"card in $ctrl.cards\">\n      <img src=\"http://lorempixel.com/150/150/\" alt=\"{{card.image}}\">\n      <p class=\"margin-td-10\">{{card.desc}}</p>\n    </div>\n\n  </div>\n\n</div>\n");}]);
angular
  .module('muze')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    });
}

//# sourceMappingURL=../maps/scripts/app-53ed9f84ee.js.map
