// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));
//Cat constructor
var Cat = mongoose.model('Cat', {
	name: String, 
	furColor: String
});
// Make cats
var cat = new Cat ({
	name: "cat", 
	furColor: "white"
});
var floyd = new Cat ({
	name: "floyd", 
	furColor: "black and white"
});
var mcPussington = new Cat ({
	name: mcPussington, 
	furColor: "black on black"
});
var namelessCat = new Cat ();
namelessCat.save(function(error) {
	if (error) {
		console.log('Error', error)
	}
	else {
		console.log('meow meow meow')
	}
});
//Save my cats
cat.save(function(error) {
	if (error) {
		console.log('Error', error)
	}
	else {
		console.log('meow meow meow')
	}
});

floyd.save(function(error) {
	if (error) {
		console.log('Error', error)
	}
	else {
		console.log('meow meow meow')
	};
});

mcPussington.save(function(error) {
	if (error) {
		console.log('Error', error)
	}
	else {
		console.log('meow meow meow')
	};
});
//Find my cats by searching the database
Cat.find(function(error, cats) {
	console.log('here');
	if (error) {
	   console.log("Can't find cats", error);
	} else {
	   console.log('Cats', cats);
	}
});
