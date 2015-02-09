// Put event listeners into place
$.noConflict();
jQuery(document).ready(function($){

  // Grab elements, create settings, etc.
  var canvas = $("#canvas")[0],
    context = canvas.getContext("2d"),
    video = $("#video")[0],
    videoObj = { "video": true },
    errBack = function(error) {
      console.log("Video capture error: ", error.code);
    };

  function createObjectURL ( file ) {
    if ( window.webkitURL ) {
        return window.webkitURL.createObjectURL( file );
    } else if ( window.URL && window.URL.createObjectURL ) {
        return window.URL.createObjectURL( file );
    } else {
        return file;
    }
  }
  // Put video listeners into place
  if (Modernizr.getusermedia){
    var gUM = Modernizr.prefixed('getUserMedia', navigator);
    gUM(videoObj, function(stream){
      video.src = createObjectURL(stream);
      video.play();
    }, errBack);
  }

  $("#snap").on("click", function() {
    context.drawImage(video, 0, 0, 640, 480);
  });
});
