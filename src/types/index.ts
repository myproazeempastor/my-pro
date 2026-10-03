export type CurrencyCode = 'USD' | 'GBP' | 'CAD' | 'AUD' | 'EUR';

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  location: string;
  summary: string;
  description: string;
  imageUrl: string;
  galleryImages: string[];
  goalAmount: number;
  raisedAmount: number;
  currency: CurrencyCode;
  donorCount: number;
  isFeatured: boolean;
  status: 'active' | 'completed' | 'urgent' | 'archived';
  startDate: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ManualPaymentMethod {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
  instructions: string;
  recipientDetails?: string;
  bankName?: string;
  accountTitle?: string;
  accountNumber?: string;
  iban?: string;
  swiftBic?: string;
  branchInfo?: string;
  additionalDetails?: string;
}

export interface Donation {
  id: number;
  reference: string; // e.g. ALN-2026-8492
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  donorCountry: string;
  amount: number;
  currency: CurrencyCode;
  projectId: number | null; // null = General Fund
  projectTitle: string;
  paymentMethod: string; // Dynamic manual payment method name or ID
  paymentStatus: 'pending' | 'confirmed' | 'failed' | 'refunded' | 'cancelled';
  transactionId?: string;
  isAnonymous: boolean;
  createdAt: string;
  confirmedAt?: string;
  notes?: string;
  adminAdjusted?: boolean;
  allowPublicActivity?: boolean; // Admin can toggle whether this donation appears in activity notifications (default true)
  isDemo?: boolean; // Strictly marked for development/visual testing demo data
}

export interface DonationActivityConfig {
  enabled: boolean;
  maxPerSession: number;
  displayDurationSeconds: number;
  delayBetweenSeconds: number;
  initialDelaySeconds: number;
  privacyMode: 'name_when_allowed' | 'initials_only' | 'always_anonymous';
  showAmount: boolean;
  showCountry: boolean;
  showProject: boolean;
  includePending: boolean;
  demoMode: boolean; // For development/testing only
}

export interface SmtpConfig {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword?: string;
  smtpEncryption: 'TLS' | 'SSL' | 'none';
  senderName: string;
  senderEmail: string;
  adminNotificationEmail: string;
  smtpEnabled: boolean;
}

export interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt: string;
  source: string;
  emailStatus: 'sent' | 'failed' | 'queued';
  smtpDetails?: string;
}

export interface SocialMediaLinks {
  facebook?: string;
  youtube?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
}

export interface SiteSettings {
  orgName: string;
  tagline: string;
  scriptureVerse: string;
  scriptureReference: string;
  founderName: string;
  founderTitle: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  primaryColor: string;
  accentColor: string;
  defaultCurrency: CurrencyCode;
  paypalEmail: string;
  stripePublishableKey: string;
  stripeSecretKeyConfigured: boolean;
  bankAccountDetails: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    swiftBic: string;
    iban: string;
  };
  enableDemoPayments: boolean;
  smtpConfig: SmtpConfig;
  paymentMethods: ManualPaymentMethod[];
  donationActivityConfig: DonationActivityConfig;
  socialLinks?: SocialMediaLinks;
}

export interface AuditLogItem {
  id: number;
  timestamp: string;
  action: string;
  userId: string;
  details: string;
  ipAddress: string;
}

export interface CustomPage {
  id: number;
  slug: string;
  title: string;
  content: string;
  isPublished: boolean;
  updatedAt: string;
}

export interface ShopItem {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  item: ShopItem;
  quantity: number;
}

export interface DonorTestimonial {
  id: string;
  donorName: string;
  roleOrAffiliation: string;
  organization?: string;
  location: string;
  country: string;
  countryCode: 'UK' | 'US' | 'CA' | 'AU' | 'EU';
  flag: string;
  initiative: string;
  quote: string;
  fullTestimonial?: string;
  partnerSince: string;
  verificationBadge: string;
  verifiedAudit: boolean;
  avatarInitials: string;
  ratingStars?: number;
}
