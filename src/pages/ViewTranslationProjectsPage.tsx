import React, { useState } from 'react';
import { SiteSettings } from '../types';
import { BookOpen, Heart, ArrowRight, CheckCircle2, Download, FileText, Languages, Eye, ShieldCheck, Share2 } from 'lucide-react';

interface ViewTranslationProjectsPageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const ViewTranslationProjectsPage: React.FC<ViewTranslationProjectsPageProps> = ({
  settings,
  onNavigate,
  onOpenDonate
}) => {
  const [selectedScripture, setSelectedScripture] = useState<'urdu' | 'punjabi' | 'audio'>('urdu');

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Vernacular Manuscripts & Field Texts</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            View Translation Projects
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Examine our active translation manuscripts, committee reviews, and printing progress across Urdu, Punjabi, and oral audio formats under John 8:12.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenDonate(2)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Sponsor a Chapter ($35 USD)</span>
            </button>
            <button
              onClick={() => onNavigate('bible-translation-projects')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
            >
              <span>Translation Overview</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Interactive Explorer */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Translation Selection Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <button
              onClick={() => setSelectedScripture('urdu')}
              className={`p-5 rounded-xl border text-left transition-all cursor-pointer shadow-xs ${
                selectedScripture === 'urdu'
                  ? 'border-amber-600 bg-white ring-2 ring-amber-500/20'
                  : 'border-slate-200 bg-white/70 hover:bg-white'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
                Active Translation 01
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
                Urdu Study Bible (Bonded Edition)
              </h3>
              <div className="text-xs text-slate-500">
                Nastaliq Font &bull; 25,000 Volume Target &bull; 68% Funded
              </div>
            </button>

            <button
              onClick={() => setSelectedScripture('punjabi')}
              className={`p-5 rounded-xl border text-left transition-all cursor-pointer shadow-xs ${
                selectedScripture === 'punjabi'
                  ? 'border-amber-600 bg-white ring-2 ring-amber-500/20'
                  : 'border-slate-200 bg-white/70 hover:bg-white'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
                Active Translation 02
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
                Vernacular Punjabi New Testament
              </h3>
              <div className="text-xs text-slate-500">
                Shahmukhi Script &bull; Village Dialect &bull; 84% Completed
              </div>
            </button>

            <button
              onClick={() => setSelectedScripture('audio')}
              className={`p-5 rounded-xl border text-left transition-all cursor-pointer shadow-xs ${
                selectedScripture === 'audio'
                  ? 'border-amber-600 bg-white ring-2 ring-amber-500/20'
                  : 'border-slate-200 bg-white/70 hover:bg-white'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
                Active Translation 03
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
                Solar Audio Bibles for Illiterate Kiln Laborers
              </h3>
              <div className="text-xs text-slate-500">
                Oral Dramatized Audio &bull; 5,000 Units &bull; 42% Deployed
              </div>
            </button>
          </div>

          {/* Manuscript Card Detail */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-2">
                  {selectedScripture === 'urdu' && 'Scripture Translation Phase: Production & Distribution'}
                  {selectedScripture === 'punjabi' && 'Scripture Translation Phase: Field Pastoral Review'}
                  {selectedScripture === 'audio' && 'Scripture Translation Phase: Solar Device Flashing'}
                </span>
                <h2 className="font-serif text-2xl font-bold text-slate-900">
                  {selectedScripture === 'urdu' && 'Urdu Study Bible — Gospel of John Manuscript'}
                  {selectedScripture === 'punjabi' && 'Punjabi New Testament — The Epistles & Gospels'}
                  {selectedScripture === 'audio' && 'Dramatized Urdu & Punjabi Solar Scripture Player'}
                </h2>
              </div>

              <button
                onClick={() => onOpenDonate(2)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors cursor-pointer self-start md:self-auto shadow-xs"
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Sponsor This Translation</span>
              </button>
            </div>

            {/* Translation Text Preview */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 font-serif text-base sm:text-lg text-slate-800 leading-relaxed italic text-center max-w-3xl mx-auto">
                {selectedScripture === 'urdu' && (
                  <>
                    &ldquo;پھر یسوع نے ان سے کہا: مَیں دُنیا کا نُور ہُوں؛ جو کوئی میری پیروی کرے گا وہ اندھیرے میں نہ چلے گا بلکہ زِندگی کا نُور پائے گا۔&rdquo;
                    <div className="text-xs font-sans not-italic text-slate-500 mt-2 font-medium">
                      — یوحنا 8:12 (John 8:12 Nastaliq Rendering with Cross-Reference Footnotes)
                    </div>
                  </>
                )}
                {selectedScripture === 'punjabi' && (
                  <>
                    &ldquo;فیر یسوع نے فیر اوہناں نوں آکھیا، میں دنیا دا نور آں: جہڑا میرے مگر ٹرے گا اوہ ہنیرے وچ نہ چلے گا، سگوں زندگی دا نور پاوے گا۔&rdquo;
                    <div className="text-xs font-sans not-italic text-slate-500 mt-2 font-medium">
                      — یوحنا 8:12 (Vernacular Rural Punjabi Dialect for Kiln Believers)
                    </div>
                  </>
                )}
                {selectedScripture === 'audio' && (
                  <>
                    &ldquo;A dramatized oral rendition read with acoustic clarity, enabling multi-generational families to gather in the evening at the brick kilns and hear the living Word of God.&rdquo;
                    <div className="text-xs font-sans not-italic text-slate-500 mt-2 font-medium">
                      — John 8:12 Audio Master Track #08 (Recorded in Lahore Studio)
                    </div>
                  </>
                )}
              </div>

              {/* Progress & Accountability Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                <div className="space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Linguistic Integrity</div>
                  <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Cross-Checked with Textus Receptus</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Pastoral Review Committee</div>
                  <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Chaired by Rev. Azeem Tariq</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Field Unit Cost</div>
                  <div className="text-sm font-semibold text-slate-900">
                    $7 USD per complete volume delivered
                  </div>
                </div>
              </div>

              {/* Chapter Sponsorship Table */}
              <div className="pt-6 border-t border-slate-100">
                <h4 className="font-serif text-base font-bold text-slate-900 mb-3">
                  Urgent Translation Sponsorship Needs
                </h4>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-slate-900">Gospel of John — Chapters 1 to 21 (Final Print Run)</span>
                      <p className="text-slate-500 text-[11px]">Subsidizing 5,000 paperback outreach copies for literacy students.</p>
                    </div>
                    <button
                      onClick={() => onOpenDonate(2)}
                      className="px-3.5 py-1.5 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-medium cursor-pointer"
                    >
                      Sponsor ($35)
                    </button>
                  </div>

                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-slate-900">Book of Romans — Theological Footnotes in Urdu</span>
                      <p className="text-slate-500 text-[11px]">Equipping 120 rural pastors with detailed grace-oriented commentary.</p>
                    </div>
                    <button
                      onClick={() => onOpenDonate(2)}
                      className="px-3.5 py-1.5 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-medium cursor-pointer"
                    >
                      Sponsor ($50)
                    </button>
                  </div>

                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-slate-900">Solar Audio Players (Batch of 25 Units)</span>
                      <p className="text-slate-500 text-[11px]">Providing illiterate elders in Kasur brick kilns with solar Scripture listening.</p>
                    </div>
                    <button
                      onClick={() => onOpenDonate(2)}
                      className="px-3.5 py-1.5 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-medium cursor-pointer"
                    >
                      Sponsor ($125)
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
