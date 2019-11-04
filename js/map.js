'use strict';


(function () {
  var PIN_MAIN_OFFSET_X = 32;
  var PIN_MAIN_OFFSET_Y_ACTIVE = 82;
  var PIN_MAIN_OFFSET_Y_INACTIVE = 30;


  var mapNode = document.querySelector('.map');
  var mapFiltersInputNodes = mapNode.querySelectorAll('.map__filters input');
  var mapFiltersSelectNodes = mapNode.querySelectorAll('.map__filters select');
  var mapPinsNode = mapNode.querySelector('.map__pins');
  var mapPinMainNode = mapPinsNode.querySelector('.map__pin--main');
  var adFormNode = document.querySelector('.ad-form');
  var adFormInputNodes = adFormNode.querySelectorAll('input');
  var adFormSelectNodes = adFormNode.querySelectorAll('select');
  var adFormTextareaNodes = adFormNode.querySelectorAll('textarea');
  var adFormButtonNodes = adFormNode.querySelectorAll('button');
  var addressInputNode = adFormNode.querySelector('#address');


  var isMapActive = function () {
    return !mapNode.classList.contains('map--faded');
  };

  var getAddressByPosition = function (positioning) {
    var offsetY = isMapActive() ? PIN_MAIN_OFFSET_Y_ACTIVE : PIN_MAIN_OFFSET_Y_INACTIVE;
    var offsetX = PIN_MAIN_OFFSET_X;
    var y = positioning.top + offsetY;
    var x = positioning.left + offsetX;
    return Math.floor(x) + ' ' + Math.floor(y);
  };

  var setAddressInput = function () {
    var mapPinMainPositioning = window.utilities.getNodePosition(mapPinMainNode);
    var address = getAddressByPosition(mapPinMainPositioning);
    addressInputNode.value = address;
  };

  var deactivatePage = function () {
    mapNode.classList.add('map--faded');
    adFormNode.classList.add('ad-form--disabled');
    window.utilities.disableNodes(mapFiltersInputNodes);
    window.utilities.disableNodes(mapFiltersSelectNodes);
    window.utilities.disableNodes(adFormInputNodes);
    window.utilities.disableNodes(adFormSelectNodes);
    window.utilities.disableNodes(adFormTextareaNodes);
    window.utilities.disableNodes(adFormButtonNodes);
    setAddressInput();
  };

  var activatePage = function () {
    mapNode.classList.remove('map--faded');
    adFormNode.classList.remove('ad-form--disabled');
    window.utilities.enableNodes(mapFiltersInputNodes);
    window.utilities.enableNodes(mapFiltersSelectNodes);
    window.utilities.enableNodes(adFormInputNodes);
    window.utilities.enableNodes(adFormSelectNodes);
    window.utilities.enableNodes(adFormTextareaNodes);
    window.utilities.enableNodes(adFormButtonNodes);
    setAddressInput();
  };

  var mapPinMainMousedownHandler = function () {
    activatePage();
  };

  var mapPinMainKeydownEnterHandler = function (evt) {
    if (evt.keyCode === window.utilities.KEYCODE_ENTER) {
      activatePage();
    }
  };

  var setup = function () {
    var mockupAds = window.data.createMockupAds();
    var pinNodes = mockupAds.map(window.pin.createNode);
    window.utilities.renderNodes(mapPinsNode, pinNodes);
    deactivatePage();
    mapPinMainNode.addEventListener('mousedown', mapPinMainMousedownHandler);
    mapPinMainNode.addEventListener('keydown', mapPinMainKeydownEnterHandler);
  };


  window.map = {
    setup: setup
  };
})();
