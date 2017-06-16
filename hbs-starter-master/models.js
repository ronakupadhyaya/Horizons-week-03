
"use strict";

var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  name: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }

});

module.exports = {
  Todo: Todo
}
