<?php
$host = 'localhost';
$db_name = 'leaderboard-api';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>
