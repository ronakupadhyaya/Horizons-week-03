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
    houseHand : game.houseHand,
  }
}
router.get('/', function (req, res, next) {
  GameModel.find(function (err, games) {
    if (err) return next(err);
    res.json(games);
  });
  //  res.render('index', {});
});


router.post('/game', function(req, res, next) {
  GameModel.newGame({}, function (err, game) {
    if (err) return next(err);
    //res.json(gameRepresentation(game));
    console.log('/game/'+game.id);
    res.redirect('/game/'+game.id);
  });
});
router.get('/game/:id', function(req, res, next) {
  GameModel.findById(req.params.id, function (err, game) {
    if (err) return next(err);
    console.log(gameRepresentation(game))
    //res.render('viewgame', { title: 'View Game' });
  });
});

router.post('/game/:id/bet', function(req, res, next) {
  GameModel.findById(req.params.id, function (err, game) {
    if (err) return next(err);
    if (game.status==="started") return next(new Error("Bet already set"))
    var bet = req.query.bet|| 10;
    game.player1bet=bet; //TODO error if already declared.
    GameModel.deal21(game);
    game.status="started";
    game.save();
    res.json(gameRepresentation(game));
    // Renders JSON of Game State Representation
  });
});

router.post('/game/:id/hit', function(req, res, next) {
  GameModel.findById(req.params.id, function (err, game) {
    if (err) return next(game);
    if (game.status!=="started" || game.player1bet === 0) return next(new Error("Start game and set bet"))
    GameModel.hit(game)
    game.save();
    res.json(gameRepresentation(game));
    // Renders JSON of Game State Representation
  });
});

// player has stopped dwaring cards.
// Dealer draws until they have more than 17
// Calculate winner -> Game over/
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


/*
router.post('/login', function(req, res) {
res.cookie('username', req.body.username).redirect('/posts');
});

router.get('/posts', function (req, res) {
// YOUR CODE HERE
var displayposts = posts;
if (req.query.username){
displayposts = displayposts.filter(function(post){
return post.author===req.query.username
});
}
if (req.query.order==='ascending'){
displayposts.sort(function(a,b) { return new Date(a.date) - new Date(b.date); })
} else {
displayposts.sort(function(a,b) { return new Date(b.date) - new Date(a.date); })
}
res.render('posts', {
title: 'Posts',
posts: displayposts
});
});

// GET POSTS: Renders the form page, where the user creates the request.
// User must be logged in to be able to visit this page.
// Hint: if req.cookies.username is set, the user is logged in.
router.get('/posts/new', function(req, res) {
// YOUR CODE HERE
if (req.cookies && req.cookies.username){
res.render('post_form', { title: 'New Post' });
}
else{ console.log("not logged") }
});

// POST POSTS: This route receives the information for the new post. User must
// be logged in to use this route. It should create a new post and redirect to
// posts.
// It should also use express-validator to check if the title and body aren't empty.
// an example validation using express-validator is:
// req.checkBody('email', 'Email must not be valid').isEmail();
// Don't forget to check if there are validation errors at req.validationErrors();

// Append the new post to the posts array, and use jsonfile.writeFileSync(file, posts);
// to write the entire posts array to disk
router.post('/posts', function(req, res) {
// YOUR CODE HERE
req.checkBody('title', 'Title must not be empty').notEmpty();
req.checkBody('text', 'Title must not be empty').notEmpty()
var errors = req.validationErrors();

if (errors){
res.render('post_form', {
title: 'New Post',
error:"Title and body can't be blank"});
}
if (req.cookies && req.cookies.username && !errors){
var post = {
author: req.cookies.username,
date: req.body.date,
title: req.body.title,
text: req.body.text
}
posts.push(post);
jsonfile.writeFileSync(file, posts);
res.redirect('/posts')
}
});
*/
module.exports = router;
