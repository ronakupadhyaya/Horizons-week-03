"use strict";

window.fb = window.fb || {};

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
				getPosts(e2);
			},
			error: function (err) {
				console.error("fucked up loggs");
			}
		})
	});

}

var getPosts = function(obj) {
	$.ajax(fb.apiUrl + '/posts', {
		method:'GET',
		data: {
			token: obj.response.token
		},
		success: function(obj) {
			console.log('hell yeaa got back array');
			for(var i = 0; i<obj.response.length; i++) {
				console.log(obj.response[i]);
				var post = $('<div>'+obj.response[i].content+'</div>' + '<div>'+obj.response[i].poster.name+'</div>');
				$('#bigBooty').append(post);
			}
			var wrapper = $('<div></div>');
			var message = $('<input type="text" class="form-control" id="post">');
			var postBut = $('<button type="submit" id="post" class="btn btn-default">Post</button>');
			wrapper.append(message);
			wrapper.append(postBut);
			$('#bigBooty').append(wrapper);
		},
		error: function(err2) {
			console.error('noooo didnt get array');
		}
	})
};


fb.mountStatic();