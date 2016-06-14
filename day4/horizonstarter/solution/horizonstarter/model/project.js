"use strict";

// Project model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProjectSchema = new Schema({
  title: String,
  goal: Number,
  raised: Number,
  description: String,
  start: Date,
  end: Date
});
module.exports = mongoose.model('Project', ProjectSchema);
