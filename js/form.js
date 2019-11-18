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

  var avatarFileChooserNode = adFormNode.querySelector('#avatar');
  var avatarPreviewNode = adFormNode.querySelector('.ad-form-header__preview img');
  var photoFileChooserNode = adFormNode.querySelector('#images');
  var photoPreviewNode = adFormNode.querySelector('.ad-form__photo');


  var initialFormSettings = null;


  var customResetButtonClickHandler = function () {};
  var customSendSuccessHandler = function () {};


  var storeInitialFormSettings = function () {
    initialFormSettings = {
      avatarSource: avatarPreviewNode.src,
      type: housingTypeNode.value,
      timeIn: timeInNode.value,
      roomCount: roomCountNode.value,
      capacity: capacityNode.value
    };
  };

  var restoreFormSettings = function () {
    avatarFileChooserNode.value = '';
    avatarPreviewNode.src = initialFormSettings.avatarSource;
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
    photoFileChooserNode.value = '';
    photoPreviewNode.innerHTML = '';
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

    var validityMessage = validCapacityValues.includes(selectedCapacity) ? '' : errorMessage;
    capacityNode.setCustomValidity(validityMessage);
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


  var onAvatarUpload = function (result) {
    avatarPreviewNode.src = result;
  };

  var onPhotoUpload = function (result) {
    photoPreviewNode.innerHTML = '';
    var imageNode = document.createElement('img');
    imageNode.width = photoPreviewNode.offsetWidth;
    imageNode.height = photoPreviewNode.offsetHeight;
    imageNode.src = result;
    photoPreviewNode.appendChild(imageNode);
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
    window.upload.addUploadListener(avatarFileChooserNode, onAvatarUpload);
    window.upload.addUploadListener(photoFileChooserNode, onPhotoUpload);
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
