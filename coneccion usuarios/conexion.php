<?php
// Conexion simple a MariaDB / MySQL
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Responder con exito si el navegador hace una peticion preflight OPTIONS
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$conexion = mysqli_connect("localhost", "root", "pato", "comida");

if (!$conexion) {
    die("Error al conectar: " . mysqli_connect_error());
}
?>
