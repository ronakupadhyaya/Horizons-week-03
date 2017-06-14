var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

var genderArr = ['Male', 'Female']
var statesArr = [ "AK - Alaska",
                "AL - Alabama",
                "AR - Arkansas",
                "AZ - Arizona",
                "CA - California",
                "CO - Colorado",
                "CT - Connecticut",
                "DC - District of Columbia",
                "DE - Delaware",
                "FL - Florida",
                "GA - Georgia",
                "GU - Guam",
                "HI - Hawaii",
                "IA - Iowa",
                "ID - Idaho",
                "IL - Illinois",
                "IN - Indiana",
                "KS - Kansas",
                "KY - Kentucky",
                "LA - Louisiana",
                "MA - Massachusetts",
                "MD - Maryland",
                "ME - Maine",
                "MI - Michigan",
                "MN - Minnesota",
                "MO - Missouri",
                "MS - Mississippi",
                "MT - Montana",
                "NC - North Carolina",
                "ND - North Dakota",
                "NE - Nebraska",
                "NH - New Hampshire",
                "NJ - New Jersey",
                "NM - New Mexico",
                "NV - Nevada",
                "NY - New York",
                "OH - Ohio",
                "OK - Oklahoma",
                "OR - Oregon",
                "PA - Pennsylvania",
                "PR - Puerto Rico",
                "RI - Rhode Island",
                "SC - South Carolina",
                "SD - South Dakota",
                "TN - Tennessee",
                "TX - Texas",
                "UT - Utah",
                "VA - Virginia",
                "VI - Virgin Islands",
                "VT - Vermont",
                "WA - Washington",
                "WI - Wisconsin",
                "WV - West Virginia",
                "WY - Wyoming"]

app.get('/', function(req, res) {
  var bool = false;
  if (req.query.gender === 'Male') {
    bool = true;
  } else {
    bool = false;
  }
  var isState = false;
  var theState = null;
  statesArr.forEach(function(state) {
    if (req.query.state === state) {
      isState = true;
      theState = req.query.state;
    }
  })
  res.render('example2', {
    text: req.query.text,
    usernametxt: req.query.username,
    pwdtxt: req.query.password,
    nametxt: req.query.name,
    bool: bool,
    state: req.query.state,
    isState: isState,
    theState : theState,
    statesArr : statesArr,
    genderArr: genderArr,
  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
