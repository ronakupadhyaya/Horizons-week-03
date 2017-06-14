"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

// YOUR CODE HERE - define the cat model
var Cat = mongoose.model('Cat', {
  name: {
    type: String,
    required: true
  },
  furColor: String
});

var crookshanks = new Cat({name: 'Crookshanks', furColor: 'Black'});
var bigglesworth = new Cat({name: 'Mr. Bigglesworth', furColor: 'White'});
var empurress = new Cat({name: 'Empurress', furColor: 'Calico'});
crookshanks.save();
bigglesworth.save();
empurress.save();

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", cats);
  } else {
    console.log('Cats', cats);
  }
});
