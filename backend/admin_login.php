<?php
/**
 * Admin Login API
 * POST JSON body: password
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

require __DIR__ . '/config.php';

$raw = file_get_contents('php://input');
$body = json_decode($raw, true);

if (json_last_error() !== JSON_ERROR_NONE || !is_array($body)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    exit;
}

$password = isset($body['password']) ? (string)$body['password'] : '';
$adminPassword = getenv('ADMIN_PASSWORD');

if (!$adminPassword) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'ADMIN_PASSWORD not configured on server']);
    exit;
}

if ($password === $adminPassword) {
    // Generate a simple token based on the password (for simplicity without a DB session table)
    $token = hash('sha256', $adminPassword . 'abhiyantran_admin_secret_salt_2025');
    echo json_encode(['success' => true, 'token' => $token]);
} else {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Invalid password']);
}
