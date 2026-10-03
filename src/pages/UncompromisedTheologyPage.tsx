import React from 'react';
import { SiteSettings } from '../types';
import { BookOpen, ShieldCheck, Heart, ArrowRight, CheckCircle2, Cross, ScrollText } from 'lucide-react';

interface UncompromisedTheologyPageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const UncompromisedTheologyPage: React.FC<UncompromisedTheologyPageProps> = ({
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
            <span>Doctrinal Foundation & Statement of Faith</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Uncompromised Theology
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Agape Light Network stands firmly upon the historic, orthodox Christian faith once delivered to the saints. On the frontline, pure biblical truth is the only anchor that withstands persecution and suffering.
          </p>
        </div>
      </section>

      {/* Theological Articles */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="bg-white p-7 sm:p-9 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <ScrollText className="w-6 h-6 text-amber-700 shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                1. The Infallible Word of God (Sola Scriptura)
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              We confess the 66 books of the Old and New Testaments to be the inspired, inerrant, and fully authoritative Word of God. The Scriptures are the supreme rule of faith, life, and ministry. We reject syncretism, liberal theological drift, or compromise with cultural pressures.
            </p>
          </div>

          <div className="bg-white p-7 sm:p-9 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <Cross className="w-6 h-6 text-amber-700 shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                2. Salvation in Christ Alone (Solus Christus & Sola Fide)
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              We believe in the full deity and sinless humanity of the Lord Jesus Christ, His virgin birth, His substitutionary atonement on the Cross, His bodily resurrection, and His personal return in glory. Salvation is by grace alone, through faith alone, in Christ Jesus alone (Acts 4:12).
            </p>
          </div>

          <div className="bg-white p-7 sm:p-9 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-700 shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                3. The Triune God
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              We worship one God eternally existing in three co-equal persons: Father, Son, and Holy Spirit. The Holy Spirit convicts the world of sin, regenerates the repentant believer, indwells the church, and empowers believers with spiritual gifts for bold gospel witness.
            </p>
          </div>

          <div className="bg-white p-7 sm:p-9 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-amber-700 shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                4. Agape Love in Action (James 1:27)
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              True biblical faith inevitably manifests in sacrificial love for the oppressed. &ldquo;Pure religion and undefiled before God and the Father is this, To visit the fatherless and widows in their affliction, and to keep himself unspotted from the world.&rdquo; Physical liberation of the enslaved is the natural fruit of Christ&apos;s love.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
            <button
              onClick={() => onNavigate('frontline-leadership-origins')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-amber-800 transition-colors cursor-pointer"
            >
              <span>Read About Leadership Origins</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-3.5 h-3.5 fill-white/20" />
              <span>Stand with Our Doctrinal Mission</span>
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};
