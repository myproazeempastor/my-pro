import { Project, Donation, SiteSettings, CustomPage, AuditLogItem, ManualPaymentMethod, DonationActivityConfig, SocialMediaLinks } from '../types';

export const defaultSocialLinks: SocialMediaLinks = {
  facebook: 'https://facebook.com/agapelightnetwork',
  youtube: 'https://youtube.com/@agapelightnetwork',
  instagram: 'https://instagram.com/agapelightnetwork',
  twitter: 'https://x.com/agapelightnet',
  whatsapp: 'https://wa.me/18005552568'
};

export const defaultDonationActivityConfig: DonationActivityConfig = {
  enabled: true,
  maxPerSession: 4,
  displayDurationSeconds: 6,
  delayBetweenSeconds: 12,
  initialDelaySeconds: 4,
  privacyMode: 'name_when_allowed',
  showAmount: true,
  showCountry: true,
  showProject: true,
  includePending: true,
  demoMode: false
};

export const sampleDemoDonations: Donation[] = [
  {
    id: 901,
    reference: 'DEMO-ALN-901',
    donorName: 'Jonathan Edwards (Demo)',
    donorEmail: 'demo.j.edwards@test.org',
    donorCountry: 'United Kingdom',
    amount: 150,
    currency: 'GBP',
    projectId: 1,
    projectTitle: 'Clean Water & Deep Wells Project',
    paymentMethod: 'western-union',
    paymentStatus: 'confirmed',
    transactionId: 'DEMO-MTCN-8921',
    isAnonymous: false,
    createdAt: '2026-03-31 10:14:00',
    confirmedAt: '2026-03-31 10:15:00',
    notes: 'DEMO RECORD: For visual testing of activity notifications only.',
    allowPublicActivity: true,
    isDemo: true
  },
  {
    id: 902,
    reference: 'DEMO-ALN-902',
    donorName: 'Anonymous Partner (Demo)',
    donorEmail: 'demo.anon@test.org',
    donorCountry: 'United States',
    amount: 350,
    currency: 'USD',
    projectId: 3,
    projectTitle: 'Mobile Medical & Eye Care Camps',
    paymentMethod: 'moneygram',
    paymentStatus: 'confirmed',
    transactionId: 'DEMO-MG-4421',
    isAnonymous: true,
    createdAt: '2026-03-31 11:22:00',
    confirmedAt: '2026-03-31 11:23:00',
    notes: 'DEMO RECORD: For visual testing of activity notifications only.',
    allowPublicActivity: true,
    isDemo: true
  },
  {
    id: 903,
    reference: 'DEMO-ALN-903',
    donorName: 'Catherine Tremblay (Demo)',
    donorEmail: 'demo.tremblay@test.ca',
    donorCountry: 'Canada',
    amount: 200,
    currency: 'CAD',
    projectId: 4,
    projectTitle: 'Widows & Orphans Sustenance Network',
    paymentMethod: 'manual-bank-transfer',
    paymentStatus: 'confirmed',
    transactionId: 'DEMO-WIRE-3319',
    isAnonymous: false,
    createdAt: '2026-03-31 12:45:00',
    confirmedAt: '2026-03-31 12:46:00',
    notes: 'DEMO RECORD: For visual testing of activity notifications only.',
    allowPublicActivity: true,
    isDemo: true
  },
  {
    id: 904,
    reference: 'DEMO-ALN-904',
    donorName: 'Mark & Sarah Campbell (Demo)',
    donorEmail: 'demo.campbell@test.au',
    donorCountry: 'Australia',
    amount: 100,
    currency: 'AUD',
    projectId: 2,
    projectTitle: 'Bibles for Believers & Children Literacy',
    paymentMethod: 'pakistan-bank-account',
    paymentStatus: 'confirmed',
    transactionId: 'DEMO-RAAST-7712',
    isAnonymous: false,
    createdAt: '2026-03-31 13:10:00',
    confirmedAt: '2026-03-31 13:11:00',
    notes: 'DEMO RECORD: For visual testing of activity notifications only.',
    allowPublicActivity: true,
    isDemo: true
  }
];

