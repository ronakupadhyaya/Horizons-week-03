"use strict";

window.fb = window.fb || {};

fb.getPosts = function(){
	//debugger;
	if(fb.userToken==null){
		return '';
	}
	console.log("getting post")
	$.ajax(fb.baseUrl+"/posts", {
		method: "GET",
		data:{
			token: fb.userToken
		},
		success: function(data){
			//debugger;
			console.log(data);
			fb.mountPage(fb.renderWall(data))	
		},
		error: function(err){

			console.log("error")
		}
	})
	//debugger;
	//console.log(returnData)
	//return returnData;
}

fb.renderWall=function(data){
	if(fb.userToken==null){
		return '';
	}
	var posts = '';
	//debugger;
	var wallPosts = data.response
	for(var i=0;i<wallPosts.length;i++){
		posts+=fb.renderPost(wallPosts[i]);
	}
	return posts;
}

fb.renderPost=function(post){
	var str="";
	str+="<div class='post'>\
		<div class='originalPost'>\
			<div class='poster'>"+post.poster.name+": </div>\
			<div class='content'>"+post.content+"</div><br>"
	str+=fb.renderLikes(post.likes)
	str+=fb.renderComments(post.comments)
	str+="</div></div>"
	return str;
}

fb.renderComments=function(comments){
	if(comments.length==0){
		return '';
	}
	var str = '<div class="commentsList">';
	for(var i=0;i<comments.length;i++){
		str+="<div class='comment'\
			<div class='commenter'>\
				"+comments[i].poster.name+": <br>\
				</div>\
				<div class='comment'>\
					"+comments[i].content+"\
				</div>\
				</div>"
	}
	str+="</div>"
	return str;
}

fb.renderLikes =function(likes){
	if(likes.length == 0){
		return '';
	}

	var str="<div class='likes'>\
			likes: "+likes.length;
	for(var i=0;i<likes.length-1;i++){
		str+=likes[i].name+', '
	}
	str+=likes[likes.length-1].name + "</div>"
	return str;
}