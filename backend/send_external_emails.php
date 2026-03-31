<?php
/**
 * Script to send bulk email with PDF attachment via Resend
 * to external team leaders (not from NIT Sikkim).
 */

require __DIR__ . '/config.php';

$autoload = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoload)) {
    die("Run 'composer install' in the backend folder\n");
}
require $autoload;

$dryRun = false; // Set to false to actually send emails

$pdfPath = __DIR__ . '/Abhiyantran_2026_Undertaking.pdf';

if (!$dryRun && !file_exists($pdfPath)) {
    die("Error: Abhiyantran_2026_Undertaking.pdf not found in backend directory.\n");
}

$pdfContent = $dryRun ? "" : base64_encode(file_get_contents($pdfPath));

$htmlBody = <<<HTML
<p>Dear All,</p>
<p>Greetings from Abhiyantran 2026, the Technical Fest of National Institute of Technology Sikkim.</p>
<p>Please find attached the undertaking form for participation in Abhiyantran 2026. We kindly request you to ensure that all participating students duly fill and sign the form, and get it verified by the Dean/Head of your institution.</p>
<p>The completed and signed undertaking forms must be submitted prior to the event.</p>
<p>For your reference, the attached document contains all necessary details and declarations.</p>
<p>We request your cooperation in ensuring compliance with the above requirements.</p>
<p>In case of any queries, please feel free to contact us.</p>
<p>Thank you for your support and cooperation.</p>
<br>
<p>Sincerely,<br>Team Abhiyantran</p>
HTML;

try {
    $uri    = getMongoUri();
    $dbName = getDbName();
    $client = new \MongoDB\Client($uri);
    $db     = $client->selectDatabase($dbName);
    $collection = $db->selectCollection('event_registrations');
    
    $cursor = $collection->find([]);
    
    $emails = [];
    foreach ($cursor as $doc) {
        if (isset($doc['leader']['email']) && filter_var($doc['leader']['email'], FILTER_VALIDATE_EMAIL)) {
            $email = trim(strtolower((string)$doc['leader']['email']));
            $college = isset($doc['collegeName']) ? trim(strtolower((string)$doc['collegeName'])) : '';
            
            // Skip NIT Sikkim variations
            if (strpos($college, 'nit sikkim') !== false || 
                strpos($college, 'national institute of technology sikkim') !== false ||
                strpos($college, 'nitsikkim') !== false ||
                strpos($email, '@nitsikkim.ac.in') !== false) {
                continue;
            }

            $emails[$email] = true;
        }
    }
    
    $uniqueEmails = array_keys($emails);
    
    echo "Found " . count($uniqueEmails) . " unique external team leaders.\n\n";

    if ($dryRun) {
        echo "DRY RUN MODE ENABLED. Generating recipients_list.txt for review...\n";
        $listContent = "Recipients List (" . count($uniqueEmails) . " emails):\n\n";
        foreach ($uniqueEmails as $i => $email) {
            $listContent .= ($i + 1) . ". " . $email . "\n";
        }
        file_put_contents(__DIR__ . '/recipients_list.txt', $listContent);
        echo "Please review recipients_list.txt. To actually send, set \$dryRun = false; in the script.\n";
        exit;
    }
    
    echo "Starting to send emails...\n";
    $apiKey = getResendApiKey();
    $from   = getResendFrom();

    $successCount = 0;
    $failureCount = 0;

    foreach ($uniqueEmails as $email) {
        $payload = json_encode([
            'from'    => $from,
            'to'      => [$email],
            'subject' => 'Undertaking Form - Abhiyantran 2026',
            'html'    => $htmlBody,
            'attachments' => [
                [
                    'filename' => 'Abhiyantran_2026_Undertaking.pdf',
                    'content'  => $pdfContent
                ]
            ]
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
        curl_close($ch);

        if ($curlError || $httpStatus < 200 || $httpStatus >= 300) {
            echo "FAILED to send to $email (Status: $httpStatus, Error: $curlError)\n";
            $failureCount++;
        } else {
            echo "Successfully sent to $email\n";
            $successCount++;
        }
        
        usleep(200000); // 200ms
    }

    echo "\nFinished sending emails.\n";
    echo "Success: $successCount\n";
    echo "Failures: $failureCount\n";

} catch (\Throwable $e) {
    echo "Fatal Error: " . $e->getMessage() . "\n";
}
