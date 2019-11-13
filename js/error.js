'use strict';


(function () {
  var HIDING_CLASS = 'hidden';


  var errorTemplateNode = document.querySelector('#error').content.querySelector('.error');
  var mainNode = document.querySelector('main');


  var errorNode;
  var errorMessageNode;
  var closeNode;


  var renderError = function () {
    errorNode = errorTemplateNode.cloneNode('true');
    errorNode.classList.add(HIDING_CLASS);
    errorMessageNode = errorNode.querySelector('.error__message');
    closeNode = errorNode.querySelector('.error__button');
    closeNode.addEventListener('click', closeClickHandler);
    mainNode.appendChild(errorNode);
  };

  var showWarning = function (error) {
    errorMessageNode.textContent = error;
    errorNode.classList.remove(HIDING_CLASS);
    document.addEventListener('keydown', documentKeydownEscHandler);
    document.addEventListener('mousedown', documentClickHandler);
  };

  var hideWarning = function () {
    errorNode.classList.add(HIDING_CLASS);
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
