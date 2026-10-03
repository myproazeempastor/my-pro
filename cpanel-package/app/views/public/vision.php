<?php
/**
 * =====================================================================
 * AGAPE LIGHT NETWORK — INDEPENDENT VISION PAGE
 * Scripture: John 8:12 ("I am the light of the world...")
 * =====================================================================
 */
declare(strict_types=1);
use App\Helpers\Security;

$pageTitle = "Our Vision — Agape Light Network";
$metaDescription = "The international vision of Agape Light Network and Rev. Azeem Tariq: Bringing spiritual light and compassionate humanitarian transformation to unreached communities.";
require __DIR__ . '/../layout/header.php';
?>

<!-- Vision Page Hero -->
<section style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); color: white; padding: 90px 20px; text-align: center; border-bottom: 3px solid #d97706; position: relative;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
        <div style="display: inline-block; background: rgba(217, 119, 6, 0.15); border: 1px solid rgba(217, 119, 6, 0.4); color: #fbbf24; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
            A Future Illuminated By The Light of Life
        </div>
        <h1 style="font-size: 46px; font-family: 'Cinzel', serif; font-weight: 700; line-height: 1.15; margin-bottom: 20px; color: #ffffff;">
            Our Vision for the Nations
        </h1>
        <p style="font-size: 19px; color: #cbd5e1; line-height: 1.7; max-width: 780px; margin: 0 auto 30px; font-weight: 300;">
            Under the visionary leadership of <strong>Rev. Azeem Tariq</strong>, Agape Light Network foresees a day when the darkest corners of poverty and spiritual isolation are dispelled by the living love and eternal light of Jesus Christ.
        </p>
        <div style="display: flex; justify-content: center; gap: 16px;">
            <a href="/donate" class="btn-gold" style="padding: 14px 32px; font-size: 15px; font-weight: bold;">Support the Vision</a>
            <a href="/projects" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-size: 15px; font-weight: 600;">Explore Field Projects &rarr;</a>
        </div>
    </div>
</section>

<!-- Vision Pillars & Statement -->
<section style="padding: 80px 20px; background: #ffffff;">
    <div class="container" style="max-width: 1100px; margin: 0 auto;">
        
        <div style="background: #f8fafc; border-left: 6px solid #d97706; padding: 36px 40px; border-radius: 0 12px 12px 0; margin-bottom: 70px; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
            <div style="font-family: 'Cinzel', serif; font-size: 14px; font-weight: bold; color: #d97706; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px;">
                Presidential Vision Statement &bull; Rev. Azeem Tariq
            </div>
            <p style="font-size: 20px; font-style: italic; color: #1e293b; line-height: 1.7; margin-bottom: 16px;">
                &ldquo;We envision transformed communities across the unreached territories where clean drinking water flows freely, every Christian household possesses a Bible in their mother tongue, fatherless children are educated, and widows live in safety and honor.&rdquo;
            </p>
            <div style="font-size: 13px; color: #64748b; font-weight: 600;">
                Inspired by John 8:12 &mdash; <em>&ldquo;I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.&rdquo;</em>
            </div>
        </div>

        <!-- 3 Core Strategic Horizons -->
        <h2 style="font-family: 'Cinzel', serif; font-size: 32px; text-align: center; color: #0f172a; margin-bottom: 50px;">
            The Three Horizons of Our Vision
        </h2>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 36px; margin-bottom: 80px;">
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 36px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                <div style="width: 50px; height: 50px; background: #fef3c7; color: #b45309; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 20px;">
                    💧
                </div>
                <h3 style="font-family: 'Cinzel', serif; font-size: 20px; color: #0f172a; margin-bottom: 12px;">Horizon 1: Sustainable Wells</h3>
                <p style="font-size: 14px; color: #475569; line-height: 1.7;">
                    Drilling certified, deep aquifer water wells in 250 remote villages where waterborne diseases currently kill infants. Every water well stands as a perpetual monument of Christ's living water.
                </p>
            </div>

            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 36px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                <div style="width: 50px; height: 50px; background: #e0f2fe; color: #0369a1; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 20px;">
                    📖
                </div>
                <h3 style="font-family: 'Cinzel', serif; font-size: 20px; color: #0f172a; margin-bottom: 12px;">Horizon 2: Gospel Literacy</h3>
                <p style="font-size: 14px; color: #475569; line-height: 1.7;">
                    Placing 50,000 native-language Bibles into believers' hands and establishing free evening Christian literacy schools for illiterate laborers and children in brick-kiln colonies.
                </p>
            </div>

            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 36px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                <div style="width: 50px; height: 50px; background: #dcfce7; color: #15803d; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 20px;">
                    🛡️
                </div>
                <h3 style="font-family: 'Cinzel', serif; font-size: 20px; color: #0f172a; margin-bottom: 12px;">Horizon 3: Widow & Orphan Dignity</h3>
                <p style="font-size: 14px; color: #475569; line-height: 1.7;">
                    Ensuring zero destitute Christian widows in our operational territories face starvation. Providing monthly audited food rations, warm winter clothing, and vocational sewing machines.
                </p>
            </div>
        </div>

        <!-- Visionary Statistics Targets -->
        <div style="background: #0f172a; color: white; border-radius: 16px; padding: 50px 40px; text-align: center;">
            <h3 style="font-family: 'Cinzel', serif; font-size: 26px; color: #f59e0b; margin-bottom: 14px;">
                Our 5-Year Measurable Vision Targets
            </h3>
            <p style="color: #94a3b8; font-size: 15px; max-width: 650px; margin: 0 auto 40px;">
                We set clear, audited, and realistic targets that international mission boards and donors can track directly.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px;">
                <div>
                    <div style="font-family: 'Cinzel', serif; font-size: 40px; font-weight: 700; color: #ffffff;">250</div>
                    <div style="font-size: 13px; color: #f59e0b; font-weight: 600; text-transform: uppercase;">Deep Water Wells</div>
                </div>
                <div>
                    <div style="font-family: 'Cinzel', serif; font-size: 40px; font-weight: 700; color: #ffffff;">50,000</div>
                    <div style="font-size: 13px; color: #f59e0b; font-weight: 600; text-transform: uppercase;">Bibles Distributed</div>
                </div>
                <div>
                    <div style="font-family: 'Cinzel', serif; font-size: 40px; font-weight: 700; color: #ffffff;">1,000</div>
                    <div style="font-size: 13px; color: #f59e0b; font-weight: 600; text-transform: uppercase;">Widows Sustained</div>
                </div>
                <div>
                    <div style="font-family: 'Cinzel', serif; font-size: 40px; font-weight: 700; color: #ffffff;">100%</div>
                    <div style="font-size: 13px; color: #f59e0b; font-weight: 600; text-transform: uppercase;">Direct Field Ringfencing</div>
                </div>
            </div>
            <div style="margin-top: 40px;">
                <a href="/donate" class="btn-gold" style="font-size: 15px; padding: 14px 36px;">Become a Vision Partner &rarr;</a>
            </div>
        </div>

    </div>
</section>

<?php require __DIR__ . '/../layout/footer.php'; ?>
