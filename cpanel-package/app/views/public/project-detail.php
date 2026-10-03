<?php
/**
 * =====================================================================
 * AGAPE LIGHT NETWORK — INDEPENDENT DEDICATED PROJECT DETAIL PAGE
 * =====================================================================
 */
declare(strict_types=1);
use App\Helpers\Security;
use App\Helpers\Currency;

$pageTitle = Security::e($project['title']) . " — Agape Light Network";
$metaDescription = Security::e($project['summary']);
require __DIR__ . '/../layout/header.php';

$percent = $project['goal_amount'] > 0 ? min(100, round(($project['verified_raised'] / $project['goal_amount']) * 100)) : 0;
?>

<div style="background: #0f172a; color: white; padding: 60px 20px; border-bottom: 3px solid #d97706;">
    <div class="container" style="max-width: 1000px; margin: 0 auto;">
        <div style="display: flex; gap: 8px; margin-bottom: 12px; font-size: 13px;">
            <a href="/projects" style="color: #fbbf24; text-decoration: none;">&larr; Back to All Projects</a>
        </div>
        <div style="display: inline-block; background: #d97706; color: white; font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; margin-bottom: 12px;">
            <?php echo Security::e($project['category']); ?> &bull; <?php echo Security::e($project['location']); ?>
        </div>
        <h1 style="font-family: 'Cinzel', serif; font-size: 38px; font-weight: 700; color: white; margin-bottom: 14px;">
            <?php echo Security::e($project['title']); ?>
        </h1>
        <p style="font-size: 17px; color: #cbd5e1; max-width: 800px; line-height: 1.6;">
            <?php echo Security::e($project['summary']); ?>
        </p>
    </div>
</div>

<div style="padding: 60px 20px; background: #f8fafc;">
    <div class="container" style="max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr; gap: 40px; align-items: start;">
        
        <!-- Left: Full Story and Media -->
        <div style="background: white; border-radius: 12px; padding: 36px; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
            <div style="border-radius: 8px; overflow: hidden; margin-bottom: 28px; max-height: 400px;">
                <img src="<?php echo Security::e($project['image_url']); ?>" alt="<?php echo Security::e($project['title']); ?>" style="width: 100%; height: 100%; object-fit: cover;">
            </div>

            <h2 style="font-family: 'Cinzel', serif; font-size: 24px; color: #0f172a; margin-bottom: 16px;">
                Field Mission Narrative
            </h2>
            <div style="font-size: 15px; color: #334155; line-height: 1.8; white-space: pre-line; margin-bottom: 30px;">
                <?php echo Security::e($project['description']); ?>
            </div>

            <div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 18px 20px; border-radius: 0 8px 8px 0; font-size: 13px; color: #92400e;">
                <strong>Agape Light Network Direct Giving Pledge:</strong> 100% of donations made to this specific initiative are earmarked exclusively for operations, materials, and distribution in <?php echo Security::e($project['location']); ?>.
            </div>
        </div>

        <!-- Right: Progress Card & Donation Trigger -->
        <div style="background: white; border-radius: 12px; padding: 30px; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.03); position: sticky; top: 100px;">
            <div style="font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; margin-bottom: 8px;">Fundraising Status</div>
            <div style="font-size: 30px; font-weight: bold; color: #0f172a; margin-bottom: 4px;">
                <?php echo Currency::format($project['verified_raised'], $project['currency']); ?>
            </div>
            <div style="font-size: 13px; color: #64748b; margin-bottom: 20px;">
                raised of <?php echo Currency::format($project['goal_amount'], $project['currency']); ?> goal (<?php echo $percent; ?>%)
            </div>

            <div style="background: #e2e8f0; height: 10px; border-radius: 5px; overflow: hidden; margin-bottom: 20px;">
                <div style="background: #d97706; height: 100%; width: <?php echo $percent; ?>%;"></div>
            </div>

            <div style="font-size: 13px; color: #475569; margin-bottom: 24px; line-height: 1.6;">
                ✓ Direct field execution<br>
                ✓ Verifiable receipt issued<br>
                ✓ Overseen by Rev. Azeem Tariq
            </div>

            <a href="/donate?project_id=<?php echo $project['id']; ?>" class="btn-gold" style="display: block; text-align: center; padding: 14px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 12px rgba(217,119,6,0.3);">
                Support This Project Now &rarr;
            </a>
        </div>

    </div>
</div>

<?php require __DIR__ . '/../layout/footer.php'; ?>
