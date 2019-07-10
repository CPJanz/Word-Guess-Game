const VALIDKEYS = /[a-z]/;
const WORDBANK = [
  "Bulbasaur",
  "Ivysaur",
  "Venusaur",
  "Charmander",
  "Charmeleon",
  "Charizard",
  "Squirtle",
  "Wartortle",
  "Blastoise",
  "Caterpie",
  "Metapod",
  "Butterfree",
  "Weedle",
  "Kakuna",
  "Beedrill",
  "Pidgey",
  "Pidgeotto",
  "Pidgeot",
  "Rattata",
  "Raticate",
  "Spearow",
  "Fearow",
  "Ekans",
  "Arbok",
  "Pikachu",
  "Raichu",
  "Sandshrew",
  "Sandslash",
  "Nidoran",
  "Nidorina",
  "Nidoqueen",
  "Nidorino",
  "Nidoking",
  "Clefairy",
  "Clefable",
  "Vulpix",
  "Ninetales",
  "Jigglypuff",
  "Wigglytuff",
  "Zubat",
  "Golbat",
  "Oddish",
  "Gloom",
  "Vileplume",
  "Paras",
  "Parasect",
  "Venonat",
  "Venomoth",
  "Diglett",
  "Dugtrio",
  "Meowth",
  "Persian",
  "Psyduck",
  "Golduck",
  "Mankey",
  "Primeape",
  "Growlithe",
  "Arcanine",
  "Poliwag",
  "Poliwhirl",
  "Poliwrath",
  "Abra",
  "Kadabra",
  "Alakazam",
  "Machop",
  "Machoke",
  "Machamp",
  "Bellsprout",
  "Weepinbell",
  "Victreebel",
  "Tentacool",
  "Tentacruel",
  "Geodude",
  "Graveler",
  "Golem",
  "Ponyta",
  "Rapidash",
  "Slowpoke",
  "Slowbro",
  "Magnemite",
  "Magneton",
  "Farfetchd",
  "Doduo",
  "Dodrio",
  "Seel",
  "Dewgong",
  "Grimer",
  "Muk",
  "Shellder",
  "Cloyster",
  "Gastly",
  "Haunter",
  "Gengar",
  "Onix",
  "Drowzee",
  "Hypno",
  "Krabby",
  "Kingler",
  "Voltorb",
  "Electrode",
  "Exeggcute",
  "Exeggutor",
  "Cubone",
  "Marowak",
  "Hitmonlee",
  "Hitmonchan",
  "Lickitung",
  "Koffing",
  "Weezing",
  "Rhyhorn",
  "Rhydon",
  "Chansey",
  "Tangela",
  "Kangaskhan",
  "Horsea",
  "Seadra",
  "Goldeen",
  "Seaking",
  "Staryu",
  "Starmie",
  "MrMime",
  "Scyther",
  "Jynx",
  "Electabuzz",
  "Magmar",
  "Pinsir",
  "Tauros",
  "Magikarp",
  "Gyarados",
  "Lapras",
  "Ditto",
  "Eevee",
  "Vaporeon",
  "Jolteon",
  "Flareon",
  "Porygon",
  "Omanyte",
  "Omastar",
  "Kabuto",
  "Kabutops",
  "Aerodactyl",
  "Snorlax",
  "Articuno",
  "Zapdos",
  "Moltres",
  "Dratini",
  "Dragonair",
  "Dragonite",
  "Mewtwo",
  "Mew"
];
const STARTINGLIVES = 15;

