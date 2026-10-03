import React from 'react';
import { SiteSettings } from '../types';
import { Church, BookOpen, Heart, ArrowRight, CheckCircle2, ShieldCheck, Users } from 'lucide-react';

interface ExploreChurchVisionPageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const ExploreChurchVisionPage: React.FC<ExploreChurchVisionPageProps> = ({
  settings,
  onNavigate,
  onOpenDonate
}) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Ecclesiological Foundations & Local Church Planting</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Explore Church Vision
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            We believe the local church is God&apos;s appointed vehicle for eternal redemption. Agape Light Network plants and strengthens Christ-centered congregations in newly liberated colonies across Punjab.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Plant a Frontline Church ($2,500)</span>
            </button>
            <button
              onClick={() => onNavigate('pastors-training')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-medium transition-colors cursor-pointer"
            >
              <span>Explore Pastors Training</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Narrative: The Church as the Fortress of Freedom */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white p-7 sm:p-10 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
              Ecclesiological Strategy
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              The Fortress for the Freed
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              When an enslaved family is pulled out of a brick kiln, their former master and community are often hostile. The family needs more than food and cash; they need a spiritual family, a home where they belong, and a sanctuary where they can worship the Lord without fear.
            </p>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Agape Light Network establishes simple, brick-and-mortar or covered community fellowship pavilions in Christian colonies. Each local church is led by an ordained pastor trained by Rev. Azeem Tariq, equipped with sound expository preaching, children&apos;s Sunday school, and mutual aid for widow members.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
