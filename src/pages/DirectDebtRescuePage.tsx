import React, { useState } from 'react';
import { SiteSettings, CurrencyCode } from '../types';
import { ShieldCheck, Heart, Users, CheckCircle2, ArrowRight, AlertCircle, FileCheck, DollarSign } from 'lucide-react';

interface DirectDebtRescuePageProps {
  settings: SiteSettings;
  currentCurrency: CurrencyCode;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const DirectDebtRescuePage: React.FC<DirectDebtRescuePageProps> = ({
  settings,
  currentCurrency,
  onNavigate,
  onOpenDonate
}) => {
  const [familiesCount, setFamiliesCount] = useState<number>(1);
  const costPerFamily = 500; // $500 clears complete debt

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Direct Field Liberation &bull; Vehari, Punjab, Pakistan</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Direct Debt Rescue
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            For exactly $500, an entire Christian family is legally and physically liberated from generational brick-kiln bondage. 100% of your gift goes directly to debt cancellation with zero corporate deduction.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Rescue a Family for $500</span>
            </button>
            <button
              onClick={() => onNavigate('field-evidence')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-medium transition-colors cursor-pointer"
            >
              <FileCheck className="w-4 h-4 text-amber-400" />
              <span>View Legal Release Evidence</span>
            </button>
          </div>
        </div>
      </section>

      {/* The Reality of Brick Kiln Bonded Servitude */}
      <section className="py-14 sm:py-18 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-white p-7 sm:p-10 rounded-xl border border-slate-200/90 shadow-xs space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>The Generational Trap</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              How Christian Families Are Trapped in Slavery
            </h2>

            <div className="text-sm sm:text-base text-slate-600 font-light leading-relaxed space-y-4">
              <p>
                In Pakistan, over 4.5 million individuals work in bonded labor at brick kilns. A disproportionate number are Christians who lack social standing, property rights, or legal recourse.
              </p>
              <p>
                A modest loan of $300 to $500 taken out for a mother&apos;s emergency childbirth or father&apos;s medicine is multiplied through predatory interest by kiln owners. Families are forced to mold 1,000 heavy clay bricks each day in scorching heat. When parents grow old or perish from respiratory sickness, the debt transfers to their young children. They cannot leave without armed guards tracking them down.
              </p>
              <p className="font-medium text-slate-900">
                Agape Light Network enters these exact kilns under the pastoral leadership of Rev. Azeem Tariq. We negotiate directly with owners, pay off the precise ledger balance, obtain official signed legal release papers, and transport the family to immediate safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 4-Step Rescue Protocol */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 mb-2">Operational Precision</div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 leading-tight">
              The 4-Step Direct Debt Rescue Protocol
            </h2>
            <p className="mt-3 text-base text-slate-600 font-light leading-relaxed">
              Every rescue executed by Agape Light Network follows an audited protocol with legal documentation and pastoral oversight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest mb-2">Step 01</div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Field Vetting & Audit</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Our team visits the kiln secretly, verifies the family&apos;s faith and history, audits the exact debt ledger, and ensures no fraud.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500">
                Direct Pastoral Reconnaissance
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest mb-2">Step 02</div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Debt Settlement</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  We hand-deliver the exact $500 settlement to the kiln master in presence of community witnesses and local police liaison.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500">
                Official Stamped Receipt
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest mb-2">Step 03</div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Legal Freedom Papers</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Government stamp paper certificates of complete debt cancellation are executed. The family is legally free under Pakistani law.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500">
                Permanent Release Guarantee
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest mb-2">Step 04</div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Post-Rescue Care</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  The family is relocated, housed safely, given livestock or micro-cart grants, and enrolled in local church discipleship.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500">
                Sustainability Protocol
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Family Rescue Calculator */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                <span>Impact Sponsorship Calculator</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal text-white">
                How Many Families Will You Liberate?
              </h2>
              <p className="text-slate-300 text-sm font-light max-w-lg mx-auto">
                Select the number of families you or your congregation wish to liberate from the kilns today.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[1, 2, 5, 10].map(count => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setFamiliesCount(count)}
                  className={`py-4 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                    familiesCount === count
                      ? 'border-amber-500 bg-amber-500/10 text-white font-bold ring-2 ring-amber-500/30'
                      : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-serif text-2xl font-bold text-amber-400 mb-0.5">{count} {count === 1 ? 'Family' : 'Families'}</div>
                  <div className="text-xs text-slate-400">${count * costPerFamily} USD</div>
                </button>
              ))}
            </div>

            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Total Sponsorship Pledge</div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                  ${familiesCount * costPerFamily} USD
                </div>
                <div className="text-xs text-amber-400/90 mt-0.5 font-light">
                  {familiesCount} {familiesCount === 1 ? 'family' : 'families'} freed with legal release certificates
                </div>
              </div>

              <button
                onClick={() => onOpenDonate()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors cursor-pointer shadow-md"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>Complete ${familiesCount * costPerFamily} Rescue Gift</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-light">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% of this gift goes directly to the debt payoff. Official serial receipt and photo documentation provided.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cross link to Post-Rescue Protocol */}
      <section className="py-14 bg-white border-b border-slate-200/80 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-3">
          <h3 className="font-serif text-2xl font-bold text-slate-900">
            What Happens After Freedom?
          </h3>
          <p className="text-sm text-slate-600 font-light leading-relaxed">
            Freedom without economic sustenance can force families back into the kilns. Discover our rigorous post-rescue protocol with livestock and micro-enterprise setups.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('post-rescue-protocol')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-900 cursor-pointer"
            >
              <span>Explore The Post-Rescue Protocol</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
