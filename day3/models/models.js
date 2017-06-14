"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat=mongoose.model('Cat',{
  name:{
    type:String,
    required:true
  },
  furColor:String
}) // YOUR CODE HERE - define the cat model

var amy = new Cat({name:'amy',furColor:'pink'});
var david = new Cat({name:'david',furColor:'brown'})
var alex = new Cat({name:'alex',furColor:'black'})
// amy.save(function(err){
//   if (err){
//     console.log('couldnt save',err);
//   }
//   else{
//     console.log('success');
//   }
// })
//
// david.save(function(err){
//   if (err){
//     console.log('couldnt save',err);
//   }
//   else{
//     console.log('success');
//   }
// })
//
// alex.save(function(err){
//   if (err){
//     console.log('couldnt save',err);
//   }
//   else{
//     console.log('success');
//   }
// })
// amy.save(function(){
//   david.save(function(){
//     alex.save(function(){
//       Cat.find(function(error, cats) {
//         if (error) {
//           console.log("Can't find cats", error);
//         } else {
//           console.log('Cats', cats);
//         }
//       });
//     })
//   })
// })

Cat.find({
  name:'amy'},
  function(error,cats){
    console.log('cats',cats);
  })
