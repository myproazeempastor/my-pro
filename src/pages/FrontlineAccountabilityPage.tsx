import React from 'react';
import { SiteSettings } from '../types';
import { ShieldCheck, FileCheck, CheckCircle2, Heart, ArrowRight, Lock, Building2 } from 'lucide-react';

interface FrontlineAccountabilityPageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const FrontlineAccountabilityPage: React.FC<FrontlineAccountabilityPageProps> = ({
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
            <span>Fiduciary Integrity & Radical Transparency</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Frontline Accountability
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Before God and our international partners, Agape Light Network operates with complete financial ringfencing, zero corporate overhead on direct family debt rescue, and permanent legal audit trails.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Make a Transparent Gift</span>
            </button>
            <button
              onClick={() => onNavigate('field-evidence')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-medium transition-colors cursor-pointer"
            >
              <span>Examine Field Evidence</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </section>

      {/* The 5 Accountability Pillars */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="bg-white p-7 sm:p-10 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                1. 100% Direct Debt Rescue Policy
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              When a supporter gives $500 to free an enslaved brick kiln family, exactly $500 is placed into the debt liquidation transaction. We do not extract administrative salaries, Western travel allowances, or marketing surcharges from debt rescue donations.
            </p>
          </div>

          <div className="bg-white p-7 sm:p-10 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <FileCheck className="w-6 h-6 text-slate-700 shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                2. Legal Stamp Paper & Photographic Proof
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              Every debt payoff is documented with Pakistani Government judicial stamp papers signed and thumbprinted by the brick kiln owner, declaring the family forever free and clear of all liabilities. Photos and video evidence of the transaction and family extraction are archived and made available to sponsoring partners.
            </p>
          </div>

          <div className="bg-white p-7 sm:p-10 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                3. Immutable Serial Numbered Receipts
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              Every gift is logged in our central database with a permanent serial code (e.g. <code className="font-mono text-xs bg-slate-100 text-slate-800 px-1 py-0.5 rounded">ALN-2026-XXXX</code>). Official printable receipts with pastoral sign-off by Rev. Azeem Tariq are generated instantly.
            </p>
          </div>

          <div className="bg-white p-7 sm:p-10 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-blue-600 shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                4. Audited Banking Architecture
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              All international wire transfers and digital contributions are processed through verified bank channels with explicit exchange-rate transparency. We maintain dual-signatory financial protocols and zero personal commingling of ministry assets.
            </p>
          </div>

          <div className="bg-white p-7 sm:p-10 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-purple-600 shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                5. Zero Embellishment Covenant
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              We never fabricate donor numbers, inflate beneficiary tallies, or publish staged field reports. The metrics and testimonies shared on this website represent verified operational realities personally inspected by Rev. Azeem Tariq.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
            <button
              onClick={() => onNavigate('see-our-ground-impact')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-amber-800 transition-colors cursor-pointer"
            >
              <span>Review Ground Impact Metrics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-3.5 h-3.5 fill-white/20" />
              <span>Support Our Frontline Work</span>
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};
