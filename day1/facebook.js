window.facebook = window.facebook || {};

var token;

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
			token = response.response.token;
			this.get10Post();
				console.log(token);
		}.bind(this),

		error: function(err) {
				console.log(err);
		}
	     
	    });

 	 },

 	get10Post: function() {
 		
	    $.ajax("https://fb.horizonsbootcamp.com/api/1.0/posts", {
		
		method: "GET",
		data: {

			token: token,
			 },
		success: function(response) {
			console.log(response);
			for (var i = 0; i < response.response.length; i++) {
				var name = response.response[i].poster.name;
				console.log(name);
				var post = response.response[i].content;
				console.log(post);
				this.render(name,post);
			}

		}.bind(this),
		error: function(err) {
			console.log(err);
		}
	
	});
	},

	render: function(name, post) {
		console.log("I have reached render");
		
		var postWrapper = $('<div class="panel panel-default"></div>');
		var panelHeading = $('<div class="panel-heading"></div>');
		var panelTitle = $('<h3 class="panel-title">' + name + '</h3>');
		var panelBody = $('<div class="panel-body">' + post + '</div>');
		var panelFooter = $('<div class="panel-footer">Like     Comment</div>');


		postWrapper.append(panelHeading);
		panelHeading.append(panelTitle);
		postWrapper.append(panelBody);
		postWrapper.append(panelFooter);
		$("#wrapper").prepend(postWrapper);
		
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

