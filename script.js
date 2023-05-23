// Game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

// Function to make a move
function makeMove(index) {
  if (board[index] === '') {
    board[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].textContent = currentPlayer;
    document.getElementsByClassName('cell')[index].style.pointerEvents = 'none';
    if (checkWin()) {
      alert('Player ' + currentPlayer + ' wins!');
      resetBoard();
    } else if (board.indexOf('') === -1) {
      alert('It\'s a draw!');
      resetBoard();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

// Function to check for a win
function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }

  return false;
}

// Function to reset the board
function resetBoard() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
    cells[i].style.pointerEvents = 'auto';
  }
}
