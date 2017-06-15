'use strict';
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI); /// hiding url from git

// console.log(process.env.MONGODB_URI);

// var Student = mongoose.model('student', { /// model ---- constructor
//   name: String
// });
// var max = new Student({ ////   document ----- instance of constructor
//   name: 'max'
// });
//
var Cat = mongoose.model('Cat', {
  name: String,
  furColor: String,
  age: Number
})

// var catDoc1 = new Cat({
//   name: 'Crookshanks',
//   furColor: 'Black',
//   age: 100
// })
// var catDoc2 = new Cat({
//   name: 'Mr. Bigglesworth',
//   furColor: 'White'
// })
// var catDoc3 = new Cat({
//   name: 'Empurress',
//   furColor: 'Calico'
// })
// //
// catDoc1.save(function(err) {
//   if (err) {
//     console.log('cound not save');
//   } else {
//     console.log('done!');
//   }
// })
// catDoc2.save(function(err) {
//   if (err) {
//     console.log('cound not save');
//   } else {
//     console.log('done!');
//   }
// })
// catDoc3.save(function(err) {
//   if (err) {
//     console.log('cound not save');
//   } else {
//     console.log('done!');
//   }
// })

// Cat.findOne({ /// .find() return many items. .findOne() return only one
//   name: 'Empurress'
// }, function(error, target) {
//   if (error) {
//     console.log('cannot find');
//   } else {
//     console.log(target);
//   }
// })

// max.save(function(err) {
//   if (err) {
//     console.log('cound not save');
//   } else {
//     console.log('done!');
//   }
// })

// Student.find({
//   name: 'max'
// }, function(err, student) {
//   if (err) {
//     console.log('there is a problem');
//   } else {
//     console.log(student);
//   }
// })
