"use strict";
var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var file = 'data.json';

/*
// Posts loaded from disk
var posts = jsonfile.readFileSync(file);

var Game = function(maze) {
this.deck = [];

// TODO: substract user money.
this.userTotal=0;
this.dealerTotal=0;
this.userBust=false;
this.dealerBust=false;
this.currentPlayerHand = [];
this.houseHand = [];
this.newDeck()
this.deal21()
}

Game.prototype.createDeck = function (){
var suit, symbol;
for(var k=1; k<=4; k++){
switch(k){
case 1: suit ="hearts"; break;
case 2: suit ="diamonds"; break;
case 3: suit ="spades"; break;
case 4: suit ="clubs"; break;
}
for(var i=1; i<=13; i++){
symbol = i;
switch(i){
case 1: symbol = "A"; break;
case 11: symbol = "J"; break;
case 12: symbol = "Q"; break;
case 13: symbol = "K"; break;
}
this.deck.push(new Card(suit, i, symbol));
}
}
}

Game.prototype.shuffleDeck = function () {
var currentIndex = this.deck.length, temporaryValue, randomIndex;
while (0 !== currentIndex) {
randomIndex = Math.floor(Math.random() * currentIndex);
currentIndex -= 1;
temporaryValue = this.deck[currentIndex];
this.deck[currentIndex] = this.deck[randomIndex];
this.deck[randomIndex] = temporaryValue;
}
}

Game.prototype.calcValue = function (hand){
var val = 0;
var tempArr = hand;
tempArr.sort(function(a,b) { return parseFloat(a.val) - parseFloat(b.val) } );
for(var i=tempArr.length-1; i>=0; i--) {
var temp = tempArr[i];
if(temp.val === 1 && val <=10){temp.val = 11;}
else if(temp.val >=10){temp.val = 10;}
val += temp.val;
}
return val;
}

Game.prototype.emptyDeck = function (){
return (this.deck.length < 1)
}
Game.prototype.newDeck = function (){
this.createDeck()
this.shuffleDeck()
}

Game.prototype.deal21 = function () {
for(var i=0; i<2; i++){
if(this.emptyDeck())this.newDeck();
this.currentPlayerHand.push(this.deck.pop());
if(this.emptyDeck())this.newDeck();
this.houseHand.push(this.deck.pop());
}
this.userTotal = this.calcValue(this.currentPlayerHand);
this.dealerTotal = this.calcValue(this.houseHand);
// TODO: hide dealers first card!!
//  var blackjack =true; ???
//  if(this.userTotal === 21 && this.dealerTotal < 21) this.gameOver(blackjack); //userWins
//  else if(this.dealerTotal === 21) this.gameOver(); //dealer Wiinssss.
};

Game.prototype.hit = function (){
if(this.emptyDeck())this.newDeck();
this.currentPlayerHand.push(this.deck.pop());
this.userTotal = this.calcValue(this.currentPlayerHand);
//show the last card onscreen
//set the users score onscreen

if(this.userTotal > 21){
//set user lost on screen.
this.userBust = true;
this.gameOver();
}
};

Game.prototype.stand = function stand(){
while(this.dealerTotal < 17){
if(this.emptyDeck())this.newDeck();
this.houseHand.push(this.deck.pop());
//show last card
this.dealerTotal = this.calcValue(this.houseHand);
//set the dealers onscreen

if(this.dealerTotal > 21){
//set dealer lost.
this.dealerBust = true;
}
}
this.gameOver();
}


Game.prototype.gameOver = function gameOver(blackjack){
//show hoidden card
// show dealer score.
//hide hit/stand buttons
if(this.userTotal > this.dealerTotal && this.userBust === false || this.dealerBust ===true){
//user wins
console.log("YOUWIN")
throw new Error();
//this.money+=2; // TODO += 2*bet
// RESPONSE YOU WIN

}
else if(this.userTotal === this.dealerTotal && this.userBust === false){
console.log("HAH you tied.")
throw new Error();
//this.money++; // money += bet.
//response -> TIED
}
// HAH you lost.
console.log("HAHhahahah you lost.")
throw new Error();
}

function Card(suit, val, symbol) {
this.suit = suit;
this.val = val;
this.symbol = symbol;
}







//ROUTEEEEES

router.get('/', function(req, res) {
// filter ?status=in-progress or over
//res.render('gamelist', { title: 'List Of Games' });
});
router.post('/game', function(req, res) {
//Create New Game
//game = new Game();
// Redirect to /game/:id
});
router.get('/game/:id', function(req, res) {
// Get game from db.
//res.render('viewgame', { title: 'View Game' });
});
router.post('/game/:id/bet:123', function(req, res) {
// store the player's bet.
// error if already declared.
// store game in progrees=true
// Renders JSON of Game State Representation
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







Game.prototype.gameRepresentation = function(game) {
return {
userTotal : game.userTotal,
dealerTotal : game.dealerTotal,
userBust : game.userBust,
dealerBust : game.dealerBust,
currentPlayerHand : game.currentPlayerHand,
houseHand : game.houseHand,
status : 'in-progress'
}
}
*/
var GameModel = require('../models/Game.js');


// TODO this should be set when doing mongo and multiplayer instead of new here
var game ;
router.get('/newgame', function(req, res) {
  GameModel.newGame({}, function (err, game) {
    if (err) return next(err);
    console.log(game)
    res.json(game);
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
