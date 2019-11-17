'use strict';


(function () {
  var ERROR_MESSAGE = 'К сожалению, у нас возникли неполадки. Попробуйте повторить запрос позднее.';
  var SHOWN_ADS_MAX = 5;
  var DEBOUNCE_INTERVAL = 500;


  var mapNode = document.querySelector('.map');
  var mapPinsNode = mapNode.querySelector('.map__pins');


  var storedAds = [];
  var mappedPins = [];


  var customLoadHandler = function () {};
  var customLoadErrorHandler = function () {};


  var getAdHousingType = function (ad) {
    return ad.offer.type;
  };

  var getAdPrice = function (ad) {
    return ad.offer.price;
  };

  var getAdRoomCount = function (ad) {
    return ad.offer.rooms;
  };

  var getAdGuestCount = function (ad) {
    return ad.offer.guests;
  };

  var getAdFeatures = function (ad) {
    return ad.offer.features;
  };


  var showPins = function () {
    var filteredAds = window.filter.filterAds(storedAds);

    var adsToShow = filteredAds.slice(0, SHOWN_ADS_MAX);

    var fragment = document.createDocumentFragment();

    adsToShow.forEach(function (ad) {
      var pin = new window.pin.Pin(ad);

      fragment.appendChild(pin.node);

      mappedPins.push(pin);
    });

    mapPinsNode.appendChild(fragment);
  };

  var removePins = function () {
    mappedPins.forEach(function (pin) {
      pin.remove();
    });
    mappedPins = [];
  };

  var removeAllWidgets = function () {
    var popup = mapNode.querySelector('.map__card');
    if (popup) {
      window.card.closePopup();
    }

    removePins();
  };

  var refreshPins = window.utilities.debounce(function () {
    removeAllWidgets();
    showPins();
  }, DEBOUNCE_INTERVAL);

  var deactivate = function () {
    removeAllWidgets();
    storedAds = null;
  };

  var hasOffer = function (ad) {
    return ad.offer && !window.utilities.isEmptyObject(ad.offer);
  };

  var onSuccess = function (data) {
    if (data === null || !Array.isArray(data)) {
      customLoadErrorHandler();
      window.notification.showError(ERROR_MESSAGE);
      return;
    }

    storedAds = data.filter(hasOffer);
    customLoadHandler();
    showPins();
  };

  var onError = function (error) {
    customLoadErrorHandler();
    window.notification.showError(error);
  };

  var activate = function () {
    window.backend.loadAds(onSuccess, onError);
  };


  var setCustomLoadHandler = function (callback) {
    customLoadHandler = callback;
  };

  var setCustomLoadErrorHandler = function (callback) {
    customLoadErrorHandler = callback;
  };


  window.ads = {
    deactivate: deactivate,
    activate: activate,
    getAdHousingType: getAdHousingType,
    getAdPrice: getAdPrice,
    getAdRoomCount: getAdRoomCount,
    getAdGuestCount: getAdGuestCount,
    getAdFeatures: getAdFeatures,
    setCustomLoadHandler: setCustomLoadHandler,
    setCustomLoadErrorHandler: setCustomLoadErrorHandler,
    refreshPins: refreshPins
  };
})();
