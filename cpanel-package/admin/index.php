<?php
/**
 * =====================================================================
 * AGAPE LIGHT NETWORK — SECURE ADMIN CONTROLLER
 * =====================================================================
 */
declare(strict_types=1);

require_once dirname(__DIR__) . '/app/helpers/Security.php';
require_once dirname(__DIR__) . '/app/helpers/Currency.php';
require_once dirname(__DIR__) . '/app/models/Project.php';
require_once dirname(__DIR__) . '/app/models/Donation.php';

use App\Helpers\Security;
use App\Helpers\Currency;
use App\Models\Project;
use App\Models\Donation;

// Check installation lock
if (!file_exists(dirname(__DIR__) . '/storage/installed.lock')) {
    header("Location: ../install/");
    exit;
}

// Database Connection
$dbConfig = require dirname(__DIR__) . '/config/database.php';
$dsn = "mysql:host={$dbConfig['host']};port={$dbConfig['port']};dbname={$dbConfig['dbname']};charset={$dbConfig['charset']}";
$db = new PDO($dsn, $dbConfig['username'], $dbConfig['password'], $dbConfig['options']);

// Session handling
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$action = $_GET['action'] ?? 'dashboard';
$errors = [];
$success = '';

// Auth Check
$isLoggedIn = !empty($_SESSION['admin_logged_in']) && !empty($_SESSION['admin_user']);

// Handle Login
if ($action === 'login') {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!Security::validateCsrf($_POST['csrf_token'] ?? '')) {
            $errors[] = "Security token mismatch. Please try again.";
        } else {
            $userOrEmail = trim($_POST['username'] ?? '');
            $password = $_POST['password'] ?? '';

            $stmt = $db->prepare("SELECT * FROM admins WHERE username = :u OR email = :e LIMIT 1");
            $stmt->execute([':u' => $userOrEmail, ':e' => $userOrEmail]);
            $admin = $stmt->fetch();

            if ($admin && Security::verifyPassword($password, $admin['password_hash'])) {
                session_regenerate_id(true);
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_id'] = $admin['id'];
                $_SESSION['admin_user'] = $admin['username'];
                $_SESSION['admin_name'] = $admin['full_name'];
                $_SESSION['admin_role'] = $admin['role'];

                // Update login audit
                $logStmt = $db->prepare("INSERT INTO audit_logs (admin_id, actor_name, action, details, ip_address) VALUES (?, ?, 'ADMIN_LOGIN', 'Successful administrator authentication', ?)");
                $logStmt->execute([$admin['id'], $admin['full_name'], $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1']);

                header("Location: index.php?action=dashboard");
                exit;
            } else {
                $errors[] = "Invalid administrator credentials.";
            }
        }
    }
}

// Handle Logout
if ($action === 'logout') {
    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
    }
    session_destroy();
    header("Location: index.php?action=login");
    exit;
}

// Enforce Auth for all other actions
if (!$isLoggedIn && $action !== 'login') {
    header("Location: index.php?action=login");
    exit;
}

// CSV Export of Donations
if ($action === 'export_donations_csv') {
    $stmt = $db->query("SELECT reference, donor_name, donor_email, donor_country, amount, currency, payment_method, payment_status, transaction_id, created_at, confirmed_at FROM donations ORDER BY id DESC");
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=aln_donations_' . date('Y-m-d') . '.csv');
    $output = fopen('php://output', 'w');
    fputcsv($output, ['Reference', 'Donor Name', 'Email', 'Country', 'Amount', 'Currency', 'Payment Method', 'Status', 'Transaction ID', 'Created At', 'Confirmed At']);
    foreach ($records as $row) {
        fputcsv($output, $row);
    }
    fclose($output);
    exit;
}

