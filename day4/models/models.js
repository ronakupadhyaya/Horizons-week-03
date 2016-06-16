// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {name: String, furColor: String})

var cat1 = new Cat({name: 'Crookshanks', furColor: 'Black'});
var cat2 = new Cat({name: 'Mr.Bigglesworth', furColor: 'White'});
var cat3 = new Cat({name: 'Empurress', furColor: 'Calico'});

// cat1.save(function(error) {
//   if (error) {
//     console.log("Can't find cats", error);
//   }
//   })
// cat2.save(function(error) {
//     if (error) {
//       console.log("Can't find cats", error);
//     }
//     })
// cat3.save(function(error) {
//       if (error) {
//         console.log("Can't find cats", error);
//       }
//       })

// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can 't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });

// res.render('index.hbs', {
//   layout: 'others'; //or do layout: false
// })

Cat.findOne({name:'Mr.Bigglesworth'}, function(error, cats) {
  if (error) {
    console.log("Can 't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
