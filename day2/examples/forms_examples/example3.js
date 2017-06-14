var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();
var data = require('./accounts');

var bodyParser=require('body-parser');
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
  var user=req.body.user;
  var pass=req.body.pass;
  var flag=false;
  var name;
  for(var i=0;i<data.length;i++){
    if(data[i].email===user && data[i].password===pass){
      flag=true;
      name=data[i].first_name;
      break;
    }
  }
  if(flag){
  res.render('example3',{
    name:name,
    uservalue:user,
    passvalue:pass
  })}
  else{
    res.render('example3',{
      uservalue:"error",
      passvalue:"error"
    })
  }
})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
