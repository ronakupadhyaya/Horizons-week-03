"use strict";

// Project model
var mongoose = require('mongoose');
var catArray = [
  'Famous Muppet Frogs',
  'Current Black Presidents',
  'The Pen Is Mightier',
  'Famous Mothers',
  'Drummers Named Ringo',
  '1-Letter Words',
  'Months That Start With "Feb"',
  'How Many Fingers Am I Holding Up',
  'Potent Potables'
];

var Project = mongoose.model('Project', {
  title: {
    type: String
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
  contributions: [{
    name: String,
    amount: Number
  }],
  category: {
    type: String,
    enum: catArray
  }

});

module.exports = {
  Project: Project,
  categories: catArray
}
