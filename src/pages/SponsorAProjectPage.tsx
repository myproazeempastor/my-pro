import React from 'react';
import { SiteSettings, CurrencyCode } from '../types';
import { Heart, Droplets, BookOpen, Users, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SponsorAProjectPageProps {
  settings: SiteSettings;
  currentCurrency: CurrencyCode;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const SponsorAProjectPage: React.FC<SponsorAProjectPageProps> = ({
  settings,
  currentCurrency,
  onNavigate,
  onOpenDonate
}) => {
  const sponsorshipTiers = [
    {
      id: 'debt-rescue',
      title: 'Family Direct Debt Rescue',
      amount: '$500 USD',
      period: 'Complete Freedom',
      icon: Users,
      description: 'Fully pays off a Christian family’s generational brick-kiln debt, secures signed legal freedom stamp papers, and extracts them to safety.',
      deliverables: ['Judicial debt cancellation papers', 'Before-and-after photo documentation', 'Immediate relocation assistance']
    },
    {
      id: 'water-well',
      title: 'Certified Community Deep Well',
      amount: '$15,000 USD',
      period: 'Permanent Infrastructure',
      icon: Droplets,
      description: 'Drilling 250–300ft into sweet aquifer strata, heavy-duty solar submersible pump, overhead storage tank, and community distribution taps.',
      deliverables: ['Permanent engraved dedication plaque', 'Independent water laboratory purity certificate', 'Dedication video & GPS coordinates']
    },
    {
      id: 'bible-print',
      title: 'Vernacular Bible Print Run (500 Copies)',
      amount: '$3,500 USD',
      period: '500 Complete Bibles',
      icon: BookOpen,
      description: 'Funding the printing and personal hand-delivery of 500 complete Urdu study Bibles with commentary to newly literate believers.',
      deliverables: ['Custom sponsor dedication inscription inside covers', 'Distribution photographs with recipients', 'Literacy classroom report']
    },
    {
      id: 'pastor-support',
      title: 'Rural Pastor & Planter Support',
      amount: '$75 / month',
      period: 'Ongoing Discipleship',
      icon: ShieldCheck,
      description: 'Provides living stipend and motorbike travel fuel for an ordained frontline pastor shepherding newly liberated brick-kiln believers.',
      deliverables: ['Quarterly personal letter from sponsored pastor', 'Direct prayer partnership requests', 'Church attendance and baptism updates']
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Targeted Mission Partnerships &bull; Direct Allocation</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Sponsor a Frontline Project
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Congregations, foundations, and faithful families are invited to adopt specific frontline initiatives. 100% of designated contributions are ringfenced exclusively for field execution.
          </p>
        </div>
      </section>

      {/* Sponsorship Catalog Grid */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sponsorshipTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div key={tier.id} className="bg-white rounded-xl border border-slate-200/90 p-7 sm:p-8 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <div className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">{tier.amount}</div>
                        <div className="text-[11px] text-slate-500 uppercase tracking-wider">{tier.period}</div>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                      {tier.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-6">
                      {tier.description}
                    </p>

                    <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-700">Sponsorship Deliverables:</div>
                      {tier.deliverables.map((d, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenDonate()}
                    className="w-full py-3.5 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-white/20" />
                    <span>Sponsor This Initiative</span>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => onNavigate('initiate-strategic-alliance')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-amber-800 transition-colors cursor-pointer"
            >
              <span>Looking for church or foundation partnership agreements? Initiate a Strategic Alliance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
