'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const HeroToggle = dynamic(() => import('../components/HeroToggle'), { ssr: false })
const VantaHero = dynamic(() => import('../components/VantaHero'), { ssr: false })
const ParticleOrb = dynamic(() => import('../components/ParticleOrb'), { ssr: false })

const EXPERIMENTS = [
  {
    id: 'toggle',
    label: 'Dark / Light Toggle',
    description: 'An earlier hero concept with a live dark/light mode switch — canvas blob animation in dark mode, a Three.js particle sphere in light mode.',
  },
  {
    id: 'vanta',
    label: 'Canvas Aurora',
    description: 'A hand-rolled canvas animation (glowing blobs + drifting particles) — an earlier hero exploration before the current train-stop video design.',
  },
  {
    id: 'orb',
    label: 'Particle Orb',
    description: 'A mouse-reactive Three.js particle sphere (14,000 points on a Fibonacci distribution), originally built as an accent layer rather than a full hero.',
  },
] as const

type ExperimentId = (typeof EXPERIMENTS)[number]['id']

export default function ExperimentsPage() {
  const [active, setActive] = useState<ExperimentId>('toggle')
  const current = EXPERIMENTS.find(e => e.id === active)!

  return (
    <div className="relative min-h-screen bg-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
      `}</style>

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 px-6 py-5 flex flex-col gap-3 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
          <a
            href="/"
            className="text-white/70 hover:text-white text-sm transition-colors"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            ← Back to portfolio
          </a>
          <span
            className="text-white text-lg"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
          >
            Experiments
          </span>
        </div>

        <div className="flex flex-wrap gap-2 justify-center max-w-5xl mx-auto w-full">
          {EXPERIMENTS.map(exp => (
            <button
              key={exp.id}
              onClick={() => setActive(exp.id)}
              className="text-xs sm:text-sm px-4 py-2 rounded-full border transition-all"
              style={{
                fontFamily: 'system-ui, sans-serif',
                color: active === exp.id ? '#000' : 'rgba(255,255,255,0.7)',
                background: active === exp.id ? '#fff' : 'rgba(255,255,255,0.06)',
                borderColor: active === exp.id ? '#fff' : 'rgba(255,255,255,0.15)',
              }}
            >
              {exp.label}
            </button>
          ))}
        </div>

        <p
          className="text-center text-xs sm:text-sm text-white/40 max-w-md mx-auto"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          {current.description}
        </p>
      </div>

      {/* Active experiment */}
      {active === 'toggle' && <HeroToggle />}
      {active === 'vanta' && <VantaHero />}
      {active === 'orb' && (
        <div className="relative h-screen w-full bg-[#0a0a12] flex items-center justify-center overflow-hidden">
          <ParticleOrb isDark />
          <p
            className="relative z-10 text-white/30 text-xs sm:text-sm"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            Move your mouse — the orb follows
          </p>
        </div>
      )}
    </div>
  )
}
