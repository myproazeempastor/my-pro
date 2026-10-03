import React, { useState } from 'react';
import { Project, CurrencyCode, Donation, SiteSettings, ManualPaymentMethod } from '../types';
import { Heart, ShieldCheck, Building2, AlertCircle, CheckCircle2, Lock, ArrowRight, Check, Copy, Landmark } from 'lucide-react';

interface DonatePageProps {
  projects: Project[];
  settings: SiteSettings;
  currentCurrency: CurrencyCode;
  onDonationComplete: (donation: Donation) => void;
}

export const DonatePage: React.FC<DonatePageProps> = ({
  projects,
  settings,
  currentCurrency: initialCurrency,
  onDonationComplete
}) => {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [projectId, setProjectId] = useState<number | null>(null);
  const [currency, setCurrency] = useState<CurrencyCode>(initialCurrency);
  const [amount, setAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  // Donor Details
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorCountry, setDonorCountry] = useState<string>('United States');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');

  // Dynamic Manual Payment Methods
  const activeMethods = (settings.paymentMethods && settings.paymentMethods.length > 0)
    ? settings.paymentMethods.filter(m => m.enabled).sort((a, b) => a.order - b.order)
    : [];

  const availableMethods = activeMethods.length > 0
    ? activeMethods
    : (settings.paymentMethods || []);

  const [selectedMethodId, setSelectedMethodId] = useState<string>(availableMethods[0]?.id || 'western-union');
  const [donorReferenceNote, setDonorReferenceNote] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const selectedMethod = availableMethods.find(m => m.id === selectedMethodId) || availableMethods[0];

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const presetAmounts = [25, 50, 100, 250, 500, 1000];
  const currencySymbols: Record<CurrencyCode, string> = {
    USD: '$',
    GBP: '£',
    CAD: 'CA$',
    AUD: 'A$',
    EUR: '€'
  };

  const handleSelectPreset = (val: number) => {
    setAmount(val);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    setIsCustom(true);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!donorName.trim()) {
      setError('Please provide your full legal or church name for the receipt.');
      return;
    }
    if (!donorEmail.trim() || !donorEmail.includes('@')) {
      setError('Please provide a valid email address to receive your official contribution receipt.');
      return;
    }
    if (amount <= 0) {
      setError('Please specify a valid contribution amount.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const reference = `ALN-2026-${randomSuffix}`;

      const selectedProj = projects.find(p => p.id === projectId);
      const projectTitle = selectedProj ? selectedProj.title : 'General Mission Fund (Where Needed Most)';
      const methodName = selectedMethod ? selectedMethod.name : 'Manual Payment';

      let combinedNotes = notes.trim();
      if (frequency === 'monthly') {
        combinedNotes = `[Monthly Supporter Pledge] ${combinedNotes}`.trim();
      }
      if (donorReferenceNote.trim()) {
        combinedNotes = combinedNotes 
          ? `${combinedNotes} [Manual Transfer Ref / MTCN: ${donorReferenceNote.trim()}]`
          : `[Manual Transfer Ref / MTCN: ${donorReferenceNote.trim()}]`;
      }

      const newDonation: Donation = {
        id: Date.now(),
        reference,
        donorName: donorName.trim(),
        donorEmail: donorEmail.trim(),
        donorCountry,
        amount,
        currency,
        projectId,
        projectTitle,
        paymentMethod: methodName,
        paymentStatus: 'pending',
        transactionId: donorReferenceNote.trim() ? donorReferenceNote.trim() : `MANUAL-${randomSuffix}`,
        isAnonymous,
        notes: combinedNotes || undefined,
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };

      onDonationComplete(newDonation);
    }, 700);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Dignified Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-24 lg:py-28 border-b border-slate-800 text-center relative overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none opacity-30" 
          style={{ 
            background: 'radial-gradient(circle 800px at 50% 10%, rgba(184, 116, 34, 0.15), transparent 70%)' 
          }} 
          aria-hidden="true" 
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ring-4 ring-amber-400/20" aria-hidden="true" />
            <span>International Mission Stewardship</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Support Agape Light Network
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            100% of designated gifts go directly to verified clean water wells, vernacular Bible printing, and monthly widow sustenance.
          </p>
        </div>
      </section>

      {/* 2. Structured Giving Form Container */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-12 shadow-xl space-y-8">
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-7">
              
              {/* Frequency Toggle (European Standard) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Contribution Frequency
                </label>
                <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100/90 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    className={`py-2.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                      frequency === 'one-time'
                        ? 'bg-white text-slate-900 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    One-Time Gift
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-2.5 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      frequency === 'monthly'
                        ? 'bg-white text-slate-900 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>Monthly Supporter</span>
                    <span className="text-[10px] text-amber-700 uppercase font-bold tracking-wider">✦ Sustained</span>
                  </button>
                </div>
              </div>

              {/* Project Designation */}
              <div>
                <label htmlFor="donate-program-select" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Program Designation
                </label>
                <select
                  id="donate-program-select"
                  value={projectId || ''}
                  onChange={e => setProjectId(e.target.value ? Number(e.target.value) : null)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white text-slate-900 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-hidden"
                >
                  <option value="">General Mission Fund (Where Most Needed)</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} &mdash; {p.location}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1.5 font-light">
                  100% of designated contributions are ringfenced exclusively for the selected initiative.
                </p>
              </div>

              {/* Currency & Preset Amount Selection */}
              <div>
                <div className="flex flex-wrap justify-between items-center gap-2 mb-2.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Contribution Amount
                  </label>

                  {/* Currency Pills */}
                  <div className="flex gap-1 text-xs">
                    {(['USD', 'GBP', 'EUR', 'CAD', 'AUD'] as CurrencyCode[]).map(c => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setCurrency(c)}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                          currency === c ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {presetAmounts.map(preset => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => handleSelectPreset(preset)}
                      className={`py-3.5 rounded-xl text-base font-bold border transition-all cursor-pointer tabular-nums ${
                        !isCustom && amount === preset
                          ? 'border-amber-600 bg-amber-50 text-amber-950 shadow-xs ring-2 ring-amber-500/20'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {currencySymbols[currency]}{preset}
                    </button>
                  ))}
                </div>

                <div className="mt-3 relative">
                  <span className="absolute left-4 top-3 text-slate-400 text-base font-bold">
                    {currencySymbols[currency]}
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    placeholder="Or enter a custom amount"
                    value={customAmount}
                    onChange={handleCustomChange}
                    className="w-full pl-9 pr-4 py-3 text-sm rounded-xl border border-slate-300 text-slate-900 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-hidden tabular-nums font-semibold"
                  />
                </div>
              </div>

              {/* Donor Contact & Tax Receipt Information */}
              <div className="pt-5 border-t border-slate-100 space-y-4">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Donor Contact Information
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="donor-name" className="block text-xs font-medium text-slate-600 mb-1">
                      Full Legal / Church Name <span className="text-amber-700">*</span>
                    </label>
                    <input
                      id="donor-name"
                      type="text"
                      required
                      value={donorName}
                      onChange={e => setDonorName(e.target.value)}
                      placeholder="e.g. David & Sarah Jenkins"
                      className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl text-slate-900 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="donor-email" className="block text-xs font-medium text-slate-600 mb-1">
                      Email Address (For Serial Receipt) <span className="text-amber-700">*</span>
                    </label>
                    <input
                      id="donor-email"
                      type="email"
                      required
                      value={donorEmail}
                      onChange={e => setDonorEmail(e.target.value)}
                      placeholder="donor@example.org"
                      className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl text-slate-900 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="donor-country" className="block text-xs font-medium text-slate-600 mb-1">
                      Country of Residence
                    </label>
                    <select
                      id="donor-country"
                      value={donorCountry}
                      onChange={e => setDonorCountry(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl bg-white text-slate-900 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-hidden"
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Other International">Other International</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="donor-notes" className="block text-xs font-medium text-slate-600 mb-1">
                      Memorial Note / Dedication (Optional)
                    </label>
                    <input
                      id="donor-notes"
                      type="text"
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="In honor of / memorial prayer..."
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg text-slate-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="donor-anonymous"
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={e => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <label htmlFor="donor-anonymous" className="text-xs text-slate-600 font-light cursor-pointer">
                    Keep my identity anonymous on public impact reports
                  </label>
                </div>
              </div>

              {/* Dynamic Manual Payment Method Selection */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Select Manual Payment Method
                  </label>
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    Offline / Manual Giving Only
                  </span>
                </div>

                {/* Method selector buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {availableMethods.map((method) => {
                    const isSelected = selectedMethod?.id === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethodId(method.id)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50/90 text-amber-950 shadow-xs ring-2 ring-amber-500/30'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-xs font-bold ${isSelected ? 'text-amber-950 font-bold' : 'text-slate-900'}`}>
                            {method.name}
                          </span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-amber-600 shrink-0" />
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 font-light truncate">
                          {method.bankName || (method.recipientDetails ? 'Authorized Agent' : 'Manual Wire/Transfer')}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Method Details & Instructions Card */}
                {selectedMethod && (
                  <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                          <Landmark className="w-4 h-4" />
                        </div>
                        <span className="font-serif font-bold text-slate-900 text-sm sm:text-base">
                          {selectedMethod.name} Transfer Instructions & Details
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                        Method #{selectedMethod.order}
                      </span>
                    </div>

                    {/* Instructions */}
                    {selectedMethod.instructions && (
                      <div className="text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs whitespace-pre-line">
                        <strong className="text-slate-900 block mb-1.5 text-xs">Payment Instructions:</strong>
                        {selectedMethod.instructions}
                      </div>
                    )}

                    {/* Recipient Coordinates (e.g. for Western Union or MoneyGram) */}
                    {selectedMethod.recipientDetails && (
                      <div className="bg-white p-4 rounded-xl border border-slate-200/90 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">
                            Authorized Ministry Recipient Coordinates:
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(selectedMethod.recipientDetails || '', 'recipient')}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 cursor-pointer bg-amber-50 px-2 py-1 rounded-md border border-amber-200/80 transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{copiedKey === 'recipient' ? 'Copied!' : 'Copy Recipient Details'}</span>
                          </button>
                        </div>
                        <div className="font-mono text-slate-800 whitespace-pre-line bg-slate-50 p-3 rounded-lg border border-slate-200/80 text-xs">
                          {selectedMethod.recipientDetails}
                        </div>
                      </div>
                    )}

                    {/* Bank Coordinates Grid (if bank details configured) */}
                    {(selectedMethod.bankName || selectedMethod.accountTitle || selectedMethod.accountNumber || selectedMethod.iban || selectedMethod.swiftBic || selectedMethod.branchInfo) && (
                      <div className="bg-white p-4 rounded-xl border border-slate-200/90 space-y-3">
                        <span className="font-bold text-slate-900 block text-xs">
                          Bank Wire / Remittance Coordinates:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {selectedMethod.bankName && (
                            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Bank Name</span>
                              <span className="font-semibold text-slate-900 text-xs">{selectedMethod.bankName}</span>
                            </div>
                          )}
                          {selectedMethod.accountTitle && (
                            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Account Title</span>
                              <span className="font-semibold text-slate-900 text-xs">{selectedMethod.accountTitle}</span>
                            </div>
                          )}
                          {selectedMethod.accountNumber && (
                            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60 flex items-center justify-between">
                              <div>
                                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Account Number</span>
                                <span className="font-mono font-bold text-slate-900 text-xs">{selectedMethod.accountNumber}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCopy(selectedMethod.accountNumber || '', 'acct')}
                                className="p-1.5 text-slate-500 hover:text-amber-800 cursor-pointer"
                                title="Copy Account Number"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                          {selectedMethod.iban && (
                            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60 flex items-center justify-between">
                              <div>
                                <span className="text-[10px] text-slate-500 uppercase block font-semibold">IBAN</span>
                                <span className="font-mono font-bold text-slate-900 text-xs">{selectedMethod.iban}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCopy(selectedMethod.iban || '', 'iban')}
                                className="p-1.5 text-slate-500 hover:text-amber-800 cursor-pointer"
                                title="Copy IBAN"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                          {selectedMethod.swiftBic && (
                            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60 flex items-center justify-between">
                              <div>
                                <span className="text-[10px] text-slate-500 uppercase block font-semibold">SWIFT / BIC</span>
                                <span className="font-mono font-bold text-slate-900 text-xs">{selectedMethod.swiftBic}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCopy(selectedMethod.swiftBic || '', 'swift')}
                                className="p-1.5 text-slate-500 hover:text-amber-800 cursor-pointer"
                                title="Copy SWIFT"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                          {selectedMethod.branchInfo && (
                            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Branch</span>
                              <span className="text-slate-800 text-xs">{selectedMethod.branchInfo}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Additional Details */}
                    {selectedMethod.additionalDetails && (
                      <div className="text-xs text-slate-600 bg-amber-50/80 p-3 rounded-xl border border-amber-200/80">
                        <strong className="text-slate-900">Remittance Note:</strong> {selectedMethod.additionalDetails}
                      </div>
                    )}

                    {/* Donor Reference / MTCN Input */}
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Your MTCN / Bank Transfer Reference / Narration (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. MTCN: 123-456-7890 or your online banking confirmation reference"
                        value={donorReferenceNote}
                        onChange={(e) => setDonorReferenceNote(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-mono"
                      />
                      <span className="text-[11px] text-slate-500 mt-1.5 block">
                        If you have already executed your transfer, enter your transaction reference above. Otherwise, submitting will issue your printable serial voucher with instructions to quote your reference number with your bank or agent.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-base transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 focus-visible:outline-2 focus-visible:outline-amber-500"
                >
                  <Heart className="w-5 h-5 fill-white/20" />
                  <span>
                    {isSubmitting 
                      ? 'Processing Secure Contribution...' 
                      : `Confirm ${frequency === 'monthly' ? 'Monthly' : ''} Gift of ${currencySymbols[currency]}${amount.toLocaleString()}`}
                  </span>
                </button>
              </div>

              {/* Security & Integrity Footnote */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2 font-light">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>256-bit TLS Encrypted &bull; Fiduciary Ringfenced Audit &bull; Instant Serial Receipt</span>
              </div>

            </form>

          </div>
        </div>
      </section>
    </div>
  );
};
