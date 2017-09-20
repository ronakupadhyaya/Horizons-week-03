// Require express and create an express app (Part 2.1)
var express = require('express');
var app = express();

// Require mongoose (Part 2.2)
var mongoose = require('mongoose');

// Require and setup body-parser (Part 4.1)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Require the Player model (Part 2.3)
var Player = require('./model/player');

// Require the Roster model (Part 5.2)
var Roster = require('./model/roster');

// Ensure that there is a MONGODB_URI environment variable (source env.sh)
if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}


mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function(err) {
  console.log('Error connecting to MongoDb: ' + err);
  process.exit(1);
});
// Establish mongoose connection to the mongoDB on mlab (Part 2.2)
mongoose.connect(process.env.MONGODB_URI);


/* =====================================
        WRITE ROUTES DOWN HERE
   ===================================== */

// (Part 3.1)
app.get('/', function(req, res) {
  Player.find({}, function(error, foundPlayers) {
    if (error) {
      console.log(error);
    } else {
      res.json(foundPlayers);
    }
  })
});

// (Part 4.2)
app.post('/addPlayer', function(req, res) {
  var newPlayer = new Player({
    Name: "ricky sharma",
    Points: 9001,
    Rebounds: 8,
    Assists: 7
  });

  newPlayer.save({}, function(error) {
    if (error) {
      console.log(error);
    } else {
      res.redirect('/');
    }
  });
});

// (Part 5.3)
app.post('/addPlayerRoster', function(req, res) {
  var newRoster = new Roster({
    Name: "Kevin Durant",
    JerseyNumber: 7,
    Team: "Spurs"
  });

  newRoster.save({}, function(error) {
    if (error) {
      console.log(error);
    } else {
      res.redirect('/');
    }
  });
});


// (BONUS)
app.get('/:rosterid', function(req, res) {
  var ret = {};
  var rosterid = req.params.rosterid;
  Roster.findById(rosterid, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(response.Name);
      Player.findOne({"Name": response.Name}, function(error2, foundPlayer) {
        if (error2) {
          console.log(error2);
        } else {
          ret["Name"] = response.Name;
          ret["Team"] = response.Team;
          ret["JerseyNumber"] = response.JerseyNumber;
          ret["Points"] = foundPlayer.Points;
          ret["Assists"] = foundPlayer.Assists;
          ret["Rebounds"] = foundPlayer.Rebounds;
          console.log("it works!", ret);
          res.json(ret);
        }
      });
    }
  });

});

app.delete('/:rosterid', function(req, res) {
  Roster.findById({"_id": req.params.rosterid}, function(err, resp) {
    if (err) {
      console.log(err);
    } else {
      Roster.deleteOne({"_id": req.params.rosterid}, function(error, response) {
        if (error) {
          console.log(error);
        } else {
          Player.deleteOne({"Name": resp.Name}, function(error2, response2) {
            if (error2) {
              console.log(error2);
            } else {
              res.redirect('/');
            }
          });
        }
      });
    }
  });
});

// Begin listening on port 3000 (Part 2.1)
app.listen(3000, function() {
  console.log("Listening on port 3000")
});
