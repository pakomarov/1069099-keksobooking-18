'use strict';


(function () {
  var inputNodes = document.querySelectorAll('.map__filters input');
  var selectNodes = document.querySelectorAll('.map__filters select');


  var disableAllFields = function () {
    window.utilities.disableNodes(inputNodes);
    window.utilities.disableNodes(selectNodes);
  };

  var enableAllFields = function () {
    window.utilities.enableNodes(inputNodes);
    window.utilities.enableNodes(selectNodes);
  };

  var deactivate = function () {
    disableAllFields();
  };

  var activate = function () {
    enableAllFields();
  };

  var onAdsLoad = function () {
    activate();
  };


  var setup = function () {
    window.ads.addLoadListener(onAdsLoad);
  };


  window.filter = {
    setup: setup,
    deactivate: deactivate,
    activate: activate
  };
})();
