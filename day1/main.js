var url = "https://fb.horizonsbootcamp.com/api/1.0"
//Register 
$(".register-button").click(function(e){
	var firstName = $(".firstName").val();
    var lastName = $(".lastName").val();
    var email = $("#register-email").val();
    var password = $("#register-password").val();
    var confirmpassword = $("#confirm-password").val();
    var month = $("#month").val();
    var day = $("#day").val();
    var year = $("#year").val();
    if(!firstName || !lastName || !email || !password || !confirmpassword || !month || !day || !year) {
        alert("Missing fields");
        return;
    }
    if(password !== confirmpassword) {
        alert("Passwords don't match");
        return;
    }
register(firstName, lastName, email, password, confirmpassword, month, day, year);
})
var register = function(firstName, lastName, email, password, confirmpassword, month, day, year) {
    $.ajax(url + "/users/register", {
        method: "POST",
        data: {
            email: email,
            password: password,
            fname: firstName,
            lname: lastName,
            birthMonth: month,
            birthDay: day,
            birthYear: year
        },
        success: function(response) {
        	console.log("Success");
        },
        error: function(response) {
        	console.error("Error")
        }
    });
}
var token = null; 
var userID = null;
var login = function(){
	console.log("login");
	$.ajax(url + "/users/login",{
		method: "POST", 
		data: {
			email: $("#login-email").val(),
			password: $("#login-password").val(), 
		}, 
		success: function(response){
			console.log("Success")
			userID = response.response.id
			token = response.response.token
			posts();
			
		}, 
		error:function(response){
			console.error("Error")
		}
		});
}
$(".login button").on("click", function(event){
	event.preventDefault();
	login();
});
var post = [];
var posts = function(){
	$.ajax(url + "/posts", {
		method: "GET", 
		data:{
			token:token 
		}, 
		success: function(response){
			console.log("Success")
		for(var i = 0; i < response.response.length; i++){
			post.push(response.response[i]);
		 }	
		}, 
		error:function(response){
			console.error("Error")
		}
		});
}

// var render = function(){
// 	post = post
// 	for(var i = 0; i < post.length; i++){ 
		
// 		var postWrapper = $('<div class ="box"></div>'); 
// 		var nameWrapper = $('<div class="poster"></div>');
// 		$(".board").append(postWrapper);
// 		postWrapper.append(nameWrapper);
// 		nameWrapper.append(post[i].poster.name);

// 	}
// }
var render = function() {
    for (var i = 0; i < post.length; i++) {
        var postwrapper = $('<div class="box"></div>');
        var namewrapper = $('<div class="poster"></div>');
        var contentwrapper = $('<div class="content"></div>');
        var likebutton = $('<button class="like-btn">Like</button>');
        var commentbutton = $('<button class="comment-btn">Comment</button>');
        $(".board").append(postwrapper);
        postwrapper.append(namewrapper);
        postwrapper.append(contentwrapper);
        postwrapper.append(likebutton);
        postwrapper.append(commentbutton);
        namewrapper.append(post[i].poster.name);
        contentwrapper.append(post[i].content)
   }
}
$(".post-btn").on("click", function(event){
	event.preventDefault();
	
});