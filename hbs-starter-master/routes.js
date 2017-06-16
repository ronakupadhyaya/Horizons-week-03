"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Todo = require('./models').Todo;

router.get('/todos', function(req, res) {
  Todo.find({}, function(err, foundTodos){ //empty obj = match everything
    var fakeTodos = [];
    //create fake data just to check what's up
    fakeTodos.push({name: "finish on time", completed: true});
    fakeTodos.push({name: "eat lunch", completed: false});
    res.render('todos', {
      //specifies what to render for the #each in todos.hbs
      todos: fakeTodos
    });
  });
});


module.exports = router;
