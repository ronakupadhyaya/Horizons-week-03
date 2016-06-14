// api urls
var apiUrl = 'https://fb.horizonsbootcamp.com/api/1.0';
var loginUrl = '/users/login';
var signupUrl = '/users/register'

// this will hold instance of user (fb.User()) uppon successfull log in
var user;

// track posts page number
var postsPageNumber = 1;

// this function runs once html is loaded
$(function() {

	// set up login button
	$('#login-button').on('click', function() {
		user = new fb.User();
		user.authenticate('login');
	});

	// associate enter keypress with login button click
	$('#login-modal').on('keydown', function(evt) {
		if(evt.keyCode === 13) {
			$('#login-button').trigger('click');
		};
	});

	// hide login error inside login modal
	$('#login-error-msg').hide();

	// set up sign up button
	$('#signup-button').on('click', function() {
		page.resetSignupFormLabels();
		fb.signup();
	});

	// associate enter keypress with signup button click
	$('#signup-modal').on('keydown', function(evt) {
		if(evt.keyCode === 13) {
			$('#signup-button').trigger('click');
		};
	});

	// hide signup error inside signup modal
	$('#signup-error-msg').hide();

	// load more posts once page scroll reaches bottom
	$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() == $(document).height()) {
			postsPageNumber++;
   			fb.getPosts(user.token, postsPageNumber);
   		}
	});
});


// facebook data handling =====================================================
window.fb = window.fb || {};

// User class properties
fb.User = function() {
	this.id = null;
	this.token = null;
	this.fname = null;
	this.lname = null;
};

// User class functions
fb.User.prototype = {

	// this authenticates user and sets its id and token properties
	authenticate: function(operation) {
		
		var data = null;

		switch(operation) {
			case 'login':
				data = {email: $('#li-email').val(), password: $('#li-password').val()};
				break;
			case 'signup':
				data = {email: $('#su-email').val(), password: $('#su-password').val()};
				break;
		}

		$.ajax(apiUrl+loginUrl, {
			method: 'POST',
			data,
			success: function(response) {
				var jsonResp = response.response;
				this.id = jsonResp.id;
				this.token = jsonResp.token;
				this.fname = jsonResp.user.fname;
				this.lname = jsonResp.user.lname;
				page.successfulLogin();
				fb.getPosts(this.token, postsPageNumber);
			}.bind(this),
			error: function(response) {	
				// show loging error message inside login modal
				$('#login-error-msg').html('Invalid e-mail and (or) password.');
				$('#login-error-msg').show();
			}
		});
	},

	// check if user has liked a post
	hasLiked: function(fbPost) {
		var like = false;
		if(fbPost.likes.length > 0) {
			for(i=0; i<fbPost.likes.length; i++) {
				if(fbPost.likes[i].id === this.id) {
					like = true;
				}
			}
		}
		return like;
	}
}

// registers a new user
fb.signup = function() {

	// grab values from html
	var fname = $('#su-fname').val();
	var lname = $('#su-lname').val();
	var email = $('#su-email').val();
	var password = $('#su-password').val();
	var bdate = $('#su-bdate').val();

	// define birthdate variables (day, month, and year)
	var bArr = bdate.replace(/ /g,'').split('-');
	var bMonth = bArr[0];
	var bDay = bArr[1];
	var bYear = bArr[2];

	// prepare ajax data
	data = {
		email: email,
		password: password,
		fname: fname,
		lname: lname,
		birthMonth: bMonth,
		birthDay: bDay,
		birthYear: bYear
	};

	// if signup fields are validadte, send signup request
	if(fb.signupValidation()) {
		$.ajax(apiUrl+signupUrl, {
			method: 'POST',
			data: data,
			success: function(response) {
				user = new fb.User();
				user.authenticate('signup');
				// to be implemented
				// fb.welcomeMessage();
			},
			error: function(response) {
				var jsonResp = response.responseJSON;
				if(jsonResp.error === 'User already registered with email.') {
					$('#su-email-label').html('Email: (email already registered)');
					$('#su-email-label').css('color', 'red');
				}
				$('#signup-error-msg').html('Registration has failed.');
				$('#signup-error-msg').show();
			}
		});
	}
};

