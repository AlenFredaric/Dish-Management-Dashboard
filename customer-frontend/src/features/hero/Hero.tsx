// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { ArrowRight, Sparkles } from 'lucide-react';

// export default function Hero() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!containerRef.current) return;
//       const rect = containerRef.current.getBoundingClientRect();
//       setMousePos({
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top,
//       });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   const floatingIngredients = [
//     { name: 'Persian Saffron', top: '15%', left: '10%', delay: 0 },
//     { name: 'White Truffle', top: '25%', left: '80%', delay: 2 },
//     { name: 'Oscietra Caviar', top: '65%', left: '15%', delay: 1 },
//     { name: 'Edible Gold Dust', top: '75%', left: '75%', delay: 3 },
//   ];

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-background px-6 pt-20"
//       aria-label="Welcome to Maison Culinaire"
//     >
//       {/* Spotlight Glow Orb */}
//       <div
//         className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
//         style={{
//           background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.08), transparent 45%)`,
//         }}
//       />

//       {/* Decorative top grid overlay */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

//       {/* Floating Culinary Ingredients Particles */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
//         {floatingIngredients.map((item, index) => (
//           <motion.div
//             key={index}
//             className="absolute rounded-full border border-gold/10 bg-surface/40 backdrop-blur-md px-4 py-2 text-[10px] tracking-widest uppercase font-bold text-gold/80 animate-float"
//             style={{
//               top: item.top,
//               left: item.left,
//               animationDelay: `${item.delay}s`,
//             }}
//           >
//             <span className="flex items-center gap-1.5">
//               <span className="w-1 h-1 rounded-full bg-gold animate-pulse" />
//               {item.name}
//             </span>
//           </motion.div>
//         ))}
//       </div>

//       {/* Central Hero Core Content */}
//       <div className="relative z-10 max-w-5xl text-center flex flex-col items-center gap-6">
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//           className="flex items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-4 py-1.5 text-xs text-gold font-sans-luxury uppercase tracking-widest font-semibold"
//         >
//           <Sparkles className="w-3.5 h-3.5" />
//           <span>An Gastronomy Atelier</span>
//         </motion.div>

//         {/* Cinematic Headline */}
//         <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif tracking-tight text-white leading-[1.1] max-w-4xl">
//           <motion.span
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
//             className="block"
//           >
//             Where Culinary Meets
//           </motion.span>
//           <motion.span
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
//             className="block bg-gradient-to-r from-gold via-yellow-400 to-orange-400 bg-clip-text text-transparent italic"
//           >
//             Sensory Memory
//           </motion.span>
//         </h1>

//         {/* Animated Subheadline */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1.2, delay: 0.5 }}
//           className="text-text-muted text-sm sm:text-lg max-w-xl leading-relaxed mt-4"
//         >
//           Embark on an immersive epicurean saga. Every plate tells a story, and every flavor orchestrates a memory handcrafted for our guests.
//         </motion.p>

//         {/* CTAs */}
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
//           className="flex flex-col sm:flex-row items-center gap-5 mt-8 w-full sm:w-auto"
//         >
//           <Link
//             href="/menu"
//             className="w-full sm:w-auto group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-gold to-yellow-600 px-8 py-4 text-xs font-bold uppercase tracking-widest text-background shadow-lg shadow-gold/20 hover:brightness-110 active:scale-[0.98] transition-all"
//             aria-label="Browse our culinary collection"
//           >
//             <span>Explore Menu</span>
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//           </Link>

//           <Link
//             href="/reservations"
//             className="w-full sm:w-auto group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300"
//             aria-label="Make a table booking"
//           >
//             <span>Reserve a Table</span>
//           </Link>
//         </motion.div>
//       </div>

//       {/* Cinematic scroll down indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.6 }}
//         transition={{ duration: 1, delay: 1 }}
//         className="absolute bottom-10 flex flex-col items-center gap-2 pointer-events-none"
//       >
//         <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold font-sans-luxury">
//           Scroll Down
//         </span>
//         <div className="w-[18px] h-[30px] rounded-full border border-white/20 flex justify-center p-1">
//           <motion.div
//             animate={{
//               y: [0, 8, 0],
//             }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//               ease: 'easeInOut',
//             }}
//             className="w-1 h-1 bg-gold rounded-full"
//           />
//         </div>
//       </motion.div>
//     </section>
//   );
// }


































// customer-frontend/src/features/hero/Hero.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Star,
  Clock3,
  ChefHat,
  Award
} from "lucide-react";

import { useEffect, useState } from "react";

