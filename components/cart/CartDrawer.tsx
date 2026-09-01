// components/cart/CartDrawer.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalQuantity, totalPrice, checkoutUrl } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-aurel-beige/30 px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-aurel-dark" />
            <h2 className="font-serif text-lg tracking-wider text-aurel-dark">
              Your Cart
            </h2>
            {totalQuantity > 0 && (
              <span className="ml-2 rounded-full bg-aurel-gold px-2.5 py-0.5 text-xs font-medium text-white">
                {totalQuantity}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-aurel-beige/30 transition-colors"
            aria-label="Close cart"
          >
            <X size={20} className="text-aurel-dark" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex h-[calc(100vh-180px)] flex-col overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <ShoppingBag size={64} className="text-aurel-beige/50 mb-4" />
              <h3 className="font-serif text-xl text-aurel-dark">Your cart is empty</h3>
              <p className="mt-2 text-sm text-gray-500">
                Discover our premium skincare collection.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-full bg-aurel-dark px-8 py-3 text-sm font-medium text-white hover:bg-aurel-gold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-aurel-beige/20 pb-4"
                >
                  {/* Product Image */}
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-aurel-beige/20">
                    {item.merchandise.product.images.edges[0]?.node.url && (
                      <img
                        src={item.merchandise.product.images.edges[0].node.url}
                        alt={item.merchandise.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-aurel-dark">
                        {item.merchandise.product.title}
                      </h4>
                      <p className="text-sm font-medium text-aurel-dark">
                        {formatPrice(item.merchandise.price.amount)}
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.merchandise.title}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        className="rounded-full border border-aurel-beige/30 p-1 hover:border-aurel-gold transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button
                        className="rounded-full border border-aurel-beige/30 p-1 hover:border-aurel-gold transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-aurel-beige/30 px-6 py-4">
            <div className="flex justify-between text-base font-medium text-aurel-dark">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <Link
              href={checkoutUrl || '#'}
              className="mt-4 flex w-full items-center justify-center rounded-full bg-aurel-dark px-8 py-3 text-sm font-medium text-white hover:bg-aurel-gold transition-colors"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={onClose}
              className="mt-3 flex w-full items-center justify-center text-sm text-gray-500 hover:text-aurel-dark transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
