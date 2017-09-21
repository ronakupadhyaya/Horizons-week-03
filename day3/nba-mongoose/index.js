// Require express and create an express app (Part 2.1)
var express = require('express');
var app = express();

// Require mongoose (Part 2.2)
var mongoose = require('mongoose');

// Require and setup body-parser (Part 4.1)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Require the Player model (Part 2.3)
var Player = require('./model/player');

// Require the Roster model (Part 5.2)
var Roster = require('./model/roster');



// Ensure that there is a MONGODB_URI environment variable (source env.sh)
if (!process.env.MONGODB_URI) {
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
  Player.find(function(error, players) {
    if (error) {
      console.log("Error", error);
    } else {
      res.send(players);
    }
  })
})

// (Part 4.2)
app.post('/addPlayer', function(req, res) {
  var kwame = new Player({
    Name: req.body.name,
    Points: req.body.pts,
    Rebounds: req.body.rbs,
    Assists: req.body.ats
  });
  kwame.save(function(err) {
    if (err) {
      res.send(err)
    } else {
      res.send(`Success ${kwame.Name} added!`)
    }
  })
})

// (Part 5.3)
app.post('/addPlayerRoster', function(req, res) {
  var roster = new Roster({
    Name: req.body.name,
    JerseyNumber: req.body.num,
    Team: req.body.team
  });
  roster.save(function(err) {
    if (err) {
      res.send(err)
    } else {
      res.send(`Success ${roster.Name} added to ${roster.Team}!`)
    }
  })
})

app.get('/:rosterid', function(req, res) {
  Roster.findById(req.params.rosterid, function(error, roster) {
    if (roster) {
      var playertemp = {
        Name: roster.Name,
        Team: roster.Team,
        JerseyNumber: roster.JerseyNumber
      }
      Player.findOne({
        "Name": playertemp.Name
      }, function(error, player) {
        if (error) {
          res.send(`There was an error finding ${playertemp.Name}.  He may not exist in the player database.`);
        } else {
          playertemp.Points = player.Points;
          playertemp.Assists = player.Assists;
          playertemp.Rebounds = player.Rebounds;
          res.send(playertemp)
        }
      })
    } else {
      res.send(`The roster ID ${req.params.rosterid} does not exist`);
    }
  })
})

// (BONUS)
app.delete('/:rosterid', function(req, res) {
  Roster.findByIdAndRemove(req.params.rosterid, function(error, roster) {
    if (roster) {
      var name = roster.Name
      Player.findOneAndRemove({
          Name: name
        },
        function(error, player) {
          if (error) {
            res.send(`There was an error finding ${name}.  He may not exist in the player database.`);
          } else {
            res.send(`${name} was properly removed`)
          }
        })
    } else {
      res.send(`The roster ID ${req.params.rosterid} does not exist`);
    }
  })
})


// Begin listening on port 3000 (Part 2.1)
app.listen(3000, function() {
  console.log("Listenting on port 3000");
})