export const initialPaymentMethods: ManualPaymentMethod[] = [
  {
    id: 'western-union',
    name: 'Western Union',
    enabled: true,
    order: 1,
    instructions: 'Send your donation via Western Union to our authorized ministry recipient in Pakistan. Once the transaction is completed at any Western Union location or through the Western Union app, please enter your MTCN (Money Transfer Control Number) in the donation notes or email it to us so we can verify and confirm your gift.',
    recipientDetails: 'Recipient Full Name: Rev. Azeem Tariq\nCity / Location: Lahore, Pakistan\nPhone: +1 (800) 555-ALN8 / +92 300 0000000\nPurpose: Charitable Mission Donation / Religious Support',
    bankName: '',
    accountTitle: '',
    accountNumber: '',
    iban: '',
    swiftBic: '',
    branchInfo: '',
    additionalDetails: 'Retain your MTCN. After submitting this form, your donation reference voucher is issued and our finance office will match the transfer.'
  },
  {
    id: 'moneygram',
    name: 'MoneyGram',
    enabled: true,
    order: 2,
    instructions: 'Transfer your donation using MoneyGram at an agent location or via the MoneyGram mobile app/website. Direct the transfer to our official field leadership recipient and provide the 8-digit Reference Number.',
    recipientDetails: 'First Name: Azeem\nLast Name: Tariq\nCountry: Pakistan\nCity: Lahore\nPhone: +1 (800) 555-ALN8\nRecipient Identification: Official National ID / Ministry Credentials on file',
    bankName: '',
    accountTitle: '',
    accountNumber: '',
    iban: '',
    swiftBic: '',
    branchInfo: '',
    additionalDetails: 'Please specify the 8-digit MoneyGram Reference number in the notes field or send it to contact@agapelightnetwork.org.'
  },
  {
    id: 'pakistan-bank-account',
    name: 'Pakistan Bank Account',
    enabled: true,
    order: 3,
    bankName: 'Habib Bank Limited (HBL) / Allied Bank of Pakistan',
    accountTitle: 'Agape Light Network Ministry Trust',
    accountNumber: '0123-4567890123',
    iban: 'PK36HABB0001234567890123',
    swiftBic: 'HABBPKKA',
    branchInfo: 'Main Commercial Branch, Lahore, Pakistan (Branch Code: 0123)',
    instructions: 'For direct cash/cheque deposits within Pakistan, Raast instant transfers, 1Link online interbank transfers, or international inward remittances routed through Pakistani banks.',
    recipientDetails: 'Official Trust Registration: Agape Light Network Non-Profit Fiduciary Trust',
    additionalDetails: 'Kindly mention your donor reference number in the transfer narration/remarks and notify us after transfer.'
  },
  {
    id: 'manual-bank-transfer',
    name: 'Manual Bank Transfer',
    enabled: true,
    order: 4,
    bankName: 'Global Mission Trust Bank / Wire Clearing',
    accountTitle: 'Agape Light Network Inc',
    accountNumber: '409281729018',
    iban: 'US89AGAP0000409281729018',
    swiftBic: 'AGAPUS33XXX',
    branchInfo: 'International Ministry Wire Division, New York, NY, USA',
    instructions: 'Instruct your commercial bank to execute a manual wire transfer (Fedwire, SWIFT, CHAPS, or SEPA) to our direct ministry fiduciary account.',
    recipientDetails: 'Fiduciary Account: Agape Light Network International Direct Mission Clearing',
    additionalDetails: 'Include your contribution voucher reference number in Field 70 (Remittance Information / Wire Memo) for direct project earmarking.'
  }
];

