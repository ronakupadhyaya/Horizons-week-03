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
});

var Biggle = new Cat({
  name: 'Mr.Biggleworth',
  furColor: 'White'
}); // YOUR CODE HERE - define the cat model

var Crookshanks = new Cat({
  name: 'Crookshanks',
  furColor: 'Black'
});


var Empress = new Cat({
  name: 'Empurress',
  furColor: 'Calico'
});
var oreo = new Cat({
  name: 'Oreo',
  furColor: 'B&W'
});


oreo.save(function(err){
  if(err){
    console.log("Couldn't save Crookshanks");
  }else{
    Cat.find(function(error, cats) {
      if (error) {
        console.log("Can't find cats", error);
      } else {
        console.log('Cats', cats);
      }
    });
  }
})
