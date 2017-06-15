"use strict";
// title: make this field required
// goal: Type: Number, required
// description: Type: String
// start: Type: Date, required
// end: Type: Date, required

// Project model
var mongoose = require('mongoose');

var options = ['Famous Muppet Frogs', 'Current Black Presidents', 'The Pen is Mightier', 'Famous Mothers', 'Drummers Named Ringo', '1-Letter Words', 'Months That Start With "Feb"', 'How Many Fingers Am I Holding Up', 'Potent Potables'];

var Project = mongoose.model('Project', {
  title: {
    type: String,
    required: true
  },
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
  contributions: [{
    name: String,
    amount: Number
  }],
  totalAmount: Number,
  percentage: Number,
  category: {
    type: String,
    required: true,
    enum: options
  }
});

module.exports = {
  Project: Project
}
