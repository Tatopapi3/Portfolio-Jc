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

      // Core amber glow
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

      <nav className="absolute top-6 left-0 right-0 flex items-center justify-between px-8 z-20">
        <span className="font-black text-white/50 text-sm tracking-[0.2em]">JF</span>
        <div className="flex gap-6 text-xs text-white/30 font-semibold tracking-widest uppercase">
          {['Projects','Skills','Experience','Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white/70 transition-colors">{l}</a>
          ))}
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center gap-7 text-center px-6">
        {/* Photo — the sphere's living core */}
        <div className="animate-float">
          <div
            className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden relative"
            style={{ boxShadow: '0 0 70px 25px rgba(245,158,11,0.22), 0 0 140px 50px rgba(239,68,68,0.08)' }}
          >
            <Image
              src="/avatar.jpg"
              alt="Juan Fernandez"
              fill
              className="object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement
                img.style.display = 'none'
                const parent = img.parentElement
                if (parent) {
                  parent.style.background = 'radial-gradient(circle at 40% 35%, #3d1800, #080300)'
                  parent.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:68px;font-weight:900;color:#f59e0b;letter-spacing:-4px">JF</div>'
                }
              }}
            />
            {/* Inner rim glow */}
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{ boxShadow: 'inset 0 0 40px rgba(245,158,11,0.12)' }} />
          </div>
          <div className="absolute inset-0 rounded-full border border-amber-400/12 scale-110 pointer-events-none" style={{ margin: '-4%', borderRadius: '50%' }} />
          <div className="absolute inset-0 rounded-full border border-white/4 scale-125 pointer-events-none" style={{ margin: '-12%', borderRadius: '50%' }} />
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
          <p className="section-label mb-3">AI Builder · Full-Stack Engineer · New York, NY</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-5">
            Juan<br />
            <span className="gradient-text">Fernandez</span>
          </h1>
          <p className="text-white/35 text-base md:text-lg max-w-md mx-auto mb-8 leading-relaxed">
            Building AI products at Pursuit. 6 years placing engineers at high-growth startups.
            Now shipping full-stack AI apps.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="#projects"
              className="bg-white text-black px-8 py-3 rounded-full font-black text-sm hover:bg-amber-400 transition-colors">
              Enter →
            </a>
            <a href="#contact"
              className="border border-white/12 text-white/40 hover:text-white/80 hover:border-white/22 px-8 py-3 rounded-full text-sm font-semibold transition-all">
              Contact
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-20">
        <span className="text-[10px] text-white tracking-[0.3em]">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  )
}
