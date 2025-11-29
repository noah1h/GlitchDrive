<?php
// contact_handler.php - Secure contact form handler with PHPMailer
require 'vendor/autoload.php'; // Install: composer require phpmailer/phpmailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// ========================================
// CONFIGURATION - UPDATE THESE VALUES
// ========================================
$config = [
    'to_email' => 'your-email@example.com',
    'to_name' => 'Your Name',
    'from_email' => 'noreply@yourdomain.com',
    'from_name' => 'Website Contact Form',
    'site_name' => 'Your Website',
    
    // SMTP Settings (Gmail example)
    'smtp_host' => 'smtp.gmail.com',
    'smtp_port' => 587,
    'smtp_username' => 'your-gmail@gmail.com',
    'smtp_password' => 'your-app-password', // Use App Password, not regular password
    'smtp_secure' => PHPMailer::ENCRYPTION_STARTTLS, // or PHPMailer::ENCRYPTION_SMTPS for port 465
];

// ========================================
// RATE LIMITING (Simple session-based)
// ========================================
session_start();
$rate_limit_time = 60; // seconds between submissions
$last_submission = $_SESSION['last_contact_submission'] ?? 0;

if (time() - $last_submission < $rate_limit_time) {
    http_response_code(429);
    echo json_encode([
        'success' => false, 
        'message' => 'Please wait before submitting another message'
    ]);
    exit;
}

// ========================================
// GET AND VALIDATE INPUT
// ========================================
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    exit;
}

// Sanitize inputs
$first_name = htmlspecialchars(trim($input['firstName'] ?? ''), ENT_QUOTES, 'UTF-8');
$last_name = htmlspecialchars(trim($input['lastName'] ?? ''), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($input['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$subject = htmlspecialchars(trim($input['subject'] ?? ''), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($input['message'] ?? ''), ENT_QUOTES, 'UTF-8');

// Honeypot field (should be empty)
$honeypot = $input['website'] ?? '';

// Validation
$errors = [];
if (empty($first_name)) $errors[] = 'First name is required';
if (empty($last_name)) $errors[] = 'Last name is required';
if (!$email) $errors[] = 'Valid email is required';
if (empty($subject)) $errors[] = 'Subject is required';
if (empty($message)) $errors[] = 'Message is required';
if (strlen($message) < 10) $errors[] = 'Message must be at least 10 characters';
if (strlen($message) > 5000) $errors[] = 'Message is too long';

// Honeypot check
if (!empty($honeypot)) {
    // Silently fail for bots
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    exit;
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// ========================================
// PREPARE EMAIL
// ========================================
$full_name = $first_name . ' ' . $last_name;
$email_subject = "[{$config['site_name']}] {$subject}";

$email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 30px 20px;
            background: #f8f9fa;
        }
        .field {
            margin-bottom: 20px;
            background: white;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }
        .label {
            font-weight: 600;
            color: #667eea;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .value {
            color: #333;
            font-size: 15px;
        }
        .message-box {
            background: white;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .footer {
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            background: #f0f0f0;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>📧 New Contact Form Submission</h1>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>From</div>
                <div class='value'>{$full_name}</div>
            </div>
            
            <div class='field'>
                <div class='label'>Email</div>
                <div class='value'><a href='mailto:{$email}'>{$email}</a></div>
            </div>
            
            <div class='field'>
                <div class='label'>Subject</div>
                <div class='value'>{$subject}</div>
            </div>
            
            <div class='field'>
                <div class='label'>Message</div>
                <div class='message-box'>{$message}</div>
            </div>
            
            <div class='field'>
                <div class='label'>Submitted</div>
                <div class='value'>" . date('F j, Y \a\t g:i A T') . "</div>
            </div>
        </div>
        <div class='footer'>
            This email was sent from your website contact form.<br>
            Reply directly to this email to respond to {$full_name}.
        </div>
    </div>
</body>
</html>
";

// Plain text version
$text_body = "New Contact Form Submission\n\n";
$text_body .= "From: {$full_name}\n";
$text_body .= "Email: {$email}\n";
$text_body .= "Subject: {$subject}\n\n";
$text_body .= "Message:\n{$message}\n\n";
$text_body .= "Submitted: " . date('F j, Y \a\t g:i A T');

// ========================================
// SEND EMAIL WITH PHPMAILER
// ========================================
try {
    $mail = new PHPMailer(true);
    
    // Server settings
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_username'];
    $mail->Password = $config['smtp_password'];
    $mail->SMTPSecure = $config['smtp_secure'];
    $mail->Port = $config['smtp_port'];
    $mail->CharSet = 'UTF-8';
    
    // Recipients
    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($config['to_email'], $config['to_name']);
    $mail->addReplyTo($email, $full_name); // Reply to the sender
    
    // Content
    $mail->isHTML(true);
    $mail->Subject = $email_subject;
    $mail->Body = $email_body;
    $mail->AltBody = $text_body;
    
    // Send
    $mail->send();
    
    // Update rate limit
    $_SESSION['last_contact_submission'] = time();
    
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully.'
    ]);
    
} catch (Exception $e) {
    error_log("Contact form error: {$mail->ErrorInfo}");
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again later.'
    ]);
}
?>