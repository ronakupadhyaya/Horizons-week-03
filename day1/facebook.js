window.facebook = window.facebook || {};

$(document).ready(function() {



// //storing personal variables just to have
var myId = "575ebdf93a6037c42910dd33";
var myToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRheWNvbkBzZWFzLnVwZW5uLmVkdSJ9.Y4YGnxDC1V_vppbAWYUWJF_fVUgG5MphfIGLZOEZX5Y"
//var token=[];

//array of posts
var feedList =[];

/////////////////////////////////////////////
///using default login for now until site up and rnning
var token =[myToken,myId]
/////////////////////////////////////////
///////////////////////////////////

//main url for easy access
var url = "https://fb.horizonsbootcamp.com/api/1.0";

//load registration modal automatically
$(window).load(function(e){
	$('#register-modal').modal('show');
});
//if click login on registration modal switch to login modal 
$('.btn-login').click(function(e){
	$('#register-modal').modal('hide');
	$('#login-modal').modal('show')
})

//verify inputs for registration modal upon click:
$('.btn-register').click(function(e){
	//validate that first name is entered:
	if($.trim($('#fn').val())===""){
		alert("Need first name!");
	};
	var fname = $('#fn').val();

	//validate that last name is entered:
	if($.trim($('#ln').val())===""){
		alert("Need last name!");
	};
	var lname = $('#ln').val();

	//validate that email is entered and correct:
	if($.trim($('#em').val())===""){
		alert("Need email!");
	};
	//make sure email is valid
	if($('#em').val().split("@").length !==2){
		alert("Invalid email!");
	};
	var email = $('#em').val();

	//make sure password field isn't empty
	if($.trim($('#pw').val())===""){
		alert("Need password!");
	};
	var password = $('#pw').val()

	///validate that birthday is filled out
	if($('#bd').val()===""){
		alert("Need password!")
	}
	//split birthday into array with [month, day, year]
	var birthday = $('#bd').val().split("/");
	//isolate and validate birthday month
	var month = birthday[0]
	if(parseInt(month)<1 || month>12){
		alert("Invalid month!")
	}
	var birthMonth = month;

	//isolate and validate birthdate
	var date = birthday[1]
	if(parseInt(date)<1 || date>31){
		alert("Invalid birthdate!")
	}
	var birthDay = date;

	//isolate and validate birthday year
	var year = birthday[2]
	if(year.length!==4){
		alert("Invalid Year!")
	}
	var birthYear= year;
	///need to run throgh ajax function here:
	facebook.newUser(fname, lname, email, password, birthMonth, birthDay, birthYear);
}) 

/////main login: collect data, validate, and retreive id's 
$(".last-pass").click(function(e){
	//validate that email field is filled
	if($.trim($('#main-email').val())===""){
		alert("Need to enter email!")
	}
	var mainEmail = $('#main-email').val();

	//validate that password field is filled
	if($.trim($('#main-password').val())===""){
		alert("Need to enter password!")
	}
	var mainPass = $('#main-password').val();

	//call ajax to retrieve token and put as main element in token array
	facebook.userLogin(mainEmail,mainPass);
	$('#login-modal').modal('hide');
	///initiate most frequent 10 posts upon login
	facebook.getFeed()
})

////filling in text to submit a post:
$("#submit").click(function(e){
	if($.trim($('#status').val())===""){
		alert("Need a status!")
	}
	var status = $('#status').val();
	//submit post to server
	facebook.submitPost(status);
	//update news feed
	facebook.getFeed();
	//clear post after submitted
	$('#status').val('');
})



facebook.newUser = function(f, l, e, p, m, d, y){
	$.ajax(url+'/users/register', {
		method: "POST",
		data: {
			email: e,
			password: p,
			fname: f,
			lname: l,
			birthMonth: m,
			birthDay: d,
			birthYear: y
		},
		success: function(e){
			//if successful move onto login page
			$('#login-modal').modal('show');
			$('#login-modal').modal('show');
		},
		error: function(err){
			alert("An error has occurred");
		}
	})
}

//get token and id return as an array (token = [token, id]) with min login 
facebook.userLogin = function(e,p){
	$.ajax(url+'/users/login', {
		method: "POST",
		data: {
			email: e,
			password: p
		},
		success: function(response){
			var x = response.response.token;
			var y = response.response.id
			if(token.length===0){
				myToken=x;
			//get rid of modal
			$('#login-modal').modal('hide');
		}
	},
	error: function(err){
		console.log(err)
	}
})

}

//to push text post to the server
facebook.submitPost =function(text){
	$.ajax(url+"/posts", {
		method: "POST",
		data: {
			token: myToken,
			content: text
		},
		success: function(response){
			facebook.getFeed();
		},
		error: function(err){
			console.log('err')
		}
	})
}

//show comments
facebook.showComment = function(id){
	$.ajax(url+'/posts/comments/'+id, {
		method: "GET",
		data: {
			token: myToken
		},
		success: function(response){
			//clear the field
			$('#well-modal'+id).empty();
			console.log(response.response.length)
			//add elements if comments present
			if(response.response.length!==0){
				for(var i=0; i<response.response.length; i++){
					$('#well-modal'+id).append($('<div class="panel comment-panel"><div class="panel-body">\
						<b>'+response.response[i].poster.name+'</b><p>'+response.response[i].content+'</p></div></div>'))
				}
			}
			$('#well-modal'+id).append('<div class="panel response-panel"><div class="form-group add-comment"><input type = "text"\
				placeholder="Add comment" id="add'+id+'"></div><span><button type="button"\
				class="comment-add-btn" id="comment-add-btn'+id+'">Comment</button></span></div></div></div></div></div>');

		//add listeners for comment button
		$('.comment-add-btn').click(function(e){
			var t = this.id.split("comment-add-btn")[1];
			if($.trim($('#add'+t).val())===""){
				alert("Need to add a comment!")
				return;
			}
			var txt = $('#add'+t).val();
			facebook.submitComment(t,txt)
			$('#add'+t).val("")
			return
		})
	},
	error: function(err){
		console.log(err)
	}
})
}

//reset feed with refresh button
$('#refresh').click(function(e){
	facebook.getFeed();
})

//to push comment on post to the server
facebook.submitComment = function(id, msg){
	$.ajax(url+'/posts/comments/'+id, {
		method: "POST",
		data: {
			token: myToken,
			content: msg
		},
		success: function(response){
			console.log(response)
			facebook.showComment(id)
		},
		error: function(err){
			console.log(err)
		}
	})
}

//to toggle get a like from the server
facebook.submitLike = function(id){
	$.ajax(url+'/posts/likes/'+id, {
		method: "GET",
		data: {
			token: myToken
		},
		success: function(response){
		$('#like-post'+id).css("background-color","blue");
		console.log($('#badge'+id).replaceWith('<span class="badge" id="badge'+response.response._id+'">'+response.response.likes.length+'</span>'));
		//will return to unlike later
		},
		error: function(err){
			console.log(err)
		}
	})
}

//get items to throw into newsfeed
facebook.getFeed = function(){
	$.ajax(url+'/posts/1', {
		method: "GET",
		data: {
			token: myToken,
		},
		success: function(response){
			$('.feed-posts').remove();
			for(var i=response.response.length-1; i>=0; i--){
				//return array of objects, each being 10  most recent posts
				feedList.push(response.response[i])
				//console.log(response.response[i])
				$('.hold-feed').prepend($('<div class = "container feed-posts" id="'+response.response[i]._id+'">\
				<div class = "box feed-box"<span><b>'+response.response[i].poster.name+'</b><p>'+response.response[i].content+'</p>\
				</span><span><button type="button" class= "btn comment-view-button" id="comment-post'+response.response[i]._id+'">Comment</button></span>\
				<span><button type = "button" class = "btn like-button" id="like-post'+response.response[i]._id+'">Like\
				<span class="badge" id="badge'+response.response[i]._id+'">'+response.response[i].likes.length+'</span></button></span>\
				<div class = "modal collapse" data-toggle="modal" id="well-modal'+response.response[i]._id+'" aria-expanded="false">'))
				}
			//adding a like
			$('.like-button').click(function(e){
				//isolate post id
				var x = this.id.split("like-post")[1];
				//feed post id into function to trigger like
				facebook.submitLike(x)

			})

			$('.comment-view-button').click(function(e){
				var z= this.id.split('comment-post')[1];
				//console.log(z)
				$('#well-modal'+z).modal('show');
				facebook.showComment(z);
			})
		},
	error: function(error){
		console.log(error)
	}
})
}


});