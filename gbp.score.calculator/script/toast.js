Toast = {};
Toast.error = {};

Toast.error.show = function(msg) {
  $('#ErrorMsg').fadeIn(500);
  $('#ErrorMsg').html(msg);
  location.href = '#ErrorMsg';
}

Toast.error.dismiss = function() {
  $('#ErrorMsg').fadeOut(500);
}