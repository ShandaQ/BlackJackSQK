/*Pre defined deck of cards */
var deck = newDeck();

/* array to keep track of the cards that the player and dealer has in their hand*/
var dealerHand = [];
var playerHand = [];


/*deal 2 cards to player and 2 cards to the deal hand*/
/*$("#dealer-hand")
  .append('<div class="card">5 of Spades</div>')
  .append('<div class="card">7 of Spades</div>');

$("#player-hand")
  .append('<div class="card">5 of Spades</div>')
  .append('<div class="card">7 of Spades</div>'); */
function dealCard(hand, elementID) {
  var card =  deck.pop();
  hand.push(card);
  var imageUrl = getCardImageUrl(card);
  //var cardHtml = '<div class="card">' + card.point + " of " + card.suit + '</div>';
  // images/' +card.point + '_of_' + card.suit+ '.png
  var cardHtml = '<img class="card" src="' + imageUrl + '"/>';
  $(elementID).append(cardHtml);
}

function getCardImageUrl(card){
  var cardImage;
  switch (card.point) {
    case 1:
        cardImage =  ('Images/ace_of_' + card.suit+ '.png');
        break;
    case 11:
        cardImage =  ('Images/jack_of_' + card.suit+ '2.png');
        break;
    case 12:
        cardImage =  ('Images/queen_of_' + card.suit+ '2.png');
        break;
    case 13:
        cardImage =  ('Images/king_of_' + card.suit+ '2.png');
        break;
    default:
        cardImage = ('Images/' + card.point + '_of_' + card.suit+ '.png');
      }

    return cardImage;
}

/*calculates the current points that the dealer or player has*/
function calculatesPoints(hand){
  var sum = 0;

  //makes a copy of the hand array
  hand = hand.slice(0);

  //sort the array in decendeing order
  function compare(card1, card2){
    return card2.point - card1.point;
  }

  hand.sort(compare);

  for(var i =0; i < hand.length; i++){
    var card = hand[i];

    if(card.point > 10){
      sum += 10;
    }else if(card.point === 1){
      if(sum + 11 <= 21){
        sum+= 11;
      }else {
          sum +=1;
        }
    }else {
      sum += card.point;
    }
  }
  return sum;

}


/* calculate the points using the calculatesPoints function for both the dealer and the player. Update the display with the those points #dealer-points and #player-points*/
function displayPoints() {
  var dealerPoints = calculatesPoints(dealerHand);
  var playerPoints = calculatesPoints(playerHand);

  $('#dealer-points').text(dealerPoints);
  $('#player-points').text(playerPoints);
}

/* using the calculatesPoints methods checks both the dealer and player to see if their cards total more than 21
Returns true if there was a bust else false*/
function checkForBust() {
  var playerPoints = calculatesPoints(playerHand);
  var dealerPoints = calculatesPoints(dealerHand);

  if(playerPoints > 21){
    $("#messages").text('Player busted. Dealer Wins');
    return true;
  }

  if(dealerPoints > 21){
    $("#messages").text('Dealer busted. Player Wins');
    return true;
  }

  //when neither the player or dealer has total is > 21
  return false;
}

//Function to reset the var and board
function resetGame() {
  //reset the deck
  deck = newDeck();
  //reset the player and dealer hand(array) to empty
  playerHand = [];
  dealerHand = [];

  //reset player and dealer points 0
  $("#player-points").text("");
  $("#dealer-points").text("");

  //reset the player and dealer display of cards
  $("#player-hand").html("");
  $("#dealer-hand").html("");

  //reset the message display
  $("#messages").text("");
}

/* creates a deck of 52 cards */
function newDeck(){
  var deck = [];
  for(var i = 1; i <= 13; i++){
    deck.push({point: i, suit: 'spades'});
    deck.push({point: i, suit: 'hearts'});
    deck.push({point: i, suit: 'clubs'});
    deck.push({point: i, suit: 'diamonds'});
  }
  return deck;
}



/******** Document ready ******************************************************/
$(function () {
  $("#deal-button").click(function() {

    //function call to create a new deck of cards
    //newDeck();

    //fucntion call to deal the player and dealer 2 cards to start the game
    dealCard(playerHand, '#player-hand');
    dealCard(dealerHand, '#dealer-hand');
    dealCard(playerHand, '#player-hand');
    dealCard(dealerHand, '#dealer-hand');

    //function call to display the current points for the dealer and player
    displayPoints();

    //checks to see if the dealer or player total is > 21
    checkForBust();
  })

  /*when you click the hit button, add a card to the player hand */
  $("#hit-button").click(function () {
    //function call to deal a card to the player
    dealCard(playerHand, '#player-hand');

    //function call to display the current points for the dealer and player
    displayPoints();

    //checks to see if the dealer or player total is > 21
    checkForBust();
  })

//If the player clicks the stand btn, deal the dealer cards while his/her total is less tham 17
  $('#stand-button').click(function() {
    var dealerPoints = calculatesPoints(dealerHand);
    var playerPoints = calculatesPoints(playerHand);
    while(dealerPoints < 17){
      dealCard(dealerHand, '#dealer-hand');
      dealerPoints = calculatesPoints(dealerHand);
    }
    displayPoints();
    checkForBust();

    if(!checkForBust()){
      if(playerPoints > dealerPoints){
        $("#messages").text("Player Wins the game");
      }else if (playerPoints === dealerPoints){
        $("#messages").text("Tie game, click Deal to play again");
      }else {
        $("#messages").text("Dealer Wins the game");
      }
    }
  })

  $("#newGame-button").click(function(){
    //function call to reset the game, all var goes back to 0 and ""
    resetGame();
  })

});
