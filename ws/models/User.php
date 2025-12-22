<?php

require_once __DIR__ . '/../interfaces/IToJson.php';

class User implements IToJson
{
    private $id;
    private $nombre;
    private $apellidos;
    private $password;
    private $telefono;
    private $email;
    private $sexo;
    private $fecha_nacimiento;

    public function __construct($nombre = null, $apellidos = null, $password = null, $telefono = null, $email = null, $sexo = null, $fecha_nacimiento = null, $id = null)
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->apellidos = $apellidos;
        $this->password = $password;
        $this->telefono = $telefono;
        $this->email = $email;
        $this->sexo = $sexo;
        $this->fecha_nacimiento = $fecha_nacimiento;
    }

    // Getters
    public function getId()
    {
        return $this->id;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function getApellidos()
    {
        return $this->apellidos;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function getTelefono()
    {
        return $this->telefono;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getSexo()
    {
        return $this->sexo;
    }

    public function getFechaNacimiento()
    {
        return $this->fecha_nacimiento;
    }

    // Setters
    public function setId($id)
    {
        $this->id = $id;
    }

    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    public function setApellidos($apellidos)
    {
        $this->apellidos = $apellidos;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function setTelefono($telefono)
    {
        $this->telefono = $telefono;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function setSexo($sexo)
    {
        $this->sexo = $sexo;
    }

    public function setFechaNacimiento($fecha_nacimiento)
    {
        $this->fecha_nacimiento = $fecha_nacimiento;
    }

    public function toJson()
    {
        $data = [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'apellidos' => $this->apellidos,
            'password' => $this->password,
            'telefono' => $this->telefono,
            'email' => $this->email,
            'sexo' => $this->sexo,
            'fecha_nacimiento' => $this->fecha_nacimiento
        ];

        return json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }

    public function toArray()
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'apellidos' => $this->apellidos,
            'password' => $this->password,
            'telefono' => $this->telefono,
            'email' => $this->email,
            'sexo' => $this->sexo,
            'fecha_nacimiento' => $this->fecha_nacimiento
        ];
    }

    public static function fromArray($data)
    {
        return new User(
            $data['nombre'] ?? null,
            $data['apellidos'] ?? null,
            $data['password'] ?? null,
            $data['telefono'] ?? null,
            $data['email'] ?? null,
            $data['sexo'] ?? null,
            $data['fecha_nacimiento'] ?? null,
            $data['id'] ?? null
        );
    }
}