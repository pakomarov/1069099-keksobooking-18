'use strict';


var KEYCODE_ENTER = 13;
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
var PIN_OFFSET_X = 25;
var PIN_OFFSET_Y = 70;
var PIN_MAIN_OFFSET_X = 32;
var PIN_MAIN_OFFSET_Y_ACTIVE = 82;
var PIN_MAIN_OFFSET_Y_INACTIVE = 30;


var mapNode = document.querySelector('.map');
var mapFiltersNode = mapNode.querySelector('.map__filters');
var mapFiltersInputNodes = mapFiltersNode.querySelectorAll('input');
var mapFiltersSelectNodes = mapFiltersNode.querySelectorAll('select');
var pinTemplateNode = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinsNode = mapNode.querySelector('.map__pins');
var mapPinsNodeWidth = mapPinsNode.offsetWidth;
var mapPinMainNode = mapPinsNode.querySelector('.map__pin--main');
var adFormNode = document.querySelector('.ad-form');
var adFormInputNodes = adFormNode.querySelectorAll('input');
var adFormSelectNodes = adFormNode.querySelectorAll('select');
var adFormTextareaNodes = adFormNode.querySelectorAll('textarea');
var adFormButtonNodes = adFormNode.querySelectorAll('button');
var addressInputNode = adFormNode.querySelector('#address');


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

var createAvatarIndexes = function (avatarIndexesCount) {
  // Предварительное перемешивание массива необходимо для того, чтобы валидные индексы имели одинаковый шанс попасть в массив индексов, в случае, если кол-во необходимых индексов не кратно кол-ву валидных индексов.
  var validAvatarIndexes = createShuffledRange(MOCKUP_AVATAR_INDEX_MIN, MOCKUP_AVATAR_INDEX_MAX);
  var avatarIndexes = [];

  for (var j, i = 0; i < avatarIndexesCount; i++) {
    // Обходим массив валидных индексов по кругу, если требуемое кол-во индексов превышает кол-во валидных индексов. Таким образом программа будет работать даже, если кол-во требуемых объявлений больше кол-ва валидных индексов (кол-ва уникальных аватарок)
    j = i % validAvatarIndexes.length;
    avatarIndexes.push(validAvatarIndexes[j]);
  }

  // Финальное перемешивание массива необходимо для того, чтобы убрать цикличность из итогового массива, в случае если требуемое кол-во индексов превышает кол-во валидных индексов.
  var shuffledAvatarIndexes = getShuffledArray(avatarIndexes);

  return shuffledAvatarIndexes;
};

var createMockupAvatar = function (avatarIndex) {
  return 'img/avatars/user0' + avatarIndex + '.png';
};

var createMockupTitle = function () {
  return getRandomArrayEntry(MOCKUP_TITLES);
};

var getOfferAddress = function (ad) {
  return ad.location.x + ', ' + ad.location.y;
};

var createMockupPrice = function () {
  return getRandomNumberInRange(MOCKUP_PRICE_MIN, MOCKUP_PRICE_MAX);
};

var createMockupType = function () {
  return getRandomArrayEntry(MOCKUP_TYPES);
};

var createMockupRoomsCount = function () {
  return getRandomNumberInRange(MOCKUP_ROOMS_MIN, MOCKUP_ROOMS_MAX);
};

var createMockupGuestsCount = function () {
  return getRandomNumberInRange(MOCKUP_GUESTS_MIN, MOCKUP_GUESTS_MAX);
};

var createMockupCheckinTime = function () {
  return getRandomArrayEntry(MOCKUP_CHECKIN_TIMES);
};

var createMockupCheckoutTime = function () {
  return getRandomArrayEntry(MOCKUP_CHECKOUT_TIMES);
};

var createMockupFeatures = function () {
  return getShuffledRandomSubsetOfArray(MOCKUP_FEATURES);
};

var createMockupDescription = function () {
  return getRandomArrayEntry(MOCKUP_DESCRIPTIONS);
};

