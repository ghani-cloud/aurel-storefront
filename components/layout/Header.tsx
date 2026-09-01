// components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import CartDrawer from '@/components/cart/CartDrawer';

const navigation = [
  { name: 'Shop', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Journal', href: '/journal' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalQuantity } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-50 w-full transition-all duration-300',
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm' 
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-aurel-dark hover:text-aurel-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link 
              href="/" 
              className="font-serif text-2xl tracking-widest text-aurel-dark hover:text-aurel-gold transition-colors lg:absolute lg:left-1/2 lg:-translate-x-1/2"
            >
              AUREL
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm uppercase tracking-wider transition-colors hover:text-aurel-gold',
                    pathname === item.href 
                      ? 'text-aurel-gold' 
                      : 'text-aurel-dark'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-2">
              <button
                className="p-2 text-aurel-dark hover:text-aurel-gold transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-aurel-dark hover:text-aurel-gold transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag size={20} />
                {totalQuantity > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-aurel-gold text-xs font-medium text-white">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={cn(
            'lg:hidden fixed inset-x-0 top-16 bg-white/95 backdrop-blur-md border-b border-aurel-beige/30 transition-all duration-300 overflow-hidden',
            isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <nav className="flex flex-col p-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm uppercase tracking-wider transition-colors hover:text-aurel-gold py-2',
                  pathname === item.href 
                    ? 'text-aurel-gold' 
                    : 'text-aurel-dark'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
