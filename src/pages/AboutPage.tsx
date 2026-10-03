import React from 'react';
import { SiteSettings } from '../types';
import { Compass, BookOpen, ArrowRight, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenDonate: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  settings,
  onNavigate,
  onOpenDonate
}) => {
  return (
    <div className="bg-white">
      {/* 1. Dignified Editorial Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Origins & Pastoral Calling</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            About Agape Light Network
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Founded and led by <strong>{settings.founderName}</strong>, Agape Light Network serves as a transparent bridge connecting international believers with frontline Christian outreach and humanitarian relief across unreached territories.
          </p>
        </div>
      </section>

      {/* 2. President Profile & Founding History */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* President Executive Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 rounded-xl p-7 sm:p-8 text-white border border-slate-800 shadow-lg sticky top-24">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-5 border-2 border-amber-400/80 shadow-md">
                  <img
                    src="/assets/images/rev-azeem-tariq-dedication.jpg"
                    alt={settings.founderName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="text-center mb-6">
                  <h3 className="font-serif text-2xl font-bold text-white mb-1">
                    {settings.founderName}
                  </h3>
                  <div className="text-xs font-medium text-amber-400 uppercase tracking-widest">
                    {settings.founderTitle}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Ordained Christian Minister &bull; 20+ Years Pastoral Leadership
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed font-light border-t border-slate-800 pt-5">
                  <p>
                    Rev. Azeem Tariq has dedicated his life to ministering among impoverished brick-kiln laborers, persecuted rural believers, and fatherless children who lack basic rights.
                  </p>
                  <p>
                    Under his field oversight, every project is monitored in person, from site geological surveys for water wells to distributing mother-tongue Holy Scriptures.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-serif italic text-amber-400/90">&ldquo;Spreading Light, Living Love&rdquo;</span>
                  <span>John 8:12</span>
                </div>
              </div>
            </div>

            {/* Narrative & Field Genesis */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" aria-hidden="true" />
                  <span>The Calling</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 leading-tight">
                  Born in the Midst of Frontier Suffering
                </h2>
              </div>

              <div className="space-y-4 text-base text-slate-600 font-light leading-relaxed">
                <p>
                  Agape Light Network was born during an outreach visit to brick-kiln colonies where generations of Christian families worked under bonded servitude. Seeing children drinking contaminated water and believers weeping for a single copy of God&apos;s Word, Rev. Azeem Tariq answered the Lord’s calling to build an independent, trustworthy network of relief and gospel dissemination.
                </p>
                <p>
                  Rather than functioning as a detached grant-making organization, Agape Light Network operates on the ground. We work directly with village elders, local pastors, and community mothers to identify genuine needs and install lasting solutions.
                </p>
              </div>

              {/* Three Institutional Standards */}
              <div className="pt-4 space-y-3">
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-semibold text-slate-900">Direct Pastoral Supervision</strong>
                    <span className="text-xs text-slate-600 font-light">Rev. Azeem Tariq personally inspects all well installations and relief distributions.</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-semibold text-slate-900">100% Direct Field Allocation</strong>
                    <span className="text-xs text-slate-600 font-light">Every project gift is ringfenced without administrative cuts.</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-semibold text-slate-900">Serial Audited Receipts</strong>
                    <span className="text-xs text-slate-600 font-light">Every contribution is logged with an immutable identifier (e.g. ALN-2026-XXXX).</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('vision')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Our 5-Year Vision</span>
                </button>

                <button
                  onClick={() => onNavigate('mission')}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-sm transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>Our Divine Mission</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Field Photography Spotlight */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 mb-1">
              Field Documentation
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900">
              Frontline Ministries in Action
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden aspect-4/3 bg-slate-900 border border-slate-200">
              <img src="/assets/images/clean-water-well-field.jpg" alt="Deep water well" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden aspect-4/3 bg-slate-900 border border-slate-200">
              <img src="/assets/images/children-reading-bibles.jpg" alt="Scripture reading" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden aspect-4/3 bg-slate-900 border border-slate-200">
              <img src="/assets/images/widow-family-food-delivery.jpg" alt="Widow care" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Donation CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="font-serif text-3xl font-normal text-white">
            Support Rev. Azeem Tariq&apos;s Field Ministry
          </h2>
          <p className="text-sm text-slate-300 font-light max-w-xl mx-auto leading-relaxed">
            Your prayers and contributions directly empower clean water, Holy Scriptures, and loving relief for the forgotten.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenDonate}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
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
