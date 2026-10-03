<?php
declare(strict_types=1);
use App\Helpers\Security;
use App\Helpers\Currency;
$pageTitle = "Spreading Light, Living Love";
require __DIR__ . '/../layout/header.php';
?>

<section style="background: #020617; color: white; padding: 80px 20px; text-align: center;">
    <div class="container">
        <h1 style="font-size: 42px; margin-bottom: 16px; color: #f59e0b;">Spreading Light, Living Love</h1>
        <p style="font-size: 18px; max-width: 750px; margin: 0 auto 24px; color: #cbd5e1;">
            Under the pastoral leadership of <strong>Rev. Azeem Tariq</strong>, Agape Light Network is an international Christian outreach dedicated to clean drinking water, Bible literacy, medical relief, and family support.
        </p>
        <div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; max-width: 600px; margin: 0 auto 30px; padding: 14px 20px; text-align: left;">
            <em style="color: #fbbf24;">&ldquo;I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.&rdquo;</em>
            <div style="font-size: 12px; font-weight: bold; color: #f59e0b; margin-top: 6px; text-align: right;">— John 8:12</div>
        </div>
        <div>
            <a href="/donate" class="btn-gold" style="font-size: 16px; padding: 12px 28px;">Support Our Mission &rarr;</a>
        </div>
    </div>
</section>

<section style="padding: 60px 20px;">
    <div class="container">
        <h2 style="font-size: 28px; text-align: center; margin-bottom: 40px; color: #0f172a;">Featured Ministry Projects</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
            <?php foreach ($featuredProjects as $project): 
                $percent = $project['goal_amount'] > 0 ? min(100, round(($project['verified_raised'] / $project['goal_amount']) * 100)) : 0;
            ?>
            <div style="background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column;">
                <img src="<?php echo Security::e($project['image_url']); ?>" alt="<?php echo Security::e($project['title']); ?>" style="width: 100%; height: 200px; object-fit: cover;">
                <div style="padding: 24px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="font-size: 11px; font-weight: bold; color: #d97706; text-transform: uppercase; margin-bottom: 6px;">
                            <?php echo Security::e($project['category']); ?> &bull; <?php echo Security::e($project['location']); ?>
                        </div>
                        <h3 style="font-size: 18px; color: #0f172a; margin-bottom: 8px;">
                            <?php echo Security::e($project['title']); ?>
                        </h3>
                        <p style="font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 16px;">
                            <?php echo Security::e($project['summary']); ?>
                        </p>
                    </div>
                    <div>
                        <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 6px;">
                            <span><?php echo Currency::format($project['verified_raised'], $project['currency']); ?> raised</span>
                            <span style="color: #d97706;"><?php echo $percent; ?>%</span>
                        </div>
                        <div style="background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 16px;">
                            <div style="background: #d97706; height: 100%; width: <?php echo $percent; ?>%;"></div>
                        </div>
                        <a href="/donate?project_id=<?php echo $project['id']; ?>" class="btn-gold" style="display: block; text-align: center; font-size: 14px; padding: 10px;">Donate to this Project</a>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php require __DIR__ . '/../layout/footer.php'; ?>