export const initialSettings: SiteSettings = {
  orgName: 'Agape Light Network',
  tagline: 'Spreading Light, Living Love',
  scriptureVerse: 'I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.',
  scriptureReference: 'John 8:12',
  founderName: 'Rev. Azeem Tariq',
  founderTitle: 'Founder & President',
  contactEmail: 'contact@agapelightnetwork.org',
  contactPhone: '+1 (800) 555-ALN8',
  address: 'Agape Light Network International Ministry Center',
  primaryColor: '#0f172a',
  accentColor: '#d97706',
  defaultCurrency: 'USD',
  paypalEmail: 'donations@agapelightnetwork.org',
  stripePublishableKey: 'pk_test_sample_agape_light_51Mxyz',
  stripeSecretKeyConfigured: true,
  bankAccountDetails: {
    bankName: 'Global Mission Trust Bank',
    accountTitle: 'Agape Light Network Inc',
    accountNumber: '409281729018',
    swiftBic: 'AGAPUS33XXX',
    iban: 'US89AGAP0000409281729018'
  },
  enableDemoPayments: true,
  smtpConfig: {
    smtpHost: 'mail.agapelightnetwork.org',
    smtpPort: 587,
    smtpUsername: 'notifications@agapelightnetwork.org',
    smtpPassword: 'SecureSmtpAuthPassword2026',
    smtpEncryption: 'TLS',
    senderName: 'Agape Light Network Website',
    senderEmail: 'notifications@agapelightnetwork.org',
    adminNotificationEmail: 'azeemtariq809@gmail.com',
    smtpEnabled: true
  },
  paymentMethods: initialPaymentMethods,
  donationActivityConfig: defaultDonationActivityConfig,
  socialLinks: defaultSocialLinks
};

