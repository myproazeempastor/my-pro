import React from 'react';
import { SiteSettings } from '../types';
import { Church, BookOpen, Heart, ArrowRight, CheckCircle2, ShieldCheck, Users, GraduationCap } from 'lucide-react';

interface PastorsTrainingPageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const PastorsTrainingPage: React.FC<PastorsTrainingPageProps> = ({
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
            <span>Equipping the Frontline Shepherds &bull; 2 Timothy 2:2</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Pastors Training & Equipping
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Training, mentoring, and supporting rural pastors and evangelists planting churches among persecuted and brick-kiln communities in Punjab, Pakistan.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Sponsor a Rural Pastor ($75/mo)</span>
            </button>
            <button
              onClick={() => onNavigate('explore-church-vision')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-medium transition-colors cursor-pointer"
            >
              <span>Explore Church Planting Vision</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </section>

      {/* The Strategic Need for Shepherd Equipping */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white p-7 sm:p-10 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
              Frontline Realities
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              Standing with Those Who Shepherd the Persecuted
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Rural Christian pastors in Pakistan minister in extreme isolation. They live in modest mud homes alongside their impoverished congregations, often facing threats, false accusations, and extreme economic hardship. Most have never had the financial means to attend a formal theological seminary.
            </p>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Rev. Azeem Tariq convenes regular Pastor Equipping Cohorts in Vehari. We provide comprehensive theological instruction, Greek and Hebrew word studies in Urdu, sermon preparation, pastoral counseling methodologies, and financial stipends so pastors can care for their families while shepherding freed brick-kiln believers.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum & Support Elements */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 mb-2">Cohort Curriculum</div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 leading-tight">
              What Each Cohort Covers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">Expository Preaching</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Training pastors to preach verse-by-verse through books of the Bible, guarding their flocks against heretical prosperity doctrines and syncretism.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">Persecution Preparedness</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Equipping pastors with legal literacy, knowledge of constitutional minority rights in Pakistan, and protocols for protecting their churches.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">Living Stipend & Motorbike Mobility</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Supplying modest monthly living support ($75/month) and fuel allowances so pastors can travel to remote brick kiln settlements and rural outposts.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Sponsor a Pastor Today</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
