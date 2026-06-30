'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChefHat, ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1200);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background border-t border-white/5 pt-20 pb-10 px-6 overflow-hidden" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      {/* Glow highlight background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/5 relative z-10">
        
        {/* Brand Section */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2.5 group focus-visible:outline-none w-max">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-yellow-600">
              <ChefHat className="w-5 h-5 text-background" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-semibold tracking-wider text-white">
                Maison Culinaire
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gold font-bold font-sans-luxury">
                Culinary Experience
              </span>
            </div>
          </Link>
          
          <p className="text-sm text-text-muted max-w-sm leading-relaxed">
            Crafting gastronomic experiences that bridge taste and memory. Join us for a journey through the absolute peaks of premium culinary art.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-text-muted">
            <a href="#" className="p-2.5 rounded-lg border border-white/5 bg-white/5 hover:border-gold hover:text-gold transition-all duration-300" aria-label="Follow us on Instagram">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="p-2.5 rounded-lg border border-white/5 bg-white/5 hover:border-gold hover:text-gold transition-all duration-300" aria-label="Follow us on Facebook">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="p-2.5 rounded-lg border border-white/5 bg-white/5 hover:border-gold hover:text-gold transition-all duration-300" aria-label="Follow us on Twitter">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xs uppercase tracking-widest text-gold font-bold font-sans-luxury">
            The Atelier
          </h3>
          <nav className="flex flex-col gap-3 text-sm text-text-muted">
            <Link href="/" className="hover:text-white hover:translate-x-1 transition-all duration-300">Home</Link>
            <Link href="/menu" className="hover:text-white hover:translate-x-1 transition-all duration-300">Menu</Link>
            <Link href="/about" className="hover:text-white hover:translate-x-1 transition-all duration-300">Philosophy</Link>
            <Link href="/reservations" className="hover:text-white hover:translate-x-1 transition-all duration-300">Reservations</Link>
          </nav>
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xs uppercase tracking-widest text-gold font-bold font-sans-luxury">
            Mailing List
          </h3>
          <p className="text-sm text-text-muted">
            Subscribe to receive notifications about private dinners and seasonal curations.
          </p>

          <form onSubmit={handleSubscribe} className="relative flex flex-col gap-3">
            {subscribed ? (
              <div className="text-xs text-gold font-medium py-2">
                ✓ Thank you. You are on the VIP mailing list.
              </div>
            ) : (
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted/65 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 pr-12 transition-all duration-300"
                  required
                  aria-label="Email address for newsletter subscription"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 p-2 rounded-lg bg-gold hover:bg-yellow-500 text-background transition-all disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>
        </div>

      </div>

      {/* Trademark Section */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted relative z-10">
        <p>© {currentYear} Maison Culinaire. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
