import React from 'react';
import { Heart, ArrowRight, MapPin, Calendar } from 'lucide-react';

interface StoriesPageProps {
  onOpenDonate: () => void;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({ onOpenDonate }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Dignified Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Dispatches from the Field</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Field Stories & Testimonies
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Personal testimonies of transformed lives, deep wells dedicated in prayer, and believers holding God’s Word in their mother tongue for the very first time.
          </p>
        </div>
      </section>

      {/* 2. Stories Feed */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Story 1 */}
          <article className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-xs grid grid-cols-1 md:grid-cols-12 items-stretch">
            <div className="md:col-span-5 h-64 md:h-auto bg-slate-900 relative">
              <img
                src="/assets/images/village-borehole-dedication.jpg"
                alt="Well dedication"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-amber-800">Clean Water & Public Health</span>
                  <span aria-hidden="true">·</span>
                  <span>Chak 42 Village</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                  Pure Water Replaces Generational Pond Sickness
                </h2>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-4">
                  For over twenty years, the families of Chak 42 shared contaminated pond water with livestock. Waterborne typhoid and dysentery claimed lives every hot season. Through a dedicated deep well sponsored through Agape Light Network, a 280-foot aquifer borehole now provides clean water for over 400 community members.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs italic font-serif text-slate-600">
                &ldquo;Our children are healthy again. God has heard our cry.&rdquo; &mdash; Community Elder
              </div>
            </div>
          </article>

          {/* Story 2 */}
          <article className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-xs grid grid-cols-1 md:grid-cols-12 items-stretch">
            <div className="md:col-span-5 h-64 md:h-auto bg-slate-900 relative">
              <img
                src="/assets/images/children-reading-bibles.jpg"
                alt="Bible reading"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-amber-800">Scripture Ministry</span>
                  <span aria-hidden="true">·</span>
                  <span>Brick-Kiln Labor Settlement</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                  Holding God’s Word for the First Time
                </h2>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-4">
                  Brother Emmanuel, a brick kiln laborer who accepted Christ five years ago, could never afford a printed Bible. When our team placed an Urdu study Bible into his hands following our adult literacy program, he wept with gratitude.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs italic font-serif text-slate-600">
                &ldquo;Now I can read John 8:12 to my children every night by lamplight.&rdquo; &mdash; Emmanuel
              </div>
            </div>
          </article>

          {/* Story 3 */}
          <article className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-xs grid grid-cols-1 md:grid-cols-12 items-stretch">
            <div className="md:col-span-5 h-64 md:h-auto bg-slate-900 relative">
              <img
                src="/assets/images/widow-family-food-delivery.jpg"
                alt="Widow food delivery"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-amber-800">Family Welfare & Relief</span>
                  <span aria-hidden="true">·</span>
                  <span>Peri-Urban Settlement</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                  Restored Dignity for Sister Martha
                </h2>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-4">
                  After losing her husband to chronic respiratory illness in the kilns, Sister Martha was left alone with three small children and eviction notices. Our monthly widow sustenance bag and winter blanket sponsorship restored stability and food security to her humble home.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs italic font-serif text-slate-600">
                &ldquo;When I felt utterly abandoned, Agape Light Network brought the hands of Jesus into our room.&rdquo; &mdash; Sister Martha
              </div>
            </div>
          </article>

          <div className="text-center pt-6">
            <button
              onClick={onOpenDonate}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Partner in the Next Field Story</span>
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};
