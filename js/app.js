
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
  //------------------------------------------------------reset moves to 0-----------------------------------
  document.querySelector('.moves').innerHTML = 0;
  //------------------------------------------------------get a list of cards and mix them up------------------------
  const listItems = cardBoard.getElementsByTagName('li');
  var arr = Array.prototype.slice.call(listItems);
  let shuffledArr = shuffle(arr);
  cardBoard.innerHTML = '';
  
  for(let i = 0; i < 16; i++){
      cardBoard.appendChild(shuffledArr[i]);
  }
   
  //--------------------------------------------------------if starting over in middle of game, erase cards---------------------
  let clearmatch = document.querySelectorAll(".card.match");
   
  for (var i = 0; i < clearmatch.length; i++) {
    //----------------------------------------------------erase matched cards-------------------------------
    clearmatch[i].classList.toggle("match");
  }
    
  let clearNonMatch = document.querySelectorAll(".card.open.show");
    
  for (var i = 0; i < clearNonMatch.length; i++) {
    //----------------------------------------------------------erase unmatched cards-------------------------------------
      clearNonMatch[i].classList.toggle("open");
      clearNonMatch[i].classList.toggle("show");
  }
  
  //------------------------------------------------------------reset timer to 0-------------------------------------
  document.querySelector(".timer").innerHTML = 0;
  
  if (constTimer === false) {
    //-----------------------------------------------------start timer again if stoped by winning the game-------------------
    constTimer = setInterval(myTimer ,1000);
  }
  
  //.............................................................reset number of stars----------------------------------
  let starsList = document.querySelector(".stars");
  starsList.innerHTML = '';
  
  for (let i = 0; i < 5; i++){
    const li = document.createElement('li');
    li.innerHTML = '<i class="fa fa-star"></i>';
    starsList.appendChild(li);
  }
  //-----------------------------------------------------------reset matched count----------------------------------------
  matchCount = 0; 
}

//-----------------------------------------------------------add event listener to reset button-----------------------------------
reset.addEventListener('click', mix);

//---------------------------------variables for gathing data of what cards were clicked-------------------------

let card1 = cardBoard.addEventListener('click', function frstCrd (event) {
  if (event.target.classList.contains("card")){
    let counter = document.querySelector('.moves').innerHTML;
    
    if(counter % 2 === 0){
      card1 = event.target.firstElementChild.classList[1];
    }
  }
});

let card2 = cardBoard.addEventListener('click', function scndCrd (event) {
  if (event.target.classList.contains("card")){
    let counter = document.querySelector('.moves').innerHTML;
    
    if (counter % 2 !== 0){
      card2 = event.target.firstElementChild.classList[1];
    }
  }
});

let card1El = cardBoard.addEventListener('click', function frstCrdEl (event) {
  if (event.target.classList.contains("card")){
    let counter = document.querySelector('.moves').innerHTML;
    
    if(counter % 2 === 0){
      card1El = event.target;
    }
  }
});

//---------------Functions for all board clicks-------------------------

function matched (event) {
  if (event.target.classList.contains("card")){
    let counter = document.querySelector('.moves').innerHTML;
    
    if (counter % 2 !== 0){
      //---------------------------------------what to do on every click that is even----------------
      if(card1 == card2){
        //-------------------------------------------if they match then stay open-----------------
        event.target.classList.toggle("open");
        event.target.classList.toggle("show");
        event.target.classList.toggle("match");
        card1El.classList.toggle("open");
        card1El.classList.toggle("show");
        card1El.classList.toggle("match");
        matchCount += 1;
        
        if (matchCount === 8) {
          //------------------------------------------what to do when all cards are matched-----------------------
          let time = document.querySelector(".timer").innerHTML;
          
          //-------------------when "you win" pops up, Display the time, and number of stars,-------------------------
          if (counter >= 57) {
              alert("Hmm, were you even trying? You only kept 1 star and your time was " + time + " seconds!");
          } else if (counter >= 47) {
              alert("Oh no, you should concentrate better next time. You only kept 2 stars and your time was " + time + " seconds!");
          } else if (counter >= 37) {
              alert("Not bad, for keeping 3 stars but actively try and remember what you saw. Your time was " + time + " seconds!");
          } else if (counter >= 27) {
              alert("Almost Perfect Score while keeping 4 stars. Concentrate better next time! Your time was " + time + " seconds!");
          } else if (counter <= 26) {
              alert("Perfect Score! You kept all 5 stars and your time was " + time + " seconds!");
          }
          //-------------------------------------stop the timer, reset matchCount to 0---------------------------------------
          matchCount = 0;
          clearInterval(constTimer);
          constTimer = false;
        }
      } else { 
        //-------------------------------------------------if they don't match, then close------------------------------------
        setTimeout(function delayWrongAnswer() {
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
  //------------------count number of moves-----------------------
  if (event.target.classList.contains("fa") || event.target.classList.contains("card")){
    let movesEl = document.querySelector('.moves').innerHTML;
    let movesNum = parseInt(movesEl,10) +1;
    document.querySelector('.moves').innerHTML = movesNum;

    //------------------------decrease stars------------------------
    const starGroup = document.querySelector('.stars');
    
    if (movesNum === 27) {
        starGroup.firstElementChild.remove();
    } else if (movesNum === 37) {
       starGroup.firstElementChild.remove();
    } else if (movesNum === 47) {
       starGroup.firstElementChild.remove();
    } else if (movesNum === 57) {
        starGroup.firstElementChild.remove();
    }
  }
}


function flip (event) {
  //-----------------------------------flip cars open----------------------
  if (event.target.classList.contains("fa")){
      event.target.parentElement.classList.toggle("open");
      event.target.parentElement.classList.toggle("show");
  } else if (event.target.classList.contains("card")){
      event.target.classList.toggle("open");
      event.target.classList.toggle("show");
  }
}


function masterFunction (evt) {
  matched(evt);
  counter(evt);
  flip(evt);
}
//-------------------------------------------------------add event listener to the board--------------------------------------
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