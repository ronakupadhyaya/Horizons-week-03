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
});

var cat1 = new Cat ({Name: "Crookshanks", Color: "Black"})
var cat2 = new Cat ({Name: "Mr. Bigglesworth", Color: "White"})
var cat3 = new Cat ({Name: "Empurress", Color: "Calico"})

cat1.save(function(err) {
	if (err) {
		console.log("Could not save", err);
	} else {
		console.log("Success");
	}
});

cat2.save(function(err) {
	if (err) {
		console.log("Could not save", err);
	} else {
		console.log("Success");
	}
});

cat3.save(function(err) {
	if (err) {
		console.log("Could not save", err);
	} else {
		console.log("Success");
	}
});

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
