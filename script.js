const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const statusText = document.getElementById('status');

let player1 = prompt("Ingrese el nombre del Jugador 1 (usará 'X'):");
let player2 = prompt("Ingrese el nombre del Jugador 2 (usará 'O'):");

let currentPlayer = player1;
let currentSymbol = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let scorePlayer1 = 0;
let scorePlayer2 = 0;

const scoreDisplay = document.getElementById('score');
scoreDisplay.textContent = `${player1}: ${scorePlayer1} | ${player2}: ${scorePlayer2}`;


const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    gameState[index] = currentSymbol;
    cell.textContent = currentSymbol;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} has ganado!`;
        window.alert(`${currentPlayer} ha ganado`);
       
        if (currentPlayer === player1) {
            scorePlayer1++;
        } else {
            scorePlayer2++;
        }

        scoreDisplay.textContent = `${player1}: ${scorePlayer1} | ${player2}: ${scorePlayer2}`;

        isGameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusText.textContent = 'Empate!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    currentSymbol = currentSymbol === 'X' ? 'O' : 'X';
}

function resetGame() {
    currentPlayer = player1;
    currentSymbol = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    statusText.textContent = '';
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
