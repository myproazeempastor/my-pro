import React, { useState } from 'react';
import { 
  MapPin, 
  Heart, 
  ExternalLink, 
  ShieldCheck, 
  Droplets, 
  BookOpen, 
  Users, 
  Cross, 
  Activity, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  ChevronRight,
  Globe2,
  Calendar
} from 'lucide-react';

export interface RegionImpactStory {
  id: string;
  regionName: string;
  country: string;
  badge: string;
  category: 'water' | 'rescue' | 'bibles' | 'medical' | 'widows';
  categoryLabel: string;
  title: string;
  summary: string;
  fullTestimony: string;
  beneficiaryQuote: string;
  speakerTitle: string;
  beneficiaryCount: string;
  completedDate: string;
  gpsCoordinates: string;
  imageUrl: string;
  projectId: number;
  coordinates: { x: number; y: number }; // SVG map percentage coordinates
  mapZoomHint: string;
}

const ACTIVE_REGIONS: RegionImpactStory[] = [
  {
    id: 'punjab-central',
    regionName: 'Central Punjab & Lahore District',
    country: 'Pakistan',
    badge: 'Ministry Headquarters & Brick Kiln Belt',
    category: 'rescue',
    categoryLabel: 'Brick Kiln Debt Rescue',
    title: 'The Tariq Family Generational Debt Cancellation',
    summary: 'Direct payoff of ancestral bonded labor debt under formal legal supervision, freeing three generations from kiln servitude.',
    fullTestimony: 'For over 18 years, Emmanuel Masih and his family hand-pressed 1,200 heavy clay bricks each day from dawn to dusk under scorching heat to service a inherited debt that never decreased. Under the pastoral intervention of Rev. Azeem Tariq and our legal counsel, the entire balance was settled directly with kiln owners under magistrate oversight. Legal Mukar-nama release deeds were executed, permanently protecting the children from bonded indenture. The family has now relocated to safe rental housing with ongoing food security.',
    beneficiaryQuote: 'For the first time in my children’s lives, they wake up without fear of the overseer. Jesus broke the chains our family carried for three generations.',
    speakerTitle: 'Emmanuel Masih, Liberated Father & Frontline Catechumen',
    beneficiaryCount: '18 Families Rescued (94 Souls)',
    completedDate: 'March 2026',
    gpsCoordinates: '31.5204° N, 74.3587° E',
    imageUrl: '/assets/images/brick-kiln-liberated-family.jpg',
    projectId: 1, // Will map to suitable project
    coordinates: { x: 55, y: 38 },
    mapZoomHint: 'Lahore & Kasur Outskirts'
  },
  {
    id: 'punjab-south',
    regionName: 'Southern Punjab & Arid Indus Basin',
    country: 'Pakistan',
    badge: 'Deep Aquifer Borehole Wells',
    category: 'water',
    categoryLabel: 'Clean Water Infrastructure',
    title: 'Solar Aquifer Borehole Well at Chak 42',
    summary: 'Deep drilling 280 feet into sweet water aquifer, installing stainless filtration and overhead solar-powered pumping system.',
    fullTestimony: 'Families in this arid agrarian settlement previously consumed contaminated canal run-off and stagnant open reservoirs shared with farm cattle, resulting in recurrent typhoid and infant diarrhea. Through faithful church partnership, our drilling rig bored 280 feet deep to access certified subterranean sweet water. A solar submersible pump, 1,000-liter storage tank, and quadruple distribution manifold now deliver endless clean drinking water.',
    beneficiaryQuote: 'Our women no longer walk miles beneath the scorching sun with heavy clay pots. This sweet water is God’s gift of life to our village.',
    speakerTitle: 'Elder Rehmat, Village Christian Community Council',
    beneficiaryCount: '420 Village Residents Daily',
    completedDate: 'February 2026',
    gpsCoordinates: '30.1575° N, 71.5249° E',
    imageUrl: '/assets/images/clean-water-well-field.jpg',
    projectId: 1,
    coordinates: { x: 48, y: 52 },
    mapZoomHint: 'Multan & Khanewal Arid Plain'
  },
  {
    id: 'faisalabad-belt',
    regionName: 'Faisalabad Industrial & Kiln Colony',
    country: 'Pakistan',
    badge: 'Mobile Healthcare Outreach',
    category: 'medical',
    categoryLabel: 'Mobile Medical & Eye Camps',
    title: 'Frontline Medical Diagnostics & Cataract Screenings',
    summary: 'Quarterly mobile dispensary van deployment with Christian doctors providing free prescription antibiotics, pediatric care, and eye exams.',
    fullTestimony: 'Brick kiln laborers and rural sweepers endure daily inhalation of coal smoke and clay silica dust without access to private hospitals or medication. Our volunteer Christian medical team examined 380 patients over two days, distributing free asthma inhalers, eye lubrication drops, hypertension tablets, and eyeglasses, while local catechists offered compassionate healing prayers for each family.',
    beneficiaryQuote: 'No doctor had ever visited our dust colony before. The compassion in their hands showed us the living heart of Christ.',
    speakerTitle: 'Mariam Bibi, Mother of Four',
    beneficiaryCount: '380 Patients Treated & Gilded',
    completedDate: 'January 2026',
    gpsCoordinates: '31.4504° N, 73.1350° E',
    imageUrl: '/assets/images/mobile-medical-camp.jpg',
    projectId: 3,
    coordinates: { x: 50, y: 42 },
    mapZoomHint: 'Faisalabad Rural Periphery'
  },
  {
    id: 'sindh-thar',
    regionName: 'Sindh Thar Desert & Lower Basin',
    country: 'Pakistan',
    badge: 'Drought Resilience & Relief',
    category: 'water',
    categoryLabel: 'Emergency Relief & Wells',
    title: 'Deep Sweet-Water Well in Arid Drought Zone',
    summary: 'Hydro-geological deep well reaching 320 feet beneath the desert salt crust to provide pure sweet water to marginalized tribal believers.',
    fullTestimony: 'The Thar desert region faces severe recurring groundwater salinity. After extensive hydro-geological survey, our team successfully struck pure potable sweet water at 320 feet. In addition to clean drinking water, the well irrigates community kitchen vegetable patches that sustain 60 families during extreme drought months.',
    beneficiaryQuote: 'When other wells dug here brought up bitter salt, God led Rev. Azeem’s crew to sweet water. Our children will not die of thirst.',
    speakerTitle: 'Pastor Samuel, Thar Fellowship Church',
    beneficiaryCount: '510 Tribal & Marginalized Believers',
    completedDate: 'December 2025',
    gpsCoordinates: '25.3960° N, 68.3578° E',
    imageUrl: '/assets/images/village-borehole-dedication.jpg',
    projectId: 1,
    coordinates: { x: 38, y: 78 },
    mapZoomHint: 'Sindh Arid Thar Border'
  },
  {
    id: 'khyber-frontier',
    regionName: 'Khyber Frontier & Mountain Villages',
    country: 'Pakistan',
    badge: 'Mother-Tongue Scripture Literacy',
    category: 'bibles',
    categoryLabel: 'Scripture & Literacy Outreach',
    title: 'Urdu Study Bible Distribution & Night Classes',
    summary: 'Hand-delivery of 450 durable leatherette Urdu study Bibles with cross-references, paired with children’s evening literacy classes.',
    fullTestimony: 'Believers in remote mountain communities have prayed for years to own their own printed Bible. Because illiteracy is high among bonded and menial laborers, our team established twice-weekly evening literacy lessons led by local pastors. Now young boys, girls, and even grandparents are learning to read the Gospel of John and the Psalms in their native mother tongue.',
    beneficiaryQuote: 'Holding God’s Holy Word in my own hands and reading the words of Jesus with my daughter is the greatest joy of my life.',
    speakerTitle: 'Ibrahim Khokhar, Bible Student',
    beneficiaryCount: '450 Bibles Hand-Delivered',
    completedDate: 'February 2026',
    gpsCoordinates: '34.0151° N, 71.5249° E',
    imageUrl: '/assets/images/bible-distribution-community.jpg',
    projectId: 2,
    coordinates: { x: 44, y: 22 },
    mapZoomHint: 'Northern Frontier Mountain Valleys'
  },
  {
    id: 'sheikhupura-widows',
    regionName: 'Sheikhupura & Rural Settlement Enclaves',
    country: 'Pakistan',
    badge: 'Widows & Orphans Care',
    category: 'widows',
    categoryLabel: 'Widows Sustenance Network',
    title: 'Monthly Food Security Rations & Sewing Machines',
    summary: 'Distributing monthly staples (flour, oil, pulses, warm quilts) and professional foot-pedal sewing machines for sustainable livelihoods.',
    fullTestimony: 'Abandoned Christian widows without male breadwinners face intense discrimination and food insecurity. Our monthly outreach delivers essential bulk sustenance packages (50kg wheat flour, 10kg lentils, 5L cooking oil, tea, hygiene soap) alongside sturdy sewing machines and fabric shears that enable mothers to generate dignified self-reliant home income.',
    beneficiaryQuote: 'When my husband passed away in the kiln, we were left with nothing. Agape Light Network brought food to my table and gave me tools to work.',
    speakerTitle: 'Kiran Bibi, Widowed Mother & Seamstress',
    beneficiaryCount: '85 Widowed Households Supported',
    completedDate: 'March 2026',
    gpsCoordinates: '31.7131° N, 73.9783° E',
    imageUrl: '/assets/images/water-well-filtration-unit.jpg',
    projectId: 4,
    coordinates: { x: 53, y: 35 },
    mapZoomHint: 'Sheikhupura Rural Enclave'
  }
];

