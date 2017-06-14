"use strict";
console.log("Run this")
if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {    //define the cat model
  name: String,
  furColor: String
})

var Crookshanks = new Cat({
  name: 'Crookshanks',
  furColor: 'black'
});
Crookshanks.save();    //async
var Bigglesworth = new Cat({
  name: 'Mr. Bigglesworth',
  furColor: 'white'
});
Bigglesworth.save();    //async
var Empurress = new Cat({
  name: 'Empurress',
  furColor: 'calico'
});
Empurress.save();    //async

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
