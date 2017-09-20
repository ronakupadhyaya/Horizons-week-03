"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model("Cat", {
  name: String,
  furColor: String
})

var crookshanks = new Cat({
  name: 'Crookshanks',
  color: 'Black'
})
var bigglesworth = new Cat({
  name: 'Mr. Bigglesworth',
  color: 'White'
})
var empurress = new Cat({
  name: 'Empurress',
  color: 'Calico'
})

// crookshanks.save(function(err) {
//   if (err) console.log('failed', err);
//   else console.log('success');
// })
// bigglesworth.save(function(err) {
//   if (err) console.log('failed', err);
//   else console.log('success');
// })
// empurress.save(function(err) {
//   if (err) console.log('failed', err);
//   else console.log('success');
// })


Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

Cat.findOne({name: 'crookshanks'}, function(err, result) {
  if (err) console.log("can't find", err);
  else console.log(result);
})
