import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  CreditCard, 
  FileCheck2, 
  Search, 
  ArrowRight, 
  Heart, 
  Mail, 
  CheckCircle2,
  Sparkles,
  Building2,
  Layers
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'payments' | 'accountability' | 'governance';
  categoryLabel: string;
  question: string;
  answer: string;
  keyPoints?: string[];
  badge?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'why-manual-payments',
    category: 'payments',
    categoryLabel: 'Manual Payments',
    badge: 'Fiduciary Integrity',
    question: 'Why does Agape Light Network use direct manual payment methods instead of online card processing?',
    answer: 'To ensure 100% of your generous gift reaches frontline families without deduction. Commercial credit card gateways frequently deduct 3% to 6% in merchant processing and currency exchange surcharges, alongside strict geographic holding restrictions on foreign charitable remittances into Pakistan. By using direct manual methods—Western Union, MoneyGram, Pakistan Bank Account, and Manual Bank Wire—we eliminate predatory fees and ensure funds flow directly to authorized ministry trustees on the ground.',
    keyPoints: [
      'Zero commercial processor fees deducted from field gifts',
      'Direct transmission to verified ministry trustees',
      'No third-party financial intermediaries or holding delays'
    ]
  },
  {
    id: 'how-to-send-donation',
    category: 'payments',
    categoryLabel: 'Manual Payments',
    badge: 'Giving Process',
    question: 'How do I send my gift and receive an official donation voucher & receipt?',
    answer: 'The process is straightforward: 1. Choose your designated initiative (e.g. Clean Water Well, Brick Kiln Rescue, Urdu Bibles) or General Fund. 2. Select your preferred manual payment channel (Western Union, MoneyGram, Pakistan Bank, or Manual Bank Wire). 3. Note down the displayed recipient coordinates (Account Title, IBAN, SWIFT, or Recipient Name). 4. After remitting via your local bank, agent, or banking app, enter your transfer reference/MTCN in our confirmation form. An official PDF-ready Contribution Voucher is immediately generated with a tracking reference for our finance team to match.',
    keyPoints: [
      'Instant official Contribution Voucher with unique tracking code',
      'Printable and downloadable PDF receipt format',
      'Direct matching by our field treasury within 24–48 hours'
    ]
  },
  {
    id: 'wu-moneygram-instructions',
    category: 'payments',
    categoryLabel: 'Manual Payments',
    badge: 'Remittance Details',
    question: 'What details should I provide when sending via Western Union or MoneyGram?',
    answer: 'Direct your transfer to our authorized field founder: Rev. Azeem Tariq in Lahore, Pakistan. Once completed at any Western Union or MoneyGram agent location or through their mobile app, retain your 10-digit MTCN (Western Union) or 8-digit Reference Number (MoneyGram). Enter this number into the transaction ID field on our site or email it to contact@agapelightnetwork.org so our finance team can verify and disburse the funds to the specific frontline project.',
    keyPoints: [
      'Recipient: Rev. Azeem Tariq (Lahore, Pakistan)',
      'Retain and submit your 10-digit MTCN or 8-digit Reference Number',
      'Confirmation notice sent as soon as remittance is matched'
    ]
  },
  {
    id: 'bank-wire-swift-iban',
    category: 'payments',
    categoryLabel: 'Manual Payments',
    badge: 'International Wire',
    question: 'Can churches and foundations remit gifts via international bank wire (SWIFT / IBAN)?',
    answer: 'Yes. For institutional contributions from churches, mission boards, and family foundations across the UK, USA, Canada, Australia, and Europe, our bank coordinates provide full SWIFT/BIC and IBAN details for both our Pakistani fiduciary trust account and our international mission wire clearing channel. Formal institutional donation receipts and signed pastor certifications are provided for foundation tax and audit records.',
    keyPoints: [
      'Full SWIFT/BIC, IBAN, and routing codes available in Admin-managed settings',
      'Institutional receipt documentation provided for church mission boards',
      'Suitable for both one-time project sponsorships and recurring annual commitments'
    ]
  },
  {
    id: 'field-proof-and-gps',
    category: 'accountability',
    categoryLabel: 'Project Accountability',
    badge: 'Field Verification',
    question: 'What concrete proof do donors receive when funding a clean water well or village project?',
    answer: 'Every borehole well and village project is executed with full photographic and GPS verification. When a well is drilled, the sponsor receives: 1. Exact GPS coordinates (latitude and longitude) to view on Google Maps. 2. An official certified laboratory water purity analysis certifying the water is free of arsenic, nitrates, and microbial contamination. 3. High-resolution photos of the brass/marble dedication plaque bearing your church or family name. 4. A video report of the dedication service with village elders and catechists.',
    keyPoints: [
      'Precise GPS coordinates for satellite map verification',
      'Certified independent laboratory water quality test report',
      'Dedicatory plaque photos with your designated inscription'
    ]
  },
  {
    id: 'brick-kiln-legal-freedom',
    category: 'accountability',
    categoryLabel: 'Project Accountability',
    badge: 'Legal Rescue',
    question: 'How does the Brick Kiln Debt Rescue (Direct Debt Rescue) process work legally?',
    answer: 'We do not engage in informal cash payments that risk re-indebtedness. Our field legal team and Rev. Azeem Tariq negotiate directly with kiln management under legal supervision. The debt ledger is settled, and an official court-notarized legal discharge deed (Mukar-nama) is signed, permanently revoking all debt claims on the parents and children. The family is then immediately enrolled in our Post-Rescue Protocol for food security, emergency rent, and child literacy schooling.',
    keyPoints: [
      'Binding legal release document notarized by legal counsel',
      'Extinguishes generational bonded labor permanently',
      'Transition into Post-Rescue shelter, medical care, and vocational training'
    ]
  },
  {
    id: 'pastoral-video-call',
    category: 'accountability',
    categoryLabel: 'Project Accountability',
    badge: 'Pastoral Access',
    question: 'Can our pastor, mission board, or family speak directly with Rev. Azeem Tariq?',
    answer: 'Yes, absolutely. We actively encourage international church partners and major sponsors to schedule direct video conferences with Rev. Azeem Tariq. We share real-time frontline dispatches, pray together, and review scheduled project milestones before and after execution. Our leadership is always accessible via phone, WhatsApp, and Zoom.',
    keyPoints: [
      'Scheduled video calls for church mission boards and sponsors',
      'Live question-and-answer on field conditions and budgets',
      'Ongoing relationship and pastoral prayer covering'
    ]
  },
  {
    id: 'governance-and-100-percent-pledge',
    category: 'governance',
    categoryLabel: 'Governance & Trust',
    badge: '100% Pledge',
    question: 'What is your 100% Direct Field Pledge and how are operations audited?',
    answer: 'Under our founding mandate (John 8:12), 100% of every designated dollar or pound given for a specific initiative (e.g. water well, debt rescue, widow sustenance, Bible translation) is utilized exclusively for that field initiative. Operational and administrative costs are underwritten separately by our founding trustees. All accounts are governed under dual-signatory pastoral oversight and reflected transparently in our public financial ledgers.',
    keyPoints: [
      '100% of designated contributions applied to the specified frontline program',
      'Dual-signatory fiduciary control and annual public reports',
      'Full donor rights to request project-specific expenditure logs'
    ]
  }
];

