import React, { useState } from 'react';
import { Project, CurrencyCode, Donation, SiteSettings, ManualPaymentMethod } from '../types';
import { X, Heart, ShieldCheck, Building2, AlertCircle, Check, Copy, Landmark } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  projects: Project[];
  selectedProjectId: number | null;
  currentCurrency: CurrencyCode;
  settings: SiteSettings;
  onClose: () => void;
  onDonationComplete: (donation: Donation) => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  projects,
  selectedProjectId,
  currentCurrency: initialCurrency,
  settings,
  onClose,
  onDonationComplete
}) => {
  const [projectId, setProjectId] = useState<number | null>(selectedProjectId);
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

  if (!isOpen) return null;

  const presetAmounts = [25, 50, 100, 250, 500, 1000];

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
      setError('Please provide your name (or check "Keep my donation anonymous" for public listing).');
      return;
    }
    if (!donorEmail.trim() || !donorEmail.includes('@')) {
      setError('Please provide a valid email address for receipt delivery.');
      return;
    }
    if (amount <= 0) {
      setError('Please enter a valid donation amount.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // Generate verifiable reference
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const reference = `ALN-2026-${randomSuffix}`;

      const selectedProj = projects.find(p => p.id === projectId);
      const projectTitle = selectedProj ? selectedProj.title : 'General Fund (Where Needed Most)';

      // Combine dedication note with optional transfer tracking or MTCN reference
      let fullNotes = notes.trim();
      if (donorReferenceNote.trim()) {
        fullNotes = fullNotes 
          ? `${fullNotes} [Donor Transfer Ref / MTCN: ${donorReferenceNote.trim()}]`
          : `[Donor Transfer Ref / MTCN: ${donorReferenceNote.trim()}]`;
      }

      const methodName = selectedMethod ? selectedMethod.name : 'Manual Payment';

      // All manual offline gifts are recorded as pending verification until matched by finance
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
        notes: fullNotes || undefined,
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };

      onDonationComplete(newDonation);
      onClose();
    }, 800);
  };

  const currencySymbols: Record<CurrencyCode, string> = {
    USD: '$',
    GBP: '£',
    CAD: 'CA$',
    AUD: 'A$',
    EUR: '€'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 text-white p-5 px-6 flex items-center justify-between border-b border-amber-600/30 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Heart className="w-5 h-5 fill-amber-400/40" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white leading-tight">
                Make a Loving Gift
              </h3>
              <p className="text-xs text-amber-300/90 font-serif">
                Agape Light Network &bull; Rev. Azeem Tariq
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* 1. Project Designation */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Designate Your Gift
            </label>
            <select
              value={projectId || ''}
              onChange={(e) => setProjectId(e.target.value ? Number(e.target.value) : null)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white"
            >
              <option value="">General Fund — Where Needed Most (Recommended)</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.location})
                </option>
              ))}
            </select>
          </div>

          {/* 2. Amount and Currency */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Amount
              </label>
              <div className="flex items-center gap-1 text-xs">
                <span className="text-slate-500 mr-1">Currency:</span>
                {(['USD', 'GBP', 'CAD', 'AUD', 'EUR'] as CurrencyCode[]).map(c => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2 py-0.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      currency === c ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {presetAmounts.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => handleSelectPreset(preset)}
                  className={`py-3 px-2 rounded-xl text-sm font-bold border transition-all cursor-pointer tabular-nums ${
                    !isCustom && amount === preset
                      ? 'border-amber-600 bg-amber-50 text-amber-950 shadow-xs ring-2 ring-amber-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {currencySymbols[currency]}{preset}
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div className="mt-3 relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm font-bold">
                {currencySymbols[currency]}
              </span>
              <input
                type="number"
                min="1"
                step="any"
                placeholder="Or enter custom amount"
                value={customAmount}
                onChange={handleCustomChange}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 tabular-nums font-semibold"
              />
            </div>
          </div>

          {/* 3. Donor Information */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Donor Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. John & Mary Smith"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="For official receipt"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Country</label>
                <select
                  value={donorCountry}
                  onChange={(e) => setDonorCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 focus:outline-hidden"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Other International">Other International</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Gift Dedication / Notes (Optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. In loving memory of..."
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 focus:outline-hidden"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded border-slate-300"
              />
              <span className="text-xs text-slate-600">
                Keep my name anonymous on the public supporters list
              </span>
            </label>
          </div>

          {/* 4. Dynamic Manual Payment Method Selection */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Select Manual Payment Method
              </label>
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                Manual / Offline Channels Only
              </span>
            </div>

            {/* Methods Selection Tabs/Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {availableMethods.map((method) => {
                const isSelected = selectedMethod?.id === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedMethodId(method.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/90 text-amber-950 shadow-xs ring-2 ring-amber-500/30'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold ${isSelected ? 'text-amber-950 font-bold' : 'text-slate-800'}`}>
                        {method.name}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {method.bankName || (method.recipientDetails ? 'Authorized Agent' : 'Manual Wire/Transfer')}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Instructions & Account/Recipient Panel for Selected Method */}
            {selectedMethod && (
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3.5 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-amber-600" />
                    <span className="font-serif font-bold text-slate-900 text-sm">
                      {selectedMethod.name} Transfer Instructions & Coordinates
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Channel #{selectedMethod.order}
                  </span>
                </div>

                {/* Instructions */}
                {selectedMethod.instructions && (
                  <div className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs whitespace-pre-line">
                    <strong className="text-slate-900 block mb-1">Payment Instructions:</strong>
                    {selectedMethod.instructions}
                  </div>
                )}

                {/* Recipient Details (e.g. for Western Union / MoneyGram) */}
                {selectedMethod.recipientDetails && (
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        Authorized Ministry Recipient / Payee Details:
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(selectedMethod.recipientDetails || '', 'recipient')}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 hover:text-amber-800 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedKey === 'recipient' ? 'Copied!' : 'Copy Recipient Details'}</span>
                      </button>
                    </div>
                    <div className="font-mono text-xs text-slate-800 whitespace-pre-line bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                      {selectedMethod.recipientDetails}
                    </div>
                  </div>
                )}

                {/* Bank Coordinates Grid (if bank details configured) */}
                {(selectedMethod.bankName || selectedMethod.accountTitle || selectedMethod.accountNumber || selectedMethod.iban || selectedMethod.swiftBic || selectedMethod.branchInfo) && (
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2.5">
                    <span className="text-xs font-bold text-slate-900 block">
                      Bank Account Coordinates:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      {selectedMethod.bankName && (
                        <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Bank Name</span>
                          <span className="font-semibold text-slate-900">{selectedMethod.bankName}</span>
                        </div>
                      )}
                      {selectedMethod.accountTitle && (
                        <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Account Title</span>
                          <span className="font-semibold text-slate-900">{selectedMethod.accountTitle}</span>
                        </div>
                      )}
                      {selectedMethod.accountNumber && (
                        <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Account Number</span>
                            <span className="font-mono font-bold text-slate-900">{selectedMethod.accountNumber}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(selectedMethod.accountNumber || '', 'acct')}
                            className="p-1 text-slate-500 hover:text-amber-700 cursor-pointer"
                            title="Copy Account Number"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                      {selectedMethod.iban && (
                        <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase block font-semibold">IBAN</span>
                            <span className="font-mono font-bold text-slate-900 text-[11px]">{selectedMethod.iban}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(selectedMethod.iban || '', 'iban')}
                            className="p-1 text-slate-500 hover:text-amber-700 cursor-pointer"
                            title="Copy IBAN"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                      {selectedMethod.swiftBic && (
                        <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase block font-semibold">SWIFT / BIC</span>
                            <span className="font-mono font-bold text-slate-900">{selectedMethod.swiftBic}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(selectedMethod.swiftBic || '', 'swift')}
                            className="p-1 text-slate-500 hover:text-amber-700 cursor-pointer"
                            title="Copy SWIFT"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                      {selectedMethod.branchInfo && (
                        <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Branch</span>
                          <span className="text-slate-800 text-[11px]">{selectedMethod.branchInfo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Details */}
                {selectedMethod.additionalDetails && (
                  <div className="text-[11px] text-slate-600 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/80">
                    <strong>Note:</strong> {selectedMethod.additionalDetails}
                  </div>
                )}

                {/* Donor MTCN / Wire Reference optional input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your MTCN / Bank Transfer Reference / Narration (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MTCN: 123-456-7890 or Wire Ref from your bank receipt"
                    value={donorReferenceNote}
                    onChange={(e) => setDonorReferenceNote(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    If you haven&rsquo;t transferred yet, you can leave this blank. You will receive an official contribution voucher upon submission to quote with your bank or agent.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Generating Contribution Voucher...</span>
              ) : (
                <>
                  <Heart className="w-5 h-5 fill-white/20" />
                  <span>
                    Submit Manual Donation Voucher ({currencySymbols[currency]}{amount.toLocaleString()} {currency})
                  </span>
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-slate-500 mt-2">
              Agape Light Network &bull; Grounded in John 8:12 &bull; Direct field accountability
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};
