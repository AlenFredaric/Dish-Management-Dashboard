'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { label: 'Atelier', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'Philosophy', path: '/about' },
  { label: 'Reservations', path: '/reservations' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  // Scroll event listeners for sticky styles and progress bar
  useEffect(() => {
    const handleScroll = () => {
      // 1. Sticky background activation
      setScrolled(window.scrollY > 20);

      // 2. Scroll progress calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-gold via-emerald to-teal z-9999 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <header
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50 rounded-2xl transition-all duration-500",
          scrolled 
            ? "glass-morphic shadow-2xl py-3 px-6 bg-background/60" 
            : "bg-transparent py-5 px-6 border-b border-transparent"
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group focus-visible:outline-none"
            aria-label="Maison Culinaire - Back to Atelier"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-yellow-600 shadow-lg shadow-gold/10 group-hover:scale-105 transition-transform duration-300">
              <ChefHat className="w-5 h-5 text-background" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-semibold tracking-wider text-white group-hover:text-gold transition-colors duration-300">
                Maison Culinaire
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gold font-bold font-sans-luxury">
                Culinary Experience
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Link Items */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative py-2 text-sm uppercase tracking-widest text-text-muted hover:text-white font-sans-luxury font-medium transition-colors duration-300 group focus-visible:outline-none"
                >
                  {item.label}
                  {/* Floating active dot or bar */}
                  {isActive ? (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-white/40 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Call to Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/reservations"
              className="group relative flex items-center gap-2 overflow-hidden rounded-xl border border-gold/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-500 hover:border-gold focus-visible:outline-none hover:shadow-lg hover:shadow-gold/10"
            >
              <span className="absolute inset-0 -translate-x-full bg-gold/10 transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative">Reserve Table</span>
              <ArrowRight className="w-3.5 h-3.5 relative group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden items-center justify-center p-2 rounded-xl border border-white/10 text-white hover:bg-white/5 focus-visible:outline-none focus:ring-1 focus:ring-gold"
            aria-expanded={isOpen}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-0 pt-28 pb-10 px-6 glass-morphic bg-background/95 z-40 border-b border-white/5 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
              {navItems.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.path}
                      className={cn(
                        "block text-lg uppercase tracking-widest font-sans-luxury py-2 transition-colors",
                        isActive ? "text-gold font-bold" : "text-text-muted hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="pt-6 border-t border-white/5"
            >
              <Link
                href="/reservations"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-yellow-600 py-3.5 text-sm font-semibold uppercase tracking-wider text-background hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <span>Reserve Table</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
