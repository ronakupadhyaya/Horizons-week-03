"use strict";

window.facebook = window.facebook || {};

facebook.Url = "https://fb.horizonsbootcamp.com/api/1.0";

facebook.User = function(email, password) {
  this.email = email;
  this.password = password;
  this.fname = 'Creative';
  this.lname = 'Name';
  this.authToken = null;
  this.id = null;
  this.feedHead = null;
};

facebook.User.prototype = {
  register: function() {
    $.ajax(facebook.Url + '/users/register', {
      method: 'POST',
      data: {
        email: "gbc1729@gmail.com",
        password: 'Password',
        fname: this.fname,
        lname: this.lname,
        birthMonth: 6,
        birthDay: 13,
        birthYear: 2016,
      },
      success: function() {
        console.log('User Registration Succeeded');
      },
      error: function(e) {
        console.log(e);
      },
    });
  },

  login: function() {
    $.ajax(facebook.Url + '/users/login', {
      method: 'POST',
      data: {
        email: this.email,
        password: this.password,
      },
      success: function(data) {
        this.authToken = data.response.token;
        this.id = data.response.id;
        console.log('Login Succeeded');
        this.loadPosts(1);
      }.bind(this),
      error: function(e) {
        console.log('Login Failed');
      },
    });
  },

  loadPosts: function(pages) {
    $.ajax(facebook.Url + '/posts/' + pages, {
      method: 'GET',
      data: {
        token: this.authToken,
      },
      success: function(data) {
        this.feedHead = data.response[0]._id;
        for (var i = 0; i < data.response.length; i++) {
          var post = new facebook.Post(data.response[i].poster.name, data.response[i].poster.id, data.response[i].content, data.response[i].createdAt, data.response[i].comments, data.response[i].likes);
          $('#feed').append(post.render());
        }
        console.log('Successfully loaded the feed');
      }.bind(this),
      error: function() {
        console.log('Failed to get posts');
      },
    });
  },

  updateFeed: function() {
    $.ajax(facebook.Url + '/posts', {
      method: 'GET',
      data: {
        token: this.authToken,
      },
      success: function(data) {
        if (this.feedHead != data.response[0]._id) {
          var post = new facebook.Post(data.response[0].poster.name, data.response[0].poster.id, data.response[0].content, data.response[0].createdAt, data.response[0].comments, data.response[0].likes);
          $('#feed').prepend(post.render());
          console.log('Successfully updated the feed');
          this.feedHead = data.response[0]._id;
        }
        console.log('no changes detected');
      }.bind(this),
      error: function() {
        console.log('Failed to get posts');
      },
    });
  },

  publishPost: function(content) {
    $.ajax(facebook.Url + '/posts', {
      method: 'POST',
      data: {
        token: this.authToken,
        content: content,
      },
      success: function(data) {
        console.log('Successfully published a post');
        var post = new facebook.Post(this.fname + this.lname, this.id, content, '2016-06-13', [], []);
        $('#feed').prepend(post.render());
      }.bind(this),
      error: function() {
        console.log('Failed to publish posts');
      },
    });
  },

};

facebook.Post = function(posterName, posterId, content, createdAt, comments, likes) {
  this.poster = {
    name: posterName,
    id: posterId
  };
  this.content = content;
  this.createdAt = createdAt;
  this.comments = comments;
  this.likes = likes;
}

facebook.Post.prototype = {
  render: function() {
    var wrapper = $('<div class="panel panel-default" style="margin-top: 15px;"></div>');
    var heading = $('<div class="panel-heading post-heading"><img src="https://avatars3.githubusercontent.com/u/6347720?s=80" id="poster-img"/><a href="#" id="' + this.poster.id + '"><h5 id="poster-name">' + this.poster.name + '</h5></a><h5 style="margin-left: auto">' + this.createdAt.substring(5, 10) + '</h5></div>');
    var body = $('<div class="panel-body"></div>');
    var content = $('<div id="feed-post"><p>' + this.content + '</p></div>');
    var footer = $('<div class="panel-footer">' + this.likes.length + ' people liked this</div>');
    var bottom = $('<div class="panel-body"></div>');
    var comments = $('<div id="comments"></div>');
    if (this.comments.length == 0) {
      comments.append($('<p>' + 'no comments' + '</p>'))
    } else {
      for (var i = 0; i < this.comments.length; i++) {
        comments.append($('<p>' + this.comments[i].content + '</p>'));
      }
    }

    wrapper.append(heading);
    wrapper.append(body);
    body.append(content);
    wrapper.append(footer);
    wrapper.append(bottom);
    bottom.append(comments);
    return wrapper;
  }
}
