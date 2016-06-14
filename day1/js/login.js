

// Logging in 

var userID = '';
var userToken = '';
var baseURL = "https://fb.horizonsbootcamp.com/api/1.0";


$('#log-in-btn').click(function(evt){
	var email = $("#email-login").val();
	var pass = $("#pass-login").val();

	$('#registration-panel').css('display', 'none');

	$.ajax({
		method: "POST",
		url: baseURL + "/users/login",
		data : {
			email: email,
			password: pass
		},
		success: function(response){
			console.log(response),
			$('#newsfeed').css('display', 'inline-block'),
			userID = response.response.id,
<<<<<<< HEAD
			userToken = response.response.token,
			$("#email-login").val(''),
			$("#pass-login").val(''),
			$('#successful-msg').css('display', 'none'),
			loadPosts();
			// refreshFeed();
		},
		error: function(error) {
			alert("Please make sure all fields are complete and correct.")
			// throw error
		}
	});

});

function loadPosts() {
	$.ajax({
		method: "GET",
		url: baseURL + "/posts",
		data : {
			token: userToken,
		},
		success: function(response){
			console.log(response);
			var listofPosts = response.response;
			for (var i = 0; i < response.response.length; i++) {
			
				$('#post-anchor').append(renderPosts(response.response[i]));
			}
		},
		error: function(error) {
			alert("Please make sure all fields are complete and correct.");
			throw error
		}
	});
}


// function refreshFeed () {
// 	$('#post-anchor').load(document.URL +  '#post-anchor');
// }

		// 	userToken = response.response.token
		// 	$("#email-login").val(''),
		// 	$("#pass-login").val(''),
		// 	$('#successful-msg').css('display', 'none')
		// },
		// error: function(error) {
		// 	alert("Please make sure all fields are complete and correct."),
		// 	throw error
		// }