interface DonorFaqAccordionProps {
  onOpenDonate: () => void;
  onNavigate: (route: string) => void;
}

export const DonorFaqAccordion: React.FC<DonorFaqAccordionProps> = ({
  onOpenDonate,
  onNavigate
}) => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['why-manual-payments', 'how-to-send-donation']));
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleItem = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenIds(new Set(FAQ_ITEMS.map(i => i.id)));
  };

  const collapseAll = () => {
    setOpenIds(new Set());
  };

  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = !searchQuery.trim() || 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section 
      id="donor-faq" 
      className="py-20 sm:py-24 lg:py-28 bg-white border-b border-slate-200/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 ring-4 ring-amber-600/20" aria-hidden="true" />
            <span>Fiduciary Clarity & Accountability</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-normal tracking-tight text-slate-900 leading-tight">
            Frequently Asked Questions for Donors
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 font-light leading-relaxed text-balance">
            Everything you need to know about our direct manual payment channels, field documentation standards, and 100% direct frontline stewardship.
          </p>
        </div>

        {/* Controls Toolbar: Search & Categories */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              All Questions ({FAQ_ITEMS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('payments')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'payments'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-amber-500" />
              <span>Manual Payments</span>
            </button>
            <button
              onClick={() => setSelectedCategory('accountability')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'accountability'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Project Accountability</span>
            </button>
            <button
              onClick={() => setSelectedCategory('governance')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'governance'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Governance & 100% Pledge</span>
            </button>
          </div>

          {/* Search Box & Expand/Collapse Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-hidden bg-slate-50/50"
              />
            </div>

            <div className="flex items-center gap-1 shrink-0 text-[11px] text-slate-500">
              <button
                onClick={expandAll}
                className="px-2 py-1 hover:text-slate-900 hover:underline cursor-pointer"
              >
                Expand all
              </button>
              <span className="text-slate-300">/</span>
              <button
                onClick={collapseAll}
                className="px-2 py-1 hover:text-slate-900 hover:underline cursor-pointer"
              >
                Collapse
              </button>
            </div>
          </div>

        </div>

        {/* Accordion List & Aside Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Main Accordion Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {filteredItems.length === 0 ? (
              <div className="p-10 text-center bg-slate-50 rounded-2xl border border-slate-200">
                <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <h3 className="font-serif text-lg font-bold text-slate-900">No matching questions found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your search query or reset the category filter to see all questions.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="mt-4 px-4 py-2 rounded-xl bg-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              filteredItems.map((item) => {
                const isOpen = openIds.has(item.id);
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen 
                        ? 'border-amber-600/30 bg-white shadow-sm ring-1 ring-amber-600/10' 
                        : 'border-slate-200/90 bg-white hover:border-slate-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-600"
                      aria-expanded={isOpen}
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            {item.categoryLabel}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          {item.question}
                        </h3>
                      </div>
                      
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 mt-0.5 ${
                        isOpen 
                          ? 'bg-amber-100 text-amber-800 rotate-180' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100/80 animate-in fade-in duration-150">
                        <p className="font-light text-slate-700">
                          {item.answer}
                        </p>

                        {item.keyPoints && item.keyPoints.length > 0 && (
                          <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2">
                            <div className="text-xs font-semibold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                              <span>Key Takeaways</span>
                            </div>
                            <ul className="space-y-1.5 pl-1">
                              {item.keyPoints.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Aside Information & Pastoral Contact Card (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Remittance Assurance Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-950 text-white border border-slate-800 shadow-md space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Uncompromised Security
                </div>
                <h4 className="font-serif text-xl font-bold text-white mt-1">
                  100% Direct Field Remittance
                </h4>
                <p className="text-xs text-slate-300 font-light mt-2 leading-relaxed">
                  Your designated contributions are received directly by our field trustees in Pakistan without administrative diversion. Official vouchers are issued with verified transaction tracking.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenDonate()}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-white/20" />
                  <span>Choose Initiative & Donate</span>
                </button>
              </div>
            </div>

            {/* Need Direct Assistance Card */}
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-900 uppercase tracking-wider">
                <Mail className="w-4 h-4 text-amber-700" />
                <span>Have a Specific Question?</span>
              </div>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                If your church committee needs customized wire instructions, bank routing clarification, or a live Zoom call with Rev. Azeem Tariq, our pastoral liaison is available.
              </p>
              
              <div className="pt-1 space-y-2">
                <button
                  onClick={() => onNavigate('contact-us')}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <span>Contact Pastoral Team</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => onNavigate('frontline-accountability')}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-amber-800 hover:text-amber-900 font-medium text-xs transition-colors cursor-pointer text-center"
                >
                  <span>Read Field Accountability Standards &rarr;</span>
                </button>
              </div>
            </div>

            {/* Supported Regions Summary */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-700" />
                <span>Supported Partner Regions</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                Direct bank transfers, Western Union, and MoneyGram remittances are processed from donors in the United Kingdom, United States, Canada, Australia, New Zealand, Switzerland, Germany, and across Europe.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
