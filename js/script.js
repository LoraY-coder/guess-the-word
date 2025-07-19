
const guessedLettersDisplay = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector("#letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remaingGuessesSpan = document.querySelector(".remaining span")
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "cat"; //"magnolia";
const guessedLetters = [];
const wordInProgressArray = [];

const createWordPlaceholders = function (word) {
    //    const placeholders = [];

    for (let character of word) {
        wordInProgressArray.push("●");
    }
    //  wordInProgress.innerText = placeholders.join(""); 
    wordInProgress.innerText = wordInProgressArray.join("");
};

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const currentGuess = letterInput.value;
    const validGuess = inputValidation(currentGuess);
    if (validGuess) {
        makeGuess(currentGuess)
    };
    letterInput.value = "";
});

const inputValidation = function (currentGuess) {
    const acceptedLetter = /[a-zA-Z]/;
    //message.innerText = "";
    if (currentGuess === "") {
        message.innerText = "Type AT LEAST ONE letter.";
    } else if (currentGuess.length > 1) {
        message.innerText = "Type ONLY ONE letter.";
    } else if (!(currentGuess.match(acceptedLetter))) {
        message.innerText = "Type one LETTER.";
    } else {
        return currentGuess;
    }
};

const makeGuess = function (currentGuess) {
    currentGuess = currentGuess.toUpperCase();
    if (guessedLetters.includes(currentGuess)) {
        message.innerText = `You already guessed ${currentGuess}`;
    } else {
        //guess is valid so update the screen
        guessedLetters.push(currentGuess);
        let listItem = document.createElement("li");
        listItem.innerText = currentGuess;
        guessedLettersDisplay.append(listItem);
        updateWordInProgress(currentGuess);
        console.log(`guessed letters ${guessedLetters}`);
        console.log(`wordInProgressArray ${wordInProgressArray}`);

    }
};

const updateWordInProgress = function (currentGuess) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    if (wordArray.includes(currentGuess)) {//update wordInProgressArray
        for (let letter in wordArray) {
            if (wordArray[letter] === currentGuess) {
                wordInProgressArray[letter] = currentGuess;
            }
        }
        wordInProgress.innerText = wordInProgressArray.join("");

    }
    if (wordInProgressArray.join("") === wordArray.join("")) {
        console.log("you win")
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    };
    console.log(`wordArray ${wordArray}`);
};


createWordPlaceholders(word);