"use strict";

window.facebook = window.facebook || {};


$("#signInBtn").on('click',function(e){
  console.log($("#inputEmail3").val());
  console.log($("#inputPassword3").val());
  $.ajax(facebook.apiUrl + "users/login", {
    method: "POST",
    data: {
      email: $.trim($("#inputEmail3").val()),
      password: $.trim($("#inputPassword3").val())
    },
    success: function(data) {
      console.log(data);
    },
    error: function(data){
      console.log("Error! Login Failed");
      console.log(data);
    },
  });
  e.preventDefault();
});

$("#RegisterDta").on('click', function(e){

  // console.log("clicked");
  // console.log($("#email").val());
  // console.log($("#password").val());
  // console.log($("#first_name").val());
  // console.log($("#last_name").val());
  // console.log($("#birthMonthinput").val());
  // console.log($("#birthDayinput").val());
  // console.log($("#birthYearinput").val());

  $.ajax(facebook.apiUrl + "users/register",{
    method: "POST",
    data: {
      email: $("#email").val(),
      password: $("#password").val(),
      fname: $("#first_name").val(),
      lname: $("#last_name").val(),
      birthMonth: $("#birthMonthinput").val(),
      birthDay: $("#birthDayinput").val(),
      birthYear: $("#birthYearinput").val()
    },
    success: function(data) {
      console.log(data);
    },
    error: function(data){
      console.log(data);
      console.log("Error! Login Failed");
    },

  });
  e.preventDefault();
});
