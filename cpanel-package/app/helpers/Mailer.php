<?php
/**
 * =====================================================================
 * AGAPE LIGHT NETWORK — PURE PHP SMTP MAILER HELPER
 * =====================================================================
 * Standard cPanel shared hosting compatible SMTP mail transmission.
 * Uses native PHP streams/sockets with STARTTLS and AUTH LOGIN support.
 * Zero Composer or external library requirements.
 */
declare(strict_types=1);

namespace App\Helpers;

use PDO;
use Exception;

class Mailer
{
    /**
     * Sends an email notification via configured SMTP socket.
     *
     * @param string $to Recipient email address
     * @param string $subject Email subject line
     * @param string $bodyText Plaintext version of message
     * @param string $bodyHtml HTML formatted version
     * @param array $config SMTP configuration options
     * @return array [success => bool, message => string, log => array]
     */
    public static function sendSmtp(
        string $to,
        string $subject,
        string $bodyText,
        string $bodyHtml,
        array $config = []
    ): array {
        $host = $config['smtp_host'] ?? 'mail.agapelightnetwork.org';
        $port = (int)($config['smtp_port'] ?? 587);
        $user = $config['smtp_user'] ?? 'notifications@agapelightnetwork.org';
        $pass = $config['smtp_pass'] ?? '';
        $encryption = strtolower($config['smtp_encryption'] ?? 'tls');
        $fromEmail = $config['sender_email'] ?? 'notifications@agapelightnetwork.org';
        $fromName = $config['sender_name'] ?? 'Agape Light Network Website';

        $log = [];
        $log[] = "Connecting to SMTP server at {$host}:{$port} (encryption: {$encryption})...";

        // Protocol prefix for SSL sockets (e.g. port 465)
        $remoteSocket = ($encryption === 'ssl' ? "ssl://{$host}:{$port}" : "tcp://{$host}:{$port}");
        
        $socket = @stream_socket_client(
            $remoteSocket,
            $errno,
            $errstr,
            15,
            STREAM_CLIENT_CONNECT
        );

        if (!$socket) {
            $log[] = "Socket connection failed: {$errstr} ({$errno})";
            // Fallback to PHP native mail() if socket is firewalled on shared cPanel
            return self::sendPhpMailFallback($to, $subject, $bodyText, $bodyHtml, $fromEmail, $fromName, $log);
        }

        stream_set_timeout($socket, 10);
        $res = self::readSocket($socket);
        $log[] = "Server response: " . trim($res);

        // 1. EHLO
        self::writeSocket($socket, "EHLO agapelightnetwork.org\r\n");
        $res = self::readSocket($socket);
        $log[] = "EHLO response: " . trim($res);

        // 2. STARTTLS if required and port is not implicit SSL
        if ($encryption === 'tls') {
            self::writeSocket($socket, "STARTTLS\r\n");
            $res = self::readSocket($socket);
            $log[] = "STARTTLS response: " . trim($res);

            if (str_starts_with(trim($res), '220')) {
                if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                    $log[] = "TLS negotiation failed. Closing connection.";
                    fclose($socket);
                    return self::sendPhpMailFallback($to, $subject, $bodyText, $bodyHtml, $fromEmail, $fromName, $log);
                }
                $log[] = "TLS cryptographic layer established successfully.";

                // Re-send EHLO after TLS handshake
                self::writeSocket($socket, "EHLO agapelightnetwork.org\r\n");
                $res = self::readSocket($socket);
            }
        }

        // 3. AUTH LOGIN if credentials provided
        if (!empty($user) && !empty($pass)) {
            self::writeSocket($socket, "AUTH LOGIN\r\n");
            $res = self::readSocket($socket);

            self::writeSocket($socket, base64_encode($user) . "\r\n");
            $res = self::readSocket($socket);

            self::writeSocket($socket, base64_encode($pass) . "\r\n");
            $res = self::readSocket($socket);
            $log[] = "Auth response: " . trim($res);
        }

