"use strict";

window.fb = window.fb || {};

fb.apiUrl = 'https://fb.horizonsbootcamp.com/api/1.0';
fb.apoKey = '575efe9b6b83c12e4c4f7963';
fb.apiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1zaGVuMkB3ZWxsZXNsZXkuZWR1In0._qEtxW5pjrqwHETGxP4jxC9Xqu1D6pvXD_MSFDbe2I0';

fb.RegisterCtrl = function(fname, lname, email, password, birthdate) {
  this.fname = $('#' + fname);
  this.lname = $('#' + lname);
  this.email = $("#" + email);
  this.pass = $('#' + password);
  this.birth = $('#' + birthdate);
  this.signUp = $('#signUp');

  // this makes sure the event handler is set
  this.initialize();
};

fb.RegisterCtrl.prototype = {
  initialize: function() {
    this.signUp.click(this.register.bind(this));
  },
  register: function() {
    $.ajax(fb.apiUrl + "/users/register", {
      method: "POST",
      data: {
        fname: this.fname.val(),
        lname: this.lname.val(),
        email: this.email.val(),
        password: this.pass.val(),
        birthMonth: this.birth.val().slice(5, 7),
        birthDay: this.birth.val().slice(8),
        birthYear: this.birth.val().slice(0,4)
      },
      success: function() {
        console.log('register is successful');
      },
      error: function() {
        console.error('register failed');
      }
    })
  }
}

var register = new fb.RegisterCtrl("firstName", "lastName", "email", "password", "birthDate");

fb.LoginCtrl = function(email, password) {
  this.email = $("#" + email);
  this.pass = $('#' + password);
  this.login = $('#login');
  this.initializ();
};

fb.LoginCtrl.prototype = {
  initializ: function() {
    this.login.click(this.signIn.bind(this));
  },
  signIn: function() {
    console.log('signin')
    $.ajax(fb.apiUrl + "/users/login", {
      method: "POST",
      data: {
        email: this.email.val(),
        password: this.pass.val(),
      },
      success: function() {
        console.log('login is successful');
      },
      error: function() {
        console.error('login failed');
      }
    })
  }
}

var login = new fb.LoginCtrl("emailLogin", "passwordLogin");


// var text = $('.text').val();
// var newPost = new fb.Post(text);

fb.Post = function(text, name, time, comments, like, id) {
  this.text = text;
  this.name = name;
  this.time = time;
  this.comments = comments;
  this.likes = like;
  this.id = id;
};

fb.Post.prototype = {
  post: function() {
    $.ajax(fb.apiUrl + "/posts", {
      method: "POST",
      data: {
        token: fb.apiToken,
        content: this.text
      },
      success: function() {
        console.log('post is successful');

      },
      error: function() {
        console.error('post failed');
      }
    })
  },
  comment: function(id, comment) {
    console.log(comment);
    $.ajax(fb.apiUrl + "/posts/comments/" + id, {
      method: "POST",
      data: {
        token: fb.apiToken,
        content: comment
      },
      success: function(response) {
        board.render();
      },
      error: function(err) {
        console.log(err);
        console.error('comment failed');
      }
    })
  },
  liking: function(id) {
    $.ajax(fb.apiUrl + "/posts/likes/" + id, {
      method: "GET",
      data: {
        token: fb.apiToken
      },
      success: function() {
        console.log('like is successful');
        board.render();
      },
      error: function() {
        console.error('like failed');
      }
    })
  },
  render: function(postId) {
    var wrapper = $('<div></div>');
    var cwrapper = $('<div class = "board"></div>')
    cwrapper.append('<p><img class = "profile" src = "img/mojia.jpg">' + this.name + '<span id = "time">' + ' ' + this.time + '</span></p>');
    cwrapper.append('<p>' + this.text + '</p>');
    cwrapper.append('<p><img class = "like" src = "img/like.png" post-id=' + this.id + '><span id = "likeCount">' + ' ' + this.likes.length + '</span></p>');
    cwrapper.append('<div class="form-group"><div class="col-sm-8"><input type="text" class="form-control postComment" placeholder="Comment"></div><input class="btn btn-default comment" type="button" value="Comment" post-id=' + this.id + '></div>');
    for (var i = 0; i < this.comments.length; i ++) {
      console.log(this.comments)
      var comment = this.comments[i].content;
      cwrapper.append('<p class = "comment">' + this.comments[i].content + '</p>');
    }
    wrapper.append(cwrapper);
    return wrapper.html();
  }
};

fb.Board = function() {
  this.posts = [];
};

fb.Board.prototype = {
  addPost: function() {
    var text = $('.text').val();
    var newPost = new fb.Post(text);
    newPost.post();
    $('.text').val('');
  },
  addComment: function(postId) {
    var comment = $('.postComment').val();
    this.posts.forEach(function(post) {
      if (post.id === postId) {
        post.comment(postId, comment);
      }
    })
    $('.postComment').val('');
    // board.render();
  },
  addLike: function(postId) {
    console.log('like');
    this.posts.forEach(function(post) {
      if (post.id === postId) {
        post.liking(postId);
      }
    })
    // this.likes.forEach(function(like) {
    //   if (like.id === )
    // })
    // board.render();
  },
  getPost: function() {
    $.ajax(fb.apiUrl + "/posts", {
      method: "GET",
      data: {
        token: fb.apiToken,
      },
      success: function(data) {
        var posts = data.response;
        console.log(posts);
        for (var i = 0; i < posts.length; i++){
          var text = posts[i].content;
          var name = posts[i].poster.name;
          var time = posts[i].createdAt.slice(5,16);
          var comments = posts[i].comments;
          var like = posts[i].likes;
          var id = posts[i]._id;
          var newPost = new fb.Post(text, name, time, comments, like, id);
          this.posts.unshift(newPost);
        }
        board.render();
      }.bind(this),
      error: function() {
        console.error('get posts failed');
      }
    })
  },
  render: function() {
    $('.board').html(this.posts.reduce(function(prev, cur) {
        return prev + cur.render(cur.id);
      }, ""))
    $('.comment').off();
    $('.comment').click(function(){
      console.log('hit');
      board.addComment($(this).attr('post-id'));
    });
    $('.like').off();
    $('.like').click(function() {
      console.log('addlike');
      board.addLike($(this).attr('post-id'));
    })
  }
};

var board = new fb.Board();
$('#submitPost').click(function(evt) {
  console.log(evt);
  board.addPost();
  board.getPost();
})
