import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Games from './pages/Game';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import TicTacToe from './games/TicTacToe';
import './App.css';
import Snake from './games/Snake';
import Memory from './games/Memory';
import Minesweeper from './games/Minesweeper';
import Game2048 from './games/Game2048';
import Leaderboard from "./pages/Leaderboard";

// Di dalam `<Routes>`




function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>A9 Game</h1>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/games">Games</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <Link to="/leaderboard">Leaderboard</Link>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/game/snake" element={<Snake />} />
          <Route path="/game/memory" element={<Memory />} />
          <Route path="/game/minesweeper" element={<Minesweeper />} />
          <Route path="/game/2048" element={<Game2048 />} />
          <Route path="/game/tictactoe" element={<TicTacToe />} />
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;