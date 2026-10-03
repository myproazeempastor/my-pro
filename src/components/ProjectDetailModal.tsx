import React from 'react';
import { Project, CurrencyCode } from '../types';
import { X, Heart, MapPin, Tag, Calendar, Users, ShieldCheck, CheckCircle } from 'lucide-react';
import { ProjectProgressBar } from './ProjectProgressBar';

interface ProjectDetailModalProps {
  project: Project | null;
  currentCurrency: CurrencyCode;
  onClose: () => void;
  onOpenDonate: (projectId: number) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  currentCurrency,
  onClose,
  onOpenDonate
}) => {
  if (!project) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Featured Image Banner */}
        <div className="relative h-72 sm:h-80 bg-slate-900">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-amber-600 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                {project.category}
              </span>
              <span className="bg-slate-800 text-slate-200 text-xs px-2.5 py-1 rounded-md flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                {project.location}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Dynamic Financial Progress Banner (Funds Raised vs. Goal) */}
          <ProjectProgressBar
            raisedAmount={project.raisedAmount}
            goalAmount={project.goalAmount}
            donorCount={project.donorCount}
            currentCurrency={currentCurrency}
            variant="detailed"
            showSupporters={true}
            showRemaining={true}
          />

          {/* Full Narrative & Spiritual Mission */}
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
              Project Overview & Field Mission
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Accountability Notice */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block font-medium">Agape Light Network Direct Giving Pledge:</strong>
              100% of donations made to this specific initiative are earmarked exclusively for operations, materials, and distribution in {project.location}. A unique donation reference is issued for every transaction.
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Initiative started: <strong>{project.startDate}</strong>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenDonate(project.id);
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm shadow-xs transition-colors cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>Support This Program</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
