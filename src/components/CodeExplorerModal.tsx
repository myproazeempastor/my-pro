import React, { useState } from 'react';
import { X, Code2, Download, Copy, Check, FileText, Folder, FileCode } from 'lucide-react';

interface CodeExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadZip: () => void;
  isDownloadingZip: boolean;
}

export const CodeExplorerModal: React.FC<CodeExplorerModalProps> = ({
  isOpen,
  onClose,
  onDownloadZip,
  isDownloadingZip
}) => {
  const [selectedFile, setSelectedFile] = useState<string>('install/schema.sql');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const filesMap: Record<string, { language: string; content: string }> = {
    'install/schema.sql': {
      language: 'sql',
      content: `-- =====================================================================
-- AGAPE LIGHT NETWORK — DATABASE SCHEMA
-- Organization: Agape Light Network (Rev. Azeem Tariq)
-- Scripture: John 8:12 ("I am the light of the world...")
-- Database Target: MySQL 8.0+ / MariaDB 10.4+
-- =====================================================================

CREATE TABLE IF NOT EXISTS \`admins\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`username\` VARCHAR(60) NOT NULL UNIQUE,
  \`email\` VARCHAR(150) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`full_name\` VARCHAR(100) NOT NULL,
  \`role\` ENUM('superadmin', 'editor', 'finance') NOT NULL DEFAULT 'superadmin',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`projects\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`slug\` VARCHAR(120) NOT NULL UNIQUE,
  \`title\` VARCHAR(200) NOT NULL,
  \`category\` VARCHAR(80) NOT NULL,
  \`location\` VARCHAR(150) NOT NULL,
  \`summary\` TEXT NOT NULL,
  \`description\` MEDIUMTEXT NOT NULL,
  \`image_url\` VARCHAR(255) NOT NULL,
  \`goal_amount\` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  \`currency\` VARCHAR(3) NOT NULL DEFAULT 'USD',
  \`is_featured\` TINYINT(1) NOT NULL DEFAULT 0,
  \`status\` ENUM('active', 'completed', 'urgent', 'archived') NOT NULL DEFAULT 'active',
  \`start_date\` DATE NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`donations\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`reference\` VARCHAR(40) NOT NULL UNIQUE,
  \`donor_name\` VARCHAR(120) NOT NULL,
  \`donor_email\` VARCHAR(150) NOT NULL,
  \`amount\` DECIMAL(12,2) NOT NULL,
  \`currency\` VARCHAR(3) NOT NULL DEFAULT 'USD',
  \`project_id\` INT UNSIGNED NULL,
  \`payment_method\` ENUM('demo', 'card_stripe', 'paypal', 'bank_transfer') NOT NULL,
  \`payment_status\` ENUM('pending', 'confirmed', 'failed', 'refunded', 'cancelled') NOT NULL DEFAULT 'pending',
  \`transaction_id\` VARCHAR(120) NULL,
  \`is_anonymous\` TINYINT(1) NOT NULL DEFAULT 0,
  \`notes\` TEXT NULL,
  \`admin_adjusted\` TINYINT(1) NOT NULL DEFAULT 0,
  \`confirmed_at\` DATETIME NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`audit_logs\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`admin_id\` INT UNSIGNED NULL,
  \`actor_name\` VARCHAR(100) NOT NULL,
  \`action\` VARCHAR(60) NOT NULL,
  \`details\` TEXT NOT NULL,
  \`ip_address\` VARCHAR(45) NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
    },
    'index.php': {
      language: 'php',
      content: `<?php
/**
 * AGAPE LIGHT NETWORK — FRONT CONTROLLER & ROUTER
 * Organization: Agape Light Network (Rev. Azeem Tariq)
 * Scripture: John 8:12 ("I am the light of the world...")
 */
declare(strict_types=1);

// PHP 7.4+ Compatibility Polyfills
if (!function_exists('str_starts_with')) {
    function str_starts_with(string $haystack, string $needle): bool {
        return $needle === '' || strncmp($haystack, $needle, strlen($needle)) === 0;
    }
}
if (!function_exists('str_contains')) {
    function str_contains(string $haystack, string $needle): bool {
        return $needle === '' || strpos($haystack, $needle) !== false;
    }
}
if (!function_exists('str_ends_with')) {
    function str_ends_with(string $haystack, string $needle): bool {
        return $needle === '' || substr($haystack, -strlen($needle)) === $needle;
    }
}

// Error Reporting & Safe Diagnostic (?debug=1)
$isDebug = (isset($_GET['debug']) && $_GET['debug'] === '1');
error_reporting(E_ALL);
ini_set('display_errors', $isDebug ? '1' : '0');
ini_set('log_errors', '1');

// Safe Global Exception Handler preventing WSOD
set_exception_handler(function (\\Throwable $ex) use ($isDebug) {
    error_log("Unhandled Exception: " . $ex->getMessage());
    if ($isDebug) {
        echo "<div style='font-family:sans-serif;padding:24px;background:#fff1f2;color:#9f1239;margin:20px;border-radius:8px;'>";
        echo "<h3>Diagnostic Trace (?debug=1)</h3><p>" . htmlspecialchars($ex->getMessage()) . "</p></div>";
    } else {
        http_response_code(500);
        echo "<div style='font-family:sans-serif;text-align:center;padding:60px 20px;'><h2>Agape Light Network</h2><p>Frontline portal synchronizing. Configure config/database.php to complete setup.</p></div>";
    }
});

// Check installation lock
if (!file_exists(__DIR__ . '/storage/installed.lock') && file_exists(__DIR__ . '/install/index.php') && !file_exists(__DIR__ . '/config/database.php')) {
    header('Location: install/');
    exit;
}

require_once __DIR__ . '/app/helpers/Security.php';
require_once __DIR__ . '/app/helpers/Currency.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'cookie_httponly' => true,
        'cookie_samesite' => 'Lax',
        'use_strict_mode' => true
    ]);
}

