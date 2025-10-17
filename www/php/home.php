<?php
session_start();
if (!isset($_SESSION["usuario"])) {
  header("Location: index.html");
  exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tokyotech - Inicio</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <header class="top-bar">
    Bienvenido, <?php echo $_SESSION["usuario"]; ?>
    <a href="logout.php" class="btn">Cerrar sesión</a>
  </header>

  <section class="hero">
    <h1>Panel de gestión</h1>
    <p>Aquí podrás administrar tus productos, pedidos o usuarios.</p>
  </section>

</body>
</html>
