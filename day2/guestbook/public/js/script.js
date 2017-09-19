"use strict";

// Your client-side code can go here
$(document).ready(function(){
  $('body').on('click', '.edit-post', function(e){
    var title = $(this).siblings('.title').val();
    var date = $(this).siblings('.date').val();
    var body = $(this).siblings('.body').val();
    $(this).siblings('input').show();
    $(this).siblings('.submit-change').show()
    // $.post()
  })
  $('body').on('click', '.submit-change', function(){
    var title = $(this).siblings('.title').val();
    var date = $(this).siblings('.date').val();
    var body = $(this).siblings('.body').val();
    var index = $(this).closest('.post-div').attr("id");
    var self = $(this);
    console.log(title, date, body, index);
    $.ajax({
      url: '/posts/edit/' + index,
      data: {
        title: title,
        date: date,
        body: body
      },
      method: "POST",
      success: function(resp){
        self.siblings('input').hide();
        self.siblings('.submit-change').hide()
      }
    } )
  });

  $('body').on('click', '.delete-post', function(){
    var index = $(this).closest('.post-div').attr("id");
    var self = $(this);
    $.ajax({
      url: '/posts/delete/' + index,
      method: "POST",
      success: function(resp){
        self.closest('.post-div').hide();
      }
    })
  });

  $('body').on('click', '.delete-post-author', function(){
    var author = $(this).siblings('.author').val();
    var self = $(this);
    $.ajax({
      url: '/posts/delete-author/',
      method: "POST",
      data:{
        author: author
      },
      success: function(resp){
        location.reload();
      }
    })
  })
})
