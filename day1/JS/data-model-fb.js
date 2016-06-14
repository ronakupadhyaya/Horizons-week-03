window.fb = window.fb || {};

// Users  
var token; 

console.log("test");

fb.User = function(email, password, fname, lname, birthMonth, birthDay, birthYear){
		this.email = email; 
		this.password = password; 
		this.fname = fname; 
		this.lname = lname; 
		this.birthMonth = birthMonth; 
		this.birthDay = birthDay; 
		this.birthYear = birthYear; 
	}

fb.User.prototype = {

	createUser: function() {
		$.ajax(fb.apiUrl+ "users/register", {
			method: "POST", 
			data: {
				email: this.email,
				password: this.password,
				fname: this.fname, 
				lname: this.lname, 
				birthMonth: this.birthMonth, 
				birthDay: this.birthDay,
				birthYear: this.birthYear
			}, 
			success: function (data){
				// fb.User.fromJSON(data); 
				console.log("You're registered!" + JSON.stringify(data));
				$('#registration-form').hide();
				$('#login-form').show();
			}.bind(this), 
			error: function (err){
				console.error("Did not successfully register:" + JSON.stringify(err)); 
			}
		});
	}, 

	userLogin: function(){ //when you're logging in, you're checking what you enter 
		// debugger;
		$.ajax(fb.apiUrl+"users/login", {	// with waht already exists. how do i do that 
			method: "POST", 
			data: {
				email: this.email,
				password: this.password
			}, 
			success: function(data){
				token = data.response.token; 
				console.log(token); 
				console.log("You're signed in!" + JSON.stringify(data));
				$('#login-form').hide();
				$('#newsfeedPosts').show(); 
				fb.updateNewsfeed(); 
				}.bind(this), 
			error: function (err){
				console.error("Did not successfully sign in:" + JSON.stringify(err));
				} 
		});
	}

}; 

//POSTS 


fb.newsfeed = [];
fb.updateNewsfeed = function() {
		$.ajax(fb.apiUrl+"posts", {
			method: "GET", 
			data: {
				// _id: this._id, 
				// poster: this.poster,
				// content: this.content, 
				// createdAt: this.createdAt, 
				// comments: this.comments, 
				// likes: this.likes, 
				token: token				//authorization
			}, 
			success: function (data){

				for(var i = 0; i < data.response.length; i++) {
					fb.newsfeed.push(data.response[i]);
				} 
				this.renderNewsfeed();
			}.bind(this), 
			error: function (err){
				console.error("Did not successfully register:" + JSON.stringify(err)); 
			}
	});

}

fb.render = function(arg){

	var newsfeedPostWrapper = $('<div class="newsfeedPost"> </div>'); 
	var contentWrapper = $('<div class="content">'+ arg.content +' </div>');
	var createdAtWrapper = $('<div class="createdAt">'+arg.createdAt+'</div>'); 
	var commentsContainer = $('<div class="comments-container"></div>')
		
		for(var i =0; i < arg.comments.length;i++){
			var commentsWrapper = $(' <div class="comments"></div>');
			var commentPoster = $('<div class="comment-poster">'+ arg.comments[i].name +'</div>');
			var commentName = $('<span id="comment-name"></span>'); 
			var commentContent = $('<div class="comment-content">' + arg.comments[i].content + '</div>'); 
			var commentCreatedAt = $(' <div class="comment-createdAt"></div>');


			commentsContainer.append(commentsWrapper); 
			commentsWrapper.append(commentPoster);
			commentsWrapper.append(commentName);
			commentsWrapper.append(commentContent);
			commentsWrapper.append(commentCreatedAt);

		}

	var likesWrapper = $('<div class="likes">'+ arg.likes.length + '</div>')

	
	newsfeedPostWrapper.append(contentWrapper);
	newsfeedPostWrapper.append(createdAtWrapper);
	newsfeedPostWrapper.append(commentsContainer);
	newsfeedPostWrapper.append(likesWrapper);


	return newsfeedPostWrapper;
	
}

fb.renderNewsfeed = function(){
	var wrapper = $('<div class="newsfeed"></div>'); 
	
	for(var i = 0; i < fb.newsfeed.length; i++){
		wrapper.append(fb.render(fb.newsfeed[i]));
	}

	$(".newsfeed").html(wrapper.html())

}

