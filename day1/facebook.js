"use strict";

window.facebook = {};



facebook.mount = function() {
    $("#registerButton").click(function(event) {
        event.preventDefault();
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var email = $("#emailRegister").val();
        var password = $("#password").val();
        var birthDay = $("#birthDay").val();
        var birthMonth = $("#birthMonth").val();
        var birthYear = $("#birthYear").val();
        console.log(firstName + lastName + email + password + birthDay + birthMonth + birthYear);
        $.ajax("https://fb.horizonsbootcamp.com/api/1.0/users/register", {
            method: "POST",
            data: {
                email: email,
                password: password,
                fname: firstName,
                lname: lastName,
                birthDay: birthDay,
                birthMonth: birthMonth,
                birthYear: birthYear
            },
            success: console.alert("Your account has been successfully made!"),
            failure: console.error("Please check the content fields and try again!")
        });
    });
};
