"use strict";

window.fb = window.fb || {};

fb.mountPage = function(accountDatabase) {

	$("#registerBtn").click(function(e){
		//data from fields
		debugger;
		console.log("just starting")
		var fname = $('#fname.inputBox').val();
		var lname = $('#lname.inputBox').val();
		var email = $('#email.inputBox').val();
		var password = $('#password.inputBox').val();
		var passwordConfirm = $('#passwordConfirm.inputBox').val();
		var birthday = $('#birthday.inputBox').val();
		console.log("about to register")
		var account = new fb.Account(fname,lname,email,password,passwordConfirm,birthday);
		console.log("registering")
		$('#createAccount').hide();

	})

	$('#createAccount').on("shown.bs.modal",function(e){
		$('#fname.inputBox').focus();
	})

}

