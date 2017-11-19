/* My account:  l84swim@gmail.com ; EilleFacebook95@ */
var updateId = 0;

//Switch to log In mode
$('#login-container').on('click','#login-goto-button',function(){
  $('#first-name-container, #last-name-container').remove();
  $('#login-title').text('Log In');
  $('#login-goto-button').text('Register');
  $('#login-goto-button').attr('id','register-goto-button');
  $('#register-button').text('Log In');
  $('#register-button').attr('id','login-button');
});

//Switch to register mode
$('#login-container').on('click','#register-goto-button',function(){
  $(`<div class="input-container" id="first-name-container">
    <input class="input" id="first-name-input" placeholder="First Name">
    </input>
  </div>
  <div class="input-container" id="last-name-container">
    <input class="input" id="last-name-input" placeholder="Last Name">
    </input>
  </div>`).insertAfter('.header-container');
  $('#login-title').text('Register an account');
  $('#register-goto-button').text('Log In');
  $('#register-goto-button').attr('id','login-goto-button');
  $('#login-button').text('Register');
  $('#login-button').attr('id','register-button');
});

//Register user
$('#login-container').on('click','#register-button',function(){
  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    method: 'post',
    data:{
      fname:$('#first-name-input').val(),
      lname:$('#last-name-input').val(),
      email:$('#email-input').val(),
      password:$('#password-input').val()
    },
    success:function(){
      alert("Your new account has been created! To complete registration, please log in.");
      $('#first-name-container, #last-name-container').remove();
      $('#login-title').text('Log In');
      $('#login-goto-button').text('Register');
      $('#login-goto-button').attr('id','register-goto-button');
      $('#register-button').text('Log In');
      $('#register-button').attr('id','login-button');
    }
  });
});

//Log into account
$('#login-container').on('click','#login-button',function(){
  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    method: 'post',
    data:{
      email:$('#email-input').val(),
      password:$('#password-input').val()
    },
    success:function(data){
      alert("Login Successful");
      localStorage.setItem('token', data.response.token);
      window.location.href = 'newsFeed.html';
    },
    error:function(){
      alert("Incorrect email/password combination.");
    }
  });
});

//Log out
$('.logout-container').on('click','.logout-button',function(){
  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
    method: 'get',
    data:{
      token:localStorage.getItem('token')
    },
    success:function(data){
      window.location.href = 'login.html';
    }
  });
});

$('#news-feed-container').on('click','.like',function(){
  var postId = $(this).closest('.post-container').attr('id');
  submitLike(postId);
});

$('#news-feed-container').on('click','.response-cancel',function(){
  $(this).closest('.well').addClass('collapse');
});

$('.new-post-container').on('click','.make-new-post',function(){
  $(this).parent().children('.well').toggleClass('collapse');
});

$('.new-post-container').on('click','.post-cancel',function(){
  $(this).closest('.well').addClass('collapse');
});

$('.new-post-container').on('click','.submit-post',function(){
  var content = $(this).parent().children('input').val();
  $(this).parent().toggleClass('collapse');
  submitPost(content);
});

$('#news-feed-container').on('click','.reply-button',function(){
  $(this).closest('.post-container').find('.post-response-form').toggleClass('collapse');
});

$('#news-feed-container').on('click','.submit-response',function(){
  var postId = $(this).closest('.post-container').attr('id');
  var content = $(this).closest('.post-response-form').children('.form-control').val();
  postReply(postId,content);
});

var submitLike = function(postId){
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${postId}`,
    method: 'get',
    data:{
      token:localStorage.getItem('token')
    },
    success:function(data){
      getPosts();
    }
  });
};
var submitPost = function(content){
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts`,
    method: 'post',
    data:{
      token:localStorage.getItem('token'),
      content: content
    },
    success:function(){
      getPosts();
    }
  });
};
var postReply = function(postId,content){
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${postId}`,
    method: 'post',
    data:{
      token:localStorage.getItem('token'),
      content: content
    },
    success:function(){
      getPosts();
    }
  });
};
//Return html for a response, given (..........)
/*  response: {
      createdAt: Time,
      content: String,
      poster: {
        name: String,
        id: String
      }
    }
*/
var getComments = function(postId){
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${postId}`,
    method: 'get',
    data:{
      token:localStorage.getItem('token')
    },
    success:function(data){
      return data.response;
    }
  });
};
/*  response: Object[] {
      _id: String (id of post),
      poster: {
        name: String,
        id: String
      },
      content: String,
      createdAt: Time,
      comments: Object[], (See documentation above on getComments())
      likes: Object[] (see below)
        {
          id:String,
          name:String
        ]
    }
*/
var getPosts = function(){
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/1`,
    method: 'get',
    data:{
      token:localStorage.getItem('token')
    },
    success:function(data){
      renderNewsFeed(data.response);
      console.log('Updated');
      clearTimeout(updateId);
      updateId = setTimeout(getPosts,30000);
    }
  });
};
var renderNewsFeed = function(posts){
  $('#news-feed-container .post-container').remove();
  posts.forEach(function(post,index){
    $('#news-feed-container').append(createPostHTML(post));
  })
};
var createPostHTML = function(postObject){
  return   `<div class="post post-container" id="${postObject._id}">`
           +    createStatusHTML(postObject.content,postObject.createdAt,postObject.poster.name)
           +    createResponsesHTML(postObject.likes.length,postObject.comments)
           + `  </div>`;
};
var createStatusHTML = function(status,timeStamp,name){
  return `<div class="post status-container">
    <h3 class="post-author post-header">${name}</h3>
    <p class="time-stamp">${timeStamp}</p>
    <p class="post-content">${status}</p>
    <button class='post-button reply-button'>Reply</button>
    <button class="post-button like"><i class="glyphicon glyphicon-thumbs-up"></i></button>
  </div>`;
};
var createResponseHTML = function(commentObject){
  return `<div class="response">
      <p class= "responder-name">${commentObject.poster.name}</p>
      <p class="time-stamp">${commentObject.createdAt}</p>
      <p class="response-body">${commentObject.content}</p>
  </div>`;
};
var createResponsesHTML = function(numLikes,commentArray){
  var html = `<div class="post responses">
                <h3 class="post-responses post-header">${commentArray.length} Replies, ${numLikes} Likes</h3>`;
                commentArray.forEach(function(commentObject){
                  html+=createResponseHTML(commentObject);
                });
      html +=  createResponseWell();
  return html+=`</div>`;
};
var createResponseWell = function(){
  return `<div class="well post-response-form collapse">
    <input type="text" class="form-control" placeholder="Response">
    <button type="button" class="btn btn-default submit-response" id="addCardBtn59bb425e945ae950f5f2f459">Submit</button>
    <button type="button" class="btn btn-default response-cancel"><span class="glyphicon glyphicon-remove"></span></button>
  </div>`;
}
getPosts();
