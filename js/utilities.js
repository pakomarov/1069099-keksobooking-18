'use strict';


(function () {
  var KEYCODE_ESC = 27;
  var KEYCODE_ENTER = 13;


  var mapIterable = function (iterable, cb) {
    for (var i = 0; i < iterable.length; i++) {
      cb(iterable[i]);
    }
  };

  var disableNode = function (node) {
    node.setAttribute('disabled', '');
  };

  var enableNode = function (node) {
    node.removeAttribute('disabled');
  };

  var disableNodes = function (nodes) {
    mapIterable(nodes, disableNode);
  };

  var enableNodes = function (nodes) {
    mapIterable(nodes, enableNode);
  };

  var renderNodes = function (targetNode, nodes) {
    var fragment = document.createDocumentFragment();

    mapIterable(nodes, function (node) {
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
    KEYCODE_ENTER: KEYCODE_ENTER,
    KEYCODE_ESC: KEYCODE_ESC,
    disableNodes: disableNodes,
    enableNodes: enableNodes,
    renderNodes: renderNodes,
    getNodePosition: getNodePosition,
    createShallowCopy: createShallowCopy
  };
})();
