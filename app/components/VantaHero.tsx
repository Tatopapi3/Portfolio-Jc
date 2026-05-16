'use client'

import { useEffect, useRef } from 'react'

export default function VantaHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const el: HTMLCanvasElement = canvas
    const ctx = el.getContext('2d')!
    let animId: number

    const resize = () => {
      el.width = window.innerWidth
      el.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Particles
    const NUM = 120
    type Particle = { x: number; y: number; r: number; dx: number; dy: number; alpha: number }
    const particles: Particle[] = Array.from({ length: NUM }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.2,
    }))

    // Glowing blobs
    type Blob = { x: number; y: number; r: number; dx: number; dy: number; color: string }
    const blobs: Blob[] = [
      { x: window.innerWidth * 0.15, y: window.innerHeight * 0.3, r: 350, dx: 0.18, dy: 0.12, color: '#4f46e5' },
      { x: window.innerWidth * 0.75, y: window.innerHeight * 0.6, r: 420, dx: -0.14, dy: 0.16, color: '#7c3aed' },
      { x: window.innerWidth * 0.5,  y: window.innerHeight * 0.15, r: 280, dx: 0.10, dy: 0.20, color: '#0ea5e9' },
      { x: window.innerWidth * 0.85, y: window.innerHeight * 0.2,  r: 200, dx: -0.20, dy: 0.10, color: '#a855f7' },
    ]

    function drawBlob(b: Blob) {
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
      g.addColorStop(0, b.color + '28')
      g.addColorStop(0.5, b.color + '10')
      g.addColorStop(1, b.color + '00')
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
      ctx.fillStyle = g
      ctx.fill()
    }

    function draw() {
      // Background
      ctx.fillStyle = '#03001e'
      ctx.fillRect(0, 0, el.width, el.height)

      // Blobs
      blobs.forEach(b => {
        drawBlob(b)
        b.x += b.dx
        b.y += b.dy
        if (b.x < -b.r || b.x > el.width + b.r) b.dx *= -1
        if (b.y < -b.r || b.y > el.height + b.r) b.dy *= -1
      })

      // Particles
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180,180,255,${p.alpha})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > el.width) p.dx *= -1
        if (p.y < 0 || p.y > el.height) p.dy *= -1
      })

      // Subtle horizontal scan line
      const scanG = ctx.createLinearGradient(0, 0, el.width, 0)
      scanG.addColorStop(0, 'transparent')
      scanG.addColorStop(0.5, 'rgba(139,92,246,0.03)')
      scanG.addColorStop(1, 'transparent')
      ctx.fillStyle = scanG
      ctx.fillRect(0, 0, el.width, el.height)

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-10">
        <span className="font-bold text-white text-sm tracking-widest uppercase">JF</span>
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#contact" className="hover:text-white transition-colors bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-1.5 rounded-lg">Contact</a>
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
          Now building AI-powered products through Pursuit's AI Copilot program.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="bg-violet-600 hover:bg-violet-700 text-white px-7 py-3 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-violet-900/40"
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

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#03001e] to-transparent z-10" />
    </div>
  )
}
