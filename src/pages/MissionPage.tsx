import React from 'react';
import { SiteSettings } from '../types';
import { BookOpen, Heart, CheckCircle2, ArrowRight, Compass } from 'lucide-react';

interface MissionPageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenDonate: () => void;
}

export const MissionPage: React.FC<MissionPageProps> = ({
  settings,
  onNavigate,
  onOpenDonate
}) => {
  return (
    <div className="bg-white">
      {/* 1. Dignified Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>The Great Commission & The Great Commandment</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Our Divine Mission
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Spreading spiritual light through the uncompromised Word of God, and living Christ&apos;s sacrificial Agape love through tangible humanitarian relief among the poorest of the poor.
          </p>
        </div>
      </section>

      {/* 2. Scripture Core Callout */}
      <section className="py-12 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/90 border-l-4 border-l-amber-600 shadow-xs">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
              Biblical Foundation &bull; John 8:12
            </div>
            <blockquote className="font-serif italic text-lg sm:text-xl text-slate-900 leading-relaxed">
              &ldquo;Then spake Jesus again unto them, saying, I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.&rdquo;
            </blockquote>
            <div className="mt-3 text-xs text-slate-500 font-light">
              Under this mandate, Agape Light Network serves communities trapped in geographical isolation, bonded kiln servitude, and extreme poverty.
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Dual Mandate Grid */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Pillar 1: Spreading Light */}
            <div className="p-8 rounded-xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-100/80 text-amber-800 flex items-center justify-center mb-5">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
                  Mandate I &bull; Spiritual Truth
                </div>
                <h2 className="font-serif text-2xl font-bold text-slate-900 mb-3">
                  Spreading Light
                </h2>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                  We believe that addressing physical destitution without offering the eternal redemption of Jesus Christ leaves souls unhealed. We carry the Gospel into rural frontiers through discipleship, native-tongue Scriptures, and church fellowship.
                </p>

                <ul className="space-y-3 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Free distribution of complete Bibles in Urdu, Hindi, and native dialects</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Free adult literacy and children Bible programs for uneducated laborers</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Pastoral training and leadership fellowships for frontline ministers</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-200/80">
                <button
                  onClick={() => onNavigate('projects')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 cursor-pointer"
                >
                  <span>Explore Bible & Literacy Programs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pillar 2: Living Love */}
            <div className="p-8 rounded-xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center mb-5">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
                  Mandate II &bull; Practical Mercy
                </div>
                <h2 className="font-serif text-2xl font-bold text-slate-900 mb-3">
                  Living Love (Agape in Action)
                </h2>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                  True biblical religion requires caring for the fatherless and widows in their distress (James 1:27). We meet physical crises with certified deep water infrastructure, medical relief, and monthly food security.
                </p>

                <ul className="space-y-3 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Drilling sustainable deep aquifer wells to eradicate typhoid and cholera</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Volunteer mobile doctor clinics, eye examinations, and free medicine</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Monthly food baskets, winter thermal blankets, and micro sewing grants</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-200/80">
                <button
                  onClick={() => onNavigate('projects')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-900 cursor-pointer"
                >
                  <span>Explore Clean Water & Widow Relief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Partner in This Divine Mission</span>
            </button>

            <button
              onClick={() => onNavigate('vision')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-700" />
              <span>Read Our 5-Year Vision Roadmap</span>
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};
