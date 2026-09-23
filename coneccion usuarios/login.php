<?php

include("conexion.php");
header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);
$usuario = $datos["usuario"] ?? ""; // datos del usuario
$contrasena = $datos["contrasena"] ?? ""; // contrasena del usuario

if (empty($usuario) || empty($contrasena)) { // si el usuario no esta registrado entonces
    http_response_code(400);
    echo json_encode(["error" => "Completa todos los campos"]);
    exit();
}

// Comprobar si usuario y contrasena coinciden
$consulta = $conexion->prepare("SELECT * FROM usuarios WHERE nombre = ? AND contrasena = ?");
$consulta->bind_param("ss", $usuario, $contrasena);
$consulta->execute();
$resultado = $consulta->get_result();

if ($resultado->num_rows > 0) {
    echo json_encode(["message" => "Bienvenido"]);
} else {
    http_response_code(401);
    echo json_encode(["error" => "Usuario o contrasena incorrectos"]);
}
?>