$route = $_GET['route'] ?? '';
$route = trim($route, '/');

$dbConfig = file_exists(__DIR__ . '/config/database.php') ? require __DIR__ . '/config/database.php' : null;
$db = null;
if ($dbConfig && is_array($dbConfig) && !empty($dbConfig['dbname']) && $dbConfig['password'] !== 'YOUR_SECURE_PASSWORD') {
    try {
        $dsn = "mysql:host={$dbConfig['host']};port={$dbConfig['port']};dbname={$dbConfig['dbname']};charset={$dbConfig['charset']}";
        $db = new PDO($dsn, $dbConfig['username'], $dbConfig['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4, sql_mode = 'NO_ENGINE_SUBSTITUTION'"
        ]);
    } catch (\\PDOException $e) {
        error_log("Database connection failure: " . $e->getMessage());
    }
}

// Clean routing dispatch
switch ($route) {
    case '':
    case 'home':
        require_once __DIR__ . '/app/models/Project.php';
        require_once __DIR__ . '/app/models/Donation.php';
        $projectModel = new App\\Models\\Project($db);
        $donationModel = new App\\Models\\Donation($db);
        $featuredProjects = $projectModel->getFeatured(4);
        $recentDonations = $donationModel->getRecentConfirmed(5);
        require __DIR__ . '/app/views/public/home.php';
        break;

    case 'projects':
        require_once __DIR__ . '/app/models/Project.php';
        $projectModel = new App\\Models\\Project($db);
        $projects = $projectModel->getAllActive();
        require __DIR__ . '/app/views/public/projects.php';
        break;

    case 'donate':
        require_once __DIR__ . '/app/models/Project.php';
        $projectModel = new App\\Models\\Project($db);
        $projects = $projectModel->getAllActive();
        require __DIR__ . '/app/views/public/donate.php';
        break;

    case 'admin':
    case (str_starts_with($route, 'admin/')):
        require __DIR__ . '/admin/index.php';
        break;

    default:
        http_response_code(404);
        require __DIR__ . '/app/views/public/404.php';
        break;
}`
    },
    '.htaccess': {
      language: 'apache',
      content: `<IfModule mod_rewrite.c>
    RewriteEngine On

    # Ensure DirectoryIndex evaluates index.php
    DirectoryIndex index.php index.html

    # Block access to hidden files and internal app folders
    RewriteRule (^\.|/\.) - [F]
    RewriteRule ^(app|config|storage)/ - [F,L]

    # Explicit routing for /admin and /admin/* so it never 404s
    RewriteRule ^admin/?$ admin/index.php [L,QSA]
    RewriteRule ^admin/(.*)$ admin/index.php?route=$1 [L,QSA]

    # Serve real physical files and directories
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]

    # Pass all remaining requests to front controller
    RewriteRule ^(.*)$ index.php?route=$1 [QSA,L]
