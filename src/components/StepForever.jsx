import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Sparkles, RotateCcw } from 'lucide-react'

const FUN_NO_TEXTS = [
  'No 🙈',
  'Arey socho toh sahi! 😜',
  'No ka option hi nahi hai! 😂',
  'Pakad ke dikhao pehle! 🏃‍♀️💨',
  'Nice try cutie! ❤️',
  'Sirf YES allowed hai! 🥰',
  'Galat button press ho raha hai! 🤭',
  'Maan jao na Pragati! 💍',
]

// Positions around the card that NEVER overlap the YES button
const CARD_DODGE_POSITIONS = [
  { x: -115, y: -62 },
  { x: 115, y: -62 },
  { x: -125, y: 12 },
  { x: 125, y: 12 },
  { x: -80, y: 68 },
  { x: 80, y: 68 },
  { x: -110, y: 55 },
  { x: 110, y: 55 },
  { x: 0, y: 72 },
  { x: 0, y: -65 },
]

export default function StepForever({ onRestart }) {
  const [noCount, setNoCount] = useState(0)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [hasMoved, setHasMoved] = useState(false)
  const [lastIndex, setLastIndex] = useState(-1)
  const [isAccepted, setIsAccepted] = useState(false)

  // Runaway / Dodging No button logic (Dodges cleanly around this card!)
  const dodgeNoButton = (e) => {
    // Prevent direct touch/click
    if (e && e.preventDefault) e.preventDefault()
    if (e && e.stopPropagation) e.stopPropagation()

    // Pick a new safe position around the card
    let nextIndex = Math.floor(Math.random() * CARD_DODGE_POSITIONS.length)
    if (nextIndex === lastIndex && CARD_DODGE_POSITIONS.length > 1) {
      nextIndex = (nextIndex + 1) % CARD_DODGE_POSITIONS.length
    }
    setLastIndex(nextIndex)

    const pos = CARD_DODGE_POSITIONS[nextIndex]
    const jitterX = (Math.random() - 0.5) * 14
    const jitterY = (Math.random() - 0.5) * 10

    setNoPosition({ x: pos.x + jitterX, y: pos.y + jitterY })
    setHasMoved(true)
    setNoCount((prev) => prev + 1)
  }

  // Handle YES button click
  const handleYes = () => {
    setIsAccepted(true)

    // Grand Romantic Celebration Fireworks
    const duration = 3.5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 35, spread: 360, ticks: 60, zIndex: 100 }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) {
        return clearInterval(interval)
      }
      const particleCount = 60 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24', '#a855f7', '#ffffff'],
      })
    }, 250)
  }

  const currentNoText = FUN_NO_TEXTS[noCount % FUN_NO_TEXTS.length]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg mx-auto text-center px-4 py-4 select-none"
    >
      <AnimatePresence mode="wait">
        {!isAccepted ? (
          /* QUESTION STAGE */
          <motion.div
            key="question-box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-2xl shadow-rose-200/50 space-y-6"
          >
            {/* Glowing Ring / Heart Graphic */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                rotate: [0, -3, 3, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 p-1 shadow-lg shadow-rose-300/60 flex items-center justify-center"
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl sm:text-5xl">
                💍
              </div>
            </motion.div>

            {/* Main Question */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-widest block">
                The Final & Most Important Question ✨
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-800 tracking-tight leading-tight">
                Can I be with you <br />
                <span className="font-handwriting text-4xl sm:text-5xl text-rose-600 block mt-1">
                  Forever? ❤️
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto leading-relaxed pt-1">
                Through every joy, every smile, every silly argument, and every lifetime.
              </p>
            </div>

            {/* Buttons Area */}
            <div className="relative pt-6 pb-12 flex items-center justify-center min-h-[160px]">
              {/* YES BUTTON (Grows bigger and more attractive!) */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-base sm:text-lg shadow-xl shadow-rose-300 hover:shadow-rose-400/80 transition-all flex items-center gap-2 z-20 cursor-pointer"
                style={{
                  transform: `scale(${1 + Math.min(noCount * 0.04, 0.3)})`,
                }}
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>YES, FOREVER! 🥰</span>
              </motion.button>

              {/* RUNAWAY / DODGING NO BUTTON (Dodges around this card!) */}
              <motion.button
                onMouseEnter={dodgeNoButton}
                onTouchStart={dodgeNoButton}
                onClick={dodgeNoButton}
                animate={
                  hasMoved
                    ? {
                        x: noPosition.x,
                        y: noPosition.y,
                        rotate: (Math.random() - 0.5) * 16,
                      }
                    : {}
                }
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                className={`px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs sm:text-sm border border-slate-300 shadow-md transition-colors cursor-pointer select-none whitespace-nowrap ${
                  hasMoved ? 'absolute z-30' : 'relative z-10 ml-3'
                }`}
                style={
                  hasMoved
                    ? {
                        position: 'absolute',
                      }
                    : {}
                }
              >
                {currentNoText}
              </motion.button>
            </div>

            {hasMoved && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-rose-500 font-semibold italic pt-2"
              >
                {noCount >= 3 ? "There's no escape from my love, Pragati! 😜❤️" : "Hey! Where are you trying to click? 🤭"}
              </motion.p>
            )}
          </motion.div>
        ) : (
          /* GRAND ROMANTIC CELEBRATION STAGE (AFTER YES) */
          <motion.div
            key="celebration-box"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 border-2 border-rose-300 shadow-2xl shadow-rose-300/60 space-y-6"
          >
            {/* Animated Celebration Badge */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-1 shadow-2xl shadow-rose-400/60 flex items-center justify-center text-5xl"
            >
              💍✨
            </motion.div>

            <div className="space-y-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-700 uppercase tracking-widest">
                Official Promise Sealed Forever 💖
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-slate-800 tracking-tight pt-2">
                SHE SAID YES! 🎉
              </h2>
              <p className="font-handwriting text-3xl sm:text-4xl text-rose-600 font-bold">
                Shantanu ❤️ Pragati
              </p>
            </div>

            {/* Sweet Vow Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 text-slate-700 text-sm sm:text-base leading-relaxed font-serif space-y-2 text-left">
              <p>
                "I knew it! You are officially stuck with me forever and ever. I promise to cherish you, protect your smile, buy you all the ice creams, and love you more with every single heartbeat."
              </p>
              <p className="font-bold text-rose-700 text-xs sm:text-sm text-right">
                — Always & Forever Yours, Shantanu 💕
              </p>
            </div>

            {/* Restart Journey Button */}
            <div className="pt-2">
              <button
                onClick={onRestart}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors py-2 px-5 rounded-full border border-slate-200 hover:border-rose-200 bg-white shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Experience Our Birthday Surprise Again</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
