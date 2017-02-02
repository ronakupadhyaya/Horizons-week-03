var mongoose = require('mongoose');
var express = require('express');

var app = express();
mongoose.connect('mongodb://student:horizon@ds139899.mlab.com:39899/rick-test');

var Cat = mongoose.model('Cat', {name: {
                                    type: String,
                                    required: true},
                                  furColor: {
                                    type: String,
                                    required: true
                                  }
                                });

var mrWhiskers = new Cat({name: 'Mr Whiskers', furColor: 'calico'});

var mister = new Cat({name: 'Mr Meow', furColor: 'calico'});

mrWhiskers.save(function(error) {
  if (error) {
    console.log('Error', error);
  } else {
    console.log('Mr. Whiskers says MEOW');
  }
});


mister.save(function(error) {
  if (error) {
    console.log('Error', error);
  } else {
    console.log('mister meow says asuh dude');
  }
});

app.get('/cats', function(req, res){
    Cat.find({},function(err,cats){
      if (err) {
        console.log('u dun fukked');
        throw err;
      }
      else if (cats){
        console.log('beans greens cats');
        res.send(function());
      }
    })
})

app.listen(3000);
