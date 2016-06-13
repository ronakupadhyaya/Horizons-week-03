window.facebook = window.facebook || {};

facebook.Post = function(post){
	// this.posterId = posterId;
	// this.postId = postId;
	this.post = post;
	// this.fname = fname;
	// this.lname = lname;
};

facebook.Post.prototype = {

	getThisPost: function() = {
		return this.post;
	},
	getPost: function(post) {
		$.ajax("https://fb.horizonsbootcamp.com/api/1.0/posts", {
			method: "GET",
			data: {
				content: this.post},
			success: function(response) {
				console.log("success");
			}.bind(this),
			error: function(err) {
				console.log(err);
			}
		
		});
	},
	setPost: function(post) {
		$.ajax("https://fb.horizonsbootcamp.com/api/1.0/posts", {
			method: "POST",
			data: {
				content: this.post},
			success: function(response) {
				console.log("success");
			}.bind(this),
			error: function(err) {
				console.log(err);
			}
		
		});
	},
	render: function() {
		var wrapper = $('<div></div>');
		var postWrapper = $('<div class="panel panel-default"></div>');
		var panelHeading = $('<div class="panel-heading"></div>');
		var panelTitle = $('<h3 class="panel-title">' + this.fname + " " + this.lname + '</h3>');
		var panelBody = $('<div class="panel-body">' + this.getPost() + '</div>');
		var panelFooter = $('<div class="panel-footer">Like     Comment</div>');

		postWrapper.append(panelHeading);
		panelHeading.append(panelTitle);
		postWrapper.append(panelBody);
		postWrapper.append(panelFooter);
		wrapper.prepend(postWrapper);

		return wrapper.html();
	}
};

