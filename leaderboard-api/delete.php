<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'config.php'; // Menggunakan PDO dari config.php

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $query = "DELETE FROM leaderboard WHERE id = :id";
    $stmt = $pdo->prepare($query);

    if ($stmt->execute([":id" => $data->id])) {
        http_response_code(200);
        echo json_encode(["message" => "Data berhasil dihapus."]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Gagal menghapus data."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "ID tidak boleh kosong."]);
}
?>
