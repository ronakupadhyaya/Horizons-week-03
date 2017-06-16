"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {
  name: {
    type: String,
    required: true
  },
  furColor: {
    type: String,
    required: true
  }
});

var crook = new Cat({name: 'Crookshanks', furColor: 'black'});
crook.save(function(err){
  if(err){
    console.log('Saving error', err);
  } else {
    console.log('you\'re good');
  }
})

var biggle = new Cat({name: 'Mr. Bigglesworth', furColor: 'white'});
biggle.save(function(err){
  if(err){
    console.log('Saving error', err);
  } else {
    console.log('you\'re good');
  }
})

var empur = new Cat({name: 'Empurress', furColor: 'calico'});
empur.save(function(err){
  if(err){
    console.log('Saving error', err);
  } else {
    console.log('you\'re good');
  }
})

Cat.findOne({name: 'Mr. Bigglesworth'}, function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
