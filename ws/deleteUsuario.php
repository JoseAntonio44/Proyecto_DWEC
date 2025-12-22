<?php

require_once __DIR__ . '/models/UserDAO.php';
require_once __DIR__ . '/utils/Response.php';

try {
    // Verifica que se recibió el parámetro id
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        Response::error("Parámetro 'id' requerido", null);
    }
    
    $id = (int)$_GET['id'];
    $userDAO = new UserDAO();
    
    // Primero obtiene los datos del usuario antes de eliminarlo
    $usuario = $userDAO->getById($id);

    if (!$usuario) {
        Response::error("Usuario con id $id no encontrado", null);
    }

    // Guarda los datos antes de eliminar
    $usuarioData = $usuario->toArray();

    // Elimina el usuario
    if ($userDAO->delete($id)) {
        Response::success("Usuario eliminado correctamente", $usuarioData);
    } else {
        Response::error("No se pudo eliminar el usuario", null);
    }
    
} catch (Exception $e) {
    Response::error("Error en el servidor: " . $e->getMessage(), null);
}
