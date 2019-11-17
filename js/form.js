'use strict';


(function () {
  var DEACTIVATION_CLASS = 'ad-form--disabled';
  var housingTypeToMinPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var roomCountToValidationRules = {
    '1': {
      validCapacityValues: ['1'],
      errorMessage: 'Выбранное количество комнат расчитано на одного гостя'
    },
    '2': {
      validCapacityValues: ['2', '1'],
      errorMessage: 'Выбранное количество комнат расчитано на одного или двух гостей'
    },
    '3': {
      validCapacityValues: ['3', '2', '1'],
      errorMessage: 'Выбранное количество комнат расчитано на одного, двух или трёх гостей'
    },
    '100': {
      validCapacityValues: ['0'],
      errorMessage: 'Выбранное количество комнат не расчитано для принятия гостей'
    },
  };


  var adFormNode = document.querySelector('.ad-form');
  var adFormInputNodes = adFormNode.querySelectorAll('input');
  var adFormSelectNodes = adFormNode.querySelectorAll('select');
  var adFormTextareaNodes = adFormNode.querySelectorAll('textarea');
  var adFormButtonNodes = adFormNode.querySelectorAll('button');
  var titleNode = adFormNode.querySelector('#title');
  var addressNode = adFormNode.querySelector('#address');
  var housingTypeNode = adFormNode.querySelector('#type');
  var priceNode = adFormNode.querySelector('#price');
  var timeInNode = adFormNode.querySelector('#timein');
  var timeOutNode = adFormNode.querySelector('#timeout');
  var roomCountNode = adFormNode.querySelector('#room_number');
  var capacityNode = adFormNode.querySelector('#capacity');
  var featureNodes = adFormNode.querySelectorAll('.features input');
  var descriptionNode = adFormNode.querySelector('#description');
  var resetButtonNode = adFormNode.querySelector('.ad-form__reset');


  var initialFormSettings = null;


  var customResetButtonClickHandler = function () {};
  var customSendSuccessHandler = function () {};


  var storeInitialFormSettings = function () {
    initialFormSettings = {
      type: housingTypeNode.value,
      timeIn: timeInNode.value,
      roomCount: roomCountNode.value,
      capacity: capacityNode.value
    };
  };

  var restoreFormSettings = function () {
    titleNode.value = '';
    housingTypeNode.value = initialFormSettings.type;
    setMinPrice();
    priceNode.value = '';
    timeInNode.value = initialFormSettings.timeIn;
    timeOutNode.value = timeInNode.value;
    roomCountNode.value = initialFormSettings.roomCount;
    setCapacityValidity();
    capacityNode.value = initialFormSettings.capacity;
    featureNodes.forEach(function (featureNode) {
      featureNode.checked = false;
    });
    descriptionNode.value = '';
  };


  var disableAllFields = function () {
    window.utilities.disableNodes(adFormInputNodes);
    window.utilities.disableNodes(adFormSelectNodes);
    window.utilities.disableNodes(adFormTextareaNodes);
    window.utilities.disableNodes(adFormButtonNodes);
  };

  var deactivate = function () {
    disableAllFields();
    adFormNode.classList.add(DEACTIVATION_CLASS);
    restoreFormSettings();
  };


  var enableAllFields = function () {
    window.utilities.enableNodes(adFormInputNodes);
    window.utilities.enableNodes(adFormSelectNodes);
    window.utilities.enableNodes(adFormTextareaNodes);
    window.utilities.enableNodes(adFormButtonNodes);
  };

  var activate = function () {
    enableAllFields();
    adFormNode.classList.remove(DEACTIVATION_CLASS);
  };


  var setMinPrice = function () {
    var newMinPrice = housingTypeToMinPrice[housingTypeNode.value];
    priceNode.min = newMinPrice;
    priceNode.placeholder = newMinPrice;
  };

  var housingTypeChangeHandler = function () {
    setMinPrice();
  };

  var timeInChangeHandler = function () {
    timeOutNode.value = timeInNode.value;
  };

  var timeOutChangeHandler = function () {
    timeInNode.value = timeOutNode.value;
  };

  var setCapacityValidity = function () {
    var selectedRoomCount = roomCountNode.value;
    var selectedCapacity = capacityNode.value;
    var validationRules = roomCountToValidationRules[selectedRoomCount];
    var validCapacityValues = validationRules.validCapacityValues;
    var errorMessage = validationRules.errorMessage;

    if (validCapacityValues.includes(selectedCapacity)) {
      capacityNode.setCustomValidity('');
    } else {
      capacityNode.setCustomValidity(errorMessage);
    }
  };

  var roomNumberChangeHandler = function () {
    setCapacityValidity();
    capacityNode.reportValidity();
  };

  var capacityChangeHandler = function () {
    setCapacityValidity();
    capacityNode.reportValidity();
  };


  var getAddressFromLocation = function (location) {
    return location.x + ' ' + location.y;
  };

  var refreshAddress = function (location) {
    addressNode.value = getAddressFromLocation(location);
  };


  var resetButtonClickHandler = function () {
    customResetButtonClickHandler();
  };

  var onSuccess = function () {
    customSendSuccessHandler();
    window.notification.showSuccess();
  };

  var onError = function (error) {
    window.notification.showError(error);
  };

  var adFormSubmitHandler = function (evt) {
    var formData = new FormData(adFormNode);
    window.backend.sendForm(onSuccess, onError, formData);
    evt.preventDefault();
  };


  var setCustomResetButtonClickHandler = function (callback) {
    customResetButtonClickHandler = callback;
  };

  var setCustomSendSuccessHandler = function (callback) {
    customSendSuccessHandler = callback;
  };


  var setup = function () {
    storeInitialFormSettings();
    housingTypeNode.addEventListener('change', housingTypeChangeHandler);
    timeInNode.addEventListener('change', timeInChangeHandler);
    timeOutNode.addEventListener('change', timeOutChangeHandler);
    roomCountNode.addEventListener('change', roomNumberChangeHandler);
    capacityNode.addEventListener('change', capacityChangeHandler);
    resetButtonNode.addEventListener('click', resetButtonClickHandler);
    adFormNode.addEventListener('submit', adFormSubmitHandler);
  };


  window.form = {
    setup: setup,
    deactivate: deactivate,
    activate: activate,
    refreshAddress: refreshAddress,
    setCustomResetButtonClickHandler: setCustomResetButtonClickHandler,
    setCustomSendSuccessHandler: setCustomSendSuccessHandler
  };
})();
