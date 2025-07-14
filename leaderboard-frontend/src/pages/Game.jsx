import { Link } from "react-router-dom";
import "./Game.css"; // tambahkan ini untuk styling terpisah

function Games() {
  const gameList = [
    { name: "Tic Tac Toe", path: "/game/tictactoe" },
    { name: "Snake Game", path: "/game/snake" },
    { name: "Memory Game", path: "/game/memory" },
    { name: "Minesweeper", path: "/game/minesweeper" },
    { name: "2048", path: "/game/2048" }
  ];

  return (
    <div className="game-page">
      <h2 className="game-title">Pilih Permainan</h2>
      <div className="game-grid">
        {gameList.map((game, index) => (
          <Link to={game.path} key={index} className="game-card">
            {game.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Games;
