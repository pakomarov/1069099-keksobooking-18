'use strict';


(function () {
  var deactivate = function () {
    window.map.deactivate();
    window.form.deactivate();
    window.pointer.setCustomMousedownHandler(onPointerMousedown);
  };

  var activate = function () {
    window.map.activate();
    window.form.activate();
    window.pointer.setCustomMousedownHandler(function () {});
  };

  var onPointerMousedown = function () {
    activate();
  };


  var setup = function () {
    window.error.setup();
    window.map.setup();
    window.form.setup();
    deactivate();
  };

  setup();

  window.page = {
    deactivate: deactivate
  };
})();