export const initialProjects: Project[] = [
  {
    id: 1,
    slug: 'clean-water-wells',
    title: 'Clean Water & Deep Wells Project',
    category: 'Humanitarian Relief',
    location: 'Remote Rural Communities & Villages',
    summary: 'Drilling sustainable clean water boreholes and solar-powered filtration units to bring life-giving clean water to underprivileged families.',
    description: 'In rural arid communities, women and young children walk miles every day to collect contaminated pond water, resulting in waterborne diseases. Under the direct field leadership of Rev. Azeem Tariq, this project establishes certified deep aquifer wells and solar pump stations. Every installed well is dedicated with prayer and provides pure drinking water for over 400 community members for decades.',
    imageUrl: '/assets/images/clean-water-well-field.jpg',
    galleryImages: [
      '/assets/images/clean-water-well-field.jpg',
      '/assets/images/village-borehole-dedication.jpg',
      '/assets/images/water-well-filtration-unit.jpg',
      '/assets/images/children-clean-water-joy.jpg'
    ],
    goalAmount: 15000,
    raisedAmount: 9450,
    currency: 'USD',
    donorCount: 42,
    isFeatured: true,
    status: 'active',
    startDate: '2026-01-15',
    seoTitle: 'Clean Water & Deep Wells - Agape Light Network',
    seoDescription: 'Support life-saving clean water wells for vulnerable families through Agape Light Network.'
  },
  {
    id: 2,
    slug: 'bible-distribution-literacy',
    title: 'Bibles for Believers & Children Literacy',
    category: 'Ministry & Education',
    location: 'Persecuted & Rural Regions',
    summary: 'Placing the Word of God into the hands of believers in their native tongue and funding literacy classes for marginalized children.',
    description: 'Many believers in persecuted and impoverished areas have prayed for years to hold their own copy of the Holy Scriptures. This initiative prints, transports, and gifts durable Bibles in Urdu, Hindi, and regional dialects, paired with weekend literacy programs for illiterate adults and impoverished children who cannot afford formal schooling.',
    imageUrl: '/assets/images/bible-distribution-community.jpg',
    galleryImages: [
      '/assets/images/bible-distribution-community.jpg',
      '/assets/images/children-reading-bibles.jpg',
      '/assets/images/night-literacy-classroom.jpg'
    ],
    goalAmount: 8000,
    raisedAmount: 5120,
    currency: 'USD',
    donorCount: 28,
    isFeatured: true,
    status: 'active',
    startDate: '2026-02-01',
    seoTitle: 'Bible Distribution & Literacy - Agape Light Network',
    seoDescription: 'Empower believers with God’s Word and free Christian literacy education.'
  },
  {
    id: 3,
    slug: 'mobile-medical-eye-camps',
    title: 'Mobile Medical & Eye Care Camps',
    category: 'Healthcare Outreach',
    location: 'Brick Kiln Workers & Slum Settlements',
    summary: 'Deploying volunteer Christian doctors, pediatricians, and optometrists to provide free checkups, medication, and cataract screenings.',
    description: 'Laborers in brick kilns and rural settlements suffer from chronic dust inhalation, eye trauma, diabetes, and infections with zero healthcare access. Our mobile medical outreach van visits quarterly, providing free diagnostic exams, prescription medicines, eye spectacles, and surgical referrals with compassionate prayer support.',
    imageUrl: '/assets/images/mobile-medical-camp.jpg',
    galleryImages: [
      '/assets/images/mobile-medical-camp.jpg',
      '/assets/images/medical-optometry-screening.jpg',
      '/assets/images/rural-clinic-outreach-van.jpg',
      '/assets/images/medical-prescription-dispensary.jpg'
    ],
    goalAmount: 12000,
    raisedAmount: 4350,
    currency: 'USD',
    donorCount: 19,
    isFeatured: true,
    status: 'active',
    startDate: '2026-02-20',
    seoTitle: 'Mobile Medical Care - Agape Light Network',
    seoDescription: 'Provide essential medical and eye care to marginalized laborers and their children.'
  },
  {
    id: 4,
    slug: 'widow-orphan-emergency-care',
    title: 'Widows & Orphans Sustenance Network',
    category: 'Family Welfare',
    location: 'Suburban Slums & High-Poverty Enclaves',
    summary: 'Delivering monthly food rations, warm winter clothing, and emergency shelter repairs to abandoned widows and fatherless children.',
    description: 'True and undefiled religion before God is to visit orphans and widows in their affliction (James 1:27). Agape Light Network currently maintains an audited sponsorship registry that provides monthly bags of flour, rice, cooking oil, lentils, warm winter blankets, and hygiene kits directly into the hands of registered widows.',
    imageUrl: '/assets/images/widows-orphans-sustenance.jpg',
    galleryImages: [
      '/assets/images/widows-orphans-sustenance.jpg',
      '/assets/images/widow-family-food-delivery.jpg',
      '/assets/images/winter-warm-blankets-distribution.jpg'
    ],
    goalAmount: 20000,
    raisedAmount: 14800,
    currency: 'USD',
    donorCount: 56,
    isFeatured: true,
    status: 'active',
    startDate: '2026-01-01',
    seoTitle: 'Widow & Orphan Support - Agape Light Network',
    seoDescription: 'Monthly food security and loving pastoral care for widows and fatherless children.'
  }
];

