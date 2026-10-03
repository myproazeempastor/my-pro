-- =====================================================================
-- AGAPE LIGHT NETWORK — COMPLETE PRODUCTION DATABASE SCHEMA
-- Organization: Agape Light Network (Rev. Azeem Tariq)
-- Scripture: John 8:12 ("I am the light of the world...")
-- Database Target: MySQL 8.0+ / MariaDB 10.4+
-- Character Set: utf8mb4 / Collation: utf8mb4_unicode_ci
-- =====================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- 1. Table: roles
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `roles` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `description` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO `roles` (`id`, `name`, `description`) VALUES
(1, 'superadmin', 'Full administrative authority and system settings control'),
(2, 'editor', 'Can create and edit pages, projects, and stories'),
(3, 'finance', 'Can view donations, export financial reports, and manage receipts');

-- --------------------------------------------------------
-- 2. Table: users (administrators and staff)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `role_id` INT UNSIGNED NOT NULL DEFAULT 1,
  `username` VARCHAR(60) NOT NULL UNIQUE,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `last_login_at` DATETIME NULL,
  `last_login_ip` VARCHAR(45) NULL,
  `failed_login_attempts` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `locked_until` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT,
  INDEX `idx_username` (`username`),
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 3. Table: pages
-- Supports independent dynamic pages
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `pages` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(120) NOT NULL UNIQUE,
  `title` VARCHAR(200) NOT NULL,
  `subtitle` VARCHAR(255) NULL,
  `hero_image` VARCHAR(255) NULL,
  `hero_tagline` VARCHAR(255) NULL,
  `content` MEDIUMTEXT NULL,
  `status` ENUM('published', 'draft', 'archived') NOT NULL DEFAULT 'published',
  `is_system_page` TINYINT(1) NOT NULL DEFAULT 0,
  `seo_title` VARCHAR(255) NULL,
  `seo_description` TEXT NULL,
  `seo_keywords` VARCHAR(255) NULL,
  `created_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  INDEX `idx_page_slug` (`slug`),
  INDEX `idx_page_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 4. Table: page_sections
