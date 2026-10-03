import React from 'react';
import { Heart, Building2, Users, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

interface GetInvolvedPageProps {
  onNavigate: (route: string) => void;
  onOpenDonate: () => void;
}

export const GetInvolvedPage: React.FC<GetInvolvedPageProps> = ({
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
            <span>Co-Laborers in God&apos;s Harvest</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Partner With Our Mission
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Discover meaningful avenues for your congregation, mission committee, charitable trust, or family to stand with believers on the frontlines.
          </p>
        </div>
      </section>

      {/* 2. Three Institutional Partnership Pathways */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            {/* Pathway 1: Intercession */}
            <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-100/80 text-amber-800 flex items-center justify-center mb-5">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">Pathway I</div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                  Prayer & Intercession Fellowship
                </h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Join our international prayer fellowship to receive verified, non-public missionary prayer bulletins directly from Rev. Azeem Tariq regarding persecuted and rural ministries.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 cursor-pointer"
                >
                  <span>Join Prayer Fellowship</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pathway 2: Church Sponsorship */}
            <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-200/80 text-slate-800 flex items-center justify-center mb-5">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">Pathway II</div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                  Congregational Adoption
                </h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Adopt a specific village deep well project ($15,000) or sponsor a vernacular Scripture shipment for 500 believers. Includes formal dedication ceremony, plaque, and quarterly field reports.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-slate-950 cursor-pointer"
                >
                  <span>Church Partnership Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pathway 3: Monthly Sustenance */}
            <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center mb-5">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">Pathway III</div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                  Monthly Giving Partner
                </h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Provide ongoing food security, winter thermal blankets, and micro-grant vocational equipment for Christian widows and orphans through a recurring monthly pledge.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={onOpenDonate}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                >
                  <span>Begin Monthly Gift</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Direct Pastoral Consultation */}
          <div className="bg-slate-900 rounded-xl p-8 sm:p-12 text-white text-center border border-slate-800 shadow-md">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-3">
              Direct Consultation With President Rev. Azeem Tariq
            </h3>
            <p className="text-slate-300 text-sm font-light max-w-2xl mx-auto mb-6 leading-relaxed">
              Senior pastors, mission elders, and foundation trustees are invited to schedule an exploratory discussion to discuss project governance and accountability covenants.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Request Pastoral Consultation</span>
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};
