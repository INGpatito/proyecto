<?php
// Conexion simple a MariaDB / MySQL
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$conexion = mysqli_connect("localhost", "root", "pato", "comida");

if (!$conexion) {
    die("Error al conectar: " . mysqli_connect_error());
}
?>
