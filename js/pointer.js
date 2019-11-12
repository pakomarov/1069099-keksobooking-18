'use strict';


(function () {
  var APPEARANCE_SMALL = {
    addressOffsetX: 32,
    addressOffsetY: 82
  };
  var APPEARANCE_BIG = {
    addressOffsetX: 32,
    addressOffsetY: 30
  };


  var pointerNode = document.querySelector('.map__pin--main');


  var appearance = APPEARANCE_BIG;
  var customMousedownHandler = function () {};
  var customAppearanceChangeHandler = function () {};


  var makeBig = function () {
    appearance = APPEARANCE_BIG;
    customAppearanceChangeHandler();
  };

  var makeSmall = function () {
    appearance = APPEARANCE_SMALL;
    customAppearanceChangeHandler();
  };

  var getLocation = function () {
    var pointerPositioning = window.utilities.getNodePosition(pointerNode);
    return {
      x: Math.floor(pointerPositioning.left + appearance.addressOffsetX),
      y: Math.floor(pointerPositioning.top + appearance.addressOffsetY)
    };
  };


  var pointerMousedownHandler = function () {
    customMousedownHandler();
  };

  var pointerKeydownEnterHandler = function (evt) {
    if (evt.keyCode === window.utilities.KEYCODE_ENTER) {
      customMousedownHandler();
    }
  };

  var deactivate = function () {
    makeBig();
  };

  var activate = function () {
    makeSmall();
  };


  var setCustomMousedownHandler = function (callback) {
    customMousedownHandler = callback;
  };

  var setCustomAppearanceChangeHandler = function (callback) {
    customAppearanceChangeHandler = callback;
  };


  var setup = function () {
    pointerNode.addEventListener('mousedown', pointerMousedownHandler);
    pointerNode.addEventListener('keydown', pointerKeydownEnterHandler);
  };


  window.pointer = {
    setup: setup,
    deactivate: deactivate,
    activate: activate,
    setCustomMousedownHandler: setCustomMousedownHandler,
    setCustomAppearanceChangeHandler: setCustomAppearanceChangeHandler,
    getLocation: getLocation
  };
})();
