"use strict";

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
  title: {
    type: String,
    required: true
  },
  // YOUR CODE HERE
  goal: {
    type: Number,
    required: true
  },
  description: String,
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  contributions:{
    type:Array
    //TODO contains an array of objects with name and amount properties
  },
  totalContributions:{
    type: Number
  },
  goalMet:{
    type:Number
  }

});

module.exports = {
  Project: Project
}
