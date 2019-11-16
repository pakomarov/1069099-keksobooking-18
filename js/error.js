'use strict';


(function () {
  var errorTemplateNode = document.querySelector('#error').content.querySelector('.error');
  var mainNode = document.querySelector('main');


  var errorNode = null;
  var errorMessageNode = null;
  var closeNode = null;


  var renderError = function () {
    errorNode = errorTemplateNode.cloneNode('true');
    window.utilities.hideNodeThroughClass(errorNode);
    errorMessageNode = errorNode.querySelector('.error__message');
    closeNode = errorNode.querySelector('.error__button');
    closeNode.addEventListener('click', closeClickHandler);
    mainNode.appendChild(errorNode);
  };

  var showWarning = function (error) {
    errorMessageNode.textContent = error;
    window.utilities.showNodethroughClass(errorNode);
    document.addEventListener('keydown', documentKeydownEscHandler);
    document.addEventListener('mousedown', documentClickHandler);
  };

  var hideWarning = function () {
    window.utilities.hideNodeThroughClass(errorNode);
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
    renderError();
  };


  window.error = {
    setup: setup,
    showWarning: showWarning
  };
})();
