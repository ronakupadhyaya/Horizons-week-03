var mongoose = require('mongoose');
var connect = require('./connect')
mongoose.connect(connect);

module.exports = {
  project: mongoose.model('project', { //project in the context of kickstarter - data model
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    goal: {
      type: Number,
      required: false
    },
    raised: {
      type: Number,
      required: false
    },
    category: {
      type: String,
      required: false
    },
    start_date: {
      type: Date,
      required: false
    },
    end_date: {
      type: Date,
      required: false
    }
  })
}
