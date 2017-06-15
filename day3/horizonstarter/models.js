"use strict";

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
  title: {
    type: String,
    required:true
  },
  // YOUR CODE HERE
  goal: {
    type: Number,
    required:true
  },
  description: {
    type: String
  },
  start: {
    type: Date,
    required:true
  },
  end: {
    type: Date,
    required:true
  },
  contribution:{
    type: Array  //an array of objects {name: ... , amount:...}
  }
});

module.exports = {
  Project: Project
}
