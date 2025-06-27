<?php
// backend/api/login.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");

session_start();
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

$stmt = $conn->prepare("SELECT id, password_hash FROM admin WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 1) {
  $stmt->bind_result($id, $hash);
  $stmt->fetch();

  if (password_verify($password, $hash)) {
    $_SESSION["admin_id"] = $id;
    echo json_encode(["success" => true]);
    exit;
  }
}

http_response_code(401);
echo json_encode(["success" => false, "message" => "Credenziali non valide"]);
