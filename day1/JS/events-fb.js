"use strict";

window.fb = window.fb || {};

var token; 
var newUsers = []; 

fb.userEvents = function() {
	$('#signup').click(function(e){
  		$('#registration-form').show();
		$('#login-form').hide();
  	});
  $('#submit1').click(function(e) {
  	var user = new fb.User($('#inputEmail').val(), $('#inputPassword').val(), $('#fname').val(), $('#lname').val(), $('#birthMonth').val(), $('#birthDay').val(), $('#birthYear').val());
  	user.createUser(); 
  }); 
  $('#login').click(function(e){
  	$('#registration-form').hide();
	$('#login-form').show();
  }); 
  $('#submitLogin').click(function(e){
  	var user = new fb.User($("#loginEmail").val(), $('#loginPW').val()); 
  	user.userLogin(); 
  	$('#login-form').hide();
  	$('.newsfeed').show();
  	$('#postForm').show();
  })
	
  $("#submitPost").click(function(e){
		var post = new fb.renderNewsfeed($(".newsfeedPost").val());
		post.updateNewsfeed();
	})
   

	};

fb.userEvents(); 

fb.renderNewsfeed(); 

