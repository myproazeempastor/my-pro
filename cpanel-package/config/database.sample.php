<?php
/**
 * Agape Light Network — Database Configuration Template
 * Rename this to database.php or let the installer generate it automatically.
 */
declare(strict_types=1);

return [
    'host' => 'localhost',
    'port' => 3306,
    'dbname' => 'agape_db',
    'username' => 'agape_usr',
    'password' => 'YOUR_SECURE_PASSWORD',
    'charset' => 'utf8mb4',
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]
];
