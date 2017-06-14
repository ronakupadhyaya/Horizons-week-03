  var express = require('express');
  var path = require('path');
  var exphbs = require('express-handlebars');
  var app = express();
  var data = require('./accounts.json');
  // view engine setup
  app.engine('hbs', exphbs({extname:'hbs'}));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');
  app.use(express.static(path.join(__dirname, 'public')));


  var bodyParser = require('body-parser');
  app.use(bodyParser({extended:true}));
  app.get('/', function(req, res) {
    res.render('example3');
  });




  app.post('/', function(req, res) {
    for (var i = 0; i < data.length; i++){
      if(req.body.email === data[i].email && req.body.password === data[i].password){
        var name = data[i].first_name;
      }
    };
    res.render('example3', {
      emailtext: req.body.email,
      passwordtext: req.body.password,
      printname: name
    });
  });

  // start the express app
  var port = process.env.PORT || 3000;
  app.listen(port);
  console.log('Express started. Listening on port %s', port);
  // console.log(data);
  module.exports = app;
