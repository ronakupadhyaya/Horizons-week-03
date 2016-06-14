"use strict";
window.facebook = window.facebook || {};


//Feed Object
facebook.Feed = function(){
  this.posts = [];
}

facebook.Feed.prototype = {

  getPosts: function(){

  },
  setPosts: function(){

  },
  render: function(feed) {
    console.log("#############");
    console.log(this.posts);
    for(var i = 0; i<this.posts.length; i++){
      var wrapper = '<div class="col-md- feed post">'+this.posts[i].name+this.posts[i].name+this.posts[i].id+'</div>';
      for(var j = 0; j<this.posts[i].comments.length; j++){
        var commentWrapper = '<div>'+this.posts[i].comments[j] +'</div>';
        wrapper.append(commentWrapper);
      }
    }
    console.log(wrapper);
  }
};

//Message Object
facebook.Post = function(content,name,id){
  this.content = content;
  this.name = name;
  this.id = id;
  this.comments = [];
}

facebook.Post.prototype = {
  getData: function(content){
    return this.content;
  },
  getName: function(){
    return this.name;
  },
  getId: function(){
    return this.id;
  },
};


facebook.JSONtoPost = function(data){
  var post = new facebook.Post(data.content, data.poster.name, data.poster.id);
  for(var i = 0; i<data.comments; i++){
    post.comments.push(data.comments[i]);
  }
  return post;
}

//Ajax Request for Messages.
facebook.requestMessages = function(feed){
  $.ajax(facebook.apiUrl + "posts", {
    method: "GET",
    data: {
      id: facebook.apiKey,
      token: facebook.apiToken,
    },
    success: function(data) {
      console.log("Recieved Data");
      for(var i = 0; i<data.response.length; i++){
        var post = facebook.JSONtoPost(data.response[i]);
        console.log("Created Post from JSON:" + post);
        //Add to post list.
        feed.posts.push(post);
      }
      console.log(feed.posts);
      return feed;
    },
    error: function(data){
      console.log("Error! Login Failed");
      console.log(data);
    },
  });
  feed.render();
  console.log(feed);

};

facebook.sendPosts = function(){

}











//End of File
