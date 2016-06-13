window.fbHandlers = window.fbHandlers || {};

fbHandlers.mountStatic = function() {

	// Register
	$("#register").click(function(e) {
		e.preventDefault();
		var newRegistration = new facebook.Registration();
		newRegistration.sendRegistration();
		newRegistration.clearField($('#email'));
		newRegistration.clearField($('#password'));
		newRegistration.clearField($('#fname'));
		newRegistration.clearField($('#fname'));
	});
	// Post Message

}


      fbHandlers.mountStatic();
   