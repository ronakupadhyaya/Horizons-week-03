"use strict";

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {
  name: String,
  furColor: String
})

var cat1 = new Cat({
  name: "Crookshanks",
  furColor: "Black"
});

var cat2 = new Cat({
  name: "Mr. Bigglesworth",
  furColor: "White"
});

var cat3 = new Cat({
  name: "Empurress",
  furColor: "Calico"
});

var catArray = []
catArray.push(cat1);
catArray.push(cat2);
catArray.push(cat3);

for (var i = 0; i < catArray.length; i++) {
  var element = catArray[i];
  element.save(function (error) {
    if (error)
      console.log('Failed to save,', error)
    else
      console.log('Saved successfully!')
  })
}

Cat.find({ name: 'Empuress' }, function (error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
