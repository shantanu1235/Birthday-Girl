import React, { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Sparkles, Ticket, Check, RotateCcw, Send } from 'lucide-react'

const COUPONS = [
  { id: 1, title: 'Midnight Ice Cream Run 🍦', desc: 'Valid anytime, even at 2 AM. Your favorite flavor guaranteed!' },
  { id: 2, title: 'Master of Decisions Pass 👑', desc: 'You choose where we eat, what we watch, and what we do all day.' },
  { id: 3, title: 'Cozy Movie Marathon 🎬', desc: 'Complete with blanket fort, your favorite movie and endless snacks.' },
  { id: 4, title: 'Unlimited Hugs & Pampering 💕', desc: 'Never expires. Can be redeemed an unlimited number of times.' },
]

export default function StepLetter({ onRestart }) {
  const [redeemed, setRedeemed] = useState({})

  const handleRedeem = (id) => {
    setRedeemed((prev) => ({ ...prev, [id]: true }))
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#f43f5e', '#ec4899', '#f59e0b']
    })
  }

  const triggerCelebration = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24', '#a855f7']
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-xl mx-auto px-4 py-4"
    >
      {/* Love Letter Card */}
      <div className="relative bg-gradient-to-b from-[#fffcf7] to-[#fff8ee] rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-2xl shadow-rose-200/40 text-left mb-8">
        {/* Vintage Stamp Accent */}
        <div className="absolute top-6 right-6 border-2 border-dashed border-rose-300 rounded-lg p-2 text-center rotate-6 select-none bg-rose-50/50">
          <Heart className="w-5 h-5 mx-auto text-rose-500 fill-rose-400" />
          <span className="text-[9px] font-bold tracking-widest text-rose-600 block mt-0.5 uppercase">
            Special Love
          </span>
        </div>

        <div className="space-y-4 max-w-lg">
          <span className="text-xs font-bold text-rose-500 uppercase tracking-widest block">
            From the bottom of my heart 💌
          </span>

          <h3 className="font-handwriting text-3xl sm:text-4xl text-slate-800 font-bold">
            Dearest Pragati,
          </h3>

          <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed font-serif">
            <p>
              Happy Birthday, my love! On this special day, I just want to pause and thank the universe 
              for bringing someone as pure, wonderful, and extraordinary as you into my life.
            </p>
            <p>
              Your smile has the power to wash away my worst days, your laughter is my favorite melody, 
              and every little moment spent with you becomes a memory I treasure forever.
            </p>
            <p>
              I promise to always celebrate your victories, hold your hand through the stormy days, 
              cheer for your wildest dreams, and keep making you laugh like you do.
            </p>
            <p className="font-semibold text-rose-700 pt-2">
              May this new year bring you everything your beautiful heart desires. You deserve the entire world!
            </p>
          </div>

          <div className="pt-4 border-t border-amber-200/60 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 block">Always & Forever Yours,</span>
              <span className="font-handwriting text-2xl sm:text-3xl font-bold text-rose-600">
                Shantanu ❤️
              </span>
            </div>
            <button
              onClick={triggerCelebration}
              className="p-3 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-600 transition-colors shadow-sm"
              title="Shower Hearts!"
            >
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Birthday Coupons Section */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-widest">
          <Ticket className="w-4 h-4" />
          Special Birthday Coupons (Claim Them Anytime!)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {COUPONS.map((coupon) => {
            const isClaimed = redeemed[coupon.id]
            return (
              <div
                key={coupon.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isClaimed
                    ? 'bg-rose-50 border-rose-300 opacity-90'
                    : 'bg-white/90 border-rose-100 hover:border-rose-300 shadow-sm'
                }`}
              >
                <h4 className="text-sm font-bold text-slate-800 mb-1">{coupon.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{coupon.desc}</p>
                <button
                  onClick={() => handleRedeem(coupon.id)}
                  disabled={isClaimed}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isClaimed
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm'
                  }`}
                >
                  {isClaimed ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Claimed by Pragati! ❤️</span>
                    </>
                  ) : (
                    <span>Redeem This Coupon 🎟️</span>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        {/* Replay Button */}
        <div className="pt-6">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-rose-600 transition-colors py-2 px-4 rounded-full border border-slate-200 hover:border-rose-200 bg-white/60"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay the Surprise from the Beginning</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

