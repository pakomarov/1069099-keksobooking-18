'use strict';


(function () {
  var KEYCODE_ENTER = 13;


  var createRange = function (min, max) {
    var range = [];

    for (var i = min; i <= max; i++) {
      range.push(i);
    }

    return range;
  };

  var getRandomNumberInRange = function (min, max) {
    // Добавление единицы необходимо, чтобы включить максимальное значение. Math.random() считает от 0 включительно до 1, не включая единицу
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArrayEntry = function (array) {
    var randomArrayIndex = getRandomNumberInRange(0, (array.length - 1));
    return array[randomArrayIndex];
  };

  var getShuffledArray = function (array) {
    var shuffledArray = array.slice();

    // Алгоритм: "The Durstenfeld Shuffle" (оптимизированная версия "Fisher–Yates shuffle")
    // Алгоритм работает с конца до начала для простоты расчёта индекса j. 0 < j < i если работать начиная с конца, или i < j < (array.length - 1) если работать с начала
    for (var temp, j, i = shuffledArray.length - 1; i > 0; i--) {
      j = getRandomNumberInRange(0, i);

      temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
    }

    return shuffledArray;
  };

  var getRandomlyTrimmedArray = function (array) {
    var randomlyTrimmedArray = array.slice();
    var randomTrimCount = getRandomNumberInRange(0, randomlyTrimmedArray.length);

    for (var i = 0; i < randomTrimCount; i++) {
      randomlyTrimmedArray.pop();
    }

    return randomlyTrimmedArray;
  };

  var createShuffledRange = function (min, max) {
    var range = createRange(min, max);
    var shuffledRange = getShuffledArray(range);
    return shuffledRange;
  };

  var getShuffledRandomSubsetOfArray = function (array) {
    var shuffledArray = getShuffledArray(array);
    var shuffledRandomSubsetOfArray = getRandomlyTrimmedArray(shuffledArray);
    return shuffledRandomSubsetOfArray;
  };

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

    for (var i = 0; i < nodes.length; i++) {
      fragment.appendChild(nodes[i]);
    }

    targetNode.appendChild(fragment);
  };

  var getNodePosition = function (node) {
    return {
      top: node.offsetTop,
      left: node.offsetLeft
    };
  };


  window.utilities = {
    KEYCODE_ENTER: KEYCODE_ENTER,
    getRandomNumberInRange: getRandomNumberInRange,
    getRandomArrayEntry: getRandomArrayEntry,
    getShuffledArray: getShuffledArray,
    createShuffledRange: createShuffledRange,
    getShuffledRandomSubsetOfArray: getShuffledRandomSubsetOfArray,
    disableNodes: disableNodes,
    enableNodes: enableNodes,
    renderNodes: renderNodes,
    getNodePosition: getNodePosition
  };
})();
