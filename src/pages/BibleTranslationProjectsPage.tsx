import React from 'react';
import { SiteSettings } from '../types';
import { BookOpen, Heart, ArrowRight, CheckCircle2, Languages, FileText, Download } from 'lucide-react';

interface BibleTranslationProjectsPageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const BibleTranslationProjectsPage: React.FC<BibleTranslationProjectsPageProps> = ({
  settings,
  onNavigate,
  onOpenDonate
}) => {
  const projects = [
    {
      title: 'Urdu Study Bible (Gospel of John & Romans Focus)',
      status: 'In Print & Distribution',
      language: 'Urdu (Nastaliq Script)',
      target: '25,000 Copies',
      progress: 68,
      description: 'Complete Bible with explanatory footnotes, maps, and cross-references tailored for rural believers and newly literate brick-kiln laborers.'
    },
    {
      title: 'Vernacular Punjabi New Testament',
      status: 'Field Translation & Review',
      language: 'Shahmukhi Punjabi',
      target: '15,000 Copies',
      progress: 84,
      description: 'Mother-tongue Scripture translation allowing elder villagers who cannot read Urdu to hear and read the Word in their heart language.'
    },
    {
      title: 'Audio Bible Solar Devices for Illiterate Laborers',
      status: 'Active Field Deployment',
      language: 'Punjabi & Urdu Audio',
      target: '5,000 Devices',
      progress: 42,
      description: 'Rugged solar-powered audio players pre-loaded with the complete New Testament for brick kiln workers who remain illiterate.'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Vernacular Scripture Dissemination &bull; John 8:12</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Bible Translation & Printing Projects
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Placing God&apos;s holy Word directly into believers&apos; hands in their native mother tongue. A complete study Bible costs only $7 to print and deliver into a kiln laborer&apos;s home.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Sponsor 10 Bibles ($70)</span>
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-medium transition-colors cursor-pointer"
            >
              <span>Visit Scripture Resource Shop</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Active Translation Projects Grid */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 mb-2">Active Field Pipelines</div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 leading-tight">
              Mother-Tongue Scripture Initiatives
            </h2>
            <p className="mt-3 text-base text-slate-600 font-light leading-relaxed">
              Every translation undergoes rigorous biblical linguistic vetting and peer-review by ordained Christian scholars in Pakistan before printing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((proj, idx) => (
              <div key={idx} className="bg-white p-7 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-semibold text-amber-800">{proj.language}</span>
                    <span className="bg-amber-50 text-amber-900 px-2 py-0.5 rounded text-[10px] font-bold">{proj.status}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-light leading-relaxed mb-6">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-baseline text-xs mb-1.5">
                    <span className="text-slate-500">Target: {proj.target}</span>
                    <span className="font-semibold text-amber-800">{proj.progress}% Funded</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                    <div className="bg-amber-600 h-full rounded-full" style={{ width: `${proj.progress}%` }} />
                  </div>

                  <button
                    onClick={() => onOpenDonate()}
                    className="w-full py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer text-center"
                  >
                    Sponsor This Translation
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('photo-gallery')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 cursor-pointer"
            >
              <span>View Photographs of Believers Receiving Their Bibles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
