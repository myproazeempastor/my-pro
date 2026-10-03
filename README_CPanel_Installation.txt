========================================================================
AGAPE LIGHT NETWORK — CPANEL PRODUCTION DEPLOYMENT & INSTALLATION GUIDE
========================================================================
Target Environment: Standard cPanel Shared / VPS / Dedicated Hosting
PHP Version Requirement: PHP 8.1, 8.2, or 8.3 (PHP 8.2+ recommended; PHP 7.4+ supported)
Database Requirement: MySQL 5.7+ / 8.0+ / 8.4+ or MariaDB 10.4+
Founder & President: Rev. Azeem Tariq
Scripture Mandate: John 8:12 ("I am the light of the world...")

------------------------------------------------------------------------
STEP-BY-STEP CPANEL DEPLOYMENT & WEB INSTALLER GUIDE
------------------------------------------------------------------------

STEP 1: UPLOADING AND EXTRACTING THE ZIP
1. In cPanel, open "File Manager" and navigate to "public_html" (or your subdomain directory).
2. Click "Upload" and upload the "Agape_Light_Network_cPanel_Production_v1.0.zip" archive.
3. Right-click the uploaded ZIP file in File Manager and select "Extract".
4. Ensure files are extracted directly into "public_html/" (so index.php, .htaccess, install/, and config/ are at the web root).

STEP 2: CREATING THE DATABASE AND DATABASE USER IN CPANEL
1. In cPanel, click "MySQL® Databases" in the "Databases" section.
2. Under "Create New Database", enter a database name (e.g., "agape") and click "Create Database".
   Note your full database name (e.g., "cpaneluser_agape").
3. Scroll down to "MySQL Users" -> "Add New User":
   - Username: e.g., "agapeusr" (full username will be "cpaneluser_agapeusr").
   - Password: Use the "Password Generator" to create a strong password. Save this password securely.
   - Click "Create User".
4. Scroll down to "Add User to Database":
   - Select your user and your database.
   - Click "Add".
   - Check "ALL PRIVILEGES" and click "Make Changes".

STEP 3: OPENING "/install" IN YOUR BROWSER
1. Open your browser and navigate to:
   https://yourdomain.com/install
   (If you deployed to a subfolder, visit: https://yourdomain.com/subfolder/install)
2. You will be greeted by the Agape Light Network Web Installer.

STEP 4: COMPLETING THE 7-STEP INSTALLATION WIZARD
The installer guides you step-by-step without requiring manual editing of PHP files:
- Step 1 (Server Audit): Verifies PHP version, required extensions (pdo_mysql, mbstring, openssl, json, session, curl), and directory write permissions. Click "Proceed to Database Configuration".
- Step 2 (Database Connection): Enter your Database Host (default localhost), Database Name, Username, and Password. Click "Test Connection & Continue".
- Step 3 (Schema Provisioning): Automatically executes schema.sql, creates all database tables, relationships, indexes, and seeds the 4 core frontline initiatives (Clean Water, Brick Kiln Redemption, Urdu Bibles, Medical Care).
- Step 4 (Administrator Account): Enter your Full Name (Rev. Azeem Tariq), Username, Email Address, and choose your secure password. The installer hashes your password with bcrypt.
- Step 5 (Website Configuration): Enter your Site Name, Base URL, Timezone, and Admin Alert Email. The installer automatically writes "config/database.php" and "config/config.php".
- Step 6 (File Permissions): Reviews least privilege permissions (755/644).
- Step 7 (Verification & Seal): The installer verifies live connectivity, seals the installation with "storage/installed.lock" to prevent tampering, and provides direct launch buttons.

STEP 5: SETTING SAFE FILE PERMISSIONS
Follow the principle of least privilege:
1. Standard directories: 755 (rwxr-xr-x)
2. Standard files: 644 (rw-r--r--)
3. Writable directories: 755 or 775 for:
   - storage/
   - storage/logs/
   - storage/cache/
   - uploads/
   Do NOT use 777 (world-writable is insecure and flagged by cPanel security scanners).

STEP 6: LOGGING INTO ADMIN
1. Navigate to:
   https://yourdomain.com/admin
2. Sign in with the username and password you configured during Step 4 of the installer.
3. Access the SuperAdmin Portal to view the verified donation ledger, edit project details, toggle offline payment methods, or purge demo mock records.

STEP 7: ENABLING HTTPS
1. In cPanel, navigate to "SSL/TLS Status" or "Let's Encrypt SSL".
2. Click "Run AutoSSL" to issue a free SSL certificate for your domain.
3. The included ".htaccess" enforces SSL security headers (Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options).

STEP 8: TROUBLESHOOTING INSTALLATION ERRORS
- Problem: "The Admin URL returns 404"
  Fix: The included .htaccess has explicit routing rules (`RewriteRule ^admin/?$ admin/index.php [L,QSA]`) and `DirectoryIndex index.php index.html`. Verify that mod_rewrite is enabled on your host.
- Problem: "White screen on public website"
  Fix: Ensure PHP error logging is checked in "storage/logs/error.log". You can also append `?debug=1` to any URL (e.g. `https://yourdomain.com/?debug=1`) to view diagnostic traces.
- Problem: "Database Connection Failed"
  Fix: Double check that the database user was added to the database with "ALL PRIVILEGES" in cPanel MySQL Databases, and verify host is "localhost" or "127.0.0.1".
- Problem: "Config directory not writable"
  Fix: In cPanel File Manager, ensure `config/` and `storage/` have permissions set to 755.

========================================================================
TECHNICAL INQUIRIES & FRONTLINE MISSION
Founder & President: Rev. Azeem Tariq
Website: https://agapelightnetwork.org
Ministry Email: contact@agapelightnetwork.org
========================================================================
