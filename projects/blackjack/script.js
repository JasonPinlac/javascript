// DOM Variables
let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');

// Game Variables
let gameStarted,
    gameOver,
    playerWon,
    dealerScore,
    playerScore,
    dealerCards,
    playerCards,
    deckOfCards;

// Initial Setup
hitButton.style.display = 'none';
stayButton.style.display = 'none';

newGameButton.addEventListener('click', function(){
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  dealerScore = 0;
  playerScore = 0;
  
  deckOfCards = createDeck();
  shuffleDeck(deckOfCards);
  playerCards = [getNextCard(deckOfCards), getNextCard(deckOfCards)];
  dealerCards = [getNextCard(deckOfCards), getNextCard(deckOfCards)];
  
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  updateGameStatus();
  checkForEndOfGame();
});
hitButton.addEventListener('click', function(){
  playerCards.push(getNextCard(deckOfCards));
  updateGameStatus();
  checkForEndOfGame();
});
stayButton.addEventListener('click', function(){
  gameOver = true;
  checkForEndOfGame();
});

function createDeck(){
  let suits = [ 'Hearts', 'Diamonds', 'Spades', 'Clubs' ];
  let values = [ 'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King' ]; 
  let deck = [];
  for (let i = 0; i < values.length; i++)
  {
      for (let j = 0; j < suits.length; j++)
      {
        let cardObject = {
          value: values[i],
          suit: suits[j]
        };
        deck.push(cardObject)
      } 
  }
  return deck;
}
function getNextCard(deck){
    return deck.shift();
  }
function shuffleDeck(deck){
  for(let currentIndex = 0; currentIndex < deck.length; currentIndex++)
  {
    let swapIndex = Math.trunc(Math.random() * deck.length);
    let tempCardHolder = deck[swapIndex];
    deck[swapIndex] = deck[currentIndex];
    deck[currentIndex] = tempCardHolder;
  }
}
function getCardString(cardObject){
    return cardObject.value + " of " + cardObject.suit;
}
function getCardValue(cardObject){
  let value = 0;
  switch(cardObject.value){
    case "Ace":
      value = 1;
      break;
    case "Two":
      value = 2;
      break;
    case "Three":
      value = 3;
      break;
    case "Four":
      value = 4;
      break;
    case "Five":
      value = 5;
      break;
    case "Six":
      value = 6;
      break;
    case "Seven":
      value = 7;
      break;
    case "Eight":
      value = 8;
      break;
    case "Nine":
      value = 9;
      break;
    default:
      value = 10;
      break;
  }
  return value;
}
function getScore(cardObjectArray){
  let score = 0;
  for(let i = 0; i < cardObjectArray.length; i++){
    if(cardObjectArray[i].value === "Ace" && score <= 10)
    {
      score += 11;
    }
    else
    {
      score += getCardValue(cardObjectArray[i]);
    }
  }
  return score;
}
function updateScores(){
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}
function updateGameStatus(){
  let dealerCardString = "";
  let playerCardString = "";
  for(let i = 0; i < dealerCards.length; i++){
    dealerCardString += getCardString(dealerCards[i]) + "\n";
  }
  for(let i = 0; i < playerCards.length; i++){
    playerCardString += getCardString(playerCards[i]) + "\n";
  }
  updateScores();
  textArea.innerText = "Dealer has:" + "\n";
  textArea.innerText += dealerCardString;
  textArea.innerText += "(Score: " + dealerScore + ")\n\n"
  textArea.innerText += "Player has:" + "\n";
  textArea.innerText += playerCardString;
  textArea.innerText += "(Score: " + playerScore + ")\n\n"
}
function checkForEndOfGame(){
  if(playerScore == 21){
    gameOver = true;
  }
  
  if(gameOver) // player clicked stay or has 21
  {
    while(dealerScore < playerScore && dealerScore < 21 && playerScore <= 21)
    {
      dealerCards.push(getNextCard(deckOfCards));
      updateGameStatus();
    }
  }

  if(playerScore > 21) 
  {
    playerWon = false;
    gameOver = true;
    textArea.innerText += "BUST! YOU LOSE!"
    resetButtons();
  }
  else if (dealerScore > 21)
  {
    playerWon = true;
    gameover = true;
    textArea.innerText += "DEALER BUSTS! YOU WIN!"
    resetButtons();
  }
  else if (gameOver)
  {
    if(playerScore == dealerScore)
    {
    playerWon = false;
    gameOver = true;
    textArea.innerText += "TIE!"
    resetButtons();
    }
    else if(playerScore > dealerScore)
    {
      playerWon = true;
      textArea.innerText += "YOU WIN!"
    }
    else
    {
      playerWon = false;
      textArea.innerText += "YOU LOSE!"
    }
    resetButtons();
  }
}
function resetButtons(){
  hitButton.style.display = 'none';
  stayButton.style.display = 'none';
  newGameButton.style.display = 'inline';
}







