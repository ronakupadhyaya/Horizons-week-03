window.facebook = window.facebook || {};

facebook.Post = function(posterId, postId, post, fname, lname){
	this.posterId = posterId;
	this.postId = postId;
	this.post = post;
	this.fname = fname;
	this.lname = lname;
};

facebook.Post.prototype = {
	getPosterId: function() {
		return this.posterId;
	},
	getPost: function() = {
		return this.post;
	}
	setPost: function(post) {

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

