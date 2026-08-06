const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "brown"
];

let cards = [...colors, ...colors];

cards.sort(() => Math.random() - 0.5);

const board = document.getElementById("game-board");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0;

let moves = 0;
const moveCounter = document.getElementById("move-counter");

const winOverlay = document.getElementById("win-overlay");
const finalMoves = document.getElementById("final-moves");
const restartButton = document.getElementById("restart-button");


cards.forEach(color => {

    const card = document.createElement("div");
    card.classList.add("card");

    card.dataset.color = color;

    card.innerHTML = `
    <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back"></div>
    </div>
    `;

    card.querySelector(".card-front").style.backgroundColor = color;

    card.addEventListener("click", flipCard);

    board.appendChild(card);

});

function flipCard(){

    if(lockBoard) return;
    if(this === firstCard) return;
    if(this.classList.contains("matched")) return;

    this.classList.add("flipped");

    if(firstCard === null){
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    moves++;
    moveCounter.textContent = moves;

    checkMatch();
}

function checkMatch(){

    if(firstCard.dataset.color === secondCard.dataset.color){

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedCards += 2;

        checkWin();

        resetTurn();

    }else{

        setTimeout(() => {

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetTurn();

        },1000);

    }

}

function checkWin(){

    if(matchedCards === cards.length){

        finalMoves.textContent = moves;

        winOverlay.style.display = "flex";

    }

}

function resetTurn(){

    firstCard = null;
    secondCard = null;
    lockBoard = false;

}

restartButton.addEventListener("click", () => {

    location.reload();

});