var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs(
  {
    extname: '.hbs',
    helpers: {
      // You can define an Handlebars helper here
      // YOUR CODE HERE
        water : function(options, selectedOption){
        var ret = '';

        for (var i = 0; i < options.length; i++) {
          if(selectedOption === options[i]){
            
          }else{
            ret += '<option>' + options[i] + '</option>'
          }
          
        }

      }
    }
  }));
app.set('view engine', '.hbs');

function pad(num) {
  var norm = Math.abs(Math.floor(num));
  return (norm < 10 ? '0' : '') + norm;
}

// This function
function toDateStr(date) {
  return date.getFullYear() + '-' + pad(date.getMonth()) + '-' + pad(date.getDate()+1);
}

app.get('/', function(req, res) {
  // YOUR CODE HERE
  var now = new Date(req.query.when)
  
  if(req.query.action === 'to the future!'){
    if(req.query.units === 'days'){      
      now.setDate(now.getDate() + parseInt(req.query.amount)) + 1; 

    }else if(req.query.units === 'months'){
      console.log(now)
      now.setDate(now.getMonth() + parseInt(req.query.amount));
      console.log(now)
    }else{
      now.setDate(now.getFullYear() + parseInt(req.query.amount)); 
    }

  }else if(req.query.action === 'to the past'){

    if(req.query.units === 'days'){
      now.setDate(now.getDate() - req.query.amount); 
    }else if(req.query.units === 'months'){
      now.setDate(now.getMonth() - req.query.amount); 
    }else{
      now.setDate(now.getFullYear() - req.query.amount); 
    }

  }

var option = option.map(function(){
  return: 

})

  console.log(toDateStr(now))
  res.render('index', {
    time: toDateStr(now),
    howmuch: req.query.amount
  });
});


app.listen(3002);
