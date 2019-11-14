'use strict';


(function () {
  var HIDING_CLASS = 'hidden';
  var DISABLE_ATTRIBUTE = 'disabled';
  var KEYCODE_ESC = 27;
  var KEYCODE_ENTER = 13;


  var hideNodeWithClass = function (node) {
    node.classList.add(HIDING_CLASS);
  };

  var showNodeWithClass = function (node) {
    node.classList.remove(HIDING_CLASS);
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

  var renderNodes = function (targetNode, nodes) {
    var fragment = document.createDocumentFragment();

    nodes.forEach(function (node) {
      fragment.appendChild(node);
    });

    targetNode.appendChild(fragment);
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


  window.utilities = {
    HIDING_CLASS: HIDING_CLASS,
    KEYCODE_ENTER: KEYCODE_ENTER,
    KEYCODE_ESC: KEYCODE_ESC,
    hideNodeWithClass: hideNodeWithClass,
    showNodeWithClass: showNodeWithClass,
    disableNodes: disableNodes,
    enableNodes: enableNodes,
    renderNodes: renderNodes,
    getNodePosition: getNodePosition,
    createShallowCopy: createShallowCopy
  };
})();
