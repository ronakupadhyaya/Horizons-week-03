"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {
  name: String,
  furColor: String,
});

var crookshanks = new Cat({
  name: 'Crookshanks',
  furColor: 'Black'
});
var mrBigglesworth = new Cat({
  name: 'Mr. Bigglesworth',
  furColor: 'White'
});
var empurress = new Cat({
  name: 'Empurress',
  furColor: 'Calico'
});

crookshanks.save(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("saved");
  }
});
mrBigglesworth.save(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("saved");
  }
});
empurress.save(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("saved");
    Cat.find(function(error, cats) {
      if (error) {
        console.log("Can't find cats", error);
      } else {
        console.log('Cats', cats);
      }
    });
  }
});
