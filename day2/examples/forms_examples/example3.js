var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

// get json file
var data = require('./accounts');
// get bodyParser
var bodyParser = require('body-parser');


var app = express();
// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// use body parser?
app.use(bodyParser({extended: true}));

app.get('/', function(req, res) {
  res.render('example3');
});

// respond appropriately to a post request @ '/login'
app.post('/login', function(req, res){
  var found = false;
  var i = null;
  for(var i = 0 ; i < data.length ; i++){
    if(data[i].email === req.body.email && data[i].password === req.body.password){
      found = true;
      break;
    }
  }

  if(found){
    res.render('example3', {
      post: true,
      name: data[i].first_name,
      formEmail: req.body.email,
      formPassword: req.body.password
    });
  } else {
    res.render('example3', {
      post: true,
      name: false,
      formEmail: req.body.email,
      formPassword: req.body.password
    });

  }

})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
