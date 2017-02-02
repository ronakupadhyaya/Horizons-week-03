"use strict";

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
  // title: {
  //   type: String,
  //   required
  // }
  // goal: {
  //   type: Number,
  //   required
  // }
  // description: {
  //   type: String,
  //   required
  // }
  // start: {
  //   type: String,
  //   required
  // }
  // end: {
  //   type: Date,
  //   required
  // }
});

module.exports = {
  Project: Project
}
