
const guessedLettersDisplay = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector("#letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesDisplay = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span")
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
const wordInProgressArray = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
    const data = await res.text();
    const wordArray = data.split("\n");
    word = selectRandomWord(wordArray).trim();
    createWordPlaceholders(word);
};
getWord();

const selectRandomWord = function (wordArray) {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    const randomWord = wordArray[randomIndex];
    return randomWord;
};

const createWordPlaceholders = function (word) {
    for (let character of word) {
        wordInProgressArray.push("●");
    }
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
        checkGuesses(currentGuess);
        updateWordInProgress(currentGuess);
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
    checkWin(wordArray);

};
const checkGuesses = function (guess) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    if (!wordArray.includes(guess)) {
        message.innerText = `The word does not contain "${guess}"`;
        remainingGuesses -= 1;
    }
    if (remainingGuesses === 0) {
        remainingGuessesDisplay.innerText = `You have no more guesses.  The game is over.  The word is ${wordUpper}`;
    }
    else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = "1 guess";
    }
    else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkWin = function (wordArray) {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    };

}

