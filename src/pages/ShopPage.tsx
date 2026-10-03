import React from 'react';
import { ShopItem, CurrencyCode } from '../types';
import { ShoppingBag, Heart, Check, ArrowRight } from 'lucide-react';

interface ShopPageProps {
  items: ShopItem[];
  currentCurrency: CurrencyCode;
  cartCount: number;
  onAddToCart: (item: ShopItem) => void;
  onNavigate: (route: string) => void;
  onOpenDonate: (projectId?: number) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  items,
  currentCurrency,
  cartCount,
  onAddToCart,
  onNavigate,
  onOpenDonate
}) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Ministry Resources & Scripture Distribution</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Ministry Resource Store
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Every study Bible, publication, and missionary primer purchased directly subsidizes free distribution to illiterate brick-kiln laborers and rural Christian students.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => onNavigate('cart')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Partner Basket ({cartCount} items)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between group">
                <div>
                  <div className="aspect-16/10 bg-slate-900 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6">
                    <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1.5">
                      {item.category}
                    </div>

                    <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 font-light leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="font-serif text-2xl font-bold text-slate-900">
                    ${item.price} <span className="text-xs font-sans text-slate-400">USD</span>
                  </div>

                  <button
                    onClick={() => onAddToCart(item)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Basket</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => onNavigate('cart')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 hover:text-amber-900 cursor-pointer"
            >
              <span>Proceed to Cart & Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
