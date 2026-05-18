'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

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

    type Spark = { x: number; y: number; angle: number; speed: number; r: number; life: number; maxLife: number; color: string }
    const sparks: Spark[] = []
    const COLORS = ['#f59e0b','#ef4444','#fb923c','#fde68a','#f97316']

    function spawnSpark(cx: number, cy: number) {
      const angle = Math.random() * Math.PI * 2
      const dist = 140 + Math.random() * 80
      sparks.push({
        x: cx + Math.cos(angle) * dist * 0.3,
        y: cy + Math.sin(angle) * dist * 0.3,
        angle,
        speed: 0.4 + Math.random() * 0.8,
        r: 1 + Math.random() * 2.5,
        life: 0,
        maxLife: 80 + Math.random() * 120,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }

    function draw() {
      t += 0.01
      const W = el.width, H = el.height
      const cx = W / 2, cy = H / 2

      ctx.fillStyle = 'rgba(6,4,16,0.22)'
      ctx.fillRect(0, 0, W, H)

      // Warm glow behind photo
      const layers = [
        { r: 320, alpha: 0.12, color: '#f59e0b' },
        { r: 220, alpha: 0.20, color: '#ef4444' },
        { r: 140, alpha: 0.28, color: '#f97316' },
        { r:  80, alpha: 0.35, color: '#fde68a' },
      ]
      layers.forEach(l => {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, l.r + Math.sin(t) * 15)
        g.addColorStop(0, l.color + Math.round(l.alpha * 255).toString(16).padStart(2,'0'))
        g.addColorStop(1, l.color + '00')
        ctx.beginPath()
        ctx.arc(cx, cy, l.r + Math.sin(t) * 15, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      })

      // Spawn new sparks
      if (Math.random() < 0.4) spawnSpark(cx, cy)

      // Draw + update sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.life++
        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed
        s.angle += 0.02
        const alpha = (1 - s.life / s.maxLife) * 0.9
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.color + Math.round(alpha * 255).toString(16).padStart(2,'0')
        ctx.fill()
        if (s.life >= s.maxLife) sparks.splice(i, 1)
      }

      // Outer dark vignette
      const vig = ctx.createRadialGradient(cx, cy, H * 0.15, cx, cy, H * 0.85)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(0,0,0,0.8)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section className="snap-section flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Nav dots */}
      <nav className="absolute top-6 left-0 right-0 flex items-center justify-between px-8 z-20">
        <span className="font-black text-white text-base tracking-widest">JF</span>
        <div className="flex gap-6 text-sm text-white/50">
          {[['#projects','Projects'],['#skills','Skills'],['#experience','Experience'],['#contact','Contact']].map(([h,l]) => (
            <a key={h} href={h} className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
      </nav>

      {/* Main layout */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 px-8 max-w-6xl w-full">

        {/* Photo with glow ring */}
        <div className="flex-shrink-0 animate-float">
          <div className="relative w-52 h-52 md:w-72 md:h-72" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-amber-400/40 shadow-2xl">
              <Image
                src="/avatar.jpg"
                alt="Juan Fernandez"
                fill
                className="object-cover"
                onError={(e) => {
                  const t = e.target as HTMLImageElement
                  t.style.display = 'none'
                  t.parentElement!.style.background = 'linear-gradient(135deg,#1a0a00,#2d1500)'
                  t.parentElement!.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:72px;font-weight:900;color:#f59e0b;letter-spacing:-4px">JF</div>'
                }}
              />
            </div>
            {/* Glowing ring */}
            <div className="absolute inset-0 rounded-full border border-amber-400/20 scale-110" />
            <div className="absolute inset-0 rounded-full border border-amber-400/10 scale-125" />
          </div>
        </div>

        {/* Text */}
        <div className="text-center md:text-left animate-fade-up">
          <p className="section-label mb-3">AI Builder · Technical Recruiter · New York, NY</p>
          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-none tracking-tight">
            Juan<br />
            <span className="gradient-text">Fernandez</span>
          </h1>
          <p className="text-white/55 text-lg md:text-xl leading-relaxed max-w-xl mb-8">
            Building AI products by day, placing engineers at high-growth startups for 6 years.
            Now shipping full-stack AI apps through Pursuit&apos;s AI Copilot program.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <a href="#projects" className="bg-amber-500 hover:bg-amber-400 text-black px-7 py-3 rounded-xl font-bold text-sm transition-colors">
              See My Work ↓
            </a>
            <a href="#contact" className="border border-white/15 hover:border-white/30 text-white/80 hover:text-white px-7 py-3 rounded-xl font-semibold text-sm transition-all">
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-40">
        <span className="text-xs text-white tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  )
}
