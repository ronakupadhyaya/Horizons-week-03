"use strict";
var express = require('express');
var router = express.Router({ mergeParams: true });
var jsonfile = require('jsonfile');
var file = 'data.json';
var GameModel = require('../models/Game.js');

var gameRepresentation = function(game) {
  return {
    id: game.id,
    player1bet: game.player1bet,
    status: game.status,
    userTotal : game.userTotal,
    dealerTotal : game.dealerTotal,
    userStatus : game.userStatus,
    dealerStatus : game.dealerStatus,
    currentPlayerHand : game.currentPlayerHand,
    houseHand : game.houseHand
  }
}

// Write the function for the / route in the game. It should display the list of
// all the games. You should be able to click from the page and navigate to any
// single game. Games can be filtered by "over" or "in-progress"
router.get('/', function (req, res, next) {
  GameModel.find(function (err, games) {
    if (err) return next(err);
    var filteredGames = [];
    for (var i=0; i< games.length; i++){
      var game ={
        id: games[i].id,
        status: games[i].status === "over"? "over" : "progress"
      }
      if (!req.query.status || req.query.status === game.status){
        filteredGames.push(game)
      }
    }
    res.render('index', { title: "Games", filteredGames: filteredGames });
  });
});

// Write a route that creates a new game and redirects to the game page with the
// id. It shoudl redirect to -> `/game/:id`
router.post('/game', function(req, res, next) {
  GameModel.newGame({}, function (err, game) {
    if (err) return next(err);
    console.log('New game id:'+game.id);
    res.redirect('/game/'+game.id);
  });
});
router.get('/game/:id', function(req, res, next) {
  GameModel.findById(req.params.id, function (err, game) {
    if (err) return next(err);
    res.format({
      html: function(){
        res.render('viewgame', { title: 'View Game', game: gameRepresentation(game) });
      },
      json: function(){
        res.json(gameRepresentation(game));
      }
    });
  });
});

// Write a function that posts to the game id with the bet amount the user is making
// the bet should be received from the body. It should start the game after the bet,
// give the first cards to every player and set the game status to started.
// It should return an error if the bet is already set or the game is already started.
// Remember to bring the game from the mongo database by :id and to respond with
// the JSON representation to the client. Also remember to save the game status on
// the database.
router.post('/game/:id', function(req, res, next) {
  console.log('here')
  GameModel.findById(req.params.id, function (err, game) {
    if (err) return next(err);
    if (game.status==="started") return next(new Error("Bet already set"))
    var bet = req.body.bet|| 10;
    game.player1bet=bet;
    GameModel.deal21(game);
    game.status="started";
    game.save();
    res.json(gameRepresentation(game));
  });
});

// This function should add a card to the player. If the bet is not already set,
// it should return an error. If not, a card must be added and the new results
// calculated. Check if the user has gotten over 21 to end the game.
// Respond with the game representation and save to the database.
router.post('/game/:id/hit', function(req, res, next) {
  GameModel.findById(req.params.id, function (err, game) {
    if (err) return next(game);
    if (game.status!=="started" || game.player1bet === 0) return next(new Error("Start game and set bet"))
    GameModel.hit(game)
    game.save();
    res.json(gameRepresentation(game));
  });
});

// Function for when the player has stopped dwaring cards. Dealer draws until they
// have more than 17. Then calculate winner -> Game over.
// This function can only be called if the game is already set.
// Save the json object and respond with the game representation.
router.post('/game/:id/stand', function(req, res, next) {
  GameModel.findById(req.params.id, function (err, game) {
    if (err) return next(game);
    if (game.status!=="started" || game.player1bet === 0) return next(new Error("Start game and set bet"))
    GameModel.stand(game)
    game.save();
    res.json(gameRepresentation(game));
    // Renders JSON of Game State Representation
  });
});

/* Code to delete all games on db.
GameModel.remove({}, function (err, user) {
if (err) console.log(err);
});
*/


var passport = require('passport');
var Account = require('../models/account');


router.get('/asd', function (req, res) {
    res.render('asd', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});


module.exports = router;
