import React, { useState } from 'react';
import { DonorTestimonial } from '../types';
import { initialTestimonials } from '../data/testimonialsData';
import { 
  Quote, 
  ShieldCheck, 
  CheckCircle2, 
  Globe2, 
  ArrowRight, 
  Heart, 
  Star, 
  FileCheck, 
  MapPin, 
  Calendar,
  Building,
  ExternalLink,
  ChevronRight,
  X
} from 'lucide-react';

interface DonorTestimonialsProps {
  onOpenDonate: () => void;
  onNavigate: (route: string) => void;
}

export const DonorTestimonials: React.FC<DonorTestimonialsProps> = ({
  onOpenDonate,
  onNavigate
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [expandedTestimonial, setExpandedTestimonial] = useState<DonorTestimonial | null>(null);

  const regionFilters = [
    { id: 'ALL', label: 'All Global Partners', count: initialTestimonials.length },
    { id: 'UK', label: 'United Kingdom 🇬🇧', count: initialTestimonials.filter(t => t.countryCode === 'UK').length },
    { id: 'US', label: 'United States 🇺🇸', count: initialTestimonials.filter(t => t.countryCode === 'US').length },
    { id: 'CA', label: 'Canada 🇨🇦', count: initialTestimonials.filter(t => t.countryCode === 'CA').length },
    { id: 'AU', label: 'Australia 🇦🇺', count: initialTestimonials.filter(t => t.countryCode === 'AU').length },
    { id: 'EU', label: 'Europe 🇪🇺/🇨🇭', count: initialTestimonials.filter(t => t.countryCode === 'EU').length },
  ];

  const filteredTestimonials = selectedRegion === 'ALL'
    ? initialTestimonials
    : initialTestimonials.filter(t => t.countryCode === selectedRegion);

  return (
    <section 
      id="donor-testimonials" 
      className="py-20 sm:py-24 lg:py-28 bg-slate-50/70 border-b border-slate-200/80 relative overflow-hidden"
    >
      {/* Subtle curatorial background glow */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-10 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 ring-4 ring-amber-600/20" aria-hidden="true" />
              <span>Global Partnership & Stewardship</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal tracking-tight text-slate-900 leading-tight">
              Testimonies from International Partners & Donors
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-light leading-relaxed text-balance">
              Hear directly from pastors, church mission directors, medical specialists, and faithful family sponsors across the United Kingdom, United States, Canada, Australia, and Europe who stand shoulder-to-shoulder with our frontline team.
            </p>
          </div>

          {/* Quick Stats Trust Badge */}
          <div className="lg:shrink-0 flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-slate-900 ml-1">5.0 / 5.0</span>
              </div>
              <div className="text-xs font-semibold text-slate-900 mt-0.5">
                100% Direct Field Allocation
              </div>
              <div className="text-[11px] text-slate-500 font-light">
                Documented GPS & Photo Audit Trail
              </div>
            </div>
          </div>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10 pb-2 border-b border-slate-200/80">
          <div className="flex items-center gap-1.5 mr-2 text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:flex">
            <Globe2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Filter Region:</span>
          </div>
          {regionFilters.map(filter => {
            const isActive = selectedRegion === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedRegion(filter.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                <span>{filter.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-slate-800 text-amber-300' : 'bg-slate-100 text-slate-500'
                }`}>
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300 group hover:border-slate-300 relative"
            >
              <div>
                {/* Top Badge & Flag */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 text-[11px] font-semibold border border-amber-200/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>{item.verificationBadge}</span>
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <span className="text-base" role="img" aria-label={item.country}>{item.flag}</span>
                    <span>{item.country}</span>
                  </div>
                </div>

                {/* Initiative Tag */}
                <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 mb-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  <span className="truncate">{item.initiative}</span>
                </div>

                {/* Quote with Editorial Marks */}
                <div className="relative mb-6">
                  <Quote className="w-6 h-6 text-amber-600/20 mb-2 shrink-0" />
                  <p className="font-serif italic text-slate-800 text-sm sm:text-base leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Donor Profile & Verification Footer */}
              <div className="pt-5 border-t border-slate-100 mt-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 font-serif font-bold text-xs flex items-center justify-center border border-slate-800 shrink-0">
                      {item.avatarInitials}
                    </div>
                    <div className="min-w-0">
                      <div className="font-serif font-bold text-slate-900 text-sm truncate">
                        {item.donorName}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate font-light">
                        {item.roleOrAffiliation}
                      </div>
                      {item.organization && (
                        <div className="text-[10px] text-amber-900/90 font-medium truncate">
                          {item.organization}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedTestimonial(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer shrink-0"
                    title="View Full Testimonial & Details"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-3 pt-2.5 border-t border-slate-50">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{item.location}</span>
                  </span>
                  <span className="flex items-center gap-1 font-medium text-slate-500">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>Partner since {item.partnerSince}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Partnership Assurance & Invitation Banner */}
        <div className="mt-14 sm:mt-16 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
              <FileCheck className="w-4 h-4 text-amber-700" />
              <span>Pastoral Fiduciary Guarantee</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Would Your Church or Family Like to Receive Direct Field Verification?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              Every major borehole well, brick kiln rescue deed, and Scripture distribution is accompanied by full GPS coordinates, photos, and pastor-signed receipts. We welcome introductory Zoom calls with Rev. Azeem Tariq.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Contribute as an International Partner</span>
            </button>
            <button
              onClick={() => onNavigate('frontline-accountability')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer hover:bg-slate-50"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>View Accountability Protocols</span>
            </button>
          </div>
        </div>

      </div>

      {/* Expanded Testimonial Detail Modal */}
      {expandedTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5 text-slate-900">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
                  <span className="text-base">{expandedTestimonial.flag}</span>
                  <span>{expandedTestimonial.country} &bull; {expandedTestimonial.location}</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  {expandedTestimonial.donorName}
                </h4>
                <div className="text-xs text-slate-600 mt-0.5">
                  {expandedTestimonial.roleOrAffiliation} {expandedTestimonial.organization ? `• ${expandedTestimonial.organization}` : ''}
                </div>
              </div>
              <button
                onClick={() => setExpandedTestimonial(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Initiative & Status */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold">
                {expandedTestimonial.initiative}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{expandedTestimonial.verificationBadge}</span>
              </span>
              <span className="text-xs text-slate-500 font-light ml-auto">
                Partner since {expandedTestimonial.partnerSince}
              </span>
            </div>

            {/* Full Testimonial Text */}
            <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80 relative">
              <Quote className="w-6 h-6 text-amber-600/30 mb-2" />
              <p className="font-serif italic text-slate-800 text-sm sm:text-base leading-relaxed">
                &ldquo;{expandedTestimonial.fullTestimonial || expandedTestimonial.quote}&rdquo;
              </p>
            </div>

            {/* Audit & Fiduciary Note */}
            <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs text-amber-950 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>This partnership is verified under Agape Light Network&apos;s published fiduciary standards and direct manual remittance ledger.</span>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setExpandedTestimonial(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setExpandedTestimonial(null);
                  onOpenDonate();
                }}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-white/20" />
                <span>Partner in this Initiative</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
