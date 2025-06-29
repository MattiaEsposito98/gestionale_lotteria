<?php
// backend/api/check_session.php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

session_start();

echo json_encode([
  "loggedIn" => isset($_SESSION["admin_id"])
]);
