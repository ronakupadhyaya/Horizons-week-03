"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
var Schema = mongoose.Schema;
var assert = require('assert');
var message = require('message')
var catSchema = new Schema({
  name: {
    type:String,
    required: [true,"need name"]
  },
  furColor: {
    type:String,
    required: [true,"need color"]
  }
});
var Cat = mongoose.model("Cat",catSchema); // YOUR CODE HERE - define the cat model

var invalid = new Cat({name:"hello"})
// var biggles = new Cat({name: 'Mr. Bigglesworth', furColor: 'green'})
// biggles.save();
// var error = invalid.validateSync();
invalid.save(function(error) {
  assert.equal(error.errors['name']);
  assert.equal(error.errors['furColor']);
  console.log(error)
});
// var shanks = new Cat({name:'Crookshanks',furColor:"Black"})
// shanks.save();
// var biggles = new Cat({name: 'Mr. Bigglesworth', furColor: 'White'})
// biggles.save();
// var cat3 = new Cat({name: 'Empurress', furColor: 'Calico'})
// cat3.save();
//
Cat.find({name:'Mr. Bigglesworth'},function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
// Cat.findOne({ name: 'Mr. Bigglesworth' }, function(err, character) {
//   console.log(character); // { name: 'Sam', inventory: {}}
// });
