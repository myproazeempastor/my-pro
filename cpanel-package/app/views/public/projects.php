<?php
/**
 * =====================================================================
 * AGAPE LIGHT NETWORK — INDEPENDENT PROJECTS LISTING PAGE
 * =====================================================================
 */
declare(strict_types=1);
use App\Helpers\Security;
use App\Helpers\Currency;

$pageTitle = "Ministry Projects — Agape Light Network";
$metaDescription = "Explore our active humanitarian and Christian ministry initiatives: clean water wells, Bible distribution, medical relief, and widow care.";
require __DIR__ . '/../layout/header.php';
?>

<section style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); color: white; padding: 80px 20px; text-align: center; border-bottom: 3px solid #d97706;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
        <div style="display: inline-block; background: rgba(217, 119, 6, 0.15); border: 1px solid rgba(217, 119, 6, 0.4); color: #fbbf24; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
            Active Field Outreaches
        </div>
        <h1 style="font-size: 44px; font-family: 'Cinzel', serif; font-weight: 700; margin-bottom: 18px; color: #ffffff;">
            Our Ministry Projects
        </h1>
        <p style="font-size: 18px; color: #cbd5e1; line-height: 1.7; max-width: 750px; margin: 0 auto; font-weight: 300;">
            Every initiative below is directly supervised on the ground. Verified progress bars reflect actual donor contributions recorded in our database.
        </p>
    </div>
</section>

<section style="padding: 70px 20px; background: #f8fafc;">
    <div class="container" style="max-width: 1200px; margin: 0 auto;">
        
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 36px;">
            <?php foreach ($projects as $project): 
                $percent = $project['goal_amount'] > 0 ? min(100, round(($project['verified_raised'] / $project['goal_amount']) * 100)) : 0;
            ?>
            <div style="background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 10px rgba(0,0,0,0.03); display: flex; flex-direction: column;">
                <div style="position: relative; height: 220px; background: #0f172a;">
                    <img src="<?php echo Security::e($project['image_url']); ?>" alt="<?php echo Security::e($project['title']); ?>" style="width: 100%; height: 100%; object-fit: cover;">
                    <div style="position: absolute; top: 12px; left: 12px; background: rgba(15,23,42,0.85); color: #fbbf24; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 4px; border: 1px solid rgba(251,191,36,0.3);">
                        <?php echo Security::e($project['category']); ?>
                    </div>
                    <div style="position: absolute; bottom: 10px; left: 12px; color: white; font-size: 12px; display: flex; align-items: center; gap: 4px;">
                        📍 <?php echo Security::e($project['location']); ?>
                    </div>
                </div>

                <div style="padding: 26px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 style="font-family: 'Cinzel', serif; font-size: 20px; color: #0f172a; margin-bottom: 10px;">
                            <a href="/projects/<?php echo Security::e($project['slug']); ?>" style="color: inherit; text-decoration: none;">
                                <?php echo Security::e($project['title']); ?>
                            </a>
                        </h3>
                        <p style="font-size: 14px; color: #64748b; line-height: 1.6; margin-bottom: 20px;">
                            <?php echo Security::e($project['summary']); ?>
                        </p>
                    </div>

                    <div style="border-top: 1px solid #f1f5f9; pt-4; margin-top: 10px;">
                        <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: bold; margin-bottom: 6px;">
                            <span style="color: #0f172a;"><?php echo Currency::format($project['verified_raised'], $project['currency']); ?> raised</span>
                            <span style="color: #d97706;"><?php echo $percent; ?>%</span>
                        </div>
                        <div style="background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 16px;">
                            <div style="background: #d97706; height: 100%; width: <?php echo $percent; ?>%;"></div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <a href="/projects/<?php echo Security::e($project['slug']); ?>" style="text-align: center; background: #f1f5f9; color: #334155; padding: 10px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">Details &rarr;</a>
                            <a href="/donate?project_id=<?php echo $project['id']; ?>" class="btn-gold" style="text-align: center; padding: 10px; font-size: 13px;">Support</a>
                        </div>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>

    </div>
</section>

<?php require __DIR__ . '/../layout/footer.php'; ?>
