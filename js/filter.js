'use strict';


(function () {
  var SELECT_VALUE_ANY = 'any';
  var priceOptionToPriceRange = {
    'low': {
      min: 0,
      max: 9999
    },
    'middle': {
      min: 10000,
      max: 49999
    },
    'high': {
      min: 50000,
      max: Infinity
    }
  };


  var filterNode = document.querySelector('.map__filters');
  var inputNodes = filterNode.querySelectorAll('.map__filters input');
  var selectNodes = filterNode.querySelectorAll('.map__filters select');
  var housingTypeNode = filterNode.querySelector('#housing-type');
  var priceNode = filterNode.querySelector('#housing-price');
  var roomCountNode = filterNode.querySelector('#housing-rooms');
  var guestCountNode = filterNode.querySelector('#housing-guests');
  var featuresNode = filterNode.querySelector('#housing-features');
  var featureNodes = featuresNode.querySelectorAll('input');


  var initialFilterSettings = null;
  var filterSettings = null;


  var getCurrentFeatures = function () {
    var checkedFeatureNodes = featuresNode.querySelectorAll('input:checked');
    var features = Array.from(checkedFeatureNodes).map(function (featureNode) {
      return featureNode.value;
    });
    return features;
  };

  var storeInitialFilterSettings = function () {
    initialFilterSettings = {
      housingType: housingTypeNode.value,
      priceOption: priceNode.value,
      roomCount: roomCountNode.value,
      guestCount: guestCountNode.value,
      features: getCurrentFeatures()
    };
  };

  var loadInitialFilterSettings = function () {
    filterSettings = window.utilities.createShallowCopy(initialFilterSettings);
    filterSettings.features = initialFilterSettings.features.slice();
  };

  var removeFilterSettings = function () {
    filterSettings = null;
  };

  var restoreFilterNodes = function () {
    housingTypeNode.value = initialFilterSettings.housingType;
    priceNode.value = initialFilterSettings.priceOption;
    roomCountNode.value = initialFilterSettings.roomCount;
    guestCountNode.value = initialFilterSettings.guestCount;
    featureNodes.forEach(function (featureNode) {
      featureNode.checked = initialFilterSettings.features.indexOf(featureNode.value) === -1 ? false : true;
    });
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
    loadInitialFilterSettings();
    enableAllFields();
  };


  var hasAppropriateHousingType = function (ad) {
    var adType = window.ads.getAdHousingType(ad);
    return filterSettings.housingType === SELECT_VALUE_ANY || adType && adType === filterSettings.housingType;
  };

  var hasAppropriatePrice = function (ad) {
    if (filterSettings.priceOption === SELECT_VALUE_ANY) {
      return true;
    }

    var adPrice = window.ads.getAdPrice(ad);
    var priceRange = priceOptionToPriceRange[filterSettings.priceOption];
    return adPrice && (adPrice > priceRange.min) && (adPrice < priceRange.max);
  };

  var hasAppropriateRoomCount = function (ad) {
    var adRoomCount = (window.ads.getAdRoomCount(ad)).toString();
    return filterSettings.roomCount === SELECT_VALUE_ANY || adRoomCount && adRoomCount === filterSettings.roomCount;
  };

  var hasAppropriateGuestCount = function (ad) {
    var adGuestCount = (window.ads.getAdGuestCount(ad)).toString();
    return filterSettings.guestCount === SELECT_VALUE_ANY || adGuestCount && adGuestCount === filterSettings.guestCount;
  };

  var hasAppropriateFeatures = function (ad) {
    if (filterSettings.features.length === 0) {
      return true;
    }

    var adFeatures = window.ads.getAdFeatures(ad);
    if (!adFeatures) {
      return false;
    }

    for (var i = 0; i < filterSettings.features.length; i++) {
      if (adFeatures.indexOf(filterSettings.features[i]) === -1) {
        return false;
      }
    }

    return true;
  };

  var filterAds = function (ads) {
    return ads.filter(function (ad) {
      return hasAppropriateHousingType(ad) && hasAppropriatePrice(ad) && hasAppropriateRoomCount(ad) && hasAppropriateGuestCount(ad) && hasAppropriateFeatures(ad);
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

  var priceChangeHandler = function () {
    filterSettings.priceOption = priceNode.value;
  };

  var roomCountChangeHandler = function () {
    filterSettings.roomCount = roomCountNode.value;
  };

  var guestCountChangeHandler = function () {
    filterSettings.guestCount = guestCountNode.value;
  };

  var featureChangeHandler = function (evt) {
    var featureNode = evt.target;
    var feature = featureNode.value;
    var indexOfFeature = filterSettings.features.indexOf(feature);
    if (indexOfFeature === -1) {
      filterSettings.features.push(feature);
    } else {
      filterSettings.features.splice(indexOfFeature, 1);
    }
  };


  var setup = function () {
    window.ads.setCustomLoadHandler(onAdsLoad);
    storeInitialFilterSettings();
    housingTypeNode.addEventListener('change', housingTypeChangeHandler);
    priceNode.addEventListener('change', priceChangeHandler);
    roomCountNode.addEventListener('change', roomCountChangeHandler);
    guestCountNode.addEventListener('change', guestCountChangeHandler);
    filterNode.addEventListener('change', filterChangeHandler);
    featureNodes.forEach(function (featureNode) {
      featureNode.addEventListener('change', featureChangeHandler);
    });
  };


  window.filter = {
    setup: setup,
    deactivate: deactivate,
    filterAds: filterAds
  };
})();
