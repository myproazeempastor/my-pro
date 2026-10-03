import React from 'react';
import { SiteSettings } from '../types';
import { BookOpen, Heart, CheckCircle2, ArrowRight, ShieldCheck, Flame, Users, Cross } from 'lucide-react';

interface TheMissionPageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const TheMissionPage: React.FC<TheMissionPageProps> = ({
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
            <span>The Great Commission & The Great Commandment</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            The Mission of Agape Light Network
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Spreading spiritual light through the uncompromised Word of God, and living Christ&apos;s sacrificial Agape love through physical liberation from brick-kiln bondage and clean water relief.
          </p>
        </div>
      </section>

      {/* Core Epigraph */}
      <section className="py-12 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-7 sm:p-10 rounded-xl border border-slate-200/90 border-l-4 border-l-amber-600 shadow-xs">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
              Biblical Cornerstone &bull; John 8:12
            </div>
            <blockquote className="font-serif italic text-xl sm:text-2xl text-slate-900 leading-relaxed mb-4">
              &ldquo;I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.&rdquo;
            </blockquote>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              Under this divine mandate, Rev. Azeem Tariq leads Agape Light Network into Pakistan&apos;s most neglected frontiers: brick kilns, unreached rural villages, and persecuted settlements where extreme poverty and spiritual darkness converge.
            </p>
          </div>
        </div>
      </section>

      {/* Two Pillars of Our Mission */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 mb-2">Dual Mandate</div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 leading-tight">
              Spreading Light & Living Love
            </h2>
            <p className="mt-3 text-base text-slate-600 font-light leading-relaxed">
              We reject a social gospel devoid of Christ&apos;s blood, and we reject a detached theology that ignores starving widows and enslaved children. Both are indivisible in biblical ministry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Pillar 1 */}
            <div className="p-8 rounded-xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-100/80 text-amber-800 flex items-center justify-center mb-5">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">Pillar I &bull; Truth & Evangelism</div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">Spreading Light</h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                  Proclaiming the uncompromised Gospel of Jesus Christ across rural Pakistan through mass healing crusades, vernacular Bible translation and printing, and planting biblically grounded local churches.
                </p>

                <ul className="space-y-3 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Free distribution of complete Urdu and Punjabi study Bibles</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Open-air village healing crusades and trauma deliverance</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Training and supporting frontline pastors across unreached districts</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-200/80">
                <button
                  onClick={() => onNavigate('the-john-812-mandate')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 cursor-pointer"
                >
                  <span>Explore The John 8:12 Mandate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center mb-5">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">Pillar II &bull; Practical Mercy</div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">Living Love</h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                  Executing direct physical liberation for enslaved brick kiln families ($500 debt payoff per family), permanent clean water boreholes, and post-rescue micro-grants to ensure generational self-reliance.
                </p>

                <ul className="space-y-3 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Direct Debt Rescue: Legally freeing families from generational brick kiln debt</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Post-Rescue Protocol: Providing livestock and retail carts to prevent re-enslavement</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Drilling certified deep aquifer water wells to eliminate waterborne sickness</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-200/80">
                <button
                  onClick={() => onNavigate('direct-debt-rescue')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                >
                  <span>Explore Direct Debt Rescue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Partner in This Mission</span>
            </button>

            <button
              onClick={() => onNavigate('strategic-blueprint')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm transition-colors cursor-pointer"
            >
              <span>View 5-Year Strategic Blueprint</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
