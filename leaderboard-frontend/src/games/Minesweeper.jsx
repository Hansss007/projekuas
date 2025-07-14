import React, { useState, useEffect } from 'react';
import './Minesweeper.css';

const ROWS = 8;
const COLS = 8;
const MINES = 10;

function createBoard() {
  const board = Array(ROWS).fill().map(() =>
    Array(COLS).fill({ revealed: false, mine: false, adjacent: 0, flagged: false })
  );

  let minesPlaced = 0;
  while (minesPlaced < MINES) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);
    if (!board[row][col].mine) {
      board[row][col] = { ...board[row][col], mine: true };
      minesPlaced++;
    }
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 && nr < ROWS &&
            nc >= 0 && nc < COLS &&
            board[nr][nc].mine
          ) {
            count++;
          }
        }
      }
      board[r][c] = { ...board[r][c], adjacent: count };
    }
  }

  return board;
}

function Minesweeper() {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      setBoard(createBoard());
      setGameOver(false);
    } else {
      setBoard([]);
      setGameOver(false);
    }
  }, [gameStarted]);

  function flagCell(row, col) {
    if (!gameStarted || gameOver || board[row][col].revealed) return;
    const newBoard = board.map(r => r.map(cell => ({ ...cell })));
    newBoard[row][col].flagged = !newBoard[row][col].flagged;
    setBoard(newBoard);
  }

  function revealCell(row, col, visited) { // Tambahkan parameter visited
    if (!gameStarted || gameOver || board[row][col].revealed || board[row][col].flagged) return;

    const newBoard = board.map(r => r.map(cell => ({ ...cell })));
    const cell = newBoard[row][col];
    cell.revealed = true;
    setBoard(newBoard);

    if (cell.mine) {
      setGameOver(true);
      alert("Game Over!");
      return;
    } else if (cell.adjacent === 0) {
      if (!visited) {
        visited = new Set();
      }
      const cellId = `${row}-${col}`;
      if (visited.has(cellId)) {
        return;
      }
      visited.add(cellId);
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = row + dr;
          const nc = col + dc;
          if (
            nr >= 0 && nr < ROWS &&
            nc >= 0 && nc < COLS &&
            !(dr === 0 && dc === 0)
          ) {
            revealCell(nr, nc, visited);
          }
        }
      }
    }
  }

  const handlePlayClick = () => {
    setGameStarted(true);
  };

  return (
    <div className="minesweeper-container">
      <h2>Minesweeper</h2>
      {!gameStarted ? (
        <div className="game-info">
          <div className="instructions">Klik tombol di bawah untuk memulai permainan.</div>
          <div className="description">Temukan semua sel yang tidak mengandung ranjau tanpa meledakkannya!</div>
          <button className="play-button" onClick={handlePlayClick}>Play</button>
        </div>
      ) : (
        <div className="grid">
          {board.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                className={`cell ${cell.revealed ? 'revealed' : ''} ${cell.flagged ? 'flagged' : ''}`}
                onClick={() => revealCell(r, c, new Set())} // Inisialisasi visited di sini
                onContextMenu={(e) => {
                  e.preventDefault();
                  flagCell(r, c);
                }}
              >
                {cell.revealed ? (cell.mine ? '💣' : cell.adjacent || '') : cell.flagged ? '🚩' : ''}
              </div>
            ))
          )}
        </div>
      )}
      {gameOver && gameStarted && (
        <button onClick={() => {
          setBoard(createBoard());
          setGameOver(false);
        }}>
          Coba Lagi
        </button>
      )}
    </div>
  );
}

export default Minesweeper;