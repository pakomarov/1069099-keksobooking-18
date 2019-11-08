'use strict';


(function () {
  var URL_LOAD_ADS = 'https://js.dump.academy/keksobooking/data';
  var METHOD_GET = 'GET';


  var loadAds = function (onLoad, onError) {
    window.network.request(URL_LOAD_ADS, METHOD_GET, onLoad, onError);
  };


  window.backend = {
    loadAds: loadAds
  };
})();
