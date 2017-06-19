"use strict";

// Project model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Project = mongoose.model('Project', {
  title: {
    type: String,
    required: true
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
  contributions: {
    type: Array
  },
  category: {
    type: String,
    required: true,
    enum: [
    'Famous Muppet Frogs',
    'Current Black Presidents',
    'The Pen is Mightier',
    'Famous Mothers',
    'Drummers Named Ringo',
    '1-Letter Words',
    'Months That Start with "Feb"',
    'How Many Fingers Am I Holding Up',
    'Potent Potables'
    ]
  }
})

// ProjectSchema.virtual('raised').get(function() {
//     return this.contributions.map(function(el) {
//       return el.amount
//     }).reduce(function(a, b) {
//       return a+b
//     }, 0);
//   });
//   ProjectSchema.virtual('progress').get(function() {
//     if (this.goal > 0)
//     // Calculate percentage and round down.
//       return Math.floor(this.raised/this.goal*100);
//     return 0;
//   });

  // YOUR CODE HERE



module.exports = {
  Project: Project
}
