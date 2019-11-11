'use strict';

(function () {
  var ERROR_MESSAGE = 'К сожалению, у нас возникли неполадки. Попробуйте повторить запрос позднее.';


  var mapPinsNode = document.querySelector('.map__pins');


  var storedAds = [];
  var showedPinNodes = [];
  var onLoad = function () {};


  var removePins = function () {
    showedPinNodes.map(function (pinNode) {
      pinNode.remove();
    });
    showedPinNodes = [];
  };

  var showPins = function () {
    // здесь будет фильтрация: filteredAds = window.filter.filterAds
    var pinNodes = storedAds.map(window.pin.createNode); // здесь будут использоваться отфильтрованные объявления
    window.utilities.renderNodes(mapPinsNode, pinNodes);
    showedPinNodes = showedPinNodes.concat(pinNodes);
  };

  var deactivate = function () {
    removePins();
  };

  var onSuccess = function (ads) {
    if (ads === null || !Array.isArray(ads)) {
      window.error.showWarning(ERROR_MESSAGE);
      return;
    }

    storedAds = ads;
    showPins();
    onLoad();
  };

  var onError = function (error) {
    window.error.showWarning(error);
  };

  var activate = function () {
    window.backend.loadAds(onSuccess, onError);
  };


  var addLoadListener = function (callback) {
    onLoad = callback;
  };


  window.ads = {
    deactivate: deactivate,
    activate: activate,
    addLoadListener: addLoadListener
  };
})();
