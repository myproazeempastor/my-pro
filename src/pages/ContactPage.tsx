import React, { useState } from 'react';
import { SiteSettings } from '../types';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { sendContactInquirySmtp, ContactInquiryInput, SmtpTransmissionResult } from '../services/emailService';

interface ContactPageProps {
  settings: SiteSettings;
  onContactSubmit?: (inquiry: ContactInquiryInput) => Promise<SmtpTransmissionResult>;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings, onContactSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Church Partnership');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SmtpTransmissionResult | null>(null);
  const [submittedData, setSubmittedData] = useState<ContactInquiryInput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    const inquiryPayload: ContactInquiryInput = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      subject: subject.trim(),
      message: message.trim(),
      source: 'https://agapelightnetwork.org/contact'
    };

    try {
      let result: SmtpTransmissionResult;
      if (onContactSubmit) {
        result = await onContactSubmit(inquiryPayload);
      } else {
        result = await sendContactInquirySmtp(inquiryPayload, settings);
      }
      setSubmissionResult(result);
      setSubmittedData(inquiryPayload);
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to dispatch contact SMTP inquiry:', err);
      const fallbackResult = await sendContactInquirySmtp(inquiryPayload, settings);
      setSubmissionResult(fallbackResult);
      setSubmittedData(inquiryPayload);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmissionResult(null);
    setSubmittedData(null);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSubject('Church Partnership');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Dignified Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Pastoral & Partnership Liaison</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Contact Ministry Leadership
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            We welcome fellowship inquiries, church partnership requests, deep well sponsorship proposals, and personal prayer petitions.
          </p>
        </div>
      </section>

      {/* 2. Contact Information & Structured Form */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Contact Details Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-xs space-y-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                    Executive Ministry Office
                  </h3>
                  <p className="text-xs text-slate-500 font-light mt-1">
                    Supervised directly by Rev. Azeem Tariq
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3.5 text-sm">
                    <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-amber-700" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Official Ministry Email</div>
                      <a href={`mailto:${settings.contactEmail}`} className="font-semibold text-slate-900 hover:text-amber-700 transition-colors">
                        {settings.contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 text-sm">
                    <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-amber-700" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Executive Helpline</div>
                      <div className="font-semibold text-slate-900">{settings.contactPhone}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 text-sm">
                    <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-amber-700" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Headquarters Address</div>
                      <div className="font-semibold text-slate-900">{settings.address}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-lg text-xs text-slate-600 font-light space-y-1">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Real-Time SMTP Routing:</span>
                  </div>
                  <p>
                    All messages trigger an instantaneous email to <strong>{settings.smtpConfig.adminNotificationEmail}</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Structured Form Card */}
            <div className="lg:col-span-7">
              <div className="bg-white p-7 sm:p-9 rounded-xl border border-slate-200/90 shadow-xs">
                
                {submitted && submittedData ? (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="flex items-start gap-4 p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-serif text-xl font-bold text-emerald-950">
                          Inquiry Transmitted Successfully
                        </h3>
                        <p className="text-xs text-emerald-800 leading-relaxed font-light">
                          Thank you, <strong>{submittedData.name}</strong>. An email notification has been dispatched to <strong>{settings.smtpConfig.adminNotificationEmail}</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="font-semibold uppercase tracking-wider text-slate-500 text-[11px]">
                          Notification Summary
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          SMTP Dispatched
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Notification Type</span>
                          <span className="font-medium text-slate-800">New Website Inquiry</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Visitor Name</span>
                          <span className="font-medium text-slate-800">{submittedData.name}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Email</span>
                          <span className="font-medium text-slate-800">{submittedData.email}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Phone</span>
                          <span className="font-medium text-slate-800">
                            {submittedData.phone || 'Not provided'}
                          </span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-slate-400 block text-[10px] uppercase">Subject</span>
                          <span className="font-medium text-slate-800">{submittedData.subject}</span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-slate-400 block text-[10px] uppercase">Submission Date / Time</span>
                          <span className="font-medium text-slate-800 font-mono text-[11px]">
                            {submissionResult?.timestamp || new Date().toISOString()}
                          </span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-slate-400 block text-[10px] uppercase">Website Source</span>
                          <span className="font-medium text-slate-700 font-mono text-[11px]">
                            {submittedData.source || 'https://agapelightnetwork.org/contact'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleReset}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Full Name <span className="text-amber-700">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address <span className="text-amber-700">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="your.email@example.org"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Subject / Inquiry Type
                        </label>
                        <select
                          value={subject}
                          onChange={e => setSubject(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-hidden bg-white"
                        >
                          <option value="Church Partnership">Church Partnership / Mission Board</option>
                          <option value="Direct Debt Rescue">Brick Kiln Debt Rescue Sponsorship</option>
                          <option value="Water Well Project">Community Clean Water Borehole</option>
                          <option value="Confidential Prayer">Pastoral Prayer Request</option>
                          <option value="General Question">General Ministry Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Message Content <span className="text-amber-700">*</span>
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Please communicate your thoughts, mission interest, or confidential prayer request..."
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-hidden resize-y"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Transmitting via SMTP...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Transmit Message Now</span>
                          </>
                        )}
                      </button>

                      <div className="text-[11px] text-slate-500">
                        Immediate notification sent to {settings.smtpConfig.adminNotificationEmail}
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
