'use strict';
window.fb = window.fb || {};
fb.Person = function(id,token,fname,lname){
    this.id = id || '';
    this.token = token || '';
    this.fname = fname || '';
    this.lname = lname || '';
}