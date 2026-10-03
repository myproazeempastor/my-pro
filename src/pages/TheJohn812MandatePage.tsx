import React from 'react';
import { SiteSettings } from '../types';
import { BookOpen, Heart, ArrowRight, Sun, Flame, Cross, ShieldCheck } from 'lucide-react';

interface TheJohn812MandatePageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const TheJohn812MandatePage: React.FC<TheJohn812MandatePageProps> = ({
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
            <span>The Foundational Scripture of Our Calling</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            The John 8:12 Mandate
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            &ldquo;Then spake Jesus again unto them, saying, I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.&rdquo;
          </p>
        </div>
      </section>

      {/* Theological Exposition */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="bg-white p-8 sm:p-10 rounded-xl border border-slate-200/90 shadow-xs space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Why John 8:12 Drives Every Brick-Kiln Rescue
            </h2>
            
            <div className="text-sm sm:text-base text-slate-600 font-light leading-relaxed space-y-4">
              <p>
                When our Lord Jesus Christ declared Himself to be the Light of the World in the Court of the Women during the Feast of Tabernacles, He stood beside the massive four-branched golden menorahs that illuminated Jerusalem. He revealed that spiritual darkness is not merely an intellectual ignorance; it is a spiritual oppression that enslaves souls and societies.
              </p>
              <p>
                In the brick kilns of Pakistan, darkness is both physical and spiritual. It is physical in the suffocating black soot of the furnace chimneys, the contaminated pond water children drink, and the predatory loan contracts that hold entire generations in captivity. It is spiritual in the demonic fatalism that tells a Christian laborer that he was born to suffer and die as a slave.
              </p>
              <p className="font-medium text-slate-900">
                Agape Light Network was named after this verse because Christ’s light does not remain passive. The Light of the World invades the darkness, breaks the chains of servitude, and brings the glorious liberty of the children of God.
              </p>
            </div>
          </div>

          {/* Three Dimensions of the Mandate */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">Light That Exposes</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Christ&apos;s light exposes the cruel injustice of generational bonded labor, predatory interest rates, and the exploitation of illiterate believers.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">Light That Liberates</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Christ&apos;s sacrificial Agape love pays the ransom price ($500 debt payoff) to legally shatter the shackles of servitude and purchase freedom.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">Light That Guides</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                The printed Word of God in vernacular Urdu and Punjabi, illuminating the path for freed families to walk as holy disciples of Jesus Christ.
              </p>
            </div>
          </div>

          <div className="text-center pt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Partner in the Living Light</span>
            </button>
            <button
              onClick={() => onNavigate('the-mission')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 font-medium text-sm transition-colors cursor-pointer"
            >
              <span>Read The Mission Statement</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};
