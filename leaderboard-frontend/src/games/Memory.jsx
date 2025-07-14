import React, { useState, useEffect } from "react";
import "./Memory.css";

const cardSymbols = ["◯", "△", "◼", "★", "♢", "☀", "⬟", "♣"];

function shuffleArray(array) {
  const newArray = [...array, ...array]; // duplicate for pairs
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray.map((symbol, index) => ({
    id: index,
    symbol,
    flipped: false,
    matched: false
  }));
}

function Memory() {
  const [cards, setCards] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const [disableClick, setDisableClick] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // State untuk kontrol visibilitas

  useEffect(() => {
    if (gameStarted) {
      setCards(shuffleArray(cardSymbols));
    }
  }, [gameStarted]);

  useEffect(() => {
    // Cek jika semua kartu sudah matched
    if (cards.length && cards.every((card) => card.matched)) {
      setGameWon(true);
    }
  }, [cards]);

  const handleCardClick = (card) => {
    if (!gameStarted || disableClick || card.flipped || card.matched) return;

    const flipped = [...flippedCards, card];
    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updatedCards);
    setFlippedCards(flipped);

    if (flipped.length === 2) {
      setDisableClick(true);
      setTimeout(() => {
        const [first, second] = flipped;
        let newCards;
        if (first.symbol === second.symbol) {
          newCards = updatedCards.map((c) =>
            c.symbol === first.symbol ? { ...c, matched: true } : c
          );
        } else {
          newCards = updatedCards.map((c) =>
            c.id === first.id || c.id === second.id
              ? { ...c, flipped: false }
              : c
          );
        }
        setCards(newCards);
        setFlippedCards([]);
        setDisableClick(false);
      }, 1000);
    }
  };

  const resetGame = () => {
    setCards(shuffleArray(cardSymbols));
    setFlippedCards([]);
    setGameWon(false);
    setDisableClick(false);
    setGameStarted(true); // Otomatis mulai game setelah reset
  };

  const handlePlayClick = () => {
    setGameStarted(true);
  };

  return (
    <div className="memory-container">
      <h2>Memory Game</h2>
      {!gameStarted ? (
        <div className="game-info">
          <div className="instructions">Klik tombol di bawah untuk memulai permainan.</div>
          <div className="description">Temukan semua pasangan kartu yang cocok untuk memenangkan permainan ini!</div>
          <button className="play-button" onClick={handlePlayClick}>Play</button>
        </div>
      ) : (
        <div className="card-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`card ${card.flipped || card.matched ? "flipped" : ""}`}
              onClick={() => handleCardClick(card)}
            >
              <div className="card-inner">
                <div className="card-front">?</div>
                <div className="card-back">{card.symbol}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {gameWon && (
        <div className="game-won-message">
          <h3>🎉 Game Selesai!</h3>
          <button onClick={resetGame}>Main Lagi</button>
        </div>
      )}
    </div>
  );
}

export default Memory;