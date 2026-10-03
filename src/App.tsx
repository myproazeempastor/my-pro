import React, { useState } from 'react';
import { 
  initialProjects, 
  initialDonations, 
  initialSettings, 
  initialAuditLogs 
} from './data/initialData';
import { initialShopItems } from './data/shopData';
import { Project, Donation, SiteSettings, AuditLogItem, CurrencyCode, CartItem, ShopItem, ContactInquiry } from './types';
import { sendContactInquirySmtp, ContactInquiryInput, SmtpTransmissionResult } from './services/emailService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Core & Foundation Pages
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { DonatePage } from './pages/DonatePage';
import { PolicyPage } from './pages/PolicyPage';

// The 27 Official Pages of Agape Light Network
import { StrategicBlueprintPage } from './pages/StrategicBlueprintPage';
import { FrontlineAccountabilityPage } from './pages/FrontlineAccountabilityPage';
import { DirectDebtRescuePage } from './pages/DirectDebtRescuePage';
import { TheMissionPage } from './pages/TheMissionPage';
import { PostRescueProtocolPage } from './pages/PostRescueProtocolPage';
import { NextGenRescueDiscipleshipPage } from './pages/NextGenRescueDiscipleshipPage';
import { WomensLiberationCoveringPage } from './pages/WomensLiberationCoveringPage';
import { MyAccountPage } from './pages/MyAccountPage';
import { ShopPage } from './pages/ShopPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { HealingCrusadesPage } from './pages/HealingCrusadesPage';
import { PastorsTrainingPage } from './pages/PastorsTrainingPage';
import { FrontlineLeadershipOriginsPage } from './pages/FrontlineLeadershipOriginsPage';
import { ViewTranslationProjectsPage } from './pages/ViewTranslationProjectsPage';
import { PhotoGalleryPage } from './pages/PhotoGalleryPage';
import { VideoEvidencePage } from './pages/VideoEvidencePage';
import { MinistryReportsStoriesPage } from './pages/MinistryReportsStoriesPage';
import { SponsorAProjectPage } from './pages/SponsorAProjectPage';
import { InitiateStrategicAlliancePage } from './pages/InitiateStrategicAlliancePage';
import { UncompromisedTheologyPage } from './pages/UncompromisedTheologyPage';
import { TheJohn812MandatePage } from './pages/TheJohn812MandatePage';
import { BibleTranslationProjectsPage } from './pages/BibleTranslationProjectsPage';
import { FieldEvidencePage } from './pages/FieldEvidencePage';
import { ExploreChurchVisionPage } from './pages/ExploreChurchVisionPage';
import { SeeOurGroundImpactPage } from './pages/SeeOurGroundImpactPage';
import { ContactUsPage } from './pages/ContactUsPage';

