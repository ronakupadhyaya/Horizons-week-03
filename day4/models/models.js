// First let's set up our MongoDb connection
//HOW TO WRITE TO MONGODB WITH MONGOOSE USING SAVE
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

//CREATE A NEW COLLECTION (EX. CHANGE CAT TO MOOSE FOR NAME)
var Cat = mongoose.model('Cat', {
  name: {
    type: String,
    required: true,
  },
  furColor: String
});

var mrWhisker = new Cat({name: 'Mr Whiskers', furColor: 'calico'});
var crookshanks = new Cat({name: 'Crookshanks', furColor: 'black'});
var mrBigglesworth = new Cat({name: 'Mr. Bigglesworth', furColor: 'white'});
var empurress = new Cat({name: 'Empurress', furColor: 'calico'});

//HOW TO SAVE A NEW COLLECTION?
// new Cat().save(function(error){
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// })

//BRINGS UP THE DOCUMENTS (RESPONSES) OF THE COLLECTION IN ONE ARRAY, MULTIPLE OBJECTS
//FINDER FUNCTION
Cat.findOne({
  name: "Mr. Bigglesworth" //same as mlab interface search function
},function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('meow', cats);
  }
});

Cat.find({
},function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('meow', cats);
  }
});

//HOW TO ADD A DOCUMENT TO COLLECTION
// var kitty = new Cat({name: 'Kitty', furColor: 'blue'})
// kitty.save(function(error){
//   if(error){
//     console.log(error);
//   }
// });

//NAMELESS CAT
//THIS WON'T WORK BECAUSE UNDER CAT, WE MADE NAME TO BE REQUIRED
// var nameless = new Cat()
// nameless.save(function(error){
//   if(error){
//     console.log(error);
//   }
// });

//DO THESE ONLY ONCE, THEN COMMENT OUT
// mrWhisker.save(function(error){
//   if(error){
//     console.log(error);
//   }
// });
//
// crookshanks.save(function(error){
//   if(error){
//     console.log(error);
//   }
// });
//
// mrBigglesworth.save(function(error){
//   if(error){
//     console.log(error);
//   }
// });
//
// empurress.save(function(error){
//   if(error){
//     console.log(error);
//   }
// });
