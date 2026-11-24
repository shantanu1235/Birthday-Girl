import React, { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import {Heart, Sparkles, KeyRound } from 'lucide-react'

export default function StepLock({ onUnlock }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [isOpening, setIsOpening] = useState(false)

  const handleChoice = (text) => {
    setSelectedOption(text)
    setIsOpening(true)

    // Trigger sweet confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#ffe4e6']
    })

    setTimeout(() => {
      onUnlock()
    }, 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto text-center px-4"
    >
      {/* Gift Box Icon with animated glow */}
      <div className="relative mb-8 inline-block">
        <motion.div
          animate={{
            rotate: isOpening ? [0, -10, 10, -10, 0] : [0, -3, 3, 0],
            scale: isOpening ? 1.2 : 1,
          }}
          transition={{
            duration: isOpening ? 0.8 : 3,
            repeat: isOpening ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          className="w-28 h-28 mx-auto rounded-3xl bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 p-0.5 shadow-2xl shadow-rose-300/50 flex items-center justify-center cursor-pointer"
          onClick={() => handleChoice('direct')}
        >
          <div className="w-full h-full bg-white/90 backdrop-blur-sm rounded-[22px] flex items-center justify-center relative overflow-hidden group">
            <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
              🎁
            </span>
            <div className="absolute inset-0 bg-rose-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </motion.div>

        {/* Ambient floating sparkles */}
        <motion.span
          animate={{ y: [-5, -15, -5], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-2 -right-2 text-rose-500"
        >
          <Sparkles className="w-6 h-6 fill-rose-300" />
        </motion.span>
        <motion.span
          animate={{ y: [5, 15, 5], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 0.5 }}
          className="absolute -bottom-2 -left-2 text-rose-400"
        >
          <Heart className="w-5 h-5 fill-rose-300" />
        </motion.span>
      </div>

      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/80 text-rose-700 text-xs font-semibold tracking-wider uppercase">
          <KeyRound className="w-3.5 h-3.5" />
          Special Delivery For Pragati
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 tracking-tight">
          A Little Surprise For Someone Special ✨
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
          Hey Pragati! A secret gift box is waiting for you. Answer this tiny question to unlock it:
        </p>
      </div>

      {/* Playful question options */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-rose-600 uppercase tracking-widest">
          Who holds the key to Shantanu's heart? 🔑
        </p>

        {[
          'Pragati 💕 (Without a doubt!)',
          'The Birthday Queen herself 👑',
          'The sweetest girl with the best smile ✨'
        ].map((option, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleChoice(option)}
            disabled={isOpening}
            className={`w-full py-3.5 px-5 rounded-2xl border text-sm sm:text-base font-medium transition-all shadow-sm flex items-center justify-between group ${
              selectedOption === option
                ? 'bg-rose-500 text-white border-rose-500 shadow-rose-200'
                : 'bg-white/80 hover:bg-rose-50/90 text-slate-700 hover:text-rose-700 border-rose-100 hover:border-rose-300'
            }`}
          >
            <span>{option}</span>
            <span className="text-rose-400 group-hover:translate-x-1 transition-transform">
              ➔
            </span>
          </motion.button>
        ))}
      </div>

    </motion.div>
  )
}

