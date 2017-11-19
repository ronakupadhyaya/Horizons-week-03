"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  poster:{
    type: Object,
    required: true
  },
  content:{
    type: String,
    required: true
  },
  likes:{
    type: Array,
    default: []
  },
  comments:{
    type: Array,
    default: []
  },
  createdAt:{
    type: Date,
    required: true
  }
});

module.exports =  mongoose.model('Post', PostSchema);
