"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1)
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {
  name: String,
  furColor: String
})// YOUR CODE HERE - define the cat model


var crookshank = new Cat({
  name: 'Crookshanks',
  color: 'black'
});

crookshank.save(function(err){
  if(err){
    console.log("could not save", err);
  } else {
    console.log("success!");
  }
});

var bigglesworth = new Cat({
  name: 'Mr. Bigglesworth',
  color: 'white'
});

bigglesworth.save(function(err){
    if(err){
      console.log("could not save", err);
    } else {
      console.log("success!");
    }
});

var empurress = new Cat({
  name: 'empurress',
  color: 'calico'
});

empurress.save(function(err){
  if(err){
    console.log("could not save", err);
  } else {
    console.log("success!");
  }
});


Cat.find(function(error, cat) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats! ARrayR', cat);
  }
});

Cat.findOne({name: 'Mr. Bigglesworth'}, function(error, cat){
  if (error) {
    console.log("Can't find cats", cat.name, error);
  } else {
    console.log('I found biggles!', cat.name, cat);
  }
})