var createMockupPhotos = function () {
  return getShuffledRandomSubsetOfArray(MOCKUP_PHOTOS);
};

var createMockupLocationX = function () {
  return getRandomNumberInRange(0, mapPinsNodeWidth);
};

var createMockupLocationY = function () {
  return getRandomNumberInRange(MOCKUP_LOCATION_Y_MIN, MOCKUP_LOCATION_Y_MAX);
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

var createPinNode = function (ad) {
  var pinNode = pinTemplateNode.cloneNode('true');
  var imageNode = pinNode.children[0];

  pinNode.style.left = (ad.location.x - PIN_OFFSET_X) + 'px';
  pinNode.style.top = (ad.location.y - PIN_OFFSET_Y) + 'px';

  imageNode.src = ad.author.avatar;
  imageNode.alt = ad.offer.title;

  return pinNode;
};

var createPinNodes = function (ads) {
  return ads.map(createPinNode);
};

var renderNodes = function (targetNode, nodes) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < nodes.length; i++) {
    fragment.appendChild(nodes[i]);
  }

  targetNode.appendChild(fragment);
};

var mapNodeList = function (nodeList, mappingFunction) {
  for (var i = 0; i < nodeList.length; i++) {
    mappingFunction(nodeList[i]);
  }
};

var disableNode = function (node) {
  node.setAttribute('disabled', '');
};

var enableNode = function (node) {
  node.removeAttribute('disabled');
};

var disableNodes = function (nodes) {
  mapNodeList(nodes, disableNode);
};

var enableNodes = function (nodes) {
  mapNodeList(nodes, enableNode);
};

var deactivatePage = function () {
  mapNode.classList.add('map--faded');
  adFormNode.classList.add('ad-form--disabled');
  disableNodes(mapFiltersInputNodes);
  disableNodes(mapFiltersSelectNodes);
  disableNodes(adFormInputNodes);
  disableNodes(adFormSelectNodes);
  disableNodes(adFormTextareaNodes);
  disableNodes(adFormButtonNodes);
  setAddressInput();
};

var activatePage = function () {
  mapNode.classList.remove('map--faded');
  adFormNode.classList.remove('ad-form--disabled');
  enableNodes(mapFiltersInputNodes);
  enableNodes(mapFiltersSelectNodes);
  enableNodes(adFormInputNodes);
  enableNodes(adFormSelectNodes);
  enableNodes(adFormTextareaNodes);
  enableNodes(adFormButtonNodes);
  setAddressInput();
};

var getNodePositioning = function (node) {
  return {
    top: node.offsetTop,
    left: node.offsetLeft
  };
};

var mapIsActive = function () {
  return !mapNode.classList.contains('map--faded');
};

var createAddressFromPositioning = function (positioning) {
  var offsetY = mapIsActive() ? PIN_MAIN_OFFSET_Y_ACTIVE : PIN_MAIN_OFFSET_Y_INACTIVE;
  var offsetX = PIN_MAIN_OFFSET_X;
  var y = positioning.top + offsetY;
  var x = positioning.left + offsetX;
  return Math.floor(x) + ' ' + Math.floor(y);
};

var setAddressInput = function () {
  var mapPinMainPositioning = getNodePositioning(mapPinMainNode);
  var address = createAddressFromPositioning(mapPinMainPositioning);
  addressInputNode.value = address;
};

var mapPinMainMousedownHandler = function () {
  activatePage();
};

var mapPinMainKeydownEnterHandler = function (evt) {
  if (evt.keyCode === KEYCODE_ENTER) {
    activatePage();
  }
};


deactivatePage();

mapPinMainNode.addEventListener('mousedown', mapPinMainMousedownHandler);
mapPinMainNode.addEventListener('keydown', mapPinMainKeydownEnterHandler);

var mockupAds = createMockupAds();

var pinNodes = createPinNodes(mockupAds);

renderNodes(mapPinsNode, pinNodes);
