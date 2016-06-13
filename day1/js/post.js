

// allows user to create new posts !
// ask about scoping/global var to get token


$('#post-btn').click(function(evt){
	var input = $('#new-post-input').val();

	$.ajax({
		method: "POST",
		url: baseURL + "/posts",
		data : {
			token: userToken,
			content: input
		},
		success: function(response){
			console.log(response),
		},
		error: function(error) {
			alert("Please make sure all fields are complete and correct."),
			throw error
		}
	});

});

function renderPosts() {
	var wrapper = $('<div id ="new-post-outer"></div>');
}