import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Cake, Sparkles, Heart, ChevronRight, PartyPopper } from 'lucide-react'

// All real uploaded photos of Pragati & Shantanu
const MEMORY_PHOTOS = [
  '/photo1.jpg',
  '/photo2.jpg',
  '/photo3.jpg',
  '/photo4.jpg',
  '/photo5.jpg',
  '/photo6.jpg',
  '/photo7.jpg',
  '/photo8.jpg',
  '/photo9.jpg',
  '/photo10.jpg',
  '/photo11.jpg',
  '/photo12.jpg',
  '/photo13.jpg',
  '/photo14.jpg',
  '/photo16.jpg',
  '/photo17.jpg',
  '/photo18.jpg',
]

export default function StepCelebration({ onNext }) {
  // Countdown states
  const [isCounting, setIsCounting] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const [showFloatingMemories, setShowFloatingMemories] = useState(false)

  // Floating photos randomized configurations
  const [floatingItems, setFloatingItems] = useState([])

  useEffect(() => {
    // Generate randomized positions & speeds for all photos
    const items = MEMORY_PHOTOS.map((url, i) => ({
      id: i,
      url,
      left: 5 + (i * 92) / MEMORY_PHOTOS.length + (Math.random() * 6 - 3),
      size: Math.floor(Math.random() * 20 + 90), // 90px to 110px
      duration: Math.random() * 4 + 7, // 7s to 11s float time
      delay: Math.random() * 3, // staggered delay
      rotation: Math.random() * 24 - 12,
    }))
    setFloatingItems(items)
  }, [])

  // Initial welcome confetti on mount
  useEffect(() => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#f59e0b', '#8b5cf6'],
    })
  }, [])

  // 10-Second Countdown Timer logic
  useEffect(() => {
    let timer
    if (isCounting && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else if (isCounting && countdown === 0) {
      // Countdown reached 0! Trigger Grand Climax Celebration!
      setShowFloatingMemories(true)

      // Massive fireworks confetti burst
      const end = Date.now() + 3000
      const colors = ['#f43f5e', '#fb7185', '#ec4899', '#fbbf24', '#ffffff']

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        })
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }
      frame()
    }

    return () => clearTimeout(timer)
  }, [isCounting, countdown])

  const handleStartCountdown = () => {
    setIsCounting(true)
    setCountdown(10)
  }

  // Romantic hint messages during countdown
  const getCountdownMessage = () => {
    if (countdown >= 8) return 'Get ready for something magical, Pragati... ✨'
    if (countdown >= 5) return 'Hold your breath, your surprise is arriving... 💖'
    if (countdown >= 2) return 'A special memory shower coming in 3... 2... 1... ❤️'
    return 'HAPPY BIRTHDAY MY PRAGATI! 🎉🎂'
  }

  return (
    <>
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

        {/* Action Button: Triggers 10s Countdown & Floating Memories */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleStartCountdown}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-semibold text-base shadow-lg shadow-rose-300 hover:shadow-rose-400/60 transition-all flex items-center justify-center gap-3 mx-auto group"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>Time to Cut Your Cake! 🍰</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>

      {/* FULL-SCREEN 10-SECOND COUNTDOWN OVERLAY */}
      <AnimatePresence>
        {isCounting && !showFloatingMemories && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-rose-950/75 backdrop-blur-md px-4 text-center select-none"
          >
            {/* Glowing countdown circle */}
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-1 shadow-2xl shadow-rose-500/80 flex items-center justify-center mb-6"
            >
              <div className="w-full h-full rounded-full bg-slate-900/90 flex flex-col items-center justify-center border border-rose-300/40">
                <span className="font-serif text-6xl sm:text-7xl font-bold text-white tracking-tight">
                  {countdown}
                </span>
                <span className="text-[10px] text-rose-300 font-semibold uppercase tracking-widest mt-1">
                  Seconds
                </span>
              </div>
            </motion.div>

            {/* Hint Message */}
            <motion.p
              key={`msg-${countdown}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-white text-base sm:text-xl font-medium max-w-sm"
            >
              {getCountdownMessage()}
            </motion.p>

            <span className="text-xs text-rose-300/80 mt-4">
              Hold on tight... something special is coming! 💖
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING PHOTOS MAGIC SCREEN (Triggered immediately when countdown hits 0) */}
      <AnimatePresence>
        {showFloatingMemories && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-hidden bg-rose-950/60 backdrop-blur-sm pointer-events-auto flex flex-col justify-between items-center py-6 px-4"
          >
            {/* Floating Memory Polaroid Balloons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {floatingItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{
                    y: '105vh',
                    x: `${item.left}vw`,
                    rotate: item.rotation,
                    opacity: 0,
                  }}
                  animate={{
                    y: '-25vh',
                    opacity: [0, 1, 1, 0.8],
                    rotate: [item.rotation, item.rotation + 8, item.rotation - 8, item.rotation],
                  }}
                  transition={{
                    duration: item.duration,
                    delay: item.delay,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute p-2 pb-4 bg-white/95 rounded-2xl shadow-2xl border-2 border-rose-200 flex flex-col items-center"
                  style={{ width: `${item.size}px` }}
                >
                  <img
                    src={item.url}
                    alt="Memory"
                    className="w-full aspect-square object-cover rounded-xl"
                  />
                  <span className="text-[9px] font-handwriting text-rose-600 font-bold mt-1">
                    ❤️ Us Forever
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Central Celebration Card */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="relative z-20 my-auto bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-2xl border-2 border-rose-300 max-w-sm text-center space-y-4"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 flex items-center justify-center text-3xl shadow-inner">
                🎂
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
                  Our Special Journey ✨
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800">
                  Every Second With You is a Celebration ❤️
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  Look at all our beautiful memories floating around you! Now it's time for the birthday cake! 
                </p>
              </div>

              {/* Button to proceed to the Cake */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onNext}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-300 flex items-center justify-center gap-2"
              >
                <Cake className="w-5 h-5" />
                <span>Let's Cut Your Cake, Pragati! 🍰</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            {/* Bottom floating hint */}
            <div className="relative z-20 text-[11px] text-white/80 font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
              ✨ Watch your photos floating in the air ✨
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
