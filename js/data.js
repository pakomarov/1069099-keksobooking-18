'use strict';


(function () {
  var MOCKUP_ADS_COUNT = 8;
  var MOCKUP_AVATAR_INDEX_MIN = 1;
  var MOCKUP_AVATAR_INDEX_MAX = 8;
  var MOCKUP_TITLES = ['Сдам квартиру', 'Квартиру сдам', 'Квартира', 'Квартирка'];
  var MOCKUP_PRICE_MIN = 0;
  var MOCKUP_PRICE_MAX = 100000;
  var MOCKUP_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var MOCKUP_ROOMS_MIN = 1;
  var MOCKUP_ROOMS_MAX = 10;
  var MOCKUP_GUESTS_MIN = 1;
  var MOCKUP_GUESTS_MAX = 20;
  var MOCKUP_CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var MOCKUP_CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var MOCKUP_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var MOCKUP_DESCRIPTIONS = ['Бла бла', 'Кря кря', 'Кудах-тах-тах', 'Тыц тыц', 'Тыры-пыры'];
  var MOCKUP_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MOCKUP_LOCATION_Y_MIN = 130;
  var MOCKUP_LOCATION_Y_MAX = 630;


  var mapPinsNode = document.querySelector('.map__pins');
  var mapPinsNodeWidth = mapPinsNode.offsetWidth;


  var createAvatarIndexes = function (avatarIndexesCount) {
    // Предварительное перемешивание массива необходимо для того, чтобы валидные индексы имели одинаковый шанс попасть в массив индексов, в случае, если кол-во необходимых индексов не кратно кол-ву валидных индексов.
    var validAvatarIndexes = window.utilities.createShuffledRange(MOCKUP_AVATAR_INDEX_MIN, MOCKUP_AVATAR_INDEX_MAX);
    var avatarIndexes = [];

    for (var j, i = 0; i < avatarIndexesCount; i++) {
      // Обходим массив валидных индексов по кругу, если требуемое кол-во индексов превышает кол-во валидных индексов. Таким образом программа будет работать даже, если кол-во требуемых объявлений больше кол-ва валидных индексов (кол-ва уникальных аватарок)
      j = i % validAvatarIndexes.length;
      avatarIndexes.push(validAvatarIndexes[j]);
    }

    // Финальное перемешивание массива необходимо для того, чтобы убрать цикличность из итогового массива, в случае если требуемое кол-во индексов превышает кол-во валидных индексов.
    var shuffledAvatarIndexes = window.utilities.getShuffledArray(avatarIndexes);

    return shuffledAvatarIndexes;
  };

  var createMockupAvatar = function (avatarIndex) {
    return 'img/avatars/user0' + avatarIndex + '.png';
  };

  var createMockupTitle = function () {
    return window.utilities.getRandomArrayEntry(MOCKUP_TITLES);
  };

  var getOfferAddress = function (ad) {
    return ad.location.x + ', ' + ad.location.y;
  };

  var createMockupPrice = function () {
    return window.utilities.getRandomNumberInRange(MOCKUP_PRICE_MIN, MOCKUP_PRICE_MAX);
  };

  var createMockupType = function () {
    return window.utilities.getRandomArrayEntry(MOCKUP_TYPES);
  };

  var createMockupRoomsCount = function () {
    return window.utilities.getRandomNumberInRange(MOCKUP_ROOMS_MIN, MOCKUP_ROOMS_MAX);
  };

  var createMockupGuestsCount = function () {
    return window.utilities.getRandomNumberInRange(MOCKUP_GUESTS_MIN, MOCKUP_GUESTS_MAX);
  };

  var createMockupCheckinTime = function () {
    return window.utilities.getRandomArrayEntry(MOCKUP_CHECKIN_TIMES);
  };

  var createMockupCheckoutTime = function () {
    return window.utilities.getRandomArrayEntry(MOCKUP_CHECKOUT_TIMES);
  };

  var createMockupFeatures = function () {
    return window.utilities.getShuffledRandomSubsetOfArray(MOCKUP_FEATURES);
  };

  var createMockupDescription = function () {
    return window.utilities.getRandomArrayEntry(MOCKUP_DESCRIPTIONS);
  };

  var createMockupPhotos = function () {
    return window.utilities.getShuffledRandomSubsetOfArray(MOCKUP_PHOTOS);
  };

  var createMockupLocationX = function () {
    return window.utilities.getRandomNumberInRange(0, mapPinsNodeWidth);
  };

  var createMockupLocationY = function () {
    return window.utilities.getRandomNumberInRange(MOCKUP_LOCATION_Y_MIN, MOCKUP_LOCATION_Y_MAX);
  };

  var createMockupAd = function (avatarIndex) {
    var mockupAd = {
      author: {
        avatar: createMockupAvatar(avatarIndex)
      },

      offer: {
        title: createMockupTitle(),
        price: createMockupPrice(),
        type: createMockupType(),
        rooms: createMockupRoomsCount(),
        guests: createMockupGuestsCount(),
        checkin: createMockupCheckinTime(),
        checkout: createMockupCheckoutTime(),
        features: createMockupFeatures(),
        description: createMockupDescription(),
        photos: createMockupPhotos()
      },

      location: {
        x: createMockupLocationX(),
        y: createMockupLocationY()
      }
    };

    mockupAd.offer.address = getOfferAddress(mockupAd);

    return mockupAd;
  };

  var createMockupAds = function () {
    var mockupAds = [];
    var avatarIndexes = createAvatarIndexes(MOCKUP_ADS_COUNT);

    for (var i = 0; i < MOCKUP_ADS_COUNT; i++) {
      mockupAds.push(createMockupAd(avatarIndexes[i]));
    }

    return mockupAds;
  };


  window.data = {
    createMockupAds: createMockupAds
  };
})();
