import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Cake, Sparkles, Heart, ChevronRight, PartyPopper } from 'lucide-react'

export default function StepCelebration({ onNext }) {
  useEffect(() => {
    // Grand celebration fireworks
    const duration = 2.5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) {
        return clearInterval(interval)
      }
      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#f43f5e', '#ec4899', '#f59e0b', '#8b5cf6', '#10b981'],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#f43f5e', '#ec4899', '#f59e0b', '#8b5cf6', '#10b981'],
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg mx-auto text-center px-4"
    >
      {/* Decorative badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold tracking-wide shadow-sm mb-6"
      >
        <PartyPopper className="w-4 h-4 text-rose-500" />
        <span>Today is the Most Special Day 🎉</span>
      </motion.div>

      {/* Main Birthday Title */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold text-slate-800 tracking-tight leading-tight mb-4"
      >
        Happy Birthday, <br />
        <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent font-handwriting text-5xl sm:text-6xl md:text-7xl block mt-2">
          My Pragati ❤️
        </span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-slate-600 text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-8"
      >
        Wishing the most incredible, beautiful, and sweetest girl the happiest birthday ever. 
        You bring endless sunshine and laughter into my world every single day.
      </motion.p>

      {/* Sweet Highlights Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-100/50 mb-8 space-y-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">Another Year of Being Wonderful</h4>
            <p className="text-xs text-slate-500">More smiles, more adventures, more memories together.</p>
          </div>
        </div>

        <div className="h-px bg-rose-100 w-full" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500">
            <Sparkles className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">You Deserve All The Happiness</h4>
            <p className="text-xs text-slate-500">Today and every day, I promise to make you smile.</p>
          </div>
        </div>
      </motion.div>

      {/* Next Step Button */}
      <motion.button
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onNext}
        className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-semibold text-base shadow-lg shadow-rose-300 hover:shadow-rose-400/60 transition-all flex items-center justify-center gap-3 mx-auto group"
      >
        <Cake className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span>Time to Cut Your Cake! 🍰</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </motion.div>
  )
}

