'use client'

import { useEffect, useRef } from 'react'

export default function VantaHero() {
  const ref = useRef<HTMLDivElement>(null)
  const vantaRef = useRef<{ destroy: () => void } | null>(null)

  useEffect(() => {
    let cancelled = false

    async function init() {
      const THREE = await import('three')
      const WAVES = (await import('vanta/dist/vanta.waves.min')).default

      if (cancelled || !ref.current) return

      vantaRef.current = WAVES({
        el: ref.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x050a14,
        shininess: 60,
        waveHeight: 18,
        waveSpeed: 0.6,
        zoom: 0.85,
      })
    }

    init()
    return () => {
      cancelled = true
      vantaRef.current?.destroy()
    }
  }, [])

  return (
    <div ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-10">
        <span className="font-bold text-white text-sm tracking-wide">JF</span>
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#contact" className="hover:text-white transition-colors bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-1.5 rounded-lg transition-all">Contact</a>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 max-w-3xl">
        <p className="section-label mb-4">AI Builder · Technical Recruiter · New York, NY</p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Juan<br />
          <span className="gradient-text">Fernandez</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          AI builder and technical recruiter with 6 years placing engineers at high-growth startups.
          Now building AI-powered products through Pursuit's AI Copilot program.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-7 py-3 rounded-xl font-semibold text-sm transition-all"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-slate-600" />
      </div>
    </div>
  )
}
