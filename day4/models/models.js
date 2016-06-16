// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {name: String, color: String})

// var cat = new Cat({name: "testcat", color:"orange"});
// cat.save(function(err) {});


Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});


// Cat.find({name: "crookshanks"}, function(error, m) {
// 	console.log(m);
// });