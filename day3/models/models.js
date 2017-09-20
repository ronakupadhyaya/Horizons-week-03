"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {
  name: {
    type: String,
    required: true
  },
  furColor: String
});

var cat1 = new Cat({
  name: 'Crookshanks',
  furColor: 'Black'
});

cat1.save(function(err) {
  if (err) return handleError(err);
});

var cat2 = new Cat({
  name: 'Mr. Bigglesworth',
  furColor: 'White'
});

cat2.save(function(err) {
  if (err) return handleError(err);
});

var cat3 = new Cat({
  name: 'Empuress',
  furColor: 'Calico'
});

cat3.save(function(err) {
  if (err) return handleError(err);
});

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
