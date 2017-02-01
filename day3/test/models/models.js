// First let's set up our MongoDb connection
var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://junjiejiang:justdoit123!@ds139879.mlab.com:39879/junjiehorizons');


var Cat = mongoose.model('Cat',{
      name: {
        type: String,
        required: true
      },
      furColor: String
    });

app.get('/cats', function(req, res){
	Cat.find({}, function(err, cats){
		if(err){
			throw err;
		}else{
			console.log(cats);
			res.json(cats);
		}
	})
})
app.listen(3001);

// // var Cat = mongoose.model('Cat', 
// // 	{name: String, furColor: String},
// // 	furColor: String
// // 	)

//  var Cat = mongoose.model('Cat', schema);

// var namelessCat = new Cat({name: 'Mr Whiskers', furColor: 'calico'});

// mrWhiskers.save(function(error){
// 	if(error){
// 		console.log('error', error);
// 	}else{
// 		console.log('meow');
// 	}
// 	console.log('inside callback');
// });
// var x;
// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//     x = cats;
//   }
// });

// var express = require('express')
// var app = express();
// app.get('/cat', funciton(req, res){
// 	res.send(x);
// });

// var document = new Cat({ name: 'TheChosenCat' });
// document.save(function (err) { });