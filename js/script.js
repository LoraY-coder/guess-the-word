
const guessedLettersDisplay = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector("#letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remaingGuessesSpan = document.querySelector(".remaining span")
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const updateWordInProgress = function (word) {
    const placeholders = [];

    for (let character of word) {
        placeholders.push("●");
    }
    wordInProgress.innerText = placeholders.join("");
};

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const currentGuess = letterInput.value;
    const validGuess = inputValidation(currentGuess);
    if (validGuess) {
        makeGuess(currentGuess)
    };
    letterInput.value = "";
});

const inputValidation = function (currentGuess) {
    const acceptedLetter = /[a-zA-Z]/;
    message.innerHTML = "";
    if (currentGuess === "") {
        message.innerHTML = "Type AT LEAST ONE letter.";
    } else if (currentGuess.length >= 2) {
        message.innerHTML = "Type ONLY ONE letter.";
    } else if (!(currentGuess.match(acceptedLetter))) {
        message.innerHTML = "Type one LETTER.";
    } else {
        return currentGuess;
    }
};

const makeGuess = function (currentGuess) {
    currentGuess = currentGuess.toUpperCase();
    if (guessedLetters.includes(currentGuess)) {
        message.innerHTML = `You already guessed ${currentGuess}`;
    } else {
        guessedLetters.push(currentGuess);
        let listItem = document.createElement("li");
        listItem.innerText = currentGuess;
        guessedLettersDisplay.append(listItem);
    }
};


updateWordInProgress(word);