'use strict';


(function () {
  var PIN_OFFSET_X = 25;
  var PIN_OFFSET_Y = 70;


  var pinTemplateNode = document.querySelector('#pin').content.querySelector('.map__pin');


  var createNode = function (ad) {
    var pinNode = pinTemplateNode.cloneNode('true');
    var imageNode = pinNode.children[0];

    pinNode.style.left = (ad.location.x - PIN_OFFSET_X) + 'px';
    pinNode.style.top = (ad.location.y - PIN_OFFSET_Y) + 'px';

    imageNode.src = ad.author.avatar;
    imageNode.alt = ad.offer.title;

    return pinNode;
  };


  window.pin = {
    createNode: createNode
  };
})();
