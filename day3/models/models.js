"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {name: String, furColor: String});


var cat2 = new Cat({name: 'Munchkin', furColor: 'brown'});
cat2.save(function(err) {
	if (err) {
		console.log('could not save', err);
	}
	else {
		Cat.findOne({'name': 'Munchkin'}, 'name', function(error, cat) {
		  if (error) {
		    console.log("Can't find cats", error);
		  }
		  else {
		    console.log('Found a ' + cat.furColor + ' ' + cat.name);
		  }
		})
	};
});
