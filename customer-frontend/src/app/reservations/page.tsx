'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Reservation } from '../../types';
import { submitReservation } from '../../services/api';
import Footer from '../../features/footer/Footer';
import { Calendar, Users, MapPin, Clock, Sparkles, AlertCircle, CheckCircle2, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Schema validation using Zod
const reservationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  date: z.string().refine((val) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(val);
    return selectedDate >= today;
  }, { message: 'Date cannot be in the past.' }),
  time: z.string().refine((val) => {
    const [hours, minutes] = val.split(':').map(Number);
    const timeValue = hours + minutes / 60;
    // Dinner operational hours: 17:00 (5:00 PM) to 22:30 (10:30 PM)
    return timeValue >= 17 && timeValue <= 22.5;
  }, { message: 'Seating times must be between 17:00 and 22:30.' }),
  guests: z.number().min(1, { message: 'Minimum 1 guest.' }).max(8, { message: 'Atelier seat limit is 8 per party.' }),
  seatingPreference: z.enum(['indoor', 'outdoor', 'bar', 'chefs-table']),
  specialRequests: z.string().optional(),
});

type FormData = z.infer<typeof reservationSchema>;

export default function ReservationsPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [reservedDetails, setReservedDetails] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: 2,
      seatingPreference: 'indoor',
    },
  });

  const onSubmit = async (data: FormData) => {
    setErrorMsg('');
    try {
      // Map data to the types format
      const reservationData: Reservation = {
        ...data,
      };

      const result = await submitReservation(reservationData);
      setBookingRef(result.bookingId);
      setReservedDetails(data);
      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to submit reservation. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col pt-32">
      {/* Title */}
      <h1 className="sr-only">Maison Culinaire Table Reservations</h1>

      {/* Decorative background orb */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 flex-1 w-full pb-24 relative z-10">
        
        {/* Animated Success Overlay Ticket */}
        <AnimatePresence mode="wait">
          {isSuccess && reservedDetails ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-morphic bg-surface/30 border border-gold/20 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center gap-6 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold animate-bounce">
                <Ticket className="w-8 h-8" />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold font-sans-luxury">
                  Reservation Confirmed
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-white">
                  Welcome to the Atelier
                </h2>
              </div>

              <div className="w-full h-[1px] bg-white/10 my-4" />

              {/* Reservation Receipt Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full text-left bg-background/50 border border-white/5 p-6 rounded-2xl">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold block mb-1">
                    Guest Name
                  </span>
                  <span className="text-sm font-bold text-white font-sans-luxury">{reservedDetails.name}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold block mb-1">
                    Co-Seating
                  </span>
                  <span className="text-sm font-bold text-white font-sans-luxury">{reservedDetails.guests} guests</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold block mb-1">
                    Date
                  </span>
                  <span className="text-sm font-bold text-white font-sans-luxury">{reservedDetails.date}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold block mb-1">
                    Hour
                  </span>
                  <span className="text-sm font-bold text-white font-sans-luxury">{reservedDetails.time}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 w-full">
                <div className="flex-1 text-left">
                  <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold block mb-1">
                    Seating preference
                  </span>
                  <span className="text-xs text-gold uppercase tracking-widest font-bold">
                    {reservedDetails.seatingPreference.replace('-', ' ')}
                  </span>
                </div>
                <div className="sm:text-right w-full sm:w-auto">
                  <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold block mb-1">
                    Atelier Booking ID
                  </span>
                  <span className="font-mono text-lg font-bold text-white border border-gold/30 px-3 py-1 rounded bg-gold/5">
                    {bookingRef}
                  </span>
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/10 my-4" />

              <p className="text-xs text-text-muted max-w-md leading-relaxed">
                A luxury reservation voucher has been transmitted to <span className="text-white font-semibold">{reservedDetails.email}</span>. Kindly arrive 10 minutes prior to orchestrate table staging.
              </p>

              <button
                onClick={() => setIsSuccess(false)}
                className="mt-6 border border-white/10 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-white hover:bg-white/5 hover:border-white/20 transition-all focus-visible:outline-none"
              >
                Book Another Table
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-12"
            >
              {/* Form Heading Header */}
              <div className="text-center max-w-xl mx-auto">
                <span className="text-xs uppercase tracking-widest text-gold font-sans-luxury font-bold block mb-3">
                  Atelier Bookings
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
                  Secure Your Seating
                </h2>
                <div className="w-12 h-[1px] bg-gold/50 mx-auto mt-5" />
              </div>

              {errorMsg && (
                <div className="p-4 bg-red-950/60 border border-red-800/40 text-red-200 rounded-xl flex items-center gap-3 backdrop-blur-md">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span className="text-xs font-medium">{errorMsg}</span>
                </div>
              )}

              {/* Booking Form Layout */}
              <form onSubmit={handleSubmit(onSubmit)} className="glass-morphic bg-surface/20 border border-white/5 rounded-3xl p-6 sm:p-12 flex flex-col gap-6 shadow-2xl">
                
                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-text-muted font-bold font-sans-luxury">
                      Your Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      className={`w-full bg-surface/40 border rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:ring-1 transition-all ${
                        errors.name ? 'border-red-500/50 focus:ring-red-500/10' : 'border-white/5 focus:border-gold/50 focus:ring-gold/15'
                      }`}
                      placeholder="e.g. Eleanor Vance"
                    />
                    {errors.name && (
                      <span className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-text-muted font-bold font-sans-luxury">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className={`w-full bg-surface/40 border rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:ring-1 transition-all ${
                        errors.email ? 'border-red-500/50 focus:ring-red-500/10' : 'border-white/5 focus:border-gold/50 focus:ring-gold/15'
                      }`}
                      placeholder="e.g. eleanor@vance.com"
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2: Date and Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="text-[10px] uppercase tracking-widest text-text-muted font-bold font-sans-luxury">
                      Preferred Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      {...register('date')}
                      className={`w-full bg-surface/40 border rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:ring-1 transition-all ${
                        errors.date ? 'border-red-500/50 focus:ring-red-500/10' : 'border-white/5 focus:border-gold/50 focus:ring-gold/15'
                      }`}
                    />
                    {errors.date && (
                      <span className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.date.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="time" className="text-[10px] uppercase tracking-widest text-text-muted font-bold font-sans-luxury">
                      Dinner Hour (17:00 - 22:30)
                    </label>
                    <input
                      id="time"
                      type="time"
                      {...register('time')}
                      className={`w-full bg-surface/40 border rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:ring-1 transition-all ${
                        errors.time ? 'border-red-500/50 focus:ring-red-500/10' : 'border-white/5 focus:border-gold/50 focus:ring-gold/15'
                      }`}
                    />
                    {errors.time && (
                      <span className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.time.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 3: Seating Preference and Guests Count */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="guests" className="text-[10px] uppercase tracking-widest text-text-muted font-bold font-sans-luxury">
                      Co-Seating Party Size
                    </label>
                    <select
                      id="guests"
                      {...register('guests', { valueAsNumber: true })}
                      className={`w-full bg-surface/40 border rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:ring-1 transition-all border-white/5 focus:border-gold/50 focus:ring-gold/15`}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num} className="bg-surface text-white">
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                    {errors.guests && (
                      <span className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.guests.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="seatingPreference" className="text-[10px] uppercase tracking-widest text-text-muted font-bold font-sans-luxury">
                      Seating Environment
                    </label>
                    <select
                      id="seatingPreference"
                      {...register('seatingPreference')}
                      className={`w-full bg-surface/40 border rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:ring-1 transition-all border-white/5 focus:border-gold/50 focus:ring-gold/15`}
                    >
                      <option value="indoor" className="bg-surface text-white">Grand Dining Hall (Indoor)</option>
                      <option value="outdoor" className="bg-surface text-white">Rose Garden Canopy (Outdoor)</option>
                      <option value="bar" className="bg-surface text-white">The Whiskey Lounge (Bar)</option>
                      <option value="chefs-table" className="bg-surface text-white">Chef's Gastronomy Table</option>
                    </select>
                    {errors.seatingPreference && (
                      <span className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.seatingPreference.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Textarea: Special Requests */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="specialRequests" className="text-[10px] uppercase tracking-widest text-text-muted font-bold font-sans-luxury">
                    Special Accommodations (Optional)
                  </label>
                  <textarea
                    id="specialRequests"
                    {...register('specialRequests')}
                    rows={4}
                    className="w-full bg-surface/40 border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white placeholder-text-muted/65 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/15 transition-all resize-none"
                    placeholder="Allergies, dietary mandates, or anniversary specifications..."
                  />
                </div>

                {/* CTA Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-gold to-yellow-600 py-4 text-xs font-bold uppercase tracking-widest text-background shadow-lg shadow-gold/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                      Validating Credentials...
                    </span>
                  ) : (
                    <>
                      <span>Secure Table Reservation</span>
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
