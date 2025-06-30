<?php
// contact_handler.php - Main PHP email handler
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Configuration - UPDATE THESE VALUES
$to_email = 'your-email@example.com'; // Your email address
$from_email = 'noreply@yourdomain.com'; // From email (should be from your domain)
$smtp_host = 'smtp.gmail.com'; // SMTP server
$smtp_port = 587;
$smtp_username = 'your-gmail@gmail.com'; // Your Gmail
$smtp_password = 'your-app-password'; // Gmail app password
$site_name = 'Your Website';

// Get form data
$input = json_decode(file_get_contents('php://input'), true);
$first_name = filter_var($input['firstName'] ?? '', FILTER_SANITIZE_STRING);
$last_name = filter_var($input['lastName'] ?? '', FILTER_SANITIZE_STRING);
$email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
$subject = filter_var($input['subject'] ?? '', FILTER_SANITIZE_STRING);
$message = filter_var($input['message'] ?? '', FILTER_SANITIZE_STRING);

// Validation
$errors = [];
if (empty($first_name)) $errors[] = 'First name is required';
if (empty($last_name)) $errors[] = 'Last name is required';
if (!$email) $errors[] = 'Valid email is required';
if (empty($subject)) $errors[] = 'Subject is required';
if (empty($message)) $errors[] = 'Message is required';

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Email content
$email_subject = "Contact Form: " . $subject;
$email_body = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #007bff; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f8f9fa; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #333; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                {$first_name} {$last_name}
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                {$email}
            </div>
            <div class='field'>
                <div class='label'>Subject:</div>
                {$subject}
            </div>
            <div class='field'>
                <div class='label'>Message:</div>
                " . nl2br(htmlspecialchars($message)) . "
            </div>
            <div class='field'>
                <div class='label'>Submitted:</div>
                " . date('Y-m-d H:i:s') . "
            </div>
        </div>
    </div>
</body>
</html>
";

// Headers for HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: {$site_name} <{$from_email}>" . "\r\n";
$headers .= "Reply-To: {$email}" . "\r\n";

// Try to send email
if (mail($to_email, $email_subject, $email_body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}

// ALTERNATIVE: PHPMailer version (more reliable)
/*
require_once 'vendor/autoload.php'; // Install via composer: composer require phpmailer/phpmailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function sendEmailWithPHPMailer($to, $subject, $body, $replyTo) {
    $mail = new PHPMailer(true);
    
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'your-gmail@gmail.com';
        $mail->Password = 'your-app-password';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        
        // Recipients
        $mail->setFrom('noreply@yourdomain.com', 'Your Website');
        $mail->addAddress($to);
        $mail->addReplyTo($replyTo);
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;
        
        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("PHPMailer Error: {$mail->ErrorInfo}");
        return false;
    }
}
*/
?>