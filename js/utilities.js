'use strict';


(function () {
  var HIDING_CLASS = 'hidden';
  var HIDING_DISPLAY_PROPERTY = 'none';
  var SHOWING_DISPLAY_PROPERTY = '';
  var DISABLE_ATTRIBUTE = 'disabled';
  var KEYCODE_ESC = 27;
  var KEYCODE_ENTER = 13;
  var DEFAULT_DEBOUNCE_INTERVAL = 300;


  var hasStringContent = function (string) {
    return !!string.trim();
  };

  var isEmptyObject = function (object) {
    return Object.keys(object).length === 0;
  };

  var hideNodeThroughClass = function (node) {
    node.classList.add(HIDING_CLASS);
  };

  var showNodeThroughClass = function (node) {
    node.classList.remove(HIDING_CLASS);
  };

  var hideNodeThroughProperty = function (node) {
    node.style.display = HIDING_DISPLAY_PROPERTY;
  };

  var showNodeThroughProperty = function (node) {
    node.style.display = SHOWING_DISPLAY_PROPERTY;
  };

  var disableNode = function (node) {
    node.setAttribute(DISABLE_ATTRIBUTE, '');
  };

  var enableNode = function (node) {
    node.removeAttribute(DISABLE_ATTRIBUTE);
  };

  var disableNodes = function (nodes) {
    nodes.forEach(disableNode);
  };

  var enableNodes = function (nodes) {
    nodes.forEach(enableNode);
  };

  var getNodePosition = function (node) {
    return {
      top: node.offsetTop,
      left: node.offsetLeft
    };
  };

  var createShallowCopy = function (object) {
    return Object.assign({}, object);
  };

  var debounce = function (cb, interval) {
    interval = interval || DEFAULT_DEBOUNCE_INTERVAL;

    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, interval);
    };
  };


  window.utilities = {
    KEYCODE_ENTER: KEYCODE_ENTER,
    KEYCODE_ESC: KEYCODE_ESC,
    hasStringContent: hasStringContent,
    isEmptyObject: isEmptyObject,
    hideNodeThroughClass: hideNodeThroughClass,
    showNodeThroughClass: showNodeThroughClass,
    hideNodeThroughProperty: hideNodeThroughProperty,
    showNodeThroughProperty: showNodeThroughProperty,
    disableNodes: disableNodes,
    enableNodes: enableNodes,
    getNodePosition: getNodePosition,
    createShallowCopy: createShallowCopy,
    debounce: debounce
  };
})();
