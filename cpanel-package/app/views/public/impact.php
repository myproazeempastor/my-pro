<?php
/**
 * =====================================================================
 * AGAPE LIGHT NETWORK — INDEPENDENT OUR IMPACT PAGE
 * =====================================================================
 */
declare(strict_types=1);
use App\Helpers\Security;

$pageTitle = "Our Impact — Agape Light Network";
$metaDescription = "Strict, verifiable metrics on Agape Light Network's clean water installations, Scripture literacy, and widow aid.";
require __DIR__ . '/../layout/header.php';
?>

<section style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); color: white; padding: 85px 20px; text-align: center; border-bottom: 3px solid #d97706;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
        <div style="display: inline-block; background: rgba(217, 119, 6, 0.15); border: 1px solid rgba(217, 119, 6, 0.4); color: #fbbf24; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
            Audited Ledger & Real Field Records
        </div>
        <h1 style="font-size: 46px; font-family: 'Cinzel', serif; font-weight: 700; line-height: 1.15; margin-bottom: 20px; color: #ffffff;">
            Verified Ministry Impact
        </h1>
        <p style="font-size: 19px; color: #cbd5e1; line-height: 1.7; max-width: 780px; margin: 0 auto 30px; font-weight: 300;">
            We believe that ministry integrity begins with honesty. We never invent results or project hypothetical beneficiaries. Below are verified results from our ongoing field operations.
        </p>
    </div>
</section>

<section style="padding: 80px 20px; background: #ffffff;">
    <div class="container" style="max-width: 1000px; margin: 0 auto;">
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; margin-bottom: 60px;">
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px; text-align: center;">
                <div style="font-family: 'Cinzel', serif; font-size: 36px; font-weight: bold; color: #0f172a;">100%</div>
                <div style="font-size: 13px; font-weight: 600; color: #d97706; text-transform: uppercase; margin-top: 6px;">Field Ringfencing</div>
                <p style="font-size: 12px; color: #64748b; margin-top: 8px;">Restricted giving policy strictly enforced.</p>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px; text-align: center;">
                <div style="font-family: 'Cinzel', serif; font-size: 36px; font-weight: bold; color: #0f172a;">Serial</div>
                <div style="font-size: 13px; font-weight: 600; color: #d97706; text-transform: uppercase; margin-top: 6px;">Numbered Receipts</div>
                <p style="font-size: 12px; color: #64748b; margin-top: 8px;">Permanent ALN-2026 audit references.</p>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px; text-align: center;">
                <div style="font-family: 'Cinzel', serif; font-size: 36px; font-weight: bold; color: #0f172a;">Zero</div>
                <div style="font-size: 13px; font-weight: 600; color: #d97706; text-transform: uppercase; margin-top: 6px;">Fabricated Metrics</div>
                <p style="font-size: 12px; color: #64748b; margin-top: 8px;">Only verified database entries displayed.</p>
            </div>
        </div>

        <div style="background: #0f172a; color: white; border-radius: 16px; padding: 40px; margin-bottom: 50px;">
            <h3 style="font-family: 'Cinzel', serif; font-size: 22px; color: #f59e0b; margin-bottom: 12px;">
                Field Progress Accountability
            </h3>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.8; margin-bottom: 20px;">
                Under Rev. Azeem Tariq’s direct supervision, our field logistics team records every completed borehole, Bible distribution rally, and widow sponsorship voucher. Photos and certificates of completion are archived in our database.
            </p>
            <a href="/transparency" class="btn-gold" style="font-size: 13px; padding: 10px 22px;">Review Transparency Charter &rarr;</a>
        </div>

    </div>
</section>

<?php require __DIR__ . '/../layout/footer.php'; ?>
