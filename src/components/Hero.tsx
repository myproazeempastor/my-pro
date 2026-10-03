import React from 'react';
import { SiteSettings } from '../types';
import { Heart, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  settings: SiteSettings;
  onOpenDonate: (projectId?: number) => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  onOpenDonate,
  onExploreProjects
}) => {
  return (
    <section 
      id="home" 
      className="relative bg-slate-950 text-white py-16 sm:py-24 lg:py-32 border-b border-slate-800/80 overflow-hidden"
    >
      {/* Subtle ambient curatorial glow - high elegance */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40" 
        style={{ 
          background: 'radial-gradient(circle 800px at 15% 15%, rgba(184, 116, 34, 0.12), transparent 70%), radial-gradient(circle 600px at 85% 85%, rgba(37, 57, 95, 0.25), transparent 70%)' 
        }} 
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Main Editorial Column */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Quiet, Dignified Kicker (Zero-Pill Discipline) */}
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ring-4 ring-amber-400/20" aria-hidden="true" />
              <span>International Christian Ministry & Relief</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-slate-400 font-medium normal-case tracking-normal">Founded by {settings.founderName}</span>
            </div>

            {/* Confident Typographic Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12]">
              Spreading Light, <br />
              <span className="text-amber-300 font-serif italic">Living Sacrificial Love.</span>
            </h1>

            {/* Clear Editorial Summary */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed">
              Under the direct pastoral leadership of <strong>{settings.founderName}</strong>, Agape Light Network connects international Christian partners with unreached communities and vulnerable laborers—providing clean deep water wells, vernacular Holy Scriptures, and dignified relief.
            </p>

            {/* Scripture Mandate Box (Subtle, High Dignity) */}
            <div className="border-l-2 border-amber-500/80 bg-slate-900/40 rounded-r-lg pl-4 pr-3 py-2.5 my-2 backdrop-blur-xs">
              <blockquote className="font-serif text-sm sm:text-base italic text-slate-200 leading-snug">
                &ldquo;Then spake Jesus again unto them, saying, I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.&rdquo;
              </blockquote>
              <cite className="block text-[11px] font-sans font-medium uppercase tracking-widest text-amber-400/90 not-italic mt-1.5">
                — {settings.scriptureReference}
              </cite>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <button
                onClick={() => onOpenDonate()}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-amber-500 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>Support Our Programs</span>
              </button>

              <button
                onClick={onExploreProjects}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 hover:bg-slate-900/80 text-slate-200 font-medium text-sm transition-all focus-visible:outline-2 focus-visible:outline-slate-400 cursor-pointer"
              >
                <span>Explore Field Projects</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Trust & Stewardship Indicators (Zero-Pill, Typographic) */}
            <div className="pt-5 sm:pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Direct Field Allocation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Official Contribution Receipts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Field Verified Ledgers</span>
              </div>
            </div>

          </div>

          {/* Visual Showcase Card: Authentic Field Photography */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-2.5 sm:p-3 shadow-2xl backdrop-blur-xs">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-950">
                <img
                  src="/assets/images/clean-water-well-field.jpg"
                  alt="Agape Light Network field water well dedication in rural community"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-3.5 left-4 right-4 text-left">
                  <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-amber-400 mb-0.5">
                    Field Initiative
                  </div>
                  <div className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
                    Deep Borehole Clean Water Well
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    Installed in remote Punjab village &bull; Providing clean water for 400+ residents
                  </div>
                </div>
              </div>

              {/* Founder Leadership Signature */}
              <div className="p-3.5 mt-1 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-500/50 shrink-0 shadow-xs">
                    <img 
                      src="/assets/images/rev-azeem-tariq-dedication.jpg" 
                      alt={settings.founderName}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-white text-xs">
                      {settings.founderName}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {settings.founderTitle}
                    </div>
                  </div>
                </div>
                <div className="font-serif italic text-amber-400/90 text-xs">
                  &ldquo;Love never fails.&rdquo;
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
