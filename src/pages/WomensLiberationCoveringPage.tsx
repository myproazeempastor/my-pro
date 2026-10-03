import React from 'react';
import { SiteSettings } from '../types';
import { ShieldCheck, Heart, ArrowRight, CheckCircle2, Sparkles, Scissors, ShoppingBag, Eye } from 'lucide-react';

interface WomensLiberationCoveringPageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const WomensLiberationCoveringPage: React.FC<WomensLiberationCoveringPageProps> = ({
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
            <span>Pastoral Covering & Widow Protection &bull; James 1:27</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Women&apos;s Liberation & Covering
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Executing direct physical and spiritual liberation for Christian mothers, daughters, and widows trapped in the brick kilns of Vehari and rural Punjab.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Sponsor a Widow Relief Basket ($50)</span>
            </button>
            <button
              onClick={() => onNavigate('field-evidence')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-medium transition-colors cursor-pointer"
            >
              <span>View Field Evidence</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </section>

      {/* The Peril Faced by Women in the Kilns */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white p-7 sm:p-10 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
              Frontline Reality
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              Defending the Most Vulnerable in Punjab
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Christian women in Pakistani brick kilns endure unimaginable vulnerability. When a husband dies from toxic smoke or kidney failure, the kiln master frequently forces the grieving widow and her young daughters to assume the entire unpaid loan, threatening eviction or forced labor. Without a male protector or legal rights, these mothers are subjected to daily harassment and intimidation.
            </p>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Under Rev. Azeem Tariq, Agape Light Network operates an emergency rapid-response covering initiative. We provide physical legal intervention, pay off debts targeting widows, and bring these precious sisters into safe Christian community housing with regular food and dignity stipends.
            </p>
          </div>
        </div>
      </section>

      {/* The 4-Fold Liberation Framework for Women */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 mb-2">Holistic Covering</div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 leading-tight">
              Our 4-Fold Protection Protocol
            </h2>
            <p className="mt-3 text-base text-slate-600 font-light leading-relaxed">
              Restoring human dignity, financial independence, and spiritual covering in the name of Jesus Christ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">1. Legal & Debt Bailout</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  We step in immediately to pay predatory debts held over widows and daughters, canceling all contracts legally through local police and judicial liaisons.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">2. Monthly Food Security</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Audited monthly sustenance bags containing whole-wheat flour, cooking ghee, lentils, rice, tea, and sugar so no widow has to beg or compromise her faith.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                  <Scissors className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">3. Vocational Sewing Centers</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Free 6-month tailoring courses. Upon graduation, each woman receives a brand-new sewing machine and fabric kit to earn an independent daily living.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">4. Trauma Healing & Prayer</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Christian counseling fellowships led by mature pastor wives, providing prayer, biblical encouragement, and deliverance from generational fear.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Stand with Our Enslaved Sisters</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
