import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, Sparkles, Image as ImageIcon } from 'lucide-react'

// You can easily replace these photos with real photos of you two!
// Put your photos in the "public" folder (e.g. public/photo1.jpg) and set url: '/photo1.jpg'
const MEMORIES = [
  {
    id: 1,
    url: '/photo17.jpg',
    title: 'That Priceless Smile ✨',
    date: 'Day 1 to Forever',
    note: 'The very first time I saw your genuine laugh, I knew my heart was in trouble.',
    rotation: '-rotate-2',
  },
  {
    id: 2,
    url: '/photo3.jpg',
    title: 'Our Late Night Talks 🌙',
    date: 'Endless Chats',
    note: 'From talking about random things to sharing deepest secrets, every second with you feels like home.',
    rotation: 'rotate-2',
  },
  {
    id: 3,
    url: '/photo1.jpg',
    title: 'My Favorite Person 💖',
    date: 'Always & Forever',
    note: 'No matter how chaotic the world gets, you will always be my peace.',
    rotation: '-rotate-1',
  },
  {
    id: 4,
    url: '/photo13.jpg',
    title: 'Making Beautiful Memories 🌸',
    date: 'Just You & Me',
    note: 'Looking forward to celebrating a hundred more birthdays with you by my side.',
    rotation: 'rotate-3',
  },
  {
    id: 5,
    url: '/photo5.jpg',
    title: 'Making Beautiful Memories 🌸',
    date: 'Just You & Me',
    note: 'Looking forward to celebrating a hundred more birthdays with you by my side.',
    rotation: 'rotate-3',
  },
    {
    id: 6,
    url: '/photo11.jpg',
    title: 'Making Beautiful Memories 🌸',
    date: 'Just You & Me',
    note: 'Looking forward to celebrating a hundred more birthdays with you by my side.',
    rotation: 'rotate-3',
  },
]

export default function StepMemories({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MEMORIES.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + MEMORIES.length) % MEMORIES.length)
  }

  const current = MEMORIES[currentIndex]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto text-center px-4"
    >
      <div className="space-y-2 mb-6">
        <span className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Polaroid Photo Album
        </span>
        <h2 className="text-3xl font-serif font-bold text-slate-800">
          Our Special Memories 📸
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          A few little moments that mean the whole world to me.
        </p>
      </div>

      {/* Polaroid Card */}
      <div className="relative my-4 flex items-center justify-center">
        {/* Navigation Left */}
        <button
          onClick={handlePrev}
          className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md border border-rose-100 flex items-center justify-center text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition-all"
          aria-label="Previous Memory"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* The Polaroid Frame */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.85, rotate: 6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotate: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className={`w-full max-w-[320px] bg-white p-4 pb-6 rounded-2xl shadow-2xl border border-slate-100 ${current.rotation} transition-transform duration-300`}
          >
            {/* Washi Tape Accent */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-rose-200/70 backdrop-blur-sm -rotate-2 rounded-sm shadow-inner pointer-events-none" />

            {/* Photo Container (Displays image in its 100% actual position & aspect ratio without cropping) */}
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-rose-50/60 border border-slate-100 relative group flex items-center justify-center">
              {/* Blurred Ambient Backdrop for seamless natural aesthetic */}
              <img
                src={current.url}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-md opacity-25 scale-110 pointer-events-none select-none"
              />
              {/* Actual Image in full original dimensions & position */}
              <img
                src={current.url}
                alt={current.title}
                className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 right-2 z-20 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
                {current.date}
              </div>
            </div>

            {/* Handwritten Note underneath */}
            <div className="mt-4 text-center space-y-1 px-1">
              <h3 className="font-handwriting text-2xl font-bold text-slate-800">
                {current.title}
              </h3>
              <p className="text-xs text-slate-600 italic leading-relaxed">
                "{current.note}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Right */}
        <button
          onClick={handleNext}
          className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md border border-rose-100 flex items-center justify-center text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition-all"
          aria-label="Next Memory"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-1.5 my-4">
        {MEMORIES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-6 bg-rose-500' : 'w-2 bg-rose-200'
            }`}
          />
        ))}
      </div>

      {/* Next Step Button */}
      <div className="pt-4">
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-rose-300 hover:shadow-rose-400/60 transition-all flex items-center justify-center gap-2 mx-auto group"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>Why I Love You 💖</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  )
}

