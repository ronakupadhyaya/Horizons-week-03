"use strict";

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('project', {
  title: {
    type: String
  },
  goal: {
    type: Number
  },
  description: {
    type: String
  },
  start: {
    type: Date
  },
  end: {
    type: Date
  },
  contributions: [{
    name: {type: String},
    amount: {type: Number}
  }],
  category: {
    type: String,
    enum: ['Famous Muppet Frogs', 'Current Black Presidents', 'The Pen Is Mightier', 'Famous Mothers', 'Drummers Named Ringo', '1-Letter words', 'Months That Start With "Feb"', 'How Many Fingers Am I Holding Up', 'Potent Potables']
  }
  // YOUR CODE HERE
});

module.exports = {
  Project: Project
}
