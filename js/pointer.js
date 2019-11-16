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
  var LOCATION_MIN_X = 0;
  var LOCATION_MIN_Y = 130;
  var LOCATION_MAX_Y = 630;


  var mapPinsNode = document.querySelector('.map__pins');
  var pointerNode = document.querySelector('.map__pin--main');


  var appearance = APPEARANCE_BIG;
  var initialPointerPositioning = null;
  var locationMaxX = mapPinsNode.offsetWidth - APPEARANCE_SMALL.addressOffsetX;
  var customMouseDownHandler = function () {};


  var getLocation = function () {
    var pointerPositioning = window.utilities.getNodePosition(pointerNode);
    return {
      x: Math.floor(pointerPositioning.left + appearance.addressOffsetX),
      y: Math.floor(pointerPositioning.top + appearance.addressOffsetY)
    };
  };

  var refreshFormAddress = function () {
    window.form.refreshAddress(getLocation());
  };


  var storeInitialPointerPositioning = function () {
    initialPointerPositioning = window.utilities.getNodePosition(pointerNode);
  };

  var resetInitialPointerPositioning = function () {
    pointerNode.style.left = initialPointerPositioning.left + 'px';
    pointerNode.style.top = initialPointerPositioning.top + 'px';
    refreshFormAddress();
  };


  var makeBig = function () {
    appearance = APPEARANCE_BIG;
    refreshFormAddress();
  };

  var makeSmall = function () {
    appearance = APPEARANCE_SMALL;
    refreshFormAddress();
  };


  var deactivate = function () {
    resetInitialPointerPositioning();
    makeBig();
  };

  var activate = function () {
    makeSmall();
  };


  var isCoordinateXInRange = function (x) {
    return x >= (LOCATION_MIN_X - appearance.addressOffsetX) && x <= locationMaxX;
  };

  var isCoordinateYInRange = function (y) {
    return y >= (LOCATION_MIN_Y - appearance.addressOffsetY) && y <= (LOCATION_MAX_Y - appearance.addressOffsetY);
  };

  var pointerMousedownHandler = function (mouseDownEvent) {
    var startCoords = {
      x: mouseDownEvent.clientX,
      y: mouseDownEvent.clientY
    };

    var mouseMoveHandler = function (mouseMoveEvent) {

      var shift = {
        x: startCoords.x - mouseMoveEvent.clientX,
        y: startCoords.y - mouseMoveEvent.clientY
      };

      var newPositioning = {
        x: pointerNode.offsetLeft - shift.x,
        y: pointerNode.offsetTop - shift.y
      };

      if (isCoordinateXInRange(newPositioning.x)) {
        pointerNode.style.left = newPositioning.x + 'px';
        startCoords.x = mouseMoveEvent.clientX;
      }

      if (isCoordinateYInRange(newPositioning.y)) {
        pointerNode.style.top = newPositioning.y + 'px';
        startCoords.y = mouseMoveEvent.clientY;
      }

      refreshFormAddress();
    };

    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };


  var setCustomMouseDownHandler = function (callback) {
    customMouseDownHandler = callback;
  };


  var setup = function () {
    storeInitialPointerPositioning();
    pointerNode.addEventListener('mousedown', function () {
      customMouseDownHandler();
    });
    pointerNode.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utilities.KEYCODE_ENTER) {
        customMouseDownHandler();
      }
    });
    pointerNode.addEventListener('mousedown', pointerMousedownHandler);
  };


  window.pointer = {
    setup: setup,
    deactivate: deactivate,
    activate: activate,
    setCustomMouseDownHandler: setCustomMouseDownHandler,
    getLocation: getLocation
  };
})();
