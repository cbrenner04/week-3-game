# week-3-game

NU Coding BootCamp Homework 3

You will only need to load the `index.html` in the browser to run this game.

## Game play

Any key will start the game. Once the game is started you can hit any key,
however, only alphabetic keys will be registered. Additionally, you will be
alerted every time you select a duplicate key. When you select the wrong
letter the number of guesses left should decrement and the hangman image
should update with a new body part. You only can only guess 6 wrong letters
before the game is over. This is because there are only 6 body parts (head,
torso, arm, arm, leg, and leg). When you lose you will be shown the correct
word. Wins and losses will be kept track of until the page is reloaded.

## Programming notes

The dictionary is defined in the object. The words in the dictionary are all
lowercase. Therefore I do not handle case in the current word and I make all
user input lowercase. If the dictionary is updated to include words with
capital letters, handling case in the current word will also need to be updated.
All of the logic of the game is in one object. I am not too keen on this but
since isn't very large this will suffice for now. This will need to be reworked
if logic is added to the game.