// validates signup input fields
fb.signupValidation = function() {

	var fname = $('#su-fname').val();
	var lname = $('#su-lname').val();
	var email = $('#su-email').val();
	var password = $('#su-password').val();
	var bdate = $('#su-bdate').val();

	var fnameFlag = true;
	var lnameFlag = true;
	var emailFlag = true;
	var passwordFlag = true;
	var bdateFlag = true;

	// check if fname is empty
	if(!$('#su-fname').val()) {
		$('#su-fname-label').html('First Name: (enter your first name)');
		$('#su-fname-label').css('color', 'red');
		fnameFlag = false;
	}

	// check if lname is empty
	if(!$('#su-lname').val()) {
		$('#su-lname-label').html('Last Name: (enter your last name)');
		$('#su-lname-label').css('color', 'red');
		lnameFlag = false;
	}

	// check if email is empty
	if(!$('#su-email').val()) {
		$('#su-email-label').html('Email: (enter your email)');
		$('#su-email-label').css('color', 'red');
		emailFlag = false;
	}

	// check if password is empty
	if(!$('#su-password').val()) {
		$('#su-password-label').html('Password: (enter a password)');
		$('#su-password-label').css('color', 'red');
		passwordFlag = false;
	}

	// check if birthdate is empty
	if(!$('#su-bdate').val().replace(/ /g,'')) {
		$('#su-bdate-label').html('Birthdate: (enter your birthdate)');
		$('#su-bdate-label').css('color', 'red');
		bdateFlag = false;
	}

	// check if birthdate format is correct
	if(bdateFlag) {
		var bdateArr = $('#su-bdate').val().replace(/ /g,'').split('-');
		if(bdateArr.length !== 3) {
			$('#su-bdate-label').html('Error on birthdate format.');
			$('#su-bdate-label').css('color', 'red');
			bdateFlag = false;
		}
	}

	var passedValidation = false;

	if(fnameFlag && lnameFlag && emailFlag && passwordFlag && bdateFlag) {
		passedValidation = true;
	}

	return passedValidation;
};

// get posts from API and renders them to page using page.renderPosts()
fb.getPosts = function(token, pageNum) {
	$.ajax(apiUrl+'/posts/'+pageNum, {
		method: 'GET',
		data: {token: token},
		success: function(response) {

			var fbPosts = response.response;
			page.renderPosts(fbPosts);
		},
		error: function(response) {
		}
	})
}

// post comment to a post
fb.postComment = function(postId, content) {
	$.ajax(apiUrl+'/posts/comments/'+postId, {
		method: 'POST',
		data: {content: content,
			token: user.token},
		success: function() {
			console.log('fb.postComment(): SUCCESS');
			var currentDate = new Date();
			var newComment = page.renderComment(content,user.fname+' '+user.lname,currentDate.toString());
			$('#likescount'+postId).parent().find('table').before(newComment);
		},
		error: function() {
			console.log('fb.postComment(): ERROR');
		}
	})
}

// send new post
fb.sendNewPost = function(content) {
	$.ajax(apiUrl+'/posts', {
		method: 'POST',
		data: {content: content, token: user.token},
		success: function(response) {
			console.log('fb.sendNewPost: SUCCESS');
			console.log(response.response);
			var id = response.response._id;
			var createdAt = response.response.createdAt;
			var pseudopost = page.renderOnePseudoPost(content, id, createdAt);
			var container = $('#posts-container');
			container.prepend(pseudopost);
		},
		error: function() {
			console.log('fb.sendNewPost: ERROR');
		}
	});
}
// ============================================================================



// page rendering =============================================================
window.page = window.page || {};

page.successfulLogin = function() {
	$('#login-link').hide();
	$('#signup-link').hide();
	page.closeAllModals();
	page.loadNewPostInput();
}

