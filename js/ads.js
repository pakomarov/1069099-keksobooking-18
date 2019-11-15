'use strict';


(function () {
  var ACTIVE_PIN_CLASS = 'map__pin--active';
  var ERROR_MESSAGE = 'К сожалению, у нас возникли неполадки. Попробуйте повторить запрос позднее.';
  var SHOWN_ADS_MAX = 5;


  var mapPinsNode = document.querySelector('.map__pins');


  var storedAds = [];
  var mappedPins = [];
  var currentPopup = null;


  var customLoadHandler = function () {};
  var customLoadErrorHandler = function () {};


  var getAdHousingType = function (ad) {
    return ad.offer.type;
  };


  var Pin = function (ad) {
    this.node = window.pin.createNode(ad);

    var node = this.node;

    this.clickHandler = function () {
      if (currentPopup) {
        currentPopup.close();
      }
      currentPopup = new Popup(ad);
      node.classList.add(ACTIVE_PIN_CLASS);
    };
    this.node.addEventListener('click', this.clickHandler);
  };

  Pin.prototype.remove = function () {
    this.node.remove();
    this.node.removeEventListener('click', this.clickHandler);
  };


  var Popup = function (ad) {
    this.node = window.card.createNode(ad);

    this.closeNode = this.node.querySelector('.popup__close');
    this.closeClickHandler = this.closeClickHandler.bind(this);
    this.closeNode.addEventListener('click', this.closeClickHandler);

    this.escKeydownHandler = this.escKeydownHandler.bind(this);
    document.addEventListener('keydown', this.escKeydownHandler);

    document.querySelector('.map').insertBefore(this.node, document.querySelector('.map__filters-container'));
  };

  Popup.prototype.close = function () {
    this.node.remove();

    this.closeNode.removeEventListener('click', this.closeClickHandler);
    document.removeEventListener('keydown', this.escKeydownHandler);

    mapPinsNode.querySelector('.' + ACTIVE_PIN_CLASS).classList.remove(ACTIVE_PIN_CLASS);
    currentPopup = null;
  };

  Popup.prototype.closeClickHandler = function () {
    this.close();
  };

  Popup.prototype.escKeydownHandler = function (evt) {
    if (evt.keyCode === window.utilities.KEYCODE_ESC) {
      this.close();
    }
  };


  var removePins = function () {
    mappedPins.forEach(function (pin) {
      pin.remove();
    });
    mappedPins = [];
  };

  var removeAllWidgets = function () {
    if (currentPopup) {
      currentPopup.close();
    }

    removePins();
  };

  var showPins = function () {
    var filteredAds = window.filter.filterAds(storedAds);

    var adsToShow = filteredAds.slice(0, SHOWN_ADS_MAX);

    var fragment = document.createDocumentFragment();

    adsToShow.forEach(function (ad) {
      var pin = new Pin(ad);

      fragment.appendChild(pin.node);

      mappedPins.push(pin);
    });

    mapPinsNode.appendChild(fragment);
  };

  var refreshPins = function () {
    removeAllWidgets();
    showPins();
  };

  var deactivate = function () {
    removeAllWidgets();
    storedAds = null;
  };

  var hasOffer = function (ad) {
    return ad.offer && !window.utilities.isEmptyObject(ad.offer);
  };

  var onSuccess = function (ads) {
    if (ads === null || !Array.isArray(ads)) {
      customLoadErrorHandler();
      window.error.showWarning(ERROR_MESSAGE);
      return;
    }

    storedAds = ads.filter(hasOffer);
    customLoadHandler();
    showPins();
  };

  var onError = function (error) {
    customLoadErrorHandler();
    window.error.showWarning(error);
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
    setCustomLoadHandler: setCustomLoadHandler,
    setCustomLoadErrorHandler: setCustomLoadErrorHandler,
    refreshPins: refreshPins
  };
})();
