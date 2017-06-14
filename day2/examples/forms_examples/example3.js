var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
var bodyParser=require('body-parser');
app.use(bodyParser({extended:true}));
var data=require('./accounts.json')
console.log(data);

app.get('/login',function(req,res){
  res.render('example3')
})

app.post('/login', function(req, res) {
  var user;
  for (var i = 0; i < data.length; i++) {
    if (req.body.email===data[i].email &&
  req.body.password===data[i].password){
    user = data[i]}
  }

  res.render('example3',{
  isValid: user !== undefined,
  first_name: user !== undefined ? user.first_name : '',
});
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
