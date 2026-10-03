import React from 'react';
import { SiteSettings } from '../types';
import { Compass, BookOpen, ArrowRight, Heart, Droplets, ShieldCheck, CheckCircle2, Calendar } from 'lucide-react';

interface OurStoryPageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenDonate: () => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({
  settings,
  onNavigate,
  onOpenDonate
}) => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Dignified Editorial Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>The Journey &bull; 2006 to 2026</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Our Story of Faith & Service
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            How a humble pastoral calling among marginalized brick-kiln laborers grew into an international bridge of Gospel truth and tangible humanitarian relief.
          </p>
        </div>
      </section>

      {/* 2. Opening Biblical & Pastoral Epigraph */}
      <section className="py-12 sm:py-16 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 sm:p-10 border border-slate-200/90 border-l-4 border-l-amber-600 shadow-xs">
            <blockquote className="font-serif italic text-xl sm:text-2xl text-slate-900 leading-relaxed mb-4">
              &ldquo;We did not begin with strategic fundraising plans or international conferences. We began on our knees in smoke-filled brick kilns, holding the hands of dying children whose parents had no clean water and no copy of God’s Word.&rdquo;
            </blockquote>
            <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">{settings.founderName}, {settings.founderTitle}</span>
              <span className="text-amber-800 font-medium">Inspired by John 8:12</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Chronological Documentary Journey */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12 sm:mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 mb-2">
              Four Milestones
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 leading-tight">
              From Frontier Dust to Living Springs
            </h2>
            <p className="mt-3 text-base text-slate-600 font-light leading-relaxed">
              Every chapter in our history was forged through direct encounters with acute human suffering and God&apos;s miraculous provision.
            </p>
          </div>

          <div className="space-y-12 sm:space-y-16">
            
            {/* Chapter 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 order-2 md:order-1">
                <div className="rounded-xl overflow-hidden aspect-4/3 bg-slate-900 border border-slate-200 shadow-xs">
                  <img
                    src="/assets/images/clean-water-well-field.jpg"
                    alt="Brick kiln settlement in Punjab"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-7 order-1 md:order-2 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>2006–2011 &bull; The Early Encounters</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Chapter I: The Brick Kiln Calling
                </h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  As an ordained minister traveling through rural Punjab, Rev. Azeem Tariq discovered communities of Christian families trapped in hereditary bonded servitude. Forced to mold unbaked clay bricks under 45°C heat for pennies a day, these families lacked basic civic rights, medical attention, and spiritual shepherd care.
                </p>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  Rev. Tariq began holding evening prayer gatherings beneath thatched straw roofs, anointing the sick, and praying over children suffering from chronic respiratory illnesses.
                </p>
              </div>
            </div>

            {/* Chapter 2 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>2012–2015 &bull; The Water Crisis</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Chapter II: The First Aquifer Borehole
                </h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  In the summer of 2012, a catastrophic waterborne cholera outbreak swept through an enclave where 60 laborer families lived. The community had been drinking from stagnant irrigation runoff shared with water buffaloes.
                </p>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  Convinced that Christ’s love must quench physical thirst before preaching spiritual truths, Rev. Tariq rallied independent believers to drill their very first 250-foot aquifer well. The community borehole was dedicated with joyful songs and tears, cutting infant mortality in that village to zero.
                </p>
              </div>
              <div className="md:col-span-5">
                <div className="rounded-xl overflow-hidden aspect-4/3 bg-slate-900 border border-slate-200 shadow-xs">
                  <img
                    src="/assets/images/village-borehole-dedication.jpg"
                    alt="Village borehole well dedication"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Chapter 3 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 order-2 md:order-1">
                <div className="rounded-xl overflow-hidden aspect-4/3 bg-slate-900 border border-slate-200 shadow-xs">
                  <img
                    src="/assets/images/children-reading-bibles.jpg"
                    alt="Children reading native Bibles"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-7 order-1 md:order-2 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>2016–2020 &bull; Mother-Tongue Scriptures</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Chapter III: The Hunger for God&apos;s Word
                </h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  During a village baptism service, an elder took Rev. Tariq aside and asked if he could merely touch the leather cover of the pastor&apos;s Bible. In over forty years of believing, he had never owned a copy. Illiteracy and severe poverty had kept God&apos;s written Word out of reach.
                </p>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  Agape Light Network launched its Scripture & Literacy wing: printing high-grade Urdu and vernacular study Bibles, training local volunteer teachers, and establishing free evening literacy classes for adult brick molders and their children.
                </p>
              </div>
            </div>

            {/* Chapter 4 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>2021–2026 &bull; Global Partnership & Governance</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Chapter IV: Institutional Integrity & International Brotherhood
                </h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  To ensure lasting sustainability and protect international donor trust, Agape Light Network codified its <strong>100% Designated Giving Pledge</strong>. Under this charter, every dollar, pound, or euro donated for a clean water well or widow stipend is ringfenced without administrative cuts.
                </p>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  Today, churches, foundations, and faithful families across the United States, United Kingdom, Canada, Australia, and Europe partner directly with our frontline teams.
                </p>
              </div>
              <div className="md:col-span-5">
                <div className="rounded-xl overflow-hidden aspect-4/3 bg-slate-900 border border-slate-200 shadow-xs">
                  <img
                    src="/assets/images/widow-family-food-delivery.jpg"
                    alt="Widow food delivery and relief"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Pastoral Leadership Profile Spotlight */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 text-center">
              <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-2 border-amber-400/80 shadow-md">
                <img
                  src="/assets/images/rev-azeem-tariq-dedication.jpg"
                  alt={settings.founderName}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h4 className="font-serif text-xl font-bold text-white">
                {settings.founderName}
              </h4>
              <div className="text-xs text-amber-400 font-medium">
                {settings.founderTitle}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Spreading Light &bull; Living Love
              </div>
            </div>

            <div className="md:col-span-8 space-y-4 text-sm text-slate-300 font-light leading-relaxed border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-8">
              <p className="italic font-serif text-base text-slate-200">
                &ldquo;Our prayer is not merely to build wells of stone, but to be vessels of the Living Water who never runs dry. When you partner with Agape Light Network, you stand alongside believers who praise God with tears of gratitude for your obedience.&rdquo;
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('vision')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Our 5-Year Vision Roadmap</span>
                </button>
                <button
                  onClick={onOpenDonate}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 font-medium text-xs transition-colors cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                  <span>Support Our Ministry</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Bottom Call to Action */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900">
            Be Part of the Next Chapter
          </h3>
          <p className="text-sm text-slate-600 font-light leading-relaxed">
            Whether through personal intercessory prayer, church well sponsorship, or monthly widow assistance, you can make a verifiable eternal difference.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 text-sm font-medium transition-colors cursor-pointer"
            >
              <span>Explore Active Programs</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={onOpenDonate}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Make a Contribution</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
