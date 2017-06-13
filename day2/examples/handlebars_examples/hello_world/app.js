var express = require('express')
var app = express();
var handlebars = require('express-handlebars');

app.engine('hbs',handlebars({
  extname:'.hbs'
}));
app.set('view engine','hbs');

app.use('/*',function(req,res) {
  greeting = req.params;
  console.log(greeting)
  console.log(greeting['0'].substring(1,greeting['0'].length))
  console.log()
  if (greeting['0'] === '') {
    greeting = "Hello World"
  } else {
    if (greeting['0']['0'] === ':') {
      greeting = '<' + greeting['0'].substring(1,greeting['0'].length) + '>' + " page not found, did you enter the correct url?";
    } else {
      greeting = greeting['0'] + " page not found, did you enter the correct url?"
    }
  }
  res.render('firsthbs', {
    greetingSen: greeting
  })
})

app.listen(3000)
