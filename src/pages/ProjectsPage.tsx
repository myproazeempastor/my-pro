import React, { useState } from 'react';
import { Project, CurrencyCode } from '../types';
import { MapPin, Users, CheckCircle2, ArrowRight, Heart } from 'lucide-react';
import { ProjectProgressBar } from '../components/ProjectProgressBar';

interface ProjectsPageProps {
  projects: Project[];
  currentCurrency: CurrencyCode;
  onSelectProject: (project: Project) => void;
  onOpenDonate: (projectId: number) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  currentCurrency,
  onSelectProject,
  onOpenDonate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Programs' },
    { id: 'Humanitarian Relief', label: 'Clean Water Wells' },
    { id: 'Ministry & Education', label: 'Scripture & Literacy' },
    { id: 'Healthcare Outreach', label: 'Mobile Healthcare' },
    { id: 'Family Welfare', label: 'Widow Sustenance' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

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
    <div className="bg-white">
      {/* 1. Dignified Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Active Field Operations</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Our Ministry Programs
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Every program below is overseen on the ground under Rev. Azeem Tariq. Financial totals and donor counts reflect verified database ledger entries.
          </p>
        </div>
      </section>

      {/* 2. Interactive Program Category Filters (Functional Buttons) */}
      <section className="bg-slate-50/70 border-b border-slate-200/80 py-4 sticky top-18 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Program Cards Grid */}
      <section className="py-16 sm:py-20 bg-slate-50/40 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredProjects.map(project => {
              const percentage = Math.min(100, Math.round((project.raisedAmount / project.goalAmount) * 100));

              return (
                <article 
                  key={project.id}
                  className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
                >
                  <div 
                    className="relative aspect-16/10 overflow-hidden bg-slate-900 cursor-pointer"
                    onClick={() => onSelectProject(project)}
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                      <span className="flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{project.location}</span>
                      </span>
                      <span className="text-amber-300 font-medium">
                        Active Program
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <span className="font-semibold text-amber-800">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>Audited Ledger</span>
                      </div>

                      <h2 
                        onClick={() => onSelectProject(project)}
                        className="font-serif text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors cursor-pointer leading-snug"
                      >
                        {project.title}
                      </h2>

                      <p className="mt-2.5 text-sm text-slate-600 line-clamp-3 leading-relaxed font-light">
                        {project.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-slate-100">
                      <ProjectProgressBar
                        raisedAmount={project.raisedAmount}
                        goalAmount={project.goalAmount}
                        donorCount={project.donorCount}
                        currentCurrency={currentCurrency}
                        variant="card"
                        showSupporters={true}
                        showRemaining={true}
                      />

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <button
                          onClick={() => onSelectProject(project)}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                        >
                          <span>Program Dossier</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        </button>

                        <button
                          onClick={() => onOpenDonate(project.id)}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs transition-colors cursor-pointer"
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
    </div>
  );
};
