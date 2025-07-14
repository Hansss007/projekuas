<?php
include 'config.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Gunakan prepared statement untuk keamanan
    $query = "DELETE FROM leaderboard WHERE id = :id";
    $stmt = $pdo->prepare($query);

    if ($stmt->execute([':id' => $id])) {
        header("Location: read_data.php?pesan=hapus_berhasil");
        exit();
    } else {
        echo "<p style='color:red;'>Gagal menghapus data.</p>";
    }
} else {
    echo "<p style='color:red;'>ID tidak ditemukan.</p>";
}
?>
