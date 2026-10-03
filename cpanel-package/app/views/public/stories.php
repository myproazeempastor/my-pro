<?php
/**
 * =====================================================================
 * AGAPE LIGHT NETWORK — INDEPENDENT STORIES & UPDATES PAGE
 * =====================================================================
 */
declare(strict_types=1);
use App\Helpers\Security;

$pageTitle = "Field Stories & Updates — Agape Light Network";
$metaDescription = "Real testimonies and dispatches from Agape Light Network field missions across remote villages.";
require __DIR__ . '/../layout/header.php';
?>

<section style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); color: white; padding: 85px 20px; text-align: center; border-bottom: 3px solid #d97706;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
        <div style="display: inline-block; background: rgba(217, 119, 6, 0.15); border: 1px solid rgba(217, 119, 6, 0.4); color: #fbbf24; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
            Testimonies of Transformation
        </div>
        <h1 style="font-size: 46px; font-family: 'Cinzel', serif; font-weight: 700; line-height: 1.15; margin-bottom: 20px; color: #ffffff;">
            Stories From the Field
        </h1>
        <p style="font-size: 19px; color: #cbd5e1; line-height: 1.7; max-width: 780px; margin: 0 auto; font-weight: 300;">
            Witness how your partnership and prayers are bringing life-giving water, Holy Scripture, and loving sustenance to vulnerable communities.
        </p>
    </div>
</section>

<section style="padding: 70px 20px; background: #f8fafc;">
    <div class="container" style="max-width: 1000px; margin: 0 auto;">
        
        <!-- Story 1 -->
        <article style="background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; margin-bottom: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); display: grid; grid-template-columns: 320px 1fr;">
            <div style="background: #0f172a;">
                <img src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80" alt="Well in village" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="padding: 30px;">
                <div style="font-size: 11px; font-weight: bold; color: #d97706; text-transform: uppercase; margin-bottom: 8px;">Clean Water Mission &bull; Punjab Outreaches</div>
                <h2 style="font-family: 'Cinzel', serif; font-size: 22px; color: #0f172a; margin-bottom: 12px;">Pure Water Replaces Pond Sickness</h2>
                <p style="font-size: 14px; color: #475569; line-height: 1.7; margin-bottom: 16px;">
                    For twenty years, the 400 residents of Chak 42 had no choice but to share muddy surface pond water with livestock. Waterborne illnesses claimed the lives of infants every summer. Thanks to a dedicated well sponsored through Agape Light Network, a 280-foot borehole now pumps pure drinking water daily.
                </p>
                <div style="font-size: 13px; font-style: italic; color: #64748b;">&ldquo;We no longer walk three miles every dawn. God has heard our cry.&rdquo; &mdash; Village Elder</div>
            </div>
        </article>

        <!-- Story 2 -->
        <article style="background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; margin-bottom: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); display: grid; grid-template-columns: 320px 1fr;">
            <div style="background: #0f172a;">
                <img src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=600&q=80" alt="Bible reading" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="padding: 30px;">
                <div style="font-size: 11px; font-weight: bold; color: #d97706; text-transform: uppercase; margin-bottom: 8px;">Scripture Distribution &bull; Frontier Villages</div>
                <h2 style="font-family: 'Cinzel', serif; font-size: 22px; color: #0f172a; margin-bottom: 12px;">Holding God’s Word for the First Time</h2>
                <p style="font-size: 14px; color: #475569; line-height: 1.7; margin-bottom: 16px;">
                    Brother Emmanuel, a brick kiln worker who became a follower of Christ five years ago, had never owned a Bible due to extreme poverty. When our literacy team placed an Urdu study Bible in his hands after his completion of our reading course, tears flowed freely.
                </p>
                <div style="font-size: 13px; font-style: italic; color: #64748b;">&ldquo;Now I can read John 8:12 to my children every night by lamplight.&rdquo; &mdash; Emmanuel</div>
            </div>
        </article>

        <div style="text-align: center; margin-top: 40px;">
            <a href="/donate" class="btn-gold" style="padding: 14px 32px; font-size: 15px;">Partner in the Next Story &rarr;</a>
        </div>

    </div>
</section>

<?php require __DIR__ . '/../layout/footer.php'; ?>
