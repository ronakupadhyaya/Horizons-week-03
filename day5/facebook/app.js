//npm dev software
var fs = require('fs');
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//takes in models
var Token = require('./models/post').Token;
var User = require('./models/user').User;
var Post = require('./models/post').Post;
//checks that we are able to use the database and config
if (! fs.existsSync('./config.js')) {
  throw new Error('config.js file is missing');
}
var config = require('./config');
if (! config.MONGODB_URI) {
  throw new Error('MONGODB_URI is missing in file config.js');
}
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in config.js');
  process.exit(1);
});
mongoose.connect(config.MONGODB_URI);
//tells app engine to use hbs file extensions
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
var routes = require('./routes');
app.use('/', routes);
app.listen(3000);
