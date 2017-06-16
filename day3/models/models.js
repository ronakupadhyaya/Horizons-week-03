"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat=mongoose.model('Cat',{name:String,furColor:String}); // YOUR CODE HERE - define the cat model

// var cat1 = new Cat({ name: 'andrew1' });
// var cat2 = new Cat({ name: 'andrew2' });
// var cat3 = new Cat({ name: 'andrew3' });

// cat1.save();
// cat2.save();
// cat3.save();

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

Cat.findOne({ 'name': 'andrew1' },  function (err, cat) {
  if (err) return handleError(err);
  console.log('success',cat) // Space Ghost is a talk show host.
})