interface InteractiveImpactMapProps {
  onOpenDonate: (projectId?: number) => void;
  onNavigate?: (route: string) => void;
}

export const InteractiveImpactMap: React.FC<InteractiveImpactMapProps> = ({
  onOpenDonate,
  onNavigate
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('punjab-central');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);

  const selectedStory = ACTIVE_REGIONS.find(r => r.id === selectedRegionId) || ACTIVE_REGIONS[0];

  const filteredRegions = ACTIVE_REGIONS.filter(region => {
    if (filterCategory === 'all') return true;
    return region.category === filterCategory;
  });

  return (
    <section 
      id="interactive-map" 
      className="py-20 sm:py-24 lg:py-28 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden"
    >
      {/* Subtle Ambient Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle 800px at 30% 40%, rgba(217, 119, 6, 0.15), transparent 70%)'
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ring-4 ring-amber-400/20" aria-hidden="true" />
            <span>Interactive Operational Geography</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
            Where We Serve: Frontline Field Dispatches
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-300 font-light leading-relaxed text-balance">
            Explore verified field sites where Agape Light Network operates clean water wells, bonded debt cancellations, medical camps, and Scripture literacy programs under the leadership of Rev. Azeem Tariq.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-slate-800/80">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            All Operational Regions ({ACTIVE_REGIONS.length})
          </button>
          <button
            onClick={() => setFilterCategory('rescue')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterCategory === 'rescue'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Brick Kiln Debt Rescue</span>
          </button>
          <button
            onClick={() => setFilterCategory('water')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterCategory === 'water'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-blue-400" />
            <span>Clean Water Deep Wells</span>
          </button>
          <button
            onClick={() => setFilterCategory('bibles')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterCategory === 'bibles'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Scripture & Literacy</span>
          </button>
          <button
            onClick={() => setFilterCategory('medical')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterCategory === 'medical'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-red-400" />
            <span>Medical Care Camps</span>
          </button>
        </div>

        {/* Main Grid: Interactive Map Canvas (Left 7 Cols) + Dynamic Impact Story Card (Right 5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* MAP CANVAS (7 COLS) */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl border border-slate-800 p-5 sm:p-7 shadow-2xl relative">
            
            {/* Map Top Bar */}
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Compass className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white">Frontline Field Sites</span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-slate-400">Click any pinpoint to view verified impact</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>GPS Verified Operations</span>
              </div>
            </div>

            {/* Interactive Vector Cartography Container */}
            <div className="relative w-full aspect-4/3 sm:aspect-16/11 bg-slate-950/80 rounded-2xl overflow-hidden border border-slate-800/80 p-2 sm:p-4 select-none">
              
              {/* Background Geographic Graticule Grid */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none opacity-25" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              </svg>

              {/* Stylized Regional Landmass Vector Contour (Pakistan & Indus Basin Outline) */}
              <svg 
                viewBox="0 0 600 500" 
                className="w-full h-full transition-all duration-500"
                aria-label="Stylized map of Pakistan field operational corridor"
              >
                {/* Pakistan Outer Territorial Boundary Vector */}
                <path
                  d="M 230 40 
                     L 290 35 
                     L 350 45 
                     L 380 90 
                     L 410 110 
                     L 370 145 
                     L 345 160 
                     L 360 200 
                     L 330 250 
                     L 270 330 
                     L 245 420 
                     L 220 440 
                     L 180 435 
                     L 130 380 
                     L 110 330 
                     L 100 270 
                     L 130 220 
                     L 170 170 
                     L 200 120 
                     Z"
                  fill="#0f172a"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="none"
                  className="transition-colors duration-300"
                />

                {/* Indus River Arterial Lifeline (Sweet Aquifer Spine) */}
                <path
                  d="M 330 50 
                     Q 300 120 280 170 
                     T 260 250 
                     T 240 330 
                     T 220 400 
                     T 210 430"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.35)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Punjab & Sindh Agricultural Belt Zone Shading */}
                <path
                  d="M 260 170 
                     L 340 180 
                     L 320 260 
                     L 260 250 Z"
                  fill="rgba(217, 119, 6, 0.08)"
                  stroke="rgba(217, 119, 6, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Labels on SVG */}
                <text x="350" y="80" fill="#64748b" fontSize="11" fontFamily="sans-serif" letterSpacing="1">
                  KASHMIR / NORTH
                </text>
                <text x="140" y="270" fill="#475569" fontSize="11" fontFamily="sans-serif" letterSpacing="1">
                  BALOCHISTAN
                </text>
                <text x="290" y="210" fill="#94a3b8" fontSize="12" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1.5">
                  PUNJAB BASIN
                </text>
                <text x="245" y="370" fill="#64748b" fontSize="11" fontFamily="sans-serif" letterSpacing="1">
                  SINDH / THAR
                </text>
                <text x="160" y="445" fill="#38bdf8" fontSize="10" fontFamily="sans-serif">
                  ARABIAN SEA
                </text>
              </svg>

              {/* Dynamic Interactive Pinpoint Markers */}
              {filteredRegions.map((region) => {
                const isSelected = region.id === selectedRegionId;
                const isHovered = region.id === hoveredRegionId;

                return (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegionId(region.id)}
                    onMouseEnter={() => setHoveredRegionId(region.id)}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    style={{ left: `${region.coordinates.x}%`, top: `${region.coordinates.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-hidden z-10 transition-transform duration-200 ${
                      isSelected ? 'scale-125 z-20' : 'hover:scale-115'
                    }`}
                    aria-label={`Select ${region.regionName} - ${region.categoryLabel}`}
                  >
                    {/* Pulsing beacon waves */}
                    <span className="relative flex items-center justify-center">
                      <span className={`animate-ping absolute inline-flex h-8 w-8 rounded-full opacity-60 ${
                        isSelected 
                          ? 'bg-amber-400' 
                          : region.category === 'water'
                          ? 'bg-blue-400'
                          : region.category === 'rescue'
                          ? 'bg-amber-400'
                          : region.category === 'medical'
                          ? 'bg-red-400'
                          : 'bg-emerald-400'
                      }`} />
                      
                      <span className={`relative inline-flex items-center justify-center w-7 h-7 rounded-full shadow-lg border-2 transition-all ${
                        isSelected
                          ? 'bg-amber-500 border-white text-slate-950 ring-4 ring-amber-500/40'
                          : 'bg-slate-900 border-amber-400 text-amber-400 hover:bg-amber-600 hover:text-white'
                      }`}>
                        {region.category === 'water' ? (
                          <Droplets className="w-3.5 h-3.5" />
                        ) : region.category === 'rescue' ? (
                          <Users className="w-3.5 h-3.5" />
                        ) : region.category === 'medical' ? (
                          <Activity className="w-3.5 h-3.5" />
                        ) : (
                          <BookOpen className="w-3.5 h-3.5" />
                        )}
                      </span>
                    </span>

                    {/* Compact Floating Label on Hover or Active */}
                    {(isSelected || isHovered) && (
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-slate-900/95 text-white border border-slate-700 text-[10px] font-semibold whitespace-nowrap rounded-lg shadow-xl pointer-events-none z-30 animate-in fade-in zoom-in-95 duration-150">
                        {region.regionName}
                      </span>
                    )}
                  </button>
                );
              })}

            </div>

            {/* Region Navigation Pills Carousel below map */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Active Operational Districts:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ACTIVE_REGIONS.map((r) => {
                  const isSelected = r.id === selectedRegionId;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRegionId(r.id)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-600/20 border-amber-500 text-white font-semibold ring-1 ring-amber-500/40'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <span className="truncate">{r.regionName.split('&')[0].trim()}</span>
                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 ml-1 transition-transform ${isSelected ? 'text-amber-400 translate-x-0.5' : 'text-slate-600'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* DYNAMIC LOCAL IMPACT STORY CARD (5 COLS) */}
          <div className="lg:col-span-5 bg-slate-900/95 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden transition-all duration-300">
            
            {/* Subtle glow behind card */}
            <div 
              className="absolute -right-16 -top-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" 
              aria-hidden="true" 
            />

            {/* Media Aspect Banner of Selected Field Site */}
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={selectedStory.imageUrl}
                alt={selectedStory.title}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-md bg-amber-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-sm">
                  {selectedStory.categoryLabel}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-300 font-mono text-[10px] border border-slate-700/80">
                  {selectedStory.gpsCoordinates}
                </span>
              </div>

              <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs text-slate-200">
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{selectedStory.regionName}</span>
                </span>
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  <span>{selectedStory.completedDate}</span>
                </span>
              </div>
            </div>

            {/* Narrative Story Content */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Local Field Dispatch</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-white leading-snug">
                {selectedStory.title}
              </h3>

              <p className="text-sm text-slate-300 font-light leading-relaxed">
                {selectedStory.fullTestimony}
              </p>
            </div>

            {/* Direct Beneficiary Quotation Block */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs italic font-serif text-amber-200/90 space-y-1.5 relative">
              <p className="leading-relaxed font-light">
                &ldquo;{selectedStory.beneficiaryQuote}&rdquo;
              </p>
              <div className="text-[11px] not-italic font-sans font-semibold text-slate-400 pt-1 border-t border-slate-800/80">
                — {selectedStory.speakerTitle}
              </div>
            </div>

            {/* Metrics & Accountability Footer */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Verified Ground Impact</span>
                <span className="font-serif text-sm font-bold text-emerald-400">
                  {selectedStory.beneficiaryCount}
                </span>
              </div>

              <div className="text-right">
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Fiduciary Pledge</span>
                <span className="text-[11px] text-slate-200 flex items-center gap-1 justify-end">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Direct Field</span>
                </span>
              </div>
            </div>

            {/* Call to Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onOpenDonate(selectedStory.projectId)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-all shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-500"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>Support Work in {selectedStory.regionName.split('&')[0].trim()}</span>
              </button>

              {onNavigate && (
                <button
                  onClick={() => onNavigate('field-evidence')}
                  className="inline-flex items-center justify-center gap-1.5 py-3.5 px-4 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  <span>All Evidence</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
