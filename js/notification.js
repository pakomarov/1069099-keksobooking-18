'use strict';


(function () {
  var errorTemplateNode = document.querySelector('#error').content.querySelector('.error');
  var successTemplateNode = document.querySelector('#success').content.querySelector('.success');
  var mainNode = document.querySelector('main');


  var errorNode = null;
  var errorMessageNode = null;
  var errorCloseNode = null;
  var successNode = null;


  var renderError = function () {
    errorNode = errorTemplateNode.cloneNode('true');
    window.utilities.hideNodeThroughClass(errorNode);
    errorMessageNode = errorNode.querySelector('.error__message');
    errorCloseNode = errorNode.querySelector('.error__button');
    errorCloseNode.addEventListener('click', errorCloseClickHandler);
    mainNode.appendChild(errorNode);
  };

  var showError = function (error) {
    errorMessageNode.textContent = error;
    window.utilities.showNodeThroughClass(errorNode);
    document.addEventListener('keydown', documentKeydownEscErrorHandler);
    document.addEventListener('mousedown', documentClickErrorHandler);
  };

  var hideError = function () {
    window.utilities.hideNodeThroughClass(errorNode);
    errorMessageNode.textContent = '';
    document.removeEventListener('keydown', documentKeydownEscErrorHandler);
    document.removeEventListener('mousedown', documentClickErrorHandler);
  };

  var errorCloseClickHandler = function () {
    hideError();
  };

  var documentKeydownEscErrorHandler = function (evt) {
    if (evt.keyCode === window.utilities.KEYCODE_ESC) {
      hideError();
    }
  };

  var documentClickErrorHandler = function (evt) {
    if (!errorMessageNode.contains(evt.target)) {
      hideError();
    }
  };


  var renderSuccess = function () {
    successNode = successTemplateNode.cloneNode('true');
    window.utilities.hideNodeThroughClass(successNode);
    mainNode.appendChild(successNode);
  };

  var showSuccess = function () {
    window.utilities.showNodeThroughClass(successNode);
    document.addEventListener('keydown', documentKeydownEscSuccessHandler);
    document.addEventListener('mousedown', documentClickSuccessHandler);
  };

  var hideSuccess = function () {
    window.utilities.hideNodeThroughClass(successNode);
    document.removeEventListener('keydown', documentKeydownEscSuccessHandler);
    document.removeEventListener('mousedown', documentClickSuccessHandler);
  };

  var documentKeydownEscSuccessHandler = function (evt) {
    if (evt.keyCode === window.utilities.KEYCODE_ESC) {
      hideSuccess();
    }
  };

  var documentClickSuccessHandler = function (evt) {
    if (!errorMessageNode.contains(evt.target)) {
      hideSuccess();
    }
  };


  var setup = function () {
    renderError();
    renderSuccess();
  };


  window.notification = {
    setup: setup,
    showError: showError,
    showSuccess: showSuccess
  };
})();
