'use strict';


(function () {
  var URL_LOAD_ADS = 'https://js.dump.academy/keksobooking/data';
  var URL_SEND_FORM = 'https://js.dump.academy/keksobooking';
  var METHOD_GET = 'GET';
  var METHOD_POST = 'POST';


  var loadAds = function (onLoad, onError) {
    window.network.request(URL_LOAD_ADS, METHOD_GET, onLoad, onError);
  };

  var sendForm = function (onLoad, onError, data) {
    window.network.request(URL_SEND_FORM, METHOD_POST, onLoad, onError, data);
  };


  window.backend = {
    loadAds: loadAds,
    sendForm: sendForm
  };
})();