</IfModule>

<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

Options -Indexes`
    },
    'app/helpers/Security.php': {
      language: 'php',
      content: `<?php
declare(strict_types=1);

namespace App\\Helpers;

class Security
{
    public static function e(?string $string): string
    {
        return htmlspecialchars($string ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }

    public static function csrfToken(): string
    {
        if (session_status() === PHP_SESSION_NONE) session_start();
        if (empty($_SESSION['_csrf_token'])) {
            $_SESSION['_csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['_csrf_token'];
    }

    public static function validateCsrf(?string $token): bool
    {
        if (session_status() === PHP_SESSION_NONE) session_start();
        if (empty($_SESSION['_csrf_token']) || empty($token)) return false;
        return hash_equals($_SESSION['_csrf_token'], $token);
    }

    public static function generateDonationReference(): string
    {
        return "ALN-" . date('Y') . "-" . strtoupper(bin2hex(random_bytes(3)));
    }
}`
    },
    'app/services/PaymentGateway.php': {
      language: 'php',
      content: `<?php
declare(strict_types=1);

namespace App\\Services;

interface PaymentGatewayInterface
{
    public function getName(): string;
    public function initializeCheckout(array $donationData): array;
    public function verifyWebhook(string $payload, string $signatureHeader): array;
}

class StripeGateway implements PaymentGatewayInterface
{
    private string $secretKey;
    private string $publishableKey;

    public function __construct(array $config)
    {
        $this->secretKey = $config['secret_key'] ?? '';
        $this->publishableKey = $config['publishable_key'] ?? '';
    }

    public function getName(): string { return 'Stripe'; }

    public function initializeCheckout(array $donationData): array
    {
        return [
            'success' => true,
            'checkout_url' => 'https://checkout.stripe.com/pay/' . urlencode($donationData['reference']),
            'publishable_key' => $this->publishableKey
        ];
    }

    public function verifyWebhook(string $payload, string $signatureHeader): array
    {
        return ['verified' => true, 'event_type' => 'checkout.session.completed'];
    }
}`
    },
    'README.md': {
      language: 'markdown',
      content: `# AGAPE LIGHT NETWORK
### Standalone Dynamic PHP & MySQL Donation and Project Showcase Platform
**Organization:** Agape Light Network  
**Website:** https://agapelightnetwork.org/  
**Founder & President:** Rev. Azeem Tariq  
**Mission:** Spreading light, living love (John 8:12)

## cPanel Deployment Quick-Start
1. Create a MySQL Database & User in cPanel MySQL Databases.
2. Upload this ZIP package to public_html/ and extract all files.
3. Visit https://yourdomain.com/install/ in your browser.
4. Follow the 4-step wizard to test your environment, connect MySQL, and create the administrator.
5. Login to /admin/ and manage your projects, donations, and settings.`
    }
  };

  const currentFile = filesMap[selectedFile] || { language: 'text', content: '' };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative bg-slate-900 text-slate-100 rounded-2xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl border border-slate-700 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-sm">
                cPanel Standalone PHP 8.2 & MySQL Codebase Inspector
              </h3>
              <p className="text-[11px] text-slate-400">
                Agape Light Network &bull; Ready for cPanel File Manager upload
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onDownloadZip}
              disabled={isDownloadingZip}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloadingZip ? 'Packaging...' : 'Download ZIP Bundle'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Split View */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* File Tree Sidebar */}
          <div className="w-64 bg-slate-950 border-r border-slate-800 p-4 overflow-y-auto space-y-1 text-xs shrink-0">
            <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-2 px-2">
              Package Tree
            </div>
            {Object.keys(filesMap).map(filename => (
              <button
                key={filename}
                onClick={() => setSelectedFile(filename)}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                  selectedFile === filename
                    ? 'bg-amber-500/15 text-amber-400 font-semibold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate font-mono">{filename}</span>
              </button>
            ))}
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
            <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono text-amber-400 font-bold">{selectedFile}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="flex-1 p-5 overflow-auto text-xs font-mono text-slate-300 leading-relaxed bg-[#0b101b]">
              <code>{currentFile.content}</code>
            </pre>
          </div>

        </div>

      </div>
    </div>
  );
};
