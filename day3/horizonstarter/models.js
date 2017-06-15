"use strict";

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
  title: {
    type: String,
  },
  // YOUR CODE HERE
  goal: Number,
  description: String,
  start: Date,
  end: Date,
  contributions: Array,
  category: {
    type: String,
    enum: ["Famous Muppet Frogs", "Current Black Presidents", "The Pen Is Mightier", "Famous Mothers",
    "Drummers Named Ringo", "1-Letter Words", "Months That Start With Feb", "How Many Fingers Am I Holding Up",
    "Potent Potables"]
  },
  url : String
});

module.exports = {
  Project: Project
}
