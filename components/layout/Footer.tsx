import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';

const footerSections = {
  shop: {
    title: 'Shop',
    links: [
      { name: 'All Products', href: '/products' },
      { name: 'Cleansers', href: '/collections/cleansers' },
      { name: 'Serums', href: '/collections/serums' },
      { name: 'Moisturizers', href: '/collections/moisturizers' },
      { name: 'Sets', href: '/collections/sets' },
    ],
  },
  about: {
    title: 'About',
    links: [
      { name: 'Our Story', href: '/about' },
      { name: 'Ingredients', href: '/ingredients' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Journal', href: '/journal' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { name: 'Contact', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
    ],
  },
};

export default function Footer() {
  return (
    <footer className="bg-aurel-dark text-white/70">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-white tracking-widest mb-4">
              AUREL
            </h3>
            <p className="text-sm leading-relaxed max-w-xs">
              Modern skincare designed around simple, effective routines. 
              Premium ingredients, minimal complexity.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-white/50 hover:text-aurel-gold transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-white/50 hover:text-aurel-gold transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="text-white/50 hover:text-aurel-gold transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-medium mb-4">{footerSections.shop.title}</h4>
            <ul className="space-y-3">
              {footerSections.shop.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-medium mb-4">{footerSections.about.title}</h4>
            <ul className="space-y-3">
              {footerSections.about.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-medium mb-4">{footerSections.support.title}</h4>
            <ul className="space-y-3">
              {footerSections.support.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail size={16} className="text-aurel-gold" />
                <span>hello@aurel.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={16} className="text-aurel-gold" />
                <span>(855) 221-7587</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs">
              © {new Date().getFullYear()} AUREL Skincare. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
