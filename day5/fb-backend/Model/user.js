"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  fname:{
    type: String,
    required: true
  },
  lname:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  }
});

module.exports =  mongoose.model('User', UserSchema);
