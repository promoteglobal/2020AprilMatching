
//------------------------------------global variables for event listeners-------------------------------

const cardBoard = document.querySelector('.deck'); 

const reset = document.querySelector('.restart');

//-----------------independent timer---------------------------
//makes timer continuously go

let constTimer = setInterval(myTimer ,1000);

function myTimer() {
  let timer = Number(document.querySelector(".timer").innerHTML);
  timer += 1;
  document.querySelector(".timer").innerHTML = timer;
}


//-------------------------------------reset board by clicking the reset button---------------------------------

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
  const listItems = cardBoard.getElementsByTagName('li');
  var arr = Array.prototype.slice.call(listItems);
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
  if (constTimer === false) {
    constTimer = setInterval(myTimer ,1000);
  }
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

//---------------------------------variables for gathing data of what cards were clicked-------------------------

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

//---------------Functions for all board clicks-------------------------

function matched (event) {
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
      let time = document.querySelector(".timer").innerHTML;
      if (counter >= 57) {
        alert("Hmm, were you even trying? You only kept 1 star and your time was " + time + " seconds!");
        document.querySelector(".timer").innerHTML = 0;
        matchCount = 0;
        clearInterval(constTimer);
        constTimer = false;
      }
      else if (counter >= 47) {
        alert("Oh no, you should concentrate better next time. You only kept 2 stars and your time was " + time + " seconds!");
        document.querySelector(".timer").innerHTML = 0;
        matchCount = 0;
        clearInterval(constTimer);
        constTimer = false;
      }
      else if (counter >= 37) {
        alert("Not bad, for keeping 3 stars but actively try and remember what you saw. Your time was " + time + " seconds!");
        document.querySelector(".timer").innerHTML = 0;
        matchCount = 0;
        clearInterval(constTimer);
        constTimer = false;
      }
      else if (counter >= 27) {
        alert("Almost Perfect Score while keeping 4 stars. Concentrate better next time! Your time was " + time + " seconds!");
        document.querySelector(".timer").innerHTML = 0;
        matchCount = 0;
        clearInterval(constTimer);
        constTimer = false;
      }
      else if (counter <= 26) {
        alert("Perfect Score! You kept all 5 stars and your time was " + time + " seconds!");
        document.querySelector(".timer").innerHTML = 0;
        matchCount = 0;
        clearInterval(constTimer);
        constTimer = false;
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
}

function counter (event) {
  if (event.target.classList.contains("fa") || event.target.classList.contains("card")){
  // console.log('The icon or card was clicked!');
  let movesEl = document.querySelector('.moves').innerHTML;
  let movesNum = parseInt(movesEl,10) +1;
  document.querySelector('.moves').innerHTML = movesNum;
  const starGroup = document.querySelector('.stars');
  if (movesNum === 27) {
    starGroup.firstElementChild.remove();
  }
  if (movesNum === 37) {
    starGroup.firstElementChild.remove();
  }
  if (movesNum === 47) {
    starGroup.firstElementChild.remove();
  }
  if (movesNum === 57) {
    starGroup.firstElementChild.remove();
  }
}}


function flip (event) {
  if (event.target.classList.contains("fa")){
  // console.log('The icon was clicked!');
  event.target.parentElement.classList.toggle("open");
  event.target.parentElement.classList.toggle("show");
} else if (event.target.classList.contains("card")){
  // console.log('The card was clicked!');
  event.target.classList.toggle("open");
  event.target.classList.toggle("show");
}
}


function masterFunction (evt) {
  matched(evt);
  counter(evt);
  flip(evt);
}

cardBoard.addEventListener('click', masterFunction);


//------Preconfig board upon loading-----------------------------
//mixes board upon starting
window.addEventListener("load", mix);







// const myName = 'Andrew';

// function introduceMyself() {
//   const you = 'student';

//   function introduce() {
//     console.log(`Hello, ${you}, I'm ${myName}!`);
//   }

//   return introduce();
// }

// introduceMyself();

// cardBoard.addEventListener('click', flip);
// cardBoard.addEventListener('click', counter);
// cardBoard.addEventListener('click', matched);



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