<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

require_once "db.php";

// Crea un array base da 1 a 90
$numeri = [];
for ($i = 1; $i <= 90; $i++) {
  $numeri[$i] = [
    "numero" => $i,
    "utente_id" => null,
    "nome_utente" => null
  ];
}

// Preleva quelli già assegnati dal DB
$sql = "
  SELECT n.numero, n.utente_id, 
         CONCAT(u.nome, ' ', u.cognome) AS nome_utente
  FROM numeri n
  LEFT JOIN utenti u ON n.utente_id = u.id
";
$result = $conn->query($sql);

// Sovrascrivi quelli trovati
while ($row = $result->fetch_assoc()) {
  $numeri[intval($row["numero"])] = $row;
}

// Ritorna l'array JSON corretto
echo json_encode(array_values($numeri));
