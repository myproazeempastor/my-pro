import React from 'react';
import { CartItem, CurrencyCode } from '../types';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, Heart, ShieldCheck } from 'lucide-react';

interface CartPageProps {
  cart: CartItem[];
  currentCurrency: CurrencyCode;
  onUpdateQuantity: (itemId: number, delta: number) => void;
  onRemoveItem: (itemId: number) => void;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  currentCurrency,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  onOpenDonate
}) => {
  const subtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Ministry Resources & Literature</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Your Ministry Cart
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            100% of all resource store margins fund direct Scripture printing and free distribution into the hands of brick-kiln Christian families.
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 sm:py-16 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {cart.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-xs">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h2 className="font-serif text-xl font-bold text-slate-900 mb-2">Your cart is currently empty</h2>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Explore our printed Urdu Study Bibles, mission literature, and children literacy materials.
              </p>
              <button
                onClick={() => onNavigate('shop')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Browse Ministry Store</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Items List */}
              <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-5 border-b border-slate-200 flex justify-between items-center">
                  <h2 className="font-serif text-lg font-bold text-slate-900">
                    Selected Resources ({cart.reduce((s, i) => s + i.quantity, 0)})
                  </h2>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="text-xs text-amber-700 hover:text-amber-800 font-medium inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Continue Browsing</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {cart.map(cartItem => (
                    <div key={cartItem.item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={cartItem.item.imageUrl}
                          alt={cartItem.item.name}
                          className="w-16 h-16 rounded-lg object-cover bg-slate-100 border border-slate-200"
                        />
                        <div>
                          <div className="text-xs text-amber-700 font-medium">{cartItem.item.category}</div>
                          <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">{cartItem.item.name}</h3>
                          <div className="text-xs text-slate-500 font-medium mt-1">
                            ${cartItem.item.price} USD each
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 self-end sm:self-center">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                            className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-xs font-semibold text-slate-800 min-w-8 text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                            className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Line Total */}
                        <div className="font-serif text-base font-bold text-slate-900 min-w-16 text-right">
                          ${(cartItem.item.price * cartItem.quantity).toLocaleString()}
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => onRemoveItem(cartItem.item.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
                <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">${subtotal.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Standard Shipping</span>
                    <span className="font-semibold text-emerald-600">Free / Subsidized</span>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-slate-900">Total Contribution</span>
                    <span className="font-serif text-2xl font-bold text-slate-900">
                      ${subtotal.toLocaleString()} <span className="text-xs font-sans text-slate-500 font-normal">USD</span>
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <span>Kingdom Subsidy Guarantee</span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Your purchase covers the printing and delivery of 2 additional Scripture portions to kiln laborers.
                  </p>
                </div>

                <button
                  onClick={() => onNavigate('checkout')}
                  className="w-full py-3 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center">
                  <button
                    onClick={() => onNavigate('shop')}
                    className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    &larr; Or continue browsing resources
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>
    </div>
  );
};
