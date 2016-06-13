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
	facebook.addUser(email, fname, lname, password, birthMonth, birthDay, birthYear);
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
	      },
	      error: function(err){
	      	console.log(err);
	      }
	  });
	};