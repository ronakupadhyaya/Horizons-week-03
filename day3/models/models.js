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
    furColor: String
})


var crook = new Cat({name:'Crookshanks', furColor: 'Black'})
var biggle = new Cat({name:'Mr. Bigglesworth', furColor: 'White'})
var emp = new Cat({name:'Empurress', furColor: 'Calico'})

crook.save(function(err, kat) {
    if (err) {
        console.log(err)
    } else{
        console.log('success!')
    }
})
biggle.save(function(err, kat) {
    if (err) {
        console.log(err)
    } else{
        console.log('success!')
    }
})
emp.save(function(err, kat) {
    if (err) {
        console.log(err)
    } else{
        console.log('success!')
    }
})



Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

// Cat.findOne(function() {
//     console.log(Cat.find())
// })



