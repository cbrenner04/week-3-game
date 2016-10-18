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

    // globally define wins so it keeps track of wins without reseting
    wins: 0,

    // functions for printing to the DOM
    printHangman: function(numberOfIncorrectGuesses) {
        document.getElementById('hangman').innerHTML =
            '<img class="col-xs-12" src="assets/images/Hangman-' +
            numberOfIncorrectGuesses + '.png">';
    },
    printDirections: function(directions) {
        document.getElementById('directions').innerHTML =
            '<h2 class="hidden-xs visible-sm-* visible-md-* visible-lg-*">' +
            directions + '</h2><h4 class="visible-xs-* hidden-sm hidden-md ' +
            'hidden-lg"><strong>' + directions + '</strong></h4>';
    },
    printWins: function(wins) {
        document.getElementById('wins').innerHTML =
            '<p><strong>Wins:</strong> ' + wins + '</p>';
    },
    printGamePlay: function(gamePlayPiece) {
        document.getElementById('game-play').innerHTML = gamePlayPiece;
    },
    printGuesses: function(numberOfCorrectGuesses, guessesArray) {
        var guessesRemaining =
            (this.TOTAL_NUMBER_OF_GUESSES -
                (guessesArray.length - numberOfCorrectGuesses));
        document.getElementById('guesses').innerHTML =
            '<p><strong># of guesses remaining:</strong> ' + guessesRemaining +
            '</p><p><strong>Letters already guessed:</strong></p>' +
            guessesArray.join(' ');
    },
    printBlankBoard: function() {
        document.getElementById('hangman').innerHTML =
            '<img class="col-xs-12" src="assets/images/Hangman-0.png">';
        document.getElementById('game-board').innerHTML =
            '<div class="lead text-success" id="wins">' +
            '</div><div id="game-play"></div><div style="height: 20px;">' +
            '</div><div class="lead text-warning" id="guesses"></div>';
    },
    showResult: function(divId, bootstrapClass, message) {
        hangman.printDirections('Press any key to play again!');
        document.getElementById(divId).innerHTML =
            '<h1 class=' + bootstrapClass + '>' + message + '</h1>';
        document.onkeyup = function() {
            hangman.printBlankBoard();
            playGame();
        };
    }
};

// Press any key to start
function playGame() {
    hangman.printBlankBoard();
    hangman.printDirections('Choose a letter to make a guess');

    // Get word from dictionary at random.
    var currentWord = hangman.dictionary[
        Math.floor(Math.random() * hangman.dictionary.length)
    ];

    // define variables for later use
    var gamePlayArray = [];
    var guesses = [];
    var numberOfCorrectGuesses = 0;

    // write blank word
    for (var i = 0; i < currentWord.length; i++) {
        gamePlayArray.push('__');
    }
    hangman.printGamePlay(gamePlayArray.join(' '));

    // write starting stats
    hangman.printWins(hangman.wins);
    hangman.printGuesses(numberOfCorrectGuesses, guesses);

    // function for checking that key input is alphabetic
    function isAlpha(input) {
        var keyA = 65;
        var keyZ = 90;
        if (input >= keyA && input <= keyZ) {
            return true;
        }
    }

    // Get user input
    document.onkeyup = function(event) {
        if (!isAlpha(event.keyCode)) {
            return;
        }

        var userInput = String.fromCharCode(event.keyCode).toLowerCase();
        if (guesses.indexOf(userInput) != -1) {
            alert('You have already chosen that letter. Please choose another!');
            return;
        }

        // add to guesses array
        guesses.push(userInput);
        // if guess is in the word update the game board
        if (currentWord.indexOf(userInput) != -1) {
            for (var i = 0; i < currentWord.length; i++) {
                if (currentWord[i] === userInput) {
                    gamePlayArray[i] = userInput;
                }
            }
            numberOfCorrectGuesses += 1;
            hangman.printGamePlay(gamePlayArray.join(' '));
        } else {
            hangman.printHangman(guesses.length - numberOfCorrectGuesses);
        }

        // write new stats
        hangman.printWins(hangman.wins);
        hangman.printGuesses(numberOfCorrectGuesses, guesses);

        // check for win and handle
        if (gamePlayArray.join('') === currentWord) {
            hangman.wins += 1;
            hangman.showResult('wins', 'text-success', 'You win!');
        }

        // check for loss and handle
        if ((guesses.length - numberOfCorrectGuesses) >= hangman.TOTAL_NUMBER_OF_GUESSES) {
            hangman.showResult('game-board', 'text-danger', 'You lose!');
        }
    };
}

document.onkeyup = function() {
    playGame();
};
