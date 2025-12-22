<?php

class Response
{
    public static function json($success, $message, $data = null)
    {
        header('Content-Type: application/json; charset=utf-8');
        
        $response = [
            'success' => $success,
            'message' => $message,
            'data' => $data
        ];
        
        echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        exit;
    }

    public static function success($message, $data = null)
    {
        self::json(true, $message, $data);
    }

    public static function error($message, $data = null)
    {
        self::json(false, $message, $data);
    }
}
