<?php
include 'config.php';

$message = "";

// Cek apakah ada ID yang dikirim
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("ID tidak valid.");
}

$id = $_GET['id'];

// Ambil data lama berdasarkan ID
$stmt = $pdo->prepare("SELECT * FROM leaderboard WHERE id = :id");
$stmt->execute([':id' => $id]);
$data = $stmt->fetch();

if (!$data) {
    die("Data tidak ditemukan.");
}

// Proses form saat disubmit
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nama = $_POST['nama'] ?? '';
    $skor = $_POST['skor'] ?? '';
    $game = $_POST['game'] ?? '';

    if (!empty($nama) && !empty($skor) && !empty($game)) {
        $stmt = $pdo->prepare("UPDATE leaderboard SET nama = :nama, skor = :skor, game = :game WHERE id = :id");
        $sukses = $stmt->execute([
            ':nama' => $nama,
            ':skor' => $skor,
            ':game' => $game,
            ':id' => $id
        ]);

        if ($sukses) {
            $message = "<p style='color:green;'>Data berhasil diperbarui!</p>";
            // Refresh data
            $data['nama'] = $nama;
            $data['skor'] = $skor;
            $data['game'] = $game;
        } else {
            $message = "<p style='color:red;'>Gagal memperbarui data.</p>";
        }
    } else {
        $message = "<p style='color:red;'>Semua field wajib diisi.</p>";
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Edit Data Leaderboard</title>
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
    input[type="number"] {
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
      background-color: #28a745;
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #218838;
    }
    .message {
      text-align: center;
      margin-top: 20px;
    }
  </style>
</head>
<body>

<div class="container">
  <h2>Edit Data Leaderboard</h2>
  <form method="POST">
    <label for="nama">Nama:</label>
    <input type="text" name="nama" id="nama" value="<?= htmlspecialchars($data['nama']) ?>" required>

    <label for="skor">Skor:</label>
    <input type="number" name="skor" id="skor" value="<?= $data['skor'] ?>" required>

    <label for="game">Game:</label>
    <input type="text" name="game" id="game" value="<?= htmlspecialchars($data['game']) ?>" required>

    <button type="submit">Update</button>
  </form>

  <div class="message">
    <?= $message ?>
  </div>

  <a href="read_data.php">← Kembali ke Daftar</a>
</div>

</body>
</html>
