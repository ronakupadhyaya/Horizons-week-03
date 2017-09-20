var express = require('express');
var app = express();
var handlebars = require('express-handlebars');

app.engine('hbs', handlebars({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', function(req, res){
  var hello = 'Hello world!';
  res.render('myFirstTemplate',{
    content:hello
  });
});

app.get('/:error', function(req, res){
  // res.render('myFirstTemplate'),{
  //   content:'<error> page not found, did you enter the correct url?'
  // };
  res.send(req.params.error + ': page not found, did you enter the correct url?');
})

app.listen(3000);
console.log('started');
