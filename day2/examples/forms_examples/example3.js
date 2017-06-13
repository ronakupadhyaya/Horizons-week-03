var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var accounts= require('./accounts');


var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser({extended:true}));
// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/login',function(req,res){
  var inputus = req.body.username;
  var inputps = req.body.password;
  var found = accounts.find(function(item){
    return item.email ===inputus && item.password === inputps;
  });
  if (found){
  res.render('login', {
     showname:found.first_name
  })
} else {
  res.render('login', {
     showname:'mysterious stranger'
  })
}
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
