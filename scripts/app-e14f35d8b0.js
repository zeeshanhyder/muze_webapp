
  authCheck.$inject = ["$rootScope", "locationService"];
routesConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];angular
  .module('muze', ['ui.router','ui.bootstrap'])
  .value('appData',{
    citySelected : false
  })
  .run(authCheck);

  /** @ngInject */
  function authCheck($rootScope, locationService){
    $rootScope.$on('$privateApiRequest', function(event, req){
      if(!locationService.getSavedLocationLocal()){
        //if user is not logged in, reject the request and bring up login
        req.reject();
        $state.go('location-selection');
      }
    })
  }

(function(){
  'use strict';

  angular.module('muze')
  .controller('LoginDialogController',LoginDialogController);

  /** @ngInject */
  function LoginDialogController(){
    var vm = this;

    
  }

})();

(function(){
  'use strict';

  LocationSelectionDialogController.$inject = ["locationService", "$state"];
  angular.module('muze')
  .controller('LocationSelectionDialogController', LocationSelectionDialogController)
  .component('locationSelector',{
    bindings: {
      props: '='
    },
    templateUrl: '/app/components/dialog/location-selection/location-selection.html',
    controller: LocationSelectionDialogController
  });

  /** @ngInject */
  function LocationSelectionDialogController(locationService,$state){
    var vm = this;
    vm.component = 'Location Selection';
    vm.selectedCity = '';
    vm.updateCity = updateCity;
    vm.closeModal = closeModal;

    function updateCity(){
      locationService.saveLocationLocal(vm.selectedCity)
      .then(function(response){
        vm.citySelected = true;

        // now that we have city, let's get venue data
        locationService.getVenueList()
        .then(function(data){
          // later on show venues to user, but right now save it and set it default
          locationService.saveVenueList(data.venues);
        });
      }, function(err){
      });
    }

    function closeModal(){
      $state.go('home',{}, { reload: true });
    }

    function init(){

        //check if we already have a city
        var selectedCity = locationService.getSavedLocationLocal();
        if(selectedCity){
          vm.selectedCity = selectedCity;
          vm.citySelected = true;
        }

        //get location
        locationService.getLocationListing()
        .then(function(response){
          vm.cities = response.cities;
        });


    }

    init();
  }

})();

