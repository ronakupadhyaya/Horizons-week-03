"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat; // YOUR CODE HERE - define the cat model

var Cat = mongoose.model('Cat', {
	name: String,
	color: String
});


var Crookshanks = new Cat({
	name: 'Crookshanks',
	color: 'Black'
})
Crookshanks.save(function(err) {
	if(err) {
		console.log("Couldn't save Crookshanks")
	} else {
		Cat.find(function(error, cats) {
  			if (error) {
    			console.log("Can't find cats", error);
  			} else {
    			console.log('Cats', cats);
  			}
		});
	}
})

var MrBigglesworth = new Cat({
	name: 'Mr. Bigglesworth',
	color: 'White'
})
MrBigglesworth.save(function(err) {
	if(err) {
		console.log("Couldn't save Mr. Bigglesworth")
	} else {
		Cat.find(function(error, cats) {
  			if (error) {
    			console.log("Can't find cats", error);
  			} else {
    			console.log('Cats', cats);
  			}
		});
	}
})

var Empurress = new Cat({
	name: 'Empurress',
	color: 'Calico'
});
Empurress.save(function(err) {
	if(err) {
		console.log("Couldn't save Empurress")
	} else {
		Cat.find(function(error, cats) {
  			if (error) {
    			console.log("Can't find cats", error);
  			} else {
    			console.log('Cats', cats);
  			}
		});
	}
})
