<?php
// CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Koneksi ke database
$conn = new mysqli("localhost", "root", "", "leaderboard-api");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Koneksi gagal: " . $conn->connect_error]);
    exit();
}

// Ambil data leaderboard
$sql = "SELECT id, nama, skor, game FROM leaderboard ORDER BY skor DESC";
$result = $conn->query($sql);

$data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Tutup koneksi
$conn->close();

// Output JSON
echo json_encode($data);
