$('#hell').click(function(e) {
	email = $('#InputEmail').val();
	password = $('#InputPassword').val();
	first = $('#InputFirst').val();
	last = $('#InputLast').val();
	birthMonh = $('#InputBirthMonth').val();
	birthDay = $('#InputBirthDay').val();
	birthYear = $('#InputBirthYear').val();
	register(email, password, first, last, birthMonth, birthDay, birthYear)
	}
)
function listen() {
$('#liking').click(function(e) {
	var postID = $(this).attr("data-post");
	likeMe(postID);
	}
)
}

var userID = null;
var token = null;

var myID = "575ed16a29da2c672a723d6d";
var myToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhlbGxvQGdtYWlsLmNvbSJ9.r7t7x-0R0gcvI-9rHNeyRRIhhFtHFXF7Ojmyej4Ucuk";

var email = null;
var password = null;
var first = null;
var last = null;
var birthMonh = null;
var birthDay = null;
var birthYear = null;



function register(email, password, first, last, birthMonth, birthDay, birthYear) {
	$.ajax('https://fb.horizonsbootcamp.com/api/1.0/users/register', {
		method: 'POST',
		data: {
			email: email,
			password: password,
			fname: first, 
			lname: last,
			birthMonth: birthMonth,
			birthDay: birthDay,
			birthYear: birthYear		
		},
		success: function(response) {
			console.log(response);
			login(email, password);

		},
		error: function(response) {
			console.error(response);
		}

	});
}

function login(email, password) {
	$.ajax('https://fb.horizonsbootcamp.com/api/1.0/users/login', {
		method: 'POST',
		data: {
			email: email,
			password: password		
		},
		success: function(response) {
            console.log(response);
            userID = response.response.id;
           	token = response.response.token;
           	get10posts();
		},
		error: function(response) {
			console.err(response);
		}

	})
}

$('#post-btn').click(function(e){
	var mypost = $('.posting').val()
	// $('.news').prepend(renderPost(mypost))
	postMe(mypost);
	$('.posting').val('');
})

var onepost = null;


// function renderPost(mypost) {

// 	var postModule = $('<div class = "post-module"></div>')
// 	var actPost = $('<div class = "old-post"> <p>' + mypost + '</p> </div>')
// 	var postfooter = $('<div class = "post-footer">' +
// 										'<div class = "like">' +
// 											'<button type="button" class="btn btn-primary" id="like">Like</button>' +
// 										'</div>' +
// 										'<div comment = "comment">' +
// 											'<button type="button" class="btn btn-primary" id="comment">Comment</button>' +
// 										'</div>' +
// 									'</div>')

// 	postModule.append(actPost);
// 	postModule.append(postfooter);
// 	return postModule
// }


function get10posts() {
	$.ajax('https://fb.horizonsbootcamp.com/api/1.0/posts', {
		method: "GET",
		data: {
			token: myToken
		},
		success: function(response) {
			for (var i = 0; i < response.response.length; i++) {
				onepost = response.response[i].content;
				name = response.response[i].poster.name;
				postID = response.response[i]._id;
				likes = response.response[i].likes.length;
				renderedComments = renderComments(response.response[i].comments, likes);
				$('.news').append(renderOtherPosts(renderedComments, onepost, name, postID, likes));
			}
			setEvent();
			listen();
		},
		error: function(response) {
			console.err(response);
		}

	})
}

function renderOtherPosts(renderedComments, onepost, name, postID, likes) {
	var postModule = $('<div class = "post-module"></div>')
	var namelist = $('<div class = "poster-name">' + name + '</div>')
	var actPost = $('<div class = "old-post"> <p>' + onepost + '</p> </div>')
	var postfooter = $('<div class = "post-footer">' +
										'<div class = "like">' +
											'<button type="button" class="btn btn-primary" id="liking" data-post="' + postID  + '">Like</button>' + likes + 
										'</div>' +
										'<div class = "comment">' +
											'<button type="button" class="btn btn-primary"  data-toggle="collapse" data-target="#comCollapse' + postID +'" id="lacomment" data-post="' + postID  + '"">Comment</button>' +
											'<input class="collapse easy" id="comCollapse' + postID +'"  data-post="' + postID  + '">' +
										'</input>' +
										'</div>' +
									'</div>')
	postfooter.append(renderedComments);
	postModule.append(namelist);
	postModule.append(actPost);
	postModule.append(postfooter);
	return postModule;
}

function postMe (mypost) {
	$.ajax('https://fb.horizonsbootcamp.com/api/1.0/posts', {
		method: "POST",
		data: {
			token: myToken,
			content: mypost,
		},
		success: function(response) {
			console.log(response);
			reRender();
		},
		error: function(response) {
			console.err(response);
		}

	})

}

function reRender () {
	$('.news').empty();
	$('.news').append(get10posts());
}


// $('#comment').click(function(e){
// 	var mycomment = $('#comCollapse').val();
// 	$('post-footer').append(mycomment);
// 	// $('.news').prepend(renderPost(mypost))
// 	$('#comCollapse').val('');
// })


function setEvent() {
$('.easy').keyup(function (e) {
	var postID = $(this).attr("data-post");
    if (($('#comCollapse' + postID).val() != "") && (e.keyCode === 13)) {
      var mycomment = $('#comCollapse' + postID).val();
      postComment(postID, mycomment);
      reRender();
    }
 });
}

var posterName = null;
var commentContent = null;

function renderComments(comments) {
	var rendered = $('<div></div>');
			for (var i = 0; i < comments.length; i++) {
				posterName = comments[i].poster.name;
				commentContent = comments[i].content;
				rendered.append(renderCom(posterName, commentContent));
			}
	return rendered.html();
}


function postComment(postID, mycomment) {
	$.ajax('https://fb.horizonsbootcamp.com/api/1.0/posts/comments/' + postID, {
		method: "POST",
		data: {
			token: myToken,
			content: mycomment
		},
		success: function(response) {
			console.log(response);
			$('#comCollapse').val("");
		},
		error: function(response) {
			console.error(response);
		}

	})

}

function renderCom(posterName, commentContent) {
	return '<div class = "commentPoster">' + posterName + ' commented: <div class = "normal"> '  + commentContent + '</div> </div>';
}


function likeMe (postID) {
	$.ajax('https://fb.horizonsbootcamp.com/api/1.0/posts/likes/' + postID, {
		method: "GET",
		data: {
			token: myToken,
		},
		success: function(response) {
			console.log(response);
			reRender();
		},
		error: function(response) {
			console.err(response);
		}

	})

}