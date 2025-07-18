//unordered list where the player's guessed letters will appear
const guessedLetters = document.querySelector("guessed-letters");
//button with Guess
const guessButton = document.querySelector(".guess");
//guessed letter box
const letterInput = document.querySelector("#letter");
const wordInProgress = document.querySelector(".word-in-progress");
//remaining number of guesses
const remainingGuesses = document.querySelector(".remaining");
//empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
//hidden button that will appear prompting hte player to play again
const playAgain = document.querySelector(".play-again");

const word = "magnolia";

const updateWordInProgress = function (word) {
    const placeholders = [];

    for (let character of word) {
        placeholders.push("●");
    }
    wordInProgress.innerText = placeholders.join("");
};

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const currentGuessedLetter = letterInput.value;
    console.log(currentGuessedLetter);
    letterInput.value = "";

});

updateWordInProgress(word);