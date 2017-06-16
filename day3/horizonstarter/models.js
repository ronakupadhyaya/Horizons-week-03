"use strict";

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
  title: String,
  goal: Number,
  description: String,
  start: Date,
  end: Date,
  contributions: [{
    name: String,
    amount: Number
  }],
  category: String

});

module.exports = {
  Project: Project
  //MAKING A PROJECT FILE AVAILABLE
}
