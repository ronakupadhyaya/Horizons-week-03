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
       selected: function(val){
        var ret ='';
        var time = ['days', 'months', 'years']
        for(var i =0; i < time.length; i ++){
          time[i] === val ? ret+=`<option selected>${time[i]}</option>`  : ret+=`<option>${time[i]}</option>`;
        }
        return ret;
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
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
}

app.get('/', function(req, res) {
  // YOUR CODE HERE
  var date = new Date(req.query.when);
  console.log(date);
  if(req.query.action ==='to the future!'){
    if(req.query.units === 'days'){
    date.setDate(date.getDate()+ 1 + parseInt(req.query.amount));
    }
    if(req.query.units === 'months'){
       date.setMonth(date.getMonth() + parseInt(req.query.amount));
    }
    if(req.query.units === 'years'){
      date.setFullYear(date.getFullYear()+ parseInt(req.query.amount));
    }
  }
  if(req.query.action ==='to the past'){
    if(req.query.units === 'days'){
      date.setDate(date.getDate()- parseInt(req.query.amount));
    }
    if(req.query.units === 'months'){
      date.setMonth(date.getMonth()- parseInt(req.query.amount));
    }
    if(req.query.units === 'years'){
      date.setFullYear(date.getFullYear()- parseInt(req.query.amount));
  }
}
console.log(date);
res.render('index', {
  when: toDateStr(date),
  amount:req.query.amount,
})
})

app.listen(3000);
