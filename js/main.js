// Put event listeners into place
$.noConflict();
jQuery(document).ready(function($){

  // Grab elements, create settings, etc.
  var videoObj = { "video": true },
    errBack = function(error) {
      console.log("Video capture error: ", error.code);
    };

  var getUserMedia = function(t, onsuccess, onerror) {
    if (navigator.getUserMedia) {
      return navigator.getUserMedia(t, onsuccess, onerror);
    } else if (navigator.webkitGetUserMedia) {
      return navigator.webkitGetUserMedia(t, onsuccess, onerror);
    } else if (navigator.mozGetUserMedia) {
      return navigator.mozGetUserMedia(t, onsuccess, onerror);
    } else if (navigator.msGetUserMedia) {
      return navigator.msGetUserMedia(t, onsuccess, onerror);
    } else {
      onerror(new Error("No getUserMedia implementation found."));
    }
  };

  var URL = window.URL || window.webkitURL;
  var createObjectURL = URL.createObjectURL || webkitURL.createObjectURL;
  if (!createObjectURL) {
    throw new Error("URL.createObjectURL not found.");
  }
  // Put video listeners into place
  getUserMedia({'video': true},
    function(stream) {
      var url = createObjectURL(stream);
      $(".video").each(function(){
        $(this).attr('src',url);
      });
    },
    function(error) {
      alert("Couldn't access webcam.");
    }
  );
});
