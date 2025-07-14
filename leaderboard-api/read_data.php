<?php
// Koneksi ke database
$conn = new mysqli("localhost", "root", "", "leaderboard-api");

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Ambil data leaderboard
$sql = "SELECT id, nama, skor, game FROM leaderboard ORDER BY skor DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Daftar Leaderboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            padding: 20px;
        }

        .container {
            background: #fff;
            padding: 20px 30px;
            max-width: 800px;
            margin: 0 auto;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        h2 {
            text-align: center;
        }

        .message {
            text-align: center;
            margin: 10px 0;
            color: green;
            font-weight: bold;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            text-align: center;
        }

        th {
            background-color: #007bff;
            color: white;
        }

        .btn-delete {
            color: red;
            text-decoration: none;
        }

        .btn-delete:hover {
            text-decoration: underline;
        }

        a {
            display: inline-block;
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
    <h2>Daftar Leaderboard</h2>

    <?php if (isset($_GET['pesan']) && $_GET['pesan'] == 'hapus_berhasil'): ?>
        <div class="message">Data berhasil dihapus!</div>
    <?php endif; ?>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Skor</th>
                <th>Game</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            <?php if ($result->num_rows > 0): ?>
                <?php while ($row = $result->fetch_assoc()): ?>
                    <tr>
                        <td><?= $row['id'] ?></td>
                        <td><?= htmlspecialchars($row['nama']) ?></td>
                        <td><?= $row['skor'] ?></td>
                        <td><?= htmlspecialchars($row['game']) ?></td>
                        <td>
                            <a href="edit_data.php?id=<?= $row['id'] ?>" style="color: green; margin-right: 10px;">Edit</a>
                            <a href="delete_data.php?id=<?= $row['id'] ?>" class="btn-delete" onclick="return confirm('Yakin ingin menghapus data ini?')">Hapus</a>
                        </td>
                    </tr>
                <?php endwhile; ?>
            <?php else: ?>
                <tr><td colspan="5">Belum ada data.</td></tr>
            <?php endif; ?>
        </tbody>
    </table>

    <a href="../index.php">← Kembali</a>
</div>

</body>
</html>

<?php $conn->close(); ?>
