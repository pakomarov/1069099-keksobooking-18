'use strict';


(function () {
  var deactivate = function () {
    window.map.deactivate();
    window.form.deactivate();
  };

  var activate = function () {
    window.map.activate();
    window.form.activate();
  };

  var onPointerMousedown = function () {
    activate();
  };


  var setup = function () {
    window.error.setup();
    window.form.setup();
    window.filter.setup();
    deactivate();
    window.pointer.addMousedownListener(onPointerMousedown);
  };

  setup();
})();
