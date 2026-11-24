import React, { useMemo } from 'react'

export default function FloatingHearts() {
  const items = useMemo(() => {
    const emojis = ['❤️', '💖', '✨', '🌸', '🎂', '💕', '🌷', '🎀']
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: Math.random() * 100,
      size: Math.random() * 16 + 14,
      duration: Math.random() * 8 + 7,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.4 + 0.2,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <span
          key={item.id}
          className="absolute select-none animate-float"
          style={{
            left: `${item.left}%`,
            bottom: '-40px',
            fontSize: `${item.size}px`,
            opacity: item.opacity,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  )
}

