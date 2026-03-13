/**
  Wordle Clone by Peter Butcher

  Based on Wordle, the popular 5 letter word guessing game:
  https://www.powerlanguage.co.uk/wordle

  Uses Donald Knuth's GraphBase list of five-letter words:
  https://www-cs-faculty.stanford.edu/~knuth/sgb-words.txt
**/

(function () {
    let targetWord;
    let targetWordList;
    let gameOver = false;

    const wordListSource = "https://assets.codepen.io/471256/sgb-words.txt";
    const currentGuess = [];
    const guesses = [];
    const mode = document.getElementById("mode");
    const board = document.getElementById("board");
    const keyboard = document.getElementById("keyboard");
    const modal = document.getElementById("modal");
    const close = document.getElementById("close");
    const replayHeader = document.getElementById("replay-header");
    const replayModal = document.getElementById("replay-modal");
    const maxWordLength = 5;
    const maxGuesses = 6;
    const rowCount = maxGuesses;
    const colCount = maxWordLength;

    const letterStates = {
        INITIAL: "initial", // Starting state
        ENTER: "enter", // A letter has been entered into a tile
        ABSENT: "absent", // Letter is not in the word
        PRESENT: "present", // Letter is present but in the wrong place
        CORRECT: "correct", // Letter is correct
    };

    const specialKeys = {
        BACKSPACE: "Backspace",
        ENTER: "Enter",
    };

    const gameStates = {
        WIN: "win",
        LOSE: "lose",
    };

    const layout = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        [
            specialKeys.ENTER,
            "z",
            "x",
            "c",
            "v",
            "b",
            "n",
            "m",
            specialKeys.BACKSPACE,
        ],
    ];

    // A flattened array of keyboard keys (letter lookup)
    const allKeys = layout.reduce((a, b) => a.concat(b), []);

    // Generates a 5 x 6 board
    function generateBoard() {
        for (let row = 0; row < rowCount; row++) {
            let rowEl = document.createElement("div");
            rowEl.classList.add("row");

            for (let col = 0; col < colCount; col++) {
                let tile = document.createElement("div");
                tile.classList.add("tile");
                tile.dataset.state = letterStates.INITIAL;
                rowEl.appendChild(tile);
            }

            board.appendChild(rowEl);
        }
    }

    // Generates a qwerty keyboard
    function generateKeyboard() {
        for (let row in layout) {
            let rowEl = document.createElement("div");
            rowEl.classList.add("row");

            for (let key = 0; key < layout[row].length; key++) {
                let keyEl = document.createElement("button");
                let currentKey = layout[row][key];

                keyEl.innerText = currentKey;
                keyEl.classList.add("key");
                keyEl.dataset.letter = currentKey;
                keyEl.dataset.state = letterStates.INITIAL;

                let isEnter = currentKey === specialKeys.ENTER;
                let isBackspace = currentKey === specialKeys.BACKSPACE;

                if (isEnter) keyEl.classList.add("key-wide");

                if (isBackspace) {
                    keyEl.classList.add("key-wide");
                    keyEl.classList.add("material-icons-outlined");
                }

                keyEl.addEventListener("click", function (event) {
                    event.preventDefault();
                    handleKeyPress(currentKey);
                });

                rowEl.appendChild(keyEl);
            }

            keyboard.appendChild(rowEl);
        }
    }

    // Get a row of the board
    function getRow(row) {
        let rowSelector = `#board .row:nth-child(${row})`;
        return document.querySelector(rowSelector);
    }

    // Get a tile from a row
    function getTile(row, tile) {
        let tileSelector = `.tile:nth-child(${tile})`;
        return getRow(row).querySelector(tileSelector);
    }

    // Get keyboard key
    function getKey(key) {
        let keySelector = `#keyboard .key[data-letter=${key}]`;
        return document.querySelector(keySelector);
    }

    // Set up physical keyboard listeners
    function keyboardListeners() {
        window.addEventListener("keydown", function (event) {
            event.preventDefault();
            if (allKeys.includes(event.key)) handleKeyPress(event.key);
        });
    }

    // Game over modal listeners
    function modalListeners() {
        close.addEventListener("click", function () {
            modal.classList.remove("open");
        });
        replayModal.addEventListener("click", function () {
            if (won) {
                let name = prompt("You may receive another slice of pie if you were among the top scorers. Enter your name (first and last) so we can tell you if you won.");
                if (name) {
                    fetch("https://script.google.com/macros/s/AKfycbxZIOYu8njfgOE1TGweuqewogiugkspegSiYiZaBgGrvEsgmJ0-mO5AOnDvcUSaYr8oFg/exec", {
                        method: "POST",
                        mode: "no-cors",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            word: targetWord,
                            guesses: guesses.map(g => g.join("")),
                            numGuesses: guesses.length,
                            name: name
                        })
                    });
                }
                reset();
                modal.classList.remove("open");
                replayModal.innerHTML = `<span>Play again</span><span class="material-icons-outlined">replay</span>`;
                won = false;
            } else {
                reset();
                modal.classList.remove("open");
            }
        });
    }

    // Header button listeners
    function headerListeners() {
        mode.addEventListener("click", function () {
            document.body.classList.toggle("light");
        });
        replayHeader.addEventListener("click", reset);
    }

    // Handle on screen keyboard and physical key presses
    function handleKeyPress(key) {
        if (!gameOver) {
            if (key === specialKeys.BACKSPACE) {
                removeLetter();
            } else if (
                currentGuess.length !== maxWordLength &&
                key !== specialKeys.ENTER
            ) {
                addLetter(key);
            } else if (
                currentGuess.length === maxWordLength &&
                key === specialKeys.ENTER
            ) {
                submitGuess();
            } else {
                let rowEl = getRow(guesses.length + 1);
                rowEl.dataset.state = "invalid";
                setTimeout(function () {
                    delete rowEl.dataset.state;
                }, 600);
            }
        }
    }

    // Add letter to row
    function addLetter(key) {
        let tile = getTile(guesses.length + 1, currentGuess.length + 1);
        tile.innerText = key;
        tile.dataset.state = letterStates.ENTER;
        tile.dataset.letter = key;
        currentGuess.push(key);
    }

    // Remove letter from row
    function removeLetter() {
        if (currentGuess.length > 0) {
            let tile = getTile(guesses.length + 1, currentGuess.length);
            tile.innerText = "";
            tile.dataset.state = letterStates.INITIAL;
            delete tile.dataset.letter;
            currentGuess.pop();
        }
    }

    // Submit a guess
    function submitGuess() {
        let row = guesses.length + 1;
        let rowEl = getRow(row);
        let has = [];

        if (
            targetWord === currentGuess.join("") ||
            targetWordList.includes(currentGuess.join(""))
        ) {
            rowEl.dataset.state = "valid";
            guesses.push([...currentGuess]);
            let correct = 0;

            for (let i = 0; i < maxWordLength; i++) {
                let tile = getTile(row, i + 1);
                let letter = tile.dataset.letter;
                let key = getKey(letter);

                has.push(letter);

                if (targetWord.includes(letter)) {
                    if (indiciesOf(letter, targetWord).includes(i)) {
                        key.dataset.state = letterStates.CORRECT;
                        tile.dataset.state = letterStates.CORRECT;
                        correct++;
                    } else {
                        if (key.dataset.state !== letterStates.CORRECT) {
                            key.dataset.state = letterStates.PRESENT;
                        }
                        tile.dataset.state = letterStates.PRESENT;
                    }
                } else {
                    if (key.dataset.state !== letterStates.CORRECT) {
                        key.dataset.state = letterStates.ABSENT;
                    }
                    tile.dataset.state = letterStates.ABSENT;
                }
            }

            const scanned = [];

            for (let i = 0; i < maxWordLength; i++) {
                let tile = getTile(row, i + 1);
                let letter = tile.dataset.letter;
                let correctOfType = 0;

                scanned.push(letter);

                for (let j = 0; j < maxWordLength; j++) {
                    if (currentGuess[j] === letter && currentGuess[j] === targetWord[j])
                        correctOfType++;
                }

                if (
                    targetWord.includes(letter) &&
                    !indiciesOf(letter, targetWord).includes(i)
                ) {
                    if (
                        indiciesOf(letter, scanned).length + correctOfType >
                        indiciesOf(letter, targetWord).length
                    ) {
                        tile.dataset.state = letterStates.ABSENT;
                    }
                }
            }

            clearCurrentGuess();

            if (correct === maxWordLength) {
                win(rowEl);
            } else if (guesses.length === maxGuesses) {
                lose();
            }
        } else {
            rowEl.dataset.state = "invalid";
            setTimeout(function () {
                delete rowEl.dataset.state;
            }, 600);
        }
    }

    // Helper function to find multiple indicies
    function indiciesOf(letter, word) {
        let indicies = [];
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) indicies.push(i);
        }
        return indicies;
    }

    // Clear the current guess array
    function clearCurrentGuess() {
        currentGuess.splice(0, 5);
    }

    let won = false;

    // In case of a win
    function win(rowEl) {
        gameOver = true;
        document.getElementById("win-desc").innerHTML = `Would you like an extra slice of pie?`;
        setTimeout(function () {
            rowEl.dataset.state = "correct";
        }, 1000);
        setTimeout(function () {
            modal.classList.add("open");
            modal.dataset.state = gameStates.WIN;
        }, 1500);
        replayModal.innerText = "Yes!";
        won = true;
    }

    // In case of a loss
    function lose() {
        gameOver = true;
        document.getElementById("lose-desc").innerText = `The word was ${targetWord.toUpperCase()}.`;
        setTimeout(function () {
            modal.classList.add("open");
            modal.dataset.state = gameStates.LOSE;
        }, 1000);
    }

    // Reset game state
    function reset() {
        delete getRow(guesses.length).dataset.state;

        guesses.splice(0, guesses.length);
        currentGuess.splice(0, currentGuess.length);
        gameOver = false;

        for (let tile of Array.from(board.querySelectorAll(".tile"))) {
            tile.dataset.state = letterStates.INITIAL;
            delete tile.dataset.letter;
            tile.innerText = "";
        }

        for (let key of Array.from(keyboard.querySelectorAll(".key"))) {
            key.dataset.state = letterStates.INITIAL;
        }

        setTargetWord();
    }

    let wordBank = ["ratio", "radii", "slice", "euler", "curve", "chord"];

    // Set the next target word
    function setTargetWord() {
        targetWordIndex = Math.floor(Math.random() * wordBank.length);
        targetWord = wordBank[targetWordIndex];
        targetWordList.splice(targetWordList.indexOf(targetWord), 1);
    }

    // Fetch a word bank
    async function fetchWords() {
        await fetch(wordListSource)
            .then((res) => res.text())
            .then((data) => (targetWordList = data.trim().split("\n")));
    }

    // Initial setup
    async function init() {
        await fetchWords();
        headerListeners();
        generateBoard();
        generateKeyboard();
        keyboardListeners();
        modalListeners();
        setTargetWord();
    }

    // Start
    init();
})();
