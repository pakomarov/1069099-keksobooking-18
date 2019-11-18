'use strict';


(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


  var readFile = function (file, callback) {
    var reader = new FileReader();

    var readerLoadHandler = function () {
      callback(reader.result);
    };

    reader.addEventListener('load', readerLoadHandler);

    reader.readAsDataURL(file);
  };


  var uploadFile = function (file, callback) {
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (fileType) {
        return fileName.endsWith(fileType);
      });

      if (matches) {
        readFile(file, callback);
      }
    }
  };


  var addUploadListener = function (fileChooserNode, callback) {
    var fileChooserChangeHandler = function () {
      uploadFile(fileChooserNode.files[0], callback);
    };

    fileChooserNode.addEventListener('change', fileChooserChangeHandler);
  };


  window.upload = {
    addUploadListener: addUploadListener
  };
})();
