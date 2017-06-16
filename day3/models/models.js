"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat=mongoose.model('Cat', {
  name:String,
  furColor: String
}) // YOUR CODE HERE - define the cat model

var one = new Cat({name:'isOne', furColor:'tangerine'});
var two = new Cat({name:'isTwo', furColor:'black'});
var three = new Cat({name:'isThree', furColor:'white'});
// one.save(function(err){
//   if(err){
//     console.log('couldnt save', err);
//   }
//   else{
//     console.log('success');
//   }
// })
// two.save(function(err){
//   if(err){
//     console.log('couldnt save', err);
//   }
//   else{
//     console.log('success');
//   }
// })
// three.save(function(err){
//   if(err){
//     console.log('couldnt save', err);
//   }
//   else{
//     console.log('success');
//   }
// })
Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
