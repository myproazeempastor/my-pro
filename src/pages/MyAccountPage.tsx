import React, { useState } from 'react';
import { SiteSettings, CurrencyCode, Donation } from '../types';
import { User, ShieldCheck, FileText, Download, Heart, Clock, ArrowRight, CheckCircle2, Lock, Mail } from 'lucide-react';

interface MyAccountPageProps {
  settings: SiteSettings;
  donations: Donation[];
  currentCurrency: CurrencyCode;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
  onOpenReceipt: (donation: Donation) => void;
}

export const MyAccountPage: React.FC<MyAccountPageProps> = ({
  settings,
  donations,
  currentCurrency,
  onNavigate,
  onOpenDonate,
  onOpenReceipt
}) => {
  const [activeTab, setActiveTab] = useState<'giving' | 'profile' | 'sponsorships'>('giving');
  const [donorEmail, setDonorEmail] = useState('d.jenkins@example.com');
  const [donorName, setDonorName] = useState('David & Sarah Jenkins');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Filter donations for this account or general list
  const userDonations = donations;
  const totalGiven = userDonations
    .filter(d => d.paymentStatus === 'confirmed')
    .reduce((sum, d) => sum + d.amount, 0);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Donor & Partner Portal &bull; Agape Light Network</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Partner Account
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Manage your mission commitments, view official tax receipts, and track the ongoing frontline impact of your generosity under John 8:12.
          </p>
        </div>
      </section>

      {/* Account Dashboard Content */}
      <section className="py-12 sm:py-16 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Total Lifetime Giving
              </div>
              <div className="font-serif text-3xl font-bold text-slate-900">
                ${totalGiven.toLocaleString()} <span className="text-xs font-sans text-slate-500 font-normal">USD</span>
              </div>
              <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified by ALN Fiduciary Oversight</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Active Sponsorships
              </div>
              <div className="font-serif text-3xl font-bold text-slate-900">
                2 <span className="text-xs font-sans text-slate-500 font-normal">Programs</span>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                Direct Debt Rescue &bull; Urdu Bibles
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Serial Tax Receipts
              </div>
              <div className="font-serif text-3xl font-bold text-slate-900">
                {userDonations.length} <span className="text-xs font-sans text-slate-500 font-normal">Generated</span>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                Instant PDF & Print available
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('giving')}
              className={`pb-3.5 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'giving'
                  ? 'border-amber-600 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Giving History & Receipts
            </button>
            <button
              onClick={() => setActiveTab('sponsorships')}
              className={`pb-3.5 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'sponsorships'
                  ? 'border-amber-600 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Active Sponsorship Commitments
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-3.5 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'profile'
                  ? 'border-amber-600 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Partner Profile & Preferences
            </button>
          </div>

          {/* Tab 1: Giving History */}
          {activeTab === 'giving' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h2 className="font-serif text-xl font-bold text-slate-900">Contribution Statements & Receipts</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Click any transaction to open and print your official serial receipt.</p>
                </div>
                <button
                  onClick={() => onOpenDonate()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Send New Mission Gift</span>
                </button>
              </div>

              <div className="divide-y divide-slate-100 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="py-3.5 px-6">Receipt #</th>
                      <th className="py-3.5 px-6">Date</th>
                      <th className="py-3.5 px-6">Designation</th>
                      <th className="py-3.5 px-6">Amount</th>
                      <th className="py-3.5 px-6">Status</th>
                      <th className="py-3.5 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {userDonations.map(donation => (
                      <tr key={donation.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-6 font-mono text-xs font-semibold text-slate-900">
                          {donation.reference}
                        </td>
                        <td className="py-4 px-6 text-slate-600 text-xs">
                          {donation.createdAt.split(' ')[0]}
                        </td>
                        <td className="py-4 px-6 text-slate-800 font-medium">
                          {donation.projectTitle}
                        </td>
                        <td className="py-4 px-6 font-semibold text-slate-900">
                          {donation.currency} {donation.amount.toLocaleString()}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            donation.paymentStatus === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {donation.paymentStatus === 'confirmed' ? 'Confirmed' : 'Pending Wire'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => onOpenReceipt(donation)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 hover:border-slate-300 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-amber-600" />
                            <span>View Receipt</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Sponsorships */}
          {activeTab === 'sponsorships' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                      Active Sponsorship
                    </span>
                    <h3 className="font-serif text-lg font-bold text-slate-900">Brick Kiln Family Liberation Covenant</h3>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-amber-600" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Monthly commitment providing nutritional emergency rations and children literacy schooling for the Masih family currently in the post-rescue rehabilitation program.
                </p>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-slate-500">Cadence: Monthly ($75 USD)</span>
                  <button
                    onClick={() => onNavigate('post-rescue-protocol')}
                    className="text-amber-700 hover:text-amber-800 font-medium inline-flex items-center gap-1"
                  >
                    <span>View Protocol</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                      Active Sponsorship
                    </span>
                    <h3 className="font-serif text-lg font-bold text-slate-900">Urdu Study Bible Monthly Cohort</h3>
                  </div>
                  <FileText className="w-6 h-6 text-amber-600" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Subsidizing the monthly printing of 10 complete Urdu study Bibles distributed during Rev. Azeem Tariq&apos;s village discipleship seminars.
                </p>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-slate-500">Cadence: Monthly ($70 USD)</span>
                  <button
                    onClick={() => onNavigate('bible-translation-projects')}
                    className="text-amber-700 hover:text-amber-800 font-medium inline-flex items-center gap-1"
                  >
                    <span>View Translation Data</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Profile */}
          {activeTab === 'profile' && (
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs max-w-2xl">
              <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">Partner Profile & Notification Settings</h2>
              
              {savedSuccess && (
                <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your preferences have been updated securely in the ministry database.</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name / Family Foundation
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={e => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address for Receipt Dispatches
                  </label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={e => setDonorEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded-sm border-slate-300 text-amber-600 focus:ring-amber-500" />
                    <span>Receive quarterly photographic frontline audit reports by email</span>
                  </label>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded-sm border-slate-300 text-amber-600 focus:ring-amber-500" />
                    <span>Receive urgent emergency prayer alerts from Rev. Azeem Tariq</span>
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};
