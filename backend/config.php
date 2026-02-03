<?php
/**
 * Load .env from backend directory (optional).
 * Set MONGODB_URI in your environment or in .env file.
 */
$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') === false) continue;
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value, " \t\n\r\0\x0B\"'");
        if (!array_key_exists($name, $_ENV)) {
            putenv("$name=$value");
            $_ENV[$name] = $value;
        }
    }
}

function getMongoUri() {
    $uri = getenv('MONGODB_URI');
    if ($uri === false || $uri === '') {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'MONGODB_URI not configured']);
        exit;
    }
    return $uri;
}

function getDbName() {
    $db = getenv('MONGODB_DB');
    return $db !== false && $db !== '' ? $db : 'abhiyantran';
}
