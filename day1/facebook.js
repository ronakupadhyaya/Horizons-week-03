window.facebook = window.facebook || {};


// //storing personal variables just to have
var myId = "575ebdf93a6037c42910dd33";
var myToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRheWNvbkBzZWFzLnVwZW5uLmVkdSJ9.Y4YGnxDC1V_vppbAWYUWJF_fVUgG5MphfIGLZOEZX5Y"
//var token=[];

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
$("#login").click(function(e){
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
})

////filling in text to submit a post:
$("#submit").click(function(e){
	if($.trim($('#status').val())===""){
		alert("Need a status!")
	}
	var status = $('#status').val()
	console.log(status)
	//clear post after submitted
	$('#status').val('')
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
			$('#login-modal').modal('show')
			$('#login-modal').modal('show')
		},
		error: function(err){
			alert("An error has occurred")
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
			token.push(x,y);
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
facebook.submitPost =function(){
}

//to push comment on post to the server
facebook.submitComment = function(){
}

//to toggle get a like from the server
facebook.submitLike = function(){
}