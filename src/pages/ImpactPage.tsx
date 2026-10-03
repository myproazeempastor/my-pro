import React from 'react';
import { Project, Donation, CurrencyCode } from '../types';
import { ShieldCheck, CheckCircle2, TrendingUp, Users, Heart, ArrowRight, FileText } from 'lucide-react';

interface ImpactPageProps {
  projects: Project[];
  donations: Donation[];
  currentCurrency: CurrencyCode;
  onOpenDonate: () => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({
  projects,
  donations,
  currentCurrency,
  onOpenDonate
}) => {
  const confirmedDonations = donations.filter(d => d.paymentStatus === 'confirmed');

  const verifiedSumsByCurrency: Record<string, number> = {};
  confirmedDonations.forEach(d => {
    verifiedSumsByCurrency[d.currency] = (verifiedSumsByCurrency[d.currency] || 0) + d.amount;
  });

  const totalConfirmedDonorsCount = new Set(confirmedDonations.map(d => d.donorEmail)).size;
  const activeProjectsCount = projects.filter(p => p.status === 'active').length;

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Dignified Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Audited Ministry Ledger & Outcomes</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Verified Ministry Impact
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            In accordance with our governance charter, we do not project or fabricate numbers. The metrics below represent verified contribution records recorded in our operational database.
          </p>
        </div>
      </section>

      {/* 2. Primary Metrics Matrix */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            
            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-xs">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Primary Funds Logged</div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                ${(verifiedSumsByCurrency['USD'] || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-light">USD confirmed ledger receipts</div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                Plus £{(verifiedSumsByCurrency['GBP'] || 0).toLocaleString()} & A${(verifiedSumsByCurrency['AUD'] || 0).toLocaleString()}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-xs">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Active Field Programs</div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                {activeProjectsCount}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-light">Independently monitored initiatives</div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                Water, Bibles, Healthcare & Widows
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-xs">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Direct Supporters</div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                {totalConfirmedDonorsCount}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-light">Churches, foundations & individuals</div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                US, UK, Australia, Canada, Europe
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-xs">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Field Allocation Pledge</div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-800 tracking-tight">
                100%
              </div>
              <div className="text-xs text-slate-500 mt-1 font-light">Field ringfenced guarantee</div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-medium">
                Zero administrative dilution
              </div>
            </div>

          </div>

          {/* Three Operational Integrity Standards */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-8 sm:p-10 shadow-xs space-y-6">
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              How We Verify and Document Field Outcomes
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Water Infrastructure</div>
                <h4 className="font-serif text-lg font-bold text-slate-900">Certified Aquifer Testing</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Every well is lab-tested for total dissolved solids (TDS), arsenic, and bacterial pathogens before community commissioning.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Bible Distribution</div>
                <h4 className="font-serif text-lg font-bold text-slate-900">Personal Vernacular Delivery</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Bibles are delivered directly into believers&apos; hands by Rev. Azeem Tariq and local pastors, accompanied by basic literacy courses.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Widow Registry</div>
                <h4 className="font-serif text-lg font-bold text-slate-900">Audited Monthly Rations</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Widow recipients are verified with national identity documents, and monthly distribution logs are counter-signed by community elders.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onOpenDonate}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Partner With Us to Expand This Impact</span>
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};
