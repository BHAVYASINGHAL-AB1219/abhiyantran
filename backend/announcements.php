<?php
/**
 * Announcements API
 * GET: Fetch all announcements (public)
 * POST: Create a new announcement (admin)
 * PUT: Update an announcement (admin)
 * DELETE: Delete an announcement (admin)
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require __DIR__ . '/config.php';
require __DIR__ . '/admin_auth.php';

$autoload = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoload)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Run "composer install" in the backend folder']);
    exit;
}
require $autoload;

$method = $_SERVER['REQUEST_METHOD'];

try {
    $uri = getMongoUri();
    $dbName = getDbName();
    $client = new \MongoDB\Client($uri);
    $db = $client->selectDatabase($dbName);
    $collection = $db->selectCollection('announcements');

    if ($method === 'GET') {
        // Fetch all announcements, sort by pinned (desc) then createdAt (desc)
        $cursor = $collection->find([], [
            'sort' => ['pinned' => -1, 'createdAt' => -1]
        ]);
        $announcements = [];
        foreach ($cursor as $doc) {
            $doc['id'] = (string) $doc['_id'];
            unset($doc['_id']);
            $announcements[] = $doc;
        }
        echo json_encode(['success' => true, 'data' => $announcements]);
        exit;
    }

    // All other methods require admin authentication
    if (!validateAdminToken()) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Unauthorized']);
        exit;
    }

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true);

    if ($method === 'POST') {
        if (!is_array($body) || empty($body['title']) || empty($body['content'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Missing title or content']);
            exit;
        }

        $doc = [
            'title' => (string) $body['title'],
            'content' => (string) $body['content'],
            'date' => isset($body['date']) ? (string) $body['date'] : date('F j, Y'),
            'type' => isset($body['type']) ? (string) $body['type'] : 'info',
            'pinned' => isset($body['pinned']) ? (bool) $body['pinned'] : false,
            'createdAt' => new \MongoDB\BSON\UTCDateTime(),
        ];

        $result = $collection->insertOne($doc);
        echo json_encode(['success' => true, 'id' => (string) $result->getInsertedId()]);
        exit;
    }

    if ($method === 'PUT') {
        if (!is_array($body) || empty($body['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Missing announcement id']);
            exit;
        }

        $id = $body['id'];
        $updateData = [];
        if (isset($body['title'])) $updateData['title'] = (string) $body['title'];
        if (isset($body['content'])) $updateData['content'] = (string) $body['content'];
        if (isset($body['date'])) $updateData['date'] = (string) $body['date'];
        if (isset($body['type'])) $updateData['type'] = (string) $body['type'];
        if (isset($body['pinned'])) $updateData['pinned'] = (bool) $body['pinned'];
        $updateData['updatedAt'] = new \MongoDB\BSON\UTCDateTime();

        $result = $collection->updateOne(
            ['_id' => new \MongoDB\BSON\ObjectId($id)],
            ['$set' => $updateData]
        );

        echo json_encode(['success' => true, 'modifiedCount' => $result->getModifiedCount()]);
        exit;
    }

    if ($method === 'DELETE') {
        if (empty($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Missing announcement id in query string']);
            exit;
        }

        $id = $_GET['id'];
        $result = $collection->deleteOne(['_id' => new \MongoDB\BSON\ObjectId($id)]);

        echo json_encode(['success' => true, 'deletedCount' => $result->getDeletedCount()]);
        exit;
    }

    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);

} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database operation failed', 'detail' => $e->getMessage()]);
}
