<?php
/**
 * =====================================================================
 * AGAPE LIGHT NETWORK — COMPLETE FRONT CONTROLLER & ROUTER
 * Organization: Agape Light Network (Rev. Azeem Tariq)
 * Scripture: John 8:12 ("I am the light of the world...")
 * =====================================================================
 */
declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/storage/logs/error.log');

// Check installation lock
if (!file_exists(__DIR__ . '/storage/installed.lock') && file_exists(__DIR__ . '/install/index.php')) {
    header('Location: install/');
    exit;
}

// Helpers
require_once __DIR__ . '/app/helpers/Security.php';
require_once __DIR__ . '/app/helpers/Currency.php';

session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Lax',
    'use_strict_mode' => true
]);

// Determine Route
$route = $_GET['route'] ?? '';
$route = trim($route, '/');

// Database Connection initialization
$dbConfig = file_exists(__DIR__ . '/config/database.php') ? require __DIR__ . '/config/database.php' : null;
$db = null;
if ($dbConfig) {
    try {
        $dsn = "mysql:host={$dbConfig['host']};port={$dbConfig['port']};dbname={$dbConfig['dbname']};charset={$dbConfig['charset']}";
        $db = new PDO($dsn, $dbConfig['username'], $dbConfig['password'], $dbConfig['options']);
    } catch (PDOException $e) {
        error_log("Database connection failure: " . $e->getMessage());
        die("A temporary database error occurred. The technical administrator has been notified.");
    }
}

// Clean Multi-Page Routing Dispatch
switch ($route) {
    case '':
    case 'home':
        require_once __DIR__ . '/app/models/Project.php';
        require_once __DIR__ . '/app/models/Donation.php';
        $projectModel = new App\Models\Project($db);
        $donationModel = new App\Models\Donation($db);
        $featuredProjects = $projectModel->getFeatured(4);
        $recentDonations = $donationModel->getRecentConfirmed(5);
        require __DIR__ . '/app/views/public/home.php';
        break;

    case 'strategic-blueprint':
    case 'blueprint':
        $pageTitle = "The Strategic Blueprint (2026–2031) — Agape Light Network";
        $pageDesc = "Our systematic, audited roadmap to liberate 20,000 Christian families from Pakistani brick kilns and drill 250 deep wells.";
        require __DIR__ . '/app/views/public/vision.php';
        break;

    case 'frontline-accountability':
    case 'transparency':
    case 'financial-transparency':
        require __DIR__ . '/app/views/public/transparency.php';
        break;

    case 'direct-debt-rescue':
    case 'debt-rescue':
        $pageTitle = "Direct Debt Rescue & Freedom Certificate — Agape Light Network";
        $pageDesc = "Paying off generational brick-kiln debt contracts and restoring dignity to bonded Christian laborers.";
        require_once __DIR__ . '/app/models/Project.php';
        $projectModel = new App\Models\Project($db);
        $projects = $projectModel->getAllActive();
        require __DIR__ . '/app/views/public/projects.php';
        break;

    case 'the-mission':
    case 'mission':
    case 'our-mission':
        require __DIR__ . '/app/views/public/mission.php';
        break;

    case 'the-john-812-mandate':
    case 'john-812':
        $pageTitle = "The John 8:12 Mandate — Agape Light Network";
        $pageDesc = "The foundational scripture of our calling: I am the light of the world.";
        require __DIR__ . '/app/views/public/mission.php';
        break;

    case 'explore-church-vision':
    case 'vision':
    case 'our-vision':
        require __DIR__ . '/app/views/public/vision.php';
        break;

    case 'frontline-leadership-origins':
    case 'about':
    case 'about-us':
        require __DIR__ . '/app/views/public/about.php';
        break;

    case 'our-story':
    case 'story':
        require __DIR__ . '/app/views/public/our-story.php';
        break;

    case 'sponsor-a-project':
    case 'projects':
    case 'our-projects':
        require_once __DIR__ . '/app/models/Project.php';
        $projectModel = new App\Models\Project($db);
        $projects = $projectModel->getAllActive();
        require __DIR__ . '/app/views/public/projects.php';
        break;

    case 'see-our-ground-impact':
    case 'impact':
    case 'our-impact':
        require __DIR__ . '/app/views/public/impact.php';
        break;

    case 'ministry-reports-stories':
    case 'stories':
    case 'updates':
        require __DIR__ . '/app/views/public/stories.php';
        break;

    case 'donate':
        require_once __DIR__ . '/app/models/Project.php';
        $projectModel = new App\Models\Project($db);
        $projects = $projectModel->getAllActive();
        $selectedProjectId = isset($_GET['project_id']) ? (int)$_GET['project_id'] : null;
        require __DIR__ . '/app/views/public/donate.php';
        break;

    case 'initiate-strategic-alliance':
    case 'get-involved':
    case 'involved':
        require __DIR__ . '/app/views/public/get-involved.php';
        break;

    case 'contact-us':
    case 'contact':
        require __DIR__ . '/app/views/public/contact.php';
        break;

    case 'privacy-policy':
        $policyTitle = "Privacy Policy";
        $policySlug = "privacy-policy";
        require __DIR__ . '/app/views/public/policy.php';
        break;

    case 'donation-policy':
        $policyTitle = "Donation Policy & Terms of Giving";
        $policySlug = "donation-policy";
        require __DIR__ . '/app/views/public/policy.php';
        break;

    case 'terms':
    case 'terms-of-use':
        $policyTitle = "Terms of Use";
        $policySlug = "terms";
        require __DIR__ . '/app/views/public/policy.php';
        break;

    case 'receipt':
        require_once __DIR__ . '/app/models/Donation.php';
        $reference = $_GET['ref'] ?? '';
        $donationModel = new App\Models\Donation($db);
        $donation = $donationModel->findByReference($reference);
        if (!$donation) {
            http_response_code(404);
            die("Donation reference not found.");
        }
        require __DIR__ . '/app/views/public/receipt.php';
        break;

    case 'admin':
    case (str_starts_with($route, 'admin/')):
        require __DIR__ . '/admin/index.php';
        break;

    default:
        // Check dynamic pages table
        if ($db) {
            $stmt = $db->prepare("SELECT * FROM pages WHERE slug = :slug AND status = 'published' LIMIT 1");
            $stmt->execute([':slug' => $route]);
            $page = $stmt->fetch();
            if ($page) {
                // Fetch modular sections for this page
                $secStmt = $db->prepare("SELECT * FROM page_sections WHERE page_id = :pid AND is_visible = 1 ORDER BY sort_order ASC");
                $secStmt->execute([':pid' => $page['id']]);
                $sections = $secStmt->fetchAll();
                require __DIR__ . '/app/views/public/page.php';
                break;
            }
        }
        http_response_code(404);
        echo "<h1 style='text-align:center; padding: 100px 20px; font-family: sans-serif;'>Page Not Found (404)</h1>";
        break;
}
