"use strict";

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
  title: {
    type: String,
    require: true
  },
  // YOUR CODE HERE
  goal: {
    type: Number,
    require: true
  },
  description: {
    type: String
  },
  start: {
    type: Date,
    require: true
  },
  end: {
    type: Date,
    require: true
  },
  contributions: {
    type: Array
  },
  category: {
    type: String,
    emum: ["Famous Muppet Frogs",
    "Current Black Presidents",
    "The Pen Is Mightier",
    "Famous Mothers",
    "Drummers Named Ringo",
    "1-Letter Words",
    "Months That Start With 'Feb'",
    "How Many Fingers Am I Holding Up", 
    "Potent Potables"]
  }
});

module.exports = {
  Project: Project
}
