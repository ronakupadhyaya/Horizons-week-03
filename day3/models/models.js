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
}); // YOUR CODE HERE - define the cat model

var crookshanks = new Cat({
  name: 'Crookshanks',
  color: 'Black'
})

crookshanks.save(function(err){
  if(err){
    console.log("error");
  } else {
    console.log("success");
  }
})

var bigglesworth = new Cat({
  name: 'Mr. Bigglesworth',
  color: 'White'
})

bigglesworth.save(function(err){
  if(err){
    console.log("error");
  } else {
    console.log("success");
  }
})

var empurress = new Cat({
  name: 'Empurress',
  color: 'Calico'
})

empurress.save(function(err){
  if(err){
    console.log("error");
  } else {
    console.log("success");
  }
})


Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

Cat.findOne( {name: 'Mr. Bigglesworth'}, function(err, cat){
  if(err){
    console.log("Couldn't find Mr. Bigglesworth");
  } else {
    console.log(cat);
  }
})
