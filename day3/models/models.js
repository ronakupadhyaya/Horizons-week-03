"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {
    name: String,
    color: String,
});

var cr = new Cat({name: "Crookshanks", color: "Black"});
	cr.save(function(err) {
    if (err) {
    console.log('could not save', err);
  } else {
    console.log('success')
  }
})

  var bi = new Cat({name: "Mr. Bigglesworth", color: "White"});
  	bi.save(function(err) {
      if (err) {
  		console.log('could not save', err);
  	} else {
  		console.log('success')
  	}
})
    var em = new Cat({name: "Empurress", color: "Calico"});
    	em.save(function(err) {
        if (err) {
    		console.log('could not save', err);
    	} else {
    		console.log('success')
    	}
  })


Cat.findOne({name: "Mr. Bigglesworth"}, function(error, cats) {
  if (error) {
  console.log('could not save', error);
} else {
  console.log('success', cats)
}
});
