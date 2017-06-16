"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Todo = require('./models').Todo;

router.get('/', function(req, res) {
  res.render('todos')
});

router.get('/todos', function(req, res){
  Todo.find({}, function(err, foundTodos){
    var fakeTodos = [];
    fakeTodos.push({name: "Finish on time", completed: true});
    fakeTodos.push({name: "Eat Lunch", completed: false});
    res.render('todo', {
      todos: fakeTodos
    });
  });
});

module.exports = router;
