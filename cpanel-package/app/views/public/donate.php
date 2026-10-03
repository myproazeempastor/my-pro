<?php
declare(strict_types=1);
use App\Helpers\Security;
use App\Helpers\Currency;
$pageTitle = "Support Our Ministry";
require __DIR__ . '/../layout/header.php';
?>

<div class="container" style="max-width: 680px; padding: 40px 20px;">
    <div style="background: white; border-radius: 12px; padding: 36px; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
        <h2 style="color: #0f172a; margin-bottom: 8px;">Make a Confidential Gift</h2>
        <p style="color: #64748b; font-size: 14px; margin-bottom: 24px;">Agape Light Network &bull; Rev. Azeem Tariq (John 8:12)</p>

        <form method="POST" action="/donate/process">
            <input type="hidden" name="csrf_token" value="<?php echo Security::csrfToken(); ?>">

            <label style="display:block; font-size: 13px; font-weight: bold; margin-bottom: 6px;">Designated Initiative</label>
            <select name="project_id" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 20px;">
                <option value="">General Fund (Where Most Needed)</option>
                <?php foreach ($projects as $p): ?>
                    <option value="<?php echo $p['id']; ?>" <?php echo (isset($selectedProjectId) && $selectedProjectId == $p['id']) ? 'selected' : ''; ?>>
                        <?php echo Security::e($p['title']); ?> (<?php echo Security::e($p['location']); ?>)
                    </option>
                <?php endforeach; ?>
            </select>

            <label style="display:block; font-size: 13px; font-weight: bold; margin-bottom: 6px;">Amount (USD)</label>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 12px;">
                <button type="button" onclick="document.getElementById('customAmt').value='50'" style="padding: 10px; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 6px; font-weight: bold; cursor: pointer;">$50</button>
                <button type="button" onclick="document.getElementById('customAmt').value='100'" style="padding: 10px; border: 1px solid #d97706; background: #fef3c7; color: #92400e; border-radius: 6px; font-weight: bold; cursor: pointer;">$100</button>
                <button type="button" onclick="document.getElementById('customAmt').value='250'" style="padding: 10px; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 6px; font-weight: bold; cursor: pointer;">$250</button>
                <button type="button" onclick="document.getElementById('customAmt').value='500'" style="padding: 10px; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 6px; font-weight: bold; cursor: pointer;">$500</button>
            </div>
            <input type="number" id="customAmt" name="amount" value="100" min="1" step="any" required style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 20px; box-sizing: border-box;">

            <label style="display:block; font-size: 13px; font-weight: bold; margin-bottom: 6px;">Your Name</label>
            <input type="text" name="donor_name" placeholder="John & Mary Smith" required style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 16px; box-sizing: border-box;">

            <label style="display:block; font-size: 13px; font-weight: bold; margin-bottom: 6px;">Your Email (For Serial Receipt)</label>
            <input type="email" name="donor_email" placeholder="donor@example.com" required style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 24px; box-sizing: border-box;">

            <button type="submit" class="btn-gold" style="width: 100%; padding: 14px; font-size: 16px; border: none; cursor: pointer;">Proceed to Secure Donation &rarr;</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../layout/footer.php'; ?>
