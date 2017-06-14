var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var _ = require('underscore');
var app = express();
var data = require('./accounts.json');

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

app.post('/login',function(req,res){
  var flag = _.find(data,function(item){return item.email===req.body.email});
  if((typeof flag != 'undefined')  && (flag.password === req.body.password)){
    res.render('example3',{
      thing: true,
      name: flag.first_name
    })
  }
  else {
    res.render('example3',{
      thing: false
    })
  }

})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
