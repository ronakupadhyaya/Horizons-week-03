"use strict";

window.facebook = window.facebook || {};


facebook.user = function(id, token, posts){
    this.id = id;
    this.token = token;
    this.posts = [];
}

facebook.user.prototype.renderFeed = function(){
    this.posts.forEach(function(item){
        item.renderPosts(item.name, item.content);
        
    })
}
facebook.post = function(id, name, content, comments, likes) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.comments = comments;
    this.likes = likes;
}

var renderComments = function(name, content){
    var wrapper = $('<div></div>');
    var pre = $('<pre></pre>');
    var name = $('<h6>'+ name + '</h6>');
    var content = $('<p>' + content + '</p>');
    
    wrapper.append(pre);
    pre.append(name);
    pre.append(content);
    return wrapper.html();
}
var renderLikes = function(name){
    var wrapper = $('<div></div>');
    var pre = $('<pre></pre>');
    var name = $('<h6>'+name+'likes</h6>');
    
    wrapper.append(pre);
    pre.append(name);
    
    return wrapper.html();
}

facebook.post.prototype.renderPosts = function(name, content) {
    var wrapper = $('<div></div>');
    var pre = $('<pre id = "'+ this.id + '"></pre');
    var name = $('<h2>' + name + '</h2>');
    var content = $('<h4>' + content +'</h4>');
    var comment = $('<textarea id = "commenttext' + this.id + '" placeholder = "comment"></textarea>');
    var submitcomment = $('<button class = "btn btn-default commentbutton" placeholder = "submitcomment" post-id="'+ this.id + '">submitcomment</button>')
    var likepost = $('<button class = "btn btn-default likebutton" placeholder = "submitlike" post-id="'+ this.id + '">like</button>');
    
    wrapper.append(pre);
    pre.append(name);
    pre.append(content);
    pre.append(comment);
    pre.append(submitcomment);
    pre.append(likepost);
    
    wrapper.html();
    this.likes.forEach(function(item){
        pre.append(renderLikes(item.name));
    })
    this.comments.forEach(function(item){
        pre.append(renderComments(item.poster.name, item.content));
    })
    
    $('.newsfeed').append(wrapper);
    
}
var unrender = function(){
    $('.newsfeed').html("");
    user.posts = [];
}

