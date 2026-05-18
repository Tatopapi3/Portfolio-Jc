'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

function WordReveal({ text, className = '', baseDelay = 0 }: { text: string; className?: string; baseDelay?: number }) {
  const [go, setGo] = useState(false)
  useEffect(() => { const t = setTimeout(() => setGo(true), baseDelay); return () => clearTimeout(t) }, [baseDelay])
  return (
    <span className={`inline-flex flex-wrap justify-center gap-x-[0.25em] ${className}`}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <span
            className="inline-block animate-word-in"
            style={{ opacity: 0, animationDelay: `${go ? i * 90 : 99999}ms`, animationFillMode: 'forwards' }}
          >
            {w}
          </span>
        </span>
      ))}
    </span>
  )
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const el: HTMLCanvasElement = canvas
    const ctx = el.getContext('2d')!
    let animId: number
    let t = 0

    const resize = () => { el.width = window.innerWidth; el.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    type P = { ox: number; oy: number; oz: number }
    let pts: P[] = []

    function initSphere() {
      pts = []
      const N = window.innerWidth < 768 ? 500 : 1000
      const R = Math.min(el.width, el.height) * 0.26
      for (let i = 0; i < N; i++) {
        const theta = Math.acos(2 * Math.random() - 1)
        const phi = Math.random() * Math.PI * 2
        const r = R * (0.88 + Math.random() * 0.12)
        pts.push({
          ox: r * Math.sin(theta) * Math.cos(phi),
          oy: r * Math.sin(theta) * Math.sin(phi),
          oz: r * Math.cos(theta),
        })
      }
    }
    initSphere()

    function draw() {
      t += 0.0025
      const W = el.width, H = el.height
      const cx = W / 2, cy = H / 2
      const R = Math.min(W, H) * 0.26
      const FOV = Math.max(W, H) * 0.75

      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, W, H)

      const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.7)
      g1.addColorStop(0, 'rgba(245,158,11,0.10)')
      g1.addColorStop(1, 'transparent')
      ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H)

      const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 2.2)
      g2.addColorStop(0, 'rgba(239,68,68,0.04)')
      g2.addColorStop(1, 'transparent')
      ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H)

      const cosY = Math.cos(t), sinY = Math.sin(t)
      const cosX = Math.cos(t * 0.22 + 0.4), sinX = Math.sin(t * 0.22 + 0.4)

      const proj: { sx: number; sy: number; depth: number; z: number }[] = []
      for (const p of pts) {
        const x1 = p.ox * cosY + p.oz * sinY
        const z1 = -p.ox * sinY + p.oz * cosY
        const y2 = p.oy * cosX - z1 * sinX
        const z2 = p.oy * sinX + z1 * cosX
        const sc = FOV / (FOV + z2 + R)
        proj.push({ sx: cx + x1 * sc, sy: cy + y2 * sc, depth: (z2 + R) / (2 * R), z: z2 })
      }
      proj.sort((a, b) => a.z - b.z)

      for (const p of proj) {
        const alpha = 0.08 + p.depth * 0.92
        const size = 0.3 + p.depth * 2.4
        const rr = Math.round(175 + p.depth * 80)
        const gg = Math.round(150 + p.depth * 55)
        const bb = Math.round(210 - p.depth * 160)
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, Math.max(0.3, size), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rr},${gg},${bb},${alpha.toFixed(2)})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section className="snap-section flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <nav className="absolute top-7 left-0 right-0 flex items-center justify-between px-8 z-20">
        <span className="font-black text-white/40 text-xs tracking-[0.25em] uppercase">JF</span>
        <div className="flex gap-7 text-[11px] text-white/25 font-semibold tracking-[0.18em] uppercase">
          {['Projects','Skills','Experience','Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white/70 transition-colors">{l}</a>
          ))}
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-6 max-w-4xl">
        {/* Photo */}
        <div className="animate-float">
          <div
            className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden relative"
            style={{ boxShadow: '0 0 70px 25px rgba(245,158,11,0.20), 0 0 140px 50px rgba(239,68,68,0.07)' }}
          >
            <Image src="/avatar.jpg" alt="Juan Fernandez" fill className="object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement
                img.style.display = 'none'
                const p = img.parentElement
                if (p) {
                  p.style.background = 'radial-gradient(circle at 40% 35%, #3d1800, #080300)'
                  p.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:60px;font-weight:900;color:#f59e0b;letter-spacing:-4px">JF</div>'
                }
              }}
            />
            <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: 'inset 0 0 40px rgba(245,158,11,0.10)' }} />
          </div>
        </div>

        {/* Main statement */}
        <div>
          <p className="section-label mb-8">New York · Pursuit AI Copilot Fellow</p>

          {/* THE cinematic line */}
          <h1 className="text-[2.6rem] sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.02] tracking-tight mb-6 text-white">
            <WordReveal text="6 years recruiting" baseDelay={200} className="block" />
            <WordReveal text="engineers." baseDelay={500}
              className="block gradient-text" />
            <WordReveal text="Now I am one." baseDelay={900} className="block" />
          </h1>

          <p className="text-white/30 text-base md:text-xl font-light max-w-lg mx-auto mb-10 leading-relaxed animate-fade-up"
            style={{ animationDelay: '1500ms', opacity: 0, animationFillMode: 'forwards' }}>
            Full-stack AI engineer. Building products that didn&apos;t exist yesterday.
          </p>

          <div className="flex gap-3 justify-center animate-fade-up"
            style={{ animationDelay: '1700ms', opacity: 0, animationFillMode: 'forwards' }}>
            <a href="#projects"
              className="bg-white text-black px-8 py-3.5 rounded-full font-black text-sm hover:bg-amber-400 transition-colors tracking-wide">
              See My Work →
            </a>
            <a href="#contact"
              className="border border-white/10 text-white/35 hover:text-white/70 hover:border-white/20 px-8 py-3.5 rounded-full text-sm font-semibold transition-all">
              Contact
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-20">
        <span className="text-[10px] text-white tracking-[0.35em]">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  )
}
