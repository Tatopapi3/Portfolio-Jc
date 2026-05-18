'use client'

import { useRef, useEffect, useState } from 'react'

const projects = [
  {
    name: 'MoundVisit AI',
    year: '2026',
    type: 'Personal Project',
    desc: 'AI baseball mechanics coaching app. Frame-by-frame analysis, HOF comparisons, drill prescriptions — democratizing elite coaching for underserved athletes.',
    tech: ['Next.js', 'Claude API', 'Supabase', 'Vercel'],
    badge: '⚾ Live',
    accent: '#3b82f6',
    link: 'https://mound-visit-ai.vercel.app',
  },
  {
    name: 'Amplif.ai',
    year: '2026',
    type: '🏆 Hackathon Winner #2',
    desc: 'Hyperlocal NYC platform using AI to connect neighbors block by block — skill swaps, direct messaging, block party coordination.',
    tech: ['React', 'Node.js', 'AI Matching', 'PostgreSQL'],
    badge: '🏆 Won',
    accent: '#f59e0b',
  },
  {
    name: 'SnowAngel',
    year: '2026',
    type: '🏆 Hackathon Winner #1',
    desc: 'Accessibility-first snow removal marketplace. Elderly and disabled neighbors connect with local helpers. Glassmorphism UI + animated snowfall.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express'],
    badge: '🏆 Won',
    accent: '#a855f7',
  },
  {
    name: 'The Next Chapter',
    year: '2026',
    type: 'Freelance Client',
    desc: 'First paid client — full production website for a senior transition specialist, built with AI-assisted development workflows.',
    tech: ['HTML', 'CSS', 'JS', 'Netlify'],
    badge: '💼 Client',
    accent: '#10b981',
  },
]

export default function ProjectsSection() {
  const [active, setActive] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

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
    const N = window.innerWidth < 768 ? 180 : 350
    const dots: Dot[] = Array.from({ length: N }, () => ({
      x: Math.random() * el.width,
      y: Math.random() * el.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: 0.08 + Math.random() * 0.25,
      size: 0.5 + Math.random() * 1.8,
      hue: Math.random(),
    }))

    function draw() {
      t += 0.005
      const W = el.width, H = el.height
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, W, H)

      // Slow global rotation around center
      const cx = W / 2, cy = H / 2
      const cosR = Math.cos(t * 0.04), sinR = Math.sin(t * 0.04)

      for (const d of dots) {
        // Drift
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0) d.x += W
        if (d.x > W) d.x -= W
        if (d.y < 0) d.y += H
        if (d.y > H) d.y -= H

        // Very slow orbit nudge
        const dx = d.x - cx, dy = d.y - cy
        const nx = cx + dx * cosR - dy * sinR
        const ny = cy + dx * sinR + dy * cosR
        d.x = d.x * 0.999 + nx * 0.001
        d.y = d.y * 0.999 + ny * 0.001

        // Pulse alpha
        const alpha = d.alpha * (0.7 + 0.3 * Math.sin(t * 2.5 + d.hue * 10))
        const warm = d.hue > 0.7
        const rr = warm ? 245 : 190
        const gg = warm ? 158 : 180
        const bb = warm ? 11 : 220

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rr},${gg},${bb},${alpha.toFixed(2)})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  const p = projects[active]

  return (
    <section id="projects" ref={sectionRef} className="snap-section flex flex-col items-center justify-center px-6 py-16">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Accent bloom behind active card */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{ background: `radial-gradient(ellipse 50% 55% at 72% 50%, ${p.accent}14 0%, transparent 70%)` }} />

      <div className="relative z-10 max-w-6xl w-full">
        <p className="section-label mb-2">What I've shipped</p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-10">Projects</h2>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Sidebar */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 flex-shrink-0">
            {projects.map((pr, i) => (
              <button
                key={pr.name}
                onClick={() => setActive(i)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border ${
                  active === i
                    ? 'text-white border-white/15 bg-white/8'
                    : 'text-white/30 border-transparent hover:text-white/60 hover:bg-white/4'
                }`}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 mb-0.5 align-middle transition-all"
                  style={{ background: active === i ? pr.accent : '#444', boxShadow: active === i ? `0 0 8px ${pr.accent}` : 'none' }} />
                {pr.name}
              </button>
            ))}
          </div>

          {/* Card */}
          <div
            key={active}
            className="flex-1 rounded-2xl p-8 border animate-fade-up"
            style={{
              background: `linear-gradient(135deg, ${p.accent}0f 0%, rgba(255,255,255,0.02) 100%)`,
              borderColor: `${p.accent}30`,
            }}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-3xl font-black text-white mb-1">{p.name}</h3>
                <p className="text-white/35 text-sm">{p.type} · {p.year}</p>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
                style={{ background: `${p.accent}18`, borderColor: `${p.accent}35`, color: p.accent }}>
                {p.badge}
              </span>
            </div>

            <p className="text-white/60 text-lg leading-relaxed mb-6">{p.desc}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {p.tech.map(t => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-lg bg-white/4 border border-white/8 text-white/50">{t}</span>
              ))}
            </div>

            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-sm transition-opacity hover:opacity-70"
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
