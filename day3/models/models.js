"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}
// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

//creates collection on mLAb with this string. "Cat" at the end.
var Cat = mongoose.model("Cat", {
  name: {
    type: String,
    required: true // name is required to put into database.
  },
  furColor: String
})
var amy = new Cat({
  name: "amy",
  furColor: 'pink'
});
var david = new Cat({
  name: "david",
  furColor: 'brown'
});
var alex = new Cat({
  name: "alex",
  furColor: 'red'
});
david.save(function(){
  Cat.find(function(error, catss) {
    if (error) {
      console.log("Can't find cats", error);
    } else {
      console.log('Cats', catss);
    }
  })
})
//you save first and then you find.

// Cat.find({
//   name: "amy"
// }, function(err, cats){
//   console.log('cats', cats);
// });

//find only one.
// Cat.findOne({
//   name: "amy"
// }, function(err, cats){
//   console.log('cats', cats);
// });

// amy.save(function(err){
//   if (err){
//     console.log("couldnt find it")
//   }
//   else{
//     console.log("saved it");
//   }
//})
// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });
