window.book = window.book || {};

// Initial login info
 var myId = "575ebfb629da2c672a723d40";
 var myToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImlrYXBhZGlhQHVtaWNoLmVkdSJ9.f3W1z8KWZBMRZbUWYnfpLjqNXM02dwVsQiSQ9OKmKMI";

// User registration function
// They can skip this step if already registered
 book.registration = function() {

 	var email = $('.email').val();
 	var firstName = $('.firstName').val();
 	var lastName = $('.lastName').val();
 	var password = $('.password').val();
 	var	birthDay = $('.birthDay').val();
 	var birthMonth = $('.birthMonth').val();
 	var birthYear = $('.birthYear').val();
 	var registerBool;

 	$.ajax('https://fb.horizonsbootcamp.com/api/1.0/users/register', {
 	 	
      method: "POST",
      data: {
        email: email,
        password: password,
        fname: firstName,
        lname: lastName,
        birthMonth: birthMonth,
        birthDay: birthDay,
       	birthYear: birthYear
      },
      success: function (response) {
        console.log("Successfully registered user");
        registerBool = true;
      },
      error: function (err) {
        console.error("Error registering");
      }
    });
 }

// Registration function gets called after registration button is clicked
 $('#registerButton').on('click', function() {
    book.registration();
    });


// Login function
// If successfully logged in, the news feed is updated by calling book.newsFeed()
 book.login = function() {

 	var loginEmail = $('.loginEmail').val();
 	var loginPassword = $('.loginPassword').val();
	this.loginBool;
	this.userId;
  this.userToken;

 	$.ajax('https://fb.horizonsbootcamp.com/api/1.0/users/login', {
 	 	  
      method: "POST",
      data: {
        email: loginEmail,
       	password: loginPassword
      },
      success: function (response) {
        console.log("Successfully logged in");
        this.loginBool = true;
        this.userId = response.response.id;
        this.userToken = response.response.token;
        book.newsFeed();
      }.bind(this),
      error: function (err) {
        console.error("Error logging in");
      }
    });
 }

 // If the user is logged in, update page with posts using ajax and append to DOM 
 book.newsFeed = function() {

    this.postID;
    // if(book.login.loginBool) {}
    $.ajax('https://fb.horizonsbootcamp.com/api/1.0/posts/1', {
    
      method: "GET",
      data: {
        token: book.userToken
      },
      success: function (response) {
        console.log("Successfully updated posts");
        
        // Loop through posts to append each to DOM
        for (var i = 0; i < response.response.length; i++) {

          this.postID = response.response[i]._id;
          var wrapperPosts = $('.posts');
          wrapperPosts.append("<p>" + response.response[i].poster.name + ":" + "</p> \
          <p>" + response.response[i].content + "</p> \
          <button class='btn btn-lg btn-primary btn-block' type='submit'>Like</button> \
          <button postID=" + this.postID + " class='commentButton btn btn-lg btn-primary btn-block' type='submit'>Add Comment</button> \
          <input type='text' id='userComment' class='form-control' name='username' placeholder='Comment' required='' autofocus='' />");
          
          // Loop through comments to append them to DOM
          for (var j =  0; j < response.response[i].comments.length; j++) {
            wrapperPosts.append('<p style="font-color:blue">' + response.response[i].comments[j].content + '</p>');
          }
         }

         // When comment button is clicked, post a comment after ensuring postID is attached corrently to that button
         $('.commentButton').on('click', function(event) {
          var postID = $(event.currentTarget).attr('postID');
          event.preventDefault();
          book.userComment(postID);
          });
          
      }.bind(this),

      error: function (err) {
        console.error("Error updating posts");
      }
    });
 }

// Login function is called after login button gets clicked
$('#loginButton').on('click', function(event) {
    event.preventDefault();
    book.login();
    });

// Give user the option to post
// Automatically adds to server after ajax call
book.userPost = function() {

  var userPostContent = $('.userPost').val();

  $.ajax('https://fb.horizonsbootcamp.com/api/1.0/posts', {

    method: 'POST',
    data: {
      token: book.userToken,
      content: userPostContent
    },
    success: function() {
      console.log('You successfully posted');
    },
    error: function() {
      console.log('Unable to post');
    }
  });
}

$('#postButton').on('click', function(event) {
    event.preventDefault();
    book.userPost();
    });

// Give user the option to comment on a post (works the same way as posting)
book.userComment = function(postID) {

  var userCommentContent = $('#userComment').val();

  $.ajax('https://fb.horizonsbootcamp.com/api/1.0/posts/comments/' + postID, {

    method: 'POST',
    data: {
      token: book.userToken,
      content: userCommentContent
    },
    success: function() {
      console.log('You successfully commented');
    },
    error: function() {
      console.log('Unable to comment');
    }
  });
}