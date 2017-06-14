"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat // YOUR CODE HERE - define the cat model
= mongoose.model('Cat',
{name: {type:String required: true}, //if no info input, will throw error
furColor: String})
//'Cat' is the name of the collection in mLab, but we can give it another name

var cat1 = new Cat({name:'Crookshanks', furColor: 'Black'});
var cat2 = new Cat({name:'Mr. Bigglesworth', furColor: 'White'});
var cat3 = new Cat({name:'Empurress', furColor: 'Calico'});

//need to do layer by layer because of async
cat1.save(function(){
  cat2.save(function(){
    cat3.save(function(){
      Cat.find({name:'Empurress'},function(error,cats){ //will only find Empurress
        if(error){console.log(error)}
        else{console.log(cats)}
      });
    })
  })
})



//also works
// cat1.save(function(err){
//   if(err){console.log(err)}
//   else{console.log('success')}
// })
// cat2.save(function(err){
//   if(err){console.log(err)}
//   else{console.log('success')}
// })
// cat3.save(function(err){
//   if(err){console.log(err)}
//   else{console.log('success')}
// })

//but to do the following, we need to know the time it takes
// setTimeout(function(){Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// })},3000)

// Cat.findOne(...) will only return one instead of all
