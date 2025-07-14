import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Pastikan file CSS ini ada

function Home() {
  return (
    <div className="home-container">
      <div className="welcome-text">
        <h1>Selamat Datang di A9 Game</h1>
        <p>Lets Fun and Enjoy</p>
      </div>
      <div className="games-list">
        <Link to="/game/tictactoe" className="game-icon">
          <img src="/images/tic-tac-toe-icon.png" alt="Tic Tac Toe" />
          <span>Tic Tac Toe</span>
        </Link>
        <Link to="/game/snake" className="game-icon">
          <img src="/images/snake-icon.png" alt="Snake" />
          <span>Snake</span>
        </Link>
        <Link to="/game/memory" className="game-icon">
          <img src="/images/memory-icon.png" alt="Memory" />
          <span>Memory</span>
        </Link>
        <Link to="/game/minesweeper" className="game-icon">
          <img src="/images/minesweeper-icon.png" alt="Minesweeper" />
          <span>Minesweeper</span>
        </Link>
        <Link to="/game/2048" className="game-icon">
          <img src="/images/game2048-icon.png" alt="2048" />
          <span>2048</span>
        </Link>
        {/* Tambahkan ikon dan Link untuk game lainnya di sini jika ada */}
      </div>
    </div>
  );
}

export default Home;