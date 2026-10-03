import React from 'react';
import { SiteSettings } from '../types';
import { Flame, Heart, ArrowRight, CheckCircle2, Sparkles, MapPin, Users, Church } from 'lucide-react';

interface HealingCrusadesPageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const HealingCrusadesPage: React.FC<HealingCrusadesPageProps> = ({
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
            <span>Power Evangelism & Mass Deliverance</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Frontline Healing Crusades
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Breaking spiritual yokes, praying for miraculous physical healing, and proclaiming the uncompromised Gospel of Jesus Christ to thousands in unreached rural Pakistan.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Sponsor a Village Crusade ($1,500)</span>
            </button>
            <button
              onClick={() => onNavigate('video-evidence')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-medium transition-colors cursor-pointer"
            >
              <span>Watch Crusade Video Evidence</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Biblical Demonstration of Power */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white p-7 sm:p-10 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
              Signs & Wonders on the Frontier
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              Destroying Spiritual Yokes in the Kiln Enclaves
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Generational bonded labor does not only afflict the wallet and the body; it is enforced through generational fear, witchcraft, and spiritual intimidation. When Rev. Azeem Tariq sets up the sound systems and proclaims Jesus Christ in an open field surrounded by brick-kiln chimneys, the spiritual atmosphere shifts dramatically.
            </p>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              We have witnessed the blind receiving sight, tumors dissolving under prayer, chronic spinal injuries healed, and demonic bondages broken instantly in the name of Jesus Christ. Hundreds surrender their lives to the Savior in a single night.
            </p>
          </div>
        </div>
      </section>

      {/* Crusade Anatomy Grid */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 mb-2">The Crusade Framework</div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 leading-tight">
              From Preaching to Discipleship
            </h2>
            <p className="mt-3 text-base text-slate-600 font-light leading-relaxed">
              Our crusades are not one-night spectacles; they are tied directly to local church planting and long-term pastoral care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 bg-slate-50/70 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">1. Gospel Proclamation</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Clear, uncompromising biblical preaching of repentance, the Cross of Christ, and the resurrection. Free Gospel booklets distributed to every attendee.
                </p>
              </div>
            </div>

            <div className="p-7 bg-slate-50/70 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">2. Prayer for the Sick</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Laying hands on the afflicted in accordance with Mark 16:18. Mobile clinic teams are also on site to give free medicines to chronic patients.
                </p>
              </div>
            </div>

            <div className="p-7 bg-slate-50/70 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                  <Church className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">3. Local Church Harvest</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Every convert is connected to a local trained pastor for immediate baptism, discipleship, and enrollment in weekly fellowship.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('pastors-training')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 cursor-pointer"
            >
              <span>See How Frontline Pastors Are Trained to Shepherd the Harvest</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
