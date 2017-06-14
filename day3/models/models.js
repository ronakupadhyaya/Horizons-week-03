"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
//the line below creates a new model, the first string is the name of the collection, that string will become pluralized
//the other are the characteristics
var Cat = mongoose.model('Cat',{name:String,furColor:String})

var cook= new Cat({name:'Crookshanks', furColor:"Black"})
var biggles= new Cat({name:"Mr. Bigglesworth", furColor:"White"})
var empurress= new Cat({name:"Empurress", furColor:"Calico"})

cook.save(function(err){
  if(err){
    console.log('could not save', err)
  }
  else{
    console.log('success')
  }
})

biggles.save(function(err){
  if(err){
    console.log('could not save', err)
  }
  else{
    console.log('success')
  }
})

empurress.save(function(err){
  if(err){
    console.log('could not save', err)
  }
  else{
    console.log('success')
  }
})

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
Cat.find({name: "Mr. Bigglesworth"},function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

//to fix asynchronous
// empuress.save(function(){
//   biggles.save(function(){
//
//     Cat.find(function(error,cats){
//       if(error){
//         console.log("can't find cats", error);
//       }else{
//         console.log('cats',cats);
//       }
//     })
//   })
// })
