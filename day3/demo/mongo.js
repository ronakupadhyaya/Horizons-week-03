console.log('mongo url', process.env.MONGODB_URI);

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Student = mongoose.model('Student', {
  name: String
});

var max = new Student({name: 'Max'});
max.save(function(err){
  if(err){
    console.log('Could not save', err);
  }
  else{
    console.log('Success!');
  }
})
