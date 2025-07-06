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

if (!$data) {
  http_response_code(400);
  echo json_encode(["error" => "Nessun dato ricevuto"]);
  exit();
}

if (!isset($data["numero"]) || trim($data["nome"]) === '' || trim($data["cognome"]) === '') {
  http_response_code(400);
  echo json_encode(["error" => "Dati obbligatori mancanti (numero, nome o cognome)"]);
  exit();
}

$numero = intval($data["numero"]);
$nome = trim($data["nome"]);
$cognome = trim($data["cognome"]);

$data_nascita = isset($data["data_nascita"]) && trim($data["data_nascita"]) !== '' ? trim($data["data_nascita"]) : null;
$nickname = isset($data["nickname"]) && trim($data["nickname"]) !== '' ? trim($data["nickname"]) : null;
$email = isset($data["email"]) && trim($data["email"]) !== '' ? trim($data["email"]) : null;
$cell = isset($data["cell"]) && trim($data["cell"]) !== '' ? trim($data["cell"]) : null;

// Cerca se l'utente esiste già
$stmt = $conn->prepare("SELECT id FROM utenti WHERE nome = ? AND cognome = ?");
$stmt->bind_param("ss", $nome, $cognome);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
  $utente_id = $row["id"];

  // Aggiorna i dati dell'utente esistente
  $updateUser = $conn->prepare("
    UPDATE utenti 
    SET data_nascita = ?, nickname = ?, email = ?, cell = ?
    WHERE id = ?
  ");
  $updateUser->bind_param("ssssi", $data_nascita, $nickname, $email, $cell, $utente_id);
  $updateUser->execute();
} else {
  // Inserisce un nuovo utente
  $insert = $conn->prepare("
    INSERT INTO utenti (nome, cognome, data_nascita, nickname, email, cell)
    VALUES (?, ?, ?, ?, ?, ?)
  ");
  $insert->bind_param("ssssss", $nome, $cognome, $data_nascita, $nickname, $email, $cell);
  if (!$insert->execute()) {
    http_response_code(500);
    echo json_encode(["error" => "Errore nella creazione dell'utente"]);
    exit();
  }
  $utente_id = $conn->insert_id;
}

// Verifica che il numero esista
$checkNumero = $conn->prepare("SELECT 1 FROM numeri WHERE numero = ?");
$checkNumero->bind_param("i", $numero);
$checkNumero->execute();
$numeroResult = $checkNumero->get_result();

if (!$numeroResult->fetch_assoc()) {
  http_response_code(404);
  echo json_encode(["error" => "Numero non trovato"]);
  exit();
}

// Assegna il numero all’utente
$update = $conn->prepare("UPDATE numeri SET utente_id = ?, data_assegnazione = NOW() WHERE numero = ?");
$update->bind_param("ii", $utente_id, $numero);
$success = $update->execute();

echo json_encode([
  "status" => $success ? "ok" : "fail",
  "utente_id" => $utente_id,
  "numero" => $numero
]);

$conn->close();
