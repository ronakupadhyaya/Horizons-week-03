"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
<<<<<<< HEAD

var Cat = mongoose.model('cat', {name: String, furColor: String}) // YOUR CODE HERE - define the cat model

var feline = new Cat({name: 'Crookshanks', furColor: 'black'})
var feline2 = new Cat({name: 'Mr. Bigglesworth', furColor: 'white'})
var feline3 = new Cat({name: 'Empurress', furColor: 'Calico'})

feline.save();
feline2.save();
feline3.save();
=======

var Cat; // YOUR CODE HERE - define the cat model
>>>>>>> master

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

// Cat.findOne({name: 'Mr. Bigglesworth'})
