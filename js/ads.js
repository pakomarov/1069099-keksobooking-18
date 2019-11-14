'use strict';

(function () {
  var ERROR_MESSAGE = 'К сожалению, у нас возникли неполадки. Попробуйте повторить запрос позднее.';
  var SHOWN_ADS_MAX = 5;


  var mapPinsNode = document.querySelector('.map__pins');


  var storedAds = [];
  var shownPinNodes = [];
  var customLoadHandler = function () {};


  var getAdHousingType = function (ad) {
    return ad.offer.type;
  };

  var removePins = function () {
    shownPinNodes.map(function (pinNode) {
      pinNode.remove();
    });
    shownPinNodes = [];
  };

  var showPins = function () {
    var filteredAds = window.filter.filterAds(storedAds);
    var adsToShow = filteredAds.slice(0, SHOWN_ADS_MAX);
    var pinNodes = adsToShow.map(window.pin.createNode);
    var cardNode = window.card.createNode(adsToShow[1]);
    window.utilities.renderNodes(mapPinsNode, pinNodes);
    document.querySelector('.map').insertBefore(cardNode, document.querySelector('.map__filters-container'));
    shownPinNodes = shownPinNodes.concat(pinNodes);
  };

  var refreshPins = function () {
    removePins();
    showPins();
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
    customLoadHandler();
    showPins();
  };

  var onError = function (error) {
    window.error.showWarning(error);
  };

  var activate = function () {
    window.backend.loadAds(onSuccess, onError);
  };


  var setCustomLoadHandler = function (callback) {
    customLoadHandler = callback;
  };


  window.ads = {
    deactivate: deactivate,
    activate: activate,
    getAdHousingType: getAdHousingType,
    setCustomLoadHandler: setCustomLoadHandler,
    refreshPins: refreshPins
  };
})();
