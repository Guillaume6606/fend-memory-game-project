// VARIABLES DEFINITION
/*
 * Create a reference variable for the deck
 */

const deck = $('.deck');

/*
 * Create a list that holds all of your cards
 */

 const cards = $('.card');
 const cardsArray = cards.toArray();

/*
 * Create an array for the cards face up
 */

 let openCards = [];

/*
 * Create a move counter and initialize it
 */

let moveCounter = 0;

/*
 * Create a time variable and the variable of the timer
 */

let timeCounter = 0;
let timerFunction;

/*
 * Create a boolean flag to manage card timing
 */

let run = true;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

$('.restart').click(function(){

/*
 * Reset the timer and move counter
 */

  clearInterval(timerFunction);
  timeCounter=0;
  updateTimer();
  moveCounter=-1;
  updateCounter();
  openCards.length=0;

/*
 * Reset the number of stars
 */

  $('.stars').html('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>')

/*
 * Hiding the cards and reshuffling them
 */
  $('.card').removeClass('match show open');
  const shuffledCardsArray = shuffle(cardsArray);
  for (const card of shuffledCardsArray) {
    deck.append(card);
  };
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function reveal(card){
   card.toggleClass('open');
   card.toggleClass('show');
 };

/*
 * Function comparing the classes of the cards in the array that is passed to it.
 * Passed a "run" flag to it so that the user is unable to click when execting.
 * It prevents the user from putting more than 3 cards in the Array before the
 * end of the execution, which caused issues
 */

 function compare(array){
   if(array.length==2){
     run=false;
     setTimeout(function(){
       if(array[0].children().first().attr('class')==array[1].children().first().attr('class')) {
         array[0].toggleClass('match');
         array[1].toggleClass('match');
         array.length = 0;
       } else {
         array[0].toggleClass('open');
         array[0].toggleClass('show');
         array[1].toggleClass('open');
         array[1].toggleClass('show');
         array.length = 0;
       };
       run=true;
     }, 500);
   };
 };

/*
 * Simply adds one to the move counter and updates the display
 */

 function updateCounter() {
   moveCounter+=1;
   $('.moves').text(moveCounter);
 };

 function score() {
   if (moveCounter==17) {
     $('.stars li:first-child').remove();
   };
   if (moveCounter==25) {
     $('.stars li:first-child').remove();
   };
   if (moveCounter==35) {
     $('.stars li:first-child').remove();
   };
 };

/*
 * Updates the time display
 */

 function updateTimer() {
   $('.timer').text(timeCounter);
 };

/*
 * Controls whether the player has finished the game by testing for the "match"
 * class of all the cards
 * In case of victory, shows the popup message
 */

 function win(){
  let victory=true;
  cards.each(function(){
    victory=(victory) && ($(this).hasClass('match'));
  });
  if(victory){
    clearInterval(timerFunction);
    $('#popup').removeClass('hidden');
    $('#victoryMessage').text(`You managed to beat the game in ${moveCounter} moves! You scored ${$('.stars li').length} stars and did it in ${timeCounter} seconds!`);
  };
};

$('.popup-close').click(function(){
  $('#popup').addClass('hidden');
});

/*
 * Event listener that triggers all the precedently defined functions when
 * clicking on a cards
 * Also launches the timer on the first move
 */

 cards.click(function(){
  if(run==true){
    reveal($(this));
    updateCounter();
    if(moveCounter==1){
         timerFunction = setInterval(function(){
         timeCounter+=1;
         updateTimer();
       },1000);
     };
     openCards.push($(this));
     compare(openCards);
     score();
     setTimeout(function(){
     win();
   }, 600);
   };
 });
