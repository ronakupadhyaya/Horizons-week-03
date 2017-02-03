"use strict";

// Project model
var mongoose = require('mongoose');


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
  contributions: [{
    name: {
      type: String
    },
    amount:{
      type: Number
    }
  }],
  total: {
    type: Number
  }
  // category : {
  //   type: String,
  //   enum: [,]
  // }
  // YOUR CODE HERE
});

// title: make this field required
// goal: Type: Number, required
// description: Type: String
// start: Type: Date, required
// end: Type: Date, required

module.exports = {
  Project: Project
}
