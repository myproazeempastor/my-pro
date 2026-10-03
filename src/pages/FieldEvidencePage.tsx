import React from 'react';
import { SiteSettings } from '../types';
import { FileCheck, ShieldCheck, Heart, ArrowRight, CheckCircle2, Download, Eye } from 'lucide-react';

interface FieldEvidencePageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const FieldEvidencePage: React.FC<FieldEvidencePageProps> = ({
  settings,
  onNavigate,
  onOpenDonate
}) => {
  const documents = [
    {
      title: 'Judicial Debt Cancellation Stamp Paper',
      category: 'Legal Freedom Certificate',
      date: 'March 2026',
      description: 'Official Pakistani Government Non-Judicial 100-Rupee Stamp Paper executed before local magistrate, signed by kiln master and witnesses, declaring the family forever free.',
      ref: 'ALN-DOC-2026-084'
    },
    {
      title: 'Independent Water Laboratory Purity Certificate',
      category: 'Aquifer Testing Report',
      date: 'February 2026',
      description: 'Certified lab analysis verifying zero arsenic, zero fecal coliforms, and optimal Total Dissolved Solids (TDS) for Chak 42 deep borehole well installation.',
      ref: 'ALN-LAB-2026-019'
    },
    {
      title: 'Brick Kiln Ledger Debt Settlement Voucher',
      category: 'Financial Liquidation Receipt',
      date: 'January 2026',
      description: 'Official stamped ledger voucher recording the direct $500 cash payment handed over by Rev. Azeem Tariq to the brick kiln accountant.',
      ref: 'ALN-FIN-2026-003'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Documentary Ground Truth & Verification</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Field Evidence Archive
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            In accordance with our strict accountability covenant, every rescue, water well, and relief operation is backed by official government stamp papers, laboratory reports, and photographic records.
          </p>
        </div>
      </section>

      {/* Document Records Repository */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Archival Verification</div>
            <h2 className="font-serif text-3xl font-bold text-slate-900">Legal & Technical Certificates</h2>
            <p className="text-xs text-slate-500 font-light">Direct documentary proof protecting donor trust and proving real-world impact.</p>
          </div>

          <div className="space-y-4">
            {documents.map((doc, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-amber-800">{doc.category}</span>
                    <span>&bull;</span>
                    <span>{doc.date}</span>
                    <span>&bull;</span>
                    <span className="font-mono text-slate-400">{doc.ref}</span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onNavigate('photo-gallery')}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Photos</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('video-evidence')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>Examine Video Evidence</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-3.5 h-3.5 fill-white/20" />
              <span>Sponsor a Documented Rescue</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
