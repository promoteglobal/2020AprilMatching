/*
 * Create a list that holds all of your cards
 */
const cardBoard = document.querySelector('.deck'); 

const reset = document.querySelector('.restart');
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

reset.addEventListener('click', function mix (event) {
  document.querySelector('.moves').innerHTML = 0;
  console.log('You clicked the reset button.');
  const listItems = cardBoard.getElementsByTagName('li');
  var arr = Array.prototype.slice.call(listItems)
  let shuffledArr = shuffle(arr);
  cardBoard.innerHTML = '';
    for(let i = 0; i < 16; i++){
      cardBoard.appendChild(shuffledArr[i]);
    }
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



// cardBoard.addEventListener('click', function (event) {
//   if (event.target.classList.contains("card")){
//   console.log('The card was clicked!');
//   event.target.classList.toggle("open");
//   event.target.classList.toggle("show");
// }else if(event.target.classList.contains("fa")){
//   event.preventDefault();
//   console.log('The icon was clicked');
// }
// });

cardBoard.addEventListener('click', function flip (event) {
  if (event.target.classList.contains("fa")){
  // console.log('The icon was clicked!');
  event.target.parentElement.classList.toggle("open");
  event.target.parentElement.classList.toggle("show");
} else if (event.target.classList.contains("card")){
  // console.log('The card was clicked!');
  event.target.classList.toggle("open");
  event.target.classList.toggle("show");
}
});

let card1 = cardBoard.addEventListener('click', function frstCrd (event) {
  if (event.target.classList.contains("card")){
  let counter = document.querySelector('.moves').innerHTML;
    if(counter % 2 === 0){
      card1 = event.target.firstElementChild.classList[1];
      console.log("card 1 was clicked");
    }
  }
});

let card2 = cardBoard.addEventListener('click', function scndCrd (event) {
  if (event.target.classList.contains("card")){
  let counter = document.querySelector('.moves').innerHTML;
    if (counter % 2 !== 0){
      card2 = event.target.firstElementChild.classList[1];
      console.log("card 2 was clicked");
    }
  }
});

let card1El = cardBoard.addEventListener('click', function frstCrdEl (event) {
  if (event.target.classList.contains("card")){
  let counter = document.querySelector('.moves').innerHTML;
    if(counter % 2 === 0){
      card1El = event.target;
      console.log("cardEl 1 was clicked");
    }
  }
});


cardBoard.addEventListener('click', function matched (event) {
  if (event.target.classList.contains("card")){
  let counter = document.querySelector('.moves').innerHTML;
  if (counter % 2 !== 0){
    // console.log("card 2 was clicked..get ready for matching");
    if(card1 == card2){
    console.log("Cards Match!");
    event.target.classList.toggle("open");
    event.target.classList.toggle("show");
    event.target.classList.toggle("match");
    card1El.classList.toggle("open");
    card1El.classList.toggle("show");
    card1El.classList.toggle("match");
    } else { //need a time function
      setTimeout(function delayWrongAnswer() {
        console.log("Cards don't Match!");
        event.target.classList.toggle("open");
        event.target.classList.toggle("show");
        card1El.classList.toggle("open");
        card1El.classList.toggle("show");
    }, 1000);
    }
  }
 
  }
});
//try to work in closure to keep the cards value in tact.
//maybe break up catching this info into 2 functions with closure?
// cardBoard.addEventListener('click', function matched (event) {
//   debugger;
//   let card1;
//   let card2;
//   if (event.target.classList.contains("card")){
//   let counter = document.querySelector('.moves').innerHTML;
//   if(counter % 2 === 0) {
//     card2 = event.target;
//     console.log("card 2 was clicked");
//   }
//  else if (!counter % 2 === 0){
//   card1 = event.target;
//   console.log("card 1 was clicked");
//  }
// }});

cardBoard.addEventListener('click', function counter (event) {
  if (event.target.classList.contains("fa") || event.target.classList.contains("card")){
  // console.log('The icon or card was clicked!');
  let movesEl = document.querySelector('.moves').innerHTML;
  let movesNum = parseInt(movesEl,10) +1;
  document.querySelector('.moves').innerHTML = movesNum;
}});


// const myName = 'Andrew';

// function introduceMyself() {
//   const you = 'student';

//   function introduce() {
//     console.log(`Hello, ${you}, I'm ${myName}!`);
//   }

//   return introduce();
// }

// introduceMyself();


//match function
//star function
//you win function
//timer function

//-------done---------
//flip function

//reset function
  //mix function
  //counting function