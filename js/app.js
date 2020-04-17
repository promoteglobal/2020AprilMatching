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

let matchCount = 0; 

function mix () {
  document.querySelector('.moves').innerHTML = 0;
  console.log('You clicked the reset button.');
  const listItems = cardBoard.getElementsByTagName('li');
  var arr = Array.prototype.slice.call(listItems)
  let shuffledArr = shuffle(arr);
  cardBoard.innerHTML = '';
    for(let i = 0; i < 16; i++){
      cardBoard.appendChild(shuffledArr[i]);
    }
   let clearmatch = document.querySelectorAll(".card.match");
   for (var i = 0; i < clearmatch.length; i++) {
    clearmatch[i].classList.toggle("match");
  }
    let clearNonMatch = document.querySelectorAll(".card.open.show");
    for (var i = 0; i < clearNonMatch.length; i++) {
      clearNonMatch[i].classList.toggle("open");
      clearNonMatch[i].classList.toggle("show");
  }
  document.querySelector(".timer").innerHTML = 0;
  let starsList = document.querySelector(".stars");
  starsList.innerHTML = '';
  for (let i = 0; i < 5; i++){
    const li = document.createElement('li');
    li.innerHTML = '<i class="fa fa-star"></i>';
    starsList.appendChild(li);
   }
   matchCount = 0;
}

reset.addEventListener('click', mix);
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
    matchCount += 1;
    if (matchCount === 8) {
      debugger;
      if (counter >= 55) {
        alert("Hmm, were you even trying?");
        document.querySelector(".timer").innerHTML = 0;
        matchCount = 0;
      }
      else if (counter >= 50) {
        alert("Oh no, you should concentrate better next time.");
        document.querySelector(".timer").innerHTML = 0;
        matchCount = 0;
      }
      else if (counter >= 45) {
        alert("Not bad, but actively try and remember what you saw.");
        document.querySelector(".timer").innerHTML = 0;
        matchCount = 0;
      }
      else if (counter >= 26) {
        alert("Almost Perfect Score. Concentrate better next time!");
        document.querySelector(".timer").innerHTML = 0;
        matchCount = 0;
      }
      else if (counter <= 25) {
        alert("Perfect Score!");
        document.querySelector(".timer").innerHTML = 0;
        matchCount = 0;
      }
    }
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
  const starGroup = document.querySelector('.stars');
  if (movesNum === 25) {
    starGroup.firstElementChild.remove();
  }
  if (movesNum === 35) {
    starGroup.firstElementChild.remove();
  }
  if (movesNum === 45) {
    starGroup.firstElementChild.remove();
  }
  if (movesNum === 50) {
    starGroup.firstElementChild.remove();
  }
  if (movesNum === 55) {
    starGroup.firstElementChild.remove();
  }
}});


setInterval(myTimer ,1000);
function myTimer() {
  let timer = Number(document.querySelector(".timer").innerHTML);
  timer += 1;
  document.querySelector(".timer").innerHTML = timer;
}

// const myName = 'Andrew';

// function introduceMyself() {
//   const you = 'student';

//   function introduce() {
//     console.log(`Hello, ${you}, I'm ${myName}!`);
//   }

//   return introduce();
// }

// introduceMyself();



//star function
//you win function
//timer function

//-------done---------
//flip function

//reset function
  //mix function
  //counting function
  //match function

  document.addEventListener("load", mix);
