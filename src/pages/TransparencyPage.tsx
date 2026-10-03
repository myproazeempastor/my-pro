import React from 'react';
import { Landmark, ShieldCheck, FileCheck, CheckCircle2, ArrowRight, Heart } from 'lucide-react';

interface TransparencyPageProps {
  onNavigate: (route: string) => void;
  onOpenDonate: () => void;
}

export const TransparencyPage: React.FC<TransparencyPageProps> = ({
  onNavigate,
  onOpenDonate
}) => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Dignified Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Fiduciary & Spiritual Accountability</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Financial Transparency & Stewardship
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            As stewards before the Lord Jesus Christ and our international partners, Agape Light Network adheres to strict financial ringfencing, independent accounting, and transparent reporting.
          </p>
        </div>
      </section>

      {/* 2. Core Governance Standards */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="bg-white p-7 sm:p-9 rounded-xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                1. 100% Designated Giving Policy
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              When a donor designates a gift for a specific project (such as a community water well or Bible print run), 100% of those funds are restricted and released solely for that project&apos;s direct field expenditure. We do not redirect designated funds to unrelated administrative salaries or overhead costs.
            </p>
          </div>

          <div className="bg-white p-7 sm:p-9 rounded-xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <FileCheck className="w-6 h-6 text-slate-700 shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                2. Serial Numbered Receipts & Audit Trail
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              Every confirmed payment or bank transfer is assigned a permanent reference code (e.g. <code className="font-mono text-xs bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded">ALN-2026-XXXX</code>) in our MySQL database. Donors can download an official receipt with pastoral sign-off and transaction verification.
            </p>
          </div>

          <div className="bg-white p-7 sm:p-9 rounded-xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                3. Zero Embellishment Commitment
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              We never fabricate numbers, inflate beneficiary statistics, or present unverified donations. Our metrics reflect the actual records maintained in our operational database and supervised on the ground by Rev. Azeem Tariq.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/70">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-amber-800 transition-colors cursor-pointer"
            >
              <span>Have questions about our financial governance? Contact leadership</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenDonate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-3.5 h-3.5 fill-white/20" />
              <span>Make a Contribution</span>
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};
