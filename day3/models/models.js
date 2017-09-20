"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {name: String, furColor: String}); // YOUR CODE HERE - define the cat model

var Crookshanks = new Cat({
  name: "Crookshanks",
  furColor: "Black"
});

var MrBigglesWorth = new Cat({
  name: "Mr. BigglesWorth",
  furColor: "White"
})

var Empurress = new Cat({
  name: "Empurress",
  furColor: "Calico"
})

Crookshanks.save(function(err){
  if(err){
    console.log("Couldn't save Crooshanks");
  } else {
    Cat.find(function(error, cats) {
      if (error) {
        console.log("Can't find cats", error);
      } else {
        console.log('Cats', cats);
      }
    });
  }
})

MrBigglesWorth.save(function(err){
  if(err){
    console.log("Couldn't save Crooshanks");
  } else {
    Cat.find(function(error, cats) {
      if (error) {
        console.log("Can't find cats", error);
      } else {
        console.log('Cats', cats);
      }
    });
  }
})

Empurress.save(function(err){
  if(err){
    console.log("Couldn't save Crooshanks");
  } else {
    Cat.find(function(error, cats) {
      if (error) {
        console.log("Can't find cats", error);
      } else {
        console.log('Cats', cats);
      }
    });
  }
})

// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });
