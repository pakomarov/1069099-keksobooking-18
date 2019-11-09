'use strict';


(function () {
  var RESPONSE_TYPE = 'json';
  var NETWORK_FAILURE_STATUS = 0;
  var NETWORK_FAILURE_MESSAGE = 'Не удалось установить соединение с сервером. Пожалуйста, проверьте подключение к сети.';
  var ERROR_STATUS_TYPES = [4, 5];
  var ERROR_MESSAGE = 'К сожалению, у нас возникли неполадки. Попробуйте повторить запрос позднее.';
  var TIMEOUT_DELAY = 10000;
  var GET = 'GET';
  var POST = 'POST';


  var isSuccessStatus = function (status) {
    var statusType = Math.floor(status / 100);
    return ERROR_STATUS_TYPES.indexOf(statusType) === -1;
  };

  var request = function (url, method, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === NETWORK_FAILURE_STATUS) {
        onError(NETWORK_FAILURE_MESSAGE);
        return;
      }

      if (isSuccessStatus(xhr.status)) {
        onLoad(xhr.response);
      } else {
        onError(ERROR_MESSAGE);
      }
    });

    xhr.addEventListener('error', function (evt) {
      if (xhr.status === NETWORK_FAILURE_STATUS) {
        onError(NETWORK_FAILURE_MESSAGE);
        return;
      }

      onError(ERROR_MESSAGE);
      evt.preventDefault();
    });

    xhr.addEventListener('timeout', function () {
      onError(NETWORK_FAILURE_MESSAGE);
    });

    xhr.timeout = TIMEOUT_DELAY;


    switch (method) {
      case GET:
        xhr.open(method, url);
        xhr.send();
        break;
      case POST:
        xhr.open(method, url);
        xhr.send(data);
        break;

      default:
        onError(ERROR_MESSAGE);
    }
  };


  window.network = {
    request: request
  };
})();
