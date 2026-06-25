// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChefHat,
  Layers,
  CheckCircle,
  Archive,
  Wifi,
  WifiOff,
  Sparkles,
  ExternalLink,
  Info
} from 'lucide-react';

const BACKEND_URL = 'http://localhost:3001';

export default function App() {
  const [dishes, setDishes] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [error, setError] = useState(null);

  // Mouse tracking for dynamic ambient glow orb
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Fetch initial state & setup WebSockets
  useEffect(() => {
    // 1. Hydrate state
    const fetchDishes = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/dishes`);
        if (!response.ok) throw new Error('Failed to fetch dishes');
        const data = await response.json();
        setDishes(data);
      } catch (err) {
        console.error('Error fetching initial dishes:', err);
        setError('Could not connect to the backend server. Make sure it is running on port 3001.');
      }
    };

    fetchDishes();

    // 2. Initialize socket
    const socket = io(BACKEND_URL, {
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    socket.on('connect', () => {
      setIsConnected(true);
      setError(null);
      console.log('[Socket] Connected to backend');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('[Socket] Disconnected from backend');
    });

    socket.on('connect_error', () => {
      setIsConnected(false);
      console.log('[Socket] Connection error');
    });

    // 3. Listen to real-time dish updates
    socket.on('dish:updated', (updatedDish) => {
      console.log('[Socket] Received dish update:', updatedDish);
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dishId === updatedDish.dishId ? updatedDish : dish
        )
      );
    });

    // Clean up on component unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.off('dish:updated');
      socket.disconnect();
    };
  }, []);

  // Handle toggling state manually
  const handleToggle = async (dishId) => {
    // Optimistic update for fluid UI feedback
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish.dishId === dishId ? { ...dish, isPublished: !dish.isPublished } : dish
      )
    );

    try {
      const response = await fetch(`${BACKEND_URL}/api/dishes/${dishId}/toggle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to toggle status');
      }
      // Note: We don't manually set state here because the backend will broadcast the update,
      // which we receive via the 'dish:updated' WebSocket listener.
    } catch (err) {
      console.error('[API] Error toggling status:', err);
      // Revert state on error
      setError('Failed to update dish status on the server. Reverting action.');
      const response = await fetch(`${BACKEND_URL}/api/dishes`);
      if (response.ok) {
        const data = await response.json();
        setDishes(data);
      }
    }
  };

  // Metrics
  const totalItems = dishes.length;
  const liveItems = dishes.filter(d => d.isPublished).length;
  const hiddenItems = dishes.filter(d => !d.isPublished).length;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-hidden pb-20">
      {/* Ambient Mouse-Tracking Glow Orb */}
      <div
        className="ambient-glow-orb fixed pointer-events-none"
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
      />

      {/* Decorative Top Mesh Background */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-900/10 via-emerald-950/5 to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Sticky/Floating Control Header */}
        <header className="sticky top-4 z-50 mt-4 mb-12">
          <div className="glass-morphic rounded-2xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            {/* <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-indigo-600 rounded-xl shadow-lg shadow-indigo-500/10">
                <ChefHat className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  L'Étoile Dashboard
                </h1>
                <p className="text-xs text-slate-400 font-medium">Luxury Culinary Menu Engine</p>
              </div>
            </div> */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/20">
                <ChefHat className="w-6 h-6 text-white" />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                  Culinary Control Center
                </h1>

                <div className="flex items-center gap-2 mt-1">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-xs text-slate-400">
                    Real-time Menu & Operations Management
                  </p>
                </div>
              </div>
            </div>

            {/* Metrics Display */}
            <div className="flex flex-wrap items-center gap-6 md:gap-8">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Items:</span>
                <span className="text-sm font-bold text-white bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/50">{totalItems}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-neon-pulse" />
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Live Menu:</span>
                <span className="text-sm font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-800/30">{liveItems}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-neon-pulse-amber" />
                <Archive className="w-4 h-4 text-amber-500" />
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Archive:</span>
                <span className="text-sm font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-900/30">{hiddenItems}</span>
              </div>
            </div>

            {/* Network Sync Status */}
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${isConnected
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
              {isConnected ? (
                <>
                  <Wifi className="w-3.5 h-3.5 animate-pulse" />
                  <span>Real-Time Synced</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 animate-bounce" />
                  <span>Offline / Reconnecting</span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Global Error Banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-8 p-4 bg-red-950/60 border border-red-800/40 text-red-200 rounded-xl flex items-start gap-3 backdrop-blur-md"
          >
            <Info className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-bold">Sync Warning: </span>
              {error}
            </div>
          </motion.div>
        )}

        {/* Cinematic Subheading Banner */}
        {/* <div className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-900 pb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2 justify-center md:justify-start">
              <span>Chef's Luxury Collection</span>
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Manage luxury culinary menu publications. Toggle menu options to instantly sync state across guests' digital menus and tables in real-time.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-indigo-400 bg-indigo-950/20 border border-indigo-900/30 px-4 py-2 rounded-xl">
            <span className="font-mono bg-indigo-900/40 px-1.5 py-0.5 rounded text-white font-bold">Demo Loop:</span>
            <span>Server flips a random dish status every 30s to demonstrate live updates.</span>
          </div>
        </div> */}

        <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>

              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Luxury Menu Management
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Curate, manage, and publish premium dining experiences across all digital touchpoints.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium text-emerald-300">
              Live Synchronization Active
            </span>
          </div>
        </div>

        {/* Asymmetric Responsive Grid using Framer Motion */}
        {dishes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <ChefHat className="w-16 h-16 mb-4 stroke-1 animate-pulse" />
            <p className="text-lg">No dishes found. Attempting hydration...</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {dishes.map((dish, index) => {
                const isPublished = dish.isPublished;
                // Luxury editorial layout - let's make every 3rd card span 2 columns on larger screens
                const isFeatured = index % 3 === 0;

                return (
                  <motion.div
                    key={dish.dishId}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className={`group relative rounded-2xl overflow-hidden glass-morphic transition-all duration-500 ${isPublished ? 'glass-card-glow-active border-emerald-900/30' : 'glass-card-glow-inactive border-amber-900/20'
                      } ${isFeatured ? 'md:col-span-2' : ''}`}
                  >
                    {/* Inner Content Card Box */}
                    <div className="h-full flex flex-col justify-between">
                      {/* Image Container with scale and grayscale/darkness integration */}
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                        {/* Image overlay gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-80" />
                        <div className="absolute inset-0 bg-slate-950/20 z-10 group-hover:bg-slate-950/0 transition-colors duration-300" />

                        <img
                          src={dish.imageUrl}
                          alt={dish.dishName}
                          className={`w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out z-0 ${isPublished
                            ? 'grayscale-0 contrast-100'
                            : 'grayscale contrast-75 brightness-[0.4]'
                            }`}
                          onError={(e) => {
                            // Backup placeholder if Unsplash fails
                            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
                          }}
                        />

                        {/* Top Indicators on image */}
                        {/* <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                          {isPublished ? (
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                              Live Menu
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-neon-pulse-amber" />
                              Archived
                            </span>
                          )}
                        </div> */}

                        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
                          {/* Status Badge */}
                          <div
                            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 backdrop-blur-xl border shadow-lg transition-all duration-300
      ${isPublished
                                ? "bg-emerald-500/90 border-emerald-300/30 text-white shadow-emerald-500/30"
                                : "bg-slate-900/80 border-slate-700 text-slate-300"
                              }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${isPublished ? "bg-white animate-pulse" : "bg-amber-400"
                                }`}
                            />

                            <span className="text-[11px] font-semibold tracking-wide">
                              {isPublished ? "Published" : "Draft"}
                            </span>
                          </div>

                          {/* Featured Badge */}
                          {isFeatured && (
                            <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 px-3 py-1.5 text-slate-900 shadow-lg">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span className="text-[11px] font-bold uppercase tracking-wide">
                                Chef's Pick
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="absolute top-4 right-4 z-20">
                          <span className="font-mono text-[10px] text-slate-400 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
                            {dish.dishId}
                          </span>
                        </div>
                      </div>

                      {/* Detail Section */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className={`text-xl font-bold tracking-tight text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300 ${!isPublished && 'text-slate-400'
                            }`}>
                            {dish.dishName}
                          </h3>
                          <p className="text-xs text-slate-400 leading-relaxed mb-6 font-medium">
                            {isFeatured
                              ? "An exquisite curation crafted by our executive culinary team, utilizing rare local delicacies and gold-standard gastronomic methods."
                              : "Expertly constructed seasonal ingredients cooked to flawless perfection."}
                          </p>
                        </div>

                        {/* Control Elements */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-900">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Menu Publication</span>
                            <span className={`text-xs font-semibold mt-0.5 ${isPublished ? 'text-emerald-400' : 'text-slate-400'
                              }`}>
                              {isPublished ? 'Published & Active' : 'Hidden from Guests'}
                            </span>
                          </div>

                          {/* Tactile Slider Custom Switch */}
                          <button
                            onClick={() => handleToggle(dish.dishId)}
                            className="relative w-12 h-6.5 rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none"
                            style={{
                              backgroundColor: isPublished ? '#10b981' : '#334155', // Emerald or Slate Grey
                              boxShadow: isPublished ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none'
                            }}
                            aria-label={`Toggle publish state for ${dish.dishName}`}
                          >
                            <motion.div
                              layout
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                              }}
                              className="w-4.5 h-4.5 rounded-full bg-white shadow-md"
                              animate={{
                                x: isPublished ? 22 : 0
                              }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
