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
  },
  category: {
    type: String,
    enum: [
    'Famous Muppet Frogs',
    'Current Black Presidents',
    'The Pen Is Mightier',
    'Famous Mothers',
    'Drummers Named Ringo',
    '1-Letter Words',
    'Months That Start With "Feb"',
    'How Many Fingers Am I Holding Up',
    'Potent Potables'
    ]
  }


});

module.exports = {
  Project: Project
}
