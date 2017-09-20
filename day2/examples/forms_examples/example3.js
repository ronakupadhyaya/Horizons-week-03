var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser({extended:true}));

var accounts = require('./accounts');

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3',{firstTimeLoggingIn:true});
});


app.post('/login',function(req,res){
    var password = req.body.password;
    var email = req.body.email;
    var valid = false;
    var name = "";
    accounts.forEach(function(account){
      if(account.email===email && account.password===password){
        valid = true;
        name = account.first_name;
      }
    });
    res.render('example3',{loggedIn:valid,first_name:name});
});




// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