// System Modals
import { DonationModal } from './components/DonationModal';
import { DonationReceiptModal } from './components/DonationReceiptModal';
import { AdminModal } from './components/AdminModal';
import { InstallerSimulatorModal } from './components/InstallerSimulatorModal';
import { CodeExplorerModal } from './components/CodeExplorerModal';
import { DonationActivityNotification } from './components/DonationActivityNotification';
import { MilestoneNotification, MilestoneNotificationData } from './components/MilestoneNotification';
import { generateCpanelZipPackage, triggerDownload } from './services/zipGenerator';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [donations, setDonations] = useState<Donation[]>(initialDonations);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);
  const [shopItems] = useState<ShopItem[]>(initialShopItems);

  // Inquiries received from website contact form
  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>([
    {
      id: 1,
      name: 'Pastor Mark Evans',
      email: 'mevans@gracebiblechurch.org',
      phone: '+1 (555) 234-8901',
      subject: 'Church Well Sponsorship',
      message: 'Our missions committee would like to fully sponsor a clean water borehole in memory of our senior pastor.',
      submittedAt: '2026-03-27 14:15:00 UTC',
      source: 'https://agapelightnetwork.org/contact-us',
      emailStatus: 'sent',
      smtpDetails: `Dispatched to ${initialSettings.smtpConfig.adminNotificationEmail} via ${initialSettings.smtpConfig.smtpHost}:${initialSettings.smtpConfig.smtpPort} (${initialSettings.smtpConfig.smtpEncryption})`
    },
    {
      id: 2,
      name: 'Sister Deborah Vance',
      email: 'dvance@missiontrust.ca',
      phone: '+1 (416) 555-0192',
      subject: 'Confidential Prayer Request',
      message: 'Please pray for my husband undergoing surgery, and bless Rev. Azeem Tariq in the field.',
      submittedAt: '2026-03-25 09:30:00 UTC',
      source: 'https://agapelightnetwork.org/contact-us',
      emailStatus: 'sent',
      smtpDetails: `Dispatched to ${initialSettings.smtpConfig.adminNotificationEmail} via ${initialSettings.smtpConfig.smtpHost}:${initialSettings.smtpConfig.smtpPort} (${initialSettings.smtpConfig.smtpEncryption})`
    }
  ]);

  // Cart state for Ministry Resource Store
  const [cart, setCart] = useState<CartItem[]>([
    { item: initialShopItems[0], quantity: 1 }
  ]);

  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('USD');
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<Project | null>(null);

  // Modals state
  const [isDonateOpen, setIsDonateOpen] = useState<boolean>(false);
  const [selectedProjectIdForDonation, setSelectedProjectIdForDonation] = useState<number | null>(null);
  const [receiptDonation, setReceiptDonation] = useState<Donation | null>(null);

  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isInstallerOpen, setIsInstallerOpen] = useState<boolean>(false);
  const [isCodeExplorerOpen, setIsCodeExplorerOpen] = useState<boolean>(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState<boolean>(false);

  // Milestone Notification State
  const [activeMilestone, setActiveMilestone] = useState<MilestoneNotificationData | null>(null);

  // Router handler
  const handleNavigate = (route: string) => {
    // Clean trailing slashes or normalize
    const cleanRoute = route.replace(/^\/|\/$/g, '');
    setCurrentRoute(cleanRoute || 'home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open donate modal
  const handleOpenDonate = (projectId?: number) => {
    setSelectedProjectIdForDonation(projectId || null);
    setIsDonateOpen(true);
  };

  // Open Project Detail Page
  const handleSelectProject = (project: Project) => {
    setSelectedProjectForDetail(project);
    setCurrentRoute('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Handlers
  const handleAddToCart = (item: ShopItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (itemId: number, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.item.id === itemId) {
        const newQty = i.quantity + delta;
        return newQty > 0 ? { ...i, quantity: newQty } : null;
      }
      return i;
    }).filter(Boolean) as CartItem[]);
  };

  const handleRemoveCartItem = (itemId: number) => {
    setCart(prev => prev.filter(i => i.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Donation complete handler with automatic milestone detection
  const handleDonationComplete = (newDonation: Donation) => {
    setDonations(prev => [newDonation, ...prev]);

    if (newDonation.paymentStatus === 'confirmed' && newDonation.projectId) {
      setProjects(prev => prev.map(p => {
        if (p.id === newDonation.projectId) {
          const oldPercentage = Math.round((p.raisedAmount / p.goalAmount) * 100);
          const newRaised = p.raisedAmount + newDonation.amount;
          const newPercentage = Math.round((newRaised / p.goalAmount) * 100);

          // Check if crossed major milestones: 50%, 75%, or 100%
          let crossedMilestone: 50 | 75 | 100 | null = null;
          if (oldPercentage < 100 && newPercentage >= 100) {
            crossedMilestone = 100;
          } else if (oldPercentage < 75 && newPercentage >= 75) {
            crossedMilestone = 75;
          } else if (oldPercentage < 50 && newPercentage >= 50) {
            crossedMilestone = 50;
          }

          if (crossedMilestone) {
            setActiveMilestone({
              id: `${p.id}-${crossedMilestone}-${Date.now()}`,
              project: { ...p, raisedAmount: newRaised, donorCount: p.donorCount + 1 },
              milestone: crossedMilestone,
              oldPercentage,
              newPercentage,
              raisedAmount: newRaised,
              goalAmount: p.goalAmount,
              currency: currentCurrency,
              donorName: newDonation.donorName
            });
          }

          return {
            ...p,
            raisedAmount: newRaised,
            donorCount: p.donorCount + 1
          };
        }
        return p;
      }));
    }

    const newLog: AuditLogItem = {
      id: Date.now(),
      timestamp: newDonation.createdAt,
      action: newDonation.paymentStatus === 'confirmed' ? 'DONATION_CONFIRMED' : 'MANUAL_DONATION_PENDING',
      userId: newDonation.donorName,
      details: `Issued gift voucher of ${newDonation.amount} ${newDonation.currency} (Ref: ${newDonation.reference}) via ${newDonation.paymentMethod} for ${newDonation.projectTitle}`,
      ipAddress: '198.51.100.24'
    };
    setAuditLogs(prev => [newLog, ...prev]);
    setReceiptDonation(newDonation);
  };

  // Dedicated test trigger for milestone accomplishments (50%, 75%, 100%)
  const handleTriggerMilestoneTest = (milestone: 50 | 75 | 100, projectId?: number) => {
    const targetProject = (projectId ? projects.find(p => p.id === projectId) : null) || projects[0];
    if (!targetProject) return;

    const mockRaised = Math.round((targetProject.goalAmount * milestone) / 100);

    setActiveMilestone({
      id: `preview-${targetProject.id}-${milestone}-${Date.now()}`,
      project: { ...targetProject, raisedAmount: mockRaised },
      milestone,
      newPercentage: milestone,
      raisedAmount: mockRaised,
      goalAmount: targetProject.goalAmount,
      currency: currentCurrency,
      donorName: 'Generous Mission Partner'
    });
  };

  // Immediate SMTP Email Notification on Contact Form Submission
  const handleContactSubmit = async (inquiryData: ContactInquiryInput): Promise<SmtpTransmissionResult> => {
    // 1. Dispatch SMTP Notification
    const result = await sendContactInquirySmtp(inquiryData, settings);

    // 2. Archive inquiry in administrative state
    const newInquiry: ContactInquiry = {
      id: Date.now(),
      name: inquiryData.name,
      email: inquiryData.email,
      phone: inquiryData.phone,
      subject: inquiryData.subject,
      message: inquiryData.message,
      submittedAt: result.timestamp,
      source: inquiryData.source || 'https://agapelightnetwork.org/contact-us',
      emailStatus: result.success ? 'sent' : 'failed',
      smtpDetails: `Dispatched to ${result.recipient} via ${settings.smtpConfig.smtpHost}:${settings.smtpConfig.smtpPort} (${settings.smtpConfig.smtpEncryption})`
    };
    setContactInquiries(prev => [newInquiry, ...prev]);

    // 3. Record in Security Audit Trail
    const newLog: AuditLogItem = {
      id: Date.now(),
      timestamp: result.timestamp,
      action: 'SMTP_INQUIRY_NOTIFICATION',
      userId: 'SMTP_Notification_Engine',
      details: `New Website Inquiry from ${inquiryData.name} (${inquiryData.email}) dispatched via SMTP to ${result.recipient}`,
      ipAddress: '198.51.100.24'
    };
    setAuditLogs(prev => [newLog, ...prev]);

    return result;
  };

  // ZIP download handler
  const handleDownloadZip = async () => {
    try {
      setIsDownloadingZip(true);
      const zipBlob = await generateCpanelZipPackage();
      triggerDownload(zipBlob, 'Agape_Light_Network_cPanel_Production_v1.0.zip');
    } catch (err) {
      console.error('Failed to generate ZIP package:', err);
      alert('Could not generate ZIP automatically. You can view and copy the files in the Code Inspector.');
    } finally {
      setIsDownloadingZip(false);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* 1. Reusable Dynamic Header with Dropdowns */}
      <Navbar
        settings={settings}
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenDonate={handleOpenDonate}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenInstaller={() => setIsInstallerOpen(true)}
        onOpenCodeExplorer={() => setIsCodeExplorerOpen(true)}
        onDownloadZip={handleDownloadZip}
        isDownloadingZip={isDownloadingZip}
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        cartCount={cartCount}
      />

      {/* 2. Independent 27-Page Routing Switcher */}
      <main className="flex-1">
        
        {/* HOMEPAGE */}
        {currentRoute === 'home' && (
          <HomePage
            settings={settings}
            projects={projects}
            donations={donations}
            currentCurrency={currentCurrency}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
            onSelectProject={handleSelectProject}
          />
        )}

        {/* 1. STRATEGIC BLUEPRINT (/strategic-blueprint) */}
        {currentRoute === 'strategic-blueprint' && (
          <StrategicBlueprintPage
            settings={settings}
            currentCurrency={currentCurrency}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 2. FRONTLINE ACCOUNTABILITY (/frontline-accountability, alias: transparency) */}
        {['frontline-accountability', 'transparency'].includes(currentRoute) && (
          <FrontlineAccountabilityPage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenDonate={() => handleOpenDonate()}
          />
        )}

        {/* 3. DIRECT DEBT RESCUE (/direct-debt-rescue) */}
        {currentRoute === 'direct-debt-rescue' && (
          <DirectDebtRescuePage
            settings={settings}
            currentCurrency={currentCurrency}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 4. THE MISSION (/the-mission, alias: mission) */}
        {['the-mission', 'mission'].includes(currentRoute) && (
          <TheMissionPage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenDonate={() => handleOpenDonate()}
          />
        )}

        {/* 5. POST-RESCUE PROTOCOL (/post-rescue-protocol) */}
        {currentRoute === 'post-rescue-protocol' && (
          <PostRescueProtocolPage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 6. NEXT-GEN RESCUE & DISCIPLESHIP (/next-gen-rescue-discipleship) */}
        {currentRoute === 'next-gen-rescue-discipleship' && (
          <NextGenRescueDiscipleshipPage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 7. WOMEN'S LIBERATION COVERING (/womens-liberation-covering) */}
        {currentRoute === 'womens-liberation-covering' && (
          <WomensLiberationCoveringPage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 8. MY ACCOUNT (/my-account) */}
        {currentRoute === 'my-account' && (
          <MyAccountPage
            settings={settings}
            donations={donations}
            currentCurrency={currentCurrency}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
            onOpenReceipt={setReceiptDonation}
          />
        )}

        {/* 9. SHOP (/shop) */}
        {currentRoute === 'shop' && (
          <ShopPage
            items={shopItems}
            currentCurrency={currentCurrency}
            cartCount={cartCount}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 10. CART (/cart) */}
        {currentRoute === 'cart' && (
          <CartPage
            cart={cart}
            currentCurrency={currentCurrency}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 11. CHECKOUT (/checkout) */}
        {currentRoute === 'checkout' && (
          <CheckoutPage
            cart={cart}
            currentCurrency={currentCurrency}
            settings={settings}
            onClearCart={handleClearCart}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 12. HEALING CRUSADES (/healing-crusades) */}
        {currentRoute === 'healing-crusades' && (
          <HealingCrusadesPage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 13. PASTORS TRAINING (/pastors-training) */}
        {currentRoute === 'pastors-training' && (
          <PastorsTrainingPage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 14. FRONTLINE LEADERSHIP ORIGINS (/frontline-leadership-origins, alias: about, our-story) */}
        {['frontline-leadership-origins', 'about', 'our-story'].includes(currentRoute) && (
          <FrontlineLeadershipOriginsPage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenDonate={() => handleOpenDonate()}
          />
        )}

        {/* 15. VIEW TRANSLATION PROJECTS (/view-translation-projects) */}
        {currentRoute === 'view-translation-projects' && (
          <ViewTranslationProjectsPage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 16. PHOTO GALLERY (/photo-gallery) */}
        {currentRoute === 'photo-gallery' && (
          <PhotoGalleryPage
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 17. VIDEO EVIDENCE (/video-evidence) */}
        {currentRoute === 'video-evidence' && (
          <VideoEvidencePage
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 18. MINISTRY REPORTS & STORIES (/ministry-reports-stories, alias: stories) */}
        {['ministry-reports-stories', 'stories'].includes(currentRoute) && (
          <MinistryReportsStoriesPage
            onNavigate={handleNavigate}
            onOpenDonate={() => handleOpenDonate()}
          />
        )}

        {/* 19. SPONSOR A PROJECT (/sponsor-a-project, alias: projects) */}
        {['sponsor-a-project', 'projects'].includes(currentRoute) && (
          <SponsorAProjectPage
            settings={settings}
            currentCurrency={currentCurrency}
            onOpenDonate={handleOpenDonate}
            onNavigate={handleNavigate}
          />
        )}

        {/* 20. INITIATE STRATEGIC ALLIANCE (/initiate-strategic-alliance, alias: get-involved) */}
        {['initiate-strategic-alliance', 'get-involved'].includes(currentRoute) && (
          <InitiateStrategicAlliancePage
            settings={settings}
            onNavigate={handleNavigate}
          />
        )}

        {/* 21. UNCOMPROMISED THEOLOGY (/uncompromised-theology) */}
        {currentRoute === 'uncompromised-theology' && (
          <UncompromisedTheologyPage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 22. THE JOHN 8:12 MANDATE (/the-john-812-mandate) */}
        {currentRoute === 'the-john-812-mandate' && (
          <TheJohn812MandatePage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 23. BIBLE TRANSLATION PROJECTS (/bible-translation-projects) */}
        {currentRoute === 'bible-translation-projects' && (
          <BibleTranslationProjectsPage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 24. FIELD EVIDENCE (/field-evidence) */}
        {currentRoute === 'field-evidence' && (
          <FieldEvidencePage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 25. EXPLORE CHURCH VISION (/explore-church-vision, alias: vision) */}
        {['explore-church-vision', 'vision'].includes(currentRoute) && (
          <ExploreChurchVisionPage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 26. SEE OUR GROUND IMPACT (/see-our-ground-impact, alias: impact) */}
        {['see-our-ground-impact', 'impact'].includes(currentRoute) && (
          <SeeOurGroundImpactPage
            settings={settings}
            projects={projects}
            donations={donations}
            currentCurrency={currentCurrency}
            onOpenDonate={() => handleOpenDonate()}
            onNavigate={handleNavigate}
          />
        )}

        {/* 27. CONTACT US (/contact-us, alias: contact) */}
        {['contact-us', 'contact'].includes(currentRoute) && (
          <ContactUsPage
            settings={settings}
            onContactSubmit={handleContactSubmit}
          />
        )}

        {/* INDEPENDENT PROJECT DETAILS PAGE */}
        {currentRoute === 'project-detail' && selectedProjectForDetail && (
          <ProjectDetailPage
            project={selectedProjectForDetail}
            currentCurrency={currentCurrency}
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* INDEPENDENT POLICIES (Privacy, Donation, Terms) */}
        {['privacy-policy', 'donation-policy', 'terms'].includes(currentRoute) && (
          <PolicyPage
            slug={currentRoute}
          />
        )}

        {/* INDEPENDENT FULL-PAGE DONATION EXPERIENCE */}
        {currentRoute === 'donate' && (
          <DonatePage
            projects={projects}
            settings={settings}
            currentCurrency={currentCurrency}
            onDonationComplete={handleDonationComplete}
          />
        )}
      </main>

      {/* 3. Reusable Dynamic Footer */}
      <Footer
        settings={settings}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenInstaller={() => setIsInstallerOpen(true)}
        onOpenCodeExplorer={() => setIsCodeExplorerOpen(true)}
        onDownloadZip={handleDownloadZip}
        onOpenDonate={() => handleOpenDonate()}
      />

      {/* Modal 1: Quick Donation Checkout */}
      <DonationModal
        isOpen={isDonateOpen}
        projects={projects}
        selectedProjectId={selectedProjectIdForDonation}
        currentCurrency={currentCurrency}
        settings={settings}
        onClose={() => setIsDonateOpen(false)}
        onDonationComplete={handleDonationComplete}
      />

      {/* Modal 2: Official Contribution Serial Receipt */}
      <DonationReceiptModal
        donation={receiptDonation}
        settings={settings}
        onClose={() => setReceiptDonation(null)}
      />

      {/* Modal 3: Complete Administrative Suite */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        projects={projects}
        setProjects={setProjects}
        donations={donations}
        setDonations={setDonations}
        settings={settings}
        setSettings={setSettings}
        auditLogs={auditLogs}
        setAuditLogs={setAuditLogs}
        onOpenReceipt={setReceiptDonation}
        onNavigatePage={handleNavigate}
        contactInquiries={contactInquiries}
        onTriggerMilestone={handleTriggerMilestoneTest}
      />

      {/* Modal 4: cPanel Web Installer Simulator */}
      <InstallerSimulatorModal
        isOpen={isInstallerOpen}
        onClose={() => setIsInstallerOpen(false)}
      />

      {/* Modal 5: Complete PHP/SQL Standalone Codebase Explorer */}
      <CodeExplorerModal
        isOpen={isCodeExplorerOpen}
        onClose={() => setIsCodeExplorerOpen(false)}
        onDownloadZip={handleDownloadZip}
        isDownloadingZip={isDownloadingZip}
      />

      {/* Real Database Donation Activity Notification System (Optional Feature) */}
      <DonationActivityNotification
        donations={donations}
        config={settings.donationActivityConfig}
        onOpenDonate={handleOpenDonate}
      />

      {/* Visual Fundraising Milestone Accomplishment Notification (50%, 75%, 100%) */}
      <MilestoneNotification
        activeMilestone={activeMilestone}
        onDismiss={() => setActiveMilestone(null)}
        onSelectProject={handleSelectProject}
        onOpenDonate={handleOpenDonate}
      />

    </div>
  );
}
