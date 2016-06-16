$(document).on("submit", "form", function(e){
  e.preventDefault();
  console.log( $(location).attr('href') );
  $.ajax({
    type: "POST",
    url: $(location).attr('href'),
    data: { bet: 234 },
    cache: false,
    success: function(data){
      alert("suc!");
      play();
      //$("#betForm").hide();
      //game starts
    }
  });


  return  false;
});

window.addEventListener("load", getData, false);

function getData(){
$.ajax({
  type: "GET",
  url: $(location).attr('href'),
 dataType: 'json',
  cache: false,
  success: function(data){
  play(data)
  }
});
}


function play(game){
  //this.deck on real life is game.deck

  document.getElementById("hit").addEventListener("click", function(){/*deck1.hit(); */},false);
  document.getElementById("stand").addEventListener("click", function(){/*deck1.stand();*/},false);
  document.getElementById("replay").addEventListener("click", function(){/*deck1.deal21();*/}, false);

  var userHand = document.getElementById("user-hand");
  var dealerHand = document.getElementById("dealer-hand");
  var userScore = document.getElementById("user-score");
  var dealerScore = document.getElementById("dealer-score");
  var status = document.getElementById("game-status");
  var moneyDiv = document.getElementById("money");

  status.innerHTML="";
  this.money--;

  //reset all the stuff that needs to be reset if the game is being replayed
  money.innerHTML= "Money: " + this.money;
  dealerHand.innerHTML="<h2>Dealer Hand</h2>";
  userHand.innerHTML="<h2>User Hand</h2>";

  hit.setAttribute("style", "");
  stand.setAttribute("style", "");
  dealerScore.setAttribute("style", "");

console.log(game)
  for(var i=0; i<game.currentPlayerHand.length; i++){
  			userHand.innerHTML+=showCard(game.currentPlayerHand[i]);
  		}
  //		this.userTotal = this.calcValue(this.curusrHand);
  //		userScore.innerHTML=this.userTotal;


    for(var i=0; i<game.houseHand.length; i++){
  			dealerHand.innerHTML+=showCard(game.houseHand[i]);
  		}


  //this.dealerTotal = this.calcValue(this.curdlrHand);
//  dealerScore.innerHTML=this.dealerTotal;
  //hide dealers first card
  var firstCard = dealerHand.getElementsByClassName("card")[0];
  firstCard.setAttribute("id", "hidden-card");
}

this.showCard =function showCard(card){
  var html="";
  switch(card.suit){
    case "hearts": suit_text = "&hearts;"; break;
    case "diamonds": suit_text = "&diams;"; break;
    case "spades": suit_text = "&spades;"; break;
    case "clubs": suit_text = "&clubs;"; break;
  }
  html="<div class='card " + card.suit + "'><div class='card-value'>" + card.symbol + "</div><div class='suit'>" + suit_text + "</div><div class='main-number'>"+card.symbol +"</div><div class='invert card-value'>"+card.symbol+"</div><div class='invert suit'>"+suit_text+"</div></div>";
  return html;
}
