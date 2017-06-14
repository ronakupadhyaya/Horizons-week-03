"use strict";

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cats', {
  name: {
    type: String,
    required: true
  },
  furColor: String
});
var cat1 = new Cat({
  name: "Crookshanks",
  furColor: "Black"
});
var cat2 = new Cat({
  name: "Mr. Bigglesworth",
  furColor: "White"
});
var cat3 = new Cat({
  name: "Empurress",
  furColor: "Calico"
});
cat1.save(function() {
  cat2.save(function({
    cat3.save(function() {
      Cat.find(function(error, cats) {
        if (error) {
          console.log("Can't find cats", error);
        } else {
          console.log('Cats', cats);
        }
      });
    });
  }));

});
