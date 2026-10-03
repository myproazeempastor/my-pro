import React from 'react';
import { Heart, ArrowRight, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

interface MinistryReportsStoriesPageProps {
  onOpenDonate: (projectId?: number) => void;
  onNavigate: (route: string) => void;
}

export const MinistryReportsStoriesPage: React.FC<MinistryReportsStoriesPageProps> = ({
  onOpenDonate,
  onNavigate
}) => {
  const reports = [
    {
      title: 'Out of the Kiln: Babar & Shazia Masih Receive Freedom Papers',
      date: 'March 2026',
      location: 'Vehari, District Punjab',
      category: 'Debt Rescue Story',
      image: '/assets/images/clean-water-well-field.jpg',
      quote: '“For fifteen years my wife and I made bricks from 4 AM until dusk. We could never pay off the interest. When Rev. Azeem Tariq paid our debt and tore up our ledger, we fell on our knees weeping.”',
      body: 'Babar Masih was trapped with a $480 debt accumulated over twelve years after his father died of acute silicosis. His four children were forced to work beside him. Through a designated $500 gift from an international church partner, Agape Light Network paid the balance in full, executed stamp-paper releases, and set the family up with a dairy buffalo in a Christian community colony.'
    },
    {
      title: 'Pond Water No More: Chak 42 Children Sickness Drops to Zero',
      date: 'February 2026',
      location: 'Chak 42 Rural Village',
      category: 'Water Well Report',
      image: '/assets/images/village-borehole-dedication.jpg',
      quote: '“Every summer our infants suffered vomiting and high fevers from pond water. Today our village has pure cold water 24 hours a day.”',
      body: 'Over 400 community residents in Chak 42 previously drew contaminated water from a mud basin shared with farm animals. Our geological crew drilled 280 feet into a sweet aquifer. The submersible solar pump now fills an overhead steel storage tank, providing continuous gravity-fed drinking water.'
    },
    {
      title: 'A Father Holds the Scriptures for the First Time at Age 52',
      date: 'January 2026',
      location: 'Brick Kiln Colony, Multan',
      category: 'Scripture Ministry',
      image: '/assets/images/children-reading-bibles.jpg',
      quote: '“I accepted Jesus Christ in 2001, but being an illiterate brick molder, I never imagined I could hold a Bible with my own hands. God has restored my dignity.”',
      body: 'Emmanuel Masih attended Agape Light Network’s free evening adult literacy classes for six months. In January, he read John 8:12 aloud to his family and congregation before receiving a hardbound Urdu study Bible presented by Rev. Azeem Tariq.'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Eyewitness Accounts from Rural Punjab</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Ministry Reports & Stories
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Firsthand testimonies and monthly operational dispatches recounting God&apos;s miraculous work of physical debt liberation, clean water, and gospel discipleship in Pakistan.
          </p>
        </div>
      </section>

      {/* Reports Feed */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {reports.map((rep, idx) => (
            <article key={idx} className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                <div className="md:col-span-5 h-64 md:h-auto bg-slate-950 relative">
                  <img src={rep.image} alt={rep.title} className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-amber-800">{rep.category}</span>
                      <span>{rep.date}</span>
                    </div>

                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                      {rep.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-4">
                      {rep.body}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 text-xs italic font-serif text-slate-700">
                    {rep.quote}
                  </div>
                </div>
              </div>
            </article>
          ))}

          <div className="text-center pt-8">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Partner in the Next Rescue Story</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
