var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  deck: [],
  userTotal: {type: Number, default: 0},
  dealerTotal: {type: Number, default: 0},
  userBust: {type: Boolean, default: false},
  dealerBust: {type: Boolean, default: false},
  currentPlayerHand: [],
  houseHand: [],
});

//statics are the methods defined on the Model.
//methods are defined on the document (instance).


/*
someSchema.statics.addItem = function addItem(item, callback){
//Do stuff (parse item)
 (new this(parsedItem)).save(callback);
}*/


GameSchema.statics.newGame = function (item, callback){
var game = new this(item)
game.deck = new Deck();
game.save(callback);
}

GameSchema.statics.deal21 = function () {
  for(var i=0; i<2; i++){
    // if(this.emptyDeck())this.newDeck();
    game.currentPlayerHand.push(game.deck.pop());
    game.houseHand.push(game.deck.pop());
  }
  game.userTotal = this.calcValue(game.currentPlayerHand);
  game.dealerTotal = this.calcValue(game.houseHand);
  // TODO: hide dealers first card!!
  //  var blackjack =true; ???
  //  if(this.userTotal === 21 && this.dealerTotal < 21) this.gameOver(blackjack); //userWins
  //  else if(this.dealerTotal === 21) this.gameOver(); //dealer Wiinssss.
};


GameSchema.statics.calcValue = function (hand){
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

/*




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
*/
function Card(suit, val, symbol) {
  this.suit = suit;
  this.val = val;
  this.symbol = symbol;
}



function Deck(){
  this.deck = [];
  this.createDeck()
  this.shuffleDeck()
  return this.deck;
}

Deck.prototype.createDeck = function (){
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

Deck.prototype.shuffleDeck = function () {
  var currentIndex = this.deck.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = this.deck[currentIndex];
    this.deck[currentIndex] = this.deck[randomIndex];
    this.deck[randomIndex] = temporaryValue;
  }
}

module.exports  =  mongoose.model('Game', GameSchema);
