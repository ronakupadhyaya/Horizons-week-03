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
}) // YOUR CODE HERE - define the cat model

var blackCat = new Cat({name: "Crookshanks", furColor: 'Black'});
blackCat.save(function(err){
  if (err){
    console.log("Error could not save", err)
  } else {
    console.log('success');
  }
});

var whiteCat = new Cat({name: "Mr. Bigglesworth", furColor: 'White'});
whiteCat.save(function(err){
  if (err){
    console.log("Error could not save", err)
  } else {
    console.log('success');
  }
});

var calicoCat = new Cat({name: "Empurress", furColor: 'Calico'});
calicoCat.save(function(err){
  if (err){
    console.log("Error could not save", err)
  } else {
    console.log('success');
  }
});


// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });

Cat.findOne({name: "Mr. Bigglesworth"}, function(error, m) {
  if (error) {
    console.log("Can't find Mr. Bigglesworth")
  } else {
    console.log("cats", m);
  }
});
