"use strict";

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {
  name: String,
  furcolor: String
})
var crookshanks = new Cat({
  name: "Crookshanks",
  furcolor: "Black"
})
var biggles = new Cat({
  name: "Mr. Bigglesworth",
  furcolor: "White"
})
var empurress = new Cat({
  name: "Empurress",
  furcolor: "Calico"
})
crookshanks.save(function(err) {
  if (err) {
    console.log('Failed', err);
  } else {
    console.log('Saved!');
  }
});
biggles.save(function(err) {
  if (err) {
    console.log('Failed', err);
  } else {
    console.log('Saved!');
  }
});
empurress.save(function(err) {
  if (err) {
    console.log('Failed', err);
  } else {
    console.log('Saved!');
  }
});
Cat.find({
  name: "Mr. Bigglesworth"
}, function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
