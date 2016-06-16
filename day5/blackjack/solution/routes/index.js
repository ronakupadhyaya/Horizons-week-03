"use strict";
var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var file = 'data.json';
var GameModel = require('../models/Game.js');


var gameRepresentation = function(game) {
  return {
    id: game.id,
    userTotal : game.userTotal,
    dealerTotal : game.dealerTotal,
    userBust : game.userBust,
    dealerBust : game.dealerBust,
    currentPlayerHand : game.currentPlayerHand,
    houseHand : game.houseHand,
    status : 'in-progress'
  }
}
router.post('/game', function(req, res) {
  GameModel.newGame({}, function (err, game) {
    if (err) return next(err);

    //res.json(gameRepresentation(game));

    console.log('/game/'+game.id);
    res.redirect('/game/'+game.id);
});
router.get('/game/:id', function(req, res) {
  GameModel.findById(req.params.id, function (err, game) {
      if (err) return next(game);
      console.log(gameRepresentation(game))
    //res.render('viewgame', { title: 'View Game' });
    });



});
router.post('/game/:id/bet:123', function(req, res) {
// store the player's bet.
// error if already declared.
// store game in progrees=true
// Renders JSON of Game State Representation
});


  //game = new Game();
  ///res.json(game.gameRepresentation(game))
  //res.render('login', { title: 'Log In' });
});
router.get('/hit', function(req, res) {
  game.hit()
  res.json(game.gameRepresentation(game))
});

router.get('/stand', function(req, res) {
  game.stand()
  res.json(game.gameRepresentation(game))
});






//ROUTEEEEES

router.get('/', function(req, res) {
// filter ?status=in-progress or over
//res.render('gamelist', { title: 'List Of Games' });
});

router.post('/game/:id/hit:', function(req, res) {
// error if no bet yet.
// error if game not in progress
// player gets new cards
// check if player busts.
// Renders JSON of Game State Representation
});
router.post('/game/:id/stand:', function(req, res) {
// error if no bet yet.
// error if game not in progress
// player has stopped dwaring cards.
// Dealer draws until they have more than 17
// Calculate winner -> Game over/
// Renders JSON of Game State Representation
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
