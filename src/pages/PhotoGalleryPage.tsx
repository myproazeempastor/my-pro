import React, { useState } from 'react';
import { Heart, X, MapPin, Tag, ZoomIn, ArrowRight } from 'lucide-react';

interface PhotoGalleryPageProps {
  onOpenDonate: (projectId?: number) => void;
  onNavigate: (route: string) => void;
}

export const PhotoGalleryPage: React.FC<PhotoGalleryPageProps> = ({
  onOpenDonate,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<{ url: string; title: string; location: string; category: string; caption: string } | null>(null);

  const photos = [
    {
      url: '/assets/images/clean-water-well-field.jpg',
      title: 'Aquifer Borehole Pump Station',
      location: 'Chak 42, Vehari District',
      category: 'Water Boreholes',
      caption: 'Community residents celebrate safe, crystal-clear drinking water drawn from a 280-foot deep aquifer, replacing stagnant ditch water.'
    },
    {
      url: '/assets/images/children-reading-bibles.jpg',
      title: 'Children with Vernacular Urdu Bibles',
      location: 'Brick Kiln Settlement, Multan',
      category: 'Bible & Literacy',
      caption: 'Young believers holding printed Urdu study Bibles after completing our free Christian evening literacy course.'
    },
    {
      url: '/assets/images/medical-optometry-screening.jpg',
      title: 'Mobile Doctor & Optometry Clinic',
      location: 'Basti Christian Colony, Punjab',
      category: 'Healthcare & Relief',
      caption: 'Volunteer Christian physician conducting eye exams and treating brick-dust corneal ulcers for elderly kiln workers.'
    },
    {
      url: '/assets/images/widow-family-food-delivery.jpg',
      title: 'Widow Family Sustenance Bag Handover',
      location: 'Faisalabad Slum Enclave',
      category: 'Widow Care',
      caption: 'Sister Martha and her children receiving an audited monthly food basket (flour, lentils, rice, oil) and pastoral prayer.'
    },
    {
      url: '/assets/images/winter-warm-blankets-distribution.jpg',
      title: 'Winter Thermal Blankets Distribution',
      location: 'Rural Vehari Kiln Clusters',
      category: 'Healthcare & Relief',
      caption: 'Heavy quilted thermal blankets distributed to Christian families enduring sub-freezing rural winter nights without heating.'
    },
    {
      url: '/assets/images/village-borehole-dedication.jpg',
      title: 'Praise & Dedication Prayer at Deep Well',
      location: 'Kot Radha Kishan Frontier',
      category: 'Water Boreholes',
      caption: 'Rev. Azeem Tariq leads community elders and children in joyful prayer during the official well commissioning ceremony.'
    },
    {
      url: '/assets/images/rev-azeem-tariq-dedication.jpg',
      title: 'Rev. Azeem Tariq Ministering in the Kilns',
      location: 'Vehari Frontline Outreach',
      category: 'Leadership & Crusades',
      caption: 'Rev. Azeem Tariq anointing and praying over bonded laborers during an open-air village prayer gathering.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photographs' },
    { id: 'Water Boreholes', label: 'Water Boreholes' },
    { id: 'Bible & Literacy', label: 'Bible & Literacy' },
    { id: 'Widow Care', label: 'Widow Care' },
    { id: 'Healthcare & Relief', label: 'Healthcare & Relief' },
    { id: 'Leadership & Crusades', label: 'Crusades & Ministry' }
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Field Evidence & Photographic Documentation</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Photographic Evidence Gallery
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Verified, unedited photographs documenting direct debt rescues, deep water well dedications, Bible literacy classrooms, and widow sustenance in Punjab, Pakistan.
          </p>
        </div>
      </section>

      {/* Category Filter Chips */}
      <section className="bg-slate-50/70 border-b border-slate-200/80 py-4 sticky top-18 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-14 sm:py-18 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPhotos.map((photo, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between cursor-pointer"
                onClick={() => setActivePhoto(photo)}
              >
                <div>
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                    <img 
                      src={photo.url} 
                      alt={photo.title} 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded-md bg-slate-900/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <span className="font-semibold text-amber-800">{photo.category}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        <span>{photo.location}</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      {photo.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 font-light leading-relaxed line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-4 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  Click to inspect full resolution
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => onNavigate('video-evidence')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 hover:text-amber-900 cursor-pointer"
            >
              <span>Switch to Video Evidence Archive</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Modal Lightbox */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[60vh] bg-slate-950 flex items-center justify-center overflow-hidden">
              <img src={activePhoto.url} alt={activePhoto.title} className="w-full h-full object-contain max-h-[60vh]" />
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-amber-800">{activePhoto.category}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{activePhoto.location}</span>
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">{activePhoto.title}</h2>
              <p className="text-sm text-slate-600 font-light leading-relaxed">{activePhoto.caption}</p>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-400">Agape Light Network &bull; Frontline Field Archive</span>
                <button
                  onClick={() => {
                    setActivePhoto(null);
                    onOpenDonate();
                  }}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Support This Field Program
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
