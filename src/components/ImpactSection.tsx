import React from 'react';
import { Project, Donation, CurrencyCode } from '../types';
import { CheckCircle2, TrendingUp, Users, ShieldCheck } from 'lucide-react';

interface ImpactSectionProps {
  projects: Project[];
  donations: Donation[];
  currentCurrency: CurrencyCode;
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({
  projects,
  donations,
  currentCurrency
}) => {
  // Only calculate from strictly confirmed donations
  const confirmedDonations = donations.filter(d => d.paymentStatus === 'confirmed');

  // Group by currency to avoid mixing unlike currencies
  const verifiedSumsByCurrency: Record<string, number> = {};
  confirmedDonations.forEach(d => {
    verifiedSumsByCurrency[d.currency] = (verifiedSumsByCurrency[d.currency] || 0) + d.amount;
  });

  const totalConfirmedDonorsCount = new Set(confirmedDonations.map(d => d.donorEmail)).size;
  const activeProjectsCount = projects.filter(p => p.status === 'active').length;

  return (
    <section id="impact" className="py-20 sm:py-24 lg:py-28 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25" 
        style={{ 
          background: 'radial-gradient(circle 800px at 80% 20%, rgba(184, 116, 34, 0.15), transparent 70%)' 
        }} 
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ring-4 ring-amber-400/20" aria-hidden="true" />
            <span>Audited Ministry Ledger</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
            Financial Accountability & Verified Impact
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 font-light leading-relaxed">
            In accordance with our governance charter, we do not project or fabricate statistics. The figures below are derived directly from verified database ledger entries.
          </p>
        </div>

        {/* Verified Metrics Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Confirmed Funds Recorded */}
          <div className="p-7 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between shadow-xl backdrop-blur-xs">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-5">
              <span className="font-medium tracking-wide">USD Ledger Total</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight tabular-nums">
                ${(verifiedSumsByCurrency['USD'] || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-slate-400 mt-1.5 font-light">
                Verified direct contributions
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="tabular-nums">Plus £{(verifiedSumsByCurrency['GBP'] || 0).toLocaleString()} & A${(verifiedSumsByCurrency['AUD'] || 0).toLocaleString()}</span>
            </div>
          </div>

          {/* Active Field Projects */}
          <div className="p-7 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between shadow-xl backdrop-blur-xs">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-5">
              <span className="font-medium tracking-wide">Active Programs</span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight tabular-nums">
                {activeProjectsCount}
              </div>
              <div className="text-xs text-slate-400 mt-1.5 font-light">
                Frontline field initiatives
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Water, Bibles, Healthcare & Widows</span>
            </div>
          </div>

          {/* Distinct Faithful Partners */}
          <div className="p-7 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between shadow-xl backdrop-blur-xs">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-5">
              <span className="font-medium tracking-wide">Direct Donors</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight tabular-nums">
                {totalConfirmedDonorsCount}
              </div>
              <div className="text-xs text-slate-400 mt-1.5 font-light">
                Churches, foundations & supporters
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>US, UK, Australia & Canada</span>
            </div>
          </div>

          {/* Field Designation Assurance */}
          <div className="p-7 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between shadow-xl backdrop-blur-xs">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-5">
              <span className="font-medium tracking-wide">Field Ringfence</span>
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 tracking-tight tabular-nums">
                100%
              </div>
              <div className="text-xs text-slate-400 mt-1.5 font-light">
                Project-designated commitment
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Zero administrative dilution</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
