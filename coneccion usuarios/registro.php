<?php

include("conexion.php");
header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);
$usuario = $datos["usuario"] ?? ""; // registrar usuario
$contrasena = $datos["contrasena"] ?? ""; // registrar contrasena

if (empty($usuario) || empty($contrasena)) {
    http_response_code(400);
    echo json_encode(["error" => "Completa todos los campos"]);
    exit();
}

// Guardar usuario en la base de datos
$consulta = $conexion->prepare("INSERT INTO usuarios (nombre, contrasena) VALUES (?, ?)");
$consulta->bind_param("ss", $usuario, $contrasena);

if ($consulta->execute()) {
    echo json_encode(["message" => "Usuario registrado con exito"]);
} else {
    http_response_code(400);
    echo json_encode(["error" => "No se pudo registrar el usuario"]);
}
?>
