import React from 'react';
import { SiteSettings, Project, Donation, CurrencyCode } from '../types';
import { Hero } from '../components/Hero';
import { ProjectGrid } from '../components/ProjectGrid';
import { ImpactSection } from '../components/ImpactSection';
import { AboutSection } from '../components/AboutSection';
import { TransparencySection } from '../components/TransparencySection';
import { DonorTestimonials } from '../components/DonorTestimonials';
import { DonorFaqAccordion } from '../components/DonorFaqAccordion';
import { InteractiveImpactMap } from '../components/InteractiveImpactMap';
import { ContactSection } from '../components/ContactSection';
import { Compass, BookOpen, ArrowRight, Heart, Quote, Calendar } from 'lucide-react';

interface HomePageProps {
  settings: SiteSettings;
  projects: Project[];
  donations: Donation[];
  currentCurrency: CurrencyCode;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
  onSelectProject: (project: Project) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  settings,
  projects,
  donations,
  currentCurrency,
  onNavigate,
  onOpenDonate,
  onSelectProject
}) => {
  return (
    <div className="space-y-0">
      {/* 1. Strong Hero Section */}
      <Hero
        settings={settings}
        onOpenDonate={onOpenDonate}
        onExploreProjects={() => onNavigate('projects')}
      />

      {/* 2. Institutional Foundations & Strategic Horizons Bridge */}
      <section className="bg-slate-900 text-white py-14 sm:py-16 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ring-4 ring-amber-400/20" aria-hidden="true" />
                <span>Strategic Roadmap</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white">
                Our 5-Year Vision & Divine Mandate
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                Agape Light Network is systematically drilling certified deep water wells, distributing mother-tongue Bibles, and sustaining widow families across neglected communities.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('vision')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Our Vision Roadmap</span>
              </button>
              <button
                onClick={() => onNavigate('our-story')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-700 hover:border-slate-500 hover:bg-slate-800/80 text-slate-200 text-xs font-medium transition-all cursor-pointer"
              >
                <span>Our Story & Origins</span>
              </button>
              <button
                onClick={() => onNavigate('mission')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-700 hover:border-slate-500 hover:bg-slate-800/80 text-slate-200 text-xs font-medium transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Our Divine Mission</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Explanation of the Organization & Founder Narrative */}
      <AboutSection
        settings={settings}
        onOpenDonate={() => onOpenDonate()}
        onNavigateAbout={() => onNavigate('about')}
      />

      {/* 4. Active Field Programs (Curated Featured Projects) */}
      <ProjectGrid
        projects={projects.filter(p => p.isFeatured)}
        currentCurrency={currentCurrency}
        onOpenDonate={onOpenDonate}
        onSelectProject={onSelectProject}
      />

      {/* 5. Interactive Field Impact Map & Regional Dispatches */}
      <InteractiveImpactMap
        onOpenDonate={onOpenDonate}
        onNavigate={onNavigate}
      />

      {/* 6. Real-World Impact & Verified Database Ledger */}
      <ImpactSection
        projects={projects}
        donations={donations}
        currentCurrency={currentCurrency}
      />

      {/* 6. Field Stories & Dispatches (Deliberate European Journey Step) */}
      <section className="py-20 sm:py-24 lg:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 ring-4 ring-amber-600/20" aria-hidden="true" />
                <span>Frontline Testimonies</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 leading-tight">
                Dispatches From the Communities We Serve
              </h2>
              <p className="mt-3 text-base text-slate-600 font-light leading-relaxed">
                Photographic reports and personal accounts of living love in brick-kiln enclaves and arid rural villages.
              </p>
            </div>

            <button
              onClick={() => onNavigate('stories')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 hover:text-amber-900 transition-colors cursor-pointer self-start sm:self-auto group"
            >
              <span>View All Field Dispatches</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            
            {/* Story 1 */}
            <article className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between group shadow-2xs hover:shadow-lg transition-all duration-300">
              <div>
                <div className="aspect-16/10 overflow-hidden bg-slate-900">
                  <img
                    src="/assets/images/village-borehole-dedication.jpg"
                    alt="Village borehole well dedication"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
                    Clean Water &bull; Rural Village
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                    Clean Water Replaces Pond Sickness
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 font-light leading-relaxed line-clamp-3">
                    For over twenty years, families in Chak 42 collected muddy pond water. Our 280-foot aquifer well now provides certified pure drinking water for over 400 community residents.
                  </p>
                </div>
              </div>
              <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-slate-200/70 text-xs italic font-serif text-slate-500">
                &ldquo;Our children are healthy again. God has heard our cry.&rdquo;
              </div>
            </article>

            {/* Story 2 */}
            <article className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between group shadow-2xs hover:shadow-lg transition-all duration-300">
              <div>
                <div className="aspect-16/10 overflow-hidden bg-slate-900">
                  <img
                    src="/assets/images/children-reading-bibles.jpg"
                    alt="Children reading native language scriptures"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
                    Scripture Ministry &bull; Kiln Settlements
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                    Holding God&apos;s Word for the First Time
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 font-light leading-relaxed line-clamp-3">
                    Brother Emmanuel, a brick kiln laborer, could never afford a printed Bible. When our team placed an Urdu study Bible into his hands, he wept with joy and gratitude.
                  </p>
                </div>
              </div>
              <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-slate-200/70 text-xs italic font-serif text-slate-500">
                &ldquo;Now I can read John 8:12 to my children every night.&rdquo;
              </div>
            </article>

            {/* Story 3 */}
            <article className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between group shadow-2xs hover:shadow-lg transition-all duration-300">
              <div>
                <div className="aspect-16/10 overflow-hidden bg-slate-900">
                  <img
                    src="/assets/images/widow-family-food-delivery.jpg"
                    alt="Widow food delivery"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
                    Family Welfare &bull; Slum Settlement
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                    Restored Hope for Sister Martha
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 font-light leading-relaxed line-clamp-3">
                    After losing her husband to chronic respiratory illness in the kilns, Sister Martha was left alone with three small children. Our monthly widow sustenance bag restored stability.
                  </p>
                </div>
              </div>
              <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-slate-200/70 text-xs italic font-serif text-slate-500">
                &ldquo;Agape Light Network brought the hands of Jesus into our room.&rdquo;
              </div>
            </article>

          </div>

        </div>
      </section>

      {/* 7. Transparency & Fiduciary Stewardship */}
      <TransparencySection />

      {/* 8. Global Donor & Church Partner Testimonials */}
      <DonorTestimonials
        onOpenDonate={() => onOpenDonate()}
        onNavigate={onNavigate}
      />

      {/* 9. Donor FAQ Accordion: Manual Payments & Accountability */}
      <DonorFaqAccordion
        onOpenDonate={() => onOpenDonate()}
        onNavigate={onNavigate}
      />

      {/* 10. Clear Involvement & Dedicated Giving Invitation */}
      <section className="py-20 sm:py-24 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none opacity-30" 
          style={{ 
            background: 'radial-gradient(circle 600px at 70% 30%, rgba(184, 116, 34, 0.15), transparent 70%)' 
          }} 
          aria-hidden="true" 
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/90 rounded-3xl p-8 sm:p-12 lg:p-14 border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ring-4 ring-amber-400/20" aria-hidden="true" />
                <span>Partner in the Living Light</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                Stand Alongside Frontline Believers & Children
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl leading-relaxed">
                Your partnership enables clean water boreholes, mother-tongue Scripture translation, emergency medical care, and monthly sustenance for abandoned widows. 100% of designated gifts go directly to field operations.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-end">
              <button
                onClick={() => onOpenDonate()}
                className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-500"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>Make a Contribution</span>
              </button>

              <button
                onClick={() => onNavigate('get-involved')}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-200 text-sm font-medium transition-all cursor-pointer"
              >
                <span>Church Partnership Details</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Contact Section */}
      <ContactSection settings={settings} />
    </div>
  );
};
