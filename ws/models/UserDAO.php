<?php

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/User.php';

class UserDAO
{
    private $conn;
    private $table = 'alumno';

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function getById($id)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $row = $stmt->fetch();
        
        if ($row) {
            return User::fromArray($row);
        }
        
        return null;
    }

    public function getAll()
    {
        $query = "SELECT * FROM " . $this->table . " ORDER BY id ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $usuarios = [];
        while ($row = $stmt->fetch()) {
            $usuarios[] = User::fromArray($row);
        }

        return $usuarios;
    }

    public function create(User $user)
    {
        $query = "INSERT INTO " . $this->table . " 
                  (nombre, apellidos, password, telefono, email, sexo, fecha_nacimiento) 
                  VALUES 
                  (:nombre, :apellidos, :password, :telefono, :email, :sexo, :fecha_nacimiento)";

        $stmt = $this->conn->prepare($query);

        // Vincula parámetros
        $nombre = $user->getNombre();
        $apellidos = $user->getApellidos();
        $password = $user->getPassword();
        $telefono = $user->getTelefono();
        $email = $user->getEmail();
        $sexo = $user->getSexo();
        $fecha_nacimiento = $user->getFechaNacimiento();

        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellidos', $apellidos);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':sexo', $sexo);
        $stmt->bindParam(':fecha_nacimiento', $fecha_nacimiento);

        if ($stmt->execute()) {
            // Obtiene el ID del usuario recién creado
            $id = $this->conn->lastInsertId();
            return $this->getById($id);
        }

        return null;
    }

    public function delete($id)
    {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        return $stmt->execute();
    }

    public function update($id, $data)
    {
        // Construye la consulta dinámicamente solo con campos no vacíos
        $campos = [];
        $valores = [];

        if (!empty($data['nombre'])) {
            $campos[] = "nombre = :nombre";
            $valores[':nombre'] = $data['nombre'];
        }
        if (!empty($data['apellidos'])) {
            $campos[] = "apellidos = :apellidos";
            $valores[':apellidos'] = $data['apellidos'];
        }
        if (!empty($data['password'])) {
            $campos[] = "password = :password";
            $valores[':password'] = $data['password'];
        }
        if (!empty($data['telefono'])) {
            $campos[] = "telefono = :telefono";
            $valores[':telefono'] = $data['telefono'];
        }
        if (!empty($data['email'])) {
            $campos[] = "email = :email";
            $valores[':email'] = $data['email'];
        }
        if (!empty($data['sexo'])) {
            $campos[] = "sexo = :sexo";
            $valores[':sexo'] = $data['sexo'];
        }
        if (!empty($data['fecha_nacimiento'])) {
            $campos[] = "fecha_nacimiento = :fecha_nacimiento";
            $valores[':fecha_nacimiento'] = $data['fecha_nacimiento'];
        }

        // Si no hay campos para actualizar, devuelve el usuario actual
        if (empty($campos)) {
            return $this->getById($id);
        }

        $query = "UPDATE " . $this->table . " SET " . implode(', ', $campos) . " WHERE id = :id";
        $valores[':id'] = $id;

        $stmt = $this->conn->prepare($query);

        if ($stmt->execute($valores)) {
            return $this->getById($id);
        }

        return null;
    }
}
