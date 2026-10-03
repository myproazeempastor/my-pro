<?php
/**
 * =====================================================================
 * AGAPE LIGHT NETWORK — WEB INSTALLATION WIZARD
 * Standalone setup script for cPanel environments
 * =====================================================================
 */
declare(strict_types=1);

$lockFile = dirname(__DIR__) . '/storage/installed.lock';
if (file_exists($lockFile)) {
    die("<h1>Installation Locked</h1><p>Agape Light Network is already installed. If you need to re-install, delete <code>storage/installed.lock</code>.</p>");
}

$step = (int)($_GET['step'] ?? 1);
$errors = [];
$successMessage = '';

// Step 1: Environment Checks
$phpVersionOk = version_compare(PHP_VERSION, '8.2.0', '>=');
$pdoOk = extension_loaded('pdo') && extension_loaded('pdo_mysql');
$opensslOk = extension_loaded('openssl');
$mbstringOk = extension_loaded('mbstring');
$jsonOk = extension_loaded('json');
$storageWritable = is_writable(dirname(__DIR__) . '/storage/logs') || @mkdir(dirname(__DIR__) . '/storage/logs', 0755, true);
$configWritable = is_writable(dirname(__DIR__) . '/config') || is_writable(dirname(__DIR__));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($step === 2) {
        // Test database credentials
        $host = trim($_POST['db_host'] ?? 'localhost');
        $port = (int)($_POST['db_port'] ?? 3306);
        $name = trim($_POST['db_name'] ?? '');
        $user = trim($_POST['db_user'] ?? '');
        $pass = $_POST['db_pass'] ?? '';

        try {
            $dsn = "mysql:host={$host};port={$port};dbname={$name};charset=utf8mb4";
            $pdo = new PDO($dsn, $user, $pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);

            // Execute schema.sql
            $schemaFile = __DIR__ . '/schema.sql';
            if (!file_exists($schemaFile)) {
                throw new Exception("schema.sql file missing in install directory.");
            }
            $sql = file_get_contents($schemaFile);
            $pdo->exec($sql);

            // Write database.php
            $dbConfigContent = "<?php\ndeclare(strict_types=1);\nreturn [\n    'host' => " . var_export($host, true) . ",\n    'port' => {$port},\n    'dbname' => " . var_export($name, true) . ",\n    'username' => " . var_export($user, true) . ",\n    'password' => " . var_export($pass, true) . ",\n    'charset' => 'utf8mb4',\n    'options' => [\n        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,\n        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,\n        PDO::ATTR_EMULATE_PREPARES => false,\n    ]\n];\n";
            file_put_contents(dirname(__DIR__) . '/config/database.php', $dbConfigContent);

            header("Location: index.php?step=3");
            exit;
        } catch (Exception $e) {
            $errors[] = "Database Connection Failed: " . $e->getMessage();
        }
    } elseif ($step === 3) {
        // Administrator Account Creation
        $adminUser = trim($_POST['admin_username'] ?? '');
        $adminEmail = trim($_POST['admin_email'] ?? '');
        $adminPass = $_POST['admin_password'] ?? '';
        $adminName = trim($_POST['admin_name'] ?? 'Rev. Azeem Tariq');

        if (strlen($adminPass) < 8) {
            $errors[] = "Password must be at least 8 characters long.";
        } else {
            try {
                $dbConfig = require dirname(__DIR__) . '/config/database.php';
                $dsn = "mysql:host={$dbConfig['host']};port={$dbConfig['port']};dbname={$dbConfig['dbname']};charset=utf8mb4";
                $pdo = new PDO($dsn, $dbConfig['username'], $dbConfig['password'], $dbConfig['options']);

                $passwordHash = password_hash($adminPass, PASSWORD_DEFAULT);

                $stmt = $pdo->prepare("
                    INSERT INTO admins (username, email, password_hash, full_name, role)
                    VALUES (:username, :email, :hash, :full_name, 'superadmin')
                    ON DUPLICATE KEY UPDATE password_hash = :hash, full_name = :full_name
                ");
                $stmt->execute([
                    ':username' => $adminUser,
                    ':email' => $adminEmail,
                    ':hash' => $passwordHash,
                    ':full_name' => $adminName
                ]);

                // Seed Default Projects & Settings
                $stmt = $pdo->prepare("
                    INSERT IGNORE INTO projects (slug, title, category, location, summary, description, image_url, goal_amount, currency, is_featured, status, start_date)
                    VALUES 
                    ('clean-water-wells', 'Clean Water & Deep Wells Project', 'Humanitarian Relief', 'Rural Communities', 'Drilling deep sustainable water wells.', 'Clean water wells providing fresh drinking water.', 'assets/images/water.jpg', 15000.00, 'USD', 1, 'active', CURDATE()),
                    ('bible-distribution', 'Bibles for Believers & Literacy Outreach', 'Ministry', 'Regional Villages', 'Distributing God\'s Holy Word.', 'Bible distribution for believers.', 'assets/images/bibles.jpg', 8000.00, 'USD', 1, 'active', CURDATE())
                ");
                $stmt->execute();

                // Create installed.lock
                file_put_contents($lockFile, "Installed on " . date('Y-m-d H:i:s') . " by " . $adminEmail);

                header("Location: index.php?step=4");
                exit;
            } catch (Exception $e) {
                $errors[] = "Admin Setup Failed: " . $e->getMessage();
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agape Light Network — Installer</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 40px 20px; }
        .card { max-width: 650px; margin: 0 auto; background: #1e293b; border-radius: 12px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); border: 1px solid #334155; }
        .gold { color: #f59e0b; }
        h1 { margin-top: 0; font-size: 24px; }
        .check-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #334155; }
        .status-ok { color: #10b981; font-weight: bold; }
        .status-fail { color: #ef4444; font-weight: bold; }
        .btn { display: inline-block; background: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; border: none; cursor: pointer; }
        .btn:hover { background: #b45309; }
        input[type="text"], input[type="password"], input[type="email"] { width: 100%; padding: 10px; margin: 8px 0 20px; background: #0f172a; border: 1px solid #475569; border-radius: 6px; color: white; box-sizing: border-box; }
        .alert { background: #7f1d1d; border: 1px solid #ef4444; padding: 12px; border-radius: 6px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="card">
        <h1 class="gold">Agape Light Network — Setup Wizard</h1>
        <p>Founder & President: Rev. Azeem Tariq | <em>John 8:12</em></p>

        <?php if (!empty($errors)): ?>
            <div class="alert"><?php echo implode('<br>', $errors); ?></div>
        <?php endif; ?>

        <?php if ($step === 1): ?>
            <h3>Step 1 of 4: Environment Compatibility Check</h3>
            <div class="check-item"><span>PHP Version &ge; 8.2 (Current: <?php echo PHP_VERSION; ?>)</span><span class="<?php echo $phpVersionOk ? 'status-ok' : 'status-fail'; ?>"><?php echo $phpVersionOk ? 'PASS' : 'FAIL'; ?></span></div>
            <div class="check-item"><span>PDO MySQL Extension</span><span class="<?php echo $pdoOk ? 'status-ok' : 'status-fail'; ?>"><?php echo $pdoOk ? 'PASS' : 'FAIL'; ?></span></div>
            <div class="check-item"><span>OpenSSL Security Extension</span><span class="<?php echo $opensslOk ? 'status-ok' : 'status-fail'; ?>"><?php echo $opensslOk ? 'PASS' : 'FAIL'; ?></span></div>
            <div class="check-item"><span>Mbstring Unicode Extension</span><span class="<?php echo $mbstringOk ? 'status-ok' : 'status-fail'; ?>"><?php echo $mbstringOk ? 'PASS' : 'FAIL'; ?></span></div>
            <div class="check-item"><span>Storage / Logs Directory Writable</span><span class="<?php echo $storageWritable ? 'status-ok' : 'status-fail'; ?>"><?php echo $storageWritable ? 'PASS' : 'FAIL'; ?></span></div>

            <div style="margin-top: 30px; text-align: right;">
                <?php if ($phpVersionOk && $pdoOk && $opensslOk && $mbstringOk): ?>
                    <a href="index.php?step=2" class="btn">Continue to Database Setup &rarr;</a>
                <?php else: ?>
                    <p class="status-fail">Please resolve the failed checks with your hosting provider before continuing.</p>
                <?php endif; ?>
            </div>

        <?php elseif ($step === 2): ?>
            <h3>Step 2 of 4: Database Credentials</h3>
            <p>Enter the database details created in cPanel MySQL Databases.</p>
            <form method="POST">
                <label>Database Host:</label>
                <input type="text" name="db_host" value="localhost" required>
                <label>Database Name:</label>
                <input type="text" name="db_name" placeholder="e.g. username_agape" required>
                <label>Database Username:</label>
                <input type="text" name="db_user" placeholder="e.g. username_agapeusr" required>
                <label>Database Password:</label>
                <input type="password" name="db_pass" required>
                <button type="submit" class="btn">Test & Initialize Schema &rarr;</button>
            </form>

        <?php elseif ($step === 3): ?>
            <h3>Step 3 of 4: Primary Administrator Setup</h3>
            <form method="POST">
                <label>Administrator Full Name:</label>
                <input type="text" name="admin_name" value="Rev. Azeem Tariq" required>
                <label>Admin Username:</label>
                <input type="text" name="admin_username" value="azeem.tariq" required>
                <label>Admin Email:</label>
                <input type="email" name="admin_email" value="contact@agapelightnetwork.org" required>
                <label>Master Password:</label>
                <input type="password" name="admin_password" placeholder="At least 8 characters" required>
                <button type="submit" class="btn">Complete Installation &rarr;</button>
            </form>

        <?php elseif ($step === 4): ?>
            <h3 class="status-ok">&#10004; Installation Complete!</h3>
            <p>Agape Light Network has been successfully configured. The database tables have been provisioned, and the security lock has been placed.</p>
            <p><strong>Next steps:</strong></p>
            <ol>
                <li>Delete the <code>install/</code> folder from your cPanel File Manager.</li>
                <li>Ensure SSL is enabled on your domain.</li>
            </ol>
            <div style="margin-top: 30px;">
                <a href="../" class="btn">Visit Public Website</a>
                <a href="../admin/" class="btn" style="background: #334155; margin-left: 10px;">Go to Admin Dashboard</a>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
