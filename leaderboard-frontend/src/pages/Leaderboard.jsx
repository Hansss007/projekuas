import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [filteredGame, setFilteredGame] = useState("all");
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost/leaderboard-api/read.php")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal mengambil data leaderboard.");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        const uniqueGames = [...new Set(data.map(item => item.game))];
        setGames(uniqueGames);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard:", error);
        setError("Gagal mengambil data leaderboard. Pastikan server API aktif.");
      });
  }, []);

  const filteredData = filteredGame === "all"
    ? data
    : data.filter((item) => item.game === filteredGame);

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🏆 Leaderboard</h1>

      {error ? (
        <div className="text-red-500 mb-4">{error}</div>
      ) : (
        <>
          {/* Filter Dropdown */}
          <div className="mb-4">
            <label className="mr-2">Filter by Game:</label>
            <select
              className="bg-gray-800 text-white border border-gray-600 px-3 py-1 rounded"
              value={filteredGame}
              onChange={(e) => setFilteredGame(e.target.value)}
            >
              <option value="all">All</option>
              {games.map((game, idx) => (
                <option key={idx} value={game}>
                  {game}
                </option>
              ))}
            </select>
          </div>

          {/* List Leaderboard */}
          {filteredData.length > 0 ? (
            <ol className="list-decimal pl-6 space-y-1 text-lg">
              {filteredData.map((item) => (
                <li key={item.id}>
                  {item.nama} - {item.skor}
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-400">Tidak ada data leaderboard.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Leaderboard;
