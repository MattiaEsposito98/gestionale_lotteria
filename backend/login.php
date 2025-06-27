<?php
session_start();
require_once 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST["username"] ?? '';
  $password = $_POST["password"] ?? '';

  $stmt = $conn->prepare("SELECT id, password_hash FROM admin WHERE username = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $stmt->store_result();

  if ($stmt->num_rows == 1) {
    $stmt->bind_result($id, $hash);
    $stmt->fetch();
    if (password_verify($password, $hash)) {
      $_SESSION["admin_id"] = $id;
      header("Location: dashboard.php");
      exit;
    } else {
      $error = "Password errata";
    }
  } else {
    $error = "Utente non trovato";
  }
}
?>

<!-- HTML semplice -->
<!DOCTYPE html>
<html>

<head>
  <title>Login Admin</title>
</head>

<body>
  <h2>Login</h2>
  <?php if (isset($error)) echo "<p style='color:red;'>$error</p>"; ?>
  <form method="POST">
    <label>Username: <input type="text" name="username" required></label><br>
    <label>Password: <input type="password" name="password" required></label><br>
    <button type="submit">Login</button>
  </form>
</body>

</html>