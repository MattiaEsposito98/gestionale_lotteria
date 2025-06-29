<?php
// Carica variabili d'ambiente da .env
$env = parse_ini_file(__DIR__ . '/.env');

$host = $env['DB_HOST'] ?? 'localhost';
$db   = $env['DB_NAME'] ?? '';
$user = $env['DB_USER'] ?? '';
$pass = $env['DB_PASS'] ?? '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
  die("Connessione fallita: " . $conn->connect_error);
}
