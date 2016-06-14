"use strict";

window.facebook = window.facebook || {};

$(document).ready(function() {
 
	$('#sign').click(function (e) {
		event.preventDefault(); 
		console.log("signing up")
	    var email = $('#email').val();
	    var password = $('#password').val();
	    var fname = $('#fname').val();
	    var lname = $('#lname').val();
	    var birthMonth = $('#birthMonth').val();
	    var birthDay = $('#birthDay').val();
	    var birthYear = $('#birthYear').val();
	    // var email = "example@example.com";
	    // var password = "123mypassword";
	    // var fname = "Joost";
	    // var lname = "isthebest";
	    // var birthMonth = "03";
	    // var birthDay = "20";
	    // var birthYear = "92";

	    facebook.user.register(email, password, fname, lname, birthMonth, birthDay, birthYear);


	    // if (!title) {
	    //   alert('Please enter a title');
	    //   return;
	    // }
	  })

	  $('#logIn').click(function (e) {
		event.preventDefault(); 
		alert("log in");
		console.log("log in");
	    var email = $('#emailLog').val();
	    var password = $('#passwordLog').val();

		facebook.user.login(email, password);
		});
});




/*

email: The email of the registering user, used for later authentication. Must not be the email of an existing user.
password: The plaintext password of the registering user, used for later authentication. Don't worry, we've enforced strict HTTPS over the API and we hash and salt your password.
fname: The first name of the registering user.
lname: The last name of the registering user.
birthMonth: The month of the user's birthday (1-12).
birthDay: The day of the user's birthday (1-31).
birthYear: The year of the user's birthday (0-2016).



id: "575f08f40e9aa02e54783e35"
token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impvb3N0a0B3aGFydG9uLnVwZW5uLmVkdSJ9.um-SmujwoX1USFCSWkGyEjXEAJEdADucd8jm0fHt7qQ"


*/