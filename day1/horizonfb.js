"use strict";

window.facebook = window.facebook || {};

facebook.Identification = function() {
  this.email = null;
  this.password = null;
  this.fname = null;
  this.lname = null;
  this.birthMonth = null;
  this.birthDay = null;
  this.birthYear = null;
  this.id = null;
  this.token = null;
};

facebook.Identification.prototype = {

sendRegistration: function(email, password, fname, lname, birthMonth, birthDay, birthYear)
{
    this.email = email;
    this.password = password;
    this.fname = fname;
    this.lname = lname;
    this.birthMonth = birthMonth;
    this.birthDay = birthDay;
    this.birthYear = birthYear;
    this.id = null;
    this.token = null; 
    $.ajax("https://fb.horizonsbootcamp.com/api/1.0/users/register", {
      method: "POST",
      data:
      {
        email: email,
        password: password,
        fname: fname,
        lname: lname,
        birthMonth: birthMonth,
        birthDay: birthDay,
        birthYear: birthYear
      },
      success: function(response){
        console.log("You have successfully logged in.");
      }.bind(this),
      error: function(error){
        console.error("You have provided an invalid email or password.");
      }
    });
},

sendLogin: function(email, password) 
{
    $.ajax("https://fb.horizonsbootcamp.com/api/1.0/users/login", {
      method: "POST",
      data:
      {
        email: email,
        password: password
      },
      success: function(response){
        this.id = response.response.id;
        this.token = response.response.token;
      }.bind(this),
      error: function(error){
        console.error("You have provided an invalid email or password");
      }
    })
},

sendPost: function(content) 
{
    $.ajax("https://fb.horizonsbootcamp.com/api/1.0/posts", {
      method: "POST",
      data:
      {
        content: content,
        token: this.token
      },
      success: function(response){
        console.log("You posted successfully");
      },
      error: function(error){
        console.error("You are an invalid user");
      }
    })
},

getPosts: function() 
{
    $.ajax("https://fb.horizonsbootcamp.com/api/1.0/posts", {
      method: "GET",
      data:
      {
        token: this.token
      },
      success: function(response){
        var content = [];
        var poster = [];
        var date = [];
        for (var i = 0; i < response.response.length; i++)
        {
        poster.push(response.response[i].poster.name);
        content.push(response.response[i].content);
        date.push(response.response[i].createdAt);
        }
        console.log(poster);
        console.log(content);
        console.log(date);
      },
      error: function(error){
        console.error("You are an invalid user");
      }
    })
}
}

$("#createButton").click(function(){
    if ($("#email").val() === "" ||
        $("#password").val() === "" ||
        $("#fname").val() === "" ||
        $("#lname").val() === "" ||
        $("#mbirth").val() === "" ||
        $("#dbirth").val() === "" ||
        $("#ybirth").val() === "")
    {
        console.error("Are you incapable of signing up properly?");
    }
    var newId = new facebook.Identification();
    newId.sendRegistration($("#email").val(), $("#password").val(), $("#fname").val(), $("#lname").val(), $("#mbirth").val(), $("#dbirth").val(), $("#ybirth").val());
})