        // 4. MAIL FROM
        self::writeSocket($socket, "MAIL FROM:<{$fromEmail}>\r\n");
        $res = self::readSocket($socket);
        $log[] = "MAIL FROM response: " . trim($res);

        // 5. RCPT TO
        self::writeSocket($socket, "RCPT TO:<{$to}>\r\n");
        $res = self::readSocket($socket);
        $log[] = "RCPT TO response: " . trim($res);

        // 6. DATA
        self::writeSocket($socket, "DATA\r\n");
        $res = self::readSocket($socket);
        $log[] = "DATA start response: " . trim($res);

        // Headers & MIME multipart
        $boundary = "----=_Part_" . md5((string)time()) . "_" . uniqid();
        $date = date('r');
        $messageId = "<" . md5(uniqid((string)rand(), true)) . "@" . parse_url($host, PHP_URL_HOST) . ">";

        $headers = "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$fromEmail}>\r\n";
        $headers .= "To: <{$to}>\r\n";
        $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
        $headers .= "Date: {$date}\r\n";
        $headers .= "Message-ID: {$messageId}\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\r\n";
        $headers .= "X-Mailer: AgapeLightNetwork-Native-SMTP-8.2\r\n";
        $headers .= "\r\n";

        $payload = $headers;
        $payload .= "--{$boundary}\r\n";
        $payload .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $payload .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
        $payload .= $bodyText . "\r\n\r\n";

        $payload .= "--{$boundary}\r\n";
        $payload .= "Content-Type: text/html; charset=UTF-8\r\n";
        $payload .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
        $payload .= $bodyHtml . "\r\n\r\n";
        $payload .= "--{$boundary}--\r\n";
        $payload .= ".\r\n";

        self::writeSocket($socket, $payload);
        $res = self::readSocket($socket);
        $log[] = "DATA end response: " . trim($res);

        // 7. QUIT
        self::writeSocket($socket, "QUIT\r\n");
        fclose($socket);

