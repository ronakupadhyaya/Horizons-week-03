"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {name: String, furColor: String}); // YOUR CODE HERE - define the cat model

var Cat1 = new Cat();
Cat1.name = 'Crookshanks';
Cat1.furColor = 'Black';
var Cat2 = new Cat();
Cat2.name = 'Mr. Bigglesworth';
Cat2.furColor = 'White';
var Cat3 = new Cat();
Cat3.name = 'Empurress';
Cat3.furColor = 'Calico';

// Cat1.save();
// Cat2.save();
// Cat3.save();

// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });
Cat.findOne({name: 'Mr. Bigglesworth'}, function(error, cats){
  if (error) {
    console.log("Can't find cat", error);
  } else {
    console.log('Cat is', cats);
  }
})
