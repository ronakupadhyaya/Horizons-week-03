<<<<<<< HEAD
// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {
  name: String,
  furColor: String
})
var black = new Cat({
  name: "Crookshanks",
  furColor: "Black"
});

var white = new Cat({
  name: "Mr. Bigglesworth",
  furColor: "White"
});
var Calico = new Cat({
  name: "Empurress",
  furColor: "Calico"
});

// black.save();
// white.save();
// Calico.save();

Cat.find(function (error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

Cat.findOne({
  name: "Mr. Bigglesworth"
}, function (error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('I found him ', cats);
  }
});
=======
"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat; // YOUR CODE HERE - define the cat model

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
>>>>>>> master
