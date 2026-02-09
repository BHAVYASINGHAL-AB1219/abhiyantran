<?php
/**
 * Event registration API – stores submissions in MongoDB.
 * POST JSON body: eventId, eventTitle, teamName, collegeName, leader{Name,Email,Phone,Year}, teamMembers[]
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Surface PHP errors as JSON so we can see what fails (e.g. missing MongoDB extension)
set_error_handler(function ($severity, $message, $file, $line) {
    throw new ErrorException($message, 0, $severity, $file, $line);
});

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
if (json_last_error() !== JSON_ERROR_NONE || !is_array($body)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    exit;
}

$eventId = isset($body['eventId']) ? (is_numeric($body['eventId']) ? (int) $body['eventId'] : (string) $body['eventId']) : null;
$eventTitle = isset($body['eventTitle']) ? trim((string) $body['eventTitle']) : '';
$teamName = isset($body['teamName']) ? trim((string) $body['teamName']) : '';
$collegeName = isset($body['collegeName']) ? trim((string) $body['collegeName']) : '';
$leaderName = isset($body['leaderName']) ? trim((string) $body['leaderName']) : '';
$leaderEmail = isset($body['leaderEmail']) ? trim((string) $body['leaderEmail']) : '';
$leaderPhone = isset($body['leaderPhone']) ? trim((string) $body['leaderPhone']) : '';
$year = isset($body['year']) ? trim((string) $body['year']) : '';
$teamMembers = isset($body['teamMembers']) && is_array($body['teamMembers']) ? $body['teamMembers'] : [];

if ($eventId === null || $eventTitle === '' || $teamName === '' || $collegeName === '' || $leaderName === '' || $leaderEmail === '' || $leaderPhone === '' || $year === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing required fields: eventId, eventTitle, teamName, collegeName, leader details, year']);
    exit;
}

$members = [];
foreach ($teamMembers as $m) {
    if (!is_array($m)) continue;
    $members[] = [
        'name' => isset($m['name']) ? trim((string) $m['name']) : '',
        'email' => isset($m['email']) ? trim((string) $m['email']) : '',
        'phone' => isset($m['phone']) ? trim((string) $m['phone']) : '',
    ];
}

try {
    $uri = getMongoUri();
    $dbName = getDbName();
    $client = new \MongoDB\Client($uri);
    $db = $client->selectDatabase($dbName);
    $collection = $db->selectCollection('event_registrations');

    $doc = [
        'eventId' => $eventId,
        'eventTitle' => $eventTitle,
        'teamName' => $teamName,
        'collegeName' => $collegeName,
        'leader' => [
            'name' => $leaderName,
            'email' => $leaderEmail,
            'phone' => $leaderPhone,
            'year' => $year,
        ],
        'teamMembers' => $members,
        'createdAt' => new \MongoDB\BSON\UTCDateTime(),
    ];

    $result = $collection->insertOne($doc);

    echo json_encode([
        'success' => true,
        'message' => 'Registration saved successfully',
        'id' => (string) $result->getInsertedId(),
    ]);
} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to save registration',
        'detail' => $e->getMessage(),
    ]);
}
