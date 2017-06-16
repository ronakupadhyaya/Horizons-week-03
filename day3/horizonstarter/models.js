"use strict";

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
  title: {
    type: String,
    required: true // makes it required
  },
  goal: {
  	type: Number,
  	required: true
  },
  description: {
  	type: String
  },
  start: {
  	type: Date,
  	required: true
  },
  end: {
  	type: Date,
  	required: true
  },
  contributions: [{name: String, amount: Number}],
  category: {
    type: String,
    enum: ['Famous Muppet Frogs',
    'Current Black Presidents',
    'The Pen is Mighter',
    'Famous Mothers',
    'Drummers Named Ringo',
    '1-Letter Words',
    'Months That Start With "Feb"',
    'How Many Fingers Am I Holding Up',
    'Potent Potables'],
    required: true
  },
  imageURL: {
    type: String
  }
});

module.exports = {
  Project: Project
}
