<?php
/**
 * Agape Light Network — Main Application Configuration
 */
declare(strict_types=1);

return [
    'app_name' => 'Agape Light Network',
    'app_url' => 'https://agapelightnetwork.org',
    'admin_path' => 'admin',
    'default_currency' => 'USD',
    'supported_currencies' => ['USD', 'GBP', 'CAD', 'AUD', 'EUR'],
    'demo_mode' => true,
    'stripe' => [
        'enabled' => false,
        'publishable_key' => '',
        'secret_key' => '',
        'webhook_secret' => ''
    ],
    'paypal' => [
        'enabled' => false,
        'client_id' => '',
        'secret' => '',
        'email' => 'donations@agapelightnetwork.org'
    ],
    'session' => [
        'cookie_name' => 'aln_session',
        'lifetime' => 86400,
        'path' => '/',
        'domain' => '',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Lax'
    ]
];
