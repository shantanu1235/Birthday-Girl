import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import FloatingHearts from './components/FloatingHearts'
import MusicPlayer from './components/MusicPlayer'
import StepLock from './components/StepLock'
import StepCelebration from './components/StepCelebration'
import StepCake from './components/StepCake'
import StepMemories from './components/StepMemories'
import StepReasons from './components/StepReasons'
import StepLetter from './components/StepLetter'
import StepForever from './components/StepForever'

export default function App() {
  // Step 0: Lock / Mystery Box
  // Step 1: Celebration & Birthday Reveal
  // Step 2: Virtual Cake Cutting & Candles
  // Step 3: Polaroid Memory Lane
  // Step 4: Reasons Why I Love You
  // Step 5: Love Letter & Birthday Coupons
  // Step 6: Can I be with you forever?
  const [step, setStep] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)

  const handleUnlock = () => {
    setHasInteracted(true)
    setStep(1)
  }

  const stepsList = [
    { title: 'Unlock' },
    { title: 'Wishes' },
    { title: 'Cake' },
    { title: 'Memories' },
    { title: 'Reasons' },
    { title: 'Letter' },
    { title: 'Forever' },
  ]

  return (
    <div className="min-h-screen relative flex flex-col justify-between items-center pt-4 pb-16 sm:py-8 px-3 overflow-x-hidden">
      {/* Ambient Floating Elements */}
      <FloatingHearts />

      {/* Floating Background Music Player (Bottom-Right on mobile, Top-Right on desktop) */}
      <MusicPlayer autoStart={hasInteracted} />

      {/* Top Stepper Indicator (shown once unlocked) */}
      {step > 0 && (
        <div className="z-20 mb-4 sm:mb-6 w-full max-w-lg mx-auto flex justify-center px-1">
          <div className="flex items-center gap-1 sm:gap-1.5 bg-white/85 backdrop-blur-md px-2.5 sm:px-4 py-1.5 rounded-full border border-rose-200/80 shadow-md shadow-rose-100/50 max-w-full overflow-x-auto scrollbar-none">
            {stepsList.slice(1).map((s, idx) => {
              const stepIndex = idx + 1
              const isCompleted = step > stepIndex
              const isCurrent = step === stepIndex
              return (
                <div key={idx} className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                  <button
                    onClick={() => setStep(stepIndex)}
                    className={`text-[11px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-full font-semibold transition-all whitespace-nowrap ${
                      isCurrent
                        ? 'bg-rose-500 text-white shadow-sm'
                        : isCompleted
                        ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                        : 'text-slate-400 cursor-not-allowed'
                    }`}
                    disabled={stepIndex > step}
                  >
                    {s.title}
                  </button>
                  {idx < stepsList.length - 2 && (
                    <span className="text-rose-200 text-xs select-none">/</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Main Interactive Card Container */}
      <main className="z-10 w-full flex items-center justify-center my-auto">
        <AnimatePresence mode="wait">
          {step === 0 && <StepLock key="step-0" onUnlock={handleUnlock} />}
          {step === 1 && <StepCelebration key="step-1" onNext={() => setStep(2)} />}
          {step === 2 && <StepCake key="step-2" onNext={() => setStep(3)} />}
          {step === 3 && <StepMemories key="step-3" onNext={() => setStep(4)} />}
          {step === 4 && <StepReasons key="step-4" onNext={() => setStep(5)} />}
          {step === 5 && <StepLetter key="step-5" onRestart={() => setStep(0)} onNext={() => setStep(6)} />}
          {step === 6 && <StepForever key="step-6" onRestart={() => setStep(0)} />}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="z-10 text-center mt-6 text-xs text-rose-400/80 font-medium select-none">
        Crafted with all my ❤️ for Pragati
      </footer>
    </div>
  )
}
