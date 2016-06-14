

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
<<<<<<< HEAD
<<<<<<< HEAD
			$('#new-post-input').val('');
		},
		error: function(error) {
			alert("Please make sure all fields are complete and correct.")
			// throw error
=======
=======
>>>>>>> master
		},
		error: function(error) {
			alert("Please make sure all fields are complete and correct."),
			throw error
<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> master
		}
	});

});

<<<<<<< HEAD
<<<<<<< HEAD


function renderPosts(post) {

	var wrapper = $('<br><div class="panel panel-default"></div>');
	var name = $('<div class="panel-heading"><h5 class="panel-title">'+post.poster.name+'</h5></div>');
	var text = $('<div class="panel-body" id ="post-name"><p>'+post.content+'</p></div>');
	var buttonwrapper = $('<div id ="btn-wrapper"></div>');
	var commentBtn = $('<button type="button" class="btn btn-default" id = "load-comment-btn" postId="'+post._id+'">\
					<i class="fa fa-comment" aria-hidden="true"></i>  Comment</button>');
	var likeBtn = $('<button type="button" class="btn btn-default like-post-btn" id="like-post-btn" postId="'+post._id+'">\
					<i class="fa fa-thumbs-up" aria-hidden="true"></i></button>');
	var commentBox = $('<div class="panel-footer"></div>');
	var commentwrapper = $('<div></div>');
	var commentInput = $('<form class="post-comments">\
						<input class="comment" type="text" id = "comment'+post._id+'"\
						 placeholder="Enter Comment..."></form>');
	var likes = $('<div id = "likes"><i class="fa fa-thumbs-o-up" aria-hidden="true">'+post.likes.length+' likes.</i></div>');

	buttonwrapper.append(likes);
	buttonwrapper.append(commentBtn);
	buttonwrapper.append(likeBtn);
	wrapper.append(name);
	wrapper.append(text);
	// wrapper.append(likes);
	wrapper.append(buttonwrapper);

	if (post.comments.length > 0){
		console.log(post.comment);
		for (var i = 0; i<post.comments.length; i++) {
			commentwrapper.append(renderComments(post.comments[i]));
		};
	}

	commentBox.append(commentwrapper);
	commentBox.append(commentInput);
	wrapper.append(commentBox);

	return wrapper;
};


function renderComments(comment) {
	var comment = $('<div><div id = "comment-and-name">\
					<p id = "commenter-name"><strong>'+comment.poster.name+'</strong></p><p id="actual-comment">'
					+comment.content+'</p></div>');
	return comment;
}

// var posts = $('<div></div>');
// var listofPosts;

// get post lists







=======
function renderPosts() {
	var wrapper = $('<div id ="new-post-outer"></div>');
}
>>>>>>> master
=======
function renderPosts() {
	var wrapper = $('<div id ="new-post-outer"></div>');
}
>>>>>>> master
