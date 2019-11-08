'use strict';


(function () {
  var VALIDATION_TABLE_ROOMS_CAPACITY = {
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
  var roomNumberSelectNode = adFormNode.querySelector('#room_number');
  var capacitySelectNode = adFormNode.querySelector('#capacity');
  var adFormInputNodes = adFormNode.querySelectorAll('input');
  var adFormSelectNodes = adFormNode.querySelectorAll('select');
  var adFormTextareaNodes = adFormNode.querySelectorAll('textarea');
  var adFormButtonNodes = adFormNode.querySelectorAll('button');
  var addressInputNode = adFormNode.querySelector('#address');


  var disableAllFields = function () {
    window.utilities.disableNodes(adFormInputNodes);
    window.utilities.disableNodes(adFormSelectNodes);
    window.utilities.disableNodes(adFormTextareaNodes);
    window.utilities.disableNodes(adFormButtonNodes);
  };

  var deactivate = function () {
    disableAllFields();
    adFormNode.classList.add('ad-form--disabled');
  };


  var enableAllFields = function () {
    window.utilities.enableNodes(adFormInputNodes);
    window.utilities.enableNodes(adFormSelectNodes);
    window.utilities.enableNodes(adFormTextareaNodes);
    window.utilities.enableNodes(adFormButtonNodes);
  };

  var activate = function () {
    enableAllFields();
    adFormNode.classList.remove('ad-form--disabled');
  };


  var refreshAddress = function () {
    var currentAddress = window.map.getAddress();
    addressInputNode.value = currentAddress;
  };


  var setCapacityValidity = function () {
    var selectedRoomCount = roomNumberSelectNode.value;
    var selectedCapacity = capacitySelectNode.value;
    var validationRulesForSelectedRoomCount = VALIDATION_TABLE_ROOMS_CAPACITY[selectedRoomCount];
    var validCapacityValues = validationRulesForSelectedRoomCount.validCapacityValues;
    var errorMessage = validationRulesForSelectedRoomCount.errorMessage;

    if (validCapacityValues.includes(selectedCapacity)) {
      capacitySelectNode.setCustomValidity('');
    } else {
      capacitySelectNode.setCustomValidity(errorMessage);
    }
  };

  var roomNumberSelectChangeHandler = function () {
    setCapacityValidity();
    capacitySelectNode.reportValidity();
  };

  var capacitySelectChangeHandler = function () {
    setCapacityValidity();
    capacitySelectNode.reportValidity();
  };


  var setup = function () {
    roomNumberSelectNode.addEventListener('change', roomNumberSelectChangeHandler);
    capacitySelectNode.addEventListener('change', capacitySelectChangeHandler);
  };


  window.form = {
    setup: setup,
    deactivate: deactivate,
    activate: activate,
    refreshAddress: refreshAddress
  };
})();
