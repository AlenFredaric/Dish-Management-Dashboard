'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingIngredients = [
    { name: 'Persian Saffron', top: '15%', left: '10%', delay: 0 },
    { name: 'White Truffle', top: '25%', left: '80%', delay: 2 },
    { name: 'Oscietra Caviar', top: '65%', left: '15%', delay: 1 },
    { name: 'Edible Gold Dust', top: '75%', left: '75%', delay: 3 },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-background px-6 pt-20"
      aria-label="Welcome to Maison Culinaire"
    >
      {/* Spotlight Glow Orb */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.08), transparent 45%)`,
        }}
      />

      {/* Decorative top grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Floating Culinary Ingredients Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
        {floatingIngredients.map((item, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full border border-gold/10 bg-surface/40 backdrop-blur-md px-4 py-2 text-[10px] tracking-widest uppercase font-bold text-gold/80 animate-float"
            style={{
              top: item.top,
              left: item.left,
              animationDelay: `${item.delay}s`,
            }}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-gold animate-pulse" />
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Central Hero Core Content */}
      <div className="relative z-10 max-w-5xl text-center flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-4 py-1.5 text-xs text-gold font-sans-luxury uppercase tracking-widest font-semibold"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>An Gastronomy Atelier</span>
        </motion.div>

        {/* Cinematic Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif tracking-tight text-white leading-[1.1] max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Where Culinary Meets
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block bg-gradient-to-r from-gold via-yellow-400 to-orange-400 bg-clip-text text-transparent italic"
          >
            Sensory Memory
          </motion.span>
        </h1>

        {/* Animated Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-text-muted text-sm sm:text-lg max-w-xl leading-relaxed mt-4"
        >
          Embark on an immersive epicurean saga. Every plate tells a story, and every flavor orchestrates a memory handcrafted for our guests.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-5 mt-8 w-full sm:w-auto"
        >
          <Link
            href="/menu"
            className="w-full sm:w-auto group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-gold to-yellow-600 px-8 py-4 text-xs font-bold uppercase tracking-widest text-background shadow-lg shadow-gold/20 hover:brightness-110 active:scale-[0.98] transition-all"
            aria-label="Browse our culinary collection"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/reservations"
            className="w-full sm:w-auto group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300"
            aria-label="Make a table booking"
          >
            <span>Reserve a Table</span>
          </Link>
        </motion.div>
      </div>

      {/* Cinematic scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold font-sans-luxury">
          Scroll Down
        </span>
        <div className="w-[18px] h-[30px] rounded-full border border-white/20 flex justify-center p-1">
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1 h-1 bg-gold rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
