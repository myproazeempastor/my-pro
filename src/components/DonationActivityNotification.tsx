import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Donation, DonationActivityConfig, CurrencyCode } from '../types';
import { Heart, X, ShieldCheck, MapPin, ExternalLink, Sparkles } from 'lucide-react';

interface DonationActivityNotificationProps {
  donations: Donation[];
  config?: DonationActivityConfig;
  onOpenDonate?: (projectId?: number) => void;
}

const DEFAULT_CONFIG: DonationActivityConfig = {
  enabled: true,
  maxPerSession: 4,
  displayDurationSeconds: 6,
  delayBetweenSeconds: 12,
  initialDelaySeconds: 4,
  privacyMode: 'name_when_allowed',
  showAmount: true,
  showCountry: true,
  showProject: true,
  includePending: true,
  demoMode: false
};

const SESSION_STORAGE_KEY_SHOWN = 'aln_activity_shown_ids_v1';
const SESSION_STORAGE_KEY_COUNT = 'aln_activity_session_count_v1';

export const DonationActivityNotification: React.FC<DonationActivityNotificationProps> = ({
  donations,
  config = DEFAULT_CONFIG,
  onOpenDonate
}) => {
  const [currentDonation, setCurrentDonation] = useState<Donation | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // In-session tracking
  const [sessionCount, setSessionCount] = useState<number>(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY_COUNT);
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [shownIds, setShownIds] = useState<Set<number>>(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY_SHOWN);
      return stored ? new Set(JSON.parse(stored)) : new Set<number>();
    } catch {
      return new Set<number>();
    }
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dismissTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync session storage
  const updateShownState = (id: number) => {
    setShownIds(prev => {
      const next = new Set(prev).add(id);
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY_SHOWN, JSON.stringify(Array.from(next)));
      } catch (e) {
        // Ignore storage errors in private mode
      }
      return next;
    });

    setSessionCount(prev => {
      const next = prev + 1;
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY_COUNT, next.toString());
      } catch (e) {
        // Ignore storage errors
      }
      return next;
    });
  };

  // Filter valid real database donation records
  const eligibleDonations = useMemo(() => {
    return donations.filter(d => {
      // Must not be explicitly blocked by Admin
      if (d.allowPublicActivity === false) return false;

      // DEMO data handling: Only include demo records if demoMode is explicitly true
      if (d.isDemo && !config.demoMode) return false;

      // Real status check: Include confirmed, or pending if config allows
      if (d.paymentStatus !== 'confirmed') {
        if (!config.includePending) return false;
        if (d.paymentStatus !== 'pending') return false;
      }

      return true;
    });
  }, [donations, config.demoMode, config.includePending]);

  // Main rotation effect
  useEffect(() => {
    if (!config.enabled) {
      setIsVisible(false);
      return;
    }

    if (sessionCount >= config.maxPerSession) {
      setIsVisible(false);
      return;
    }

    if (eligibleDonations.length === 0) {
      // Anti-fabrication rule: Do not invent fake activity when there are no real donations
      setIsVisible(false);
      return;
    }

    // Schedule next notification check
    const scheduleNext = (delayMs: number) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        // Pick next donation
        // 1. First look for an eligible donation not yet shown in this session
        const unshown = eligibleDonations.filter(d => !shownIds.has(d.id));

        let candidate: Donation | null = null;
        if (unshown.length > 0) {
          candidate = unshown[0];
        } else if (eligibleDonations.length > 0) {
          // If all have been shown but maxPerSession has not been reached, rotate from beginning
          // but ensure it's not the same as current
          const diff = eligibleDonations.filter(d => d.id !== currentDonation?.id);
          candidate = diff.length > 0 ? diff[0] : eligibleDonations[0];
        }

        if (candidate) {
          setCurrentDonation(candidate);
          setIsVisible(true);
          updateShownState(candidate.id);

          // Auto dismissal timer
          if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
          dismissTimerRef.current = setTimeout(() => {
            setIsVisible(false);
            // After hiding, schedule next check
            scheduleNext(config.delayBetweenSeconds * 1000);
          }, config.displayDurationSeconds * 1000);
        }
      }, delayMs);
    };

    // Initial trigger
    const initialDelay = config.initialDelaySeconds * 1000;
    scheduleNext(initialDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    };
  }, [
    config.enabled,
    config.maxPerSession,
    config.delayBetweenSeconds,
    config.displayDurationSeconds,
    config.initialDelaySeconds,
    eligibleDonations,
    sessionCount
  ]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    // Schedule next after regular delay
    timerRef.current = setTimeout(() => {
      // Allow next check
      setSessionCount(prev => prev); // trigger
    }, config.delayBetweenSeconds * 1000);
  };

  if (!config.enabled || !isVisible || !currentDonation) {
    return null;
  }

  // Format donor title & privacy
  const formatDonorName = () => {
    const country = currentDonation.donorCountry;
    const hasCountry = config.showCountry && country && country.trim().length > 0;

    // 1. If donor requested anonymity:
    if (currentDonation.isAnonymous) {
      return hasCountry ? `A donor from ${country}` : 'An anonymous supporter';
    }

    // 2. If privacyMode is always_anonymous:
    if (config.privacyMode === 'always_anonymous') {
      return hasCountry ? `A donor from ${country}` : 'A faithful donor';
    }

    // 3. If privacyMode is initials_only:
    if (config.privacyMode === 'initials_only') {
      const parts = currentDonation.donorName.trim().split(/\s+/);
      const initials = parts.map(p => p.charAt(0).toUpperCase() + '.').join(' ');
      return hasCountry ? `${initials} from ${country}` : initials;
    }

    // 4. Full name when allowed:
    const name = currentDonation.donorName.trim();
    if (hasCountry) {
      return `${name} from ${country}`;
    }
    return name;
  };

  // Format currency symbol
  const getCurrencySymbol = (c: CurrencyCode) => {
    switch (c) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      case 'CAD': return 'CA$';
      case 'AUD': return 'A$';
      case 'USD':
      default: return '$';
    }
  };

  // Relative time helper
  const getRelativeTime = (dateStr: string) => {
    try {
      const donationTime = new Date(dateStr.replace(' ', 'T')).getTime();
      const now = Date.now();
      const diffMinutes = Math.max(1, Math.floor((now - donationTime) / 60000));
      
      if (diffMinutes < 60) {
        return `${diffMinutes}m ago`;
      }
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) {
        return `${diffHours}h ago`;
      }
      return 'Recently';
    } catch {
      return 'Recently';
    }
  };

  return (
    <aside 
      aria-label="Recent Field Contribution Activity"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="fixed bottom-4 left-4 z-40 max-w-[340px] sm:max-w-sm w-[calc(100%-2rem)] sm:w-auto animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-auto"
    >
      <div className="bg-slate-950/95 text-white border border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-xl backdrop-blur-md relative overflow-hidden transition-all hover:border-slate-700">
        
        {/* Subtle Ambient Background Gradient */}
        <div 
          className="absolute -right-8 -top-8 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Header row: Live status and Dismiss */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300">
              Live Field Activity
            </span>

            {/* DEMO BADGE: Shown only if this is a sample/demo record in test mode */}
            {currentDonation.isDemo && (
              <span className="ml-1 text-[9px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded">
                Demo
              </span>
            )}
          </div>

          <button
            onClick={handleDismiss}
            aria-label="Dismiss notification"
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content row */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
            <Heart className="w-4 h-4 fill-amber-400/20 text-amber-400" />
          </div>

          <div className="min-w-0 flex-1">
            {/* Donor Name & Location */}
            <div className="text-xs font-semibold text-white truncate">
              {formatDonorName()}
            </div>

            {/* Contribution Details */}
            <div className="text-xs text-slate-300 mt-0.5 leading-snug">
              {config.showAmount ? (
                <>
                  Contributed{' '}
                  <strong className="text-amber-400 font-serif font-bold">
                    {getCurrencySymbol(currentDonation.currency)}
                    {currentDonation.amount.toLocaleString()}
                  </strong>
                </>
              ) : (
                'Contributed a verified gift'
              )}

              {config.showProject && currentDonation.projectTitle && (
                <span className="text-slate-400">
                  {' '}to <span className="text-slate-200">{currentDonation.projectTitle}</span>
                </span>
              )}
            </div>

            {/* Bottom metadata & CTA */}
            <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Verified Direct Field Gift</span>
                <span className="text-slate-600">&bull;</span>
                <span>{getRelativeTime(currentDonation.createdAt)}</span>
              </div>

              {onOpenDonate && (
                <button
                  onClick={() => onOpenDonate(currentDonation.projectId || undefined)}
                  className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-0.5 cursor-pointer ml-auto"
                >
                  <span>Give</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
};
