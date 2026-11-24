import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Sparkles, ChevronRight, RotateCw } from 'lucide-react'

const REASONS = [
  {
    id: 1,
    emoji: '🌸',
    title: 'Your Beautiful Smile',
    desc: 'The way your whole face lights up when you smile — it can brighten even my darkest and most exhausting days.',
    hint: 'Reason #1',
  },
  {
    id: 2,
    emoji: '✨',
    title: 'The Purest Heart',
    desc: 'How deeply you care about the people around you. Your kindness and warmth are rare and precious.',
    hint: 'Reason #2',
  },
  {
    id: 3,
    emoji: '🌙',
    title: 'My Safest Place',
    desc: 'With you, I can be 100% myself without pretending. You are my peace, my home, and my comfort zone.',
    hint: 'Reason #3',
  },
  {
    id: 4,
    emoji: '🧸',
    title: 'Your Cute Habits',
    desc: 'The little funny faces you make, the way you laugh at your own jokes — everything about you is adorable.',
    hint: 'Reason #4',
  },
  {
    id: 5,
    emoji: '💌',
    title: 'Our Unspoken Bond',
    desc: 'How you just look into my eyes and know exactly what is going on in my head before I even say a single word.',
    hint: 'Reason #5',
  },
  {
    id: 6,
    emoji: '👑',
    title: 'Simply You',
    desc: 'Because out of 8 billion people on this planet, you are the only one my heart chose and will always choose.',
    hint: 'Reason #6',
  },
]

export default function StepReasons({ onNext }) {
  // Store which cards are currently flipped
  const [flippedIds, setFlippedIds] = useState([])
  // Store active bursting hearts for each card
  const [cardHeartBursts, setCardHeartBursts] = useState({})

  const toggleFlip = (id) => {
    const isNowFlipped = !flippedIds.includes(id)

    setFlippedIds((prev) =>
      isNowFlipped ? [...prev, id] : prev.filter((item) => item !== id)
    )

    // Trigger Heart Pop-up animation when flipping open!
    if (isNowFlipped) {
      const burstKey = Date.now()
      setCardHeartBursts((prev) => ({
        ...prev,
        [id]: burstKey,
      }))
    }
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
        <span className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          A Few Words From My Heart
        </span>
        <h2 className="text-3xl font-serif font-bold text-slate-800">
          Reasons Why I Love You 💖
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Tap each card to flip it and reveal the secret love note! ({flippedIds.length}/{REASONS.length} revealed)
        </p>
      </div>

      {/* Grid of 3D Flip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {REASONS.map((item) => {
          const isFlipped = flippedIds.includes(item.id)
          const burstKey = cardHeartBursts[item.id]

          return (
            <div
              key={item.id}
              className="relative h-44 w-full cursor-pointer select-none"
              style={{ perspective: '1000px' }}
              onClick={() => toggleFlip(item.id)}
            >
              {/* Floating Heart Popups on Flip */}
              <AnimatePresence>
                {burstKey && (
                  <div key={burstKey} className="absolute inset-0 pointer-events-none z-30">
                    {[-25, -10, 0, 15, 25].map((xOffset, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 1, y: 30, x: 0, scale: 0.4 }}
                        animate={{
                          opacity: [1, 1, 0],
                          y: -60 - i * 12,
                          x: xOffset * 1.8,
                          scale: [0.5, 1.4, 0.8],
                          rotate: xOffset * 1.5,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 + i * 0.12, ease: 'easeOut' }}
                        className="absolute left-1/2 top-1/3 text-xl select-none"
                      >
                        {['❤️', '💖', '💕', '💓', '💗'][i]}
                      </motion.span>
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {/* The Flipping Inner Card Container */}
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{
                  duration: 0.65,
                  type: 'spring',
                  stiffness: 180,
                  damping: 18,
                }}
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* FRONT FACE (Before Flip) */}
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl p-5 flex flex-col items-center justify-between bg-gradient-to-br from-white via-rose-50/70 to-pink-100/80 border-2 border-rose-200 shadow-md hover:shadow-xl hover:border-rose-300 transition-all group overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {/* Decorative background watermark */}
                  <span className="absolute -bottom-4 -right-4 text-7xl opacity-10 pointer-events-none select-none">
                    💌
                  </span>

                  <div className="w-full flex items-center justify-between text-xs font-semibold text-rose-500">
                    <span className="px-2 py-0.5 rounded-full bg-rose-100/90 text-rose-700 font-bold text-[10px] uppercase tracking-wider">
                      {item.hint}
                    </span>
                    <Heart className="w-4 h-4 fill-rose-200 text-rose-400 group-hover:scale-125 transition-transform" />
                  </div>

                  <div className="text-center space-y-1">
                    <span className="text-3xl block group-hover:scale-110 transition-transform duration-300">
                      {item.emoji}
                    </span>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-rose-600 transition-colors">
                      {item.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                    <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                    <span>Tap to flip & read 💖</span>
                  </div>
                </div>

                {/* BACK FACE (After Flip) */}
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl p-4 flex flex-col justify-between bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 text-white shadow-xl border border-rose-400 overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="flex items-center justify-between text-xs text-rose-100 border-b border-rose-400/50 pb-1.5">
                    <span className="font-bold flex items-center gap-1">
                      <span>{item.emoji}</span> {item.title}
                    </span>
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
                      Flipped ❤️
                    </span>
                  </div>

                  <p className="text-xs sm:text-[13px] text-white/95 leading-relaxed font-serif italic my-auto px-1">
                    "{item.desc}"
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-rose-100/80 pt-1 border-t border-rose-400/50">
                    <span className="font-handwriting text-sm text-white">Forever Yours</span>
                    <span className="flex items-center gap-1">
                      <RotateCw className="w-3 h-3" /> Flip back
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* Next Step Button */}
      <div className="pt-2">
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-rose-300 hover:shadow-rose-400/60 transition-all flex items-center justify-center gap-2 mx-auto group"
        >
          <Sparkles className="w-4 h-4" />
          <span>Final Birthday Letter & Gift Coupons 💌</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  )
}
