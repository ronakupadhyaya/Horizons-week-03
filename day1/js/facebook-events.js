window.facebook = window.facebook || {};

facebook.mountStatic = function() {
$('#loginSubmit').click(function(e) {
    var email = $('#exampleInputEmail1').val();
    // validate email input
    if (!email) {
      alert("Please enter email");
      return;
    }
    console.log("success");
  });
}
