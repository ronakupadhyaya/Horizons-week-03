"use strict"
window.fb = window.fb || {};

var fbURL = "https://fb.horizonsbootcamp.com/api/1.0";
var userId;
var token;

$('#register').click(function(e) {
	e.preventDefault();
	$('#myModal').modal('toggle');
});

$('#newRegister').click(function(e) {
	e.preventDefault();
	fb.register();
})

$('#logIn').click(function(e) {
	e.preventDefault();
	fb.logIn();
});

$('#addPost').click(function(e) {
	e.preventDefault();
	//fb.addPost();
})

fb.register = function() {
	if(!$('#firstName').val() || !$('#lastName').val() || !$('#birthDate').val() || !$('#email').val() || !$('#password').val()) {
		alert("Please fill out all 5 fields to register");
		return;
	}
	var firstName = $('#firstName').val();
	var lastName = $('#lastName').val();
	var birthDate = $('#birthDate').val();
	var birthMonth = parseInt(birthDate[0] + birthDate[1]);
	var birthDay = parseInt(birthDate[3] + birthDate[4]);
	var birthYear = parseInt(birthDate[6] + birthDate[7] + birthDate[8] + birthDate[9]);
	var email = $('#email').val();
	var password = $('#password').val();
	$('#firstName').val("");
	$('#lastName').val("");
	$('#birthDate').val("");
	$('#email').val("");
	$('#password').val("");
	$.ajax(fbURL + "/users/register", {
		data: {
			fname: firstName,
			lname: lastName,
			email: email,
			password: password,
			birthMonth: birthMonth,
			birthDay: birthDay,
			birthYear: birthYear
		},
		method: "POST",
		success: function(response) {
			console.log(response);
			$('#myModal').modal('toggle');
			alert("You are registered! Try logging in.")
		},
		error: function(reponse) {
			console.log(response);
			$('#myModal').modal('toggle');
		}
	})
}

fb.logIn = function() {
	// TODO: send data to server, collect token from response
	if(!$('#loginEmail').val() || !$('#loginPass').val()) {
		alert("Please provide your email and password");
		return;
	}
	var email = $('#loginEmail').val();
	var password = $('#loginPass').val();
	$('#loginEmail').val("");
	$('#loginPass').val("");
	$.ajax(fbURL + "/users/login", {
		data: {
			email: email,
			password: password
		},
		method: "POST",
		success: function(obj) {
			userId = obj.response.id;
			token = obj.response.token;
			alert("Log In successful!");
			var feed = new fb.NewsFeed(userId);
			feed.getPosts(token);
		},
		error: function(reponse) {
			console.log(response);
		}
	})
};


fb.Post = function(id, content, timePosted, posterId, posterName, comments, likes) {
	this.id = id;
	this.content = content;
	this.timePosted = timePosted;
	this.posterId = posterId;
	this.posterName = posterName;
	this.comments = comments;
	this.likes = likes;
}

fb.Post.prototype = {
	addUserPost: function() {
		console.log("addPost");
		if(!$('#newPost').val()) {
			alert("Cannot post empty status to feed");
			return;
		}
		$('#newPost').val("");
	},
	getPosts: function(token) {
		$.ajax(fbURL + "/posts/1", {
			data: {
				token: token
			},
			method: "GET",
			success: function(obj) {
				console.log(obj);
				for(var i = 0; i < obj.response.length; i++) {
					var postId = obj.response.id;
					var postContent = obj.response.content;
					var postedAt = obj.response.createdAt;
					var posterId = obj.response.poster.id;
					var posterName = obj.response.poster.name;
					var commentsArr = obj.response.comments;
					var likesArr = obj.respone.likes;
					thisPost = new fb.Post(postId, postContent, postedAt, posterId, posterName, commentsArr, likesArr);
					this.posts.push(thisPost);
					this.renderPosts();
				}
			},
			error: function(response) {
				console.log(response);
			}
		})
	},
}

fb.NewsFeed = function(userId) {
	this.userId = userId;
	this.posts = [];
}

fb.NewsFeed.prototype = {
	renderPosts: function() {
		for (var i = 0; i < this.posts.length; i++) {
			
		}
	}
}











