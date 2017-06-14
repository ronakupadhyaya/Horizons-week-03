// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {name: String, furColor: String})

var c = new Cat({name: "Crookshanks", furColor: "grey"});
var m = new Cat({name: "Mr. Biggles", furColor: "Blue"});
var e = new Cat({name: "Empurrur", furColor: "gold"});

m.save(function(err){
  Cat.find(function(error, cats) {
    if (error) {
      console.log("Can't find cats", error);
    } else {
      console.log('Cats', cats);
    }
  })
  if(err){
    console.log("something went wrong " + err);
  } else {
    console.log("all good");

  }
})
;
