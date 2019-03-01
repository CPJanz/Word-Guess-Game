const VALIDKEYS = /[a-z]/;
const WORDBANK = ["baby", "rope"];
const STARTINGLIVES = 10

let game = {

    gameRunning: false,
    guessedLetters: [],
    incorrectGuesses: [],
    chosenWord: null,
    livesLeft: STARTINGLIVES,
    charactersRevealed: 0,

    takeInput: function(input) {
        keyPressed = input.key.toLowerCase();

        //If the game is not currently running, this starts a new game and eats the keystroke.
        if (!this.gameRunning) {
            this.startGame();

            // If the game is already running this tests to ensure that the keystroke is valid (a-z). If so, pass it along to gameTurn.
            // !guessedLetters.Includes discards any keys that have already been guessed.
            // The keyPressed.length evaluation is to discard special key keystrokes (example: Tab or Enter).
        } else if (VALIDKEYS.test(keyPressed) && !this.guessedLetters.includes(keyPressed) && keyPressed.length === 1) {
            this.guessedLetters.push(keyPressed);
            this.takeTurn(keyPressed);
            this.checkEndGame();
        }
    },

    reset: function() {
        this.guessedLetters = [];
        this.chosenWord = null;
        this.livesLeft = STARTINGLIVES;
        this.charactersRevealed = 0;
    },

    startGame: function() {
        console.log("Game Starting");

        this.reset();
        this.gameRunning = true;
        this.chosenWord = WORDBANK[Math.floor(Math.random() * WORDBANK.length)];
    },

    takeTurn: function(guessedLetter) {
        for (let i = 0; i < this.chosenWord.length; i++) {
            if (this.chosenWord[i] === guessedLetter) {
                this.charactersRevealed++;
            }
        }
        this.livesLeft--;
        this.printInfo();
    },

    checkEndGame: function() {
        if (this.livesLeft <= 0) {
            console.log("You Lost!");
            this.gameRunning = false;
        }

        if (this.charactersRevealed === this.chosenWord.length) {
            console.log("You Won!");
            this.gameRunning = false;
        }
    },

    //TEMPORARY DEBUG METHOD!!!! DELETE BEFORE SUBMITTING
    printInfo: function() {
        console.log("----------------");
        console.log("lives left:", this.livesLeft);
        console.log("Chosen Word:", this.chosenWord);
        console.log("Guessed Letters:", this.guessedLetters);
        console.log("Letters Revealed:", this.charactersRevealed);
        console.log("Game Running:", this.gameRunning);
        console.log("+++++++++++++++++");
    }
}

document.onkeyup = function(event) { game.takeInput(event) };