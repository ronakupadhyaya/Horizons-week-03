window.fbHandlers = window.fbHandlers || {};

fbHandlers.mountStatic = function() {

	// Register
	$("#register").click(function(e) {
		e.preventDefault(); //prevents button from refreshing
		var newRegistration = new facebook.Registration();
		newRegistration.sendRegistration();
		newRegistration.clearField($('#email'));
		newRegistration.clearField($('#password'));
		newRegistration.clearField($('#fname'));
		newRegistration.clearField($('#lname'));
		newRegistration.clearField($('#MM'));
		newRegistration.clearField($('#DD'));
		newRegistration.clearField($('#year'));
	});
	// Log In
	$("#login").click(function(e) {
		e.preventDefault();
		var newLogin = new facebook.Login();
		newLogin.loggedIn();
		newLogin.clearField($('#user'));
		newLogin.clearField($('#pw'));
		

	});

}

fbHandlers.mount = function() {

}


      fbHandlers.mountStatic();
   