const game = {
  gameRunning: false,
  guessedLetters: [],
  incorrectGuesses: [],
  chosenWord: null,
  livesLeft: STARTINGLIVES,
  charactersRevealed: 0,
  gamesWon: 0,

  takeInput: function(input) {
    keyPressed = input.key.toLowerCase();
    //If the game is not currently running, this starts a new game and eats the keystroke.
    if (!this.gameRunning) {
      this.startGame();

      // If the game is already running this tests to ensure that the keystroke is valid (a-z). If so, pass it along to gameTurn.
      // !guessedLetters.Includes discards any keys that have already been guessed.
      // The keyPressed.length evaluation is to discard special key keystrokes (example: Tab or Enter).
    } else if (VALIDKEYS.test(keyPressed) && keyPressed.length === 1) {
      if (this.guessedLetters.includes(keyPressed)) {
        //TODO: Add wiggle animation
        const matchingLetters = document.getElementsByClassName(
          "char-" + keyPressed
        );
        for (let i = 0; i < matchingLetters.length; i++) {
          this.wiggleLetter(matchingLetters[i]);
        }
      } else {
        this.guessedLetters.push(keyPressed);
        this.takeTurn(keyPressed);
        this.checkEndGame();
      }
    }
  },

  // Resets the game state after a game is won or lost.
  reset: function() {
    this.guessedLetters = [];
    this.chosenWord = null;
    this.livesLeft = STARTINGLIVES;
    this.charactersRevealed = 0;
    document.getElementById("boardText").remove();
    let newBoard = document.createElement("h2");
    newBoard.setAttribute("id", "boardText");
    document.getElementById("boardContainer").appendChild(newBoard);
    document.getElementById("wrong-letters-text").innerText = "";
    document.getElementById("lives-text").innerText = this.livesLeft;
  },

  // Starts a new game
  startGame: function() {
    console.log("Game Starting");
    document.getElementById("subtitle-container").style.visibility = "hidden";
    document.getElementById("lives-and-letters-row").style.visibility =
      "visible";
    this.reset();
    this.gameRunning = true;
    this.chosenWord = WORDBANK[Math.floor(Math.random() * WORDBANK.length)];
    this.setupBoard();
  },

  // Processes a valid keystroke, each time the letter is found in the chosen word, it is revealed on the gameboard.
  // If there is no match, the letter is added to the list of incorrect characters and lives are decremented
  takeTurn: function(guessedLetter) {
    let letterMatched = false;
    for (let i = 0; i < this.chosenWord.length; i++) {
      if (this.chosenWord[i].toLowerCase() === guessedLetter) {
        let characterSpan = document.createElement("span");
        const boardText = document.getElementById("boardText");
        characterSpan.innerText = this.chosenWord[i];
        characterSpan.classList.add("char-" + guessedLetter);
        boardText.replaceChild(characterSpan, boardText.children[i]);
        this.charactersRevealed++;
        letterMatched = true;
      }
    }
    if (!letterMatched) {
      this.livesLeft--;
      document.getElementById("lives-text").innerText = this.livesLeft;
      //TODO: Refactor wrong letters text into spans of letters so that I can animate individual letters
      document.getElementById("wrong-letters-text").innerText +=
        "   " + guessedLetter;
    }
  },

  // Checks game state for win or loss situations. If either is found, moves the game to game over.
  checkEndGame: function() {
    // Loss state
    if (this.livesLeft <= 0) {
      // Display You lost message
      document.getElementById("subtitle-text").innerHTML = "You Lost!";
      document.getElementById("subtitle-text").style.color = "red";
      document.getElementById("subtitle-container").style.visibility =
        "visible";
      this.gameRunning = false;
    }
    // Win state
    if (this.charactersRevealed === this.chosenWord.length) {
      document.getElementById("subtitle-text").innerHTML = "You Won!";
      document.getElementById("subtitle-text").style.color = "green";
      document.getElementById("subtitle-container").style.visibility =
        "visible";
      this.gamesWon++;
      document.getElementById("wins-text").innerHTML = this.gamesWon;
      this.gameRunning = false;
    }
  },

  //Constructs the game board by placing a pokeball img for each to be revealed letter.
  setupBoard: function() {
    for (let i = 0; i < this.chosenWord.length; i++) {
      let pokeball = document.createElement("img");
      pokeball.setAttribute("src", "assets/images/pokeball.png");
      document.getElementById("boardText").appendChild(pokeball);
    }
  },

  wiggleLetter: function(element) {
    // element.style.animation = "";
    console.log("pressed", element);
  }
};

document.onkeyup = function(event) {
  game.takeInput(event);
};