export const initialDonations: Donation[] = [
  {
    id: 101,
    reference: 'ALN-2026-0142',
    donorName: 'David & Sarah Jenkins',
    donorEmail: 'd.jenkins@example.com',
    donorCountry: 'United States',
    amount: 500,
    currency: 'USD',
    projectId: 1,
    projectTitle: 'Clean Water & Deep Wells Project',
    paymentMethod: 'western-union',
    paymentStatus: 'confirmed',
    transactionId: 'WU-89102481',
    isAnonymous: false,
    createdAt: '2026-03-24 14:22:10',
    confirmedAt: '2026-03-24 14:22:15',
    notes: 'In loving memory of Pastor Arthur Jenkins.',
    allowPublicActivity: true,
    isDemo: false
  },
  {
    id: 102,
    reference: 'ALN-2026-0143',
    donorName: 'Grace Community Fellowship',
    donorEmail: 'missions@gcf-uk.org',
    donorCountry: 'United Kingdom',
    amount: 1200,
    currency: 'GBP',
    projectId: 4,
    projectTitle: 'Widows & Orphans Sustenance Network',
    paymentMethod: 'manual-bank-transfer',
    paymentStatus: 'confirmed',
    transactionId: 'WIRE-UK-9028114',
    isAnonymous: false,
    createdAt: '2026-03-25 09:15:00',
    confirmedAt: '2026-03-26 11:30:00',
    notes: 'Q1 Mission Offering for Widow Care.',
    allowPublicActivity: true,
    isDemo: false
  },
  {
    id: 103,
    reference: 'ALN-2026-0144',
    donorName: 'Anonymous Supporter',
    donorEmail: 'donor.aus@example.com',
    donorCountry: 'Australia',
    amount: 250,
    currency: 'AUD',
    projectId: 2,
    projectTitle: 'Bibles for Believers & Children Literacy',
    paymentMethod: 'moneygram',
    paymentStatus: 'confirmed',
    transactionId: 'MG-994829104',
    isAnonymous: true,
    createdAt: '2026-03-27 16:45:00',
    confirmedAt: '2026-03-27 16:46:12',
    notes: 'May God multiply His Word.',
    allowPublicActivity: true,
    isDemo: false
  },
  {
    id: 104,
    reference: 'ALN-2026-0145',
    donorName: 'Robert Vance',
    donorEmail: 'rvance@example.ca',
    donorCountry: 'Canada',
    amount: 300,
    currency: 'CAD',
    projectId: 1,
    projectTitle: 'Clean Water & Deep Wells Project',
    paymentMethod: 'western-union',
    paymentStatus: 'confirmed',
    transactionId: 'WU-84920199',
    isAnonymous: false,
    createdAt: '2026-03-28 10:11:00',
    confirmedAt: '2026-03-28 10:11:02',
    notes: 'Blessing to Rev. Azeem Tariq and the ministry team.',
    allowPublicActivity: true,
    isDemo: false
  },
  {
    id: 105,
    reference: 'ALN-2026-0146',
    donorName: 'Dr. Stefan Meier',
    donorEmail: 'meier.md@clinic.ch',
    donorCountry: 'Switzerland',
    amount: 450,
    currency: 'EUR',
    projectId: 3,
    projectTitle: 'Mobile Medical & Eye Care Camps',
    paymentMethod: 'manual-bank-transfer',
    paymentStatus: 'confirmed',
    transactionId: 'SEPA-CH-882103',
    isAnonymous: false,
    createdAt: '2026-03-29 11:30:00',
    confirmedAt: '2026-03-29 11:35:00',
    notes: 'For rural mobile dispensary and medicine supply.',
    allowPublicActivity: true,
    isDemo: false
  },
  {
    id: 106,
    reference: 'ALN-2026-0147',
    donorName: 'Covenant Life Assembly',
    donorEmail: 'outreach@covenantlife.us',
    donorCountry: 'United States',
    amount: 1500,
    currency: 'USD',
    projectId: 1,
    projectTitle: 'Clean Water & Deep Wells Project',
    paymentMethod: 'manual-bank-transfer',
    paymentStatus: 'confirmed',
    transactionId: 'WIRE-US-774102',
    isAnonymous: false,
    createdAt: '2026-03-30 08:20:00',
    confirmedAt: '2026-03-30 08:25:00',
    notes: 'Village borehole partnership sponsorship.',
    allowPublicActivity: true,
    isDemo: false
  },
  {
    id: 107,
    reference: 'ALN-2026-0148',
    donorName: 'A Faithful Sister in Christ',
    donorEmail: 'sister.grace@example.co.uk',
    donorCountry: 'United Kingdom',
    amount: 175,
    currency: 'GBP',
    projectId: 4,
    projectTitle: 'Widows & Orphans Sustenance Network',
    paymentMethod: 'moneygram',
    paymentStatus: 'confirmed',
    transactionId: 'MG-11928401',
    isAnonymous: true,
    createdAt: '2026-03-30 15:40:00',
    confirmedAt: '2026-03-30 15:42:00',
    notes: 'For widow food sacks and blankets.',
    allowPublicActivity: true,
    isDemo: false
  }
];

