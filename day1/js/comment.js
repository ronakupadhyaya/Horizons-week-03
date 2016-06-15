


// add comments 
// having issues retrieving value of input
/*
$('#load-comment-btn').click(function(evt){
	var postId = $(evt.target).attr('postId');
	var input = $('#comment-'+postId).val();

	$.ajax({
		method: "POST",
		url: baseURL + "/posts/comments/:" + postId,
		data : {
			token: userToken,
			content: input
		},
		success: function(response){
			console.log(response),
			$('#comment-'+postId).val('')
		},
		error: function(error) {
			alert("Please make sure all fields are complete and correct.")
		}
	})
}); */


// add likes

console.log(document.getElementsByClassName('btn'));
var allButtons = document.getElementsByClassName('btn');
for (var i = 0; i < allButtons.length; i++) {
	$(allButtons[i]).click(function(evt){
	console.log("TESTINGs");
	var postId = $(evt.target).attr('postId');
	debugger;

	$.ajax({
		method: "POST",
		url: baseURL + "/posts/likes/:" + postId,
		data : {
			token: userToken,
		},
		success: function(response){
			console.log(response)
		},
		error: function(error) {
			console.log(error)
		}
	});
});
} 

/*
$('.btn').click(function(evt){
	console.log("TESTINGs");
	var postId = $(evt.target).attr('postId');
	debugger;

	$.ajax({
		method: "POST",
		url: baseURL + "/posts/likes/:" + postId,
		data : {
			token: userToken,
		},
		success: function(response){
			console.log(response)
		},
		error: function(error) {
			console.log(error)
		}
	});
}); */
