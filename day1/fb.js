    // "id": "575ebd221fc741fd28d1b582",
    // "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFzY2h1Z2FydEBjb2xsZWdlLmhhcnZhcmQuZHUifQ.kbP5e0_cJFpyCOwQRetoK8aW1BR6wj-BsLC-Sz5Exd0"



var apiUrl = "https://fb.horizonsbootcamp.com/api/1.0"

var register = function() {
	console.log("test")
		$.ajax(apiUrl + "/users/register", {
		    method: "POST",
		    data: {
		      email: $("#email").val(),
		      password: $("#password").val(),
		      fname: $("#firstname").val(),
		      lname: $("#lastname").val(),
		      birthMonth: $("#birthmonth").val(),
		      birthDay: $("#birthday").val(),
		      birthYear: $("#birthyear").val()
		    },
		      success: function (data) {
		      	console.log("Success");
		    },
		      error: function (err) {
		        console.error("Error");
		}
	})
};

$("#regsubmit").on("click", function(e) {
	e.preventDefault();
	register();
});


var token = null;

var login = function() {
	console.log($("#useremail").val())
	console.log($("#userpassword").val())
	$.ajax("https://fb.horizonsbootcamp.com/api/1.0/users/login", {
		method: "POST",
		data: {
			email: $("#useremail").val(),
			password: $("#userpassword").val()
		},
		success: function(data) {
			token = data.response.token;
			console.log("Success");
			console.log(token);
			getposts();
		},
		error: function(err) {
			console.log("Error");
		}
	})
};

$("#login").on("click", function(e) {
	e.preventDefault();
	login();
});


var getposts = function() {
	$.ajax("https://fb.horizonsbootcamp.com/api/1.0/posts", {
		method: "GET",
		data: {
			token: token
		},
		success: function(data) {
			//console.log(data.response.poster.name);
			console.log("there is some data here" + data.response[0].poster.name);
			// $("#postname").text(data.response[0].poster.name);
			// $("#posthere").text(data.response[0].content);
			// $("#likes").text(data.response[0].likes.length);
			console.log("Success");
			render(data);
		
		},
		error: function(err) {
			console.log("Error");
		}
	})
};

var render = function(data) {
	var panel = $("#newsfeed");
	var html = $("<div>" + htmlcontent + "</div>");
	// console.log("data" + data.response[0].poster.name);
    for (var i = 0; i < data.response.length; i++) {
     		var name = data.response[i].poster.name;
			var content = data.response[i].content;
			var likes = data.response[i].likes.length;   		
    		var htmlcontent = '<ul class="list-group">\
			    <li class="list-group-item" id="postname"><p>' +name+ '</p></li>\
			  </ul>\
			  <div class="panel-body">\
			    <div class="input-group" id="posthere">\
				  <p>' +content+ '</p>\
				</div>\
			  </div>\
			  <!-- List group -->\
			  <ul class="list-group">\
			  	<li class="list-group-item"><button type="submit" class="btn btn-primary">Like</button><p>Likes: <div id="likes">' +likes+ '</div></p></li>\
			  </ul>'
			panel.append(htmlcontent);
    }
}

$("#postsubmit").on("click", function(){
	var text = $("#posttext");
	console.log(text);
	postpost();
});

var postpost = function() {

	$.ajax("https://fb.horizonsbootcamp.com/api/1.0/posts", {
		method: "POST",
		data: {
			token: token,
			content: text
		},
		success: function(data) {
			// push into the newsfeed
			console.log("Success");
		},
		error: function(err) {
			console.log("Error");
		}
	})
};










	// _.each(data.response, function(i){
	// 	if (data.response[i]) {
	// 		$("#postname").text(data.response[i].poster.name);
	// 		$("#posthere").text(data.response[i].content);
	// 		$("#likes").text(data.response[i].likes.length);
	// 		panel.append(htmlcontent);
	//     } else {
	//     	console.log("no data");
	//     }
	// })


// display: data.response.poster.name
// 		 data.response.content


// $("#regsubmit").on("click", function(email, password, fname, lname, birthmonth, birthday, birthyear) {
// 	var email = $("#email").val();
// 	var password = $("#password").val();
// 	var fname = $("#fname").val();
// 	var lname = $("#lname").val();
// 	var birthmonth = $("#birthmonth").val();
// 	var birthday = $("#birthday").val();
// 	var birthyear = $("#birthyear").val();
// 	var register(email, password, fname, lname, birthmonth, birthday, birthyear);
// })

// function register() {
// 		$.ajax(apiUrl + "/users/register", {
// 		      method: "POST",
// 		      data: {
// 		        email: email,
// 		        password: password,
// 		        fname: fname,
// 		        lname: lname,
// 		        birthMonth: birthmonth,
// 		        birthDay: birthday,
// 		        birthYear: birthyear
// 		      },
// 		      success: function (response) {
// 		      	console.log("Success");
// 		      },
// 		      error: function (err) {
// 		        console.error("Error");
// 		 	}
// 	})
// }


// 	postLogin: function() {
// 		$.ajax(apiUrl + "/users/login", {
// 			method: "POST",
// 			data: {
// 				email: this.email,
// 				password: this.password,
// 				id: this.generateId()
// 			},
// 			success: function (response) {
// 				console.log("Success");
// 			},
// 			error: function(err) {
// 				console.log("Error");
// 			}
// 		})
// 	}

// }