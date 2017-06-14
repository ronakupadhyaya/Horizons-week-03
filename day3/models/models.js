"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

console.log(process.env.MONGODB_URI);

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
console.log('before it breaks!!!');
mongoose.connect(process.env.MONGODB_URI);


var Cat = mongoose.model('Cat', {name: String, height: Number});

var feline = new Cat({name: 'Whiskers', height: 5})


Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
