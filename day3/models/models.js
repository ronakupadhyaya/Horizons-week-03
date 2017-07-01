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
    furColor: String
});

// WRITING TO MONGODB

new Cat({
    name: 'Crookshanks',
    furColor: 'Black'
}).save(function(err) {
    console.log('SAVED CROOKSHANKS');
})

new Cat({
    name: 'Mr. Bigglesworth',
    furColor: 'White'
}).save(function(err) {
    console.log('SAVED BIGGLESWORTH');
})

new Cat({
    name: 'Empurress',
    furColor: 'Calico'
}).save(function(err) {
    console.log('SAVED EMPURRESS');
})

// READING FROM MONGODB

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
}); // cat.find() returns right away; asynch 
