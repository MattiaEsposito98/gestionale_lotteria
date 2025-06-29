<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["numero"]) || !isset($data["utente_nome"])) {
  http_response_code(400);
  echo json_encode(["error" => "Dati non validi"]);
  exit();
}

$numero = intval($data["numero"]);
$nome = trim($data["utente_nome"]);

// 🔁 Cerca utente
$stmt = $conn->prepare("SELECT id FROM utenti WHERE nome_utente = ?");
$stmt->bind_param("s", $nome);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
  $utente_id = $row["id"];
} else {
  // 🆕 Crea utente se non esiste
  $insert = $conn->prepare("INSERT INTO utenti (nome_utente) VALUES (?)");
  $insert->bind_param("s", $nome);
  if (!$insert->execute()) {
    http_response_code(500);
    echo json_encode(["error" => "Errore nella creazione dell'utente"]);
    exit();
  }
  $utente_id = $conn->insert_id;
}

// ✅ Assegna il numero
$stmt2 = $conn->prepare("UPDATE numeri SET utente_id = ?, data_assegnazione = NOW() WHERE numero = ?");
$stmt2->bind_param("ii", $utente_id, $numero);
$success = $stmt2->execute();

echo json_encode(["status" => $success ? "ok" : "fail"]);

$conn->close();
