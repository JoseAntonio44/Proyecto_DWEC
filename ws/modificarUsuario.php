<?php

require_once __DIR__ . '/models/UserDAO.php';
require_once __DIR__ . '/utils/Response.php';

try {
    // Verifica que se recibió el parámetro id por GET
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        Response::error("Parámetro 'id' requerido en la URL", null);
    }
    
    // Verifica que la petición es POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        Response::error("Método no permitido. Use POST", null);
    }
    
    $id = (int)$_GET['id'];
    $userDAO = new UserDAO();
    
    // Verifica que el usuario existe
    $usuarioExistente = $userDAO->getById($id);
    if (!$usuarioExistente) {
        Response::error("Usuario con id $id no encontrado", null);
    }
    
    // Recoge datos del POST (solo los que no estén vacíos)
    $data = [];
    
    if (isset($_POST['nombre']) && !empty($_POST['nombre'])) {
        $data['nombre'] = $_POST['nombre'];
    }
    if (isset($_POST['apellidos']) && !empty($_POST['apellidos'])) {
        $data['apellidos'] = $_POST['apellidos'];
    }
    if (isset($_POST['password']) && !empty($_POST['password'])) {
        $data['password'] = $_POST['password'];
    }
    if (isset($_POST['telefono']) && !empty($_POST['telefono'])) {
        $data['telefono'] = $_POST['telefono'];
    }
    if (isset($_POST['email']) && !empty($_POST['email'])) {
        $data['email'] = $_POST['email'];
    }
    if (isset($_POST['sexo']) && !empty($_POST['sexo'])) {
        $data['sexo'] = $_POST['sexo'];
    }
    if (isset($_POST['fecha_nacimiento']) && !empty($_POST['fecha_nacimiento'])) {
        $data['fecha_nacimiento'] = $_POST['fecha_nacimiento'];
    }
    
    // Actualiza usuario
    $usuarioActualizado = $userDAO->update($id, $data);
    
    if ($usuarioActualizado) {
        Response::success("Usuario actualizado correctamente", $usuarioActualizado->toArray());
    } else {
        Response::error("No se pudo actualizar el usuario", null);
    }
    
} catch (Exception $e) {
    Response::error("Error en el servidor: " . $e->getMessage(), null);
}