-- Modular page builder content blocks (Hero, Text, 2-Col, Stats, Gallery, etc.)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `page_sections` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `page_id` INT UNSIGNED NOT NULL,
  `section_type` ENUM('hero', 'text', 'image_text', 'two_column', 'stats', 'projects_grid', 'donation_cta', 'testimonials', 'stories', 'gallery', 'faq', 'contact') NOT NULL,
  `title` VARCHAR(200) NULL,
  `subtitle` VARCHAR(255) NULL,
  `content` MEDIUMTEXT NULL,
  `media_url` VARCHAR(255) NULL,
  `meta_data` JSON NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_visible` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON DELETE CASCADE,
  INDEX `idx_page_sort` (`page_id`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 5. Table: projects
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(120) NOT NULL UNIQUE,
  `title` VARCHAR(200) NOT NULL,
  `category` VARCHAR(80) NOT NULL,
  `location` VARCHAR(150) NOT NULL,
  `summary` TEXT NOT NULL,
  `description` MEDIUMTEXT NOT NULL,
  `impact_story` MEDIUMTEXT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `goal_amount` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `currency` VARCHAR(3) NOT NULL DEFAULT 'USD',
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `status` ENUM('active', 'completed', 'urgent', 'archived') NOT NULL DEFAULT 'active',
  `start_date` DATE NOT NULL,
  `end_date` DATE NULL,
  `seo_title` VARCHAR(255) NULL,
  `seo_description` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_project_slug` (`slug`),
  INDEX `idx_project_status_featured` (`status`, `is_featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 6. Table: project_images
-- Multiple gallery images per project
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `project_images` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `project_id` INT UNSIGNED NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `caption` VARCHAR(255) NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 7. Table: donations
-- Financial precision: DECIMAL(12,2). Currency stored explicitly.
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `donations` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `reference` VARCHAR(40) NOT NULL UNIQUE,
  `donor_name` VARCHAR(120) NOT NULL,
  `donor_email` VARCHAR(150) NOT NULL,
  `donor_phone` VARCHAR(40) NULL,
  `donor_country` VARCHAR(80) NOT NULL,
  `amount` DECIMAL(12,2) NOT NULL,
  `currency` VARCHAR(3) NOT NULL DEFAULT 'USD',
  `project_id` INT UNSIGNED NULL,
  `payment_method` ENUM('demo', 'card_stripe', 'paypal', 'bank_transfer') NOT NULL,
  `payment_status` ENUM('pending', 'confirmed', 'failed', 'refunded', 'cancelled') NOT NULL DEFAULT 'pending',
  `transaction_id` VARCHAR(120) NULL,
  `is_anonymous` TINYINT(1) NOT NULL DEFAULT 0,
  `notes` TEXT NULL,
  `admin_adjusted` TINYINT(1) NOT NULL DEFAULT 0,
  `receipt_sent_at` DATETIME NULL,
  `confirmed_at` DATETIME NULL,
  `ip_address` VARCHAR(45) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE SET NULL,
  INDEX `idx_don_reference` (`reference`),
  INDEX `idx_don_status` (`payment_status`),
  INDEX `idx_don_project` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 8. Table: payment_transactions
-- Webhook audit events & gateway transaction logs
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `payment_transactions` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `donation_id` INT UNSIGNED NULL,
  `gateway` VARCHAR(50) NOT NULL,
  `event_id` VARCHAR(120) NOT NULL,
  `event_type` VARCHAR(100) NOT NULL,
  `payload` MEDIUMTEXT NULL,
  `status` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`donation_id`) REFERENCES `donations`(`id`) ON DELETE CASCADE,
  INDEX `idx_gateway_event` (`gateway`, `event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 9. Table: navigation_menus
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `navigation_menus` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `location` VARCHAR(50) NOT NULL UNIQUE, -- e.g. 'main_header', 'footer_quick_links', 'footer_policies'
  `title` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 10. Table: navigation_items
-- Supports nested dropdown menus & reordering
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `navigation_items` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `menu_id` INT UNSIGNED NOT NULL,
  `parent_id` INT UNSIGNED NULL,
  `title` VARCHAR(100) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `target` VARCHAR(20) NOT NULL DEFAULT '_self',
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_visible` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`menu_id`) REFERENCES `navigation_menus`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`parent_id`) REFERENCES `navigation_items`(`id`) ON DELETE CASCADE,
  INDEX `idx_menu_sort` (`menu_id`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 11. Table: site_settings
-- Key-value configuration store for branding, header, footer, SMTP, payments
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_settings` (
  `setting_key` VARCHAR(80) PRIMARY KEY,
  `setting_value` TEXT NOT NULL,
  `setting_group` VARCHAR(50) NOT NULL DEFAULT 'general',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 12. Table: media
-- Uploaded image metadata & security verification
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `media` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `file_name` VARCHAR(180) NOT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `mime_type` VARCHAR(60) NOT NULL,
  `file_size` INT UNSIGNED NOT NULL,
  `alt_text` VARCHAR(200) NULL,
  `caption` VARCHAR(255) NULL,
  `uploaded_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 13. Table: contact_messages
-- Stores contact submissions & prayer requests
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(40) NULL,
  `subject` VARCHAR(200) NOT NULL,
  `message` TEXT NOT NULL,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `is_replied` TINYINT(1) NOT NULL DEFAULT 0,
  `ip_address` VARCHAR(45) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 14. Table: audit_logs
-- Immutable security & admin activity log
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NULL,
  `actor_name` VARCHAR(100) NOT NULL,
  `action` VARCHAR(60) NOT NULL,
  `details` TEXT NOT NULL,
  `ip_address` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  INDEX `idx_action` (`action`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================================
-- SEED INITIAL DATA: Pages, Menus, Settings
-- ========================================================

-- Initial Pages
INSERT IGNORE INTO `pages` (`id`, `slug`, `title`, `subtitle`, `hero_image`, `hero_tagline`, `content`, `status`, `is_system_page`, `seo_title`, `seo_description`) VALUES
(1, 'home', 'Agape Light Network', 'Spreading Light, Living Love', 'assets/images/hero-home.jpg', 'Gospel Outreach & Compassionate Relief', 'Welcome to Agape Light Network.', 'published', 1, 'Agape Light Network — Spreading Light, Living Love', 'Official international ministry website of Agape Light Network, led by Rev. Azeem Tariq. Guided by John 8:12.'),
(2, 'about', 'About Agape Light Network', 'Who We Are & Our Calling', 'assets/images/about-hero.jpg', 'Founded & Led by Rev. Azeem Tariq', 'Detailed history and divine calling of Agape Light Network.', 'published', 1, 'About Us — Agape Light Network', 'Learn about Agape Light Network, our founder Rev. Azeem Tariq, and our evangelical humanitarian calling.'),
(3, 'vision', 'Our Vision for the Nations', 'A Future Illuminated by the Light of Life', 'assets/images/vision-hero.jpg', 'Inspiring Long-Term Transformation', 'Comprehensive vision for unreached communities, wells, literacy, and pastoral empowerment.', 'published', 1, 'Our Vision — Agape Light Network', 'Our vision is to see every unreached community touched by the love and light of Jesus Christ.'),
(4, 'mission', 'Our Divine Mission', 'Fulfilling the Great Commission and the Great Commandment', 'assets/images/mission-hero.jpg', 'Faith in Action & Sacrificial Love', 'How we execute water wells, Bibles, medical care, and widow sustenance on the ground.', 'published', 1, 'Our Mission — Agape Light Network', 'Our mission is to spread spiritual light and live Christ’s sacrificial love through active field ministry.'),
(5, 'projects', 'Ministry Projects', 'Active Field Initiatives', 'assets/images/projects-hero.jpg', 'Where Your Support Brings Life', 'Overview of all active clean water, Bible literacy, and healthcare initiatives.', 'published', 1, 'Ministry Projects — Agape Light Network', 'Explore all active humanitarian and gospel initiatives operated by Agape Light Network.'),
(6, 'impact', 'Verified Ministry Impact', 'Transparency in Action', 'assets/images/impact-hero.jpg', 'Audited Records & Real Results', 'Detailed verification of boreholes drilled, Bibles gifted, and families sustained.', 'published', 1, 'Our Impact — Agape Light Network', 'Verified metrics and documented impact reports from Agape Light Network field missions.'),
(7, 'stories', 'Field Updates & Stories', 'Testimonies of God at Work', 'assets/images/stories-hero.jpg', 'Dispatches from the Field', 'Real stories of families receiving clean water and believers holding their first Bible.', 'published', 1, 'Field Stories — Agape Light Network', 'Read authentic testimonies of transformed lives through Agape Light Network.'),
(8, 'donate', 'Support Our Ministry', 'Give with Pure Compassion', 'assets/images/donate-hero.jpg', '100% Direct Field Allocation Pledge', 'Secure contribution portal with multi-currency support and printable receipts.', 'published', 1, 'Donate — Agape Light Network', 'Support clean water wells, Bible distribution, and widow care with secure online giving.'),
(9, 'transparency', 'Financial Transparency & Accountability', 'Our Sacred Duty of Financial Integrity', 'assets/images/transparency-hero.jpg', 'Good Stewards Before God and Donors', 'Designated giving policy, zero embellishment pledge, and independent auditing.', 'published', 1, 'Financial Transparency — Agape Light Network', 'Read our governance charter, financial accountability policies, and designated giving pledge.'),
(10, 'get-involved', 'Get Involved With Our Mission', 'Partnering for Eternity', 'assets/images/involved-hero.jpg', 'Churches, Foundations, and Volunteers', 'Opportunities for prayer partnerships, church sponsorships, and mission mobilization.', 'published', 1, 'Get Involved — Agape Light Network', 'Partner with Agape Light Network as a church, mission group, or prayer warrior.'),
(11, 'contact', 'Contact Our Leadership', 'We Welcome Your Fellowship & Prayer Requests', 'assets/images/contact-hero.jpg', 'Connect With Rev. Azeem Tariq', 'Direct contact form, international helpline, and headquarters location.', 'published', 1, 'Contact Us — Agape Light Network', 'Reach out to Agape Light Network with questions, partnerships, or prayer requests.'),
(12, 'privacy-policy', 'Privacy Policy', 'Data Protection Commitment', NULL, NULL, 'Our international donor privacy commitments and GDPR/CCPA compliance statement.', 'published', 1, 'Privacy Policy — Agape Light Network', 'How Agape Light Network protects your personal information and respects donor privacy.'),
(13, 'donation-policy', 'Donation Policy & Terms of Giving', 'Restricted Giving & Refund Procedures', NULL, NULL, 'Our policy on designated funds, tax acknowledgments, and receipt issuance.', 'published', 1, 'Donation Policy — Agape Light Network', 'Official giving policies and terms for contributors to Agape Light Network.'),
(14, 'terms', 'Terms of Use', 'Website Terms and Conditions', NULL, NULL, 'Standard terms of use governing visitors to agapelightnetwork.org.', 'published', 1, 'Terms of Use — Agape Light Network', 'Terms of use for visitors of the Agape Light Network website.');

-- Initial Navigation Menus
INSERT IGNORE INTO `navigation_menus` (`id`, `location`, `title`) VALUES
(1, 'main_header', 'Main Header Navigation'),
(2, 'footer_quick_links', 'Footer Quick Links'),
(3, 'footer_policies', 'Footer Policies');

-- Main Header Menu Items (with dropdowns!)
INSERT IGNORE INTO `navigation_items` (`id`, `menu_id`, `parent_id`, `title`, `url`, `sort_order`) VALUES
(1, 1, NULL, 'Home', '/', 1),
(2, 1, NULL, 'About Us', '/about', 2),
(3, 1, 2, 'Our Story', '/about', 1),
(4, 1, 2, 'Our Vision', '/vision', 2),
(5, 1, 2, 'Our Mission', '/mission', 3),
(6, 1, NULL, 'Projects', '/projects', 3),
(7, 1, NULL, 'Our Impact', '/impact', 4),
(8, 1, NULL, 'Stories', '/stories', 5),
(9, 1, NULL, 'Transparency', '/transparency', 6),
(10, 1, NULL, 'Get Involved', '/get-involved', 7),
(11, 1, NULL, 'Contact', '/contact', 8);

-- Footer Quick Links
INSERT IGNORE INTO `navigation_items` (`id`, `menu_id`, `parent_id`, `title`, `url`, `sort_order`) VALUES
(12, 2, NULL, 'Our Vision', '/vision', 1),
(13, 2, NULL, 'Our Mission', '/mission', 2),
(14, 2, NULL, 'Ministry Projects', '/projects', 3),
(15, 2, NULL, 'Financial Transparency', '/transparency', 4),
(16, 2, NULL, 'Ways to Get Involved', '/get-involved', 5),
(17, 2, NULL, 'Make a Donation', '/donate', 6);

-- Footer Policy Links
INSERT IGNORE INTO `navigation_items` (`id`, `menu_id`, `parent_id`, `title`, `url`, `sort_order`) VALUES
(18, 3, NULL, 'Privacy Policy', '/privacy-policy', 1),
(19, 3, NULL, 'Donation Policy', '/donation-policy', 2),
(20, 3, NULL, 'Terms of Use', '/terms', 3);

-- Initial Site Settings
INSERT IGNORE INTO `site_settings` (`setting_key`, `setting_value`, `setting_group`) VALUES
('org_name', 'Agape Light Network', 'general'),
('site_tagline', 'Spreading Light, Living Love', 'general'),
('founder_name', 'Rev. Azeem Tariq', 'general'),
('founder_title', 'Founder & President', 'general'),
('scripture_verse', 'I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.', 'general'),
('scripture_ref', 'John 8:12', 'general'),
('contact_email', 'contact@agapelightnetwork.org', 'contact'),
('contact_phone', '+1 (800) 555-ALN8', 'contact'),
('contact_address', 'Agape Light Network International Ministry Center, USA & International Outreaches', 'contact'),
('primary_color', '#0f172a', 'design'),
('accent_color', '#d97706', 'design'),
('default_currency', 'USD', 'donations'),
('supported_currencies', '["USD","GBP","CAD","AUD","EUR"]', 'donations'),
('enable_demo_mode', '1', 'donations'),
('stripe_publishable_key', 'pk_test_sample_agape_light_51Mxyz', 'payments'),
('stripe_secret_key', '', 'payments'),
('paypal_email', 'donations@agapelightnetwork.org', 'payments'),
('paypal_client_id', '', 'payments'),
('bank_name', 'Global Mission Trust Bank', 'banking'),
('bank_account_title', 'Agape Light Network Inc', 'banking'),
('bank_account_number', '409281729018', 'banking'),
('bank_swift_bic', 'AGAPUS33XXX', 'banking'),
('bank_iban', 'US89AGAP0000409281729018', 'banking'),
('smtp_host', 'mail.agapelightnetwork.org', 'smtp'),
('smtp_port', '587', 'smtp'),
('smtp_user', 'notifications@agapelightnetwork.org', 'smtp'),
('smtp_pass', '', 'smtp'),
('smtp_encryption', 'tls', 'smtp');

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
