"use strict";

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('cat', { // you have ot create the model everytime you run but it is check it is not creating a new one - it is just a connection
  name: String,
  furColor: String
});

var catArray = [
  {
    name: "Crookshanks",
    furColor: "Black"
  },
  {
    name: "Mr. Bigglesworth",
    furColor: "White"
  },
  {
    name: "Empurress",
    furColor: "Calico"
  }
]

// var felix = new Cat({
//   name: "Felix",
//   furColor: "Black"
// });

var crookshanks = new Cat(catArray[0]);
var bigglesworth = new Cat(catArray[1]);
var empurress = new Cat(catArray[2]);

var pradyut = new Cat({
  name: 'Padyut'
});
var sarah = new Cat({
  name: 'Sarah'
})

pradyut.save(function() { //save is asynchornous So it will run .find before the cat is added
  sarah.save(function() {
    Cat.find(function(error, cats) { //the find needs to go in here that will call all the cats at once
      if (err) {
        console.log("Could not save", err);
      } else {
        console.log("Success");
      }
    });
  });
});

bigglesworth.save(function(err) {
  if (err) {
    console.log("Could not save", err);
  } else {
    console.log("Success");
  }
});

empurress.save(function(err) {
  if (err) {
    console.log("Could not save", err);
  } else {
    console.log("Success");
  }
});

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

Cat.find({
  name: "Felix" //find take a query as its first argument as an object
}, function(err, cats) {
  console.log('cats', cats);
});
