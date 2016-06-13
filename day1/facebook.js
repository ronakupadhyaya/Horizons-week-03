window.facebook = window.facebook || {};


facebook.Registration = function() {
	this.apiUrl = "https://fb.horizonsbootcamp.com/api/1.0";
	this.emailInputField = $('#email');
	this.passwordInputField = $('#password');
	this.fnameInputField = $('#fname');
	this.lnameInputField = $('#lname');
	this.birthMonthInputField = $('#MM');
	this.birthDayInputField = $('#DD');
	this.birthYearInputField = $('#year');

};

facebook.Registration.prototype = {
	 clearField: function(jqField) {
    // YOUR CODE HERE
    jqField.val("");
 	 },

	sendRegistration: function() {

		$.ajax({
	      method: "POST",
	      url: this.apiUrl + "/users/register",
				
	      data: {
	        email: this.emailInputField.val(),
	        password: this.passwordInputField.val(),
	        fname: this.fnameInputField.val(),
	        lname: this.lnameInputField.val(),
	        birthMonth: this.birthMonthInputField.val(),
	        birthDay: this.birthDayInputField.val(),
	        birthYear: this.birthYearInputField.val()
	      },
			success: function(response) {
					console.log(response);
			},
			error: function(err) {
					console.log(err);
			}
	     
	    });
	}
};

facebook.Login = function() {
	this.apiUrl = "https://fb.horizonsbootcamp.com/api/1.0";
	this.usernameInputField = $('#user');
	this.pwInputField = $('#pw');
	this.token = null;
};

facebook.Login.prototype = {
	clearField: function(jqField) {
    // YOUR CODE HERE
    jqField.val("");
 	 },

 	 loggedIn: function() {

 	 	$.ajax({
	      method: "POST",
	      url: this.apiUrl + "/users/login",
				
	      data: {
	        email: this.usernameInputField.val(),
	        password: this.pwInputField.val(),
	       
	      },

		success: function(response) {
			this.token = response.response.token;
				console.log(response);
				console.log(response.response.token);
				console.log(this.token);
		}.bind(this),

		error: function(err) {
				console.log(err);
		}
	     
	    });

 	 }

};

facebook.Post = function(post){
	// this.posterId = posterId;
	// this.postId = postId;
	this.post = post;
	// this.fname = fname;
	// this.lname = lname;
};


facebook.Post.prototype = {

	getThisPost: function() {
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

