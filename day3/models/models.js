"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {
  name: {
    type: String,
    required: true
  },
  furcolor: String,
}); // YOUR CODE HERE - define the cat model
var myCat = new Cat({
  name: 'Dusty',
  furcolor: 'Black',

})

var crookshanks = new Cat({
  name: 'Crookshanks',
  furcolor: 'Black',

});


var mrBigglesworth = new Cat({
  name: 'Mr. Bigglesworth',
  furcolor: 'White',

});


var empurress = new Cat({
  name: 'Empurress',
  furcolor: 'Calico',

})


    // Name: Crookshanks Color: Black
    // Name: Mr. Bigglesworth Color: White
    // Name: Empurress Color: Calico

    crookshanks.save(function(){
      mrBigglesworth.save(function(){
        empurress.save(function(){
          Cat.find(function(error, cats) {
            if (error) {
              console.log("Can't find cats", error);
            } else {
              console.log('Cats', cats);
            }
          });
        });
      });
    });

    Cat.find({
      name: 'Sarah'}, function(err, cats){
        console.log('cats', cats)
      });
