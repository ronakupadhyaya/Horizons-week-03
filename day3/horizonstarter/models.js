"use strict";

// Project model
var mongoose = require('mongoose');
var categories = [
  {name:'Famous Muppet Frogs',
  selected: false},
  { name: 'Current Black Presidents',
  selected: false},
  {name: 'The Pen Is Mightier',
  selected: false},
  { name: 'Famous Mothers',
  selected: false},
  {name: 'Drummers Named Ringo',
  selected: false},
  {name: '1-Letter Words',
  selected: false},
  {name: 'Months That Start With "Feb"',
  selected: false},
  {name: 'How Many Fingers Am I Holding Up',
  selected: false},
  {name: 'Potent Potables',
  selected: false}];
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
  description: {
    type: String,
    required: false
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  contributions: {
    type: [{
      name: String,
      amount: Number
    }]
  },
  category: {
    type: {
      name: String,
      selected: Boolean
    },
    required: true,
    enum: ['Famous Muppet Frogs', 'Current Black Presidents', 'The Pen Is Mightier', 'Famous Mothers',
          'Drummers Named Ringo', '1-Letter Words', 'Months That Start With "Feb"', 'How Many Fingers Am I Holding Up',
          'Potent Potables']
  }
});

module.exports = {
  Project: Project
}
