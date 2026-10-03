import React from 'react';
import { SiteSettings, CurrencyCode } from '../types';
import { Compass, Target, ShieldCheck, Heart, ArrowRight, CheckCircle2, TrendingUp, Users } from 'lucide-react';

interface StrategicBlueprintPageProps {
  settings: SiteSettings;
  currentCurrency: CurrencyCode;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const StrategicBlueprintPage: React.FC<StrategicBlueprintPageProps> = ({
  settings,
  currentCurrency,
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
            <span>Master 5-Year Horizon &bull; 2026–2031</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            The Strategic Blueprint
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Our systematic, audited roadmap to physically liberate 20,000 Christian families from Pakistani brick kilns, drill 250 certified deep water boreholes, and distribute 50,000 vernacular Holy Bibles.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Invest in the Strategic Blueprint</span>
            </button>
            <button
              onClick={() => onNavigate('initiate-strategic-alliance')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-medium transition-colors cursor-pointer"
            >
              <span>Initiate Strategic Alliance</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </section>

      {/* The 5-Year Core Targets Matrix */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 mb-2">Audited Milestones</div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 leading-tight">
              Four Measurable Five-Year Objectives
            </h2>
            <p className="mt-3 text-base text-slate-600 font-light leading-relaxed">
              We do not operate with vague aspirations. Every objective is broken down into quarterly operational benchmarks with ground verification in Punjab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Target 1 */}
            <div className="p-7 bg-white rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="font-serif text-4xl sm:text-5xl font-bold text-amber-700 mb-1">20,000</div>
                <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Enslaved Families Liberated</div>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Systematically clearing hereditary debt ledgers at $500 per family across brick kilns in Vehari, Multan, Faisalabad, and rural Punjab.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-amber-800">
                Direct Debt Payoff Covenant
              </div>
            </div>

            {/* Target 2 */}
            <div className="p-7 bg-white rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-1">250</div>
                <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Community Deep Wells</div>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Certified 250–300ft aquifer borehole wells with solar pump infrastructure, eradicating waterborne typhoid for over 100,000 villagers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-slate-700">
                100% Water Purity Certified
              </div>
            </div>

            {/* Target 3 */}
            <div className="p-7 bg-white rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-1">50,000</div>
                <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Vernacular Bibles</div>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Complete printed study Scriptures in Urdu and Punjabi dialects, distributed alongside adult literacy courses so believers can read God&apos;s Word.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-slate-700">
                Free Personal Delivery
              </div>
            </div>

            {/* Target 4 */}
            <div className="p-7 bg-white rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-1">100</div>
                <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Churches Planted & Sustained</div>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Establishing permanent local indigenous congregations with trained, biblically grounded pastors to shepherd newly liberated families.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-slate-700">
                Pastoral Leadership Covering
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Phases */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Phase Architecture</div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">How the Blueprint Is Implemented</h3>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="font-serif text-xl font-bold text-amber-800 shrink-0">Phase 1:</div>
              <div>
                <h4 className="font-serif text-base font-bold text-slate-900 mb-1">Reconnaissance & Field Intelligence</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Auditing brick kiln registers, identifying bonded Christian families facing immediate physical threats or medical emergencies, and establishing local police and elder liaison.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="font-serif text-xl font-bold text-amber-800 shrink-0">Phase 2:</div>
              <div>
                <h4 className="font-serif text-base font-bold text-slate-900 mb-1">Debt Liquidation & Legal Release</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Executing official debt payoff transactions directly with kiln management, executing judicial stamp paper certificates, and extracting families to secure transition shelters.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="font-serif text-xl font-bold text-amber-800 shrink-0">Phase 3:</div>
              <div>
                <h4 className="font-serif text-base font-bold text-slate-900 mb-1">Economic Regeneration & Housing</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Disbursing livestock, sewing machines, and commercial retail pushcarts while enrolling children in Christian literacy academies.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="font-serif text-xl font-bold text-amber-800 shrink-0">Phase 4:</div>
              <div>
                <h4 className="font-serif text-base font-bold text-slate-900 mb-1">Ecclesiological Integration</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Baptism, ongoing pastoral care, discipleship training, and integrating the family into a self-governing local church body.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onNavigate('frontline-accountability')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 cursor-pointer"
            >
              <span>Examine Our Frontline Accountability Protocol</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
