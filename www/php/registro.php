<?php include("conexion.php"); ?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registro - Tokyotech</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <div class="login-container">
    <img src="../imagenes/LOGO VF.png" alt="Tokyotech" class="logo-login">
    <h2>Crear cuenta</h2>

    <form action="registro.php" method="POST">
      <input type="text" name="nombre" placeholder="Nombre completo" required>
      <input type="email" name="correo" placeholder="Correo" required>
      <input type="password" name="contrasena" placeholder="Contraseña" required>
      <button type="submit" class="btn">Registrarse</button>
    </form>

    <p>¿Ya tienes cuenta? <a href="index.html">Inicia sesión</a></p>
  </div>

</body>
</html>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nombre = $_POST["nombre"];
  $correo = $_POST["correo"];
  $contrasena = password_hash($_POST["contrasena"], PASSWORD_DEFAULT);

  $sql = "INSERT INTO usuarios (nombre, correo, contrasena) VALUES ('$nombre', '$correo', '$contrasena')";
  
  if ($conn->query($sql) === TRUE) {
    echo "<script>alert('Usuario registrado correctamente'); window.location='../index.html';</script>";
  } else {
    echo "<script>alert('Error: " . $conn->error . "');</script>";
  }
}
?>
