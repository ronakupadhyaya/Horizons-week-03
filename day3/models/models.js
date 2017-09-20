"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat',{
	name: String,
	furColor: String
});

var newCat = new Cat({
	name: 'tabby',
	furColor: 'orange'
});

newCat.save(function(err){
	if (err){
		console.log("Couldn't Save:",err);
	}
  else{
    Cat.find(function(error,cats){
      if(error){
        console.log("Couldn't find cats:",error);
      }
      else{
        console.log('Cats found:',cats);
      }
    });
  }
});
