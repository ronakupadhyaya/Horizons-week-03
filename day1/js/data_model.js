var userId = ""; //user's id
var userToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNyaXNsbG9wMjRAZ21haWwuY29tIn0.qlZbqPIMuetQvTke7X9kVsO8Xf43DDAeLd5-VAmuJKI"; //user's token

var facebook = {};

facebook.Post = function(id, name, content, timestamp) { //comments? likes?
	this.id = id;
	this.name = name;
	this.content = content;
	this.timestamp = timestamp;
	this.comments = [];
	this.likes = [];
} 

facebook.Post.prototype = {

	getId: function(){
		return this.id;
	},

	getName: function(){
		return this.name;
	},

	getContent: function(){
		return this.content;
	},

	getTimestamp: function(){
		return this.timestamp;
	},

	getComments: function(){
		return this.comments;
	},

	getLikes: function(){
		return this.likes;
	},

	render: function(){
		var wrapper = $('<div class="panel panel-primary"></div>');
		var heading = $('<div class="panel-heading"></div>');
		var name = $('<span class="postName">' +  this.getName() + ' </span>');
		var timestamp = $('<span class="timestamp">' +  this.getTimestamp() + '</span>')
		var body = $('<div class="panel-body">' + this.getContent() + '</div>');
		var likes = $('<div class="likes">' + this.getLikes().length + ' likes</div>');
		var comments = $('<div class="panel-footer" id="comments"></div>');
		var commentList = this.getComments();
		for(var i = 0; i < commentList.length; i++){
			var comment = $('<div class="comment"</div>');
			comment.append('<span>' + commentList[i].name + " " + commentList[i].createdAt + " " + commentList[i].content + '</span');
		}
		var commentBarContainer = $('<div class="panel-footer" id="commentBarContainer"></div>');
		var commentBar = $('<form class="commentBar ">\
            <div class="form-group">\
              <input type="text" class="form-control" placeholder="Comment" id="commentBar" >\
            </div>\
            <button type="submit" class="btn btn-default" id="loginButton" postId = "' + this.id + '">Comment</button>\
          </form>');
        
        wrapper.append(heading);
        heading.append(name);
        heading.append(timestamp);
        wrapper.append(body);
        body.append(likes);
        body.append(comments);
        body.append(commentBarContainer);
        commentBarContainer.append(commentBar);
        return wrapper.html();   
	}
};

facebook.Feed = function() {
	this.posts = [];
}

facebook.Feed.prototype = {

	addPost: function(id, name, content, timestamp){ //comments and likes too
		var post = new facebook.Post(id, name, content, timestamp);
		this.posts.push(post);
		return post.getId();
	},

	getPosts: function(){
		return this.posts;
	},

	concatPosts: function(morePosts){
		this.posts = this.posts.concat(morePosts);
	},

	render: function(){
		var wrapper = $('<div class="panel panel-default news-feed col-md-6  col-sm-12 col-xs-12"></div>');
		wrapper.html(this.posts.reduce(function(prev, cur) {
	      return prev + cur.render();
	    }, ""));
	    return wrapper;
	}
};

facebook.mount = function(feed){
	$(".news-feed-anchor").empty();
	$(".news-feed-anchor").append(feed.render());
}

//-----------------------------------------------------------------------------------------------
//Ajax stuff
//-----------------------------------------------------------------------------------------------

//put scrollbar at top when pages is refreshed


//show main screen, hide post-login screen

$(".second").hide();
var screen = "main";
// $(".main").hide();

var feed = new facebook.Feed();
//login

$(".navbar-form").on("submit", function(e){
	e.preventDefault();

	$.ajax("https://fb.horizonsbootcamp.com/api/1.0/users/login", {
		method: "POST",
		data: {
			email: $("#email").val(),
			password: $("#pwd").val(),
		},
		success: function(data){
			userId = data.response.id;
			userToken = data.response.token;
			$(".main").hide();
			$(".second").show();
			screen = "second";
			load();
		},
		error: function(msg){
			alert("Username/password incorrect.");
		}
	});
});

//logout

$(".logout").on("click", function(e){

	$(".second").hide();
	$(".main").show();
	screen = "main";
});

//loads
var decCount = 1;

var load = function(){
	$.ajax({
		url: "https://fb.horizonsbootcamp.com/api/1.0/posts/" + decCount,
		method: "GET",
		data: {
			token: userToken
		},
		success: function(data){
			var posts = data.response;
			for(var i = 0; i < posts.length; i++){
				feed.addPost(posts[i]._id, posts[i].poster.name, posts[i].content, posts[i].createdAt);
			}
			if(feed.getPosts().length%10 === 0 && decCount < 2){
				decCount++;
				load();
			}
			facebook.mount(feed);
		},
		error: function(msg){
			console.log(msg);
		}
	});
}

//render more posts when user scrolls to bottom of the page
$(window).scroll(function() {   
   if($(window).scrollTop() + $(window).height() == $(document).height() && screen === "second") {
       load();
   }
});





