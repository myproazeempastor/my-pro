<?php
/**
 * =====================================================================
 * AGAPE LIGHT NETWORK — INDEPENDENT POLICIES PAGE (Privacy, Donation, Terms)
 * =====================================================================
 */
declare(strict_types=1);
use App\Helpers\Security;

$title = $policyTitle ?? "Legal & Donor Policies";
$pageTitle = "{$title} — Agape Light Network";
require __DIR__ . '/../layout/header.php';
?>

<section style="background: #0f172a; color: white; padding: 60px 20px; border-bottom: 3px solid #d97706;">
    <div class="container" style="max-width: 850px; margin: 0 auto; text-align: center;">
        <h1 style="font-family: 'Cinzel', serif; font-size: 36px; font-weight: 700; margin-bottom: 12px; color: #ffffff;">
            <?php echo Security::e($title); ?>
        </h1>
        <p style="font-size: 14px; color: #94a3b8;">
            Agape Light Network &bull; Rev. Azeem Tariq &bull; Last Updated: March 2026
        </p>
    </div>
</section>

<section style="padding: 60px 20px; background: #ffffff;">
    <div class="container" style="max-width: 850px; margin: 0 auto; font-size: 15px; color: #334155; line-height: 1.8;">
        
        <?php if (($policySlug ?? '') === 'privacy-policy'): ?>
            <h2 style="font-family: 'Cinzel', serif; font-size: 22px; color: #0f172a; margin-top: 24px; margin-bottom: 12px;">1. International Donor Privacy Pledge</h2>
            <p>Agape Light Network respects the privacy of all donors, prayer partners, and website visitors. We collect only necessary personal data (such as donor names, email addresses, and postal addresses for receipts) required to process contributions and issue verifiable documentation.</p>
            
            <h2 style="font-family: 'Cinzel', serif; font-size: 22px; color: #0f172a; margin-top: 24px; margin-bottom: 12px;">2. Non-Disclosure & Security</h2>
            <p>We do not sell, rent, or trade donor email lists or personal information with any third-party marketing companies. Financial payment details (such as credit card numbers and banking PINs) are processed directly through certified PCI-compliant gateways and are never stored on our servers.</p>
            
            <h2 style="font-family: 'Cinzel', serif; font-size: 22px; color: #0f172a; margin-top: 24px; margin-bottom: 12px;">3. Anonymous Giving Option</h2>
            <p>Donors may select the "Keep my donation anonymous" option at checkout. When selected, the donor's name is completely masked from public lists and project donor honors.</p>

        <?php elseif (($policySlug ?? '') === 'donation-policy'): ?>
            <h2 style="font-family: 'Cinzel', serif; font-size: 22px; color: #0f172a; margin-top: 24px; margin-bottom: 12px;">1. Designated Funds & Field Ringfencing</h2>
            <p>Contributions designated for specific ministry projects (e.g. Clean Water Wells, Bible Distribution, Widow Sustenance) are ringfenced and applied exclusively to that designated operation.</p>

            <h2 style="font-family: 'Cinzel', serif; font-size: 22px; color: #0f172a; margin-top: 24px; margin-bottom: 12px;">2. General Fund Giving</h2>
            <p>Undesignated contributions are deposited into our General Mission Fund, allowing Rev. Azeem Tariq and the field directors to allocate resources where the spiritual and physical need is most urgent.</p>

            <h2 style="font-family: 'Cinzel', serif; font-size: 22px; color: #0f172a; margin-top: 24px; margin-bottom: 12px;">3. Official Serial Receipts</h2>
            <p>Every confirmed contribution generates a unique reference code (format: ALN-2026-XXXX). Official printable receipts are available immediately upon confirmation and sent via email.</p>

        <?php else: ?>
            <h2 style="font-family: 'Cinzel', serif; font-size: 22px; color: #0f172a; margin-top: 24px; margin-bottom: 12px;">Terms of Use</h2>
            <p>Welcome to agapelightnetwork.org. By accessing this website, you agree to comply with and be bound by the applicable terms governing Christian ministry information, donation processing, and intellectual property.</p>
            <p>All scripture citations are taken from the Holy Bible (KJV/ESV/NIV as cited) in devotion to our calling in John 8:12.</p>
        <?php endif; ?>

        <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center;">
            <a href="/contact" style="color: #d97706; font-weight: bold; text-decoration: underline;">Have questions about our policies? Contact us &rarr;</a>
        </div>

    </div>
</section>

<?php require __DIR__ . '/../layout/footer.php'; ?>
