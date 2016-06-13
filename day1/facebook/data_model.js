"use strict";

window.fb = window.fb || {};

fb.baseUrl = "https://fb.horizonsbootcamp.com/api/1.0";

fb.Account = function(fname,lname,email,password,passwordConfirm,birthday){

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

	if(this.validate()){
		this.createAccount();
	}

}

fb.Account.prototype = {

	validate: function(){
		if(this.fname =='' || typeof(this.fname)!='string'){
			throw "invalid first name";
		}
		debugger;
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

	createAccount: function(accountDatabase){
		
		$.ajax(fb.baseUrl+"/users/register", {
      		data: {
		        email: this.email,
		        password: this.password,
		        fname: this.fname,
		        lname: this.lname,
		        birthMonth: this.birthMonth,
		        birthDay: this.birthDay,
		        birthYear: this.birthYear  
		      },
	      success: console.log("true")
	    })
	    accountDatabase.addAccount(this);
	    this.id = accountDatabase.login(this.email,this.password)[0];
	    this.token = accountDatabase.login(this.email,this.password)[1];
	}
}

fb.AccountDatabase = function() {
	this.accounts = [];
}

fb.AccountDatabase.prototype = {
	
	getAccountById: function(token){
		for(var i=0;i<this.accounts.length;i++){
			if(this.accounts[i].token == token){
				return this.accounts[i];
			}
		}
		return false;
	},

	getAccountForLogin: function(email,password){
		var haveLoggedIn = false;
		for(var i=0;i<this.accounts.length;i++){
			if(this.accounts[i].email == email && this.accounts[i].password == password){
				$.ajax(fb.baseUrl+"/users/login", {
	      		data: {
			        email: email,
			        password: password
			      },
		      success: true
		    })
			}
			haveLoggedIn = true;
		}
		if(!haveLoggedIn){
			throw "No account for this email and password combination"
		}
	}

	addAccount: function(account) {
		this.accounts.push(account);
	}

}