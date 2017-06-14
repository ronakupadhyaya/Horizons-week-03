var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var accounts = require('./accounts.json');

app.use(bodyParser({extended: true}));
// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/',function(req,res){
  var user = req.body.user;
  var password = req.body.password;
  var valid = false;
  accounts.forEach(function(item){
    if(item.first_name === user && item.password === password){
      valid = true;
    }
  })
  res.render('example3',{
    user: user,
    valid: valid
  })
})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
