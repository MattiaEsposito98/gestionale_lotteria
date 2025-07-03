<?php
require_once "db.php";

header("Content-Type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=numeri_lotteria.xls");
header("Pragma: no-cache");
header("Expires: 0");

// Intestazione colonne
echo "Numero\tNome\tCognome\tData di nascita\tNickname\tEmail\tCellulare\n";

// Query con join
$sql = "
  SELECT 
    n.numero,
    u.nome,
    u.cognome,
    u.data_nascita,
    u.nickname,
    u.email,
    u.cell
  FROM numeri n
  LEFT JOIN utenti u ON n.utente_id = u.id
";
$result = $conn->query($sql);

// Organizza i dati indicizzati per numero
$numeri = [];
while ($row = $result->fetch_assoc()) {
  $numeri[intval($row['numero'])] = $row;
}

// Scrivi righe da 1 a 90
for ($i = 1; $i <= 90; $i++) {
  $utente = $numeri[$i] ?? null;

  if ($utente) {
    echo "$i\t" .
      ($utente['nome'] ?? '') . "\t" .
      ($utente['cognome'] ?? '') . "\t" .
      ($utente['data_nascita'] ?? '') . "\t" .
      ($utente['nickname'] ?? '') . "\t" .
      ($utente['email'] ?? '') . "\t" .
      ($utente['cell'] ?? '') . "\n";
  } else {
    // Riga vuota se non assegnato
    echo "$i\t\t\t\t\t\t\n";
  }
}
