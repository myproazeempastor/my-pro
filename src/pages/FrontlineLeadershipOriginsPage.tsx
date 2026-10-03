import React from 'react';
import { SiteSettings } from '../types';
import { ShieldCheck, Heart, ArrowRight, CheckCircle2, User, Calendar, MapPin, Church } from 'lucide-react';

interface FrontlineLeadershipOriginsPageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const FrontlineLeadershipOriginsPage: React.FC<FrontlineLeadershipOriginsPageProps> = ({
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
            <span>Pastoral Pedigree & Frontier Calling</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Frontline Leadership & Origins
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            The story, calling, and pastoral pedigree of Rev. Azeem Tariq, Founder & President of Agape Light Network, serving on the frontlines of Punjab, Pakistan for over twenty years.
          </p>
        </div>
      </section>

      {/* Profile & Biography */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            
            {/* Leadership Vignette */}
            <div className="md:col-span-5 sticky top-24">
              <div className="bg-slate-900 rounded-2xl p-7 text-white border border-slate-800 shadow-xl space-y-5 text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-2 border-amber-400/80 shadow-md">
                  <img
                    src="/assets/images/rev-azeem-tariq-dedication.jpg"
                    alt={settings.founderName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-0.5">
                    {settings.founderName}
                  </h3>
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                    {settings.founderTitle}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Vehari, Punjab, Pakistan
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 text-xs text-slate-300 font-light space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Ordained Minister since 2006</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Field operations across 12 rural districts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Church className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Church planter and pastoral mentor</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenDonate()}
                    className="w-full py-3 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Stand with Rev. Tariq</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Narrative Origins */}
            <div className="md:col-span-7 space-y-6">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">The Crucible</div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 leading-tight">
                Answering God&apos;s Call in the Dust of Bondage
              </h2>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Rev. Azeem Tariq was born and raised in Pakistan, witnessing firsthand the profound marginalization endured by minority Christian communities. Early in his pastoral ministry, the Holy Spirit drew his heart toward the brick-kiln colonies of Vehari and southern Punjab—places where few dared to go due to the hostility of feudal landlords.
                </p>
                <p>
                  While visiting a brick kiln in 2006, Rev. Tariq knelt beside a sick mother holding her infant in 110-degree heat. The kiln owner had refused permission for her to seek medical care because she &quot;owed&quot; $280 in accumulated interest. Rev. Tariq paid the debt out of his personal funds, carried the infant to a clinic, and watched God heal the child. That night, on his face before the Lord, the vision for <strong>Agape Light Network</strong> was born.
                </p>
                <p>
                  Over the past two decades, Rev. Tariq has personally inspected and supervised the drilling of every certified deep water well, negotiated the legal release of hundreds of enslaved families, conducted mass healing crusades, and mentored over 80 frontline pastors.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h4 className="font-serif text-lg font-bold text-slate-900">Pastoral Guarantees</h4>
                
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Administrative Dilution:</strong> 100% of designated debt rescue gifts go directly to kiln payoffs.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Personal Field Supervision:</strong> Rev. Tariq signs and inspects all release certificates in person.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Pastoral Covering:</strong> Rescued families remain under prayerful care and Christian discipleship.</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onNavigate('initiate-strategic-alliance')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 text-sm font-medium transition-colors cursor-pointer"
                >
                  <span>Connect With Rev. Tariq&apos;s Office</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
