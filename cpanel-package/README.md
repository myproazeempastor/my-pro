# AGAPE LIGHT NETWORK
### Standalone Dynamic PHP & MySQL Donation and Project Showcase Platform
**Organization:** Agape Light Network  
**Website:** https://agapelightnetwork.org/  
**Founder & President:** Rev. Azeem Tariq  
**Mission:** Spreading light, living love (John 8:12)  
**Architecture:** Pure PHP 8.2+ / MySQL 8.0+ / PDO Prepared Statements / Apache .htaccess  

---

## 1. Hosting & Compatibility Requirements

- **PHP Version:** PHP 8.2 or higher (PHP 8.2, 8.3 compatible).
- **Database:** MySQL 5.7+ / 8.0+ or MariaDB 10.4+.
- **Required PHP Extensions:**
  - `pdo_mysql` (Database communication)
  - `openssl` (Secure cryptographic random token & CSRF generation)
  - `mbstring` (International unicode text handling)
  - `json` (Configuration and API handling)
  - `session` (Secure admin session management)
  - `gd` or `imagick` (Image processing and verification)
  - `curl` (Payment gateway API communication for Stripe / PayPal)
- **Web Server:** Apache with `mod_rewrite` enabled.
- **cPanel Compatibility:** 100% compatible with standard cPanel shared hosting (no SSH access, Node.js, Redis, or Docker required).

---

## 2. cPanel Step-by-Step Installation Guide

### Step 1: Create a MySQL Database in cPanel
1. Log into your cPanel account.
2. In the **Databases** section, click **MySQL® Databases**.
3. Under **Create New Database**, enter a name (e.g., `agape_db`) and click **Create Database**.
4. Scroll to **MySQL Users -> Add New User**:
   - Username: `agape_usr`
   - Password: Use the **Password Generator** to create a strong password (at least 16 characters).
   - Save these credentials securely.
5. Under **Add User to Database**:
   - Select your user and your database.
   - Click **Add**.
   - Check **ALL PRIVILEGES** and click **Make Changes**.

### Step 2: Upload and Extract Application Files
1. In cPanel, navigate to **File Manager**.
2. Go to your web root:
   - For your main domain (`agapelightnetwork.org`), open `public_html/`.
   - For a subdomain or test folder, open that folder.
3. Click **Upload** in the top toolbar.
4. Upload `agape-light-network-cpanel-deployable.zip`.
5. Select the uploaded ZIP file and click **Extract**.
6. Ensure files are directly in `public_html/` (so that `index.php`, `.htaccess`, and `config/` are at the root).

### Step 3: Verify File & Directory Permissions
Ensure permissions are set as follows in cPanel File Manager:
- Standard folders: `755`
- Standard files: `644`
- Writable directories:
  - `storage/logs/`: `755` (or writable by web server)
  - `uploads/`: `755`

### Step 4: Run the Web Installer
1. Open your browser and navigate to:
   ```
   https://agapelightnetwork.org/install/
   ```
2. The installation wizard will run the following automated checks:
   - **Environment Verification:** Validates PHP 8.2+, PDO MySQL, OpenSSL, mbstring, and write permissions.
   - **Database Connection Test:** Enter your DB Host (usually `localhost`), DB Name, DB User, and DB Password.
   - **Database Initialization:** Executes `schema.sql` with transactional safety, creating tables for projects, donations, administrators, pages, and audit logs.
   - **Administrator Setup:** Prompts you to set Rev. Azeem Tariq's primary administrator username, email, and secure password.
   - **Configuration Generation:** Generates the secure `config/config.php` file and touches `storage/installed.lock`.
3. After completion, the installer automatically locks itself. For extra security, delete or rename the `/install` directory in File Manager.

---

## 3. Payment Gateway Configuration (No-Secret Architecture)

The system supports a modular payment integration layer:

1. **Demonstration Mode (Default):**
   - Active out-of-the-box for safe onboarding.
   - Clearly labeled so users know no real money is charged.
   - Validates the entire checkout, reference generation, and receipt workflow.

2. **Bank Wire & Direct Ministry Account:**
   - Configurable in Admin Panel -> Settings.
   - Displays official account title, SWIFT/BIC, and IBAN for international donors (USA, UK, Canada, Australia).
   - Generates a pending donation record with instructions to reference the `ALN-2026-XXXX` serial.

3. **Stripe Integration (When Ready):**
   - Go to Admin Panel -> Payment Settings.
   - Add your Stripe Publishable Key and Secret Key.
   - Webhook endpoint: `https://agapelightnetwork.org/api/webhook/stripe.php`
   - Signatures are cryptographically verified to prevent unauthorized status changes.

4. **PayPal Integration:**
   - Enter your verified PayPal Business Email and Client ID.
   - IPN / Webhook endpoint: `https://agapelightnetwork.org/api/webhook/paypal.php`

---

## 4. Security & Hardening Features

- **Strict Prepared Statements:** All database interactions use PDO with parameterized inputs—100% immune to SQL injection.
- **CSRF Protection:** Synchronizer token pattern with crypto-secure `bin2hex(random_bytes(32))` on all state-changing actions.
- **Session Security:** `session_regenerate_id(true)` upon authentication, `HttpOnly`, `SameSite=Lax`, and `Secure` cookie flags.
- **Upload Hardening:** Uploads directory has a dedicated `.htaccess` blocking direct execution of `.php`, `.phtml`, `.phar`, or `.sh` scripts.
- **Immutable Financial Records:** Financial amounts use `DECIMAL(12,2)`. Currencies are never mixed without verified exchange rates.
- **Audit Logging:** Every administrative action (project edits, manual donation confirmations, settings changes) writes an immutable record to the `audit_logs` table with admin ID, timestamp, and IP address.

---

## 5. Routine Backup and Disaster Recovery

### Database Backup:
In cPanel, click **phpMyAdmin**, select your database, click **Export**, and select **Quick -> SQL**.

### File Backup:
In cPanel **File Manager**, select all files, click **Compress** to create a backup ZIP, and download it locally.
