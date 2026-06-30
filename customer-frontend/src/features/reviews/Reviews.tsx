'use client';

import { Star } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Evelyn Thorne',
    role: 'Gastronomy Critic, Le Point',
    comment: 'Maison Culinaire is not just dining; it is a profound artistic performance. The Miyazaki A5 Wagyu is simply unmatched, seared to sublime precision.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Vance',
    role: 'Founder, The Luxury Palate',
    comment: 'The black truffle risotto was sublime. Every flavor was perfectly balanced. A absolute masterpiece of textures, aroma, and taste.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Alistair Croft',
    role: 'Michelin Guide Reviewer',
    comment: 'An exceptional evening. The Saffron Lobster Pasta tasted as if it was hand-crafted by angels. Restrained elegance in every detail.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Clara Pendleton',
    role: 'Lifestyle Editorial Director',
    comment: 'The Belgian chocolate soufflé was out of this world, with gold dust adding a royal elegance. The staff accommodates every whim.',
    rating: 5,
  },
];

export default function Reviews() {
  // Double the list for infinite looping effect
  const doubleReviews = [...reviews, ...reviews];

  return (
    <section className="relative py-24 bg-background overflow-hidden border-t border-white/5" aria-label="Customer Reviews">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <span className="text-xs uppercase tracking-widest text-gold font-sans-luxury font-bold block mb-3">
          Atelier Chronicles
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-white max-w-2xl mx-auto leading-tight">
          Voices of the Connoisseurs
        </h2>
        <div className="w-12 h-[1px] bg-gold/50 mx-auto mt-6" />
      </div>

      {/* Infinite Scrolling Marquee Track Container */}
      <div className="relative w-full flex overflow-hidden mask-image-[linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
        {/* Style tag inside component to define keyframes safely without styling conflicts */}
        <style jsx>{`
          .marquee-track {
            display: flex;
            width: max-content;
            gap: 2rem;
            animation: scrollMarquee 40s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
          @keyframes scrollMarquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>

        <div className="marquee-track">
          {doubleReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="w-[300px] sm:w-[420px] p-8 rounded-2xl glass-morphic bg-surface/30 backdrop-blur-xl border border-white/5 flex flex-col justify-between shrink-0 hover:border-gold/30 hover:bg-surface/50 transition-all duration-500"
            >
              <div>
                {/* Star rating display */}
                <div className="flex items-center gap-1 mb-5" aria-label={`Rating: ${review.rating} stars`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-text-muted italic leading-relaxed mb-8">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-white/5 pt-5">
                {/* Monogram profile representation */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center text-background font-bold text-xs uppercase font-sans-luxury">
                  {review.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white font-sans-luxury tracking-wide">
                    {review.name}
                  </h4>
                  <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mt-0.5">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
