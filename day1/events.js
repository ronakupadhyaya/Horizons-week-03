"use strict";

window.fb = window.fb || {};

var myToken = null;

fb.mountStatic = function() {

	$('#register').click(function(e) {
		e.preventDefault();
		$.ajax(fb.apiUrl + '/users/register', {
			method: "POST",
			data: {
				email: $('#email').val(),
				password: $('#password').val(),
				fname: $('#firstName').val(),
				lname: $('#lastName').val(),
				birthMonth: $('#birthMonth').val(),
				birthDay: $('#birthDay').val(),
				birthYear: $('#birthYear').val()
			},
			success: function () {
				console.log("created shit");
			},
			error: function () {
				console.error("fucked up");
			}
		})
	});

	$('#login').click(function(e) {
		e.preventDefault();
		$.ajax(fb.apiUrl + '/users/login', {
			method: "POST",
			data: {
				email: $('#userEmail').val(),
				password: $('#pwd').val(),	
			},
			success: function (e2) {
				console.log("logged that shit");
				$('#bigBooty').empty();
				myToken = e2.response.token;
				getPosts();
			},
			error: function (err) {
				console.error("fucked up loggs");
			}
		})
	});

}

var mountComment = function() {
$('.commBut').click(function(e){
		e.preventDefault();
		$.ajax(fb.apiUrl + '/posts/comments/' + this.attr(id), {
			method: "POST",
			data: {
				token: myToken,
				content: $('#post').val()
			},
			success: function (e2) {
				console.log("postNew stuff");
				var myPost = $('<div>' + $('#post').val() + '</div>')
				$('#bigBooty').empty();
				getPosts();
			},
			error: function (err) {
				console.error("why cant i post????");
			}
		})

	});
}

var mountPost = function() {
	$('#postBut').click(function(e){
		e.preventDefault();
		$.ajax(fb.apiUrl + '/posts', {
			method: "POST",
			data: {
				token: myToken,
				content: $('#post').val()
			},
			success: function (e2) {
				console.log("postNew stuff");
				var myPost = $('<div>' + $('#post').val() + '</div>')
				$('#bigBooty').empty();
				getPosts();
			},
			error: function (err) {
				console.error("why cant i post????");
			}
		})

	});
}

var getPosts = function() {
	$.ajax(fb.apiUrl + '/posts', {
		method:'GET',
		data: {
			token: myToken
		},
		success: function(obj) {
			for(var i = 0; i<obj.response.length; i++) {
				var post = $('<div class="posts">'+obj.response[i].content+'</div>' + '<div>'+obj.response[i].poster.name+'<button type="submit" id='+obj.response[i]._id+' class="likebut">Like</button><button type="submit" id='+obj.response[i]._id+' class="commBut">Comments</button></div>');
				$('#bigBooty').append(post);
			}
			var wrapper = $('<div></div>');
			var message = $('<input type="text" class="form-control" id="post">');
			var postBut = $('<button type="submit" id="postBut" class="btn btn-default">Post</button>');
			wrapper.append(message);
			wrapper.append(postBut);
			$('#bigBooty').append(wrapper);
			mount();
		},
		error: function(err2) {
			console.error('noooo didnt get array');
		}
	})
};


fb.mountStatic();