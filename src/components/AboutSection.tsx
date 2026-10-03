import React from 'react';
import { SiteSettings } from '../types';
import { Heart, ArrowRight, ShieldCheck, BookOpen, Droplets } from 'lucide-react';

interface AboutSectionProps {
  settings: SiteSettings;
  onOpenDonate: () => void;
  onNavigateAbout?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  settings,
  onOpenDonate,
  onNavigateAbout
}) => {
  return (
    <section id="about" className="py-20 sm:py-24 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* President Card & Pastoral Calling */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-slate-900/95 rounded-2xl p-7 sm:p-9 text-white border border-slate-800 shadow-xl backdrop-blur-xs">
              
              {/* Founder Header */}
              <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-amber-400/70 shadow-md shrink-0">
                  <img
                    src="/assets/images/rev-azeem-tariq-dedication.jpg"
                    alt={settings.founderName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                    {settings.founderName}
                  </h3>
                  <div className="text-xs text-amber-400 font-medium uppercase tracking-wider mt-0.5">
                    {settings.founderTitle}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Frontline Christian Pastoral Leadership
                  </div>
                </div>
              </div>

              {/* Pastoral Statement */}
              <div className="py-6 space-y-4 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                <p>
                  &ldquo;When Jesus proclaimed in <em className="text-amber-300 not-italic font-serif">John 8:12</em> that He is the light of the world, He called His church not merely to speak words, but to manifest His sacrificial agape love in action.&rdquo;
                </p>
                <p>
                  &ldquo;In marginalized villages, our team encounters children who have never held God’s Word in their hands, families drinking contaminated water, and abandoned widows with zero protection. Agape Light Network was born to enter those exact places of suffering with the light of Christ and practical relief.&rdquo;
                </p>
              </div>

              {/* Scripture & Integrity Subtitle */}
              <div className="pt-5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-serif italic text-slate-300">&ldquo;Spreading Light, Living Love&rdquo;</span>
                <span className="text-amber-400 font-semibold tracking-wider">James 1:27</span>
              </div>
            </div>
          </div>

          {/* Narrative & Institutional Pillars */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-7">
            
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 ring-4 ring-amber-600/20" aria-hidden="true" />
              <span>Biblical Calling & Governance</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 leading-tight">
              An International Ministry Driven by Christ&apos;s Sacrificial Love
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
              <strong>Agape Light Network</strong> is an independent Christian outreach serving in difficult, impoverished, and rural territories. We partner with believers, churches, and charitable foundations across the United States, United Kingdom, Europe, Canada, Australia, and worldwide to execute targeted, life-saving initiatives.
            </p>

            {/* Two Structural Focus Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-amber-100/90 text-amber-800 flex items-center justify-center mb-4 shadow-2xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">Pure Gospel Light</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  Translating and gifting Bibles in native vernaculars and conducting Bible literacy courses for unreached believers.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-amber-100/90 text-amber-800 flex items-center justify-center mb-4 shadow-2xs">
                  <Droplets className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">Humanitarian Relief</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  Installing permanent deep water wells, free medical outreach camps, and sustained widow and orphan family stipends.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <button
                onClick={onOpenDonate}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-sm hover:shadow cursor-pointer focus-visible:outline-2 focus-visible:outline-slate-400"
              >
                <Heart className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                <span>Partner in Our Work</span>
              </button>

              {onNavigateAbout && (
                <button
                  onClick={onNavigateAbout}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-medium text-sm transition-all cursor-pointer"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
