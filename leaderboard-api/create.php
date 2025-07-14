<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Koneksi DB
$conn = new mysqli("localhost", "root", "", "leaderboard-api");

// Ambil data JSON dari request body
$data = json_decode(file_get_contents("php://input"));

// Validasi data
if (!empty($data->nama) && !empty($data->skor) && !empty($data->game)) {
    // Siapkan statement SQL (pastikan nama kolom sesuai dengan tabel)
    $stmt = $conn->prepare("INSERT INTO leaderboard (nama, skor, game) VALUES (?, ?, ?)");
    $stmt->bind_param("sis", $data->nama, $data->skor, $data->game);

    // Eksekusi query
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["message" => "Leaderboard berhasil ditambahkan."]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Gagal menambahkan leaderboard."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Data tidak lengkap."]);
}
?>
