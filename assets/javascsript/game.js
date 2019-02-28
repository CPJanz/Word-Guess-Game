const validKeys = /[a-z]/;
const wordBank = ["baby", "rope"];
let gameRunning = false;
let guessedLetters;
let chosenWord;


function startGame() {
    guessedLetters = [];
    gameRunning = true;
    chosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    console.log(chosenWord);
}

function endGame(result) {
    switch (result) {
        case "win":
            console.log("You Won!");
            gameRunning = false;
            break;
        case "loss":
            console.log("You Lost!");
            gameRunning = false;
            break;
        default:
            console.log("somthing went wrong");
    }
}

function gameTurn(guessedLetter) {

}

document.onkeyup = function(event) {
    const keyPressed = event.key.toLowerCase();
    if (!gameRunning) {
        startGame();
    } else if (validKeys.test(keyPressed) && keyPressed.length === 1) {
        console.log("key", keyPressed);
    }
}