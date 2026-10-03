import React, { useState } from 'react';
import { Project, CurrencyCode } from '../types';
import { MapPin, Users, CheckCircle2, ShieldCheck, Heart, ArrowLeft, Image as ImageIcon, Calendar, AlertCircle } from 'lucide-react';
import { ProjectProgressBar } from '../components/ProjectProgressBar';

interface ProjectDetailPageProps {
  project: Project;
  currentCurrency: CurrencyCode;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId: number) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  currentCurrency,
  onNavigate,
  onOpenDonate
}) => {
  const [activeImage, setActiveImage] = useState<string>(project.imageUrl);
  const percentage = Math.min(100, Math.round((project.raisedAmount / project.goalAmount) * 100));

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

  const images = project.galleryImages && project.galleryImages.length > 0 
    ? project.galleryImages 
    : [project.imageUrl];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Dignified Header & Navigation Breadcrumb */}
      <section className="bg-slate-950 text-white py-12 sm:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 hover:text-amber-300 mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to All Programs</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mb-3">
            <span className="font-semibold text-amber-400 uppercase tracking-wider">{project.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{project.location}</span>
            </span>
            {project.startDate && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Initiated {project.startDate}</span>
                </span>
              </>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white max-w-4xl leading-tight mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-light leading-relaxed">
            {project.summary}
          </p>

        </div>
      </section>

      {/* 2. Premium Editorial Layout (2 Columns: Editorial Dossier + Sticky Donation Card) */}
      <section className="py-12 sm:py-16 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Main Editorial Content (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Featured Visual & Gallery Switcher */}
              <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-4 shadow-xs space-y-4">
                <div className="aspect-16/10 rounded-lg overflow-hidden bg-slate-950">
                  <img
                    src={activeImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                </div>

                {images.length > 1 && (
                  <div>
                    <div className="text-[11px] font-medium text-slate-500 mb-2 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>Field Mission Photography ({images.length} views)</span>
                    </div>
                    <div className="flex gap-2.5 overflow-x-auto pb-1">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImage(img)}
                          className={`relative w-20 h-14 rounded-md overflow-hidden shrink-0 border-2 cursor-pointer transition-all ${
                            activeImage === img ? 'border-amber-600 ring-2 ring-amber-200' : 'border-slate-200 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Section: The Problem & Human Need */}
              <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>The Critical Need</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  Why This Initiative Is Urgent
                </h2>
                <div className="text-sm sm:text-base text-slate-600 font-light leading-relaxed space-y-3">
                  <p>
                    Across marginalized settlements and rural kiln colonies, families live without legal safety nets, clean sanitation, or primary medical care. Women walk miles each day carrying heavy brass vessels to gather stagnant pond water contaminated by farm run-off and animal waste.
                  </p>
                  <p>
                    Meanwhile, believers in these unreached territories pray fervently for decades without ever possessing a single copy of the Holy Scriptures in their native mother tongue.
                  </p>
                </div>
              </div>

              {/* Section: What We Are Doing (Field Methodology) */}
              <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Our Field Action</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  What Agape Light Network Is Doing
                </h2>
                <div className="text-sm sm:text-base text-slate-600 font-light leading-relaxed space-y-3">
                  <p className="whitespace-pre-line">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Section: Fiduciary Ringfence & Receipt Guarantee */}
              <div className="p-6 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm leading-relaxed">
                  <strong className="block font-semibold text-slate-900 mb-1">
                    100% Direct Field Allocation Pledge
                  </strong>
                  Every donation earmarked for this specific program is ringfenced in our mission account. We do not extract administrative fees or marketing surcharges from designated gifts. You receive a verified serial contribution receipt upon confirmation.
                </div>
              </div>

            </div>

            {/* Sticky Sidebar: Fundraising Status & Action Card (4 cols) */}
            <div className="lg:col-span-4 sticky top-24 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-6">
                
                <ProjectProgressBar
                  raisedAmount={project.raisedAmount}
                  goalAmount={project.goalAmount}
                  donorCount={project.donorCount}
                  currentCurrency={currentCurrency}
                  variant="detailed"
                  showSupporters={true}
                  showRemaining={true}
                />

                <div className="py-2 border-y border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Direct Oversight by Rev. Azeem Tariq</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenDonate(project.id)}
                  className="w-full py-3.5 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-amber-600"
                >
                  <Heart className="w-4 h-4 fill-white/20" />
                  <span>Support This Program</span>
                </button>

                <p className="text-[11px] text-slate-400 text-center leading-snug font-light">
                  Tax-acknowledgment receipts with serial numbers issued for every contribution.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
