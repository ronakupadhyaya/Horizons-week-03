"use strict";

var url = "https://fb.horizonsbootcamp.com/api/1.0";
var myToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFtYXJ0aTQwQHZpbGxhbm92YS5lZHUifQ.xj8JcydFTcKa7pf-tEvlVALGlxAZMTih4bQRAdG_ws0"
// Part I Registration
var register = function() {
	$.ajax(url + "/users/register", {
		method: "POST",
		data: {
			fname: $('#firstname').val(),
			lname:$('#lastname').val(),
			birthMonth:$('#bmonth').val(),
			birthDay:$('#bday').val(),
			birthYear:$('#byear').val(),
			email:$('#email').val(),
			password:$('#password').val()
		},
		success: function(data) {
			console.log("Successfully registered with The Facebook!");
		},
		error: function (err) {
			console.error("Error registering")
		}
	});
}

$('.reg').click(function(e){
	e.preventDefault();
	register();
});
// Part III  Getting Posts
var postData = [];
var getPosts = function() {
	postData = [];
	$.ajax(url + "/posts", {
		method: "GET",
		data: {
		 token: myToken
		},
	success: function(data) {
		console.log("Successfully retrieved posts");
		postData.push(data);
		postRender();
	},
	error: function(err) {
		console.error("Error getting posts");
	}
  });
}

// Part II Login
var login = function () {
	$.ajax(url + "/users/login", {
		method: "POST",
		data: {
			email:$('#loginmail').val(),
			password:$('#loginpass').val(),
		},
		success: function(data) {
			getPosts();
		},
		error: function (err) {
			console.error("Error logging in")
		}
	});
}

$('.login').click(function(e){
	e.preventDefault();
	login();
});

// Part III Rendering Posts
var postRender = function() {
	//debugger
	// Build wrappers
	var postContainer = $('<div class="post-container"></div>');
	for (var i=0; i<postData[0].response.length; i++) {
		var postWrapper = $('<div class="post" style="border: 1px solid black" id="postData[0].response[i]._id"></div>');
		var postHeader = $('<div class="post-head"></div>');
		var postBody = $('<div class="post-body text-justify"></div>');
		var postFooter = $('<div class="post-foot"></div>');

		postWrapper.append(postHeader);
		postWrapper.append(postBody);
		postWrapper.append(postFooter);
		postHeader.append($('<div class="text left"></div>').text(postData[0].response[i].poster.name+' -- '+postData[0].response[i].createdAt));
		postBody.append($('<p></p>').text(postData[0].response[i].content));
		if (postData[0].response[i].likes.length > 0) {
		postFooter.append($('<span class="likes"></span>').text(postData[0].response[i].likes.length+" people like this post"));
		};
		//work on comments later
		postContainer.append(postWrapper);
	}
	$('.newsAnchor').html(postContainer.html());
}

// Part III Making my own posts
var makePost = function() {
	$.ajax(url + "/posts", {
		method: "POST",
		data: {
		  token: myToken,
		  content: $('#newPost').val()
		},
		success: function(data) {
			console.log("Successfully made a post");
			$('#newPost').val("");
			getPosts();
		},
		error: function(err) {
			console.error("Error making post");
		}
	});
}

$('.add-post').click(function(e){
	e.preventDefault();
	if ($('#newPost').val()){
	makePost();
	}
});

//setInterval(getPosts, 30000);
// for (var i=0; i<100000; i++) {
// 	setInterval(function() {
// 		$('#newPost').val(i);
// 		makePost();
// 	}, 5000);
// }