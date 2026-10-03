import React from 'react';
import { SiteSettings } from '../types';
import { BookOpen, Heart, ArrowRight, CheckCircle2, GraduationCap, Sparkles, Smile, Shield } from 'lucide-react';

interface NextGenRescueDiscipleshipPageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const NextGenRescueDiscipleshipPage: React.FC<NextGenRescueDiscipleshipPageProps> = ({
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
            <span>Breaking Generational Bondage Through Christ</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Next-Gen Rescue & Discipleship
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Children born in brick kilns are sentenced to heavy labor before they can read. Agape Light Network rescues these children, replaces brick molds with Bibles, and provides free Christian education and discipleship.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Sponsor a Child&apos;s Education ($30/mo)</span>
            </button>
            <button
              onClick={() => onNavigate('photo-gallery')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-medium transition-colors cursor-pointer"
            >
              <span>View Classroom Photos</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Narrative Section: From Mud to Books */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden aspect-4/3 bg-slate-900 border border-slate-200 shadow-md">
                <img
                  src="/assets/images/children-reading-bibles.jpg"
                  alt="Rescued children reading scriptures"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">The Child&apos;s Plight</div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900">
                Lifting Little Hands Out of Toxic Dust
              </h2>
              <p className="text-sm text-slate-600 font-light leading-relaxed">
                In the brick kilns of Punjab, children as young as five years old carry wet clay blocks weighing 6 to 8 pounds under the blistering sun. They develop asthma, eye infections, and spine deformities. Most importantly, without the ability to read or write, they are unable to calculate interest rates or read the Bible, cementing their servitude forever.
              </p>
              <p className="text-sm text-slate-600 font-light leading-relaxed">
                When a family is rescued through our <strong>Direct Debt Rescue</strong>, their children are immediately enrolled in our Agape Light Christian Literacy Centers. We provide clean uniforms, sturdy shoes, school bags, nutritious daily milk, and godly Christian teachers who teach them about Jesus Christ.
              </p>

              <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-white rounded-lg border border-slate-200 text-center">
                  <div className="font-serif text-2xl font-bold text-amber-800">100%</div>
                  <div className="text-[11px] text-slate-500">Free Tuition & Supplies</div>
                </div>
                <div className="p-3.5 bg-white rounded-lg border border-slate-200 text-center">
                  <div className="font-serif text-2xl font-bold text-amber-800">Daily</div>
                  <div className="text-[11px] text-slate-500">Scripture & Prayer</div>
                </div>
                <div className="p-3.5 bg-white rounded-lg border border-slate-200 text-center">
                  <div className="font-serif text-2xl font-bold text-amber-800">Safe</div>
                  <div className="text-[11px] text-slate-500">Christian Environment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum & Discipleship Scope */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Holistic Care</div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">What Every Sponsored Child Receives</h3>
            <p className="text-xs text-slate-500 font-light">Equipping the next generation to be pastors, teachers, nurses, and kingdom pillars.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-slate-900 mb-1">Bible Literacy & Memorization</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Children memorize Psalm 23, John 8:12, and the Lord&apos;s Prayer. They learn to read their mother tongue through the Gospels.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-slate-900 mb-1">Accredited Primary Academics</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  English, Urdu, Mathematics, and General Science aligned with official educational standards so children can pursue higher degrees.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-slate-900 mb-1">Child Protection & Medical Exams</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Regular physical health screenings, eye examinations, vitamin distribution, and treatment for kiln-induced silicosis.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-slate-900 mb-1">Trauma Recovery & Pastoral Covering</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Gentle, loving Christian mentors who pray with each child, restoring their innocence, dignity, and confidence as children of God.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-6">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Sponsor Next-Gen Discipleship</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
