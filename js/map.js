'use strict';


(function () {
  var ERROR_MESSAGE = 'К сожалению, у нас возникли неполадки. Попробуйте повторить запрос позднее.';


  var active = false;
  var storedAds = [];
  var showedPinNodes = [];


  var mapNode = document.querySelector('.map');
  var mapPinsNode = mapNode.querySelector('.map__pins');


  var isActive = function () {
    return active;
  };

  var removePins = function () {
    showedPinNodes.map(function (pinNode) {
      pinNode.remove();
    });
    showedPinNodes = [];
  };

  var cleanMap = function () {
    removePins();
    // reset pointer position
    window.pointer.makeBig();
  };

  var deactivate = function () {
    window.filter.deactivate();
    cleanMap();
    mapNode.classList.add('map--faded');
  };

  var showPins = function () {
    // здесь будет фильтрация: filteredAds = window.filter.filterAds
    var pinNodes = storedAds.map(window.pin.createNode); // здесь будут использоваться отфильтрованные объявления
    window.utilities.renderNodes(mapPinsNode, pinNodes);
  };

  var onLoad = function (ads) {
    if (ads === null || !Array.isArray(ads)) {
      window.error.showWarning(ERROR_MESSAGE);
      return;
    }

    storedAds = ads;
    showPins();
  };

  var onError = function (error) {
    window.error.showWarning(error);
  };

  var activate = function () {
    mapNode.classList.remove('map--faded');
    window.pointer.makeSmall();
    window.filter.activate();
    window.backend.loadAds(onLoad, onError);
  };

  var getAddress = function () {
    return window.pointer.getAddress();
  };


  var setup = function () {
    window.filter.setup();
    window.pointer.setup();
  };


  window.map = {
    setup: setup,
    isActive: isActive,
    activate: activate,
    deactivate: deactivate,
    getAddress: getAddress
  };
})();
