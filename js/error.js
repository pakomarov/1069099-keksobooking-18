'use strict';


(function () {
  var DISPLAY_HIDE = 'none';
  var DISPLAY_SHOW = '';


  var errorTemplateNode = document.querySelector('#error').content.querySelector('.error');
  var mainNode = document.querySelector('main');


  var errorNode;
  var errorMessageNode;
  var closeNode;


  var showWarning = function (error) {
    errorMessageNode.textContent = error;
    errorNode.style.display = DISPLAY_SHOW;
    document.addEventListener('keydown', documentKeydownEscHandler);
    document.addEventListener('mousedown', documentClickHandler);
  };

  var hideWarning = function () {
    errorNode.style.display = DISPLAY_HIDE;
    errorMessageNode.textContent = '';
    document.removeEventListener('keydown', documentKeydownEscHandler);
    document.removeEventListener('mousedown', documentClickHandler);
  };

  var closeClickHandler = function () {
    hideWarning();
  };

  var documentKeydownEscHandler = function (evt) {
    if (evt.keyCode === window.utilities.KEYCODE_ESC) {
      hideWarning();
    }
  };

  var documentClickHandler = function (evt) {
    if (!errorMessageNode.contains(evt.target)) {
      hideWarning();
    }
  };


  var setup = function () {
    errorNode = errorTemplateNode.cloneNode('true');
    errorNode.style.display = DISPLAY_HIDE;
    errorMessageNode = errorNode.querySelector('.error__message');
    closeNode = errorNode.querySelector('.error__button');
    closeNode.addEventListener('click', closeClickHandler);
    mainNode.appendChild(errorNode);
  };


  window.error = {
    setup: setup,
    showWarning: showWarning
  };
})();
