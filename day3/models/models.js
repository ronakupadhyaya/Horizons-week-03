"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model("Cat", {
  name: {
    type: String,
    required: true;
  }
})
//you can make objects inside of models to make constraints, such as making it
//mandatory for the user to enter a name for the cat 

Cat.find({
  name: 'Pradyut'
}, function(err, cats) {
  console.log('cats', cats);
});


var pradyut = new Cat({name:'Pradyut'});
var sarah = new Cat({name:'Sarah'});

pradyut.save(function(){
  sarah.save(function(){
    Cat.find(function(error, cats) {
      if (error) {
        console.log("Can't find cats", error);
      } else {
        console.log('Cats', cats);
      }
    });
  })

  });
