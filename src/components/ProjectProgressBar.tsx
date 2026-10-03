import React from 'react';
import { CurrencyCode } from '../types';
import { Users, CheckCircle2, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';

interface ProjectProgressBarProps {
  raisedAmount: number;
  goalAmount: number;
  donorCount: number;
  currentCurrency: CurrencyCode;
  variant?: 'card' | 'detailed';
  showSupporters?: boolean;
  showRemaining?: boolean;
}

export const ProjectProgressBar: React.FC<ProjectProgressBarProps> = ({
  raisedAmount,
  goalAmount,
  donorCount,
  currentCurrency,
  variant = 'card',
  showSupporters = true,
  showRemaining = true
}) => {
  const percentage = Math.max(0, Math.round((raisedAmount / goalAmount) * 100));
  const visualPercentage = Math.min(100, percentage);
  const remaining = Math.max(0, goalAmount - raisedAmount);
  const isFunded = percentage >= 100;

  const formatMoney = (amount: number) => {
    const symbolMap: Record<CurrencyCode, string> = {
      USD: '$',
      GBP: '£',
      CAD: 'CA$',
      AUD: 'A$',
      EUR: '€'
    };
    return `${symbolMap[currentCurrency]}${amount.toLocaleString()}`;
  };

  if (variant === 'detailed') {
    return (
      <div className="space-y-3.5 bg-slate-50/80 p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
        {/* Top Header: Raised vs Goal & Percentage */}
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
              <span>Verified Funding Progress</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tabular-nums">
                {formatMoney(raisedAmount)}
              </span>
              <span className="text-sm text-slate-500 font-light">
                pledged of <strong className="text-slate-800 font-medium">{formatMoney(goalAmount)}</strong> goal
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tabular-nums ${
              isFunded
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : percentage >= 75
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-200/80 text-slate-800 border border-slate-300'
            }`}>
              {isFunded && <Sparkles className="w-3.5 h-3.5 text-emerald-600" />}
              <span>{percentage}% Funded</span>
            </span>
            {showRemaining && !isFunded && (
              <div className="text-[11px] text-slate-500 mt-1 font-light">
                {formatMoney(remaining)} needed to complete
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Visual Progress Bar with Shimmer & Milestones */}
        <div className="relative pt-1">
          <div 
            className="w-full bg-slate-200/80 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/90 shadow-inner relative"
            role="progressbar" 
            aria-valuenow={percentage} 
            aria-valuemin={0} 
            aria-valuemax={100}
            aria-label={`Funding progress: ${percentage}%`}
          >
            {/* 25%, 50%, 75% tick marks */}
            <div className="absolute inset-0 flex justify-between pointer-events-none px-0.5" aria-hidden="true">
              <div className="w-px h-full bg-white/40 left-1/4" />
              <div className="w-px h-full bg-white/40 left-2/4" />
              <div className="w-px h-full bg-white/40 left-3/4" />
            </div>

            {/* Dynamic Active Bar */}
            <div 
              className={`h-full rounded-full transition-all duration-1000 relative overflow-hidden ${
                isFunded 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500' 
                  : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400'
              }`}
              style={{ width: `${visualPercentage}%` }}
            >
              {/* Shimmer animation */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent w-full animate-[pulse_2.5s_infinite]" 
                aria-hidden="true" 
              />
            </div>
          </div>
        </div>

        {/* Bottom Details Strip */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200/60 gap-2">
          {showSupporters && (
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>
                <strong className="text-slate-900 font-semibold tabular-nums">{donorCount}</strong> verified donor gifts
              </span>
            </div>
          )}

          <div className="flex items-center gap-1 text-emerald-800 font-medium text-[11px] ml-auto">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>100% Direct Field Allocation Ringfence</span>
          </div>
        </div>
      </div>
    );
  }

  // Variant: 'card' (Optimized for Project Cards in Grid)
  return (
    <div className="space-y-2.5">
      {/* Top numbers row */}
      <div className="flex justify-between items-baseline text-xs sm:text-sm">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="font-serif font-bold text-slate-900 text-base sm:text-lg tabular-nums">
            {formatMoney(raisedAmount)}
          </span>
          <span className="text-xs text-slate-500 font-light">
            raised of <strong className="text-slate-700 font-medium">{formatMoney(goalAmount)}</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold tabular-nums ${
            isFunded
              ? 'bg-emerald-100 text-emerald-800'
              : percentage >= 75
              ? 'bg-amber-100 text-amber-900'
              : 'bg-slate-100 text-slate-800'
          }`}>
            {percentage}%
          </span>
        </div>
      </div>

      {/* Dynamic Visual Progress Bar */}
      <div 
        className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/80 p-0.2 relative shadow-2xs"
        role="progressbar" 
        aria-valuenow={percentage} 
        aria-valuemin={0} 
        aria-valuemax={100}
        aria-label={`Funding progress: ${percentage}%`}
      >
        <div 
          className={`h-full rounded-full transition-all duration-1000 relative overflow-hidden ${
            isFunded 
              ? 'bg-gradient-to-r from-emerald-600 to-teal-500' 
              : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400'
          }`}
          style={{ width: `${visualPercentage}%` }}
        >
          {/* Subtle light pulse line */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full opacity-60" 
            aria-hidden="true" 
          />
        </div>
      </div>

      {/* Meta Strip: Donors count and Remaining */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
        {showSupporters && (
          <div className="flex items-center gap-1 text-[11px]">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              <strong className="text-slate-800 font-semibold tabular-nums">{donorCount}</strong> supporters
            </span>
          </div>
        )}

        {showRemaining && (
          <div className="text-[11px] font-medium text-slate-600 ml-auto">
            {isFunded ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Fully Funded
              </span>
            ) : (
              <span className="text-amber-900/90 font-light">
                <strong className="font-semibold text-slate-800">{formatMoney(remaining)}</strong> remaining
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
