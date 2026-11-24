import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Sparkles, Heart, ChevronRight, Wind } from 'lucide-react'

export default function StepCake({ onNext }) {
  const [candlesBlown, setCandlesBlown] = useState(false)
  const [cakeCut, setCakeCut] = useState(false)

  const blowCandles = () => {
    if (candlesBlown) return
    setCandlesBlown(true)

    // Trigger sparkles confetti
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#f43f5e', '#ec4899', '#ffffff']
    })
  }

  const cutCake = () => {
    if (!candlesBlown) {
      blowCandles()
    }
    setCakeCut(true)

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b']
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg mx-auto text-center px-4"
    >
      <div className="space-y-2 mb-6">
        <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">
          Make A Wish, Birthday Girl ✨
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800">
          Virtual Cake Cutting Ceremony 🎂
        </h2>
        <p className="text-sm text-slate-600">
          {!candlesBlown
            ? 'Tap the candles to blow them out & make a silent wish!'
            : !cakeCut
            ? 'Now tap the button to cut your delicious birthday cake!'
            : 'Happy Birthday Pragati! The first slice is all yours ❤️'}
        </p>
      </div>

      {/* The Interactive Cake Illustration */}
      <div className="relative my-6 sm:my-8 py-4 sm:py-6 select-none flex flex-col items-center justify-center">
        {/* Cake Graphic Wrapper */}
        <div className="relative inline-flex flex-col items-center max-w-full">
          {/* Candles Container */}
          <div className="flex justify-center items-end gap-3.5 sm:gap-5 mb-1 cursor-pointer" onClick={blowCandles}>
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center relative group">
                {/* Flame */}
                <AnimatePresence>
                  {!candlesBlown ? (
                    <motion.div
                      exit={{ opacity: 0, y: -10, scale: 0.5 }}
                      transition={{ duration: 0.4 }}
                      className="w-3.5 sm:w-4 h-5 sm:h-6 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white flame-animation shadow-lg shadow-amber-300/80 mb-1"
                    />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: [0, 0.8, 0], y: -20 }}
                      transition={{ duration: 1 }}
                      className="text-xs text-slate-400 font-bold mb-1"
                    >
                      💨
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Candle Stick */}
                <div
                  className={`w-3 sm:w-3.5 h-9 sm:h-12 rounded-t-sm shadow-sm transition-colors ${
                    i === 1
                      ? 'bg-gradient-to-b from-pink-300 to-rose-400'
                      : 'bg-gradient-to-b from-amber-200 to-amber-400'
                  }`}
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.6) 4px, rgba(255,255,255,0.6) 8px)',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Cake Tier 1 (Top Tier) */}
          <div className="relative w-36 sm:w-44 h-14 sm:h-16 bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 rounded-t-2xl border-t-4 border-rose-300 shadow-md flex items-center justify-center overflow-hidden">
            {/* Strawberry Frosting Drips */}
            <div className="absolute top-0 inset-x-0 flex justify-around">
              <span className="w-4 sm:w-5 h-3.5 sm:h-4 bg-rose-400 rounded-b-full shadow-sm" />
              <span className="w-5 sm:w-6 h-5 sm:h-6 bg-rose-400 rounded-b-full shadow-sm" />
              <span className="w-4 sm:w-5 h-3 bg-rose-400 rounded-b-full shadow-sm" />
              <span className="w-6 sm:w-7 h-4 sm:h-5 bg-rose-400 rounded-b-full shadow-sm" />
              <span className="w-4 sm:w-5 h-3.5 sm:h-4 bg-rose-400 rounded-b-full shadow-sm" />
            </div>
            <span className="text-lg sm:text-xl">🍓 🍓 🍓</span>
          </div>

          {/* Cake Tier 2 (Bottom Tier) */}
          <div className="relative w-52 sm:w-64 h-20 sm:h-24 bg-gradient-to-r from-amber-100 via-rose-50 to-pink-100 rounded-2xl border-t-4 border-pink-300 shadow-xl flex flex-col items-center justify-center -mt-1 overflow-hidden">
            {/* Frosting Drips */}
            <div className="absolute top-0 inset-x-0 flex justify-around">
              <span className="w-5 sm:w-6 h-4 sm:h-5 bg-pink-400 rounded-b-full shadow-sm" />
              <span className="w-6 sm:w-7 h-6 sm:h-7 bg-pink-400 rounded-b-full shadow-sm" />
              <span className="w-5 sm:w-6 h-3.5 sm:h-4 bg-pink-400 rounded-b-full shadow-sm" />
              <span className="w-7 sm:w-8 h-5 sm:h-6 bg-pink-400 rounded-b-full shadow-sm" />
              <span className="w-5 sm:w-6 h-4 sm:h-5 bg-pink-400 rounded-b-full shadow-sm" />
              <span className="w-6 sm:w-7 h-5 sm:h-6 bg-pink-400 rounded-b-full shadow-sm" />
            </div>

            <span className="font-handwriting text-xl sm:text-2xl text-rose-600 font-bold z-10 mt-2 sm:mt-3">
              Pragati
            </span>
            <span className="text-[10px] sm:text-xs text-rose-400 tracking-wider font-semibold z-10">
              ★ Sweetest Girl ★
            </span>
          </div>

          {/* Cake Stand Plate */}
          <div className="w-60 sm:w-72 h-3.5 sm:h-4 bg-gradient-to-r from-slate-200 via-white to-slate-200 rounded-full shadow-lg border border-slate-300 -mt-1" />

          {/* Cut Slice Animation (Guaranteed inside screen on all mobile sizes) */}
          {cakeCut && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 18 }}
              className="absolute right-0 sm:-right-8 top-6 sm:top-10 z-30 bg-white/95 backdrop-blur-md px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl shadow-xl border-2 border-rose-300 text-center select-none"
            >
              <span className="text-2xl sm:text-3xl block mb-0.5">🍰</span>
              <span className="text-[10px] sm:text-xs font-bold text-rose-600 uppercase tracking-wider block whitespace-nowrap">
                First Slice!
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pb-8 sm:pb-2">
        {!candlesBlown ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={blowCandles}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-amber-200 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Wind className="w-4 h-4" />
            <span>Blow the Candles 🕯️</span>
          </motion.button>
        ) : !cakeCut ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={cutCake}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-rose-200 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <span>Cut The Cake with Knife 🔪🎂</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-4 rounded-2xl bg-rose-100/70 border border-rose-200 text-rose-800 text-sm font-medium">
              ✨ Wish made! May this year bring you all the love and happiness in the world! ❤️
            </div>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onNext}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-semibold text-base shadow-lg shadow-rose-300 hover:shadow-rose-400/60 transition-all flex items-center justify-center gap-3 mx-auto group"
            >
              <span>Our Memory Lane 📸</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

