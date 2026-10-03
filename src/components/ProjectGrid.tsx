import React from 'react';
import { Project, CurrencyCode } from '../types';
import { Heart, MapPin, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProjectProgressBar } from './ProjectProgressBar';

interface ProjectGridProps {
  projects: Project[];
  currentCurrency: CurrencyCode;
  onOpenDonate: (projectId: number) => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  currentCurrency,
  onOpenDonate,
  onSelectProject
}) => {
  const formatMoney = (amount: number) => {
    const symbolMap: Record<CurrencyCode, string> = {
      USD: '$',
      GBP: '£',
      CAD: 'CA$',
      AUD: 'A$',
      EUR: '€'
    };
    return `${symbolMap[currentCurrency]}${amount.toLocaleString()}`;
  };

  return (
    <section id="projects" className="py-20 sm:py-24 lg:py-28 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 ring-4 ring-amber-600/20" aria-hidden="true" />
            <span>Active Field Operations</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 leading-tight">
            Field Programs Serving the Most Vulnerable
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Every initiative is directly administered by our frontline ministry team under Rev. Azeem Tariq. Financial totals reflect verified bank and gateway contributions.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project) => {
            const percentage = Math.min(100, Math.round((project.raisedAmount / project.goalAmount) * 100));

            return (
              <article 
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Media Aspect Container */}
                <div 
                  className="relative aspect-16/10 overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Clean unboxed bottom caption */}
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{project.location}</span>
                    </span>
                    <span className="text-amber-300 font-medium">
                      {project.status === 'active' ? 'Active Program' : 'Completed'}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Metadata Header (Zero-Pill Discipline) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-amber-800">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Verified Field Ledger</span>
                    </div>

                    <h3 
                      onClick={() => onSelectProject(project)}
                      className="font-serif text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors cursor-pointer leading-snug"
                    >
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm text-slate-600 line-clamp-3 leading-relaxed font-light">
                      {project.summary}
                    </p>
                  </div>

                  {/* Verified Dynamic Financial Progress Bar (Funds Raised vs. Goal) */}
                  <div className="mt-7 pt-5 border-t border-slate-100">
                    <ProjectProgressBar
                      raisedAmount={project.raisedAmount}
                      goalAmount={project.goalAmount}
                      donorCount={project.donorCount}
                      currentCurrency={currentCurrency}
                      variant="card"
                      showSupporters={true}
                      showRemaining={true}
                    />

                    {/* Action Controls */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="flex items-center justify-center gap-1.5 py-3 px-3.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-slate-400"
                      >
                        <span>Program Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      <button
                        onClick={() => onOpenDonate(project.id)}
                        className="flex items-center justify-center gap-1.5 py-3 px-3.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-xl shadow-xs hover:shadow transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-600"
                      >
                        <Heart className="w-3.5 h-3.5 fill-white/20" />
                        <span>Support Program</span>
                      </button>
                    </div>
                  </div>
                </div>

              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
