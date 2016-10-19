// The business logic of the hangman game.

// define hangman object
var hangman = {
  // Define dictionary
  dictionary: [
    'acres', 'adult', 'advice', 'arrangement', 'attempt', 'border',
    'breeze', 'brick', 'calm', 'canal', 'cast', 'chose', 'claws', 'coach',
    'constantly', 'contrast', 'cookies', 'customs', 'damage', 'deeply',
    'depth', 'discussion', 'doll', 'donkey', 'essential', 'exchange',
    'exist', 'explanation', 'facing', 'film', 'finest', 'fireplace',
    'floating', 'folks', 'fort', 'garage', 'grabbed', 'grandmother',
    'habit', 'happily', 'heading', 'hunter', 'image', 'independent',
    'instant', 'kids', 'label', 'lungs', 'manufacturing', 'mathematics',
    'melted', 'memory', 'mill', 'mission', 'monkey', 'mount', 'mysterious',
    'neighborhood', 'nuts', 'occasionally', 'official', 'ourselves',
    'palace', 'plates', 'poetry', 'policeman', 'positive', 'possibly',
    'practical', 'pride', 'promised', 'recall', 'relationship',
    'remarkable', 'require', 'rhyme', 'rocky', 'rubbed', 'rush', 'sale',
    'satellites', 'satisfied', 'scared', 'selection', 'shake', 'shaking',
    'shallow', 'shout', 'silly', 'simplest', 'slight', 'slip', 'slope',
    'soap', 'solar', 'species', 'spin', 'stiff', 'swung', 'tales', 'thumb',
    'tobacco', 'toy', 'trap', 'treated', 'tune', 'university', 'vapor',
    'vessels', 'wealth', 'wolf', 'zoo'
  ],

  // define "constant" of total number of guesses
  TOTAL_NUMBER_OF_GUESSES: 6,

  // define wins and losses
  wins: 0,
  losses: 0,

  // set currentWord property - this will be populated later
  currentWord: '',

  // set gamePlayArray property - this will be populated later
  gamePlayArray: [],

  // keep track of guesses
  guesses: [],

  // set userInput property
  userInput: '',

  // keep track of correct guesses
  numberOfCorrectGuesses: 0,

  initializeGamePlayArray: function() {
    for (var i = 0; i < this.currentWord.length; i++) {
      this.gamePlayArray.push('__');
    }
    return this.gamePlayArray;
  },

  // function for checking that key input is alphabetic
  isAlpha: function(input) {
    var keyA = 65;
    var keyZ = 90;
    if (input >= keyA && input <= keyZ) {
      return true;
    }
  },

  validateInput: function(input) {
    if (!this.isAlpha(input.keyCode)) {
      return;
    }

    userInput = String.fromCharCode(input.keyCode).toLowerCase();

    if (this.guesses.indexOf(userInput) != -1) {
      alert('You have already chosen that letter. Please choose another!');
      return;
    }
    return userInput;
  },

  updateGameWithGuess: function() {
    // if guess is in the word update the game board
    if (this.currentWord.indexOf(this.userInput) != -1) {
      for (var i = 0; i < this.currentWord.length; i++) {
        if (this.currentWord[i] === this.userInput) {
          this.gamePlayArray[i] = this.userInput;
        }
      }
        this.numberOfCorrectGuesses += 1;
        this.printGamePlay();
    } else {
        this.printHangman();
    }
  },

  // functions for printing to the DOM
  printTo: function(element, message) {
      document.getElementById(element).innerHTML = message;
  },

  printHangman: function() {
    this.printTo('hangman',
      '<img class="col-xs-12" src="assets/images/Hangman-' +
      (this.guesses.length - this.numberOfCorrectGuesses) + '.png">');
  },

  printDirections: function(directions) {
    this.printTo('directions',
      '<h2 class="hidden-xs visible-sm-* visible-md-* visible-lg-*">' +
      directions + '</h2><h4 class="visible-xs-* hidden-sm hidden-md ' +
      'hidden-lg"><strong>' + directions + '</strong></h4>');
  },

  printWins: function() {
    this.printTo('wins', '<p><strong>Wins:</strong> ' + this.wins + '</p>');
  },

  printLosses: function() {
    this.printTo('losses', '<p><strong>Losses:</strong> ' + this.losses +
                 '</p>');
  },

  printGamePlay: function() {
    this.printTo('game-play', this.gamePlayArray.join(' '));
  },

  printGuesses: function() {
    var guessesRemaining =
      (this.TOTAL_NUMBER_OF_GUESSES -
        (this.guesses.length - this.numberOfCorrectGuesses));
    this.printTo('guesses', '<p><strong># of guesses remaining:</strong> ' +
      guessesRemaining + '</p><p><strong>Letters already guessed:</strong></p>' +
      this.guesses.join(' '));
  },

  printBlankBoard: function() {
    this.printTo('hangman',
      '<img class="col-xs-12" src="assets/images/Hangman-0.png">');
    this.printTo('game-board', '<div class="lead text-success" id="wins">' +
      '</div><div class="lead text-danger" id="losses">' +
      '</div><div id="game-play"></div><div style="height: 20px;">' +
      '</div><div class="lead text-warning" id="guesses"></div>');
  },

  printStats: function() {
      this.printWins();
      this.printLosses();
      this.printGuesses();
  },

  userHasGuessedWord: function() {
    if (this.gamePlayArray.join('') === this.currentWord) {
      return true;
    }
  },

  gameOver: function() {
    if ((this.guesses.length - this.numberOfCorrectGuesses) >=
        this.TOTAL_NUMBER_OF_GUESSES) {
      return true;
    }
  },

  // deal with results of game
  checkResult: function() {
    // check for win and handle
    if (this.userHasGuessedWord()) {
      this.wins += 1;
      this.showResult('wins', 'text-success', 'You win!');
    }

    // check for loss and handle
    if (this.gameOver()) {
      this.losses += 1;
      this.printTo('game-play', 'the word was: ' + this.currentWord);
      this.showResult('losses', 'text-danger', 'You lose!');
    }
  },

  showResult: function(divId, bootstrapClass, message) {
    this.printDirections('Press any key to play again!');
    this.printTo(divId,
                 '<h1 class=' + bootstrapClass + '>' + message + '</h1>');
  },

  resetGame: function() {
    this.numberOfCorrectGuesses = 0;
    this.guesses = [];
    this.gamePlayArray = [];
    this.startGame();
  },

  // Get user input
  getUserInput: function(event) {
    this.userInput = this.validateInput(event);
    if (this.userInput === undefined) {
      return;
    }

    this.guesses.push(this.userInput);
    this.updateGameWithGuess();
    this.printStats();
    this.checkResult();
  },

  // start game
  startGame: function() {
    this.printBlankBoard();
    this.printDirections('Choose a letter to make a guess');

    // Get word
    this.currentWord = this.dictionary[
      Math.floor(Math.random() * this.dictionary.length)
    ];

    this.gamePlayArray = this.initializeGamePlayArray();
    this.printGamePlay();
    this.printStats();
  }
};

document.onkeyup = function(event) {
  if (hangman.currentWord === '') {
    hangman.startGame();
  } else if (hangman.userHasGuessedWord() || hangman.gameOver()) {
    return hangman.resetGame();
  } else {
    return hangman.getUserInput(event);
  }
};
