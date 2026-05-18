'use client'

import { useRef, useEffect, useState } from 'react'

const projects = [
  {
    name: 'MoundVisit AI',
    year: '2026',
    type: 'Personal Project',
    headline: 'Elite coaching for every athlete, not just the ones who can afford it.',
    desc: 'AI baseball mechanics app. Frame-by-frame analysis, Hall of Fame comparisons, drill prescriptions.',
    tech: ['Next.js', 'Claude API', 'Supabase', 'Vercel'],
    badge: '⚾ Live',
    accent: '#3b82f6',
    link: 'https://mound-visit-ai.vercel.app',
  },
  {
    name: 'Amplif.ai',
    year: '2026',
    type: '🏆 Hackathon Winner #2',
    headline: 'Your block. Your people. Connected by AI.',
    desc: 'Hyperlocal NYC platform — skill swaps, direct messaging, block party coordination.',
    tech: ['React', 'Node.js', 'AI Matching', 'PostgreSQL'],
    badge: '🏆 Won',
    accent: '#f59e0b',
  },
  {
    name: 'SnowAngel',
    year: '2026',
    type: '🏆 Hackathon Winner #1',
    headline: 'No neighbor left shoveling alone.',
    desc: 'Accessibility-first snow removal marketplace connecting elderly & disabled neighbors with local helpers.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express'],
    badge: '🏆 Won',
    accent: '#a855f7',
  },
  {
    name: 'The Next Chapter',
    year: '2026',
    type: 'First Paid Client',
    headline: 'First client. Full production. Shipped on time.',
    desc: 'Complete website for a senior transition specialist, built with AI-assisted development.',
    tech: ['HTML', 'CSS', 'JS', 'Netlify'],
    badge: '💼 Client',
    accent: '#10b981',
  },
]

export default function ProjectsSection() {
  const [active, setActive] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const el: HTMLCanvasElement = canvas
    const ctx = el.getContext('2d')!
    let animId: number
    let t = 0

    const resize = () => { el.width = el.offsetWidth; el.height = el.offsetHeight }
    resize()

    type Dot = { x: number; y: number; vx: number; vy: number; alpha: number; size: number; hue: number }
    const N = window.innerWidth < 768 ? 160 : 320
    const dots: Dot[] = Array.from({ length: N }, () => ({
      x: Math.random() * el.width,
      y: Math.random() * el.height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      alpha: 0.06 + Math.random() * 0.22,
      size: 0.4 + Math.random() * 1.6,
      hue: Math.random(),
    }))

    function draw() {
      t += 0.005
      const W = el.width, H = el.height
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, W, H)
      const cx = W / 2, cy = H / 2
      const cosR = Math.cos(t * 0.035), sinR = Math.sin(t * 0.035)
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0) d.x += W; if (d.x > W) d.x -= W
        if (d.y < 0) d.y += H; if (d.y > H) d.y -= H
        const dx = d.x - cx, dy = d.y - cy
        const nx = cx + dx * cosR - dy * sinR
        const ny = cy + dx * sinR + dy * cosR
        d.x = d.x * 0.999 + nx * 0.001; d.y = d.y * 0.999 + ny * 0.001
        const alpha = d.alpha * (0.7 + 0.3 * Math.sin(t * 2.2 + d.hue * 10))
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2)
        ctx.fillStyle = d.hue > 0.75
          ? `rgba(245,158,11,${alpha.toFixed(2)})`
          : `rgba(190,185,225,${alpha.toFixed(2)})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  const p = projects[active]

  return (
    <section id="projects" className="snap-section flex flex-col items-center justify-center px-6 py-16">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{ background: `radial-gradient(ellipse 50% 55% at 72% 50%, ${p.accent}12 0%, transparent 70%)` }} />

      <div className="relative z-10 max-w-6xl w-full">
        <p className="section-label mb-3">What I&apos;ve shipped</p>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-12 tracking-tight leading-none">
          Projects
        </h2>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 flex-shrink-0">
            {projects.map((pr, i) => (
              <button key={pr.name} onClick={() => setActive(i)}
                className={`text-left px-4 py-3.5 rounded-xl transition-all border ${
                  active === i
                    ? 'text-white border-white/12 bg-white/7'
                    : 'text-white/25 border-transparent hover:text-white/55 hover:bg-white/3'
                }`}>
                <span className="inline-block w-1.5 h-1.5 rounded-full mr-2.5 mb-0.5 align-middle transition-all"
                  style={{
                    background: active === i ? pr.accent : '#333',
                    boxShadow: active === i ? `0 0 8px ${pr.accent}` : 'none'
                  }} />
                <span className="text-sm font-semibold tracking-wide whitespace-nowrap">{pr.name}</span>
              </button>
            ))}
          </div>

          {/* Card */}
          <div key={active} className="flex-1 rounded-2xl p-8 md:p-10 border animate-fade-up"
            style={{
              background: `linear-gradient(135deg, ${p.accent}0d 0%, rgba(255,255,255,0.018) 100%)`,
              borderColor: `${p.accent}28`,
            }}>
            <div className="flex items-start justify-between mb-6">
              <p className="text-white/30 text-sm tracking-widest uppercase font-semibold">{p.type} · {p.year}</p>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
                style={{ background: `${p.accent}15`, borderColor: `${p.accent}30`, color: p.accent }}>
                {p.badge}
              </span>
            </div>

            {/* Big project name */}
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-4">
              {p.name}
            </h3>

            {/* Cinematic one-liner */}
            <p className="text-xl md:text-2xl font-light text-white/55 leading-snug mb-5 max-w-lg">
              {p.headline}
            </p>

            <p className="text-white/35 text-sm leading-relaxed mb-7 max-w-md">{p.desc}</p>

            <div className="flex flex-wrap gap-2 mb-7">
              {p.tech.map(t => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-lg bg-white/4 border border-white/7 text-white/45 font-medium">{t}</span>
              ))}
            </div>

            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-sm tracking-wide hover:opacity-70 transition-opacity"
                style={{ color: p.accent }}>
                Visit live site →
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
