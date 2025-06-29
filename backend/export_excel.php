<?php
require_once "db.php";

header("Content-Type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=numeri_lotteria.xls");
header("Pragma: no-cache");
header("Expires: 0");

// Intestazione tabella
echo "Numero\tNome Utente\n";

// Recupera numeri + utenti
$sql = "
  SELECT n.numero, u.nome_utente 
  FROM numeri n
  LEFT JOIN utenti u ON n.utente_id = u.id
";
$result = $conn->query($sql);

$numeri = [];
while ($row = $result->fetch_assoc()) {
  $numeri[intval($row['numero'])] = $row['nome_utente'] ?? '';
}

// Riempie fino a 90
for ($i = 1; $i <= 90; $i++) {
  $nome = $numeri[$i] ?? '';
  echo "$i\t$nome\n";
}
