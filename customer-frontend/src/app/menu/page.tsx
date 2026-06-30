'use client';

import { useState } from 'react';
import { useMenuQuery } from '../../hooks/useMenu';
import { MenuItem } from '../../types';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../features/footer/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Clock, Flame, Sparkles, Filter, X, ArrowRight, ShieldAlert } from 'lucide-react';

export default function MenuPage() {
  const { data: menuItems, isLoading, isError } = useMenuQuery();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract categories dynamically
  const categories = ['All', ...Array.from(new Set(menuItems?.map(item => item.category) || []))];

  // Filtering logic
  const filteredItems = menuItems?.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.dishName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col pt-32">
      {/* Dynamic SEO Title representation */}
      <h1 className="sr-only">Maison Culinaire - Fine Gastronomy Menu</h1>

      {/* Global Connection Warning */}
      {isError && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-40 bg-red-950/80 border border-red-800/40 text-red-200 py-3.5 px-5 rounded-2xl backdrop-blur-xl flex items-center justify-between gap-4 shadow-2xl animate-fade-in">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-xs sm:text-sm font-medium">
              <span className="font-bold text-red-300">Connection Alert: </span>
              Unable to sync with the database. Showing cached selections.
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

      <div className="max-w-7xl mx-auto px-6 flex-1 w-full pb-24">
        
        {/* Header Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-gold font-sans-luxury font-bold block mb-3 animate-fade-in">
            L'Atelier Menu
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif text-white leading-tight">
            Our Seasonal Culinary Catalog
          </h2>
          <p className="text-text-muted text-sm sm:text-base mt-4">
            Curated flavors forged from local, organic delicacies. Every choice represents an orchestration of taste.
          </p>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-white/5">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto" role="tablist" aria-label="Menu categories">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 w-24 bg-white/5 rounded-xl animate-pulse" />
              ))
            ) : (
              categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  role="tab"
                  aria-selected={selectedCategory === category}
                  className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-widest rounded-xl transition-all duration-300 border focus-visible:outline-none ${
                    selectedCategory === category
                      ? 'bg-gold border-gold text-background shadow-lg shadow-gold/15'
                      : 'border-white/5 bg-surface/30 text-text-muted hover:text-white hover:border-white/15'
                  }`}
                >
                  {category}
                </button>
              ))
            )}
          </div>

          {/* Search bar input container */}
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted/60" />
            <input
              type="text"
              placeholder="Search Menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface/30 border border-white/5 rounded-xl pl-11 pr-10 py-3 text-xs text-white placeholder-text-muted/65 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/15 transition-all duration-300"
              aria-label="Search menu items"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Items Grid */}
        {isLoading ? (
          <GridSkeleton />
        ) : filteredItems && filteredItems.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.dishId}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="group relative rounded-2xl overflow-hidden glass-morphic bg-surface/20 border border-white/5 hover:border-gold/20 hover:bg-surface/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Card Image Wrapper */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                      <Image
                        src={item.imageUrl}
                        alt={item.dishName}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMEIxMDIwIi8+PC9zdmc+"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
                        {item.chefPick && (
                          <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-gold to-yellow-600 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-background shadow-lg">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Chef's Pick</span>
                          </div>
                        )}
                        <span className="rounded-full bg-background/80 border border-white/10 px-2.5 py-1 text-[9px] font-semibold text-text-muted uppercase tracking-widest backdrop-blur-md">
                          {item.category}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 z-20">
                        <span className="font-mono text-[9px] text-text-muted bg-background/80 px-2 py-0.5 rounded border border-white/10">
                          {item.dishId}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors duration-300">
                          {item.dishName}
                        </h3>
                        <div className="flex items-center gap-1 text-gold text-xs font-semibold shrink-0">
                          <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                          <span>{item.rating}</span>
                        </div>
                      </div>

                      <p className="text-text-muted text-xs leading-relaxed mt-2.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Action row */}
                  <div className="px-6 pb-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="font-serif text-xl font-semibold text-white">
                      ${item.price.toFixed(2)}
                    </span>

                    <div className="flex items-center gap-4 text-[10px] text-text-muted font-semibold uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gold/70" /> {item.preparationTime}
                      </span>
                    </div>

                    <Link 
                      href="/reservations"
                      className="text-[10px] font-bold uppercase tracking-widest text-gold group-hover:text-white flex items-center gap-1.5 focus-visible:outline-none"
                    >
                      Book <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Search Empty State */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center glass-morphic bg-surface/10 border border-white/5 rounded-3xl p-10"
          >
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl mb-4">
              <Filter className="w-8 h-8 text-gold/80 stroke-1" />
            </div>
            <h3 className="text-xl font-bold text-white font-serif mb-2">No Culinary Selections Found</h3>
            <p className="text-text-muted text-sm max-w-xs leading-relaxed">
              We couldn't locate any active dishes matching your current filter settings. Try searching another term or resetting your filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-6 border border-gold/40 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-gold hover:bg-gold/10 hover:border-gold transition-all"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div 
          key={i} 
          className="h-[380px] rounded-2xl bg-white/5 border border-white/5 animate-pulse flex flex-col justify-between p-6"
        >
          <div className="w-full h-[180px] bg-white/5 rounded-xl mb-4" />
          <div className="h-5 w-[80%] bg-white/5 rounded mb-2" />
          <div className="h-3 w-[60%] bg-white/5 rounded mb-4" />
          <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
            <div className="h-6 w-16 bg-white/5 rounded" />
            <div className="h-4 w-12 bg-white/5 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
