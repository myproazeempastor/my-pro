import React from 'react';

interface PolicyPageProps {
  slug: string;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ slug }) => {
  let title = "Institutional & Donor Policies";
  if (slug === 'privacy-policy') title = "Donor Privacy Policy";
  if (slug === 'donation-policy') title = "Donation Policy & Terms of Giving";
  if (slug === 'terms') title = "Website Terms of Use";

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-slate-950 text-white py-14 sm:py-18 text-center border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-2">
            Governance & Compliance
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-2">
            {title}
          </h1>
          <p className="text-xs text-slate-400 font-light">
            Agape Light Network &bull; Rev. Azeem Tariq &bull; Operating Charter 2026
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-18 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-7 sm:p-10 rounded-xl border border-slate-200/90 shadow-xs space-y-6 text-slate-700 text-sm font-light leading-relaxed">
          {slug === 'privacy-policy' ? (
            <>
              <h2 className="font-serif text-xl font-bold text-slate-900">1. Donor Data Protection</h2>
              <p>Agape Light Network respects the privacy of all contributors, churches, and visitors. We collect only necessary personal data required to record transactions, verify bank wires, and issue official contribution receipts.</p>
              
              <h2 className="font-serif text-xl font-bold text-slate-900">2. No List Commercialization</h2>
              <p>We do not sell, rent, or trade donor email addresses or telephone records with any commercial marketers or third parties. All donor records are protected behind multi-layer administrative authentication in our MySQL database.</p>

              <h2 className="font-serif text-xl font-bold text-slate-900">3. Anonymous Contributions</h2>
              <p>Donors may select the &quot;Keep my donation anonymous&quot; setting at checkout. When chosen, the donor&apos;s personal name is hidden from all public supporter catalogs.</p>
            </>
          ) : slug === 'donation-policy' ? (
            <>
              <h2 className="font-serif text-xl font-bold text-slate-900">1. Designated Fund Ringfencing</h2>
              <p>100% of contributions designated toward a specific project (such as a clean water borehole or literacy classroom) are ringfenced and allocated directly to that field operation without administrative dilution.</p>

              <h2 className="font-serif text-xl font-bold text-slate-900">2. General Mission Fund</h2>
              <p>Undesignated contributions are applied toward urgent relief where the spiritual and physical need is greatest under the direction of Rev. Azeem Tariq.</p>

              <h2 className="font-serif text-xl font-bold text-slate-900">3. Serial Numbered Receipts</h2>
              <p>Every confirmed contribution receives a unique serial reference (e.g. <code className="font-mono text-xs bg-slate-100 text-slate-800 px-1 py-0.5 rounded">ALN-2026-XXXX</code>). Official printable receipts are generated and archived in our database.</p>
            </>
          ) : (
            <>
              <h2 className="font-serif text-xl font-bold text-slate-900">Terms of Use</h2>
              <p>By browsing agapelightnetwork.org, you agree to access information responsibly and respect the copyright of all photographic field dispatches and ministry communications.</p>
              <p>All scripture citations are taken from the Holy Bible in accordance with our sacred mandate in John 8:12.</p>
            </>
          )}
        </div>
      </section>
    </div>
  );
};
