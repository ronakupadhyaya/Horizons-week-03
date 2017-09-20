var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var fs = require('fs');
var data = fs.readFileSync('./accounts.json')
var data1 = JSON.parse(data);
var bodyparser = require('body-parser');
var app = express();
app.use(bodyparser({extended:true}));




// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/login', function(req, res) {
  var result = data1.filter(function(person) {
    if(person.email === req.body.userName)  {
    return person.password === req.body.password}
  })
  console.log(result);
  res.render('example3', {
    firstname: result[0].first_name
  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
