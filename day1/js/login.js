

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
			userToken = response.response.token
			$("#email-login").val(''),
			$("#pass-login").val(''),
			$('#successful-msg').css('display', 'none')
		},
		error: function(error) {
			alert("Please make sure all fields are complete and correct."),
			throw error
		}
	});

});