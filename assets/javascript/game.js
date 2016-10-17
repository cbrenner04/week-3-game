// The business logic of the hangman game.

// Define dictionary
var dictionary = [
    'acres', 'adult', 'advice', 'arrangement', 'attempt', 'border', 'breeze',
    'brick', 'calm', 'canal', 'cast', 'chose', 'claws', 'coach', 'constantly',
    'contrast', 'cookies', 'customs', 'damage', 'deeply', 'depth',
    'discussion', 'doll', 'donkey', 'essential', 'exchange', 'exist',
    'explanation', 'facing', 'film', 'finest', 'fireplace', 'floating', 'folks',
    'fort', 'garage', 'grabbed', 'grandmother', 'habit', 'happily', 'heading',
    'hunter', 'image', 'independent', 'instant', 'kids', 'label', 'lungs',
    'manufacturing', 'mathematics', 'melted', 'memory', 'mill', 'mission',
    'monkey', 'mount', 'mysterious', 'neighborhood', 'nuts', 'occasionally',
    'official', 'ourselves', 'palace', 'plates', 'poetry', 'policeman',
    'positive', 'possibly', 'practical', 'pride', 'promised', 'recall',
    'relationship', 'remarkable', 'require', 'rhyme', 'rocky', 'rubbed', 'rush',
    'sale', 'satellites', 'satisfied', 'scared', 'selection', 'shake',
    'shaking', 'shallow', 'shout', 'silly', 'simplest', 'slight', 'slip',
    'slope', 'soap', 'solar', 'species', 'spin', 'stiff', 'swung', 'tales',
    'thumb', 'tobacco', 'toy', 'trap', 'treated', 'tune', 'university', 'vapor',
    'vessels', 'wealth', 'wolf', 'zoo'
];

// define "constant" of total number of guesses
var TOTAL_NUMBER_OF_GUESSES = 6;

// globally define wins so it keeps track of wins without reseting
var wins = 0;

// functions for printing to the DOM
function printGamePlay(gamePlayPiece) {
    document.getElementById('game-play').innerHTML = gamePlayPiece;
}

function printWins(wins) {
    document.getElementById('wins').innerHTML = '<p><strong>Wins:</strong> ' +
                                                wins +'</p>';
}

function printGuesses(numberOfCorrectGuesses, guessesArray) {
    var guessesRemaining =
        (TOTAL_NUMBER_OF_GUESSES - (guessesArray.length - numberOfCorrectGuesses));
    document.getElementById('guesses').innerHTML =
        '<p><strong># of guesses remaining:</strong> ' + guessesRemaining +
        '</p><p><strong>Letters already guessed:</strong></p>' +
        guessesArray.join(' ');
}

function printHangman(numberOfIncorrectGuesses) {
    document.getElementById('hangman').innerHTML =
        '<img class="col-xs-12" src="assets/images/Hangman-' +
        numberOfIncorrectGuesses + '.png">';
}

function printBlankBoard () {
    document.getElementById('hangman').innerHTML =
        '<img class="col-xs-12" src="assets/images/Hangman-0.png">';
    document.getElementById('whateverTheFuck').innerHTML =
        '<div class="lead text-success" id="wins">' +
        '</div><div id="game-play"></div><div style="height: 20px;">' +
        '</div><div class="lead text-warning" id="guesses"></div>';
}

// function for checking that key input is alphabetic
function isAlpha(input) {
    var keyA = 65;
    var keyZ = 90;
    if (input >= keyA && input <= keyZ) {
        return true;
    }
}

// Press any key to start
function playGame() {
    printBlankBoard();
    // Get word from dictionary at random.
    var currentWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    console.log('CURRENT WORD: ' + currentWord);
    // define variables for later use
    var gamePlayArray = [];
    var guesses = [];
    var numberOfCorrectGuesses = 0;

    // write blank word
    for (var i = 0; i < currentWord.length; i++) {
        gamePlayArray.push('__');
    }
    printGamePlay(gamePlayArray.join(' '));

    // write starting stats
    printWins(wins);
    printGuesses(numberOfCorrectGuesses, guesses);

    // Get user input
    document.onkeyup = function (event) {
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
            printGamePlay(gamePlayArray.join(' '));
        } else {
            printHangman(guesses.length - numberOfCorrectGuesses);
        }

        // check for win and handle
        if (gamePlayArray.join('') === currentWord) {
            wins += 1;
            alert('You win!');
            return playGame();
        }

        // check for loss and handle
        if ((guesses.length - numberOfCorrectGuesses) >= TOTAL_NUMBER_OF_GUESSES) {
            alert('You lose!');
            return playGame();
        }

        // write new stats
        printWins(wins);
        printGuesses(numberOfCorrectGuesses, guesses);
    };
}

document.onkeyup = function () {
    playGame();
};
