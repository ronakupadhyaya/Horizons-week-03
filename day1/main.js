var token;

$(window).on("load", function(){
	$('#enter-form').css('display', 'none');
	$('#feed').css('background-color', '#E9EBEE');
})

//sign up
$('#fSignup').on('click', function(evt) {
	evt.preventDefault();

	if($('#fFirstname').val() === "" || $('#fLastname').val() === "" ||
		$('#fEmail').val() === "" || $('#fPass').val() === ""
		|| $('#fMonth').val() === "" || $('#fDay').val() === ""
		|| $('#fYear').val() === "") {
		throw "Please enter all your login information";
	}

	$.ajax("https://fb.horizonsbootcamp.com/api/1.0/users/register", {
		method: "POST",
			data: {
				email: $('#fEmail').val(),
				password: $('#fPass').val(),
				fname:$('#fFirstname').val(),
				lname: $('#fLastname').val(),
				birthMonth: $('#fMonth').val(),
				birthDay: $('#fDay').val(),
				birthYear: $('#fYear').val()
			},
		success: function(response) {
			console.log("You have successfully registered.");
			$('#signupForm input').val("");
			$('#fSignup').val("Sign Up");
			$("#fEmailLog").focus();
		}.bind(this),
		error: function(err) {
			console.error(err);
		}
	});
});

//log in
$('#fLogin').on('click', function(evt) {
	evt.preventDefault();

	if($('#fEmailLog').val() === "" || $('#fPassLog').val() === "") {
		throw "Please enter all your login information"
	}	

	$.ajax("https://fb.horizonsbootcamp.com/api/1.0/users/login", {
		method: "POST",
			data: {
				email: $('#fEmailLog').val(),
				password: $('#fPassLog').val(),
			},
		success: function(response) {
			$('#loginForm').remove();
			$('#signupForm').remove();
			$('#enter-form').css('display', 'block');
			$('#feed').css('background-color', 'white');
			$('.logo').css('margin', '0 auto');
			$('.logo').css('display', 'block');
			$('#wrapper').remove();
			token = response.response.token;
			getPosts();
			// autoRefresh();
		}.bind(this),
		error: function(err) {
			console.error(err);
		}
	});
});

//post status
$('#postStatus').on('click', function(evt) {
	evt.preventDefault();

	$.ajax("https://fb.horizonsbootcamp.com/api/1.0/posts", {
		method: "POST",
			data: {
				content: $('#statusContent').val(),
				token: token
			},
		success: function(response) {
			console.log("posted successfully");
			$('#statusContent').val("");
		}.bind(this),
		error: function(err) {
			console.error(err);
		}
	});
});


//get post
var getPosts = function() {
	$.ajax("https://fb.horizonsbootcamp.com/api/1.0/posts", {
		method: "GET",
			data: {
				token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im11bGxpbnNqdWxpYW5AZ21haWwuY29tIn0.kPwDjGYfRQ1xlUHwgQl3OlYQP5YbJqgGCN3-6P2y62Y"
			},
		success: function(response) {
			for(var i=0; i<response.response.length; i++) {
				$('#feed').prepend('<div class="posts"> \
				<span class="posts-header"> \
				<h3 class="name">'+response.response[i].poster.name+'</h3> \
				<p class="date">'+response.response[i].createdAt+'</p> \
				</span> \
				<p class="content">'+response.response[i].content+'</p> \
				<input placeholder="Enter your comment..." type="text"> </input> \
				</div>');
			}

		}.bind(this),
		error: function(err) {
			console.error(err);
		}
	});
}

// var autoRefresh = function() {
// 	setInterval( function() {
// 		getPosts();
	
// 	}, 2000)
// }