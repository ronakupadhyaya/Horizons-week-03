"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat',{
  name: String,
  furColor: String
})

var Crookshanks = new Cat({
  name: "Crookshanks",
  furColor: "Black"
})
Crookshanks.save(function(err) {
  if (err) {
    console.log('Failed', err);
  } else {
    console.log('Saved!');
  }
});

var Bigglesworth = new Cat({
  name: "Mr. Bigglesworth",
  furColor: "White"
})
Bigglesworth.save(function(err) {
  if (err) {
    console.log('Failed', err);
  } else {
    console.log('Saved!');
  }
});

var Empurress = new Cat({
  name: "Empurress",
  furColor: "Calico"
})
Empurress.save(function(err) {
  if (err) {
    console.log('Failed', err);
  } else {
    console.log('Saved!');
  }
});

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