/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 2.3.1 - 2016-12-10
 * License: MIT
 */angular.module("ui.bootstrap",["ui.bootstrap.modal","ui.bootstrap.multiMap","ui.bootstrap.stackedMap","ui.bootstrap.position"]),angular.module("ui.bootstrap.modal",["ui.bootstrap.multiMap","ui.bootstrap.stackedMap","ui.bootstrap.position"]).provider("$uibResolve",function(){var t=this;this.resolver=null,this.setResolver=function(t){this.resolver=t},this.$get=["$injector","$q",function(e,o){var n=t.resolver?e.get(t.resolver):null;return{resolve:function(t,r,i,a){if(n)return n.resolve(t,r,i,a);var l=[];return angular.forEach(t,function(t){l.push(angular.isFunction(t)||angular.isArray(t)?o.resolve(e.invoke(t)):angular.isString(t)?o.resolve(e.get(t)):o.resolve(t))}),o.all(l).then(function(e){var o={},n=0;return angular.forEach(t,function(t,r){o[r]=e[n++]}),o})}}}]}).directive("uibModalBackdrop",["$animate","$injector","$uibModalStack",function(t,e,o){function n(e,n,r){r.modalInClass&&(t.addClass(n,r.modalInClass),e.$on(o.NOW_CLOSING_EVENT,function(o,i){var a=i();e.modalOptions.animation?t.removeClass(n,r.modalInClass).then(a):a()}))}return{restrict:"A",compile:function(t,e){return t.addClass(e.backdropClass),n}}}]).directive("uibModalWindow",["$uibModalStack","$q","$animateCss","$document",function(t,e,o,n){return{scope:{index:"@"},restrict:"A",transclude:!0,templateUrl:function(t,e){return e.templateUrl||"uib/template/modal/window.html"},link:function(r,i,a){i.addClass(a.windowTopClass||""),r.size=a.size,r.close=function(e){var o=t.getTop();o&&o.value.backdrop&&"static"!==o.value.backdrop&&e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),t.dismiss(o.key,"backdrop click"))},i.on("click",r.close),r.$isRendered=!0;var l=e.defer();r.$$postDigest(function(){l.resolve()}),l.promise.then(function(){var l=null;a.modalInClass&&(l=o(i,{addClass:a.modalInClass}).start(),r.$on(t.NOW_CLOSING_EVENT,function(t,e){var n=e();o(i,{removeClass:a.modalInClass}).start().then(n)})),e.when(l).then(function(){var e=t.getTop();if(e&&t.modalRendered(e.key),!n[0].activeElement||!i[0].contains(n[0].activeElement)){var o=i[0].querySelector("[autofocus]");o?o.focus():i[0].focus()}})})}}}]).directive("uibModalAnimationClass",function(){return{compile:function(t,e){e.modalAnimation&&t.addClass(e.uibModalAnimationClass)}}}).directive("uibModalTransclude",["$animate",function(t){return{link:function(e,o,n,r,i){i(e.$parent,function(e){o.empty(),t.enter(e,o)})}}}]).factory("$uibModalStack",["$animate","$animateCss","$document","$compile","$rootScope","$q","$$multiMap","$$stackedMap","$uibPosition",function(t,e,o,n,r,i,a,l,s){function d(t){var e="-";return t.replace(D,function(t,o){return(o?e:"")+t.toLowerCase()})}function u(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function c(){for(var t=-1,e=C.keys(),o=0;o<e.length;o++)C.get(e[o]).value.backdrop&&(t=o);return t>-1&&M>t&&(t=M),t}function p(t,e){var o=C.get(t).value,n=o.appendTo;C.remove(t),T=C.top(),T&&(M=parseInt(T.value.modalDomEl.attr("index"),10)),h(o.modalDomEl,o.modalScope,function(){var e=o.openedClass||k;S.remove(e,t);var r=S.hasKey(e);n.toggleClass(e,r),!r&&y&&y.heightOverflow&&y.scrollbarWidth&&(n.css(y.originalRight?{paddingRight:y.originalRight+"px"}:{paddingRight:""}),y=null),f(!0)},o.closedDeferred),m(),e&&e.focus?e.focus():n.focus&&n.focus()}function f(t){var e;C.length()>0&&(e=C.top().value,e.modalDomEl.toggleClass(e.windowTopClass||"",t))}function m(){if(w&&-1===c()){var t=$;h(w,$,function(){t=null}),w=void 0,$=void 0}}function h(e,o,n,r){function a(){a.done||(a.done=!0,t.leave(e).then(function(){n&&n(),e.remove(),r&&r.resolve()}),o.$destroy())}var l,s=null,d=function(){return l||(l=i.defer(),s=l.promise),function(){l.resolve()}};return o.$broadcast(E.NOW_CLOSING_EVENT,d),i.when(s).then(a)}function g(t){if(t.isDefaultPrevented())return t;var e=C.top();if(e)switch(t.which){case 27:e.value.keyboard&&(t.preventDefault(),r.$apply(function(){E.dismiss(e.key,"escape key press")}));break;case 9:var o=E.loadFocusElementList(e),n=!1;t.shiftKey?(E.isFocusInFirstItem(t,o)||E.isModalFocused(t,e))&&(n=E.focusLastFocusableElement(o)):E.isFocusInLastItem(t,o)&&(n=E.focusFirstFocusableElement(o)),n&&(t.preventDefault(),t.stopPropagation())}}function v(t,e,o){return!t.value.modalScope.$broadcast("modal.closing",e,o).defaultPrevented}function b(){Array.prototype.forEach.call(document.querySelectorAll("["+x+"]"),function(t){var e=parseInt(t.getAttribute(x),10),o=e-1;t.setAttribute(x,o),o||(t.removeAttribute(x),t.removeAttribute("aria-hidden"))})}var w,$,y,k="modal-open",C=l.createNew(),S=a.createNew(),E={NOW_CLOSING_EVENT:"modal.stack.now-closing"},M=0,T=null,x="data-bootstrap-modal-aria-hidden-count",N="a[href], area[href], input:not([disabled]):not([tabindex='-1']), button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']), textarea:not([disabled]):not([tabindex='-1']), iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true]",D=/[A-Z]/g;return r.$watch(c,function(t){$&&($.index=t)}),o.on("keydown",g),r.$on("$destroy",function(){o.off("keydown",g)}),E.open=function(e,i){function a(t){function e(t){var e=t.parent()?t.parent().children():[];return Array.prototype.filter.call(e,function(e){return e!==t[0]})}if(t&&"BODY"!==t[0].tagName)return e(t).forEach(function(t){var e="true"===t.getAttribute("aria-hidden"),o=parseInt(t.getAttribute(x),10);o||(o=e?1:0),t.setAttribute(x,o+1),t.setAttribute("aria-hidden","true")}),a(t.parent())}var l=o[0].activeElement,u=i.openedClass||k;f(!1),T=C.top(),C.add(e,{deferred:i.deferred,renderDeferred:i.renderDeferred,closedDeferred:i.closedDeferred,modalScope:i.scope,backdrop:i.backdrop,keyboard:i.keyboard,openedClass:i.openedClass,windowTopClass:i.windowTopClass,animation:i.animation,appendTo:i.appendTo}),S.put(u,e);var p=i.appendTo,m=c();if(!p.length)throw new Error("appendTo element not found. Make sure that the element passed is in DOM.");m>=0&&!w&&($=r.$new(!0),$.modalOptions=i,$.index=m,w=angular.element('<div uib-modal-backdrop="modal-backdrop"></div>'),w.attr({"class":"modal-backdrop","ng-style":"{'z-index': 1040 + (index && 1 || 0) + index*10}","uib-modal-animation-class":"fade","modal-in-class":"in"}),i.backdropClass&&w.addClass(i.backdropClass),i.animation&&w.attr("modal-animation","true"),n(w)($),t.enter(w,p),s.isScrollable(p)&&(y=s.scrollbarPadding(p),y.heightOverflow&&y.scrollbarWidth&&p.css({paddingRight:y.right+"px"})));var h;i.component?(h=document.createElement(d(i.component.name)),h=angular.element(h),h.attr({resolve:"$resolve","modal-instance":"$uibModalInstance",close:"$close($value)",dismiss:"$dismiss($value)"})):h=i.content,M=T?parseInt(T.value.modalDomEl.attr("index"),10)+1:0;var g=angular.element('<div uib-modal-window="modal-window"></div>');g.attr({"class":"modal","template-url":i.windowTemplateUrl,"window-top-class":i.windowTopClass,role:"dialog","aria-labelledby":i.ariaLabelledBy,"aria-describedby":i.ariaDescribedBy,size:i.size,index:M,animate:"animate","ng-style":"{'z-index': 1050 + $$topModalIndex*10, display: 'block'}",tabindex:-1,"uib-modal-animation-class":"fade","modal-in-class":"in"}).append(h),i.windowClass&&g.addClass(i.windowClass),i.animation&&g.attr("modal-animation","true"),p.addClass(u),i.scope&&(i.scope.$$topModalIndex=M),t.enter(n(g)(i.scope),p),C.top().value.modalDomEl=g,C.top().value.modalOpener=l,a(g)},E.close=function(t,e){var o=C.get(t);return b(),o&&v(o,e,!0)?(o.value.modalScope.$$uibDestructionScheduled=!0,o.value.deferred.resolve(e),p(t,o.value.modalOpener),!0):!o},E.dismiss=function(t,e){var o=C.get(t);return b(),o&&v(o,e,!1)?(o.value.modalScope.$$uibDestructionScheduled=!0,o.value.deferred.reject(e),p(t,o.value.modalOpener),!0):!o},E.dismissAll=function(t){for(var e=this.getTop();e&&this.dismiss(e.key,t);)e=this.getTop()},E.getTop=function(){return C.top()},E.modalRendered=function(t){var e=C.get(t);e&&e.value.renderDeferred.resolve()},E.focusFirstFocusableElement=function(t){return t.length>0?(t[0].focus(),!0):!1},E.focusLastFocusableElement=function(t){return t.length>0?(t[t.length-1].focus(),!0):!1},E.isModalFocused=function(t,e){if(t&&e){var o=e.value.modalDomEl;if(o&&o.length)return(t.target||t.srcElement)===o[0]}return!1},E.isFocusInFirstItem=function(t,e){return e.length>0?(t.target||t.srcElement)===e[0]:!1},E.isFocusInLastItem=function(t,e){return e.length>0?(t.target||t.srcElement)===e[e.length-1]:!1},E.loadFocusElementList=function(t){if(t){var e=t.value.modalDomEl;if(e&&e.length){var o=e[0].querySelectorAll(N);return o?Array.prototype.filter.call(o,function(t){return u(t)}):o}}},E}]).provider("$uibModal",function(){var t={options:{animation:!0,backdrop:!0,keyboard:!0},$get:["$rootScope","$q","$document","$templateRequest","$controller","$uibResolve","$uibModalStack",function(e,o,n,r,i,a,l){function s(t){return t.template?o.when(t.template):r(angular.isFunction(t.templateUrl)?t.templateUrl():t.templateUrl)}var d={},u=null;return d.getPromiseChain=function(){return u},d.open=function(r){function d(){return g}var c=o.defer(),p=o.defer(),f=o.defer(),m=o.defer(),h={result:c.promise,opened:p.promise,closed:f.promise,rendered:m.promise,close:function(t){return l.close(h,t)},dismiss:function(t){return l.dismiss(h,t)}};if(r=angular.extend({},t.options,r),r.resolve=r.resolve||{},r.appendTo=r.appendTo||n.find("body").eq(0),!r.component&&!r.template&&!r.templateUrl)throw new Error("One of component or template or templateUrl options is required.");var g;g=r.component?o.when(a.resolve(r.resolve,{},null,null)):o.all([s(r),a.resolve(r.resolve,{},null,null)]);var v;return v=u=o.all([u]).then(d,d).then(function(t){function o(e,o,n,r){e.$scope=a,e.$scope.$resolve={},n?e.$scope.$uibModalInstance=h:e.$uibModalInstance=h;var i=o?t[1]:t;angular.forEach(i,function(t,o){r&&(e[o]=t),e.$scope.$resolve[o]=t})}var n=r.scope||e,a=n.$new();a.$close=h.close,a.$dismiss=h.dismiss,a.$on("$destroy",function(){a.$$uibDestructionScheduled||a.$dismiss("$uibUnscheduledDestruction")});var s,d,u={scope:a,deferred:c,renderDeferred:m,closedDeferred:f,animation:r.animation,backdrop:r.backdrop,keyboard:r.keyboard,backdropClass:r.backdropClass,windowTopClass:r.windowTopClass,windowClass:r.windowClass,windowTemplateUrl:r.windowTemplateUrl,ariaLabelledBy:r.ariaLabelledBy,ariaDescribedBy:r.ariaDescribedBy,size:r.size,openedClass:r.openedClass,appendTo:r.appendTo},g={},v={};r.component?(o(g,!1,!0,!1),g.name=r.component,u.component=g):r.controller&&(o(v,!0,!1,!0),d=i(r.controller,v,!0,r.controllerAs),r.controllerAs&&r.bindToController&&(s=d.instance,s.$close=a.$close,s.$dismiss=a.$dismiss,angular.extend(s,{$resolve:v.$scope.$resolve},n)),s=d(),angular.isFunction(s.$onInit)&&s.$onInit()),r.component||(u.content=t[0]),l.open(h,u),p.resolve(!0)},function(t){p.reject(t),c.reject(t)})["finally"](function(){u===v&&(u=null)}),h},d}]};return t}),angular.module("ui.bootstrap.multiMap",[]).factory("$$multiMap",function(){return{createNew:function(){var t={};return{entries:function(){return Object.keys(t).map(function(e){return{key:e,value:t[e]}})},get:function(e){return t[e]},hasKey:function(e){return!!t[e]},keys:function(){return Object.keys(t)},put:function(e,o){t[e]||(t[e]=[]),t[e].push(o)},remove:function(e,o){var n=t[e];if(n){var r=n.indexOf(o);-1!==r&&n.splice(r,1),n.length||delete t[e]}}}}}}),angular.module("ui.bootstrap.stackedMap",[]).factory("$$stackedMap",function(){return{createNew:function(){var t=[];return{add:function(e,o){t.push({key:e,value:o})},get:function(e){for(var o=0;o<t.length;o++)if(e===t[o].key)return t[o]},keys:function(){for(var e=[],o=0;o<t.length;o++)e.push(t[o].key);return e},top:function(){return t[t.length-1]},remove:function(e){for(var o=-1,n=0;n<t.length;n++)if(e===t[n].key){o=n;break}return t.splice(o,1)[0]},removeTop:function(){return t.pop()},length:function(){return t.length}}}}}),angular.module("ui.bootstrap.position",[]).factory("$uibPosition",["$document","$window",function(t,e){var o,n,r={normal:/(auto|scroll)/,hidden:/(auto|scroll|hidden)/},i={auto:/\s?auto?\s?/i,primary:/^(top|bottom|left|right)$/,secondary:/^(top|bottom|left|right|center)$/,vertical:/^(top|bottom)$/},a=/(HTML|BODY)/;return{getRawNode:function(t){return t.nodeName?t:t[0]||t},parseStyle:function(t){return t=parseFloat(t),isFinite(t)?t:0},offsetParent:function(o){function n(t){return"static"===(e.getComputedStyle(t).position||"static")}o=this.getRawNode(o);for(var r=o.offsetParent||t[0].documentElement;r&&r!==t[0].documentElement&&n(r);)r=r.offsetParent;return r||t[0].documentElement},scrollbarWidth:function(r){if(r){if(angular.isUndefined(n)){var i=t.find("body");i.addClass("uib-position-body-scrollbar-measure"),n=e.innerWidth-i[0].clientWidth,n=isFinite(n)?n:0,i.removeClass("uib-position-body-scrollbar-measure")}return n}if(angular.isUndefined(o)){var a=angular.element('<div class="uib-position-scrollbar-measure"></div>');t.find("body").append(a),o=a[0].offsetWidth-a[0].clientWidth,o=isFinite(o)?o:0,a.remove()}return o},scrollbarPadding:function(t){t=this.getRawNode(t);var o=e.getComputedStyle(t),n=this.parseStyle(o.paddingRight),r=this.parseStyle(o.paddingBottom),i=this.scrollParent(t,!1,!0),l=this.scrollbarWidth(a.test(i.tagName));return{scrollbarWidth:l,widthOverflow:i.scrollWidth>i.clientWidth,right:n+l,originalRight:n,heightOverflow:i.scrollHeight>i.clientHeight,bottom:r+l,originalBottom:r}},isScrollable:function(t,o){t=this.getRawNode(t);var n=o?r.hidden:r.normal,i=e.getComputedStyle(t);return n.test(i.overflow+i.overflowY+i.overflowX)},scrollParent:function(o,n,i){o=this.getRawNode(o);var a=n?r.hidden:r.normal,l=t[0].documentElement,s=e.getComputedStyle(o);if(i&&a.test(s.overflow+s.overflowY+s.overflowX))return o;var d="absolute"===s.position,u=o.parentElement||l;if(u===l||"fixed"===s.position)return l;for(;u.parentElement&&u!==l;){var c=e.getComputedStyle(u);if(d&&"static"!==c.position&&(d=!1),!d&&a.test(c.overflow+c.overflowY+c.overflowX))break;u=u.parentElement}return u},position:function(o,n){o=this.getRawNode(o);var r=this.offset(o);if(n){var i=e.getComputedStyle(o);r.top-=this.parseStyle(i.marginTop),r.left-=this.parseStyle(i.marginLeft)}var a=this.offsetParent(o),l={top:0,left:0};return a!==t[0].documentElement&&(l=this.offset(a),l.top+=a.clientTop-a.scrollTop,l.left+=a.clientLeft-a.scrollLeft),{width:Math.round(angular.isNumber(r.width)?r.width:o.offsetWidth),height:Math.round(angular.isNumber(r.height)?r.height:o.offsetHeight),top:Math.round(r.top-l.top),left:Math.round(r.left-l.left)}},offset:function(o){o=this.getRawNode(o);var n=o.getBoundingClientRect();return{width:Math.round(angular.isNumber(n.width)?n.width:o.offsetWidth),height:Math.round(angular.isNumber(n.height)?n.height:o.offsetHeight),top:Math.round(n.top+(e.pageYOffset||t[0].documentElement.scrollTop)),left:Math.round(n.left+(e.pageXOffset||t[0].documentElement.scrollLeft))}},viewportOffset:function(o,n,r){o=this.getRawNode(o),r=r!==!1?!0:!1;var i=o.getBoundingClientRect(),a={top:0,left:0,bottom:0,right:0},l=n?t[0].documentElement:this.scrollParent(o),s=l.getBoundingClientRect();if(a.top=s.top+l.clientTop,a.left=s.left+l.clientLeft,l===t[0].documentElement&&(a.top+=e.pageYOffset,a.left+=e.pageXOffset),a.bottom=a.top+l.clientHeight,a.right=a.left+l.clientWidth,r){var d=e.getComputedStyle(l);a.top+=this.parseStyle(d.paddingTop),a.bottom-=this.parseStyle(d.paddingBottom),a.left+=this.parseStyle(d.paddingLeft),a.right-=this.parseStyle(d.paddingRight)}return{top:Math.round(i.top-a.top),bottom:Math.round(a.bottom-i.bottom),left:Math.round(i.left-a.left),right:Math.round(a.right-i.right)}},parsePlacement:function(t){var e=i.auto.test(t);return e&&(t=t.replace(i.auto,"")),t=t.split("-"),t[0]=t[0]||"top",i.primary.test(t[0])||(t[0]="top"),t[1]=t[1]||"center",i.secondary.test(t[1])||(t[1]="center"),t[2]=e?!0:!1,t},positionElements:function(t,o,n,r){t=this.getRawNode(t),o=this.getRawNode(o);var a=angular.isDefined(o.offsetWidth)?o.offsetWidth:o.prop("offsetWidth"),l=angular.isDefined(o.offsetHeight)?o.offsetHeight:o.prop("offsetHeight");n=this.parsePlacement(n);var s=r?this.offset(t):this.position(t),d={top:0,left:0,placement:""};if(n[2]){var u=this.viewportOffset(t,r),c=e.getComputedStyle(o),p={width:a+Math.round(Math.abs(this.parseStyle(c.marginLeft)+this.parseStyle(c.marginRight))),height:l+Math.round(Math.abs(this.parseStyle(c.marginTop)+this.parseStyle(c.marginBottom)))};if(n[0]="top"===n[0]&&p.height>u.top&&p.height<=u.bottom?"bottom":"bottom"===n[0]&&p.height>u.bottom&&p.height<=u.top?"top":"left"===n[0]&&p.width>u.left&&p.width<=u.right?"right":"right"===n[0]&&p.width>u.right&&p.width<=u.left?"left":n[0],n[1]="top"===n[1]&&p.height-s.height>u.bottom&&p.height-s.height<=u.top?"bottom":"bottom"===n[1]&&p.height-s.height>u.top&&p.height-s.height<=u.bottom?"top":"left"===n[1]&&p.width-s.width>u.right&&p.width-s.width<=u.left?"right":"right"===n[1]&&p.width-s.width>u.left&&p.width-s.width<=u.right?"left":n[1],"center"===n[1])if(i.vertical.test(n[0])){var f=s.width/2-a/2;u.left+f<0&&p.width-s.width<=u.right?n[1]="left":u.right+f<0&&p.width-s.width<=u.left&&(n[1]="right")}else{var m=s.height/2-p.height/2;u.top+m<0&&p.height-s.height<=u.bottom?n[1]="top":u.bottom+m<0&&p.height-s.height<=u.top&&(n[1]="bottom")}}switch(n[0]){case"top":d.top=s.top-l;break;case"bottom":d.top=s.top+s.height;break;case"left":d.left=s.left-a;break;case"right":d.left=s.left+s.width}switch(n[1]){case"top":d.top=s.top;break;case"bottom":d.top=s.top+s.height-l;break;case"left":d.left=s.left;break;case"right":d.left=s.left+s.width-a;break;case"center":i.vertical.test(n[0])?d.left=s.left+s.width/2-a/2:d.top=s.top+s.height/2-l/2}return d.top=Math.round(d.top),d.left=Math.round(d.left),d.placement="center"===n[1]?n[0]:n[0]+"-"+n[1],d},adjustTop:function(t,e,o,n){return-1!==t.indexOf("top")&&o!==n?{top:e.top-n+"px"}:void 0},positionArrow:function(t,o){t=this.getRawNode(t);var n=t.querySelector(".tooltip-inner, .popover-inner");if(n){var r=angular.element(n).hasClass("tooltip-inner"),a=t.querySelector(r?".tooltip-arrow":".arrow");if(a){var l={top:"",bottom:"",left:"",right:""};if(o=this.parsePlacement(o),"center"===o[1])return void angular.element(a).css(l);var s="border-"+o[0]+"-width",d=e.getComputedStyle(a)[s],u="border-";u+=i.vertical.test(o[0])?o[0]+"-"+o[1]:o[1]+"-"+o[0],u+="-radius";var c=e.getComputedStyle(r?n:t)[u];switch(o[0]){case"top":l.bottom=r?"0":"-"+d;break;case"bottom":l.top=r?"0":"-"+d;break;case"left":l.right=r?"0":"-"+d;break;case"right":l.left=r?"0":"-"+d}l[o[1]]=c,angular.element(a).css(l)}}}}}]),angular.module("ui.bootstrap.position").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibPositionCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-position-measure{display:block !important;visibility:hidden !important;position:absolute !important;top:-9999px !important;left:-9999px !important;}.uib-position-scrollbar-measure{position:absolute !important;top:-9999px !important;width:50px !important;height:50px !important;overflow:scroll !important;}.uib-position-body-scrollbar-measure{overflow:scroll !important;}</style>'),angular.$$uibPositionCss=!0});
/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 2.3.1 - 2016-12-10
 * License: MIT
 */angular.module("ui.bootstrap",["ui.bootstrap.tpls","ui.bootstrap.modal","ui.bootstrap.multiMap","ui.bootstrap.stackedMap","ui.bootstrap.position"]),angular.module("ui.bootstrap.tpls",["uib/template/modal/window.html"]),angular.module("ui.bootstrap.modal",["ui.bootstrap.multiMap","ui.bootstrap.stackedMap","ui.bootstrap.position"]).provider("$uibResolve",function(){var t=this;this.resolver=null,this.setResolver=function(t){this.resolver=t},this.$get=["$injector","$q",function(e,o){var n=t.resolver?e.get(t.resolver):null;return{resolve:function(t,r,i,a){if(n)return n.resolve(t,r,i,a);var l=[];return angular.forEach(t,function(t){l.push(angular.isFunction(t)||angular.isArray(t)?o.resolve(e.invoke(t)):angular.isString(t)?o.resolve(e.get(t)):o.resolve(t))}),o.all(l).then(function(e){var o={},n=0;return angular.forEach(t,function(t,r){o[r]=e[n++]}),o})}}}]}).directive("uibModalBackdrop",["$animate","$injector","$uibModalStack",function(t,e,o){function n(e,n,r){r.modalInClass&&(t.addClass(n,r.modalInClass),e.$on(o.NOW_CLOSING_EVENT,function(o,i){var a=i();e.modalOptions.animation?t.removeClass(n,r.modalInClass).then(a):a()}))}return{restrict:"A",compile:function(t,e){return t.addClass(e.backdropClass),n}}}]).directive("uibModalWindow",["$uibModalStack","$q","$animateCss","$document",function(t,e,o,n){return{scope:{index:"@"},restrict:"A",transclude:!0,templateUrl:function(t,e){return e.templateUrl||"uib/template/modal/window.html"},link:function(r,i,a){i.addClass(a.windowTopClass||""),r.size=a.size,r.close=function(e){var o=t.getTop();o&&o.value.backdrop&&"static"!==o.value.backdrop&&e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),t.dismiss(o.key,"backdrop click"))},i.on("click",r.close),r.$isRendered=!0;var l=e.defer();r.$$postDigest(function(){l.resolve()}),l.promise.then(function(){var l=null;a.modalInClass&&(l=o(i,{addClass:a.modalInClass}).start(),r.$on(t.NOW_CLOSING_EVENT,function(t,e){var n=e();o(i,{removeClass:a.modalInClass}).start().then(n)})),e.when(l).then(function(){var e=t.getTop();if(e&&t.modalRendered(e.key),!n[0].activeElement||!i[0].contains(n[0].activeElement)){var o=i[0].querySelector("[autofocus]");o?o.focus():i[0].focus()}})})}}}]).directive("uibModalAnimationClass",function(){return{compile:function(t,e){e.modalAnimation&&t.addClass(e.uibModalAnimationClass)}}}).directive("uibModalTransclude",["$animate",function(t){return{link:function(e,o,n,r,i){i(e.$parent,function(e){o.empty(),t.enter(e,o)})}}}]).factory("$uibModalStack",["$animate","$animateCss","$document","$compile","$rootScope","$q","$$multiMap","$$stackedMap","$uibPosition",function(t,e,o,n,r,i,a,l,s){function d(t){var e="-";return t.replace(D,function(t,o){return(o?e:"")+t.toLowerCase()})}function u(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function c(){for(var t=-1,e=C.keys(),o=0;o<e.length;o++)C.get(e[o]).value.backdrop&&(t=o);return t>-1&&M>t&&(t=M),t}function p(t,e){var o=C.get(t).value,n=o.appendTo;C.remove(t),T=C.top(),T&&(M=parseInt(T.value.modalDomEl.attr("index"),10)),h(o.modalDomEl,o.modalScope,function(){var e=o.openedClass||k;S.remove(e,t);var r=S.hasKey(e);n.toggleClass(e,r),!r&&y&&y.heightOverflow&&y.scrollbarWidth&&(n.css(y.originalRight?{paddingRight:y.originalRight+"px"}:{paddingRight:""}),y=null),f(!0)},o.closedDeferred),m(),e&&e.focus?e.focus():n.focus&&n.focus()}function f(t){var e;C.length()>0&&(e=C.top().value,e.modalDomEl.toggleClass(e.windowTopClass||"",t))}function m(){if(w&&-1===c()){var t=$;h(w,$,function(){t=null}),w=void 0,$=void 0}}function h(e,o,n,r){function a(){a.done||(a.done=!0,t.leave(e).then(function(){n&&n(),e.remove(),r&&r.resolve()}),o.$destroy())}var l,s=null,d=function(){return l||(l=i.defer(),s=l.promise),function(){l.resolve()}};return o.$broadcast(E.NOW_CLOSING_EVENT,d),i.when(s).then(a)}function g(t){if(t.isDefaultPrevented())return t;var e=C.top();if(e)switch(t.which){case 27:e.value.keyboard&&(t.preventDefault(),r.$apply(function(){E.dismiss(e.key,"escape key press")}));break;case 9:var o=E.loadFocusElementList(e),n=!1;t.shiftKey?(E.isFocusInFirstItem(t,o)||E.isModalFocused(t,e))&&(n=E.focusLastFocusableElement(o)):E.isFocusInLastItem(t,o)&&(n=E.focusFirstFocusableElement(o)),n&&(t.preventDefault(),t.stopPropagation())}}function v(t,e,o){return!t.value.modalScope.$broadcast("modal.closing",e,o).defaultPrevented}function b(){Array.prototype.forEach.call(document.querySelectorAll("["+x+"]"),function(t){var e=parseInt(t.getAttribute(x),10),o=e-1;t.setAttribute(x,o),o||(t.removeAttribute(x),t.removeAttribute("aria-hidden"))})}var w,$,y,k="modal-open",C=l.createNew(),S=a.createNew(),E={NOW_CLOSING_EVENT:"modal.stack.now-closing"},M=0,T=null,x="data-bootstrap-modal-aria-hidden-count",N="a[href], area[href], input:not([disabled]):not([tabindex='-1']), button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']), textarea:not([disabled]):not([tabindex='-1']), iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true]",D=/[A-Z]/g;return r.$watch(c,function(t){$&&($.index=t)}),o.on("keydown",g),r.$on("$destroy",function(){o.off("keydown",g)}),E.open=function(e,i){function a(t){function e(t){var e=t.parent()?t.parent().children():[];return Array.prototype.filter.call(e,function(e){return e!==t[0]})}if(t&&"BODY"!==t[0].tagName)return e(t).forEach(function(t){var e="true"===t.getAttribute("aria-hidden"),o=parseInt(t.getAttribute(x),10);o||(o=e?1:0),t.setAttribute(x,o+1),t.setAttribute("aria-hidden","true")}),a(t.parent())}var l=o[0].activeElement,u=i.openedClass||k;f(!1),T=C.top(),C.add(e,{deferred:i.deferred,renderDeferred:i.renderDeferred,closedDeferred:i.closedDeferred,modalScope:i.scope,backdrop:i.backdrop,keyboard:i.keyboard,openedClass:i.openedClass,windowTopClass:i.windowTopClass,animation:i.animation,appendTo:i.appendTo}),S.put(u,e);var p=i.appendTo,m=c();if(!p.length)throw new Error("appendTo element not found. Make sure that the element passed is in DOM.");m>=0&&!w&&($=r.$new(!0),$.modalOptions=i,$.index=m,w=angular.element('<div uib-modal-backdrop="modal-backdrop"></div>'),w.attr({"class":"modal-backdrop","ng-style":"{'z-index': 1040 + (index && 1 || 0) + index*10}","uib-modal-animation-class":"fade","modal-in-class":"in"}),i.backdropClass&&w.addClass(i.backdropClass),i.animation&&w.attr("modal-animation","true"),n(w)($),t.enter(w,p),s.isScrollable(p)&&(y=s.scrollbarPadding(p),y.heightOverflow&&y.scrollbarWidth&&p.css({paddingRight:y.right+"px"})));var h;i.component?(h=document.createElement(d(i.component.name)),h=angular.element(h),h.attr({resolve:"$resolve","modal-instance":"$uibModalInstance",close:"$close($value)",dismiss:"$dismiss($value)"})):h=i.content,M=T?parseInt(T.value.modalDomEl.attr("index"),10)+1:0;var g=angular.element('<div uib-modal-window="modal-window"></div>');g.attr({"class":"modal","template-url":i.windowTemplateUrl,"window-top-class":i.windowTopClass,role:"dialog","aria-labelledby":i.ariaLabelledBy,"aria-describedby":i.ariaDescribedBy,size:i.size,index:M,animate:"animate","ng-style":"{'z-index': 1050 + $$topModalIndex*10, display: 'block'}",tabindex:-1,"uib-modal-animation-class":"fade","modal-in-class":"in"}).append(h),i.windowClass&&g.addClass(i.windowClass),i.animation&&g.attr("modal-animation","true"),p.addClass(u),i.scope&&(i.scope.$$topModalIndex=M),t.enter(n(g)(i.scope),p),C.top().value.modalDomEl=g,C.top().value.modalOpener=l,a(g)},E.close=function(t,e){var o=C.get(t);return b(),o&&v(o,e,!0)?(o.value.modalScope.$$uibDestructionScheduled=!0,o.value.deferred.resolve(e),p(t,o.value.modalOpener),!0):!o},E.dismiss=function(t,e){var o=C.get(t);return b(),o&&v(o,e,!1)?(o.value.modalScope.$$uibDestructionScheduled=!0,o.value.deferred.reject(e),p(t,o.value.modalOpener),!0):!o},E.dismissAll=function(t){for(var e=this.getTop();e&&this.dismiss(e.key,t);)e=this.getTop()},E.getTop=function(){return C.top()},E.modalRendered=function(t){var e=C.get(t);e&&e.value.renderDeferred.resolve()},E.focusFirstFocusableElement=function(t){return t.length>0?(t[0].focus(),!0):!1},E.focusLastFocusableElement=function(t){return t.length>0?(t[t.length-1].focus(),!0):!1},E.isModalFocused=function(t,e){if(t&&e){var o=e.value.modalDomEl;if(o&&o.length)return(t.target||t.srcElement)===o[0]}return!1},E.isFocusInFirstItem=function(t,e){return e.length>0?(t.target||t.srcElement)===e[0]:!1},E.isFocusInLastItem=function(t,e){return e.length>0?(t.target||t.srcElement)===e[e.length-1]:!1},E.loadFocusElementList=function(t){if(t){var e=t.value.modalDomEl;if(e&&e.length){var o=e[0].querySelectorAll(N);return o?Array.prototype.filter.call(o,function(t){return u(t)}):o}}},E}]).provider("$uibModal",function(){var t={options:{animation:!0,backdrop:!0,keyboard:!0},$get:["$rootScope","$q","$document","$templateRequest","$controller","$uibResolve","$uibModalStack",function(e,o,n,r,i,a,l){function s(t){return t.template?o.when(t.template):r(angular.isFunction(t.templateUrl)?t.templateUrl():t.templateUrl)}var d={},u=null;return d.getPromiseChain=function(){return u},d.open=function(r){function d(){return g}var c=o.defer(),p=o.defer(),f=o.defer(),m=o.defer(),h={result:c.promise,opened:p.promise,closed:f.promise,rendered:m.promise,close:function(t){return l.close(h,t)},dismiss:function(t){return l.dismiss(h,t)}};if(r=angular.extend({},t.options,r),r.resolve=r.resolve||{},r.appendTo=r.appendTo||n.find("body").eq(0),!r.component&&!r.template&&!r.templateUrl)throw new Error("One of component or template or templateUrl options is required.");var g;g=r.component?o.when(a.resolve(r.resolve,{},null,null)):o.all([s(r),a.resolve(r.resolve,{},null,null)]);var v;return v=u=o.all([u]).then(d,d).then(function(t){function o(e,o,n,r){e.$scope=a,e.$scope.$resolve={},n?e.$scope.$uibModalInstance=h:e.$uibModalInstance=h;var i=o?t[1]:t;angular.forEach(i,function(t,o){r&&(e[o]=t),e.$scope.$resolve[o]=t})}var n=r.scope||e,a=n.$new();a.$close=h.close,a.$dismiss=h.dismiss,a.$on("$destroy",function(){a.$$uibDestructionScheduled||a.$dismiss("$uibUnscheduledDestruction")});var s,d,u={scope:a,deferred:c,renderDeferred:m,closedDeferred:f,animation:r.animation,backdrop:r.backdrop,keyboard:r.keyboard,backdropClass:r.backdropClass,windowTopClass:r.windowTopClass,windowClass:r.windowClass,windowTemplateUrl:r.windowTemplateUrl,ariaLabelledBy:r.ariaLabelledBy,ariaDescribedBy:r.ariaDescribedBy,size:r.size,openedClass:r.openedClass,appendTo:r.appendTo},g={},v={};r.component?(o(g,!1,!0,!1),g.name=r.component,u.component=g):r.controller&&(o(v,!0,!1,!0),d=i(r.controller,v,!0,r.controllerAs),r.controllerAs&&r.bindToController&&(s=d.instance,s.$close=a.$close,s.$dismiss=a.$dismiss,angular.extend(s,{$resolve:v.$scope.$resolve},n)),s=d(),angular.isFunction(s.$onInit)&&s.$onInit()),r.component||(u.content=t[0]),l.open(h,u),p.resolve(!0)},function(t){p.reject(t),c.reject(t)})["finally"](function(){u===v&&(u=null)}),h},d}]};return t}),angular.module("ui.bootstrap.multiMap",[]).factory("$$multiMap",function(){return{createNew:function(){var t={};return{entries:function(){return Object.keys(t).map(function(e){return{key:e,value:t[e]}})},get:function(e){return t[e]},hasKey:function(e){return!!t[e]},keys:function(){return Object.keys(t)},put:function(e,o){t[e]||(t[e]=[]),t[e].push(o)},remove:function(e,o){var n=t[e];if(n){var r=n.indexOf(o);-1!==r&&n.splice(r,1),n.length||delete t[e]}}}}}}),angular.module("ui.bootstrap.stackedMap",[]).factory("$$stackedMap",function(){return{createNew:function(){var t=[];return{add:function(e,o){t.push({key:e,value:o})},get:function(e){for(var o=0;o<t.length;o++)if(e===t[o].key)return t[o]},keys:function(){for(var e=[],o=0;o<t.length;o++)e.push(t[o].key);return e},top:function(){return t[t.length-1]},remove:function(e){for(var o=-1,n=0;n<t.length;n++)if(e===t[n].key){o=n;break}return t.splice(o,1)[0]},removeTop:function(){return t.pop()},length:function(){return t.length}}}}}),angular.module("ui.bootstrap.position",[]).factory("$uibPosition",["$document","$window",function(t,e){var o,n,r={normal:/(auto|scroll)/,hidden:/(auto|scroll|hidden)/},i={auto:/\s?auto?\s?/i,primary:/^(top|bottom|left|right)$/,secondary:/^(top|bottom|left|right|center)$/,vertical:/^(top|bottom)$/},a=/(HTML|BODY)/;return{getRawNode:function(t){return t.nodeName?t:t[0]||t},parseStyle:function(t){return t=parseFloat(t),isFinite(t)?t:0},offsetParent:function(o){function n(t){return"static"===(e.getComputedStyle(t).position||"static")}o=this.getRawNode(o);for(var r=o.offsetParent||t[0].documentElement;r&&r!==t[0].documentElement&&n(r);)r=r.offsetParent;return r||t[0].documentElement},scrollbarWidth:function(r){if(r){if(angular.isUndefined(n)){var i=t.find("body");i.addClass("uib-position-body-scrollbar-measure"),n=e.innerWidth-i[0].clientWidth,n=isFinite(n)?n:0,i.removeClass("uib-position-body-scrollbar-measure")}return n}if(angular.isUndefined(o)){var a=angular.element('<div class="uib-position-scrollbar-measure"></div>');t.find("body").append(a),o=a[0].offsetWidth-a[0].clientWidth,o=isFinite(o)?o:0,a.remove()}return o},scrollbarPadding:function(t){t=this.getRawNode(t);var o=e.getComputedStyle(t),n=this.parseStyle(o.paddingRight),r=this.parseStyle(o.paddingBottom),i=this.scrollParent(t,!1,!0),l=this.scrollbarWidth(a.test(i.tagName));return{scrollbarWidth:l,widthOverflow:i.scrollWidth>i.clientWidth,right:n+l,originalRight:n,heightOverflow:i.scrollHeight>i.clientHeight,bottom:r+l,originalBottom:r}},isScrollable:function(t,o){t=this.getRawNode(t);var n=o?r.hidden:r.normal,i=e.getComputedStyle(t);return n.test(i.overflow+i.overflowY+i.overflowX)},scrollParent:function(o,n,i){o=this.getRawNode(o);var a=n?r.hidden:r.normal,l=t[0].documentElement,s=e.getComputedStyle(o);if(i&&a.test(s.overflow+s.overflowY+s.overflowX))return o;var d="absolute"===s.position,u=o.parentElement||l;if(u===l||"fixed"===s.position)return l;for(;u.parentElement&&u!==l;){var c=e.getComputedStyle(u);if(d&&"static"!==c.position&&(d=!1),!d&&a.test(c.overflow+c.overflowY+c.overflowX))break;u=u.parentElement}return u},position:function(o,n){o=this.getRawNode(o);var r=this.offset(o);if(n){var i=e.getComputedStyle(o);r.top-=this.parseStyle(i.marginTop),r.left-=this.parseStyle(i.marginLeft)}var a=this.offsetParent(o),l={top:0,left:0};return a!==t[0].documentElement&&(l=this.offset(a),l.top+=a.clientTop-a.scrollTop,l.left+=a.clientLeft-a.scrollLeft),{width:Math.round(angular.isNumber(r.width)?r.width:o.offsetWidth),height:Math.round(angular.isNumber(r.height)?r.height:o.offsetHeight),top:Math.round(r.top-l.top),left:Math.round(r.left-l.left)}},offset:function(o){o=this.getRawNode(o);var n=o.getBoundingClientRect();return{width:Math.round(angular.isNumber(n.width)?n.width:o.offsetWidth),height:Math.round(angular.isNumber(n.height)?n.height:o.offsetHeight),top:Math.round(n.top+(e.pageYOffset||t[0].documentElement.scrollTop)),left:Math.round(n.left+(e.pageXOffset||t[0].documentElement.scrollLeft))}},viewportOffset:function(o,n,r){o=this.getRawNode(o),r=r!==!1?!0:!1;var i=o.getBoundingClientRect(),a={top:0,left:0,bottom:0,right:0},l=n?t[0].documentElement:this.scrollParent(o),s=l.getBoundingClientRect();if(a.top=s.top+l.clientTop,a.left=s.left+l.clientLeft,l===t[0].documentElement&&(a.top+=e.pageYOffset,a.left+=e.pageXOffset),a.bottom=a.top+l.clientHeight,a.right=a.left+l.clientWidth,r){var d=e.getComputedStyle(l);a.top+=this.parseStyle(d.paddingTop),a.bottom-=this.parseStyle(d.paddingBottom),a.left+=this.parseStyle(d.paddingLeft),a.right-=this.parseStyle(d.paddingRight)}return{top:Math.round(i.top-a.top),bottom:Math.round(a.bottom-i.bottom),left:Math.round(i.left-a.left),right:Math.round(a.right-i.right)}},parsePlacement:function(t){var e=i.auto.test(t);return e&&(t=t.replace(i.auto,"")),t=t.split("-"),t[0]=t[0]||"top",i.primary.test(t[0])||(t[0]="top"),t[1]=t[1]||"center",i.secondary.test(t[1])||(t[1]="center"),t[2]=e?!0:!1,t},positionElements:function(t,o,n,r){t=this.getRawNode(t),o=this.getRawNode(o);var a=angular.isDefined(o.offsetWidth)?o.offsetWidth:o.prop("offsetWidth"),l=angular.isDefined(o.offsetHeight)?o.offsetHeight:o.prop("offsetHeight");n=this.parsePlacement(n);var s=r?this.offset(t):this.position(t),d={top:0,left:0,placement:""};if(n[2]){var u=this.viewportOffset(t,r),c=e.getComputedStyle(o),p={width:a+Math.round(Math.abs(this.parseStyle(c.marginLeft)+this.parseStyle(c.marginRight))),height:l+Math.round(Math.abs(this.parseStyle(c.marginTop)+this.parseStyle(c.marginBottom)))};if(n[0]="top"===n[0]&&p.height>u.top&&p.height<=u.bottom?"bottom":"bottom"===n[0]&&p.height>u.bottom&&p.height<=u.top?"top":"left"===n[0]&&p.width>u.left&&p.width<=u.right?"right":"right"===n[0]&&p.width>u.right&&p.width<=u.left?"left":n[0],n[1]="top"===n[1]&&p.height-s.height>u.bottom&&p.height-s.height<=u.top?"bottom":"bottom"===n[1]&&p.height-s.height>u.top&&p.height-s.height<=u.bottom?"top":"left"===n[1]&&p.width-s.width>u.right&&p.width-s.width<=u.left?"right":"right"===n[1]&&p.width-s.width>u.left&&p.width-s.width<=u.right?"left":n[1],"center"===n[1])if(i.vertical.test(n[0])){var f=s.width/2-a/2;u.left+f<0&&p.width-s.width<=u.right?n[1]="left":u.right+f<0&&p.width-s.width<=u.left&&(n[1]="right")}else{var m=s.height/2-p.height/2;u.top+m<0&&p.height-s.height<=u.bottom?n[1]="top":u.bottom+m<0&&p.height-s.height<=u.top&&(n[1]="bottom")}}switch(n[0]){case"top":d.top=s.top-l;break;case"bottom":d.top=s.top+s.height;break;case"left":d.left=s.left-a;break;case"right":d.left=s.left+s.width}switch(n[1]){case"top":d.top=s.top;break;case"bottom":d.top=s.top+s.height-l;break;case"left":d.left=s.left;break;case"right":d.left=s.left+s.width-a;break;case"center":i.vertical.test(n[0])?d.left=s.left+s.width/2-a/2:d.top=s.top+s.height/2-l/2}return d.top=Math.round(d.top),d.left=Math.round(d.left),d.placement="center"===n[1]?n[0]:n[0]+"-"+n[1],d},adjustTop:function(t,e,o,n){return-1!==t.indexOf("top")&&o!==n?{top:e.top-n+"px"}:void 0},positionArrow:function(t,o){t=this.getRawNode(t);var n=t.querySelector(".tooltip-inner, .popover-inner");if(n){var r=angular.element(n).hasClass("tooltip-inner"),a=t.querySelector(r?".tooltip-arrow":".arrow");if(a){var l={top:"",bottom:"",left:"",right:""};if(o=this.parsePlacement(o),"center"===o[1])return void angular.element(a).css(l);var s="border-"+o[0]+"-width",d=e.getComputedStyle(a)[s],u="border-";u+=i.vertical.test(o[0])?o[0]+"-"+o[1]:o[1]+"-"+o[0],u+="-radius";var c=e.getComputedStyle(r?n:t)[u];switch(o[0]){case"top":l.bottom=r?"0":"-"+d;break;case"bottom":l.top=r?"0":"-"+d;break;case"left":l.right=r?"0":"-"+d;break;case"right":l.left=r?"0":"-"+d}l[o[1]]=c,angular.element(a).css(l)}}}}}]),angular.module("uib/template/modal/window.html",[]).run(["$templateCache",function(t){t.put("uib/template/modal/window.html","<div class=\"modal-dialog {{size ? 'modal-' + size : ''}}\"><div class=\"modal-content\" uib-modal-transclude></div></div>\n")}]),angular.module("ui.bootstrap.position").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibPositionCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-position-measure{display:block !important;visibility:hidden !important;position:absolute !important;top:-9999px !important;left:-9999px !important;}.uib-position-scrollbar-measure{position:absolute !important;top:-9999px !important;width:50px !important;height:50px !important;overflow:scroll !important;}.uib-position-body-scrollbar-measure{overflow:scroll !important;}</style>'),angular.$$uibPositionCss=!0});
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
  MusicPlayerController.$inject = ["musicPlayerFactory", "$scope", "$state"];
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

  function MusicPlayerController(musicPlayerFactory, $scope, $state){
    var vm = this;
    vm.musicPlayer = musicPlayerFactory;

    /*
    0
album_name
:
"Desi Boyz"
artist_name
:
"Sonu Nigam, Shilpa Rao"
coverArtHR
:
null
coverArtLR
:
null
duration
:
"00:03:48"
genre_name
:
"genre"
isCuedSong
:
0
isCurrentSong
:
1
isSongPresentOnMaster
:
null
liked
:
0
program_item_id
:
0
releaseId
:
null
song_action_id
:
0
song_dedicates
:
0
song_disc_count
:
0
song_id
:
43108
song_like
:
0
song_lyrics
:
null
song_name
:
"Allah Maaf Kare"
song_requests
:
0
*/



    function init(){



    }

    init();

  }
})();

