import React from 'react';
import { SiteSettings, Project, CurrencyCode } from '../types';
import { Compass, Droplets, BookOpen, ShieldCheck, Heart, ArrowRight, Target, CheckCircle2 } from 'lucide-react';

interface VisionPageProps {
  settings: SiteSettings;
  projects: Project[];
  currentCurrency: CurrencyCode;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const VisionPage: React.FC<VisionPageProps> = ({
  settings,
  projects,
  currentCurrency,
  onNavigate,
  onOpenDonate
}) => {
  return (
    <div className="bg-white">
      {/* 1. Dedicated Vision Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Strategic 5-Year Horizon &bull; 2026–2031</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Our Vision for Frontier Communities
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed mb-8">
            Under the pastoral leadership of <strong>{settings.founderName}</strong>, Agape Light Network looks forward to the day when extreme poverty and spiritual neglect are dispelled by the living love and eternal light of Jesus Christ.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Support This Vision</span>
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 font-medium text-sm transition-colors cursor-pointer"
            >
              <span>Explore Active Projects</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Presidential Vision Manifesto Box */}
      <section className="py-14 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-7 sm:p-10 border border-slate-200/90 border-l-4 border-l-amber-600 shadow-xs">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
              Presidential Vision Statement &bull; {settings.founderName}
            </div>
            <blockquote className="font-serif italic text-xl sm:text-2xl text-slate-900 leading-relaxed mb-4">
              &ldquo;We envision transformed communities across the unreached territories where clean drinking water flows freely in every village, every Christian home holds a Bible in their mother tongue, fatherless children are educated with Christian dignity, and widows live in safety and honor.&rdquo;
            </blockquote>
            <div className="text-xs font-medium text-slate-600 flex flex-wrap items-center justify-between border-t border-slate-100 pt-4 gap-2">
              <span>Grounded in John 8:12 &mdash; <em>&ldquo;I am the light of the world...&rdquo;</em></span>
              <span className="text-amber-800 font-semibold">{settings.orgName}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Three Horizons of Our Vision */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 mb-1">
              Strategic Architecture
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 leading-tight">
              The Three Horizons of Our Strategic Plan
            </h2>
            <p className="mt-3 text-base text-slate-600 font-light leading-relaxed">
              We do not wander aimlessly; our roadmap addresses root humanitarian and spiritual crises through three measurable horizons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Horizon 1 */}
            <div className="bg-slate-50/70 rounded-xl p-8 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-100/80 text-amber-800 flex items-center justify-center mb-5">
                  <Droplets className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">Horizon 1</div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                  Sustainable Deep Wells
                </h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Installing certified deep aquifer boreholes and solar pump stations across 250 isolated villages where waterborne pathogens currently claim infant lives.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs font-semibold text-slate-800">
                Strategic Target: 250 Certified Community Wells
              </div>
            </div>

            {/* Horizon 2 */}
            <div className="bg-slate-50/70 rounded-xl p-8 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-200/80 text-slate-800 flex items-center justify-center mb-5">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">Horizon 2</div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                  Scripture & Child Literacy
                </h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Placing 50,000 native-language study Bibles into believers&apos; hands, and maintaining free evening Christian literacy schools for illiterate adult laborers and children trapped in generational brick-kiln bonded labor.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs font-semibold text-slate-800">
                Strategic Target: 50,000 Vernacular Bibles
              </div>
            </div>

            {/* Horizon 3 */}
            <div className="bg-slate-50/70 rounded-xl p-8 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center mb-5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">Horizon 3</div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                  Widow Sustenance & Dignity
                </h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Protecting abandoned widows from destitution through audited monthly food staples (flour, oil, lentils), winter thermal blankets, and micro-grant vocational sewing equipment to generate self-reliance.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs font-semibold text-slate-800">
                Strategic Target: 1,000 Sustained Widow Families
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Documented Field Reality Spotlight */}
      <section className="py-16 sm:py-20 bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-1">
              Field Documentation
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Photographs From Frontline Enclaves
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl overflow-hidden aspect-4/3 bg-slate-900 border border-slate-800 relative group">
              <img
                src="/assets/images/village-borehole-dedication.jpg"
                alt="Village borehole well dedication"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs text-white">
                <span className="font-semibold block">Village Borehole Dedication</span>
                <span className="text-slate-300 text-[11px]">Clean Aquifer Water</span>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden aspect-4/3 bg-slate-900 border border-slate-800 relative group">
              <img
                src="/assets/images/children-reading-bibles.jpg"
                alt="Children reading mother-tongue scriptures"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs text-white">
                <span className="font-semibold block">Mother-Tongue Scripture</span>
                <span className="text-slate-300 text-[11px]">Free Bible Literacy</span>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden aspect-4/3 bg-slate-900 border border-slate-800 relative group">
              <img
                src="/assets/images/medical-optometry-screening.jpg"
                alt="Mobile medical eye screening"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs text-white">
                <span className="font-semibold block">Mobile Healthcare Camp</span>
                <span className="text-slate-300 text-[11px]">Diagnostic & Vision Exams</span>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden aspect-4/3 bg-slate-900 border border-slate-800 relative group">
              <img
                src="/assets/images/winter-warm-blankets-distribution.jpg"
                alt="Winter blanket distribution"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs text-white">
                <span className="font-semibold block">Winter Thermal Blankets</span>
                <span className="text-slate-300 text-[11px]">Widow & Orphan Relief</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 5-Year Measurable Vision Targets Ledger */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 mb-1">
              Accountability Matrix
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 leading-tight">
              5-Year Measurable Vision Milestones
            </h2>
            <p className="mt-3 text-base text-slate-600 font-light leading-relaxed">
              We provide verified quarterly reporting to international missionary boards, churches, and independent donors.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-xs">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-800 mb-1">250</div>
              <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Certified Wells</div>
              <div className="text-[11px] text-slate-500 mt-1">Safe drinking water for 100,000+ villagers</div>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-xs">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-800 mb-1">50K</div>
              <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Bibles Distributed</div>
              <div className="text-[11px] text-slate-500 mt-1">In vernacular mother tongues</div>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-xs">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-800 mb-1">1,000</div>
              <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Sustained Widows</div>
              <div className="text-[11px] text-slate-500 mt-1">Monthly audited food & dignity rations</div>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-xs">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-800 mb-1">100%</div>
              <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Field Pledge</div>
              <div className="text-[11px] text-slate-500 mt-1">Designated giving strictly ringfenced</div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Partner With Us to Fulfill This Vision</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
