import React, { useState } from 'react';
import { X, CheckCircle, Database, Shield, Server, ArrowRight, ArrowLeft, Lock, FileCode, Check } from 'lucide-react';

interface InstallerSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallerSimulatorModal: React.FC<InstallerSimulatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [step, setStep] = useState<number>(1);
  const [dbHost, setDbHost] = useState('localhost');
  const [dbPort, setDbPort] = useState('3306');
  const [dbName, setDbName] = useState('cpaneluser_agape');
  const [dbUser, setDbUser] = useState('cpaneluser_agapeusr');
  const [dbPass, setDbPass] = useState('••••••••••••');
  
  const [adminName, setAdminName] = useState('Rev. Azeem Tariq');
  const [adminUser, setAdminUser] = useState('admin');
  const [adminEmail, setAdminEmail] = useState('contact@agapelightnetwork.org');
  const [adminPass, setAdminPass] = useState('AgapeAdmin2026!');
  const [adminPassConfirm, setAdminPassConfirm] = useState('AgapeAdmin2026!');

  const [siteName, setSiteName] = useState('Agape Light Network');
  const [siteUrl, setSiteUrl] = useState('https://agapelightnetwork.org');
  const [timezone, setTimezone] = useState('UTC');

  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const simulateProgress = (nextStep: number, delayMs = 600) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(nextStep);
    }, delayMs);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative bg-slate-900 text-slate-100 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-700">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-sm">
                cPanel Web Installer Simulation (/install)
              </h3>
              <p className="text-[11px] text-amber-300 font-mono">
                7-Step Guided Browser Setup Wizard &bull; Pure PHP & MySQL
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps Tracker */}
        <div className="bg-slate-950/70 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-[11px] font-semibold overflow-x-auto">
          {[
            { num: 1, label: '1. Server' },
            { num: 2, label: '2. Database' },
            { num: 3, label: '3. Tables' },
            { num: 4, label: '4. Admin' },
            { num: 5, label: '5. Site' },
            { num: 6, label: '6. Permissions' },
            { num: 7, label: '7. Complete' }
          ].map(s => (
            <div key={s.num} className="flex items-center gap-1 shrink-0 px-1.5">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                step === s.num ? 'bg-amber-500 text-slate-950 font-bold' : step > s.num ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'
              }`}>
                {step > s.num ? '✓' : s.num}
              </span>
              <span className={step === s.num ? 'text-amber-400 font-bold' : step > s.num ? 'text-emerald-400' : 'text-slate-500'}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Wizard Body */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: Server Requirements Audit */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif font-bold text-white text-base">
                  Step 1: Hosting Environment Audit
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Checking PHP compatibility, required MySQL extensions, and directory write permissions on your cPanel host.
                </p>
              </div>

              <div className="space-y-2 text-xs border border-slate-800 rounded-xl p-4 bg-slate-950/50">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-300">PHP Version &ge; 7.4.0 (Recommended 8.2+)</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> PASS (8.3.4)
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-300">PDO &amp; pdo_mysql Driver</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> PASS
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-300">MBString &amp; UTF-8 Support</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> PASS
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-300">OpenSSL Cryptographic Security</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> PASS
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-300">config/ Directory Writable (chmod 755)</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> PASS
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-300">storage/logs/ Directory Writable (chmod 755)</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> PASS
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-300">Apache mod_rewrite Active</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> PASS
                  </span>
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm"
                >
                  <span>Proceed to Database Setup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Database Credentials */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif font-bold text-white text-base">
                  Step 2: MySQL Database Configuration
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Enter credentials configured in cPanel &rarr; <em>MySQL® Databases</em>. The installer tests connection before proceeding.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-slate-300 mb-1 font-semibold">Database Host</label>
                    <input
                      type="text"
                      value={dbHost}
                      onChange={e => setDbHost(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Port</label>
                    <input
                      type="text"
                      value={dbPort}
                      onChange={e => setDbPort(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Database Name</label>
                  <input
                    type="text"
                    value={dbName}
                    onChange={e => setDbName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                  <span className="text-[11px] text-slate-500 mt-0.5 block">Format in cPanel: cpaneluser_databasename</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Database Username</label>
                    <input
                      type="text"
                      value={dbUser}
                      onChange={e => setDbUser(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Password</label>
                    <input
                      type="password"
                      value={dbPass}
                      onChange={e => setDbPass(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => simulateProgress(3)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm disabled:opacity-50"
                >
                  <span>{isLoading ? 'Testing MySQL Connection...' : 'Test Connection & Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Automatic Database Schema Provisioning */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif font-bold text-white text-base">
                  Step 3: Database Schema Provisioning
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  The installer automatically reads <code>install/schema.sql</code> and creates tables, indexes, and initial data.
                </p>
              </div>

              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2 text-xs">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> Connected to database: {dbName}
                </div>
                <p className="text-slate-300">
                  Target Tables to Provision:
                </p>
                <ul className="list-disc list-inside text-slate-400 space-y-1 ml-2 font-mono text-[11px]">
                  <li>roles &amp; users (Administrative RBAC Access Control)</li>
                  <li>projects (Clean Water, Brick Kiln Rescue, Urdu Bibles, Medical)</li>
                  <li>donations (Verified ledgers with is_demo segregation)</li>
                  <li>site_settings (Social links, manual payment targets, SMTP)</li>
                  <li>audit_logs (Security log trail)</li>
                </ul>
              </div>

              <div className="pt-3 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => simulateProgress(4, 900)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm disabled:opacity-50"
                >
                  <span>{isLoading ? 'Executing schema.sql & Seeding...' : 'Provision Schema & Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Admin Account Creation */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif font-bold text-white text-base">
                  Step 4: Create SuperAdmin Account
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Setup login credentials for Rev. Azeem Tariq or technical staff. Passwords are encrypted using bcrypt.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Full Name</label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={e => setAdminName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Username</label>
                    <input
                      type="text"
                      value={adminUser}
                      onChange={e => setAdminUser(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Email</label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={e => setAdminEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Password</label>
                    <input
                      type="password"
                      value={adminPass}
                      onChange={e => setAdminPass(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Confirm Password</label>
                    <input
                      type="password"
                      value={adminPassConfirm}
                      onChange={e => setAdminPassConfirm(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => simulateProgress(5)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm disabled:opacity-50"
                >
                  <span>{isLoading ? 'Hashing & Storing Admin...' : 'Save Admin Account & Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Website Configuration */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif font-bold text-white text-base">
                  Step 5: Website Configuration
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  The installer automatically writes <code>config/database.php</code> and <code>config/config.php</code> on disk.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Website Name</label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={e => setSiteName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Base URL (Domain or Subfolder)</label>
                  <input
                    type="url"
                    value={siteUrl}
                    onChange={e => setSiteUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Timezone</label>
                    <select
                      value={timezone}
                      onChange={e => setTimezone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="UTC">UTC (Universal Time)</option>
                      <option value="Asia/Karachi">Asia/Karachi (Pakistan PKT)</option>
                      <option value="America/New_York">America/New_York (US Eastern)</option>
                      <option value="Europe/London">Europe/London (GMT/BST)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Default Currency</label>
                    <input
                      type="text"
                      disabled
                      value="USD ($) - Multi-Currency Enabled"
                      className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-slate-400 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => simulateProgress(6)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm disabled:opacity-50"
                >
                  <span>{isLoading ? 'Writing config files...' : 'Save Configuration & Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: File Permissions Audit */}
          {step === 6 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif font-bold text-white text-base">
                  Step 6: Security &amp; Directory Permissions
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Following the principle of least privilege ensures your cPanel hosting account remains secure.
                </p>
              </div>

              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2 text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-1.5">Target</th>
                      <th>Permission</th>
                      <th>Security Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="py-2 text-slate-300">Standard Files (*.php, *.html)</td>
                      <td className="font-mono text-emerald-400 font-bold">644</td>
                      <td className="text-emerald-400 text-[11px]">Least Privilege Safe</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-300">Directories (app/, config/, etc.)</td>
                      <td className="font-mono text-emerald-400 font-bold">755</td>
                      <td className="text-emerald-400 text-[11px]">Protected</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-300">Writable Folders (storage/, uploads/)</td>
                      <td className="font-mono text-amber-400 font-bold">755 or 775</td>
                      <td className="text-slate-400 text-[11px]">Server Writable</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-300">World-Writable Access (777)</td>
                      <td className="font-mono text-rose-400 font-bold">777</td>
                      <td className="text-rose-400 text-[11px]">FORBIDDEN (Insecure)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-3 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => simulateProgress(7, 800)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm disabled:opacity-50"
                >
                  <span>{isLoading ? 'Creating Lock & Finalizing...' : 'Verify & Lock Installation'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: Installation Complete */}
          {step === 7 && (
            <div className="space-y-4 text-center py-2">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-white text-xl">
                Agape Light Network Successfully Installed!
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                The MySQL database is fully populated, the SuperAdmin account is active, and <code>storage/installed.lock</code> has been created to prevent unauthorized access.
              </p>

              <div className="p-4 bg-slate-950/80 rounded-xl text-left text-xs font-mono text-slate-300 space-y-1.5 border border-slate-800">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Database connection verified: {dbName}
                </div>
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Config generated: config/database.php &amp; config/config.php
                </div>
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> SuperAdmin account: {adminUser} ({adminEmail})
                </div>
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Security lock created: storage/installed.lock
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm"
                >
                  Close &amp; Launch Portal
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
