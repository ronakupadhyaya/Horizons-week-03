"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {name: String, furColor: String}); // YOUR CODE HERE - define the cat model

// var one = new Cat({name: 'Crookshanks', furColor: 'Black'});
// one.save(function(err){
//   if(err){
//     console.log('failed');
//   }else{
//     console.log('success');
//   }
// });
//
// var two = new Cat({name: 'Mr. Bigglesworth', furColor: 'White'});
// two.save(function(err){
//   if(err){
//     console.log('failed');
//   }else{
//     console.log('success');
//   }
// });
//
// var three = new Cat({name: 'Empurress', furColor: 'Calico'});
// three.save(function(err){
//   if(err){
//     console.log('failed');
//   }else{
//     console.log('success');
//   }
// });

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

var query = Cat.where({name: 'Mr. Bigglesworth'});
query.findOne(function(error, cat){
  if(error){
    console.log("ERROR");
  }else{
    console.log("I FOUND", cat.name);
  }
});
