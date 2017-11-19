"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TokenSchema = new Schema({
  userId:{
    type: String,
    required: true,
    unique: true
  },
  token:{
    type: String,
    required: true
  },
  createdAt:{
    type: Date,
    required: true
  }
});

module.exports =  mongoose.model('Token', TokenSchema);
