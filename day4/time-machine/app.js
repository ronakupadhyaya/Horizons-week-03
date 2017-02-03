var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs(
  {
    extname: '.hbs',
    helpers: {
      unitSel: function(selectedoption) {
        var ret = ''
        var option = ['days','months','years'];
        for (var i = 0; i < option.length; i++) {
          if (option[i] === selectedoption) {
            ret += `<option selected>${option[i]}</option>`
          } else {
            ret += `<option>${option[i]}</option>`
          }
        }
        return ret
      },
      futureOrPast: function(obj) {
        var ret = ''
        var newDate = new Date(obj.when)
        if(obj.units === 'days' && obj.action === 'to the future!'){
          newDate.setDate(newDate.getDate() + parseInt(obj.amount))
        } else if (obj.units === 'days' && obj.action === 'to the past'){
          newDate.setDate(newDate.getDate() - parseInt(obj.amount))
        }
        if(obj.units === 'months' && obj.action === 'to the future!'){
          newDate.setMonth(newDate.getMonth() + parseInt(obj.amount))
        } else if (obj.units === 'months' && obj.action === 'to the past'){
          newDate.setMonth(newDate.getMonth() - parseInt(obj.amount))
        }
        if(obj.units === 'years' && obj.action === 'to the future!'){
          newDate.setFullYear(newDate.getFullYear() + parseInt(obj.amount))
        } else if (obj.units === 'years' && obj.action === 'to the past'){
          newDate.setFullYear(newDate.getFullYear() - parseInt(obj.amount))
        }
        var newerDate = toDateStr(newDate)
        console.log(obj.action)
        ret += `<input type="date" name="when" value=${newerDate}>`
        return ret
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
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate() + 1);
}

app.get('/', function(req, res) {
  res.render('index', req.query);
});

app.listen(3000);
