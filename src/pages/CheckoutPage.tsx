import React, { useState } from 'react';
import { CartItem, CurrencyCode, SiteSettings } from '../types';
import { ShieldCheck, Lock, CheckCircle2, ShoppingBag, ArrowLeft, Heart, CreditCard } from 'lucide-react';

interface CheckoutPageProps {
  cart: CartItem[];
  currentCurrency: CurrencyCode;
  settings: SiteSettings;
  onClearCart: () => void;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cart,
  currentCurrency,
  settings,
  onClearCart,
  onNavigate,
  onOpenDonate
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('United States');
  const [postalCode, setPostalCode] = useState('');
  
  // Dynamic Manual Payment Methods
  const availableMethods = (settings.paymentMethods && settings.paymentMethods.length > 0)
    ? settings.paymentMethods.filter(m => m.enabled).sort((a, b) => a.order - b.order)
    : [];
  const activeMethods = availableMethods.length > 0 ? availableMethods : (settings.paymentMethods || []);
  const [selectedMethodId, setSelectedMethodId] = useState<string>(activeMethods[0]?.id || 'manual-bank-transfer');
  const selectedMethod = activeMethods.find(m => m.id === selectedMethodId) || activeMethods[0];

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState<{
    reference: string;
    total: number;
    email: string;
  } | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !address) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const ref = `ORD-${Date.now().toString().slice(-6)}`;
      setOrderComplete({
        reference: ref,
        total: subtotal,
        email: email
      });
      onClearCart();
    }, 1200);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Fiduciary Secure Checkout &bull; SSL 256-Bit</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Resource Order & Checkout
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Finalize your literature order. Every publication is shipped with our ministry prayer seal and field dispatch documentation.
          </p>
        </div>
      </section>

      {/* Checkout Area */}
      <section className="py-12 sm:py-16 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {orderComplete ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">Order Confirmed!</h2>
              <div className="font-mono text-xs font-semibold text-amber-700 bg-amber-50 inline-block px-3 py-1 rounded-md border border-amber-200 mb-4">
                Reference: {orderComplete.reference}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Thank you, partner! A confirmation email and contribution statement have been dispatched to <strong>{orderComplete.email}</strong>. Your purchase directly funds free Bible deliveries to brick-kiln laborers.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => onNavigate('my-account')}
                  className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  View in My Account
                </button>
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                >
                  Back to Ministry Store
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-10 text-center max-w-md mx-auto shadow-xs">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h2 className="font-serif text-lg font-bold text-slate-900 mb-1">Your cart is empty</h2>
              <p className="text-xs text-slate-500 mb-5">Add items from our ministry store before proceeding to checkout.</p>
              <button
                onClick={() => onNavigate('shop')}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium cursor-pointer"
              >
                Browse Resources
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Details */}
              <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-bold text-slate-900 mb-1">Shipping & Partner Information</h2>
                  <p className="text-xs text-slate-500">Provide destination details for your physical study materials.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Name / Church Fellowship *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Pastor David Miller"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address (for Dispatch Tracking) *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="david@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="123 Mission Way, Suite 400"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="Dallas"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Postal / ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={e => setPostalCode(e.target.value)}
                      placeholder="75001"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Country *
                    </label>
                    <select
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="International">Other International</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-base font-bold text-slate-900">Manual Payment Method</h3>
                    <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Offline Direct Transfer
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {activeMethods.map(m => {
                      const isSelected = selectedMethod?.id === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setSelectedMethodId(m.id)}
                          className={`p-3 rounded-lg border text-left text-xs font-medium cursor-pointer transition-colors ${
                            isSelected
                              ? 'border-amber-600 bg-amber-50/70 text-slate-900 font-semibold ring-1 ring-amber-500'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          <div className="font-bold text-slate-900 mb-0.5">{m.name}</div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {m.bankName || (m.recipientDetails ? 'Authorized Agent' : 'Manual Wire/Transfer')}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Instructions snippet */}
                  {selectedMethod && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5 text-slate-700">
                      <div className="font-bold text-slate-900">{selectedMethod.name} Details:</div>
                      {selectedMethod.instructions && (
                        <p className="text-[11px] text-slate-600 whitespace-pre-line leading-relaxed">
                          {selectedMethod.instructions}
                        </p>
                      )}
                      {selectedMethod.recipientDetails && (
                        <div className="font-mono text-[11px] text-slate-800 bg-white p-2 rounded border border-slate-200 whitespace-pre-line">
                          {selectedMethod.recipientDetails}
                        </div>
                      )}
                      {(selectedMethod.bankName || selectedMethod.accountNumber || selectedMethod.iban) && (
                        <div className="font-mono text-[11px] text-slate-800 bg-white p-2 rounded border border-slate-200 space-y-0.5">
                          {selectedMethod.bankName && <div>Bank: {selectedMethod.bankName}</div>}
                          {selectedMethod.accountTitle && <div>Title: {selectedMethod.accountTitle}</div>}
                          {selectedMethod.accountNumber && <div>Acct: {selectedMethod.accountNumber}</div>}
                          {selectedMethod.iban && <div>IBAN: {selectedMethod.iban}</div>}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary & Submit */}
              <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
                <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Order Review
                </h3>

                <div className="divide-y divide-slate-100 text-xs">
                  {cart.map(i => (
                    <div key={i.item.id} className="py-2.5 flex justify-between items-center">
                      <div>
                        <div className="font-medium text-slate-900">{i.item.name}</div>
                        <div className="text-[11px] text-slate-500">Qty: {i.quantity} &bull; ${i.item.price} each</div>
                      </div>
                      <div className="font-bold text-slate-900">
                        ${(i.item.price * i.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">${subtotal.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Worldwide Shipping</span>
                    <span className="font-semibold text-emerald-600">Complimentary</span>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-slate-900">Total Contribution</span>
                    <span className="font-serif text-2xl font-bold text-slate-900">
                      ${subtotal.toLocaleString()} <span className="text-xs font-sans text-slate-500 font-normal">USD</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>256-bit encrypted checkout. Never stores card details.</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {isProcessing ? (
                    <span>Securing Contribution &bull; Please Wait...</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Complete Contribution (${subtotal.toLocaleString()} USD)</span>
                    </>
                  )}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => onNavigate('cart')}
                    className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    &larr; Back to edit cart
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>
      </section>
    </div>
  );
};
