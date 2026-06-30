'use client';

import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../features/footer/Footer';
import { motion } from 'framer-motion';
import { ChefHat, ArrowRight, ShieldAlert, Sparkles, Star } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col pt-32">
      <h1 className="sr-only">About Maison Culinaire - Our Culinary Heritage</h1>

      <div className="max-w-7xl mx-auto px-6 flex-1 w-full pb-24">
        
        {/* Cinematic Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-widest text-gold font-sans-luxury font-bold block mb-3">
            Atelier Narrative
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif text-white leading-tight">
            Our Kitchen, Our Philosophy
          </h2>
          <p className="text-text-muted text-sm sm:text-lg mt-4 leading-relaxed">
            Founded with a commitment to culinary purity, Maison Culinaire represents the collision of natural elements and rigorous architectural design.
          </p>
        </div>

        {/* Story Part 1 - Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="flex flex-col gap-6 items-start">
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold font-sans-luxury">
              Craftsmanship
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif text-white leading-snug">
              Ancestral Embers, Modern Metres
            </h3>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed">
              Our chef team approaches culinary creation like architects constructing space. We map out taste textures (smooth crunch, soft grit), thermal differentials, and aromatic progressions. The kitchen features custom oakwood stoves and a dedicated fermentation chambers.
            </p>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed">
              We cultivate close, direct partnerships with organic family micro-farms across the region, securing access to rare micro-greens, heirloom tomatoes, and aged grains.
            </p>
          </div>

          <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
              alt="Artisanal steak searing"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Story Part 2 - Plating Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 lg:flex-row-reverse">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl lg:order-last">
            <Image
              src="https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80"
              alt="Risotto plating detail"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-6 items-start">
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold font-sans-luxury">
              The Architecture
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif text-white leading-snug">
              Geometrical Composition
            </h3>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed">
              Every creation is rendered visually as an engineering blueprint before it enters recipe validation. We analyze the plate under three lights (cool ambient, natural light, incandescent dining lamp) to ensure aesthetic perfection.
            </p>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed">
              Taste profiles are balanced using custom math parameters. For every rich fat element (like Wagyu marbling or butter-poached lobster), we calculate a counterpoint acidity level (like lemon-herb reductions or fresh chimichurri) down to the milligram.
            </p>
            
            <Link
              href="/reservations"
              className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold hover:text-white transition-colors duration-300 mt-4 focus-visible:outline-none"
            >
              Reserve An Atelier Table <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
