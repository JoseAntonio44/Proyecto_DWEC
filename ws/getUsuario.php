<?php

require_once __DIR__ . '/models/UserDAO.php';
require_once __DIR__ . '/utils/Response.php';

try {
    $userDAO = new UserDAO();
    
    // Si recibe parámetro id por GET, devuelve ese usuario
    if (isset($_GET['id']) && !empty($_GET['id'])) {
        $id = (int)$_GET['id'];
        
        $usuario = $userDAO->getById($id);
        
        if ($usuario) {
            Response::success("Usuario obtenido correctamente", $usuario->toArray());
        } else {
            Response::error("Usuario con id $id no encontrado", null);
        }
    } 
    // Si no recibe parámetro, devuelve todos los usuarios
    else {
        $usuarios = $userDAO->getAll();
        
        // Convierte cada User a array
        $usuariosArray = array_map(function($user) {
            return $user->toArray();
        }, $usuarios);
        
        Response::success("Usuarios obtenido correctamente", $usuariosArray);
    }
    
} catch (Exception $e) {
    Response::error("Error en el servidor: " . $e->getMessage(), null);
}
