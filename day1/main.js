window.fakebook = {}
var baseURL = 'https://fb.horizonsbootcamp.com/api/1.0'

var user = {}
fakebook.mountStatic = function(cb) {
	$('#account-create').click(function(e) {
		e.preventDefault()
		// console.log('click detected')
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
				// console.log('new user created!!')
			}
		})
	})
	$('#login-submit').click(function(e) {
		e.preventDefault()
		// console.log('login attempt')
		$.ajax(baseURL+'/users/login', {
			data: {
				email: $('#login-email').val(),
				password: $('#login-password').val(),
			},
			method: 'POST',
			success: function(response) {
				// console.log('login success!')
				user = response.response
				fakebook.loadPosts(1)
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
				// console.log('post successful')
				$('#postbox').val('')
				fakebook.loadPosts(1)
			}
		})
	})
}
fakebook.mount = function() {
	$('.comment').off()
	$('.comment').click(function(e) {
		// console.log('comment attempted!')
		e.preventDefault()
		var id = $(this).attr('id')
		$.ajax(baseURL+'/posts/comments/'+id, {
			data: {
				token: user.token,
				content: $('#hogwash'+id).val(),
			},
			method: 'POST',
			success: function() {
				getComments(id)
				$('#hogwash'+id).val('')
				// console.log('comment successful')
			}
		})
	}) 
	$('.likerbot3000').off()
	$('.likerbot3000').click(function(e) {
		e.preventDefault()
		// console.log('like attempted')
		var id = $(this).attr('id')
		$.ajax(baseURL+'/posts/likes/'+id, {
			data: {
				token: user.token,
			},
			method: 'GET',
			success: function() {
				$('#likes'+id).text(parseInt($('#likes'+id).text())+1)
				// console.log('like successful')
			}
		})
	})
	$(document).off('scroll')
	$(document).scroll(function() {
    if (window.scrollY===$(document).height()-window.innerHeight) {
    	fakebook.loadPosts(Math.floor($("#post-container > div").length/10)+1)
    }
  })
}
fakebook.loadPosts = function(n) {
	if (n===1) {$('#post-container').empty()}
	$.ajax(baseURL+'/posts/'+n, {
		data: {
			token: user.token,
		},
		success: function(response) {
			_.forEach(response.response, function(elt) {$('#post-container').append(renderPost(elt))})
			fakebook.mount()
			// console.log('posts loaded')
		}
	})
}
function renderPost(postObj) {
	var timeString = parseTime(postObj)
	var wrapper = $('<div class="post"></div>')
	var userInfo = $('<div class="user-info"></div>')
	var userBar = $('<span class="glyphicon glyphicon-user"></span><h5>'+postObj.poster.name+'</h5>')
	var postTime = $('<h5 class="time">'+timeString+'</h5>')
	var postText = $('<div class="post-text"><p>'+postObj.content+'</p></div>')
	var react = $('<div class="react"></div>')
	var likeButton = $('<a class="likerbot3000" id="'+postObj._id+'">\
						<span class="glyphicon glyphicon-thumbs-up"></span></a>')
	var likeCount = $('<h5 id="likes'+postObj._id+'">'+postObj.likes.length+'</h5>')
	var commentButton = $('<a id="'+postObj._id+'">\
						<span class="glyphicon glyphicon-pencil" class="btn btn-primary"\
						 role="button" data-toggle="collapse" href="#cWell'+postObj._id+'" \
						 aria-expanded="false" aria-controls="cWell'+postObj._id+'"></span></a>')
	var commentCount = $('<h5 id="cCount'+postObj._id+'">'+postObj.comments.length+'</h5>')
	wrapper.append(userInfo)
	userInfo.append(userBar)
	userInfo.append(postTime)
	wrapper.append(postText)
	wrapper.append(react)
	var commentWell = $('<div class="collapse cWell" id="cWell'+postObj._id+'"></div>')
	var comments = $('<div id="comments'+postObj._id+'"></div>')
	if (postObj.comments.length>0) {comments.append(renderComments(postObj.comments))}
	commentWell.append(comments)
	commentWell.append($('<span class="form-group add-comment">\
							<input type="text" class="form-control cText" id="hogwash'+postObj._id+'" placeholder="react">\
							<button type="submit" class="btn btn-default comment" id="'+postObj._id+'">Comment</button>\
						</span>'))
	
	wrapper.append(commentWell)
	react.append(likeButton)
	react.append(likeCount)
	react.append(commentButton)
	react.append(commentCount)
	$('#post-container').append(wrapper)
}
function renderComments(commentObj) {
	var wrapper = $('<div class="well comment"></div>')
	_.forEach(commentObj, function(elt) {
		var nameBar = $('<div class="nameBar"></div>')
		nameBar.append($('<h5>'+elt.poster.name+'</h5>'))
		nameBar.append($('<h5 class="time">'+parseTime(elt)+'</h5>'))
		wrapper.append(nameBar)
		wrapper.append($('<p>'+elt.content+'</p>'))
	})
	return wrapper
}
function getComments(postID) {
	$.ajax(baseURL+'/posts/comments/'+postID, {
		data: {
			token: user.token,
		},
		success: function(response) {
			$('#comments'+postID).empty()
			$('#comments'+postID).append(renderComments(response.response))
			$('#cCount'+postID).text(response.response.length)
		}
	})
}
function parseTime(obj) {
	var time = new Date(obj.createdAt)
	if (Date.now()-86400000<time) {
		return time.getHours()+':'+time.getHours()
	} else {
		return time.getDate()+'.'+time.getMonth()+'.'+time.getYear()
	}
}