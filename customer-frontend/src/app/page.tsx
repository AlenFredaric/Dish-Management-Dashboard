'use client';

import { useMenuQuery } from '../hooks/useMenu';
import Hero from '../features/hero/Hero';
import FeaturedSpecials from '../features/menu/FeaturedSpecials';
import Reviews from '../features/reviews/Reviews';
import Footer from '../features/footer/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChefHat, ArrowRight, ShieldAlert, Sparkles, MapPin, Calendar, Clock } from 'lucide-react';

export default function Home() {
  const { isError } = useMenuQuery();

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      {/* Global Connection Warning Banner */}
      {isError && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-40 bg-red-950/80 border border-red-800/40 text-red-200 py-3.5 px-5 rounded-2xl backdrop-blur-xl flex items-center justify-between gap-4 shadow-2xl animate-fade-in">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-xs sm:text-sm font-medium">
              <span className="font-bold text-red-300">Connection Offline: </span>
              Unable to sync with the Culinary Engine. Viewing offline archive.
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="text-[10px] font-bold uppercase tracking-widest text-white hover:text-red-300 border border-white/10 px-3 py-1.5 rounded-lg bg-white/5 transition-all"
          >
            Retry
          </button>
        </div>
      )}

      {/* Cinematic Hero */}
      <Hero />

      {/* Today's Chef Specials (Live fetched from Backend) */}
      <FeaturedSpecials />

      {/* Philosophy Section (Visual Parallax Storytelling) */}
      <section className="relative py-24 bg-background border-t border-white/5 px-6" aria-label="Our Philosophy">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Parallax Images Group */}
          <div className="relative h-[350px] sm:h-[480px] w-full flex items-center justify-center">
            {/* Primary Main Image Card */}
            <div className="absolute top-0 left-0 w-[75%] h-[85%] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                alt="Chef plating luxury Wagyu dish"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            
            {/* Secondary Overlapping Image Card (Parallax offset effect) */}
            <div className="absolute bottom-0 right-0 w-[55%] h-[65%] rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-20">
              <Image
                src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
                alt="Saffron lobster preparation details"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover"
              />
            </div>

            {/* Glowing gold dot background */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold/10 rounded-full blur-2xl z-0" />
          </div>

          {/* Philosophy Text Story */}
          <div className="flex flex-col gap-6 items-start">
            <span className="text-xs uppercase tracking-widest text-gold font-sans-luxury font-bold">
              The Heritage
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
              An Architectural Approach to Taste
            </h2>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed">
              Maison Culinaire represents the absolute confluence of high-end gastronomy and cinematic architecture. Inspired by seasonal micro-climates, our culinary atelier respects ancestral fire methods while forging modern gastronomic boundary-pushing.
            </p>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed">
              We design plates with exact spatial harmony, texture gradients, and aromatic sequence triggers. To dine with us is to experience memory-making through taste.
            </p>

            <Link
              href="/about"
              className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold hover:text-white transition-colors duration-300 mt-4 focus-visible:outline-none"
            >
              <span>Our Full Narrative</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

        </div>
      </section>

      {/* Customer Reviews Infinite Carousel */}
      <Reviews />

      {/* Quick Reservation Call To Action Section */}
      <section className="relative py-24 bg-background border-t border-white/5 px-6" aria-label="Book Reservation CTA">
        <div className="max-w-4xl mx-auto rounded-3xl glass-morphic bg-surface/20 border border-white/5 p-8 sm:p-16 text-center relative overflow-hidden">
          {/* Subtle gold spotlight overlay */}
          <div className="absolute inset-0 bg-radial-gradient from-gold/5 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-yellow-600 shadow-lg shadow-gold/10">
              <Calendar className="w-5 h-5 text-background" />
            </div>
            
            <span className="text-xs uppercase tracking-widest text-gold font-sans-luxury font-bold">
              Private Gastronomy Atelier
            </span>
            
            <h2 className="text-2xl sm:text-4xl font-serif text-white leading-tight">
              Experience the Symphony Live
            </h2>
            
            <p className="text-text-muted text-sm sm:text-base max-w-lg leading-relaxed">
              Tables are released on the first of each month for the subsequent calendar block. Bookings are strictly limited to secure absolute intimacy.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-text-muted mt-4 font-semibold uppercase tracking-wider font-sans-luxury">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold/80" /> 45 Wall Street, NY
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold/80" /> 18:00 - 23:00
              </span>
            </div>

            <Link
              href="/reservations"
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-gold to-yellow-600 px-10 py-4 text-xs font-bold uppercase tracking-widest text-background shadow-lg shadow-gold/25 mt-6 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <span>Reserve Atelier Table</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Luxury Footer */}
      <Footer />
    </div>
  );
}
