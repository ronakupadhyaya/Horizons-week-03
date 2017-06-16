  "use strict";

  console.log('mongo url'+ (process.env.MONGODB_URL));

  var mongoose = require('mongoose');
  mongoose.connect(process.env.MONGODB_URL);

  var Student = mongoose.model('Student', {
    name: String
  });

  var max = new Student({name: 'Max'});
  max.save(function(err){
    if(err){
      console.log('could not save', err);
    } else {
      console.log('success');
    }
  });
