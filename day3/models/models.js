"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
console.log(process.env.MONGODB_URI)


var Cat = mongoose.model('Cats', {name:{
  type: String,
  required: true
}, furColor:String});

var crooky = new Cat({furColor:"Blue"});


crooky.save(function(err){console.log(err)});
// biggie.save(function(err){});
// purr.save(function(err){});
//
//
Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

// Cat.findOne({name: 'Mr Biggiee'}, function(err,obj) { console.log(obj); });
