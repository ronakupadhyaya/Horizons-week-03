"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {name: String, furColor: String}); // YOUR CODE HERE - define the cat model

// var cat1 = new Cat({name:'Crookshanks', furColor: 'Black'})
// cat1.save(function(err) {console.log(err)})
//
// var cat2 = new Cat({name:'Mr. Bigglesworth', furColor: 'White'})
// cat2.save(function(err) {console.log(err)})
//
// var cat3 = new Cat({name:'Empurress', furColor: 'Calico'})
// cat3.save(function(err) {console.log(err)})

var findOne = function(catName) {
  Cat.find({name: catName}, function(error, cats) {
    if (error) {
      console.log("Can't find cats", error);
    } else {
      console.log('Cats', cats);
    }
  });
}
findOne("Mr. Bigglesworth")

// Cat.find({name: "Crookshanks"}, function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });
