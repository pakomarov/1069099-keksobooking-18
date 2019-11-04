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


  var roomNumberSelectNode = document.querySelector('#room_number');
  var capacitySelectNode = document.querySelector('#capacity');


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
    setup: setup
  };
})();
