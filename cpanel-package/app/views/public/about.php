<?php
/**
 * =====================================================================
 * AGAPE LIGHT NETWORK — INDEPENDENT ABOUT US PAGE
 * =====================================================================
 */
declare(strict_types=1);
use App\Helpers\Security;

$pageTitle = "About Us — Agape Light Network";
$metaDescription = "Learn about Agape Light Network, our founder & president Rev. Azeem Tariq, and our evangelical humanitarian calling.";
require __DIR__ . '/../layout/header.php';
?>

<section style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); color: white; padding: 85px 20px; text-align: center; border-bottom: 3px solid #d97706;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
        <div style="display: inline-block; background: rgba(217, 119, 6, 0.15); border: 1px solid rgba(217, 119, 6, 0.4); color: #fbbf24; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
            Spreading Light, Living Love
        </div>
        <h1 style="font-size: 46px; font-family: 'Cinzel', serif; font-weight: 700; line-height: 1.15; margin-bottom: 20px; color: #ffffff;">
            About Agape Light Network
        </h1>
        <p style="font-size: 19px; color: #cbd5e1; line-height: 1.7; max-width: 780px; margin: 0 auto 30px; font-weight: 300;">
            Founded and led by <strong>Rev. Azeem Tariq</strong>, Agape Light Network is an international Christian organization operating at the intersection of spiritual revival and urgent humanitarian relief.
        </p>
    </div>
</section>

<section style="padding: 80px 20px; background: #ffffff;">
    <div class="container" style="max-width: 1000px; margin: 0 auto;">
        
        <div style="display: grid; grid-template-columns: 320px 1fr; gap: 50px; align-items: start; margin-bottom: 70px;">
            <div style="background: #0f172a; border-radius: 12px; padding: 30px; color: white; border: 1px solid #334155; text-align: center;">
                <div style="width: 100px; height: 100px; border-radius: 50%; background: #d97706; color: white; font-family: 'Cinzel', serif; font-size: 36px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-weight: bold;">
                    AT
                </div>
                <h3 style="font-family: 'Cinzel', serif; font-size: 20px; margin-bottom: 4px;">Rev. Azeem Tariq</h3>
                <div style="color: #fbbf24; font-size: 12px; text-transform: uppercase; font-weight: 600; margin-bottom: 16px;">Founder & President</div>
                <p style="font-size: 13px; color: #cbd5e1; line-height: 1.6; text-align: left;">
                    An ordained Christian minister with decades of grassroots outreach experience in persecuted and impoverished territories, dedicated to bringing physical relief and spiritual salvation to forgotten communities.
                </p>
            </div>

            <div>
                <h2 style="font-family: 'Cinzel', serif; font-size: 30px; color: #0f172a; margin-bottom: 20px;">
                    Our Origins & Calling
                </h2>
                <p style="font-size: 16px; color: #475569; line-height: 1.8; margin-bottom: 20px;">
                    Agape Light Network was established out of a deep burden for vulnerable families in rural regions who are systematically overlooked. When Rev. Azeem Tariq visited brick kiln settlements and arid villages, he witnessed families drinking poisoned groundwater and believers weeping because they had no copy of the Holy Scriptures.
                </p>
                <p style="font-size: 16px; color: #475569; line-height: 1.8; margin-bottom: 24px;">
                    The Lord laid <strong>John 8:12</strong> upon our hearts: <em>&ldquo;I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.&rdquo;</em> We resolved that our ministry would not be confined to words alone, but would be expressed in real, tangible deeds of love.
                </p>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px;">
                    <div style="border-left: 3px solid #d97706; padding-left: 16px;">
                        <h4 style="font-family: 'Cinzel', serif; font-size: 16px; color: #0f172a; margin-bottom: 6px;">Uncompromising Truth</h4>
                        <p style="font-size: 13px; color: #64748b; line-height: 1.6;">Rooted strictly in the Holy Bible, preaching salvation solely through Jesus Christ.</p>
                    </div>
                    <div style="border-left: 3px solid #d97706; padding-left: 16px;">
                        <h4 style="font-family: 'Cinzel', serif; font-size: 16px; color: #0f172a; margin-bottom: 6px;">Strict Integrity</h4>
                        <p style="font-size: 13px; color: #64748b; line-height: 1.6;">Transparent tracking of every designated dollar with zero embellishment of metrics.</p>
                    </div>
                </div>
            </div>
        </div>

        <div style="text-align: center; padding-top: 40px; border-top: 1px solid #e2e8f0;">
            <a href="/vision" style="margin-right: 20px; color: #0f172a; font-weight: bold; font-size: 15px; text-decoration: underline;">Read Our Vision &rarr;</a>
            <a href="/mission" style="margin-right: 20px; color: #0f172a; font-weight: bold; font-size: 15px; text-decoration: underline;">Read Our Mission &rarr;</a>
            <a href="/donate" class="btn-gold" style="padding: 12px 28px; font-size: 14px;">Support Our Work</a>
        </div>

    </div>
</section>

<?php require __DIR__ . '/../layout/footer.php'; ?>
