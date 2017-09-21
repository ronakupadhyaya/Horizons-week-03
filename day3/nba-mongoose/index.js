// Require express and create an express app (Part 2.1)
var express = require('express')
var app = express()

// Require mongoose (Part 2.2)
var mongoose = require('mongoose')

// Require and setup body-parser (Part 4.1)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// Require the Player model (Part 2.3)
var Player = require('./model/player')

// Require the Roster model (Part 5.2)
var Roster = require('./model/roster')


// Ensure that there is a MONGODB_URI environment variable (source env.sh)
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}


mongoose.connection.on('connected', function () {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function (err) {
  console.log('Error connecting to MongoDb: ' + err);
  process.exit(1);
});

// Establish mongoose connection to the mongoDB on mlab (Part 2.2)
mongoose.connect(process.env.MONGODB_URI);

/* =====================================
        WRITE ROUTES DOWN HERE
   ===================================== */

// (Part 3.1)
app.get('/', function (request, response) {
  Player.find(function (error, results) {
    if (error) {
      console.log('Unable to fetch the data from Mongoose..')
    } else {
      response.send(results);
    }
  })
})

app.get('/:rosterid', function (request, response) {
  Roster.findOne({
      "_id": request.params.rosterid
    },
    function (error, roster) {
      if (roster) {
        var searchName = roster.Name;
        Player.findOne({
          "Name": searchName
        }, function (error, player) {
          if (error) {
            response.send('There is no player for this roster ID..')
          } else {
            var playerToDisplay = {}
            playerToDisplay.Name = player.Name;
            playerToDisplay.Team = roster.Team;
            playerToDisplay.JerseyNumber = roster.JerseyNumber;
            playerToDisplay.Points = player.Points;
            playerToDisplay.Assists = player.Assists
            playerToDisplay.Rebounds = player.Rebounds
            response.send(playerToDisplay)
          }
        })
      } else {
        response.send('This roster ID does not exist..')
      }
    })
})

// (Part 4.2)
app.post('/addPlayer', function (request, response) {
  var body = request.body;
  var newPlayer = new Player({
    Name: body.Name,
    Points: body.Points,
    Rebounds: body.Rebounds,
    Assists: body.Assists
  });
  newPlayer.save(function (error) {
    if (error)
      response.send('There was an error saving this player..')
    else
      response.send('Player added successfully!')
  })
})

// (Part 5.3)
app.post('/addPlayerRoster', function (request, response) {
  var body = request.body;
  var newRoster = new Roster({
    Name: body.Name,
    JerseyNumber: body.JerseyNumber,
    Team: body.Team
  });
  newRoster.save(function (error) {
    if (error)
      response.send('There was an error saving this roster..')
    else
      response.send('Roster added successfully!')
  })
})

// (BONUS)

app.delete('/:rosterid', function (request, response) {
  Roster.findByIdAndRemove(request.params.rosterid, function (error, roster) {
    if (roster) {
      Player.findOneAndRemove({
        "Name": roster.Name
      }, function (error, player) {
        if (player) {
          response.send('Player and Roster removed..')
        } else {
          response.send('No player was found for this Roster ID..')
        }
      })
    } else {
      response.send('This roster ID does not exist..')
    }
  })
})


// Begin listening on port 3000 (Part 2.1)
var port = 3000;
app.listen(port, function () {
  console.log('Listening on port', port)
})
