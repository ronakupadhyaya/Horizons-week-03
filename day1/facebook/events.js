"use strict";

window.fb = window.fb || {};

fb.userToken = null;
fb.userId = null;

fb.mountStart = function() {

	//modal
	$("#registerBtn").click(function(e){
		//data from fields
		//debugger;
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

	$('.modal-body').on('keypress', function(e){
		fb.hitEnter(e,$('#registerBtn'),'click')
	})

	$('#createAccount').on("shown.bs.modal",function(e){
		$('#fname.inputBox').focus();
	})


	//login
	$('#loginBtn').click(function(e){
		$.ajax(fb.baseUrl+"/users/login", {
			method: "POST",
      		data: {
		        email: $('.inputBox.email.loginInput').val(),
				password: $('.inputBox.password.loginInput').val()
		      },
	    	success: function(data){
	    		fb.userId = data.response.id;
	    		fb.userToken = data.response.token;
	    		$('.login').hide();
	    		$('.wall').show();
	    		fb.getPosts();
	    	}
	    });
	})

	$('.login-form').on('keypress', function(e){
		fb.hitEnter(e,$('#loginBtn'),'click');
	});

	


}

fb.hitEnter=function(e, inputBox, effect) {
  
  if(e.keyCode == 13){
    
    console.log("hit enter")
      $(inputBox).trigger(effect);
    }
}

fb.mountPage = function(html){
	$('.viewWall').empty();
	$('.viewWall').append(html);

	//post
	$('#myPost').click(function(e){
		console.log("post")
		$.ajax(fb.baseUrl+"/posts", {
			method: "POST",
      		data: {
      			token: fb.userToken,
      			content: $('#createPost').val()
      		},
      		success: function(){
      			fb.getPosts();
      		}
		})
	})

	// // $('#createPost').on('keypress', function(e){
	// // 	fb.hitEnter(e,$('#myPost'),'click');
	// });

	$('#updateWall').click(function(e){
		fb.getPosts();
	})
}


