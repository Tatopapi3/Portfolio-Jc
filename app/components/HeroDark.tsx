'use client'

import { useEffect, useRef } from 'react'

interface Props { onSwitch: () => void }

export default function HeroDark({ onSwitch }: Props) {
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

    // Blobs with screen blending for neon glow
    const blobs = [
      { ox: 0.15, oy: 0.35, r: 0.45, dx: 0.00022, dy: 0.00015, color: [80, 40, 220] },
      { ox: 0.72, oy: 0.55, r: 0.50, dx: -0.00018, dy: 0.00020, color: [140, 20, 255] },
      { ox: 0.45, oy: 0.10, r: 0.35, dx: 0.00012, dy: 0.00025, color: [0, 160, 200] },
      { ox: 0.85, oy: 0.20, r: 0.28, dx: -0.00025, dy: 0.00012, color: [180, 60, 255] },
      { ox: 0.30, oy: 0.80, r: 0.32, dx: 0.00020, dy: -0.00018, color: [20, 100, 255] },
    ].map(b => ({ ...b, x: b.ox, y: b.oy }))

    function draw() {
      t += 0.003
      const W = el.width, H = el.height

      // Deep dark base
      ctx.fillStyle = '#020008'
      ctx.fillRect(0, 0, W, H)

      // Draw blobs with additive screen blending
      ctx.globalCompositeOperation = 'screen'
      blobs.forEach((b, i) => {
        b.x = b.ox + Math.sin(t * 0.7 + i * 1.3) * 0.18
        b.y = b.oy + Math.cos(t * 0.5 + i * 0.9) * 0.14

        const cx = b.x * W, cy = b.y * H
        const radius = b.r * Math.min(W, H)
        const [r, g, bv] = b.color

        const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        g1.addColorStop(0, `rgba(${r},${g},${bv},0.55)`)
        g1.addColorStop(0.4, `rgba(${r},${g},${bv},0.18)`)
        g1.addColorStop(1, `rgba(${r},${g},${bv},0)`)

        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.fillStyle = g1
        ctx.fill()
      })

      // Grain/texture layer
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = 'rgba(0,0,10,0.35)'
      ctx.fillRect(0, 0, W, H)

      // Vignette
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.85)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(0,0,0,0.75)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Style toggle */}
      <button
        onClick={onSwitch}
        className="absolute top-5 right-6 z-20 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/70 hover:text-white transition-all"
      >
        ☀ Light mode
      </button>

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-10">
        <span className="font-bold text-white text-sm tracking-widest uppercase">JF</span>
        <div className="flex items-center gap-6 text-sm text-slate-400 mr-28">
          {['#projects','#experience','#skills','#contact'].map(h => (
            <a key={h} href={h} className="hover:text-white transition-colors capitalize">{h.slice(1)}</a>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <p className="section-label mb-4">AI Builder · Technical Recruiter · New York, NY</p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
          Juan<br />
          <span className="gradient-text">Fernandez</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          AI builder and technical recruiter with 6 years placing engineers at high-growth startups.
          Now shipping AI-powered products through Pursuit&apos;s AI Copilot program.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#projects" className="bg-violet-600 hover:bg-violet-700 text-white px-7 py-3 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-violet-900/50">
            View Projects
          </a>
          <a href="#contact" className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-7 py-3 rounded-xl font-semibold text-sm transition-all">
            Get in Touch
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020008] to-transparent z-10" />
    </div>
  )
}
