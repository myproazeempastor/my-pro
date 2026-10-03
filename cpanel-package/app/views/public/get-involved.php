<?php
/**
 * =====================================================================
 * AGAPE LIGHT NETWORK — INDEPENDENT GET INVOLVED PAGE
 * =====================================================================
 */
declare(strict_types=1);
use App\Helpers\Security;

$pageTitle = "Get Involved — Agape Light Network";
$metaDescription = "Discover how churches, Christian fellowships, and international supporters can partner with Agape Light Network.";
require __DIR__ . '/../layout/header.php';
?>

<section style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); color: white; padding: 85px 20px; text-align: center; border-bottom: 3px solid #d97706;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
        <div style="display: inline-block; background: rgba(217, 119, 6, 0.15); border: 1px solid rgba(217, 119, 6, 0.4); color: #fbbf24; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
            Co-Laborers in God's Harvest
        </div>
        <h1 style="font-size: 46px; font-family: 'Cinzel', serif; font-weight: 700; line-height: 1.15; margin-bottom: 20px; color: #ffffff;">
            Get Involved With Our Mission
        </h1>
        <p style="font-size: 19px; color: #cbd5e1; line-height: 1.7; max-width: 780px; margin: 0 auto; font-weight: 300;">
            Whether through prayer, church sponsorship of a deep water borehole, or foundation grants, there are meaningful ways for your fellowship to partner with Agape Light Network.
        </p>
    </div>
</section>

<section style="padding: 80px 20px; background: #ffffff;">
    <div class="container" style="max-width: 1000px; margin: 0 auto;">
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 36px; margin-bottom: 60px;">
            
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 36px;">
                <div style="font-size: 32px; margin-bottom: 16px;">🙏</div>
                <h3 style="font-family: 'Cinzel', serif; font-size: 20px; color: #0f172a; margin-bottom: 12px;">1. Intercessory Prayer Shield</h3>
                <p style="font-size: 14px; color: #475569; line-height: 1.7; margin-bottom: 16px;">
                    Our frontline evangelists and logistics teams work in challenging, restricted environments. Join our monthly international prayer chain to receive confidential prayer points.
                </p>
                <a href="/contact?subject=Prayer+Shield" style="color: #d97706; font-weight: bold; font-size: 13px; text-decoration: underline;">Join Prayer Network &rarr;</a>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 36px;">
                <div style="font-size: 32px; margin-bottom: 16px;">⛪</div>
                <h3 style="font-family: 'Cinzel', serif; font-size: 20px; color: #0f172a; margin-bottom: 12px;">2. Church Mission Partnerships</h3>
                <p style="font-size: 14px; color: #475569; line-height: 1.7; margin-bottom: 16px;">
                    Connect your congregation directly to a rural village. Sponsoring a complete deep water well or 500 Bibles includes full photographic reporting and dedication plaques.
                </p>
                <a href="/contact?subject=Church+Partnership" style="color: #d97706; font-weight: bold; font-size: 13px; text-decoration: underline;">Inquire for Your Church &rarr;</a>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 36px;">
                <div style="font-size: 32px; margin-bottom: 16px;">🤝</div>
                <h3 style="font-family: 'Cinzel', serif; font-size: 20px; color: #0f172a; margin-bottom: 12px;">3. Monthly Sustaining Partners</h3>
                <p style="font-size: 14px; color: #475569; line-height: 1.7; margin-bottom: 16px;">
                    Provide recurring sustenance for registered widows and fatherless children. A gift of $50/month ensures a Christian widow receives complete food security.
                </p>
                <a href="/donate" class="btn-gold" style="display: inline-block; padding: 8px 18px; font-size: 13px; margin-top: 6px;">Give Monthly</a>
            </div>

        </div>

        <div style="background: #0f172a; color: white; border-radius: 12px; padding: 40px; text-align: center;">
            <h3 style="font-family: 'Cinzel', serif; font-size: 24px; color: #f59e0b; margin-bottom: 12px;">
                Direct Pastoral Consultation
            </h3>
            <p style="font-size: 15px; color: #cbd5e1; max-width: 650px; margin: 0 auto 24px;">
                Mission pastors and foundation trustees are welcome to schedule a video call with <strong>Rev. Azeem Tariq</strong> to discuss strategic initiatives and project covenants.
            </p>
            <a href="/contact" class="btn-gold" style="padding: 12px 28px; font-size: 14px;">Schedule Pastoral Discussion &rarr;</a>
        </div>

    </div>
</section>

<?php require __DIR__ . '/../layout/footer.php'; ?>
