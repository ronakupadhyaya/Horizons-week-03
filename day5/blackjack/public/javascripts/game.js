var globalGame;
window.addEventListener("load", getData, false);
var status = document.getElementById("game-status");

function getData(){
  $.ajax({
    type: "GET",
    url: $(location).attr('href'),
    dataType: 'json',
    cache: false,
    success: function(game){
      status.innerHTML=game.status
      //TODO check if playerAlreadyInGame
      if (game.players.length<game.numberOfPlayers){ // And plate
        //alert("please set bet");
        $("#betForm").show();
        $(".dealer-area").hide();
        $(".user-area").hide();
      }else{
        play(game);
      }
    }
  });
}

// Setting a new bet
$(document).on("submit", "form", function(e){
  e.preventDefault();
  $.ajax({
    type: "POST",
    dataType: 'json',
    url: $(location).attr('href'),
    data: { bet: $("#bet-amount").val() || 10 },
    cache: false,
    success: function(game){
      console.log(game)
      if (game.players.length<game.numberOfPlayers){
        play(game);
      }else{
        status.innerHTML="Waiting for more players"
      }
    }
  });
  return  false;
});


function play(game){
  globalGame=game;
  var userHand = document.getElementById("user-hand");
  var dealerHand = document.getElementById("dealer-hand");
  var userScore = document.getElementById("user-score");
  var dealerScore = document.getElementById("dealer-score");
  var hitButton = document.getElementById("hit")
  var standButton = document.getElementById("stand");
  $("#betForm").hide();
  $(".dealer-area").show();
  $(".user-area").show();
  hitButton.addEventListener("click", function(){ hit() },false);
  standButton.addEventListener("click", function(){ stand() },false);


  status.innerHTML="";

  if (game.status === 'over' ){
    status.innerHTML='You '+game.userStatus;
    if (game.userStatus === "won"){
      status.innerHTML+= " "+ parseInt(game.player1bet)*2;
    } else if (game.userStatus === "won"){
      status.innerHTML+= " "+ parseInt(game.player1bet);
    }
    hitButton.style.visibility = "hidden";
    standButton.style.visibility = "hidden";

  }


  dealerHand.innerHTML="<h2>Dealer Hand</h2>";
  userHand.innerHTML="<h2>User Hand</h2>";
  //hit.setAttribute("style", "");
  //stand.setAttribute("style", "");

  for(var i=0; i<game.currentPlayerHand.length; i++){
    userHand.innerHTML+=showCard(game.currentPlayerHand[i]);
  }

  for(var i=0; i<game.houseHand.length; i++){
    dealerHand.innerHTML+=showCard(game.houseHand[i]);
  }
  userScore.innerHTML=game.userTotal;
  dealerScore.innerHTML=game.dealerTotal;
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

function hit(){
  $.ajax({
    type: "POST",
    url: '/game/'+globalGame.id+'/hit',
    dataType: 'json',
    cache: false,
    success: function(data){
      play(data)
    }
  });
}

function stand(){
  $.ajax({
    type: "POST",
    url: '/game/'+globalGame.id+'/stand',
    dataType: 'json',
    cache: false,
    success: function(data){
      play(data)
    }
  });
}
