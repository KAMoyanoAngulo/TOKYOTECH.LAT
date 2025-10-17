<?php
include("conexion.php");
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $correo = $_POST["correo"];
  $contrasena = $_POST["contrasena"];

  $sql = "SELECT * FROM usuarios WHERE correo='$correo'";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($contrasena, $row["contrasena"])) {
      $_SESSION["usuario"] = $row["nombre"];
      header("Location: home.php");
      exit;
    } else {
      echo "<script>alert('Contraseña incorrecta'); window.location='../index.html';</script>";
    }
  } else {
    echo "<script>alert('Usuario no encontrado'); window.location='../index.html';</script>";
  }
}
?>
