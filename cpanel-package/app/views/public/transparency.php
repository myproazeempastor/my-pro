<?php
/**
 * =====================================================================
 * AGAPE LIGHT NETWORK — INDEPENDENT TRANSPARENCY PAGE
 * =====================================================================
 */
declare(strict_types=1);
use App\Helpers\Security;

$pageTitle = "Financial Transparency & Governance — Agape Light Network";
$metaDescription = "Read Agape Light Network's financial transparency charter, designated giving policies, and governance commitments.";
require __DIR__ . '/../layout/header.php';
?>

<section style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); color: white; padding: 85px 20px; text-align: center; border-bottom: 3px solid #d97706;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
        <div style="display: inline-block; background: rgba(217, 119, 6, 0.15); border: 1px solid rgba(217, 119, 6, 0.4); color: #fbbf24; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
            Faithful Stewardship Before God & Partners
        </div>
        <h1 style="font-size: 46px; font-family: 'Cinzel', serif; font-weight: 700; line-height: 1.15; margin-bottom: 20px; color: #ffffff;">
            Financial Transparency
        </h1>
        <p style="font-size: 19px; color: #cbd5e1; line-height: 1.7; max-width: 780px; margin: 0 auto 30px; font-weight: 300;">
            As an international Christian ministry led by <strong>Rev. Azeem Tariq</strong>, we treat every donor contribution as a sacred trust placed before the Lord Jesus Christ.
        </p>
    </div>
</section>

<section style="padding: 80px 20px; background: #ffffff;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
        
        <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 40px; margin-bottom: 40px;">
            <h2 style="font-family: 'Cinzel', serif; font-size: 26px; color: #0f172a; margin-bottom: 14px;">
                1. 100% Designated Giving Policy
            </h2>
            <p style="font-size: 15px; color: #475569; line-height: 1.8;">
                When a donor specifically designates their gift for an initiative—such as a deep water well, a literacy school, or widow emergency food—100% of those funds are restricted and allocated solely to that designated operation. We do not redirect designated funds to unrelated administrative salaries.
            </p>
        </div>

        <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 40px; margin-bottom: 40px;">
            <h2 style="font-family: 'Cinzel', serif; font-size: 26px; color: #0f172a; margin-bottom: 14px;">
                2. Verifiable Serial Numbered Receipts
            </h2>
            <p style="font-size: 15px; color: #475569; line-height: 1.8;">
                Every transaction processed via our gateway or confirmed through international bank wire receives a unique alphanumeric serial reference (e.g., <code>ALN-2026-XXXX</code>). This serial number is stored permanently in our database and printed on every receipt for cross-referencing.
            </p>
        </div>

        <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 40px; margin-bottom: 40px;">
            <h2 style="font-family: 'Cinzel', serif; font-size: 26px; color: #0f172a; margin-bottom: 14px;">
                3. Zero Embellishment Commitment
            </h2>
            <p style="font-size: 15px; color: #475569; line-height: 1.8;">
                In the nonprofit sector, inflated beneficiary statistics and artificial fundraising urgency are far too common. Agape Light Network adheres to strict Biblical truthfulness: we report only verified borehole completions, actual Bible copies placed, and authenticated ledger numbers.
            </p>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px; text-align: center;">
            <h3 style="font-family: 'Cinzel', serif; font-size: 20px; color: #0f172a; margin-bottom: 10px;">
                Have Questions About Our Financial Policies?
            </h3>
            <p style="font-size: 14px; color: #64748b; margin-bottom: 20px;">
                Our leadership team is available to provide audited ledger disclosures and bank wire references to partner churches and foundations.
            </p>
            <a href="/contact" class="btn-gold" style="padding: 12px 26px; font-size: 14px;">Contact Ministry Leadership &rarr;</a>
        </div>

    </div>
</section>

<?php require __DIR__ . '/../layout/footer.php'; ?>
