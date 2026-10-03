import React, { useState, useEffect } from 'react';
import { CurrencyCode, SiteSettings } from '../types';
import { 
  Heart, 
  ShieldCheck, 
  Download, 
  Code2, 
  Wrench, 
  Menu, 
  X,
  ChevronDown,
  Globe2,
  ShoppingBag,
  User,
  Compass,
  BookOpen,
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  settings: SiteSettings;
  currentCurrency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  onOpenDonate: (projectId?: number) => void;
  onOpenAdmin: () => void;
  onOpenInstaller: () => void;
  onOpenCodeExplorer: () => void;
  onDownloadZip: () => void;
  isDownloadingZip: boolean;
  currentRoute: string;
  onNavigate: (route: string) => void;
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  currentCurrency,
  onCurrencyChange,
  onOpenDonate,
  onOpenAdmin,
  onOpenInstaller,
  onOpenCodeExplorer,
  onDownloadZip,
  isDownloadingZip,
  currentRoute,
  onNavigate,
  cartCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const currencies: { code: CurrencyCode; symbol: string; label: string }[] = [
    { code: 'USD', symbol: '$', label: 'USD ($)' },
    { code: 'GBP', symbol: '£', label: 'GBP (£)' },
    { code: 'EUR', symbol: '€', label: 'EUR (€)' },
    { code: 'CAD', symbol: 'CA$', label: 'CAD ($)' },
    { code: 'AUD', symbol: 'A$', label: 'AUD ($)' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-shadow duration-300">
      {/* 1. Top Utility & International Stewardship Bar */}
      <div className="bg-slate-950 text-slate-300 border-b border-slate-800/80 text-[11px] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
          {/* Scripture & Mandate */}
          <div className="flex items-center gap-2 text-slate-300 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-amber-400 font-serif font-bold text-xs" aria-hidden="true">✦</span>
            <span className="italic font-serif text-slate-200 truncate">
              &ldquo;{settings.scriptureVerse}&rdquo;
            </span>
            <span className="text-amber-400 font-medium whitespace-nowrap hidden sm:inline">
              — {settings.scriptureReference}
            </span>
          </div>

          {/* Right Tools: Currency, Cart, Account, and Technical cPanel */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-auto">
            {/* Currency Selector */}
            <div className="flex items-center gap-1">
              <Globe2 className="w-3 h-3 text-slate-400 hidden sm:inline" />
              <label htmlFor="currency-select" className="sr-only">Select Currency</label>
              <select
                id="currency-select"
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="bg-slate-900 border border-slate-700/80 rounded px-1.5 py-0.5 text-[11px] text-amber-300 font-medium focus:outline-hidden focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                {currencies.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <span className="w-px h-3 bg-slate-800 hidden sm:inline" aria-hidden="true" />

            {/* Partner Account Link */}
            <button
              onClick={() => handleNavClick('my-account')}
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
              title="Partner Account Portal"
            >
              <User className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Partner Account</span>
            </button>

            {/* Ministry Store Cart */}
            <button
              onClick={() => handleNavClick('cart')}
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-[11px] relative cursor-pointer"
              title="View Ministry Literature Cart"
            >
              <ShoppingBag className="w-3 h-3 text-slate-400" />
              <span className="hidden sm:inline">Basket</span>
              {cartCount > 0 && (
                <span className="bg-amber-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full ml-0.5">
                  {cartCount}
                </span>
              )}
            </button>

            <span className="w-px h-3 bg-slate-800 hidden sm:inline" aria-hidden="true" />

            {/* cPanel & Admin Shortcuts */}
            <div className="hidden lg:flex items-center gap-3 text-[11px]">
              <button
                onClick={onOpenCodeExplorer}
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                title="View Standalone PHP/MySQL Codebase"
              >
                <Code2 className="w-3 h-3 text-slate-400" />
                <span>PHP Source</span>
              </button>
              <button
                onClick={onOpenInstaller}
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                title="cPanel Installation Wizard"
              >
                <Wrench className="w-3 h-3 text-slate-400" />
                <span>Installer</span>
              </button>
              <button
                onClick={onDownloadZip}
                disabled={isDownloadingZip}
                className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-medium cursor-pointer"
                title="Download cPanel ZIP Package"
              >
                <Download className="w-3 h-3" />
                <span>{isDownloadingZip ? 'Packaging...' : 'cPanel ZIP'}</span>
              </button>
              <button
                onClick={onOpenAdmin}
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                title="Admin Management Panel"
              >
                <ShieldCheck className="w-3 h-3 text-amber-500" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav 
        className={`bg-white border-b transition-colors duration-200 ${
          isScrolled ? 'border-slate-200/90 shadow-sm' : 'border-slate-200/60'
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            
            {/* Organization Logo & Identity */}
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-600 rounded-lg p-1 -ml-1"
            >
              {/* Refined European Architectural Emblem */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shadow-xs group-hover:border-amber-500/50 transition-colors shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2v20M7 8h10" />
                  <circle cx="12" cy="5" r="1.5" fill="#f59e0b" stroke="none" />
                  <path d="M4 15c2-2 4-2 6 0s4 2 6 0 4-2 4-2" />
                </svg>
              </div>

              <div className="min-w-0">
                <span className="block font-serif text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-tight group-hover:text-amber-800 transition-colors">
                  {settings.orgName}
                </span>
                <span className="block text-[11px] font-sans font-medium uppercase tracking-[0.16em] text-slate-500 leading-none mt-1">
                  {settings.tagline}
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-6">
              
              {/* Home */}
              <button 
                onClick={() => handleNavClick('home')}
                className={`text-sm font-medium transition-colors cursor-pointer py-1 relative ${
                  currentRoute === 'home' 
                    ? 'text-slate-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Home
              </button>

              {/* Dropdown 1: Mission & Mandate */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('mission')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => handleNavClick('the-mission')}
                  className={`text-sm font-medium transition-colors cursor-pointer py-1 flex items-center gap-1 ${
                    ['the-mission', 'the-john-812-mandate', 'strategic-blueprint', 'explore-church-vision', 'frontline-leadership-origins', 'uncompromised-theology'].includes(currentRoute)
                      ? 'text-slate-900 font-semibold' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-expanded={activeDropdown === 'mission'}
                >
                  <span>Mission & Vision</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === 'mission' ? 'rotate-180 text-amber-700' : ''}`} />
                </button>

                {activeDropdown === 'mission' && (
                  <div className="absolute top-full left-0 w-72 bg-white border border-slate-200/90 rounded-xl shadow-lg p-2 mt-1 z-50 transition-all">
                    <button
                      onClick={() => handleNavClick('the-mission')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">The Mission</div>
                      <div className="text-[11px] text-slate-500 font-normal">Spreading light, living Christ&apos;s love</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('the-john-812-mandate')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900 flex items-center justify-between">
                        <span>The John 8:12 Mandate</span>
                        <span className="text-[9px] font-bold text-amber-700 uppercase bg-amber-50 px-1.5 py-0.5 rounded">Core</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">Light of the world biblical foundation</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('strategic-blueprint')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">Strategic Blueprint</div>
                      <div className="text-[11px] text-slate-500 font-normal">5-Year master plan & 20,000 family targets</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('explore-church-vision')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">Explore Church Vision</div>
                      <div className="text-[11px] text-slate-500 font-normal">Underground assemblies & village revivals</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('frontline-leadership-origins')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">Frontline Leadership Origins</div>
                      <div className="text-[11px] text-slate-500 font-normal">Rev. Azeem Tariq & 20-year history</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('uncompromised-theology')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">Uncompromised Theology</div>
                      <div className="text-[11px] text-slate-500 font-normal">Statement of faith & doctrinal confession</div>
                    </button>
                  </div>
                )}
              </div>

              {/* Dropdown 2: Rescue & Ministries */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('rescue')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => handleNavClick('direct-debt-rescue')}
                  className={`text-sm font-medium transition-colors cursor-pointer py-1 flex items-center gap-1 ${
                    ['direct-debt-rescue', 'post-rescue-protocol', 'next-gen-rescue-discipleship', 'womens-liberation-covering', 'healing-crusades', 'pastors-training', 'sponsor-a-project'].includes(currentRoute)
                      ? 'text-slate-900 font-semibold' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-expanded={activeDropdown === 'rescue'}
                >
                  <span>Frontline Rescue</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === 'rescue' ? 'rotate-180 text-amber-700' : ''}`} />
                </button>

                {activeDropdown === 'rescue' && (
                  <div className="absolute top-full left-0 w-72 bg-white border border-slate-200/90 rounded-xl shadow-lg p-2 mt-1 z-50 transition-all">
                    <button
                      onClick={() => handleNavClick('direct-debt-rescue')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900 flex items-center justify-between">
                        <span>Direct Debt Rescue</span>
                        <span className="text-[9px] font-bold text-amber-700 uppercase bg-amber-50 px-1.5 py-0.5 rounded">Vital</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">Legal brick-kiln bond payoff & freedom</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('post-rescue-protocol')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">Post-Rescue Protocol</div>
                      <div className="text-[11px] text-slate-500 font-normal">Rehabilitation, food security & micro-trades</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('next-gen-rescue-discipleship')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">Next-Gen Rescue Discipleship</div>
                      <div className="text-[11px] text-slate-500 font-normal">Evening schools for liberated children</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('womens-liberation-covering')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">Women&apos;s Liberation Covering</div>
                      <div className="text-[11px] text-slate-500 font-normal">Widows care & sewing vocational hubs</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('healing-crusades')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">Healing Crusades</div>
                      <div className="text-[11px] text-slate-500 font-normal">Field evangelism, signs & miracles</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('pastors-training')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">Pastors Training</div>
                      <div className="text-[11px] text-slate-500 font-normal">Equipping persecuted rural shepherds</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('sponsor-a-project')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-amber-50/70 hover:text-amber-900 transition-colors border-t border-slate-100 mt-1 pt-1.5"
                    >
                      <div className="font-semibold text-amber-800">Sponsor a Project &rarr;</div>
                      <div className="text-[11px] text-slate-500 font-normal">Water wells, Bibles & medical relief</div>
                    </button>
                  </div>
                )}
              </div>

              {/* Dropdown 3: Scripture Translation */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('scripture')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => handleNavClick('bible-translation-projects')}
                  className={`text-sm font-medium transition-colors cursor-pointer py-1 flex items-center gap-1 ${
                    ['bible-translation-projects', 'view-translation-projects'].includes(currentRoute)
                      ? 'text-slate-900 font-semibold' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-expanded={activeDropdown === 'scripture'}
                >
                  <span>Scriptures</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === 'scripture' ? 'rotate-180 text-amber-700' : ''}`} />
                </button>

                {activeDropdown === 'scripture' && (
                  <div className="absolute top-full left-0 w-64 bg-white border border-slate-200/90 rounded-xl shadow-lg p-2 mt-1 z-50 transition-all">
                    <button
                      onClick={() => handleNavClick('bible-translation-projects')}
                      className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">Bible Translation Projects</div>
                      <div className="text-[11px] text-slate-500 font-normal">Urdu study Bibles & Punjabi vernacular</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('view-translation-projects')}
                      className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">View Translation Projects</div>
                      <div className="text-[11px] text-slate-500 font-normal">Manuscripts, solar players & chapter review</div>
                    </button>
                  </div>
                )}
              </div>

              {/* Dropdown 4: Field Evidence */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('evidence')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => handleNavClick('field-evidence')}
                  className={`text-sm font-medium transition-colors cursor-pointer py-1 flex items-center gap-1 ${
                    ['field-evidence', 'see-our-ground-impact', 'photo-gallery', 'video-evidence', 'ministry-reports-stories', 'frontline-accountability'].includes(currentRoute)
                      ? 'text-slate-900 font-semibold' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-expanded={activeDropdown === 'evidence'}
                >
                  <span>Field Evidence</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === 'evidence' ? 'rotate-180 text-amber-700' : ''}`} />
                </button>

                {activeDropdown === 'evidence' && (
                  <div className="absolute top-full left-0 w-72 bg-white border border-slate-200/90 rounded-xl shadow-lg p-2 mt-1 z-50 transition-all">
                    <button
                      onClick={() => handleNavClick('field-evidence')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">Field Evidence</div>
                      <div className="text-[11px] text-slate-500 font-normal">Audited receipts & documented freedom</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('see-our-ground-impact')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">See Our Ground Impact</div>
                      <div className="text-[11px] text-slate-500 font-normal">Live audited ledger & project metrics</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('photo-gallery')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">Photo Gallery</div>
                      <div className="text-[11px] text-slate-500 font-normal">Frontline dispatches & borehole dedications</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('video-evidence')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">Video Evidence</div>
                      <div className="text-[11px] text-slate-500 font-normal">Filmed family liberations & crusades</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('ministry-reports-stories')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">Ministry Reports & Stories</div>
                      <div className="text-[11px] text-slate-500 font-normal">Field dispatches & survivor testimonies</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('frontline-accountability')}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors border-t border-slate-100 mt-1 pt-1.5"
                    >
                      <div className="font-semibold text-slate-900 flex items-center justify-between">
                        <span>Frontline Accountability</span>
                        <span className="text-[9px] font-bold text-emerald-700 uppercase bg-emerald-50 px-1.5 py-0.5 rounded">Fiduciary</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">Governance policies & anti-embezzlement</div>
                    </button>
                  </div>
                )}
              </div>

              {/* Dropdown 5: Resources & Alliance */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => handleNavClick('initiate-strategic-alliance')}
                  className={`text-sm font-medium transition-colors cursor-pointer py-1 flex items-center gap-1 ${
                    ['initiate-strategic-alliance', 'shop', 'cart', 'checkout', 'my-account', 'contact-us'].includes(currentRoute)
                      ? 'text-slate-900 font-semibold' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-expanded={activeDropdown === 'resources'}
                >
                  <span>Connect</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === 'resources' ? 'rotate-180 text-amber-700' : ''}`} />
                </button>

                {activeDropdown === 'resources' && (
                  <div className="absolute top-full left-0 w-64 bg-white border border-slate-200/90 rounded-xl shadow-lg p-2 mt-1 z-50 transition-all">
                    <button
                      onClick={() => handleNavClick('initiate-strategic-alliance')}
                      className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">Initiate Strategic Alliance</div>
                      <div className="text-[11px] text-slate-500 font-normal">For foundations, churches & trusts</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('shop')}
                      className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">Ministry Resource Store</div>
                      <div className="text-[11px] text-slate-500 font-normal">Urdu Study Bibles & study books</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('my-account')}
                      className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">Partner Account</div>
                      <div className="text-[11px] text-slate-500 font-normal">Tax receipts & recurring commitments</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('contact-us')}
                      className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors border-t border-slate-100 mt-1 pt-1.5"
                    >
                      <div className="font-semibold text-slate-900">Contact Us</div>
                      <div className="text-[11px] text-slate-500 font-normal">Direct pastoral correspondence</div>
                    </button>
                  </div>
                )}
              </div>

              {/* Sponsor a Project Fast Link */}
              <button 
                onClick={() => handleNavClick('sponsor-a-project')}
                className={`text-sm font-medium transition-colors cursor-pointer py-1 relative ${
                  currentRoute === 'sponsor-a-project' 
                    ? 'text-slate-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Projects
              </button>

            </div>

            {/* Desktop Donate Action */}
            <div className="hidden xl:flex items-center gap-3">
              <button
                onClick={() => handleNavClick('donate')}
                className="inline-flex items-center gap-2 px-5.5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>Donate</span>
              </button>
            </div>

            {/* Mobile Actions: Compact Donate + Accessible Hamburger */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={() => handleNavClick('donate')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-xs cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-white/20" />
                <span>Donate</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-amber-600 cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* 3. Mobile Navigation Sheet / Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
              <button
                onClick={() => handleNavClick('donate')}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-amber-600 text-white font-medium text-xs shadow-xs"
              >
                <Heart className="w-3.5 h-3.5 fill-white/20" />
                <span>Donate Now</span>
              </button>
              <button
                onClick={() => handleNavClick('sponsor-a-project')}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-slate-200 text-slate-700 font-medium text-xs hover:bg-slate-50"
              >
                <span>View Projects</span>
              </button>
            </div>

            {/* Section 1: Mission & Mandate */}
            <div className="space-y-1">
              <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Mission & Biblical Mandate
              </div>
              <button onClick={() => handleNavClick('home')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Home
              </button>
              <button onClick={() => handleNavClick('the-mission')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                The Mission (John 8:12)
              </button>
              <button onClick={() => handleNavClick('the-john-812-mandate')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                The John 8:12 Mandate
              </button>
              <button onClick={() => handleNavClick('strategic-blueprint')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between">
                <span>Strategic Blueprint</span>
                <span className="text-[9px] font-bold text-amber-700 uppercase bg-amber-50 px-1.5 py-0.5 rounded">5-Year Plan</span>
              </button>
              <button onClick={() => handleNavClick('explore-church-vision')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Explore Church Vision
              </button>
              <button onClick={() => handleNavClick('frontline-leadership-origins')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Frontline Leadership Origins (Rev. Azeem Tariq)
              </button>
              <button onClick={() => handleNavClick('uncompromised-theology')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Uncompromised Theology
              </button>
            </div>

            {/* Section 2: Frontline Rescue */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Frontline Ministries & Rescue
              </div>
              <button onClick={() => handleNavClick('direct-debt-rescue')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Direct Debt Rescue (Brick Kilns)
              </button>
              <button onClick={() => handleNavClick('post-rescue-protocol')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Post-Rescue Protocol (Rehabilitation)
              </button>
              <button onClick={() => handleNavClick('next-gen-rescue-discipleship')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Next-Gen Rescue Discipleship
              </button>
              <button onClick={() => handleNavClick('womens-liberation-covering')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Women&apos;s Liberation Covering (Widows)
              </button>
              <button onClick={() => handleNavClick('healing-crusades')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Healing Crusades
              </button>
              <button onClick={() => handleNavClick('pastors-training')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Pastors Training
              </button>
              <button onClick={() => handleNavClick('sponsor-a-project')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Sponsor a Project
              </button>
            </div>

            {/* Section 3: Scriptures & Translation */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Scripture Translation
              </div>
              <button onClick={() => handleNavClick('bible-translation-projects')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Bible Translation Projects
              </button>
              <button onClick={() => handleNavClick('view-translation-projects')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                View Translation Projects
              </button>
            </div>

            {/* Section 4: Field Evidence & Reports */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Field Evidence & Accountability
              </div>
              <button onClick={() => handleNavClick('field-evidence')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Field Evidence
              </button>
              <button onClick={() => handleNavClick('see-our-ground-impact')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                See Our Ground Impact
              </button>
              <button onClick={() => handleNavClick('photo-gallery')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Photo Gallery
              </button>
              <button onClick={() => handleNavClick('video-evidence')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Video Evidence
              </button>
              <button onClick={() => handleNavClick('ministry-reports-stories')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Ministry Reports & Stories
              </button>
              <button onClick={() => handleNavClick('frontline-accountability')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Frontline Accountability
              </button>
            </div>

            {/* Section 5: Connect & Resources */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Connect & Resources
              </div>
              <button onClick={() => handleNavClick('initiate-strategic-alliance')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Initiate Strategic Alliance
              </button>
              <button onClick={() => handleNavClick('shop')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Ministry Resource Store
              </button>
              <button onClick={() => handleNavClick('cart')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between">
                <span>View Basket</span>
                {cartCount > 0 && (
                  <span className="bg-amber-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount} items
                  </span>
                )}
              </button>
              <button onClick={() => handleNavClick('my-account')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Partner Account Portal
              </button>
              <button onClick={() => handleNavClick('contact-us')} className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                Contact Us
              </button>
            </div>

            {/* Hosting & Developer Utilities */}
            <div className="pt-3 border-t border-slate-100">
              <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                cPanel & Platform Tools
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Admin Panel</span>
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onDownloadZip(); }}
                  disabled={isDownloadingZip}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-50 border border-amber-200 text-xs font-medium text-amber-900 hover:bg-amber-100"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isDownloadingZip ? 'Zipping...' : 'cPanel ZIP'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
