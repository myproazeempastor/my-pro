import React from 'react';
import { SiteSettings } from '../types';
import { ShieldCheck, ArrowRight, Heart, Home, ShoppingBag, BookOpen, Church, CheckCircle2 } from 'lucide-react';

interface PostRescueProtocolPageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const PostRescueProtocolPage: React.FC<PostRescueProtocolPageProps> = ({
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
            <span>Sustainability & Economic Independence</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            The Post-Rescue Protocol
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Freedom from brick kilns is only the first step. Our comprehensive Post-Rescue Protocol equips liberated families with livestock, micro-business setups, Christian education, and pastoral covering so they never return to slavery.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Sponsor a Post-Rescue Setup ($300)</span>
            </button>
            <button
              onClick={() => onNavigate('next-gen-rescue-discipleship')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-medium transition-colors cursor-pointer"
            >
              <span>Explore Next-Gen Discipleship</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </section>

      {/* The 4 Pillars of Sustainable Freedom */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 mb-2">Long-Term Blueprint</div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 leading-tight">
              Four Pillars of Lasting Liberation
            </h2>
            <p className="mt-3 text-base text-slate-600 font-light leading-relaxed">
              Without economic tools, an illiterate family risks accepting a new predatory loan within 6 months. Our protocol closes every vulnerability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <div className="bg-white p-8 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-100/80 text-amber-800 flex items-center justify-center mb-5">
                  <Home className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">Pillar 01</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-2">Safe Relocation & Housing</h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-4">
                  Families are physically moved away from the brick-kiln compound where former masters could intimidate them. We assist with initial rent in Christian settlement colonies with clean water access and secure locks.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Geographic Protection from Retaliation</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-8 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center mb-5">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">Pillar 02</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-2">Micro-Enterprise & Livestock Grants</h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-4">
                  We purchase a milch buffalo or pair of breeding goats for dairy income, or equip the father with a mobile vegetable/fruit pushcart. For mothers, we provide heavy-duty sewing machines and starter fabrics.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Independent Daily Cash Flow</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-8 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-100/80 text-blue-800 flex items-center justify-center mb-5">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-800 mb-1">Pillar 03</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-2">Next-Gen Education & Literacy</h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-4">
                  Children who molded clay bricks from age six are enrolled immediately in our Christian day literacy classrooms. We supply backpacks, uniforms, shoes, Urdu readers, and Bibles.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Breaking the Cycle of Generational Illiteracy</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white p-8 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-purple-100/80 text-purple-800 flex items-center justify-center mb-5">
                  <Church className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-purple-800 mb-1">Pillar 04</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-2">Pastoral Discipleship & Trauma Healing</h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-4">
                  Rev. Azeem Tariq and local trained pastors provide weekly trauma counseling, prayer for physical infirmities caused by brick dust, family discipleship, and baptism into the local body of Christ.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Spiritual Healing & Eternal Identity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Budget Breakdown */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" aria-hidden="true" />
            <span>Economic Packages</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900">
            How Post-Rescue Funds Are Deployed
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-serif text-2xl font-bold text-slate-900 mb-1">$150 USD</div>
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">Vocational Sewing Kit</div>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Industrial foot-pedal sewing machine, tailoring tools, and cloth supply empowering a mother to earn steady income from home.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-serif text-2xl font-bold text-slate-900 mb-1">$300 USD</div>
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">Micro-Retail Pushcart</div>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Heavy-duty timber cart, wholesale inventory of seasonal fruits/vegetables, enabling the father to generate $8–$12 daily profit.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-serif text-2xl font-bold text-slate-900 mb-1">$600 USD</div>
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">Dairy Cattle / Goats</div>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Healthy milch animal producing fresh milk for child nutrition and daily sales to local village markets.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Sponsor a Sustainability Package</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
