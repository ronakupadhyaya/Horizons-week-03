"use strict";

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('cats', {
  name: String,
  furColor: String
});

var crookshanks = new Cat({ name: 'Crookshanks', furColor: 'Black' });
var mrB = new Cat({ name: 'Mr. Bigglesworth', furColor: 'White' });
var empurress = new Cat({ name: 'Empurress', furColor: 'Calico' });

crookshanks.save(checkCats);
mrB.save(checkCats);
empurress.save(checkCats);

function checkCats(err) {
  saveHelper(err, this);
  Cat.find(function (error, cats) {
    if (error) {
      console.log("Can't find cats", error);
    } else {
      console.log('Cats', cats);
    }
  });
}

Cat.findOne({ name: 'Mr. Bigglesworth' }, function (error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

var saveHelper = function (err) {
  if (err) {
    console.log('Could not save', err);
  }
  else {
    console.log('Saved');
  }
}
