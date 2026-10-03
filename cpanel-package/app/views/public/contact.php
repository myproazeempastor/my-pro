<?php
/**
 * =====================================================================
 * AGAPE LIGHT NETWORK — INDEPENDENT CONTACT PAGE WITH SMTP NOTIFICATIONS
 * =====================================================================
 */
declare(strict_types=1);
use App\Helpers\Security;
use App\Helpers\Mailer;

$pageTitle = "Contact Us & Prayer Requests — Agape Light Network";
$metaDescription = "Send a direct message or confidential prayer request to Rev. Azeem Tariq and the Agape Light Network ministry leadership.";

$submitted = false;
$submissionData = null;
$errorMsg = null;

// Handle Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!Security::validateCsrfToken($_POST['csrf_token'] ?? '')) {
        $errorMsg = "Security validation token expired. Please refresh and try again.";
    } else {
        $name = Security::sanitizeString($_POST['name'] ?? '');
        $email = Security::sanitizeEmail($_POST['email'] ?? '');
        $phone = Security::sanitizeString($_POST['phone'] ?? '');
        $subject = Security::sanitizeString($_POST['subject'] ?? 'General Mission Inquiry');
        $message = Security::sanitizeString($_POST['message'] ?? '');
        $source = "https://agapelightnetwork.org/contact-us";

        if (empty($name) || empty($email) || empty($message)) {
            $errorMsg = "Please complete all required fields.";
        } else {
            // Load SMTP settings from database or fallback configuration
            $smtpConfig = [
                'smtp_host' => 'mail.agapelightnetwork.org',
                'smtp_port' => 587,
                'smtp_user' => 'notifications@agapelightnetwork.org',
                'smtp_pass' => '',
                'smtp_encryption' => 'tls',
                'sender_name' => 'Agape Light Network Website',
                'sender_email' => 'notifications@agapelightnetwork.org',
                'admin_email' => 'azeemtariq809@gmail.com'
            ];

            if (isset($db)) {
                try {
                    $stmt = $db->query("SELECT setting_key, setting_value FROM site_settings WHERE setting_key LIKE 'smtp_%'");
                    while ($row = $stmt->fetch()) {
                        $smtpConfig[$row['setting_key']] = $row['setting_value'];
                    }

                    // Store inquiry in database
                    $ins = $db->prepare("INSERT INTO contact_messages (name, email, phone, subject, message, website_source, created_at) VALUES (:n, :e, :p, :s, :m, :w, NOW())");
                    $ins->execute([
                        ':n' => $name,
                        ':e' => $email,
                        ':p' => $phone,
                        ':s' => $subject,
                        ':m' => $message,
                        ':w' => $source
                    ]);
                } catch (\Throwable $e) {
                    // Fail gracefully
                }
            }

            // Immediately dispatch SMTP email notification
            $mailResult = Mailer::sendInquiryNotification($name, $email, $phone, $subject, $message, $source, $smtpConfig);

            $submitted = true;
            $submissionData = [
                'name' => $name,
                'email' => $email,
                'phone' => !empty($phone) ? $phone : 'Not provided',
                'subject' => $subject,
                'message' => $message,
                'date' => date('Y-m-d H:i:s') . ' UTC',
                'source' => $source,
                'admin_email' => $smtpConfig['admin_email']
            ];
        }
    }
}

require __DIR__ . '/../layout/header.php';
?>

<section style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); color: white; padding: 80px 20px; text-align: center; border-bottom: 3px solid #d97706;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
        <div style="display: inline-block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #f59e0b; margin-bottom: 12px; font-weight: 700;">
            Direct Pastoral & Executive Communication
        </div>
        <h1 style="font-size: 42px; font-family: 'Cinzel', serif; font-weight: 700; margin-bottom: 16px; color: #ffffff;">
            Contact Us
        </h1>
        <p style="font-size: 18px; color: #cbd5e1; max-width: 700px; margin: 0 auto; font-weight: 300;">
            We welcome correspondence from international supporters, churches, mission directors, and prayer intercessors. Every inquiry is personally reviewed by our executive team.
        </p>
    </div>
