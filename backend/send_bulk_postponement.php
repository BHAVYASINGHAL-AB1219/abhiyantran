<?php
/**
 * Script to send postponement email to all recipients in recipients_list.txt
 */

require __DIR__ . '/config.php';

$autoload = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoload)) {
    die("Run 'composer install' in the backend folder\n");
}
require $autoload;

$listPath = __DIR__ . '/recipients_list.txt';
if (!file_exists($listPath)) {
    die("Error: recipients_list.txt not found in backend directory.\n");
}

$listContent = file_get_contents($listPath);
preg_match_all('/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/', $listContent, $matches);
$uniqueEmails = array_values(array_unique($matches[0]));

if (empty($uniqueEmails)) {
    die("No valid emails found in recipients_list.txt.\n");
}

echo "Found " . count($uniqueEmails) . " unique emails.\n";

$htmlBody = <<<HTML
<p>Dear All,</p>
<br>
<p>Greetings from Abhiyantran-2026, Annual Technical Fest of NIT Sikkim</p>
<br>
<p>We are writing to inform you that Abhiyantran 2026, the annual Technical Festival of NIT Sikkim, has been postponed due to a medical emergency on campus. There has been an outbreak of chicken pox among students at NIT Sikkim, and in the interest of the health and safety of all participants, attendees, and guests, the institute authorities have decided to defer the festival until the situation is fully under control.</p>
<br>
<p>We sincerely regret the inconvenience this may cause to your students and institution, and we deeply appreciate the enthusiasm and support extended by your college towards Abhiyantran.</p>
<br>
<p><b>Revised Schedule:</b></p>
<br>
<p>Abhiyantran 2026 is now scheduled to resume from April 23 to 25, 2026. Further details regarding the updated event schedule, venue, and logistics will be communicated to you shortly.</p>
<br>
<p>We assure you that all registrations and confirmations already made will remain valid for the revised dates. No re-registration will be required.</p>
<br>
<p>We request your kind understanding and continued support during this time.</p>
<br>
<p>Thank you for your patience and cooperation. We look forward to welcoming you to Abhiyantran 2026.</p>
<br>
<br>
<p>Sincerely,<br>
Team Abhiyantran<br>
National Institute of Technology Sikkim<br>
Barfung Block, Ravangla,<br>
Sikkim - 737139.</p>
HTML;

try {
    $apiKey = getResendApiKey();
    $from   = getResendFrom();

    $successCount = 0;
    $failureCount = 0;

    echo "Starting to send emails...\n";

    foreach ($uniqueEmails as $email) {
        $payload = json_encode([
            'from'    => $from,
            'to'      => [$email],
            'subject' => 'Important Notice Postponement of Abhiyantran 2026 – NIT Sikkim',
            'html'    => $htmlBody
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
