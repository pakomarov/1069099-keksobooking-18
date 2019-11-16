'use strict';


(function () {
  var ACTIVE_PIN_CLASS = 'map__pin--active';
  var typeValueToPresentation = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
  };


  var cardTemplateNode = document.querySelector('#card').content.querySelector('.popup');
  var mapNode = document.querySelector('.map');
  var mapPinsNode = mapNode.querySelector('.map__pins');


  var createNode = function (ad) {
    var cardNode = cardTemplateNode.cloneNode('true');


    var hideNode = function (selector) {
      window.utilities.hideNodeThroughProperty(cardNode.querySelector(selector));
    };


    if (ad.author.avatar && window.utilities.hasStringContent(ad.author.avatar)) {
      cardNode.querySelector('.popup__avatar').src = ad.author.avatar;
    } else {
      hideNode('.popup__avatar');
    }

    if (ad.offer.title && window.utilities.hasStringContent(ad.offer.title)) {
      cardNode.querySelector('.popup__title').textContent = ad.offer.title;
    } else {
      hideNode('.popup__title');
    }

    if (ad.offer.address && window.utilities.hasStringContent(ad.offer.address)) {
      cardNode.querySelector('.popup__text--address').textContent = ad.offer.address;
    } else {
      hideNode('.popup__text--address');
    }

    if (ad.offer.price) {
      cardNode.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    } else {
      hideNode('.popup__text--price');
    }

    if (ad.offer.type && window.utilities.hasStringContent(ad.offer.type)) {
      cardNode.querySelector('.popup__type').textContent = typeValueToPresentation[ad.offer.type] ? typeValueToPresentation[ad.offer.type] : ad.offer.type;
    } else {
      hideNode('.popup__type');
    }

    if (ad.offer.rooms && ad.offer.guests) {
      cardNode.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' ' + (ad.offer.rooms === 1 ? 'комната' : 'комнаты') + ' для ' + ad.offer.guests + ' ' + (ad.offer.guests === 1 ? 'гостя' : 'гостей');
    } else {
      hideNode('.popup__text--capacity');
    }

    if (ad.offer.checkin && ad.offer.checkout && window.utilities.hasStringContent(ad.offer.checkin) && window.utilities.hasStringContent(ad.offer.checkout)) {
      cardNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout;
    } else if (ad.offer.checkin && window.utilities.hasStringContent(ad.offer.checkin)) {
      cardNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin;
    } else if (ad.offer.checkout && window.utilities.hasStringContent(ad.offer.checkout)) {
      cardNode.querySelector('.popup__text--time').textContent = 'Выезд до ' + ad.offer.checkout;
    } else {
      hideNode('.popup__text--price');
    }

    if (ad.offer.features && ad.offer.features.length) {
      cardNode.querySelectorAll('.popup__feature').forEach(function (featureNode) {
        window.utilities.hideNodeThroughProperty(featureNode);
      });
      ad.offer.features.forEach(function (feature) {
        window.utilities.showNodeThroughProperty(cardNode.querySelector('.popup__feature--' + feature));
      });
    } else {
      hideNode('.popup__features');
    }

    if (ad.offer.description && window.utilities.hasStringContent(ad.offer.description)) {
      cardNode.querySelector('.popup__description').textContent = ad.offer.description;
    } else {
      hideNode('.popup__description');
    }

    var photoTemplateNode = cardNode.querySelector('.popup__photo');
    photoTemplateNode.parentNode.removeChild(photoTemplateNode);
    if (ad.offer.photos && ad.offer.photos.length) {
      var photoContainerNode = cardNode.querySelector('.popup__photos');
      ad.offer.photos.forEach(function (source) {
        if (window.utilities.hasStringContent(source)) {
          var newPhotoNode = photoTemplateNode.cloneNode('true');
          newPhotoNode.src = source;
          photoContainerNode.appendChild(newPhotoNode);
        }
      });
    } else {
      hideNode('.popup__photos');
    }


    return cardNode;
  };


  var documentEscKeydownHandler = function (evt) {
    if (evt.keyCode === window.utilities.KEYCODE_ESC) {
      closePopup();
    }
  };

  var closeClickHandler = function () {
    closePopup();
  };

  var showPopup = function (ad) {
    var node = createNode(ad);

    var closeNode = node.querySelector('.popup__close');
    closeNode.addEventListener('click', closeClickHandler);
    document.addEventListener('keydown', documentEscKeydownHandler);

    document.querySelector('.map').insertBefore(node, document.querySelector('.map__filters-container'));
  };

  var closePopup = function () {
    var popup = mapNode.querySelector('.map__card');

    popup.remove();

    popup.removeEventListener('click', closeClickHandler);
    document.removeEventListener('keydown', documentEscKeydownHandler);

    mapPinsNode.querySelector('.' + ACTIVE_PIN_CLASS).classList.remove(ACTIVE_PIN_CLASS);
  };


  window.card = {
    showPopup: showPopup,
    closePopup: closePopup
  };
})();
