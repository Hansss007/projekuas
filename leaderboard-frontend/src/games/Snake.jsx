import React, { useState, useEffect, useRef } from "react";
import "./Snake.css";

const boardSize = 10;
const initialSnake = [[0, 0]];
const initialFood = [5, 5];
const gameSpeed = 200;

function Snake() {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState([0, 1]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const gameInterval = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction[0] !== 1) setDirection([-1, 0]);
          break;
        case "ArrowDown":
          if (direction[0] !== -1) setDirection([1, 0]);
          break;
        case "ArrowLeft":
          if (direction[1] !== 1) setDirection([0, -1]);
          break;
        case "ArrowRight":
          if (direction[1] !== -1) setDirection([0, 1]);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameInterval.current = setInterval(() => {
        const newHead = [
          (snake[0][0] + direction[0] + boardSize) % boardSize,
          (snake[0][1] + direction[1] + boardSize) % boardSize
        ];
        const newSnake = [newHead, ...snake];

        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood([
            Math.floor(Math.random() * boardSize),
            Math.floor(Math.random() * boardSize)
          ]);
          setScore((prevScore) => prevScore + 1);
        } else {
          newSnake.pop();
        }

        for (let i = 1; i < newSnake.length; i++) {
          if (newSnake[i][0] === newHead[0] && newSnake[i][1] === newHead[1]) {
            setGameOver(true);
            clearInterval(gameInterval.current);
            return;
          }
        }

        setSnake(newSnake);
      }, gameSpeed);
    } else {
      clearInterval(gameInterval.current);
    }

    return () => clearInterval(gameInterval.current);
  }, [snake, direction, food, gameOver, gameStarted]);

  const handleReset = () => {
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection([0, 1]);
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
    clearInterval(gameInterval.current);
  };

  const handlePlayClick = () => {
    setGameStarted(true);
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection([0, 1]);
    setGameOver(false);
    setScore(0);
  };

  const changeDirection = (dir) => {
    switch (dir) {
      case "up":
        if (direction[0] !== 1) setDirection([-1, 0]);
        break;
      case "down":
        if (direction[0] !== -1) setDirection([1, 0]);
        break;
      case "left":
        if (direction[1] !== 1) setDirection([0, -1]);
        break;
      case "right":
        if (direction[1] !== -1) setDirection([0, 1]);
        break;
      default:
        break;
    }
  };

  const head = snake[0];

  return (
    <div className="snake-container">
      <h2>Snake Game</h2>
      {!gameStarted ? (
        <div className="game-info">
          <div className="instructions">
            Gunakan tombol panah atau tombol layar sentuh untuk bermain.
          </div>
          <h3>
            Snake adalah permainan klasik di mana Anda mengontrol seekor ular
            yang tumbuh saat memakan makanan. Hindari menabrak diri sendiri!
          </h3>
          <button className="play-button" onClick={handlePlayClick}>
            Play
          </button>
        </div>
      ) : (
        <>
          <div className="score">Score: {score}</div>
          <div className="snake-board">
            {[...Array(boardSize)].map((_, row) => (
              <div key={row} className="snake-row">
                {[...Array(boardSize)].map((_, col) => {
                  const isHead = head && head[0] === row && head[1] === col;
                  const isSnakeBody = snake.some(
                    ([r, c], index) => index > 0 && r === row && c === col
                  );
                  const isFood = food[0] === row && food[1] === col;
                  return (
                    <div
                      key={col}
                      className={`snake-cell ${
                        isHead
                          ? "snake-head"
                          : isSnakeBody
                          ? "snake"
                          : ""
                      } ${isFood ? "food" : ""}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="mobile-controls">
            <button onClick={() => changeDirection("up")}>&uarr;</button>
            <div>
              <button onClick={() => changeDirection("left")}>&larr;</button>
              <button onClick={() => changeDirection("down")}>&darr;</button>
              <button onClick={() => changeDirection("right")}>&rarr;</button>
            </div>
          </div>
          {gameOver && (
            <div className="game-over">
              <h2>Game Over</h2>
              <p className="final-score">Final Score: {score}</p>
              <button className="reset-button" onClick={handleReset}>
                Reset Game
              </button>
            </div>
          )}
          {!gameOver && (
            <button className="reset-button" onClick={handleReset}>
              Reset Game
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Snake;