        $success = str_starts_with(trim($res), '250');
        return [
            'success' => $success,
            'message' => $success ? 'SMTP notification dispatched successfully.' : 'SMTP server rejected message data.',
            'log' => $log
        ];
    }

    /**
     * Fallback standard mail() handler if socket client is restricted on host.
     */
    private static function sendPhpMailFallback(
        string $to,
        string $subject,
        string $bodyText,
        string $bodyHtml,
        string $fromEmail,
        string $fromName,
        array &$log
    ): array {
        $log[] = "Executing PHP mail() fallback...";
        $boundary = "----=_Part_" . md5((string)time());
        $headers = "From: {$fromName} <{$fromEmail}>\r\n";
        $headers .= "Reply-To: {$fromEmail}\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\r\n";

        $message = "--{$boundary}\r\n";
        $message .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n" . $bodyText . "\r\n\r\n";
        $message .= "--{$boundary}\r\n";
        $message .= "Content-Type: text/html; charset=UTF-8\r\n\r\n" . $bodyHtml . "\r\n\r\n";
        $message .= "--{$boundary}--";

        $sent = @mail($to, $subject, $message, $headers);
        $log[] = $sent ? "PHP mail() fallback succeeded." : "PHP mail() fallback failed.";

        return [
            'success' => $sent,
            'message' => $sent ? 'Notification sent via PHP mailer fallback.' : 'Both SMTP socket and mail() failed.',
            'log' => $log
        ];
    }

    /**
     * Dispatches the standard "New Website Inquiry" admin notification.
     */
    public static function sendInquiryNotification(
        string $name,
        string $email,
        ?string $phone,
        string $subject,
        string $message,
        string $source,
        array $smtpConfig
    ): array {
        $phoneDisplay = !empty($phone) ? htmlspecialchars($phone) : 'Not provided';
        $submissionTime = date('Y-m-d H:i:s') . ' UTC';
        $emailSubject = "New Website Inquiry: " . $subject . " — from " . $name;
        $adminTo = $smtpConfig['admin_email'] ?? 'azeemtariq809@gmail.com';

        $textBody = "======================================================================\n";
        $textBody .= "NEW WEBSITE INQUIRY — AGAPE LIGHT NETWORK\n";
        $textBody .= "======================================================================\n";
        $textBody .= "NOTICE: This inquiry was received directly through the official website ({$source}).\n\n";
        $textBody .= "SUBMISSION DETAILS:\n";
        $textBody .= "• Notification Type:    New Website Inquiry\n";
        $textBody .= "• Visitor Name:         {$name}\n";
        $textBody .= "• Email Address:        {$email}\n";
        $textBody .= "• Phone:                {$phoneDisplay}\n";
        $textBody .= "• Subject:              {$subject}\n";
        $textBody .= "• Submission Date/Time: {$submissionTime}\n";
        $textBody .= "• Website Source:       {$source}\n\n";
        $textBody .= "MESSAGE CONTENT:\n";
        $textBody .= "----------------------------------------------------------------------\n";
        $textBody .= $message . "\n";
        $textBody .= "======================================================================\n";

        $htmlBody = "
        <div style='font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;'>
            <div style='background: #0f172a; color: #fff; padding: 24px; border-bottom: 3px solid #d97706;'>
                <div style='font-size: 11px; font-weight: bold; text-transform: uppercase; color: #d97706;'>Agape Light Network</div>
                <h2 style='margin: 6px 0 0; font-size: 22px; color: #fff;'>New Website Inquiry</h2>
            </div>
            <div style='background: #fef3c7; border-left: 4px solid #d97706; padding: 12px 20px; font-size: 13px; color: #92400e;'>
                <strong>Notice:</strong> This inquiry was received directly through the official website at <a href='{$source}'>{$source}</a>.
            </div>
            <div style='padding: 24px;'>
                <table style='width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;'>
                    <tr><td style='padding: 8px 0; color: #64748b; width: 140px;'><strong>Visitor Name:</strong></td><td style='padding: 8px 0; color: #0f172a;'><strong>" . htmlspecialchars($name) . "</strong></td></tr>
                    <tr><td style='padding: 8px 0; color: #64748b;'><strong>Email Address:</strong></td><td style='padding: 8px 0;'><a href='mailto:" . htmlspecialchars($email) . "' style='color: #d97706;'>" . htmlspecialchars($email) . "</a></td></tr>
                    <tr><td style='padding: 8px 0; color: #64748b;'><strong>Phone:</strong></td><td style='padding: 8px 0; color: #0f172a;'>" . $phoneDisplay . "</td></tr>
                    <tr><td style='padding: 8px 0; color: #64748b;'><strong>Subject:</strong></td><td style='padding: 8px 0; color: #0f172a;'><strong>" . htmlspecialchars($subject) . "</strong></td></tr>
                    <tr><td style='padding: 8px 0; color: #64748b;'><strong>Submission Date/Time:</strong></td><td style='padding: 8px 0; color: #0f172a;'>" . $submissionTime . "</td></tr>
                    <tr><td style='padding: 8px 0; color: #64748b;'><strong>Website Source:</strong></td><td style='padding: 8px 0;'><a href='{$source}'>{$source}</a></td></tr>
                </table>
                <div style='font-size: 12px; font-weight: bold; color: #475569; text-transform: uppercase;'>Message:</div>
                <div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; font-size: 14px; color: #334155; margin-top: 6px; white-space: pre-wrap;'>
                    " . nl2br(htmlspecialchars($message)) . "
                </div>
            </div>
            <div style='background: #f8fafc; padding: 16px 24px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;'>
                Agape Light Network &bull; Founder &amp; President: Rev. Azeem Tariq &bull; John 8:12
            </div>
        </div>";

        return self::sendSmtp($adminTo, $emailSubject, $textBody, $htmlBody, $smtpConfig);
    }

    private static function writeSocket($socket, string $data): void
    {
        fwrite($socket, $data);
    }

    private static function readSocket($socket): string
    {
        $response = '';
        while ($line = fgets($socket, 515)) {
            $response .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        return $response;
    }
}
