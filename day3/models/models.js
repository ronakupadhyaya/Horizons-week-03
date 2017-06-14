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
    furColor:String
});

var meaw=new Cat({name:"spike",furColor:"blue"});
var mic=new Cat({name:"kike",furColor:"bli"});

meaw.save(function(err) {
  mic.save(function(err) {
    Cat.find(function(error, cats) {
      if (error) {
        console.log("Can't find cats", error);
      } else {
        console.log('Cats', cats);
      }
    });

  });

});




Cat.findOne(function(error, meaw) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cat', meaw);
  }
});
