'use client';

import { useFeaturedMenuQuery } from '../../hooks/useMenu';
import { motion } from 'framer-motion';
import { Sparkles, Star, Clock, Flame, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedSpecials() {
  const { data: featuredItems, isLoading, isError } = useFeaturedMenuQuery();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Display nothing or offline banner if API fails
  if (isError || !featuredItems || featuredItems.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 bg-background px-6" aria-labelledby="featured-specials-heading">
      {/* Decorative blurred background orb */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-emerald/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold font-sans-luxury font-bold block mb-3">
              Epicurean Highlights
            </span>
            <h2 id="featured-specials-heading" className="text-3xl sm:text-5xl font-serif text-white leading-tight">
              Today's Chef Specials
            </h2>
          </div>
          <p className="text-text-muted text-sm sm:text-base max-w-md leading-relaxed">
            Direct from our atelier's kitchen: a hand-picked assembly of rare seasonal ingredients constructed by our executive culinary masters.
          </p>
        </div>

        {/* Featured grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {featuredItems.slice(0, 2).map((item, index) => (
            <motion.div
              key={item.dishId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl overflow-hidden glass-morphic bg-surface/30 border border-white/5 hover:border-gold/20 hover:bg-surface/50 transition-all duration-500 flex flex-col sm:flex-row h-full"
            >
              {/* Image side */}
              <div className="relative w-full sm:w-[45%] min-h-[250px] sm:min-h-full overflow-hidden bg-slate-900">
                <Image
                  src={item.imageUrl}
                  alt={item.dishName}
                  fill
                  sizes="(max-width: 640px) 100vw, 30vw"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMEIxMDIwIi8+PC9zdmc+"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-background/90 via-transparent to-transparent z-10" />
                
                {/* Chef pick badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold to-yellow-600 px-3 py-1.5 text-background shadow-lg shadow-gold/20">
                  <Sparkles className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-wider font-sans-luxury">
                    Chef's Choice
                  </span>
                </div>
              </div>

              {/* Details side */}
              <div className="p-8 flex-1 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-gold font-bold font-sans-luxury">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 text-gold text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-gold transition-colors duration-300">
                    {item.dishName}
                  </h3>

                  <p className="text-text-muted text-xs sm:text-sm mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Metadata & Price */}
                <div className="flex flex-col gap-5 pt-5 border-t border-white/5">
                  <div className="flex items-center gap-6 text-xs text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold/80" />
                      {item.preparationTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-gold/80" />
                      {item.calories} kcal
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <span className="font-serif text-2xl font-semibold text-white">
                      ${item.price.toFixed(2)}
                    </span>
                    
                    <Link
                      href="/reservations"
                      className="text-xs uppercase tracking-widest text-gold group-hover:text-white font-bold font-sans-luxury flex items-center gap-1.5 focus-visible:outline-none"
                    >
                      Book Table <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="h-6 w-32 bg-white/5 rounded animate-pulse mb-4" />
      <div className="h-10 w-64 bg-white/5 rounded animate-pulse mb-12" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {[1, 2].map((i) => (
          <div key={i} className="h-[320px] rounded-3xl bg-white/5 border border-white/5 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
