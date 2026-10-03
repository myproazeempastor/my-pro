import React from 'react';
import { Donation, SiteSettings } from '../types';
import { X, Printer, CheckCircle, Clock, ShieldCheck, Download } from 'lucide-react';

interface DonationReceiptModalProps {
  donation: Donation | null;
  settings: SiteSettings;
  onClose: () => void;
}

export const DonationReceiptModal: React.FC<DonationReceiptModalProps> = ({
  donation,
  settings,
  onClose
}) => {
  if (!donation) return null;

  const isConfirmed = donation.paymentStatus === 'confirmed';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-300">
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-amber-600/30 print:hidden">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Contribution Receipt</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper */}
        <div id="printable-receipt" className="p-8 sm:p-10 space-y-6 text-slate-900 font-sans bg-white relative">
          
          {/* Organization Header */}
          <div className="text-center border-b-2 border-slate-900/10 pb-6">
            <div className="font-serif font-black text-2xl tracking-tight text-slate-950 uppercase">
              {settings.orgName}
            </div>
            <div className="text-xs font-semibold text-amber-800 tracking-widest uppercase mt-0.5 font-serif">
              {settings.tagline}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 italic font-serif">
              &ldquo;{settings.scriptureVerse}&rdquo; &mdash; {settings.scriptureReference}
            </div>
            <div className="text-xs text-slate-600 mt-2">
              Founder & President: <strong>{settings.founderName}</strong> &bull; {settings.contactEmail}
            </div>
          </div>

          {/* Status Banner */}
          <div className={`p-4 rounded-xl flex items-center justify-between text-xs font-medium border ${
            isConfirmed 
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
              : 'bg-amber-50/90 text-amber-950 border-amber-200/90'
          }`}>
            <div className="flex items-center gap-2">
              {isConfirmed ? (
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              ) : (
                <Clock className="w-4 h-4 text-amber-600" />
              )}
              <span className="font-bold uppercase tracking-wider text-[11px]">
                {isConfirmed ? 'Verified Official Receipt' : 'Official Contribution Voucher & Remittance Notice'}
              </span>
            </div>
            <span className="font-mono font-bold text-sm tracking-wider tabular-nums bg-white px-2 py-0.5 rounded border border-amber-300/60 text-slate-900">
              {donation.reference}
            </span>
          </div>

          {/* Receipt Breakdown Table */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Date Issued:</span>
              <span className="font-semibold text-slate-900 tabular-nums">{donation.createdAt}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Contributor:</span>
              <span className="font-semibold text-slate-900">
                {donation.isAnonymous ? 'Anonymous Faithful Partner' : donation.donorName}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Contributor Email:</span>
              <span className="font-mono text-slate-900">{donation.donorEmail}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Designated Initiative:</span>
              <span className="font-semibold text-amber-900 text-right max-w-xs">{donation.projectTitle}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Payment Channel / Method:</span>
              <span className="font-semibold text-slate-800">
                {donation.paymentMethod.replace('_', ' ')}
              </span>
            </div>

            {donation.transactionId && (
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Transfer Reference / MTCN:</span>
                <span className="font-mono text-xs text-slate-700 font-semibold">{donation.transactionId}</span>
              </div>
            )}

            {donation.notes && (
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Gift Dedication / Memo:</span>
                <span className="italic text-slate-700 text-right max-w-xs">&ldquo;{donation.notes}&rdquo;</span>
              </div>
            )}

            {!isConfirmed && (
              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/90 text-xs text-amber-950 space-y-1.5 shadow-2xs">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Manual Remittance Guidance</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-700">
                  Please quote your contribution voucher reference <strong className="font-mono text-amber-900 bg-white border border-amber-200 px-1.5 py-0.5 rounded font-bold">{donation.reference}</strong> when completing your transfer via <strong>{donation.paymentMethod}</strong>. Once sent, our field finance office matches your record with prayerful confirmation.
                </p>
              </div>
            )}

            {/* Total Highlight */}
            <div className="flex justify-between items-baseline pt-4 pb-2 border-t-2 border-slate-900">
              <span className="text-base font-bold text-slate-900 uppercase tracking-tight">
                Contribution Total:
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-black text-amber-900 tabular-nums">
                {donation.currency} {donation.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Legal and Pastoral Signature Notice */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-4 items-end text-xs text-slate-600">
            <div>
              <p className="leading-snug text-[11px]">
                Thank you for ministering alongside Agape Light Network. Your donation is received with prayerful stewardship in accordance with our designated giving charter.
              </p>
            </div>
            <div className="text-right">
              <div className="font-serif italic text-sm text-slate-900 font-bold">
                {settings.founderName}
              </div>
              <div className="text-[10px] uppercase text-slate-500">
                {settings.founderTitle}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
