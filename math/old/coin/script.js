const boardEl = document.getElementById('board');
const colButtonsEl = document.getElementById('col-buttons');
const modeSelect = document.getElementById('mode-select');
const colCountInput = document.getElementById('col-count');
const statusText = document.getElementById('status-text');
const replayBtn = document.getElementById('replay-header');
const darkModeToggle = document.getElementById('dark-mode-toggle');

const NUM_ROWS = 3;
let numCols = 10;
let board = [];
let currentPlayer = 1; // 1 (Human) or 2 (Bot/Human 2)
let isBotMode = true;
let gameActive = false;
let botTimeout = null;

function initTheme() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.body.classList.contains('dark-mode');
    const toggleIcon = darkModeToggle.querySelector('span');
    toggleIcon.innerText = isDark ? 'light_mode' : 'dark_mode';
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    updateThemeIcon();
});

function initGame() {
    clearTimeout(botTimeout);

    // Parse settings
    numCols = parseInt(colCountInput.value);
    if (isNaN(numCols) || numCols < 1) {
        numCols = 10;
        colCountInput.value = 10;
    }

    isBotMode = modeSelect.value === 'bot';
    currentPlayer = 1;
    gameActive = true;

    // Initialize board array: true means coin exists
    board = Array.from({ length: NUM_ROWS }, () => Array(numCols).fill(true));

    renderBoard();
    updateStatus();
}

function renderBoard() {
    boardEl.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
    colButtonsEl.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;

    boardEl.innerHTML = '';
    colButtonsEl.innerHTML = '';

    // Render tiles
    for (let r = 0; r < NUM_ROWS; r++) {
        for (let c = 0; c < numCols; c++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.row = r;
            tile.dataset.col = c;

            const coin = document.createElement('div');
            coin.className = 'coin';
            if (!board[r][c]) {
                coin.classList.add('empty');
            } else {
                coin.addEventListener('click', () => handleCoinClick(r, c));
            }

            tile.appendChild(coin);
            boardEl.appendChild(tile);
        }
    }

    // Render column buttons underneath
    for (let c = 0; c < numCols; c++) {
        const btn = document.createElement('button');
        btn.className = 'col-btn';
        btn.innerText = '×';
        btn.dataset.col = c;

        // Disabled if no coins left in column
        const isColEmpty = !board.some(row => row[c]);
        if (isColEmpty) {
            btn.disabled = true;
            btn.innerText = '';
        } else {
            btn.addEventListener('click', () => handleColClick(c, btn));
            btn.addEventListener('mouseenter', () => highlightCol(c, true));
            btn.addEventListener('mouseleave', () => highlightCol(c, false));
        }

        colButtonsEl.appendChild(btn);
    }
}

function highlightCol(col, isHovering) {
    if (!gameActive || (currentPlayer === 2 && isBotMode)) return;

    const tiles = boardEl.querySelectorAll(`.tile[data-col="${col}"]`);
    tiles.forEach(tile => {
        if (isHovering && board.some(row => row[col])) {
            tile.classList.add('col-highlight');
        } else {
            tile.classList.remove('col-highlight');
        }
    });
}

function handleCoinClick(r, c) {
    if (!gameActive || !board[r][c]) return;
    if (currentPlayer === 2 && isBotMode) return; // Block input during bot turn

    removeCoin(r, c);
}

function handleColClick(c, btnEl) {
    if (!gameActive) return;
    if (currentPlayer === 2 && isBotMode) return;

    // Clear highlight physically
    if (btnEl) btnEl.blur(); // Remove browser focus state
    highlightCol(c, false);

    removeCol(c);
}

function removeCoin(r, c) {
    board[r][c] = false;
    postMoveCheck();
}

function removeCol(c) {
    for (let r = 0; r < NUM_ROWS; r++) {
        board[r][c] = false;
    }
    postMoveCheck();
}

function postMoveCheck() {
    renderBoard();

    if (checkWin()) {
        gameActive = false;
        let winnerText = currentPlayer === 1 ? 'Player 1 Wins!' : 'Player 2 Wins!';
        if (isBotMode) {
            winnerText = currentPlayer === 1 ? 'You Win!' : 'Bot Wins!';
        }
        statusText.innerText = winnerText;
        return;
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateStatus();

    if (currentPlayer === 2 && isBotMode) {
        // slight delay to feel natural
        botTimeout = setTimeout(makeBotMove, 800);
    }
}

function checkWin() {
    // If board is empty, the player who JUST moved removed the last coin and wins
    return !board.some(row => row.some(coin => coin));
}

function updateStatus() {
    if (!gameActive) return;
    if (isBotMode) {
        statusText.innerText = currentPlayer === 1 ? 'Your Turn' : "Bot's Turn...";
    } else {
        statusText.innerText = `Player ${currentPlayer}'s Turn`;
    }
}

function makeBotMove() {
    if (!gameActive) return;

    // Enumerating valid moves
    const moves = [];

    for (let c = 0; c < numCols; c++) {
        let colHasCoin = false;
        for (let r = 0; r < NUM_ROWS; r++) {
            if (board[r][c]) {
                moves.push({ type: 'coin', r, c });
                colHasCoin = true;
            }
        }
        if (colHasCoin) {
            // add twice for balance
            moves.push({ type: 'col', c });
            moves.push({ type: 'col', c });
        }
    }

    if (moves.length === 0) return; // redundant safety

    // Uniformly at random selection
    const randomMove = moves[Math.floor(Math.random() * moves.length)];

    if (randomMove.type === 'coin') {
        removeCoin(randomMove.r, randomMove.c);
    } else {
        removeCol(randomMove.c);
    }
}

// Attach event listeners
replayBtn.addEventListener('click', initGame);
modeSelect.addEventListener('change', initGame);
colCountInput.addEventListener('change', initGame);

// Run initial setups
initTheme();
initGame();
