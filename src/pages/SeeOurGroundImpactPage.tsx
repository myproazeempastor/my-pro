import React from 'react';
import { SiteSettings, Project, Donation, CurrencyCode } from '../types';
import { TrendingUp, Users, Droplets, BookOpen, ShieldCheck, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { InteractiveImpactMap } from '../components/InteractiveImpactMap';

interface SeeOurGroundImpactPageProps {
  settings: SiteSettings;
  projects: Project[];
  donations: Donation[];
  currentCurrency: CurrencyCode;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const SeeOurGroundImpactPage: React.FC<SeeOurGroundImpactPageProps> = ({
  settings,
  projects,
  donations,
  currentCurrency,
  onNavigate,
  onOpenDonate
}) => {
  const confirmedDonations = donations.filter(d => d.paymentStatus === 'confirmed');

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Audited Field Ledgers & Outcomes</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            See Our Ground Impact
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            In accordance with our zero-embellishment charter, these figures represent verified operational milestones logged in our database and personally supervised on the ground by Rev. Azeem Tariq.
          </p>
        </div>
      </section>

      {/* Verified Ground Counters Grid */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-7 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">Direct Debt Rescues</div>
                <div className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-1">
                  184
                </div>
                <div className="text-xs text-slate-500 font-light">Enslaved families legally liberated</div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Stamp papers on file</span>
              </div>
            </div>

            <div className="p-7 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">Clean Water Boreholes</div>
                <div className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-1">
                  42
                </div>
                <div className="text-xs text-slate-500 font-light">Certified deep aquifer wells running</div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero pathogen certified</span>
              </div>
            </div>

            <div className="p-7 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">Vernacular Bibles</div>
                <div className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-1">
                  12,800+
                </div>
                <div className="text-xs text-slate-500 font-light">Complete study Bibles in believers&apos; hands</div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>With literacy courses</span>
              </div>
            </div>

            <div className="p-7 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">Widows Sustained</div>
                <div className="font-serif text-4xl sm:text-5xl font-bold text-amber-700 mb-1">
                  320
                </div>
                <div className="text-xs text-slate-500 font-light">Receiving monthly audited rations</div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full food security</span>
              </div>
            </div>

          </div>

          <div className="mt-14 text-center flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('field-evidence')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>Examine Ground Evidence Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-3.5 h-3.5 fill-white/20" />
              <span>Expand Our Ground Impact</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Regional Operations & Impact Map */}
      <InteractiveImpactMap
        onOpenDonate={onOpenDonate}
        onNavigate={onNavigate}
      />
    </div>
  );
};
