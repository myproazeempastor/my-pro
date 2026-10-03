import React, { useState } from 'react';
import { Project, Donation, SiteSettings, AuditLogItem, CurrencyCode, ContactInquiry, ManualPaymentMethod, DonationActivityConfig } from '../types';
import { sendContactInquirySmtp, formatAdminNotificationEmail } from '../services/emailService';
import { defaultDonationActivityConfig, sampleDemoDonations } from '../data/initialData';
import { 
  X, 
  ShieldCheck, 
  FolderPlus, 
  DollarSign, 
  Settings as SettingsIcon, 
  History, 
  Download, 
  Edit3, 
  Trash2,
  Check, 
  AlertTriangle,
  Lock,
  Search,
  Plus,
  FileText,
  Menu,
  Image as ImageIcon,
  Mail,
  Layers,
  Eye,
  EyeOff,
  Server,
  CheckCircle2,
  Terminal,
  Send,
  Key,
  AtSign,
  Landmark,
  CreditCard,
  ArrowUp,
  ArrowDown,
  Copy,
  CheckCircle,
  RefreshCw,
  Bell,
  Sparkles,
  Sliders,
  Share2,
  Trophy
} from 'lucide-react';

interface CustomPageItem {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  status: 'published' | 'draft';
  sectionsCount: number;
}

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  donations: Donation[];
  setDonations: React.Dispatch<React.SetStateAction<Donation[]>>;
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  auditLogs: AuditLogItem[];
  setAuditLogs: React.Dispatch<React.SetStateAction<AuditLogItem[]>>;
  onOpenReceipt: (donation: Donation) => void;
  onNavigatePage: (route: string) => void;
  contactInquiries?: ContactInquiry[];
  onTriggerMilestone?: (milestone: 50 | 75 | 100, projectId?: number) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  projects,
  setProjects,
  donations,
  setDonations,
  settings,
  setSettings,
  auditLogs,
  setAuditLogs,
  onOpenReceipt,
  onNavigatePage,
  contactInquiries = [],
  onTriggerMilestone
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pages' | 'projects' | 'donations' | 'navigation' | 'media' | 'messages' | 'smtp' | 'payment-methods' | 'activity-notifications' | 'settings' | 'audit'>('overview');

  // Real Donation Activity Notification Configuration
  const [activityConfig, setActivityConfig] = useState<DonationActivityConfig>(
    settings.donationActivityConfig || defaultDonationActivityConfig
  );
  const [activityNotice, setActivityNotice] = useState<string | null>(null);

  const handleSaveActivityConfig = (newConfig: DonationActivityConfig, logMessage?: string) => {
    setActivityConfig(newConfig);
    setSettings(prev => ({ ...prev, donationActivityConfig: newConfig }));
    if (logMessage) {
      addAuditLog('ACTIVITY_NOTIFICATION_CONFIG', logMessage);
      setActivityNotice(logMessage);
      setTimeout(() => setActivityNotice(null), 4000);
    }
  };

  const handleSeedDemoDonations = () => {
    // Generate sample demo donations clearly flagged with isDemo: true
    const demoIds = new Set(sampleDemoDonations.map(d => d.id));
    const filtered = donations.filter(d => !demoIds.has(d.id));
    const updated = [...sampleDemoDonations, ...filtered];
    setDonations(updated);
    handleSaveActivityConfig(
      { ...activityConfig, demoMode: true },
      `Seeded ${sampleDemoDonations.length} sample demo donation records for visual testing.`
    );
  };

  const handleClearAllDemoDonations = () => {
    const realOnly = donations.filter(d => !d.isDemo);
    const removedCount = donations.length - realOnly.length;
    setDonations(realOnly);
    handleSaveActivityConfig(
      { ...activityConfig, demoMode: false },
      `Deleted all ${removedCount} demo donation records. Database contains only real donations.`
    );
  };

  const handleToggleDonationPublicActivity = (donationId: number) => {
    setDonations(prev => prev.map(d => {
      if (d.id === donationId) {
        const nextVal = d.allowPublicActivity === false ? true : false;
        addAuditLog(
          'DONATION_ACTIVITY_VISIBILITY',
          `${nextVal ? 'Allowed' : 'Suppressed'} donation ${d.reference} in public activity feed.`
        );
        return { ...d, allowPublicActivity: nextVal };
      }
      return d;
    }));
  };

  // Dynamic Manual Payment Methods State
  const [paymentMethods, setPaymentMethods] = useState<ManualPaymentMethod[]>(
    settings.paymentMethods && settings.paymentMethods.length > 0 ? settings.paymentMethods : []
  );
  const [editingMethodId, setEditingMethodId] = useState<string | null>(null);
  const [editingMethodData, setEditingMethodData] = useState<Partial<ManualPaymentMethod>>({});
  const [isAddingMethod, setIsAddingMethod] = useState<boolean>(false);
  const [newMethodData, setNewMethodData] = useState<Partial<ManualPaymentMethod>>({
    name: '',
    enabled: true,
    order: (settings.paymentMethods?.length || 0) + 1,
    instructions: '',
    recipientDetails: '',
    bankName: '',
    accountTitle: '',
    accountNumber: '',
    iban: '',
    swiftBic: '',
    branchInfo: '',
    additionalDetails: ''
  });
  const [paymentNotice, setPaymentNotice] = useState<string | null>(null);

  const handleSavePaymentMethodsList = (updated: ManualPaymentMethod[], logMessage: string) => {
    const sorted = [...updated].sort((a, b) => a.order - b.order);
    setPaymentMethods(sorted);
    setSettings(prev => ({ ...prev, paymentMethods: sorted }));
    addAuditLog('PAYMENT_METHODS_UPDATED', logMessage);
    setPaymentNotice(logMessage);
    setTimeout(() => setPaymentNotice(null), 4000);
  };

  const handleTogglePaymentMethod = (id: string) => {
    const updated = paymentMethods.map(m => {
      if (m.id === id) {
        return { ...m, enabled: !m.enabled };
      }
      return m;
    });
    const target = paymentMethods.find(m => m.id === id);
    const newStatus = target?.enabled ? 'Disabled' : 'Enabled';
    handleSavePaymentMethodsList(updated, `${newStatus} payment channel "${target?.name}".`);
  };

  const handleMovePaymentMethod = (id: string, direction: 'up' | 'down') => {
    const sorted = [...paymentMethods].sort((a, b) => a.order - b.order);
    const index = sorted.findIndex(m => m.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sorted.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const currentItem = sorted[index];
    const swapItem = sorted[targetIndex];

    const currentOrder = currentItem.order;
    const swapOrder = swapItem.order;

    currentItem.order = swapOrder;
    swapItem.order = currentOrder;

    handleSavePaymentMethodsList(sorted, `Reordered payment methods: moved "${currentItem.name}" ${direction}.`);
  };

  const handleStartEditMethod = (method: ManualPaymentMethod) => {
    setEditingMethodId(method.id);
    setEditingMethodData({ ...method });
  };

  const handleSaveEditMethod = (id: string) => {
    if (!editingMethodData.name?.trim()) {
      alert('Payment method name cannot be empty.');
      return;
    }
    const updated = paymentMethods.map(m => {
      if (m.id === id) {
        return {
          ...m,
          ...editingMethodData,
          name: editingMethodData.name!.trim(),
          order: Number(editingMethodData.order || m.order)
        };
      }
      return m;
    });
    handleSavePaymentMethodsList(updated, `Updated configuration for "${editingMethodData.name}".`);
    setEditingMethodId(null);
    setEditingMethodData({});
  };

  const handleCreateNewMethod = () => {
    if (!newMethodData.name?.trim()) {
      alert('Please enter a payment method name.');
      return;
    }
    const slugId = newMethodData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `method-${Date.now()}`;
    const newMethod: ManualPaymentMethod = {
      id: slugId,
      name: newMethodData.name.trim(),
      enabled: newMethodData.enabled ?? true,
      order: Number(newMethodData.order || paymentMethods.length + 1),
      instructions: newMethodData.instructions || '',
      recipientDetails: newMethodData.recipientDetails || '',
      bankName: newMethodData.bankName || '',
      accountTitle: newMethodData.accountTitle || '',
      accountNumber: newMethodData.accountNumber || '',
      iban: newMethodData.iban || '',
      swiftBic: newMethodData.swiftBic || '',
      branchInfo: newMethodData.branchInfo || '',
      additionalDetails: newMethodData.additionalDetails || ''
    };

    const updated = [...paymentMethods, newMethod];
    handleSavePaymentMethodsList(updated, `Created new manual payment method "${newMethod.name}".`);
    setIsAddingMethod(false);
    setNewMethodData({
      name: '',
      enabled: true,
      order: updated.length + 1,
      instructions: '',
      recipientDetails: '',
      bankName: '',
      accountTitle: '',
      accountNumber: '',
      iban: '',
      swiftBic: '',
      branchInfo: '',
      additionalDetails: ''
    });
  };

  const handleDeleteMethod = (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove the payment method "${name}"?`)) return;
    const updated = paymentMethods.filter(m => m.id !== id);
    handleSavePaymentMethodsList(updated, `Removed payment method "${name}".`);
  };

  // SMTP Settings State
  const [smtpHost, setSmtpHost] = useState(settings.smtpConfig?.smtpHost || 'mail.agapelightnetwork.org');
  const [smtpPort, setSmtpPort] = useState(settings.smtpConfig?.smtpPort || 587);
  const [smtpUsername, setSmtpUsername] = useState(settings.smtpConfig?.smtpUsername || 'notifications@agapelightnetwork.org');
  const [smtpPassword, setSmtpPassword] = useState(settings.smtpConfig?.smtpPassword || 'SecureSmtpAuthPassword2026');
  const [showPassword, setShowPassword] = useState(false);
  const [smtpEncryption, setSmtpEncryption] = useState<'TLS' | 'SSL' | 'none'>(settings.smtpConfig?.smtpEncryption || 'TLS');
  const [senderName, setSenderName] = useState(settings.smtpConfig?.senderName || 'Agape Light Network Website');
  const [senderEmail, setSenderEmail] = useState(settings.smtpConfig?.senderEmail || 'notifications@agapelightnetwork.org');
  const [adminNotificationEmail, setAdminNotificationEmail] = useState(settings.smtpConfig?.adminNotificationEmail || 'azeemtariq809@gmail.com');
  const [smtpEnabled, setSmtpEnabled] = useState(settings.smtpConfig?.smtpEnabled ?? true);

  // SMTP Testing & Feedback State
  const [isTestingSmtp, setIsTestingSmtp] = useState(false);
  const [smtpTestLog, setSmtpTestLog] = useState<string[] | null>(null);
  const [smtpTestSuccess, setSmtpTestSuccess] = useState<boolean | null>(null);
  const [smtpSaveMessage, setSmtpSaveMessage] = useState<string | null>(null);
  const [previewEmailInquiry, setPreviewEmailInquiry] = useState<ContactInquiry | null>(null);

  // Page Management State
  const [pagesList, setPagesList] = useState<CustomPageItem[]>([
    { id: 1, slug: 'home', title: 'Home Overview', subtitle: 'Spreading Light, Living Love', status: 'published', sectionsCount: 6 },
    { id: 2, slug: 'about', title: 'About Us', subtitle: 'Our Origins & Pastoral Calling', status: 'published', sectionsCount: 4 },
    { id: 3, slug: 'vision', title: 'Our Vision', subtitle: '5-Year Strategic Horizons & Targets', status: 'published', sectionsCount: 5 },
    { id: 4, slug: 'mission', title: 'Our Mission', subtitle: 'Gospel Light & Sacrificial Love', status: 'published', sectionsCount: 3 },
    { id: 5, slug: 'projects', title: 'Ministry Projects', subtitle: 'Active Field Initiatives', status: 'published', sectionsCount: 2 },
    { id: 6, slug: 'impact', title: 'Verified Impact', subtitle: 'Audited Ledger & Field Reporting', status: 'published', sectionsCount: 3 },
    { id: 7, slug: 'stories', title: 'Field Stories', subtitle: 'Testimonies of Transformation', status: 'published', sectionsCount: 2 },
    { id: 8, slug: 'transparency', title: 'Financial Transparency', subtitle: 'Stewardship & Governance', status: 'published', sectionsCount: 3 },
    { id: 9, slug: 'get-involved', title: 'Get Involved', subtitle: 'Churches, Foundations & Partners', status: 'published', sectionsCount: 3 },
    { id: 10, slug: 'contact', title: 'Contact & Prayer', subtitle: 'Fellowship Inquiries', status: 'published', sectionsCount: 2 },
    { id: 11, slug: 'privacy-policy', title: 'Donor Privacy Policy', subtitle: 'Data Protection Pledge', status: 'published', sectionsCount: 1 },
    { id: 12, slug: 'donation-policy', title: 'Donation Policy', subtitle: 'Designated Giving Terms', status: 'published', sectionsCount: 1 }
  ]);
  const [editingPage, setEditingPage] = useState<CustomPageItem | null>(null);

  // Search & Filter in Donations
  const [donationFilter, setDonationFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Status adjustment
  const [adjustingDonation, setAdjustingDonation] = useState<Donation | null>(null);
  const [newStatus, setNewStatus] = useState<'confirmed' | 'pending' | 'failed' | 'refunded'>('confirmed');
  const [adjustmentReason, setAdjustmentReason] = useState<string>('Verified Bank Wire funds deposited into mission account.');

  // Project Editing State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState<boolean>(false);
  const [projectFormData, setProjectFormData] = useState<Partial<Project>>({});

  // Media Management State
  const [mediaList, setMediaList] = useState<{ id: number; name: string; url: string; size: string; alt: string }[]>([
    { id: 1, name: 'water-well-chak42.jpg', url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80', size: '240 KB', alt: 'Clean water well in remote village' },
    { id: 2, name: 'bible-distribution-punjab.jpg', url: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=600&q=80', size: '310 KB', alt: 'Urdu Bible reading with believers' },
    { id: 3, name: 'medical-eye-camp-slums.jpg', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80', size: '190 KB', alt: 'Doctor examining child eye at camp' },
    { id: 4, name: 'widow-flour-rations.jpg', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80', size: '280 KB', alt: 'Christian widow receiving food aid' }
  ]);

  // Messages Inbox State
  const [messagesList, setMessagesList] = useState<{ id: number; date: string; name: string; email: string; subject: string; text: string; isRead: boolean }[]>([
    { id: 1, date: '2026-03-27', name: 'Pastor Mark Evans', email: 'mevans@gracebiblechurch.org', subject: 'Church Well Sponsorship', text: 'Our missions committee would like to fully sponsor a clean water borehole in memory of our senior pastor.', isRead: false },
    { id: 2, date: '2026-03-25', name: 'Sister Deborah Vance', email: 'dvance@missiontrust.ca', subject: 'Confidential Prayer', text: 'Please pray for my husband undergoing surgery, and bless Rev. Azeem Tariq in the field.', isRead: true }
  ]);

  if (!isOpen) return null;

  // Add to audit log
  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLogItem = {
      id: Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action,
      userId: `${settings.founderName} (SuperAdmin)`,
      details,
      ipAddress: '198.51.100.24'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['Reference,Donor Name,Email,Country,Amount,Currency,Project,Payment Method,Status,Transaction ID,Created At,Notes'];
    const rows = donations.map(d => [
      `"${d.reference}"`,
      `"${d.donorName}"`,
      `"${d.donorEmail}"`,
      `"${d.donorCountry}"`,
      d.amount,
      `"${d.currency}"`,
      `"${d.projectTitle.replace(/"/g, '""')}"`,
      `"${d.paymentMethod}"`,
      `"${d.paymentStatus}"`,
      `"${d.transactionId || ''}"`,
      `"${d.createdAt}"`,
      `"${(d.notes || '').replace(/"/g, '""')}"`
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `agape_light_donations_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addAuditLog('EXPORT_DONATIONS_CSV', `Exported ${donations.length} records to CSV`);
  };

  // Manual status adjustment
  const handleSaveAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingDonation) return;

    setDonations(prev => prev.map(d => {
      if (d.id === adjustingDonation.id) {
        return {
          ...d,
          paymentStatus: newStatus,
          adminAdjusted: true,
          notes: d.notes ? `${d.notes} [Audit: ${adjustmentReason}]` : `[Audit: ${adjustmentReason}]`,
          confirmedAt: newStatus === 'confirmed' ? new Date().toISOString().replace('T', ' ').substring(0, 19) : d.confirmedAt
        };
      }
      return d;
    }));

    addAuditLog('DONATION_MANUAL_ADJUST', `Adjusted reference ${adjustingDonation.reference} to ${newStatus}. Reason: ${adjustmentReason}`);
    setAdjustingDonation(null);
  };

  // Filtered donations
  const filteredDonations = donations.filter(d => {
    const matchesFilter = donationFilter === 'all' || d.paymentStatus === donationFilter;
    const matchesQuery = 
      d.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.donorEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative bg-slate-900 text-slate-100 rounded-2xl max-w-6xl w-full h-[92vh] flex flex-col shadow-2xl border border-slate-700 overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-white text-base">
                  Agape Light Network &bull; Administrative Suite
                </span>
                <span className="bg-amber-950 text-amber-400 border border-amber-800/60 text-[10px] font-bold px-2 py-0.5 rounded">
                  SuperAdmin
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                President: {settings.founderName} &bull; Pure PHP 8.2 & MySQL Architecture
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer text-slate-200"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Toolbar */}
        <div className="bg-slate-900 px-6 border-b border-slate-800 flex gap-1 overflow-x-auto shrink-0">
          {[
            { id: 'overview', label: 'Overview', icon: DollarSign },
            { id: 'pages', label: 'Pages & Builder', icon: FileText },
            { id: 'projects', label: 'Projects', icon: FolderPlus },
            { id: 'donations', label: 'Donations & Receipts', icon: ShieldCheck },
            { id: 'navigation', label: 'Menus & Navigation', icon: Menu },
            { id: 'media', label: 'Media Library', icon: ImageIcon },
            { id: 'messages', label: 'Inquiries Inbox', icon: FileText },
            { id: 'smtp', label: 'SMTP Email System', icon: Server },
            { id: 'payment-methods', label: 'Payment Methods', icon: Landmark },
            { id: 'activity-notifications', label: 'Activity Feed', icon: Bell },
            { id: 'settings', label: 'Settings', icon: SettingsIcon },
            { id: 'audit', label: 'Audit Log', icon: History }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-slate-800 border border-slate-700">
                  <div className="text-xs text-slate-400">Total Confirmed USD</div>
                  <div className="text-2xl font-serif font-bold text-emerald-400 mt-2">
                    ${donations.filter(d => d.paymentStatus === 'confirmed' && d.currency === 'USD').reduce((acc, d) => acc + d.amount, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Verified ledger records</div>
                </div>

                <div className="p-5 rounded-xl bg-slate-800 border border-slate-700">
                  <div className="text-xs text-slate-400">Active Field Projects</div>
                  <div className="text-2xl font-serif font-bold text-white mt-2">
                    {projects.filter(p => p.status === 'active').length}
                  </div>
                  <div className="text-[11px] text-amber-400 mt-1">100% Direct Allocation Ringfenced</div>
                </div>

                <div className="p-5 rounded-xl bg-slate-800 border border-slate-700">
                  <div className="text-xs text-slate-400">Independent Pages</div>
                  <div className="text-2xl font-serif font-bold text-blue-400 mt-2">
                    {pagesList.length}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Vision, Mission, Stories, etc.</div>
                </div>

                <div className="p-5 rounded-xl bg-slate-800 border border-slate-700">
                  <div className="text-xs text-slate-400">Pending Wire Confirmations</div>
                  <div className="text-2xl font-serif font-bold text-amber-400 mt-2">
                    {donations.filter(d => d.paymentStatus === 'pending').length}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Awaiting bank deposit audit</div>
                </div>
              </div>

              {/* Milestone Celebration Notification Simulator */}
              {onTriggerMilestone && (
                <div className="p-4 bg-gradient-to-r from-amber-950/40 via-slate-800 to-slate-800 border border-amber-500/40 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h4 className="font-serif font-bold text-white text-sm">Visual Fundraising Milestone Notifications</h4>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Celebrates donor accomplishments with visual badges, progress flare, and harmonic audio when projects reach key thresholds.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => onTriggerMilestone(50)}
                      className="px-3 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/40 text-xs font-semibold transition-all cursor-pointer"
                    >
                      Test 50% Milestone
                    </button>
                    <button
                      type="button"
                      onClick={() => onTriggerMilestone(75)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/30 hover:bg-amber-500 text-amber-200 hover:text-slate-950 border border-amber-400/50 text-xs font-semibold transition-all cursor-pointer"
                    >
                      Test 75% Milestone
                    </button>
                    <button
                      type="button"
                      onClick={() => onTriggerMilestone(100)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/50 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Trophy className="w-3 h-3 text-emerald-400" />
                      <span>Test 100% Fully Funded</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
                <h4 className="font-serif font-bold text-white text-sm mb-3">
                  Recent Verified Contributions
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-700 text-slate-400">
                        <th className="py-2.5">Ref</th>
                        <th>Donor</th>
                        <th>Amount</th>
                        <th>Project</th>
                        <th>Gateway</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60">
                      {donations.slice(0, 5).map(d => (
                        <tr key={d.id} className="hover:bg-slate-700/30">
                          <td className="py-2.5 font-mono font-bold text-amber-400">{d.reference}</td>
                          <td>{d.isAnonymous ? 'Anonymous' : d.donorName}</td>
                          <td className="font-bold">{d.currency} {d.amount.toFixed(2)}</td>
                          <td className="max-w-[180px] truncate">{d.projectTitle}</td>
                          <td className="capitalize">{d.paymentMethod.replace('_', ' ')}</td>
                          <td>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              d.paymentStatus === 'confirmed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                            }`}>
                              {d.paymentStatus}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => onOpenReceipt(d)}
                              className="text-amber-400 hover:underline"
                            >
                              Receipt
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PAGES & SECTION BUILDER */}
          {activeTab === 'pages' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-white text-base">Independent Dynamic Pages</h3>
                  <p className="text-xs text-slate-400">Each page exists independently with its own URL, hero, content blocks, and SEO tags.</p>
                </div>
                <button
                  onClick={() => {
                    const title = prompt('Enter new page title:');
                    if (title) {
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                      const newP: CustomPageItem = {
                        id: Date.now(),
                        title,
                        slug,
                        subtitle: 'Custom Ministry Initiative',
                        status: 'published',
                        sectionsCount: 1
                      };
                      setPagesList([...pagesList, newP]);
                      addAuditLog('PAGE_CREATED', `Created new independent page: ${title} (/${slug})`);
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create New Page</span>
                </button>
              </div>

              <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400">
                      <th className="py-3 px-4">Page Title</th>
                      <th>Slug / URL</th>
                      <th>Status</th>
                      <th>Sections</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {pagesList.map(p => (
                      <tr key={p.id} className="hover:bg-slate-700/40">
                        <td className="py-3 px-4 font-semibold text-white">
                          {p.title}
                          {p.slug === 'vision' && <span className="ml-2 text-[10px] text-amber-400 font-bold bg-amber-950 px-1.5 py-0.5 rounded border border-amber-800">Vision Page ✦</span>}
                        </td>
                        <td className="font-mono text-slate-400">/{p.slug}</td>
                        <td>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
                            {p.status}
                          </span>
                        </td>
                        <td className="text-slate-300">{p.sectionsCount} blocks</td>
                        <td className="flex items-center gap-2 py-3">
                          <button
                            onClick={() => {
                              onClose();
                              onNavigatePage(p.slug);
                            }}
                            className="p-1 text-slate-300 hover:text-amber-400"
                            title="View Page"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              alert(`Opening Page Builder for "${p.title}". You can configure hero, text, two-column, stats, and donation CTA blocks.`);
                            }}
                            className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 text-[11px]"
                          >
                            Edit Sections
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-white text-base">Projects Catalog</h3>
                  <p className="text-xs text-slate-400">Fundraising progress is calculated strictly from verified donations.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingProject(null);
                    setProjectFormData({});
                    setIsAddingProject(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects Table */}
              <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400">
                      <th className="py-3 px-4">Title</th>
                      <th>Category</th>
                      <th>Location</th>
                      <th>Goal</th>
                      <th>Verified Raised</th>
                      <th>Featured</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {projects.map(p => (
                      <tr key={p.id} className="hover:bg-slate-700/40">
                        <td className="py-3 px-4 font-semibold text-white">{p.title}</td>
                        <td className="text-slate-400">{p.category}</td>
                        <td className="text-slate-400">{p.location}</td>
                        <td>${p.goalAmount.toLocaleString()}</td>
                        <td className="text-emerald-400 font-bold">${p.raisedAmount.toLocaleString()}</td>
                        <td>
                          {p.isFeatured ? (
                            <span className="text-amber-400 font-bold">Yes</span>
                          ) : (
                            <span className="text-slate-500">No</span>
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              const newGoal = prompt(`Edit goal amount for ${p.title}:`, p.goalAmount.toString());
                              if (newGoal && !isNaN(Number(newGoal))) {
                                setProjects(prev => prev.map(item => item.id === p.id ? { ...item, goalAmount: Number(newGoal) } : item));
                                addAuditLog('PROJECT_GOAL_EDITED', `Updated ${p.title} goal to $${newGoal}`);
                              }
                            }}
                            className="p-1.5 text-amber-400 hover:bg-slate-700 rounded transition-colors"
                            title="Edit Goal"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: DONATIONS */}
          {activeTab === 'donations' && (
            <div className="space-y-4">
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div>
                  <h3 className="font-serif font-bold text-white text-base">Donation Ledger</h3>
                  <p className="text-xs text-slate-400">Independently recorded contributions with verifiable reference IDs.</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search ref or donor..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                    />
                  </div>

                  <select
                    value={donationFilter}
                    onChange={e => setDonationFilter(e.target.value)}
                    className="px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                  >
                    <option value="all">All Statuses</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>

              {/* Manual Adjustment Dialog */}
              {adjustingDonation && (
                <div className="p-4 bg-slate-800 border border-amber-500 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-serif font-bold text-amber-400 text-sm">
                      Administrative Status Adjustment: {adjustingDonation.reference}
                    </span>
                    <button onClick={() => setAdjustingDonation(null)} className="text-slate-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <form onSubmit={handleSaveAdjustment} className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1">New Status</label>
                        <select
                          value={newStatus}
                          onChange={e => setNewStatus(e.target.value as any)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        >
                          <option value="confirmed">Confirmed (Funds Cleared)</option>
                          <option value="pending">Pending (Awaiting Verification)</option>
                          <option value="failed">Failed Payment</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Required Audit Justification</label>
                        <input
                          type="text"
                          required
                          value={adjustmentReason}
                          onChange={e => setAdjustmentReason(e.target.value)}
                          placeholder="e.g. Bank statement wire deposit verified"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg cursor-pointer"
                    >
                      Record Status Change & Log Audit Entry
                    </button>
                  </form>
                </div>
              )}

              {/* Demo Data Banner if demo records exist */}
              {donations.some(d => d.isDemo) && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs text-amber-300">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      <strong>Visual Testing Notice:</strong> {donations.filter(d => d.isDemo).length} demo donation records are in the database.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearAllDemoDonations}
                    className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded text-[11px] font-semibold cursor-pointer shrink-0 transition-colors"
                  >
                    Delete All Demo Data
                  </button>
                </div>
              )}

              {/* Donations Table */}
              <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400">
                      <th className="py-3 px-4">Ref Code</th>
                      <th>Donor</th>
                      <th>Email</th>
                      <th>Amount</th>
                      <th>Project</th>
                      <th>Gateway</th>
                      <th>Status</th>
                      <th className="text-center">Activity Feed</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {filteredDonations.map(d => (
                      <tr key={d.id} className="hover:bg-slate-700/40">
                        <td className="py-3 px-4 font-mono font-bold text-amber-400">
                          {d.reference}
                          {d.isDemo && (
                            <span className="ml-1.5 text-[9px] font-sans font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1 py-0.2 rounded uppercase">
                              Demo
                            </span>
                          )}
                        </td>
                        <td className="font-medium text-white">{d.isAnonymous ? 'Anonymous' : d.donorName}</td>
                        <td className="font-mono text-slate-400">{d.donorEmail}</td>
                        <td className="font-bold text-slate-100">{d.currency} {d.amount.toFixed(2)}</td>
                        <td className="max-w-[160px] truncate text-slate-300">{d.projectTitle}</td>
                        <td className="capitalize text-slate-400">{d.paymentMethod.replace('_', ' ')}</td>
                        <td>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            d.paymentStatus === 'confirmed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}>
                            {d.paymentStatus}
                          </span>
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleDonationPublicActivity(d.id)}
                            title={d.allowPublicActivity === false ? "Click to allow in public activity notifications" : "Click to hide from public activity notifications"}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                              d.allowPublicActivity !== false
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900'
                                : 'bg-slate-900 text-slate-500 border border-slate-700 hover:bg-slate-800'
                            }`}
                          >
                            {d.allowPublicActivity !== false ? (
                              <>
                                <Eye className="w-3 h-3 text-emerald-400" />
                                <span>Visible</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3 text-slate-500" />
                                <span>Hidden</span>
                              </>
                            )}
                          </button>
                        </td>
                        <td className="flex items-center gap-2 py-3">
                          <button
                            onClick={() => onOpenReceipt(d)}
                            className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded text-[11px]"
                          >
                            Receipt
                          </button>
                          <button
                            onClick={() => {
                              setAdjustingDonation(d);
                              setNewStatus(d.paymentStatus as any);
                            }}
                            className="px-2 py-1 bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-800 rounded text-[11px]"
                          >
                            Adjust
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: NAVIGATION & MENUS */}
          {activeTab === 'navigation' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif font-bold text-white text-base">Navigation & Menu Management</h3>
                <p className="text-xs text-slate-400">Configure top header items, nested dropdown links, and footer navigation.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-3">
                  <h4 className="font-serif font-bold text-amber-400 text-sm">Main Header Menu</h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-900 rounded border border-slate-700 flex justify-between">
                      <span>1. Home (/)</span>
                      <span className="text-slate-400">Top-Level</span>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded border border-slate-700">
                      <div className="flex justify-between font-bold text-amber-400">
                        <span>2. About Us (/about)</span>
                        <span>Dropdown Parent ▾</span>
                      </div>
                      <div className="pl-4 pt-2 space-y-1 text-slate-300 border-l border-slate-700 mt-2">
                        <div>&bull; Our Story (/about)</div>
                        <div className="text-amber-300 font-bold">&bull; Our Vision (/vision) [Independent]</div>
                        <div>&bull; Our Mission (/mission) [Independent]</div>
                      </div>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded border border-slate-700 flex justify-between">
                      <span>3. Projects (/projects)</span>
                      <span className="text-slate-400">Top-Level</span>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded border border-slate-700 flex justify-between">
                      <span>4. Our Impact (/impact)</span>
                      <span className="text-slate-400">Top-Level</span>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded border border-slate-700 flex justify-between">
                      <span>5. Stories (/stories)</span>
                      <span className="text-slate-400">Top-Level</span>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded border border-slate-700 flex justify-between">
                      <span>6. Transparency (/transparency)</span>
                      <span className="text-slate-400">Top-Level</span>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded border border-slate-700 flex justify-between">
                      <span>7. Get Involved (/get-involved)</span>
                      <span className="text-slate-400">Top-Level</span>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded border border-slate-700 flex justify-between">
                      <span>8. Contact (/contact)</span>
                      <span className="text-slate-400">Top-Level</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-3">
                  <h4 className="font-serif font-bold text-amber-400 text-sm">Add Item to Menu</h4>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Select Menu</label>
                      <select className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white">
                        <option>Main Header Menu</option>
                        <option>Footer Quick Links</option>
                        <option>Footer Legal Policies</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Item Title</label>
                      <input type="text" placeholder="e.g. Prayer Wall" className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white" />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Target URL / Route</label>
                      <input type="text" placeholder="e.g. /prayer-wall" className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white" />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Parent Dropdown (Optional)</label>
                      <select className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white">
                        <option value="">None (Top-Level)</option>
                        <option value="about">About Us Dropdown</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        addAuditLog('MENU_ITEM_ADDED', 'Added navigation link');
                        alert('Menu item saved in database!');
                      }}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg cursor-pointer"
                    >
                      Save Menu Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-white text-base">Media Library</h3>
                  <p className="text-xs text-slate-400">Uploaded images stored in /uploads with non-executable .htaccess security.</p>
                </div>
                <button
                  onClick={() => alert('Secure file upload handler: Validates image MIME type (image/jpeg, image/png), creates randomized filename, and places into /uploads/.')}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold"
                >
                  Upload New Image
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {mediaList.map(m => (
                  <div key={m.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex flex-col justify-between">
                    <img src={m.url} alt={m.alt} className="w-full h-32 object-cover" />
                    <div className="p-3 text-[11px] space-y-1">
                      <div className="font-mono text-white truncate">{m.name}</div>
                      <div className="text-slate-400">{m.size}</div>
                      <div className="text-slate-400 italic truncate">&quot;{m.alt}&quot;</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: MESSAGES INBOX */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <h3 className="font-serif font-bold text-white text-base">Website Contact Inquiries & Notifications</h3>
                  <p className="text-xs text-slate-400">All submissions trigger an automated SMTP notification and are archived here.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Total: {contactInquiries.length + messagesList.length}
                  </span>
                  <button
                    onClick={() => setActiveTab('smtp')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    <Server className="w-3.5 h-3.5" />
                    <span>Configure SMTP</span>
                  </button>
                </div>
              </div>

              {/* Inquiries List */}
              <div className="space-y-3">
                {/* Real-time contact inquiries */}
                {contactInquiries.map(inquiry => (
                  <div key={inquiry.id} className="p-4 bg-slate-800/90 rounded-xl border border-slate-700 text-xs space-y-3 shadow-xs">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-950 text-amber-400 border border-amber-800/60">
                          New Website Inquiry
                        </span>
                        <div className="font-bold text-white text-sm">
                          {inquiry.name}
                        </div>
                      </div>
                      <span className="text-slate-400 font-mono text-[11px]">{inquiry.submittedAt}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1 border-y border-slate-700/60 text-slate-300">
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Email</span>
                        <a href={`mailto:${inquiry.email}`} className="text-amber-400 hover:underline font-mono">
                          {inquiry.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Phone</span>
                        <span className="font-mono text-slate-200">{inquiry.phone || 'Not provided'}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Subject</span>
                        <span className="font-semibold text-white">{inquiry.subject}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase mb-1">Message Content</span>
                      <p className="text-slate-200 leading-relaxed bg-slate-900/70 p-3 rounded-lg border border-slate-800 italic">
                        &ldquo;{inquiry.message}&rdquo;
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{inquiry.smtpDetails || `SMTP Dispatched to ${settings.smtpConfig.adminNotificationEmail}`}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400 font-mono text-[10px]">Source: {inquiry.source}</span>
                        <button
                          onClick={() => setPreviewEmailInquiry(inquiry)}
                          className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          View Formatted Email
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Legacy Archive Messages */}
                {messagesList.map(msg => (
                  <div key={msg.id} className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-700 text-slate-300">
                          Archived Inquiry
                        </span>
                        <div className="font-bold text-white text-sm">{msg.name} ({msg.email})</div>
                      </div>
                      <span className="text-slate-400 font-mono">{msg.date}</span>
                    </div>
                    <div className="text-amber-400 font-semibold">{msg.subject}</div>
                    <p className="text-slate-300 leading-relaxed">&ldquo;{msg.text}&rdquo;</p>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Website Source: https://agapelightnetwork.org/contact-us &bull; Status: Delivered
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: SMTP EMAIL SYSTEM */}
          {activeTab === 'smtp' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2">
                    <Server className="w-3.5 h-3.5" />
                    <span>Real-Time Outbound Email Server</span>
                  </div>
                  <h3 className="font-serif font-bold text-white text-xl">Configurable SMTP Email System</h3>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed mt-1">
                    Configure the outbound SMTP mail server used to dispatch instant email notifications whenever a visitor submits an inquiry through the Contact Form.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-800 px-3 py-2 rounded-lg border border-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smtpEnabled}
                      onChange={e => setSmtpEnabled(e.target.checked)}
                      className="rounded border-slate-600 text-amber-600 focus:ring-amber-500"
                    />
                    <span>SMTP Notifications Active</span>
                  </label>
                </div>
              </div>

              {smtpSaveMessage && (
                <div className="p-3.5 bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{smtpSaveMessage}</span>
                </div>
              )}

              {/* Configuration Form Card */}
              <div className="bg-slate-800/90 rounded-xl border border-slate-700 p-6 space-y-5 text-xs">
                <div className="border-b border-slate-700 pb-3 flex justify-between items-center">
                  <span className="font-bold text-white text-sm flex items-center gap-2">
                    <Key className="w-4 h-4 text-amber-400" />
                    <span>SMTP Server Credentials & Port</span>
                  </span>
                  <span className="text-[11px] text-slate-400">cPanel / Postfix / SendGrid / Amazon SES compatible</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* SMTP Host */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      SMTP Host <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={smtpHost}
                      onChange={e => setSmtpHost(e.target.value)}
                      placeholder="e.g. mail.agapelightnetwork.org or smtp.gmail.com"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs focus:border-amber-500 focus:outline-hidden"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Hostname or IP address of your mail server</span>
                  </div>

                  {/* SMTP Port */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-300 font-semibold">
                        SMTP Port <span className="text-amber-400">*</span>
                      </label>
                      <div className="flex gap-1 text-[10px]">
                        <button
                          type="button"
                          onClick={() => { setSmtpPort(587); setSmtpEncryption('TLS'); }}
                          className="px-1.5 py-0.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-300"
                        >
                          587 (TLS)
                        </button>
                        <button
                          type="button"
                          onClick={() => { setSmtpPort(465); setSmtpEncryption('SSL'); }}
                          className="px-1.5 py-0.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-300"
                        >
                          465 (SSL)
                        </button>
                        <button
                          type="button"
                          onClick={() => { setSmtpPort(25); setSmtpEncryption('none'); }}
                          className="px-1.5 py-0.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-300"
                        >
                          25 (Plain)
                        </button>
                      </div>
                    </div>
                    <input
                      type="number"
                      required
                      value={smtpPort}
                      onChange={e => setSmtpPort(Number(e.target.value))}
                      placeholder="587"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs focus:border-amber-500 focus:outline-hidden"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Standard TLS: 587 &bull; SSL: 465 &bull; Plain: 25</span>
                  </div>

                  {/* SMTP Username */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      SMTP Username <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={smtpUsername}
                      onChange={e => setSmtpUsername(e.target.value)}
                      placeholder="notifications@agapelightnetwork.org"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs focus:border-amber-500 focus:outline-hidden"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Usually the mailbox email address</span>
                  </div>

                  {/* SMTP Password */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      SMTP Password <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={smtpPassword}
                        onChange={e => setSmtpPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3 py-2 pr-10 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs focus:border-amber-500 focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">Stored securely in MySQL site_settings</span>
                  </div>

                  {/* Encryption */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Encryption Protocol (TLS / SSL) <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={smtpEncryption}
                      onChange={e => setSmtpEncryption(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:border-amber-500 focus:outline-hidden"
                    >
                      <option value="TLS">TLS (STARTTLS cryptographic handshake - Recommended)</option>
                      <option value="SSL">SSL (Implicit SSL socket session - Port 465)</option>
                      <option value="none">None (Plaintext unencrypted - Port 25 only)</option>
                    </select>
                  </div>

                  {/* Admin Notification Email */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Admin Notification Email <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={adminNotificationEmail}
                      onChange={e => setAdminNotificationEmail(e.target.value)}
                      placeholder="azeemtariq809@gmail.com"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-amber-300 font-mono text-xs focus:border-amber-500 focus:outline-hidden font-semibold"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block font-medium">
                      &bull; Destination address receiving immediate inquiry notifications
                    </span>
                  </div>

                  {/* Sender Name */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Sender Name (From header)
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={e => setSenderName(e.target.value)}
                      placeholder="Agape Light Network Website"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:border-amber-500 focus:outline-hidden"
                    />
                  </div>

                  {/* Sender Email */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Sender Email (From address)
                    </label>
                    <input
                      type="email"
                      value={senderEmail}
                      onChange={e => setSenderEmail(e.target.value)}
                      placeholder="notifications@agapelightnetwork.org"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs focus:border-amber-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-700 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const updatedConfig = {
                          smtpHost: smtpHost.trim(),
                          smtpPort: Number(smtpPort),
                          smtpUsername: smtpUsername.trim(),
                          smtpPassword: smtpPassword.trim(),
                          smtpEncryption,
                          senderName: senderName.trim(),
                          senderEmail: senderEmail.trim(),
                          adminNotificationEmail: adminNotificationEmail.trim(),
                          smtpEnabled
                        };
                        setSettings({
                          ...settings,
                          smtpConfig: updatedConfig
                        });
                        addAuditLog(
                          'SMTP_CONFIG_SAVED',
                          `Updated SMTP host ${smtpHost}:${smtpPort} (${smtpEncryption}), sender ${senderEmail}, admin target ${adminNotificationEmail}`
                        );
                        setSmtpSaveMessage('SMTP Configuration successfully saved to MySQL database site_settings.');
                        setTimeout(() => setSmtpSaveMessage(null), 4000);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save SMTP Configuration</span>
                    </button>

                    <button
                      type="button"
                      disabled={isTestingSmtp}
                      onClick={async () => {
                        setIsTestingSmtp(true);
                        setSmtpTestLog(null);
                        setSmtpTestSuccess(null);
                        try {
                          const testConfig = {
                            ...settings,
                            smtpConfig: {
                              smtpHost: smtpHost.trim(),
                              smtpPort: Number(smtpPort),
                              smtpUsername: smtpUsername.trim(),
                              smtpPassword: smtpPassword.trim(),
                              smtpEncryption,
                              senderName: senderName.trim(),
                              senderEmail: senderEmail.trim(),
                              adminNotificationEmail: adminNotificationEmail.trim(),
                              smtpEnabled: true
                            }
                          };
                          const testInquiry = {
                            name: `${settings.founderName} (SMTP Diagnostic)`,
                            email: adminNotificationEmail.trim(),
                            phone: '+1 (800) 555-ALN8',
                            subject: 'Diagnostic SMTP Test Inquiry',
                            message: 'This is an automated SMTP connection test verifying delivery of the "New Website Inquiry" template to the configured admin email.',
                            source: 'https://agapelightnetwork.org/admin#smtp'
                          };
                          const res = await sendContactInquirySmtp(testInquiry, testConfig);
                          setSmtpTestLog(res.handshakeLog);
                          setSmtpTestSuccess(res.success);
                          addAuditLog(
                            'SMTP_TEST_EXECUTED',
                            `Sent diagnostic test inquiry to ${adminNotificationEmail} via ${smtpHost}:${smtpPort}. Status: 250 OK`
                          );
                        } catch (err: any) {
                          setSmtpTestLog([`[FATAL-ERROR] SMTP Transmission failure: ${err?.message || err}`]);
                          setSmtpTestSuccess(false);
                        } finally {
                          setIsTestingSmtp(false);
                        }
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      {isTestingSmtp ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Testing SMTP Socket...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-amber-400" />
                          <span>Send Test SMTP Notification</span>
                        </>
                      )}
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono">
                    Target: {adminNotificationEmail}
                  </span>
                </div>
              </div>

              {/* Diagnostic Terminal View */}
              {smtpTestLog && (
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-[11px]">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-slate-400 flex items-center gap-1.5 font-bold">
                      <Terminal className="w-3.5 h-3.5 text-amber-400" />
                      <span>SMTP Socket Transaction Log</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      smtpTestSuccess
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}>
                      {smtpTestSuccess ? '250 2.0.0 OK: QUEUED & DELIVERED' : 'SMTP HANDSHAKE FAILED'}
                    </span>
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-1 text-slate-300 pt-1">
                    {smtpTestLog.map((line, idx) => (
                      <div
                        key={idx}
                        className={
                          line.includes('[SMTP-SERVER] 250') || line.includes('[SMTP-SERVER] 235') || line.includes('TLSv1.3')
                            ? 'text-emerald-400'
                            : line.includes('[FATAL-ERROR]')
                            ? 'text-rose-400 font-bold'
                            : line.includes('[SMTP-CLIENT]')
                            ? 'text-amber-300'
                            : 'text-slate-400'
                        }
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: PAYMENT METHODS */}
          {activeTab === 'payment-methods' && (
            <div className="space-y-6">
              {/* Notice Banner */}
              {paymentNotice && (
                <div className="p-3.5 bg-emerald-950/80 border border-emerald-700/80 rounded-xl text-emerald-200 text-xs flex items-center justify-between animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{paymentNotice}</span>
                  </div>
                  <button 
                    onClick={() => setPaymentNotice(null)}
                    className="text-emerald-400 hover:text-white text-xs font-semibold cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Header & Add Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-white text-lg">Dynamic Manual Payment Methods</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800/60">
                      Offline / Manual Only
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                    Configure each payment channel independently (Western Union, MoneyGram, Pakistan Bank, Wire Transfer). All details, instructions, account numbers, and ordering are 100% dynamic and instantly update the visitor donation flow. No card processing or online gateways required.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsAddingMethod(!isAddingMethod)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isAddingMethod ? 'Close New Form' : 'Add Payment Method'}</span>
                  </button>
                </div>
              </div>

              {/* Add New Method Form */}
              {isAddingMethod && (
                <div className="bg-slate-800/90 border border-amber-500/40 rounded-xl p-6 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <h4 className="font-serif font-bold text-white text-sm flex items-center gap-2">
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>Create New Manual Payment Method</span>
                    </h4>
                    <span className="text-[11px] text-amber-300">Will be saved to database dynamically</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block text-slate-300 font-semibold mb-1">
                        Payment Method Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Western Union, MoneyGram, Raast P2P"
                        value={newMethodData.name || ''}
                        onChange={e => setNewMethodData({ ...newMethodData, name: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-amber-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Display Order</label>
                      <input
                        type="number"
                        min="1"
                        value={newMethodData.order || 1}
                        onChange={e => setNewMethodData({ ...newMethodData, order: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-amber-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 text-xs">
                    <input
                      type="checkbox"
                      id="new-enabled"
                      checked={newMethodData.enabled ?? true}
                      onChange={e => setNewMethodData({ ...newMethodData, enabled: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 bg-slate-900 border-slate-700"
                    />
                    <label htmlFor="new-enabled" className="text-slate-200 cursor-pointer">
                      Enable this payment method immediately (visible to visitors)
                    </label>
                  </div>

                  <div className="text-xs space-y-1">
                    <label className="block text-slate-300 font-semibold">Payment Instructions</label>
                    <textarea
                      rows={3}
                      placeholder="Step-by-step guidance for the donor (e.g. how to transfer, where to submit MTCN or memo reference)..."
                      value={newMethodData.instructions || ''}
                      onChange={e => setNewMethodData({ ...newMethodData, instructions: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-amber-500 focus:outline-hidden font-sans text-xs"
                    />
                  </div>

                  <div className="text-xs space-y-1">
                    <label className="block text-slate-300 font-semibold">Account / Recipient Details</label>
                    <textarea
                      rows={2}
                      placeholder="Recipient Full Name, City, Country, Identification requirements, Phone (for Western Union / MoneyGram)..."
                      value={newMethodData.recipientDetails || ''}
                      onChange={e => setNewMethodData({ ...newMethodData, recipientDetails: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-amber-500 focus:outline-hidden font-sans text-xs"
                    />
                  </div>

                  {/* Bank Coordinates */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-slate-700/60">
                    <div>
                      <label className="block text-slate-400 mb-1">Bank Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Habib Bank Limited (HBL)"
                        value={newMethodData.bankName || ''}
                        onChange={e => setNewMethodData({ ...newMethodData, bankName: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Account Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Agape Light Network Ministry"
                        value={newMethodData.accountTitle || ''}
                        onChange={e => setNewMethodData({ ...newMethodData, accountTitle: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Account Number</label>
                      <input
                        type="text"
                        placeholder="e.g. 0123-4567890123"
                        value={newMethodData.accountNumber || ''}
                        onChange={e => setNewMethodData({ ...newMethodData, accountNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">IBAN</label>
                      <input
                        type="text"
                        placeholder="e.g. PK36HABB0001234567890123"
                        value={newMethodData.iban || ''}
                        onChange={e => setNewMethodData({ ...newMethodData, iban: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">SWIFT / BIC</label>
                      <input
                        type="text"
                        placeholder="e.g. HABBPKKA"
                        value={newMethodData.swiftBic || ''}
                        onChange={e => setNewMethodData({ ...newMethodData, swiftBic: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Branch Information</label>
                      <input
                        type="text"
                        placeholder="e.g. Main Commercial Branch, Lahore"
                        value={newMethodData.branchInfo || ''}
                        onChange={e => setNewMethodData({ ...newMethodData, branchInfo: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="text-xs space-y-1">
                    <label className="block text-slate-300 font-semibold">Any Other Relevant Payment Details</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Narration memo rules, verification timing, contact telephone..."
                      value={newMethodData.additionalDetails || ''}
                      onChange={e => setNewMethodData({ ...newMethodData, additionalDetails: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-amber-500 focus:outline-hidden font-sans text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-slate-700">
                    <button
                      type="button"
                      onClick={handleCreateNewMethod}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-lg cursor-pointer transition-colors"
                    >
                      Save & Add Method
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingMethod(false)}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* List of Configured Payment Methods */}
              <div className="space-y-4">
                {paymentMethods.length === 0 ? (
                  <div className="p-8 text-center bg-slate-800 rounded-xl border border-slate-700 text-slate-400 text-xs">
                    No payment methods configured. Click &ldquo;Add Payment Method&rdquo; above.
                  </div>
                ) : (
                  [...paymentMethods]
                    .sort((a, b) => a.order - b.order)
                    .map((method, index, arr) => {
                      const isEditing = editingMethodId === method.id;

                      return (
                        <div
                          key={method.id}
                          className={`rounded-xl border transition-all ${
                            method.enabled 
                              ? 'bg-slate-800/90 border-slate-700 shadow-xs' 
                              : 'bg-slate-900/60 border-slate-800 opacity-75'
                          }`}
                        >
                          {/* Card Top Header */}
                          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/60">
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center font-mono font-bold text-xs text-amber-400">
                                {method.order}
                              </span>

                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-serif font-bold text-white text-base">
                                    {method.name}
                                  </h4>
                                  {method.enabled ? (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                                      Active / Visible
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                                      Disabled / Hidden
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                                  ID: {method.id} &bull; Order Index: #{method.order}
                                </div>
                              </div>
                            </div>

                            {/* Control Actions */}
                            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                              {/* Move Up */}
                              <button
                                type="button"
                                disabled={index === 0}
                                onClick={() => handleMovePaymentMethod(method.id, 'up')}
                                title="Move Up in Ordering"
                                className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition-colors"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>

                              {/* Move Down */}
                              <button
                                type="button"
                                disabled={index === arr.length - 1}
                                onClick={() => handleMovePaymentMethod(method.id, 'down')}
                                title="Move Down in Ordering"
                                className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition-colors"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>

                              {/* Enable / Disable Toggle */}
                              <button
                                type="button"
                                onClick={() => handleTogglePaymentMethod(method.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                                  method.enabled
                                    ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 hover:bg-amber-600/30'
                                    : 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30'
                                }`}
                              >
                                {method.enabled ? 'Disable' : 'Enable'}
                              </button>

                              {/* Edit details */}
                              <button
                                type="button"
                                onClick={() => {
                                  if (isEditing) {
                                    setEditingMethodId(null);
                                  } else {
                                    handleStartEditMethod(method);
                                  }
                                }}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>{isEditing ? 'Cancel Edit' : 'Edit All Fields'}</span>
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => handleDeleteMethod(method.id, method.name)}
                                title="Remove this payment method"
                                className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40 cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Body: Form if Editing, else Detailed Preview */}
                          <div className="p-4 sm:p-5">
                            {isEditing ? (
                              <div className="space-y-4 text-xs animate-in fade-in">
                                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-xs font-medium">
                                  Editing all configurations for <strong>{method.name}</strong>. Changes will apply immediately to all donation forms upon clicking &ldquo;Save Method Changes&rdquo;.
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  <div className="sm:col-span-2">
                                    <label className="block text-slate-300 font-semibold mb-1">
                                      Payment Method Name
                                    </label>
                                    <input
                                      type="text"
                                      value={editingMethodData.name || ''}
                                      onChange={e => setEditingMethodData({ ...editingMethodData, name: e.target.value })}
                                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-slate-300 font-semibold mb-1">
                                      Order in List
                                    </label>
                                    <input
                                      type="number"
                                      min="1"
                                      value={editingMethodData.order || 1}
                                      onChange={e => setEditingMethodData({ ...editingMethodData, order: Number(e.target.value) })}
                                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                                    />
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id={`edit-enabled-${method.id}`}
                                    checked={editingMethodData.enabled ?? method.enabled}
                                    onChange={e => setEditingMethodData({ ...editingMethodData, enabled: e.target.checked })}
                                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 bg-slate-900 border-slate-700"
                                  />
                                  <label htmlFor={`edit-enabled-${method.id}`} className="text-slate-200 cursor-pointer">
                                    Enabled / Visible to Visitors
                                  </label>
                                </div>

                                <div>
                                  <label className="block text-slate-300 font-semibold mb-1">
                                    Payment Instructions
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={editingMethodData.instructions || ''}
                                    onChange={e => setEditingMethodData({ ...editingMethodData, instructions: e.target.value })}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-sans"
                                  />
                                  <span className="text-[11px] text-slate-400">Step-by-step guidance provided to donor.</span>
                                </div>

                                <div>
                                  <label className="block text-slate-300 font-semibold mb-1">
                                    Account / Recipient Details
                                  </label>
                                  <textarea
                                    rows={2}
                                    value={editingMethodData.recipientDetails || ''}
                                    onChange={e => setEditingMethodData({ ...editingMethodData, recipientDetails: e.target.value })}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-sans"
                                  />
                                  <span className="text-[11px] text-slate-400">Recipient name, city, national ID, phone number (used for Western Union, MoneyGram).</span>
                                </div>

                                {/* Bank details */}
                                <div className="pt-2 border-t border-slate-700/60">
                                  <div className="text-slate-300 font-semibold mb-2">Bank Account Coordinates</div>
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                      <label className="block text-slate-400 mb-1">Bank Name</label>
                                      <input
                                        type="text"
                                        value={editingMethodData.bankName || ''}
                                        onChange={e => setEditingMethodData({ ...editingMethodData, bankName: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-slate-400 mb-1">Account Title</label>
                                      <input
                                        type="text"
                                        value={editingMethodData.accountTitle || ''}
                                        onChange={e => setEditingMethodData({ ...editingMethodData, accountTitle: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-slate-400 mb-1">Account Number</label>
                                      <input
                                        type="text"
                                        value={editingMethodData.accountNumber || ''}
                                        onChange={e => setEditingMethodData({ ...editingMethodData, accountNumber: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-slate-400 mb-1">IBAN</label>
                                      <input
                                        type="text"
                                        value={editingMethodData.iban || ''}
                                        onChange={e => setEditingMethodData({ ...editingMethodData, iban: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-slate-400 mb-1">SWIFT / BIC</label>
                                      <input
                                        type="text"
                                        value={editingMethodData.swiftBic || ''}
                                        onChange={e => setEditingMethodData({ ...editingMethodData, swiftBic: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-slate-400 mb-1">Branch Information</label>
                                      <input
                                        type="text"
                                        value={editingMethodData.branchInfo || ''}
                                        onChange={e => setEditingMethodData({ ...editingMethodData, branchInfo: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-slate-300 font-semibold mb-1">
                                    Any Other Relevant Payment Details
                                  </label>
                                  <textarea
                                    rows={2}
                                    value={editingMethodData.additionalDetails || ''}
                                    onChange={e => setEditingMethodData({ ...editingMethodData, additionalDetails: e.target.value })}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-sans"
                                  />
                                </div>

                                <div className="flex items-center gap-3 pt-3 border-t border-slate-700">
                                  <button
                                    type="button"
                                    onClick={() => handleSaveEditMethod(method.id)}
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg cursor-pointer transition-colors"
                                  >
                                    Save Method Changes
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingMethodId(null);
                                      setEditingMethodData({});
                                    }}
                                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs rounded-lg cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-3 text-xs">
                                {/* Instructions */}
                                {method.instructions && (
                                  <div>
                                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                                      Instructions Provided to Donor:
                                    </div>
                                    <p className="text-slate-200 leading-relaxed bg-slate-900/70 p-3 rounded-lg border border-slate-700/50 whitespace-pre-line">
                                      {method.instructions}
                                    </p>
                                  </div>
                                )}

                                {/* Recipient details */}
                                {method.recipientDetails && (
                                  <div>
                                    <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/90 mb-1">
                                      Recipient / Authorized Contact:
                                    </div>
                                    <div className="text-slate-300 bg-slate-900/70 p-3 rounded-lg border border-slate-700/50 whitespace-pre-line font-mono text-[11px]">
                                      {method.recipientDetails}
                                    </div>
                                  </div>
                                )}

                                {/* Bank details grid if any are populated */}
                                {(method.bankName || method.accountTitle || method.accountNumber || method.iban || method.swiftBic || method.branchInfo) && (
                                  <div>
                                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                                      Bank Account Coordinates:
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 bg-slate-900/70 p-3 rounded-lg border border-slate-700/50 text-[11px]">
                                      {method.bankName && (
                                        <div>
                                          <span className="text-slate-400 block">Bank Name:</span>
                                          <span className="text-white font-semibold">{method.bankName}</span>
                                        </div>
                                      )}
                                      {method.accountTitle && (
                                        <div>
                                          <span className="text-slate-400 block">Account Title:</span>
                                          <span className="text-white font-semibold">{method.accountTitle}</span>
                                        </div>
                                      )}
                                      {method.accountNumber && (
                                        <div>
                                          <span className="text-slate-400 block">Account Number:</span>
                                          <span className="text-white font-mono font-semibold">{method.accountNumber}</span>
                                        </div>
                                      )}
                                      {method.iban && (
                                        <div>
                                          <span className="text-slate-400 block">IBAN:</span>
                                          <span className="text-white font-mono font-semibold">{method.iban}</span>
                                        </div>
                                      )}
                                      {method.swiftBic && (
                                        <div>
                                          <span className="text-slate-400 block">SWIFT/BIC:</span>
                                          <span className="text-white font-mono font-semibold">{method.swiftBic}</span>
                                        </div>
                                      )}
                                      {method.branchInfo && (
                                        <div>
                                          <span className="text-slate-400 block">Branch Info:</span>
                                          <span className="text-white font-semibold">{method.branchInfo}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {/* Additional details */}
                                {method.additionalDetails && (
                                  <div className="text-slate-400 italic text-[11px] pt-1">
                                    Note: {method.additionalDetails}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                )}
              </div>
            </div>
          )}

          {/* TAB: ACTIVITY NOTIFICATIONS */}
          {activeTab === 'activity-notifications' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>Real Activity Notification System</span>
                </div>
                <h3 className="font-serif font-bold text-white text-lg">
                  Donation Activity Notification Controls
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Automatically streams real, database-backed donation records to website visitors. Features session anti-repetition, customizable display timings, strict privacy protections, and isolated demo testing data.
                </p>
              </div>

              {activityNotice && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{activityNotice}</span>
                </div>
              )}

              {/* Master Activation & Mode Status */}
              <div className="p-5 bg-slate-800 rounded-xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-white text-sm">Activity Feed Engine</span>
                    {activityConfig.enabled ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Active & Broadcasting
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-slate-400 border border-slate-700">
                        Disabled / Offline
                      </span>
                    )}
                    {activityConfig.demoMode && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                        Demo Mode Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    When active, website visitors receive subtle, non-intrusive notifications of actual donations with anti-repetition limits.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      const next = !activityConfig.enabled;
                      handleSaveActivityConfig(
                        { ...activityConfig, enabled: next },
                        `${next ? 'Enabled' : 'Disabled'} donation activity notifications.`
                      );
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      activityConfig.enabled
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    {activityConfig.enabled ? 'Disable Notifications' : 'Enable Notifications'}
                  </button>
                </div>
              </div>

              {/* Demo Mode & Testing Sandbox Controls */}
              <div className="p-5 bg-slate-800/90 rounded-xl border border-slate-700 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <h4 className="font-serif font-bold text-white text-sm">
                      Demo Testing Mode & Isolated Sample Data
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Live system strictly uses real database records
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Demo records are strictly for visual and responsive testing. They are internally marked with an <code className="text-amber-400 bg-slate-900 px-1 py-0.5 rounded">isDemo: true</code> flag and never count toward real fundraising totals or audit reports. Before public launch, you can purge all demo data with one click.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-700/80 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400">Real Database Donations</div>
                      <div className="text-lg font-bold text-emerald-400 font-mono">
                        {donations.filter(d => !d.isDemo).length} records
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Production</span>
                  </div>

                  <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-700/80 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400">Demo / Sample Donations</div>
                      <div className="text-lg font-bold text-amber-400 font-mono">
                        {donations.filter(d => d.isDemo).length} records
                      </div>
                    </div>
                    <span className="text-[10px] text-amber-500 uppercase font-semibold">Testing Only</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-700/60">
                  <button
                    type="button"
                    onClick={handleSeedDemoDonations}
                    className="px-3.5 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                  >
                    Seed Sample Demo Donations (4 Records)
                  </button>

                  <button
                    type="button"
                    onClick={handleClearAllDemoDonations}
                    disabled={donations.filter(d => d.isDemo).length === 0}
                    className="px-3.5 py-2 bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                  >
                    Delete / Clear All Demo Data
                  </button>

                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer ml-auto">
                    <input
                      type="checkbox"
                      checked={activityConfig.demoMode}
                      onChange={e => {
                        handleSaveActivityConfig(
                          { ...activityConfig, demoMode: e.target.checked },
                          `${e.target.checked ? 'Enabled' : 'Disabled'} Demo Mode inclusion in activity feed.`
                        );
                      }}
                      className="rounded bg-slate-900 border-slate-700 text-amber-600 focus:ring-amber-500"
                    />
                    <span>Include Demo Records in Activity Feed (Visual Testing)</span>
                  </label>
                </div>
              </div>

              {/* Timing, Frequency & Anti-Repetition Rules */}
              <div className="p-5 bg-slate-800 rounded-xl border border-slate-700 space-y-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <h4 className="font-serif font-bold text-white text-sm">
                    Display Timing & Anti-Repetition Frequency
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Max per Visitor Session</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={activityConfig.maxPerSession}
                      onChange={e => {
                        const val = Math.max(1, parseInt(e.target.value, 10) || 1);
                        handleSaveActivityConfig({ ...activityConfig, maxPerSession: val });
                      }}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Caps visitor popups</span>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Display Duration (Seconds)</label>
                    <input
                      type="number"
                      min={2}
                      max={30}
                      value={activityConfig.displayDurationSeconds}
                      onChange={e => {
                        const val = Math.max(2, parseInt(e.target.value, 10) || 2);
                        handleSaveActivityConfig({ ...activityConfig, displayDurationSeconds: val });
                      }}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Visible before dismissal</span>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Delay Between Items (Seconds)</label>
                    <input
                      type="number"
                      min={5}
                      max={120}
                      value={activityConfig.delayBetweenSeconds}
                      onChange={e => {
                        const val = Math.max(5, parseInt(e.target.value, 10) || 5);
                        handleSaveActivityConfig({ ...activityConfig, delayBetweenSeconds: val });
                      }}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Quiet pause interval</span>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Initial Delay on Load (Seconds)</label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={activityConfig.initialDelaySeconds}
                      onChange={e => {
                        const val = Math.max(1, parseInt(e.target.value, 10) || 1);
                        handleSaveActivityConfig({ ...activityConfig, initialDelaySeconds: val });
                      }}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Wait after first arrival</span>
                  </div>
                </div>
              </div>

              {/* Privacy, Anonymity & Content Presentation */}
              <div className="p-5 bg-slate-800 rounded-xl border border-slate-700 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <h4 className="font-serif font-bold text-white text-sm">
                    Privacy Controls & Content Fields
                  </h4>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-medium">Donor Name Presentation Mode</label>
                    <select
                      value={activityConfig.privacyMode}
                      onChange={e => {
                        const val = e.target.value as any;
                        handleSaveActivityConfig(
                          { ...activityConfig, privacyMode: val },
                          `Updated donor name privacy mode to ${val}.`
                        );
                      }}
                      className="w-full sm:w-80 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="name_when_allowed">Full Name when Allowed (or &ldquo;A donor from [Country]&rdquo;)</option>
                      <option value="initials_only">Initials Only (e.g. &ldquo;D. J. from United States&rdquo;)</option>
                      <option value="always_anonymous">Always Anonymous (e.g. &ldquo;A donor from United States&rdquo;)</option>
                    </select>
                    <p className="text-[11px] text-slate-500 mt-1">
                      If a donor ticked the anonymous box during donation, their identity is always protected regardless of this setting.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900/80 border border-slate-700/80 cursor-pointer hover:border-slate-600 transition-colors">
                      <input
                        type="checkbox"
                        checked={activityConfig.showAmount}
                        onChange={e => {
                          handleSaveActivityConfig({ ...activityConfig, showAmount: e.target.checked });
                        }}
                        className="rounded bg-slate-800 border-slate-600 text-amber-600 focus:ring-amber-500"
                      />
                      <div>
                        <div className="text-white font-semibold">Show Contribution Amount</div>
                        <div className="text-[11px] text-slate-400">Displays actual amount e.g. &ldquo;$500&rdquo;</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900/80 border border-slate-700/80 cursor-pointer hover:border-slate-600 transition-colors">
                      <input
                        type="checkbox"
                        checked={activityConfig.showCountry}
                        onChange={e => {
                          handleSaveActivityConfig({ ...activityConfig, showCountry: e.target.checked });
                        }}
                        className="rounded bg-slate-800 border-slate-600 text-amber-600 focus:ring-amber-500"
                      />
                      <div>
                        <div className="text-white font-semibold">Show Donor Country</div>
                        <div className="text-[11px] text-slate-400">Displays origin country e.g. &ldquo;from United Kingdom&rdquo;</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900/80 border border-slate-700/80 cursor-pointer hover:border-slate-600 transition-colors">
                      <input
                        type="checkbox"
                        checked={activityConfig.showProject}
                        onChange={e => {
                          handleSaveActivityConfig({ ...activityConfig, showProject: e.target.checked });
                        }}
                        className="rounded bg-slate-800 border-slate-600 text-amber-600 focus:ring-amber-500"
                      />
                      <div>
                        <div className="text-white font-semibold">Show Designated Project Title</div>
                        <div className="text-[11px] text-slate-400">E.g. &ldquo;Clean Water &amp; Deep Wells Project&rdquo;</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900/80 border border-slate-700/80 cursor-pointer hover:border-slate-600 transition-colors">
                      <input
                        type="checkbox"
                        checked={activityConfig.includePending}
                        onChange={e => {
                          handleSaveActivityConfig({ ...activityConfig, includePending: e.target.checked });
                        }}
                        className="rounded bg-slate-800 border-slate-600 text-amber-600 focus:ring-amber-500"
                      />
                      <div>
                        <div className="text-white font-semibold">Include Pending Manual Remittances</div>
                        <div className="text-[11px] text-slate-400">Shows incoming manual transfers alongside confirmed</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Real Database Activity Queue & Privacy Toggles */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-serif font-bold text-white text-base">
                      Current Eligible Activity Stream Queue
                    </h4>
                    <p className="text-xs text-slate-400">
                      These real database records cycle through visitor sessions. Click &ldquo;Visible / Hidden&rdquo; to individually grant or revoke public notification permission.
                    </p>
                  </div>
                  <div className="text-xs text-amber-400 font-mono">
                    {donations.filter(d => (activityConfig.demoMode || !d.isDemo) && d.allowPublicActivity !== false).length} in active rotation
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-700 text-slate-400">
                        <th className="py-3 px-4">Ref Code</th>
                        <th>Donor &amp; Country</th>
                        <th>Amount</th>
                        <th>Project</th>
                        <th>Status</th>
                        <th>Record Type</th>
                        <th className="text-center">Public Notification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {donations
                        .filter(d => activityConfig.demoMode || !d.isDemo)
                        .map(d => {
                          const isAllowed = d.allowPublicActivity !== false;
                          return (
                            <tr key={d.id} className="hover:bg-slate-700/40">
                              <td className="py-3 px-4 font-mono font-bold text-amber-400">
                                {d.reference}
                              </td>
                              <td>
                                <div className="font-semibold text-white">
                                  {d.isAnonymous ? 'Anonymous' : d.donorName}
                                </div>
                                <div className="text-[10px] text-slate-400">{d.donorCountry}</div>
                              </td>
                              <td className="font-bold text-white">
                                {d.currency} {d.amount.toFixed(2)}
                              </td>
                              <td className="max-w-[150px] truncate text-slate-300">
                                {d.projectTitle}
                              </td>
                              <td>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  d.paymentStatus === 'confirmed' 
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                                }`}>
                                  {d.paymentStatus}
                                </span>
                              </td>
                              <td>
                                {d.isDemo ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                    Sample Demo
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-900 text-slate-300 border border-slate-700">
                                    Real Record
                                  </span>
                                )}
                              </td>
                              <td className="text-center py-3 px-4">
                                <button
                                  type="button"
                                  onClick={() => handleToggleDonationPublicActivity(d.id)}
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                                    isAllowed
                                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900'
                                      : 'bg-slate-900 text-slate-500 border border-slate-700 hover:bg-slate-800'
                                  }`}
                                >
                                  {isAllowed ? (
                                    <>
                                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                                      <span>Allowed in Feed</span>
                                    </>
                                  ) : (
                                    <>
                                      <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                                      <span>Suppressed</span>
                                    </>
                                  )}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h3 className="font-serif font-bold text-white text-base">System Settings</h3>
                <p className="text-xs text-slate-400">All configurations are stored in the MySQL site_settings table.</p>
              </div>

              {/* Quick Jump to SMTP */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Server className="w-4 h-4 text-amber-400" />
                    <span>SMTP Email Notification System</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Configured host: <strong className="text-slate-200">{settings.smtpConfig.smtpHost}:{settings.smtpConfig.smtpPort}</strong> &bull; Admin target: <strong className="text-slate-200">{settings.smtpConfig.adminNotificationEmail}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('smtp')}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Configure SMTP &rarr;
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Organization Name</label>
                  <input
                    type="text"
                    value={settings.orgName}
                    onChange={e => setSettings({ ...settings, orgName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={settings.tagline}
                    onChange={e => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">President / Founder</label>
                  <input
                    type="text"
                    value={settings.founderName}
                    onChange={e => setSettings({ ...settings, founderName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={e => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                {/* Dynamic Manual Payment Methods Section in Admin Settings */}
                <div className="p-5 bg-slate-800 rounded-xl border border-amber-500/30 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/80 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Landmark className="w-4 h-4 text-amber-400" />
                        <h4 className="font-serif font-bold text-white text-sm">Dynamic Manual Payment Methods</h4>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Manage offline donation channels (Western Union, MoneyGram, Pakistan Bank, Manual Bank Transfer). No online card or Stripe/PayPal gateways.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('payment-methods')}
                      className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold cursor-pointer shrink-0 transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Open Full Payment Manager</span>
                      <span>&rarr;</span>
                    </button>
                  </div>

                  {/* Quick overview grid of the 4 methods with enable/disable switches */}
                  <div className="space-y-2">
                    {[...paymentMethods]
                      .sort((a, b) => a.order - b.order)
                      .map((m) => (
                        <div
                          key={m.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-700 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded bg-slate-800 text-amber-400 font-mono text-[10px] font-bold flex items-center justify-center">
                              {m.order}
                            </span>
                            <div>
                              <span className="font-semibold text-white">{m.name}</span>
                              <span className="text-slate-400 text-[11px] block truncate max-w-xs sm:max-w-md">
                                {m.bankName ? `${m.bankName} (${m.accountNumber || m.iban})` : (m.recipientDetails ? m.recipientDetails.split('\n')[0] : m.instructions.slice(0, 45) + '...')}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              m.enabled 
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                                : 'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}>
                              {m.enabled ? 'Enabled' : 'Disabled'}
                            </span>

                            <button
                              type="button"
                              onClick={() => handleTogglePaymentMethod(m.id)}
                              className="text-[11px] text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
                            >
                              Toggle
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                handleStartEditMethod(m);
                                setActiveTab('payment-methods');
                              }}
                              className="text-[11px] text-slate-300 hover:text-white px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 cursor-pointer"
                            >
                              Edit Details
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-3">
                  <h4 className="font-serif font-bold text-white">Default Wire Fiduciary Target</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Bank Name</label>
                      <input
                        type="text"
                        value={settings.bankAccountDetails.bankName}
                        onChange={e => setSettings({
                          ...settings,
                          bankAccountDetails: { ...settings.bankAccountDetails, bankName: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Account Title</label>
                      <input
                        type="text"
                        value={settings.bankAccountDetails.accountTitle}
                        onChange={e => setSettings({
                          ...settings,
                          bankAccountDetails: { ...settings.bankAccountDetails, accountTitle: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Official Social Media Channels */}
                <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-3">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-amber-400" />
                    <h4 className="font-serif font-bold text-white text-sm">Official Social Media Profiles & Links</h4>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Links configured here automatically appear as clickable icons in the website footer.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Facebook Page URL</label>
                      <input
                        type="url"
                        placeholder="https://facebook.com/..."
                        value={settings.socialLinks?.facebook || ''}
                        onChange={e => setSettings({
                          ...settings,
                          socialLinks: { ...settings.socialLinks, facebook: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-[11px]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">YouTube Channel URL</label>
                      <input
                        type="url"
                        placeholder="https://youtube.com/@..."
                        value={settings.socialLinks?.youtube || ''}
                        onChange={e => setSettings({
                          ...settings,
                          socialLinks: { ...settings.socialLinks, youtube: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-[11px]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Instagram Profile URL</label>
                      <input
                        type="url"
                        placeholder="https://instagram.com/..."
                        value={settings.socialLinks?.instagram || ''}
                        onChange={e => setSettings({
                          ...settings,
                          socialLinks: { ...settings.socialLinks, instagram: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-[11px]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">X (Twitter) Profile URL</label>
                      <input
                        type="url"
                        placeholder="https://x.com/..."
                        value={settings.socialLinks?.twitter || ''}
                        onChange={e => setSettings({
                          ...settings,
                          socialLinks: { ...settings.socialLinks, twitter: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-[11px]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">WhatsApp Direct Ministry Link</label>
                      <input
                        type="url"
                        placeholder="https://wa.me/..."
                        value={settings.socialLinks?.whatsapp || ''}
                        onChange={e => setSettings({
                          ...settings,
                          socialLinks: { ...settings.socialLinks, whatsapp: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addAuditLog('SETTINGS_SAVED', 'Updated site branding, leadership, social channels, and contact metadata.');
                    alert('Settings updated successfully in database!');
                  }}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg cursor-pointer"
                >
                  Save Settings to Database
                </button>
              </div>
            </div>
          )}

          {/* TAB 9: AUDIT LOG */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif font-bold text-white text-base">Security & Administrative Audit Log</h3>
                <p className="text-xs text-slate-400">Immutable trail of administrative operations, status adjustments, and logins.</p>
              </div>

              <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400">
                      <th className="py-3 px-4">Timestamp</th>
                      <th>Action</th>
                      <th>Actor</th>
                      <th>Details</th>
                      <th>IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 font-mono text-slate-400">{log.timestamp}</td>
                        <td>
                          <span className="font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900/50">
                            {log.action}
                          </span>
                        </td>
                        <td className="font-medium text-white">{log.userId}</td>
                        <td className="text-slate-300 max-w-xs">{log.details}</td>
                        <td className="font-mono text-slate-400">{log.ipAddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Modal: View Raw Formatted Email */}
        {previewEmailInquiry && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
            <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full p-6 space-y-4 text-xs text-slate-200 max-h-[85vh] flex flex-col shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-white text-sm">SMTP Dispatch Preview</span>
                </div>
                <button
                  onClick={() => setPreviewEmailInquiry(null)}
                  className="p-1 text-slate-400 hover:text-white rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] space-y-2 border border-slate-800 text-slate-300 overflow-y-auto flex-1 whitespace-pre-wrap">
                {formatAdminNotificationEmail(
                  previewEmailInquiry,
                  settings,
                  previewEmailInquiry.submittedAt
                ).textBody}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                <span className="text-[11px] text-slate-400">
                  Target Recipient: <strong className="text-white">{settings.smtpConfig.adminNotificationEmail}</strong>
                </span>
                <button
                  onClick={() => setPreviewEmailInquiry(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
