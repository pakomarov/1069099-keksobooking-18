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
  var onMousedown = function () {};
  var onAppearanceChange = function () {};


  var makeBig = function () {
    appearance = APPEARANCE_BIG;
    onAppearanceChange();
  };

  var makeSmall = function () {
    appearance = APPEARANCE_SMALL;
    onAppearanceChange();
  };

  var getLocation = function () {
    var pointerPositioning = window.utilities.getNodePosition(pointerNode);
    return {
      x: Math.floor(pointerPositioning.left + appearance.addressOffsetX),
      y: Math.floor(pointerPositioning.top + appearance.addressOffsetY)
    };
  };


  var pointerMousedownHandler = function () {
    onMousedown();
  };

  var pointerKeydownEnterHandler = function (evt) {
    if (evt.keyCode === window.utilities.KEYCODE_ENTER) {
      onMousedown();
    }
  };

  var deactivate = function () {
    makeBig();
    pointerNode.addEventListener('mousedown', pointerMousedownHandler);
    pointerNode.addEventListener('keydown', pointerKeydownEnterHandler);
  };

  var activate = function () {
    makeSmall();
    pointerNode.removeEventListener('mousedown', pointerMousedownHandler);
    pointerNode.removeEventListener('keydown', pointerKeydownEnterHandler);
  };


  var addMousedownListener = function (callback) {
    onMousedown = callback;
  };

  var addAppearanceChangeListener = function (callback) {
    onAppearanceChange = callback;
  };


  window.pointer = {
    deactivate: deactivate,
    activate: activate,
    addMousedownListener: addMousedownListener,
    addAppearanceChangeListener: addAppearanceChangeListener,
    getLocation: getLocation
  };
})();
