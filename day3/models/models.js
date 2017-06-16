"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

// created a schema
var Cat = mongoose.model('Cat', {
	name: String,
	furColor: String
});


var crookshanks = new Cat({
	name: 'Crookshanks',
	furColor: 'Black'
});
crookshanks.save(function(err) {
	if (err) {
		console.log("Crookshanks cannot save", error);
	}
	else {
		console.log("Crookshanks saved");
	}
});

var bigglesworth = new Cat({
	name: 'Mr. Bigglesworth',
	furColor: 'White'
});
bigglesworth.save(function(err) {
	if (err) {
		console.log("Mr. Bigglesworth cannot save", error);
	}
	else {
		console.log("Mr. Bigglesworth saved");
	}
});

var empurress = new Cat({
	name: 'Empurress',
	furColor: 'Calico'
});
empurress.save(function(err) {
	if (err) {
		console.log("Empurress cannot save", error);
	}
	else {
		console.log("Empurress saved");
	}
});


Cat.findOne({name:'Crookshanks'}, function(error, cats) {
  if (error) {
    console.log("Can't find cat", error);
  } else {
    console.log('Cat found', cats);
  }
});