export default function Hero() {

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {

    const move = (e: MouseEvent) => {

      setMouse({
        x: e.clientX,
        y: e.clientY
      });

    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);

  }, []);

  const floatingTags = [

    "Chef's Special",
    "Michelin Inspired",
    "Fresh Daily",
    "Luxury Dining",
    "Seasonal Menu",
    "Fine Cuisine"

  ];

  return (

    <section className="relative overflow-hidden min-h-screen bg-[#080808] text-white">

      {/* ------------------------------------------------ */}

      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            `radial-gradient(circle at ${mouse.x}px ${mouse.y}px,
rgba(214,170,64,.12),
transparent 35%)`
        }}
      />

      {/* ------------------------------------------------ */}

      <div className="absolute inset-0">

        <div className="absolute -left-60 top-0 h-[700px] w-[700px] rounded-full bg-yellow-500/10 blur-[160px]" />

        <div className="absolute right-[-200px] top-40 h-[600px] w-[600px] rounded-full bg-orange-500/10 blur-[180px]" />

        <div className="absolute bottom-[-200px] left-1/2 h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-[180px]" />

      </div>

      {/* Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-8">

        <div className="grid w-full gap-20 lg:grid-cols-2">

          {/* ================================================= */}

          {/* LEFT */}

          <div>

            {/* <motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:.8}}
className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-5 py-2"
>

<Sparkles className="h-4 w-4 text-yellow-400"/>

<span className="text-xs uppercase tracking-[0.35em] text-yellow-300">

Maison Culinaire

</span>

</motion.div> */}

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .2, duration: 1 }}
              className="mt-18 text-6xl font-serif leading-[1.05] md:text-8xl"
            >

              Where Fine Dining

              <br />

              <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-500 bg-clip-text text-transparent italic">

                Becomes Art

              </span>

            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .6 }}
              className="mt-4 max-w-xl text-lg leading-8 text-neutral-400"
            >

              Experience an immersive culinary journey where every
              dish is crafted with seasonal ingredients,
              world-class techniques,
              and unforgettable presentation.

            </motion.p>

            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                href="/menu"
                className="group rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-4 font-semibold text-black transition hover:scale-105"
              >

                Explore Menu

                <ArrowRight className="ml-2 inline h-4 w-4 transition group-hover:translate-x-1" />

              </Link>

              <Link
                href="/reservation"
                className="rounded-full border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-xl transition hover:bg-white/10"
              >

                Reserve Table

              </Link>

            </div>

            <div className="mt-10 grid grid-cols-3 gap-5">

              <div>

                <p className="text-4xl font-bold text-yellow-400">

                  15+

                </p>

                <p className="mt-2 text-sm text-neutral-500">

                  Signature Dishes

                </p>

              </div>

              <div>

                <p className="text-4xl font-bold text-yellow-400">

                  25K

                </p>

                <p className="mt-2 text-sm text-neutral-500">

                  Happy Guests

                </p>

              </div>

              <div>

                <p className="text-4xl font-bold text-yellow-400">

                  4.9★

                </p>

                <p className="mt-2 text-sm text-neutral-500">

                  Restaurant Rating

                </p>

              </div>

            </div>

          </div>

          {/* ================================================= */}

          {/* RIGHT */}

          <div className="relative flex items-center justify-center">

            <motion.div
              animate={{
                y: [0, -20, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity
              }}
              className="relative overflow-hidden rounded-[40px]"
            >

              <Image
                src="/images/hero-dish.jpg"
                alt="Fine Dining"
                width={650}
                height={820}
                className="rounded-[40px] object-cover"
              />
              {/* Dark Overlay */}

              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Floating Review Card */}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute left-6 top-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-5"
              >
                <div className="flex items-center gap-2">

                  <Award className="h-5 w-5 text-yellow-400" />

                  <span className="text-sm font-semibold">

                    Michelin Inspired

                  </span>

                </div>

                <div className="mt-3 flex text-yellow-400">

                  <Star className="h-4 w-4 fill-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400" />

                </div>

                <p className="mt-2 text-xs text-neutral-300">

                  Curated tasting experiences
                  crafted by our executive chef.

                </p>

              </motion.div>

              {/* Chef Card */}

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -right-10 bottom-10 w-72 rounded-3xl border border-yellow-500/20 bg-[#101010]/90 backdrop-blur-2xl p-6 shadow-2xl"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20">

                    <ChefHat className="h-6 w-6 text-yellow-400" />

                  </div>

                  <div>

                    <p className="font-semibold">

                      Chef's Selection

                    </p>

                    <p className="text-sm text-neutral-400">

                      Seasonal Collection

                    </p>

                  </div>

                </div>

                <p className="mt-5 text-sm leading-7 text-neutral-400">

                  Every plate is designed to tell a
                  story through locally sourced
                  ingredients, elegant presentation,
                  and unforgettable flavour.

                </p>

              </motion.div>

            </motion.div>

            {/* Floating Ingredient Tags */}

            {floatingTags.map((tag, index) => (

              <motion.div
                key={tag}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  y: [0, -12, 0]
                }}
                transition={{
                  duration: 5,
                  delay: index * 0.4,
                  repeat: Infinity
                }}
                className="absolute rounded-full border border-yellow-500/20 bg-black/50 backdrop-blur-xl px-5 py-2 text-xs tracking-widest uppercase text-yellow-300"
                style={{
                  top: `${15 + index * 12}%`,
                  left: index % 2 === 0 ? "-40px" : "85%",
                }}
              >

                {tag}

              </motion.div>

            ))}

          </div>

        </div>

      </div>

      {/* Bottom Scroll */}

      <motion.div
        animate={{
          y: [0, 12, 0]
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >

        <div className="flex flex-col items-center gap-3">

          <span className="text-xs uppercase tracking-[0.35em] text-neutral-500">

            Scroll

          </span>

          <div className="flex h-12 w-7 justify-center rounded-full border border-yellow-500/30 p-2">

            <div className="h-2 w-2 rounded-full bg-yellow-400" />

          </div>

        </div>

      </motion.div>

    </section>

  );
}