<?php
/**
 * Admin Subscribers API
 * GET: Fetch all subscribers (admin only)
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

require __DIR__ . '/config.php';
require __DIR__ . '/admin_auth.php';

if (!validateAdminToken()) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit;
}

$autoload = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoload)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Run "composer install" in the backend folder']);
    exit;
}
require $autoload;

try {
    $uri = getMongoUri();
    $dbName = getDbName();
    $client = new \MongoDB\Client($uri);
    $db = $client->selectDatabase($dbName);
    $collection = $db->selectCollection('subscribers');

    $cursor = $collection->find([], [
        'sort' => ['createdAt' => -1]
    ]);
    
    $subscribers = [];
    foreach ($cursor as $doc) {
        $doc['id'] = (string) $doc['_id'];
        unset($doc['_id']);
        
        if (isset($doc['createdAt']) && $doc['createdAt'] instanceof \MongoDB\BSON\UTCDateTime) {
            $doc['createdAt'] = $doc['createdAt']->toDateTime()->format('c');
        }
        
        $subscribers[] = $doc;
    }
    
    echo json_encode(['success' => true, 'data' => $subscribers]);

} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database operation failed', 'detail' => $e->getMessage()]);
}
