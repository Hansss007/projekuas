import React, { useEffect, useState, useCallback } from 'react';
import './Game2048.css';

const SIZE = 4;

function getEmptyBoard() {
  return Array(SIZE).fill().map(() => Array(SIZE).fill(0));
}

function getRandomEmptyCell(board) {
  const empty = [];
  board.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === 0) empty.push([r, c]);
    });
  });
  return empty[Math.floor(Math.random() * empty.length)];
}

function addRandomTile(board) {
  const [r, c] = getRandomEmptyCell(board) || [];
  if (r !== undefined && c !== undefined) {
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
  }
  return board;
}

function cloneBoard(board) {
  return board.map(row => [...row]);
}

function transpose(board) {
  return board[0].map((_, i) => board.map(row => row[i]));
}

function operateRow(row) {
  let newRow = row.filter(val => val !== 0);
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      newRow[i + 1] = 0;
    }
  }
  return newRow.filter(val => val !== 0).concat(Array(SIZE - newRow.filter(val => val !== 0).length).fill(0));
}

function move(board, direction) {
  let rotated = cloneBoard(board);

  if (direction === 'up') {
    rotated = transpose(rotated);
  } else if (direction === 'down') {
    rotated = transpose(rotated).map(row => row.reverse());
  } else if (direction === 'right') {
    rotated = rotated.map(row => row.reverse());
  }

  const moved = rotated.map(operateRow);

  if (direction === 'up') {
    rotated = transpose(moved);
  } else if (direction === 'down') {
    rotated = transpose(moved.map(row => row.reverse()));
  } else if (direction === 'right') {
    rotated = moved.map(row => row.reverse());
  } else {
    rotated = moved;
  }

  return rotated;
}

function boardsAreEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function checkGameOver(bd) {
  const directions = ['up', 'down', 'left', 'right'];
  return directions.every(dir => boardsAreEqual(move(bd, dir), bd));
}

function Game2048() {
  const [board, setBoard] = useState(getEmptyBoard());
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setBoard(addRandomTile(addRandomTile(getEmptyBoard())));
    setGameOver(false);
    setGameStarted(true);
  };

  const resetGame = () => {
    setBoard(addRandomTile(addRandomTile(getEmptyBoard())));
    setGameOver(false);
  };

  const handleKeyDown = useCallback((e) => {
    if (gameOver || !gameStarted) return;
    const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (directions.includes(e.key)) {
      e.preventDefault(); // Mencegah perilaku default scroll
      const dirMap = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
      };
      const newBoard = move(board, dirMap[e.key]);
      if (!boardsAreEqual(board, newBoard)) {
        const updated = addRandomTile(cloneBoard(newBoard));
        setBoard(updated);
        if (checkGameOver(updated)) setGameOver(true);
      }
    }
  }, [gameOver, gameStarted, board, setBoard]);

  useEffect(() => {
    if (gameStarted) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, handleKeyDown]);

  return (
    <div className="two048-container">
      <h2>2048</h2>
      {!gameStarted ? (
        <div className="two048-game-info">
          <div className="two048-instructions">Geser ubin untuk menggabungkannya dan mencapai 2048!</div>
          <button className="two048-play-button" onClick={startGame}>Play</button>
        </div>
      ) : (
        <div className="two048-grid">
          {board.map((row, r) => (
            row.map((val, c) => (
              <div key={`${r}-${c}`} className={`two048-tile two048-tile-${val}`}>{val !== 0 ? val : ''}</div>
            ))
          ))}
          {gameOver && (
            <div className="two048-game-over-overlay">
              <div className="two048-game-over-message">
                Game Over
                <button className="two048-reset-button" onClick={resetGame}>Reset Game</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Game2048;