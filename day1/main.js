window.fakebook = {}
var baseURL = 'https://fb.horizonsbootcamp.com/api/1.0'

// $('#account-create')
// $('#talk-about-ur-kids')
// $('#like')
// $('#comment')
var user = {}
fakebook.mountStatic = function(cb) {
	$('#account-create').click(function(e) {
		e.preventDefault()
		console.log('click detected')
		$.ajax(baseURL+'/users/register', {
			data: {
				email: $('#new-email').val(),
				password: $('#new-pass').val(),
				fname: $('#new-first').val(),
				lname: $('#new-last').val(),
				birthMonth: $('#new-month').val(),
				birthDay: $('#new-day').val(),
				birthYear: $('#new-year').val(),
			},
			method: 'POST',
			success: function(data) {
				console.log('new user created!!')
			}
		})
	})
	$('#login-submit').click(function(e) {
		e.preventDefault()
		console.log('login attempt')
		$.ajax(baseURL+'/users/login', {
			data: {
				email: $('#login-email').val(),
				password: $('#login-password').val(),
			},
			method: 'POST',
			success: function(response) {
				console.log('login success!')
				user = response.response
				console.log(user)
				fakebook.loadPosts(user.token)
			}
		})
	})
	$('#talk-about-ur-kids').click(function(e) {
		e.preventDefault()
		if (_.isUndefined(user.token)) {return}
		$.ajax(baseURL+'/posts', {
			data: {
				token: user.token,
				content: $('#postbox').val(),
			},
			method: 'POST',
			success: function() {
				console.log('post successful')

			}
		})
	})
}
fakebook.mount = function() {
	$('.comment').off()
	$('.comment').click(function(e) {
		e.preventDefault()
		$.ajax(baseURL+'/posts/comments/'+$(this).attr('id'), {
			content: $('#hogwash'+$(this).attr('id')).val(),
			success: function() {
			}
		})
		console.log()
	}) 
}

fakebook.loadPosts = function(token) {
	$.ajax(baseURL+'/posts/1', {
		data: {
			token: user.token,
		},
		success: function(response) {
			console.log(response.response)
			_.forEach(response.response, function(elt) {$('#post-container').append(renderPost(elt))})
			fakebook.mount()
		}
	})
}

function renderPost(postObj) {
	var wrapper = $('<div class="post"></div>')
	var userInfo = $('<div class="user-info"></div>')
	var userBar = $('<span class="glyphicon glyphicon-user"></span><h5>'+postObj.poster.name+'</h5>')
	var postText = $('<div class="post-text"><p>'+postObj.content+'</p></div>')
	var react = $('<div class="react"></div>')
	var likeButton = $('<a class="like" id="'+postObj._id+'">\
						<span class="glyphicon glyphicon-thumbs-up"></span></a>')
	var likeCount = $('<h5>'+postObj.likes.length+'</h5>')
	var commentButton = $('<a id="'+postObj._id+'">\
						<span class="glyphicon glyphicon-pencil" class="btn btn-primary"\
						 role="button" data-toggle="collapse" href="#comments'+postObj._id+'" \
						 aria-expanded="false" aria-controls="comments'+postObj._id+'"></span></a>')
	var commentCount = $('<h5>'+postObj.comments.length+'</h5>')

	

	wrapper.append(userInfo)
	userInfo.append(userBar)
	wrapper.append(postText)
	wrapper.append(react)
	var commentWell = $('<div class="collapse"></div>')
	var comments = $('<div id="comments'+postObj._id+'"></div>')
	if (postObj.comments.length>0) {comments.append(renderComments(postObj.comments))}
	commentWell.append(comments)
	commentWell.append($('<span class="form-group add-comment">\
							<input type="text" class="form-control" id="hogwash'+postObj._id+'" placeholder="react">\
							<button type="submit" class="btn btn-default comment" id="'+postObj._id+'">Comment</button>\
						</span>'))
	
	wrapper.append(commentWell)

	
	react.append(likeButton)
	react.append(likeCount)
	react.append(commentButton)
	react.append(commentCount)
	$('#post-container').append(wrapper)
	// '<div class="post">\
	// 	<div class="user-info">\
	// 		<span class="glyphicon glyphicon-user"></span>\
	// 		<h5>username</h5>\
	// 	</div>\
	// 	<div class="post-text">\
	// 		<p>This is an example post with a large amount of text that makes it seem like i have much to say when really this is just vacuous drivel and and useless text without any real message or worthwhile meaning.</p>\
	// 	</div>\
	// 	<div class="react">\
	// 		<a href="#" id="like">\
	// 		<span class="glyphicon glyphicon-thumbs-up"></span>\
	// 		</a>\
	// 		<h5>123</h5>\
	// 		<a href="#" id="comment">\
	// 		<span class="glyphicon glyphicon-pencil"></span>\
	// 		</a>\
	// 		<h5>6</h5>\
	// 	</div>\
	// </div>'
}
function renderComments(commentObj) {
	var wrapper = $('<div class="well comment"></div>')
	_.forEach(commentObj, function(elt) {
		wrapper.append($('<h5>'+elt.poster.name+'</h5>'))
		wrapper.append($('<p>'+elt.content+'</p>'))
	})
	return wrapper
}
function updateComments(postID) {

}
function getComments(postID) {

}


fakebook.Post = function() {

}
// fakebook.mount()
// fakebook.mount = function() {
// 	$('#account-create').click(function() {
// 		// $.
// 	})
// }