import React from 'react';
import { ShieldCheck, FileCheck, Landmark, CheckCircle2 } from 'lucide-react';

export const TransparencySection: React.FC = () => {
  return (
    <section id="transparency" className="py-20 sm:py-24 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 ring-4 ring-amber-600/20" aria-hidden="true" />
            <span>Fiduciary Stewardship</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 leading-tight">
            Financial Transparency & Ethical Governance
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            As stewards before God and our international partners, Agape Light Network adheres to rigorous financial ringfencing, independent oversight, and serial contribution tracking.
          </p>
        </div>

        {/* 3 Governance Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          
          <div className="bg-slate-50/70 hover:bg-white p-7 sm:p-9 rounded-2xl border border-slate-200/90 flex flex-col justify-between shadow-2xs hover:shadow-lg transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100/90 text-amber-800 flex items-center justify-center mb-6 shadow-2xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2.5">
                Designated Giving Charter
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                When you designate a gift to a specific project (such as a community deep well or widow sustenance), 100% of the funds are ringfenced and released exclusively for direct field deployment.
              </p>
            </div>
            <div className="mt-7 pt-4 border-t border-slate-200/70 flex items-center gap-2 text-xs text-slate-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Strict Field Ringfencing</span>
            </div>
          </div>

          <div className="bg-slate-50/70 hover:bg-white p-7 sm:p-9 rounded-2xl border border-slate-200/90 flex flex-col justify-between shadow-2xs hover:shadow-lg transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-200/80 text-slate-800 flex items-center justify-center mb-6 shadow-2xs">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2.5">
                Serial Numbered Receipts
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                Every offline manual remittance or bank wire is logged with an immutable serial reference (<code className="font-mono text-xs text-slate-800 bg-slate-200/60 px-1.5 py-0.5 rounded font-semibold">ALN-2026-XXXX</code>) accompanied by an official printable tax-acknowledgment receipt.
              </p>
            </div>
            <div className="mt-7 pt-4 border-t border-slate-200/70 flex items-center gap-2 text-xs text-slate-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0" />
              <span>Permanent Audit Reference</span>
            </div>
          </div>

          <div className="bg-slate-50/70 hover:bg-white p-7 sm:p-9 rounded-2xl border border-slate-200/90 flex flex-col justify-between shadow-2xs hover:shadow-lg transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100/90 text-emerald-800 flex items-center justify-center mb-6 shadow-2xs">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2.5">
                Zero Embellishment Policy
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                We reject exaggerated beneficiary figures and synthetic statistics. Every figure published represents confirmed operational realities logged in our database and supervised by Rev. Azeem Tariq.
              </p>
            </div>
            <div className="mt-7 pt-4 border-t border-slate-200/70 flex items-center gap-2 text-xs text-emerald-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Scriptural Integrity</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
