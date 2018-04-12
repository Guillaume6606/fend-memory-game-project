# Memory Game Project

## Table of Contents

* Instructions
* Listing of the variables of the JS file
* Listing of the functions of the JS file and uses
* Remarks


## Instructions

To use the game, open the index.html file in the browser of your choice (developed especially for Firefox and Google Chrome, so if any stability issue was to happen, use these browsers.)

Then, click on a card to reveal it and then try to find its pair among the others. Your goal is to find all the pairs using as little moves as possible and as fast as possible!

If you want to reset the game, you can click on the reset button on the upper right hand corner.


## Listing of the variables of the JS file

  * deck: The deck element
  * cards: The group of all the elements with the card class
  * cardsArray: An array made of all the card elements
  * openCards: The array filled with the number of cards opened at the  moment, has a max of 2.
  * moveCounter: Counts the number of moves made by the player in a same game.
  * timeCounter: Counts the seconds passed from the first move.
  * timerFunction:
  * run: A flag used to disactivate the possibility to turn a card whenever the parsing of the turned cards is afoot.


## Listing of the functions and uses

* shuffle: Shuffles the array that is passed to it. Is used to shuffle the cards between each game.
* reveal: activates the open and show on the passed card, has the effect to "turn" the cards when clicked.
* compare: Whenever there is 2 cards open, compare their classes to determine whether they are the same.
* updateCounter: Increments the value of the counter and updates the displayed value.
* score: Removes stars whenever the player does too many moves to materialize his level.
* updateTimer: updates the timer display with the value of the timeCounter
* win: tests whether all the cards are matched, and if it is the case, opens the victory popup
