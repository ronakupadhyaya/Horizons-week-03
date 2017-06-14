// First let's set up our MongoDb connection
if(! process.env.MONGODB_URI) {
  process.exit(1);
}

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);



var Cat = mongoose.model('Cat', {
  name: String,
  furColor: String
})

var cat1 = new Cat({
  name: 'Crookshanks',
  furColor: 'Black'
});

var cat2 = new Cat({
  name: 'MrBigglesworth',
  furColor: 'White'
});
var cat3 = new Cat({
  name: 'Empurress',
  furColor: 'Calico'
});
cat1.save(function(err) {
  if(err) {
    console.log('could not save', err);
  } else {
    console.log('success');
  }
});
cat2.save(function(err) {
  if(err) {
    console.log('could not save', err);
  } else {
    console.log('success');
  }
});
cat3.save(function(err) {
  if(err) {
    console.log('could not save', err);
  } else {
    console.log('success');
  }
});

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
