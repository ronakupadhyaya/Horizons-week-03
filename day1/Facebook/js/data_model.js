"use strict";

window.facebook = window.facebook || {};




facebook.user = function(email, password, fname, lname, birthMonth, birthDay, birthYear) {
	  this.email = email;
	  this.password = password;
	  this.fname = fname;
	  this.lname = lname;
	  this.birthMonth = birthMonth;
	  this.birthDay = birthDay;
	  this.birthYear = birthYear
	},

  facebook.user.register = function(email, password, fname, lname, birthMonth, birthDay, birthYear) {
    $.ajax({url: "https://fb.horizonsbootcamp.com/api/1.0/users/register", 
      method: "POST",
      data: {
        email: email,
        password: password,
        fname: fname,
        lname: lname,
        birthMonth: birthMonth,
        birthDay: birthDay,
        birthYear: birthYear
      },
      success: function (data) {
        console.log("true");
      },
      error: function (err) {
        console.error("error incomplete register definition");
      }
  });
}



// Start login

facebook.user.login = function(email, password) {
	$.ajax({url: "https://fb.horizonsbootcamp.com/api/1.0/users/login", 
	  method: "POST",
	  data: {
	    email: email, // this
	    password: password
	  },
	    success: function (data) {
	      $("#signupform").css('display', 'none');
	      $(".user").css('display', 'none');
	      $("#anchor").css('display', 'initial');
	      $(".add-list-container").css('display', 'initial');
	      facebook.user.getPost();
	    },
	    error: function (err) {
	      console.error("not working");
	    }
	  }
	);
 }


 function render(post) {
    var wrapper = $('<div class="wrapper"></div>');
   	var content = post.content
   	var poster = post.poster.name
   	var contentDiv = $('<div class="contentDiv"></div>');
   	var posterDiv = $('<div class="posterDiv"></div>');

   	posterDiv.html(poster)
   	contentDiv.html(content)

   	console.log(poster)
   	console.log(content)

   	wrapper.append(posterDiv)
   	wrapper.append(contentDiv)

   	console.log(wrapper)

   	$("#anchor").append(wrapper)

    return wrapper.html();
  }





facebook.user.getPost = function() {
	$.ajax({url: "https://fb.horizonsbootcamp.com/api/1.0/posts", 
	  method: "GET",
	  data: {
		id:"575f08f40e9aa02e54783e35",
		token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impvb3N0a0B3aGFydG9uLnVwZW5uLmVkdSJ9.um-SmujwoX1USFCSWkGyEjXEAJEdADucd8jm0fHt7qQ"

	  },
	    success: function (data) {
	    	console.log(data)
	      for (var i = 0; i < data.response.length; i++) {
			console.log(data.response[i])
	      	render(data.response[i])
	      
	      }
	    },
	    error: function (err) {
	      console.error("not working");
	    }
	  });
 }

 facebook.user.putPost = function(string) {
	$.ajax({url: "https://fb.horizonsbootcamp.com/api/1.0/posts", 
	  method: "POST",
	  data: {
		token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impvb3N0a0B3aGFydG9uLnVwZW5uLmVkdSJ9.um-SmujwoX1USFCSWkGyEjXEAJEdADucd8jm0fHt7qQ",
		content: $('#inputComment').val()
	  },
	    success: function (data) {
	    	console.log(true);
	    	facebook.user.getPost();
	    },
	    error: function (err) {
	      console.error("not working");
	    }
	  });
 }



$('#inputComment').on("keydown", function(e) {
	e.preventDefault(); 
	if (e.keyCode === 13) {
	facebook.user.putPost();
	}
})




 $('.add-list').click(function(e) {
 	console.log("test")
    $('#addList').collapse('toggle');
  });