export const initialPages: CustomPage[] = [
  {
    id: 1,
    slug: 'about',
    title: 'About Agape Light Network',
    content: `
      <h2>Spreading Light, Living Love</h2>
      <p>Agape Light Network is an international Christian charitable and gospel outreach network founded and led by <strong>Rev. Azeem Tariq</strong>. Grounded in the divine declaration of Jesus Christ in <em>John 8:12</em> ("I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life"), our calling is twofold: to shine the light of spiritual truth through the Gospel and to embody Christ's sacrificial love (Agape) through urgent humanitarian relief.</p>
      
      <h3>Our Core Pillars</h3>
      <ul>
        <li><strong>Evangelical Compassion:</strong> Serving the poorest of the poor regardless of caste or background, bearing witness through unconditional kindness.</li>
        <li><strong>Financial Transparency:</strong> Every cent given to our designated projects is accounted for with independent receipts and documented field photographic reports.</li>
        <li><strong>Sustainable Dignity:</strong> Rather than momentary relief alone, we drill permanent deep water wells, provide Bible literacy, and equip widows with self-reliance sewing equipment.</li>
      </ul>
    `,
    isPublished: true,
    updatedAt: '2026-03-15 10:00:00'
  },
  {
    id: 2,
    slug: 'transparency',
    title: 'Financial Stewardship & Accountability',
    content: `
      <h2>Our Sacred Duty of Financial Integrity</h2>
      <p>At Agape Light Network, under the leadership of Rev. Azeem Tariq, we consider every donation a holy trust placed before the Lord Jesus Christ. We are committed to rigorous fiscal responsibility.</p>
      
      <h3>Key Governance Commitments</h3>
      <ul>
        <li><strong>Designated Giving Policy:</strong> 100% of donations made to a specific project (e.g. Water Wells or Widow Care) are allocated directly to that field operation.</li>
        <li><strong>Zero Embellishment:</strong> We never invent fundraising totals, donor testimonials, or beneficiary numbers. Real receipts and verified audit entries are kept in our administrative database.</li>
        <li><strong>Official Receipts:</strong> Every supporter receives an identifiable serial receipt (e.g. ALN-2026-XXXX) confirming date, currency, payment gateway reference, and project assignment.</li>
      </ul>
    `,
    isPublished: true,
    updatedAt: '2026-03-20 14:00:00'
  }
];

export const initialAuditLogs: AuditLogItem[] = [
  {
    id: 1,
    timestamp: '2026-03-28 09:30:12',
    action: 'SETTINGS_UPDATE',
    userId: 'Rev. Azeem Tariq (SuperAdmin)',
    details: 'Verified financial transparency statement and updated primary donation currencies.',
    ipAddress: '198.51.100.24'
  },
  {
    id: 2,
    timestamp: '2026-03-27 16:46:12',
    action: 'DONATION_CONFIRMED',
    userId: 'Gateway_PayPal_IPN',
    details: 'Donation ref ALN-2026-0144 of 250 AUD verified and recorded.',
    ipAddress: '173.0.82.126'
  },
  {
    id: 3,
    timestamp: '2026-03-26 11:30:00',
    action: 'MANUAL_STATUS_ADJUST',
    userId: 'Rev. Azeem Tariq (SuperAdmin)',
    details: 'Verified Bank Wire WIRE-UK-9028114 (£1200) received in mission account. Status changed to Confirmed.',
    ipAddress: '198.51.100.24'
  }
];
