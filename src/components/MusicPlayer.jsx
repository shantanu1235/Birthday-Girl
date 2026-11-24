import React, { useState, useRef, useEffect } from 'react'
import { Music, Volume2, VolumeX, Sparkles } from 'lucide-react'

// Put your song in "public/song.mp3". If not present, it automatically plays romantic melody.
const LOCAL_SONG = '/song.mp3'
const FALLBACK_SONG = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3'

export default function MusicPlayer({ autoStart = false }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(LOCAL_SONG)
  const audioRef = useRef(null)

  useEffect(() => {
    if (autoStart && !isPlaying && !hasInteracted) {
      const playPromise = audioRef.current?.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
            setHasInteracted(true)
          })
          .catch(() => {
            // Browser blocked autoplay without user gesture; waiting for first tap
          })
      }
    }
  }, [autoStart, isPlaying, hasInteracted])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((e) => console.log('Audio play error:', e))
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={currentSrc}
        loop
        preload="auto"
        onError={() => {
          if (currentSrc !== FALLBACK_SONG) {
            setCurrentSrc(FALLBACK_SONG)
          }
        }}
      />
      <div className="fixed bottom-4 right-4 sm:top-4 sm:right-4 z-50">
        <button
          onClick={togglePlay}
          className={`group flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 ${
            isPlaying
              ? 'bg-rose-500/90 text-white border-rose-300 shadow-rose-300/50 glow-romantic'
              : 'bg-white/95 text-rose-600 border-rose-200 hover:bg-rose-50 shadow-slate-200'
          }`}
          title={isPlaying ? 'Pause Music' : 'Play Background Music'}
        >
          {/* Animated Vinyl Disc */}
          <div
            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-rose-200 flex items-center justify-center bg-slate-900 text-rose-300 transition-transform ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '4s' }}
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-rose-400" />
          </div>

          <span className="text-xs font-semibold tracking-wide">
            {isPlaying ? 'Our Song 🎵' : 'Play Music'}
          </span>

          {isPlaying ? (
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-full bg-white animate-pulse" />
              <span className="w-0.5 h-2 bg-white animate-bounce" />
              <span className="w-0.5 h-full bg-white animate-pulse" />
            </div>
          ) : (
            <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70 group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>
    </>
  )
}

