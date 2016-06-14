"use strict";

window.facebook = window.facebook || {};


var baseURL = 'https://fb.horizonsbootcamp.com/api/1.0';
var userID;
var token;
var nameProf = "Alex Kitchen";
// registration
$("#submitReg").click(function(e) {

	var emailR = $("#Email").val();
	var passwordR = $("#Password").val();
	var fName = $("#FirstName").val();
	var lName = $("#LastName").val();
	var bMonth = $("#BirthMonth").val();
	var bDay = $("#BirthDay").val();
	var bYear = $("#BirthYear").val();

	$.ajax({
		url: baseURL + '/users/register',
		method: 'POST',
		data: {
			email: emailR,
			password: passwordR,
			fname: fName,
			lname: lName,
			birthMonth: bMonth,
			birthDay: bDay,
			birthYear: bYear
		},
		success: function(data) {
			console.log("true");

		}
		
	})	
})

facebook.Mount = function() {


	// login
	$("#submitLog").click(function(e) {
		var emailL = $("#EmailLog").val();
		var passwordL = $("#PasswordLog").val();

		$.ajax({
			url: baseURL + '/users/login',
			method: 'POST',
			success: function(data) {
				console.log('true');
				userID = data.response.id;
				token = data.response.token;
				$('#colOne').hide();
				var feed = new facebook.Feed();
      			feed.loadData();

      			
      			
			},

			data: {
				"email": emailL,
				"password": passwordL
			}
		})

	})

	
}

facebook.Listeners = function() {
	//comments
	//TODO
	$(".comments").click(function(e) {
		var el = $(e.target);
		
		el.parent().children('.collapse').collapse("toggle");
	})

	//add comment
	$("#submitPost").click(function(e) {
		
		var comment = $("#addPost").val();
		
		$.ajax({
			url: baseURL + '/posts',
			method: 'POST',
			data: {
				content: comment,
				token: token
			},
			success: function(data){

				var feed = new facebook.Feed();
				feed.loadData();
			}
			
		})
	})

	$('.postComment').click(function(e) {
		
		var comment = $(e.target).siblings().find('.form-control').val();
		var el = $(e.target);
		
		var id = el.parent().parent().data("commentid");
		

		$.ajax({
			url: baseURL + '/posts/comments/' + id,
			method: 'POST',
			data: {
				token: token,
				content: comment
			},
			success: function(data) {
				console.log("true");
				var feed = new facebook.Feed();
				feed.loadData();
			},
			error: function(data) {
				console.log("fail");
			}
		})
	})
	$('.like-button').click(function(e) {
		var id = $(e.target).data('likeid');
		console.log(id);
		$.ajax({
			url: baseURL + '/posts/likes/' + id,
			method: 'GET',
			data: {
				token: token
			},
			success: function(data) {
				console.log("true");
				var feed = new facebook.Feed();
				feed.loadData();
			}
			
		})
	})
	

	
}

// feed
facebook.Post = function(_id, posterID, posterName, content, date, comments, likes) {
	this._id = _id;
	this.posterID = posterID;
	this.posterName = posterName;
	this.content = content;
	this.createdAt = date;
	this.comments = comments;
	this.likes = likes;

}
facebook.Post.prototype = {

	render: function() {
		var wrapper = $('<div></div>');
		var post = $('<div class="post"></div>');
		var posterName = $('<h4>' +this.posterName+ '</h4>');
		var content = $('<p>' +this.content+ '</p>');
		var divButton = $('<div class="post-buttons"></div>');
		var comments = $('<button class="comments" id="comment_' + this._id + '">comments</button>');
		var collapse = $('<div class="collapse" data-commentid="' +this._id+ '"></div>');
		var likes = $('<button class="like-button" data-likeid="' +this._id+'">likes ' + this.likes.length +'</button>');

		wrapper.append(post);
		post.append(posterName);
		post.append(content);
		post.append(divButton);
		divButton.append(comments);
		divButton.append(collapse);
		divButton.append(likes);
		for (var i = 0; i < this.comments.length; i++) {

			collapse.append($('<div class="comment" id="comment"><h6>' +this.comments[i].poster.name+ '</h6><p>' +this.comments[i].content+ '</p></div>'));

		}
		var addComment = $('<form class="form-inline"><div class="form-group"><label for="exampleInputName2">Comment</label><input type="text" class="form-control" id="exampleInputName2" placeholder="Comment"></div><button type="button" class="btn btn-default postComment">Post</button></form>');
		collapse.append(addComment);
		return wrapper.html();
	}
}
facebook.Post.fromJSON = function(data) {
	var post = new facebook.Post(data._id, data.poster.id, data.poster.name, data.content, data.createdAt, data.comments, data.likes);
	return post;
}

facebook.Feed = function() {
	this.posts = [];

};

facebook.Feed.prototype = {
	loadData: function() {
		$.ajax({
			url: baseURL + "/posts/1?token=" + token,
			success: function(data) {
				console.log("true");
				for (var i = 0; i <data.response.length; i++) {
					var newPost = facebook.Post.fromJSON(data.response[i]);
					this.posts.push(newPost);	
				}
				this.render();
			}.bind(this)
		})
	},
	render: function() {

		var wrapper = $('<div class="feed"></div>');
		var addPost = $('<div class="add-Post"><textarea class="form-control" id ="addPost" rows="3" placeholder="Whats on your mind?"></textarea><button type="button" class="btn btn-primary" id="submitPost">Submit</button></div>');
		wrapper.append(addPost);
		for (var i = 0; i < this.posts.length; i++) {
			wrapper.append(this.posts[i].render());

		}
		$('.Feed-board').html(wrapper.html());

		var nameWrapper = $('<div></div>');
		var name = $('<h3>' + nameProf + '</h3>');
		nameWrapper.append(name);
		$('#leftCol').html(nameWrapper.html());
		facebook.Listeners();
	}
}

