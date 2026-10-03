import React, { useState } from 'react';
import { SiteSettings } from '../types';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  settings: SiteSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 lg:py-28 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Contact Details & Pastoral Welcome */}
          <div className="lg:col-span-5 space-y-7">
            <div>
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" aria-hidden="true" />
                <span>Pastoral & Partnership Liaison</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-normal tracking-tight text-slate-900 leading-tight">
                Get in Touch With Our Team
              </h2>
              <p className="text-base text-slate-600 font-light mt-3.5 leading-relaxed text-balance">
                Whether you represent a church mission board, wish to sponsor a complete village deep well, or desire prayer for your family, Rev. Azeem Tariq and our leadership team welcome your contact.
              </p>
            </div>

            <div className="space-y-4 pt-1">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Direct Inquiries</div>
                  <a href={`mailto:${settings.contactEmail}`} className="font-semibold text-slate-900 hover:text-amber-700 transition-colors text-sm">
                    {settings.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">International Helpline</div>
                  <div className="font-semibold text-slate-900 text-sm">{settings.contactPhone}</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Ministry Center</div>
                  <div className="font-semibold text-slate-900 text-sm leading-snug">{settings.address}</div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200/90 rounded-2xl text-xs text-slate-600 shadow-2xs space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Executive Office & Accredited Field Operations</span>
              </div>
              <div className="text-slate-700">{settings.founderName} &bull; {settings.founderTitle}</div>
              <div className="text-slate-500 text-[11px] pt-1 border-t border-slate-100">Official Web Domain: https://agapelightnetwork.org/</div>
            </div>
          </div>

          {/* Inquiry / Prayer Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-7 sm:p-10 rounded-2xl border border-slate-200/90 shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900">
                    Message Received in Faith
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto font-light leading-relaxed">
                    Thank you, {name}. Your inquiry has been forwarded to Rev. Azeem Tariq and the ministry leadership team. We will respond promptly.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setName(''); setEmail(''); setMessage(''); setSubject(''); }}
                    className="mt-4 px-5 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Full Name <span className="text-amber-700">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. David Jenkins"
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-hidden bg-white text-slate-900 shadow-2xs transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email Address <span className="text-amber-700">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. david@example.org"
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-hidden bg-white text-slate-900 shadow-2xs transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Church Partnership / Well Sponsorship"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-hidden bg-white text-slate-900 shadow-2xs transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Message or Prayer Request <span className="text-amber-700">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please share your questions, partnership interest, or prayer needs..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-hidden bg-white text-slate-900 resize-y shadow-2xs transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