page.loadNewPostInput = function() {
	var inputBox = $('<div class="panel panel-default">'+
						'<div class="panel-heading">'+
							'<span class="post-user">New Post</span>'+
						'</div>'+
						'<div class="panel-body">'+
							'<div class="post-content">'+
								'<div class="form-group">'+
									'<textarea class="form-control" rows="3" id="comment" placeholder="What is on your mind?"></textarea>'+
								'</div>'+
							'</div>'+
							'<div class="new-post-button-area">'+
								'<button type="button" class="btn btn-default" style="float:right;">Post</button>'+
							'</div>'+
						'</div>'+
					'</div>');
	$('#new-post-container').append(inputBox);

	inputBox.find('.btn').on('click', function() {
		newPostContent = inputBox.find('textarea').val();
		fb.sendNewPost(newPostContent);
	});
}

// resets signup input fileds
page.resetSignupFormLabels = function() {

	var fname = $('#su-fname').val();
	var lname = $('#su-lname').val();
	var email = $('#su-email').val();
	var password = $('#su-password').val();
	var bdate = $('#su-bdate').val();

	$('#su-fname-label').html('First Name:');
	$('#su-fname-label').css('color', '#333');
	$('#su-lname-label').html('Last Name:');
	$('#su-lname-label').css('color', '#333');
	$('#su-email-label').html('Email:');
	$('#su-email-label').css('color', '#333');
	$('#su-password-label').html('Password:');
	$('#su-password-label').css('color', '#333');
	$('#su-bdate-label').html('Birthdate:');
	$('#su-bdate-label').css('color', '#333');

	$('#signup-error-msg').hide();
}

// close all modals
page.closeAllModals = function() {
	$('#login-modal').modal('hide');
	$('#signup-modal').modal('hide');
};

// render posts
page.renderPosts = function (fbPosts) {
	var container = $('#posts-container');
	fbPosts.forEach(function(fbPost) {
		container.append(page.renderOnePost(fbPost));
	});
}	

// render a single post
page.renderOnePost = function(fbPost) {

	var postRow = $('<div class="row"></div>');

	var leftPadding = $('<div class="col-sm-2"></div>');
	var postContainer = $('<div class="col-sm-8"></div>');
	var rightPadding = $('<div class="col-sm-2"></div>');

	postRow.append(leftPadding);
	postRow.append(postContainer);
	postRow.append(rightPadding);

	var postPanel = $('<div class="panel panel-default"></div>');
	var postPanelHeading = $('<div class="panel-heading"></div>');
	var postPanelBody = $('<div class="panel-body"></div>');
	var postPanelFooter = $('<div class="panel-footer"></div>');

	postPanel.append(postPanelHeading);
	postPanel.append(postPanelBody);
	postPanel.append(postPanelFooter);

	postContainer.append(postPanel);

	var postUser = $('<span class="post-user">'+fbPost.poster.name+'</span>');
	var postCreatedAt = $('<span class="post-created-at">'+fbPost.createdAt+'</span>');

	postPanelHeading.append(postUser);
	postPanelHeading.append(postCreatedAt);

	var postContent = $('<div class="post-content">'+fbPost.content+'</div>');

	var postButtons = $('<div class="post-buttons">'+
							'<span class="post-like-button" id="like'+fbPost._id+'" onclick="page.likePost(this)">'+
								'<span class="glyphicon glyphicon-thumbs-up"></span>'+
								'Like'+
							'</span>'+
							'<span class="post-comment-button">'+
								'<span class="glyphicon glyphicon-comment"></span>'+
								'Comment'+
							'</span>'+
						'</div>');

	if(user.hasLiked(fbPost)) {
		var likeButton = postButtons.find('#like'+fbPost._id);
		likeButton.css('color', '#3B5998');
		likeButton.css('font-weight', 'bold');
		likeButton.html('<span class="glyphicon glyphicon-thumbs-up"></span>You Liked');
	}

	postPanelBody.append(postContent);
	postPanelBody.append(postButtons);

	var likesOverview = $('<p class="thumbs-up-footer" id="likescount'+fbPost._id+'">'+
								'<span class="glyphicon glyphicon-thumbs-up footer"></span>'+
								fbPost.likes.length +
								' people like this post'+
							'</p>');
	postPanelFooter.append(likesOverview);

	var comments = fbPost.comments;
	
	// add each comment to comment section of post
	if(comments.length > 0) {

		for(i=0; i<comments.length; i++) {
			var commentDate = new Date(comments[i].createdAt);
			var postComment = page.renderComment(comments[i].content, comments[i].poster.name, commentDate.toString());
			postPanelFooter.append(postComment);
		};
	}

	var newComment = $('<div class="new-comment">'+
							'<table width="100%">'+
								'<tr>'+
									'<td class="new-comment-user">You</td>'+
									'<td class="new-comment-content">'+
										'<div class="form-group">'+
											'<textarea class="form-control" rows="1" cols="55" placeholder="Write a comment..."></textarea>'+
										'</div>'+
									'</td>'+
								'</tr>'+
							'</table>'+
						'</div>');

	newComment.hide();

	postButtons.find('.post-comment-button').on('click', function() {
		var newCommentBox = $(this).parents().eq(2).find('.panel-footer').find('.new-comment');
		newCommentBox.show();
		newCommentBox.find('textarea').focus();
	});

	newComment.on('keyup', function(e){
		if(e.keyCode === 13) {
			// post comment
			fb.postComment(fbPost._id, newComment.find('textarea').val());
			fbPost._id, newComment.find('textarea').val('');
		}
	});

	postPanelFooter.append(newComment);

	return postRow;	
}

