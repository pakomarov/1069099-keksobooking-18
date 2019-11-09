'use strict';


(function () {
  var activate = function () {
    window.map.activate();
    window.form.activate();
  };

  var deactivate = function () {
    window.map.deactivate();
    window.form.deactivate();
  };

  var setup = function () {
    window.map.setup();
    window.form.setup();
    window.error.setup();
    deactivate();
  };


  setup();


  window.page = {
    activate: activate,
    deactivate: deactivate
  };
})();
