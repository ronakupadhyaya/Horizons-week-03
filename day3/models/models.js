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
})

var hook = new Cat({name: 'Hook', furColor: 'Black'});
hook.save(function(err){
  if(err){
    console.log('there was an error ', err)
  } else {
    console.log('success')
  }
})


var robin = new Cat({name: 'Robin', furColor: 'Green'});
robin.save(function(err){
  if(err){
    console.log('there was an error ', err)
  } else {
    console.log('success')
  }
})


var paul = new Cat({name: 'Paul', furColor: 'Blue'});
paul.save(function(err){
  if(err){
    console.log('there was an error ', err)
  } else {
    console.log('success')
  }
})


Cat.find({name: 'Paul'}, function(err, m){
  if(err){
    console.log('sorry', err)
  }else{
    console.log('success ', m)
  }
})

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
