var express = require('express');
var app = express();
var path = require('path');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var postModel = require('./models/post');
var tokenModel = require('./models/token');
var userModel = require('./models/user');

// console.log(Post);

var Post = mongoose.model('Post', postModel);
var Token = mongoose.model('Token', postModel);
var User = mongoose.model('User', postModel);

app.use(expressValidator());
// app.use(app.router);


app.get('/', function(req, res) {
	res.json({
		a: 1
	});

});

app.post('/api/users/login', function(req, res) {
	// req.body.
	var t = new Token;
	// t.userId = _id
	// t.token = +new Date();
	// t.createdAt = new Date();
	// t.save();

	// t.userId: String,
	// 	token: String,
	// 	createdAt: Date

	res.json({
		a: 1
	});

});


app.post('/api/users/register', function(req, res) {
	console.log(req.body);
});
app.listen(3000);