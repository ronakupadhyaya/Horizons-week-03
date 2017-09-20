var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var account = require('./accounts')

var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

var bodyParser = require('body-parser');
app.use(bodyParser({extended: true}));

app.get('/', function(req, res) {
  res.render('example3');
});



app.post('/login', function(req, res){
  var verifyEmail = account.filter(function(persons){
    return persons.email === req.body.email
  })
  console.log(verifyEmail)
  var verifyPassword = verifyEmail.filter(function(verify){
    return verify.password === req.body.password
  })
  if (verifyEmail[0].email === req.body.email && verifyPassword[0].password === req.body.password){
    res.render('example3', {
      firstName: verifyEmail[0].first_name
    })
  } else {
    res.render('error', {})
  }
})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
