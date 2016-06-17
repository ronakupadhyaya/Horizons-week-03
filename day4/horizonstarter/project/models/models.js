var mongoose = require('mongoose');
var connect = require('./connect');

mongoose.connect(connect);
module.exports ={
  project: mongoose.model('project',{
    title:{
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
  },
  goal: {
    type: Number,
    required: true
  },
  raised: {
    type: Number,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  }
  })
};
