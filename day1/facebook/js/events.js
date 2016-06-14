"use strict";

window.facebook = window.facebook || {};

console.log('eagke');


$('#regissubmit').click(function(e){
    e.preventDefault();
    $.ajax('https://fb.horizonsbootcamp.com/api/1.0/users/register',   {
        data: {
           email: $('#regisemail').val(),
           password: $('#regispassword').val(),
           fname: $('#regisfname').val(),
           lname: $('#regislname').val(),
           birthMonth: $('#regisbirthmonth').val(),
           birthDay: $('#regisbirthday').val(),
           birthYear: $('#regisyear').val()
        } ,
        method: 'POST',
        success: function(response){
           setTimeout(function(){ $.ajax('https://fb.horizonsbootcamp.com/api/1.0/users/login', {
                data: {
                    email:$('#regisemail').val(),
                    password: $('#regispassword').val()
                } , 
                method: 'POST',
                success: function(response){
                
                user.id = response.response.id;
                user.token = response.response.token;
                
                setTimeout(function(){
                   $('#register').css("display", 'none');
                    $('#login').css("display", 'none');
                }, 1000)
                }
            })
            }, 1000)
        }
    })
})

$('#loginsubmit').click(function(e){
   e.preventDefault();
    console.log("in"); $.ajax('https://fb.horizonsbootcamp.com/api/1.0/users/login', {
        data: {
            email: $('#logemail').val(),
            password: $('#logpassword').val()
        } , 
        method: 'POST',
        success: function(response){
            console.log(response);
            user.id = response.response.id;
            user.token = response.response.token;
                
            setTimeout(function(){
                $('#register').css("display", 'none');
                $('#login').css("display", 'none');
                renderFromData();
                
            }, 1000)
        }
    
    
    }) 
})

$('#submitpost').click(function(e){
    
    e.preventDefault();
    $.ajax('https://fb.horizonsbootcamp.com/api/1.0/posts',{
        data: {
            token: user.token,
            content: $('#post').val()
        } ,
        method: 'POST',
        success: function(response){
            console.log(response);
            console.log("moare");
            console.log(unrender());
            renderFromData();
        }
    })
    
})
    
var renderFromData = function(){
    $.ajax('https://fb.horizonsbootcamp.com/api/1.0/posts', {
        data: {
            token: user.token,
        }, 
        method: 'GET',
        success: function(response){
//            response.response.forEach(function(item, index){
//            render(item.poster.name, item.content);
//            })
            
            response.response.forEach(function(item, index){
                user.posts.push(new facebook.post(item._id, item.poster.name, item.content, item.comments, item.likes));
                
            })
            
            console.log(user);
            
            console.log(user.posts);
            user.renderFeed();
            
            
$('.commentbutton').click(function(e){
    $.ajax('https://fb.horizonsbootcamp.com/api/1.0/posts/comments/' + $(this).attr('post-id'),{
        data: {
            token: user.token,
            content: $('#commenttext' + $(this).attr('post-id')).val()
        } ,
        method: 'POST',
        
        success: function(response){
            console.log(response);
            unrender();
            renderFromData();
        }
    })
})
$('.likebutton').click(function(e){
    $.ajax('https://fb.horizonsbootcamp.com/api/1.0/posts/likes/' + $(this).attr('post-id'),{
        data: {
            token: user.token,
        } ,
        method: 'GET',
        
        success: function(response){
            console.log(response);
            unrender();
            renderFromData();
        }
    })
})
            
        }
        
    })
    
}




//$('#commentbutton').click(function(e){
//    console.log("in");
//   console.log(this.attr('post-id')); 
    

console.log($('.commentbutton')); 


