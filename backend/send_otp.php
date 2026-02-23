<?php
/**
 * Send OTP API
 * POST JSON body: { "email": "leader@example.com", "eventId": 1, "eventTitle": "...", "teamName": "...", "leaderName": "..." }
 * Generates a 6-digit OTP, stores it in MongoDB otp_tokens, and emails it via Resend.
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

set_error_handler(function ($severity, $message, $file, $line) {
    throw new ErrorException($message, 0, $severity, $file, $line);
});

require __DIR__ . '/config.php';

$autoload = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoload)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Run "composer install" in the backend folder']);
    exit;
}
require $autoload;

$raw  = file_get_contents('php://input');
$body = json_decode($raw, true);

if (json_last_error() !== JSON_ERROR_NONE || !is_array($body)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    exit;
}

$email      = isset($body['email'])       ? trim((string) $body['email'])       : '';
$eventId    = isset($body['eventId'])     ? $body['eventId']                    : null;
$eventTitle = isset($body['eventTitle'])  ? trim((string) $body['eventTitle'])  : '';
$teamName   = isset($body['teamName'])    ? trim((string) $body['teamName'])    : '';
$leaderName = isset($body['leaderName'])  ? trim((string) $body['leaderName'])  : '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Valid email is required']);
    exit;
}
if ($eventId === null || $eventTitle === '' || $teamName === '' || $leaderName === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'eventId, eventTitle, teamName and leaderName are required']);
    exit;
}

// Generate a 6-digit OTP
$otp       = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
$expiresAt = new \MongoDB\BSON\UTCDateTime((time() + 600) * 1000); // 10 minutes

try {
    // ── Store OTP in MongoDB ──────────────────────────────────────────────────
    $uri    = getMongoUri();
    $dbName = getDbName();
    $client = new \MongoDB\Client($uri);
    $db     = $client->selectDatabase($dbName);
    $tokens = $db->selectCollection('otp_tokens');

    // Upsert: one token per email+eventId at a time (prevents spam)
    $tokens->updateOne(
        ['email' => $email, 'eventId' => $eventId],
        ['$set' => [
            'otp'       => $otp,
            'leaderName'=> $leaderName,
            'teamName'  => $teamName,
            'eventTitle'=> $eventTitle,
            'expiresAt' => $expiresAt,
        ]],
        ['upsert' => true]
    );

    // ── Send OTP via Resend REST API ─────────────────────────────────────────
    $apiKey = getResendApiKey();
    $from   = getResendFrom();

    $htmlBody = buildOtpEmailHtml($otp, $leaderName, $eventTitle, $teamName);

    $payload = json_encode([
        'from'    => $from,
        'to'      => [$email],
        'subject' => 'Your ABHIYANTRAN 2026 Registration OTP',
        'html'    => $htmlBody,
    ]);

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . $apiKey,
            'Content-Type: application/json',
        ],
    ]);
    $response   = curl_exec($ch);
    $httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError  = curl_error($ch);

    if ($curlError) {
        throw new \RuntimeException('cURL error: ' . $curlError);
    }
    if ($httpStatus < 200 || $httpStatus >= 300) {
        $resendData = json_decode($response, true);
        $detail     = $resendData['message'] ?? $response;
        throw new \RuntimeException('Resend API error (' . $httpStatus . '): ' . $detail);
    }

    echo json_encode(['success' => true, 'message' => 'OTP sent to ' . $email]);

} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'Failed to send OTP',
        'detail'  => $e->getMessage(),
    ]);
}

// ── Email HTML Builder ────────────────────────────────────────────────────────
function buildOtpEmailHtml(string $otp, string $leaderName, string $eventTitle, string $teamName): string {
    $digits = str_split($otp);
    $digitHtml = '';
    foreach ($digits as $d) {
        $digitHtml .= '<span style="display:inline-block;width:48px;height:52px;line-height:52px;text-align:center;'
            . 'background:#0d1220;border:1px solid #00ffff55;'
            . 'font-family:\'Courier New\',monospace;font-size:24px;font-weight:700;color:#00ffff;'
            . 'box-shadow:0 0 8px #00ffff44;margin:0 3px;">' . htmlspecialchars($d) . '</span>';
    }

    $leaderName  = htmlspecialchars($leaderName);
    $eventTitle  = htmlspecialchars($eventTitle);
    $teamName    = htmlspecialchars($teamName);

    return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>ABHIYANTRAN 2026 – OTP Verification</title>
</head>
<body style="margin:0;padding:40px 16px;background:#030508;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;background:#07090f;border:1px solid #00ffff22;box-shadow:0 0 40px #00ffff18;">

  <!-- TOP BORDER -->
  <tr><td style="height:3px;background:linear-gradient(90deg,#00ffff,#bf00ff,#00ffff);padding:0;"></td></tr>

  <!-- HEADER -->
  <tr>
    <td style="background:#07090f;padding:36px 40px 28px;text-align:center;background-image:linear-gradient(#00ffff06 1px,transparent 1px),linear-gradient(90deg,#00ffff06 1px,transparent 1px);background-size:40px 40px;">
      <p style="margin:0 0 6px;font-size:26px;font-weight:900;letter-spacing:4px;background:linear-gradient(135deg,#00ffff,#bf00ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">ABHIYANTRAN 2026</p>
      <p style="margin:0;font-size:11px;letter-spacing:3px;color:#00ffff88;text-transform:uppercase;">NIT SIKKIM &nbsp;·&nbsp; ANNUAL TECH FEST</p>
    </td>
  </tr>

  <!-- DIVIDER -->
  <tr><td style="padding:0 40px;"><div style="height:1px;background:linear-gradient(90deg,transparent,#00ffff55,transparent);"></div></td></tr>

  <!-- SUBJECT -->
  <tr>
    <td style="background:#0b0f1a;padding:16px 40px;">
      <p style="margin:0;font-size:14px;font-weight:600;color:#ffffff;letter-spacing:1px;">🔐&nbsp; Email Verification – Your Registration OTP</p>
    </td>
  </tr>
  <tr><td style="padding:0 40px;"><div style="height:1px;background:linear-gradient(90deg,transparent,#00ffff22,transparent);"></div></td></tr>

  <!-- BODY -->
  <tr>
    <td style="padding:32px 40px;background:#07090f;">
      <p style="margin:0 0 6px;font-size:16px;font-weight:700;color:#ffffff;letter-spacing:1px;">Hello, {$leaderName} 👋</p>
      <p style="margin:0 0 24px;font-size:13px;color:#8899aa;line-height:1.7;">
        Thank you for registering on <span style="color:#00ffff;">ABHIYANTRAN 2026</span>. Use the OTP below to verify your email and complete your team registration.
      </p>

      <!-- Details -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0d1220;border:1px solid #00ffff22;margin-bottom:24px;">
        <tr><td style="padding:18px 22px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding:6px 0;border-bottom:1px solid #ffffff08;"><span style="font-size:11px;color:#00ffff;text-transform:uppercase;letter-spacing:1px;font-weight:600;">📌 Event</span></td>
              <td style="padding:6px 0;text-align:right;border-bottom:1px solid #ffffff08;"><span style="font-size:13px;color:#ffffff;font-weight:500;">{$eventTitle}</span></td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><span style="font-size:11px;color:#00ffff;text-transform:uppercase;letter-spacing:1px;font-weight:600;">👥 Team</span></td>
              <td style="padding:6px 0;text-align:right;"><span style="font-size:13px;color:#ffffff;font-weight:500;">{$teamName}</span></td>
            </tr>
          </table>
        </td></tr>
      </table>

      <!-- OTP Box -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0e1a;border:2px solid #00ffff;box-shadow:0 0 28px #00ffff33,inset 0 0 24px #00ffff08;margin-bottom:10px;">
        <tr>
          <td style="padding:28px 20px;text-align:center;">
            <p style="margin:0 0 12px;font-size:10px;color:#00ffff99;letter-spacing:3px;text-transform:uppercase;">Your OTP</p>
            <div>{$digitHtml}</div>
            <p style="margin:14px 0 0;font-size:11px;color:#6677aa;">⏳ &nbsp;Valid for <strong style="color:#bf00ff;">10 minutes</strong> only</p>
          </td>
        </tr>
      </table>

      <p style="margin:20px 0 0;font-size:12px;color:#556677;line-height:1.7;">
        Enter this OTP on the registration page to complete your signup. Do <strong style="color:#ff5577;">not</strong> share this code with anyone.
      </p>
    </td>
  </tr>

  <!-- DIVIDER -->
  <tr><td style="padding:0 40px;"><div style="height:1px;background:linear-gradient(90deg,transparent,#00ffff22,transparent);"></div></td></tr>

  <!-- FOOTER -->
  <tr>
    <td style="background:#050709;padding:20px 40px;text-align:center;">
      <p style="margin:0 0 6px;font-size:11px;color:#445566;line-height:1.6;">If you did not initiate this registration, you can safely ignore this email.</p>
      <p style="margin:0;font-size:10px;color:#2a3a4a;letter-spacing:2px;text-transform:uppercase;">ABHIYANTRAN 2026 &nbsp;&copy;&nbsp; 2026 &nbsp;&middot;&nbsp; NIT SIKKIM</p>
    </td>
  </tr>

  <!-- BOTTOM BORDER -->
  <tr><td style="height:2px;background:linear-gradient(90deg,#00ffff,#bf00ff,#00ffff);padding:0;"></td></tr>

</table>
</body>
</html>
HTML;
}
