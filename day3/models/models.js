"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('cat', {
  name: String,
  furcolor: String
}); // YOUR CODE HERE - define the cat model

var crookshanks = new Cat ({name: "crookshanks", furcolor: "black"});
var mrBigglesworth = new Cat ({name: "mrBigglesworth", furcolor: "white"});
var empurress = new Cat ({name: "empurress", furcolor: "calico"});


crookshanks.save(function(){
  mrBigglesworth.save(function(){
    empurress.save(function(){
      Cat.find(function(error, cats) {
        if (error) {
          console.log("Can't find cats", error);
        } else {
          console.log('Cats', cats);
        }
      });
    });
  });
});
