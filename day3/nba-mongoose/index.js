// Require express and create an express app (Part 2.1)
var express = require('express');
var app = express();
// Require mongoose (Part 2.2)
var mongoose = require('mongoose');
// Require and setup body-parser (Part 4.1)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Require the Player model (Part 2.3)

// Require the Roster model (Part 5.2)



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

// Player model import Name, Points, Rebounds, Assists
var Player = require('./model/player');
var Roster = require('./model/roster');
/* =====================================
        WRITE ROUTES DOWN HERE
   ===================================== */

// (Part 3.1)
app.get('/', function(req, res) {
  Player.find(function(err, players) {
    if(err) {
      console.log('Error in getting players', err);
    } else {
      res.send(players);
    }
  })
});

// (Part 4.2)
app.post('/addPlayer', function(req, res) {
  var newPlayer = new Player({
    Name: req.body.Name,
    Points: req.body.Points,
    Rebounds: req.body.Rebounds,
    Assists: req.body.Assists
  });
  newPlayer.save(function(err) {
    if(err) {
      res.status(400).send('Failed to add ' + req.body.Name + ' due to ', err);
    } else {
      res.status(200).send('Successfully added player ' + req.body.Name);
    }
  })
});

// (Part 5.3)
app.post('/addPlayerRoster', function(req, res) {
  var newPlayerRoster = new Roster({
    Name: req.body.Name,
    JerseyNumber: req.body.JerseyNumber,
    Team: req.body.Team
  });
  newPlayerRoster.save(function(err) {
    if(err) {
      res.status(400).send('Failed to add ' + req.body.Name + '\'s roster information due to ', err);
    } else {
      res.status(200).send('Successfully added player roster information for ' + req.body.Name);
    }
  })
})

app.get('/:rosterid', function(req, res) {
  var id = req.params.rosterid;
  var correctRoster;
  var correctPlayer;
  Roster.findById(id, function(err, roster) {
    if(err) {
      res.status(400).send('Unable to find roster with id ' + id);
    } else {
      correctRoster = roster;
      var name = roster.Name;
      Player.findOne({Name: name}, function(err, player) {
        if(err) {
          res.status(400).send('Make sure that ' + player + ' has roster info');
        } else {
          correctPlayer = player;
          var toReturn = {
            Name: player.Name,
            Team: roster.Team,
            JerseyNum: roster.JerseyNumber,
            Points: player.Points,
            Assists: player.Assists,
            Rebounds: player.Rebounds
          }
          var toReturnString = JSON.stringify(toReturn);
          res.status(200).send(toReturnString);
        }
      })
    }
  })
})
// (BONUS)
app.delete('/:rosterid', function(req, res) {
  var id = req.params.rosterid;
  Roster.findById(id, function(err, roster) {
    if(err) {
      res.status(400).send('Could not find roster with that id ' + id);
    } else {
      name = roster.Name;
      Player.findOne( {Name: name}, function(err, player) {
        if(err) {
          res.status(400).send('Could not find player associated with that roster ' + name);
        } else {
          Roster.deleteOne( {_id: id}, function(err) {
            if(err) {
              res.status(400).send('Failed to delete roster with id ' + id);
            } else {
              Player.deleteOne( {Name: name}, function(err) {
                if(err) {
                  res.status(400).send('Failed to delete player with name ' + name);
                } else {
                  res.status(200).send('Successfully deleted roster and player information for ' + name);
                }
              })
            }
          })
        }
      })
    }
  })
})



// Begin listening on port 3000 (Part 2.1)
app.listen(3000, function() {
  console.log('Listening on port 3000');
});