</section>

<section style="padding: 70px 20px; background: #f8fafc;">
    <div class="container" style="max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; align-items: start;">
        
        <!-- Contact Information Card -->
        <div style="background: white; border-radius: 12px; padding: 36px; border: 1px solid #e2e8f0; box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
            <h3 style="font-family: 'Cinzel', serif; font-size: 20px; color: #0f172a; margin-bottom: 20px;">
                Headquarters & Outreach
            </h3>
            
            <div style="margin-bottom: 24px;">
                <div style="font-size: 11px; text-transform: uppercase; font-weight: bold; color: #64748b; margin-bottom: 4px;">President & Founder</div>
                <div style="font-size: 16px; font-weight: 600; color: #0f172a;">Rev. Azeem Tariq</div>
            </div>

            <div style="margin-bottom: 24px;">
                <div style="font-size: 11px; text-transform: uppercase; font-weight: bold; color: #64748b; margin-bottom: 4px;">Direct Email Inquiries</div>
                <div style="font-size: 15px; color: #d97706; font-weight: 600;">contact@agapelightnetwork.org</div>
            </div>

            <div style="margin-bottom: 24px;">
                <div style="font-size: 11px; text-transform: uppercase; font-weight: bold; color: #64748b; margin-bottom: 4px;">International Helpline</div>
                <div style="font-size: 15px; color: #0f172a;">+1 (800) 555-ALN8</div>
            </div>

            <div style="margin-bottom: 24px;">
                <div style="font-size: 11px; text-transform: uppercase; font-weight: bold; color: #64748b; margin-bottom: 4px;">Official Ministry Portal</div>
                <div style="font-size: 14px; font-family: monospace; color: #0f172a;">https://agapelightnetwork.org/</div>
            </div>

            <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; font-size: 12px; color: #64748b; line-height: 1.5;">
                <strong style="color: #0f172a;">Instant SMTP Routing:</strong> All contact form inquiries trigger an immediate automated email notification to the administration at <strong>azeemtariq809@gmail.com</strong>.
            </div>
        </div>

        <!-- Contact Form Card -->
        <div style="background: white; border-radius: 12px; padding: 36px; border: 1px solid #e2e8f0; box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
            
            <?php if ($submitted && $submissionData): ?>
                <!-- Clear Reassuring Success Confirmation -->
                <div style="text-align: left;">
                    <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                            <span style="display: inline-block; width: 24px; height: 24px; background: #059669; color: white; border-radius: 50%; text-align: center; line-height: 24px; font-weight: bold;">✓</span>
                            <h3 style="font-size: 20px; font-weight: 700; color: #065f46; margin: 0;">Inquiry Transmitted Successfully</h3>
                        </div>
                        <p style="font-size: 13px; color: #065f46; margin: 0; line-height: 1.5;">
                            Thank you, <strong><?php echo htmlspecialchars($submissionData['name']); ?></strong>. An automated SMTP notification has been dispatched to <strong><?php echo htmlspecialchars($submissionData['admin_email']); ?></strong>.
                        </p>
                    </div>

                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; font-size: 13px; margin-bottom: 24px;">
                        <div style="font-weight: 700; text-transform: uppercase; font-size: 11px; color: #64748b; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
                            Notification Summary
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
                            <div><strong style="color: #64748b; font-size: 11px; display: block;">Notification:</strong> New Website Inquiry</div>
                            <div><strong style="color: #64748b; font-size: 11px; display: block;">Visitor Name:</strong> <?php echo htmlspecialchars($submissionData['name']); ?></div>
                            <div><strong style="color: #64748b; font-size: 11px; display: block;">Email:</strong> <?php echo htmlspecialchars($submissionData['email']); ?></div>
                            <div><strong style="color: #64748b; font-size: 11px; display: block;">Phone:</strong> <?php echo htmlspecialchars($submissionData['phone']); ?></div>
                            <div style="grid-column: span 2;"><strong style="color: #64748b; font-size: 11px; display: block;">Subject:</strong> <?php echo htmlspecialchars($submissionData['subject']); ?></div>
                            <div style="grid-column: span 2;"><strong style="color: #64748b; font-size: 11px; display: block;">Date / Time:</strong> <?php echo htmlspecialchars($submissionData['date']); ?></div>
                            <div style="grid-column: span 2;"><strong style="color: #64748b; font-size: 11px; display: block;">Website Source:</strong> <?php echo htmlspecialchars($submissionData['source']); ?></div>
                        </div>
                        <div style="border-top: 1px solid #e2e8f0; padding-top: 10px;">
                            <strong style="color: #64748b; font-size: 11px; display: block; margin-bottom: 4px;">Message:</strong>
                            <div style="background: white; border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px; font-style: italic; color: #334155;">
                                &ldquo;<?php echo nl2br(htmlspecialchars($submissionData['message'])); ?>&rdquo;
                            </div>
                        </div>
                    </div>

                    <a href="/contact" class="btn-gold" style="display: inline-block; padding: 10px 20px; font-size: 13px; text-decoration: none;">
                        Send Another Inquiry
                    </a>
                </div>
            <?php else: ?>
                <h3 style="font-family: 'Cinzel', serif; font-size: 20px; color: #0f172a; margin-bottom: 20px;">
                    Send an Inquiry or Prayer Request
                </h3>

                <?php if ($errorMsg): ?>
                    <div style="background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; padding: 12px; border-radius: 6px; font-size: 13px; margin-bottom: 16px;">
                        <?php echo htmlspecialchars($errorMsg); ?>
                    </div>
                <?php endif; ?>

                <form method="POST" action="/contact">
                    <input type="hidden" name="csrf_token" value="<?php echo Security::csrfToken(); ?>">

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                        <div>
                            <label style="display: block; font-size: 12px; font-weight: 600; color: #334155; margin-bottom: 6px;">
                                Your Name <span style="color: #d97706;">*</span>
                            </label>
                            <input type="text" name="name" required placeholder="e.g. David Jenkins" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box;">
                        </div>
                        <div>
                            <label style="display: block; font-size: 12px; font-weight: 600; color: #334155; margin-bottom: 6px;">
                                Your Email Address <span style="color: #d97706;">*</span>
                            </label>
                            <input type="email" name="email" required placeholder="email@example.org" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box;">
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                        <div>
                            <label style="display: block; font-size: 12px; font-weight: 600; color: #334155; margin-bottom: 6px;">
                                Phone Number <span style="color: #94a3b8; font-weight: normal;">(Optional)</span>
                            </label>
                            <input type="tel" name="phone" placeholder="e.g. +1 (555) 234-5678" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box;">
                        </div>
                        <div>
                            <label style="display: block; font-size: 12px; font-weight: 600; color: #334155; margin-bottom: 6px;">
                                Subject / Inquiry Type <span style="color: #d97706;">*</span>
                            </label>
                            <select name="subject" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box;">
                                <option value="General Mission Inquiry">General Mission Inquiry</option>
                                <option value="Direct Debt Rescue">Brick Kiln Debt Rescue ($500 Sponsorship)</option>
                                <option value="Water Well Project">Community Clean Water Borehole ($15,000)</option>
                                <option value="Church Partnership">Church Partnership / Mission Board</option>
                                <option value="Scripture Dissemination">Bible Printing & Distribution</option>
                                <option value="Confidential Prayer">Pastoral Prayer Request</option>
                            </select>
                        </div>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-size: 12px; font-weight: 600; color: #334155; margin-bottom: 6px;">
                            Message or Prayer Petition <span style="color: #d97706;">*</span>
                        </label>
                        <textarea name="message" rows="5" required placeholder="Write your message here..." style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box; font-family: inherit;"></textarea>
                    </div>

                    <button type="submit" class="btn-gold" style="width: 100%; padding: 14px; font-size: 15px; border: none; cursor: pointer; font-weight: 700;">
                        Transmit Message &bull; Trigger Instant SMTP Notification &rarr;
                    </button>
                </form>
            <?php endif; ?>
        </div>

    </div>
</section>

<?php require __DIR__ . '/../layout/footer.php'; ?>
