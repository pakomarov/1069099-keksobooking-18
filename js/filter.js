'use strict';


(function () {
  var HOUSING_TYPE_ANY = 'any';


  var filterNode = document.querySelector('.map__filters');
  var inputNodes = filterNode.querySelectorAll('.map__filters input');
  var selectNodes = filterNode.querySelectorAll('.map__filters select');
  var housingTypeNode = filterNode.querySelector('#housing-type');


  var Filter = function (housingType) {
    this.housingType = housingType;
  };

  var initialFilterSettings;
  var filterSettings;


  var storeInitialFilterSettings = function () {
    initialFilterSettings = new Filter(
        housingTypeNode.value
    );
  };

  var loadFilterSettings = function () {
    filterSettings = new Filter(
        initialFilterSettings.housingType
    );
  };

  var removeFilterSettings = function () {
    filterSettings = new Filter();
  };

  var restoreFilterNodes = function () {
    housingTypeNode.value = initialFilterSettings.housingType; // Не тригерит событие change на селекте
  };


  var disableAllFields = function () {
    window.utilities.disableNodes(inputNodes);
    window.utilities.disableNodes(selectNodes);
  };

  var enableAllFields = function () {
    window.utilities.enableNodes(inputNodes);
    window.utilities.enableNodes(selectNodes);
  };

  var deactivate = function () {
    disableAllFields();
    restoreFilterNodes();
    removeFilterSettings();
  };

  var activate = function () {
    loadFilterSettings();
    enableAllFields();
  };


  var hasValidHousingType = function (ad) {
    var adType = window.ads.getAdHousingType(ad);
    return filterSettings.housingType === HOUSING_TYPE_ANY ? true : adType === filterSettings.housingType;
  };

  var filterAds = function (ads) {
    return ads.filter(function (ad) {
      return hasValidHousingType(ad);
    });
  };


  var onAdsLoad = function () {
    activate();
  };

  var filterChangeHandler = function () {
    window.ads.refreshPins();
  };

  var housingTypeChangeHandler = function () {
    filterSettings.housingType = housingTypeNode.value;
  };


  var setup = function () {
    window.ads.setCustomLoadHandler(onAdsLoad);
    storeInitialFilterSettings();
    housingTypeNode.addEventListener('change', housingTypeChangeHandler);
    filterNode.addEventListener('change', filterChangeHandler);
  };


  window.filter = {
    setup: setup,
    deactivate: deactivate,
    activate: activate,
    filterAds: filterAds
  };
})();
