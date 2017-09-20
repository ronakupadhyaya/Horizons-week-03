"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

// YOUR CODE HERE - define the cat model
var Cat = mongoose.model('Cat', {
	name:{
		type: String,
		required: true
	},
	furColor:{
		type: String,
		required: true
	}
});

	var spotty = new Cat(
		{
			name: 'Spotty',
			furColor: 'Brown'
		});
  spotty.save(function(err){
		if (err) {
	      console.log("Can't find cats", error);
	    } else {
	      Cat.find(function(error, cats){
			  if(error){
				  console.log("Error");
			  }else{
				  console.log(cats);
			  }
		  });
	    }
  });
