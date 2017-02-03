"use strict";

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
  title:{
    type: String,
    required: true
  },
  goal: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  start: {
    type: String,
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
  }
});

module.exports = {
  Project: Project
  // mongoose.Model('Famous Muppet Frogs', {
  //   make: {
  //     type: String,
  //     enum: ['Kermit']
  //   }
  // })
  // mongoose.Model('Famous Muppet Frogs', {
  //   make: {
  //     type: String,
  //     enum: ['Kermit']
  //   }
  // })
}
