var id ="575ebea129da2c672a723d37"
var token= "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InZpcmdpbmlhLnZhbmtldXJlbkBnbWFpbC5jb20ifQ.zK8JA6FJ81vKJmuDDLCbDbbf_RzZTSCr3RknciM7ZXs"
var apiUrl = "https://fb.horizonsbootcamp.com/api/1.0"

window.facebook = window.facebook || {};

//AJAX FOR REGISTER
$("#signup").click(function(e){
	var email = $('#exampleInputEmail1').val();
    if (!email) {
      alert("Please enter email!");
      return;
    }
	var fname = $('#exampleFirstName2').val();
	if(!fname){
		alert("Please enter first name!");
		return;
	}
	var lname = $('#exampleLastName2').val();
	if(!lname){
		alert("Please enter last name!");
		return;
	}
	var password = $('#exampleInputPassword1').val();
	if(!password){
		alert("Please enter password!");
		return;
	}
	var birthMonth =$('#birthMonth').val();
	if(!birthMonth){
		alert("Please enter Month!");
		return;
	}
	var birthDay = $('#birthDay').val();
	if(!birthDay){
		alert("Please enter day!");
		return;
	}
	var birthYear =$('#birthYear').val();
	if(!birthYear){
		alert("Please enter year!");
		return;
	}
	console.log("success");
	facebook.addUser(email, password, fname, lname, birthMonth, birthDay, birthYear);
	$('#registerNew').modal('hide')
});

//USER REGISTER
facebook.addUser = function(e,p,f,l,month,day,year) {
	$.ajax(apiUrl + "/users/register", {
		method: "POST",
	       data: {
	        email: e,
	        password: p,
	        fname: f,
	        lname: l,
	        birthMonth: month,
	        birthDay: day,
	        birthYear: year,
	        },
	      success: function (data) {
	        console.log(data); 
	      },
	      error: function(err){
	      	console.log(err);
	      }
	  });
	};

//AJAX FOR LOGIN
$("#loginSubmit").click(function(e){
	var email = $('#exampleInputEmail2').val();
    if (!email) {
      alert("Please enter email!");
      return;
    }
	var password = $('#exampleInputPassword2').val();
	if(!password){
		alert("Please enter password!");
		return;
	}
	console.log(email, password);

	facebook.login(email, password);
	$('#exampleInputEmail2').val("");
	$('#exampleInputPassword2').val("");
});

//USER LOGIN
facebook.login = function(e,p) {
	console.log(e,p);
	$.ajax(apiUrl + "/users/login", {
		method: "POST",
	       data: {
	        email: e,
	        password: p,
	        },
	        success: function (data) {
	        	console.log(data);
	        	id = data.response.id;
	        	token = data.response.token; 
	        	posts();
	      },
	      error: function(err){
	      	console.log(err);
	      }
	  });
	};


//TO SEE ALL POSTS
var postArray = [];
var posts = function(){
    $.ajax(apiUrl + "/posts", {
        method: "GET", 
        data:{
            token:token 
        }, 
        success: function(response){
            console.log("Success")
        for(var i = 0; i < response.response.length; i++){
            postArray.push(response.response[i]);
         }  
         renderposts(postArray);
        }, 
        error:function(response){
            console.error("Error")
        }
        });
}

//RENDER FOR POSTS
var render = function() {
   $(".main").append('<div class="updateposts"></div>');
};

//RENDER POST TO NEWSFEED
var renderposts = function(postArray){
     for(var i=0; i<postArray.length; i++){
     	var posthtml = '<div class="post">\
                <div class="body-text">' + postArray[i].content + '</div>\
                <div class="body-name">' + postArray[i].poster.name + '</div>\
              <button id="like'+ postArray[i]._id +'" class="btn btn-secondary" type="button">\
                  Likes <span class="badge">'+ postArray[i].likes.length +'</span>\
                </button></div>';
     	$(".post-container").append(posthtml);
     	$("#like" + postArray[i]._id).click(function(e){
			$(this).addClass("btn-primary");
			$(this).removeClass("btn-secondary");
		});
     }
};


//AJAX FOR CLICK ON LIFE
// var clickLikes = function(){
// $("#like").click(function(e){
// 	$( "#like" + id).replaceWith('<button class="btn btn-primary" type="button">\
//                   Likes <span class="badge">postArray[i].likes.length</span>\
//                 </button>');
// });
// }






