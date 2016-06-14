"use strict";

var url = "https://fb.horizonsbootcamp.com/api/1.0";
var register  = function() {
	$.ajax(url + "/users/register", {
		data: {
			email: $('#email').val(),
			password: $('#password').val(),
			fname: $('#fname').val(),
			lname: $('#lname').val(),
			birthMonth: $('#birthMonth').val(),
			birthDay: $('#birthDay').val(),
			birthYear: $('#birthYear').val()
		},
		method: "POST",
		success: function(data) {
			console.log(data);
		},
		error: function(error) {
			console.log(error);
		}
	});      
}
var token= null;
var login = function() {
	$.ajax(url + "/users/login", {
		data: {
			email: $('#email').val(),
			password: $('#password').val()
		},
		method: "POST",
		success: function(data) {
			token = data.response.token;
			getPosts();
		},
		error: function(error) {
			console.log("Log in failed.")
			console.log(error);
		}
	});
}
var getPosts = function() {
	$.ajax(url + "/posts", {
		data: {
			token: token,
		},
		method: "GET", 
		success: function(data) {
			var response = data.response;
			$(".board").html("");
			$( "#registration" ).empty();
			$(".board").append('<input type = "text" id = "newpost" style="height:100px;width:500px" placeholder="Say something stupid."><button type="button" class="makepost" style="height:40px;width:100px" onclick="newPost()">Post</button>');
			for (var i=0; i<response.length; i++) {
				$(".board").append('<div class="list-container"><div class="list"><div class="post" id='+response[i]["_id"]+'><p class="name" id="name">'+ response[i]['poster']['name'] +'</p><p class="content" id="content">'+ response[i]['content']+'</p><input type = "text" id = "newcomment" style="height:50px;width:200px" placeholder="Comment something stupid."><button type="button" class="makecomment" style="height:40px;width:100px" onclick="newComment(this)">Comment</button></div></div></div>');
				$("#postid.post").val()
				if (response[i].comments.length>0) {
					for (var j=0; i<response[i].comments.length; i++) {
					    $(".board").append('<div class="comments"><p class="content">'+response[i].poster.name+": "+response[i].comments[j].content+'</p><p class="time">'+response[i].comments[j].createdAt+'</p></div>')
					}
				}
			}
		},
		error: function(error) {
			console.log(error);
		}
	});
}



var newPost = function() {
    $.ajax(url+'/posts', {
    	method: "POST",
        data: {
        	token: token,
        	content: $('#newpost').val()
        },
        success: function(data) {
        	login();
        },
        error: function(error) {
            console.log("error");
        }
    });
}	



var newComment = function(e) {
	var postId = e.id;
    $.ajax(url+'/posts/comments/' + postId, {
    	method: "POST",
        data: {
        	token: token,
        	content: $('#newcomment').val()
        },
        success: function(data) {
        	login();
        },
        error: function(error) {
            console.log("error");
        }
    });
}
