<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'config.php'; // Memuat $pdo

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->id) &&
    !empty($data->nama) &&
    !empty($data->skor) &&
    !empty($data->game)
) {
    $query = "UPDATE leaderboard SET nama = :nama, skor = :skor, game = :game WHERE id = :id";
    $stmt = $pdo->prepare($query);

    if ($stmt->execute([
        ":nama" => $data->nama,
        ":skor" => $data->skor,
        ":game" => $data->game,
        ":id" => $data->id
    ])) {
        http_response_code(200);
        echo json_encode(["message" => "Data berhasil diupdate."]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Gagal mengupdate data."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Data tidak lengkap."]);
}
?>