// Manual Status Adjustment
if ($action === 'adjust_donation' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!Security::validateCsrf($_POST['csrf_token'] ?? '')) {
        die("Security validation failed.");
    }
    $ref = $_POST['reference'] ?? '';
    $newStatus = $_POST['new_status'] ?? 'confirmed';
    $notes = $_POST['adjustment_reason'] ?? 'Documented bank wire clearance.';

    $stmt = $db->prepare("UPDATE donations SET payment_status = :st, admin_adjusted = 1, notes = CONCAT(COALESCE(notes, ''), ' [Admin Adjustment: ', :nt, ']') WHERE reference = :ref");
    $stmt->execute([':st' => $newStatus, ':nt' => $notes, ':ref' => $ref]);

    // Record audit log
    $audit = $db->prepare("INSERT INTO audit_logs (admin_id, actor_name, action, details, ip_address) VALUES (?, ?, 'DONATION_MANUAL_ADJUST', ?, ?)");
    $audit->execute([$_SESSION['admin_id'], $_SESSION['admin_name'], "Adjusted {$ref} status to {$newStatus}. Reason: {$notes}", $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1']);

    header("Location: index.php?action=donations&msg=updated");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Portal | Agape Light Network</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 0; }
        .sidebar { width: 250px; background: #1e293b; height: 100vh; position: fixed; border-right: 1px solid #334155; padding: 24px; box-sizing: border-box; }
        .main { margin-left: 250px; padding: 36px 40px; }
        .brand { font-size: 18px; font-weight: 800; color: #f59e0b; margin-bottom: 24px; }
        .nav-item { display: block; padding: 10px 14px; color: #cbd5e1; text-decoration: none; border-radius: 6px; margin-bottom: 6px; font-weight: 500; }
        .nav-item:hover, .nav-item.active { background: #334155; color: #f59e0b; }
        .card { background: #1e293b; border-radius: 10px; border: 1px solid #334155; padding: 24px; margin-bottom: 24px; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #334155; font-size: 14px; }
        th { color: #94a3b8; font-weight: 600; }
        .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
        .badge-confirmed { background: #065f46; color: #34d399; }
        .badge-pending { background: #78350f; color: #fbbf24; }
        .btn { background: #d97706; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; font-size: 13px; }
        .btn:hover { background: #b45309; }
    </style>
</head>
<body>
<?php if ($action === 'login'): ?>
    <div style="max-width: 400px; margin: 100px auto; background: #1e293b; padding: 36px; border-radius: 12px; border: 1px solid #334155;">
        <h2 style="color: #f59e0b; margin-bottom: 8px;">Agape Light Network</h2>
        <p style="color: #94a3b8; font-size: 14px; margin-bottom: 24px;">Secure Administrative Portal &bull; Rev. Azeem Tariq</p>
        <?php if (!empty($errors)): ?>
            <div style="background: #7f1d1d; padding: 10px; border-radius: 6px; font-size: 13px; margin-bottom: 16px;"><?php echo implode('<br>', $errors); ?></div>
        <?php endif; ?>
        <form method="POST">
            <input type="hidden" name="csrf_token" value="<?php echo Security::csrfToken(); ?>">
            <label style="font-size: 13px; color: #cbd5e1;">Username or Email:</label>
            <input type="text" name="username" style="width: 100%; padding: 10px; margin: 6px 0 16px; background: #0f172a; border: 1px solid #475569; border-radius: 6px; color: white; box-sizing: border-box;" required>
            <label style="font-size: 13px; color: #cbd5e1;">Password:</label>
            <input type="password" name="password" style="width: 100%; padding: 10px; margin: 6px 0 20px; background: #0f172a; border: 1px solid #475569; border-radius: 6px; color: white; box-sizing: border-box;" required>
            <button type="submit" class="btn" style="width: 100%; padding: 12px;">Sign In to Dashboard &rarr;</button>
        </form>
    </div>
<?php else: ?>
    <div class="sidebar">
        <div class="brand">AGAPE LIGHT</div>
        <div style="font-size: 12px; color: #94a3b8; margin-bottom: 24px;">President: Rev. Azeem Tariq</div>
        <a href="index.php?action=dashboard" class="nav-item <?php echo $action === 'dashboard' ? 'active' : ''; ?>">Dashboard</a>
        <a href="index.php?action=projects" class="nav-item <?php echo $action === 'projects' ? 'active' : ''; ?>">Projects</a>
        <a href="index.php?action=donations" class="nav-item <?php echo $action === 'donations' ? 'active' : ''; ?>">Donations</a>
        <a href="index.php?action=audit" class="nav-item <?php echo $action === 'audit' ? 'active' : ''; ?>">Audit Logs</a>
        <a href="index.php?action=settings" class="nav-item <?php echo $action === 'settings' ? 'active' : ''; ?>">Settings</a>
        <div style="position: absolute; bottom: 24px; left: 24px;">
            <a href="index.php?action=logout" style="color: #ef4444; font-size: 13px; text-decoration: none;">Sign Out</a>
        </div>
    </div>
    <div class="main">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px;">
            <h1>Administration Overview</h1>
            <div>
                <a href="index.php?action=export_donations_csv" class="btn" style="background: #334155; margin-right: 8px;">Export CSV</a>
                <a href="../" target="_blank" class="btn">View Public Site &rarr;</a>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 28px;">
            <div class="card">
                <div style="color: #94a3b8; font-size: 13px;">Total Verified Funds</div>
                <div style="font-size: 26px; font-weight: 700; color: #34d399; margin-top: 8px;">
                    <?php 
                        $sumStmt = $db->query("SELECT COALESCE(SUM(amount), 0) FROM donations WHERE payment_status = 'confirmed' AND currency = 'USD'");
                        echo '$' . number_format((float)$sumStmt->fetchColumn(), 2);
                    ?>
                </div>
            </div>
            <div class="card">
                <div style="color: #94a3b8; font-size: 13px;">Active Ministry Projects</div>
                <div style="font-size: 26px; font-weight: 700; color: #f59e0b; margin-top: 8px;">
                    <?php 
                        $pCount = $db->query("SELECT COUNT(*) FROM projects WHERE status = 'active'");
                        echo $pCount->fetchColumn();
                    ?>
                </div>
            </div>
            <div class="card">
                <div style="color: #94a3b8; font-size: 13px;">Logged Admin</div>
                <div style="font-size: 18px; font-weight: 600; color: #f8fafc; margin-top: 8px;">
                    <?php echo Security::e($_SESSION['admin_name']); ?>
                </div>
            </div>
        </div>

        <div class="card">
            <h3>Recent Donations</h3>
            <table>
                <thead>
                    <tr>
                        <th>Ref</th>
                        <th>Donor</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        $donations = $db->query("SELECT * FROM donations ORDER BY id DESC LIMIT 5")->fetchAll();
                        foreach ($donations as $d):
                    ?>
                    <tr>
                        <td><strong><?php echo Security::e($d['reference']); ?></strong></td>
                        <td><?php echo Security::e($d['donor_name']); ?></td>
                        <td><?php echo Security::e($d['currency'] . ' ' . number_format((float)$d['amount'], 2)); ?></td>
                        <td><?php echo Security::e($d['payment_method']); ?></td>
                        <td><span class="badge <?php echo $d['payment_status'] === 'confirmed' ? 'badge-confirmed' : 'badge-pending'; ?>"><?php echo Security::e($d['payment_status']); ?></span></td>
                        <td><?php echo Security::e($d['created_at']); ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
<?php endif; ?>
</body>
</html>