(function(){
  'use strict';


    /** @ngInject */

  HeaderController.$inject = ["$scope", "locationService", "$state", "$transitions"];
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

  UserDataFactory.$inject = ["muzeApiService", "$timeout", "$q", "$window"];
  angular.module('muze')
  .service('userDataFactory',UserDataFactory);

  /** @ngInject */
  function UserDataFactory(muzeApiService,$timeout,$q,$window){

    var userData;

    this.getUser = function(){
      return; //muzeApiService.get({route:'/city/list_city',param:''});
    };

    this.saveUser = function(){
      var deferred = $q.defer();
      $timeout(function(){
        $window.localStorage['user']= JSON.stringify({user_id: 381});
        return user;
      },100)
      .then(function(data){

        //store user
        userData = data;
        //resolve promise
        deferred.resolve(userData);
      }, function(err){
        deferred.reject(err);
      });

      return deferred.promise;
    };

    this.getUserDetails = function(){
      return userData;
    };

    this.getUserId = function(){
      return userData.user_id;
    };

    function init(){
      if(!$window.localStorage['user']){
          $window.localStorage['user']= JSON.stringify({user_id: 381});
      }
      userData = JSON.parse($window.localStorage['user']);

    }

    init();

  }
})();

(function(){
  'use strict';

  MuzeApiService.$inject = ["$http", "$q", "$rootScope"];
  angular.module('muze')
  .service('muzeApiService',MuzeApiService);

  /** @ngInject */

  function MuzeApiService($http,$q,$rootScope){
    var BASE_URL = 'http://52.63.12.142:8080/MuzeHumm';

    /*
    ** req object params:
    **    @param route [string, required]: api target where request is being sent
    **    @param params [string/object/null, optional]: parameters that need to be sent along with request
    **    @param privateApi [boolean, required]r: tell apiService whether the api we are requesting, needs authentication or not
    */
    this.get = function(req){
      var deferred =  $q.defer();

      //raise private event here, if api is authorized api
      if(req.privateApi){
          $rootScope.$broadcast('$privateApiRequest', deferred);
      }

      $http({
        url: BASE_URL+req.route,
        method : 'GET',
        params: req.params
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(msg, code){
        deferred.reject(msg);
      });


      return deferred.promise;
    };

    this.post = function(route,params){
      //check auth here
      return false;
    }

  }
})();

(function(){
  'use strict';

  musicPlayerFactory.$inject = ["$transitions", "muzeApiService", "locationService", "userDataFactory"];
  angular.module('muze')
  .factory('musicPlayerFactory', musicPlayerFactory);

  /** @ngInject */

  function musicPlayerFactory($transitions,muzeApiService, locationService, userDataFactory){
    var music = {};

    // urls
    music._128bitURL = 'http://93.190.141.15:7004/HUMM_128.mp3';
    music._64bitURL = 'http://93.190.141.15:7004/humm_64.mp3';

    // start with low quality first
    music.src = music._128bitURL;
    music.highQuality = true;

    // start with paused state
    music.playState = false;

    //feedlist
    music.feedList = [];
    music.currentSong = null;

    music.pause = function(){
      music.playState = false;
      music.audioStream.pause();
    };

    music.play = function(){
      music.playState = true;
      music.audioStream.play();
    };

    music.setHighQuality = function(highQuality){
      music.pause();
      if(highQuality){
        music.src = music.highBitRateURL;
        music.highQuality = true;
      }else{
        music.src = music.lowBitRateURL;
        music.highQuality = false;
      }
      //create new stream
      music.audioStream = new Audio(music.src);
      music.play();
    };

    music.getQuality = function(){
      if(music.highQuality){
        return '128';
      }else{
        return '64';
      }
    };

    music.getSource = function(){
      return music.src;
    };

    music.getFeedList = function(){
      var currentDatetime = locationService.getNZLocalTime();
      //currentDatetime = currentDatetime.replace(/\.[0-9]*Z$/,'');
      return muzeApiService.get({
        route: '/feed/getFeedList',
        params: {
          category_id : locationService.getCategoryId(0),
          venue_id : locationService.getVenueId(0),
          action_id : 1,
          currentDatetime: currentDatetime,
          user_id : userDataFactory.getUserId()
        }
      });
    };

    function moveCurrentlyPlayingSong(){
        music.feedList.forEach(function(song, index){
          if(song.isCurrentSong){
            music.currentSong = song;
            music.feedList.splice(index,1);
            return;
          }
        });
    }

    function init(){

      // create new audio stream
      music.audioStream = new Audio(music.src);

      // get feed list
      music.getFeedList()
      .then(function(response){
        if(response.program){
          music.feedList = response.program.feedlist;
          moveCurrentlyPlayingSong();
        }
      });

      $transitions.onStart({}, function($transition$){
        if($transition$.$to().name === 'location-selection'){
          music.pause();
        }
      });
    }

    init();

    return music;

  }
})();

(function(){
  'use strict';

  LocationService.$inject = ["muzeApiService", "$timeout", "$q", "$window", "userDataFactory"];
  angular.module('muze')
  .service('locationService',LocationService);

  /** @ngInject */
  function LocationService(muzeApiService,$timeout,$q,$window, userDataFactory){

    var locationData, venueData;

    this.getLocationListing = function(){
      return muzeApiService.get({
        route:'/city/list_city',
        params:''
      });
    };

    this.getVenueList = function(){
      var date = new Date();
      var user_id = userDataFactory.getUserId();
      var city = locationData.city_id;
      var latitude = 0;
      var longitude =0;
      var params = '?latitude='+latitude+'&longitude='+longitude+'&count=0&currentDatetime='+date+'&user_id='+user_id+'&city='+city;
      return muzeApiService.get({
        route: '/categoryvenue/list_venue'+params,
        params: ''
      });
    };

    this.saveLocationLocal = function(city){
      var deferred = $q.defer();
      $timeout(function(){
        $window.localStorage['muze_city']= JSON.stringify(city);
        return city;
      },100)
      .then(function(data){

        //store city
        locationData = data;
        //resolve promise
        deferred.resolve(locationData);
      }, function(err){
        deferred.reject(err);
      });

      return deferred.promise;
    };

    this.saveVenueList = function(venues){
      $window.localStorage['venues'] = JSON.stringify(venues);
      venueData = venues;
    };

    this.getSavedLocationLocal = function(){
      return locationData;
    };

    this.getCityId = function(){
      return locationData.city_id;
    };

    this.getVenueId = function(venue){
      return venueData[venue].venue_id;
    };

    this.getCategoryId = function(venue){
      return venueData[venue].category_id;
    };

    this.getNZLocalTime = function(){
      var d = new Date();
      d = new Date(d.getTime() + (d.getTimezoneOffset() + 780) * 60000);

      d = d.toISOString();
      d = d.replace('T',' ').replace('Z','');

      return d;

    }

    function init(){
      if($window.localStorage['muze_city']){
        locationData = JSON.parse($window.localStorage['muze_city']);
      }

      //venue
      if($window.localStorage['venues']){
        venueData = JSON.parse($window.localStorage['venues']);
      }


    }

    init();

  }
})();

(function(){
  'use strict';

  authService.$inject = ["muzeApiService"];
  angular.module('muze')
  .service('authService', authService);

  /** @ngInject */

 function authService(muzeApiService){
    var authService = this;

    authService.isAuthenticated = function(){
      return true;
    }
  }

})();

(function(){
  'use strict';

  MainController.$inject = ["$uibModal", "authService", "$state"];
  angular.module('muze')
  .component('app', {
    bindings: {
      city: '<'
    },
    templateUrl: 'app/main.html',
    controller: MainController
  });

  /** @ngInject */

  function MainController($uibModal,authService, $state) {
    var vm = this;


    function checkLocation(){
      /*$uibModal.open({
        controller: 'LocationSelectionDialogController',
        templateUrl: '/app/components/dialog/location-selection/location-selection.html',
        controllerAs: '$ctrl',
        resolve: {
          items: function(){
            return {};
          }
        }
      });
      */

      if(!vm.city){
        $state.go('location-selection');
      }
    }





    /** Initialization **/

    function init(){

      //check location
      checkLocation();

    }
    init();
  }

})();

angular.module("muze").run(["$templateCache", function($templateCache) {$templateCache.put("app/main.html","<div class=\"main-app-container\">\n  <div>\n    <ad-unit></ad-unit>\n  </div>\n\n  <!-- gallery -->\n  <div class=\"layout-row flex\">\n\n    <div class=\"flex-rem flex main-tabs-wrapper\">\n      <div class=\"main-tabs-container\">\n\n        <div class=\"tabs-tab-container layout-row flex\">\n          <div class=\"tabs-tab active\">Music</div>\n          <div class=\"tabs-tab\">Discuss</div>\n          <div class=\"tabs-tab\">Engage</div>\n        </div>\n        <div class=\"flex flex-rem tabs-content-container layout-column\">\n\n          <music-player class=\"component\"></music-player>\n\n        </div>\n        <div class=\"tabs-tab-container layout-row flex\">\n          <div class=\"tabs-tab\">Shows</div>\n          <div class=\"tabs-tab\">Request</div>\n          <div class=\"tabs-tab\">Info</div>\n        </div>\n\n\n      </div>\n\n    </div>\n\n    <div class=\"flex-rem flex layout-column gallery-home-container\">\n      <gallery class=\"component\"></gallery>\n    </div>\n\n  </div>\n\n\n\n\n  <div>\n    <trending-now class=\"component\"></trending-now>\n  </div>\n\n  <div class=\"layout-row flex\">\n\n    <div class=\"flex flex-rem layout-column margin-r-20\">\n      <div>\n        <shows class=\"component\"></shows>\n      </div>\n      <div>\n        <charts class=\"component\"></charts>\n      </div>\n      <div>\n        <news class=\"component\"></news>\n      </div>\n      <div>\n        <shop-now class=\"component\"></shop-now>\n      </div>\n      <div>\n        <classifieds class=\"component\"></classifieds>\n      </div>\n      <div>\n        <rj-profiles class=\"component\"></rj-profiles>\n      </div>\n    </div>\n    <div class=\"flex layout-column main-app-container--right-ads-container pad-box-10\" style=\"min-width:400px\">\n      <ad-unit class=\"margin-td-10 component\" type=\"\'large\'\"></ad-unit>\n      <ad-unit type=\"\'large\'\" class=\"margin-td-10 component\"></ad-unit>\n    </div>\n\n  </div>\n\n</div>\n");
$templateCache.put("app/components/ad-unit/ad-unit.html","<div class=\"flex flex-rem pad-lr-10\" ng-style=\"$ctrl.type == \'large\'? {\'min-height\': \'500px\'}:{}\" style=\"background:rgba(0,0,0,0.2);color:grey\"><h2>{{$ctrl.page}}</h2></div>\n");
$templateCache.put("app/components/charts/charts.html","<div class=\"charts-container\">\n  <div class=\"component-header component-charts-header\">\n    <h4>Charts</h4>\n  </div>\n\n  <div class=\"component-content-container component-charts-container\">\n\n\n    <div class=\"charts-card layout-row flex layout-align-start-center\">\n\n        <div class=\"flex flex-rem\"></div>\n      <div class=\"layout-column flex\">\n        <h4>Humm FM Top 20</h4>\n        <div>\n          <div class=\"layout-row flex flex-rem margin-d-20 chart-table-item\">\n            <div class=\"margin-r-10\">\n              <span>1</span>\n            </div>\n            <div class=\"flex flex-rem layout-column\">\n              <p class=\"margin-d-10\">Song Name</p>\n              <p>Album Title, Artist, Artist, Artist</p>\n            </div>\n          </div>\n          <div class=\"layout-row flex flex-rem margin-d-20 chart-table-item\">\n            <div class=\"margin-r-10\">\n              <span>2</span>\n            </div>\n            <div class=\"flex flex-rem layout-column\">\n                <p class=\"margin-d-10\">Song Name</p>\n                <p>Album Title, Artist, Artist, Artist</p>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"flex flex-rem\"></div>\n      <div class=\"layout-column flex\">\n        <h4>New Zealand Top 20</h4>\n        <div>\n          <div class=\"layout-row flex flex-rem margin-d-20 chart-table-item\">\n            <div class=\"margin-r-10\">\n              <span>1</span>\n            </div>\n            <div class=\"flex flex-rem layout-column\">\n                <p class=\"margin-d-10\">Song Name</p>\n                <p>Album Title, Artist, Artist, Artist</p>\n            </div>\n          </div>\n          <div class=\"layout-row flex flex-rem margin-d-20 chart-table-item\">\n            <div class=\"margin-r-10\">\n              <span>2</span>\n            </div>\n            <div class=\"flex flex-rem layout-column\">\n                <p class=\"margin-d-10\">Song Name</p>\n                <p>Album Title, Artist, Artist, Artist</p>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"flex flex-rem\"></div>\n    </div>\n\n\n  </div>\n\n</div>\n");
$templateCache.put("app/components/classifieds/classifieds.html","<div class=\"classifieds-container\">\n  <div class=\"component-header component-classifieds-header\">\n    <h4>Classifieds</h4>\n  </div>\n\n  <div class=\"component-content-container component-classifieds-container\">\n\n\n    <div class=\"pad-box-20 layout-row flex\">\n\n      <div class=\"flex layout-column\" style=\"width:30%\">\n        <h3>Advertiser Login</h3>\n        <form class=\"flex layout-column\">\n          <input type=\"email\" placeholder=\"Email\">\n          <input type=\"password\" placeholder=\"Password\">\n          <div class=\"flex layout-row layout-align-start-center\">\n            <div class=\"flex flex-rem layout-column\">\n              <a href=\"#\">Forgot Password</a>\n              <a href=\"#\">Signup</a>\n            </div>\n            <input type=\"submit\" value=\"Log In\">\n          </div>\n        </form>\n\n      </div>\n      <div class=\"flex flex-rem\"></div>\n\n    </div>\n\n\n\n  </div>\n\n</div>\n");
$templateCache.put("app/components/gallery/gallery.html","<div class=\"shows-container\">\n  <div class=\"component-header component-shows-header\">\n    <h4>{{$ctrl.component}}</h4>\n  </div>\n\n  <div class=\"component-content-container component-gallery-container pad-box-20\">\n\n    <div class=\"carousel-container\">\n      <div class=\"current-image\">\n        <img src=\"http://lorempixel.com/500/320/\">\n      </div>\n      <div class=\"image-stack\">\n        <div class=\"thumbnail thumbnail-1\">\n          <img src=\"http://lorempixel.com/100/100/\">\n        </div>\n        <div class=\"thumbnail thumbnail-2\">\n          <img src=\"http://lorempixel.com/100/100/\">\n        </div>\n        <div class=\"thumbnail thumbnail-3\">\n          <img src=\"http://lorempixel.com/100/100/\">\n        </div>\n      </div>\n    </div>\n\n\n  </div>\n\n</div>\n");
$templateCache.put("app/components/header/header.html","<header class=\"header\">\n  <div class=\"header--subheader-top flex layout-row\">\n    <div class=\"subheader-top--logo-container\">\n      <img class=\"logo-container--logo\" src=\"app/assets/img/top_banner_logo.jpg\" alt=\"HummFM\">\n    </div>\n    <div class=\"header--ad-unit-container flex flex-rem layout-column\">\n      <ad-unit class=\"component\"></ad-unit>\n    </div>\n  </div>\n  <div class=\"header--subheader-bottom\" ng-if=\"$ctrl.currentState != \'location-selection\' \">\n    <div class=\"subheader-bottom--toolbar\">\n        <div class=\"layout-row flex flex-rem\">\n          <div class=\"toolbar--menu-button-container flex layout-align-start-center\">\n            <button class=\"pad-box-10\">\n              <i class=\"mdi mdi-menu\"></i>\n            </button>\n          </div>\n          <div class=\"flex flex-rem\"></div>\n        </div>\n        <div class=\"flex layout-column layout-align-center pad-r-20\">\n          <music-player class=\"component\" lite=\"true\"></music-player>\n        </div>\n        <div class=\"flex layout-column toolbar--right-pane\">\n          <div class=\"flex layout-column relative layout-align-end\">\n            <div class=\"flex layout-row toolbar--search-input-container\">\n              <i class=\"mdi mdi-magnify toolbar--search-input-icon\"></i>\n              <input class=\"toolbar--search-input\" type=\"text\" placeholder=\"Search\">\n            </div>\n          </div>\n          <div class=\"flex layout-row toolbar--social-media-container\">\n            <a class=\"flex flex-rem\">\n              <i class=\"mdi mdi-facebook\"></i>\n            </a>\n            <a class=\"flex flex-rem\">\n              <i class=\"mdi mdi-twitter\"></i>\n            </a>\n            <a class=\"flex flex-rem\">\n              <i class=\"mdi mdi-youtube-play\"></i>\n            </a>\n            <a class=\"flex flex-rem\">\n              <i class=\"mdi mdi-account\"></i>\n            </a>\n            <a class=\"flex flex-rem\" ui-sref=\"location-selection\">\n              <i class=\"mdi mdi-map-marker\"></i>\n            </a>\n          </div>\n        </div>\n    </div>\n  </div>\n</header>\n");
$templateCache.put("app/components/music-player/music-player-lite.html","<div class=\"layout-row flex music-player lite\">\n  <div ng-if=\"$ctrl.musicPlayer.playState\" class=\"player-controls play-pause icon-button\" ng-click=\"$ctrl.musicPlayer.pause()\">\n    <i class=\"mdi play-button mdi-pause\"></i>\n  </div>\n  <div ng-if=\"!$ctrl.musicPlayer.playState\" class=\"player-controls play-pause icon-button\" ng-click=\"$ctrl.musicPlayer.play()\">\n    <i class=\"mdi play-button mdi-play\"></i>\n  </div>\n  <div class=\"player-labels\" ng-if=\"!$ctrl.musicPlayer.currentSong\">\n    <div class=\"song-title\">Unknown</div>\n    <div class=\"song-info\">\n        <p class=\"margin-0 margin-r-10\">Unknown Album,</p>\n        <p class=\"margin-0 margin-r-10\">Unknown Artist</p>\n    </div>\n  </div>\n  <div class=\"player-labels\" ng-if=\"$ctrl.musicPlayer.currentSong\">\n    <div class=\"song-title\">{{$ctrl.musicPlayer.currentSong.song_name}}</div>\n    <div class=\"song-info\">\n        <p class=\"margin-0 margin-r-10\">{{$ctrl.musicPlayer.currentSong.album_name}},</p>\n        <p class=\"margin-0 margin-r-10\">{{$ctrl.musicPlayer.currentSong.artist_name}}</p>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("app/components/music-player/music-player.html","<div class=\"layout-row flex music-player\" ng-if=\"$ctrl.musicPlayer.feedList.length == 0\">\n  <div class=\"player-controls play-pause\">\n    <i class=\"mdi play-button mdi-play\"></i>\n  </div>\n  <div class=\"player-labels\">\n    <div class=\"song-title\">Unknown</div>\n    <div class=\"song-info\">\n        <p class=\"margin-0 margin-r-10\">Unknown Album,</p>\n        <p class=\"margin-0 margin-r-10\">Unknown Artist</p>\n    </div>\n  </div>\n</div>\n\n<div class=\"layout-row flex music-player\" style=\"margin-bottom: 5px\" ng-repeat=\"song in $ctrl.musicPlayer.feedList\">\n  <div class=\"player-controls play-pause\">\n    <i class=\"mdi play-button mdi-play\"></i>\n  </div>\n  <div class=\"player-labels\">\n    <div class=\"song-title\">{{song.song_name}}</div>\n    <div class=\"song-info\">\n        <p class=\"margin-0 margin-r-10\">{{song.album_name}}</p>\n        <p class=\"margin-0 margin-r-10\">{{song.artist_name}}</p>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("app/components/news/news.html","<div class=\"trending-now-container news-container\">\n  <div class=\"component-header component-news-header\">\n    <h4>News</h4>\n  </div>\n\n  <div class=\"component-content-container component-trending-now-container component-news-container\">\n\n    <div class=\"news-card trending-now-card\" ng-repeat=\"card in $ctrl.cards\">\n      <img src=\"http://lorempixel.com/150/150/\" alt=\"{{card.image}}\">\n      <p>{{card.desc}}</p>\n    </div>\n\n  </div>\n\n</div>\n");
$templateCache.put("app/components/rj-profiles/rj-profiles.html","<div class=\"shows-container\">\n  <div class=\"component-header component-shows-header\">\n    <h4>RJ Profiles</h4>\n  </div>\n\n  <div class=\"component-content-container component-shows-container\">\n\n    <div class=\"layout-row flex pad-box-20\">\n      <div class=\"layout-column flex pad-r-10\" style=\"width:450px\">\n        <img src=\"http://lorempixel.com/200/200/\" class=\"margin-d-10\" alt=\"hello\">\n        <p class=\"margin-0 margin-t-10\">Lorem ipsum is simply dummy</p>\n      </div>\n      <div class=\"margin-l-10 layout-column flex flex-rem pad-lr-20\">\n        <p class=\"margin-0 margin-d-10\">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum\n          has been the industry\'s standard dummy text ever since the 1500\'s, when an unknown printer took a gallery of type\n          and scrambled it to make a type specimen book.\n        </p>\n        <p class=\"margin-0 margin-d-10\">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum\n          has been the industry\'s standard dummy text ever since the 1500\'s, when an unknown printer took a gallery of type\n          and scrambled it to make a type specimen book.\n        </p>\n        <p class=\"margin-0 margin-d-10\">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum\n          has been the industry\'s standard dummy text ever since the 1500\'s, when an unknown printer took a gallery of type\n          and scrambled it to make a type specimen book.\n        </p>\n        <!--<div class=\"layout-row flex layout-align-start-center\">\n          <a class=\"flex icon-button margin-lr-10\">\n            <i class=\"mdi mdi-access-point\"></i>\n            <span> RJ Profile</span>\n          </a>\n          <a class=\"flex icon-button margin-lr-10\">\n            <i class=\"mdi mdi-access-point\"></i>\n            <span> Podcasts</span>\n          </a>\n        </div> -->\n      </div>\n    </div>\n\n  </div>\n\n</div>\n");
$templateCache.put("app/components/sales-and-advertising/sales-and-advertising.html","");
$templateCache.put("app/components/shop-now/shop-now.html","<div class=\"shop-now-container\">\n  <div class=\"component-header component-shop-now-header\">\n    <h4>Shop Now</h4>\n  </div>\n\n  <div class=\"component-content-container component-shop-now-container\">\n    <div class=\"flex layout-column pad-l-20\" style=\"width:30%\">\n      <h2>Categories</h2>\n      <div>\n        <p>Category 1</p>\n        <p>Category 2</p>\n        <p>Category 3</p>\n        <p>Category 1</p>\n        <p>Category 2</p>\n        <p>Category 3</p>\n      </div>\n    </div>\n    <div class=\"flex layout-row flex-rem\"></div>\n    \n  </div>\n\n</div>\n");
$templateCache.put("app/components/shows/shows.html","<div class=\"shows-container\">\n  <div class=\"component-header component-shows-header\">\n    <h4>Shows</h4>\n  </div>\n\n  <div class=\"component-content-container component-shows-container\">\n\n    <div class=\"layout-row flex layout-align-start-center pad-box-20\">\n      <img src=\"http://lorempixel.com/200/200/\" alt=\"hello\">\n      <div class=\"margin-l-10 layout-column flex flex-rem\">\n        <h3>LOREM IPSUM IS SIMPLY DUMMY TEXT OF PRINTING AND TYPE</h3>\n        <p class=\"margin-0 margin-d-10\">Lorem ipsum is simply dummy</p>\n        <p class=\"margin-0 margin-d-10\">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum\n          has been the industry\'s standard dummy text ever since the 1500\'s, when an unknown printer took a gallery of type\n          and scrambled it to make a type specimen book.\n        </p>\n        <div class=\"layout-row flex layout-align-start-center\">\n          <a class=\"flex icon-button margin-lr-10\">\n            <i class=\"mdi mdi-access-point\"></i>\n            <span> RJ Profile</span>\n          </a>\n          <a class=\"flex icon-button margin-lr-10\">\n            <i class=\"mdi mdi-access-point\"></i>\n            <span> Podcasts</span>\n          </a>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n</div>\n");
$templateCache.put("app/components/trending-now/trending-now.html","<div class=\"trending-now-container\">\n  <div class=\"component-header component-trending-now-header\">\n    <h4>#Trending Now</h4>\n  </div>\n\n  <div class=\"component-content-container component-trending-now-container\">\n\n    <div class=\"trending-now-card\" ng-repeat=\"card in $ctrl.cards\">\n      <img src=\"http://lorempixel.com/150/150/\" alt=\"{{card.image}}\">\n      <p class=\"margin-td-10\">{{card.desc}}</p>\n    </div>\n\n  </div>\n\n</div>\n");
$templateCache.put("app/components/dialog/location-selection/location-selection.html","<div class=\"pad-box-20 location-selection-dialog flex flex-rem layout-align-center layout-column\">\n  <div class=\"styled-select slate\">\n    <select ng-options=\"city as city.city_name for city in $ctrl.cities track by city.city_id\" ng-model=\"$ctrl.selectedCity\" ng-change=\"$ctrl.updateCity()\">\n      <option selected=\"\" disabled=\"\" value=\"\">Select City</option>\n    </select>\n  </div>\n  <div class=\"service-select flex layout-row\" ng-if=\"$ctrl.citySelected\" style=\"padding:20px\">\n\n      <div ng-click=\"$ctrl.closeModal()\" class=\"service-option icon-button\">\n        <img style=\"height:48px; width: 48px\">\n        <p>Live</p>\n      </div>\n\n      <div class=\"service-option icon-button\">\n        <img style=\"height:48px; width: 48px\">\n        <p>Events</p>\n      </div>\n\n      <div class=\"service-option icon-button\">\n        <img style=\"height:48px; width: 48px\">\n        <p>Android</p>\n      </div>\n\n      <div class=\"service-option icon-button\">\n        <img style=\"height:48px; width: 48px\">\n        <p>iOS</p>\n      </div>\n\n\n  </div>\n</div>\n");
$templateCache.put("app/components/dialog/login/login.html","");}]);
angular
  .module('muze')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'app',
      resolve: {
        city: ["locationService", function(locationService) {
          var locationData = locationService.getSavedLocationLocal();

          return locationData;
        }]
      }
    })
    .state('location-selection',{
      url: '/location-selection',
      component: 'locationSelector'
    });
}

//# sourceMappingURL=../maps/scripts/app-e14f35d8b0.js.map
