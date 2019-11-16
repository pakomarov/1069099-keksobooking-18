'use strict';


(function () {
  var deactivate = function () {
    window.map.deactivate();
    window.form.deactivate();
    window.pointer.setCustomMouseDownHandler(onPointerMousedown);
  };

  var activate = function () {
    window.map.activate();
    window.form.activate();
    window.pointer.setCustomMouseDownHandler(function () {});
  };

  var onPointerMousedown = function () {
    activate();
  };

  var onAdsLoadError = function () {
    deactivate();
  };

  var onFormResetButtonClick = function () {
    deactivate();
  };


  var setup = function () {
    window.error.setup();
    window.map.setup();
    window.ads.setCustomLoadErrorHandler(onAdsLoadError);
    window.form.setup();
    window.form.setCustomResetButtonClickHandler(onFormResetButtonClick);
    deactivate();
  };

  setup();
})();
