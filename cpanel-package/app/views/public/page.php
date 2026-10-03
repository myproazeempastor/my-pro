<?php
/**
 * =====================================================================
 * AGAPE LIGHT NETWORK — DYNAMIC MODULAR PAGE BUILDER RENDERER
 * =====================================================================
 */
declare(strict_types=1);
use App\Helpers\Security;

$pageTitle = Security::e($page['title']) . " — Agape Light Network";
$metaDescription = Security::e($page['seo_description'] ?? $page['subtitle'] ?? '');
require __DIR__ . '/../layout/header.php';
?>

<!-- Dynamic Page Header -->
<section style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); color: white; padding: 75px 20px; text-align: center; border-bottom: 3px solid #d97706;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
        <?php if (!empty($page['hero_tagline'])): ?>
            <div style="display: inline-block; background: rgba(217, 119, 6, 0.15); border: 1px solid rgba(217, 119, 6, 0.4); color: #fbbf24; padding: 5px 14px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-bottom: 16px;">
                <?php echo Security::e($page['hero_tagline']); ?>
            </div>
        <?php endif; ?>
        <h1 style="font-size: 42px; font-family: 'Cinzel', serif; font-weight: 700; margin-bottom: 16px; color: #ffffff;">
            <?php echo Security::e($page['title']); ?>
        </h1>
        <?php if (!empty($page['subtitle'])): ?>
            <p style="font-size: 18px; color: #cbd5e1; max-width: 750px; margin: 0 auto; font-weight: 300;">
                <?php echo Security::e($page['subtitle']); ?>
            </p>
        <?php endif; ?>
    </div>
</section>

<!-- Dynamic Content Sections Loop -->
<div class="page-builder-content">
    <?php if (!empty($page['content'])): ?>
        <section style="padding: 60px 20px; background: #ffffff;">
            <div class="container" style="max-width: 900px; margin: 0 auto; font-size: 16px; line-height: 1.8; color: #334155;">
                <?php echo $page['content']; ?>
            </div>
        </section>
    <?php endif; ?>

    <?php if (!empty($sections) && is_array($sections)): ?>
        <?php foreach ($sections as $section): ?>
            <?php if (!$section['is_visible']) continue; ?>
            <section class="section-type-<?php echo Security::e($section['section_type']); ?>" style="padding: 60px 20px; border-bottom: 1px solid #f1f5f9;">
                <div class="container" style="max-width: 1000px; margin: 0 auto;">
                    <?php if (!empty($section['title'])): ?>
                        <h2 style="font-family: 'Cinzel', serif; font-size: 28px; color: #0f172a; margin-bottom: 12px; text-align: center;">
                            <?php echo Security::e($section['title']); ?>
                        </h2>
                    <?php endif; ?>

                    <?php if (!empty($section['subtitle'])): ?>
                        <p style="font-size: 16px; color: #64748b; margin-bottom: 30px; text-align: center;">
                            <?php echo Security::e($section['subtitle']); ?>
                        </p>
                    <?php endif; ?>

                    <?php if ($section['section_type'] === 'image_text' && !empty($section['media_url'])): ?>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
                            <img src="<?php echo Security::e($section['media_url']); ?>" alt="" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                            <div style="font-size: 15px; line-height: 1.8; color: #475569;">
                                <?php echo $section['content']; ?>
                            </div>
                        </div>
                    <?php elseif ($section['section_type'] === 'donation_cta'): ?>
                        <div style="background: #0f172a; color: white; border-radius: 12px; padding: 40px; text-align: center;">
                            <div style="font-size: 16px; color: #cbd5e1; margin-bottom: 20px;">
                                <?php echo $section['content']; ?>
                            </div>
                            <a href="/donate" class="btn-gold" style="font-size: 15px; padding: 12px 28px;">Support this Calling &rarr;</a>
                        </div>
                    <?php else: ?>
                        <div style="font-size: 15px; line-height: 1.8; color: #475569;">
                            <?php echo $section['content']; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </section>
        <?php endforeach; ?>
    <?php endif; ?>
</div>

<?php require __DIR__ . '/../layout/footer.php'; ?>
