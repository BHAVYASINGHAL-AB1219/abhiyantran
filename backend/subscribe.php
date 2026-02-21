<?php
/**
 * Subscribe API
 * POST JSON body: email
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

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

$autoload = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoload)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Run "composer install" in the backend folder']);
    exit;
}
require $autoload;

$raw = file_get_contents('php://input');
$body = json_decode($raw, true);

if (json_last_error() !== JSON_ERROR_NONE || !is_array($body) || empty($body['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Valid email is required']);
    exit;
}

$email = filter_var($body['email'], FILTER_SANITIZE_EMAIL);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email format']);
    exit;
}

try {
    $uri = getMongoUri();
    $dbName = getDbName();
    $client = new \MongoDB\Client($uri);
    $db = $client->selectDatabase($dbName);
    $collection = $db->selectCollection('subscribers');

    // Check if email already exists
    $existing = $collection->findOne(['email' => $email]);
    if ($existing) {
        http_response_code(409);
        echo json_encode(['success' => false, 'error' => 'Email is already subscribed']);
        exit;
    }

    $doc = [
        'email' => $email,
        'createdAt' => new \MongoDB\BSON\UTCDateTime(),
    ];

    $result = $collection->insertOne($doc);
    echo json_encode(['success' => true, 'message' => 'Subscribed successfully', 'id' => (string) $result->getInsertedId()]);

} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database operation failed', 'detail' => $e->getMessage()]);
}
