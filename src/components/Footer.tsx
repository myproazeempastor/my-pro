import React from 'react';
import { SiteSettings } from '../types';
import { Heart, ShieldCheck, Download, Code2, Wrench, ArrowRight } from 'lucide-react';

interface FooterProps {
  settings: SiteSettings;
  onNavigate: (route: string) => void;
  onOpenAdmin: () => void;
  onOpenInstaller: () => void;
  onOpenCodeExplorer: () => void;
  onDownloadZip: () => void;
  onOpenDonate: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  onOpenAdmin,
  onOpenInstaller,
  onOpenCodeExplorer,
  onDownloadZip,
  onOpenDonate
}) => {
  const handleNav = (route: string) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-14 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* International Donor Trust & Alignment Strip */}
        <div className="pb-12 mb-12 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
                Global Partnership & Governance
              </div>
              <div className="text-xs text-slate-400 font-light">
                Direct frontline reporting for partners across UK, United States, Canada, Australia, Europe & worldwide
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-medium">United Kingdom</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-medium">United States</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-medium">Canada</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-medium">Australia</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-medium">Europe & Global</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-slate-800/80">
          
          {/* Column 1: Organization Identity & Mandate (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shadow-xs">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2v20M7 8h10" />
                  <circle cx="12" cy="5" r="1.5" fill="#f59e0b" stroke="none" />
                </svg>
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-white tracking-tight leading-tight">
                  {settings.orgName}
                </span>
                <span className="block text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-amber-400 leading-none mt-1">
                  {settings.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light">
              An international Christian ministry and frontline liberation network founded by <strong>Rev. Azeem Tariq</strong>. Guided by Jesus Christ&apos;s command in John 8:12 to break debt bondage in Pakistani brick kilns, drill certified deep wells, and distribute vernacular Holy Scriptures.
            </p>

            <div className="border-l-2 border-amber-500/80 pl-3.5 py-1 text-xs">
              <span className="font-serif italic text-slate-200 block text-xs">
                &ldquo;{settings.scriptureVerse}&rdquo;
              </span>
              <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-amber-400 mt-1 block">
                — {settings.scriptureReference}
              </span>
            </div>

            {/* Official Frontline Social Media Channels */}
            {settings.socialLinks && (
              <div className="pt-2">
                <span className="block text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-slate-300 mb-2.5">
                  Follow Frontline Updates
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {settings.socialLinks.facebook && (
                    <a
                      href={settings.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 hover:bg-slate-800 transition-all duration-200 cursor-pointer group shadow-2xs"
                      title="Follow Agape Light Network on Facebook"
                      aria-label="Agape Light Network on Facebook"
                    >
                      <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}

                  {settings.socialLinks.youtube && (
                    <a
                      href={settings.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 hover:bg-slate-800 transition-all duration-200 cursor-pointer group shadow-2xs"
                      title="Subscribe to Agape Light Network on YouTube"
                      aria-label="Agape Light Network on YouTube"
                    >
                      <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  )}

                  {settings.socialLinks.instagram && (
                    <a
                      href={settings.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 hover:bg-slate-800 transition-all duration-200 cursor-pointer group shadow-2xs"
                      title="Follow Agape Light Network on Instagram"
                      aria-label="Agape Light Network on Instagram"
                    >
                      <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}

                  {settings.socialLinks.twitter && (
                    <a
                      href={settings.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 hover:bg-slate-800 transition-all duration-200 cursor-pointer group shadow-2xs"
                      title="Follow Agape Light Network on X (Twitter)"
                      aria-label="Agape Light Network on X (Twitter)"
                    >
                      <svg className="w-3.5 h-3.5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  )}

                  {settings.socialLinks.whatsapp && (
                    <a
                      href={settings.socialLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 hover:bg-slate-800 transition-all duration-200 cursor-pointer group shadow-2xs"
                      title="Direct Ministry WhatsApp Communication"
                      aria-label="Agape Light Network on WhatsApp"
                    >
                      <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Frontline Ministries (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Frontline Ministries
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <button onClick={() => handleNav('direct-debt-rescue')} className="hover:text-white transition-colors text-left cursor-pointer flex items-center justify-between w-full">
                  <span>Direct Debt Rescue</span>
                  <span className="text-[9px] uppercase font-bold text-amber-400">Kiln Freedom</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('post-rescue-protocol')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Post-Rescue Protocol (Rehab)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('next-gen-rescue-discipleship')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Next-Gen Rescue Discipleship
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('womens-liberation-covering')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Women&apos;s Liberation Covering (Widows)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('bible-translation-projects')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Bible Translation Projects
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('view-translation-projects')} className="hover:text-white transition-colors text-left cursor-pointer">
                  View Translation Projects
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('healing-crusades')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Healing Crusades & Pastors Training
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sponsor-a-project')} className="hover:text-white transition-colors text-left cursor-pointer text-amber-400 font-medium pt-1">
                  Sponsor a Project &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Evidence & Governance (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Evidence & Trust
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <button onClick={() => handleNav('the-mission')} className="hover:text-white transition-colors text-left cursor-pointer">
                  The Mission
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('the-john-812-mandate')} className="hover:text-white transition-colors text-left cursor-pointer">
                  The John 8:12 Mandate
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('strategic-blueprint')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Strategic Blueprint
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('see-our-ground-impact')} className="hover:text-white transition-colors text-left cursor-pointer">
                  See Our Ground Impact
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('field-evidence')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Field Evidence
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('photo-gallery')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('video-evidence')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Video Evidence
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('frontline-accountability')} className="hover:text-white transition-colors text-left cursor-pointer text-emerald-400 font-medium">
                  Frontline Accountability
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform & cPanel Deployment Package (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Partner & Deployment
            </h4>
            <ul className="space-y-2 text-xs font-light pb-2">
              <li>
                <button onClick={() => handleNav('initiate-strategic-alliance')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Initiate Strategic Alliance
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Ministry Resource Store
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('my-account')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Partner Account Portal
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact-us')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <button
                onClick={onDownloadZip}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download cPanel ZIP Package</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onOpenCodeExplorer}
                  className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-[11px] font-medium transition-colors cursor-pointer"
                >
                  <Code2 className="w-3 h-3 text-slate-400" />
                  <span>PHP Source</span>
                </button>
                <button
                  onClick={onOpenInstaller}
                  className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-[11px] font-medium transition-colors cursor-pointer"
                >
                  <Wrench className="w-3 h-3 text-slate-400" />
                  <span>Installer</span>
                </button>
              </div>

              <button
                onClick={onOpenAdmin}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-slate-200 text-[11px] transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3 h-3 text-amber-500" />
                <span>SuperAdmin Management Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Scripture, and Accreditation */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light">
          <div>
            &copy; {new Date().getFullYear()} {settings.orgName}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span>Founder & President: <strong className="text-slate-400 font-medium">{settings.founderName}</strong></span>
            <span aria-hidden="true">&bull;</span>
            <button onClick={() => handleNav('privacy-policy')} className="hover:text-slate-300 transition-colors">
              Privacy
            </button>
            <span aria-hidden="true">&bull;</span>
            <button onClick={() => handleNav('donation-policy')} className="hover:text-slate-300 transition-colors">
              Donation Terms
            </button>
            <span aria-hidden="true">&bull;</span>
            <span>100% Direct Field Pledge</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
