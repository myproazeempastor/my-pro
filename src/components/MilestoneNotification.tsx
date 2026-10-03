import React, { useState, useEffect, useRef } from 'react';
import { Project, CurrencyCode } from '../types';
import { 
  Sparkles, 
  X, 
  Trophy, 
  CheckCircle2, 
  Share2, 
  ExternalLink, 
  Heart, 
  Volume2, 
  VolumeX, 
  TrendingUp, 
  Flame,
  Award
} from 'lucide-react';

export interface MilestoneNotificationData {
  id: string;
  project: Project;
  milestone: 50 | 75 | 100;
  oldPercentage?: number;
  newPercentage: number;
  raisedAmount: number;
  goalAmount: number;
  currency: CurrencyCode;
  donorName?: string;
}

interface MilestoneNotificationProps {
  activeMilestone: MilestoneNotificationData | null;
  onDismiss: () => void;
  onSelectProject?: (project: Project) => void;
  onOpenDonate?: (projectId?: number) => void;
}

// Gentle Harmonic Web Audio Chime (C5, E5, G5, C6)
const playCelebrationChime = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Check if audio context is allowed to run
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.1 + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 0.75);
    });
  } catch {
    // Audio context may be restricted by autoplay policy
  }
};

export const MilestoneNotification: React.FC<MilestoneNotificationProps> = ({
  activeMilestone,
  onDismiss,
  onSelectProject,
  onOpenDonate
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [progressWidth, setProgressWidth] = useState<number>(100);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const DURATION_MS = 10000; // 10 seconds display

  useEffect(() => {
    if (!activeMilestone) return;

    // Play celebration audio if enabled
    if (soundEnabled) {
      playCelebrationChime();
    }

    // Reset countdown
    setProgressWidth(100);
    const startTime = Date.now();

    const interval = setInterval(() => {
      if (isPaused) return;
      const elapsed = Date.now() - startTime;
      const remainingPct = Math.max(0, 100 - (elapsed / DURATION_MS) * 100);
      setProgressWidth(remainingPct);

      if (remainingPct <= 0) {
        clearInterval(interval);
        onDismiss();
      }
    }, 100);

    timerRef.current = interval;

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeMilestone, isPaused, soundEnabled, onDismiss]);

  if (!activeMilestone) return null;

  const { project, milestone, raisedAmount, goalAmount, currency, donorName } = activeMilestone;

  const formatMoney = (amt: number) => {
    const symbolMap: Record<CurrencyCode, string> = {
      USD: '$',
      GBP: '£',
      CAD: 'CA$',
      AUD: 'A$',
      EUR: '€'
    };
    return `${symbolMap[currency]}${amt.toLocaleString()}`;
  };

  const getMilestoneConfig = () => {
    switch (milestone) {
      case 100:
        return {
          title: 'Goal Achieved! 100% Fully Funded 🎉',
          subtitle: 'Every required dollar has been pledged for this field initiative.',
          badgeText: '100% Completed Victory',
          themeBorder: 'border-emerald-500/80',
          gradientBg: 'from-emerald-950/95 via-slate-950/95 to-slate-900/95',
          accentText: 'text-emerald-400',
          badgeBg: 'bg-emerald-500 text-slate-950',
          icon: Trophy,
          iconBg: 'bg-emerald-500/20 text-emerald-400'
        };
      case 75:
        return {
          title: '75% Major Milestone Reached!',
          subtitle: 'Three quarters of this field initiative is now fully underwritten.',
          badgeText: '75% Frontline Victory',
          themeBorder: 'border-amber-500/80',
          gradientBg: 'from-amber-950/90 via-slate-950/95 to-slate-900/95',
          accentText: 'text-amber-400',
          badgeBg: 'bg-amber-500 text-slate-950',
          icon: Award,
          iconBg: 'bg-amber-500/20 text-amber-400'
        };
      case 50:
      default:
        return {
          title: 'Halfway Milestone Achieved: 50%!',
          subtitle: 'Over half of the required funding has been successfully secured.',
          badgeText: '50% Halfway Milestone',
          themeBorder: 'border-amber-600/80',
          gradientBg: 'from-amber-950/80 via-slate-950/95 to-slate-900/95',
          accentText: 'text-amber-300',
          badgeBg: 'bg-amber-600 text-white',
          icon: Flame,
          iconBg: 'bg-amber-600/20 text-amber-300'
        };
    }
  };

  const config = getMilestoneConfig();
  const IconComponent = config.icon;

  const handleShare = () => {
    const text = `🎉 Praise God! "${project.title}" with Agape Light Network has officially crossed its ${milestone}% fundraising milestone! Read more at https://agapelightnetwork.org`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <aside 
      aria-label="Fundraising milestone notification"
      role="status"
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="fixed top-5 right-4 sm:right-6 z-50 max-w-md w-full animate-in slide-in-from-top-4 fade-in duration-300"
    >
      <div className={`relative rounded-2xl bg-gradient-to-br ${config.gradientBg} border-2 ${config.themeBorder} shadow-2xl p-5 text-white backdrop-blur-md overflow-hidden ring-4 ring-black/40`}>
        
        {/* Floating Ambient Sparkles */}
        <div className="absolute top-2 right-12 flex gap-1 pointer-events-none opacity-40">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        </div>

        {/* Top Controls: Sound Toggle & Close Button */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1 rounded-md text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute milestone chimes' : 'Unmute milestone chimes'}
            aria-label="Toggle chime sound"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={onDismiss}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Dismiss milestone alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Header Ribbon: Milestone Badge */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className={`w-9 h-9 rounded-xl ${config.iconBg} flex items-center justify-center shrink-0 shadow-inner`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${config.badgeBg} shadow-xs`}>
                {config.badgeText}
              </span>
              <span className="text-[11px] text-slate-300 font-medium">
                Verified Field Milestone
              </span>
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-white leading-tight mt-0.5">
              {config.title}
            </h3>
          </div>
        </div>

        {/* Project Snapshot Card */}
        <div className="p-3 bg-black/40 rounded-xl border border-white/10 flex items-center gap-3.5 mb-3.5">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-14 h-14 rounded-lg object-cover border border-white/15 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] uppercase font-bold text-amber-400 block truncate">
              {project.category} &bull; {project.location}
            </span>
            <h4 className="font-serif text-sm font-bold text-white truncate">
              {project.title}
            </h4>
            <div className="flex items-baseline gap-2 mt-0.5 text-xs">
              <span className="font-bold text-white tabular-nums">
                {formatMoney(raisedAmount)}
              </span>
              <span className="text-slate-400 text-[11px]">
                of {formatMoney(goalAmount)} goal
              </span>
              <span className={`font-bold ml-auto ${config.accentText} tabular-nums text-xs`}>
                {milestone}%
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-white/15 h-2 rounded-full overflow-hidden mb-3 relative">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${
              milestone === 100 
                ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300' 
                : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-300'
            }`}
            style={{ width: `${milestone}%` }}
          />
        </div>

        {/* Description & Donor Gratitude */}
        <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
          {donorName && (
            <strong className="text-amber-300 font-semibold block mb-0.5">
              Spurred by recent gift from {donorName}!
            </strong>
          )}
          {config.subtitle} 100% of these contributions are ringfenced directly for field materials and labor under Rev. Azeem Tariq.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {onSelectProject && (
            <button
              type="button"
              onClick={() => {
                onSelectProject(project);
                onDismiss();
              }}
              className="flex-1 py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>View Program Details</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={handleShare}
            className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            title="Share this milestone"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Auto-Dismiss Countdown Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
          <div 
            className="h-full bg-amber-400/80 transition-all duration-100 ease-linear"
            style={{ width: `${progressWidth}%` }}
          />
        </div>

      </div>
    </aside>
  );
};
