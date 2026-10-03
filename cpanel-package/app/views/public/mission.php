<?php
/**
 * =====================================================================
 * AGAPE LIGHT NETWORK — INDEPENDENT MISSION PAGE
 * Scripture: John 8:12 & James 1:27
 * =====================================================================
 */
declare(strict_types=1);
use App\Helpers\Security;

$pageTitle = "Our Mission — Agape Light Network";
$metaDescription = "The divine mission of Agape Light Network: Spreading spiritual light and living Christ's sacrificial love through active field ministry.";
require __DIR__ . '/../layout/header.php';
?>

<section style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); color: white; padding: 85px 20px; text-align: center; border-bottom: 3px solid #d97706;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
        <div style="display: inline-block; background: rgba(217, 119, 6, 0.15); border: 1px solid rgba(217, 119, 6, 0.4); color: #fbbf24; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
            Faith Expressed Through Sacrificial Action
        </div>
        <h1 style="font-size: 46px; font-family: 'Cinzel', serif; font-weight: 700; line-height: 1.15; margin-bottom: 20px; color: #ffffff;">
            Our Divine Mission
        </h1>
        <p style="font-size: 19px; color: #cbd5e1; line-height: 1.7; max-width: 780px; margin: 0 auto 30px; font-weight: 300;">
            Guided by <strong>John 8:12</strong> and the Great Commission, Agape Light Network exists to proclaim the Gospel of Jesus Christ and actively demonstrate His compassion to the most impoverished and marginalized peoples on earth.
        </p>
        <a href="/projects" class="btn-gold" style="padding: 14px 32px; font-size: 15px; font-weight: bold;">View Field Projects</a>
    </div>
</section>

<section style="padding: 80px 20px; background: #ffffff;">
    <div class="container" style="max-width: 1000px; margin: 0 auto;">
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 60px;">
            <div>
                <h2 style="font-family: 'Cinzel', serif; font-size: 28px; color: #0f172a; margin-bottom: 18px;">
                    Spreading Light: The Spiritual Mandate
                </h2>
                <p style="font-size: 15px; color: #475569; line-height: 1.8; margin-bottom: 16px;">
                    We believe the deepest human tragedy is spiritual darkness. Under the pastoral direction of <strong>Rev. Azeem Tariq</strong>, our teams bring the pure Light of Christ to persecuted and forgotten villages through:
                </p>
                <ul style="padding-left: 20px; font-size: 14px; color: #334155; line-height: 2;">
                    <li>Free Scripture distribution in Urdu, Punjabi, and local dialects.</li>
                    <li>Pastoral training for frontline rural church planters.</li>
                    <li>Scriptural literacy classes for illiterate laborers.</li>
                    <li>Public prayer and gospel fellowship in impoverished enclaves.</li>
                </ul>
            </div>

            <div>
                <h2 style="font-family: 'Cinzel', serif; font-size: 28px; color: #0f172a; margin-bottom: 18px;">
                    Living Love: The Humanitarian Mandate
                </h2>
                <p style="font-size: 15px; color: #475569; line-height: 1.8; margin-bottom: 16px;">
                    True Christian love is never passive. As the Apostle James wrote, faith without works is dead (James 2:17). We manifest Agape love through:
                </p>
                <ul style="padding-left: 20px; font-size: 14px; color: #334155; line-height: 2;">
                    <li>Drilling clean water boreholes in arid, underserved settlements.</li>
                    <li>Conducting mobile eye and medical relief camps.</li>
                    <li>Providing monthly flour, rice, and oil rations to abandoned widows.</li>
                    <li>Distributing warm blankets and emergency shelter during harsh winters.</li>
                </ul>
            </div>
        </div>

        <!-- Accountability and Direct Allocation Box -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 40px; text-align: center;">
            <h3 style="font-family: 'Cinzel', serif; font-size: 22px; color: #0f172a; margin-bottom: 12px;">
                How We Execute Our Mission
            </h3>
            <p style="font-size: 15px; color: #64748b; max-width: 700px; margin: 0 auto 24px; line-height: 1.7;">
                We operate through verified indigenous leaders on the ground, eliminating unnecessary administrative bloat and ensuring your sacrificial donations reach the intended beneficiaries directly.
            </p>
            <a href="/transparency" style="color: #d97706; font-weight: bold; font-size: 14px; text-decoration: underline;">Read our Financial Transparency & Audit Policies &rarr;</a>
        </div>

    </div>
</section>

<?php require __DIR__ . '/../layout/footer.php'; ?>
