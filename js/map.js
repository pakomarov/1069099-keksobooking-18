'use strict';


(function () {
  var DEACTIVATION_CLASS = 'map--faded';


  var mapNode = document.querySelector('.map');


  var deactivate = function () {
    window.filter.deactivate();
    window.ads.deactivate();
    window.pointer.deactivate();
    mapNode.classList.add(DEACTIVATION_CLASS);
  };


  var activate = function () {
    mapNode.classList.remove(DEACTIVATION_CLASS);
    window.pointer.activate();
    window.ads.activate();
  };


  window.map = {
    deactivate: deactivate,
    activate: activate
  };
})();
