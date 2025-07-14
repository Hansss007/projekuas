<?php
$message = "";

// Proses form saat disubmit
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Koneksi ke database
    $conn = new mysqli("localhost", "root", "", "leaderboard-api");

    // Ambil data dari form
    $nama = $_POST["nama"] ?? '';
    $skor = $_POST["skor"] ?? '';
    $game = $_POST["game"] ?? '';

    // Validasi input
    if (!empty($nama) && !empty($skor) && !empty($game)) {
        // Siapkan statement SQL
        $stmt = $conn->prepare("INSERT INTO leaderboard (nama, skor, game) VALUES (?, ?, ?)");
        $stmt->bind_param("sis", $nama, $skor, $game);

        // Eksekusi
        if ($stmt->execute()) {
            $message = "<p style='color: green;'>Leaderboard berhasil ditambahkan!</p>";
        } else {
            $message = "<p style='color: red;'>Gagal menambahkan leaderboard.</p>";
        }
    } else {
        $message = "<p style='color: red;'>Data tidak lengkap!</p>";
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Form Leaderboard</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      padding: 20px;
    }

    .container {
      background: #fff;
      padding: 20px 30px;
      max-width: 500px;
      margin: 0 auto;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    h2 {
      text-align: center;
    }

    input[type="text"],
    input[type="number"],
    select {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }

    .message {
      text-align: center;
      margin-top: 20px;
    }

    a {
      display: block;
      text-align: center;
      margin-top: 20px;
      text-decoration: none;
      color: #007bff;
    }

    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>

<div class="container">
  <h2>Input Data Leaderboard</h2>
  <form method="POST" action="">
    <label for="nama">Nama:</label>
    <input type="text" name="nama" id="nama" required>

    <label for="skor">Skor:</label>
    <input type="number" name="skor" id="skor" required>

    <label for="game">Game:</label>
    <select name="game" id="game" required>
      <option value="">-- Pilih Game --</option>
      <option value="TicTacToe">TicTacToe</option>
      <option value="SnakeGame">SnakeGame</option>
      <option value="MemoryGame">MemoryGame</option>
      <option value="Minesweeper">Minesweeper</option>
      <option value="2048">2048</option>
    </select>

    <button type="submit">Simpan</button>
  </form>

  <div class="message">
    <?php echo $message; ?>
  </div>
</div>
<a href="../index.php">← Kembali</a>

</body>
</html>
