// The business logic of the hangman game.

// Define dictionary
var dictionary = [
    'acres', 'adult', 'advice', 'arrangement', 'attempt', 'border', 'breeze',
    'brick', 'calm', 'canal', 'cast', 'chose', 'claws', 'coach', 'constantly',
    'contrast', 'cookies', 'customs', 'damage', 'Danny', 'deeply', 'depth',
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

// function for calculating number of remaining guesses
function guessesRemaining(numberOfGuesses, numberOfCorrectGuesses) {
    return (5 - (numberOfGuesses - numberOfCorrectGuesses));
}

// Press any key to start
document.onkeyup = function () {
    // Get word from dictionary at random.
    var currentWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    // define variables for later use
    var gamePlayArray = [];
    var guesses = [];
    var numberOfCorrectGuesses = 0;
    var wins = 0;

    // write blank word
    for (var i = 0; i < currentWord.length; i++) {
        gamePlayArray.push('__');
    }
    document.getElementById('game-play').innerHTML = gamePlayArray.join(' ');

    // write starting stats
    document.getElementById('wins').innerHTML =
        '<p><strong>Wins:</strong> 0</p>';
    document.getElementById('guesses').innerHTML =
        '<p><strong># of guesses remaining:</strong> 5</p>' +
        '<p><strong>Letters already guessed:</strong></p>';

    // Get user input
    document.onkeyup = function (event) {
        var userInput = String.fromCharCode(event.keyCode).toLowerCase();
        // add to guesses array
        guesses.push(userInput);
        // if guess is in the word update the game board
        if (currentWord.indexOf(userInput) != -1) {
            gamePlayArray[currentWord.indexOf(userInput)] = userInput;
            numberOfCorrectGuesses += 1;
            document.getElementById('game-play').innerHTML = gamePlayArray.join(' ');
        }

        // write new stats
        document.getElementById('guesses').innerHTML =
            '<p><strong># of guesses remaining:</strong> ' +
            guessesRemaining(guesses.length, numberOfCorrectGuesses) +
            '</p><p><strong>Letters already guessed:</strong></p>' +
            guesses.join(' ');
    };
};
