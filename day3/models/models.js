"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

// YOUR CODE HERE - define the cat model

var Cat = mongoose.model('Cats', {
  name: {
    type: String,
    required: true
  },
  furColour: String
});

var crooks = new Cat({
  name: 'Crookshanks',
  furColour: 'Black'
});
var biggles = new Cat({
  name: 'Mr. Bigglesworth',
  furColour: 'White'
});

var empurr = new Cat({
  name: 'Empurress',
  furColour: 'Calico'
});

//save the cats
crooks.save(function(err){
  empurr.save(function(err){
    biggles.save(function(err){
      Cat.find(function(error, cats) {
        if (error) {
          console.log("Can't find cats", error);
        } else {
          console.log('Cats', cats);
        }
      });
    });
  });
});

// Cat.find({name: 'Crookshanks'}, function(error, cats) {
//   console.log('Cats', cats);
// });

Cat.findOne(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else if (cats.name === 'Mr. Bigglesworth'){
    console.log('Found!', cats);
  }
});
