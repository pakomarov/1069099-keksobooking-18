'use strict';


(function () {
  var typeValueToPresentation = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
  };


  var cardTemplateNode = document.querySelector('#card').content.querySelector('.popup');


  var createNode = function (ad) {
    var cardNode = cardTemplateNode.cloneNode('true');


    var hideNode = function (selector) {
      window.utilities.hideNodeWithClass(cardNode.querySelector(selector));
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
        window.utilities.hideNodeWithClass(featureNode);
      });
      ad.offer.features.forEach(function (feature) {
        window.utilities.showNodeWithClass(cardNode.querySelector('.popup__feature--' + feature));
      });
    } else {
      hideNode('.popup__features');
    }

    if (ad.offer.description && window.utilities.hasStringContent(ad.offer.description)) {
      cardNode.querySelector('.popup__description').textContent = ad.offer.description;
    } else {
      hideNode('.popup__description');
    }

    if (ad.offer.photos && ad.offer.photos.length) {
      var photoTemplateNode = cardNode.querySelector('.popup__photo');
      var photoContainerNode = cardNode.querySelector('.popup__photos');
      photoTemplateNode.parentNode.removeChild(photoTemplateNode);
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


  window.card = {
    createNode: createNode
  };
})();