// render a single pseudo post
page.renderOnePseudoPost = function(content, id, createdAt) {
	var fbPost = {
		poster: {
			name: user.fname + ' ' + user.lname
		},
		createdAt: createdAt,
		content: content,
		_id: id,
		comments: [],
		likes: []
	};

	var pseudopost = page.renderOnePost(fbPost);
	return pseudopost;
}

// render a comment
page.renderComment = function(content, posterName, dateCreated) {
	var postComment = $('<div class="post-comment"></div>');

	var postCommentHead = $('<div class="comment-head"></div>')
	var postCommentContent = $('<div class="comment-content">'+content+'</div>');

	postComment.append(postCommentHead);
	postComment.append(postCommentContent);

	var postCommentUser = $('<span class="comment-user">'+posterName+'</span>');

	var postCommentCreatedAt = $('<span class="comment-created-at">'+dateCreated+'</span>');

	postCommentHead.append(postCommentUser);
	postCommentHead.append(postCommentCreatedAt);

	return postComment;
}

// like counter and visual
page.likePost = function(htmlElement) {
	var postId = htmlElement.id.substring(4);

	$.ajax(apiUrl + '/posts/likes/'+postId, {
		method: 'GET',
		data: {
			token: user.token
		},
		success: function(response) {
			console.log('page.likePost(): SUCCESS');
			var likesCount = Number($('#likescount'+postId).html().match(/\d+/)[0]);

			if($('#like'+postId).html().indexOf('Liked') > -1) {
				likesCount -= 1;
				var likeButton = $('#like'+postId);
				likeButton.css('color', '#7F7F7F');
				likeButton.css('font-weight', 'normal');
				likeButton.html('<span class="glyphicon glyphicon-thumbs-up"></span>Like');

				var likesCountText = $('#likescount'+postId);
				likesCountText.html('<span class="glyphicon glyphicon-thumbs-up footer"></span>'+
									likesCount +
									' people like this post');
			} else {
				likesCount++;
				var likeButton = $('#like'+postId);
				likeButton.css('color', '#3B5998');
				likeButton.css('font-weight', 'bold');
				likeButton.html('<span class="glyphicon glyphicon-thumbs-up"></span>You Liked');

				var likesCountText = $('#likescount'+postId);
				likesCountText.html('<span class="glyphicon glyphicon-thumbs-up footer"></span>'+
									likesCount +
									' people like this post');
			}
		},
		error: function(response) {
			console.log('page.likePost: ERROR');
		}
	});

}
// ============================================================================



