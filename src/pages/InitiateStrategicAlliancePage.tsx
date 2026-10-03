import React, { useState } from 'react';
import { SiteSettings } from '../types';
import { Building2, ShieldCheck, Mail, Send, CheckCircle2, ArrowRight } from 'lucide-react';

interface InitiateStrategicAlliancePageProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
}

export const InitiateStrategicAlliancePage: React.FC<InitiateStrategicAlliancePageProps> = ({
  settings,
  onNavigate
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [allianceScope, setAllianceScope] = useState('Church Debt Rescue Partnership');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Kingdom Builders & Church Leadership Liaison</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Initiate Strategic Alliance
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            A formal partnership portal for Senior Pastors, Bishops, Mission Boards, and Christian Philanthropic Trusts seeking high-level covenants with Agape Light Network in Pakistan.
          </p>
        </div>
      </section>

      {/* Alliance Protocol Overview & Form */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Information Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>

                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Institutional Covenant Standards
                </h3>

                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Agape Light Network welcomes alliances with churches and ministries worldwide who share our uncompromised theology and desire to liberate enslaved believers.
                </p>

                <div className="space-y-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Direct executive communication with Rev. Azeem Tariq</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Quarterly audited ledger and legal stamp paper documentation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Named dedication plaques on community water boreholes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Exclusive video prayer briefings for church leadership boards</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white p-7 sm:p-9 rounded-xl border border-slate-200 shadow-xs">
                {submitted ? (
                  <div className="text-center py-10 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Alliance Protocol Received
                    </h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto font-light leading-relaxed">
                      Thank you, {name}. Your inquiry has been routed directly to the executive office of Rev. Azeem Tariq. We will arrange a personal video or telephone consultation within 24 to 48 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Full Name <span className="text-amber-700">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="e.g. Bishop Thomas Wright"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Pastoral / Leadership Title
                        </label>
                        <input
                          type="text"
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                          placeholder="e.g. Senior Pastor / Missions Director"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Church or Ministry Organization <span className="text-amber-700">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={organization}
                          onChange={e => setOrganization(e.target.value)}
                          placeholder="e.g. Grace Fellowship Church"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Official Email Address <span className="text-amber-700">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="pastor@church.org"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Alliance Objective
                      </label>
                      <select
                        value={allianceScope}
                        onChange={e => setAllianceScope(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-hidden bg-white"
                      >
                        <option value="Church Debt Rescue Partnership">Congregational Direct Debt Rescue Adoption ($500/family)</option>
                        <option value="Village Well Dedication">Complete Village Deep Well Sponsorship ($15,000)</option>
                        <option value="Bible Translation Sponsorship">Vernacular Scripture Print Run ($3,500+)</option>
                        <option value="Crusade & Evangelism Co-Labor">Healing Crusade Sponsorship ($1,500)</option>
                        <option value="Foundation Grant Inquiry">Foundation Grant or Formal Trust Partnership</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Partnership Message & Intentions
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Please convey your congregation's vision, board approval timeline, or questions for Rev. Azeem Tariq..."
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-hidden resize-y"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>Transmit Alliance Protocol</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
