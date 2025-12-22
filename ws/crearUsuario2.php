<?php

require_once __DIR__ . '/models/UserDAO.php';
require_once __DIR__ . '/models/User.php';
require_once __DIR__ . '/utils/Response.php';

try {
    // Verifica que la petición es POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        Response::error("Método no permitido. Use POST", null);
    }
    
    // Recoge datos del POST
    $nombre = $_POST['nombre'] ?? '';
    $apellidos = $_POST['apellidos'] ?? '';
    $password = $_POST['password'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $email = $_POST['email'] ?? '';
    $sexo = $_POST['sexo'] ?? '';
    
    // Valida campos obligatorios (según la BD, solo nombre, apellidos, password y fecha_nacimiento son NOT NULL)
    if (empty($nombre) || empty($apellidos) || empty($password)) {
        Response::error("Los campos nombre, apellidos y password son obligatorios", null);
    }
    
    // La fecha de nacimiento es obligatoria en la BD
    // Si no viene en el formulario, pone una por defecto o pide que la añadan
    $fecha_nacimiento = $_POST['fecha_nacimiento'] ?? date('Y-m-d'); // Fecha actual por defecto

    // Crea instancia de User
    $usuario = new User($nombre, $apellidos, $password, $telefono, $email, $sexo, $fecha_nacimiento);

    // Crea usuario en la BD
    $userDAO = new UserDAO();
    $usuarioCreado = $userDAO->create($usuario);
    
    if ($usuarioCreado) {
        Response::success("Usuario creado con éxito", $usuarioCreado->toArray());
    } else {
        Response::error("No se pudo crear el usuario", null);
    }
    
} catch (Exception $e) {
    Response::error("Error en el servidor: " . $e->getMessage(), null);
}
