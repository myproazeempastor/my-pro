import React, { useState } from 'react';
import { Play, X, MapPin, Calendar, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

interface VideoEvidencePageProps {
  onOpenDonate: (projectId?: number) => void;
  onNavigate: (route: string) => void;
}

export const VideoEvidencePage: React.FC<VideoEvidencePageProps> = ({
  onOpenDonate,
  onNavigate
}) => {
  const [activeVideo, setActiveVideo] = useState<{ title: string; location: string; date: string; description: string; duration: string; poster: string } | null>(null);

  const videos = [
    {
      title: 'Family Debt Rescue & Legal Certificate Execution',
      location: 'Vehari Brick Kiln No. 14, Punjab',
      date: 'March 2026',
      duration: '4:15',
      poster: '/assets/images/clean-water-well-field.jpg',
      description: 'Rev. Azeem Tariq paying the final $500 debt balance to kiln management and handing signed judicial release papers to the father before loading the family into the transport vehicle.'
    },
    {
      title: 'The First Stream: 280ft Aquifer Well Gushing Pure Water',
      location: 'Chak 42 Rural Village, Punjab',
      date: 'February 2026',
      duration: '3:40',
      poster: '/assets/images/village-borehole-dedication.jpg',
      description: 'Raw footage capturing the moment clean, crystal-clear drinking water flows from the newly installed deep submersible pump. Joyful songs and prayers from community elders.'
    },
    {
      title: 'First Time Holding God&apos;s Word: Bible Handover Ceremony',
      location: 'Kot Radha Kishan Christian Settlement',
      date: 'January 2026',
      duration: '5:20',
      poster: '/assets/images/children-reading-bibles.jpg',
      description: 'Emotional testimonies of adult brick molders receiving their very first personal copies of the Urdu Study Bible upon completing our free Christian literacy program.'
    },
    {
      title: 'Widow Sustenance & Dignity Relief Delivery',
      location: 'Faisalabad Peri-Urban Enclave',
      date: 'March 2026',
      duration: '3:10',
      poster: '/assets/images/widow-family-food-delivery.jpg',
      description: 'Field distribution of monthly whole-wheat flour bags, cooking ghee, lentils, and pastoral prayer for widows whose husbands died of kiln silicosis.'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Field Dispatches & Ground Truth</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Video Evidence Archive
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Unfiltered documentary video evidence capturing direct debt liquidations, certified deep water boreholes, and testimonies of freed Christian families in Punjab, Pakistan.
          </p>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {videos.map((vid, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between cursor-pointer"
                onClick={() => setActiveVideo(vid)}
              >
                <div>
                  <div className="relative aspect-16/9 bg-slate-950 overflow-hidden">
                    <img 
                      src={vid.poster} 
                      alt={vid.title} 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-amber-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-amber-600 transition-all">
                        <Play className="w-6 h-6 fill-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-slate-950/80 text-white text-xs font-mono">
                      {vid.duration}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1 font-medium text-amber-800">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <span>{vid.location}</span>
                      </span>
                      <span>{vid.date}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      {vid.title}
                    </h3>

                    <p className="mt-2.5 text-xs text-slate-600 font-light leading-relaxed line-clamp-3">
                      {vid.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Ground Dispatch
                  </span>
                  <span className="text-amber-800 font-semibold group-hover:underline">Watch Video &bull; {vid.duration}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => onNavigate('field-evidence')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-800 hover:text-amber-900 cursor-pointer"
            >
              <span>View Official Stamped Legal Documents in Field Evidence</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Video Lightbox Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative bg-slate-900 text-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-700">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Simulated Video Player Screen */}
            <div className="relative aspect-16/9 bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center mb-3 shadow-lg animate-pulse">
                <Play className="w-7 h-7 fill-white ml-1" />
              </div>
              <div className="text-sm font-semibold text-white">Verified Frontline Field Footage</div>
              <div className="text-xs text-slate-400 mt-1 max-w-md">
                Field recording supervised on location by Rev. Azeem Tariq ({activeVideo.location})
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="text-amber-400 font-semibold">{activeVideo.location}</span>
                <span>{activeVideo.date} &bull; {activeVideo.duration}</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-white">{activeVideo.title}</h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">{activeVideo.description}</p>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <div className="text-xs text-slate-400 font-light">Agape Light Network Direct Archival Dispatch</div>
                <button
                  onClick={() => {
                    setActiveVideo(null);
                    onOpenDonate();
                  }}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Support This Mission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
