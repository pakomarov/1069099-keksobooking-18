'use strict';


(function () {
  var Pin = function (ad) {
    this.createNode(ad);

    var node = this.node;
    var activeClass = this.ACTIVE_CLASS;

    this.clickHandler = function () {
      var popup = document.querySelector('.map__card');
      if (popup) {
        window.card.closePopup();
      }
      window.card.showPopup(ad);
      node.classList.add(activeClass);
    };
    this.node.addEventListener('click', this.clickHandler);
  };

  Pin.prototype.OFFSET_X = 25;

  Pin.prototype.OFFSET_Y = 70;

  Pin.prototype.ACTIVE_CLASS = 'map__pin--active';

  Pin.prototype.pinTemplateNode = document.querySelector('#pin').content.querySelector('.map__pin');

  Pin.prototype.createNode = function (ad) {
    this.node = this.pinTemplateNode.cloneNode('true');

    this.node.style.left = (ad.location.x - this.OFFSET_X) + 'px';
    this.node.style.top = (ad.location.y - this.OFFSET_Y) + 'px';

    this.node.children[0].src = ad.author.avatar;
    this.node.children[0].alt = ad.offer.title;
  };

  Pin.prototype.remove = function () {
    this.node.remove();
    this.node.removeEventListener('click', this.clickHandler);
  };


  window.pin = {
    Pin: Pin
  };
})();
