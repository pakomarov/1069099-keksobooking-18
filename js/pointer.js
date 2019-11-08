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


  var makeBig = function () {
    appearance = APPEARANCE_BIG;
    window.form.refreshAddress();
  };

  var makeSmall = function () {
    appearance = APPEARANCE_SMALL;
    window.form.refreshAddress();
  };

  var getAddress = function () {
    var pointerPositioning = window.utilities.getNodePosition(pointerNode);
    var x = Math.floor(pointerPositioning.left + appearance.addressOffsetX);
    var y = Math.floor(pointerPositioning.top + appearance.addressOffsetY);
    return x + ' ' + y;
  };


  var pointerMousedownHandler = function () {
    window.page.activate();
  };

  var pointerKeydownEnterHandler = function (evt) {
    if (evt.keyCode === window.utilities.KEYCODE_ENTER) {
      window.page.activate();
    }
  };


  var setup = function () {
    pointerNode.addEventListener('mousedown', pointerMousedownHandler);
    pointerNode.addEventListener('keydown', pointerKeydownEnterHandler);
  };


  window.pointer = {
    setup: setup,
    makeBig: makeBig,
    makeSmall: makeSmall,
    getAddress: getAddress
  };
})();
