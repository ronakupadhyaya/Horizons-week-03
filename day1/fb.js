// JavaScript Document

var url = "https://fb.horizonsbootcamp.com/api/1.0";


var register = function () {
		$.ajax(url+'/users/register', {
		method: "POST",
		data: {
			email: $('#email').val(),
			password: $('#pw').val(),
			fname: $('#fname').val(),
			lname: $('#lname').val(),
			birthMonth: $('#birthMonth').val(),
			birthDay: $('#birthDay').val(),
			birthYear: $('#birthYear').val(),
		},
		success: function (data) {
			console.log(data)
		},
		error: function (err) {
			console.err("error")
		}
	});
}
var obj = null;
var id = null;
var token = null;
var posts = [];

var login = function () {
		$.ajax(url+'/users/login', {
		method: "POST",
		data: {
			email: $('#loge').val(),
			password: $('#logp').val(),
		},
		success: function (data) {
			obj = data;
			id = obj.response['id'];
			token = obj.response['token'];
			console.log(id);
			console.log(token);
			getPosts();
		},
		error: function (err) {
			console.log("error")
		}
	});
}

var getPosts = function() {
	$.ajax(url+'/posts/1/', {
		method: "GET",
		data: {
			token: token
		},
		success: function(data) {
			posts.unshift(data);
			console.log(data)
			loadPosts();
		},
		error: function(err) {
			console.log("error")
		}
	});
}

var newPost = function() {
	$.ajax(url+'/posts', {
		method: "POST",
		data: {
			token: token,
			content: $('#status').val()
		},
		success: function(data) {
			console.log(data);
			login();
		},
		error: function(err) {
			console.log("error")
		}
	});
}

var getComments = function(id) {
	getPosts();
	for (var i=0; i++; i<posts.length) {
		if(posts[0].response[i]["_id"]==id) {
			console.log(posts[0].response[i]['comments']);
			return;
		}
	}
}



// var newComment = function() {
// 	var stuff = "my comment";
// 	var id = $(this).attr("commentid");
// 	debugger;
// 	for (var i=0; i++; i<posts.length) {
// 		if(posts[0].response[i]["_id"]==id) {
// 			posts[0].response[i]['comments'].push(stuff);
// 			return;
// 		}
// 	}
// }

var loadPosts = function() {
	console.log("loading...");
	// debugger;
	$('.newsbox').html("");
	for (var i=0;i<posts[0].response.length;i++) {
		$('.newsbox').append('<div class="post"><p class="name" id="name">'+ posts[0].response[i]['poster']['name'] +'</p><p class="title" id="title">'+ posts[0].response[i]['content'] +'</p><button class="addComment" class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne" commentId="'+posts[0].response[i]['_id']+'">Add Comment</button></div><div id="collapseOne" class="accordion-body collapse"><input type="text" class="final"></input><button id="saved" commentId="'+posts[0].response[i]['_id']+'">Save</button></div>');
	
		if(posts[0].response[i]['comments'].length>0) {
			for (var y=0; y<posts[0].response[i]['comments'].length; y++) {
					$('.newsbox').append('<div class="comments"><p class="comment">'+posts[0].response[i]['comments'][y]['content']+'</p></div>')
				}
		}
	};


	$('#saved').on("click", function(e){
	    var id = $(this).attr('commentid');
	     $.ajax("https://fb.horizonsbootcamp.com/api/1.0/posts/comments/" + id, {
		     method: "POST",
		     data: {
		       token: token,
		       content: $('.final').val()
		     },
		     success: function(data){
		       login()
		     },
		     error: function(err){
		       console.log(err);
		     }
		   })
	})
}

