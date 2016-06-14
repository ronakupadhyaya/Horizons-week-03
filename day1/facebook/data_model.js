"use strict";

window.fb = window.fb || {};

//console.log("IM HERE")

fb.baseUrl = "https://fb.horizonsbootcamp.com/api/1.0";

fb.Account = function(fname,lname,email,password,passwordConfirm,birthday,isNew){

	this.fname = fname;
	this.lname = lname;
	this.email = email;
	this.password = password;
	this.passwordConfirm = passwordConfirm;
	this.birthday = birthday;
	this.birthMonth = null;
	this.birthDay = null;
	this.birthYear = null;
	this.id = null;
	this.token = null;
	if(isNew){
		if(this.validate()){
			this.createAccount();
		}
	}

}

fb.Account.prototype = {

	validate: function(){
		if(this.fname =='' || typeof(this.fname)!='string'){
			throw "invalid first name";
		}
		//debugger;
		if(this.lname =='' || typeof(this.lname)!='string'){
			throw "invalid last name";
		}
		if(this.email=='' || typeof(this.email)!='string' || !this.email.includes('@')){
			throw "invalid email";
		}
		if(this.password != this.passwordConfirm){
			throw "passwords don't match";
		}
		if(this.password.length<6) {
			throw "password too short, must be at least 6 characters";
		}
		this.birthday = this.birthday.split('/');
		if(this.birthday.length!=3){
			throw "invalid birthday";
		}
		else{
			this.birthMonth = this.birthday[0];
			this.birthDay = this.birthday[1];
			this.birthYear = this.birthday[2];
		}
		if(parseFloat(this.birthMonth)<0 || parseFloat(this.birthMonth)>12){
			throw "invalid birth month";
		}
		if(parseFloat(this.birthDay)<0 || parseFloat(this.birthDay>31)){
			throw "invalid birth day";
		}
		if(parseFloat(this.birthYear)<1900 || parseFloat(this.birthYear>2000)){
			throw "invalid birth year, must be at least 16 to have account";
		}
		return true;
	},

	createAccount: function(){
		
		$.ajax(fb.baseUrl+"/users/register", {
			method: "POST",
      		data: {
		        email: this.email,
		        password: this.password,
		        fname: this.fname,
		        lname: this.lname,
		        birthMonth: this.birthMonth,
		        birthDay: this.birthDay,
		        birthYear: this.birthYear  
			},
			success: console.log,
			error: console.log
	    })
	    //debugger;
	    this.getToken();

	},

	setIdToken: function(id,token){
	    this.id = id;
	    this.token = token;
	},

	logout: function(){

	}

}










// fb.AccountDatabase = function() {
// 	this.accounts = [];
// }

// fb.AccountDatabase.prototype = {
	
// 	getAccountById: function(token){
// 		for(var i=0;i<this.accounts.length;i++){
// 			if(this.accounts[i].token == token){
// 				return this.accounts[i];
// 			}
// 		}
// 		return false;
// 	},

// 	getAccountExists: function(email,password,login){
// 		var accountExists = false;
// 		for(var i=0;i<this.accounts.length;i++){
// 			if(this.accounts[i].email == email && this.accounts[i].password == password){
// 				accountExists = true;
// 				account[i].login();
// 			}	
// 		}
// 		return accountExists;
// 	},

// 	addAccount: function(account) {
// 		this.accounts.push(account);
// 	}

// }

