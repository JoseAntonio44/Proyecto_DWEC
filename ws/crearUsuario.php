<?php

require_once __DIR__ . '/models/User.php';

// Recoge datos del POST
$nombre = $_POST['nombre'] ?? '';
$apellidos = $_POST['apellidos'] ?? '';
$password = $_POST['password'] ?? '';
$telefono = $_POST['telefono'] ?? '';
$email = $_POST['email'] ?? '';
$sexo = $_POST['sexo'] ?? '';

// Crea instancia de User
$usuario = new User($nombre, $apellidos, $password, $telefono, $email, $sexo);

// Obtiene JSON del usuario
$jsonUsuario = $usuario->toJson();

// Guarda en archivo de texto (sin sobrescribir)
$archivo = __DIR__ . '/usuarios.txt';
$contenido = $jsonUsuario . PHP_EOL . "---" . PHP_EOL;
file_put_contents($archivo, $contenido, FILE_APPEND);

// Muestra por pantalla en formato JSON
header('Content-Type: application/json; charset=utf-8');
echo $jsonUsuario;
