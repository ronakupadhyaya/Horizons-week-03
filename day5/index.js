// Express
var express = require('express');
var app = express();

// BodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose
var mongoose = require('mongoose');
var MONGO_URI = require('./config.js').MONGO_URI;
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in config.js');
  process.exit(1);
});
mongoose.connect(MONGO_URI);

// Routes
var userRouter = require('./routes/userRoutes.js');
app.use('/api/users', userRouter);
var postRouter = require('./routes/postRoutes.js');
app.use('/api/posts', postRouter);

//
// var Token = require('./models/token');
// var User = require('./models/user');
// var Post = require('./models/post');
// console.log("here", User);


// Run the server
app.listen(3000);
