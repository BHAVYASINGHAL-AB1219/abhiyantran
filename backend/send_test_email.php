<?php
/**
 * Test script to send email with PDF attachment via Resend
 */

require __DIR__ . '/config.php';

$autoload = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoload)) {
    die("Run 'composer install' in the backend folder\n");
}
require $autoload;

$email = 'singhalbhavya380@gmail.com';
$pdfPath = __DIR__ . '/Abhiyantran_2026_Undertaking.pdf';

if (!file_exists($pdfPath)) {
    die("Error: Abhiyantran_2026_Undertaking.pdf not found in backend directory.\n");
}

$pdfContent = base64_encode(file_get_contents($pdfPath));

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
    $apiKey = getResendApiKey();
    $from   = getResendFrom();

    $payload = json_encode([
        'from'    => $from,
        'to'      => [$email],
        'subject' => 'Undertaking Form - Abhiyantran 2026',
        'html'    => $htmlBody,
        'attachments' => [
            [
                'filename' => 'undertaking_form.pdf',
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

    if ($curlError) {
        throw new \RuntimeException('cURL error: ' . $curlError);
    }
    if ($httpStatus < 200 || $httpStatus >= 300) {
        throw new \RuntimeException('Resend API error (' . $httpStatus . '): ' . $response);
    }

    echo "Successfully sent test email with PDF attachment to $email\n";

} catch (\Throwable $e) {
    echo "Failed to send email: " . $e->getMessage() . "\n";
}
