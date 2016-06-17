var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var app = express();

// Add static files to Express
var Counter = mongoose.model('Counter',{
  count: {
    type: Number,
    default:0
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/counters', function(req, res){
  Counter.find(function(error, counters){
    if (error){
      res.status(400).send(error);
    }else{
      res.json(counters);
    }
  })
})

app.post('/counters', function(req,res){
  var c = new Counter();
  c.save(function(error, counter){
    if (error){
      res.status(400).send(error);
    }else{
      res.json(counter);
    }
  });
});

app.post('/counter/:id/up', function(req,res){
  var update = {
    $inc: {
      count: 1
    }
  };
  Counter.findByIdAndUpdate(req.params.id, update, function(error, counter){
    if (error){
      res.status(400).send(error);
    }else{
      res.json(counter);
    }
  });
});

app.post('/counter/:id/up', function(req,res){
  Counter.findbyId(req.params.id, function(error, counter){
    if (error){
      res.status(400).send(error);
    }else{
      counter.count++
      res.json(counter);
    }
  });
});
// Redirect / to /index.html since we're not going to be rendering
// html in the server in this exercise
app.get('/', function(req, res) {
  res.redirect('/index.html');
});

// We use a variable to keep count
var counter = 0;

// This is a JSON endpoint that increases the count and returns its current
// value.
app.post('/increment', function(req, res) {
  counter++;
  res.json({
    count: counter
  });
});

// ---Task 2---
// POST /decrement: Create another JSON endpoint that decreases `count` by 1
// and returns a JSON response indicating the new value of `count`.

// YOUR CODE HERE

app.listen(3000);
